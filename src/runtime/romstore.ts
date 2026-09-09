// Browser-side ROM library. An arcade set the visitor dropped is remembered
// in THEIR OWN browser (IndexedDB `mamekit-roms`), the policy console carts
// have had since 2026-07-07 (cartstore.ts), extended to arcade sets by
// explicit user approval on 2026-09-09 (issue #132). The next visit to the
// game boots straight in; Forget ROM on the page removes it. Nothing ever
// touches the server, and the menu's legacy-storage purge must never target
// this DB.
//
// The zips are kept exactly as they arrived, so a stored set re-runs the same
// manifest check a fresh drop does (a rebuilt manifest can still refuse it).
//
// When IndexedDB is unavailable (private browsing, quota, disabled) the store
// degrades to a per-session in-memory Map with the same interface and
// `persistent: false`, so the page can say the set will not be kept.

const DB_NAME = 'mamekit-roms';
const DB_VERSION = 1;
const STORE = 'roms';

export interface StoredZip {
  /** the file name it was dropped or fetched as (`pacman.zip`) */
  name: string;
  bytes: ArrayBuffer;
}

export interface RomRecord {
  /** machine short name (`config.game`); one set per machine */
  game: string;
  /** every zip that took part in the accepted set, in the order supplied */
  zips: StoredZip[];
  addedAt: number;
}

export interface RomStore {
  /** false => in-memory fallback; the set lasts only this session */
  persistent: boolean;
  get(game: string): Promise<RomRecord | null>;
  put(record: RomRecord): Promise<void>;
  remove(game: string): Promise<void>;
  /** every machine with a stored set, for the menu */
  games(): Promise<string[]>;
}

function req<T>(r: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

class IdbRomStore implements RomStore {
  persistent = true;
  private db: IDBDatabase;
  constructor(db: IDBDatabase) { this.db = db; }

  private store(mode: IDBTransactionMode): IDBObjectStore {
    return this.db.transaction(STORE, mode).objectStore(STORE);
  }
  async get(game: string): Promise<RomRecord | null> {
    return ((await req(this.store('readonly').get(game))) as RomRecord | undefined) ?? null;
  }
  async put(record: RomRecord): Promise<void> {
    await req(this.store('readwrite').put(record));
  }
  async remove(game: string): Promise<void> {
    await req(this.store('readwrite').delete(game));
  }
  async games(): Promise<string[]> {
    return ((await req(this.store('readonly').getAllKeys())) as string[]).sort();
  }
}

class MemoryRomStore implements RomStore {
  persistent = false;
  private map = new Map<string, RomRecord>();
  async get(game: string): Promise<RomRecord | null> { return this.map.get(game) ?? null; }
  async put(record: RomRecord): Promise<void> { this.map.set(record.game, record); }
  async remove(game: string): Promise<void> { this.map.delete(game); }
  async games(): Promise<string[]> { return [...this.map.keys()].sort(); }
}

let storePromise: Promise<RomStore> | undefined;

export function openRomStore(): Promise<RomStore> {
  storePromise ??= (async () => {
    try {
      if (typeof indexedDB === 'undefined') throw new Error('no indexedDB');
      const open = indexedDB.open(DB_NAME, DB_VERSION);
      open.onupgradeneeded = () => {
        const db = open.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'game' });
      };
      const db = await req(open as IDBRequest<IDBDatabase>);
      // some browsers only fail on first use — probe with a harmless read
      await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
      return new IdbRomStore(db);
    } catch {
      return new MemoryRomStore();
    }
  })();
  return storePromise;
}
