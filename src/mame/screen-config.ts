// Screen geometry a video device configures for itself.
//
// A driver usually gives its SCREEN raw parameters directly. A machine built
// around a video-display processor does not: coleco.cpp writes only
// `SCREEN(config, "screen")`, and the VDP fills the geometry in during
// `device_config_complete()` -- `screen().set_raw(clock() / 2, m_total_horz,
// HORZ_DISPLAY_START - 12, ...)`. The numbers are the device's, so they are
// read from the device rather than restated here: its `device_config_complete`
// lowers to IR like any other method, and running that IR against a screen
// that records what it is told yields the same geometry MAME computes.
//
// This is how every TMS9928A/TMS9929A machine is configured, so the same path
// serves SG-1000, MSX and the other VDP consoles.

import { compileMameDevice } from './device-compiler.ts';
import { indexMameHardware, type MameHardwareDefinition } from './hardware.ts';
import { executeGeneratedProgram } from '../ir/execute.ts';

export interface DeviceConfiguredScreen {
  /** Raw parameters in the order screen_device::set_raw declares them. */
  raw: {
    pixclock: number;
    htotal: number;
    hbend: number;
    hbstart: number;
    vtotal: number;
    vbend: number;
    vbstart: number;
  };
  /** Device method installed as the screen update, when the device installs one. */
  screenUpdate?: string;
}

/**
 * Derive the geometry `type` configures for the screen it owns.
 *
 * Returns undefined whenever the device does not configure a screen, its
 * `device_config_complete` did not lower, or it never reached a `set_raw` --
 * the caller then reports missing geometry rather than inventing any.
 */
export function deviceConfiguredScreen(
  mameSrc: string,
  type: string,
  clock: number,
  definitions?: Map<string, MameHardwareDefinition>,
): DeviceConfiguredScreen | undefined {
  const definition = (definitions ?? indexMameHardware(mameSrc)).get(type);
  if (!definition) return undefined;
  let device;
  try {
    device = compileMameDevice(mameSrc, definition, type);
  } catch {
    return undefined;
  }
  const method = device.methods.find(candidate => candidate.name === 'device_config_complete');
  if (!method || method.program.diagnostics.length) return undefined;

  let raw: DeviceConfiguredScreen['raw'] | undefined;
  let screenUpdate: string | undefined;
  // The screen this device is about to configure: MAME's own screen answers
  // "not yet set up", which is the branch that assigns the geometry.
  const screen = {
    has_screen_update: () => 0,
    has_been_setup: () => 0,
    set_screen_update: (_target: unknown, delegate: unknown) => {
      // An unbound source name evaluates to a reference rather than a string.
      const name = typeof delegate === 'object' && delegate && 'reference' in delegate
        ? String((delegate as { reference: unknown }).reference)
        : String(delegate ?? '');
      const method = /(?:^|::)(\w+)\(?\)?$/.exec(name)?.[1];
      if (method) screenUpdate = method;
      return 0;
    },
    set_raw: (...args: number[]) => {
      if (args.length >= 7) {
        const [pixclock, htotal, hbend, hbstart, vtotal, vbend, vbstart] = args.map(Number);
        raw = { pixclock, htotal, hbend, hbstart, vtotal, vbend, vbstart };
      }
      return 0;
    },
  };
  const members: Record<string, unknown> = {};
  for (const member of device.members) {
    if (member.initial !== undefined) members[member.name] = member.initial;
    else if (member.values !== undefined) members[member.name] = [...member.values];
  }
  try {
    executeGeneratedProgram(method.program, {
      members,
      constants: device.constants,
      calls: {
        has_screen: () => 1,
        screen: () => screen,
        clock: () => clock,
        // FUNC(x) passes the delegate through so set_screen_update can name it.
        FUNC: (value: unknown) => value,
      },
    });
  } catch {
    return undefined;
  }
  if (!raw) return undefined;
  return { raw, ...(screenUpdate ? { screenUpdate } : {}) };
}
