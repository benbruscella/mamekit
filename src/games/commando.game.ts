import { sourceTarget } from './source-contract.ts';

export const commando = sourceTarget({
  game: 'commando',
  driver: 'src/mame/capcom/commando.cpp',
  machine: { className: 'commando_state', name: 'commando' },
  screen: { width: 256, height: 224 },
  soundKind: 'stream',
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
      1: { video: '451f9bc6', state: '2da90bb1' },
      60: { video: '76e26b49', state: '94d086d8' },
      300: { video: '3d80d00d', state: '7c35fb8d' },
      480: { video: 'a6080a12', state: '8cc185b3' },
      720: { video: '764d21a0', state: 'fdd321b2' },
      1200: { video: '57c349c8', state: '9d824d62' },
      1800: { video: '764d21a0', state: '978b2076' },
    },
    audio: {
      writes: 1448755,
      nonzeroWrites: 221860,
      writeHash: '4351adbf',
      pcmHash: 'c21bb3f8',
      rms: 0.025368,
    },
  },
});
