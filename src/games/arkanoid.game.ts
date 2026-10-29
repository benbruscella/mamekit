import { sourceTarget } from './source-contract.ts';

export const arkanoid = sourceTarget({
  game: 'arkanoid',
  driver: 'src/mame/taito/arkanoid.cpp',
  machine: { className: 'arkanoid_state', name: 'arkanoid' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  // Arkanoid boots into its own HARDWARE CHECK: the Z80 streams all 0xc000
  // program bytes through the 68705 and waits for the MCU's reply, which takes
  // about ten seconds of emulated time. Nothing before frame ~600 is sampled,
  // so the credit and the start button come after it.
  frames: 2000,
  minimumFps: 30,
  checkpoints: [1, 60, 300, 600, 900, 1200, 1500, 1800, 2000],
  actions: [
    { atFrame: 900, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 960, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1500, code: 'ArrowRight', heldFrames: 40, releasedFrames: 20 },
    { atFrame: 1600, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 20 },
    { atFrame: 1800, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      alt_mcus: '66e88525',
      gfx1: '10b018c2',
      maincpu: '97c6b2e3',
      'mcu:mcu': '0be83647',
      'mcu:mcu:bootstrap': 'f70a8620',
      proms: 'a337c91d',
    },
    checkpoints: {
      1: { video: '5e993256', state: '15a1108a' },
      60: { video: 'f76373e5', state: '41eb6de3' },
      300: { video: 'fb940f6a', state: '564fb021' },
      600: { video: 'efa6107e', state: '7169f983' },
      900: { video: '7b83ff16', state: '88de48fa' },
      1200: { video: '90fa2b3e', state: 'fd617410' },
      1500: { video: '4a9317e0', state: '24bae8cb' },
      1800: { video: 'adeb130b', state: '47caacd4' },
      2000: { video: 'c28cfcec', state: '05e7826a' },
    },
    audio: {
      writes: 2050,
      nonzeroWrites: 1407,
      writeHash: '40e98024',
      pcmHash: '8533e9d3',
      rms: 0.212272,
    },
  },
});
