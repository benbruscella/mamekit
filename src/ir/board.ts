// Canonical board intermediate representation.
//
// This is the single contract between MAME source lowering and every consumer:
// the browser runtime, the shell, the acceptance harness, generated reports and
// the artifact closure. It is neutral by construction — it names no browser API
// and no compiler internal, and src/ir imports nothing outside src/ir.
//
// Values here are serialized verbatim into each target's generated board.json.

import { BOARD_IR_SCHEMA_VERSION } from './version.ts';
import type {
  GeneratedAuxiliaryAudioDevice,
  GeneratedBiquadStage,
  GeneratedDacChip,
  GeneratedNesApuPlan,
} from './audio-protocol.ts';

export interface BoardSourceRef {
  file: string;
  line: number;
  column?: number;
}

/** One decoded address range in a CPU address space. */
export interface RangeSpec {
  start: number;
  end: number;
  mirror?: number;
  /** ROM region supplying this range when it differs from the CPU's primary region. */
  region?: string;
  /** Byte offset in the ROM region corresponding to this range's start. */
  romOffset?: number;
  kind: 'rom' | 'ram' | 'handler' | 'nop';
  /** handler registry keys, e.g. "galaga_state.bosco_dsw_r" */
  read?: string;
  write?: string;
  /** shared RAM tag; ranges with the same share alias the same bytes */
  share?: string;
  /**
   * MAME `.bankr()/.bankw()`: the memory bank this range is a window on.
   *
   * A bank is byte-addressed storage, not a device handler. On a 16-bit bus
   * that distinction is the whole meaning of the range: a native 16-bit
   * handler is indexed by word, a bank by byte, and reading a bank through
   * the word adapter returns every other byte.
   */
  bank?: string;
  /**
   * MAME `.umask16(...)`: the data lines this range's handler is wired to.
   * An 8-bit device on a 16-bit bus answers only on its own byte lane, and
   * the byte is shifted down to the handler's width. Absent means the handler
   * spans the full bus width.
   */
  umask?: number;
  /** This memory range does not accept CPU writes. */
  readOnly?: boolean;
  /** This memory range does not return its stored bytes to the CPU. */
  writeOnly?: boolean;
  /** The MAME write handler explicitly stores this shared RAM byte itself. */
  writeHandlerOwnsRam?: boolean;
  /** MAME memory_view entry that conditionally overlays this range. */
  viewTag?: string;
  viewEntry?: number;
}

export interface GeneratedCallback {
  id: string;
  ownerTag: string;
  signal: string;
  slot?: number;
  operation: string;
  targetTag?: string;
  targetClass?: string;
  targetMethod?: string;
  targetPort?: string;
  /**
   * MAME `device_delegate` configuration (`set_pri_callback(FUNC(...))`)
   * rather than a devcb the board dispatches: the owning device calls the
   * delegate itself, so composition binds it to the device instead of
   * lowering it to a board connection.
   */
  delegate?: boolean;
  inputLine?: string;
  /** Constant line state supplied by MAME's set_inputline helper. */
  delivery?: CpuLineDelivery;
  periodHz?: number;
  periodExpr?: string;
  scanlines?: number[];
  /** TIMER.configure_scanline start and cadence, expanded against screen vtotal. */
  scanlineStart?: number;
  scanlineIncrement?: number;
  /**
   * The generated device whose method the callback names, when a device
   * installed the callback on itself instead of the driver declaring it.
   */
  deviceTag?: string;
  /** Skip a source scanline callback when its PROM lookup is electrically zero. */
  promGate?: { member: string; mask: number };
  /** MAME scheduler::perfect_quantum duration requested by an appended devcb. */
  quantumSeconds?: number;
  transforms?: string[];
  source?: BoardSourceRef;
}

// ---------------------------------------------------------------------------
// Typed effects
//
// A GeneratedCallback is a record of what the MAME source said. It carries C++
// method names, and the runtime used to re-read them: a regex recovered
// `irq0_line_hold` and `nmi_line_pulse`, string comparisons recovered
// INPUT_LINE_NMI, `mute_w` and `flip_screen_set`. A name the runtime failed to
// recognise produced no error — the operation was simply never performed.
//
// A BoardEffect is what the board actually does, resolved during generation.
// The runtime executes effects and never parses a MAME name; an effect the
// compiler cannot resolve fails the build instead of disappearing.
// ---------------------------------------------------------------------------

/** CPU interrupt/control pins, named as pins rather than as MAME methods. */
export type CpuLine =
  | 'irq' | 'irq1' | 'irq2' | 'irq3' | 'irq4' | 'irq5' | 'irq6' | 'irq7'
  | 'firq' | 'nmi' | 'reset' | 'halt';

/**
 * How a source drives the pin. MAME's driver_device interrupt generators
 * distinguish these: irqN_line_hold stays asserted until acknowledged,
 * irqN_line_assert leaves the line up, nmi_line_pulse strobes it.
 */
export type CpuLineDelivery = 'hold' | 'assert' | 'pulse' | 'level';

export type BoardEffect =
  /** Drive a CPU interrupt or control pin. */
  | { kind: 'cpu-line'; tag: string; line: CpuLine; delivery: CpuLineDelivery }
  /**
   * Call a method on a device. `ownerClass` names the MAME class that declares
   * it, because a device may be implemented either as an instantiated
   * generated device or — for composite boards such as timeplt_audio — by the
   * generated handler for that class. The runtime picks whichever exists.
   */
  | { kind: 'device-method'; tag: string; method: string; ownerClass?: string }
  /** Execute a generated handler program. */
  | { kind: 'handler'; handler: string; deviceTag?: string }
  /** Read an input port back to the caller (MAME set_ioport). */
  | { kind: 'port-read'; port: string }
  /** Board-level video control lowered from MAME's flip_screen helpers. */
  | { kind: 'video-control'; control: 'flip-screen' | 'flip-screen-x' | 'flip-screen-y' }
  /** Audio control routed to the generated sound backend. */
  | { kind: 'audio-control'; tag: string; control: 'mute' | 'enable'; offset?: number }
  /**
   * Register write to a secondary stream device that the generated worklet
   * mixes (junofrst's R2R DAC). The device is not instantiated by the board,
   * so the write is forwarded to the audio sink by name.
   */
  | { kind: 'audio-write'; tag: string; method: string }
  /**
   * MAME `scheduler::perfect_quantum`: interleave every processor finely for
   * this long. A driver appends it to a devcb when the other side of a latch
   * must be given real time as soon as the latch is written, rather than at
   * the next scheduling boundary.
   */
  | { kind: 'perfect-quantum'; seconds: number }
  /** MAME .set_nop(): the board deliberately leaves this output unconnected. */
  | { kind: 'unconnected' };

export type BoardTransform =
  | { kind: 'invert' }
  | { kind: 'mask'; value: number }
  | { kind: 'bit'; bit: number }
  | { kind: 'rshift'; bits: number }
  | { kind: 'lshift'; bits: number };

/**
 * One resolved connection from a source callback to the effect it performs.
 * `callbackId` keeps the MAME provenance a step away rather than duplicating it.
 */
export interface BoardConnection {
  callbackId: string;
  effect: BoardEffect;
  transforms: BoardTransform[];
  source?: BoardSourceRef;
}

export interface GeneratedDevice {
  id: string;
  tag: string;
  type: string;
  /** C++ class DEFINE_DEVICE_TYPE binds to this device type. */
  className?: string;
  /** That class and its MAME base classes, most derived first. */
  classHierarchy?: string[];
  /** Owning board device for a device_add_mconfig child. */
  hostTag?: string;
  member?: string;
  clock?: number;
  /** Source-derived rate for device clock callbacks such as MSM5205 VCK. */
  callbackHz?: number;
  configuration?: { method: string; args: number[] }[];
  /** Source-declared slot option table/default from the machine config. */
  slotOptions?: string;
  slotDefault?: string;
  source?: BoardSourceRef;
}

export interface GeneratedHandler {
  id: string;
  ownerClass: string;
  method: string;
  parameters?: string;
  body?: string;
  constants?: Record<string, number>;
  program?: GeneratedHandlerProgram;
  source?: BoardSourceRef;
}

/**
 * MAME framework service calls a generated device may reach directly, spelled
 * as the chain its source writes: `screen().vpos()`.
 *
 * These are not device-to-device links -- there is no target device to resolve
 * -- but services the board binds for every device it composes. The emitter
 * and the runtime both read this list, so a chain one side emits and the other
 * never binds cannot exist. Without it a video device's scanline renderer is
 * declined by codegen and runs interpreted: the TMS9928A's `update_line` calls
 * `screen().vpos()` on its first line, which took the ColecoVision to 17 fps.
 */
export const HOST_SERVICE_CALLS: readonly string[] = [
  'screen().vpos',
  'screen().hpos',
  'screen().width',
  'screen().height',
  'screen().frame_number',
  'screen().time_until_pos',
  // MAME guards a register write with this so a debugger peek changes nothing.
  // It sits at the top of the TMS9928A's `read` and `register_write`, and left
  // the whole port path -- every VRAM byte a game writes -- interpreted.
  'machine().side_effects_disabled',
];

export type GeneratedExpression =
  | { kind: 'number'; value: number; floating?: boolean }
  | { kind: 'string'; value: string }
  /**
   * `floating` marks an identifier the source declared `float`/`double`. C++
   * decides `a / b` from the operands' declared types, and the IR otherwise
   * only sees a float when the text has a literal or a cast -- so a resistor
   * network computed entirely through float locals divided as integers.
   */
  | { kind: 'identifier'; name: string; floating?: boolean }
  | { kind: 'unary'; operator: string; operand: GeneratedExpression }
  // `pointer` records that the source cast to a pointer or reference type.
  // `valueType` keeps only the numeric words, so the interpreter narrows
  // exactly as it always has; generated code, which has no value to inspect,
  // uses `pointer` to know the cast is an identity.
  | {
      kind: 'cast';
      valueType: string;
      pointer?: boolean;
      operand: GeneratedExpression;
    }
  | { kind: 'binary'; operator: string; left: GeneratedExpression; right: GeneratedExpression }
  | {
      kind: 'assignment';
      target: GeneratedExpression;
      operator: string;
      value: GeneratedExpression;
      postfix?: boolean;
    }
  | { kind: 'conditional'; condition: GeneratedExpression; whenTrue: GeneratedExpression; whenFalse: GeneratedExpression }
  | { kind: 'member'; object: GeneratedExpression; property: string }
  | { kind: 'index'; object: GeneratedExpression; index: GeneratedExpression }
  | { kind: 'call'; callee: GeneratedExpression; args: GeneratedExpression[] }
  /**
   * A C++ lambda, as a value.
   *
   * MAME installs address-space taps with one -- every Atari 2600 bank-switch
   * cartridge switches its bank from a `install_read_tap(..., [this](offs_t
   * address, u8 &, u8) { ... })`. The capture list carries no value the IR
   * needs: everything a MAME lambda captures is `this`, which the surrounding
   * program already resolves. A parameter the source left unnamed keeps its
   * position with an empty name.
   */
  | {
      kind: 'lambda';
      parameters: string[];
      /**
       * C++ init-captures: `[this, base = &region->as_u8()]` introduces a new
       * name, evaluated once where the lambda is written. Plain captures need
       * nothing recorded -- the body already runs in the enclosing scope.
       */
      captures?: { name: string; value: GeneratedExpression }[];
      body: GeneratedHandlerOperation[];
    };

export type GeneratedHandlerOperation =
  | { op: 'declare'; name: string; valueType?: string; value?: GeneratedExpression }
  | { op: 'assign'; target: GeneratedExpression; operator: string; value: GeneratedExpression }
  | { op: 'call'; expression: Extract<GeneratedExpression, { kind: 'call' }> }
  | { op: 'return'; value?: GeneratedExpression }
  | { op: 'break' }
  | { op: 'continue' }
  | {
      op: 'if';
      condition: GeneratedExpression;
      then: GeneratedHandlerOperation[];
      else?: GeneratedHandlerOperation[];
    }
  | {
      op: 'for';
      initialize: GeneratedHandlerOperation[];
      condition: GeneratedExpression;
      iterate: GeneratedHandlerOperation[];
      body: GeneratedHandlerOperation[];
    }
  | {
      op: 'while';
      condition: GeneratedExpression;
      body: GeneratedHandlerOperation[];
    }
  | {
      op: 'do-while';
      condition: GeneratedExpression;
      body: GeneratedHandlerOperation[];
    }
  | {
      op: 'switch';
      expression: GeneratedExpression;
      cases: {
        values?: GeneratedExpression[];
        body: GeneratedHandlerOperation[];
      }[];
    };

export interface GeneratedHandlerProgram {
  operations: GeneratedHandlerOperation[];
  diagnostics: string[];
}

export interface GeneratedRange {
  id: string;
  start: number;
  end: number;
  raw: string;
  read?: string;
  write?: string;
  props: Record<string, unknown>;
  source?: BoardSourceRef;
}

export interface GeneratedAddressMap {
  id: string;
  className: string;
  name: string;
  ranges: GeneratedRange[];
  source?: BoardSourceRef;
}

export interface GeneratedExecutionCpu {
  tag: string;
  type?: string;
  clock: number;
  /** Effective instruction-cycle clock after a MAME device's internal divider. */
  cycleClock?: number;
  /** Whether a 68000 exposes logical IRQ levels instead of its three physical IPL pins. */
  interruptMixer?: boolean;
  /** Source handler mapped in the CPU's interrupt-acknowledge address space. */
  interruptAcknowledge?: string;
  region: string;
  ranges?: RangeSpec[];
  mask?: number;
  /** Optional AS_OPCODES map/region, distinct from program data reads. */
  opcode?: {
    ranges: RangeSpec[];
    region: string;
    globalMask?: number;
  };
  io?: { ranges: RangeSpec[]; globalMask?: number };
  interruptVectorWriters?: string[];
  source?: BoardSourceRef;
}

export interface GeneratedScreen {
  width: number;
  height: number;
  /** Native MAME visible-area origin within the full raster. */
  xOffset?: number;
  yOffset?: number;
  refresh: number;
  /** The whole raster's width, which is what MAME's `screen().width()` is. */
  htotal?: number;
  vtotal: number;
  vbstart: number;
  vbend?: number;
  /** Rendering cadence requested by MAME screen attributes or update_partial calls. */
  updateMode?: 'frame' | 'scanline' | 'partial';
  rotate: number;
  source?: BoardSourceRef;
}

export interface GeneratedFrameEvent {
  callbackId: string;
  ownerTag: string;
  signal: string;
  line: number;
  state: number;
  /** Periodic callbacks accumulate at this exact rate across scanlines. */
  frequency?: number;
  source?: BoardSourceRef;
}

export interface GeneratedExecutionPlan {
  cpus: GeneratedExecutionCpu[];
  /** Source-defined power-on contents for battery-backed/shared RAM. */
  initialShares?: { share: string; bytes?: number[]; fill?: number }[];
  /** Source member names that alias an address-map memory share. */
  shareBindings?: { share: string; member: string; bits?: 8 | 16 }[];
  /** Driver lifecycle handlers executed in source-derived base-first order. */
  startHandlers?: string[];
  resetHandlers?: string[];
  banks?: {
    tag: string;
    member: string;
    region?: string;
    /** Per-entry ROM region when one hardware bank spans several devices. */
    entryRegions?: (string | null)[];
    /** Driver-owned byte arrays backing entries instead of a ROM region. */
    entryMembers?: (string | null)[];
    /**
     * Byte offset into the region for each bank entry, indexed by MAME entry
     * number. A bank configured by several calls (configure_entries plus a
     * stray configure_entry) is fully described here; unconfigured entries are
     * null, and selecting one is an error just as it is in MAME.
     */
    entryOffsets: (number | null)[];
    dynamicShift?: number;
    /** Entry the driver selects at power on, when it is not the first one. */
    initialEntry?: number;
    source?: BoardSourceRef;
  }[];
  screen: GeneratedScreen;
  /**
   * MAME `machine_config::set_perfect_quantum`: interleave the processors as
   * finely as the schedule can for the whole run, rather than between
   * scheduled events. A board says this when its processors share state
   * through a handshake nothing coarser survives.
   */
  perfectQuantum?: boolean;
  customs?: {
    port: string;
    mask: number;
    member: string;
    handler?: string;
    source?: 'screen-vblank' | 'rtc-tp' | 'rtc-data' | 'device-line';
    /**
     * MAME `PORT_READ_LINE_DEVICE_MEMBER(tag, FUNC(class::method))`: the bit
     * is an output line of another device rather than a switch. The device
     * answers it live, so a board that reads its own latch status through an
     * input port sees the real thing.
     */
    deviceTag?: string;
    activeLow?: boolean;
  }[];
  inputMembers?: { member: string; tags: string[] }[];
  /** Source PORT_CHANGED_MEMBER handlers that latch an asserted input bit. */
  inputLatches?: {
    port: string;
    mask: number;
    activeLow: boolean;
    stateMember: string;
    index: number;
    handler: string;
  }[];
  frameEvents: GeneratedFrameEvent[];
  /**
   * MAME devices that watch every access on another device's address space.
   *
   * `install_readwrite_tap` is how a protection chip sees the access pattern
   * it decodes; the Atari slapstic changes its ROM bank purely from the
   * sequence of addresses the 68000 touches, and nothing it does is visible
   * in an address map. The window the machine config hands the device with
   * `set_range` is carried here with the bank it drives.
   */
  accessTaps?: {
    /** CPU whose address space is watched. */
    cpu: string;
    space: 'program';
    /** Device tag receiving the tap. */
    device: string;
    /** Device method invoked with the accessed offset. */
    method: string;
    start: number;
    end: number;
    mirror: number;
    /** Memory bank the device selects, when the source declares one. */
    bank?: string;
    source?: BoardSourceRef;
  }[];
  screenUpdate?: {
    handler: string;
    /**
     * The generated device that owns the update, when a video-display
     * processor installed it on itself rather than the driver naming a
     * method of its own state class. MAME's TMS9928A does exactly this in
     * `device_config_complete()`, so coleco.cpp declares no screen update at
     * all and the picture is the device's to draw.
     */
    deviceTag?: string;
    source?: BoardSourceRef;
  };
}

export interface GeneratedGfxLayout {
  width: number;
  height: number;
  total: number | string;
  planes: number;
  planeOffsets: (number | string)[];
  xOffsets: (number | string)[];
  yOffsets: (number | string)[];
  charIncrement: number;
}

export interface GeneratedGfxEntry {
  region: string;
  offset: number;
  /** Decode from the live `m_<region>` share instead of immutable ROM. */
  ram?: boolean;
  /** MAME gfxdecode device member owning this entry. */
  decodeMember?: string;
  /** MAME palette device member used by this decode entry. */
  paletteMember?: string;
  colorBase: number;
  colorCount: number;
  xscale: number;
  yscale: number;
  layout: GeneratedGfxLayout;
}

export interface GeneratedPromPalettePlan {
  /**
   * A source-defined palette that switches multiple PROM-backed resistor
   * networks at runtime.  TNX1 hardware exposes background/text and sprite
   * PROMs through one palette_device and selects their banks from DMA state.
   */
  dynamic?: {
    kind: 'tnx1-banked';
    colorRegion: string;
    spriteRegion: string;
  };
  region: string;
  /** Lookup PROM when it is separate from the RGB PROM. */
  lookupRegion?: string;
  colorCount: number;
  min: number;
  max: number;
  scaler: number;
  channels: {
    channel: 'r' | 'g' | 'b';
    bits: number[];
    /** Byte offset from the palette index for each source bit. */
    offsets?: number[];
    /** MAME-declared contribution for each bit when the source uses fixed weights. */
    weights?: number[];
    resistances: number[];
    pulldown: number;
    pullup: number;
  }[];
  /** Exact MAME res_net electrical model when the source declares one. */
  resNet?: {
    input: 'ttl';
    monitor: 'sanyo';
    amplifiers: ('darlington' | 'emitter' | 'none')[];
  };
  /** palette_t::normalize_range applied after PROM decoding/overrides. */
  normalize?: { start: number; end: number; lumMin: number; lumMax: number };
  /** Destination pen -> decoded PROM color permutation applied by the driver. */
  colorIndexMap?: number[];
  /**
   * PROM indices overridden to electrical black after resistor decoding.
   * Some boards tri-state their palette outputs for a masked subset of
   * colors (for example the Donkey Kong background).
   */
  forceBlack?: { mask: number; value: number };
  /**
   * Indirect-color sections computed from the color INDEX bits rather than a
   * PROM (e.g. the 05xx starfield palette): each channel's bits select bits
   * of the index and feed a resistor network of its own.
   */
  computedColors?: {
    base: number;
    count: number;
    min: number;
    max: number;
    scaler: number;
    channels: {
      channel: 'r' | 'g' | 'b';
      bits: number[];
      resistances: number[];
      pulldown: number;
      pullup: number;
    }[];
  }[];
  /**
   * Indirect-color sections computed entirely from the palette index with
   * fixed MAME helpers/expressions (for example pal1bit and conditional
   * resistor pulls). Values are packed in the runtime's native RGBA word
   * order and do not depend on a PROM byte.
   */
  indexedColors?: {
    base: number;
    colors: number[];
  }[];
  /**
   * Additional indirect-color sections read from a different range of the
   * same PROM with their own fixed bit weights.
   */
  promColors?: {
    base: number;
    count: number;
    channels: GeneratedPromPalettePlan['channels'];
  }[];
  lookupOffset: number;
  lookupCount: number;
  lookupMask: number;
  banks: {
    penOffset: number;
    /** Distance between destination pens written by successive loop iterations. */
    penStride?: number;
    colorOr: number;
    /** Distance between direct indirect-color values; defaults to one. */
    colorStride?: number;
    lookupOffset?: number;
    lookupCount?: number;
    /**
     * Source PROM terms combined to form one indirect color. This preserves
     * boards whose lookup value spans several PROM addresses or regions.
     */
    lookupTerms?: {
      region: string;
      offset: number;
      mask: number;
      shift: number;
    }[];
    /**
     * A lookup PROM value that maps to a fixed indirect color instead of the
     * bank's normal colorOr mapping.  Pole Position's PROMs use value 15 as a
     * shared transparent color across otherwise distinct palette banks.
     */
    lookupValueOverride?: number;
    overrideColor?: number;
    /** Direct palettes map pen N to color colorOr + N without a lookup PROM. */
    direct?: boolean;
  }[];
  transparentIndirect: number;
  source?: BoardSourceRef;
}

/**
 * A palette init callback MAME wrote as ordinary code rather than as one of the
 * resistor-network idioms the declarative plan above recognizes. Mr. Do! builds
 * its own 16-entry weight table from parallel resistances and a diode drop, so
 * there is no compute_resistor_weights call to read the network out of.
 *
 * The callback is lowered to handler IR and executed once at machine start
 * against the same palette_device operations MAME's callback calls. It is the
 * fallback, not the preferred form: a declarative plan stays inspectable data,
 * while this preserves behavior no fixed vocabulary covers.
 */
export interface GeneratedProgramPalettePlan {
  /** palette_device pen count from the machine configuration. */
  entries: number;
  /** indirect_entries, or 0 when the device colors its pens directly. */
  indirectEntries: number;
  /** Callback parameter naming the palette_device (`palette_device &palette`). */
  deviceParameter: string;
  program: GeneratedHandlerProgram;
  constants?: Record<string, number>;
  source?: BoardSourceRef;
}

/**
 * MAME palette_device configured by set_format over CPU-writable palette RAM
 * (no color PROM). The channel decode comes from the emupal.cpp overload the
 * driver names, and the share tags follow palette_device::device_start, which
 * binds memshare(tag()) plus an optional tag()+"_ext" high-byte share.
 */
export interface GeneratedRamPalettePlan {
  /** palette_device tag; also the base memory share name. */
  tag: string;
  /** Byte order selected by palette_device::set_endianness; defaults to little. */
  endianness?: 'little' | 'big';
  /** High-byte share tag when MAME splits palette RAM across two shares. */
  extShare?: string;
  entries: number;
  /** raw_to_rgb_converter bytes per entry, before any base/ext split. */
  bytesPerEntry: number;
  /** MAME standard_rgb_decoder template arguments, per channel. */
  channels: {
    channel: 'r' | 'g' | 'b';
    bits: number;
    shift: number;
  }[];
  /** Optional intensity field used by MAME's standard_irgb_decoder. */
  intensity?: { bits: number; shift: number };
  /** Fixed pens established by a palette init callback alongside writable RAM. */
  initialColors?: { pen: number; color: number }[];
  /** inverted_rgb_decoder complements the raw value before expansion. */
  inverted?: boolean;
  /**
   * Reset-time palette RAM writes made explicitly by the driver. Some boards
   * power up with undefined palette RAM and MAME supplies a visible POST
   * pattern in machine_reset().
   */
  resetWrites?: {
    offset: number;
    data: number;
    ext?: boolean;
  }[];
  /** Driver reset method that supplied resetWrites. */
  resetSource?: BoardSourceRef;
  source?: BoardSourceRef;
}

export interface GeneratedTilemapPlan {
  member: string;
  /** Source memory exposed through tilemap.user_data(). */
  userDataMember?: string;
  userDataOffset?: number;
  userDataBytes?: number;
  /** MAME gfxdecode member passed to tilemap::create. */
  decodeMember?: string;
  tileWidth: number;
  tileHeight: number;
  columns: number;
  rows: number;
  mapper: string;
  tileInfo: string;
  scrollColumns?: number;
  scrollRows?: number;
  /** MAME tilemap origin offsets for normal and flipped rendering. */
  scrollDx?: [number, number];
  scrollDy?: [number, number];
  transparentPen?: number;
  transparentIndirect?: number;
  /** Per-tile group pen masks declared through MAME tilemap_t::set_transmask. */
  transmasks?: {
    group: number;
    foreground: number;
    background: number;
  }[];
  source?: BoardSourceRef;
}

export interface GeneratedBitmapPlan {
  member: string;
  rowStart: number;
  rows: number;
  bytesPerRow: number;
  xOffset: number;
  lsbFirst: boolean;
  /** Packed source pixels; omitted for the original one-bit framebuffer plan. */
  bitsPerPixel?: number;
  /** Source-derived palette RAM network used by packed bitmap hardware. */
  paletteRam?: {
    member: string;
    entries: number;
    min: number;
    max: number;
    scaler: number;
    channels: {
      channel: 'r' | 'g' | 'b';
      bits: number[];
      resistances: number[];
      pulldown: number;
      pullup: number;
    }[];
    /** Direct source table used by palette formats such as Qix R2G2B2I2. */
    lookup?: {
      values: number[];
      intensityShift: number;
      intensityMask: number;
      channels: {
        channel: 'r' | 'g' | 'b';
        valueShift: number;
        valueMask: number;
        valueTableShift: number;
      }[];
    };
  };
  /** Bank selecting a consecutive palette page (one page per source value). */
  paletteBankMember?: string;
  flipXMember?: string;
  flipYMember?: string;
  black: number;
  white: number;
  source?: BoardSourceRef;
}

/**
 * One `sprite_parameter` from an `atari_motion_objects_config` entry: which
 * of the four words of a sprite-RAM entry carries the field, how far it is
 * shifted down, and the mask that remains after the shift. This is exactly
 * what `sprite_parameter::set` derives from the driver's mask words.
 */
export interface GeneratedSpriteParameter {
  word: number;
  shift: number;
  mask: number;
}

/**
 * MAME `atari_motion_objects_device` configured by one driver.
 *
 * The device is generic and the configuration is the hardware description, so
 * everything here is lowered from the driver's `atari_motion_objects_config`
 * aggregate and from `atarimo.h`'s own derivations of it.
 */
export interface GeneratedMotionObjectsPlan {
  /** Device tag. */
  tag: string;
  /** Index into the machine's gfx sets. */
  gfxIndex: number;
  bankCount: number;
  /** Entries chain through the link field rather than running in order. */
  linked: boolean;
  /** The four words of an entry are strided across sprite RAM, not adjacent. */
  split: boolean;
  reverse: boolean;
  swapXy: boolean;
  nextNeighbor: boolean;
  /** Pixels per SLIP entry; zero for a board with no SLIP RAM. */
  slipHeight: number;
  slipShift: number;
  slipOffset: number;
  maxPerLine: number;
  paletteBase: number;
  transparentPen: number;
  specialValue: number;
  /** Derived in device_start from the link/xpos/ypos masks. */
  entryCount: number;
  entryBits: number;
  bitmapWidth: number;
  bitmapHeight: number;
  /** Memory shares holding sprite RAM and, when present, SLIP RAM. */
  spriteShare: string;
  slipShare?: string;
  /** Whole-table XOR the driver's video_start applies to the code lookup. */
  codeXor?: number;
  link: GeneratedSpriteParameter;
  code: GeneratedSpriteParameter;
  color: GeneratedSpriteParameter;
  xpos: GeneratedSpriteParameter;
  ypos: GeneratedSpriteParameter;
  width: GeneratedSpriteParameter;
  height: GeneratedSpriteParameter;
  hflip: GeneratedSpriteParameter;
  vflip: GeneratedSpriteParameter;
  priority: GeneratedSpriteParameter;
  neighbor: GeneratedSpriteParameter;
  absolute: GeneratedSpriteParameter;
  special: GeneratedSpriteParameter;
  source?: BoardSourceRef;
}

export interface GeneratedVideoPlan {
  /**
   * Rendering cadence required by the lowered video implementation. This is
   * source-derived when a screen update delegates to scanline-buffered sprite
   * hardware even if the machine configuration itself has no scanline flag.
   */
  updateMode?: 'scanline' | 'partial';
  gfx: GeneratedGfxEntry[];
  /**
   * MAME required/optional_region_ptr member -> ROM region tag. The C++ member
   * name is not always derivable from the tag (for example,
   * m_sprite_height_prom binds "spr_height_prom").
   */
  regionBindings?: Record<string, string>;
  /** Byte offset applied to a region pointer assigned inside a source callback. */
  regionBindingOffsets?: Record<string, number>;
  palette?: GeneratedPromPalettePlan;
  palettes?: {
    member: string;
    plan: GeneratedPromPalettePlan;
  }[];
  /** Executed palette init callback, when no declarative palette shape fits. */
  paletteProgram?: GeneratedProgramPalettePlan;
  /** Palette RAM decoded by a MAME set_format converter instead of a PROM. */
  ramPalette?: GeneratedRamPalettePlan;
  tilemaps: GeneratedTilemapPlan[];
  /** MAME `ATARI_MOTION_OBJECTS` sprite engine, configured by the driver. */
  motionObjects?: GeneratedMotionObjectsPlan;
  initialState: Record<string, unknown>;
  /** MAME may render at a hardware sub-pixel scale (Galaxian uses 3x horizontally). */
  renderScale?: { x: number; y: number };
  /** Driver-init delegate member -> selected MAME method, or null when explicitly cleared. */
  delegates?: Record<string, string | null>;
  /** Small source-derived color arrays used by generated video handlers. */
  colorTables?: Record<string, number[]>;
  /** Source-derived LFSR table initialized once and consumed by generated handlers. */
  lfsrTable?: {
    member: string;
    period: number;
    enabledMask: number;
    enabledValue: number;
    colorMask: number;
    colorShift: number;
    feedbackTap: number;
    feedbackInvertTap: number;
    feedbackWidth: number;
    rowRenderer?: {
      method: string;
      colorMember: string;
      scaleMember: string;
    };
  };
  bitmap?: GeneratedBitmapPlan;
  /**
   * Nibble-packed background RAM addressing, lowered from draw_background.
   * The Popeye board revisions each wire the row/column counters to different
   * RAM address and nibble-select pins, so the numbers cannot be assumed.
   */
  bankedBackground?: {
    /** BIT(row, rowShift, 6) picks the background RAM row. */
    rowShift: number;
    /** BIT(column, columnShift, 6) picks the background RAM column. */
    columnShift: number;
    /** Which counter drives the high/low nibble select, and from which bit. */
    nibble: { source: 'row' | 'column'; bit: number };
    /** Revisions that feed background scroll bit 8 into the column counter. */
    columnHighFromScroll: boolean;
  };
  /** Atari Digital Vector Generator display list executed from the CPU bus. */
  vector?: {
    type: 'DVG';
    memoryBase: number;
    coordinateBits: number;
    doneInput?: {
      port: string;
      mask: number;
      activeLow: boolean;
    };
  };
  source?: BoardSourceRef;
}

export interface GeneratedSoundBinding {
  kind: string;
  deviceTag: string;
  deviceTags?: string[];
  deviceType: string;
  /** MAME device type per chip index, when a bank mixes several chips. */
  deviceTypes?: string[];
  /** Resolution, coding and gain of each DAC, lowered from MAME source. */
  dacs?: GeneratedDacChip[];
  writeMethods: string[];
  enableMethods: string[];
  controlOffset: number;
  /** Symbolic discrete-node constants normalized to worklet input offsets. */
  writeOffsets?: Record<string, number>;
  routes?: GeneratedAudioRoute[];
  /** Index rank inferred from MAME handler IR for the routed filter member. */
  filterLayout?: 'flat' | 'matrix';
  auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
  /** RP2A03 internal APU plan, present only for the NES sound capability. */
  nesApu?: GeneratedNesApuPlan;
  /** FILTER_BIQUAD stages MAME places between this core and its board output. */
  filterChain?: GeneratedBiquadStage[];
}

export interface GeneratedAudioRoute {
  chip: number;
  channel: number;
  gain: number;
  target: string;
  targetInput?: number;
  filter?: { index: number; bank: number; channel: number };
}

export interface BoardIr {
  schemaVersion: typeof BOARD_IR_SCHEMA_VERSION;
  game: string;
  family: string;
  driverFile: string;
  /** What the MAME source declared, with its spans — the provenance record. */
  callbacks: GeneratedCallback[];
  /** What the board does, resolved at generation time — the executable model. */
  connections: BoardConnection[];
  execution: GeneratedExecutionPlan;
  devices?: GeneratedDevice[];
  handlers?: GeneratedHandler[];
  maps?: GeneratedAddressMap[];
  video?: GeneratedVideoPlan;
  sound?: GeneratedSoundBinding;
  /**
   * Direct JavaScript for handlers whose IR shape shows nested hot loops,
   * attached by the generated board module at load time.
   *
   * Behaviour, so it lives in the generated module rather than board.json, and
   * it is never serialised: `decodeBoardIr` reads the JSON, and this is set on
   * the decoded board afterwards. A handler absent here stays on the
   * interpreter, which remains the semantic reference for all of them.
   */
  compiledHandlers?: Record<string, GeneratedCompiledHandler>;
}

/**
 * What emitted handler code is given in place of the interpreter's execution
 * context: the board's own state, its late-bound host calls, and a way to reach
 * handlers the emitter did not compile.
 */
export interface GeneratedHandlerRuntime {
  readonly members: Record<string, unknown>;
  readonly calls: Record<string, (...args: any[]) => unknown>;
  readonly palette: number[];
  readIndex(value: unknown, index: number): unknown;
  writeIndex(value: unknown, index: number, next: unknown): unknown;
  addressOf(value: unknown, index: number): {
    generatedPointer: true;
    source: ArrayLike<number> & { [index: number]: number };
    offset: number;
  };
  /** C++ `*value`, resolved by the operand's shape rather than assumed. */
  dereference(value: unknown): unknown;
  invoke(name: string, ...args: unknown[]): unknown;
  /** Context-free MAME framework macros, identical to the interpreter's. */
  macro(name: string, ...args: unknown[]): unknown;
  /** MAME COMBINE_DATA against an emitted pointer. */
  combineData(pointer: unknown, data: unknown, memMask: unknown): unknown;
  /** C++ `/`: integral between integers, exact otherwise. */
  divide(left: unknown, right: unknown): number;
  /** C++ `==`/`!=` where an operand can be a pointer, not a number. */
  same(left: unknown, right: unknown): boolean;
  /** C++ `&=`: rectangle intersection when the target is one, else bitwise. */
  andAssign(current: unknown, value: unknown): unknown;
  /** A member read the state object has no entry for, as the interpreter resolves it. */
  member(name: string): unknown;
  /**
   * The board package's own reference-call overrides — the base dictionary the
   * interpreter consults before anything else (a video package's
   * shape-recognised fast paths live here). Emitted board handlers check it
   * before calling a sibling compiled method directly, so a runtime override
   * keeps its interpreter precedence.
   */
  readonly overrides: Record<string, (...args: any[]) => unknown>;
}

export type GeneratedCompiledHandler = (
  runtime: GeneratedHandlerRuntime,
  ...args: unknown[]
) => unknown;
