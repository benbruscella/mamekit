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

  // bitmap.h's setters, which a CRTC fills its visible area with
  // (`visarea.set(0, max_visible_x, 0, max_visible_y)`).
  set(minX: number, maxX: number, minY: number, maxY: number): void {
    this.min_x = Number(minX);
    this.max_x = Number(maxX);
    this.min_y = Number(minY);
    this.max_y = Number(maxY);
  }

  setx(minX: number, maxX: number): void {
    this.min_x = Number(minX);
    this.max_x = Number(maxX);
  }

  sety(minY: number, maxY: number): void {
    this.min_y = Number(minY);
    this.max_y = Number(maxY);
  }

  set_width(width: number): void { this.max_x = this.min_x + Number(width) - 1; }
  set_height(height: number): void { this.max_y = this.min_y + Number(height) - 1; }

  set_size(width: number, height: number): void {
    this.set_width(width);
    this.set_height(height);
  }

  set_origin(x: number, y: number): void {
    this.max_x += Number(x) - this.min_x;
    this.max_y += Number(y) - this.min_y;
    this.min_x = Number(x);
    this.min_y = Number(y);
  }

  offset(xDelta: number, yDelta: number): void {
    this.offsetx(xDelta);
    this.offsety(yDelta);
  }

  offsetx(delta: number): void {
    this.min_x += Number(delta);
    this.max_x += Number(delta);
  }

  offsety(delta: number): void {
    this.min_y += Number(delta);
    this.max_y += Number(delta);
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
