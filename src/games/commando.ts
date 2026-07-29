import type { GameTestContract } from './types.ts';

export const commando: GameTestContract = {
  game: 'commando',
  category: 'arcade',
  driver: 'src/mame/capcom/commando.cpp',
  machine: { className: 'commando_state', name: 'commando' },
  romEnvironment: 'MAMEKIT_COMMANDO_ROM',
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
      1: { video: '451f9bc6', state: 'e824bcb0' },
      60: { video: '26339a07', state: '729a797d' },
      300: { video: '07af9e59', state: 'b85a1cd4' },
      480: { video: '898a3190', state: '13b50ea2' },
      720: { video: '764d21a0', state: 'cafc551f' },
      1200: { video: '57c349c8', state: '7feec4c9' },
      1800: { video: '764d21a0', state: 'fb780301' },
    },
    audio: {
      writes: 1_921_360,
      nonzeroWrites: 973_438,
      writeHash: 'b74be794',
      pcmHash: '4e219365',
      rms: 0.097695,
    },
  },
};
