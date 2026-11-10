---
name: vrc7-ymfm-188
description: "#188 (2026-10-25): ymfm's OPLL compiled through the device compiler, bit-exact vs native ymfm; native-oracle recipe; the general gaps; VRC7 level/ROM/speed findings and the measurement traps"
metadata:
  node_type: memory
  type: project
  originSessionId: e877979f-f025-4533-9000-6023ed79e7f1
  modified: 2026-10-25T01:51:10.965Z
---

Branch 188-nes-vrc7-sound-compile-ymfms-opll-ds1001, 2026-10-25 (uncommitted at time of writing).

**Native ymfm oracle** (the sharpest tool for any ymfm chip): ymfm is
standalone, so `clang++ -std=c++17 -I../mame/3rdparty/ymfm/src harness.cpp
ymfm_opl.cpp ymfm_adpcm.cpp ymfm_pcm.cpp` builds a reference that reads a
"w addr data / g n" script; `#define private public` before the include dumps
operator/channel state per sample to diff against ours. Found every bug fast.

**General gaps it took** (all generic): 3rdparty include root; include guards +
cross-file defines in literal #if; namespaces/typename; `using` aliases across
classes (`parent::`, `ChipClass::output_data` -> `ymfm_output__2`); class
templates per instance; constructor chaining via base initializers;
`std::make_unique<T<...>>`; reference/mutable/std::array members; class-scoped
constants SHADOW the flat table (REGISTERS 0x40 vs OPL3's 0x100; bool
constants); static methods of other classes; class static arrays defined out
of line (east const, per-class: four OPLL variants share a name).

**Interpreter traps fixed:** fast-path assign skipped struct copy; struct-array
`->` decay (but NOT for a property the array has: range-for `__range.length`
broke NES pcb lookup — nes.spec caught it); a reference bound to a call's result
re-ran the call per read (`output->clear()`); struct methods saw a defaulted
`data` handler local; a plain class's `clock()` was shadowed by device clock.

**Speed:** emitted DS1001 4x real time. Lagrange 29 -> 81 fps after: direct
calls on held objects (objectType), fixed-arity self handles, and reusing
storage for uninitialised local struct arrays (256 structs per stream update
was half the frame).

**VRC7 facts:** ROM delivered as config.roms region tagged `cards:["vrc7"]`
(`nes_slot:vrc7:vrc7snd:internal`), filtered by mountCart; children need their
MAME tag (deviceTag) or the region never resolves (music on zero patches).
Lagrange only plays FM after Start + A presses (~22.5 s): compare-game-audio
`--press 299:Enter,450:KeyZ,...` (new). MAME's WAV puts the "addon" speaker on
channel 1 (ch0 = muted APU). Ours is +0.9 dB = APU route 0.90 by design;
>8 kHz MAME's resampler cuts, our box average doesn't (follow-up).

**Measurement traps:** harness ignores contract actions under captureAudio
unless `captureActions: true`; a contract scenario without a golden breaks
loadGameContracts for every tool; `pgrep -f "pattern"` matches the sampling
loop itself (use `ts[c]`); app-build deletes dist/app on tsc OOM (8 GB heap hit
once; MAMEKIT_TSC_HEAP env override added).

Related: [[nes-184-part3]], [[mame-oracle-tool]], [[dont-wipe-served-dist]].
