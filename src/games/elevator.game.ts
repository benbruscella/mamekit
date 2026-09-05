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
      120: { video: 'ad87af5d', state: '2e727132' },
      180: { video: '97c64044', state: 'dbc23c47' },
      240: { video: '1d08f808', state: '8c8cc5a1' },
      300: { video: '549fe6ff', state: 'bc53890d' },
      360: { video: '80d77d49', state: '70348051' },
      480: { video: '23e03c9d', state: 'c054b57b' },
      600: { video: '1a4c1c1c', state: 'e80fe09d' },
      720: { video: '46195699', state: '710813cc' },
      830: { video: 'f29d9bb7', state: '1b880854' },
      900: { video: '7440ec84', state: '0efbc75b' },
    },
    audio: {
      writes: 13810,
      nonzeroWrites: 12852,
      writeHash: '0539aae9',
      pcmHash: '5cc96f25',
      rms: 0.379624,
    },
  },
});
