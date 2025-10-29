## About

*Melody Temple* is a linear precision 2D platformer inspired by *Celeste*. It was made in 18 days for the [BigMode 2023 Game Jam](https://itch.io/jam/bigmode-2023/rate/2418042). As you play your flute, the environment around you changes. Find the necessary songs to climb to the top!

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/melody-rotation.mp4}

## Technical insights

### Player controller

The player controller for *Melody Temple* evolved from that I made for *[Ornament](/games?item=Ornament)*. Each player State is a Node within the Godot scene tree, which is parented to a controller Node that acts as the actual "machine".

In this way, the player state machine is natively integrated with the engine's object system, unlike Wasp machines used in my Unity projects, which are represented entirely within code. This Node-based approach provides some advantages, such as being able to export state parameters to a GUI.

The machine is pretty simple:

```python
# Player.gd
func _physics_process(delta):
	var new_state = _determine_new_state()
	if new_state != current_state:
		current_state.on_exit()
		current_state = new_state
		current_state.on_enter()
		time_in_current_state = 0		
	current_state.on_update(delta)
	time_in_current_state += delta
```

The main difference between this pattern and what I do with Wasp is that state transitions are not initiated by event-based triggers but rather by a single function.

```python
# Player.gd
func _determine_new_state():
		
	if current_state == $Idle:
		if $Run.condition(): return $Run
		if $Rise.condition(): return $Rise
		if $FallFromGround.condition(): return $FallFromGround
		
	if current_state == $Run:
		if $Idle.condition(): return $Idle
		if $Rise.condition(): return $Rise
		if $FallFromGround.condition(): return $FallFromGround
		
	if current_state == $Rise:
		if $FallFromAir.condition(): return $FallFromAir
		if $LedgeMount.condition(): return $LedgeMount
		if $Idle.condition(): return $Idle
		
	if current_state == $FallFromAir:
		if $Idle.condition(): return $Idle
		if $Run.condition(): return $Run
		if $LedgeMount.condition(): return $LedgeMount
			
	if current_state == $FallFromGround:
		if $Idle.condition(): return $Idle
		if $Run.condition(): return $Run
		if time_in_current_state <= coyote_time \
			and $Rise.condition(): return $Rise
		
	if current_state == $LedgeMount:
		if current_state.state_locked: return $LedgeMount
		if $Idle.condition(): return $Idle
		if $Run.condition(): return $Run
		if $Rise.condition(): return $Rise
		if $FallFromAir.condition(): return $FallFromAir
			
	return current_state
```

Further, individual states provide their triggering condition by implementing the virtual condition function.

```python
# Idle.gd
func condition():
	return (
		FSM.input_dir.x == 0 and
		Player.is_on_floor())
```

Overall, this approach is nice because the state machine and the game controller are one and the same; however, since implementing *Melody Temple*'s controller, I've learned that for more complex controllers, it's better to keep the state machine disjointed from the behavior code that runs in your update loop. It makes everything more flexible.

### Launching with momentum store

::video{id=https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/melody-launch.mp4}

A main mechanic in the game is using fast-moving platforms to launch the player when they jump off of them with the correct timing. When the player starts jumping, they check if they are standing on a moving platform, which can report its current velocity back to the player. The player then adds a boost to their jump as a function of the reported velocity.

```python
# Jump.gd
func on_enter():
	var moving_platform = get_moving_platform()
	if moving_platform != null:
		enter_velocity = moving_platform.report_speed()
	else:
		enter_velocity = Vector2.ZERO
```

In order to allow players to get the maximum boost without requiring them to jump with frame-perfect timing, the moving platforms implement a "velocity cache." Using a circular queue, the moving platforms track their velocity every frame over some time horizon, throwing away the oldest values when the queue fills up. When the platform is requested to report its current speed, it actually scans its entire queue and reports the maximum value currently inside of it, which is actually the platform's maximum velocity "recently." The larger the size of the queue, the larger the forgiveness window and the easier it is for players to achieve the maximum speed when jumping.

```python
# MovingPlatform.gd
func _physics_process(delta):
	target = get_new_position()
	position_delta = $TileMap.position - target
	$TileMap.position = target
	speed_cache.insert(position_delta)
```

Lastly, *Melody Temple* features many platforming sections that involve moving platforms parented to one another, where the motion of one platform affects another. My first approach to account for this was to just track the moving platform's world-space position delta (velocity) in their velocity caches. That would neatly capture the parented movement without any extra logic.

I soon realized that doing it this way means the player still needs to perform frame-perfect inputs in order to get the *platforms* to move at their maximum speeds. I solved this problem by only tracking local-space motion in the individual platform's caches but using a recursive reporting scheme where each moving platform first asks its parent platform to report its speed, which it then sums with its own reported speed before passing that value on, up until it reaches the player. The result is that each link in the recursive call reports its own individual maximum speed, which makes it much easier for the player to get those maximum-height jumps.

```python
# MovingPlatform.gd
func report_speed():
	var parent_report : Vector2 = Vector2.ZERO
	if get_parent() is MovingPlatform:
		parent_report = get_parent().report_speed()
	return parent_report + speed_cache.get_min().rotated(global_rotation)
```

## Gameplay insights

### Difficulty

### Convolution
