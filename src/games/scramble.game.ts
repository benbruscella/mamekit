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
      1: { video: '20c59e00', state: '86577771' },
      60: { video: '7b8e7e80', state: 'd6b37c16' },
      180: { video: '526252b3', state: '8e9d6cd4' },
      300: { video: '363a4cad', state: 'b9f2790a' },
      480: { video: '2ddf92a3', state: '0f332042' },
      600: { video: '36593e3b', state: '8d3121dc' },
      900: { video: '9565486f', state: 'bbbd3bd9' },
    },
    audio: {
      writes: 7279,
      nonzeroWrites: 6238,
      writeHash: '33d48d84',
      pcmHash: '0f7040a4',
      rms: 0.158084,
    },
  },
});
