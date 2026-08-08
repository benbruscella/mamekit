import type { GameTestContract } from './types.ts';

export const upndown: GameTestContract = {
  game: 'upndown',
  category: 'arcade',
  driver: 'src/mame/sega/system1.cpp',
  machine: { className: 'system1_state', name: 'upndown' },
  romEnvironment: 'MAMEKIT_UPNDOWN_ROM',
  screen: { width: 512, height: 224 },
  soundKind: 'sn76489',
  frames: 1200,
  minimumFps: 30,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 5, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowUp', heldFrames: 180, releasedFrames: 20 },
    { atFrame: 820, code: 'Space', heldFrames: 20, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      decrypted_opcodes: '85b8cb0e',
      lookup_proms: '648350b8',
      maincpu: 'b58d499c',
      soundcpu: '43b2b9a5',
      sprites: '090c5e7e',
      tiles: 'd46776a7',
    },
    checkpoints: {
      '1': { video: '82cad202', state: '91facd9f' },
      '60': { video: '3b94439d', state: '05c9c829' },
      '180': { video: '3f561462', state: '731ed192' },
      '300': { video: '8c79548f', state: 'ed13c53d' },
      '600': { video: '22517469', state: '00c0d4ad' },
      '900': { video: '82cad202', state: '8cc913da' },
      '1200': { video: '7e77c473', state: 'd98f0a59' },
    },
    audio: {
      writes: 29347,
      nonzeroWrites: 29347,
      writeHash: '97d08628',
      pcmHash: '10caaeff',
      rms: 0.050779,
    },
  },
};
