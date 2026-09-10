import assert from 'node:assert/strict';
import { KeyboardInput, type FieldBinding } from './input.ts';
import { Session, type SessionMessage } from './session.ts';

// A two-player cabinet: player one has the keys, player two has the same
// controls with no keys of its own (which is how MAME describes every
// two-player board), plus the start buttons whose player lives in the type.
const bindings: FieldBinding[] = [
  { port: 'IN0', mask: 0x01, keys: ['ArrowLeft'], label: 'P1 Left', type: 'IPT_JOYSTICK_LEFT', player: 1 },
  { port: 'IN0', mask: 0x02, keys: ['Space'], label: 'P1 Fire', type: 'IPT_BUTTON1', player: 1 },
  { port: 'IN0', mask: 0x10, keys: [], label: 'P2 Left', type: 'IPT_JOYSTICK_LEFT', player: 2 },
  { port: 'IN0', mask: 0x20, keys: [], label: 'P2 Fire', type: 'IPT_BUTTON1', player: 2 },
  { port: 'IN1', mask: 0x01, keys: ['Digit1'], label: 'Start 1', type: 'IPT_START1' },
  { port: 'IN1', mask: 0x02, keys: ['Digit2'], label: 'Start 2', type: 'IPT_START2' },
];
const ports = [{ tag: 'IN0', init: 0xff }, { tag: 'IN1', init: 0xff }];

function keyEvent(type: 'keydown' | 'keyup', code: string): Event {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, { code: { value: code }, repeat: { value: false } });
  return event;
}

// --- alone: a session of one, no delay, no waiting ------------------------
{
  const input = new KeyboardInput(bindings, [], ports);
  const target = new EventTarget();
  input.attach(target);
  const session = new Session({ input, bindings, checkEvery: 0 });
  assert.equal(session.room, false);
  assert.equal(session.delay, 0);

  target.dispatchEvent(keyEvent('keydown', 'Space'));
  // Nothing reaches a port until the frame boundary, even alone.
  assert.equal(input.read('IN0'), 0xff, 'a press waits for the frame it belongs to');
  session.publish();
  assert.equal(session.ready(), true, 'alone, a frame is never waiting for anybody');
  input.advance(session.take());
  assert.equal(input.read('IN0'), 0xfd, 'and lands when the frame runs');
  session.completed(() => 'hash');
  assert.equal(session.frame, 1);

  // Alone, a second pad still drives player two: nobody else owns it.
  input.press(bindings[3]!, true, 'pad2:b');
  session.publish();
  input.advance(session.take());
  assert.equal(input.read('IN0'), 0xdd, 'a local second pad keeps player two');
  assert.deepEqual(session.log.map(entry => entry.frame), [0, 1], 'only frames with input are logged');
}

// --- a joiner's own controls drive player two -----------------------------
{
  const input = new KeyboardInput(bindings, [], ports);
  const target = new EventTarget();
  input.attach(target);
  const session = new Session({ input, bindings, player: 2, players: [1, 2], delay: 0, checkEvery: 0 });

  target.dispatchEvent(keyEvent('keydown', 'ArrowLeft'));
  target.dispatchEvent(keyEvent('keydown', 'Digit1'));
  session.publish();
  session.receive({ kind: 'input', player: 1, frame: 0, events: [] });
  input.advance(session.take());
  assert.equal(input.read('IN0'), 0xef, "the joiner's left drives player two's left");
  assert.equal(input.read('IN1'), 0xfd, 'and their start-one key drives start two');
}

// --- coin and start are the cabinet's, not one player's -------------------
//
// They are buttons somebody at the machine presses, and the keyboard in
// front of each player is labelled 1 and 2 for them. Neither should do
// nothing: the host works the whole cabinet, and the joiner's own start and
// coin reach their own slot whichever of the two they press.
{
  const table = (player: number): string[] => {
    const rows: string[] = [];
    for (const binding of bindings) {
      const input = new KeyboardInput(bindings, [], ports);
      const session = new Session({ input, bindings, player, players: [1, 2], delay: 0, checkEvery: 0 });
      input.press(binding, true, 'k');
      session.publish();
      const hit = session.take().find(event => event.kind === 'edge') as { binding: number } | undefined;
      rows.push(`${binding.label} -> ${hit ? bindings[hit.binding]!.label : 'nothing'}`);
    }
    return rows;
  };
  assert.deepEqual(table(1), [
    'P1 Left -> P1 Left',
    'P1 Fire -> P1 Fire',
    'P2 Left -> nothing',
    'P2 Fire -> nothing',
    'Start 1 -> Start 1',
    'Start 2 -> Start 2',
  ], 'the host plays player one and works both start buttons');
  assert.deepEqual(table(2), [
    'P1 Left -> P2 Left',
    'P1 Fire -> P2 Fire',
    'P2 Left -> nothing',
    'P2 Fire -> nothing',
    'Start 1 -> Start 2',
    'Start 2 -> Start 2',
  ], "the joiner's own controls play player two, and either start key is theirs");
}

// --- in a room, the other player's controls are not this browser's --------
{
  const input = new KeyboardInput(bindings, [], ports);
  const session = new Session({ input, bindings, player: 1, players: [1, 2], delay: 0, checkEvery: 0 });
  input.press(bindings[3]!, true, 'pad2:b'); // a local second pad, in a room
  session.publish();
  session.receive({ kind: 'input', player: 2, frame: 0, events: [] });
  input.advance(session.take());
  assert.equal(input.read('IN0'), 0xff, 'player two belongs to the other browser now');
}

// --- the gate: a frame does not run until everyone has spoken -------------
{
  const input = new KeyboardInput(bindings, [], ports);
  const session = new Session({ input, bindings, player: 1, players: [1, 2], delay: 2, checkEvery: 0 });
  // The opening frames are seeded: nobody pressed anything two frames ago.
  session.publish();
  assert.equal(session.ready(), true, 'the room starts without waiting');
  input.advance(session.take());
  session.completed(() => 'h');
  session.publish();
  assert.equal(session.ready(), true);
  input.advance(session.take());
  session.completed(() => 'h');
  // Frame two is the first that needs a real answer from the peer.
  session.publish();
  assert.equal(session.ready(), false, 'and then waits for the peer');
  session.receive({ kind: 'input', player: 2, frame: 2, events: [] });
  assert.equal(session.ready(), true);
  assert.equal(session.buffered, 1, 'one frame in hand and not yet run');
}

// --- two browsers, one machine each, playing the same game ----------------
//
// The proof the whole design rests on: each side sees only its own player's
// controls, publishes them, and both apply the same events in the same order.
// If the merge or the stamping were not deterministic the two port bytes
// would part company here.
{
  const channel: { to: Session; message: SessionMessage }[] = [];
  const hostInput = new KeyboardInput(bindings, [], ports);
  const joinInput = new KeyboardInput(bindings, [], ports);
  const hostTarget = new EventTarget();
  const joinTarget = new EventTarget();
  hostInput.attach(hostTarget);
  joinInput.attach(joinTarget);

  let host!: Session;
  let joiner!: Session;
  host = new Session({
    input: hostInput, bindings, player: 1, players: [1, 2], delay: 2, checkEvery: 4,
    send: message => channel.push({ to: joiner, message }),
    onDesync: () => assert.fail('the two machines parted company'),
  });
  joiner = new Session({
    input: joinInput, bindings, player: 2, players: [1, 2], delay: 2, checkEvery: 4,
    send: message => channel.push({ to: host, message }),
    onDesync: () => assert.fail('the two machines parted company'),
  });

  const deliver = (): void => {
    while (channel.length) {
      const item = channel.shift()!;
      item.to.receive(item.message);
    }
  };
  // Both browsers run the same frame; each is a whole machine of its own.
  const frame = (hash: string): void => {
    host.publish();
    joiner.publish();
    deliver();
    assert.equal(host.ready(), true, `host stalled at frame ${host.frame}`);
    assert.equal(joiner.ready(), true, `joiner stalled at frame ${joiner.frame}`);
    hostInput.advance(host.take());
    joinInput.advance(joiner.take());
    assert.equal(
      hostInput.dump(),
      joinInput.dump(),
      `the two machines disagree at frame ${host.frame}`,
    );
    host.completed(() => hash);
    joiner.completed(() => hash);
    deliver();
  };

  // Both players press things, on their own keyboards, on different frames.
  frame('a');
  hostTarget.dispatchEvent(keyEvent('keydown', 'Space'));   // host fires
  frame('b');
  joinTarget.dispatchEvent(keyEvent('keydown', 'ArrowLeft')); // joiner walks
  frame('c');
  frame('d');
  hostTarget.dispatchEvent(keyEvent('keyup', 'Space'));
  frame('e');
  frame('f');
  frame('g');
  frame('h');

  // Both presses reached the machine, on the correct player's field.
  assert.equal(hostInput.read('IN0'), 0xef, 'the joiner is holding player two left');
  assert.equal(hostInput.dump(), joinInput.dump(), 'and both machines agree');
  // Each side logged both players' input, so either can replay the session.
  assert.deepEqual(
    host.log.map(entry => entry.player).sort(),
    joiner.log.map(entry => entry.player).sort(),
  );
}

// --- a press made while the room is waiting is not thrown away ------------
//
// The run loop asks every animation frame whether it may run, so `publish`
// is called many times for one frame while a peer's input is outstanding.
// Anything pressed in between has to survive that.
{
  const input = new KeyboardInput(bindings, [], ports);
  const target = new EventTarget();
  input.attach(target);
  const session = new Session({ input, bindings, player: 1, players: [1, 2], delay: 1, checkEvery: 0 });
  session.publish();
  input.advance(session.take());
  session.completed(() => 'h');

  // Frame one is waiting for the other player. A coin goes in meanwhile.
  session.publish();
  assert.equal(session.ready(), false, 'the frame is waiting for the peer');
  target.dispatchEvent(keyEvent('keydown', 'Space'));
  session.publish();  // the run loop tries again, and again
  session.publish();
  session.receive({ kind: 'input', player: 2, frame: 1, events: [] });
  input.advance(session.take());
  session.completed(() => 'h');

  // Run on. The press was published with the next frame, so it lands a
  // frame later than it would have — never dropped.
  for (let frame = 2; frame <= 4; frame++) {
    session.publish();
    session.receive({ kind: 'input', player: 2, frame, events: [] });
    assert.equal(session.ready(), true, `frame ${frame} could not run`);
    input.advance(session.take());
    session.completed(() => 'h');
  }
  assert.equal(input.read('IN0'), 0xfd, 'the press made while the room waited still arrived');
}

// --- a machine that has drifted says so ------------------------------------
{
  const input = new KeyboardInput(bindings, [], ports);
  const desyncs: number[] = [];
  const session = new Session({
    input, bindings, player: 1, players: [1, 2], delay: 0, checkEvery: 2,
    onDesync: frame => desyncs.push(frame),
  });
  session.completed(() => 'same');   // frame 0 is a check frame
  session.completed(() => 'ignored');
  session.receive({ kind: 'check', player: 2, frame: 0, hash: 'same' });
  assert.deepEqual(desyncs, [], 'matching machines say nothing');
  session.completed(() => 'ours');   // frame 2
  session.receive({ kind: 'check', player: 2, frame: 2, hash: 'theirs' });
  assert.deepEqual(desyncs, [2], 'a divergence is reported once, with its frame');
  session.completed(() => 'ours');
  session.receive({ kind: 'check', player: 2, frame: 4, hash: 'theirs' });
  assert.deepEqual(desyncs, [2], 'and not repeated every frame after');
}

// --- a resent frame is not applied twice -----------------------------------
{
  const input = new KeyboardInput(bindings, [], ports);
  const session = new Session({ input, bindings, player: 1, players: [1, 2], delay: 0, checkEvery: 0 });
  const press = { kind: 'edge' as const, binding: 2, down: true, source: 'p2:ArrowLeft' };
  session.receive({ kind: 'input', player: 2, frame: 0, events: [press] });
  session.receive({ kind: 'input', player: 2, frame: 0, events: [press] });
  session.publish();
  assert.deepEqual(session.take().filter(event => event.kind === 'edge').length, 1,
    'a duplicate delivery is dropped, not replayed');
}

console.log('session.spec: the frame gate, player mapping, lockstep between two browsers and desync reporting passed');
