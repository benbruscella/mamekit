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
};
