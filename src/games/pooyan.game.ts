import { sourceTarget } from './source-contract.ts';

export const pooyan = sourceTarget({
  game: 'pooyan',
  driver: 'src/mame/konami/pooyan.cpp',
  machine: { className: 'pooyan_state', name: 'pooyan' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
  frames: 600,
  minimumFps: 45,
  checkpoints: [1, 60, 180, 300, 420, 600],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      maincpu: '55a9be82',
      proms: '0e619225',
      sprites: '473dea4e',
      tiles: 'b1d2d544',
      'timeplt_audio:tpsound': '0764635f',
    },
    checkpoints: {
      1: { video: '74589235', state: '8433a3bc' },
      60: { video: 'e31b647c', state: '6f35c0dc' },
      180: { video: 'ff05b684', state: 'badfcccd' },
      300: { video: 'a2d03b71', state: '361a6917' },
      420: { video: 'a326de60', state: 'b7807461' },
      600: { video: '359901e1', state: 'c7d8d6a7' },
    },
    audio: {
      writes: 475201,
      nonzeroWrites: 475200,
      writeHash: 'c6ff91f3',
      pcmHash: 'a8bc422d',
      rms: 0.427065,
    },
  },
});
