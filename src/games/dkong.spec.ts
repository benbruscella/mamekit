import assert from 'node:assert/strict';
import { compileDiscreteEffects } from '../mame/audio-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkong } from './dkong.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(dkong);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === dkong.machine.className &&
  node.props.name === dkong.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'I8257', 'MB8884', 'DISCRETE']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
const audio = compileDiscreteEffects(
  mameSourceRoot(),
  [
    dkong.driver,
    ...graph.nodes
      .filter(node => node.label === 'SourceFile')
      .map(node => String(node.props.path)),
  ],
  'dkong2b_discrete',
);
assert.ok(audio);
assert.equal(audio.type, 'DISCRETE_EFFECTS');
assert.equal(audio.inputNodes.DS_DAC, 7);
assert.equal(audio.inputNodes.DS_SOUND0_INP, 1);
assert.equal(audio.voices.length, 3);
assert.ok(audio.voices.some(voice => voice.mode === 'noise'));
assert.ok(audio.voices.some(voice => voice.mode === 'tone'));
assert.ok(audio.dac.filterFrequency > 1_500 && audio.dac.filterFrequency < 2_500);

console.log('dkong.spec: DMA, MCS-48 sound and Nintendo video passed');
