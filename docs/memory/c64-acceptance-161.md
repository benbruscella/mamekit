---
name: c64-acceptance-161
description: "#161 c64/c64p contracts, one tile + regions, post-load gap; c64p contract (basic/tape/disk) found a tape-phase bug (timers fired before hosted CIAs were clocked); MAME VBLANK-at-t0 phase + u32 CPU clock drift explain the torn bottom row; SID DC made the silence gate blind"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T00:20:58.535Z
---

2026-10-19, branch 161-fix-commodore-64-part-2.

- **Contract shape**: scenario `software: {list, name}` (set at `.data/roms/<dumpsKey>/<list>/<name>.zip`,
  started via `src/runtime/title-start.ts`, shared with the shell) and `{atFrame, text}` actions
  (natural keyboard; presses + PLAY logged as `press`/`play` input-log entries for the round trip).
  c64p: basic (SID note + 10 PRINT), tape crazycom, disk bbsb (g64, own fast loader, ~2300 frames).
  Fetcher/harness find c64p firmware via `machineSetKeys` (family fallback computers/c64/bios/c64.zip).
- **Tape-phase bug** (fixed): Crazy Comets `?LOAD ERROR` when PLAY landed on one frame in eight
  (TYPEAT=151 in the bench); MAME loads at every phase. `advanceTimedHardware` fired device timers
  (c2n 44.1 kHz -> CIA `flag_w`) before clocking hosted CIAs through the instruction, so FLAG's IRQ
  pipeline started at the instruction's first cycle. Fix: `setGeneratedTimerPreFire` clocks hosted
  processors to each expiry first. Blast radius = boards with hosted/autonomous processors
  (digdug galaga polepos xevious dkong dkongjr arkanoid c64 c64p): only polepos moved (+2 of 387k
  sound writes). Cost: tape bench 7.0 -> 7.22 ms/frame (~3%, extra hosted ticks at each of the
  c2n's 880 firings a frame). Recipe: Lua read taps on $DC06/$DC07/$DC0D vs our wrapped `compiledMethods.flag_w`/
  `read` on the mos6526 module; diff Timer B widths around the first byte marker.
- **Not bugs, MAME-identical**: VIC `m_rdy_cycles` grows forever and `spin_until_time` is unbound
  (returns 0) -- but MAME's own BASIC FOR-loop timing with screen on/off is 118/117 jiffies, same as
  ours, so MAME barely steals badline cycles either. Don't "fix" it.
- **Open (documented in ARCHITECTURE.md)**: MAME's `time_until_pos` measures from VBLANK start, so
  VBLANK is at t=0 and MAME presents the C64 at VIC raster ~0; our frame runner presents at line 284.
  Plus CPU clock 985248.44 vs devices' u32 985248 -> VIC drifts 0.009 cycles/frame; after ~36 s a torn
  bottom row (raster 283 caught before its cycle-60 border plot). Both are board-wide phase/cycle
  changes; goldens recorded with the tear.
- **Audio gate**: SID PCM has DC 0.5, so raw `rms` never reads silent; the harness's silence check
  now uses RMS after the speaker high-pass (`audibleRms`), golden `rms` unchanged. SID probe =
  shared stream worklet (`C64_AUDIO_WORKLET_ARTIFACT`).

- **One tile / regions**: menu groups console+computer clones by MAME parent (`meta.json` `cloneof` from
  the CLONE_OF edge; `menuEntries`); room = `machine-versions.ts` (`chooseVersion`: only lister > hand
  pick > list `video` note > accepted). Each version boots its own config; `firmwareFrom` lets one
  version's kept firmware boot another. Room firmware bar = `firmware-status.ts` (counts every dumped
  chip: the C64's CPU region holds no ROM, so BASIC/KERNAL are not "critical").
- **device_post_load was never called** (found by c64:tape round trip: SID voices kept the wrong
  `outProc` function pointer after a load). Board.load now calls `postLoad()` on every device; the
  SID compiler needed `device_post_load` in its wrapper list. Boards with such devices: berzerk
  gauntlet hyperspt marble qix simpsons tmnt trackfld wardner c64 c64p -- all passed unchanged.
  Debug aid: `MAMEKIT_STATE_DIFF=1` diffs the whole saved machine one frame after the replay's load.
- **promote-game can't promote a target whose evidence covers a gap** (certification reads accepted
  contracts only) and its package audit is arcade-only; use `promoteCandidate` directly. The running
  dev server reads CANDIDATE_TARGETS at start -- restart it to see a promotion.

See [[mid-instruction-timer-order]], [[mame-scheduler-synchronize]], [[device-clock-u32]], [[c64-autoboot-161]].
