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
      1: { video: '1556d338', state: '08a7e045' },
      60: { video: '68c04acf', state: '2fffc8ad' },
      180: { video: '03392f1f', state: 'e873be8c' },
      300: { video: 'e61ef7b4', state: 'c0ce10e8' },
      600: { video: 'af2bf6d7', state: 'fbb70cd6' },
      900: { video: '8959914d', state: '8580ae53' },
      1200: { video: 'a317143a', state: '88dc6954' },
    },
    audio: {
      writes: 5740,
      nonzeroWrites: 4460,
      writeHash: '86bf67de',
      pcmHash: 'ca1518f9',
      rms: 0.114129,
    },
  },
});
