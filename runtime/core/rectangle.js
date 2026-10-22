// MAME's `rectangle` (emu/rendertypes.h): a clip or area in raster pixels,
// inclusive at both ends. A framework value type, like attotime: video
// renderers clip with it, and devices are configured with one (the Spectrum
// ULA's screen area, `set_screen(m_screen, get_screen_area())`).
export class GeneratedRectangle {
    min_x;
    max_x;
    min_y;
    max_y;
    constructor(minX, maxX, minY, maxY) {
        this.min_x = minX;
        this.max_x = maxX;
        this.min_y = minY;
        this.max_y = maxY;
    }
    // emu/rendertypes.h accessors. A screen update's merge loop is written
    // `for (int y = rect.top(); y <= rect.bottom(); y++)`; unresolved, they
    // answered 0 and Atari System 1 merged one pixel of its sprites.
    left() { return this.min_x; }
    right() { return this.max_x; }
    top() { return this.min_y; }
    bottom() { return this.max_y; }
    width() { return this.max_x + 1 - this.min_x; }
    height() { return this.max_y + 1 - this.min_y; }
    contains(x, y) {
        return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y ? 1 : 0;
    }
    empty() {
        return this.min_x > this.max_x || this.min_y > this.max_y ? 1 : 0;
    }
    intersect(other) {
        if (!other || typeof other !== 'object')
            return;
        const rectangle = other;
        this.min_x = Math.max(this.min_x, Number(rectangle.min_x));
        this.max_x = Math.min(this.max_x, Number(rectangle.max_x));
        this.min_y = Math.max(this.min_y, Number(rectangle.min_y));
        this.max_y = Math.min(this.max_y, Number(rectangle.max_y));
    }
}
/** A rectangle carried through generated configuration: its four edges. */
export function isEncodedRectangle(value) {
    return Boolean(value) && typeof value === 'object' &&
        Array.isArray(value.rectangle) &&
        value.rectangle.length === 4;
}
