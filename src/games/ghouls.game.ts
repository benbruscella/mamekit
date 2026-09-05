import { sourceTarget } from './source-contract.ts';

export const ghouls = {
  ...sourceTarget({
    game: 'ghouls',
    driver: 'src/mame/capcom/cps1.cpp',
    machine: { className: 'cps_state', name: 'cps1_10MHz' },
    screen: { width: 384, height: 224 },
    soundKind: 'ym2151',
  }),
  // The original board deliberately spends more than twenty seconds testing
  // all CPS1 graphics/work RAM. Exercise coin, start and controls only after
  // that source boot sequence has completed.
  frames: 2300,
  checkpoints: [1, 60, 600, 1200, 1400, 1800, 2100, 2160, 2300],
  actions: [
    { atFrame: 2050, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 2100, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 2160, code: 'ArrowRight', heldFrames: 20, releasedFrames: 10 },
    { atFrame: 2190, code: 'Space', heldFrames: 5, releasedFrames: 5 },
  ],
  golden: {
    regions: {
      aboardplds: 'ffcf27eb',
      audiocpu: 'ccf947a8',
      bboardplds: '40508dca',
      gfx: 'a0d967ba',
      maincpu: 'a18c1200',
      oki: 'b7094978',
    },
    checkpoints: {
      1: { video: 'ccf6015f', state: '0276ca2d' },
      60: { video: '78ebb4a5', state: '4c62747a' },
      600: { video: '7d0b9182', state: 'cf14eb05' },
      1200: { video: '4ea4ed30', state: '44e31557' },
      1400: { video: 'ccf6015f', state: 'c3af5366' },
      1800: { video: '789514f2', state: '1f1ec4b9' },
      2100: { video: '8d3f7e4f', state: '3d667c5e' },
      2160: { video: 'c6a99e35', state: '16ecd569' },
      2300: { video: '7bd41995', state: 'e7f4f7c1' },
    },
    audio: {
      writes: 98288,
      nonzeroWrites: 88530,
      writeHash: '48be3efd',
      pcmHash: 'da8a91e8',
      rms: 0.017463,
    },
  },
};
