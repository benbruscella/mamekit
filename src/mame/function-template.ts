/** One source-requested specialization of a non-type C++ function template. */
export interface FunctionTemplateInstantiation {
  /** Generated artifact key, normally the call-site spelling. */
  id: string;
  arguments: Record<string, number | boolean>;
}

export interface MonomorphizedFunction {
  id: string;
  source: string;
  constants: Record<string, number>;
}

/**
 * Materialize source-known non-type template arguments before handler parsing.
 * This deliberately handles only integral/bool parameters: type substitution
 * remains a C++ front-end concern, while DMA/blitter templates commonly use
 * compile-time lane, bpp, or mode constants that the existing expression
 * folder can consume once they are ordinary literals.
 */
export function monomorphizeFunctionTemplate(
  source: string,
  instantiations: FunctionTemplateInstantiation[],
): MonomorphizedFunction[] {
  const declaration = /template\s*<([^>]+)>\s*/m.exec(source);
  if (!declaration) throw new Error('source has no function-template declaration');
  const parameters = [...declaration[1]!.matchAll(
    /(?:bool|int|unsigned(?:\s+int)?|size_t|u(?:8|16|32|64)|s(?:8|16|32|64))\s+(\w+)/g,
  )].map(match => match[1]!);
  if (!parameters.length) throw new Error('template declares no supported non-type parameters');
  const body = source.slice(0, declaration.index) + source.slice(declaration.index + declaration[0].length);
  return instantiations.map(instantiation => {
    const missing = parameters.filter(parameter => !(parameter in instantiation.arguments));
    if (missing.length) throw new Error(`${instantiation.id}: missing template arguments ${missing.join(', ')}`);
    let specialized = body;
    const constants: Record<string, number> = {};
    for (const parameter of parameters) {
      const raw = instantiation.arguments[parameter]!;
      const value = typeof raw === 'boolean' ? Number(raw) : raw;
      if (!Number.isInteger(value)) throw new Error(`${instantiation.id}: ${parameter} is not integral`);
      constants[parameter] = value;
      specialized = specialized.replace(new RegExp(`\\b${parameter}\\b`, 'g'), String(value));
    }
    return { id: instantiation.id, source: specialized, constants };
  });
}

/**
 * Materialize one specialization of a non-type C++ *class* template across a
 * whole translation unit, so the result parses as an ordinary class.
 *
 * MAME writes a few device families this way -- `tms320c1x_device_base<12>`
 * is the TMS320C10, `<16>` the TMS320C16 -- with every member function
 * carrying a `template <int HighBits>` prefix and a `Class<HighBits>::`
 * scope. Substituting the argument turns the parameter into an ordinary
 * literal the existing expression folder already handles, which is the same
 * bargain monomorphizeFunctionTemplate strikes; type parameters remain a C++
 * front-end concern.
 *
 * Returns source only. The caller decides which class name the flattened
 * members belong to, because MAME's concrete device is a subclass of the base
 * and the two names are not interchangeable in a machine configuration.
 */
export function monomorphizeClassTemplate(
  source: string,
  className: string,
  argumentsByParameter: Record<string, number>,
): string {
  const parameters = Object.keys(argumentsByParameter);
  if (!parameters.length) throw new Error(`${className}: no template arguments given`);
  const declaration = new RegExp(
    `template\\s*<\\s*(?:(?:int|bool|unsigned(?:\\s+int)?|size_t|u(?:8|16|32|64)|s(?:8|16|32|64))\\s+` +
    `(?:${parameters.join('|')})\\s*,?\\s*)+>\\s*`,
    'g',
  );
  if (!declaration.test(source)) {
    throw new Error(`${className}: source declares no template over ${parameters.join(', ')}`);
  }
  declaration.lastIndex = 0;
  let flattened = source.replace(declaration, '');
  // `Class<Args>::` and the `typename Class<Args>::member` disambiguator that
  // a dependent name needs while the class is still a template.
  const argumentList = parameters.map(parameter => `\\s*${parameter}\\s*`).join(',');
  flattened = flattened
    .replace(new RegExp(`\\btypename\\s+${className}\\s*<${argumentList}>\\s*::`, 'g'), '')
    .replace(new RegExp(`\\b${className}\\s*<${argumentList}>`, 'g'), className);
  for (const [parameter, value] of Object.entries(argumentsByParameter)) {
    if (!Number.isInteger(value)) {
      throw new Error(`${className}: ${parameter} is not integral`);
    }
    flattened = flattened.replace(new RegExp(`\\b${parameter}\\b`, 'g'), String(value));
  }
  return flattened;
}
