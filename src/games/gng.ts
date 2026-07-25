import type { GameTestContract } from './types.ts';

export const gng: GameTestContract = {
  game: 'gng',
  category: 'arcade',
  driver: 'src/mame/capcom/gng.cpp',
  machine: { className: 'gng_state', name: 'gng' },
  romEnvironment: 'MAMEKIT_GNG_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 900, 1200, 1800],
  actions: [
    { atFrame: 1200, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1260, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 1620, code: 'Space', heldFrames: 30, releasedFrames: 20 },
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
      1200: { video: '5096058f', state: 'd378622c' },
      1800: { video: 'bf728f58', state: '117b6ba8' },
    },
    audio: {
      writes: 262602,
      nonzeroWrites: 138158,
      writeHash: 'f60a1eab',
      pcmHash: '4dafbfe9',
      rms: 0.054557,
    },
  },
};
