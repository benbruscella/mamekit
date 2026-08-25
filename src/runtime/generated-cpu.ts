import {
  executeGeneratedProgram,
  type GeneratedCallArgument,
  type GeneratedHandlerBindings,
  type GeneratedLValue,
} from './generated-handler.ts';
import type { GeneratedHandlerProgram } from '../ir/board.ts';

export interface CpuBus {
  read(address: number): number;
  /** Atomic big-endian word access for native 16-bit address-map handlers. */
  read16be?(address: number): number;
  /** AS_OPCODES fetch when the board maps encrypted opcodes separately. */
  readOpcode?(address: number): number;
  write(address: number, data: number): void;
  /** Atomic big-endian word access for native 16-bit address-map handlers. */
  write16be?(address: number, data: number): void;
  in(port: number): number;
  out(port: number, data: number): void;
  /** Optional source-derived interrupt-acknowledge address-space read. */
  acknowledge?(level: number): number;
  signal?(name: string, state: number): number | void;
  /** Instruction boundary within the current scheduler slice. */
  timing?(elapsedCycles: number, targetCycles: number): void;
}

interface CpuAlias {
  member: string;
  part: 'scalar' | 'word' | 'high' | 'low';
  bits: 1 | 8 | 16 | 32;
}

interface CpuMember {
  name: string;
  bits?: 1 | 8 | 16 | 32;
  pair?: boolean;
  values?: number[];
  fields?: Record<string, 1 | 8 | 16 | 32>;
  initial?: number;
  wordByteRegisters?: number;
  z8000Registers?: boolean;
}

interface CpuMethod {
  name: string;
  parameters: string;
  program: GeneratedHandlerProgram;
}

interface CpuOpcode {
  key: string;
  dispatch: boolean;
  program: GeneratedHandlerProgram;
}

export interface GeneratedCpuDefinition {
  type: string;
  dialect?: string;
  addressMask?: number;
  /** CPU families such as Z8000 discard bit zero for word/long data access. */
  alignDataWords?: boolean;
  constants: Record<string, number>;
  aliases: Record<string, CpuAlias>;
  members: CpuMember[];
  methods: CpuMethod[];
  start: GeneratedHandlerProgram;
  reset: GeneratedHandlerProgram;
  input: GeneratedHandlerProgram;
  step?: GeneratedHandlerProgram;
  service: GeneratedHandlerProgram;
  fetch: GeneratedHandlerProgram;
  opcodes: CpuOpcode[];
  opcodeDecrypt?: {
    boundary: number;
    addressMask: number;
    xorByAddress: Record<string, number>;
  };
  internal?: {
    ram: { start: number; end: number }[];
    ports: {
      dataAddress: number;
      directionAddress: number;
      inputSignal: string;
      outputSignal: string;
      outputMask: number;
    }[];
    portHandshake?: {
      portIndex: number;
      controlAddress: number;
      inputLine: number;
      latchEnableMask: number;
      outputSelectMask: number;
      flagMask: number;
    };
  };
  summary: {
    diagnostics: number;
  };
}

export interface GeneratedCpuExecutable {
  type: string;
  summary: {
    diagnostics: number;
    [name: string]: number;
  };
  create(bus: CpuBus): Cpu;
}

export interface Cpu {
  reset(): void;
  step(): number;
  run(cycles: number): number;
  setIrqLine(active: boolean, dataBus?: number | (() => number), hold?: boolean): void;
  /** Drive a generated CPU's numbered input line (RP2A03 keeps APU IRQ separate). */
  setInputLine(inputnum: number, state: number): void;
  nmi(): void;
  get(name: string): number;
  /** MAME device_state_interface::state_int, by the CPU's own state index. */
  stateInt(index: number): number;
  set(name: string, value: number): void;
  invoke(name: string, ...args: number[]): number;
}

type GeneratedCpuRegistration = GeneratedCpuDefinition | GeneratedCpuExecutable;

const DEFINITIONS = new Map<string, GeneratedCpuRegistration>();

export function registerGeneratedCpu(definition: GeneratedCpuRegistration): void {
  if (definition.summary.diagnostics) {
    throw new Error(
      `cannot register ${definition.type}: ${definition.summary.diagnostics} compiler diagnostics`,
    );
  }
  DEFINITIONS.set(definition.type.toUpperCase(), definition);
}

export function clearGeneratedCpus(): void {
  DEFINITIONS.clear();
}

export function hasGeneratedCpu(type: string): boolean {
  return DEFINITIONS.has(type.toUpperCase());
}

export function createCpu(type: string, bus: CpuBus): Cpu {
  const definition = DEFINITIONS.get(type.toUpperCase());
  if (!definition) throw new Error(`generated CPU "${type}" was not registered`);
  if ('create' in definition) return definition.create(bus);
  return new IrCpu(definition, bus);
}

class IrCpu implements Cpu {
  private readonly definition: GeneratedCpuDefinition;
  private readonly bus: CpuBus;
  private readonly members: Record<string, unknown> = {};
  private readonly memberBits = new Map<string, 1 | 8 | 16 | 32>();
  private readonly opcodes: Map<string, CpuOpcode>;
  private readonly methods: Map<string, CpuMethod>;
  private readonly bindings: GeneratedHandlerBindings;
  private irqData: number | (() => number) = 0xff;
  private irqHold = false;
  /** The CPU's state enum, resolved to register names on first use. */
  private stateIndexNames?: Map<number, string>;
  private readonly internalRam = new Map<number, number>();
  private readonly portData: number[];
  private readonly portDirection: number[];
  private portHandshakeControl = 0;
  private portHandshakeInputState = 0;
  private portHandshakeLatched = false;
  private portHandshakePendingClear = false;

  private get addressMask(): number {
    return this.definition.addressMask ?? 0xffff;
  }

  constructor(definition: GeneratedCpuDefinition, bus: CpuBus) {
    this.definition = definition;
    this.bus = bus;
    this.portData = new Array(definition.internal?.ports.length ?? 0).fill(0);
    this.portDirection = new Array(definition.internal?.ports.length ?? 0).fill(0);
    this.opcodes = new Map(definition.opcodes.map(opcode => [opcode.key, opcode]));
    this.methods = new Map(definition.methods.map(method => [method.name, method]));
    for (const member of definition.members) {
      if (member.z8000Registers) {
        this.members[member.name] = new Z8000RegisterFile();
      } else if (member.wordByteRegisters) {
        this.members[member.name] = new WordByteRegisterFile(member.wordByteRegisters);
      } else if (member.values) {
        this.members[member.name] = member.bits === 8
          ? Uint8Array.from(member.values)
          : [...member.values];
      } else if (member.fields) {
        this.members[member.name] = typedObject(member.fields);
      } else if (member.pair) {
        this.members[member.name] = new Pair16(member.initial ?? 0);
      } else {
        this.members[member.name] = member.initial ?? 0;
        if (member.bits) this.memberBits.set(member.name, member.bits);
      }
    }

    const getters: Record<string, () => unknown> = {};
    const setters: Record<string, (value: number) => void> = {};
    for (const member of definition.members) {
      getters[member.name] = () => this.readPath(member.name);
      setters[member.name] = value => this.writePath(member.name, value, member.bits);
    }
    for (const [name, alias] of Object.entries(definition.aliases)) {
      getters[name] = () => this.readAlias(alias);
      setters[name] = value => this.writeAlias(alias, value);
    }

    const referenceCalls: NonNullable<GeneratedHandlerBindings['referenceCalls']> = {};
    const callParameters: NonNullable<GeneratedHandlerBindings['callParameters']> = {};
    this.bindings = {
      members: this.members,
      getters,
      setters,
      constants: definition.constants,
      calls: this.externalCalls(),
      referenceCalls,
      callParameters,
    };
    for (const method of definition.methods) {
      const parameters = splitParameters(method.parameters);
      callParameters[method.name] = parameters;
      referenceCalls[method.name] = (...args) => this.executeMethod(method, parameters, args);
    }
    callParameters.swap = ['auto &left', 'auto &right'];
    referenceCalls.swap = (left, right) => {
      if (!isLValue(left) || !isLValue(right)) return 0;
      const value = Number(left.get()) || 0;
      const other = Number(right.get()) || 0;
      left.set(other);
      right.set(value);
      return 0;
    };
    for (const [name, delta] of [['POSTINC', 1], ['POSTDEC', -1]] as const) {
      callParameters[name] = ['auto &value'];
      referenceCalls[name] = value => {
        if (!isLValue(value)) return 0;
        const previous = Number(value.get()) || 0;
        value.set(previous + delta);
        return previous;
      };
    }

    this.execute(definition.start);
    this.reset();
  }

  reset(): void {
    this.portDirection.fill(0);
    this.portHandshakeControl = 0;
    this.portHandshakeInputState = 0;
    this.portHandshakeLatched = false;
    this.portHandshakePendingClear = false;
    this.execute(this.definition.reset);
  }

  step(): number {
    if (this.definition.step) {
      return Number(this.execute(this.definition.step)) || 0;
    }
    this.set('cycles', 0);
    this.set('m_icount', 1);
    this.execute(this.definition.service);
    if (this.get('cycles') > 0) return this.get('cycles');

    this.execute(this.definition.fetch);
    let dispatches = 0;
    while (true) {
      if (++dispatches > 8) throw new Error(`${this.definition.type} dispatch loop exceeded 8`);
      const opcode = this.opcodes.get(this.refKey());
      if (!opcode) throw new Error(`${this.definition.type} has no opcode ${this.refKey()}`);
      this.execute(opcode.program);
      if (!opcode.dispatch) break;
    }
    return this.get('cycles');
  }

  run(target: number): number {
    let total = 0;
    while (total < target) {
      this.bus.timing?.(total, target);
      total += this.step();
    }
    this.bus.timing?.(target, target);
    return total;
  }

  setIrqLine(active: boolean, dataBus: number | (() => number) = 0xff, hold = false): void {
    if (active) this.irqData = dataBus;
    this.irqHold = active && hold;
    this.setInputLine(
      this.constant('INPUT_LINE_IRQ0', 0),
      active ? this.constant('ASSERT_LINE', 1) : this.constant('CLEAR_LINE', 0),
    );
  }

  setInputLine(inputnum: number, state: number): void {
    this.updatePortHandshakeInput(inputnum, state);
    this.execute(this.definition.input, { inputnum, state });
  }

  nmi(): void {
    const inputnum = this.constant('INPUT_LINE_NMI', -1);
    this.execute(this.definition.input, { inputnum, state: this.constant('ASSERT_LINE', 1) });
    this.execute(this.definition.input, { inputnum, state: this.constant('CLEAR_LINE', 0) });
  }

  get(name: string): number {
    const alias = this.definition.aliases[name];
    const value = alias ? this.readAlias(alias) : this.readPath(name);
    return Number(value) || 0;
  }

  /**
   * A driver reads a live register through MAME's state interface, naming it by
   * the CPU family's own enum (`m_maincpu->state_int(Z80_HL)`). The enum is
   * lowered with the rest of the CPU's constants, and MAME names each entry
   * after the register it exposes, so the index resolves back to a register
   * this CPU already knows.
   */
  stateInt(index: number): number {
    const name = this.stateNames().get(index);
    return name === undefined ? 0 : this.get(name);
  }

  private stateNames(): Map<number, string> {
    if (this.stateIndexNames) return this.stateIndexNames;
    const names = new Map<number, string>();
    for (const [name, value] of Object.entries(this.definition.constants)) {
      const register = /^[A-Z][A-Z0-9]*_([A-Z0-9_]+)$/.exec(name)?.[1];
      if (register && this.definition.aliases[register] && !names.has(value)) {
        names.set(value, register);
      }
    }
    this.stateIndexNames = names;
    return names;
  }

  set(name: string, value: number): void {
    const alias = this.definition.aliases[name];
    if (alias) this.writeAlias(alias, value);
    else this.writePath(name, value, this.memberBits.get(name));
  }

  invoke(name: string, ...args: number[]): number {
    const method = this.methods.get(name);
    if (!method) throw new Error(`${this.definition.type} has no generated method "${name}"`);
    const parameters = splitParameters(method.parameters);
    return Number(this.executeMethod(method, parameters, args)) || 0;
  }

  private execute(program: GeneratedHandlerProgram, args: Record<string, unknown> = {}): unknown {
    return executeGeneratedProgram(program, this.bindings, args).value;
  }

  private executeMethod(
    method: CpuMethod,
    parameters: string[],
    args: GeneratedCallArgument[],
  ): unknown {
    const names = parameters.map(parameterName);
    return this.execute(
      method.program,
      Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0])),
    );
  }

  private externalCalls(): NonNullable<GeneratedHandlerBindings['calls']> {
    const dataAddress = (address: number): number => {
      const masked = address & this.addressMask;
      return this.definition.alignDataWords ? masked & ~1 : masked;
    };
    return {
      READ: address => {
        if (this.definition.dialect !== 'mame-musashi-generated-handler-table') {
          this.set('cycles', this.get('cycles') + 1);
        }
        return this.readMemory(address);
      },
      READ16BE: address => {
        const location = dataAddress(address);
        return this.bus.read16be && !this.definition.internal
          ? this.bus.read16be(location)
          : ((this.readMemory(location) << 8) | this.readMemory(location + 1)) & 0xffff;
      },
      READ32BE: address => {
        const location = dataAddress(address);
        return (
          (this.readMemory(location) << 24) |
          (this.readMemory(location + 1) << 16) |
          (this.readMemory(location + 2) << 8) |
          this.readMemory(location + 3)
        ) >>> 0;
      },
      READ_VECTOR: ordinal => {
        this.set('cycles', this.get('cycles') + 1);
        return this.readMemory(this.get('m_ea.w') + ordinal);
      },
      ARG: address => {
        this.set('cycles', this.get('cycles') + 1);
        return this.readMemory(address);
      },
      OPCODE: address => {
        this.set('cycles', this.get('cycles') + 1);
        return this.readOpcode(address);
      },
      WRITE: (address, value) => {
        if (this.definition.dialect !== 'mame-musashi-generated-handler-table') {
          this.set('cycles', this.get('cycles') + 1);
        }
        this.writeMemory(address, value);
        return 0;
      },
      WRITE16BE: (address, value) => {
        const location = dataAddress(address);
        if (this.bus.write16be && !this.definition.internal) {
          this.bus.write16be(location, value & 0xffff);
          return 0;
        }
        this.writeMemory(location, value >>> 8);
        this.writeMemory(location + 1, value);
        return 0;
      },
      WRITE32BE: (address, value) => {
        const location = dataAddress(address);
        this.writeMemory(location, value >>> 24);
        this.writeMemory(location + 1, value >>> 16);
        this.writeMemory(location + 2, value >>> 8);
        this.writeMemory(location + 3, value);
        return 0;
      },
      'm_data.read_interruptible': address => this.bus.read(address & this.addressMask) & 0xff,
      'm_data.write_interruptible': (address, value) => {
        this.bus.write(address & this.addressMask, value & 0xff);
      },
      'm_opcodes.read_byte': address =>
        (this.bus.readOpcode?.(address & this.addressMask) ??
          this.bus.read(address & this.addressMask)) & 0xff,
      'm_args.read_byte': address => this.bus.read(address & this.addressMask) & 0xff,
      'm_program.read_byte': address => this.readMemory(address),
      'm_cprogram.read_byte': address => this.readMemory(address),
      'm_copcodes.read_byte': address => this.readMemory(address),
      'm_program.write_byte': (address, value) => {
        this.writeMemory(address, value);
      },
      'm_io.read_interruptible': port => this.bus.in(port & 0xffff) & 0xff,
      'm_io.write_interruptible': (port, value) => {
        this.bus.out(port & 0xffff, value & 0xff);
      },
      PORT_READ: port => this.bus.in(port & 0xffff) & 0xff,
      PORT_READ16: port => (this.bus.in(port & 0xffff) & 0xff) |
        ((this.bus.in((port + 1) & 0xffff) & 0xff) << 8),
      PORT_WRITE: (port, value) => {
        this.bus.out(port & 0xffff, value & 0xff);
        return 0;
      },
      PORT_WRITE16: (port, value) => {
        this.bus.out(port & 0xffff, value & 0xff);
        this.bus.out((port + 1) & 0xffff, (value >>> 8) & 0xff);
        return 0;
      },
      READ16LE: address => this.readMemory(address) | (this.readMemory(address + 1) << 8),
      WRITE16LE: (address, value) => {
        this.writeMemory(address, value);
        this.writeMemory(address + 1, value >>> 8);
        return 0;
      },
      program_r: address => this.readMemory(address & 0x0fff),
      ram_r: address => {
        const ram = this.members.m_dataptr as Uint8Array | number[] | undefined;
        return ram?.[address & 0x7f] ?? 0;
      },
      ram_w: (address, value) => {
        const ram = this.members.m_dataptr as Uint8Array | number[] | undefined;
        if (ram) ram[address & 0x7f] = value & 0xff;
        return 0;
      },
      ext_r: address => this.bus.in(address & 0xff) & 0xff,
      ext_w: (address, value) => {
        this.bus.out(address & 0xff, value & 0xff);
        return 0;
      },
      port_r: port => Number(this.bus.signal?.(`p${port}_in_cb`, 0) ?? 0xff),
      port_w: (port, value) => Number(
        this.bus.signal?.(`p${port}_out_cb`, value & 0xff) ?? 0,
      ),
      test_r: port => Number(this.bus.signal?.(`t${port}_in_cb`, 0) ?? 0),
      bus_r: () => Number(this.bus.signal?.('bus_in_cb', 0) ?? 0xff),
      bus_w: value => Number(this.bus.signal?.('bus_out_cb', value & 0xff) ?? 0),
      prog_w: value => Number(this.bus.signal?.('prog_out_cb', value & 1) ?? 0),
      m_out_inte_func: state => this.bus.signal?.('out_inte_func', state) ?? 0,
      m_out_sod_func: state => this.bus.signal?.('out_sod_func', state) ?? 0,
      m_refresh_cb: state => this.bus.signal?.('refresh_cb', state) ?? 0,
      m_nomreq_cb: state => this.bus.signal?.('nomreq_cb', state) ?? 0,
      m_halt_cb: state => this.bus.signal?.('halt_cb', state) ?? 0,
      m_busack_cb: state => this.bus.signal?.('busack_cb', state) ?? 0,
      standard_irq_callback: (...args) =>
        this.bus.acknowledge?.(Number(args[0]) || 0) ?? this.acknowledgeIrq(),
      daisy_get_irq_device: () => 0,
      daisy_chain_present: () => 0,
      daisy_update_irq_state: () => 0,
      access_to_be_redone: () => 0,
      debugger_enabled: () => 0,
      debugger_instruction_hook: () => 0,
      debugger_wait_hook: () => 0,
      total_cycles: () => 1,
      LOGMASKED: () => 0,
      logerror: () => 0,
      tag: () => 0,
    };
  }

  private readMemory(address: number): number {
    const location = address & this.addressMask;
    const ports = this.definition.internal?.ports ?? [];
    const handshake = this.definition.internal?.portHandshake;
    if (location === handshake?.controlAddress) {
      if (this.portHandshakeControl & handshake.flagMask) {
        this.portHandshakePendingClear = true;
      }
      return this.portHandshakeControl;
    }
    for (let index = 0; index < ports.length; index++) {
      const port = ports[index]!;
      if (location === port.directionAddress) return 0xff;
      if (location !== port.dataAddress) continue;
      const direction = this.portDirection[index]!;
      if (index === handshake?.portIndex) {
        if (this.portHandshakePendingClear) {
          this.portHandshakeControl &= ~handshake.flagMask;
          this.portHandshakePendingClear = false;
        }
        const data =
          (this.portHandshakeControl & handshake.latchEnableMask) ||
          direction === 0xff
            ? this.portData[index]!
            : (Number(this.bus.signal?.(port.inputSignal, 0) ?? 0xff) & ~direction) |
              (this.portData[index]! & direction);
        this.portHandshakeLatched = false;
        return data & 0xff;
      }
      const input = Number(this.bus.signal?.(port.inputSignal, 0) ?? 0xff) & 0xff;
      return direction === 0xff
        ? this.portData[index]!
        : (input & ~direction) | (this.portData[index]! & direction);
    }
    if (this.isInternalRam(location)) return this.internalRam.get(location) ?? 0;
    return this.bus.read(location) & 0xff;
  }

  private readOpcode(address: number): number {
    const location = address & this.addressMask;
    const value = this.readMemory(location);
    const decrypt = this.definition.opcodeDecrypt;
    if (!decrypt || location < decrypt.boundary) return value;
    return value ^ (decrypt.xorByAddress[String(location & decrypt.addressMask)] ?? 0);
  }

  private writeMemory(address: number, value: number): void {
    const location = address & this.addressMask;
    const data = value & 0xff;
    const ports = this.definition.internal?.ports ?? [];
    const handshake = this.definition.internal?.portHandshake;
    if (location === handshake?.controlAddress) {
      if ((globalThis as {__csrDbg?: number}).__csrDbg! < 10) {
        (globalThis as {__csrDbg?: number}).__csrDbg = ((globalThis as {__csrDbg?: number}).__csrDbg ?? 0) + 1;
        console.log('[hs] csr write', data.toString(16));
      }
      this.portHandshakeControl = data;
      return;
    }
    for (let index = 0; index < ports.length; index++) {
      const port = ports[index]!;
      if (location === port.directionAddress) {
        this.portDirection[index] = data;
        this.emitPort(index);
        return;
      }
      if (location === port.dataAddress) {
        if (index === handshake?.portIndex && this.portHandshakePendingClear) {
          this.portHandshakeControl &= ~handshake.flagMask;
          this.portHandshakePendingClear = false;
        }
        this.portData[index] = data;
        this.emitPort(index);
        return;
      }
    }
    if (this.isInternalRam(location)) {
      this.internalRam.set(location, data);
      return;
    }
    this.bus.write(location, data);
  }

  private emitPort(index: number): void {
    const port = this.definition.internal?.ports[index];
    if (!port) return;
    const direction = this.portDirection[index]!;
    const data = (this.portData[index]! & direction) | (direction ^ 0xff);
    this.bus.signal?.(port.outputSignal, data & port.outputMask);
  }

  private updatePortHandshakeInput(inputnum: number, state: number): void {
    const handshake = this.definition.internal?.portHandshake;
    if (handshake && (globalThis as {__hsDbg?: number}).__hsDbg! < 20) {
      (globalThis as {__hsDbg?: number}).__hsDbg = ((globalThis as {__hsDbg?: number}).__hsDbg ?? 0) + 1;
      console.log('[hs] input line', inputnum, 'state', state, 'want', handshake.inputLine,
        'csr', this.portHandshakeControl.toString(16), 'latched', this.portHandshakeLatched);
    }
    if (!handshake || inputnum !== handshake.inputLine) return;
    if (
      !this.portHandshakeInputState &&
      state !== 0 &&
      !this.portHandshakeLatched &&
      (this.portHandshakeControl & handshake.latchEnableMask)
    ) {
      const port = this.definition.internal!.ports[handshake.portIndex]!;
      const direction = this.portDirection[handshake.portIndex]!;
      const input = Number(this.bus.signal?.(port.inputSignal, 0) ?? 0xff) & 0xff;
      this.portData[handshake.portIndex] =
        (input & ~direction) | (this.portData[handshake.portIndex]! & direction);
      this.portHandshakeLatched = true;
      this.portHandshakeControl |= handshake.flagMask;
    }
    this.portHandshakeInputState = state;
  }

  private isInternalRam(address: number): boolean {
    return (this.definition.internal?.ram ?? [])
      .some(range => address >= range.start && address <= range.end);
  }

  private refKey(): string {
    const ref = this.get('m_ref') >>> 0;
    return `${hex((ref >>> 16) & 0xff)}${hex((ref >>> 8) & 0xff)}`;
  }

  private acknowledgeIrq(): number {
    const source = this.irqData;
    const data = typeof source === 'function' ? source() : source;
    if (this.irqHold) {
      this.irqHold = false;
      this.setIrqLine(false);
    }
    return data;
  }

  private constant(name: string, fallback: number): number {
    return this.definition.constants[name] ?? fallback;
  }

  private readAlias(alias: CpuAlias): unknown {
    const value = Number(this.readPath(alias.member)) || 0;
    if (alias.part === 'high') return (value >>> 8) & 0xff;
    if (alias.part === 'low') return value & 0xff;
    return value;
  }

  private writeAlias(alias: CpuAlias, value: number): void {
    if (alias.part === 'high' || alias.part === 'low') {
      const pair = Number(this.readPath(alias.member)) || 0;
      const next = alias.part === 'high'
        ? ((pair & 0x00ff) | ((value & 0xff) << 8))
        : ((pair & 0xff00) | (value & 0xff));
      this.writePath(alias.member, next, 16);
      return;
    }
    this.writePath(alias.member, value, alias.bits);
  }

  private readPath(path: string): unknown {
    const parts = path.split('.');
    let value: unknown = this.members[parts.shift()!];
    for (const part of parts) {
      if (!value || typeof value !== 'object') return 0;
      value = (value as Record<string, unknown>)[part];
    }
    return value ?? 0;
  }

  private writePath(path: string, value: number, bits?: 1 | 8 | 16 | 32): void {
    const parts = path.split('.');
    const wrapped = wrap(value, bits);
    if (parts.length === 1) {
      const current = this.members[path];
      if (current instanceof Pair16) {
        current.w = value;
        return;
      }
      this.members[path] = wrapped;
      return;
    }
    const property = parts.pop()!;
    let object = this.members[parts.shift()!];
    for (const part of parts) {
      if (!object || typeof object !== 'object') return;
      object = (object as Record<string, unknown>)[part];
    }
    if (object && typeof object === 'object') {
      (object as Record<string, unknown>)[property] = wrapped;
    }
  }
}

function splitParameters(parameters: string): string[] {
  return parameters.split(',').map(parameter => parameter.trim()).filter(Boolean);
}

function parameterName(parameter: string): string {
  return /(\w+)\s*$/.exec(parameter.replace(/\.\.\./g, '').trim())?.[1] ?? parameter;
}

function isLValue(value: GeneratedCallArgument): value is GeneratedLValue {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'generatedLValue' in value &&
    value.generatedLValue === true,
  );
}

function wrap(value: number, bits?: 1 | 8 | 16 | 32): number {
  if (bits === 1) return value ? 1 : 0;
  if (bits === 8) return value & 0xff;
  if (bits === 16) return value & 0xffff;
  if (bits === 32) return value >>> 0;
  return value;
}

function hex(value: number): string {
  return value.toString(16).padStart(2, '0');
}

function typedObject(fields: Record<string, 1 | 8 | 16 | 32>): Record<string, unknown> {
  const values: Record<string, number> = {};
  const object: Record<string, unknown> = {};
  for (const [name, bits] of Object.entries(fields)) {
    values[name] = 0;
    Object.defineProperty(object, name, {
      enumerable: true,
      get: () => values[name],
      set: (value: number) => {
        values[name] = wrap(value, bits);
      },
    });
  }
  return object;
}

class WordByteRegisterFile {
  readonly w: Uint16Array;
  readonly b: Uint8Array;

  constructor(words: number) {
    const buffer = new ArrayBuffer(words * 2);
    this.w = new Uint16Array(buffer);
    this.b = new Uint8Array(buffer);
  }
}

class Z8000RegisterFile {
  readonly W = new Uint16Array(16);
  readonly B: Record<number, number>;
  readonly L: Record<number, number>;
  readonly Q: Record<number, number>;

  constructor() {
    this.B = new Proxy({}, {
      get: (_target, key) => {
        const index = Number(key); const word = this.W[index >>> 1] ?? 0;
        return index & 1 ? word & 0xff : word >>> 8;
      },
      set: (_target, key, value) => {
        const index = Number(key); const slot = index >>> 1; const old = this.W[slot] ?? 0;
        this.W[slot] = index & 1 ? (old & 0xff00) | (Number(value) & 0xff)
          : (old & 0xff) | ((Number(value) & 0xff) << 8); return true;
      },
    }) as Record<number, number>;
    this.L = new Proxy({}, {
      get: (_target, key) => {
        const index = Number(key) * 2;
        return ((((this.W[index] ?? 0) << 16) | (this.W[index + 1] ?? 0)) >>> 0);
      },
      set: (_target, key, value) => {
        const index = Number(key) * 2; const data = Number(value) >>> 0;
        this.W[index] = data >>> 16; this.W[index + 1] = data; return true;
      },
    }) as Record<number, number>;
    this.Q = new Proxy({}, {
      get: (_target, key) => {
        const index = Number(key) * 4;
        return (this.W[index] ?? 0) * 0x1000000000000 + (this.W[index + 1] ?? 0) * 0x100000000 +
          (this.W[index + 2] ?? 0) * 0x10000 + (this.W[index + 3] ?? 0);
      },
      set: (_target, key, value) => {
        const index = Number(key) * 4; let data = Number(value);
        this.W[index + 3] = data; data = Math.floor(data / 0x10000);
        this.W[index + 2] = data; data = Math.floor(data / 0x10000);
        this.W[index + 1] = data; data = Math.floor(data / 0x10000);
        this.W[index] = data; return true;
      },
    }) as Record<number, number>;
  }
}

class Pair16 {
  private value = 0;
  readonly b: { h: number; l: number };

  constructor(value: number) {
    this.value = value & 0xffff;
    const pair = this;
    this.b = Object.defineProperties({}, {
      h: {
        enumerable: true,
        get: () => (pair.value >>> 8) & 0xff,
        set: (next: number) => {
          pair.value = ((pair.value & 0x00ff) | ((next & 0xff) << 8)) & 0xffff;
        },
      },
      l: {
        enumerable: true,
        get: () => pair.value & 0xff,
        set: (next: number) => {
          pair.value = ((pair.value & 0xff00) | (next & 0xff)) & 0xffff;
        },
      },
    }) as { h: number; l: number };
  }

  get w(): number {
    return this.value;
  }

  set w(value: number) {
    this.value = value & 0xffff;
  }

  valueOf(): number {
    return this.value;
  }
}
