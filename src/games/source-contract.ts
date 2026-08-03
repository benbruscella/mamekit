import type { GameTestContract } from './types.ts';

type SourceTarget = Pick<
  GameTestContract,
  'game' | 'driver' | 'machine' | 'screen' | 'soundKind' | 'golden'
>;
type SourceTargetOptions = SourceTarget & Pick<Partial<GameTestContract>, 'actions'>;

/**
 * Standard real-ROM acceptance schedule for a newly source-enabled arcade
 * target. A golden is intentionally absent until the recorder observes the
 * generated machine; source specs can still keep the target in the clean build.
 */
export function sourceTarget(target: SourceTargetOptions): GameTestContract {
  return {
    ...target,
    category: 'arcade',
    romEnvironment: `MAMEKIT_${target.game.toUpperCase()}_ROM`,
    frames: 1200,
    minimumFps: 10,
    checkpoints: [1, 60, 180, 300, 600, 900, 1200],
    actions: target.actions ?? [
      { atFrame: 300, code: 'Digit5', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 330, code: 'Digit1', heldFrames: 10, releasedFrames: 20 },
      { atFrame: 600, code: 'ArrowRight', heldFrames: 120, releasedFrames: 20 },
      { atFrame: 780, code: 'Space', heldFrames: 30, releasedFrames: 20 },
    ],
  };
}
