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
    // MAME's quickload image device is not generated yet; the one quickload
    // the list holds is PAL only, so this machine has no shelf for it.
    runtimeCoverage: {
      generationGaps: ['quickload:QUICKLOAD'],
      handlerGaps: [],
    },
    media: [
      { kind: 'bios', status: 'accepted' },
      { kind: 'cartridge', status: 'planned', softwareLists: ['c64_cart'] },
      { kind: 'quickload', status: 'planned', softwareLists: ['c64_quik'] },
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
        1: { video: '9e8dba49', state: '56d5048d' },
        60: { video: 'f53f93ca', state: 'a3d60ad0' },
        180: { video: '62a14e0f', state: 'fba228c3' },
        300: { video: '7a60e158', state: '736908fa' },
        600: { video: '9d74a0ef', state: 'cfe161b8' },
        900: { video: '7793795b', state: '20afee36' },
        1200: { video: '084cb3d1', state: '63b0c0f4' },
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
        1: { video: '9e8dba49', state: '796a708d' },
        300: { video: '38480c9e', state: '03a4807a' },
        1200: { video: '7f43a144', state: '0f1968be' },
        2400: { video: 'ff073352', state: 'df3cab42' },
        3600: { video: '563d2b51', state: '90ffc317' },
        4700: { video: '42426a2e', state: 'e9751e2f' },
        5000: { video: '5a021b6b', state: 'cfb0b8df' },
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
        1: { video: '9e8dba49', state: '56d5048d' },
        300: { video: '6a075598', state: '1fa091af' },
        1200: { video: '606b00d9', state: '59cfdc77' },
        2400: { video: 'a6b267c4', state: 'e49d1ae5' },
        3000: { video: 'd6aee0c0', state: '85983953' },
        3200: { video: 'cc375af9', state: 'f8fbc31c' },
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
