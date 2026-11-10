---
name: node-version-pin
description: "The shell's default Node (fnm default) is not the project's (.nvmrc 26.12.1 since #193); run contracts with `fnm exec --using=26.12.1` or `fnm use` first"
metadata:
  node_type: memory
  type: project
  originSessionId: bb6f9c22-a036-4bd8-a560-4dd6b323f5c7
  modified: 2026-10-23T11:49:50.573Z
---

2026-10-23: a whole day of #178 sweeps ran on Node 24.6.0, the fnm default,
while `.nvmrc` (and CI) pins 26.8.1. `node --version` before trusting a sweep;
use `fnm exec --using=26.8.1 node ...` (or `fnm use` in the repo) for
contracts, the census and the oracle. Native crashes (SIGILL/SEGV/BUS/TRAP)
hit 4-8 contracts per sweep on 24.6, and a few contracts gave different
results run to run (Bubble Bobble ~1 in 6; Venture/Gyruss audio at 1e-6 RMS).
Check whether that non-determinism survives on 26.8.1 before chasing it in
the emulator. Related: [[acceptance-run-flake]], [[node-rom-inflate-segfault]].

2026-10-25 (#190/#193): `.nvmrc` is now **26.12.1** (CI reads it), with
`@types/node` ^26 and Playwright 1.64. TypeScript stays 5.9: TS 7 has no JS
compiler API, which onboarding.ts/record-goldens.ts use. Use
`fnm exec --using=26.12.1`. The run-to-run differences were NOT Node: see
[[host-machine-faults]].
