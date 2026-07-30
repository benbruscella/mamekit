import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { discoverGameNames } from '../src/games/discovery.ts';
import { readZip } from '../src/runtime/zip.ts';
import { DATA_DIR } from '../src/paths.ts';

const root = resolve(import.meta.dirname, '..');
const requested = process.argv.slice(2);
const games = requested.length ? requested : discoverGameNames(join(root, 'src/games'));

for (const game of games) await auditGame(game);
console.log(`game package audit passed: ${games.join(', ')}`);

async function auditGame(game: string): Promise<void> {
  requireFile(`src/games/${game}.ts`);
  requireFile(`src/games/${game}.spec.ts`);

  const category = ['arcade', 'consoles'].find(candidate =>
    existsSync(join(root, `dist/games/${candidate}/${game}/config.json`)));
  assert.ok(category, `${game}: generate the game before auditing its package`);
  const dataPath = `dist/games/${category}/${game}`;
  const meta = JSON.parse(readFileSync(join(root, dataPath, 'meta.json'), 'utf8')) as {
    game?: string;
    hasHistory?: boolean;
  };
  assert.equal(meta.game, game);
  assert.equal(
    meta.hasHistory,
    true,
    `${game}: no Gaming History entry was extracted from ${DATA_DIR}/artwork/data/history/history.xml`,
  );
  for (const file of ['config.json', 'DOSSIER.md', 'history.txt']) {
    requireFile(`${dataPath}/${file}`);
  }

  for (const path of [
    `${DATA_DIR}/artwork/covers/${game}.png`,
    `${DATA_DIR}/artwork/media/cabinets/${game}.png`,
    `${DATA_DIR}/artwork/media/marquees/${game}.png`,
  ]) {
    requirePng(path);
  }

  const zipPath = `${DATA_DIR}/artwork/${game}.zip`;
  requireFile(zipPath);
  const entries = await readZip(new Uint8Array(readFileSync(join(root, zipPath))));
  const layout = entries.get('default.lay');
  assert.ok(layout, `${game}: ${zipPath} has no default.lay`);
  const xml = new TextDecoder().decode(layout);
  const images = [...xml.matchAll(/<image\s+file="([^"]+)"/g)].map(match =>
    match[1]!.toLowerCase());
  assert.ok(images.length, `${game}: ${zipPath} layout references no images`);
  for (const image of images) {
    assert.ok(entries.has(image), `${game}: ${zipPath} is missing layout image ${image}`);
  }
}

function requireFile(path: string): void {
  assert.ok(existsSync(join(root, path)), `missing ${path}`);
}

function requirePng(path: string): void {
  requireFile(path);
  const bytes = readFileSync(join(root, path));
  assert.deepEqual(
    [...bytes.subarray(0, 8)],
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    `${path}: expected PNG data (not only a .png extension)`,
  );
}
