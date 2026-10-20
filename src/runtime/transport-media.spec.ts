// node src/runtime/transport-media.spec.ts
import assert from 'node:assert/strict';
import { imageCrc, missingMedia, putMedia, recordMedia, transportImage } from './transport-media.ts';

// A deck over a set held by name, counting what it mounts.
function deck(tag: string, set: Record<string, number[]>, initially?: string) {
  let images = new Map(Object.entries(set).map(([name, bytes]) => [name, Uint8Array.from(bytes)]));
  let mounted = initially;
  const mounts: string[] = [];
  const transport = transportImage(tag, () => images, () => mounted, name => { mounted = name; mounts.push(name); });
  return {
    transport, mounts,
    open(other: Record<string, number[]>) { images = new Map(Object.entries(other).map(([name, bytes]) => [name, Uint8Array.from(bytes)])); mounted = Object.keys(other)[0]; },
  };
}

{
  const tape = deck('tape', { 'side1.tap': [1, 2], 'side2.tap': [3, 4] }, 'side2.tap');
  const media = recordMedia([tape.transport]);
  assert.deepEqual(media, { tape: { name: 'side2.tap', crc: imageCrc(Uint8Array.from([3, 4])) } }, 'a save records the name and the bytes');
  tape.transport.select({ name: 'side1.tap', crc: imageCrc(Uint8Array.from([1, 2])) });
  assert.deepEqual(missingMedia([tape.transport], media), [], 'the set in hand still holds the side it was saved on');
  putMedia([tape.transport], media);
  assert.deepEqual(tape.mounts, ['side1.tap', 'side2.tap'], 'and that side goes back in');
  putMedia([tape.transport], media);
  assert.equal(tape.mounts.length, 2, 'an image already in is not mounted again');

  // Another set, whose tape has the same name and other bytes (batman, batmano).
  tape.open({ 'side2.tap': [9, 9] });
  assert.deepEqual(missingMedia([tape.transport], media), ['side2.tap'], 'a name alone does not say which tape it is');
}

{
  // Checked before anything moves: one missing image leaves every transport as it was.
  const tape = deck('tape', { 'a.tap': [1] }, 'a.tap');
  const disk = deck('disk', { 'b.d64': [2] }, 'b.d64');
  const saved = { tape: { name: 'a.tap', crc: imageCrc(Uint8Array.from([1])) }, disk: { name: 'gone.d64', crc: '00000000' } };
  tape.open({ 'other.tap': [5] });
  assert.deepEqual(missingMedia([tape.transport, disk.transport], saved), ['a.tap', 'gone.d64']);
  assert.deepEqual(tape.mounts, [], 'nothing was mounted to find out');
  assert.deepEqual(missingMedia([tape.transport], { disk: saved.disk }), ['gone.d64'], 'a transport that is not here is missing');
  assert.deepEqual(missingMedia([tape.transport], { tape: 'a.tap' }), ['a.tap'], 'a record without a CRC cannot be checked');
  assert.deepEqual(missingMedia([tape.transport], undefined), [], 'a save that names no media needs none');
}

console.log('transport-media.spec: names with CRCs, all-or-nothing checks and putting images back passed');
