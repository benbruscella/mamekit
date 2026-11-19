---
name: snes-dsp1-174
description: "#174 DSP-1 (smkart/pilotwin pixel-exact): six general gaps between a DSP cart booting and its Mode 7 matching MAME"
metadata:
  node_type: memory
  type: project
  originSessionId: 9e9e69c6-e37f-4806-b877-66271b86f0e4
  modified: 2026-11-19T06:19:06.399Z
---

2026-11-19, #174. Super Mario Kart (hirom_dsp) and Pilotwings (lorom_dsp) pixel-exact vs MAME 0.289 (smkart in a race at 3000/3600). Gaps, all general:

1. softlist catalog dropped the `addon` dataarea (DSP firmware) -> `SoftEntry.extra`; flat image = program + extra chips appended (MAME setup_addon_from_fullpath layout); identify counts them (smkart DSP1B vs smkarta DSP1 share the program chip).
2. Card child `m_upd7725->space(AS_PROGRAM).install_rom(...)`: child callables now carry `hostedCalls()` (space).
3. Struct operators: `operator unsigned()` -> `__convert` (struct valueOf), `operator=(unsigned)` -> `__assign` (copyGeneratedStruct with a scalar; emitter routes member stores whose field type has __assign). 1-bit struct fields = bool in struct methods, emitted AND interpreted (struct bindings setters).
4. Installed word-addressed spaces (addrshift<0) read whole words: read_dword/read_word.
5. Processors inside a slot-mounted card weren't scheduled at all (PC == cycles mod 65536 = NOP fetches was the tell). `IrDevice.nestedProcessors()` + board `syncNestedProcessors`: absolute clock, run to `cpuSeconds(leader)` at every delivery and before every call into the hosting slot device. Per-instruction delivery left the DSP ~13-16 DSP cycles behind the 5A22's access; smkart's raster command reads 4 words back to back without polling, so one stale word wrecked the Mode 7 camera. No hostModel allowed (architecture guard): use the device's own executedCycles + a construction-time origin.
6. device_palette_interface indirect pens/colours weren't saved (save-state rewind caught it on smkart only; SMW never changes CGRAM after the checkpoint).

**Why:** each looked like "DSP broken"; the core itself was right every time.
**How to apply:** for a coprocessor board, first check it executes at all, then tap the host's accesses on the card's actual bank (`mamekit against --io maincpu:816000-817fff:rw`, boot code used bank $81 not $00/$80) and diff values ignoring poll counts. See [[perfect-quantum-device-access]], [[save-state-walker]].
