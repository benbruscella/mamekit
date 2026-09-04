import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { qbert } from './qbert.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(qbert);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === qbert.machine.className &&
  node.props.name === qbert.machine.name);
assert.ok(machine);

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Q*bert MAME video source must lower to executable video IR');
assert.equal(video.plan.initialState.m_gfxcharlo, 1);
assert.equal(video.plan.initialState.m_gfxcharhi, 1);
assert.deepEqual(video.plan.initialState.resistances, [2000, 1000, 470, 240]);
assert.deepEqual(video.plan.initialState.m_weights, [0, 0, 0, 0]);
assert.ok(video.handlers.every(handler =>
  !handler.program || handler.program.diagnostics.length === 0));

console.log('qbert.spec: source machine and initialized video contract passed');
