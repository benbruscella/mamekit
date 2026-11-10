---
name: board-sound-vs-app-sound
description: "two separate sound plans — board.json's and config.json's — must both name the kind, or the shell never opens an audio context; the Game Boy shipped silent on this"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-09-02T08:53:16.966Z
---

Found 2026-09-02. The Game Boy's APU was rendering correct audio and **none of
it reached a speaker**, because a target has *two* generated sound plans and
only one of them was wired:

1. **`generated/board.json` → `sound`** — built in `src/gen/emit-machine.ts`.
   Drives `installSoundRuntime` (the `INSTALLERS` map keyed by `sound.kind`),
   i.e. what runs beside the board.
2. **`config.json` → `sound`** — built in `src/gen/generate.ts` (a long
   `? :` chain ending in `{ kind: 'none' }`). Drives the *shell*:
   `if (cfg.sound.kind !== 'none')` decides whether an AudioContext is opened
   at all, `cfg.sound.clock` is the context rate, and the worklet loaded is
   `${cfg.sound.worklet ?? cfg.sound.kind}-worklet.js`.

The Game Boy had (1) and not (2), so `audio.start` was never called. **Adding a
new sound kind means adding a branch to both**, plus emitting the worklet.

**The worklet for a stream-rendering chip is shared**:
`generatedStreamWorkletSource` in `src/mame/stream-worklet.ts` — it queues a
frame of samples, resamples the chip's rate to the context rate, holds the last
value when starved, and registers a processor named after the sound kind. The
TIA and the Game Boy both use it. A chip that renders beside the CPU needs
nothing more; see [[audio-engine-placement]] for which side a chip belongs on.

`audit:generated` now fails a target whose board IR declares a sound plan the
app config does not play, or whose config names a worklet that does not exist.

**How to check a browser audio path by hand** (the Node harness cannot — see
[[acceptance-harness-coverage-gap]]): open the app with `?qa` so the run loop
stops and `window.mamekit.step(n)` drives it deterministically, then
- tap `mamekit.audio.node.port.postMessage` to see what reaches the worklet;
- read `mamekit.audio.monitor()` (an AnalyserNode on the post-gain mix) for
  what reaches the speaker;
- inject a square wave straight to the port to prove the graph itself works.

Two traps that cost time: a console needs its machine ROM re-supplied on every
reload ("never stored"), so a fresh browser profile boots to a blank canvas and
no `window.mamekit`; and **Start pauses Super Mario Land**, so a real-time key
press easily lands the game on a silent screen where the APU is legitimately
off — see [[a2600-verified-behaviour]] for the same lesson.
