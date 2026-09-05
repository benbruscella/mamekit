import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { tutankhm } from './tutankhm.game.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(tutankhm);
const graph = gameSourceGraph(tutankhm);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === tutankhm.machine.className &&
  node.props.name === tutankhm.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.ok(types.includes('MC6809E'));
assert.ok(types.includes('Z80'));
assert.equal(types.filter(type => type === 'AY8910').length, 2);
const playerOneTypes = graph.edges
  .filter(edge => edge.rel === 'HAS_FIELD' && edge.from.startsWith('inputs:tutankhm/IN1'))
  .map(edge => graph.nodes.find(node => node.id === edge.to)?.props.type)
  .filter(Boolean);
assert.ok(playerOneTypes.includes('IPT_JOYSTICK_RIGHT'));
assert.ok(playerOneTypes.includes('IPT_JOYSTICKRIGHT_RIGHT'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Tutankham packed bitmap source must lower to executable video IR');
assert.ok(video.plan.bitmap);
assert.equal(video.plan.bitmap.member, 'm_videoram');
assert.equal(
  video.plan.bitmap.bytesPerRow * (8 / (video.plan.bitmap.bitsPerPixel ?? 1)),
  tutankhm.screen.width,
  'packed framebuffer width must describe the native raster, not the x3 pixel clock',
);

console.log('tutankhm.spec: MC6809E, Z80, dual AY8910 and bitmap video passed');
