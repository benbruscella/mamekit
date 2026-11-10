---
name: cps1-sprite-replica
description: CPS1 sprites are drawn by a handwritten replica in src/runtime/generated-video.ts because DRAWSPRITE is an unexpanded function macro — the hard-rule violation to clean up
metadata: 
  node_type: memory
  type: project
  originSessionId: f110bd0a-04f1-4edd-8beb-c5032e134d2a
  modified: 2026-08-25T01:55:07.240Z
---

`cps1_render_sprites` is **not** executed from its lowered IR. The handler
parser leaves MAME's driver-local `#define DRAWSPRITE(...)` as an unresolved
identifier call (board.json even records `could not parse statement at byte 1`
for the `#define` itself), so `GeneratedMameVideoPrimitives` matches the
handler by body signature and substitutes a hand-written JS transcription of
the whole sprite loop. That is a handwritten video implementation living in
`src/runtime`, which CLAUDE.md forbids — see [[compiler-not-porter]].

**Why it matters:** the replica silently drifts from MAME. Issue #82's "the
background sits over the sprites" was the replica calling `gfx.transpen`
where MAME's macro calls `prio_transpen(..., screen.priority(), 0x02, 15)`.
Fixed 2026-08-25, but any future CPS1 sprite divergence should be checked
against the macro text first, not the IR.

**How to apply:** the real fix is function-macro expansion in the handler
lowering (nothing in `src/mame/*.ts` expands parameterised `#define`s today —
only object-like ones). Doing that would delete this replica and the
`draw_sprites`/`zoom_sprite` ones beside it. Until then, treat every edit to
those closures as porting debt and say so.

MAME semantics the replica now encodes, both easy to get backwards:
- `gfx_element::prio_*` do `pmask |= 1 << 31`, so a pixel an earlier draw
  claimed (it stores 31) is opaque to every later draw — CPS1 sprite priority
  is the object table's own order, **first entry wins**. A plain `transpen`
  inverts the whole list.
- `tilemap_t::draw`'s priority argument *stamps* `(pri & mask) | priority` on
  what it paints and rejects nothing, and is skipped entirely when
  `priority | (mask << 8) == 0xff00`. Different rule, same bitmap.
