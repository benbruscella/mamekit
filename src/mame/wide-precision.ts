// C++'s 64-bit promotion, made explicit in the IR.
//
// The executor and the emitter both compute in doubles and 32-bit integer
// operators, and hand an operation to the exact 64-bit evaluator only when
// the IR says it is one (`precision: 64`). C decides that from the operands'
// types: a `uint64_t` cast, local, parameter or member, or a call returning
// one, makes the whole operation 64-bit. The TMS34010's MPYU keeps its
// product in a `uint64_t` from eminline.h's `mulu_32x32(a, b)` (itself
// `uint64_t(a) * uint64_t(b)`) and DIVS divides `((uint64_t)*rd1 << 32) |
// (uint32_t)*rd2`; in doubles the product lost its low bits and the shift
// was a shift by zero.

import type { GeneratedExpression, GeneratedHandlerOperation } from '../ir/board.ts';
import { operationExpressions, walkOperations } from '../ir/walk.ts';
import { splitMameArgs } from './ast.ts';

const WIDE_TYPE = /^(?:std::)?(?:u?int64_t|u64|s64|(?:unsigned\s+|signed\s+)?long\s+long(?:\s+int)?)$/;

/** A declared type C holds in 64 bits. */
export function isWideType(valueType: string | undefined): boolean {
  if (!valueType) return false;
  return WIDE_TYPE.test(valueType.replace(/\b(?:const|volatile)\b/g, '').replace(/&/g, '').trim());
}

/** Operators the exact evaluator implements, so the operation can be handed to it. */
/** The integer types narrower than 64 bits that convert on the way in. */
const NARROWER = /^(?:u?int(?:8|16|32)_t|u8|u16|u32|s8|s16|s32|int|unsigned(?: int)?|short|unsigned short|offs_t)$/;

/** Types whose arithmetic is not C's integer arithmetic. */
const INEXACT = /^(?:float|double|long double|attotime|(?:\w+::)*sample_t)$/;

const PROMOTED = new Set(['+', '-', '*', '/', '%', '<<', '>>', '&', '|', '^', '<', '<=', '>', '>=']);
/** Of those, the ones whose result is itself 64-bit (a comparison is an int). */
const WIDE_RESULT = new Set(['+', '-', '*', '/', '%', '<<', '>>', '&', '|', '^']);

export interface WidePrecisionScope {
  /** Members declared with a 64-bit type. */
  members: ReadonlySet<string>;
  /** Every member's declared type, for the value a narrower one brings in. */
  memberTypes?: ReadonlyMap<string, string>;
  /** Functions and methods returning a 64-bit type. */
  calls: ReadonlySet<string>;
}

interface WideMethod {
  parameters: string;
  program: { operations: GeneratedHandlerOperation[] };
}

/** Mark every operation on a 64-bit operand `precision: 64`, in place. */
export function markWidePrecision(methods: readonly WideMethod[], scope: WidePrecisionScope): void {
  for (const method of methods) {
    const names = new Set(scope.members);
    const types = new Map(scope.memberTypes ?? []);
    for (const parameter of splitMameArgs(method.parameters ?? '')) {
      const declared = /^(.*?)([A-Za-z_]\w*)\s*(?:=.*)?$/.exec(parameter.trim());
      if (!declared) continue;
      types.set(declared[2]!, declared[1]!.trim());
      if (isWideType(declared[1])) names.add(declared[2]!);
    }
    walkOperations(method.program.operations, operation => {
      if (operation.op !== 'declare') return;
      if (operation.valueType) types.set(operation.name, operation.valueType);
      if (isWideType(operation.valueType)) names.add(operation.name);
    });
    // A narrower integer entering a 64-bit operation brings its declared
    // type's value, as C converts it: mulu_32x32's `uint32_t b` handed the
    // TMS34010's signed register -1 is 0xffffffff, not -1.
    const converted = (operand: GeneratedExpression): GeneratedExpression => {
      if (operand.kind !== 'identifier' || names.has(operand.name)) return operand;
      const type = types.get(operand.name)?.replace(/\b(?:const|volatile)\b/g, '').trim();
      return type && NARROWER.test(type) ? { kind: 'cast', valueType: type, operand } : operand;
    };
    // A parameter or local of a narrower type shadows a 64-bit member.
    walkOperations(method.program.operations, operation => {
      if (operation.op === 'declare' && operation.valueType && !isWideType(operation.valueType) &&
          scope.members.has(operation.name)) names.delete(operation.name);
    });
    const inexact = (expression: GeneratedExpression): boolean => {
      const type = expression.kind === 'identifier' ? types.get(expression.name)
        : expression.kind === 'cast' ? expression.valueType : undefined;
      return INEXACT.test((type ?? '').replace(/\b(?:const|volatile)\b/g, '').replace(/&/g, '').trim());
    };
    const wide = (expression: GeneratedExpression): boolean => {
      switch (expression.kind) {
        case 'number': return !Number.isSafeInteger(expression.value) && Number.isInteger(expression.value);
        case 'identifier': return names.has(expression.name);
        case 'cast': {
          const inner = wide(expression.operand);
          if (isWideType(expression.valueType) && !inner) {
            (expression as { operand: GeneratedExpression }).operand = converted(expression.operand);
          }
          return isWideType(expression.valueType) || (inner && !expression.valueType);
        }
        case 'binary': {
          const left = wide(expression.left);
          const right = wide(expression.right);
          if (!(left || right) || !PROMOTED.has(expression.operator)) return false;
          // A floating or attotime operand makes it no integer operation at
          // all: the PIT's `m_clock_period * elapsed_cycles` is attotime's
          // operator*, and taken as 64-bit integers the period truncated to 0
          // and Venture's counter timer re-armed for now, forever.
          if (inexact(expression.left) || inexact(expression.right)) return false;
          (expression as { precision?: 64 }).precision = 64;
          // Not a shift count: that is an ordinary int.
          if (!left) (expression as { left: GeneratedExpression }).left = converted(expression.left);
          if (!right && expression.operator !== '<<' && expression.operator !== '>>') {
            (expression as { right: GeneratedExpression }).right = converted(expression.right);
          }
          return WIDE_RESULT.has(expression.operator);
        }
        case 'conditional': {
          wide(expression.condition);
          const whenTrue = wide(expression.whenTrue);
          const whenFalse = wide(expression.whenFalse);
          return whenTrue || whenFalse;
        }
        case 'assignment':
          wide(expression.value);
          return wide(expression.target);
        case 'call':
          for (const argument of expression.args) wide(argument);
          return expression.callee.kind === 'identifier' &&
            (scope.calls.has(expression.callee.name) || isWideType(expression.callee.name));
        case 'unary': wide(expression.operand); return false;
        case 'member': wide(expression.object); return false;
        case 'index': wide(expression.object); wide(expression.index); return false;
        default: return false;
      }
    };
    walkOperations(method.program.operations, operation => {
      for (const expression of operationExpressions(operation)) wide(expression);
      // `product += x` on a 64-bit target is `product = product + x` in 64 bits.
      if (operation.op === 'assign' && operation.operator !== '=' && wide(operation.target)) {
        const operator = operation.operator.slice(0, -1);
        if (PROMOTED.has(operator)) {
          const value: GeneratedExpression = { kind: 'binary', operator, left: operation.target, right: operation.value, precision: 64 };
          Object.assign(operation, { operator: '=', value });
        }
      }
    });
  }
}
