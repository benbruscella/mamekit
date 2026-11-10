---
name: digdug-music-overrun
description: "SOLVED 2026-08-20: digdug's 2/3-speed logic was a devcb read-transform bug collapsing the Namco 53xx mode select; fix is in generated-effects.ts + generated-device.ts"
metadata:
  node_type: memory
  type: project
  originSessionId: 07afc189-1d46-4696-a6fb-e06868efcf42
  modified: 2026-08-20T00:00:00.000Z
---

**Symptom (issue #54):** "Dig Dug doesn't make it to the centre of the screen in
time" — game logic ran at exactly 2/3 speed. An earlier session mis-framed this
as a *music overrun* and hunted sub2's sequencer; the music was innocent and
was correctly waiting for a slow walk.

**ROOT CAUSE (two compounding devcb bugs, both generic, neither Namco-specific):**

1. `src/runtime/generated-effects.ts` — `reads` was `effect.kind === 'port-read'`
   only, so a `device-method` effect bound to a *read accessor* (`q7_r`) was
   treated as a write. Its devcb transform was then applied to the emitted
   argument instead of to the value read back, discarding the `lshift`.
2. `src/runtime/generated-device.ts` — a devcb emitter overwrote per listener
   (`result = value`), where MAME OR-combines the whole `.set()` + `.append()`
   chain.

Together these collapsed the Namco 53xx's K port — MAME wires it as
`(q7<<3)|(q6<<2)|(q5<<1)` = **14** — down to **1**. K3..K1 are MOD2..MOD0, so
the MCU booted in the wrong *mode* and answered the DIP read with garbage
(`1,0` instead of DSWA/DSWB = `153,36`). maincpu then spun waiting, getting 4
NMIs/frame instead of 5, and every game counter advanced 2 frames in 3.

**Verified against real MAME 0.288 after the fix:** 53xx returns `153,36`;
maincpu NMI **5.00/frame**; per-frame counter **1.00/frame**; walk 52 steps with
**all gaps 4**, ending f1518 (MAME f1519, one frame of input latency).

**Blast radius was 2 machines** (digdug, mario) for the read-transform rule and
7 for the OR rule; only digdug's behaviour actually moved. `npm run blast-radius`
(built the same night) derives this — see [[frugal-blast-radius]].

**Introduced by** `02bb7ff "pole"` (12 Aug, Pole Position work), which moved
device timers to instruction resolution and made the handshake timing-sensitive
enough for the latent devcb bugs to matter. `6d3013b "digdug almost"` then
re-recorded the golden, enshrining the 2/3 behaviour — which is why no gate
caught it. **Lesson: a golden re-record can hide a regression; goldens prove
"unchanged", never "correct".**

Useful: PR commits survive a squash merge —
`git fetch origin refs/pull/<n>/head:pr<n>` recovers them for archaeology.
Related: [[mame-reference-capture]], [[compiler-not-porter]].
