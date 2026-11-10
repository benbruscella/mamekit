---
name: serve-from-dist
description: "Generate into dist, never a scratchpad side tree: `npm run serve` serves dist, and a side tree leaves the user's dev server stale for a whole session"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-16T04:03:15.036Z
---

The user runs `npm run serve` (= `node bin/mamekit.js --serve --no-build`), which
serves **`dist/`** — the default `outRoot` in `src/cli.ts`. Every plain
`node bin/mamekit.js <game>` writes there too, and the dev server reads files
from disk per request, so a regeneration is picked up without a restart.

Do **not** generate into a scratchpad tree (`--out /tmp/.../four`) to "avoid
disturbing the dev server". 2026-09-13: a whole session of Wardner/Spy Hunter
fixes went into a side tree while the user's `dist` stayed at a pre-Out-Run-
removal build, so every complaint they raised ("no sound", "arrow keys don't
work") was against code that had already been fixed, and they had to keep
running `clean` + `gen:all` by hand. They asked for it directly: *"can you just
make sure that npm run serve is always up to your latest code build somehow?"*

**2026-09-16, said again and sharply** — *"ALWAYS USE THE LOCAL DIST UNLESS I
TELL YOU TO USE A WORKTREE."* I had reached for `--out <scratch>` again, this
time to "avoid deleting dist" while reproducing a CI failure. Deleting and
rebuilding dist was the wanted behaviour; the side tree was not.

The same session showed the second, worse edge of a stale dist: **verification
against it is silently void**. `audit:semantics`, `record-goldens` and the
acceptance harness all read generated output, so a dist older than the working
tree makes them all pass against code that no longer exists. A green
`test:current` / blast-radius run is only evidence if dist was generated *after*
the last source edit. CI cold-generates and caught a real berzerk regression
(video frozen at frame 1) that every local gate had reported green.

**Why:** one canonical generated location is also a CLAUDE.md hard rule; a stale
dist makes both the user's testing and my own verification worthless as signals.
**How to apply:** generate into `dist`, and regenerate it after the *last* source
edit before claiming any gate is green. Say so when starting `npm run gen:all`,
because it begins with `rm -rf dist` and the page 404s until it finishes. A
single-target gen recompiles the whole app, so runtime JS is current even when
only one config is re-emitted. Use `MAMEKIT_OUT_ROOT` / `dev-game` only for a
throwaway probe tree the user has agreed to, or a worktree they asked for — see
[[disabled-target-diagnosis]], [[stale-goldens-on-main]].
