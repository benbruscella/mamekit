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
  frames: 2200,
  checkpoints: [1, 60, 600, 1200, 1400, 1800, 2100, 2200],
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
      maincpu: '1f0eaf36',
      oki: 'b7094978',
    },
    checkpoints: {
      1: { video: 'ccf6015f', state: 'f97c5ee9' },
      60: { video: 'c782bd0c', state: 'c4a869a0' },
      600: { video: '7d0b9182', state: '79899531' },
      1200: { video: '24a3a263', state: 'be3a1cc9' },
      1400: { video: 'ccf6015f', state: '3cdb4ae6' },
      1800: { video: 'ccf6015f', state: '6358a311' },
      2100: { video: 'ccf6015f', state: 'f775c13c' },
      2200: { video: 'ccf6015f', state: '21ce1106' },
    },
    audio: {
      writes: 93648,
      nonzeroWrites: 84340,
      writeHash: '5c644bc3',
      pcmHash: '87282653',
      rms: 0.005267,
    },
  },
};
