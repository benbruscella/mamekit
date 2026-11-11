import { sourceTarget } from './source-contract.ts';

const firstWaveActions = Array.from({ length: 48 }, (_, index) => [
  {
    atFrame: 780 + index * 18,
    code: 'Space',
    heldFrames: 3,
    releasedFrames: 3,
  },
  {
    atFrame: 786 + index * 18,
    code: index % 24 < 12 ? 'ArrowDown' : 'ArrowUp',
    heldFrames: 6,
    releasedFrames: 6,
  },
]).flat();

export const rtype = sourceTarget({
  game: 'rtype',
  driver: 'src/mame/irem/m72.cpp',
  machine: { className: 'm72_state', name: 'rtype' },
  screen: { width: 384, height: 256 },
  soundKind: 'stream',
  // The generated V30 completes R-Type's destructive power-on RAM tests at
  // roughly frame 550. Inputs from the standard frame-300 schedule are gone
  // before the game starts polling its ports, leaving attract mode silent.
  // Exercise the post-boot coin/start path and play into the first alien wave.
  // Destroying an enemy runs V30 ADD4S to update the packed-BCD score, so this
  // schedule guards the NEC 0f prefix as well as sound, sprites and controls.
  frames: 1680,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1400, 1600, 1680],
  actions: [
    { atFrame: 650, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 700, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    ...firstWaveActions,
  ],
  golden: {
    regions: {
      maincpu: '48ee6d20',
      plds: 'bfa01fd9',
      proms: 'ed55d0c4',
      sprites: '29c1c4b0',
      tiles0: 'd49d65f7',
      tiles1: '43c7879c',
    },
    checkpoints: {
      1: { video: '802fae47', state: '274b0ee2' },
      60: { video: '802fae47', state: '8be8ca5f' },
      180: { video: '802fae47', state: 'b9648a09' },
      300: { video: '802fae47', state: 'e8c0df24' },
      600: { video: '802fae47', state: '4ea9eed6' },
      900: { video: '9ece0b6c', state: '7a92bad2' },
      1200: { video: '0a5decdb', state: 'a59a84b0' },
      1400: { video: '4f641dbd', state: '156129ee' },
      1600: { video: '50d3d22d', state: 'add55cc6' },
      1680: { video: 'e6519e6e', state: '4b7bb176' },
    },
    audio: {
      writes: 1465712,
      nonzeroWrites: 882739,
      writeHash: '298868e7',
      pcmHash: '48c6ae59',
      rms: 0.04613,
    },
  },
});
