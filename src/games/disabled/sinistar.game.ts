// DISABLED: this target is not discovered, generated or shipped.
//
// Parked by issue #53 on play-test evidence; re-examined for issue #108,
// which is where the measurements below come from.
//
// The framebuffer is uninitialised noise and stops changing at frame 71.
// Williams bitmap hardware draws through WILLIAMS_BLITTER_SC1, which is
// still a generation gap, so nothing ever writes the display; HC55516 CVSD
// speech is missing for the same reason.
//
// Its recorded golden dates from that broken state -- the video hash is
// identical at frames 180 through 1200 -- so acceptance passes while the
// game does not run. Re-record it only once the blitter exists.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const sinistar = sourceTarget({
  game: 'sinistar',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'sinistar_upright' },
  screen: { width: 292, height: 240 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'KeyZ', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: 'c154cd24',
      proms: '7d9a7ed2',
      soundcpu: 'e5586ced',
    },
    checkpoints: {
      1: { video: '926ea52a', state: '531a9734' },
      60: { video: 'b497b99e', state: '517bf8c6' },
      180: { video: 'f0b8f876', state: '897c8f01' },
      300: { video: 'f0b8f876', state: '350303d3' },
      600: { video: 'f0b8f876', state: '6bb6629d' },
      900: { video: 'f0b8f876', state: '2c272f06' },
      1200: { video: 'f0b8f876', state: '377eb48d' },
    },
    audio: {
      writes: 4,
      nonzeroWrites: 2,
      writeHash: '7448a118',
      pcmHash: '677e3a55',
      rms: 0.234375,
    },
  },
});
