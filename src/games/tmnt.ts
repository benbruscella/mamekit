import { sourceTarget } from './source-contract.ts';

export const tmnt = sourceTarget({
  game: 'tmnt',
  driver: 'src/mame/konami/tmnt.cpp',
  machine: { className: 'tmnt_state', name: 'tmnt' },
  screen: { width: 320, height: 224 },
  soundKind: 'none',
});
