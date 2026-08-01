import type { GameTestContract } from './types.ts';

export const dkong: GameTestContract = {
  game: 'dkong',
  category: 'arcade',
  driver: 'src/mame/nintendo/dkong.cpp',
  machine: { className: 'dkong_state', name: 'dkong2b' },
  romEnvironment: 'MAMEKIT_DKONG_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 480, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  audioRequirements: [
    { method: 'write', offset: 7, fromFrame: 330, minimumNonzeroWrites: 10_000 },
    {
      method: 'discrete.write_line_DS_SOUND2_INP',
      offset: 3,
      fromFrame: 330,
      minimumNonzeroWrites: 1,
    },
  ],
  golden: {
    regions: {
      gfx1: '4a641aaa',
      gfx2: 'fb7f3c49',
      maincpu: '777cf21b',
      proms: 'fe085bb3',
      soundcpu: 'c5c54e40',
    },
    checkpoints: {
      1: { video: 'ad795c56', state: '7a04c9c5' },
      60: { video: '69b683e7', state: 'eb6113a2' },
      180: { video: '69b683e7', state: '13040f14' },
      300: { video: '69b683e7', state: '7eea4b3d' },
      480: { video: '453885b9', state: 'ffc938fc' },
      600: { video: '84d61c51', state: '753eaab7' },
      900: { video: '0fcc8564', state: '3c3ebd9c' },
    },
    audio: {
      writes: 172929,
      nonzeroWrites: 114811,
      writeHash: '0c511c35',
      pcmHash: '90668b58',
      rms: 0.00748,
    },
  },
};
