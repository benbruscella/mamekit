import assert from 'node:assert/strict';
import { KeyboardInput, type FieldBinding } from './input.ts';
import { PointerInput } from './pointer.ts';

/**
 * A machine only ever sees input at a frame boundary (see KeyboardInput
 * .advance), so settle what is queued before reading a port back.
 */
function settle<T extends { latch(): void }>(model: T): T {
  model.latch();
  return model;
}


// Arkanoid's paddle as the generator emits it: an 8-bit dial on P1 with
// PORT_SENSITIVITY(30) PORT_KEYDELTA(15), plus a reversed trackball Y axis
// and an ordinary fire button that pointer movement must never touch.
const bindings: FieldBinding[] = [
  { port: 'P1', mask: 0xff, keys: ['ArrowLeft'], label: 'IPT_DIAL_LEFT', type: 'IPT_DIAL_LEFT', activeLow: false, relativeDelta: -15, sensitivity: 30 },
  { port: 'P1', mask: 0xff, keys: ['ArrowRight'], label: 'IPT_DIAL_RIGHT', type: 'IPT_DIAL_RIGHT', activeLow: false, relativeDelta: 15, sensitivity: 30 },
  { port: 'TB', mask: 0x0f, keys: ['ArrowUp'], label: 'IPT_TRACKBALL_Y_UP', type: 'IPT_TRACKBALL_Y_UP', activeLow: false, relativeDelta: 1 },
  { port: 'TB', mask: 0x0f, keys: ['ArrowDown'], label: 'IPT_TRACKBALL_Y_DOWN', type: 'IPT_TRACKBALL_Y_DOWN', activeLow: false, relativeDelta: -1 },
  { port: 'IN0', mask: 0x10, keys: ['KeyX'], label: 'IPT_BUTTON1', type: 'IPT_BUTTON1' },
];
const ports = [{ tag: 'P1', init: 0x00 }, { tag: 'TB', init: 0x00 }, { tag: 'IN0', init: 0xff }];

const input = new KeyboardInput(bindings, [], ports);
const pointer = new PointerInput(input, bindings);
assert.equal(pointer.active, true);
assert.deepEqual(pointer.bindings().map(b => b.type), ['IPT_DIAL_RIGHT', 'IPT_TRACKBALL_Y_DOWN']);

// One pixel is sensitivity/100 units (ioport.cpp apply_sensitivity): ten
// pixels at 30% is three units, and the leftover third of a unit carries.
pointer.move(10, 0);
pointer.advance();
assert.equal(settle(input).read('P1'), 3, 'ten pixels right at 30% = 3 units');
pointer.move(10, 0);
pointer.advance();
assert.equal(settle(input).read('P1'), 6, 'the carried fraction is not lost across frames');
pointer.move(-30, 0);
pointer.advance();
assert.equal(settle(input).read('P1'), (6 - 9) & 0xff, 'leftward travel decrements and wraps in the mask');
assert.equal(settle(input).read('IN0'), 0xff, 'a button is never a pointer target');

// Travel below one unit stays pending rather than rounding to a step.
pointer.move(1, 0);
pointer.advance();
assert.equal(settle(input).read('P1'), (6 - 9) & 0xff);
pointer.move(3, 0);
pointer.advance();
assert.equal(settle(input).read('P1'), (6 - 9 + 1) & 0xff, 'four pixels in two frames is one unit');

// The vertical axis follows mouse Y; PORT_REVERSE (a negative DOWN delta)
// flips it, and the 4-bit trackball wraps in its own mask.
pointer.move(0, 5);
pointer.advance();
assert.equal(settle(input).read('TB'), (0 - 5) & 0x0f, 'down travel takes the DOWN half\'s sign');
assert.equal(settle(input).read('P1'), (6 - 9 + 1) & 0xff, 'the x axis ignores y travel');

// A long spin lands as one whole step per frame, sensitivity applied.
const before = settle(input).read('P1');
pointer.move(100, 0);
pointer.advance();
assert.equal(settle(input).read('P1'), (before + 30) & 0xff);

// A machine with nothing relative is inert: no axes, no listeners.
const plain = new KeyboardInput([bindings[4]!], [], [{ tag: 'IN0', init: 0xff }]);
const none = new PointerInput(plain, [bindings[4]!]);
assert.equal(none.active, false);
none.move(50, 50);
none.advance();
assert.equal(settle(plain).read('IN0'), 0xff);

// Capture state is reported once per change, for the legend.
const changes: boolean[] = [];
pointer.onChange(captured => changes.push(captured));
const listeners = new Map<string, (event: unknown) => void>();
let locked: Element | null = null;
const screen = {
  addEventListener: (name: string, fn: (event: unknown) => void) => listeners.set(`screen:${name}`, fn),
  requestPointerLock: () => { locked = screen as unknown as Element; listeners.get('doc:pointerlockchange')!({}); },
} as unknown as HTMLElement;
let focused = true;
const doc = {
  get pointerLockElement() { return locked; },
  hasFocus: () => focused,
  addEventListener: (name: string, fn: (event: unknown) => void) => listeners.set(`doc:${name}`, fn),
} as unknown as Document;
pointer.attach(screen, doc);
listeners.get('screen:click')!({});
assert.deepEqual(changes, [true], 'a click captures');
assert.equal(pointer.isCaptured, true);
const start = settle(input).read('P1');
listeners.get('doc:mousemove')!({ target: null, movementX: 10, movementY: 0 });
pointer.advance();
assert.equal(settle(input).read('P1'), (start + 3) & 0xff, 'captured movement counts wherever the cursor is');
locked = null;
listeners.get('doc:pointerlockchange')!({});
assert.deepEqual(changes, [true, false], 'Escape releases');
listeners.get('doc:mousemove')!({ target: null, movementX: 10, movementY: 0 });
pointer.advance();
assert.equal(settle(input).read('P1'), (start + 6) & 0xff, 'uncaptured movement counts wherever the cursor is, as in MAME');
focused = false;
listeners.get('doc:mousemove')!({ target: null, movementX: 10, movementY: 0 });
pointer.advance();
assert.equal(settle(input).read('P1'), (start + 6) & 0xff, 'a page without focus is not being played');
focused = true;

console.log('pointer.spec: sensitivity scaling, carry, reverse, axis isolation, capture and release passed');
