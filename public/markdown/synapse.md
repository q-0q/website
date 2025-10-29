## About

*Synapse* was developed for the Fall 2022 season of Imbricate Collective, a multimedia collective based in Ann Arbor, MI, USA. It explores flow, feedback, and breath in music.

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/synapse%20demo%20video.mp4}

*Synapse* behaves as a graph-based synthesizer in which the user can create and connect Nodes. When triggered, the Nodes play sounds and pass their signal along to the next Node(s) in the graph.

Each Node's synth patch can be configured independently, with slider controls for envelope release, reverb, and harmonics. Waveform can also be selected between sine, saw, and square. A master tempo slider controls the rate at which signals are propagated between nodes and affects tuning for the entire graph.

## Technical insights

### AudioHelm

Synapse is built using [Helm](https://tytel.org/audiohelm/), or more specifically, the [AudioHelm package for Unity](https://tytel.org/audiohelm/), which lets you spawn Helm instances as Audio Mixers within the game engine. You can then use these Audio Mixers to tweak patch settings and fire note triggers. A major limitation of AudioHelm I ran into is that, because they are bound to Audio Mixers, you cannot dynamically create instances at runtime. This was a problem because my goal for *Synapse* was to support both

1. each Node having an independently configurable patch, and
1. the user's ability to create and delete Nodes at will

I got around this issue by statically configuring 20 Audio Mixers with AudioHelm instances and treating them like an object pool: Nodes are assigned an unused instance when they are created. This limits the maximum number of nodes that can be created at once.

Unfortunately, the AudioHelm package is now deprecated and is no longer available for purchase.

## Gameplay insights

### Intuition and chaos

I wanted *Synapse* to be a way for people with no synthesis experience to feel the wonder of a sound unfolding in front of them. I left input controls like reverb and decay unlabeled to prevent the intimidation of unfamiliar concepts and to maintain an air of mystery, leaving one with only their ears to guide them.

The signal-passing mechanic of the Node graph often leads to positive feedback loops where the graph becomes saturated with noise, where the only way out is to start deleting Nodes. In my view, this ephemeral and unstable nature of the thing one creates with *Synapse* encourages experimentation.
