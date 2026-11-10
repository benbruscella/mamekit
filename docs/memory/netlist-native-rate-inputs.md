---
name: netlist-native-rate-inputs
description: "#234 follow-up: NETLIST_STREAM_INPUT is SAMPLE_RATE_INPUT_ADAPTIVE — never average AY resistances to 48 kHz; nltool is the netlist oracle"
metadata:
  node_type: memory
  type: project
  originSessionId: 3232a117-94e2-4f87-aa37-dcfb02bdf113
  modified: 2026-11-02T11:53:29.482Z
---

Kung-Fu Master sounded dull with no snare/hi-hat after #234 (user ear test, 2026-11-02), while `oracle:baseline compare` called it "better". Cause: the AY mixer's two-pole antialias + box averaged `AY8910_RESISTOR_OUTPUT` resistances (≈5 kΩ on / 5e8 Ω off) down to 48 kHz, so almost every noise edge read as off (−12 dB at 1–8 kHz on period-1 noise). MAME allocates netlist inputs `SAMPLE_RATE_INPUT_ADAPTIVE` (netlist.cpp) and sets each param at the source's own sample time; `nld_R::update_param` → `change_state`: solve old value at t, apply, solve again `MIN_TS_TS` = 1 ns later; each solver group otherwise steps 1/FREQ from its own last solve.

**Why it matters:** the 47-scenario level table can't see this; RMS is bass-dominated and the kungfum runs diverge from frame 300.

**How to apply:**
- The solver now has `set(channel, sample, at)` / `read(at)` / `writeLogic(i, v, at)` with per-group clocks; the AY mixer bypasses its antialias path when a netlist is present.
- `npm run test:netlists` (tools/netlist-reference.ts) builds nltool from ../mame/src/lib/netlist into .cache/nltool/<rev> (`make maketree` then `make nltool`, PYTHON=python3) and diffs every compiled netlist; all five within 0.2 dB after the fix.
- nltool runs a driver's nl_*.cpp directly: `nltool -c run -n kidniki -t 2 -i input.csv -l R26.1 <file>`; input lines `time,param,value`; the log is `log_<node>.log` of `time value` per change.
- Kung-Fu Master's `I_BD0..I_OH0` netlist drum lines are never written by its sound program in MAME either (Lua tap on the 6803 ports); its percussion is AY noise.
- After the fix the user heard kungfum as "a little muffled"; per-second bands in the seconds where content matches were within ±0.5 dB of MAME to 20 kHz, and the user then compared against real MAME 0.289 and agreed. The kidniki netlist's treble roll-off is authentic; mamehistory.com recordings are not a MAME 0.289 reference. Compare per-second on matched seconds, not whole-run spectra (divergent content fakes a 2–6 dB tilt).
- Cost in the worklet, real contract runs on the M3 Pro: kungfum 46% of real time, scramble 27%, frogger 13%.
- The legacy (non-netlist) AY path still uses the hand antialias filter, not MAME's lofi resampler: unexamined.

Related: [[sound-mix-234]], [[mame-reference-capture]].
