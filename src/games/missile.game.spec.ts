import assert from 'node:assert/strict';
import { missile } from "./missile.game.ts";
import { assertGameContract, gameSourceGraph } from "./test-support.ts";

assertGameContract(missile);
const graph = gameSourceGraph(missile);
// `m_mainmap->set_map(&missile_state::missile_map)`: the bank device's space
// is a map of its own, reached from the device like a CPU's program map.
const bank = graph.nodes.find(node => node.label === 'Device' && node.props.type === 'ADDRESS_MAP_BANK');
assert.ok(bank);
assert.ok(graph.edges.some(edge => edge.from === bank.id && edge.rel === 'HAS_MAP' &&
  edge.to === 'map:missile_state.missile_map' && edge.props?.space === 'AS_PROGRAM'));
// The scanline IRQ and CPU-speed timers are allocated and first armed in
// machine_start, with real callbacks nothing else reaches.
const machine = graph.nodes.find(node => node.label === 'MachineConfig' && node.props.name === 'missile');
const armed = (machine?.props.armedTimers as string[] | undefined) ?? [];
assert.ok(armed.includes('m_irq_timer=missile_state.clock_irq@missile_state.machine_start'));
assert.ok(armed.includes('m_cpu_timer=missile_state.adjust_cpu_speed@missile_state.machine_start'));

console.log('missile.game.spec: bank device map and armed driver timers passed');
