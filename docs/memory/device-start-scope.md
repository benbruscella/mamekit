---
name: device-start-scope
description: "Lowering device_start for every board device broke gauntlet; the rule that works is 'only a device whose methods the board runs as handlers', and the discriminator is not what it looks like"
metadata:
  type: project
---

2026-09-13, from [[spyhunt-ssio-sound]]. Midway's SSIO needs its `device_start`
run (that is where its duty-cycle PROM becomes `m_ayvolume_lookup`). Running
*every* board device's `device_start` is not the way.

Emitting the closure unconditionally in `kg/build.ts` added five handlers to
gauntlet — `atari_motion_objects_device.{device_start,force_update,compute_log,
round_to_powerof2}` and `atari_slapstic_device.device_start` — and moved it off
its golden from frame 60. **The IR diff vs `main` was those five handlers and
nothing else** (every other board.json section byte-identical), which is how to
attribute this kind of thing: generate the same target from a `main` worktree
and diff section by section.

**Two traps:**
- Commenting out the `runDeviceStarts()` call in `dist/runtime/core/
  generated-board.js` did **not** restore gauntlet. It is the *presence* of the
  extra handlers, not their execution — the runtime resolves handlers by name
  in several places, so a newly-available `force_update` changes behaviour on
  its own. Bisect by deleting handlers from `dist/.../generated/board.json`,
  not only by disabling code.
- "The class already owns handlers on the graph" looks like the right
  discriminator and is not: `atari_motion_objects_device` owns
  `draw`/`render_object`/`build_active_list` because it is a *renderer*.

The rule that holds: defer the lowering to a post-pass after every address map
and devcb has put its handlers on the graph, and skip a class that contributes
none. Then have the runtime skip any device it materialised as a generated core
(`this.devices.has(tag)`) and any handler whose program carries diagnostics —
a device's lifecycle is best-effort, unlike the driver's own, which throws.
