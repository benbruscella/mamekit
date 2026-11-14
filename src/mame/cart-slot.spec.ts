// The cartridge slot's facts, read from the slot device in MAME's source.
//
// One reader serves every console: nothing here is keyed by machine or
// family. The four consoles the project plays are held against the values
// MAME's own source states, and consoles the project has never generated are
// read the same way, which is what "the next cart console needs no edit"
// means.

import assert from 'node:assert/strict';
import { cartSlotFacts, machineCartSlot } from './cart-slot.ts';

const mameSource = process.env.MAME_SRC ??
  new URL('../../../mame/', import.meta.url).pathname;

// An absolute region name: the slot's tag does not enter it.
assert.deepEqual(cartSlotFacts(mameSource, 'COLECOVISION_CARTRIDGE_SLOT', 'cartslot'), {
  type: 'COLECOVISION_CARTRIDGE_SLOT',
  interface: 'coleco_cart',
  extensions: ['.rom', '.col', '.bin'],
  defaultOption: 'standard',
  romRegion: 'coleco_cart:rom',
});

// The slot's tag handed to the card and extended: `std::string(tag).append`.
assert.deepEqual(cartSlotFacts(mameSource, 'VCS_CART_SLOT', 'cartslot'), {
  type: 'VCS_CART_SLOT',
  interface: 'a2600_cart',
  extensions: ['.bin', '.a26'],
  defaultOption: 'a26_2k_4k',
  romRegion: 'cartslot:cart:rom',
});
// ...so the region follows wherever the driver mounts the slot.
assert.equal(
  cartSlotFacts(mameSource, 'VCS_CART_SLOT', ':exp:slot')?.romRegion,
  'exp:slot:cart:rom',
);

// The slot's own `subtag("rom")`, and a default named by a constant
// (`slotoptions::GB_STD`) whose string lives in a sibling file.
assert.deepEqual(cartSlotFacts(mameSource, 'GB_CART_SLOT', 'cartslot'), {
  type: 'GB_CART_SLOT',
  interface: 'gameboy_cart',
  extensions: ['.bin', '.gb', '.gbc', '.gbx'],
  defaultOption: 'rom',
  romRegion: 'cartslot:rom',
});

// The NES splits a cartridge into PRG, CHR and misc regions: it has no one
// ROM region, because its slot mounts its own boards.
assert.deepEqual(cartSlotFacts(mameSource, 'NES_CART_SLOT', 'nes_slot'), {
  type: 'NES_CART_SLOT',
  interface: 'nes_cart',
  extensions: ['.nes', '.unf', '.unif'],
  defaultOption: 'nrom',
});

// A console nothing in this project names is read by the same path.
assert.deepEqual(cartSlotFacts(mameSource, 'A78_CART_SLOT', 'cartslot'), {
  type: 'A78_CART_SLOT',
  interface: 'a7800_cart',
  extensions: ['.a78'],
  defaultOption: 'a78_rom',
  romRegion: 'cartslot:cart:rom',
});

// A slot that is not a software-list image device states none of this.
assert.equal(cartSlotFacts(mameSource, 'VCS_CONTROL_PORT', 'joyport1'), undefined);
assert.equal(cartSlotFacts(mameSource, 'NOT_A_DEVICE', 'x'), undefined);

// The machine's cartridge slot is the device that accepts the list's interface.
const a2600 = [
  { type: 'VCS_CONTROL_PORT', tag: 'joyport1' },
  { type: 'VCS_CART_SLOT', tag: 'cartslot' },
];
assert.equal(machineCartSlot(mameSource, a2600, 'a2600_cart')?.type, 'VCS_CART_SLOT');
assert.equal(machineCartSlot(mameSource, a2600)?.type, 'VCS_CART_SLOT');
assert.equal(machineCartSlot(mameSource, a2600, 'nes_cart'), undefined);

console.log('cart-slot spec: ok');
