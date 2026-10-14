// Bounded acceptance evidence belongs to the accepted target that proves it.
// Discovery keeps the compiler free of a second manually maintained game list.
import { loadRegisteredGameContracts } from '../games/contracts.ts';
import type { RuntimeCoverage } from '../games/types.ts';

export type RuntimeCertification = RuntimeCoverage;

export const RUNTIME_CERTIFICATIONS: Readonly<Record<string, RuntimeCoverage>> = Object.fromEntries(
  (await loadRegisteredGameContracts()).flatMap(({ target }) => target.runtimeCoverage
    ? [[target.game, target.runtimeCoverage]] : []),
);

function isSubset(actual: readonly string[], allowed: readonly string[]): boolean {
  const allowedSet = new Set(allowed);
  return actual.every(value => allowedSet.has(value));
}

export function isRuntimeCertified(
  game: string,
  generationGaps: readonly string[],
  handlerGaps: readonly string[],
  screenUpdateCompiled: boolean,
): boolean {
  const certification = RUNTIME_CERTIFICATIONS[game];
  return certification !== undefined &&
    isSubset(generationGaps, certification.generationGaps) &&
    isSubset(handlerGaps, certification.handlerGaps) &&
    (screenUpdateCompiled || certification.allowDirectScreen === true);
}
