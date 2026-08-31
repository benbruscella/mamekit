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

/** A byte-addressable backing store: a ROM region, a RAM block, a pointer. */
export type InstalledBytes = ArrayLike<number> & { length: number };

/** MAME `memory_bank`, as the generated device runtime models one. */
export interface InstalledBank {
  read(offset: number): number;
  write(offset: number, value: number): void;
}

export type InstalledDelegate = (offset: number, ...rest: number[]) => unknown;

/**
 * One `install_*` call, in the order it was made.
 *
 * `kind` says what answers the window; `tap` entries answer nothing and are
 * layered over whatever does.
 */
export type InstalledEntry =
  | { kind: 'rom'; start: number; end: number; mirror: number; bytes: InstalledBytes }
  | { kind: 'bank'; start: number; end: number; mirror: number; bank: InstalledBank; read: boolean; write: boolean }
  | { kind: 'handler'; start: number; end: number; mirror: number; read?: InstalledDelegate; write?: InstalledDelegate }
  | { kind: 'tap'; start: number; end: number; name: string; read?: InstalledDelegate; write?: InstalledDelegate };

/** MAME `memory_view`: a window whose contents switch between numbered entries. */
export interface InstalledView {
  start: number;
  end: number;
  /** Installs made against `view[n]`, keyed by entry. */
  entries: Map<number, InstalledEntry[]>;
  /** The entry the device selected, if it selected one. */
  selected?: number;
}

/**
 * The `address_space` handed to a device's own installer.
 *
 * Every method mirrors a MAME signature, including the overloads that take an
 * optional mirror before the payload -- `install_rom(start, end, base)` and
 * `install_rom(start, end, mirror, base)` are both real, and only the argument
 * count separates them.
 */
export class RecordingAddressSpace {
  readonly entries: InstalledEntry[] = [];
  readonly views: InstalledView[] = [];

  install_rom(start: number, end: number, mirrorOrBytes: unknown, maybeBytes?: unknown): void {
    const withMirror = maybeBytes !== undefined;
    const bytes = asBytes(withMirror ? maybeBytes : mirrorOrBytes);
    if (!bytes) return;
    this.entries.push({
      kind: 'rom',
      start,
      end,
      mirror: withMirror ? Number(mirrorOrBytes) | 0 : 0,
      bytes,
    });
  }

  /** `install_ram` differs from ROM only in being writable, which the bytes are. */
  install_ram(start: number, end: number, mirrorOrBytes: unknown, maybeBytes?: unknown): void {
    this.install_rom(start, end, mirrorOrBytes, maybeBytes);
  }

  install_read_bank(start: number, end: number, ...rest: unknown[]): void {
    this.bank(start, end, rest, true, false);
  }

  install_write_bank(start: number, end: number, ...rest: unknown[]): void {
    this.bank(start, end, rest, false, true);
  }

  install_readwrite_bank(start: number, end: number, ...rest: unknown[]): void {
    this.bank(start, end, rest, true, true);
  }

  install_read_handler(start: number, end: number, ...rest: unknown[]): void {
    this.handler(start, end, rest, 'read');
  }

  install_write_handler(start: number, end: number, ...rest: unknown[]): void {
    this.handler(start, end, rest, 'write');
  }

  install_readwrite_handler(start: number, end: number, ...rest: unknown[]): void {
    const mirror = rest.length > 2 ? Number(rest[0]) | 0 : 0;
    const delegates = rest.filter(value => typeof value === 'function') as InstalledDelegate[];
    if (delegates.length < 2) return;
    this.entries.push({
      kind: 'handler',
      start,
      end,
      mirror,
      read: delegates[0],
      write: delegates[1],
    });
  }

  install_read_tap(start: number, end: number, name: unknown, read: unknown): void {
    this.tap(start, end, name, read, undefined);
  }

  install_write_tap(start: number, end: number, name: unknown, write: unknown): void {
    this.tap(start, end, name, undefined, write);
  }

  install_readwrite_tap(start: number, end: number, name: unknown, read: unknown, write?: unknown): void {
    // MAME's three-callback overload passes the same lambda for both sides when
    // only one is given.
    this.tap(start, end, name, read, write ?? read);
  }

  /**
   * `install_view(start, end, view)`: the device hands back the view object it
   * declared, and installs into `view[n]` afterwards. The view records those
   * installs per entry so the consumer can apply the selected one.
   */
  install_view(start: number, end: number, view: unknown): void {
    const target = view as { __installedView?: InstalledView } | undefined;
    if (!target || typeof target !== 'object') return;
    const installed: InstalledView = target.__installedView ?? {
      start,
      end,
      entries: new Map(),
    };
    installed.start = start;
    installed.end = end;
    target.__installedView = installed;
    if (!this.views.includes(installed)) this.views.push(installed);
  }

  private bank(start: number, end: number, rest: unknown[], read: boolean, write: boolean): void {
    const bank = rest.find(value => isBank(value)) as InstalledBank | undefined;
    if (!bank) return;
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

  private handler(start: number, end: number, rest: unknown[], side: 'read' | 'write'): void {
    const delegate = rest.find(value => typeof value === 'function') as InstalledDelegate | undefined;
    if (!delegate) return;
    this.entries.push({
      kind: 'handler',
      start,
      end,
      mirror: rest.length > 1 && typeof rest[0] === 'number' ? rest[0] | 0 : 0,
      ...(side === 'read' ? { read: delegate } : { write: delegate }),
    });
  }

  private tap(start: number, end: number, name: unknown, read: unknown, write: unknown): void {
    this.entries.push({
      kind: 'tap',
      start,
      end,
      name: String(name ?? ''),
      ...(typeof read === 'function' ? { read: read as InstalledDelegate } : {}),
      ...(typeof write === 'function' ? { write: write as InstalledDelegate } : {}),
    });
  }
}

/**
 * A `memory_view` entry proxy: `m_view[1].install_read_bank(...)` records into
 * the view rather than into the space.
 */
export function installedViewEntry(view: InstalledView, entry: number): RecordingAddressSpace {
  const recorder = new RecordingAddressSpace();
  const existing = view.entries.get(entry);
  if (existing) recorder.entries.push(...existing);
  view.entries.set(entry, recorder.entries);
  return recorder;
}

function isBank(value: unknown): value is InstalledBank {
  return Boolean(value) && typeof value === 'object' &&
    typeof (value as InstalledBank).read === 'function' &&
    typeof (value as InstalledBank).write === 'function';
}

function asBytes(value: unknown): InstalledBytes | undefined {
  if (ArrayBuffer.isView(value) || Array.isArray(value)) return value as InstalledBytes;
  // A generated pointer: a byte source plus an offset into it.
  const pointer = value as { source?: unknown; offset?: number } | undefined;
  if (pointer && typeof pointer === 'object' && pointer.source !== undefined) {
    const source = asBytes(pointer.source);
    if (!source) return undefined;
    const offset = pointer.offset ?? 0;
    return offset ? subview(source, offset) : source;
  }
  return undefined;
}

function subview(source: InstalledBytes, offset: number): InstalledBytes {
  if (ArrayBuffer.isView(source)) {
    return (source as unknown as Uint8Array).subarray(offset);
  }
  // A plain array reached through an offset is rare enough to copy.
  return Array.from(
    { length: Math.max(0, source.length - offset) },
    (_value, index) => source[offset + index] ?? 0,
  );
}

/**
 * The address the mirror folds an access down to, relative to `start`.
 *
 * MAME's `mirror` names address lines the window does not decode, so those bits
 * are dropped rather than masked into the offset.
 */
export function installedOffset(address: number, start: number, mirror: number): number {
  return (address - start) & ~mirror;
}
