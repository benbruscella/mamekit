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
      1: { video: 'e808ed50', state: '45929b29' },
      300: { video: '3bd56fa2', state: '637c753d' },
      600: { video: 'f5c13508', state: '6874d13a' },
      900: { video: 'b92fbea5', state: '98468270' },
      1200: { video: 'd599f18f', state: '1ab8e4d9' },
      1500: { video: 'e57b1c9a', state: '7bd68bde' },
      1650: { video: 'e57b1c9a', state: 'caa7b5c2' },
      1840: { video: 'cfc85252', state: 'b493e997' },
    },
    audio: {
      writes: 5637347,
      nonzeroWrites: 979306,
      writeHash: '6e9de72c',
      pcmHash: 'e6778499',
      rms: 0.986433,
    },
  },
};
