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
      1: { video: '43d7f729', state: '6fc54ad3' },
      60: { video: 'b95a6e16', state: '2c4485a8' },
      300: { video: '958f2475', state: '427df12f' },
      540: { video: '3757fed1', state: '2a7a7980' },
      720: { video: 'fa28120a', state: '0103c6d1' },
      1200: { video: 'a420bb8b', state: '0b5e3dfa' },
    },
    audio: {
      writes: 960000,
      nonzeroWrites: 959999,
      writeHash: '4b36b911',
      pcmHash: 'd82f0423',
      rms: 0.41716,
    },
  },
});
