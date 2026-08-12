import assert from 'node:assert/strict';
import { executeGeneratedHandler, executeGeneratedProgram } from './execute.ts';
import type { GeneratedHandlerProgram } from './board.ts';

// The interpreter's breadth is covered where its output is compared against the
// compiler that produced it (src/runtime/generated-handler.spec.ts and the
// device/cpu specs). This spec pins the contract src/ir owns: one interpreter,
// shared by the knowledge-graph builder at generation time and the browser at
// run time, that refuses to execute a program the compiler could not lower.

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

const program = (operations: GeneratedHandlerProgram['operations']): GeneratedHandlerProgram =>
  ({ operations, diagnostics: [] });

check('a returned expression comes back as a number', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{ op: 'return', value: { kind: 'number', value: 0x2a } }]),
      {},
    ),
    0x2a,
  );
});

check('handler arguments are readable as locals', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{ op: 'return', value: { kind: 'identifier', name: 'data' } }]),
      {},
      { data: 7 },
    ),
    7,
  );
});

check('68000 physical IPL line aliases retain their interrupt levels', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{ op: 'return', value: { kind: 'identifier', name: 'M68K_IRQ_IPL1' } }]),
      {},
    ),
    1,
  );
});

check('scoped device constants resolve through source-derived leaf names', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: { kind: 'identifier', name: 'z8002_device::NVI_LINE' },
      }]),
      { constants: { NVI_LINE: 0 } },
    ),
    0,
  );
});

check('runtime-indexed finder arrays invoke their live target', () => {
  let line = -1;
  executeGeneratedHandler(
    program([{
      op: 'call',
      expression: {
        kind: 'call',
        callee: {
          kind: 'member',
          object: {
            kind: 'index',
            object: { kind: 'identifier', name: 'm_subcpu' },
            index: { kind: 'identifier', name: 'Which' },
          },
          property: 'set_input_line',
        },
        args: [{ kind: 'number', value: 0 }, { kind: 'number', value: 1 }],
      },
    }]),
    {
      constants: { Which: 1 },
      members: {
        m_subcpu: [
          { set_input_line: () => {} },
          { set_input_line: (value: number) => { line = value; } },
        ],
      },
    },
  );
  assert.equal(line, 0);
});

check('members are read and written through the bindings', () => {
  const members: Record<string, unknown> = { m_irq_mask: 0 };
  executeGeneratedHandler(
    program([{
      op: 'assign',
      target: { kind: 'identifier', name: 'm_irq_mask' },
      operator: '=',
      value: { kind: 'identifier', name: 'state' },
    }]),
    { members },
    { state: 1 },
  );
  assert.equal(members.m_irq_mask, 1);
});

check('source member arrays are zero-initialized lazily on indexed writes', () => {
  const members: Record<string, unknown> = {};
  executeGeneratedHandler(
    program([{
      op: 'assign',
      target: {
        kind: 'index',
        object: { kind: 'identifier', name: 'm_data' },
        index: { kind: 'number', value: 2 },
      },
      operator: '=',
      value: { kind: 'number', value: 0x5a },
    }]),
    { members },
  );
  assert.equal((members.m_data as number[])[0] ?? 0, 0);
  assert.equal((members.m_data as number[])[2], 0x5a);
});

check('nested source member arrays are materialized on indexed writes', () => {
  const members: Record<string, unknown> = {};
  executeGeneratedHandler(
    program([{
      op: 'assign',
      target: {
        kind: 'index',
        object: {
          kind: 'index',
          object: { kind: 'identifier', name: 'm_duty_cycle' },
          index: { kind: 'number', value: 1 },
        },
        index: { kind: 'number', value: 2 },
      },
      operator: '=',
      value: { kind: 'number', value: 7 },
    }]),
    { members },
  );
  assert.equal((members.m_duty_cycle as number[][])[1]![2], 7);
});

check('device finders with get/set methods remain pointer-like objects', () => {
  const device = { get: () => 0, set: (_name: string, _value: number) => {} };
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'binary',
          operator: '!=',
          left: { kind: 'identifier', name: 'm_device' },
          right: { kind: 'number', value: 0 },
        },
      }]),
      { members: { m_device: device } },
    ),
    1,
  );
});

check('a program that falls off the end returns nothing', () => {
  assert.deepEqual(executeGeneratedProgram(program([]), {}), { returned: false });
});

check('membank finder calls retain their string tag', () => {
  let selected = -1;
  executeGeneratedHandler(
    program([{
      op: 'call',
      expression: {
        kind: 'call',
        callee: {
          kind: 'member',
          object: {
            kind: 'call',
            callee: { kind: 'identifier', name: 'membank' },
            args: [{ kind: 'string', value: 'bank1' }],
          },
          property: 'set_entry',
        },
        args: [{ kind: 'number', value: 2 }],
      },
    }]),
    { calls: { 'bank1.set_entry': value => { selected = value; } } },
  );
  assert.equal(selected, 2);
});

check('64-bit function-style casts preserve timer divisors', () => {
  assert.equal(
    executeGeneratedHandler(
      program([{
        op: 'return',
        value: {
          kind: 'binary',
          operator: '%',
          left: { kind: 'number', value: 302_464 },
          right: {
            kind: 'call',
            callee: { kind: 'identifier', name: 'uint64_t' },
            args: [{ kind: 'number', value: 40_960 }],
          },
        },
      }]),
      {},
    ),
    15_744,
  );
});

check('direct-initialized bitmap references preserve their runtime object', () => {
  const bitmap = { 'pix=': () => {} };
  assert.deepEqual(
    executeGeneratedProgram(
      program([{
        op: 'return',
        value: {
          kind: 'call',
          callee: { kind: 'identifier', name: 'bitmap_ind16' },
          args: [{
            kind: 'call',
            callee: { kind: 'identifier', name: 'auto' },
            args: [{ kind: 'identifier', name: 'bitmap' }],
          }],
        },
      }]),
      {},
      { bitmap },
    ),
    { returned: true, value: bitmap },
  );
});

check('std::copy_n copies between source memory containers', () => {
  const source = Uint8Array.of(4, 5, 6, 7);
  const destination = new Array(4).fill(0);
  executeGeneratedHandler(
    program([{
      op: 'call',
      expression: {
        kind: 'call',
        callee: { kind: 'identifier', name: 'std::copy_n' },
        args: [
          { kind: 'identifier', name: 'source' },
          { kind: 'number', value: 3 },
          { kind: 'identifier', name: 'destination' },
        ],
      },
    }]),
    {},
    { source, destination },
  );
  assert.deepEqual(destination, [4, 5, 6, 0]);
});

check('finite hardware initialization loops may exceed 65536 iterations', () => {
  assert.equal(
    executeGeneratedHandler(
      program([
        {
          op: 'for',
          initialize: [{
            op: 'declare',
            name: 'i',
            valueType: 'int',
            value: { kind: 'number', value: 0 },
          }],
          condition: {
            kind: 'binary',
            operator: '<',
            left: { kind: 'identifier', name: 'i' },
            right: { kind: 'number', value: 131_071 },
          },
          iterate: [{
            op: 'assign',
            target: { kind: 'identifier', name: 'i' },
            operator: '+=',
            value: { kind: 'number', value: 1 },
          }],
          body: [],
        },
        { op: 'return', value: { kind: 'identifier', name: 'i' } },
      ]),
      {},
    ),
    131_071,
  );
});

// A program with diagnostics never lowered cleanly. Running it anyway would
// execute a partial translation of the MAME source.
check('a program with compiler diagnostics refuses to run', () => {
  assert.throws(
    () => executeGeneratedProgram({ operations: [], diagnostics: ['unsupported syntax'] }, {}),
    /cannot execute handler with compiler diagnostics: unsupported syntax/,
  );
});

console.log(`execute.spec: ${passed} passed, 0 failed`);
