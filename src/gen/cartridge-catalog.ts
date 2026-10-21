import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { artworkDir } from '../paths.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { cartArtIndex, type CartArt } from './cart-art.ts';

const projectRoot = resolve(import.meta.dirname, '../..');

// Cart-slot options (mappers/PCBs) each runtime board family implements —
// a device-library capability table like CPU_TYPES, not a game fact. The
// softlist catalog carries every cart's slot; the app greys out the rest.
// The NES is not here: its slot mounts and selects its own boards, and every
// one of MAME's that compiles is playable (src/hardware/nes/extract.ts).
export const CART_SLOT_SUPPORT: Record<string, string[]> = {
  // Every PCB src/hardware/coleco lowers from MAME's colecovision_cartridges.
  // coleco.spec.ts asserts this same set against that source list, so the two
  // cannot drift apart silently.
  coleco: [
    'standard', 'megacart', 'xin1',
    'activision', 'activision_256b', 'activision_32k',
    'sgc_1mbit', 'sgc_2mbit', 'sgc_4mbit',
  ],
  // Atari 2600 PCBs whose installer the host address space can replay. All 25
  // lower from MAME's `a2600_cart`; these are the ones whose install_* calls
  // the runtime answers, which is what makes a cartridge playable rather than
  // merely identified. Between them they cover the great majority of the
  // software list: plain 2K/4K carts alone are 1067 of its 1591 entries.
  a2600: ['a26_2k_4k', 'a26_f8', 'a26_f8sw', 'a26_f6', 'a26_f4', 'a26_fa',
    // Verified by booting a real dump of each: the picture animates and
    // keeps animating. a26_dpc is checked harder still -- Pitfall II is
    // pixel-exact against MAME across its attract.
    // a26_dc is still a black screen and stays out until it is not.
    'a26_3f', 'a26_ua', 'a26_fv', 'a26_8in1', 'a26_dpc'],
  // Game Boy cartridge boards whose installer the host address space can
  // replay. All 17 the console's own software list names lower; these are the
  // memory controllers that list actually leans on, and between them they
  // cover 1,594 of its 1,743 entries -- MBC1 alone is 1,469 of them.
  // src/hardware/gameboy/gameboy.spec.ts asserts this set against MAME's own
  // option list, so the two cannot drift apart silently.
  gameboy: ['rom', 'rom_mbc1', 'rom_mbc2', 'rom_mbc3', 'rom_mbc5',
    'rom_huc1', 'rom_mmm01'],
};

export const CART_INTERFACE_BY_FAMILY: Record<string, string> = {
  nes: 'nes_cart',
  coleco: 'coleco_cart',
  gameboy: 'gameboy_cart',
};

// What a cartridge slot does when a software-list entry names no PCB, and
// where a PCB loads its ROM. Both are the slot device's own facts; the NES
// resolves its board from the iNES mapper instead and needs neither.
// src/hardware/coleco/coleco.spec.ts asserts both against MAME source, so
// this table cannot drift away from the device it describes.
export const CART_DEFAULT_SLOT: Record<string, string> = {
  coleco: 'standard',
  // MAME's own fallback, from `vcs_get_slot`'s final return.
  a2600: 'a26_2k_4k',
  // MAME's own answer for a header that declares no memory controller, from
  // `guess_cart_type`; src/hardware/gameboy/extract.ts reads the same value
  // out of source for the slot IR.
  gameboy: 'rom',
};
/**
 * The file extensions a console's cartridge slot accepts, as MAME declares them.
 *
 * `device_image_interface::file_extensions()` is a one-line override in the
 * slot's own header -- "bin,a26" for the VCS, "rom,col,bin" for the
 * ColecoVision, "nes,unf,unif" for the NES. The room used to hardcode the
 * ColecoVision set for every console, which left an Atari `.a26` greyed out in
 * the file picker on the one machine whose dumps are usually named that.
 */
export function cartFileExtensions(
  mameSrc: string,
  deviceTypes: readonly string[],
): string[] | undefined {
  const definitions = indexMameHardware(mameSrc);
  for (const type of deviceTypes) {
    const sourceFile = definitions.get(type)?.sourceFile;
    if (!sourceFile) continue;
    const header = join(mameSrc, sourceFile.replace(/\.cpp$/, '.h'));
    if (!existsSync(header)) continue;
    const listed = /file_extensions\(\)[^{]*\{\s*return\s*"([^"]+)"/
      .exec(readFileSync(header, 'utf8'))?.[1];
    if (listed) return listed.split(',').map(extension => `.${extension.trim()}`);
  }
  return undefined;
}

export const CART_ROM_REGION: Record<string, string> = {
  coleco: 'coleco_cart:rom',
  a2600: 'cartslot:cart:rom',
  // `device_gb_cart_interface::cart_rom_region()` is the slot's own "rom"
  // sub-region; the capability binds the mounted PCB to this same name.
  gameboy: 'cartslot:rom',
};

// Explicitly supported cartridge titles (softlist parent short-names; clones
// of a listed parent count too). Playability is gated on THIS list, not just
// the mapper — titles are added one at a time as they're verified end-to-end
// (user directive 2026-07-07: "support explicit games, not all, so I can
// test"). The full catalog still identifies every cart on the shelf.
//
// Every name here was booted on the generated board for issue #85 and its
// framebuffer read back: each reaches its title or attract screen and keeps
// drawing. Two that did not are deliberately absent — Ninja Gaiden III and
// Tecmo Super Bowl stay black past 1,800 frames.
//
// Each also has to be a title the console room can actually get hold of: a
// verified dump the "⌕ Search" button can fetch, and a cartridge scan.
// `node tools/nes-cart-art.ts --check` is that audit, and it derives its work
// list from this one — so adding a title here is the only edit a new game
// needs.
export const CART_GAME_SUPPORT: Record<string, string[]> = {
  nes: [
    // NROM
    'smb', 'dkong', 'dkongjr', 'dkong3', 'mario', 'iceclimb', 'balonfgt',
    'excitbik', 'kungfu', 'galaga', 'pacman', 'mspacman', 'duckhunt', 'digdug2',
    // CNROM
    'gradius', 'paperboy', 'dkongcl', 'advislnd',
    // UxROM
    'cvania', 'megaman', 'ducktale', 'rygar', 'salamand', 'rbislant', 'paperbo2',
    // MMC1 (SxROM)
    'zelda', 'zelda2', 'metroid', 'megaman2', 'tetris', 'ffant', 'dwarr',
    'bmaster', 'bionicc', 'ddragon', 'kidicars', 'radracer', 'cvania2', 'bublbobl',
    // MMC3 (TxROM)
    'smb2', 'smb3', 'megaman3', 'megaman4', 'megaman5', 'megaman6', 'kirby',
    'batman', 'ddragon2', 'advisln3', 'bublbob2',
  ],
  // Booted on the generated board and their framebuffers read back: each
  // reaches its playfield and keeps drawing, at or above the machine's own
  // 59.92 Hz. `adventure` is the plain 4K case, `asteroid` the F8 bank-switch
  // one, and the rest span the 2K/4K majority of the software list.
  a2600: [
    'adventure', 'pacman', 'pitfall', 'combat', 'spaceinv',
    'breakout', 'frogger', 'defender', 'asteroid',
  ],
};

/**
 * Slim cartridge availability index for the console room.
 *
 * The local dump audit writes _manifest.json beside the set's zips, recording
 * which cartridges are bit-exact matches for their nes.xml entry (verified) and
 * which are not (experimental). That file carries every per-cart hash and runs
 * close to a megabyte; the shelf needs only the bucket key, the softlist short
 * name to join on, and the tier. Emitting the reduction beside the generated
 * machine keeps the room's first paint same-origin and instant instead of
 * pulling the whole manifest from the mirror on every visit.
 *
 * Returns the entry count, or 0 when there is no local audit to reduce.
 */
/**
 * Real cartridge photography for the console room, kept local and gitignored
 * (same copyright treatment as arcade flyers). The naming convention and the
 * scan itself live in gen/cart-art.ts, shared with the dev server so a running
 * server sees art added after generation.
 *
 * The index is baked into config.json because a shelf shows thousands of
 * cartridges: letting the browser probe for art it does not have would mean
 * thousands of 404s per visit on a deployed site.
 */
export function localCartArt(list: string): Record<string, CartArt> {
  return cartArtIndex(join(artworkDir(projectRoot), 'carts', list));
}

export function writeCartShelfIndex(setDir: string, outDir: string, set: string): number {
  const manifestPath = join(setDir, '_manifest.json');
  if (!existsSync(manifestPath)) return 0;
  let manifest: { carts?: unknown[] };
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { carts?: unknown[] };
  } catch {
    console.warn(`  ! ${manifestPath} is not readable JSON — cart shelf index skipped`);
    return 0;
  }
  const carts: { file: string; name?: string; tier: 'verified' | 'experimental' }[] = [];
  for (const raw of manifest.carts ?? []) {
    const cart = raw as { file?: string; target?: string; status?: string; match?: { name?: string } };
    const file = cart.target ?? cart.file;
    if (typeof file !== 'string' || !file.toLowerCase().endsWith('.zip')) continue;
    if (cart.status === 'verified' && cart.match?.name) {
      carts.push({ file, name: cart.match.name, tier: 'verified' });
    } else {
      carts.push({ file, tier: 'experimental' });
    }
  }
  if (!carts.length) return 0;
  // compact on purpose: one line per thousand carts is still ~60 KB
  writeFileSync(join(outDir, 'carts.json'), JSON.stringify({ set, carts }));
  return carts.length;
}

/**
 * The `addrshift` MAME gives a CPU's program space, read from its own
 * `m_program_config("program", endianness, width, bits, shift)`. Zero when the
 * source does not state one.
 */
