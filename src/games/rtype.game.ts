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
      60: { video: '802fae47', state: 'b664576e' },
      180: { video: '802fae47', state: '1dd2eda9' },
      300: { video: '802fae47', state: 'b8cd7fb3' },
      600: { video: '9179e471', state: 'efba8f4e' },
      900: { video: '78e538b9', state: '5462e913' },
      1200: { video: '016dbaf3', state: 'def8b868' },
      1400: { video: 'a61ab8a5', state: '411fcb86' },
      1600: { video: '7656768d', state: '86651ce5' },
      1680: { video: '7d2e15bc', state: '16a7295f' },
    },
    audio: {
      writes: 25926,
      nonzeroWrites: 23778,
      writeHash: '8296bdba',
      pcmHash: 'a859eeed',
      rms: 0.048711,
    },
  },
});
