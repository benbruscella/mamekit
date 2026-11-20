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
    /**
     * Save-state roots (machine-state.ts). A rectangle a device keeps is state:
     * sprite.cpp's `m_rect_list_bounds` and its rect list decide whether the
     * next frame recomputes its dirty rectangles, and left out of a save, a
     * rewound Marble Madness merged a stale list and lost a sprite.
     */
    stateKeys() {
        return ['min_x', 'max_x', 'min_y', 'max_y'];
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
    // bitmap.h's setters, which a CRTC fills its visible area with
    // (`visarea.set(0, max_visible_x, 0, max_visible_y)`).
    set(minX, maxX, minY, maxY) {
        this.min_x = Number(minX);
        this.max_x = Number(maxX);
        this.min_y = Number(minY);
        this.max_y = Number(maxY);
    }
    setx(minX, maxX) {
        this.min_x = Number(minX);
        this.max_x = Number(maxX);
    }
    sety(minY, maxY) {
        this.min_y = Number(minY);
        this.max_y = Number(maxY);
    }
    set_width(width) { this.max_x = this.min_x + Number(width) - 1; }
    set_height(height) { this.max_y = this.min_y + Number(height) - 1; }
    set_size(width, height) {
        this.set_width(width);
        this.set_height(height);
    }
    set_origin(x, y) {
        this.max_x += Number(x) - this.min_x;
        this.max_y += Number(y) - this.min_y;
        this.min_x = Number(x);
        this.min_y = Number(y);
    }
    offset(xDelta, yDelta) {
        this.offsetx(xDelta);
        this.offsety(yDelta);
    }
    offsetx(delta) {
        this.min_x += Number(delta);
        this.max_x += Number(delta);
    }
    offsety(delta) {
        this.min_y += Number(delta);
        this.max_y += Number(delta);
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
