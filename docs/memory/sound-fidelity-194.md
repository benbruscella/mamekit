---
name: sound-fidelity-194
description: "#194/PR #196: sound writes stamped by the running CPU (one-line rounds too), MAME LOFI resampler shared, Gauntlet brightness was TMS5220 speech hold not POKEY, OPM worklet had no set_output_gain; compare-game-audio traps"
metadata:
  node_type: memory
  type: project
  originSessionId: e718a613-769a-4f2e-af39-f71158fe7f10
  modified: 2026-10-25T13:54:23.207Z
---

Opened 2026-10-25; PR #196 (branch 194-sampled-dac-sounds-smear-sound). The user commits on this branch themselves.

**Timing fix.** `soundFraction()` used `currentLine + currentLineFraction`, where the fraction is progress through the whole multi-line round. Now `frameLines()` uses `GeneratedFrameRunner.runningFrameLines(runningSliceCycles + core elapsedCycles)`. It must also cover **one-line rounds**: the old in-line fallback restarted at 0 and ignored the previous slice's overrun (`runStartLines`), so Gyruss's i8039 stepped back 0.2 lines at every seam into a one-line round (frame line 32 = vbend). `runningBeam` keeps its one-line exception (beam reads, 2600). Mat Mania 4.4% → 0%, Gyruss 0.6% → 0%.

**Gauntlet brightness was the speech, not the POKEY.** Windowing showed the HF excess only while the TMS5220 spoke. The OPM worklet held each 8,135 Hz sample, where MAME uses LOFI interpolation. `src/mame/lofi-resampler.ts` (MAME `audio_resampler_lofi`) is a shared emitted snippet; a worklet must emit it ONCE (the POKEY core no longer includes it, its hosts do). Still sample-and-hold: OKI, K007232, K053260, uPD7759 and raw samples in the OPM worklet. Likely the same imaging; not measured.

**OPM worklet had no set_output_gain.** A gain write fell through as a YM2151 address-latch write (`chips[floor(offset/2)].write(0, …)`). Now handled first, because auxiliary tag-prefix routing would send an OKI/uPD gain write to the chip as a command. config.json's YM2151 plan gained `deviceTags`. `ALL_OUTPUTS` = 65535 is in DEFAULT_CONSTANTS. This fixed the reset click: `mixer_w(0)` had muted only YM output 0.

**Emitter trap:** a backtick in a comment inside an emitted-source template literal ends the string (TS1005 at that line).

**compare-game-audio traps:**
- The Homebrew MAME on PATH is 0.288 and the tool refuses it: pass `--mame` with the Google Drive 0.289 binary ([[mame-reference-capture]]).
- Gauntlet ignores input for about 370 frames (cold EEPROM): `--press 450:Digit5,560:KeyZ,900:Space`.
- MAME's WAVs are stereo and ours mono. MAME keeps DAC DC; our 20 Hz filter removes it.
- Window the HF share (first-difference energy relative to level) per 0.1–0.5 s and line it up with the per-frame writes log to find which device is responsible. Band totals over 30 s hide it.
- `--build-runtime --build-app` can die on a native signal ([[host-machine-faults]]) after deleting `dist/runtime/generated/audio`. Check the worklet count (54) after every rebuild.

A Gauntlet "potion alarm" was reported once mid-rebuild and never reproduced; level 1 near the start has treasure and ghosts, no potion. Related: [[codegen-silent-zero]], [[board-sound-vs-app-sound]].
