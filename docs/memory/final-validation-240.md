---
name: final-validation-240
description: "#240 final validation lessons — stale .cache/dev builds, offset-flip WORSE, recorder vs contract audio, referent pointer exposure"
metadata:
  node_type: memory
  type: project
  originSessionId: e4e6f132-9e50-49c2-bac6-07e6745af23e
  modified: 2026-11-09T01:28:56.399Z
---

#240 final validation (2026-11-09): 102/102 contracts and 105/107 compare scenarios same or better. Posted to issue #240.

- A `.cache/dev/<g>` directory is only as fresh as its last `check.sh` run. Elevator's was from before "Video 2", so it still had the deleted `combine_weights` shim and hid the gap. Check build-manifest.json's mtime before trusting a dev result.
- Running 4 acceptance shards plus the user's VM starved fps: berzerk dropped to 5.5 fps, against 86 alone. Use 2 shards for fps-honest sweeps.
- `record-goldens` produced a different gauntlet audio hash from the one the contract reproduces every run. Keep the contract's value. See [[acceptance-run-flake]].
- The compare marked gauntlet pixels:none WORSE because it picked offset −1 on static attract frames. A direct oracle run at offset 0 was exact. See [[attotime-220]] (offset-flip trap).
- Exposing every `m_*` field of a device through its finder also exposed device pointers. NES `m_cartslot->m_cart` turned truthy, and machine_start took the branch the NES family applies statically. Expose value fields only.
- Vector line drawing is host presentation (`src/runtime/vector-display.ts`). It was lost with DIRECT_SCREEN_SHAPES.
- Open lead: venture's RAM diverged more after #240 (32188 → 38250 B), with pixels exact.

Related: [[direct-screen-removal-240]].

CI fps floors after #240 (2026-11-09): CI runners run at about half local speed, so a 20% slowdown fails CI's floors (dkong 42.7 against a 45 floor) while local still shows 80+ fps. Deleting the direct-screen shapes exposed codegen declines, so find them by tallying `executeGeneratedMachineProgram` by handler name in a `.cache/dev` copy, then probing `supportsMethod`. Six were fixed:
- the per-pixel `CALL_METHOD` regex
- `&scalarLocal`
- indexed shares `m_x[N]`
- `genericTimers` handlers as codegen roots
- the `machine().tilemap().set_flip_all` chain
- declared `stateMembers` in scope, and deduced template parameters becoming `auto`

junglek went from 50 to 98 fps.
- Fix 7 (elevator, 51 → 68 fps): a device that includes `logmacro.h` without defining `VERBOSE` gets `VERBOSE=0` and `LOG_GENERAL=1` (device-compiler.ts).
  - Without it, every `if (VERBOSE & LOG_X)` guard declined its whole method, including the 68705 timer `update` that runs every instruction.
  - Read the raw files: the preprocessor pass has already consumed `#include` and `#define`.
- Tally trap: IrDevice.executeMethod counts compiled calls too. Only methods missing from compiledMethods are interpreted.

**Asteroids ship off-screen (manual check, after CI fixes):** vector-display.ts subtracted `min_x*65536` from 16.16 beam coords; MAME's vector_device::screen_update subtracts `visarea.min_x` UNSCALED (xscale = 1/(65536*width)), so beam 0 maps to target 0. Asteroids' visarea starts at 522,394, so the picture shifted off the top-left and the centred ship vanished. bzone (visarea from 0,0) unaffected. Video 5 had re-recorded asteroid's goldens, so the contract absorbed the shift.
**Why:** a golden re-record bakes a presentation bug in; only a MAME picture compare (`tools/mame-oracle.ts <g> --input contract --frames 900 --dist .cache/dev/<g>`) catches it.
**How to apply:** after any re-record of video goldens, oracle-compare one gameplay frame per re-recorded target before trusting it.
