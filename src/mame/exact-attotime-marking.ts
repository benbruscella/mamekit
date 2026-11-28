// attotime, exactly, where a device's source needs it.
//
// Devices hold an attotime as seconds in a double, which is close enough
// for anything that only adds, compares and converts it. A device that reads
// attotime's fields (`m_seconds`, `m_attoseconds`) does integer arithmetic
// on its parts, and that needs the parts MAME has: the 8253 divides
// `(now - m_last_updated).m_attoseconds` by its clock period's, and a period
// a few thousand attoseconds short truncated a whole cycle away (#272). Such
// a device is marked `exactAttotime`, and every one of attotime's operators
// in it `attotime: true`, so it runs on src/ir/exact-attotime.ts. The
// decision is the source's: no device is named.

import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import { childExpressions, operationExpressions, walkExpressions, walkOperations } from '../ir/walk.ts';
import { splitMameArgs } from './ast.ts';

const FIELDS = new Set(['m_seconds', 'm_attoseconds']);
const OPERATORS = new Set(['+', '-', '*', '/', '==', '!=', '<', '<=', '>', '>=']);
/** Of those, the ones whose result is an attotime: `*` and `/` by a factor, `+` and `-`. */
const ATTOTIME_RESULT = new Set(['+', '-', '*', '/']);
const ATTOTIME_CONSTANTS = new Set(['attotime::never', 'attotime::zero']);

interface AttotimeMethod {
  parameters: string;
  program: { operations: GeneratedHandlerOperation[] };
}

interface AttotimeDevice {
  members: readonly { name: string; valueType?: string }[];
  methods: readonly AttotimeMethod[];
  exactAttotime?: true;
}

function isAttotimeType(valueType: string | undefined): boolean {
  return (valueType ?? '').replace(/\b(?:const|volatile)\b|&/g, '').trim() === 'attotime';
}

/**
 * Mark the device exact when its source reads attotime's fields, and then
 * each of attotime's operators and field accesses in it. Answers whether it did.
 */
export function markExactAttotime(device: AttotimeDevice): boolean {
  const memberTypes = new Map(device.members.map(member => [member.name, member.valueType]));
  const scopes = device.methods.map(method => ({ method, types: methodTypes(method, memberTypes) }));
  const reads = scopes.some(({ method, types }) => {
    let found = false;
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'member' && FIELDS.has(expression.property) && typed(expression.object, types)) found = true;
    });
    return found;
  });
  if (!reads) return false;
  device.exactAttotime = true;
  for (const { method, types } of scopes) {
    // `elapsed_time -= m_clock_period` on an attotime is
    // `elapsed_time = elapsed_time - m_clock_period`, attotime's operator.
    walkOperations(method.program.operations, operation => {
      if (operation.op !== 'assign' || operation.operator === '=' || !typed(operation.target, types)) return;
      const operator = operation.operator.slice(0, -1);
      if (!ATTOTIME_RESULT.has(operator)) return;
      const value: GeneratedExpression = { kind: 'binary', operator, left: operation.target, right: operation.value };
      Object.assign(operation, { operator: '=', value });
    });
    walkOperations(method.program.operations, operation => {
      for (const expression of operationExpressions(operation)) mark(expression, types);
    });
  }
  return true;
}

/**
 * In every device, exact or not: `*` and `/` on an attotime one of
 * attotime's factories just built (`attotime::from_hz(clock) * cycles`).
 * The factory's value is exact (exactAttotimeFromHz), and a bare `*` takes it
 * to seconds in a double: Battlezone's AVG re-armed its state machine 1.27 ps
 * short of a whole clock a step, and a round ending on it gave the POKEY one
 * cycle fewer than MAME's, read back through RANDOM. Marked `attotime: true`,
 * the operator is attotime's (attotimeBinary), exact on an exact operand and
 * the seconds arithmetic otherwise. Answers how many it marked.
 */
export function markAttotimeFactoryProducts(device: AttotimeDevice): number {
  let marked = 0;
  const factory = (expression: GeneratedExpression) => expression.kind === 'call' &&
    expression.callee.kind === 'identifier' && expression.callee.name.startsWith('attotime::from_');
  for (const method of device.methods) {
    walkOperations(method.program.operations, operation => {
      for (const root of operationExpressions(operation)) {
        walkExpression(root, node => {
          if (node.kind !== 'binary' || (node.operator !== '*' && node.operator !== '/')) return;
          if ((node as { attotime?: true }).attotime) return;
          // `/` divides an attotime by a factor, never a factor by one.
          if (!(factory(node.left) || (node.operator === '*' && factory(node.right)))) return;
          (node as { attotime?: true }).attotime = true;
          marked++;
        });
      }
    });
  }
  return marked;
}

/** Every name's declared type in one method: members, then parameters and locals over them. */
function methodTypes(method: AttotimeMethod, memberTypes: ReadonlyMap<string, string | undefined>): Map<string, string | undefined> {
  const types = new Map(memberTypes);
  for (const parameter of splitMameArgs(method.parameters ?? '')) {
    const declared = /^(.*?)([A-Za-z_]\w*)\s*(?:=.*)?$/.exec(parameter.trim());
    if (declared) types.set(declared[2]!, declared[1]!.trim());
  }
  walkOperations(method.program.operations, operation => {
    if (operation.op === 'declare' && operation.valueType) types.set(operation.name, operation.valueType);
  });
  return types;
}

/** Whether C++ types the expression attotime. */
function typed(expression: GeneratedExpression, types: ReadonlyMap<string, string | undefined>): boolean {
  switch (expression.kind) {
    case 'identifier':
      return ATTOTIME_CONSTANTS.has(expression.name) || isAttotimeType(types.get(expression.name));
    case 'cast':
      return isAttotimeType(expression.valueType);
    case 'binary':
      return ATTOTIME_RESULT.has(expression.operator) && (typed(expression.left, types) || typed(expression.right, types));
    case 'conditional':
      return typed(expression.whenTrue, types) || typed(expression.whenFalse, types);
    case 'assignment':
      return typed(expression.target, types);
    case 'call': {
      const callee = expression.callee;
      if (callee.kind === 'identifier') return callee.name === 'attotime' || callee.name.startsWith('attotime::from_');
      // `machine().time()`
      return callee.kind === 'member' && callee.property === 'time' && callee.object.kind === 'call' &&
        callee.object.callee.kind === 'identifier' && callee.object.callee.name === 'machine';
    }
    default:
      return false;
  }
}

function mark(expression: GeneratedExpression, types: ReadonlyMap<string, string | undefined>): void {
  walkExpression(expression, node => {
    if (node.kind === 'binary' && OPERATORS.has(node.operator) && (typed(node.left, types) || typed(node.right, types))) {
      (node as { attotime?: true }).attotime = true;
    } else if (node.kind === 'member' && FIELDS.has(node.property) && typed(node.object, types)) {
      (node as { attotime?: true }).attotime = true;
    }
  });
}

function walkExpression(expression: GeneratedExpression, visit: (expression: GeneratedExpression) => void): void {
  visit(expression);
  for (const child of childExpressions(expression)) walkExpression(child, visit);
}
