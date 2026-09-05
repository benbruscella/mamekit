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
