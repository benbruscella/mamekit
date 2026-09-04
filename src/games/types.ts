import type { GameCategory } from '../gen/output-layout.ts';

export interface GameKeyAction {
  atFrame: number;
  code: string;
  heldFrames: number;
  releasedFrames: number;
}

export interface GameChordAction {
  atFrame: number;
  /** Keys held together, for keyboard matrices and multiplayer controls. */
  codes: string[];
  heldFrames: number;
  releasedFrames: number;
}

export interface GameAnalogAction {
  atFrame: number;
  analog: string;
  value: number;
  heldFrames: number;
  releasedFrames: number;
}

export interface GameMachineSignalAction {
  atFrame: number;
  signal: 'nmi' | 'reset' | 'break' | 'restore';
  assertedFrames: number;
}

export interface GameResetAction {
  atFrame: number;
  reset: true;
}

export type GameInputAction =
  | GameKeyAction
  | GameChordAction
  | GameAnalogAction
  | GameMachineSignalAction
  | GameResetAction;

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

export type GameSoundKind =
  | 'wsg' | 'ay8910' | 'dac' | 'discrete' | 'sn76489' | 'pokey'
  | 'ym2203' | 'ym2151' | 'samples' | 'berzerk' | 'exidy' | 'none';

export type MediaKind =
  | 'romset' | 'bios' | 'device-rom' | 'cartridge' | 'quickload'
  | 'cassette' | 'floppy';

export interface MediaCapability {
  kind: MediaKind;
  interface?: string;
  status: 'planned' | 'candidate' | 'accepted';
  /** MAME software-list names supplying this medium. */
  softwareLists?: string[];
  /** A peripheral target required to use the medium, e.g. a 1541 drive. */
  peripheral?: string;
}

/** Source identity and generated-machine facts, independent of QA scenarios. */
export interface MachineTargetDefinition {
  game: string;
  category: GameCategory;
  driver: string;
  machine: { className: string; name: string };
  screen: { width: number; height: number };
  soundKind: GameSoundKind;
  media?: MediaCapability[];
}

/** One deterministic way to exercise a target and its selected media. */
export interface GameAcceptanceScenario {
  id?: string;
  kind?: 'cold-boot' | 'gameplay' | 'keyboard' | 'media' | 'peripheral';
  romEnvironment: string;
  frames: number;
  /** Minimum full-contract throughput, including video hashing and audio probing. */
  minimumFps: number;
  checkpoints: number[];
  actions: GameInputAction[];
  audioRequirements?: GameTestContract['audioRequirements'];
  minimumAudioRms?: number;
  shareRequirements?: GameTestContract['shareRequirements'];
  golden?: GameAcceptanceGolden;
}

/** New registration shape: one machine may own several acceptance scenarios. */
export interface MachineTargetContract {
  target: MachineTargetDefinition;
  scenarios: GameAcceptanceScenario[];
}

/**
 * Small, declarative QA token for one supported generated machine.
 * It contains no emulation behavior; the shared harness executes `dist`.
 */
export interface GameTestContract extends MachineTargetDefinition {
  /** Stable key when one machine has more than one deterministic scenario. */
  scenarioId?: string;
  romEnvironment: string;
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
    /** Minimum register-value diversity, including zero, in the same window. */
    minimumDistinctValues?: number;
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

export function machineTargetContract(contract: GameTestContract): MachineTargetContract {
  const {
    game,
    category,
    driver,
    machine,
    screen,
    soundKind,
    media,
    scenarioId,
    ...scenario
  } = contract;
  return {
    target: { game, category, driver, machine, screen, soundKind, ...(media ? { media } : {}) },
    scenarios: [{ ...scenario, ...(scenarioId ? { id: scenarioId } : {}) }],
  };
}
