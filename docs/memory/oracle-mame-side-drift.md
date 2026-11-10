---
name: oracle-mame-side-drift
description: "oracle:baseline compare can say WORSE when only MAME moved: mslug (RTC, host date) and Infinity->Infinity size mismatches (bzone); check our acceptance golden before believing it"
metadata:
  node_type: memory
  type: project
  originSessionId: c8914e24-8796-4263-8a8c-3bab926ee55f
  modified: 2026-10-27T21:17:25.746Z
---

2026-10-28 (#203): `oracle:baseline compare` gave two WORSE verdicts that were not regressions.

- **mslug:** pixels:none was WORSE, ram better, and audio:none WORSE with "MAME's recording differs from the baseline's". A rerun gave the same numbers. mslug's acceptance contract passed with its golden unchanged, so our side was byte-identical; MAME's side moved. The likely cause is the Neo Geo uPD4990A RTC, which MAME seeds from the host clock, so its run depends on the day. The baseline was taken 2026-10-27; the first RAM difference is main-CPU RAM 103c0e.
- **bzone, and any size-mismatch machine:** `lower()` in tools/oracle/baseline.ts did `Math.abs(Infinity - Infinity) <= 0`, which is NaN, so an unchanged wrong-size picture read as worse. Fixed in #203 (`after === before` first).

**How to apply:** when a compare says WORSE, first run that machine's acceptance contract. If its golden still matches, our emulation did not change, and the verdict is MAME-side drift or a tool artifact. Say which in the issue rather than chasing it. Related: [[mame-baseline-204]], [[cold-nvram-boot-divergence]].
