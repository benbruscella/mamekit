import { sourceTarget } from './source-contract.ts';

export const sf2ce = sourceTarget({
  game: 'sf2ce',
  driver: 'src/mame/capcom/cps1.cpp',
  machine: { className: 'cps_state', name: 'cps1_12MHz' },
  screen: { width: 384, height: 224 },
  soundKind: 'none',
});
