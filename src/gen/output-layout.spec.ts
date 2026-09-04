import assert from 'node:assert/strict';
import { gameCategory } from './output-layout.ts';

assert.equal(gameCategory('arcade'), 'arcade');
assert.equal(gameCategory('console'), 'consoles');
assert.equal(gameCategory('system'), 'consoles');
assert.equal(gameCategory('computer'), 'computers');
assert.throws(() => gameCategory(undefined), /unsupported generated machine kind/);
assert.throws(() => gameCategory('calculator'), /unsupported generated machine kind/);

console.log('output-layout.spec: exhaustive machine categories passed');
