// Two players, two browsers, one machine each.
//
// The pieces this puts together already exist and are general: the input
// model settles every control at a frame boundary, a `Session` says which
// frame an event belongs to and refuses to run a frame until everybody has
// spoken, and a `PeerLink` carries those frames between two browsers. What
// lives here is the lifecycle — inviting somebody, agreeing that both
// machines start from the same place, and putting it all back when they
// leave.
//
// Starting from the same place is the part worth reading. Two browsers that
// have each been running a machine for a while do not agree about anything:
// their RAM differs, and since #132 their battery-backed memory differs too,
// because each visitor keeps their own. So a room does not try to reconcile
// two machines — it puts both back to the state theirs booted in, before
// anything was restored into it. Same ROM, same generated machine, same cold
// start; from there the input log alone keeps them identical.
//
// The lobby is the other half, and it is doing something unusual: WebRTC
// needs an offer to reach the other browser and an answer to come back, and
// with no server to pass them through, the players are the transport. That is
// three hops and no amount of design removes them. What design can do is make
// each one a single action and never leave the page silent about which hop it
// is on — so the lobby is a state machine with exactly one thing to do at a
// time, not a form with every field showing at once (issue #140).
//
// A MAMEKIT host feature (ARCHITECTURE.md §8): no part of this knows what
// machine is playing.

import { paintTitleButton, titleButton } from './controls.ts';
import type { FieldBinding, InputEvent, KeyboardInput } from './input.ts';
import { Session, type SessionMessage } from './session.ts';
import {
  createGuest,
  createHost,
  type GuestReply,
  type HostInvite,
  type LinkOptions,
  type PeerLink,
  type RoomIdentity,
} from './netlink.ts';

/** What the two browsers say to each other beyond the session's own traffic. */
type RoomMessage = SessionMessage | { kind: 'begin'; delay: number };

export interface NetplayOptions {
  input: KeyboardInput;
  bindings: readonly FieldBinding[];
  /** The game and its ROM hashes; a peer holding anything else is refused. */
  identity: RoomIdentity;
  /** What to call the machine in the lobby. The short name will do. */
  machine?: string;
  /** Put the machine back to the state it booted in, before anything was restored. */
  coldBoot: () => void;
  /** Stop keeping this machine's memory in this browser: a room plays cold. */
  freezeMemory: () => void;
  /** The board's refresh, for turning a round trip into frames of delay. */
  refresh: number;
  toast: (text: string) => void;
  /** Put the lobby on the screen, and take it away again. */
  showPanel: (panel: HTMLElement) => void;
  hidePanel: (panel: HTMLElement) => void;
  /** The link to hand out, carrying this offer code. */
  inviteUrl: (code: string) => string;
  /** The offer this page was opened with, when it was opened from an invite. */
  joinCode?: string;
  /**
   * How a link to the other browser is made. WebRTC by default; a test hands
   * in a pair wired straight to each other, and a room service would be
   * dropped in here too.
   */
  host?: (options: LinkOptions) => Promise<HostInvite>;
  guest?: (offer: string, options: LinkOptions) => Promise<GuestReply>;
}

export interface Netplay {
  /** The small control that lives in the toolbar under the title. */
  readonly control: HTMLElement;
  /** Publish this browser's input; false while the frame waits for the peer. */
  begin(): boolean;
  /** Every player's input for the frame about to run. */
  take(): InputEvent[];
  /** The frame is over. */
  end(fingerprint: () => string): void;
  /** A phrase for the status line while a room is live. */
  status(): string | undefined;
  /** Answer an invite. Safe to call again: a game already under way is kept. */
  join(code: string): void;
  /** The lobby was dismissed from outside — a backdrop click, or Esc. */
  dismiss(): void;
  readonly live: boolean;
}

/** Frames of input delay for a round trip, kept inside what feels playable. */
export function delayForRtt(rtt: number | undefined, refresh: number): number {
  const frameMs = 1000 / Math.max(1, refresh);
  // Half a round trip is when a message actually lands; a frame either side
  // absorbs the jitter that would otherwise stall the room every few seconds.
  return Math.min(10, Math.max(2, Math.ceil((rtt ?? 100) / 2 / frameMs) + 1));
}

/**
 * How long an untaken invite is worth handing out.
 *
 * An offer carries the routes to this browser that were true when it was
 * made. They age: a NAT binding lapses, a laptop changes network, and the
 * code still looks perfectly good in the box. Saying so after a few minutes
 * is kinder than letting the other player answer a dead one.
 */
const INVITE_LIFETIME_MS = 4 * 60 * 1000;

/** Frames of asking-and-being-refused before the room admits it is waiting. */
const STALL_FRAMES = 30;

/**
 * The one thing the lobby is doing right now.
 *
 * Every hop of the handshake is a stage, and a stage renders exactly one
 * primary action. That is the whole design: a player who looks at the lobby
 * should never have to work out which of several boxes is theirs.
 */
type Stage =
  | { name: 'intro' }
  | { name: 'offering' }
  | { name: 'inviting'; url: string }
  | { name: 'connecting' }
  | { name: 'answering' }
  | { name: 'replying'; code: string }
  | { name: 'joining' }
  | { name: 'live' }
  | { name: 'failed'; why: string; retry?: 'invite' };

/** The clipboard, when this browser has one it will let us use. */
const clipboard = (): { writeText?(text: string): Promise<void>; readText?(): Promise<string> } | undefined =>
  (globalThis as { navigator?: { clipboard?: { writeText?(text: string): Promise<void>; readText?(): Promise<string> } } })
    .navigator?.clipboard;

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    const write = clipboard()?.writeText;
    if (!write) return false;
    await write.call(clipboard(), text);
    return true;
  } catch {
    return false; // denied, or no permission in this context: the field is still there
  }
}

async function readClipboard(): Promise<string | undefined> {
  try {
    const read = clipboard()?.readText;
    if (!read) return undefined;
    return (await read.call(clipboard())).trim() || undefined;
  } catch {
    return undefined; // Firefox and Safari refuse without a prompt; the field covers it
  }
}

/**
 * The code inside whatever got pasted.
 *
 * People paste what they were sent, which may be the code with a sentence
 * wrapped round it, a chat client's quotation marks, or a line break in the
 * middle. The codes themselves are base64url and long, so the longest run of
 * code characters is the code.
 */
export function extractCode(text: string): string | undefined {
  const runs = text.match(/[A-Za-z0-9_-]{24,}/g);
  if (!runs?.length) return undefined;
  return runs.reduce((longest, run) => (run.length > longest.length ? run : longest));
}

export function createNetplay(options: NetplayOptions): Netplay {
  const { input, bindings, toast } = options;
  let session = new Session({ input, bindings });
  let link: PeerLink | undefined;
  let player = 1;
  let desync: string | undefined;
  /** How many frames in a row the room has refused to run. */
  let stalled = 0;

  // --- the control in the toolbar ------------------------------------------
  const control = document.createElement('span');
  control.setAttribute('data-netplay', '');
  control.setAttribute('role', 'group');
  control.setAttribute('aria-label', 'Two player');
  control.style.cssText = 'display:inline-flex;align-items:center;gap:6px';
  for (const type of ['keydown', 'keyup']) {
    control.addEventListener(type, event => event.stopPropagation());
  }
  const toggle = titleButton('2 player', 'Two player game',
    'Play with somebody else, in their own browser', 'normal', 'twoPlayer');
  control.append(toggle);

  // --- the lobby -----------------------------------------------------------
  // A dialog the shell puts over the screen. It never joins the page column,
  // so opening it does not resize the machine being played.
  const panel = document.createElement('div');
  panel.setAttribute('data-netplay-panel', '');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Two player');
  panel.style.cssText = `display:flex;flex-direction:column;gap:14px;width:min(460px,92vw);
    padding:22px 24px;border-radius:14px;box-sizing:border-box;text-align:left;
    background:linear-gradient(150deg,rgba(26,32,72,.98),rgba(9,12,29,.99));border:1px solid #2c3570;
    box-shadow:inset 0 1px rgba(255,255,255,.06),0 24px 60px rgba(0,0,0,.55);
    font:13px ui-sans-serif,system-ui,sans-serif;color:#cbd1ff`;
  for (const type of ['keydown', 'keyup']) {
    panel.addEventListener(type, event => event.stopPropagation());
  }

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:12px';
  const heading = document.createElement('h2');
  heading.style.cssText = 'margin:0;color:#7f8ac9;font:700 10px ui-monospace,monospace;letter-spacing:2px';
  heading.textContent = 'TWO PLAYER';
  const subject = document.createElement('span');
  subject.style.cssText = 'color:#555f96;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
  subject.textContent = options.machine ?? '';
  header.append(heading, subject);

  // The step the player is on, told as a sentence rather than a status code.
  const note = document.createElement('p');
  note.setAttribute('data-netplay-say', '');
  note.style.cssText = 'margin:0;color:#9fb0ff;font-size:13px;line-height:1.55';
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;flex-direction:column;gap:10px';
  // The standing terms of a two-player game, always visible so neither is a
  // surprise: both need the same dump, and a room plays cold.
  const terms = document.createElement('p');
  terms.style.cssText = 'margin:0;padding-top:12px;border-top:1px solid #232a55;color:#6f79b4;font-size:11px;line-height:1.6';
  terms.textContent = 'Your machine is held while this is open, so setting a game up costs you nothing. '
    + 'You both need the same ROM set, and neither of you sends it anywhere — only which control moved. '
    + 'Starting a game restarts both machines, and high scores are not kept while it runs.';
  panel.append(header, note, row, terms);

  let open = false;
  const setPanel = (next: boolean): void => {
    if (next === open) return;
    open = next;
    if (open) options.showPanel(panel); else options.hidePanel(panel);
    paintTitleButton(toggle, open || session.room);
  };

  // --- the pieces a stage is built from ------------------------------------

  /**
   * The one action this stage is asking for.
   *
   * `go` is the action that moves the handshake along and wears the colour
   * that says so; `leave` is the way out, and must not look like it.
   */
  const primary = (text: string, label: string, run: () => void, kind: 'go' | 'leave' = 'go'): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.setAttribute('aria-label', label);
    button.style.cssText = `padding:10px 16px;border-radius:9px;width:100%;
      font:700 13px ui-sans-serif,system-ui,sans-serif;letter-spacing:.3px;cursor:pointer;
      transition:filter .12s ease,background .12s ease;
      ${kind === 'go'
        ? 'border:none;background:#3ccf6a;color:#08210f'
        : 'border:1px solid #5a3244;background:transparent;color:#d79aac'}`;
    button.onclick = () => run();
    return button;
  };

  /** A second, quieter way out of this stage. */
  const secondary = (text: string, label: string, run: () => void): HTMLButtonElement => {
    const button = titleButton(text, label, text, 'quiet');
    button.onclick = () => run();
    return button;
  };

  const line = (...items: HTMLElement[]): HTMLElement => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:8px;align-items:center;flex-wrap:wrap';
    wrap.append(...items);
    return wrap;
  };

  /** A read-only box holding something to copy out of by hand. */
  const codeBox = (value: string, label: string): HTMLElement => {
    const field = document.createElement('input');
    field.readOnly = true;
    field.value = value;
    field.setAttribute('aria-label', label);
    field.style.cssText = `width:100%;box-sizing:border-box;padding:7px 9px;border-radius:7px;
      background:#080b1e;border:1px solid #262e5e;color:#7f8ac9;
      font:11px ui-monospace,monospace;text-overflow:ellipsis`;
    field.onfocus = () => field.select();
    return field;
  };

  /** A box to paste the other player's code into, for when the clipboard is off limits. */
  const pasteBox = (label: string, action: string, run: (value: string) => void): HTMLElement => {
    const field = document.createElement('input');
    field.placeholder = label;
    field.setAttribute('aria-label', label);
    field.style.cssText = `flex:1 1 200px;min-width:0;padding:7px 9px;border-radius:7px;
      background:#080b1e;border:1px solid #262e5e;color:#cbd1ff;font:11px ui-monospace,monospace`;
    const go = titleButton(action, action, action);
    const submit = (): void => {
      const value = field.value.trim();
      if (value) run(value);
    };
    go.onclick = submit;
    field.onkeydown = event => { if (event.key === 'Enter') submit(); };
    return line(field, go);
  };

  /**
   * One numbered step, with its own action inside it.
   *
   * Sending the link and taking the code back are both live at once — they
   * have to be, because the reply can arrive at any moment — so they are two
   * labelled steps rather than one undifferentiated pile of boxes.
   */
  const step = (number: number, title: string, done: boolean, ...items: HTMLElement[]): HTMLElement => {
    const group = document.createElement('section');
    group.style.cssText = `display:flex;flex-direction:column;gap:8px;padding:12px 13px;border-radius:10px;
      background:${done ? 'rgba(60,207,106,.07)' : 'rgba(255,255,255,.025)'};
      border:1px solid ${done ? 'rgba(60,207,106,.3)' : '#252d62'}`;
    const label = document.createElement('h3');
    label.style.cssText = `margin:0;display:flex;align-items:center;gap:8px;
      font:700 11px ui-sans-serif,system-ui,sans-serif;letter-spacing:.4px;color:${done ? '#8fe3aa' : '#cbd1ff'}`;
    const badge = document.createElement('span');
    badge.setAttribute('aria-hidden', 'true');
    badge.style.cssText = `display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;
      border-radius:999px;font:700 10px ui-monospace,monospace;flex:0 0 auto;
      ${done ? 'background:#3ccf6a;color:#08210f' : 'background:#252d62;color:#9fb0ff'}`;
    badge.textContent = done ? '✓' : String(number);
    const text = document.createElement('span');
    text.textContent = title;
    label.append(badge, text);
    group.append(label, ...items);
    return group;
  };

  /** A hint under the primary action: what happens next, or what went wrong. */
  const hint = (text: string, tone: 'plain' | 'warn' = 'plain'): HTMLElement => {
    const span = document.createElement('span');
    span.style.cssText = `font-size:11px;line-height:1.5;color:${tone === 'warn' ? '#e8b64c' : '#6f79b4'}`;
    span.textContent = text;
    return span;
  };

  const say = (text: string): void => { note.textContent = text; };
  const show = (...items: HTMLElement[]): void => { row.replaceChildren(...items); };

  // --- the room ------------------------------------------------------------

  const post = (message: RoomMessage): void => link?.send(message);

  /**
   * Both machines go back to the state they booted in and start counting
   * frames from zero together. Nothing about either machine's own history
   * survives: that is the only way two browsers can agree without one of
   * them shipping its whole memory to the other.
   */
  const startRoom = (delay: number, local: number): void => {
    if (session.room) return; // both hellos crossed, or a `begin` arrived twice
    player = local;
    desync = undefined;
    stalled = 0;
    // Order matters. The old session stops taking events first, so the
    // controls can be put back to rest here and now rather than a frame
    // later; then the machine goes back to how it booted; then the new
    // session takes over with both browsers standing in the same place.
    session.detach();
    input.reset();
    options.freezeMemory();
    try {
      options.coldBoot();
    } catch (error) {
      // Both machines have to start from the same place or there is no game;
      // say so rather than playing two different ones.
      const why = (error as Error).message.split('\n').slice(0, 2).join(' ');
      toast(`Could not start the two-player game: ${why}`);
      console.warn(`netplay: cold boot failed: ${(error as Error).message}`);
      link?.close();
      return;
    }
    session = new Session({
      input,
      bindings,
      player: local,
      players: [1, 2],
      delay,
      send: message => post(message),
      onDesync: frame => {
        desync = `the two machines stopped matching at frame ${frame}`;
        toast(`${desync} — the game is no longer shared`);
        if (open) stage({ name: 'live' });
      },
    });
    stage({ name: 'live' });
    setPanel(false);
    toast(local === 1 ? 'Player two joined — the machine restarted for both of you'
      : 'Joined as player two — the machine restarted for both of you');
  };

  const endRoom = (reason: string): void => {
    if (!link) return;
    link = undefined;
    session.detach();
    session = new Session({ input, bindings });
    player = 1;
    stalled = 0;
    toast(`Two-player game over: ${reason}`);
    stage({ name: 'intro' });
    setPanel(false);
  };

  const attach = (peer: PeerLink, host: boolean): void => {
    link = peer;
    peer.onClose = reason => endRoom(reason);
    peer.onMessage = message => {
      const room = message as RoomMessage;
      if (room.kind === 'begin') { startRoom(room.delay, 2); return; }
      session.receive(room);
    };
    peer.onReady = () => {
      if (!host) { stage({ name: 'joining' }); return; }
      // The host picks the delay so both sides pick the same one, and it is
      // fixed for the room: changing it mid-game is a desync.
      const delay = delayForRtt(peer.rtt, options.refresh);
      post({ kind: 'begin', delay });
      startRoom(delay, 1);
    };
  };

  // --- the handshake, one hop at a time -------------------------------------

  let current: Stage = { name: 'intro' };
  /**
   * What was wrong with the last thing pasted.
   *
   * Pasting the wrong thing is not a reason to tear down an invite the other
   * player may already be answering, so these are said inside the step that
   * asked for it and the invite stays exactly where it was.
   */
  let complaint: string | undefined;
  /** The invite that is currently being offered, so a reply knows where to go. */
  let offered: HostInvite | undefined;
  let staleTimer: ReturnType<typeof setTimeout> | undefined;

  /**
   * Throw away an invite nobody took.
   *
   * `link` is cleared before the connection is closed: closing fires
   * `onClose`, and `endRoom` would otherwise announce the end of a
   * two-player game that never began.
   */
  const cancelInvite = (): void => {
    const pending = offered;
    offered = undefined;
    link = undefined;
    pending?.link.close();
  };

  /**
   * A reply, from wherever it came: the Paste button, the field, or a ⌘V
   * anywhere on the page. Anything that is plainly not a reply is named as
   * such rather than handed to the connection to fail on.
   */
  const acceptReply = (text: string): void => {
    if (!offered || current.name !== 'inviting') return;
    const reject = (why: string): void => { complaint = why; render(); };
    if (text.includes('#join=')) {
      reject('That is your own invite link. What you need is the code their browser gave them when they opened it.');
      return;
    }
    const code = extractCode(text);
    if (!code) {
      reject('There was no code in that — a reply code is a long unbroken line of letters and numbers.');
      return;
    }
    const invite = offered;
    stage({ name: 'connecting' });
    invite.accept(code).catch((error: unknown) => {
      stage({
        name: 'failed',
        why: `That code did not work: ${(error as Error).message}`,
        retry: 'invite',
      });
    });
  };

  /**
   * ⌘V anywhere on the page while an invite is out.
   *
   * The reply arrives in the player's clipboard from another application
   * entirely; asking them to find the right box first is a step that does not
   * need to exist.
   */
  const onPaste = (event: Event): void => {
    if (current.name !== 'inviting') return;
    const text = (event as ClipboardEvent).clipboardData?.getData('text')?.trim();
    if (!text) return;
    event.preventDefault();
    acceptReply(text);
  };
  const listener = (globalThis as { document?: { addEventListener?: unknown; removeEventListener?: unknown } }).document;
  const watchPaste = (on: boolean): void => {
    if (typeof listener?.addEventListener !== 'function') return;
    const target = listener as unknown as Document;
    if (on) target.addEventListener('paste', onPaste);
    else target.removeEventListener('paste', onPaste);
  };

  function stage(next: Stage): void {
    current = next;
    complaint = undefined;
    watchPaste(next.name === 'inviting');
    if (next.name !== 'inviting' && staleTimer !== undefined) {
      clearTimeout(staleTimer);
      staleTimer = undefined;
    }
    render();
  }

  function render(): void {
    paintTitleButton(toggle, open || session.room);
    // The standing terms belong to the setting-up, not to a game under way.
    terms.style.display = current.name === 'live' ? 'none' : 'block';
    switch (current.name) {
      case 'intro': {
        say('Play with somebody else in their own browser. You send them a link, they send a code back, and you are both in the same machine.');
        const start = primary('Invite a player', 'Invite a player', () => { void invite(); });
        show(start, hint('Nothing is published: the two browsers talk directly to each other.'));
        return;
      }
      case 'offering': {
        say('Working out how the other browser can reach yours…');
        show(hint('This takes a moment. Your invite appears here when it is ready.'));
        return;
      }
      case 'inviting': {
        const url = current.url;
        say('Your invite is ready. They open the link, their browser gives them a code, and that code brings you both into the same machine.');
        // A phone can hand the link straight to a messaging app; a desktop
        // copies it. Either way it is one button, and the link stays visible
        // underneath for whoever would rather do it themselves.
        const share = (globalThis as { navigator?: { share?: (data: { title?: string; text?: string; url?: string }) => Promise<void> } })
          .navigator?.share;
        const copyInvite = (): void => {
          void copyToClipboard(url).then(ok => {
            send.textContent = ok ? 'Copied — now send it to them' : 'Press ⌘C to copy the link below';
          });
        };
        const send = primary(share ? 'Share invite link' : 'Copy invite link', 'Copy invite link', () => {
          if (!share) { copyInvite(); return; }
          void share({ title: 'Two player', text: `Play ${options.machine ?? 'this machine'} with me`, url })
            .catch(() => copyInvite()); // dismissed the sheet, or refused: fall back
        });
        const paste = secondary('Paste their code', 'Paste their code', () => {
          void readClipboard().then(text => {
            if (text) acceptReply(text);
            else { complaint = 'This browser would not hand over the clipboard. Paste their code into the box instead.'; render(); }
          });
        });
        show(
          step(1, 'Send them this link', false, send, codeBox(url, 'invite link')),
          step(2, 'Paste the code they send back', false,
            line(paste, hint('or press ⌘V anywhere on this page')),
            pasteBox('paste their code', 'Connect', acceptReply),
            ...(complaint ? [hint(complaint, 'warn')] : [])),
          line(secondary('Cancel', 'Cancel the invite', () => { cancelInvite(); stage({ name: 'intro' }); })),
        );
        // An offer's routes age out; say so rather than letting them answer
        // a code that cannot connect any more.
        if (staleTimer === undefined) {
          staleTimer = setTimeout(() => {
            if (current.name !== 'inviting') return;
            cancelInvite();
            stage({ name: 'failed', why: 'That invite has gone stale — the way back to this browser may have changed since it was made.', retry: 'invite' });
          }, INVITE_LIFETIME_MS);
        }
        return;
      }
      case 'connecting': {
        say('Connecting to the other player…');
        show(hint('Both machines restart the moment the connection comes up.'));
        return;
      }
      case 'answering': {
        say('Answering the invite…');
        show(hint('Working out how their browser can reach yours.'));
        return;
      }
      case 'replying': {
        const code = current.code;
        say('Almost there. Their browser needs one thing back from yours.');
        const copy = primary('Copy reply code', 'copy the reply code', () => {
          void copyToClipboard(code).then(ok => { copy.textContent = ok ? 'Copied — send it back to them' : 'Press ⌘C to copy'; });
        });
        show(
          step(1, 'You opened their invite', true, hint('Your browser answered it.')),
          step(2, 'Send this code back to them', false, copy, codeBox(code, 'reply code'),
            hint('The same way they sent you the link. The game starts the moment they paste it in.')),
        );
        // Most browsers allow a copy without asking; do it now so the code is
        // already in hand when they go back to the conversation.
        void copyToClipboard(code).then(ok => { if (ok) copy.textContent = 'Copied — send it back to them'; });
        return;
      }
      case 'joining': {
        say('Connected. Waiting for them to start the game…');
        show(hint('Both machines restart when it begins.'));
        return;
      }
      case 'live': {
        const parts = [`You are player ${player}`];
        if (link?.rtt !== undefined) parts.push(`${link.rtt}ms away`);
        parts.push(`${session.delay} frames of input delay`);
        say(desync ? `⚠ ${desync}. The two machines are no longer showing the same game.` : `In a two-player game. ${parts.join(' · ')}.`);
        const leave = primary('Leave the game', 'Leave the game', () => { link?.close(); }, 'leave');
        show(leave, hint(desync
          ? 'Leaving puts your own machine back to playing alone.'
          : 'Your machine keeps running when you leave; theirs does too.', desync ? 'warn' : 'plain'));
        return;
      }
      case 'failed': {
        say(current.why);
        show(
          ...(current.retry === 'invite'
            ? [primary('Make a new invite', 'Make a new invite', () => { void invite(); })]
            : []),
          hint('Nothing was shared and your machine is untouched.'),
        );
        return;
      }
    }
  }

  // --- lobby flows ---------------------------------------------------------

  const invite = async (): Promise<void> => {
    cancelInvite();
    setPanel(true);
    stage({ name: 'offering' });
    try {
      const host = await (options.host ?? createHost)({ identity: options.identity });
      offered = host;
      attach(host.link, true);
      stage({ name: 'inviting', url: options.inviteUrl(host.code) });
    } catch (error) {
      stage({ name: 'failed', why: `Could not start a two-player game: ${(error as Error).message}`, retry: 'invite' });
    }
  };

  const join = async (code: string): Promise<void> => {
    if (link) {
      toast('You are already in a two-player game — leave it before joining another');
      return;
    }
    setPanel(true);
    stage({ name: 'answering' });
    try {
      const guest = await (options.guest ?? createGuest)(code, { identity: options.identity });
      attach(guest.link, false);
      stage({ name: 'replying', code: guest.code });
    } catch (error) {
      stage({ name: 'failed', why: `That invite could not be answered: ${(error as Error).message}` });
    }
  };

  // The toggle opens and closes the lobby, and nothing else. Leaving a game
  // in progress is its own labelled button inside, because a mis-click used
  // to end the room and restart the machine with no warning at all.
  //
  // Opening it also starts building the invite. Working out how another
  // browser can reach this one takes a few seconds whatever happens, and
  // there is nothing else the player could have wanted from this button —
  // making them click a second one only spent that time later, in silence.
  toggle.onclick = () => {
    const opening = !open;
    setPanel(opening);
    if (opening && current.name === 'intro') void invite();
    toggle.blur();
  };
  stage({ name: 'intro' });
  if (options.joinCode) void join(options.joinCode);

  return {
    control,
    get live(): boolean { return session.room; },
    begin(): boolean {
      session.publish();
      const ready = session.ready();
      stalled = ready ? 0 : stalled + 1;
      return ready;
    },
    take: () => session.take(),
    join: code => { void join(code); },
    dismiss: () => setPanel(false),
    end: fingerprint => session.completed(fingerprint),
    status(): string | undefined {
      if (!session.room) return undefined;
      if (desync) return `⚠ ${desync}`;
      const parts = [`2P · you are player ${player}`];
      if (link?.rtt !== undefined) parts.push(`${link.rtt}ms`);
      parts.push(`delay ${session.delay}f`);
      // A room that cannot run is not a room that has crashed; the other
      // browser is behind. Saying so beats a picture that has stopped moving.
      if (stalled > STALL_FRAMES) parts.push('⏳ waiting for player two');
      return parts.join(' · ');
    },
  };
}
