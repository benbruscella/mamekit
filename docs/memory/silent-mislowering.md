---
name: silent-mislowering
description: A handler can lower with zero diagnostics and still be wrong; a neighbouring diagnostic can hide it for years
metadata:
  type: feedback
---

Found 2026-08-27 fixing gauntlet during the ColecoVision work (issue #95).

`std::vector<uint32_t> &codelookup = m_mob->code_lookup();` lowered to an
**assignment whose target was a comparison chain** (`std::vector < uint32_t >
&codelookup`) and reported **no diagnostic at all**. It never surfaced because
the very next line was a range-for, which *did* produce a diagnostic and so
blocked the whole handler. `gauntlet_state::video_start` had therefore never
run — its motion-object code-lookup XOR was simply absent, and the recorded
golden encodes that absence.

**Why:** handler-ir only reports what it knows it cannot parse. A form it
parses *into the wrong shape* is silent, and `summary.diagnostics` counts it
as healthy. Fixing an unrelated diagnostic in the same handler is what exposes
it — as a crash, far from the change.

**How to apply:** when a lowering fix removes a diagnostic, assume other
statements in that same handler have never executed and read them. Don't trust
`diagnostics: []` as proof a handler is right — check the ops it emitted.
Grep the accepted driver set for the newly-unblocked form to bound the blast
radius ([[frugal-blast-radius]]). See also [[emitter-interpreter-parity]],
whose six bugs were the same "looks fine, is wrong" class.
