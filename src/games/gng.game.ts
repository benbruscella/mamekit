import { sourceTarget } from './source-contract.ts';

export const gng = sourceTarget({
  game: 'gng',
  driver: 'src/mame/capcom/gng.cpp',
  machine: { className: 'gng_state', name: 'gng' },
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
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
      1: { video: '589eb0d0', state: '97664026' },
      60: { video: 'f7e6ac81', state: 'e42904d3' },
      300: { video: 'a103a5e3', state: 'a3eb4241' },
      480: { video: '5b5e30a1', state: 'd749f983' },
      900: { video: '008a572c', state: 'a061c99d' },
      1200: { video: '88e2d337', state: 'ee01de5c' },
      1800: { video: 'e0bee347', state: '83b528aa' },
      2400: { video: 'cd6e8432', state: 'ba5db8f8' },
      3000: { video: '4c7abb46', state: '49d4b71b' },
    },
    audio: {
      writes: 478544,
      nonzeroWrites: 250736,
      writeHash: '82868a6d',
      pcmHash: '05b05e84',
      rms: 0.06703,
    },
  },
});
