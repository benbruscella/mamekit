// Source-derived configuration views and host mounting options.
import type { BoardIr, GeneratedBankDevice, GeneratedExecutionCpu, GeneratedExecutionPlan, GeneratedScreen, RangeSpec } from './board.ts';

/** The shell's source CPU view shares its field definitions with execution. */
export type CpuSpec = Pick<GeneratedExecutionCpu,
  'tag' | 'type' | 'clock' | 'region' | 'ranges' | 'mask' | 'opcode' | 'io' | 'unmapHigh'>;

export interface BoardConfig {
  /** generated machine module key, injected by the shell from ShellConfig.game */
  game?: string;
  /** Driver family provenance from the graph. */
  family: string;
  cpus: CpuSpec[];
  /** `address_map_bank_device` spaces; see GeneratedBankDevice. */
  bankDevices?: GeneratedBankDevice[];
  /** cpu[0]'s program map alias retained in the generated config format. */
  ranges: RangeSpec[];
  /** cpu[0]'s io space (pacman IM2 vector port) */
  io?: { ranges: RangeSpec[]; globalMask?: number };
  /** Source-defined power-on contents for battery-backed/shared RAM. */
  initialShares?: GeneratedExecutionPlan['initialShares'];
  customs?: GeneratedExecutionPlan['customs'];
  inputLatches?: GeneratedExecutionPlan['inputLatches'];
  screen: Pick<GeneratedScreen,
    'width' | 'height' | 'xOffset' | 'yOffset' | 'refresh' | 'vtotal' | 'vbstart' | 'vbend' | 'rotate'>;
  clocks: { namco06: number; wsg: number };
  /**
   * Console cartridge metadata, injected at runtime by the console room after
   * identifying a user-dropped cart (never present in generated config.json —
   * the cart bytes arrive as regions.prg / regions.chr alongside it).
   */
  /**
   * The mounted cartridge, as the console room identified it. Each bus reads
   * the facts its own PCBs are selected by: the NES card slot keys off
   * `mapper`, the ColecoVision's off `slot`.
   */
  cart?: {
    mapper?: number;
    mirroring?: 'horizontal' | 'vertical' | 'four' | 'single0' | 'single1';
    battery?: boolean;
    /** MAME cartridge-slot option name, e.g. "standard" or "megacart". */
    slot?: string;
  };
  /**
   * Slots booted with no card, as MAME's `-iec8 ""` boots them: the software
   * room leaves a medium's transport out when the title does not use it.
   */
  emptySlots?: string[];
  /**
   * Slots booted with a card other than their default, as MAME's
   * `-exp intf2` boots one: a Spectrum cartridge title needs the ZX
   * Interface 2 in the expansion port, whose own cartridge slot takes it.
   */
  slotCards?: Record<string, string>;
  /**
   * Images held from power-on, by device tag, as MAME's `-cart` mounts one
   * before the machine starts: the device's own call_load reads it between
   * its device_start and the first reset. A C64 cartridge arrives this way,
   * as the software-list part its expansion port loads by area name.
   */
  images?: Record<string, BoardImage>;
}

/** A software-list part as a slot reads it: each dataarea's bytes, and the part's features. */
export interface SoftwarePart {
  /** dataarea name -> its bytes, at the size the list declares ("roml", "romh") */
  areas: Record<string, Uint8Array>;
  /** `get_feature` answers: a C64 cartridge's `exrom`, `game` and `slot` */
  features: Record<string, string>;
}

/** An image a device is handed: a file's bytes, or a software-list part. */
export interface BoardImage {
  /** what MAME would call its basename: the set or file name */
  name: string;
  bytes?: Uint8Array;
  software?: SoftwarePart;
}

/** Use resolved executable facts for composition, preserving host mounting options. */
export function boardConfigFromIr(machine: BoardIr, host: BoardConfig): BoardConfig {
  const execution = machine.execution;
  return {
    ...host,
    game: machine.game,
    family: machine.family,
    cpus: execution.cpus,
    ranges: execution.cpus[0]?.ranges ?? [],
    io: execution.cpus[0]?.io,
    screen: execution.screen,
    bankDevices: execution.bankDevices,
    initialShares: execution.initialShares,
    customs: execution.customs,
    inputLatches: execution.inputLatches,
  };
}
