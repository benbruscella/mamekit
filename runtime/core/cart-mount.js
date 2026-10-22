// Mounting a cartridge on a console board.
//
// The console room works out which dump a visitor holds and the shell boots
// it. Between the two sits one step every console shares: read the dump the
// way the console's own software list says to, then turn it into the regions
// its PCB loads and the board's `cart` selection. It lives here, outside the
// room's DOM, so the acceptance harness boots a contract's cartridge through
// exactly the code a visitor's cartridge goes through.
import { cartImageFromSoftlistSet, resolveFlatCart } from "./cart-identify.js";
import { identify, inesFromSoftlistSet, inesSoftwarePart, mountedINesPrg, parseINes, } from "./nes-ines.js";
import { generatedDeviceDefinition, slotCardForImage } from "./generated-device.js";
import { peripheralCards } from "./input.js";
/**
 * The console's cartridge support, from its generated config.
 *
 * Which reader applies is the console's own property, taken from the software
 * list's cartridge interface. Sniffing the bytes instead lets parseINes accept
 * a ColecoVision dump whose first bytes happen to pass, and the NES matcher
 * then grades it against a catalog that is not the NES's.
 *
 * A slot that mounts its own cartridges (`slotDevice`) is asked directly:
 * the boards it plays are the cards it was generated with, and which board an
 * uncatalogued dump needs is what its own get_default_card_software answers.
 */
export function cartSupport(cfg, 
/**
 * Where the generated slot device is registered: this module's own runtime
 * in the browser; the acceptance harness hands in the copy it loaded from
 * dist, which is the one its registry filled.
 */
devices = { generatedDeviceDefinition, slotCardForImage }) {
    const device = cfg.cart?.slotDevice;
    const slot = device ? devices.generatedDeviceDefinition(device.type)?.slot : undefined;
    return {
        slots: cfg.cart?.slots ?? Object.keys(slot?.cards ?? slot?.options ?? {}),
        games: cfg.cart?.games ?? [],
        ines: (cfg.cart?.interface ?? 'nes_cart') === 'nes_cart',
        ...(cfg.cart?.defaultSlot ? { defaultSlot: cfg.cart.defaultSlot } : {}),
        ...(slot?.unsupported ? { unsupported: slot.unsupported } : {}),
        ...(device && slot
            ? { slotForImage: (name, bytes) => devices.slotCardForImage(device.type, { name, bytes }) }
            : {}),
    };
}
/** Parse and identify one cartridge image against the console's catalog. */
export function resolveCartImage(bytes, catalog, support) {
    if (!support.ines)
        return resolveFlatCart(bytes, catalog, support);
    const ines = parseINes(bytes);
    return ines ? identify(ines, catalog, support) : null;
}
/**
 * The cartridge image inside a zip, in the order the room's own drop handling
 * tries: a whole image, else a MAME software-list set of the cart's chips,
 * rebuilt by CRC because chip file names do not sort into load order.
 */
export function cartImageFromZip(files, catalog, support) {
    if (support.ines) {
        for (const bytes of files.values())
            if (parseINes(bytes))
                return bytes;
        return inesFromSoftlistSet(files, catalog)?.bytes ?? null;
    }
    const set = cartImageFromSoftlistSet(files, catalog);
    if (set)
        return set.bytes;
    const parts = [...files.values()].filter(bytes => bytes.length > 0);
    return parts.length === 1 ? parts[0] : null;
}
/**
 * What a resolved cartridge mounts as: the regions its PCB loads, and the
 * board's `cart` selection; or, for a slot that mounts its own cartridges,
 * the image handed to it.
 *
 * A catalogued NES cartridge goes in as its software-list part, which is what
 * `mame nes <name>` mounts: call_load_pcb reads the board's features from it
 * (a VRC4's address-line wiring, an MMC1's revision, a Namco 163's volume).
 * Anything else goes in as the file it is, for call_load_ines to read.
 */
export function mountCart(cfg, resolved) {
    const regions = {};
    const device = cfg.cart?.slotDevice;
    if (resolved.ines && device) {
        const entry = resolved.meta;
        const image = entry && !resolved.approx
            ? { name: entry.name, software: inesSoftwarePart(resolved.ines, entry) }
            : { name: 'cartridge.nes', bytes: resolved.ines.file };
        // Duck Hunt asks for the Zapper, Arkanoid for the Vaus: the room fits
        // the controller as MAME's `-ctrl2 zapper` would.
        const peripherals = entry?.features?.peripheral?.split(',').map(name => name.trim()).filter(Boolean) ?? [];
        const slotCards = peripheralCards(cfg.bindings ?? [], peripherals);
        return {
            regions, cart: {}, images: { [device.tag]: image },
            ...(Object.keys(slotCards).length ? { slotCards } : {}),
        };
    }
    if (resolved.ines) {
        regions.prg = mountedINesPrg(resolved.ines);
        if (resolved.ines.chr)
            regions.chr = resolved.ines.chr; // omitted => CHR-RAM cart
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
    if (!region || !resolved.image)
        return null;
    regions[region] = resolved.image.bytes;
    return { regions, cart: { ...(resolved.slot ? { slot: resolved.slot } : {}) } };
}
