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
      1: { video: 'ca3d891c', state: '79e09e6b' },
      60: { video: 'ca3d891c', state: 'bb31c166' },
      300: { video: 'ca3d891c', state: '66183593' },
      500: { video: '08927f09', state: '2d58fbdb' },
      700: { video: '22f0dedd', state: '9f47ae5f' },
      1000: { video: 'd8e5fdc2', state: '1d39f9da' },
      1400: { video: '0b354dfc', state: 'e658521c' },
      1800: { video: '1431540d', state: '74b1bdc5' },
    },
    audio: {
      writes: 59880,
      nonzeroWrites: 33109,
      writeHash: 'ccbc76d3',
      pcmHash: 'a2cc6124',
      rms: 0.020517,
    },
  },
  // Long enough to reach real play: the warrior is in the maze from about
  // frame 600, and his health ticks down from there whether or not he moves.
  frames: 1800,
  checkpoints: [1, 60, 300, 500, 700, 1000, 1400, 1800],
  actions: [
    // A cold Gauntlet writes its whole EEPROM before it will do anything: the
    // main board spins on a write-queue drain for about 370 frames, and the
    // sound board is held in reset until that finishes (real MAME with an
    // empty nvram directory takes exactly as long). Coin after it completes.
    { atFrame: 450, code: 'Digit5', heldFrames: 15, releasedFrames: 20 },
    { atFrame: 560, code: 'KeyZ', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 700, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 900, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1100, code: 'ArrowDown', heldFrames: 90, releasedFrames: 20 },
  ],
});
