---
name: handler-ir-cpp-gaps
description: "The 2600 milestone was blocked by plain C++ the handler parser could not read, not by hardware — and one of those gaps was silently corrupting five shipped games"
metadata: 
  node_type: memory
  type: project
  originSessionId: fb7744c5-8dc2-43e6-b818-44fc02029876
  modified: 2026-08-28T06:54:26.331Z
---

Adding the Atari 2600 (2026-08-28) needed almost no hardware work. Every
blocker was ordinary C++ that `src/mame/handler-ir.ts` could not parse, so the
statement — or the whole method — was dropped. Fixed on branch
`94-add-support-for-atari-2600-console`: trailing comma in an aggregate
initializer, `sizeof buffer` unparenthesized, empty `for` iteration clause,
C-style cast to a class pointer, and C++ lambdas end to end (parser, `ir/board.ts`,
interpreter, device codegen).

**The one that mattered beyond the 2600: `sizeof`.** It only ever answered with
a *type's* width, so `memset(m_empty_tile, 0x0f, sizeof(m_empty_tile))` on a
`uint8_t[1024]` filled **one byte**. It now answers with the object's own size
for a value operand. Reached congo, zaxxon, ghouls, sf2, sf2ce and mslug (via
`neogeo_sprite_optimzied`). All six still pass acceptance unchanged — the empty
tile is an out-of-range-code fallback that graded frames never hit — but it was
wrong in five shipped games for as long as the check existed.

**Blast radius is derivable from the generated IR**, which is the cheap way to
scope a parser change: grep `dist/games/*/*/generated/board.json` and
`dist/runtime/generated/devices/*.ir.json` for `"kind": "lambda"`, an empty
`"iterate": []`, a cast with an empty `valueType`, or a `sizeof` call whose
argument is not a type identifier. Lambdas reached exactly one existing game
(gauntlet); everything else was 2600-only.

**Two traps found while doing this:**
- `unsupportedStatement` could consume nothing when a statement failed on its
  block's own `}`, so the parser re-read it until the diagnostics array
  outgrew its maximum length — a hang, surfacing as `RangeError: Invalid array
  length`. Recovery must always advance.
- The method's locals are collected in a pre-pass that walks *operations*, not
  the expressions inside them, so a lambda body's own declarations are invisible
  to it. `collectLocals` has to be re-run over each lambda body.

**Why:** it reframes what a new console costs. Reach for the parser before
assuming a device needs a capability package.

**How to apply:** when a device reports "lowering is incomplete", print the
per-method diagnostics first ([[silent-mislowering]]) — a handful of them
usually trace to one missing C++ construct shared across every failing method.
