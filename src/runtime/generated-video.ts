import type { VideoRenderer } from './types.ts';
import type { Regions, VideoRenderer as Renderer } from './types.ts';
import type { BoardIr, GeneratedGfxEntry, GeneratedGfxLayout, GeneratedHandler, GeneratedPromPalettePlan, GeneratedRamPalettePlan, GeneratedTilemapPlan } from '../ir/board.ts';
import { TILEMAP_SET_FLIP_ALL } from '../ir/board.ts';
import {
  executeGeneratedCallbackHandler,
  executeGeneratedMachineHandler,
  generatedElement,
  executeGeneratedMachineProgram,
  type GeneratedHandlerBindings,
} from './generated-handler.ts';
import { GeneratedRectangle } from './rectangle.ts';
import { decodeGfx, redecodeGfxElement, type GfxSet } from './gfx.ts';

/**
 * The screen update of a generated video device, called with MAME's own
 * `screen_update(screen, bitmap, cliprect)` arguments. Returns the method's
 * result, or undefined when the device could not run it.
 */
export type DeviceScreenUpdate = (
  screen: { visible_area(): GeneratedRectangle },
  bitmap: BitmapTarget,
  cliprect: GeneratedRectangle,
) => number | undefined;

export interface GeneratedVideoPrimitives extends VideoRenderer {
  /** MAME `screen_device::frame_number()`, counted at each vblank end. */
  screenFrameNumber?(): number;
  generatedVideoBindings(frame: Uint32Array): GeneratedHandlerBindings;
  generatedVideoArgs?(frame: Uint32Array): Record<string, unknown>;
  /** Execute a source-matched hot screen-update shape without IR tree walking. */
  directScreenUpdate?(
    handler: string,
    screen: { visible_area(): GeneratedRectangle },
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
  ): boolean;
  /** Resolve composed pen indices from the pen buffer into the RGBA frame. */
  resolveScreenPens?(pens: Uint32Array, frame: Uint32Array, start: number, count: number): void;
  /**
   * MAME's one screen priority bitmap. A driver reaches it as both
   * `m_screen->priority()` and `screen.priority()` inside the same update, so
   * both must hand back the same buffer.
   */
  screenPriority?(): GeneratedPriorityBitmap;
  /** The palette's shadow and highlight groups, when the configuration enables them. */
  paletteShadows?(): GeneratedPaletteShadows | undefined;
  /** Route a MAME palette_device RAM write when the plan declares one. */
  writePaletteRam?(offset: number, data: number, ext?: boolean): void;
  /** Reapply driver-declared reset-time video state. */
  reset?(): void;
}

/**
 * MAME screen-update methods declare their bitmap type: bitmap_ind16 screens
 * compose palette pen indices that the screen resolves on output, while
 * bitmap_rgb32 screens write final colors.
 */
export function isIndexedScreen(machine: BoardIr): boolean {
  // A device's update has no driver handler to read the signature from, so
  // the compiler records the answer instead. Without it the Game Boy's PPU
  // wrote pen numbers 0..3 straight into the framebuffer as colours, and every
  // pixel came out transparent black.
  if (machine.execution.screenUpdate?.indexed) return true;
  const target = machine.execution.screenUpdate?.handler;
  if (!target) return false;
  const handler = machine.handlers?.find(candidate =>
    `${candidate.ownerClass}.${candidate.method}` === target);
  return /\bbitmap_ind16\b/.test(handler?.parameters ?? '');
}

export interface ExidySpriteState {
  code: number;
  x: number;
  y: number;
  enabled?: boolean;
}

export interface ExidySpriteCollision {
  /** First argument passed by MAME to screen_device::time_until_pos. */
  position: number;
  mask: number;
}



/**
 * Compose reusable renderer primitives by executing the screen-update method
 * compiled from the selected MAME driver.
 */
export class GeneratedVideoRenderer implements VideoRenderer {
  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['penBuffer', 'partialNextY', 'partialHpos'];
  }

  readonly width: number;
  readonly height: number;

  private readonly machine: BoardIr;
  private readonly primitives: GeneratedVideoPrimitives;
  private readonly screenUpdate: NonNullable<BoardIr['callbacks']>[number];
  /**
   * Set when a video-display processor draws the picture itself. The device is
   * generated from its own MAME source, so the update is one of its methods
   * rather than a driver handler the board can execute.
   */
  private readonly deviceScreenUpdate?: DeviceScreenUpdate;
  private readonly indexed: boolean;
  /**
   * bitmap_ind16 machines compose pen indices here, persisting across frames
   * so dirty-tile caching stays valid in pen space; each render resolves the
   * region into the RGBA output frame.
   */
  private readonly penBuffer?: Uint32Array;
  private partialNextY: number;
  /** The first line a frame-mode board's update_now() has not yet rendered this frame. */
  private nowNextY: number;
  /**
   * MAME's `m_partial_scan_hpos`: how far along line `partialNextY` an
   * `update_now()` has drawn. A Spectrum border write lands mid-line, and
   * the rest of that line is drawn with the next colour.
   */
  private partialHpos = 0;

  constructor(
    machine: BoardIr,
    primitives: GeneratedVideoPrimitives,
    deviceScreenUpdate?: DeviceScreenUpdate,
  ) {
    const screenUpdate = machine.callbacks.find(callback =>
      callback.signal === 'set_screen_update');
    if (!screenUpdate) {
      throw new Error(`generated machine "${machine.game}" has no screen-update callback`);
    }
    if (machine.execution.screenUpdate?.deviceTag && !deviceScreenUpdate) {
      throw new Error(
        `generated machine "${machine.game}": screen update belongs to device ` +
        `"${machine.execution.screenUpdate.deviceTag}", which the board did not supply`,
      );
    }
    this.machine = machine;
    this.primitives = primitives;
    this.screenUpdate = screenUpdate;
    this.deviceScreenUpdate = deviceScreenUpdate;
    this.indexed = isIndexedScreen(machine);
    this.width = primitives.width;
    this.height = primitives.height;
    this.partialNextY = machine.execution.screen.yOffset ?? 0;
    this.nowNextY = this.partialNextY;
    if (this.indexed) this.penBuffer = new Uint32Array(this.width * this.height);
  }

  vblank(): void {
    this.primitives.vblank();
  }

  vblankEnd(): void {
    this.primitives.vblankEnd?.();
  }

  render(frame: Uint32Array): void {
    if (this.machine.video?.bitmap) {
      this.primitives.render(frame);
      return;
    }
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    if (this.machine.execution.screen.updateMode === 'partial') {
      const finalY = yOffset + this.height - 1;
      this.finishPartialLine(frame);
      if (this.partialNextY <= finalY) {
        this.renderRegion(frame, this.partialNextY, finalY);
      }
      this.partialNextY = yOffset;
      this.partialHpos = 0;
      return;
    }
    this.renderRegion(frame, yOffset, yOffset + this.height - 1);
    this.nowNextY = yOffset;
  }

  /**
   * A device's `screen().update_now()`: the picture brought up to the beam
   * whatever the board's update mode, as MAME's screen bitmap is, so a light
   * gun's sensor reads this frame above the beam and the last one below it.
   * On a board that composes once a frame the full render at its end still
   * draws every line, so what is presented does not change.
   */
  updateNow(frame: Uint32Array, vpos: number, hpos: number): void {
    if (this.machine.video?.bitmap) return;
    if (this.machine.execution.screen.updateMode === 'partial') {
      this.updatePartialAt(frame, vpos, hpos);
      return;
    }
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    const through = Math.min(Math.floor(vpos) - 1, yOffset + this.height - 1);
    if (through < this.nowNextY) return;
    this.renderRegion(frame, this.nowNextY, through);
    this.nowNextY = through + 1;
  }

  updatePartial(frame: Uint32Array, line: number): void {
    // Framebuffer plans render directly from live RAM at frame end. Their
    // configured device screen-update callback is intentionally not a driver
    // handler, so partial-update notifications are bookkeeping only.
    if (this.machine.video?.bitmap) return;
    if (this.machine.execution.screen.updateMode !== 'partial') return;
    // MAME finishes a line an update_now() left half drawn first.
    if (Math.floor(line) >= this.partialNextY) this.finishPartialLine(frame);
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    const finalY = yOffset + this.height - 1;
    const updateThrough = Math.min(Math.floor(line), finalY);
    if (updateThrough < this.partialNextY) return;
    this.renderRegion(frame, this.partialNextY, updateThrough);
    this.partialNextY = updateThrough + 1;
  }

  /**
   * MAME's `update_partial(vpos, hpos)`, which `update_now()` calls with the
   * beam: everything from where the last update stopped up to, but not
   * including, pixel `hpos` of line `vpos`.
   */
  updatePartialAt(frame: Uint32Array, vpos: number, hpos: number): void {
    if (this.machine.video?.bitmap) return;
    if (this.machine.execution.screen.updateMode !== 'partial') return;
    const line = Math.floor(vpos);
    const x = Math.floor(hpos);
    if (line < this.partialNextY) return;
    if (line === this.partialNextY && x <= this.partialHpos) return;
    if (line > this.partialNextY) {
      this.finishPartialLine(frame);
      if (line > this.partialNextY) this.updatePartial(frame, line - 1);
    }
    if (x > 0) this.renderVisibleLine(frame, line, this.partialHpos, x - 1);
    this.partialHpos = x;
    this.partialNextY = line;
  }

  /** The rest of a line an update_now() stopped part way along. */
  private finishPartialLine(frame: Uint32Array): void {
    if (this.partialHpos <= 0) return;
    const xOffset = this.machine.execution.screen.xOffset ?? 0;
    this.renderVisibleLine(frame, this.partialNextY, this.partialHpos, xOffset + this.width - 1);
    this.partialHpos = 0;
    this.partialNextY++;
  }

  /** One line, from pixel `minX` to `maxX` in raster coordinates, clipped to the visible area. */
  private renderVisibleLine(frame: Uint32Array, line: number, minX: number, maxX: number): void {
    const xOffset = this.machine.execution.screen.xOffset ?? 0;
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    if (line < yOffset || line >= yOffset + this.height) return;
    const left = Math.max(xOffset, minX);
    const right = Math.min(xOffset + this.width - 1, maxX);
    if (left > right) return;
    this.renderRegion(frame, line, line, left, right);
  }

  renderLine(frame: Uint32Array, line: number): void {
    if (this.machine.video?.bitmap) return;
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    if (line < yOffset || line >= yOffset + this.height) return;
    this.renderRegion(frame, line, line);
  }

  private renderRegion(
    frame: Uint32Array,
    minY: number,
    maxY: number,
    minX = this.machine.execution.screen.xOffset ?? 0,
    maxX = (this.machine.execution.screen.xOffset ?? 0) + this.width - 1,
  ): void {
    const xOffset = this.machine.execution.screen.xOffset ?? 0;
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    const xScale = this.machine.video?.renderScale?.x ?? 1;
    const yScale = this.machine.video?.renderScale?.y ?? 1;
    const cliprect = new GeneratedRectangle(
      minX * xScale,
      (maxX + 1) * xScale - 1,
      minY * yScale,
      (maxY + 1) * yScale - 1,
    );
    const target = this.penBuffer ?? frame;
    const scaledXOffset = xOffset * xScale;
    const scaledYOffset = yOffset * yScale;
    const bitmap = {
      bpp: () => this.indexed ? 16 : 32,
      direct: {
        pixels: target,
        width: this.width,
        height: this.height,
        xScale,
        yScale,
        scaledXOffset,
        scaledYOffset,
      },
      fill: (color: number, rectangle?: GeneratedRectangle) => {
        const packed = color >>> 0;
        const firstX = rectangle
          ? Math.ceil((rectangle.min_x - xOffset * xScale) / xScale)
          : 0;
        const lastX = rectangle
          ? Math.floor((rectangle.max_x - xOffset * xScale) / xScale)
          : this.width - 1;
        const firstY = rectangle
          ? Math.ceil((rectangle.min_y - yOffset * yScale) / yScale)
          : minY - yOffset;
        const lastY = rectangle
          ? Math.floor((rectangle.max_y - yOffset * yScale) / yScale)
          : maxY - yOffset;
        const clippedFirstX = Math.max(0, firstX);
        const clippedLastX = Math.min(this.width - 1, lastX);
        const clippedFirstY = Math.max(minY - yOffset, 0, firstY);
        const clippedLastY = Math.min(maxY - yOffset, this.height - 1, lastY);
        if (clippedFirstX > clippedLastX || clippedFirstY > clippedLastY) return;
        for (let y = clippedFirstY; y <= clippedLastY; y++) {
          const start = y * this.width + clippedFirstX;
          target.fill(packed, start, y * this.width + clippedLastX + 1);
        }
      },
      plotRect: (
        x: number,
        y: number,
        pixelWidth: number,
        pixelHeight: number,
        color: number,
      ) => {
        // Generated gfx entries are scaled to the same source-domain raster as
        // the bitmap. The overwhelmingly common case is therefore one decoded
        // pixel covering exactly one output pixel. Avoid four floors, four
        // clamps and a fill loop for every tile/sprite pixel in that case.
        if (pixelWidth === xScale && pixelHeight === yScale) {
          const outputX = (x - scaledXOffset) / xScale;
          const outputY = (y - scaledYOffset) / yScale;
          if (
            Number.isInteger(outputX) &&
            Number.isInteger(outputY) &&
            outputX >= 0 && outputX < this.width &&
            outputY >= 0 && outputY < this.height
          ) {
            target[outputY * this.width + outputX] = color >>> 0;
          }
          return;
        }
        const firstX = Math.floor((x - xOffset * xScale) / xScale);
        const lastX = Math.floor((x + pixelWidth - 1 - xOffset * xScale) / xScale);
        const firstY = Math.floor((y - yOffset * yScale) / yScale);
        const lastY = Math.floor((y + pixelHeight - 1 - yOffset * yScale) / yScale);
        const clippedFirstX = Math.max(0, firstX);
        const clippedLastX = Math.min(this.width - 1, lastX);
        const clippedFirstY = Math.max(0, firstY);
        const clippedLastY = Math.min(this.height - 1, lastY);
        if (clippedFirstX > clippedLastX || clippedFirstY > clippedLastY) return;
        const packed = color >>> 0;
        if (
          clippedFirstX === clippedLastX &&
          clippedFirstY === clippedLastY
        ) {
          target[clippedFirstY * this.width + clippedFirstX] = packed;
          return;
        }
        for (let outputY = clippedFirstY; outputY <= clippedLastY; outputY++) {
          const start = outputY * this.width + clippedFirstX;
          target.fill(packed, start, outputY * this.width + clippedLastX + 1);
        }
      },
      pix: (y: number, x = 0) => {
        const visibleX = Math.floor((x - scaledXOffset) / xScale);
        const visibleY = Math.floor((y - scaledYOffset) / yScale);
        return visibleX >= 0 && visibleX < this.width &&
          visibleY >= 0 && visibleY < this.height
          ? target[visibleY * this.width + visibleX] ?? 0
          : 0;
      },
      'pix&': (y: number, x = 0) => ({
        generatedPointer: true as const,
        source: target,
        offset:
          Math.floor((y - scaledYOffset) / yScale) * this.width +
          Math.floor((x - scaledXOffset) / xScale),
      }),
      'pix=': (y: number, x: number, color: number) => {
        const visibleX = Math.floor((x - xOffset * xScale) / xScale);
        const visibleY = Math.floor((y - yOffset * yScale) / yScale);
        if (
          visibleX >= 0 && visibleX < this.width &&
          visibleY >= 0 && visibleY < this.height
        ) {
          target[visibleY * this.width + visibleX] = color >>> 0;
        }
      },
    };
    const screen = {
      visible_area: () => new GeneratedRectangle(
        xOffset * xScale,
        (xOffset + this.width) * xScale - 1,
        yOffset * yScale,
        (yOffset + this.height) * yScale - 1,
      ),
      // MAME's screen dimensions are the whole raster, not the visible window.
      // A device that composes its picture in raster coordinates reads them
      // back here: the TIA takes `screen.height()` as the modulus for its own
      // scanline buffers, and a zero left every pixel it wrote unaddressable.
      width: () => Math.max(1, this.machine.execution.screen.htotal ??
        (this.machine.execution.screen.xOffset ?? 0) + this.machine.execution.screen.width),
      height: () => Math.max(1, this.machine.execution.screen.vtotal),
      priority: () => this.primitives.screenPriority?.(),
      // The screen's own frame count (vblankEnd): the Spectrum's FLASH is
      // `frame_number() / 16`, read on every line it draws.
      frame_number: () => this.primitives.screenFrameNumber?.() ?? 0,
    };
    const handlerKey =
      `${this.screenUpdate.targetClass}.${this.screenUpdate.targetMethod}`;
    const direct = this.primitives.directScreenUpdate?.(
      handlerKey,
      screen,
      bitmap,
      cliprect,
    ) ?? false;
    const result = direct
      ? 0
      : this.deviceScreenUpdate
        ? this.deviceScreenUpdate(screen, bitmap, cliprect)
        : executeGeneratedCallbackHandler(
          this.machine,
          this.screenUpdate,
          this.primitives.generatedVideoBindings(frame),
          {
            screen,
            bitmap,
            cliprect,
            ...this.primitives.generatedVideoArgs?.(frame),
          },
        );
    if (result === undefined) {
      throw new Error(`generated screen-update handler "${handlerKey}" is not executable`);
    }
    if (this.penBuffer) {
      const start = Math.max(0, minY - yOffset) * this.width;
      const end = (Math.min(maxY - yOffset, this.height - 1) + 1) * this.width;
      this.primitives.resolveScreenPens?.(this.penBuffer, frame, start, end - start);
    }
  }
}

interface BitmapTarget {
  direct?: {
    pixels: Uint32Array;
    width: number;
    height: number;
    xScale: number;
    yScale: number;
    scaledXOffset: number;
    scaledYOffset: number;
  };
  pix?(y: number, x?: number): number;
  'pix&'?(y: number, x?: number): {
    generatedPointer: true;
    source: Uint32Array;
    offset: number;
  };
  fill(color: number, rectangle?: GeneratedRectangle): void;
  /** bitmap_t::bpp(), which tells a bitmap_ind16 from a bitmap_rgb32. */
  bpp?(): number;
  plotRect?(
    x: number,
    y: number,
    width: number,
    height: number,
    color: number,
  ): void;
  'pix='(y: number, x: number, color: number): void;
}

interface TileInfo {
  gfx: number;
  code: number;
  color: number;
  flags: number;
  category: number;
  group: number;
}

/**
 * What a draw does to the screen priority bitmap.
 *
 * MAME has two rules and they are not interchangeable. A gfx draw through one
 * of the `prio_*` entry points *claims* each pixel it touches (storing 31) and
 * refuses to paint where an earlier claim matches its mask; a tilemap draw
 * *stamps* `(pri & priority_mask) | priority` on every pixel it paints and
 * rejects nothing. CPS1 needs both at once: the tilemap stamp is what puts a
 * high-priority scenery pen in front of a sprite, and the sprite claim is what
 * makes the first entry in the object list win against the ones behind it.
 */
type GeneratedPriorityOp =
  | { kind: 'claim'; bitmap: GeneratedPriorityBitmap; mask: number }
  | { kind: 'stamp'; bitmap: GeneratedPriorityBitmap; value: number; keep: number };

/** Minimal bitmap_ind16 surface used by generated temporary pixmaps. */
class GeneratedIndexedBitmap implements BitmapTarget {
  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['pixels'];
  }

  pixels: Uint32Array;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint32Array(width * height);
  }

  /** bitmap_t::allocate: Venture's motion-object bitmaps are 16x16. */
  allocate(width: number, height: number): void {
    this.width = Math.max(0, Number(width));
    this.height = Math.max(0, Number(height));
    this.pixels = new Uint32Array(this.width * this.height);
  }

  cliprect(): GeneratedRectangle {
    return new GeneratedRectangle(0, this.width - 1, 0, this.height - 1);
  }

  /**
   * bitmap_t::resize: the sprite device grows its bitmap to the cliprect it is
   * asked to draw (sprite.h draw_async), then clears what it draws into. The
   * slop is MAME's guard border for clipped blits, which ours do not need.
   */
  resize(width: number, height: number): void {
    const w = Math.max(0, Number(width)), h = Math.max(0, Number(height));
    if (w === this.width && h === this.height) return;
    this.allocate(w, h);
  }

  /** bitmap_t::bpp(): a bitmap_ind16. */
  bpp(): number {
    return 16;
  }

  fill(color: number, rectangle?: GeneratedRectangle): void {
    const minX = Math.max(0, rectangle?.min_x ?? 0);
    const maxX = Math.min(this.width - 1, rectangle?.max_x ?? this.width - 1);
    const minY = Math.max(0, rectangle?.min_y ?? 0);
    const maxY = Math.min(this.height - 1, rectangle?.max_y ?? this.height - 1);
    for (let y = minY; y <= maxY; y++) {
      this.pixels.fill(color >>> 0, y * this.width + minX, y * this.width + maxX + 1);
    }
  }

  pix(y: number, x = 0): number {
    return this.pixels[y * this.width + x] ?? 0;
  }

  'pix&'(y: number, x = 0): {
    generatedPointer: true;
    source: Uint32Array;
    offset: number;
  } {
    return { generatedPointer: true, source: this.pixels, offset: y * this.width + x };
  }

  'pix='(y: number, x: number, color: number): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.pixels[y * this.width + x] = color >>> 0;
    }
  }
}

export function createGeneratedTileInfoTarget(tile: TileInfo): {
  category: number;
  group: number;
  set(gfx: number, code: number, color: number, flags: number): void;
} {
  return {
    get category(): number {
      return tile.category;
    },
    set category(value: number) {
      tile.category = Number(value) & 0x0f;
    },
    get group(): number {
      return tile.group;
    },
    set group(value: number) {
      tile.group = Number(value) & 0xff;
    },
    set(gfx: number, code: number, color: number, flags: number): void {
      Object.assign(tile, { gfx, code, color, flags });
    },
  };
}

/**
 * MAME's screen priority bitmap (bitmap_ind8).
 *
 * A gfx draw that is handed this claims every non-transparent pixel it
 * touches, and refuses to paint where an earlier draw already claimed one.
 * MCR boards rely on it twice over: sprites are drawn back to front from the
 * end of sprite RAM, so the first one to reach a pixel keeps it, and each
 * sprite's "under tile" pen 8 is drawn in a second, invisible pass whose only
 * job is to claim pixels so the sprites behind it are cut away there.
 *
 * Coordinates arrive in the destination bitmap's space, so the buffer maps
 * them back through the same screen offset and render scale the bitmap does.
 */
class GeneratedPriorityBitmap {
  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['pixels'];
  }

  private readonly pixels: Uint8Array;
  private readonly width: number;
  private readonly height: number;
  private readonly xOffset: number;
  private readonly yOffset: number;
  private readonly xScale: number;
  private readonly yScale: number;

  constructor(machine: BoardIr) {
    const screen = machine.execution.screen;
    this.width = screen.width;
    this.height = screen.height;
    this.xScale = machine.video?.renderScale?.x ?? 1;
    this.yScale = machine.video?.renderScale?.y ?? 1;
    this.xOffset = (screen.xOffset ?? 0) * this.xScale;
    this.yOffset = (screen.yOffset ?? 0) * this.yScale;
    this.pixels = new Uint8Array(this.width * this.height);
  }

  /** bitmap_t::pix(y, x), in raster coordinates as the screen update addresses it. */
  pix(y: number, x = 0): number {
    const at = this.index(x, y);
    return at < 0 ? 0 : this.pixels[at]!;
  }

  /**
   * `&screen.priority().pix(y)`: a row a merge loop indexes by raster x.
   * System 16A's sprite mix reads `pri[x]` for each pixel of a dirty rect.
   */
  'pix&'(y: number, x = 0): { generatedPointer: true; source: Uint8Array; offset: number } {
    const row = Math.floor((y - this.yOffset) / this.yScale);
    return { generatedPointer: true, source: this.pixels, offset: row * this.width + x - this.xOffset };
  }

  private index(x: number, y: number): number {
    const column = Math.floor((x - this.xOffset) / this.xScale);
    const row = Math.floor((y - this.yOffset) / this.yScale);
    return column >= 0 && column < this.width && row >= 0 && row < this.height
      ? row * this.width + column
      : -1;
  }

  fill(value: number, rectangle?: GeneratedRectangle): void {
    if (!rectangle) {
      this.pixels.fill(value & 0xff);
      return;
    }
    const firstX = Math.max(0, Math.ceil((rectangle.min_x - this.xOffset) / this.xScale));
    const lastX = Math.min(this.width - 1, Math.floor((rectangle.max_x - this.xOffset) / this.xScale));
    const firstY = Math.max(0, Math.ceil((rectangle.min_y - this.yOffset) / this.yScale));
    const lastY = Math.min(this.height - 1, Math.floor((rectangle.max_y - this.yOffset) / this.yScale));
    for (let row = firstY; row <= lastY; row++) {
      this.pixels.fill(value & 0xff, row * this.width + firstX, row * this.width + lastX + 1);
    }
  }

  get(x: number, y: number): number {
    const index = this.index(x, y);
    return index < 0 ? 0 : this.pixels[index]!;
  }

  set(x: number, y: number, value: number): void {
    const index = this.index(x, y);
    if (index >= 0) this.pixels[index] = value;
  }
}

/** The palette surface generated gfx, tilemap and screen code binds against. */
interface GeneratedPaletteDevice {
  pen_color?(pen: number): number;
  readonly colors: Uint32Array;
  transpen_mask(gfx: GeneratedGfxElement, color: number, transparent: number): number;
  black_pen(): number;
  pens(): Uint32Array;
  set_pen_color?(pen: number, colorOrRed: number, green?: number, blue?: number): void;
  /** The shadow and highlight groups, when the configuration enables them. */
  shadows?: GeneratedPaletteShadows;
}

/** drawgfx.h's per-pen draw modes. */
const DRAWMODE_NONE = 0;
const DRAWMODE_SOURCE = 1;
const DRAWMODE_SHADOW_PRI = 3;

/**
 * device_palette_interface's shadow and highlight groups for an indexed
 * screen (dipalette.cpp). The palette holds its `entries` base colours, then
 * a shadow group, then a highlight group, each the base colours under that
 * group's contrast (palette_t::update_adjusted_color). shadow_table() maps a
 * pen into a group: presets 0 and 2 to the shadows, 1 and 3 to the
 * highlights, and a pen past the base colours to itself.
 */
export class GeneratedPaletteShadows {
  /** Save-state roots (machine-state.ts); the tables derive from these. */
  stateKeys(): readonly string[] {
    return ['mode', 'contrast'];
  }

  stateRestored(): void {
    for (let group = 1; group < this.groups; group++) this.setContrast(group, this.contrast[group]!);
  }

  readonly entries: number;
  readonly groups: number;
  readonly shadowGroup: number;
  readonly highlightGroup: number;
  private mode = 0;
  /** palette_t::m_group_contrast, a float per group. */
  private readonly contrast: number[];
  private readonly levels: Uint8Array[];
  private readonly tables: (Uint32Array | undefined)[] = [];

  constructor(plan: NonNullable<NonNullable<BoardIr['video']>['paletteGroups']>) {
    this.entries = plan.entries;
    let groups = 1;
    this.shadowGroup = plan.shadows ? groups++ : 0;
    this.highlightGroup = plan.highlights ? groups++ : 0;
    this.groups = groups;
    this.contrast = new Array<number>(groups).fill(1);
    this.levels = Array.from({ length: groups }, () => Uint8Array.from({ length: 256 }, (_, level) => level));
    // allocate_palette: PALETTE_DEFAULT_SHADOW_FACTOR, and its reciprocal.
    const shadowFactor = Math.fround(0.6);
    if (this.shadowGroup) this.setContrast(this.shadowGroup, shadowFactor);
    if (this.highlightGroup) this.setContrast(this.highlightGroup, Math.fround(1 / shadowFactor));
    // allocate_shadow_tables, palettized: one 64k table per kind.
    if (this.shadowGroup) {
      const table = Uint32Array.from({ length: 65536 }, (_, pen) => pen < this.entries ? pen + this.entries : pen);
      this.tables[0] = this.tables[2] = table;
    }
    if (this.highlightGroup) {
      const table = Uint32Array.from({ length: 65536 }, (_, pen) => pen < this.entries ? pen + 2 * this.entries : pen);
      this.tables[1] = this.tables[3] = table;
    }
  }

  shadow_table(): Uint32Array | undefined {
    return this.tables[this.mode];
  }

  shadow_mode(): number {
    return this.mode;
  }

  set_shadow_mode(mode: number): void {
    this.mode = mode & 3;
  }

  set_shadow_factor(factor: number): void {
    if (this.shadowGroup) this.setContrast(this.shadowGroup, factor);
  }

  set_highlight_factor(factor: number): void {
    if (this.highlightGroup) this.setContrast(this.highlightGroup, factor);
  }

  /** The adjusted colour of any pen, given the base colours. */
  resolve(colors: Uint32Array, pen: number): number {
    const group = Math.floor(pen / this.entries);
    if (group <= 0) return colors[pen] ?? 0xff000000;
    // palette_t keeps black and then white after the last group.
    if (group >= this.groups) return pen === this.entries * this.groups + 1 ? 0xffffffff : 0xff000000;
    const base = colors[pen - group * this.entries] ?? 0xff000000;
    const level = this.levels[group]!;
    return ((base & 0xff000000) |
      (level[(base >>> 16) & 0xff]! << 16) |
      (level[(base >>> 8) & 0xff]! << 8) |
      level[base & 0xff]!) >>> 0;
  }

  /** adjust_palette_entry: `clamp(float(level) * contrast)`, in float. */
  private setContrast(group: number, factor: number): void {
    const contrast = Math.fround(factor);
    this.contrast[group] = contrast;
    const levels = this.levels[group]!;
    for (let level = 0; level < 256; level++) {
      levels[level] = Math.min(255, Math.max(0, Math.trunc(Math.fround(level * contrast))));
    }
  }
}

/**
 * MAME palette RAM colored by a set_format raw_to_rgb converter. Writes follow
 * palette_device::write8/write8_ext: store the byte, then recompute the
 * affected entry, so mid-frame writes reach partial screen updates the same way
 * they do in MAME.
 */
/**
 * Share tags an address-map range stores into. A share only a device writes is
 * that device's own memory; one the bus writes has storage of its own.
 */
export function generatedBusWrittenShares(machine: BoardIr): ReadonlySet<string> {
  const written = new Set<string>();
  const ranges = machine.execution.cpus.flatMap(cpu => [
    ...(cpu.ranges ?? []),
    ...(cpu.opcode?.ranges ?? []),
    ...(cpu.io?.ranges ?? []),
  ]);
  for (const range of ranges) {
    if (range.share && range.kind === 'ram' && !range.readOnly) written.add(range.share);
  }
  return written;
}

class GeneratedRamPalette implements GeneratedPaletteDevice {
  /**
   * Save-state roots (machine-state.ts). The colors are saved as they are,
   * not recomputed from the RAM: a driver-owned writer (Centipede's) sets
   * pens directly, and recomputing them from RAM painted every pen black.
   */
  stateKeys(): readonly string[] {
    return ['ram', 'ext', 'colors'];
  }

  readonly colors: Uint32Array;
  private readonly plan: GeneratedRamPalettePlan;
  private readonly ram: Uint8Array;
  private readonly ext?: Uint8Array;
  /** palette_device::device_start halves bytes-per-entry across a split share. */
  private readonly bytesPerEntry: number;

  constructor(
    plan: GeneratedRamPalettePlan,
    shares: Record<string, Uint8Array> = {},
    /** Share tags some address-map range stores into. See `adopt` below. */
    busWrittenShares: ReadonlySet<string> = new Set(),
  ) {
    this.plan = plan;
    this.bytesPerEntry = plan.extShare ? plan.bytesPerEntry / 2 : plan.bytesPerEntry;
    const bytes = plan.entries * this.bytesPerEntry;
    // Whether the device's colour RAM *is* the board's share is a fact of the
    // address map, and MAME spells both arrangements:
    //
    //  - Wardner maps the window write-only through the device and readable
    //    through `m_rom_ram_view[0]` as a read-only share. Nothing on the bus
    //    ever stores into that share, so palette_device::write8 is its only
    //    writer -- they have to be one buffer, or the board's power-on RAM
    //    test walks a bit through 0xa000, reads back zero and hangs on
    //    "LRAM ERROR".
    //  - Gauntlet maps it `.ram().w("palette", write16).share("palette")`.
    //    The bus stores the word itself and the device keeps its own copy,
    //    which is exactly what MAME does; adopting the share there instead
    //    took the palette from 1020 of 1024 entries matching MAME to 891.
    //
    // So: adopt only a share the bus never writes.
    const adopt = (tag: string): Uint8Array => {
      const share = busWrittenShares.has(tag) ? undefined : shares[tag];
      return share && share.length >= bytes ? share.subarray(0, bytes) : new Uint8Array(bytes);
    };
    this.ram = adopt(plan.tag);
    if (plan.extShare) this.ext = adopt(plan.extShare);
    this.colors = new Uint32Array(plan.entries);
    for (let pen = 0; pen < plan.entries; pen++) this.update(pen);
    this.reset();
  }

  /** Replay palette basemem/extmem writes lowered from machine_reset(). */
  reset(): void {
    this.ram.fill(0);
    this.ext?.fill(0);
    for (let pen = 0; pen < this.plan.entries; pen++) this.update(pen);
    for (const write of this.plan.resetWrites ?? []) {
      this.write(write.offset, write.data, Boolean(write.ext));
    }
    for (const entry of this.plan.initialColors ?? []) {
      this.set_pen_color(entry.pen, entry.color);
    }
  }

  /** palette_device::write8 / write8_ext, then update_for_write. */
  write(offset: number, data: number, ext = false): void {
    const bytes = ext ? this.ext : this.ram;
    if (!bytes || offset < 0 || offset >= bytes.length) return;
    bytes[offset] = data & 0xff;
    const count = Math.ceil(1 / this.bytesPerEntry);
    const base = Math.floor(offset / this.bytesPerEntry);
    for (let index = 0; index < count; index++) this.update(base + index);
  }

  /** palette_device::read_entry, honoring the configured device byte order. */
  private entry(pen: number): number {
    let raw = 0;
    // MAME represents a split palette as two independent memory_array
    // instances, then appends extmem above basemem in read_entry(). Reverse
    // bytes within each share for big-endian buses, never across the split.
    const shiftFor = (byte: number, half: number): number =>
      8 * (half + (this.plan.endianness === 'big'
        ? this.bytesPerEntry - byte - 1
        : byte));
    for (let byte = 0; byte < this.bytesPerEntry; byte++) {
      raw |= (this.ram[pen * this.bytesPerEntry + byte] ?? 0) << shiftFor(byte, 0);
    }
    if (this.ext) {
      for (let byte = 0; byte < this.bytesPerEntry; byte++) {
        raw |= (this.ext[pen * this.bytesPerEntry + byte] ?? 0) <<
          shiftFor(byte, this.bytesPerEntry);
      }
    }
    return raw >>> 0;
  }

  private update(pen: number): void {
    if (pen < 0 || pen >= this.colors.length) return;
    const raw = this.plan.inverted ? ~this.entry(pen) : this.entry(pen);
    const rgb: Record<'r' | 'g' | 'b', number> = { r: 0, g: 0, b: 0 };
    const intensity = this.plan.intensity
      ? palExpand(raw >>> this.plan.intensity.shift, this.plan.intensity.bits)
      : undefined;
    for (const channel of this.plan.channels) {
      const value = palExpand(raw >>> channel.shift, channel.bits);
      rgb[channel.channel] = intensity === undefined ? value : (intensity * value) >>> 8;
    }
    this.colors[pen] = packRgb(rgb.r, rgb.g, rgb.b);
  }

  /** A direct palette declares no indirect entries, so nothing is masked. */
  transpen_mask(): number {
    return 0;
  }

  black_pen(): number {
    for (let pen = 0; pen < this.colors.length; pen++) {
      if (this.colors[pen] === 0xff000000) return pen;
    }
    return 0;
  }

  pens(): Uint32Array {
    return this.colors;
  }

  /** palette_device::set_pen_color overloads used by driver-owned RAM writers. */
  set_pen_color(pen: number, colorOrRed: number, green?: number, blue?: number): void {
    if (pen < 0 || pen >= this.colors.length) return;
    this.colors[pen] = green === undefined || blue === undefined
      ? colorOrRed >>> 0
      : packRgb(colorOrRed, green, blue);
  }
}

/** Palette-device RAM used by a packed framebuffer plan. */
class GeneratedBitmapPalette implements GeneratedPaletteDevice {
  /** Save-state roots (machine-state.ts): the RAM and the colors as they stand. */
  stateKeys(): readonly string[] {
    return ['ram', 'colors'];
  }

  colors: Uint32Array;
  readonly ram: Uint8Array;
  private readonly plan:
    NonNullable<NonNullable<BoardIr['video']>['bitmap']>['paletteRam'] & {};

  private readonly convert?: (raw: number) => number;

  constructor(
    plan: NonNullable<NonNullable<BoardIr['video']>['bitmap']>['paletteRam'] & {},
    convert?: (raw: number) => number,
  ) {
    this.plan = plan;
    this.convert = convert;
    this.ram = new Uint8Array(plan.entries);
    // A converter is a board handler, callable once the video's bindings are
    // composed; the host converts the power-on RAM then (reset()).
    this.colors = convert ? new Uint32Array(plan.entries) : createRamPalette(plan, this.ram);
  }

  read8(offset: number): number {
    return this.ram[offset] ?? 0;
  }

  write8(offset: number, data: number): void {
    if (offset < 0 || offset >= this.ram.length) return;
    this.ram[offset] = data & 0xff;
    if (this.convert) {
      this.colors[offset] = this.convert(data & 0xff) >>> 0;
      return;
    }
    this.colors = createRamPalette(this.plan, this.ram);
  }

  reset(): void {
    this.ram.fill(0);
    this.colors = createRamPalette(this.plan, this.ram, this.convert);
  }

  transpen_mask(): number {
    return 0;
  }

  black_pen(): number {
    return 0;
  }

  pens(): Uint32Array {
    return this.colors;
  }
}

/**
 * MAME palexpand<NumBits>: fill eight bits by repeating the raw value from the
 * most significant bit down, truncating the final partial copy.
 */
function palExpand(value: number, bits: number): number {
  if (bits <= 0) return 0;
  const masked = value & ((1 << bits) - 1);
  if (bits >= 8) return masked & 0xff;
  let expanded = 0;
  for (let filled = 0; filled < 8;) {
    const take = Math.min(bits, 8 - filled);
    expanded = ((expanded << take) | (masked >>> (bits - take))) & 0xff;
    filled += take;
  }
  return expanded;
}

class GeneratedPalette implements GeneratedPaletteDevice {
  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['colors', 'indirect', 'indirectColors'];
  }

  readonly colors: Uint32Array;
  readonly indirect: Uint16Array;
  private readonly indirectColors: Uint32Array;
  private readonly transparentIndirect: number;

  constructor(plan: GeneratedPromPalettePlan, regions: Regions) {
    const prom = regions[plan.region];
    if (!prom) throw new Error(`generated palette: missing ROM region "${plan.region}"`);
    const lookupProm = plan.lookupRegion ? regions[plan.lookupRegion] : prom;
    if (!lookupProm) {
      throw new Error(`generated palette: missing lookup ROM region "${plan.lookupRegion}"`);
    }
    // MAME's builtin PROM decoders (palette_device::RRRRGGGGBBBB_proms and
    // kin) are fixed weightings of the PROM bits; every other palette is the
    // driver's own callback, run as a handler (execution.paletteInits).
    const core = new Uint32Array(plan.colorCount);
    for (let index = 0; index < plan.colorCount; index++) {
      const rgb = { r: 0, g: 0, b: 0 };
      for (const channel of plan.channels) {
        const weights = channel.weights;
        if (!weights) throw new Error(`generated palette: channel ${channel.channel} has no weights`);
        let value = 0;
        for (let bit = 0; bit < channel.bits.length; bit++) {
          const source = prom[index + (channel.offsets?.[bit] ?? 0)] ?? 0;
          value += weights[bit]! * plan.scaler * palettePromBit(source, channel, bit);
        }
        rgb[channel.channel] = Math.floor(value + 0.5);
      }
      core[index] = packRgb(rgb.r, rgb.g, rgb.b);
    }
    this.indirectColors = core;
    const penCount = Math.max(
      1,
      ...plan.banks.map(bank => {
        const count = bank.lookupCount ?? plan.lookupCount;
        return bank.penOffset + Math.max(0, count - 1) * (bank.penStride ?? 1) + 1;
      }),
    );
    this.colors = new Uint32Array(penCount);
    this.indirect = new Uint16Array(penCount);
    for (const bank of plan.banks) {
      const lookupOffset = bank.lookupOffset ?? plan.lookupOffset;
      const lookupCount = bank.lookupCount ?? plan.lookupCount;
      for (let index = 0; index < lookupCount; index++) {
        const lookupValue = bank.direct
          ? index * (bank.colorStride ?? 1)
          : bank.lookupTerms?.length
            ? bank.lookupTerms.reduce((value, term) => {
                const source = regions[term.region];
                if (!source) {
                  throw new Error(`generated palette: missing lookup ROM region "${term.region}"`);
                }
                return value | (((source[term.offset + index] ?? 0) & term.mask) << term.shift);
              }, 0)
            : (lookupProm[lookupOffset + index] ?? 0) & plan.lookupMask;
        const indirect = !bank.direct &&
            bank.lookupValueOverride !== undefined &&
            lookupValue === bank.lookupValueOverride
          ? bank.overrideColor ?? bank.colorOr
          : bank.direct
            ? bank.colorOr + (bank.colorMap?.[lookupValue] ?? lookupValue)
            : bank.colorOr | (bank.colorMap?.[lookupValue] ?? lookupValue);
        const pen = bank.penOffset + index * (bank.penStride ?? 1);
        this.indirect[pen] = indirect;
        this.colors[pen] = core[indirect] ?? 0xff000000;
      }
    }
    this.transparentIndirect = plan.transparentIndirect;
  }

  transpen_mask(gfx: GeneratedGfxElement, color: number, transparent: number): number {
    let mask = 0;
    const base = gfx.entry.colorBase + color * gfx.granularity();
    for (let pen = 0; pen < gfx.granularity(); pen++) {
      if (this.indirect[base + pen] === transparent) mask |= 1 << pen;
    }
    return mask;
  }

  /** MAME palette_device::black_pen(): a pen that resolves to black. */
  black_pen(): number {
    for (let pen = 0; pen < this.colors.length; pen++) {
      if (this.colors[pen] === 0xff000000) return pen;
    }
    return 0;
  }

  pens(): Uint32Array {
    return this.colors;
  }

  /** palette_device::set_pen_indirect for CPU-writable lookup RAM. */
  set_pen_indirect(pen: number, indirect: number): void {
    if (pen < 0 || pen >= this.colors.length) return;
    const color = indirect & 0xffff;
    this.indirect[pen] = color;
    this.colors[pen] = this.indirectColors[color] ?? 0xff000000;
  }

  /**
   * palette_device::set_pen_color overloads used by driver-owned RAM writers.
   * Some PROM-palette boards keep a RAM-colored pen range on top (Mat Mania's
   * sprite pens 64..79); the driver handler recomputes those pens directly.
   */
  set_pen_color(pen: number, colorOrRed: number, green?: number, blue?: number): void {
    if (pen < 0 || pen >= this.colors.length) return;
    this.colors[pen] = green === undefined || blue === undefined
      ? colorOrRed >>> 0
      : packRgb(colorOrRed, green, blue);
  }
}

function palettePromBit(
  source: number,
  channel: GeneratedPromPalettePlan['channels'][number],
  position: number,
): number {
  return ((source >>> channel.bits[position]!) & 1) ^ Number(channel.inverted?.[position] ?? false);
}

export class GeneratedGfxElement {
  /** Save-state roots (machine-state.ts): what a driver can change; the decode is from ROM. */
  stateKeys(): readonly string[] {
    return ['penGranularity', 'colorCount'];
  }

  readonly entry: GeneratedGfxEntry;
  private readonly set: GfxSet;
  /** Where a RAM-sourced element decodes from (set_source), and what it has dirtied. */
  private source?: { bytes: Uint8Array; offset: number };
  private dirty: Set<number> | 'all' | undefined;
  /** Pens per color entry; drivers can widen it (mario's set_granularity(8)). */
  private penGranularity: number;
  private colorCount: number;
  private readonly palette: GeneratedPaletteDevice;
  /** Indexed (bitmap_ind16) screens compose pens; the screen resolves them. */
  private readonly indexed: boolean;

  constructor(
    entry: GeneratedGfxEntry,
    decoded: GfxSet,
    palette: GeneratedPaletteDevice,
    indexed = false,
  ) {
    this.entry = entry;
    this.set = decoded;
    this.penGranularity = 1 << entry.layout.planes;
    this.colorCount = entry.colorCount;
    this.palette = palette;
    this.indexed = indexed;
  }

  transmask(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    transparentMask: number,
  ): void {
    this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, transparentMask);
  }

  /** Konami sprite devices supply one draw-mode byte per pen. */
  transtable(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    drawModes: ArrayLike<number>,
  ): void {
    const shadow = this.shadowTable(drawModes);
    if (shadow) {
      this.drawTable(bitmap, clip, code, color, flipX, flipY, sx, sy, undefined, drawModes, shadow);
      return;
    }
    this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, drawModeMask(drawModes));
  }

  prio_transtable(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    priorityBitmap: unknown,
    priorityMask: number,
    drawModes: ArrayLike<number>,
  ): void {
    if (!(priorityBitmap instanceof GeneratedPriorityBitmap)) {
      throw new Error('prio_transtable needs the screen priority bitmap');
    }
    const shadow = this.shadowTable(drawModes);
    if (shadow) {
      this.drawTable(
        bitmap, clip, code, color, flipX, flipY, sx, sy, undefined, drawModes, shadow,
        { bitmap: priorityBitmap, mask: priorityMask | (1 << 31) },
      );
      return;
    }
    this.draw(
      bitmap, clip, code, color, flipX, flipY, sx, sy,
      drawModeMask(drawModes),
      { kind: 'claim', bitmap: priorityBitmap, mask: priorityMask | (1 << 31) },
    );
  }

  zoom_transtable(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    scaleX: number,
    scaleY: number,
    drawModes: ArrayLike<number>,
  ): void {
    const shadow = this.shadowTable(drawModes);
    if (shadow) {
      this.drawTable(bitmap, clip, code, color, flipX, flipY, sx, sy, [scaleX, scaleY], drawModes, shadow);
      return;
    }
    this.drawZoom(
      bitmap, clip, code, color, flipX, flipY, sx, sy, scaleX, scaleY,
      drawModeMask(drawModes),
    );
  }

  prio_zoom_transtable(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    scaleX: number,
    scaleY: number,
    priorityBitmap: unknown,
    priorityMask: number,
    drawModes: ArrayLike<number>,
  ): void {
    if (!(priorityBitmap instanceof GeneratedPriorityBitmap)) {
      throw new Error('prio_zoom_transtable needs the screen priority bitmap');
    }
    const shadow = this.shadowTable(drawModes);
    if (shadow) {
      this.drawTable(
        bitmap, clip, code, color, flipX, flipY, sx, sy, [scaleX, scaleY], drawModes, shadow,
        { bitmap: priorityBitmap, mask: priorityMask | (1 << 31) },
      );
      return;
    }
    this.drawZoom(
      bitmap, clip, code, color, flipX, flipY, sx, sy, scaleX, scaleY,
      drawModeMask(drawModes),
      { kind: 'claim', bitmap: priorityBitmap, mask: priorityMask | (1 << 31) },
    );
  }

  /**
   * gfx_element::prio_transmask — a draw checked against, and recorded in,
   * the screen priority bitmap. MAME sets the mask's high bit implicitly, so
   * a pixel an earlier draw claimed (it stores 31 there) is never repainted.
   */
  prio_transmask(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    priorityBitmap: unknown,
    priorityMask: number,
    transparentMask: number,
  ): void {
    if (!(priorityBitmap instanceof GeneratedPriorityBitmap)) {
      throw new Error('prio_transmask needs the screen priority bitmap');
    }
    this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, transparentMask, {
      kind: 'claim',
      bitmap: priorityBitmap,
      mask: priorityMask | (1 << 31),
    });
  }

  /**
   * gfx_element::prio_transpen — prio_transmask for a single transparent pen.
   * The implicit high mask bit is what makes an already-claimed pixel opaque
   * to every later draw, so a sprite list is front-to-back in table order.
   */
  prio_transpen(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    priorityBitmap: unknown,
    priorityMask: number,
    transparentPen: number,
  ): void {
    if (!(priorityBitmap instanceof GeneratedPriorityBitmap)) {
      throw new Error('prio_transpen needs the screen priority bitmap');
    }
    this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, 1 << transparentPen, {
      kind: 'claim',
      bitmap: priorityBitmap,
      mask: priorityMask | (1 << 31),
    });
  }

  transpen(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    transparentPen: number,
  ): void {
    this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, 1 << transparentPen);
  }

  opaque(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
  ): void {
    this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, 0);
  }

  /**
   * MAME `gfx_element::transpen_raw`: `color` is already the absolute pen
   * base, not a colour index to be scaled by the granularity. Sprite engines
   * that fold a priority or a palette base into the value draw this way.
   */
  transpen_raw(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    penBase: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    transparentPen: number,
  ): void {
    const gfx = this.decoded;
    const element = modulo(code, gfx.count);
    const base = element * gfx.width * gfx.height;
    for (let py = 0; py < gfx.height; py++) {
      const y = sy + py;
      if (y < clip.min_y || y > clip.max_y) continue;
      const sourceY = flipY ? gfx.height - 1 - py : py;
      for (let px = 0; px < gfx.width; px++) {
        const x = sx + px;
        if (x < clip.min_x || x > clip.max_x) continue;
        const sourceX = flipX ? gfx.width - 1 - px : px;
        const pen = gfx.pixels[base + sourceY * gfx.width + sourceX]!;
        if (pen === transparentPen) continue;
        bitmap['pix='](y, x, penBase + pen);
      }
    }
  }

  indirectMask(color: number, transparent: number): number {
    return this.palette.transpen_mask(this, color, transparent);
  }

  colorbase(): number {
    return this.entry.colorBase;
  }

  colors(): number {
    return this.colorCount;
  }

  depth(): number {
    return 1 << this.entry.layout.planes;
  }

  set_colors(value: number): void {
    if (Number.isFinite(value) && value > 0) this.colorCount = Math.trunc(value);
  }

  /** MAME gfx_element source surface used by custom zoom/scaling renderers. */
  elements(): number {
    return this.decoded.count;
  }

  /** gfx_element::width()/height(): a tile's size, which atarimo sizes its grid from. */
  width(): number {
    return this.decoded.width;
  }

  height(): number {
    return this.decoded.height;
  }

  rowbytes(): number {
    return this.decoded.width;
  }

  granularity(): number {
    return this.penGranularity;
  }

  /** gfx_element::set_granularity: pens per color entry, from video_start. */
  set_granularity(value: number): void {
    if (Number.isFinite(value) && value > 0) this.penGranularity = Math.trunc(value);
  }

  /**
   * The decoded pixels, any code its RAM source dirtied decoded again first:
   * gfx_element::decode as get_data and every draw run it.
   */
  get decoded(): GfxSet {
    if (this.dirty && this.source) {
      const codes = this.dirty === 'all' ? Array.from({ length: this.set.count }, (_, code) => code) : [...this.dirty];
      for (const code of codes) redecodeGfxElement(this.entry.layout, this.set, this.source.bytes, this.source.offset, code);
    }
    this.dirty = undefined;
    return this.set;
  }

  /**
   * gfx_element::set_source: decode from this memory from now on. Taito SJ's
   * video_start points its four RAM-defined sets at the character RAM.
   */
  set_source(base: unknown): void {
    const pointer = base as { generatedPointer?: boolean; source?: unknown; offset?: number };
    const bytes = pointer?.generatedPointer ? pointer.source : base;
    if (!ArrayBuffer.isView(bytes)) return;
    this.source = { bytes: bytes as Uint8Array, offset: pointer?.generatedPointer ? Number(pointer.offset ?? 0) : 0 };
    this.dirty = 'all';
  }

  /** gfx_element::mark_dirty: the RAM behind one code changed. */
  mark_dirty(code: number): void {
    if (!this.source || this.dirty === 'all') return;
    const dirty = this.dirty ?? new Set<number>();
    dirty.add(modulo(Math.trunc(Number(code)), this.set.count));
    this.dirty = dirty;
  }

  get_data(code: number): Uint8Array {
    const element = modulo(Math.trunc(code), this.decoded.count);
    const size = this.decoded.width * this.decoded.height;
    return this.decoded.pixels.subarray(element * size, (element + 1) * size);
  }

  draw(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    transparentMask = 0,
    priority?: GeneratedPriorityOp,
  ): void {
    const gfx = this.decoded;
    const element = modulo(code, gfx.count);
    const base = element * gfx.width * gfx.height;
    const colorBase = this.entry.colorBase + color * this.penGranularity;
    const direct = bitmap.direct;
    const directStartX = direct &&
        this.entry.xscale === direct.xScale &&
        this.entry.yscale === direct.yScale
      ? (sx - direct.scaledXOffset) / direct.xScale
      : NaN;
    const directStartY = direct
      ? (sy - direct.scaledYOffset) / direct.yScale
      : NaN;
    const directPixels = direct &&
        Number.isInteger(directStartX) &&
        Number.isInteger(directStartY)
      ? direct.pixels
      : undefined;
    for (let py = 0; py < gfx.height; py++) {
      const y = sy + py * this.entry.yscale;
      if (y < clip.min_y || y > clip.max_y) continue;
      const sourceY = flipY ? gfx.height - 1 - py : py;
      const outputY = directStartY + py;
      for (let px = 0; px < gfx.width; px++) {
        const x = sx + px * this.entry.xscale;
        if (x < clip.min_x || x > clip.max_x) continue;
        const sourceX = flipX ? gfx.width - 1 - px : px;
        const pen = gfx.pixels[base + sourceY * gfx.width + sourceX]!;
        if (transparentMask & (1 << pen)) continue;
        if (priority) {
          if (priority.kind === 'stamp') {
            // tilemap_t::draw: the drawn pixel records priority, and nothing
            // is ever rejected — the layer is what claims the pixel.
            priority.bitmap.set(
              x, y,
              (priority.bitmap.get(x, y) & priority.keep) | priority.value,
            );
          } else {
            // PIXEL_OP_REBASE_TRANSMASK_PRIORITY: claim the pixel either way,
            // but only paint it when nothing has claimed it already.
            const claimed = priority.bitmap.get(x, y);
            priority.bitmap.set(x, y, 31);
            if (((1 << (claimed & 0x1f)) & priority.mask) !== 0) continue;
          }
        }
        const packed = this.indexed
          ? colorBase + pen
          : this.palette.colors[colorBase + pen] ?? 0xff000000;
        const outputX = directStartX + px;
        if (
          directPixels &&
          outputX >= 0 && outputX < direct!.width &&
          outputY >= 0 && outputY < direct!.height
        ) {
          directPixels[outputY * direct!.width + outputX] = packed;
        } else if (bitmap.plotRect) {
          bitmap.plotRect(x, y, this.entry.xscale, this.entry.yscale, packed);
        } else {
          for (let yy = 0; yy < this.entry.yscale; yy++) {
            for (let xx = 0; xx < this.entry.xscale; xx++) {
              bitmap['pix='](y + yy, x + xx, packed);
            }
          }
        }
      }
    }
  }

  /**
   * The palette's shadow table, when a transtable has a pen that darkens and
   * the screen composes pens; otherwise the mask path draws it the same.
   */
  private shadowTable(drawModes: ArrayLike<number>): Uint32Array | undefined {
    if (!this.indexed) return undefined;
    const table = this.palette.shadows?.shadow_table();
    if (!table) return undefined;
    const pens = Math.min(drawModes.length, 1 << this.entry.layout.planes);
    for (let pen = 0; pen < pens; pen++) {
      if ((drawModes[pen] ?? DRAWMODE_NONE) > DRAWMODE_SOURCE) return table;
    }
    return undefined;
  }

  /** A transtable draw through shadowPixel, plain (`scale` absent) or zoomed. */
  private drawTable(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    scale: [number, number] | undefined,
    drawModes: ArrayLike<number>,
    shadow: Uint32Array,
    claim?: { bitmap: GeneratedPriorityBitmap; mask: number },
  ): void {
    const gfx = this.decoded;
    let width = gfx.width;
    let height = gfx.height;
    let xStep = this.entry.xscale;
    let yStep = this.entry.yscale;
    if (scale) {
      if (!(scale[0] > 0) || !(scale[1] > 0)) return;
      width = Math.max(1, Math.floor((gfx.width * scale[0] + 0x8000) / 0x10000));
      height = Math.max(1, Math.floor((gfx.height * scale[1] + 0x8000) / 0x10000));
      xStep = yStep = 1;
    }
    const base = modulo(code, gfx.count) * gfx.width * gfx.height;
    const colorBase = this.entry.colorBase + color * this.penGranularity;
    for (let dy = 0; dy < height; dy++) {
      const rawY = scale ? Math.min(gfx.height - 1, Math.floor(dy * gfx.height / height)) : dy;
      const sourceY = flipY ? gfx.height - 1 - rawY : rawY;
      for (let dx = 0; dx < width; dx++) {
        const rawX = scale ? Math.min(gfx.width - 1, Math.floor(dx * gfx.width / width)) : dx;
        const sourceX = flipX ? gfx.width - 1 - rawX : rawX;
        const pen = gfx.pixels[base + sourceY * gfx.width + sourceX]!;
        const mode = drawModes[pen] ?? DRAWMODE_NONE;
        if (mode === DRAWMODE_NONE) continue;
        for (let yy = 0; yy < yStep; yy++) {
          const y = sy + dy * yStep + yy;
          if (y < clip.min_y || y > clip.max_y) continue;
          for (let xx = 0; xx < xStep; xx++) {
            const x = sx + dx * xStep + xx;
            if (x < clip.min_x || x > clip.max_x) continue;
            shadowPixel(bitmap, x, y, mode, colorBase + pen, shadow, claim);
          }
        }
      }
    }
  }

  private drawZoom(
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    code: number,
    color: number,
    flipX: number,
    flipY: number,
    sx: number,
    sy: number,
    scaleX: number,
    scaleY: number,
    transparentMask: number,
    priority?: GeneratedPriorityOp,
  ): void {
    if (!(scaleX > 0) || !(scaleY > 0)) return;
    const gfx = this.decoded;
    const width = Math.max(1, Math.floor((gfx.width * scaleX + 0x8000) / 0x10000));
    const height = Math.max(1, Math.floor((gfx.height * scaleY + 0x8000) / 0x10000));
    const element = modulo(code, gfx.count);
    const base = element * gfx.width * gfx.height;
    const colorBase = this.entry.colorBase + color * this.penGranularity;
    for (let dy = 0; dy < height; dy++) {
      const y = sy + dy;
      if (y < clip.min_y || y > clip.max_y) continue;
      const rawY = Math.min(gfx.height - 1, Math.floor(dy * gfx.height / height));
      const sourceY = flipY ? gfx.height - 1 - rawY : rawY;
      for (let dx = 0; dx < width; dx++) {
        const x = sx + dx;
        if (x < clip.min_x || x > clip.max_x) continue;
        const rawX = Math.min(gfx.width - 1, Math.floor(dx * gfx.width / width));
        const sourceX = flipX ? gfx.width - 1 - rawX : rawX;
        const pen = gfx.pixels[base + sourceY * gfx.width + sourceX]!;
        if (transparentMask & (1 << pen)) continue;
        if (priority) {
          if (priority.kind === 'stamp') {
            priority.bitmap.set(
              x, y,
              (priority.bitmap.get(x, y) & priority.keep) | priority.value,
            );
          } else {
            const claimed = priority.bitmap.get(x, y);
            priority.bitmap.set(x, y, 31);
            if (((1 << (claimed & 0x1f)) & priority.mask) !== 0) continue;
          }
        }
        bitmap['pix='](
          y,
          x,
          this.indexed ? colorBase + pen : this.palette.colors[colorBase + pen] ?? 0xff000000,
        );
      }
    }
  }
}

/**
 * One pixel of a transtable draw whose pen darkens rather than paints:
 * PIXEL_OP_REBASE_TRANSTABLE16 and its _PRIORITY form (drawgfxt.ipp). A
 * shadow pen sends what the destination already holds through the palette's
 * shadow table. Under a priority claim the pixel also records the pen's draw
 * mode, and a source pen painting a DRAWMODE_SHADOW_PRI pixel paints
 * shadowed.
 */
function shadowPixel(
  bitmap: BitmapTarget,
  x: number,
  y: number,
  mode: number,
  source: number,
  shadow: Uint32Array,
  claim?: { bitmap: GeneratedPriorityBitmap; mask: number },
): void {
  if (!claim) {
    bitmap['pix='](y, x, mode === DRAWMODE_SOURCE ? source : shadow[(bitmap.pix?.(y, x) ?? 0) & 0xffff]!);
    return;
  }
  const priority = claim.bitmap.get(x, y);
  const open = ((1 << (priority & 0x1f)) & claim.mask) === 0;
  if (mode === DRAWMODE_SOURCE) {
    if (open) {
      bitmap['pix='](y, x, (priority & 0xc0) === (DRAWMODE_SHADOW_PRI << 6) ? shadow[source & 0xffff]! : source);
    }
    claim.bitmap.set(x, y, 31);
  } else if ((priority & 0x80) === 0 && open) {
    bitmap['pix='](y, x, shadow[(bitmap.pix?.(y, x) ?? 0) & 0xffff]!);
    claim.bitmap.set(x, y, priority | (mode << 6));
  }
}

/**
 * digfx.h's `gfx_layout` as a device builds one: its offset arrays sized to
 * MAX_GFX_PLANES and MAX_GFX_SIZE, of which the planes, width and height
 * count. An RGN_FRAC value keeps its fraction of the region.
 */
function structGfxLayout(layout: Record<string, unknown>): GeneratedGfxLayout {
  const offset = (value: unknown): number | string => {
    const bits = Number(value) >>> 0;
    if (!(bits & 0x80000000)) return bits;
    const rest = bits & 0x007fffff;
    return `RGN_FRAC(${(bits >>> 27) & 0x0f},${(bits >>> 23) & 0x0f})${rest ? `+${rest}` : ''}`;
  };
  const list = (value: unknown, count: number) => Array.from({ length: count }, (_unused, index) =>
    offset((value as ArrayLike<unknown> | undefined)?.[index] ?? 0));
  const width = Number(layout.width);
  const height = Number(layout.height);
  const planes = Number(layout.planes);
  return {
    width,
    height,
    total: offset(layout.total),
    planes,
    planeOffsets: list(layout.planeoffset, planes),
    xOffsets: list(layout.xoffset, width),
    yOffsets: list(layout.yoffset, height),
    charIncrement: Number(layout.charincrement),
  };
}

function drawModeMask(drawModes: ArrayLike<number>): number {
  let transparent = 0;
  for (let pen = 0; pen < Math.min(32, drawModes.length); pen++) {
    // DRAWMODE_NONE is zero. Shadow pens still participate in priority and
    // are drawn as their source color until the generic palette exposes its
    // shadow lookup tables.
    if ((drawModes[pen] ?? 0) === 0) transparent |= 1 << pen;
  }
  return transparent;
}

class GeneratedTilemap {
  /** Save-state roots (machine-state.ts): what the driver set; the tile cache derives from RAM. */
  stateKeys(): readonly string[] {
    return ['scrollX', 'scrollY', 'flip', 'active', 'dynamicTransmasks'];
  }

  stateRestored(): void {
    this.mark_all_dirty();
  }

  private readonly plan: GeneratedTilemapPlan;
  /** The share `tilemap_device::m_basemem` binds; see GeneratedTilemapPlan. */
  private readonly baseMemory?: Uint8Array;
  private readonly mapper?: GeneratedHandler;
  private readonly tileInfo?: GeneratedHandler;
  /** The get_info delegate of a tilemap a device created at run time. */
  private readonly tileInfoCall?: (tilemap: unknown, tileinfo: unknown, index: number) => unknown;
  /** tilemap_t::set_user_data, for a tilemap created at run time. */
  private userData?: unknown;
  private paletteOffset = 0;
  private readonly machine: BoardIr;
  private readonly bindings: () => GeneratedHandlerBindings;
  private readonly gfx: GeneratedGfxElement[];
  private readonly tiles: Array<TileInfo | undefined> = [];
  private readonly dirty: number[] = [];
  private readonly dirtyIndices = new Set<number>();
  private readonly scrollX: number[];
  private readonly scrollY: number[];
  private standardCacheComplete = false;
  private pixmapCacheComplete = false;
  private active = true;
  private flip = 0;
  private readonly pixmapBitmap: GeneratedIndexedBitmap;
  private readonly dynamicTransmasks = new Map<
    number,
    { foreground: number; background: number }
  >();

  constructor(
    plan: GeneratedTilemapPlan,
    machine: BoardIr,
    bindings: () => GeneratedHandlerBindings,
    gfx: GeneratedGfxElement[],
    baseMemory?: Uint8Array,
    tileInfoCall?: (tilemap: unknown, tileinfo: unknown, index: number) => unknown,
  ) {
    this.baseMemory = baseMemory;
    this.plan = plan;
    this.machine = machine;
    this.bindings = bindings;
    this.gfx = gfx;
    this.mapper = standardMapper(plan.mapper)
      ? undefined
      : requiredHandler(machine, plan.mapper);
    this.tileInfoCall = tileInfoCall;
    if (!tileInfoCall) this.tileInfo = requiredHandler(machine, plan.tileInfo);
    this.scrollX = new Array(plan.scrollRows ?? 1).fill(0);
    this.scrollY = new Array(plan.scrollColumns ?? 1).fill(0);
    this.pixmapBitmap = new GeneratedIndexedBitmap(
      plan.columns * plan.tileWidth,
      plan.rows * plan.tileHeight,
    );
  }

  /**
   * MAME `tilemap_device::basemem_read`/`basemem_write`, over the share the
   * device binds. A driver whose tilemaps are devices reads its own map this
   * way and owns no member for it at all.
   */
  basemem_read(offset: number): number {
    const bytes = this.baseMemory;
    if (!bytes) return 0;
    const index = Math.trunc(offset);
    if (index < 0) return 0;
    if ((this.plan.bytesPerEntry ?? 1) < 2) return bytes[index] ?? 0;
    const at = index * 2;
    if (this.wordShare()) return new Uint16Array(bytes.buffer, bytes.byteOffset + at, 1)[0]!;
    // An 8-bit bus stores the share byte by byte in its own order.
    return ((bytes[at] ?? 0) << 8) | (bytes[at + 1] ?? 0);
  }

  /**
   * A 16-bit big-endian bus keeps RAM as native words (bus.ts), so the share's
   * bytes are in host order, not the CPU's. Assembled big-endian here, every
   * Atari System 1 playfield word came back byte-swapped.
   */
  private wordShare(): boolean {
    const space = this.machine.execution.participants?.[0]?.space;
    return space?.dataWidth === 16 && space.endianness === 'big' && this.baseMemory?.byteLength !== undefined &&
      this.baseMemory.byteOffset % 2 === 0;
  }

  basemem_write(offset: number, data: number): void {
    const bytes = this.baseMemory;
    if (!bytes) return;
    const index = Math.trunc(offset);
    if (index < 0) return;
    if ((this.plan.bytesPerEntry ?? 1) < 2) bytes[index] = data & 0xff;
    else if (this.wordShare()) {
      new Uint16Array(bytes.buffer, bytes.byteOffset + index * 2, 1)[0] = data & 0xffff;
    } else {
      const at = index * 2;
      bytes[at] = (data >>> 8) & 0xff;
      bytes[at + 1] = data & 0xff;
    }
    this.mark_tile_dirty(index);
  }

  set_user_data(value: unknown): void {
    this.userData = value;
  }

  // The configuration a plan states for a tilemap the video compiler found,
  // set by the source itself on one a device created at run time.
  set_transparent_pen(pen: number): void {
    (this.plan as { transparentPen?: number }).transparentPen = Number(pen);
  }

  set_scrolldx(normal: number, flipped: number): void {
    (this.plan as { scrollDx?: [number, number] }).scrollDx = [Number(normal), Number(flipped)];
  }

  set_scrolldy(normal: number, flipped: number): void {
    (this.plan as { scrollDy?: [number, number] }).scrollDy = [Number(normal), Number(flipped)];
  }

  set_palette_offset(offset: number): void {
    this.paletteOffset = Number(offset);
  }

  user_data(): unknown {
    if (this.userData !== undefined) return this.userData;
    const source = this.plan.userDataMember
      ? this.bindings().members?.[this.plan.userDataMember]
      : undefined;
    return {
      generatedPointer: true,
      source: source as ArrayLike<number> & { [index: number]: number },
      offset: this.plan.userDataOffset ?? 0,
    };
  }

  pixmap(): GeneratedIndexedBitmap {
    const bitmap = this.pixmapBitmap;
    const clip = new GeneratedRectangle(0, bitmap.width - 1, 0, bitmap.height - 1);
    const draw = (row: number, column: number, index: number): void => {
      const tile = this.tileAt(index);
      this.gfx[tile.gfx]?.draw(
        bitmap,
        clip,
        tile.code,
        tile.color,
        tile.flags & 1,
        (tile.flags >> 1) & 1,
        column * this.plan.tileWidth,
        row * this.plan.tileHeight,
      );
    };
    if (!this.pixmapCacheComplete || this.mapper) {
      bitmap.fill(0);
      for (let row = 0; row < this.plan.rows; row++) {
        for (let column = 0; column < this.plan.columns; column++) {
          draw(row, column, mapStandardTile(
            this.plan.mapper,
            column,
            row,
            this.plan.columns,
            this.plan.rows,
          ));
        }
      }
      this.pixmapCacheComplete = !this.mapper;
      return bitmap;
    }
    for (const index of [...this.dirtyIndices]) {
      if (index < 0 || index >= this.plan.columns * this.plan.rows) continue;
      const row = this.plan.mapper === 'TILEMAP_SCAN_COLS'
        ? index % this.plan.rows
        : Math.floor(index / this.plan.columns);
      const column = this.plan.mapper === 'TILEMAP_SCAN_COLS'
        ? Math.floor(index / this.plan.rows)
        : index % this.plan.columns;
      draw(row, column, index);
    }
    return bitmap;
  }

  'pixmap&'(): {
    generatedPointer: true;
    source: GeneratedIndexedBitmap[];
    offset: number;
  } {
    return { generatedPointer: true, source: [this.pixmap()], offset: 0 };
  }

  mark_tile_dirty(index: number): void {
    if (Number.isInteger(index) && index >= 0) {
      this.dirty[index] = 1;
      this.dirtyIndices.add(index);
    }
  }

  mark_all_dirty(): void {
    this.tiles.length = 0;
    this.dirty.length = 0;
    this.dirtyIndices.clear();
    this.standardCacheComplete = false;
    this.pixmapCacheComplete = false;
  }

  set_flip(flags: number): void {
    this.flip = flags;
  }

  /** MAME tilemap_t::enable: disabled layers do not touch the destination. */
  enable(enabled: number): void {
    this.active = Boolean(enabled);
  }

  /** MAME tilemap_t::set_transmask, used by CPS1 priority groups each frame. */
  set_transmask(group: number, foreground: number, background: number): void {
    this.dynamicTransmasks.set(group | 0, {
      foreground: foreground >>> 0,
      background: background >>> 0,
    });
  }

  clear_transmasks(): void {
    this.dynamicTransmasks.clear();
  }

  set_scroll_cols(columns: number): void {
    this.scrollY.length = Math.max(1, columns | 0);
    this.scrollY.fill(0);
  }

  set_scroll_rows(rows: number): void {
    this.scrollX.length = Math.max(1, rows | 0);
    this.scrollX.fill(0);
  }

  set_scrolly(column: number, value: number): void {
    this.scrollY[modulo(column, this.scrollY.length)] = value;
  }

  set_scrollx(row: number, value: number): void {
    this.scrollX[modulo(row, this.scrollX.length)] = value;
  }

  private tileAt(tileIndex: number): TileInfo {
    let tile = this.tiles[tileIndex];
    const needsUpdate = !tile || this.dirty[tileIndex] === 1;
    if (!tile) {
      tile = { gfx: 0, code: 0, color: 0, flags: 0, category: 0, group: 0 };
      this.tiles[tileIndex] = tile;
    }
    if (needsUpdate) {
      Object.assign(tile, { gfx: 0, code: 0, color: 0, flags: 0, category: 0, group: 0 });
      const tileinfo = createGeneratedTileInfoTarget(tile);
      const bindings = this.bindings();
      const deviceTileInfo = this.tileInfoCall ?? bindings.referenceCalls?.[this.plan.tileInfo];
      if (deviceTileInfo) {
        deviceTileInfo(this, tileinfo, tileIndex);
      } else {
        executeGeneratedMachineProgram(
          this.machine,
          this.tileInfo!,
          bindings,
          { tilemap: this, tileinfo, tile_index: tileIndex },
        );
      }
      this.dirty[tileIndex] = 0;
      this.dirtyIndices.delete(tileIndex);
    }
    return tile;
  }

  /**
   * Refresh standard row/column tile caches once, in MAME traversal order,
   * before pruning a narrow partial clip. Galaxian-family writes call
   * update_partial before dirtying one tile, so the next scanline can refresh
   * that entry directly instead of rediscovering it among all 1,024 tiles.
   */
  private refreshStandardCache(flipX: boolean, flipY: boolean): void {
    if (this.mapper) return;
    const count = this.plan.columns * this.plan.rows;
    if (!this.standardCacheComplete) {
      for (let outputRow = 0; outputRow < this.plan.rows; outputRow++) {
        const row = flipY ? this.plan.rows - 1 - outputRow : outputRow;
        for (let outputColumn = 0; outputColumn < this.plan.columns; outputColumn++) {
          const column = flipX
            ? this.plan.columns - 1 - outputColumn
            : outputColumn;
          this.tileAt(mapStandardTile(
            this.plan.mapper,
            column,
            row,
            this.plan.columns,
            this.plan.rows,
          ));
        }
      }
      this.standardCacheComplete = true;
      return;
    }
    if (!this.dirtyIndices.size) return;
    const outputOrder = (tileIndex: number): number => {
      const row = this.plan.mapper === 'TILEMAP_SCAN_COLS'
        ? tileIndex % this.plan.rows
        : Math.floor(tileIndex / this.plan.columns);
      const column = this.plan.mapper === 'TILEMAP_SCAN_COLS'
        ? Math.floor(tileIndex / this.plan.rows)
        : tileIndex % this.plan.columns;
      const outputRow = flipY ? this.plan.rows - 1 - row : row;
      const outputColumn = flipX ? this.plan.columns - 1 - column : column;
      return outputRow * this.plan.columns + outputColumn;
    };
    const pending = [...this.dirtyIndices]
      .filter(index => index < count)
      .sort((left, right) => outputOrder(left) - outputOrder(right));
    for (const tileIndex of pending) this.tileAt(tileIndex);
  }

  draw(
    _screen: unknown,
    bitmap: BitmapTarget,
    clip: GeneratedRectangle,
    _flags: number,
    _priority = 0,
    _priorityMask = 0xff,
  ): void {
    if (!this.active) return;
    // The gfx elements draw from their own colour base; an offset on top of
    // it is not drawn yet, and must not be dropped silently.
    if (this.paletteOffset) throw new Error(`${this.machine.game}: a tilemap palette offset is not drawn`);
    // tilemap_t::configure_blit_parameters packs the pair into one code and
    // skips the priority bitmap entirely when it comes out as 0xff00 — the
    // default "I am not using priority" call every ordinary driver makes.
    const priority = generatedTilemapPriorityOp(_screen, _priority, _priorityMask);
    const members = this.bindings().members ?? {};
    const globalFlip = Number(members.__flip_screen ?? 0) ? 3 : 0;
    const mapFlip = this.flip | globalFlip;
    const flipX = Boolean(mapFlip & 1);
    const flipY = Boolean(mapFlip & 2);
    this.refreshStandardCache(flipX, flipY);
    // A scrolled tilemap paints each tile at an offset, so a tile range derived
    // from the clip alone stops covering the visible area: with scrollx 140 the
    // clip-derived columns paint x -140..115 while the screen needs 0..255, and
    // the wrapped copies land a whole map away. Walk the entire map whenever a
    // scroll is live, exactly as a multi-band scroll already does; the wrap loop
    // then places every tile and the clip rejects the rest.
    const xDelta = this.plan.scrollDx?.[flipX ? 1 : 0] ?? 0;
    const yDelta = this.plan.scrollDy?.[flipY ? 1 : 0] ?? 0;
    const scrollsVertically = Boolean(this.plan.scrollColumns) ||
      this.scrollY.some(value => value !== 0);
    const scrollsHorizontally = Boolean(this.plan.scrollRows) ||
      this.scrollX.some(value => value !== 0);
    const firstOutputRow = scrollsVertically
      ? 0
      : Math.max(0, Math.floor((clip.min_y - yDelta) / this.plan.tileHeight));
    const lastOutputRow = scrollsVertically
      ? this.plan.rows - 1
      : Math.min(
          this.plan.rows - 1,
          Math.floor((clip.max_y - yDelta) / this.plan.tileHeight),
        );
    const firstOutputColumn = scrollsHorizontally
      ? 0
      : Math.max(0, Math.floor((clip.min_x - xDelta) / this.plan.tileWidth));
    const lastOutputColumn = scrollsHorizontally
      ? this.plan.columns - 1
      : Math.min(
          this.plan.columns - 1,
          Math.floor((clip.max_x - xDelta) / this.plan.tileWidth),
        );
    const mapWidth = this.plan.columns * this.plan.tileWidth;
    const mapHeight = this.plan.rows * this.plan.tileHeight;
    for (let outputRow = firstOutputRow; outputRow <= lastOutputRow; outputRow++) {
      const row = flipY ? this.plan.rows - 1 - outputRow : outputRow;
      const scrollRow = generatedScrollBand(
        outputRow,
        this.plan.rows,
        this.scrollX.length,
      );
      const xScroll = this.scrollX[scrollRow] ?? 0;
      // A single vertical scroll value applies to the whole row.  Reject the
      // other rows before walking their columns; partial-update games would
      // otherwise visit every cell in a 32x32 map for each scanline merely
      // because scrolling is enabled.
      if (this.scrollY.length === 1) {
        const y = outputRow * this.plan.tileHeight - (this.scrollY[0] ?? 0) + yDelta;
        const firstWrappedY = modulo(y, mapHeight) - mapHeight;
        let visible = false;
        for (
          let wrappedY = firstWrappedY;
          wrappedY <= firstWrappedY + mapHeight * 2;
          wrappedY += mapHeight
        ) {
          if (
            wrappedY <= clip.max_y &&
            wrappedY + this.plan.tileHeight > clip.min_y
          ) {
            visible = true;
            break;
          }
        }
        if (!visible) continue;
      }
      for (
        let outputColumn = firstOutputColumn;
        outputColumn <= lastOutputColumn;
        outputColumn++
      ) {
        const column = flipX ? this.plan.columns - 1 - outputColumn : outputColumn;
        const scrollColumn = generatedScrollBand(
          outputColumn,
          this.plan.columns,
          this.scrollY.length,
        );
        const yScroll = this.scrollY[scrollColumn] ?? 0;
        const y = outputRow * this.plan.tileHeight - yScroll + yDelta;
        const firstWrappedY = modulo(y, mapHeight) - mapHeight;
        let intersectsVerticalClip = false;
        for (
          let wrappedY = firstWrappedY;
          wrappedY <= firstWrappedY + mapHeight * 2;
          wrappedY += mapHeight
        ) {
          if (
            wrappedY <= clip.max_y &&
            wrappedY + this.plan.tileHeight > clip.min_y
          ) {
            intersectsVerticalClip = true;
            break;
          }
        }
        if (!intersectsVerticalClip) continue;
        const x = outputColumn * this.plan.tileWidth - xScroll + xDelta;
        const firstWrappedX = modulo(x, mapWidth) - mapWidth;
        let intersectsHorizontalClip = false;
        for (
          let wrappedX = firstWrappedX;
          wrappedX <= firstWrappedX + mapWidth * 2;
          wrappedX += mapWidth
        ) {
          if (
            wrappedX <= clip.max_x &&
            wrappedX + this.plan.tileWidth > clip.min_x
          ) {
            intersectsHorizontalClip = true;
            break;
          }
        }
        if (!intersectsHorizontalClip) continue;
        const mapped = this.mapper
          ? executeGeneratedMachineProgram(
              this.machine,
              this.mapper,
              this.bindings(),
              {
                col: column,
                row,
                num_cols: this.plan.columns,
                num_rows: this.plan.rows,
              },
            ).value
          : mapStandardTile(this.plan.mapper, column, row, this.plan.columns, this.plan.rows);
        const tileIndex = generatedTileMemoryIndex(mapped);
        const tile = this.tileAt(tileIndex);
        // Preserve tile-cache update timing even when a tile is outside this
        // partial clip; callbacks can depend on live video attributes. The
        // expensive category, mask and graphics work is unnecessary once the
        // cache matches the source renderer's state.
        if (!intersectsVerticalClip) continue;
        if (!generatedTileCategoryMatches(tile.category, _flags)) continue;
        const gfx = this.gfx[tile.gfx];
        if (!gfx) continue;
        const tileFlipX = Boolean(tile.flags & 1) !== flipX;
        const tileFlipY = Boolean(tile.flags & 2) !== flipY;
        let transparentMask = 0;
        if (!(_flags & 0x80)) {
          const dynamicMask = this.dynamicTransmasks.get(tile.group);
          const groupMask = dynamicMask
            ? generatedTileTransparentMask(dynamicMask, _flags)
            : generatedTileGroupTransparentMask(this.plan, tile.group, _flags);
          if (groupMask !== undefined) {
            transparentMask = groupMask;
          } else if (this.plan.transparentIndirect !== undefined) {
            transparentMask = generatedTileGroupIndirectMask(
              gfx,
              tile.group,
              this.plan.transparentIndirect,
            );
          } else if (this.plan.transparentPen !== undefined) {
            transparentMask = 1 << this.plan.transparentPen;
          }
        }
        // TILE_FORCE_LAYER0: the tile declares every pixel opaque regardless
        // of the tilemap's transparent pen (m52 status rows are the canonical
        // case; the wrapped copy of those rows also covers the bottom lines).
        if (tile.flags & 0x10) transparentMask = 0;
        for (
          let wrappedX = firstWrappedX;
          wrappedX <= firstWrappedX + mapWidth * 2;
          wrappedX += mapWidth
        ) {
          if (
            wrappedX > clip.max_x ||
            wrappedX + this.plan.tileWidth <= clip.min_x
          ) {
            continue;
          }
          for (
            let wrappedY = firstWrappedY;
            wrappedY <= firstWrappedY + mapHeight * 2;
            wrappedY += mapHeight
          ) {
            if (
              wrappedY > clip.max_y ||
              wrappedY + this.plan.tileHeight <= clip.min_y
            ) {
              continue;
            }
            gfx.draw(
              bitmap,
              clip,
              tile.code,
              tile.color,
              Number(tileFlipX),
              Number(tileFlipY),
              wrappedX,
              wrappedY,
              transparentMask,
              priority,
            );
          }
        }
      }
    }
  }
}

/**
 * The priority operation a tilemap_t::draw performs, or undefined when MAME
 * would leave the priority bitmap alone. MAME encodes the pair as
 * `priority | (priority_mask << 8)` and short-circuits on 0xff00, which is
 * what an unspecified priority with the default 0xff mask produces.
 */
function generatedTilemapPriorityOp(
  screen: unknown,
  priority: number,
  priorityMask: number,
): GeneratedPriorityOp | undefined {
  const code = (priority & 0xff) | ((priorityMask & 0xff) << 8);
  if (code === 0xff00) return undefined;
  const bitmap = (screen as { priority?: () => unknown } | undefined)?.priority?.();
  if (!(bitmap instanceof GeneratedPriorityBitmap)) return undefined;
  return { kind: 'stamp', bitmap, value: priority & 0xff, keep: priorityMask & 0xff };
}

export function generatedTileGroupTransparentMask(
  plan: GeneratedTilemapPlan,
  group: number,
  flags: number,
): number | undefined {
  const mask = plan.transmasks?.find(candidate => candidate.group === group);
  if (!mask) return undefined;
  return generatedTileTransparentMask(mask, flags);
}

function generatedTileTransparentMask(
  mask: { foreground: number; background: number },
  flags: number,
): number {
  const layers = flags & 0x70;
  if (layers === 0) return mask.foreground;
  let transparent = 0;
  if (layers & 0x10) transparent |= mask.foreground;
  if (layers & 0x20) transparent |= mask.background;
  if (layers & 0x40) transparent = 0xffffffff;
  return transparent >>> 0;
}

/** TILEMAP_DRAW_ALL_CATEGORIES bypasses the category encoded in the low flag bits. */
export function generatedTileCategoryMatches(category: number, flags: number): boolean {
  return Boolean(flags & 0x200) || category === (flags & 0x0f);
}

/**
 * MAME configure_groups precomputes one transparency mask per tile group.
 * A tile's palette color may subsequently select a different high bank while
 * its group deliberately remains on the low color bits (Bank Panic does this
 * with m_color_hi). Recomputing from tile.color makes that high bank opaque.
 */
export function generatedTileGroupIndirectMask(
  gfx: { indirectMask(color: number, transparent: number): number },
  group: number,
  transparent: number,
): number {
  return gfx.indirectMask(group, transparent);
}

export function generatedTileMemoryIndex(mapped: unknown): number {
  const index = Number(mapped);
  if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) {
    throw new Error(`generated tile mapper returned invalid memory index ${String(mapped)}`);
  }
  return index;
}

/** MAME scroll rows/columns divide a tilemap into contiguous equal bands. */
export function generatedScrollBand(
  tile: number,
  tileCount: number,
  bands: number,
): number {
  if (tileCount <= 0 || bands <= 1) return 0;
  return Math.min(bands - 1, Math.floor(tile * bands / tileCount));
}






/**
 * A palette whose colours a source-derived routine writes, one pen at a time.
 *
 * MAME's `palette_device` takes that routine as a constructor argument, and it
 * calls `set_pen_color(index, rgb)` -- which is exactly what this collects.
 * Nothing here knows what the colours are: the Game Boy's four greens come
 * from `gb_state::gb_palette`, and another machine's from its own routine.
 */
class GeneratedInitialisedPalette implements GeneratedPaletteDevice {
  /** Save-state roots (machine-state.ts). */
  stateKeys(): readonly string[] {
    return ['colors', 'entryColors', 'indirect', 'indirectColors', 'contrast'];
  }

  /** The colours the screen shows: each entry under the palette's contrast. */
  readonly colors: Uint32Array;
  /** palette_t's own entries, which entry_color() answers (palette.cpp). */
  private readonly entryColors: Uint32Array;
  /** device_palette_interface's m_indirect_pens and m_indirect_colors (dipalette.cpp). */
  private readonly indirect: Uint16Array;
  private readonly indirectColors: Uint32Array;
  /** palette_t::m_contrast, a float. */
  private contrast = 1;

  constructor(entries: number, indirectEntries = 0) {
    this.colors = new Uint32Array(Math.max(1, entries)).fill(0xff000000);
    this.entryColors = this.colors.slice();
    this.indirectColors = new Uint32Array(indirectEntries).fill(0xff000000);
    // allocate_palette points each pen at `pen % indirect_colors`; a palette
    // with no indirect colours has no indirect pens at all.
    this.indirect = indirectEntries
      ? Uint16Array.from({ length: this.colors.length }, (_, pen) => pen % indirectEntries)
      : new Uint16Array(0);
  }

  /** palette_t::entry_set_color, then update_adjusted_color for that entry. */
  private setEntry(pen: number, color: number): void {
    if (pen < 0 || pen >= this.entryColors.length) return;
    this.entryColors[pen] = color >>> 0;
    this.colors[pen] = this.contrast === 1 ? color >>> 0 : adjustedColor(color, this.contrast);
  }

  set_pen_color(pen: number, colorOrRed: number, green?: number, blue?: number): void {
    // MAME has both overloads: a packed rgb_t, and three channels. Both land
    // in canvas order, which is how the interpreter builds an rgb_t too; the
    // three-channel form was packed ARGB, swapping red and blue.
    const color = green === undefined
      ? colorOrRed >>> 0
      : packRgb(colorOrRed & 0xff, green & 0xff, (blue ?? 0) & 0xff);
    this.setEntry(pen, color);
  }

  /**
   * `set_pen_colors(base, colors)`: a whole table of rgb_t from `base` on --
   * the Spectrum's 16 pens, or the std::vector compute_res_net_all fills.
   */
  set_pen_colors(base: number, colors: ArrayLike<number>, count = colors.length): void {
    for (let index = 0; index < count; index++) this.set_pen_color(base + index, Number(colors[index]));
  }

  /** set_indirect_color: every pen that points at the colour takes it. */
  set_indirect_color(index: number, color: number): void {
    if (index < 0 || index >= this.indirectColors.length) return;
    this.indirectColors[index] = color >>> 0;
    for (let pen = 0; pen < this.indirect.length; pen++) {
      if (this.indirect[pen] === index) this.setEntry(pen, this.indirectColors[index]!);
    }
  }

  set_pen_indirect(pen: number, index: number): void {
    if (pen < 0 || pen >= this.indirect.length) return;
    this.indirect[pen] = index & 0xffff;
    this.setEntry(pen, this.indirectColors[index] ?? 0xff000000);
  }

  pen_indirect(pen: number): number {
    return this.indirect[pen] ?? 0;
  }

  indirect_entries(): number {
    return this.indirectColors.length;
  }

  /**
   * `palette.palette()`: the palette_t. normalize_range is dkong's tri-state
   * black; num_colors, entry_color and set_contrast are how Irem's M62 finds
   * its brightest entry and lifts every palette to it.
   */
  palette(): Record<string, (...args: number[]) => number> {
    return {
      num_colors: () => this.entryColors.length,
      entry_color: index => this.entryColors[index] ?? 0xff000000,
      set_contrast: contrast => {
        this.contrast = Math.fround(contrast);
        for (let pen = 0; pen < this.entryColors.length; pen++) this.setEntry(pen, this.entryColors[pen]!);
        return 0;
      },
      normalize_range: (start, end, lumMin = 0, lumMax = 255) => {
        normalizePaletteRange(this.entryColors, { start, end, lumMin, lumMax });
        for (let pen = start; pen <= end && pen < this.entryColors.length; pen++) this.setEntry(pen, this.entryColors[pen]!);
        return 0;
      },
    };
  }

  /** dipalette.cpp transpen_mask: the pens whose indirect value is the transparent one. */
  transpen_mask(gfx: GeneratedGfxElement, color: number, transparent: number): number {
    let mask = 0;
    const base = gfx.entry.colorBase + color * gfx.granularity();
    const count = Math.max(0, Math.min(gfx.granularity(), this.indirect.length - base));
    for (let pen = 0; pen < count; pen++) {
      if (this.indirect[base + pen] === transparent) mask |= 1 << pen;
    }
    return mask;
  }

  /** A pen that resolves to black, as the PROM palette answers it. */
  black_pen(): number {
    for (let pen = 0; pen < this.colors.length; pen++) {
      if (this.colors[pen] === 0xff000000) return pen;
    }
    return 0;
  }

  pens(): Uint32Array { return this.colors; }
}

/**
 * Hardware-neutral MAME video services. All layouts, palette wiring,
 * tile callbacks, sprite loops and initial state come from generated IR.
 */
export class GeneratedMameVideoPrimitives implements GeneratedVideoPrimitives, Renderer {
  /** Save-state roots (machine-state.ts); tilemaps and gfx handles are reached through the driver state. */
  stateKeys(): readonly string[] {
    return [
      'gfx', 'palette', 'palettes', 'ramPalette', 'bitmapPalette', 'priorityBitmap',
      'shadowGroups',
    ];
  }

  stateRestored(): void {
    this.ramPaletteMirror = undefined;
  }

  readonly width: number;
  readonly height: number;
  private readonly machine: BoardIr;
  private readonly regions: Regions;
  private readonly shares: Record<string, Uint8Array>;
  /** A generated device's members, by tag (set by the board that built it). */
  deviceMembers?: (tag: string) => Record<string, unknown> | undefined;
  private readonly state: Record<string, unknown>;
  private readonly gfx: GeneratedGfxElement[];
  private readonly palette?: GeneratedPaletteDevice;
  private readonly palettes = new Map<string, GeneratedPaletteDevice>();
  private readonly ramPalette?: GeneratedRamPalette;
  private readonly bitmapPalette?: GeneratedBitmapPalette;
  private readonly shadowGroups?: GeneratedPaletteShadows;
  private readonly gfxByDecode = new Map<string, GeneratedGfxElement[]>();
  private readonly bindings: GeneratedHandlerBindings;
  private readonly memoryRead?: (address: number) => number;
  private readonly vectorPoints?: () => readonly number[];
  private ramPaletteMirror?: Uint16Array;
  private priorityBitmap?: GeneratedPriorityBitmap;

  constructor(
    machine: BoardIr,
    regions: Regions,
    state: Record<string, unknown>,
    bindings: GeneratedHandlerBindings,
    updatePartial?: (line: number) => void,
    memoryRead?: (address: number) => number,
    shares: Record<string, Uint8Array> = {},
    /** vector_device's display list: x, y, rgb, intensity per point. */
    vectorPoints?: () => readonly number[],
  ) {
    this.machine = machine;
    this.regions = regions;
    this.shares = shares;
    this.state = state;
    this.memoryRead = memoryRead;
    this.vectorPoints = vectorPoints;
    this.width = machine.execution.screen.width;
    this.height = machine.execution.screen.height;
    for (const [tag, bytes] of Object.entries(regions)) {
      const member = `m_${tag.replace(/[^A-Za-z0-9_]/g, '_')}`;
      if (!Object.hasOwn(state, member)) state[member] = bytes;
    }
    for (const [member, value] of Object.entries(machine.video?.initialState ?? {})) {
      // Driver-state scalars are materialised as zero before video setup so
      // handlers can safely read them before their first write.  That storage
      // value is not an initialization decision: video_start and machine
      // configuration assignments compiled into initialState must still win.
      // M72, for example, selects tile gfx 1/2 here; preserving the earlier
      // zero makes both tilemaps decode their codes as sprite graphics.
      state[member] = Array.isArray(value) ? [...value] : value;
    }
    const bitmapPlan = machine.video?.bitmap;
    if (bitmapPlan && !ArrayBuffer.isView(state[bitmapPlan.member])) {
      state[bitmapPlan.member] = new Uint8Array(
        (bitmapPlan.rowStart + bitmapPlan.rows) * bitmapPlan.bytesPerRow,
      );
    }
    if (machine.video?.palette) {
      this.palettes.set('m_palette', new GeneratedPalette(machine.video.palette, regions));
    }
    const ramPalettePlan = machine.video?.ramPalette;
    if (ramPalettePlan) {
      this.ramPalette = new GeneratedRamPalette(
        ramPalettePlan,
        shares,
        generatedBusWrittenShares(machine),
      );
      this.palettes.set('m_palette', this.ramPalette);
    }
    if (bitmapPlan?.paletteRam) {
      this.bitmapPalette = new GeneratedBitmapPalette(bitmapPlan.paletteRam, this.paletteConverter(bitmapPlan.paletteRam));
      this.palettes.set(bitmapPlan.paletteRam.member, this.bitmapPalette);
    }
    // Each palette_device MAME hands an init routine: the pens it sets are the
    // palette. The gfx decode names each by its finder.
    for (const init of machine.execution.paletteInits ?? []) {
      if (this.palettes.has(init.member)) continue;
      this.palettes.set(init.member, new GeneratedInitialisedPalette(init.entries ?? 0, init.indirectEntries ?? 0));
    }
    this.palette = this.palettes.get('m_palette') ?? this.palettes.values().next().value;
    // A palette with neither a decoded PROM nor an init routine: the driver
    // sets every pen itself as the game runs (Missile Command's palette_w).
    if (!this.palette && machine.execution.paletteDevice) {
      this.palette = new GeneratedInitialisedPalette(machine.execution.paletteDevice.entries);
    }
    // palette_device's read accessor is a framework service. Generated
    // screen handlers read the same colors the host uses to resolve pens.
    // device_palette_interface::allocate_color_tables: on a bitmap_ind16
    // screen the pen table is a 1:1 map of indices, which the screen resolves
    // on output; only a bitmap_rgb32 screen's pens are the colours. Popeye
    // draws its sprites through `&m_palette->pen(base)`, and colours there
    // stored RGB words into an indexed bitmap: every sprite came out black.
    const indexedPens = isIndexedScreen(machine);
    for (const palette of new Set([...this.palettes.values(), this.palette])) {
      if (!palette) continue;
      palette.pen_color ??= pen => palette.colors[pen] ?? 0xff000000;
      // `palette.pen(n)`, and `&palette.pen(n)` as a pointer into the pens.
      const pens = palette as unknown as Record<string, unknown>;
      let identity: Uint32Array | undefined;
      const penTable = (): ArrayLike<number> & { [index: number]: number } => {
        if (!indexedPens) return palette.colors;
        if (!identity || identity.length < palette.colors.length + 2) {
          identity = Uint32Array.from({ length: palette.colors.length + 2 }, (_, index) => index);
        }
        return identity;
      };
      pens.pen ??= (pen: number) => indexedPens ? Number(pen) : palette.colors[pen] ?? 0xff000000;
      pens['pen&'] ??= (pen: number) => ({ generatedPointer: true, source: penTable(), offset: Number(pen) });
      // device_palette_interface::entries(): the base colours, which a
      // device sizes its colour codes from (konami_decode_gfx).
      (palette as { entries?: () => number }).entries ??= () => palette.colors.length;
    }
    // The shadow services belong to the palette, which the driver and its
    // devices both reach (`m_palette->set_shadow_factor`, `palette()`).
    const groups = machine.video?.paletteGroups;
    if (groups && this.palette) {
      const shadows = new GeneratedPaletteShadows(groups);
      this.shadowGroups = shadows;
      Object.assign(this.palette, {
        shadows,
        shadows_enabled: () => shadows.shadowGroup ? 1 : 0,
        highlights_enabled: () => shadows.highlightGroup ? 1 : 0,
        shadow_table: () => shadows.shadow_table() ?? 0,
        set_shadow_mode: (mode: number) => shadows.set_shadow_mode(Number(mode)),
        set_shadow_factor: (factor: number) => shadows.set_shadow_factor(Number(factor)),
        set_highlight_factor: (factor: number) => shadows.set_highlight_factor(Number(factor)),
      });
    }
    const indexed = isIndexedScreen(machine);
    this.gfx = (machine.video?.gfx ?? []).map(entry => {
      const stateRegion = state[`m_${entry.region.replace(/[^A-Za-z0-9_]/g, '_')}`];
      const region = entry.ram && ArrayBuffer.isView(stateRegion)
        ? stateRegion as Uint8Array
        : regions[entry.region] ?? (
          ArrayBuffer.isView(stateRegion) ? stateRegion as Uint8Array : undefined
        );
      // GFXDECODE_RAM(nullptr, ...): the driver points the set at its memory
      // with set_source; until then it decodes nothing.
      const sourceless = entry.ram && !region && entry.region === 'nullptr';
      if (!region && !sourceless) throw new Error(`${machine.game}: missing gfx region "${entry.region}"`);
      const palette = entry.paletteMember
        ? this.palettes.get(entry.paletteMember)
        : this.palette;
      if (!palette) {
        throw new Error(
          `${machine.game}: gfx region "${entry.region}" has no generated palette`,
        );
      }
      const gfx = new GeneratedGfxElement(
        entry,
        decodeGfx(entry.layout, region ?? new Uint8Array(0), sourceless ? 0 : entry.offset),
        palette,
        indexed,
      );
      if (entry.decodeMember) {
        const group = this.gfxByDecode.get(entry.decodeMember) ?? [];
        group.push(gfx);
        this.gfxByDecode.set(entry.decodeMember, group);
      }
      return gfx;
    });
    // Layouts a driver builds graphics sets from at run time, reachable by
    // their source names (`objlayout_4bpp`).
    for (const [name, layout] of Object.entries(machine.video?.gfxLayouts ?? {})) {
      state[name] = { gfxLayout: layout };
    }
    const sizeOfWidth = (value: unknown): number => {
      const bitmap = value as { width?: number | (() => number); direct?: { width: number } };
      return Number(typeof bitmap.width === 'function' ? bitmap.width() : bitmap.width ?? bitmap.direct?.width ?? 0);
    };
    const sizeOfHeight = (value: unknown): number => {
      const bitmap = value as { height?: number | (() => number); direct?: { height: number } };
      return Number(typeof bitmap.height === 'function' ? bitmap.height() : bitmap.height ?? bitmap.direct?.height ?? 0);
    };
    const copyBitmap = (args: unknown[], transparent = false): number => {
      const [dest, src, flipX, flipY, x0, y0, clip, pen] = args.map(generatedArgumentValue);
      const target = dest as BitmapTarget | undefined;
      const source = src as BitmapTarget | undefined;
      const rect = clip as GeneratedRectangle | undefined;
      if (!target || !source?.pix || !rect) return 0;
      const width = sizeOfWidth(source);
      const height = sizeOfHeight(source);
      let destX = Number(x0);
      let destY = Number(y0);
      let endX = destX + width - 1;
      let endY = destY + height - 1;
      if (destX > rect.max_x || endX < rect.min_x || destY > rect.max_y || endY < rect.min_y) return 0;
      let srcX = 0;
      let srcY = 0;
      if (destX < rect.min_x) { srcX = rect.min_x - destX; destX = rect.min_x; }
      if (destY < rect.min_y) { srcY = rect.min_y - destY; destY = rect.min_y; }
      endX = Math.min(endX, rect.max_x);
      endY = Math.min(endY, rect.max_y);
      const stepX = Number(flipX) ? -1 : 1;
      const stepY = Number(flipY) ? -1 : 1;
      if (stepX < 0) srcX = width - 1 - srcX;
      if (stepY < 0) srcY = height - 1 - srcY;
      for (let y = destY, sy = srcY; y <= endY; y++, sy += stepY) {
        for (let x = destX, sx = srcX; x <= endX; x++, sx += stepX) {
          const value = source.pix(sy, sx);
          if (!transparent || value !== Number(pen)) target['pix='](y, x, value);
        }
      }
      return 0;
    };
    const copyScrollBitmap = (args: unknown[], transparent: boolean): number => {
      const [dest, src, rowsRaw, rowScroll, colsRaw, colScroll, clipRaw, pen] = args.map(generatedArgumentValue);
      const clip = clipRaw as GeneratedRectangle | undefined;
      if (!dest || !src || !clip) return 0;
      const numRows = Number(rowsRaw);
      const numCols = Number(colsRaw);
      const width = sizeOfWidth(src);
      const height = sizeOfHeight(src);
      const destWidth = sizeOfWidth(dest);
      const destHeight = sizeOfHeight(dest);
      const copy = (sx: number, sy: number, rect: GeneratedRectangle) =>
        copyBitmap([dest, src, 0, 0, sx, sy, rect, pen], transparent);
      const scroll = (table: unknown, index: number) => Number(generatedElement(table, index));
      const normalize = (value: number, size: number) => value >= 0 ? value % size : size - (-value) % size;
      const intersect = (a: GeneratedRectangle, minX: number, maxX: number, minY: number, maxY: number) =>
        new GeneratedRectangle(Math.max(a.min_x, minX), Math.min(a.max_x, maxX), Math.max(a.min_y, minY), Math.min(a.max_y, maxY));
      if (numRows === 0 && numCols === 0) return copy(0, 0, clip);
      if (numRows <= 1 && numCols <= 1) {
        const xscroll = normalize(numRows === 0 ? 0 : scroll(rowScroll, 0), width);
        const yscroll = normalize(numCols === 0 ? 0 : scroll(colScroll, 0), height);
        for (let sx = xscroll - width; sx < destWidth; sx += width) {
          for (let sy = yscroll - height; sy < destHeight; sy += height) copy(sx, sy, clip);
        }
      } else if (numRows <= 1) {
        const xscroll = normalize(numRows === 0 ? 0 : scroll(rowScroll, 0), width);
        const colWidth = Math.trunc(width / numCols);
        for (let col = 0, group = 1; col < numCols; col += group) {
          const raw = scroll(colScroll, col);
          for (group = 1; col + group < numCols && scroll(colScroll, col + group) === raw; group++);
          const yscroll = normalize(raw, height);
          for (let sx = xscroll - width; sx < destWidth; sx += width) {
            const sub = intersect(clip, col * colWidth + sx, (col + group) * colWidth - 1 + sx, clip.min_y, clip.max_y);
            for (let sy = yscroll - height; sy < destHeight; sy += height) copy(sx, sy, sub);
          }
        }
      } else if (numCols <= 1) {
        const yscroll = normalize(numCols === 0 ? 0 : scroll(colScroll, 0), height);
        const rowHeight = Math.trunc(height / numRows);
        for (let row = 0, group = 1; row < numRows; row += group) {
          const raw = scroll(rowScroll, row);
          for (group = 1; row + group < numRows && scroll(rowScroll, row + group) === raw; group++);
          const xscroll = normalize(raw, width);
          for (let sy = yscroll - height; sy < destHeight; sy += height) {
            const sub = intersect(clip, clip.min_x, clip.max_x, row * rowHeight + sy, (row + group) * rowHeight - 1 + sy);
            for (let sx = xscroll - width; sx < destWidth; sx += width) copy(sx, sy, sub);
          }
        }
      }
      return 0;
    };
    const drawScanline = (args: unknown[]): number => {
      const [bitmap, destx, desty, length, source, paldata] = args.map(generatedArgumentValue);
      const target = bitmap as BitmapTarget | undefined;
      if (!target) return 0;
      for (let index = 0; index < Number(length); index++) {
        const pen = Number(generatedElement(source, index));
        target['pix='](Number(desty), Number(destx) + index, paldata ? Number(generatedElement(paldata, pen)) : pen);
      }
      return 0;
    };
    const referenceCalls: NonNullable<GeneratedHandlerBindings['referenceCalls']> = {
      ...bindings.referenceCalls,
      // gfx_element(palette, layout, srcdata, xormask, total_colors, color_base).
      'std::make_unique<gfx_element>': (...args) => this.makeGfxElement(...args),
      'std::make_unique': (...args) => new GeneratedIndexedBitmap(
        Math.max(1, Number(generatedArgumentValue(args[0]) ?? this.width)),
        Math.max(1, Number(generatedArgumentValue(args[1]) ?? this.height)),
      ),
      memregion: (...args) => {
        const tag = String(generatedArgumentValue(args[0]) ?? '');
        const bytes = regions[tag];
        if (!bytes) throw new Error(`${machine.game}: missing video ROM region "${tag}"`);
        return {
          base: () => bytes,
          bytes: () => bytes.length,
          // `&region->as_u8(offset)`: memory from that byte on.
          'as_u8&': (offset = 0) => ({ generatedPointer: true, source: bytes, offset }),
          as_u8: (offset = 0) => bytes[offset] ?? 0,
        };
      },
      rectangle: (...args) => new GeneratedRectangle(
        Number(args[0] ?? 0),
        Number(args[1] ?? 0),
        Number(args[2] ?? 0),
        Number(args[3] ?? 0),
      ),
      'machine().tilemap().mark_all_dirty': () => {
        for (const plan of machine.video?.tilemaps ?? []) {
          (state[plan.member] as GeneratedTilemap | undefined)?.mark_all_dirty();
        }
        return 0;
      },
      // drawgfx.cpp's draw_scanline16/32 (drawscanline_core): `length` pens
      // from a row buffer into the bitmap at (destx, desty), each through
      // paldata when one is given. Pole Position draws its road this way.
      draw_scanline16: (...args) => drawScanline(args),
      draw_scanline32: (...args) => drawScanline(args),
      // drawgfxt.ipp's copybitmap_core: src into dest at (destx, desty),
      // clipped to cliprect, read from the far edge when flipped; the _trans
      // form skips its transparent pen. Venture copies its background this way.
      copybitmap: (...args) => copyBitmap(args),
      copybitmap_trans: (...args) => copyBitmap(args, true),
      // drawgfx.cpp's copyscrollbitmap_trans_common: the source tiled across
      // the destination at its row or column scrolls. Taito SJ composes its
      // three playfields this way.
      copyscrollbitmap: (...args) => copyScrollBitmap(args, false),
      copyscrollbitmap_trans: (...args) => copyScrollBitmap(args, true),
      [TILEMAP_SET_FLIP_ALL]: (...args) => {
        const flags = Number(generatedArgumentValue(args[0]) ?? 0);
        for (const plan of machine.video?.tilemaps ?? []) {
          (state[plan.member] as GeneratedTilemap | undefined)?.set_flip(flags);
        }
        return 0;
      },
    };
    const callParameters: NonNullable<GeneratedHandlerBindings['callParameters']> = {
      ...bindings.callParameters,
    };
    for (const [member, target] of Object.entries(machine.video?.delegates ?? {})) {
      if (target === null) {
        state[member] = { isnull: () => 1 };
        continue;
      }
      const handler = requiredHandler(machine, target);
      if (handler.program!.operations.length === 0) {
        referenceCalls[member] = () => 0;
        callParameters[member] = parameterDeclarations(handler.parameters);
        state[member] = { isnull: () => 0 };
        continue;
      }
      // Parsed once per delegate, not once per call: these run per tile and
      // per pixel, and re-splitting the signature there was measurable.
      const names = parameterNames(handler.parameters);
      referenceCalls[member] = (...args) => executeGeneratedMachineProgram(
        machine,
        handler,
        this.bindings,
        Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0])),
      ).value ?? 0;
      callParameters[member] = parameterDeclarations(handler.parameters);
      state[member] = { isnull: () => 0 };
    }
    state.m_screen = {
      __frame: 0,
      frame_number(this: { __frame: number }) { return this.__frame; },
      vpos: () => bindings.calls?.['m_screen.vpos']?.() ?? 0,
      width: () => this.width,
      height: () => this.height,
      update_partial: (line: number) => updatePartial?.(line),
      priority: () => this.screenPriority(),
      visible_area: () => new GeneratedRectangle(
        0,
        machine.execution.screen.width * (machine.video?.renderScale?.x ?? 1) - 1,
        machine.execution.screen.yOffset ?? 0,
        (machine.execution.screen.yOffset ?? 0) + machine.execution.screen.height - 1,
      ),
    };
    this.bindings = {
      ...bindings,
      members: state,
      referenceCalls,
      callParameters,
    };
    if (this.palette) {
      state.m_gfxdecode = this.gfxDecodeInterface(this.gfx);
      state.m_palette = this.palette;
    }
    for (const [member, palette] of this.palettes) {
      state[member] = palette;
    }
    for (const [member, gfx] of this.gfxByDecode) {
      state[member] = this.gfxDecodeInterface(gfx);
    }
    const createdTilemaps: GeneratedTilemap[] = [];
    for (const plan of machine.video?.tilemaps ?? []) {
      if (plan.userDataMember && !state[plan.userDataMember]) {
        const size = Math.max(
          ...machine.video!.tilemaps
            .filter(candidate => candidate.userDataMember === plan.userDataMember)
            .map(candidate => (candidate.userDataOffset ?? 0) + (candidate.userDataBytes ?? 0)),
        );
        state[plan.userDataMember] = new Uint8Array(size);
      }
      const tilemap = new GeneratedTilemap(
        plan,
        machine,
        () => this.bindings,
        plan.decodeMember
          ? this.gfxByDecode.get(plan.decodeMember) ?? []
          : this.gfx,
        plan.baseShare ? shares[plan.baseShare] : undefined,
      );
      createdTilemaps.push(tilemap);
      const indexed = /^(m_\w+)\[\s*(\d+)\s*\]$/.exec(plan.member);
      if (indexed) {
        const array = state[indexed[1]!] as unknown[] | undefined ?? [];
        array[Number(indexed[2])] = tilemap;
        state[indexed[1]!] = array;
      } else {
        state[plan.member] = tilemap;
      }
    }
    // video_start still executes the source assignment
    // `m_tilemap = &machine().tilemap().create(...)`. The video plan has
    // already composed the corresponding live tilemap above, so return that
    // object to the lifecycle handler instead of letting the generic C++
    // evaluator replace it with an unresolved framework-call reference.
    // Source creation order and generated plan order are identical.
    let nextCreatedTilemap = 0;
    const calls = bindings.calls ??= {};
    calls['m_screen.width'] = () => this.width;
    calls['m_screen.height'] = () => this.height;
    calls['machine().tilemap().create'] = () =>
      createdTilemaps[Math.min(nextCreatedTilemap++, createdTilemaps.length - 1)] ?? 0;
    const bitmapWidth = machine.execution.screen.width * (machine.video?.renderScale?.x ?? 1);
    const bitmapHeight = Math.max(256, machine.execution.screen.vtotal) * 2;
    for (const { member, count } of machine.videoExecution?.bitmapMembers ?? []) {
      if (state[member]) continue;
      state[member] = count
        ? Array.from({ length: count }, () => new GeneratedIndexedBitmap(bitmapWidth, bitmapHeight))
        : new GeneratedIndexedBitmap(bitmapWidth, bitmapHeight);
    }
    // The machine's own palette routine, run once with the palette it is
    // handed -- which is what MAME does at device_start. Every colour the
    // screen resolves comes out of this call.
    for (const init of machine.execution.paletteInits ?? []) {
      const palette = this.palettes.get(init.member);
      if (!init.handler) continue;
      const handler = requiredHandler(machine, init.handler);
      // The callback names the device by its own parameter (`palette_device &palette`).
      const [parameter = 'palette'] = parameterNames(handler.parameters);
      if (palette instanceof GeneratedInitialisedPalette) {
        executeGeneratedMachineHandler(machine, handler, this.bindings, { [parameter]: palette });
      }
    }
    // A palette RAM converted by the driver's set_format routine: its
    // power-on entries, now that the routine can run.
    this.bitmapPalette?.reset();
  }

  /** MAME allocates one priority bitmap per screen; so does this. */
  /**
   * Decoded graphics owned by one MAME decode member.
   *
   * A device_gfx_interface device answers its own `gfx(n)` from the table its
   * machine-config line gave it, not from the driver's m_gfxdecode, so the
   * composition host needs the group by member name to bind that call.
   */
  gfxForDecodeMember(member: string): GeneratedGfxElement[] | undefined {
    return this.gfxByDecode.get(member);
  }

  /**
   * `std::make_unique<gfx_element>(palette, layout, srcdata, xormask,
   * total_colors, color_base)`: a graphics set built at run time, from a
   * layout the driver names (`{ gfxLayout }`) or a `gfx_layout` a device
   * built itself (konami_decode_gfx copies one and sets its `total`).
   */
  makeGfxElement(...args: unknown[]): GeneratedGfxElement {
    const palette = generatedArgumentValue(args[0]) as GeneratedPaletteDevice | undefined;
    const given = generatedArgumentValue(args[1]) as
      { gfxLayout?: GeneratedGfxLayout } & Record<string, unknown> | undefined;
    const layout = given?.gfxLayout ?? (given && 'planeoffset' in given ? structGfxLayout(given) : undefined);
    const source = generatedArgumentValue(args[2]) as
      { source?: unknown; offset?: number } | undefined;
    const bytes = source?.source;
    if (!layout || !ArrayBuffer.isView(bytes)) {
      throw new Error(`${this.machine.game}: gfx_element needs a compiled layout and source memory`);
    }
    const offset = Number(source?.offset ?? 0);
    const entry: GeneratedGfxEntry = {
      region: '',
      offset,
      colorBase: Number(generatedArgumentValue(args[5]) ?? 0),
      colorCount: Number(generatedArgumentValue(args[4]) ?? 0),
      xscale: 1,
      yscale: 1,
      layout,
    };
    const rom = bytes as Uint8Array;
    return new GeneratedGfxElement(
      entry,
      decodeGfx(layout, rom.subarray(offset)),
      palette ?? this.palette!,
      isIndexedScreen(this.machine),
    );
  }

  /** The palette a device's `palette()` answers: the board's own. */
  devicePalette(): GeneratedPaletteDevice | undefined {
    return this.palette;
  }

  paletteShadows(): GeneratedPaletteShadows | undefined {
    return this.shadowGroups;
  }

  screenPriority(): GeneratedPriorityBitmap {
    return (this.priorityBitmap ??= new GeneratedPriorityBitmap(this.machine));
  }

  /**
   * tilemap_manager::create for a tilemap a device builds at run time, into
   * storage the video compiler has no member for: segaic16's tilemap_init
   * creates its text and page tilemaps into `info->textmap` and
   * `info->tilemaps[n]`, fields of a struct. The geometry, the standard mapper
   * and the get_info delegate are the call's own arguments.
   */
  createTilemap(
    decode: unknown,
    tileInfo: (tilemap: unknown, tileinfo: unknown, index: number) => unknown,
    mapper: unknown,
    tileWidth: number,
    tileHeight: number,
    columns: number,
    rows: number,
  ): GeneratedTilemap {
    // tilemap.h's tilemap_standard_mapper: ROWS is 0, COLS is 4.
    const standard = ({ 0: 'TILEMAP_SCAN_ROWS', 4: 'TILEMAP_SCAN_COLS' } as Record<number, string>)[Number(mapper)];
    if (!standard) throw new Error(`${this.machine.game}: tilemap mapper ${String(mapper)} is not a standard one`);
    const decoded = [...this.gfxByDecode].find(([member]) => this.state[member] === decode)?.[1] ?? this.gfx;
    return new GeneratedTilemap(
      {
        member: '', mapper: standard, tileInfo: '',
        tileWidth: Number(tileWidth), tileHeight: Number(tileHeight),
        columns: Number(columns), rows: Number(rows),
      },
      this.machine,
      () => this.bindings,
      decoded,
      undefined,
      tileInfo,
    );
  }

  generatedVideoBindings(_frame: Uint32Array): GeneratedHandlerBindings {
    return this.bindings;
  }

  /** The sprite engine the plan models, for the board's own device finders. */
  /**
   * MAME gfxdecode_device over one decode group: `gfx(n)` answers nullptr
   * (0) for an empty slot, which a driver scans for, and `set_gfx` fills one
   * with a graphics set built at run time. A single group is the board's
   * whole table, so the tilemaps and sprites that read `this.gfx` see it too.
   */
  private gfxDecodeInterface(group: GeneratedGfxElement[]): {
    gfx(index: number): GeneratedGfxElement | 0;
    set_gfx(index: number, element: unknown): number;
    started(): number;
  } {
    return {
      gfx: index => group[index] ?? 0,
      // device_t::started(): composed with the video, before any device that
      // waits on it (`if (!m_gfxdecode->started()) throw
      // device_missing_dependencies();`) starts.
      started: () => 1,
      set_gfx: (index, element) => {
        if (!(element instanceof GeneratedGfxElement)) return 0;
        group[index] = element;
        if (group !== this.gfx && this.gfxByDecode.size === 1) this.gfx[index] = element;
        return 0;
      },
    };
  }

  /** palette_device::write8 / write8_ext into source-derived palette RAM. */
  writePaletteRam(offset: number, data: number, ext = false): void {
    this.ramPalette?.write(offset, data, ext);
    if (!ext) this.bitmapPalette?.write8(offset, data);
  }

  reset(): void {
    // Palette storage resets independently of its mapped source share. A
    // surviving mirror would make the next frame mistake cleared colors for
    // synchronized colors and resolve otherwise-valid tile pens as black.
    this.ramPaletteMirror = undefined;
    this.ramPalette?.reset();
    this.bitmapPalette?.reset();
  }

  resolveScreenPens(pens: Uint32Array, frame: Uint32Array, start: number, count: number): void {
    const colors = this.palette?.colors;
    if (!colors) return;
    const end = Math.min(frame.length, pens.length, start + count);
    const shadows = this.shadowGroups;
    if (shadows) {
      const entries = shadows.entries;
      for (let index = start; index < end; index++) {
        const pen = pens[index]!;
        frame[index] = pen < entries ? colors[pen] ?? 0xff000000 : shadows.resolve(colors, pen);
      }
      return;
    }
    for (let index = start; index < end; index++) {
      frame[index] = colors[pens[index]!] ?? 0xff000000;
    }
  }

  /** A set_format converter run as the board handler it is: raw entry in, rgb_t out. */
  private paletteConverter(plan: { converter?: string }): ((raw: number) => number) | undefined {
    if (!plan.converter) return undefined;
    const handler = requiredHandler(this.machine, plan.converter);
    const parameter = parameterNames(handler.parameters)[0] ?? 'raw';
    return raw => Number(executeGeneratedMachineHandler(this.machine, handler, this.bindings, { [parameter]: raw }) ?? 0);
  }

  render(frame: Uint32Array): void {
    const plan = this.machine.video?.bitmap;
    if (!plan) return;
    const source = this.state[plan.member];
    if (!ArrayBuffer.isView(source)) {
      throw new Error(`${this.machine.game}: bitmap member "${plan.member}" is not bound`);
    }
    const bytes = source as Uint8Array;
    frame.fill(plan.black >>> 0);
    const bitsPerPixel = plan.bitsPerPixel ?? 1;
    const pixelsPerByte = 8 / bitsPerPixel;
    const paletteBytes = plan.paletteRam
      ? this.state[plan.paletteRam.member]
      : undefined;
    const palette = paletteBytes instanceof GeneratedBitmapPalette
      ? paletteBytes.colors
      : plan.paletteRam && ArrayBuffer.isView(paletteBytes)
        ? createRamPalette(plan.paletteRam, paletteBytes as Uint8Array, this.paletteConverter(plan.paletteRam))
        : undefined;
    const flipX = Boolean(plan.flipXMember && this.state[plan.flipXMember]);
    const flipY = Boolean(plan.flipYMember && this.state[plan.flipYMember]);
    for (let outputY = 0; outputY < plan.rows; outputY++) {
      const rasterY = plan.rowStart + outputY;
      const sourceY = flipY ? rasterY ^ 0xff : rasterY;
      const rowOffset = sourceY * plan.bytesPerRow;
      for (let byte = 0; byte < plan.bytesPerRow; byte++) {
        const pixels = bytes[rowOffset + byte] ?? 0;
        for (let pixel = 0; pixel < pixelsPerByte; pixel++) {
          const outputX = byte * pixelsPerByte + pixel;
          const sourceX = flipX ? outputX ^ 0xff : outputX;
          const sourceByte = bytes[rowOffset + Math.floor(sourceX / pixelsPerByte)] ?? pixels;
          const sourcePixel = sourceX % pixelsPerByte;
          const shift = plan.lsbFirst
            ? sourcePixel * bitsPerPixel
            : (pixelsPerByte - 1 - sourcePixel) * bitsPerPixel;
          const value = (sourceByte >>> shift) & ((1 << bitsPerPixel) - 1);
          const paletteIndex = value + (
            plan.paletteBankMember
              ? (Number(this.state[plan.paletteBankMember] ?? 0) << bitsPerPixel)
              : 0
          );
          const x = plan.xOffset + outputX;
          if (x < this.width && outputY < this.height) {
            frame[outputY * this.width + x] =
              (palette?.[paletteIndex] ??
                (value ? plan.white : plan.black)) >>> 0;
          }
        }
      }
    }
  }

  vblank(): void {}

  /**
   * MAME counts a screen's frames at the end of its vblank
   * (`screen_device::vblank_end`), so the frame drawn next is the one
   * frame_number() names: the Spectrum's FLASH reads it on every line.
   */
  screenFrameNumber(): number {
    return Number((this.state.m_screen as { __frame?: number } | undefined)?.__frame ?? 0);
  }

  vblankEnd(): void {
    const screen = this.state.m_screen as { frame_number?: () => number; __frame?: number } | undefined;
    if (screen) {
      screen.__frame = (screen.__frame ?? 0) + 1;
      screen.frame_number = () => screen.__frame ?? 0;
    }
  }
}

function createRamPalette(
  plan: NonNullable<NonNullable<BoardIr['video']>['bitmap']>['paletteRam'] & {},
  bytes: Uint8Array,
  convert?: (raw: number) => number,
): Uint32Array {
  if (convert) return Uint32Array.from(bytes, raw => convert(raw) >>> 0);
  if (plan.lookup) {
    const colors = new Uint32Array(plan.entries);
    for (let index = 0; index < colors.length; index++) {
      const raw = bytes[index] ?? 0;
      const intensity =
        (raw >>> plan.lookup.intensityShift) & plan.lookup.intensityMask;
      const rgb = { r: 0, g: 0, b: 0 };
      for (const channel of plan.lookup.channels) {
        const value = (raw >>> channel.valueShift) & channel.valueMask;
        rgb[channel.channel] =
          plan.lookup.values[(value << channel.valueTableShift) | intensity] ?? 0;
      }
      colors[index] = packRgb(rgb.r, rgb.g, rgb.b);
    }
    return colors;
  }
  throw new Error('palette RAM plan has neither a converter nor a lookup table');
}

// A MAME signature is a constant, so parsing it is cached by that string.
const PARAMETER_NAMES = new Map<string, string[]>();
const PARAMETER_DECLARATIONS = new Map<string, string[]>();

function parameterNames(parameters: string | undefined): string[] {
  const key = parameters ?? '';
  let names = PARAMETER_NAMES.get(key);
  if (!names) {
    names = parameterDeclarations(parameters)
      .map(parameter => /(\w+)\s*$/.exec(parameter)?.[1])
      .filter((name): name is string => Boolean(name));
    PARAMETER_NAMES.set(key, names);
  }
  return names;
}

function parameterDeclarations(parameters: string | undefined): string[] {
  const key = parameters ?? '';
  let declared = PARAMETER_DECLARATIONS.get(key);
  if (!declared) {
    declared = key.split(',').map(value => value.trim()).filter(Boolean);
    PARAMETER_DECLARATIONS.set(key, declared);
  }
  return declared;
}

function generatedArgumentValue(value: unknown): unknown {
  if (
    value && typeof value === 'object' &&
    typeof (value as { get?: unknown }).get === 'function'
  ) {
    return (value as { get(): unknown }).get();
  }
  return value;
}

function requiredHandler(machine: BoardIr, key: string): GeneratedHandler {
  const handler = machine.handlers?.find(candidate =>
    `${candidate.ownerClass}.${candidate.method}` === key &&
    candidate.program &&
    candidate.program.diagnostics.length === 0);
  if (!handler) throw new Error(`${machine.game}: generated video handler "${key}" is not executable`);
  return handler;
}

function standardMapper(key: string): boolean {
  return key === 'TILEMAP_SCAN_ROWS' || key === 'TILEMAP_SCAN_COLS';
}

function mapStandardTile(
  key: string,
  column: number,
  row: number,
  columns: number,
  rows: number,
): number {
  if (key === 'TILEMAP_SCAN_ROWS') return row * columns + column;
  if (key === 'TILEMAP_SCAN_COLS') return column * rows + row;
  return 0;
}

/**
 * palette_t::adjust_palette_entry with no brightness and a linear gamma:
 * each channel `clamp(float(level) * contrast)`, alpha kept.
 */
function adjustedColor(color: number, contrast: number): number {
  const channel = (shift: number) =>
    Math.min(255, Math.max(0, Math.trunc(Math.fround(((color >>> shift) & 0xff) * contrast)))) << shift;
  return ((color & 0xff000000) | channel(16) | channel(8) | channel(0)) >>> 0;
}

function normalizePaletteRange(
  colors: Uint32Array,
  range: { start: number; end: number; lumMin: number; lumMax: number },
): void {
  const start = Math.max(0, range.start);
  const end = Math.min(colors.length - 1, range.end);
  let minimum = 255_000;
  let maximum = 0;
  for (let index = start; index <= end; index++) {
    const color = colors[index]!;
    const red = color & 0xff;
    const green = (color >>> 8) & 0xff;
    const blue = (color >>> 16) & 0xff;
    const luminance = 299 * red + 587 * green + 114 * blue;
    minimum = Math.min(minimum, luminance);
    maximum = Math.max(maximum, luminance);
  }
  if (maximum <= minimum) return;
  const targetMinimum = range.lumMin < 0
    ? Math.floor((minimum + 500) / 1000)
    : range.lumMin;
  const targetMaximum = range.lumMax < 0
    ? Math.floor((maximum + 500) / 1000)
    : range.lumMax;
  const clamp = (value: number) => Math.max(0, Math.min(255, value));
  for (let index = start; index <= end; index++) {
    const color = colors[index]!;
    const red = color & 0xff;
    const green = (color >>> 8) & 0xff;
    const blue = (color >>> 16) & 0xff;
    const luminance = 299 * red + 587 * green + 114 * blue;
    const u = Math.trunc((blue - Math.trunc(luminance / 1000)) * 492 / 1000);
    const v = Math.trunc((red - Math.trunc(luminance / 1000)) * 877 / 1000);
    const target = targetMinimum + Math.trunc(
      (luminance - minimum) * (targetMaximum - targetMinimum + 1) /
      (maximum - minimum),
    );
    colors[index] = packRgb(
      clamp(target + Math.trunc(1140 * v / 1000)),
      clamp(target - Math.trunc(395 * u / 1000) - Math.trunc(581 * v / 1000)),
      clamp(target + Math.trunc(2032 * u / 1000)),
    );
  }
}

function packRgb(red: number, green: number, blue: number): number {
  return (0xff000000 | (blue << 16) | (green << 8) | red) >>> 0;
}


function modulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}
