import type { GameTestContract } from './types.ts';

export const bankp: GameTestContract = {
  game: 'bankp',
  category: 'arcade',
  driver: 'src/mame/sanritsu/bankp.cpp',
  machine: { className: 'bankp_state', name: 'bankp' },
  romEnvironment: 'MAMEKIT_BANKP_ROM',
  screen: { width: 224, height: 224 },
  soundKind: 'sn76489',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 390, code: 'ArrowLeft', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 480, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      bgtiles: '649fb90c',
      fgtiles: '666a6012',
      maincpu: '8f1d866c',
      proms: '23233dd2',
      user1: 'f998e2a4',
    },
    checkpoints: {
      '1': { video: '44c40437', state: 'b08f25c3' },
      '60': { video: '62aeee31', state: '6d4e9635' },
      '180': { video: 'cadacbd0', state: '3d4665dc' },
      '300': { video: '440c48ec', state: '95591f09' },
      '480': { video: 'defbf608', state: '526a4e7e' },
      '600': { video: '5870b2a4', state: 'e74754de' },
      '900': { video: 'f2a19462', state: '55641faa' },
    },
    audio: {
      writes: 716,
      nonzeroWrites: 662,
      writeHash: '40f4cbfb',
      pcmHash: '83439d8e',
      rms: 0.111687,
    },
  },
};
