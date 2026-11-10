---
name: frame-boundary-input
description: "#128: a machine sees input only at advance()'s four phases; the phase order reproduces the old dial timing exactly, and netplay/session/netlink/netplay.ts hang off it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 181429b1-4b09-408d-a3f9-20edace0f9a8
  modified: 2026-09-10T05:02:06.470Z
---

Since #128 (PR #135) every input source posts an `InputEvent` and `KeyboardInput.advance()` settles the ports once per frame. `input.sink` hands events to a `Session` instead; `latch()` applies the queue without the ramp, for probes that read a port without running a frame.

**Why:** it is what lets a session say which frame an event belongs to, so a peer's press replays into exactly that frame. Netplay, replay and the input log all rest on it.

**How to apply:** `advance()`'s four phases are load bearing and reproduce the pre-latch timing exactly — get them wrong and every dial golden moves.
1. digital edges, relative *holds*, and a relative tap's immediate travel;
2. `frameStart` snapshot (the interpolation baseline);
3. MAME's `PORT_KEYDELTA` ramp for anything still held;
4. queued `travel` (pointer/spinner), so it interpolates across the frame.

A press's immediate travel must be in phase 1, before the baseline, or it gets interpolated when it never used to be. In the run loop, every source posts *before* `input.advance()` — `pointer.advance()` moved ahead of it for that reason.

Other traps found doing this: `verifyInputBindings` reads ports with no frame, so it calls `latch()`; `releaseAll()` posts its port reset but fires its listeners at once (a polled pad must forget immediately); `reset()` is the harder one that also clears toggles, which is what two browsers need to start level. DIPs are generator-fixed and never player-editable, so they cannot desync a room.

Related: [[save-state-walker]], [[acceptance-run-flake]].
