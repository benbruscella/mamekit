import { sourceTarget } from './source-contract.ts';

export const ghouls = {
  ...sourceTarget({
    game: 'ghouls',
    driver: 'src/mame/capcom/cps1.cpp',
    machine: { className: 'cps_state', name: 'cps1_10MHz' },
    screen: { width: 384, height: 224 },
    soundKind: 'stream',
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
      1: { video: 'ccf6015f', state: '5c747930' },
      60: { video: 'a66df50d', state: 'ffaaff13' },
      600: { video: '7d0b9182', state: 'e2eb1c4e' },
      1200: { video: '4ea4ed30', state: 'd895acd2' },
      1400: { video: 'ccf6015f', state: '2cbef937' },
      1800: { video: '789514f2', state: 'b9c460dc' },
      2100: { video: '8d3f7e4f', state: '94089f92' },
      2160: { video: 'd86c494e', state: '41f8e3c5' },
      2300: { video: '7bd41995', state: '7e3c03ed' },
    },
    audio: {
      writes: 1851187,
      nonzeroWrites: 121245,
      writeHash: 'c29cb46f',
      pcmHash: 'cabc5407',
      rms: 0.017437,
    },
  },
};
