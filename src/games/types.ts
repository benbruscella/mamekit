import type { GameCategory } from '../gen/output-layout.ts';

export interface GameKeyAction {
  atFrame: number;
  code: string;
  heldFrames: number;
  releasedFrames: number;
}

export interface GameResetAction {
  atFrame: number;
  reset: true;
}

export type GameInputAction = GameKeyAction | GameResetAction;

export interface GameCheckpointGolden {
  video: string;
  state: string;
}

export interface GameAcceptanceGolden {
  regions: Record<string, string>;
  checkpoints: Record<string, GameCheckpointGolden>;
  audio: {
    writes: number;
    nonzeroWrites: number;
    writeHash: string;
    pcmHash: string;
    rms: number;
  };
}

/**
 * Small, declarative QA token for one supported generated machine.
 * It contains no emulation behavior; the shared harness executes `dist`.
 */
export interface GameTestContract {
  game: string;
  category: GameCategory;
  driver: string;
  machine: { className: string; name: string };
  romEnvironment: string;
  screen: { width: number; height: number };
  soundKind: 'wsg' | 'ay8910' | 'discrete' | 'sn76489' | 'ym2203';
  frames: number;
  /** Minimum full-contract throughput, including video hashing and audio probing. */
  minimumFps: number;
  checkpoints: number[];
  actions: GameInputAction[];
  /** Required generated audio activity in a named source-device path. */
  audioRequirements?: {
    method: string;
    /** Restrict the requirement to one generated sound-device register. */
    offset?: number;
    fromFrame: number;
    toFrame?: number;
    minimumNonzeroWrites: number;
    maximumNonzeroWrites?: number;
  }[];
  /** Minimum rendered PCM energy; stricter than the harness silence floor. */
  minimumAudioRms?: number;
  /** Required final activity for source-declared shared RAM. */
  shareRequirements?: {
    share: string;
    minimumNonzeroBytes: number;
    maximumNonzeroBytes?: number;
  }[];
  golden?: GameAcceptanceGolden;
}
