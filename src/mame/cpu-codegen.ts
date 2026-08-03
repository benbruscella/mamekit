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

function popcount32(value: number): number {
  value -= (value >>> 1) & 0x55555555;
  value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
  return (((value + (value >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

class Pair16 {
  private value = 0;
  readonly b: { h: number; l: number };

  constructor(value = 0) {
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

  get w(): number { return this.value; }
  set w(value: number) { this.value = value & 0xffff; }
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

  private acknowledgeIrq(): number {
    const source = this.irqData;
    const data = typeof source === 'function' ? source() : source;
    if (this.irqHold) {
      this.irqHold = false;
      this.setIrqLine(false);
    }
    return data;
  }

${emitInternalMethods(definition)}

  get(name: string): number {
    switch (name) {
${emitPublicGetCases(definition)}
      default: return 0;
    }
  }

  set(name: string, value: number): void {
    switch (name) {
${emitPublicSetCases(definition)}
    }
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
  summary: ${JSON.stringify(definition.summary)},
  create: (bus: CpuBus): Cpu => new Generated${safeName(definition.type)}(bus),
};

export default cpu;
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
  if (member.wordByteRegisters) {
    return `  private ${member.name} = new WordByteRegisterFile(${member.wordByteRegisters});`;
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
  if (member.pair) {
    return `  private ${member.name} = new Pair16(${member.initial ?? 0});`;
  }
  return `  private ${member.name} = ${wrapNumber(String(member.initial ?? 0), member.bits)};`;
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
  const body = emitProgram(method.program, context, 4);
  return [
    `  private method_${emittedMethodName(definition, method)}(${parameters.map(parameter =>
      `${parameter.name}: number = 0`).join(', ')}): number {`,
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

function emitPublicGetCases(definition: GeneratedCpuDefinition): string {
  const lines: string[] = [];
  for (const name of Object.keys(definition.aliases)) {
    lines.push(`      case ${JSON.stringify(name)}: return this.${name};`);
  }
  for (const member of definition.members) {
    if (member.values || member.wordByteRegisters || member.z8000Registers) continue;
    if (member.pair) {
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
    if (member.values || member.wordByteRegisters || member.z8000Registers) continue;
    if (member.pair) {
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
        `this.${member.name} = ${wrapNumber('value', member.bits)}; return;`,
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
    const initial = operation.value
      ? wrapType(emitExpression(operation.value, context), operation.valueType)
      : '0';
    return `${pad}let ${operation.name} = ${initial};`;
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
  if (expression.kind === 'number') return String(expression.value);
  if (expression.kind === 'string') return JSON.stringify(expression.value);
  if (expression.kind === 'identifier') return emitIdentifier(expression.name, context);
  if (expression.kind === 'unary') {
    if (expression.operator === '!') {
      return `((${emitExpression(expression.operand, context)}) ? 0 : 1)`;
    }
    return `(${expression.operator}${emitExpression(expression.operand, context)})`;
  }
  if (expression.kind === 'cast') {
    return wrapType(emitExpression(expression.operand, context), expression.valueType);
  }
  if (expression.kind === 'binary') {
    const left = emitExpression(expression.left, context);
    const right = emitExpression(expression.right, context);
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
  if (expression.kind === 'index') {
    return `${emitExpression(expression.object, context)}[${emitExpression(expression.index, context)}]`;
  }
  return emitCall(expression, context);
}

function emitCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: EmitContext,
): string {
  const name = expressionPath(expression.callee) ?? '';
  const args = expression.args.map(argument => emitExpression(argument, context));
  const addressMask = context.definition.addressMask ?? 0xffff;
  const fixedInstructionCycles = context.definition.dialect === 'mame-musashi-generated-handler-table';
  const method = resolveMethod(context.definition, name, expression.args.length);
  if (method) {
    return `this.method_${emittedMethodName(context.definition, method)}(${args.join(', ')})`;
  }

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
  if (name === 'std::popcount') {
    return `popcount32((${args[0] ?? '0'}) >>> 0)`;
  }
  if (name === 'std::size') return `(${args[0] ?? '[]'}).length`;

  if (name === 'READ' || name === 'ARG') {
    const read = `this.readMemory((${args[0] ?? '0'}) & ${addressMask}) & 0xff`;
    return fixedInstructionCycles ? `(${read})` : `(++this.cycles, ${read})`;
  }
  if (name === 'READ16BE') {
    const address = `(${args[0] ?? '0'})`;
    return `(((this.readMemory(${address}) & 0xff) << 8) | ` +
      `(this.readMemory(${address} + 1) & 0xff))`;
  }
  if (name === 'READ16LE') {
    const address = `(${args[0] ?? '0'})`;
    return `((this.readMemory(${address}) & 0xff) | ` +
      `((this.readMemory(${address} + 1) & 0xff) << 8))`;
  }
  if (name === 'READ32BE') {
    const address = `(${args[0] ?? '0'})`;
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
    const address = `(${args[0] ?? '0'})`;
    const value = `(${args[1] ?? '0'})`;
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
    const address = `(${args[0] ?? '0'})`;
    const value = `(${args[1] ?? '0'})`;
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
  if (name === 'm_in_inta_func.isunset' || name === 'm_out_status_func.isunset') return '1';
  if (name === 'm_out_inte_func' || name === 'm_out_sod_func' || name === 'm_out_status_func') {
    return `(this.bus.signal?.(${JSON.stringify(name.slice(2))}, ` +
      `${args[0] ?? '0'}) ?? 0)`;
  }
  if (name === 'standard_irq_callback') return 'this.acknowledgeIrq()';
  if (name === 'm_irqack_cb') {
    return `(this.bus.signal?.('irqack_cb', ${args[0] ?? '0'}) ?? 0)`;
  }
  if (name === 'm_irqack_cb.bind') return '0';
  if (/^m_\w+_cb$/.test(name)) {
    return `(this.bus.signal?.(${JSON.stringify(name.slice(2))}, ${args[0] ?? '0'}) ?? 0)`;
  }
  if (name === 'LOG' || name === 'LOGMASKED' || name === 'logerror') return '0';
  if (name === 'total_cycles') return '1';

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
  const targetValue = targetInfo(target, context);
  const right = emitExpression(value, context);
  const next = operator === '='
    ? right
    : `((${targetValue.code}) ${operator.slice(0, -1)} (${right}))`;
  const assignment = `${targetValue.code} = ${wrapTarget(next, targetValue)}`;
  return postfix
    ? `(() => { const previous = ${targetValue.code}; ${assignment}; return previous; })()`
    : assignment;
}

function targetInfo(
  expression: GeneratedExpression,
  context: EmitContext,
): { code: string; bits?: 1 | 8 | 16 | 32; valueType?: string } {
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
    };
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
  const alias = context.definition.aliases[path];
  if (alias) return { code: `this.${path}`, bits: alias.bits };

  const member = memberForPath(path, context.definition);
  if (member) {
    if (path === member.name && member.pair) {
      return { code: `this.${member.name}.w`, bits: 16 };
    }
    const suffix = path.slice(member.name.length + 1);
    if (member.pair) {
      return {
        code: `this.${path}`,
        bits: suffix === 'w' ? 16 : suffix === 'b.h' || suffix === 'b.l' ? 8 : undefined,
      };
    }
    if (member.fields) {
      return { code: `this.${path}`, bits: member.fields[suffix] };
    }
    return { code: `this.${path}`, bits: member.bits };
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
  if (member) return member.pair ? `this.${name}.w` : `this.${name}`;
  return '0';
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
    if (path === member.name && member.pair) return `this.${path}.w`;
    return `this.${path}`;
  }
  return '0';
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
  target: { bits?: 1 | 8 | 16 | 32; valueType?: string },
): string {
  return target.bits ? wrapNumber(value, target.bits) : wrapType(value, target.valueType);
}

function wrapNumber(value: string, bits?: 1 | 8 | 16 | 32): string {
  if (bits === 1) return `((${value}) ? 1 : 0)`;
  if (bits === 8) return `((${value}) & 0xff)`;
  if (bits === 16) return `((${value}) & 0xffff)`;
  if (bits === 32) return `((${value}) >>> 0)`;
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

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_$]/g, '_');
}
