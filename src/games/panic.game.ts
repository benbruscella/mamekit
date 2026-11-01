import { sourceTarget } from './source-contract.ts';

export const panic = sourceTarget({
  game: 'panic',
  driver: 'src/mame/universal/cosmic.cpp',
  machine: { className: 'cosmic_state', name: 'panic' },
  screen: { width: 256, height: 192 },
  soundKind: 'stream',
  // Existing synthesized effects do not reproduce the original sample pack.
  minimumAudioRms: 0.02,
  golden: {
    regions: {
      gfx1: '613f6077',
      maincpu: 'eac022b2',
      proms: '35d43d2f',
      user1: '7da0b321',
    },
    checkpoints: {
      1: { video: '6087f1e5', state: '02fdb96d' },
      60: { video: '7c352156', state: '712a24a9' },
      180: { video: '46a419c9', state: '74d14f9b' },
      300: { video: '1236025c', state: 'aeeeb857' },
      600: { video: '2019d643', state: 'dcf02d8d' },
      900: { video: 'ab7b492d', state: 'e39923b9' },
      1200: { video: 'e73caa97', state: '61556cdd' },
    },
    audio: {
      writes: 982267,
      nonzeroWrites: 101578,
      writeHash: 'dc10088a',
      pcmHash: 'd34a69e4',
      rms: 0.02276,
    },
  },
});
