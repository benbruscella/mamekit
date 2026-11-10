---
name: wardner-ym3812
description: "Wardner plays: the YM3812 needed no new chip — it is a YM3526 the OPL timer/IRQ runtime already modelled, wired through four type lists"
metadata: 
  node_type: memory
  type: project
  originSessionId: 6fa837a6-9fd8-4ec3-8d39-cfe84cf648ec
  modified: 2026-09-12T10:51:07.682Z
---

2026-09-12. Wardner boots, runs attract, coins, starts and reaches name entry
at ~55 fps. Its last blocker, "SOUND ERROR", was **not** a missing chip build.

Its sound Z80 ends on `CLI; BRA *` (0xf02b-equivalent at 0x3c5) and runs
entirely from the **YM3812 timer interrupt**; the main Z80 then checks that
the sound board wrote 0xFF to shared RAM 0xC000 and prints SOUND ERROR when it
has not. So what the board needs is the chip's **timers, status register and
IRQ** — not its synthesis.

All of that already existed. `src/hardware/ym2203/runtime.ts` carries an
`'opl'` timer kind (periods from registers 0x02/0x03, status 0x40/0x20, IRQ
masked by `registers[0x04] & 0x78`) built for the auxiliary **YM3526**. YM3812
is that same part plus OPL2's waveform select, and ymfm gives both the same
geometry (`opl_registers_base<Revision>` shares CHANNELS, REGISTERS,
DEFAULT_PRESCALE and the fixed operator map for Revision <= 2). So it wired
through as four type-list edits plus one `deviceType` fix:

1. `src/hardware/ym2203/definition.ts` — add `YM3812` to `YM2203_MAME_TYPES`
2. `src/hardware/ym2203/extract.ts` — accept either OPL part as the `oplEntry`
   (the YM2203 plan the worklet needs is already parsed from `ymopn.cpp` even
   when the board has none)
3. `src/hardware/ym2203/runtime.ts` — accept `YM3812` where `YM3526` was
4. `src/gen/emit-machine.ts` — `AUXILIARY_AUDIO_METHODS.YM3812 = ['write']`,
   and `oplDevices` accepts both (also fix `deviceType` to use the found part
   rather than the hardcoded `'YM3526'`)
5. `src/gen/generate.ts` — `oplChips` accepts both

**The trap that cost the most time:** there are two sound plans and both must
exist ([[board-sound-vs-app-sound]]). `config.json`'s `sound.kind` comes from
`generate.ts` and gates the AudioContext; **`board.json`'s `sound` comes from
`emit-machine.ts` and is what `installGeneratedSoundHandlers` checks** — it
returns early on `if (!machine.sound)`. Fixing only `generate.ts` gave a
config with `kind: 'ym2203'` and still zero sound writes, because the board IR
`sound` was null and no runtime was installed.

**Residual:** OPL2 waveform select (register 0x01 bit 5, per-operator
0xE0-0xF5) is not modelled, so the YM3812 voices as an OPL1. Everything the
board's *logic* depends on is real.

**Also:** a 1.8 fps reading that looked like a catastrophic regression was my
own concurrent background jobs competing for CPU. Measured in isolation, every
window (boot, attract, coin, start, play) is 48-63 fps. Time a suspicious
frame rate with nothing else running before investigating it.
