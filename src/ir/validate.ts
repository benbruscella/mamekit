// Cross-reference validation for a decoded board.
//
// decodeBoardIr() proves the artifact has the right shape; this proves its
// parts refer to each other. Both run at generation time, so a board that
// cannot be wired fails while the compiler still knows which MAME line to
// blame — rather than in the browser, as a missing endpoint nobody notices.

import type { BoardIr, GeneratedCallback, RangeSpec } from './board.ts';
import type { BoardIrDiagnostic } from './decode.ts';

/** MAME `.set_nop()`: an output the board deliberately leaves unconnected. */
export function isUnconnectedCallback(callback: GeneratedCallback): boolean {
  return callback.operation === 'set_nop';
}

/**
 * The endpoint key a callback resolves to, or undefined when it names no
 * target at all. Mirrors the runtime's callbackTarget() so validation and
 * execution cannot disagree about what "resolved" means.
 */
export function callbackEndpointKey(callback: GeneratedCallback): string | undefined {
  if (callback.targetPort) return `port.${callback.targetPort}`;
  if (callback.targetTag && callback.inputLine) return `${callback.targetTag}.${callback.inputLine}`;
  if (!callback.targetMethod) return undefined;
  if (callback.targetTag) return `${callback.targetTag}.${callback.targetMethod}`;
  if (callback.targetClass) return `${callback.targetClass}.${callback.targetMethod}`;
  return callback.targetMethod;
}

export function validateBoardIr(board: BoardIr): BoardIrDiagnostic[] {
  const diagnostics: BoardIrDiagnostic[] = [];
  const fail = (path: string, message: string, source?: BoardIrDiagnostic['source']): void => {
    diagnostics.push(source ? { path, message, source } : { path, message });
  };

  const deviceTags = new Set<string>();
  for (const [index, device] of (board.devices ?? []).entries()) {
    if (deviceTags.has(device.tag)) {
      fail(`devices[${index}].tag`, `duplicate device tag "${device.tag}"`, device.source);
    }
    deviceTags.add(device.tag);
  }

  const cpuTags = new Set<string>();
  for (const [index, cpu] of board.execution.cpus.entries()) {
    if (cpuTags.has(cpu.tag)) {
      fail(`execution.cpus[${index}].tag`, `duplicate CPU tag "${cpu.tag}"`, cpu.source);
    }
    cpuTags.add(cpu.tag);
    // Every CPU is also a MAME device; the two lists describing the same chip
    // differently is how a board ends up wiring interrupts to nothing.
    if (!deviceTags.has(cpu.tag)) {
      fail(
        `execution.cpus[${index}].tag`,
        `CPU "${cpu.tag}" has no matching device entry`,
        cpu.source,
      );
    }
    validateAddressSpace(cpu.ranges, cpu.mask, `execution.cpus[${index}].ranges`, cpu.source, fail);
    validateAddressSpace(
      cpu.io?.ranges,
      cpu.io?.globalMask,
      `execution.cpus[${index}].io.ranges`,
      cpu.source,
      fail,
    );
  }

  const tags = new Set([...deviceTags, ...cpuTags]);
  // A MAME timer_device is declared by the callback that schedules it rather
  // than by a machine-config device line, so it owns itself.
  const timerOwners = new Set(
    board.callbacks.filter(callback => callback.signal === 'timer').map(callback => callback.ownerTag),
  );

  const callbackIds = new Set<string>();
  for (const [index, callback] of board.callbacks.entries()) {
    const path = `callbacks[${index}]`;
    if (callbackIds.has(callback.id)) {
      fail(`${path}.id`, `duplicate callback id "${callback.id}"`, callback.source);
    }
    callbackIds.add(callback.id);

    if (!tags.has(callback.ownerTag) && !timerOwners.has(callback.ownerTag)) {
      fail(
        `${path}.ownerTag`,
        `callback owner "${callback.ownerTag}" is not a declared device, CPU or timer`,
        callback.source,
      );
    }
    if (isUnconnectedCallback(callback)) continue;
    if (!callbackEndpointKey(callback)) {
      fail(
        `${path}`,
        `callback "${callback.id}" names no target and is not declared unconnected — ` +
        'a recognised connection that reaches nothing must fail generation',
        callback.source,
      );
    }
    // set_ioport callbacks repeat the port name in targetTag; targetPort wins,
    // so only a device-directed callback constrains the tag.
    if (callback.targetTag && !callback.targetPort && !tags.has(callback.targetTag)) {
      fail(
        `${path}.targetTag`,
        `callback target "${callback.targetTag}" is not a declared device or CPU`,
        callback.source,
      );
    }
  }

  for (const [index, event] of board.execution.frameEvents.entries()) {
    if (callbackIds.has(event.callbackId)) continue;
    fail(
      `execution.frameEvents[${index}].callbackId`,
      `frame event references unknown callback "${event.callbackId}"`,
      event.source,
    );
  }

  const bankTags = new Set((board.execution.banks ?? []).map(bank => bank.tag));
  for (const [index, bank] of (board.execution.banks ?? []).entries()) {
    if (bank.entryOffsets.some(offset => offset !== null)) continue;
    fail(
      `execution.banks[${index}].entryOffsets`,
      `memory bank "${bank.tag}" has no configured entry`,
      bank.source,
    );
  }
  for (const [index, cpu] of board.execution.cpus.entries()) {
    for (const [position, range] of [...(cpu.ranges ?? []), ...(cpu.io?.ranges ?? [])].entries()) {
      for (const key of [range.read, range.write]) {
        if (!key?.startsWith('bank.')) continue;
        const tag = key.slice('bank.'.length);
        if (bankTags.has(tag)) continue;
        fail(
          `execution.cpus[${index}].ranges[${position}]`,
          `range maps bank "${tag}", which the board does not configure`,
          cpu.source,
        );
      }
    }
  }

  const handlerKeys = new Set(
    (board.handlers ?? []).map(handler => `${handler.ownerClass}.${handler.method}`),
  );
  const handlerMethods = new Set((board.handlers ?? []).map(handler => handler.method));
  const screenUpdate = board.execution.screenUpdate;
  if (screenUpdate && !handlerKeys.has(screenUpdate.handler)) {
    fail(
      'execution.screenUpdate.handler',
      `screen update handler "${screenUpdate.handler}" was not generated`,
      screenUpdate.source,
    );
  }
  for (const [index, custom] of (board.execution.customs ?? []).entries()) {
    const resolved = custom.handler
      ? handlerKeys.has(custom.handler)
      : handlerMethods.has(custom.member);
    if (resolved) continue;
    fail(
      `execution.customs[${index}]`,
      `custom input port "${custom.port}" names handler ` +
      `"${custom.handler ?? custom.member}", which was not generated`,
    );
  }

  for (const [index, route] of (board.sound?.routes ?? []).entries()) {
    if (route.target) continue;
    fail(`sound.routes[${index}].target`, 'audio route has no destination');
  }

  return diagnostics;
}

function validateAddressSpace(
  ranges: RangeSpec[] | undefined,
  mask: number | undefined,
  path: string,
  source: BoardIrDiagnostic['source'],
  fail: (path: string, message: string, source?: BoardIrDiagnostic['source']) => void,
): void {
  if (!ranges) return;
  const limit = mask ?? 0xffff;
  for (const [index, range] of ranges.entries()) {
    if (range.end <= limit) continue;
    fail(
      `${path}[${index}]`,
      `range ends at 0x${range.end.toString(16)}, outside the ` +
      `0x${limit.toString(16)} address space`,
      source,
    );
  }
}
