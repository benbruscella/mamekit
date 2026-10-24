import type { MachineTargetContract } from './types.ts';

/** The Atari 2600, accepted against Combat. */
export const a2600 = {
  target: {
    game: 'a2600',
    category: 'consoles',
    driver: 'src/mame/atari/a2600.cpp',
    machine: { className: 'a2600_state', name: 'a2600' },
    screen: { width: 176, height: 223 },
    soundKind: 'tia',
    media: [{ kind: 'cartridge', status: 'accepted', softwareLists: ['a2600'] }],
  },
  scenarios: [{
    id: 'combat',
    kind: 'gameplay',
    cartridge: 'combat',
    romEnvironment: 'MAMEKIT_A2600_ROM',
    frames: 1200,
    minimumFps: 30,
    checkpoints: [1, 60, 180, 300, 600, 900, 1200],
    actions: [
      { atFrame: 120, code: 'Digit2', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 200, code: 'ArrowUp', heldFrames: 120, releasedFrames: 20 },
      { atFrame: 360, code: 'Space', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 420, code: 'ArrowLeft', heldFrames: 60, releasedFrames: 20 },
      { atFrame: 520, code: 'ArrowUp', heldFrames: 200, releasedFrames: 20 },
      { atFrame: 760, code: 'Space', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 800, code: 'ArrowRight', heldFrames: 60, releasedFrames: 20 },
      { atFrame: 900, code: 'ArrowUp', heldFrames: 250, releasedFrames: 20 },
    ],
    golden: {
      regions: {
        'cartslot:cart:rom': '9c326a97',
        maincpu: 'b4293435',
      },
      checkpoints: {
        1: { video: 'aef9d7bc', state: 'a37f9d03' },
        60: { video: '5c592eb1', state: 'b4854bdc' },
        180: { video: '0890f0cb', state: 'a9b94308' },
        300: { video: '93a32d9e', state: '9b353dc1' },
        600: { video: '8a10750c', state: '6fabd3a6' },
        900: { video: '6d2a0bfc', state: 'e2e84268' },
        1200: { video: 'eaa0f162', state: 'ba58b5fc' },
      },
      audio: {
        writes: 628830,
        nonzeroWrites: 405045,
        writeHash: '86f93249',
        pcmHash: '72c68877',
        rms: 0.303098,
      },
    },
  }],
} satisfies MachineTargetContract;
