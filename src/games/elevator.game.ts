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
      1: { video: '03b62cc8', state: '5617c1f4' },
      60: { video: '03b62cc8', state: '0e187e79' },
      120: { video: '03b62cc8', state: 'a3a57141' },
      180: { video: '408e4eb7', state: '5e49c583' },
      240: { video: '9012dcdc', state: 'a3e03c87' },
      300: { video: 'c2f62935', state: 'b4da9afc' },
      360: { video: 'fd808df8', state: '61c276fe' },
      480: { video: 'a9a3b285', state: 'a92ce0f3' },
      600: { video: '7887e51c', state: '388590f6' },
      720: { video: '7d052d35', state: 'c59a4640' },
      830: { video: '1752b13b', state: '8f4ace0d' },
      900: { video: '1c569507', state: '41c38ae6' },
    },
    audio: {
      writes: 729907,
      nonzeroWrites: 728268,
      writeHash: 'ebb1c371',
      pcmHash: 'f90af43c',
      rms: 0.274409,
    },
  },
});
