import assert from 'node:assert/strict';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { executeGeneratedProgram } from './generated-handler.ts';
import type { BoardIr } from '../ir/board.ts';
import {
  createGeneratedTileInfoTarget,
  decodeTaitoSjRamPixel,
  decodeVicDualPixel,
  exidySpriteCollisionMask,
  exidySpriteCollisions,
  generatedDirectScreenShape,
  generatedScrollBand,
  generatedTileGroupIndirectMask,
  generatedTileGroupTransparentMask,
  generatedTileCategoryMatches,
  generatedTileMemoryIndex,
  GeneratedMameVideoPrimitives,
  GeneratedVideoRenderer,
  taitoSjLayerScrollX,
  taitoSjSpritePosition,
  williamsPaletteColor,
  type GeneratedVideoPrimitives,
} from './generated-video.ts';

assert.equal(generatedTileCategoryMatches(1, 0), false);
assert.equal(generatedTileCategoryMatches(1, 1), true);
assert.equal(
  generatedTileCategoryMatches(1, 0x200),
  true,
  'TILEMAP_DRAW_ALL_CATEGORIES must repaint category-one tiles in opaque passes',
);

const taitoSjRam = new Uint8Array(0x3000);
// charlayout plane 0 at bit 32768 is the high pen bit; x offset 7 selects
// the byte's least-significant mask under MAME's MSB-first bit numbering.
taitoSjRam[4096] = 0x01;
assert.equal(decodeTaitoSjRamPixel(taitoSjRam, 0, 0, 0, 0, false), 4);
taitoSjRam[4096] = 0;
taitoSjRam[2048] = 0x01;
assert.equal(decodeTaitoSjRamPixel(taitoSjRam, 0, 0, 0, 0, false), 2);
taitoSjRam[2048] = 0;
taitoSjRam[0] = 0x01;
assert.equal(decodeTaitoSjRamPixel(taitoSjRam, 0, 0, 0, 0, false), 1);

assert.deepEqual(
  [0, 1, 2].map(layer => taitoSjLayerScrollX(0x25, layer, false)),
  [-24, -16, -16],
  'Taito SJ unflipped layers retain their hardware pixel skew',
);
assert.deepEqual(
  [0, 1, 2].map(layer => taitoSjLayerScrollX(0x25, layer, true)),
  [40, 48, 48],
  'Taito SJ flipped layers retain their hardware pixel skew',
);
assert.deepEqual(taitoSjSpritePosition(0, 0), { x: 255, y: 240, visible: false });
assert.deepEqual(taitoSjSpritePosition(1, 241), { x: 0, y: 255, visible: false });
assert.deepEqual(taitoSjSpritePosition(17, 16), { x: 16, y: 224, visible: true });

assert.equal(decodeVicDualPixel(0x80, 0xa2, 0), 0xff00ffff);
assert.equal(decodeVicDualPixel(0x80, 0xa2, 1), 0xff00ff00);
const exidyPixels = new Uint8Array(3 * 2 * 2);
exidyPixels[0] = 1;
exidyPixels[4] = 1;
assert.equal(exidySpriteCollisionMask(
  { count: 3, width: 2, height: 2, pixels: exidyPixels },
  (x, y) => Number(x === 4 && y === 5),
  { code: 0, x: 4, y: 5 },
  { code: 1, x: 4, y: 5 },
), 0x1c);
assert.deepEqual(exidySpriteCollisions(
  { count: 3, width: 2, height: 2, pixels: exidyPixels },
  (x, y) => Number(x === 4 && y === 5),
  { code: 0, x: 4, y: 5 },
  { code: 1, x: 4, y: 5 },
), [
  { position: 4, mask: 0x14 },
  { position: 4, mask: 0x08 },
]);
assert.equal(williamsPaletteColor(0), 0xff000000);
assert.equal(williamsPaletteColor(0xff), 0xffffffff);

assert.equal(
  generatedDirectScreenShape({
    execution: { screenUpdate: { handler: 'exidy_state.screen_update' } },
    handlers: [{
      ownerClass: 'exidy_state',
      method: 'screen_update',
      body: `set_colors(); draw_background();
        copybitmap(bitmap, m_background_bitmap, 0, 0, 0, 0, cliprect);
        draw_sprites(bitmap, cliprect);`,
    }, {
      ownerClass: 'exidy_state',
      method: 'draw_background',
      body: `const uint8_t *const cram = m_characterram;
        m_background_bitmap.pix(y, x) = 0;`,
    }, {
      ownerClass: 'exidy_state',
      method: 'draw_sprites',
      body: `int sx = 236 - *m_sprite2_xpos - 4;
        m_gfxdecode->gfx(0)->transpen(bitmap, cliprect, 0, 0, 0, 0, sx, 0, 0);`,
    }],
  } as unknown as BoardIr),
  'exidy-character-ram',
);

assert.equal(
  generatedDirectScreenShape({
    execution: { screenUpdate: { handler: 'berzerk_state.screen_update' } },
    handlers: [{
      ownerClass: 'berzerk_state',
      method: 'screen_update',
      body: `
        for (int offs = 0; offs < m_videoram.bytes(); offs++) {
          uint8_t color = m_colorram[((offs >> 2) & 0x07e0) | (offs & 0x001f)];
          rgb_t pen = (data & 0x80) ? pens[color >> 4] : rgb_t::black();
          rgb_t pen = (data & 0x80) ? pens[color & 0x0f] : rgb_t::black();
        }
      `,
    }],
  } as unknown as BoardIr),
  'berzerk-color-bitmap',
);

assert.equal(
  generatedDirectScreenShape({
    execution: { screenUpdate: { handler: 'vicdual_state.screen_update_color' } },
    handlers: [{
      ownerClass: 'vicdual_state',
      method: 'screen_update_color',
      body: `
        color_prom = m_proms->base();
        char_code = m_videoram[offs];
        video_data = m_characterram[offs];
        offs = (char_code >> 5) | (m_palette_bank << 3);
        back_pen = color_prom[offs];
        pen = (video_data & 0x80) ? fore_pen : back_pen;
      `,
    }],
  } as unknown as BoardIr),
  'vicdual-character-ram',
);

assert.equal(
  generatedDirectScreenShape({
    execution: { screenUpdate: { handler: 'fixture.screen_update' } },
    handlers: [{
      ownerClass: 'fixture',
      method: 'screen_update',
      body: `
        bitmap.fill(255, cliprect);
        for (offs = 0; offs < m_objectram.bytes(); offs += 4) {
          prom_line = prom + 0x80 + ((gfx_num & 0xe0) >> 1);
          code = m_videoram[goffs + 1];
          m_gfxdecode->gfx(0)->transpen(bitmap,cliprect, code, color, 0, 0, 0, 0, 15);
          sx += 16;
        }
      `,
    }],
  } as unknown as BoardIr),
  'bublbobl-object-columns',
);

assert.deepEqual(
  Array.from({ length: 32 }, (_, row) => generatedScrollBand(row, 32, 4)),
  [
    0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3,
  ],
);

const calls: string[] = [];
const primitives: GeneratedVideoPrimitives = {
  width: 2,
  height: 2,
  vblank: () => calls.push('vblank'),
  render: () => {
    throw new Error('handwritten composition must not run');
  },
  generatedVideoBindings: () => ({
    calls: {
      'm_bg_tilemap.draw': () => calls.push('background'),
      draw_sprites: () => calls.push('sprites'),
      'm_fg_tilemap.draw': () => calls.push('foreground'),
    },
    referenceCalls: {
      rectangle: () => ({ min_x: 0, max_x: 0, min_y: 0, max_y: 0 }),
    },
  }),
};
const body = `
  bitmap.fill(0xff010203, cliprect);
  rectangle band;
  band.min_x = 2;
  band.max_x = 2;
  band.min_y = 3;
  band.max_y = 3;
  bitmap.fill(0xff070809, band);
  bitmap.pix(2, 1) = 0xff040506;
  m_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
  draw_sprites(bitmap, cliprect);
  m_fg_tilemap->draw(screen, bitmap, cliprect, 0, 0);
  return 0;
`;
const machine: BoardIr = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  connections: [],
  game: 'fixture',
  family: 'fixture',
  driverFile: 'fixture.cpp',
  callbacks: [{
    id: 'callback:screen',
    ownerTag: 'screen',
    signal: 'set_screen_update',
    operation: 'set_screen_update',
    targetClass: 'fixture_state',
    targetMethod: 'screen_update',
  }],
  handlers: [{
    id: 'handler:screen',
    ownerClass: 'fixture_state',
    method: 'screen_update',
    body,
    program: compileMameHandler(body),
  }],
  execution: {
    cpus: [],
    screen: {
      width: 2,
      height: 2,
      xOffset: 1,
      yOffset: 2,
      refresh: 60,
      vtotal: 2,
      vbstart: 1,
      rotate: 0,
    },
    frameEvents: [],
    screenUpdate: { handler: 'fixture_state.screen_update' },
  },
};

const renderer = new GeneratedVideoRenderer(machine, primitives);
const frame = new Uint32Array(4);
renderer.vblank();
renderer.render(frame);
if (calls.join(',') !== 'vblank,background,sprites,foreground') {
  throw new Error(`generated composition order mismatch: ${calls.join(',')}`);
}
if (
  frame[0] !== 0xff040506 ||
  frame[1] !== 0xff010203 ||
  frame[2] !== 0xff010203 ||
  frame[3] !== 0xff070809
) {
  throw new Error(`generated visible-area translation is wrong: ${[...frame]}`);
}
const partialStarts: number[] = [];
const partialMachine: BoardIr = {
  ...machine,
  callbacks: [{
    ...machine.callbacks[0]!,
    targetMethod: 'screen_update_partial',
  }],
  handlers: [{
    id: 'handler:screen_partial',
    ownerClass: 'fixture_state',
    method: 'screen_update_partial',
    program: compileMameHandler(`
      if (cliprect.min_y == screen.visible_area().min_y)
        frame_start();
      return 0;
    `),
  }],
  execution: {
    ...machine.execution,
    screen: { ...machine.execution.screen, updateMode: 'partial' },
    screenUpdate: { handler: 'fixture_state.screen_update_partial' },
  },
};
const partialRenderer = new GeneratedVideoRenderer(partialMachine, {
  width: 2,
  height: 2,
  vblank: () => {},
  render: () => {},
  generatedVideoBindings: () => ({
    calls: { frame_start: () => partialStarts.push(1) },
  }),
});
const partialFrame = new Uint32Array(4);
partialRenderer.updatePartial(partialFrame, 2);
partialRenderer.updatePartial(partialFrame, 3);
partialRenderer.render(partialFrame);
assert.equal(partialStarts.length, 1, 'partial clips must retain the full MAME visible area');
const cachedTile = { gfx: 0, code: 0, color: 0, flags: 0, category: 0, group: 0 };
const tileinfo = createGeneratedTileInfoTarget(cachedTile);
tileinfo.category = 1;
tileinfo.group = 7;
tileinfo.set(2, 3, 4, 5);
if (cachedTile.category !== 1) throw new Error('tile category did not reach the render cache');
if (cachedTile.group !== 7) throw new Error('tile group did not reach the render cache');
if (cachedTile.gfx !== 2 || cachedTile.code !== 3 || cachedTile.color !== 4 || cachedTile.flags !== 5) {
  throw new Error('tileinfo.set did not reach the render cache');
}
if (generatedTileMemoryIndex(1012) !== 1012) {
  throw new Error('custom mapper memory index was folded into the logical tile count');
}
const splitPlan = {
  member: 'm_bg_tilemap',
  tileWidth: 8,
  tileHeight: 8,
  columns: 1,
  rows: 1,
  mapper: 'TILEMAP_SCAN_ROWS',
  tileInfo: 'fixture_state.tile_info',
  transmasks: [
    { group: 0, foreground: 0, background: 0 },
    { group: 1, foreground: 0x0f, background: 0 },
  ],
};
assert.equal(generatedTileGroupTransparentMask(splitPlan, 1, 0), 0x0f);
assert.equal(generatedTileGroupTransparentMask(splitPlan, 1, 0x10), 0x0f);
assert.equal(generatedTileGroupTransparentMask(splitPlan, 1, 0x20), 0);
assert.equal(generatedTileGroupTransparentMask(splitPlan, 1, 0x30), 0x0f);
assert.equal(generatedTileGroupTransparentMask(splitPlan, 2, 0), undefined);
let configuredGroupColor = -1;
assert.equal(
  generatedTileGroupIndirectMask({
    indirectMask: (color, transparent) => {
      configuredGroupColor = color;
      return (color << 8) | transparent;
    },
  }, 7, 3),
  0x703,
);
assert.equal(
  configuredGroupColor,
  7,
  'configure_groups transparency must use tile group, not a palette-bank color',
);
const screenState: Record<string, unknown> = {};
const videoRegion = Uint8Array.of(0x12, 0x34);
const generatedPrimitives = new GeneratedMameVideoPrimitives(
  machine,
  { gfx4: videoRegion },
  screenState,
  { calls: { 'm_screen.vpos': () => 37 } },
);
const romRead = compileMameHandler(`
  uint8_t *rom = memregion("gfx4")->base();
  return rom[1];
`);
const romReadResult = executeGeneratedProgram(
  romRead,
  generatedPrimitives.generatedVideoBindings(new Uint32Array(4)),
);
if (romReadResult.value !== 0x34) {
  throw new Error(`generated memregion binding returned ${String(romReadResult.value)}`);
}
const generatedScreen = screenState.m_screen as {
  __frame: number;
  frame_number(): number;
  vpos(): number;
  update_partial(line: number): void;
};
if (generatedScreen.vpos() !== 37) {
  throw new Error('generated screen shadowed the board scanline binding');
}
generatedScreen.update_partial(37);
let partialLine = -1;
const partialPrimitives = new GeneratedMameVideoPrimitives(
  machine,
  {},
  {},
  {},
  line => { partialLine = line; },
);
executeGeneratedProgram(
  compileMameHandler('m_screen->update_partial(19);'),
  partialPrimitives.generatedVideoBindings(new Uint32Array(4)),
);
assert.equal(partialLine, 19, 'generated screen must forward partial raster updates');
generatedPrimitives.vblank();
if (generatedScreen.frame_number() !== 1) {
  throw new Error('generated screen frame counter did not advance at vblank');
}

const tileMachine: BoardIr = {
  ...machine,
  handlers: [
    ...machine.handlers!,
    {
      id: 'handler:tile_info',
      ownerClass: 'fixture_state',
      method: 'tile_info',
      program: compileMameHandler('tileinfo.set(0, 0, 0, 0);'),
    },
  ],
  video: {
    initialState: {},
    gfx: [],
    tilemaps: [{
      member: 'm_bg_tilemap',
      tileWidth: 8,
      tileHeight: 8,
      columns: 1,
      rows: 1,
      mapper: 'TILEMAP_SCAN_ROWS',
      tileInfo: 'fixture_state.tile_info',
    }],
  },
};
const tileState: Record<string, unknown> = {};
const tilePrimitives = new GeneratedMameVideoPrimitives(tileMachine, {}, tileState, {});
const tilemap = tileState.m_bg_tilemap as {
  tiles: unknown[];
  dirty: number[];
};
tilemap.tiles.push(cachedTile);
tilemap.dirty.push(0);
executeGeneratedProgram(
  compileMameHandler('m_bg_tilemap->mark_all_dirty();'),
  tilePrimitives.generatedVideoBindings(new Uint32Array(4)),
);
if (tilemap.tiles.length !== 0 || tilemap.dirty.length !== 0) {
  throw new Error('mark_all_dirty did not invalidate generated tile cache');
}

// A scrolled tilemap must repaint the whole visible area. Ghosts'n Goblins
// scrolls a single-band 32x32 map of 16px tiles: at scrollx 140 a tile range
// derived from the clip alone paints x -140..115 and leaves 116..255 holding
// the previous frame's pens, which shows up as a torn vertical band.
{
  const scrollMachine: BoardIr = {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    connections: [],
    game: 'scroll',
    family: 'scroll',
    driverFile: 'src/mame/fixture/scroll.cpp',
    execution: {
      cpus: [],
      screen: {
        width: 256, height: 224, xOffset: 0, yOffset: 0,
        refresh: 60, vtotal: 262, vbstart: 240, rotate: 0,
      },
      frameEvents: [],
      screenUpdate: { handler: 'fixture_state.screen_update' },
    },
    callbacks: [{
      id: 'screen-update',
      ownerTag: 'screen',
      signal: 'set_screen_update',
      operation: 'set',
      targetClass: 'fixture_state',
      targetMethod: 'screen_update',
    }],
    handlers: [
      {
        id: 'handler:fixture_state.screen_update',
        ownerClass: 'fixture_state',
        method: 'screen_update',
        parameters: 'screen_device &screen, bitmap_rgb32 &bitmap, const rectangle &cliprect',
        program: compileMameHandler(
          'm_bg_tilemap->draw(screen, bitmap, cliprect, 0, 0); return 0;',
        ),
      },
      {
        id: 'handler:fixture_state.tile_info',
        ownerClass: 'fixture_state',
        method: 'tile_info',
        parameters: '',
        // Every tile is gfx 0, code 0, colour 0 — an opaque fill.
        program: compileMameHandler('tileinfo.set(0, 0, 0, 0);'),
      },
    ],
    video: {
      gfx: [{
        region: 'tiles', offset: 0, colorBase: 0, colorCount: 1, xscale: 1, yscale: 1,
        layout: {
          width: 16, height: 16, total: 1, planes: 1,
          planeOffsets: [0], charIncrement: 256,
          xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
          yOffsets: [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240],
        },
      }],
      tilemaps: [{
        member: 'm_bg_tilemap',
        tileWidth: 16, tileHeight: 16, columns: 32, rows: 32,
        mapper: 'TILEMAP_SCAN_ROWS',
        tileInfo: 'fixture_state.tile_info',
      }],
      ramPalette: {
        tag: 'palette',
        entries: 2,
        bytesPerEntry: 1,
        channels: [
          { channel: 'r', bits: 4, shift: 4 },
          { channel: 'g', bits: 4, shift: 4 },
          { channel: 'b', bits: 4, shift: 4 },
        ],
      },
      initialState: {},
    },
  };
  const regions = { tiles: new Uint8Array(32) };
  const scrollState: Record<string, unknown> = {};
  const primitives = new GeneratedMameVideoPrimitives(scrollMachine, regions, scrollState, {});
  const renderer = new GeneratedVideoRenderer(scrollMachine, primitives);
  const map = scrollState.m_bg_tilemap as { set_scrollx(row: number, value: number): void };

  const frame = new Uint32Array(256 * 224);
  frame.fill(0xdeadbeef);
  map.set_scrollx(0, 140);
  renderer.render(frame);
  const stale = [...frame].filter(pixel => pixel === 0xdeadbeef).length;
  assert.equal(stale, 0,
    'a scrolled opaque tilemap must repaint every visible pixel, not just the clip-derived tiles');
}

// machine_reset palette writes must be replayed both at construction and after
// the generated board resets, including split palette_device ext RAM.
{
  const resetMachine: BoardIr = {
    ...machine,
    video: {
      gfx: [],
      tilemaps: [],
      initialState: {},
      ramPalette: {
        tag: 'palette',
        extShare: 'palette_ext',
        entries: 2,
        bytesPerEntry: 2,
        channels: [
          { channel: 'r', bits: 4, shift: 12 },
          { channel: 'g', bits: 4, shift: 8 },
          { channel: 'b', bits: 4, shift: 4 },
        ],
        resetWrites: [
          { offset: 0, data: 0xf0 },
          { offset: 0, data: 0xff, ext: true },
        ],
        initialColors: [{ pen: 1, color: 0xff332211 }],
      },
    },
  };
  const resetState: Record<string, unknown> = {};
  const resetPrimitives = new GeneratedMameVideoPrimitives(
    resetMachine,
    {},
    resetState,
    {},
  );
  const resetPalette = resetState.m_palette as { colors: Uint32Array };
  assert.equal(resetPalette.colors[0], 0xffffffff);
  assert.equal(resetPalette.colors[1], 0xff332211);
  resetPrimitives.writePaletteRam(0, 0);
  resetPrimitives.writePaletteRam(0, 0, true);
  assert.equal(resetPalette.colors[0], 0xff000000);
  resetPrimitives.reset();
  assert.equal(resetPalette.colors[0], 0xffffffff);
  assert.equal(resetPalette.colors[1], 0xff332211);
}

// Multi-byte palette RAM follows palette_device::set_endianness. Bubble Bobble
// writes RGBx_444 as high byte then low byte; byte-swapping it yields the
// characteristic blue/magenta-only corruption this guards against.
{
  const bigEndianMachine: BoardIr = {
    ...machine,
    video: {
      gfx: [],
      tilemaps: [],
      initialState: {},
      ramPalette: {
        tag: 'palette',
        endianness: 'big',
        entries: 1,
        bytesPerEntry: 2,
        channels: [
          { channel: 'r', bits: 4, shift: 12 },
          { channel: 'g', bits: 4, shift: 8 },
          { channel: 'b', bits: 4, shift: 4 },
        ],
      },
    },
  };
  const state: Record<string, unknown> = {};
  const primitives = new GeneratedMameVideoPrimitives(bigEndianMachine, {}, state, {});
  const palette = state.m_palette as { colors: Uint32Array };
  primitives.writePaletteRam(0, 0xa3);
  primitives.writePaletteRam(1, 0x70);
  // Canvas pixels are stored as little-endian ABGR words.
  assert.equal(palette.colors[0], 0xff7733aa);
}

// Packed-framebuffer machines such as Juno First still receive their palette
// bytes through palette_device::write8; those writes must update the bitmap
// palette rather than only the tile/sprite RAM-palette implementation.
{
  const bitmapMachine: BoardIr = {
    ...machine,
    video: {
      gfx: [],
      tilemaps: [],
      initialState: {},
      bitmap: {
        member: 'm_videoram',
        rowStart: 0,
        rows: 1,
        bytesPerRow: 1,
        xOffset: 0,
        lsbFirst: true,
        bitsPerPixel: 4,
        black: 0xff000000,
        white: 0xffffffff,
        paletteRam: {
          member: 'm_palette',
          entries: 1,
          min: 0,
          max: 255,
          scaler: 1,
          channels: [
            { channel: 'r', bits: [0], resistances: [1], pulldown: 0, pullup: 0 },
            { channel: 'g', bits: [1], resistances: [1], pulldown: 0, pullup: 0 },
            { channel: 'b', bits: [2], resistances: [1], pulldown: 0, pullup: 0 },
          ],
        },
      },
    },
  };
  const state: Record<string, unknown> = {};
  const primitives = new GeneratedMameVideoPrimitives(bitmapMachine, {}, state, {});
  const palette = state.m_palette as { colors: Uint32Array };
  assert.equal(palette.colors[0], 0xff000000);
  primitives.writePaletteRam(0, 0x07);
  assert.equal(palette.colors[0], 0xffffffff);
  primitives.reset();
  assert.equal(palette.colors[0], 0xff000000);
}

console.log('generated-video.spec: 23 passed');
