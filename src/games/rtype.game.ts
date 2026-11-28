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
      1: { video: '802fae47', state: '01f137b7' },
      60: { video: '802fae47', state: '6d8b6cf7' },
      180: { video: '802fae47', state: '438d2fc0' },
      300: { video: '802fae47', state: 'b8df2acb' },
      600: { video: 'f03f747a', state: '5797ece1' },
      900: { video: '8f79373d', state: '43f6970c' },
      1200: { video: '79ecd57b', state: 'd519ac58' },
      1400: { video: '06b65aca', state: '2282cf80' },
      1600: { video: '70b1bc75', state: 'b85a22be' },
      1680: { video: 'af2b064e', state: '19e8fbfd' },
    },
    audio: {
      writes: 1465712,
      nonzeroWrites: 820060,
      writeHash: '18078365',
      pcmHash: '923f9fe9',
      rms: 0.044775,
    },
  },
});
