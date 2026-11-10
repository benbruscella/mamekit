---
name: device-handler-namespace
description: "Generated board handlers from device classes share ONE flat member namespace and were resolved by bare method name — two collisions that silently corrupt unrelated hardware"
metadata:
  type: project
---

A composite MAME device that has no executable core is compiled into ordinary
board handlers keyed `ownerClass.method`, and every handler shares one
`this.state` member dictionary. Two collisions follow, both found on 2026-08-27
(issue #92):

**1. Resolution by bare method name (fixed).**
`generatedHandlerRegistry`'s address-map keys name a device *tag*
(`watchdog.reset_w`), and the fallback matched any handler whose method name
was unique. `watchdog_timer_device::reset_w` has no compiled program, so the
only surviving `reset_w` was `taito68705_mcu_device_base::reset_w` — every
Arkanoid watchdog kick therefore drove the 68705's reset line, holding the MCU
in reset for the entire boot handshake (~38k asserts in 60 frames).
Devices now carry `classHierarchy` in the board IR (from
`DEFINE_DEVICE_TYPE` + the parsed class bases), and resolution walks that
hierarchy first; a method owned by *another* device is never a substitute.

**2. Member collision across classes (live hazard).**
`atari_motion_objects_device::set_xscroll` assigns `m_xscroll`, which is also
Gauntlet's `required_shared_ptr m_xscroll`. Compiling that device method
speculatively overwrote the driver's share pointer with a number and the
playfield/MO scroll silently became 0 — video hashes moved while every state
hash stayed identical.

**How to apply:** *state hashes identical, video hashes changed* is the
signature of a member collision, not of a renderer bug. When widening the
handler closure, only follow speculative calls that cannot write state — the
closure supplement in `src/kg/build.ts` now follows a `m_dev->method()` call
only when the callee is a pure `return` accessor.
