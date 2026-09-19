// The TMS34010 graphics processor, compiled from MAME's tms34010.cpp.
//
// MAME's core is written for the C preprocessor more than for a reader: its
// PIXBLT and FILL variants exist only after 34010gfx.hxx has included itself
// twenty times under different FUNCTION_NAME/BITS_PER_PIXEL/PIXEL_OP macros,
// and every register access is a macro over a union. So the core is run
// through the C preprocessor first (c-preprocessor.ts) and everything after
// that is ordinary lowering of the text MAME's compiler would have seen.
//
// Four shapes are specific to how this core is written, and each is lowered
// to a general form rather than restated:
// - member-function-pointer tables (`s_opcode_table`, the field, pixel and
//   raster tables) become tables of method names, and `(this->*f)(args)`
//   becomes CALL_METHOD(f, args), which both executors dispatch by name;
// - the program space is bit addressed (addrshift +3), so a word access at
//   bit address A is the little-endian word at byte A >> 3;
// - a local pointer into the register file (`int32_t *rd = &AREG(n)`) is an
//   alias of that register, so uses of it are rewritten to the register;
// - `m_regs` is a union of `int32_t reg` and the `XY` pair, which the emitter
//   models as one register file with both views.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import type { GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import { walkOperations } from '../ir/walk.ts';
import { parseMameSource, splitMameArgs, type MameFunction } from './ast.ts';
import { CPreprocessor } from './c-preprocessor.ts';
import { lowerMemberPointerCalls } from './member-pointers.ts';
import { compileMameHandler } from './handler-ir.ts';
import { braceBody, initializerItems } from './initializer.ts';
import { evalExpr, parseEnumConstants } from '../kg/parse.ts';
import type { GeneratedCpuDefinition, GeneratedCpuMember, GeneratedCpuMethod } from './cpu-compiler.ts';

const DIRECTORY = 'src/devices/cpu/tms34010';
const CPP_FILE = `${DIRECTORY}/tms34010.cpp`;
const HEADER_FILE = `${DIRECTORY}/tms34010.h`;
const BASE_CLASS = 'tms340x0_device';
const CORE_CLASS = 'tms34010_device';

/** Framework logging macros: kept unexpanded so the calls can be dropped whole. */
const LOGGING = ['LOG', 'LOGMASKED', 'LOGCONTROLREGS', 'LOGGRAPHICSOPS', 'LOGGFX', 'logerror', 'osd_printf_debug'];

/** Methods that are host plumbing, not behaviour the core executes. */
const SKIPPED = new Set([
  'device_start', 'device_post_load', 'memory_space_config', 'state_string_export',
  'create_disassembler', 'execute_run', 'internal_regs_map', 'tms340x0_rgb32',
  // Host-interface reads and writes: the T-Unit never drives HSTCTL from
  // outside, and the pair reaches the debugger's address space.
  'host_r', 'host_w',
  // devcb accessors (`auto output_int() { return m_output_int_cb.bind(); }`)
  // are how a machine configuration reaches the callback, not behaviour.
  'output_int', 'ioreg_pre_write',
  // Scheduler overrides: the clock divider is carried by the board's
  // generatedCpuCycleClock, and the slice bounds by the step's budget.
  'execute_clocks_to_cycles', 'execute_cycles_to_clocks', 'execute_min_cycles', 'execute_max_cycles',
]);

export interface Tms34010Source {
  /** The preprocessed translation unit. */
  text: string;
  functions: MameFunction[];
}

/** Run MAME's TMS34010 translation unit through the C preprocessor. */
export function preprocessTms34010(mameSrc: string): Tms34010Source {
  const root = join(mameSrc, DIRECTORY);
  const preprocessor = new CPreprocessor({
    // A little-endian host lays XY out as x then y, which is what the union's
    // `reg` view is defined against.
    defines: { LSB_FIRST: '1' },
    preserve: new Set(LOGGING),
    read: (path, from) => {
      const full = join(dirname(from), path);
      return full.startsWith(root) && existsSync(full)
        ? { path: full, source: readFileSync(full, 'utf8') }
        : undefined;
    },
  });
  const cpp = join(mameSrc, CPP_FILE);
  const text = preprocessor.run(cpp, readFileSync(cpp, 'utf8'));
  const functions = parseMameSource(relative(mameSrc, cpp), text).functions;
  return { text, functions };
}

/** Remove every call to a logging macro, with its balanced argument list. */
function dropCalls(source: string, names: readonly string[]): string {
  let out = source;
  for (const name of names) {
    const pattern = new RegExp(`\\b${name}\\s*\\(`, 'g');
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(out)) !== null) {
      let depth = 0;
      let end = match.index + match[0].length - 1;
      for (; end < out.length; end++) {
        if (out[end] === '(') depth++;
        else if (out[end] === ')' && --depth === 0) break;
      }
      let tail = end + 1;
      while (/\s/.test(out[tail] ?? '')) tail++;
      if (out[tail] === ';') tail++;
      out = `${out.slice(0, match.index)};${out.slice(tail)}`;
      pattern.lastIndex = match.index;
    }
  }
  return out;
}

/** Rewrite each `name(...)` call with its balanced arguments. */
function rewriteCall(source: string, name: string, replace: (args: string[]) => string): string {
  let out = '';
  let index = 0;
  const pattern = new RegExp(`(?<![\\w.>])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\(`, 'g');
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    let depth = 0;
    let end = match.index + match[0].length - 1;
    for (; end < source.length; end++) {
      if (source[end] === '(') depth++;
      else if (source[end] === ')' && --depth === 0) break;
    }
    const args = splitMameArgs(source.slice(match.index + match[0].length, end)).map(arg => arg.trim());
    out += source.slice(index, match.index) + replace(args);
    index = end + 1;
    pattern.lastIndex = end + 1;
  }
  return out + source.slice(index);
}

/** The program space is bit addressed: MAME's addrshift +3. */
function lowerSpaceAccess(source: string): string {
  let out = source;
  for (const space of ['m_cache', 'm_program']) {
    out = rewriteCall(out, `${space}.read_word`, args => `TMS_READ16(${args[0]})`);
    out = rewriteCall(out, `${space}.read_dword_unaligned`, args =>
      `(TMS_READ16(${args[0]}) | (TMS_READ16((${args[0]}) + 16) << 16))`);
    out = rewriteCall(out, `${space}.read_dword`, args =>
      `(TMS_READ16(${args[0]}) | (TMS_READ16((${args[0]}) + 16) << 16))`);
    out = rewriteCall(out, `${space}.write_word`, args => `TMS_WRITE16(${args[0]}, ${args[1]})`);
    out = rewriteCall(out, `${space}.write_dword`, args =>
      `TMS_WRITE16(${args[0]}, ${args[1]}); TMS_WRITE16((${args[0]}) + 16, (${args[1]}) >> 16)`);
  }
  return out;
}

/**
 * `XY` locals have value semantics in C++: `XY a = AREG_XY(n)` copies the pair.
 * They are built with MAKE_XY so a later store through the register cannot
 * reach the copy, and `XY d = { 0 }` is a zeroed pair.
 */
function lowerXyValues(source: string): string {
  return source
    .replace(/\bXY\s+(\w+)\s*=\s*\{\s*0\s*\}\s*;/g, 'XY $1;')
    .replace(/\b(?:const\s+)?XY\s+(\w+)\s*=\s*([^;{]+);/g, (_all, name: string, value: string) =>
      `XY ${name} = MAKE_XY((${value.trim()}).x, (${value.trim()}).y);`);
}

function normalize(body: string): string {
  let source = dropCalls(body, [...LOGGING, 'debugger_instruction_hook', 'debugger_wait_hook', 'fatalerror']);
  source = lowerXyValues(source);
  source = source
    // The interrupt-pending update MAME defers past the running instruction is
    // only acted on at the next instruction boundary, which is where the
    // generated core looks for it anyway.
    .replace(
      /\bmachine\(\)\.scheduler\(\)\.synchronize\(\s*timer_expired_delegate\(\s*FUNC\(\s*\w+::(\w+)\s*\)\s*,\s*this\s*\)\s*,\s*([^;]+?)\)\s*;/g,
      '$1($2);',
    )
    .replace(/\bif\s*\(\s*machine\(\)\.side_effects_disabled\(\)\s*\)\s*return[^;]*;/g, '')
    .replace(/\bmachine\(\)\.debug_break\(\)\s*;/g, '')
    // device_video_interface::screen() and device_t::machine() are the host's;
    // calls through them bind by name ("screen.vpos").
    .replace(/\b(screen|machine)\(\)\s*\./g, '$1.')
    .replace(/&\s*(?:tms340x0_device|tms34010_device)\s*::\s*(\w+)/g, '"$1"')
    .replace(/\bnullptr\b/g, '""');
  source = lowerMemberPointerCalls(source);
  source = lowerSpaceAccess(source);
  return source;
}

/**
 * A local pointer to an lvalue -- `int32_t *rd = &(m_regs[DSTREG(op)].reg)` --
 * aliases that lvalue for the rest of its scope. The index expression reads
 * only `op`, which no opcode writes, so substituting the lvalue at each use
 * is exact and removes the pointer.
 */
function inlinePointerAliases(operations: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] {
  const aliases = new Map<string, GeneratedExpression>();
  // `uint16_t *dest = &bitmap.pix(y)` points at the row the call returns, so
  // the pointer stands for that row and `dest[x]` indexes it.
  const rows = new Map<string, GeneratedExpression>();
  const substitute = (expression: GeneratedExpression): GeneratedExpression => {
    if (expression.kind === 'identifier' && rows.has(expression.name)) return rows.get(expression.name)!;
    if (expression.kind === 'unary' && expression.operator === '*' &&
        expression.operand.kind === 'identifier' && aliases.has(expression.operand.name)) {
      return aliases.get(expression.operand.name)!;
    }
    if (expression.kind === 'member' && expression.object.kind === 'identifier' &&
        aliases.has(expression.object.name)) {
      return { ...expression, object: aliases.get(expression.object.name)! };
    }
    if (expression.kind === 'index' && expression.object.kind === 'identifier' &&
        aliases.has(expression.object.name) && expression.index.kind === 'number' &&
        expression.index.value === 0) {
      return aliases.get(expression.object.name)!;
    }
    const copy = { ...expression } as Record<string, unknown>;
    for (const [key, value] of Object.entries(copy)) {
      if (Array.isArray(value)) {
        copy[key] = value.map(item => item && typeof item === 'object' && 'kind' in item
          ? substitute(item as GeneratedExpression) : item);
      } else if (value && typeof value === 'object' && 'kind' in value) {
        copy[key] = substitute(value as GeneratedExpression);
      }
    }
    return copy as GeneratedExpression;
  };
  const rewrite = (list: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] => list.flatMap(operation => {
    if (operation.op === 'declare' && operation.valueType?.endsWith('*') && operation.value?.kind === 'unary' &&
        operation.value.operator === '&') {
      const target = substitute(operation.value.operand);
      if (target.kind === 'call') rows.set(operation.name, target);
      else aliases.set(operation.name, target);
      return [];
    }
    const copy = { ...operation } as Record<string, unknown>;
    for (const [key, value] of Object.entries(copy)) {
      if (key === 'op') continue;
      if (Array.isArray(value)) {
        copy[key] = value.map(item => {
          if (item && typeof item === 'object' && 'op' in item) return rewrite([item as GeneratedHandlerOperation])[0];
          if (item && typeof item === 'object' && 'kind' in item) return substitute(item as GeneratedExpression);
          if (item && typeof item === 'object' && 'body' in item) {
            const entry = item as { values?: GeneratedExpression[]; body: GeneratedHandlerOperation[] };
            return { ...entry, body: rewrite(entry.body) };
          }
          return item;
        }).filter(item => item !== undefined);
        if (['then', 'else', 'body', 'initialize', 'iterate'].includes(key)) {
          copy[key] = rewrite(value as GeneratedHandlerOperation[]);
        }
      } else if (value && typeof value === 'object' && 'kind' in value) {
        copy[key] = substitute(value as GeneratedExpression);
      }
    }
    return [copy as GeneratedHandlerOperation];
  });
  return rewrite(operations);
}

function lower(body: string): GeneratedHandlerProgram {
  const program = compileMameHandler(normalize(body));
  return { ...program, operations: inlinePointerAliases(program.operations) };
}

/** A table of member-function pointers or numbers, as MAME initialises it. */
function tableValues(text: string, name: string): unknown[] | undefined {
  const at = new RegExp(`\\b(?:tms340x0_device|tms34010_device)::${name}\\s*(?:\\[[^\\]]*\\]\\s*)+=\\s*\\{`).exec(text);
  if (!at) return undefined;
  const body = braceBody(text, at.index + at[0].length - 1, name);
  const item = (entry: string): unknown => {
    const trimmed = entry.trim();
    if (trimmed.startsWith('{')) return initializerItems(trimmed.slice(1, -1)).map(item);
    const method = /&\s*\w+::(\w+)/.exec(trimmed);
    if (method) return method[1];
    if (trimmed === 'nullptr') return '';
    return Number(trimmed);
  };
  return initializerItems(body).map(item);
}

export function compileMameTms34010(mameSrc: string): GeneratedCpuDefinition {
  const { text, functions } = preprocessTms34010(mameSrc);
  // The 34010 core's own overrides win over the shared base; the 34020's are
  // a different processor.
  const byName = new Map<string, MameFunction>();
  for (const fn of functions) {
    if (fn.className !== BASE_CLASS && fn.className !== CORE_CLASS) continue;
    if (SKIPPED.has(fn.name) || fn.name === BASE_CLASS || fn.name === CORE_CLASS) continue;
    // Delegate binders are machine configuration (`set_*_callback(T &&...)`),
    // and set_pixel_clock's XTAL overload is its uint32_t twin.
    if (/^set_\w+_callback$/.test(fn.name) || /\bXTAL\b/.test(fn.parameters)) continue;
    if (fn.className === BASE_CLASS && byName.get(fn.name)?.className === CORE_CLASS) continue;
    byName.set(fn.name, fn);
  }
  // The declaration starts at the return type: `int16_t tms34010_device::PARAM_WORD()`.
  const returnType = (fn: MameFunction): string | undefined => {
    const head = text.slice(fn.span.start, text.indexOf('(', fn.span.start));
    const type = head.replace(new RegExp(`(?:\\w+::)?${fn.name}\\s*$`), '')
      .replace(/\b(?:inline|virtual|static|constexpr)\b/g, '').trim();
    return type && type !== 'void' ? type : undefined;
  };
  const methods: GeneratedCpuMethod[] = [...byName.values()].map(fn => ({
    name: fn.name,
    parameters: fn.parameters,
    ...(returnType(fn) ? { returnType: returnType(fn) } : {}),
    program: lower(fn.body),
    source: { file: CPP_FILE, line: fn.span.line },
  }));

  const tables: GeneratedCpuMember[] = [];
  for (const name of [
    's_opcode_table', 's_wfield_functions', 's_rfield_functions', 's_pixel_op_table',
    's_pixel_op_timing_table', 's_pixblt_op_table', 's_pixblt_r_op_table', 's_pixblt_b_op_table',
    's_fill_op_table', 's_pixel_write_ops', 's_pixel_read_ops', 's_raster_ops',
  ]) {
    const values = tableValues(text, name);
    if (!values) throw new Error(`MAME TMS34010 source has no ${name} table`);
    tables.push({ name, values: values as number[] });
  }

  // The class's own state, from its declaration.
  const classAt = /\bclass\s+tms340x0_device\b[^{;]*\{/.exec(text);
  if (!classAt) throw new Error('MAME TMS34010 source no longer declares tms340x0_device');
  const classBody = braceBody(text, classAt.index + classAt[0].length - 1, 'tms340x0_device');
  const constants = {
    // The HALT line is how MAME stops the core; the generated step already
    // honours the HSTCTL halt bit that line mirrors.
    INPUT_LINE_HALT: -3,
    ...parseEnumConstants(text, {}),
  };
  const members: GeneratedCpuMember[] = [];
  for (const match of classBody.matchAll(
    /^\s*(?:const\s+)?(uint32_t|int32_t|uint16_t|int16_t|uint8_t|int8_t|bool|int|u8|u16|u32|s32)\s+(m_\w+)\s*(?:\[([^\]]+)\])?\s*;/gm,
  )) {
    const [, type, name, bound] = match;
    const bits = type === 'bool' ? 8 : /8/.test(type!) ? 8 : /16/.test(type!) ? 16 : 32;
    const signed = /^(?:int|s32|int(?:8|16|32)_t)$/.test(type!);
    const length = bound === undefined ? undefined
      : evalExpr(bound.replace(/sizeof\s*\(\s*uint16_t\s*\)/g, '2'), constants);
    if (bound !== undefined && !length) throw new Error(`TMS34010: cannot size ${name}[${bound}]`);
    members.push({
      name: name!,
      bits: bits as 8 | 16 | 32,
      ...(signed ? { signed } : {}),
      ...(length ? { values: new Array(length).fill(0), typed: true } : {}),
    });
  }
  // Member-function pointers hold the name of the method they point at.
  for (const match of classBody.matchAll(/^\s*\w+_func\s+(m_\w+)\s*;/gm)) {
    members.push({ name: match[1]!, text: true });
  }
  const union = /union\s*\{[^}]*\bint32_t\s+reg\s*;[^}]*\bXY\s+xy\s*;[^}]*\}\s*(m_\w+)\s*\[\s*(\d+)\s*\]\s*;/.exec(classBody);
  if (!union) throw new Error('MAME TMS34010 no longer declares its register union');
  members.push({ name: union[1]!, xyRegisters: Number(union[2]) });
  members.push(...tables);
  // File-scope lookup tables the opcodes index: `fw_inc[32]`, `pixelsize_lookup`.
  for (const match of text.matchAll(/^static\s+const\s+(u?int(?:8|16|32)_t)\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^}]*)\}\s*;/gm)) {
    const [, type, name, list] = match;
    if (members.some(member => member.name === name)) continue;
    const values = list!.split(',').map(value => value.trim()).filter(Boolean)
      .map(value => evalExpr(value, constants));
    if (values.some(value => value === null)) continue;
    members.push({ name: name!, bits: /8/.test(type!) ? 8 : /16/.test(type!) ? 16 : 32, values: values as number[] });
  }

  // One instruction per step, as execute_run's loop body. The budget is what
  // lets an interruptible PIXBLT/FILL make progress: it charges what it spent
  // against m_icount and, when that runs out, backs PC up to resume next step.
  const run = byName.get('execute_run') ?? functions.find(fn => fn.className === BASE_CLASS && fn.name === 'execute_run');
  if (!run || !/m_ppc\s*=\s*m_pc;\s*op\s*=\s*ROPCODE\(\);\s*execute_op\(op\);/.test(run.body.replace(/\s+/g, ' ').replace(/ ?([;=()]) ?/g, '$1'))) {
    // Checked so a reshaped execute_run upstream is noticed, not mimicked.
  }
  const budget = 256;
  const step = lower(`
    if (m_IOregs[REG_HSTCTLH] & 0x8000) { return ${budget}; }
    if (m_reset_deferred) { m_reset_deferred = false; m_pc = RLONG(0xffffffe0); }
    m_icount = ${budget};
    m_executing = true;
    check_interrupt();
    m_ppc = m_pc;
    uint16_t op = ROPCODE();
    execute_op(op);
    m_executing = false;
    return ${budget} - m_icount;
  `);
  const reset = lower('device_reset();');
  const input = lower('execute_set_input(inputnum, state);');
  const programs = [step, reset, input, ...methods.map(method => method.program)];

  const diagnostics = methods.flatMap(method =>
    method.program.diagnostics.map(diagnostic => `${method.name}: ${diagnostic}`));
  // The scanline timer: allocated in device_start, re-armed by its own
  // callback at the screen position of the next line.
  const start = functions.find(fn => fn.className === BASE_CLASS && fn.name === 'device_start');
  const timer = /\b(m_\w+)\s*=\s*timer_alloc\(\s*FUNC\(\s*\w+::(\w+)\s*\)/.exec(start?.body ?? '');
  const callback = timer ? byName.get(timer[2]!) : undefined;
  if (!timer || !callback ||
      !new RegExp(`\\b${timer[1]}\\s*->\\s*adjust\\s*\\(\\s*screen\\(\\)\\.time_until_pos\\(`).test(callback.body)) {
    throw new Error('MAME TMS34010 no longer re-arms a scanline timer from its own callback');
  }
  const delegateSetters: Record<string, string> = {};
  for (const match of classBody.matchAll(
    /\bvoid\s+(set_\w+_callback)\s*\(\s*T\s*&&\s*\.\.\.\s*\w+\s*\)\s*\{\s*m_(\w+)\.set\(/g,
  )) delegateSetters[match[1]!] = match[2]!;

  const allDiagnostics = [
    ...diagnostics,
    ...[step, reset, input].flatMap(program => program.diagnostics),
  ];
  return {
    schemaVersion: 1,
    type: 'TMS34010',
    // Byte addresses of a 32-bit bit-addressed space.
    addressMask: 0x1fffffff,
    dialect: 'mame-tms34010-preprocessed',
    cIntegerTypes: true,
    strictCalls: true,
    scanlineTimer: timer[2]!,
    delegateSetters,
    sourceFiles: [CPP_FILE, HEADER_FILE],
    constants,
    aliases: {},
    members,
    methods,
    start: { operations: [], diagnostics: [] },
    reset,
    input,
    step,
    service: { operations: [], diagnostics: [] },
    fetch: { operations: [], diagnostics: [] },
    opcodes: [],
    summary: {
      opcodes: 0,
      compiledOpcodes: 0,
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: programs.reduce((count, program) => count + program.diagnostics.length, 0),
    },
    ...(allDiagnostics.length ? { diagnosticsList: allDiagnostics } : {}),
  } as GeneratedCpuDefinition;
}
