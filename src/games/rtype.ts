import { sourceTarget } from './source-contract.ts';

export const rtype = sourceTarget({
  game: 'rtype',
  driver: 'src/mame/irem/m72.cpp',
  machine: { className: 'm72_state', name: 'rtype' },
  screen: { width: 384, height: 256 },
  soundKind: 'ym2151',
  // The generated V30 completes R-Type's destructive power-on RAM tests at
  // roughly frame 550. Inputs from the standard frame-300 schedule are gone
  // before the game starts polling its ports, leaving attract mode silent.
  // Exercise the post-boot coin/start path so acceptance covers the sound Z80
  // upload, reset release, YM2151 programming and live player controls.
  frames: 1400,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200, 1400],
  actions: [
    { atFrame: 650, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 700, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 800, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 980, code: 'Space', heldFrames: 30, releasedFrames: 20 },
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
      600: { video: 'f865def7', state: 'efba8f4e' },
      900: { video: '5f89124b', state: '03fb4816' },
      1200: { video: 'fdf83270', state: '05006177' },
      1400: { video: '80eda984', state: '0577a0ba' },
    },
    audio: {
      writes: 12808,
      nonzeroWrites: 12322,
      writeHash: '58bea931',
      pcmHash: '8e15fcb1',
      rms: 0.039055,
    },
  },
});
