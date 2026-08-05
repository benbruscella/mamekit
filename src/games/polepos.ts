import { sourceTarget } from './source-contract.ts';

export const polepos = sourceTarget({
  game: 'polepos',
  driver: 'src/mame/namco/polepos.cpp',
  machine: { className: 'polepos_state', name: 'polepos' },
  screen: { width: 256, height: 224 },
  soundKind: 'wsg',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyC', heldFrames: 30, releasedFrames: 20 },
  ],
});
