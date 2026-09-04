import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { discoverGameNames, gameRegistration } from '../src/games/discovery.ts';
import { readZip } from '../src/runtime/zip.ts';
import { DATA_DIR } from '../src/paths.ts';

const root = resolve(import.meta.dirname, '..');
const requested = process.argv.slice(2);
const games = requested.length ? requested : discoverGameNames(join(root, 'src/games'));

for (const game of games) await auditGame(game);
console.log(`game package audit passed: ${games.join(', ')}`);

async function auditGame(game: string): Promise<void> {
  const registration = gameRegistration(game, join(root, 'src/games'));
  assert.ok(registration, `${game}: no game registration`);
  requireFile(registration.modulePath.slice(root.length + 1));
  requireFile(registration.specPath.slice(root.length + 1));

  const category = ['arcade', 'consoles', 'computers'].find(candidate =>
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
  // Only the images a view actually draws. A MAME pack may declare an element
  // no view references — Mr. Do!'s official pack carries a leftover work-in-
  // progress element whose PNG was never shipped — and neither MAME nor the
  // bezel builder ever asks for that file.
  for (const image of drawnImages(xml)) {
    assert.ok(entries.has(image), `${game}: ${zipPath} is missing layout image ${image}`);
  }
}

/** Layout images reachable from a `<view>`, lowercased as the zip stores them. */
function drawnImages(xml: string): string[] {
  const elementFiles = new Map<string, string[]>();
  for (const element of xml.matchAll(
    /<element\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/element>/g,
  )) {
    elementFiles.set(
      element[1]!,
      [...element[2]!.matchAll(/<image\s+file="([^"]+)"/g)]
        .map(image => image[1]!.toLowerCase()),
    );
  }
  const drawn = new Set<string>();
  for (const view of xml.matchAll(/<view\s[^>]*>([\s\S]*?)<\/view>/g)) {
    for (const reference of view[1]!.matchAll(/\belement="([^"]+)"/g)) {
      for (const file of elementFiles.get(reference[1]!) ?? []) drawn.add(file);
    }
    // A view may also name an image inline rather than through an element.
    for (const inline of view[1]!.matchAll(/<image\s+file="([^"]+)"/g)) {
      drawn.add(inline[1]!.toLowerCase());
    }
  }
  return [...drawn];
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
