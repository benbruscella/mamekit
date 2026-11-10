---
name: audio-engine-placement
description: "Which thread a generated sound chip's engine runs on is decided by what reads it back, not by what it sounds like; plus the aux-device path for a board with more than one chip (gauntlet #88)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 65975871-f4bc-4587-8e45-46ca4ebadb94
  modified: 2026-08-26T10:43:30.770Z
---

`sound.kind` names **one** chip — the one that owns the worklet. Every other
chip routed to the same speaker is an entry in `sound.auxiliaryDevices`,
lowered by `lowerAuxiliaryAudioDevices` in `src/gen/emit-machine.ts` from a
`AUXILIARY_AUDIO_METHODS[type]` table plus the driver's own `add_route` gain.
Adding a chip to that table is what makes it appear at all — gauntlet's POKEY
and TMS5220C were silently dropped for exactly this reason, and
`generated-board.ts` additionally stubbed their writes to `() => {}`.

**The placement rule.** A chip the CPU only *writes* to belongs in the worklet
(POKEY). A chip whose pins are wired back into a port the CPU *polls* cannot
be, and must run on the main thread as a generated device.

TMS5220 is the forcing case: `/READY` feeds a port bit the sound CPU tests
before every byte, ready depends on the FIFO level, the FIFO level depends on
how fast the frame parser consumes bits, and the parser *is* the synthesiser.
Across a worklet boundary that state has to exist twice. So the engine is
emitted as a device IR whose methods are backed by `compiledMethods` (the hook
in `generated-device.ts` — `compiled(executionContext, ...args)`, so per-instance
state keys off `context.members` in a WeakMap). The board imports it like any
other generated device; only PCM crosses to the sink, one sample at a time.

**Pumping a main-thread chip:** `tickCpu` fires once per processor, so exactly
one CPU must drive the clock or elapsed time is counted twice and the chip runs
at double speed. It must **not** be the CPU that owns the chip's bus —
gauntlet holds its sound 6502 in reset for ~370 frames and a speech chip does
not stop running because the CPU talking to it has. Use `cpus[0]`. Ask the
device for its rate each tick rather than caching it: gauntlet's speech-squeak
line calls `set_unscaled_clock` while the chip is talking.

**How to apply:** verify sample counts at the pump, not from
`captureAudioWrites` — that trace under-reports (192,598 traced vs 244,364
actually generated over the same run), and I chased a non-existent 0.79x rate
bug because of it. The arithmetic to check is `emulated seconds x clock/80`.

See [[latch-burst-interleave]] for the rest of the gauntlet #88 work and
[[known-broken-targets]] for target status.
