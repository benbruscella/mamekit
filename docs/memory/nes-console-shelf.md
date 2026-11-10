---
name: nes-console-shelf
description: How the NES console target is wired — support list, cart art, web search, and the one e2e gate it has
metadata:
  type: project
---

Re-enabled 2026-08-25 (issue #85). A console has **no romset**, so it can hold
no Node acceptance contract; `e2e/specs/console.spec.ts` is its only end-to-end
gate. Issue #53 dropped the target precisely because nothing went red.

Three things are one contract, and the audit derives all of it from the
generated machine so they cannot drift:

- `CART_GAME_SUPPORT.nes` in `src/gen/generate.ts` — 50 titles, softlist PARENT
  short names (clones count). Adding a name here is the only edit a new game
  needs.
- a verified dump in the bucket, which is what the shelf's "⌕ Search" button
  fetches (`carts.json` / `_manifest.json`);
- a box scan at `.data/artwork/carts/nes/<dump>.sticker.png`, fetched by
  `tools/nes-cart-art.ts` from libretro-thumbnails. `make cart-art-all` /
  `make cart-art-check` in `.data/` wrap it.

The support list names the parent; the shelf keys art and the fetch button off
the **dump on hand** (`smb` -> `smb1`). Cart `.webp` siblings SHIP with the
site (WEB_ARTWORK_TREES), so the supported shelf needs no bucket sync.

Excluded after testing black past 1,800 frames: `ngaiden3`, `tecmosbw`.
The generated board runs SMB at ~76 fps in Node after the fixes in
[[device-clock-vs-beam]] and [[pointer-member-types]].
