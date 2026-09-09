import assert from 'node:assert/strict';
import { openRomStore } from './romstore.ts';

const store = await openRomStore();
assert.equal(store.persistent, false, 'Node must use the documented in-memory fallback');
assert.equal(await store.get('pacman'), null);
assert.deepEqual(await store.games(), []);

const zip = (name: string, ...bytes: number[]) => ({ name, bytes: Uint8Array.of(...bytes).buffer });
await store.put({ game: 'pacman', zips: [zip('pacman.zip', 1, 2, 3)], addedAt: 10 });
await store.put({ game: 'galaga', zips: [zip('galaga.zip', 4), zip('namco51.zip', 5)], addedAt: 20 });
assert.deepEqual((await store.get('pacman'))?.zips.map(z => z.name), ['pacman.zip']);
assert.deepEqual((await store.get('galaga'))?.zips.map(z => z.name), ['galaga.zip', 'namco51.zip'], 'companion sets travel with the game');
assert.deepEqual(await store.games(), ['galaga', 'pacman'], 'sorted for the menu');

await store.put({ game: 'pacman', zips: [zip('pacman.zip', 9)], addedAt: 30 });
assert.equal(new Uint8Array((await store.get('pacman'))!.zips[0]!.bytes)[0], 9, 'one set per machine: a new drop replaces');
await store.remove('pacman');
assert.equal(await store.get('pacman'), null);
assert.deepEqual(await store.games(), ['galaga']);
assert.equal(await openRomStore(), store, 'one store per page');

console.log('romstore.spec: fallback storage, replace, removal and listing passed');
