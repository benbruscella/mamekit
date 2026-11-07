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
      1: { video: '74589235', state: '3fffe66d' },
      60: { video: 'e31b647c', state: '426a178a' },
      180: { video: 'ff05b684', state: '1126f2d2' },
      300: { video: 'a2d03b71', state: '959eb1eb' },
      420: { video: 'a326de60', state: 'c3e2cdfd' },
      600: { video: '359901e1', state: '7b625be0' },
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
