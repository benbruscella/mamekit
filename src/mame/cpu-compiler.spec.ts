import assert from 'node:assert/strict';
import { compileMameI8080, compileMameZ80 } from './cpu-compiler.ts';
import { generatedCpuExecutableSource } from './cpu-codegen.ts';
import {
  clearGeneratedCpus,
  createCpu,
  registerGeneratedCpu,
  type GeneratedCpuDefinition,
} from '../runtime/generated-cpu.ts';

const definition = compileMameZ80(process.env.MAME_SRC ?? '../mame');
assert.equal(definition.summary.opcodes, 1536);
assert.equal(definition.summary.compiledOpcodes, 1536);
assert.equal(definition.summary.diagnostics, 0);
assert.ok(definition.methods.some(method => method.name === 'get_f'));
assert.ok(definition.methods.some(method => method.name === 'm_f.pv'));
assert.equal(definition.sourceFiles.includes('src/devices/cpu/z80/z80.lst'), true);

clearGeneratedCpus();
registerGeneratedCpu(definition);
const memory = new Uint8Array(0x10000);
memory.set([0x3e, 0x7f, 0xc6, 0x01, 0xcb, 0x07]);
const cpu = createCpu('Z80', {
  read: address => memory[address]!,
  write: (address, data) => { memory[address] = data; },
  in: () => 0xff,
  out: () => {},
});
assert.equal(cpu.step(), 7);
assert.equal(cpu.get('A'), 0x7f);
assert.equal(cpu.step(), 7);
assert.equal(cpu.get('A'), 0x80);
assert.equal(cpu.invoke('get_f'), 0x94);
assert.equal(cpu.step(), 8);
assert.equal(cpu.get('A'), 0x01);

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

console.log('cpu-compiler.spec: 16 passed');
