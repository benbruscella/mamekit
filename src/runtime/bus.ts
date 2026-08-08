// Generic Z80 memory bus built from generated address-range descriptors.
// Dispatch is a flat 64k handler-id table + handler arrays — one indexed load
// and one call per access, fast enough for ~10M accesses/sec with headroom.

export interface RangeSpec {
  start: number;
  end: number;
  mirror?: number;
  /** ROM region supplying this range when it differs from the primary ROM. */
  region?: string;
  /** Address bits decoded into the handler offset rather than mirrored away. */
  select?: number;
  /** Byte offset in the supplied ROM corresponding to this range's start. */
  romOffset?: number;
  kind: 'rom' | 'ram' | 'handler' | 'nop';
  /** handler registry keys, e.g. "galaga_state.bosco_dsw_r" */
  read?: string;
  write?: string;
  /** shared RAM tag; ranges with the same share alias the same bytes */
  share?: string;
  readOnly?: boolean;
  writeOnly?: boolean;
  /** The MAME write handler explicitly stores this shared RAM byte itself. */
  writeHandlerOwnsRam?: boolean;
  viewTag?: string;
  viewEntry?: number;
}

export type ReadHandler = (addr: number, offset: number) => number;
export type WriteHandler = (addr: number, offset: number, data: number, memMask?: number) => void;
type WordReadHandler = (addr: number, offset: number) => number;
type WordWriteHandler = (addr: number, offset: number, data: number) => void;

export interface HandlerRegistry {
  read: Record<string, ReadHandler>;
  write: Record<string, WriteHandler>;
}

// address_space::m_unmap defaults to zero in MAME. Drivers that call
// unmap_value_high must carry that choice explicitly in generated IR rather
// than making every NOP/unmapped range read high.
const OPEN_BUS = 0x00;

function wordReadHandler(handler: ReadHandler): ReadHandler {
  return (address, offset) => {
    const value = handler(address, offset >>> 1) & 0xffff;
    return address & 1 ? value & 0xff : value >>> 8;
  };
}

function wordWriteHandler(handler: WriteHandler): WriteHandler {
  return (address, offset, data) => {
    if (address & 1) handler(address, offset >>> 1, data & 0xff, 0x00ff);
    else handler(address, offset >>> 1, (data & 0xff) << 8, 0xff00);
  };
}

export class Bus {
  private readId = new Uint8Array(0x10000);
  private writeId = new Uint8Array(0x10000);
  private highReadId = new Map<number, Uint8Array>();
  private highWriteId = new Map<number, Uint8Array>();
  private highReadBase = new Map<number, Uint32Array>();
  private highWriteBase = new Map<number, Uint32Array>();
  private readFns: ReadHandler[] = [() => OPEN_BUS];
  private writeFns: WriteHandler[] = [() => { /* open bus */ }];
  private readonly wordReadFns = new Map<number, WordReadHandler>();
  private readonly wordWriteFns = new Map<number, WordWriteHandler>();
  private base = new Uint32Array(0x10000);  // range base addr per address (for offset calc)
  private readonly viewMappings: {
    tag: string; entry: number; start: number; end: number; mirror: number;
    readIdx: number; writeIdx: number; read: boolean; write: boolean;
  }[] = [];
  private readonly activeViews = new Map<string, number>();
  private baseReadId?: Uint8Array;
  private baseWriteId?: Uint8Array;
  private baseAddresses?: Uint32Array;
  private readonly addressMask: number;
  /** shared RAM blocks by tag, so the machine/video can alias them */
  shares: Record<string, Uint8Array>;
  /** Optional board-provided AS_OPCODES read path. */
  readOpcode?: (addr: number) => number;

  constructor(
    ranges: RangeSpec[],
    rom: Uint8Array,
    registry: HandlerRegistry,
    shares: Record<string, Uint8Array> = {},
    dataWidth: 8 | 16 = 8,
    regions?: Readonly<Record<string, Uint8Array>>,
  ) {
    this.shares = shares;
    this.addressMask = ranges.some(range => (range.end | (range.mirror ?? 0)) > 0xffff)
      ? 0xffffff
      : 0xffff;
    for (const r of ranges) {
      const size = r.end - r.start + 1;
      let read: ReadHandler | null = null;
      let write: WriteHandler | null = null;
      let wordRead: WordReadHandler | null = null;
      let wordWrite: WordWriteHandler | null = null;

      if (r.kind === 'rom') {
        const rangeRom = r.region ? regions?.[r.region] : rom;
        if (!rangeRom) throw new Error(`missing ROM region: ${r.region}`);
        // offset-based so mirror images read the same region bytes
        read = (_a, off) => rangeRom[(r.romOffset ?? r.start) + off];
      } else if (r.kind === 'ram') {
        const bytes = r.share
          ? (this.shares[r.share] ??= new Uint8Array(size))
          : new Uint8Array(size);
        if (dataWidth === 16) {
          const words = new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1);
          read = (_a, off) => off & 1 ? words[off >>> 1]! : words[off >>> 1]! >>> 8;
          write = (_a, off, d) => {
            const index = off >>> 1;
            words[index] = off & 1
              ? (words[index]! & 0xff00) | (d & 0xff)
              : (words[index]! & 0x00ff) | ((d & 0xff) << 8);
          };
          wordRead = (_a, off) => words[off >>> 1]!;
          wordWrite = (_a, off, data) => { words[off >>> 1] = data & 0xffff; };
        } else {
          read = (_a, off) => bytes[off];
          write = (_a, off, d) => { bytes[off] = d; };
        }
        // a RAM range may still have a write handler override (e.g. videoram_w)
        if (r.write) {
          const h = registry.write[r.write];
          if (!h) throw new Error(`missing write handler: ${r.write}`);
          const adapted = dataWidth === 16 ? wordWriteHandler(h) : h;
          const ramWrite = write!;
          const ramWordWrite = wordWrite;
          write = r.writeHandlerOwnsRam
            ? adapted
            : (a, off, d) => { ramWrite(a, off, d); adapted(a, off, d); };
          if (dataWidth === 16) {
            const handlerWordWrite: WordWriteHandler = (a, off, data) =>
              h(a, off >>> 1, data & 0xffff, 0xffff);
            wordWrite = r.writeHandlerOwnsRam
              ? handlerWordWrite
              : (a, off, data) => {
                ramWordWrite!(a, off, data);
                handlerWordWrite(a, off, data);
              };
          }
        }
        // MAME permits different mappings for the two directions in one
        // fluent range, for example `.portr("IN0").writeonly().share(...)`.
        // The share owns writes there, while reads must still reach IN0.
        if (r.read) {
          const h = registry.read[r.read];
          if (!h) throw new Error(`missing read handler: ${r.read}`);
          read = dataWidth === 16 ? wordReadHandler(h) : h;
          if (dataWidth === 16) wordRead = (a, off) => h(a, off >>> 1) & 0xffff;
        }
      }
      if (r.kind === 'handler' || (r.kind !== 'ram' && (r.read || r.write))) {
        if (r.read) {
          const h = registry.read[r.read];
          if (!h) throw new Error(`missing read handler: ${r.read}`);
          read = dataWidth === 16 ? wordReadHandler(h) : h;
          if (dataWidth === 16) wordRead = (a, off) => h(a, off >>> 1) & 0xffff;
        }
        if (r.write) {
          const h = registry.write[r.write];
          if (!h) throw new Error(`missing write handler: ${r.write}`);
          write = dataWidth === 16 ? wordWriteHandler(h) : h;
          if (dataWidth === 16) {
            wordWrite = (a, off, data) => h(a, off >>> 1, data & 0xffff, 0xffff);
          }
        }
      }
      if (r.writeOnly && !r.read) read = null;
      if (r.readOnly && !r.write) write = null;

      const readIdx = read ? this.readFns.push(read) - 1 : 0;
      const writeIdx = write ? this.writeFns.push(write) - 1 : 0;
      if (wordRead && readIdx) this.wordReadFns.set(readIdx, wordRead);
      if (wordWrite && writeIdx) this.wordWriteFns.set(writeIdx, wordWrite);
      if (readIdx > 255 || writeIdx > 255) throw new Error('too many bus handlers');

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
        if (!this.activeViews.has(r.viewTag)) this.activeViews.set(r.viewTag, 0);
        continue;
      }
      // Apply the range at every mirror/select image. Mirror bits disappear
      // from the handler offset; select bits remain (MAME's `.select(mask)`),
      // which is how sparsely decoded control latches receive high offset bits.
      for (let m = 0; ; m = (m - mirror) & mirror) {
        const select = r.select ?? 0;
        for (let s = 0; ; s = (s - select) & select) {
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
          if (select === 0 || s === select) break;
        }
        if (mirror === 0 || m === mirror) break;
      }
    }
    this.baseReadId = this.readId.slice();
    this.baseWriteId = this.writeId.slice();
    this.baseAddresses = this.base.slice();
    this.rebuildViews();
  }

  /** Select a MAME memory_view entry and atomically refresh its address overlays. */
  selectView(tag: string, entry: number): number {
    if (!this.activeViews.has(tag)) return entry;
    this.activeViews.set(tag, entry);
    this.rebuildViews();
    return entry;
  }

  private rebuildViews(): void {
    if (!this.baseReadId || !this.baseWriteId || !this.baseAddresses) return;
    this.readId.set(this.baseReadId);
    this.writeId.set(this.baseWriteId);
    this.base.set(this.baseAddresses);
    for (const mapping of this.viewMappings) {
      if (this.activeViews.get(mapping.tag) !== mapping.entry) continue;
      for (let mirror = 0; ; mirror = (mirror - mapping.mirror) & mapping.mirror) {
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
        if (mapping.mirror === 0 || mirror === mapping.mirror) break;
      }
    }
  }

  read = (addr: number): number => {
    addr &= this.addressMask;
    if (addr <= 0xffff) {
      return this.readFns[this.readId[addr]](addr, addr - (this.base[addr] & 0xffff)) & 0xff;
    }
    const page = addr >>> 12;
    const offset = addr & 0xfff;
    const id = this.highReadId.get(page)?.[offset] ?? 0;
    const base = this.highReadBase.get(page)?.[offset] ?? 0;
    return this.readFns[id](addr, addr - base) & 0xff;
  };

  read16be = (addr: number): number => {
    addr &= this.addressMask;
    const mapping = this.wordMapping(addr, false);
    const next = this.wordMapping((addr + 1) & this.addressMask, false);
    const direct = mapping && next && mapping.id === next.id && mapping.base === next.base
      ? this.wordReadFns.get(mapping.id)
      : undefined;
    return direct
      ? direct(addr, addr - mapping!.base) & 0xffff
      : ((this.read(addr) << 8) | this.read(addr + 1)) & 0xffff;
  };

  write = (addr: number, data: number): void => {
    addr &= this.addressMask;
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

  write16be = (addr: number, data: number): void => {
    addr &= this.addressMask;
    const mapping = this.wordMapping(addr, true);
    const next = this.wordMapping((addr + 1) & this.addressMask, true);
    const direct = mapping && next && mapping.id === next.id && mapping.base === next.base
      ? this.wordWriteFns.get(mapping.id)
      : undefined;
    if (direct) {
      direct(addr, addr - mapping!.base, data & 0xffff);
      return;
    }
    this.write(addr, data >>> 8);
    this.write(addr + 1, data);
  };

  private wordMapping(addr: number, write: boolean): { id: number; base: number } | undefined {
    if (addr <= 0xffff) {
      return {
        id: write ? this.writeId[addr]! : this.readId[addr]!,
        base: write ? this.base[addr]! >>> 16 : this.base[addr]! & 0xffff,
      };
    }
    const page = addr >>> 12;
    const offset = addr & 0xfff;
    return {
      id: (write ? this.highWriteId : this.highReadId).get(page)?.[offset] ?? 0,
      base: (write ? this.highWriteBase : this.highReadBase).get(page)?.[offset] ?? 0,
    };
  }

  /** io space: unused on this board family */
  in = (_port: number): number => OPEN_BUS;
  out = (_port: number, _data: number): void => { /* unused */ };
}
