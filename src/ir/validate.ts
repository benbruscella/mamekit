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
 * A callback whose target is the scheduler rather than a wire.
 *
 * MAME drivers append `perfect_quantum` to a devcb to say "give the other
 * processor real time now"; the request names no device or CPU, so there is
 * no endpoint for it to resolve to, but it is still an executable effect.
 */
export function isSchedulerCallback(callback: GeneratedCallback): boolean {
  return callback.operation === 'perfect_quantum';
}

/** Configuration selectors consumed by their owning subsystem, not signals. */
export function isDeclarativeCallback(callback: GeneratedCallback): boolean {
  // A device_delegate setter belongs to the same class: the owning device
  // holds the delegate and calls it, so there is no board effect to dispatch.
  // A palette init is configuration in the same sense -- MAME runs it once
  // when the palette device starts, and the renderer does the same.
  return callback.signal === 'set_screen_update' ||
    callback.signal === 'palette_init' ||
    callback.delegate === true;
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
  const handlerKeys = new Set(
    (board.handlers ?? []).map(handler => `${handler.ownerClass}.${handler.method}`),
  );
  const handlerMethods = new Set((board.handlers ?? []).map(handler => handler.method));
  for (const field of ['startHandlers', 'resetHandlers'] as const) {
    for (const [index, handler] of (board.execution[field] ?? []).entries()) {
      if (handlerKeys.has(handler)) continue;
      fail(
        `execution.${field}[${index}]`,
        `machine lifecycle handler "${handler}" was not generated`,
      );
    }
  }
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
    if (isUnconnectedCallback(callback) || isSchedulerCallback(callback)) continue;
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

  // Lowering emits exactly one executable connection for every callback,
  // including an explicit no-op for MAME .set_nop(). Keep that invariant at
  // the decoded boundary: otherwise a missing connection survives generation
  // and fails only when the signal happens to fire in the browser, while a
  // duplicate is silently overwritten in the runtime's callback map.
  const connectionCounts = new Map<string, number>();
  for (const [index, connection] of board.connections.entries()) {
    const path = `connections[${index}]`;
    const count = (connectionCounts.get(connection.callbackId) ?? 0) + 1;
    connectionCounts.set(connection.callbackId, count);
    if (!callbackIds.has(connection.callbackId)) {
      fail(
        `${path}.callbackId`,
        `connection references unknown callback "${connection.callbackId}"`,
        connection.source,
      );
    } else if (count > 1) {
      fail(
        `${path}.callbackId`,
        `callback "${connection.callbackId}" has more than one connection`,
        connection.source,
      );
    }

    const callback = board.callbacks.find(candidate => candidate.id === connection.callbackId);
    if (connection.effect.kind === 'unconnected') {
      if (callback && !isUnconnectedCallback(callback)) {
        fail(
          `${path}.effect`,
          `callback "${connection.callbackId}" is executable but its connection is unconnected`,
          connection.source ?? callback.source,
        );
      }
      continue;
    }
    if (callback && isUnconnectedCallback(callback)) {
      fail(
        `${path}.effect`,
        `callback "${connection.callbackId}" is declared unconnected but has an executable effect`,
        connection.source ?? callback.source,
      );
    }

    const effect = connection.effect;
    if (effect.kind === 'cpu-line' && !cpuTags.has(effect.tag)) {
      fail(
        `${path}.effect.tag`,
        `CPU-line effect targets undeclared CPU "${effect.tag}"`,
        connection.source,
      );
    } else if (
      (effect.kind === 'device-method' ||
        effect.kind === 'audio-control' ||
        effect.kind === 'audio-write') &&
      !tags.has(effect.tag)
    ) {
      fail(
        `${path}.effect.tag`,
        `${effect.kind} effect targets undeclared device "${effect.tag}"`,
        connection.source,
      );
    } else if (effect.kind === 'handler' && !handlerKeys.has(effect.handler)) {
      fail(
        `${path}.effect.handler`,
        `connection handler "${effect.handler}" was not generated`,
        connection.source,
      );
    }
  }
  for (const [index, callback] of board.callbacks.entries()) {
    if (isDeclarativeCallback(callback)) continue;
    if ((connectionCounts.get(callback.id) ?? 0) !== 0) continue;
    fail(
      `callbacks[${index}].id`,
      `callback "${callback.id}" has no executable connection`,
      callback.source,
    );
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
  for (const [index, tap] of (board.execution.accessTaps ?? []).entries()) {
    if (!board.execution.cpus.some(cpu => cpu.tag === tap.cpu)) {
      fail(
        `execution.accessTaps[${index}].cpu`,
        `access tap watches unknown CPU "${tap.cpu}"`,
        tap.source,
      );
    }
    if (!board.devices?.some(device => device.tag === tap.device)) {
      fail(
        `execution.accessTaps[${index}].device`,
        `access tap targets unknown device "${tap.device}"`,
        tap.source,
      );
    }
    if (tap.bank !== undefined && !bankTags.has(tap.bank)) {
      fail(
        `execution.accessTaps[${index}].bank`,
        `access tap selects bank "${tap.bank}", which the board does not configure`,
        tap.source,
      );
    }
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

  const screenUpdate = board.execution.screenUpdate;
  if (screenUpdate && !handlerKeys.has(screenUpdate.handler)) {
    // A video-display processor installs its own update, so the method is the
    // device's and resolves against the device list rather than the driver's
    // handlers -- the same split the device-line custom inputs below make.
    if (!screenUpdate.deviceTag) {
      fail(
        'execution.screenUpdate.handler',
        `screen update handler "${screenUpdate.handler}" was not generated`,
        screenUpdate.source,
      );
    } else if (!deviceTags.has(screenUpdate.deviceTag)) {
      fail(
        'execution.screenUpdate.deviceTag',
        `screen update belongs to device "${screenUpdate.deviceTag}", which the board does not compose`,
        screenUpdate.source,
      );
    }
  }
  for (const [index, custom] of (board.execution.customs ?? []).entries()) {
    if (custom.source === 'device-line') {
      // The bit is a device output line, so it resolves against the device
      // list rather than the driver's own handlers.
      if (custom.deviceTag && deviceTags.has(custom.deviceTag)) continue;
      fail(
        `execution.customs[${index}]`,
        `custom input port "${custom.port}" reads device "${custom.deviceTag}", ` +
        'which the board does not configure',
      );
      continue;
    }
    if (custom.source === 'screen-vblank' || custom.source === 'rtc-tp' || custom.source === 'rtc-data') continue;
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
