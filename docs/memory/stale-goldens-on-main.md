---
name: stale-goldens-on-main
description: as of 2026-08-31 ten acceptance goldens fail on clean main; attribute before believing a branch broke them
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-08-31T07:01:03.295Z
---

`npm run test:games` on a clean generation of `main` at 957f4ae fails ten of
its 56 games:

    frogger gyruss junofrst pooyan rocnrope scramble timeplt tutankhm wboy
    (stale goldens: state + audio hashes moved, every video hash identical)
    venture (issue #63: audio RMS 0.012192 vs a 0.02 floor)

Nine of them are the same failure shape — `writes`/`nonzeroWrites` counts
unchanged, `writeHash`/`pcmHash` and the per-frame `state` hashes changed,
video byte-identical from frame 1. Six are Konami boards with the shared
discrete/netlist sound.

**How to apply:** when a branch's acceptance run fails, do not assume the
branch did it. Clean-generate `origin/main` in a throwaway worktree
(`npm run gen:all` — a single-target gen leaves a partial closure and the board
will not even compose), re-run the failing game there, and diff the `+ actual`
lines. Identical actuals mean the golden is stale, not that you broke it. See
[[stale-main-dist-baseline]] for why the sibling checkout's dist is not a
baseline.

Faster first cut before spending a generation: diff the branch's
`generated/board.json`, `devices/*.device.ir.json`, `devices/*.cpu.ir.json` and
`audio/*` against a baseline dist. If those are byte-identical the difference
is in the checked-in runtime, and `dist/runtime/ir/execute.js` /
`dist/runtime/core/generated-device.js` can be edited in place to bisect one
change at a time without regenerating.

Re-recording these goldens is its own task and needs the pictures checked, not
just the hashes taken.
