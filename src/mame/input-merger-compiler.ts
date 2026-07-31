import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type {
  GeneratedExpression,
  GeneratedHandlerOperation,
  GeneratedHandlerProgram,
} from '../ir/board.ts';
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethod,
} from './device-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const SOURCE = 'src/devices/machine/input_merger.cpp';
const HEADER = 'src/devices/machine/input_merger.h';

const number = (value: number): GeneratedExpression => ({ kind: 'number', value });
const identifier = (name: string): GeneratedExpression => ({ kind: 'identifier', name });
const binary = (
  operator: string,
  left: GeneratedExpression,
  right: GeneratedExpression,
): GeneratedExpression => ({ kind: 'binary', operator, left, right });
const call = (
  name: string,
  args: GeneratedExpression[],
): Extract<GeneratedExpression, { kind: 'call' }> => ({
  kind: 'call',
  callee: identifier(name),
  args,
});

/**
 * Lower MAME's generic 32-input logic combiner. The four public device types
 * differ only by the three constants passed to the shared base constructor.
 */
export function compileInputMerger(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedDeviceDefinition {
  const source = readFileSync(join(mameSrc, SOURCE), 'utf8');
  const constructor = new RegExp(
    `${definition.className}::${definition.className}` +
    `[\\s\\S]*?\\n\\s*:\\s*input_merger_device\\(` +
    `[\\s\\S]*?(~?)u32\\((0x[\\da-f]+|\\d+)\\)\\s*,\\s*` +
    `(~?)u32\\((0x[\\da-f]+|\\d+)\\)\\s*,\\s*(\\d+)\\s*\\)`,
    'i',
  ).exec(source);
  if (!constructor) {
    throw new Error(`${definition.type}: input merger constructor constants changed`);
  }
  const value = (negated: string, literal: string): number => {
    const parsed = Number(literal);
    return negated ? (~parsed) >>> 0 : parsed >>> 0;
  };
  const initial = value(constructor[1]!, constructor[2]!);
  const xor = value(constructor[3]!, constructor[4]!);
  const active = Number(constructor[5]);
  const line = source.slice(0, constructor.index).split('\n').length;
  const sourceRef = { file: SOURCE, line, column: 1 };

  const method = (
    name: string,
    parameters: string,
    operations: GeneratedHandlerOperation[],
  ): GeneratedDeviceMethod => ({
    name,
    parameters,
    program: { operations, diagnostics: [] },
    source: sourceRef,
  });
  const pinMethods = Array.from({ length: 32 }, (_, bit) => {
    const stateBit = binary(
      '&',
      binary('>>', identifier('m_state'), number(bit)),
      number(1),
    );
    const nextBit: GeneratedExpression = {
      kind: 'conditional',
      condition: identifier('state'),
      whenTrue: number(1),
      whenFalse: number(0),
    };
    const output: GeneratedExpression = {
      kind: 'conditional',
      condition: binary(
        '!=',
        binary('^', identifier('m_state'), number(xor)),
        number(0),
      ),
      whenTrue: number(active),
      whenFalse: number(active ? 0 : 1),
    };
    return [
      method(`in_w_${bit}`, 'int state', [{
        op: 'if',
        condition: binary('!=', stateBit, nextBit),
        then: [
          {
            op: 'assign',
            target: identifier('m_state'),
            operator: '^=',
            value: number((1 << bit) >>> 0),
          },
          { op: 'call', expression: call('m_output_handler', [output]) },
        ],
      }]),
      method(`in_set_${bit}`, 'u8 data = 0', [{
        op: 'call',
        expression: call(`in_w_${bit}`, [number(1)]),
      }]),
      method(`in_clear_${bit}`, 'u8 data = 0', [{
        op: 'call',
        expression: call(`in_w_${bit}`, [number(0)]),
      }]),
    ];
  }).flat();
  const start = method('device_start', '', [{
    op: 'assign',
    target: identifier('m_state'),
    operator: '=',
    value: number(initial),
  }]);
  const methods = [start, ...pinMethods];
  const program = (method: GeneratedDeviceMethod): GeneratedHandlerProgram => method.program;
  return {
    schemaVersion: 1,
    type: definition.type,
    className: definition.className,
    hierarchy: ['input_merger_device', definition.className],
    sourceFiles: [SOURCE, HEADER],
    constants: {
      INITVAL: initial,
      XORVAL: xor,
      ACTIVE: active,
    },
    members: [
      { name: 'm_state', valueType: 'u32', bits: 32, initial },
    ],
    callbacks: [{
      signal: 'output_handler',
      member: 'm_output_handler',
      slots: 1,
      initial: active ? 0 : 1,
    }],
    timers: [],
    methods,
    start: 'device_start',
    summary: {
      methods: methods.length,
      compiledMethods: methods.filter(candidate => !program(candidate).diagnostics.length).length,
      diagnostics: 0,
    },
  };
}
