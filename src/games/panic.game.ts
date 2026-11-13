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
      1: { video: '6087f1e5', state: '185f7e8b' },
      60: { video: 'b934538a', state: 'fd74d167' },
      180: { video: '83a56b15', state: 'fca84a94' },
      300: { video: '1aca5db7', state: '112fbff8' },
      600: { video: '2019d643', state: '18d605d5' },
      900: { video: 'ab7b492d', state: '99ac1800' },
      1200: { video: 'e73caa97', state: 'd1976175' },
    },
    audio: {
      writes: 982267,
      nonzeroWrites: 101578,
      writeHash: 'de8e1441',
      pcmHash: '83f6c300',
      rms: 0.02276,
    },
  },
});
