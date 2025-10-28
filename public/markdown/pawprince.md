## About

*PAWPRINCE* is a small puzzle game where you play as a feline prince tasked with saving his palace from the wicked White Wizard.

## Technical insights

### Procedural fog

For *PAWPRINCE* I implemented a fog-of-war system that creates volumes of black fog. Observers, such as the player, carve out lines of sight inside the fog, creating a nice volumetric effect. Game objects are hidden in the fog using simple raycasting.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/pawprince-thumb.mp4}

Rather than line-of-sight being treated like a 3D sphere casting out of from the observer in all directions, occlusion is instead only calculated along two axes - it's essentially treated like a cylinder, not a sphere. This means walls of fog carved out by line-of-sight will always be perfectly vertical, instead of domed like they would appear if the line-of-sight was spherical. When using the fog in a top-down camera setup, it creates a very clean and precise look, regardless of how tall the occluders might be.

For each fog volume in the scene, I dynamically instantiate an orthographic camera looking straight down. This camera only captures renderers in a special Occluders layer, allowing me to select which GameObjects in the scene actually obscure line-of-sight. This occlusion camera outputs to a special occlusion texture which is entirely white except for the top-down silhouttes of occluders which are rendered as black.

This occlusion texture, along with the world positions of all of the observers, are then fed into a compute shader. The compute shader uses a raymarching technique to compute line-of-sight and outputs a black-and-white 3D render texture that represents the desired fog opacity as voxels.

The 3D render texture is lastly fed into a fragment shader that creates the visible fog. This fragment shader contains the parameters for fog color, opacity, and other effects like noise displacement. Because at this point the shape of the fog does not match the shape of the mesh on which the shader is being used (it's just a box mesh), I have to use a complex set of rules to tell the shader how deep to penetrate into the mesh surface to sample color. The same technique is how the "light diffusion" effect is created, and why the fog looks lighter at the edges. The end result is pretty believable, but visual artifacts can be seen when viewing the surface of the fog volume at very steep angles.
