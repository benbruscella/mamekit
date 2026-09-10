// The machine's memory between sessions: what MAME keeps when it is switched
// off. Two mechanisms, both MAME's own, run here against the generic board:
//
// - nvram_device: every share or region an NVRAM device declares
//   (`board.persistentMemory()`) is loaded before the first frame and written
//   back whenever it changes, as running_machine::nvram_load/nvram_save do at
//   start and exit. A tab has no reliable exit, so "changed" is polled once
//   an emulated second and flushed on pagehide.
// - the hiscore plugin (plugins/hiscore/init.lua): the target's hiscore.dat
//   rows, compiled into its config. Once the game has initialised its table
//   (the first and last sentinel bytes are in place, after any `@delay=`),
//   the saved bytes are written in through the CPU's own bus; from then on a
//   changed table is written out after the plugin's 5 s grace, never when it
//   merely equals what the game initialised. This is the plugin's "when
//   updated" mode; its "on exit" mode is the pagehide flush.
//
// Nothing here knows a chip or a game: rows name a CPU tag and an address,
// devices name a share, and the board resolves both. Issue #132.

import type { Board, HiscoreRow, HiscoreTable, MemoryAccess, PersistentMemory } from './types.ts';
import type { MemoryRecord } from './memorystore.ts';

/** The plugin's grace between writes, in emulated seconds. */
const HISCORE_WRITE_GRACE_SECONDS = 5;

export interface MachineMemoryOptions {
  board: Board;
  game: string;
  /** frames per emulated second, for the plugin's delay and grace */
  refresh: number;
  table?: HiscoreTable;
  /** the record to persist; called whenever memory worth keeping changed */
  write: (record: MemoryRecord) => void;
  /** where a row the board cannot resolve is reported */
  warn?: (message: string) => void;
}

export interface RestoreSummary {
  /** NVRAM tags whose stored bytes were copied in */
  nvram: string[];
  /** stored hiscore bytes are waiting for the game to initialise its table */
  hiscorePending: boolean;
}

export interface MachineMemory {
  /** NVRAM memories this board composed */
  readonly nvram: PersistentMemory[];
  /** hiscore rows the board resolved (0 when the target has none, or a row could not be resolved) */
  readonly hiscoreRows: number;
  /** Copy a stored record in. Once, after the board is created and before its first frame. */
  restore(record: MemoryRecord | null): RestoreSummary;
  /** Once per emulated frame, after the board ran it. */
  tick(): void;
  /** true once the stored (or first-seen) table is in the machine */
  hiscoreArmed(): boolean;
  /** Write whatever changed now (pagehide). */
  flush(): void;
  /** The machine was reset: flush, then wait for the table to be initialised again. */
  reset(): void;
  /** Stop writing for good (the visitor is clearing the machine's memory). */
  disable(): void;
}

interface ResolvedRow extends HiscoreRow { access: MemoryAccess }

export function createMachineMemory(options: MachineMemoryOptions): MachineMemory {
  const { board, game, refresh, write } = options;
  const warn = options.warn ?? ((message: string) => console.warn(message));
  const nvram = board.persistentMemory();
  const nvramWritten = nvram.map(memory => memory.bytes.slice());
  const nvramCheckFrames = Math.max(1, Math.round(refresh));

  // Rows are resolved once; one the board cannot answer disables the whole
  // table, as the plugin's parse error does, rather than saving half of one.
  let rows: ResolvedRow[] = [];
  if (options.table) {
    const resolved: ResolvedRow[] = [];
    for (const row of options.table.rows) {
      const access = board.memory(row);
      if (!access) {
        warn(`${game}: hiscore.dat names ${row.share !== undefined ? `share ${row.share}` : `${row.cpu} ${row.space}`}, which this board has no way to reach; high scores are not kept`);
        resolved.length = 0;
        break;
      }
      resolved.push({ ...row, access });
    }
    rows = resolved;
  }
  const delayFrames = Math.round((options.table?.delaySeconds ?? 0) * refresh);
  const graceFrames = Math.round(HISCORE_WRITE_GRACE_SECONDS * refresh);

  let frames = 0;
  let disabled = false;
  /** the plugin's .hi image: what was stored, then what was last written */
  let hiscoreImage: Uint8Array[] | undefined;
  /** the table as the game initialised it (never worth saving) */
  let hiscoreDefault: Uint8Array[] | undefined;
  /** the table as last written or loaded */
  let hiscoreCurrent: Uint8Array[] | undefined;
  let armed = false;
  let lastWriteFrame = -Infinity;

  const readRows = (): Uint8Array[] => rows.map(row => {
    const bytes = new Uint8Array(row.length);
    for (let index = 0; index < row.length; index++) bytes[index] = row.access.read(row.address + index);
    return bytes;
  });
  const writeRows = (image: Uint8Array[]): void => {
    rows.forEach((row, index) => {
      const bytes = image[index]!;
      for (let offset = 0; offset < row.length; offset++) row.access.write(row.address + offset, bytes[offset]!);
    });
  };
  const sentinelsPresent = (): boolean => rows.length > 0 && rows.every(row =>
    row.access.read(row.address) === row.first && row.access.read(row.address + row.length - 1) === row.last);
  const sameImage = (left: Uint8Array[] | undefined, right: Uint8Array[]): boolean =>
    left !== undefined && left.length === right.length && left.every((bytes, index) => bytesEqual(bytes, right[index]!));
  const imageFits = (image: Uint8Array[] | undefined): image is Uint8Array[] =>
    image !== undefined && image.length === rows.length && image.every((bytes, index) => bytes.length === rows[index]!.length);
  const prefill = (): void => {
    for (const row of rows) {
      if (row.fill === undefined) continue;
      for (let offset = 0; offset < row.length; offset++) row.access.write(row.address + offset, row.fill);
    }
  };
  const record = (): MemoryRecord => ({
    game,
    shares: Object.fromEntries(nvram.filter(memory => memory.kind === 'share').map(memory => [memory.tag, memory.bytes.slice()])),
    regions: Object.fromEntries(nvram.filter(memory => memory.kind === 'region').map(memory => [memory.tag, memory.bytes.slice()])),
    ...(hiscoreImage ? { hiscore: hiscoreImage.map(bytes => bytes.slice()) } : {}),
    updatedAt: Date.now(),
  });
  const nvramChanged = (): boolean => nvram.some((memory, index) => !bytesEqual(memory.bytes, nvramWritten[index]!));
  const persist = (): void => {
    if (disabled) return;
    nvram.forEach((memory, index) => nvramWritten[index]!.set(memory.bytes));
    write(record());
  };

  /** The plugin's init(): arm once the game has its table, loading the stored one over it. */
  const arm = (): void => {
    if (armed || !rows.length || frames < delayFrames || !sentinelsPresent()) return;
    hiscoreDefault = readRows();
    if (imageFits(hiscoreImage)) writeRows(hiscoreImage);
    hiscoreCurrent = readRows();
    hiscoreImage = hiscoreCurrent;
    armed = true;
  };
  /** A table worth writing: changed since last written, and not the game's own defaults. */
  const hiscoreDue = (): Uint8Array[] | undefined => {
    if (!armed) return undefined;
    const now = readRows();
    if (sameImage(hiscoreCurrent, now) || sameImage(hiscoreDefault, now)) return undefined;
    return now;
  };

  const flush = (): void => {
    if (disabled) return;
    let due = nvramChanged();
    const now = hiscoreDue();
    if (now) { hiscoreCurrent = now; hiscoreImage = now; lastWriteFrame = frames; due = true; }
    if (due) persist();
  };

  prefill();
  return {
    nvram,
    hiscoreRows: rows.length,
    restore(stored) {
      const summary: RestoreSummary = { nvram: [], hiscorePending: false };
      if (!stored) return summary;
      for (const [index, memory] of nvram.entries()) {
        const bytes = (memory.kind === 'share' ? stored.shares : stored.regions)?.[memory.tag];
        if (!bytes) continue;
        if (bytes.length !== memory.bytes.length) {
          warn(`${game}: stored ${memory.kind} ${memory.tag} is ${bytes.length} bytes, the machine's is ${memory.bytes.length}; left cold`);
          continue;
        }
        memory.bytes.set(bytes);
        nvramWritten[index]!.set(bytes);
        summary.nvram.push(memory.tag);
      }
      if (imageFits(stored.hiscore)) {
        hiscoreImage = stored.hiscore.map(bytes => bytes.slice());
        summary.hiscorePending = true;
      } else if (stored.hiscore && rows.length) {
        warn(`${game}: stored high scores do not fit this machine's table; ignored`);
      }
      return summary;
    },
    tick() {
      frames++;
      if (disabled) return;
      arm();
      let due = false;
      if (armed && frames > lastWriteFrame + graceFrames) {
        const now = hiscoreDue();
        if (now) { hiscoreCurrent = now; hiscoreImage = now; lastWriteFrame = frames; due = true; }
      }
      if (frames % nvramCheckFrames === 0 && nvramChanged()) due = true;
      if (due) persist();
    },
    hiscoreArmed: () => armed,
    flush,
    reset() {
      flush();
      armed = false;
      hiscoreDefault = undefined;
      hiscoreCurrent = undefined;
      lastWriteFrame = -Infinity;
      frames = 0;
      prefill();
    },
    disable() { disabled = true; },
  };
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index++) if (left[index] !== right[index]) return false;
  return true;
}
