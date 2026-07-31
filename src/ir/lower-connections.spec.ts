import assert from 'node:assert/strict';
import type { BoardEffect, GeneratedCallback } from './board.ts';
import {
  lowerCallbackEffect,
  lowerConnections,
  lowerTransforms,
  unknownTransforms,
  type ConnectionContext,
} from './lower-connections.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

const context: ConnectionContext = {
  cpuTags: new Set(['maincpu', 'audiocpu', 'mcu']),
  deviceTags: new Set(['maincpu', 'audiocpu', 'mcu', 'mainlatch', 'timeplt_audio', 'aysnd']),
  handlerKeys: new Set([
    'fixture_state.irq_w',
    'timeplt_audio_device.sh_irqtrigger_w',
  ]),
  soundTag: 'aysnd',
  soundEnableMethods: new Set(['sound_enable_w']),
  soundControlOffset: 0x20,
  auxiliaryAudio: new Map([['dac', new Set(['data_w'])]]),
};

function callback(overrides: Partial<GeneratedCallback>): GeneratedCallback {
  return {
    id: 'c0', ownerTag: 'mainlatch', signal: 'q_out_cb', operation: 'set',
    ...overrides,
  };
}

const effect = (overrides: Partial<GeneratedCallback>): BoardEffect | undefined =>
  lowerCallbackEffect(callback(overrides), context);

// --- transforms -------------------------------------------------------------

check('devcb transforms lower to typed operations', () => {
  assert.deepEqual(
    lowerTransforms(['invert', 'mask(0x0f)', 'rshift(4)', 'lshift(3)']),
    [
      { kind: 'invert' },
      { kind: 'mask', value: 0x0f },
      { kind: 'rshift', bits: 4 },
      { kind: 'lshift', bits: 3 },
    ],
  );
});

// lshift had no runtime implementation, so digdug's and galaga's 53xx K-port
// MOD bits collapsed onto bit 0. An unmodelled transform must be visible.
check('a transform with no lowering is reported, not dropped', () => {
  assert.deepEqual(unknownTransforms(['invert', 'xor(3)']), ['xor(3)']);
  assert.deepEqual(unknownTransforms(['lshift(3)']), []);
});

// --- effects ----------------------------------------------------------------

check('MAME .set_nop() is an explicit unconnected output', () => {
  assert.deepEqual(effect({ operation: 'set_nop' }), { kind: 'unconnected' });
});

check('set_ioport lowers to a port read', () => {
  assert.deepEqual(
    effect({ operation: 'set_ioport', targetTag: 'IN0', targetPort: 'IN0' }),
    { kind: 'port-read', port: 'IN0' },
  );
});

check('a CPU input line lowers to the named pin', () => {
  assert.deepEqual(
    effect({ targetTag: 'audiocpu', inputLine: 'INPUT_LINE_RESET' }),
    { kind: 'cpu-line', tag: 'audiocpu', line: 'reset', delivery: 'level' },
  );
  assert.deepEqual(
    effect({ targetTag: 'maincpu', inputLine: 'INPUT_LINE_NMI' }),
    { kind: 'cpu-line', tag: 'maincpu', line: 'nmi', delivery: 'pulse' },
  );
  assert.deepEqual(
    effect({ targetTag: 'mcu', inputLine: 'M6801_IRQ1_LINE' }),
    { kind: 'cpu-line', tag: 'mcu', line: 'irq', delivery: 'level' },
  );
  assert.deepEqual(
    effect({ targetTag: 'maincpu', inputLine: 'Z80_INPUT_LINE_BUSREQ' }),
    { kind: 'cpu-line', tag: 'maincpu', line: 'halt', delivery: 'level' },
  );
});

// MAME's driver interrupt generators act on the device the interrupt is
// installed on, not on the callback's target tag.
check('a driver interrupt generator lowers to its pin and delivery mode', () => {
  assert.deepEqual(
    lowerCallbackEffect(
      callback({ ownerTag: 'maincpu', signal: 'set_vblank_int', targetMethod: 'irq0_line_hold' }),
      context,
    ),
    { kind: 'cpu-line', tag: 'maincpu', line: 'irq', delivery: 'hold' },
  );
  assert.deepEqual(
    lowerCallbackEffect(
      callback({ ownerTag: 'audiocpu', signal: 'set_periodic_int', targetMethod: 'nmi_line_pulse' }),
      context,
    ),
    { kind: 'cpu-line', tag: 'audiocpu', line: 'nmi', delivery: 'pulse' },
  );
});

check('a custom interrupt generator preserves its source handler and CPU device', () => {
  assert.deepEqual(
    lowerCallbackEffect(
      callback({
        ownerTag: 'maincpu',
        signal: 'set_vblank_int',
        targetClass: 'fixture_state',
        targetMethod: 'irq_w',
      }),
      context,
    ),
    { kind: 'handler', handler: 'fixture_state.irq_w', deviceTag: 'maincpu' },
  );
});

check('flip_screen helpers lower to video controls', () => {
  assert.deepEqual(
    effect({ targetClass: 'fixture_state', targetMethod: 'flip_screen_set' }),
    { kind: 'video-control', control: 'flip-screen' },
  );
  assert.deepEqual(
    effect({ targetClass: 'fixture_state', targetMethod: 'flip_screen_y_set' }),
    { kind: 'video-control', control: 'flip-screen-y' },
  );
});

check('mute and sound enables lower to audio controls', () => {
  assert.deepEqual(
    effect({ targetTag: 'timeplt_audio', targetMethod: 'mute_w' }),
    { kind: 'audio-control', tag: 'timeplt_audio', control: 'mute' },
  );
  assert.deepEqual(
    effect({ targetTag: 'aysnd', targetMethod: 'sound_enable_w' }),
    { kind: 'audio-control', tag: 'aysnd', control: 'enable', offset: 0x20 },
  );
});

// junofrst's R2R DAC is mixed by the generated worklet and never instantiated
// as a board device, so its writes go to the audio sink.
check('a secondary stream device lowers to an audio write', () => {
  assert.deepEqual(
    effect({ targetTag: 'dac', targetClass: 'dac_byte_interface', targetMethod: 'data_w' }),
    { kind: 'audio-write', tag: 'dac', method: 'data_w' },
  );
});

check('a discrete latch input lowers to an audio write', () => {
  assert.deepEqual(
    lowerCallbackEffect(
      callback({
        targetTag: 'discrete',
        targetClass: 'discrete_device',
        targetMethod: 'write_line_DS_SOUND0_INP',
      }),
      { ...context, soundTag: 'discrete' },
    ),
    {
      kind: 'audio-write',
      tag: 'discrete',
      method: 'write_line_DS_SOUND0_INP',
    },
  );
});

// A composite device such as timeplt_audio is not instantiated; ownerClass lets
// the runtime fall back to the generated handler for its class.
check('a device method carries the class that declares it', () => {
  assert.deepEqual(
    effect({
      targetTag: 'timeplt_audio',
      targetClass: 'timeplt_audio_device',
      targetMethod: 'sh_irqtrigger_w',
    }),
    {
      kind: 'device-method',
      tag: 'timeplt_audio',
      method: 'sh_irqtrigger_w',
      ownerClass: 'timeplt_audio_device',
    },
  );
});

check('a driver method with a generated program lowers to a handler', () => {
  assert.deepEqual(
    effect({ targetClass: 'fixture_state', targetMethod: 'irq_w' }),
    { kind: 'handler', handler: 'fixture_state.irq_w' },
  );
});

// --- resolution -------------------------------------------------------------

check('connections keep the callback id and source span', () => {
  const { connections, unresolved } = lowerConnections([callback({
    targetClass: 'fixture_state',
    targetMethod: 'irq_w',
    transforms: ['invert'],
    source: { file: 'src/mame/fixture.cpp', line: 12 },
  })], context);
  assert.deepEqual(unresolved, []);
  assert.deepEqual(connections, [{
    callbackId: 'c0',
    effect: { kind: 'handler', handler: 'fixture_state.irq_w' },
    transforms: [{ kind: 'invert' }],
    source: { file: 'src/mame/fixture.cpp', line: 12 },
  }]);
});

// The whole point of the boundary: a connection MAME declared that reaches
// nothing fails generation instead of doing nothing in the browser.
check('an unresolvable callback is reported with a reason', () => {
  const { connections, unresolved } = lowerConnections([callback({
    targetClass: 'ghost_state',
    targetMethod: 'nowhere_w',
  })], context);
  assert.deepEqual(connections, []);
  assert.equal(unresolved.length, 1);
  assert.match(unresolved[0]!.reason, /no effect for ghost_state\.nowhere_w/);
});

check('an unmodelled transform blocks the connection', () => {
  const { unresolved } = lowerConnections(
    [callback({ targetClass: 'fixture_state', targetMethod: 'irq_w', transforms: ['xor(3)'] })],
    context,
  );
  assert.match(unresolved[0]!.reason, /devcb transform xor\(3\) has no lowering/);
});

console.log(`lower-connections.spec: ${passed} passed, 0 failed`);
