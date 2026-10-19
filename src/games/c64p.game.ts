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
      { kind: 'cartridge', status: 'planned', softwareLists: ['c64_cart'] },
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
        1: { video: '7c30493e', state: 'be33dff9' },
        60: { video: '19a076a7', state: 'bc7c04f8' },
        180: { video: '25be4308', state: '97d0faa1' },
        300: { video: '4588160f', state: '4631df4f' },
        600: { video: '1414eabc', state: 'caefed36' },
        900: { video: 'b2303773', state: '6c2e26f1' },
        1200: { video: 'ade44655', state: '492b5ef3' },
      },
      audio: {
        writes: 1149137,
        nonzeroWrites: 1149137,
        writeHash: 'ec28eeea',
        pcmHash: 'fa695f8c',
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
        1: { video: 'e7dd780f', state: '6046ed15' },
        300: { video: '18afdc8d', state: '08fc0bf5' },
        1200: { video: '18afdc8d', state: '9b327311' },
        2400: { video: '703063f2', state: '96d26a49' },
        3600: { video: '39ca5134', state: 'e09f8956' },
        4200: { video: '5ca645f1', state: '22182c38' },
        4500: { video: '3374a670', state: '02b94bd7' },
      },
      audio: {
        writes: 4309264,
        nonzeroWrites: 4309264,
        writeHash: '5cd2512e',
        pcmHash: '900a4a32',
        rms: 0.455406,
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
        1: { video: '7c30493e', state: 'be33dff9' },
        300: { video: '803d484b', state: '82a7a4ae' },
        1200: { video: 'a3e6b335', state: '293ffb1f' },
        2250: { video: 'ca7ed7b0', state: '4f869c31' },
        2500: { video: 'caedcb9c', state: '79e0daab' },
        2600: { video: 'f2bfec23', state: 'c3e119ac' },
      },
      audio: {
        writes: 2489797,
        nonzeroWrites: 2489797,
        writeHash: 'a85847a6',
        pcmHash: '862def62',
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
        1: { video: 'e7dd780f', state: '6046ed15' },
        150: { video: '1ab6e43f', state: '725eb17d' },
        300: { video: '95e37c40', state: 'd70724b8' },
        1687: { video: '79496de6', state: '9970cccf' },
        2000: { video: 'de715d07', state: '1c933701' },
        2400: { video: '9acd5295', state: '66d8a67f' },
      },
      audio: {
        writes: 2298274,
        nonzeroWrites: 2298274,
        writeHash: '124ea0d7',
        pcmHash: '72307f89',
        rms: 0.5,
      },
    },
  }],
} satisfies MachineTargetContract;
