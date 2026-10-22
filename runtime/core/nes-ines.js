// NES cartridge identification: iNES/NES2.0 header parsing + CRC32 matching
// against the generated softlist catalog (dist/nes/softlist.json, extracted
// from MAME hash/nes.xml). Pure functions — no DOM — so the whole module is
// Node-testable.
//
// A .nes file is header + [trainer] + PRG + CHR concatenated, while softlist
// CRCs are per-CHIP (prg/chr dataareas, possibly multiple chips per area) —
// so matching CRCs the prg/chr slices separately, sub-slicing multi-chip
// dataareas at each chip's declared size.
import { crc32 } from "./zip.js";
/**
 * MAME's iNES loader expands NROM-128's single 16 KiB PRG chip to the 32 KiB
 * CPU window before the cartridge interface configures its four 8 KiB banks.
 * Keep `ines.prg` untouched for CRC identification, but mount this image.
 */
export function mountedINesPrg(ines) {
    if (ines.prg.length !== 0x4000)
        return ines.prg;
    const mounted = new Uint8Array(0x8000);
    mounted.set(ines.prg, 0);
    mounted.set(ines.prg, 0x4000);
    return mounted;
}
/** Parse a 16-byte-header iNES / NES 2.0 file. Returns null when it isn't one. */
export function parseINes(bytes) {
    if (bytes.length < 16)
        return null;
    if (bytes[0] !== 0x4e || bytes[1] !== 0x45 || bytes[2] !== 0x53 || bytes[3] !== 0x1a)
        return null;
    const nes2 = (bytes[7] & 0x0c) === 0x08;
    // NES 2.0 counts banks with byte 9's nibbles as the high bits (an exponent
    // form, nibble 0xf, is left unread: no rebuilt set uses it).
    const prgSize = (bytes[4] | (nes2 && (bytes[9] & 0x0f) !== 0x0f ? (bytes[9] & 0x0f) << 8 : 0)) * 0x4000;
    const chrSize = (bytes[5] | (nes2 && (bytes[9] >> 4) !== 0x0f ? (bytes[9] >> 4) << 8 : 0)) * 0x2000;
    if (prgSize === 0)
        return null;
    // dirty-header guard: pre-NES2.0 dumps often carry "DiskDude!" garbage in
    // bytes 7-15 — when any of bytes 12-15 are nonzero, trust only the low nibble
    const dirty = !nes2 && (bytes[12] | bytes[13] | bytes[14] | bytes[15]) !== 0;
    let mapper = bytes[6] >> 4;
    if (!dirty)
        mapper |= bytes[7] & 0xf0;
    if (nes2)
        mapper |= (bytes[8] & 0x0f) << 8;
    const trainer = (bytes[6] & 0x04) !== 0;
    const dataStart = 16 + (trainer ? 512 : 0);
    if (dataStart + prgSize + chrSize > bytes.length)
        return null;
    const fourScreen = (bytes[6] & 0x08) !== 0;
    return {
        mapper,
        prgSize,
        chrSize,
        mirroring: fourScreen ? 'four' : bytes[6] & 0x01 ? 'vertical' : 'horizontal',
        battery: (bytes[6] & 0x02) !== 0,
        trainer,
        nes2,
        prg: bytes.subarray(dataStart, dataStart + prgSize),
        chr: chrSize ? bytes.subarray(dataStart + prgSize, dataStart + prgSize + chrSize) : null,
        file: bytes,
    };
}
const hex8 = (n) => n.toString(16).padStart(8, '0');
/** distinct first-prg-chip sizes in a catalog, cached per catalog object */
const sizesCache = new WeakMap();
function firstChipSizes(catalog) {
    let sizes = sizesCache.get(catalog);
    if (!sizes) {
        const set = new Set();
        for (const e of catalog.entries)
            if (e.prg.roms[0])
                set.add(e.prg.roms[0].size);
        sizes = [...set];
        sizesCache.set(catalog, sizes);
    }
    return sizes;
}
/**
 * An area's chips found in a byte slice, by CRC, or null.
 *
 * A dump holds an area in one of two shapes: its chips one after another, as
 * a `.nes` file carries them, or laid out as MAME loads the area -- each chip
 * at its declared offset, in an area of the declared size padded to whole
 * banks -- which is how a set with gaps or an odd size is rebuilt.
 */
function areaChips(area, bytes, bank) {
    if (!area.roms.length)
        return null;
    const inRow = [];
    let off = 0;
    for (const rom of area.roms) {
        if (off + rom.size > bytes.length)
            break;
        const chip = bytes.subarray(off, off + rom.size);
        if (hex8(crc32(chip)) !== rom.crc)
            break;
        inRow.push(chip);
        off += rom.size;
    }
    if (inRow.length === area.roms.length && off === bytes.length)
        return inRow;
    if (bytes.length !== Math.ceil(area.size / bank) * bank)
        return null;
    const laidOut = [];
    for (const rom of area.roms) {
        const chip = bytes.subarray(rom.offset, rom.offset + rom.size);
        if (chip.length !== rom.size || hex8(crc32(chip)) !== rom.crc)
            return null;
        laidOut.push(chip);
    }
    return laidOut;
}
function areaMatches(area, bytes, bank) {
    return areaChips(area, bytes, bank) !== null;
}
/**
 * An area as MAME's software-list loader builds it: the declared size, every
 * fill, each chip at its offset and again wherever the list reloads it.
 */
function loadArea(area, chips) {
    const out = new Uint8Array(area.size);
    for (const fill of area.fills ?? [])
        out.fill(fill.value, fill.offset, Math.min(area.size, fill.offset + fill.size));
    area.roms.forEach((rom, index) => {
        const chip = chips[index];
        for (const { offset, size } of [{ offset: rom.offset, size: rom.size }, ...rom.reloads ?? []]) {
            out.set(chip.subarray(0, Math.max(0, Math.min(chip.length, size, area.size - offset))), offset);
        }
    });
    return out;
}
/**
 * Identify a parsed cart against the catalog + the machine's capability lists
 * (config.cart.slots = implemented mappers, config.cart.games = explicitly
 * verified titles; an entry counts when its name OR its parent is listed).
 */
export function identify(ines, catalog, support) {
    const prgCrc = hex8(crc32(ines.prg));
    const chrCrc = ines.chr ? hex8(crc32(ines.chr)) : null;
    let meta;
    let approx = false;
    if (catalog) {
        // candidates via the first-chip index: CRC the prg PREFIX at each distinct
        // first-chip size in the catalog (a handful: 16K/32K/128K/...), look each
        // prefix crc up, then verify every remaining chip slice
        const candidates = new Set();
        for (const size of firstChipSizes(catalog)) {
            if (size > ines.prg.length)
                continue;
            const prefixCrc = size === ines.prg.length ? prgCrc : hex8(crc32(ines.prg.subarray(0, size)));
            for (const idx of catalog.crcIndex[prefixCrc] ?? []) {
                if (catalog.entries[idx].prg.roms[0]?.size === size)
                    candidates.add(idx);
            }
        }
        let best;
        for (const idx of candidates) {
            const entry = catalog.entries[idx];
            if (!areaMatches(entry.prg, ines.prg, 0x4000))
                continue;
            const chrOk = entry.chr && entry.chr.roms.length
                ? ines.chr !== null && areaMatches(entry.chr, ines.chr, 0x2000)
                : ines.chr === null || !entry.chr;
            if (chrOk) {
                best = { entry, exact: true };
                break;
            }
            best ??= { entry, exact: false }; // prg matches, chr differs — approx
        }
        if (best) {
            meta = best.entry;
            approx = !best.exact;
        }
    }
    // A catalogued cartridge runs on the board its entry names, as MAME's
    // software_get_default_slot reads it; anything else on the board the
    // slot's own code picks from the header (get_default_card_ines).
    const slot = (meta && !approx ? meta.slot : undefined)
        ?? support.slotForImage?.('cartridge.nes', ines.file)
        ?? meta?.slot
        ?? null;
    const slotOk = slot !== null && support.slots.includes(slot);
    const gameOk = meta !== undefined &&
        (support.games.includes(meta.name) || (meta.cloneof !== undefined && support.games.includes(meta.cloneof)));
    const tier = !slotOk ? 'unsupported' : gameOk ? 'tested' : 'experimental';
    const playable = tier !== 'unsupported';
    const supported = tier === 'tested';
    let reason;
    if (tier === 'unsupported') {
        const why = slot ? support.unsupported?.[slot] : undefined;
        reason = !slot ? `iNES mapper ${ines.mapper} is not a board MAME knows`
            : why ? `board ${slot} does not build: ${why}`
                : `board ${slot} not yet supported`;
    }
    else if (tier === 'experimental') {
        reason = meta ? 'runs on a supported board — not yet verified' : 'unrecognized dump on a supported board — untested';
    }
    return { ines, meta, identified: meta !== undefined, slot, mapper: ines.mapper, approx, tier, playable, supported, reason, prgCrc, chrCrc };
}
/**
 * A catalogued NES cartridge as the software-list part `mame nes <name>`
 * mounts: each dataarea call_load_pcb asks for by name, at the size the list
 * declares, and the part's features with `slot`, `pcb` and `mirroring` among
 * them. The RAM areas (`vram`, `wram`, `bwram`) are sizes only.
 */
export function inesSoftwarePart(ines, entry) {
    // Each area as MAME loads it, whichever shape the dump held it in: a 16 KB
    // NROM-128 PRG is reloaded to fill its 32 KB area, and call_load_pcb stops
    // on a PRG area under 32 KB.
    const prgChips = areaChips(entry.prg, ines.prg, 0x4000);
    const areas = { prg: prgChips ? loadArea(entry.prg, prgChips) : ines.prg };
    const chrChips = entry.chr && ines.chr ? areaChips(entry.chr, ines.chr, 0x2000) : null;
    if (ines.chr)
        areas.chr = chrChips ? loadArea(entry.chr, chrChips) : ines.chr;
    if (entry.vram)
        areas.vram = new Uint8Array(entry.vram);
    if (entry.wram)
        areas.wram = new Uint8Array(entry.wram);
    if (entry.bwram)
        areas.bwram = new Uint8Array(entry.bwram);
    return {
        areas,
        features: {
            ...entry.features,
            slot: entry.slot,
            ...(entry.pcb ? { pcb: entry.pcb } : {}),
            ...(entry.mirroring ? { mirroring: entry.mirroring } : {}),
        },
    };
}
// --- MAME software-list cartridge sets -------------------------------------------
//
// A softlist zip holds the cart's CHIPS, named as nes.xml names them
// ("hvc-ma-0 prg", "hvc-ma-0 chr"), with no iNES header anywhere. That is what
// `mame nes <name>` requires, so it is how the verified sets are packed.
//
// Rather than teach every consumer about headerless carts, the set is turned
// back into a canonical iNES image: the header is rebuilt from the softlist
// facts (the mapper MAME's tables give the slot, mirroring and battery from
// the entry), and the chips are concatenated in offset order. Identification
// and the cart store stay unchanged; a catalogued cartridge is still mounted
// as its software-list part (inesSoftwarePart), never through this header.
/**
 * One dataarea's chips from a crc-keyed pool as an iNES area: one after
 * another where that is a whole number of banks, as a `.nes` dump has them,
 * else laid out as MAME loads them and padded to whole banks -- Super Mario
 * Bros. 2's FDS conversions leave a hole between their chips. Null if a chip
 * is absent.
 */
function assembleArea(area, byCrc, bank) {
    if (!area?.roms.length)
        return null;
    const chips = [];
    for (const rom of area.roms) {
        const bytes = byCrc.get(rom.crc);
        if (!bytes || bytes.length !== rom.size)
            return null;
        chips.push(bytes);
    }
    const total = chips.reduce((sum, chip) => sum + chip.length, 0);
    if (total % bank === 0 && area.roms.every((rom, index) => rom.offset === area.roms.slice(0, index).reduce((sum, earlier) => sum + earlier.size, 0))) {
        const out = new Uint8Array(total);
        let off = 0;
        for (const chip of chips) {
            out.set(chip, off);
            off += chip.length;
        }
        return out;
    }
    const loaded = loadArea(area, chips);
    const padded = new Uint8Array(Math.ceil(loaded.length / bank) * bank);
    padded.set(loaded);
    return padded;
}
/**
 * Rebuild an iNES image from a MAME software-list cartridge zip.
 *
 * Chips are matched by CRC, never by filename: nes.xml chip labels are not
 * reproducible from a dump, and a CRC match is exact. Returns null when the
 * zip is not a recognised complete set, which is the signal to fall back to
 * treating its entries as whole .nes files.
 */
export function inesFromSoftlistSet(files, catalog) {
    if (!catalog)
        return null;
    const byCrc = new Map();
    for (const bytes of files.values()) {
        if (bytes.length)
            byCrc.set(hex8(crc32(bytes)), bytes);
    }
    if (!byCrc.size)
        return null;
    const candidates = new Set();
    for (const crc of byCrc.keys()) {
        for (const idx of catalog.crcIndex[crc] ?? [])
            candidates.add(idx);
    }
    for (const idx of candidates) {
        const entry = catalog.entries[idx];
        const prg = assembleArea(entry.prg, byCrc, 0x4000);
        if (!prg)
            continue;
        const chr = assembleArea(entry.chr, byCrc, 0x2000);
        // an entry with a chr dataarea whose chips are missing is an incomplete set
        if (entry.chr?.roms.length && !chr)
            continue;
        const prgBanks = prg.length / 0x4000;
        const chrBanks = chr ? chr.length / 0x2000 : 0;
        // NES 2.0 carries a bank count past 255 in byte 9 (an 8 MB multicart).
        if (prgBanks > 0xfff || chrBanks > 0xfff)
            continue;
        const nes2 = prgBanks > 0xff || chrBanks > 0xff;
        const mapper = entry.mapper ?? 0;
        const header = new Uint8Array(16);
        header[0] = 0x4e;
        header[1] = 0x45;
        header[2] = 0x53;
        header[3] = 0x1a;
        header[4] = prgBanks & 0xff;
        header[5] = chrBanks & 0xff;
        header[6] = ((mapper & 0x0f) << 4)
            | (entry.mirroring === 'vertical' ? 0x01 : 0)
            | (entry.bwram ? 0x02 : 0)
            | (entry.mirroring === 'four' || entry.mirroring === '4screen' ? 0x08 : 0);
        header[7] = (mapper & 0xf0) | (nes2 ? 0x08 : 0);
        if (nes2) {
            header[8] = (mapper >> 8) & 0x0f;
            header[9] = ((chrBanks >> 8) << 4) | (prgBanks >> 8);
        }
        const bytes = new Uint8Array(16 + prg.length + (chr?.length ?? 0));
        bytes.set(header, 0);
        bytes.set(prg, 16);
        if (chr)
            bytes.set(chr, 16 + prg.length);
        return { bytes, entry };
    }
    return null;
}
