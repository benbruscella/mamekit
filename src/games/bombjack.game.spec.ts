import assert from 'node:assert/strict';
import { compileMameVideo } from "../mame/video-compiler.ts";
import { bombjack } from "./bombjack.game.ts";
import { assertGameContract, gameSourceGraph, mameSourceRoot } from "./test-support.ts";

assertGameContract(bombjack);
const graph = gameSourceGraph(bombjack);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === bombjack.machine.className &&
  node.props.name === bombjack.machine.name);
assert.ok(machine);
// The sound board, screen and PSGs are built by the templated
// `bombjack_base(config, AY8910)`, which must expand at its call site.
const devices = graph.nodes.filter(node => node.label === 'Device').map(node => String(node.props.type));
assert.equal(devices.filter(type => type === 'Z80').length, 2);
assert.equal(devices.filter(type => type === 'AY8910').length, 3);
// RAM, video, palette and the NMI enable arrive through the owner-class
// submap `map(0x8000, 0xbfff).m(FUNC(bombjack_state::program_map))`.
assert.ok(graph.nodes.some(node =>
  node.label === 'AddressRange' && node.props.start === 0xb000 &&
  graph.edges.some(edge => edge.from === node.id && edge.rel === 'WRITES' &&
    edge.to === 'handler:bombjack_state.nmi_on_w')));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Bomb Jack video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
// `static inline constexpr u16 HTOTAL = 384, HBSTART = 256, HBEND = 0;` bounds
// the sprite loop; a lost declarator draws no sprites at all.
const sprites = video.handlers.find(handler => handler.method === 'draw_sprites');
assert.deepEqual(sprites?.constants, { HTOTAL: 384, VBSTART: 240 });

console.log('bombjack.game.spec: templated config, owner submap and sprite constants passed');
