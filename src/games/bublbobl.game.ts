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
      120: { video: 'ccf08ecd', state: '0db9e526' },
      240: { video: '447910f6', state: '6384c7d5' },
      360: { video: '1a7e6a9e', state: '4d1b10a1' },
      600: { video: '92c0413d', state: '6e057a11' },
      900: { video: 'e52a2cdb', state: '8b53f4e7' },
      1200: { video: '8fe8bb8b', state: '78255364' },
      1800: { video: '70ead11c', state: '51fc5ad0' },
    },
    audio: {
      writes: 52220,
      nonzeroWrites: 50497,
      writeHash: 'e5cbb093',
      pcmHash: '5e6533da',
      rms: 0.037758,
    },
  },
});
