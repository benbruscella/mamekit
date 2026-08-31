import assert from 'node:assert/strict';
import {
  installedOffset,
  installedViewEntry,
  RecordingAddressSpace,
  type InstalledBank,
} from './address-space-install.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

check('install_rom takes both the mirrored and unmirrored overload', () => {
  const space = new RecordingAddressSpace();
  const bytes = Uint8Array.of(1, 2, 3, 4);
  space.install_rom(0x1000, 0x1fff, bytes);
  space.install_rom(0x1000, 0x17ff, 0x800, bytes);
  assert.deepEqual(
    space.entries.map(entry => [entry.kind, entry.start, entry.end, 'mirror' in entry ? entry.mirror : -1]),
    [['rom', 0x1000, 0x1fff, 0], ['rom', 0x1000, 0x17ff, 0x800]],
    'only the argument count separates the two MAME signatures',
  );
});

check('a mirror names undecoded address lines, so an access folds down', () => {
  // `install_rom(0x1000, 0x17ff, 0x800, base)` is a 2K ROM answering across 4K:
  // bit 11 is not decoded, so 0x1900 reads the same byte as 0x1100.
  assert.equal(installedOffset(0x1100, 0x1000, 0x800), 0x100);
  assert.equal(installedOffset(0x1900, 0x1000, 0x800), 0x100);
  assert.equal(installedOffset(0x1042, 0x1000, 0), 0x42);
});

check('a bank install keeps the bank object, not its numeric stand-in', () => {
  const space = new RecordingAddressSpace();
  const bank: InstalledBank = { read: () => 0, write: () => {} };
  space.install_read_bank(0x1000, 0x1fff, bank);
  space.install_write_bank(0x1000, 0x1fff, bank);
  // A device whose bank member never resolved would pass a number here; that
  // is exactly how every Atari 2600 bank-switch cartridge lost its window.
  space.install_read_bank(0x1000, 0x1fff, 0);
  assert.equal(space.entries.length, 2);
  assert.deepEqual(
    space.entries.map(entry => entry.kind === 'bank' ? [entry.read, entry.write] : []),
    [[true, false], [false, true]],
  );
});

check('a tap records the callback and answers nothing itself', () => {
  const space = new RecordingAddressSpace();
  const switched: number[] = [];
  space.install_read_tap(0x1ff8, 0x1ff9, 'bank', (address: number) => {
    switched.push(address);
  });
  const [tap] = space.entries;
  assert.equal(tap?.kind, 'tap');
  assert.equal(tap?.kind === 'tap' && tap.name, 'bank');
  assert.ok(tap?.kind === 'tap' && tap.read && !tap.write, 'a read tap taps reads only');
  if (tap?.kind === 'tap') tap.read!(0x1ff9);
  assert.deepEqual(switched, [0x1ff9], 'the tap sees the address the CPU touched');
});

check('install_readwrite_tap uses one callback for both sides', () => {
  const space = new RecordingAddressSpace();
  const observe = (): void => {};
  space.install_readwrite_tap(0x1fe, 0x1fe, 'trigger', observe);
  const [tap] = space.entries;
  assert.ok(tap?.kind === 'tap' && tap.read === observe && tap.write === observe);
});

check('handler installs keep their delegate', () => {
  const space = new RecordingAddressSpace();
  const write = (offset: number): number => offset;
  space.install_write_handler(0x1ff6, 0x1ff9, write);
  const [entry] = space.entries;
  assert.ok(entry?.kind === 'handler' && entry.write === write && !entry.read);
});

check('a view records its installs per entry rather than into the space', () => {
  const space = new RecordingAddressSpace();
  const view = {};
  space.install_view(0x1000, 0x17ff, view);
  assert.equal(space.views.length, 1);
  const installed = space.views[0]!;
  const bank: InstalledBank = { read: () => 0, write: () => {} };
  installedViewEntry(installed, 1).install_read_bank(0x1000, 0x17ff, bank);
  assert.equal(space.entries.length, 0, 'a view entry is not installed until selected');
  assert.equal(installed.entries.get(1)?.length, 1);
});

check('a pointer into a region installs the bytes it addresses', () => {
  const space = new RecordingAddressSpace();
  const bytes = Uint8Array.of(9, 8, 7, 6, 5);
  space.install_rom(0x1800, 0x1fff, { generatedPointer: true, source: bytes, offset: 2 });
  const [entry] = space.entries;
  assert.ok(entry?.kind === 'rom');
  assert.equal(entry.kind === 'rom' && entry.bytes.length, 3);
  assert.equal(entry.kind === 'rom' && entry.bytes[0], 7);
});

console.log(`address-space-install.spec: ${passed} passed`);
