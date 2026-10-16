// Mounting a cartridge on a console board.
//
// The console room works out which dump a visitor holds and the shell boots
// it. Between the two sits one step every console shares: read the dump the
// way the console's own software list says to, then turn it into the regions
// its PCB loads and the board's `cart` selection. It lives here, outside the
// room's DOM, so the acceptance harness boots a contract's cartridge through
// exactly the code a visitor's cartridge goes through.

import { cartImageFromSoftlistSet, resolveFlatCart } from './cart-identify.ts';
import {
  identify,
  inesFromSoftlistSet,
  mountedINesPrg,
  parseINes,
  type ResolvedCart,
  type SoftCatalog,
} from './nes-ines.ts';
import type { ShellConfig } from './shell.ts';
import type { Regions } from './types.ts';

/** iNES mapper number -> the NES cartridge slot option that implements it. */
export const MAPPER_SLOTS: Record<number, string> = {
  0: 'nrom', 1: 'sxrom', 2: 'uxrom', 3: 'cnrom', 4: 'txrom',
};

/** What this console can play, and how its cartridges are read. */
export interface CartSupport {
  slots: string[];
  games: string[];
  mapperSlots?: Record<number, string>;
  /** The NES is the one console whose dumps carry a header and two areas. */
  ines: boolean;
  defaultSlot?: string;
}

/**
 * The console's cartridge support, from its generated config.
 *
 * Which reader applies is the console's own property, taken from the software
 * list's cartridge interface. Sniffing the bytes instead lets parseINes accept
 * a ColecoVision dump whose first bytes happen to pass, and the NES matcher
 * then grades it against a catalog that is not the NES's.
 */
export function cartSupport(cfg: ShellConfig): CartSupport {
  return {
    slots: cfg.cart?.slots ?? [],
    games: cfg.cart?.games ?? [],
    mapperSlots: MAPPER_SLOTS,
    ines: (cfg.cart?.interface ?? 'nes_cart') === 'nes_cart',
    ...(cfg.cart?.defaultSlot ? { defaultSlot: cfg.cart.defaultSlot } : {}),
  };
}

/** Parse and identify one cartridge image against the console's catalog. */
export function resolveCartImage(
  bytes: Uint8Array,
  catalog: SoftCatalog | null,
  support: CartSupport,
): ResolvedCart | null {
  if (!support.ines) return resolveFlatCart(bytes, catalog, support);
  const ines = parseINes(bytes);
  return ines ? identify(ines, catalog, support) : null;
}

/**
 * The cartridge image inside a zip, in the order the room's own drop handling
 * tries: a whole image, else a MAME software-list set of the cart's chips,
 * rebuilt by CRC because chip file names do not sort into load order.
 */
export function cartImageFromZip(
  files: Map<string, Uint8Array>,
  catalog: SoftCatalog | null,
  support: CartSupport,
): Uint8Array | null {
  if (support.ines) {
    for (const bytes of files.values()) if (parseINes(bytes)) return bytes;
    return inesFromSoftlistSet(files, catalog, support.mapperSlots)?.bytes ?? null;
  }
  const set = cartImageFromSoftlistSet(files, catalog);
  if (set) return set.bytes;
  const parts = [...files.values()].filter(bytes => bytes.length > 0);
  return parts.length === 1 ? parts[0]! : null;
}

/**
 * The regions a resolved cartridge mounts into, and the board's `cart`
 * selection. An NES cartridge mounts as the two areas its header describes;
 * every other console's mounts as one image into the region its PCB loads
 * from.
 */
export function mountCart(
  cfg: ShellConfig,
  resolved: ResolvedCart,
): { regions: Regions; cart: NonNullable<ShellConfig['board']['cart']> } | null {
  const regions: Regions = {};
  if (resolved.ines) {
    regions.prg = mountedINesPrg(resolved.ines);
    if (resolved.ines.chr) regions.chr = resolved.ines.chr; // omitted => CHR-RAM cart
    return {
      regions,
      cart: {
        mapper: resolved.mapper,
        mirroring: resolved.ines.mirroring,
        battery: resolved.ines.battery,
      },
    };
  }
  const region = cfg.cart?.romRegion;
  if (!region || !resolved.image) return null;
  regions[region] = resolved.image.bytes;
  return { regions, cart: { ...(resolved.slot ? { slot: resolved.slot } : {}) } };
}
