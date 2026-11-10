---
name: acceptance-run-flake
description: "~1-2 of 61 acceptance games fail per sweep, a different game each time, always passing on retry — process-level, not our logic"
metadata: 
  node_type: memory
  type: project
  originSessionId: 8b896811-b929-4032-8912-a008d3064819
  modified: 2026-09-02T06:25:13.331Z
---

Measured 2026-09-02 across six full sweeps.

**Every full `npm run test:games` run fails one or two games, and it is a
different game each time.** Observed: defender, digdug, bublbobl, rampage,
mspacman, gauntlet, mslug, pengo — each passing 2-4/4 on immediate retry.
Shapes seen: a single video hash differing at a single checkpoint with state
and audio identical; `RangeError: Maximum call stack size exceeded`;
`Segmentation fault: 11`; and a zero-byte log (see
[[node-rom-inflate-segfault]]).

**It is process-level, not our logic.** The same game run five times *in one
process* gives byte-identical goldens; across processes it flakes ~1 in 20-40.
There is no `Math.random` and no wall-clock read anywhere in the emulation path
(only `performance.now` for the fps report). Disabling the only cross-board
runtime change of the day made no difference (0/40 vs 1/40 — within noise of
that rate). This is V8 GC/JIT timing, the same family as the long-standing
unexplained native crash.

**How to apply:**
- `npm run test:games` stops at the first failure (`|| exit 1`), so one flake
  hides the other 45 games. Use a resilient runner that retries exit ≥ 128 and
  records the rest — worth keeping in `/tmp/sweep.sh` shape.
- **Always retry a single failing game 2-3 times before believing it.** Two
  genuine regressions this session (crush, ddragon) reproduced 100% of the time;
  every flake passed on the first retry.
- A zero-byte log or an empty `AssertionError` capture means a crash, not a
  behaviour change.
- `npm run test:unit | tail` reports success even when a spec fails — the pipe
  eats the exit code (see [[npm-exit-code-through-pipe]]). Redirect to a file
  and check `$?`.

**Root cause found (2026-09-10, issue #136):** for AY8910 games it is the *generated* audio renderer, not the machine. A failing run differs only in `pcmHash` while every checkpoint, every sound register write (`writeHash` covers `frac`) and the RMS match — so the renderer was handed a byte-identical write list and produced different samples. Correlates with machine load. Rule this out before blaming a branch: if the checkpoints match, the machine is fine.

**2026-10-25 (#190):** the process-level flake (crashes, RangeError, one-off
divergences) follows the user's Mac. See [[host-machine-faults]].
