import {
  generatedBoardSource,
  generatedCpuCycleClock,
  inferredMemberIndexRank,
  lowerAudioRoutes,
  lowerAuxiliaryAudioDevices,
  lowerGeneratedMachine,
} from './emit-machine.ts';

for (const type of ['m6802', 'm6803', 'nsc8105', 'm6801u4', 'mc6809']) {
  if (generatedCpuCycleClock(type, 4_000_000) !== 1_000_000) {
    throw new Error(`${type} must use MAME's divide-by-four execution clock`);
  }
}
if (generatedCpuCycleClock('mc6809e', 1_000_000) !== 1_000_000) {
  throw new Error('externally-clocked MC6809E must retain its configured execution clock');
}
for (const type of ['i8039', 'mb8884']) {
  if (generatedCpuCycleClock(type, 6_000_000) !== 400_000) {
    throw new Error(`${type} must use MAME's divide-by-fifteen execution clock`);
  }
}
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
    id: 'game:test',
    label: 'Game',
    props: {},
  }, {
    id: 'callback:config-screen',
    label: 'Callback',
    props: {
      ownerTag: 'screen',
      signal: 'set_screen_update',
      operation: 'set_screen_update',
      targetClass: 'test_state',
      targetMethod: 'screen_update',
    },
  }, {
    id: 'machine:test',
    label: 'MachineConfig',
    props: {},
  }, {
    id: 'handler:screen_update',
    label: 'Handler',
    props: {
      ownerClass: 'test_state',
      method: 'screen_update',
      sourceBody: 'return 0;',
    },
  }, {
    id: 'device:maincpu',
    label: 'Device',
    props: { type: 'Z80', tag: 'maincpu', clock: 1_000_000, config: [] },
  }, {
    id: 'device:sub',
    label: 'Device',
    props: { type: 'Z80', tag: 'sub', clock: 1_000_000, config: [] },
  }, {
    id: 'device:latch',
    label: 'Device',
    props: { type: 'LS259', tag: 'latch', clock: 0, config: [] },
  }, {
    id: 'device:screen',
    label: 'Device',
    props: { type: 'SCREEN', tag: 'screen', clock: 0, config: [] },
  }, {
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
    id: 'device:dma',
    label: 'Device',
    props: {
      type: 'I8257',
      tag: 'dma',
      config: [
        'I8257(config, m_dma, 1000000)',
        'm_dma->out_hrq_cb().set_inputline(m_maincpu, Z80_INPUT_LINE_BUSREQ)',
        'm_dma->set_reverse_rw_mode(true)',
      ],
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
    id: 'callback:periodic',
    label: 'Callback',
    props: {
      ownerTag: 'maincpu',
      signal: 'set_periodic_int',
      operation: 'set_periodic_int',
      targetMethod: 'irq0_line_hold',
      periodHz: 36.62109375,
    },
  }, {
    id: 'callback:vblank-hold',
    label: 'Callback',
    props: {
      ownerTag: 'screen',
      signal: 'screen_vblank',
      operation: 'set_inputline',
      targetTag: 'maincpu',
      inputLine: 'INPUT_LINE_IRQ0',
      raw: 'm_screen->screen_vblank().set_inputline(m_maincpu, INPUT_LINE_IRQ0, HOLD_LINE)',
    },
  }, {
    id: 'callback:vblank-level',
    label: 'Callback',
    props: {
      ownerTag: 'screen',
      signal: 'screen_vblank',
      operation: 'set_inputline',
      targetTag: 'sub',
      inputLine: 'INPUT_LINE_IRQ0',
      raw: 'm_screen->screen_vblank().set_inputline(m_sub, INPUT_LINE_IRQ0)',
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
  edges: [
    { from: 'game:test', to: 'machine:test', rel: 'USES_MACHINE' },
    { from: 'machine:test', to: 'device:maincpu', rel: 'HAS_DEVICE' },
    { from: 'machine:test', to: 'device:sub', rel: 'HAS_DEVICE' },
    { from: 'machine:test', to: 'device:latch', rel: 'HAS_DEVICE' },
    { from: 'machine:test', to: 'device:screen', rel: 'HAS_DEVICE' },
    { from: 'machine:test', to: 'device:dma', rel: 'HAS_DEVICE' },
    { from: 'machine:test', to: 'device:ay0', rel: 'HAS_DEVICE' },
    { from: 'machine:test', to: 'callback:config-screen', rel: 'HAS_CALLBACK' },
    { from: 'device:latch', to: 'callback:test', rel: 'HAS_CALLBACK' },
    { from: 'device:maincpu', to: 'callback:vector', rel: 'HAS_CALLBACK' },
    { from: 'device:maincpu', to: 'callback:periodic', rel: 'HAS_CALLBACK' },
    { from: 'device:screen', to: 'callback:vblank-hold', rel: 'HAS_CALLBACK' },
    { from: 'device:screen', to: 'callback:vblank-level', rel: 'HAS_CALLBACK' },
    { from: 'callback:test', to: 'device:sub', rel: 'TARGETS_DEVICE' },
    { from: 'callback:vblank-hold', to: 'device:maincpu', rel: 'TARGETS_DEVICE' },
    { from: 'callback:vblank-level', to: 'device:sub', rel: 'TARGETS_DEVICE' },
  ],
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
if (
  !machine.callbacks.some(callback => callback.id === 'callback:config-screen') ||
  machine.execution.screenUpdate?.handler !== 'test_state.screen_update'
) {
  throw new Error('callbacks patched onto a reachable machine config must be executable');
}
const testCallback = machine.callbacks.find(callback => callback.id === 'callback:test');
if (testCallback?.slot !== 3) throw new Error('slot should lower to a number');
if (testCallback.source?.line !== 42) throw new Error('source provenance missing');
const reset = machine.connections.find(connection => connection.callbackId === 'callback:test');
if (machine.connections.some(connection => connection.callbackId === 'callback:config-screen')) {
  throw new Error('screen-update selection must not be lowered as a dispatched board effect');
}
if (reset?.effect.kind !== 'cpu-line' || reset.effect.line !== 'reset' || reset.effect.tag !== 'sub') {
  throw new Error('INPUT_LINE_RESET should lower to a typed cpu-line effect');
}
if (reset.callbackId !== testCallback.id) {
  throw new Error('connection lost its callback provenance');
}
if (machine.execution.cpus[0]?.clock !== 1_000_000) throw new Error('execution plan missing CPU clock');
if (
  machine.execution.frameEvents.find(event => event.callbackId === 'callback:periodic')
    ?.frequency !== 36.62109375
) {
  throw new Error('non-video-locked periodic interrupts must retain fractional frequency');
}
const heldVblankEvents = machine.execution.frameEvents.filter(
  event => event.callbackId === 'callback:vblank-hold',
);
if (
  heldVblankEvents.length !== 1 ||
  heldVblankEvents[0]?.line !== 240 ||
  heldVblankEvents[0]?.state !== 1
) {
  throw new Error('HOLD_LINE vblank callbacks must fire once rather than remain asserted');
}
const levelVblankEvents = machine.execution.frameEvents.filter(
  event => event.callbackId === 'callback:vblank-level',
);
if (
  levelVblankEvents.length !== 2 ||
  levelVblankEvents[0]?.state !== 0 ||
  levelVblankEvents[1]?.state !== 1
) {
  throw new Error('level-sensitive vblank callbacks must retain both edges');
}
const heldVblankConnection = machine.connections.find(
  connection => connection.callbackId === 'callback:vblank-hold',
);
if (
  heldVblankConnection?.effect.kind !== 'cpu-line' ||
  heldVblankConnection.effect.delivery !== 'hold'
) {
  throw new Error('HOLD_LINE must lower to held CPU-line delivery');
}
if (machine.execution.cpus[0]?.interruptVectorWriters?.[0] !== 'test_state.vector_w') {
  throw new Error('interrupt-vector writer relation was not lowered from handler IR');
}
if (machine.devices?.find(device => device.tag === 'ay.0')?.member !== 'm_ay[0]') {
  throw new Error('device-array members must retain their finder index');
}
const dma = machine.devices?.find(device => device.tag === 'dma');
if (
  dma?.member !== 'm_dma' ||
  dma.configuration?.length !== 1 ||
  dma.configuration[0]?.method !== 'set_reverse_rw_mode' ||
  dma.configuration[0]?.args[0] !== 1
) {
  throw new Error('direct device configuration calls must retain boolean arguments');
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

const defaultClockDacGraph: KnowledgeGraph = {
  meta: graph.meta,
  nodes: [{
    id: 'device:dac',
    label: 'Device',
    props: {
      type: 'DAC_8BIT_R2R',
      tag: 'dac',
      config: ['DAC_8BIT_R2R(config, m_dac)'],
    },
  }, {
    id: 'route:dac',
    label: 'AudioRoute',
    props: { output: 'ALL_OUTPUTS', target: 'speaker', gain: 0.15 },
  }, {
    id: 'device:dacvol',
    label: 'Device',
    props: { type: 'DISCRETE', tag: 'dacvol' },
  }, {
    id: 'route:dacvol',
    label: 'AudioRoute',
    props: { output: '0', target: 'dac', input: 0, gain: 1 },
  }],
  edges: [
    { from: 'device:dac', to: 'route:dac', rel: 'HAS_AUDIO_ROUTE' },
    { from: 'device:dacvol', to: 'route:dacvol', rel: 'HAS_AUDIO_ROUTE' },
  ],
};
const defaultClockDac = lowerAuxiliaryAudioDevices(defaultClockDacGraph, [{
  id: 'device:dac',
  tag: 'dac',
  type: 'DAC_8BIT_R2R',
  member: 'm_dac',
}, {
  id: 'device:dacvol',
  tag: 'dacvol',
  type: 'DISCRETE',
  member: 'm_dacvol',
}]);
if (
  defaultClockDac[0]?.clock !== 0 ||
  defaultClockDac[0]?.member !== 'm_dac' ||
  defaultClockDac[0]?.referenceControl?.member !== 'm_dacvol'
) {
  throw new Error('clockless passive R2R DACs must lower as routed auxiliary streams');
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
