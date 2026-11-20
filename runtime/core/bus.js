// Generic Z80 memory bus built from generated address-range descriptors.
// Dispatch is a flat 64k handler-id table + handler arrays — one indexed load
// and one call per access, fast enough for ~10M accesses/sec with headroom.
// address_space::m_unmap defaults to zero in MAME. Drivers that call
// unmap_value_high must carry that choice explicitly in generated IR rather
// than making every NOP/unmapped range read high.
const OPEN_BUS = 0x00;
/** Convert a native MAME space address to the byte-indexed backing bus. */
export function byteAddress(address, addressShift = 0) {
    if (!Number.isInteger(addressShift))
        throw new Error('address shift must be an integer');
    if (addressShift < 0)
        return Math.floor(address / 2 ** -addressShift);
    return address * 2 ** addressShift;
}
function wordReadHandler(handler, littleEndian = false) {
    return (address, offset) => {
        const lowByte = littleEndian ? (address & 1) === 0 : (address & 1) !== 0;
        const value = handler(address, offset >>> 1, lowByte ? 0x00ff : 0xff00) & 0xffff;
        return lowByte ? value & 0xff : value >>> 8;
    };
}
function wordWriteHandler(handler, littleEndian = false) {
    return (address, offset, data) => {
        const lowByte = littleEndian ? (address & 1) === 0 : (address & 1) !== 0;
        if (lowByte)
            handler(address, offset >>> 1, data & 0xff, 0x00ff);
        else
            handler(address, offset >>> 1, (data & 0xff) << 8, 0xff00);
    };
}
// MAME `.umask16(0xff00)` / `.umask16(0x00ff)`: an 8-bit device wired to one
// byte lane of a 16-bit bus. It answers only on its own lane, its handler
// offset counts whole words, and the byte reaches it right-justified — MAME's
// unitmask machinery does that shift, so the generated device method never
// sees the lane it happens to sit on. Without this, a byte written to the
// high lane arrives as `data << 8` and truncates to zero inside the device.
const HIGH_BYTE_LANE = 0xff00;
const LOW_BYTE_LANE = 0x00ff;
/** True when `umask` selects exactly one byte lane of a 16-bit bus. */
function isByteLane(umask) {
    return umask === HIGH_BYTE_LANE || umask === LOW_BYTE_LANE;
}
function byteLane(umask, littleEndian) {
    if (littleEndian)
        return umask === LOW_BYTE_LANE ? 0 : 1;
    return umask === HIGH_BYTE_LANE ? 0 : 1;
}
function laneReadHandler(handler, umask, littleEndian = false) {
    const lane = byteLane(umask, littleEndian);
    return (address, offset) => (address & 1) === lane ? handler(address, offset >>> 1) & 0xff : OPEN_BUS;
}
function laneWordReadHandler(handler, umask, littleEndian = false) {
    const shift = byteLane(umask, littleEndian) === 0 ? 8 : 0;
    // Nothing is wired to the other lane, so it reads as unmapped space.
    const idle = umask === HIGH_BYTE_LANE ? OPEN_BUS : OPEN_BUS << 8;
    return (address, offset) => ((handler(address, offset >>> 1) & 0xff) << shift) | idle;
}
// The byte reaches a lane handler right-justified, so the mem_mask it is
// handed describes those eight delivered bits — not the bus lane they came
// from. Handing it the lane instead would make the u8 width adapter in
// generated-board shift a byte that is already in place.
const LANE_MEM_MASK = 0xff;
function laneWriteHandler(handler, umask, littleEndian = false) {
    const lane = byteLane(umask, littleEndian);
    return (address, offset, data) => {
        if ((address & 1) === lane)
            handler(address, offset >>> 1, data & 0xff, LANE_MEM_MASK);
    };
}
function laneWordWriteHandler(handler, umask, littleEndian = false) {
    const shift = byteLane(umask, littleEndian) === 0 ? 8 : 0;
    return (address, offset, data) => handler(address, offset >>> 1, (data >>> shift) & 0xff, LANE_MEM_MASK);
}
export class Bus {
    readId = new Uint8Array(0x10000);
    writeId = new Uint8Array(0x10000);
    highReadId = new Map();
    highWriteId = new Map();
    highReadBase = new Map();
    highWriteBase = new Map();
    readFns = [() => OPEN_BUS];
    writeFns = [() => { }];
    wordReadFns = [];
    wordWriteFns = [];
    /** Byte-lane handler ranges by their address span, to compose the two lanes of one span. */
    laneRanges = new Map();
    /**
     * The decode arrays of the last page each direction touched.
     *
     * A processor whose whole space lies above 0xffff (the TMS34010) decodes
     * every access through these maps, and consecutive accesses nearly always
     * share a page.
     */
    lastReadPage = -1;
    lastReadIds;
    lastReadBases;
    lastWritePage = -1;
    lastWriteIds;
    lastWriteBases;
    base = new Uint32Array(0x10000); // range base addr per address (for offset calc)
    viewMappings = [];
    activeViews = new Map();
    baseReadId;
    baseWriteId;
    baseAddresses;
    addressMask;
    /** shared RAM blocks by tag, so the machine/video can alias them */
    shares;
    /** RAM ranges no share names, in map order: reachable only here, so a save state takes them from here. */
    ram = [];
    /** Optional board-provided AS_OPCODES read path. */
    readOpcode;
    /**
     * MAME `address_space::install_readwrite_tap`.
     *
     * A tap observes an access without answering it. Protection hardware such
     * as the Atari slapstic decodes nothing but the sequence of addresses the
     * CPU touches, so it is invisible to the address map and has to watch the
     * space itself. A word access fires one tap, as it does in MAME, rather
     * than one per byte lane.
     */
    accessTaps = [];
    tapDepth = 0;
    installAccessTap(tap) {
        this.accessTaps.push(tap);
    }
    tap(address, write) {
        if (this.tapDepth)
            return;
        this.tapDepth++;
        for (const tap of this.accessTaps)
            tap(address, write);
        this.tapDepth--;
    }
    /** The address mask a space with these ranges decodes through. */
    static addressMaskOf(ranges) {
        const highest = Math.max(0, ...ranges.map(range => Math.max(range.end, range.mirror ?? 0)));
        // A bit-addressed TMS34010 space reaches byte 0x1fffffff once scaled.
        return highest > 0xffffff ? 0x1fffffff : highest > 0xffff ? 0xffffff : 0xffff;
    }
    /** MAME `address_space::addrmask()`. */
    addrmask() {
        return this.addressMask;
    }
    constructor(ranges, rom, registry, shares = {}, dataWidth = 8, regions, endianness = 'big', 
    /** MAME `unmap_value_high()`: unmapped bytes read as 0xff. */
    unmapHigh = false) {
        this.shares = shares;
        if (unmapHigh)
            this.readFns[0] = () => 0xff;
        this.addressMask = Bus.addressMaskOf(ranges);
        this.mapping = { rom, registry, dataWidth, regions, endianness };
        for (const r of ranges)
            this.mapRange(r);
        this.baseReadId = this.readId.slice();
        this.baseWriteId = this.writeId.slice();
        this.baseAddresses = this.base.slice();
        this.rebuildViews();
    }
    /** What the constructor was given, which an install maps its ranges with. */
    mapping;
    /**
     * MAME `address_space::install_*` after the space is built: the driver's
     * machine_start choosing which input handler answers a window (Neo Geo's
     * `in0_edge_joy_r` when a control port is fitted). A later install wins over
     * whatever already decoded those addresses, as in MAME; `unmap` leaves
     * them open.
     */
    install(ranges, unmap) {
        // Under the selected views: the install changes what lies beneath them.
        this.readId.set(this.baseReadId);
        this.writeId.set(this.baseWriteId);
        this.base.set(this.baseAddresses);
        if (unmap)
            this.unmapRange(unmap);
        for (const r of ranges)
            this.mapRange(r);
        this.baseReadId = this.readId.slice();
        this.baseWriteId = this.writeId.slice();
        this.baseAddresses = this.base.slice();
        this.lastReadPage = -1;
        this.lastWritePage = -1;
        this.rebuildViews();
    }
    unmapRange(range) {
        for (let m = 0;; m = (m - range.mirror) & range.mirror) {
            for (let a = range.start; a <= range.end; a++) {
                const ea = (a | m) & this.addressMask;
                if (ea <= 0xffff) {
                    if (range.read)
                        this.readId[ea] = 0;
                    if (range.write)
                        this.writeId[ea] = 0;
                    continue;
                }
                const page = ea >>> 12;
                if (range.read) {
                    const ids = this.highReadId.get(page);
                    if (ids)
                        ids[ea & 0xfff] = 0;
                }
                if (range.write) {
                    const ids = this.highWriteId.get(page);
                    if (ids)
                        ids[ea & 0xfff] = 0;
                }
            }
            if (range.mirror === 0 || m === range.mirror)
                break;
        }
    }
    mapRange(r) {
        const { rom, registry, dataWidth, regions, endianness } = this.mapping;
        const size = r.end - r.start + 1;
        let read = null;
        let write = null;
        let wordRead = null;
        let wordWrite = null;
        // A byte-lane device is wired to one half of the bus. A full-width byte
        // handler is different: both lanes reach consecutive device offsets,
        // as with the K051960's byte-addressed sprite RAM on a 68000.
        const lane = dataWidth === 16 && isByteLane(r.umask) ? r.umask : undefined;
        const byteHandler = dataWidth === 16 && r.handlerWidth === 8;
        const littleEndian = dataWidth === 16 && endianness === 'little';
        // A bank window is storage, so its handler is byte-addressed at every
        // bus width, exactly like the rom and ram ranges beside it. Only a MAME
        // device handler is native to the bus and indexed by word.
        const adaptRead = (h) => r.bank ? h
            : lane !== undefined ? laneReadHandler(h, lane, littleEndian)
                : byteHandler ? h
                    : dataWidth === 16 ? wordReadHandler(h, littleEndian)
                        : h;
        const adaptWordRead = (h) => r.bank ? (dataWidth === 16 ? (a, off) => ((h(a, off) << 8) | h(a, off + 1)) & 0xffff : null)
            : lane !== undefined ? laneWordReadHandler(h, lane, littleEndian)
                : byteHandler ? (a, off) => ((h(a, off) << 8) | h(a, off + 1)) & 0xffff
                    : dataWidth === 16 ? (a, off) => {
                        const value = h(a, off >>> 1, 0xffff) & 0xffff;
                        return littleEndian ? ((value & 0xff) << 8) | (value >>> 8) : value;
                    }
                        : null;
        const adaptWrite = (h) => r.bank ? h
            : lane !== undefined ? laneWriteHandler(h, lane, littleEndian)
                : byteHandler ? h
                    : dataWidth === 16 ? wordWriteHandler(h, littleEndian)
                        : h;
        const adaptWordWrite = (h) => r.bank
            ? (dataWidth === 16
                ? (a, off, data) => {
                    h(a, off, (data >>> 8) & 0xff, 0xffff);
                    h(a, off + 1, data & 0xff, 0xffff);
                }
                : null)
            : lane !== undefined ? laneWordWriteHandler(h, lane, littleEndian)
                : byteHandler ? (a, off, data) => {
                    h(a, off, (data >>> 8) & 0xff, LANE_MEM_MASK);
                    h(a + 1, off + 1, data & 0xff, LANE_MEM_MASK);
                }
                    : dataWidth === 16 ? (a, off, data) => {
                        const value = littleEndian
                            ? ((data & 0xff) << 8) | ((data >>> 8) & 0xff)
                            : data;
                        h(a, off >>> 1, value & 0xffff, 0xffff);
                    }
                        : null;
        if (r.kind === 'rom') {
            const rangeRom = r.bytes ?? (r.region ? regions?.[r.region] : rom);
            if (!rangeRom)
                throw new Error(`missing ROM region: ${r.region}`);
            // offset-based so mirror images read the same region bytes
            read = (_a, off) => rangeRom[(r.romOffset ?? r.start) + off];
        }
        else if (r.kind === 'ram') {
            const bytes = r.share
                ? (this.shares[r.share] ??= new Uint8Array(size))
                : new Uint8Array(size);
            if (!r.share)
                this.ram.push(bytes);
            if (dataWidth === 16) {
                const words = new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1);
                read = (_a, off) => littleEndian
                    ? (off & 1 ? words[off >>> 1] >>> 8 : words[off >>> 1] & 0xff)
                    : (off & 1 ? words[off >>> 1] & 0xff : words[off >>> 1] >>> 8);
                write = (_a, off, d) => {
                    const index = off >>> 1;
                    words[index] = littleEndian
                        ? (off & 1
                            ? (words[index] & 0x00ff) | ((d & 0xff) << 8)
                            : (words[index] & 0xff00) | (d & 0xff))
                        : (off & 1
                            ? (words[index] & 0xff00) | (d & 0xff)
                            : (words[index] & 0x00ff) | ((d & 0xff) << 8));
                };
                wordRead = (_a, off) => littleEndian
                    ? ((words[off >>> 1] & 0xff) << 8) | (words[off >>> 1] >>> 8)
                    : words[off >>> 1];
                wordWrite = (_a, off, data) => {
                    words[off >>> 1] = littleEndian
                        ? ((data & 0xff) << 8) | ((data >>> 8) & 0xff)
                        : data & 0xffff;
                };
            }
            else {
                read = (_a, off) => bytes[off];
                write = (_a, off, d) => { bytes[off] = d; };
            }
            // a RAM range may still have a write handler override (e.g. videoram_w)
            if (r.write) {
                const h = registry.write[r.write];
                if (!h)
                    throw new Error(`missing write handler: ${r.write}`);
                const adapted = adaptWrite(h);
                const ramWrite = write;
                const ramWordWrite = wordWrite;
                write = r.writeHandlerOwnsRam
                    ? adapted
                    : (a, off, d) => { ramWrite(a, off, d); adapted(a, off, d); };
                if (dataWidth === 16) {
                    const handlerWordWrite = adaptWordWrite(h);
                    wordWrite = r.writeHandlerOwnsRam
                        ? handlerWordWrite
                        : (a, off, data) => {
                            ramWordWrite(a, off, data);
                            handlerWordWrite(a, off, data);
                        };
                }
            }
            // MAME permits different mappings for the two directions in one
            // fluent range, for example `.portr("IN0").writeonly().share(...)`.
            // The share owns writes there, while reads must still reach IN0.
            if (r.read) {
                const h = registry.read[r.read];
                if (!h)
                    throw new Error(`missing read handler: ${r.read}`);
                read = adaptRead(h);
                wordRead = adaptWordRead(h);
            }
        }
        if (r.kind === 'handler' || (r.kind !== 'ram' && (r.read || r.write))) {
            if (r.read) {
                const h = registry.read[r.read];
                if (!h)
                    throw new Error(`missing read handler: ${r.read}`);
                read = adaptRead(h);
                wordRead = adaptWordRead(h);
            }
            if (r.write) {
                const h = registry.write[r.write];
                if (!h)
                    throw new Error(`missing write handler: ${r.write}`);
                write = adaptWrite(h);
                wordWrite = adaptWordWrite(h);
            }
        }
        if (r.writeOnly && !r.read)
            read = null;
        if (r.readOnly && !r.write)
            write = null;
        // Two byte-lane ranges over the same addresses, one per lane, are one
        // 16-bit mapping in MAME: a byte access reaches the handler wired to its
        // own lane, a word access gets its high byte from one and its low byte
        // from the other. Installed one after the other, the second replaced the
        // first: Spy Hunter's Cheap Squeak Deluxe maps its PIA on both lanes
        // (`umask16(0xff00)` for Spy Hunter, `umask16(0x00ff)` for Turbo Tag),
        // so its 68000 read the high lane through the low-lane handler, failed
        // its PIA self-test and never played the music.
        if (lane !== undefined && r.kind === 'handler') {
            const key = `${r.start}:${r.end}:${r.mirror ?? 0}:${r.select ?? 0}:${r.viewTag ?? ''}:${r.viewEntry ?? 0}`;
            const own = { lane, read, write, wordRead, wordWrite };
            const other = this.laneRanges.get(key);
            if (other && other.lane !== lane) {
                const mine = byteLane(lane, littleEndian);
                const myWord = mine === 0 ? 0xff00 : 0x00ff;
                if (read && other.read) {
                    const ours = read;
                    const theirs = other.read;
                    read = (address, offset) => (address & 1) === mine ? ours(address, offset) : theirs(address, offset);
                }
                else
                    read ??= other.read;
                if (wordRead && other.wordRead) {
                    const ours = wordRead;
                    const theirs = other.wordRead;
                    wordRead = (address, offset) => (ours(address, offset) & myWord) | (theirs(address, offset) & ~myWord & 0xffff);
                }
                else
                    wordRead ??= other.wordRead;
                // Each lane's write handler already ignores the other lane; the
                // range mapped first is written first, in map order.
                if (write && other.write) {
                    const ours = write;
                    const theirs = other.write;
                    write = (address, offset, data, mask) => { theirs(address, offset, data, mask); ours(address, offset, data, mask); };
                }
                else
                    write ??= other.write;
                if (wordWrite && other.wordWrite) {
                    const ours = wordWrite;
                    const theirs = other.wordWrite;
                    wordWrite = (address, offset, data) => { theirs(address, offset, data); ours(address, offset, data); };
                }
                else
                    wordWrite ??= other.wordWrite;
            }
            this.laneRanges.set(key, own);
        }
        const readIdx = read ? this.readFns.push(read) - 1 : 0;
        const writeIdx = write ? this.writeFns.push(write) - 1 : 0;
        if (wordRead && readIdx)
            this.wordReadFns[readIdx] = wordRead;
        if (wordWrite && writeIdx)
            this.wordWriteFns[writeIdx] = wordWrite;
        if (readIdx > 255 || writeIdx > 255)
            throw new Error('too many bus handlers');
        const mirror = r.mirror ?? 0;
        if (r.viewTag) {
            if (r.end > 0xffff || (r.end | mirror) > 0xffff) {
                throw new Error(`memory view ${r.viewTag} exceeds the 16-bit generated bus`);
            }
            this.viewMappings.push({
                tag: r.viewTag,
                entry: r.viewEntry ?? 0,
                start: r.start,
                end: r.end,
                mirror,
                readIdx,
                writeIdx,
                read: Boolean(read),
                write: Boolean(write),
            });
            if (!this.activeViews.has(r.viewTag))
                this.activeViews.set(r.viewTag, 0);
            return;
        }
        // Apply the range at every mirror/select image. Mirror bits disappear
        // from the handler offset; select bits remain (MAME's `.select(mask)`),
        // which is how sparsely decoded control latches receive high offset bits.
        for (let m = 0;; m = (m - mirror) & mirror) {
            const select = r.select ?? 0;
            for (let s = 0;; s = (s - select) & select) {
                const base = (r.start | m) & this.addressMask;
                for (let a = r.start; a <= r.end; a++) {
                    const ea = (a | m | s) & this.addressMask;
                    if (ea <= 0xffff) {
                        if (read) {
                            this.readId[ea] = readIdx;
                            this.base[ea] = (this.base[ea] & 0xffff0000) | base;
                        }
                        if (write) {
                            this.writeId[ea] = writeIdx;
                            this.base[ea] = (this.base[ea] & 0x0000ffff) | (base << 16);
                        }
                        continue;
                    }
                    const page = ea >>> 12;
                    const offset = ea & 0xfff;
                    if (read) {
                        const ids = this.highReadId.get(page) ?? new Uint8Array(0x1000);
                        const bases = this.highReadBase.get(page) ?? new Uint32Array(0x1000);
                        ids[offset] = readIdx;
                        bases[offset] = base;
                        this.highReadId.set(page, ids);
                        this.highReadBase.set(page, bases);
                    }
                    if (write) {
                        const ids = this.highWriteId.get(page) ?? new Uint8Array(0x1000);
                        const bases = this.highWriteBase.get(page) ?? new Uint32Array(0x1000);
                        ids[offset] = writeIdx;
                        bases[offset] = base;
                        this.highWriteId.set(page, ids);
                        this.highWriteBase.set(page, bases);
                    }
                }
                if (select === 0 || s === select)
                    break;
            }
            if (mirror === 0 || m === mirror)
                break;
        }
    }
    /** Save-state roots (machine-state.ts): the view selection; the overlays derive from it. */
    stateKeys() {
        return ['activeViews', 'ram'];
    }
    stateRestored() {
        this.lastReadPage = -1;
        this.lastWritePage = -1;
        this.rebuildViews();
    }
    /** Select a MAME memory_view entry and atomically refresh its address overlays. */
    selectView(tag, entry) {
        if (!this.activeViews.has(tag))
            return entry;
        this.activeViews.set(tag, entry);
        this.rebuildViews();
        return entry;
    }
    rebuildViews() {
        if (!this.baseReadId || !this.baseWriteId || !this.baseAddresses)
            return;
        this.lastReadPage = -1;
        this.lastWritePage = -1;
        this.readId.set(this.baseReadId);
        this.writeId.set(this.baseWriteId);
        this.base.set(this.baseAddresses);
        for (const mapping of this.viewMappings) {
            if (this.activeViews.get(mapping.tag) !== mapping.entry)
                continue;
            for (let mirror = 0;; mirror = (mirror - mapping.mirror) & mapping.mirror) {
                const rangeBase = mapping.start | mirror;
                for (let address = mapping.start; address <= mapping.end; address++) {
                    const effective = address | mirror;
                    if (mapping.read) {
                        this.readId[effective] = mapping.readIdx;
                        this.base[effective] = (this.base[effective] & 0xffff0000) | rangeBase;
                    }
                    if (mapping.write) {
                        this.writeId[effective] = mapping.writeIdx;
                        this.base[effective] = (this.base[effective] & 0x0000ffff) | (rangeBase << 16);
                    }
                }
                if (mapping.mirror === 0 || mirror === mapping.mirror)
                    break;
            }
        }
    }
    read = (addr) => {
        addr &= this.addressMask;
        if (this.accessTaps.length)
            this.tap(addr, false);
        if (addr <= 0xffff) {
            return this.readFns[this.readId[addr]](addr, addr - (this.base[addr] & 0xffff)) & 0xff;
        }
        this.lookup(addr, false);
        return this.readFns[this.lookupId](addr, addr - this.lookupBase) & 0xff;
    };
    read16be = (addr) => {
        addr &= this.addressMask;
        // The tap bookkeeping below costs an exception frame on every access; a
        // board with no taps installed cannot need it.
        if (!this.accessTaps.length)
            return this.read16beUntapped(addr);
        this.tap(addr, false);
        this.tapDepth++;
        try {
            return this.read16beUntapped(addr);
        }
        finally {
            this.tapDepth--;
        }
    };
    read16beUntapped(addr) {
        this.lookup(addr, false);
        const id = this.lookupId;
        const base = this.lookupBase;
        this.lookup((addr + 1) & this.addressMask, false);
        const direct = id === this.lookupId && base === this.lookupBase
            ? this.wordReadFns[id]
            : undefined;
        return direct
            ? direct(addr, addr - base) & 0xffff
            : ((this.read(addr) << 8) | this.read(addr + 1)) & 0xffff;
    }
    /**
     * The little-endian word, for a 16-bit space MAME declares ENDIANNESS_LITTLE
     * (the V30's, the TMS34010's): one call to a word handler when both bytes
     * land in it, else the two bytes, low first.
     */
    read16le = (addr) => {
        addr &= this.addressMask;
        if (this.accessTaps.length)
            this.tap(addr, false);
        this.tapDepth++;
        try {
            this.lookup(addr, false);
            const id = this.lookupId;
            const base = this.lookupBase;
            this.lookup((addr + 1) & this.addressMask, false);
            const direct = id === this.lookupId && base === this.lookupBase ? this.wordReadFns[id] : undefined;
            if (!direct)
                return (this.read(addr) | (this.read(addr + 1) << 8)) & 0xffff;
            // Word functions answer in the big-endian view on every bus (a
            // little-endian one swaps inside them, as read16be relies on), so the
            // little-endian word is that one swapped.
            const word = direct(addr, addr - base) & 0xffff;
            return ((word & 0xff) << 8) | (word >>> 8);
        }
        finally {
            this.tapDepth--;
        }
    };
    /** The little-endian word written: one word handler call, or two bytes, low first. */
    write16le = (addr, data) => {
        addr &= this.addressMask;
        if (this.accessTaps.length)
            this.tap(addr, true);
        this.tapDepth++;
        try {
            this.lookup(addr, true);
            const id = this.lookupId;
            const base = this.lookupBase;
            this.lookup((addr + 1) & this.addressMask, true);
            const direct = id === this.lookupId && base === this.lookupBase ? this.wordWriteFns[id] : undefined;
            if (direct) {
                direct(addr, addr - base, ((data & 0xff) << 8) | ((data >>> 8) & 0xff));
                return;
            }
            this.write(addr, data);
            this.write(addr + 1, data >>> 8);
        }
        finally {
            this.tapDepth--;
        }
    };
    /** MAME reads a 68000 long as two word accesses, and taps it as two. */
    read32be = (addr) => ((this.read16be(addr) << 16) | this.read16be(addr + 2)) >>> 0;
    write = (addr, data) => {
        addr &= this.addressMask;
        if (this.accessTaps.length)
            this.tap(addr, true);
        if (addr <= 0xffff) {
            this.writeFns[this.writeId[addr]](addr, addr - (this.base[addr] >>> 16), data & 0xff);
            return;
        }
        const page = addr >>> 12;
        const offset = addr & 0xfff;
        const id = this.highWriteId.get(page)?.[offset] ?? 0;
        const base = this.highWriteBase.get(page)?.[offset] ?? 0;
        this.writeFns[id](addr, addr - base, data & 0xff);
    };
    write16be = (addr, data) => {
        addr &= this.addressMask;
        if (this.accessTaps.length)
            this.tap(addr, true);
        this.tapDepth++;
        try {
            this.write16beUntapped(addr, data);
        }
        finally {
            this.tapDepth--;
        }
    };
    write32be = (addr, data) => {
        this.write16be(addr, (data >>> 16) & 0xffff);
        this.write16be(addr + 2, data & 0xffff);
    };
    write16beUntapped(addr, data) {
        this.lookup(addr, true);
        const id = this.lookupId;
        const base = this.lookupBase;
        this.lookup((addr + 1) & this.addressMask, true);
        const direct = id === this.lookupId && base === this.lookupBase
            ? this.wordWriteFns[id]
            : undefined;
        if (direct) {
            direct(addr, addr - base, data & 0xffff);
            return;
        }
        this.write(addr, data >>> 8);
        this.write(addr + 1, data);
    }
    /**
     * The handler id and window base decoding one address, left in
     * `lookupId`/`lookupBase`.
     *
     * Scratch fields rather than a returned object: a word access looks up both
     * halves, and allocating two records per access was a fifth of a Mortal
     * Kombat frame -- its whole address space decodes through the high pages.
     */
    lookupId = 0;
    lookupBase = 0;
    lookup(addr, write) {
        if (addr <= 0xffff) {
            this.lookupId = write ? this.writeId[addr] : this.readId[addr];
            this.lookupBase = write ? this.base[addr] >>> 16 : this.base[addr] & 0xffff;
            return;
        }
        const page = addr >>> 12;
        const offset = addr & 0xfff;
        if (write) {
            if (page !== this.lastWritePage) {
                this.lastWritePage = page;
                this.lastWriteIds = this.highWriteId.get(page);
                this.lastWriteBases = this.highWriteBase.get(page);
            }
            this.lookupId = this.lastWriteIds === undefined ? 0 : this.lastWriteIds[offset] ?? 0;
            this.lookupBase = this.lastWriteBases === undefined ? 0 : this.lastWriteBases[offset] ?? 0;
            return;
        }
        if (page !== this.lastReadPage) {
            this.lastReadPage = page;
            this.lastReadIds = this.highReadId.get(page);
            this.lastReadBases = this.highReadBase.get(page);
        }
        this.lookupId = this.lastReadIds === undefined ? 0 : this.lastReadIds[offset] ?? 0;
        this.lookupBase = this.lastReadBases === undefined ? 0 : this.lastReadBases[offset] ?? 0;
    }
    /** io space: unused on this board family */
    in = (_port) => OPEN_BUS;
    out = (_port, _data) => { };
    /**
     * Atomic word access to the io space, installed only when the CPU declares
     * a 16-bit one. Left undefined otherwise so a core that has no such space
     * keeps taking the byte path rather than silently widening its accesses.
     */
    in16be;
    out16be;
    in16le;
    out16le;
}
