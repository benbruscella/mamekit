import { sourceTarget } from './source-contract.ts';

export const pengo = sourceTarget({
  game: 'pengo',
  driver: 'src/mame/pacman/pengo.cpp',
  machine: { className: 'pengo_state', name: 'pengou' },
  screen: { width: 288, height: 224 },
  soundKind: 'wsg',
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
      1: { video: '1556d338', state: '091028bb' },
      60: { video: '68c04acf', state: 'aaf3ec3e' },
      180: { video: '03392f1f', state: '1828f123' },
      300: { video: 'e61ef7b4', state: '30955f47' },
      600: { video: 'af2bf6d7', state: '0ddc3c94' },
      900: { video: '8959914d', state: 'df5ef847' },
      1200: { video: 'a317143a', state: '0fa1d94e' },
    },
    audio: {
      writes: 5758,
      nonzeroWrites: 4473,
      writeHash: '289474b0',
      pcmHash: '1f20f406',
      rms: 0.112674,
    },
  },
});
