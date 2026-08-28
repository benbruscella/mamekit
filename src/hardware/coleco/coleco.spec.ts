// The ColecoVision cartridge bus, compiled from MAME source.
//
// No ROM and no dist: the slot and every PCB MAME declares for it are lowered
// out of src/devices/bus/coleco, instantiated through the generic device
// runtime, and read the way the driver's cart_r reads them. The cartridge is
// synthetic -- each byte is its own low address -- so a misread shows up as a
// wrong value rather than as a zero.

import assert from 'node:assert/strict';
import { indexMameHardware } from '../../mame/hardware.ts';
import { extractColeco } from './extract.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
} from '../../runtime/generated-device.ts';
import { COLECO_MAME_TYPES } from './definition.ts';

const mameSource = process.env.MAME_SRC ??
  new URL('../../../../mame/', import.meta.url).pathname;
const definitions = indexMameHardware(mameSource);
const extraction = extractColeco({
  mameSource,
  entries: COLECO_MAME_TYPES.map(type => ({
    type,
    definition: definitions.get(type),
    methods: [],
  })),
});

assert.ok(extraction, 'the ColecoVision bus must lower');
assert.deepEqual(
  [...extraction.executableTypes].sort(),
  [...COLECO_MAME_TYPES].sort(),
  'both the cartridge slot and the expansion connector must be executable',
);

const slotIr = extraction.artifacts.find(artifact =>
  artifact.path.endsWith('colecovision_cartridge_slot.device.ir.json'));
assert.ok(slotIr);
const slot = JSON.parse(slotIr.contents);

// MAME's slot options, read from colecovision_cartridges rather than restated.
// CART_SLOT_SUPPORT.coleco in src/gen/generate.ts names this same set for the
// console room; keeping the assertion here is what stops the two drifting.
assert.deepEqual(Object.keys(slot.slot.options).sort(), [
  'activision', 'activision_256b', 'activision_32k',
  'megacart', 'sgc_1mbit', 'sgc_2mbit', 'sgc_4mbit',
  'standard', 'xin1',
]);
assert.equal(slot.slot.member, 'm_card');
assert.equal(slot.slot.selector, 'cart.slot');
assert.equal(slot.slot.default, 'standard');
// Image loading is the console room's job; the live bus is what is kept.
assert.ok(slot.methods.some((method: { name: string }) => method.name === 'read'));
assert.ok(slot.methods.some((method: { name: string }) => method.name === 'write'));
assert.ok(!slot.methods.some((method: { name: string }) => method.name === 'call_load'));
// Every PCB binds the region MAME's own rom_alloc names.
for (const [option, card] of Object.entries(slot.slot.options) as [string, {
  resources?: { members?: Record<string, { kind: string; name: string }> };
}][]) {
  assert.equal(
    card.resources?.members?.m_rom?.name,
    'coleco_cart:rom',
    `${option} must read the mounted cartridge`,
  );
  assert.equal(card.resources?.members?.m_rom_size?.kind, 'region-length');
}

/** A cartridge whose every byte is its own low address, one bank number per bank. */
function cartridge(size: number): Uint8Array {
  const rom = new Uint8Array(size);
  for (let index = 0; index < size; index++) rom[index] = index & 0xff;
  for (let bank = 0; bank * 0x4000 < size; bank++) rom[bank * 0x4000] = bank;
  return rom;
}

function mount(option: string, rom: Uint8Array) {
  clearGeneratedDevices();
  registerGeneratedDevice(slot);
  const device = createDevice('COLECOVISION_CARTRIDGE_SLOT', {
    clock: 0,
    regions: { 'coleco_cart:rom': rom },
    selectors: { 'cart.slot': option },
  });
  assert.ok(device, `the ${option} cartridge must compose`);
  return device;
}

// coleco_state::cart_r passes offset with all four chip selects low.
const read = (device: ReturnType<typeof mount>, offset: number): number =>
  Number(device.invoke('read', offset, 0, 0, 0, 0));

// A standard 32K cartridge is a flat window at 0x8000.
{
  const standard = mount('standard', cartridge(0x8000));
  assert.equal(read(standard, 0x0000), 0x00);
  assert.equal(read(standard, 0x0001), 0x01);
  assert.equal(read(standard, 0x1234), 0x34);
  assert.equal(read(standard, 0x7fff), 0xff);
}

// A standard cartridge smaller than the window reads 0xff past its end rather
// than wrapping -- the bus floats there.
{
  const small = mount('standard', cartridge(0x2000));
  assert.equal(read(small, 0x1fff), 0xff);
  assert.equal(read(small, 0x2000), 0xff, 'past the end of a short cartridge the bus floats');
}

// A megacart splits the window: the low half is fixed to the last bank, the
// high half follows whichever bank the final 64 bytes selected.
{
  const mega = mount('megacart', cartridge(0x20000)); // 128K -> 8 banks
  // The bank state belongs to the selected PCB, not to the slot holding it.
  const card = (mega as unknown as {
    slotChild?: { members: Record<string, number> };
  }).slotChild;
  assert.ok(card, 'the slot must instantiate the selected card');
  const members = card.members;
  assert.equal(members.m_bankcount, 8);
  assert.equal(read(mega, 0x0000), 7, 'the low window is fixed to the last bank');

  read(mega, 0x7fc3); // a read in the final 64 bytes selects bank 3
  assert.equal(members.m_activebank, 3);
  assert.equal(read(mega, 0x4000), 3, 'the high window follows the selected bank');
  assert.equal(read(mega, 0x0000), 7, 'and the low window still does not move');

  read(mega, 0x7fc5);
  assert.equal(members.m_activebank, 5);
  assert.equal(read(mega, 0x4000), 5);
}

clearGeneratedDevices();
console.log('coleco.spec: cartridge slot, nine source-declared PCBs and megacart banking passed');
