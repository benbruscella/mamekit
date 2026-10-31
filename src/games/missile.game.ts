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
      60: { video: '8d0474c8', state: 'e186280b' },
      300: { video: 'a2bd6276', state: '0da91461' },
      600: { video: '22c423a2', state: '36bbd2d3' },
      1000: { video: '8489119b', state: 'b236e439' },
      1300: { video: '9325e2e9', state: 'e53b4a12' },
      1600: { video: 'fab9ea72', state: '1aa54dbf' },
    },
    audio: {
      writes: 1258288,
      nonzeroWrites: 1258288,
      writeHash: '58376170',
      pcmHash: '5e6ba40e',
      rms: 0.942354,
    },
  },
});
