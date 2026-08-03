import { sourceTarget } from './source-contract.ts';

export const polepos = sourceTarget({
  game: 'polepos',
  driver: 'src/mame/namco/polepos.cpp',
  machine: { className: 'polepos_state', name: 'polepos' },
  screen: { width: 256, height: 224 },
  soundKind: 'discrete',
});
