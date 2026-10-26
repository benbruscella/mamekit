import type { MachineTargetContract } from './types.ts';

/**
 * The ColecoVision, accepted against Donkey Kong on its own BIOS.
 *
 * Its TMS9928A re-arms a line timer against the beam on every scanline, the
 * same pattern that stalled the NES in #155; here it only ever lost the
 * bottom line of the picture.
 */
export const coleco = {
  target: {
    game: 'coleco',
    category: 'consoles',
    driver: 'src/mame/coleco/coleco.cpp',
    machine: { className: 'coleco_state', name: 'coleco' },
    screen: { width: 280, height: 216 },
    soundKind: 'sn76489',
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'accepted', softwareLists: ['coleco'] },
    ],
  },
  scenarios: [{
    id: 'dkong',
    kind: 'gameplay',
    cartridge: 'dkong',
    romEnvironment: 'MAMEKIT_COLECO_ROM',
    frames: 1800,
    minimumFps: 30,
    checkpoints: [1, 60, 300, 900, 1200, 1500, 1800],
    actions: [
      { atFrame: 1260, code: 'Digit1', heldFrames: 10, releasedFrames: 30 },
      { atFrame: 1400, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
    ],
    golden: {
      regions: {
        'coleco_cart:rom': '3c77198c',
        maincpu: '4da89c72',
      },
      checkpoints: {
        1: { video: '73d1614e', state: '7960d822' },
        60: { video: '4ade275a', state: '9bb58198' },
        300: { video: '4ade275a', state: '5be91bc4' },
        900: { video: '0fbfe2f7', state: '07654a61' },
        1200: { video: '0fbfe2f7', state: '044e6ebc' },
        1500: { video: 'f05eed18', state: '6b03f73a' },
        1800: { video: '79e00fcb', state: '19333dd8' },
      },
      audio: {
        writes: 3456,
        nonzeroWrites: 3456,
        writeHash: 'a73ea4d4',
        pcmHash: '482bd4d7',
        rms: 0.046959,
      },
    },
  }],
} satisfies MachineTargetContract;
