---
name: discrete-graph-lowering
description: "bnj/btime sound fix (2026-09-22) — discreteMixer.graph lowers op-amp filter/mixer, CR filter, multiply in MAME step order in volts; AY resistor loads gated on DISCRETE_OUTPUT; C `5.` literal trap"
metadata: 
  node_type: memory
  type: project
  originSessionId: 399293f5-cffd-4923-9d6f-cf446a357d3b
  modified: 2026-09-22T03:45:21.413Z
---

"Sound in bnj wrong" (branch 151-arcade-next-4, 2026-09-22): btime_sound_discrete
was never lowered (compileDiscreteMixer rejected MULTIPLY/CRFILTER/OP_AMP_FILTER)
and set_resistors_load was ignored. Fix: `discreteMixer.graph` (audio-compiler
compileDiscreteGraph + emitted sampleDiscreteGraph), node values in real volts
(stream ×32768, output /32768) so op-amp rail clipping is right. Legacy linear path
left untouched so gyruss's plan did not move. bnj bands went from +2.9/−4.8 dB
to within 0.1 dB of MAME 125 Hz–4 kHz. The 3 Ω/100 µF speaker CR (≈530 Hz HPF)
was the missing bass cut.

Traps: MAME writes `32767.0 / 5. * 35.0` — evalExpr rejected `5.`, so analogValue
now rewrites a trailing-dot literal. Loads apply only to per-channel
AY8910_DISCRETE_OUTPUT chips (irem uses RESISTOR_OUTPUT = MOSFET table, and
SINGLE_OUTPUT uses the 3D table); gyruss picked up its 3.3k loads (onsets now
match MAME, 0.81/s). Other netlists that now lower as graphs: bwidow, gravitar,
quantum (not targets). Related: [[issue-151-next-four]], [[board-sound-vs-app-sound]].
