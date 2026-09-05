import { sourceTarget } from './source-contract.ts';

export const scramble = sourceTarget({
  game: 'scramble',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'scramble' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 480, 600, 900],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    // Scramble is still on its PLAYER ONE transition at frame 510. Exercise
    // both live fire inputs once the ship is accepting controls.
    { atFrame: 570, code: 'Space', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 610, code: 'KeyZ', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 650, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'ab3f2efe',
      gfx1: '85211f51',
      maincpu: 'd404a433',
      proms: '4e3caeab',
    },
    checkpoints: {
      1: { video: '0d7b640f', state: '30bb1cc6' },
      60: { video: '7b8e7e80', state: '87783322' },
      180: { video: '77eb032f', state: 'cd842674' },
      300: { video: '363a4cad', state: '8458ba9b' },
      480: { video: '2ddf92a3', state: '4478252b' },
      600: { video: '36593e3b', state: '439361f4' },
      900: { video: '9565486f', state: 'fce5d8b0' },
    },
    audio: {
      writes: 6986,
      nonzeroWrites: 6103,
      writeHash: 'a31a7c91',
      pcmHash: 'fea99109',
      rms: 0.034885,
    },
  },
});
