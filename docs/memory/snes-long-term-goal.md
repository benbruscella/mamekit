---
name: snes-long-term-goal
description: "User really wants SNES support (#174); keep it in mind when choosing designs for other work (65816-style CPUs, stereo audio, per-line PPUs, coprocessor carts)"
metadata:
  node_type: memory
  type: project
  originSessionId: 427cd7ec-ed20-4ad9-9308-a003a507dd45
  modified: 2026-10-22T08:02:22.417Z
---

On 2026-10-22 the user asked for SNES support ("I know it's ambitious, but
keep it in mind!") — tracked as #174, a phased long-term issue.

**Why:** it's the user's stated aspiration for MAMEKIT/mamehistory, beyond the
nearer queue (#170 oracle tool, #171 NES part 2, #172 SMS/GG, #173 Genesis).

**How to apply:** when a design choice in other work would make the SNES
easier or harder, prefer the general one and say so. Things it will need:
- a 65C816 core from MAME's macro-heavy `g65816` (per-M/X-flag tables);
- the SPC700 as a second CPU with its own audio RAM;
- the S-DSP (BRR voices, echo FIR) as a device the sound CPU reads back;
- **stereo** host audio (the S-DSP routes 2 outputs);
- a PPU rendered per line under HDMA;
- coprocessor cartridges that are processors themselves (DSP-1 uPD7725,
  Super FX, SA-1 = a second 65816, ST018 ARM) through the self-mounting slot
  pattern from #167.

Related: [[issue-progress-comments]].
