// Wardner (Toaplan, 1987). Twin Cobra hardware: two Z80s plus a TMS320C10
// coprocessor behind Toaplan's DSP interface.
//
// Its issue-#53 note said only "Doesn't boot", and the cause was that the
// TMS32010 did not exist: the main Z80 halts itself at 0x6ca4 to hand the DSP
// a job and spins forever at 0x6cbd waiting for RAM 0x7002 to be cleared by a
// coprocessor that never ran (#143).
//
// Past that it failed its own power-on self-test three more times, each a
// general compiler fault rather than anything Toaplan-specific -- the palette
// device owning private RAM instead of the driver's share, `u16[]` arrays
// allocated as bytes, and `reinterpret_cast<u16 *>` treated as identity in
// emitted code. The last stop was "SOUND ERROR": its sound Z80 ends on
// `CLI; BRA *` and runs entirely from the YM3812's timer interrupt.
//
// The board's self-test is long -- roughly 2800 frames before the title --
// so this contract coins well after it, as a real cabinet would.
//
// Residual: the OPL2 waveform select (register 0x01 bit 5 and the per-operator
// 0xE0-0xF5 bank) is not modelled yet, so the YM3812 currently voices as an
// OPL1. Timers, status and IRQ -- everything the board's logic depends on --
// are the real chip.

import { sourceTarget } from "./source-contract.ts";

export const wardner = sourceTarget({
  game: 'wardner',
  driver: 'src/mame/toaplan/wardner.cpp',
  machine: { className: 'wardner_state', name: 'wardner' },
  screen: { width: 320, height: 240 },
  soundKind: 'ym2203',
  frames: 3600,
  checkpoints: [1, 60, 600, 1500, 2400, 3000, 3300, 3600],
  actions: [
    { atFrame: 2900, code: 'Digit5', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 3000, code: 'Digit1', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 3200, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 3400, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '03e45d7e',
      bg_tiles: 'ebf0ecb1',
      chars: '6f2e4255',
      'dsp:dsp': '62d783dc',
      fg_tiles: 'e92f6c97',
      maincpu: 'ecaead0f',
      proms: '239bbe6c',
      scu: 'e6d88d06',
    },
    checkpoints: {
      1: { video: '8d083400', state: 'a7626fca' },
      60: { video: '8d083400', state: '8a70d61c' },
      600: { video: 'a2e250ee', state: '9f0f687e' },
      1500: { video: 'f2e76dc2', state: '9b38d83b' },
      2400: { video: '8d083400', state: 'de26195d' },
      3000: { video: 'bcf4167b', state: 'd78ca1df' },
      3300: { video: 'b0c42843', state: 'd9c00939' },
      3600: { video: '94ae16f9', state: '54613b34' },
    },
    audio: {
      writes: 778078,
      nonzeroWrites: 566535,
      writeHash: '77cc46b9',
      pcmHash: '6ea69a2f',
      rms: 0.014825,
    },
  },
});
