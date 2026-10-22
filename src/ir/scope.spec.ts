import assert from 'node:assert/strict';
import type { GeneratedExpression, GeneratedHandlerOperation } from './board.ts';
import { renameShadowedLocals } from './scope.ts';

const id = (name: string): GeneratedExpression => ({ kind: 'identifier', name });
const assign = (target: string, value: GeneratedExpression): GeneratedHandlerOperation =>
  ({ op: 'assign', target: id(target), operator: '=', value });
const declare = (name: string, value: GeneratedExpression): GeneratedHandlerOperation =>
  ({ op: 'declare', name, valueType: 'uint8_t', value });

// MAME's z80pio_device::pio_port::write: the parameter is read, then a local
// of the same name shadows it for the rest of the block.
const write: GeneratedHandlerOperation[] = [{
  op: 'if',
  condition: id('m_mode'),
  then: [
    assign('m_input', id('data')),
    declare('data', id('m_input')),
    assign('m_output', id('data')),
  ],
}, assign('m_last', id('data'))];
assert.equal(renameShadowedLocals(write, ['data']), 1);
const inner = (write[0] as Extract<GeneratedHandlerOperation, { op: 'if' }>).then;
assert.deepEqual(inner[0], assign('m_input', id('data')), 'before the declaration the name is the parameter');
assert.deepEqual(inner[1], declare('data__1', id('m_input')));
assert.deepEqual(inner[2], assign('m_output', id('data__1')), 'after it, the local');
assert.deepEqual(write[1], assign('m_last', id('data')), 'past its block, the parameter again');

// A local shadowing an outer local; a sibling block's declaration is not shadowing.
const nested: GeneratedHandlerOperation[] = [
  declare('t', id('a')),
  { op: 'while', condition: id('t'), body: [declare('t', id('t')), assign('x', id('t'))] },
  { op: 'if', condition: id('c'), then: [declare('u', id('a'))], else: [declare('u', id('b'))] },
];
assert.equal(renameShadowedLocals(nested, []), 1);
const loop = (nested[1] as Extract<GeneratedHandlerOperation, { op: 'while' }>).body;
assert.deepEqual(loop[0], declare('t__1', id('t')), 'the initializer reads the outer local');
assert.deepEqual(loop[1], assign('x', id('t__1')));

// Nothing shadowed, nothing touched; a fresh name never collides with one in use.
const plain: GeneratedHandlerOperation[] = [declare('v__1', id('p')), { op: 'if', condition: id('p'), then: [declare('v', id('p'))] }];
assert.equal(renameShadowedLocals(plain, ['p']), 0);
const clash: GeneratedHandlerOperation[] = [declare('v__1', id('v')), { op: 'if', condition: id('v'), then: [declare('v', id('v'))] }];
assert.equal(renameShadowedLocals(clash, ['v']), 1);
assert.equal(((clash[1] as Extract<GeneratedHandlerOperation, { op: 'if' }>).then[0] as { name: string }).name, 'v__2');

console.log('scope.spec: shadowing locals renamed within their C++ scope');
