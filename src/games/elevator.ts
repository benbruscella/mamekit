import { sourceTarget } from './source-contract.ts';

export const elevator = sourceTarget({
  game: 'elevator',
  driver: 'src/mame/taito/taitosj.cpp',
  machine: { className: 'taitosj_state', name: 'mcu' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 600,
  checkpoints: [1, 60, 120, 132, 150, 180, 240, 300, 360, 480, 600],
  minimumFps: 20,
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
      60: { video: '03b62cc8', state: 'c04956de' },
      120: { video: '03b62cc8', state: '22cdca67' },
      132: { video: '03b62cc8', state: '25411f20' },
      150: { video: '03b62cc8', state: '39cffc2e' },
      180: { video: '0c41b1b0', state: '1b459387' },
      240: { video: 'e6b7187c', state: 'baff70c0' },
      300: { video: 'e6b7187c', state: 'c56ec036' },
      360: { video: 'e6b7187c', state: 'd45144b6' },
      480: { video: 'e6b7187c', state: '89f93466' },
      600: { video: 'e6b7187c', state: '4ee1bc4c' },
    },
    audio: {
      writes: 5758,
      nonzeroWrites: 4976,
      writeHash: 'ce6405a3',
      pcmHash: '388d8f74',
      rms: 0.3426,
    },
  },
});
