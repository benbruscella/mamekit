import assert from 'node:assert/strict';
import { openCartStore, type CartRecord } from './cartstore.ts';

const store = await openCartStore();
assert.equal(store.persistent, false, 'Node must use the documented in-memory fallback');

const record = (id: string, consoleName: string, addedAt: number): CartRecord => ({
  id,
  console: consoleName,
  name: `${id}.nes`,
  bytes: Uint8Array.of(1, 2, 3).buffer,
  size: 3,
  addedAt,
  ines: { mapper: 0, prgSize: 1, chrSize: 1, mirroring: 'horizontal', battery: false },
  prgCrc: '12345678',
  chrCrc: null,
});

assert.deepEqual(await store.add(record('later', 'nes', 20)), { existed: false });
assert.deepEqual(await store.add(record('earlier', 'nes', 10)), { existed: false });
assert.deepEqual(await store.add(record('later', 'nes', 20)), { existed: true });
assert.deepEqual((await store.list('nes')).map(cart => cart.id), ['earlier', 'later']);
assert.deepEqual(await store.list('other'), []);
assert.equal((await store.get('later'))?.name, 'later.nes');
await store.remove('later');
assert.equal(await store.get('later'), null);

console.log('cartstore.spec: fallback storage, deduplication, ordering and removal passed');
