---
name: pokey-200
description: "#200: POKEY compiled whole from pokey.cpp as a stream device; round-scheduled execute devices, synchronize codegen, compiled struct methods, constexpr RES_K/CAP_U, carry rounding moves 9 goldens"
metadata:
  node_type: memory
  type: project
  originSessionId: 81ef9b37-5126-4aef-b274-3bd8fbbdac50
  modified: 2026-10-28T05:58:54.976Z
---

Issue #200 (branch 200-34-generate-pokey-from-mame-engine-and-register-reads, 2026-10-28):
POKEY is now `extractStreamDevice` (speaker/extract.ts), sound kind `stream`; the hand-written
pokey runtime, acceptance and pokey-compiler are deleted.

General mechanisms it needed (all reach other machines):
- **Round-scheduled execute devices**: a non-CPU `device_execute_interface` device runs after the CPUs in each round,
  as in MAME, so it lags the CPU inside a slice. Excluded: perfect-quantum boards (C64 VIC/CIAs keep per-instruction
  delivery), hosted processors, and bus masters (`out_hrq_cb`, the I8257; dkong got worse in the round).
- **`synchronize(delegate, param)`** lowers to `runtime.synchronize` (`schedulerSynchronize` in device-codegen.ts).
  With no args it only ends the timeslice (`endTimeslice`). A 6502 that suspends mid-instruction reports `position`,
  so the round stops where it synchronized.
- **Struct methods compile** (`allocations[type].compiledMethods`, one runtime per struct in STRUCT_RUNTIMES).
  Marble was at 4-13 fps while `inc_chan`/`check_borrow` were interpreted; now about 31 fps.
- **constexpr helpers** (rescap.h RES_K/CAP_U) expand in configCalls. centiped's `set_output_opamp_low_pass`
  was silently dropped before, so it played 11 dB low.
- **Carry rounding**: `Math.floor(carry + 1e-6)` in generated-frame.ts. A 13.9999 carry ran 13 cycles and
  put the SKCTL write a clock early. This alone moved the goldens of gunsmoke, mk, mrdo, nes:lagrange, robotron,
  shinobi, spyhunt, timeplt and c64:tape (bisected by setting it to 0 in dist/runtime/core/generated-frame.js).
- missile's POKEY range lives in a bank device: `installDeviceHandlers` now covers bank-device ranges.

Later the same day:
- **bzone went silent.** With the pokey kind removed, emit-machine's board plan picked `discrete`, an unlowered DISCRETE device, while lower-sound's app plan said `stream`. Check that config.json and board.json agree on sound.kind across dist. Now `discrete` loses to any stream device.
- **The stream worklet pushed every write as a sample**, so the board's `m_discrete->write` became full-scale clicks (rms 133). The renderer's `write()` now takes only `*.pcm` writes, and the probe shares it.
- **marble went from 32 to 45 fps** (main logged 64-69). Three emitter fixes: local C arrays are subscripted directly (with `?? 0` for short initializers), constant int local arrays are plain arrays instead of `new Int32Array` per call, and elements of allocated struct arrays count as object receivers. The struct-method wrapper no longer allocates. POKEY is still 18%; the screen update (22%) and the slapstic account for the rest.
- `fnm exec` kills long record-goldens runs (gauntlet/marble). Call the node binary directly: ~/.local/share/fnm/node-versions/v26.12.1/installation/bin/node.
- The user ran `rm -rf .cache dist`, which deleted the MAME baseline (.cache/oracle/baseline). Measure with `mame-oracle --audio` directly and quote the old compare numbers.

- **Marble stuttered at 50 fps in the browser** (main is 63 fps, measured via a main worktree plus `dev-game marble`, and MAMEKIT_OUT_ROOT). Most of the win was outside POKEY: indexValue/dereference now test ArrayBuffer.isView first (the board's per-pixel row reads). Fields of allocated struct arrays are read via `self.$members`, and `*this` is emitted raw. Marble is now 60-63 fps.
- **CI failed elevator/junglek/qix.** Emitted `runtime.synchronize` looked the callback up in raw bindings, but board handlers live in `prepared.referenceCalls`. Only gen:all re-emits boards, so the targeted runs missed it. After a board-codegen change, test every board that emits the new construct (grep dist board.js).

**Why:** the remaining WORSE sub-measures have known causes. bzone has an unlowered DISCRETE network
(a power-on click) and a pre-existing CPU timeline about 80us behind MAME. centiped's audio:contract
regression comes from gameplay divergence.
**How to apply:** if a 6502+POKEY board drifts, check round placement first. If many goldens move after
a frame-runner change, bisect the constant in dist before suspecting codegen. See [[mame-scheduler-synchronize]]
and [[perfect-quantum-device-access]].
