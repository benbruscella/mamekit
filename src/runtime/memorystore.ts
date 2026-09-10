// The machine's memory between sessions, kept in the visitor's own browser
// (IndexedDB `mamekit-memory`): what MAME writes to its nvram directory at
// exit and what the hiscore plugin writes to its .hi file. One record per
// machine, keyed by the machine alone rather than by build identity, because
// battery RAM and a score table are bytes at a fixed size that outlive a
// rebuild; a size that no longer matches is skipped at load, never forced.
// Nothing here is a ROM byte. The menu's legacy-storage purge must never
// target this DB. Issue #132.
//
// When IndexedDB is unavailable the store degrades to a per-session Map with
// the same interface and `persistent: false`.

const DB_NAME = 'mamekit-memory';
const DB_VERSION = 1;
const STORE = 'memory';

export interface MemoryRecord {
  /** machine short name (`config.game`) */
  game: string;
  /** NVRAM shares and regions, by the MAME tag that declared them */
  shares: Record<string, Uint8Array>;
  regions: Record<string, Uint8Array>;
  /** the hiscore.dat rows' bytes, in row order (the plugin's .hi file) */
  hiscore?: Uint8Array[];
  updatedAt: number;
}

export interface MemoryStore {
  /** false => in-memory fallback; memory lasts only this session */
  persistent: boolean;
  get(game: string): Promise<MemoryRecord | null>;
  put(record: MemoryRecord): Promise<void>;
  remove(game: string): Promise<void>;
}

function req<T>(r: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

class IdbMemoryStore implements MemoryStore {
  persistent = true;
  private db: IDBDatabase;
  constructor(db: IDBDatabase) { this.db = db; }

  private store(mode: IDBTransactionMode): IDBObjectStore {
    return this.db.transaction(STORE, mode).objectStore(STORE);
  }
  async get(game: string): Promise<MemoryRecord | null> {
    return ((await req(this.store('readonly').get(game))) as MemoryRecord | undefined) ?? null;
  }
  async put(record: MemoryRecord): Promise<void> {
    await req(this.store('readwrite').put(record));
  }
  async remove(game: string): Promise<void> {
    await req(this.store('readwrite').delete(game));
  }
}

class InMemoryStore implements MemoryStore {
  persistent = false;
  private map = new Map<string, MemoryRecord>();
  async get(game: string): Promise<MemoryRecord | null> { return this.map.get(game) ?? null; }
  async put(record: MemoryRecord): Promise<void> { this.map.set(record.game, record); }
  async remove(game: string): Promise<void> { this.map.delete(game); }
}

let storePromise: Promise<MemoryStore> | undefined;

export function openMemoryStore(): Promise<MemoryStore> {
  storePromise ??= (async () => {
    try {
      if (typeof indexedDB === 'undefined') throw new Error('no indexedDB');
      const open = indexedDB.open(DB_NAME, DB_VERSION);
      open.onupgradeneeded = () => {
        const db = open.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'game' });
      };
      const db = await req(open as IDBRequest<IDBDatabase>);
      await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
      return new IdbMemoryStore(db);
    } catch {
      return new InMemoryStore();
    }
  })();
  return storePromise;
}
