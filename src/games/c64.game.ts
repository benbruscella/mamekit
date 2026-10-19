import type { MachineTargetContract } from './types.ts';

/**
 * The NTSC Commodore 64, accepted the way the PAL one is (c64p.game.ts): at
 * BASIC, and against the same tape and disk started the way the software
 * room's Play starts them. Both titles were made for PAL and both run on
 * MAME 0.289's NTSC machine -- Crazy Comets' title by frame 5000, Bounty
 * Bob's by 3200 -- so the scenarios check the NTSC machine's own clocks
 * (a 6567 VIC-II, 1.023 MHz, 263 lines of 65 cycles) through the same loads.
 */
export const c64 = {
  target: {
    game: 'c64',
    category: 'computers',
    driver: 'src/mame/commodore/c64.cpp',
    machine: { className: 'c64_state', name: 'ntsc' },
    screen: { width: 418, height: 235 },
    soundKind: 'sid',
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'planned', softwareLists: ['c64_cart'] },
      // The quickload is the PAL machine's (c64p.game.ts): the one title in
      // MAME's list is PAL only, so this machine has no shelf to accept it
      // against, though it quickloads a dropped .prg the same way.
      { kind: 'quickload', status: 'candidate', softwareLists: ['c64_quik'] },
      { kind: 'cassette', status: 'accepted', softwareLists: ['c64_cass'] },
      { kind: 'floppy', status: 'accepted', softwareLists: ['c64_flop_orig', 'c64_flop_misc'] },
    ],
  },
  scenarios: [{
    // BASIC through the natural keyboard: a held SID note, then the 10 PRINT maze.
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
        1: { video: '9e8dba49', state: '53ad9ec8' },
        60: { video: 'f53f93ca', state: 'b6b03060' },
        180: { video: '62a14e0f', state: '9a705183' },
        300: { video: '7a60e158', state: 'c09a0946' },
        600: { video: '9d74a0ef', state: 'da711ff6' },
        900: { video: '7793795b', state: '781c6639' },
        1200: { video: '084cb3d1', state: '2306f0a1' },
      },
      audio: {
        writes: 962790,
        nonzeroWrites: 962790,
        writeHash: 'ae88557a',
        pcmHash: 'edf9648e',
        rms: 0.463688,
      },
    },
  }, {
    // LOAD and RUN typed at PRESS PLAY ON TAPE, PLAY, the KERNAL load, then
    // the title and its music, as on MAME's NTSC machine.
    id: 'tape',
    kind: 'media',
    software: { list: 'c64_cass', name: 'crazycom' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 5000,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2400, 3600, 4700, 5000],
    actions: [],
    golden: {
      regions: {
        basic: 'f833d117',
        charom: 'ec4272ee',
        kernal: 'dbe3e7c7',
        u17: '54c89351',
      },
      checkpoints: {
        1: { video: '9e8dba49', state: '3afe355e' },
        300: { video: '38480c9e', state: '89a99bd3' },
        1200: { video: '7f43a144', state: '460eea32' },
        2400: { video: 'ff073352', state: '2a07bb99' },
        3600: { video: '563d2b51', state: 'bfd5f093' },
        4700: { video: '42426a2e', state: 'c60933fe' },
        5000: { video: '5a021b6b', state: 'baca34f2' },
      },
      audio: {
        writes: 4011626,
        nonzeroWrites: 4011626,
        writeHash: '48a00dce',
        pcmHash: 'a1346484',
        rms: 0.458006,
      },
    },
  }, {
    // LOAD"*",8,1 and RUN; the title's own fast loader, then the title screen.
    id: 'disk',
    kind: 'media',
    software: { list: 'c64_flop_orig', name: 'bbsb' },
    romEnvironment: 'MAMEKIT_C64_ROM',
    frames: 3200,
    minimumFps: 10,
    checkpoints: [1, 300, 1200, 2400, 3000, 3200],
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
        1: { video: '9e8dba49', state: '53ad9ec8' },
        300: { video: '6a075598', state: '6709c3ed' },
        1200: { video: '606b00d9', state: '6eb228a4' },
        2400: { video: 'a6b267c4', state: '9340a3f1' },
        3000: { video: 'd6aee0c0', state: '446a5ac2' },
        3200: { video: 'cc375af9', state: '19fc877c' },
      },
      audio: {
        writes: 2567441,
        nonzeroWrites: 2567441,
        writeHash: '7a47fe83',
        pcmHash: '975b8c11',
        rms: 0.49341,
      },
    },
  }],
} satisfies MachineTargetContract;
