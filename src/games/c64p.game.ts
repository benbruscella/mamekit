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
    soundKind: 'sid',
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
        1: { video: '19a076a7', state: '2c552091' },
        60: { video: '19a076a7', state: '0421ee94' },
        180: { video: '25be4308', state: 'd9905615' },
        300: { video: '4588160f', state: '253ddb32' },
        600: { video: '1414eabc', state: '5efa1c0d' },
        900: { video: 'b2303773', state: '0864ec39' },
        1200: { video: 'ade44655', state: '0e78f04a' },
      },
      audio: {
        writes: 1149137,
        nonzeroWrites: 1149137,
        writeHash: '75f1ca76',
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
        1: { video: '19a076a7', state: 'bffb2b32' },
        300: { video: '18afdc8d', state: '13929d18' },
        1200: { video: '18afdc8d', state: 'fde9c3b7' },
        2400: { video: 'a8dc5154', state: '6f0f50da' },
        3600: { video: 'd00b1bde', state: 'e9a60c1c' },
        4200: { video: '80066b14', state: '2c5bfc67' },
        4500: { video: '01d576f4', state: '6c998fbf' },
      },
      audio: {
        writes: 4309264,
        nonzeroWrites: 4309264,
        writeHash: 'dc172713',
        pcmHash: 'fb49e5ea',
        rms: 0.4554,
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
    minimumFps: 10,
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
        1: { video: '19a076a7', state: '2c552091' },
        300: { video: '803d484b', state: '6f22e13e' },
        1200: { video: 'a3e6b335', state: '63532435' },
        2250: { video: 'ca7ed7b0', state: 'bdba11b5' },
        2500: { video: '1cc6cabc', state: 'b497ad72' },
        2600: { video: 'b21c9afe', state: 'fce3f913' },
      },
      audio: {
        writes: 2489797,
        nonzeroWrites: 2489797,
        writeHash: '1da2e4e7',
        pcmHash: '40751e4e',
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
        1: { video: '19a076a7', state: 'bffb2b32' },
        150: { video: '1ab6e43f', state: '912de28c' },
        300: { video: '95e37c40', state: '5bc2a631' },
        1687: { video: '79496de6', state: 'ab1bc8c0' },
        2000: { video: '0ae5682b', state: '9d626d6f' },
        2400: { video: '853169a2', state: 'aba71d6b' },
      },
      audio: {
        writes: 2298274,
        nonzeroWrites: 2298274,
        writeHash: '8a47f679',
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
        1: { video: '19a076a7', state: '6a039d4b' },
        300: { video: '3237d4d2', state: 'afeaae71' },
        900: { video: '3636a889', state: '8bd998eb' },
        1200: { video: 'b0fee5cf', state: '150b76a4' },
        1800: { video: '7cf3d77c', state: 'b85e8bb6' },
      },
      audio: {
        writes: 1723705,
        nonzeroWrites: 1723705,
        writeHash: '29bfc91f',
        pcmHash: '2c67194c',
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
        1: { video: '1daf28b2', state: 'f64207a4' },
        150: { video: 'a5794cea', state: '74e054bd' },
        300: { video: 'a5794cea', state: 'a39d1caf' },
        600: { video: '1ee07b0b', state: '869a15fe' },
      },
      audio: {
        writes: 574568,
        nonzeroWrites: 574568,
        writeHash: 'c741a530',
        pcmHash: '914896f2',
        rms: 0.5,
      },
    },
  }],
} satisfies MachineTargetContract;
