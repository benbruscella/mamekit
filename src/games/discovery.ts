// Auto-discovered game contracts.
//
// The accepted set used to be a hand-kept import list plus a hand-kept array,
// so adding a game meant editing a central file that had nothing to do with
// that game. A contract module is now discovered by being there: one
// src/games/<game>.ts exporting a GameTestContract, with its colocated spec.
//
// Node-only — this reads the source directory and never reaches the browser.

import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const gamesDir = dirname(fileURLToPath(import.meta.url));

/** Modules in src/games that are infrastructure rather than a game. */
const INFRASTRUCTURE = new Set([
  'acceptance.ts',
  'acceptance-harness.ts',
  'contracts.ts',
  'discovery.ts',
  'record-goldens.ts',
  'test-support.ts',
  'types.ts',
]);

/**
 * Names of every discovered contract module, sorted.
 *
 * A game module is paired with a colocated spec, which is the convention
 * TESTING.md already requires; requiring the pair keeps a stray helper from
 * being mistaken for a target.
 */
export function discoverGameNames(dir = gamesDir): string[] {
  return readdirSync(dir)
    .filter(name => name.endsWith('.ts') && !name.endsWith('.spec.ts'))
    .filter(name => !INFRASTRUCTURE.has(name))
    .filter(name => existsSync(join(dir, name.replace(/\.ts$/, '.spec.ts'))))
    .map(name => name.replace(/\.ts$/, ''))
    .sort();
}
