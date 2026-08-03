import { sourceTarget } from './source-contract.ts';

export const wardner = sourceTarget({
  game: 'wardner',
  driver: 'src/mame/toaplan/wardner.cpp',
  machine: { className: 'wardner_state', name: 'wardner' },
  screen: { width: 320, height: 240 },
  soundKind: 'none',
});
