---
name: host-machine-faults
description: "#190: contract non-determinism (SIGBUS/SIGILL/SIGTRAP, RangeError, one-off divergences) follows the user's M3 Pro — same probe in a Linux VM on it faults, CI arm64 never does; retry locally, CI is the arbiter"
metadata:
  type: project
---

Settled 2026-10-25 in #190 (PR #193 merged; issue closed with the evidence).

**Probe:** Bubble Bobble to frame 700, per-frame fingerprints compared with a
known-good run. Each run takes 9 s, so a few hundred runs fit in minutes.

| Where | Faults |
|---|---|
| macOS host, Node 26.12.1 | 2/150 crashes |
| macOS host, `--no-maglev` | 5/300 (3 divergences at random frames 80/341/347) |
| Linux arm64 Docker VM on the same Mac | 6/194 (2 divergences, SIGTRAP/SEGV) |
| CI ubuntu-24.04-arm | 0 in ~760 contract runs |

- **No recursion in our code:** a whole contract fits in `--stack-size=75` (KB).
  Below 62 KB, Node's own module loader overflows first.
- **Crash shape:** every `.ips` is EXC_BAD_ACCESS inside JIT code, at wild
  addresses in the GPU carveout or other reserved gaps. JavaScriptCore on the
  same Mac shows the same family: GC `SlotVisitor::drain`, a DFG PAC failure.
- Node 26.12's V8 fix for nodejs/node#66457 (a Maglev double-field alias) is
  real, but it is not this.

**How to apply:**
- A single local crash or divergence is not a regression: retry it, and let
  CI arbitrate determinism.
- Don't spend another session hunting it in the emulator.
- A second Apple Silicon Mac, or Apple Diagnostics, would split hardware from
  Apple Silicon generally.

**Docker recipe (if needed again):**
- Mount the repo at `/repo:ro` and the scratchpad at `/scratch`. A same-path
  `/Users/...` mount shows an empty tree.
- Run at most 3 parallel: the VM has 7.6 GB, shared with the user's
  Supabase/LocalStack containers, and 6 parallel got OOM-killed (exit 137).
- An exit 1 with no log file is a virtiofs failure to create the file, not
  Node.

Related: [[node-rom-inflate-segfault]], [[acceptance-run-flake]], [[node-version-pin]].
