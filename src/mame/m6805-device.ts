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
  addSourceConstructor,
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
    enumHeaders: [`${DIRECTORY}/m6805.h`],
  });
  const part = definition.sourceFile === `${DIRECTORY}/m6805.cpp`
    ? undefined
    : preprocessedDeviceTransform(mameSrc, {
        entry: definition.sourceFile,
        allow: allow([`${DIRECTORY}/m6805defs.h`]),
        classes: [BASE],
        enumHeaders: [`${DIRECTORY}/m6805.h`],
      });
  const transformSource = (file: string, source: string) =>
    part ? part(file, core(file, source)) : core(file, source);
  const device = compileMameDevice(mameSrc, definition, definition.type, new Set(), { transformSource });

  const coreText = core(`${DIRECTORY}/m6805.cpp`, '');
  const chain = constructorChain(mameSrc, definition, device, coreText);
  const member = device.members.find(candidate => candidate.name === 'm_params');
  if (!member) throw new Error(`${definition.type}: MAME no longer declares m6805_base_device::m_params`);
  delete member.values;
  delete member.initial;
  member.fields = Object.keys(chain.params).map(name => ({ name }));
  member.initialValue = chain.params;
  for (const [name, value] of Object.entries(chain.members)) {
    const target = device.members.find(candidate => candidate.name === name);
    if (!target) throw new Error(`${definition.type}: no member ${name} for its constructor to set`);
    target.initial = value;
  }
  // The constructor bodies run when the device is built, base first:
  // m68705p_device's makes port A open drain and port C four bits wide.
  if (chain.bodies.length) {
    addSourceConstructor(device, {
      className: definition.className,
      name: '__construct',
      parameters: '',
      body: chain.bodies.join('\n'),
      initializers: [],
      span: { file: definition.sourceFile, line: 1, column: 1 },
    } as unknown as Parameters<typeof addSourceConstructor>[1]);
  }
  // Its program space is the internal map, wired as MAME's base constructor
  // wires it: `address_map_constructor(FUNC(m6805_hmos_device::map), this)`,
  // over m_addr_width address lines of 8-bit data.
  device.spaces = [{
    index: 0,
    name: 'program',
    addressBits: Number(chain.params.m_addr_width),
    dataBits: 8,
    map: 'map',
  }];
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
      .map(entry => {
        const name = /^"(\w+)"$/.exec(entry)?.[1];
        if (name) return name;
        const value = evalExpr(entry, {});
        if (value === null || value === undefined || !Number.isFinite(value)) {
          throw new Error(`${match[1]}: table entry ${entry} is neither a lowered handler nor a number`);
        }
        return value;
      });
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
interface ConstructorChain {
  /** m_params, as the brace list and configuration_params' constructor build it. */
  params: Record<string, unknown>;
  /** Members a constructor sets from its own parameters (`m_ram_size(ram_size)`). */
  members: Record<string, number>;
  /** Constructor bodies with statements, base class first, as C++ runs them. */
  bodies: string[];
}

function constructorChain(
  mameSrc: string,
  definition: MameHardwareDefinition,
  device: GeneratedDeviceDefinition,
  coreText: string,
): ConstructorChain {
  const sources = device.sourceFiles
    .filter(file => file.endsWith('.cpp'))
    .map(file => ({ file, source: readFileSync(join(mameSrc, file), 'utf8') }));
  const constructors = sources.flatMap(({ file, source }) => parseMameConstructors(file, source));
  const header = readFileSync(join(mameSrc, `${DIRECTORY}/m6805.h`), 'utf8');
  const constants = { ...device.constants } as Record<string, number>;
  const evaluate = (text: string): number => {
    const value = evalExpr(text.replace(/\b(\d+)[uU]\b/g, '$1'), constants);
    if (value === undefined || value === null || !Number.isFinite(value)) throw new Error(`${definition.type}: cannot evaluate ${text}`);
    return value;
  };

  // Overloads are chosen as C++ chooses them, by argument type as well as
  // count: m6805_hmos_device takes seven arguments two ways, an address width
  // or a whole configuration_params, and only a brace list (or a parameter
  // already of that type) binds the struct.
  const structs = new Set([...header.matchAll(/\bstruct\s+(\w+)/g)].map(match => match[1]!));
  const structOf = (declaration: string) =>
    [...structs].find(name => new RegExp(`\\b${name}\\b`).test(declaration));
  const choose = (className: string, args: string[], argTypes: (string | undefined)[]) =>
    constructors.filter(candidate => candidate.className === className).find(candidate => {
      const declared = splitMameArgs(candidate.parameters);
      return declared.length === args.length && declared.every((parameter, index) => {
        const wanted = structOf(parameter);
        const brace = /^\(?\s*\{/.test(args[index]!.trim());
        return wanted ? brace || argTypes[index] === wanted : !brace && !argTypes[index];
      });
    });

  // Walk down from the concrete class until a constructor hands its base the
  // configuration as a brace list.
  let className = definition.className;
  let bound: Bound = {};
  let types: Record<string, string | undefined> = {};
  let constructor = constructors.find(candidate => candidate.className === className);
  let params: Record<string, unknown> | undefined;
  const members: Record<string, number> = {};
  const bodies: string[] = [];
  // Each visited constructor's member initializers that read its own
  // parameters, and its body, before following its base call.
  const visit = (visited: NonNullable<typeof constructor>) => {
    for (const initializer of visited.initializers) {
      if (!/^m_\w+$/.test(initializer.name) || initializer.name === 'm_params' || initializer.args.length !== 1) continue;
      const argument = initializer.args[0]!.trim();
      if (bound[argument] === undefined) continue;
      members[initializer.name] = evaluate(substitute(argument, bound));
    }
    if (visited.body.trim()) bodies.unshift(substitute(visited.body, bound));
  };
  for (let depth = 0; depth < 16; depth++) {
    if (!constructor) throw new Error(`${definition.type}: no ${className} constructor fits its call`);
    visit(constructor);
    const step = constructor.initializers.find(initializer =>
      initializer.name === className || device.hierarchy?.includes(initializer.name));
    if (!step) {
      if (!params) throw new Error(`${definition.type}: ${className} names no base constructor`);
      return { params, members, bodies };
    }
    const args = step.args.map(argument => substitute(argument.trim(), bound));
    const brace = args.find(argument => /^\{[\s\S]*\}$/.test(argument.replace(/^\((.*)\)$/s, '$1').trim()));
    if (brace && !params) {
      params = configurationFields(brace.replace(/^\((.*)\)$/s, '$1').trim(), header, coreText, evaluate, definition.type);
    }
    const argTypes = step.args.map(argument => types[argument.trim()]);
    const callee = choose(step.name, args, argTypes);
    // Past configuration_params the chain runs into MAME's own cpu_device.
    if (!callee) {
      if (params) return { params, members, bodies };
      throw new Error(`${definition.type}: no ${step.name} constructor fits (${args.join(', ')})`);
    }
    const names = parameterNames(callee.parameters);
    const declared = splitMameArgs(callee.parameters);
    bound = Object.fromEntries(names.map((name, index) => [name, args[index]!]));
    types = Object.fromEntries(names.map((name, index) => [name, structOf(declared[index]!) ?? (/^\{/.test(args[index]!.trim()) ? 'brace' : undefined)]));
    className = step.name;
    constructor = callee;
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
    const choice = ternary(unwrap(text));
    const picked = choice ? unwrap(evaluate(choice.condition) ? choice.whenTrue : choice.whenFalse) : unwrap(text);
    const name = /^s_\w+$/.test(picked) ? picked : undefined;
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

/** `((x))` -> `x`, while the outer parentheses enclose the whole text. */
function unwrap(text: string): string {
  let value = text.trim();
  while (value.startsWith('(') && closing(value, 0) === value.length - 1) value = value.slice(1, -1).trim();
  return value;
}

function closing(text: string, open: number): number {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    if (text[index] === '(') depth++;
    else if (text[index] === ')' && --depth === 0) return index;
  }
  return -1;
}

/** `c ? a : b` split at its top level, or undefined. */
function ternary(text: string): { condition: string; whenTrue: string; whenFalse: string } | undefined {
  let depth = 0;
  let question = -1;
  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    if (char === '(') depth++;
    else if (char === ')') depth--;
    else if (depth === 0 && char === '?' && question < 0) question = index;
    else if (depth === 0 && char === ':' && question >= 0 && text[index + 1] !== ':' && text[index - 1] !== ':') {
      return { condition: text.slice(0, question), whenTrue: text.slice(question + 1, index), whenFalse: text.slice(index + 1) };
    }
  }
  return undefined;
}
