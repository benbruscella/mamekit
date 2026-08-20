import assert from 'node:assert/strict';
import { executeDvgDisplayList } from './dvg.ts';

// LABS to the screen centre, draw a full-bright horizontal vector, then halt.
const words = [0xa200, 0x0200, 0x9000, 0xf100, 0xb000];
const bytes = new Uint8Array(words.length * 2);
for (let index = 0; index < words.length; index++) {
  bytes[index * 2] = words[index]! & 0xff;
  bytes[index * 2 + 1] = words[index]! >>> 8;
}
const points = executeDvgDisplayList(
  address => bytes[address - 0x4000] ?? 0,
  { memoryBase: 0x4000, coordinateBits: 10 },
);

assert.deepEqual(points, [
  { x: 512, y: 512, intensity: 0 },
  { x: 768, y: 512, intensity: 15 },
]);

console.log('dvg.spec: absolute positioning and rate-multiplied vectors passed');
