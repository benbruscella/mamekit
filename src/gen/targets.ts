import { supportedGameContracts } from '../games/contracts.ts';

/**
 * Every target the all-target generation contract must produce.
 *
 * Derived from the acceptance contracts so the accepted working set is stated
 * once. A target with a contract is by definition one that must generate and
 * pass; keeping a second hand-maintained array here let the two drift.
 */
export const REQUIRED_TARGETS: readonly string[] = [
  ...supportedGameContracts.map(contract => contract.game),
  // Consoles have no real-ROM acceptance contract yet, so they are listed
  // until they do.
  'nes',
];

/**
 * The set `gen:all` builds: the targets with acceptance contracts. Consoles
 * are excluded until they carry one.
 */
export const ACCEPTED_TARGETS: readonly string[] =
  supportedGameContracts.map(contract => contract.game);
