// The accepted game set, discovered rather than listed.
//
// See discovery.ts: adding a game means adding a .game.ts contract and its
// spec. Nothing here needs editing, which is the touch budget issue #38 asks
// for.

import { pathToFileURL } from 'node:url';
import type {
  GameAcceptanceScenario,
  GameTestContract,
  MachineTargetContract,
  MachineTargetDefinition,
} from './types.ts';
import { validateGameContract } from './contract-validation.ts';
import {
  discoverGames,
  type DiscoveredGame,
  type GameLifecycle,
} from './discovery.ts';

export interface LoadedGameContract {
  registration: DiscoveredGame;
  contract: GameTestContract;
  target: MachineTargetDefinition;
  scenario: GameAcceptanceScenario;
}

export function normalizeGameContractExport(
  value: unknown,
  registration: DiscoveredGame,
): { target: MachineTargetDefinition; scenarios: GameAcceptanceScenario[] } {
  if (value && typeof value === 'object' && 'target' in value && 'scenarios' in value) {
    const nested = value as MachineTargetContract;
    if (!Array.isArray(nested.scenarios) || !nested.scenarios.length) {
      throw new Error(`${registration.modulePath} must declare at least one acceptance scenario`);
    }
    return nested;
  }
  const legacy = value as GameTestContract | undefined;
  if (!legacy?.game) {
    throw new Error(
      `${registration.modulePath} must export a game contract named "${registration.game}"`,
    );
  }
  const { game, category, driver, machine, screen, soundKind, media, ...scenario } = legacy;
  const inferredMedia = media ?? (category === 'arcade'
    ? [{
        kind: 'romset' as const,
        status: registration.lifecycle === 'accepted' ? 'accepted' as const : 'candidate' as const,
      }]
    : undefined);
  return {
    target: {
      game,
      category,
      driver,
      machine,
      screen,
      soundKind,
      ...(inferredMedia ? { media: inferredMedia } : {}),
    },
    scenarios: [scenario],
  };
}

export async function loadRegisteredGameContracts(
  lifecycles: readonly Exclude<GameLifecycle, 'disabled'>[] = ['accepted'],
  root?: string,
): Promise<LoadedGameContract[]> {
  const loaded: LoadedGameContract[] = [];
  for (const registration of discoverGames(root, lifecycles)) {
    const module = await import(pathToFileURL(registration.modulePath).href) as Record<string, unknown>;
    const normalized = normalizeGameContractExport(module[registration.game], registration);
    if (normalized.target.game !== registration.game) {
      throw new Error(
        `${registration.modulePath} declares game "${normalized.target.game}"; the filename must match`,
      );
    }
    const ids = new Set<string>();
    for (const [index, scenario] of normalized.scenarios.entries()) {
      const id = scenario.id ?? (normalized.scenarios.length === 1 ? 'default' : '');
      if (!id || ids.has(id)) {
        throw new Error(`${registration.modulePath} has a missing or duplicate scenario id`);
      }
      ids.add(id);
      const contract: GameTestContract = {
        ...normalized.target,
        ...scenario,
        ...(scenario.id !== undefined || normalized.scenarios.length > 1 ? { scenarioId: id } : {}),
      };
      validateGameContract(contract, registration.lifecycle as 'accepted' | 'candidate');
      loaded.push({ registration, contract, target: normalized.target, scenario });
      void index;
    }
  }
  return loaded;
}

/** Accepted real-ROM contracts. */
export async function loadGameContracts(): Promise<GameTestContract[]> {
  return (await loadRegisteredGameContracts(['accepted'])).map(loaded => loaded.contract);
}

/** Accepted and candidate contracts used by clean generation. */
export async function loadGenerationGameContracts(): Promise<GameTestContract[]> {
  return (await loadRegisteredGameContracts(['accepted', 'candidate']))
    .map(loaded => loaded.contract);
}
