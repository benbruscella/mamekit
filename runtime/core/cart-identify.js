// Identify a flat cartridge image against a generated softlist catalog.
//
// Most consoles dump a cartridge as one file that is exactly the contents of
// its ROM: ColecoVision, SG-1000, Atari 2600. MAME's software list describes
// the same cartridge as the chips it is physically built from, each with its
// own CRC and load offset within the dataarea. Matching is therefore slicing
// the image where the entry says the chips sit and comparing every CRC.
//
// The NES is the exception this deliberately does not handle: a .nes file is a
// header plus two separate areas, so it has its own reader in nes-ines.ts.
// What both share is the catalog and the idea that CRC is the only evidence --
// the title on a download page plays no part, so this cannot mislabel a dump
// the way name matching does.
import { crc32 } from "./zip.js";
const hex8 = (value) => (value >>> 0).toString(16).padStart(8, '0');
function chipCrc(image, offset, size, memo) {
    const key = `${offset}:${size}`;
    let crc = memo.get(key);
    if (crc === undefined) {
        crc = hex8(crc32(image.subarray(offset, offset + size)));
        memo.set(key, crc);
    }
    return crc;
}
/**
 * Chips of `entry` whose CRC the image reproduces at the declared offset.
 *
 * A chip that runs past the end of the image counts as unmatched rather than
 * throwing, so a truncated dump degrades to a partial match.
 */
function matchedChips(image, entry, memo) {
    let matched = 0;
    for (const rom of entry.prg.roms) {
        const end = rom.offset + rom.size;
        if (end > image.length)
            continue;
        if (chipCrc(image, rom.offset, rom.size, memo) === rom.crc)
            matched++;
    }
    return matched;
}
/**
 * The catalog entry a flat cartridge image is a dump of, or null.
 *
 * A fully verified entry always wins. Failing that the best partial match is
 * returned, which is how a legitimate dump of a title MAME hashed from
 * different chips still gets named -- ColecoVision sets differ from MAME's on
 * the final chip surprisingly often, and every earlier chip still agrees.
 */
export function identifyCartImage(image, catalog) {
    if (!catalog || !image.length)
        return null;
    const memo = new Map();
    let best = null;
    for (const entry of catalog.entries) {
        const total = entry.prg.roms.length;
        if (!total)
            continue;
        const matched = matchedChips(image, entry, memo);
        if (!matched)
            continue;
        if (matched === total)
            return { entry, matched, total, verified: true };
        // Prefer more matching chips; between equals prefer the entry that claims
        // fewer, so a two-chip match is not reported as a third of a six-chip one.
        if (!best || matched > best.matched || (matched === best.matched && total < best.total)) {
            best = { entry, matched, total, verified: false };
        }
    }
    return best;
}
/**
 * Resolve a flat cartridge image the way the console room needs it: which
 * software-list entry it is, which PCB it runs on, and whether this build can
 * play it.
 *
 * The support decision mirrors the NES one exactly -- the board must be
 * implemented, and the title must be on the verified list to earn the tested
 * tier -- so the two consoles grade cartridges by the same rules.
 */
export function resolveFlatCart(image, catalog, support) {
    const match = identifyCartImage(image, catalog);
    const meta = match?.entry;
    // A software list need not name a PCB at all: coleco.xml declares no `slot`
    // feature anywhere, and MAME falls back to the cartridge slot's own default
    // option. Treating an unnamed slot as unsupported would reject every
    // ColecoVision cartridge ever made.
    const slot = (meta?.slot || support.defaultSlot) ?? null;
    const slotOk = slot !== null && support.slots.includes(slot);
    const gameOk = meta !== undefined &&
        (support.games.includes(meta.name) ||
            (meta.cloneof !== undefined && support.games.includes(meta.cloneof)));
    // The verified tier means THIS dump was played end to end, so a dump that
    // reproduces only some of the entry's chips cannot claim it however well
    // known the title is -- it is a different dump, and nobody has run it.
    const exact = match?.verified === true;
    const tier = !slotOk ? 'unsupported' : gameOk && exact ? 'tested' : 'experimental';
    let reason;
    if (tier === 'unsupported') {
        reason = slot ? `${slot} boards are not supported yet` : 'unrecognised cartridge board';
    }
    else if (tier === 'experimental') {
        reason = meta
            ? match?.verified
                ? 'runs on a supported board — not yet verified'
                : 'a different dump of a catalogued title — untested'
            : 'unrecognised dump on a supported board — untested';
    }
    return {
        image: { bytes: image, size: image.length, crc: hex8(crc32(image)) },
        ...(meta ? { meta } : {}),
        identified: meta !== undefined,
        slot,
        // A flat cartridge has no mapper number; the PCB is the whole story.
        mapper: -1,
        approx: match ? !match.verified : false,
        tier,
        playable: tier !== 'unsupported',
        supported: tier === 'tested',
        ...(reason ? { reason } : {}),
    };
}
/**
 * Rebuild a flat cartridge image from the chips a software-list set is packed
 * as, placing each at the offset its catalog entry declares.
 *
 * Chip file names are MAME's, and they do not sort into load order: the
 * ColecoVision set for Motocross Racer is `mtcracera.1` and `mtcracer.2`, so
 * ordering by name puts the second chip first and produces a cartridge that
 * boots into nothing. CRC is the only thing that says where a chip belongs.
 *
 * Returns null when no entry has all of its chips present, which leaves the
 * caller to treat the zip as whatever it is.
 */
export function cartImageFromSoftlistSet(files, catalog) {
    if (!catalog)
        return null;
    const byCrc = new Map();
    for (const bytes of files.values()) {
        if (bytes.length)
            byCrc.set(hex8(crc32(bytes)), bytes);
    }
    if (!byCrc.size)
        return null;
    for (const entry of catalog.entries) {
        const roms = entry.prg.roms;
        if (!roms.length || roms.length !== byCrc.size)
            continue;
        const chips = roms.map(rom => byCrc.get(rom.crc));
        if (chips.some(chip => !chip))
            continue;
        const size = entry.prg.size ||
            roms.reduce((end, rom) => Math.max(end, rom.offset + rom.size), 0);
        const bytes = new Uint8Array(size);
        let placed = true;
        for (const [index, rom] of roms.entries()) {
            const chip = chips[index];
            if (rom.offset + chip.length > size) {
                placed = false;
                break;
            }
            bytes.set(chip, rom.offset);
        }
        if (placed)
            return { bytes, entry };
    }
    return null;
}
