import assert from 'node:assert/strict';
import { cartImageFromZip, cartSupport, mountCart, resolveCartImage } from './cart-mount.ts';
import type { SoftCatalog, SoftEntry } from './nes-ines.ts';
import type { ShellConfig } from './shell.ts';
import { crc32 } from './zip.ts';

const hex = (bytes: Uint8Array): string => crc32(bytes).toString(16).padStart(8, '0');
const entry = (fields: Partial<SoftEntry> & Pick<SoftEntry, 'name' | 'slot' | 'prg'>): SoftEntry =>
  ({ description: fields.name, year: '1985', publisher: 'fixture', ...fields });
const catalog = (list: string, entries: SoftEntry[]): SoftCatalog => {
  const crcIndex: Record<string, number[]> = {};
  entries.forEach((item, index) => {
    for (const rom of [...item.prg.roms, ...(item.chr?.roms ?? [])]) (crcIndex[rom.crc] ??= []).push(index);
  });
  return { list, description: list, interface: `${list}_cart`, entries, crcIndex };
};
const config = (cart: Record<string, unknown>): ShellConfig =>
  ({ cart: { catalogUrl: 'softlist.json', ...cart } }) as unknown as ShellConfig;

// An NES software-list set is the cart's chips: rebuilt into an iNES image by
// CRC, identified, and mounted as the two areas its header describes.
const prg = new Uint8Array(0x4000).fill(0xea);
prg[0] = 1;
const chr = new Uint8Array(0x2000).fill(0x55);
const nesCatalog = catalog('nes', [entry({
  name: 'fixture', slot: 'nrom', mirroring: 'vertical',
  prg: { size: 0x4000, roms: [{ size: 0x4000, crc: hex(prg), offset: 0 }] },
  chr: { size: 0x2000, roms: [{ size: 0x2000, crc: hex(chr), offset: 0 }] },
})]);
const nesConfig = config({ interface: 'nes_cart', list: 'nes', slots: ['nrom'], games: ['fixture'] });
const nesSupport = cartSupport(nesConfig);
assert.equal(nesSupport.ines, true, 'the NES reads iNES images');
const nesImage = cartImageFromZip(new Map([['fixture.chr', chr], ['fixture.prg', prg]]), nesCatalog, nesSupport);
assert.ok(nesImage, 'a complete chip set rebuilds into an image');
const nes = resolveCartImage(nesImage, nesCatalog, nesSupport);
assert.equal(nes?.meta?.name, 'fixture');
assert.equal(nes?.tier, 'tested');
const nesMount = mountCart(nesConfig, nes!);
assert.equal(nesMount?.regions.prg?.length, 0x8000, 'NROM-128 mounts mirrored into the 32 KiB window');
assert.deepEqual(nesMount?.regions.chr, chr);
assert.deepEqual(nesMount?.cart, { mapper: 0, mirroring: 'vertical', battery: false });
// A zip holding a whole .nes is that image, whatever the catalog says.
assert.equal(cartImageFromZip(new Map([['game.nes', nesImage]]), null, nesSupport), nesImage);

// A flat cartridge's chips are placed by CRC at the offsets their entry
// declares: chip file names do not sort into load order.
const rom = Uint8Array.from({ length: 0x2000 }, (_, index) => (index ^ (index >> 8)) & 0xff);
const [low, high] = [rom.slice(0, 0x1000), rom.slice(0x1000)];
const flatCatalog = catalog('coleco', [entry({
  name: 'flat', slot: '',
  prg: { size: 0x2000, roms: [
    { size: 0x1000, crc: hex(low), offset: 0 },
    { size: 0x1000, crc: hex(high), offset: 0x1000 },
  ] },
})]);
const flatConfig = config({
  interface: 'coleco_cart', list: 'coleco', slots: ['standard'], games: [],
  defaultSlot: 'standard', romRegion: 'coleco_cart:rom',
});
const flatSupport = cartSupport(flatConfig);
assert.equal(flatSupport.ines, false, 'only the NES reads iNES images');
const flatImage = cartImageFromZip(new Map([['flata.1', high], ['flat.2', low]]), flatCatalog, flatSupport);
assert.deepEqual(flatImage, rom);
const flat = resolveCartImage(flatImage!, flatCatalog, flatSupport);
assert.equal(flat?.meta?.name, 'flat');
assert.equal(flat?.slot, 'standard', 'an entry naming no slot takes the slot default');
assert.deepEqual(mountCart(flatConfig, flat!), {
  regions: { 'coleco_cart:rom': rom },
  cart: { slot: 'standard' },
});
// An uncatalogued zip of one image is that image; of two, nothing.
assert.equal(cartImageFromZip(new Map([['game.col', rom]]), null, flatSupport), rom);
assert.equal(cartImageFromZip(new Map([['a.bin', low], ['b.bin', high]]), null, flatSupport), null);
// With no region named for the PCB there is nowhere to mount it.
assert.equal(mountCart(config({ ...flatConfig.cart, romRegion: undefined }), flat!), null);

console.log('cart-mount.spec: NES and flat cartridge sets resolve and mount');
