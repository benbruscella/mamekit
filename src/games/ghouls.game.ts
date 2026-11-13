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
      1: { video: 'ccf6015f', state: '61abbdbf' },
      60: { video: 'c782bd0c', state: '0b7c18d8' },
      600: { video: '7d0b9182', state: '8ab5e8ef' },
      1200: { video: '4ea4ed30', state: '24c76e46' },
      1400: { video: 'ccf6015f', state: '50a12101' },
      1800: { video: 'd34505c8', state: 'beb8ffd9' },
      2100: { video: '8d3f7e4f', state: '0eb21608' },
      2160: { video: 'c6a99e35', state: 'ea9af593' },
      2300: { video: '7bd41995', state: 'a04d54f1' },
    },
    audio: {
      writes: 1851187,
      nonzeroWrites: 121235,
      writeHash: '606dc4c5',
      pcmHash: '7e47fac9',
      rms: 0.017366,
    },
  },
};
