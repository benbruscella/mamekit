import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import type { BoardSourceRef, GeneratedHandlerProgram } from '../ir/board.ts';
import { HOST_INPUT_LINES } from '../ir/board.ts';
import { parseMameAst, parseMameSource, splitMameArgs } from './ast.ts';
import { compileMameHandler } from './handler-ir.ts';
import { indexMameHardware } from './hardware.ts';
import { stripCppComments } from './initializer.ts';
import {
  collectDynamicMacros,
  collectFunctionMacros,
  expandDynamicMacros,
  expandFunctionMacros,
} from './preprocessor.ts';
import { lowerMemberPointerCalls } from './member-pointers.ts';

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
  /**
   * MAME's 32-bit `PAIR` union rather than `PAIR16`: `.d` is the doubleword,
   * `.w.h`/`.w.l` its halves and `.b.h`/`.b.l` the bytes of the low word.
   */
  pair32?: boolean;
  /**
   * Array contents. Numbers for ordinary tables; a table of member-function
   * pointers holds method names (and nests, for `s_pixel_write_ops[4][6]`).
   */
  values?: unknown[];
  fields?: Record<string, 1 | 8 | 16 | 32>;
  initial?: number;
  /** Little-endian overlapping word/byte register file (x86/NEC style). */
  wordByteRegisters?: number;
  /** A member-function pointer: holds a method name, empty for nullptr. */
  text?: boolean;
  /**
   * A pointer to another device that the host sets from the machine's
   * configuration -- the Z80's daisy-chain head, `m_chain` -- rather than
   * state the core keeps: never part of a save state.
   */
  link?: boolean;
  /**
   * Store \`values\` in a typed array of the member's width, so a host that is
   * handed the member's address (\`&m_shiftreg[0]\`) can copy into it.
   */
  typed?: boolean;
  /**
   * TMS34010 register file: N unions of `int32_t reg` and `XY { int16 x, y }`,
   * little-endian, so `xy.x` is the low half of `reg`.
   */
  xyRegisters?: number;
}

export interface GeneratedCpuMethod {
  name: string;
  parameters: string;
  /**
   * The C return type, when the core states C types: `int16_t PARAM_WORD()`
   * returns a sign-extended word, and the emitter narrows to it on return.
   */
  returnType?: string;
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
  /**
   * Emit C++ integer semantics from declared types: arithmetic right shift of
   * signed values, 32-bit wrapping multiply, and exact 64-bit locals. Opt-in,
   * because older cores were written against the unsigned-shift default.
   */
  cIntegerTypes?: boolean;
  /** An unresolvable call fails code generation instead of emitting 0. */
  strictCalls?: boolean;
  /**
   * A method the core's own timer calls at the start of every scanline, with
   * the line number: a timer re-armed at `screen().time_until_pos(line)`.
   */
  scanlineTimer?: string;
  /**
   * Machine-configuration setters that bind a delegate, and the delegate each
   * binds: `set_shiftreg_in_callback` -> `to_shiftreg_cb`.
   */
  delegateSetters?: Record<string, string>;
  /**
   * One-line state accessors from the core's header, by method name: a
   * driver asking `m_maincpu->get_sync()` reads the member it returns.
   */
  accessors?: Record<string, string>;
  /** Opcode-table timing already includes every memory access for the instruction. */
  fixedInstructionCycles?: boolean;
  /**
   * MAME's core can stop between the cycles of one instruction
   * (`m_inst_substate`), so a timer falls due before the instruction's later
   * accesses (hardware/cpu/extract.ts `withSuspensionFact`).
   */
  suspendsMidInstruction?: boolean;
  sourceFiles: string[];
  constants: Record<string, number>;
  aliases: Record<string, GeneratedCpuAlias>;
  /**
   * MAME's device_state_interface entries, from the core's own `state_add`
   * calls: what `set_state_int(index, value)` writes, and whether the core's
   * `state_import` then runs for it (`.callimport()`). A snapshot loader
   * restores a whole Z80 through these.
   */
  stateEntries?: { index: number; name: string; target: GeneratedCpuAlias; import?: true; mask?: number }[];
  members: GeneratedCpuMember[];
  methods: GeneratedCpuMethod[];
  /** Source callback members mapped to their machine-configuration binders. */
  callbacks?: Record<string, string>;
  start: GeneratedHandlerProgram;
  reset: GeneratedHandlerProgram;
  /**
   * A reset MAME runs as the core's next instruction rather than inside
   * device_reset (the 6502 family's STATE_RESET): the first step after a
   * reset executes it and is charged its cycles.
   */
  resetInstruction?: GeneratedHandlerProgram;
  input: GeneratedHandlerProgram;
  /**
   * The names execute_set_input gives its two parameters in the core's own
   * source (`int irqline, int state`); `inputnum, state` when absent.
   */
  inputParameters?: [string, string];
  /** Source-derived execution of exactly one instruction or interrupt. */
  step?: GeneratedHandlerProgram;
  /** Before each instruction, when there is no `step`: interrupts and waits. */
  service?: GeneratedHandlerProgram;
  /** The opcode fetch into `m_ref`, when there is no `step`. */
  fetch?: GeneratedHandlerProgram;
  opcodes: GeneratedCpuOpcode[];
  opcodeDecrypt?: {
    boundary: number;
    addressMask: number;
    xorByAddress: Record<string, number>;
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
 * Compile the original 24-bit Motorola 68000 from MAME's generated Musashi
 * handler and decode tables.  MAME keeps one full-instruction function per
 * decode state; the opcode table expands those states across all 65,536
 * opcodes, so the emitted core retains the compact state dispatch rather than
 * duplicating identical programs for every register encoding.
 */
/**
 * The Musashi family members this compiler can emit, and what distinguishes
 * them. MAME's generated m68kops.cpp carries one decode row per handler
 * variant with a cycle column per CPU type (0xff = not on this CPU), and each
 * `init_cpu_*` picks its column with `m68ki_instruction_state_table[n]`. The
 * variant is therefore a column and an initializer, not a separate core.
 */
const M68000_VARIANTS = {
  M68000: { column: 0, initializer: 'init_cpu_m68000', formatWord: false, prefetch: false },
  // init_cpu_m68010: `m_state_table = m68ki_instruction_state_table[2]`.
  // MAME's 68010 is still the Musashi core, prefetch queue included; its 68000
  // is the microcoded m68000_device, which this core already matches.
  M68010: { column: 2, initializer: 'init_cpu_m68010', formatWord: true, prefetch: true },
} as const;

export function compileMameM68000(
  mameSrc: string,
  variant: keyof typeof M68000_VARIANTS = 'M68000',
): GeneratedCpuDefinition {
  const cpu = M68000_VARIANTS[variant];
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
    // The column this CPU type reads. Taking column 0 for every variant built
    // Atari System 1's 68010 as a 68000: its `_71` handlers -- the RTE that
    // pops the 68010 format word, MOVEC -- were never selected at all.
    const cycles = row.cycles[cpu.column]!;
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
  methods.push(...m68000SupportMethods(operationsFile, cpu.formatWord, cpu.prefetch));

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
${cpu.prefetch ? `    // m68kcpu.cpp device_reset: "Invalidate the prefetch queue", then
    // execute_run reads both vectors as immediates from address 0.
    m_pref_addr = 0x1000;
    m_pc = 0;
    m_dar[15] = m68ki_read_imm_32();
    m_sp[4] = m_dar[15];
    m_pc = m68ki_read_imm_32();` : `    m_dar[15] = m68ki_read_32(0);
    m_sp[4] = m_dar[15];
    m_pc = m68ki_read_32(4);`}
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
  const headerConstantsRead = headerConstants(mameSrc, readFileSync(join(mameSrc, headerFile), 'utf8'));
  const constants = {
    ...headerConstantsRead,
    ...m68000CycleConstants(dataFile, dataSource, operations, cpu.initializer),
    // The variant's `m_cpu_type = CPU_TYPE_010;` from its init_cpu_*: the
    // 68010's MOVEC compares it against the CPU_TYPE_* masks (m68kcpu.h).
    m_cpu_type: m68000CpuType(dataSource, cpu.initializer, headerConstantsRead),
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
      // m68010+: the vector base, and MOVEC's source/destination function codes.
      ...(cpu.formatWord ? ['m_vbr', 'm_sfc', 'm_dfc'] : []),
      // m68kmusashi.h: the last prefetch address and the word it holds.
      ...(cpu.prefetch ? ['m_pref_addr', 'm_pref_data'] : []),
    ].map(name => ({ name, bits: 32 as const })),
    // The exception costs this CPU type charges, from MAME's own table.
    ...(cpu.formatWord
      ? [{ name: 'm_cyc_exception', bits: 8 as const, values: exceptionCycles(dataSource, cpu.column) }]
      : []),
    // MOVEC reads these only under `m_cpu_type == CPU_TYPE_COLDFIRE`, which a
    // 68010 never is; declared so the untaken branch names real storage.
    // (m68kmusashi.h: `u32 m_rombar[2], m_rambar[2]`, the rest scalar.)
    ...(cpu.formatWord
      ? [
          ...['m_rombar', 'm_rambar'].map(name => ({ name, bits: 32 as const, values: [0, 0] })),
          ...['m_mpcr', 'm_edrambar', 'm_secmbar', 'm_mbar'].map(name => ({ name, bits: 32 as const })),
        ]
      : []),
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
    type: variant,
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
  initializer: string,
): Record<string, number> {
  const body = new RegExp(`::${initializer}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`)
    .exec(dataSource)?.[1];
  if (!body) {
    throw new Error(`MAME M68000 source is missing ${initializer} in ${dataFile}`);
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
    throw new Error(`MAME ${initializer} declares no m_cyc_* cycle counts in ${dataFile}`);
  }
  return constants;
}

/** What a Musashi variant's init_cpu_* sets `m_cpu_type` to. */
function m68000CpuType(dataSource: string, initializer: string, constants: Record<string, number>): number {
  const body = new RegExp(`::${initializer}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`).exec(dataSource)?.[1] ?? '';
  const name = /\bm_cpu_type\s*=\s*(\w+)\s*;/.exec(body)?.[1];
  const value = name === undefined ? undefined : constants[name];
  if (value === undefined) throw new Error(`MAME ${initializer} sets no m_cpu_type the header defines`);
  return value;
}

function normalizeM68000Source(body: string): string {
  // JavaScript numbers exactly represent the 33-bit intermediates used by
  // ROXL/ROXR; keeping these locals unwrapped preserves that extra carry bit.
  let source = body.replace(/\bu64\b/g, 'int');
  // `(void)expr;` discards a value, which is all the statement means. The
  // 68010's BKPT runs a breakpoint-acknowledge bus cycle that way before
  // taking the illegal-instruction exception, and the one diagnostic it raised
  // was enough to stop the whole 68010 core from being emitted. No 68000
  // handler contains one, so that core is unaffected.
  source = source.replace(/\(\s*void\s*\)\s*/g, '');
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

/**
 * One CPU type's column of `m68ki_exception_cycle_table` (m68kcpu.cpp): 256
 * per-vector costs, in the same column order as the instruction state table.
 * A 68010 interrupt costs 46 cycles against a 68000's 44, and a trap 38
 * against 34 -- small, but paid on every vblank, and enough over a few hundred
 * frames to move a foreground task onto a different frame than MAME's.
 */
function exceptionCycles(dataSource: string, column: number): number[] {
  const start = dataSource.indexOf('m68ki_exception_cycle_table[NUM_CPU_TYPES][256]');
  if (start < 0) throw new Error('MAME M68000 source is missing m68ki_exception_cycle_table');
  const open = dataSource.indexOf('{', start);
  const blocks: string[] = [];
  let depth = 0;
  let blockStart = -1;
  for (let index = open + 1; index < dataSource.length; index++) {
    const character = dataSource[index];
    if (character === '{') {
      if (depth === 0) blockStart = index + 1;
      depth++;
    } else if (character === '}') {
      if (depth === 0) break;
      depth--;
      if (depth === 0) blocks.push(dataSource.slice(blockStart, index));
    }
  }
  const block = blocks[column];
  if (!block) throw new Error(`m68ki_exception_cycle_table has no column ${column}`);
  const values = [...block.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    .matchAll(/\d+/g)].map(match => Number(match[0]));
  if (values.length !== 256) {
    throw new Error(`m68ki_exception_cycle_table column ${column} has ${values.length} entries`);
  }
  return values;
}

function m68000SupportMethods(
  sourceFile: string,
  formatWord = false,
  prefetch = false,
): GeneratedCpuMethod[] {
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
    // m68kcpu.h m68ki_read_imm_16/32 on a CPU with no bus error or MMU. The
    // queue re-reads the word after every one it hands out, and those reads
    // reach the address space: the Atari slapstic counts them, and a 68010
    // that skips them walks its bank state off MAME's (Marble Madness).
    ...(prefetch ? [
      source('m68ki_read_imm_16', '', `
        if (m_pc != m_pref_addr) { m_pref_data = m68ki_read_16(m_pc); m_pref_addr = m_pc; }
        u32 value = m_pref_data & 0xffff;
        m_pc += 2;
        m_pref_data = m68ki_read_16(m_pc);
        m_pref_addr = m_pc;
        return value;`),
      source('m68ki_read_imm_32', '', `
        if (m_pc != m_pref_addr) { m_pref_addr = m_pc; m_pref_data = m68ki_read_16(m_pref_addr); }
        u32 value = m_pref_data & 0xffff;
        m_pc += 2;
        m_pref_addr = m_pc;
        m_pref_data = m68ki_read_16(m_pref_addr);
        value = u32((value << 16) | (m_pref_data & 0xffff));
        m_pc += 2;
        m_pref_data = m68ki_read_16(m_pc);
        m_pref_addr = m_pc;
        return value;`),
    ] : [
      source('m68ki_read_imm_16', '', 'u32 value = m68ki_read_16(m_pc); m_pc += 2; return value;'),
      source('m68ki_read_imm_32', '', 'u32 value = m68ki_read_32(m_pc); m_pc += 4; return value;'),
    ]),
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
    // m68ki_stack_frame_0000 and m68ki_jump_vector. A 68000 stacks a 3-word
    // frame and reads its vectors from address zero; a 68010 first pushes a
    // format/vector word (format 0, `vector << 2`) and reads through its
    // vector base register. Building the 68010 with the 68000's frame left
    // every interrupt two bytes short, so anything that walks the stack --
    // RTE's format check, Marble Madness's task switcher -- read one word off.
    source('m68ki_exception_common', 'u32 vector, u32 stacked_pc', `
      u32 sr = m68ki_get_sr();
      m_t1_flag = 0;
      m_t0_flag = 0;
      m68ki_set_s_flag(SFLAG_SET);
      ${formatWord ? 'm_dar[15] -= 2;\n      m68ki_write_16(m_dar[15], vector << 2);' : ''}
      m68ki_push_32(stacked_pc);
      m_dar[15] -= 2;
      m68ki_write_16(m_dar[15], sr);
      m_pc = m68ki_read_32(${formatWord ? '(vector << 2) + m_vbr' : 'vector << 2'});
      m_stopped &= ~STOP_LEVEL_STOP;
      ${formatWord ? '' : 'cycles += 30;'}
    `),
    // The 68010 charges each exception its own entry in m_cyc_exception, as
    // MAME does (m68kcpu.h). MAME's illegal-class exceptions also refund the
    // faulting opcode's cycles; this core charges those after the handler
    // returns, so a 68010 illegal instruction costs its opcode's few cycles
    // more than MAME's. Interrupts and traps -- what boards actually take --
    // are exact. The 68000 keeps the costs its goldens were verified against.
    source('m68ki_exception_trap', 'u32 vector', `m68ki_exception_common(vector, m_pc);${formatWord ? ' cycles += m_cyc_exception[vector];' : ''}`),
    source('m68ki_exception_trapN', 'u32 vector', `m68ki_exception_common(vector, m_pc);${formatWord ? ' cycles += m_cyc_exception[vector];' : ''}`),
    source('m68ki_exception_privilege_violation', '', `m68ki_exception_common(EXCEPTION_PRIVILEGE_VIOLATION, m_ppc);${formatWord ? ' cycles += m_cyc_exception[EXCEPTION_PRIVILEGE_VIOLATION];' : ''}`),
    source('m68ki_exception_1010', '', `m68ki_exception_common(EXCEPTION_1010, m_ppc);${formatWord ? ' cycles += m_cyc_exception[EXCEPTION_1010];' : ''}`),
    source('m68ki_exception_1111', '', `m68ki_exception_common(EXCEPTION_1111, m_ppc);${formatWord ? ' cycles += m_cyc_exception[EXCEPTION_1111];' : ''}`),
    source('m68ki_exception_illegal', '', `m68ki_exception_common(EXCEPTION_ILLEGAL_INSTRUCTION, m_ppc);${formatWord ? ' cycles += m_cyc_exception[EXCEPTION_ILLEGAL_INSTRUCTION];' : ''}`),
    source('m68ki_service_interrupt', 'u32 level', `
      u32 vector = standard_irq_callback(level, m_pc);
      if (vector == 0xff) vector = 24 + level;
      m68ki_exception_common(vector, m_pc);
      ${formatWord ? 'cycles += m_cyc_exception[vector];' : ''}
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
      ${formatWord ? '' : 'cycles += 14;'}
    `),
    source('m_reset_cb', 'u32 state', 'return 0;'),
  );
  if (formatWord) {
    methods.push(
      // m68kcpu.h: what the 68010's `_71` handlers call and the 68000's never
      // do. RTE pulls past the format word with these and raises a format
      // error on a frame it does not recognise; MOVES addresses memory by
      // function code, which on a board with no MMU is the same bus.
      source('m68ki_fake_pull_16', '', 'm_dar[15] += 2;'),
      source('m68ki_fake_pull_32', '', 'm_dar[15] += 4;'),
      source('m68ki_exception_format_error', '', 'm68ki_exception_common(EXCEPTION_FORMAT_ERROR, m_pc); cycles += m_cyc_exception[EXCEPTION_FORMAT_ERROR];'),
      source('m68ki_read_8_fc', 'u32 address, u32 fc', 'return m68ki_read_8(address);'),
      source('m68ki_read_16_fc', 'u32 address, u32 fc', 'return m68ki_read_16(address);'),
      source('m68ki_read_32_fc', 'u32 address, u32 fc', 'return m68ki_read_32(address);'),
      source('m68ki_write_8_fc', 'u32 address, u32 fc, u32 value', 'm68ki_write_8(address, value);'),
      source('m68ki_write_16_fc', 'u32 address, u32 fc, u32 value', 'm68ki_write_16(address, value);'),
      source('m68ki_write_32_fc', 'u32 address, u32 fc, u32 value', 'm68ki_write_32(address, value);'),
      source('BIT_B', 'u32 value', 'return value & 0x00000800;'),
      source('BIT_F', 'u32 value', 'return value & 0x00008000;'),
    );
  }
  return methods;
}

/** Compile MAME's Intel 8088/8086 source switch and inline helpers. */
export function compileMameI8088(
  mameSrc: string,
  variant: 'I8088' | 'V30' = 'I8088',
): GeneratedCpuDefinition {
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
    .replace(/\btotal_cycles\s*\(\s*\)/g, '1')
    .replace(/\b(?:debugger_\w+|logerror|TRACE_NOOP)\s*\([^;]*\)\s*;/g, '')
    .replace(/\bm_(?:lock_handler|out_if_func|esc_opcode_handler|esc_data_handler)\s*\([^;]*\)\s*;/g, '')
    // The declaration supplies `override = true`, while the out-of-class
    // definition parsed into the method table cannot carry that default.
    // Preserve it at each four-argument call; explicit stack accesses pass
    // false as their fifth argument and remain unchanged.
    .replace(/\bcalc_addr\(([^()]*)\)/g, (call, args: string) =>
      splitMameArgs(args).length === 4 ? `calc_addr(${args}, true)` : call)
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
  const constants = headerConstants(mameSrc, header, inline);
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
  if (variant === 'V30') {
    // The 8086 treats 60/61 as aliases for JO/JNO, but NEC implements the
    // 80186-compatible PUSHA/POPA pair there. R-Type executes PUSHA in its
    // first IRQ handler; decoding it as JO changes SP and eventually returns
    // into the power-on RAM test. These are the operations in necinstr.hxx,
    // expressed against the already-lowered register and stack helpers.
    add('v30_pusha', '', `
      uint32_t tmp = m_regs.w[SP];
      PUSH(m_regs.w[AX]);
      PUSH(m_regs.w[CX]);
      PUSH(m_regs.w[DX]);
      PUSH(m_regs.w[BX]);
      PUSH(tmp);
      PUSH(m_regs.w[BP]);
      PUSH(m_regs.w[SI]);
      PUSH(m_regs.w[DI]);
      CLK(NOP);
    `, 'src/devices/cpu/nec/necinstr.hxx', 377);
    add('v30_popa', '', `
      uint32_t discarded_sp;
      m_regs.w[DI] = POP();
      m_regs.w[SI] = POP();
      m_regs.w[BP] = POP();
      discarded_sp = POP();
      m_regs.w[BX] = POP();
      m_regs.w[DX] = POP();
      m_regs.w[CX] = POP();
      m_regs.w[AX] = POP();
      CLK(NOP);
    `, 'src/devices/cpu/nec/necinstr.hxx', 390);
    // NEC also assigns c0/c1 to the immediate-count rotate/shift operations;
    // the 8086 source aliases those otherwise-unused bytes to RET/RETF. The
    // operation bodies are identical to d2/d3 apart from fetching the count
    // byte instead of reading CL, so retain the already source-extracted body
    // and apply exactly that architectural difference from necinstr.hxx.
    const immediateRotate = (body: string): string => body.replace(
      /c\s*=\s*m_regs\.b\[CL\]\s*;/,
      'c = fetch();',
    );
    add('v30_rotshft_bd8', '', immediateRotate(rotateByCl('0xd2')),
      'src/devices/cpu/nec/necinstr.hxx', 581);
    add('v30_rotshft_wd8', '', immediateRotate(rotateByCl('0xd3')),
      'src/devices/cpu/nec/necinstr.hxx', 598);
    // NEC reserves 0f as an extension prefix instead of retaining the
    // original 8086's undocumented POP CS. R-Type reaches ADD4S when its
    // first enemies award score; popping CS here sends execution through
    // unmapped memory and eventually back into the power-on diagnostics.
    // This is the V30 branch of necinstr.hxx's ADD4S macro, expressed with
    // the compatible i8086 core's ES/DS and DI/SI register names.
    add('v30_add4s', '', `
      uint32_t count = (m_regs.b[CL] + 1) / 2;
      uint32_t destination = m_regs.w[DI];
      uint32_t source = m_regs.w[SI];
      m_ZeroVal = 0;
      m_CarryVal = 0;
      while (count > 0) {
        uint32_t source_bcd = read_byte((m_sregs[DS] << 4) + source);
        uint32_t destination_bcd = read_byte((m_sregs[ES] << 4) + destination);
        uint32_t source_value = ((source_bcd >> 4) * 10) + (source_bcd & 15);
        uint32_t destination_value =
          ((destination_bcd >> 4) * 10) + (destination_bcd & 15);
        uint32_t result = source_value + destination_value + m_CarryVal;
        m_CarryVal = result > 99;
        result %= 100;
        uint32_t packed = ((result / 10) << 4) | (result % 10);
        write_byte((m_sregs[ES] << 4) + destination, packed);
        if (packed) m_ZeroVal = 1;
        source++;
        destination++;
        count--;
        cycles += 19;
      }
      cycles += 7;
    `, 'src/devices/cpu/nec/necmacro.h', 234);
  }

  const step = compileMameHandler(normalize(`
    cycles = 0;
    m_icount = 1;
    if (m_seg_prefix_next) {
      m_seg_prefix = true;
      m_seg_prefix_next = false;
    } else {
      m_prev_ip = m_ip;
      m_seg_prefix = false;
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
      if (m_fire_trap) {
        if (m_fire_trap >= 2 && m_no_interrupt == 0) {
          m_fire_trap = 0;
          interrupt(1);
        } else {
          m_fire_trap++;
        }
      }
      if (m_no_interrupt) m_no_interrupt--;
    }
    uint8_t op = fetch_op();
    if (${variant === 'V30' ? 'op == 0x0f' : 'false'}) {
      uint8_t nec_op = fetch();
      if (nec_op == 0x20) v30_add4s();
    } else if (op == 0x0f) {
      m_sregs[CS] = POP();
      CLK(POP_SEG);
    } else if (${variant === 'V30' ? 'op == 0x60' : 'false'}) {
      v30_pusha();
    } else if (${variant === 'V30' ? 'op == 0x61' : 'false'}) {
      v30_popa();
    } else if (${variant === 'V30' ? 'op == 0xc0' : 'false'}) {
      v30_rotshft_bd8();
    } else if (${variant === 'V30' ? 'op == 0xc1' : 'false'}) {
      v30_rotshft_wd8();
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
  const compatible = compileMameI8088(mameSrc, 'V30');
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

/** execute_set_input's parameter names, as the core's source declares them. */
function inputParameters(parameters: string): [string, string] {
  const names = splitMameArgs(parameters).map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1]);
  if (names.length !== 2 || !names[0] || !names[1]) {
    throw new Error(`execute_set_input(${parameters}) does not take an input line and a state`);
  }
  return [names[0], names[1]];
}

/**
 * A struct type a function body declares together with its variable --
 * `struct attribute_memory { int row = 0; uint8_t color = 0; } attributes[64];`
 * in popeye's sprite pass -- as that variable built from the fields' initial
 * values (STRUCT_ARRAY / STRUCT_VALUE). A field with no initializer is zero,
 * as value-initialization leaves it.
 */
export function lowerLocalStructs(source: string): string {
  return source.replace(
    /\bstruct\s+\w*\s*\{([^{}]*)\}\s*(\w+)\s*(?:\[\s*([^\]]+?)\s*\])?\s*;/g,
    (whole, fields: string, name: string, count?: string) => {
      const pairs: string[] = [];
      for (const field of fields.split(';').map(item => item.trim()).filter(Boolean)) {
        const declared = /^(?:[\w:]+\s+)+?(\w+)\s*(?:\[[^\]]*\])?\s*(?:=\s*([\s\S]+)|\{\s*([\s\S]*)\s*\})?$/.exec(field);
        if (!declared) return whole;
        pairs.push(JSON.stringify(declared[1]), (declared[2] ?? declared[3] ?? '').trim() || '0');
      }
      return count === undefined
        ? `auto ${name} = STRUCT_VALUE(${pairs.join(', ')});`
        : `auto ${name} = STRUCT_ARRAY(${count}${pairs.length ? `, ${pairs.join(', ')}` : ''});`;
    },
  );
}

export function normalizeMameExecutionSource(source: string): string {
  source = lowerLocalStructs(source);
  // A call through a member-function pointer -- `(this->*m_opcode_table[op])()`,
  // how MAME's MCS-48 and TMS320C1x dispatch every opcode -- is the
  // CALL_METHOD intrinsic on the method name the pointer holds.
  source = lowerMemberPointerCalls(source);
  // A variadic template pack is always empty here: mamekit specializes only
  // the argument lists its call sites name, and it cannot expand a pack. C++
  // discards the branch in that case, so the text goes before parsing --
  // otherwise `if constexpr (sizeof...(B) > 0)` is a condition the handler
  // parser cannot read and the whole method is dropped for a diagnostic.
  source = source.replace(
    /\bif\s+constexpr\s*\(\s*sizeof\s*\.\.\.\s*\([^)]*\)[^;{}]*\)\s*[^;{}]*;/g,
    '',
  );

  // An object-like #define inside a body names its value from there on:
  // Phoenix's update_c24 opens with `#define C24 6.8e-6` and three more.
  for (let define = /^[ \t]*#[ \t]*define[ \t]+([A-Za-z_]\w*)[ \t]+([^\n]*)$/m.exec(source); define;
    define = /^[ \t]*#[ \t]*define[ \t]+([A-Za-z_]\w*)[ \t]+([^\n]*)$/m.exec(source)) {
    const [line, name, value] = define;
    const after = source.slice(define.index + line.length).replace(new RegExp(`\\b${name}\\b`, 'g'), `(${value!.trim()})`);
    source = source.slice(0, define.index) + after;
  }
  source = source.replace(/^[ \t]*#[ \t]*undef[ \t]+\w+[ \t]*$/gm, '');

  // C++ attributes (`[[maybe_unused]] int endskip`) change no behaviour.
  source = source.replace(/\[\[\s*\w+(?:::\w+)?(?:\([^)]*\))?\s*\]\]\s*/g, '');

  let normalized = stripTracingCalls(stripInactivePreprocessorBranches(source))
    // An elaborated type specifier names the same type without its keyword:
    // segaic16's tile callbacks cast `(const struct tilemap_callback_info *)`,
    // which the parser read as two type names and dropped the declaration.
    .replace(/\b(?:struct|union)\s+(?=[A-Za-z_][\w:]*\s*[*&)])/g, '')
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
    // Match within a single line only: with \s+ the type-word chain could
    // reach back across a newline into a preceding // comment ("// character
    // palette\n const uint8_t *char_pal = ..."), splicing the declaration into
    // the comment and silently deleting it (Moon Patrol's init_palette).
    // The declarator's `*` is kept. The interpreter can tell a pointer from a
    // number by looking at the value, but emitted code has only the declared
    // type: dropping it made the Neo Geo's `m_bg_pen = pen_base + 0xfff` a
    // numeric add on a pointer object instead of pointer arithmetic, and the
    // whole fixed layer drew from the wrong pens.
    .replace(
      /\b(?:[\w:<>]+[ \t]+)+\*[ \t]*(?:const[ \t]+)?(\w+)[ \t]*=/g,
      'auto *$1 =',
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
    // A floating-point array keeps fractions: the AY-3-8910 builds its whole
    // mixer into `std::make_unique<sound_stream::sample_t[]>(8*32*32*32)`,
    // and in bytes every level under 1.0 was stored as 0.
    .replace(
      /\bstd::make_unique\s*<\s*(float|double|sound_stream::sample_t)\s*\[\s*\]\s*>\s*\(/g,
      'ALLOCF(',
    )
    // Carry the element width. `make_unique_clear<u16[]>` is a word array,
    // and allocating bytes for it silently truncated every store: wardner's
    // three tile layers are u16 arrays written a byte at a time through
    // COMBINE_DATA, so every high byte vanished and the board's own power-on
    // test reported "FRAM ERROR".
    // `std::make_unique<T[]>(n)` value-initializes its elements too, so it
    // is the same array: the System 16 rotate buffer is `make_unique<uint16_t[]>`.
    .replace(
      /\b(?:std::make_unique|make_unique_clear)\s*<\s*([A-Za-z_][A-Za-z_0-9:]*)\s*\[\s*\]\s*>\s*\(/g,
      (_, type: string) => `${allocIntrinsic(type)}(`,
    )
    // <cmath>'s HUGE_VAL is a double's infinity, which C spells 1.0 / 0.0 and
    // a JSON IR cannot hold as a literal: discrete's transform node starts
    // its stack's top at it.
    .replace(/\bHUGE_VAL\b/g, '(1.0 / 0.0)')
    // An array of pointers holds objects, not bytes: DISCRETE indexes its
    // nodes in `make_unique_clear<discrete_base_node * []>(DISCRETE_MAX_NODES)`.
    .replace(/\b(?:std::)?make_unique(?:_clear)?\s*<\s*(?:const\s+)?[\w:]+\s*\*\s*\[\s*\]\s*>\s*\(/g, 'ALLOC_OBJECTS(')
    .replace(/\bmake_unique_clear\s*<[^>]*\[\]>\s*\(/g, 'ALLOC(')
    // A local constructed with a size holds that many value-initialized
    // elements, of its own kind (the device runtime's VECTOR_OF), rather than
    // reading as the number: the floppy drive's write_flux fills in
    // `std::vector<wspan> wspans(1)`, and `wspans[0].start` threw on a 1.
    .replace(
      /\bstd::vector\s*<\s*([A-Za-z_][\w:]*)\s*>\s+(\w+)\s*\(([^;{}()]+)\)\s*;/g,
      'auto $2 = VECTOR_OF("$1", $3);',
    )
    // A default-constructed local std::vector is an empty, growable array.
    // Keeping it as an uninitialised declaration materialises numeric zero,
    // so push_back silently does nothing and a later reverse walk is empty
    // (M72 builds its complete sprite draw order this way each frame).
    .replace(
      /\bstd::vector\s*<[^;{}>]+>\s+(\w+)\s*;/g,
      'auto $1 = ARRAY();',
    )
    .replace(/\.push_back\s*\(/g, '.push(')
    // A move hands over its operand, which is all a value here is:
    // `m_buffers.emplace_back(std::move(buf))`.
    .replace(/\bstd::move\s*\(/g, '(')
    // Copied in, a vector's new last element is the value: discrete's tasks
    // buffer their outputs with `emplace_back(std::move(buf))`. Built in place
    // from several constructor arguments it stays emplace_back, which makes
    // the element and answers it (generatedVector).
    .replace(/\.emplace_back\s*\(((?:[^(),]|\([^()]*\))*)\)/g, '.push($1)');
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
    // Folded only where every use indexes it twice. Handed on whole or by
    // row it stays the array it is, as the one-dimensional folder below keeps
    // one: each Sega Z80 decryptor passes its `convtable[32][4]` to
    // segacrpt's decode(), and segacrp2's points `tbl = swaptable[n]` at a
    // row. Folded, those named nothing and every opcode decoded against zero.
    const folded = normalized
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
    if (new RegExp(`\\b${name}\\b`).test(folded)) continue;
    normalized = folded;
  }
  for (const match of normalized.matchAll(
    /\bstatic\s+(?:const|constexpr)\s+\w+\s+(\w+)\s*\[[^\]]+\]\s*=\s*\{([^}]+)\}\s*;/g,
  )) {
    const name = match[1]!;
    // A table handed on stays the array it is: as a whole, or by an element's
    // address, as pacman_palette hands compute_resistor_weights
    // `&resistances[1]`. Folded, that pointed at a number.
    const rest = normalized.replace(match[0], '');
    if (new RegExp(`\\b${name}\\b(?!\\s*\\[)`).test(rest) || new RegExp(`&\\s*${name}\\s*\\[`).test(rest)) continue;
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
 *
 * The receiver goes with the call: `device().logerror(...)` left as
 * `device().TRACE_NOOP()` was a member call nothing answers, and
 * device_generic_cart_interface::rom_alloc logs that way.
 */
function stripTracingCalls(source: string): string {
  const call = /(?:\b\w+(?:\s*\(\s*\))?\s*(?:\.|->)\s*)*\b(?:LOG[A-Z0-9_]*|logerror|popmessage)\s*\(/g;
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

export function stripInactivePreprocessorBranches(source: string): string {
  const stack: { parent: boolean; selected: boolean; known: boolean }[] = [];
  let active = true;
  const condition = (directive: string, expression: string): boolean | undefined => {
    if (directive === 'ifdef') return false;
    if (directive === 'ifndef') return true;
    const clean = expression.replace(/\/\/.*|\/\*.*?\*\//g, '').trim();
    if (/^[01]$/.test(clean)) return clean === '1';
    if (/^defined\s*(?:\(\s*\w+\s*\)|\w+)$/.test(clean)) return false;
    if (/^!\s*defined\s*(?:\(\s*\w+\s*\)|\w+)$/.test(clean)) return true;
    const booleanExpression = clean.replace(/\bdefined\s*(?:\(\s*\w+\s*\)|\w+)/g, '0');
    if (/^[01\s!&|()]+$/.test(booleanExpression)) {
      const tokens = booleanExpression.match(/&&|\|\||!|[01()]/g) ?? [];
      if (tokens.join('') !== booleanExpression.replace(/\s/g, '')) return undefined;
      let at = 0;
      const primary = (): boolean => {
        const token = tokens[at++];
        if (token === '!') return !primary();
        if (token === '(') {
          const value = disjunction();
          if (tokens[at++] !== ')') throw new Error('unclosed preprocessor condition');
          return value;
        }
        if (token !== '0' && token !== '1') throw new Error('invalid preprocessor condition');
        return token === '1';
      };
      const conjunction = (): boolean => {
        let value = primary();
        while (tokens[at] === '&&') { at++; const right = primary(); value = value && right; }
        return value;
      };
      const disjunction = (): boolean => {
        let value = conjunction();
        while (tokens[at] === '||') { at++; const right = conjunction(); value = value || right; }
        return value;
      };
      try { const value = disjunction(); if (at === tokens.length) return value; } catch { /* preserve for diagnostics */ }
    }
    return undefined;
  };
  const lines = source.split('\n');
  return lines.map((line, lineIndex) => {
    const directive = /^\s*#\s*(if|ifdef|ifndef|elif|else|endif)\b(.*)/.exec(line);
    if (!directive) return active ? line : '';
    const [, kind, expression] = directive;
    if (kind === 'if' || kind === 'ifdef' || kind === 'ifndef') {
      let value = condition(kind, expression);
      // An unknown alternative cannot be silently treated as false. Preserve
      // that whole conditional for diagnostics unless an earlier true arm
      // makes every alternative unreachable.
      if (value === false) {
        let depth = 0;
        for (let index = lineIndex + 1; index < lines.length; index++) {
          const next = /^\s*#\s*(if|ifdef|ifndef|elif|endif)\b(.*)/.exec(lines[index]!);
          if (!next) continue;
          if (next[1] === 'endif') { if (depth-- === 0) break; }
          else if (next[1] !== 'elif') depth++;
          else if (depth === 0 && condition('if', next[2]!) === undefined) {
            value = undefined;
            break;
          }
        }
      }
      stack.push({ parent: active, selected: value === true, known: value !== undefined });
      active = active && value !== false;
      return value === undefined && active ? line : '';
    }
    const frame = stack.at(-1);
    if (!frame) return active ? line : '';
    if (kind === 'endif') {
      stack.pop();
      active = frame.parent;
      return !frame.known && active ? line : '';
    }
    if (!frame.known) return active ? line : '';
    const selected = kind === 'else' || condition('if', expression) === true;
    active = frame.parent && !frame.selected && selected;
    frame.selected ||= selected;
    return '';
  }).join('\n');
}

function extractDefineConstants(source: string, seed: Record<string, number> = {}): Record<string, number> {
  const expressions = new Map<string, string>();
  for (const match of source.matchAll(/^[ \t]*#define[ \t]+(\w+)[ \t]+([^/\r\n]+)/gm)) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  return resolveConstants(expressions, seed);
}

const FRAMEWORK_LINES = new Map<string, Record<string, number>>();

/**
 * MAME's line states and input lines (emu/diexec.h), which every core's
 * execute_set_input and every driver's set_input_line name: CLEAR_LINE,
 * ASSERT_LINE, HOLD_LINE and INPUT_LINE_IRQ0..9 as MAME numbers them, and the
 * three scheduler-level lines as the host does (HOST_INPUT_LINES).
 */
export function frameworkLineConstants(mameSrc: string): Record<string, number> {
  let constants = FRAMEWORK_LINES.get(mameSrc);
  if (!constants) {
    const header = readFileSync(join(mameSrc, 'src/emu/diexec.h'), 'utf8');
    constants = { ...extractEnumConstants(header, {}), ...HOST_INPUT_LINES };
    if (constants.CLEAR_LINE !== 0 || constants.ASSERT_LINE !== 1 || constants.INPUT_LINE_IRQ0 !== 0) {
      throw new Error('MAME emu/diexec.h line constants did not read');
    }
    FRAMEWORK_LINES.set(mameSrc, constants);
  }
  return constants;
}

/**
 * Every constant a core's header states -- #define, enumerator and constexpr --
 * resolved together over the framework's lines, so that `#define
 * I8085_TRAP_LINE INPUT_LINE_NMI` and `M6809_FIRQ_LINE = 1` read alike.
 */
function headerConstants(mameSrc: string, ...sources: string[]): Record<string, number> {
  const framework = frameworkLineConstants(mameSrc);
  let resolved: Record<string, number> = {};
  for (let pass = 0; pass < 2; pass++) {
    for (const source of sources) {
      const seed = { ...framework, ...resolved };
      resolved = {
        ...resolved,
        ...extractDefineConstants(source, seed),
        ...extractEnumConstants(source, seed),
        ...extractConstexprConstants(source, seed),
      };
    }
  }
  return { ...framework, ...resolved };
}

function extractConstexprConstants(source: string, seed: Record<string, number> = {}): Record<string, number> {
  const expressions = new Map<string, string>();
  // `static inline constexpr` is the modern MAME spelling; the TMS320C1x
  // interrupt states are declared that way and were invisible without it.
  for (const match of source.matchAll(
    /\bstatic\s+(?:inline\s+)?constexpr\s+\w+\s+(\w+)\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  return resolveConstants(expressions, seed);
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
    for (const rawEntry of splitTopLevelCommas(match[1]!)) {
      const entry = rawEntry.trim();
      if (!entry) continue;
      const parsed = /^(\w+)(?:\s*=\s*([\s\S]+))?$/.exec(entry);
      if (!parsed) continue;
      if (parsed[2]) {
        const expression = hostConstantExpression(parsed[2]!).replace(/\b[A-Za-z_]\w*\b/g, token =>
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

/** Commas at the top level of a list, outside any parentheses. */
function splitTopLevelCommas(source: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < source.length; index++) {
    const character = source[index];
    if (character === '(') depth++;
    else if (character === ')') depth--;
    else if (character === ',' && depth === 0) {
      parts.push(source.slice(start, index));
      start = index + 1;
    }
  }
  parts.push(source.slice(start));
  return parts;
}

/**
 * A constant expression as a little-endian host evaluates it, the LSB_FIRST
 * build every other layout here assumes: util/endianness.h's
 * `NATIVE_ENDIAN_VALUE_LE_BE(leval, beval)` is `leval` (i86.h numbers its byte
 * registers this way, as indices into the word register union).
 */
function hostConstantExpression(source: string): string {
  return source.replace(/\bNATIVE_ENDIAN_VALUE_LE_BE\s*\(([^,()]*),[^()]*\)/g, '($1)');
}

function resolveConstants(
  expressions: Map<string, string>,
  seed: Record<string, number> = {},
): Record<string, number> {
  const resolved: Record<string, number> = { ...seed };
  let changed = true;
  while (changed) {
    changed = false;
    for (const [name, source] of expressions) {
      if (Object.hasOwn(resolved, name)) continue;
      const normalized = hostConstantExpression(source).replace(/\b[A-Za-z_]\w*\b/g, token =>
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
  for (const name of Object.keys(seed)) {
    if (!expressions.has(name)) delete resolved[name];
  }
  return resolved;
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
 * The allocation intrinsic for one C++ element type.
 *
 * MAME sizes an array by its element type, and a generated board that
 * allocates bytes for a `u16[]` loses the high half of every store without
 * a diagnostic -- which is what a byte-wide COMBINE_DATA into a word array
 * looks like from the outside.
 */
function allocIntrinsic(type: string): 'ALLOC' | 'ALLOC16' | 'ALLOC32' | 'ALLOCF' {
  if (/^(?:float|double|sound_stream::sample_t)$/.test(type)) return 'ALLOCF';
  if (/^(?:u|s|int|uint)16(?:_t)?$/.test(type) || /^u?int16_t$/.test(type)) return 'ALLOC16';
  if (/^(?:u|s|int|uint)32(?:_t)?$/.test(type) || /^u?int32_t$/.test(type)) return 'ALLOC32';
  return 'ALLOC';
}
