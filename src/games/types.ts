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

/**
 * A light gun aimed at a point, in the port's own units (the NES Zapper:
 * 0-255 across, 0-239 down), held there until the next aim. The trigger is a
 * key action on the gun's own button.
 */
export interface GameAimAction {
  atFrame: number;
  aim: [number, number];
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

/**
 * Text typed through MAME's natural keyboard (natural-keyboard.ts), in the
 * coded form `post_coded` reads: `{ENTER}`, `{F1}` and the rest name keys.
 * It is paced in emulated time as MAME paces it, so the run goes on while it
 * types; the next action may not start before the frame it is posted on.
 */
export interface GameTextAction {
  atFrame: number;
  text: string;
}

export type GameInputAction =
  | GameKeyAction
  | GameChordAction
  | GameAnalogAction
  | GameAimAction
  | GameMachineSignalAction
  | GameResetAction
  | GameTextAction;

/**
 * A software-list title, started the way the software room's Play starts it:
 * its set at `roms/<the machine's dumps folder>/<list>/<name>.zip`, every chip
 * matched against the generated catalogue, its images in the transports whose
 * formats read them, every other medium's slot left empty, and its shelf's
 * start command typed -- then PLAY pressed, for a tape (title-start.ts).
 */
export interface GameSoftwareTitle {
  /** MAME software list: "c64_cass" */
  list: string;
  /** the title's short name in that list: "hero" */
  name: string;
}

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
  | 'sid' | 'stream' | 'wsg' | 'ay8910' | 'dac' | 'discrete' | 'sn76489' | 'pokey'
  | 'ym2203' | 'ym2151' | 'samples' | 'berzerk' | 'exidy' | 'nes' | 'gameboy'
  | 'tia' | 'none';

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

/** Reviewed execution coverage, bounded to gaps exercised by the target's QA. */
export interface RuntimeCoverage {
  generationGaps: readonly string[];
  handlerGaps: readonly string[];
  allowDirectScreen?: boolean;
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
  runtimeCoverage?: RuntimeCoverage;
}

/** One deterministic way to exercise a target and its selected media. */
export interface GameAcceptanceScenario {
  /** Reviewed renderer limitations; these goldens verify stability, not fidelity to MAME PCM. */
  acceptedAudioLimitations?: string[];
  id?: string;
  kind?: 'cold-boot' | 'gameplay' | 'keyboard' | 'media' | 'peripheral';
  /**
   * The cartridge this scenario plays, by its MAME software-list short name.
   * A console has no romset of its own to accept against; its set lives at
   * `roms/<category>/<game>/<cartridge>.zip` and mounts the way the console
   * room mounts it.
   */
  cartridge?: string;
  /** The computer title this scenario plays; see GameSoftwareTitle. */
  software?: GameSoftwareTitle;
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
  acceptedAudioLimitations?: string[];
  /** Stable key when one machine has more than one deterministic scenario. */
  scenarioId?: string;
  /** See GameAcceptanceScenario.cartridge. */
  cartridge?: string;
  /** See GameAcceptanceScenario.software. */
  software?: GameSoftwareTitle;
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
