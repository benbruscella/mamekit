// Browser-side ROM store — the ONLY source of ROM bytes in the app.
// ROMs are never served from the project tree or fetched from any URL:
// the user drops their own zip once and it is remembered here, in their
// browser's IndexedDB, for future sessions (covers, instant relaunch).
// Everything degrades gracefully when IndexedDB is unavailable.

const DB_NAME = 'mame2js-roms';
const STORE = 'zips';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T | null> {
  try {
    const db = await openDb();
    return await new Promise<T | null>((resolve, reject) => {
      const req = fn(db.transaction(STORE, mode).objectStore(STORE));
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null; // private-mode browsers etc. — fall back to drop-per-session
  }
}

/** The zip the user previously dropped for this game, if remembered. */
export async function loadRomZip(game: string): Promise<Uint8Array | null> {
  const bytes = await withStore<ArrayBuffer>('readonly', s => s.get(game) as IDBRequest<ArrayBuffer>);
  return bytes ? new Uint8Array(bytes) : null;
}

/** Remember a verified drop for future sessions. Best effort. */
export async function saveRomZip(game: string, bytes: Uint8Array): Promise<void> {
  const copy = bytes.slice().buffer; // detached, transaction-safe
  await withStore('readwrite', s => s.put(copy, game));
}

export async function hasRomZip(game: string): Promise<boolean> {
  const key = await withStore('readonly', s => s.getKey(game));
  return key !== null && key !== undefined;
}

export async function forgetRomZip(game: string): Promise<void> {
  await withStore('readwrite', s => s.delete(game));
}
