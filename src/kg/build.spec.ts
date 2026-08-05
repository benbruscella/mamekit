import assert from 'node:assert/strict';
import {
  attotimeFrequency,
  derivedDeviceClock,
  evaluateTimerScanlines,
  fromHzExpression,
  gameSubgraph,
  parseIoportMembers,
  resolveMachineLifecycle,
} from './build.ts';
import type { KnowledgeGraph, KGNode } from './types.ts';
import { MameAstIndex, parseMameAst } from '../mame/ast.ts';

const timerAst = new MameAstIndex(parseMameAst([{
  file: 'timer.cpp',
  source: `
    static const uint8_t trigger_lines[2] = { 128, 256 };
    void test_state::start_irq_timer() {
      m_irq_timer->adjust(m_screen->time_until_pos(trigger_lines[0]));
    }
    void test_state::machine_reset() { start_irq_timer(); }
    TIMER_CALLBACK_MEMBER(test_state::irq_callback) {
      int next = (param + 1) % 2;
      m_irq_timer->adjust(m_screen->time_until_pos(trigger_lines[next]), next);
    }
  `,
}]));
assert.deepEqual(
  evaluateTimerScanlines(
    timerAst,
    timerAst.findFunction('test_state', 'irq_callback')!,
    timerAst.findFunction('test_state', 'machine_reset')!,
    'm_irq_timer',
    {},
  ),
  [128, 256],
  'driver timers retain their scheduled param when a reset helper starts the chain',
);

const callback = (
  id: string,
  ownerTag: string,
  signal: string,
  operation: string,
  slot?: number,
): KGNode => ({
  id,
  label: 'Callback',
  props: {
    ownerTag,
    signal,
    operation,
    ...(slot === undefined ? {} : { slot }),
  },
});

assert.equal(
  fromHzExpression('attotime::from_hz(12_MHz_XTAL / (2*4*16*16*10*16))'),
  '12_MHz_XTAL / (2*4*16*16*10*16)',
  'periodic IRQ frequency extraction must retain nested denominator parentheses',
);
assert.equal(
  derivedDeviceClock('DERIVED_CLOCK(1, 2*4)', 16_000_000),
  2_000_000,
  'derived device clocks must accept arithmetic in their divider',
);
assert.equal(
  attotimeFrequency('attotime::from_hz(clock() / (2*16*10))', {}, 2_000_000),
  6_250,
  'periodic callbacks may derive their frequency from the configured device clock',
);
assert.equal(
  attotimeFrequency(
    'attotime::from_ticks(384 * 262 / 4, 12_MHz_XTAL / 2)',
    { '12_MHz_XTAL': 12_000_000 },
  ),
  6_000_000 / 25_152,
  'from_ticks periodic interrupts must lower to their source frequency',
);
assert.deepEqual(
  parseIoportMembers(`
    required_ioport_array<4> m_io_in;
    optional_ioport_array<3> m_dsw;
    test_state::test_state()
      : m_io_in(*this, "IN%u", 0U)
      , m_dsw(*this, "DSW%c", 'A')
    { }
  `, {}),
  {
    m_io_in: ['IN0', 'IN1', 'IN2', 'IN3'],
    m_dsw: ['DSWA', 'DSWB', 'DSWC'],
  },
  'ioport finder arrays must expand numeric and character tag patterns',
);

const graph: KnowledgeGraph = {
  meta: {
    tool: 'mamekit',
    version: 'test',
    mameSrc: '',
    driverFile: '',
    generatedAt: '',
  },
  nodes: [
    { id: 'game:test', label: 'Game', props: {} },
    {
      id: 'machine:derived',
      label: 'MachineConfig',
      props: {
        removedDevices: ['ppi'],
        devicePatches: [
          JSON.stringify({
            tag: 'screen',
            config: ['screen.screen_vblank().set_inputline(...)'],
          }),
        ],
      },
    },
    {
      id: 'machine:base',
      label: 'MachineConfig',
      props: {
        devicePatches: [
          JSON.stringify({
            tag: 'screen',
            config: ['screen.set_raw(...)'],
            screenRaw: {
              pixclock: 6_000_000,
              htotal: 384,
              hbend: 0,
              hbstart: 256,
              vtotal: 264,
              vbend: 16,
              vbstart: 240,
            },
          }),
        ],
      },
    },
    {
      id: 'screen',
      label: 'Device',
      props: { type: 'SCREEN', tag: 'screen', config: [] },
    },
    {
      id: 'base-pio',
      label: 'Device',
      props: { type: 'I8255A', tag: 'ppi', config: [] },
    },
    callback('derived-slot-0', 'latch', 'q_out_cb', 'set', 0),
    callback('derived-slot-1', 'latch', 'q_out_cb', 'set', 1),
    callback('derived-append-2', 'latch', 'q_out_cb', 'append', 2),
    callback('base-slot-0', 'latch', 'q_out_cb', 'set', 0),
    callback('base-slot-2', 'latch', 'q_out_cb', 'set', 2),
  ],
  edges: [
    { from: 'game:test', to: 'machine:derived', rel: 'USES_MACHINE' },
    { from: 'machine:derived', to: 'machine:base', rel: 'CALLS' },
    { from: 'machine:base', to: 'screen', rel: 'HAS_DEVICE' },
    { from: 'machine:base', to: 'base-pio', rel: 'HAS_DEVICE' },
    { from: 'machine:derived', to: 'derived-slot-0', rel: 'HAS_CALLBACK' },
    { from: 'machine:derived', to: 'derived-slot-1', rel: 'HAS_CALLBACK' },
    { from: 'machine:derived', to: 'derived-append-2', rel: 'HAS_CALLBACK' },
    { from: 'machine:base', to: 'base-slot-0', rel: 'HAS_CALLBACK' },
    { from: 'machine:base', to: 'base-slot-2', rel: 'HAS_CALLBACK' },
  ],
};

const composed = gameSubgraph(graph, 'test');
const callbacks = composed.nodes
  .filter(node => node.label === 'Callback')
  .map(node => node.id)
  .sort();

assert.deepEqual(callbacks, [
  'base-slot-2',
  'derived-append-2',
  'derived-slot-0',
  'derived-slot-1',
]);

const screen = composed.nodes.find(node => node.id === 'screen');
assert.deepEqual(
  screen?.props.screenRaw,
  [6_000_000, 384, 0, 256, 264, 16, 240],
  'a callback-only derived patch must not mask base screen timing',
);
assert.ok(
  !composed.nodes.some(node => node.id === 'base-pio'),
  'a derived device_remove must remove the inherited device',
);

const lifecycleAst = new MameAstIndex(parseMameAst([{
  file: 'machine.cpp',
  source: `
MACHINE_RESET_MEMBER(test_state, common)
{
  common_reset();
}
MACHINE_RESET_MEMBER(test_state, test)
{
  MACHINE_RESET_CALL_MEMBER(common);
  machine_latch_w(0);
}
`,
}]));
assert.deepEqual(
  resolveMachineLifecycle(lifecycleAst, 'test_state', 'test', 'reset')
    .map(fn => fn.name),
  ['machine_reset_common', 'machine_reset_test'],
  'machine reset call members must execute base-first',
);

const modernLifecycleAst = new MameAstIndex(parseMameAst([{
  file: 'modern.cpp',
  source: `
void modern_state::machine_reset()
{
  m_mcu->set_input_line(INPUT_LINE_HALT, ASSERT_LINE);
}
`,
}]));
assert.deepEqual(
  resolveMachineLifecycle(modernLifecycleAst, 'modern_state', 'modern', 'reset')
    .map(fn => fn.name),
  ['machine_reset'],
  'modern virtual machine_reset overrides must apply to every selected machine config',
);

console.log('build.spec: derived callback shadowing and device patch composition passed');
