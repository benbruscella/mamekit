// MAME's `rectangle` (emu/rendertypes.h): a clip or area in raster pixels,
// inclusive at both ends. A framework value type, like attotime: video
// renderers clip with it, and devices are configured with one (the Spectrum
// ULA's screen area, `set_screen(m_screen, get_screen_area())`).

export class GeneratedRectangle {
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

  // emu/rendertypes.h accessors. A screen update's merge loop is written
  // `for (int y = rect.top(); y <= rect.bottom(); y++)`; unresolved, they
  // answered 0 and Atari System 1 merged one pixel of its sprites.
  left(): number { return this.min_x; }
  right(): number { return this.max_x; }
  top(): number { return this.min_y; }
  bottom(): number { return this.max_y; }
  width(): number { return this.max_x + 1 - this.min_x; }
  height(): number { return this.max_y + 1 - this.min_y; }

  contains(x: number, y: number): number {
    return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y ? 1 : 0;
  }

  empty(): number {
    return this.min_x > this.max_x || this.min_y > this.max_y ? 1 : 0;
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

/** A rectangle carried through generated configuration: its four edges. */
export function isEncodedRectangle(value: unknown): value is { rectangle: [number, number, number, number] } {
  return Boolean(value) && typeof value === 'object' &&
    Array.isArray((value as { rectangle?: unknown }).rectangle) &&
    (value as { rectangle: unknown[] }).rectangle.length === 4;
}
