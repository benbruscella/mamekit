import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseMameSource } from './ast.ts';
import { compileMameHandler } from './handler-ir.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameDevice } from './device-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';
import type { GeneratedExpression, GeneratedHandlerProgram } from '../ir/board.ts';
import { parseDefines } from '../kg/parse.ts';

/** MAME's JED-binary PLA engine, with file access lowered to a ROM resource. */
export function compilePla(mameSource: string, definition: MameHardwareDefinition) {
  const device = compileMameDevice(mameSource, definition);
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  const header = readFileSync(join(mameSource, 'src/devices/machine/pla.h'), 'utf8');
  const jedFile = 'src/lib/util/jedparse.h';
  const jedHeader = readFileSync(join(mameSource, jedFile), 'utf8');
  const jedSource = readFileSync(join(mameSource, 'src/lib/util/jedparse.cpp'), 'utf8');
  const ast = parseMameSource(definition.sourceFile, source);
  const parser = ast.functions.find(method => method.name === 'parse_fusemap');
  const parseAt = parser?.body.indexOf('uint32_t fusenum');
  const fuse = /static inline int jed_get_fuse\([^)]*\)\s*\{([\s\S]*?)\n\}/.exec(jedHeader);
  const headerBytes = /uint8_t buf\[(\d+)\]/.exec(jedSource)?.[1];
  const terms = /struct\s+(\w+)\s*\{([^}]+)\}\s*(m_\w+)\[(\w+)\]/.exec(header);
  const constructor = new RegExp(`${definition.className}::${definition.className}[^{}]+\\{([^}]*)\\}`).exec(source);
  if (!parser || parseAt === undefined || parseAt < 0 || !fuse || !headerBytes || !terms || !constructor) {
    throw new Error('MAME PLA/JED source shape changed');
  }
  Object.assign(device.constants, parseDefines(jedHeader));
  const fields = [...terms[2]!.matchAll(/uint64_t\s+(\w+)\s*;/g)].map(match => ({ name: match[1]! }));
  device.structs = { ...device.structs, [terms[1]!]: fields };
  device.members.push({ name: terms[3]!, valueType: terms[1]!, fields,
    arrayLength: device.constants[terms[4]!] });
  device.resources = { ...device.resources, members: {
    ...device.resources?.members,
    m_fusemap: { kind: 'region-pointer', name: 'self', offset: Number(headerBytes) },
  } };
  const parseMethod = device.methods.find(method => method.name === 'parse_fusemap')!;
  // ROM ingestion validates the supplied region; JED's packed fuse bytes are
  // the resource here. All AND/OR/XOR construction below remains MAME code.
  parseMethod.program = compileMameHandler(normalizeMameExecutionSource(
    `int result = JEDERR_NONE; ${parser.body.slice(parseAt)}`
      .replace(/jed_get_fuse\(&jed,\s*/g, 'jed_get_fuse('),
  ));
  device.methods.push({ name: 'jed_get_fuse', parameters: 'uint32_t fusenum',
    source: { file: jedFile, line: jedHeader.slice(0, fuse.index).split('\n').length },
    program: compileMameHandler(fuse[1]!.replace(/data->fusemap/g, 'm_fusemap')) });
  const start = device.methods.find(method => method.name === 'device_start')!;
  const setup = compileMameHandler(constructor[1]!);
  start.program.operations.unshift(...setup.operations);
  start.program.diagnostics.push(...setup.diagnostics);
  const wideNames = new Set([...`${header}\n${source}`.matchAll(/\buint64_t\s+(\w+)/g)].map(match => match[1]!));
  for (const method of device.methods) method.program = lowerWide(method.program, wideNames);
  device.hotMethods = [...new Set([...(device.hotMethods ?? []), 'read', 'parse_fusemap', 'reinit', 'device_start'])];
  device.sourceFiles.push(jedFile, 'src/lib/util/jedparse.cpp');
  device.summary = { methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) };
  return device;
}

/** Retain the width of PLA masks even when their current value fits in 32 bits. */
function lowerWide(program: GeneratedHandlerProgram, names: Set<string>): GeneratedHandlerProgram {
  const wide = (expression: GeneratedExpression): boolean => {
    if (expression.kind === 'identifier') return names.has(expression.name);
    if (expression.kind === 'member') return names.has(expression.property);
    if (expression.kind === 'index') return wide(expression.object);
    if (expression.kind === 'cast') return expression.valueType === 'uint64_t';
    return expression.kind === 'binary' && expression.precision === 64;
  };
  const visit = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(visit);
    if (!value || typeof value !== 'object') return value;
    const result = Object.fromEntries(Object.entries(value).map(([key, child]) => [key, visit(child)]));
    if (result.op === 'declare' && result.value && wide(result.value as GeneratedExpression)) names.add(String(result.name));
    const expression = result as unknown as GeneratedExpression;
    if (expression.kind === 'binary' && !['&&', '||'].includes(expression.operator) &&
        (wide(expression.left) || wide(expression.right))) result.precision = 64;
    if (expression.kind === 'unary' && expression.operator === '~' && wide(expression.operand)) {
      return { kind: 'binary', operator: '^', precision: 64, left: expression.operand,
        right: { kind: 'number', value: 0, wide: '18446744073709551615' } };
    }
    if ((result.op === 'assign' || result.kind === 'assignment') && result.operator !== '=' &&
        wide(result.target as GeneratedExpression)) {
      result.value = { kind: 'binary', operator: String(result.operator).slice(0, -1), precision: 64,
        left: result.target, right: result.value };
      result.operator = '=';
    }
    return result;
  };
  return visit(program) as GeneratedHandlerProgram;
}
