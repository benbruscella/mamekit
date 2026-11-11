import { sourceTarget } from './source-contract.ts';

export const berzerk = sourceTarget({
  game: 'berzerk',
  driver: 'src/mame/stern/berzerk.cpp',
  machine: { className: 'berzerk_state', name: 'berzerk' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  // Sound compiled from MAME (#242) runs on the main thread: CI measured
  // 48.4 fps against the old floor of 60 (issue #247, 4.5).
  minimumFps: 38,
  actions: [
    { atFrame: 550, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 580, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 700, code: 'ArrowRight', heldFrames: 90, releasedFrames: 20 },
    { atFrame: 850, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '648be64f',
      speech: 'f63d0fde',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '399c1c48' },
      60: { video: 'f7e6ac81', state: 'ab6912b1' },
      180: { video: 'f7e6ac81', state: 'cdbb449b' },
      300: { video: 'f7e6ac81', state: 'c89c9978' },
      600: { video: '8090479d', state: '62f33c31' },
      900: { video: 'aa9820ea', state: 'a13a34ff' },
      1200: { video: '6cc91e34', state: '12073232' },
    },
    audio: {
      writes: 965839,
      nonzeroWrites: 133298,
      writeHash: '1466a1f2',
      pcmHash: '8f31d6a6',
      rms: 0.019211,
    },
  },
});
