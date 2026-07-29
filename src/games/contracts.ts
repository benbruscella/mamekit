// The accepted game set, discovered rather than listed.
//
// See discovery.ts: adding a game means adding src/games/<game>.ts and its
// spec. Nothing here needs editing, which is the touch budget issue #38 asks
// for.

import type { GameTestContract } from './types.ts';
import { discoverGameNames } from './discovery.ts';

/** Load every discovered contract, in discovery order. */
export async function loadGameContracts(): Promise<GameTestContract[]> {
  const contracts: GameTestContract[] = [];
  for (const name of discoverGameNames()) {
    const module = await import(`./${name}.ts`) as Record<string, unknown>;
    const contract = module[name] as GameTestContract | undefined;
    if (!contract?.game) {
      throw new Error(
        `src/games/${name}.ts must export a GameTestContract named "${name}"`,
      );
    }
    if (contract.game !== name) {
      throw new Error(
        `src/games/${name}.ts declares game "${contract.game}"; the module name must match`,
      );
    }
    contracts.push(contract);
  }
  return contracts;
}
