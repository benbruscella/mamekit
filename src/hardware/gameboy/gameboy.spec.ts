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
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { cartSlotFacts } from '../../mame/cart-slot.ts';
import { indexMameHardware } from '../../mame/hardware.ts';
import { extractGameboy } from './extract.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../../runtime/generated-device.ts';
import { RecordingAddressSpace } from '../../runtime/address-space-install.ts';
import { GAMEBOY_CART_SLOT_TAG, GAMEBOY_MAME_TYPES } from './definition.ts';

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
// The slot mounts its own cartridges: which board a cartridge needs is its
// own get_default_card_software's answer, never a selection handed in.
assert.equal(slot.slot.selector, undefined);
// The slot's default board and ROM region are the slot device's own facts.
// The console room reads them through cartSlotFacts; here they are held
// against the statements in MAME's source that make them.
const slotFile = definitions.get('GB_CART_SLOT')!.sourceFile;
const slotSource = readFileSync(join(mameSource, slotFile), 'utf8');
const facts = cartSlotFacts(mameSource, 'GB_CART_SLOT', GAMEBOY_CART_SLOT_TAG);
assert.ok(facts?.defaultOption && facts.romRegion, 'the slot must state its default and its region');
const romRegion = facts.romRegion;
assert.equal(facts.interface, 'gameboy_cart');
// MAME's own answer for a cartridge that names no memory controller: the
// option get_default_card_software falls through to, by its constant.
assert.equal(slot.slot.default, facts.defaultOption);
const fallback = /software_get_default_slot\(slotoptions::(\w+)\);\n\}/.exec(slotSource)?.[1];
assert.ok(fallback, 'get_default_card_software must fall through to a named option');
assert.ok(
  new RegExp(`\\b${fallback}\\s*=\\s*"${slot.slot.default}";`)
    .test(readFileSync(join(mameSource, dirname(slotFile), 'carts.cpp'), 'utf8')),
  'the default is the string MAME gives that option',
);
// The region is the slot's own "rom" sub-region, where call_load allocates it.
const subregion = romRegion.slice(GAMEBOY_CART_SLOT_TAG.length + 1);
assert.equal(romRegion, `${GAMEBOY_CART_SLOT_TAG}:${subregion}`);
assert.ok(slotSource.includes(`region_alloc(subtag("${subregion}")`));

// Every board this machine's own software list names, and MAME's fallback --
// not the whole `gameboy_cartridges` list, a third of which belongs to the
// Game Boy Color and the Mega Duck. A board that does not lower whole is not
// registered: it is named, with what failed, for the room to say so.
const options = Object.keys(slot.slot.options).sort();
const unsupported = Object.keys(slot.slot.unsupported ?? {});
assert.equal(options.length + unsupported.length, 17, 'every board the software list names is accounted for');
assert.deepEqual(unsupported, ['rom_camera'], 'only the Pocket Camera\'s sensor does not lower');
assert.match(slot.slot.unsupported.rom_camera, /acquire/);
assert.ok(!options.includes('rom_mbc6'), 'a board no Game Boy cartridge uses stays out');
for (const supported of [
  'rom', 'rom_mbc1', 'rom_mbc2', 'rom_mbc3', 'rom_mbc5', 'rom_huc1', 'rom_mmm01',
]) {
  assert.ok(options.includes(supported), `${supported} must be a declared board`);
}

// Every board reaches the mounted cartridge through the slot it is in, as
// MAME's cartridge interface does: its own inline accessors, compiled, over
// the `m_slot` its constructor aims at the owner.
for (const [option, card] of Object.entries(slot.slot.options) as [string, {
  members: { name: string; owner?: boolean }[];
  methods: { name: string }[];
}][]) {
  assert.equal(card.members.find(member => member.name === 'm_slot')?.owner, true, `${option} must hold its slot`);
  for (const accessor of ['cart_rom_region', 'cart_ram_region', 'cart_nvram_region', 'loaded_through_softlist', 'get_feature']) {
    assert.ok(card.methods.some(method => method.name === accessor), `${option} must ask its slot for ${accessor}`);
  }
  assert.ok(!card.methods.some(method => method.name === 'cart_space'), `${option} is handed the space by its slot`);
  assert.ok(
    card.methods.some(method => method.name === 'load'),
    `${option} must keep the method that installs it`,
  );
}

// Image loading is MAME's own: the slot's call_load, the file reader behind
// it and the header's RAM size all run as generated code.
for (const method of ['call_load', 'call_unload', 'load_image_file', 'allocate_cart_ram', 'get_default_card_software']) {
  assert.ok(slot.methods.some((candidate: { name: string }) => candidate.name === method), `the slot must keep ${method}`);
}

/** A cartridge whose every byte is its own low address, one bank number per page. */
function cartridge(size: number): Uint8Array {
  const rom = new Uint8Array(size);
  for (let index = 0; index < size; index++) rom[index] = index & 0xff;
  for (let page = 0; page * 0x4000 < size; page++) rom[page * 0x4000] = page;
  return rom;
}

/**
 * Mount a cartridge as its software-list part and run the slot's own
 * call_load against a fresh space: the part's dataareas are the regions the
 * board reads, its `slot` feature the board.
 */
function mount(option: string, rom: Uint8Array, areas: Record<string, Uint8Array> = {}) {
  clearGeneratedDevices();
  registerGeneratedDevice(slot);
  const regions: Record<string, Uint8Array> = {};
  const device = createDevice('GB_CART_SLOT', {
    clock: 0,
    tag: GAMEBOY_CART_SLOT_TAG,
    regions,
    image: { name: 'cartridge', software: { areas: { [subregion]: rom, ...areas }, features: { slot: option } } },
  });
  const space = new RecordingAddressSpace();
  assert.ok(device.installSlotCard(space), `${option} must install`);
  assert.equal(device.imageError?.(), undefined, `${option} must load`);
  assert.equal(regions[romRegion], rom, 'the part\'s ROM area is the slot\'s region');
  return { device, space, regions };
}

/** A cartridge file, as a visitor's uncatalogued dump arrives: MAME's own file reader takes it. */
function mountFile(rom: Uint8Array) {
  clearGeneratedDevices();
  registerGeneratedDevice(slot);
  const regions: Record<string, Uint8Array> = {};
  const device = createDevice('GB_CART_SLOT', {
    clock: 0,
    tag: GAMEBOY_CART_SLOT_TAG,
    regions,
    image: { name: 'cartridge.gb', bytes: rom },
  });
  const space = new RecordingAddressSpace();
  assert.ok(device.installSlotCard(space), 'a cartridge file must install');
  assert.equal(device.imageError?.(), undefined, 'a cartridge file must load');
  return { device, space, regions };
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

// Cartridge RAM (#294). An MBC maps it through a view it installs into the
// cartridge space, and its RAM-enable register selects and disables that
// view: 8 KiB of battery-backed RAM is one writable window at 0xa000, there
// only while the register holds 0x0a.
{
  const nvram = new Uint8Array(0x2000);
  const { space } = mount('rom_mbc1', cartridge(0x80000), { nvram });
  assert.equal(space.views.length, 1, 'MBC1 installs one view');
  const view = space.views[0]!;
  assert.deepEqual([view.start, view.end], [0xa000, 0xbfff]);
  const ram = view.entries.get(0)?.find(entry => entry.kind === 'rom' && entry.start === 0xa000) as
    { bytes: Uint8Array; writable?: boolean } | undefined;
  assert.ok(ram, 'the view\'s entry 0 is the RAM');
  assert.equal(ram.writable, true, 'install_ram is written as well as read');
  ram.bytes[5] = 0x5a;
  assert.equal(nvram[5], 0x5a, 'the window is the part\'s nvram area itself');
  // The board's reset left the RAM disabled; the enable register opens it.
  const selections: number[] = [];
  view.select = entry => void selections.push(entry);
  const enable = space.entries.find(entry => entry.kind === 'handler' && entry.start === 0x0000) as
    { write?: (offset: number, data: number) => unknown };
  assert.equal(view.selected, -1, 'RAM is disabled out of reset');
  enable.write!(0, 0x0a);
  enable.write!(0, 0x00);
  assert.deepEqual(selections, [0, -1], 'the RAM-enable register selects and disables the view');
}

// A battery save is the board's own: its `unload` hands the nvram to
// battery_save through the slot, and the next load's battery_load reads it
// back -- the host only keeps the bytes between the two.
{
  const part = () => ({ nvram: new Uint8Array(0x2000) });
  const ramOf = (space: RecordingAddressSpace) =>
    (space.views[0]!.entries.get(0)!.find(entry => entry.kind === 'rom') as unknown as { bytes: Uint8Array }).bytes;
  const first = mount('rom_mbc1', cartridge(0x80000), part());
  ramOf(first.space)[0] = 0x12;
  ramOf(first.space)[0x1fff] = 0x34;
  const saved = (first.device as unknown as { collectBattery(): { bytes: Uint8Array } | undefined }).collectBattery();
  assert.equal(saved?.bytes.length, 0x2000, 'the board saves its whole nvram');
  clearGeneratedDevices();
  registerGeneratedDevice(slot);
  const regions: Record<string, Uint8Array> = {};
  const device = createDevice('GB_CART_SLOT', {
    clock: 0,
    tag: GAMEBOY_CART_SLOT_TAG,
    regions,
    image: {
      name: 'cartridge', battery: saved!.bytes,
      software: { areas: { [subregion]: cartridge(0x80000), ...part() }, features: { slot: 'rom_mbc1' } },
    },
  });
  const space = new RecordingAddressSpace();
  device.installSlotCard(space);
  assert.deepEqual([ramOf(space)[0], ramOf(space)[0x1fff]], [0x12, 0x34], 'the next load reads the save back');
}

// A cartridge file goes through MAME's own load_image_file: the ROM region
// is allocated and read from the file, and the RAM the header declares
// (0x0149 = 0x02: 8 KiB; type 0x03: MBC1 with RAM and a battery) is
// allocated as `nvram` by allocate_cart_ram. The board is the one the
// slot's own get_default_card_software reads out of that header.
{
  const rom = cartridge(0x10000);
  rom[0x0147] = 0x03;
  rom[0x0148] = 0x01;
  rom[0x0149] = 0x02;
  let checksum = 0;
  for (let index = 0x0134; index < 0x014d; index++) checksum = (checksum - rom[index]! - 1) & 0xff;
  rom[0x014d] = checksum;
  const { regions, space } = mountFile(rom);
  assert.equal(regions[romRegion]?.length, 0x10000, 'the file is read into the ROM region');
  assert.equal(regions[`${GAMEBOY_CART_SLOT_TAG}:nvram`]?.length, 0x2000, 'the header\'s RAM is battery-backed');
  assert.ok(window(space, 'bank', 0x4000), 'the header names an MBC1');
  assert.equal(space.views.length, 1);
}

clearGeneratedDevices();
console.log(
  'gameboy.spec: PPU, APU, self-mounting cartridge slot, 16 source-declared boards, MBC banking, cartridge RAM and battery saves passed',
);
