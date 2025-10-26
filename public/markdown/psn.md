
# Project SilverNeedle

## About

Project SilverNeedle (PSN) is a 1-vs-1 2D fighter. PSN is mostly inspired by modern titles like *Guilty Gear -STRIVE-* and *Street Fighter 6*, but also draws from a deeper ancestry of games including *Asuka 120%* and *Street Fighter III: Third Strike*.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/psn-sindar.mp4}

## Technical insights

### Netcode

Project SilverNeedle uses [Photon Quantum](https://www.photonengine.com/quantum) as its netcode solution for implementing [client side prediction and rollback](https://www.snapnet.dev/docs/core-concepts/input-delay-vs-rollback/#rollback-client-side-prediction). The core game simulation happens inside Quantum's deterministic kernel, while Unity serves as a wrapper engine that captures user input, renders graphics, and plays audio.

Quantum handles the synchronization of state over the network and, save for some performance considerations required of the developer, acts mostly as a black-box that "just works". One major limitation of Quantum is that it can only sync data over the network in the form of primitive types (mainly numbers and booleans). This means generic class objects cannot be synchronized over the network -- at least not directly.

Game objects in PSN are implemented by [Wasp](../wasp/index.md) machines, which are large, complex, polymorphic objects in memory; however, the only data that needs to be synced to the network are an integer ID of the FSM's current state as well as an incrementing clock that represents the amount of time spent in the current state. Then, each frame, the client-side FSMs can read this data from the network and automatically assume the necessary state and its behavior, without needing to ever sync the FSM itself.

### How the engine works

#### Polymorphic state machines

To keep controller code as reusable as possible, machine types follow class-based inheritance, where all machines inherit from the abstract base class `Fsm`. This highest-up class implements triggers for systems that all game objects need, for example, collision detection and input handling. More specific machine types can then add extra configurations of top of this class. The abstract `PlayerFsm` class inherits from `Fsm` and adds states and behaviors for all universal player actions like moving and blocking. Individual characters then inherit from `PlayerFsm` and add all of their individual attacks and animations.

`SummonFsm` is a sibling class to `PlayerFsm` that implements behaviors needed for "`Summon`s", which includes any game object created by a player, like projectiles or puppets. Specific `Summon`s then implement this class.

#### Declarative character data

The balance of fighting games is extremely sensitive and requires lots of iteration to get right, so it's important to have the configurations for player actions be easy to read and edit. For *PSN* I designed a declarative system that hooks up directly to the Wasp machines of game objects. Here's an example configuration of the hitboxes for an attack:

```c#
{
    var hit = new Hit()
    {
        Level = 3,
        TrajectoryHeight = FP.FromString("6.8"),
        TrajectoryXVelocity = 5,
        BlockPushback = FP.FromString("2.5"),
        HitPushback = FP.FromString("1.5"),
        GravityScaling = FP.FromString("1"),
        GravityProration = FP.FromString("1.4"),
        GroundBounce = true,
        VisualHitPositionOffset = new FPVector2(7, 5),
        VisualAngle = 70,
        VisualHitLarge = true,
        Damage = 20,
        ProxBlockDistance = 9,
        HitboxCollections = new SectionGroup<CollisionBoxCollection>()
        {
            Sections = new List<Tuple<int, CollisionBoxCollection>>()
            {
                new (active, new CollisionBoxCollection()
                {
                    CollisionBoxes = new List<CollisionBox>()
                    {
                        new CollisionBox()
                        {
                            Height = FP.FromString("7"),
                            Width = FP.FromString("8"),
                            GrowWidth = true,
                            GrowHeight = true,
                            PosY = FP.FromString("0"),
                            PosX = 0
                        }
                    }
                })
            }
        }
    };
}
```

`SectionGroup`s are essentially a timeline that lets me declare a series of configurations that are used throughout the duration of a state. So, given this configuration:

```c#
var hitboxes = new SectionGroup<Hit>()
{
    Sections = new List<Tuple<int, Hit>>()
    {
        new(startup, null),
        new(active, hit),
        new (20, null)
    }
};

StateMapConfig.HitSectionGroup.Dictionary[state] = hitboxes;
```

...we can see that during the first `startup` frames of the state (in this case, 16 frames), no `Hit` is active, then the `Hit` is active for (2) active frames, and then finally is null again for the remainder of the state. Through this mechanism I can easily change the timing of an attack with a single line of code.


### Animation workflow

A common theme with this project is the need to take a normally straightforward game dev pattern and be required to completely reinvent it to make it compatible with the Quantum netcode kernel. Animation is an example. Quantum does not provide any native solution for synchronizing animations across the network, so I had to design my own. Conceptually it's simple - for each Wasp machine state, I need to create an animation data structure that can be indexed into using the deterministic clock to get the keyframe that needs to be currently displayed. The easiest way to approach this is to use sprite based animation.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/psn-hand-cropped.mp4}

Here is some early footage of my original animation workflow that used hand-drawn animation for every frame. I was initially attracted to this approach because of its simplicity, but I soon realized that approach would be too inflexible. I needed a system that I could iterate with rapidly to make subtle adjustments to animations after in-game testing, and with hand-drawn sprites, that would mean completely redrawing the sprite from scratch every time. Because of this, I soon switched to building the character models in 3D using Blender, from which I would bake and export the sprite animations.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/psn-blender.mp4}

While the up-front work of 3D modeling and rigging is much greater than just drawing sprites, the payoff is worth it as you start to design more complex characters, as tweaking the motion or pose of an action becomes as easy as moving a bone and updating a keyframe. I make use of a Blender script to export the animations into separate directories, and then use a Unity Editor script to auto-reapply Sprite import settings to the newly exported frames.

Lastly, I bind the animation to the Wasp state in the same way hitboxes and other data are bound:

```c#
string path = "_5H";
var animation = new FighterAnimation()
{
    Path = path,
    SectionGroup = new SectionGroup<int>();
};

Util.AutoSetupFromAnimationPath(animation, this);
StateMapConfig.FighterAnimation.Dictionary[state] = animation;
```

The static `AutoSetupFromAnimationPath` method builds out the `SectionGroup` from the animation directory that was filled by Blender.

## Gameplay insights

### Inputs

PSN is a 5-button game. The buttons are `Light`, `Medium`, `Heavy`, `Special`, and `Grab`. The same button can be used for multiple actions depending on directional input; for example, for most characters, `Heavy` with no directional input is a high-damage finisher, while `Down` + `Heavy` is a combo-starting launcher.

Most games in the 2D Fighting genre implement [motion inputs](https://glossary.infil.net/?t=Motion%20Input). Motion inputs raise the execution barrier of certain player actions, which affects the feel of the gameplay and its percieved difficulty. Motion inputs also allows for more actions without needing to have lots of buttons, as the same buttons can be reused with different motions to create more inputs.

With PSN, directional inputs are used (such as `Down` + `Heavy` or `Back` + `Special`) but I have opted to not implement motion inputs. PSN's characters are simple enough in their amount of options and mechanics to not need the increased amount of options that motion inputs provide. Implementing motion controls is also a surprisingly involved task. You need to track a rolling log of directional input over some time horizon, and then validate that the direction history equates to some motion when an input is attempted. It's crucial that this input log is synced over the network to ensure deterministic behavior which can put a large strain on networking performance if not implemented carefully. Further, defining a "motion" is complicated. Guilty Gear -STRIVE- uses a [complex system of rules](https://www.dustloop.com/w/GGST/Esoterica#Motion_Input_Buffer) to precisely define these motions and control how strictly they need to be performed.

### The air

Across all fighting games, jumping into the air gives a player largely different properties than being on the ground, but how exactly characters behave in the air varies drastically across games.

In the Street Fighter franchise, characters cannot block in the air, and air mobility is extremely limited. This means jumping towards your opponent is high-risk option, and leads to the Street Fighter's gameplay being very grounded. Contrast this with the Guilty Gear franchise, where characters can not only block in the air, but also air-dash, multi-jump, and super-jump. In GG, players are strongly encouraged to be in the air, which leads to a very air-oriented gameplay loop.

From a game design perspective, a more air-oriented game is more difficult to create because it (literally) adds more dimensions to the gameplay, and new gameplay features must consider both grounded and aerial situations. An air-oriented game also tends to play faster than a grounded game as players generally have access to more mobility options.

For PSN, I am aiming for an in-between. Players are able to multi-jump and block in the air, which allows for more potent anti-air attacks to have a place in the game, and makes jumping less punishing. Characters by default, however, cannot dash in the air or super-jump, which will mean fewer variables I need to consider as the gameplay designer.

Further, giving characters a lower baseline of aerial power allows room for certain characters to have enhanced aerial mobility as part of their unique identities. When most characters are weak in some property (such as mobility, or defense, or offense), then it's easier to make that property a central part of some character's unique identity.
