import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileInputMerger } from '../../mame/input-merger-compiler.ts';
import { compileNamco51Protocol } from '../../mame/namco51-compiler.ts';
import { compileNamco53Protocol } from '../../mame/namco53-compiler.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
  LoweredMethod,
} from '../contract.ts';
import {
  DEVICE_MAME_TYPES,
  deviceIrArtifact,
  deviceModuleArtifact,
} from './definition.ts';

type Compiled = ReturnType<typeof compileMameDevice>;

const SPECIALIZED: Record<
string,
(mameSource: string, definition: MameHardwareDefinition) => Compiled
> = {
  I8257: compileI8257,
  INPUT_MERGER_ALL_HIGH: compileInputMerger,
  INPUT_MERGER_ANY_HIGH: compileInputMerger,
  LATCH8: compileLatch8,
};

function replaceMethod(device: Compiled, name: string, body: string): void {
  const method = device.methods.find(candidate => candidate.name === name);
  if (!method) throw new Error(`${device.type}: source method ${name} is missing`);
  method.program = compileMameHandler(body);
}

function refreshSummary(device: Compiled): Compiled {
  device.summary = {
    methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce(
      (count, method) => count + method.program.diagnostics.length,
      0,
    ),
  };
  return device;
}

/** Specialize MAME's templated bit writers for the eight concrete entry points. */
function compileLatch8(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'LATCH8');
  for (let bit = 0; bit < 8; bit++) {
    replaceMethod(device, `bit${bit}_w`, `
      uint8_t mask = 1 << offset;
      uint8_t masked_data = BIT(data, ${bit}) << offset;
      update(masked_data, mask);
    `);
  }
  // Machine-config callbacks are already validated and wired by the board.
  replaceMethod(device, 'device_start', `
    m_has_write = true;
    m_has_read = true;
  `);
  return refreshSummary(device);
}

/** Expand MAME's two fixed four-channel range-for loops into executable IR. */
function compileI8257(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'I8257');
  // The generic member parser sees fields of MAME's anonymous channel struct
  // as scalars. Preserve the actual four-element aggregate so indexed member
  // reads/writes execute with the same shape as the source.
  device.members = device.members.filter(member =>
    !['m_address', 'm_count', 'm_mode'].includes(member.name));
  device.members.push({
    name: 'm_channel',
    valueType: 'channel[]',
    values: Array.from({ length: 4 }, () => ({
      m_address: 0,
      m_count: 0,
      m_mode: 0,
    })),
  });
  replaceMethod(device, 'device_reset', `
    m_state = STATE_SI;
    m_transfer_mode = 0;
    m_status = 0;
    m_msb = 0;
    m_current_channel = -1;
    m_last_channel = 3;
    m_hreq = -1;
    m_tc = 0;
    for (int channel = 0; channel < 4; channel++) {
      m_channel[channel].m_address = 0;
      m_channel[channel].m_count = 0;
      m_channel[channel].m_mode = 0;
    }
    set_hreq(0);
    set_dack();
  `);
  replaceMethod(device, 'next_channel', `
    for (int step = 0; step < 4; step++) {
      int channel = MODE_ROTATING_PRIORITY
        ? ((m_last_channel + step + 1) & 3)
        : step;
      if (is_request_active(channel)) {
        m_current_channel = channel;
        m_last_channel = channel;
        return true;
      }
    }
    return false;
  `);
  return refreshSummary(device);
}

/** Devices MAMEKIT lowers as a protocol rather than by running MCU firmware. */
const PROTOCOL: Record<string, () => Compiled> = {
  NAMCO_51XX: compileNamco51Protocol,
  NAMCO_53XX: compileNamco53Protocol,
};

export function extractDevices(input: CapabilityInput): CapabilityExtraction | undefined {
  const compiled = new Map<string, Compiled>();
  for (const type of DEVICE_MAME_TYPES) {
    const entry = input.entries.find(candidate => candidate.type === type);
    if (!entry) continue;
    const protocol = PROTOCOL[type];
    if (protocol) {
      compiled.set(type, protocol());
      continue;
    }
    if (!entry.definition) continue;
    const definition = entry.definition as MameHardwareDefinition;
    const device = SPECIALIZED[type]
      ? SPECIALIZED[type](input.mameSource, definition)
      : compileMameDevice(input.mameSource, definition, type);
    // A device whose methods did not lower cleanly is not executable. Emitting
    // it anyway would claim hardware the runtime cannot actually run.
    if (device.summary.diagnostics) continue;
    compiled.set(type, device);
  }
  if (!compiled.size) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = deviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: deviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', '')),
      },
    );
    executable[type] = { kind: 'device', artifact: ir };
    entrySourceFiles[type] = device.sourceFiles;
    entryMethods[type] = device.methods.map(method => ({
      name: method.name,
      parameters: method.parameters,
      sourceFile: method.source.file,
      sourceLine: method.source.line,
      body: '',
      program: method.program,
    }));
  }
  return {
    executableTypes: [...compiled.keys()],
    executable,
    artifacts,
    entryMethods,
    entrySourceFiles,
  };
}
