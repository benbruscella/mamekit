import assert from 'node:assert/strict';
import { runConsole, wrapCartTitle } from './console.ts';

assert.deepEqual(wrapCartTitle('Juno First'), ['Juno First']);
assert.deepEqual(wrapCartTitle('The Legend of Zelda', 10), ['The Legend', 'of Zelda']);
assert.deepEqual(wrapCartTitle('Supercalifragilistic', 8), ['Superca…']);
assert.equal(wrapCartTitle('A title whose second line cannot possibly fit', 12).length, 2);
assert.equal(typeof runConsole, 'function');

console.log('console.spec: cartridge title layout contract passed');
