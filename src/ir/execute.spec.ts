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

check('a program that falls off the end returns nothing', () => {
  assert.deepEqual(executeGeneratedProgram(program([]), {}), { returned: false });
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
