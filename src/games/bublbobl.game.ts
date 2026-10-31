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
      1: { video: 'f7e6ac81', state: 'fe8167b4' },
      120: { video: '48769713', state: 'e2fb9939' },
      240: { video: '3bc5e4ba', state: 'a5430ade' },
      360: { video: '66bd9956', state: '1f39489f' },
      600: { video: 'a3959c8a', state: 'fca119cb' },
      900: { video: 'd61320a7', state: '14f6d958' },
      1200: { video: '1cb87fac', state: 'f8c73445' },
      1800: { video: 'd473887c', state: 'a8fef614' },
    },
    audio: {
      writes: 52228,
      nonzeroWrites: 50505,
      writeHash: '9f7b182d',
      pcmHash: 'ed684de9',
      rms: 0.037783,
    },
  },
});
