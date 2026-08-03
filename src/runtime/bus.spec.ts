import assert from 'node:assert/strict';
import { Bus } from './bus.ts';

const rom = Uint8Array.of(0x11, 0x22, 0x33, 0x44);
const reads: Array<[number, number]> = [];
const writes: Array<[number, number, number]> = [];
const shares: Record<string, Uint8Array> = {};
const bus = new Bus([
  { start: 0x0000, end: 0x0003, kind: 'rom' },
  { start: 0xf000, end: 0xf003, kind: 'rom', romOffset: 0 },
  { start: 0x1000, end: 0x1003, kind: 'ram', share: 'work' },
  { start: 0x2000, end: 0x2001, mirror: 0x0100, kind: 'handler', read: 'read', write: 'write' },
  {
    start: 0x3000,
    end: 0x3001,
    kind: 'ram',
    share: 'video',
    write: 'videoWrite',
    writeHandlerOwnsRam: true,
  },
  { start: 0x4000, end: 0x4001, kind: 'ram', share: 'palette', write: 'paletteWrite' },
  { start: 0x5000, end: 0x5000, kind: 'ram', share: 'latched', readOnly: true },
  { start: 0x6000, end: 0x6000, kind: 'ram', share: 'writeLatch', writeOnly: true },
  {
    start: 0x7000,
    end: 0x7000,
    kind: 'ram',
    share: 'outputLatch',
    writeOnly: true,
    read: 'inputPort',
  },
], rom, {
  read: {
    read: (address, offset) => {
      reads.push([address, offset]);
      return 0x1ff;
    },
    inputPort: () => 0xa5,
  },
  write: {
    write: (address, offset, data) => writes.push([address, offset, data]),
    videoWrite: (address, offset, data) => {
      writes.push([address, offset, shares.video![offset]!]);
      shares.video![offset] = data;
    },
    paletteWrite: (address, offset, data) => writes.push([address, offset, data]),
  },
}, shares);

assert.equal(bus.read(0), 0x11);
assert.equal(bus.read(3), 0x44);
assert.equal(bus.read(0xf002), 0x33);
assert.equal(bus.read(0x9999), 0);
bus.write(0x1002, 0x1a5);
assert.equal(bus.read(0x1002), 0xa5);
assert.equal(bus.shares.work?.[2], 0xa5);

assert.equal(bus.read(0x2101), 0xff);
assert.deepEqual(reads, [[0x2101, 1]]);
bus.write(0x2100, 0x1fe);
assert.deepEqual(writes[0], [0x2100, 0, 0xfe]);

bus.write(0x3001, 0x77);
assert.equal(bus.read(0x3001), 0x77);
assert.deepEqual(writes[1], [0x3001, 1, 0], 'handler must observe old shared RAM');
bus.write(0x4001, 0x66);
assert.equal(bus.read(0x4001), 0x66);
assert.deepEqual(writes[2], [0x4001, 1, 0x66], 'device-backed RAM remains write-through');
bus.shares.latched![0] = 0x7c;
assert.equal(bus.read(0x5000), 0x7c);
bus.write(0x5000, 0x11);
assert.equal(bus.read(0x5000), 0x7c, 'read-only shares must ignore CPU writes');
bus.write(0x6000, 0x93);
assert.equal(bus.shares.writeLatch![0], 0x93);
assert.equal(bus.read(0x6000), 0, 'write-only shares must return open bus');
bus.write(0x7000, 0x3c);
assert.equal(bus.shares.outputLatch?.[0], 0x3c);
assert.equal(bus.read(0x7000), 0xa5, 'split input/output ranges must preserve the read handler');
assert.equal(bus.in(0), 0);

const viewBus = new Bus([
  { start: 0x8000, end: 0x8000, kind: 'rom', romOffset: 0 },
  { start: 0x8000, end: 0x8000, kind: 'ram', share: 'view0', viewTag: 'm_view', viewEntry: 0 },
  { start: 0x8000, end: 0x8000, kind: 'ram', share: 'view1', viewTag: 'm_view', viewEntry: 1 },
], rom, { read: {}, write: {} });
viewBus.write(0x8000, 0x44);
assert.equal(viewBus.read(0x8000), 0x44);
viewBus.selectView('m_view', 1);
assert.equal(viewBus.read(0x8000), 0);
viewBus.write(0x8000, 0x55);
assert.equal(viewBus.read(0x8000), 0x55);
viewBus.selectView('m_view', 2);
assert.equal(viewBus.read(0x8000), 0x11, 'unmapped view entry exposes the base map');

const highWrites: Array<[number, number, number]> = [];
const highBus = new Bus([
  { start: 0x100000, end: 0x100003, kind: 'rom', romOffset: 0 },
  { start: 0x200000, end: 0x200003, kind: 'ram', share: 'highWork' },
  { start: 0xff0000, end: 0xff0001, kind: 'handler', write: 'highWrite' },
], rom, {
  read: {},
  write: {
    highWrite: (address, offset, data) => highWrites.push([address, offset, data]),
  },
});
assert.equal(highBus.read(0x100002), 0x33);
highBus.write(0x200003, 0xa5);
assert.equal(highBus.read(0x200003), 0xa5);
highBus.write(0xff0001, 0x1fe);
assert.deepEqual(highWrites, [[0xff0001, 1, 0xfe]]);
assert.equal(highBus.read(0xfe0000), 0);

assert.throws(
  () => new Bus([{ start: 0, end: 0, kind: 'handler', read: 'missing' }], rom, { read: {}, write: {} }),
  /missing read handler/,
);

console.log('bus.spec: 16/24-bit ROM, RAM, shares, mirrors, handlers and open bus passed');
