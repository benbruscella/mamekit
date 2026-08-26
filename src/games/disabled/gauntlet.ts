// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: doesn't boot. Issue #88 fixed the boot. The
// slapstic lowers now (src/mame/slapstic-compiler.ts), its ROM window reads as
// bytes on the 68010's 16-bit bus, COMBINE_DATA reaches a memory share so the
// playfield scrolls, and the motion objects render from the driver's own
// atari_motion_objects_config. Gauntlet's attract mode is within 0.4% of real
// MAME frame for frame, and that residual is one frame of sprite animation
// phase. The golden below still predates all of it: acceptance cannot reach a
// disabled contract, so nothing has re-recorded it.
//
// What still blocks the target is the sound-board handshake, and because
// Gauntlet reads its coin inputs on the sound board this is not only an audio
// fault: the game cannot be started. The sound CPU does see the coin (its
// COIN port reads 0xf7 for as long as the key is held); it never gets to
// relay it.
//
// The sound board answers its power-on handshake with six back-to-back writes
// to the main latch. MAME's generic_latch_8 stores through
// scheduler().synchronize and MAME's timeslice is coarse, so the 68010 cannot
// read that latch part-way through the burst: it takes one data-pending
// interrupt and banks one response. Processors here interleave once per
// scanline, so the 68010 lands inside the burst and banks a second response.
// The main board's sound watchdog (maincpu 0x40e84) reads any response it did
// not ask for as a dead sound board, so from then on it resets the sound
// board every other frame — far too often for the coin debounce to finish.
//
// Fixing it needs MAME's scheduling model — a coarse default quantum with
// source-declared perfect_quantum boosts — rather than the fixed per-scanline
// interleave. Two narrower attempts under issue #88 did not work: deferring
// only the latch store still splits the burst across two scanlines, and
// deferring it without also deferring set_input_line moves the sound-latch
// NMI past the reset release it has to arrive behind, which breaks the same
// handshake from the other side.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

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
    // A cold Gauntlet writes its whole EEPROM before it will do anything: the
    // main board spins on a write-queue drain for about 370 frames, and the
    // sound board is held in reset until that finishes (real MAME with an
    // empty nvram directory takes exactly as long). Coin after it completes.
    { atFrame: 450, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
});
