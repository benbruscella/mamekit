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
import { romSystemKey, unresolvedDependencyRomSets } from '../runtime/shell.ts';
import { ROM_BUCKET_BASE, encodeRomKey, machineSetDir, machineSetKeys } from '../runtime/rom-source.ts';
import { readZip } from '../runtime/zip.ts';
import { gameOutputDir } from '../gen/output-layout.ts';
import { romsDir } from '../paths.ts';
import { loadGameContracts } from './contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const parallelism = 8;

interface RomRequirement {
  /** folder below the ROM root: "arcade", "consoles/coleco/bios", "consoles/nes" */
  dir: string;
  set: string;
  /**
   * Every key the set may be filed under, in the order to try, when there is
   * more than `dir/set.zip`: a clone's firmware under its family's name
   * (computers/c64/bios/c64.zip for c64p), and console BIOS sets at the
   * category root, where they sat until issue #162 (machineSetKeys).
   */
  keys?: string[];
}

function key(requirement: RomRequirement): string {
  return `${requirement.dir}/${requirement.set}`;
}

function requirementKeys(requirement: RomRequirement): string[] {
  return requirement.keys ?? [`${key(requirement)}.zip`];
}

/** The requirement for a machine's own set, under any name the app tries for it. */
function machineSet(category: string, system: string | undefined, set: string): RomRequirement {
  return { dir: machineSetDir(category, system ?? category), set, keys: machineSetKeys(set, category, system) };
}

/** One of a machine's dependency sets (c1541.zip beside c64.zip), which has only its own name. */
function dependencySet(category: string, system: string | undefined, set: string): RomRequirement {
  const dir = machineSetDir(category, system ?? category);
  return { dir, set, keys: [...new Set([`${dir}/${set}.zip`, `${category}/${set}.zip`])] };
}

async function fetchArchive(requirement: RomRequirement): Promise<{ key: string; bytes: Uint8Array }> {
  const base = (process.env.MAMEKIT_ACCEPTANCE_ROM_BASE ?? ROM_BUCKET_BASE).replace(/\/$/, '');
  let last = 'request failed';
  for (const objectKey of requirementKeys(requirement)) {
    const url = `${base}/${encodeRomKey(objectKey)}`;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(url);
        if (response.ok) return { key: objectKey, bytes: new Uint8Array(await response.arrayBuffer()) };
        last = `${objectKey}: HTTP ${response.status}`;
        if (response.status === 404) break;
      } catch (error) {
        last = `${objectKey}: ${error instanceof Error ? error.message : String(error)}`;
      }
      await new Promise(resolveWait => setTimeout(resolveWait, attempt * 1_000));
    }
  }
  throw new Error(last);
}

async function downloadMissing(requirements: RomRequirement[]): Promise<Map<string, Uint8Array>> {
  const unique = [...new Map(requirements.map(requirement => [key(requirement), requirement])).values()];
  const downloaded = new Map<string, Uint8Array>();
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(parallelism, unique.length) }, async () => {
    while (cursor < unique.length) {
      const requirement = unique[cursor++]!;
      const local = requirementKeys(requirement).map(objectKey => join(romsDir(projectRoot), objectKey))
        .find(path => existsSync(path));
      if (local) {
        downloaded.set(key(requirement), new Uint8Array(readFileSync(local)));
        continue;
      }
      // Filed where the bucket had it, which is where the harness looks.
      const fetched = await fetchArchive(requirement);
      const path = join(romsDir(projectRoot), fetched.key);
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, fetched.bytes);
      downloaded.set(key(requirement), fetched.bytes);
      console.log(`fetched ${fetched.key} (${fetched.bytes.length} bytes)`);
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
  const configs = new Map(machines.map(machine => {
    const configPath = join(
      gameOutputDir(join(projectRoot, 'dist'), machine.category, machine.game),
      'config.json',
    );
    if (!existsSync(configPath)) {
      throw new Error(`${machine.game}: generate the accepted distribution before fetching ROMs`);
    }
    return [machine.game, JSON.parse(readFileSync(configPath, 'utf8')) as ShellConfig] as const;
  }));
  // A title is filed on its list's shelf, so a machine that plays one must
  // have been generated with that list: without its hash/<list>.xml (CI checks
  // out MAME sparsely) the machine has no shelves, no dumps folder, and every
  // key below would point at the category root.
  for (const contract of contracts) {
    if (contract.software && !configs.get(contract.game)!.software?.dumpsKey) {
      throw new Error(`${contract.game}: a scenario plays ${contract.software.list}:${contract.software.name}, but the ` +
        `generated machine has no software shelves -- generate it with hash/${contract.software.list}.xml in the MAME checkout`);
    }
  }
  // A console with nothing on board but its cartridge slot (the NES, the
  // 2600) has no set of its own; its cartridges sit in a folder named after it.
  const withSet = machines.filter(machine =>
    configs.get(machine.game)!.roms.some(rom => rom.loads?.length));
  const system = (game: string) => romSystemKey(configs.get(game)!);
  const primary = withSet.map(machine => machineSet(machine.category, system(machine.game), machine.game));
  const cartridges = [...new Map(contracts.flatMap(contract => contract.cartridge
    ? [[`${contract.category}/${contract.game}/${contract.cartridge}`, {
        dir: `${contract.category}/${contract.game}`,
        set: contract.cartridge,
      }] as const]
    : [])).values()];
  // A computer title sits on its list's shelf in the family's folder:
  // computers/c64/c64_cass/hero.zip.
  const titles = [...new Map(contracts.flatMap(contract => {
    const dumps = configs.get(contract.game)!.software?.dumpsKey;
    return contract.software && dumps
      ? [[`${dumps}/${contract.software.list}/${contract.software.name}`, {
          dir: `${dumps}/${contract.software.list}`,
          set: contract.software.name,
        }] as const]
      : [];
  })).values()];
  const archives = await downloadMissing([...primary, ...cartridges, ...titles]);

  const dependencies: RomRequirement[] = [];
  for (const machine of withSet) {
    const config = configs.get(machine.game)!;
    const bytes = archives.get(key(machineSet(machine.category, system(machine.game), machine.game)))!;
    const files = await readZip(bytes);
    for (const set of unresolvedDependencyRomSets(config.roms, machine.game, files)) {
      dependencies.push(dependencySet(machine.category, system(machine.game), set));
    }
  }
  await downloadMissing(dependencies);
  console.log(
    `acceptance ROM closure ready: ${primary.length} primary set(s), ` +
    `${cartridges.length} cartridge(s), ${titles.length} software title(s), ` +
    `${new Set(dependencies.map(key)).size} dependency set(s)`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await fetchAcceptanceRoms();
}
