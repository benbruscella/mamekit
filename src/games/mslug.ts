import { sourceTarget } from './source-contract.ts';

export const mslug = sourceTarget({
  game: 'mslug',
  driver: 'src/mame/snk/neogeo.cpp',
  machine: { className: 'mvs_led_state', name: 'neobase' },
  screen: { width: 320, height: 224 },
  soundKind: 'none',
});
