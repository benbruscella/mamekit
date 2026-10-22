// A machine's firmware as a room shows it before anything boots: which sets
// the machine loads, which of them this browser keeps, and what a missing one
// stops -- a C64 without c1541.zip still plays every tape. A host feature
// (ARCHITECTURE.md section 8): the sets, their chips and the slots their cards
// sit in all come from the generated ROM plan; nothing here names a machine.
import { checkRomSet } from "./shell.js";
import { crc32 } from "./zip.js";
/** The set a chip comes from, as the drop screen names it. */
function setOf(spec, load, game) {
    return load.romSet ?? spec.romSet ?? game;
}
/**
 * The machine's firmware sets in the order its ROM plan names them, each with
 * the slot it is limited to and whether `files` holds every dumped chip of
 * it. Every chip, not only the boot-critical ones: a C64's processor region
 * holds nothing, so BASIC and the KERNAL are not "critical", and a set without
 * them is still not a set this machine runs.
 */
export function firmwareSets(roms, game, files, slots) {
    const regions = new Map();
    for (const spec of roms) {
        for (const load of spec.loads) {
            const name = setOf(spec, load, game);
            (regions.get(name) ?? regions.set(name, new Set()).get(name)).add(spec.region);
        }
    }
    const missing = new Set(checkRomSet([...roms], files, new Set()).perFile
        .filter(entry => entry.status === 'missing')
        .map(entry => entry.region));
    return [...regions].map(([name, held]) => {
        const slot = slots.find(candidate => [...held].every(region => region.startsWith(`${candidate}:`)));
        return {
            name,
            ...(slot ? { slot } : {}),
            kept: ![...held].some(region => missing.has(region)),
        };
    });
}
/** Whether a zip's members hold any chip the machine loads: firmware, not software. */
export function holdsFirmware(members, roms) {
    const wanted = new Set(roms.flatMap(spec => spec.loads.flatMap(load => [load.crc, ...(load.alt ?? []).map(alt => alt.crc)].map(crc => crc.toLowerCase()))));
    return [...members.values()].some(bytes => wanted.has(crc32(bytes).toString(16).padStart(8, '0')));
}
