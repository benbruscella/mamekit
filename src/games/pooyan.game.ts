import { sourceTarget } from './source-contract.ts';

export const pooyan = sourceTarget({
  game: 'pooyan',
  driver: 'src/mame/konami/pooyan.cpp',
  machine: { className: 'pooyan_state', name: 'pooyan' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
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
      1: { video: '74589235', state: 'e803fe50' },
      60: { video: 'e31b647c', state: '689367f6' },
      180: { video: 'ff05b684', state: '8a04aece' },
      300: { video: 'a2d03b71', state: 'c485c0ea' },
      420: { video: 'a326de60', state: '3dfd1b0d' },
      600: { video: '359901e1', state: '5f7556eb' },
    },
    audio: {
      writes: 2295,
      nonzeroWrites: 1976,
      writeHash: '7192f612',
      pcmHash: '76e594f3',
      rms: 0.427559,
    },
  },
});
