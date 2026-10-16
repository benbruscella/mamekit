import assert from 'node:assert/strict';
import type { GeneratedExpression, GeneratedHandlerOperation } from './board.ts';
import { childExpressions, unboundIdentifiers, walkExpressions, walkOperations } from './walk.ts';

const number = (value: number): GeneratedExpression => ({ kind: 'number', value });
const identifier = (name: string): GeneratedExpression => ({ kind: 'identifier', name });

const program: GeneratedHandlerOperation[] = [
  { op: 'declare', name: 'total', valueType: 'int', value: number(0) },
  {
    op: 'for',
    initialize: [{ op: 'declare', name: 'i', valueType: 'int', value: number(0) }],
    condition: { kind: 'binary', operator: '<', left: identifier('i'), right: number(4) },
    iterate: [{
      op: 'assign', target: identifier('i'), operator: '+=', value: number(1),
    }],
    body: [{
      op: 'if',
      condition: identifier('enabled'),
      then: [{
        op: 'assign',
        target: identifier('total'),
        operator: '+=',
        value: { kind: 'index', object: identifier('weights'), index: identifier('i') },
      }],
      else: [{
        op: 'switch',
        expression: identifier('mode'),
        cases: [{ values: [number(1)], body: [{ op: 'break' }] }],
      }],
    }],
  },
  { op: 'return', value: identifier('total') },
];

// Every nesting form reaches the visitor: a `for` initializer and iterate list
// are operations too, and a `switch` case body is not an expression.
const operations: string[] = [];
walkOperations(program, operation => operations.push(operation.op));
assert.deepEqual(operations, [
  'declare', 'for', 'declare', 'assign', 'if', 'assign', 'switch', 'break', 'return',
]);

const names = new Set<string>();
walkExpressions(program, expression => {
  if (expression.kind === 'identifier') names.add(expression.name);
});
assert.deepEqual(
  [...names].sort(),
  ['enabled', 'i', 'mode', 'total', 'weights'],
);

// A member's property and a call's callee are names the executor resolves, not
// values it reads. A caller looking for unbound identifiers must not see them,
// or every device method would read as an unresolved name.
assert.deepEqual(
  childExpressions({
    kind: 'call',
    callee: { kind: 'member', object: identifier('m_tilemap'), property: 'set_scrollx' },
    args: [number(0), identifier('offset')],
  }),
  [number(0), identifier('offset')],
);
assert.deepEqual(
  childExpressions({ kind: 'member', object: identifier('m_screen'), property: 'vpos' }),
  [identifier('m_screen')],
);

// A program lowered for a fixed environment is checked for names nothing
// binds: its own locals and parameters, and the environment's names, are
// bound; a callee is a call the executor resolves, not a value it reads. The
// Game Boy's palette read a file-scope table this way and got four black pens.
const palette = {
  operations: [
    { op: 'declare', name: 'i', valueType: 'int', value: number(0) },
    {
      op: 'call',
      expression: {
        kind: 'call',
        callee: { kind: 'member', object: identifier('palette'), property: 'set_pen_color' },
        args: [identifier('i'), {
          kind: 'index', object: identifier('palette_gb'), index: identifier('i'),
        }, identifier('PEN_COUNT')],
      },
    },
  ] as GeneratedHandlerOperation[],
  diagnostics: [],
};
assert.deepEqual(unboundIdentifiers(palette, ['palette'], new Set(['PEN_COUNT'])), ['palette_gb']);
assert.deepEqual(unboundIdentifiers(palette, ['palette'], new Set(['PEN_COUNT', 'palette_gb'])), []);

console.log('walk.spec: IR operation and expression traversal passed');
