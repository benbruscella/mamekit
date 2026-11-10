---
name: statement-macro-expansion
description: "Function-like #define expansion (src/mame/preprocessor.ts) — why it must cover statement macros only, and how expanding expression macros silenced Galaga and Dig Dug"
metadata:
  node_type: memory
  type: reference
---

`src/mame/preprocessor.ts` (added 2026-08-30) expands function-like `#define`s
into device method bodies before lowering, wired in at `compileMethod` in
`device-compiler.ts`. It exists because MAME's TIA positions every sprite
through `RESXX_APPLY_ACTIVE_HMOVE(new_horzP0, HMP0, motclkP0)` -- a macro whose
body reads the caller's `curr_x` and *adds to the variable it is passed*.
Nothing about that survives a function call, so it lowered to
`runtime.macro("RESXX_APPLY_ACTIVE_HMOVE", ...)`, which the runtime had never
heard of, answered 0, and changed nothing. MAME's horizontal-motion correction
was silently absent from every RESP0/RESM0/RESBL write.

**The hard-won rule: statement macros only** (body must contain `;` or `{`).
Three kinds of function-like macro exist in MAME source and only one wants
expanding:
- **statement** (`RESXX_APPLY_*`) -- expand; nothing else can carry it.
- **constant expression** -- already folded by `parseDefines`/`evalExpr`.
- **symbolic expression** -- the NAME is the interface. `NAMCO_54XX_0_DATA(base)`
  expands to `NODE_RELATIVE(base, 0)`, but the sound runtime routes discrete
  writes by looking that *name* up in `sound.writeOffsets`. Expanding it threw
  the name away and made **Galaga fail its discrete-audio contract and Dig Dug
  go completely silent** (78,964 writes, 0 non-zero).

Also excluded: `BIT`/`BITSWAP`/`TABLE`/`COMBINE_DATA` (the IR answers them) and
`LOG*`/`PRINTF` (the normalizer's `stripTracingCalls` removes them at the call
site, which is better than expanding a VERBOSE-guarded body and re-stripping).

**How to apply.** The scoping measure that matters is *what actually ships*:
snapshot `dist/runtime/generated/devices/`, rebuild, and `cmp` each
`*.device.ir.json`. Recompiling types in a standalone harness over-reports
badly -- it cannot reproduce capability-compiled types (TIA, TMS5220C) or ones
whose extractor filters methods (VCS_CART_SLOT), and it flagged 20 types when
the shipped answer was 4, then 1. See [[silent-mislowering]].
