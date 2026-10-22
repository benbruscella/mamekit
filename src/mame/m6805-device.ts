// MAME's 6805 family as a generated device.
//
// The 68705 is a CPU MAME builds out of three things the plain device compiler
// does not read on its own, all of them source:
//
// 1. The opcode handlers live in `6805ops.hxx`, which `m6805.cpp` includes, and
//    every head is a macro (`OP_HANDLER_MODE( neg )`) for a template over
//    `big` and an addressing mode, a bit number or a branch sense. The C
//    preprocessor route (preprocessed-device.ts) expands them, the tables'
//    `#define big false` included, and names each table entry's instance
//    (`neg_0_1` for `neg<false, addr_mode::DI>`). `m68705.cpp` is run through
//    it too: it uses the same `m6805defs.h` statement macros (`SEI`).
// 2. `execute_run` dispatches through `m_params.m_ops[ireg]` and charges
//    `m_params.m_cycles[ireg]`. `m_params` is built by the constructor chain
//    from constants -- the address width the concrete part passes down, the
//    stack mask and floor, the SWI vector -- and the static opcode and cycle
//    tables. That chain is evaluated here from the constructors as written.
// 3. The tables themselves are static class members defined at file scope.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import { parseMameConstructors, splitMameArgs } from './ast.ts';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
} from './device-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';
import { preprocessedDeviceTransform } from './preprocessed-device.ts';

const DIRECTORY = 'src/devices/cpu/m6805';
const BASE = 'm6805_base_device';

export function compileM6805Device(
  mameSrc: string,
  definition: MameHardwareDefinition,
): GeneratedDeviceDefinition {
  const allow = (files: string[]) => (file: string) => files.includes(file);
  const core = preprocessedDeviceTransform(mameSrc, {
    entry: `${DIRECTORY}/m6805.cpp`,
    allow: allow([`${DIRECTORY}/m6805defs.h`, `${DIRECTORY}/6805ops.hxx`]),
    classes: [BASE],
  });
  const part = definition.sourceFile === `${DIRECTORY}/m6805.cpp`
    ? undefined
    : preprocessedDeviceTransform(mameSrc, {
        entry: definition.sourceFile,
        allow: allow([`${DIRECTORY}/m6805defs.h`]),
        classes: [BASE],
      });
  const transformSource = (file: string, source: string) =>
    part ? part(file, core(file, source)) : core(file, source);
  const device = compileMameDevice(mameSrc, definition, definition.type, new Set(), { transformSource });

  const coreText = core(`${DIRECTORY}/m6805.cpp`, '');
  const params = configurationParams(mameSrc, definition, device, coreText);
  const member = device.members.find(candidate => candidate.name === 'm_params');
  if (!member) throw new Error(`${definition.type}: MAME no longer declares m6805_base_device::m_params`);
  delete member.values;
  delete member.initial;
  member.fields = Object.keys(params).map(name => ({ name }));
  member.initialValue = params;
  return device;
}

/**
 * The static tables `m6805.cpp` defines at file scope, by name: an opcode
 * table is the 256 instance names its entries became, a cycle table its
 * numbers.
 */
function staticTables(coreText: string): Map<string, (string | number)[]> {
  const tables = new Map<string, (string | number)[]>();
  const pattern = new RegExp(`${BASE}::(s_\\w+)\\s*=\\s*\\{([\\s\\S]*?)\\};`, 'g');
  for (const match of coreText.matchAll(pattern)) {
    const entries = splitMameArgs(match[2]!.replace(/\/\*[\s\S]*?\*\//g, ''))
      .map(entry => entry.trim().replace(/^\((.*)\)$/s, '$1').trim())
      .filter(Boolean)
      .map(entry => /^"(\w+)"$/.exec(entry)?.[1] ?? Number(evalExpr(entry, {})));
    tables.set(match[1]!, entries);
  }
  return tables;
}

type Bound = Record<string, string>;

/** `u32 addr_width` -> addr_width, for each declared parameter. */
function parameterNames(parameters: string): string[] {
  return splitMameArgs(parameters).map(parameter =>
    /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.trim())?.[1] ?? parameter.trim());
}

/** Replace each bound parameter name in an expression by its argument. */
function substitute(text: string, bound: Bound): string {
  return text.replace(/\b[A-Za-z_]\w*\b/g, name => bound[name] !== undefined ? `(${bound[name]})` : name);
}

/**
 * m_params as the constructor chain builds it for the concrete part: each
 * constructor's base (or delegated) call is followed with its arguments
 * bound, down to the brace initializer that becomes `configuration_params`,
 * whose own constructor (chosen by arity, as C++ chooses it) gives each field.
 */
function configurationParams(
  mameSrc: string,
  definition: MameHardwareDefinition,
  device: GeneratedDeviceDefinition,
  coreText: string,
): Record<string, unknown> {
  const sources = device.sourceFiles
    .filter(file => file.endsWith('.cpp'))
    .map(file => ({ file, source: readFileSync(join(mameSrc, file), 'utf8') }));
  const constructors = sources.flatMap(({ file, source }) => parseMameConstructors(file, source));
  const header = readFileSync(join(mameSrc, `${DIRECTORY}/m6805.h`), 'utf8');
  const constants = { ...device.constants } as Record<string, number>;
  const evaluate = (text: string): number => {
    const value = evalExpr(text.replace(/\b(\d+)[uU]\b/g, '$1'), constants);
    if (value === undefined || !Number.isFinite(value)) throw new Error(`${definition.type}: cannot evaluate ${text}`);
    return value;
  };

  // Walk down from the concrete class until a constructor hands its base the
  // configuration as a brace list.
  let className = definition.className;
  let bound: Bound = {};
  let callArity: number | undefined;
  for (let depth = 0; depth < 16; depth++) {
    const candidates = constructors.filter(candidate => candidate.className === className);
    const constructor = callArity === undefined
      ? candidates[0]
      : candidates.find(candidate => parameterNames(candidate.parameters).length === callArity);
    if (!constructor) throw new Error(`${definition.type}: no ${className} constructor taking ${callArity ?? 'its'} arguments`);
    const step = constructor.initializers.find(initializer =>
      initializer.name === className || device.hierarchy?.includes(initializer.name));
    if (!step) throw new Error(`${definition.type}: ${className} names no base constructor`);
    const args = step.args.map(argument => substitute(argument.trim(), bound));
    const brace = args.find(argument => /^\{[\s\S]*\}$/.test(argument.replace(/^\((.*)\)$/s, '$1').trim()));
    if (brace) {
      return configurationFields(brace.replace(/^\((.*)\)$/s, '$1').trim(), header, coreText, evaluate, definition.type);
    }
    const next = constructors.filter(candidate => candidate.className === step.name);
    const callee = next.find(candidate => parameterNames(candidate.parameters).length === args.length);
    if (!callee) throw new Error(`${definition.type}: no ${step.name} constructor taking ${args.length} arguments`);
    bound = Object.fromEntries(parameterNames(callee.parameters).map((name, index) => [name, args[index]!]));
    className = step.name;
    callArity = args.length;
  }
  throw new Error(`${definition.type}: constructor chain does not reach configuration_params`);
}

function configurationFields(
  brace: string,
  header: string,
  coreText: string,
  evaluate: (text: string) => number,
  type: string,
): Record<string, unknown> {
  const values = splitMameArgs(brace.slice(1, -1)).map(value => value.trim());
  // configuration_params' inline constructors, as the header declares them.
  const constructor = [...header.matchAll(/configuration_params\s*\(([^)]*)\)\s*:([\s\S]*?)\{\s*\}/g)]
    .map(match => ({ parameters: parameterNames(match[1]!), initializers: match[2]! }))
    .find(candidate => candidate.parameters.length === values.length);
  if (!constructor) throw new Error(`${type}: no configuration_params constructor takes ${values.length} values`);
  const bound: Bound = Object.fromEntries(constructor.parameters.map((name, index) => [name, values[index]!]));
  const tables = staticTables(coreText);
  const fields: Record<string, unknown> = {};
  for (const initializer of constructor.initializers.matchAll(/(m_\w+)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
    const text = substitute(initializer[2]!.trim(), bound);
    // A table is chosen by name (`addr_width > 13 ? s_hmos_b_ops : s_hmos_s_ops`).
    const choice = /^\(?\(?(.+?)\)?\s*\?\s*\(?(s_\w+)\)?\s*:\s*\(?(s_\w+)\)?\)?$/.exec(text);
    const name = choice ? (evaluate(choice[1]!) ? choice[2]! : choice[3]!) : /^\(?(s_\w+)\)?$/.exec(text)?.[1];
    if (name) {
      const table = tables.get(name);
      if (!table) throw new Error(`${type}: MAME defines no ${name} table`);
      fields[initializer[1]!] = table;
      continue;
    }
    fields[initializer[1]!] = evaluate(text);
  }
  return fields;
}
