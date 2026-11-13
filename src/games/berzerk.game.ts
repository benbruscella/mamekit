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
      1: { video: 'f7e6ac81', state: '271c024f' },
      60: { video: 'f7e6ac81', state: 'e3809630' },
      180: { video: 'f7e6ac81', state: '598c4359' },
      300: { video: 'f7e6ac81', state: '79073f74' },
      600: { video: '8090479d', state: 'a5d5d221' },
      900: { video: 'aa9820ea', state: 'e26d6415' },
      1200: { video: '6cc91e34', state: '82e285a3' },
    },
    audio: {
      writes: 965839,
      nonzeroWrites: 133298,
      writeHash: '3a411392',
      pcmHash: 'f37aba0f',
      rms: 0.019211,
    },
  },
});
