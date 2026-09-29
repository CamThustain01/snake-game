# Snake

A browser-based Snake game built with vanilla JavaScript and the HTML Canvas API. Built from scratch as a learning project to practise the Canvas API, game loops in JS, keyboard input, and ES modules.

## Status

🚧 In progress. Currently on Milestone 2.

## Milestones

- [x] **M1:** Canvas on screen, draw a square, `requestAnimationFrame` loop
- [ ] **M2:** Snake moves on a fixed tick, keyboard controls (no reversing)
- [ ] **M3:** Food, growth, score, game over, restart
- [ ] **M4:** Start/pause/game over screens, high score (`localStorage`), speed scaling

## Planning Notes

### 1. Separating logic from rendering
Game **state** (snake segments, food position, direction, score) is kept separate from **rendering** (drawing that state to the canvas). The grid is the shared coordinate system both sides use.
- Pros: easier to reason about, easier to test (e.g. with Vitest), can change visuals without touching rules.
- Cons: a bit more structure up front.

### 2. Snake data structure
The snake is an **array** of grid coordinates, e.g. `{ x, y }`. Grid coordinates (not pixels) keep the logic simple; convert to pixels only when drawing.
- Head is at index: _TODO: decide_
- Methods used to add a head / remove the tail: _TODO: decide_

### 3. Order of operations per tick
1. Work out the new head position from the current direction
2. Check collisions (wall, self)
3. Check for food
4. Update the snake (add head, remove tail or not)
5. Render

Movement must come first because collisions can't be checked until the next head position is known.
- Open question: what happens to the tail on the tick the snake eats? _TODO_

### 4. Spawning food
Food can't spawn on a snake segment.
- Option A: pick a random cell, retry if occupied.
- Option B: build a list of free cells, pick one at random.
- Which one and why: _TODO: decide, consider what happens when the board is nearly full_

### 5. Timing: 60fps rendering vs ~8 moves per second
The screen redraws every frame, but the snake should only move on a fixed tick. This is the fixed-timestep problem from game engines, solved with an **accumulator**:
- `requestAnimationFrame` provides a timestamp each frame
- Track time elapsed since the last frame and accumulate it
- Update game logic only when the accumulated time passes the tick interval
- Render every frame

Variables I need to track and where the check goes: _TODO: work out after experimenting_

## What I'm Learning
- Canvas 2D API
- `requestAnimationFrame` and timing
- Keyboard events
- ES modules (`import` / `export`)
- Git workflow with small, meaningful commits

## Running Locally
Open the project in VS Code and use the Live Server extension on `index.html`.
