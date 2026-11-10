---
name: branch-101-stale-goldens
description: "PR #122 CI failures (8 audio-path contracts) traced to four causes in the C64 base commits: undefined state pre-declaration, a global monotonic machine clock, an identity discrete-node macro folded away, and two goldens that encoded MAME-incorrect behaviour (invaders int_enable, tmnt's unbound UPD7759). Recipes for attribution."
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6433c7-8feb-4b6e-860f-56eb6ad88897
  modified: 2026-09-07T01:09:12.040Z
---

Sweep after the link-table work (2026-09-06/07): ddragon, invaders, kungfum, polepos, qbert, venture, tmnt, simpsons failed on CI for PR #122 and identically on the branch base (d5144d65). Root causes found by bisecting built files and hunks against a main worktree (ae4cca8e):

- **qbert, kungfum, ddragon**: `IrBoard` pre-declares every state name as `undefined` (V8 fast-mode intent); the executor's `Object.hasOwn(members, name)` checks then answered "present" for device finders and references that needed to fall through. Fix: presence is value-based (`!== undefined`) in the four executor lookups (src/ir/execute.ts).
- **venture**: `machineSeconds()` got one global monotonic clamp; the lead CPU's end-of-slice reading froze the sound CPU's clock. Fix: no clamp for the scheduler; only image transports (devices with a `cassette`) get a per-transport never-rewind reading in the `machine().time` binding (generated-board.ts).
- **polepos**: `collectDynamicMacros` expanded `#define NAMCO_52XX_P_DATA(base) (base)` at compile time, bypassing the host binding that maps that name to discrete input offset 3 (the 54xx macros survived only because `NODE_RELATIVE` is a call). Fix: the host-bound discrete names live in `DISCRETE_INPUT_CALLS` (src/ir/board.ts), bound by generated-board.ts and kept symbolic by the preprocessor. A first attempt ("every identity macro stays symbolic") broke the VIC-II: `VIC6569_X_2_EMU(a) (a)` left as a named call answered 0 for every x and the C64 screen collapsed leftwards -- an unknown `runtime.macro` is a silent zero, so never leave a name symbolic unless the host binds it.
- **invaders**: golden stale in the right direction -- driver members now start at their in-class initial (`m_int_enable(true)` in mw8080bw); interrupts were wrongly disabled from power-on before.
- **tmnt**: golden stale in the right direction -- `m_upd7759` finder now resolves (board.json `devices[].member`), so the speech chip receives its 7 writes; video/state identical.
- **simpsons**: my own address-of extension (`&local`) let `object_dma` compile, and the compiled `std::copy_n`/pointer-advance form diverged from the interpreter (video differed at 900/1200 only). Fix: compiled `&` is limited to scalar members.

**How to apply:**
- Attribute before debugging: worktree at the suspect base, symlink `.data` AND `node_modules`, `node bin/mamekit.js <g>` then `--build-runtime --build-app --targets <g>`, then the contract. Swapping built files (core/*.js, generated devices, board.js/json) into the other tree isolates runtime vs emitted vs lowered; swapping single *functions* between two versions of a module (brace-matching script) pins a method.
- `--build-runtime --targets X` leaves dist with only X's closure: every other game then fails with "no generated executable"/"unresolved handlers". Always `gen:all` before a sweep.
- Generated chip modules embed their MCU children's compiled methods (namco_52xx.js carries its own MB8843 core), so swapping the standalone mb8843.js tests nothing.
- Use `;` not `&&` around `git stash`/`pop`; check `git diff --stat` afterwards.
- See [[dictionary-mode-call-tables]], [[stale-goldens-on-main]].
