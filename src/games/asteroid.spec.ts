import assert from 'node:assert/strict';
import { inputKeys } from '../gen/generate.ts';
import { asteroid } from './asteroid.ts';
import { gameSourceGraph } from './test-support.ts';

gameSourceGraph(asteroid);
assert.deepEqual(inputKeys('asteroid', 'IPT_BUTTON1'), ['ArrowLeft']);
assert.deepEqual(inputKeys('asteroid', 'IPT_BUTTON2'), ['ArrowRight']);
assert.deepEqual(inputKeys('asteroid', 'IPT_BUTTON3'), ['KeyX']);
assert.deepEqual(inputKeys('asteroid', 'IPT_BUTTON4'), ['KeyZ']);
assert.deepEqual(inputKeys('asteroid', 'IPT_BUTTON5'), ['Space']);
console.log('asteroid.spec: source machine graph passed');
