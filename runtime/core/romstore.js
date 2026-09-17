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
function req(r) {
    return new Promise((resolve, reject) => {
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
    });
}
class IdbRomStore {
    persistent = true;
    db;
    constructor(db) { this.db = db; }
    store(mode) {
        return this.db.transaction(STORE, mode).objectStore(STORE);
    }
    async get(game) {
        return (await req(this.store('readonly').get(game))) ?? null;
    }
    async put(record) {
        await req(this.store('readwrite').put(record));
    }
    async remove(game) {
        await req(this.store('readwrite').delete(game));
    }
    async games() {
        return (await req(this.store('readonly').getAllKeys())).sort();
    }
}
class MemoryRomStore {
    persistent = false;
    map = new Map();
    async get(game) { return this.map.get(game) ?? null; }
    async put(record) { this.map.set(record.game, record); }
    async remove(game) { this.map.delete(game); }
    async games() { return [...this.map.keys()].sort(); }
}
let storePromise;
export function openRomStore() {
    storePromise ??= (async () => {
        try {
            if (typeof indexedDB === 'undefined')
                throw new Error('no indexedDB');
            const open = indexedDB.open(DB_NAME, DB_VERSION);
            open.onupgradeneeded = () => {
                const db = open.result;
                if (!db.objectStoreNames.contains(STORE))
                    db.createObjectStore(STORE, { keyPath: 'game' });
            };
            const db = await req(open);
            // some browsers only fail on first use — probe with a harmless read
            await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
            return new IdbRomStore(db);
        }
        catch {
            return new MemoryRomStore();
        }
    })();
    return storePromise;
}
