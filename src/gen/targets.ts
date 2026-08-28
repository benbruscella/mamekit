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
  // Consoles have no real-ROM acceptance contract yet, so they are listed here
  // until they do. A console's software arrives on cartridges the visitor
  // supplies, so there is no romset a contract module could name; the console
  // room is covered by the browser suite instead (e2e/specs/console.spec.ts).
  'nes',
  // The ColecoVision differs from the NES in one way that matters here: its
  // BIOS is a romset of its own, so it can hold a real contract as soon as
  // that dump is available. Until then it sits with the NES.
  'coleco',
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
