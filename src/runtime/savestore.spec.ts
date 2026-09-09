import assert from 'node:assert/strict';
import { machineIdentity, openSaveStore, saveByteLength, saveId, type SaveRecord } from './savestore.ts';
import type { MachineState } from './types.ts';

const store = await openSaveStore();
assert.equal(store.persistent, false, 'Node must use the documented in-memory fallback');

const state: MachineState = {
  format: 1,
  game: 'pacman',
  frame: 420,
  regions: { nvram: Uint8Array.of(1, 2) },
  shares: { work: new Uint8Array(16) },
  roots: { cpus: new Map([['maincpu', { m_pc: 0x1234, m_af: { value: 7 } }]]), frame: 420 },
};
const record = (createdAt: number): SaveRecord => ({
  id: saveId('pacman', createdAt),
  game: 'pacman',
  identity: 'pacman|x|maincpu=00000000',
  title: 'Pac-Man',
  frame: 420,
  createdAt,
  state,
});

await store.put(record(10));
await store.put(record(30));
await store.put(record(20));
assert.deepEqual((await store.list('pacman')).map(save => save.createdAt), [30, 20, 10], 'newest first');
assert.deepEqual(await store.list('other'), []);
assert.equal((await store.get(saveId('pacman', 20)))?.frame, 420);
await store.remove(saveId('pacman', 20));
assert.equal(await store.get(saveId('pacman', 20)), null);
assert.equal(saveByteLength(state), 2 + 16 + 8 + 8 + 8, 'regions, shares and walked scalars');

// identity: the machine, its board facts and every region's bytes
const regions = { maincpu: Uint8Array.of(1, 2, 3), gfx1: Uint8Array.of(9) };
const identity = machineIdentity('pacman', { cpus: 1 }, regions);
assert.match(identity, /^pacman\|[0-9a-f]{8}\|gfx1=[0-9a-f]{8},maincpu=[0-9a-f]{8}$/);
assert.equal(machineIdentity('pacman', { cpus: 1 }, { gfx1: regions.gfx1, maincpu: regions.maincpu }), identity, 'region order does not matter');
assert.notEqual(machineIdentity('pacman', { cpus: 2 }, regions), identity, 'different board facts');
assert.notEqual(machineIdentity('pacman', { cpus: 1 }, { ...regions, maincpu: Uint8Array.of(1, 2, 4) }), identity, 'different dump');
assert.notEqual(machineIdentity('mspacman', { cpus: 1 }, regions), identity, 'different machine');

console.log('savestore.spec: fallback storage, ordering, removal, size and identity passed');
