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
      300: { video: 'ca3d891c', state: '6dd464b7' },
      600: { video: 'acd57463', state: '6d250be6' },
      900: { video: '49a76ea4', state: 'dddd4e4d' },
      1200: { video: '8dc72644', state: '957e9a4a' },
      1500: { video: '2e238bd0', state: '1966d72d' },
      1800: { video: 'dd31c138', state: 'cec1f2c2' },
      2100: { video: '58b431ef', state: 'afcbabd5' },
      2400: { video: '3b0308da', state: '0680c95f' },
    },
    audio: {
      writes: 158891,
      nonzeroWrites: 102914,
      writeHash: '8a64e8d6',
      pcmHash: 'c6922516',
      rms: 0.057219,
    },
  },
});
