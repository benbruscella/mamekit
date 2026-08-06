import { sourceTarget } from './source-contract.ts';

export const polepos = sourceTarget({
  game: 'polepos',
  driver: 'src/mame/namco/polepos.cpp',
  machine: { className: 'polepos_state', name: 'polepos' },
  screen: { width: 256, height: 224 },
  soundKind: 'wsg',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyC', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      '52xx': '77f83385',
      '54xx:mcu': 'ee7357e0',
      bigsprites: 'deef9a37',
      chars: '2e77187e',
      engine: '8453714e',
      maincpu: '9f2aace1',
      namco: '8568decc',
      proms: '751f64f9',
      road: 'eb5866b8',
      scalelut: 'a61bff15',
      sprites: '6c79e3ab',
      sub1: 'd0283cc3',
      sub2: '769c065e',
      tiles: '706e888a',
      user1: '2401c817',
    },
    checkpoints: {
      1: { video: '89dde23a', state: '1bf2b461' },
      60: { video: '89dde23a', state: '1a25a219' },
      180: { video: '81ca9e9a', state: '8a87bb04' },
      300: { video: '9bbefd2e', state: '8924157f' },
      600: { video: 'f207d430', state: '41080d46' },
      900: { video: '13dea699', state: '8ece622c' },
      1200: { video: '81ca9e9a', state: 'c1e8de46' },
    },
    audio: {
      writes: 34062,
      nonzeroWrites: 4915,
      writeHash: '4a607749',
      pcmHash: 'a7f9c5af',
      rms: 0.109201,
    },
  },
});
