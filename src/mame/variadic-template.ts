// Variadic function templates, instantiated for the calls that reach them.
//
// MAME's resnet.h combines resistor weights with a parameter pack:
//
//   template <typename T = int, typename U, std::size_t N, typename... V>
//   constexpr T combine_weights(U const (&tab)[N], V... w)
//   { return T(emu::detail::combine_weights<0U>(tab, w...) + 0.5); }
//
// and emu::detail peels the pack one weight at a time, recursing on <I + 1>.
// None of that has a value at run time: the compiler picks an overload by
// arity, expands the pack and folds the template arguments, and what runs is
// an ordinary function of fixed arity. This does the same, per call: the
// overload C++ would choose, its non-type arguments substituted, `w...`
// spelled out as `w_0, w_1, ...`, and every template call inside it replaced by
// the name of its own instance.

import { evalExpr } from '../kg/parse.ts';
import { splitMameArgs, type MameFunction, type MameTranslationUnit } from './ast.ts';

/** One definition of a function template, as its source spells it. */
export interface TemplateDefinition {
  name: string;
  /** Enclosing namespace (`emu::detail`), or '' at file scope. */
  namespace: string;
  /** The template parameter list: `typename T = int, typename U, std::size_t N, typename... V`. */
  template: string;
  parameters: string;
  body: string;
}

/** A call as its caller writes it. */
export interface TemplateCall {
  name: string;
  /** The qualifier written before the name (`emu::detail`), or ''. */
  qualifier: string;
  /** Explicit template arguments, already free of the caller's own template parameters. */
  templateArguments: string[];
  argumentCount: number;
  /** The namespace the call is written in, where unqualified lookup starts. */
  from: string;
}

/** One fixed-arity function an instantiation produced. */
export interface TemplateInstance {
  name: string;
  parameters: string;
  body: string;
  /** The definition it was made from. */
  definition: TemplateDefinition;
}

interface TemplateParameter {
  name: string;
  kind: 'type' | 'value';
  pack: boolean;
  default?: string;
}

interface FunctionParameter {
  text: string;
  name: string;
  /** The pack a `V... w` parameter declares, by its type name. */
  packType?: string;
}

function templateParameters(list: string): TemplateParameter[] {
  return splitMameArgs(list).map(raw => raw.trim()).filter(Boolean).map(raw => {
    const [declaration, fallback] = raw.split(/\s*=\s*/, 2) as [string, string | undefined];
    const pack = declaration.includes('...');
    const name = /(\w+)\s*$/.exec(declaration)![1]!;
    const kind = /^(?:typename|class)\b/.test(declaration) ? 'type' : 'value';
    return { name, kind, pack, ...(fallback !== undefined ? { default: fallback.trim() } : {}) };
  });
}

function functionParameters(list: string): FunctionParameter[] {
  return splitMameArgs(list).map(raw => raw.trim()).filter(Boolean).map(text => {
    // `T const (&tab)[N]` names its parameter inside the declarator.
    const declarator = /\(\s*[&*]\s*(\w+)\s*\)/.exec(text);
    const name = declarator?.[1] ?? /(\w+)\s*(?:\[[^\]]*\])*\s*$/.exec(text)![1]!;
    const pack = /^([\w:]+)\s*\.\.\./.exec(text);
    return { text, name, ...(pack ? { packType: pack[1]! } : {}) };
  });
}

function evaluate(expression: string): number | undefined {
  const value = evalExpr(expression.replace(/\b(\d+)[uUlL]+\b/g, '$1'));
  return value === null ? undefined : value;
}

/** Instance names are C identifiers that say what they were made from. */
function instanceName(definition: TemplateDefinition, values: string[], arity: number): string {
  const parts = [definition.namespace.replace(/::/g, '_'), definition.name, ...values, String(arity)]
    .filter(Boolean)
    .map(part => part.replace(/\W+/g, '_'));
  return parts.join('__');
}

/**
 * The definition C++ calls: visible by name lookup, viable for the call's
 * arity and explicit arguments, and the most specialized of those -- a
 * definition without a pack beats one with.
 */
function selectOverload(definitions: readonly TemplateDefinition[], call: TemplateCall): TemplateDefinition | undefined {
  const named = definitions.filter(definition => definition.name === call.name);
  let visible: TemplateDefinition[];
  if (call.qualifier) {
    const qualified = call.qualifier.replace(/^::/, '');
    visible = named.filter(definition => definition.namespace === qualified ||
      definition.namespace.endsWith(`::${qualified}`));
  } else {
    // Unqualified lookup stops at the innermost scope that declares the name.
    const scopes = call.from.split('::').filter(Boolean)
      .map((_, index, all) => all.slice(0, all.length - index).join('::'));
    visible = [];
    for (const scope of [...scopes, '']) {
      visible = named.filter(definition => definition.namespace === scope);
      if (visible.length) break;
    }
  }
  const viable = visible.filter(definition => {
    const parameters = functionParameters(definition.parameters);
    const fixed = parameters.filter(parameter => !parameter.packType).length;
    const pack = parameters.some(parameter => parameter.packType);
    if (pack ? call.argumentCount < fixed : call.argumentCount !== fixed) return false;
    // A non-type parameter no argument deduces needs an explicit argument or
    // a default; types are deduced from the arguments.
    const declared = templateParameters(definition.template);
    if (call.templateArguments.length > declared.filter(parameter => !parameter.pack).length &&
      !declared.some(parameter => parameter.pack)) return false;
    return declared.every((parameter, index) => parameter.kind === 'type' || parameter.pack ||
      index < call.templateArguments.length || parameter.default !== undefined ||
      parameters.some(argument => new RegExp(`\\[\\s*${parameter.name}\\s*\\]`).test(argument.text)));
  });
  const exact = viable.filter(definition => !functionParameters(definition.parameters).some(parameter => parameter.packType));
  const chosen = exact.length ? exact : viable;
  return chosen.length === 1 ? chosen[0] : undefined;
}

/** The calls in `body` to any template `definitions` declares, innermost name first. */
export function templateCalls(body: string, names: ReadonlySet<string>) {
  const calls: { start: number; open: number; close: number; qualifier: string; name: string; templateArguments: string[] }[] = [];
  const pattern = /(?<![\w.>])((?:::)?(?:\w+::)*)(\w+)\s*(?:<([^<>;{}()]*)>)?\s*\(/g;
  for (const match of body.matchAll(pattern)) {
    if (!names.has(match[2]!)) continue;
    const open = match.index! + match[0].length - 1;
    let depth = 0;
    let close = -1;
    for (let index = open; index < body.length; index++) {
      if (body[index] === '(') depth++;
      else if (body[index] === ')' && --depth === 0) { close = index; break; }
    }
    if (close < 0) continue;
    calls.push({
      start: match.index!,
      open,
      close,
      qualifier: match[1]!.replace(/::$/, ''),
      name: match[2]!,
      templateArguments: match[3] === undefined ? [] : splitMameArgs(match[3]).map(argument => argument.trim()),
    });
  }
  return calls;
}

/**
 * Instantiate `call` against `definitions`: the instance the call names, and
 * every instance its body reaches, each once. Undefined when C++ would not
 * resolve the call to exactly one definition, or a template argument does not
 * fold to a constant.
 */
export function instantiateTemplateCall(
  definitions: readonly TemplateDefinition[],
  call: TemplateCall,
  made: Map<string, TemplateInstance> = new Map(),
): { name: string; instances: TemplateInstance[] } | undefined {
  const definition = selectOverload(definitions, call);
  if (!definition) return undefined;
  const declared = templateParameters(definition.template);
  const parameters = functionParameters(definition.parameters);
  const fixed = parameters.filter(parameter => !parameter.packType);
  const pack = parameters.find(parameter => parameter.packType);
  const arity = call.argumentCount - fixed.length;

  const values: Record<string, string> = {};
  let explicit = 0;
  for (const parameter of declared) {
    if (parameter.pack) continue;
    const argument = call.templateArguments[explicit++] ?? parameter.default;
    if (argument === undefined) continue;
    if (parameter.kind === 'value') {
      const value = evaluate(argument);
      if (value === undefined) return undefined;
      values[parameter.name] = String(value);
    } else {
      values[parameter.name] = argument;
    }
  }
  const name = instanceName(definition, declared.filter(parameter => !parameter.pack && parameter.name in values)
    .map(parameter => values[parameter.name]!), arity);
  if (made.has(name)) return { name, instances: [] };

  const substitute = (text: string) => Object.entries(values).reduce(
    (result, [parameter, value]) => result.replace(new RegExp(`\\b${parameter}\\b`, 'g'), value), text);
  const elements = pack ? Array.from({ length: arity }, (_, index) => `${pack.name}_${index}`) : [];
  const expand = (text: string) => {
    if (!pack) return text;
    let expanded = text.replace(new RegExp(`\\bsizeof\\s*\\.\\.\\.\\s*\\(\\s*${pack.name}\\s*\\)`, 'g'), String(arity));
    // `f(tab, w...)` with an empty pack is `f(tab)`.
    expanded = expanded.replace(new RegExp(`(,\\s*)?\\b${pack.name}\\s*\\.\\.\\.`, 'g'), (_all, comma: string | undefined) =>
      elements.length ? `${comma ?? ''}${elements.join(', ')}` : '');
    return expanded;
  };
  // A template parameter the call never names is deduced from its argument
  // (`U const (&tab)[N]` takes the caller's array), so a parameter whose
  // type still names one takes its argument's own type, as a pack element
  // does. Left as written, the declaration was one no parser reads, and
  // every caller of the instance -- Taito SJ's per-frame set_pens -- stayed
  // interpreted with it.
  const deduced = declared.filter(parameter => !parameter.pack && !(parameter.name in values)).map(parameter => parameter.name);
  const dependsOnDeduced = (text: string) =>
    deduced.some(parameter => new RegExp(`\\b${parameter}\\b`).test(text));
  const instanceParameters = [
    ...fixed.map(parameter => dependsOnDeduced(substitute(parameter.text))
      ? `auto ${parameter.name}`
      : substitute(parameter.text)),
    // A deduced pack element takes its argument's own type.
    ...elements.map(element => `auto ${element}`),
  ].join(', ');
  const instance: TemplateInstance = { name, parameters: instanceParameters, body: '', definition };
  made.set(name, instance);

  // The body, with each template call it makes replaced by its instance.
  let body = expand(substitute(definition.body));
  const instances: TemplateInstance[] = [instance];
  const names = new Set(definitions.map(candidate => candidate.name));
  for (const inner of templateCalls(body, names).reverse()) {
    const resolved = instantiateTemplateCall(definitions, {
      name: inner.name,
      qualifier: inner.qualifier,
      templateArguments: inner.templateArguments,
      argumentCount: splitMameArgs(body.slice(inner.open + 1, inner.close)).filter(argument => argument.trim()).length,
      from: definition.namespace,
    }, made);
    if (!resolved) return undefined;
    instances.push(...resolved.instances);
    body = `${body.slice(0, inner.start)}${resolved.name}${body.slice(inner.open)}`;
  }
  instance.body = body;
  return { name, instances };
}

/**
 * Give every call to a variadic function template its instance, in place.
 *
 * Each call is renamed to its instance, and each instance joins the unit that
 * defines its template, as an ordinary file-scope function at the template's
 * span. A call that does not resolve keeps its name, so it stays as visible
 * as it was. Templates without a pack in any overload are left alone: their
 * non-type arguments are bound where they are named (function-template.ts).
 */
export function instantiateVariadicTemplates(units: readonly MameTranslationUnit[]): void {
  const sources = new Map<TemplateDefinition, { unit: MameTranslationUnit; fn: MameFunction }>();
  for (const unit of units) {
    for (const fn of unit.functions) {
      if (fn.className !== '' || fn.template === undefined) continue;
      sources.set({
        name: fn.name,
        namespace: fn.namespace ?? '',
        template: fn.template,
        parameters: fn.parameters,
        body: fn.body,
      }, { unit, fn });
    }
  }
  const packed = new Set([...sources.keys()]
    .filter(definition => functionParameters(definition.parameters).some(parameter => parameter.packType))
    .map(definition => definition.name));
  if (!packed.size) return;
  const definitions = [...sources.keys()].filter(definition => packed.has(definition.name));
  const templates = new Set([...sources.values()].filter(({ fn }) => packed.has(fn.name)).map(({ fn }) => fn));
  const made = new Map<string, TemplateInstance>();
  const added: { unit: MameTranslationUnit; instance: TemplateInstance; from: MameFunction }[] = [];
  for (const unit of units) {
    for (const fn of unit.functions) {
      if (templates.has(fn)) continue;
      let body = fn.body;
      for (const call of templateCalls(body, packed).reverse()) {
        const resolved = instantiateTemplateCall(definitions, {
          name: call.name,
          qualifier: call.qualifier,
          templateArguments: call.templateArguments,
          argumentCount: splitMameArgs(body.slice(call.open + 1, call.close)).filter(argument => argument.trim()).length,
          from: fn.namespace ?? '',
        }, made);
        if (!resolved) continue;
        for (const instance of resolved.instances) {
          const source = sources.get(instance.definition)!;
          added.push({ unit: source.unit, instance, from: source.fn });
        }
        body = `${body.slice(0, call.start)}${resolved.name}${body.slice(call.open)}`;
      }
      fn.body = body;
    }
  }
  for (const { unit, instance, from } of added) {
    const { namespace: _namespace, template: _template, ...at } = from;
    unit.functions.push({
      ...at,
      name: instance.name,
      parameters: instance.parameters,
      body: instance.body,
      statements: [],
    });
  }
}
