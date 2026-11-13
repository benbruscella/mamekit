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
    soundKind: 'stream',
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
        1: { video: '73d1614e', state: '33c8d56d' },
        60: { video: '4ade275a', state: '6ae5090f' },
        300: { video: '4ade275a', state: 'dbaa59a1' },
        900: { video: '0fbfe2f7', state: '8502b4ef' },
        1200: { video: '0fbfe2f7', state: '8df9d9ea' },
        1500: { video: 'f05eed18', state: 'd8dca25c' },
        1800: { video: '625544e7', state: '55ff7313' },
      },
      audio: {
        writes: 1441856,
        nonzeroWrites: 215406,
        writeHash: '92a49e07',
        pcmHash: '5608ec26',
        rms: 0.046803,
      },
    },
  }],
} satisfies MachineTargetContract;
