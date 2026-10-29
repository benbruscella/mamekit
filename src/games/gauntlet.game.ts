import { sourceTarget } from './source-contract.ts';

export const gauntlet = sourceTarget({
  game: 'gauntlet',
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [
      'alpha:TILEMAP',
      'mob:ATARI_MOTION_OBJECTS',
      'playfield:TILEMAP',
    ],
    handlerGaps: [
      'alpha.write16',
      'playfield.write16',
    ],
  },
  driver: 'src/mame/atari/gauntlet.cpp',
  machine: { className: 'gauntlet_state', name: 'gauntlet' },
  screen: { width: 336, height: 240 },
  soundKind: 'ym2151',
  // The board answers one speaker with three chips, and the YM2151 is only
  // the one that names the sound kind. Without a gate per chip, a TMS5220C
  // that silently stopped producing anything would still pass on the overall
  // RMS, which the music alone is loud enough to carry. The POKEY has no gate:
  // through frames 500-900 of this contract MAME's sound CPU writes it nothing
  // but AUDCTL and zero AUDC/AUDF (tools/mame-oracle.ts --io, identical on
  // both sides), so it is silent in MAME too. Its old gate counted register
  // writes, which AUDCTL alone satisfied.
  audioRequirements: [
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
      1: { video: 'ca3d891c', state: '94421da3' },
      60: { video: 'ca3d891c', state: 'dac93867' },
      300: { video: 'ca3d891c', state: '65d4f9e9' },
      500: { video: '08927f09', state: '08a4e2f3' },
      700: { video: '22f0dedd', state: 'a71012a1' },
      1000: { video: 'd8e5fdc2', state: '99cd5490' },
      1400: { video: '1d7cd8e5', state: '6c53d8e6' },
      1800: { video: '1431540d', state: '7d725858' },
    },
    audio: {
      writes: 1700618,
      nonzeroWrites: 254429,
      writeHash: 'c6ed650c',
      pcmHash: '38db9731',
      rms: 0.048974,
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
