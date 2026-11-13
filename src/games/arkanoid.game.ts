import { sourceTarget } from './source-contract.ts';

export const arkanoid = sourceTarget({
  game: 'arkanoid',
  driver: 'src/mame/taito/arkanoid.cpp',
  machine: { className: 'arkanoid_state', name: 'arkanoid' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: 'c0776a82', state: '85c7175c' },
      60: { video: 'f76373e5', state: 'd272fb5c' },
      300: { video: '6828d076', state: 'b1f9de17' },
      600: { video: 'efa6107e', state: '5c61f836' },
      900: { video: 'efa6107e', state: '7e5fc05f' },
      1200: { video: '90fa2b3e', state: '2f6bddc9' },
      1500: { video: '4a9317e0', state: '2576314b' },
      1800: { video: 'adeb130b', state: '7a608f9a' },
      2000: { video: 'c28cfcec', state: '4cc11c5c' },
    },
    audio: {
      writes: 1622015,
      nonzeroWrites: 1622013,
      writeHash: '134e5bd8',
      pcmHash: 'c1a71468',
      rms: 0.348377,
    },
  },
});
