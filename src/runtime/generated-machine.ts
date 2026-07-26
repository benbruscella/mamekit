// Registration and signal wiring for decoded boards. The IR types themselves
// live in src/ir/board.ts, which both the compiler and this runtime import.

import type { BoardIr, GeneratedCallback, GeneratedHandler } from '../ir/board.ts';

export type SignalEndpoint = (state: number) => number | void;

export interface CallbackDevice {
  on(signal: string, callback: (...args: number[]) => number | void, slot?: number): unknown;
}

const MACHINES = new Map<string, BoardIr>();

export function registerGeneratedMachine(machine: BoardIr): void {
  MACHINES.set(machine.game, machine);
}

export function generatedMachine(game: string): BoardIr {
  const machine = MACHINES.get(game);
  if (!machine) {
    throw new Error(`generated machine "${game}" was not registered`);
  }
  return machine;
}

export function clearGeneratedMachines(): void {
  MACHINES.clear();
}

/**
 * MAME's `.set_nop()` declares an output that is deliberately left unconnected
 * (pooyan's mainlatch bit 5 is the unused PAY OUT line). That is a fact about
 * the board, not a hole in generation, so it needs no runtime endpoint — while
 * any *other* unbindable callback stays a hard error.
 */
export function isUnconnected(callback: GeneratedCallback): boolean {
  return callback.operation === 'set_nop';
}

/**
 * Apply source-generated callback wiring to an executable generated device.
 *
 * Every matching callback must resolve to an endpoint or be explicitly
 * unconnected. A callback the board cannot deliver is a generation gap, not a
 * runtime detail to skip: silently dropping one produces a machine that boots
 * and then behaves wrongly.
 */
export function wireDeviceCallbacks(
  device: CallbackDevice,
  machine: BoardIr,
  ownerTag: string,
  signal: string,
  endpoints: Record<string, SignalEndpoint>,
): string[] {
  const bound: string[] = [];
  const unresolved: string[] = [];
  for (const callback of machine.callbacks) {
    if (callback.ownerTag !== ownerTag || callback.signal !== signal) continue;
    if (isUnconnected(callback)) continue;
    const target = callbackTarget(callback);
    const endpoint = target ? endpoints[target] : undefined;
    if (!target || !endpoint) {
      unresolved.push(`${callback.id} (${target ?? 'no target'})`);
      continue;
    }
    // Read callbacks (set_ioport) pull a value FROM the port: the device calls
    // the callback with no data and the transform (mask/rshift) applies to the
    // value read back. Write callbacks push data TO the endpoint: the transform
    // applies to the emitted argument.
    device.on(
      signal,
      callback.targetPort
        ? () => applySignalTransforms(Number(endpoint(0)) || 0, callback.transforms)
        : (...args) => {
            // MAME devcb_write{8,16,32} emits (offset, data, mask), while
            // devcb_write_line emits only state. The configured endpoint
            // consumes data/state, never the trailing access mask.
            const value = args.length >= 3 ? args.at(-2) : args.at(-1);
            return endpoint(applySignalTransforms(value ?? 0, callback.transforms));
          },
      callback.slot ?? 0,
    );
    bound.push(target);
  }
  if (unresolved.length) {
    throw new Error(
      `${machine.game}: ${ownerTag}.${signal} has unresolved callback endpoints: ` +
      unresolved.sort().join(', '),
    );
  }
  return bound;
}

export function applySignalTransforms(value: number, transforms: string[] = []): number {
  let result = value;
  for (const transform of transforms) {
    // devcb invert() complements the callback's full width; the KG only
    // extracts invert from line callbacks today, where the width is one bit.
    if (transform === 'invert') result ^= 1;
    const mask = /^mask\((0x[\da-f]+|\d+)\)$/i.exec(transform);
    if (mask) result &= Number(mask[1]);
    const shift = /^rshift\((\d+)\)$/.exec(transform);
    if (shift) result >>>= Number(shift[1]);
  }
  return result;
}

export function callbackTarget(callback: GeneratedCallback): string | undefined {
  if (callback.targetPort) return `port.${callback.targetPort}`;
  if (callback.targetTag && callback.inputLine) return `${callback.targetTag}.${callback.inputLine}`;
  if (!callback.targetMethod) return undefined;
  if (callback.targetTag) return `${callback.targetTag}.${callback.targetMethod}`;
  if (callback.targetClass) return `${callback.targetClass}.${callback.targetMethod}`;
  return callback.targetMethod;
}

export function generatedScreenHandler(machine: BoardIr): GeneratedHandler | undefined {
  const target = machine.execution.screenUpdate?.handler;
  if (!target) return undefined;
  return machine.handlers?.find(handler => `${handler.ownerClass}.${handler.method}` === target);
}
