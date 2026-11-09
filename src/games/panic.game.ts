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
      60: { video: 'b934538a', state: '712a24a9' },
      180: { video: '83a56b15', state: '74d14f9b' },
      300: { video: '1aca5db7', state: 'aeeeb857' },
      600: { video: '2019d643', state: 'dcf02d8d' },
      900: { video: 'ab7b492d', state: 'e39923b9' },
      1200: { video: 'e73caa97', state: '61556cdd' },
    },
    audio: {
      writes: 982267,
      nonzeroWrites: 101578,
      writeHash: '702fc489',
      pcmHash: '10b2a4fc',
      rms: 0.02276,
    },
  },
});
