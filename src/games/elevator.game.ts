import { sourceTarget } from './source-contract.ts';

export const elevator = sourceTarget({
  game: 'elevator',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'mcu' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '03b62cc8', state: 'b7d7f5a6' },
      60: { video: '03b62cc8', state: '597b7aba' },
      120: { video: '03b62cc8', state: '3c69b346' },
      180: { video: '408e4eb7', state: '4bca0240' },
      240: { video: '9012dcdc', state: '72516f8a' },
      300: { video: 'c2f62935', state: '49e474b5' },
      360: { video: 'fd808df8', state: '6b37f89e' },
      480: { video: 'a9a3b285', state: '94e75982' },
      600: { video: '7887e51c', state: '8b14e098' },
      720: { video: '7d052d35', state: '906deec9' },
      830: { video: '1752b13b', state: '12bd329c' },
      900: { video: '1c569507', state: '91d8f5ed' },
    },
    audio: {
      writes: 729907,
      nonzeroWrites: 728268,
      writeHash: 'a29602a8',
      pcmHash: 'f2df3b0b',
      rms: 0.27441,
    },
  },
});
