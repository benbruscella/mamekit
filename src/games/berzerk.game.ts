import { sourceTarget } from './source-contract.ts';

export const berzerk = sourceTarget({
  game: 'berzerk',
  driver: 'src/mame/stern/berzerk.cpp',
  machine: { className: 'berzerk_state', name: 'berzerk' },
  screen: { width: 256, height: 224 },
  soundKind: 'berzerk',
  minimumFps: 60,
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
      1: { video: 'f7e6ac81', state: 'a28d9b5f' },
      60: { video: 'f7e6ac81', state: '7196eaab' },
      180: { video: 'f7e6ac81', state: '41267424' },
      300: { video: 'f7e6ac81', state: 'd10a01f3' },
      600: { video: '8090479d', state: '93e177e7' },
      900: { video: 'aa9820ea', state: '787ef583' },
      1200: { video: '6cc91e34', state: '11dfc24b' },
    },
    audio: {
      writes: 70224,
      nonzeroWrites: 20095,
      writeHash: 'e4efe22b',
      pcmHash: 'b66efcc9',
      rms: 0.019488,
    },
  },
});
