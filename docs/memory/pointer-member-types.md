---
name: pointer-member-types
description: device-compiler dropped the `*` from pointer members; `Number(uint8Array)` then stringifies megabytes on every comparison
metadata:
  type: project
---

`memberDeclarations` in `src/mame/device-compiler.ts` matched `uint8_t *m_vrom;`
but captured only `uint8_t`, so the IR claimed an 8-bit integer for a member
that holds a `Uint8Array` at runtime.

The emitter's `==`/`!=` lowering keys the safe `runtime.same(...)` path off the
declared type containing `*`; with the star gone it emitted
`Number(m_vrom) !== Number(0)`. **`Number()` on a typed array calls `toString()`
— it builds a comma-separated string of the whole array.** MMC3 asks
`assert(m_vrom != nullptr)` on every CHR bank switch, so Super Mario Bros. 3 ran
at 9 fps; keeping the star took it to 68 fps.

Fixed 2026-08-25 (issue #85). Watch for the same shape anywhere a declared type
and the runtime value disagree — see [[emitter-interpreter-parity]].
