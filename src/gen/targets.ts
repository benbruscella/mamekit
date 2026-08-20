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
  // Consoles have no real-ROM acceptance contract yet, so one is listed here
  // until it has one. The list is empty: play-testing for issue #53 found the
  // generated `nes` target no longer works, so it is not built. Restoring it
  // means putting 'nes' back here — or, better, giving it a contract module in
  // src/games/ like every arcade target has.
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
 * Targets with real-ROM acceptance contracts.
 */
export const ACCEPTED_TARGETS: readonly string[] = discoverGameNames();
