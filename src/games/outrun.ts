import { sourceTarget } from './source-contract.ts';

export const outrun = sourceTarget({
  game: 'outrun',
  driver: 'src/mame/sega/segaorun.cpp',
  machine: { className: 'segaorun_state', name: 'outrun' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyC', heldFrames: 30, releasedFrames: 20 },
  ],
});
