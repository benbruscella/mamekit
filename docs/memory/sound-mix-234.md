---
name: sound-mix-234
description: "#234: every MASTER_GAIN deleted, levels from routes; netlist compiler + solver in src/mame; what the level measure can't say"
metadata:
  node_type: memory
  type: project
  originSessionId: 3232a117-94e2-4f87-aa37-dcfb02bdf113
  modified: 2026-11-01T19:35:30.442Z
---

#234 (2026-11-02, uncommitted when written; branch 234-50-play-every-sound-family). User chose to compile netlists inside #234 rather than split them. Baseline `ad2b8f85`, contract input: 8 -> 51 of 70 scenarios within 1 dB; pixels and RAM `same` on all 70; 41 goldens changed in sound fields only.

**Traps that cost time:**
- `.oracle/compare/<t>.json` keeps a trimmed audio result (no peak); per-run peak is in `.cache/oracle/<t>.json`.
- A state member set to a plain number breaks `m_x.target()`. Only bind finders handlers TEST (`lowerNetlistFinders`), or a handler call fails the strict harness.
- An absent finder made Konami's `if (m_netlist != nullptr)` a silent no-op: compare scramble's bands if a netlist board's filters seem off.
- Capacitor Ieq must be fixed once per timestep (MAME `time_step`), not per Newton iteration: that bug looked like non-convergence (250 loops a sample).
- `mosfet_param` is {Vth, Vg}, not {Vg, Vth}. NaN read as "ours silent".
- `acceptance.ts` takes `nes:smb1`, not `nes`; `record-goldens.ts` takes `nes`.
- MAME has no DC blocker before its limit: `sound.cpp` clamps the speaker's raw sum to 16 bits. Removing the mix clamps "because the speaker filter removes the DC" put bankp at +5 dB; every compiled mix keeps the clamp. Ours can still read past 1.0 in compare: that is our speaker filter's overshoot after the clamp.

**What the level measure can't say:** nes/lagrange +6.2 is MAME's WAV carrying the `addon` speaker on its own channel, averaged by compare-audio (cf. [[vrc7-ymfm-188]]). spec128/tape reads +32 because MAME is silent there. Open: kungfum +2.5 (untraced), c64/basic +6.0 not fully reconciled with cartridge's 0. Related: [[mame-baseline-204]], [[discrete-graph-lowering]], [[samples-228]].
