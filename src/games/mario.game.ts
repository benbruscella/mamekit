import { sourceTarget } from './source-contract.ts';

export const mario = {
  ...sourceTarget({
    game: 'mario',
    // Bounded closure gaps covered by this target's real-ROM acceptance.
    runtimeCoverage: {
      generationGaps: [
        'snd_nl:dac:NETLIST_INT_INPUT',
      ],
      handlerGaps: [],
    },
    driver: 'src/mame/nintendo/mario.cpp',
    machine: { className: 'mario_state', name: 'mario' },
    screen: { width: 256, height: 224 },
    soundKind: 'none',
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
      audiocpu: '2144064d',
      decoder_prom: '58d86098',
      gfx1: 'f84d77a9',
      gfx2: '2dbee9db',
      maincpu: 'f3ac4827',
      proms: 'afc9bd41',
      soundrom: '06b9ff85',
    },
    checkpoints: {
      1: { video: '9d7c81cb', state: '266d55dc' },
      300: { video: 'a3913a72', state: '187ba866' },
      600: { video: '2fe3d933', state: '2dcab726' },
      900: { video: '026875d1', state: '86538cfe' },
      1200: { video: 'e7380771', state: '68f5fb57' },
      1500: { video: '080dbf8e', state: '5b5c7f92' },
      1650: { video: '080dbf8e', state: '3f1d9b6f' },
      1840: { video: 'c69c9e03', state: 'a05e3aff' },
    },
    audio: {
      writes: 375844,
      nonzeroWrites: 0,
      writeHash: 'b7d6141a',
      pcmHash: 'feedb43f',
      rms: 1,
    },
  },
};
