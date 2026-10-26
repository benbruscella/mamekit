// One-click play (issue #161): a title the software room boots starts itself.
// A host feature (ARCHITECTURE.md section 8), shared by the shell and the
// acceptance harness so the gate drives exactly what the browser does: the
// media slots a title leaves empty, which transport takes which of its
// images, and the start sequence -- its shelf's command typed through the
// natural keyboard once the machine is up, then PLAY on the tape that took it.
// Nothing here names a machine: the slots, formats and command all arrive in
// the generated software shelves.
import { crc32 } from "./zip.js";
/**
 * The media slots a title boots with empty: every mountable shelf's slots but
 * those of the title's own shelf and any attached since. A C64 tape title
 * boots without the 1541, as MAME's `-iec8 ""` does, rather than running the
 * drive's processor in lockstep for nothing; `list` undefined is Power on,
 * which attaches every one.
 */
export function emptyMediaSlots(software, list, attached = []) {
    if (list === undefined)
        return [];
    const shelves = software?.shelves ?? [];
    const slots = [...new Set(shelves.flatMap(shelf => shelf.mountable ? shelf.slots ?? [] : []))];
    const used = new Set([...shelves.find(shelf => shelf.list === list)?.slots ?? [], ...attached]);
    return slots.filter(slot => !used.has(slot));
}
/** A slot left empty takes its card's firmware with it: a tape title must not ask for c1541.zip. */
export function withoutSlotFirmware(roms, emptySlots) {
    return roms.filter(spec => !emptySlots.some(slot => spec.region.startsWith(`${slot}:`)));
}
/**
 * Which of a title's images each transport takes: the first, in the order
 * given, whose formats read it. The result is parallel to `transports`; the
 * first image of each is the one mounted, the rest are the sides offered.
 */
export function claimImages(transports, images) {
    let pending = [...images];
    return transports.map(transport => {
        const mine = pending.filter(image => transport.extensions.includes(image.name.split('.').pop().toLowerCase()));
        pending = pending.filter(image => !mine.includes(image));
        return mine;
    });
}
/**
 * A cartridge set as its slot reads it (BoardConfig.images): every dataarea
 * the list declares, at its declared size, each chip at its offset and again
 * wherever the list reloads it, and the part's features with its `slot`
 * among them -- the card MAME's get_default_card_software would choose.
 * Undefined when a chip is missing.
 */
export function softwarePart(members, entry) {
    const chips = entry.prg.roms.filter(rom => rom.area);
    if (!chips.length)
        return undefined;
    const byCrc = new Map([...members.values()].map(bytes => [crc32(bytes).toString(16).padStart(8, '0'), bytes]));
    const areas = {};
    for (const [name, size] of Object.entries(entry.areas ?? {}))
        areas[name] = new Uint8Array(size);
    for (const rom of chips) {
        const bytes = byCrc.get(rom.crc);
        if (!bytes)
            return undefined;
        // The chip at its offset, then again wherever the list reloads it.
        for (const { offset, size } of [{ offset: rom.offset, size: rom.size }, ...rom.reloads ?? []]) {
            const area = areas[rom.area] ??= new Uint8Array(offset + size);
            area.set(bytes.subarray(0, Math.max(0, Math.min(bytes.length, size, area.length - offset))), offset);
        }
    }
    return { areas, features: { ...entry.features, ...(entry.slot ? { slot: entry.slot } : {}) } };
}
/**
 * A title's start: `delay` seconds of emulated time for the machine to come
 * up, the shelf's command typed, then PLAY pressed when the shelf asks for it.
 * Every step is counted in frames the machine ran, so a fast-forward or a
 * stall changes none of it. `ready` holds the typing back for as long as it
 * says no: a quickload puts the program in memory only when its own delay
 * runs out, and RUN typed before that runs nothing.
 */
export class TitleStart {
    plan;
    typing;
    tape;
    log;
    ready;
    wait;
    typed = false;
    finished = false;
    constructor(plan, refresh, typing, tape, log = () => { }, ready = () => true) {
        this.plan = plan;
        this.typing = typing;
        this.tape = tape;
        this.log = log;
        this.ready = ready;
        this.wait = Math.round(plan.delay * refresh);
    }
    /** Still waiting to type, typing, or about to press PLAY. */
    active() {
        return !this.finished;
    }
    /** Abandon the start, as a reset does; the caller cancels the typing. */
    cancel() {
        this.finished = true;
    }
    /** Called once after every frame the machine ran. */
    advance() {
        if (this.finished)
            return;
        if (this.wait > 0) {
            this.wait--;
            return;
        }
        if (!this.typed) {
            if (!this.ready())
                return;
            this.typing.postCoded(this.plan.command);
            this.typed = true;
            this.log(`typing ${JSON.stringify(this.plan.command)}`);
            return;
        }
        if (this.typing.busy())
            return;
        if (this.plan.play && this.tape && !this.tape.playing())
            this.tape.play();
        this.finished = true;
    }
}
