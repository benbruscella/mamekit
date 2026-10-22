// C++ block scope for lowered handler programs.
//
// A C++ local may shadow a parameter or an outer block's local, and the outer
// name stays in force up to the inner declaration and again after its block:
//
//   void pio_port::write(uint8_t data) {
//     if (m_mode == MODE_BIT_CONTROL) {
//       m_input = data;                     // the parameter
//       uint8_t data = (m_input & m_ior) | ...;   // a new local from here on
//
// The IR names locals flatly, so neither executor can tell the two apart: the
// emitted JavaScript declared `let data` in the block and read it before that
// line (a TDZ error that stopped the app compiling), and the interpreter let
// the inner value outlive its block. Renaming every shadowing declaration to
// a name of its own gives both the C++ meaning.

import type { GeneratedExpression, GeneratedHandlerOperation } from './board.ts';
import { childExpressions, operationExpressions } from './walk.ts';

/**
 * Rename, in place, each local declaration that shadows a parameter or an
 * enclosing block's local, along with every use within its scope. Returns the
 * number renamed.
 */
export function renameShadowedLocals(
  operations: GeneratedHandlerOperation[],
  parameters: Iterable<string>,
): number {
  let renamed = 0;
  const parameterNames = [...parameters];
  const taken = new Set<string>(parameterNames);
  const fresh = (name: string): string => {
    let index = 1;
    while (taken.has(`${name}__${index}`)) index++;
    const chosen = `${name}__${index}`;
    taken.add(chosen);
    return chosen;
  };
  // Names already in the program, so a fresh name never collides with one.
  const collect = (list: GeneratedHandlerOperation[]): void => {
    for (const operation of list) {
      if (operation.op === 'declare') taken.add(operation.name);
      for (const nested of nestedBlocks(operation)) collect(nested);
    }
  };
  collect(operations);

  const rewrite = (expression: GeneratedExpression, visible: Map<string, string>): void => {
    if (expression.kind === 'identifier') {
      const current = visible.get(expression.name);
      if (current && current !== expression.name) expression.name = current;
      return;
    }
    for (const child of childExpressions(expression)) rewrite(child, visible);
  };

  /**
   * One block. `visible` maps each source name to the name it is emitted
   * under; `outer` holds the names bound outside this block, which are the
   * only ones a declaration here can shadow.
   */
  const block = (list: GeneratedHandlerOperation[], visible: Map<string, string>): void => {
    const outer = new Set(visible.keys());
    for (const operation of list) {
      // The initializer is read before the new name exists.
      for (const expression of operationExpressions(operation)) rewrite(expression, visible);
      if (operation.op === 'declare') {
        const source = operation.name;
        if (outer.has(source)) {
          operation.name = fresh(source);
          renamed++;
        }
        visible.set(source, operation.name);
        outer.delete(source);
        continue;
      }
      if (operation.op === 'for') {
        // The loop's own declarations scope over its condition, step and body.
        const loop = new Map(visible);
        block(operation.initialize, loop);
        rewrite(operation.condition, loop);
        block(operation.iterate, new Map(loop));
        block(operation.body, new Map(loop));
        continue;
      }
      if (operation.op === 'switch') {
        // Every case is one block in C++: a declaration in one is in scope in
        // the cases after it.
        const cases = new Map(visible);
        for (const entry of operation.cases) block(entry.body, cases);
        continue;
      }
      for (const nested of nestedBlocks(operation)) block(nested, new Map(visible));
    }
  };
  block(operations, new Map(parameterNames.map(name => [name, name])));
  return renamed;
}

/** The blocks an operation opens, apart from a `for` header and a `switch`'s cases. */
function nestedBlocks(operation: GeneratedHandlerOperation): GeneratedHandlerOperation[][] {
  switch (operation.op) {
    case 'if': return operation.else ? [operation.then, operation.else] : [operation.then];
    case 'for': return [operation.initialize, operation.iterate, operation.body];
    case 'while': case 'do-while': return [operation.body];
    case 'switch': return operation.cases.map(entry => entry.body);
    default: return [];
  }
}
