// The link between two browsers playing the same machine.
//
// Gameplay is peer to peer: the two hold a WebRTC data channel and no part of
// a session passes through a server. What WebRTC does need is a way for them
// to trade one offer and one answer before that channel exists.
//
// The way that ships here needs no server at all. The host's offer travels
// inside the invite link it hands out, and the joiner's answer comes back as
// a short code to paste. That is one extra step for the players, and in
// exchange mamekit stays what it is: a static site with nothing to run and
// nothing to pay for. A room service can be dropped in later without any of
// the code below changing — it would only replace the two places that move a
// code from one browser to the other.
//
// This is a MAMEKIT host feature (ARCHITECTURE.md §8) and knows nothing about
// any machine: it moves opaque messages and checks that both ends booted the
// same ROM before it lets a session start.

/** Where a peer's ICE candidates are discovered. Only connection setup goes here. */
export const DEFAULT_ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:global.stun.twilio.com:3478' },
];

/** What both ends must agree on before a frame runs. */
export interface RoomIdentity {
  /** machine short name */
  game: string;
  /** `machineIdentity()`: the game, its board facts and every ROM region's hash */
  identity: string;
}

export interface PeerLink {
  readonly open: boolean;
  /** The peer's identity once the handshake is done. */
  readonly peer: RoomIdentity | undefined;
  /** Round trip in milliseconds, once measured. */
  readonly rtt: number | undefined;
  send(message: unknown): void;
  close(): void;
  onMessage: ((message: unknown) => void) | null;
  onReady: ((peer: RoomIdentity) => void) | null;
  onClose: ((reason: string) => void) | null;
}

export interface LinkOptions {
  identity: RoomIdentity;
  iceServers?: RTCIceServer[];
  /** How long to wait for ICE candidates before sealing the code. */
  gatherMs?: number;
}

/** The host's half: an invite to hand out, then the joiner's answer. */
export interface HostInvite {
  /** The offer, compressed; goes in the invite link. */
  code: string;
  /** Finish the link with the code the joiner produced. */
  accept(answer: string): Promise<void>;
  link: PeerLink;
}

/** The joiner's half: a reply code to send back, and the link it completes. */
export interface GuestReply {
  code: string;
  link: PeerLink;
}

// ---------------------------------------------------------------------------
// codes: an SDP squeezed small enough to travel in a link or a paste
// ---------------------------------------------------------------------------

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(code: string): Uint8Array {
  const padded = code.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - padded.length % 4) % 4));
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function collapse(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return bytes;
}

/** An SDP is repetitive text; deflate takes a couple of kilobytes down to a link's worth. */
export async function packCode(text: string): Promise<string> {
  const input = new Blob([text]).stream().pipeThrough(new CompressionStream('deflate-raw'));
  return toBase64Url(await collapse(input as ReadableStream<Uint8Array>));
}

export async function unpackCode(code: string): Promise<string> {
  const bytes = fromBase64Url(code.trim());
  const input = new Blob([bytes.buffer as ArrayBuffer])
    .stream().pipeThrough(new DecompressionStream('deflate-raw'));
  return new TextDecoder().decode(await collapse(input as ReadableStream<Uint8Array>));
}

// ---------------------------------------------------------------------------
// the link
// ---------------------------------------------------------------------------

type Envelope =
  | { t: 'hello'; identity: RoomIdentity }
  | { t: 'ping'; at: number }
  | { t: 'pong'; at: number }
  | { t: 'bye'; reason: string }
  | { t: 'msg'; body: unknown };

class DataChannelLink implements PeerLink {
  peer: RoomIdentity | undefined;
  rtt: number | undefined;
  onMessage: ((message: unknown) => void) | null = null;
  onReady: ((peer: RoomIdentity) => void) | null = null;
  onClose: ((reason: string) => void) | null = null;
  /** Messages sent before the channel opened, delivered in order once it does. */
  private readonly queued: Envelope[] = [];
  private closed = false;
  private timer: ReturnType<typeof setInterval> | undefined;
  private readonly connection: RTCPeerConnection;
  private readonly identity: RoomIdentity;
  /**
   * The channel, once there is one.
   *
   * The host makes it and holds it from the start. The joiner cannot: the
   * channel only arrives once the connection is up, and the connection only
   * comes up once the host has the joiner's answer — which the joiner has to
   * be able to hand over first. So the link exists before its channel does,
   * and anything said in the meantime waits in `queued`.
   */
  private channel: RTCDataChannel | undefined;

  constructor(connection: RTCPeerConnection, identity: RoomIdentity) {
    this.connection = connection;
    this.identity = identity;
    connection.onconnectionstatechange = () => {
      if (connection.connectionState === 'failed') this.shut('the connection failed');
    };
  }

  bind(channel: RTCDataChannel): void {
    if (this.closed) { try { channel.close(); } catch { /* already gone */ } return; }
    this.channel = channel;
    const opened = (): void => {
      this.post({ t: 'hello', identity: this.identity });
      for (const envelope of this.queued.splice(0)) this.post(envelope);
      // A heartbeat doubles as the round-trip measure the status line shows.
      this.timer = setInterval(() => this.post({ t: 'ping', at: Date.now() }), 2000);
    };
    channel.onopen = opened;
    channel.onmessage = event => this.receive(String(event.data));
    channel.onclose = () => this.shut('the other player disconnected');
    // A channel handed over by `ondatachannel` is often already open, and its
    // onopen has then been and gone.
    if (channel.readyState === 'open') opened();
  }

  get open(): boolean {
    return !this.closed && this.channel?.readyState === 'open';
  }

  private post(envelope: Envelope): void {
    if (this.channel?.readyState !== 'open') { this.queued.push(envelope); return; }
    try {
      this.channel.send(JSON.stringify(envelope));
    } catch {
      this.shut('the connection dropped');
    }
  }

  private receive(text: string): void {
    let envelope: Envelope;
    try {
      envelope = JSON.parse(text) as Envelope;
    } catch {
      return; // a frame we cannot read is a frame we ignore
    }
    switch (envelope.t) {
      case 'hello': {
        this.peer = envelope.identity;
        // Two different ROM sets are two different machines, and they would
        // part company on the first frame. Say so now, by name.
        if (envelope.identity.game !== this.identity.game) {
          this.shut(`they are playing ${envelope.identity.game}, you are playing ${this.identity.game}`);
          return;
        }
        if (envelope.identity.identity !== this.identity.identity) {
          this.shut('your ROM sets are not the same dump, so the two machines would not agree');
          return;
        }
        this.onReady?.(envelope.identity);
        return;
      }
      case 'ping': this.post({ t: 'pong', at: envelope.at }); return;
      case 'pong': this.rtt = Date.now() - envelope.at; return;
      case 'bye': this.shut(envelope.reason); return;
      case 'msg': this.onMessage?.(envelope.body); return;
    }
  }

  send(message: unknown): void {
    this.post({ t: 'msg', body: message });
  }

  close(): void {
    this.post({ t: 'bye', reason: 'they left the game' });
    this.shut('you left the game');
  }

  private shut(reason: string): void {
    if (this.closed) return;
    this.closed = true;
    if (this.timer !== undefined) clearInterval(this.timer);
    try { this.channel?.close(); } catch { /* already gone */ }
    try { this.connection.close(); } catch { /* already gone */ }
    this.onClose?.(reason);
  }
}

/**
 * Wait until this peer has found every way it can be reached, so one code
 * carries the whole offer and nothing has to trickle across afterwards.
 */
function gathered(connection: RTCPeerConnection, timeoutMs: number): Promise<void> {
  if (connection.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise(resolve => {
    const done = (): void => {
      clearTimeout(timer);
      connection.removeEventListener('icegatheringstatechange', check);
      resolve();
    };
    const check = (): void => { if (connection.iceGatheringState === 'complete') done(); };
    // A peer behind an unhelpful network can gather forever; what it has by
    // the deadline is still usually enough to connect.
    const timer = setTimeout(done, timeoutMs);
    connection.addEventListener('icegatheringstatechange', check);
  });
}

function peerConnection(options: LinkOptions): RTCPeerConnection {
  return new RTCPeerConnection({ iceServers: options.iceServers ?? DEFAULT_ICE_SERVERS });
}

export async function createHost(options: LinkOptions): Promise<HostInvite> {
  const connection = peerConnection(options);
  // Ordered and reliable: lockstep cannot skip a frame of input, so a lost
  // one would stall the room rather than glitch it. At a few frames of input
  // delay a retransmit has time to arrive.
  const channel = connection.createDataChannel('mamekit', { ordered: true });
  const link = new DataChannelLink(connection, options.identity);
  link.bind(channel);
  await connection.setLocalDescription(await connection.createOffer());
  await gathered(connection, options.gatherMs ?? 4000);
  return {
    code: await packCode(JSON.stringify(connection.localDescription)),
    link,
    async accept(answer: string): Promise<void> {
      const description = JSON.parse(await unpackCode(answer)) as RTCSessionDescriptionInit;
      await connection.setRemoteDescription(description);
    },
  };
}

export async function createGuest(offer: string, options: LinkOptions): Promise<GuestReply> {
  const connection = peerConnection(options);
  const link = new DataChannelLink(connection, options.identity);
  // The host's channel arrives only after it has the answer below, so the
  // link takes it whenever it turns up rather than waiting for it here.
  connection.ondatachannel = event => link.bind(event.channel);
  await connection.setRemoteDescription(
    JSON.parse(await unpackCode(offer)) as RTCSessionDescriptionInit);
  await connection.setLocalDescription(await connection.createAnswer());
  await gathered(connection, options.gatherMs ?? 4000);
  return { code: await packCode(JSON.stringify(connection.localDescription)), link };
}

// ---------------------------------------------------------------------------
// loopback, for tests and for two tabs on one machine
// ---------------------------------------------------------------------------

class LoopbackLink implements PeerLink {
  peer: RoomIdentity | undefined;
  rtt = 0;
  onMessage: ((message: unknown) => void) | null = null;
  onReady: ((peer: RoomIdentity) => void) | null = null;
  onClose: ((reason: string) => void) | null = null;
  open = true;
  other!: LoopbackLink;
  private readonly identity: RoomIdentity;
  constructor(identity: RoomIdentity) { this.identity = identity; }

  ready(): void {
    this.peer = this.other.identity;
    this.onReady?.(this.other.identity);
  }
  send(message: unknown): void {
    if (this.open) this.other.onMessage?.(message);
  }
  close(): void {
    if (!this.open) return;
    this.open = false;
    this.onClose?.('you left the game');
    this.other.close();
  }
}

/** Two links wired straight to each other: no network, no signalling. */
export function loopback(a: RoomIdentity, b: RoomIdentity): [PeerLink, PeerLink] {
  const left = new LoopbackLink(a);
  const right = new LoopbackLink(b);
  left.other = right;
  right.other = left;
  queueMicrotask(() => { left.ready(); right.ready(); });
  return [left, right];
}
