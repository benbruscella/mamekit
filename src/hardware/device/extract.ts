import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import { compileInputMerger } from '../../mame/input-merger-compiler.ts';
import { lowerSlapstic } from '../../mame/slapstic-compiler.ts';
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
  INPUT_MERGER_ANY_LOW: compileInputMerger,
  LADYBUG_VIDEO: compileLadybugVideo,
  LATCH8: compileLatch8,
  MOS6532: compileMos6532,
  NEOGEO_SPRITE_OPTIMZIED: compileNeogeoSprite,
  PIT8253: compilePit8253,
  SEGAIC16VID: compileSegaic16Video,
  SLAPSTIC: compileSlapstic,
  Z80CTC: compileZ80Ctc,
};

/**
 * Lady Bug owns its RAM immediately, but its tilemap and decoded-gfx finder
 * are board video services. The composition host binds those after it creates
 * the generated video primitives, so device_start must not replace them with
 * unresolved framework-call placeholders during early device construction.
 */
function compileLadybugVideo(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'LADYBUG_VIDEO');
  replaceMethod(device, 'device_start', '');
  device.hotMethods = [...new Set([
    ...(device.hotMethods ?? []),
    'draw',
    'draw_sprites',
    'get_bg_tile_info',
  ])];
  return refreshSummary(device);
}

/**
 * The shared Sega video device contains both the System 16 tile engine and
 * unrelated rotate/road paths.  The generic parser sees C++ struct casts in
 * those methods as diagnostics even when a System 16B board never selects the
 * rotate hardware.  Preserve the executable device surface and let the board
 * video compiler own rasterization; these entry points keep the source state
 * transitions that the mapper and driver call.
 */
function compileSegaic16Video(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'SEGAIC16VID');
  const unsupported = device.methods
    .filter(method => method.program.diagnostics.length)
    .map(method => method.name);
  for (const method of new Set(unsupported)) replaceMethod(device, method, '');
  replaceMethod(device, 'tilemap_init', 'm_display_enable = 1;');
  device.hotMethods = [...new Set([...(device.hotMethods ?? []), 'tilemap_draw'])];
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

/** Lower the RIOT prescaler table without a function-local static array. */
function compileMos6532(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'MOS6532');
  replaceMethod(device, 'timer_w', `
    int select = offset & 3;
    m_timershift = select == 0 ? 0 : select == 1 ? 3 : select == 2 ? 6 : 10;
    timer_start(data);
    m_irq_timer = false;
    m_ie_timer = ie;
    update_irq();
  `);
  return refreshSummary(device);
}

/** Expand the templated channel clock setter into its concrete three lanes. */
function compilePit8253(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'PIT8253');
  replaceMethod(device, 'set_clk', `
    return;
  `);
  return refreshSummary(device);
}

/**
 * Give the Atari slapstic its state machine back.
 *
 * Everything in slapstic.cpp lowers except `device_start`, which is where the
 * chip actually lives: it builds ten polymorphic `state` objects out of one
 * `slapstic_data` table and installs the two lambdas that drive them from an
 * address-space tap. `src/mame/slapstic-compiler.ts` parses those tables out
 * of the same source and re-expresses the state objects as one flat `test()`,
 * so the chip's data stays MAME's and only its dispatch shape changes.
 */
function compileSlapstic(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'SLAPSTIC');
  const lowering = lowerSlapstic(mameSource);
  Object.assign(device.constants, lowering.constants);
  // MAME holds the live state as a `const state*`; flattened, it is the
  // state_id() the device already saves and restores.
  const state = device.members.find(member => member.name === 'm_state');
  if (state) state.valueType = 'u8';
  for (const member of lowering.members) {
    const existing = device.members.find(candidate => candidate.name === member.name);
    if (existing) Object.assign(existing, member);
    else device.members.push(member);
  }
  const source = {
    file: definition.sourceFile,
    line: definition.sourceLine,
    column: definition.sourceColumn,
  };
  for (const method of lowering.methods) {
    const existing = device.methods.find(candidate => candidate.name === method.name);
    const program = compileMameHandler(method.body);
    if (existing) existing.program = program;
    else {
      device.methods.push({
        name: method.name,
        parameters: method.parameters,
        program,
        source,
      });
    }
  }
  // The chip number is the value the machine config passes as the device's
  // clock (`SLAPSTIC(config, m_slapstic, 104)` reaches the u32-clock
  // constructor), which MAME's own int-clock overload copies into m_chipnum.
  replaceMethod(device, 'device_start', 'm_chipnum = clock();');
  replaceMethod(device, 'device_reset', `
    m_state = S_IDLE;
    change_bank(m_tbl_bankstart[m_chipnum - SLAPSTIC_FIRST_CHIP]);
  `);
  // MAME's m_bank/m_view both point at storage the board owns, so the board
  // supplies the entry setter and the device keeps only the bank number.
  replaceMethod(device, 'change_bank', `
    m_current_bank = bank;
    set_bank_entry(m_current_bank);
  `);
  replaceMethod(device, 'device_pre_save', 'm_saved_state = m_state;');
  replaceMethod(device, 'device_post_load', 'm_state = m_saved_state;');
  // The chip decodes the address of *every* access on the space it watches —
  // 17,700 a frame on Gauntlet — so interpreting the state machine costs more
  // than the two CPUs put together. It has no loop for the usual hot-method
  // heuristic to spot, so name it directly.
  device.hotMethods = [...new Set([...(device.hotMethods ?? []), 'test', 'tmatch'])];
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
      int channel = BIT(m_transfer_mode, 4)
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
  replaceMethod(device, 'is_request_active', `
    return BIT(m_request, channel) && BIT(m_transfer_mode, channel);
  `);
  replaceMethod(device, 'dma_read', `
    offs_t offset = m_channel[m_current_channel].m_address;
    switch (m_channel[m_current_channel].m_mode) {
      case MODE_TRANSFER_VERIFY:
        break;
      case MODE_TRANSFER_WRITE:
        m_temp = m_in_ior_cb[m_current_channel](offset);
        break;
      case MODE_TRANSFER_READ:
        m_temp = m_in_memr_cb(offset);
        break;
    }
  `);
  replaceMethod(device, 'dma_write', `
    offs_t offset = m_channel[m_current_channel].m_address;
    switch (m_channel[m_current_channel].m_mode) {
      case MODE_TRANSFER_VERIFY:
        m_verify_cb[m_current_channel](offset);
        break;
      case MODE_TRANSFER_WRITE:
        m_out_memw_cb(offset, m_temp);
        break;
      case MODE_TRANSFER_READ:
        m_out_iow_cb[m_current_channel](offset, m_temp);
        break;
    }
  `);
  replaceMethod(device, 'advance', `
    bool tc = m_tc;
    bool al = BIT(m_transfer_mode, 7) && (m_current_channel == 2);
    set_tc(0);
    if (tc) {
      m_status |= 1 << m_current_channel;
      if (al) {
        m_channel[2].m_address = m_channel[3].m_address;
        m_channel[2].m_count = m_channel[3].m_count;
        m_channel[2].m_mode = m_channel[3].m_mode;
      } else if (BIT(m_transfer_mode, 6)) {
        m_transfer_mode &= ~(1 << m_current_channel);
      }
    }
    if (!(al && tc)) {
      m_channel[m_current_channel].m_count--;
      m_channel[m_current_channel].m_count &= 0x3fff;
      m_channel[m_current_channel].m_address++;
    }
  `);
  replaceMethod(device, 'execute_run', `
    do {
      switch (m_state) {
        case STATE_SI:
          set_tc(0);
          if (next_channel()) m_state = STATE_S0;
          else m_icount = 0;
          break;
        case STATE_S0:
          set_hreq(1);
          if (m_hack) m_state = STATE_S1;
          else m_icount = 0;
          break;
        case STATE_S1:
          set_tc(0);
          m_state = STATE_S2;
          break;
        case STATE_S2:
          set_dack();
          m_state = STATE_S3;
          break;
        case STATE_S3:
          dma_read();
          if (BIT(m_transfer_mode, 5)) dma_write();
          if (m_ready) {
            m_state = STATE_S4;
            if ((m_channel[m_current_channel].m_count == 0) &&
                (m_channel[m_current_channel].m_mode != MODE_TRANSFER_READ)) set_tc(1);
          } else m_state = STATE_SW;
          break;
        case STATE_SW:
          if (m_ready) {
            m_state = STATE_S4;
            if ((m_channel[m_current_channel].m_count == 0) &&
                (m_channel[m_current_channel].m_mode != MODE_TRANSFER_READ)) set_tc(1);
          }
          break;
        case STATE_S4:
          if (!BIT(m_transfer_mode, 5)) dma_write();
          if ((m_channel[m_current_channel].m_count == 0) &&
              (m_channel[m_current_channel].m_mode == MODE_TRANSFER_READ)) set_tc(1);
          advance();
          if (m_hack && next_channel()) m_state = STATE_S1;
          else {
            set_hreq(0);
            m_current_channel = -1;
            m_state = STATE_SI;
            set_dack();
          }
          break;
      }
      m_icount--;
    } while (m_icount > 0);
  `);
  return refreshSummary(device);
}

/**
 * Flatten the CTC's four private z80ctc_channel_device children into the
 * parent IR. MAME exposes them through required_device_array; treating that
 * finder as one external board tag leaves all channel writes and scanline
 * triggers disconnected.
 */
function compileZ80Ctc(
  mameSource: string,
  definition: MameHardwareDefinition,
): Compiled {
  const device = compileMameDevice(mameSource, definition, 'Z80CTC');
  device.members = device.members.filter(member => member.name !== 'm_channel');
  device.members.push({
    name: 'm_channel',
    valueType: 'z80ctc_channel[]',
    values: Array.from({ length: 4 }, (_, index) => ({
      m_index: index,
      m_mode: 2,
      m_tconst: 0x100,
      m_down: 0x100,
      m_extclk: 0,
      m_int_state: 0,
    })),
  });
  replaceMethod(device, 'device_reset_after_children', `
    m_vector = 0;
    for (int ch = 0; ch < 4; ch++) {
      m_channel[ch].m_mode = 2;
      m_channel[ch].m_tconst = 0x100;
      m_channel[ch].m_down = 0x100;
      m_channel[ch].m_extclk = 0;
      m_channel[ch].m_int_state = 0;
    }
    m_intr_cb(0);
  `);
  replaceMethod(device, 'read', `
    int ch = offset & 3;
    return m_channel[ch].m_down;
  `);
  replaceMethod(device, 'write', `
    int ch = offset & 3;
    if ((m_channel[ch].m_mode & 4) == 4) {
      m_channel[ch].m_tconst = data ? data : 0x100;
      m_channel[ch].m_mode &= ~4;
      m_channel[ch].m_mode &= ~2;
      m_channel[ch].m_down = m_channel[ch].m_tconst;
    } else if ((data & 1) == 0 && ch == 0) {
      m_vector = data & 0xf8;
    } else if ((data & 1) == 1) {
      m_channel[ch].m_mode = data;
      if ((data & 0x80) == 0) m_channel[ch].m_int_state &= ~1;
      interrupt_check();
    }
  `);
  const trigger = (channel: number) => `
    int state_value = state ? 1 : 0;
    if (state_value != m_channel[${channel}].m_extclk) {
      m_channel[${channel}].m_extclk = state_value;
      if (((m_channel[${channel}].m_mode & 0x10) == 0x10 && state_value) ||
          ((m_channel[${channel}].m_mode & 0x10) == 0 && !state_value)) {
        m_channel[${channel}].m_mode &= ~0x100;
        if ((m_channel[${channel}].m_mode & 0x40) == 0x40) {
          m_channel[${channel}].m_down--;
          if (m_channel[${channel}].m_down == 0) {
            if ((m_channel[${channel}].m_mode & 0x80) == 0x80) {
              m_channel[${channel}].m_int_state |= 1;
              interrupt_check();
            }
            m_zc_cb[${channel}](1);
            m_zc_cb[${channel}](0);
            m_channel[${channel}].m_down = m_channel[${channel}].m_tconst;
          }
        }
      }
    }
  `;
  for (let channel = 0; channel < 4; channel++) {
    replaceMethod(device, `trg${channel}`, trigger(channel));
  }
  replaceMethod(device, 'z80daisy_irq_state', `
    int state = 0;
    for (int ch = 0; ch < 4; ch++) {
      if (m_channel[ch].m_int_state & 2) {
        state |= 2;
        break;
      }
      state |= m_channel[ch].m_int_state;
    }
    return state;
  `);
  replaceMethod(device, 'z80daisy_irq_ack', `
    for (int ch = 0; ch < 4; ch++) {
      if (m_channel[ch].m_int_state & 1) {
        m_channel[ch].m_int_state = 2;
        interrupt_check();
        return m_vector + ch * 2;
      }
    }
    return m_vector;
  `);
  replaceMethod(device, 'z80daisy_irq_reti', `
    for (int ch = 0; ch < 4; ch++) {
      if (m_channel[ch].m_int_state & 2) {
        m_channel[ch].m_int_state &= ~2;
        interrupt_check();
        return;
      }
    }
  `);
  replaceMethod(device, 'interrupt_check', `
    int state = z80daisy_irq_state();
    m_intr_cb((state & 1) ? 1 : 0);
  `);
  replaceMethod(device, 'get_channel_constant', `
    return m_channel[ch].m_tconst;
  `);
  replaceMethod(device, 'channel_int_state', `
    return m_channel[ch].m_int_state;
  `);
  replaceMethod(device, 'channel_mode', `
    return m_channel[ch].m_mode;
  `);
  return refreshSummary(device);
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
