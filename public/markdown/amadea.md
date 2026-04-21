## About

*Amadea* is a 3D platformer inspired by games like *Mirror's Edge*, *Super Mario Odyssey*, and *Celeste*. These games implement emergent movement systems where the player is given a sandbox of mobility tools that they are free to mix and match to carve their own personal paths through the game.

With *Amadea*, I aim to marry this kind of gameplay expression with a beautiful and charming world, full of intrigue and danger.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/amadea-thumb.mp4}

Here is a demonstration of Amadea's core movement. The player can run, jump, vault over ledges, wall-cling, and wall-jump. Momentum is a core mechanic that builds the player's speed when they move continuously forward or perform certain actions. Most basic movements like jumping, vaulting, and wall-jumping have dynamic behavior based on Momentum. You jump further, vault faster, and wall-jump higher with greater Momentum.

Supplementing these basic options is the flipdash, which acts as a horizontal, forward-pointing double-jump. Jumping immediately after landing from a flipdash lets you do a special follow-up long jump. The flipdash can also be tech'd by entering the flipdash state immediately before landing on the ground or vaulting over a ledge, which provides even greater agility...

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/amadea-bell.mp4}

## Technical insights

### Player controller

The player controller is built with [Wasp](/code?item=Wasp) machines at its core but borrows a lot of the meta-patterns I first designed for *[Project SilverNeedle](/games?item=Project%20SilverNeedle)* that add support for inheritable state machines. *PSN*, however, is built on top of Photon Quantum's ECS, which blocked my player controllers from being able to interface with Unity's native `MonoBehaviour`. *Amadea* is free from this restriction, meaning each Wasp machine can be its own `GameObject`.

To keep controller code as reusable as possible, machine types follow class-based inheritance, where all machines inherit from the abstract base class `Fsm`. More specific machine types can then add extra configurations on top of this class. For example, the abstract `GravityFsm` class inherits from `Fsm` and adds states and behaviors for ground-checking, falling, and other pseudo-physics tasks like depenetration.

This allows any other machine that wishes to react to gravity, such as the player, enemies, or static rigidbody-like game objects, to inherit from `GravityFsm` to have access to all of that state behavior. The subclasses are free to build on top of the configurations provided by the base classes. For example, an enemy could implement a `GroundSlam` state that is entered when the `StartFrameGrounded` trigger is fired from its parent `GravityFsm` class without needing to worry about checking that itself.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/amadea-general.mp4}

### Rendering lots of foliage

Scenes in *Amadea* are large, semi-open levels, which has required the implementation of various performance-aware systems. One of these is the foliage system, which renders grass, flowers, and spikes.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/amadea-foliage-culling.mp4}

Foliage in *Amadea* is placed by the developer using special GameObject Component called a FoliageSystem. I give each of these systems a bounds (width and height) as well as configurations for foliage drawing, such as mesh, material, instance density, and instance scale/rotation. On Scene load, each FoliageSystem raycasts downwards at random points within its bounds. Each RaycastHit becomes an instance of foliage. Specifically, each foliage instance is stored as a Matrix4x4, for use in [Graphics.RenderMeshInstanced](https://docs.unity3d.com/6000.0/Documentation/ScriptReference/Graphics.RenderMeshInstanced.html). This amazing function lets you render multiple copies of a mesh, all at once. This means the individual foliage instances do not need exist as GameObjects within the Scene hierarchy, which alleviates a major CPU bottleneck.

Sadly, just using Graphics.RenderMeshInstanced to render all of the Scene's foliage still couldn't quite scale to what I needed. Large scenes could have tens of thousands of foliage instances, which is a lot of data for a GPU to process every single frame. Ultimately, the solution will be to cut down the set of drawn foliage instances each frame to only those that meet some criteria, namely, those that are within the camera frustrum and within some distance from the camera. But if you check this criteria for each foliage instance on every frame, you will quickly hit another CPU bottleneck.

A solution to this is a chunking system, which finds a attempts to balance the CPU and GPU usage. When FoliageSystems generate foliage instances on Scene load, instead of storing the data themselves, they send it off to a FoliageChunkManager singleton that conglomerates all of the foliage instances from all of the FoliageSystems in the Scene. This singleton then is responsible for determining which instances to draw each frame. The singleton "chunks" the instances together via dictionary.

```charp
public class FoliageChunkManager : MonoBehaviour
{
    // FoliageSystems call this in their Awake() method

    public void RegisterFoliage(Matrix4x4[] instances)
    {
        foreach (var matrix in instances)
        {
            Vector3 pos = matrix.GetColumn(3);
            Vector3Int chunkPos = Vector3Int.FloorToInt(pos / chunkSize);
            if (!_chunks.ContainsKey(chunkPos)) _chunks[chunkPos] = new List<Matrix4x4>();
            _chunks[chunkPos].Add(matrix);
        }
    }
}
```

With these chunks created, the manager is able to reduce the number of culling checks it needs to make down from the number of foliage instances to only the number of chunks. So, then, there is a balance that comes from defining chunk size. Chunk size is essentially "culling resolution". A larger chunk size, or lower resolution, will mean fewer CPU calls but more foliage being unnecessarily drawn when it should have been culled (such as being outside of the camera view), so greater average GPU strain. Inversely, a smaller chunk size, or higher resolution, will mean more CPU calls but a more accurate culling, for less GPU strain.
