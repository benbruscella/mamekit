import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from '../../mame/ast.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
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
  UPD7759: compileUpd7759,
  NEOGEO_SPRITE_OPTIMZIED: compileNeogeoSprite,
};

/**
 * The browser audio worklet renders the uPD7759 stream, while the generated
 * device owns its source-declared control surface and state. The one method
 * that cannot lower is MAME's sound_stream reference wrapper; keeping it as
 * an executable no-op leaves PCM generation with the worklet and permits the
 * complete inherited device hierarchy to be emitted without diagnostics.
 */
export function compileUpd7759(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'UPD7759');
  replaceMethod(device, 'sound_stream_update', '');
  return refreshSummary(device);
}

/** Lower the standard Neo Geo fixed layer without the two later-game banking
 * lookup tables. Metal Slug uses FIX_BANKTYPE_STD; sprite drawing itself stays
 * the source-compiled neosprite implementation. */
function compileNeogeoSprite(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'NEOGEO_SPRITE_OPTIMZIED');
  const runtimeMembers: [string, string][] = [
    ['m_auto_animation_counter', 'u8'],
    ['m_auto_animation_disabled', 'bool'],
    ['m_fixed_layer_source', 'u8'],
    ['m_region_fixed', 'u8*'],
    ['m_region_fixedbios', 'memory_region*'],
    ['m_region_fixed_size', 'u32'],
    ['m_region_sprites', 'u8*'],
    ['m_sprite_gfx_address_mask', 'u32'],
    ['m_videoram_drawsource', 'u16*'],
    ['m_pens', 'pen_t*'],
  ];
  for (const [name, valueType] of runtimeMembers) {
    if (!device.members.some(member => member.name === name)) {
      device.members.push({ name, valueType });
    }
  }
  replaceMethod(device, 'draw_fixed_layer', `
    u8* gfx_base = m_fixed_layer_source ? m_region_fixed : m_region_fixedbios->base();
    u32 addr_mask = (m_fixed_layer_source ? m_region_fixed_size : m_region_fixedbios->bytes()) - 1;
    u16* video_data = &m_videoram_drawsource[0x7000 | (scanline >> 3)];
    u32* pixel_addr = &bitmap.pix(scanline, NEOGEO_HBEND);
    for (int x = 0; x < 40; x++) {
      u16 code_and_palette = *video_data;
      u16 code = code_and_palette & 0x0fff;
      int gfx_offset = ((code << 5) | (scanline & 0x07)) & addr_mask;
      pen_t* char_pens = &m_pens[(code_and_palette >> 12) << m_bppshift];
      draw_fixed_layer_2pixels(pixel_addr, gfx_offset + 0x10, gfx_base, char_pens);
      draw_fixed_layer_2pixels(pixel_addr, gfx_offset + 0x18, gfx_base, char_pens);
      draw_fixed_layer_2pixels(pixel_addr, gfx_offset + 0x00, gfx_base, char_pens);
      draw_fixed_layer_2pixels(pixel_addr, gfx_offset + 0x08, gfx_base, char_pens);
      video_data = video_data + 0x20;
    }
  `);
  // Keep the optimized device's board-visible behavior while drawing from the
  // raw sprite ROM. This is the reference implementation in the same MAME
  // source and avoids requiring the host to manufacture MAME's private cache.
  replaceMethod(device, 'draw_pixel', `
    u8* src = m_region_sprites + (((romaddr & ~0xff) >> 1) | (((romaddr & 0x8) ^ 0x8) << 3) | ((romaddr & 0xf0) >> 2));
    int x = romaddr & 0x7;
    u8 gfx = (BIT(src[0x3], x) << 3) |
      (BIT(src[0x1], x) << 2) |
      (BIT(src[0x2], x) << 1) |
      BIT(src[0x0], x);
    if (gfx) *dst = line_pens[gfx];
  `);
  replaceMethod(device, 'device_reset', `
    start_sprite_line_timer();
    start_auto_animation_timer();
  `);
  // draw_fixed_layer is repaired above after the generic compiler selected
  // hot methods, so include it explicitly alongside the sprite scanline path.
  device.hotMethods = [...new Set([
    ...(device.hotMethods ?? []),
    'draw_fixed_layer',
    'draw_sprites',
  ])];
  return refreshSummary(device);
}

function replaceMethod(device: Compiled, name: string, body: string): void {
  const methods = device.methods.filter(candidate => candidate.name === name);
  if (!methods.length) throw new Error(`${device.type}: source method ${name} is missing`);
  for (const method of methods) method.program = compileMameHandler(body);
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

export function extractDevices(input: CapabilityInput): CapabilityExtraction | undefined {
  const compiled = new Map<string, Compiled>();
  for (const type of DEVICE_MAME_TYPES) {
    const entry = input.entries.find(candidate => candidate.type === type);
    if (!entry) continue;
    if (!entry.definition) continue;
    const definition = entry.definition as MameHardwareDefinition;
    const device = SPECIALIZED[type]
      ? SPECIALIZED[type](input.mameSource, definition)
      : compileMameDevice(input.mameSource, definition, type, new Set(), {
        configuration: entry.uses?.flatMap(use => use.configuration ?? []),
        references: entry.uses?.flatMap(use => use.references ?? []),
      });
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
