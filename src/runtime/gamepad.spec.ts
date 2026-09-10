import assert from 'node:assert/strict';
import { GamepadInput, padName, type PadState } from './gamepad.ts';
import { KeyboardInput, type FieldBinding } from './input.ts';

/**
 * A machine only ever sees input at a frame boundary (see KeyboardInput
 * .advance), so settle what is queued before reading a port back.
 */
function settle<T extends { latch(): void }>(model: T): T {
  model.latch();
  return model;
}


// A Street Fighter panel and a coin door, with player two's stick and punches
// sharing player one's ports the way the CPS boards wire them.
const bindings: FieldBinding[] = [
  { port: 'IN0', mask: 0x01, keys: ['Digit5'], label: 'IPT_COIN1', type: 'IPT_COIN1' },
  { port: 'IN0', mask: 0x02, keys: ['Digit6'], label: 'IPT_COIN2', type: 'IPT_COIN2' },
  { port: 'IN0', mask: 0x10, keys: ['Digit1'], label: 'IPT_START1', type: 'IPT_START1' },
  { port: 'IN0', mask: 0x20, keys: ['Digit2'], label: 'IPT_START2', type: 'IPT_START2' },
  { port: 'IN1', mask: 0x01, keys: ['ArrowRight'], label: 'IPT_JOYSTICK_RIGHT', type: 'IPT_JOYSTICK_RIGHT' },
  { port: 'IN1', mask: 0x02, keys: ['ArrowLeft'], label: 'IPT_JOYSTICK_LEFT', type: 'IPT_JOYSTICK_LEFT' },
  { port: 'IN1', mask: 0x04, keys: ['ArrowDown'], label: 'IPT_JOYSTICK_DOWN', type: 'IPT_JOYSTICK_DOWN' },
  { port: 'IN1', mask: 0x08, keys: ['ArrowUp'], label: 'IPT_JOYSTICK_UP', type: 'IPT_JOYSTICK_UP' },
  { port: 'IN1', mask: 0x10, keys: ['KeyA', 'Space'], label: 'P1 Jab Punch', type: 'IPT_BUTTON1' },
  { port: 'IN1', mask: 0x20, keys: ['KeyS'], label: 'P1 Strong Punch', type: 'IPT_BUTTON2' },
  { port: 'IN1', mask: 0x40, keys: ['KeyD'], label: 'P1 Fierce Punch', type: 'IPT_BUTTON3' },
  { port: 'IN2', mask: 0x01, keys: ['KeyZ'], label: 'P1 Short Kick', type: 'IPT_BUTTON4' },
  { port: 'IN2', mask: 0x02, keys: ['KeyX'], label: 'P1 Forward Kick', type: 'IPT_BUTTON5' },
  { port: 'IN2', mask: 0x04, keys: ['KeyC'], label: 'P1 Roundhouse Kick', type: 'IPT_BUTTON6' },
  { port: 'IN1', mask: 0x100, keys: [], label: 'IPT_JOYSTICK_RIGHT', type: 'IPT_JOYSTICK_RIGHT', player: 2 },
  { port: 'IN1', mask: 0x200, keys: [], label: 'IPT_JOYSTICK_LEFT', type: 'IPT_JOYSTICK_LEFT', player: 2 },
  { port: 'IN1', mask: 0x1000, keys: [], label: 'P2 Jab Punch', type: 'IPT_BUTTON1', player: 2 },
];
const ports = [{ tag: 'IN0', init: 0xff }, { tag: 'IN1', init: 0xffff }, { tag: 'IN2', init: 0xff }];

function pad(index: number, overrides: Partial<PadState> = {}): PadState {
  return {
    index, id: `FightBox R10-Pro (Vendor: 1209 Product: 0001)`, mapping: 'standard', connected: true,
    buttons: Array.from({ length: 17 }, () => ({ pressed: false, value: 0 })),
    axes: [0, 0, 0, 0],
    ...overrides,
  };
}
function pressing(index: number, buttons: number[], axes: number[] = [0, 0, 0, 0]): PadState {
  return pad(index, {
    axes,
    buttons: Array.from({ length: 17 }, (_, i) => ({ pressed: buttons.includes(i), value: buttons.includes(i) ? 1 : 0 })),
  });
}

{
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(bindings, [], ports);
  const source = new GamepadInput(input, bindings, () => pads);
  const changes: number[][] = [];
  source.onChange(connected => changes.push(connected.map(c => c.player)));

  source.poll();
  assert.deepEqual(source.connected(), [], 'no pad, nothing driven');
  assert.deepEqual(source.controlNames(bindings[8]!), [], 'the legend shows no pad until one connects');

  pads = [pad(0)];
  source.poll();
  assert.deepEqual(changes, [[1]], 'the first pad becomes player one');
  assert.equal(source.connected()[0]?.id.startsWith('FightBox'), true);

  // Face buttons in the Street Fighter order: punches on X/Y/RB, kicks on A/B/RT.
  pads = [pressing(0, [2, 3, 5])];
  source.poll();
  assert.equal(settle(input).read('IN1') & 0x70, 0x00, 'X, Y and RB are the punch row');
  assert.equal(settle(input).read('IN2'), 0xff, 'the kick row is untouched');
  pads = [pressing(0, [0, 1, 7])];
  source.poll();
  assert.equal(settle(input).read('IN1') & 0x70, 0x70, 'released punches return to rest');
  assert.equal(settle(input).read('IN2') & 0x07, 0x00, 'A, B and RT are the kick row');

  // The first small button (Select) is start; the second (Start) is coin.
  pads = [pressing(0, [9, 8])];
  source.poll();
  assert.equal(settle(input).read('IN0'), 0xff & ~0x11, 'Select and Start press start 1 and coin 1');
  assert.equal(settle(input).read('IN2'), 0xff);

  // The d-pad and the left stick both move; opposite directions resolve SOCD.
  pads = [pressing(0, [14])];
  source.poll();
  assert.equal(settle(input).read('IN1') & 0x0f, 0x0d, 'd-pad left');
  pads = [pressing(0, [14], [0.9, 0, 0, 0])];
  source.poll();
  assert.equal(settle(input).read('IN1') & 0x0f, 0x0e, 'stick right, held after the d-pad, wins');
  pads = [pressing(0, [14], [0.2, -0.9, 0, 0])];
  source.poll();
  assert.equal(settle(input).read('IN1') & 0x0f, 0x05, 'inside the deadzone the stick releases; up is the y axis');

  // Held buttons are edges, not levels: nothing re-presses between polls.
  pads = [pressing(0, [2])];
  source.poll();
  source.poll();
  assert.equal(settle(input).read('IN1') & 0x10, 0x00);
  pads = [pad(0)];
  source.poll();
  assert.equal(settle(input).read('IN1'), 0xffff, 'everything released');

  // A second pad is player two, on player two's fields and coin/start slot.
  pads = [pressing(0, [2]), pressing(1, [2, 9, 8], [-0.9, 0, 0, 0])];
  source.poll();
  assert.deepEqual(changes.at(-1), [1, 2]);
  assert.equal(settle(input).read('IN1'), 0xffff & ~0x10 & ~0x1000 & ~0x200, 'both jabs and player two\'s left');
  assert.equal(settle(input).read('IN0'), 0xff & ~0x22, 'pad two\'s Select and Start are start 2 and coin 2');
  assert.deepEqual(source.controlNames(bindings[3]!), ['Select'], 'start 2 is named from pad two');

  // Unplugging releases what that pad held and frees its slot.
  pads = [pressing(0, [2]), null];
  source.poll();
  assert.deepEqual(changes.at(-1), [1]);
  assert.equal(settle(input).read('IN1'), 0xffff & ~0x10, 'player two\'s fields are released');
  assert.equal(settle(input).read('IN0'), 0xff);
  pads = [pressing(0, [2]), pad(3)];
  source.poll();
  assert.deepEqual(source.connected().map(c => [c.player, c.index]), [[1, 0], [2, 3]], 'a new pad takes the free slot');

  // A blur releases every field; the still-held button comes back on the next poll.
  input.releaseAll();
  assert.equal(settle(input).read('IN1'), 0xffff);
  source.poll();
  assert.equal(settle(input).read('IN1'), 0xffff & ~0x10, 'held X re-pressed after releaseAll');

  // Legend names for the standard layout, including the fold aliases.
  assert.deepEqual(source.controlNames(bindings[8]!), ['X'], 'jab has a kick below it, so no alias');
  assert.deepEqual(source.controlNames(bindings[4]!), ['D-pad'], 'directions read as the d-pad');
  assert.deepEqual(source.controlNames(bindings[0]!), ['Start']);
}

// A two-button machine: the bottom row echoes the top so a plain pad fires
// from A, and B is the second button, while the left shoulder stays free.
{
  const two: FieldBinding[] = [
    { port: 'IN0', mask: 0x01, keys: ['Space'], label: 'IPT_BUTTON1', type: 'IPT_BUTTON1' },
    { port: 'IN0', mask: 0x02, keys: ['KeyZ'], label: 'IPT_BUTTON2', type: 'IPT_BUTTON2' },
    { port: 'IN0', mask: 0x04, keys: ['Digit1'], label: 'IPT_START1', type: 'IPT_START1' },
  ];
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(two, [], [{ tag: 'IN0', init: 0xff }]);
  const source = new GamepadInput(input, two, () => pads);
  pads = [pressing(0, [0])];
  source.poll();
  assert.equal(settle(input).read('IN0'), 0xfe, 'A fires button 1 when there is no button 4');
  pads = [pressing(0, [1, 7])];
  source.poll();
  assert.equal(settle(input).read('IN0'), 0xfd, 'B is button 2; RT has no button 3 to echo');
  pads = [pressing(0, [2, 0])];
  source.poll();
  assert.equal(settle(input).read('IN0'), 0xfe);
  pads = [pressing(0, [2])];
  source.poll();
  assert.equal(settle(input).read('IN0'), 0xfe, 'releasing A while X is held keeps button 1 down');
  pads = [pad(0)];
  source.poll();
  assert.deepEqual(source.controlNames(two[0]!), ['X', 'A']);
  // More pads than players: the third is ignored, not player three.
  pads = [pad(0), pad(1), pad(2)];
  source.poll();
  assert.deepEqual(source.connected().map(c => c.player), [1]);
}

// A pad the browser did not recognise: same button order, stick on axes 0/1,
// no d-pad, and the legend numbers the buttons instead of naming them.
{
  const one: FieldBinding[] = [
    { port: 'IN0', mask: 0x01, keys: ['Space'], label: 'IPT_BUTTON1', type: 'IPT_BUTTON1' },
    { port: 'IN0', mask: 0x02, keys: ['ArrowLeft'], label: 'IPT_JOYSTICK_LEFT', type: 'IPT_JOYSTICK_LEFT' },
    { port: 'DIAL', mask: 0xff, keys: ['ArrowLeft'], label: 'IPT_DIAL_LEFT', type: 'IPT_DIAL_LEFT', activeLow: false, relativeDelta: -4 },
    { port: 'DIAL', mask: 0xff, keys: ['ArrowRight'], label: 'IPT_DIAL_RIGHT', type: 'IPT_DIAL_RIGHT', activeLow: false, relativeDelta: 4 },
  ];
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(one, [], [{ tag: 'IN0', init: 0xff }, { tag: 'DIAL', init: 0 }]);
  const source = new GamepadInput(input, one, () => pads);
  pads = [pad(0, { mapping: '', buttons: Array.from({ length: 10 }, () => ({ pressed: false, value: 0 })), axes: [0, 0] })];
  source.poll();
  assert.deepEqual(source.controlNames(one[0]!), ['button 3', 'button 1']);
  pads = [pad(0, { mapping: '', buttons: Array.from({ length: 10 }, (_, i) => ({ pressed: i === 12, value: 0 })), axes: [-1, 0] })];
  source.poll();
  assert.equal(settle(input).read('IN0'), 0xfd, 'the stick moves an unmapped pad');
  assert.equal(settle(input).read('DIAL'), 0xfc, 'a relative dial takes its first pulse from the stick');
  input.advance();
  assert.equal(settle(input).read('DIAL'), 0xf8, 'and ramps every frame while the stick is held');
  pads = [pad(0, { mapping: '', axes: [0, 0] })];
  source.poll();
  input.advance();
  assert.equal(settle(input).read('DIAL'), 0xf8, 'the counter holds when the stick centres');
}

assert.equal(padName('FightBox R10-Pro (Vendor: 1209 Product: 0001)'), 'FightBox R10-Pro');
assert.equal(padName('1209-0001-FightBox R10-Pro'), 'FightBox R10-Pro');
assert.equal(padName('Xbox Wireless Controller Extended Gamepad'), 'Xbox Wireless Controller Extended Gamepad');
assert.equal(padName(''), 'gamepad');

console.log('gamepad.spec: standard layout, fold aliases, two players, hot-plug and unmapped pads passed');
