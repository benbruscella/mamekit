/** Download the exact ROM-set closure needed by accepted contracts.
 *
 * The application already offers these immutable objects from its public ROM
 * mirror. CI uses the same source instead of storing copyrighted archives in
 * git, an Actions artifact, or a secret. Each archive is still verified by the
 * acceptance harness against MAME's declared file sizes and CRCs before any
 * machine runs.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { ShellConfig } from '../runtime/shell.ts';
import { unresolvedDependencyRomSets } from '../runtime/shell.ts';
import { ROM_BUCKET_BASE, encodeRomKey } from '../runtime/rom-source.ts';
import { readZip } from '../runtime/zip.ts';
import { gameOutputDir } from '../gen/output-layout.ts';
import { romsDir } from '../paths.ts';
import { loadGameContracts } from './contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const parallelism = 8;

interface RomRequirement {
  category: string;
  set: string;
}

function key(requirement: RomRequirement): string {
  return `${requirement.category}/${requirement.set}`;
}

async function fetchArchive(requirement: RomRequirement): Promise<Uint8Array> {
  const objectKey = `${key(requirement)}.zip`;
  const base = (process.env.MAMEKIT_ACCEPTANCE_ROM_BASE ?? ROM_BUCKET_BASE).replace(/\/$/, '');
  const url = `${base}/${encodeRomKey(objectKey)}`;
  let last = 'request failed';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
      last = `HTTP ${response.status}`;
      if (response.status === 404) break;
    } catch (error) {
      last = error instanceof Error ? error.message : String(error);
    }
    await new Promise(resolveWait => setTimeout(resolveWait, attempt * 1_000));
  }
  throw new Error(`${objectKey}: ${last}`);
}

async function downloadMissing(requirements: RomRequirement[]): Promise<Map<string, Uint8Array>> {
  const unique = [...new Map(requirements.map(requirement => [key(requirement), requirement])).values()];
  const downloaded = new Map<string, Uint8Array>();
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(parallelism, unique.length) }, async () => {
    while (cursor < unique.length) {
      const requirement = unique[cursor++]!;
      const path = join(romsDir(projectRoot), requirement.category, `${requirement.set}.zip`);
      if (existsSync(path)) {
        downloaded.set(key(requirement), new Uint8Array(readFileSync(path)));
        continue;
      }
      const bytes = await fetchArchive(requirement);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, bytes);
      downloaded.set(key(requirement), bytes);
      console.log(`fetched ${key(requirement)}.zip (${bytes.length} bytes)`);
    }
  }));
  return downloaded;
}

export async function fetchAcceptanceRoms(): Promise<void> {
  const contracts = await loadGameContracts();
  const machines = [...new Map(contracts.map(contract => [
    `${contract.category}/${contract.game}`,
    { category: contract.category, game: contract.game },
  ])).values()];
  const primary = machines.map(machine => ({ category: machine.category, set: machine.game }));
  const archives = await downloadMissing(primary);

  const dependencies: RomRequirement[] = [];
  for (const machine of machines) {
    const configPath = join(
      gameOutputDir(join(projectRoot, 'dist'), machine.category, machine.game),
      'config.json',
    );
    if (!existsSync(configPath)) {
      throw new Error(`${machine.game}: generate the accepted distribution before fetching ROMs`);
    }
    const config = JSON.parse(readFileSync(configPath, 'utf8')) as ShellConfig;
    const bytes = archives.get(`${machine.category}/${machine.game}`)!;
    const files = await readZip(bytes);
    for (const set of unresolvedDependencyRomSets(config.roms, machine.game, files)) {
      dependencies.push({ category: machine.category, set });
    }
  }
  await downloadMissing(dependencies);
  console.log(
    `acceptance ROM closure ready: ${primary.length} primary set(s), ` +
    `${new Set(dependencies.map(key)).size} dependency set(s)`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await fetchAcceptanceRoms();
}
