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
function req(r) {
    return new Promise((resolve, reject) => {
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
    });
}
class IdbMemoryStore {
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
}
class InMemoryStore {
    persistent = false;
    map = new Map();
    async get(game) { return this.map.get(game) ?? null; }
    async put(record) { this.map.set(record.game, record); }
    async remove(game) { this.map.delete(game); }
}
let storePromise;
export function openMemoryStore() {
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
            await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
            return new IdbMemoryStore(db);
        }
        catch {
            return new InMemoryStore();
        }
    })();
    return storePromise;
}
