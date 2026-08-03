// Execute typed board effects.
//
// The compiler resolved every MAME callback into a BoardEffect, so this layer
// switches on a small closed union instead of parsing C++ method names. An
// effect with no executor is a composition error and throws; nothing can be
// quietly skipped.

import type { BoardEffect, BoardIr, BoardTransform, CpuLine, CpuLineDelivery } from '../ir/board.ts';

/** Applies the transformed value; read effects ignore the argument. */
export type EffectExecutor = (value: number, ...sourceArgs: number[]) => number | void;

export interface EffectBindings {
  cpuLine(tag: string, line: CpuLine, delivery: CpuLineDelivery): EffectExecutor | undefined;
  deviceMethod(tag: string, method: string, ownerClass?: string): EffectExecutor | undefined;
  handler(key: string, deviceTag?: string): EffectExecutor | undefined;
  portRead(port: string): EffectExecutor | undefined;
  videoControl(control: 'flip-screen' | 'flip-screen-x' | 'flip-screen-y'): EffectExecutor | undefined;
  audioControl(tag: string, control: 'mute' | 'enable', offset?: number): EffectExecutor | undefined;
  audioWrite(tag: string, method: string): EffectExecutor | undefined;
}

export function applyBoardTransforms(value: number, transforms: BoardTransform[] = []): number {
  let result = value;
  for (const transform of transforms) {
    // devcb invert() complements the callback's full width; the KG only
    // extracts invert from line callbacks today, where the width is one bit.
    if (transform.kind === 'invert') result ^= 1;
    else if (transform.kind === 'mask') result &= transform.value;
    else if (transform.kind === 'bit') result = (result >>> transform.bit) & 1;
    else if (transform.kind === 'rshift') result >>>= transform.bits;
    else if (transform.kind === 'lshift') result = (result << transform.bits) >>> 0;
  }
  return result;
}

function executorFor(effect: BoardEffect, bindings: EffectBindings): EffectExecutor | undefined {
  switch (effect.kind) {
    // MAME .set_nop(): the board declares this output unconnected, so doing
    // nothing is the correct behaviour rather than a gap.
    case 'unconnected': return () => {};
    case 'cpu-line': return bindings.cpuLine(effect.tag, effect.line, effect.delivery);
    case 'device-method': return bindings.deviceMethod(effect.tag, effect.method, effect.ownerClass);
    case 'handler': return bindings.handler(effect.handler, effect.deviceTag);
    case 'port-read': return bindings.portRead(effect.port);
    case 'video-control': return bindings.videoControl(effect.control);
    case 'audio-control': return bindings.audioControl(effect.tag, effect.control, effect.offset);
    case 'audio-write': return bindings.audioWrite(effect.tag, effect.method);
  }
}

export interface BoundEffect {
  run: EffectExecutor;
  transforms: BoardTransform[];
  /** set_ioport pulls a value back rather than pushing one out. */
  reads: boolean;
}

/**
 * Bind every connection to an executor, keyed by the callback it came from.
 * Any connection that cannot be bound aborts board construction, naming the
 * MAME source line — the browser equivalent of the compiler's own check.
 */
export function bindBoardEffects(
  machine: BoardIr,
  bindings: EffectBindings,
): Map<string, BoundEffect> {
  const bound = new Map<string, BoundEffect>();
  const seen = new Set<string>();
  const unbound: string[] = [];
  for (const connection of machine.connections) {
    if (seen.has(connection.callbackId)) {
      throw new Error(
        `${machine.game}: callback "${connection.callbackId}" has more than one connection`,
      );
    }
    seen.add(connection.callbackId);
    const run = executorFor(connection.effect, bindings);
    if (!run) {
      unbound.push(
        `${connection.callbackId} (${connection.effect.kind})` +
        (connection.source ? ` at ${connection.source.file}:${connection.source.line}` : ''),
      );
      continue;
    }
    bound.set(connection.callbackId, {
      run,
      transforms: connection.transforms,
      reads: connection.effect.kind === 'port-read',
    });
  }
  if (unbound.length) {
    throw new Error(
      `${machine.game}: generated composition cannot execute these connections: ` +
      unbound.sort().join(', '),
    );
  }
  return bound;
}
