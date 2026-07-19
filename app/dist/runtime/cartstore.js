// Browser-side cartridge library. Console carts the visitor drops are
// remembered in THEIR OWN browser (IndexedDB `mamekit-carts`) so the console
// shelf survives reloads — reintroduced for consoles by explicit user
// approval (2026-07-07). Nothing ever touches the server (gotchas §24 still
// holds for fetching); Eject deletes; the menu's legacy-storage purge must
// never target this DB.
//
// When IndexedDB is unavailable (private browsing, quota, disabled) the store
// degrades to a per-session in-memory Map with the same interface and
// `persistent: false` so the room can show a banner.
const DB_NAME = 'mamekit-carts';
const DB_VERSION = 1;
const STORE = 'carts';
function req(r) {
    return new Promise((resolve, reject) => {
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
    });
}
class IdbCartStore {
    persistent = true;
    db;
    constructor(db) { this.db = db; }
    store(mode) {
        return this.db.transaction(STORE, mode).objectStore(STORE);
    }
    async list(consoleName) {
        const all = await req(this.store('readonly').index('console').getAll(consoleName));
        return all.sort((a, b) => a.addedAt - b.addedAt);
    }
    async get(id) {
        return (await req(this.store('readonly').get(id))) ?? null;
    }
    async add(rec) {
        if (await this.get(rec.id))
            return { existed: true };
        await req(this.store('readwrite').put(rec));
        return { existed: false };
    }
    async remove(id) {
        await req(this.store('readwrite').delete(id));
    }
}
class MemoryCartStore {
    persistent = false;
    map = new Map();
    async list(consoleName) {
        return [...this.map.values()].filter(r => r.console === consoleName).sort((a, b) => a.addedAt - b.addedAt);
    }
    async get(id) { return this.map.get(id) ?? null; }
    async add(rec) {
        if (this.map.has(rec.id))
            return { existed: true };
        this.map.set(rec.id, rec);
        return { existed: false };
    }
    async remove(id) { this.map.delete(id); }
}
let storePromise;
export function openCartStore() {
    storePromise ??= (async () => {
        try {
            if (typeof indexedDB === 'undefined')
                throw new Error('no indexedDB');
            const open = indexedDB.open(DB_NAME, DB_VERSION);
            open.onupgradeneeded = () => {
                const db = open.result;
                if (!db.objectStoreNames.contains(STORE)) {
                    const s = db.createObjectStore(STORE, { keyPath: 'id' });
                    s.createIndex('console', 'console');
                }
            };
            const db = await req(open);
            // some browsers only fail on first use — probe with a harmless read
            await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
            return new IdbCartStore(db);
        }
        catch {
            return new MemoryCartStore();
        }
    })();
    return storePromise;
}
