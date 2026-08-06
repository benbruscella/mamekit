import { sourceTarget } from './source-contract.ts';

export const arkanoid = sourceTarget({
  game: 'arkanoid',
  driver: 'src/mame/taito/arkanoid.cpp',
  machine: { className: 'arkanoid_state', name: 'arkanoid' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      alt_mcus: '66e88525',
      gfx1: '10b018c2',
      maincpu: '97c6b2e3',
      'mcu:mcu': '0be83647',
      proms: 'a337c91d',
    },
    checkpoints: {
      1: { video: '5e993256', state: '59c46b72' },
      60: { video: '0f0c7077', state: '3aed8f86' },
      180: { video: 'efa6107e', state: '7036a547' },
      300: { video: 'efa6107e', state: '91cefa7f' },
      600: { video: '1f046a3b', state: '034690d2' },
      900: { video: '3547c585', state: '7458ee27' },
      1200: { video: '537213bc', state: '8515a7b4' },
    },
    audio: {
      writes: 1617,
      nonzeroWrites: 1118,
      writeHash: '49e44bbb',
      pcmHash: 'ddaee97a',
      rms: 0.252242,
    },
  },
});
