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
      1: { video: '03b62cc8', state: 'ad20a952' },
      60: { video: '408e4eb7', state: '07f0b2e2' },
      120: { video: 'ad87af5d', state: 'e29296f0' },
      180: { video: '97c64044', state: '89c2113a' },
      240: { video: '1d08f808', state: '990c1b78' },
      300: { video: '549fe6ff', state: '43f7c3ad' },
      360: { video: '80d77d49', state: '3728fb21' },
      480: { video: '23e03c9d', state: '64adba05' },
      600: { video: '1a4c1c1c', state: '3b99f5a9' },
      720: { video: '46195699', state: '95c11a09' },
      830: { video: 'f29d9bb7', state: '6bcf40f0' },
      900: { video: '7440ec84', state: '325ccf65' },
    },
    audio: {
      writes: 13793,
      nonzeroWrites: 12835,
      writeHash: 'cbf6d48c',
      pcmHash: '35ceb3e0',
      rms: 0.379381,
    },
  },
});
