import assert from 'node:assert/strict';
import { compileMameVideo } from "../mame/video-compiler.ts";
import { compileMameDevice } from "../mame/device-compiler.ts";
import { indexMameHardware } from "../mame/hardware.ts";
import { bzone } from "./bzone.game.ts";
import { assertGameContract, gameSourceGraph, mameSourceRoot } from "./test-support.ts";

assertGameContract(bzone);
const graph = gameSourceGraph(bzone);
const machine = graph.nodes.find(node => node.label === 'MachineConfig' &&
  node.props.cls === bzone.machine.className && node.props.name === 'bzone_base');
assert.ok(machine);
// `avg.set_memory(m_maincpu, AS_PROGRAM, 0x2000)` keeps its tag and space.
const avg = graph.nodes.find(node => node.label === 'Device' && node.props.tag === 'avg');
assert.deepEqual(avg?.props.configCalls, ['set_vector("vector")', 'set_memory("maincpu",0,8192)']);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.deepEqual(video?.plan.vector, { type: 'device', generator: 'avg' });

const hardware = indexMameHardware(mameSourceRoot());
const generator = compileMameDevice(mameSourceRoot(), hardware.get('AVG_BZONE')!, 'AVG_BZONE');
assert.ok(generator.methods.every(method => !method.program.diagnostics.length));
// The beam's colour is vector.h's static helper, reached from another class.
assert.ok(generator.methods.some(method => method.name === 'vector_device::color111'));
// `vgvector m_vectbuf[MAXVECT]` is an array of structs with all seven fields.
const buffer = generator.members.find(member => member.name === 'm_vectbuf');
assert.equal(buffer?.arrayLength, 10000);
assert.deepEqual(buffer?.fields?.map(field => field.name),
  ['x', 'y', 'color', 'intensity', 'arg1', 'arg2', 'status']);
// The mathbox's shared tails are entered by goto from other commands.
const mathbox = compileMameDevice(mameSourceRoot(), hardware.get('MATHBOX')!, 'MATHBOX');
assert.ok(mathbox.methods.every(method => !method.program.diagnostics.length));

console.log('bzone.game.spec: vector generator, mathbox and vector plan passed');
