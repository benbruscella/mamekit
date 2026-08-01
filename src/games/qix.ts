import type { GameTestContract } from './types.ts';

export const qix: GameTestContract = {
  game: 'qix',
  category: 'arcade',
  driver: 'src/mame/taito/qix.cpp',
  machine: { className: 'qix_state', name: 'qix' },
  romEnvironment: 'MAMEKIT_QIX_ROM',
  screen: { width: 256, height: 256 },
  soundKind: 'discrete',
  frames: 900,
  minimumFps: 40,
  checkpoints: [1, 10, 30, 60, 180, 300, 480, 600, 900],
  actions: [
    // Blank NVRAM asks for a language. Accept the highlighted default, then
    // reset as the original operator flow specifies; the NVRAM survives.
    { atFrame: 100, code: 'Digit9', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 150, reset: true },
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 480, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [{
    method: 'write',
    offset: 1,
    fromFrame: 180,
    minimumNonzeroWrites: 1_000,
  }],
  golden: {
    regions: {
      audiocpu: 'd5071fa5',
      maincpu: 'e80d2bb9',
      videocpu: '081eb1c6',
    },
    checkpoints: {
      1: { video: '21f25028', state: '08271395' },
      10: { video: '21f25028', state: '5a091218' },
      30: { video: '21f25028', state: '6c3b0b35' },
      60: { video: '21f25028', state: 'c0390e0c' },
      180: { video: 'f009f75f', state: '07df69bb' },
      300: { video: '7897a528', state: 'b80d8432' },
      480: { video: '33e7bcfd', state: '5927b757' },
      600: { video: '52400c01', state: 'b2cf3cff' },
      900: { video: 'c1621dd9', state: 'eec9e4a5' },
    },
    audio: {
      writes: 16725,
      nonzeroWrites: 16685,
      writeHash: '7e03ed81',
      pcmHash: 'a52881bc',
      rms: 0.168477,
    },
  },
};
