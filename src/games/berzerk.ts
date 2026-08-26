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
      1: { video: 'f7e6ac81', state: '553557d0' },
      60: { video: 'f7e6ac81', state: '0a5c68dd' },
      180: { video: 'f7e6ac81', state: '20c1b0d8' },
      300: { video: 'f7e6ac81', state: '0c5b2708' },
      600: { video: '8090479d', state: 'a5841e6f' },
      900: { video: 'aa9820ea', state: '4e1b9c0b' },
      1200: { video: '6cc91e34', state: 'f28aac30' },
    },
    audio: {
      writes: 70224,
      nonzeroWrites: 20095,
      writeHash: '4398b13b',
      pcmHash: '71a740e1',
      rms: 0.019486,
    },
  },
});
