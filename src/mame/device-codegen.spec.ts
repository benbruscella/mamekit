import assert from 'node:assert/strict';
import type { GeneratedDeviceDefinition } from './device-compiler.ts';
import { generatedDeviceMethodsSource } from './device-codegen.ts';
import { compileMameHandler } from './handler-ir.ts';

const definition: GeneratedDeviceDefinition = {
  schemaVersion: 1,
  type: 'TEST_DEVICE',
  className: 'test_device',
  hierarchy: ['test_device'],
  sourceFiles: ['src/devices/test.cpp'],
  constants: { LIMIT: 4 },
  members: [
    { name: 'm_total', valueType: 'uint16_t', bits: 16, initial: 0 },
    { name: 'm_budget', valueType: 'int', bits: 32, signed: true, initial: 0 },
  ],
  callbacks: [],
  timers: [],
  methods: [
    {
      name: 'step',
      parameters: 'uint16_t value',
      source: { file: 'src/devices/test.cpp', line: 1 },
      program: {
        diagnostics: [],
        operations: [{
          op: 'return',
          value: {
            kind: 'binary',
            operator: '+',
            left: { kind: 'identifier', name: 'value' },
            right: { kind: 'number', value: 1 },
          },
        }],
      },
    },
    {
      name: 'render',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 2 },
      program: {
        diagnostics: [],
        operations: [{
          op: 'for',
          initialize: [{
            op: 'declare',
            name: 'y',
            valueType: 'int',
            value: { kind: 'number', value: 0 },
          }],
          condition: {
            kind: 'binary',
            operator: '<',
            left: { kind: 'identifier', name: 'y' },
            right: { kind: 'identifier', name: 'LIMIT' },
          },
          iterate: {
            op: 'assign',
            target: { kind: 'identifier', name: 'y' },
            operator: '+=',
            value: { kind: 'number', value: 1 },
          },
          body: [{
            op: 'for',
            initialize: [{
              op: 'declare',
              name: 'x',
              valueType: 'int',
              value: { kind: 'number', value: 0 },
            }],
            condition: {
              kind: 'binary',
              operator: '<',
              left: { kind: 'identifier', name: 'x' },
              right: { kind: 'identifier', name: 'LIMIT' },
            },
            iterate: {
              op: 'assign',
              target: { kind: 'identifier', name: 'x' },
              operator: '+=',
              value: { kind: 'number', value: 1 },
            },
            body: [{
              op: 'assign',
              target: { kind: 'identifier', name: 'm_total' },
              operator: '+=',
              value: {
                kind: 'call',
                callee: { kind: 'identifier', name: 'step' },
                args: [{ kind: 'identifier', name: 'x' }],
              },
            }, {
              op: 'assign',
              target: { kind: 'identifier', name: 'm_budget' },
              operator: '-=',
              value: { kind: 'number', value: 1 },
            }],
          }],
        }],
      },
    },
    {
      name: 'cold_path',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 3 },
      program: {
        diagnostics: [],
        operations: [{
          op: 'assign',
          target: { kind: 'identifier', name: 'm_total' },
          operator: '=',
          value: { kind: 'number', value: 0 },
        }],
      },
    },
  ],
  summary: { methods: 3, compiledMethods: 3, diagnostics: 0 },
};

const emitted = generatedDeviceMethodsSource(definition);
assert.deepEqual(emitted.methods.sort(), ['render', 'step']);
assert.doesNotMatch(emitted.source, /method_cold_path/);
const timerEmitted = generatedDeviceMethodsSource({
  ...definition,
  timers: [{ member: 'm_timer', callback: 'cold_path' }],
});
assert.ok(
  timerEmitted.methods.includes('cold_path'),
  'source-declared timer callbacks must compile even when they contain no loop',
);

const methods = Function(`return ${emitted.source}`)() as Record<
  string,
  (runtime: { members: Record<string, unknown> }) => unknown
>;
const runtime = { members: { m_total: 0, m_budget: 0 } };
methods.render!(runtime);
assert.equal(runtime.members.m_total, 40);
assert.equal(runtime.members.m_budget, -16);

const unsafeDefinition: GeneratedDeviceDefinition = {
  ...definition,
  members: [
    ...definition.members,
    { name: 'm_latch', valueType: 'latch_delegate', initial: 0 },
    { name: 'm_pixels', valueType: 'std::array<u32, 4>', values: [0, 0, 0, 0] },
  ],
  methods: [
    {
      name: 'mutate',
      parameters: 'uint8_t &value',
      source: { file: 'src/devices/test.cpp', line: 4 },
      program: compileMameHandler('value = 7;'),
    },
    {
      name: 'render_with_reference',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 5 },
      program: compileMameHandler(`
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
            mutate(m_total);
      `),
    },
    {
      name: 'render_with_delegate',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 6 },
      program: compileMameHandler(`
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
        if (!m_latch.isnull()) m_latch(x);
      `),
    },
    {
      name: 'write_pixel',
      parameters: 'u32 *&dest',
      source: { file: 'src/devices/test.cpp', line: 7 },
      program: compileMameHandler('*dest = 9; dest += 1;'),
    },
    {
      name: 'render_with_pointer',
      parameters: '',
      source: { file: 'src/devices/test.cpp', line: 8 },
      program: compileMameHandler(`
        u32 *dest = &m_pixels[0];
        for (int y = 0; y < 2; y++)
          for (int x = 0; x < 2; x++)
            write_pixel(dest);
      `),
    },
  ],
};
const unsafeEmitted = generatedDeviceMethodsSource(unsafeDefinition);
assert.deepEqual(
  unsafeEmitted.methods.sort(),
  [
    'mutate',
    'render_with_delegate',
    'render_with_pointer',
    'render_with_reference',
    'write_pixel',
  ],
  'direct codegen must include reference and delegate method closures safely',
);
const optimized = Function(`return ${unsafeEmitted.source}`)() as Record<
  string,
  (runtime: {
    members: Record<string, unknown>;
    calls: Record<string, (...args: unknown[]) => unknown>;
    invoke(name: string, ...args: unknown[]): unknown;
  }) => unknown
>;
const optimizedRuntime = {
  members: { m_total: 0, m_budget: 0, m_latch: 0, m_pixels: [0, 0, 0, 0] },
  calls: {
    'm_latch.isnull': () => 1,
  },
  invoke(name: string): unknown {
    throw new Error(`unexpected optimized runtime call ${name}`);
  },
};
optimized.render_with_reference!(optimizedRuntime);
assert.equal(
  optimizedRuntime.members.m_total,
  7,
  'compiled C++ reference parameters must write back to their caller',
);
optimized.render_with_delegate!(optimizedRuntime);
optimized.render_with_pointer!(optimizedRuntime);
assert.deepEqual(
  optimizedRuntime.members.m_pixels,
  [9, 9, 9, 9],
  'compiled pointer references must preserve dereference and pointer arithmetic',
);

console.log('device-codegen.spec: IR selection, dependency closure and execution passed');
