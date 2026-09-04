import { GAME_CATEGORIES } from '../gen/output-layout.ts';
import type { GameLifecycle } from './discovery.ts';
import type { GameInputAction, GameTestContract } from './types.ts';

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function natural(value: number, label: string, allowZero = false): void {
  invariant(Number.isInteger(value), `${label} must be an integer`);
  invariant(allowZero ? value >= 0 : value > 0,
    `${label} must be ${allowZero ? 'non-negative' : 'positive'}`);
}

function actionEnd(action: GameInputAction): number {
  return 'code' in action
    ? action.atFrame + action.heldFrames + action.releasedFrames
    : action.atFrame;
}

/** Validate both candidate shape and accepted-game readiness. */
export function validateGameContract(
  contract: GameTestContract,
  lifecycle: Exclude<GameLifecycle, 'disabled'>,
): GameTestContract {
  const prefix = contract.game || '<unnamed game>';
  invariant(/^[a-z0-9_]+$/.test(contract.game), `${prefix}: invalid MAME short name`);
  invariant(GAME_CATEGORIES.includes(contract.category),
    `${prefix}: invalid category ${contract.category}`);
  invariant(/^src\/mame\/.+\.cpp$/.test(contract.driver),
    `${prefix}: invalid MAME driver path`);
  invariant(Boolean(contract.machine.className && contract.machine.name),
    `${prefix}: machine selection is incomplete`);
  if (contract.scenarioId !== undefined) {
    invariant(/^[a-z0-9][a-z0-9-]*$/.test(contract.scenarioId),
      `${prefix}: invalid scenario id`);
  }
  const mediaKeys = new Set<string>();
  for (const medium of contract.media ?? []) {
    const key = `${medium.kind}:${medium.interface ?? ''}`;
    invariant(!mediaKeys.has(key), `${prefix}: duplicate media capability ${key}`);
    mediaKeys.add(key);
    invariant(['planned', 'candidate', 'accepted'].includes(medium.status),
      `${prefix}: invalid ${medium.kind} media status`);
    if (medium.softwareLists) {
      invariant(medium.softwareLists.every(Boolean),
        `${prefix}: ${medium.kind} has an empty software-list name`);
    }
  }
  invariant(/^MAMEKIT_[A-Z0-9_]+_ROM$/.test(contract.romEnvironment),
    `${prefix}: invalid ROM environment variable`);
  natural(contract.screen.width, `${prefix}: screen width`);
  natural(contract.screen.height, `${prefix}: screen height`);
  natural(contract.frames, `${prefix}: frame count`);
  invariant(Number.isFinite(contract.minimumFps) && contract.minimumFps > 0,
    `${prefix}: minimum FPS must be positive`);
  invariant(contract.checkpoints.length > 0, `${prefix}: checkpoints are empty`);
  let previousCheckpoint = 0;
  for (const checkpoint of contract.checkpoints) {
    natural(checkpoint, `${prefix}: checkpoint`);
    invariant(checkpoint > previousCheckpoint,
      `${prefix}: checkpoints must be strictly increasing`);
    invariant(checkpoint <= contract.frames,
      `${prefix}: checkpoint ${checkpoint} exceeds ${contract.frames} frames`);
    previousCheckpoint = checkpoint;
  }
  invariant(contract.checkpoints.at(-1) === contract.frames,
    `${prefix}: final checkpoint must equal frame count`);

  let previousActionEnd = 0;
  for (const action of contract.actions) {
    natural(action.atFrame, `${prefix}: action frame`, true);
    invariant(action.atFrame >= previousActionEnd,
      `${prefix}: input actions overlap or are unordered`);
    if ('code' in action) {
      invariant(Boolean(action.code), `${prefix}: input action has no key code`);
      natural(action.heldFrames, `${prefix}: held frames`, true);
      natural(action.releasedFrames, `${prefix}: released frames`, true);
    }
    const end = actionEnd(action);
    invariant(end <= contract.frames, `${prefix}: input action exceeds frame count`);
    previousActionEnd = end;
  }

  for (const requirement of contract.audioRequirements ?? []) {
    invariant(Boolean(requirement.method), `${prefix}: audio requirement has no method`);
    natural(requirement.fromFrame, `${prefix}: audio fromFrame`, true);
    invariant(requirement.fromFrame <= contract.frames,
      `${prefix}: audio window starts after the run`);
    if (requirement.toFrame !== undefined) {
      natural(requirement.toFrame, `${prefix}: audio toFrame`, true);
      invariant(requirement.toFrame >= requirement.fromFrame,
        `${prefix}: audio window is reversed`);
      invariant(requirement.toFrame <= contract.frames,
        `${prefix}: audio window exceeds the run`);
    }
    natural(requirement.minimumNonzeroWrites, `${prefix}: minimum audio writes`, true);
    if (requirement.maximumNonzeroWrites !== undefined) {
      natural(requirement.maximumNonzeroWrites, `${prefix}: maximum audio writes`, true);
      invariant(requirement.maximumNonzeroWrites >= requirement.minimumNonzeroWrites,
        `${prefix}: maximum audio writes is below its minimum`);
    }
    if (requirement.minimumDistinctValues !== undefined) {
      natural(requirement.minimumDistinctValues, `${prefix}: minimum distinct audio values`);
    }
  }
  if (contract.minimumAudioRms !== undefined) {
    invariant(Number.isFinite(contract.minimumAudioRms) && contract.minimumAudioRms > 0,
      `${prefix}: minimum audio RMS must be positive`);
  }
  for (const requirement of contract.shareRequirements ?? []) {
    invariant(/^\S+$/.test(requirement.share), `${prefix}: invalid share requirement`);
    natural(requirement.minimumNonzeroBytes, `${prefix}: minimum share bytes`, true);
    if (requirement.maximumNonzeroBytes !== undefined) {
      natural(requirement.maximumNonzeroBytes, `${prefix}: maximum share bytes`, true);
      invariant(requirement.maximumNonzeroBytes >= requirement.minimumNonzeroBytes,
        `${prefix}: maximum share bytes is below its minimum`);
    }
  }

  if (lifecycle === 'accepted') {
    invariant(contract.golden, `${prefix}: accepted game has no recorded golden`);
  }
  if (contract.golden) {
    invariant(Object.keys(contract.golden.regions).length > 0,
      `${prefix}: golden has no ROM regions`);
    invariant(contract.golden.audio.writes > 0, `${prefix}: golden has no audio writes`);
    const goldenFrames = Object.keys(contract.golden.checkpoints).map(Number);
    invariant(JSON.stringify(goldenFrames) === JSON.stringify(contract.checkpoints),
      `${prefix}: golden checkpoints do not match the schedule`);
  }
  return contract;
}
