import assert from 'node:assert/strict';
import { KeyboardInput, portHandlers } from './input.ts';

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
assert.equal(input.read('IN0'), 0xfe);
target.dispatchEvent(keyEvent('keyup', 'Space'));
assert.equal(input.read('IN0'), 0xff);

target.dispatchEvent(keyEvent('keydown', 'Digit1'));
assert.equal(input.read('IN1'), 0x01);
target.dispatchEvent(keyEvent('keyup', 'Digit1'));
assert.equal(input.read('IN1'), 0x00);

target.dispatchEvent(keyEvent('keydown', 'Digit9'));
target.dispatchEvent(keyEvent('keyup', 'Digit9'));
assert.equal(input.read('IN1'), 0x02, 'a maintained switch must survive keyup');
target.dispatchEvent(new Event('blur'));
assert.equal(input.read('IN1'), 0x02, 'a maintained switch must survive focus loss');
target.dispatchEvent(keyEvent('keydown', 'Digit9'));
assert.equal(input.read('IN1'), 0x00, 'the next keydown must release a maintained switch');

target.dispatchEvent(keyEvent('keydown', 'ArrowLeft'));
target.dispatchEvent(keyEvent('keydown', 'ArrowRight'));
assert.equal(input.read('IN0') & 0x06, 0x02, 'newest opposite direction must win');
target.dispatchEvent(keyEvent('keyup', 'ArrowRight'));
assert.equal(input.read('IN0') & 0x06, 0x04, 'releasing newest direction must restore held opposite');
target.dispatchEvent(new Event('blur'));
assert.equal(input.read('IN0'), 0xff);

target.dispatchEvent(keyEvent('keydown', 'ArrowUp'));
assert.equal(input.read('PEDAL'), 0x90, 'absolute pedal must use its source maximum');
target.dispatchEvent(keyEvent('keyup', 'ArrowUp'));
assert.equal(input.read('PEDAL'), 0x00, 'absolute pedal must return to its source rest value');

target.dispatchEvent(keyEvent('keydown', 'KeyA'));
assert.equal(input.read('DIAL'), 0xfc, 'relative dial must wrap its hardware counter');
target.dispatchEvent(keyEvent('keydown', 'KeyD', true));
assert.equal(input.read('DIAL'), 0x00, 'relative dial must accept held-key repeat pulses');

input.setDip('IN0', 0x80, 0);
assert.equal(input.read('IN0'), 0x7f);
assert.equal(input.read('missing'), 0xff);
assert.equal(input.dump(), 'IN0=7f IN1=00 PEDAL=00 DIAL=00');

const handlers = portHandlers([
  { start: 0, end: 0, kind: 'handler', read: 'port.IN0' },
  { start: 1, end: 1, kind: 'handler', read: 'device.status' },
], input);
assert.equal(handlers['port.IN0']?.(0, 0), 0x7f);
assert.equal(handlers['device.status'], undefined);

console.log('input.spec: polarity, SOCD, release, DIP and generated port handlers passed');
