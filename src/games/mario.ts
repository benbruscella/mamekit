import { sourceTarget } from './source-contract.ts';

export const mario = {
  ...sourceTarget({
    game: 'mario',
    driver: 'src/mame/nintendo/mario.cpp',
    machine: { className: 'mario_state', name: 'mario' },
    screen: { width: 256, height: 224 },
    soundKind: 'dac',
    minimumFps: 10,
  }),
  // The title/high-score sequence ignores inputs until roughly frame 1500.
  // Exercise coin/start only after the real board has reached INSERT COIN.
  frames: 1840,
  checkpoints: [1, 300, 600, 900, 1200, 1500, 1650, 1840],
  actions: [
    { atFrame: 1520, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1550, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1700, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 1800, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'f1e8ba9e',
      decoder_prom: '58d86098',
      gfx1: 'f84d77a9',
      gfx2: '2dbee9db',
      maincpu: 'f3ac4827',
      proms: 'afc9bd41',
      soundrom: '06b9ff85',
    },
    checkpoints: {
      1: { video: '9d7c81cb', state: '78fb7055' },
      300: { video: 'a3913a72', state: '3026ed82' },
      600: { video: '2fe3d933', state: '8d0d272e' },
      900: { video: '026875d1', state: 'b4097b06' },
      1200: { video: 'e7380771', state: '302c1cfd' },
      1500: { video: '080dbf8e', state: '32024970' },
      1650: { video: '080dbf8e', state: 'ee9d8ccf' },
      1840: { video: 'c69c9e03', state: '1a24d8f0' },
    },
    audio: {
      writes: 375780,
      nonzeroWrites: 6260,
      writeHash: 'dc87f993',
      pcmHash: '7ce7ed16',
      rms: 0.99615,
    },
  },
};
