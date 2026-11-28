import { sourceTarget } from './source-contract.ts';

export const elevator = sourceTarget({
  game: 'elevator',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'mcu' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 900,
  checkpoints: [1, 60, 120, 180, 240, 300, 360, 480, 600, 720, 830, 900],
  // The 68705's status read asks for perfect_quantum(10 us) on every poll,
  // and the window lasts until a timer fires, as MAME's does (#296): the
  // main CPU interleaves finely for most of each frame. 28.5 fps on CI.
  minimumFps: 25,
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
      180: { video: '408e4eb7', state: '67862c37' },
      240: { video: 'b5ee5d1b', state: 'c8414c6c' },
      300: { video: '5651857d', state: '969401b8' },
      360: { video: 'fd808df8', state: '6a222c04' },
      480: { video: 'a9a3b285', state: 'e77beb78' },
      600: { video: '7887e51c', state: '8b14e098' },
      720: { video: '7d052d35', state: '7ff2d65e' },
      830: { video: '1752b13b', state: '8ebeb8f1' },
      900: { video: '1c569507', state: '389487e6' },
    },
    audio: {
      writes: 729907,
      nonzeroWrites: 728268,
      writeHash: '61ec590f',
      pcmHash: 'd86c4c31',
      rms: 0.274962,
    },
  },
});
