import assert from 'node:assert/strict';
import { compileMameHandler } from '../mame/handler-ir.ts';
import {
  clearGeneratedCpus,
  createCpu,
  hasGeneratedCpu,
  registerGeneratedCpu,
  type GeneratedCpuDefinition,
} from './generated-cpu.ts';

const emptyProgram = { operations: [], diagnostics: [] };
const definition = (
  type: string,
  overrides: Partial<GeneratedCpuDefinition> = {},
): GeneratedCpuDefinition => ({
  type,
  constants: {
    ASSERT_LINE: 1,
    CLEAR_LINE: 0,
    INPUT_LINE_IRQ0: 0,
    INPUT_LINE_NMI: -1,
  },
  aliases: {},
  members: [],
  methods: [],
  start: emptyProgram,
  reset: emptyProgram,
  input: emptyProgram,
  service: emptyProgram,
  fetch: emptyProgram,
  opcodes: [],
  summary: { diagnostics: 0 },
  ...overrides,
});

// MAME's device_state_interface. A driver names a live register by the CPU
// family's enum, which is lowered with the rest of the CPU's constants and
// names each entry after the register it exposes.
registerGeneratedCpu(definition('stateful', {
  constants: {
    ASSERT_LINE: 1,
    CLEAR_LINE: 0,
    INPUT_LINE_IRQ0: 0,
    INPUT_LINE_NMI: -1,
    FIX_A: 2,
    FIX_HL: 13,
    // Not a register on this CPU, so it resolves to nothing rather than to a
    // register that happens to sit at the same index.
    FIX_IM: 20,
  },
  aliases: {
    A: { member: 'm_pair', part: 'high', bits: 8 },
    HL: { member: 'm_word', part: 'word', bits: 16 },
  },
  members: [{ name: 'm_pair', pair: true }, { name: 'm_word', bits: 16 }],
}));
const stateful = createCpu('stateful', {
  read: () => 0,
  write: () => {},
  in: () => 0,
  out: () => {},
});
stateful.set('HL', 0x1234);
stateful.set('A', 0x5a);
assert.equal(stateful.stateInt(13), 0x1234);
assert.equal(stateful.stateInt(2), 0x5a);
assert.equal(stateful.stateInt(20), 0);
assert.equal(stateful.stateInt(999), 0);

clearGeneratedCpus();
assert.equal(hasGeneratedCpu('fixture'), false);
assert.throws(
  () => createCpu('missing', {
    read: () => 0,
    write: () => {},
    in: () => 0,
    out: () => {},
  }),
  /was not registered/,
);
assert.throws(
  () => registerGeneratedCpu(definition('broken', {
    summary: { diagnostics: 1 },
  })),
  /1 compiler diagnostics/,
);

const memory = new Uint8Array(0x10000);
memory[0x1234] = 0x7f;
const writes: Array<[number, number]> = [];
const outputs: Array<[number, number]> = [];
registerGeneratedCpu(definition('fixture', {
  aliases: {
    A: { member: 'm_pair', part: 'high', bits: 8 },
    F: { member: 'm_pair', part: 'low', bits: 8 },
  },
  members: [
    { name: 'm_pair', pair: true },
    { name: 'm_byte', bits: 8 },
    { name: 'cycles', bits: 32 },
  ],
  methods: [{
    name: 'exercise_bus',
    parameters: '',
    program: compileMameHandler(`
      int value = READ(0x1234);
      WRITE(0x1235, value + 1);
      m_io.write_interruptible(0x45, value);
      return cycles;
    `),
  }],
  step: compileMameHandler('return 3;'),
}));
assert.equal(hasGeneratedCpu('FIXTURE'), true);
const cpu = createCpu('FiXtUrE', {
  read: address => memory[address]!,
  write: (address, data) => {
    writes.push([address, data]);
    memory[address] = data;
  },
  in: () => 0xff,
  out: (port, data) => outputs.push([port, data]),
});
cpu.set('A', 0x12);
cpu.set('F', 0x34);
assert.equal(cpu.get('m_pair.w'), 0x1234);
cpu.set('m_byte', 0x1ff);
assert.equal(cpu.get('m_byte'), 0xff);
assert.equal(cpu.invoke('exercise_bus'), 2);
assert.deepEqual(writes, [[0x1235, 0x80]]);
assert.deepEqual(outputs, [[0x45, 0x7f]]);
assert.equal(cpu.run(8), 9, 'run must stop after whole source-derived instructions');

const timing: [number, number][] = [];
const timedCpu = createCpu('FiXtUrE', {
  read: () => 0,
  write: () => {},
  in: () => 0,
  out: () => {},
  timing: (elapsed, target) => timing.push([elapsed, target]),
});
assert.equal(timedCpu.run(8), 9);
assert.deepEqual(timing, [[0, 8], [3, 8], [6, 8], [8, 8]]);

let acknowledgements = 0;
registerGeneratedCpu(definition('lazy_irq', {
  step: compileMameHandler('return standard_irq_callback();'),
}));
const irqCpu = createCpu('lazy_irq', {
  read: () => 0,
  write: () => {},
  in: () => 0,
  out: () => {},
});
irqCpu.setIrqLine(true, () => {
  acknowledgements++;
  return 0xd7;
}, true);
assert.equal(acknowledgements, 0, 'IRQ data must remain lazy until acknowledge');
assert.equal(irqCpu.step(), 0xd7);
assert.equal(acknowledgements, 1);

let delegated = 0;
registerGeneratedCpu({
  type: 'delegated',
  summary: { diagnostics: 0 },
  create: () => {
    delegated++;
    return cpu;
  },
});
assert.equal(createCpu('DELEGATED', {
  read: () => 0,
  write: () => {},
  in: () => 0,
  out: () => {},
}), cpu);
assert.equal(delegated, 1);

clearGeneratedCpus();
assert.equal(hasGeneratedCpu('fixture'), false);

console.log('generated-cpu.spec: registration, bus, state_int, IRQ and internal I/O passed');
