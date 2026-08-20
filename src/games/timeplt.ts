import type { GameTestContract } from './types.ts';

export const timeplt: GameTestContract = {
  game: 'timeplt',
  category: 'arcade',
  driver: 'src/mame/konami/timeplt.cpp',
  machine: { className: 'timeplt_state', name: 'timeplt' },
  romEnvironment: 'MAMEKIT_TIMEPLT_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  minimumFps: 40,
  checkpoints: [1, 60, 300, 540, 720, 1200],
  actions: [
    { atFrame: 540, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 570, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: 'c8976cae',
      proms: '8dba87f3',
      sprites: '51c0401c',
      tiles: 'c2507f40',
      'timeplt_audio:tpsound': '3142803f',
    },
    checkpoints: {
      1: { video: '43d7f729', state: '43e30c92' },
      60: { video: 'b95a6e16', state: '5efcf53e' },
      300: { video: '958f2475', state: 'cc7d7745' },
      540: { video: '3757fed1', state: 'f6beccc8' },
      720: { video: '96e6f0a2', state: '0fd4fdf5' },
      1200: { video: '7069f4a5', state: 'bcbb05b1' },
    },
    audio: {
      writes: 5831,
      nonzeroWrites: 5556,
      writeHash: 'caa89b22',
      pcmHash: '5d4d27e6',
      rms: 0.028898,
    },
  },
};
