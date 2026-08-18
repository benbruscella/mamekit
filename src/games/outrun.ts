import { sourceTarget } from './source-contract.ts';

export const outrun = sourceTarget({
  game: 'outrun',
  driver: 'src/mame/sega/segaorun.cpp',
  machine: { className: 'segaorun_state', name: 'outrun' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyC', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: 'efc8fd91',
      maincpu: '06982bc0',
      pcm: '56dfd68e',
      segaic16road: '0a5f6c05',
      soundcpu: '186fa06c',
      sprites: '14827157',
      subcpu: 'f3be74e2',
    },
    checkpoints: {
      1: { video: '2aa9b3cc', state: '0cf11029' },
      60: { video: '4dd3b775', state: 'db62fe94' },
      180: { video: 'febab99d', state: '777cd12f' },
      300: { video: '4f4e3eba', state: '76893568' },
      600: { video: 'b7e1b9a3', state: '154501a4' },
      900: { video: '5b991090', state: '174004ea' },
      1200: { video: '64f9c01d', state: '2c340b44' },
    },
    audio: {
      writes: 66690,
      nonzeroWrites: 60968,
      writeHash: '6b048cfa',
      pcmHash: 'c164be0f',
      rms: 0.036885,
    },
  },
});
