## About

*Iapetus* is a 3D platformer inspired by games like *Mirror's Edge*, *Super Mario Odyssey*, and *Celeste*. These games implement emergent movement systems where the player is given a sandbox of mobility tools that they are free to mix and match to carve their own personal paths through the game.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-thumb.mp4}

Here is a demonstration of Iapetus's core movement. The player can run, jump, vault over ledges, wall-cling, and wall-jump. Momentum is a core mechanic that builds the player's speed when they move continuously forward or perform certain actions. Most basic movements like jumping, vaulting, and wall-jumping have dynamic behavior based on Momentum. You jump further, vault faster, and wall-jump higher with greater Momentum.

Supplementing these basic options is the flipdash, which acts as a horizontal, forward-pointing double-jump. Jumping immediately after landing from a flipdash lets you do a special follow-up long jump. The flipdash can also be tech'd by entering the flipdash state immediately before landing on the ground or vaulting over a ledge, which provides even greater agility...

## Technical insights

### Player controller

The player controller is built with [Wasp](/code?item=Wasp) machines at its core but borrows a lot of the meta-patterns I first designed for *[Project Silver Needle](/games?item=Project%20Silver%20Needle)* that add support for inheritable state machines. *PSN*, however, is built on top of Photon Quantum's ECS, which blocked my player controllers from being able to interface with Unity's native `MonoBehaviour`. *Iapetus* is free from this restriction, meaning each Wasp machine can be its own `GameObject`.

To keep controller code as reusable as possible, machine types follow class-based inheritance, where all machines inherit from the abstract base class `Fsm`. More specific machine types can then add extra configurations on top of this class. For example, the abstract `GravityFsm` class inherits from `Fsm` and adds states and behaviors for ground-checking, falling, and other pseudo-physics tasks like depenetration.

This allows any other machine that wishes to react to gravity, such as the player, enemies, or static rigidbody-like game objects, to inherit from `GravityFsm` to have access to all of that state behavior. The subclasses are free to build on top of the configurations provided by the base classes. For example, an enemy could implement a `GroundSlam` state that is entered when the `StartFrameGrounded` trigger is fired from its parent `GravityFsm` class without needing to worry about checking that itself.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-motion.mp4}

### Dynamic animation

In an attempt to make the player's motion feel dynamic without creating dozens of animations for each action, I implemented a simple use case of Animator Blend Trees where I have 2–3 versions of each animation that have been animated at different speed postures but with the same actual frame count and duration. At runtime, based on the player's Momentum value, I can update the weight of the Blend Tree to interpolate between the different postures. For animations like running, I set the animation play speed as a function of Momentum as well.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-animation-jump.mp4}

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-animation-run.mp4}

Currently, I have disabled all keyframe interpolation for the animations. This suggests a more "comic-book" style of motion which I am still adjusting. One improvement I would like to make is how the fluid dynamic weight adjustments caused by player Momentum clash with the look created by non-interpolated keyframes. I think snapping the weight to some nearest increment could help with this, or better yet, only update the animator's weight when a new animation keyframe occurs.

### Cutout shader

I use a shader to create a cutout effect when the player is obscured from the 3rd-person camera.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-cutout.mp4}

The objects in the environment are using a ShaderGraph shader that implements a series of rules determining if a particular pixel should be made transparent. The pixel's distance from the player in screen space and its physical distance from the camera are the main things that are checked. A collision-detection raycast from the camera to the player controls when the system is active.
