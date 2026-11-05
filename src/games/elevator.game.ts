import { sourceTarget } from './source-contract.ts';

export const elevator = sourceTarget({
  game: 'elevator',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'mcu' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 900,
  checkpoints: [1, 60, 120, 180, 240, 300, 360, 480, 600, 720, 830, 900],
  minimumFps: 30,
  minimumAudioRms: 0.1,
  shareRequirements: [
    { share: 'videoram[0]', minimumNonzeroBytes: 1 },
    { share: 'videoram[2]', minimumNonzeroBytes: 1 },
  ],
  golden: {
    regions: {
      audiocpu: 'ba8a493c',
      'bmcu:mcu': '9ce75afc',
      'bmcu:mcu:bootstrap': 'f70a8620',
      gfx: 'b9015531',
      maincpu: '2f917754',
      pal: '1569fdca',
      proms: 'b833b5ea',
    },
    checkpoints: {
      1: { video: '03b62cc8', state: '1bc60187' },
      60: { video: '03b62cc8', state: '24c7a6aa' },
      120: { video: '03b62cc8', state: '93bf08dc' },
      180: { video: '408e4eb7', state: '3f9b3053' },
      240: { video: '9012dcdc', state: '5836d491' },
      300: { video: 'c2f62935', state: 'eda50d81' },
      360: { video: '80d77d49', state: '5a9dd173' },
      480: { video: '23e03c9d', state: '0afd3ade' },
      600: { video: '1a4c1c1c', state: '82f841cb' },
      720: { video: '46195699', state: '7eacb391' },
      830: { video: 'f29d9bb7', state: '765b2e69' },
      900: { video: '7440ec84', state: '0a4c33e5' },
    },
    audio: {
      writes: 738804,
      nonzeroWrites: 39348,
      writeHash: 'e3e28031',
      pcmHash: '053a08e4',
      rms: 0.299207,
    },
  },
});
