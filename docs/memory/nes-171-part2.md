---
name: nes-171-part2
description: "#171 (2026-10-24): MMC5 40->11 ms (accessor roots + preparedCall), NES frame offset fixed (device beam ignores power-on credit), 5B audible via 7 general AY gaps, APU is the hand-written outlier; methods that found them"
metadata:
  node_type: memory
  type: project
  originSessionId: 8015a117-cc2c-4da6-a8b7-04ae69d05f24
  modified: 2026-10-23T20:37:44.763Z
---

Branch 171-finish-the-nes-part-2, 2026-10-24 (uncommitted at time of writing).

- **Speed:** cvania3u 40 -> 11 ms/frame. Device-codegen accessor roots
  (no-param `return` / 1-param statement) -- device scope only, NOT board
  (`boardScope`): board accessor roots compiled mslug's get_memcard_status and
  broke it. Plus `IrDevice.preparedCall` memo used by invokeSlot, call(),
  child callables, link dispatch and the CPU-style finder fallback.
- **Frame offset:** `powerOnCreditLines` -- device-facing time_until_pos/vpos
  read the beam minus the construction credit. NES offset 0 vs MAME. Residual
  22-line phase vs MAME's VBLANK origin breaks jf24/tqrom start-up; full MAME
  origin (lead-in pass from vbstart) tested in dist, deferred (board-wide).
- **Oracle RAM skew:** ours reads RAM at frame end, MAME at VBLANK start (22
  lines apart on NES) -- ~20 bytes always differ. Not emulation.
- **Bus-trace oracle:** MAME logs the reset-vector reads ($FFFC/D), ours
  doesn't; compare with a 2-entry shift (`--keep`, then diff work/*-io.txt).
- **Audio levels:** `compare-game-audio.ts --cartridge X --start --mute
  :maincpu:nesapu`; rebuild our cart-only signal from the writes trace
  (stream.pcm). Generated chips all +7 dB vs MAME WAV (fixed scale); the
  hand-written APU (apu.ts, OUT_GAIN 2.0) varies +3.7..+11.9 by title ->
  generate NES_APU (lowers with 0 diagnostics) is the real fix (#178 #37).
- **5B silent** until: member bounds with class constants, qualified static
  struct lift + ctor `&table` pointers, ctor bodies interpreted at generation
  (runConstructorBodies), ALLOCF, smart-ptr get(), qualified constexpr,
  struct methods (structMethods + STRUCT_METHODS, own minimal bindings --
  spreading device.bindings stored into the device!), set_sample_rate.
- MAME tag listing via Lua `manager.machine.sounds`; empty-ROM softlist areas
  may carry `loadflag="fill" value="0xff"` (fjump2 bwram).
- mslug attribution done by stashing src + clean gen:all in the user's tree
  (no worktrees, per [[dont-wipe-served-dist]]).

Related: [[mame-oracle-tool]], [[console-blank-regressions]], [[unresolved-call-census-178]].
