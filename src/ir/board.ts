// Canonical board intermediate representation.
//
// This is the single contract between MAME source lowering and every consumer:
// the browser runtime, the shell, the acceptance harness, generated reports and
// the artifact closure. It is neutral by construction — it names no browser API
// and no compiler internal, and src/ir imports nothing outside src/ir.
//
// Values here are serialized verbatim into each target's generated board.json.

import { BOARD_IR_SCHEMA_VERSION } from './version.ts';
import type { GeneratedAuxiliaryAudioDevice } from './audio-protocol.ts';

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
  kind: 'rom' | 'ram' | 'handler' | 'nop';
  /** handler registry keys, e.g. "galaga_state.bosco_dsw_r" */
  read?: string;
  write?: string;
  /** shared RAM tag; ranges with the same share alias the same bytes */
  share?: string;
  /** The MAME write handler explicitly stores this shared RAM byte itself. */
  writeHandlerOwnsRam?: boolean;
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
  inputLine?: string;
  periodHz?: number;
  periodExpr?: string;
  scanlines?: number[];
  /** TIMER.configure_scanline start and cadence, expanded against screen vtotal. */
  scanlineStart?: number;
  scanlineIncrement?: number;
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
export type CpuLine = 'irq' | 'firq' | 'nmi' | 'reset' | 'halt';

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
  | { kind: 'handler'; handler: string }
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
  /** MAME .set_nop(): the board deliberately leaves this output unconnected. */
  | { kind: 'unconnected' };

export type BoardTransform =
  | { kind: 'invert' }
  | { kind: 'mask'; value: number }
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
  /** Owning board device for a device_add_mconfig child. */
  hostTag?: string;
  member?: string;
  clock?: number;
  /** Source-derived rate for device clock callbacks such as MSM5205 VCK. */
  callbackHz?: number;
  configuration?: { method: string; args: number[] }[];
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

export type GeneratedExpression =
  | { kind: 'number'; value: number }
  | { kind: 'string'; value: string }
  | { kind: 'identifier'; name: string }
  | { kind: 'unary'; operator: string; operand: GeneratedExpression }
  | { kind: 'cast'; valueType: string; operand: GeneratedExpression }
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
  | { kind: 'call'; callee: GeneratedExpression; args: GeneratedExpression[] };

export type GeneratedHandlerOperation =
  | { op: 'declare'; name: string; valueType?: string; value?: GeneratedExpression }
  | { op: 'assign'; target: GeneratedExpression; operator: string; value: GeneratedExpression }
  | { op: 'call'; expression: Extract<GeneratedExpression, { kind: 'call' }> }
  | { op: 'return'; value?: GeneratedExpression }
  | { op: 'break' }
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
      iterate: GeneratedHandlerOperation;
      body: GeneratedHandlerOperation[];
    }
  | {
      op: 'while';
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
  banks?: {
    tag: string;
    member: string;
    region: string;
    /**
     * Byte offset into the region for each bank entry, indexed by MAME entry
     * number. A bank configured by several calls (configure_entries plus a
     * stray configure_entry) is fully described here; unconfigured entries are
     * null, and selecting one is an error just as it is in MAME.
     */
    entryOffsets: (number | null)[];
    source?: BoardSourceRef;
  }[];
  screen: GeneratedScreen;
  customs?: { port: string; mask: number; member: string; handler?: string }[];
  inputMembers?: { member: string; tags: string[] }[];
  frameEvents: GeneratedFrameEvent[];
  screenUpdate?: {
    handler: string;
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
    /** Direct palettes map pen N to color colorOr + N without a lookup PROM. */
    direct?: boolean;
  }[];
  transparentIndirect: number;
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
  };
  flipXMember?: string;
  flipYMember?: string;
  black: number;
  white: number;
  source?: BoardSourceRef;
}

export interface GeneratedVideoPlan {
  gfx: GeneratedGfxEntry[];
  palette?: GeneratedPromPalettePlan;
  palettes?: {
    member: string;
    plan: GeneratedPromPalettePlan;
  }[];
  /** Palette RAM decoded by a MAME set_format converter instead of a PROM. */
  ramPalette?: GeneratedRamPalettePlan;
  tilemaps: GeneratedTilemapPlan[];
  initialState: Record<string, number | number[]>;
  /** MAME may render at a hardware sub-pixel scale (Galaxian uses 3x horizontally). */
  renderScale?: { x: number; y: number };
  /** Driver-init delegate member -> selected MAME method. */
  delegates?: Record<string, string>;
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
  source?: BoardSourceRef;
}

export interface GeneratedSoundBinding {
  kind: string;
  deviceTag: string;
  deviceTags?: string[];
  deviceType: string;
  writeMethods: string[];
  enableMethods: string[];
  controlOffset: number;
  routes?: GeneratedAudioRoute[];
  /** Index rank inferred from MAME handler IR for the routed filter member. */
  filterLayout?: 'flat' | 'matrix';
  auxiliaryDevices?: GeneratedAuxiliaryAudioDevice[];
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
}
