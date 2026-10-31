import { sourceTarget } from './source-contract.ts';

export const timeplt = sourceTarget({
  game: 'timeplt',
  driver: 'src/mame/konami/timeplt.cpp',
  machine: { className: 'timeplt_state', name: 'timeplt' },
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
      300: { video: '958f2475', state: 'f1c39dba' },
      540: { video: '3757fed1', state: '61e17559' },
      720: { video: 'fa28120a', state: '913bbfb9' },
      1200: { video: 'a420bb8b', state: '9567766e' },
    },
    audio: {
      writes: 5823,
      nonzeroWrites: 5549,
      writeHash: 'e145bfce',
      pcmHash: '20690a6f',
      rms: 0.028219,
    },
  },
});
