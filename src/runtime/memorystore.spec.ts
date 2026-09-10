import assert from 'node:assert/strict';
import { openMemoryStore } from './memorystore.ts';

const store = await openMemoryStore();
assert.equal(store.persistent, false, 'Node must use the documented in-memory fallback');
assert.equal(await store.get('joust'), null);

await store.put({ game: 'joust', shares: { nvram: Uint8Array.of(1, 2, 3) }, regions: {}, updatedAt: 1 });
await store.put({ game: 'pacman', shares: {}, regions: {}, hiscore: [Uint8Array.of(0x12, 0x34), Uint8Array.of(9)], updatedAt: 2 });
assert.deepEqual([...(await store.get('joust'))!.shares.nvram!], [1, 2, 3]);
assert.deepEqual((await store.get('pacman'))!.hiscore!.map(row => [...row]), [[0x12, 0x34], [9]]);
await store.put({ game: 'joust', shares: { nvram: Uint8Array.of(7) }, regions: {}, updatedAt: 3 });
assert.deepEqual([...(await store.get('joust'))!.shares.nvram!], [7], 'one record per machine: a write replaces');
await store.remove('joust');
assert.equal(await store.get('joust'), null);
assert.equal(await openMemoryStore(), store, 'one store per page');

console.log('memorystore.spec: fallback storage, replace and removal passed');
