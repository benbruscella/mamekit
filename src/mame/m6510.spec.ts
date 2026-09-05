import assert from 'node:assert/strict';
import ts from 'typescript';
import { compileMameM6510 } from './cpu-compiler.ts';
import { generatedCpuExecutableSource } from './cpu-codegen.ts';
import { clearGeneratedCpus, registerGeneratedCpu, createCpu } from '../runtime/generated-cpu.ts';

const definition = compileMameM6510(process.env.MAME_SRC ?? '../mame');
assert.equal(definition.summary.compiledOpcodes, 256);
assert.equal(definition.summary.diagnostics, 0);
assert.deepEqual(definition.callbacks, { m_read_port: 'read_callback', m_write_port: 'write_callback' });
assert.ok(definition.sourceFiles.includes('src/devices/cpu/m6502/om6510.lst'));
const js = ts.transpileModule(generatedCpuExecutableSource(definition), {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const emitted = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);

for (const implementation of [definition, emitted.default]) {
  clearGeneratedCpus();
  registerGeneratedCpu(implementation);
  const memory = new Uint8Array(65536);
  memory[0xfffc] = 0x00;
  memory[0xfffd] = 0x80;
  const writes: [number, number][] = [];
  const signals: [string, number][] = [];
  const reads: number[] = [];
  const cpu = createCpu('M6510', {
    read: address => { reads.push(address); return memory[address]!; },
    write: (address, value) => { writes.push([address, value]); memory[address] = value; },
    in: () => 0, out: () => {},
    signal: (name, value) => {
      signals.push([name, value]);
      return name === 'read_callback' ? 0x17 : 0;
    },
  });
  assert.equal(cpu.get('m_PC'), 0x8000);
  assert.equal(cpu.invoke('dir_r'), 0xff);
  assert.equal(cpu.invoke('get_port'), 0xff);
  cpu.invoke('set_pulls', 0x17, 0xc8);
  cpu.invoke('memory_write', 0, 0);
  assert.deepEqual(writes.at(-1), [0, 0], 'port accesses still reach the external bus');
  assert.deepEqual(signals.at(-1), ['write_callback', 0x17]);
  assert.equal(cpu.invoke('memory_read', 0), 0);
  assert.equal(reads.at(-1), 0, 'port reads retain the external bus side effect');
  assert.equal(cpu.invoke('memory_read', 1), 0xdf, 'floating pins retain the previous drive');
  cpu.invoke('memory_write', 0, 0xff);
  cpu.invoke('memory_write', 1, 0x35);
  assert.equal(cpu.invoke('memory_arg', 1), 0x35);
  assert.equal(cpu.invoke('memory_opcode', 1), 0x35);
  cpu.invoke('memory_write', 0, 0);
  assert.equal(cpu.invoke('memory_read', 1), 0x17);

  // Exercise the actual opcode path, including direction-register addressing.
  memory.set([0xa9, 0x2f, 0x85, 0x00, 0xa9, 0x37, 0x85, 0x01, 0xa5, 0x00], 0x8000);
  cpu.set('m_PC', 0x8000);
  for (let instruction = 0; instruction < 5; instruction++) cpu.step();
  assert.equal(cpu.get('m_A'), 0x2f);
  assert.deepEqual(writes.slice(-2), [[0, 0x2f], [1, 0x37]]);
  // The 6510's undocumented ANE uses MAME's C64-specific 0xee mask.
  memory.set([0x8b, 0xff], 0x8100);
  cpu.set('m_PC', 0x8100);
  cpu.set('m_A', 0);
  cpu.set('m_X', 0xff);
  cpu.step();
  assert.equal(cpu.get('m_A'), 0xee);
  cpu.reset();
  assert.equal(cpu.invoke('get_port'), 0xff);
  assert.equal(cpu.get('m_PC'), 0x8000);
}
console.log('m6510.spec: emitted and interpreted port, bus, reset and opcode behavior passed');
