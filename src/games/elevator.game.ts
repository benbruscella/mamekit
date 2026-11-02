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
      60: { video: '408e4eb7', state: '21e7ee52' },
      120: { video: 'ad87af5d', state: 'b5a7c183' },
      180: { video: '97c64044', state: '1296ed29' },
      240: { video: '1d08f808', state: 'b21dede7' },
      300: { video: '549fe6ff', state: '02a925a8' },
      360: { video: '80d77d49', state: 'e0b972f4' },
      480: { video: '23e03c9d', state: '2dbd0e93' },
      600: { video: '1a4c1c1c', state: 'ec087c7c' },
      720: { video: '46195699', state: '425093dc' },
      830: { video: 'f29d9bb7', state: '40092f1a' },
      900: { video: '7440ec84', state: 'b0b7f429' },
    },
    audio: {
      writes: 13793,
      nonzeroWrites: 12835,
      writeHash: '6c09a7cc',
      pcmHash: '2abc46aa',
      rms: 0.298524,
    },
  },
});
