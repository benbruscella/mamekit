---
name: emitter-interpreter-parity
description: "Emitted handler codegen breaks where it decides from the declared type what the interpreter decides from the runtime value; bisect recipe included"
metadata:
  type: project
---

Issue #77 / PR #80 widened which handlers get compiled, and every bug it
exposed was one shape: **emitted code decided from the declared type what the
interpreter decides from the runtime value.** Six found in one pass:

- pointer `==`/`!=` lowered as `Number(a) !== Number(b)` → `NaN !== NaN` is
  true, so CPS1's `if (palette_ram != palette_base)` fired before the pointer
  moved and ghouls built a black palette;
- an unknown method called bare (`gfx->mark_dirty`) threw where the interpreter
  answers `0` (junglek, elevator);
- an absent driver member read as `undefined` → `256 * undefined` is NaN
  (dkongjr decoded its first frame from NaN tile codes). MAME's
  `uint8_t m_gfx_bank = 0` default initialiser is a declaration fact lowering
  does not carry;
- a scalar `valueType` narrowing an aggregate: `uint8_t protdata[0x1e]` emitted
  as `(ARRAY(...) & 0xff)` → 0 (crush protection table);
- `&=` on a rectangle lowered as bitwise AND → `NaN & NaN` = 0, erasing
  pacman's sprite clip;
- an absent **device finder** must read truthy: the interpreter answers
  `{reference, resolved: true}`. `concreteDeviceMembers` lives on the
  **prepared calls table**, not on `bindings` — reading it off `bindings` made
  every finder falsy and bublbobl skipped `if (m_ym2203) m_ym2203->reset()`.

**Bisect recipe.** Emitted methods call each other *directly*, so dropping one
entry from `compiledHandlers` in `dist/games/<cat>/<game>/generated/board.js`
does not de-emit it while an emitted caller survives — drop the caller too.
Dropping all entries gives the interpreted baseline.

**The decisive question is always "what does the interpreter say?"** For
bublbobl: interpreted 52220 writes (= golden), emitted 52218. That proves a
code defect rather than a stale golden — a re-record would have buried it.
See [[codegen-interpreter-parity]] and [[compiler-not-porter]].
