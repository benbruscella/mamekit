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
  { start: 0x2200, end: 0x2201, select: 0x0008, kind: 'handler', write: 'write' },
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
bus.write(0x2209, 0x5a);
assert.deepEqual(writes[1], [0x2209, 9, 0x5a], 'select bits must remain in handler offset');

bus.write(0x3001, 0x77);
assert.equal(bus.read(0x3001), 0x77);
assert.deepEqual(writes[2], [0x3001, 1, 0], 'handler must observe old shared RAM');
bus.write(0x4001, 0x66);
assert.equal(bus.read(0x4001), 0x66);
assert.deepEqual(writes[3], [0x4001, 1, 0x66], 'device-backed RAM remains write-through');
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

const regionBus = new Bus([
  { start: 0x0000, end: 0x0001, kind: 'rom', romOffset: 0 },
  { start: 0x8000, end: 0x8001, kind: 'rom', region: 'cart', romOffset: 0 },
], rom, { read: {}, write: {} }, {}, 8, {
  cart: Uint8Array.of(0xaa, 0xbb),
});
assert.deepEqual(
  [regionBus.read(0x0000), regionBus.read(0x8000), regionBus.read(0x8001)],
  [0x11, 0xaa, 0xbb],
  'each ROM range must read from its declared region',
);
assert.throws(
  () => new Bus(
    [{ start: 0, end: 0, kind: 'rom', region: 'missing' }],
    rom,
    { read: {}, write: {} },
    {},
    8,
    {},
  ),
  /missing ROM region: missing/,
);

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

const wordWrites: Array<[number, number, number, number | undefined]> = [];
let wordValue = 0;
const wordBus = new Bus([
  { start: 0x100000, end: 0x100003, kind: 'ram', share: 'wordRam' },
  {
    start: 0x400000,
    end: 0x400003,
    mirror: 0x002000,
    kind: 'handler',
    read: 'wordRead',
    write: 'wordWrite',
  },
], rom, {
  read: { wordRead: () => wordValue },
  write: {
    wordWrite: (address, offset, data, memMask) => {
      wordWrites.push([address, offset, data, memMask]);
      wordValue = data;
    },
  },
}, {}, 16);
wordBus.write16be(0x100000, 0x55aa);
assert.equal(wordBus.read16be(0x100000), 0x55aa);
assert.deepEqual([wordBus.read(0x100000), wordBus.read(0x100001)], [0x55, 0xaa]);
wordBus.write16be(0x402002, 0xa55a);
assert.deepEqual(
  wordWrites,
  [[0x402002, 1, 0xa55a, 0xffff]],
  'a 68000 word transaction must reach a 16-bit mirrored handler atomically',
);
assert.equal(wordBus.read16be(0x402002), 0xa55a);

// MAME `.umask16(0xff00)`: an 8-bit device wired to one byte lane of a 16-bit
// bus (the MCR "Sounds Good" PIA at 0x060000). It answers only on its lane,
// its offset counts whole words, and the byte arrives right-justified.
const laneWrites: Array<[number, number, number, number | undefined]> = [];
const laneBus = new Bus([
  {
    start: 0x060000,
    end: 0x060007,
    mirror: 0x00fff0,
    umask: 0xff00,
    kind: 'handler',
    read: 'laneRead',
    write: 'laneWrite',
  },
  {
    start: 0x070000,
    end: 0x070007,
    umask: 0x00ff,
    kind: 'handler',
    read: 'laneRead',
    write: 'laneWrite',
  },
], rom, {
  read: { laneRead: (_address, offset) => 0x80 | offset },
  write: {
    laneWrite: (address, offset, data, memMask) =>
      laneWrites.push([address, offset, data, memMask]),
  },
}, {}, 16);
laneBus.write(0x060004, 0x80);
laneBus.write(0x060005, 0x5a);
laneBus.write16be(0x061006, 0x3c00);
laneBus.write(0x070005, 0x5a);
assert.deepEqual(
  laneWrites,
  [[0x060004, 2, 0x80, 0xff], [0x061006, 3, 0x3c, 0xff], [0x070005, 2, 0x5a, 0xff]],
  'only the wired lane reaches the handler, right-justified, at a word offset',
);
assert.equal(laneBus.read(0x060004), 0x82, 'high-lane byte read is the device byte');
assert.equal(laneBus.read(0x060005), 0x00, 'the unwired lane reads as unmapped');
assert.equal(laneBus.read16be(0x061006), 0x8300, 'a word read places the byte on its lane');
assert.equal(laneBus.read(0x070005), 0x82, 'low-lane devices answer on odd addresses');
assert.equal(laneBus.read16be(0x070004), 0x0082);

assert.throws(
  () => new Bus([{ start: 0, end: 0, kind: 'handler', read: 'missing' }], rom, { read: {}, write: {} }),
  /missing read handler/,
);

console.log('bus.spec: byte/word ROM, RAM, mirrors/selects, byte lanes, handlers and open bus passed');
