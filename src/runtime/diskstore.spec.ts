// Written disks are kept by family, set and image; with no IndexedDB (Node,
// a private window) they last the session, and the store says so.

import assert from 'node:assert/strict';
import { diskId, openDiskStore } from './diskstore.ts';

assert.equal(diskId('c64', 'c64:2a9b1c3d', 'side1.g64'), 'c64:c64:2a9b1c3d:side1.g64');
const store = await openDiskStore();
assert.equal(store.persistent, false, 'no IndexedDB here: kept for the session only');
const id = diskId('c64', 'set', 'disk.d64');
assert.equal(await store.get(id), null);
await store.put({ id, family: 'c64', set: 'set', image: 'disk.d64', savedAt: 1, state: { tracks: [1, 2] } });
assert.deepEqual((await store.get(id))?.state, { tracks: [1, 2] });
await store.remove(id);
assert.equal(await store.get(id), null);
assert.equal(await openDiskStore(), store, 'one store for the page');

console.log('diskstore.spec: ids, the session fallback and the round trip passed');
