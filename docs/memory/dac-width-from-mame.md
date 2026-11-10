---
name: dac-width-from-mame
description: "Two silent-data traps found via rampage: DAC bit width must come from dac.h's DAC_GENERATOR lines, and analogValue turned every CAP_P/CAP_N into NaN"
metadata:
  node_type: memory
  type: project
---

Two bugs of the same shape — a MAME fact the compiler never carried, papered
over by a runtime guess — found while fixing [[known-broken-targets]]'s rampage
(2026-08-23):

- The DAC worklet mixer inferred a chip's resolution from the values a game
  happened to write (`if (byte > 1) wide = 1`) and masked every write to
  `data & 0xff`. Every DAC's real resolution, coding and ladder gain is stated
  in the `DAC_GENERATOR(...)` line that declares it in
  `../mame/src/devices/sound/dac.h`, and is now parsed there
  (`src/hardware/dac/extract.ts`) and baked into the emitted worklet.
- `analogValue` in `src/mame/audio-compiler.ts` substituted `CAP_P(x)` with
  `((x)*1e-12)` and handed that to `evalExpr`, whose number parser has no
  exponent form. Every picofarad and nanofarad in MAME source evaluated to
  NaN; `componentValues` then silently dropped them. Only capacitors spelled
  with `CAP_U` ever worked.

**Why:** both failed silently and plausibly — audible distortion and missing
filter components rather than an error — which is exactly what the project's
"reject unsupported source, never fall back" rule exists to prevent.
**How to apply:** when a runtime component has a width, a resolution or an
electrical value, find where MAME states it and lower it; a heuristic over
observed values is the bug. Check `evalExpr`'s literal grammar before feeding
it a generated expression. See [[compiler-not-porter]].

**Not every "DAC" is a DAC chip (2026-08-24).** `generate.ts` counts
`NETLIST_INT_INPUT` among its dacChips (Mario's sound is a netlist model). It
has no DAC_GENERATOR line; its width is the mask in
`NETLIST_INT_INPUT(config, tag, "DAC.VAL", shift, mask)`. Throwing on an
unknown type broke mario for a day before it was caught, because mario is the
only target using it and its type name does not match /DAC|MC1408|AD7533/.
Resolution now happens at compile time (`lowerDacChips` in gen/emit-machine.ts)
and the board carries `sound.dacs = [{deviceTag, bits, mapper, gain}]`; the
worklet no longer holds a type table.
