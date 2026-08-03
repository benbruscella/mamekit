import { sourceTarget } from './source-contract.ts';

export const defender = sourceTarget({
  game: 'defender',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'defender_state', name: 'defender' },
  screen: { width: 292, height: 240 },
  soundKind: 'none',
});
