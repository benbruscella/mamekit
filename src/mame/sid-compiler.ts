import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr, parseDefines, parseEnumConstants } from '../kg/parse.ts';
import { maskComments, parseMameSource, splitMameArgs, type MameFunction } from './ast.ts';
import { normalizeMameExecutionSource, stripInactivePreprocessorBranches } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import { compileMameDevice, type GeneratedDeviceDefinition, type GeneratedDeviceMember, type GeneratedStructField } from './device-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';
import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import { nestedOperations, operationExpressions } from '../ir/walk.ts';

/** Compose MAME's SID helper structs into the owning device's execution scope.
 * Waveforms, envelopes, filters and register behaviour are compiled from source.
 * This adapter only supplies C++ storage and explicit receivers for helper methods.
 */
export function compileSid(mameSource: string, hardware: MameHardwareDefinition): GeneratedDeviceDefinition {
  const names = ['sid.cpp', 'sidvoice.cpp', 'sidenvel.cpp', 'sid.h', 'sidvoice.h', 'sidenvel.h', 'side6581.h', 'sidw6581.h', 'sidw8580.h'];
  const units = names.map(name => {
    const file = `src/devices/sound/${name}`;
    const source = stripInactivePreprocessorBranches(maskComments(readFileSync(join(mameSource, file), 'utf8')));
    return parseMameSource(file, source);
  });
  const streamHeader = readFileSync(join(mameSource, 'src/emu/sound.h'), 'utf8');
  const sampleType = /using\s+sample_t\s*=\s*(\w+)\s*;/.exec(streamHeader)?.[1] ?? '';
  if (sampleType !== 'float') throw new Error('MAME sound_stream sample type changed');
  const wrapper = compileMameDevice(mameSource, hardware);
  const constants = { ...wrapper.constants };
  for (const unit of units) Object.assign(constants, parseDefines(unit.source), parseEnumConstants(unit.source, constants));
  const number = (expression: string): number => {
    const value = evalExpr(expression.replace(/(?<![\w.])((?:\d+\.\d*|\d*\.\d+|\d+)(?:[eE][+-]?\d+)?)[fF]\b/g, '$1'), constants);
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error(`SID constant unresolved: ${expression}`);
    return value;
  };
  const aliases = new Map(units.flatMap(unit => [...unit.source.matchAll(/^\s*#define\s+(\w+)\s+([^\n]+)$/gm)].map(match => [match[1]!, match[2]!.trim()] as const)));
  const functionTables: string[] = [];
  function declarations(body: string): GeneratedDeviceMember[] {
    body = body.replace(/\*(?=\w)/g, '* ');
    const members: GeneratedDeviceMember[] = [];
    // This source dialect has scalar, pointer and one-dimensional array declarators.
    const pattern = /(?:^|\n)\s*((?:(?:static|const|constexpr)\s+)*[\w:]+(?:<[^;\n]+>)?(?:\s*\*)?)\s+(\w[^;]*);/g;
    for (const match of body.matchAll(pattern)) {
      const valueType = match[1]!.replace(/\b(?:static|constexpr)\s*/g, '').trim();
      if (/^(?:return|extern|typedef|void|struct|class)\b/.test(valueType) || /\(/.test(match[2]!)) continue;
      for (const item of splitMameArgs(match[2]!)) {
        const parsed = /^(\w+)\s*(?:\[([^\]]*)\])?\s*(?:=\s*([\s\S]+)|\{([\s\S]*)\})?$/.exec(item.trim());
        if (!parsed) throw new Error(`SID declaration unsupported: ${item}`);
        const [, name, bound, initializer, braceInitializer] = parsed;
        const raw = (initializer ?? braceInitializer)?.trim();
        const values = raw?.replace(/^\{([\s\S]*)\}$/, '$1').split(',').map(value => value.trim()).filter(Boolean);
        const isPointer = /\*|unique_ptr|ptr2sid/.test(valueType);
        const scalar = /^(?:const\s+)?(?:u?int(8|16|32)_t|int|char|bool)$/.exec(valueType);
        const bits = !isPointer && scalar ? (scalar[1] ? Number(scalar[1]) : valueType === 'char' ? 8 : 32) as 8 | 16 | 32 : undefined;
        const member: GeneratedDeviceMember = { name: name!, valueType, ...(bits ? { bits, signed: !/\buint|\bbool/.test(valueType) } : {}) };
        if (bound !== undefined) {
          member.arrayLength = bound.trim() ? number(bound) : values?.length;
          if (!member.arrayLength) throw new Error(`SID array has no bound: ${name}`);
          if (/ptr2sid/.test(valueType)) {
            values?.forEach((value, index) => functionTables.push(`${name}[${index}] = ${value};`));
          } else member.values = Array.from({ length: member.arrayLength }, (_, index) => values?.[index] ? number(values[index]!) : 0);
        } else if (raw && raw !== 'nullptr') {
          member.initial = number(raw);
          if (/\bconst\b/.test(valueType)) constants[name!] = member.initial;
        }
        members.push(member);
      }
    }
    for (const match of body.matchAll(/(?:^|\n)\s*[\w:]+\s*\(\*\s*(\w+)\)\([^;]*;/g)) members.push({ name: match[1]!, valueType: 'function_pointer' });
    return members;
  }
  function shape(members: GeneratedDeviceMember[]): GeneratedStructField[] {
    return members.map(member => ({ name: member.name, valueType: member.valueType, ...(member.bits ? { bits: member.bits as 8 | 16 | 32, signed: member.signed } : {}),
      ...(member.arrayLength ? { length: member.arrayLength } : {}), ...(member.fields ? { fields: member.fields } : {}) }));
  }
  const voiceClass = units.flatMap(unit => unit.classes).find(item => item.name === 'sidOperator')!;
  const storageMatch = /struct\s+sw_storage\s*\{([\s\S]*?)\};/.exec(voiceClass.body)!;
  const storage = declarations(storageMatch[1]!);
  const voiceMembers = declarations(voiceClass.body.replace(storageMatch[0], ''));
  voiceMembers.find(member => member.name === 'wavePre')!.fields = shape(storage);
  const rootClass = units.flatMap(unit => unit.classes).find(item => item.name === 'SID6581_t')!;
  const filterMatch = /struct\s*\{([\s\S]*?)\}\s*filter\s*;/.exec(rootClass.body)!;
  const rootMembers = declarations(rootClass.body.replace(filterMatch[0], ''));
  rootMembers.push({ name: 'filter', valueType: 'sid_filter', fields: shape(declarations(filterMatch[1]!)) });
  rootMembers.find(member => member.name === 'optr')!.fields = shape(voiceMembers);
  const globals: GeneratedDeviceMember[] = [];
  for (const unit of units) {
    let body = unit.source;
    const ranges = [...unit.functions, ...unit.classes].map(item => item.span).sort((a, b) => b.start - a.start);
    for (const span of ranges) body = body.slice(0, span.start) + body.slice(span.start, span.end).replace(/[^\n]/g, ' ') + body.slice(span.end);
    globals.push(...declarations(body));
  }
  const methods = units.flatMap(unit => unit.functions).filter(method => !method.className || ['SID6581_t', 'sidOperator'].includes(method.className));
  const voiceNames = new Set(methods.filter(method => method.className === 'sidOperator').map(method => method.name));
  const staticVoiceNames = new Set([...voiceClass.body.matchAll(/static\s+\w+\s+(\w+)\s*\(/g)].map(match => match[1]!));
  const voiceFields = new Set(voiceMembers.map(member => member.name));
  const identifier = (name: string): GeneratedExpression => ({ kind: 'identifier', name });
  function lower(method: MameFunction, wrapperMethod = false) {
    const instance = method.className === 'sidOperator' && !staticVoiceNames.has(method.name);
    let source = method.body.replace(/\bsound_stream::sample_t\b/g, sampleType).replace(/\blowPassParam\b/g, 'filterTable').replace(/sidOperator::(\w+)/g, 'sidOperator_$1');
    for (const [name, value] of aliases) source = source.replace(new RegExp(`\\b${name}\\b`, 'g'), `(${value})`);
    if (wrapperMethod) source = source.replace(/m_token\s*=\s*std::make_unique<SID6581_t>\(\)\s*;/g, '').replace(/\bsave_state\([^;]*;/g, '');
    // Heap array bounds and element types are source declarations. Give their
    // owning members allocated storage; no chip behaviour is supplied here.
    source = source.replace(/(\w+)\s*=\s*std::make_unique<([^>]+)\[\]>\(([^)]+)\)\s*;/g, (_all, name, element, count) => {
      const member = globals.find(item => item.name === name);
      if (!member) throw new Error(`SID heap storage missing: ${name}`);
      member.valueType = element; member.arrayLength = number(count); member.values = Array(member.arrayLength).fill(0);
      if (/int8_t/.test(element)) { member.bits = 8; member.signed = !/uint/.test(element); }
      return '';
    });
    const program = compileMameHandler(normalizeMameExecutionSource(source));
    const locals = new Set(method.parameters.split(',').map(value => /(\w+)\s*$/.exec(value)?.[1]).filter(Boolean));
    const collect = (operations: GeneratedHandlerOperation[]) => operations.forEach(operation => {
      if (operation.op === 'declare') locals.add(operation.name);
      nestedOperations(operation).forEach(collect);
    });
    collect(program.operations);
    function rewrite(expression: GeneratedExpression): GeneratedExpression {
      if (expression.kind === 'identifier') {
        if (expression.name.startsWith('sidOperator::')) return identifier(expression.name.replace('::', '_'));
        if (instance && expression.name === 'this') return identifier('voice');
        if (instance && voiceFields.has(expression.name) && !locals.has(expression.name)) return { kind: 'member', object: identifier('voice'), property: expression.name };
        return expression;
      }
      if (expression.kind === 'member') {
        if (wrapperMethod && expression.object.kind === 'identifier' && expression.object.name === 'm_token') return identifier(expression.property);
        expression.object = rewrite(expression.object);
      } else if (expression.kind === 'call') {
        const callee = expression.callee;
        if (callee.kind === 'member' && voiceNames.has(callee.property)) {
          expression.callee = identifier(`sidOperator_${callee.property}`);
          expression.args.unshift(callee.object.kind === 'index'
            ? { kind: 'unary', operator: '&', operand: callee.object } : callee.object);
        } else if (instance && callee.kind === 'identifier' && voiceNames.has(callee.name)) {
          expression.callee = identifier(`sidOperator_${callee.name}`); expression.args.unshift(identifier('voice'));
        } else expression.callee = rewrite(callee);
        expression.args = expression.args.map(rewrite);
      } else {
        for (const key of ['operand', 'object', 'index', 'left', 'right', 'target', 'value', 'condition', 'whenTrue', 'whenFalse']) {
          if (key in expression && typeof (expression as any)[key] === 'object') (expression as any)[key] = rewrite((expression as any)[key]);
        }
      }
      return expression;
    }
    const transform = (operations: GeneratedHandlerOperation[]) => operations.forEach(operation => {
      for (const expression of operationExpressions(operation)) {
        const replacement = rewrite(expression);
        if (replacement !== expression) {
          for (const key of Object.keys(expression)) delete (expression as any)[key];
          Object.assign(expression, replacement);
        }
      }
      nestedOperations(operation).forEach(transform);
    });
    transform(program.operations);
    return { name: method.className === 'sidOperator' ? `sidOperator_${method.name}` : method.name,
      parameters: `${instance ? 'sidOperator *voice' + (method.parameters.trim() ? ', ' : '') : ''}${method.parameters}`,
      source: { file: method.span.file, line: method.span.line }, program };
  }
  const compiled = methods.map(method => lower(method));
  const wrapperFile = 'src/devices/sound/mos6581.cpp';
  const wrapperUnit = parseMameSource(wrapperFile, maskComments(readFileSync(join(mameSource, wrapperFile), 'utf8')));
  for (const method of wrapperUnit.functions.filter(method => method.className === 'mos6581_device' && ['device_start', 'device_reset', 'sound_stream_update', 'read', 'write'].includes(method.name))) compiled.push(lower(method, true));
  compiled.find(method => method.name === 'device_start')!.program.operations.unshift(...compileMameHandler(functionTables.join('\n')).operations);
  const members = [...wrapper.members.filter(member => member.name !== 'm_token'), ...rootMembers, ...globals];
  return { ...wrapper, sourceFiles: [...new Set([...wrapper.sourceFiles, 'src/emu/sound.h', ...units.map(unit => unit.file)])], constants,
    members: [...new Map(members.map(member => [member.name, member])).values()],
    structs: { ...wrapper.structs, SID6581_t: shape(rootMembers), sidOperator: shape(voiceMembers), sw_storage: shape(storage), sid_filter: rootMembers.find(member => member.name === 'filter')!.fields! },
    methods: compiled, hotMethods: compiled.map(method => method.name), start: 'device_start', reset: 'device_reset',
    summary: { methods: compiled.length, compiledMethods: compiled.filter(method => !method.program.diagnostics.length).length,
      diagnostics: compiled.reduce((sum, method) => sum + method.program.diagnostics.length, 0) } };
}
