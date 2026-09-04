import { sourceTarget } from './source-contract.ts';

export const travrusa = sourceTarget({
  game: 'travrusa',
  driver: 'src/mame/irem/travrusa.cpp',
  machine: { className: 'travrusa_state', name: 'travrusa' },
  screen: { width: 240, height: 256 },
  soundKind: 'ay8910',
  frames: 1800,
  minimumFps: 40,
  checkpoints: [1, 120, 300, 600, 900, 1200, 1500, 1800],
  actions: [
    { atFrame: 600, code: 'Digit5', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 640, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
    { atFrame: 900, code: 'KeyZ', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1020, code: 'Space', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 1140, code: 'ArrowLeft', heldFrames: 40, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'irem_audio:iremsound': '66292417',
      maincpu: 'e744a481',
      proms: '027edbe8',
      sprites: '4b5d9c81',
      tiles: 'd5ba7b9c',
    },
    checkpoints: {
      1: { video: '07673647', state: '76c66adc' },
      120: { video: '3758d352', state: '271872d6' },
      300: { video: '9657c3e0', state: 'b70357bc' },
      600: { video: '52108858', state: '1986ad06' },
      900: { video: '9dae3c3b', state: '7737fddb' },
      1200: { video: '08a7c7f1', state: '51ecf905' },
      1500: { video: '14eb4605', state: 'ad7a8e96' },
      1800: { video: '3d98ec3a', state: 'f17de39d' },
    },
    audio: {
      writes: 421992,
      nonzeroWrites: 418145,
      writeHash: '1c61e334',
      pcmHash: '4e68cbce',
      rms: 0.169532,
    },
  },
});
