// DISABLED: this target is not discovered, generated or shipped.
//
// Parked by issue #53 on play-test evidence; re-examined for issue #108,
// which is where the measurements below come from.
//
// The V30 runs but the game never reaches its video setup.
//
// Measured 2026-08-31: the main CPU spins at CS:IP 3F00:0837 from frame 9
// onward with IF clear, videoram[0], videoram[1] and both palette RAMs
// stay entirely zero for 1200 frames, and the screen is black throughout.
// The sound Z80 stops at PC 0 after ~557k cycles even though the main CPU
// did upload its program (soundram is 65280/65536 nonzero), which points at
// the port 02 sound-CPU reset line or the upd71059c PIC handshake rather
// than at the video path.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const rtype = sourceTarget({
  game: 'rtype',
  driver: 'src/mame/irem/m72.cpp',
  machine: { className: 'm72_state', name: 'rtype' },
  screen: { width: 384, height: 256 },
  soundKind: 'ym2151',
});
