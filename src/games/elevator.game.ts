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
      1: { video: '03b62cc8', state: '5d49d367' },
      60: { video: '408e4eb7', state: '3a6d4508' },
      120: { video: 'ad87af5d', state: 'b1402c63' },
      180: { video: '97c64044', state: '39105651' },
      240: { video: '1d08f808', state: '3eb03dc4' },
      300: { video: '549fe6ff', state: '6e039078' },
      360: { video: '80d77d49', state: '50cdad4c' },
      480: { video: '23e03c9d', state: 'ac2f2fe1' },
      600: { video: '1a4c1c1c', state: '79aa02f4' },
      720: { video: '46195699', state: 'bda7f53c' },
      830: { video: 'f29d9bb7', state: '9a14ecc3' },
      900: { video: '7440ec84', state: '8ad758f7' },
    },
    audio: {
      writes: 740993,
      nonzeroWrites: 41691,
      writeHash: '5eb02f59',
      pcmHash: 'fab45e76',
      rms: 0.298685,
    },
  },
});
