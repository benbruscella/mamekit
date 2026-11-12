// A CPU compiled whole as its MAME class, run through DeviceCpu as a board
// processor runs it: MAME's m6800/m6801 classes, from source, with a bus.
import assert from 'node:assert/strict';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { createDevice, registerGeneratedDevice, type Device } from './generated-device.ts';
import { DeviceCpu } from './device-cpu.ts';
import type { CpuBus } from './generated-cpu.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const index = indexMameHardware(mameSrc);

function deviceCpu(
  type: string,
  bus: CpuBus,
  regions: Record<string, Uint8Array> = {},
  options: Partial<Parameters<typeof createDevice>[1]> = {},
): { cpu: DeviceCpu; device: Device } {
  const definition = compileMameDevice(mameSrc, index.get(type)!, type);
  assert.equal(definition.summary.diagnostics, 0, `${type} compiles whole`);
  registerGeneratedDevice(definition);
  const device = createDevice(type, { tag: 'cpu', clock: 4_000_000, configuredSpaces: [0], regions, ...options });
  const cpu = new DeviceCpu(device, bus, {
    setInputLine: (line, state) => { device.call('execute_set_input', line, state === 2 ? 1 : state); },
    acknowledgeLine: () => 0,
  });
  return { cpu, device };
}

const registers = (device: Device) => (device as unknown as { members: Record<string, { b: { h: number }; w: { l: number } }> }).members;

// The 6803 from m6801.cpp: the reset vector, execute_run's opcode table
// (m6803_insn, handed down two constructors) and its on-chip port 1, which a
// write to 0x02 drives through out_p1_cb as MAME drives it: data bits under
// the direction register, the rest pulled high.
{
  const memory = new Uint8Array(0x10000);
  memory.set([0x86, 0x5a, 0x97, 0x02, 0x01, 0x20, 0xfe], 0x0200); // LDAA #$5A; STAA $02; NOP; BRA *
  memory[0xfffe] = 0x02;
  memory[0xffff] = 0x00;
  const { cpu, device } = deviceCpu('M6803', {
    read: address => memory[address]!,
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: () => {},
  });
  const port1: number[] = [];
  device.on('out_p1_cb', (...args: unknown[]) => { port1.push(Number(args.length >= 3 ? args.at(-2) : args.at(-1))); return 0; });
  cpu.reset();
  assert.ok(cpu.run(40) >= 40, 'execute_run spends its slice');
  assert.equal(registers(device).m_d!.b.h, 0x5a);
  assert.equal(registers(device).m_pc!.w.l, 0x0205, 'the loop at the end is where it stops');
  assert.deepEqual(port1, [0xff]);
  assert.equal(memory[0x02], 0, 'port 1 is on-chip: the write never reaches the bus');
}

// The 6802's CLI takes a level IRQ only once the instruction after it has run
// (m6800's own cli handler), so the handler's read of the PIA that drops the
// line happens exactly once.
{
  const memory = new Uint8Array(0x10000);
  memory.set([0x0e, 0x01, 0x01, 0x20, 0xfe], 0x8000); // CLI; NOP; NOP; BRA *
  memory.set([0x0e, 0xb6, 0x40, 0x00, 0x3b], 0x9000); // CLI; LDAA $4000; RTI
  memory[0xfff8] = 0x90;
  memory[0xfff9] = 0x00;
  memory[0xfffe] = 0x80;
  memory[0xffff] = 0x00;
  let reads = 0;
  let cpu: DeviceCpu | undefined;
  ({ cpu } = deviceCpu('M6802', {
    read: address => {
      if (address === 0x4000) {
        reads++;
        cpu!.setIrqLine(false);
      }
      return memory[address]!;
    },
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: () => {},
  }));
  cpu.reset();
  cpu.setIrqLine(true);
  for (let slice = 0; slice < 8; slice++) cpu.run(8);
  assert.equal(reads, 1, 'the handler reads the PIA once, and the dropped line is not taken again');
}

// The 8080 from i8085.cpp: OUT reaches the IO space, and an IRQ taken after EI
// fetches the vector the board gave with the line (an RST, as invaders' is).
{
  const memory = new Uint8Array(0x10000);
  memory.set([0x3e, 0x5a, 0xd3, 0x03, 0xfb, 0x00, 0xc3, 0x45, 0x00], 0x0040); // MVI A,$5A; OUT 3; EI; NOP; JMP $45
  memory.set([0xc3, 0x40, 0x00], 0x0000); // JMP $40
  memory.set([0x3e, 0x77, 0xd3, 0x04, 0x76], 0x0008); // RST 1: MVI A,$77; OUT 4; HLT
  const writes: string[] = [];
  const { cpu, device } = deviceCpu('I8080', {
    read: address => memory[address]!,
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: (port, data) => { writes.push(`${port}=${data.toString(16)}`); },
  });
  cpu.reset();
  cpu.run(40);
  assert.deepEqual(writes, ['3=5a']);
  cpu.setIrqLine(true, 0xcf);
  cpu.run(60);
  assert.deepEqual(writes, ['3=5a', '4=77'], 'RST 1 from the data bus');
  assert.equal(device.get('m_halt'), 1, 'HLT');
}

// The MCS-48 from mcs48.cpp. R0 is m_regptr[0], a pointer into the RAM its
// own data map shares as "data" (m_dataptr). An 8039 has no ROM and runs from
// the bus; an M58715's 2K is a view of its own region that EA takes away,
// and the external ROM under it shows through (memory_view::disable).
{
  // MOV A,#n; MOV R0,A; MOV A,#0; MOV A,R0; OUTL P1,A; JMP $07
  const program = (value: number) => [0x23, value, 0xa8, 0x23, 0x00, 0xf8, 0x39, 0x04, 0x07];
  const run = (type: string, regions: Record<string, Uint8Array>, ea?: boolean) => {
    const external = new Uint8Array(0x1000);
    external.set(program(0x22));
    const p1: number[] = [];
    const { cpu, device } = deviceCpu(type, {
      read: address => external[address]!,
      write: () => {},
      in: () => 0xff,
      out: () => {},
    }, regions);
    device.on('p1_out_cb', (...args: unknown[]) => { p1.push(Number(args.length >= 3 ? args.at(-2) : args.at(-1))); return 0; });
    if (ea !== undefined) cpu.setInputLine(device.constant('MCS48_INPUT_EA')!, ea ? 1 : 0);
    cpu.reset();
    cpu.run(30);
    return p1;
  };
  // device_reset puts port 1 in input mode, 0xff, before the program runs.
  assert.deepEqual(run('I8039', {}), [0xff, 0x22], 'an 8039 runs from the bus');
  const internal = new Uint8Array(0x800);
  internal.set(program(0x11));
  assert.deepEqual(run('M58715', { cpu: internal }), [0xff, 0x11], 'EA low: the internal ROM view');
  assert.deepEqual(run('M58715', { cpu: internal }, true), [0xff, 0x22], 'EA high: the view disabled, the bus beneath');
}

// The 6809 from m6809.cpp, its execute_run the m6809.hxx state machine MAME
// generates at build time; and the KONAMI-1 beside it, whose own memory
// interface (mi_konami1::read_opcode) unscrambles every opcode byte by its
// address: xor 0x22, 0x82, 0x28 or 0x88 on address bits 1 and 3.
{
  // LDA #$5A; STA $2000; BRA *
  const program = [0x86, 0x5a, 0xb7, 0x20, 0x00, 0x20, 0xfe];
  const run = (type: string, encrypt: boolean) => {
    const memory = new Uint8Array(0x10000);
    const key: Record<number, number> = { 0x0: 0x22, 0x2: 0x82, 0x8: 0x28, 0xa: 0x88 };
    // Only opcode fetches are scrambled: the operands stay as written.
    const opcodes = new Set([0, 2, 5]);
    program.forEach((byte, offset) => {
      const address = 0x8000 + offset;
      memory[address] = encrypt && opcodes.has(offset) ? byte ^ key[address & 0xa]! : byte;
    });
    memory[0xfffe] = 0x80;
    memory[0xffff] = 0x00;
    const { cpu } = deviceCpu(type, {
      read: address => memory[address]!,
      write: (address, data) => { memory[address] = data; },
      in: () => 0xff,
      out: () => {},
    });
    cpu.reset();
    cpu.run(40);
    return memory[0x2000];
  };
  assert.equal(run('MC6809', false), 0x5a, 'MC6809: m6809.hxx runs');
  assert.equal(run('KONAMI1', true), 0x5a, 'KONAMI-1: opcodes unscrambled by mi_konami1');
}

// The Z80 from z80.cpp, its execute_run the state machine z80make.py writes:
// stores through m_data's interruptible accesses, IM 1 to 0038, IM 2 through
// the I register and the vector the board gives with the line, and NMI to 0066.
{
  const z80 = (program: number[], setup: (memory: Uint8Array) => void = () => {}) => {
    const memory = new Uint8Array(0x10000);
    memory.set(program, 0);
    setup(memory);
    const { cpu, device } = deviceCpu('Z80', {
      read: address => memory[address]!,
      write: (address, data) => { memory[address] = data; },
      in: () => 0xff,
      out: () => {},
    });
    cpu.reset();
    return { cpu, device, memory };
  };
  // LD SP,$8000; IM 1; EI; LD A,$42; LD ($2000),A; JR $
  const im1 = z80([0x31, 0x00, 0x80, 0xed, 0x56, 0xfb, 0x3e, 0x42, 0x32, 0x00, 0x20, 0x18, 0xfe],
    memory => memory.set([0x3e, 0x99, 0x32, 0x01, 0x20, 0x18, 0xfe], 0x38)); // LD A,$99; LD ($2001),A; JR $
  im1.cpu.run(200);
  assert.equal(im1.memory[0x2000], 0x42, 'Z80: LD (nn),A reaches the bus');
  im1.cpu.setIrqLine(true, 0xff, true);
  im1.cpu.run(200);
  assert.equal(im1.memory[0x2001], 0x99, 'Z80: IM 1 takes its IRQ at 0038');
  assert.deepEqual([im1.memory[0x7ffe], im1.memory[0x7fff]], [0x0b, 0x00], 'Z80: the interrupted PC is pushed');
  // LD SP,$8000; LD A,$10; LD I,A; IM 2; EI; JR $ -- vector $20 reads $1020/$1021.
  const im2 = z80([0x31, 0x00, 0x80, 0x3e, 0x10, 0xed, 0x47, 0xed, 0x5e, 0xfb, 0x18, 0xfe], memory => {
    memory.set([0x00, 0x03], 0x1020);
    memory.set([0x3e, 0x77, 0x32, 0x02, 0x20, 0x18, 0xfe], 0x0300); // LD A,$77; LD ($2002),A; JR $
    memory.set([0x3e, 0x55, 0x32, 0x03, 0x20, 0x18, 0xfe], 0x0066); // NMI: LD A,$55; LD ($2003),A; JR $
  });
  im2.cpu.run(200);
  im2.cpu.setIrqLine(true, 0x20, true);
  im2.cpu.run(200);
  assert.equal(im2.memory[0x2002], 0x77, 'Z80: IM 2 vectors through I and the board\'s data bus');
  im2.cpu.nmi();
  im2.cpu.run(200);
  assert.equal(im2.memory[0x2003], 0x55, 'Z80: NMI at 0066');
  // LD A,$11; EX AF,AF'; LD A,$22; EX AF,AF'; LD ($2004),A;
  // LD BC,$3344; EXX; LD BC,$5566; EXX; LD A,B; LD ($2005),A; JR $
  // -- std::swap of the register pairs, which z80.cpp's ex_af and exx are.
  const ex = z80([0x3e, 0x11, 0x08, 0x3e, 0x22, 0x08, 0x32, 0x04, 0x20,
    0x01, 0x44, 0x33, 0xd9, 0x01, 0x66, 0x55, 0xd9, 0x78, 0x32, 0x05, 0x20, 0x18, 0xfe]);
  ex.cpu.run(300);
  assert.equal(ex.memory[0x2004], 0x11, 'Z80: EX AF,AF\' swaps the accumulator back');
  assert.equal(ex.memory[0x2005], 0x33, 'Z80: EXX swaps BC back');
  // device_state_interface over z80.cpp's own state_add table: Mr. Do!'s
  // protection reads `state_int(Z80_HL)`, and a snapshot loader writes PC
  // through set_state_int, whose state_import puts the core on that M1.
  const state = z80([0x21, 0x34, 0x12, 0x18, 0xfe]); // LD HL,$1234; JR $
  state.cpu.run(40);
  const constant = (name: string) => state.device.constant(name)!;
  assert.equal(state.cpu.stateInt(constant('Z80_HL')), 0x1234, 'Z80: state_int(Z80_HL)');
  state.cpu.setStateInt(-1, 0x0000); // STATE_GENPC
  state.cpu.run(40);
  assert.equal(state.cpu.stateInt(constant('Z80_HL')), 0x1234, 'Z80: set_state_int(STATE_GENPC) restarts at the new PC');
  // STATE_GENPC is the live PC, which a slice can leave inside JR's machine
  // cycles; STATE_GENPCBASE is the instruction's own address.
  assert.equal(state.cpu.stateInt(-2), 0x0003, 'Z80: state_int(STATE_GENPCBASE)');
}

// The encrypted Sega Z80s decrypt their own ROM as MAME runs them: segacrpt's
// device_reset hands decode() its chip's key table over memregion(tag()),
// into the share set_decrypted_tag names; segacrp2's device_start decrypts
// into its m_decrypted finder. Over a ROM of `address & 0xff` the bytes are
// those MAME's tables give.
{
  const decrypted = (type: string) => {
    const rom = Uint8Array.from({ length: 0x8000 }, (_, address) => address & 0xff);
    const opcodes = new Uint8Array(0x8000);
    const { cpu } = deviceCpu(type, { read: () => 0, write: () => {}, in: () => 0xff, out: () => {} }, { cpu: rom }, {
      shares: { decrypted_opcodes: opcodes },
      configure: configured => { configured.invoke('set_decrypted_tag', ':decrypted_opcodes' as unknown as number); },
    });
    cpu.reset();
    return { rom, opcodes };
  };
  const system1 = decrypted('SEGA_315_5098');
  assert.deepEqual([...system1.opcodes.slice(0, 4)], [8, 169, 10, 171], '315-5098: opcodes by its table');
  assert.notDeepEqual([...system1.rom.slice(0, 32)], [...system1.opcodes.slice(0, 32)], '315-5098: data decrypted apart');
  const system2 = decrypted('SEGA_315_5177');
  assert.deepEqual([...system2.rom.slice(0, 8)], [84, 20, 86, 22, 80, 16, 82, 18], '315-5177: data');
  assert.deepEqual([...system2.opcodes.slice(0, 8)], [4, 80, 6, 82, 0, 84, 2, 86], '315-5177: opcodes');
}

// The LR35902 from lr35902.cpp: its 256 + 256 cases live in opc_main.hxx and
// opc_cb.hxx, included into execute_run's switch and written against
// statement macros. The interrupt vectors and the IE/IF state indices are
// enumerators carrying comments; a reader that drops them renumbers the rest.
// Its timer devcb is raised from cycles_passed with the cycles each access
// took, which is how the Game Boy's timer counts.
{
  const memory = new Uint8Array(0x10000);
  memory.set([
    0x31, 0xfe, 0xff,       // LD SP,$FFFE
    0x3e, 0x42,             // LD A,$42
    0xea, 0x00, 0xc0,       // LD ($C000),A
    0x06, 0x0f,             // LD B,$0f
    0x04,                   // INC B          -> B=0x10, half-carry set
    0xcb, 0x30,             // SWAP B         -> B=0x01
    0x78,                   // LD A,B
    0xea, 0x01, 0xc0,       // LD ($C001),A
    0xaf,                   // XOR A          -> A=0, Z set
    0xf5,                   // PUSH AF
    0xc1,                   // POP BC
    0x79,                   // LD A,C
    0xea, 0x02, 0xc0,       // LD ($C002),A
    0xfb,                   // EI
    0x18, 0xfe,             // JR $
  ]);
  memory.set([0x3e, 0x77, 0xea, 0x03, 0xc0, 0x76], 0x40); // VBL: LD A,$77; LD ($C003),A; HALT
  const { cpu, device } = deviceCpu('LR35902', {
    read: address => memory[address]!,
    write: (address, data) => { memory[address] = data; },
    in: () => 0xff,
    out: () => {},
  });
  assert.equal(device.constant('VBL_INT'), 0);
  assert.equal(device.constant('EXT_INT'), 4);
  assert.equal(device.constant('LR35902_IE'), 12);
  assert.equal(device.constant('LR35902_IF'), 13);
  let timerCycles = 0;
  device.on('timer_cb', (...args: unknown[]) => { timerCycles += Number(args.length >= 3 ? args.at(-2) : args.at(-1)); return 0; });
  cpu.reset();
  cpu.run(400);
  assert.equal(memory[0xc000], 0x42, 'LR35902: LD (a16),A reaches the bus');
  assert.equal(memory[0xc001], 0x01, 'LR35902: INC B carries into the high nybble, CB SWAP exchanges nybbles');
  assert.equal(memory[0xc002], 0x80, 'LR35902: XOR A leaves only Z set (F through PUSH AF/POP BC)');
  assert.ok(timerCycles > 0, 'LR35902: cycles_passed raises timer_cb');
  device.call('set_ie', 1);
  cpu.setInputLine(device.constant('VBL_INT')!, 1);
  cpu.run(400);
  assert.equal(memory[0xc003], 0x77, 'LR35902: an enabled VBL interrupt vectors to 0040');
}

// The 6502 family from m6502.cpp, its operation lists through m6502make.py.
// A page-crossing `LDA abs,Y` makes its dummy read on the old page, through
// `set_l(uint16_t, uint8_t)` narrowing its argument; the 6507's constructor
// narrows its program space to 13 bits, so its reset vector is at $1FFC; the
// RP2A03 ignores decimal mode; Data East's parts decrypt opcodes in their own
// memory interfaces (the C10707 swaps bits 5 and 6 of each; the CPU-7 the
// opcode after a write, at `(pc & 0x104) == 0x104`).
{
  const run6502 = (type: string, program: number[], origin = 0x0300) => {
    const memory = new Uint8Array(0x10000);
    memory.set(program, origin);
    memory[0xfffc] = origin & 0xff;
    memory[0xfffd] = origin >> 8;
    memory[0xfffe] = 0x00; // IRQ at $0400
    memory[0xffff] = 0x04;
    memory.set([0xee, 0x02, 0x20, 0x40], 0x0400); // INC $2002; RTI
    const reads: number[] = [];
    const { cpu } = deviceCpu(type, {
      read: address => { reads.push(address); return memory[address]!; },
      write: (address, data) => { memory[address] = data; },
      in: () => 0xff,
      out: () => {},
    });
    cpu.reset();
    cpu.run(200);
    return { cpu, memory, reads };
  };
  // LDY #$10; LDA $20F8,Y; STA $2000; SED; CLC; LDA #$09; ADC #$01; CLD; STA $2001; CLI; JMP *
  const program = [0xa0, 0x10, 0xb9, 0xf8, 0x20, 0x8d, 0x00, 0x20, 0xf8, 0x18, 0xa9, 0x09, 0x69, 0x01, 0xd8,
    0x8d, 0x01, 0x20, 0x58, 0x4c, 0x13, 0x03];
  const m6502 = run6502('M6502', program);
  // Two reads at PC, three on the stack, then the vector: seven cycles on the bus.
  assert.deepEqual(m6502.reads.slice(2, 7), [0x0100, 0x01ff, 0x01fe, 0xfffc, 0xfffd],
    'M6502: reset is an instruction (stack reads, then the vector)');
  assert.ok(m6502.reads.includes(0x2008) && m6502.reads.includes(0x2108), 'M6502: abs,Y crossing a page reads the old page first');
  assert.equal(m6502.memory[0x2001], 0x10, 'M6502: decimal ADC');
  m6502.cpu.setIrqLine(true);
  m6502.cpu.run(100);
  assert.ok(m6502.memory[0x2002]! >= 1, 'M6502: IRQ after CLI');
  assert.equal(run6502('RP2A03G', program).memory[0x2001], 0x0a, 'RP2A03: decimal mode ignored');
  // LDX #$FF; TXS; PLA; STA $2003: `set_l(uint16_t base, uint8_t val)` keeps
  // the low byte of `m_SP + 1`, so the stack wraps to $0100, not $0300 (#184).
  const stack = run6502('M6502', [0xa2, 0xff, 0x9a, 0x68, 0x8d, 0x03, 0x20, 0x4c, 0x07, 0x05], 0x0500);
  assert.ok(!stack.reads.includes(0x0200) && !stack.reads.includes(0x0300), 'M6502: the stack wraps within page 1');
  // The RP2A03's internal map reaches the APU it builds: $4015 written
  // through rp2a03_map's lambda (`m_apu->write(0x15, data)`), a length loaded,
  // and the status read back through `.r(m_apu, FUNC(nesapu_device::status_r))`.
  // LDA #$01; STA $4015; LDA #$08; STA $4003; LDA $4015; STA $2000; JMP *
  const apu = run6502('RP2A03G', [0xa9, 0x01, 0x8d, 0x15, 0x40, 0xa9, 0x08, 0x8d, 0x03, 0x40,
    0xad, 0x15, 0x40, 0x8d, 0x00, 0x20, 0x4c, 0x10, 0x03]);
  assert.equal(apu.memory[0x2000]! & 1, 1, 'RP2A03: $4015 reports the APU\'s pulse length counter running');
  const m6507 = run6502('M6507', program);
  assert.ok(m6507.reads.includes(0x1ffc) && !m6507.reads.includes(0xfffc), 'M6507: 13-bit space, vector at $1FFC');
  // LDA #$5A; STA $2000; JMP *, every opcode with bits 5 and 6 swapped.
  assert.equal(run6502('DECO_C10707', [0xc9, 0x5a, 0x8d, 0x00, 0x20, 0x2c, 0x05, 0x03]).memory[0x2000], 0x5a,
    'DECO C10707: opcodes unscrambled, each fetched once');
  // LDA #$11; STA $2000; then at $0305 LDA #$77 scrambled (0x4D); STA $2001; JMP *
  const cpu7 = run6502('DECO_CPU7', [0xa9, 0x11, 0x8d, 0x00, 0x20, 0x4d, 0x77, 0x8d, 0x01, 0x20, 0x4c, 0x0a, 0x03]);
  assert.equal(cpu7.memory[0x2001], 0x77, 'DECO CPU-7: the opcode after a write at (pc & 0x104) == 0x104 is unscrambled');

  // The 6510's on-chip port (mi_6510): $00 is the direction register and $01
  // the port, which write_callback drives with `(port & dir) | (pullup & ~dir)`;
  // both accesses also reach the external bus, as MAME's do. Its ANE uses the
  // C64's 0xEE magic constant.
  {
    const memory = new Uint8Array(0x10000);
    // LDA #$2F; STA $00; LDA #$37; STA $01; LDA #$00; LDX #$FF; ANE #$FF; STA $2000; JMP *
    memory.set([0xa9, 0x2f, 0x85, 0x00, 0xa9, 0x37, 0x85, 0x01, 0xa9, 0x00, 0xa2, 0xff, 0x8b, 0xff,
      0x8d, 0x00, 0x20, 0x4c, 0x11, 0x03], 0x0300);
    memory[0xfffc] = 0x00;
    memory[0xfffd] = 0x03;
    const writes: [number, number][] = [];
    const port: number[] = [];
    const { cpu, device } = deviceCpu('M6510', {
      read: address => memory[address]!,
      write: (address, data) => { writes.push([address, data]); memory[address] = data; },
      in: () => 0xff,
      out: () => {},
    });
    device.on('write_callback', (...args: unknown[]) => { port.push(Number(args.length >= 3 ? args.at(-2) : args.at(-1))); return 0; });
    device.call('set_pulls', 0x17, 0xc8);
    cpu.reset();
    cpu.run(200);
    assert.ok(writes.some(([address, data]) => address === 0 && data === 0x2f) &&
      writes.some(([address, data]) => address === 1 && data === 0x37), 'M6510: port writes reach the external bus');
    assert.equal(port.at(-1), 0x37, 'M6510: write_callback carries (port & dir) | (pullup & ~dir)');
    assert.equal(memory[0x2000], 0xee, 'M6510: ANE with the 0xEE constant');
  }
}

// The Z8002 from z8000.cpp: a 16-bit big-endian bus, its register file a
// union of byte, word and long arrays over one buffer (indexed through
// endianness.h's BYTE4_XOR_BE), its opcodes dispatched through a table of
// member-function pointers. Reset reads the FCW at $0002 and the PC at $0004;
// a word access through an odd register reads the aligned word, as Pole
// Position's RAM test expects.
{
  const memory = new Uint8Array(0x10000);
  const words = (at: number, ...values: number[]) =>
    values.forEach((value, index) => { memory[at + index * 2] = value >> 8; memory[at + index * 2 + 1] = value & 0xff; });
  words(0x0002, 0x4000, 0x0200);
  // LD R1,#$1234; LD R2,#$2000; LD @R2,R1; LD R3,#$0003; ADD R1,@R3; LD R4,#$2002; LD @R4,R1; JR $
  words(0x0200, 0x2101, 0x1234, 0x2102, 0x2000, 0x2f21, 0x2103, 0x0003, 0x0131, 0x2104, 0x2002, 0x2f41, 0xe8ff);
  const { cpu } = deviceCpu('Z8002', {
    read: address => memory[address & 0xffff]!,
    write: (address, data) => { memory[address & 0xffff] = data; },
    in: () => 0xff,
    out: () => {},
  });
  cpu.reset();
  cpu.run(400);
  assert.deepEqual([memory[0x2000], memory[0x2001]], [0x12, 0x34], 'Z8002: LD @R2,R1 stores the register\'s word');
  assert.deepEqual([memory[0x2002], memory[0x2003]], [0x52, 0x34], 'Z8002: ADD R1,@R3 with R3 odd reads the aligned word at $0002');
}

console.log('device-cpu.spec: MAME 6801, 6802, 8080, MCS-48, 6809, KONAMI-1, Z80, Sega Z80, LR35902, 6502-family and Z8002 classes compiled whole run as processors');
