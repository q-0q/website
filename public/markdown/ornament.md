## About

*Ornament* is a small 2D platformer where you explore a dark and dangerous world. It was my first large experiment within the Godot engine. 

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/ornament-jump.mp4}


## Technical insights

### Player controller

The player controller for *Ornament* was the first state machine pattern I ever built, and it paved the way for *[Melody Temple](/games?item=Melody%20Temple)*'s Godot state machine, and eventually the [Wasp](/code?item=Wasp) library. Each player State is a Node within the Godot scene tree, which are parented to a controller Node that acted as the actual "machine".

In this way, the player state machine is natively integrated with the engine's object system, unlike Wasp machines used in my Unity projects which are represented entirely within code. This Node-based approach provides some advantages, such as being able to export state parameters to a GUI.

### Tilemaps

*Ornament* makes use of [better-terrain](https://github.com/Portponky/better-terrain), a Godot plugin that improves upon Godot's native tilemap system by providing more flexible rule-based tilemaps. The tile assets are made by me with Aseprite.

:::image-div
![](https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/ornament-tilemap.png)
:::

Further, I made use of Godot's ability to configure unique occlusion colliders for each individual tile, which makes it easy to create dynamic lighting on the sprites.

![](https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/ornament-tile-occlusion.png)

Note how the bricks react to the player's light source:

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/ornament-tile-light.mp4}

### Persistent game events

Each room in *Ornament* is a scene, so I had to devise a system that could track, store, and load permanent game events across scene changes. Godot makes this easy through its mechanism of Autoloads, which are scenes that are permanently loaded. I configured an Autoload scene that listens for these events and stores them in a Dictionary, which can be encoded to a file to act as a save.

One limitation to this approach is that the outcome of the persistent events must be deterministic. This is because when a scene is loaded that contains an already-triggered persistent event, the relevant game object(s) "jump to the end" of the event, giving the impression that they remained in the completed state the whole time the player was in another scene. This works fine for simple use cases like a player breaking a wall or moving an object but wouldn't work very well if your persistent event was something more dynamic like triggering a physics simulation, for example.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/ornament-acid.mp4}

The lowering acid in this clip is stored as a persistent event. When this scene is reloaded in the future, the acid will automatically jump to the lowered state.
