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
  // Bounded closure gaps covered by this target's real-ROM acceptance.
  runtimeCoverage: {
    generationGaps: [
      'r1sound:GOTTLIEB_SOUND_SPEECH_REV1A',
      'votrax:VOTRAX_SC01',
    ],
    handlerGaps: [],
  },
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
      1: { video: '07673647', state: 'c41ee30d' },
      60: { video: 'ddedbe80', state: '33f0634e' },
      180: { video: '7e8de1b3', state: '95adb856' },
      300: { video: '82e9e3bc', state: 'fde469e6' },
      600: { video: 'c2eb9b01', state: '9c6ea659' },
      900: { video: '9a5e79f5', state: 'b4bdc9fe' },
      1200: { video: '7837d08c', state: '96911eb3' },
    },
    audio: {
      writes: 969261,
      nonzeroWrites: 26941,
      writeHash: 'f2955deb',
      pcmHash: '6554d415',
      rms: 0.133967,
    },
  },
});
