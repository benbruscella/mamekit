import assert from 'node:assert/strict';
import { Bus, byteAddress } from './bus.ts';

assert.equal(byteAddress(0x28, -3), 5, 'bit-addressed spaces lower to byte storage');
assert.equal(byteAddress(5, 1), 10, 'positive address shifts preserve word-addressed spaces');

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

const nativeReadMasks: Array<number | undefined> = [];
const maskedWordBus = new Bus([
  { start: 0x500000, end: 0x500001, kind: 'handler', read: 'maskedRead' },
], rom, {
  read: {
    maskedRead: (_address, _offset, memMask) => {
      nativeReadMasks.push(memMask);
      return memMask === 0xff00 ? 0xa500 : memMask === 0x00ff ? 0x005a : 0xa55a;
    },
  },
  write: {},
}, {}, 16);
assert.equal(maskedWordBus.read(0x500000), 0xa5);
assert.equal(maskedWordBus.read(0x500001), 0x5a);
assert.equal(maskedWordBus.read16be(0x500000), 0xa55a);
assert.deepEqual(nativeReadMasks, [0xff00, 0x00ff, 0xffff]);

// An 8-bit device may span both lanes of a 16-bit address map without an
// umask. Its offsets remain byte-based and a word access becomes two ordered
// byte accesses. K051960 sprite RAM uses exactly this mapping on TMNT.
const byteDevice = new Uint8Array(4);
const byteWrites: Array<[number, number, number, number | undefined]> = [];
const byteDeviceBus = new Bus([{
  start: 0x140400,
  end: 0x140403,
  kind: 'handler',
  handlerWidth: 8,
  read: 'byteRead',
  write: 'byteWrite',
}], rom, {
  read: { byteRead: (_address, offset) => byteDevice[offset]! },
  write: {
    byteWrite: (address, offset, data, memMask) => {
      byteWrites.push([address, offset, data, memMask]);
      byteDevice[offset] = data;
    },
  },
}, {}, 16);
byteDeviceBus.write16be(0x140400, 0x80a5);
byteDeviceBus.write(0x140402, 0x33);
assert.deepEqual(byteDevice, Uint8Array.of(0x80, 0xa5, 0x33, 0));
assert.deepEqual(byteWrites, [
  [0x140400, 0, 0x80, 0xff],
  [0x140401, 1, 0xa5, 0xff],
  [0x140402, 2, 0x33, undefined],
]);
assert.equal(byteDeviceBus.read16be(0x140400), 0x80a5);
assert.equal(byteDeviceBus.read(0x140402), 0x33);

// A V30 has a 16-bit little-endian bus. Native word handlers still count
// word offsets, but byte accesses present the low lane at the even address.
// R-Type programs its PIC this way and writes its palette through native u16
// handlers, so treating the map as either 8-bit or big-endian loses both.
const littleWrites: Array<[number, number, number, number | undefined]> = [];
const littleWordBus = new Bus([{
  start: 0x2000,
  end: 0x2003,
  kind: 'handler',
  read: 'littleRead',
  write: 'littleWrite',
}], rom, {
  read: { littleRead: () => 0x1234 },
  write: {
    littleWrite: (address, offset, data, memMask) => {
      littleWrites.push([address, offset, data, memMask]);
    },
  },
}, {}, 16, undefined, 'little');
assert.equal(littleWordBus.read(0x2000), 0x34);
assert.equal(littleWordBus.read(0x2001), 0x12);
assert.equal(littleWordBus.read16be(0x2000), 0x3412);
littleWordBus.write(0x2000, 0x56);
littleWordBus.write(0x2001, 0x78);
littleWordBus.write16be(0x2000, 0xabcd);
assert.deepEqual(littleWrites, [
  [0x2000, 0, 0x0056, 0x00ff],
  [0x2001, 0, 0x7800, 0xff00],
  [0x2000, 0, 0xcdab, 0xffff],
]);

// The low unit-mask lane is even on that little-endian bus. Consecutive even
// ports select consecutive PIC offsets; odd ports are physically unwired.
const littleLaneWrites: Array<[number, number, number]> = [];
const littleLaneBus = new Bus([{
  start: 0x40,
  end: 0x43,
  kind: 'handler',
  umask: 0x00ff,
  read: 'laneRead',
  write: 'laneWrite',
}], rom, {
  read: { laneRead: (_address, offset) => 0xa0 | offset },
  write: {
    laneWrite: (address, offset, data) => {
      littleLaneWrites.push([address, offset, data]);
    },
  },
}, {}, 16, undefined, 'little');
assert.equal(littleLaneBus.read(0x40), 0xa0);
assert.equal(littleLaneBus.read(0x41), 0x00);
assert.equal(littleLaneBus.read(0x42), 0xa1);
littleLaneBus.write(0x40, 0x17);
littleLaneBus.write(0x41, 0xff);
littleLaneBus.write(0x42, 0x20);
assert.deepEqual(littleLaneWrites, [[0x40, 0, 0x17], [0x42, 1, 0x20]]);

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

// MAME `.bankr()`: a bank window is byte-addressed storage even on a 16-bit
// bus. Reading it through the native-16-bit handler adapter halves the offset,
// which returns every other byte of the bank and nothing MAME would show
// (Gauntlet's slapstic window, issue #88).
const bankBytes = Uint8Array.from({ length: 16 }, (_value, index) => 0x40 + index);
const bankReads: number[] = [];
const bankWrites: Array<[number, number]> = [];
const bankBus = new Bus([
  {
    start: 0x038000,
    end: 0x039fff,
    mirror: 0x286000,
    kind: 'handler',
    bank: 'slapstic_bank',
    read: 'bank.slapstic_bank',
    write: 'bank.slapstic_bank',
  },
], rom, {
  read: {
    'bank.slapstic_bank': (_address, offset) => {
      bankReads.push(offset);
      return bankBytes[offset & 0xf]!;
    },
  },
  write: {
    'bank.slapstic_bank': (_address, offset, data) => { bankWrites.push([offset, data]); },
  },
}, {}, 16);
assert.equal(bankBus.read(0x038000), 0x40);
assert.equal(bankBus.read(0x038001), 0x41);
assert.equal(bankBus.read16be(0x038002), 0x4243, 'a word read is two consecutive bank bytes');
assert.equal(
  bankBus.read16be(0x2be004),
  0x4445,
  'the mirror image reads the same bank offset',
);
assert.deepEqual(
  bankReads,
  [0, 1, 2, 3, 4, 5],
  'the bank handler is offset by byte, never by word',
);
bankBus.write16be(0x038006, 0x1234);
assert.deepEqual(
  bankWrites,
  [[6, 0x12], [7, 0x34]],
  'a word write splits big-endian across two bank bytes',
);

assert.throws(
  () => new Bus([{ start: 0, end: 0, kind: 'handler', read: 'missing' }], rom, { read: {}, write: {} }),
  /missing read handler/,
);

// MAME `install_readwrite_tap`: a device that watches the space sees one call
// per access, at the access address, and a word access is one access.
const tapped: number[] = [];
const tapBus = new Bus([
  { start: 0, end: 0xffff, kind: 'ram' },
], rom, { read: {}, write: {} }, {}, 16);
tapBus.installAccessTap(address => tapped.push(address));
tapBus.read(0x1234);
tapBus.read16be(0x2000);
tapBus.write16be(0x2004, 0x1111);
tapBus.read32be(0x3000);
assert.deepEqual(
  tapped,
  [0x1234, 0x2000, 0x2004, 0x3000, 0x3002],
  'byte and word accesses tap once; a long taps as the two word accesses it is',
);

console.log('bus.spec: byte/word ROM, RAM, mirrors/selects, byte lanes, banks, taps and open bus passed');
