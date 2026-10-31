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
  soundKind: 'ym2151',
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
      1: { video: '802fae47', state: '0069cb02' },
      60: { video: '802fae47', state: 'd3f2aef3' },
      180: { video: '802fae47', state: '78441434' },
      300: { video: '802fae47', state: 'dd5b862e' },
      600: { video: '9c3c56db', state: '7ce3ac66' },
      900: { video: '64d4fc83', state: '3f1014cd' },
      1200: { video: 'b1c97ae3', state: '825377f4' },
      1400: { video: 'f041d09b', state: 'ae83a188' },
      1600: { video: 'a95edc39', state: 'c8ae2e4f' },
      1680: { video: '7d2e15bc', state: '78fde815' },
    },
    audio: {
      writes: 25916,
      nonzeroWrites: 23770,
      writeHash: '68b529a8',
      pcmHash: '3a6f13ca',
      rms: 0.048723,
    },
  },
});
