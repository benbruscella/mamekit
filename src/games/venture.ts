import { sourceTarget } from './source-contract.ts';

export const venture = sourceTarget({
  game: 'venture',
  driver: 'src/mame/exidy/exidy.cpp',
  machine: { className: 'exidy_state', name: 'venture' },
  screen: { width: 256, height: 256 },
  soundKind: 'exidy',
  minimumFps: 45,
  minimumAudioRms: 0.005,
  golden: {
    regions: {
      gfx1: 'ea6fd981',
      maincpu: '0b646ce6',
      proms: '599fa32d',
      'soundbd:audiocpu': '48a9057b',
    },
    checkpoints: {
      1: { video: '21f25028', state: 'f32b0312' },
      60: { video: '21f25028', state: '848e9345' },
      180: { video: 'd2fa9021', state: '323f68e4' },
      300: { video: '65144fc9', state: '23458ed2' },
      600: { video: 'be5fe0cb', state: 'ae592e05' },
      900: { video: 'ecba4e4a', state: 'c9392138' },
      1200: { video: '81872b36', state: '9f833257' },
    },
    audio: {
      writes: 31,
      nonzeroWrites: 22,
      writeHash: 'eb51d1cb',
      pcmHash: '57bf57d1',
      rms: 0.01293,
    },
  },
});
