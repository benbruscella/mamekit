// Browser-side save states. A visitor's saves live in THEIR OWN browser
// (IndexedDB `mamekit-saves`), the same policy the cartridge library follows:
// nothing ever touches the server, Delete removes, and the menu's legacy
// storage purge must never target this DB. A save carries RAM and registers
// (see machine-state.ts) and never a ROM byte the visitor did not supply.
//
// When IndexedDB is unavailable (private browsing, quota, disabled) the store
// degrades to a per-session in-memory Map with the same interface and
// `persistent: false`, so the deck can say so.
import { crc32 } from "./zip.js";
const DB_NAME = 'mamekit-saves';
const DB_VERSION = 1;
const STORE = 'saves';
/**
 * What a save must match to load: the machine, its assembled ROM set (a
 * different dump, patch or cartridge is a different machine) and the board
 * facts the shell booted it with. Region bytes are hashed once at boot.
 */
export function machineIdentity(game, boardFacts, regions) {
    const parts = Object.entries(regions)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([tag, bytes]) => `${tag}=${crc32(bytes).toString(16).padStart(8, '0')}`);
    const facts = crc32(new TextEncoder().encode(JSON.stringify(boardFacts))).toString(16).padStart(8, '0');
    return `${game}|${facts}|${parts.join(',')}`;
}
export function saveId(game, createdAt) {
    return `${game}:${createdAt.toString(36)}`;
}
function req(r) {
    return new Promise((resolve, reject) => {
        r.onsuccess = () => resolve(r.result);
        r.onerror = () => reject(r.error);
    });
}
class IdbSaveStore {
    persistent = true;
    db;
    constructor(db) { this.db = db; }
    store(mode) {
        return this.db.transaction(STORE, mode).objectStore(STORE);
    }
    async list(game) {
        const all = await req(this.store('readonly').index('game').getAll(game));
        return all.sort((a, b) => b.createdAt - a.createdAt);
    }
    async get(id) {
        return (await req(this.store('readonly').get(id))) ?? null;
    }
    async put(record) {
        await req(this.store('readwrite').put(record));
    }
    async remove(id) {
        await req(this.store('readwrite').delete(id));
    }
}
class MemorySaveStore {
    persistent = false;
    map = new Map();
    async list(game) {
        return [...this.map.values()].filter(r => r.game === game).sort((a, b) => b.createdAt - a.createdAt);
    }
    async get(id) { return this.map.get(id) ?? null; }
    async put(record) { this.map.set(record.id, record); }
    async remove(id) { this.map.delete(id); }
}
let storePromise;
export function openSaveStore() {
    storePromise ??= (async () => {
        try {
            if (typeof indexedDB === 'undefined')
                throw new Error('no indexedDB');
            const open = indexedDB.open(DB_NAME, DB_VERSION);
            open.onupgradeneeded = () => {
                const db = open.result;
                if (!db.objectStoreNames.contains(STORE)) {
                    const s = db.createObjectStore(STORE, { keyPath: 'id' });
                    s.createIndex('game', 'game');
                }
            };
            const db = await req(open);
            // some browsers only fail on first use — probe with a harmless read
            await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
            return new IdbSaveStore(db);
        }
        catch {
            return new MemorySaveStore();
        }
    })();
    return storePromise;
}
/** Bytes a save occupies, for the shelf's label. */
export function saveByteLength(state) {
    let total = 0;
    for (const bytes of Object.values(state.regions))
        total += bytes.byteLength;
    for (const bytes of Object.values(state.shares))
        total += bytes.byteLength;
    const walk = (node) => {
        if (ArrayBuffer.isView(node)) {
            total += node.byteLength;
            return;
        }
        if (node instanceof Map) {
            for (const item of node.values())
                walk(item);
            return;
        }
        if (Array.isArray(node)) {
            for (const item of node)
                walk(item);
            return;
        }
        if (typeof node === 'object' && node !== null) {
            for (const item of Object.values(node))
                walk(item);
            return;
        }
        total += 8;
    };
    walk(state.roots);
    return total;
}
