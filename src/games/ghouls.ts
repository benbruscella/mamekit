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
      1: { video: 'ccf6015f', state: 'f97c5ee9' },
      60: { video: 'c782bd0c', state: 'c4a869a0' },
      600: { video: '7d0b9182', state: '79899531' },
      1200: { video: '24a3a263', state: 'be3a1cc9' },
      1400: { video: 'ccf6015f', state: '622782d4' },
      1800: { video: '510362b1', state: '5ada1da6' },
      2100: { video: '8d3f7e4f', state: '264a9726' },
      2160: { video: '6c66700a', state: '3de34a96' },
      2300: { video: '89ee3046', state: 'f8805672' },
    },
    audio: {
      writes: 98354,
      nonzeroWrites: 88593,
      writeHash: 'd924f06e',
      pcmHash: 'be5975d8',
      rms: 0.017505,
    },
  },
};
