// The systems the ROM library keeps a shelf for, derived rather than listed.
//
// A system is a folder under .data/roms that one or more generated machines
// read from: `arcade`, `consoles/a2600`, `computers/c64` (which both the NTSC
// and PAL C64 share). Which machines exist comes from the game contracts, the
// same discovery `gen:all` uses; where each one's software lives and which
// software lists it mounts come from its generated config.json, which carries
// the runtime's own keys (`dataPath`, `software.dumpsKey`). Nothing here names
// a console, a computer or a list.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadRegisteredGameContracts } from '../../src/games/contracts.ts';
import { discoverGames } from '../../src/games/discovery.ts';
import { gameOutputDir, type GameCategory } from '../../src/gen/output-layout.ts';
import {
  dependencyRomSets, isDumpedRom, requiredRomRegions, type RomLoad, type RomRegionSpec, type ShellConfig,
} from '../../src/runtime/shell.ts';
import { machineSetDir } from '../../src/runtime/rom-source.ts';

export interface Machine {
  game: string;
  lifecycle: 'accepted' | 'candidate';
  /** absent until the target is generated */
  config?: ShellConfig;
}

export interface System {
  /** folder below .data/roms: "arcade", "consoles/a2600", "computers/c64" */
  key: string;
  category: GameCategory;
  machines: Machine[];
  /** software lists the machines mount, in first-seen order */
  lists: string[];
}

export interface Systems {
  systems: System[];
  /** contracts parked under src/games/disabled: their sets are kept, not quarantined */
  parked: string[];
  /** machines with no generated config.json, so no ROM manifest to check sets against */
  ungenerated: string[];
}

export async function loadSystems(distDir: string): Promise<Systems> {
  const loaded = await loadRegisteredGameContracts(['accepted', 'candidate']);
  const byKey = new Map<string, System>();
  const ungenerated: string[] = [];
  const seen = new Set<string>();
  for (const { target, registration } of loaded) {
    if (seen.has(target.game)) continue;
    seen.add(target.game);
    const configPath = join(gameOutputDir(distDir, target.category, target.game), 'config.json');
    const config = existsSync(configPath)
      ? JSON.parse(readFileSync(configPath, 'utf8')) as ShellConfig
      : undefined;
    if (!config) ungenerated.push(target.game);
    const key = target.category === 'arcade' ? 'arcade'
      : target.category === 'consoles' ? config?.dataPath.replace(/^games\//, '') ?? `consoles/${target.game}`
      : config?.software?.dumpsKey ?? `computers/${target.game}`;
    const system = byKey.get(key) ?? { key, category: target.category, machines: [], lists: [] };
    system.machines.push({ game: target.game, lifecycle: registration.lifecycle as Machine['lifecycle'], ...(config ? { config } : {}) });
    const lists = [
      ...(config?.cart?.list ? [config.cart.list] : []),
      ...(config?.software?.shelves.map(shelf => shelf.list) ?? []),
      ...(target.media ?? []).flatMap(medium => medium.softwareLists ?? []),
    ];
    for (const list of lists) if (!system.lists.includes(list)) system.lists.push(list);
    byKey.set(key, system);
  }
  const systems = [...byKey.values()].sort((a, b) =>
    ['arcade', 'consoles', 'computers'].indexOf(a.category) - ['arcade', 'consoles', 'computers'].indexOf(b.category) ||
    a.key.localeCompare(b.key));
  return { systems, parked: discoverGames(undefined, ['disabled']).map(game => game.game), ungenerated };
}

/** The folder a list's dumps are filed in, relative to .data/roms. */
export function shelfKey(system: System, list: string): string {
  // A console has one list and its cartridges sit in the console's own folder;
  // a computer mounts several media, one folder per list (computers/c64/c64_cass).
  return system.category === 'computers' ? `${system.key}/${list}` : system.key;
}

/** Where a machine's own ROM sets are filed, relative to .data/roms. */
export function biosKey(system: System): string {
  return machineSetDir(system.category, system.key);
}

/** The sets a machine needs beyond any software: its own, its parent's, its devices'. */
export function machineSets(machine: Machine): string[] {
  const roms = machine.config?.roms ?? [];
  if (!roms.some(spec => spec.loads.some(isDumpedRom))) return [];
  return [machine.game, ...dependencyRomSets(roms, machine.game)];
}

/** Regions the machine cannot run without, as the shell and the harness decide it. */
export function criticalRegions(config: ShellConfig): Set<string> {
  return requiredRomRegions(config.roms, config.board.cpus.map(cpu => cpu.region));
}

/**
 * The chips one of a machine's sets supplies: a region it owns outright (a
 * device or parent set), the chips attributed to it inside the machine's own
 * regions, or -- for the machine's own set -- everything else.
 */
export function setLoads(machine: Machine, set: string): RomLoad[] {
  const roms = machine.config?.roms ?? [];
  return roms.flatMap(spec => spec.loads.filter(load => {
    if (!isDumpedRom(load)) return false;
    const owner = load.romSet ?? spec.romSet ?? machine.game;
    return owner === set;
  }));
}

/** Every chip CRC a machine accepts, alternates (clone revisions) included. */
export function acceptedCrcs(roms: RomRegionSpec[]): Map<string, 'load' | 'alternate'> {
  const out = new Map<string, 'load' | 'alternate'>();
  for (const spec of roms) {
    for (const load of spec.loads) {
      if (!isDumpedRom(load)) continue;
      out.set(load.crc.toLowerCase(), 'load');
      for (const alt of load.alt ?? []) if (!out.has(alt.crc.toLowerCase())) out.set(alt.crc.toLowerCase(), 'alternate');
    }
  }
  return out;
}
