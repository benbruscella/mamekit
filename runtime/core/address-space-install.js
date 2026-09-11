// MAME's `address_space` installer API, as a recorder.
//
// Some cartridges are not described by an address map at all: they install
// themselves into the CPU's space when they are mounted, by running their own
// `install_memory_handlers(address_space *)`. The Atari 2600 is the canonical
// case -- every one of its banking schemes is a handful of `install_*` calls,
// and bank switching happens through read taps on ROM addresses rather than
// through anything the driver's map could name.
//
// Rather than restate those maps, the host runs MAME's own installer against
// this object and keeps what it asked for. Nothing here knows what a cartridge
// is: it is the address_space side of the API, and any device that installs
// itself lowers through it.
//
// MAME semantics preserved here:
//   - a later install over the same addresses replaces an earlier one, so the
//     record is ordered and the consumer applies it in order;
//   - `mirror` names address bits that are NOT decoded, so an access folds down
//     with `(address - start) & ~mirror`;
//   - a tap does not answer an access, it observes one (and may alter the data
//     in flight). It layers over whatever else already decodes the window.
/**
 * The `address_space` handed to a device's own installer.
 *
 * Every method mirrors a MAME signature, including the overloads that take an
 * optional mirror before the payload -- `install_rom(start, end, base)` and
 * `install_rom(start, end, mirror, base)` are both real, and only the argument
 * count separates them.
 */
export class RecordingAddressSpace {
    entries = [];
    views = [];
    install_rom(start, end, mirrorOrBytes, maybeBytes) {
        const withMirror = maybeBytes !== undefined;
        const bytes = asBytes(withMirror ? maybeBytes : mirrorOrBytes);
        if (!bytes)
            return;
        this.entries.push({
            kind: 'rom',
            start,
            end,
            mirror: withMirror ? Number(mirrorOrBytes) | 0 : 0,
            bytes,
        });
    }
    /** `install_ram` differs from ROM only in being writable, which the bytes are. */
    install_ram(start, end, mirrorOrBytes, maybeBytes) {
        this.install_rom(start, end, mirrorOrBytes, maybeBytes);
    }
    install_read_bank(start, end, ...rest) {
        this.bank(start, end, rest, true, false);
    }
    install_write_bank(start, end, ...rest) {
        this.bank(start, end, rest, false, true);
    }
    install_readwrite_bank(start, end, ...rest) {
        this.bank(start, end, rest, true, true);
    }
    install_read_handler(start, end, ...rest) {
        this.handler(start, end, rest, 'read');
    }
    install_write_handler(start, end, ...rest) {
        this.handler(start, end, rest, 'write');
    }
    install_readwrite_handler(start, end, ...rest) {
        const mirror = rest.length > 2 ? Number(rest[0]) | 0 : 0;
        const delegates = rest.filter(value => typeof value === 'function');
        if (delegates.length < 2)
            return;
        this.entries.push({
            kind: 'handler',
            start,
            end,
            mirror,
            read: delegates[0],
            write: delegates[1],
        });
    }
    install_read_tap(start, end, name, read) {
        this.tap(start, end, name, read, undefined);
    }
    install_write_tap(start, end, name, write) {
        this.tap(start, end, name, undefined, write);
    }
    install_readwrite_tap(start, end, name, read, write) {
        // MAME's three-callback overload passes the same lambda for both sides when
        // only one is given.
        this.tap(start, end, name, read, write ?? read);
    }
    /**
     * `install_view(start, end, view)`: the device hands back the view object it
     * declared, and installs into `view[n]` afterwards. The view records those
     * installs per entry so the consumer can apply the selected one.
     */
    install_view(start, end, view) {
        const target = view;
        if (!target || typeof target !== 'object')
            return;
        const installed = target.__installedView ?? {
            start,
            end,
            entries: new Map(),
        };
        installed.start = start;
        installed.end = end;
        target.__installedView = installed;
        if (!this.views.includes(installed))
            this.views.push(installed);
    }
    bank(start, end, rest, read, write) {
        const bank = rest.find(value => isBank(value));
        if (!bank)
            return;
        this.entries.push({
            kind: 'bank',
            start,
            end,
            mirror: rest.length > 1 ? Number(rest[0]) | 0 : 0,
            bank,
            read,
            write,
        });
    }
    handler(start, end, rest, side) {
        const delegate = rest.find(value => typeof value === 'function');
        if (!delegate)
            return;
        this.entries.push({
            kind: 'handler',
            start,
            end,
            mirror: rest.length > 1 && typeof rest[0] === 'number' ? rest[0] | 0 : 0,
            ...(side === 'read' ? { read: delegate } : { write: delegate }),
        });
    }
    tap(start, end, name, read, write) {
        this.entries.push({
            kind: 'tap',
            start,
            end,
            name: String(name ?? ''),
            ...(typeof read === 'function' ? { read: read } : {}),
            ...(typeof write === 'function' ? { write: write } : {}),
        });
    }
}
/**
 * A `memory_view` entry proxy: `m_view[1].install_read_bank(...)` records into
 * the view rather than into the space.
 */
export function installedViewEntry(view, entry) {
    const recorder = new RecordingAddressSpace();
    const existing = view.entries.get(entry);
    if (existing)
        recorder.entries.push(...existing);
    view.entries.set(entry, recorder.entries);
    return recorder;
}
function isBank(value) {
    return Boolean(value) && typeof value === 'object' &&
        typeof value.read === 'function' &&
        typeof value.write === 'function';
}
function asBytes(value) {
    if (ArrayBuffer.isView(value) || Array.isArray(value))
        return value;
    // A generated pointer: a byte source plus an offset into it.
    const pointer = value;
    if (pointer && typeof pointer === 'object' && pointer.source !== undefined) {
        const source = asBytes(pointer.source);
        if (!source)
            return undefined;
        const offset = pointer.offset ?? 0;
        return offset ? subview(source, offset) : source;
    }
    return undefined;
}
function subview(source, offset) {
    if (ArrayBuffer.isView(source)) {
        return source.subarray(offset);
    }
    // A plain array reached through an offset is rare enough to copy.
    return Array.from({ length: Math.max(0, source.length - offset) }, (_value, index) => source[offset + index] ?? 0);
}
/**
 * The address the mirror folds an access down to, relative to `start`.
 *
 * MAME's `mirror` names address lines the window does not decode, so those bits
 * are dropped rather than masked into the offset.
 */
export function installedOffset(address, start, mirror) {
    return (address - start) & ~mirror;
}
