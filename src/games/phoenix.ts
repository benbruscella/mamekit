import { sourceTarget } from './source-contract.ts';

export const phoenix = sourceTarget({
  game: 'phoenix',
  driver: 'src/mame/phoenix/phoenix.cpp',
  machine: { className: 'phoenix_state', name: 'phoenix' },
  screen: { width: 256, height: 208 },
  soundKind: 'discrete',
});
