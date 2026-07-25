import type { GameTestContract } from './types.ts';

export const gng: GameTestContract = {
  game: 'gng',
  category: 'arcade',
  driver: 'src/mame/capcom/gng.cpp',
  machine: { className: 'gng_state', name: 'gng' },
  romEnvironment: 'MAMEKIT_GNG_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 3000,
  minimumFps: 45,
  // 2400 and 3000 land in scrolling gameplay: a background scroll is what
  // exposes tilemap coverage bugs, and the attract screens alone cannot...
  checkpoints: [1, 60, 300, 480, 900, 1200, 1800, 2400, 3000],
  actions: [
    { atFrame: 900, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 960, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1400, code: 'ArrowRight', heldFrames: 900, releasedFrames: 20 },
    { atFrame: 2400, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 2500, code: 'ArrowRight', heldFrames: 400, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'd23fbc19',
      chars: 'ecfccf07',
      maincpu: '1458694d',
      plds: 'a7474ed5',
      proms: '16ccf801',
      sprites: 'a627306f',
      tiles: '7fecac80',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '97664026' },
      60: { video: 'f7e6ac81', state: 'e42904d3' },
      300: { video: 'f7e6ac81', state: 'a3eb4241' },
      480: { video: '5b5e30a1', state: 'cfa6424a' },
      900: { video: '008a572c', state: '16a21cbf' },
      1200: { video: '9fc16ce3', state: '5410d118' },
      1800: { video: '58d45496', state: '1c7348f4' },
      2400: { video: 'c78bec9d', state: 'ae60d957' },
      3000: { video: '4c7abb46', state: '994ff023' },
    },
    audio: {
      writes: 478542,
      nonzeroWrites: 250736,
      writeHash: '15db3517',
      pcmHash: '41eb6206',
      rms: 0.07416,
    },
  },
};
