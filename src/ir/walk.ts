// Structural traversal of a lowered handler program.
//
// Several compilers need to visit every operation or expression in a program —
// marking float locals, collecting the calls an init makes, checking that a
// program reads nothing it will not be given. The shape of the IR is the same
// for all of them, and one description of it is easier to keep correct than
// three: a case missed here is a case missed once, not once per caller.

import type { GeneratedExpression, GeneratedHandlerOperation } from './board.ts';

/** The operation lists an operation contains, in source order. */
export function nestedOperations(
  operation: GeneratedHandlerOperation,
): GeneratedHandlerOperation[][] {
  switch (operation.op) {
    case 'if': return operation.else ? [operation.then, operation.else] : [operation.then];
    case 'for': return [operation.initialize, operation.iterate, operation.body];
    case 'while': case 'do-while': return [operation.body];
    case 'switch': return operation.cases.map(entry => entry.body);
    default: return [];
  }
}

/** The expressions an operation evaluates itself, excluding nested operations. */
export function operationExpressions(
  operation: GeneratedHandlerOperation,
): GeneratedExpression[] {
  switch (operation.op) {
    case 'declare': return operation.value ? [operation.value] : [];
    case 'assign': return [operation.target, operation.value];
    case 'call': return [operation.expression];
    case 'return': return operation.value ? [operation.value] : [];
    case 'if': case 'for': case 'while': case 'do-while': return [operation.condition];
    case 'switch':
      return [operation.expression, ...operation.cases.flatMap(entry => entry.values ?? [])];
    default: return [];
  }
}

/**
 * The expressions an expression contains. A member's property and a call's
 * callee are names resolved by the executor, not values it reads, so neither is
 * an operand — a caller looking for unbound identifiers must not see them.
 */
export function childExpressions(expression: GeneratedExpression): GeneratedExpression[] {
  switch (expression.kind) {
    case 'unary': case 'cast': return [expression.operand];
    case 'binary': return [expression.left, expression.right];
    case 'assignment': return [expression.target, expression.value];
    case 'conditional':
      return [expression.condition, expression.whenTrue, expression.whenFalse];
    case 'member': return [expression.object];
    case 'index': return [expression.object, expression.index];
    case 'call': return expression.args;
    default: return [];
  }
}

/** Visit every operation in a program, outermost first. */
export function walkOperations(
  operations: GeneratedHandlerOperation[],
  visit: (operation: GeneratedHandlerOperation) => void,
): void {
  for (const operation of operations) {
    visit(operation);
    for (const nested of nestedOperations(operation)) walkOperations(nested, visit);
  }
}

/** Visit every expression a program evaluates, outermost first. */
export function walkExpressions(
  operations: GeneratedHandlerOperation[],
  visit: (expression: GeneratedExpression) => void,
): void {
  const walk = (expression: GeneratedExpression): void => {
    visit(expression);
    for (const child of childExpressions(expression)) walk(child);
  };
  walkOperations(operations, operation => {
    for (const expression of operationExpressions(operation)) walk(expression);
  });
}
