import assert from 'node:assert/strict';
import { compileMameM6502MemoryInterface } from "../mame/cpu-compiler.ts";
import { btime } from "./btime.game.ts";
import { assertGameContract, gameSourceGraph, mameSourceRoot } from "./test-support.ts";

assertGameContract(btime);
const graph = gameSourceGraph(btime);
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'DECO_CPU7'));
// The DECO CPU-7 is the stock 6502 behind its own memory interface: a write
// arms the next opcode fetch's bitswap, which read_sync applies and clears.
const cpu = compileMameM6502MemoryInterface(mameSourceRoot(), 'DECO_CPU7');
assert.equal(cpu.summary.diagnostics, 0);
assert.ok(cpu.members.some(member => member.name === 'm_had_written' && member.bits === 1));
const opcode = cpu.methods.find(method => method.name === 'memory_opcode');
assert.ok(opcode && JSON.stringify(opcode.program).includes('bitswap_8'));
const write = cpu.methods.find(method => method.name === 'memory_write');
assert.ok(write && JSON.stringify(write.program).includes('m_had_written'));
// device_reset clears the latch before the operation-list reset runs.
assert.equal(cpu.reset.operations[0]?.op, 'assign');

console.log('btime.game.spec: DECO CPU-7 memory interface passed');
