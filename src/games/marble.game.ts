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
      300: { video: 'ca3d891c', state: 'ccf04e2e' },
      600: { video: 'acd57463', state: 'fec0a84a' },
      900: { video: 'a1a59c8e', state: '2d50551f' },
      1200: { video: '29b36fa4', state: '00887d22' },
      1500: { video: '2e238bd0', state: '79f13466' },
      1800: { video: 'c4058377', state: '7cacc89e' },
      2100: { video: '7d810647', state: 'ce5ba19d' },
      2400: { video: '4d683217', state: '320f3090' },
    },
    audio: {
      writes: 157165,
      nonzeroWrites: 101448,
      writeHash: 'ec4612c7',
      pcmHash: '5a93204c',
      rms: 0.053082,
    },
  },
});
