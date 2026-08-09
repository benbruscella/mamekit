import assert from 'node:assert/strict';
import { compileDiscreteEffects } from '../mame/audio-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkongjr } from './dkongjr.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(dkongjr);
const graph = gameSourceGraph(dkongjr);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === dkongjr.machine.className &&
  node.props.name === dkongjr.machine.name);
assert.ok(machine);
const devices = graph.nodes.filter(node => node.label === 'Device');
assert.ok(devices.some(node => node.props.type === 'Z80' && node.props.tag === 'maincpu'));
assert.ok(devices.some(node => node.props.type === 'MB8884' && node.props.tag === 'soundcpu'));
assert.ok(devices.some(node => node.props.type === 'DISCRETE'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Donkey Kong Jr. video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
const audio = compileDiscreteEffects(
  mameSourceRoot(),
  [
    dkongjr.driver,
    ...graph.nodes
      .filter(node => node.label === 'SourceFile')
      .map(node => String(node.props.path)),
  ],
  'dkongjr_discrete',
);
assert.ok(audio, 'Donkey Kong Jr. discrete source must lower to executable audio IR');
const jump = audio.voices.find(voice => voice.node === audio.inputNodes.DS_SOUND1_INP);
assert.equal(jump?.mode, 'tone', 'the 74LS624 jump circuit must not become crash noise');
assert.equal(jump.network, 'dkongjr-jump');
assert.ok(jump.frequency >= 260 && jump.frequency <= 300);
assert.ok(jump.release >= 0.2 && jump.release <= 0.3);

console.log('dkongjr.spec: Z80, MB8884, discrete audio and video passed');
