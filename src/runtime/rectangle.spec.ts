// MAME's rectangle: inclusive edges, emptiness after a clip, and the encoded
// form a device's configuration carries one in.

import assert from 'node:assert/strict';
import { GeneratedRectangle, isEncodedRectangle } from './rectangle.ts';

const screen = new GeneratedRectangle(0, 351, 0, 295);
assert.equal(screen.width(), 352, 'both edges are inside the rectangle');
assert.equal(screen.height(), 296);
assert.equal(screen.contains(351, 295), 1);
assert.equal(screen.contains(352, 0), 0);

// The Spectrum ULA clips its border chunk to the screen area this way.
const area = new GeneratedRectangle(48, 303, 48, 239);
area.intersect(new GeneratedRectangle(0, 100, 200, 400));
assert.deepEqual([area.left(), area.right(), area.top(), area.bottom()], [48, 100, 200, 239]);
assert.equal(area.empty(), 0);
area.intersect(new GeneratedRectangle(200, 300, 0, 10));
assert.equal(area.empty(), 1, 'rectangles that do not meet leave nothing');

assert.equal(isEncodedRectangle({ rectangle: [48, 303, 48, 239] }), true);
assert.equal(isEncodedRectangle({ rectangle: [1, 2] }), false);
assert.equal(isEncodedRectangle(7), false);

console.log('rectangle.spec: edges, clipping and encoding passed');
