import assert from 'node:assert/strict';
import { bindingsForCards, KeyboardInput, peripheralCards, type FieldBinding } from './input.ts';
import { LightgunInput } from './lightgun.ts';
import { PointerInput } from './pointer.ts';

// The NES as generated: a joypad on both ports, and the controllers a title
// may ask for on the second, each binding naming its card. The Zapper's axes
// span MAME's PORT_MINMAX(0, 255) and (0, 239); the Vaus is an absolute paddle
// that stays where it is put (PORT_CENTERDELTA(0)).
const bindings: FieldBinding[] = [
  { port: 'ctrl1:JOYPAD', mask: 0x01, keys: ['KeyX'], label: 'A', type: 'IPT_BUTTON1', activeLow: false },
  { port: 'ctrl2:GUN_X', mask: 0xff, keys: [], label: 'Aim (horizontal)', type: 'IPT_LIGHTGUN_X', activeLow: false,
    lightgun: { axis: 'x', min: 0, max: 255 }, card: 'ctrl2:zapper' },
  { port: 'ctrl2:GUN_Y', mask: 0xff, keys: [], label: 'Aim (vertical)', type: 'IPT_LIGHTGUN_Y', activeLow: false,
    lightgun: { axis: 'y', min: 0, max: 239 }, card: 'ctrl2:zapper' },
  { port: 'ctrl2:GUN_T', mask: 0x01, keys: ['KeyZ'], label: 'Lightgun Trigger', type: 'IPT_BUTTON1', activeLow: false, card: 'ctrl2:zapper' },
  { port: 'ctrl2:PADDLE', mask: 0x1ff, keys: ['ArrowLeft'], label: 'IPT_PADDLE_LEFT', type: 'IPT_PADDLE_LEFT', activeLow: false,
    activeValue: 0x78, keyDelta: 35, centerDelta: 0, sensitivity: 50, card: 'ctrl2:vaus' },
  { port: 'ctrl2:PADDLE', mask: 0x1ff, keys: ['ArrowRight'], label: 'IPT_PADDLE_RIGHT', type: 'IPT_PADDLE_RIGHT', activeLow: false,
    activeValue: 0x1f8, keyDelta: 35, centerDelta: 0, sensitivity: 50, card: 'ctrl2:vaus' },
];
const ports = [
  { tag: 'ctrl1:JOYPAD', init: 0 }, { tag: 'ctrl2:GUN_X', init: 0x80 }, { tag: 'ctrl2:GUN_Y', init: 0x80 },
  { tag: 'ctrl2:GUN_T', init: 0 }, { tag: 'ctrl2:PADDLE', init: 0x130 },
];

// Duck Hunt asks for the Zapper: it goes in the slot its bindings name, and
// only its controls (and the always-fitted joypad's) are live.
assert.deepEqual(peripheralCards(bindings, ['zapper']), { ctrl2: 'zapper' });
assert.deepEqual(peripheralCards(bindings, ['zapper', 'powerpad', 'vaus']), { ctrl2: 'zapper' }, 'the first listed wins the slot');
assert.deepEqual(peripheralCards(bindings, ['3dglasses']), {}, 'a peripheral no card answers is not fitted');
const zapper = bindingsForCards(bindings, { ctrl2: 'zapper' });
assert.deepEqual(zapper.map(binding => binding.port), ['ctrl1:JOYPAD', 'ctrl2:GUN_X', 'ctrl2:GUN_Y', 'ctrl2:GUN_T']);
assert.deepEqual(bindingsForCards(bindings, undefined).map(binding => binding.port), ['ctrl1:JOYPAD'], 'no card, no card controls');

// The light gun: aimed across the field's travel, fired with its own button.
{
  const input = new KeyboardInput(zapper, [], ports);
  const gun = new LightgunInput(input, zapper);
  assert.equal(gun.active, true);
  assert.deepEqual(gun.bindings().map(binding => binding.port), ['ctrl2:GUN_X', 'ctrl2:GUN_Y', 'ctrl2:GUN_T'],
    'the trigger is the button on the gun, not the joypad\'s');
  gun.aimAt(0.5, 1);
  gun.fire(true);
  input.latch();
  assert.equal(input.read('ctrl2:GUN_X'), 128);
  assert.equal(input.read('ctrl2:GUN_Y'), 239);
  assert.equal(input.read('ctrl2:GUN_T'), 1);
  assert.equal(input.read('ctrl1:JOYPAD'), 0, 'the joypad\'s A is untouched');
  gun.aimAt(-1, 2);
  input.latch();
  assert.deepEqual([input.read('ctrl2:GUN_X'), input.read('ctrl2:GUN_Y')], [0, 239], 'clamped to PORT_MINMAX');
}

// The Vaus: the mouse moves it by PORT_SENSITIVITY within its travel, and it
// stays where it is put when nothing drives it.
{
  const vaus = bindingsForCards(bindings, { ctrl2: 'vaus' });
  const input = new KeyboardInput(vaus, [], ports);
  const pointer = new PointerInput(input, vaus);
  assert.equal(pointer.active, true);
  pointer.move(100, 0);
  pointer.advance();
  input.advance();
  assert.equal(input.read('ctrl2:PADDLE'), 0x130 + 50, '100 pixels at sensitivity 50');
  input.advance();
  assert.equal(input.read('ctrl2:PADDLE'), 0x130 + 50, 'a centre delta of 0 holds it there');
  pointer.move(10_000, 0);
  pointer.advance();
  input.advance();
  assert.equal(input.read('ctrl2:PADDLE'), 0x1f8, 'never past its travel');
}

console.log('lightgun.spec: card controls, the light gun and an absolute paddle drive their ports');
