import { sourceTarget } from './source-contract.ts';

export const jumpbug = sourceTarget({
  game: 'jumpbug',
  driver: 'src/mame/galaxian/galaxian.cpp',
  machine: { className: 'galaxian_state', name: 'jumpbug' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 1200,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: '44240cbe',
      maincpu: '78ffa1b8',
      proms: '6a0c7d87',
    },
    checkpoints: {
      1: { video: 'b2afb37a', state: 'a230b9f3' },
      60: { video: 'f7e6ac81', state: '25dbdf96' },
      180: { video: '15d34f44', state: '275f980a' },
      300: { video: '50cc86e4', state: '81177fb1' },
      600: { video: 'bf9bfef9', state: '53e8204e' },
      900: { video: '7a6c0e9c', state: 'ded0dc85' },
      1200: { video: '0243826f', state: '6e835065' },
    },
    audio: {
      writes: 950400,
      nonzeroWrites: 950398,
      writeHash: '52e147cd',
      pcmHash: 'afe81e54',
      rms: 0.183315,
    },
  },
});
