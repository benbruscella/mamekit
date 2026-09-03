import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseM6809Dsl } from './m6809-dsl.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const directory = join(mameSrc, 'src/devices/cpu/m6809');
const source = readFileSync(join(directory, 'm6809.lst'), 'utf8');
const base = readFileSync(join(directory, 'base6x09.lst'), 'utf8');
const dsl = parseM6809Dsl(source, base);

assert.equal(dsl.opcodes.length, 766);
assert.equal(new Set(dsl.opcodes.map(opcode => opcode.key)).size, 766);
assert.match(dsl.opcodes.find(opcode => opcode.key === '8600')!.source, /read_operand/);
assert.match(dsl.opcodes.find(opcode => opcode.key === '1026')!.source, /branch_taken/);
assert.doesNotMatch(dsl.opcodes.find(opcode => opcode.key === 'bd00')!.source, /%|goto/);
assert.ok(dsl.blocks.has('INDEXED'));
assert.ok(dsl.blocks.has('INTERRUPT_VECTOR'));

const konamiSource = readFileSync(join(directory, 'konami.lst'), 'utf8')
  .replace(/^MAIN:\s*$/m, 'DISPATCH01:') + `
DISPATCH10:
  switch(m_opcode) { default: %ILLEGAL; return; }
DISPATCH11:
  switch(m_opcode) { default: %ILLEGAL; return; }
`;
const konami = parseM6809Dsl(konamiSource, base, true);
assert.equal(konami.opcodes.length, 256);
assert.match(konami.opcodes.find(opcode => opcode.key === '1000')!.source, /read_operand/);
assert.match(konami.opcodes.find(opcode => opcode.key === '1100')!.source, /read_operand/);

console.log('m6809-dsl.spec: 9 passed');
