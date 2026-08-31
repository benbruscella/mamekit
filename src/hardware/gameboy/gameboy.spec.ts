// The Game Boy cartridge bus, compiled from MAME source.
//
// No ROM and no dist: the slot and every board MAME declares for it are
// lowered out of src/devices/bus/gameboy, instantiated through the generic
// device runtime, and asked to install themselves exactly as the slot asks
// them to when a cartridge is mounted. What each board decodes is then read
// back off the recording address space.
//
// A Game Boy PCB is not describable by an address map: it installs its own
// windows into the CPU's space, and its bank switching is a set of write
// handlers over the ROM's own addresses. So the assertion that matters is not
// "did the device compile" but "did it decode the machine's bus" -- which is
// what a mounted, synthetic cartridge shows here.

import assert from 'node:assert/strict';
import { indexMameHardware } from '../../mame/hardware.ts';
import { extractGameboy } from './extract.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../../runtime/generated-device.ts';
import { RecordingAddressSpace } from '../../runtime/address-space-install.ts';
import { GAMEBOY_MAME_TYPES } from './definition.ts';

const mameSource = process.env.MAME_SRC ??
  new URL('../../../../mame/', import.meta.url).pathname;
const definitions = indexMameHardware(mameSource);
const extraction = extractGameboy({
  mameSource,
  entries: GAMEBOY_MAME_TYPES.map(type => ({
    type,
    definition: definitions.get(type),
    methods: [],
  })),
});

assert.ok(extraction, 'the Game Boy hardware must lower');
assert.deepEqual(
  [...extraction.executableTypes].sort(),
  [...GAMEBOY_MAME_TYPES].sort(),
  'the PPU, the sound chip and the cartridge slot must all be executable',
);

const slotIr = extraction.artifacts.find(artifact =>
  artifact.path.endsWith('gb_cart_slot.device.ir.json'));
assert.ok(slotIr);
const slot = JSON.parse(slotIr.contents);

// How a mounted card installs itself, read from MAME's own interface rather
// than assumed: the Game Boy hands the PCB nothing and lets it reach for the
// CPU space, where the Atari 2600 passes the space in as an argument.
assert.deepEqual(slot.slot.install, { method: 'load', space: 'cart_space' });
assert.equal(slot.slot.member, 'm_cart');
assert.equal(slot.slot.selector, 'cart.slot');
// MAME's own answer for a header that declares no memory controller.
assert.equal(slot.slot.default, 'rom');

// Every board MAME's `gameboy_cartridges` declares, keyed by the name the
// software list uses in its `slot` feature. CART_SLOT_SUPPORT.gameboy in
// src/gen/generate.ts names the subset the console room offers; keeping this
// assertion here is what stops the two drifting apart.
const options = Object.keys(slot.slot.options).sort();
// Every board this machine's own software list names, and MAME's fallback --
// not the whole `gameboy_cartridges` list, a third of which belongs to the
// Game Boy Color and the Mega Duck.
assert.equal(options.length, 17, 'every board the software list names must lower');
assert.ok(!options.includes('rom_mbc6'), 'a board no Game Boy cartridge uses stays out');
for (const supported of [
  'rom', 'rom_mbc1', 'rom_mbc2', 'rom_mbc3', 'rom_mbc5', 'rom_huc1', 'rom_mmm01',
]) {
  assert.ok(options.includes(supported), `${supported} must be a declared board`);
}

// Every board reads the mounted cartridge through the slot's own sub-regions,
// which is how MAME's cartridge interface reaches them.
for (const [option, card] of Object.entries(slot.slot.options) as [string, {
  resources?: { calls?: Record<string, { kind: string; name: string }> };
  methods: { name: string }[];
}][]) {
  assert.equal(
    card.resources?.calls?.cart_rom_region?.name,
    'cartslot:rom',
    `${option} must read the mounted cartridge`,
  );
  assert.ok(
    card.methods.some(method => method.name === 'load'),
    `${option} must keep the method that installs it`,
  );
}

// Image loading is the console room's job; the live bus is what is kept.
assert.ok(!slot.methods.some((method: { name: string }) => method.name === 'call_load'));

/** A cartridge whose every byte is its own low address, one bank number per page. */
function cartridge(size: number): Uint8Array {
  const rom = new Uint8Array(size);
  for (let index = 0; index < size; index++) rom[index] = index & 0xff;
  for (let page = 0; page * 0x4000 < size; page++) rom[page * 0x4000] = page;
  return rom;
}

/** Mount a cartridge and run the board's own installer against a fresh space. */
function mount(option: string, rom: Uint8Array) {
  clearGeneratedDevices();
  registerGeneratedDevice(slot);
  const device = createDevice('GB_CART_SLOT', {
    clock: 0,
    regions: { 'cartslot:rom': rom },
    selectors: { 'cart.slot': option },
  });
  const space = new RecordingAddressSpace();
  device.installSlotCard(space);
  return { device, space };
}

const window = (
  space: RecordingAddressSpace,
  kind: string,
  start: number,
): (typeof space.entries)[number] | undefined =>
  space.entries.find(entry => entry.kind === kind && entry.start === start);

// A flat 32 KiB cartridge is one ROM window across the whole cartridge space.
{
  const { space } = mount('rom', cartridge(0x8000));
  const rom = window(space, 'rom', 0x0000);
  assert.ok(rom, 'a flat cartridge must install its ROM');
  assert.equal(rom.end, 0x7fff);
  assert.equal((rom as { bytes: { length: number } }).bytes.length, 0x8000);
}

// MBC1 splits the space into two banked windows and takes four bank-switch
// write ranges over the ROM's own addresses -- MAME's decode, not ours.
{
  const { space } = mount('rom_mbc1', cartridge(0x80000)); // 512 KiB, 32 pages
  assert.ok(window(space, 'bank', 0x0000), 'MBC1 must bank the low ROM window');
  assert.ok(window(space, 'bank', 0x4000), 'MBC1 must bank the high ROM window');
  for (const start of [0x0000, 0x2000, 0x4000, 0x6000]) {
    assert.ok(
      space.entries.some(entry => entry.kind === 'handler' && entry.start === start),
      `MBC1 must decode bank-switch writes at 0x${start.toString(16)}`,
    );
  }

  // The high window follows the fine bank register, and the low one does not.
  const low = window(space, 'bank', 0x0000) as { bank: { read(offset: number): number } };
  const high = window(space, 'bank', 0x4000) as { bank: { read(offset: number): number } };
  const fine = space.entries.find(entry =>
    entry.kind === 'handler' && entry.start === 0x2000) as {
      write?: (offset: number, data: number) => unknown;
    };
  assert.ok(fine?.write);
  assert.equal(low.bank.read(0), 0, 'the low window starts on page 0');
  assert.equal(high.bank.read(0), 1, 'the high window powers up on page 1');
  // The board wires a write as (offset, data); MBC1's bank-switch handler
  // declares only `u8 data`, and MAME installs it as a data-only delegate.
  fine.write(0x2000, 5);
  assert.equal(high.bank.read(0), 5, 'a fine bank write moves the high window');
  assert.equal(low.bank.read(0), 0, 'and leaves the low window where it was');
}

// MBC5 reaches the same two windows through a different register layout: a
// nine-bit fine bank split across two write ranges.
{
  const { space } = mount('rom_mbc5', cartridge(0x100000)); // 1 MiB, 64 pages
  assert.ok(window(space, 'bank', 0x0000), 'MBC5 must bank the low ROM window');
  const high = window(space, 'bank', 0x4000) as { bank: { read(offset: number): number } };
  assert.ok(high, 'MBC5 must bank the high ROM window');
  const fineLow = space.entries.find(entry =>
    entry.kind === 'handler' && entry.start === 0x2000) as {
      write?: (offset: number, data: number) => unknown;
    };
  assert.ok(fineLow?.write);
  fineLow.write(0x2000, 0x11);
  assert.equal(high.bank.read(0), 0x11, 'MBC5 selects a page with its low fine register');
}

clearGeneratedDevices();
console.log(
  'gameboy.spec: PPU, APU, cartridge slot, 17 source-declared boards and MBC banking passed',
);
