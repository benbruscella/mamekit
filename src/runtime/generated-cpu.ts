// The processor surface the board drives, and the bus it hands one.
//
// Every CPU is its MAME class compiled whole by the device compiler and
// hosted by DeviceCpu (device-cpu.ts); there is no other kind of core (#249).

export interface CpuBus {
  read(address: number): number;
  /** Atomic big-endian word access for native 16-bit address-map handlers. */
  read16be?(address: number): number;
  /** A 68000 long access, which MAME performs as two word accesses. */
  read32be?(address: number): number;
  /** Atomic little-endian word access (a 16-bit ENDIANNESS_LITTLE space). */
  read16le?(address: number): number;
  write16le?(address: number, data: number): void;
  /** AS_OPCODES fetch when the board maps encrypted opcodes separately. */
  readOpcode?(address: number): number;
  write(address: number, data: number): void;
  /** Atomic big-endian word access for native 16-bit address-map handlers. */
  write16be?(address: number, data: number): void;
  /** A 68000 long access, which MAME performs as two word accesses. */
  write32be?(address: number, data: number): void;
  in(port: number): number;
  /** Select an entry of one of the core's own memory views; -1 disables it. */
  selectView?(tag: string, entry: number): number;
  /**
   * Atomic big-endian word access to the I/O space, for a core whose ports
   * are natively 16 bits wide (the TMS320C1x). Splitting one into two byte
   * transactions would show a word handler two half writes.
   */
  in16be?(port: number): number;
  out(port: number, data: number): void;
  out16be?(port: number, data: number): void;
  /** Optional source-derived interrupt-acknowledge address-space read. */
  acknowledge?(level: number): number;
  signal?(name: string, state: number): number | void;
  /**
   * The core's own devcb lines the machine configuration connected, so
   * `isunset()` answers for the line itself: MAME's 6502 skips its SYNC
   * output twice an instruction when nothing listens.
   */
  boundSignals?: ReadonlySet<string>;
  /** Instruction boundary within the current scheduler slice. */
  timing?(elapsedCycles: number, targetCycles: number): void;
  /**
   * The core handed back its slice from its service block (MAME's
   * `m_icount = 0; return;`, the Z80 holding for BUSREQ): how many cycles it
   * stands still before it looks again. MAME's next look is the next
   * timeslice, which starts at the next timer expiry. Without this hook it
   * waits out the slice.
   */
  parked?(elapsedCycles: number, targetCycles: number): number;
}

export interface Cpu {
  reset(): void;
  step(): number;
  run(cycles: number): number;
  /** MAME abort_timeslice: the running run() returns after this instruction. */
  abortTimeslice?(): void;
  /**
   * Cycles the instruction currently executing has consumed, for a core that
   * charges them per bus access. MAME's `total_cycles()` includes these.
   */
  elapsedCycles?(): number;
  setIrqLine(active: boolean, dataBus?: number | (() => number), hold?: boolean): void;
  /** Drive a generated CPU's numbered input line (RP2A03 keeps APU IRQ separate). */
  setInputLine(inputnum: number, state: number): void;
  /** The number the core's header gives an input-line constant (`Z80_INPUT_LINE_BUSREQ`). */
  inputLine?(name: string): number | undefined;
  nmi(): void;
  get(name: string): number;
  /** MAME device_state_interface::state_int, by the CPU's own state index. */
  stateInt(index: number): number;
  /** MAME device_state_interface::set_state_int, and the core's state_import. */
  setStateInt?(index: number, value: number): void;
  set(name: string, value: number): void;
  invoke(name: string, ...args: number[]): number;
  /** Whether the core lowered a method of this name from its MAME source. */
  hasMethod(name: string): boolean;
  /** Every method the core lowered from its MAME source. */
  methodNames?(): string[];
  /** MAME's core stops between an instruction's cycles (an m_inst_substate). */
  suspendsMidInstruction?(): boolean;
}
