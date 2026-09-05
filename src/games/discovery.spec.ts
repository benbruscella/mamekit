import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { discoverGames } from './discovery.ts';

const root = mkdtempSync(join(tmpdir(), 'mamekit-discovery-'));
try {
  writeFileSync(join(root, '1942.game.ts'), 'export const _1942 = {};');
  writeFileSync(join(root, '1942.game.spec.ts'), '');
  mkdirSync(join(root, 'candidates'));
  writeFileSync(join(root, 'candidates/future.game.ts'), 'export const future = {};');
  writeFileSync(join(root, 'candidates/future.game.spec.ts'), '');
  mkdirSync(join(root, 'disabled'));
  writeFileSync(join(root, 'disabled/parked.game.ts'), 'export const parked = {};');
  writeFileSync(join(root, 'disabled/parked.game.spec.ts'), '');
  writeFileSync(join(root, 'helper.ts'), 'export const helper = true;');
  writeFileSync(join(root, 'helper.spec.ts'), '');

  assert.deepEqual(
    discoverGames(root).map(({ game, lifecycle }) => ({ game, lifecycle })),
    [
      { game: '1942', lifecycle: 'accepted' },
      { game: 'future', lifecycle: 'candidate' },
    ],
  );
  assert.deepEqual(
    discoverGames(root, ['disabled']).map(game => game.game),
    ['parked'],
  );

  writeFileSync(join(root, 'orphan.game.ts'), 'export const orphan = {};');
  assert.throws(() => discoverGames(root), /orphan\.game\.ts.*has no game spec/s);
  rmSync(join(root, 'orphan.game.ts'));

  writeFileSync(join(root, 'candidates/1942.game.ts'), 'export const _1942 = {};');
  writeFileSync(join(root, 'candidates/1942.game.spec.ts'), '');
  assert.throws(() => discoverGames(root), /registered in more than one lifecycle/);
} finally {
  rmSync(root, { recursive: true, force: true });
}

console.log('discovery.spec: strict lifecycle discovery passed');
