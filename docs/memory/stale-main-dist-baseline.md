---
name: stale-main-dist-baseline
description: "The main checkout's dist can be older than its source — never baseline a regression against it; clean-generate the unmodified tree instead"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 5f2a666c-972a-480b-9aa8-4e5979e672eb
  modified: 2026-08-24T09:49:05.729Z
---

Running acceptance in `/Users/benbruscella/Projects/Github/mamekit` to get a
"before" baseline is **not** a clean-tree check. That `dist` is whatever the
user last built and can be many commits old — on 2026-08-24 it emitted `>>>`
in `dist/runtime/generated/devices/z80.js` where a fresh build of the very
same commit emits `>>`. Its goldens still passed, so the staleness is silent.

It gave a false all-pass on five games (crush, dkongjr, elevator, ghouls,
junglek) that a clean regeneration of the identical commit then failed on —
i.e. it hid nothing, but it *would* have hidden a pre-existing failure and
sent the session chasing someone else's bug.

**Why:** acceptance loads compiled JS from `dist`, and nothing ties that tree
to the source revision beside it.
**How to apply:** baseline inside the worktree — `git checkout <base> -- src
e2e`, move any files the base does not have aside, `npm run gen:all`, run the
games, then `git checkout <branch> -- src e2e` and regenerate. Slower than
reusing the sibling checkout and the only answer that means anything. See
[[dist-rebuild-pitfalls]] and [[known-broken-targets]].
