// Roc'n Rope (Konami 1983) board video renderer.
//
// Hand-transpiled from MAME ground truth:
//   - src/mame/konami/rocnrope.cpp (modern; video code lives in the driver file)
//       rocnrope_state::palette         (rocnrope.cpp:102-149)
//       rocnrope_state::get_bg_tile_info (rocnrope.cpp:163-171)
//       rocnrope_state::video_start     (rocnrope.cpp:173-176)
//       rocnrope_state::draw_sprites    (rocnrope.cpp:178-191)
//       rocnrope_state::screen_update   (rocnrope.cpp:193-198)
//       charlayout / spritelayout / gfx_rocnrope (rocnrope.cpp:346-373)
//       screen: 32*8 x 32*8, visarea x 0..255, y 16..239, 60 Hz
//       (rocnrope.cpp:406-413)
//   - src/emu/video/resnet.cpp via the shared runtime port (resnet.ts).
//
// Native (pre-rotation) resolution 256x224 (the game is ROT270; the shell
// applies the rotation at blit time, as everywhere else in this runtime).
// Output pixels are packed 0xAABBGGRR (canvas ImageData order), alpha 0xff.
//
// Deliberate simplification: modern MAME marks tiles dirty on videoram_w /
// colorram_w and redraws incrementally; we render the whole frame from the
// live shares once per frame, like the other mamekit boards.
import { decodeGfx } from "../gfx.js";
import { computeResistorWeights, combineWeights, packRGB } from "./resnet.js";
// ---------------------------------------------------------------------------
// gfx layouts — rocnrope.cpp:346-368.
export const ROCNROPE_CHAR_LAYOUT = {
    width: 8,
    height: 8,
    total: 512,
    planes: 4,
    // { 0x2000*8+4, 0x2000*8+0, 4, 0 } — 4bpp split across the two ROM halves
    planeOffsets: [0x2000 * 8 + 4, 0x2000 * 8 + 0, 4, 0],
    xOffsets: [0, 1, 2, 3, 64, 65, 66, 67], // { 0..3, 8*8+0..3 }
    yOffsets: [0, 8, 16, 24, 32, 40, 48, 56], // { 0*8..7*8 }
    charIncrement: 16 * 8, // every char takes 16 bytes
};
export const ROCNROPE_SPRITE_LAYOUT = {
    width: 16,
    height: 16,
    total: 256,
    planes: 4,
    // { 256*64*8+4, 256*64*8+0, 4, 0 } — 4bpp split across the two ROM halves
    planeOffsets: [256 * 64 * 8 + 4, 256 * 64 * 8 + 0, 4, 0],
    // { 0..3, 8*8+0..3, 16*8+0..3, 24*8+0..3 }
    xOffsets: [0, 1, 2, 3, 64, 65, 66, 67, 128, 129, 130, 131, 192, 193, 194, 195],
    // { 0*8..7*8, 32*8..39*8 }
    yOffsets: [0, 8, 16, 24, 32, 40, 48, 56, 256, 264, 272, 280, 288, 296, 304, 312],
    charIncrement: 64 * 8, // every sprite takes 64 bytes
};
export function buildRocnropePalette(proms) {
    // compute_resistor_weights(0, 255, -1.0,
    //     3, { 1000, 470, 220 }, rweights, 1000, 0,
    //     3, { 1000, 470, 220 }, gweights, 1000, 0,
    //     2, { 470, 220 },       bweights, 1000, 0)   — rocnrope.cpp:110-113
    // R and G use identical networks, so one shared weight table is exact.
    const [rgweights, bweights] = computeResistorWeights(0, 255, -1.0, [
        { resistances: [1000, 470, 220], pulldown: 1000, pullup: 0 },
        { resistances: [470, 220], pulldown: 1000, pullup: 0 },
    ]);
    const core = new Uint32Array(32);
    for (let i = 0; i < 0x20; i++) {
        const v = proms[i];
        const r = combineWeights(rgweights, v & 1, (v >> 1) & 1, (v >> 2) & 1);
        const g = combineWeights(rgweights, (v >> 3) & 1, (v >> 4) & 1, (v >> 5) & 1);
        const b = combineWeights(bweights, (v >> 6) & 1, (v >> 7) & 1);
        core[i] = packRGB(r, g, b);
    }
    const spriteColor = new Uint32Array(16 * 16);
    const spriteTransparent = new Uint8Array(16 * 16);
    for (let i = 0; i < 0x100; i++) {
        const ctab = proms[0x020 + i] & 0x0f;
        spriteColor[i] = core[ctab];
        spriteTransparent[i] = ctab === 0 ? 1 : 0;
    }
    const charColor = new Uint32Array(16 * 16);
    for (let i = 0; i < 0x100; i++) {
        charColor[i] = core[proms[0x120 + i] & 0x0f];
    }
    return { core, spriteColor, charColor, spriteTransparent };
}
// ---------------------------------------------------------------------------
const BLACK = packRGB(0, 0, 0);
// screen.set_visarea(0*8, 32*8-1, 2*8, 30*8-1): the bitmap is 256x256 with
// visible y 16..239; our framebuffer holds the visible window only.
const VBEND = 16;
export class RocnropeVideo {
    width = 256;
    height = 224;
    videoram;
    colorram;
    spriteram0;
    spriteram1;
    charGfx;
    spriteGfx;
    pal;
    flip = false; // mainlatch Q0 -> flip_screen_set (inverted; board resolves the polarity)
    constructor(deps) {
        const tiles = deps.regions['tiles'];
        const sprites = deps.regions['sprites'];
        const proms = deps.regions['proms'];
        if (!tiles || !sprites || !proms)
            throw new Error('rocnrope video: missing tiles/sprites/proms region');
        if (proms.length < 0x220)
            throw new Error('rocnrope video: proms region too small');
        this.videoram = deps.videoram;
        this.colorram = deps.colorram;
        this.spriteram0 = deps.spriteram0;
        this.spriteram1 = deps.spriteram1;
        // GFXDECODE_ENTRY("sprites", 0, spritelayout, 0, 16) /
        // ("tiles", 0, charlayout, 16*16, 16) — rocnrope.cpp:370-373
        this.charGfx = decodeGfx(ROCNROPE_CHAR_LAYOUT, tiles); // 512 8x8 chars
        this.spriteGfx = decodeGfx(ROCNROPE_SPRITE_LAYOUT, sprites); // 256 16x16 sprites
        this.pal = buildRocnropePalette(proms);
    }
    /**
     * mainlatch Q0 (rocnrope.cpp:396: q_out_cb<0>().set(flip_screen_set).invert()).
     * The board passes the already-inverted flip state (true = render flipped).
     */
    setFlip(state) {
        this.flip = state;
    }
    /** Port of screen_update (rocnrope.cpp:193-198): opaque bg tilemap, then sprites. */
    render(frame) {
        frame.fill(BLACK);
        this.drawTilemap(frame);
        this.drawSprites(frame);
    }
    /** No per-frame latching; state is sampled during render like screen_update. */
    vblank() { }
    /**
     * Tilemap: TILEMAP_SCAN_ROWS 32x32 of 8x8 chars (rocnrope.cpp:175).
     * get_bg_tile_info (rocnrope.cpp:163-171):
     *   code  = videoram + 2 * (attr & 0x80)   (attr bit 7 -> +0x100, 512 chars)
     *   color = attr & 0x0f
     *   flipx = attr bit 6, flipy = attr bit 5
     * Chars are opaque (background layer, pen 0 drawn through the LUT).
     * Screen flip mirrors the 32x32 layer in X and Y and inverts the per-tile
     * flips (MAME's generic tilemap flip), same convention as video/gyruss.ts.
     * Rows 0-1 and 30-31 fall outside the visible window (y 16..239).
     */
    drawTilemap(frame) {
        const vram = this.videoram;
        const cram = this.colorram;
        const gfx = this.charGfx;
        const src = gfx.pixels;
        const charColor = this.pal.charColor;
        const flip = this.flip;
        const w = this.width;
        const h = this.height;
        for (let row = 0; row < 32; row++) {
            for (let col = 0; col < 32; col++) {
                const offs = (row << 5) | col;
                const attr = cram[offs];
                const destY = (flip ? 31 - row : row) * 8 - VBEND;
                if (destY < 0 || destY >= h)
                    continue;
                const destX = (flip ? 31 - col : col) * 8;
                const code = (vram[offs] + 2 * (attr & 0x80)) % gfx.count;
                const colorBase = (attr & 0x0f) * 16;
                let flipx = (attr >> 6) & 1;
                let flipy = (attr >> 5) & 1;
                if (flip) {
                    flipx ^= 1;
                    flipy ^= 1;
                }
                const base = code * 64;
                for (let py = 0; py < 8; py++) {
                    const srcRow = base + (flipy ? 7 - py : py) * 8;
                    const dstRow = (destY + py) * w + destX;
                    for (let px = 0; px < 8; px++) {
                        const pen = src[srcRow + (flipx ? 7 - px : px)];
                        frame[dstRow + px] = charColor[colorBase + pen]; // opaque, pen 0 included
                    }
                }
            }
        }
    }
    /**
     * Port of draw_sprites (rocnrope.cpp:178-191):
     *   for offs = 0x2e down to 0 step 2 (24 sprites; lower offsets on top):
     *     code   = spriteram0[offs + 1]
     *     color  = spriteram1[offs] & 0x0f
     *     flip_x = spriteram1[offs] & 0x40
     *     flip_y = ~spriteram1[offs] & 0x80    (bit 7 CLEAR = flipped!)
     *     sx     = 240 - spriteram0[offs]
     *     sy     = spriteram1[offs + 1]        (full-bitmap coords, y 16..239 visible)
     *   transmask = transpen_mask(gfx(0), color, 0): a PIXEL is transparent when
     *   its LUT entry maps to indirect color 0 (see spriteTransparent), not when
     *   the raw pen is 0.
     * Screen flip is NOT applied to sprites (draw_sprites never reads
     * flip_screen(); the game flips them in software), same as video/gyruss.ts.
     */
    drawSprites(frame) {
        const sr0 = this.spriteram0;
        const sr1 = this.spriteram1;
        const gfx = this.spriteGfx;
        const src = gfx.pixels;
        const spriteColor = this.pal.spriteColor;
        const spriteTransparent = this.pal.spriteTransparent;
        const w = this.width;
        const h = this.height;
        for (let offs = 0x2e; offs >= 0; offs -= 2) {
            const attr = sr1[offs];
            const colorBase = (attr & 0x0f) * 16;
            const code = sr0[offs + 1] % gfx.count;
            const flipx = (attr & 0x40) !== 0;
            const flipy = (attr & 0x80) === 0; // inverted sense
            const sx = 240 - sr0[offs];
            const sy = sr1[offs + 1] - VBEND;
            const base = code * 256; // 16x16 pixels per element
            for (let py = 0; py < 16; py++) {
                const dy = sy + py;
                if (dy < 0 || dy >= h)
                    continue;
                const srcRow = base + (flipy ? 15 - py : py) * 16;
                const dstRow = dy * w;
                for (let px = 0; px < 16; px++) {
                    const dx = sx + px;
                    if (dx < 0 || dx >= w)
                        continue;
                    const pen = src[srcRow + (flipx ? 15 - px : px)];
                    if (spriteTransparent[colorBase + pen])
                        continue; // LUT == 0, not pen == 0
                    frame[dstRow + dx] = spriteColor[colorBase + pen];
                }
            }
        }
    }
}
