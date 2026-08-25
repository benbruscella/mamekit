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

const internalSignals: Array<[string, number]> = [];
registerGeneratedCpu(definition('internal_io', {
  members: [{ name: 'm_dataptr', bits: 8, values: new Array(128).fill(0) }],
  methods: [{
    name: 'internal_round_trip',
    parameters: '',
    program: compileMameHandler(`
      ram_w(0x81, 0x1ff);
      port_w(1, ram_r(1));
      return ram_r(0x81);
    `),
  }],
}));
const internalCpu = createCpu('internal_io', {
  read: () => 0,
  write: () => {},
  in: () => 0,
  out: () => {},
  signal: (name, state) => {
    internalSignals.push([name, state]);
    return 0;
  },
});
assert.equal(internalCpu.invoke('internal_round_trip'), 0xff);
assert.deepEqual(internalSignals, [['p1_out_cb', 0xff]]);

const handshakeSignals: Array<[string, number]> = [];
registerGeneratedCpu(definition('internal_handshake', {
  internal: {
    ram: [],
    ports: [{
      dataAddress: 0x06,
      directionAddress: 0x04,
      inputSignal: 'in_p3_cb',
      outputSignal: 'out_p3_cb',
      outputMask: 0xff,
    }],
    portHandshake: {
      portIndex: 0,
      controlAddress: 0x0f,
      inputLine: 2,
      latchEnableMask: 0x08,
      outputSelectMask: 0x10,
      flagMask: 0x80,
    },
  },
  methods: [
    {
      name: 'enable_handshake',
      parameters: '',
      program: compileMameHandler('WRITE(0x0f, 0x08);'),
    },
    {
      name: 'read_handshake',
      parameters: '',
      program: compileMameHandler(`
        int status = READ(0x0f);
        int data = READ(0x06);
        return (status << 8) | data;
      `),
    },
    {
      name: 'read_status',
      parameters: '',
      program: compileMameHandler('return READ(0x0f);'),
    },
    {
      name: 'write_while_input',
      parameters: '',
      program: compileMameHandler('WRITE(0x06, 0x12);'),
    },
  ],
}));
const handshakeCpu = createCpu('internal_handshake', {
  read: () => 0,
  write: () => {},
  in: () => 0,
  out: () => {},
  signal: (name, state) => {
    if (name === 'in_p3_cb') return 0x5a;
    handshakeSignals.push([name, state]);
    return 0;
  },
});
handshakeCpu.invoke('enable_handshake');
handshakeCpu.setInputLine(2, 1);
handshakeCpu.setInputLine(2, 0);
assert.equal(handshakeCpu.invoke('read_handshake'), 0x885a);
assert.equal(handshakeCpu.invoke('read_status'), 0x08);
handshakeCpu.invoke('write_while_input');
assert.deepEqual(handshakeSignals, [['out_p3_cb', 0xff]]);

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
