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
      1: { video: 'd41d29ea', state: '20f45232' },
      60: { video: '8d0474c8', state: '740531a5' },
      300: { video: 'fae682d1', state: '054edeca' },
      600: { video: '7af03d72', state: '1e7bf8db' },
      1000: { video: '9be6e2d5', state: 'fb0822e1' },
      1300: { video: 'cffffd8b', state: 'fa1c6a12' },
      1600: { video: 'a59a3aa1', state: '0eed7c7b' },
    },
    audio: {
      writes: 1258291,
      nonzeroWrites: 1258289,
      writeHash: 'e3d67449',
      pcmHash: '04f25f7b',
      rms: 0.942345,
    },
  },
});
