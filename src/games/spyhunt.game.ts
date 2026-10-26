// Spy Hunter (Bally Midway, 1983). MCR3 "Super Cheap Squeak Deluxe" board.
//
// Its issue-#53 fault -- "a coin is never credited" -- was the test, not the
// machine. Spy Hunter's CMOS initializes to **two coins per credit**, which
// the game's own coin routine enforces at 0x412: a coin is counted into
// 0xf430 and only turns into a credit at 0xf40a once 0xf430 reaches the
// 0xf42b setting. One coin leaves the counter at 1 and the panel at
// CREDITS 0, exactly as observed. Two coins credit and the game plays.
//
// The coin is edge-triggered on release after a stable press, so a tap has to
// be long enough to be seen held and then seen let go.
//
// Most of its panel was also missing. The steering wheel is IPT_PADDLE -- an
// absolute analog control, PORT_MINMAX(0x34,0xb4) centred at 0x74 -- which
// nothing bound, and the shared key map stops at BUTTON3, so the oil slick,
// smoke screen and machine guns had no keys either. All five weapon switches
// and the wheel are now bound and verified against the SSIO port bits.

import { sourceTarget } from "./source-contract.ts";

export const spyhunt = sourceTarget({
  game: 'spyhunt',
  driver: 'src/mame/bally/mcr3.cpp',
  machine: { className: 'mcrsc_csd_state', name: 'spyhunt' },
  screen: { width: 480, height: 480 },
  soundKind: 'ay8910',
  actions: [
    { atFrame: 300, code: 'Digit5', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 340, code: 'Digit5', heldFrames: 20, releasedFrames: 20 },
    { atFrame: 420, code: 'Digit1', heldFrames: 20, releasedFrames: 20 },
    // Accelerate, then steer and fire while still accelerating. Actions may
    // not overlap, so anything held together is one chord.
    { atFrame: 520, code: 'ArrowUp', heldFrames: 150, releasedFrames: 10 },
    { atFrame: 700, codes: ['ArrowUp', 'ArrowRight'], heldFrames: 120, releasedFrames: 10 },
    { atFrame: 850, codes: ['ArrowUp', 'Space'], heldFrames: 100, releasedFrames: 10 },
    { atFrame: 980, codes: ['ArrowUp', 'ArrowLeft'], heldFrames: 120, releasedFrames: 20 },
  ],
  golden: {
    regions: {
      'csd:cpu': '7ce5b22f',
      'csd:pal': '8b401aee',
      gfx1: 'd32f76c8',
      gfx2: '47edff2e',
      gfx3: '936dc87f',
      maincpu: 'ebf34374',
      'ssio:cpu': '66638961',
      'ssio:proms': 'e1281ee9',
    },
    checkpoints: {
      1: { video: '230fe52e', state: 'efef722a' },
      60: { video: '46862ad0', state: 'a58ebca7' },
      180: { video: '537eb4b8', state: '4f29b8e7' },
      300: { video: '11bb1ad5', state: 'b115e9a7' },
      600: { video: 'afb665b8', state: '32ce2789' },
      900: { video: '21bfa458', state: 'effae156' },
      1200: { video: '3bb37d6e', state: 'a94f12e4' },
    },
    audio: {
      writes: 3858,
      nonzeroWrites: 3074,
      writeHash: 'c9bfc974',
      pcmHash: '9585435b',
      rms: 0.033652,
    },
  },
});
