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
      1: { video: '07673647', state: 'ca1cc0c0' },
      120: { video: '3758d352', state: 'c0ff3a1d' },
      300: { video: '9657c3e0', state: '7a21893b' },
      600: { video: 'aba5e36e', state: 'db32454a' },
      900: { video: '9dae3c3b', state: '8ae7c15c' },
      1200: { video: 'bffea737', state: 'ff32878c' },
      1500: { video: '9446f238', state: '4505b564' },
      1800: { video: '3f7d5d49', state: 'eb8b3743' },
    },
    audio: {
      writes: 421992,
      nonzeroWrites: 418145,
      writeHash: '0dd2700d',
      pcmHash: '1c5ca07e',
      rms: 0.05748,
    },
  },
};
