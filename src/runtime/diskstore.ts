// Disks the machine wrote, kept in the visitor's browser (issue #161).
//
// MAME writes a disk back to its image file when the drive lets it go and the
// disk is dirty (floppy_image_device::call_unload, `m_image_dirty`). A visitor's
// disk is a set in the browser rather than a file, so its written tracks are
// kept here instead, as battery-backed memory is: keyed by the set and the
// image within it, captured from the drive's own floppy_image, and put back
// over a freshly mounted copy of the same disk the next time it goes in. A
// game saved to disk stays saved.

/** One written disk: what the drive's floppy_image held, by set and image. */
export interface DiskRecord {
  /** `${family}:${set}:${image}` */
  id: string;
  /** the machine family the disk belongs to ("c64") */
  family: string;
  /** the set's own name or id in the room's library */
  set: string;
  /** the image within the set ("side1.g64") */
  image: string;
  savedAt: number;
  /** captureState of the drive's floppy_image (machine-state.ts) */
  state: unknown;
}

export interface DiskStore {
  /** false => in-memory fallback; written disks last only this session */
  persistent: boolean;
  get(id: string): Promise<DiskRecord | null>;
  put(record: DiskRecord): Promise<void>;
  remove(id: string): Promise<void>;
}

const DB_NAME = 'mamekit-disks';
const DB_VERSION = 1;
const STORE = 'disks';

export function diskId(family: string, set: string, image: string): string {
  return `${family}:${set}:${image}`;
}

function req<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

class IdbDiskStore implements DiskStore {
  persistent = true;
  private readonly db: IDBDatabase;
  constructor(db: IDBDatabase) { this.db = db; }
  private store(mode: IDBTransactionMode): IDBObjectStore {
    return this.db.transaction(STORE, mode).objectStore(STORE);
  }
  async get(id: string): Promise<DiskRecord | null> {
    return ((await req(this.store('readonly').get(id))) as DiskRecord | undefined) ?? null;
  }
  async put(record: DiskRecord): Promise<void> { await req(this.store('readwrite').put(record)); }
  async remove(id: string): Promise<void> { await req(this.store('readwrite').delete(id)); }
}

class MemoryDiskStore implements DiskStore {
  persistent = false;
  private readonly map = new Map<string, DiskRecord>();
  async get(id: string): Promise<DiskRecord | null> { return this.map.get(id) ?? null; }
  async put(record: DiskRecord): Promise<void> { this.map.set(record.id, record); }
  async remove(id: string): Promise<void> { this.map.delete(id); }
}

let storePromise: Promise<DiskStore> | undefined;

export function openDiskStore(): Promise<DiskStore> {
  storePromise ??= (async () => {
    try {
      if (typeof indexedDB === 'undefined') throw new Error('no indexedDB');
      const open = indexedDB.open(DB_NAME, DB_VERSION);
      open.onupgradeneeded = () => {
        if (!open.result.objectStoreNames.contains(STORE)) open.result.createObjectStore(STORE, { keyPath: 'id' });
      };
      const db = await req(open as IDBRequest<IDBDatabase>);
      await req(db.transaction(STORE, 'readonly').objectStore(STORE).count());
      return new IdbDiskStore(db);
    } catch {
      return new MemoryDiskStore();
    }
  })();
  return storePromise;
}
