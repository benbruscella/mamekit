import assert from 'node:assert/strict';
import { KeyboardInput, portHandlers, type FieldBinding } from './input.ts';

/**
 * A machine only ever sees input at a frame boundary (see KeyboardInput
 * .advance), so settle what is queued before reading a port back.
 */
function settle<T extends { latch(): void }>(model: T): T {
  model.latch();
  return model;
}


function keyEvent(type: 'keydown' | 'keyup', code: string, repeat = false): Event {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, {
    code: { value: code },
    repeat: { value: repeat },
  });
  return event;
}

const input = new KeyboardInput([
  { port: 'IN0', mask: 0x01, keys: ['Space'], label: 'P1_BUTTON1' },
  { port: 'IN0', mask: 0x02, keys: ['ArrowLeft'], label: 'P1_LEFT' },
  { port: 'IN0', mask: 0x04, keys: ['ArrowRight'], label: 'P1_RIGHT' },
  { port: 'IN1', mask: 0x01, keys: ['Digit1'], label: 'START1', activeLow: false },
  { port: 'IN1', mask: 0x02, keys: ['Digit9'], label: 'SERVICE1', activeLow: false, toggle: true },
  { port: 'PEDAL', mask: 0xff, keys: ['ArrowUp'], label: 'PEDAL', activeLow: false,
    activeValue: 0x90 },
  { port: 'DIAL', mask: 0xff, keys: ['KeyA'], label: 'DIAL_LEFT', activeLow: false,
    relativeDelta: -4 },
  { port: 'DIAL', mask: 0xff, keys: ['KeyD'], label: 'DIAL_RIGHT', activeLow: false,
    relativeDelta: 4 },
], [], [
  { tag: 'IN0', init: 0xff },
  { tag: 'IN1', init: 0x00 },
  { tag: 'PEDAL', init: 0x00 },
  { tag: 'DIAL', init: 0x00 },
]);
const target = new EventTarget();
input.attach(target);

const down = keyEvent('keydown', 'Space');
target.dispatchEvent(down);
assert.equal(down.defaultPrevented, true);
assert.equal(settle(input).read('IN0'), 0xfe);
target.dispatchEvent(keyEvent('keyup', 'Space'));
assert.equal(settle(input).read('IN0'), 0xff);

target.dispatchEvent(keyEvent('keydown', 'Digit1'));
assert.equal(settle(input).read('IN1'), 0x01);
target.dispatchEvent(keyEvent('keyup', 'Digit1'));
assert.equal(settle(input).read('IN1'), 0x00);

target.dispatchEvent(keyEvent('keydown', 'Digit9'));
target.dispatchEvent(keyEvent('keyup', 'Digit9'));
assert.equal(settle(input).read('IN1'), 0x02, 'a maintained switch must survive keyup');
target.dispatchEvent(new Event('blur'));
assert.equal(settle(input).read('IN1'), 0x02, 'a maintained switch must survive focus loss');
target.dispatchEvent(keyEvent('keydown', 'Digit9'));
assert.equal(settle(input).read('IN1'), 0x00, 'the next keydown must release a maintained switch');

target.dispatchEvent(keyEvent('keydown', 'ArrowLeft'));
target.dispatchEvent(keyEvent('keydown', 'ArrowRight'));
assert.equal(settle(input).read('IN0') & 0x06, 0x02, 'newest opposite direction must win');
target.dispatchEvent(keyEvent('keyup', 'ArrowRight'));
assert.equal(settle(input).read('IN0') & 0x06, 0x04, 'releasing newest direction must restore held opposite');
target.dispatchEvent(new Event('blur'));
assert.equal(settle(input).read('IN0'), 0xff);

target.dispatchEvent(keyEvent('keydown', 'ArrowUp'));
assert.equal(settle(input).read('PEDAL'), 0x90, 'absolute pedal must use its source maximum');
target.dispatchEvent(keyEvent('keyup', 'ArrowUp'));
assert.equal(settle(input).read('PEDAL'), 0x00, 'absolute pedal must return to its source rest value');

target.dispatchEvent(keyEvent('keydown', 'KeyA'));
assert.equal(settle(input).read('DIAL'), 0xfc, 'relative dial must wrap its hardware counter');
input.advance();
assert.equal(settle(input).read('DIAL'), 0xf8, 'held relative dial must advance every emulated frame');
target.dispatchEvent(keyEvent('keydown', 'KeyD', true));
assert.equal(settle(input).read('DIAL'), 0xf8, 'browser key repeat must not double-advance a relative dial');
target.dispatchEvent(keyEvent('keyup', 'KeyA'));
input.advance();
assert.equal(settle(input).read('DIAL'), 0xf8, 'released relative dial must retain its hardware counter');

input.setDip('IN0', 0x80, 0);
assert.equal(settle(input).read('IN0'), 0x7f);
assert.equal(settle(input).read('missing'), 0xff);
assert.equal(input.dump(), 'IN0=7f IN1=00 PEDAL=00 DIAL=f8');

const handlers = portHandlers([
  { start: 0, end: 0, kind: 'handler', read: 'port.IN0' },
  { start: 1, end: 1, kind: 'handler', read: 'device.status' },
], input);
assert.equal(handlers['port.IN0']?.(0, 0), 0x7f);
assert.equal(handlers['device.status'], undefined);

console.log('input.spec: polarity, SOCD, release, DIP and generated port handlers passed');

// --- source-neutral edges ----------------------------------------------------
//
// A gamepad reaches the same fields through press(); it must see the same
// polarity, SOCD and release behaviour the keyboard gets, and learn about a
// releaseAll so it can re-press what is still physically held.
{
  const bindings = [
    { port: 'IN0', mask: 0x01, keys: ['Space'], label: 'IPT_BUTTON1', type: 'IPT_BUTTON1' },
    { port: 'IN0', mask: 0x02, keys: ['ArrowLeft'], label: 'IPT_JOYSTICK_LEFT', type: 'IPT_JOYSTICK_LEFT' },
    { port: 'IN0', mask: 0x04, keys: ['ArrowRight'], label: 'IPT_JOYSTICK_RIGHT', type: 'IPT_JOYSTICK_RIGHT' },
    // player two's stick on the same port under the same labels
    { port: 'IN0', mask: 0x20, keys: [], label: 'IPT_JOYSTICK_LEFT', type: 'IPT_JOYSTICK_LEFT', player: 2 },
    { port: 'IN0', mask: 0x40, keys: [], label: 'IPT_JOYSTICK_RIGHT', type: 'IPT_JOYSTICK_RIGHT', player: 2 },
    { port: 'IN1', mask: 0x02, keys: ['Digit9'], label: 'SERVICE1', activeLow: false, toggle: true },
  ];
  const pads = new KeyboardInput(bindings, [], [{ tag: 'IN0', init: 0xff }, { tag: 'IN1', init: 0x00 }]);
  const padTarget = new EventTarget();
  pads.attach(padTarget);
  let released = 0;
  pads.onReleaseAll(() => released++);

  pads.press(bindings[0]!, true);
  assert.equal(settle(pads).read('IN0'), 0xfe, 'a pressed edge from another source drives the field');
  pads.press(bindings[0]!, false);
  assert.equal(settle(pads).read('IN0'), 0xff);

  padTarget.dispatchEvent(keyEvent('keydown', 'ArrowLeft'));
  pads.press(bindings[2]!, true);
  assert.equal(settle(pads).read('IN0') & 0x06, 0x02, 'a pad direction over a held key resolves SOCD the same way');
  pads.press(bindings[2]!, false);
  assert.equal(settle(pads).read('IN0') & 0x06, 0x04, 'and hands back to the still-held key');
  padTarget.dispatchEvent(keyEvent('keyup', 'ArrowLeft'));

  pads.press(bindings[3]!, true);
  pads.press(bindings[1]!, true);
  assert.equal(settle(pads).read('IN0'), 0xff & ~0x20 & ~0x02, 'the two players\' lefts are not each other\'s opposite');
  pads.press(bindings[4]!, true);
  assert.equal(settle(pads).read('IN0'), 0xff & ~0x40 & ~0x02, 'player two\'s right displaces player two\'s left only');

  pads.press(bindings[5]!, true);
  pads.press(bindings[5]!, false);
  assert.equal(settle(pads).read('IN1'), 0x02, 'a maintained switch toggles on the press edge only');

  padTarget.dispatchEvent(new Event('blur'));
  assert.equal(released, 1, 'release listeners hear a blur');
  assert.equal(settle(pads).read('IN0'), 0xff);
  assert.equal(settle(pads).read('IN1'), 0x02);
}

// reset(): back to a known place, which is what a shared machine needs.
{
  // Fire rests high and is active-low; the service switch rests low, is
  // active-high, and stays where it is put.
  const fresh = new KeyboardInput([
    { port: 'IN0', mask: 0x01, keys: ['Space'], label: 'FIRE' },
    { port: 'IN0', mask: 0x02, keys: ['Digit9'], label: 'SERVICE', activeLow: false, toggle: true },
  ], [], [{ tag: 'IN0', init: 0xfd }]);
  const t = new EventTarget();
  fresh.attach(t);
  t.dispatchEvent(keyEvent('keydown', 'Digit9'));  // a maintained switch, flipped
  t.dispatchEvent(keyEvent('keydown', 'Space'));   // and a button, held
  assert.equal(settle(fresh).read('IN0'), 0xfe, 'the switch is on and the button is down');
  fresh.releaseAll();
  assert.equal(settle(fresh).read('IN0'), 0xff, 'a lost keyup drops the button and leaves the switch');
  t.dispatchEvent(keyEvent('keydown', 'Space'));
  fresh.reset();
  assert.equal(fresh.read('IN0'), 0xfd, 'reset clears the switch, the hold and the queue at once');
  fresh.latch();
  assert.equal(fresh.read('IN0'), 0xfd, 'and nothing was left queued to land afterwards');
}

console.log('input.spec: press() edges and release listeners passed');

// Two keys on one field: the field stays pressed until both are up.
{
  const shared = new KeyboardInput([
    { port: 'IN0', mask: 0x01, keys: ['Space', 'KeyX'], label: 'IPT_BUTTON1', type: 'IPT_BUTTON1' },
  ], [], [{ tag: 'IN0', init: 0xff }]);
  const t = new EventTarget();
  shared.attach(t);
  t.dispatchEvent(keyEvent('keydown', 'Space'));
  t.dispatchEvent(keyEvent('keydown', 'KeyX'));
  t.dispatchEvent(keyEvent('keyup', 'Space'));
  assert.equal(settle(shared).read('IN0'), 0xfe, 'X still holds fire after Space is released');
  t.dispatchEvent(keyEvent('keyup', 'KeyX'));
  assert.equal(settle(shared).read('IN0'), 0xff);
}

// Frame interpolation: with the board reporting its progress through the
// frame, a relative port hands out the frame's travel gradually (MAME's
// frame_interpolate), so a counter read four times a frame sees a quarter
// of the distance each time; without a fraction it is the plain end value.
{
  const dial: FieldBinding[] = [
    { port: 'TB', mask: 0xf0, keys: ['ArrowLeft'], label: 'IPT_TRACKBALL_X_LEFT', type: 'IPT_TRACKBALL_X_LEFT', activeLow: false, relativeDelta: -1 },
    { port: 'TB', mask: 0xf0, keys: ['ArrowRight'], label: 'IPT_TRACKBALL_X_RIGHT', type: 'IPT_TRACKBALL_X_RIGHT', activeLow: false, relativeDelta: 1 },
    { port: 'TB', mask: 0x01, keys: ['KeyX'], label: 'IPT_BUTTON1', type: 'IPT_BUTTON1' },
  ];
  const tb = new KeyboardInput(dial, [], [{ tag: 'TB', init: 0x01 }]);
  let fraction = 1;
  tb.frameFraction = () => fraction;
  tb.advance();
  tb.nudge(dial[1]!, 12); // 12 units this frame, in the high nibble
  fraction = 0;
  assert.equal(settle(tb).read('TB'), 0x01, 'at the top of the frame the counter has not moved');
  fraction = 0.25;
  assert.equal(settle(tb).read('TB'), 0x31, 'a quarter in, a quarter of the travel');
  fraction = 0.5;
  assert.equal(settle(tb).read('TB'), 0x61);
  fraction = 1;
  assert.equal(settle(tb).read('TB'), 0xc1, 'between frames the full travel is there');
  // The next frame starts from where the last one ended, and a counter that
  // wraps interpolates the short way round.
  tb.advance();
  tb.nudge(dial[1]!, 8); // 12 + 8 = 20 -> wraps to 4
  fraction = 0.5;
  assert.equal(settle(tb).read('TB'), 0x01, '12 + 4 = 16 wraps to 0 halfway');
  // 12 forward on a 4-bit counter looks like 4 back; the frame's own signed
  // travel, not the wrapped bytes, decides the direction.
  tb.advance();
  tb.nudge(dial[1]!, 12);
  fraction = 0.25;
  assert.equal(settle(tb).read('TB'), 0x71, 'a quarter of +12 from 4 is 7, never 3');
  tb.advance();
  tb.nudge(dial[1]!, -12); // back to 4
  fraction = 1;
  assert.equal(settle(tb).read('TB'), 0x41);
  tb.advance();
  tb.nudge(dial[1]!, -6);
  fraction = 0.5;
  assert.equal(settle(tb).read('TB'), 0x11, 'backwards travel interpolates backwards');
  // The button bit in the same port is untouched by the blend.
  fraction = 0.5;
  assert.equal(settle(tb).read('TB') & 0x01, 0x01);
  tb.frameFraction = null;
  assert.equal(settle(tb).read('TB'), 0xe1, 'no fraction, no interpolation');
}
console.log('input.spec: frame interpolation of relative controls passed');
