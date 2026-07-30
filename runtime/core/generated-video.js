import { executeGeneratedCallbackHandler, executeGeneratedMachineProgram, } from "./generated-handler.js";
import { decodeGfx } from "./gfx.js";
/**
 * MAME screen-update methods declare their bitmap type: bitmap_ind16 screens
 * compose palette pen indices that the screen resolves on output, while
 * bitmap_rgb32 screens write final colors.
 */
export function isIndexedScreen(machine) {
    const target = machine.execution.screenUpdate?.handler;
    if (!target)
        return false;
    const handler = machine.handlers?.find(candidate => `${candidate.ownerClass}.${candidate.method}` === target);
    return /\bbitmap_ind16\b/.test(handler?.parameters ?? '');
}
/**
 * Compose reusable renderer primitives by executing the screen-update method
 * compiled from the selected MAME driver.
 */
export class GeneratedVideoRenderer {
    width;
    height;
    machine;
    primitives;
    screenUpdate;
    indexed;
    /**
     * bitmap_ind16 machines compose pen indices here, persisting across frames
     * so dirty-tile caching stays valid in pen space; each render resolves the
     * region into the RGBA output frame.
     */
    penBuffer;
    partialNextY;
    constructor(machine, primitives) {
        const screenUpdate = machine.callbacks.find(callback => callback.signal === 'set_screen_update');
        if (!screenUpdate) {
            throw new Error(`generated machine "${machine.game}" has no screen-update callback`);
        }
        this.machine = machine;
        this.primitives = primitives;
        this.screenUpdate = screenUpdate;
        this.indexed = isIndexedScreen(machine);
        this.width = primitives.width;
        this.height = primitives.height;
        this.partialNextY = machine.execution.screen.yOffset ?? 0;
        if (this.indexed)
            this.penBuffer = new Uint32Array(this.width * this.height);
    }
    vblank() {
        this.primitives.vblank();
    }
    render(frame) {
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
    updatePartial(frame, line) {
        if (this.machine.execution.screen.updateMode !== 'partial')
            return;
        const yOffset = this.machine.execution.screen.yOffset ?? 0;
        const finalY = yOffset + this.height - 1;
        const updateThrough = Math.min(Math.floor(line), finalY);
        if (updateThrough < this.partialNextY)
            return;
        this.renderRegion(frame, this.partialNextY, updateThrough);
        this.partialNextY = updateThrough + 1;
    }
    renderLine(frame, line) {
        const yOffset = this.machine.execution.screen.yOffset ?? 0;
        if (line < yOffset || line >= yOffset + this.height)
            return;
        this.renderRegion(frame, line, line);
    }
    renderRegion(frame, minY, maxY) {
        const xOffset = this.machine.execution.screen.xOffset ?? 0;
        const yOffset = this.machine.execution.screen.yOffset ?? 0;
        const xScale = this.machine.video?.renderScale?.x ?? 1;
        const yScale = this.machine.video?.renderScale?.y ?? 1;
        const cliprect = new GeneratedRectangle(xOffset * xScale, (xOffset + this.width) * xScale - 1, minY * yScale, (maxY + 1) * yScale - 1);
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
            fill: (color, rectangle) => {
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
                if (clippedFirstX > clippedLastX || clippedFirstY > clippedLastY)
                    return;
                for (let y = clippedFirstY; y <= clippedLastY; y++) {
                    const start = y * this.width + clippedFirstX;
                    target.fill(packed, start, y * this.width + clippedLastX + 1);
                }
            },
            plotRect: (x, y, pixelWidth, pixelHeight, color) => {
                // Generated gfx entries are scaled to the same source-domain raster as
                // the bitmap. The overwhelmingly common case is therefore one decoded
                // pixel covering exactly one output pixel. Avoid four floors, four
                // clamps and a fill loop for every tile/sprite pixel in that case.
                if (pixelWidth === xScale && pixelHeight === yScale) {
                    const outputX = (x - scaledXOffset) / xScale;
                    const outputY = (y - scaledYOffset) / yScale;
                    if (Number.isInteger(outputX) &&
                        Number.isInteger(outputY) &&
                        outputX >= 0 && outputX < this.width &&
                        outputY >= 0 && outputY < this.height) {
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
                if (clippedFirstX > clippedLastX || clippedFirstY > clippedLastY)
                    return;
                const packed = color >>> 0;
                if (clippedFirstX === clippedLastX &&
                    clippedFirstY === clippedLastY) {
                    target[clippedFirstY * this.width + clippedFirstX] = packed;
                    return;
                }
                for (let outputY = clippedFirstY; outputY <= clippedLastY; outputY++) {
                    const start = outputY * this.width + clippedFirstX;
                    target.fill(packed, start, outputY * this.width + clippedLastX + 1);
                }
            },
            'pix=': (y, x, color) => {
                const visibleX = Math.floor((x - xOffset * xScale) / xScale);
                const visibleY = Math.floor((y - yOffset * yScale) / yScale);
                if (visibleX >= 0 && visibleX < this.width &&
                    visibleY >= 0 && visibleY < this.height) {
                    target[visibleY * this.width + visibleX] = color >>> 0;
                }
            },
        };
        const screen = {
            visible_area: () => new GeneratedRectangle(xOffset * xScale, (xOffset + this.width) * xScale - 1, yOffset * yScale, (yOffset + this.height) * yScale - 1),
        };
        const handlerKey = `${this.screenUpdate.targetClass}.${this.screenUpdate.targetMethod}`;
        const direct = this.primitives.directScreenUpdate?.(handlerKey, screen, bitmap, cliprect) ?? false;
        const result = direct
            ? 0
            : executeGeneratedCallbackHandler(this.machine, this.screenUpdate, this.primitives.generatedVideoBindings(frame), {
                screen,
                bitmap,
                cliprect,
                ...this.primitives.generatedVideoArgs?.(frame),
            });
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
export function createGeneratedTileInfoTarget(tile) {
    return {
        get category() {
            return tile.category;
        },
        set category(value) {
            tile.category = Number(value) & 0x0f;
        },
        get group() {
            return tile.group;
        },
        set group(value) {
            tile.group = Number(value) & 0xff;
        },
        set(gfx, code, color, flags) {
            Object.assign(tile, { gfx, code, color, flags });
        },
    };
}
class GeneratedRectangle {
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
    contains(x, y) {
        return x >= this.min_x && x <= this.max_x && y >= this.min_y && y <= this.max_y ? 1 : 0;
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
/**
 * MAME palette RAM colored by a set_format raw_to_rgb converter. Writes follow
 * palette_device::write8/write8_ext: store the byte, then recompute the
 * affected entry, so mid-frame writes reach partial screen updates the same way
 * they do in MAME.
 */
class GeneratedRamPalette {
    colors;
    plan;
    ram;
    ext;
    /** palette_device::device_start halves bytes-per-entry across a split share. */
    bytesPerEntry;
    constructor(plan) {
        this.plan = plan;
        this.bytesPerEntry = plan.extShare ? plan.bytesPerEntry / 2 : plan.bytesPerEntry;
        this.ram = new Uint8Array(plan.entries * this.bytesPerEntry);
        if (plan.extShare)
            this.ext = new Uint8Array(plan.entries * this.bytesPerEntry);
        this.colors = new Uint32Array(plan.entries);
        for (let pen = 0; pen < plan.entries; pen++)
            this.update(pen);
        this.reset();
    }
    /** Replay palette basemem/extmem writes lowered from machine_reset(). */
    reset() {
        this.ram.fill(0);
        this.ext?.fill(0);
        for (let pen = 0; pen < this.plan.entries; pen++)
            this.update(pen);
        for (const write of this.plan.resetWrites ?? []) {
            this.write(write.offset, write.data, Boolean(write.ext));
        }
    }
    /** palette_device::write8 / write8_ext, then update_for_write. */
    write(offset, data, ext = false) {
        const bytes = ext ? this.ext : this.ram;
        if (!bytes || offset < 0 || offset >= bytes.length)
            return;
        bytes[offset] = data & 0xff;
        const count = Math.ceil(1 / this.bytesPerEntry);
        const base = Math.floor(offset / this.bytesPerEntry);
        for (let index = 0; index < count; index++)
            this.update(base + index);
    }
    /** palette_device::read_entry, little-endian across base then ext bytes. */
    entry(pen) {
        let raw = 0;
        for (let byte = 0; byte < this.bytesPerEntry; byte++) {
            raw |= (this.ram[pen * this.bytesPerEntry + byte] ?? 0) << (8 * byte);
        }
        if (this.ext) {
            for (let byte = 0; byte < this.bytesPerEntry; byte++) {
                raw |= (this.ext[pen * this.bytesPerEntry + byte] ?? 0) <<
                    (8 * (this.bytesPerEntry + byte));
            }
        }
        return raw >>> 0;
    }
    update(pen) {
        if (pen < 0 || pen >= this.colors.length)
            return;
        const raw = this.plan.inverted ? ~this.entry(pen) : this.entry(pen);
        const rgb = { r: 0, g: 0, b: 0 };
        for (const channel of this.plan.channels) {
            rgb[channel.channel] = palExpand(raw >>> channel.shift, channel.bits);
        }
        this.colors[pen] = packRgb(rgb.r, rgb.g, rgb.b);
    }
    /** A direct palette declares no indirect entries, so nothing is masked. */
    transpen_mask() {
        return 0;
    }
    black_pen() {
        for (let pen = 0; pen < this.colors.length; pen++) {
            if (this.colors[pen] === 0xff000000)
                return pen;
        }
        return 0;
    }
    pens() {
        return this.colors;
    }
}
/**
 * MAME palexpand<NumBits>: fill eight bits by repeating the raw value from the
 * most significant bit down, truncating the final partial copy.
 */
function palExpand(value, bits) {
    if (bits <= 0)
        return 0;
    const masked = value & ((1 << bits) - 1);
    if (bits >= 8)
        return masked & 0xff;
    let expanded = 0;
    for (let filled = 0; filled < 8;) {
        const take = Math.min(bits, 8 - filled);
        expanded = ((expanded << take) | (masked >>> (bits - take))) & 0xff;
        filled += take;
    }
    return expanded;
}
class GeneratedPalette {
    colors;
    indirect;
    transparentIndirect;
    constructor(plan, regions) {
        const prom = regions[plan.region];
        if (!prom)
            throw new Error(`generated palette: missing ROM region "${plan.region}"`);
        const lookupProm = plan.lookupRegion ? regions[plan.lookupRegion] : prom;
        if (!lookupProm) {
            throw new Error(`generated palette: missing lookup ROM region "${plan.lookupRegion}"`);
        }
        const weights = computeWeights(plan);
        const coreCount = Math.max(plan.colorCount, ...(plan.computedColors ?? []).map(group => group.base + group.count));
        const core = new Uint32Array(coreCount);
        for (let index = 0; index < plan.colorCount; index++) {
            const rgb = { r: 0, g: 0, b: 0 };
            for (const channel of plan.channels) {
                const values = weights[channel.channel];
                let value = 0;
                for (let bit = 0; bit < channel.bits.length; bit++) {
                    const source = prom[index + (channel.offsets?.[bit] ?? 0)] ?? 0;
                    value += values[bit] * ((source >> channel.bits[bit]) & 1);
                }
                rgb[channel.channel] = Math.floor(value + 0.5);
            }
            core[index] = packRgb(rgb.r, rgb.g, rgb.b);
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
                        value += values[bit] * ((index >> channel.bits[bit]) & 1);
                    }
                    rgb[channel.channel] = Math.floor(value + 0.5);
                }
                core[group.base + index] = packRgb(rgb.r, rgb.g, rgb.b);
            }
        }
        const penCount = Math.max(1, ...plan.banks.map(bank => {
            const count = bank.lookupCount ?? plan.lookupCount;
            return bank.penOffset + Math.max(0, count - 1) * (bank.penStride ?? 1) + 1;
        }));
        this.colors = new Uint32Array(penCount);
        this.indirect = new Uint16Array(penCount);
        for (const bank of plan.banks) {
            const lookupOffset = bank.lookupOffset ?? plan.lookupOffset;
            const lookupCount = bank.lookupCount ?? plan.lookupCount;
            for (let index = 0; index < lookupCount; index++) {
                const indirect = bank.direct
                    ? bank.colorOr + index * (bank.colorStride ?? 1)
                    : bank.colorOr | ((lookupProm[lookupOffset + index] ?? 0) & plan.lookupMask);
                const pen = bank.penOffset + index * (bank.penStride ?? 1);
                this.indirect[pen] = indirect;
                this.colors[pen] = core[indirect] ?? 0xff000000;
            }
        }
        this.transparentIndirect = plan.transparentIndirect;
    }
    transpen_mask(gfx, color, transparent) {
        let mask = 0;
        const base = gfx.entry.colorBase + color * gfx.granularity;
        for (let pen = 0; pen < gfx.granularity; pen++) {
            if (this.indirect[base + pen] === transparent)
                mask |= 1 << pen;
        }
        return mask;
    }
    /** MAME palette_device::black_pen(): a pen that resolves to black. */
    black_pen() {
        for (let pen = 0; pen < this.colors.length; pen++) {
            if (this.colors[pen] === 0xff000000)
                return pen;
        }
        return 0;
    }
    pens() {
        return this.colors;
    }
}
class GeneratedGfxElement {
    entry;
    decoded;
    granularity;
    palette;
    /** Indexed (bitmap_ind16) screens compose pens; the screen resolves them. */
    indexed;
    constructor(entry, decoded, palette, indexed = false) {
        this.entry = entry;
        this.decoded = decoded;
        this.granularity = 1 << entry.layout.planes;
        this.palette = palette;
        this.indexed = indexed;
    }
    transmask(bitmap, clip, code, color, flipX, flipY, sx, sy, transparentMask) {
        this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, transparentMask);
    }
    transpen(bitmap, clip, code, color, flipX, flipY, sx, sy, transparentPen) {
        this.draw(bitmap, clip, code, color, flipX, flipY, sx, sy, 1 << transparentPen);
    }
    indirectMask(color, transparent) {
        return this.palette.transpen_mask(this, color, transparent);
    }
    colorbase() {
        return this.entry.colorBase;
    }
    draw(bitmap, clip, code, color, flipX, flipY, sx, sy, transparentMask = 0) {
        const gfx = this.decoded;
        const element = modulo(code, gfx.count);
        const base = element * gfx.width * gfx.height;
        const colorBase = this.entry.colorBase + color * this.granularity;
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
            if (y < clip.min_y || y > clip.max_y)
                continue;
            const sourceY = flipY ? gfx.height - 1 - py : py;
            const outputY = directStartY + py;
            for (let px = 0; px < gfx.width; px++) {
                const x = sx + px * this.entry.xscale;
                if (x < clip.min_x || x > clip.max_x)
                    continue;
                const sourceX = flipX ? gfx.width - 1 - px : px;
                const pen = gfx.pixels[base + sourceY * gfx.width + sourceX];
                if (transparentMask & (1 << pen))
                    continue;
                const packed = this.indexed
                    ? colorBase + pen
                    : this.palette.colors[colorBase + pen] ?? 0xff000000;
                const outputX = directStartX + px;
                if (directPixels &&
                    outputX >= 0 && outputX < direct.width &&
                    outputY >= 0 && outputY < direct.height) {
                    directPixels[outputY * direct.width + outputX] = packed;
                }
                else if (bitmap.plotRect) {
                    bitmap.plotRect(x, y, this.entry.xscale, this.entry.yscale, packed);
                }
                else {
                    for (let yy = 0; yy < this.entry.yscale; yy++) {
                        for (let xx = 0; xx < this.entry.xscale; xx++) {
                            bitmap['pix='](y + yy, x + xx, packed);
                        }
                    }
                }
            }
        }
    }
}
class GeneratedTilemap {
    plan;
    mapper;
    tileInfo;
    machine;
    bindings;
    gfx;
    tiles = [];
    dirty = [];
    dirtyIndices = new Set();
    scrollX;
    scrollY;
    standardCacheComplete = false;
    flip = 0;
    constructor(plan, machine, bindings, gfx) {
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
    }
    mark_tile_dirty(index) {
        if (Number.isInteger(index) && index >= 0) {
            this.dirty[index] = 1;
            this.dirtyIndices.add(index);
        }
    }
    mark_all_dirty() {
        this.tiles.length = 0;
        this.dirty.length = 0;
        this.dirtyIndices.clear();
        this.standardCacheComplete = false;
    }
    set_flip(flags) {
        this.flip = flags;
    }
    set_scroll_cols(columns) {
        this.scrollY.length = Math.max(1, columns | 0);
        this.scrollY.fill(0);
    }
    set_scroll_rows(rows) {
        this.scrollX.length = Math.max(1, rows | 0);
        this.scrollX.fill(0);
    }
    set_scrolly(column, value) {
        this.scrollY[modulo(column, this.scrollY.length)] = value;
    }
    set_scrollx(row, value) {
        this.scrollX[modulo(row, this.scrollX.length)] = value;
    }
    tileAt(tileIndex) {
        let tile = this.tiles[tileIndex];
        const needsUpdate = !tile || this.dirty[tileIndex] === 1;
        if (!tile) {
            tile = { gfx: 0, code: 0, color: 0, flags: 0, category: 0, group: 0 };
            this.tiles[tileIndex] = tile;
        }
        if (needsUpdate) {
            Object.assign(tile, { gfx: 0, code: 0, color: 0, flags: 0, category: 0, group: 0 });
            const tileinfo = createGeneratedTileInfoTarget(tile);
            executeGeneratedMachineProgram(this.machine, this.tileInfo, this.bindings(), { tilemap: this, tileinfo, tile_index: tileIndex });
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
    refreshStandardCache(flipX, flipY) {
        if (this.mapper)
            return;
        const count = this.plan.columns * this.plan.rows;
        if (!this.standardCacheComplete) {
            for (let outputRow = 0; outputRow < this.plan.rows; outputRow++) {
                const row = flipY ? this.plan.rows - 1 - outputRow : outputRow;
                for (let outputColumn = 0; outputColumn < this.plan.columns; outputColumn++) {
                    const column = flipX
                        ? this.plan.columns - 1 - outputColumn
                        : outputColumn;
                    this.tileAt(mapStandardTile(this.plan.mapper, column, row, this.plan.columns, this.plan.rows));
                }
            }
            this.standardCacheComplete = true;
            return;
        }
        if (!this.dirtyIndices.size)
            return;
        const outputOrder = (tileIndex) => {
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
        for (const tileIndex of pending)
            this.tileAt(tileIndex);
    }
    draw(_screen, bitmap, clip, _flags, _priority) {
        const members = this.bindings().members ?? {};
        const globalFlip = Number(members.__flip_screen ?? 0) ? 3 : 0;
        const mapFlip = this.flip | globalFlip;
        const flipX = Boolean(mapFlip & 1);
        const flipY = Boolean(mapFlip & 2);
        this.refreshStandardCache(flipX, flipY);
        const standardCacheReady = !this.mapper;
        // A scrolled tilemap paints each tile at an offset, so a tile range derived
        // from the clip alone stops covering the visible area: with scrollx 140 the
        // clip-derived columns paint x -140..115 while the screen needs 0..255, and
        // the wrapped copies land a whole map away. Walk the entire map whenever a
        // scroll is live, exactly as a multi-band scroll already does; the wrap loop
        // then places every tile and the clip rejects the rest.
        const scrollsVertically = Boolean(this.plan.scrollColumns) ||
            this.scrollY.some(value => value !== 0);
        const scrollsHorizontally = Boolean(this.plan.scrollRows) ||
            this.scrollX.some(value => value !== 0);
        const firstOutputRow = scrollsVertically
            ? 0
            : Math.max(0, Math.floor(clip.min_y / this.plan.tileHeight));
        const lastOutputRow = scrollsVertically
            ? this.plan.rows - 1
            : Math.min(this.plan.rows - 1, Math.floor(clip.max_y / this.plan.tileHeight));
        const firstOutputColumn = scrollsHorizontally
            ? 0
            : Math.max(0, Math.floor(clip.min_x / this.plan.tileWidth));
        const lastOutputColumn = scrollsHorizontally
            ? this.plan.columns - 1
            : Math.min(this.plan.columns - 1, Math.floor(clip.max_x / this.plan.tileWidth));
        const mapWidth = this.plan.columns * this.plan.tileWidth;
        const mapHeight = this.plan.rows * this.plan.tileHeight;
        const xDelta = this.plan.scrollDx?.[flipX ? 1 : 0] ?? 0;
        const yDelta = this.plan.scrollDy?.[flipY ? 1 : 0] ?? 0;
        for (let outputRow = firstOutputRow; outputRow <= lastOutputRow; outputRow++) {
            const row = flipY ? this.plan.rows - 1 - outputRow : outputRow;
            const scrollRow = generatedScrollBand(outputRow, this.plan.rows, this.scrollX.length);
            const xScroll = this.scrollX[scrollRow] ?? 0;
            for (let outputColumn = firstOutputColumn; outputColumn <= lastOutputColumn; outputColumn++) {
                const column = flipX ? this.plan.columns - 1 - outputColumn : outputColumn;
                const scrollColumn = generatedScrollBand(outputColumn, this.plan.columns, this.scrollY.length);
                const yScroll = this.scrollY[scrollColumn] ?? 0;
                const y = outputRow * this.plan.tileHeight - yScroll + yDelta;
                const firstWrappedY = modulo(y, mapHeight) - mapHeight;
                let intersectsVerticalClip = false;
                for (let wrappedY = firstWrappedY; wrappedY <= firstWrappedY + mapHeight * 2; wrappedY += mapHeight) {
                    if (wrappedY <= clip.max_y &&
                        wrappedY + this.plan.tileHeight > clip.min_y) {
                        intersectsVerticalClip = true;
                        break;
                    }
                }
                if (!intersectsVerticalClip && standardCacheReady)
                    continue;
                const mapped = this.mapper
                    ? executeGeneratedMachineProgram(this.machine, this.mapper, this.bindings(), {
                        col: column,
                        row,
                        num_cols: this.plan.columns,
                        num_rows: this.plan.rows,
                    }).value
                    : mapStandardTile(this.plan.mapper, column, row, this.plan.columns, this.plan.rows);
                const tileIndex = generatedTileMemoryIndex(mapped);
                const tile = this.tileAt(tileIndex);
                // Preserve tile-cache update timing even when a tile is outside this
                // partial clip; callbacks can depend on live video attributes. The
                // expensive category, mask and graphics work is unnecessary once the
                // cache matches the source renderer's state.
                if (!intersectsVerticalClip)
                    continue;
                if (tile.category !== (_flags & 0x0f))
                    continue;
                const gfx = this.gfx[tile.gfx];
                if (!gfx)
                    continue;
                const tileFlipX = Boolean(tile.flags & 1) !== flipX;
                const tileFlipY = Boolean(tile.flags & 2) !== flipY;
                const x = outputColumn * this.plan.tileWidth - xScroll + xDelta;
                let transparentMask = 0;
                if (!(_flags & 0x80)) {
                    const groupMask = generatedTileGroupTransparentMask(this.plan, tile.group, _flags);
                    if (groupMask !== undefined) {
                        transparentMask = groupMask;
                    }
                    else if (this.plan.transparentIndirect !== undefined) {
                        transparentMask = gfx.indirectMask(tile.color, this.plan.transparentIndirect);
                    }
                    else if (this.plan.transparentPen !== undefined) {
                        transparentMask = 1 << this.plan.transparentPen;
                    }
                }
                const firstWrappedX = modulo(x, mapWidth) - mapWidth;
                for (let wrappedX = firstWrappedX; wrappedX <= firstWrappedX + mapWidth * 2; wrappedX += mapWidth) {
                    if (wrappedX > clip.max_x ||
                        wrappedX + this.plan.tileWidth <= clip.min_x) {
                        continue;
                    }
                    for (let wrappedY = firstWrappedY; wrappedY <= firstWrappedY + mapHeight * 2; wrappedY += mapHeight) {
                        if (wrappedY > clip.max_y ||
                            wrappedY + this.plan.tileHeight <= clip.min_y) {
                            continue;
                        }
                        gfx.draw(bitmap, clip, tile.code, tile.color, Number(tileFlipX), Number(tileFlipY), wrappedX, wrappedY, transparentMask);
                    }
                }
            }
        }
    }
}
export function generatedTileGroupTransparentMask(plan, group, flags) {
    const mask = plan.transmasks?.find(candidate => candidate.group === group);
    if (!mask)
        return undefined;
    const layers = flags & 0x70;
    if (layers === 0)
        return mask.foreground;
    let transparent = 0;
    if (layers & 0x10)
        transparent |= mask.foreground;
    if (layers & 0x20)
        transparent |= mask.background;
    if (layers & 0x40)
        transparent = 0xffffffff;
    return transparent >>> 0;
}
export function generatedTileMemoryIndex(mapped) {
    const index = Number(mapped);
    if (!Number.isInteger(index) || index < 0 || index > 0xffff_ffff) {
        throw new Error(`generated tile mapper returned invalid memory index ${String(mapped)}`);
    }
    return index;
}
/** MAME scroll rows/columns divide a tilemap into contiguous equal bands. */
export function generatedScrollBand(tile, tileCount, bands) {
    if (tileCount <= 0 || bands <= 1)
        return 0;
    return Math.min(bands - 1, Math.floor(tile * bands / tileCount));
}
/**
 * Select direct executors by the generated MAME routine structure. Keeping the
 * check source-shaped means another driver only inherits a fast path when it
 * has the same semantics; no game name or handwritten package flag is needed.
 */
export function generatedDirectScreenShape(machine) {
    const screenKey = machine.execution.screenUpdate?.handler;
    const screen = machine.handlers?.find(handler => `${handler.ownerClass}.${handler.method}` === screenKey);
    const body = screen?.body ?? '';
    if (body.includes('m_draw_background_ptr(bitmap, cliprect)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('for (int i = 0; i < m_numspritegens; i++)') &&
        body.includes('sprites_draw(screen, bitmap, cliprect,') &&
        body.includes('if (!m_draw_bullet_ptr.isnull())') &&
        machine.video?.delegates?.m_draw_bullet_ptr === null) {
        const sprites = machine.handlers?.find(handler => handler.method === 'sprites_draw' &&
            handler.body?.includes('for (int sprnum = 7; sprnum >= 0; sprnum--)') &&
            handler.body.includes('m_extend_sprite_info_ptr(base, &sx, &sy, &flipx, &flipy, &code, &color)') &&
            handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap,clip,'));
        const extensionKey = machine.video?.delegates?.m_extend_sprite_info_ptr;
        const extension = typeof extensionKey === 'string'
            ? machine.handlers?.find(handler => `${handler.ownerClass}.${handler.method}` === extensionKey)
            : undefined;
        if (sprites?.program?.diagnostics.length === 0 &&
            extension?.program?.diagnostics.length === 0 &&
            extension.program.operations.length === 0) {
            return 'galaxian-no-bullets';
        }
    }
    if (body.includes('if (m_video_enable)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0)') &&
        body.includes('draw_sprites(bitmap, cliprect)') &&
        body.includes('m_bg_tilemap->draw(screen, bitmap, cliprect, 1, 0)')) {
        const sprites = machine.handlers?.find(handler => handler.method === 'draw_sprites' &&
            handler.body?.includes('for (int offs = 0x3e; offs >= 0x10; offs -= 2)') &&
            handler.body.includes('int const sy = 241 - m_spriteram[1][offs + 1]') &&
            handler.body.includes('m_gfxdecode->gfx(1)->transpen(bitmap, cliprect,'));
        if (sprites?.program?.diagnostics.length === 0)
            return 'timeplt';
    }
    return undefined;
}
/**
 * Hardware-neutral MAME video services. All layouts, palette wiring,
 * tile callbacks, sprite loops and initial state come from generated IR.
 */
export class GeneratedMameVideoPrimitives {
    width;
    height;
    machine;
    state;
    gfx;
    palette;
    palettes = new Map();
    ramPalette;
    gfxByDecode = new Map();
    bindings;
    directScreenShape;
    constructor(machine, regions, state, bindings, updatePartial) {
        this.machine = machine;
        this.state = state;
        this.width = machine.execution.screen.width;
        this.height = machine.execution.screen.height;
        for (const [tag, bytes] of Object.entries(regions)) {
            const member = `m_${tag.replace(/[^A-Za-z0-9_]/g, '_')}`;
            if (!Object.hasOwn(state, member))
                state[member] = bytes;
        }
        for (const [member, value] of Object.entries(machine.video?.initialState ?? {})) {
            if (!Object.hasOwn(state, member)) {
                state[member] = Array.isArray(value) ? [...value] : value;
            }
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
            this.palettes.set('m_palette', new GeneratedPalette(machine.video.palette, regions));
        }
        if (machine.video?.ramPalette) {
            this.ramPalette = new GeneratedRamPalette(machine.video.ramPalette);
            this.palettes.set('m_palette', this.ramPalette);
        }
        for (const palette of machine.video?.palettes ?? []) {
            this.palettes.set(palette.member, new GeneratedPalette(palette.plan, regions));
        }
        this.palette = this.palettes.get('m_palette') ?? this.palettes.values().next().value;
        const indexed = isIndexedScreen(machine);
        this.gfx = (machine.video?.gfx ?? []).map(entry => {
            const region = regions[entry.region];
            if (!region)
                throw new Error(`${machine.game}: missing gfx region "${entry.region}"`);
            const palette = entry.paletteMember
                ? this.palettes.get(entry.paletteMember)
                : this.palette;
            if (!palette) {
                throw new Error(`${machine.game}: gfx region "${entry.region}" has no generated palette`);
            }
            const gfx = new GeneratedGfxElement(entry, decodeGfx(entry.layout, region, entry.offset), palette, indexed);
            if (entry.decodeMember) {
                const group = this.gfxByDecode.get(entry.decodeMember) ?? [];
                group.push(gfx);
                this.gfxByDecode.set(entry.decodeMember, group);
            }
            return gfx;
        });
        const referenceCalls = {
            ...bindings.referenceCalls,
            memregion: (...args) => {
                const tag = String(generatedArgumentValue(args[0]) ?? '');
                const bytes = regions[tag];
                if (!bytes)
                    throw new Error(`${machine.game}: missing video ROM region "${tag}"`);
                return {
                    base: () => bytes,
                    bytes: () => bytes.length,
                };
            },
            rectangle: (...args) => new GeneratedRectangle(Number(args[0] ?? 0), Number(args[1] ?? 0), Number(args[2] ?? 0), Number(args[3] ?? 0)),
            'machine().tilemap().mark_all_dirty': () => {
                for (const plan of machine.video?.tilemaps ?? []) {
                    state[plan.member]?.mark_all_dirty();
                }
                return 0;
            },
            'machine().tilemap().set_flip_all': (...args) => {
                const flags = Number(generatedArgumentValue(args[0]) ?? 0);
                for (const plan of machine.video?.tilemaps ?? []) {
                    state[plan.member]?.set_flip(flags);
                }
                return 0;
            },
        };
        if (lfsr?.rowRenderer) {
            const row = lfsr.rowRenderer;
            referenceCalls[row.method] = (...rawArgs) => {
                const args = rawArgs.map(generatedArgumentValue);
                const bitmap = args[0];
                const maxX = Number(args[1]);
                const y = Number(args[2]);
                let starOffset = modulo(Number(args[3]), lfsr.period);
                const starMask = Number(args[4]);
                const stars = state[lfsr.member];
                const colors = state[row.colorMember];
                const scale = Number(state[row.scaleMember] ?? 1);
                for (let x = 0; x < maxX; x++) {
                    const enabled = (y ^ (x >> 3)) & 1;
                    let star = stars[starOffset++];
                    if (starOffset >= lfsr.period)
                        starOffset = 0;
                    if (enabled && (star & 0x80) && (star & starMask)) {
                        bitmap['pix='](y, scale * x, colors[star & 0x3f] ?? 0xff000000);
                    }
                    star = stars[starOffset++];
                    if (starOffset >= lfsr.period)
                        starOffset = 0;
                    if (enabled && (star & 0x80) && (star & starMask)) {
                        const color = colors[star & 0x3f] ?? 0xff000000;
                        bitmap['pix='](y, scale * x + 1, color);
                        bitmap['pix='](y, scale * x + 2, color);
                    }
                }
                return 0;
            };
        }
        const callParameters = {
            ...bindings.callParameters,
        };
        for (const [member, target] of Object.entries(machine.video?.delegates ?? {})) {
            if (target === null) {
                state[member] = { isnull: () => 1 };
                continue;
            }
            const handler = requiredHandler(machine, target);
            if (handler.program.operations.length === 0) {
                referenceCalls[member] = () => 0;
                callParameters[member] = parameterDeclarations(handler.parameters);
                state[member] = { isnull: () => 0 };
                continue;
            }
            // Parsed once per delegate, not once per call: these run per tile and
            // per pixel, and re-splitting the signature there was measurable.
            const names = parameterNames(handler.parameters);
            referenceCalls[member] = (...args) => executeGeneratedMachineProgram(machine, handler, this.bindings, Object.fromEntries(names.map((name, index) => [name, args[index] ?? 0]))).value ?? 0;
            callParameters[member] = parameterDeclarations(handler.parameters);
            state[member] = { isnull: () => 0 };
        }
        state.m_screen = {
            __frame: 0,
            frame_number() { return this.__frame; },
            vpos: () => bindings.calls?.['m_screen.vpos']?.() ?? 0,
            update_partial: (line) => updatePartial?.(line),
            visible_area: () => new GeneratedRectangle(0, machine.execution.screen.width * (machine.video?.renderScale?.x ?? 1) - 1, machine.execution.screen.yOffset ?? 0, (machine.execution.screen.yOffset ?? 0) + machine.execution.screen.height - 1),
        };
        this.bindings = {
            ...bindings,
            members: state,
            referenceCalls,
            callParameters,
        };
        if (this.palette) {
            state.m_gfxdecode = { gfx: (index) => this.gfx[index] };
            state.m_palette = this.palette;
        }
        for (const [member, palette] of this.palettes) {
            state[member] = palette;
        }
        for (const [member, gfx] of this.gfxByDecode) {
            state[member] = { gfx: (index) => gfx[index] };
        }
        for (const plan of machine.video?.tilemaps ?? []) {
            state[plan.member] = new GeneratedTilemap(plan, machine, () => this.bindings, plan.decodeMember
                ? this.gfxByDecode.get(plan.decodeMember) ?? []
                : this.gfx);
        }
        this.directScreenShape = generatedDirectScreenShape(machine);
    }
    generatedVideoBindings(_frame) {
        return this.bindings;
    }
    directScreenUpdate(handler, screen, bitmap, cliprect) {
        if (handler !== this.machine.execution.screenUpdate?.handler)
            return false;
        if (this.directScreenShape === 'galaxian-no-bullets') {
            const background = this.bindings.referenceCalls?.m_draw_background_ptr;
            if (!background)
                return false;
            background(bitmap, cliprect);
            const tilemap = this.state.m_bg_tilemap;
            const spriteram = this.state.m_spriteram;
            const gfx = this.gfx[1];
            if (!tilemap || !ArrayBuffer.isView(spriteram) || !gfx)
                return false;
            tilemap.draw(screen, bitmap, cliprect, 0, 0);
            const bytes = spriteram;
            const generators = Number(this.state.m_numspritegens ?? 1);
            const spritesBase = Number(this.state.m_sprites_base ?? 0);
            for (let generator = 0; generator < generators; generator++) {
                this.drawGalaxianSprites(screen, bitmap, cliprect, bytes, spritesBase + generator * 0x20, gfx);
            }
            return true;
        }
        if (this.directScreenShape === 'timeplt') {
            if (!Number(this.state.m_video_enable ?? 0))
                return true;
            const tilemap = this.state.m_bg_tilemap;
            const spriteBanks = this.state.m_spriteram;
            const gfx = this.gfx[1];
            if (!tilemap ||
                !Array.isArray(spriteBanks) ||
                !ArrayBuffer.isView(spriteBanks[0]) ||
                !ArrayBuffer.isView(spriteBanks[1]) ||
                !gfx) {
                return false;
            }
            tilemap.draw(screen, bitmap, cliprect, 0, 0);
            const attributes = spriteBanks[1];
            const positions = spriteBanks[0];
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
        return false;
    }
    drawGalaxianSprites(screen, bitmap, cliprect, spriteram, spriteBase, gfx) {
        const clip = new GeneratedRectangle(cliprect.min_x, cliprect.max_x, cliprect.min_y, cliprect.max_y);
        const xScale = Number(this.state.m_x_scale ?? 1);
        if (Number(this.state.m_flipscreen_x ?? 0)) {
            clip.max_x = (256 - 17) * xScale - 1;
        }
        else {
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
            gfx.transpen(bitmap, clip, code, color, flipX, flipY, h0Start + xScale * sx, sy, 0);
        }
    }
    /** palette_device::write8 / write8_ext into source-derived palette RAM. */
    writePaletteRam(offset, data, ext = false) {
        this.ramPalette?.write(offset, data, ext);
    }
    reset() {
        this.ramPalette?.reset();
    }
    resolveScreenPens(pens, frame, start, count) {
        const colors = this.palette?.colors;
        if (!colors)
            return;
        const end = Math.min(frame.length, pens.length, start + count);
        for (let index = start; index < end; index++) {
            frame[index] = colors[pens[index]] ?? 0xff000000;
        }
    }
    render(frame) {
        const plan = this.machine.video?.bitmap;
        if (!plan)
            return;
        const source = this.state[plan.member];
        if (!ArrayBuffer.isView(source)) {
            throw new Error(`${this.machine.game}: bitmap member "${plan.member}" is not bound`);
        }
        const bytes = source;
        frame.fill(plan.black >>> 0);
        const bitsPerPixel = plan.bitsPerPixel ?? 1;
        const pixelsPerByte = 8 / bitsPerPixel;
        const paletteBytes = plan.paletteRam
            ? this.state[plan.paletteRam.member]
            : undefined;
        const palette = plan.paletteRam && ArrayBuffer.isView(paletteBytes)
            ? createRamPalette(plan.paletteRam, paletteBytes)
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
                    const x = plan.xOffset + outputX;
                    if (x < this.width && outputY < this.height) {
                        frame[outputY * this.width + x] =
                            (palette?.[value] ??
                                (value ? plan.white : plan.black)) >>> 0;
                    }
                }
            }
        }
    }
    vblank() {
        const screen = this.state.m_screen;
        if (screen) {
            screen.__frame = (screen.__frame ?? 0) + 1;
            screen.frame_number = () => screen.__frame ?? 0;
        }
    }
}
function createRamPalette(plan, bytes) {
    const network = {
        min: plan.min,
        max: plan.max,
        scaler: plan.scaler,
        channels: plan.channels,
    };
    const weights = computeWeights(network);
    const colors = new Uint32Array(plan.entries);
    for (let index = 0; index < colors.length; index++) {
        const raw = bytes[index] ?? 0;
        const rgb = { r: 0, g: 0, b: 0 };
        for (const channel of plan.channels) {
            rgb[channel.channel] = Math.floor(channel.bits.reduce((sum, bit, position) => sum + weights[channel.channel][position] * ((raw >>> bit) & 1), 0) + 0.5);
        }
        colors[index] = packRgb(rgb.r, rgb.g, rgb.b);
    }
    return colors;
}
// A MAME signature is a constant, so parsing it is cached by that string.
const PARAMETER_NAMES = new Map();
const PARAMETER_DECLARATIONS = new Map();
function parameterNames(parameters) {
    const key = parameters ?? '';
    let names = PARAMETER_NAMES.get(key);
    if (!names) {
        names = parameterDeclarations(parameters)
            .map(parameter => /(\w+)\s*$/.exec(parameter)?.[1])
            .filter((name) => Boolean(name));
        PARAMETER_NAMES.set(key, names);
    }
    return names;
}
function parameterDeclarations(parameters) {
    const key = parameters ?? '';
    let declared = PARAMETER_DECLARATIONS.get(key);
    if (!declared) {
        declared = key.split(',').map(value => value.trim()).filter(Boolean);
        PARAMETER_DECLARATIONS.set(key, declared);
    }
    return declared;
}
function generatedArgumentValue(value) {
    if (value && typeof value === 'object' &&
        typeof value.get === 'function') {
        return value.get();
    }
    return value;
}
function requiredHandler(machine, key) {
    const handler = machine.handlers?.find(candidate => `${candidate.ownerClass}.${candidate.method}` === key &&
        candidate.program &&
        candidate.program.diagnostics.length === 0);
    if (!handler)
        throw new Error(`${machine.game}: generated video handler "${key}" is not executable`);
    return handler;
}
function standardMapper(key) {
    return key === 'TILEMAP_SCAN_ROWS' || key === 'TILEMAP_SCAN_COLS';
}
function mapStandardTile(key, column, row, columns, rows) {
    if (key === 'TILEMAP_SCAN_ROWS')
        return row * columns + column;
    if (key === 'TILEMAP_SCAN_COLS')
        return column * rows + row;
    return 0;
}
function computeWeights(plan) {
    const raw = { r: [], g: [], b: [] };
    let maximum = 0;
    for (const channel of plan.channels) {
        if (channel.weights) {
            raw[channel.channel] = [...channel.weights];
            maximum = Math.max(maximum, channel.weights.reduce((sum, value) => sum + value, 0));
            continue;
        }
        const values = channel.resistances.map((_, selected) => {
            let r0 = channel.pulldown ? 1 / channel.pulldown : 1 / 1e12;
            let r1 = channel.pullup ? 1 / channel.pullup : 1 / 1e12;
            for (let index = 0; index < channel.resistances.length; index++) {
                const resistance = channel.resistances[index];
                if (!resistance)
                    continue;
                if (index === selected)
                    r1 += 1 / resistance;
                else
                    r0 += 1 / resistance;
            }
            r0 = 1 / r0;
            r1 = 1 / r1;
            return Math.min(plan.max, Math.max(plan.min, (plan.max - plan.min) * r0 / (r1 + r0) + plan.min));
        });
        raw[channel.channel] = values;
        maximum = Math.max(maximum, values.reduce((sum, value) => sum + value, 0));
    }
    const scale = plan.scaler < 0 ? plan.max / maximum : plan.scaler;
    for (const channel of ['r', 'g', 'b']) {
        raw[channel] = raw[channel].map(value => value * scale);
    }
    return raw;
}
function packRgb(red, green, blue) {
    return (0xff000000 | (blue << 16) | (green << 8) | red) >>> 0;
}
function modulo(value, modulus) {
    return ((value % modulus) + modulus) % modulus;
}
