import assert from 'node:assert/strict';
import {
  compileMameI8088,
  compileMameM68000,
  compileMameV30,
  compileMameZ8002,
  stripInactivePreprocessorBranches,
} from './cpu-compiler.ts';

const conditionalFixture = `
#if defined(DIRECT_FIXPOINT)
wrong_fixed();
#elif defined(SID_FPUENVE)
wrong_float();
#else
#if 0
wrong_nested();
#else
selected();
#endif
#endif
after();`;
assert.deepEqual(stripInactivePreprocessorBranches(conditionalFixture).trim().split(/\s*\n\s*/).filter(Boolean),
  ['selected();', 'after();']);
for (const [expression, expected] of [
  ['defined(DIRECT_FIXPOINT) && !defined(SID_FPUENVE)', 'no'],
  ['!!1 && 0', 'no'], ['0 && 0 && 1 || 1', 'yes'],
  ['(1 || 0) && 0', 'no'], ['!defined(A) && (0 || !defined(B))', 'yes'],
]) {
  assert.equal(stripInactivePreprocessorBranches(`#if ${expression}\nyes\n#else\nno\n#endif`).trim(), expected);
}
const unknownAlternative = '#if 0\na();\n#elif CONFIG_VALUE > 2\nb();\n#endif';
assert.equal(stripInactivePreprocessorBranches(unknownAlternative), unknownAlternative,
  'an unresolved alternative must survive for diagnostics');
import { generatedCpuExecutableSource } from './cpu-codegen.ts';
import {
  clearGeneratedCpus,
  createCpu,
  registerGeneratedCpu,
  type GeneratedCpuDefinition,
} from '../runtime/generated-cpu.ts';


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

// A segment override is one instruction spread across two generated steps:
// the prefix sets m_seg_prefix_next, then execute_run promotes it before the
// following opcode. Dropping that handoff makes ES:[SI] read through DS;
// R-Type then scans zeroed video RAM forever while trying to print its boot
// diagnostics and never releases the sound CPU from reset.
const i8088Memory = new Uint8Array(0x30000);
i8088Memory.set([0x26, 0xa0, 0x10, 0x00, 0x90], 0); // MOV AL,ES:[0010] ; NOP
i8088Memory[0x10010] = 0x5a;
i8088Memory[0x20010] = 0xa5;
const prefixedI8088 = createCpu('I8088', {
  read: address => i8088Memory[address] ?? 0,
  write: (address, data) => { i8088Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
prefixedI8088.set('m_sregs.0', 0x1000); // ES
prefixedI8088.set('m_sregs.1', 0); // CS
prefixedI8088.set('m_sregs.3', 0x2000); // DS
assert.ok(prefixedI8088.step() > 0);
assert.equal(prefixedI8088.get('m_seg_prefix_next'), 1);
assert.ok(prefixedI8088.step() > 0);
assert.equal(prefixedI8088.get('m_regs.b.0'), 0x5a);
assert.equal(prefixedI8088.get('m_seg_prefix_next'), 0);

// A vectored x86 interrupt asks the board for its vector when the CPU accepts
// the IRQ. Replacing standard_irq_callback with the reset-time m_int_vector
// sent every M72 PIC interrupt to vector zero and left R-Type on "ROM OK".
const irqMemory = new Uint8Array(0x10000);
irqMemory[0x20 * 4] = 0x00;
irqMemory[0x20 * 4 + 1] = 0x01;
irqMemory[0x100] = 0x90;
let i8088Acknowledgements = 0;
const vectoredI8088 = createCpu('I8088', {
  read: address => irqMemory[address] ?? 0,
  write: (address, data) => { irqMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
vectoredI8088.set('m_sregs.1', 0);
vectoredI8088.set('m_sregs.2', 0);
vectoredI8088.set('m_regs.w.4', 0x200);
vectoredI8088.set('m_ip', 0);
vectoredI8088.set('m_IF', 1);
vectoredI8088.setIrqLine(true, () => {
  i8088Acknowledgements++;
  return 0x20;
});
vectoredI8088.step();
assert.equal(i8088Acknowledgements, 1, 'I8088 IRQ service must call the live vector delegate');
assert.equal(vectoredI8088.get('m_ip'), 0x101);

// NEC did not retain the original 8086's undocumented 60/61 aliases for
// JO/JNO: V30 assigns those bytes to PUSHA/POPA. R-Type's first IRQ begins
// with PUSHA, so using the 8086 alias corrupts the return stack and sends the
// game back into its power-on diagnostics instead of starting attract mode.
const v30Definition = compileMameV30(process.env.MAME_SRC ?? '../mame');
assert.ok(v30Definition.sourceFiles.includes('src/devices/cpu/nec/necinstr.hxx'));
clearGeneratedCpus();
registerGeneratedCpu(v30Definition);
const v30Memory = new Uint8Array(0x10000);
v30Memory.set([0x60, 0x61], 0); // PUSHA ; POPA
const v30 = createCpu('V30', {
  read: address => v30Memory[address] ?? 0,
  write: (address, data) => { v30Memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
v30.set('m_sregs.1', 0);
v30.set('m_sregs.2', 0);
v30.set('m_regs.w.0', 0x1111);
v30.set('m_regs.w.1', 0x2222);
v30.set('m_regs.w.2', 0x3333);
v30.set('m_regs.w.3', 0x4444);
v30.set('m_regs.w.4', 0x0200);
v30.set('m_regs.w.5', 0x5555);
v30.set('m_regs.w.6', 0x6666);
v30.set('m_regs.w.7', 0x7777);
v30.step();
assert.equal(v30.get('m_regs.w.4'), 0x01f0, 'V30 PUSHA must push all eight words');
for (const index of [0, 1, 2, 3, 5, 6, 7]) v30.set(`m_regs.w.${index}`, 0);
v30.step();
assert.deepEqual(
  Array.from({ length: 8 }, (_, index) => v30.get(`m_regs.w.${index}`)),
  [0x1111, 0x2222, 0x3333, 0x4444, 0x0200, 0x5555, 0x6666, 0x7777],
  'V30 POPA must restore the PUSHA frame while discarding its saved SP word',
);

// On NEC parts c0/c1 are immediate-count shifts, not the original 8086's
// undocumented aliases for RET imm16 / RET. R-Type uses `c0 e1 02` in its
// first IRQ; the wrong decode consumes a return address and destroys SP.
const v30ShiftMemory = new Uint8Array(0x10000);
v30ShiftMemory.set([0xc0, 0xe0, 0x02, 0xc1, 0xe0, 0x04]);
const v30Shift = createCpu('V30', {
  read: address => v30ShiftMemory[address] ?? 0,
  write: (address, data) => { v30ShiftMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
v30Shift.set('m_sregs.1', 0);
v30Shift.set('m_regs.w.0', 1);
v30Shift.set('m_regs.w.4', 0x0200);
v30Shift.step();
assert.equal(v30Shift.get('m_regs.b.0'), 4, 'V30 c0 must shift a byte by its immediate count');
assert.equal(v30Shift.get('m_regs.w.4'), 0x0200, 'V30 c0 must not consume the return stack');
v30Shift.step();
assert.equal(v30Shift.get('m_regs.w.0'), 0x0040, 'V30 c1 must shift a word by its immediate count');

// NEC uses 0f as an opcode prefix rather than the original 8086's
// undocumented POP CS. R-Type executes 0f 20 (ADD4S) when the first alien
// wave starts awarding score; POP CS corrupts the code segment and re-enters
// the destructive power-on tests.
const v30BcdMemory = new Uint8Array(0x30000);
v30BcdMemory.set([0x0f, 0x20], 0);
v30BcdMemory.set([0x12, 0x34], 0x20010);
v30BcdMemory.set([0x87, 0x65], 0x10020);
const v30Bcd = createCpu('V30', {
  read: address => v30BcdMemory[address] ?? 0,
  write: (address, data) => { v30BcdMemory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
v30Bcd.set('m_sregs.0', 0x1000); // ES / NEC DS1
v30Bcd.set('m_sregs.1', 0); // CS
v30Bcd.set('m_sregs.3', 0x2000); // DS / NEC DS0
v30Bcd.set('m_regs.b.2', 3); // CL: two packed-BCD bytes
v30Bcd.set('m_regs.w.6', 0x0010); // SI / NEC IX
v30Bcd.set('m_regs.w.7', 0x0020); // DI / NEC IY
v30Bcd.step();
assert.equal(v30Bcd.get('m_ip'), 2, 'V30 ADD4S must consume the NEC subopcode');
assert.equal(v30Bcd.get('m_sregs.1'), 0, 'V30 0f must not pop CS');
assert.deepEqual([...v30BcdMemory.slice(0x10020, 0x10022)], [0x99, 0x99]);
assert.equal(v30Bcd.get('m_CarryVal'), 0);
assert.equal(v30Bcd.get('m_ZeroVal'), 1);



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
assert.match(irqAckSource, /typeof source === 'function' \? source\(\) : source/);
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

console.log('cpu-compiler.spec: 78 passed');
