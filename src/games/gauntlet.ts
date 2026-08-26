import { sourceTarget } from './source-contract.ts';

export const gauntlet = sourceTarget({
  game: 'gauntlet',
  driver: 'src/mame/atari/gauntlet.cpp',
  machine: { className: 'gauntlet_state', name: 'gauntlet' },
  screen: { width: 336, height: 240 },
  soundKind: 'ym2151',
  // The board answers one speaker with three chips, and the YM2151 is only
  // the one that names the sound kind. Without a gate per chip, a POKEY or a
  // TMS5220C that silently stopped producing anything would still pass on the
  // overall RMS, which the music alone is loud enough to carry.
  audioRequirements: [
    {
      // Effects. Volume-only and distortion writes both land here, so the
      // diversity bound is what distinguishes real effects from a stuck register.
      method: 'pokey.write',
      fromFrame: 500,
      minimumNonzeroWrites: 500,
      minimumDistinctValues: 8,
    },
    {
      // Speech. The idle chip drives -1 every sample, so a live stream is not
      // evidence of speech by itself; the value diversity is.
      method: 'tms.pcm',
      fromFrame: 500,
      minimumNonzeroWrites: 5000,
      minimumDistinctValues: 32,
    },
  ],
  golden: {
    regions: {
      audiocpu: '75097668',
      chars: '6c276a1d',
      maincpu: '3bd22c40',
      proms: '2aab4466',
      spr_tiles: 'dc222061',
    },
    checkpoints: {
      1: { video: 'ca3d891c', state: 'b5fbd223' },
      60: { video: 'ca3d891c', state: 'b1d42a9d' },
      300: { video: 'ca3d891c', state: 'c7a8c16f' },
      500: { video: '08927f09', state: '17e2eab4' },
      700: { video: '22f0dedd', state: '099bf057' },
      1000: { video: 'd8e5fdc2', state: '04910c88' },
      1400: { video: '0b354dfc', state: 'a21f07cc' },
      1800: { video: '1431540d', state: 'cdbf24cd' },
    },
    audio: {
      writes: 284459,
      nonzeroWrites: 252358,
      writeHash: '7b1af6e0',
      pcmHash: '542ff818',
      rms: 0.049246,
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
