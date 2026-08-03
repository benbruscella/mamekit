import { sourceTarget } from './source-contract.ts';

export const mario = sourceTarget({
  game: 'mario',
  driver: 'src/mame/nintendo/mario.cpp',
  machine: { className: 'mario_state', name: 'mario' },
  screen: { width: 256, height: 224 },
  soundKind: 'none',
});
