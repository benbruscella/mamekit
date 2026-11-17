import { sourceTarget } from './source-contract.ts';

export const mario = {
  ...sourceTarget({
    game: 'mario',
    driver: 'src/mame/nintendo/mario.cpp',
    machine: { className: 'mario_state', name: 'mario' },
    screen: { width: 256, height: 224 },
    soundKind: 'stream',
    minimumFps: 10,
  }),
  // The title/high-score sequence ignores inputs until roughly frame 1500.
  // Exercise coin/start only after the real board has reached INSERT COIN.
  // The coin is a 4-frame pulse: this revision rejects a coin switch held
  // for 10 (MAME too), so the game never started and the netlist was never
  // written. Started, the phase intro writes SOUND7 (the skid one-shot).
  frames: 1840,
  checkpoints: [1, 300, 600, 900, 1200, 1500, 1650, 1840],
  actions: [
    { atFrame: 1520, code: 'Digit5', heldFrames: 4, releasedFrames: 20 },
    { atFrame: 1550, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 1700, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 1800, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '2144064d',
      decoder_prom: '58d86098',
      gfx1: 'f84d77a9',
      gfx2: '2dbee9db',
      maincpu: 'f3ac4827',
      proms: 'afc9bd41',
      soundrom: '06b9ff85',
    },
    checkpoints: {
      1: { video: '9d7c81cb', state: '7e90038f' },
      300: { video: 'a3913a72', state: '48d361c5' },
      600: { video: '2fe3d933', state: '1f75408b' },
      900: { video: '026875d1', state: '24080e55' },
      1200: { video: 'e7380771', state: '7da55db6' },
      1500: { video: '080dbf8e', state: 'ea830d34' },
      1650: { video: '267fe7a7', state: '224cf64f' },
      1840: { video: '22b59f23', state: 'eaebd557' },
    },
    audio: {
      writes: 1492254,
      nonzeroWrites: 1492244,
      writeHash: '585d816d',
      pcmHash: '6e28f95e',
      rms: 0.062301,
    },
  },
};
