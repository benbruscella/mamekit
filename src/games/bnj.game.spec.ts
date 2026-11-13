import assert from 'node:assert/strict';
import { bnj } from "./bnj.game.ts";
import { assertGameContract, gameSourceGraph } from "./test-support.ts";

assertGameContract(bnj);
const graph = gameSourceGraph(bnj);
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'DECO_C10707'));
// The C10707 is m6502_device behind its own memory interface, compiled whole;
// device-cpu.spec runs its opcode swap.
// `m_screen->set_visarea(0*8, 32*8-1, 1*8, 31*8-1)` over BurgerTime's raw
// screen: the patch reaches the graph for the generator to apply.
const patches = graph.nodes
  .filter(node => node.label === 'MachineConfig' && node.props.name === 'bnj')
  .flatMap(node => (node.props.devicePatches as string[] | undefined) ?? [])
  .map(raw => JSON.parse(raw) as { tag: string; config: string[] });
assert.ok(patches.some(patch => patch.tag === 'screen' &&
  patch.config.some(line => line.includes('set_visarea'))));

console.log('bnj.game.spec: DECO C10707 and visible-area patch passed');
