// DISABLED: this target is not discovered, generated or shipped.
//
// Parked by issue #53 on play-test evidence; re-examined for issue #108,
// which is where the measurements below come from.
//
// Blocked on Sega 16-bit video and PCM hardware, not on the driver.
// Composition fails to construct at all: fourteen 315-5218 PCM handlers
// (pcm.voice_*) are unresolved, and the report also lists i8255,
// SEGA_315_5195_MEM_MAPPER, SEGAIC16_ROAD, SEGAIC16VID and
// SEGA_OUTRUN_SPRITES as generation gaps. Re-check when those five device
// families exist; the driver itself already lowers cleanly.
//
// Move this module and its spec back up to src/games/ to re-enable the
// target once the fault is fixed.

import { sourceTarget } from '../source-contract.ts';

export const outrun = sourceTarget({
  game: 'outrun',
  driver: 'src/mame/sega/segaorun.cpp',
  machine: { className: 'segaorun_state', name: 'outrun' },
  screen: { width: 320, height: 224 },
  soundKind: 'ym2151',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 780, code: 'KeyC', heldFrames: 30, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      gfx1: 'efc8fd91',
      maincpu: '06982bc0',
      pcm: '56dfd68e',
      segaic16road: '0a5f6c05',
      soundcpu: '186fa06c',
      sprites: '14827157',
      subcpu: 'f3be74e2',
    },
    checkpoints: {
      1: { video: '2aa9b3cc', state: '0cf11029' },
      60: { video: '4dd3b775', state: 'db62fe94' },
      180: { video: 'febab99d', state: '777cd12f' },
      300: { video: '4f4e3eba', state: '76893568' },
      600: { video: 'b7e1b9a3', state: '154501a4' },
      900: { video: '91eca43a', state: '174004ea' },
      1200: { video: '00e18748', state: '2c340b44' },
    },
    audio: {
      writes: 66690,
      nonzeroWrites: 60968,
      writeHash: '6b048cfa',
      pcmHash: 'c164be0f',
      rms: 0.036885,
    },
  },
});
