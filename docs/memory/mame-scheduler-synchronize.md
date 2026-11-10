---
name: mame-scheduler-synchronize
description: "Frame runner models MAME synchronize + perfect_quantum and ends rounds on a scanline TIMER's cadence; device-timer bounding was tried and reverted (hosted MCUs); RAM/audio oracles gate it"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-16T04:26:20.740Z
---

2026-09-15/16 (branch fix-disabled, PR #145, #93/#88). `GeneratedFrameRunner` models MAME's scheduler as far as our device model allows:
- **synchronize**: `requestSynchronize()` aborts the running CPU (`abortTimeslice()` in cpu-codegen's run template + IrCpu); processors after it run only to that point; `onSynchronize` drains board `scheduledWork`; the round resumes. Routed for GENERIC_LATCH_8 writes, both execute.ts synchronize lowerings, and the Sounds Good write (`SoundRuntimeContext.synchronize`).
- **perfect_quantum**: `quantumWindow` = lockstep, most-behind processor runs one instruction. Float residue once left a 4e-16-line window that looped forever — clamp < 1e-9.
- **Round length**: a scanline TIMER's own cadence (`scanlineStart/scanlineIncrement` → a boundary every increment; frameEvents keep only lines with work, so MCR's every-line scantimer was lost and Rampage's Sounds Good 68000 died). Where a board declares none, the empirical 250 us cap stands.
- **Driver `timer_alloc` timers** (machine-start closure → `driverTimers` → genericTimers) are modelled; `enabled()` answers from emulated time. Simpsons' 4-cycle NMI block needs both. **Lower ONLY a timer built from an empty `timer_expired_delegate()`** — no callback, the driver just asks `enabled()`. Across all 82 targets exactly one qualifies (simpsons `m_nmi_blocked`). A driver timer with a real `FUNC()` callback already reaches the machine as a frame event / scanline callback / device line, so lowering it again drives it **twice**: 2026-09-16 the unfiltered version froze berzerk at frame 1 (same video hash at all 7 checkpoints, videoram 3 nonzero bytes, PC stuck 1303) and drifted galaga/digdug/invaders audio (galaga rms 0.0784→0.0794) while video stayed pixel-identical. Filter lives in `src/gen/emit-machine.ts`.

**Tried and reverted — ending rounds at device/sound-chip timers** (`nextTimerSeconds`, sub-line rounds down to 16 us). It is MAME's literal rule and fixed nothing that the scanline cadence did not, while silencing **xevious** and **tmnt**: their Namco 5xxx/06xx and Konami MCUs are *hosted helpers* ticked by device time, not scheduled processors, so deferring device synchronize and interleaving finely desynchronises them. Same reason device `schedule` is passed only to GENERIC_LATCH_8. Scheduling hosted MCUs as real processors is the prerequisite for going further.

**Why the flat 250 us cap was wrong for Gauntlet:** its sound CPU replies with a 13 us 5-byte latch burst that MAME's 32-line scantimer slices keep whole; a boundary every 190 us split it, the main CPU read half a reply and reset the sound board (attract noise where MAME is silent).

**Diagnosing an unexplained semantic-baseline diff:** the shape of the fingerprint tells you where to look. `semanticFingerprint` counts callbacks/frameEvents/devices/handlers/maps/palette, so *sha256 alone changing* means the delta is inside a structure none of those count. Prove it exactly by loading the new `board.json`, deleting the suspect key, and recomputing — if it reproduces the old recorded hash, that key is provably the whole diff. Then run the real contracts anyway: a baseline diff cannot tell you a new interrupt double-fires, and 6 of those 9 targets failed their contracts.

**How to apply:** judge against MAME, never goldens: `tools/mame-ram-oracle.ts` (every CPU), `tools/compare-game-audio.ts` (bands + onsets vs MAME WAV; also per-second RMS profiles for boot booms), and write-tap counts on a sound CPU's I/O in MAME vs ours (Rampage PIA: MAME 539177 by frame 1200). Bisect by copying individual compiled runtime files from a frozen good dist into a scratch copy. Galaga's 54xx boom is knife-edge on round length (4 vs 5 lines) and 20x quieter than MAME either way — a standing deficiency, useful as a canary. Related: [[scanline-interleave-limit]], [[latch-burst-interleave]], [[musashi-prefetch-slapstic]].
