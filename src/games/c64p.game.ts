import type { MachineTargetContract } from './types.ts';

/**
 * The PAL Commodore 64, accepted at BASIC and against a tape and a disk
 * started the way the software room's Play starts them (title-start.ts).
 *
 * Crazy Comets is the tape because it found a bug: with PLAY pressed on one
 * frame in eight the KERNAL misframed its program block (`?LOAD ERROR`) where
 * MAME 0.289 loads it at every phase. Device timers fired before the CIAs were
 * clocked through the instruction, so the datassette's FLAG interrupt asserted
 * a few cycles early (issue #161). Bounty Bob Strikes Back is an original
 * `.g64` with its own fast loader, so the disk scenario runs the 1541's GCR
 * path and a loader the KERNAL never sees.
 */
export const c64p = {
  target: {
    game: 'c64p',
    category: 'computers',
    driver: 'src/mame/commodore/c64.cpp',
    machine: { className: 'c64_state', name: 'pal' },
    screen: { width: 403, height: 284 },
    soundKind: 'stream',
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'accepted', softwareLists: ['c64_cart', 'vic10'] },
      { kind: 'quickload', status: 'accepted', softwareLists: ['c64_quik'] },
      { kind: 'cassette', status: 'accepted', softwareLists: ['c64_cass'] },
      { kind: 'floppy', status: 'accepted', softwareLists: ['c64_flop_orig', 'c64_flop_misc'] },
    ],
  },
  scenarios: [{
    // BASIC through the natural keyboard: a held SID note, then the 10 PRINT
    // maze, whose RND is seeded the same at every power-on.
    id: 'basic',
    kind: 'keyboard',
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 1200,
    minimumFps: 10,
    checkpoints: [1, 60, 180, 300, 600, 900, 1200],
    actions: [{
      atFrame: 150,
      text: 'POKE54296,15:POKE54278,240:POKE54273,30:POKE54276,17{ENTER}' +
        '10 PRINTCHR$(205.5+RND(1));:GOTO10{ENTER}RUN{ENTER}',
    }],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        'iec8:c1541:ucd5': '2abdc483',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '19a076a7', state: '6e1bcb14' },
        60: { video: '19a076a7', state: 'd8c6d6f8' },
        180: { video: '25be4308', state: '471be54f' },
        300: { video: '4588160f', state: 'f8deedef' },
        600: { video: '1414eabc', state: '32901a76' },
        900: { video: 'b2303773', state: '22a33028' },
        1200: { video: 'ade44655', state: '7c1b2126' },
      },
      audio: {
        writes: 1149137,
        nonzeroWrites: 1149137,
        writeHash: '4b33a96f',
        pcmHash: 'eb1a3688',
        rms: 0.46087,
      },
    },
  }, {
    // LOAD and RUN typed at PRESS PLAY ON TAPE, PLAY, the KERNAL load (the
    // tape stops at 52.56 s, as in MAME), then the title and its music.
    id: 'tape',
    kind: 'media',
    software: { list: 'c64_cass', name: 'crazycom' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 4500,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2400, 3600, 4200, 4500],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '19a076a7', state: 'fe495c5c' },
        300: { video: '18afdc8d', state: '28b028de' },
        1200: { video: '0cdaed36', state: '5fd5afa6' },
        2400: { video: '0cdaed36', state: '2c4459c6' },
        3600: { video: '0cdaed36', state: '05e8afb0' },
        4200: { video: '9412c76b', state: 'cc186b90' },
        4500: { video: '9412c76b', state: 'ca9db1e1' },
      },
      audio: {
        writes: 4309264,
        nonzeroWrites: 4309264,
        writeHash: 'a83e57fb',
        pcmHash: '72399096',
        rms: 0.5,
      },
    },
  }, {
    // LOAD"*",8,1 and RUN; the title's own loader counts its code segments
    // down (frame 2250), then the title screen (by frame 2500). The 1541
    // runs in lockstep the whole way, which makes this the slowest contract.
    id: 'disk',
    kind: 'media',
    software: { list: 'c64_flop_orig', name: 'bbsb' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 2600,
    // CPUs compiled whole from MAME (#249): CI measured 9.9 fps against the
    // floor of 10 (issue #247, 5.2).
    minimumFps: 8,
    checkpoints: [1, 300, 1200, 2250, 2500, 2600],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        'iec8:c1541:ucd5': '2abdc483',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '19a076a7', state: '6e1bcb14' },
        300: { video: '803d484b', state: '44f158d1' },
        1200: { video: 'a3e6b335', state: '5c0a9e56' },
        2250: { video: 'ca7ed7b0', state: '2d64c367' },
        2500: { video: '1cc6cabc', state: 'd03e495b' },
        2600: { video: 'b21c9afe', state: '4e88ce1a' },
      },
      audio: {
        writes: 2489797,
        nonzeroWrites: 2489797,
        writeHash: 'a0713419',
        pcmHash: '78dc55e8',
        rms: 0.495094,
      },
    },
  }, {
    // The quickload holds the .t64 for its own three seconds and then writes
    // it into memory (frame 151); RUN starts its SYS stub, and the intro
    // text is MAME 0.289's pixel for pixel at frame 1687. SPACE then starts
    // the demo, which, as in MAME, is silent all the way to frame 2400.
    id: 'quickload',
    kind: 'media',
    software: { list: 'c64_quik', name: 'brklmts' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 2400,
    minimumFps: 10,
    checkpoints: [1, 150, 300, 1687, 2000, 2400],
    actions: [{ atFrame: 1687, text: ' ' }],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '19a076a7', state: 'fe495c5c' },
        150: { video: '1ab6e43f', state: '05a79aa4' },
        300: { video: '76d87c56', state: '97e051f9' },
        1687: { video: '79496de6', state: 'a07be663' },
        2000: { video: '5e70c022', state: '15a7a7e9' },
        2400: { video: '231979bc', state: 'c77d6a2b' },
      },
      audio: {
        writes: 2298274,
        nonzeroWrites: 2298274,
        writeHash: '17a77e2a',
        pcmHash: '72307f89',
        rms: 0.5,
      },
    },
  }, {
    // A banked cartridge: Kung-Fu Master on MAME's Magic Desk card, its chips
    // read into the expansion port by its own call_load. Its menu, then
    // RETURN three times into a game, pixel for pixel as MAME 0.289 draws
    // both at frames 900 and 1800.
    id: 'cartridge',
    kind: 'media',
    software: { list: 'c64_cart', name: 'kungfum' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 1800,
    minimumFps: 10,
    checkpoints: [1, 300, 900, 1200, 1800],
    actions: [{ atFrame: 900, text: '{ENTER}{ENTER}{ENTER}' }],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '19a076a7', state: 'd8a17054' },
        300: { video: 'c8ceb9d3', state: 'b381673b' },
        900: { video: '3636a889', state: '8baab3b1' },
        1200: { video: 'b0fee5cf', state: '604d891d' },
        1800: { video: '7cf3d77c', state: '36abbdf3' },
      },
      audio: {
        writes: 1723705,
        nonzeroWrites: 1723705,
        writeHash: '75107ab5',
        pcmHash: 'fd9c1320',
        rms: 0.45116,
      },
    },
  }, {
    // An Ultimax cartridge from the VIC-10's list, which the C64 lists too:
    // its uprom answers at $E000, and the KERNAL never runs.
    id: 'ultimax',
    kind: 'media',
    software: { list: 'vic10', name: 'jlander' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 600,
    minimumFps: 10,
    checkpoints: [1, 150, 300, 600],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '1daf28b2', state: 'f9f4a7c5' },
        150: { video: 'a5794cea', state: 'bc207ee5' },
        300: { video: 'a5794cea', state: 'af38e98b' },
        600: { video: '1ee07b0b', state: '2a1b02fa' },
      },
      audio: {
        writes: 574568,
        nonzeroWrites: 574568,
        writeHash: '23448bce',
        pcmHash: '914896f2',
        rms: 0.5,
      },
    },
  }],
} satisfies MachineTargetContract;
