import { discoverGameNames } from '../games/discovery.ts';

/**
 * Every target the all-target generation contract must produce.
 *
 * Discovered from the acceptance contracts in src/games, so the accepted
 * working set is stated once — by the contract modules themselves. A target
 * with a contract is by definition one that must generate and pass.
 */
export const REQUIRED_TARGETS: readonly string[] = [
  ...discoverGameNames(),
  // Consoles have no real-ROM acceptance contract yet, so they are listed
  // until they do.
  'nes',
];

/**
 * The set `gen:all` builds: the targets with acceptance contracts. Consoles
 * are excluded until they carry one.
 */
export const ACCEPTED_TARGETS: readonly string[] = discoverGameNames();
