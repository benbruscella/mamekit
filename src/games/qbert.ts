// Re-enabled for issue #108, after issue #53 parked it as "can't start".
//
// Two I8088 core faults kept it in attract. SF was computed from an unsigned
// wrap, so every signed byte comparison took the wrong arm and the coin
// routine never credited; and 0xd2/0xd3 -- shift and rotate by CL, which MAME
// keeps in execute_run rather than common_op -- were not lowered at all, so
// the opcode byte was consumed without its ModRM and every instruction after
// a shift decoded from the wrong offset.
//
// Verified against MAME 0.289 in attract mode with no input at all: 0
// differing pixels out of 61440 at frames 300, 600 and 900.

import { sourceTarget } from './source-contract.ts';

export const qbert = sourceTarget({
  game: 'qbert',
  driver: 'src/mame/gottlieb/gottlieb.cpp',
  machine: { className: 'gottlieb_state', name: 'qbert' },
  screen: { width: 256, height: 240 },
  soundKind: 'dac',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
    { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      bgtiles: '365a875e',
      maincpu: 'be0a0530',
      'r1sound:audiocpu': 'a20d1420',
      sprites: 'd8a2b040',
    },
    checkpoints: {
      1: { video: '07673647', state: '0d696d4c' },
      60: { video: 'ddedbe80', state: '70c6777f' },
      180: { video: '7e8de1b3', state: '4009027f' },
      300: { video: '82e9e3bc', state: '035c41ed' },
      600: { video: 'c2eb9b01', state: 'c0e562ce' },
      900: { video: '229a0ce1', state: '84aae321' },
      1200: { video: '244968c2', state: 'c81e7a7e' },
    },
    audio: {
      writes: 31372,
      nonzeroWrites: 26883,
      writeHash: 'e176e279',
      pcmHash: 'fb9a70e2',
      rms: 0.535716,
    },
  },
});
