// Convention-driven target discovery. Accepted contracts live as
// `<game>.game.ts` + `<game>.game.spec.ts` here. Candidates use the same pair
// under candidates/, and disabled pairs remain under disabled/. The explicit
// suffix means infrastructure can have specs without becoming a target.

import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const gamesDir = dirname(fileURLToPath(import.meta.url));

export type GameLifecycle = 'accepted' | 'candidate' | 'disabled';

export interface DiscoveredGame {
  game: string;
  lifecycle: GameLifecycle;
  modulePath: string;
  specPath: string;
}

function discoverDirectory(dir: string, lifecycle: GameLifecycle): DiscoveredGame[] {
  if (!existsSync(dir)) return [];
  const files = new Set(readdirSync(dir));
  const modules = [...files]
    .filter(name => name.endsWith('.game.ts') && !name.endsWith('.game.spec.ts'))
    .map(name => name.slice(0, -'.game.ts'.length));
  const specs = [...files]
    .filter(name => name.endsWith('.game.spec.ts'))
    .map(name => name.slice(0, -'.game.spec.ts'.length));
  const orphanedModules = modules.filter(game => !specs.includes(game));
  const orphanedSpecs = specs.filter(game => !modules.includes(game));
  if (orphanedModules.length || orphanedSpecs.length) {
    const details = [
      ...orphanedModules.map(game => `${join(dir, `${game}.game.ts`)} has no game spec`),
      ...orphanedSpecs.map(game => `${join(dir, `${game}.game.spec.ts`)} has no game contract`),
    ];
    throw new Error(`invalid game registration:\n  ${details.join('\n  ')}`);
  }
  return modules.map(game => ({
    game,
    lifecycle,
    modulePath: join(dir, `${game}.game.ts`),
    specPath: join(dir, `${game}.game.spec.ts`),
  }));
}

export function discoverGames(
  root = gamesDir,
  lifecycles: readonly GameLifecycle[] = ['accepted', 'candidate'],
): DiscoveredGame[] {
  const registrations = [
    ...(lifecycles.includes('accepted') ? discoverDirectory(root, 'accepted') : []),
    ...(lifecycles.includes('candidate')
      ? discoverDirectory(join(root, 'candidates'), 'candidate')
      : []),
    ...(lifecycles.includes('disabled')
      ? discoverDirectory(join(root, 'disabled'), 'disabled')
      : []),
  ].sort((left, right) => left.game.localeCompare(right.game));
  const duplicate = registrations.find((registration, index) =>
    registrations.findIndex(candidate => candidate.game === registration.game) !== index);
  if (duplicate) throw new Error(`game "${duplicate.game}" is registered in more than one lifecycle`);
  return registrations;
}

/** Accepted game names by default; callers opt candidates in explicitly. */
export function discoverGameNames(
  dir = gamesDir,
  lifecycles: readonly GameLifecycle[] = ['accepted'],
): string[] {
  return discoverGames(dir, lifecycles).map(registration => registration.game);
}

export function gameRegistration(game: string, root = gamesDir): DiscoveredGame | undefined {
  return discoverGames(root, ['accepted', 'candidate', 'disabled'])
    .find(registration => registration.game === game);
}
