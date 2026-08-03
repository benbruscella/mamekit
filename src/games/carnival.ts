import { sourceTarget } from './source-contract.ts';

export const carnival = sourceTarget({
  game: 'carnival',
  driver: 'src/mame/sega/vicdual.cpp',
  machine: { className: 'carnival_state', name: 'carnival' },
  screen: { width: 256, height: 224 },
  soundKind: 'ay8910',
  golden: {
    regions: {
      audiocpu: '0dbaa2b0',
      maincpu: 'ad236ab1',
      proms: 'f0084d80',
      user1: '9617d796',
    },
    checkpoints: {
      1: { video: 'f7e6ac81', state: '56e415a5' },
      60: { video: '04aa26ef', state: '4bdc02d0' },
      180: { video: '348ccc14', state: 'd024f0ab' },
      300: { video: '348ccc14', state: 'fd2b24b1' },
      600: { video: '348ccc14', state: '76559d02' },
      900: { video: '348ccc14', state: 'fedd77b8' },
      1200: { video: '348ccc14', state: '0476c626' },
    },
    audio: {
      writes: 11863,
      nonzeroWrites: 7246,
      writeHash: 'f1ae42f6',
      pcmHash: 'b0818880',
      rms: 0.220024,
    },
  },
});
