// Direct JavaScript for expensive driver handlers.
//
// `src/mame/device-codegen.ts` already emits static JavaScript for device
// methods whose IR shape shows nested hot loops, because walking one closure
// per operation is not affordable at pixel scale. A driver's own renderer has
// exactly that shape and none of that treatment: MAME's 1942 draws sprites per
// scanline, so its board evaluates ~5,400 sprite entries a frame through the
// generic interpreter.
//
// This derives the same emitter's neutral scope from BoardIr, so board handlers
// and device methods share one definition of what a lowered operation means as
// JavaScript. Selection stays a property of the IR — nested loop depth — and
// never of a game or driver name.

import {
  codegenWrappedParameters,
  generatedDeviceMethodsSource,
  type CodegenScope,
} from '../mame/device-codegen.ts';
import type {
  BoardIr,
  GeneratedHandler,
  GeneratedHandlerOperation,
} from '../ir/board.ts';

/**
 * The names a board binds into handler state.
 *
 * This mirrors what `generated-board.ts` actually materialises, because an
 * identifier the emitter cannot resolve must fall back to the interpreter
 * rather than compile to a reference to nothing. A share becomes `m_<tag>`
 * plus any declared aliases; a device finder keeps its source member spelling.
 */
function boardMemberNames(machine: BoardIr): Set<string> {
  const names = new Set<string>();
  for (const cpu of machine.execution.cpus) {
    for (const range of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])]) {
      if (range.share) names.add(`m_${range.share}`);
    }
  }
  for (const binding of machine.execution.shareBindings ?? []) {
    names.add(binding.member);
    names.add(`m_${binding.share}`);
  }
  for (const device of machine.devices ?? []) {
    if (device.member) names.add(device.member);
  }
  for (const bank of machine.execution.banks ?? []) {
    if (bank.member) names.add(bank.member);
  }
  return names;
}

/**
 * Driver state that is neither a share nor a device: plain C++ members the
 * board materialises the first time a handler writes one. They are only
 * discoverable from the handlers themselves, which is also exactly how the
 * interpreter treats them.
 */
function assignedMemberNames(handlers: readonly GeneratedHandler[]): Set<string> {
  const names = new Set<string>();
  const visitOperations = (operations: readonly GeneratedHandlerOperation[]): void => {
    for (const operation of operations) {
      if (operation.op === 'assign') {
        let target = operation.target;
        while (target.kind === 'index' || target.kind === 'member') {
          target = target.object;
        }
        if (target.kind === 'identifier' && target.name.startsWith('m_')) {
          names.add(target.name);
        }
      }
      for (const value of Object.values(operation)) {
        if (Array.isArray(value) && value.length && typeof value[0] === 'object') {
          const entries = value as { op?: string; body?: GeneratedHandlerOperation[] }[];
          if (entries[0]?.op) visitOperations(entries as GeneratedHandlerOperation[]);
          else for (const entry of entries) if (entry.body) visitOperations(entry.body);
        }
      }
    }
  };
  for (const handler of handlers) visitOperations(handler.program?.operations ?? []);
  return names;
}

/**
 * The emitter's scope for one driver class.
 *
 * Handlers are keyed by method name because that is how the source calls them
 * and how the interpreter resolves them; the declaring class disambiguates only
 * when two classes share a method, in which case the same-class handler wins.
 */
export function boardCodegenScope(machine: BoardIr, ownerClass: string): CodegenScope {
  const handlers = (machine.handlers ?? []).filter(handler =>
    handler.program && handler.program.diagnostics.length === 0);
  const byMethod = new Map<string, GeneratedHandler>();
  for (const handler of handlers) {
    if (handler.ownerClass === ownerClass || !byMethod.has(handler.method)) {
      byMethod.set(handler.method, handler);
    }
  }
  const members = [...boardMemberNames(machine), ...assignedMemberNames(handlers)];
  return {
    constants: Object.assign(
      {},
      ...handlers
        .filter(handler => handler.ownerClass === ownerClass)
        .map(handler => handler.constants ?? {}),
    ) as Record<string, number>,
    // The board resolves a member's width from its own binding, so the emitter
    // is told the name exists and nothing more. Declaring a width here would
    // narrow a value the board did not narrow.
    members: members.map(name => ({ name, valueType: '' })),
    callbacks: [],
    timers: [],
    methods: [...byMethod.values()].map(handler => ({
      name: handler.method,
      parameters: handler.parameters ?? '',
      program: handler.program!,
      source: handler.source ?? { file: machine.driverFile, line: 0 },
    })),
  };
}

/**
 * Emitted compiled handlers for a board, keyed by "OwnerClass.method".
 *
 * Returns an empty map when no handler qualifies, which leaves every handler on
 * the interpreter exactly as before.
 */
export function generatedBoardHandlersSource(
  machine: BoardIr,
  typescript = false,
): { source: string; handlers: string[] } {
  const ownerClasses = [...new Set(
    (machine.handlers ?? [])
      .filter(handler => handler.program && handler.program.diagnostics.length === 0)
      .map(handler => handler.ownerClass),
  )];
  const parts: string[] = [];
  const emitted: string[] = [];
  for (const ownerClass of ownerClasses) {
    const scope = boardCodegenScope(machine, ownerClass);
    const own = new Set(
      (machine.handlers ?? [])
        .filter(handler => handler.ownerClass === ownerClass)
        .map(handler => handler.method),
    );
    const source = generatedDeviceMethodsSource(scope, typescript);
    // Only this class's own handlers are exported. A dependency pulled in from
    // another class is compiled into the same closure, but its board key
    // belongs to its declaring class.
    const exported = source.methods.filter(method =>
      own.has(method) &&
      !usesDevicePalette(scope, method) &&
      !usesWrappedParameters(scope, method));
    if (!exported.length) continue;
    parts.push(`  ...(() => {
    const methods = ${source.source};
    return {
${exported.map(method =>
      `      ${JSON.stringify(`${ownerClass}.${method}`)}: methods[${JSON.stringify(method)}]`)
      .join(',\n')},
    };
  })(),`);
    emitted.push(...exported.map(method => `${ownerClass}.${method}`));
  }
  if (!parts.length) return { source: '{}', handlers: [] };
  return { source: `{\n${parts.join('\n')}\n}`, handlers: emitted };
}

/**
 * A bare `pen_color`/`set_pen_color` call is a device-side idiom: the emitter
 * turns it into an index of `runtime.palette`, which a board's palette is not.
 * A driver reaches its palette through `m_palette->...` instead, so a handler
 * spelling it the device way stays on the interpreter rather than reading a
 * table this scope cannot supply.
 */
function usesDevicePalette(scope: CodegenScope, method: string): boolean {
  const target = scope.methods.find(candidate => candidate.name === method);
  if (!target) return false;
  let found = false;
  const visitExpression = (expression: unknown): void => {
    if (!expression || typeof expression !== 'object') return;
    const node = expression as { kind?: string; callee?: { kind?: string; name?: string } };
    if (
      node.kind === 'call' &&
      node.callee?.kind === 'identifier' &&
      (node.callee.name === 'pen_color' || node.callee.name === 'set_pen_color')
    ) found = true;
    for (const value of Object.values(expression)) {
      if (Array.isArray(value)) value.forEach(visitExpression);
      else visitExpression(value);
    }
  };
  visitExpression(target.program.operations);
  return found;
}

/**
 * A source method that assigns through a C++ reference parameter is emitted
 * against a get/set wrapper ABI. The board calls its handlers with plain
 * values, so such a handler stays on the interpreter rather than being handed
 * arguments in a shape it does not expect.
 *
 * `bitmap_ind16 &bitmap` is not one of these: a renderer mutates what the
 * reference points at without ever reassigning the reference itself.
 */
function usesWrappedParameters(scope: CodegenScope, method: string): boolean {
  const target = scope.methods.find(candidate => candidate.name === method);
  return target ? codegenWrappedParameters(target).length > 0 : false;
}
