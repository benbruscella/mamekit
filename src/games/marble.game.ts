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
      1: { video: 'ca3d891c', state: 'a8a31767' },
      60: { video: 'ca3d891c', state: '2d75421d' },
      300: { video: 'ca3d891c', state: '80a189f8' },
      600: { video: 'acd57463', state: '827dfccb' },
      900: { video: '49a76ea4', state: '8349acc6' },
      1200: { video: '8dc72644', state: 'cf051915' },
      1500: { video: '2e238bd0', state: 'ea42b9a3' },
      1800: { video: 'b12a391e', state: 'e0d047cd' },
      2100: { video: '3b92b3e9', state: '5d8119e2' },
      2400: { video: '7d1f2e8d', state: '596bb546' },
    },
    audio: {
      writes: 159050,
      nonzeroWrites: 103038,
      writeHash: 'dc2cb293',
      pcmHash: '2efe09e3',
      rms: 0.054181,
    },
  },
});
