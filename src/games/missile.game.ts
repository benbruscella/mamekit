// Issue #151. Missile Command routes every CPU access through an
// address_map_bank_device, re-samples its IRQ on the 6502's SYNC line, halves
// the CPU clock for the lines video fetches steal, and arms its scanline IRQ
// with its own emu_timers. Verified against MAME 0.289 in attract with no
// input: frame 60 is 0 differing pixels; the instruction trace matches MAME's
// for the first ten frames but for interrupt phase. The attract animation
// diverges from about frame 120, because POKEY's RANDOM register is stepped per
// read here rather than per chip clock. The default DIPs ask for two coins.

import { sourceTarget } from "./source-contract.ts";

export const missile = sourceTarget({
  game: 'missile',
  driver: 'src/mame/atari/missile.cpp',
  machine: { className: 'missile_state', name: 'missile' },
  screen: { width: 256, height: 231 },
  soundKind: 'stream',
  frames: 1600,
  minimumFps: 30,
  checkpoints: [1, 60, 300, 600, 1000, 1300, 1600],
  actions: [
    { atFrame: 400, code: 'Digit5', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 430, code: 'Digit5', heldFrames: 6, releasedFrames: 20 },
    { atFrame: 1000, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1300, code: 'ArrowUp', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 1380, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 20 },
    { atFrame: 1440, code: 'Space', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 1465, code: 'KeyC', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 1490, code: 'KeyZ', heldFrames: 4, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '141443f1',
      proms: '86a22140',
    },
    checkpoints: {
      1: { video: 'd41d29ea', state: '782c48cd' },
      60: { video: '8d0474c8', state: '8d084c3e' },
      300: { video: '4587c3f1', state: '4618d1b0' },
      600: { video: '7d6de246', state: '13833c96' },
      1000: { video: '2cbf3b1f', state: '49642583' },
      1300: { video: '87557509', state: 'a369320e' },
      1600: { video: 'b7ecc48b', state: '69626d1e' },
    },
    audio: {
      writes: 1258288,
      nonzeroWrites: 1258288,
      writeHash: '52123f8b',
      pcmHash: '0f075e76',
      rms: 0.942313,
    },
  },
});
