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
      120: { video: '3758d352', state: '45594806' },
      300: { video: '9657c3e0', state: '375e5224' },
      600: { video: '52108858', state: '57c2806e' },
      900: { video: '9dae3c3b', state: '877cc7d1' },
      1200: { video: '08a7c7f1', state: 'f76d2bbf' },
      1500: { video: '14eb4605', state: '39468bde' },
      1800: { video: '3d98ec3a', state: 'b15cde9f' },
    },
    audio: {
      writes: 421998,
      nonzeroWrites: 418152,
      writeHash: '7a4b5586',
      pcmHash: '262b5d6a',
      rms: 0.169506,
    },
  },
});
