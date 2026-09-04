import assert from 'node:assert/strict';
import { inputKeys, inputLabel } from '../gen/generate.ts';
import { rtype } from './rtype.ts';
import { gameSourceGraph } from './test-support.ts';

assert.deepEqual(inputKeys('rtype', 'IPT_BUTTON2'), ['KeyZ']);
assert.equal(inputLabel('rtype', 'IPT_BUTTON2'), 'Force');
assert.equal(
  inputKeys('rtype', 'IPT_BUTTON3'),
  undefined,
  'R-Type must not advertise the spare M72 BUTTON3 input as a cabinet control',
);
gameSourceGraph(rtype);
console.log('rtype.spec: source machine graph passed');
