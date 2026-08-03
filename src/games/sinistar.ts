import { sourceTarget } from './source-contract.ts';

export const sinistar = sourceTarget({
  game: 'sinistar',
  driver: 'src/mame/williams/williams.cpp',
  machine: { className: 'williams_state', name: 'sinistar_upright' },
  screen: { width: 292, height: 240 },
  soundKind: 'none',
});
