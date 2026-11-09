import { sourceTarget } from './source-contract.ts';

export const junofrst = sourceTarget({
  game: 'junofrst',
  driver: 'src/mame/konami/junofrst.cpp',
  machine: { className: 'junofrst_state', name: 'junofrst' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: 'f7e6ac81', state: 'f50a95b0' },
      60: { video: 'f8a0d088', state: 'b93a5fcb' },
      300: { video: 'ddad08c3', state: '8a0c3b11' },
      480: { video: 'e5b26a75', state: '3897b8f8' },
      720: { video: '90ec6eb7', state: '5323e6d4' },
      1200: { video: '29686572', state: 'f0788adf' },
    },
    audio: {
      writes: 46837,
      nonzeroWrites: 25878,
      writeHash: '554b8b56',
      pcmHash: 'f8b587cf',
      rms: 0.318362,
    },
  },
});
