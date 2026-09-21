import type { GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import type {
  GeneratedCpuAlias,
  GeneratedCpuDefinition,
  GeneratedCpuMember,
  GeneratedCpuMethod,
} from './cpu-compiler.ts';

interface EmitContext {
  definition: GeneratedCpuDefinition;
  locals: Map<string, string | undefined>;
  returnType: 'number' | 'void';
  /** The method's C return type, which a strict-call core narrows to. */
  returnValueType?: string;
}

const DEFAULT_CONSTANTS: Record<string, number> = {
  ASSERT_LINE: 1,
  CLEAR_LINE: 0,
  HOLD_LINE: 2,
  INPUT_LINE_IRQ0: 0,
  INPUT_LINE_NMI: -1,
  INPUT_LINE_RESET: -2,
};

/**
 * Lower the auditable CPU IR into direct TypeScript. The emitted module is the
 * executable artifact shipped to the browser; the JSON IR remains alongside it
 * for provenance and inspection.
 */
export function generatedCpuExecutableSource(definition: GeneratedCpuDefinition): string {
  if (definition.summary.diagnostics) {
    throw new Error(
      `cannot emit ${definition.type}: ${definition.summary.diagnostics} compiler diagnostics`,
    );
  }

  // Only a core that charges a cycle per bus access can answer how far into
  // the current instruction it is; I8080/I8085A keep no such counter.
  const countsBusCycles = definition.members.some(member => member.name === 'cycles')
    && definition.fixedInstructionCycles !== true;
  const fields = definition.members.map(member => emitMember(member)).join('\n');
  const aliases = Object.entries(definition.aliases)
    .map(([name, alias]) => emitAlias(name, alias))
    .join('\n');
  const methods = definition.methods.map(method => emitMethod(definition, method)).join('\n\n');
  const opcodeCases = definition.opcodes.map(opcode => {
    const context = contextFor(definition, [], 'number');
    const body = emitProgram(opcode.program, context, 8);
    return [
      `      case 0x${opcode.key}: {`,
      body,
      opcode.dispatch ? '        continue;' : '        return this.cycles;',
      '      }',
    ].filter(Boolean).join('\n');
  }).join('\n');

  const step = definition.step
    ? emitProgram(definition.step, contextFor(definition, [], 'number'), 4)
    : `    this.cycles = 0;
    this.m_icount = 1;
    this.generatedService();
    if (this.cycles > 0) return this.cycles;
    this.generatedFetch();
    let dispatches = 0;
    while (true) {
      if (++dispatches > 8) throw new Error('${definition.type} dispatch loop exceeded 8');
      switch ((this.m_ref >>> 8) & 0xffff) {
${opcodeCases}
        default:
          throw new Error('${definition.type} has no generated opcode ' +
            (((this.m_ref >>> 8) & 0xffff).toString(16).padStart(4, '0')));
      }
    }`;

  return `// GENERATED from MAME CPU source and opcode DSL; do not edit.
// Sources:
${definition.sourceFiles.map(file => `// - ${file}`).join('\n')}
import type {
  Cpu,
  CpuBus,
  GeneratedCpuExecutable,
} from '../../core/generated-cpu.js';

/** MAME's bitswap<N>: the first listed source bit is the result's MSB. */
function bitswap(value: number, ...bits: number[]): number {
  let swapped = 0;
  for (const bit of bits) swapped = (swapped << 1) | ((value >>> bit) & 1);
  return swapped >>> 0;
}

function popcount32(value: number): number {
  value -= (value >>> 1) & 0x55555555;
  value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
  return (((value + (value >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

/**
 * The byte halves of a Pair16, as a class rather than a per-instance object.
 *
 * These accessors are the hottest path in the whole emulator: the Z80's TDAT
 * aliases resolve to m_shared_data.b.l, and on Bubble Bobble the four of them
 * were 23% of total run time. Building the byte view with
 * Object.defineProperties and a closure per instance gave every pair its own
 * hidden class and its own accessor functions, so each site went megamorphic
 * and V8 could not inline through it. One class means one hidden class and one
 * pair of prototype accessors for every register on every core.
 */
class Pair16Bytes {
  private readonly pair: Pair16;

  constructor(pair: Pair16) { this.pair = pair; }

  get h(): number { return (this.pair.value >>> 8) & 0xff; }
  set h(next: number) {
    this.pair.value = ((this.pair.value & 0x00ff) | ((next & 0xff) << 8)) & 0xffff;
  }

  get l(): number { return this.pair.value & 0xff; }
  set l(next: number) {
    this.pair.value = ((this.pair.value & 0xff00) | (next & 0xff)) & 0xffff;
  }
}

class Pair16 {
  /** Read by Pair16Bytes; not part of the emitted core's own vocabulary. */
  value = 0;
  readonly b: Pair16Bytes;

  constructor(value = 0) {
    this.value = value & 0xffff;
    this.b = new Pair16Bytes(this);
  }

  get w(): number { return this.value; }
  set w(value: number) { this.value = value & 0xffff; }
}

/**
 * The word halves of a Pair32: MAME's PAIR union viewed as \`w.l\` / \`w.h\`.
 *
 * Split into its own class for the same reason as Pair16Bytes -- one hidden
 * class and one pair of prototype accessors shared by every 32-bit register
 * on every core, instead of a closure per instance.
 */
class Pair32Words {
  private readonly pair: Pair32;

  constructor(pair: Pair32) { this.pair = pair; }

  get h(): number { return (this.pair.value >>> 16) & 0xffff; }
  set h(next: number) {
    this.pair.value = (((this.pair.value & 0x0000ffff) | ((next & 0xffff) << 16))) >>> 0;
  }

  get l(): number { return this.pair.value & 0xffff; }
  set l(next: number) {
    this.pair.value = ((this.pair.value & 0xffff0000) | (next & 0xffff)) >>> 0;
  }
}

/**
 * The byte halves of a Pair32. MAME's PAIR aliases \`b.l\`/\`b.h\` onto the
 * low word only (bits 0-7 and 8-15), which is what the TMS320C1x opcode
 * register relies on: \`m_opcode.b.h\` is the instruction's major byte.
 */
class Pair32Bytes {
  private readonly pair: Pair32;

  constructor(pair: Pair32) { this.pair = pair; }

  get h(): number { return (this.pair.value >>> 8) & 0xff; }
  set h(next: number) {
    this.pair.value = ((this.pair.value & 0xffff00ff) | ((next & 0xff) << 8)) >>> 0;
  }

  get l(): number { return this.pair.value & 0xff; }
  set l(next: number) {
    this.pair.value = ((this.pair.value & 0xffffff00) | (next & 0xff)) >>> 0;
  }
}

/**
 * MAME's 32-bit PAIR union. \`.d\` is the whole doubleword, \`.w.h\`/\`.w.l\`
 * its 16-bit halves and \`.b.h\`/\`.b.l\` the bytes of the low word, matching
 * the LSB_FIRST layout in MAME's own osdcomm.h.
 */
class Pair32 {
  /** Read by Pair32Words and Pair32Bytes; not the emitted core's vocabulary. */
  value = 0;
  readonly w: Pair32Words;
  readonly b: Pair32Bytes;

  constructor(value = 0) {
    this.value = value >>> 0;
    this.w = new Pair32Words(this);
    this.b = new Pair32Bytes(this);
  }

  get d(): number { return this.value; }
  set d(value: number) { this.value = value >>> 0; }
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

/**
 * The TMS34010 register file: each register is a union of \`int32_t reg\` and
 * \`XY { int16_t x, y; }\`, laid out little-endian, so \`xy.x\` is the low
 * half of \`reg\` and \`xy.y\` the high half. One Int32Array holds the file and
 * both views read and write it, which is what the union does.
 */
class XyHalves {
  private readonly cells: Int32Array;
  private readonly index: number;
  constructor(cells: Int32Array, index: number) { this.cells = cells; this.index = index; }
  get x(): number { return (this.cells[this.index]! << 16) >> 16; }
  set x(value: number) {
    this.cells[this.index] = (this.cells[this.index]! & ~0xffff) | (value & 0xffff);
  }
  get y(): number { return this.cells[this.index]! >> 16; }
  set y(value: number) {
    this.cells[this.index] = (this.cells[this.index]! & 0xffff) | (value << 16);
  }
}

class XyRegister {
  private readonly cells: Int32Array;
  private readonly index: number;
  readonly xy: XyHalves;
  constructor(cells: Int32Array, index: number) {
    this.cells = cells;
    this.index = index;
    this.xy = new XyHalves(cells, index);
  }
  get reg(): number { return this.cells[this.index]!; }
  set reg(value: number) { this.cells[this.index] = value; }
}

/** A local \`XY\` value: a copy with its own two int16 fields. */
class XyValue {
  private px = 0;
  private py = 0;
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  get x(): number { return this.px; }
  set x(value: number) { this.px = (value << 16) >> 16; }
  get y(): number { return this.py; }
  set y(value: number) { this.py = (value << 16) >> 16; }
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
        return index & 1 ? word & 0xff : (word >>> 8) & 0xff;
      },
      set: (_target, key, value) => {
        const index = Number(key); const wordIndex = index >>> 1;
        const old = this.W[wordIndex] ?? 0;
        this.W[wordIndex] = index & 1
          ? (old & 0xff00) | (Number(value) & 0xff)
          : (old & 0x00ff) | ((Number(value) & 0xff) << 8);
        return true;
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
        return (this.W[index] ?? 0) * 0x1000000000000 +
          (this.W[index + 1] ?? 0) * 0x100000000 +
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

/** Every method this core lowered from its MAME source. */
const GENERATED_METHOD_NAMES = new Set<string>(${JSON.stringify(
  [...new Set(definition.methods.map(method => method.name))],
)});

class Generated${safeName(definition.type)} implements Cpu {
  private readonly bus: CpuBus;
  private irqData: number | (() => number) = 0xff;
  private irqHold = false;
${emitInternalFields(definition)}
${fields}
${aliases}

  constructor(bus: CpuBus) {
    this.bus = bus;
    this.generatedStart();
    this.reset();
  }

  reset(): void {
    this.resetInternal();
${emitProgram(definition.reset, contextFor(definition, [], 'void'), 4)}
  }

  step(): number {
${step}
  }

  /**
   * Cycles hardware has taken from this processor, charged against the slice it
   * is inside.
   *
   * MAME device_execute_interface::adjust_icount reduces the remaining
   * instruction budget; the time still elapses. It is NOT a request to park --
   * System 1 charges one cycle per slow access and Zaxxon five per sprite entry
   * copied, and stopping the slice on either starves the processor. The Atari
   * 2600's WSYNC uses the same call with a whole line's remainder, which parks
   * the 6507 only because the charge happens to consume what is left.
   *
   * Charging the slice the processor is inside, rather than the one after it,
   * is what matters: deferred, the 2600 lost cycles off every scanline and ran
   * 244 lines to the frame instead of 262.
   */
  stallCycles = 0;

  /**
   * MAME device_execute_interface::abort_timeslice: finish the instruction in
   * progress and hand the rest of the slice back to the scheduler, so the
   * processors behind this one catch up to it before a synchronized callback
   * changes what they can see.
   */
  timesliceAborted = false;

  abortTimeslice(): void {
    this.timesliceAborted = true;
  }

  run(target: number): number {
    let executed = 0;
    let stalled = 0;
    let total = 0;
    this.stallCycles = 0;
    this.timesliceAborted = false;
    while (total < target) {
${countsBusCycles ? `      // Cleared before the callback, not after: timing() is where device
      // timers run, and they read total_cycles(). Leaving the finished
      // instruction's count here while the slice total already includes it
      // would report those cycles twice.
      this.cycles = 0;
` : ''}      this.bus.timing?.(total, target);
      executed += this.step();
      if (this.stallCycles !== 0) {
        stalled += this.stallCycles;
        this.stallCycles = 0;
      }
      total = executed + stalled;
      if (this.timesliceAborted) break;
    }
${countsBusCycles ? '    this.cycles = 0;\n' : ''}    // An aborted slice ends where the processor stopped, not at its target.
    const settled = Math.min(total, target);
    this.bus.timing?.(settled, settled);
    return total;
  }
${countsBusCycles ? `
  /**
   * Cycles consumed so far by the instruction being executed.
   *
   * This core charges each cycle before the bus access it pays for, exactly as
   * MAME's does, so during a read or write this is what MAME's total_cycles()
   * already includes. Without it the count only moves between instructions,
   * and hardware that positions itself by *when* the CPU wrote -- the Atari
   * 2600 puts every sprite on screen this way -- lands whole cycles out.
   */
  elapsedCycles(): number {
    return this.cycles;
  }
` : ''}

  setIrqLine(active: boolean, dataBus: number | (() => number) = 0xff, hold = false): void {
    if (active) this.irqData = dataBus;
    this.irqHold = active && hold;
    this.generatedInput(0, active ? 1 : 0);
  }

  setInputLine(inputnum: number, state: number): void {
    this.updateInternalInput(inputnum, state);
    this.generatedInput(inputnum, state);
  }

  nmi(): void {
    this.generatedInput(-1, 1);
    this.generatedInput(-1, 0);
  }

  private acknowledgeIrq(level = 0): number {
    const source = this.irqData;
    const data = this.bus.acknowledge?.(level) ??
      (typeof source === 'function' ? source() : source);
    if (this.irqHold) {
      this.irqHold = false;
      this.setIrqLine(false);
    }
    return data;
  }

${emitInternalMethods(definition)}
${definition.strictCalls ? emitStrictHelpers(definition) : ''}
  get(name: string): number {
    switch (name) {
${emitPublicGetCases(definition)}
      default: return 0;
    }
  }

  /** MAME device_state_interface::state_int, by the CPU's own state index. */
  stateInt(index: number): number {
    switch (index) {
${emitStateIntCases(definition)}
      default: return 0;
    }
  }

  set(name: string, value: number): void {
    switch (name) {
${emitPublicSetCases(definition)}
    }
  }

  hasMethod(name: string): boolean {
    return GENERATED_METHOD_NAMES.has(name);
  }

  methodNames(): string[] {
    return [...GENERATED_METHOD_NAMES];
  }

  invoke(name: string, ...args: number[]): number {
    switch (name) {
${emitInvokeCases(definition)}
      default: throw new Error('${definition.type} has no generated method "' + name + '"');
    }
  }

  private generatedStart(): void {
${emitProgram(definition.start, contextFor(definition, [], 'void'), 4)}
  }

  private generatedInput(inputnum: number, state: number): void {
${emitProgram(
    definition.input,
    contextFor(definition, [['inputnum', 'int'], ['state', 'int']], 'void'),
    4,
  )}
  }

  private generatedService(): void {
${emitProgram(definition.service, contextFor(definition, [], 'void'), 4)}
  }

  private generatedFetch(): void {
${emitProgram(definition.fetch, contextFor(definition, [], 'void'), 4)}
  }

${methods}
}

export const cpu: GeneratedCpuExecutable = {
  type: ${JSON.stringify(definition.type)},
  summary: ${JSON.stringify(definition.summary)},${definition.scanlineTimer
    ? `\n  scanlineTimer: ${JSON.stringify(definition.scanlineTimer)},` : ''}${definition.delegateSetters
    ? `\n  delegateSetters: ${JSON.stringify(definition.delegateSetters)},` : ''}${definition.accessors
    ? `\n  accessors: ${JSON.stringify(definition.accessors)},` : ''}
  create: (bus: CpuBus): Cpu => new Generated${safeName(definition.type)}(bus),
};

export default cpu;
`;
}

/** Name dispatch and bit-addressed word access for a strict-call core. */
function emitStrictHelpers(definition: GeneratedCpuDefinition): string {
  // One entry per method, resolved once into a Map. A member-function-pointer
  // call names its target at runtime (the TMS34010's opcode and raster-op
  // tables), and a switch over a thousand names compared them one by one: it
  // was 16% of an NBA Jam frame.
  const entries = [...new Set(definition.methods.map(method => method.name))].map(name => {
    const method = resolveMethod(definition, name, parseParameters(
      definition.methods.find(candidate => candidate.name === name)!.parameters).length)!;
    const arity = parseParameters(method.parameters).length;
    const parameters = Array.from({ length: arity }, (_unused, index) => `a${index}: any`).join(', ');
    const args = Array.from({ length: arity }, (_unused, index) => `a${index}`).join(', ');
    return `    [${JSON.stringify(name)}, (${parameters}) => ` +
      `this.method_${emittedMethodName(definition, method)}(${args})],`;
  }).join('\n');
  const widest = Math.max(0, ...definition.methods.map(method => parseParameters(method.parameters).length));
  const slots = Array.from({ length: widest }, (_unused, index) => `a${index}: any = 0`).join(', ');
  return `
  private readonly methodTable = new Map<unknown, (...args: any[]) => number>([
${entries}
  ]);

  private callMethod(name: unknown${slots ? `, ${slots}` : ''}): number {
    const method = this.methodTable.get(name);
    if (method === undefined) {
      throw new Error('${definition.type} has no method "' + String(name) + '" to call');
    }
    return method(${Array.from({ length: widest }, (_unused, index) => `a${index}`).join(', ')});
  }

  private readWordLE(bitAddress: number): number {
    const address = ((bitAddress >>> 3) & ~1) >>> 0;
    const value = this.bus.read16be ? this.bus.read16be(address)
      : ((this.bus.read(address) & 0xff) << 8) | (this.bus.read(address + 1) & 0xff);
    return ((value & 0xff) << 8) | ((value >>> 8) & 0xff);
  }

  private writeWordLE(bitAddress: number, data: number): number {
    const address = ((bitAddress >>> 3) & ~1) >>> 0;
    const value = ((data & 0xff) << 8) | ((data >>> 8) & 0xff);
    if (this.bus.write16be) this.bus.write16be(address, value);
    else { this.bus.write(address, (value >>> 8) & 0xff); this.bus.write(address + 1, value & 0xff); }
    return 0;
  }
`;
}

function emitInternalFields(definition: GeneratedCpuDefinition): string {
  const ports = definition.internal?.ports ?? [];
  return [
    '  private readonly internalRam = new Uint8Array(0x10000);',
    `  private readonly portData = new Uint8Array(${ports.length});`,
    `  private readonly portDirection = new Uint8Array(${ports.length});`,
    '  private portHandshakeControl = 0;',
    '  private portHandshakeInputState = 0;',
    '  private portHandshakeLatched = false;',
    '  private portHandshakePendingClear = false;',
  ].join('\n');
}

function emitInternalMethods(definition: GeneratedCpuDefinition): string {
  const addressMask = definition.addressMask ?? 0xffff;
  const ram = definition.internal?.ram ?? [];
  const ports = definition.internal?.ports ?? [];
  const handshake = definition.internal?.portHandshake;
  const ramCondition = ram.length
    ? ram.map(range =>
        `(location >= ${range.start} && location <= ${range.end})`).join(' || ')
    : 'false';
  const controlRead = handshake ? `
    if (location === ${handshake.controlAddress}) {
      if (this.portHandshakeControl & ${handshake.flagMask}) {
        this.portHandshakePendingClear = true;
      }
      return this.portHandshakeControl;
    }` : '';
  const portReads = ports.map((port, index) => `
    if (location === ${port.directionAddress}) return 0xff;
    if (location === ${port.dataAddress}) {
      const direction = this.portDirection[${index}];
${index === handshake?.portIndex
    ? `      if (this.portHandshakePendingClear) {
        this.portHandshakeControl &= ~${handshake.flagMask};
        this.portHandshakePendingClear = false;
      }
      const data =
        (this.portHandshakeControl & ${handshake.latchEnableMask}) ||
        direction === 0xff
          ? this.portData[${index}]
          : (Number(this.bus.signal?.(${JSON.stringify(port.inputSignal)}, 0) ?? 0xff) & ~direction) |
            (this.portData[${index}] & direction);
      this.portHandshakeLatched = false;
      return data & 0xff;`
    : `      const input = Number(this.bus.signal?.(${JSON.stringify(port.inputSignal)}, 0) ?? 0xff) & 0xff;
      return direction === 0xff
        ? this.portData[${index}]
        : (input & ~direction) | (this.portData[${index}] & direction);`}
    }`).join('');
  const controlWrite = handshake ? `
    if (location === ${handshake.controlAddress}) {
      this.portHandshakeControl = data;
      return;
    }` : '';
  const portWrites = ports.map((port, index) => `
    if (location === ${port.directionAddress}) {
      this.portDirection[${index}] = data;
      this.emitPort(${index}, ${JSON.stringify(port.outputSignal)}, ${port.outputMask});
      return;
    }
    if (location === ${port.dataAddress}) {
${index === handshake?.portIndex
    ? `      if (this.portHandshakePendingClear) {
        this.portHandshakeControl &= ~${handshake.flagMask};
        this.portHandshakePendingClear = false;
      }
`
    : ''}      this.portData[${index}] = data;
      this.emitPort(${index}, ${JSON.stringify(port.outputSignal)}, ${port.outputMask});
      return;
    }`).join('');
  const decrypt = definition.opcodeDecrypt;
  const decryptCases = Object.entries(decrypt?.xorByAddress ?? {})
    .map(([address, xor]) => `      case ${address}: return value ^ ${xor};`)
    .join('\n');
  const updateInput = handshake
    ? `    if (inputnum !== ${handshake.inputLine}) return;
    if (
      !this.portHandshakeInputState &&
      state !== 0 &&
      !this.portHandshakeLatched &&
      (this.portHandshakeControl & ${handshake.latchEnableMask})
    ) {
      const direction = this.portDirection[${handshake.portIndex}];
      const input = Number(
        this.bus.signal?.(
          ${JSON.stringify(ports[handshake.portIndex]?.inputSignal ?? '')},
          0,
        ) ?? 0xff,
      ) & 0xff;
      this.portData[${handshake.portIndex}] =
        (input & ~direction) | (this.portData[${handshake.portIndex}] & direction);
      this.portHandshakeLatched = true;
      this.portHandshakeControl |= ${handshake.flagMask};
    }
    this.portHandshakeInputState = state;`
    : `    void inputnum;
    void state;`;
  return `  private readMemory(address: number): number {
    const location = address & ${addressMask};${controlRead}${portReads}
    if (${ramCondition}) return this.internalRam[location];
    return this.bus.read(location) & 0xff;
  }

  private writeMemory(address: number, value: number): void {
    const location = address & ${addressMask};
    const data = value & 0xff;${controlWrite}${portWrites}
    if (${ramCondition}) {
      this.internalRam[location] = data;
      return;
    }
    this.bus.write(location, data);
  }

  private readOpcode(address: number): number {
    const location = address & ${addressMask};
    const value = this.readMemory(location);
${decrypt
    ? `    if (location < ${decrypt.boundary}) return value;
    switch (location & ${decrypt.addressMask}) {
${decryptCases}
      default: return value;
    }`
    : '    return value;'}
  }

  private emitPort(index: number, signal: string, outputMask: number): void {
    const direction = this.portDirection[index];
    const data = (this.portData[index] & direction) | (direction ^ 0xff);
    this.bus.signal?.(signal, data & outputMask);
  }

  private resetInternal(): void {
    this.portDirection.fill(0);
    this.portHandshakeControl = 0;
    this.portHandshakeInputState = 0;
    this.portHandshakeLatched = false;
    this.portHandshakePendingClear = false;
  }

  private updateInternalInput(inputnum: number, state: number): void {
${updateInput}
  }`;
}

function emitMember(member: GeneratedCpuMember): string {
  if (member.z8000Registers) return `  private ${member.name} = new Z8000RegisterFile();`;
  if (member.xyRegisters) {
    return [
      `  private readonly ${member.name}_cells = new Int32Array(${member.xyRegisters});`,
      `  private readonly ${member.name} = Array.from({ length: ${member.xyRegisters} }, ` +
        `(_unused, index) => new XyRegister(this.${member.name}_cells, index));`,
    ].join('\n');
  }
  if (member.text) return `  private ${member.name} = "";`;
  if (member.values && member.values.some(value => typeof value !== 'number')) {
    return `  private readonly ${member.name}: readonly any[] = ${JSON.stringify(member.values)};`;
  }
  if (member.wordByteRegisters) {
    return `  private ${member.name} = new WordByteRegisterFile(${member.wordByteRegisters});`;
  }
  if (member.values && member.typed) {
    const array = member.bits === 8 ? (member.signed ? 'Int8Array' : 'Uint8Array')
      : member.bits === 16 ? (member.signed ? 'Int16Array' : 'Uint16Array')
        : member.signed ? 'Int32Array' : 'Uint32Array';
    return member.values.every(value => value === 0)
      ? `  private ${member.name} = new ${array}(${member.values.length});`
      : `  private ${member.name} = ${array}.from([${member.values.join(', ')}]);`;
  }
  if (member.values) {
    return member.bits === 8
      ? `  private ${member.name} = Uint8Array.from([${member.values.join(', ')}]);`
      : `  private ${member.name} = [${member.values.join(', ')}];`;
  }
  if (member.fields) {
    const values = Object.keys(member.fields).map(name => `${name}: 0`).join(', ');
    return `  private ${member.name} = { ${values} };`;
  }
  if (member.pair32) {
    return `  private ${member.name} = new Pair32(${member.initial ?? 0});`;
  }
  if (member.pair) {
    return `  private ${member.name} = new Pair16(${member.initial ?? 0});`;
  }
  return `  private ${member.name} = ${wrapNumber(String(member.initial ?? 0), member.bits, member.signed)};`;
}

function emitAlias(name: string, alias: GeneratedCpuAlias): string {
  const member = `this.${alias.member}`;
  let getter = member;
  if (alias.part === 'word') getter = `${member}.w`;
  if (alias.part === 'high') getter = `${member}.b.h`;
  if (alias.part === 'low') getter = `${member}.b.l`;
  return [
    `  private get ${name}(): number { return ${getter}; }`,
    `  private set ${name}(value: number) { ${getter} = ${wrapNumber('value', alias.bits)}; }`,
  ].join('\n');
}

function emitMethod(
  definition: GeneratedCpuDefinition,
  method: GeneratedCpuMethod,
): string {
  const parameters = parseParameters(method.parameters);
  const context = contextFor(
    definition,
    parameters.map(parameter => [parameter.name, parameter.valueType]),
    'number',
  );
  const reference = parameters.find(parameter => parameter.reference);
  if (method.returnType) context.returnValueType = method.returnType;
  const body = emitProgram(method.program, context, 4);
  // A strict-call core passes objects too: a boxed \`int *\`, an \`XY *\`, the
  // screen, bitmap and display_params a screen update receives.
  const parameterType = (valueType: string) =>
    definition.strictCalls && (valueType.includes('*') || !typeOfName(valueType.replace(/\bconst\b/g, '').trim()))
      ? 'any' : 'number';
  return [
    `  private method_${emittedMethodName(definition, method)}(${parameters.map(parameter =>
      `${parameter.name}: ${parameterType(parameter.valueType)} = 0`).join(', ')}): number {`,
    body,
    reference ? `    return ${reference.name};` : '    return 0;',
    '  }',
  ].join('\n');
}

function emittedMethodName(
  definition: GeneratedCpuDefinition,
  method: GeneratedCpuMethod,
): string {
  const overloaded = definition.methods.filter(candidate => candidate.name === method.name).length > 1;
  return safeName(method.name) + (overloaded ? `_${parseParameters(method.parameters).length}` : '');
}

function resolveMethod(
  definition: GeneratedCpuDefinition,
  name: string,
  arity: number,
): GeneratedCpuMethod | undefined {
  const candidates = definition.methods.filter(candidate => candidate.name === name);
  return candidates.find(candidate => parseParameters(candidate.parameters).length === arity) ?? candidates[0];
}

function emitInvokeCases(definition: GeneratedCpuDefinition): string {
  const names = [...new Set(definition.methods.map(method => method.name))];
  return names.map(name => {
    const candidates = definition.methods.filter(method => method.name === name);
    const calls = candidates.map(method => {
      const parameters = parseParameters(method.parameters);
      const args = parameters.map((_, index) => `args[${index}] ?? 0`).join(', ');
      return {
        arity: parameters.length,
        call: `this.method_${emittedMethodName(definition, method)}(${args})`,
      };
    });
    if (calls.length === 1) {
      return `      case ${JSON.stringify(name)}: return ${calls[0]!.call};`;
    }
    return [
      `      case ${JSON.stringify(name)}:`,
      ...calls.map(candidate =>
        `        if (args.length === ${candidate.arity}) return ${candidate.call};`),
      `        return ${calls[0]!.call};`,
    ].join('\n');
  }).join('\n');
}

/**
 * The CPU family's state enum, resolved back to the registers it names.
 *
 * A driver reads a live register through `state_int(Z80_HL)`. The enum is
 * lowered with the rest of the CPU's constants, and MAME names each entry after
 * the register it exposes, so the index maps onto a register this CPU has.
 */
function emitStateIntCases(definition: GeneratedCpuDefinition): string {
  const seen = new Set<number>();
  const lines: string[] = [];
  for (const [name, value] of Object.entries(definition.constants)) {
    const register = /^[A-Z][A-Z0-9]*_([A-Z0-9_]+)$/.exec(name)?.[1];
    if (!register || !definition.aliases[register] || seen.has(value)) continue;
    seen.add(value);
    lines.push(`      case ${value}: return this.${register}; // ${name}`);
  }
  return lines.join('\n');
}

function emitPublicGetCases(definition: GeneratedCpuDefinition): string {
  const lines: string[] = [];
  for (const name of Object.keys(definition.aliases)) {
    lines.push(`      case ${JSON.stringify(name)}: return this.${name};`);
  }
  for (const member of definition.members) {
    if (member.values || member.wordByteRegisters || member.z8000Registers ||
        member.xyRegisters || member.text) continue;
    // A PAIR is one 32-bit cell, so only `.d` is enumerated for capture: the
    // word and byte views alias the same storage, and capturing them too
    // would restore the same register several times over.
    if (member.pair32) {
      lines.push(`      case ${JSON.stringify(member.name)}:`);
      lines.push(`      case ${JSON.stringify(`${member.name}.d`)}: return this.${member.name}.d;`);
    } else if (member.pair) {
      lines.push(`      case ${JSON.stringify(member.name)}:`);
      lines.push(`      case ${JSON.stringify(`${member.name}.w`)}: return this.${member.name}.w;`);
      lines.push(`      case ${JSON.stringify(`${member.name}.b.h`)}: return this.${member.name}.b.h;`);
      lines.push(`      case ${JSON.stringify(`${member.name}.b.l`)}: return this.${member.name}.b.l;`);
    } else if (member.fields) {
      for (const field of Object.keys(member.fields)) {
        lines.push(
          `      case ${JSON.stringify(`${member.name}.${field}`)}: return this.${member.name}.${field};`,
        );
      }
    } else {
      lines.push(`      case ${JSON.stringify(member.name)}: return this.${member.name};`);
    }
  }
  return lines.join('\n');
}

function emitPublicSetCases(definition: GeneratedCpuDefinition): string {
  const lines: string[] = [];
  for (const [name, alias] of Object.entries(definition.aliases)) {
    lines.push(
      `      case ${JSON.stringify(name)}: this.${name} = ${wrapNumber('value', alias.bits)}; return;`,
    );
  }
  for (const member of definition.members) {
    if (member.values || member.wordByteRegisters || member.z8000Registers ||
        member.xyRegisters || member.text) continue;
    if (member.pair32) {
      lines.push(`      case ${JSON.stringify(member.name)}:`);
      lines.push(
        `      case ${JSON.stringify(`${member.name}.d`)}: this.${member.name}.d = value; return;`,
      );
    } else if (member.pair) {
      lines.push(`      case ${JSON.stringify(member.name)}:`);
      lines.push(
        `      case ${JSON.stringify(`${member.name}.w`)}: this.${member.name}.w = value; return;`,
      );
      lines.push(
        `      case ${JSON.stringify(`${member.name}.b.h`)}: this.${member.name}.b.h = value; return;`,
      );
      lines.push(
        `      case ${JSON.stringify(`${member.name}.b.l`)}: this.${member.name}.b.l = value; return;`,
      );
    } else if (member.fields) {
      for (const [field, bits] of Object.entries(member.fields)) {
        lines.push(
          `      case ${JSON.stringify(`${member.name}.${field}`)}: ` +
          `this.${member.name}.${field} = ${wrapNumber('value', bits)}; return;`,
        );
      }
    } else {
      lines.push(
        `      case ${JSON.stringify(member.name)}: ` +
        `this.${member.name} = ${wrapNumber('value', member.bits, member.signed)}; return;`,
      );
    }
  }
  lines.push('      default: return;');
  return lines.join('\n');
}

function emitProgram(
  program: GeneratedHandlerProgram,
  context: EmitContext,
  indentation: number,
): string {
  if (program.diagnostics.length) {
    throw new Error(`cannot emit handler: ${program.diagnostics.join('; ')}`);
  }
  collectLocals(program.operations, context.locals);
  return emitOperations(program.operations, context, indentation);
}

function emitOperations(
  operations: GeneratedHandlerOperation[],
  context: EmitContext,
  indentation: number,
): string {
  return operations.map(operation => emitOperation(operation, context, indentation))
    .filter(Boolean)
    .join('\n');
}

function emitOperation(
  operation: GeneratedHandlerOperation,
  context: EmitContext,
  indentation: number,
): string {
  const pad = ' '.repeat(indentation);
  if (operation.op === 'declare') {
    const declared = context.definition.cIntegerTypes ? typeOfName(operation.valueType) : undefined;
    if (declared?.wide) {
      const initial = operation.value
        ? `BigInt.as${declared.signed ? 'Int' : 'Uint'}N(64, ${emitWide(operation.value, context)})`
        : '0n';
      return `${pad}let ${operation.name} = ${initial};`;
    }
    const loose = context.definition.strictCalls && !typeOfName(operation.valueType);
    const structType = loose && !operation.valueType?.includes('*') &&
      !/_func$/.test(operation.valueType?.trim() ?? '');
    const initial = operation.value
      ? wrapType(emitExpression(operation.value, context), operation.valueType)
      : /^(?:const\s+)?XY$/.test(operation.valueType?.trim() ?? '') ? 'new XyValue()'
        // A struct local (`display_params params;`) is an object its fields
        // are stored into; a function pointer or scalar starts at 0.
        : structType ? '{}' : '0';
    // A local of a type that is not a C integer -- a member-function pointer,
    // an XY -- holds whatever the source stores in it.
    return `${pad}let ${operation.name}${loose ? ': any' : ''} = ${initial};`;
  }
  if (operation.op === 'assign') {
    return `${pad}${emitAssignment(operation.target, operation.operator, operation.value, context)};`;
  }
  if (operation.op === 'call') {
    return emitCallStatement(operation.expression, context, indentation);
  }
  if (operation.op === 'return') {
    if (context.returnType === 'void') {
      return operation.value
        ? `${pad}void (${emitExpression(operation.value, context)}); return;`
        : `${pad}return;`;
    }
    if (operation.value && context.returnValueType && context.definition.strictCalls) {
      return `${pad}return ${wrapType(emitExpression(operation.value, context), context.returnValueType)};`;
    }
    return `${pad}return ${operation.value ? emitExpression(operation.value, context) : '0'};`;
  }
  if (operation.op === 'break') return `${pad}break;`;
  if (operation.op === 'continue') return `${pad}continue;`;
  if (operation.op === 'if') {
    const thenBody = emitOperations(operation.then, context, indentation + 2);
    const lines = [
      `${pad}if (${emitExpression(operation.condition, context)}) {`,
      thenBody,
      `${pad}}`,
    ];
    if (operation.else) {
      lines[lines.length - 1] += ' else {';
      lines.push(emitOperations(operation.else, context, indentation + 2));
      lines.push(`${pad}}`);
    }
    return lines.filter(Boolean).join('\n');
  }
  if (operation.op === 'for') {
    // A multi-declarator C++ for-init lowers to several declare ops; JS allows
    // only one `let` keyword in the initializer, so strip it from the rest.
    const initialize = operation.initialize
      .map(item => emitOperation(item, context, 0).trim().replace(/;$/, ''))
      .map((part, index) => (index > 0 && part.startsWith('let ') ? part.slice(4) : part))
      .join(', ');
    const iterate = operation.iterate
      .map(item => emitOperation(item, context, 0).trim().replace(/;$/, ''))
      .join(', ');
    return [
      `${pad}for (${initialize}; ${emitExpression(operation.condition, context)}; ${iterate}) {`,
      emitOperations(operation.body, context, indentation + 2),
      `${pad}}`,
    ].filter(Boolean).join('\n');
  }
  if (operation.op === 'while') {
    return [
      `${pad}while (${emitExpression(operation.condition, context)}) {`,
      emitOperations(operation.body, context, indentation + 2),
      `${pad}}`,
    ].filter(Boolean).join('\n');
  }
  if (operation.op === 'do-while') {
    return [
      `${pad}do {`,
      emitOperations(operation.body, context, indentation + 2),
      `${pad}} while (${emitExpression(operation.condition, context)});`,
    ].filter(Boolean).join('\n');
  }

  const lines = [`${pad}switch (${emitExpression(operation.expression, context)}) {`];
  for (const entry of operation.cases) {
    if (entry.values) {
      for (const value of entry.values) {
        lines.push(`${pad}  case ${emitExpression(value, context)}:`);
      }
    } else {
      lines.push(`${pad}  default:`);
    }
    lines.push(`${pad}    {`);
    lines.push(emitOperations(entry.body, context, indentation + 6));
    lines.push(`${pad}    }`);
  }
  lines.push(`${pad}}`);
  return lines.filter(Boolean).join('\n');
}

function emitCallStatement(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: EmitContext,
  indentation: number,
): string {
  const pad = ' '.repeat(indentation);
  const name = expressionPath(expression.callee);
  if ((name === 'POSTINC' || name === 'POSTDEC') && expression.args[0]) {
    const target = targetInfo(expression.args[0], context);
    const delta = name === 'POSTINC' ? '1' : '-1';
    return `${pad}${target.code} = ${wrapTarget(`(${target.code}) + (${delta})`, target)};`;
  }
  if (name === 'swap' && expression.args.length === 2) {
    const left = targetInfo(expression.args[0]!, context);
    const right = targetInfo(expression.args[1]!, context);
    return [
      `${pad}{`,
      `${pad}  const swapValue = ${left.code};`,
      `${pad}  ${left.code} = ${wrapTarget(right.code, left)};`,
      `${pad}  ${right.code} = ${wrapTarget('swapValue', right)};`,
      `${pad}}`,
    ].join('\n');
  }

  const method = resolveMethod(context.definition, name ?? '', expression.args.length);
  const parameters = method ? parseParameters(method.parameters) : [];
  const referenceIndex = parameters.findIndex(parameter => parameter.reference);
  if (method && referenceIndex >= 0 && expression.args[referenceIndex]) {
    const target = targetInfo(expression.args[referenceIndex]!, context);
    const args = expression.args.map((argument, index) =>
      index === referenceIndex ? target.code : emitExpression(argument, context));
    const value = `this.method_${emittedMethodName(context.definition, method)}(${args.join(', ')})`;
    return `${pad}${target.code} = ${wrapTarget(value, target)};`;
  }
  return `${pad}${emitExpression(expression, context)};`;
}

function emitExpression(expression: GeneratedExpression, context: EmitContext): string {
  if (context.definition.cIntegerTypes && expression.kind !== 'cast' && expression.kind !== 'number' &&
      cType(expression, context).wide) {
    // A 64-bit value reaching 32-bit code: exact up to 2^53, then wrapped by
    // whatever stores it.
    return `Number(${emitWide(expression, context)})`;
  }
  if (expression.kind === 'number') return String(expression.value);
  if (expression.kind === 'string') return JSON.stringify(expression.value);
  if (expression.kind === 'identifier') return emitIdentifier(expression.name, context);
  if (expression.kind === 'unary' && context.definition.strictCalls &&
      expression.operand.kind === 'identifier' && context.locals.has(expression.operand.name)) {
    const local = expression.operand.name;
    if (expression.operator === '*' && scalarPointerType(context.locals.get(local))) return `${local}[0]`;
    // The address of a local struct is the object itself.
    if (expression.operator === '&') return local;
  }
  // `&m_shiftreg[0]`: the address of a member array's element is the array
  // from that element on.
  if (expression.kind === 'unary' && expression.operator === '&' && context.definition.strictCalls &&
      expression.operand.kind === 'index') {
    const path = expressionPath(expression.operand.object);
    const member = path ? memberForPath(path, context.definition) : undefined;
    if (member?.values) {
      const index = emitExpression(expression.operand.index, context);
      return index === '0' ? `this.${member.name}` : `this.${member.name}.subarray(${index})`;
    }
  }
  if (expression.kind === 'unary') {
    if (expression.operator === '!') {
      return `((${emitExpression(expression.operand, context)}) ? 0 : 1)`;
    }
    return `(${expression.operator}${emitExpression(expression.operand, context)})`;
  }
  const cTypes = context.definition.cIntegerTypes === true;
  if (expression.kind === 'cast') {
    if (cTypes) {
      const target = typeOfName(expression.valueType);
      if (target?.wide) return `Number(${emitWide(expression, context)})`;
      if (cType(expression.operand, context).wide) {
        const bits = /(?:8|char)/.test(expression.valueType) ? 8 : /16|short/.test(expression.valueType) ? 16 : 32;
        return wrapType(
          `Number(BigInt.as${target?.signed === false ? 'Uint' : 'Int'}N(${bits}, ${emitWide(expression.operand, context)}))`,
          expression.valueType,
        );
      }
    }
    return wrapType(emitExpression(expression.operand, context), expression.valueType);
  }
  if (expression.kind === 'binary' && cTypes &&
      ['==', '!=', '<', '<=', '>', '>='].includes(expression.operator) &&
      (cType(expression.left, context).wide || cType(expression.right, context).wide)) {
    const operator = expression.operator === '==' ? '===' : expression.operator === '!=' ? '!==' : expression.operator;
    return `((${emitWide(expression.left, context)} ${operator} ${emitWide(expression.right, context)}) ? 1 : 0)`;
  }
  if (expression.kind === 'binary') {
    const left = emitExpression(expression.left, context);
    const right = emitExpression(expression.right, context);
    if (cTypes && expression.operator === '>>') {
      return cType(expression.left, context).signed ? `((${left}) >> (${right}))` : `((${left}) >>> (${right}))`;
    }
    if (cTypes && expression.operator === '*') {
      const product = `Math.imul(${left}, ${right})`;
      return cType(expression, context).signed ? product : `(${product} >>> 0)`;
    }
    if (expression.operator === '/') return `Math.trunc((${left}) / (${right}))`;
    if (expression.operator === '&&' || expression.operator === '||') {
      return `(((${left}) ${expression.operator} (${right})) ? 1 : 0)`;
    }
    if (['==', '!=', '<', '<=', '>', '>='].includes(expression.operator)) {
      const operator = expression.operator === '=='
        ? '==='
        : expression.operator === '!=' ? '!==' : expression.operator;
      return `((Number(${left}) ${operator} Number(${right})) ? 1 : 0)`;
    }
    // MAME CPU cores shift unsigned values; C++ `>>` on them is a logical
    // shift. JavaScript `>>` sign-extends anything with bit 31 set (the m68k
    // SWAP of 0xC0000800 became 0xFFFFC000). Arithmetic shifts in these cores
    // are written as explicit sign-fill (m68ki_shift_*_table), never `>>`.
    if (expression.operator === '>>') return `((${left}) >>> (${right}))`;
    return `((${left}) ${expression.operator} (${right}))`;
  }
  if (expression.kind === 'assignment') {
    return `(${emitAssignment(
      expression.target,
      expression.operator,
      expression.value,
      context,
      expression.postfix,
    )})`;
  }
  if (expression.kind === 'conditional') {
    return `((${emitExpression(expression.condition, context)}) ? ` +
      `(${emitExpression(expression.whenTrue, context)}) : ` +
      `(${emitExpression(expression.whenFalse, context)}))`;
  }
  if (expression.kind === 'member') {
    const path = expressionPath(expression);
    if (path) return emitPath(path, context);
    return `${emitExpression(expression.object, context)}.${expression.property}`;
  }
  if (expression.kind === 'index' && context.definition.strictCalls &&
      expression.object.kind === 'call' && /\.pix$/.test(expressionPath(expression.object.callee) ?? '')) {
    // `bitmap.pix(y)[x]`: MAME's bitmap row, read through the host bitmap.
    const bitmap = emitExpression((expression.object.callee as { object: GeneratedExpression }).object, context);
    return `${bitmap}.pix(${emitExpression(expression.object.args[0]!, context)}, ${emitExpression(expression.index, context)})`;
  }
  if (expression.kind === 'index') {
    return `${emitExpression(expression.object, context)}[${emitExpression(expression.index, context)}]`;
  }
  if (expression.kind === 'lambda') {
    // No MAME CPU core writes one inside an operation body. Refusing loudly
    // beats emitting something that looks like a core and is not one.
    throw new Error('CPU code generation reached a lambda expression');
  }
  return emitCall(expression, context);
}

function emitCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: EmitContext,
): string {
  const callee = expression.callee;
  if (context.definition.strictCalls && callee.kind === 'member' && callee.property === 'black_pen' &&
      callee.object.kind === 'call' && expressionPath(callee.object.callee) === 'screen.palette') {
    return '(this.bus.screen?.blackPen() ?? 0)';
  }
  const name = expressionPath(expression.callee) ?? '';
  if (name === 'sizeof' && context.definition.strictCalls) {
    const path = expression.args[0] ? expressionPath(expression.args[0]) : undefined;
    const member = path ? memberForPath(path, context.definition) : undefined;
    if (member?.xyRegisters) return String(member.xyRegisters * 4);
    if (member?.values) return String(member.values.length * ((member.bits ?? 32) / 8));
    throw new Error(`${context.definition.type}: cannot size ${path ?? 'expression'}`);
  }
  const args = expression.args.map(argument => emitExpression(argument, context));
  const addressMask = context.definition.addressMask ?? 0xffff;
  const dataAddress = (value: string): string => context.definition.alignDataWords
    ? `((${value}) & ~1)`
    : `(${value})`;
  const fixedInstructionCycles = context.definition.fixedInstructionCycles === true;
  const method = resolveMethod(context.definition, name, expression.args.length);
  if (method && context.definition.strictCalls) {
    // `&local` passed for an `int *` parameter: box it, call, and copy back,
    // which is what writing through the pointer does to the caller's local.
    const parameters = parseParameters(method.parameters);
    const boxes: { local: string; box: string; valueType?: string }[] = [];
    const boxedArgs = expression.args.map((argument, index) => {
      const parameterType = parameters[index]?.valueType;
      if (argument.kind === 'unary' && argument.operator === '&' &&
          argument.operand.kind === 'identifier' && context.locals.has(argument.operand.name) &&
          scalarPointerType(`${parameterType}*`.replace(/\*\*$/, '*'))) {
        const local = argument.operand.name;
        const box = `box_${local}`;
        boxes.push({ local, box, valueType: context.locals.get(local) });
        return box;
      }
      return args[index]!;
    });
    const call = `this.method_${emittedMethodName(context.definition, method)}(${boxedArgs.join(', ')})`;
    if (!boxes.length) return call;
    return `(() => { ${boxes.map(({ local, box }) => `const ${box} = [${local}];`).join(' ')} ` +
      `const result = ${call}; ` +
      `${boxes.map(({ local, box, valueType }) => `${local} = ${wrapType(`${box}[0]`, valueType)};`).join(' ')} ` +
      'return result; })()';
  }
  if (method) {
    return `this.method_${emittedMethodName(context.definition, method)}(${args.join(', ')})`;
  }
  const signal = context.definition.callbacks?.[name];
  if (signal) return `(this.bus.signal?.(${JSON.stringify(signal)}, ${args[0] ?? '0'}) ?? 0)`;
  // devcb `isunset()` on one of the core's own lines: a bus that routes
  // signals decides whether anything is bound to it.
  const unset = /^(m_\w+)\.isunset$/.exec(name);
  if (unset && context.definition.callbacks?.[unset[1]!]) return '(this.bus.signal ? 0 : 1)';

  if ((name === 'POSTINC' || name === 'POSTDEC') && expression.args[0]) {
    const target = targetInfo(expression.args[0], context);
    const delta = name === 'POSTINC' ? '1' : '-1';
    return `(() => { const previous = ${target.code}; ` +
      `${target.code} = ${wrapTarget(`(${target.code}) + (${delta})`, target)}; return previous; })()`;
  }

  if (['u8', 'uint8_t'].includes(name)) return wrapType(args[0] ?? '0', 'u8');
  if (['s8', 'int8_t'].includes(name)) return wrapType(args[0] ?? '0', 's8');
  if (['u16', 'uint16_t'].includes(name)) return wrapType(args[0] ?? '0', 'u16');
  if (['s16', 'int16_t'].includes(name)) return wrapType(args[0] ?? '0', 's16');
  if (['u32', 'uint32_t'].includes(name)) return wrapType(args[0] ?? '0', 'u32');
  if (['s32', 'int32_t'].includes(name)) return wrapType(args[0] ?? '0', 's32');
  if (name === 'bool') return `((${args[0] ?? '0'}) ? 1 : 0)`;
  if (name === 'BIT') {
    const value = `(${args[0] ?? '0'})`;
    const shift = `(${args[1] ?? '0'})`;
    if (args.length > 2) {
      const width = `(${args[2] ?? '1'})`;
      return `((${value} >>> ${shift}) & ((1 << ${width}) - 1))`;
    }
    return `((${value} >>> ${shift}) & 1)`;
  }
  // MAME's bitswap<N>(value, b(N-1), ..., b0), as the interpreter reads it
  // (src/ir/execute.ts): the first listed source bit becomes the result's
  // most significant. Unbound, it fell to the catch-all `0` at the bottom of
  // this function, and every DECO CPU-7 opcode fetched after a write decoded
  // as BRK.
  if (/^bitswap_\d+$/.test(name)) {
    // A helper, not an inline expansion: the value is often a bus read (the
    // C10707 swaps its opcode fetch in place), and repeating it once per bit
    // read -- and charged -- every opcode eight times.
    return `bitswap(${args.join(', ')})`;
  }
  if (name === 'std::popcount') {
    return `popcount32((${args[0] ?? '0'}) >>> 0)`;
  }
  if (name === 'std::size') return `(${args[0] ?? '[]'}).length`;

  if (name === 'READ' || name === 'ARG') {
    const read = `this.readMemory((${args[0] ?? '0'}) & ${addressMask}) & 0xff`;
    return fixedInstructionCycles ? `(${read})` : `(++this.cycles, ${read})`;
  }
  if (name === 'READ16BE') {
    const address = dataAddress(args[0] ?? '0');
    if (!context.definition.internal) {
      return `(this.bus.read16be?.(${address} & ${addressMask}) ?? ` +
        `(((this.readMemory(${address}) & 0xff) << 8) | ` +
        `(this.readMemory(${address} + 1) & 0xff)))`;
    }
    return `(((this.readMemory(${address}) & 0xff) << 8) | ` +
      `(this.readMemory(${address} + 1) & 0xff))`;
  }
  if (name === 'READ16LE') {
    const address = `(${args[0] ?? '0'})`;
    return `((this.readMemory(${address}) & 0xff) | ` +
      `((this.readMemory(${address} + 1) & 0xff) << 8))`;
  }
  if (name === 'READ32BE') {
    const address = dataAddress(args[0] ?? '0');
    if (!context.definition.internal) {
      const high = `(this.bus.read16be?.(${address} & ${addressMask}) ?? ` +
        `(((this.readMemory(${address}) & 0xff) << 8) | ` +
        `(this.readMemory(${address} + 1) & 0xff)))`;
      const lowAddress = `(${address} + 2)`;
      const low = `(this.bus.read16be?.(${lowAddress} & ${addressMask}) ?? ` +
        `(((this.readMemory(${lowAddress}) & 0xff) << 8) | ` +
        `(this.readMemory(${lowAddress} + 1) & 0xff)))`;
      return `(((${high} << 16) | ${low}) >>> 0)`;
    }
    return `((((this.readMemory(${address}) & 0xff) << 24) | ` +
      `((this.readMemory(${address} + 1) & 0xff) << 16) | ` +
      `((this.readMemory(${address} + 2) & 0xff) << 8) | ` +
      `(this.readMemory(${address} + 3) & 0xff)) >>> 0)`;
  }
  if (name === 'READ_VECTOR') {
    return `(++this.cycles, this.readMemory((this.m_ea.w + (${args[0] ?? '0'})) & 0xffff) & 0xff)`;
  }
  if (name === 'OPCODE') {
    return `(++this.cycles, this.readOpcode((${args[0] ?? '0'}) & 0xffff) & 0xff)`;
  }
  if (name === 'WRITE') {
    const write = `this.writeMemory((${args[0] ?? '0'}) & ${addressMask}, ` +
      `(${args[1] ?? '0'}) & 0xff)`;
    return fixedInstructionCycles ? `(${write}, 0)` : `(++this.cycles, ${write}, 0)`;
  }
  if (name === 'WRITE16BE') {
    const address = dataAddress(args[0] ?? '0');
    const value = `(${args[1] ?? '0'})`;
    if (!context.definition.internal) {
      return `(this.bus.write16be ` +
        `? (this.bus.write16be(${address} & ${addressMask}, ${value} & 0xffff), 0) ` +
        `: (this.writeMemory(${address}, ${value} >>> 8), ` +
        `this.writeMemory(${address} + 1, ${value}), 0))`;
    }
    return `(this.writeMemory(${address}, ${value} >>> 8), ` +
      `this.writeMemory(${address} + 1, ${value}), 0)`;
  }
  if (name === 'WRITE16LE') {
    const address = `(${args[0] ?? '0'})`;
    const value = `(${args[1] ?? '0'})`;
    return `(this.writeMemory(${address}, ${value}), ` +
      `this.writeMemory(${address} + 1, ${value} >>> 8), 0)`;
  }
  if (name === 'WRITE32BE') {
    const address = dataAddress(args[0] ?? '0');
    const value = `(${args[1] ?? '0'})`;
    if (!context.definition.internal) {
      return `(this.bus.write16be ` +
        `? (this.bus.write16be(${address} & ${addressMask}, (${value} >>> 16) & 0xffff), ` +
        `this.bus.write16be((${address} + 2) & ${addressMask}, ${value} & 0xffff), 0) ` +
        `: (this.writeMemory(${address}, ${value} >>> 24), ` +
        `this.writeMemory(${address} + 1, ${value} >>> 16), ` +
        `this.writeMemory(${address} + 2, ${value} >>> 8), ` +
        `this.writeMemory(${address} + 3, ${value}), 0))`;
    }
    return `(this.writeMemory(${address}, ${value} >>> 24), ` +
      `this.writeMemory(${address} + 1, ${value} >>> 16), ` +
      `this.writeMemory(${address} + 2, ${value} >>> 8), ` +
      `this.writeMemory(${address} + 3, ${value}), 0)`;
  }
  if (name === 'm_opcodes.read_byte') {
    return `((this.bus.readOpcode?.((${args[0] ?? '0'}) & 0xffff) ?? ` +
      `this.readMemory((${args[0] ?? '0'}) & 0xffff)) & 0xff)`;
  }
  if (name === 'm_data.read_interruptible' ||
      name === 'm_args.read_byte') {
    return `(this.readMemory((${args[0] ?? '0'}) & 0xffff) & 0xff)`;
  }
  if (name === 'm_data.write_interruptible') {
    return `(this.writeMemory((${args[0] ?? '0'}) & 0xffff, (${args[1] ?? '0'}) & 0xff), 0)`;
  }
  if (name === 'm_io.read_interruptible') {
    return `(this.bus.in((${args[0] ?? '0'}) & 0xffff) & 0xff)`;
  }
  if (name === 'm_io.write_interruptible') {
    return `(this.bus.out((${args[0] ?? '0'}) & 0xffff, (${args[1] ?? '0'}) & 0xff), 0)`;
  }
  if (name === 'PORT_READ') return `(this.bus.in((${args[0] ?? '0'}) & 0xffff) & 0xff)`;
  if (name === 'PORT_READ16') {
    const port = `(${args[0] ?? '0'})`;
    return `((this.bus.in(${port} & 0xffff) & 0xff) | ` +
      `((this.bus.in((${port} + 1) & 0xffff) & 0xff) << 8))`;
  }
  if (name === 'PORT_WRITE') {
    return `(this.bus.out((${args[0] ?? '0'}) & 0xffff, (${args[1] ?? '0'}) & 0xff), 0)`;
  }
  // A natively 16-bit port, kept atomic when the board installed a word io
  // bus; the byte pair is the fallback for a board that did not.
  if (name === 'PORT_READ16BE') {
    const port = `(${args[0] ?? '0'})`;
    return `(this.bus.in16be?.(${port} & 0xffff) ?? ` +
      `(((this.bus.in(${port} & 0xffff) & 0xff) << 8) | ` +
      `(this.bus.in((${port} + 1) & 0xffff) & 0xff)))`;
  }
  if (name === 'PORT_WRITE16BE') {
    const port = `(${args[0] ?? '0'})`;
    const value = `(${args[1] ?? '0'})`;
    return `(this.bus.out16be ` +
      `? (this.bus.out16be(${port} & 0xffff, ${value} & 0xffff), 0) ` +
      `: (this.bus.out(${port} & 0xffff, (${value} >>> 8) & 0xff), ` +
      `this.bus.out((${port} + 1) & 0xffff, ${value} & 0xff), 0))`;
  }
  if (name === 'PORT_WRITE16') {
    const port = `(${args[0] ?? '0'})`;
    const value = `(${args[1] ?? '0'})`;
    return `(this.bus.out(${port} & 0xffff, ${value} & 0xff), ` +
      `this.bus.out((${port} + 1) & 0xffff, (${value} >>> 8) & 0xff), 0)`;
  }
  if (name === 'm_program.read_byte' || name === 'm_cprogram.read_byte' ||
      name === 'm_copcodes.read_byte') {
    return `(this.readMemory((${args[0] ?? '0'}) & 0xffff) & 0xff)`;
  }
  if (name === 'm_program.write_byte') {
    return `(this.writeMemory((${args[0] ?? '0'}) & 0xffff, (${args[1] ?? '0'}) & 0xff), 0)`;
  }
  if (name === 'm_io.read_byte') {
    return `(this.bus.in((${args[0] ?? '0'}) & 0xff) & 0xff)`;
  }
  if (name === 'm_io.write_byte') {
    return `(this.bus.out((${args[0] ?? '0'}) & 0xff, (${args[1] ?? '0'}) & 0xff), 0)`;
  }
  if (name === 'program_r') {
    return `(this.readMemory((${args[0] ?? '0'}) & 0x0fff) & 0xff)`;
  }
  if (name === 'ram_r') {
    return `(this.m_dataptr[(${args[0] ?? '0'}) & 0x7f] & 0xff)`;
  }
  if (name === 'ram_w') {
    return `(this.m_dataptr[(${args[0] ?? '0'}) & 0x7f] = (${args[1] ?? '0'}) & 0xff, 0)`;
  }
  if (name === 'ext_r') return `(this.bus.in((${args[0] ?? '0'}) & 0xff) & 0xff)`;
  if (name === 'ext_w') {
    return `(this.bus.out((${args[0] ?? '0'}) & 0xff, (${args[1] ?? '0'}) & 0xff), 0)`;
  }
  if (name === 'port_r') {
    return `(this.bus.signal?.('p' + (${args[0] ?? '0'}) + '_in_cb', 0) ?? 0xff)`;
  }
  if (name === 'port_w') {
    return `(this.bus.signal?.('p' + (${args[0] ?? '0'}) + '_out_cb', ` +
      `(${args[1] ?? '0'}) & 0xff) ?? 0)`;
  }
  if (name === 'test_r') {
    return `(this.bus.signal?.('t' + (${args[0] ?? '0'}) + '_in_cb', 0) ?? 0)`;
  }
  if (name === 'bus_r') return `(this.bus.signal?.('bus_in_cb', 0) ?? 0xff)`;
  if (name === 'bus_w') {
    return `(this.bus.signal?.('bus_out_cb', (${args[0] ?? '0'}) & 0xff) ?? 0)`;
  }
  if (name === 'prog_w') {
    return `(this.bus.signal?.('prog_out_cb', (${args[0] ?? '0'}) & 1) ?? 0)`;
  }
  if (name === 'm_set_lines') {
    return `(this.bus.signal?.('line', (${args[1] ?? args[0] ?? '0'}) & 0xff) ?? 0)`;
  }
  if (name === 'm_in_inta_func.isunset' || name === 'm_out_status_func.isunset') return '1';
  if (name === 'm_out_inte_func' || name === 'm_out_sod_func' || name === 'm_out_status_func') {
    return `(this.bus.signal?.(${JSON.stringify(name.slice(2))}, ` +
      `${args[0] ?? '0'}) ?? 0)`;
  }
  if (name === 'standard_irq_callback') {
    return `this.acknowledgeIrq(${args[0] ?? '0'})`;
  }
  if (name === 'm_irqack_cb') {
    return `(this.bus.signal?.('irqack_cb', ${args[0] ?? '0'}) ?? 0)`;
  }
  if (name === 'm_irqack_cb.bind') return '0';
  if (/^m_\w+_cb$/.test(name) && !(context.definition.strictCalls && args.length !== 1)) {
    return `(this.bus.signal?.(${JSON.stringify(name.slice(2))}, ${args[0] ?? '0'}) ?? 0)`;
  }
  if (name === 'LOG' || name === 'LOGMASKED' || name === 'logerror') return '0';
  if (name === 'total_cycles') return '1';

  if (context.definition.strictCalls) {
    // A method of an object the host passed in -- `bitmap.pix(y)` on the
    // bitmap handed to a screen update.
    const objectCall = /^(\w+)\.(\w+)$/.exec(name);
    if (objectCall && context.locals.has(objectCall[1]!)) {
      return `${objectCall[1]}.${objectCall[2]}(${args.join(', ')})`;
    }
    // A call through a member-function pointer: dispatch on the name it holds.
    if (name === 'CALL_METHOD') {
      return `this.callMethod(${args.join(', ')})`;
    }
    // Bit-addressed 16-bit little-endian program space (TMS34010, addrshift
    // +3): the word at bit address A is the one at byte (A >> 3) & ~1.
    if (name === 'TMS_READ16') return `this.readWordLE(${args[0] ?? '0'})`;
    if (name === 'TMS_WRITE16') return `this.writeWordLE(${args[0] ?? '0'}, ${args[1] ?? '0'})`;
    if (name === 'MAKE_XY') return `new XyValue(${args[0] ?? '0'}, ${args[1] ?? '0'})`;
    // Whether the machine configuration bound a delegate or devcb.
    const presence = /^m_(\w+_cb)\.(isnull|isunset)$/.exec(name);
    if (presence) return `(this.bus.hasDelegate?.(${JSON.stringify(presence[1])}) ? 0 : 1)`;
    // The screen the processor drives (device_video_interface::screen()).
    const screenCall = /^screen\.(vpos|hpos|width|height|visible_area|update_partial|configure|time_until_pos)$/.exec(name);
    if (screenCall) {
      const [, method] = screenCall;
      if (method === 'configure') {
        return `(this.bus.screen?.configure?.(${args[0] ?? '0'}, ${args[1] ?? '0'}, ${args[2] ?? '{}'}), 0)`;
      }
      if (method === 'visible_area') return '(this.bus.screen?.visibleArea() ?? { min_x: 0, max_x: 0, min_y: 0, max_y: 0 })';
      if (method === 'update_partial') return `(this.bus.screen?.updatePartial(${args[0] ?? '0'}), 0)`;
      if (method === 'time_until_pos') return '0';
      return `(this.bus.screen?.${method}() ?? 0)`;
    }
    // The scanline timer is driven by the board once per line, so re-arming it
    // is already done; what is left is how long until it fires.
    if (name === 'm_scantimer.adjust') return '0';
    if (name === 'm_scantimer.remaining') return '(this.bus.screen?.untilNextLine() ?? 1)';
    if (name === 'attotime::from_hz') return `(1 / (${args[0] ?? '1'}))`;
    if (name === 'attotime') return `(${args[0] ?? '0'})`;
    if (name === 'machine.side_effects_disabled') return '0';
    if (name === 'util::sext') {
      const shift = `(32 - (${args[1] ?? '32'}))`;
      return `(((${args[0] ?? '0'}) << ${shift}) >> ${shift})`;
    }
    if (name === 'std::min') return `Math.min(${args.join(', ')})`;
    if (name === 'std::max') return `Math.max(${args.join(', ')})`;
    // screen().configure keeps the board's refresh; only the geometry moves.
    if (name === 'HZ_TO_ATTOSECONDS') return '0';
    if (name === 'rectangle') {
      return args.length === 4
        ? `{ min_x: ${args[0]}, max_x: ${args[1]}, min_y: ${args[2]}, max_y: ${args[3]} }`
        : '{ min_x: 0, max_x: 0, min_y: 0, max_y: 0 }';
    }
    // Scheduler services the step already provides: HALT mirrors HSTCTL, and
    // an interrupt is looked for at every instruction boundary.
    if (name === 'set_input_line' || name === 'signal_interrupt_trigger') return '0';
    if (name === 'memset') {
      // Only ever whole-member clears in the cores that ask for strict calls.
      const target = expression.args[0];
      const path = target ? expressionPath(target) : undefined;
      const member = path ? memberForPath(path, context.definition) : undefined;
      if (member?.xyRegisters) return `(this.${member.name}_cells.fill(${args[1] ?? '0'}), 0)`;
      if (member?.values) return `(this.${member.name}.fill(${args[1] ?? '0'}), 0)`;
    }
    // A machine-configured delegate whose arguments are objects -- a screen,
    // a bitmap, a display_params, a shift-register buffer -- rather than one
    // line state, so it goes to the board by name with everything intact.
    if (/^m_\w+_cb$/.test(name)) {
      return `(this.bus.delegate?.(${JSON.stringify(name.slice(2))}, ${args.join(', ')}) ?? 0)`;
    }
    throw new Error(`${context.definition.type} source calls "${name || JSON.stringify(expression.callee).slice(0, 300)}", which has no generated binding`);
  }

  // Unbound MAME callbacks, debugger hooks, daisy-chain hooks and logging are
  // framework services outside the generated CPU's browser execution contract.
  return '0';
}

function emitAssignment(
  target: GeneratedExpression,
  operator: string,
  value: GeneratedExpression,
  context: EmitContext,
  postfix = false,
): string {
  // MAME uses a conditional pointer as an lvalue in a few register helpers,
  // e.g. `*((ordinal & 1) ? &m_d.b.l : &m_d.b.h) = data`. Preserve the
  // selected byte target explicitly; JavaScript has no address-of/dereference
  // lvalue syntax for targetInfo to represent directly.
  if (target.kind === 'unary' && target.operator === '*' &&
      target.operand.kind === 'conditional') {
    const whenTrue = target.operand.whenTrue;
    const whenFalse = target.operand.whenFalse;
    if (whenTrue.kind === 'unary' && whenTrue.operator === '&' &&
        whenFalse.kind === 'unary' && whenFalse.operator === '&') {
      return `(${emitExpression(target.operand.condition, context)} ? (` +
        `${emitAssignment(whenTrue.operand, operator, value, context, postfix)}) : (` +
        `${emitAssignment(whenFalse.operand, operator, value, context, postfix)}))`;
    }
  }
  // `bitmap.pix(y)[x] = pen`: a store into MAME's bitmap row goes through the
  // host bitmap, which clips it to the visible window.
  if (context.definition.strictCalls && target.kind === 'index' && operator === '=' &&
      target.object.kind === 'call' && /\.pix$/.test(expressionPath(target.object.callee) ?? '')) {
    const bitmap = emitExpression((target.object.callee as { object: GeneratedExpression }).object, context);
    return `${bitmap}['pix='](${emitExpression(target.object.args[0]!, context)}, ` +
      `${emitExpression(target.index, context)}, ${emitExpression(value, context)})`;
  }
  // A whole XY is a struct: assigning one copies both fields, whether into a
  // local pair or into a register's `.xy` view.
  if (context.definition.strictCalls && operator === '=' &&
      ((target.kind === 'member' && target.property === 'xy') ||
       (target.kind === 'identifier' && /^(?:const\s+)?XY$/.test(context.locals.get(target.name)?.trim() ?? '')))) {
    const destination = emitExpression(target, context);
    const source = emitExpression(value, context);
    return `(() => { const pair = ${source}; ${destination}.x = pair.x; ${destination}.y = pair.y; return 0; })()`;
  }
  const targetValue = targetInfo(target, context);
  const targetType = context.definition.cIntegerTypes ? typeOfName(targetValue.valueType) : undefined;
  if (targetType?.wide) {
    const operand = emitWide(value, context);
    const combined = operator === '='
      ? operand
      : `((${targetValue.code}) ${operator.slice(0, -1)} (${operand}))`;
    const assignment = `${targetValue.code} = BigInt.as${targetType.signed ? 'Int' : 'Uint'}N(64, ${combined})`;
    return postfix ? `(() => { const previous = ${targetValue.code}; ${assignment}; return previous; })()` : assignment;
  }
  const right = emitExpression(value, context);
  // `>>=` follows the binary `>>` rule: unsigned unless the core states C
  // types and the target is signed.
  const shift = context.definition.cIntegerTypes && cType(target, context).signed ? '>>' : '>>>';
  const next = operator === '='
    ? right
    : operator === '*=' && context.definition.cIntegerTypes
      ? `Math.imul(${targetValue.code}, ${right})`
      : `((${targetValue.code}) ${operator === '>>=' ? shift : operator.slice(0, -1)} (${right}))`;
  const assignment = `${targetValue.code} = ${wrapTarget(next, targetValue)}`;
  return postfix
    ? `(() => { const previous = ${targetValue.code}; ${assignment}; return previous; })()`
    : assignment;
}

function targetInfo(
  expression: GeneratedExpression,
  context: EmitContext,
): { code: string; bits?: 1 | 8 | 16 | 32; valueType?: string; signed?: boolean } {
  if (expression.kind === 'index' && context.definition.strictCalls && !expressionPath(expression.object)) {
    // An element of an array a call returns: `bitmap.pix(y)[x] = pen`.
    return {
      code: `${emitExpression(expression.object, context)}[${emitExpression(expression.index, context)}]`,
    };
  }
  if (expression.kind === 'index') {
    const object = expressionPath(expression.object);
    if (!object) {
      throw new Error(
        `generated CPU assignment has unsupported indexed target ${JSON.stringify(expression)}`,
      );
    }
    const member = memberForPath(object, context.definition);
    return {
      code: `${emitExpression(expression.object, context)}[${emitExpression(expression.index, context)}]`,
      bits: member?.bits,
      signed: member?.signed,
    };
  }
  if (expression.kind === 'unary' && expression.operator === '*' &&
      expression.operand.kind === 'identifier') {
    const pointee = scalarPointerType(context.locals.get(expression.operand.name));
    if (pointee) return { code: `${expression.operand.name}[0]`, valueType: pointee };
  }
  // A field of an indexed element -- `m_regs[i].reg`, `m_regs[i].xy.x` --
  // stores through the element's own accessor, which keeps the union's width.
  if (expression.kind === 'member' && !expressionPath(expression)) {
    return { code: emitExpression(expression, context) };
  }
  const path = expressionPath(expression);
  if (!path) {
    throw new Error(
      `generated CPU assignment has unsupported target ${JSON.stringify(expression)}`,
    );
  }
  const localType = context.locals.get(path);
  if (context.locals.has(path)) {
    return { code: path, valueType: localType };
  }
  // A field of a local struct (an XY value), which stores through its setter.
  if (context.locals.has(path.split('.')[0]!)) return { code: path };
  const alias = context.definition.aliases[path];
  if (alias) return { code: `this.${path}`, bits: alias.bits };

  const member = memberForPath(path, context.definition);
  if (member) {
    if (path === member.name && member.pair32) {
      return { code: `this.${member.name}.d`, bits: 32 };
    }
    if (path === member.name && member.pair) {
      return { code: `this.${member.name}.w`, bits: 16 };
    }
    const suffix = path.slice(member.name.length + 1);
    if (member.pair32) {
      return { code: `this.${path}`, bits: pair32SuffixBits(suffix) };
    }
    if (member.pair) {
      return {
        code: `this.${path}`,
        bits: suffix === 'w' ? 16 : suffix === 'b.h' || suffix === 'b.l' ? 8 : undefined,
      };
    }
    if (member.fields) {
      return { code: `this.${path}`, bits: member.fields[suffix] };
    }
    return { code: `this.${path}`, bits: member.bits, signed: member.signed };
  }
  throw new Error(`generated CPU assignment has unresolved target "${path}"`);
}

function emitIdentifier(name: string, context: EmitContext): string {
  if (context.locals.has(name)) return name;
  if (name === 'true') return '1';
  if (name === 'false' || name === 'nullptr') return '0';
  const constant = context.definition.constants[name] ?? DEFAULT_CONSTANTS[name];
  if (constant !== undefined) return String(constant);
  if (context.definition.aliases[name]) return `this.${name}`;
  const member = context.definition.members.find(candidate => candidate.name === name);
  if (member) {
    if (member.pair32) return `this.${name}.d`;
    return member.pair ? `this.${name}.w` : `this.${name}`;
  }
  // Emitting 0 for a name the definition never declared is how the M68000's
  // per-variant cycle counts went missing without a single diagnostic: every
  // `m_icount -= m_cyc_bcc_notake_b` became `-= 0` and the core ran slow. An
  // unresolved identifier is an incomplete lowering, so it fails the build.
  throw new Error(
    `${context.definition.type} source references "${name}", which the generated ` +
    'CPU definition declares as neither constant, alias, member nor local',
  );
}

function emitPath(path: string, context: EmitContext): string {
  if (context.locals.has(path)) return path;
  const localRoot = path.split('.')[0]!;
  const localType = context.locals.get(localRoot)?.replace(/\bconst\b/g, '').trim();
  if (localType === 'PAIR' || localType === 'u16' || localType === 'uint16_t') {
    if (path === `${localRoot}.w` || path === `${localRoot}.d`) return localRoot;
    if (path === `${localRoot}.b.l`) return `((${localRoot}) & 0xff)`;
    if (path === `${localRoot}.b.h`) return `((${localRoot} >>> 8) & 0xff)`;
  }
  if (context.definition.aliases[path]) return `this.${path}`;
  const member = memberForPath(path, context.definition);
  if (member) {
    if (path === member.name && member.pair32) return `this.${path}.d`;
    if (path === member.name && member.pair) return `this.${path}.w`;
    return `this.${path}`;
  }
  // A field of a local struct or object parameter (an XY, display_params).
  if (context.locals.has(localRoot)) return path;
  if (context.definition.strictCalls) {
    throw new Error(`${context.definition.type} source reads unresolved path "${path}"`);
  }
  return '0';
}

/** Width of one `PAIR` union view, or undefined for a spelling MAME never uses. */
function pair32SuffixBits(suffix: string): 8 | 16 | 32 | undefined {
  if (suffix === 'd') return 32;
  if (suffix === 'w.h' || suffix === 'w.l') return 16;
  if (suffix === 'b.h' || suffix === 'b.l') return 8;
  return undefined;
}

function memberForPath(
  path: string,
  definition: GeneratedCpuDefinition,
): GeneratedCpuMember | undefined {
  return definition.members.find(member =>
    path === member.name || path.startsWith(`${member.name}.`));
}

function contextFor(
  definition: GeneratedCpuDefinition,
  parameters: [string, string | undefined][],
  returnType: 'number' | 'void',
): EmitContext {
  return {
    definition,
    locals: new Map(parameters),
    returnType,
  };
}

function collectLocals(
  operations: GeneratedHandlerOperation[],
  locals: Map<string, string | undefined>,
): void {
  for (const operation of operations) {
    if (operation.op === 'declare') locals.set(operation.name, operation.valueType);
    if (operation.op === 'if') {
      collectLocals(operation.then, locals);
      if (operation.else) collectLocals(operation.else, locals);
    } else if (operation.op === 'for') {
      collectLocals(operation.initialize, locals);
      collectLocals(operation.iterate, locals);
      collectLocals(operation.body, locals);
    } else if (operation.op === 'while' || operation.op === 'do-while') {
      collectLocals(operation.body, locals);
    } else if (operation.op === 'switch') {
      for (const entry of operation.cases) collectLocals(entry.body, locals);
    }
  }
}

function parseParameters(parameters: string): {
  name: string;
  valueType: string;
  reference: boolean;
}[] {
  return parameters.split(',').map(parameter => parameter.trim()).filter(Boolean).map(parameter => {
    const name = /(\w+)\s*$/.exec(parameter.replace(/\.\.\./g, '').trim())?.[1];
    if (!name) throw new Error(`cannot emit CPU parameter "${parameter}"`);
    return {
      name,
      valueType: parameter.slice(0, parameter.lastIndexOf(name)).trim(),
      reference: parameter.includes('&'),
    };
  });
}

function expressionPath(expression: GeneratedExpression): string | undefined {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind !== 'member') return undefined;
  const object = expressionPath(expression.object);
  return object ? `${object}.${expression.property}` : undefined;
}

function wrapTarget(
  value: string,
  target: { bits?: 1 | 8 | 16 | 32; valueType?: string; signed?: boolean },
): string {
  return target.bits
    ? wrapNumber(value, target.bits, target.signed)
    : wrapType(value, target.valueType);
}

function wrapNumber(value: string, bits?: 1 | 8 | 16 | 32, signed?: boolean): string {
  if (bits === 1) return `((${value}) ? 1 : 0)`;
  if (bits === 8) return signed ? `(((${value}) << 24) >> 24)` : `((${value}) & 0xff)`;
  if (bits === 16) return signed ? `(((${value}) << 16) >> 16)` : `((${value}) & 0xffff)`;
  // `| 0` is the two's-complement wrap; `>>> 0` is the unsigned one. A member
  // whose value is read for its sign has to keep the former.
  if (bits === 32) return signed ? `((${value}) | 0)` : `((${value}) >>> 0)`;
  return value;
}

function wrapType(value: string, valueType?: string): string {
  const normalized = valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
  if (normalized === 'u8' || normalized === 'uint8_t') return `((${value}) & 0xff)`;
  if (normalized === 's8' || normalized === 'int8_t' || normalized === 'char') {
    return `(((${value}) << 24) >> 24)`;
  }
  if (normalized === 'bool') return `((${value}) ? 1 : 0)`;
  if (normalized === 'u16' || normalized === 'uint16_t') return `((${value}) & 0xffff)`;
  if (normalized === 's16' || normalized === 'int16_t') return `(((${value}) << 16) >> 16)`;
  if (normalized === 'u32' || normalized === 'uint32_t') return `((${value}) >>> 0)`;
  if (normalized === 's32' || normalized === 'int32_t' || normalized === 'int') {
    return `((${value}) | 0)`;
  }
  return value;
}

/**
 * The C type of an expression, enough to choose the operation JavaScript has
 * to perform: whether a right shift fills with the sign, whether a multiply
 * wraps at 32 bits, and whether the value is 64 bits wide. Only consulted for
 * a core that opts in with \`cIntegerTypes\`.
 */
interface CType { signed: boolean; wide: boolean }

const UNSIGNED_32: CType = { signed: false, wide: false };
const SIGNED_32: CType = { signed: true, wide: false };

/** `int *dx`, `uint32_t *srcaddr`: a pointer to one integer, boxed as [value]. */
function scalarPointerType(valueType: string | undefined): string | undefined {
  const match = /^\s*(?:const\s+)?([\w:]+(?:\s+[\w:]+)?)\s*\*\s*$/.exec(valueType ?? '');
  return match && typeOfName(match[1]) ? match[1] : undefined;
}

function typeOfName(valueType: string | undefined): CType | undefined {
  const normalized = valueType?.replace(/\bconst\b/g, '').replace(/[&*]/g, '').trim();
  if (!normalized) return undefined;
  if (/^(?:u?int64_t|[us]64|(?:unsigned\s+)?long\s+long)$/.test(normalized)) {
    return { signed: !/^(?:uint64_t|u64|unsigned)/.test(normalized), wide: true };
  }
  if (/^(?:uint32_t|u32|unsigned(?:\s+int)?|offs_t)$/.test(normalized)) return UNSIGNED_32;
  // Narrower unsigned types promote to int, so they shift as signed values
  // that happen never to be negative.
  if (/^(?:u?int(?:8|16)_t|[us](?:8|16)|bool|char|short|unsigned\s+(?:char|short))$/.test(normalized)) {
    return SIGNED_32;
  }
  if (/^(?:int32_t|s32|int|signed|long)$/.test(normalized)) return SIGNED_32;
  return undefined;
}

function cType(expression: GeneratedExpression, context: EmitContext): CType {
  switch (expression.kind) {
    case 'number': return expression.value > 0x7fffffff ? UNSIGNED_32 : SIGNED_32;
    case 'identifier': {
      if (context.locals.has(expression.name)) {
        return typeOfName(context.locals.get(expression.name)) ?? UNSIGNED_32;
      }
      const member = context.definition.members.find(candidate => candidate.name === expression.name);
      if (member) return member.signed || (member.bits !== undefined && member.bits < 32) ? SIGNED_32 : UNSIGNED_32;
      return SIGNED_32;
    }
    case 'member':
      // The register union's views and an XY's fields are all signed.
      if (['reg', 'x', 'y'].includes(expression.property)) return SIGNED_32;
      return UNSIGNED_32;
    case 'index': {
      const path = expressionPath(expression.object);
      const member = path ? memberForPath(path, context.definition) : undefined;
      if (member) return member.signed || (member.bits !== undefined && member.bits < 32) ? SIGNED_32 : UNSIGNED_32;
      return UNSIGNED_32;
    }
    case 'cast': return typeOfName(expression.valueType) ?? UNSIGNED_32;
    case 'unary':
      return expression.operator === '!' ? SIGNED_32 : cType(expression.operand, context);
    case 'binary': {
      if (['==', '!=', '<', '<=', '>', '>=', '&&', '||'].includes(expression.operator)) return SIGNED_32;
      const left = cType(expression.left, context);
      if (expression.operator === '<<' || expression.operator === '>>') return left;
      const right = cType(expression.right, context);
      if (left.wide || right.wide) {
        return { wide: true, signed: (left.wide ? left.signed : true) && (right.wide ? right.signed : true) };
      }
      return left.signed && right.signed ? SIGNED_32 : UNSIGNED_32;
    }
    case 'conditional': return cType(expression.whenTrue, context);
    case 'assignment': return cType(expression.target, context);
    case 'call': {
      const name = expressionPath(expression.callee) ?? '';
      if (name === 'mul_32x32') return { signed: true, wide: true };
      if (name === 'mulu_32x32') return { signed: false, wide: true };
      const intrinsic = typeOfName(name);
      return intrinsic ?? UNSIGNED_32;
    }
    default: return UNSIGNED_32;
  }
}

/** An expression evaluated as a BigInt, for 64-bit arithmetic. */
function emitWide(expression: GeneratedExpression, context: EmitContext): string {
  const type = cType(expression, context);
  const fit = (code: string, signed = type.signed) =>
    `BigInt.as${signed ? 'Int' : 'Uint'}N(64, ${code})`;
  if (expression.kind === 'cast' && type.wide) {
    return fit(emitWide(expression.operand, context));
  }
  if (expression.kind === 'identifier' && type.wide && context.locals.has(expression.name)) {
    return expression.name;
  }
  if (expression.kind === 'call') {
    const name = expressionPath(expression.callee) ?? '';
    if (name === 'mul_32x32' || name === 'mulu_32x32') {
      const [left = '0', right = '0'] = expression.args.map(argument => emitExpression(argument, context));
      const cast = name === 'mul_32x32' ? '| 0' : '>>> 0';
      return `(BigInt((${left}) ${cast}) * BigInt((${right}) ${cast}))`;
    }
  }
  if (expression.kind === 'binary' && type.wide) {
    const left = emitWide(expression.left, context);
    const right = emitWide(expression.right, context);
    return fit(`((${left}) ${expression.operator} (${right}))`);
  }
  if (expression.kind === 'unary' && type.wide && (expression.operator === '-' || expression.operator === '~')) {
    return fit(`(${expression.operator}${emitWide(expression.operand, context)})`);
  }
  if (expression.kind === 'conditional' && type.wide) {
    return `((${emitExpression(expression.condition, context)}) ? ` +
      `(${emitWide(expression.whenTrue, context)}) : (${emitWide(expression.whenFalse, context)}))`;
  }
  if (type.wide) {
    throw new Error(`${context.definition.type}: unsupported 64-bit expression ${expression.kind}`);
  }
  // A 32-bit value widening: its own signedness decides the sign extension.
  return `BigInt(${emitExpression(expression, context)})`;
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_$]/g, '_');
}
