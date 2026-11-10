---
name: wardner-dsp-handshake
description: "Wardner (#143) hangs because there is no TMS32010; the main Z80 spins at 0x6cbd waiting for the DSP to clear RAM 0x7002. Everything else is already lowered."
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T04:58:23.290Z
---

Issue #143, sub-issue of #142. Diagnosed 2026-09-12.

wardner's main Z80 is not crashed — it spins in a two-instruction loop from
~frame 120 and the screen is black forever:

```
0x6cb1 INC (HL)        ; HL = 0x7002, request flag
0x6cb4 LD (0x7004),A   ; command 0x0b
0x6cb8 OUT (0x5a),A    ; coinlatch d0 = 0 -> dsp_int_w(0)
0x6cbb OUT (0x5a),A    ; coinlatch d0 = 1 -> dsp_int_w(1)
0x6cbd LD A,(HL) / OR A / JR NZ,0x6cbd   <-- forever
```

Port 0x5a is the coinlatch; `q_out_cb<0>` is `toaplan_dsp_device::dsp_int_w`,
which in MAME halts the main CPU and starts the TMS32010. No TMS32010 exists,
so nothing ever clears 0x7002. The first wait at 0x6cad only passes because RAM
powers on zeroed.

**Nothing is mis-lowered.** Parser gaps: none. 52/52 source methods and 12/12
address-map handlers compiled, `screen_update` compiled, the nested
`TMS320C10` child is extracted at tag `dsp:dsp`, and all nine DSP-interface
handlers (`dsp_int_w`, `dsp_r/w`, `dsp_bio_w`, `bio_r`, the three
`wardner_state::dsp_host_*_cb`) plus every wire are already in `board.json`.
`execution.cpus` is just `['maincpu','audiocpu']`.

Three gaps: `dsp:TMS320C10` (new CPU core — source is
`src/devices/cpu/tms320c1x/tms320c1x.cpp`, 1029 lines, shared with C15/C16),
`dsp:TOAPLAN_DSP` (capability closure only), `ymsnd:YM3812` (OPL2, unrelated
to the hang). Twin Cobra is the same DSP pairing, so the core buys two boards.

Artwork is already complete and built (bezel + screen rect, cover, marquee,
cabinet) — re-enabling needs no artwork work.

**Why:** the module header said only "Doesn't boot", and the stale
runtime-certification entry claimed the opposite.
**How to apply:** the blocker is one small CPU core, not a video subsystem —
wardner is the cheapest of #142's four. Re-derive the contract with
`game:init` (its `soundKind: 'none'` is rejected by the current harness) and
delete its `runtime-certification.ts` entry. See [[disabled-target-diagnosis]].
