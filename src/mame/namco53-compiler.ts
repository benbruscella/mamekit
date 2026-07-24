import type { GeneratedDeviceDefinition } from './device-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';

const SOURCE_FILE = 'src/mame/machine/namcoio.c@adffaf795b6^';

/**
 * Lower MAME's historical 53XX high-level protocol into executable device IR.
 * Current MAME uses the separately distributed 53xx.bin MB8843 firmware. This
 * source-backed protocol preserves Dig Dug's documented mode when that device
 * ROM is not supplied with the game archive.
 */
export function compileNamco53Protocol(): GeneratedDeviceDefinition {
  const method = (name: string, parameters: string, source: string, line: number) => ({
    name,
    parameters,
    program: compileMameHandler(normalizeMameExecutionSource(source)),
    source: { file: SOURCE_FILE, line },
  });
  const methods = [
    method('device_reset', '', 'm_in_count = 0;', 879),
    method('reset', 'int state', 'if (!state) device_reset();', 879),
    method('chip_select', 'int state', '', 879),
    method('read', '', `
      int phase = m_in_count++ % 2;
      if (phase == 0) {
        return (m_input_callback[0]() & 0x0f) |
          ((m_input_callback[1]() & 0x0f) << 4);
      }
      return (m_input_callback[2]() & 0x0f) |
        ((m_input_callback[3]() & 0x0f) << 4);
    `, 879),
  ];
  const diagnostics = methods.reduce(
    (count, candidate) => count + candidate.program.diagnostics.length,
    0,
  );
  return {
    schemaVersion: 1,
    type: 'NAMCO_53XX',
    className: 'namco_53xx_device',
    hierarchy: ['namco_53xx_device'],
    sourceFiles: [SOURCE_FILE, 'src/mame/namco/namco53.cpp'],
    constants: {},
    members: [{ name: 'm_in_count', valueType: 'int', bits: 32, initial: 0 }],
    callbacks: [
      { signal: 'k_port_callback', member: 'm_k', slots: 1, initial: 0xff },
      { signal: 'input_callback', member: 'm_input_callback', slots: 4, initial: 0x0f },
      { signal: 'p_port_callback', member: 'm_p', slots: 1, initial: 0 },
    ],
    timers: [],
    methods,
    reset: 'device_reset',
    summary: {
      methods: methods.length,
      compiledMethods: methods.filter(candidate => !candidate.program.diagnostics.length).length,
      diagnostics,
    },
  };
}
