import { sourceTarget } from './source-contract.ts';

export const gauntlet = sourceTarget({
  game: 'gauntlet',
  driver: 'src/mame/atari/gauntlet.cpp',
  machine: { className: 'gauntlet_state', name: 'gauntlet' },
  screen: { width: 336, height: 240 },
  soundKind: 'ym2151',
  golden: {
    regions: {
      audiocpu: '75097668',
      chars: '6c276a1d',
      maincpu: '3bd22c40',
      proms: '2aab4466',
      spr_tiles: 'dc222061',
    },
    checkpoints: {
      1: { video: 'ca3d891c', state: 'a4b3a77a' },
      60: { video: 'cda02b8a', state: 'ada7b65e' },
      180: { video: 'cda02b8a', state: '2d9a46f7' },
      300: { video: 'cda02b8a', state: 'e7ba06bd' },
      600: { video: '164670e7', state: '6604ddca' },
      900: { video: '164670e7', state: 'f828b585' },
      1200: { video: '164670e7', state: 'c34fc8b5' },
    },
    audio: {
      writes: 26177,
      nonzeroWrites: 13102,
      writeHash: '41b9a083',
      pcmHash: '21907053',
      rms: 0.005329,
    },
  },
  actions: [
    // The sound board is intentionally held in reset through the main-board
    // self-test (about 382 frames). Coin after that real handshake completes.
    { atFrame: 450, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
