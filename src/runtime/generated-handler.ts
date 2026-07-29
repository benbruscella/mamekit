// Board wiring for generated handler IR: bus handlers and device signals.
// The interpreter itself is neutral and lives in src/ir/execute.ts.

import type { HandlerRegistry, ReadHandler, WriteHandler } from './bus.ts';
import type { BoardIr, GeneratedHandler } from '../ir/board.ts';
import {
  executeGeneratedMachineHandler,
  type GeneratedHandlerBindings,
} from '../ir/execute.ts';
import { wireDeviceCallbacks, type CallbackDevice } from './generated-machine.ts';
import { applyBoardTransforms, type BoundEffect } from './generated-effects.ts';

export type {
  GeneratedCallArgument,
  GeneratedHandlerBindings,
  GeneratedLValue,
} from '../ir/execute.ts';
export {
  executeGeneratedCallbackHandler,
  executeGeneratedHandler,
  executeGeneratedMachineHandler,
  executeGeneratedMachineProgram,
  executeGeneratedProgram,
  generatedPeriodicLines,
} from '../ir/execute.ts';

/**
 * Build executable bus handlers for source methods that compiled without
 * diagnostics. Runtime device-tag handlers are intentionally not synthesized;
 * they belong to reusable device implementations.
 */
export function generatedHandlerRegistry(
  machine: BoardIr,
  bindings: GeneratedHandlerBindings = {},
): HandlerRegistry {
  const registry: HandlerRegistry = { read: {}, write: {} };
  const handlers = new Map(
    (machine.handlers ?? [])
      .filter(handler => handler.program && handler.program.diagnostics.length === 0)
      .map(handler => [`${handler.ownerClass}.${handler.method}`, handler]),
  );
  const resolve = (key: string): GeneratedHandler | undefined => {
    const exact = handlers.get(key);
    if (exact) return exact;
    const method = key.slice(key.indexOf('.') + 1);
    const matches = [...handlers.values()].filter(handler => handler.method === method);
    return matches.length === 1 ? matches[0] : undefined;
  };

  for (const map of machine.maps ?? []) {
    for (const range of map.ranges) {
      if (range.read) {
        const handler = resolve(range.read);
        if (handler?.program && !registry.read[range.read]) {
          registry.read[range.read] = makeReadHandler(machine, handler, bindings);
        }
      }
      if (range.write) {
        const handler = resolve(range.write);
        if (handler?.program && !registry.write[range.write]) {
          registry.write[range.write] = makeWriteHandler(machine, handler, bindings);
        }
      }
    }
  }
  return registry;
}

/** Wire a generated device signal to the effects bound for its callbacks. */

/** Wire a generated device signal to the effects bound for its callbacks. */
export function wireGeneratedDevice(
  device: CallbackDevice,
  machine: BoardIr,
  ownerTag: string,
  signal: string,
  effects: Map<string, BoundEffect>,
): string[] {
  return wireDeviceCallbacks(device, machine, ownerTag, signal, effects);
}


export function dispatchGeneratedCallbacks(
  machine: BoardIr,
  ownerTag: string,
  signal: string,
  state: number,
  effects: Map<string, BoundEffect>,
): string[] {
  const bound: string[] = [];
  for (const callback of machine.callbacks) {
    if (callback.ownerTag !== ownerTag || callback.signal !== signal) continue;
    bound.push(...dispatchGeneratedCallback(machine, callback.id, state, effects));
  }
  return bound;
}


export function dispatchGeneratedCallback(
  machine: BoardIr,
  callbackId: string,
  state: number,
  effects: Map<string, BoundEffect>,
): string[] {
  const effect = effects.get(callbackId);
  if (!effect) {
    throw new Error(
      `${machine.game}: callback "${callbackId}" has no bound effect — ` +
      'every connection is resolved at generation time, so this is a composition bug',
    );
  }
  effect.run(applyBoardTransforms(state, effect.transforms));
  return [callbackId];
}


function makeReadHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): ReadHandler {
  return (addr, offset) => executeGeneratedMachineHandler(
    machine,
    handler,
    bindings,
    { addr, offset },
  ) ?? 0xff;
}


function makeWriteHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): WriteHandler {
  return (addr, offset, data) => {
    executeGeneratedMachineHandler(
      machine,
      handler,
      bindings,
      { addr, offset, data, state: data },
    );
  };
}
