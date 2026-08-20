// DISABLED: this target is not discovered, generated or shipped.
//
// Play-test finding, issue #53: No player sprite; boot-up also leaves squares
// off screen.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import type { GameTestContract } from '../types.ts';

export const rygar: GameTestContract = {
  game: 'rygar',
  category: 'arcade',
  driver: 'src/mame/tecmo/tecmo.cpp',
  machine: { className: 'tecmo_state', name: 'rygar' },
  romEnvironment: 'MAMEKIT_RYGAR_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 820, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      adpcm: '3cc98c5a',
      bgtiles: '038e03e4',
      fgtiles: '629a5982',
      maincpu: 'f98e2867',
      soundcpu: '57ccf14e',
      sprites: 'e13b4a57',
      txtiles: '4d482fb6',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '16f2fa1e' },
      60: { video: 'ad4cd5b4', state: 'fb9ef5cb' },
      180: { video: '0362d0d0', state: 'd6e1bd3e' },
      300: { video: '3b29d407', state: '486a45c6' },
      600: { video: '40b8eb29', state: '29a1c9cd' },
      900: { video: '9ac3cbbf', state: 'b53ab478' },
      1200: { video: '9ac3cbbf', state: '30fb3bc8' },
    },
    audio: {
      writes: 178826,
      nonzeroWrites: 178355,
      writeHash: '5aebabf8',
      pcmHash: 'a7cf566a',
      rms: 0.064055,
    },
  },
};
