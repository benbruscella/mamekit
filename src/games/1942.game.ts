import type { GameTestContract } from './types.ts';

export const _1942: GameTestContract = {
  game: '1942',
  category: 'arcade',
  driver: 'src/mame/capcom/1942.cpp',
  machine: { className: '_1942_state', name: '_1942' },
  romEnvironment: 'MAMEKIT_1942_ROM',
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  frames: 1200,
  // MAME's 1942 sprite renderer is per-scanline: 224 scanlines x 24 sprite
  // entries, so this board executes far more handler IR per frame than any
  // other accepted target and remains the slowest. Issue #66 moved the common
  // paths onto compiled execution; the floor tracks that with host-load
  // headroom rather than the measured rate.
  minimumFps: 20,
  checkpoints: [1, 60, 180, 300, 600, 900, 1200],
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      audiocpu: 'f56571ad',
      charprom: '6047d91b',
      gfx1: '6ebca191',
      gfx2: '917a183d',
      gfx3: 'f163b86e',
      irqprom: '712ac508',
      maincpu: 'b796b7bb',
      palproms: 'a3c037d4',
      proms: '6ee58906',
      sprprom: 'f6fad943',
      tileprom: '4858968d',
    },
    checkpoints: {
      1: { video: 'a4f19f78', state: '94fda8e0' },
      60: { video: '0af93413', state: '48747488' },
      180: { video: '4473cda5', state: 'a6f7d0f7' },
      300: { video: 'ad8015e1', state: 'c3d5405d' },
      600: { video: '11f682da', state: '0f53339d' },
      900: { video: '4f785ed3', state: '0d58c942' },
      1200: { video: 'b1fd4e87', state: 'e8442785' },
    },
    audio: {
      writes: 53613,
      nonzeroWrites: 32748,
      writeHash: '737473dc',
      pcmHash: '6b427d4c',
      rms: 0.048245,
    },
  },
};

// ECMAScript string-named export: discovery keys contracts by MAME short name,
// including numeric names that cannot be JavaScript identifiers.
export { _1942 as '1942' };
