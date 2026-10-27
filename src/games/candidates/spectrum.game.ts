import type { MachineTargetContract } from '../types.ts';

/**
 * The 48K ZX Spectrum, at BASIC and against a tape and a cartridge started
 * the way the software room's Play starts them (title-start.ts).
 *
 * BASIC takes its keywords by key: `p` in K mode is PRINT, and BEEP is
 * SYMBOL SHIFT+Z in E mode, which CAPS SHIFT and SYMBOL SHIFT together enter
 * and no character types -- so it is a chord, then `:` (SYMBOL SHIFT+Z).
 * Manic Miner is typed `j""` (LOAD "") and loads at the ROM's own speed
 * through the beeper-and-border loader, to its title and music. Jet Pac boots
 * from the ZX Interface 2, which the title's list puts in the expansion port
 * in place of the Kempston joystick.
 */
export const spectrum = {
  target: {
    game: 'spectrum',
    category: 'computers',
    driver: 'src/mame/sinclair/spectrum.cpp',
    machine: { className: 'spectrum_state', name: 'spectrum' },
    screen: { width: 352, height: 296 },
    soundKind: 'stream',
    media: [
      { kind: 'bios', status: 'candidate' },
      { kind: 'cartridge', status: 'candidate', softwareLists: ['spectrum_cart'] },
      { kind: 'quickload', status: 'planned' },
      { kind: 'cassette', status: 'candidate', softwareLists: ['spectrum_cass'] },
    ],
  },
  scenarios: [{
    // PRINT "MAMEKIT", then BEEP 1,0: a second of middle C on the beeper.
    id: 'basic',
    kind: 'keyboard',
    romEnvironment: 'MAMEKIT_SPECTRUM_ROM',
    frames: 600,
    minimumFps: 10,
    checkpoints: [1, 150, 300, 400, 600],
    actions: [
      { atFrame: 150, text: 'p"MAMEKIT"{ENTER}' },
      { atFrame: 300, codes: ['ShiftLeft', 'ShiftRight'], heldFrames: 3, releasedFrames: 3 },
      { atFrame: 310, text: ':1,0{ENTER}' },
    ],
    golden: {
      regions: {
        maincpu: '2e48b587',
      },
      checkpoints: {
        1: { video: '4ef8340c', state: '75d054b6' },
        150: { video: '16576873', state: '67240044' },
        300: { video: '18158f85', state: '24d93f4e' },
        400: { video: '18158f85', state: '6efb8092' },
        600: { video: '18158f85', state: '9fc61799' },
      },
      audio: {
        writes: 575078,
        nonzeroWrites: 429156,
        writeHash: '583a7b74',
        pcmHash: 'ffc64534',
        rms: 0.029811,
      },
    },
  }, {
    // j"" typed at the copyright message, PLAY, the ROM loader's pilot and
    // data stripes, then the title screen and its music.
    id: 'tape',
    kind: 'media',
    software: { list: 'spectrum_cass', name: 'mminer' },
    romEnvironment: 'MAMEKIT_SPECTRUM_ROM',
    frames: 12000,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 6000, 11000, 12000],
    actions: [],
    golden: {
      regions: {
        maincpu: '2e48b587',
      },
      checkpoints: {
        1: { video: '4ef8340c', state: '75d054b6' },
        300: { video: '6e539681', state: '621c5b51' },
        1200: { video: '7d2672a0', state: '974f8d62' },
        6000: { video: '9339d72d', state: '5a7dfbb8' },
        11000: { video: '4fa2b386', state: '083bf36d' },
        12000: { video: '4fa2b386', state: '3ad27f19' },
      },
      audio: {
        writes: 11501568,
        nonzeroWrites: 11501568,
        writeHash: '45f65d5a',
        pcmHash: 'c922111a',
        rms: 0.047968,
      },
    },
  }, {
    // The cartridge's ROM pages over BASIC's: no copyright message, the
    // title (pixel for pixel as MAME 0.289 draws it at frame 300), the menu,
    // 4 for the Interface 2's own joystick and 5 to start.
    id: 'cartridge',
    kind: 'media',
    software: { list: 'spectrum_cart', name: 'jetpac' },
    romEnvironment: 'MAMEKIT_SPECTRUM_ROM',
    frames: 900,
    minimumFps: 10,
    checkpoints: [1, 150, 300, 450, 600, 900],
    actions: [
      { atFrame: 300, text: ' ' },
      { atFrame: 450, text: '4' },
      { atFrame: 480, text: '5' },
    ],
    golden: {
      regions: {
        'exp:intf2:cartslot:cart:rom': '1d194e5b',
        maincpu: '2e48b587',
      },
      checkpoints: {
        1: { video: '4ef8340c', state: '7e946795' },
        150: { video: '76459e9e', state: '0d0ccb31' },
        300: { video: '76459e9e', state: '7c514c62' },
        450: { video: 'aa517170', state: '146f80a9' },
        600: { video: '11cb39b0', state: '3f40ec89' },
        900: { video: '93354e47', state: '666bf0c8' },
      },
      audio: {
        writes: 862617,
        nonzeroWrites: 272186,
        writeHash: 'b5905b9b',
        pcmHash: 'd9bcd11a',
        rms: 0.006668,
      },
    },
  }],
} satisfies MachineTargetContract;
