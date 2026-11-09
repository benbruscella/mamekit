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
      1: { video: '5e993256', state: '4147467b' },
      60: { video: 'f76373e5', state: 'f5ecbc5e' },
      300: { video: '6828d076', state: 'ce92daf0' },
      600: { video: 'efa6107e', state: '02830190' },
      900: { video: 'efa6107e', state: '4bd8c8cc' },
      1200: { video: '90fa2b3e', state: 'd7c62d83' },
      1500: { video: '4a9317e0', state: '15e0d35f' },
      1800: { video: 'adeb130b', state: '745197cf' },
      2000: { video: 'c28cfcec', state: 'af5820b8' },
    },
    audio: {
      writes: 2050,
      nonzeroWrites: 1407,
      writeHash: '3216d0ee',
      pcmHash: 'd9586cab',
      rms: 0.140107,
    },
  },
});
