import assert from 'node:assert/strict';
import { btime } from "./btime.game.ts";
import { assertGameContract, gameSourceGraph } from "./test-support.ts";

assertGameContract(btime);
const graph = gameSourceGraph(btime);
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'DECO_CPU7'));
// The DECO CPU-7 is m6502_device behind its own memory interface, compiled
// whole; device-cpu.spec runs its decrypt.

console.log('btime.game.spec: DECO CPU-7 board passed');
