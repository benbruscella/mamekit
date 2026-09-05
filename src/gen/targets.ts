import { discoverGameNames } from '../games/discovery.ts';

export const ACCEPTED_TARGETS: readonly string[] = discoverGameNames();
export const CANDIDATE_TARGETS: readonly string[] = discoverGameNames(
  undefined,
  ['candidate'],
);

/** Generated system targets whose software arrives separately. */
export const SYSTEM_TARGETS: readonly string[] = [
  'nes',
  'coleco',
  'a2600',
  'gameboy',
];

/**
 * Every target the all-target generation contract must produce.
 *
 * Discovered from the acceptance contracts in src/games, so the accepted
 * working set is stated once — by the contract modules themselves. A target
 * with a contract is by definition one that must generate and pass.
 */
export const REQUIRED_TARGETS: readonly string[] = [
  ...ACCEPTED_TARGETS,
  ...CANDIDATE_TARGETS,
  ...SYSTEM_TARGETS,
];

/**
 * The set a clean `gen:all` distribution builds.
 *
 * This is deliberately the required set, not just the real-ROM acceptance
 * set: consoles can use synthetic acceptance until redistributable test ROMs
 * exist, but they must still ship in the complete generated application.
 */
export const GENERATION_TARGETS: readonly string[] = REQUIRED_TARGETS;

/**
 * Targets included in the generated public app/catalog.
 */
export const PUBLISHED_TARGETS: readonly string[] = [
  ...ACCEPTED_TARGETS,
  ...SYSTEM_TARGETS,
];
