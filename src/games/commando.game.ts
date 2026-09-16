import { sourceTarget } from './source-contract.ts';

export const commando = sourceTarget({
  game: 'commando',
  driver: 'src/mame/capcom/commando.cpp',
  machine: { className: 'commando_state', name: 'commando' },
  screen: { width: 256, height: 224 },
  soundKind: 'ym2203',
  frames: 1800,
  minimumFps: 45,
  checkpoints: [1, 60, 300, 480, 720, 1200, 1800],
  actions: [
    { atFrame: 480, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 540, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 720, code: 'ArrowRight', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 960, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    { atFrame: 1080, code: 'ArrowUp', heldFrames: 180, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: '290adabd',
      chars: '505726e0',
      decrypted_opcodes: '9dd528f3',
      irqprom: '712ac508',
      maincpu: '7d8979c3',
      proms: '57b4c3bf',
      sprites: '7fd45c17',
      tiles: '5883fec2',
    },
    checkpoints: {
      1: { video: '451f9bc6', state: 'ae2b95f0' },
      60: { video: '76e26b49', state: '3b035543' },
      300: { video: '3d80d00d', state: '49a9f546' },
      480: { video: 'a6080a12', state: '9ef76b42' },
      720: { video: '764d21a0', state: 'cb025342' },
      1200: { video: '57c349c8', state: 'd6dc4de2' },
      1800: { video: '764d21a0', state: '9b405351' },
    },
    audio: {
      writes: 312756,
      nonzeroWrites: 167232,
      writeHash: '7b7dd195',
      pcmHash: '70590db6',
      rms: 0.027672,
    },
  },
});
