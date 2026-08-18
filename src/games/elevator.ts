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
      gfx: 'b9015531',
      maincpu: '2f917754',
      pal: '1569fdca',
      proms: 'b833b5ea',
    },
    checkpoints: {
      1: { video: '03b62cc8', state: 'bbfb85c2' },
      60: { video: '408e4eb7', state: '07bd4a7f' },
      120: { video: '15df02c2', state: '7e77361b' },
      180: { video: 'b111f97d', state: '27bb70a4' },
      240: { video: '1d6c3ca4', state: '18ec1fc3' },
      300: { video: 'cebfba86', state: '3f45dddb' },
      360: { video: '80d77d49', state: '2701d722' },
      480: { video: '23e03c9d', state: 'ad245e23' },
      600: { video: '1a4c1c1c', state: '68ab3e3b' },
      720: { video: '46195699', state: '7100ef19' },
      830: { video: 'f29d9bb7', state: '53f8ccc5' },
      900: { video: '7440ec84', state: '6d98687e' },
    },
    audio: {
      writes: 13810,
      nonzeroWrites: 12852,
      writeHash: '10803972',
      pcmHash: 'cfbabf91',
      rms: 0.379623,
    },
  },
});
