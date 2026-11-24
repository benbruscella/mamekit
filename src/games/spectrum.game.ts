import type { MachineTargetContract } from "./types.ts";

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
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'accepted', softwareLists: ['spectrum_cart'] },
      { kind: 'quickload', status: 'planned' },
      { kind: 'cassette', status: 'accepted', softwareLists: ['spectrum_cass'] },
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
        1: { video: '4ef8340c', state: '193331aa' },
        150: { video: '16576873', state: '67bb86fc' },
        300: { video: '18158f85', state: 'e8e5219a' },
        400: { video: '18158f85', state: '0c5f37aa' },
        600: { video: '18158f85', state: '897be1a2' },
      },
      audio: {
        writes: 575078,
        nonzeroWrites: 429149,
        writeHash: '86e75301',
        pcmHash: '8d2e04bc',
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
        1: { video: '4ef8340c', state: '193331aa' },
        300: { video: '1a718cf8', state: 'e8e5219a' },
        1200: { video: 'f25a276a', state: '608611e4' },
        6000: { video: 'f7eeaefb', state: 'a970f672' },
        11000: { video: '3988ec74', state: '11167c63' },
        12000: { video: '2c06353a', state: '7b2c2c97' },
      },
      audio: {
        writes: 11501568,
        nonzeroWrites: 11354680,
        writeHash: 'bd2cf6f7',
        pcmHash: '9ec63b98',
        rms: 0.054878,
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
        'exp:intf2:cartslot:rom': '1d194e5b',
        maincpu: '2e48b587',
      },
      checkpoints: {
        1: { video: '4ef8340c', state: '193331aa' },
        150: { video: '76459e9e', state: 'ea6d3a53' },
        300: { video: '76459e9e', state: '65339d35' },
        450: { video: 'aa517170', state: '23306c41' },
        600: { video: '11cb39b0', state: '897be1a2' },
        900: { video: 'e37c82e9', state: 'f78df390' },
      },
      audio: {
        writes: 862617,
        nonzeroWrites: 270268,
        writeHash: '2ac2e73e',
        pcmHash: '580d76b4',
        rms: 0.006373,
      },
    },
  }],
} satisfies MachineTargetContract;
