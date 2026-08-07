import { sourceTarget } from './source-contract.ts';

export const panic = sourceTarget({
  game: 'panic',
  driver: 'src/mame/universal/cosmic.cpp',
  machine: { className: 'cosmic_state', name: 'panic' },
  screen: { width: 256, height: 192 },
  soundKind: 'samples',
  minimumAudioRms: 0.02,
  golden: {
    regions: {
      gfx1: '613f6077',
      maincpu: 'eac022b2',
      proms: '35d43d2f',
      user1: '7da0b321',
    },
    checkpoints: {
      1: { video: '6087f1e5', state: '9816df37' },
      60: { video: '7c352156', state: 'af3a981c' },
      180: { video: '46a419c9', state: 'eea5f667' },
      300: { video: '1236025c', state: '982a33c8' },
      600: { video: '2019d643', state: '8ed3a35d' },
      900: { video: 'ab7b492d', state: 'db8a9538' },
      1200: { video: 'e73caa97', state: 'dd6fefb1' },
    },
    audio: {
      writes: 623,
      nonzeroWrites: 0,
      writeHash: '6a543a17',
      pcmHash: '50645216',
      rms: 0.066605,
    },
  },
});
