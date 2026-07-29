import {
  generatedBoardSource,
  inferredMemberIndexRank,
  lowerAudioRoutes,
  lowerGeneratedMachine,
} from './emit-machine.ts';
import type { KnowledgeGraph } from '../kg/types.ts';
import type { BoardConfig } from '../runtime/types.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';

const graph: KnowledgeGraph = {
  meta: {
    tool: 'mamekit',
    version: 'test',
    mameSrc: '',
    driverFile: 'src/mame/test.cpp',
    generatedAt: '',
  },
  nodes: [{
    id: 'callback:test',
    label: 'Callback',
    props: {
      ownerTag: 'latch',
      signal: 'q_out_cb',
      slot: '3',
      operation: 'set',
      targetTag: 'sub',
      inputLine: 'INPUT_LINE_RESET',
      transforms: ['invert'],
      sourceFile: 'src/mame/test.cpp',
      sourceLine: 42,
    },
  }, {
    id: 'device:ay0',
    label: 'Device',
    props: {
      type: 'AY8910',
      tag: 'ay.0',
      config: ['AY8910(config, m_ay[0], 1000000)'],
    },
  }, {
    id: 'callback:vector',
    label: 'Callback',
    props: {
      ownerTag: 'maincpu',
      signal: 'set_irq_acknowledge_callback',
      operation: 'set_irq_acknowledge_callback',
      targetClass: 'test_state',
      targetMethod: 'vector_r',
    },
  }, {
    id: 'handler:vector_r',
    label: 'Handler',
    props: {
      ownerClass: 'test_state',
      method: 'vector_r',
      sourceBody: 'return m_vector;',
    },
  }, {
    id: 'handler:vector_w',
    label: 'Handler',
    props: {
      ownerClass: 'test_state',
      method: 'vector_w',
      sourceBody: 'm_vector = data;',
    },
  }],
  edges: [],
};

const board: BoardConfig = {
  family: 'test',
  cpus: [{
    tag: 'maincpu',
    clock: 1_000_000,
    region: 'maincpu',
    io: {
      ranges: [{
        start: 0,
        end: 0,
        kind: 'handler',
        write: 'test_state.vector_w',
      }],
    },
  }, {
    // The fixture callback drives this CPU's reset line; a board that wires a
    // line to an undeclared CPU is exactly what connection lowering rejects.
    tag: 'sub',
    clock: 1_000_000,
    region: 'sub',
  }],
  ranges: [],
  screen: { width: 256, height: 224, refresh: 60, vtotal: 256, vbstart: 240, rotate: 0 },
  clocks: { namco06: 48_000, wsg: 96_000 },
};
const machine = lowerGeneratedMachine(graph, 'test', 'test', board);
if (machine.callbacks[0]?.slot !== 3) throw new Error('slot should lower to a number');
if (machine.callbacks[0]?.source?.line !== 42) throw new Error('source provenance missing');
const reset = machine.connections[0];
if (reset?.effect.kind !== 'cpu-line' || reset.effect.line !== 'reset' || reset.effect.tag !== 'sub') {
  throw new Error('INPUT_LINE_RESET should lower to a typed cpu-line effect');
}
if (reset.callbackId !== machine.callbacks[0]?.id) {
  throw new Error('connection lost its callback provenance');
}
if (machine.execution.cpus[0]?.clock !== 1_000_000) throw new Error('execution plan missing CPU clock');
if (machine.execution.cpus[0]?.interruptVectorWriters?.[0] !== 'test_state.vector_w') {
  throw new Error('interrupt-vector writer relation was not lowered from handler IR');
}
if (machine.devices?.find(device => device.tag === 'ay.0')?.member !== 'm_ay[0]') {
  throw new Error('device-array members must retain their finder index');
}
const source = generatedBoardSource(machine);
if (!source.includes('decodeBoardIr(')) {
  throw new Error('generated module asserts its IR instead of decoding it');
}
if (!source.includes('src/mame/test.cpp')) throw new Error('generated module lost source provenance');
if (!source.includes("from './board.json' with { type: 'json' }")) {
  throw new Error('generated board does not import board JSON');
}
if (source.includes('JSON.parse')) throw new Error('generated board embeds machine JSON');

const allYmOutputsGraph: KnowledgeGraph = {
  meta: graph.meta,
  nodes: [{
    id: 'device:ym1',
    label: 'Device',
    props: { type: 'YM2203', tag: 'ym1', config: [] },
  }, {
    id: 'route:ym1/all',
    label: 'AudioRoute',
    props: { output: 'ALL_OUTPUTS', target: 'mono', gain: 0.15 },
  }],
  edges: [{ from: 'device:ym1', to: 'route:ym1/all', rel: 'HAS_AUDIO_ROUTE' }],
};
const allYmOutputs = lowerAudioRoutes(
  allYmOutputsGraph,
  [{ id: 'device:ym1', tag: 'ym1' }],
);
if (
  allYmOutputs.length !== 4 ||
  allYmOutputs.some((route, channel) => route.channel !== channel || route.gain !== 0.15)
) {
  throw new Error('YM2203 ALL_OUTPUTS did not expand to all four routed streams');
}

const filterHandlers = [
  {
    id: 'flat',
    ownerClass: 'flat_state',
    method: 'filter_w',
    program: compileMameHandler('m_filter[i]->filter_rc_set_RC(0, 1, 2, 3, 4);'),
  },
  {
    id: 'matrix',
    ownerClass: 'matrix_state',
    method: 'filter_w',
    program: compileMameHandler('m_filter[bank][channel]->filter_rc_set_RC(0, 1, 2, 3, 4);'),
  },
];
if (inferredMemberIndexRank([filterHandlers[0]!], 'm_filter') !== 1) {
  throw new Error('flat MAME device arrays must retain one-dimensional filter layout');
}
if (inferredMemberIndexRank([filterHandlers[1]!], 'm_filter') !== 2) {
  throw new Error('matrix MAME device arrays must retain two-dimensional filter layout');
}

console.log('emit-machine.spec: callbacks, provenance, IR and filter rank passed');
