import { sourceTarget } from './source-contract.ts';

export const timeplt = sourceTarget({
  game: 'timeplt',
  driver: 'src/mame/konami/timeplt.cpp',
  machine: { className: 'timeplt_state', name: 'timeplt' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '43d7f729', state: 'a4d8a117' },
      60: { video: 'b95a6e16', state: '2ca5d25f' },
      300: { video: '958f2475', state: 'e1a17819' },
      540: { video: '3757fed1', state: 'd172931a' },
      720: { video: 'fa28120a', state: '4fb35b1f' },
      1200: { video: 'a420bb8b', state: '83ef75ce' },
    },
    audio: {
      writes: 960001,
      nonzeroWrites: 960000,
      writeHash: 'bb23a6ae',
      pcmHash: 'd82f0423',
      rms: 0.41716,
    },
  },
});
