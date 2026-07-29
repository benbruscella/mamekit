import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import {
  compileNesApu,
  generatedNesApuWorkletSource,
} from '../../mame/nes-apu-compiler.ts';
import {
  indexMameHardware,
  type MameHardwareDefinition,
} from '../../mame/hardware.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
  LoweredMethod,
} from '../contract.ts';
import {
  NES_MAME_TYPES,
  NES_APU_IR_ARTIFACT,
  NES_APU_WORKLET_ARTIFACT,
  NES_CPU_TYPES,
  nesDeviceIrArtifact,
  nesDeviceModuleArtifact,
} from './definition.ts';

const CART_MAPPERS = new Set([0, 1, 2, 3, 4]);
const IMAGE_HOST_METHODS = new Set([
  'call_load',
  'call_unload',
  'call_load_pcb',
  'call_load_unif',
  'call_load_ines',
  'get_default_card_software',
  'get_default_card_unif',
  'get_default_card_ines',
]);

/**
 * Compile the board-visible NES devices and their source-declared slot cards.
 *
 * Slot children stay inside the device definition. The browser therefore
 * registers exactly the devices present in the machine closure while the
 * generic device runtime can instantiate the selected controller/cart card.
 */
export function extractNes(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    NES_MAME_TYPES.includes(entry.type as (typeof NES_MAME_TYPES)[number]));
  const hasApu = input.entries.some(entry =>
    NES_CPU_TYPES.includes(entry.type as (typeof NES_CPU_TYPES)[number]));
  if (!present.length && !hasApu) return undefined;

  const definitions = indexMameHardware(input.mameSource);
  const machineWiring = nesMachineWiring(input.mameSource);
  const compiled = new Map<string, GeneratedDeviceDefinition>();
  for (const entry of present) {
    const definition = entry.definition as MameHardwareDefinition | undefined;
    if (!definition) continue;
    const device = compileMameDevice(input.mameSource, definition, entry.type);
    if (entry.type === 'PPU_2C02') {
      device.links = machineWiring.ppuLinks;
    } else if (entry.type === 'NES_CONTROL_PORT') {
      const joypad = compileRequired(input.mameSource, definitions, 'NES_JOYPAD');
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_device'),
        default: controllerDefaultOption(input.mameSource),
        options: { joypad },
      };
    } else if (entry.type === 'NES_CART_SLOT') {
      // Image loading and software selection are host concerns: the console
      // room has already supplied PRG/CHR bytes and mapper metadata. Keep only
      // the source methods that implement the live slot/card bus.
      device.methods = device.methods.filter(method =>
        !method.program.diagnostics.length && !IMAGE_HOST_METHODS.has(method.name));
      device.summary.methods = device.methods.length;
      device.summary.compiledMethods = device.methods.length;
      device.summary.diagnostics = 0;
      const options = cartridgeOptions(input.mameSource, definitions);
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_cart'),
        selector: 'cart.mapper',
        options,
      };
      device.resources = {
        initialize: [
          {
            method: 'pcb_start',
            args: [{ kind: 'memory', name: 'ciram', bytes: machineWiring.ciramBytes }],
          },
          { method: 'pcb_reset' },
        ],
      };
      device.bus = machineWiring.cartBus;
      device.role = 'cartridge';
    }
    if (device.summary.diagnostics) continue;
    compiled.set(entry.type, device);
  }
  if (!compiled.size) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  if (hasApu) {
    const apu = compileNesApu(input.mameSource);
    artifacts.push(
      { path: NES_APU_IR_ARTIFACT, contents: JSON.stringify(apu, null, 2) },
      { path: NES_APU_WORKLET_ARTIFACT, contents: generatedNesApuWorkletSource(apu) },
    );
  }
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = nesDeviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: nesDeviceModuleArtifact(type),
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

function compileRequired(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
  type: string,
): GeneratedDeviceDefinition {
  const definition = definitions.get(type);
  if (!definition) throw new Error(`NES source closure is missing ${type}`);
  const device = compileMameDevice(mameSource, definition, type);
  if (device.summary.diagnostics) {
    throw new Error(`${type} has ${device.summary.diagnostics} generated-device diagnostics`);
  }
  return device;
}

/** Resolve the option string MAME assigns to the standard controller card. */
function controllerDefaultOption(mameSource: string): string {
  const source = readFileSync(
    join(mameSource, 'src/devices/bus/nes_ctrl/ctrl.cpp'),
    'utf8',
  );
  const body = /void\s+nes_control_port1_devices\s*\([^)]*\)\s*\{([\s\S]*?)\}/
    .exec(source)?.[1] ?? '';
  const option = /option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*NES_JOYPAD\s*\)/
    .exec(body)?.[1];
  if (!option) throw new Error('MAME NES controller options no longer declare NES_JOYPAD');
  return option;
}

/**
 * Resolve iNES mapper -> PCB id -> slot option -> MAME device type from the
 * same three tables MAME uses. No mapper table is duplicated in MAMEKIT.
 */
function cartridgeOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): Record<string, GeneratedDeviceDefinition> {
  const directory = join(mameSource, 'src/devices/bus/nes');
  const ines = readFileSync(join(directory, 'nes_ines.hxx'), 'utf8');
  const pcbs = readFileSync(join(directory, 'nes_pcb.hxx'), 'utf8');
  const carts = readFileSync(join(directory, 'nes_carts.cpp'), 'utf8');
  const mirroring = ppuMirroringValues(mameSource);
  const pcbByMapper = new Map<number, string>();
  for (const match of ines.matchAll(/\{\s*(\d+)\s*,\s*(\w+)\s*\}/g)) {
    const mapper = Number(match[1]);
    if (CART_MAPPERS.has(mapper) && !pcbByMapper.has(mapper)) {
      pcbByMapper.set(mapper, match[2]!);
    }
  }
  const slotByPcb = new Map<string, string>();
  for (const match of pcbs.matchAll(/\{\s*"([^"]+)"\s*,\s*(\w+)\s*\}/g)) {
    slotByPcb.set(match[2]!, match[1]!);
  }
  const typeBySlot = new Map<string, string>();
  for (const match of carts.matchAll(
    /option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g,
  )) {
    typeBySlot.set(match[1]!, match[2]!);
  }

  const result: Record<string, GeneratedDeviceDefinition> = {};
  for (const mapper of [...CART_MAPPERS].sort((left, right) => left - right)) {
    const pcb = pcbByMapper.get(mapper);
    const slot = pcb && slotByPcb.get(pcb);
    const type = slot && typeBySlot.get(slot);
    if (!pcb || !slot || !type) {
      throw new Error(`MAME NES tables do not resolve iNES mapper ${mapper}`);
    }
    const device = compileRequired(mameSource, definitions, type);
    device.resources = {
      members: {
        m_prg: { kind: 'region', name: 'prg' },
        m_vrom: { kind: 'region', name: 'chr' },
        m_ciram: { kind: 'memory', name: 'ciram', bytes: 0x1000 },
        m_prg_size: { kind: 'region-length', name: 'prg' },
        m_vrom_size: { kind: 'region-length', name: 'chr' },
        m_prg_chunks: { kind: 'region-pages', name: 'prg', bytes: 0x4000 },
        m_prg_mask: { kind: 'region-page-mask', name: 'prg', bytes: 0x2000 },
        m_vrom_chunks: { kind: 'region-pages', name: 'chr', bytes: 0x2000 },
        m_vram: {
          kind: 'memory',
          name: 'chr-ram',
          bytes: 0x2000,
          onlyWhenRegionMissing: 'chr',
        },
        m_vram_chunks: {
          kind: 'missing-region-number',
          name: 'chr',
          missing: 1,
          present: 0,
        },
        m_prgram: { kind: 'memory', name: 'prg-ram', bytes: 0x2000 },
        m_battery: { kind: 'memory', name: 'battery', bytes: 0 },
        m_prg_bank_mem: { kind: 'bank-array', name: 'prg', count: 4 },
        m_mirroring: {
          kind: 'config-map',
          path: 'cart.mirroring',
          values: {
            vertical: mirroring.PPU_MIRROR_VERT,
            horizontal: mirroring.PPU_MIRROR_HORZ,
            single1: mirroring.PPU_MIRROR_HIGH,
            single0: mirroring.PPU_MIRROR_LOW,
            four: mirroring.PPU_MIRROR_4SCREEN,
          },
          fallback: mirroring.PPU_MIRROR_HORZ,
        },
        m_four_screen_vram: {
          kind: 'config-map',
          path: 'cart.mirroring',
          values: { four: 1 },
          fallback: 0,
        },
      },
    };
    result[String(mapper)] = device;
  }
  return result;
}

/**
 * Recover the dynamic CPU/PPU wiring installed by nes_state::machine_start.
 * These ranges deliberately come from MAME rather than a MAMEKIT-owned NES
 * map, so source changes fail generation instead of silently drifting.
 */
function nesMachineWiring(mameSource: string): {
  ciramBytes: number;
  cartBus: NonNullable<GeneratedDeviceDefinition['bus']>;
  ppuLinks: NonNullable<GeneratedDeviceDefinition['links']>;
} {
  const nesSource = readFileSync(
    join(mameSource, 'src/mame/nintendo/nes.cpp'),
    'utf8',
  );
  const start = extractFunctionBody(nesSource, 'void nes_state::machine_start()');
  const common = start.split('// install additional handlers')[0]!;
  const ciramBytes = numericLiteral(
    /m_ciram\s*=\s*std::make_unique<[^>]+>\s*\(\s*([^)]+)\s*\)/.exec(common)?.[1],
    'NES CIRAM allocation',
  );

  const ranges: NonNullable<GeneratedDeviceDefinition['bus']>['ranges'] = [];
  const handlers = new Map<string, { start: number; end: number; read?: string; write?: string }>();
  for (const match of common.matchAll(
    /space\.install_(read|write)_handler\s*\(\s*(0x[\da-f]+)\s*,\s*(0x[\da-f]+)\s*,[^;\r\n]*?FUNC\s*\([^:()\r\n]+::(\w+)\)\s*\)+\s*;/gi,
  )) {
    const kind = match[1]!;
    const startAddress = Number(match[2]);
    const endAddress = Number(match[3]);
    const method = match[4]!;
    const key = `${startAddress}:${endAddress}`;
    const range = handlers.get(key) ?? { start: startAddress, end: endAddress };
    range[kind === 'read' ? 'read' : 'write'] = method;
    handlers.set(key, range);
  }
  ranges.push(...handlers.values());

  const banks = /for\s*\([^;]+;\s*\w+\s*<\s*(\d+)\s*;[^)]*\)\s*space\.install_read_bank\s*\(\s*(0x[\da-f]+)\s*\+\s*(0x[\da-f]+)\s*\*\s*(\w+)\s*,\s*(0x[\da-f]+)\s*\+\s*(0x[\da-f]+)\s*\*\s*\4\s*,\s*m_prg_bank\s*\[\s*\4\s*\]\s*\)/i
    .exec(common);
  if (!banks) throw new Error('MAME NES machine_start no longer declares PRG banks');
  const count = Number(banks[1]);
  const firstStart = Number(banks[2]);
  const startStride = Number(banks[3]);
  const firstEnd = Number(banks[5]);
  const endStride = Number(banks[6]);
  const highWrite = ranges.find(range =>
    range.start === firstStart && range.write)?.write ??
    handlers.get(`${firstStart}:${0xffff}`)?.write;
  for (let index = 0; index < count; index++) {
    ranges.push({
      start: firstStart + startStride * index,
      end: firstEnd + endStride * index,
      bank: `prg${index}`,
      ...(highWrite ? { write: highWrite } : {}),
    });
  }
  // A single high write handler spans the banked read ranges. It is composed
  // into each bank range, so remove the otherwise overlapping standalone row.
  const compactRanges = ranges.filter(range =>
    !(range.start === firstStart && range.end === 0xffff && range.write === highWrite));

  const ppuRanges: {
    start: number;
    end: number;
    target: 'slot';
    read: string;
    write: string;
  }[] = [];
  for (const match of common.matchAll(
    /m_ppu->space\([^)]*\)\.install_readwrite_handler\s*\(\s*(0x[\da-f]+|0)\s*,\s*(0x[\da-f]+)\s*,[\s\S]*?::(\w+)\)+\s*,[\s\S]*?::(\w+)\)+\s*\)\s*;/gi,
  )) {
    ppuRanges.push({
      start: Number(match[1]),
      end: Number(match[2]),
      target: 'slot',
      read: match[3]!,
      write: match[4]!,
    });
  }
  const ppuSource = readFileSync(
    join(mameSource, 'src/devices/video/ppu2c0x.cpp'),
    'utf8',
  );
  const ppuMap = extractFunctionBody(
    ppuSource,
    'void ppu2c0x_device::ppu2c0x(address_map& map)',
  );
  const palette = /map\s*\(\s*(0x[\da-f]+)\s*,\s*(0x[\da-f]+)\s*\)\.rw\s*\(\s*FUNC\([^:()]+::(\w+)\)\s*,\s*FUNC\([^:()]+::(\w+)\)\s*\)/i
    .exec(ppuMap);
  if (!palette || ppuRanges.length === 0) {
    throw new Error('MAME NES PPU address-space wiring could not be recovered');
  }
  ppuRanges.push({
    start: Number(palette[1]),
    end: Number(palette[2]),
    target: 'slot',
    read: palette[3]!,
    write: palette[4]!,
  });
  const delegateMembers: Record<string, string> = {
    scanline: 'm_scanline_callback_proc',
    hblank: 'm_hblank_callback_proc',
    latch: 'm_latch',
  };
  const delegateLinks = [...common.matchAll(
    /m_ppu->set_(scanline|hblank|latch)(?:_callback)?\s*\([\s\S]*?FUNC\s*\([^:()]+::(\w+)\)\s*\)\s*;/g,
  )].map(match => ({
    call: delegateMembers[match[1]!]!,
    targetRole: 'cartridge',
    method: match[2]!,
  }));

  return {
    ciramBytes,
    cartBus: { cpu: 'maincpu', ranges: compactRanges },
    ppuLinks: [
      {
        call: 'space().read_byte',
        targetRole: 'cartridge',
        ranges: ppuRanges.map(range => ({
          start: range.start,
          end: range.end,
          target: range.read.startsWith('palette_') ? 'self' : range.target,
          method: range.read,
        })),
      },
      {
        call: 'space().write_byte',
        targetRole: 'cartridge',
        ranges: ppuRanges.map(range => ({
          start: range.start,
          end: range.end,
          target: range.write.startsWith('palette_') ? 'self' : range.target,
          method: range.write,
        })),
      },
      ...delegateLinks,
    ],
  };
}

function ppuMirroringValues(mameSource: string): Record<string, number> {
  const source = readFileSync(
    join(mameSource, 'src/devices/video/ppu2c0x.h'),
    'utf8',
  );
  return Object.fromEntries(
    [...source.matchAll(/^#define\s+(PPU_MIRROR_\w+)\s+(0x[\da-f]+|\d+)/gmi)]
      .map(match => [match[1]!, Number(match[2])]),
  );
}

function extractFunctionBody(source: string, signature: string): string {
  const signatureAt = source.indexOf(signature);
  if (signatureAt < 0) throw new Error(`MAME source is missing ${signature}`);
  const open = source.indexOf('{', signatureAt + signature.length);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) {
      return source.slice(open + 1, index);
    }
  }
  throw new Error(`MAME source has an unterminated ${signature}`);
}

function numericLiteral(value: string | undefined, description: string): number {
  if (!value || !/^(?:0x[\da-f]+|\d+)$/i.test(value.trim())) {
    throw new Error(`MAME source no longer has a literal ${description}`);
  }
  return Number(value);
}

/** The live-card member is assigned from get_card_device() in device_start. */
function slotCardMember(
  mameSource: string,
  definition: MameHardwareDefinition,
  fallback: string,
): string {
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  return /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(source)?.[1] ?? fallback;
}
