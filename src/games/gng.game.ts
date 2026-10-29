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
      1: { video: '589eb0d0', state: 'c3d12965' },
      60: { video: 'f7e6ac81', state: '95245290' },
      300: { video: 'a103a5e3', state: 'a3eb4241' },
      480: { video: '5b5e30a1', state: 'e59e28ab' },
      900: { video: '008a572c', state: '0255ce64' },
      1200: { video: '88e2d337', state: '0126bcee' },
      1800: { video: 'a8a34ea3', state: 'e8049cff' },
      2400: { video: '50d77756', state: 'cb05385d' },
      3000: { video: '9a2f2e34', state: '50c45dbd' },
    },
    audio: {
      writes: 478602,
      nonzeroWrites: 252530,
      writeHash: '3a6acc54',
      pcmHash: '04bfa2c7',
      rms: 0.067583,
    },
  },
});
