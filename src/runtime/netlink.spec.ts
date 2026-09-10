import assert from 'node:assert/strict';
import { loopback, packCode, unpackCode, type RoomIdentity } from './netlink.ts';

// --- codes: an offer has to survive a URL and a paste ----------------------
{
  // A real data-channel offer, in shape and in size: repetitive text with a
  // long fingerprint and a handful of candidates.
  const sdp = [
    'v=0', 'o=- 4611731400430051336 2 IN IP4 127.0.0.1', 's=-', 't=0 0',
    'a=group:BUNDLE 0', 'a=msid-semantic: WMS',
    'm=application 9 UDP/DTLS/SCTP webrtc-datachannel', 'c=IN IP4 0.0.0.0',
    'a=candidate:1 1 udp 2113937151 192.168.1.24 51820 typ host generation 0',
    'a=candidate:2 1 udp 1677729535 203.0.113.7 51820 typ srflx raddr 192.168.1.24 rport 51820',
    'a=ice-ufrag:Xk3s', 'a=ice-pwd:9RBmT0hhVOHnVdN4vDNyqLpQ',
    'a=fingerprint:sha-256 ' + Array.from({ length: 32 }, (_, i) =>
      (i * 7 % 256).toString(16).padStart(2, '0').toUpperCase()).join(':'),
    'a=setup:actpass', 'a=mid:0', 'a=sctp-port:5000', 'a=max-message-size:262144',
  ].join('\r\n');
  const description = JSON.stringify({ type: 'offer', sdp });
  const code = await packCode(description);
  assert.equal(await unpackCode(code), description, 'an offer round-trips through a code');
  assert.match(code, /^[A-Za-z0-9_-]+$/, 'and carries nothing a URL would mangle');
  assert.ok(code.length < description.length, `a code (${code.length}) is smaller than its offer (${description.length})`);
  assert.equal(await unpackCode(`  ${code}\n`), description, 'a pasted code may arrive with whitespace');
}

// --- loopback: two links wired to each other -------------------------------
{
  const identity: RoomIdentity = { game: 'pacman', identity: 'pacman|abc|maincpu=1234' };
  const [host, guest] = loopback(identity, { ...identity });
  const seen: unknown[] = [];
  const ready: string[] = [];
  guest.onMessage = message => seen.push(message);
  host.onReady = peer => ready.push(`host sees ${peer.game}`);
  guest.onReady = peer => ready.push(`guest sees ${peer.game}`);
  await Promise.resolve();
  assert.deepEqual(ready.sort(), ['guest sees pacman', 'host sees pacman']);

  host.send({ kind: 'input', player: 1, frame: 3, events: [] });
  assert.deepEqual(seen, [{ kind: 'input', player: 1, frame: 3, events: [] }]);

  const closed: string[] = [];
  host.onClose = reason => closed.push(`host: ${reason}`);
  guest.onClose = reason => closed.push(`guest: ${reason}`);
  host.close();
  assert.equal(closed.length, 2, 'closing one end closes both');
  host.send({ kind: 'input', player: 1, frame: 4, events: [] });
  assert.equal(seen.length, 1, 'and nothing is delivered afterwards');
}

console.log('netlink.spec: offer codes survive a link and a paste, and a loopback carries a session');
