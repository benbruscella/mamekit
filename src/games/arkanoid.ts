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
      proms: 'a337c91d',
    },
    checkpoints: {
      1: { video: 'f3eb6659', state: '15a1108a' },
      60: { video: 'f76373e5', state: '10d5e80f' },
      300: { video: 'fb940f6a', state: 'd7442022' },
      600: { video: 'efa6107e', state: '5206aeaf' },
      900: { video: '7b83ff16', state: 'b9954fc6' },
      1200: { video: '90fa2b3e', state: '95432cb3' },
      1500: { video: '4a9317e0', state: '6eeeb251' },
      1800: { video: 'adeb130b', state: '21343d91' },
      2000: { video: 'c28cfcec', state: 'b91596f1' },
    },
    audio: {
      writes: 2046,
      nonzeroWrites: 1404,
      writeHash: 'e1bbdbfc',
      pcmHash: 'eb939c4c',
      rms: 0.212322,
    },
  },
});
