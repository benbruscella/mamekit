import { sourceTarget } from './source-contract.ts';

export const bublbobl = sourceTarget({
  game: 'bublbobl',
  driver: 'src/mame/taito/bublbobl.cpp',
  machine: { className: 'bublbobl_state', name: 'bublbobl' },
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 1800,
  minimumFps: 25,
  checkpoints: [1, 120, 240, 360, 600, 900, 1200, 1800],
  actions: [
    { atFrame: 100, code: 'Digit5', heldFrames: 5, releasedFrames: 5 },
    { atFrame: 112, code: 'Digit1', heldFrames: 5, releasedFrames: 5 },
    { atFrame: 900, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 1120, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1250, code: 'ArrowLeft', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 1500, code: 'KeyZ', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'b7d41320',
      gfx1: 'ee8e34eb',
      maincpu: '5db9ecc7',
      mcu: 'b1bfb53d',
      plds: 'ff41d912',
      proms: '2d0f8545',
      subcpu: '9214c9d7',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '1db212eb' },
      120: { video: 'ccf08ecd', state: '1b16b899' },
      240: { video: '447910f6', state: '8b803352' },
      360: { video: '1a7e6a9e', state: '7d94f584' },
      600: { video: '92c0413d', state: 'a25c0a7b' },
      900: { video: 'e52a2cdb', state: 'b6203e0c' },
      1200: { video: '8fe8bb8b', state: '481d0b87' },
      1800: { video: '70ead11c', state: '7591c5bc' },
    },
    audio: {
      writes: 52220,
      nonzeroWrites: 50497,
      writeHash: 'a60ac4cf',
      pcmHash: '5bfa525a',
      rms: 0.037747,
    },
  },
});
