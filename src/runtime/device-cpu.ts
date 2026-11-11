// A CPU compiled whole as its MAME class, standing in the board as a processor.
//
// The device compiler compiles a CPU like any other device: its device_start,
// device_reset, execute_set_input, execute_run and memory interfaces, from
// MAME's own source (and, for the cores MAME generates at build time, from the
// generated source -- mame-build.ts). The generated device already hosts
// MAME's device_execute_interface: `runCycles` gives execute_run a slice in
// m_icount, `abortTimeslice` swallows what is left of it, and `total_cycles`
// counts what it has spent.
//
// What a board processor needs beyond that is the board's side of the same
// interface, which this adapter is:
// - the core's address spaces are the CPU's own maps (the bus the board built
//   for this tag): program, IO and opcode fetches;
// - input lines go through the board's device_input (synchronized, HOLD_LINE
//   held until standard_irq_callback takes it);
// - standard_irq_callback answers the vector a driver gave with the line, or
//   its acknowledge callback's, or the core's default_irq_vector;
// - adjust_icount (`stallCycles`) and total_cycles mid-slice (`elapsedCycles`).
//
// Nothing here knows which CPU it hosts.

import type { Cpu, CpuBus } from './generated-cpu.ts';
import type { Device } from './generated-device.ts';
import { HOST_INPUT_LINES } from '../ir/board.ts';

/** MAME's address-space indices (emu/emumem.h). */
const AS_PROGRAM = 0;
const AS_IO = 2;
const AS_OPCODES = 3;

export interface DeviceCpuHost {
  /** device_input::set_state_synced: the board's line delivery, HOLD_LINE included. */
  setInputLine(line: number, state: number): void;
  /** The held line's acknowledgement and the core's default vector (deviceIrqAcknowledge). */
  acknowledgeLine(line: number): number;
}

export class DeviceCpu implements Cpu {
  private readonly device: Device;
  private readonly bus: CpuBus;
  private readonly host: DeviceCpuHost;
  /** What the board gave with the line: set_input_line_and_vector's vector. */
  private irqVector: number | (() => number) | undefined;
  /** The slice in progress: its budget, as execute_run started it. */
  private target: number | undefined;

  constructor(device: Device, bus: CpuBus, host: DeviceCpuHost) {
    this.device = device;
    this.bus = bus;
    this.host = host;
    const read = (address: number) => bus.read(address);
    const write = (address: number, data: number) => bus.write(address, data);
    for (const space of device.spaceIndices?.() ?? []) {
      if (space === AS_PROGRAM) device.bindAddressSpace?.(space, read, write);
      else if (space === AS_IO) {
        device.bindAddressSpace?.(space, port => bus.in?.(port) ?? 0xff, (port, data) => bus.out?.(port, data));
      } else if (space === AS_OPCODES) {
        device.bindAddressSpace?.(space, address => (bus.readOpcode ?? bus.read).call(bus, address), write);
      }
    }
    device.bindCall?.('standard_irq_callback', line => this.acknowledge(Number(line)));
  }

  /** Its state is the device's, which the board saves with the devices. */
  stateKeys(): readonly string[] {
    return [];
  }

  reset(): void {
    this.device.reset();
  }

  /** One instruction's worth: a slice of a single cycle, as MAME's lockstep has it. */
  step(): number {
    return this.run(1);
  }

  /**
   * A timeslice: execute_run spends `cycles` from m_icount and stops when it is
   * gone (or the slice is aborted). What it overran is spent too, as in MAME.
   */
  run(cycles: number): number {
    this.bus.timing?.(0, cycles);
    this.target = cycles;
    let ran = 0;
    try {
      ran = this.device.runCycles?.(cycles) ?? 0;
    } finally {
      this.target = undefined;
    }
    const settled = Math.min(ran, cycles);
    this.bus.timing?.(settled, settled);
    return ran;
  }

  /** MAME abort_timeslice: execute_run returns after the instruction in progress. */
  abortTimeslice(): void {
    this.device.abortTimeslice?.();
  }

  /** total_cycles inside a slice: what execute_run has spent of it so far. */
  elapsedCycles(): number {
    return this.target === undefined ? 0 : this.target - this.device.get('m_icount');
  }

  /**
   * MAME adjust_icount with a negative delta: hardware took cycles from the
   * running processor (the board adds to this). They come off m_icount now.
   */
  get stallCycles(): number {
    return 0;
  }

  set stallCycles(cycles: number) {
    if (cycles > 0 && this.target !== undefined) {
      this.device.set('m_icount', this.device.get('m_icount') - cycles);
    }
  }

  setIrqLine(active: boolean, dataBus: number | (() => number) = 0xff, hold = false): void {
    if (active) this.irqVector = dataBus;
    this.host.setInputLine(0, active ? (hold ? 2 : 1) : 0);
  }

  setInputLine(inputnum: number, state: number): void {
    this.host.setInputLine(inputnum, state);
  }

  inputLine(name: string): number | undefined {
    return this.device.constant(name);
  }

  nmi(): void {
    this.host.setInputLine(HOST_INPUT_LINES.INPUT_LINE_NMI, 1);
    this.host.setInputLine(HOST_INPUT_LINES.INPUT_LINE_NMI, 0);
  }

  /**
   * device_execute_interface::standard_irq_callback: a held line is released,
   * and the vector is the driver's acknowledge callback's, else the one given
   * with the line, else the core's own default.
   */
  private acknowledge(line: number): number {
    const fallback = this.host.acknowledgeLine(line);
    const acknowledged = this.bus.acknowledge?.(line);
    if (acknowledged !== undefined) return acknowledged;
    const vector = this.irqVector;
    if (line === 0 && vector !== undefined) return typeof vector === 'function' ? vector() : vector;
    return fallback;
  }

  get(name: string): number {
    return this.device.get(name);
  }

  set(name: string, value: number): void {
    this.device.set(name, value);
  }

  stateInt(index: number): number {
    return Number(this.device.invoke('state_int', index)) || 0;
  }

  invoke(name: string, ...args: number[]): number {
    return this.device.call(name, ...args);
  }

  hasMethod(name: string): boolean {
    return this.device.methodNames().includes(name);
  }

  methodNames(): string[] {
    return [...this.device.methodNames()];
  }
}
