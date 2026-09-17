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

// A panel whose buttons do not start at button one.
//
// Tutankham's only button is IPT_BUTTON2 and Pole Position's is IPT_BUTTON3.
// Folding the bottom row by name paired A to IPT_BUTTON1, found nothing, and
// left the pad's primary button dead while a secondary one worked. The row
// echoes the machine's buttons in the order it numbers them instead.
{
  const odd: FieldBinding[] = [
    { port: 'IN1', mask: 0x40, keys: ['KeyZ'], label: 'P1 Flash Bomb', type: 'IPT_BUTTON2' },
    { port: 'IN1', mask: 0x01, keys: [], label: 'Right', type: 'IPT_JOYSTICK_RIGHT', ways: 4 },
  ];
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(odd, [], [{ tag: 'IN1', init: 0xff }]);
  const source = new GamepadInput(input, odd, () => pads);
  const bomb = (): boolean => (~input.read('IN1') & 0x40) !== 0;

  pads = [pressing(0, [0])];  // A
  source.poll();
  input.advance();
  assert.equal(bomb(), true, "the machine's first button answers A even when it is BUTTON2");
  pads = [pressing(0, [])];
  source.poll();
  input.advance();
  assert.equal(bomb(), false);
  pads = [pressing(0, [3])];  // Y, where the standard layout puts BUTTON2
  source.poll();
  input.advance();
  assert.equal(bomb(), true, 'and its own place on the layout still works');
  assert.deepEqual(source.controlNames(odd[0]!).sort(), ['A', 'Y']);
}

// A tap the pad shows between two emulated frames.
//
// The Gamepad API has no events, only a snapshot the browser refreshes once a
// display frame, so a press and a release can both fall between two frames --
// a window that is one frame while the page keeps up and the whole of a stall
// when it does not. Both edges are posted and the input model holds the press
// for the frame rather than letting the pair cancel.
{
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(bindings, [], ports);
  const source = new GamepadInput(input, bindings, () => pads);
  pads = [pressing(0, [])];
  source.poll();
  input.advance();

  pads = [pressing(0, [2])];  // X, the jab punch
  source.poll();
  pads = [pressing(0, [])];
  source.poll();
  input.advance();
  assert.equal(input.read('IN1') & 0x10, 0x00, 'a tap between two frames still punches');
  input.advance();
  assert.equal(input.read('IN1') & 0x10, 0x10, 'and lets go on the next frame');
}

// A lever shoved from centre straight into a corner of a 4-way gate.
//
// Both switches cross the deadzone in the same poll, so the bits alone
// cannot say which direction the player meant. The magnitudes can, and the
// pad is the last place that still has them: it posts the leaning axis
// second, and the gate reads that as "arrived later" exactly as it reads a
// keyboard. Without this a stick shoved up-left always gave left and held
// it, so the player could not climb.
{
  const lever: FieldBinding[] = [
    { port: 'IN1', mask: 0x08, keys: [], label: 'Up', type: 'IPT_JOYSTICK_UP', ways: 4 },
    { port: 'IN1', mask: 0x04, keys: [], label: 'Down', type: 'IPT_JOYSTICK_DOWN', ways: 4 },
    { port: 'IN1', mask: 0x02, keys: [], label: 'Left', type: 'IPT_JOYSTICK_LEFT', ways: 4 },
    { port: 'IN1', mask: 0x01, keys: [], label: 'Right', type: 'IPT_JOYSTICK_RIGHT', ways: 4 },
  ];
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(lever, [], [{ tag: 'IN1', init: 0xff }]);
  const source = new GamepadInput(input, lever, () => pads);
  /** Which directions the port asserts, by label. */
  const held = (): string[] => lever.filter(b => (~input.read('IN1') & b.mask) !== 0).map(b => b.label);
  const shove = (x: number, y: number): string[] => {
    pads = [pad(0, { axes: [x, y, 0, 0] })];
    source.poll();
    input.advance();
    return held();
  };

  // A four-way lever's release is believed only once a second poll agrees,
  // so centring it takes one extra poll. That is the price of not flipping
  // on a bounce, and it is paid only here.
  const centre = (): string[] => { shove(0, 0); return shove(0, 0); };

  assert.deepEqual(centre(), []);
  assert.deepEqual(shove(-0.8, -0.95), ['Up'], 'a corner leaning up reads up');
  assert.deepEqual(shove(-0.8, -0.95), ['Up'], 'and holds it while the lever stays there');
  assert.deepEqual(centre(), []);
  assert.deepEqual(shove(-0.95, -0.8), ['Left'], 'a corner leaning left reads left');
  assert.deepEqual(centre(), []);
  // A real direction change still wins: that is MAME's own rule and it runs
  // before any of this.
  assert.deepEqual(shove(-0.9, 0), ['Left'], 'push left');
  assert.deepEqual(shove(-0.9, -0.9), ['Up'], 'rolling to up-left lands on up');
  assert.deepEqual(shove(0, -0.9), ['Up'], 'and easing off leaves up');

  // The bounce the whole thing is for: the right switch drops out of one
  // poll and is back in the next, while the lever is held in a corner.
  assert.deepEqual(centre(), []);
  assert.deepEqual(shove(0.9, 0), ['Right'], 'push right');
  assert.deepEqual(shove(0.9, -0.9), ['Up'], 'roll into the up-right corner');
  assert.deepEqual(shove(0, -0.9), ['Up'], 'the right switch misses a poll');
  assert.deepEqual(shove(0.9, -0.9), ['Up'], 'and is back: the lever has not moved');
  assert.deepEqual(shove(0.9, -0.9), ['Up'], 'and it still has not');
  // Two polls without it is a real release, and the lever follows.
  shove(0, -0.9);
  assert.deepEqual(shove(0, -0.9), ['Up'], 'letting go of right leaves up');
}

// A lever the browser could not map, on a POV hat.
//
// An unrecognised fight stick often reports an empty mapping and puts its
// lever on a hat axis, which centres outside an axis's own -1..1 range. That
// is what tells it apart from an analog stick resting at 0, which would
// otherwise read as a direction held forever.
{
  const hatPad = (value: number): PadState => pad(0, {
    mapping: '',
    buttons: Array.from({ length: 10 }, () => ({ pressed: false, value: 0 })),
    axes: [0, 0, 0, 0, 0, 0, 0, 0, 0, value],
  });
  let pads: (PadState | null)[] = [];
  const input = new KeyboardInput(bindings, [], ports);
  const source = new GamepadInput(input, bindings, () => pads);
  pads = [hatPad(3.2857)]; // centred, and out of range: this axis is a hat
  source.poll();
  input.advance();
  assert.equal(input.read('IN1') & 0x0f, 0x0f, 'a resting hat asserts no direction');
  pads = [hatPad(-1)]; // detent 0
  source.poll();
  input.advance();
  assert.equal(~input.read('IN1') & 0x0f, 0x08, 'the hat pushed up reads up');
  pads = [hatPad(-1 + 3 / 3.5)]; // detent 3: down-right
  source.poll();
  input.advance();
  assert.equal(~input.read('IN1') & 0x0f, 0x05, 'and a corner detent reads both its directions');
  pads = [hatPad(3.2857)];
  source.poll();
  input.advance();
  assert.equal(input.read('IN1') & 0x0f, 0x0f, 'and centres again');

  // An analog axis resting at 0 is never mistaken for a hat detent.
  const analog = new KeyboardInput(bindings, [], ports);
  let plain: (PadState | null)[] = [];
  const stick = new GamepadInput(analog, bindings, () => plain);
  plain = [pad(0, { mapping: '', axes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] })];
  stick.poll();
  analog.advance();
  assert.equal(analog.read('IN1') & 0x0f, 0x0f, 'an axis at rest is a stick, not a hat');
}

assert.equal(padName('FightBox R10-Pro (Vendor: 1209 Product: 0001)'), 'FightBox R10-Pro');
assert.equal(padName('1209-0001-FightBox R10-Pro'), 'FightBox R10-Pro');
assert.equal(padName('Xbox Wireless Controller Extended Gamepad'), 'Xbox Wireless Controller Extended Gamepad');
assert.equal(padName(''), 'gamepad');

console.log('gamepad.spec: standard layout, fold aliases, two players, hot-plug and unmapped pads passed');
