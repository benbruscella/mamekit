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
// A MAMEKIT host feature (ARCHITECTURE.md §8): no part of this knows what
// machine is playing.

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
  /** Put the machine back to the state it booted in, before anything was restored. */
  coldBoot: () => void;
  /** Stop keeping this machine's memory in this browser: a room plays cold. */
  freezeMemory: () => void;
  /** The board's refresh, for turning a round trip into frames of delay. */
  refresh: number;
  toast: (text: string) => void;
  /** Put the lobby under the screen, and take it away again. */
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
  /** The small control that lives beside the title. */
  readonly control: HTMLElement;
  /** Publish this browser's input; false while the frame waits for the peer. */
  begin(): boolean;
  /** Every player's input for the frame about to run. */
  take(): InputEvent[];
  /** The frame is over. */
  end(fingerprint: () => string): void;
  /** Runnable frames already in hand, so a browser that fell behind can catch up. */
  slack(): number;
  /** A phrase for the status line while a room is live. */
  status(): string | undefined;
  /** Answer an invite. Safe to call again: a game already under way is kept. */
  join(code: string): void;
  readonly live: boolean;
}

/** Frames of input delay for a round trip, kept inside what feels playable. */
export function delayForRtt(rtt: number | undefined, refresh: number): number {
  const frameMs = 1000 / Math.max(1, refresh);
  // Half a round trip is when a message actually lands; a frame either side
  // absorbs the jitter that would otherwise stall the room every few seconds.
  return Math.min(10, Math.max(2, Math.ceil((rtt ?? 100) / 2 / frameMs) + 1));
}

export function createNetplay(options: NetplayOptions): Netplay {
  const { input, bindings, toast } = options;
  let session = new Session({ input, bindings });
  let link: PeerLink | undefined;
  let player = 1;
  let desync: string | undefined;

  // --- the lobby -----------------------------------------------------------
  const control = document.createElement('span');
  control.setAttribute('data-netplay', '');
  control.setAttribute('role', 'group');
  control.setAttribute('aria-label', 'Two player');
  control.style.cssText = 'display:inline-flex;align-items:center;gap:6px';
  for (const type of ['keydown', 'keyup']) {
    control.addEventListener(type, event => event.stopPropagation());
  }

  const pill = (text: string, label: string, title: string): HTMLButtonElement => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.setAttribute('aria-label', label);
    button.title = title;
    paint(button, false);
    return button;
  };
  const paint = (button: HTMLButtonElement, active: boolean): void => {
    const enabled = !button.disabled;
    button.style.cssText = `padding:2px 9px;border-radius:999px;font:700 11px ui-sans-serif,system-ui,sans-serif;
      cursor:${enabled ? 'pointer' : 'default'};transition:background .12s ease,color .12s ease;
      ${active
        ? 'background:#3ccf6a;color:#08210f;border:1px solid #3ccf6a'
        : `background:${enabled ? '#111633' : '#0c0f26'};border:1px solid ${enabled ? '#303a78' : '#1e2450'};color:${enabled ? '#cbd1ff' : '#555c86'}`}`;
  };
  const toggle = pill('⇄ 2 player', 'Two player game', 'Play with somebody else, in their own browser');
  control.append(toggle);

  const panel = document.createElement('div');
  panel.setAttribute('data-netplay-panel', '');
  panel.style.cssText = `display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 10px;
    padding:10px 14px;margin:6px 0;border-radius:10px;max-width:880px;
    background:linear-gradient(135deg,rgba(24,30,67,.96),rgba(9,12,29,.96));border:1px solid #252d62;
    box-shadow:inset 0 1px rgba(255,255,255,.05),0 10px 24px rgba(0,0,0,.3);font:13px ui-sans-serif,system-ui,sans-serif`;
  for (const type of ['keydown', 'keyup']) {
    panel.addEventListener(type, event => event.stopPropagation());
  }
  const heading = document.createElement('span');
  heading.style.cssText = 'color:#7f8ac9;font:700 10px ui-monospace,monospace;letter-spacing:2px;flex-basis:100%;text-align:center';
  heading.textContent = 'TWO PLAYER';
  const note = document.createElement('p');
  note.style.cssText = 'margin:0;color:#9fb0ff;font-size:12px;flex-basis:100%;text-align:center;line-height:1.5';
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;flex-basis:100%';
  panel.append(heading, note, row);

  let open = false;
  const setPanel = (next: boolean): void => {
    if (next === open) return;
    open = next;
    if (open) options.showPanel(panel); else options.hidePanel(panel);
    paint(toggle, open);
  };

  /** A read-only box holding something to copy out of. */
  const codeBox = (value: string, label: string): HTMLElement => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:6px;align-items:center;flex-basis:100%;justify-content:center';
    const field = document.createElement('input');
    field.readOnly = true;
    field.value = value;
    field.setAttribute('aria-label', label);
    field.style.cssText = `flex:1 1 320px;max-width:520px;padding:5px 8px;border-radius:6px;
      background:#0c0f26;border:1px solid #303a78;color:#cbd1ff;font:12px ui-monospace,monospace`;
    field.onfocus = () => field.select();
    const copy = pill('Copy', `copy the ${label}`, `Copy the ${label}`);
    copy.onclick = () => {
      field.select();
      void navigator.clipboard?.writeText(value).then(
        () => { copy.textContent = 'Copied'; },
        () => { copy.textContent = 'Press ⌘C'; },
      );
    };
    wrap.append(field, copy);
    return wrap;
  };

  /** A box to paste the other player's code into. */
  const pasteBox = (label: string, action: string, run: (value: string) => void): HTMLElement => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:6px;align-items:center;flex-basis:100%;justify-content:center';
    const field = document.createElement('input');
    field.placeholder = label;
    field.setAttribute('aria-label', label);
    field.style.cssText = `flex:1 1 320px;max-width:520px;padding:5px 8px;border-radius:6px;
      background:#0c0f26;border:1px solid #303a78;color:#cbd1ff;font:12px ui-monospace,monospace`;
    const go = pill(action, action, action);
    const submit = (): void => {
      const value = field.value.trim();
      if (value) run(value);
    };
    go.onclick = submit;
    field.onkeydown = event => { if (event.key === 'Enter') submit(); };
    wrap.append(field, go);
    return wrap;
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
    player = local;
    desync = undefined;
    // Order matters. The old session stops taking events first, so the
    // controls can be put back to rest here and now rather than a frame
    // later; then the machine goes back to how it booted; then the new
    // session takes over with both browsers standing in the same place.
    session.detach();
    input.reset();
    options.freezeMemory();
    options.coldBoot();
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
      },
    });
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
    toast(`Two-player game over: ${reason}`);
    resetLobby();
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
      if (!host) { say('Connected. Waiting for the host to start…'); show(); return; }
      // The host picks the delay so both sides pick the same one, and it is
      // fixed for the room: changing it mid-game is a desync.
      const delay = delayForRtt(peer.rtt, options.refresh);
      post({ kind: 'begin', delay });
      startRoom(delay, 1);
    };
  };

  // --- lobby flows ---------------------------------------------------------

  const invite = async (): Promise<void> => {
    say('Building an invite…');
    show();
    try {
      const host = await (options.host ?? createHost)({ identity: options.identity });
      attach(host.link, true);
      say('Send this link to the other player. When they open it they will ' +
        'give you a code to paste back here.');
      show(
        codeBox(options.inviteUrl(host.code), 'invite link'),
        pasteBox('paste their code', 'Connect', value => {
          say('Connecting…');
          host.accept(value).catch((error: unknown) => {
            say(`That code did not work: ${(error as Error).message}`);
          });
        }),
      );
    } catch (error) {
      say(`Could not start a two-player game: ${(error as Error).message}`);
    }
  };

  const join = async (code: string): Promise<void> => {
    if (link) {
      toast('You are already in a two-player game — leave it before joining another');
      return;
    }
    setPanel(true);
    say('Answering the invite…');
    show();
    try {
      const guest = await (options.guest ?? createGuest)(code, { identity: options.identity });
      attach(guest.link, false);
      say('Send this code back to whoever invited you. The game starts as ' +
        'soon as they paste it in.');
      show(codeBox(guest.code, 'reply code'));
    } catch (error) {
      say(`That invite could not be answered: ${(error as Error).message}`);
    }
  };

  function resetLobby(): void {
    say('Play with somebody else in their own browser. You both need the same ' +
      'ROM set, and neither of you sends it anywhere: only your controls ' +
      'cross the connection. High scores are not kept during a two-player game.');
    const start = pill('Invite a player', 'Invite a player', 'Create a link to send to the other player');
    start.onclick = () => { void invite(); };
    show(start);
  }

  toggle.onclick = () => {
    if (link) { link.close(); return; }
    setPanel(!open);
    toggle.blur();
  };
  resetLobby();
  if (options.joinCode) void join(options.joinCode);

  return {
    control,
    get live(): boolean { return session.room; },
    begin(): boolean {
      session.publish();
      return session.ready();
    },
    take: () => session.take(),
    join: code => { void join(code); },
    end: fingerprint => session.completed(fingerprint),
    slack: () => Math.max(0, session.buffered - 1),
    status(): string | undefined {
      if (!session.room) return undefined;
      if (desync) return `⚠ ${desync}`;
      const parts = [`2P · you are player ${player}`];
      if (link?.rtt !== undefined) parts.push(`${link.rtt}ms`);
      parts.push(`delay ${session.delay}f`);
      return parts.join(' · ');
    },
  };
}
