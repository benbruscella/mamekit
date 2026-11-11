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
        1: { video: '73d1614e', state: '4d186660' },
        60: { video: '4ade275a', state: '930bedcc' },
        300: { video: '4ade275a', state: '8cc84879' },
        900: { video: '0fbfe2f7', state: 'fd7e94ec' },
        1200: { video: '0fbfe2f7', state: 'e997cf60' },
        1500: { video: 'fee95237', state: 'e00d7097' },
        1800: { video: 'e650ccd7', state: '4ea19fcb' },
      },
      audio: {
        writes: 1441856,
        nonzeroWrites: 215093,
        writeHash: '4b4a3196',
        pcmHash: 'bd8001eb',
        rms: 0.046675,
      },
    },
  }],
} satisfies MachineTargetContract;
