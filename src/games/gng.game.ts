import { sourceTarget } from './source-contract.ts';

export const gng = sourceTarget({
  game: 'gng',
  driver: 'src/mame/capcom/gng.cpp',
  machine: { className: 'gng_state', name: 'gng' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 3000,
  minimumFps: 45,
  // 2400 and 3000 land in scrolling gameplay: a background scroll is what
  // exposes tilemap coverage bugs, and the attract screens alone cannot.
  checkpoints: [1, 60, 300, 480, 900, 1200, 1800, 2400, 3000],
  actions: [
    { atFrame: 900, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 960, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1400, code: 'ArrowRight', heldFrames: 900, releasedFrames: 20 },
    { atFrame: 2400, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 2500, code: 'ArrowRight', heldFrames: 400, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'd23fbc19',
      chars: 'ecfccf07',
      maincpu: '1458694d',
      plds: 'a7474ed5',
      proms: '16ccf801',
      sprites: 'a627306f',
      tiles: '7fecac80',
    },
    checkpoints: {
      1: { video: '589eb0d0', state: '19134826' },
      60: { video: 'f7e6ac81', state: 'c2409df5' },
      300: { video: 'a103a5e3', state: '9bb9bbb2' },
      480: { video: '5b5e30a1', state: '0bd24577' },
      900: { video: '008a572c', state: '6496d2b6' },
      1200: { video: '88e2d337', state: '618dcf7c' },
      1800: { video: 'a8a34ea3', state: '1bf80a17' },
      2400: { video: '50d77756', state: '0ee1e70d' },
      3000: { video: '9a2f2e34', state: 'd6d4d267' },
    },
    audio: {
      writes: 2414591,
      nonzeroWrites: 1677490,
      writeHash: '466754c6',
      pcmHash: 'd969ec93',
      rms: 0.068019,
    },
  },
});
