// Marble Madness (Atari Games, 1984). Atari System 1: 68010 + 6502, slapstic
// 103, a trackball rotated 45 degrees.
//
// Every fault between "boots" and "plays" was a general one, verified against
// real MAME 0.289 rather than recorded over:
//
// 1. The watchdog hang at frame ~346. MAME's 68010 is still the Musashi core,
//    whose immediate reads prefetch the next word; the slapstic counts those
//    reads, and without them its bank state drifted off MAME's.
// 2. Latch handshakes. generic_latch_8 writes synchronize: the writer's slice
//    ends and the sound CPU catches up before the store. Main RAM is now 1
//    byte from MAME at frame 900.
// 3. The black screen: graphics sets built at run time (make_unique
//    <gfx_element>, set_gfx, MAX_GFX_ELEMENTS lost to an include-guard parse
//    bug), tilemap RAM writes that never marked tiles dirty, 16-bit shares read
//    byte-swapped, a Gauntlet screen executor claiming this board, and MAME
//    rectangle accessors. Frame 899 is pixel-identical to MAME's frame 900.
// 4. Dead controls: the video compiler took the driver file's first GAME
//    (Peter Pack Rat, init_peterpak: a joystick) instead of init_marble.
//
// Attract mode is black until about frame 400 in MAME too.

import { sourceTarget } from "./source-contract.ts";

export const marble = sourceTarget({
  game: 'marble',
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
  driver: 'src/mame/atari/atarisy1.cpp',
  machine: { className: 'atarisy1_state', name: 'marble' },
  screen: { width: 336, height: 240 },
  soundKind: 'ym2151',
  frames: 2400,
  checkpoints: [1, 60, 300, 600, 900, 1200, 1500, 1800, 2100, 2400],
  actions: [
    { atFrame: 1200, code: 'Digit5', heldFrames: 10, releasedFrames: 50 },
    { atFrame: 1300, code: 'Digit1', heldFrames: 10, releasedFrames: 50 },
    // The trackball: arrow keys push it, so a held key keeps rolling.
    { atFrame: 1700, code: 'ArrowDown', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 1900, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 2100, code: 'ArrowLeft', heldFrames: 90, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      alpha: '7a29dc07',
      audiocpu: '58ff78db',
      maincpu: '8b543986',
      motherbrd_proms: 'f5691d7f',
      proms: 'b5a188a9',
      tiles: '21bbc8cb',
    },
    checkpoints: {
      1: { video: 'ca3d891c', state: '64639e75' },
      60: { video: 'ca3d891c', state: '402627e0' },
      300: { video: 'ca3d891c', state: 'ccf04e2e' },
      600: { video: 'acd57463', state: 'a74f1ef9' },
      900: { video: 'a1a59c8e', state: '3257a1b5' },
      1200: { video: '29b36fa4', state: 'ad983999' },
      1500: { video: '2e238bd0', state: 'ac8644c6' },
      1800: { video: 'c4058377', state: '60a3b3c5' },
      2100: { video: '7d810647', state: '4f2ff20a' },
      2400: { video: '4d683217', state: 'd0b422e8' },
    },
    audio: {
      writes: 157165,
      nonzeroWrites: 101448,
      writeHash: 'b99b9c62',
      pcmHash: 'e4a7c3d6',
      rms: 0.05308,
    },
  },
});
