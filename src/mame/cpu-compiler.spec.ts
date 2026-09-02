import assert from 'node:assert/strict';
import {
  compileMameI8080,
  compileMameI8088,
  compileMameKonami1,
  compileMameLr35902,
  compileMameM6802,
  compileMameMc6809,
  compileMameM6801U4,
  compileMameM6803,
  compileMameM68000,
  compileMameM6502,
  compileMameMcs48,
  compileMameRp2a03,
  compileMameZ8002,
  compileMameZ80,
} from './cpu-compiler.ts';
import { generatedCpuExecutableSource } from './cpu-codegen.ts';
import {
  clearGeneratedCpus,
  createCpu,
  registerGeneratedCpu,
  type GeneratedCpuDefinition,
} from '../runtime/generated-cpu.ts';

const i8039Definition = compileMameMcs48(process.env.MAME_SRC ?? '../mame', 'I8039');
const i8035Definition = compileMameMcs48(process.env.MAME_SRC ?? '../mame', 'I8035');
const mb8884Definition = compileMameMcs48(process.env.MAME_SRC ?? '../mame', 'MB8884');
assert.equal(i8035Definition.type, 'I8035');
assert.equal(i8039Definition.type, 'I8039');
assert.equal(mb8884Definition.type, 'MB8884');
assert.equal(i8039Definition.members.find(member => member.name === 'm_ram_size')?.initial, 128);
assert.equal(i8035Definition.members.find(member => member.name === 'm_ram_size')?.initial, 64);
assert.equal(mb8884Definition.members.find(member => member.name === 'm_ram_size')?.initial, 64);
assert.equal(mb8884Definition.members.find(member => member.name === 'm_dataptr')?.values?.length, 64);

const definition = compileMameZ80(process.env.MAME_SRC ?? '../mame');
assert.equal(definition.summary.opcodes, 1536);
assert.equal(definition.summary.compiledOpcodes, 1536);
assert.equal(definition.summary.diagnostics, 0);
assert.ok(definition.methods.some(method => method.name === 'get_f'));
assert.ok(definition.methods.some(method => method.name === 'm_f.pv'));
assert.equal(definition.sourceFiles.includes('src/devices/cpu/z80/z80.lst'), true);
assert.match(
  generatedCpuExecutableSource(definition),
  /this\.bus\.timing\?\.\(total, target\)/,
  'direct generated CPUs must preserve instruction-level peripheral timing',
);
assert.match(
  generatedCpuExecutableSource(definition),
  /this\.generatedService\(\)/,
  'generated CPUs must preserve each family\'s instruction-boundary IRQ service',
);
assert.match(
  generatedCpuExecutableSource(definition),
  /bus\.signal\?\.\("refresh_cb",/,
  'Z80 refresh output must reach the machine-config callback',
);

clearGeneratedCpus();
registerGeneratedCpu(definition);
const memory = new Uint8Array(0x10000);
memory.set([0x3e, 0x7f, 0xc6, 0x01, 0xcb, 0x07]);
const z80Signals: Array<[string, number]> = [];
const cpu = createCpu('Z80', {
  read: address => memory[address]!,
  write: (address, data) => { memory[address] = data; },
  in: () => 0xff,
  out: () => {},
  signal: (name, value) => { z80Signals.push([name, value]); return 0; },
});
assert.equal(cpu.step(), 7);
assert.equal(z80Signals.some(([name]) => name === 'refresh_cb'), true);
assert.equal(cpu.get('A'), 0x7f);
assert.equal(cpu.step(), 7);
assert.equal(cpu.get('A'), 0x80);
assert.equal(cpu.invoke('get_f'), 0x94);
assert.equal(cpu.step(), 8);
assert.equal(cpu.get('A'), 0x01);

// Z8002 absolute operands are fetched through MAME's opcode cache. They must
// still read the immediate word from the program bus after source lowering;
// Pole Position relies on this for its sub-CPU boot and mailbox service loop.
const z8002Definition = compileMameZ8002(process.env.MAME_SRC ?? '../mame');
assert.equal(z8002Definition.summary.diagnostics, 0);
assert.equal(
  z8002Definition.alignDataWords,
  true,
  'Z8002 word and long data accesses must discard address bit zero like MAME',
);
assert.equal(
  z8002Definition.fixedInstructionCycles,
  true,
  'Z8002 opcode-table cycles must not be charged again for byte memory accesses',
);
// device_state_interface formatting is debugger presentation, not execution:
// state_string_export reads STATE_GENFLAGS, a distate.h enumerator no CPU
// definition declares, and nothing the core executes calls it.
assert.ok(!z8002Definition.methods.some(method =>
  ['state_import', 'state_export', 'state_string_export'].includes(method.name)));
clearGeneratedCpus();
registerGeneratedCpu(z8002Definition);
const z8002Memory = new Uint8Array(0x10000);
z8002Memory.set([0x33, 0x5c], 0x0100);
const z8002 = createCpu('Z8002', {
  read: address => z8002Memory[address]!,
  write: (address, data) => { z8002Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
z8002.set('m_pc', 0x0100);
z8002.set('m_op_valid', 1);
assert.equal(z8002.invoke('get_addr_operand', 1), 0x335c);
assert.equal(z8002.get('m_pc'), 0x0102);

// ADD r1,@r2 with an odd r2. Pole Position's Z8002 RAM test deliberately
// exercises this case; MAME reads the word at 0002, never the pair at 0003.
z8002Memory.set([0x01, 0x21], 0x0200);
z8002Memory.set([0x12, 0x34, 0x56], 0x0002);
z8002.set('m_irq_req', 0);
z8002.set('m_halt', 0);
z8002.set('m_pc', 0x0200);
z8002.set('m_regs.W.1', 1);
z8002.set('m_regs.W.2', 3);
z8002.step();
assert.equal(z8002.get('m_regs.W.1'), 0x1235);
registerGeneratedCpu(definition);

// Gottlieb's 8088 boards mirror a 16-bit map into the CPU's 20-bit physical
// space. Reset must still put CS at FFFF so the first fetch reaches FFFF0
// (and therefore the board's FFF0 ROM window after its global mask).
const i8088Definition = compileMameI8088(process.env.MAME_SRC ?? '../mame');
assert.equal(i8088Definition.constants.ES, 0);
assert.equal(i8088Definition.constants.CS, 1);
assert.equal(i8088Definition.constants.SS, 2);
assert.equal(i8088Definition.constants.DS, 3);

// i86.h's BASE_CYCLES enumerators index m_i8086_timing, and the header
// annotates the table with block comments that contain commas. Splitting the
// enum body on commas without removing those first turns one annotated
// enumerator into two entries and shifts every later value, so CLK/CLKM
// charge the wrong timing slot. The values below are positions in the
// declaration, counted with the comments gone.
assert.equal(i8088Definition.constants.EXCEPTION, 0);
assert.equal(i8088Definition.constants.INT3, 2);
assert.equal(i8088Definition.constants.NOP, 21);
assert.equal(i8088Definition.constants.POP_SEG, 84);
assert.equal(i8088Definition.constants.ALU_RR8, 86);
// The decisive check is that the enumerators still address the slot MAME
// wrote: m_i8086_timing is positional, so a shifted enum reads a plausible
// but wrong cycle count with no diagnostic anywhere.
const i8086Timing = i8088Definition.members
  .find(member => member.name === 'm_timing')!.values!;
for (const [name, cycles] of [
  ['EXCEPTION', 51], ['IRET', 32], ['NOP', 2], ['XLAT', 11],
  ['POP_SEG', 12], ['ALU_RR8', 3], ['REP_MOVS16_COUNT', 17],
] as const) {
  assert.equal(
    i8086Timing[i8088Definition.constants[name]!],
    cycles,
    `I8088 ${name} must index the m_i8086_timing slot MAME declares`,
  );
}

// sreg_to_space picks between the AS_CODE/AS_STACK/AS_EXTRA address spaces,
// which a single-program-bus core does not model; every caller of it is
// already lowered as a direct bus access.
assert.ok(!i8088Definition.methods.some(method => method.name === 'sreg_to_space'));

// i86.h declares `int32_t m_SignVal;` apart from the `uint32_t` flag scratch
// beside it, and SF is `m_SignVal < 0`. Wrapping that store unsigned makes
// every negative byte result read positive, so SF is stuck at 0 and every
// signed byte comparison takes the wrong arm -- Q*bert's coin routine is
// `CMP BYTE PTR [0083],0` followed by JG/JL, which is exactly such a test.
const i8088SignVal = i8088Definition.members.find(member => member.name === 'm_SignVal');
assert.equal(i8088SignVal?.signed, true, 'I8088 m_SignVal must wrap signed');
assert.equal(
  i8088Definition.members.find(member => member.name === 'm_ZeroVal')?.signed,
  undefined,
  'the zero/parity scratch beside it is uint32_t and only ever tested against 0',
);
const i8088Source = generatedCpuExecutableSource(i8088Definition);
assert.match(
  i8088Source,
  /this\.m_SignVal = \(\([^;]*\) \| 0\)/,
  'a signed member stores through the two\'s-complement wrap, not `>>> 0`',
);
assert.ok(
  !/this\.m_SignVal = \(\([^;]*\) >>> 0\)/.test(i8088Source),
  'no store to m_SignVal may coerce it unsigned',
);
clearGeneratedCpus();
registerGeneratedCpu(i8088Definition);
const i8088 = createCpu('I8088', {
  read: () => 0x90,
  write: () => {},
  in: () => 0xff,
  out: () => {},
});
i8088.reset();
assert.equal(i8088.invoke('update_pc'), 0xffff0);
i8088.set('m_ip', 0xffff);
i8088.invoke('fetch');
assert.equal(i8088.get('m_ip'), 0);
i8088.setInputLine(-1, 1);
assert.equal(i8088.get('m_pending_irq') & 2, 2);
registerGeneratedCpu(definition);

// Boards with an AS_OPCODES map fetch instructions from the separate bus
// while instruction arguments and ordinary data reads stay on program space.
const encrypted = Uint8Array.from([0x76]); // HALT as data, NOP after decryption.
const opcodeCpu = createCpu('Z80', {
  read: address => encrypted[address] ?? 0,
  readOpcode: () => 0x00,
  write: () => {},
  in: () => 0xff,
  out: () => {},
});
opcodeCpu.step();
assert.equal(opcodeCpu.get('PC'), 1);
assert.equal(opcodeCpu.get('m_halt'), 0);
assert.match(generatedCpuExecutableSource(definition), /bus\.readOpcode\?\./);

const rp2a03Definition = compileMameRp2a03(process.env.MAME_SRC ?? '../mame');
assert.equal(rp2a03Definition.summary.opcodes, 256);
assert.equal(rp2a03Definition.summary.compiledOpcodes, 256);
assert.equal(rp2a03Definition.summary.diagnostics, 0);
assert.ok(rp2a03Definition.sourceFiles.includes('src/devices/cpu/m6502/drp2a03.lst'));

clearGeneratedCpus();
registerGeneratedCpu(rp2a03Definition);
const rp2a03Memory = new Uint8Array(0x10000);
rp2a03Memory.set([0xa9, 0x7f, 0x69, 0x01, 0x85, 0x10], 0x8000);
rp2a03Memory[0xfffc] = 0x00;
rp2a03Memory[0xfffd] = 0x80;
const rp2a03 = createCpu('RP2A03', {
  read: address => rp2a03Memory[address]!,
  write: (address, data) => { rp2a03Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
assert.equal(rp2a03.step(), 2);
assert.equal(rp2a03.get('m_A'), 0x7f);
assert.equal(rp2a03.step(), 2);
assert.equal(rp2a03.get('m_A'), 0x80);
assert.equal(rp2a03.step(), 3);
assert.equal(rp2a03Memory[0x10], 0x80);
assert.ok(generatedCpuExecutableSource(rp2a03Definition).length > 100_000);

const m6502Definition = compileMameM6502(process.env.MAME_SRC ?? '../mame');
assert.equal(m6502Definition.type, 'M6502');
assert.equal(m6502Definition.summary.compiledOpcodes, 256);
assert.equal(m6502Definition.summary.diagnostics, 0);
assert.ok(m6502Definition.sourceFiles.includes('src/devices/cpu/m6502/dm6502.lst'));
clearGeneratedCpus();
registerGeneratedCpu(m6502Definition);
const m6502Memory = new Uint8Array(0x10000);
// SED ; LDA #$45 ; ADC #$55 — NMOS decimal mode must produce BCD $00 + carry.
m6502Memory.set([0xf8, 0xa9, 0x45, 0x69, 0x55], 0x8000);
m6502Memory[0xfffc] = 0x00;
m6502Memory[0xfffd] = 0x80;
const m6502 = createCpu('M6502', {
  read: address => m6502Memory[address]!,
  write: (address, data) => { m6502Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
m6502.reset();
m6502.step();
m6502.step();
m6502.step();
assert.equal(m6502.get('m_A'), 0x00);
assert.equal(m6502.get('m_P') & 1, 1);

const i8080Definition = compileMameI8080(process.env.MAME_SRC ?? '../mame');
assert.match(
  generatedCpuExecutableSource(i8080Definition),
  /typeof source === 'function' \? source\(\) : source/,
);
const emptyProgram = { operations: [], diagnostics: [] };
const lazyIrqDefinition: GeneratedCpuDefinition = {
  type: 'LAZY_IRQ_TEST',
  constants: {},
  aliases: {},
  members: [],
  methods: [],
  start: emptyProgram,
  reset: emptyProgram,
  input: emptyProgram,
  step: {
    operations: [{
      op: 'return',
      value: {
        kind: 'call',
        callee: { kind: 'identifier', name: 'standard_irq_callback' },
        args: [],
      },
    }],
    diagnostics: [],
  },
  service: emptyProgram,
  fetch: emptyProgram,
  opcodes: [],
  summary: { diagnostics: 0 },
};
registerGeneratedCpu(lazyIrqDefinition);
let acknowledgements = 0;
const lazyIrq = createCpu('LAZY_IRQ_TEST', {
  read: () => 0,
  write: () => {},
  in: () => 0xff,
  out: () => {},
});
lazyIrq.setIrqLine(true, () => {
  acknowledgements++;
  return 0xd7;
});
assert.equal(acknowledgements, 0, 'CPU must defer vector evaluation until acknowledge');
assert.equal(lazyIrq.step(), 0xd7);
assert.equal(acknowledgements, 1, 'CPU must evaluate its vector on acknowledge');

// Z80's IRQ-acknowledge line callback is separate from the vector callback.
// Treating both as acknowledgeIrq() reads side-effecting vectors twice.
const irqAckSource = generatedCpuExecutableSource({
  ...lazyIrqDefinition,
  type: 'IRQ_ACK_CALLBACK_TEST',
  schemaVersion: 1,
  dialect: 'z80',
  sourceFiles: [],
  methods: [],
  opcodes: [],
  summary: { opcodes: 0, compiledOpcodes: 0, methods: 0, compiledMethods: 0, diagnostics: 0 },
  step: {
    operations: [{
      op: 'call',
      expression: {
        kind: 'call',
        callee: { kind: 'identifier', name: 'm_irqack_cb' },
        args: [{ kind: 'number', value: 1 }],
      },
    }, {
      op: 'return',
      value: {
        kind: 'call',
        callee: { kind: 'identifier', name: 'standard_irq_callback' },
        args: [],
      },
    }],
    diagnostics: [],
  },
});
assert.match(irqAckSource, /bus\.signal\?\.\('irqack_cb', 1\)/);
assert.equal(
  irqAckSource.match(/this\.acknowledgeIrq\(0\)/g)?.length,
  1,
  'only standard_irq_callback may consume the interrupt vector',
);

// Multi-declarator C++ for-initializers must emit valid JS (one `let`, comma
// separated declarators) all the way through new Function.
import { compileMameHandler } from './handler-ir.ts';

const multiDeclDefinition: GeneratedCpuDefinition = {
  ...lazyIrqDefinition,
  type: 'MULTI_DECL_TEST',
  methods: [{
    name: 'sum_bits',
    parameters: '',
    program: compileMameHandler(`
      int total = 0;
      for (int i = 0, n = 8; i < n; i++)
        total += (m_a >> i) & 1;
      return total;
    `),
  }],
  members: [{ name: 'm_a', bits: 8, initial: 0xb3 }],
};
assert.equal(multiDeclDefinition.methods[0]!.program.diagnostics.length, 0);
const multiDeclSource = generatedCpuExecutableSource({
  ...multiDeclDefinition,
  schemaVersion: 1,
  dialect: 'z80',
  sourceFiles: [],
  methods: multiDeclDefinition.methods.map(method => ({
    ...method,
    source: { file: 'cpu-compiler.spec.ts', line: 1 },
  })),
  opcodes: [],
  summary: { opcodes: 0, compiledOpcodes: 0, methods: 1, compiledMethods: 1, diagnostics: 0 },
});
assert.match(multiDeclSource, /for \(let i = \(\(0\) \| 0\), n = \(\(8\) \| 0\); /);
assert.doesNotMatch(multiDeclSource, /, let /);
registerGeneratedCpu(multiDeclDefinition);
const multiDecl = createCpu('MULTI_DECL_TEST', {
  read: () => 0,
  write: () => {},
  in: () => 0xff,
  out: () => {},
});
assert.equal(multiDecl.invoke('sum_bits'), 5);

const m6803Definition = compileMameM6803(process.env.MAME_SRC ?? '../mame');
assert.ok(generatedCpuExecutableSource(m6803Definition).length > 100_000);
assert.equal(m6803Definition.summary.opcodes, 256);
assert.equal(m6803Definition.summary.compiledOpcodes, 256);
assert.equal(m6803Definition.summary.diagnostics, 0);
assert.deepEqual(m6803Definition.internal?.ram, [{ start: 0x80, end: 0xff }]);
assert.deepEqual(
  m6803Definition.internal?.ports.map(port => port.dataAddress),
  [0x02, 0x03],
);
assert.equal(
  m6803Definition.sourceFiles.includes('src/devices/cpu/m6800/6800ops.hxx'),
  true,
);

const m6802Definition = compileMameM6802(process.env.MAME_SRC ?? '../mame');
assert.ok(m6802Definition.members.some(member => member.name === 'm_irq_delay'));
clearGeneratedCpus();
registerGeneratedCpu(m6802Definition);
const m6802Memory = new Uint8Array(0x10000);
m6802Memory.set([0x0e, 0x01, 0x01], 0x8000); // CLI; NOP; NOP
m6802Memory.set([0x0e, 0xb6, 0x40, 0x00, 0x3b], 0x9000); // CLI; LDAA $4000; RTI
m6802Memory[0xfff8] = 0x90;
m6802Memory[0xfff9] = 0x00;
m6802Memory[0xfffe] = 0x80;
m6802Memory[0xffff] = 0x00;
let m6802PiaReads = 0;
let m6802: ReturnType<typeof createCpu>;
m6802 = createCpu('M6802', {
  read: address => {
    if (address === 0x4000) {
      m6802PiaReads++;
      m6802.setIrqLine(false);
    }
    return m6802Memory[address]!;
  },
  write: (address, data) => { m6802Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
m6802.setIrqLine(true);
for (let instruction = 0; instruction < 6; instruction++) m6802.step();
assert.equal(m6802PiaReads, 1, 'M6802 CLI must execute the PIA read before resampling level IRQ');

const m68000Definition = compileMameM68000(process.env.MAME_SRC ?? '../mame');
assert.equal(m68000Definition.summary.opcodes, 1699);
assert.equal(m68000Definition.summary.compiledOpcodes, 1699);
assert.equal(m68000Definition.summary.diagnostics, 0);
assert.equal(m68000Definition.addressMask, 0xffffff);
// init_cpu_m68000()'s per-variant cycle adjustments, which the opcode bodies
// subtract from m_icount by name. Emitting 0 for them charged an untaken Bcc
// its taken price on every 68000 board.
assert.equal(m68000Definition.constants.m_cyc_bcc_notake_b, -2);
assert.equal(m68000Definition.constants.m_cyc_bcc_notake_w, 2);
assert.equal(m68000Definition.constants.m_cyc_dbcc_f_noexp, -2);
assert.equal(m68000Definition.constants.m_cyc_dbcc_f_exp, 2);
assert.equal(m68000Definition.constants.m_cyc_scc_r_true, 2);
assert.equal(m68000Definition.constants.m_cyc_movem_w, 4);
assert.equal(m68000Definition.constants.m_cyc_movem_l, 8);
assert.equal(m68000Definition.constants.m_cyc_reset, 132);
// A 68000 leaves these unset, so MAME's `x ? x : m_cyc_movem_w` reads zero.
assert.equal(m68000Definition.constants.m_cyc_movem_store_w, 0);
assert.equal(m68000Definition.constants.m_cyc_movem_store_l, 0);
const m68000Source = generatedCpuExecutableSource(m68000Definition);
assert.ok(m68000Source.length > 1_000_000);
assert.match(m68000Source, /address & 16777215/);
assert.match(m68000Source, /this\.bus\.acknowledge\?\.\(level\)/);
assert.match(
  m68000Source,
  /this\.bus\.read16be\?\.\(/,
  'generated 68000 word and long reads must preserve atomic 16-bit bus handlers',
);
assert.match(
  m68000Source,
  /this\.bus\.write16be\(/,
  'generated 68000 word and long writes must preserve atomic 16-bit bus handlers',
);
assert.match(
  m68000Source,
  /this\.cycles = \(\(this\.cycles\) \+ \(-2\)\);/,
  'an untaken Bcc must charge the source cycle adjustment, not the taken price',
);
assert.doesNotMatch(
  m68000Source,
  /this\.m_icount = \(\(this\.m_icount\) - /,
  'a cycle charge left on m_icount is discarded: the core returns `cycles`',
);
assert.throws(
  () => generatedCpuExecutableSource({
    ...m68000Definition,
    constants: Object.fromEntries(
      Object.entries(m68000Definition.constants)
        .filter(([name]) => name !== 'm_cyc_bcc_notake_b'),
    ),
  }),
  /m_cyc_bcc_notake_b/,
  'an identifier the CPU definition never declares must fail generation, not emit 0',
);
clearGeneratedCpus();
registerGeneratedCpu(m68000Definition);
const m68000Memory = new Uint8Array(0x3000);
let m68000AcknowledgeLevel = 0;
const writeM68000Long = (address: number, value: number): void => {
  m68000Memory[address] = value >>> 24;
  m68000Memory[address + 1] = value >>> 16;
  m68000Memory[address + 2] = value >>> 8;
  m68000Memory[address + 3] = value;
};
writeM68000Long(0, 0x00002000);
writeM68000Long(4, 0x00000100);
// MOVEQ #5,D0; ADDQ.L #1,D0; MOVE.L D0,$00001000; BRA.S *
m68000Memory.set([
  0x70, 0x05, 0x52, 0x80, 0x23, 0xc0, 0x00, 0x00, 0x10, 0x00, 0x60, 0xfe,
], 0x100);
const m68000 = createCpu('M68000', {
  read: address => m68000Memory[address] ?? 0,
  write: (address, data) => { m68000Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
  acknowledge: level => {
    m68000AcknowledgeLevel = level;
    return 24 + level;
  },
});
assert.deepEqual([m68000.step(), m68000.step(), m68000.step()], [4, 8, 20]);
assert.deepEqual(Array.from(m68000Memory.slice(0x1000, 0x1004)), [0, 0, 0, 6]);

// TRAP #0 dispatches through exception vector 32, not reset vector 0.
writeM68000Long(0x80, 0x00000200);
m68000Memory.set([0x4e, 0x40], 0x100);
m68000Memory.set([0x4e, 0x71], 0x200);
m68000.reset();
m68000.step();
assert.equal(m68000.get('m_pc'), 0x200);
assert.deepEqual(Array.from(m68000Memory.slice(0x1ffc, 0x2000)), [0, 0, 1, 2]);

// With MAME's virtual interrupt mixer disabled, IPL1 is physical bit 1 and
// therefore requests autovector level 2 (vector 26).
writeM68000Long(26 * 4, 0x00000300);
m68000Memory.set([0x4e, 0x73], 0x300); // RTE
m68000.set('m_interrupt_mixer', 0);
m68000.set('m_int_mask', 0);
m68000.setInputLine(1, 1);
m68000.step();
assert.equal(m68000.get('m_pc'), 0x300);
assert.equal(m68000AcknowledgeLevel, 2);
m68000.setInputLine(1, 0);
m68000.step();
assert.equal(m68000.get('m_pc'), 0x200, 'M68000 RTE must resume the interrupted PC');

// Ghouls bounds its RAM test with CMPA.L A1,A0 / BLS. The branch is taken
// while A0 is at or below the inclusive end address, then falls through.
writeM68000Long(4, 0x00000400);
m68000Memory.set([
  0x20, 0x7c, 0x00, 0x00, 0x10, 0x02, // MOVEA.L #$1002,A0
  0x22, 0x7c, 0x00, 0x00, 0x10, 0x01, // MOVEA.L #$1001,A1
  0xb1, 0xc9,                         // CMPA.L A1,A0
  0x63, 0x04,                         // BLS.S $416
  0x70, 0x01,                         // MOVEQ #1,D0
  0x60, 0x02,                         // BRA.S $418
  0x70, 0x00,                         // MOVEQ #0,D0
  0x4e, 0x71,                         // NOP
], 0x400);
m68000.reset();
for (let instruction = 0; instruction < 4; instruction++) m68000.step();
assert.equal(m68000.get('m_pc'), 0x410, 'CMPA.L must leave A0>A1 as unsigned higher');
m68000.step();
assert.equal(m68000.get('m_pc'), 0x412, 'BLS must not branch when A0>A1');
m68000Memory[0x405] = 0x00; // A0=$1000, now unsigned-lower than A1
m68000.reset();
for (let instruction = 0; instruction < 4; instruction++) m68000.step();
assert.equal(m68000.get('m_pc'), 0x414, 'BLS must branch when A0<A1');

const m6801u4Definition = compileMameM6801U4(process.env.MAME_SRC ?? '../mame');
assert.equal(m6801u4Definition.type, 'M6801U4');
assert.equal(m6801u4Definition.summary.compiledOpcodes, 256);
assert.equal(m6801u4Definition.summary.diagnostics, 0);
assert.deepEqual(m6801u4Definition.internal?.ram, [{ start: 0x40, end: 0xff }]);
assert.deepEqual(
  m6801u4Definition.internal?.ports.map(port => port.dataAddress),
  [0x02, 0x03, 0x06, 0x07],
);
assert.deepEqual(m6801u4Definition.internal?.portHandshake, {
  portIndex: 2,
  controlAddress: 0x0f,
  inputLine: 2,
  latchEnableMask: 0x08,
  outputSelectMask: 0x10,
  flagMask: 0x80,
});

clearGeneratedCpus();
registerGeneratedCpu(m6803Definition);
const m6803Memory = new Uint8Array(0x10000);
m6803Memory.set([0x86, 0x5a, 0x97, 0x02, 0x01], 0x0200);
m6803Memory[0xfffe] = 0x02;
m6803Memory[0xffff] = 0x00;
const m6803Signals: Array<[string, number]> = [];
const m6803 = createCpu('M6803', {
  read: address => m6803Memory[address]!,
  write: (address, data) => { m6803Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
  signal: (name, value) => {
    m6803Signals.push([name, value ?? 0]);
    return 0;
  },
});
m6803.reset();
assert.equal(m6803.step(), 2);
assert.equal(m6803.get('m_d.b.h'), 0x5a);
assert.equal(m6803.step(), 3);
assert.deepEqual(m6803Signals.at(-1), ['out_p1_cb', 0xff]);

const konami1Definition = compileMameKonami1(process.env.MAME_SRC ?? '../mame');
assert.equal(konami1Definition.summary.opcodes, 768);
assert.equal(konami1Definition.summary.compiledOpcodes, 768);
assert.equal(konami1Definition.summary.diagnostics, 0);
assert.equal(new Set(konami1Definition.opcodes.map(opcode => opcode.key)).size, 768);
assert.equal(konami1Definition.constants.M6809_IRQ_LINE, 0);
assert.equal(konami1Definition.constants.M6809_FIRQ_LINE, 1);
assert.ok(konami1Definition.sourceFiles.includes('src/devices/cpu/m6809/m6809.lst'));
assert.ok(konami1Definition.sourceFiles.includes('src/mame/konami/konami1.cpp'));
const konami1Source = generatedCpuExecutableSource(konami1Definition);
assert.match(konami1Source, /private readOpcode/);
assert.match(
  konami1Source,
  /private method_mul[\s\S]*?method_set_flags16r\(4, result\)/,
  'KONAMI1 MUL must preserve MAME’s declared uint16_t result in generated code',
);

clearGeneratedCpus();
registerGeneratedCpu(konami1Definition);
const konami1Memory = new Uint8Array(0x10000);
// Opcode bytes are encrypted with the address-dependent XOR from konami1.cpp;
// arguments and vectors remain plain.
konami1Memory.set([0x86 ^ 0x22, 0x42, 0x97 ^ 0x82, 0x10], 0x8000);
konami1Memory[0xfffe] = 0x80;
konami1Memory[0xffff] = 0x00;
const konami1 = createCpu('KONAMI1', {
  read: address => konami1Memory[address]!,
  write: (address, data) => { konami1Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
assert.equal(konami1.step(), 2);
assert.equal(konami1.get('m_d.b.h'), 0x42);
assert.equal(konami1.step(), 4);
assert.equal(konami1Memory[0x10], 0x42);
konami1.setIrqLine(true);
assert.equal(konami1.get('m_irq_line'), 1);
assert.equal(konami1.get('m_firq_line'), 0);

const indexedMemory = new Uint8Array(0x10000);
indexedMemory.set([0xec ^ 0x22, 0x64], 0x8000); // LDD 4,S
indexedMemory[0x6004] = 0x12;
indexedMemory[0x6005] = 0x34;
indexedMemory[0xfffe] = 0x80;
indexedMemory[0xffff] = 0x00;
const indexed = createCpu('KONAMI1', {
  read: address => indexedMemory[address]!,
  write: (address, data) => { indexedMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
indexed.set('m_s', 0x6000);
indexed.step();
assert.equal(indexed.get('m_d'), 0x1234, 'KONAMI1 must lower 6809 5-bit S-relative addressing');

const multiplyMemory = new Uint8Array(0x10000);
multiplyMemory[0x8000] = 0x3d ^ 0x22; // MUL
multiplyMemory[0xfffe] = 0x80;
multiplyMemory[0xffff] = 0x00;
const multiply = createCpu('KONAMI1', {
  read: address => multiplyMemory[address]!,
  write: (address, data) => { multiplyMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
multiply.set('m_d.b.h', 0x10);
multiply.set('m_d.b.l', 0x20);
multiply.step();
assert.equal(
  multiply.get('m_d'),
  0x0200,
  'KONAMI1 MUL must not truncate a 16-bit product through the 8-bit flag helper',
);

const cwaiMemory = new Uint8Array(0x10000);
cwaiMemory.set([0x3c ^ 0x22, 0xef], 0x8000); // CWAI #$EF: enable IRQ, then wait
cwaiMemory[0xfff8] = 0x90;
cwaiMemory[0xfff9] = 0x00;
cwaiMemory[0xfffe] = 0x80;
cwaiMemory[0xffff] = 0x00;
const cwai = createCpu('KONAMI1', {
  read: address => cwaiMemory[address]!,
  write: (address, data) => { cwaiMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
cwai.set('m_s', 0x6000);
cwai.step();
const cwaiStack = cwai.get('m_s');
cwai.setIrqLine(true);
cwai.step();
assert.equal(cwai.get('m_pc'), 0x9000, 'CWAI must evaluate and retain its pending IRQ vector');
assert.equal(cwai.get('m_s'), cwaiStack, 'CWAI wake-up must not push the state twice');

// MC6809 is the same 6809 core without KONAMI-1's opcode fetch transform:
// mc6809_device keeps mi_default and only adds the internal clock divider,
// which is a machine-configuration fact carried by the generated CPU schedule.
const mc6809Definition = compileMameMc6809(process.env.MAME_SRC ?? '../mame');
assert.equal(mc6809Definition.type, 'MC6809');
assert.equal(mc6809Definition.dialect, 'mame-m6809-lst');
assert.equal(mc6809Definition.summary.opcodes, konami1Definition.summary.opcodes);
assert.equal(mc6809Definition.summary.compiledOpcodes, mc6809Definition.summary.opcodes);
assert.equal(mc6809Definition.summary.diagnostics, 0);
assert.equal(mc6809Definition.opcodeDecrypt, undefined,
  'a plain MC6809 must not carry an opcode decryption table');
assert.ok(mc6809Definition.sourceFiles.includes('src/devices/cpu/m6809/m6809.lst'));
assert.ok(
  !mc6809Definition.sourceFiles.some(file => file.includes('konami1')),
  'MC6809 provenance must not reference the KONAMI-1 device',
);

clearGeneratedCpus();
registerGeneratedCpu(mc6809Definition);
const mc6809Memory = new Uint8Array(0x10000);
// LDA #$42 ; STA $1000 — plain opcodes, no decryption.
mc6809Memory.set([0x86, 0x42, 0xb7, 0x10, 0x00], 0x8000);
mc6809Memory[0xfffe] = 0x80;
mc6809Memory[0xffff] = 0x00;
const mc6809 = createCpu('MC6809', {
  read: address => mc6809Memory[address]!,
  write: (address, data) => { mc6809Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
mc6809.reset();
assert.equal(mc6809.get('m_pc'), 0x8000, 'MC6809 must start at the reset vector');
mc6809.step();
assert.equal(mc6809.get('m_d.b.h'), 0x42);
mc6809.step();
assert.equal(mc6809Memory[0x1000], 0x42, 'MC6809 extended store must reach the bus');


// --- LR35902 (Game Boy) -----------------------------------------------------
// MAME's Sharp core has no opcode DSL: 256 `case` labels live in two .hxx
// files included into `execute_run`'s switch, written against C preprocessor
// statement macros. These assertions cover the whole chain -- include
// resolution, macro expansion, lowering, emission -- by running real code.
const lr35902Definition = compileMameLr35902(process.env.MAME_SRC ?? '../mame');
assert.equal(lr35902Definition.type, 'LR35902');
assert.equal(lr35902Definition.summary.diagnostics, 0);
assert.ok(
  lr35902Definition.sourceFiles.includes('src/devices/cpu/lr35902/opc_main.hxx') &&
  lr35902Definition.sourceFiles.includes('src/devices/cpu/lr35902/opc_cb.hxx'),
  'the opcode includes are provenance, not an implementation detail',
);
// The interrupt vectors and the IE/IF state indices are enum members carrying
// /* ... */ comments; a parser that drops them also renumbers everything after.
assert.equal(lr35902Definition.constants.VBL_INT, 0);
assert.equal(lr35902Definition.constants.EXT_INT, 4);
assert.equal(lr35902Definition.constants.LR35902_IE, 12);
assert.equal(lr35902Definition.constants.LR35902_IF, 13);
// "PC" is the bare 16-bit m_PC, not a PAIR16 half: an 8-bit alias would
// silently truncate every register checkpoint read back through it.
assert.equal(lr35902Definition.aliases.PC?.member, 'm_PC');
assert.equal(lr35902Definition.aliases.PC?.bits, 16);
// A devcb is called through its member and configured through its accessor;
// the generated call must raise the signal the machine config binds.
assert.ok(
  generatedCpuExecutableSource(lr35902Definition).includes('"timer_cb"'),
  'the LR35902 must raise timer_cb, the name gb.cpp binds',
);

clearGeneratedCpus();
registerGeneratedCpu(lr35902Definition);
const lrMemory = new Uint8Array(0x10000);
lrMemory.set([
  0x3e, 0x42,             // LD A,$42
  0xea, 0x00, 0x10,       // LD ($1000),A
  0x06, 0x0f,             // LD B,$0f
  0x04,                   // INC B          -> B=0x10, half-carry set
  0xcb, 0x30,             // SWAP B         -> B=0x01
  0xaf,                   // XOR A          -> A=0, Z set
], 0x0000);
const lr35902 = createCpu('LR35902', {
  read: address => lrMemory[address]!,
  write: (address, data) => { lrMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
lr35902.reset();
assert.equal(lr35902.get('m_PC'), 0x0000, 'the LR35902 starts execution at zero');
// The core splits every instruction into a fetch half-step and an execute
// half-step, so one MAME instruction is two calls to step().
const instruction = (): void => { lr35902.step(); lr35902.step(); };
instruction();
assert.equal(lr35902.get('m_A'), 0x42, 'LD A,n8 must load its immediate');
instruction();
assert.equal(lrMemory[0x1000], 0x42, 'LD (n16),A must reach the bus');
instruction();
instruction();
assert.equal(lr35902.get('m_B'), 0x10, 'INC B must carry into the high nybble');
assert.equal(lr35902.get('m_F') & 0x20, 0x20, 'INC_8BIT sets H when the low nybble wraps');
instruction();
assert.equal(lr35902.get('m_B'), 0x01, 'CB-prefixed SWAP B must exchange nybbles');
instruction();
assert.equal(lr35902.get('m_A'), 0x00);
assert.equal(lr35902.get('m_F'), 0x80, 'XOR A leaves only Z set');

console.log('cpu-compiler.spec: 78 passed');
