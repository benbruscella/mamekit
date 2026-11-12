import assert from 'node:assert/strict';
import {
  compileMameM68000,
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
