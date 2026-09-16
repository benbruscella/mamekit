import { sourceTarget } from './source-contract.ts';

export const junofrst = sourceTarget({
  game: 'junofrst',
  driver: 'src/mame/konami/junofrst.cpp',
  machine: { className: 'junofrst_state', name: 'junofrst' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 720, 1200],
  actions: [
    { atFrame: 480, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 510, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 840, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  audioRequirements: [{
    method: 'dac.data_w',
    fromFrame: 120,
    minimumNonzeroWrites: 100,
  }],
  golden: {
    regions: {
      audiocpu: '235a2893',
      blitrom: '7fc240e9',
      maincpu: '47842aab',
      mcu: 'd0fa5d5f',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: 'c9e2d9ae' },
      60: { video: 'f8a0d088', state: 'f0e772a8' },
      300: { video: 'ddad08c3', state: '07e7507f' },
      480: { video: 'e5b26a75', state: '84da7540' },
      720: { video: '90ec6eb7', state: '4841eb71' },
      1200: { video: '29686572', state: '8bdc964b' },
    },
    audio: {
      writes: 46839,
      nonzeroWrites: 25806,
      writeHash: '50a06fae',
      pcmHash: '56cecdfb',
      rms: 0.191843,
    },
  },
});
