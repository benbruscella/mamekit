import { sourceTarget } from './source-contract.ts';

export const mario = {
  ...sourceTarget({
    game: 'mario',
    // Bounded closure gaps covered by this target's real-ROM acceptance.
    runtimeCoverage: {
      generationGaps: [
        'snd_nl:dac:NETLIST_INT_INPUT',
        'z80dma:Z80DMA',
      ],
      handlerGaps: [
        'z80dma.read',
        'z80dma.write',
      ],
    },
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
      1: { video: '9d7c81cb', state: '82d6997a' },
      300: { video: 'a3913a72', state: 'a7894d8c' },
      600: { video: '2fe3d933', state: '48af0552' },
      900: { video: '026875d1', state: '92333ef6' },
      1200: { video: 'e7380771', state: '2ca3ddc3' },
      1500: { video: '080dbf8e', state: 'bfec6fb3' },
      1650: { video: '080dbf8e', state: '4cef68d7' },
      1840: { video: 'c69c9e03', state: 'a6804b62' },
    },
    audio: {
      writes: 375781,
      nonzeroWrites: 6260,
      writeHash: '668182e3',
      pcmHash: '60313bd7',
      rms: 0.99615,
    },
  },
};
