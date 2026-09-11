import assert from 'node:assert/strict';
import { KeyboardInput, type FieldBinding } from './input.ts';
import type { PeerLink, RoomIdentity } from './netlink.ts';
import { createNetplay, delayForRtt, extractCode } from './netplay.ts';

// --- how long to wait for the other player --------------------------------
{
  assert.equal(delayForRtt(0, 60), 2, 'a link with no measurable lag still buys a frame of slack');
  assert.equal(delayForRtt(100, 60), 4, '50ms each way is three frames at 60Hz, plus one for jitter');
  assert.equal(delayForRtt(undefined, 60), 4, 'an unmeasured link is assumed ordinary');
  assert.equal(delayForRtt(5000, 60), 10, 'and a hopeless one is capped rather than unplayable');
  assert.equal(delayForRtt(100, 50), 4, 'a PAL board counts its own frames');
}

// --- the code inside whatever got pasted -----------------------------------
{
  const code = 'k'.repeat(40);
  assert.equal(extractCode(code), code, 'a bare code is the code');
  assert.equal(extractCode(`  ${code}\n`), code, 'and so is one with a chat client\'s whitespace round it');
  assert.equal(extractCode(`my code is "${code}" — see you there`), code,
    'a sentence wrapped round it does not stop it being found');
  assert.equal(extractCode(`${'a'.repeat(30)} ${code}`), code, 'the longest run wins');
  assert.equal(extractCode('here you go!'), undefined, 'and a message with no code in it is refused');
  assert.equal(extractCode(''), undefined);
}

// --- a DOM small enough to build a lobby in --------------------------------
interface FakeElement {
  tag: string;
  children: FakeElement[];
  style: { cssText: string };
  attrs: Record<string, string>;
  dataset: Record<string, string>;
  textContent: string;
  title: string;
  disabled: boolean;
  readOnly: boolean;
  placeholder: string;
  value: string;
  onclick?: () => void;
  onfocus?: () => void;
  onkeydown?: (event: { key: string }) => void;
  setAttribute(name: string, value: string): void;
  addEventListener(): void;
  append(...items: FakeElement[]): void;
  replaceChildren(...items: FakeElement[]): void;
  blur(): void;
  select(): void;
}

function fakeElement(tag: string): FakeElement {
  const element: FakeElement = {
    tag, children: [], style: { cssText: '' }, attrs: {}, dataset: {}, textContent: '',
    title: '', disabled: false, readOnly: false, placeholder: '', value: '',
    setAttribute(name, value) { element.attrs[name] = value; },
    addEventListener() { /* the lobby only swallows key events */ },
    append(...items) { element.children.push(...items); },
    replaceChildren(...items) { element.children = [...items]; },
    blur() {}, select() {},
  };
  return element;
}
/** ⌘V anywhere on the page is one of the ways a reply arrives. */
let pasteHandler: ((event: unknown) => void) | undefined;
(globalThis as { document?: unknown }).document = {
  createElement: fakeElement,
  addEventListener(type: string, handler: (event: unknown) => void) {
    if (type === 'paste') pasteHandler = handler;
  },
  removeEventListener(type: string) {
    if (type === 'paste') pasteHandler = undefined;
  },
};

/** The first control in a tree carrying this accessible name. */
function byLabel(root: FakeElement, label: string): FakeElement | undefined {
  if (root.attrs['aria-label'] === label) return root;
  for (const child of root.children) {
    const found = byLabel(child, label);
    if (found) return found;
  }
  return undefined;
}

/** Everything the lobby is currently saying, for asserting on the guidance. */
function text(root: FakeElement): string {
  return [root.textContent, ...root.children.map(text)].join(' ');
}

// --- a peer link with no network under it ----------------------------------
class TestLink implements PeerLink {
  peer: RoomIdentity | undefined;
  rtt: number | undefined = 40;
  open = true;
  onMessage: ((message: unknown) => void) | null = null;
  onReady: ((peer: RoomIdentity) => void) | null = null;
  onClose: ((reason: string) => void) | null = null;
  other!: TestLink;
  identity: RoomIdentity;
  constructor(identity: RoomIdentity) { this.identity = identity; }
  send(message: unknown): void { if (this.open) this.other.onMessage?.(message); }
  close(): void {
    if (!this.open) return;
    this.open = false;
    this.onClose?.('you left the game');
    this.other.close();
  }
  ready(): void { this.peer = this.other.identity; this.onReady?.(this.other.identity); }
}

const bindings: FieldBinding[] = [
  { port: 'IN0', mask: 0x01, keys: ['ArrowLeft'], label: 'P1 Left', type: 'IPT_JOYSTICK_LEFT', player: 1 },
  { port: 'IN0', mask: 0x02, keys: ['Space'], label: 'P1 Fire', type: 'IPT_BUTTON1', player: 1 },
  { port: 'IN0', mask: 0x10, keys: [], label: 'P2 Left', type: 'IPT_JOYSTICK_LEFT', player: 2 },
  { port: 'IN0', mask: 0x20, keys: [], label: 'P2 Fire', type: 'IPT_BUTTON1', player: 2 },
];
const ports = [{ tag: 'IN0', init: 0xff }];
const identity: RoomIdentity = { game: 'joust', identity: 'joust|abc|maincpu=1234' };

function keyEvent(type: 'keydown' | 'keyup', code: string): Event {
  const event = new Event(type, { cancelable: true });
  Object.defineProperties(event, { code: { value: code }, repeat: { value: false } });
  return event;
}

/** One browser: its own machine's input model, and its own netplay. */
function browser(joinCode?: string) {
  const input = new KeyboardInput(bindings, [], ports);
  const target = new EventTarget();
  input.attach(target);
  const events: string[] = [];
  const panels: FakeElement[] = [];
  const link = new TestLink(identity);
  const net = createNetplay({
    input,
    bindings,
    identity,
    refresh: 60,
    coldBoot: () => events.push('cold boot'),
    freezeMemory: () => events.push('memory frozen'),
    toast: text => events.push(`toast: ${text}`),
    showPanel: panel => panels.push(panel as unknown as FakeElement),
    hidePanel: () => panels.pop(),
    inviteUrl: code => `https://mamehistory.com/app/g/joust/#join=${code}`,
    joinCode,
    host: async () => ({ code: 'OFFER', link, accept: async () => {} }),
    guest: async () => ({ code: 'ANSWER', link }),
  });
  return { input, target, net, events, panels, link };
}

const settle = async (): Promise<void> => { for (let i = 0; i < 6; i++) await Promise.resolve(); };

// --- alone: the gate never blocks and nothing is a room --------------------
{
  const solo = browser();
  assert.equal(solo.net.live, false);
  assert.equal(solo.net.status(), undefined, 'playing alone says nothing about a room');
  solo.target.dispatchEvent(keyEvent('keydown', 'Space'));
  assert.equal(solo.net.begin(), true, 'alone, a frame never waits');
  solo.input.advance(solo.net.take());
  assert.equal(solo.input.read('IN0'), 0xfd);
  solo.net.end(() => 'fingerprint');
}

// --- two browsers find each other and restart together ---------------------
{
  const host = browser();
  const guest = browser('OFFER');
  host.link.other = guest.link;
  guest.link.other = host.link;

  // The host opens the lobby. Opening it is the whole ask: the invite starts
  // building immediately rather than behind a second button.
  const toggle = byLabel(host.net.control as unknown as FakeElement, 'Two player game');
  assert.ok(toggle, 'the toolbar carries a two-player control');
  toggle.onclick?.();
  assert.equal(host.panels.length, 1, 'the lobby opens when asked for');
  assert.match(text(host.panels[0]!), /Working out how the other browser can reach yours/,
    'and says what it is doing while the offer is built');
  await settle();
  const invite = byLabel(host.panels[0]!, 'invite link');
  assert.ok(invite, 'which produces a link to hand out');
  assert.equal(invite.value, 'https://mamehistory.com/app/g/joust/#join=OFFER');
  assert.match(text(host.panels[0]!), /Send them this link[\s\S]*Paste the code they send back/,
    'and lays the handshake out as the two steps it actually is');

  // The joiner opened the invite, so its lobby is already showing its reply.
  await settle();
  assert.equal(guest.panels.length, 1, 'an invited page opens its own lobby');
  assert.equal(byLabel(guest.panels[0]!, 'reply code')?.value, 'ANSWER');
  assert.match(text(guest.panels[0]!), /send this code back/i,
    'and tells the joiner what to do with it');

  // Pasting the wrong thing says so and leaves the invite alone: the other
  // player may already be answering the one that is out.
  assert.ok(pasteHandler, 'the lobby is listening while an invite is out');
  pasteHandler({
    clipboardData: { getData: () => 'https://mamehistory.com/app/g/joust/#join=OFFER' },
    preventDefault: () => {},
  });
  assert.match(text(host.panels[0]!), /your own invite link/i, 'it names the mistake');
  assert.ok(byLabel(host.panels[0]!, 'invite link'), 'and the invite is still the one they handed out');

  // The reply comes back the way it actually arrives: pasted, from whatever
  // the two of them were talking in, anywhere on the page.
  let prevented = false;
  pasteHandler({
    clipboardData: { getData: () => `here you go: ${'A'.repeat(40)}` },
    preventDefault: () => { prevented = true; },
  });
  assert.ok(prevented, 'a paste meant for the lobby does not also land in the page');
  assert.match(text(host.panels[0]!), /Connecting/, 'and the lobby says so');

  // The link comes up on both sides.
  host.link.ready();
  guest.link.ready();
  await settle();

  assert.ok(host.events.includes('cold boot'), 'the host puts its machine back to how it booted');
  assert.ok(guest.events.includes('cold boot'), 'and so does the joiner');
  assert.ok(host.events.includes('memory frozen'), 'a room does not keep high scores');
  assert.equal(host.panels.length, 0, 'the lobby gets out of the way once the game is on');
  assert.equal(host.net.live, true);
  assert.equal(guest.net.live, true);
  assert.match(host.net.status() ?? '', /you are player 1/);
  assert.match(guest.net.status() ?? '', /you are player 2/);

  // Both browsers play. Each only ever sees its own keyboard.
  const frame = (): void => {
    const hostReady = host.net.begin();
    const guestReady = guest.net.begin();
    assert.ok(hostReady && guestReady, 'neither browser is left waiting');
    host.input.advance(host.net.take());
    guest.input.advance(guest.net.take());
    assert.equal(host.input.dump(), guest.input.dump(), 'the two machines see the same controls');
    host.net.end(() => 'same');
    guest.net.end(() => 'same');
  };
  frame();
  host.target.dispatchEvent(keyEvent('keydown', 'Space'));      // the host fires
  frame();
  guest.target.dispatchEvent(keyEvent('keydown', 'ArrowLeft')); // the joiner walks
  for (let index = 0; index < 8; index++) frame();

  assert.equal(host.input.read('IN0'), 0xed,
    'the host is firing on player one and the joiner walking on player two');
  assert.equal(host.input.dump(), guest.input.dump());

  // The toggle opens and closes the lobby. It used to also BE the leave
  // button, so one mis-click ended the game and restarted the machine.
  toggle.onclick?.();
  assert.equal(host.net.live, true, 'opening the lobby mid-game does not end it');
  assert.match(text(host.panels[0]!), /You are player 1/, 'it shows the room instead');
  assert.ok(byLabel(host.panels[0]!, 'Leave the game'), 'and leaving is its own labelled button');
  host.net.dismiss();
  assert.equal(host.panels.length, 0, 'Esc or a click outside puts the lobby away');
  assert.equal(host.net.live, true, 'and still does not end the game');
  frame();

  // A room that will not run has not crashed: the other browser is behind.
  // The picture simply stops, so the status line has to say which it is.
  for (let index = 0; index < 40; index++) {
    if (!host.net.begin()) break;
    host.input.advance(host.net.take());
    host.net.end(() => 'same');
  }
  assert.equal(host.net.begin(), false, 'the host runs ahead by the input delay and then waits');
  for (let index = 0; index < 40; index++) host.net.begin();
  assert.match(host.net.status() ?? '', /waiting for player two/,
    'and says so rather than leaving a frozen picture unexplained');

  // One of them leaves, and the other carries on alone.
  guest.link.close();
  await settle();
  assert.equal(host.net.live, false, 'the room ends');
  assert.equal(host.net.status(), undefined);
  assert.ok(host.events.some(event => event.startsWith('toast: Two-player game over')),
    'and the player is told why');
  assert.equal(host.net.begin(), true, 'the game keeps running alone');
}

console.log('netplay.spec: input delay, the lobby, a room that restarts both machines and ends cleanly');
