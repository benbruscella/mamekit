---
name: gen-cache-masks-breaks
description: "The gen cache hides compiler breaks until its identity changes: Z8002's missing DAB table and asteroid's vanished vector plan both surfaced only on a cold cache"
metadata:
  node_type: memory
  type: reference
---

`.cache/` entries are keyed on a compiler identity. While that identity is
stable, a target keeps restoring an artifact built by an *older* compiler —
so a break introduced weeks ago stays invisible, and `gen:all` keeps
passing, until an unrelated change invalidates the key and everything
recompiles at once.

Two shipped breaks surfaced this way on 2026-09-01, both pre-existing on
main and neither caused by the change that unmasked them:

- **Z8002 could not be emitted at all.** `Z8000_dab`, the decimal-adjust
  result table, lives in `z8000dab.h` as a plain `static const uint16_t`
  array that `z8000.cpp` includes; nothing collected it, so `emitIdentifier`
  threw. Fixed by parsing it into a CPU member with `values` (the same
  mechanism `m_state` uses). polepos had been running DAB on nothing.
- **asteroid lost its whole video plan.** MAME renamed
  `vector_device::video_output_update` to `screen_update` (57cf10f09f7);
  the video compiler matched only the old spelling, so the DVG plan
  silently vanished and the board came up with unresolved `dvg.go_w`.

**Implication.** A green `gen:all` is not evidence the compiler still
builds every target from source. When touching anything in the cache
identity (handler-ir, cpu-compiler, ast), expect a wave of recompiles and
read every new error as possibly pre-existing — confirm against a base-tree
worktree with `MAMEKIT_NO_CACHE=1 node tools/emit-cpu-worker.ts <TYPE> ...`
before blaming the change in hand. See [[gen-cache-policy]].
