import type { GameTestContract } from './types.ts';

export const travrusa: GameTestContract = {
  game: 'travrusa',
  category: 'arcade',
  driver: 'src/mame/irem/travrusa.cpp',
  machine: { className: 'travrusa_state', name: 'travrusa' },
  romEnvironment: 'MAMEKIT_TRAVRUSA_ROM',
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
      '1': { video: '07673647', state: '25b8ee5c' },
      '120': { video: '3758d352', state: '8f6ef9d5' },
      '300': { video: '9657c3e0', state: '3dade1b2' },
      '600': { video: 'aba5e36e', state: '1ffed69d' },
      '900': { video: '9dae3c3b', state: '9d05fe00' },
      '1200': { video: '6b06a5fc', state: '62813256' },
      '1500': { video: 'c26a4090', state: '41d0705c' },
      '1800': { video: 'd83b74ac', state: 'bbb53452' },
    },
    audio: {
      writes: 628104,
      nonzeroWrites: 622539,
      writeHash: '2e96a758',
      pcmHash: 'bb0e35cd',
      rms: 0.057486,
    },
  },
};
