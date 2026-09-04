import type { VideoRenderer } from './types.ts';
import type { Regions, VideoRenderer as Renderer } from './types.ts';
import type { BoardIr, GeneratedGfxEntry, GeneratedHandler, GeneratedMotionObjectsPlan, GeneratedProgramPalettePlan, GeneratedPromPalettePlan, GeneratedRamPalettePlan, GeneratedTilemapPlan } from '../ir/board.ts';
import {
  executeGeneratedCallbackHandler,
  executeGeneratedMachineProgram,
  type GeneratedHandlerBindings,
} from './generated-handler.ts';
import { executeGeneratedHandler } from '../ir/execute.ts';
import { decodeGfx, type GfxSet } from './gfx.ts';
import { executeDvgDisplayList } from '../hardware/vector/dvg.ts';

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
 * Pixel collision timer events produced by Exidy's two motion objects.
 *
 * The hardware does not expose one aggregate collision per rendered frame:
 * MAME queues as many as 128 timer callbacks at the source beam positions.
 * Venture uses those IRQs for interactions with room characters, including
 * treasure pickup, so retaining the event sequence is gameplay-critical.
 */
export function exidySpriteCollisions(
  gfx: GfxSet,
  backgroundPixel: (x: number, y: number) => number,
  sprite1: ExidySpriteState,
  sprite2: ExidySpriteState,
  collisionMask = 0x1c,
): ExidySpriteCollision[] {
  const collisions: ExidySpriteCollision[] = [];
  const pixel = (sprite: ExidySpriteState, x: number, y: number): boolean => {
    if (sprite.enabled === false || x < 0 || y < 0 || x >= gfx.width || y >= gfx.height) {
      return false;
    }
    const code = ((sprite.code % gfx.count) + gfx.count) % gfx.count;
    return (gfx.pixels[(code * gfx.height + y) * gfx.width + x] ?? 0) !== 0;
  };
  for (let y = 0; y < gfx.height && collisions.length < 128; y++) {
    for (let x = 0; x < gfx.width && collisions.length < 128; x++) {
      const global1X = sprite1.x + x;
      const global1Y = sprite1.y + y;
      if (pixel(sprite1, x, y)) {
        let currentMask = 0;
        if (backgroundPixel(global1X, global1Y) !== 0) currentMask |= 0x04;
        if (pixel(sprite2, global1X - sprite2.x, global1Y - sprite2.y)) {
          currentMask |= 0x10;
        }
        if (currentMask & collisionMask) {
          collisions.push({ position: global1X, mask: currentMask });
        }
      }
      if (
        collisions.length < 128 &&
        (collisionMask & 0x08) &&
        pixel(sprite2, x, y) &&
        backgroundPixel(sprite2.x + x, sprite2.y + y) !== 0
      ) {
        collisions.push({ position: sprite2.x + x, mask: 0x08 });
      }
    }
  }
  return collisions;
}

/** Pixel collision signals produced by Exidy's two motion objects. */
export function exidySpriteCollisionMask(
  gfx: GfxSet,
  backgroundPixel: (x: number, y: number) => number,
  sprite1: ExidySpriteState,
  sprite2: ExidySpriteState,
): number {
  return exidySpriteCollisions(
    gfx,
    backgroundPixel,
    sprite1,
    sprite2,
  ).reduce((mask, collision) => mask | collision.mask, 0);
}

/**
 * Compose reusable renderer primitives by executing the screen-update method
 * compiled from the selected MAME driver.
 */
export class GeneratedVideoRenderer implements VideoRenderer {
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
    if (this.indexed) this.penBuffer = new Uint32Array(this.width * this.height);
  }

  vblank(): void {
    this.primitives.vblank();
  }

  render(frame: Uint32Array): void {
    if (this.machine.video?.bitmap) {
      this.primitives.render(frame);
      return;
    }
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    if (this.machine.execution.screen.updateMode === 'partial') {
      const finalY = yOffset + this.height - 1;
      if (this.partialNextY <= finalY) {
        this.renderRegion(frame, this.partialNextY, finalY);
      }
      this.partialNextY = yOffset;
      return;
    }
    this.renderRegion(frame, yOffset, yOffset + this.height - 1);
  }

  updatePartial(frame: Uint32Array, line: number): void {
    // Framebuffer plans render directly from live RAM at frame end. Their
    // configured device screen-update callback is intentionally not a driver
    // handler, so partial-update notifications are bookkeeping only.
    if (this.machine.video?.bitmap) return;
    if (this.machine.execution.screen.updateMode !== 'partial') return;
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    const finalY = yOffset + this.height - 1;
    const updateThrough = Math.min(Math.floor(line), finalY);
    if (updateThrough < this.partialNextY) return;
    this.renderRegion(frame, this.partialNextY, updateThrough);
    this.partialNextY = updateThrough + 1;
  }

  renderLine(frame: Uint32Array, line: number): void {
    if (this.machine.video?.bitmap) return;
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    if (line < yOffset || line >= yOffset + this.height) return;
    this.renderRegion(frame, line, line);
  }

  private renderRegion(frame: Uint32Array, minY: number, maxY: number): void {
    const xOffset = this.machine.execution.screen.xOffset ?? 0;
    const yOffset = this.machine.execution.screen.yOffset ?? 0;
    const xScale = this.machine.video?.renderScale?.x ?? 1;
    const yScale = this.machine.video?.renderScale?.y ?? 1;
    const cliprect = new GeneratedRectangle(
      xOffset * xScale,
      (xOffset + this.width) * xScale - 1,
      minY * yScale,
      (maxY + 1) * yScale - 1,
    );
    const target = this.penBuffer ?? frame;
    const scaledXOffset = xOffset * xScale;
    const scaledYOffset = yOffset * yScale;
    const bitmap = {
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
  readonly pixels: Uint32Array;
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.pixels = new Uint32Array(width * height);
  }

  cliprect(): GeneratedRectangle {
    return new GeneratedRectangle(0, this.width - 1, 0, this.height - 1);
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

class GeneratedRectangle {
  min_x: number;
  max_x: number;
  min_y: number;
  max_y: number;

  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    this.min_x = minX;
    this.max_x = maxX;
    this.min_y = minY;
    this.max_y = maxY;
  }

  contains(x: number, y: number): number {
    return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y ? 1 : 0;
  }

  intersect(other: unknown): void {
    if (!other || typeof other !== 'object') return;
    const rectangle = other as GeneratedRectangle;
    this.min_x = Math.max(this.min_x, Number(rectangle.min_x));
    this.max_x = Math.min(this.max_x, Number(rectangle.max_x));
    this.min_y = Math.max(this.min_y, Number(rectangle.min_y));
    this.max_y = Math.min(this.max_y, Number(rectangle.max_y));
  }
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
  readonly colors: Uint32Array;
  transpen_mask(gfx: GeneratedGfxElement, color: number, transparent: number): number;
  black_pen(): number;
  pens(): Uint32Array;
  set_pen_color?(pen: number, colorOrRed: number, green?: number, blue?: number): void;
}

/**
 * MAME palette RAM colored by a set_format raw_to_rgb converter. Writes follow
 * palette_device::write8/write8_ext: store the byte, then recompute the
 * affected entry, so mid-frame writes reach partial screen updates the same way
 * they do in MAME.
 */
class GeneratedRamPalette implements GeneratedPaletteDevice {
  readonly colors: Uint32Array;
  private readonly plan: GeneratedRamPalettePlan;
  private readonly ram: Uint8Array;
  private readonly ext?: Uint8Array;
  /** palette_device::device_start halves bytes-per-entry across a split share. */
  private readonly bytesPerEntry: number;

  constructor(plan: GeneratedRamPalettePlan) {
    this.plan = plan;
    this.bytesPerEntry = plan.extShare ? plan.bytesPerEntry / 2 : plan.bytesPerEntry;
    this.ram = new Uint8Array(plan.entries * this.bytesPerEntry);
    if (plan.extShare) this.ext = new Uint8Array(plan.entries * this.bytesPerEntry);
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
    const totalBytes = this.bytesPerEntry * (this.ext ? 2 : 1);
    const shiftFor = (byte: number): number =>
      8 * (this.plan.endianness === 'big' ? totalBytes - byte - 1 : byte);
    for (let byte = 0; byte < this.bytesPerEntry; byte++) {
      raw |= (this.ram[pen * this.bytesPerEntry + byte] ?? 0) << shiftFor(byte);
    }
    if (this.ext) {
      for (let byte = 0; byte < this.bytesPerEntry; byte++) {
        raw |= (this.ext[pen * this.bytesPerEntry + byte] ?? 0) <<
          shiftFor(this.bytesPerEntry + byte);
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
  colors: Uint32Array;
  readonly ram: Uint8Array;
  private readonly plan:
    NonNullable<NonNullable<BoardIr['video']>['bitmap']>['paletteRam'] & {};

  constructor(
    plan: NonNullable<NonNullable<BoardIr['video']>['bitmap']>['paletteRam'] & {},
  ) {
    this.plan = plan;
    this.ram = new Uint8Array(plan.entries);
    this.colors = createRamPalette(plan, this.ram);
  }

  read8(offset: number): number {
    return this.ram[offset] ?? 0;
  }

  write8(offset: number, data: number): void {
    if (offset < 0 || offset >= this.ram.length) return;
    this.ram[offset] = data & 0xff;
    this.colors = createRamPalette(this.plan, this.ram);
  }

  reset(): void {
    this.ram.fill(0);
    this.colors = createRamPalette(this.plan, this.ram);
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
 * A palette whose colors come from executing MAME's own init callback.
 *
 * The declarative PROM palette above is the normal path and stays preferred:
 * it is inspectable data. This is for callbacks that compute their network in
 * source instead of declaring it (Mr. Do! derives sixteen resistor weights from
 * parallel resistances, a pull-down and a diode drop). The callback runs once
 * here against the palette_device operations it calls in MAME.
 */
class GeneratedProgramPalette implements GeneratedPaletteDevice {
  readonly colors: Uint32Array;
  readonly indirect: Uint16Array;
  private readonly indirectColors: Uint32Array;

  constructor(plan: GeneratedProgramPalettePlan, regions: Regions, game: string) {
    this.colors = new Uint32Array(Math.max(1, plan.entries));
    this.indirect = new Uint16Array(this.colors.length);
    this.indirectColors = new Uint32Array(Math.max(1, plan.indirectEntries));
    const device: Record<string, (...args: number[]) => unknown> = {
      set_indirect_color: (index, color) => {
        if (index >= 0 && index < this.indirectColors.length) {
          this.indirectColors[index] = color >>> 0;
        }
        return 0;
      },
      set_pen_indirect: (pen, indirect) => {
        if (pen >= 0 && pen < this.indirect.length) this.indirect[pen] = indirect & 0xffff;
        return 0;
      },
      set_pen_color: (pen, colorOrRed, green, blue) => {
        if (pen < 0 || pen >= this.colors.length) return 0;
        this.colors[pen] = green === undefined || blue === undefined
          ? colorOrRed >>> 0
          : packRgb(colorOrRed, green, blue);
        return 0;
      },
      entries: () => this.colors.length,
      indirect_entries: () => this.indirectColors.length,
    };
    const calls: Record<string, (...args: number[]) => unknown> = {};
    for (const [method, implementation] of Object.entries(device)) {
      // The callback names the device by its own parameter; a driver that
      // calls the method unqualified reaches the same implementation.
      calls[`${plan.deviceParameter}.${method}`] = implementation;
      calls[method] = implementation;
    }
    executeGeneratedHandler(plan.program, {
      constants: plan.constants ?? {},
      members: {},
      calls,
      referenceCalls: {
        memregion: (...args: unknown[]) => {
          const tag = String(generatedArgumentValue(args[0]) ?? '');
          const bytes = regions[tag];
          if (!bytes) throw new Error(`${game}: missing palette ROM region "${tag}"`);
          return { base: () => bytes, bytes: () => bytes.length };
        },
      },
    });
    // MAME resolves a pen lazily from its indirect entry, so the callback is
    // free to write the lookup table before the colors it points at.
    if (plan.indirectEntries) {
      for (let pen = 0; pen < this.colors.length; pen++) {
        this.colors[pen] = this.indirectColors[this.indirect[pen]!] ?? 0xff000000;
      }
    }
  }

  transpen_mask(gfx: GeneratedGfxElement, color: number, transparent: number): number {
    let mask = 0;
    const base = gfx.entry.colorBase + color * gfx.granularity();
    for (let pen = 0; pen < gfx.granularity(); pen++) {
      if (this.indirect[base + pen] === transparent) mask |= 1 << pen;
    }
    return mask;
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

  set_pen_indirect(pen: number, indirect: number): void {
    if (pen < 0 || pen >= this.colors.length) return;
    const color = indirect & 0xffff;
    this.indirect[pen] = color;
    this.colors[pen] = this.indirectColors[color] ?? 0xff000000;
  }

  set_pen_color(pen: number, colorOrRed: number, green?: number, blue?: number): void {
    if (pen < 0 || pen >= this.colors.length) return;
    this.colors[pen] = green === undefined || blue === undefined
      ? colorOrRed >>> 0
      : packRgb(colorOrRed, green, blue);
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
    const weights = computeWeights(plan);
    const coreCount = Math.max(
      plan.colorCount,
      ...(plan.computedColors ?? []).map(group => group.base + group.count),
      ...(plan.indexedColors ?? []).map(group => group.base + group.colors.length),
      ...(plan.promColors ?? []).map(group => group.base + group.count),
    );
    const core = new Uint32Array(coreCount);
    for (let index = 0; index < plan.colorCount; index++) {
      const rgb = { r: 0, g: 0, b: 0 };
      for (const [channelIndex, channel] of plan.channels.entries()) {
        const values = weights[channel.channel];
        let value: number;
        if (plan.resNet) {
          let inputs = 0;
          for (let bit = 0; bit < channel.bits.length; bit++) {
            const source = prom[index + (channel.offsets?.[bit] ?? 0)] ?? 0;
            inputs |= palettePromBit(source, channel, bit) << bit;
          }
          value = computeMameTtlSanyoResNet(
            inputs,
            channel.resistances,
            channel.pullup,
            channel.pulldown,
            plan.resNet.amplifiers[channelIndex] ?? 'none',
          );
        } else {
          value = 0;
          for (let bit = 0; bit < channel.bits.length; bit++) {
            const source = prom[index + (channel.offsets?.[bit] ?? 0)] ?? 0;
            value += values[bit]! * palettePromBit(source, channel, bit);
          }
        }
        rgb[channel.channel] = Math.floor(value + 0.5);
      }
      core[index] = packRgb(rgb.r, rgb.g, rgb.b);
    }
    if (plan.colorIndexMap) {
      const decoded = core.slice();
      for (let index = 0; index < plan.colorCount; index++) {
        core[index] = decoded[plan.colorIndexMap[index] ?? index] ?? 0xff000000;
      }
    }
    if (plan.forceBlack) {
      for (let index = 0; index < plan.colorCount; index++) {
        if ((index & plan.forceBlack.mask) === plan.forceBlack.value) {
          core[index] = packRgb(0, 0, 0);
        }
      }
    }
    if (plan.normalize) normalizePaletteRange(core, plan.normalize);
    for (const group of plan.indexedColors ?? []) {
      core.set(Uint32Array.from(group.colors, color => color >>> 0), group.base);
    }
    // Computed sections derive each channel from bits of the color index
    // through their own resistor network (05xx star colors and kin).
    for (const group of plan.computedColors ?? []) {
      const groupWeights = computeWeights({ ...plan, ...group });
      for (let index = 0; index < group.count; index++) {
        const rgb = { r: 0, g: 0, b: 0 };
        for (const channel of group.channels) {
          const values = groupWeights[channel.channel];
          let value = 0;
          for (let bit = 0; bit < channel.bits.length; bit++) {
            value += values[bit]! * ((index >> channel.bits[bit]!) & 1);
          }
          rgb[channel.channel] = Math.floor(value + 0.5);
        }
        core[group.base + index] = packRgb(rgb.r, rgb.g, rgb.b);
      }
    }
    for (const group of plan.promColors ?? []) {
      for (let index = 0; index < group.count; index++) {
        const rgb = { r: 0, g: 0, b: 0 };
        for (const channel of group.channels) {
          const values = channel.weights ?? computeWeights({
            ...plan,
            channels: [channel],
          })[channel.channel];
          let value = 0;
          for (let bit = 0; bit < channel.bits.length; bit++) {
            const source = prom[index + (channel.offsets?.[bit] ?? 0)] ?? 0;
            value += values[bit]! * palettePromBit(source, channel, bit);
          }
          rgb[channel.channel] = Math.floor(value + 0.5);
        }
        core[group.base + index] = packRgb(rgb.r, rgb.g, rgb.b);
      }
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

/** TNX1's DMA-selected background/text/sprite PROM resistor networks. */
class GeneratedTnx1Palette implements GeneratedPaletteDevice {
  readonly colors = new Uint32Array(80);
  private readonly colorProm: Uint8Array;
  private readonly spriteProm: Uint8Array;
  private bank = -1;

  constructor(
    plan: NonNullable<GeneratedPromPalettePlan['dynamic']>,
    regions: Regions,
  ) {
    const colorProm = regions[plan.colorRegion];
    const spriteProm = regions[plan.spriteRegion];
    if (!colorProm || !spriteProm) {
      throw new Error(
        `generated TNX1 palette: missing ROM region "${!colorProm ? plan.colorRegion : plan.spriteRegion}"`,
      );
    }
    this.colorProm = colorProm;
    this.spriteProm = spriteProm;
    this.colors.fill(0xff000000);
  }

  sync(state: Record<string, unknown>): void {
    const bank = Number(state.m_palette_bank ?? 0) & 0x0f;
    if (bank === this.bank) return;
    this.bank = bank;
    const colorBank = (bank & 0x08) ? 16 : 0;
    for (let index = 0; index < 16; index++) {
      this.colors[index] = this.decode(
        this.colorProm[colorBank + index] ?? 0,
        [1200, 680, 470],
        [680, 470],
      );
      const text = this.colorProm[32 + colorBank + index] ?? 0;
      this.colors[16 + index * 2] = 0xff000000;
      this.colors[17 + index * 2] = this.decode(
        text,
        [1000, 470, 220],
        [470, 220],
      );
    }
    const spriteBank = (bank & 0x07) * 32;
    for (let index = 0; index < 32; index++) {
      const address = spriteBank + index;
      const aliased = (address & 0x3f) | ((address & 0x20) << 1);
      this.colors[48 + index] = this.decode(
        this.spriteProm[aliased] ?? 0,
        [1000, 470, 220],
        [470, 220],
      );
    }
  }

  private decode(value: number, rgbResistors: number[], blueResistors: number[]): number {
    return packRgb(
      computeMameTtlSanyoResNet(value & 0x07, rgbResistors, 470, 0, 'darlington'),
      computeMameTtlSanyoResNet((value >>> 3) & 0x07, rgbResistors, 470, 0, 'darlington'),
      computeMameTtlSanyoResNet((value >>> 6) & 0x03, blueResistors, 680, 0, 'darlington'),
    );
  }

  transpen_mask(_gfx: GeneratedGfxElement, _color: number, transparent: number): number {
    return 1 << transparent;
  }

  black_pen(): number {
    return 0;
  }

  pens(): Uint32Array {
    return this.colors;
  }
}

/**
 * MAME `atari_motion_objects_device`.
 *
 * The device is one sprite engine every Atari raster board shares; what makes
 * it a particular board's hardware is the configuration the driver declares,
 * which `src/mame/atarimo-compiler.ts` lowers into the plan this executes.
 * Objects render into the device's own indexed bitmap, cleared to 0xffff, and
 * the driver's screen update merges that bitmap over its playfield — which is
 * why nothing here composes with the screen itself.
 */
class GeneratedMotionObjects {
  readonly bitmap: GeneratedIndexedBitmap;
  private readonly plan: GeneratedMotionObjectsPlan;
  private readonly gfx: GeneratedGfxElement;
  private readonly spriteRam: () => ArrayLike<number> | undefined;
  private readonly slipRam: () => ArrayLike<number> | undefined;
  private readonly activeList: number[] = [];
  private readonly visited: Uint8Array;
  /** compute_log of the gfx tile size, as device_start derives it. */
  private readonly tileXShift: number;
  private readonly tileYShift: number;
  private nextXpos = 123456;
  private lastXpos = 0;
  bank = 0;
  xscroll = 0;
  yscroll = 0;

  constructor(
    plan: GeneratedMotionObjectsPlan,
    gfx: GeneratedGfxElement,
    spriteRam: () => ArrayLike<number> | undefined,
    slipRam: () => ArrayLike<number> | undefined,
    width: number,
    height: number,
  ) {
    this.plan = plan;
    this.gfx = gfx;
    this.spriteRam = spriteRam;
    this.slipRam = slipRam;
    this.visited = new Uint8Array(Math.max(1, plan.entryCount));
    this.tileXShift = Math.round(Math.log2(Math.max(1, gfx.decoded.width)));
    this.tileYShift = Math.round(Math.log2(Math.max(1, gfx.decoded.height)));
    this.bitmap = new GeneratedIndexedBitmap(width, height);
  }

  /** MAME `sprite_device::draw_async`: clear to "no pixel", then render. */
  draw_async(clip: GeneratedRectangle): void {
    this.bitmap.fill(0xffff, clip);
    this.draw(clip);
  }

  private extract(parameter: { word: number; shift: number; mask: number }, at: number): number {
    return (this.activeList[at + parameter.word]! >>> parameter.shift) & parameter.mask;
  }

  /** MAME `atari_motion_objects_device::draw`. */
  private draw(clip: GeneratedRectangle): void {
    const plan = this.plan;
    const mask = plan.bitmapHeight - 1;
    let startBand = ((clip.min_y + this.yscroll - plan.slipOffset) & mask) >> plan.slipShift;
    let stopBand = ((clip.max_y + this.yscroll - plan.slipOffset) & mask) >> plan.slipShift;
    if (startBand > stopBand) startBand -= plan.bitmapHeight >> plan.slipShift;
    if (plan.slipShift === 0) stopBand = startBand;
    const slip = this.slipRam();
    for (let band = startBand; band <= stopBand; band++) {
      let bandMinY = clip.min_y;
      let bandMaxY = clip.max_y;
      let link = 0;
      if (plan.slipShift !== 0) {
        const slipCount = Math.max(1, plan.bitmapHeight >> plan.slipShift);
        const entry = slip?.[band & (slipCount - 1)] ?? 0;
        link = (entry >>> plan.link.shift) & plan.link.mask;
        let minY = ((band << plan.slipShift) - this.yscroll + plan.slipOffset) & mask;
        if (minY >= this.bitmap.height) minY -= plan.bitmapHeight;
        bandMinY = Math.max(clip.min_y, minY);
        bandMaxY = Math.min(clip.max_y, minY + (1 << plan.slipShift) - 1);
        if (bandMinY > bandMaxY) continue;
      }
      this.buildActiveList(link);
      this.nextXpos = 123456;
      if (!this.activeList.length) continue;
      const bandClip = new GeneratedRectangle(clip.min_x, clip.max_x, bandMinY, bandMaxY);
      const last = this.activeList.length - 4;
      if (plan.reverse) {
        for (let at = last; at >= 0; at -= 4) this.renderObject(bandClip, at);
      } else {
        for (let at = 0; at <= last; at += 4) this.renderObject(bandClip, at);
      }
    }
  }

  /** MAME `atari_motion_objects_device::build_active_list`. */
  private buildActiveList(start: number): void {
    const plan = this.plan;
    const sprites = this.spriteRam();
    this.activeList.length = 0;
    if (!sprites) return;
    this.visited.fill(0, 0, plan.entryCount);
    const bankBase = this.bank << (plan.entryBits + 2);
    let link = start;
    for (let visits = 0; visits < plan.maxPerLine && !this.visited[link]; visits++) {
      const at = this.activeList.length;
      if (plan.split) {
        for (let word = 0; word < 4; word++) {
          this.activeList.push(sprites[bankBase + link + (word << plan.entryBits)] ?? 0);
        }
      } else {
        for (let word = 0; word < 4; word++) {
          this.activeList.push(sprites[bankBase + link * 4 + word] ?? 0);
        }
      }
      this.visited[link] = 1;
      link = plan.linked
        ? this.extract(plan.link, at)
        : (link + 1) & plan.link.mask;
    }
  }

  /** MAME `atari_motion_objects_device::render_object`. */
  private renderObject(clip: GeneratedRectangle, at: number): void {
    const plan = this.plan;
    const rawcode = this.extract(plan.code, at);
    let code = plan.codeXor === undefined ? rawcode : rawcode ^ plan.codeXor;
    const colorIndex = this.extract(plan.color, at);
    let xpos = this.extract(plan.xpos, at);
    let ypos = -this.extract(plan.ypos, at);
    const hflip = this.extract(plan.hflip, at);
    const vflip = this.extract(plan.vflip, at);
    const width = this.extract(plan.width, at) + 1;
    const height = this.extract(plan.height, at) + 1;
    const priority = this.extract(plan.priority, at);
    const tileWidth = this.gfx.decoded.width;
    const tileHeight = this.gfx.decoded.height;
    const tileXShift = this.tileXShift;
    const tileYShift = this.tileYShift;
    const penBase =
      ((colorIndex * this.gfx.granularity()) | (priority << 12)) + plan.paletteBase;

    if (!this.extract(plan.absolute, at)) {
      xpos -= this.xscroll;
      ypos -= this.yscroll;
    }
    ypos -= height << tileYShift;
    if (this.nextXpos !== 123456) xpos = this.nextXpos;
    this.nextXpos = 123456;
    if (this.extract(plan.neighbor, at) !== 0) {
      if (!plan.nextNeighbor) xpos = this.lastXpos + tileWidth;
      else this.nextXpos = xpos + tileWidth;
    }
    this.lastXpos = xpos;

    xpos &= plan.bitmapWidth - 1;
    ypos &= plan.bitmapHeight - 1;
    if (xpos >= this.bitmap.width) xpos -= plan.bitmapWidth;
    if (ypos >= this.bitmap.height) ypos -= plan.bitmapHeight;
    if (plan.special.mask !== 0 && this.extract(plan.special, at) === plan.specialValue) return;

    let xadv = tileWidth;
    if (hflip) { xpos += (width - 1) << tileXShift; xadv = -xadv; }
    let yadv = tileHeight;
    if (vflip) { ypos += (height - 1) << tileYShift; yadv = -yadv; }

    if (!plan.swapXy) {
      for (let y = 0, sy = ypos; y < height; y++, sy += yadv) {
        if (sy <= clip.min_y - tileHeight) { code += width; continue; }
        if (sy > clip.max_y) break;
        for (let x = 0, sx = xpos; x < width; x++, sx += xadv, code++) {
          if (sx <= -clip.min_x - tileWidth || sx > clip.max_x) continue;
          this.gfx.transpen_raw(
            this.bitmap, clip, code, penBase, hflip, vflip, sx, sy, plan.transparentPen,
          );
        }
      }
      return;
    }
    for (let x = 0, sx = xpos; x < width; x++, sx += xadv) {
      if (sx <= clip.min_x - tileWidth) { code += height; continue; }
      if (sx > clip.max_x) break;
      for (let y = 0, sy = ypos; y < height; y++, sy += yadv, code++) {
        if (sy <= -clip.min_y - tileHeight || sy > clip.max_y) continue;
        this.gfx.transpen_raw(
          this.bitmap, clip, code, penBase, hflip, vflip, sx, sy, plan.transparentPen,
        );
      }
    }
  }
}

export class GeneratedGfxElement {
  readonly entry: GeneratedGfxEntry;
  readonly decoded: GfxSet;
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
    this.decoded = decoded;
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
  private readonly plan: GeneratedTilemapPlan;
  private readonly mapper?: GeneratedHandler;
  private readonly tileInfo: GeneratedHandler;
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
  ) {
    this.plan = plan;
    this.machine = machine;
    this.bindings = bindings;
    this.gfx = gfx;
    this.mapper = standardMapper(plan.mapper)
      ? undefined
      : requiredHandler(machine, plan.mapper);
    this.tileInfo = requiredHandler(machine, plan.tileInfo);
    this.scrollX = new Array(plan.scrollRows ?? 1).fill(0);
    this.scrollY = new Array(plan.scrollColumns ?? 1).fill(0);
    this.pixmapBitmap = new GeneratedIndexedBitmap(
      plan.columns * plan.tileWidth,
      plan.rows * plan.tileHeight,
    );
  }

  user_data(): unknown {
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
      const deviceTileInfo = bindings.referenceCalls?.[this.plan.tileInfo];
      if (deviceTileInfo) {
        deviceTileInfo(this, tileinfo, tileIndex);
      } else {
        executeGeneratedMachineProgram(
          this.machine,
          this.tileInfo,
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

interface CpsGfxRange {
  type: number;
  start: number;
  end: number;
  bank: number;
}

interface CpsGameConfig {
  bank_sizes?: number[];
  bank_mapper?: CpsGfxRange[];
  bootleg_kludge?: number;
}

/**
 * CPS1 stores its graphics mapper as a pointer to a sentinel-terminated table.
 * The generic expression evaluator intentionally does not infer C++ pointer
 * types from `auto`, so preserve the small hardware lookup explicitly here.
 */
export function cpsGfxromBankMap(
  config: CpsGameConfig,
  type: number,
  sourceCode: number,
): number {
  const shifts: Record<number, number> = { 1: 1, 2: 0, 4: 1, 8: 3 };
  const shift = shifts[type] ?? 0;
  const code = sourceCode << shift;
  const sizes = config.bank_sizes ?? [];
  for (const range of config.bank_mapper ?? []) {
    if (!range.type) break;
    if (
      code < range.start || code > range.end ||
      !(range.type & type)
    ) continue;
    const size = sizes[range.bank] ?? 0;
    if (!size) return -1;
    let base = 0;
    for (let bank = 0; bank < range.bank; bank++) base += sizes[bank] ?? 0;
    return (base + (code & (size - 1))) >> shift;
  }
  return -1;
}

type GeneratedDirectScreenShape =
  | 'berzerk-color-bitmap'
  | 'bublbobl-object-columns'
  | 'cosmic-bitmap-sprites'
  | 'dkong-scanline-sprites'
  | 'exidy-character-ram'
  | 'gauntlet-tilemaps'
  | 'galaxian-no-bullets'
  | 'm62-category-sprites'
  | 'outrun-sega16-layers'
  | 'system16a-layers'
  | 'system16b-layers'
  | 'system1-prom-mixer'
  | 'technos-tilemap-sprites'
  | 'tnx1-banked-raster'
  | 'timeplt'
  | 'taitosj-layered-char-ram'
  | 'vicdual-character-ram'
  | 'williams-column-bitmap';

/**
 * Select direct executors by the generated MAME routine structure. Keeping the
 * check source-shaped means another driver only inherits a fast path when it
 * has the same semantics; no game name or handwritten package flag is needed.
 */
export function generatedDirectScreenShape(
  machine: BoardIr,
): GeneratedDirectScreenShape | undefined {
  const screenKey = machine.execution.screenUpdate?.handler;
  const screen = machine.handlers?.find(handler =>
    `${handler.ownerClass}.${handler.method}` === screenKey);
  const body = screen?.body ?? '';
  if (
    body.includes('m_mob->draw_async(cliprect)') &&
    body.includes('m_playfield_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    body.includes('m_mob->iterate_dirty_rects(') &&
    body.includes('m_alpha_tilemap->draw(screen, bitmap, cliprect, 0, 0)')
  ) {
    return 'gauntlet-tilemaps';
  }
  if (
    body.includes('m_sprites->draw_async(cliprect)') &&
    body.includes('m_segaic16road->segaic16_road_draw') &&
    body.includes('m_segaic16vid->tilemap_draw') &&
    body.includes('m_sprites->iterate_dirty_rects(')
  ) {
    return 'outrun-sega16-layers';
  }
  if (
    body.includes('m_sprites->draw_async(cliprect)') &&
    body.includes('m_segaic16vid->tilemap_draw') &&
    body.includes('m_sprites->iterate_dirty_rects(') &&
    !body.includes('m_segaic16road->segaic16_road_draw')
  ) {
    return machine.family === 'segas16a' ? 'system16a-layers' : 'system16b-layers';
  }
  if (
    body.includes('m_bg_tilemap->set_scrollx(i, m_m62_background_hscroll)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    body.includes('draw_sprites(bitmap, cliprect, 0x1f, 0x00, 0x00)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 1, 0)')
  ) {
    return 'm62-category-sprites';
  }
  if (
    body.includes('set_colors()') &&
    body.includes('draw_background()') &&
    body.includes('copybitmap(bitmap, m_background_bitmap') &&
    body.includes('draw_sprites(bitmap, cliprect)') &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_background' &&
      handler.body?.includes('const uint8_t *const cram = m_characterram') &&
      handler.body.includes('m_background_bitmap.pix(y, x)')) &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('236 - *m_sprite2_xpos - 4') &&
      handler.body.includes('m_gfxdecode->gfx(0)->transpen'))
  ) {
    return 'exidy-character-ram';
  }
  if (
    body.includes('for (int offs = 0; offs < m_videoram.bytes(); offs++)') &&
    body.includes('m_colorram[((offs >> 2) & 0x07e0) | (offs & 0x001f)]') &&
    body.includes('rgb_t pen = (data & 0x80) ? pens[color >> 4]') &&
    body.includes('rgb_t pen = (data & 0x80) ? pens[color & 0x0f]')
  ) {
    return 'berzerk-color-bitmap';
  }
  if (
    body.includes('draw_bitmap(bitmap, cliprect)') &&
    body.includes('draw_sprites(bitmap, cliprect, 0x07, 1)') &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_bitmap' &&
      handler.body?.includes('for (offs_t offs = 0; offs < m_videoram.bytes(); offs++)') &&
      handler.body.includes('(this->*m_map_color)(x, y)')) &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('for (offs = m_spriteram.bytes() - 4;offs >= 0;offs -= 4)') &&
      handler.body.includes('m_gfxdecode->gfx(1)->transpen'))
  ) {
    return 'cosmic-bitmap-sprites';
  }
  if (
    body.includes('uint8_t const *const source = &m_videoram[y]') &&
    body.includes('source[(x / 2) * 256]') &&
    body.includes('m_palette->pen_color(m_paletteram[x])')
  ) {
    return 'williams-column-bitmap';
  }
  if (
    body.includes('m_videoram[offs]') &&
    body.includes('m_characterram[offs]') &&
    body.includes('m_palette_bank << 3') &&
    body.includes('m_proms->base()') &&
    body.includes('video_data & 0x80')
  ) {
    return 'vicdual-character-ram';
  }
  if (
    body.includes('m_bg_tilemap->set_scrollx(0, scrollx)') &&
    body.includes('m_bg_tilemap->set_scrolly(0, scrolly)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    body.includes('draw_sprites(bitmap, cliprect)') &&
    body.includes('m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('for (uint32_t i = 0; i < bytes; i += 5)') &&
      handler.body.includes('int const size = (attr & 0x30) >> 4') &&
      handler.body.includes('which &= ~size'))
  ) {
    return 'technos-tilemap-sprites';
  }
  if (
    body.includes('const auto ilmode(m_io_mconf->read())') &&
    body.includes('draw_background(bm, cliprect)') &&
    body.includes('draw_sprites(bm, cliprect)') &&
    body.includes('m_fg_tilemap->draw(screen, bm, cliprect, 0, 0)') &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_background' &&
      handler.body?.includes('uint16_t rovi = (flip_screen() ? (y / 2) ^ 0xff : (y / 2))') &&
      handler.body.includes('m_background_ram[BIT(rovi, 8)')) &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('for (int offs = 4; offs < m_dmasource.bytes(); offs += 4)') &&
      handler.body.includes('attributes[m_sprite_ram[offs] >> 2]'))
  ) {
    return 'tnx1-banked-raster';
  }
  if (
    body.includes('bitmap_ind16 *bgpixmaps[4]') &&
    body.includes('bgpixmaps[0] = bgpixmaps[1] = bgpixmaps[2] = bgpixmaps[3]') &&
    body.includes('video_update_common(screen, bitmap, cliprect, fgpixmap, bgpixmaps') &&
    machine.handlers?.some(handler =>
      handler.method === 'video_update_common' &&
      handler.body?.includes('m_lookup_prom[lookup_index]') &&
      handler.body.includes('m_mix_collide_summary = 1')) &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('for (int spritenum = 0; spritenum < 32; spritenum++)') &&
      handler.body.includes('m_sprite_collide_summary = 1'))
  ) {
    return 'system1-prom-mixer';
  }
  if (
    body.includes('machine().tilemap().set_flip_all(m_flip ? TILEMAP_FLIPX | TILEMAP_FLIPY : 0)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    body.includes('draw_sprites(bitmap, cliprect, 0x40, 1)') &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('scanline_vf = (cliprect.max_y - 1) & 0xFF') &&
      handler.body.includes('(num_sprt < 16)') &&
      handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap,cliprect,'))
  ) {
    return 'dkong-scanline-sprites';
  }
  if (
    body.includes('video_update_common(bitmap, cliprect,') &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_layers' &&
      handler.body?.includes('m_gfxdecode->gfx(m_colorbank[0] & 0x08 ? 2 : 0)->transpen') &&
      handler.body.includes('m_videoram[2][offs]')) &&
    machine.handlers?.some(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('SPRITE_RAM_PAGE_OFFSET') &&
      handler.body.includes('get_sprite_gfx_element(which)->transpen'))
  ) {
    return 'taitosj-layered-char-ram';
  }
  if (
    body.includes('bitmap.fill(255, cliprect)') &&
    body.includes('for (offs = 0; offs < m_objectram.bytes(); offs += 4)') &&
    body.includes('prom_line = prom + 0x80 + ((gfx_num & 0xe0) >> 1)') &&
    body.includes('m_gfxdecode->gfx(0)->transpen(bitmap,cliprect,') &&
    body.includes('m_videoram[goffs + 1]') &&
    body.includes('sx += 16')
  ) {
    return 'bublbobl-object-columns';
  }
  if (
    body.includes('m_draw_background_ptr(bitmap, cliprect)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    body.includes('for (int i = 0; i < m_numspritegens; i++)') &&
    body.includes('sprites_draw(screen, bitmap, cliprect,') &&
    body.includes('if (!m_draw_bullet_ptr.isnull())') &&
    machine.video?.delegates?.m_draw_bullet_ptr === null
  ) {
    const sprites = machine.handlers?.find(handler =>
      handler.method === 'sprites_draw' &&
      handler.body?.includes('for (int sprnum = 7; sprnum >= 0; sprnum--)') &&
      handler.body.includes('m_extend_sprite_info_ptr(base, &sx, &sy, &flipx, &flipy, &code, &color)') &&
      handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap,clip,'));
    const extensionKey = machine.video?.delegates?.m_extend_sprite_info_ptr;
    const extension = typeof extensionKey === 'string'
      ? machine.handlers?.find(handler =>
          `${handler.ownerClass}.${handler.method}` === extensionKey)
      : undefined;
    if (
      sprites?.program?.diagnostics.length === 0 &&
      extension?.program?.diagnostics.length === 0 &&
      extension.program.operations.length === 0
    ) {
      return 'galaxian-no-bullets';
    }
  }
  if (
    body.includes('if (m_video_enable)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
    body.includes('draw_sprites(bitmap, cliprect)') &&
    body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 1, 0)')
  ) {
    const sprites = machine.handlers?.find(handler =>
      handler.method === 'draw_sprites' &&
      handler.body?.includes('for (int offs = 0x3e; offs >= 0x10; offs -= 2)') &&
      handler.body.includes('int const sy = 241 - m_spriteram[1][offs + 1]') &&
      handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap, cliprect,'));
    if (sprites?.program?.diagnostics.length === 0) return 'timeplt';
  }
  return undefined;
}

/** Decode one pixel from the Taito SJ board's writable character RAM. */
export function decodeTaitoSjRamPixel(
  characterRam: Uint8Array,
  bank: number,
  code: number,
  x: number,
  y: number,
  sprite: boolean,
): number {
  const xOffset = sprite && x >= 8 ? 64 + 7 - (x - 8) : 7 - x;
  const yOffset = sprite && y >= 8 ? 128 + (y - 8) * 8 : y * 8;
  const increment = sprite ? 256 : 64;
  let value = 0;
  for (let plane = 0; plane < 3; plane++) {
    const bit = [32768, 16384, 0][plane]! + code * increment + yOffset + xOffset;
    const source = characterRam[bank + (bit >>> 3)] ?? 0;
    // gfx_element::decode reads layout offsets MSB-first within each byte,
    // and plane zero contributes the most-significant pen bit.
    value |= Number(Boolean(source & (0x80 >>> (bit & 7)))) << (2 - plane);
  }
  return value;
}

const VICDUAL_COLORS = new Uint32Array([
  0xff000000,
  0xff00ff00,
  0xffff0000,
  0xffffff00,
  0xff0000ff,
  0xff00ffff,
  0xffff00ff,
  0xffffffff,
]);

/** Decode a packed RGB32 pixel from the Vic Dual foreground/background PROM. */
export function decodeVicDualPixel(
  characterLine: number,
  colorProm: number,
  x: number,
): number {
  const color = characterLine & (0x80 >>> (x & 7))
    ? (colorProm >>> 5) & 7
    : (colorProm >>> 1) & 7;
  return VICDUAL_COLORS[color]!;
}

/** Williams' 256-entry 3:3:2 resistor palette. */
export function williamsPaletteColor(value: number): number {
  const weighted = (bits: number[], resistances: number[]): number => {
    const conductance = resistances.map(resistance => 1 / resistance);
    const total = conductance.reduce((sum, item) => sum + item, 0);
    return Math.round(bits.reduce(
      (sum, bit, index) => sum + Number(Boolean(value & (1 << bit))) * conductance[index]!,
      0,
    ) * 255 / total);
  };
  return packRgb(
    weighted([0, 1, 2], [1200, 560, 330]),
    weighted([3, 4, 5], [1200, 560, 330]),
    weighted([6, 7], [560, 330]),
  );
}

/** Taito SJ's layer shifters include a different fixed pixel skew per plane. */
export function taitoSjLayerScrollX(
  raw: number,
  layer: number,
  flipped: boolean,
): number {
  const fudge1 = [3, 1, -1][layer] ?? 0;
  const fudge2 = [8, 10, 12][layer] ?? 0;
  return (flipped ? raw & 0xf8 : -(raw & 0xf8)) +
    ((raw + fudge1) & 7) + fudge2;
}

/** Coordinates are eight-bit on the board; subtraction must wrap before clipping. */
export function taitoSjSpritePosition(
  x: number,
  y: number,
): { x: number; y: number; visible: boolean } {
  const sx = (x - 1) & 0xff;
  const sy = (240 - y) & 0xff;
  return { x: sx, y: sy, visible: sy < 240 };
}

/** Pole Position's palette PROMs also carry the road vertical-address table. */
export function polePositionVerticalModifiers(proms: Uint8Array): Uint16Array {
  const modifiers = new Uint16Array(256);
  for (let index = 0; index < modifiers.length; index++) {
    modifiers[index] =
      (proms[0x500 + index] ?? 0) |
      ((proms[0x600 + index] ?? 0) << 4) |
      ((proms[0x700 + index] ?? 0) << 8);
  }
  return modifiers;
}

const segaSystem16Conductance = [3900, 2000, 1000, 500, 250]
  .map(resistance => 1 / resistance);
const segaSystem16ColorTotal = segaSystem16Conductance.reduce((sum, item) => sum + item, 0);
const computeSegaSystem16Channel = (
  value: number,
  effect: 'normal' | 'shadow' | 'highlight',
): number => {
  const effectConductance = effect === 'normal' ? 0 : 1 / 470;
  let high = effect === 'highlight' ? effectConductance : 0;
  for (let bit = 0; bit < segaSystem16Conductance.length; bit++) {
    if (value & (1 << bit)) high += segaSystem16Conductance[bit]!;
  }
  return Math.round(255 * high / (segaSystem16ColorTotal + effectConductance));
};
const segaSystem16Channels = {
  normal: Uint8Array.from(
    { length: 32 },
    (_, value) => computeSegaSystem16Channel(value, 'normal'),
  ),
  shadow: Uint8Array.from(
    { length: 32 },
    (_, value) => computeSegaSystem16Channel(value, 'shadow'),
  ),
  highlight: Uint8Array.from(
    { length: 32 },
    (_, value) => computeSegaSystem16Channel(value, 'highlight'),
  ),
};

/** Sega's five-bit resistor DAC, including its 470-ohm shadow/highlight leg. */
export function segaSystem16Channel(
  value: number,
  effect: 'normal' | 'shadow' | 'highlight' = 'normal',
): number {
  return segaSystem16Channels[effect][value & 31]!;
}

/** Decode the non-linear bit wiring used by Sega's System 16 palette RAM. */
export function segaSystem16PaletteEntry(raw: number): {
  normal: number;
  effect: number;
} {
  const red = ((raw >>> 12) & 1) | ((raw << 1) & 0x1e);
  const green = ((raw >>> 13) & 1) | ((raw >>> 3) & 0x1e);
  const blue = ((raw >>> 14) & 1) | ((raw >>> 7) & 0x1e);
  const effect = raw & 0x8000 ? 'highlight' : 'shadow';
  return {
    normal: packRgb(
      segaSystem16Channel(red),
      segaSystem16Channel(green),
      segaSystem16Channel(blue),
    ),
    effect: packRgb(
      segaSystem16Channel(red, effect),
      segaSystem16Channel(green, effect),
      segaSystem16Channel(blue, effect),
    ),
  };
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
  readonly colors: Uint32Array;

  constructor(entries: number) {
    this.colors = new Uint32Array(Math.max(1, entries)).fill(0xff000000);
  }

  set_pen_color(pen: number, colorOrRed: number, green?: number, blue?: number): void {
    // MAME has both overloads: a packed rgb_t, and three channels.
    const color = green === undefined
      ? colorOrRed >>> 0
      : (0xff000000 | ((colorOrRed & 0xff) << 16) | ((green & 0xff) << 8) | ((blue ?? 0) & 0xff)) >>> 0;
    if (pen >= 0 && pen < this.colors.length) this.colors[pen] = color;
  }

  transpen_mask(): number { return 0; }

  black_pen(): number { return 0; }

  pens(): Uint32Array { return this.colors; }
}

/**
 * Hardware-neutral MAME video services. All layouts, palette wiring,
 * tile callbacks, sprite loops and initial state come from generated IR.
 */
export class GeneratedMameVideoPrimitives implements GeneratedVideoPrimitives, Renderer {
  readonly width: number;
  readonly height: number;
  private readonly machine: BoardIr;
  private readonly regions: Regions;
  private readonly state: Record<string, unknown>;
  private readonly motionObjects?: GeneratedMotionObjects;
  private readonly gfx: GeneratedGfxElement[];
  private readonly palette?: GeneratedPaletteDevice;
  private readonly palettes = new Map<string, GeneratedPaletteDevice>();
  private readonly ramPalette?: GeneratedRamPalette;
  private readonly bitmapPalette?: GeneratedBitmapPalette;
  private readonly gfxByDecode = new Map<string, GeneratedGfxElement[]>();
  private readonly bindings: GeneratedHandlerBindings;
  private readonly directScreenShape?: GeneratedDirectScreenShape;
  private readonly memoryRead?: (address: number) => number;
  private ramPaletteMirror?: Uint16Array;
  private priorityBitmap?: GeneratedPriorityBitmap;

  constructor(
    machine: BoardIr,
    regions: Regions,
    state: Record<string, unknown>,
    bindings: GeneratedHandlerBindings,
    updatePartial?: (line: number) => void,
    memoryRead?: (address: number) => number,
  ) {
    this.machine = machine;
    this.regions = regions;
    this.state = state;
    this.memoryRead = memoryRead;
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
    for (const [member, values] of Object.entries(machine.video?.colorTables ?? {})) {
      state[member] = Uint32Array.from(values, value => value >>> 0);
    }
    const lfsr = machine.video?.lfsrTable;
    if (lfsr) {
      const values = new Uint8Array(lfsr.period);
      let shift = 0;
      for (let index = 0; index < values.length; index++) {
        const enabled = (shift & lfsr.enabledMask) === lfsr.enabledValue;
        const color = (~shift & lfsr.colorMask) >> lfsr.colorShift;
        values[index] = color | (enabled ? 0x80 : 0);
        const feedback = ((shift >> lfsr.feedbackTap) ^ ~(shift >> lfsr.feedbackInvertTap)) & 1;
        shift = (shift >> 1) | (feedback << (lfsr.feedbackWidth - 1));
      }
      state[lfsr.member] = values;
    }
    if (machine.video?.palette) {
      this.palettes.set(
        'm_palette',
        machine.video.palette.dynamic?.kind === 'tnx1-banked'
          ? new GeneratedTnx1Palette(machine.video.palette.dynamic, regions)
          : new GeneratedPalette(machine.video.palette, regions),
      );
    }
    if (machine.video?.paletteProgram) {
      this.palettes.set(
        'm_palette',
        new GeneratedProgramPalette(machine.video.paletteProgram, regions, machine.game),
      );
    }
    const ramPalettePlan = machine.video?.ramPalette ?? (machine.family === 'neogeo'
      ? {
        // Neo Geo does not use palette_device::set_format: paletteram_w
        // performs the source's dark-bit RGB conversion itself and writes
        // both the normal and shadow halves with set_pen_color.  The device
        // nevertheless owns 0x4000 live pens (0x2000 per screen-shadow bank),
        // and pointer arithmetic in set_pens must address that real storage.
        tag: 'palette',
        endianness: 'big' as const,
        entries: 0x4000,
        bytesPerEntry: 2,
        channels: [
          { channel: 'r' as const, bits: 5, shift: 10 },
          { channel: 'g' as const, bits: 5, shift: 5 },
          { channel: 'b' as const, bits: 5, shift: 0 },
        ],
      }
      : undefined);
    if (machine.family === 'neogeo') {
      // These are source-owned std::vector/static-array members rather than
      // address-map shares, so there is no finder from which composition can
      // infer their storage. Materialize the exact neogeo_v.cpp extents and
      // the five measured DAC resistors before video_start executes.
      state.m_paletteram ??= new Array<number>(0x2000).fill(0);
      state.m_palette_lookup ??= Array.from(
        { length: 32 },
        () => new Array<number>(4).fill(0),
      );
      state.resistances ??= [3900, 2200, 1000, 470, 220];
    }
    if (ramPalettePlan) {
      this.ramPalette = new GeneratedRamPalette(ramPalettePlan);
      this.palettes.set('m_palette', this.ramPalette);
    }
    if (bitmapPlan?.paletteRam) {
      this.bitmapPalette = new GeneratedBitmapPalette(bitmapPlan.paletteRam);
      this.palettes.set(bitmapPlan.paletteRam.member, this.bitmapPalette);
    }
    for (const palette of machine.video?.palettes ?? []) {
      this.palettes.set(palette.member, new GeneratedPalette(palette.plan, regions));
    }
    this.palette = this.palettes.get('m_palette') ?? this.palettes.values().next().value;
    // A machine whose colours are written by code rather than decoded from a
    // colour PROM: MAME hands `palette_device` an init routine, and the pens
    // it sets are the whole palette. Run once here, as MAME runs it once at
    // device_start, so the screen has colours before the first frame.
    if (!this.palette && machine.execution.paletteInit) {
      this.palette = new GeneratedInitialisedPalette(machine.execution.paletteInit.entries ?? 0);
    }
    const indexed = isIndexedScreen(machine);
    this.gfx = (machine.video?.gfx ?? []).map(entry => {
      const stateRegion = state[`m_${entry.region.replace(/[^A-Za-z0-9_]/g, '_')}`];
      const region = entry.ram && ArrayBuffer.isView(stateRegion)
        ? stateRegion as Uint8Array
        : regions[entry.region] ?? (
          ArrayBuffer.isView(stateRegion) ? stateRegion as Uint8Array : undefined
        );
      if (!region) throw new Error(`${machine.game}: missing gfx region "${entry.region}"`);
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
        decodeGfx(entry.layout, region, entry.offset),
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
    const motionObjectsPlan = machine.video?.motionObjects;
    const motionObjectsGfx = motionObjectsPlan && this.gfx[motionObjectsPlan.gfxIndex];
    if (motionObjectsPlan && motionObjectsGfx) {
      const share = (name?: string) => (): ArrayLike<number> | undefined => {
        const bytes = name === undefined ? undefined : state[`m_${name}`];
        return ArrayBuffer.isView(bytes) ? bytes as unknown as ArrayLike<number> : undefined;
      };
      this.motionObjects = new GeneratedMotionObjects(
        motionObjectsPlan,
        motionObjectsGfx,
        share(motionObjectsPlan.spriteShare),
        share(motionObjectsPlan.slipShare),
        this.width,
        this.height,
      );
    }
    const referenceCalls: NonNullable<GeneratedHandlerBindings['referenceCalls']> = {
      ...bindings.referenceCalls,
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
        };
      },
      rectangle: (...args) => new GeneratedRectangle(
        Number(args[0] ?? 0),
        Number(args[1] ?? 0),
        Number(args[2] ?? 0),
        Number(args[3] ?? 0),
      ),
      copyscrollbitmap: (...rawArgs) => {
        const destination = generatedArgumentValue(rawArgs[0]) as BitmapTarget | undefined;
        const source = generatedArgumentValue(rawArgs[1]) as GeneratedIndexedBitmap | undefined;
        const clip = generatedArgumentValue(rawArgs[6]) as GeneratedRectangle | undefined;
        if (!destination || !source || !clip) return 0;
        const scrollX = generatedPointerNumber(rawArgs[3]);
        const scrollY = generatedPointerNumber(rawArgs[5]);
        for (let y = clip.min_y; y <= clip.max_y; y++) {
          const sourceY = modulo(y - scrollY, source.height);
          for (let x = clip.min_x; x <= clip.max_x; x++) {
            const sourceX = modulo(x - scrollX, source.width);
            destination['pix='](y, x, source.pix(sourceY, sourceX));
          }
        }
        return 0;
      },
      'machine().tilemap().mark_all_dirty': () => {
        for (const plan of machine.video?.tilemaps ?? []) {
          (state[plan.member] as GeneratedTilemap | undefined)?.mark_all_dirty();
        }
        return 0;
      },
      'machine().tilemap().set_flip_all': (...args) => {
        const flags = Number(generatedArgumentValue(args[0]) ?? 0);
        for (const plan of machine.video?.tilemaps ?? []) {
          (state[plan.member] as GeneratedTilemap | undefined)?.set_flip(flags);
        }
        return 0;
      },
    };
    const roadHandler = machine.handlers?.find(handler =>
      handler.method === 'draw_road' &&
      handler.body?.includes('m_vertical_position_modifier') &&
      handler.body.includes('m_road16_memory'));
    if (roadHandler) {
      // polepos_palette() has a non-palette side effect: three PROM pages are
      // combined into the road generator's 12-bit vertical address table.
      // The generated palette plan owns colors and lookup pens, so materialize
      // this source table explicitly before the first road draw.
      const colorProms = state.m_proms;
      if (ArrayBuffer.isView(colorProms)) {
        state.m_vertical_position_modifier = polePositionVerticalModifiers(
          colorProms as unknown as Uint8Array,
        );
      }
      const drawRoad = (...rawArgs: unknown[]) => {
        const bitmap = generatedArgumentValue(rawArgs[0]) as BitmapTarget | undefined;
        const roadRegion = state.m_road_region;
        const roadMemory = state.m_road16_memory;
        const vertical = state.m_vertical_position_modifier;
        if (
          !bitmap || !ArrayBuffer.isView(roadRegion) ||
          !ArrayBuffer.isView(roadMemory) || !ArrayBuffer.isView(vertical)
        ) return 0;
        const roadBytes = roadRegion as unknown as Uint8Array;
        const roadWords = roadMemory as unknown as Uint16Array;
        const verticalWords = vertical as unknown as Uint16Array;
        // Driver raster coordinates include the configured visible-area
        // offset. A framebuffer's compact height is not the source bitmap's
        // maximum y (Pole Position exposes 224 rows at source y=16..239 and
        // its road generator intentionally draws through y=255). Let pix=
        // perform the final visible clipping in that source coordinate space.
        const height = this.machine.execution.screen.vtotal;
        const roadBits1 = 0x2000;
        const roadBits2 = 0x4000;
        for (let y = 128; y < Math.min(256, height); y++) {
          const scanline = new Uint16Array(256 + 8);
          let destination = 0;
          const yOffset = (
            ((verticalWords[y] ?? 0) + Number(state.m_road16_vscroll ?? 0)) >> 3
          ) & 0x1ff;
          const roadPalette = (roadWords[yOffset] ?? 0) & 15;
          const penBase = 0x0b00 + (roadPalette << 6);
          let xOffset = (roadWords[0x380 + (y & 0x7f)] ?? 0) & 0x3ff;
          const xScroll = xOffset & 7;
          xOffset &= ~7;
          for (let chunk = 0; chunk < 256 / 8 + 1; chunk++, xOffset += 8) {
            if (xOffset & 0x200) {
              for (let pixel = 0; pixel < 8; pixel++) scanline[destination++] = penBase;
              continue;
            }
            const romOffset = ((y & 0x07f) << 6) + ((xOffset & 0x1f8) >> 3);
            const control = roadBytes[romOffset] ?? 0;
            const bits1 = roadBytes[roadBits1 + romOffset] ?? 0;
            const bits2 = roadBytes[roadBits2 +
              ((romOffset & 0xfff) | ((romOffset & 0x1000) >> 1))] ?? 0;
            let roadValue = control & 0x3f;
            const carryIn = control >>> 7;
            for (let pixel = 8; pixel > 0; pixel--) {
              let bits = ((bits1 >>> pixel) & 1) + (((bits2 >>> pixel) & 1) << 1);
              if (!carryIn && bits) bits++;
              scanline[destination++] = penBase | (roadValue & 0x3f);
              roadValue += bits;
            }
          }
          for (let x = 0; x < 256; x++) bitmap['pix='](y, x, scanline[x + xScroll]!);
        }
        return 0;
      };
      referenceCalls.draw_road = drawRoad;
      referenceCalls[`${roadHandler.ownerClass}.draw_road`] = drawRoad;
    }
    const zoomSpriteHandler = machine.handlers?.find(handler =>
      handler.method === 'zoom_sprite' &&
      handler.body?.includes('m_scalelut_region[(y << 6) + sizey]') &&
      handler.body.includes('gfx->get_data(code % gfx->elements())') &&
      handler.body.includes('bitmap.pix(yy, xx) = pen + coloroffs'));
    const spriteHandler = machine.handlers?.find(handler =>
      handler.method === 'draw_sprites' &&
      handler.ownerClass === zoomSpriteHandler?.ownerClass &&
      handler.body?.includes('&m_sprite16_memory[0x380]') &&
      handler.body.includes('&m_sprite16_memory[0x780]') &&
      handler.body.includes('zoom_sprite(bitmap, BIT(sizmem[0], 15)'));
    if (zoomSpriteHandler && spriteHandler) {
      const zoomSprite = (...rawArgs: unknown[]) => {
        const bitmap = generatedArgumentValue(rawArgs[0]) as BitmapTarget | undefined;
        const big = Boolean(Number(generatedArgumentValue(rawArgs[1]) ?? 0));
        const code = Number(generatedArgumentValue(rawArgs[2]) ?? 0) >>> 0;
        const color = Number(generatedArgumentValue(rawArgs[3]) ?? 0) >>> 0;
        const flipX = Boolean(Number(generatedArgumentValue(rawArgs[4]) ?? 0));
        const sx = Number(generatedArgumentValue(rawArgs[5]) ?? 0) | 0;
        const sy = Number(generatedArgumentValue(rawArgs[6]) ?? 0) | 0;
        const sizeX = Number(generatedArgumentValue(rawArgs[7]) ?? 0) | 0;
        const sizeY = Number(generatedArgumentValue(rawArgs[8]) ?? 0) | 0;
        const scale = state.m_scalelut_region;
        const gfx = this.gfx[big ? 3 : 2];
        if (!bitmap || !ArrayBuffer.isView(scale) || !gfx || !this.palette) return 0;
        const scaleLut = scale as unknown as Uint8Array;
        const source = gfx.get_data(code % gfx.elements());
        const transparent = this.palette.transpen_mask(gfx, color, 0x1f);
        const colorOffset = gfx.colorbase() + color * gfx.granularity();
        const offsetXor = flipX ? (big ? 0x1f : 0x0f) : 0;
        for (let y = 0; y <= sizeY; y++) {
          const yy = (sy + y) & 0x1ff;
          if (yy < 0x10 || yy >= 0xf0) continue;
          let dy = (scaleLut[(y << 6) + sizeY] ?? 0) & 0x1f;
          if (!big) dy >>= 1;
          const row = dy * gfx.rowbytes();
          let xx = sx & 0x3ff;
          let accumulator = 0;
          let sourceOffset = 0;
          for (let x = big ? 0x40 : 0x20; x > 0; x--) {
            if (xx < 0x100) {
              const pen = source[row + ((sourceOffset >> 1) ^ offsetXor)] ?? 0;
              if (!((transparent >>> pen) & 1)) {
                bitmap['pix=']?.(yy, xx, pen + colorOffset);
              }
            }
            sourceOffset++;
            accumulator += 1 + sizeX;
            if (accumulator & 0x40) {
              accumulator &= 0x3f;
              xx = (xx + 1) & 0x3ff;
            }
          }
        }
        return 0;
      };
      const drawSprites = (...rawArgs: unknown[]) => {
        const bitmap = generatedArgumentValue(rawArgs[0]) as BitmapTarget | undefined;
        const spriteMemory = state.m_sprite16_memory;
        if (!bitmap || !ArrayBuffer.isView(spriteMemory)) return 0;
        const words = spriteMemory as unknown as Uint16Array;
        for (let index = 0; index < 64; index++) {
          const position = 0x380 + index * 2;
          const size = 0x780 + index * 2;
          const positionY = words[position] ?? 0;
          const positionX = words[position + 1] ?? 0;
          const sizeCode = words[size] ?? 0;
          const sizeColor = words[size + 1] ?? 0;
          const sx = (positionX & 0x3ff) - 0x40 + 4;
          const sy = 512 - (positionY & 0x1ff) + 1;
          const sizeX = (sizeColor & 0x3f00) >> 8;
          const sizeY = (sizeCode & 0x3f00) >> 8;
          const code = sizeCode & 0x7f;
          const flipX = Boolean(sizeCode & 0x80);
          let color = sizeColor & 0x3f;
          if (sy >= 128) color |= 0x40;
          zoomSprite(
            bitmap,
            Number(Boolean(sizeCode & 0x8000)),
            code,
            color,
            Number(flipX),
            sx,
            sy,
            sizeX,
            sizeY,
          );
        }
        return 0;
      };
      referenceCalls.zoom_sprite = zoomSprite;
      referenceCalls[`${zoomSpriteHandler.ownerClass}.zoom_sprite`] = zoomSprite;
      referenceCalls.draw_sprites = drawSprites;
      referenceCalls[`${spriteHandler.ownerClass}.draw_sprites`] = drawSprites;
    }
    const cpsBankMapper = machine.handlers?.find(handler =>
      handler.method === 'gfxrom_bank_mapper' &&
      handler.body?.includes('m_game_config->bank_mapper') &&
      handler.body.includes('m_game_config->bank_sizes'));
    if (cpsBankMapper) {
      const map = (...rawArgs: unknown[]) => cpsGfxromBankMap(
        state.m_game_config as CpsGameConfig,
        Number(generatedArgumentValue(rawArgs[0]) ?? 0),
        Number(generatedArgumentValue(rawArgs[1]) ?? 0),
      );
      referenceCalls.gfxrom_bank_mapper = map;
      referenceCalls[`${cpsBankMapper.ownerClass}.gfxrom_bank_mapper`] = map;

      // CPS1 owns a uint16_t sprite buffer. The neutral ALLOC primitive is
      // byte-oriented because most generated driver allocations are u8; keep
      // the source element width here so the vblank memcpy and marker scan see
      // the same word table as MAME.
      referenceCalls.ALLOC = (...rawArgs) => new Uint16Array(
        Math.max(0, Number(generatedArgumentValue(rawArgs[0]) ?? 0)),
      );

      const spriteHandler = machine.handlers?.find(handler =>
        handler.ownerClass === cpsBankMapper.ownerClass &&
        handler.method === 'cps1_render_sprites' &&
        handler.body?.includes('m_buffered_obj.get()') &&
        handler.body.includes('handle blocked sprites'));
      if (spriteHandler) {
        const renderSprites = (...rawArgs: unknown[]) => {
          const bitmap = generatedArgumentValue(rawArgs[1]) as BitmapTarget | undefined;
          const clip = generatedArgumentValue(rawArgs[2]) as GeneratedRectangle | undefined;
          const words = state.m_buffered_obj;
          const gfx = this.gfx[2];
          const config = state.m_game_config as CpsGameConfig;
          if (!bitmap || !clip || !gfx || !ArrayBuffer.isView(words)) return 0;
          const objects = words as unknown as Uint16Array;
          const last = Math.min(
            Number(state.m_last_sprite_offset ?? -4),
            objects.length - 4,
          );
          if (last < 0) return 0;
          const reverse = Boolean(Number(config.bootleg_kludge ?? 0) & 0x40);
          let base = reverse ? last : 0;
          const baseAdd = reverse ? -4 : 4;
          const screenFlipped = Boolean(state.__flip_screen);
          // DRAWSPRITE is prio_transpen(..., screen.priority(), 0x02, 15), not
          // a plain transpen. Both halves of that matter: pmask 0x02 hides the
          // sprite under a scenery pen the tilemap pass stamped with 1, and the
          // implicit high mask bit means an object already drawn keeps the
          // pixel — CPS1 sprite priority is the object table's own order, and a
          // plain transpen inverts it (sf2's "INSERT COIN" vanished behind
          // Blanka; issue #82).
          const priority = this.screenPriority();
          const draw = (
            code: number, color: number, flipX: number, flipY: number,
            sx: number, sy: number,
          ) => {
            gfx.prio_transpen(
              bitmap,
              clip,
              code,
              color,
              screenFlipped ? Number(!flipX) : flipX,
              screenFlipped ? Number(!flipY) : flipY,
              screenFlipped ? 512 - 16 - sx : sx,
              screenFlipped ? 256 - 16 - sy : sy,
              priority,
              0x02,
              15,
            );
          };
          for (let offset = last; offset >= 0; offset -= 4, base += baseAdd) {
            const x = objects[base] ?? 0;
            const y = objects[base + 1] ?? 0;
            const sourceCode = objects[base + 2] ?? 0;
            const attributes = objects[base + 3] ?? 0;
            const mapped = cpsGfxromBankMap(config, 1, sourceCode);
            if (mapped < 0) continue;
            const color = attributes & 0x1f;
            const flipX = Number(Boolean(attributes & 0x20));
            const flipY = Number(Boolean(attributes & 0x40));
            const nx = (attributes & 0xff00) ? ((attributes >>> 8) & 0x0f) + 1 : 1;
            const ny = (attributes & 0xff00) ? ((attributes >>> 12) & 0x0f) + 1 : 1;
            for (let blockY = 0; blockY < ny; blockY++) {
              const sy = (y + blockY * 16) & 0x1ff;
              const codeY = flipY ? ny - 1 - blockY : blockY;
              for (let blockX = 0; blockX < nx; blockX++) {
                const sx = (x + blockX * 16) & 0x1ff;
                const codeX = flipX ? nx - 1 - blockX : blockX;
                const code = (mapped & ~0x0f) + ((mapped + codeX) & 0x0f) + 0x10 * codeY;
                draw(code, color, flipX, flipY, sx, sy);
              }
            }
          }
          return 0;
        };
        referenceCalls.cps1_render_sprites = renderSprites;
        referenceCalls[`${spriteHandler.ownerClass}.cps1_render_sprites`] = renderSprites;
      }
    }
    if (lfsr?.rowRenderer) {
      const row = lfsr.rowRenderer;
      referenceCalls[row.method] = (...rawArgs) => {
        const args = rawArgs.map(generatedArgumentValue);
        const bitmap = args[0] as BitmapTarget;
        const maxX = Number(args[1]);
        const y = Number(args[2]);
        let starOffset = modulo(Number(args[3]), lfsr.period);
        const starMask = Number(args[4]);
        const stars = state[lfsr.member] as Uint8Array;
        const colors = state[row.colorMember] as Uint32Array;
        const scale = Number(state[row.scaleMember] ?? 1);
        for (let x = 0; x < maxX; x++) {
          const enabled = (y ^ (x >> 3)) & 1;
          let star = stars[starOffset++]!;
          if (starOffset >= lfsr.period) starOffset = 0;
          if (enabled && (star & 0x80) && (star & starMask)) {
            bitmap['pix='](y, scale * x, colors[star & 0x3f] ?? 0xff000000);
          }
          star = stars[starOffset++]!;
          if (starOffset >= lfsr.period) starOffset = 0;
          if (enabled && (star & 0x80) && (star & starMask)) {
            const color = colors[star & 0x3f] ?? 0xff000000;
            bitmap['pix='](y, scale * x + 1, color);
            bitmap['pix='](y, scale * x + 2, color);
          }
        }
        return 0;
      };
    }
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
      state.m_gfxdecode = { gfx: (index: number) => this.gfx[index] };
      state.m_palette = this.palette;
    }
    for (const [member, palette] of this.palettes) {
      state[member] = palette;
    }
    for (const [member, gfx] of this.gfxByDecode) {
      state[member] = { gfx: (index: number) => gfx[index] };
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
    const resistorWeightTables = new WeakMap<object, number[]>();
    calls.compute_resistor_weights ??= (...rawArgs: number[]) => {
      const args = rawArgs as unknown as unknown[];
      const minimum = Number(args[0] ?? 0);
      const maximum = Number(args[1] ?? 0);
      const requestedScale = Number(args[2] ?? -1);
      const networks = [3, 8, 13].flatMap(base => {
        const count = Number(args[base] ?? 0);
        const resistances = args[base + 1];
        const output = args[base + 2];
        if (!count || !Array.isArray(resistances) || !output || typeof output !== 'object') {
          return [];
        }
        return [{
          count,
          resistances: resistances.map(Number),
          output: output as object,
          pulldown: Number(args[base + 3] ?? 0),
          pullup: Number(args[base + 4] ?? 0),
          weights: [] as number[],
        }];
      });
      if (!networks.length) return requestedScale;
      let maximumOutput = 0;
      for (const network of networks) {
        for (let active = 0; active < network.count; active++) {
          let lowConductance = network.pulldown ? 1 / network.pulldown : 1 / 1e12;
          let highConductance = network.pullup ? 1 / network.pullup : 1 / 1e12;
          for (let index = 0; index < network.count; index++) {
            const resistance = network.resistances[index] ?? 0;
            if (!resistance) continue;
            if (index === active) highConductance += 1 / resistance;
            else lowConductance += 1 / resistance;
          }
          const low = 1 / lowConductance;
          const high = 1 / highConductance;
          network.weights[active] = Math.min(
            maximum,
            Math.max(minimum, (maximum - minimum) * low / (high + low) + minimum),
          );
        }
        maximumOutput = Math.max(
          maximumOutput,
          network.weights.reduce((sum, value) => sum + value, 0),
        );
      }
      const scale = requestedScale < 0
        ? maximum / Math.max(Number.EPSILON, maximumOutput)
        : requestedScale;
      for (const network of networks) {
        const scaled = network.weights.map(value => value * scale);
        // MAME writes the computed values into the caller-owned weight array.
        // Keeping them only in the WeakMap made later handler invocations lose
        // the table when the IR evaluator materialised a fresh pointer wrapper
        // for the same array (Gottlieb's dynamic palette is one such path).
        const output = network.output as Record<number, number>;
        for (let index = 0; index < scaled.length; index++) {
          output[index] = scaled[index]!;
        }
        resistorWeightTables.set(
          network.output,
          scaled,
        );
      }
      return scale;
    };
    calls.combine_weights ??= (...rawArgs: number[]) => {
      const args = rawArgs as unknown as unknown[];
      const output = args[0];
      const weights = output && typeof output === 'object'
        ? resistorWeightTables.get(output) ?? Array.from(output as ArrayLike<number>, Number)
        : [];
      const value = args.slice(1).reduce<number>(
        (sum, bit, index) => sum + (weights[index] ?? 0) * Number(bit),
        0,
      );
      return Math.trunc(value + 0.5);
    };
    calls['m_screen.width'] = () => this.width;
    calls['m_screen.height'] = () => this.height;
    calls['machine().tilemap().create'] = () =>
      createdTilemaps[Math.min(nextCreatedTilemap++, createdTilemaps.length - 1)] ?? 0;
    const bitmapMembers = new Map<string, number>();
    for (const handler of machine.handlers ?? []) {
      for (const match of (handler.body ?? '').matchAll(
        /\b(m_\w*bitmap\w*)\s*(?:\[\s*(\d+)\s*\])?/g,
      )) {
        bitmapMembers.set(
          match[1]!,
          Math.max(bitmapMembers.get(match[1]!) ?? 0, match[2] ? Number(match[2]) + 1 : 0),
        );
      }
    }
    const bitmapWidth = machine.execution.screen.width * (machine.video?.renderScale?.x ?? 1);
    const bitmapHeight = Math.max(256, machine.execution.screen.vtotal) * 2;
    for (const [member, count] of bitmapMembers) {
      if (state[member]) continue;
      state[member] = count
        ? Array.from({ length: count }, () => new GeneratedIndexedBitmap(bitmapWidth, bitmapHeight))
        : new GeneratedIndexedBitmap(bitmapWidth, bitmapHeight);
    }
    this.directScreenShape = generatedDirectScreenShape(machine);
    // The machine's own palette routine, run once with the palette it is
    // handed -- which is what MAME does at device_start. Every colour the
    // screen resolves comes out of this call.
    if (this.palette instanceof GeneratedInitialisedPalette) {
      const callback = machine.callbacks.find(candidate =>
        candidate.signal === 'palette_init');
      if (callback) {
        executeGeneratedCallbackHandler(
          machine,
          callback,
          this.bindings,
          { palette: this.palette },
        );
      }
    }
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

  screenPriority(): GeneratedPriorityBitmap {
    return (this.priorityBitmap ??= new GeneratedPriorityBitmap(this.machine));
  }

  generatedVideoBindings(_frame: Uint32Array): GeneratedHandlerBindings {
    return this.bindings;
  }

  directScreenUpdate(
    handler: string,
    screen: { visible_area(): GeneratedRectangle },
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
  ): boolean {
    if (handler !== this.machine.execution.screenUpdate?.handler) return false;
    const vector = this.machine.video?.vector;
    if (this.directScreenShape === 'exidy-character-ram') {
      const videoRaw = this.state.m_videoram;
      const characterRaw = this.state.m_characterram;
      const colorRaw = this.state.m_color_latch;
      const gfx = this.gfx[0];
      if (
        !ArrayBuffer.isView(videoRaw) ||
        !ArrayBuffer.isView(characterRaw) ||
        !ArrayBuffer.isView(colorRaw) ||
        !gfx
      ) return false;
      const video = videoRaw as Uint8Array;
      const characters = characterRaw as Uint8Array;
      const colors = colorRaw as Uint8Array;
      const colorBits = [0, 7, 0, 6, 4, 3, 2, 1];
      for (let pen = 0; pen < colorBits.length; pen++) {
        const bit = colorBits[pen]!;
        this.palette?.set_pen_color?.(
          pen,
          colors[2]! & (1 << bit) ? 255 : 0,
          colors[1]! & (1 << bit) ? 255 : 0,
          colors[0]! & (1 << bit) ? 255 : 0,
        );
      }
      bitmap.fill(0, cliprect);
      for (let offset = 0; offset < 0x400; offset++) {
        const code = video[offset] ?? 0;
        const onPen = 4 + ((code >>> 6) & 3);
        const tileX = (offset & 0x1f) << 3;
        const tileY = (offset >>> 5) << 3;
        for (let y = 0; y < 8; y++) {
          const line = characters[(code << 3) | y] ?? 0;
          for (let x = 0; x < 8; x++) {
            bitmap['pix='](tileY + y, tileX + x, line & (0x80 >>> x) ? onPen : 0);
          }
        }
      }
      const scalar = (value: unknown): number => {
        if (ArrayBuffer.isView(value)) {
          return Number((value as unknown as ArrayLike<number>)[0] ?? 0);
        }
        return generatedPointerNumber(value);
      };
      const spriteEnable = scalar(this.state.m_sprite_enable);
      const spriteNumber = scalar(this.state.m_spriteno);
      const sprite2X = 232 - scalar(this.state.m_sprite2_xpos);
      const sprite2Y = 240 - scalar(this.state.m_sprite2_ypos);
      const sprite2 = {
        code: ((spriteNumber >>> 4) & 0x0f) + 32 + (spriteEnable & 0x40 ? 16 : 0),
        x: sprite2X,
        y: sprite2Y,
      };
      const collisionMask = Number(this.state.m_collision_mask ?? 0);
      const sprite1Enabled = !(spriteEnable & 0x80) ||
        Boolean(spriteEnable & 0x10) || collisionMask === 0;
      const sprite1 = {
        code: (spriteNumber & 0x0f) + (spriteEnable & 0x20 ? 16 : 0),
        x: 232 - scalar(this.state.m_sprite1_xpos),
        y: 240 - scalar(this.state.m_sprite1_ypos),
        enabled: sprite1Enabled,
      };
      const collisions = exidySpriteCollisions(
        gfx.decoded,
        (x, y) => bitmap.pix?.(y, x) ?? 0,
        sprite1,
        sprite2,
        collisionMask,
      );
      const scheduleCollision =
        this.bindings.calls?.['machine().schedule_exidy_collision'];
      if (scheduleCollision) {
        for (const collision of collisions) {
          scheduleCollision(collision.position, collision.mask);
        }
      } else if (collisions.length) {
        // Isolated renderer hosts do not own a scanline scheduler. Preserve a
        // deterministic immediate fallback for those callers.
        const collision = collisions.reduce((mask, event) => mask | event.mask, 0);
        const collisionInvert = Number(this.state.m_collision_invert ?? 0);
        const interruptSource = this.bindings.inputs?.read('INTSOURCE') ?? 0;
        this.state.m_int_condition =
          (interruptSource & ~0x1c) | ((collision ^ collisionInvert) & collisionMask);
        const mainCpu = this.machine.execution.cpus.find(cpu => cpu.tag === 'maincpu') ??
          this.machine.execution.cpus[0];
        if (mainCpu) {
          this.bindings.calls?.[`m_${mainCpu.tag}.set_input_line`]?.(0, 1);
        }
      }
      gfx.transpen(
        bitmap,
        cliprect,
        sprite2.code,
        1,
        0,
        0,
        sprite2X,
        sprite2Y,
        0,
      );
      if (sprite1Enabled) {
        gfx.transpen(
          bitmap,
          cliprect,
          sprite1.code,
          0,
          0,
          0,
          sprite1.x,
          Math.max(0, sprite1.y),
          0,
        );
      }
      return true;
    }
    if (
      this.directScreenShape === 'outrun-sega16-layers' ||
      this.directScreenShape === 'system16b-layers'
    ) {
      return this.drawOutrunLayers(screen, bitmap, cliprect);
    }
    if (this.directScreenShape === 'system16a-layers') {
      return this.drawSystem16ALayers(bitmap, cliprect);
    }
    if (this.directScreenShape === 'm62-category-sprites') {
      // M62 draws category 0, sprites, then category 1. MAME's tilemap core
      // guarantees that the two category passes collectively replace the
      // visible raster; make that ownership explicit so no sprite pixels from
      // the previous frame survive between the two passes.
      bitmap.fill(0, cliprect);
      // Kung-Fu Master uses tile categories themselves for the back/front
      // sprite split. Its inherited M62 pen masks describe the alternative
      // split-layer path and would make both category passes transparent in
      // the generated category renderer.
      (this.state.m_bg_tilemap as GeneratedTilemap | undefined)?.clear_transmasks();
      return false;
    }
    if (vector?.type === 'DVG' && this.memoryRead && bitmap.direct) {
      bitmap.fill(0xff000000);
      const points = executeDvgDisplayList(this.memoryRead, vector);
      const pixels = bitmap.direct.pixels;
      const width = bitmap.direct.width;
      const height = bitmap.direct.height;
      const center = 1 << (vector.coordinateBits - 1);
      const xOffset = this.machine.execution.screen.xOffset ?? 0;
      const yOffset = this.machine.execution.screen.yOffset ?? 0;
      let lastX = 0;
      let lastY = 0;
      for (const point of points) {
        const x = Math.round(xOffset + point.x - center);
        const y = Math.round(yOffset + center - point.y);
        if (point.intensity > 0) {
          drawAdditiveVectorLine(
            pixels, width, height, lastX, lastY, x, y,
            // dvg_device::dvg_draw_to passes the 4-bit display-list intensity
            // through pal4bit, which replicates the nibble rather than only
            // shifting it, so full brightness reaches 0xff.
            ((point.intensity & 0x0f) << 4) | (point.intensity & 0x0f),
          );
        }
        lastX = x;
        lastY = y;
      }
      return true;
    }
    if (this.directScreenShape === 'berzerk-color-bitmap' && bitmap.direct) {
      const videoRaw = this.state.m_videoram;
      const colorRaw = this.state.m_colorram;
      if (!ArrayBuffer.isView(videoRaw) || !ArrayBuffer.isView(colorRaw)) return false;
      const video = videoRaw as Uint8Array;
      const colors = colorRaw as Uint8Array;
      const pixels = bitmap.direct.pixels;
      pixels.fill(0xff000000);
      const dim = 108;
      const pens = Array.from({ length: 16 }, (_unused, color) => {
        const intensity = color & 8 ? 255 : dim;
        return packRgb(
          color & 1 ? intensity : 0,
          color & 2 ? intensity : 0,
          color & 4 ? intensity : 0,
        );
      });
      const firstRow = this.machine.execution.screen.yOffset ?? 0;
      const outputRows = bitmap.direct.height;
      for (let outputY = 0; outputY < outputRows; outputY++) {
        const sourceRow = outputY + firstRow;
        const rowOffset = sourceRow << 5;
        const outputOffset = outputY * bitmap.direct.width;
        for (let byte = 0; byte < 32; byte++) {
          const offset = rowOffset + byte;
          const data = video[offset] ?? 0;
          if (!data) continue;
          const color = colors[((offset >>> 2) & 0x07e0) | (offset & 0x001f)] ?? 0;
          for (let bit = 0; bit < 8; bit++) {
            if (data & (0x80 >>> bit)) {
              pixels[outputOffset + (byte << 3) + bit] =
                pens[bit < 4 ? color >>> 4 : color & 0x0f]!;
            }
          }
        }
      }
      return true;
    }
    if (this.directScreenShape === 'gauntlet-tilemaps') {
      const playfield = this.state.m_playfield;
      const alpha = this.state.m_alpha;
      const playfieldGfx = this.gfx[0];
      const alphaGfx = this.gfx[1];
      if (
        !ArrayBuffer.isView(playfield) || !ArrayBuffer.isView(alpha) ||
        !playfieldGfx || !alphaGfx
      ) return false;
      // A share mapped by a 16-bit CPU is bound as a Uint16Array, so the word
      // is the element; an 8-bit board hands over the raw bytes. Indexing the
      // wrong one reads every other tile of the map.
      const wordReader = (view: ArrayBufferView): ((index: number) => number) => {
        const words = view as unknown as { BYTES_PER_ELEMENT?: number } & ArrayLike<number>;
        return words.BYTES_PER_ELEMENT === 2
          ? index => words[index] ?? 0
          : index => (words[index * 2] ?? 0) | ((words[index * 2 + 1] ?? 0) << 8);
      };
      const pfWord = wordReader(playfield);
      const alWord = wordReader(alpha);
      bitmap.fill(0);
      const tileBank = Number(this.state.m_playfield_tile_bank ?? 0) & 3;
      const colorBank = Number(this.state.m_playfield_color_bank ?? 1) & 1;
      // xscroll_w/yscroll_w hand these to tilemap_device::set_scrollx and
      // set_scrolly; the playfield is a 64x64 map of 8x8 tiles, so both wrap
      // at 512 pixels and the visible window is always one wrapped copy.
      const xscrollRam = this.state.m_xscroll;
      const yscrollRam = this.state.m_yscroll;
      const scrollX = ArrayBuffer.isView(xscrollRam)
        ? wordReader(xscrollRam)(0) & 0x1ff
        : 0;
      const scrollY = ArrayBuffer.isView(yscrollRam)
        ? (wordReader(yscrollRam)(0) >>> 7) & 0x1ff
        : 0;
      const wrap = (value: number, limit: number): number => {
        const wrapped = ((value % 512) + 512) % 512;
        return wrapped > limit ? wrapped - 512 : wrapped;
      };
      for (let column = 0; column < 64; column++) {
        const x = wrap(column * 8 - scrollX, cliprect.max_x);
        if (x <= -8) continue;
        for (let row = 0; row < 64; row++) {
          const y = wrap(row * 8 - scrollY, cliprect.max_y);
          if (y <= -8) continue;
          const data = pfWord(column * 64 + row);
          const code = ((tileBank * 0x1000) + (data & 0x0fff)) ^ 0x0800;
          const color = 0x10 + colorBank * 8 + ((data >>> 12) & 7);
          playfieldGfx.opaque(bitmap, cliprect, code, color, data & 0x8000, 0, x, y);
        }
      }
      // The motion objects render into the device's own bitmap and the
      // driver merges them: an MO pen of 1 clears playfield colour bit 0x80
      // (verified against the schematics in gauntlet.cpp), any other pen
      // replaces the playfield pixel outright.
      const mob = this.motionObjects;
      if (mob) {
        mob.xscroll = scrollX;
        mob.yscroll = scrollY;
        mob.draw_async(cliprect);
        const mo = mob.bitmap.pixels;
        const width = mob.bitmap.width;
        for (let y = Math.max(0, cliprect.min_y); y <= cliprect.max_y; y++) {
          for (let x = Math.max(0, cliprect.min_x); x <= cliprect.max_x; x++) {
            const pen = mo[y * width + x]!;
            if (pen === 0xffff) continue;
            if ((pen & 0x0f) === 1) {
              bitmap['pix='](y, x, (bitmap.pix?.(y, x) ?? 0) ^ 0x80);
            } else {
              bitmap['pix='](y, x, pen);
            }
          }
        }
      }
      for (let row = 0; row < 31; row++) {
        const y = row * 8;
        if (y > cliprect.max_y) break;
        for (let column = 0; column < 64; column++) {
          const x = column * 8;
          if (x > cliprect.max_x) break;
          const data = alWord(row * 64 + column);
          const code = data & 0x03ff;
          const color = ((data >>> 10) & 0x0f) | ((data >>> 9) & 0x20);
          if (data & 0x8000) {
            alphaGfx.opaque(bitmap, cliprect, code, color, 0, 0, x, y);
          } else {
            alphaGfx.transpen(bitmap, cliprect, code, color, 0, 0, x, y, 0);
          }
        }
      }
      return true;
    }
    if (this.directScreenShape === 'dkong-scanline-sprites') {
      const tilemap = this.state.m_bg_tilemap as GeneratedTilemap | undefined;
      const spriteRam = this.state.m_sprite_ram;
      const gfx = this.gfx[1];
      if (!tilemap || !ArrayBuffer.isView(spriteRam) || !gfx) return false;
      const flipped = Boolean(this.state.m_flip);
      tilemap.set_flip(flipped ? 3 : 0);
      tilemap.draw(screen, bitmap, cliprect, 0, 0);

      const sprites = spriteRam as Uint8Array;
      const scanline = cliprect.max_y & 0xff;
      let bufferedScanline = (cliprect.max_y - 1) & 0xff;
      if (flipped) bufferedScanline ^= 0xff;
      const addY = flipped ? 0xf7 : 0xf9;
      const addX = 0xf7;
      const base = Number(this.state.m_sprite_bank ?? 0) << 9;
      let drawn = 0;
      for (let offset = base; drawn < 16 && offset < base + 0x200; offset += 4) {
        let y = sprites[offset] ?? 0;
        if (((y + addY + 1 + bufferedScanline) & 0xf0) !== 0xf0) continue;
        const attributes = sprites[offset + 2] ?? 0;
        const code = ((sprites[offset + 1] ?? 0) & 0x7f) + ((attributes & 0x40) << 1);
        const color = (attributes & 0x0f) + 16 * Number(this.state.m_palette_bank ?? 0);
        let flipX = attributes & 0x80;
        const flipY = (sprites[offset + 1] ?? 0) & 0x80;
        let x = ((sprites[offset + 3] ?? 0) + addX + 1) & 0xff;
        if (flipped) {
          x = (x ^ 0xff) - 15;
          flipX = Number(!flipX);
        }
        y = scanline - ((y + addY + 1 + bufferedScanline) & 0x0f);
        gfx.transpen(bitmap, cliprect, code, color, flipX, flipY, x, y, 0);
        gfx.transpen(bitmap, cliprect, code, color, flipX, flipY, flipped ? x + 256 : x - 256, y, 0);
        gfx.transpen(bitmap, cliprect, code, color, flipX, flipY, x, y - 256, 0);
        drawn++;
      }
      return true;
    }
    if (this.directScreenShape === 'bublbobl-object-columns') {
      bitmap.fill(255, cliprect);
      if (!Number(this.state.m_video_enable ?? 0)) return true;
      const objectram = this.state.m_objectram;
      const videoram = this.state.m_videoram;
      const proms = this.state.m_proms;
      const gfx = this.gfx[0];
      if (
        !ArrayBuffer.isView(objectram) ||
        !ArrayBuffer.isView(videoram) ||
        !ArrayBuffer.isView(proms) ||
        !gfx
      ) {
        return false;
      }
      const objects = objectram as Uint8Array;
      const video = videoram as Uint8Array;
      const prom = proms as Uint8Array;
      const flipped = Boolean(this.state.__flip_screen);
      let sx = 0;
      for (let offset = 0; offset < objects.length; offset += 4) {
        if (
          (objects[offset] ?? 0) === 0 &&
          (objects[offset + 1] ?? 0) === 0 &&
          (objects[offset + 2] ?? 0) === 0 &&
          (objects[offset + 3] ?? 0) === 0
        ) {
          continue;
        }
        const gfxNumber = objects[offset + 1] ?? 0;
        const attributes = objects[offset + 3] ?? 0;
        const promBase = 0x80 + ((gfxNumber & 0xe0) >>> 1);
        let gfxOffset = (gfxNumber & 0x1f) * 0x80;
        if ((gfxNumber & 0xa0) === 0xa0) gfxOffset |= 0x1000;
        const sy = -(objects[offset] ?? 0);
        for (let yc = 0; yc < 32; yc++) {
          const control = prom[promBase + (yc >>> 1)] ?? 0;
          if (control & 0x08) continue;
          if (!(control & 0x04)) {
            sx = objects[offset + 2] ?? 0;
            if (attributes & 0x40) sx -= 256;
          }
          for (let xc = 0; xc < 2; xc++) {
            const graphicsOffset =
              gfxOffset +
              xc * 0x40 +
              (yc & 7) * 2 +
              (control & 3) * 0x10;
            const low = video[graphicsOffset] ?? 0;
            const high = video[graphicsOffset + 1] ?? 0;
            const code = low + 256 * (high & 3) + 1024 * (attributes & 0x0f);
            const color = (high & 0x3c) >>> 2;
            let flipX = high & 0x40;
            let flipY = high & 0x80;
            let x = sx + xc * 8;
            let y = (sy + yc * 8) & 0xff;
            if (flipped) {
              x = 248 - x;
              y = 248 - y;
              flipX = Number(!flipX);
              flipY = Number(!flipY);
            }
            gfx.transpen(bitmap, cliprect, code, color, flipX, flipY, x, y, 15);
          }
        }
        sx += 16;
      }
      return true;
    }
    if (this.directScreenShape === 'technos-tilemap-sprites') {
      const background = this.state.m_bg_tilemap as GeneratedTilemap | undefined;
      const foreground = this.state.m_fg_tilemap as GeneratedTilemap | undefined;
      const spriteRaw = this.state.m_spriteram;
      const scrollXRaw = this.state.m_scrollx_lo;
      const scrollYRaw = this.state.m_scrolly_lo;
      const gfx = this.gfx[1];
      if (
        !background || !foreground || !ArrayBuffer.isView(spriteRaw) || !gfx
      ) return false;
      const firstByte = (value: unknown): number =>
        ArrayBuffer.isView(value)
          ? Number((value as unknown as ArrayLike<number>)[0] ?? 0)
          : Number(value ?? 0);
      background.set_scrollx(
        0,
        (Number(this.state.m_scrollx_hi ?? 0) << 8) | firstByte(scrollXRaw),
      );
      background.set_scrolly(
        0,
        (Number(this.state.m_scrolly_hi ?? 0) << 8) | firstByte(scrollYRaw),
      );
      background.draw(screen, bitmap, cliprect, 0, 0);

      const sprites = spriteRaw as unknown as Uint8Array;
      const hardware = Number(this.state.m_technos_video_hw ?? 0);
      const flipped = Boolean(this.state.__flip_screen);
      for (let index = 0; index + 4 < sprites.length; index += 5) {
        const attributes = sprites[index + 1] ?? 0;
        if (!(attributes & 0x80)) continue;
        let sx = 240 - (sprites[index + 4] ?? 0) + ((attributes & 2) << 7);
        let sy = 232 - (sprites[index] ?? 0) + ((attributes & 1) << 8);
        const size = (attributes & 0x30) >>> 4;
        let flipX = attributes & 8;
        let flipY = attributes & 4;
        let dx = -16;
        let dy = -16;
        const color = hardware === 2
          ? (sprites[index + 2] ?? 0) >>> 5
          : (sprites[index + 2] ?? 0) >>> 4;
        let code = (sprites[index + 3] ?? 0) | (
          ((sprites[index + 2] ?? 0) & (hardware === 2 ? 0x1f : 0x0f)) << 8
        );
        if (hardware === 1) {
          if (sx < -7 && sx > -16) sx += 256;
          if (sy < -7 && sy > -16) sy += 256;
        }
        if (flipped) {
          sx = 240 - sx;
          sy = 224 - sy;
          flipX = Number(!flipX);
          flipY = Number(!flipY);
          dx = -dx;
          dy = -dy;
        }
        code &= ~size;
        const draw = (offset: number, x: number, y: number) =>
          gfx.transpen(bitmap, cliprect, code + offset, color, flipX, flipY, x, y, 0);
        if (size === 0) draw(0, sx, sy);
        else if (size === 1) {
          draw(0, sx, sy + dy);
          draw(1, sx, sy);
        } else if (size === 2) {
          draw(0, sx + dx, sy);
          draw(2, sx, sy);
        } else {
          draw(0, sx + dx, sy + dy);
          draw(1, sx + dx, sy);
          draw(2, sx, sy + dy);
          draw(3, sx, sy);
        }
      }
      foreground.draw(screen, bitmap, cliprect, 0, 0);
      return true;
    }
    if (this.directScreenShape === 'cosmic-bitmap-sprites') {
      return this.drawCosmicBitmapSprites(bitmap, cliprect);
    }
    if (this.directScreenShape === 'system1-prom-mixer') {
      return this.drawSystem1(bitmap, cliprect);
    }
    if (this.directScreenShape === 'tnx1-banked-raster') {
      return this.drawTnx1(screen, bitmap, cliprect);
    }
    if (this.directScreenShape === 'galaxian-no-bullets') {
      const background = this.bindings.referenceCalls?.m_draw_background_ptr;
      if (!background) return false;
      background(bitmap, cliprect);
      const tilemap = this.state.m_bg_tilemap as GeneratedTilemap | undefined;
      const spriteram = this.state.m_spriteram;
      const gfx = this.gfx[1];
      if (!tilemap || !ArrayBuffer.isView(spriteram) || !gfx) return false;
      tilemap.draw(screen, bitmap, cliprect, 0, 0);
      const bytes = spriteram as Uint8Array;
      const generators = Number(this.state.m_numspritegens ?? 1);
      const spritesBase = Number(this.state.m_sprites_base ?? 0);
      for (let generator = 0; generator < generators; generator++) {
        this.drawGalaxianSprites(
          screen,
          bitmap,
          cliprect,
          bytes,
          spritesBase + generator * 0x20,
          gfx,
        );
      }
      return true;
    }
    if (this.directScreenShape === 'timeplt') {
      if (!Number(this.state.m_video_enable ?? 0)) return true;
      const tilemap = this.state.m_bg_tilemap as GeneratedTilemap | undefined;
      const spriteBanks = this.state.m_spriteram;
      const gfx = this.gfx[1];
      if (
        !tilemap ||
        !Array.isArray(spriteBanks) ||
        !ArrayBuffer.isView(spriteBanks[0]) ||
        !ArrayBuffer.isView(spriteBanks[1]) ||
        !gfx
      ) {
        return false;
      }
      tilemap.draw(screen, bitmap, cliprect, 0, 0);
      const attributes = spriteBanks[1] as Uint8Array;
      const positions = spriteBanks[0] as Uint8Array;
      for (let offset = 0x3e; offset >= 0x10; offset -= 2) {
        const sx = positions[offset] ?? 0;
        const sy = 241 - (attributes[offset + 1] ?? 0);
        const code = positions[offset + 1] ?? 0;
        const color = (attributes[offset] ?? 0) & 0x3f;
        const flipX = ~(attributes[offset] ?? 0) & 0x40;
        const flipY = (attributes[offset] ?? 0) & 0x80;
        gfx.transpen(bitmap, cliprect, code, color, flipX, flipY, sx, sy, 0);
      }
      tilemap.draw(screen, bitmap, cliprect, 1, 0);
      return true;
    }
    if (this.directScreenShape === 'taitosj-layered-char-ram') {
      return this.drawTaitoSj(bitmap, cliprect);
    }
    if (this.directScreenShape === 'vicdual-character-ram') {
      return this.drawVicDual(bitmap, cliprect);
    }
    if (this.directScreenShape === 'williams-column-bitmap') {
      return this.drawWilliams(bitmap, cliprect);
    }
    return false;
  }

  /**
   * Compose OutRun's source-declared System 16B tile/text layers and road RAM.
   * The dedicated Sega devices are not standalone generated cores yet, so the
   * renderer reads the same shared RAM and 8x8 graphics layout directly.  The
   * road is a conservative horizon/stripe representation until the road ROM
   * pixel generator joins the hardware closure; tile codes, colors, paging,
   * scrolling and text are the real board data.
   */
  private drawOutrunLayers(
    screen: { visible_area(): GeneratedRectangle },
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
  ): boolean {
    const bytesView = (value: unknown): Uint8Array | undefined =>
      ArrayBuffer.isView(value)
        ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
        : undefined;
    const wordsView = (value: unknown): Uint16Array | undefined => {
      const bytes = bytesView(value);
      return bytes ? new Uint16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength >>> 1) : undefined;
    };
    const tile = wordsView(this.state.m_tileram);
    const text = wordsView(this.state.m_textram);
    const road = wordsView(
      this.state.m_segaic16road_roadram ?? this.state['m_segaic16road:roadram'],
    );
    const palette = wordsView(this.state.m_paletteram);
    const gfx = this.gfx[0];
    if (!tile || !text || !gfx) return false;
    const system16a = this.machine.family === 'segas16a';

    if (palette && this.ramPalette) {
      const mirror = this.ramPaletteMirror ??= new Uint16Array(palette.length);
      for (let index = 0; index < palette.length; index++) {
        const value = palette[index]!;
        if (mirror[index] === value) continue;
        mirror[index] = value;
        this.ramPalette.write(index * 2, value >>> 8);
        this.ramPalette.write(index * 2 + 1, value);
      }
    }

    bitmap.fill(0, cliprect);
    // OutRun's road hardware is line based. Preserve the live road-RAM color
    // and horizon motion even before the specialized ROM pixel generator is
    // available, leaving the source tile/text layers fully visible above it.
    if (road) {
      for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
        const control = road[(y * 2) % road.length] ?? 0;
        const color = 0x400 + ((control >>> 1) & 0x3f);
        for (let x = cliprect.min_x; x <= cliprect.max_x; x++) {
          bitmap['pix='](y, x, color);
        }
      }
    }

    const drawLayer = (which: 0 | 1, transparent: boolean) => {
      const rawPages = system16a
        ? text[(0xe9e >>> 1) - which] ?? 0
        : text[(0xe80 >>> 1) + which] ?? 0;
      // System 16A swaps the page-select nibbles along X and only has eight
      // tile pages. Its scroll registers and 200-pixel origin also differ
      // from the later 16B layout.
      const pageSelect = system16a
        ? (((rawPages >>> 4) & 0x0707) | ((rawPages << 4) & 0x7070))
        : rawPages;
      const yScroll = system16a
        ? (text[(0xf24 >>> 1) + which] ?? 0) & 0xff
        : text[(0xe90 >>> 1) + which] ?? 0;
      const rawXScroll = system16a
        ? (text[(0xff8 >>> 1) + which] ?? 0) & 0x1ff
        : text[(0xe98 >>> 1) + which] ?? 0;
      const xScroll = system16a ? (0xc8 - rawXScroll) & 0x3ff : rawXScroll;
      for (let row = 0; row < 29; row++) {
        for (let column = 0; column < 41; column++) {
          const virtualX = system16a
            ? (column + (xScroll >>> 3)) & 0x7f
            : (column + ((0xc0 - xScroll) >>> 3)) & 0x7f;
          const virtualY = (row + ((yScroll & 0x1ff) >>> 3)) & 0x3f;
          const quadrant = (virtualY >= 32 ? 2 : 0) | (virtualX >= 64 ? 1 : 0);
          const page = (pageSelect >>> (quadrant * 4)) & 0x0f;
          const index = page * 0x800 + (virtualY & 31) * 64 + (virtualX & 63);
          const data = tile[index % tile.length] ?? 0;
          const code = system16a ? ((data >>> 1) & 0x1000) | (data & 0x0fff) : data & 0x1fff;
          const color = (data >>> (system16a ? 5 : 6)) & 0x7f;
          const x = column * 8 - (xScroll & 7);
          const y = row * 8 - (yScroll & 7);
          if (transparent) gfx.transpen(bitmap, cliprect, code, color, 0, 0, x, y, 0);
          else gfx.opaque(bitmap, cliprect, code, color, 0, 0, x, y);
        }
      }
    };
    drawLayer(1, false);
    drawLayer(0, true);

    for (let row = 0; row < 28; row++) {
      for (let column = 0; column < 40; column++) {
        const data = text[row * 64 + column + 24] ?? 0;
        gfx.transpen(
          bitmap,
          cliprect,
          data & (system16a ? 0xff : 0x1ff),
          (data >>> (system16a ? 8 : 9)) & 0x07,
          0,
          0,
          column * 8,
          row * 8,
          0,
        );
      }
    }
    return true;
  }

  /** Compose System 16A's paged tilemaps, text and scanline sprite hardware. */
  private drawSystem16ALayers(
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
  ): boolean {
    const wordsView = (value: unknown): Uint16Array | undefined => {
      if (!ArrayBuffer.isView(value)) return undefined;
      return new Uint16Array(value.buffer, value.byteOffset, value.byteLength >>> 1);
    };
    const tile = wordsView(this.state.m_tileram);
    const text = wordsView(this.state.m_textram);
    const sprites = wordsView(this.state.m_sprites);
    const palette = wordsView(this.state.m_paletteram);
    const spriteRom = this.regions.sprites;
    const gfx = this.gfx[0];
    if (!tile || !text || !sprites || !palette || !spriteRom || !gfx) return false;

    // paletteram_w uses Sega's resistor network rather than plain RGB444.
    // Synchronize from the authoritative share once per changed entry; the
    // generated handler can then remain the live write owner for CPU timing.
    const paletteMirror = this.ramPaletteMirror ??= new Uint16Array(palette.length);
    const paletteEntries = palette.length;
    for (let index = 0; index < palette.length; index++) {
      const raw = palette[index]!;
      paletteMirror[index] = raw;
      const colors = segaSystem16PaletteEntry(raw);
      this.ramPalette?.set_pen_color(index, colors.normal);
      this.ramPalette?.set_pen_color(index + paletteEntries, colors.effect);
    }

    bitmap.fill(0, cliprect);
    const priority = new Uint8Array(this.width * this.height);
    const flipped = Boolean(this.state.__flip_screen);
    const rowscroll = Boolean(this.state.__system16aRowscroll);
    const colscroll = Boolean(this.state.__system16aColscroll);
    const decoded = gfx.decoded;
    const decodedPixel = (code: number, x: number, y: number): number =>
      decoded.pixels[(code % decoded.count) * 64 + (y & 7) * 8 + (x & 7)] ?? 0;
    const put = (x: number, y: number, pen: number) => bitmap['pix='](y, x, pen);

    const layerPixel = (which: 0 | 1, x: number, y: number) => {
      const row = flipped ? 216 - (y & ~7) : y & ~7;
      const rawXScroll = rowscroll
        ? text[(0xf80 >>> 1) + (row >>> 3) * 2 + which] ?? 0
        : text[(0xff8 >>> 1) + which] ?? 0;
      const rawYScroll = colscroll
        ? text[(0xf30 >>> 1) + ((x & ~15) >>> 4) * 2 + which] ?? 0
        : text[(0xf24 >>> 1) + which] ?? 0;
      const xScroll = (0xc8 - ((rawXScroll + (flipped ? 17 : 0)) & 0x1ff)) & 0x3ff;
      const yScroll = rawYScroll & 0x1ff;
      let sourceX = (x + xScroll) & 0x3ff;
      let sourceY = (y + yScroll) & 0x1ff;
      if (flipped) {
        sourceX = (0x3ff - sourceX) & 0x3ff;
        sourceY = (0x1ff - sourceY) & 0x1ff;
      }
      const rawPages = text[((flipped ? 0xe8e : 0xe9e) >>> 1) - which] ?? 0;
      let pages = ((rawPages >>> 4) & 0x0707) | ((rawPages << 4) & 0x7070);
      if (flipped) {
        pages = ((pages & 0x000f) << 12) | ((pages & 0x00f0) << 4) |
          ((pages & 0x0f00) >>> 4) | ((pages & 0xf000) >>> 12);
      }
      const quadrant = (sourceY >= 0x100 ? 2 : 0) | (sourceX >= 0x200 ? 1 : 0);
      const page = (pages >>> (quadrant * 4)) & 7;
      const tileIndex = page * 0x800 + ((sourceY >>> 3) & 31) * 64 +
        ((sourceX >>> 3) & 63);
      const data = tile[tileIndex] ?? 0;
      const code = ((data >>> 1) & 0x1000) | (data & 0x0fff);
      const pixel = decodedPixel(code, sourceX, sourceY);
      return {
        pen: gfx.colorbase() + ((data >>> 5) & 0x7f) * gfx.granularity() + pixel,
        pixel,
        category: (data >>> 12) & 1,
      };
    };

    for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
      for (let x = cliprect.min_x; x <= cliprect.max_x; x++) {
        const output = y * this.width + x;
        const background = layerPixel(1, x, y);
        put(x, y, background.pen);
        if (background.pixel) priority[output] = background.category ? 2 : 1;

        const foreground = layerPixel(0, x, y);
        if (foreground.pixel) {
          put(x, y, foreground.pen);
          priority[output] = foreground.category ? 4 : 2;
        }

        const textX = flipped ? this.width - 1 - x : x;
        const textY = flipped ? this.height - 1 - y : y;
        const textData = text[(textY >>> 3) * 64 + (textX >>> 3) + 24] ?? 0;
        const textPixel = decodedPixel(textData & 0xff, textX, textY);
        if (textPixel) {
          put(
            x,
            y,
            gfx.colorbase() + ((textData >>> 8) & 7) * gfx.granularity() + textPixel,
          );
          priority[output] = textData & 0x0800 ? 8 : 4;
        }
      }
    }

    const romWord = (word: number): number => {
      const offset = word * 2;
      return ((spriteRom[offset] ?? 0) << 8) | (spriteRom[offset + 1] ?? 0);
    };
    const banks = Math.max(1, spriteRom.length / 0x10000);
    for (let offset = 0; offset + 7 < sprites.length; offset += 8) {
      let bottom = sprites[offset]! >>> 8;
      if (bottom > 0xf0) break;
      let top = sprites[offset]! & 0xff;
      let xpos = sprites[offset + 1]! & 0x1ff;
      const pitchWord = sprites[offset + 2]!;
      const pitch = pitchWord & 0x8000 ? pitchWord - 0x10000 : pitchWord;
      let address = sprites[offset + 3]!;
      const attributes = sprites[offset + 4]!;
      const colorPriority = (((attributes >>> 8) & 0x3f) << 4) |
        ((attributes & 3) << 10);
      const bank = ((attributes >>> 4) & 7) % banks;
      if (top >= bottom) continue;
      let xDelta = 1;
      let xOrigin = 189;
      if (flipped) {
        const oldTop = top;
        top = 224 - bottom;
        bottom = 224 - oldTop;
        xpos = 320 - xpos;
        xDelta = -1;
        xOrigin = -189;
      }
      for (let sourceY = top; sourceY < bottom; sourceY++) {
        address = (address + pitch) & 0xffff;
        const y = sourceY + 1;
        let x = xpos;
        let words = 0;
        let current = address;
        while (((xpos - x) & 0x1ff) !== 1 && words++ < 0x80) {
          const reverse = Boolean(current & 0x8000);
          current = (current + (reverse ? -1 : 1)) & 0xffff;
          const pixels = romWord(bank * 0x8000 + (current & 0x7fff));
          const shifts = reverse ? [0, 4, 8, 12] : [12, 8, 4, 0];
          let finalPixel = 0;
          for (const shift of shifts) {
            const pixel = (pixels >>> shift) & 0x0f;
            finalPixel = pixel;
            const screenX = x - xOrigin;
            if (
              pixel !== 0 && pixel !== 15 &&
              screenX >= cliprect.min_x && screenX <= cliprect.max_x &&
              y >= cliprect.min_y && y <= cliprect.max_y
            ) {
              const spritePen = colorPriority | pixel;
              const spritePriority = spritePen >>> 10;
              const output = y * this.width + screenX;
              if ((1 << spritePriority) > priority[output]!) {
                if ((spritePen & 0x3f0) === 0x3f0) {
                  put(screenX, y, (bitmap.pix?.(y, screenX) ?? 0) + paletteEntries);
                } else {
                  put(screenX, y, 0x400 | (spritePen & 0x3ff));
                }
              }
            }
            x += xDelta;
          }
          if (finalPixel === 15) break;
        }
      }
    }
    return true;
  }

  /** Execute Cosmic/Panic's color-PROM bitmap and two-size sprite pipeline. */
  private drawCosmicBitmapSprites(
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
  ): boolean {
    const videoRaw = this.state.m_videoram;
    const spriteRaw = this.state.m_spriteram;
    const mapRaw = this.state.m_user1;
    const gfx16 = this.gfx[0];
    const gfx32 = this.gfx[1];
    if (
      !ArrayBuffer.isView(videoRaw) || !ArrayBuffer.isView(spriteRaw) ||
      !ArrayBuffer.isView(mapRaw) || !gfx16 || !gfx32
    ) return false;
    const video = videoRaw as Uint8Array;
    const sprites = spriteRaw as Uint8Array;
    const map = mapRaw as Uint8Array;
    const registersRaw = this.state.m_color_registers;
    const registers = Array.isArray(registersRaw) || ArrayBuffer.isView(registersRaw)
      ? registersRaw as ArrayLike<number>
      : [];
    const color0 = Number(registers[0] ?? 0) & 1;
    const color1 = Number(registers[1] ?? 0) & 1;
    const color2 = Number(registers[2] ?? 0) & 1;
    const flipped = Boolean(this.state.__flip_screen);
    bitmap.fill(0, cliprect);
    for (let offset = 0; offset < video.length; offset++) {
      let data = video[offset] ?? 0;
      let x = (offset << 3) & 0xff;
      const y = offset >>> 5;
      const mapOffset = (color0 << 9) | (color2 << 10) | ((x >>> 4) << 5) | (y >>> 3);
      const rawPen = map[mapOffset] ?? 0;
      const pen = (color1 ? rawPen >>> 4 : rawPen) & 0x0f;
      for (let bit = 0; bit < 8; bit++) {
        if (data & 0x80) {
          bitmap['pix='](flipped ? 255 - y : y, flipped ? 255 - x : x, pen);
        }
        x = (x + 1) & 0xff;
        data = (data << 1) & 0xff;
      }
    }
    for (let offset = sprites.length - 4; offset >= 0; offset -= 4) {
      const attributes = sprites[offset] ?? 0;
      if (!attributes) continue;
      let code = (~attributes) & 0x3f;
      const colorAttributes = sprites[offset + 3] ?? 0;
      const color = (~colorAttributes) & 0x07;
      code |= (colorAttributes & 0x08) << 3;
      const gfx = attributes & 0x80 ? gfx16 : gfx32;
      gfx.transpen(
        bitmap,
        cliprect,
        attributes & 0x80 ? code : code >>> 2,
        color,
        0,
        (~attributes) & 0x40,
        256 - (sprites[offset + 2] ?? 0),
        sprites[offset + 1] ?? 0,
        0,
      );
    }
    return true;
  }

  private drawWilliams(bitmap: BitmapTarget, cliprect: GeneratedRectangle): boolean {
    const videoRaw = this.state.m_videoram;
    const paletteRaw = this.state.m_paletteram;
    if (!ArrayBuffer.isView(videoRaw) || !ArrayBuffer.isView(paletteRaw)) return false;
    const video = videoRaw as Uint8Array;
    const palette = paletteRaw as Uint8Array;
    const firstX = cliprect.min_x & ~1;
    for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
      for (let x = firstX; x <= cliprect.max_x; x += 2) {
        const pixels = video[y + (x >>> 1) * 256] ?? 0;
        bitmap['pix='](y, x, williamsPaletteColor(palette[pixels >>> 4] ?? 0));
        bitmap['pix='](y, x + 1, williamsPaletteColor(palette[pixels & 0x0f] ?? 0));
      }
    }
    return true;
  }

  private drawVicDual(bitmap: BitmapTarget, cliprect: GeneratedRectangle): boolean {
    const direct = bitmap.direct;
    const videoRaw = this.state.m_videoram;
    const characterRaw = this.state.m_characterram;
    const promRaw = this.state.m_proms;
    if (
      !direct ||
      !ArrayBuffer.isView(videoRaw) ||
      !ArrayBuffer.isView(characterRaw) ||
      !ArrayBuffer.isView(promRaw)
    ) return false;
    const video = videoRaw as Uint8Array;
    const characters = characterRaw as Uint8Array;
    const prom = promRaw as Uint8Array;
    const paletteBank = Number(this.state.m_palette_bank ?? 0) & 1;
    const firstY = Math.max(cliprect.min_y, direct.scaledYOffset);
    const lastY = Math.min(
      cliprect.max_y,
      direct.scaledYOffset + direct.height * direct.yScale - 1,
    );
    for (let hardwareY = firstY; hardwareY <= lastY; hardwareY++) {
      const sourceY = Math.floor(hardwareY / direct.yScale);
      const outputY = Math.floor((hardwareY - direct.scaledYOffset) / direct.yScale);
      if (hardwareY % direct.yScale) continue;
      const row = (sourceY >>> 3) << 5;
      const line = sourceY & 7;
      for (let sourceX = 0; sourceX < 256; sourceX++) {
        const character = video[row | (sourceX >>> 3)] ?? 0;
        const characterLine = characters[(character << 3) | line] ?? 0;
        const colorProm = prom[(character >>> 5) | (paletteBank << 3)] ?? 0;
        const outputX = sourceX - Math.floor(direct.scaledXOffset / direct.xScale);
        if (outputX < 0 || outputX >= direct.width) continue;
        direct.pixels[outputY * direct.width + outputX] =
          decodeVicDualPixel(characterLine, colorProm, sourceX);
      }
    }
    return true;
  }

  /** Execute TNX1's banked background, scanline sprite and foreground mixer. */
  private drawTnx1(
    screen: { visible_area(): GeneratedRectangle },
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
  ): boolean {
    const backgroundRaw = this.state.m_background_ram;
    const spriteRaw = this.state.m_sprite_ram;
    const dmaRaw = this.state.m_dmasource;
    const scrollRaw = this.state.m_background_scroll;
    const spriteBitmap = this.state.m_sprite_bitmap;
    const tilemap = this.state.m_fg_tilemap as GeneratedTilemap | undefined;
    const gfx = this.gfx[1];
    const storage = (value: unknown): value is ArrayLike<number> =>
      ArrayBuffer.isView(value) || Array.isArray(value);
    if (
      !storage(backgroundRaw) || !storage(spriteRaw) || !storage(dmaRaw) ||
      !storage(scrollRaw) || !(spriteBitmap instanceof GeneratedIndexedBitmap) ||
      !tilemap || !gfx
    ) return false;

    (this.palette as GeneratedTnx1Palette | undefined)?.sync?.(this.state);
    const io = this.state.m_io_mconf as { read?: () => number } | undefined;
    const interlaceMode = Number(io?.read?.() ?? 0);
    const fields = this.state.m_bitmap;
    const field = Number(this.state.m_field ?? 0) & 1;
    const composed = interlaceMode === 0
      ? bitmap
      : Array.isArray(fields) && fields[field] instanceof GeneratedIndexedBitmap
        ? fields[field] as GeneratedIndexedBitmap
        : bitmap;
    const flipped = Boolean(this.state.__flip_screen);
    const scrollX = Number(scrollRaw[0] ?? 0);
    const scrollY = Number(scrollRaw[1] ?? 0);
    const scrollHigh = Number(scrollRaw[2] ?? 0) & 1;

    // Which counter bits reach the background RAM address and nibble-select
    // pins differs per board revision, so take them from the lowered plan
    // rather than from whichever revision the base class happens to be.
    const addressing = this.machine.video?.bankedBackground;
    if (!addressing) return false;
    const columnHigh = addressing.columnHighFromScroll ? scrollHigh << 8 : 0;
    const rowNibbleBit = addressing.nibble.source === 'row'
      ? 1 << addressing.nibble.bit
      : 0;
    const columnNibbleBit = addressing.nibble.source === 'column'
      ? 1 << addressing.nibble.bit
      : 0;

    for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
      const row = ((flipped ? ((y >>> 1) ^ 0xff) : y >>> 1) + scrollY) & 0x1ff;
      const rowBase = row & 0x100
        ? ((row >>> addressing.rowShift) & 0x3f) << 6
        : 0;
      const rowShift4 = row & rowNibbleBit ? 4 : 0;
      for (let x = cliprect.min_x; x <= cliprect.max_x; x++) {
        const column = 0x38 + (x >>> 1) + scrollX + columnHigh;
        const shift = column & columnNibbleBit ? 4 : rowShift4;
        composed['pix='](
          y,
          x,
          ((backgroundRaw[rowBase | ((column >>> addressing.columnShift) & 0x3f)] ?? 0) >>>
            shift) & 0x0f,
        );
      }
    }

    const attributes = Array.from({ length: 64 }, () => ({
      row: 0,
      sx: 0,
      color: 0,
      code: 0,
      flipX: 0,
      flipY: 0,
    }));
    const decoded = gfx.decoded;
    const dmaLength = Number(dmaRaw.length ?? 0);
    for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
      spriteBitmap.pixels.fill(0, y * spriteBitmap.width, (y + 1) * spriteBitmap.width);
      for (const attribute of attributes) attribute.color = 0;
      for (let offset = 4; offset < dmaLength; offset += 4) {
        let spriteY = 0x200 - Number(spriteRaw[offset + 1] ?? 0) * 2;
        let row = y - spriteY;
        if (flipped) {
          spriteY ^= 0x1ff;
          row = spriteY - y;
        }
        if (row < 0 || row >= 16) continue;
        const slot = (Number(spriteRaw[offset] ?? 0) >>> 2) & 0x3f;
        const attribute = attributes[slot]!;
        const flags = Number(spriteRaw[offset + 3] ?? 0);
        attribute.sx = Number(spriteRaw[offset] ?? 0) * 2;
        attribute.row = row;
        attribute.code = (
          (Number(spriteRaw[offset + 2] ?? 0) & 0x7f) +
          ((flags & 0x10) << 3) +
          ((flags & 0x04) << 6)
        ) ^ 0x1ff;
        attribute.color = flags & 0x07;
        attribute.flipX = Number(spriteRaw[offset + 2] ?? 0) & 0x80 ? 0x0f : 0;
        attribute.flipY = flags & 0x08 ? 0x0f : 0;
      }
      for (const attribute of attributes) {
        if (!attribute.color) continue;
        const element = modulo(attribute.code, decoded.count);
        const sourceBase = element * decoded.width * decoded.height +
          (attribute.row ^ attribute.flipY) * decoded.width;
        for (let x = 0; x < 16; x++) {
          let pixelX = attribute.sx + x - 6;
          if (pixelX < 0 || pixelX >= 512) continue;
          if (flipped) pixelX ^= 0x1ff;
          const pen = decoded.pixels[sourceBase + (x ^ attribute.flipX)] ?? 0;
          spriteBitmap['pix='](
            y,
            pixelX,
            pen ? gfx.entry.colorBase + attribute.color * gfx.granularity() + pen : 0,
          );
        }
      }
      for (let x = cliprect.min_x; x <= cliprect.max_x; x++) {
        const pen = spriteBitmap.pix(y, x);
        if (pen) composed['pix='](y, x, pen);
      }
    }
    tilemap.draw(screen, composed, cliprect, 0, 0);

    if (composed !== bitmap) {
      const previous = Array.isArray(fields) ? fields[field ^ 1] : undefined;
      for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
        for (let x = cliprect.min_x; x <= cliprect.max_x; x++) {
          const pen = interlaceMode === 1 && (y & 1) === field
            ? 0
            : interlaceMode === 2 && (y & 1) === field && previous instanceof GeneratedIndexedBitmap
              ? previous.pix(y, x)
              : (composed as GeneratedIndexedBitmap).pix(y, x);
          bitmap['pix='](y, x, pen);
        }
      }
    }
    return true;
  }

  /** Execute Sega System 1's source-defined sprite/collision/PROM mixer. */
  private drawSystem1(bitmap: BitmapTarget, cliprect: GeneratedRectangle): boolean {
    const pages = this.state.m_tilemap_page;
    const video = this.state.m_videoram;
    const sprites = this.state.m_spriteram;
    const spriteRom = this.state.m_spriterom;
    const lookup = this.state.m_lookup_prom;
    const spriteBitmap = this.state.m_sprite_bitmap;
    const mixCollide = this.state.m_mix_collide;
    const spriteCollide = this.state.m_sprite_collide;
    // The collision arrays reach here as whatever video_start's
    // make_unique_clear<u8[]> produced. That is a typed array, not the plain
    // array the plan's initial state declares, and requiring one shape
    // silently dropped this whole path back to the interpreter: Wonder Boy
    // then ran at 6 fps with no background at all.
    const numbers = (value: unknown): value is { [index: number]: number } =>
      ArrayBuffer.isView(value) || Array.isArray(value);
    if (
      !Array.isArray(pages) || !(pages[0] instanceof GeneratedTilemap) ||
      !(pages[1] instanceof GeneratedTilemap) ||
      !numbers(video) ||
      !ArrayBuffer.isView(sprites) || !ArrayBuffer.isView(spriteRom) ||
      !ArrayBuffer.isView(lookup) || !(spriteBitmap instanceof GeneratedIndexedBitmap) ||
      !numbers(mixCollide) || !numbers(spriteCollide)
    ) return false;

    if (Number(this.state.m_video_mode ?? 0) & 0x10) {
      bitmap.fill(0, cliprect);
      return true;
    }
    const videoRam = video as ArrayLike<number>;
    const spriteRam = sprites as Uint8Array;
    const spriteBytes = spriteRom as Uint8Array;
    const lookupProm = lookup as Uint8Array;
    const background = pages[0].pixmap();
    const foreground = pages[1].pixmap();
    spriteBitmap.fill(0, cliprect);

    const flipped = Boolean(this.state.__flip_screen);
    const gfxBanks = Math.max(1, Math.floor(spriteBytes.length / 0x8000));
    for (let sprite = 0; sprite < 32; sprite++) {
      const base = sprite * 0x10;
      if ((spriteRam[base] ?? 0) === 0xff) break;
      let sourceAddress = (spriteRam[base + 6] ?? 0) | ((spriteRam[base + 7] ?? 0) << 8);
      const stride = (spriteRam[base + 4] ?? 0) | ((spriteRam[base + 5] ?? 0) << 8);
      const attributes = spriteRam[base + 3] ?? 0;
      const bank = (((attributes & 0x80) >>> 7) |
        ((attributes & 0x40) >>> 5) | ((attributes & 0x20) >>> 3)) % gfxBanks;
      const xStart = (((spriteRam[base + 2] ?? 0) | (attributes << 8)) & 0x1ff);
      let bottom = (spriteRam[base + 1] ?? 0) + 1;
      let top = (spriteRam[base] ?? 0) + 1;
      if (flipped) {
        const oldTop = top;
        top = 256 - bottom;
        bottom = 256 - oldTop;
      }
      const paletteBase = sprite * 0x10;
      const graphicsBase = bank * 0x8000;
      for (let y = top; y < bottom; y++) {
        sourceAddress = (sourceAddress + stride) & 0xffff;
        if (y < cliprect.min_y || y > cliprect.max_y) continue;
        const delta = sourceAddress & 0x8000 ? -1 : 1;
        let x = xStart;
        let current = sourceAddress;
        // A terminator nibble ends each source row. Bound malformed data so a
        // bad dump cannot turn a frame into an unbounded browser loop.
        for (let words = 0; words < 0x8000; words++, x += 4, current += delta) {
          const data = spriteBytes[graphicsBase + (current & 0x7fff)] ?? 0xff;
          const first = current & 0x8000 ? data & 0x0f : data >>> 4;
          const second = current & 0x8000 ? data >>> 4 : data & 0x0f;
          if (first === 0x0f) break;
          if (first !== 0) {
            for (let repeat = 0; repeat < 2; repeat++) {
              const effectiveX = flipped ? 0x1fe - (x + repeat) : x + repeat;
              if (effectiveX < cliprect.min_x || effectiveX > cliprect.max_x) continue;
              const previous = spriteBitmap.pix(y, effectiveX);
              if ((previous & 0x0f) !== 0) {
                spriteCollide[((previous >>> 4) & 0x1f) + 32 * sprite] = 1;
                this.state.m_sprite_collide_summary = 1;
              }
              spriteBitmap['pix='](y, effectiveX, first | paletteBase);
            }
          }
          if (second === 0x0f) break;
          if (second !== 0) {
            for (let repeat = 0; repeat < 2; repeat++) {
              const effectiveX = flipped ? 0x1fe - (x + 2 + repeat) : x + 2 + repeat;
              if (effectiveX < cliprect.min_x || effectiveX > cliprect.max_x) continue;
              const previous = spriteBitmap.pix(y, effectiveX);
              if ((previous & 0x0f) !== 0) {
                spriteCollide[((previous >>> 4) & 0x1f) + 32 * sprite] = 1;
                this.state.m_sprite_collide_summary = 1;
              }
              spriteBitmap['pix='](y, effectiveX, second | paletteBase);
            }
          }
        }
      }
    }

    // MAME takes the s16 of (raw + 28), so a scroll past 0x7fff is negative
    // there and a large positive here; and its `/ 2` truncates toward zero
    // where Math.floor would step an extra pixel on every negative odd value.
    let xScroll = (((videoRam[0xffc] ?? 0) | ((videoRam[0xffd] ?? 0) << 8)) + 28) << 16 >> 16;
    let yScroll = videoRam[0xfbd] ?? 0;
    if (flipped) {
      xScroll = 640 - (xScroll & 0x1ff);
      yScroll = 764 - (yScroll & 0x1ff);
    }
    for (let y = cliprect.min_y; y <= cliprect.max_y; y++) {
      const backgroundY = (y + yScroll) & 0x1ff;
      for (let x = cliprect.min_x; x <= cliprect.max_x; x++) {
        const backgroundX = Math.trunc((x - xScroll) / 2) & 0x1ff;
        const foregroundPixel = foreground.pix(y & 0xff, Math.floor(x / 2) & 0xff);
        // System 1's four background quadrants all point at page zero here;
        // pixmap coordinates wrap at 256 exactly as the source pointer array.
        const backgroundPixel = background.pix(backgroundY & 0xff, backgroundX & 0xff);
        const spritePixel = spriteBitmap.pix(y & 0xff, x);
        const lookupIndex = (Number((spritePixel & 0x0f) === 0) << 0) |
          (Number((foregroundPixel & 7) === 0) << 1) |
          (((foregroundPixel >>> 9) & 3) << 2) |
          (Number((backgroundPixel & 7) === 0) << 4) |
          (((backgroundPixel >>> 9) & 3) << 5);
        let lookupValue = lookupProm[lookupIndex] ?? 0;
        if (!(lookupValue & 4)) {
          mixCollide[((lookupValue & 8) << 2) | ((spritePixel >>> 4) & 0x1f)] = 1;
          this.state.m_mix_collide_summary = 1;
        }
        lookupValue &= 3;
        bitmap['pix='](
          y,
          x,
          lookupValue === 0
            ? spritePixel & 0x1ff
            : lookupValue === 1
              ? 0x200 | (foregroundPixel & 0x1ff)
              : 0x400 | (backgroundPixel & 0x1ff),
        );
      }
    }
    return true;
  }

  private drawTaitoSj(bitmap: BitmapTarget, cliprect: GeneratedRectangle): boolean {
    const direct = bitmap.direct;
    const chars = this.state.m_characterram;
    const video = this.state.m_videoram;
    const colorbank = this.state.m_colorbank;
    const scroll = this.state.m_scroll;
    const columnScroll = this.state.m_colscrolly;
    const sprites = this.state.m_spriteram;
    const videoMode = this.state.m_video_mode;
    const priority = this.state.m_video_priority;
    const collision = this.state.m_collision_reg;
    const prom = this.state.m_proms;
    if (
      !direct ||
      !ArrayBuffer.isView(chars) ||
      !Array.isArray(video) ||
      video.some(layer => !ArrayBuffer.isView(layer)) ||
      !ArrayBuffer.isView(colorbank) ||
      !ArrayBuffer.isView(scroll) ||
      !ArrayBuffer.isView(columnScroll) ||
      !ArrayBuffer.isView(sprites) ||
      !ArrayBuffer.isView(videoMode) ||
      !ArrayBuffer.isView(priority) ||
      !ArrayBuffer.isView(collision) ||
      !ArrayBuffer.isView(prom)
    ) return false;
    const characterRam = chars as Uint8Array;
    const videoRam = video as Uint8Array[];
    const colors = colorbank as Uint8Array;
    const scrollRam = scroll as Uint8Array;
    const columns = columnScroll as Uint8Array;
    const spriteRam = sprites as Uint8Array;
    const mode = (videoMode as Uint8Array)[0] ?? 0;
    const priorityValue = (priority as Uint8Array)[0] ?? 0;
    const collisionRam = collision as Uint8Array;
    const priorityProm = prom as Uint8Array;
    const layers = Array.from({ length: 3 }, () => {
      const pixels = new Uint16Array(256 * 256);
      pixels.fill(0x40);
      return pixels;
    });
    const flipX = Boolean(mode & 0x01);
    const flipY = Boolean(mode & 0x02);
    for (let layer = 0; layer < 3; layer++) {
      const bank = layer === 0
        ? (colors[0]! & 0x08 ? 0x1800 : 0)
        : layer === 1
          ? (colors[0]! & 0x80 ? 0x1800 : 0)
          : (colors[1]! & 0x08 ? 0x1800 : 0);
      const color = layer === 0
        ? colors[0]! & 7
        : layer === 1
          ? (colors[0]! >>> 4) & 7
          : colors[1]! & 7;
      for (let offset = 0; offset < 0x400; offset++) {
        let tileX = offset & 31;
        let tileY = offset >>> 5;
        if (flipX) tileX = 31 - tileX;
        if (flipY) tileY = 31 - tileY;
        const code = videoRam[layer]![offset] ?? 0;
        for (let y = 0; y < 8; y++) {
          for (let x = 0; x < 8; x++) {
            const pen = decodeTaitoSjRamPixel(
              characterRam, bank, code,
              flipX ? 7 - x : x,
              flipY ? 7 - y : y,
              false,
            );
            if (pen) layers[layer]![(tileY * 8 + y) * 256 + tileX * 8 + x] =
              color * 8 + pen;
          }
        }
      }
    }
    const target = direct.pixels;
    const background = 8 * (colors[1]! & 7);
    target.fill(background);
    const order = new Array<number>(4);
    let mask = 0;
    for (let index = 3; index >= 0; index--) {
      let data = priorityProm[0x10 * (priorityValue & 0x0f) + mask] ?? 0;
      data = priorityValue & 0x10 ? data >>> 2 : data & 3;
      mask |= 1 << data;
      order[index] = data;
    }
    const layerPixel = (layer: number, outputX: number, hardwareY: number): number => {
      if (!(mode & (0x10 << layer))) return 0x40;
      const source = layers[layer]!;
      const rawScrollX = scrollRam[layer * 2] ?? 0;
      const scrollX = taitoSjLayerScrollX(rawScrollX, layer, flipX);
      const sourceX = (outputX - scrollX) & 0xff;
      const sourceColumn = sourceX >>> 3;
      const columnIndex = flipY ? 31 - sourceColumn : sourceColumn;
      const columnValue = columns[layer * 32 + columnIndex] ?? 0;
      const globalScrollY = scrollRam[layer * 2 + 1] ?? 0;
      const scrollY = flipY
        ? columnValue + globalScrollY
        : -columnValue - globalScrollY;
      const sourceY = (hardwareY - scrollY) & 0xff;
      return source[sourceY * 256 + sourceX]!;
    };
    const drawLayer = (layer: number): void => {
      if (!(mode & (0x10 << layer))) return;
      for (let outputY = 0; outputY < direct.height; outputY++) {
        const hardwareY = outputY + (this.machine.execution.screen.yOffset ?? 0);
        for (let outputX = 0; outputX < direct.width; outputX++) {
          const pen = layerPixel(layer, outputX, hardwareY);
          if (pen !== 0x40) target[outputY * direct.width + outputX] = pen;
        }
      }
    };
    const spriteInfo = (which: number, applyGlobalFlip: boolean) => {
      const page = mode & 0x04 ? 0x80 : 0;
      const offset = page + which * 4;
      const position = taitoSjSpritePosition(
        spriteRam[offset] ?? 0,
        spriteRam[offset + 1] ?? 0,
      );
      let sx = position.x;
      let sy = position.y;
      const attributes = spriteRam[offset + 2] ?? 0;
      let spriteFlipX = Boolean(attributes & 1);
      let spriteFlipY = Boolean(attributes & 2);
      if (applyGlobalFlip && flipX) {
        sx = (238 - sx) & 0xff;
        spriteFlipX = !spriteFlipX;
      }
      if (applyGlobalFlip && flipY) {
        sy = (242 - sy) & 0xff;
        spriteFlipY = !spriteFlipY;
      }
      return {
        ...position,
        x: sx,
        y: sy,
        flipX: spriteFlipX,
        flipY: spriteFlipY,
        code: (spriteRam[offset + 3] ?? 0) & 0x3f,
        bank: spriteRam[offset + 3]! & 0x40 ? 0x1800 : 0,
        color: 2 * ((colors[1]! >>> 4) & 3) + ((attributes >>> 2) & 1),
      };
    };
    const spritePen = (
      info: ReturnType<typeof spriteInfo>,
      x: number,
      y: number,
    ): number => decodeTaitoSjRamPixel(
      characterRam,
      info.bank,
      info.code,
      info.flipX ? 15 - x : x,
      info.flipY ? 15 - y : y,
      true,
    );
    const drawSprites = (): void => {
      if (!(mode & 0x80)) return;
      for (let sprite = 0x1f; sprite >= 0; sprite--) {
        const which = (sprite - 1) & 0x1f;
        if (which >= 0x10 && which <= 0x17) continue;
        const info = spriteInfo(which, true);
        if (!info.visible) continue;
        const minX = flipX ? 1 : 3;
        const maxX = flipX ? 252 : 254;
        for (let y = 0; y < 16; y++) {
          const hardwareY = info.y + y;
          const outputY = hardwareY - (this.machine.execution.screen.yOffset ?? 0);
          if (outputY < 0 || outputY >= direct.height) continue;
          for (let x = 0; x < 16; x++) {
            const pen = spritePen(info, x, y);
            if (!pen) continue;
            for (const outputX of [info.x + x, info.x + x - 256]) {
              if (outputX >= minX && outputX <= maxX) {
                target[outputY * direct.width + outputX] = info.color * 8 + pen;
              }
            }
          }
        }
      }
    };
    for (const item of order) item === 0 ? drawSprites() : drawLayer(item - 1);

    // Taito SJ exposes sprite/sprite and sprite/layer collisions to the game.
    // They accumulate until the CPU writes HTCLR, so rendering must OR into
    // the shared registers rather than resetting them each frame.
    if (mode & 0x80) {
      const active = Array.from({ length: 0x20 }, (_, which) =>
        which >= 0x10 && which <= 0x17 ? undefined : spriteInfo(which, false));
      for (let first = 0; first < 0x20; first++) {
        const left = active[first];
        if (!left?.visible) continue;
        for (let second = first + 1; second < 0x20; second++) {
          const right = active[second];
          if (!right?.visible) continue;
          const signed = (value: number) => value & 0x80 ? value - 0x100 : value;
          if (
            Math.abs(signed(left.x) - signed(right.x)) >= 16 ||
            Math.abs(signed(left.y) - signed(right.y)) >= 16
          ) continue;
          const minX = Math.max(left.x, right.x);
          const maxX = Math.min(left.x + 15, right.x + 15);
          const minY = Math.max(left.y, right.y);
          const maxY = Math.min(left.y + 15, right.y + 15);
          let hit = false;
          for (let y = minY; y <= maxY && !hit; y++) {
            for (let x = minX; x <= maxX; x++) {
              if (
                spritePen(left, x - left.x, y - left.y) &&
                spritePen(right, x - right.x, y - right.y)
              ) { hit = true; break; }
            }
          }
          if (!hit) continue;
          const collided = second === 0x1f ? first : second;
          let register = collided >>> 3;
          if (register === 3) register = 2;
          collisionRam[register] = collisionRam[register]! | (1 << (collided & 7));
        }
      }
      for (let which = 0; which < 0x20; which++) {
        const raw = active[which];
        if (!raw?.visible) continue;
        const info = spriteInfo(which, true);
        let layerHits = 0;
        for (let y = 0; y < 16; y++) {
          const hardwareY = info.y + y;
          if (hardwareY < 0 || hardwareY > 255) continue;
          for (let x = 0; x < 16; x++) {
            const hardwareX = info.x + x;
            if (hardwareX < 0 || hardwareX > 255 || !spritePen(info, x, y)) continue;
            for (let layer = 0; layer < 3; layer++) {
              if (layerPixel(layer, hardwareX, hardwareY) !== 0x40) {
                layerHits |= 1 << layer;
              }
            }
          }
        }
        collisionRam[3] = collisionRam[3]! | layerHits;
      }
    }
    return true;
  }

  private drawGalaxianSprites(
    screen: { visible_area(): GeneratedRectangle },
    bitmap: BitmapTarget,
    cliprect: GeneratedRectangle,
    spriteram: Uint8Array,
    spriteBase: number,
    gfx: GeneratedGfxElement,
  ): void {
    const clip = new GeneratedRectangle(
      cliprect.min_x,
      cliprect.max_x,
      cliprect.min_y,
      cliprect.max_y,
    );
    const xScale = Number(this.state.m_x_scale ?? 1);
    if (Number(this.state.m_flipscreen_x ?? 0)) {
      clip.max_x = (256 - 17) * xScale - 1;
    } else {
      clip.min_x = 17 * xScale;
    }
    clip.intersect(screen.visible_area());
    const froggerAdjust = Boolean(this.state.m_frogger_adjust);
    const sfxAdjust = Boolean(this.state.m_sfx_adjust);
    const flipScreenX = Boolean(this.state.m_flipscreen_x);
    const flipScreenY = Boolean(this.state.m_flipscreen_y);
    const h0Start = Number(this.state.m_h0_start ?? 0);
    for (let sprite = 7; sprite >= 0; sprite--) {
      const base = spriteBase + sprite * 4;
      const rawY = spriteram[base] ?? 0;
      const base0 = froggerAdjust
        ? ((rawY >>> 4) | (rawY << 4)) & 0xff
        : rawY;
      const yAdjust = Number(sfxAdjust ? sprite >= 3 : sprite < 3);
      let sy = (240 - (base0 - yAdjust)) & 0xff;
      const attributes = spriteram[base + 1] ?? 0;
      const code = attributes & 0x3f;
      let flipX = attributes & 0x40;
      let flipY = attributes & 0x80;
      const color = (spriteram[base + 2] ?? 0) & 7;
      let sx = ((spriteram[base + 3] ?? 0) + 1) & 0xff;
      if (flipScreenX) {
        sx = (240 - sx) & 0xff;
        flipX = Number(!flipX);
      }
      if (flipScreenY) {
        sy = (240 - sy) & 0xff;
        flipY = Number(!flipY);
      }
      gfx.transpen(
        bitmap,
        clip,
        code,
        color,
        flipX,
        flipY,
        h0Start + xScale * sx,
        sy,
        0,
      );
    }
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
    if (this.directScreenShape === 'taitosj-layered-char-ram') {
      const paletteRam = this.state.m_paletteram;
      if (!ArrayBuffer.isView(paletteRam)) return;
      const bytes = paletteRam as Uint8Array;
      const weights = [0x21, 0x47, 0x97];
      const end = Math.min(frame.length, pens.length, start + count);
      for (let index = start; index < end; index++) {
        const pen = pens[index]! & 0x3f;
        const low = bytes[pen * 2] ?? 0;
        const high = bytes[pen * 2 + 1] ?? 0;
        const component = (bits: number[]) =>
          bits.reduce((sum, bit, position) =>
            sum + weights[position]! * Number(!(bit < 8 ? low & (1 << bit) : high & (1 << (bit - 8)))),
          0);
        frame[index] = packRgb(
          component([14, 15, 0]),
          component([11, 12, 13]),
          component([8, 9, 10]),
        );
      }
      return;
    }
    (this.palette as GeneratedTnx1Palette | undefined)?.sync?.(this.state);
    const colors = this.palette?.colors;
    if (!colors) return;
    const end = Math.min(frame.length, pens.length, start + count);
    for (let index = start; index < end; index++) {
      frame[index] = colors[pens[index]!] ?? 0xff000000;
    }
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
        ? createRamPalette(plan.paletteRam, paletteBytes as Uint8Array)
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

  vblank(): void {
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
): Uint32Array {
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
  const network = {
    min: plan.min,
    max: plan.max,
    scaler: plan.scaler,
    channels: plan.channels,
  };
  const weights = computeWeights(network as GeneratedPromPalettePlan);
  const colors = new Uint32Array(plan.entries);
  for (let index = 0; index < colors.length; index++) {
    const raw = bytes[index] ?? 0;
    const rgb = { r: 0, g: 0, b: 0 };
    for (const channel of plan.channels) {
      rgb[channel.channel] = Math.floor(channel.bits.reduce(
        (sum, bit, position) =>
          sum + weights[channel.channel][position]! * ((raw >>> bit) & 1),
        0,
      ) + 0.5);
    }
    colors[index] = packRgb(rgb.r, rgb.g, rgb.b);
  }
  return colors;
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

/** Read the scalar addressed by a generated C++ pointer argument. */
function generatedPointerNumber(value: unknown): number {
  const pointer = value as {
    generatedPointer?: boolean;
    target?: { get?: () => unknown };
    source?: ArrayLike<unknown>;
    offset?: number;
  } | undefined;
  if (pointer?.generatedPointer) {
    if (typeof pointer.target?.get === 'function') return Number(pointer.target.get() ?? 0);
    if (pointer.source) return Number(pointer.source[pointer.offset ?? 0] ?? 0);
  }
  return Number(generatedArgumentValue(value) ?? 0);
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

function computeWeights(
  plan: GeneratedPromPalettePlan,
): Record<'r' | 'g' | 'b', number[]> {
  const raw: Record<'r' | 'g' | 'b', number[]> = { r: [], g: [], b: [] };
  let maximum = 0;
  for (const channel of plan.channels) {
    if (channel.weights) {
      raw[channel.channel] = [...channel.weights];
      maximum = Math.max(
        maximum,
        channel.weights.reduce((sum, value) => sum + value, 0),
      );
      continue;
    }
    const values = channel.resistances.map((_, selected) => {
      let r0 = channel.pulldown ? 1 / channel.pulldown : 1 / 1e12;
      let r1 = channel.pullup ? 1 / channel.pullup : 1 / 1e12;
      for (let index = 0; index < channel.resistances.length; index++) {
        const resistance = channel.resistances[index]!;
        if (!resistance) continue;
        if (index === selected) r1 += 1 / resistance;
        else r0 += 1 / resistance;
      }
      r0 = 1 / r0;
      r1 = 1 / r1;
      return Math.min(
        plan.max,
        Math.max(plan.min, (plan.max - plan.min) * r0 / (r1 + r0) + plan.min),
      );
    });
    raw[channel.channel] = values;
    maximum = Math.max(maximum, values.reduce((sum, value) => sum + value, 0));
  }
  const scale = plan.scaler < 0 ? plan.max / maximum : plan.scaler;
  for (const channel of ['r', 'g', 'b'] as const) {
    raw[channel] = raw[channel].map(value => value * scale);
  }
  return raw;
}

/**
 * MAME compute_res_net for the MB7052/TTL-output, 5V-bias path followed by
 * the Sanyo EZV20 monitor stage. These are electrical inputs: a zero bit
 * actively pulls low and the monitor then inverts the mixed voltage.
 */
function computeMameTtlSanyoResNet(
  inputs: number,
  resistances: readonly number[],
  biasResistance: number,
  groundResistance: number,
  amplifier: 'darlington' | 'emitter' | 'none',
): number {
  const vcc = 5;
  const vBias = 5;
  const vLow = 0.05;
  const vHigh = 4;
  const ttlHighResistance = 50;
  let conductance = 0;
  let weightedVoltage = 0;
  for (let bit = 0; bit < resistances.length; bit++) {
    const resistance = resistances[bit]!;
    if (!resistance || ((inputs >> bit) & 1)) continue;
    conductance += 1 / resistance;
    weightedVoltage += vLow / resistance;
  }
  if (biasResistance) {
    conductance += 1 / biasResistance;
    weightedVoltage += vBias / biasResistance;
  }
  if (groundResistance) conductance += 1 / groundResistance;

  let openCollector = conductance > 0 && weightedVoltage / conductance > vHigh;
  for (let bit = 0; bit < resistances.length; bit++) {
    const resistance = resistances[bit]!;
    if (!resistance || !((inputs >> bit) & 1) || openCollector) continue;
    conductance += 1 / (resistance + ttlHighResistance);
    weightedVoltage += vHigh / (resistance + ttlHighResistance);
  }
  let voltage = conductance > 0 ? weightedVoltage / conductance : 0;
  if (amplifier === 'darlington') voltage = Math.max(0.7, voltage);
  else if (amplifier === 'emitter') voltage = Math.max(0, voltage - 0.7);

  voltage = vcc - voltage;
  voltage = Math.max(0, voltage - 0.7);
  voltage = Math.min(voltage, vcc - 1.4);
  voltage = voltage / (vcc - 1.4) * vcc;
  return Math.floor(voltage * 255 / vcc + 0.4);
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

function drawAdditiveVectorLine(
  pixels: Uint32Array,
  width: number,
  height: number,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  intensity: number,
): void {
  const add = (x: number, y: number, level: number): void => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const index = y * width + x;
    const previous = pixels[index] ?? 0xff000000;
    const red = Math.min(255, (previous & 0xff) + level);
    const green = Math.min(255, ((previous >>> 8) & 0xff) + level);
    const blue = Math.min(255, ((previous >>> 16) & 0xff) + level);
    pixels[index] = packRgb(red, green, blue);
  };
  let x = fromX;
  let y = fromY;
  const deltaX = Math.abs(toX - fromX);
  const deltaY = Math.abs(toY - fromY);
  const stepX = fromX < toX ? 1 : -1;
  const stepY = fromY < toY ? 1 : -1;
  let error = deltaX - deltaY;
  const glow = Math.max(1, intensity >>> 3);
  for (;;) {
    add(x, y, intensity);
    add(x - 1, y, glow);
    add(x + 1, y, glow);
    add(x, y - 1, glow);
    add(x, y + 1, glow);
    if (x === toX && y === toY) break;
    const twice = error * 2;
    if (twice > -deltaY) {
      error -= deltaY;
      x += stepX;
    }
    if (twice < deltaX) {
      error += deltaX;
      y += stepY;
    }
  }
}

function modulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}
