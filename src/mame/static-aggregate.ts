// File-scope constant aggregates, lowered to data.
//
// MAME describes some boards as tables a device walks when it starts. A
// DISCRETE sound board is `DISCRETE_SOUND_START(name) ... DISCRETE_SOUND_END`,
// which discrete.h's macros expand to `const discrete_block name[] = { ... };`,
// one brace-initialised block per node, each naming its node class through
// `&discrete_node_factory<C>::create` and its description through a pointer
// to another constant (`&qix_attn_table`). The machine config hands the table
// to the device (`DISCRETE(config, m_discrete, qix_discrete)`), so it reaches
// the generated device as configuration: the values the initialiser spells,
// named by the struct's fields, with what each pointer points at in its place.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { evalExpr, expandConstexprCalls, parseConstexprFunctions } from '../kg/parse.ts';
import { parseMameAst, splitMameArgs } from './ast.ts';
import { CPreprocessor } from './c-preprocessor.ts';
import { numericConstants, structDeclarations, type GeneratedStructField } from './device-compiler.ts';

export type AggregateValue = number | string | AggregateValue[] | { [field: string]: AggregateValue };

/** The constant aggregates one driver file declares, after its preprocessor. */
export interface DriverAggregates {
  /** Whether the file declares a constant aggregate of this name. */
  has(name: string): boolean;
  /**
   * The file's numeric constants after its preprocessor: qix_a.cpp's
   * `QIX_DAC_DATA = NODE_01` names an enumerator discrete.h only declares
   * through NODE_DEF, which the graph reads as written cannot evaluate.
   */
  readonly constants: Readonly<Record<string, number>>;
  /** Its value, or undefined with the reason in `diagnostics`. */
  lower(name: string): AggregateValue | undefined;
  readonly diagnostics: string[];
}

interface Declaration {
  type: string;
  array: boolean;
  initializer: string;
}

/**
 * The aggregates of `file`, preprocessed with the headers `headers` allows
 * (the device's own, which define the table macros and the structs) and the
 * driver's directory, which holds its other headers.
 */
export function driverAggregates(
  mameSrc: string,
  file: string,
  headers: (file: string) => boolean,
): DriverAggregates {
  const own = dirname(file);
  const preprocessor = new CPreprocessor({
    read: (path, from) => {
      for (const full of [join(dirname(from), path), join(mameSrc, 'src/devices', path), join(mameSrc, 'src/mame', path)]) {
        const candidate = relative(mameSrc, full);
        if (!existsSync(full) || !/\.(?:h|hxx|ipp)$/.test(candidate)) continue;
        if (dirname(candidate) !== own && !headers(candidate)) continue;
        return { path: full, source: readFileSync(full, 'utf8') };
      }
      return undefined;
    },
  });
  const text = preprocessor.run(join(mameSrc, file), readFileSync(join(mameSrc, file), 'utf8'));
  const declarations = aggregateDeclarations(text);
  const constants = numericConstants(text);
  // A `#define` is gone once the preprocessor has run, and a driver names its
  // nodes that way: asteroid_a.cpp's `#define ASTEROID_SAUCER_SND_EN NODE_01`,
  // which a latch wires to `write_line<ASTEROID_SAUCER_SND_EN>`.
  const macroValues = (): void => {
    for (const name of preprocessor.objectMacros()) {
      if (constants[name] !== undefined || !/^[A-Z_][A-Z0-9_]*$/.test(name)) continue;
      const value = numeric(preprocessor.expand(name));
      if (value !== undefined) constants[name] = value;
    }
  };
  const structs = structDeclarations([{ file, source: text }], constants);
  // A struct declared inside a class is named through it:
  // `discrete_dss_inverter_osc_node::description`.
  for (const declaration of parseMameAst([{ file, source: text }]).units.flatMap(unit => unit.classes)) {
    if (!/\bstruct\s+\w+\s*\{/.test(declaration.body)) continue;
    for (const [name, fields] of structDeclarations([{ file, source: declaration.body }], constants)) {
      structs.set(`${declaration.name}::${name}`, fields);
    }
  }
  const diagnostics: string[] = [];
  const lowered = new Map<string, AggregateValue | undefined>();
  const resolving = new Set<string>();

  // rescap.h's RES_K and CAP_U are constexpr functions, not macros.
  const functions = parseConstexprFunctions(text);
  const numeric = (expression: string): number | undefined => {
    // An XTAL's arithmetic is its frequency: `(XTAL(61'440'000) / 5).dvalue()`.
    // A literal may lead with its point: phoenix's `CAP_U(.001)`.
    // A class's enumerator spelled through its class is the enumerator:
    // `discrete_dss_inverter_osc_node::IS_TYPE1`.
    const unqualified = expression.replace(/\b\w+::([A-Z_][A-Z0-9_]*)\b/g, (whole, name: string) => constants[name] !== undefined ? name : whole);
    let substituted = expandConstexprCalls(unqualified.replace(/\.\s*d?value\s*\(\s*\)/g, '').replace(/(?<![\w.])\.(?=\d)/g, '0.'), functions)
      // An integral cast truncates: `static_cast<int>(RES_K(1.5))`, `int(x)`.
      .replace(/\bstatic_cast\s*<\s*(?:unsigned\s+)?(?:int|long|u?int(?:8|16|32|64)_t|[us](?:8|16|32))\s*>\s*\(/g, 'int(')
      .replace(/\bstatic_cast\s*<[^<>]*>/g, '')
      .replace(/(?<![\w:.])[A-Za-z_]\w*(?![\w:])/g, token =>
        token === 'true' ? '1' : token === 'false' || token === 'nullptr' || token === 'NULL' ? '0'
          : constants[token] !== undefined ? String(constants[token]) : token);
    // Innermost first: the last cast to open is inside any before it.
    for (let cast; (cast = [...substituted.matchAll(/\bint\s*\(/g)].at(-1));) {
      const open = cast.index + cast[0].length - 1;
      let close = open;
      for (let depth = 0; close < substituted.length; close++) {
        if (substituted[close] === '(') depth++;
        else if (substituted[close] === ')' && --depth === 0) break;
      }
      const inner = evalExpr(substituted.slice(open + 1, close), {});
      if (inner === null) return undefined;
      substituted = `${substituted.slice(0, cast.index)}(${Math.trunc(inner)})${substituted.slice(close + 1)}`;
    }
    const value = evalExpr(substituted, {});
    return value !== null && Number.isFinite(value) ? value : undefined;
  };

  const scalar = (raw: string, where: string): AggregateValue | undefined => {
    // A C cast changes nothing a table holds: `(const void *)name` is name.
    const text = raw.trim().replace(/^\(\s*(?:const\s+)?[\w:]+\s*\*+\s*\)\s*/, '');
    const strings = [...text.matchAll(/"((?:[^"\\]|\\.)*)"/g)];
    if (strings.length && text.replace(/"(?:[^"\\]|\\.)*"/g, '').trim() === '') {
      return strings.map(match => JSON.parse(`"${match[1]}"`) as string).join('');
    }
    // A function a field points at, named as the class template instance
    // spells it: `&discrete_node_factory< discrete_dst_rcfilter_node >::create`.
    // Only with `&` or template arguments: `Class::NAME` alone is a constant.
    const function_ = /^&?\s*([\w:]+(?:\s*<[^;{}]*>)?\s*::\s*\w+)$/.exec(text);
    if (function_ && (text.startsWith('&') || function_[1]!.includes('<')) && !declarations.has(function_[1]!)) {
      return function_[1]!.replace(/\s+/g, '');
    }
    const reference = /^&?\s*(\w+)$/.exec(text);
    if (reference && declarations.has(reference[1]!)) return lower(reference[1]!);
    const value = numeric(text);
    if (value === undefined) diagnostics.push(`${where}: cannot evaluate ${text}`);
    return value;
  };

  const shaped = (raw: string, type: string | undefined, length: number | undefined, where: string): AggregateValue | undefined => {
    const text = raw.trim();
    if (length !== undefined) {
      const items = text.startsWith('{') ? braceItems(text) : [text];
      return Array.from({ length }, (_unused, index) => items[index] === undefined
        ? zero(type)
        : shaped(items[index]!, type, undefined, `${where}[${index}]`) ?? 0);
    }
    const fields = type ? structs.get(type.replace(/\bconst\b|\*/g, '').trim()) : undefined;
    if (fields && text.startsWith('{')) return record(braceItems(text), fields, where);
    if (text.startsWith('{')) {
      const items = braceItems(text);
      return items.length === 1 ? shaped(items[0]!, type, undefined, where) : items.map((item, index) => shaped(item, type, undefined, `${where}[${index}]`) ?? 0);
    }
    return scalar(text, where);
  };

  const zero = (type: string | undefined): AggregateValue => {
    const fields = type ? structs.get(type) : undefined;
    return fields ? record([], fields, '') : 0;
  };

  const record = (items: string[], fields: GeneratedStructField[], where: string): AggregateValue => {
    const value: Record<string, AggregateValue> = {};
    fields.forEach((field, index) => {
      const item = items[index];
      const type = field.fields ? undefined : field.valueType;
      if (field.fields) {
        value[field.name] = item === undefined ? record([], field.fields, '') : record(braceItems(item), field.fields, `${where}.${field.name}`);
        return;
      }
      value[field.name] = item === undefined ? (field.length ? Array(field.length).fill(zero(type)) : zero(type))
        : shaped(item, type, field.length, `${where}.${field.name}`) ?? 0;
    });
    return value;
  };

  const lower = (name: string): AggregateValue | undefined => {
    if (lowered.has(name)) return lowered.get(name);
    const declaration = declarations.get(name);
    if (!declaration) return undefined;
    if (resolving.has(name)) {
      diagnostics.push(`${name}: refers to itself`);
      return undefined;
    }
    resolving.add(name);
    const before = diagnostics.length;
    const value = declaration.array
      ? braceItems(declaration.initializer).map((item, index) => shaped(item, declaration.type, undefined, `${name}[${index}]`) ?? 0)
      : shaped(declaration.initializer, declaration.type, undefined, name);
    resolving.delete(name);
    const result = diagnostics.length > before ? undefined : value;
    lowered.set(name, result);
    return result;
  };

  macroValues();
  return { has: name => declarations.has(name), lower, diagnostics, constants };
}

/** File-scope `const T name[] = { ... };` and `const T name = { ... };`. */
function aggregateDeclarations(text: string): Map<string, Declaration> {
  const declarations = new Map<string, Declaration>();
  // `const T name`, or `T const name` as mw8080bw_a.cpp spells its descriptors.
  const opener = /(?:^|[;}\n])\s*(?:static\s+)?(?:(?:const|constexpr)\s+)*(?:struct\s+)?([\w:]+)\s+(?:const\s+)?(\w+)\s*(\[[^\]]*\])?\s*=\s*\{/g;
  for (let match; (match = opener.exec(text));) {
    const open = match.index + match[0].length - 1;
    const close = matchingBrace(text, open);
    if (close < 0) continue;
    declarations.set(match[2]!, { type: match[1]!, array: Boolean(match[3]), initializer: text.slice(open, close + 1) });
    opener.lastIndex = close + 1;
  }
  return declarations;
}

/** The comma-separated items of `{ ... }`, a trailing comma allowed. */
function braceItems(text: string): string[] {
  const inner = text.trim().replace(/^\{/, '').replace(/\}$/, '');
  return splitMameArgs(inner).map(item => item.trim()).filter(item => item !== '');
}

function matchingBrace(text: string, open: number): number {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    const character = text[index];
    if (character === '"' || character === "'") {
      for (index++; index < text.length && text[index] !== character; index++) if (text[index] === '\\') index++;
      continue;
    }
    if (character === '{') depth++;
    else if (character === '}' && --depth === 0) return index;
  }
  return -1;
}

const DRIVER_AGGREGATES = new Map<string, DriverAggregates>();

/**
 * A table a machine config hands a device's constructor, as data. The
 * driver is read through the device's own headers: its directory's, and those
 * its header includes (discrete.h's `machine/rescap.h`, which defines RES_K).
 * Each driver is preprocessed once a process.
 */
export function deviceTable(
  mameSrc: string,
  driverFile: string,
  name: string,
  deviceSourceFile: string,
): { value: AggregateValue | undefined; diagnostics: string[]; constants: Readonly<Record<string, number>> } {
  const key = `${mameSrc}\0${driverFile}\0${deviceSourceFile}`;
  let aggregates = DRIVER_AGGREGATES.get(key);
  if (!aggregates) {
    const own = dirname(deviceSourceFile);
    const header = join(mameSrc, deviceSourceFile.replace(/\.cpp$/, '.h'));
    const included = new Set(existsSync(header)
      ? [...readFileSync(header, 'utf8').matchAll(/^\s*#\s*include\s+"([^"]+)"/gm)].map(match => join('src/devices', match[1]!))
      : []);
    aggregates = driverAggregates(mameSrc, driverFile, file => dirname(file) === own || included.has(file));
    DRIVER_AGGREGATES.set(key, aggregates);
  }
  const before = aggregates.diagnostics.length;
  const value = aggregates.lower(name);
  return { value, diagnostics: aggregates.diagnostics.slice(before), constants: aggregates.constants };
}

/** The class-template function instances a table names (`discrete_node_factory<C>::create`). */
export function aggregateFunctionReferences(value: AggregateValue | undefined): string[] {
  const found = new Set<string>();
  const visit = (item: AggregateValue | undefined): void => {
    if (typeof item === 'string') {
      if (/^\w+<[\w:]+>::\w+$/.test(item)) found.add(item);
    } else if (Array.isArray(item)) item.forEach(visit);
    else if (item && typeof item === 'object') Object.values(item).forEach(visit);
  };
  visit(value);
  return [...found].sort();
}

/**
 * The tables a machine config hands a device: through its constructor
 * (`DISCRETE(config, m_discrete, qix_discrete)`, recorded by the graph as
 * `constructorAggregate`), or through a setter on its finder
 * (`m_discrete->set_intf(galaxian_discrete)`). A setter's identifier counts
 * only when the driver declares an aggregate of that name.
 */
export function deviceTables(
  mameSrc: string,
  props: Readonly<Record<string, unknown>>,
  deviceSourceFile: string,
): { setter: string; name: string; file?: string; value: AggregateValue | undefined; diagnostics: string[]; constants?: Readonly<Record<string, number>> }[] {
  const file = typeof props.sourceFile === 'string' ? props.sourceFile : undefined;
  if (!file) return [];
  const named: [string, string, boolean][] = [];
  if (Array.isArray(props.constructorAggregate) && props.constructorAggregate.length === 2) {
    named.push([String(props.constructorAggregate[0]), String(props.constructorAggregate[1]), true]);
  }
  const member = typeof props.member === 'string' ? props.member.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : undefined;
  // A setter the graph lowered already (`set_daisy_config`'s tags) is that.
  const lowered = new Set((Array.isArray(props.configCalls) ? props.configCalls : []).map(call => /^(\w+)\(/.exec(String(call))?.[1]));
  for (const line of member && Array.isArray(props.config) ? props.config.map(String) : []) {
    const call = new RegExp(`^\\s*${member}->(\\w+)\\(\\s*([A-Za-z_]\\w*)\\s*\\)\\s*;?\\s*$`).exec(line);
    if (call && !lowered.has(call[1])) named.push([call[1]!, call[2]!, false]);
  }
  type Table = { setter: string; name: string; file?: string; value: AggregateValue | undefined; diagnostics: string[]; constants?: Readonly<Record<string, number>> };
  return named.flatMap(([setter, name, required]): Table[] => {
    // Read as written first: preprocessing a driver for every setter that
    // takes a name would cost seconds a board for nothing. The table may be
    // in another file of the driver: galaga.cpp adds the device, and
    // galaga_a.cpp holds galaga_discrete.
    const declares = (candidate: string) => {
      const path = join(mameSrc, candidate);
      return existsSync(path) && new RegExp(`(?:\\bconst\\b[^;=(){}]*\\b${name}\\s*(?:\\[[^\\]]*\\])?\\s*=|^\\s*(?:static\\s+)?[A-Z][A-Z0-9_]*\\s*\\(\\s*${name}\\s*\\))`, 'm')
        .test(readFileSync(path, 'utf8'));
    };
    const directory = dirname(file);
    const siblings = existsSync(join(mameSrc, directory))
      ? readdirSync(join(mameSrc, directory)).filter(entry => entry.endsWith('.cpp')).sort().map(entry => join(directory, entry))
      : [];
    const source = [file, ...siblings.filter(candidate => candidate !== file)].find(declares);
    if (!source) {
      return required ? [{ setter, name, value: undefined, diagnostics: [`${name} is declared in no file of ${directory}`] }] : [];
    }
    const table = deviceTable(mameSrc, source, name, deviceSourceFile);
    // A setter's name may be anything the setter takes (a sample list has
    // its own lowering), and one that does not lower is not a table.
    if (!required && table.value === undefined) return [];
    return [{ setter, name, file: source, ...table }];
  });
}
