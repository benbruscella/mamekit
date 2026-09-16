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
  // Issue #119 intentionally re-recorded this contract after removing the
  // synthetic YM coin tone and duplicate devcb listener. The video and real
  // POKEY/TMS5220 PCM hashes remain stable; only source-visible state ordering
  // and the removed synthetic register writes change.
  golden: {
    regions: {
      audiocpu: '75097668',
      chars: '6c276a1d',
      maincpu: '3bd22c40',
      proms: '2aab4466',
      spr_tiles: 'dc222061',
    },
    checkpoints: {
      1: { video: 'ca3d891c', state: 'eea61b47' },
      60: { video: 'ca3d891c', state: 'b7424d26' },
      300: { video: 'ca3d891c', state: 'bf5d7756' },
      500: { video: '08927f09', state: 'b928e327' },
      700: { video: '22f0dedd', state: '9711fdc4' },
      1000: { video: '01f2f0bd', state: '725bd169' },
      1400: { video: '37757ff1', state: '0fb14fc7' },
      1800: { video: '3cb8c59e', state: '4031df96' },
    },
    audio: {
      writes: 284441,
      nonzeroWrites: 252857,
      writeHash: 'eee3ba6d',
      pcmHash: 'c3b4855c',
      rms: 0.049544,
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
