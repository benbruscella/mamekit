---
name: acceptance-harness-coverage-gap
description: "The acceptance harness bypasses the real shell audio path; the e2e browser suite is what now covers it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7330d0f2-51bb-4376-aa0d-6d036a5c94f3
  modified: 2026-07-23T09:55:12.704Z
---

`src/games/acceptance-harness.ts` verifies audio by feeding the board's
soundWrite stream **directly into the DSP core** (e.g. `GeneratedNamcoWsgCore`,
`GeneratedDiscreteAudioCore`). It does NOT exercise the real browser path:
`shell.ts` sink → `AudioOutput.write(offset, data, frac, method)` →
`postMessage({type:'batch'})` → worklet `onmessage` → `render` → `process`.

**Why it matters:** On 2026-07-22 a method-routing refactor (sound writes route
by method name, not encoded offset) updated the harness but not `shell.ts` —
`shell.ts` called `audio.write(offset, data, frac)` dropping the 4th `method`
arg. Discrete/counter-LFSR games (galaxian) went silent in the app while the
harness stayed green. Fixed in commit 0df6478.

**How to apply:** When touching the audio write contract (soundWrite signature,
AudioOutput, worklet message shape, offset/method routing), test the FULL shell
path, not just the DSP core. A scratch probe pattern exists: load the emitted
`*-worklet.js` under AudioWorkletProcessor/registerProcessor stubs, wire a fake
AudioContext/AudioWorkletNode whose `port.postMessage` feeds the real processor,
drive `AudioOutput` + `board` exactly as `shell.ts` does, and pull samples via
`processor.process()`. Better: fold this into the harness so it's automatic.

**Now covered (2026-08-20, issue #56):** `npm run test:e2e` (Playwright, `e2e/`)
plays each machine through the real app and measures the post-gain mix via
`AudioOutput.monitor()`. Attract mode reads exactly `0`, gameplay ~0.33 RMS, so
a silent-app regression fails there even while `test:games` stays green. The
harness itself still bypasses the path — run the browser gate after any audio
write-contract change.
**Second gap, found 2026-08-21 (issue #58, Gyruss):** the e2e *live* pass only
asks "did anything reach the speakers", which one dead channel passes trivially.
Gyruss's entire i8039 percussion channel emitted nothing — `m_discrete.write`
was bound ONLY inside `configureHostedProcessor` (hosted firmware MCUs), and
Gyruss runs its 8039 as a full CPU in `execution.cpus`, so its lowered `dac_w`
called an unbound binding and silently did nothing. `NODE()` was unbound too.
Fixed by binding both at board level in generated-board.ts.

The e2e contract pass now also compares the board's sound-write counts against
the token's audio golden (browser real-time audio cannot reproduce the offline
PCM hash, so the browser checks what the board ASKED FOR and Node checks what
the DSP made of it). 204,750 missing writes against a total of 193,874.

**Method that found it:** MAME Lua `install_write_tap` on the audiocpu I/O
space, decoded to (frame, chip, register, value) and diffed against our
soundWrite stream. Register histograms matched perfectly — which is what proved
the bug was in rendering/routing, not emulation. **Install the tap at script
load, NOT inside the frame notifier**: the notifier fires at the END of frame 1
and misses every power-on register write (this cost a false "MAME never writes
r7" conclusion).

Related: [[compiler-not-porter]], [[frugal-blast-radius]].
