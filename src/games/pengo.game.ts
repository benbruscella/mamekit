import { sourceTarget } from './source-contract.ts';

export const pengo = sourceTarget({
  game: 'pengo',
  driver: 'src/mame/pacman/pengo.cpp',
  machine: { className: 'pengo_state', name: 'pengou' },
  screen: { width: 288, height: 224 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '5eef2693',
      maincpu: '812d312a',
      namco: '6aee56a5',
      proms: 'a2cb43ba',
    },
    checkpoints: {
      1: { video: '1556d338', state: 'f22988e2' },
      60: { video: '68c04acf', state: 'e8cc6f29' },
      180: { video: '03392f1f', state: '417f51bf' },
      300: { video: 'e61ef7b4', state: '7efc8a76' },
      600: { video: 'af2bf6d7', state: '17edd55e' },
      900: { video: '8959914d', state: '60d5bb14' },
      1200: { video: 'a317143a', state: '5836ed0b' },
    },
    audio: {
      writes: 950399,
      nonzeroWrites: 625131,
      writeHash: 'c10871ec',
      pcmHash: 'f498338a',
      rms: 0.110106,
    },
  },
});
