import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { BoardSourceRef, GeneratedHandlerProgram } from '../ir/board.ts';
import { parseMameAst, parseMameSource, splitMameArgs } from './ast.ts';
import { compileMameHandler } from './handler-ir.ts';
import { stripCppComments } from './initializer.ts';
import {
  parseZ80OpcodeDsl,
  type OpcodeDslOperation,
  type Z80OpcodeDsl,
} from './opcode-dsl.ts';
import { parseM6809Dsl } from './m6809-dsl.ts';
import { collectFunctionMacros, expandFunctionMacros } from './preprocessor.ts';

export interface GeneratedCpuAlias {
  member: string;
  part: 'scalar' | 'word' | 'high' | 'low';
  bits: 1 | 8 | 16 | 32;
}

export interface GeneratedCpuMember {
  name: string;
  bits?: 1 | 8 | 16 | 32;
  /**
   * The member holds a signed value, so a store wraps to two's complement
   * rather than to an unsigned range. MAME declares most flag scratch as
   * `uint32_t` and tests it for zero, but a value a flag reads the *sign* of
   * is `int32_t` -- i86's `m_SignVal` is the one that matters, since `SF` is
   * `m_SignVal < 0` and an unsigned wrap makes every negative byte positive.
   */
  signed?: boolean;
  pair?: boolean;
  values?: number[];
  fields?: Record<string, 1 | 8 | 16 | 32>;
  initial?: number;
  /** Little-endian overlapping word/byte register file (x86/NEC style). */
  wordByteRegisters?: number;
  z8000Registers?: boolean;
}

export interface GeneratedCpuMethod {
  name: string;
  parameters: string;
  program: GeneratedHandlerProgram;
  source: BoardSourceRef;
}

export interface GeneratedCpuOpcode {
  key: string;
  description?: string;
  dispatch: boolean;
  program: GeneratedHandlerProgram;
  source: BoardSourceRef;
}

export interface GeneratedCpuDefinition {
  schemaVersion: 1;
  type: string;
  /** Mask applied to program-space byte addresses (defaults to 16-bit). */
  addressMask?: number;
  /** Clear address bit zero for CPU families whose word/long bus access does so. */
  alignDataWords?: boolean;
  dialect: string;
  /** Opcode-table timing already includes every memory access for the instruction. */
  fixedInstructionCycles?: boolean;
  sourceFiles: string[];
  constants: Record<string, number>;
  aliases: Record<string, GeneratedCpuAlias>;
  members: GeneratedCpuMember[];
  methods: GeneratedCpuMethod[];
  start: GeneratedHandlerProgram;
  reset: GeneratedHandlerProgram;
  input: GeneratedHandlerProgram;
  /** Source-derived execution of exactly one instruction or interrupt. */
  step?: GeneratedHandlerProgram;
  service: GeneratedHandlerProgram;
  fetch: GeneratedHandlerProgram;
  opcodes: GeneratedCpuOpcode[];
  registerBindings?: {
    reg8: string[];
    reg16: string[];
    index: {
      selector: string;
      mask: number;
      members: Record<string, string>;
    };
  };
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
    opcodes: number;
    compiledOpcodes: number;
    methods: number;
    compiledMethods: number;
    diagnostics: number;
  };
}

/**
 * Compile the generic Z80 variant using MAME's own operation DSL, helper
 * methods, register aliases and reset/input logic. The output contains no
 * handwritten opcode or flag implementation.
 */
export function compileMameZ80(mameSrc: string): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/z80/z80.cpp';
  const headerFile = 'src/devices/cpu/z80/z80.h';
  const aliasesFile = 'src/devices/cpu/z80/z80.inc';
  const dslFile = 'src/devices/cpu/z80/z80.lst';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const aliasesSource = readFileSync(join(mameSrc, aliasesFile), 'utf8');
  const dsl = parseZ80OpcodeDsl(dslFile, readFileSync(join(mameSrc, dslFile), 'utf8'));
  const unit = parseMameSource(cppFile, cpp);
  const methods = unit.functions
    .filter(fn => fn.className === 'z80_device')
    .filter(fn => ![
      'device_validity_check',
      'device_start',
      'device_reset',
      'execute_run',
      'execute_set_input',
      'state_import',
      'state_export',
      'state_string_export',
      'create_disassembler',
      'memory_space_config',
    ].includes(fn.name))
    .map(fn => ({
      name: fn.name,
      parameters: fn.parameters,
      program: compileMameHandler(normalizeMameExecutionSource(fn.body)),
      source: sourceRef(fn.span.file, fn.span.line),
    }));

  const object = extractObject(header, 'm_f');
  const objectFields = object ? declaredFields(object.body) : {};
  for (const method of object?.methods ?? []) {
    methods.push({
      name: `m_f.${method.name}`,
      parameters: method.parameters,
      program: compileMameHandler(qualifyObjectFields(
        normalizeMameExecutionSource(method.body),
        'm_f',
        Object.keys(objectFields),
      )),
      source: sourceRef(headerFile, lineAt(header, method.start)),
    });
  }
  for (const method of extractInlineMethods(header, object && [object.start, object.end])) {
    const program = compileMameHandler(normalizeMameExecutionSource(method.body));
    if (program.diagnostics.length) continue;
    methods.push({
      name: method.name,
      parameters: method.parameters,
      program,
      source: sourceRef(headerFile, lineAt(header, method.start)),
    });
  }

  const startMethod = unit.functions.find(fn =>
    fn.className === 'z80_device' && fn.name === 'device_start');
  const resetMethod = unit.functions.find(fn =>
    fn.className === 'z80_device' && fn.name === 'device_reset');
  const inputMethod = unit.functions.find(fn =>
    fn.className === 'z80_device' && fn.name === 'execute_set_input');
  const serviceOpcode = dsl.opcodes.find(opcode => opcode.key === 'ffff');
  if (!startMethod || !resetMethod || !inputMethod || !serviceOpcode) {
    throw new Error('MAME Z80 source is missing start/reset/input/service definitions');
  }

  const fetchAt = serviceOpcode.operations.findIndex(operation =>
    operation.text.trim() === 'PRVPC = PC;');
  if (fetchAt < 0) throw new Error('MAME Z80 service DSL has no instruction fetch boundary');
  const service = compileOpcodeOperations(serviceOpcode.operations.slice(0, fetchAt), {
    continueAsReturn: true,
  });
  const fetch = compileOpcodeOperations(serviceOpcode.operations.slice(fetchAt));
  const opcodes = dsl.opcodes
    .filter(opcode => opcode.key !== 'ffff')
    .map(opcode => ({
      key: opcode.key,
      ...(opcode.description ? { description: opcode.description } : {}),
      dispatch: opcode.operations.some(operation => operation.text.trim() === 'goto process;'),
      program: compileOpcodeOperations(opcode.operations),
      source: sourceRef(opcode.source.file, opcode.source.line),
    }));
  const start = compileMameHandler(normalizeMameExecutionSource(
    stripMameFrameworkSetup(startMethod.body),
  ));
  const reset = compileMameHandler(normalizeMameExecutionSource(resetMethod.body));
  const input = compileMameHandler(normalizeMameExecutionSource(inputMethod.body));
  const constants = {
    ...extractDefineConstants(aliasesSource),
    ...extractEnumConstants(header, {
      INPUT_LINE_IRQ0: 0,
      INPUT_LINE_NMI: -1,
    }),
    ...extractConstexprConstants(header),
    // z80make.py emits these as per-run locals based on whether a devcb is
    // configured. The generated bus safely ignores an unbound signal, so
    // keeping both paths enabled preserves configured refresh/nomreq pins.
    refresh_en: 1,
    nomreq_en: 1,
  };
  const aliases = extractAliases(aliasesSource, header);
  const initializers = extractConstructorInitializers(cpp, 'z80_device');
  const members = extractMembers(header, objectFields).map(member => ({
    ...member,
    ...(initializers[member.name] !== undefined
      ? { initial: initializers[member.name] }
      : {}),
  }));
  const programs = [
    start,
    reset,
    input,
    service,
    fetch,
    ...methods.map(method => method.program),
    ...opcodes.map(opcode => opcode.program),
  ];
  return {
    schemaVersion: 1,
    type: 'Z80',
    dialect: dsl.dialect,
    sourceFiles: [cppFile, headerFile, aliasesFile, dslFile],
    constants,
    aliases,
    members,
    methods,
    start,
    reset,
    input,
    service,
    fetch,
    opcodes,
    summary: {
      opcodes: opcodes.length,
      compiledOpcodes: opcodes.filter(opcode => opcode.program.diagnostics.length === 0).length,
      methods: methods.length,
      compiledMethods: methods.filter(method => method.program.diagnostics.length === 0).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

interface M6502OpcodeBlock {
  name: string;
  body: string;
  line: number;
  file: string;
}

/**
 * Compile MAME's NMOS 6502 operation lists with the Ricoh RP2A03 dispatch
 * selected. MAME's m6502make.py treats each read/write line in the list as one
 * interruptible bus cycle; the generated CPU runtime does the same through its
 * READ/WRITE primitives.
 *
 * The RP2A03 list is deliberately a delta over the common NMOS list: it
 * replaces decimal ADC/SBC/ARR variants while retaining the rest of the 6502
 * instruction definitions. Keeping that composition visible here mirrors
 * MAME's own build instead of introducing a second opcode table.
 */
export function compileMameRp2a03(mameSrc: string): GeneratedCpuDefinition {
  return compileMameM6502Variant(mameSrc, 'RP2A03');
}

/** Compile the stock NMOS 6502 from MAME's common operation/dispatch lists. */
export function compileMameM6502(mameSrc: string): GeneratedCpuDefinition {
  return compileMameM6502Variant(mameSrc, 'M6502');
}

/**
 * The 6507: an NMOS 6502 in a 28-pin package with a narrowed address bus.
 *
 * MAME models it as exactly that -- `m6507_device` adds no operations and no
 * state, only a constructor that narrows `m_program_config.m_addr_width`. That
 * narrowing is the whole part, and it is load bearing on the Atari 2600, whose
 * entire memory map is read through the mirrors the missing pins create. The
 * width is read out of m6507.cpp rather than restated so the mask cannot drift
 * from the device it describes.
 */
export function compileMameM6507(mameSrc: string): GeneratedCpuDefinition {
  const variantFile = 'src/devices/cpu/m6502/m6507.cpp';
  const source = readFileSync(join(mameSrc, variantFile), 'utf8');
  const width = /m_program_config\.m_addr_width\s*=\s*(\d+)\s*;/.exec(source)?.[1];
  if (!width) throw new Error('MAME no longer narrows the 6507 program address width');
  const definition = compileMameM6502Variant(mameSrc, 'M6502');
  return {
    ...definition,
    type: 'M6507',
    addressMask: (1 << Number(width)) - 1,
    sourceFiles: [...definition.sourceFiles, variantFile],
  };
}

function compileMameM6502Variant(
  mameSrc: string,
  variant: 'M6502' | 'RP2A03',
): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/m6502/m6502.cpp';
  const headerFile = 'src/devices/cpu/m6502/m6502.h';
  const variantFile = 'src/devices/cpu/m6502/rp2a03.cpp';
  const variantHeaderFile = 'src/devices/cpu/m6502/rp2a03.h';
  const operationsFile = 'src/devices/cpu/m6502/om6502.lst';
  const variantOperationsFile = 'src/devices/cpu/m6502/orp2a03.lst';
  const dispatchFile = variant === 'RP2A03'
    ? 'src/devices/cpu/m6502/drp2a03.lst'
    : 'src/devices/cpu/m6502/dm6502.lst';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const operationsSource = readFileSync(join(mameSrc, operationsFile), 'utf8');
  const variantOperationsSource = variant === 'RP2A03'
    ? readFileSync(join(mameSrc, variantOperationsFile), 'utf8')
    : '';
  const dispatchSource = readFileSync(join(mameSrc, dispatchFile), 'utf8');
  const unit = parseMameSource(cppFile, cpp);
  const sourceMethods = unit.functions.filter(fn => fn.className === 'm6502_device');

  const normalize = (source: string): string => normalizeMameExecutionSource(source)
    .replace(/\bprefetch(?:_noirq)?\s*\(\s*\)\s*;/g, '')
    .replace(/\bprefetch_(?:start|end|end_noirq)\s*\(\s*\)\s*;/g, '')
    .replace(/\bm_sync_w\s*\([^;]*\)\s*;/g, '')
    .replace(/\bm_inst_state\s*=\s*-1\s*;/g, '')
    .replace(/\bread_pc\s*\(\s*\)/g, 'ARG(m_PC)')
    .replace(/\bread_sync\s*\(/g, 'OPCODE(')
    .replace(/\bread_arg\s*\(/g, 'ARG(')
    .replace(/\bread_9\s*\(/g, 'READ(')
    .replace(/\bread\s*\(/g, 'READ(')
    .replace(/\bwrite_9\s*\(/g, 'WRITE(')
    .replace(/\bwrite\s*\(/g, 'WRITE(');

  const commonBlocks = parseM6502OpcodeBlocks(operationsFile, operationsSource);
  const variantBlocks = parseM6502OpcodeBlocks(
    variantOperationsFile,
    variantOperationsSource,
  );
  const blocks = new Map(
    [...commonBlocks, ...variantBlocks].map(block => [block.name, block]),
  );
  const dispatch = dispatchSource
    .split(/\r?\n/)
    .filter(line => !line.trim().startsWith('#'))
    .flatMap(line => line.trim().split(/\s+/).filter(Boolean));
  if (dispatch.length !== 257) {
    throw new Error(
      `MAME RP2A03 dispatch contains ${dispatch.length} states, expected 257`,
    );
  }
  const opcodeNames = dispatch.slice(0, 256);
  const resetName = dispatch[256]!;
  for (const name of new Set([...opcodeNames, resetName])) {
    if (!blocks.has(name)) {
      throw new Error(`MAME RP2A03 operation list is missing ${name}`);
    }
  }

  const helperNames = [
    ...(variant === 'RP2A03'
      ? ['do_adc_nd', 'do_arr_nd', 'do_sbc_nd']
      : ['do_adc', 'do_adc_d', 'do_adc_nd', 'do_arr', 'do_arr_d', 'do_arr_nd',
          'do_sbc', 'do_sbc_d', 'do_sbc_nd']),
    'do_cmp',
    'do_bit',
    'do_asl',
    'do_lsr',
    'do_ror',
    'do_rol',
    'do_asr',
    'set_nz',
  ];
  const methodByName = new Map(sourceMethods.map(method => [method.name, method]));
  const methods: GeneratedCpuMethod[] = helperNames.map(name => {
    const method = methodByName.get(name);
    if (!method) throw new Error(`MAME ${variant} source is missing ${name}()`);
    return {
      name,
      parameters: method.parameters,
      program: compileMameHandler(normalize(method.body)),
      source: sourceRef(method.span.file, method.span.line),
    };
  });
  for (const method of [
    {
      name: 'set_l',
      parameters: 'uint16_t base, uint8_t val',
      body: 'return (base & 0xff00) | val;',
    },
    {
      name: 'set_h',
      parameters: 'uint16_t base, uint8_t val',
      body: 'return (base & 0x00ff) | (val << 8);',
    },
    {
      name: 'page_changing',
      parameters: 'uint16_t base, int delta',
      body: 'return ((base + delta) ^ base) & 0xff00;',
    },
    {
      name: 'dec_SP',
      parameters: '',
      body: 'm_SP = set_l(m_SP, m_SP - 1);',
    },
    {
      name: 'inc_SP',
      parameters: '',
      body: 'm_SP = set_l(m_SP, m_SP + 1);',
    },
  ]) {
    methods.push({
      ...method,
      program: compileMameHandler(method.body),
      source: sourceRef(headerFile, lineAt(header, header.indexOf(`${method.name}(`))),
    });
  }

  const opcodes = opcodeNames.map((name, opcode) => {
    const block = blocks.get(name)!;
    const body = name === 'kil_non'
      // MAME marks KIL as an endless stream of bus reads. A browser host cannot
      // busy-loop forever; one source-declared read per scheduler step keeps
      // the CPU halted without freezing the page.
      ? 'READ(0xffff); m_PC = m_PC;'
      : normalize(block.body);
    return {
      key: `${opcode.toString(16).padStart(2, '0')}00`,
      description: name,
      dispatch: false,
      program: compileMameHandler(body),
      source: sourceRef(block.file, block.line),
    };
  });
  const resetBlock = blocks.get(resetName)!;
  const reset = compileMameHandler(
    normalize(resetBlock.body)
      .replace(/\bm_inst_state\s*=\s*[^;]+;/g, '')
      .replace(/\bm_PC\s*=\s*ARG\(0xfffc\)\s*;/, 'm_PC = READ(0xfffc);')
      .replace(/\bm_PC\s*=\s*set_h\(m_PC,\s*ARG\(0xfffd\)\)\s*;/,
        'm_PC = set_h(m_PC, READ(0xfffd));'),
  );
  const input = compileMameHandler(variant === 'RP2A03' ? `
    if (inputnum == IRQ_LINE) {
      m_irq_state = state == ASSERT_LINE;
    } else if (inputnum == APU_IRQ_LINE) {
      m_apu_irq_state = state == ASSERT_LINE;
    } else if (inputnum == NMI_LINE) {
      if (!m_nmi_state && state == ASSERT_LINE)
        m_nmi_pending = true;
      m_nmi_state = state == ASSERT_LINE;
    } else if (inputnum == V_LINE) {
      if (!m_v_state && state == ASSERT_LINE)
        m_P |= F_V;
      m_v_state = state == ASSERT_LINE;
    }
  ` : `
    if (inputnum == IRQ_LINE) {
      m_irq_state = state == ASSERT_LINE;
    } else if (inputnum == NMI_LINE) {
      if (!m_nmi_state && state == ASSERT_LINE)
        m_nmi_pending = true;
      m_nmi_state = state == ASSERT_LINE;
    }
  `);
  const service = compileMameHandler('');
  const fetch = compileMameHandler(`
    m_NPC = m_PC;
    if (m_nmi_pending || ((m_irq_state${variant === 'RP2A03' ? ' || m_apu_irq_state' : ''}) && !(m_P & F_I))) {
      m_irq_taken = true;
      m_IR = 0;
    } else {
      m_irq_taken = false;
      m_IR = OPCODE(m_PC);
      m_PC++;
    }
    m_ref = m_IR << 16;
  `);
  const members: GeneratedCpuMember[] = [
    ...['m_PPC', 'm_NPC', 'm_PC', 'm_SP', 'm_TMP']
      .map(name => ({ name, bits: 16 as const })),
    ...['m_TMP2', 'm_A', 'm_X', 'm_Y', 'm_P', 'm_IR']
      .map(name => ({ name, bits: 8 as const })),
    { name: 'm_inst_state_base' },
    { name: 'm_nmi_state', bits: 1 },
    { name: 'm_irq_state', bits: 1 },
    { name: 'm_apu_irq_state', bits: 1 },
    { name: 'm_v_state', bits: 1 },
    { name: 'm_nmi_pending', bits: 1 },
    { name: 'm_irq_taken', bits: 1 },
    { name: 'm_inhibit_interrupts', bits: 1 },
    { name: 'm_ref', bits: 32 },
    { name: 'cycles' },
    { name: 'm_icount' },
  ];
  const start = compileMameHandler(`
    m_PPC = 0;
    m_NPC = 0;
    m_PC = 0;
    m_SP = 0x0100;
    m_A = 0;
    m_X = 0x80;
    m_Y = 0;
    m_P = 0x36;
    m_TMP = 0;
    m_TMP2 = 0;
    m_IR = 0;
    m_nmi_state = false;
    m_irq_state = false;
    m_apu_irq_state = false;
    m_v_state = false;
    m_nmi_pending = false;
    m_irq_taken = false;
    m_inhibit_interrupts = false;
  `);
  const constants = {
    IRQ_LINE: 0,
    APU_IRQ_LINE: 1,
    NMI_LINE: -1,
    V_LINE: 16,
    INPUT_LINE_IRQ0: 0,
    INPUT_LINE_NMI: -1,
    CLEAR_LINE: 0,
    ASSERT_LINE: 1,
    F_N: 0x80,
    F_V: 0x40,
    F_E: 0x20,
    F_B: 0x10,
    F_D: 0x08,
    F_I: 0x04,
    F_Z: 0x02,
    F_C: 0x01,
  };
  const programs = [
    start,
    reset,
    input,
    service,
    fetch,
    ...methods.map(method => method.program),
    ...opcodes.map(opcode => opcode.program),
  ];
  return {
    schemaVersion: 1,
    type: variant,
    dialect: 'mame-m6502-operation-list',
    sourceFiles: [
      cppFile,
      headerFile,
      ...(variant === 'RP2A03' ? [variantFile, variantHeaderFile] : []),
      operationsFile,
      ...(variant === 'RP2A03' ? [variantOperationsFile] : []),
      dispatchFile,
    ],
    constants,
    aliases: {},
    members,
    methods,
    start,
    reset,
    input,
    service,
    fetch,
    opcodes,
    summary: {
      opcodes: opcodes.length,
      compiledOpcodes: opcodes.filter(opcode =>
        !opcode.program.diagnostics.length).length,
      methods: methods.length,
      compiledMethods: methods.filter(method =>
        !method.program.diagnostics.length).length,
      diagnostics: programs.reduce(
        (count, program) => count + program.diagnostics.length,
        0,
      ),
    },
  };
}

function parseM6502OpcodeBlocks(file: string, source: string): M6502OpcodeBlock[] {
  const blocks: M6502OpcodeBlock[] = [];
  let current: M6502OpcodeBlock | undefined;
  const lines = source.split(/\r?\n/);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]!;
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      current = { name: line.trim(), body: '', line: index + 1, file };
      blocks.push(current);
      continue;
    }
    if (!current) throw new Error(`${file}:${index + 1}: operation without name`);
    current.body += `${line.trimStart()}\n`;
  }
  return blocks;
}

/**
 * Compile Intel MCS-48 execution directly from MAME's opcode-handler table.
 *
 * MAME expresses this core as 256 OP(handler) entries backed by OPHANDLER
 * methods rather than a .lst DSL. The table is still the instruction DSL: it
 * selects the source method for every opcode, while the AST compiler lowers
 * those methods and their shared execution helpers.
 */
export function compileMameMcs48(
  mameSrc: string,
  variant: 'I8035' | 'I8039' | 'MB8884' | 'M58715' = 'I8039',
): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/mcs48/mcs48.cpp';
  const headerFile = 'src/devices/cpu/mcs48/mcs48.h';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const transformed = cpp.replace(
    /^\s*OPHANDLER\s*\(\s*(\w+)\s*\)/gm,
    'void mcs48_cpu_device::$1()',
  );
  const unit = parseMameSource(cppFile, transformed);
  const table = /s_mcs48_opcodes\s*\[\s*256\s*\]\s*=\s*\{([\s\S]*?)\};/.exec(cpp)?.[1];
  if (!table) throw new Error('MAME MCS-48 source has no 256-entry opcode table');
  const opcodeNames = [...table.matchAll(/\bOP\s*\(\s*(\w+)\s*\)/g)]
    .map(match => match[1]!);
  if (opcodeNames.length !== 256) {
    throw new Error(`MAME MCS-48 opcode table has ${opcodeNames.length} entries`);
  }

  const normalize = (body: string): string => {
    let source = body;
    for (let register = 0; register < 8; register++) {
      source = source.replace(
        new RegExp(`\\bR${register}\\b`, 'g'),
        `m_dataptr[((m_psw & B_FLAG) ? 24 : 0) + ${register}]`,
      );
    }
    return normalizeMameExecutionSource(source)
      .replace(/\bm_bus_out_cb\s*\(\s*0\s*,\s*([^,]+),[^)]*\)/g, 'bus_w($1)')
      .replace(/\bupdate_regptr\s*\(\s*\)\s*;/g, '')
      .replace(/\bupdate_ea\s*\(\s*\)\s*;/g, '')
      .replace(
        /^\s*if\s*\(\s*!m_t0_clk_func\.isnull\(\)\s*\)\s*[\r\n]+\s*m_t0_clk_func\([^;]*\);/gm,
        '',
      );
  };
  const functionByName = new Map(
    unit.functions
      .filter(fn => fn.className === 'mcs48_cpu_device')
      .map(fn => [fn.name, fn]),
  );
  const helperNames = [
    'opcode_fetch',
    'argument_fetch',
    'push_pc_psw',
    'pull_pc_psw',
    'pull_pc',
    'execute_add',
    'execute_addc',
    'execute_jmp',
    'execute_call',
    'execute_jcc',
    'p2_mask',
    'expander_operation',
    'check_irqs',
    'burn_cycles',
  ];
  const methodNames = [...new Set([...helperNames, ...opcodeNames])];
  const methods = methodNames.map(name => {
    const fn = functionByName.get(name);
    if (!fn) throw new Error(`MAME MCS-48 source is missing ${name}()`);
    let body = normalize(fn.body);
    if (name === 'burn_cycles') {
      body = `int requested_cycles = count;\n${body}`
        .replace(/\bcount--\s*,\s*m_icount--/g, 'count--')
        .replace(/\bm_icount\s*-=\s*count\s*;/g, 'cycles += requested_cycles;');
    }
    return {
      name,
      parameters: fn.parameters,
      program: compileMameHandler(body),
      source: sourceRef(fn.span.file, fn.span.line),
    };
  });
  const startMethod = functionByName.get('device_start');
  const resetMethod = functionByName.get('device_reset');
  const inputMethod = functionByName.get('execute_set_input');
  if (!startMethod || !resetMethod || !inputMethod) {
    throw new Error('MAME MCS-48 source is missing start/reset/input definitions');
  }
  const frameworkStart = startMethod.body.indexOf('space(AS_PROGRAM)');
  const startBody = frameworkStart >= 0
    ? startMethod.body.slice(0, frameworkStart)
    : startMethod.body;
  const start = compileMameHandler(normalize(startBody));
  const reset = compileMameHandler(normalize(resetMethod.body));
  const input = compileMameHandler(normalize(inputMethod.body));
  const service = compileMameHandler(normalize(`
    check_irqs();
    m_irq_polled = false;
    m_prevpc = m_pc;
  `));
  const fetch = compileMameHandler(normalize('m_ref = opcode_fetch() << 16;'));
  const constants = {
    ...extractDefineConstants(cpp),
    ...extractEnumConstants(header, {
      CLEAR_LINE: 0,
      ASSERT_LINE: 1,
    }),
  };
  const variantClass = variant === 'MB8884'
    ? 'mb8884_device'
    : variant === 'M58715'
      ? 'm58715_device'
    : variant === 'I8035'
      ? 'i8035_device'
      : 'i8039_device';
  const constructor = new RegExp(
    `${variantClass}::${variantClass}\\([^\\n]*\\)\\s*` +
    `:\\s*mcs48_cpu_device\\(([^\\n]+)\\)`,
  ).exec(cpp);
  if (!constructor) throw new Error(`MAME MCS-48 source has no ${variantClass} constructor`);
  const constructorArgs = splitMameArgs(constructor[1]!);
  const constructorValue = (index: number): number => {
    const expression = constructorArgs[index]?.trim() ?? '';
    const value = constants[expression] ?? Number(expression);
    if (!Number.isFinite(value)) {
      throw new Error(`${variantClass} constructor argument ${index} is not numeric: ${expression}`);
    }
    return value;
  };
  // mcs48_cpu_device(mconfig, type, tag, owner, clock,
  //                  rom_size, ram_size, feature_mask, opcode_table)
  const romSize = constructorValue(5);
  const ramSize = constructorValue(6);
  const featureMask = constructorValue(7);
  const members = extractMembers(header, {}).filter(member => member.name !== 'm_rtemp');
  const setInitial = (name: string, initial: number): void => {
    const member = members.find(candidate => candidate.name === name);
    if (member) member.initial = initial;
    else members.push({ name, bits: 16, initial });
  };
  setInitial('m_feature_mask', featureMask);
  setInitial('m_rom_size', romSize);
  setInitial('m_ram_size', ramSize);
  members.push(
    { name: 'm_dataptr', bits: 8, values: new Array(ramSize).fill(0) },
    { name: 'm_ref', bits: 32, initial: 0 },
  );
  const opcodes = opcodeNames.map((name, opcode) => {
    const method = methods.find(candidate => candidate.name === name)!;
    return {
      key: `${opcode.toString(16).padStart(2, '0')}00`,
      description: name,
      dispatch: false,
      program: compileMameHandler(`${name}();`),
      source: method.source,
    };
  });
  const programs = [
    start,
    reset,
    input,
    service,
    fetch,
    ...methods.map(method => method.program),
    ...opcodes.map(opcode => opcode.program),
  ];
  return {
    schemaVersion: 1,
    type: variant,
    dialect: 'mame-mcs48-ophandler-table',
    sourceFiles: [cppFile, headerFile],
    constants,
    aliases: {},
    members: members.sort((left, right) => left.name.localeCompare(right.name)),
    methods,
    start,
    reset,
    input,
    service,
    fetch,
    opcodes,
    summary: {
      opcodes: opcodes.length,
      compiledOpcodes: opcodes.filter(opcode => !opcode.program.diagnostics.length).length,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce(
        (count, program) => count + program.diagnostics.length,
        0,
      ),
    },
  };
}

/**
 * Compile MAME's shared 8080/8085 implementation with the i8080 subclass
 * overrides selected. Unlike the Z80 core, this CPU has no opcode DSL: MAME's
 * executable source is a single 256-case `execute_one` switch.
 */
export function compileMameI8080(mameSrc: string): GeneratedCpuDefinition {
  return compileMameI808x(mameSrc, 'I8080');
}

/** Compile the 8085A variant from the same MAME switch core. */
export function compileMameI8085A(mameSrc: string): GeneratedCpuDefinition {
  return compileMameI808x(mameSrc, 'I8085A');
}

function compileMameI808x(
  mameSrc: string,
  variant: 'I8080' | 'I8085A',
): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/i8085/i8085.cpp';
  const headerFile = 'src/devices/cpu/i8085/i8085.h';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const unit = parseMameSource(cppFile, cpp);
  const sourceMethods = unit.functions.filter(fn => fn.className === 'i8085a_cpu_device');
  const find = (name: string) => sourceMethods.find(fn => fn.name === name);
  const startMethod = find('device_start');
  const resetMethod = find('device_reset');
  const inputMethod = find('execute_set_input');
  const runMethod = find('execute_run');
  if (!startMethod || !resetMethod || !inputMethod || !runMethod || !find('execute_one')) {
    throw new Error('MAME I8080 source is missing start/reset/input/execute definitions');
  }

  const normalize = (source: string): string => normalizeI8080Source(
    normalizeMameExecutionSource(source),
  );
  const excluded = new Set([
    'memory_space_config',
    'device_config_complete',
    'device_clock_changed',
    'device_start',
    'device_reset',
    'state_import',
    'state_export',
    'state_string_export',
    'create_disassembler',
    'execute_run',
  ]);
  const methods = sourceMethods
    .filter(fn => !excluded.has(fn.name))
    .map(fn => ({
      name: fn.name,
      parameters: fn.parameters,
      program: compileMameHandler(normalize(fn.body)),
      source: sourceRef(fn.span.file, fn.span.line),
    }));
  for (const name of ['ret_taken', 'jmp_taken', 'call_taken', 'is_8085']) {
    const inline = inlineMethodForClass(
      header,
      name,
      variant === 'I8085A' || name === 'ret_taken'
        ? 'i8085a_cpu_device'
        : 'i8080_cpu_device',
    );
    if (!inline) throw new Error(`MAME ${variant} source is missing ${name} override`);
    methods.push({
      name,
      parameters: inline.parameters,
      program: compileMameHandler(normalize(inline.body)),
      source: sourceRef(headerFile, lineAt(header, inline.start)),
    });
  }

  const startSource = startMethod.body.slice(
    0,
    startMethod.body.indexOf('init_tables();') + 'init_tables();'.length,
  );
  const start = compileMameHandler(normalize(startSource));
  const reset = compileMameHandler(normalize(resetMethod.body));
  const input = compileMameHandler(
    normalize(inputMethod.body).replace(/\birqline\b/g, 'inputnum'),
  );
  const step = compileMameHandler(normalize(singleIterationSource(runMethod.body)));
  const constants = {
    ...extractDefineConstants(header),
    ...extractGlobalConstants(cpp),
    ...extractEnumConstants(header, {
      INPUT_LINE_IRQ0: 0,
      INPUT_LINE_NMI: -1,
    }),
    I8085_INTR_LINE: 0,
    I8085_RST55_LINE: 1,
    I8085_RST65_LINE: 2,
    I8085_RST75_LINE: 3,
    I8085_TRAP_LINE: -1,
    CLEAR_LINE: 0,
    ASSERT_LINE: 1,
  };
  const members: GeneratedCpuMember[] = [
    ...['m_PC', 'm_SP', 'm_AF', 'm_BC', 'm_DE', 'm_HL', 'm_WZ']
      .map(name => ({ name, bits: 16 as const, pair: true })),
    ...[
      'm_halt', 'm_im', 'm_status', 'm_after_ei', 'm_nmi_state',
      'm_trap_im_copy', 'm_sod_state', 'm_ietemp',
    ].map(name => ({ name, bits: 8 as const })),
    { name: 'm_trap_pending', bits: 1 },
    { name: 'm_in_acknowledge', bits: 1 },
    // MAME's cycle budget is a signed int and intentionally becomes negative.
    { name: 'm_icount' },
    { name: 'm_irq_state', bits: 8, values: [0, 0, 0, 0] },
    { name: 'lut_cycles_8080', bits: 8, values: extractNumericArray(cpp, 'lut_cycles_8080') },
    { name: 'lut_cycles_8085', bits: 8, values: extractNumericArray(cpp, 'lut_cycles_8085') },
    { name: 'lut_cycles', bits: 8, values: Array(256).fill(0) },
    { name: 'lut_zs', bits: 8, values: Array(256).fill(0) },
    { name: 'lut_zsp', bits: 8, values: Array(256).fill(0) },
  ];
  const aliases = extractStateAliases(startMethod.body);
  const service = compileMameHandler('');
  const fetch = compileMameHandler('');
  const programs = [start, reset, input, step, ...methods.map(method => method.program)];
  return {
    schemaVersion: 1,
    type: variant,
    dialect: 'mame-cpp-switch',
    sourceFiles: [cppFile, headerFile],
    constants,
    aliases,
    members,
    methods,
    start,
    reset,
    input,
    step,
    service,
    fetch,
    opcodes: [],
    summary: {
      opcodes: 256,
      compiledOpcodes: step.diagnostics.length ? 0 : 256,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

/**
 * Compile MAME's 6800-family opcode source with the M6803 dispatch and cycle
 * tables selected. MAME keeps the instruction semantics in 6800ops.hxx behind
 * C preprocessor macros; this pass expands those macros before lowering the
 * resulting ordinary C++ statements to handler IR.
 */
export function compileMameM6803(mameSrc: string): GeneratedCpuDefinition {
  return compileMameM6800Family(mameSrc, {
    type: 'M6803',
    dispatch: 'm6803_insn',
    cycles: 'cycles_6803',
    tableFile: 'src/devices/cpu/m6800/m6801.cpp',
    tableClass: 'm6801_cpu_device',
    internal: 'm6803',
  });
}

/**
 * Compile Hitachi's HD63701Y0.  It shares the 6801 implementation with the
 * M6803, but selects the HD63701 instruction/cycle tables and the Y package's
 * larger internal RAM plus port 6.  Double Dragon uses that port to release
 * the main CPU's sprite-handshake interrupt.
 */
export function compileMameHd63701Y0(mameSrc: string): GeneratedCpuDefinition {
  return compileMameM6800Family(mameSrc, {
    type: 'HD63701Y0',
    dispatch: 'hd63701_insn',
    cycles: 'cycles_63701',
    tableFile: 'src/devices/cpu/m6800/m6801.cpp',
    tableClass: 'm6801_cpu_device',
    internal: 'hd63701y0',
  });
}

/** Compile the Motorola M6802 variant selected by MAME's device constructor. */
export function compileMameM6802(mameSrc: string): GeneratedCpuDefinition {
  return compileMameM6800Family(mameSrc, {
    type: 'M6802',
    dispatch: 'm6800_insn',
    cycles: 'cycles_6800',
    tableFile: 'src/devices/cpu/m6800/m6800.cpp',
    tableClass: 'm6800_cpu_device',
    internal: 'm6802',
  });
}

/** M6808 uses the M6800 instruction core; only its on-chip RAM size differs. */
export function compileMameM6808(mameSrc: string): GeneratedCpuDefinition {
  const definition = compileMameM6802(mameSrc);
  return { ...definition, type: 'M6808' };
}

/**
 * Compile the original 24-bit Motorola 68000 from MAME's generated Musashi
 * handler and decode tables.  MAME keeps one full-instruction function per
 * decode state; the opcode table expands those states across all 65,536
 * opcodes, so the emitted core retains the compact state dispatch rather than
 * duplicating identical programs for every register encoding.
 */
export function compileMameM68000(mameSrc: string): GeneratedCpuDefinition {
  const operationsFile = 'src/devices/cpu/m68000/m68kops.cpp';
  const headerFile = 'src/devices/cpu/m68000/m68kcpu.h';
  const dataFile = 'src/devices/cpu/m68000/m68kcpu.cpp';
  const operations = readFileSync(join(mameSrc, operationsFile), 'utf8');
  const dataSource = readFileSync(join(mameSrc, dataFile), 'utf8');
  const unit = parseMameSource(operationsFile, operations);
  const functions = new Map(unit.functions
    .filter(fn => fn.className === 'm68000_musashi_device')
    .map(fn => [fn.name, fn]));

  const handlerStart = operations.indexOf('m68k_handler_table[]');
  const handlerEnd = operations.indexOf('const u16 m68000_musashi_device::m68k_state_illegal');
  if (handlerStart < 0 || handlerEnd < 0) {
    throw new Error('MAME M68000 source has no generated handler table');
  }
  const handlers = [...operations.slice(handlerStart, handlerEnd).matchAll(
    /&m68000_musashi_device::(\w+)/g,
  )].map(match => match[1]!);
  const illegalState = Number(
    /m68k_state_illegal\s*=\s*(\d+)/.exec(operations.slice(handlerEnd))?.[1],
  );
  if (!handlers.length || !Number.isInteger(illegalState) || !handlers[illegalState]) {
    throw new Error('MAME M68000 generated handler table is incomplete');
  }

  const opcodeStart = operations.indexOf('m68k_opcode_table[]', handlerEnd);
  if (opcodeStart < 0) throw new Error('MAME M68000 source has no opcode decode table');
  const opcodeRows = [...operations.slice(opcodeStart).matchAll(
    /\{\s*(0x[\da-f]+|\d+)\s*,\s*(0x[\da-f]+|\d+)\s*,\s*\{([^}]+)\}\s*\}/gi,
  )].map(match => ({
    match: Number(match[1]),
    mask: Number(match[2]),
    cycles: splitMameArgs(match[3]!).map(Number),
  })).filter(row => row.mask !== 0);
  if (opcodeRows.length !== handlers.length) {
    throw new Error(
      `MAME M68000 handler/decode tables disagree (${handlers.length}/${opcodeRows.length})`,
    );
  }

  const states = new Array<number>(0x10000).fill(illegalState);
  const stateCycles = new Array<number>(handlers.length).fill(4);
  for (let state = 0; state < opcodeRows.length; state++) {
    const row = opcodeRows[state]!;
    const cycles = row.cycles[0]!;
    if (cycles === 0xff) continue;
    stateCycles[state] = cycles;
    let extra = 0;
    do {
      states[(row.match | extra) & 0xffff] = state;
      extra = ((extra | row.mask) + 1) & ~row.mask;
    } while (extra);
  }

  const activeStates = [...new Set(states)].sort((left, right) => left - right);
  const methods: GeneratedCpuMethod[] = activeStates.map(state => {
    const name = handlers[state]!;
    const fn = functions.get(name);
    if (!fn) throw new Error(`MAME M68000 source is missing generated handler ${name}`);
    return {
      name,
      parameters: '',
      program: compileMameHandler(normalizeM68000Source(fn.body)),
      source: sourceRef(operationsFile, fn.span.line),
    };
  });
  methods.push(...m68000SupportMethods(operationsFile));

  const opcodes = activeStates.map(state => ({
    key: state.toString(16).padStart(4, '0'),
    description: handlers[state],
    dispatch: false,
    program: compileMameHandler(`${handlers[state]}(); cycles += ${stateCycles[state]};`),
    source: methods.find(method => method.name === handlers[state])!.source,
  }));
  const start = compileMameHandler('');
  const reset = compileMameHandler(`
    for (int index = 0; index < 16; index++) m_dar[index] = 0;
    m_int_level = 0;
    m_virq_state = 0;
    m_hold_irq = 0;
    m_int_mask = 0x0700;
    m_s_flag = 4;
    m_stopped = 0;
    m_instr_mode = INSTRUCTION_YES;
    m_run_mode = RUN_MODE_NORMAL;
    m_dar[15] = m68ki_read_32(0);
    m_sp[4] = m_dar[15];
    m_pc = m68ki_read_32(4);
    cycles = m_cyc_reset;
  `);
  const input = compileMameHandler(`
    if (inputnum >= 1 && inputnum <= 7) {
      if (state == CLEAR_LINE) {
        m_virq_state &= ~(1 << inputnum);
        m_hold_irq &= ~(1 << inputnum);
      } else {
        m_virq_state |= 1 << inputnum;
        if (state == HOLD_LINE) m_hold_irq |= 1 << inputnum;
      }
      m_int_level = 0;
      if (m_interrupt_mixer) {
        for (int level = 1; level <= 7; level++)
          if (m_virq_state & (1 << level)) m_int_level = level << 8;
      } else {
        m_int_level = m_virq_state << 8;
      }
    }
  `);
  const service = compileMameHandler(`
    if ((m_int_level & 0x0700) > (m_int_mask & 0x0700)) {
      m68ki_service_interrupt(m_int_level >> 8);
      return;
    }
    if (m_stopped) { cycles += 4; return; }
  `);
  const fetch = compileMameHandler(`
    m_ppc = m_pc;
    m_ir = m68ki_read_imm_16();
    m_ref = m_state[m_ir] << 8;
  `);
  const constants = {
    CLEAR_LINE: 0,
    ASSERT_LINE: 1,
    HOLD_LINE: 2,
    INPUT_LINE_NMI: -1,
    CFLAG_SET: 0x100,
    CFLAG_CLEAR: 0,
    XFLAG_SET: 0x100,
    XFLAG_CLEAR: 0,
    VFLAG_SET: 0x80,
    VFLAG_CLEAR: 0,
    NFLAG_SET: 0x80,
    NFLAG_CLEAR: 0,
    ZFLAG_SET: 0,
    ZFLAG_CLEAR: 0xffffffff,
    INSTRUCTION_YES: 0,
    RUN_MODE_NORMAL: 0,
    SFLAG_SET: 4,
    SFLAG_CLEAR: 0,
    MFLAG_SET: 2,
    MFLAG_CLEAR: 0,
    STOP_LEVEL_STOP: 1,
    EXCEPTION_RESET: 0,
    EXCEPTION_BUS_ERROR: 2,
    EXCEPTION_ADDRESS_ERROR: 3,
    EXCEPTION_ILLEGAL_INSTRUCTION: 4,
    EXCEPTION_ZERO_DIVIDE: 5,
    EXCEPTION_CHK: 6,
    EXCEPTION_TRAPV: 7,
    EXCEPTION_PRIVILEGE_VIOLATION: 8,
    EXCEPTION_TRACE: 9,
    EXCEPTION_1010: 10,
    EXCEPTION_1111: 11,
    EXCEPTION_FORMAT_ERROR: 14,
    EXCEPTION_UNINITIALIZED_INTERRUPT: 15,
    EXCEPTION_SPURIOUS_INTERRUPT: 24,
    EXCEPTION_INTERRUPT_AUTOVECTOR: 24,
    EXCEPTION_TRAP_BASE: 32,
    EXCEPTION_MMU_CONFIGURATION: 56,
    ...m68000CycleConstants(dataFile, dataSource, operations),
  };
  const shiftTable = (name: string): number[] => {
    const body = new RegExp(`${name}\\[65\\]\\s*=\\s*\\{([\\s\\S]*?)\\};`)
      .exec(dataSource)?.[1];
    if (!body) throw new Error(`MAME M68000 source is missing ${name}`);
    return [...body.matchAll(/0x[\da-f]+|\d+/gi)].map(match => Number(match[0]));
  };
  const members: GeneratedCpuMember[] = [
    { name: 'm_dar', bits: 32, values: new Array(16).fill(0) },
    { name: 'm_sp', bits: 32, values: new Array(7).fill(0) },
    { name: 'm_interrupt_mixer', bits: 1, initial: 1 },
    { name: 'm_state', bits: 16, values: states },
    { name: 'm68ki_shift_8_table', bits: 8, values: shiftTable('m68ki_shift_8_table') },
    { name: 'm68ki_shift_16_table', bits: 16, values: shiftTable('m68ki_shift_16_table') },
    { name: 'm68ki_shift_32_table', bits: 32, values: shiftTable('m68ki_shift_32_table') },
    ...[
      'm_ppc', 'm_pc', 'm_ir', 'm_t1_flag', 'm_t0_flag', 'm_s_flag', 'm_m_flag',
      'm_x_flag', 'm_n_flag', 'm_not_z_flag', 'm_v_flag', 'm_c_flag', 'm_int_mask',
      'm_int_level', 'm_virq_state', 'm_stopped', 'm_ref',
      'm_instr_mode', 'm_run_mode', 'm_hold_irq',
    ].map(name => ({ name, bits: 32 as const })),
    { name: 'cycles' },
    { name: 'm_icount' },
  ];
  const programs = [
    start, reset, input, service, fetch,
    ...methods.map(method => method.program),
    ...opcodes.map(opcode => opcode.program),
  ];
  return {
    schemaVersion: 1,
    type: 'M68000',
    addressMask: 0xffffff,
    dialect: 'mame-musashi-generated-handler-table',
    fixedInstructionCycles: true,
    sourceFiles: [operationsFile, headerFile, dataFile],
    constants,
    aliases: {},
    members,
    methods,
    start,
    reset,
    input,
    service,
    fetch,
    opcodes,
    summary: {
      opcodes: opcodes.length,
      compiledOpcodes: opcodes.filter(opcode => !opcode.program.diagnostics.length).length,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

/**
 * The per-variant cycle adjustments `m_icount -= m_cyc_*` subtracts.
 *
 * These are variant facts rather than opcode facts, so MAME keeps them in
 * `init_cpu_m68000()` instead of the opcode cycle table the decode rows carry.
 * The generated bodies reference them by name, and an identifier the codegen
 * cannot resolve emits 0 -- which charged every untaken Bcc its taken price and
 * ran a 68000 board measurably slow.  A member the initializer leaves alone
 * (`m_cyc_movem_store_*` on a plain 68000) is declared 0 here rather than left
 * unresolved, because MAME's own `x ? x : fallback` reads it as zero.
 */
function m68000CycleConstants(
  dataFile: string,
  dataSource: string,
  operations: string,
): Record<string, number> {
  const body = /::init_cpu_m68000\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(dataSource)?.[1];
  if (!body) {
    throw new Error(`MAME M68000 source is missing init_cpu_m68000 in ${dataFile}`);
  }
  const constants: Record<string, number> = {};
  for (const [name] of operations.matchAll(/\bm_cyc_\w+/g)) {
    constants[name!] = 0;
  }
  let assigned = 0;
  for (const [, name, value] of body.matchAll(/\b(m_cyc_\w+)\s*=\s*(-?\d+)\s*;/g)) {
    constants[name!] = Number(value);
    assigned++;
  }
  if (assigned === 0) {
    throw new Error(`MAME init_cpu_m68000 declares no m_cyc_* cycle counts in ${dataFile}`);
  }
  return constants;
}

function normalizeM68000Source(body: string): string {
  // JavaScript numbers exactly represent the 33-bit intermediates used by
  // ROXL/ROXR; keeping these locals unwrapped preserves that extra carry bit.
  let source = body.replace(/\bu64\b/g, 'int');
  const pointers = new Map<string, string>();
  source = source.replace(
    /\b(?:u32|uint32_t)\s*\*\s*(\w+)\s*=\s*&\s*([^;]+);/g,
    (_match, name: string, target: string) => {
      pointers.set(name, target.trim());
      return '';
    },
  );
  for (const [name, target] of pointers) {
    source = source.replace(new RegExp(`\\*\\s*${name}\\b`, 'g'), `(${target})`);
  }
  return normalizeMameExecutionSource(source)
    // A generated opcode body charges its own variable cost against m_icount --
    // MOVEM per register, an untaken Bcc, DBcc's two outcomes, Scc true. The
    // emitted core returns a per-step cycle count instead of decrementing a
    // budget, so those adjustments have to land in `cycles` the way every other
    // lowered CPU core already routes them, or they are silently discarded.
    .replace(/\bm_icount\s*-=\s*([^;]+);/g, 'cycles += $1;')
    .replace(/\bDX\(\)/g, 'm_dar[(m_ir >> 9) & 7]')
    .replace(/\bDY\(\)/g, 'm_dar[m_ir & 7]')
    .replace(/\bAX\(\)/g, 'm_dar[8 + ((m_ir >> 9) & 7)]')
    .replace(/\bAY\(\)/g, 'm_dar[8 + (m_ir & 7)]')
    .replace(/\bREG_D\(\)/g, 'm_dar')
    .replace(/\bREG_DA\(\)/g, 'm_dar')
    .replace(/\bREG_A\(\)\s*\[([^\]]+)\]/g, 'm_dar[8 + ($1)]')
    .replace(/\bREG_USP\(\)/g, 'm_sp[0]')
    .replace(/\bREG_ISP\(\)/g, 'm_sp[4]')
    .replace(/\bREG_MSP\(\)/g, 'm_sp[6]')
    .replace(/\bREG_SP\(\)/g, 'm_dar[15]')
    .replace(/\bm68ki_trace_t0\(\)\s*;/g, '')
    .replace(/\bm68ki_trace_t1\(\)\s*;/g, '')
    .replace(/\bm68ki_shift_cycles\([^)]*\)/g, '0');
}

function m68000SupportMethods(sourceFile: string): GeneratedCpuMethod[] {
  const source = (name: string, parameters: string, body: string): GeneratedCpuMethod => ({
    name,
    parameters,
    program: compileMameHandler(normalizeM68000Source(body)),
    source: sourceRef(sourceFile, 1),
  });
  const methods: GeneratedCpuMethod[] = [
    source('m68ki_read_8', 'u32 address', 'return READ(address);'),
    source('m68ki_read_16', 'u32 address', 'return READ16BE(address);'),
    source('m68ki_read_32', 'u32 address', 'return READ32BE(address);'),
    source('m68ki_write_8', 'u32 address, u32 value', 'WRITE(address, value);'),
    source('m68ki_write_16', 'u32 address, u32 value', 'WRITE16BE(address, value);'),
    source('m68ki_write_32', 'u32 address, u32 value', 'WRITE32BE(address, value);'),
    source('m68ki_write_32_pd', 'u32 address, u32 value', 'WRITE32BE(address, value);'),
    source('m68ki_read_imm_8', '', 'return m68ki_read_imm_16() & 0xff;'),
    source('m68ki_read_imm_16', '', 'u32 value = m68ki_read_16(m_pc); m_pc += 2; return value;'),
    source('m68ki_read_imm_32', '', 'u32 value = m68ki_read_32(m_pc); m_pc += 4; return value;'),
    source('OPER_I_8', '', 'return m68ki_read_imm_8();'),
    source('OPER_I_16', '', 'return m68ki_read_imm_16();'),
    source('OPER_I_32', '', 'return m68ki_read_imm_32();'),
    source('MAKE_INT_8', 'u32 value', 'return s8(value);'),
    source('MAKE_INT_16', 'u32 value', 'return s16(value);'),
    source('MAKE_INT_32', 'u32 value', 'return s32(value);'),
    source('MASK_OUT_ABOVE_8', 'u32 value', 'return value & 0xff;'),
    source('MASK_OUT_ABOVE_16', 'u32 value', 'return value & 0xffff;'),
    source('MASK_OUT_ABOVE_32', 'u32 value', 'return u32(value);'),
    source('MASK_OUT_BELOW_8', 'u32 value', 'return value & ~0xff;'),
    source('MASK_OUT_BELOW_16', 'u32 value', 'return value & ~0xffff;'),
    source('GET_MSB_8', 'u32 value', 'return value & 0x80;'),
    source('GET_MSB_16', 'u32 value', 'return value & 0x8000;'),
    source('GET_MSB_32', 'u32 value', 'return value & 0x80000000;'),
    source('CFLAG_8', 'u32 value', 'return value;'),
    source('CFLAG_16', 'u32 value', 'return value >> 8;'),
    source('CFLAG_ADD_32', 'u32 s, u32 d, u32 r', 'return ((s & d) | (~r & (s | d))) >> 23;'),
    source('CFLAG_SUB_32', 'u32 s, u32 d, u32 r', 'return ((s & r) | (~d & (s | r))) >> 23;'),
  ];
  for (const bits of [8, 16, 32]) {
    const shift = bits === 8 ? 0 : bits === 16 ? 8 : 24;
    methods.push(
      source(`NFLAG_${bits}`, 'u32 value', `return value >> ${shift};`),
      source(`ZFLAG_${bits}`, 'u32 value', bits === 32 ? 'return u32(value);' : `return value & ${bits === 8 ? '0xff' : '0xffff'};`),
      source(`VFLAG_ADD_${bits}`, 'u32 s, u32 d, u32 r', `return ((s ^ r) & (d ^ r)) >> ${shift};`),
      source(`VFLAG_SUB_${bits}`, 'u32 s, u32 d, u32 r', `return ((s ^ d) & (r ^ d)) >> ${shift};`),
    );
  }
  for (const [name, body] of Object.entries({
    XFLAG_1: 'return (m_x_flag >> 8) & 1;',
    NFLAG_1: 'return (m_n_flag >> 7) & 1;',
    VFLAG_1: 'return (m_v_flag >> 7) & 1;',
    ZFLAG_1: 'return !m_not_z_flag;',
    CFLAG_1: 'return (m_c_flag >> 8) & 1;',
    COND_CS: 'return m_c_flag & 0x100;',
    COND_CC: 'return !(m_c_flag & 0x100);',
    COND_VS: 'return m_v_flag & 0x80;',
    COND_VC: 'return !(m_v_flag & 0x80);',
    COND_NE: 'return m_not_z_flag;',
    COND_EQ: 'return !m_not_z_flag;',
    COND_MI: 'return m_n_flag & 0x80;',
    COND_PL: 'return !(m_n_flag & 0x80);',
    COND_LT: 'return (m_n_flag ^ m_v_flag) & 0x80;',
    COND_GE: 'return !((m_n_flag ^ m_v_flag) & 0x80);',
    COND_HI: 'return !(m_c_flag & 0x100) && m_not_z_flag;',
    COND_LS: 'return (m_c_flag & 0x100) || !m_not_z_flag;',
    COND_GT: 'return !((m_n_flag ^ m_v_flag) & 0x80) && m_not_z_flag;',
    COND_LE: 'return ((m_n_flag ^ m_v_flag) & 0x80) || !m_not_z_flag;',
    COND_XS: 'return m_x_flag & 0x100;',
    COND_XC: 'return !(m_x_flag & 0x100);',
  })) methods.push(source(name, '', body));

  for (const [name, target] of Object.entries({
    COND_NOT_CS: 'COND_CC', COND_NOT_CC: 'COND_CS',
    COND_NOT_VS: 'COND_VC', COND_NOT_VC: 'COND_VS',
    COND_NOT_NE: 'COND_EQ', COND_NOT_EQ: 'COND_NE',
    COND_NOT_MI: 'COND_PL', COND_NOT_PL: 'COND_MI',
    COND_NOT_LT: 'COND_GE', COND_NOT_GE: 'COND_LT',
    COND_NOT_HI: 'COND_LS', COND_NOT_LS: 'COND_HI',
    COND_NOT_GT: 'COND_LE', COND_NOT_LE: 'COND_GT',
  })) methods.push(source(name, '', `return ${target}();`));

  methods.push(
    source('LOW_NIBBLE', 'u32 value', 'return value & 0x0f;'),
    source('HIGH_NIBBLE', 'u32 value', 'return value & 0xf0;'),
  );
  for (const bits of [8, 9, 16, 17, 32]) {
    const mask = bits === 32 ? '0xffffffff' : `0x${((2 ** bits) - 1).toString(16)}`;
    methods.push(
      source(
        `ROL_${bits}`,
        'u32 value, u32 count',
        `count = count % ${bits}; return !count ? value & ${mask} : ` +
          `((value << count) | (value >> (${bits} - count))) & ${mask};`,
      ),
      source(
        `ROR_${bits}`,
        'u32 value, u32 count',
        `count = count % ${bits}; return !count ? value & ${mask} : ` +
          `((value >> count) | (value << (${bits} - count))) & ${mask};`,
      ),
    );
  }
  // JavaScript numbers exactly preserve the 33-bit intermediates used here.
  methods.push(
    source('POW2', 'u32 count', 'int value = 1; while (count) { value *= 2; count--; } return value;'),
    source(
      'ROL_33_64',
      'int value, u32 count',
      'count = count % 33; if (!count) return value; return (value * POW2(count)) % 8589934592 + value / POW2(33 - count);',
    ),
    source(
      'ROR_33_64',
      'int value, u32 count',
      'count = count % 33; if (!count) return value; return value / POW2(count) + (value % POW2(count)) * POW2(33 - count);',
    ),
  );

  const addressRegister = (axis: 'X' | 'Y') => axis === 'X'
    ? 'm_dar[8 + ((m_ir >> 9) & 7)]'
    : 'm_dar[8 + (m_ir & 7)]';
  for (const axis of ['X', 'Y'] as const) {
    const register = addressRegister(axis);
    methods.push(
      source(`EA_A${axis}_AI_8`, '', `return ${register};`),
      source(`EA_A${axis}_AI_16`, '', `return ${register};`),
      source(`EA_A${axis}_AI_32`, '', `return ${register};`),
      source(`EA_A${axis}_PI_8`, '', `u32 ea = ${register}; ${register} += 1; return ea;`),
      source(`EA_A${axis}_PI_16`, '', `u32 ea = ${register}; ${register} += 2; return ea;`),
      source(`EA_A${axis}_PI_32`, '', `u32 ea = ${register}; ${register} += 4; return ea;`),
      source(`EA_A${axis}_PD_8`, '', `${register} -= 1; return ${register};`),
      source(`EA_A${axis}_PD_16`, '', `${register} -= 2; return ${register};`),
      source(`EA_A${axis}_PD_32`, '', `${register} -= 4; return ${register};`),
      source(`EA_A${axis}_DI_8`, '', `return ${register} + MAKE_INT_16(m68ki_read_imm_16());`),
      source(`EA_A${axis}_DI_16`, '', `return EA_A${axis}_DI_8();`),
      source(`EA_A${axis}_DI_32`, '', `return EA_A${axis}_DI_8();`),
      source(`EA_A${axis}_IX_8`, '', `return m68ki_get_ea_ix(${register});`),
      source(`EA_A${axis}_IX_16`, '', `return EA_A${axis}_IX_8();`),
      source(`EA_A${axis}_IX_32`, '', `return EA_A${axis}_IX_8();`),
    );
  }
  methods.push(
    source('EA_A7_PI_8', '', 'u32 ea = m_dar[15]; m_dar[15] += 2; return ea;'),
    source('EA_A7_PD_8', '', 'm_dar[15] -= 2; return m_dar[15];'),
    source('EA_AW_8', '', 'return MAKE_INT_16(m68ki_read_imm_16());'),
    source('EA_AW_16', '', 'return EA_AW_8();'),
    source('EA_AW_32', '', 'return EA_AW_8();'),
    source('EA_AL_8', '', 'return m68ki_read_imm_32();'),
    source('EA_AL_16', '', 'return EA_AL_8();'),
    source('EA_AL_32', '', 'return EA_AL_8();'),
    source('m68ki_get_ea_pcdi', '', 'u32 old_pc = m_pc; return old_pc + MAKE_INT_16(m68ki_read_imm_16());'),
    source('m68ki_get_ea_pcix', '', 'return m68ki_get_ea_ix(m_pc);'),
    source('m68ki_get_ea_ix', 'u32 base', `
      u32 extension = m68ki_read_imm_16();
      u32 index = m_dar[(extension >> 12) & 15];
      if (!(extension & 0x0800)) index = MAKE_INT_16(index);
      return base + index + MAKE_INT_8(extension);
    `),
    source('EA_PCDI_8', '', 'return m68ki_get_ea_pcdi();'),
    source('EA_PCDI_16', '', 'return EA_PCDI_8();'),
    source('EA_PCDI_32', '', 'return EA_PCDI_8();'),
    source('EA_PCIX_8', '', 'return m68ki_get_ea_pcix();'),
    source('EA_PCIX_16', '', 'return EA_PCIX_8();'),
    source('EA_PCIX_32', '', 'return EA_PCIX_8();'),
  );

  const operands: [string, string, number][] = [];
  for (const axis of ['Y', 'X']) {
    for (const mode of ['AI', 'PI', 'PD', 'DI', 'IX']) {
      for (const bits of [8, 16, 32]) operands.push([`A${axis}_${mode}`, `EA_A${axis}_${mode}_${bits}`, bits]);
    }
  }
  operands.push(['A7_PI', 'EA_A7_PI_8', 8], ['A7_PD', 'EA_A7_PD_8', 8]);
  for (const mode of ['AW', 'AL']) {
    for (const bits of [8, 16, 32]) operands.push([mode, `EA_${mode}_${bits}`, bits]);
  }
  for (const mode of ['PCDI', 'PCIX']) {
    for (const bits of [8, 16, 32]) operands.push([mode, `EA_${mode}_${bits}`, bits]);
  }
  for (const [name, ea, bits] of operands) {
    const read = name.startsWith('PC') ? `m68ki_read_pcrel_${bits}` : `m68ki_read_${bits}`;
    methods.push(source(`OPER_${name}_${bits}`, '', `u32 ea = ${ea}(); return ${read}(ea);`));
  }
  methods.push(
    source('m68ki_read_pcrel_8', 'u32 address', 'return m68ki_read_8(address);'),
    source('m68ki_read_pcrel_16', 'u32 address', 'return m68ki_read_16(address);'),
    source('m68ki_read_pcrel_32', 'u32 address', 'return m68ki_read_32(address);'),
  );

  methods.push(
    source('m68ki_push_32', 'u32 value', 'm_dar[15] -= 4; m68ki_write_32(m_dar[15], value);'),
    source('m68ki_pull_16', '', 'u32 value = m68ki_read_16(m_dar[15]); m_dar[15] += 2; return value;'),
    source('m68ki_pull_32', '', 'u32 value = m68ki_read_32(m_dar[15]); m_dar[15] += 4; return value;'),
    source('m68ki_jump', 'u32 address', 'm_pc = address;'),
    source('m68ki_branch_8', 'u32 offset', 'm_pc += MAKE_INT_8(offset);'),
    source('m68ki_branch_16', 'u32 offset', 'm_pc += MAKE_INT_16(offset);'),
    source('m68ki_get_ccr', '', `
      return ((m_x_flag >> 4) & 0x10) | ((m_n_flag >> 4) & 8) |
        ((!m_not_z_flag) << 2) | ((m_v_flag >> 6) & 2) | ((m_c_flag >> 8) & 1);
    `),
    source('m68ki_get_sr', '', `
      return m_t1_flag | m_t0_flag | (m_s_flag << 11) | (m_m_flag << 11) |
        m_int_mask | m68ki_get_ccr();
    `),
    source('m68ki_set_ccr', 'u32 value', `
      m_x_flag = (value & 0x10) << 4;
      m_n_flag = (value & 0x08) << 4;
      m_not_z_flag = !(value & 0x04);
      m_v_flag = (value & 0x02) << 6;
      m_c_flag = (value & 0x01) << 8;
    `),
    source('m68ki_set_s_flag', 'u32 value', `
      u32 old_index = m_s_flag | ((m_s_flag >> 1) & m_m_flag);
      m_sp[old_index] = m_dar[15];
      m_s_flag = value;
      u32 new_index = m_s_flag | ((m_s_flag >> 1) & m_m_flag);
      m_dar[15] = m_sp[new_index];
    `),
    source('m68ki_set_sr', 'u32 value', `
      value &= 0xa71f;
      m_t1_flag = value & 0x8000;
      m_t0_flag = 0;
      m_int_mask = value & 0x0700;
      m68ki_set_ccr(value);
      m68ki_set_s_flag((value >> 11) & 4);
    `),
  );

  methods.push(
    source('m68ki_exception_common', 'u32 vector, u32 stacked_pc', `
      u32 sr = m68ki_get_sr();
      m_t1_flag = 0;
      m_t0_flag = 0;
      m68ki_set_s_flag(SFLAG_SET);
      m68ki_push_32(stacked_pc);
      m_dar[15] -= 2;
      m68ki_write_16(m_dar[15], sr);
      m_pc = m68ki_read_32(vector << 2);
      m_stopped &= ~STOP_LEVEL_STOP;
      cycles += 30;
    `),
    source('m68ki_exception_trap', 'u32 vector', 'm68ki_exception_common(vector, m_pc);'),
    source('m68ki_exception_trapN', 'u32 vector', 'm68ki_exception_common(vector, m_pc);'),
    source('m68ki_exception_privilege_violation', '', 'm68ki_exception_common(EXCEPTION_PRIVILEGE_VIOLATION, m_ppc);'),
    source('m68ki_exception_1010', '', 'm68ki_exception_common(EXCEPTION_1010, m_ppc);'),
    source('m68ki_exception_1111', '', 'm68ki_exception_common(EXCEPTION_1111, m_ppc);'),
    source('m68ki_exception_illegal', '', 'm68ki_exception_common(EXCEPTION_ILLEGAL_INSTRUCTION, m_ppc);'),
    source('m68ki_service_interrupt', 'u32 level', `
      u32 vector = standard_irq_callback(level, m_pc);
      if (vector == 0xff) vector = 24 + level;
      m68ki_exception_common(vector, m_pc);
      m_int_mask = level << 8;
      if (m_hold_irq & (1 << level)) {
        m_hold_irq &= ~(1 << level);
        m_virq_state &= ~(1 << level);
        m_int_level = 0;
        if (m_interrupt_mixer) {
          for (int next = 1; next <= 7; next++)
            if (m_virq_state & (1 << next)) m_int_level = next << 8;
        } else {
          m_int_level = m_virq_state << 8;
        }
      }
      cycles += 14;
    `),
    source('m_reset_cb', 'u32 state', 'return 0;'),
  );
  return methods;
}

/** Compile the pin-compatible NSC8105 with its MAME opcode permutation. */
export function compileMameNsc8105(mameSrc: string): GeneratedCpuDefinition {
  return compileMameM6800Family(mameSrc, {
    type: 'NSC8105',
    dispatch: 'nsc8105_insn',
    cycles: 'cycles_nsc8105',
    tableFile: 'src/devices/cpu/m6800/m6800.cpp',
    tableClass: 'm6800_cpu_device',
    internal: 'm6802',
  });
}

function compileMameM6800Family(
  mameSrc: string,
  variantConfig: {
    type: 'M6802' | 'M6803' | 'HD63701Y0' | 'NSC8105';
    dispatch: string;
    cycles: string;
    tableFile: string;
    tableClass: string;
    internal: 'm6802' | 'm6803' | 'hd63701y0';
  },
): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/m6800/m6800.cpp';
  const headerFile = 'src/devices/cpu/m6800/m6800.h';
  const variantFile = variantConfig.tableFile;
  const variantHeaderFile = variantConfig.internal !== 'm6802'
    ? 'src/devices/cpu/m6800/m6801.h'
    : headerFile;
  const operationsFile = 'src/devices/cpu/m6800/6800ops.hxx';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const variant = readFileSync(join(mameSrc, variantFile), 'utf8');
  const operations = readFileSync(join(mameSrc, operationsFile), 'utf8');
  const macroSource = cpp.slice(0, cpp.indexOf('#include "6800ops.hxx"'));
  const macros = parseMameOperationMacros(macroSource);
  const normalize = (body: string): string => normalizeMameExecutionSource(
    normalizePairLocals(expandMameOperationMacros(body, macros), false)
      .replace(/\bWM16\(\s*([^,]+),\s*&\s*(m_\w+)\s*\)/g, 'WM16($1, $2.w)')
      .replace(/\benter_interrupt\(\s*"[^"]*"/g, 'enter_interrupt(0'),
  );

  const operationAst = parseMameAst([{
    file: operationsFile,
    source: operations.replace(
      /OP_HANDLER\s*\(\s*(\w+)\s*\)/g,
      'void m6800_cpu_device::$1()',
    ),
  }]);
  const opcodeMethods = operationAst.units[0]!.functions.map(fn => ({
    name: fn.name,
    parameters: fn.parameters,
    // M6800 CLI executes one complete following instruction before sampling
    // an already-asserted IRQ.  The source expresses that as recursive
    // execute_one(), which cannot be left as the generated helper stub.
    program: compileMameHandler(fn.name === 'cli'
      ? 'm_irq_delay = (m_cc & 0x10) ? 1 : 0; m_cc &= ~0x10;'
      : normalize(fn.body)),
    source: sourceRef(operationsFile, fn.span.line),
  }));

  const baseAst = parseMameAst([{ file: cppFile, source: cpp }]);
  const baseFunctions = baseAst.units[0]!.functions;
  const base = (name: string) => baseFunctions.find(fn =>
    fn.className === 'm6800_cpu_device' && fn.name === name);
  const required = [
    'RM16',
    'WM16',
    'enter_interrupt',
    'check_irq_lines',
    'check_irq1_enabled',
    'device_reset',
    'execute_set_input',
  ];
  const missing = required.filter(name => !base(name));
  if (missing.length) {
    throw new Error(`MAME M6803 source is missing ${missing.join(', ')}`);
  }
  const helperNames = [
    'RM16',
    'WM16',
    'enter_interrupt',
    'check_irq_lines',
    'check_irq1_enabled',
  ];
  const methods = [
    ...opcodeMethods,
    ...helperNames.map(name => {
      const fn = base(name)!;
      return {
        name,
        parameters: name === 'WM16' ? 'u32 Addr, u16 p' : fn.parameters,
        program: compileMameHandler(
          name === 'WM16'
            ? normalize(fn.body)
                .replace(/\bp\.b\.h\b/g, 'u8(p >> 8)')
                .replace(/\bp\.b\.l\b/g, 'u8(p)')
            : normalize(fn.body),
        ),
        source: sourceRef(cppFile, fn.span.line),
      };
    }),
    {
      name: 'increment_counter',
      parameters: 'int amount',
      program: compileMameHandler('cycles += amount;'),
      source: sourceRef(cppFile, base('enter_interrupt')!.span.line),
    },
    {
      name: 'check_irq2',
      parameters: '',
      program: compileMameHandler(''),
      source: sourceRef(headerFile, lineAt(header, header.indexOf('check_irq2()'))),
    },
    {
      name: 'execute_one',
      parameters: '',
      program: compileMameHandler(''),
      source: sourceRef(cppFile, base('check_irq_lines')!.span.line),
    },
    {
      name: 'eat_cycles',
      parameters: '',
      program: compileMameHandler('cycles += 1;'),
      source: sourceRef(cppFile, base('check_irq_lines')!.span.line),
    },
    {
      name: 'take_trap',
      parameters: '',
      program: compileMameHandler(''),
      source: sourceRef(headerFile, lineAt(header, header.indexOf('take_trap()'))),
    },
  ];

  const cycles = extractMameByteArray(variant, variantConfig.cycles, { XX: 4 });
  const dispatch = extractM6800Dispatch(
    variant,
    variantConfig.dispatch,
    variantConfig.tableClass,
  );
  const opcodes = dispatch.map((method, opcode) => ({
    key: `${opcode.toString(16).padStart(2, '0')}00`,
    dispatch: false,
    program: compileMameHandler(`${method}(); cycles += ${cycles[opcode]};`),
    source: sourceRef(
      variantFile,
      lineAt(variant, variant.indexOf(variantConfig.dispatch)),
    ),
  }));
  const resetMethod = base('device_reset')!;
  const inputMethod = base('execute_set_input')!;
  const start = compileMameHandler('');
  const reset = compileMameHandler(normalize(resetMethod.body));
  const input = compileMameHandler(
    normalize(inputMethod.body).replace(/\birqline\b/g, 'inputnum'),
  );
  const service = compileMameHandler(`
    if (m_irq_delay) m_irq_delay = 0;
    else check_irq_lines();
    if (cycles > 0) return;
    if (m_wai_state & (M6800_WAI | M6800_SLP)) {
      cycles += 1;
      return;
    }
  `);
  const fetch = compileMameHandler(`
    m_ref = m_copcodes.read_byte(m_pc.w) << 16;
    m_pc.w++;
  `);
  const constants = {
    M6800_IRQ_LINE: 0,
    M6802_IRQ_LINE: 0,
    M6800_WAI: 8,
    M6800_SLP: 0x10,
    INPUT_LINE_IRQ0: 0,
    INPUT_LINE_NMI: -1,
    CLEAR_LINE: 0,
    ASSERT_LINE: 1,
  };
  const members: GeneratedCpuMember[] = [
    ...['m_ppc', 'm_pc', 'm_s', 'm_x', 'm_d', 'm_ea']
      .map(name => ({ name, bits: 16 as const, pair: true })),
    ...['m_cc', 'm_wai_state', 'm_nmi_state', 'm_nmi_pending', 'm_irq_delay']
      .map(name => ({ name, bits: 8 as const })),
    { name: 'm_irq_state', bits: 8, values: [0, 0, 0, 0, 0] },
    { name: 'flags8i', bits: 8, values: extractMameByteArray(cpp, 'flags8i') },
    { name: 'flags8d', bits: 8, values: extractMameByteArray(cpp, 'flags8d') },
    { name: 'm_ref', bits: 32 },
    { name: 'cycles' },
    { name: 'm_icount' },
  ];
  const internal = variantConfig.internal === 'hd63701y0'
    ? compileHd63701Y0InternalPlan(variant)
    : variantConfig.internal === 'm6803'
      ? compileM6803InternalPlan(variant)
      : compileM6802InternalPlan(cpp);
  const programs = [
    start,
    reset,
    input,
    service,
    fetch,
    ...methods.map(method => method.program),
    ...opcodes.map(opcode => opcode.program),
  ];
  return {
    schemaVersion: 1,
    type: variantConfig.type,
    dialect: 'mame-cpp-op-handler',
    sourceFiles: [cppFile, headerFile, variantFile, variantHeaderFile, operationsFile],
    constants,
    aliases: {},
    members,
    methods,
    start,
    reset,
    input,
    service,
    fetch,
    opcodes,
    internal,
    summary: {
      opcodes: opcodes.length,
      compiledOpcodes: opcodes.filter(opcode => !opcode.program.diagnostics.length).length,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

/**
 * Compile the MC6801U4 with the same MAME 6803 instruction table and the
 * U4-specific internal RAM/port map selected by its constructor.
 */
export function compileMameM6801U4(mameSrc: string): GeneratedCpuDefinition {
  const definition = compileMameM6803(mameSrc);
  const variantFile = 'src/devices/cpu/m6800/m6801.cpp';
  const variant = readFileSync(join(mameSrc, variantFile), 'utf8');
  return {
    ...definition,
    type: 'M6801U4',
    dialect: 'mame-m6801u4-cpp-op-handler',
    internal: compileM6801U4InternalPlan(variant),
  };
}

/**
 * Compile MAME's standard 6809 microcode DSL into an executable CPU definition.
 *
 * `m6809.lst` plus `base6x09.lst` are the whole instruction set, and
 * `m6809_base_device` carries the shared state machine, so every 6809 variant
 * lowers from the same source. A variant is described only by its MAME device
 * type and, where the device installs its own `memory_interface`, an opcode
 * fetch transform. KONAMI-1 supplies one; a plain MC6809 does not.
 */
function compileM6809Core(
  mameSrc: string,
  variant: {
    type: string;
    deviceSourceFiles?: string[];
    opcodeDecrypt?: GeneratedCpuDefinition['opcodeDecrypt'];
    dslFile?: string;
    singleByteDispatch?: boolean;
    methodClass?: string;
  },
): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/m6809/m6809.cpp';
  const headerFile = 'src/devices/cpu/m6809/m6809.h';
  const inlineFile = 'src/devices/cpu/m6809/m6809inl.h';
  const dslFile = variant.dslFile ?? 'src/devices/cpu/m6809/m6809.lst';
  const baseDslFile = 'src/devices/cpu/m6809/base6x09.lst';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const inline = readFileSync(join(mameSrc, inlineFile), 'utf8');
  const rawDslSource = readFileSync(join(mameSrc, dslFile), 'utf8');
  const baseDsl = readFileSync(join(mameSrc, baseDslFile), 'utf8');
  const dslSource = variant.singleByteDispatch
    ? rawDslSource.replace(/^MAIN:\s*$/m, 'DISPATCH01:') + `
DISPATCH10:
  switch(m_opcode) { default: %ILLEGAL; return; }
DISPATCH11:
  switch(m_opcode) { default: %ILLEGAL; return; }
`
    : rawDslSource;
  const dsl = parseM6809Dsl(dslSource, baseDsl);
  const baseUnit = parseMameSource(cppFile, cpp);
  const inlineUnit = parseMameSource(inlineFile, inline);
  const base = (name: string, parameters?: string) => [
    ...baseUnit.functions,
    ...inlineUnit.functions,
  ].find(fn =>
    fn.className === 'm6809_base_device' &&
    fn.name === name &&
    (parameters === undefined || fn.parameters === parameters));

  const methods: GeneratedCpuMethod[] = [];
  const addMethod = (
    name: string,
    parameters: string,
    sourceBody: string,
    sourceFile: string,
    sourceLine: number,
  ): void => {
    methods.push({
      name,
      parameters,
      program: compileMameHandler(normalizeM6809Source(sourceBody)),
      source: sourceRef(sourceFile, sourceLine),
    });
  };

  for (const [name, parameters] of [
    ['read_tfr_exg_816_register', 'uint8_t reg'],
    ['read_exg_168_register', 'uint8_t reg'],
    ['write_exgtfr_register', 'uint8_t reg, uint16_t value'],
  ] as const) {
    const fn = base(name);
    if (!fn) throw new Error(`MAME M6809 source is missing ${name}`);
    addMethod(name, parameters, fn.body, cppFile, fn.span.line);
  }
  for (const [sourceName, parameters, generatedName] of [
    ['read_operand', '', 'read_operand0'],
    ['read_operand', 'int ordinal', 'read_operand1'],
    ['write_operand', 'uint8_t data', 'write_operand0'],
    ['write_operand', 'int ordinal, uint8_t data', 'write_operand1'],
    ['daa', '', 'daa'],
    ['mul', '', 'mul'],
  ] as const) {
    const fn = base(sourceName, parameters);
    if (!fn) throw new Error(`MAME M6809 source is missing ${sourceName}(${parameters})`);
    addMethod(generatedName, parameters, fn.body, inlineFile, fn.span.line);
  }
  for (const name of [
    'reset_state',
    'write_ea',
    'set_ea',
    'set_ea_h',
    'set_ea_l',
    'nop',
    'set_a',
    'set_b',
    'set_d',
    'set_imm',
    'add8_sets_h',
    'hd6309_native_mode',
    'cond_hi',
    'cond_cc',
    'cond_ne',
    'cond_vc',
    'cond_pl',
    'cond_ge',
    'cond_gt',
    'set_cond',
    'branch_taken',
    'firq_saves_entire_state',
    'partial_state_registers',
    'entire_state_registers',
    'is_ea_addressing_mode',
  ]) {
    const method = inlineMethodForClass(header, name, 'm6809_base_device');
    if (!method) throw new Error(`MAME M6809 header is missing ${name}`);
    addMethod(name, method.parameters, method.body, headerFile, lineAt(header, method.start));
  }
  for (const name of [
    'eat_remaining',
    'is_register_addressing_mode',
    'get_pending_interrupt',
  ]) {
    const fn = base(name);
    if (!fn) throw new Error(`MAME M6809 source is missing ${name}`);
    addMethod(name, fn.parameters, fn.body, inlineFile, fn.span.line);
  }

  const setFlags = inlineUnit.functions.filter(fn =>
    fn.className === 'm6809_base_device' && fn.name === 'set_flags');
  const fullFlags = setFlags.find(fn => fn.parameters.includes('T a'));
  const resultFlags = setFlags.find(fn => fn.parameters === 'uint8_t mask, T r');
  if (!fullFlags || !resultFlags) throw new Error('MAME M6809 flag helpers are missing');
  for (const [bits, type] of [[8, 'uint8_t'], [16, 'uint16_t']] as const) {
    const specialize = (body: string): string => body
      .replace(/\bT\b/g, type)
      .replace(new RegExp(`sizeof\\(${type}\\)`, 'g'), String(bits / 8));
    addMethod(
      `set_flags${bits}`,
      `uint8_t mask, ${type} a, ${type} b, uint32_t r`,
      specialize(fullFlags.body),
      inlineFile,
      fullFlags.span.line,
    );
    addMethod(
      `set_flags${bits}r`,
      `uint8_t mask, ${type} r`,
      specialize(resultFlags.body)
        .replace(/\bset_flags\s*\(/g, `set_flags${bits}(`),
      inlineFile,
      resultFlags.span.line,
    );
  }

  const rotateFunctions = inlineUnit.functions.filter(fn =>
    fn.className === 'm6809_base_device' &&
    (fn.name === 'rotate_left' || fn.name === 'rotate_right'));
  for (const fn of rotateFunctions) {
    for (const [bits, type] of [[8, 'uint8_t'], [16, 'uint16_t']] as const) {
      addMethod(
        `${fn.name}${bits}`,
        `${type} value`,
        fn.body
          .replace(/\bT\b/g, type)
          .replace(new RegExp(`sizeof\\(${type}\\)`, 'g'), String(bits / 8)),
        inlineFile,
        fn.span.line,
      );
    }
  }

  addMethod('ireg', '', `
    switch (m_opcode & 0x60) {
      case 0x00: return m_x.w;
      case 0x20: return m_y.w;
      case 0x40: return m_u.w;
      case 0x60: return m_s.w;
    }
    return 0;
  `, inlineFile, lineAt(inline, inline.indexOf('m6809_base_device::ireg')));
  addMethod('set_ireg', 'uint16_t value', `
    switch (m_opcode & 0x60) {
      case 0x00: m_x.w = value; break;
      case 0x20: m_y.w = value; break;
      case 0x40: m_u.w = value; break;
      case 0x60: m_s.w = value; break;
    }
  `, inlineFile, lineAt(inline, inline.indexOf('m6809_base_device::ireg')));

  let variantConstants: Record<string, number> = {};
  if (variant.methodClass) {
    const methodFile = variant.deviceSourceFiles?.find(file => file.endsWith('.cpp'));
    const methodHeaderFile = variant.deviceSourceFiles?.find(file => file.endsWith('.h'));
    if (!methodFile || !methodHeaderFile) {
      throw new Error(`${variant.type} CPU method sources are missing`);
    }
    const methodSource = readFileSync(join(mameSrc, methodFile), 'utf8');
    const methodHeader = readFileSync(join(mameSrc, methodHeaderFile), 'utf8');
    const methodUnit = parseMameSource(methodFile, methodSource);
    const custom = (name: string, parameters?: string) => methodUnit.functions.find(fn =>
      fn.className === variant.methodClass && fn.name === name &&
      (parameters === undefined || fn.parameters === parameters));
    const upsert = (name: string, parameters: string, body: string, line: number): void => {
      const index = methods.findIndex(method => method.name === name);
      const method = {
        name,
        parameters,
        program: compileMameHandler(normalizeM6809Source(body)),
        source: sourceRef(methodFile, line),
      };
      if (index >= 0) methods[index] = method;
      else methods.push(method);
    };
    for (const [sourceName, parameters, generatedName] of [
      ['read_operand', 'int ordinal', 'read_operand1'],
      ['write_operand', 'int ordinal, uint8_t data', 'write_operand1'],
      ['read_exgtfr_register', 'uint8_t reg', 'read_exgtfr_register'],
      ['write_exgtfr_register', 'uint8_t reg, uint16_t value', 'write_exgtfr_register'],
      ['lmul', '', 'lmul'],
      ['divx', '', 'divx'],
    ] as const) {
      const fn = custom(sourceName, parameters);
      if (!fn) throw new Error(`${variant.type} source is missing ${sourceName}(${parameters})`);
      upsert(generatedName, parameters, fn.body, fn.span.line);
    }
    const lmul = custom('lmul', '');
    if (lmul) upsert('lmul', '', `
      uint32_t result = m_x.w * m_y.w;
      m_x.w = result >> 16;
      m_y.w = result;
      m_cc &= ~(CC_Z | CC_C);
      if (result == 0) m_cc |= CC_Z;
      if (result & 0x8000) m_cc |= CC_C;
    `, lmul.span.line);
    const iregLine = lineAt(methodSource, methodSource.indexOf(`${variant.methodClass}::ireg`));
    upsert('ireg', '', `
      switch (m_opcode & 0x70) {
        case 0x20: return m_x.w;
        case 0x30: return m_y.w;
        case 0x50: return m_u.w;
        case 0x60: return m_s.w;
        case 0x70: return m_pc.w;
      }
      return 0;
    `, iregLine);
    upsert('set_ireg', 'uint16_t value', `
      switch (m_opcode & 0x70) {
        case 0x20: m_x.w = value; break;
        case 0x30: m_y.w = value; break;
        case 0x50: m_u.w = value; break;
        case 0x60: m_s.w = value; break;
        case 0x70: m_pc.w = value; break;
      }
    `, iregLine);
    // The CPU's line output is represented as state here; the machine callback
    // remains separately source-derived in the board graph.
    upsert('set_lines', 'uint8_t data', 'm_temp_im = data;',
      lineAt(methodSource, methodSource.indexOf(`${variant.methodClass}::set_lines`)));
    variantConstants = extractDefineConstants(methodHeader);
  }

  const opcodes = dsl.opcodes.map(opcode => ({
    key: opcode.key,
    dispatch: false,
    program: compileMameHandler(normalizeM6809Source(opcode.source)),
    source: sourceRef(dslFile, opcode.sourceLine),
  }));
  if (!variant.singleByteDispatch) opcodes.push(
    {
      key: 'ff10',
      dispatch: true,
      program: compileMameHandler(
        'm_ref = (0x10 << 16) | (OPCODE(m_pc.w++) << 8);',
      ),
      source: sourceRef(dslFile, lineAt(dslSource, dslSource.indexOf('case 0x10:'))),
    },
    {
      key: 'ff11',
      dispatch: true,
      program: compileMameHandler(
        'm_ref = (0x11 << 16) | (OPCODE(m_pc.w++) << 8);',
      ),
      source: sourceRef(dslFile, lineAt(dslSource, dslSource.indexOf('case 0x11:'))),
    },
  );

  const resetMethod = base('device_reset');
  const inputMethod = base('execute_set_input');
  if (!resetMethod || !inputMethod) {
    throw new Error('MAME M6809 source is missing reset/input methods');
  }
  const start = compileMameHandler('');
  const reset = compileMameHandler(normalizeM6809Source(`
    ${resetMethod.body}
    m_pc.b.h = READ(VECTOR_RESET_FFFE);
    m_pc.b.l = READ(VECTOR_RESET_FFFE + 1);
    cycles = 0;
  `));
  const input = compileMameHandler(normalizeM6809Source(inputMethod.body));
  const service = compileMameHandler(normalizeM6809Source(`
    if (m_sync_wait) {
      if (!m_nmi_asserted && !m_firq_line && !m_irq_line) {
        cycles += 1;
        return;
      }
      m_sync_wait = false;
      m_halt = false;
      ${dsl.waits.syncResume}
      return;
    }
    if (m_cwai_wait) {
      if ((m_ea.w = get_pending_interrupt()) == 0) {
        cycles += 1;
        return;
      }
      m_cwai_wait = false;
      m_halt = false;
      ${dsl.waits.cwaiResume}
      return;
    }
    if (m_nmi_asserted) {
      ${dsl.interrupts.nmi}
      return;
    }
    if (!(m_cc & CC_F) && m_firq_line) {
      ${dsl.interrupts.firq}
      return;
    }
    if (!(m_cc & CC_I) && m_irq_line) {
      ${dsl.interrupts.irq}
      return;
    }
  `));
  const fetch = compileMameHandler(variant.singleByteDispatch ? `
    m_opcode = OPCODE(m_pc.w++);
    m_ref = m_opcode << 16;
  ` : `
    m_opcode = OPCODE(m_pc.w++);
    m_ref = m_opcode == 0x10
      ? (0xff10 << 8)
      : (m_opcode == 0x11 ? (0xff11 << 8) : (m_opcode << 16));
  `);
  const constants = {
    ...extractEnumConstants(header, {
      M6809_IRQ_LINE: 0,
      M6809_FIRQ_LINE: 1,
    }),
    ...extractDefineConstants(header),
    ...variantConstants,
    INPUT_LINE_IRQ0: 0,
    INPUT_LINE_NMI: -1,
    CLEAR_LINE: 0,
    ASSERT_LINE: 1,
    CC_IF: 0x50,
  };
  const members: GeneratedCpuMember[] = [
    ...['m_pc', 'm_ppc', 'm_d', 'm_x', 'm_y', 'm_u', 'm_s', 'm_temp', 'm_ea']
      .map(name => ({ name, bits: 16 as const, pair: true })),
    ...[
      'm_dp', 'm_cc', 'm_opcode', 'm_addressing_mode', 'm_reg8', 'm_reg16',
      'm_cond', 'm_nmi_line', 'm_nmi_asserted', 'm_firq_line', 'm_irq_line',
      'm_lds_encountered', 'm_free_run', 'm_bcount', 'm_sync_wait',
      'm_cwai_wait', 'm_halt',
    ].map(name => ({ name, bits: 8 as const })),
    { name: 'm_ref', bits: 32 },
    { name: 'm_state', bits: 32 },
    { name: 'cycles' },
    { name: 'm_icount' },
  ];
  if (variant.methodClass) members.push({ name: 'm_temp_im', bits: 8 });
  const programs = [
    start,
    reset,
    input,
    service,
    fetch,
    ...methods.map(method => method.program),
    ...opcodes.map(opcode => opcode.program),
  ];
  return {
    schemaVersion: 1,
    type: variant.type,
    dialect: 'mame-m6809-lst',
    sourceFiles: [
      cppFile,
      headerFile,
      inlineFile,
      dslFile,
      baseDslFile,
      ...(variant.deviceSourceFiles ?? []),
    ],
    constants,
    aliases: {},
    members,
    methods,
    start,
    reset,
    input,
    service,
    fetch,
    opcodes,
    registerBindings: {
      reg8: ['m_d.b.h', 'm_d.b.l'],
      reg16: ['m_d', 'm_x', 'm_y', 'm_u', 'm_s'],
      index: {
        selector: 'm_opcode',
        mask: variant.methodClass ? 0x70 : 0x60,
        members: {
          '0': 'm_x',
          '32': 'm_y',
          ...(variant.methodClass ? {
            '48': 'm_y',
            '80': 'm_u',
            '96': 'm_s',
            '112': 'm_pc',
          } : {
            '64': 'm_u',
            '96': 'm_s',
          }),
        },
      },
    },
    ...(variant.opcodeDecrypt ? { opcodeDecrypt: variant.opcodeDecrypt } : {}),
    summary: {
      opcodes: opcodes.length,
      compiledOpcodes: opcodes.filter(opcode => !opcode.program.diagnostics.length).length,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

/**
 * Compile the 6809 core and apply the KONAMI-1 opcode fetch transform from the
 * device source. Operand/data reads remain plain, matching
 * konami1_device::mi_konami1.
 */
export function compileMameKonami1(mameSrc: string): GeneratedCpuDefinition {
  const deviceFile = 'src/mame/konami/konami1.cpp';
  const deviceHeaderFile = 'src/mame/konami/konami1.h';
  return compileM6809Core(mameSrc, {
    type: 'KONAMI1',
    deviceSourceFiles: [deviceFile, deviceHeaderFile],
    opcodeDecrypt: extractKonami1Decrypt(
      readFileSync(join(mameSrc, deviceFile), 'utf8'),
      readFileSync(join(mameSrc, deviceHeaderFile), 'utf8'),
    ),
  });
}

/**
 * Compile the plain Motorola MC6809. mc6809_device adds only the internal
 * clock divider to m6809_base_device (a machine-configuration fact already
 * carried by the generated CPU schedule), and keeps mi_default, so the core
 * lowering needs no fetch transform.
 */
export function compileMameMc6809(mameSrc: string): GeneratedCpuDefinition {
  return compileM6809Core(mameSrc, { type: 'MC6809' });
}

/** MC6809E changes the external clock pins, not the instruction core. */
export function compileMameMc6809E(mameSrc: string): GeneratedCpuDefinition {
  return compileM6809Core(mameSrc, { type: 'MC6809E' });
}

/**
 * HD6309E is pin-compatible with the external-clock 6809.  Lower the shared
 * 6809 instruction set so boards that keep the chip in emulation mode remain
 * executable; native-only opcodes still fail closed through the generated
 * illegal-instruction path until the HD6309 DSL is added.
 */
export function compileMameHd6309E(mameSrc: string): GeneratedCpuDefinition {
  return compileM6809Core(mameSrc, { type: 'HD6309E' });
}

/** Compile Konami's custom 6809-derived one-byte instruction set. */
export function compileMameKonami(mameSrc: string): GeneratedCpuDefinition {
  const deviceFile = 'src/devices/cpu/m6809/konami.cpp';
  const deviceHeaderFile = 'src/devices/cpu/m6809/konami.h';
  return compileM6809Core(mameSrc, {
    type: 'KONAMI',
    dslFile: 'src/devices/cpu/m6809/konami.lst',
    singleByteDispatch: true,
    methodClass: 'konami_cpu_device',
    deviceSourceFiles: [deviceFile, deviceHeaderFile],
  });
}

/** Compile MAME's Intel 8088/8086 source switch and inline helpers. */
export function compileMameI8088(mameSrc: string): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/i86/i86.cpp';
  const headerFile = 'src/devices/cpu/i86/i86.h';
  const inlineFile = 'src/devices/cpu/i86/i86inline.h';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const inline = readFileSync(join(mameSrc, inlineFile), 'utf8');
  const ast = parseMameAst([
    { file: cppFile, source: cpp },
    { file: inlineFile, source: inline },
  ]).units.flatMap(unit => unit.functions);
  const sourceFunction = (name: string, parameters?: string) => ast.find(fn =>
    ['i8086_common_cpu_device', 'i8086_cpu_device'].includes(fn.className) &&
    fn.name === name && (parameters === undefined || fn.parameters === parameters));
  const normalize = (source: string): string => normalizeMameExecutionSource(source)
    .replace(/\bif\s*\(\s*m_lock\s*\)\s*m_lock_handler\s*\([^;]*\)\s*;/g, '')
    .replace(/\bm_TF\s*=\s*m_IF\s*=\s*0\s*;/g, 'm_TF = 0; m_IF = 0;')
    .replace(/\b(m_\w+)\s*=\s*(m_\w+)\s*=\s*([^;]+);/g, '$2 = $3; $1 = $2;')
    .replace(/\bm_Mod_RM\.RM\.b\b/g, 'm_modrm_rm_b')
    .replace(/\bm_Mod_RM\.RM\.w\b/g, 'm_modrm_rm_w')
    .replace(/\bm_Mod_RM\.reg\.b\b/g, 'm_modrm_reg_b')
    .replace(/\bm_Mod_RM\.reg\.w\b/g, 'm_modrm_reg_w')
    .replace(/\bm_icount\s*-=\s*([^;]+);/g, 'cycles += $1;')
    .replace(/\bm_icount\s*=\s*0\s*;/g, 'm_icount = 0;')
    .replace(/\bCF\b/g, '(m_CarryVal != 0)')
    .replace(/\bSF\b/g, '(m_SignVal < 0)')
    .replace(/\bZF\b/g, '(m_ZeroVal == 0)')
    .replace(/\bPF\b/g, '(m_parity_table[uint8_t(m_ParityVal)] != 0)')
    .replace(/\bAF\b/g, '(m_AuxVal != 0)')
    .replace(/\bOF\b/g, '(m_OverVal != 0)')
    .replace(/\baccess_to_be_redone\s*\(\s*\)/g, '0')
    .replace(/\bstandard_irq_callback\s*\([^;]+/g, 'm_int_vector')
    .replace(/\btotal_cycles\s*\(\s*\)/g, '1')
    .replace(/\b(?:debugger_\w+|logerror|TRACE_NOOP)\s*\([^;]*\)\s*;/g, '')
    .replace(/\bm_(?:lock_handler|out_if_func|esc_opcode_handler|esc_data_handler)\s*\([^;]*\)\s*;/g, '')
    .replace(/\bBIT\s*\(\s*([^,]+),\s*([^)]+)\)/g, '((($1) >> ($2)) & 1)');
  const methods: GeneratedCpuMethod[] = [];
  const add = (name: string, parameters: string, body: string, file: string, line: number) => {
    methods.push({
      name,
      parameters,
      program: compileMameHandler(normalize(body)),
      source: sourceRef(file, line),
    });
  };
  const skipped = new Set([
    'state_import', 'state_string_export', 'device_start', 'device_reset',
    'create_disassembler', 'get_mode', 'memory_space_config', 'execute_run',
    'read_byte', 'read_word', 'write_byte', 'write_word', 'read_port_byte',
    'read_port_word', 'write_port_byte', 'write_port_byte_al', 'write_port_word',
    'fetch', 'execute_set_input',
    // Address-space plumbing, not semantics: sreg_to_space picks between the
    // AS_CODE/AS_STACK/AS_EXTRA spaces a driver may install, and MAME aliases
    // all three onto m_program when it does not. Every caller of it is already
    // skipped above, so lowering it only reaches m_program, which the
    // generated core -- a single program bus -- has no member for.
    'sreg_to_space',
  ]);
  const seenMethods = new Set<string>();
  for (const fn of ast) {
    if (!['i8086_common_cpu_device', 'i8086_cpu_device'].includes(fn.className) ||
        skipped.has(fn.name) || seenMethods.has(`${fn.name}\0${fn.parameters}`)) continue;
    seenMethods.add(`${fn.name}\0${fn.parameters}`);
    add(fn.name, fn.parameters, fn.body, fn.span.file, fn.span.line);
  }
  const inlineLine = (name: string) => lineAt(inline, inline.indexOf(name));
  add('read_byte', 'uint32_t addr', 'return READ(addr);', cppFile, 635);
  add('read_word', 'uint32_t addr', 'return READ16LE(addr);', cppFile, 640);
  add('write_byte', 'uint32_t addr, uint8_t data', 'WRITE(addr, data);', cppFile, 645);
  add('write_word', 'uint32_t addr, uint16_t data', 'WRITE16LE(addr, data);', cppFile, 650);
  add('read_port_byte', 'uint16_t port', 'return PORT_READ(port);', cppFile, 655);
  add('read_port_word', 'uint16_t port', 'return PORT_READ16(port);', cppFile, 660);
  add('write_port_byte', 'uint16_t port, uint8_t data', 'PORT_WRITE(port, data);', cppFile, 665);
  add('write_port_byte_al', 'uint16_t port', 'PORT_WRITE(port, m_regs.b[AL]);', cppFile, 670);
  add('write_port_word', 'uint16_t port, uint16_t data', 'PORT_WRITE16(port, data);', cppFile, 680);
  add('update_pc', '', 'm_pc = (m_sregs[CS] << 4) + m_ip; return m_pc;', headerFile,
    lineAt(header, header.indexOf('uint32_t update_pc')));
  add('fetch', '', 'uint8_t data = READ(update_pc()); m_ip++; return data;', cppFile, 168);
  add('fetch_op', '', 'return fetch();', headerFile, lineAt(header, header.indexOf('fetch_op()')));

  const array = (source: string, name: string): number[] => {
    const body = new RegExp(`${name}\\s*\\[[^\\]]*\\]\\s*=\\s*\\{([\\s\\S]*?)\\};`).exec(source)?.[1];
    if (!body) throw new Error(`MAME I8088 source is missing ${name}`);
    return body.replace(/\/\*[\s\S]*?\*\//g, '').split(',')
      .map(value => Number(value.trim())).filter(Number.isFinite);
  };
  const timing = array(cpp, 'm_i8086_timing');
  const eaTiming = array(cpp, 'm_i8086_ea_timing');
  const byteNames = [0, 2, 4, 6, 1, 3, 5, 7];
  const modrmRegB = Array.from({ length: 256 }, (_, value) => byteNames[(value & 0x38) >> 3]!);
  const modrmRegW = Array.from({ length: 256 }, (_, value) => (value & 0x38) >> 3);
  const modrmRmB = Array.from({ length: 256 }, (_, value) => value >= 0xc0 ? byteNames[value & 7]! : 0);
  const modrmRmW = Array.from({ length: 256 }, (_, value) => value >= 0xc0 ? value & 7 : 0);
  const parity = Array.from({ length: 256 }, (_, value) => {
    let bits = value; let count = 0;
    while (bits) { count += bits & 1; bits >>>= 1; }
    return (count & 1) ? 0 : 1;
  });
  const constants = {
    ES: 0, CS: 1, SS: 2, DS: 3,
    AX: 0, CX: 1, DX: 2, BX: 3, SP: 4, BP: 5, SI: 6, DI: 7,
    AL: 0, AH: 1, CL: 2, CH: 3, DL: 4, DH: 5, BL: 6, BH: 7,
    SPL: 8, SPH: 9, BPL: 10, BPH: 11,
    SIL: 12, SIH: 13, DIL: 14, DIH: 15,
    ...extractEnumConstants(header, {}),
  };
  Object.assign(constants, extractDefineConstants(inline), {
    INPUT_LINE_IRQ0: 0, INPUT_LINE_NMI: -1, INPUT_LINE_TEST: 20,
    CLEAR_LINE: 0, ASSERT_LINE: 1, INT_IRQ: 1, NMI_IRQ: 2,
  });
  const resetFn = sourceFunction('device_reset');
  const inputFn = sourceFunction('execute_set_input');
  const runFn = sourceFunction('execute_run');
  if (!resetFn || !inputFn || !runFn) {
    throw new Error('MAME I8088 reset/input/run source is missing');
  }
  const reset = compileMameHandler(normalize(`${resetFn.body}\ncycles = 0;`));
  const input = compileMameHandler(normalize(inputFn.body)
    .replace(/\binptnum\b/g, 'inputnum'));
  // `execute_run` keeps a small switch of its own ahead of `common_op`, and
  // the shift-and-rotate-by-CL pair lives there rather than in the big table.
  // Restating the step by hand is what let them go missing: with no case for
  // 0xd2/0xd3 the opcode byte was consumed and its ModRM byte was not, so
  // `SHL BX,CL` ran one byte short and every instruction after it decoded from
  // the wrong offset. Take the two bodies from MAME instead of writing them
  // out, so the step cannot drift from the source switch again.
  const runBody = runFn.body;
  const rotateByCl = (opcode: string): string => {
    const at = runBody.indexOf(`case ${opcode}:`);
    if (at < 0) throw new Error(`MAME I8088 execute_run has no ${opcode} case`);
    const open = runBody.indexOf('{', at);
    let depth = 0;
    for (let index = open; index < runBody.length; index += 1) {
      if (runBody[index] === '{') depth += 1;
      else if (runBody[index] === '}' && (depth -= 1) === 0) {
        return runBody.slice(open + 1, index);
      }
    }
    throw new Error(`MAME I8088 ${opcode} case is unterminated`);
  };
  add('rotshft_bcl', '', rotateByCl('0xd2'), cppFile, lineAt(cpp, cpp.indexOf('case 0xd2:')));
  add('rotshft_wcl', '', rotateByCl('0xd3'), cppFile, lineAt(cpp, cpp.indexOf('case 0xd3:')));

  const step = compileMameHandler(normalize(`
    cycles = 0;
    m_icount = 1;
    m_prev_ip = m_ip;
    if (m_pending_irq && m_no_interrupt == 0) {
      if (m_pending_irq & NMI_IRQ) {
        interrupt(2);
        m_pending_irq &= ~NMI_IRQ;
        m_halt = false;
      } else if (m_IF) {
        interrupt(-1);
        m_halt = false;
      }
    }
    if (m_halt) { cycles += 1; return cycles; }
    if (m_no_interrupt) m_no_interrupt--;
    uint8_t op = fetch_op();
    if (op == 0x0f) {
      m_sregs[CS] = POP();
      CLK(POP_SEG);
    } else if (op == 0xd2) {
      rotshft_bcl();
    } else if (op == 0xd3) {
      rotshft_wcl();
    } else if (op >= 0xd8 && op <= 0xdf) {
      m_modrm = fetch();
      if (m_modrm < 0xc0) get_ea(1, I8086_READ);
      CLK(NOP);
    } else {
      common_op(op);
    }
    return cycles > 0 ? cycles : 1;
  `));
  const members: GeneratedCpuMember[] = [
    { name: 'm_regs', wordByteRegisters: 8 },
    { name: 'm_sregs', bits: 16, values: [0, 0, 0, 0] },
    { name: 'm_parity_table', bits: 8, values: parity },
    { name: 'm_modrm_reg_b', bits: 8, values: modrmRegB },
    { name: 'm_modrm_reg_w', bits: 8, values: modrmRegW },
    { name: 'm_modrm_rm_b', bits: 8, values: modrmRmB },
    { name: 'm_modrm_rm_w', bits: 8, values: modrmRmW },
    { name: 'm_timing', bits: 8, values: timing },
    { name: 'm_ea_timing', bits: 8, values: eaTiming },
    ...['m_ip', 'm_prev_ip', 'm_eo'].map(name => ({ name, bits: 16 as const })),
    ...[
      'm_TF', 'm_IF', 'm_DF', 'm_IOPL', 'm_NT', 'm_MF', 'm_no_interrupt',
      'm_fire_trap', 'm_test_state', 'm_io_stall', 'm_seg_prefix',
      'm_seg_prefix_next', 'm_modrm', 'm_halt', 'm_lock',
    ].map(name => ({ name, bits: 8 as const })),
    // i86.h declares `int32_t m_SignVal;` on its own line and the rest of the
    // flag scratch as `uint32_t ... /* 0 or non-0 valued flags */`. The
    // distinction is load bearing: `SF` is `m_SignVal < 0`, and
    // `set_SZPF_Byte` assigns `(int8_t)x`, so wrapping the store unsigned
    // turns every negative byte result positive and clears SF. Q*bert's coin
    // routine is `CMP BYTE PTR [0083],0` then `JG`/`JL` -- a signed test --
    // so with SF stuck at 0 it took the wrong arm and never credited a coin.
    { name: 'm_SignVal', bits: 32 as const, signed: true },
    // m_icount is `int` in device_execute_interface and goes negative when an
    // instruction overruns its slice.
    { name: 'm_icount', bits: 32 as const, signed: true },
    ...[
      'm_AuxVal', 'm_OverVal', 'm_ZeroVal', 'm_CarryVal',
      'm_ParityVal', 'm_int_vector', 'm_pending_irq', 'm_nmi_state',
      'm_prefix_seg', 'm_ea', 'm_easeg', 'm_dst', 'm_src', 'm_pc', 'cycles',
    ].map(name => ({ name, bits: 32 as const })),
  ];
  const programs = [reset, input, step, ...methods.map(method => method.program)];
  return {
    schemaVersion: 1,
    type: 'I8088',
    addressMask: 0xfffff,
    dialect: 'mame-i8086-cpp-switch',
    sourceFiles: [cppFile, headerFile, inlineFile],
    constants,
    aliases: {},
    members,
    methods,
    start: compileMameHandler(''),
    reset,
    input,
    step,
    service: compileMameHandler(''),
    fetch: compileMameHandler(''),
    opcodes: [],
    summary: {
      opcodes: 256,
      compiledOpcodes: step.diagnostics.length ? 0 : 256,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

/**
 * V30 executes the 8086 instruction set used by M72 program ROMs. Keep the
 * compatible execution core source-derived from MAME's i86 switch while also
 * recording the NEC implementation sources that define the selected device.
 */
export function compileMameV30(mameSrc: string): GeneratedCpuDefinition {
  const compatible = compileMameI8088(mameSrc);
  return {
    ...compatible,
    type: 'V30',
    dialect: 'mame-v30-i8086-compatible-switch',
    sourceFiles: [
      ...compatible.sourceFiles,
      'src/devices/cpu/nec/nec.cpp',
      'src/devices/cpu/nec/nec.h',
      'src/devices/cpu/nec/necinstr.hxx',
    ],
  };
}

/** Compile the Z8002's source opcode table and generated operation methods. */
export function compileMameZ8002(mameSrc: string): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/z8000/z8000.cpp';
  const headerFile = 'src/devices/cpu/z8000/z8000.h';
  const cpuHeaderFile = 'src/devices/cpu/z8000/z8000cpu.h';
  const opsFile = 'src/devices/cpu/z8000/z8000ops.hxx';
  const tableFile = 'src/devices/cpu/z8000/z8000tbl.hxx';
  // MAME's decimal-adjust result table. z8000.cpp includes it as a plain
  // static array and DAB indexes it directly, so the core is incomplete
  // without it -- the emitter has no identifier to resolve.
  const dabFile = 'src/devices/cpu/z8000/z8000dab.h';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const cpuHeader = readFileSync(join(mameSrc, cpuHeaderFile), 'utf8');
  const ops = readFileSync(join(mameSrc, opsFile), 'utf8');
  const tableSource = readFileSync(join(mameSrc, tableFile), 'utf8');
  // MAME grew this header partway through the checkouts this compiler
  // supports; older revisions spell DAB without it. Take the table when the
  // source has one and leave the member out when it does not, so neither
  // revision loses anything it declares.
  const dabPath = join(mameSrc, dabFile);
  const dabTable = existsSync(dabPath)
    ? /\bstatic\s+const\s+uint16_t\s+Z8000_dab\s*\[[^\]]*\]\s*=\s*\{([\s\S]*?)\}\s*;/
      .exec(stripCppComments(readFileSync(dabPath, 'utf8')))
    : null;
  const dabValues = dabTable
    ? dabTable[1]!.split(',').map(value => value.trim()).filter(Boolean).map(Number)
    : [];
  const ast = parseMameAst([
    { file: cppFile, source: cpp },
    { file: opsFile, source: ops },
  ]).units.flatMap(unit => unit.functions);
  const sourceMethods = new Map(ast.filter(fn => fn.className === 'z8002_device')
    .map(fn => [fn.name, fn]));
  const macros = parseMameOperationMacros(`${cpuHeader}\n${ops}`);
  const normalize = (source: string): string => {
    let expanded = expandMameOperationMacros(source, macros);
    expanded = expanded
      .replace(/\bBYTE(?:8|4)?_XOR_BE\s*\(/g, '(')
      .replace(/\bm_cache\.read_word\s*\(/g, 'READ16BE(')
      .replace(/\bRDMEM_B\s*\([^,]+,/g, 'READ(')
      .replace(/\bRDMEM_W\s*\([^,]+,/g, 'READ16BE(')
      .replace(/\bRDMEM_L\s*\([^,]+,/g, 'READ32BE(')
      .replace(/\bWRMEM_B\s*\([^,]+,/g, 'WRITE(')
      .replace(/\bWRMEM_W\s*\([^,]+,/g, 'WRITE16BE(')
      .replace(/\bWRMEM_L\s*\([^,]+,/g, 'WRITE32BE(')
      .replace(/\bRDPORT_B\s*\([^,]+,/g, 'PORT_READ(')
      .replace(/\bRDPORT_W\s*\([^,]+,/g, 'PORT_READ16(')
      .replace(/\bWRPORT_B\s*\([^,]+,/g, 'PORT_WRITE(')
      .replace(/\bWRPORT_W\s*\([^,]+,/g, 'PORT_WRITE16(');
    return normalizeMameExecutionSource(expanded)
      .replace(/\bmemory_access<[^;]+::specific\s*&\s*\w+\s*=\s*[^;]+;/g, '')
      .replace(/if\s*\(\s*m_fcw\s*&\s*0x2000[\s\S]*?\)\s*\{[\s\S]*?\}/g, '')
      .replace(/\buint64_t\b/g, 'uint32_t')
      .replace(/\bint64_t\b/g, 'int32_t')
      .replace(/\b(0x[\da-f]+|\d+)[uUlL]+\b/gi, '$1')
      .replace(/\bm_icount\s*-=\s*([^;]+);/g, 'cycles += $1;')
      .replace(/\bBIT\s*\(\s*([^,]+),\s*([^)]+)\)/g, '((($1) >> ($2)) & 1)')
      .replace(/\b(?:assert|fatalerror|logerror|debugger_\w+)\s*\([^;]*\)\s*;/g, '')
      .replace(/\bTRACE_NOOP\s*\(\s*\)\s*;/g, '')
      .replace(/\(\s*void\s*\)\s*\w+\s*;/g, '')
      .replace(/\bm_(?:ns_out|mo_out|busack_out)\s*\([^;]*\)\s*;/g, '')
      .replace(/\bstd::popcount\b/g, 'popcount32');
  };
  const rows = [...tableSource.matchAll(
    /\{\s*(0x[\da-f]+|\d+)\s*,\s*(0x[\da-f]+|\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*&z8002_device::(\w+)\s*\}/gi,
  )].map(match => ({
    begin: Number(match[1]), end: Number(match[2]), step: Number(match[3]),
    words: Number(match[4]), cycles: Number(match[5]), method: match[6]!,
  }));
  if (!rows.length) throw new Error('MAME Z8002 opcode table is missing');
  const stateByMethod = new Map<string, number>();
  const methodsByState: string[] = [];
  const stateCycles: number[] = [];
  const states = new Array<number>(0x10000).fill(0);
  for (const row of rows) {
    let state = stateByMethod.get(row.method);
    if (state === undefined) {
      state = methodsByState.length;
      stateByMethod.set(row.method, state);
      methodsByState.push(row.method);
      stateCycles.push(row.cycles);
    }
    for (let opcode = row.begin; opcode <= row.end; opcode += row.step) states[opcode] = state;
  }
  const methods: GeneratedCpuMethod[] = [];
  const add = (name: string, parameters: string, body: string, file: string, line: number) => {
    if (methods.some(method => method.name === name)) return;
    methods.push({ name, parameters, program: compileMameHandler(normalize(body)), source: sourceRef(file, line) });
  };
  for (const name of methodsByState) {
    const fn = sourceMethods.get(name);
    if (!fn) throw new Error(`MAME Z8002 source is missing ${name}`);
    add(name, fn.parameters, fn.body, fn.span.file, fn.span.line);
  }
  // Include every source helper reachable from operation methods. Unused
  // framework lifecycle methods are harmlessly omitted.
  for (const fn of sourceMethods.values()) {
    if ([
      'device_start', 'device_reset', 'execute_run', 'execute_set_input',
      'memory_space_config', 'create_disassembler', 'register_debug_state',
      // device_state_interface, like the other lifecycle entries here: it
      // formats m_fcw for the debugger against STATE_GENFLAGS, a distate.h
      // enumerator that is not part of any CPU definition.
      'state_import', 'state_export', 'state_string_export',
      'register_save_state', 'init_spaces', 'init_tables', 'clear_internal_state',
      'RDMEM_B', 'RDMEM_W', 'RDMEM_L', 'WRMEM_B', 'WRMEM_W', 'WRMEM_L',
      'RDPORT_B', 'RDPORT_W', 'WRPORT_B', 'WRPORT_W', 'RDOP', 'get_operand',
    ].includes(fn.name)) continue;
    add(fn.name, fn.parameters, fn.body, fn.span.file, fn.span.line);
  }
  add('RDOP', '', 'uint16_t value = READ16BE(m_pc); m_pc += 2; return value;', cppFile, 96);
  add('get_operand', 'int opnum', `
    if (!(m_op_valid & (1 << opnum))) {
      m_op[opnum] = READ16BE(m_pc);
      m_pc += 2;
      m_op_valid |= 1 << opnum;
    }
    return m_op[opnum];
  `, cppFile, 103);
  const constants = {
    ...extractDefineConstants(cpuHeader),
    ...extractEnumConstants(header, {}),
    CLEAR_LINE: 0, ASSERT_LINE: 1, HOLD_LINE: 2,
    INPUT_LINE_NMI: -1, NMI_LINE: -1, NVI_LINE: 0, VI_LINE: 1, BUSREQ_LINE: 3,
    Z8000_TRAP: 0x80, Z8000_NMI: 0x40, Z8000_SEGTRAP: 0x20,
    Z8000_NVI: 0x10, Z8000_VI: 0x08, Z8000_SYSCALL: 0x04,
    Z8000_RESET: 0x02, Z8000_EPU: 0x01,
  };
  const reset = compileMameHandler(`
    m_irq_req |= Z8000_RESET;
    m_refresh &= 0x7fff;
    m_halt = 0;
    cycles = 0;
  `);
  const input = compileMameHandler(normalize(`
    if (inputnum == NMI_LINE) {
      if (m_nmi_state != state) {
        m_nmi_state = state;
        if (state != CLEAR_LINE) m_irq_req |= Z8000_NMI;
      }
    } else if (inputnum == BUSREQ_LINE) {
      m_busreq_state = state;
    } else if (inputnum < 3) {
      m_irq_state[inputnum] = state;
      if (inputnum == NVI_LINE && state != CLEAR_LINE && (m_fcw & F_NVIE)) m_irq_req |= Z8000_NVI;
      if (inputnum == VI_LINE && state != CLEAR_LINE && (m_fcw & F_VIE)) m_irq_req |= Z8000_VI;
    }
  `));
  const service = compileMameHandler('if (m_irq_req) Interrupt(); if (m_halt) { cycles += 1; return; }');
  const fetch = compileMameHandler(`
    m_ppc = m_pc;
    m_op[0] = RDOP();
    m_op_valid = 1;
    m_ref = m_state[m_op[0]] << 8;
  `);
  const opcodes = methodsByState.map((name, state) => ({
    key: state.toString(16).padStart(4, '0'),
    description: name,
    dispatch: false,
    program: compileMameHandler(`${name}(); cycles += ${stateCycles[state] ?? 1}; m_op_valid = 0;`),
    source: methods.find(method => method.name === name)!.source,
  }));
  const members: GeneratedCpuMember[] = [
    { name: 'm_regs', z8000Registers: true },
    { name: 'm_op', bits: 32, values: [0, 0, 0, 0] },
    { name: 'm_state', bits: 16, values: states },
    ...(dabValues.length ? [{ name: 'Z8000_dab', bits: 16 as const, values: dabValues }] : []),
    { name: 'm_irq_state', bits: 32, values: [0, 0, 0] },
    { name: 'z8000_zsp', bits: 8, values: Array.from({ length: 256 }, (_, value) =>
      (value === 0 ? 0x40 : 0) | (value & 0x80 ? 0x20 : 0) |
      ((value.toString(2).split('1').length - 1) % 2 === 0 ? 0x10 : 0)) },
    ...[
      'm_ppc', 'm_pc', 'm_psapseg', 'm_psapoff', 'm_fcw', 'm_refresh',
      'm_nspseg', 'm_nspoff', 'm_irq_req', 'm_irq_vec', 'm_op_valid',
      'm_nmi_state', 'm_busreq_state', 'm_busack_state', 'm_mi', 'm_halt',
      'm_vector_mult', 'm_ref', 'm_icount', 'cycles',
    ].map(name => ({ name, bits: 32 as const })),
  ];
  const programs = [reset, input, service, fetch, ...methods.map(method => method.program), ...opcodes.map(opcode => opcode.program)];
  return {
    schemaVersion: 1,
    type: 'Z8002',
    dialect: 'mame-z8002-source-table',
    // MAME's z8002_device::RDMEM_W/RDMEM_L/WRMEM_W/WRMEM_L all clear
    // address bit zero before touching the program/data space.
    alignDataWords: true,
    fixedInstructionCycles: true,
    sourceFiles: [cppFile, headerFile, cpuHeaderFile, opsFile, tableFile],
    constants,
    aliases: {},
    members,
    methods,
    start: compileMameHandler('m_vector_mult = 1;'),
    reset,
    input,
    service,
    fetch,
    opcodes,
    summary: {
      opcodes: 0x10000,
      compiledOpcodes: opcodes.every(opcode => !opcode.program.diagnostics.length) ? 0x10000 : 0,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

interface MameOperationMacro {
  parameters?: string[];
  body: string;
}

export function parseMameOperationMacros(source: string): Map<string, MameOperationMacro> {
  const macros = new Map<string, MameOperationMacro>();
  for (const line of source.split(/\r?\n/)) {
    const match = /^\s*#define\s+(\w+)(?:\(([^)]*)\))?\s+(.+)$/.exec(line);
    if (!match) continue;
    macros.set(match[1]!, {
      ...(match[2] !== undefined
        ? { parameters: match[2].split(',').map(value => value.trim()) }
        : {}),
      body: match[3]!,
    });
  }
  return macros;
}

export function expandMameOperationMacros(
  source: string,
  macros: Map<string, MameOperationMacro>,
): string {
  let expanded = source;
  const functions = [...macros].filter(([, macro]) => macro.parameters);
  const objects = [...macros].filter(([, macro]) => !macro.parameters);
  for (let pass = 0; pass < 32; pass++) {
    const before = expanded;
    for (const [name, macro] of functions) {
      const pattern = new RegExp(`\\b${name}\\s*\\(`, 'g');
      let cursor = 0;
      while (cursor < expanded.length) {
        pattern.lastIndex = cursor;
        const match = pattern.exec(expanded);
        if (!match) break;
        const open = expanded.indexOf('(', match.index + name.length);
        const close = matchPair(expanded, open, '(', ')');
        if (close < 0) break;
        const args = splitMameArgs(expanded.slice(open + 1, close));
        let body = macro.body;
        const parameterIndexes = new Map(
          macro.parameters!
            .map((parameter, index) => [parameter, index] as const)
            .filter(([parameter]) => /^\w+$/.test(parameter)),
        );
        if (parameterIndexes.size) {
          body = body.replace(
            new RegExp(`\\b(?:${[...parameterIndexes.keys()].join('|')})\\b`, 'g'),
            parameter => args[parameterIndexes.get(parameter)!] ?? '',
          );
        }
        expanded = expanded.slice(0, match.index) + body + expanded.slice(close + 1);
        cursor = match.index + body.length;
      }
    }
    for (const [name, macro] of objects) {
      expanded = expanded.replace(new RegExp(`\\b${name}\\b`, 'g'), macro.body);
    }
    if (expanded === before) break;
  }
  return expanded;
}

function extractMameByteArray(
  source: string,
  name: string,
  symbols: Record<string, number> = {},
): number[] {
  const match = new RegExp(
    `${name}\\s*\\[[^\\]]+\\]\\s*=\\s*(?:\\/\\*[\\s\\S]*?\\*\\/\\s*)?\\{([\\s\\S]*?)\\};`,
  ).exec(source);
  if (!match) throw new Error(`MAME M6803 source is missing ${name}`);
  const values = match[1]!
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
    .map(value => symbols[value] ?? Number(value));
  if (values.length !== 256 || values.some(value => !Number.isFinite(value))) {
    throw new Error(`${name} contains ${values.length} invalid entries`);
  }
  return values;
}

function extractM6800Dispatch(
  source: string,
  table: string,
  ownerClass: string,
): string[] {
  const match = new RegExp(`${table}\\s*\\[[^\\]]+\\]\\s*=\\s*\\{([\\s\\S]*?)\\};`)
    .exec(source);
  if (!match) throw new Error(`MAME ${table} opcode dispatch table is missing`);
  const methods = [...match[1]!.matchAll(new RegExp(`&${ownerClass}::(\\w+)`, 'g'))]
    .map(entry => entry[1]!);
  if (methods.length !== 256) {
    throw new Error(`MAME ${table} dispatch contains ${methods.length}, expected 256`);
  }
  return methods;
}

function compileM6802InternalPlan(
  source: string,
): NonNullable<GeneratedCpuDefinition['internal']> {
  const map =
    /void\s+m6802_cpu_device::ram_map[\s\S]*?\{([\s\S]*?)\}/.exec(source)?.[1] ?? '';
  const ram = /map\(\s*(0x[\da-f]+|\d+)\s*,\s*(0x[\da-f]+|\d+)\s*\)\.ram/.exec(map);
  if (!ram) throw new Error('MAME M6802 internal RAM map is missing');
  return { ram: [{ start: Number(ram[1]), end: Number(ram[2]) }], ports: [] };
}

function compileM6803InternalPlan(
  source: string,
): NonNullable<GeneratedCpuDefinition['internal']> {
  const address = (method: string): number => {
    const match = new RegExp(
      `map\\(\\s*(0x[\\da-f]+|\\d+)\\s*,[^;]+FUNC\\([^)]*::${method}\\)`,
      'i',
    ).exec(source);
    if (!match) throw new Error(`MAME M6803 internal map is missing ${method}`);
    return Number(match[1]);
  };
  const map = /void\s+m6801_cpu_device::m6803_mem[\s\S]*?\{([\s\S]*?)\}/.exec(source)?.[1] ?? '';
  const ram = /map\(\s*(0x[\da-f]+|\d+)\s*,\s*(0x[\da-f]+|\d+)\s*\)\.ram/.exec(map);
  if (!ram) throw new Error('MAME M6803 internal RAM map is missing');
  const outputMask = Number(
    /void\s+m6801_cpu_device::write_port2[\s\S]*?\bdata\s*&=\s*(0x[\da-f]+|\d+)/i
      .exec(source)?.[1],
  ) || 0xff;
  return {
    ram: [{ start: Number(ram[1]), end: Number(ram[2]) }],
    ports: [1, 2].map(port => ({
      dataAddress: address(`p${port}_data_w`),
      directionAddress: address(`p${port}_ddr_w`),
      inputSignal: `in_p${port}_cb`,
      outputSignal: `out_p${port}_cb`,
      outputMask: port === 2 ? outputMask : 0xff,
    })),
  };
}

function compileHd63701Y0InternalPlan(
  source: string,
): NonNullable<GeneratedCpuDefinition['internal']> {
  const map = /void\s+hd6301y_cpu_device::hd6301y_mem[\s\S]*?\{([\s\S]*?)\}/
    .exec(source)?.[1] ?? '';
  const ram = /map\(\s*(0x[\da-f]+|\d+)\s*,\s*(0x[\da-f]+|\d+)\s*\)\.ram/i.exec(map);
  if (!ram) throw new Error('MAME HD63701Y0 internal RAM map is missing');
  return {
    ram: [{ start: Number(ram[1]), end: Number(ram[2]) }],
    ports: [{
      dataAddress: 0x17,
      directionAddress: 0x16,
      inputSignal: 'in_p6_cb',
      outputSignal: 'out_p6_cb',
      outputMask: 0xff,
    }],
  };
}

function compileM6801U4InternalPlan(
  source: string,
): NonNullable<GeneratedCpuDefinition['internal']> {
  const address = (method: string): number => {
    const match = new RegExp(
      `map\\(\\s*(0x[\\da-f]+|\\d+)\\s*,[^;]+FUNC\\([^)]*::${method}\\)`,
      'i',
    ).exec(source);
    if (!match) throw new Error(`MAME M6801U4 internal map is missing ${method}`);
    return Number(match[1]);
  };
  const map =
    /void\s+m6801u4_cpu_device::m6801u4_mem[\s\S]*?\{([\s\S]*?)\}/.exec(source)?.[1] ?? '';
  const ram = /map\(\s*(0x[\da-f]+|\d+)\s*,\s*(0x[\da-f]+|\d+)\s*\)\.ram/.exec(map);
  if (!ram) throw new Error('MAME M6801U4 internal RAM map is missing');
  const outputMask = Number(
    /void\s+m6801_cpu_device::write_port2[\s\S]*?\bdata\s*&=\s*(0x[\da-f]+|\d+)/i
      .exec(source)?.[1],
  ) || 0xff;
  const constant = (name: string): number => {
    const value = new RegExp(
      `#define\\s+${name}\\s+(0x[\\da-f]+|\\d+)`,
      'i',
    ).exec(source)?.[1];
    if (!value) throw new Error(`MAME M6801U4 source is missing ${name}`);
    return Number(value);
  };
  return {
    ram: [{ start: Number(ram[1]), end: Number(ram[2]) }],
    ports: [1, 2, 3, 4].map(port => ({
      dataAddress: address(`p${port}_data_w`),
      directionAddress: address(`p${port}_ddr_w`),
      inputSignal: `in_p${port}_cb`,
      outputSignal: `out_p${port}_cb`,
      outputMask: port === 2 ? outputMask : 0xff,
    })),
    portHandshake: {
      portIndex: 2,
      controlAddress: address('p3_csr_w'),
      inputLine: 2,
      latchEnableMask: constant('M6801_P3CSR_LE'),
      outputSelectMask: constant('M6801_P3CSR_OSS'),
      flagMask: constant('M6801_P3CSR_IS3_FLAG'),
    },
  };
}

function normalizeI8080Source(source: string): string {
  return normalizePairLocals(source);
}

function normalizeM6809Source(source: string): string {
  const wordLocals = new Set(
    [...source.matchAll(/\b(?:u?int16_t|[us]16)\s+([A-Za-z_]\w*)\b/g)]
      .map(match => match[1]!),
  );
  const usesWordValue = (expression: string): boolean =>
    /\b(?:m_\w+\.w|uint16_t|int16_t|u16|s16)\b/.test(expression) ||
    [...wordLocals].some(name => new RegExp(`\\b${name}\\b`).test(expression));
  const schedulerSafe = source
    .replace(
      /while\s*\(\s*!m_nmi_asserted\s*&&\s*!m_firq_line\s*&&\s*!m_irq_line\s*\)\s*\{[\s\S]*?\}/g,
      `if (!m_nmi_asserted && !m_firq_line && !m_irq_line) {
        m_sync_wait = true;
        m_halt = true;
        cycles += 1;
        return cycles;
      }`,
    )
    .replace(
      /while\s*\(\s*\(\s*m_ea\.w\s*=\s*get_pending_interrupt\s*\(\s*\)\s*\)\s*==\s*0\s*\)\s*\{[\s\S]*?\}/g,
      `if ((m_ea.w = get_pending_interrupt()) == 0) {
        m_cwai_wait = true;
        m_halt = true;
        cycles += 1;
        return cycles;
      }`,
    );
  let normalized = normalizeMameExecutionSource(schedulerSafe)
    .replaceAll('@', '')
    .replace(/\bm_q\.r\.a\b/g, 'm_d.b.h')
    .replace(/\bm_q\.r\.b\b/g, 'm_d.b.l')
    .replace(/\bm_q\.(?:r|p)\.d\b/g, 'm_d.w')
    .replace(/\bread_operand\s*\(\s*\)/g, 'read_operand0()')
    .replace(/\bread_operand\s*\(/g, 'read_operand1(')
    .replace(/\bwrite_operand\s*\(\s*([^,()]+)\s*\)/g, 'write_operand0($1)')
    .replace(/\bwrite_operand\s*\(/g, 'write_operand1(')
    .replace(/\bread_opcode_arg\s*\(\s*\)/g, 'ARG(POSTINC(m_pc.w))')
    .replace(/\bread_opcode\s*\(\s*\)/g, 'OPCODE(POSTINC(m_pc.w))')
    .replace(/\bread_vector\s*\(/g, 'READ_VECTOR(')
    .replace(/\bread_memory\s*\(/g, 'READ(')
    .replace(/\bwrite_memory\s*\(/g, 'WRITE(')
    .replace(/\bdummy_read_opcode_arg\s*\((.*?)\)\s*;/gs, 'cycles += 1;')
    .replace(/\bdummy_read_opcode\s*\((.*?)\)\s*;/gs, 'cycles += 1;')
    .replace(/\bdummy_vma\s*\((.*?)\)\s*;/gs, 'cycles += ($1);')
    .replace(/\beat\s*\(([^)]+)\)\s*;/g, 'cycles += $1;')
    .replace(/\bm_lic_func\s*\([^)]*\)\s*;/g, '')
    .replace(/\bm_syncack_write_func\s*\([^)]*\)\s*;/g, '')
    .replace(/\bdebugger_\w+\s*\([^;]*\)\s*;/g, '')
    .replace(/\bfatalerror\s*\([^;]*\)\s*;/g, '')
    .replace(/\bset_flags\s*<\s*uint8_t\s*>\s*\(/g, 'set_flags8(')
    .replace(/\bset_flags\s*<\s*uint16_t\s*>\s*\(/g, 'set_flags16(')
    .replace(/\brotate_left\s*<\s*uint8_t\s*>\s*\(/g, 'rotate_left8(')
    .replace(/\brotate_left\s*<\s*uint16_t\s*>\s*\(/g, 'rotate_left16(')
    .replace(/\brotate_right\s*<\s*uint8_t\s*>\s*\(/g, 'rotate_right8(')
    .replace(/\brotate_right\s*<\s*uint16_t\s*>\s*\(/g, 'rotate_right16(')
    .replace(/\((?:void)\)\s*/g, '')
    .replace(/\bireg\s*\(\s*\)\s*\+\+/g, 'set_ireg(ireg() + 1)')
    .replace(/\bireg\s*\(\s*\)\s*--/g, 'set_ireg(ireg() - 1)')
    .replace(/\bireg\s*\(\s*\)\s*\+=\s*([^;]+);/g, 'set_ireg(ireg() + ($1));')
    .replace(/\bireg\s*\(\s*\)\s*-=\s*([^;]+);/g, 'set_ireg(ireg() - ($1));')
    .replace(/\bm_ppc\s*=\s*m_pc\s*;/g, 'm_ppc.w = m_pc.w;');

  const reg8 = /\bset_regop8\s*\(\s*([^)]+)\s*\)\s*;/.exec(normalized)?.[1]?.trim();
  const reg16 = /\bset_regop16\s*\(\s*([^)]+)\s*\)\s*;/.exec(normalized)?.[1]
    ?.trim()
    .replace(/\.w$/, '');
  normalized = normalized
    .replace(/\bset_regop8\s*\([^)]+\)\s*;/g, '')
    .replace(/\bset_regop16\s*\([^)]+\)\s*;/g, '');
  if (reg8) normalized = normalized.replace(/\bregop8\s*\(\s*\)/g, reg8);
  if (reg16) {
    normalized = normalized.replace(
      /\(\s*&\s*regop16\s*\(\s*\)\s*==\s*&\s*m_s\s*\)\s*\?\s*([^:;]+)\s*:\s*([^,;)]+)/g,
      (_match, whenStack: string, otherwise: string) =>
        reg16 === 'm_s' ? whenStack.trim() : otherwise.trim(),
    );
    normalized = normalized
      .replace(
        /&\s*regop16\s*\(\s*\)\s*==\s*&\s*(m_\w+)/g,
        (_match, member: string) => reg16 === member ? '1' : '0',
      )
      .replace(/\(\s*1\s*\?\s*([\w.]+)\s*:\s*([\w.]+)\s*\)/g, '$1')
      .replace(/\(\s*0\s*\?\s*([\w.]+)\s*:\s*([\w.]+)\s*\)/g, '$2')
      .replace(/\(\s*1\s*\)\s*\?\s*([\w.]+)\s*:\s*([\w.]+)/g, '$1')
      .replace(/\(\s*0\s*\)\s*\?\s*([\w.]+)\s*:\s*([\w.]+)/g, '$2')
      .replace(/\bregop16\s*\(\s*\)/g, reg16);
  }

  normalized = normalized
    .replace(/\bset_flags(8|16)\s*\(([^;]+)\)/g,
      (_match, bits: string, argumentsSource: string) =>
        `set_flags${bits}${splitMameArgs(argumentsSource).length === 2 ? 'r' : ''}` +
        `(${argumentsSource})`)
    .replace(/\bset_flags\s*\(([^;]+)\)/g, (_match, argumentsSource: string) => {
      const args = splitMameArgs(argumentsSource);
      const width = usesWordValue(argumentsSource) ? 16 : 8;
      return `set_flags${width}${args.length === 2 ? 'r' : ''}(${argumentsSource})`;
    })
    .replace(/\brotate_left\s*\(([^)]+)\)/g, (_match, value: string) =>
      `rotate_left${/\b(?:m_\w+\.w|uint16_t|u16)\b/.test(value) ? 16 : 8}(${value})`)
    .replace(/\brotate_right\s*\(([^)]+)\)/g, (_match, value: string) =>
      `rotate_right${/\b(?:m_\w+\.w|uint16_t|u16)\b/.test(value) ? 16 : 8}(${value})`);
  return normalizePairLocals(normalized, false);
}

function extractKonami1Decrypt(
  source: string,
  header: string,
): NonNullable<GeneratedCpuDefinition['opcodeDecrypt']> {
  const boundary = Number(
    /m_boundary\s*=\s*(0x[\da-f]+|\d+)\s*;/i.exec(source)?.[1],
  );
  const mask = Number(
    /switch\s*\(\s*(?:adr|pc)\s*&\s*(0x[\da-f]+|\d+)\s*\)/i.exec(source)?.[1],
  );
  const body = /switch\s*\(\s*adr\s*&[^)]*\)\s*\{([\s\S]*?)\}/.exec(source)?.[1] ?? '';
  const xorByAddress: Record<string, number> = {};
  for (const match of body.matchAll(
    /case\s+(0x[\da-f]+|\d+)\s*:\s*return\s+\w+\s*\^\s*(0x[\da-f]+|\d+)/gi,
  )) {
    xorByAddress[String(Number(match[1]))] = Number(match[2]);
  }
  if (!Number.isFinite(boundary) || !Number.isFinite(mask) ||
      Object.keys(xorByAddress).length === 0 ||
      !/\bm_boundary\b/.test(header)) {
    throw new Error('MAME KONAMI1 opcode decryption source shape changed');
  }
  return { boundary, addressMask: mask, xorByAddress };
}

function normalizePairLocals(source: string, rewriteMemberPostfix = true): string {
  let normalized = source
    .replace(/\b(m_\w+)\.w\.l\b/g, '$1.w')
    .replace(/\b(m_\w+)\.d\b/g, '$1.w');
  if (rewriteMemberPostfix) {
    normalized = normalized
      .replace(/\b([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+)\+\+/g, 'POSTINC($1)')
      .replace(/\b([A-Za-z_]\w*(?:\.[A-Za-z_]\w*)+)--/g, 'POSTDEC($1)');
  }
  const pairDeclaration = /\bPAIR\s+(\w+(?:\s*,\s*\w+)*)\s*;/g;
  const pairLocals = [...normalized.matchAll(pairDeclaration)]
    .flatMap(match => match[1]!.split(',').map(name => name.trim()))
    .filter(name => /^\w+$/.test(name));
  normalized = normalized.replace(
    pairDeclaration,
    (_match, names: string) =>
      `u32 ${names.split(',').map(name => `${name.trim()} = 0`).join(', ')};`,
  );
  for (const name of pairLocals) {
    normalized = normalized
      .replace(new RegExp(`\\b${name}\\.b\\.l\\s*=\\s*([^;]+);`, 'g'),
        `${name} = (${name} & 0xff00) | (u8($1));`)
      .replace(new RegExp(`\\b${name}\\.b\\.h\\s*=\\s*([^;]+);`, 'g'),
        `${name} = (${name} & 0x00ff) | (u16($1) << 8);`)
      .replace(new RegExp(`\\b${name}\\.w\\.l\\b`, 'g'), name)
      .replace(new RegExp(`\\b${name}\\.(?:w|d)\\b`, 'g'), name)
      .replace(new RegExp(`\\b${name}\\.b\\.l\\b`, 'g'), `u8(${name})`)
      .replace(new RegExp(`\\b${name}\\.b\\.h\\b`, 'g'), `u8(${name} >> 8)`);
  }
  return normalized;
}

function singleIterationSource(source: string): string {
  const doMatch = /(?:^|\n)\s*do\s*\n/.exec(source);
  const doAt = doMatch?.index ?? -1;
  const open = source.indexOf('{', doAt);
  const close = matchBrace(source, open);
  if (doAt < 0 || open < 0 || close < 0) {
    throw new Error('MAME I8080 execute_run source shape changed');
  }
  return `m_icount = 0;\n${source.slice(0, doAt)}\n${source.slice(open + 1, close)}\nreturn -m_icount;`;
}

function extractGlobalConstants(source: string): Record<string, number> {
  const expressions = new Map<string, string>();
  for (const match of source.matchAll(/\bconstexpr\s+\w+\s+(\w+)\s*=\s*([^;]+);/g)) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  return resolveConstants(expressions);
}

function extractNumericArray(source: string, name: string): number[] {
  const match = new RegExp(`${name}\\s*\\[[^\\]]+\\]\\s*=\\s*\\{([\\s\\S]*?)\\};`).exec(source);
  if (!match) throw new Error(`MAME I8080 source is missing ${name}`);
  const values = match[1]!
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split(',')
    .map(value => Number(value.trim()))
    .filter(Number.isFinite);
  if (values.length !== 256) throw new Error(`${name} contains ${values.length}, expected 256`);
  return values;
}

/**
 * The debugger register names a core publishes, from its own `state_add` calls.
 *
 * `memberBits` lets a caller say how wide each member really is. A whole-member
 * alias is as wide as the member -- the LR35902 exposes "PC" as the bare
 * 16-bit `m_PC`, where a PAIR16 core exposes it as `m_PC.w.l` -- and without
 * that a register checkpoint would read back a truncated byte.
 */
function extractStateAliases(
  source: string,
  memberBits: Record<string, 1 | 8 | 16 | 32> = {},
): Record<string, GeneratedCpuAlias> {
  const aliases: Record<string, GeneratedCpuAlias> = {};
  for (const match of source.matchAll(
    /state_add\(\s*[^,]+,\s*"([A-Z]+)"\s*,\s*(m_\w+)(?:(\.w\.l|\.d)|\.b\.(h|l))?\s*\)/g,
  )) {
    const part = match[4] === 'h'
      ? 'high'
      : match[4] === 'l'
        ? 'low'
        : match[3]
          ? 'word'
          : 'scalar';
    aliases[match[1]!] = {
      member: match[2]!,
      part,
      bits: part === 'word' ? 16 : part === 'scalar' ? memberBits[match[2]!] ?? 8 : 8,
    };
  }
  return aliases;
}

function inlineMethodForClass(
  source: string,
  name: string,
  className: string,
): { parameters: string; body: string; start: number } | undefined {
  const classAt = source.indexOf(`class ${className}`);
  const open = source.indexOf('{', classAt);
  const close = matchBrace(source, open);
  if (classAt < 0 || open < 0 || close < 0) return undefined;
  return extractInlineMethods(source.slice(open + 1, close))
    .find(method => method.name === name);
}

function compileOpcodeOperations(
  operations: OpcodeDslOperation[],
  options: { continueAsReturn?: boolean } = {},
): GeneratedHandlerProgram {
  const source = operations.flatMap(operation => {
    const text = operation.text.trim();
    if (!text || text.startsWith('//') || text === 'goto process;') return [];
    if (text.startsWith('#')) return [];
    if (options.continueAsReturn && text === 'continue;') return ['return;'];
    if (operation.kind === 'cycle') return [`cycles += ${operation.cycles};`];
    if (operation.kind === 'interruptible-access') {
      return [text, `cycles += ${operation.cycles};`];
    }
    return [text];
  }).join('\n');
  return compileMameHandler(normalizeMameExecutionSource(source));
}

export function normalizeMameExecutionSource(source: string): string {
  let normalized = stripTracingCalls(stripInactivePreprocessorBranches(source))
    .replace(/^[ \t]*#if\s+0[^\r\n]*\r?\n[\s\S]*?^[ \t]*#endif[^\r\n]*(?:\r?\n|$)/gm, '')
    .replaceAll('[[fallthrough]];', '')
    .replace(/\bstatic_assert\s*\([^;]*\)\s*;/g, '')
    .replace(/\bbitswap\s*<\s*\d+\s*>\s*\(/g, 'BITSWAP(')
    .replace(/\bDEGREE_TO_RADIAN\s*<[^>]+>\s*\(/g, 'DEGREE_TO_RADIAN(')
    .replace(
      /\bdo\s*\{([^{}]*)\}\s*while\s*\(\s*--(\w+)\s*\)\s*;/g,
      (_entry, body: string, counter: string) =>
        `while (${counter}) { ${body}; ${counter}--; }`,
    )
    .replace(
      /\bset_service_attention\s*<\s*([^,>]+)\s*,\s*([^>]+)\s*>\s*\(\s*\)/g,
      'set_service_attention($1, $2)',
    )
    .replace(
      /\bget_service_attention\s*<\s*([^>]+)\s*>\s*\(\s*\)/g,
      'get_service_attention($1)',
    )
    // Match within a single line only: with \s+ the type-word chain could
    // reach back across a newline into a preceding // comment ("// character
    // palette\n const uint8_t *char_pal = ..."), splicing the declaration into
    // the comment and silently deleting it (Moon Patrol's init_palette).
    .replace(
      /\b(?:[\w:<>]+[ \t]+)+\*[ \t]*(?:const[ \t]+)?(\w+)[ \t]*=/g,
      'auto $1 =',
    )
    // Driver lifecycle handlers use the standard spelling when ownership is
    // retained by a unique_ptr (Phoenix's two banked video pages are the
    // canonical case).  The handler IR has a byte-array ALLOC primitive, so
    // lower the exact uint8_t/u8 array form without guessing the element width
    // of other std::make_unique specializations.
    .replace(
      /\bstd::make_unique\s*<\s*(?:u8|uint8_t)\s*\[\s*\]\s*>\s*\(/g,
      'ALLOC(',
    )
    .replace(/\bmake_unique_clear\s*<[^>]*\[\]>\s*\(/g, 'ALLOC(');
  for (const match of normalized.matchAll(
    /\bstatic\s+(?:const|constexpr)\s+\w+\s+(\w+)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/g,
  )) {
    const name = match[1]!;
    const columns = Number(match[3]);
    const values = [...match[4]!.matchAll(/\{([^{}]*)\}/g)]
      .flatMap(row => row[1]!
        .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')
        .split(',')
        .map(value => value.trim())
        .filter(Boolean));
    if (values.length !== Number(match[2]) * columns) continue;
    normalized = normalized
      .replace(match[0], '')
      .replace(
        new RegExp(
          `\\b${name}\\s*\\[((?:[^\\[\\]]|\\[[^\\]]*\\])*)\\]` +
          `\\s*\\[((?:[^\\[\\]]|\\[[^\\]]*\\])*)\\]`,
          'g',
        ),
        (_entry, row: string, column: string) =>
          `TABLE((${row}) * ${columns} + (${column}), ${values.join(', ')})`,
      );
  }
  for (const match of normalized.matchAll(
    /\bstatic\s+(?:const|constexpr)\s+\w+\s+(\w+)\s*\[[^\]]+\]\s*=\s*\{([^}]+)\}\s*;/g,
  )) {
    const name = match[1]!;
    // Comments go before the split, as the two-dimensional folder above already
    // does. MAME annotates hand-aligned tables per entry -- TIA's write-delay
    // table names the register on every line -- and folding the comment into
    // the value made the rest of the emitted TABLE(...) call one comment.
    const values = match[2]!
      .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')
      .split(',')
      .map(value => value.trim())
      .filter(Boolean);
    normalized = normalized
      .replace(match[0], '')
      .replace(
        new RegExp(`\\b${name}\\s*\\[((?:[^\\[\\]]|\\[[^\\]]*\\])*)\\]`, 'g'),
        (_entry, index: string) => `TABLE(${index}, ${values.join(', ')})`,
      );
  }
  return normalized;
}

/**
 * Replace MAME's diagnostic-only calls with a harmless expression. A balanced
 * scan is required because log arguments often contain initializer lists and
 * nested calls that cannot be removed safely with a regular expression.
 */
function stripTracingCalls(source: string): string {
  const call = /\b(?:LOG[A-Z0-9_]*|logerror|popmessage)\s*\(/g;
  let output = '';
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = call.exec(source)) !== null) {
    let depth = 1;
    let quote = '';
    let escaped = false;
    let index = call.lastIndex;
    for (; index < source.length && depth; index++) {
      const char = source[index]!;
      if (quote) {
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === quote) quote = '';
        continue;
      }
      if (char === '"' || char === '\'') quote = char;
      else if (char === '(') depth++;
      else if (char === ')') depth--;
    }
    if (depth) break;
    output += source.slice(cursor, match.index) + 'TRACE_NOOP()';
    cursor = index;
    call.lastIndex = index;
  }
  return output + source.slice(cursor);
}

function stripInactivePreprocessorBranches(source: string): string {
  let normalized = source;
  const branch =
    /^[ \t]*#(ifdef|ifndef)\s+\w+[^\r\n]*\r?\n([\s\S]*?)(?:^[ \t]*#else[^\r\n]*\r?\n([\s\S]*?))?^[ \t]*#endif[^\r\n]*(?:\r?\n|$)/gm;
  for (let pass = 0; pass < 8; pass++) {
    let changed = false;
    normalized = normalized.replace(
      branch,
      (_match, directive: string, primary: string, alternate = '') => {
        changed = true;
        return directive === 'ifndef' ? primary : alternate;
      },
    );
    if (!changed) break;
  }
  return normalized;
}

function stripMameFrameworkSetup(body: string): string {
  return body
    .split(/\r?\n/)
    .filter(line => {
      const text = line.trim();
      return !text.startsWith('save_item(') &&
        !text.startsWith('space(') &&
        // Caching the address space in a member is the same framework setup
        // written the other common way (`m_program = &space(AS_PROGRAM);`);
        // the host supplies the bus, so there is nothing to assign.
        !/^m_\w+\s*=\s*&?\s*space\s*\(/.test(text) &&
        !text.startsWith('state_add(') &&
        !text.startsWith('set_icountptr(');
    })
    .join('\n');
}

function extractAliases(source: string, header: string): Record<string, GeneratedCpuAlias> {
  const memberBits = Object.fromEntries(extractMembers(header, {}).map(member => [
    member.name,
    member.bits ?? 32,
  ]));
  const aliases: Record<string, GeneratedCpuAlias> = {};
  for (const match of source.matchAll(/^\s*#define\s+(\w+)\s+([^/\r\n]+)/gm)) {
    const name = match[1]!;
    const value = match[2]!.trim();
    let target: RegExpExecArray | null;
    if ((target = /^(m_\w+)\.w$/.exec(value))) {
      aliases[name] = { member: target[1]!, part: 'word', bits: 16 };
    } else if ((target = /^(m_\w+)\.b\.h$/.exec(value))) {
      aliases[name] = { member: target[1]!, part: 'high', bits: 8 };
    } else if ((target = /^(m_\w+)\.b\.l$/.exec(value))) {
      aliases[name] = { member: target[1]!, part: 'low', bits: 8 };
    } else if ((target = /^(m_\w+)$/.exec(value))) {
      const bits = memberBits[target[1]!] ?? 32;
      aliases[name] = {
        member: target[1]!,
        part: 'scalar',
        bits: bits === 1 || bits === 8 || bits === 16 ? bits : 32,
      };
    } else if ((target = /^(m_f)\.(\w+)$/.exec(value))) {
      aliases[name] = { member: `${target[1]}.${target[2]}`, part: 'scalar', bits: 8 };
    }
  }
  return aliases;
}

function extractMembers(
  header: string,
  objectFields: Record<string, 1 | 8 | 16 | 32>,
): GeneratedCpuMember[] {
  const members = new Map<string, GeneratedCpuMember>();
  for (const match of header.matchAll(/^\s*PAIR16\s+(m_\w+)\s*;/gm)) {
    members.set(match[1]!, { name: match[1]!, bits: 16, pair: true });
  }
  for (const match of header.matchAll(
    /^\s*(bool|u8|u16|u32|int)\s+(m_\w+)\s*(?:\[[^\]]+\])?\s*;/gm,
  )) {
    const bits = typeBits(match[1]!);
    members.set(match[2]!, { name: match[2]!, bits });
  }
  members.set('m_f', { name: 'm_f', fields: objectFields });
  members.set('cycles', { name: 'cycles', bits: 32 });
  return [...members.values()].sort((left, right) => left.name.localeCompare(right.name));
}

function declaredFields(source: string): Record<string, 1 | 8 | 16 | 32> {
  const fields: Record<string, 1 | 8 | 16 | 32> = {};
  for (const match of source.matchAll(/^\s*(bool|u8|u16|u32|int)\s+(\w+)\s*;/gm)) {
    fields[match[2]!] = typeBits(match[1]!);
  }
  return fields;
}

function typeBits(type: string): 1 | 8 | 16 | 32 {
  if (type === 'bool') return 1;
  if (type === 'u8') return 8;
  if (type === 'u16') return 16;
  return 32;
}

function extractDefineConstants(source: string): Record<string, number> {
  const expressions = new Map<string, string>();
  for (const match of source.matchAll(/^\s*#define\s+(\w+)\s+([^/\r\n]+)/gm)) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  return resolveConstants(expressions);
}

function extractConstexprConstants(source: string): Record<string, number> {
  const expressions = new Map<string, string>();
  for (const match of source.matchAll(
    /\bstatic\s+constexpr\s+\w+\s+(\w+)\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  return resolveConstants(expressions);
}

/**
 * Enumerator values declared in a CPU header.
 *
 * Comments are removed by the scanner, not by a pattern, and that is load
 * bearing twice over. A block comment holding a comma splits one enumerator
 * into two entries and silently shifts every value after it: i86.h annotates
 * its BASE_CYCLES table that way, so `NOP` came out 14 instead of 21 and every
 * `CLK`/`CLKM` charge indexed the wrong m_timing slot. Taking the block
 * comments out with a regex instead is worse -- MAME's section banners are
 * lines of slash-slash-stars, whose second character pair reads as an opener
 * that then swallows the rest of the header, which is exactly how m6809.h
 * loses all six of its enums.
 */
function extractEnumConstants(
  source: string,
  seed: Record<string, number>,
): Record<string, number> {
  const resolved = { ...seed };
  for (const match of stripCppComments(source).matchAll(/\benum(?:\s+\w+)?\s*\{([\s\S]*?)\};/g)) {
    let next = 0;
    for (const rawEntry of match[1]!.split(',')) {
      const entry = rawEntry.trim();
      if (!entry) continue;
      const parsed = /^(\w+)(?:\s*=\s*([\s\S]+))?$/.exec(entry);
      if (!parsed) continue;
      if (parsed[2]) {
        const expression = parsed[2]!.replace(/\b[A-Za-z_]\w*\b/g, token =>
          Object.hasOwn(resolved, token) ? String(resolved[token]) : token);
        if (/^[\dxa-fA-F\s()+\-~|&<>]+$/.test(expression)) {
          try {
            const value = Function(`"use strict"; return (${expression});`)();
            if (typeof value === 'number') next = value;
          } catch {
            continue;
          }
        } else {
          continue;
        }
      }
      resolved[parsed[1]!] = next++;
    }
  }
  for (const key of Object.keys(seed)) delete resolved[key];
  return resolved;
}

function extractConstructorInitializers(
  source: string,
  className: string,
): Record<string, number> {
  const initial: Record<string, number> = {};
  const re = new RegExp(
    `${className}::${className}\\s*\\([^)]*\\)\\s*:\\s*([\\s\\S]*?)\\n\\s*\\{`,
    'g',
  );
  let match: RegExpExecArray | null;
  while ((match = re.exec(source)) !== null) {
    for (const initializer of match[1]!.matchAll(/\b(m_\w+)\s*\(\s*(0x[\da-f]+|\d+)\s*\)/gi)) {
      initial[initializer[1]!] = Number(initializer[2]);
    }
  }
  return initial;
}

function resolveConstants(expressions: Map<string, string>): Record<string, number> {
  const resolved: Record<string, number> = {};
  let changed = true;
  while (changed) {
    changed = false;
    for (const [name, source] of expressions) {
      if (Object.hasOwn(resolved, name)) continue;
      const normalized = source.replace(/\b[A-Za-z_]\w*\b/g, token =>
        Object.hasOwn(resolved, token) ? String(resolved[token]) : token);
      if (!/^[\dxa-fA-F\s()+\-~|&<>]+$/.test(normalized)) continue;
      try {
        // MAME constant expressions are trusted input and restricted above.
        const value = Function(`"use strict"; return (${normalized});`)();
        if (typeof value === 'number' && Number.isFinite(value)) {
          resolved[name] = value;
          changed = true;
        }
      } catch {
        // The unresolved constant is retained as a compiler diagnostic later.
      }
    }
  }
  return resolved;
}

function extractObject(
  source: string,
  objectName: string,
): {
  body: string;
  methods: { name: string; parameters: string; body: string; start: number }[];
  start: number;
  end: number;
} | undefined {
  const endMatch = new RegExp(`\\}\\s*${objectName}\\s*;`).exec(source);
  if (!endMatch) return undefined;
  const end = endMatch.index;
  let open = source.lastIndexOf('struct', end);
  open = source.indexOf('{', open);
  if (open < 0) return undefined;
  const close = matchBrace(source, open);
  if (close !== end) return undefined;
  const body = source.slice(open + 1, close);
  const methods: { name: string; parameters: string; body: string; start: number }[] = [];
  const methodRe =
    /(?:^|\n)\s*(?:[\w:<>,~*&]+\s+)+(\w+)\s*\(([^;{}]*)\)\s*(?:const\s*)?\{/g;
  let match: RegExpExecArray | null;
  while ((match = methodRe.exec(body)) !== null) {
    const brace = body.indexOf('{', match.index + match[0].length - 1);
    const methodEnd = matchBrace(body, brace);
    if (methodEnd < 0) continue;
    methods.push({
      name: match[1]!,
      parameters: match[2]!,
      body: body.slice(brace + 1, methodEnd),
      start: open + 1 + match.index,
    });
    methodRe.lastIndex = methodEnd + 1;
  }
  return { body, methods, start: open, end: close };
}

function extractInlineMethods(
  source: string,
  exclude?: [number, number],
): { name: string; parameters: string; body: string; start: number }[] {
  const methods: { name: string; parameters: string; body: string; start: number }[] = [];
  const methodRe =
    /(?:^|\n)\s*(?:template\s*<([^>]+)>\s*)?(?:(?:virtual|static|constexpr|inline)\s+)*(?:[\w:<>,~*&]+\s+)+(\w+)\s*\(([^;{}]*)\)\s*(?:const\s*)?(?:noexcept\s*)?(?:override\s*)?(?:ATTR_\w+\s*)?\{/g;
  let match: RegExpExecArray | null;
  while ((match = methodRe.exec(source)) !== null) {
    if (exclude && match.index >= exclude[0] && match.index <= exclude[1]) continue;
    const brace = source.indexOf('{', match.index + match[0].length - 1);
    const end = matchBrace(source, brace);
    if (end < 0) continue;
    const templateParameters = (match[1] ?? '')
      .split(',')
      .map(parameter => parameter.trim())
      .filter(Boolean);
    const parameters = [
      ...templateParameters,
      ...match[3]!.split(',').map(parameter => parameter.trim()).filter(Boolean),
    ].join(', ');
    methods.push({
      name: match[2]!,
      parameters,
      body: source.slice(brace + 1, end),
      start: match.index,
    });
    methodRe.lastIndex = end + 1;
  }
  return methods;
}

function qualifyObjectFields(
  source: string,
  objectName: string,
  fields: string[],
): string {
  let qualified = source;
  for (const field of fields) {
    qualified = qualified.replace(
      new RegExp(`(?<![\\w.])${field}\\b`, 'g'),
      `${objectName}.${field}`,
    );
  }
  return qualified;
}

function matchBrace(source: string, open: number): number {
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) return index;
  }
  return -1;
}

function matchPair(
  source: string,
  open: number,
  left: string,
  right: string,
): number {
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === left) depth++;
    else if (source[index] === right && --depth === 0) return index;
  }
  return -1;
}

function lineAt(source: string, offset: number): number {
  return source.slice(0, offset).split('\n').length;
}

function sourceRef(file: string, line: number): BoardSourceRef {
  return { file, line };
}

/**
 * Compile MAME's Sharp LR35902 — the Game Boy's processor.
 *
 * Like the 8080/8085 core this chip has no opcode DSL. `execute_run` is a
 * single do-while whose body is either a fetch or an execute half-step, and
 * the 256 execute cases live in two `.hxx` files `#include`d straight into
 * the switch. Those files are written against C preprocessor *statement*
 * macros — `INC_8BIT(x)`, `ADD_A_X(x)`, `PUSH(x,y)`, `RES_8BIT(n,x)` — so the
 * includes are resolved and the macros expanded before the resulting ordinary
 * C++ is lowered. Nothing about the instruction set is restated here.
 */
export function compileMameLr35902(mameSrc: string): GeneratedCpuDefinition {
  const cppFile = 'src/devices/cpu/lr35902/lr35902.cpp';
  const headerFile = 'src/devices/cpu/lr35902/lr35902.h';
  const mainOpcodeFile = 'src/devices/cpu/lr35902/opc_main.hxx';
  const cbOpcodeFile = 'src/devices/cpu/lr35902/opc_cb.hxx';
  const cpp = readFileSync(join(mameSrc, cppFile), 'utf8');
  const header = readFileSync(join(mameSrc, headerFile), 'utf8');
  const mainOpcodes = readFileSync(join(mameSrc, mainOpcodeFile), 'utf8');
  const cbOpcodes = readFileSync(join(mameSrc, cbOpcodeFile), 'utf8');

  const unit = parseMameSource(cppFile, cpp);
  const sourceMethods = unit.functions.filter(fn => fn.className === 'lr35902_cpu_device');
  const find = (name: string) => sourceMethods.find(fn => fn.name === name);
  const startMethod = find('device_start');
  const resetMethod = find('device_reset');
  const inputMethod = find('execute_set_input');
  const runMethod = find('execute_run');
  if (!startMethod || !resetMethod || !inputMethod || !runMethod) {
    throw new Error('MAME LR35902 source is missing start/reset/input/execute definitions');
  }

  // A devcb is configured through the accessor MAME names it by and called
  // through the member it is stored in: `timer_cb()` binds `m_timer_func`.
  // The knowledge graph records the machine-config side, so the call site is
  // renamed to the accessor rather than the other way round -- a rename
  // upstream then shows up as an unbound signal instead of a silent no-op.
  const devcbAliases = lr35902DevcbAliases(header);
  const normalize = (source: string): string => {
    let normalized = normalizeMameExecutionSource(source);
    for (const [member, accessor] of Object.entries(devcbAliases)) {
      normalized = normalized.replace(new RegExp(`\\b${member}\\b`, 'g'), accessor);
    }
    return normalized;
  };

  const excluded = new Set([
    'memory_space_config',
    'device_start',
    'device_reset',
    'state_string_export',
    'create_disassembler',
    'execute_run',
    'execute_min_cycles',
    'execute_max_cycles',
  ]);
  const methods = sourceMethods
    .filter(fn => !excluded.has(fn.name))
    .map(fn => ({
      name: fn.name,
      parameters: fn.parameters,
      program: compileMameHandler(normalize(fn.body)),
      source: sourceRef(cppFile, fn.span.line),
    }));
  // The driver reaches the interrupt-enable and interrupt-flag registers, and
  // the OAM DMA cycle debt, through one-line accessors defined in the header
  // rather than the .cpp; they are as much part of the core as check_interrupts.
  const accessors = new Set(Object.values(devcbAliases).map(name => name.slice(2)));
  for (const inline of extractInlineMethods(header)) {
    // A devcb accessor is machine configuration, not behaviour: it hands the
    // binding back to the config pass. Emitting it as a method would put a
    // second, do-nothing `timer_cb` beside the signal the call site raises.
    if (accessors.has(inline.name) || excluded.has(inline.name)) continue;
    if (methods.some(method => method.name === inline.name)) continue;
    const program = compileMameHandler(normalize(inline.body));
    if (program.diagnostics.length) continue;
    methods.push({
      name: inline.name,
      parameters: inline.parameters,
      program,
      source: sourceRef(headerFile, lineAt(header, inline.start)),
    });
  }

  const step = compileMameHandler(normalize(singleIterationSource(
    lr35902ExecuteSource(runMethod.body, mainOpcodes, cbOpcodes),
  )));
  const start = compileMameHandler(normalize(stripMameFrameworkSetup(startMethod.body)));
  const reset = compileMameHandler(normalize(resetMethod.body));
  const input = compileMameHandler(
    normalize(inputMethod.body).replace(/\binptnum\b/g, 'inputnum'),
  );

  const constants = {
    ...extractDefineConstants(cpp),
    ...extractEnumConstants(cpp, {}),
    ...extractEnumConstants(header, {}),
    CLEAR_LINE: 0,
    ASSERT_LINE: 1,
  };
  const service = compileMameHandler('');
  const fetch = compileMameHandler('');
  const members = lr35902Members(header);
  const programs = [start, reset, input, step, ...methods.map(method => method.program)];
  return {
    schemaVersion: 1,
    type: 'LR35902',
    dialect: 'mame-cpp-switch',
    sourceFiles: [cppFile, headerFile, mainOpcodeFile, cbOpcodeFile],
    constants,
    aliases: extractStateAliases(
      startMethod.body,
      Object.fromEntries(members.map(member => [member.name, member.bits ?? 32])),
    ),
    members,
    methods,
    start,
    reset,
    input,
    step,
    service,
    fetch,
    opcodes: [],
    summary: {
      opcodes: 256,
      compiledOpcodes: step.diagnostics.length ? 0 : 256,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
  };
}

/**
 * `execute_run` with both opcode includes resolved and their statement macros
 * expanded.
 *
 * The `.hxx` files are not headers in any useful sense: each is a bare list of
 * `case` labels that only compiles inside the `switch` it is included into, so
 * textual substitution is exactly what MAME's own build does.
 */
function lr35902ExecuteSource(
  runBody: string,
  mainOpcodes: string,
  cbOpcodes: string,
): string {
  const include = (source: string): string => {
    const macros = collectFunctionMacros(source);
    const joined = source.replace(/\\[ \t]*\r?\n/g, ' ');
    const cases = joined.replace(/^[ \t]*#define[^\n]*$/gm, '');
    return expandFunctionMacros(cases, macros);
  };
  const main = include(mainOpcodes)
    .replace(/^[ \t]*#include\s+"opc_cb\.hxx"[^\n]*$/m, () => include(cbOpcodes));
  if (main.includes('#include')) {
    throw new Error('MAME LR35902 opcode source has an unresolved include');
  }
  const resolved = runBody.replace(/^[ \t]*#include\s+"opc_main\.hxx"[^\n]*$/m, () => main);
  if (resolved === runBody) {
    throw new Error('MAME LR35902 execute_run no longer includes opc_main.hxx');
  }
  return resolved;
}

/**
 * Members declared by the LR35902 header, with the widths MAME gives them.
 *
 * `extractMembers` reads the short MAME spellings (`u8`, `u16`); this core is
 * written in the long ones, and its cycle budget is a signed `int` that is
 * meant to go negative, so that one is declared without a width.
 */
function lr35902Members(header: string): GeneratedCpuMember[] {
  const widths: Record<string, 1 | 8 | 16 | 32> = {
    bool: 1, uint8_t: 8, u8: 8, uint16_t: 16, u16: 16, uint32_t: 32, u32: 32, int: 32,
  };
  const members: GeneratedCpuMember[] = [];
  for (const match of header.matchAll(
    /^\s*(bool|u8|u16|u32|int|uint8_t|uint16_t|uint32_t)\s+(m_\w+)\s*;/gm,
  )) {
    const name = match[2]!;
    members.push(name === 'm_icount' ? { name } : { name, bits: widths[match[1]!]! });
  }
  if (!members.some(member => member.name === 'm_icount')) {
    throw new Error('MAME LR35902 header no longer declares m_icount');
  }
  return members.sort((left, right) => left.name.localeCompare(right.name));
}

/**
 * Each devcb member of the LR35902, keyed to the configuration accessor that
 * binds it — `auto timer_cb() { return m_timer_func.bind(); }`.
 */
function lr35902DevcbAliases(header: string): Record<string, string> {
  const aliases: Record<string, string> = {};
  for (const match of header.matchAll(
    /\bauto\s+(\w+)\s*\(\s*\)\s*\{\s*return\s+(m_\w+)\.bind\s*\(\s*\)\s*;\s*\}/g,
  )) {
    aliases[match[2]!] = `m_${match[1]!}`;
  }
  if (!Object.keys(aliases).length) {
    throw new Error('MAME LR35902 header declares no devcb accessors');
  }
  return aliases;
}
