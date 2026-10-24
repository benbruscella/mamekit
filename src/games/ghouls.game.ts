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
      60: { video: 'a66df50d', state: '4c62747a' },
      600: { video: '7d0b9182', state: '5bba1746' },
      1200: { video: '4ea4ed30', state: '44e31557' },
      1400: { video: 'ccf6015f', state: 'f047abf0' },
      1800: { video: '789514f2', state: 'ac6f8f59' },
      2100: { video: '8d3f7e4f', state: '116e6c92' },
      2160: { video: 'd86c494e', state: 'a23890ff' },
      2300: { video: '7bd41995', state: 'a945159f' },
    },
    audio: {
      writes: 98356,
      nonzeroWrites: 88595,
      writeHash: 'ba53ce23',
      pcmHash: '4c946627',
      rms: 0.017485,
    },
  },
};
