---
name: worklet-backlog-latency
description: Queued worklet frames are permanent audio latency; opm/opn lacked the 3-frame cap every other emitter has. Fixed 2026-08-24.
metadata: 
  node_type: memory
  type: project
  originSessionId: 9fc833fb-829a-48ce-9f65-1997827317f8
  modified: 2026-08-24T09:29:32.708Z
---

Each generated audio worklet holds a `frames` queue and drains exactly one
queued frame per frame of audio time, so **every queued frame is latency that
never comes back**. A main-thread stall starves the worklet (it holds
`lastSample`, consuming no queued audio time), then the shell's catch-up loop
in `src/runtime/shell.ts` delivers up to 5 frames at once — pure backlog. Left
unbounded it only grows: ghouls' sound effects ran ~500 ms behind the action.

Every emitter caps the queue at 3 frames (`audio-compiler.ts`,
`okim6295-worklet.ts`) EXCEPT the two FM ones, `opm-compiler.ts` (YM2151) and
`opn-compiler.ts` (YM2203) — fixed 2026-08-24. The FM cap must **fast-forward**
the dropped frames' register writes into the mixer, not `shift()` them away
like the PCM emitters do: an FM chip is a register state machine and a
discarded key-on never sounds.

**Why:** this is invisible to `npm run test:games`. The Node probe builds
`GeneratedYm2151FrameRenderer` directly (`src/hardware/ym2151/acceptance.ts`)
and never instantiates the `...Processor` that owns the queue — so worklet
queue bugs carry zero golden churn and zero acceptance coverage. See
[[acceptance-harness-coverage-gap]].

**How to apply:** treat "audio drifts steadily behind gameplay" as a queue-depth
bug, not emulation drift — check the worklet's `frames` cap first. Real
emulation drift shows up in the Node audio goldens; queue latency cannot.
