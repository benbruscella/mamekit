import assert from 'node:assert/strict';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { executeGeneratedProgram } from './generated-handler.ts';
import type { BoardIr } from '../ir/board.ts';
import {
  createGeneratedTileInfoTarget,
  generatedScrollBand,
  generatedTileGroupIndirectMask,
  generatedTileGroupTransparentMask,
  generatedTileCategoryMatches,
  generatedTileMemoryIndex,
  GeneratedGfxElement,
  GeneratedMameVideoPrimitives,
  GeneratedPaletteShadows,
  GeneratedVideoRenderer,
  type GeneratedVideoPrimitives,
} from './generated-video.ts';

const sourceGfx = new GeneratedGfxElement({
  region: 'fixture',
  offset: 0,
  colorBase: 0x300,
  colorCount: 4,
  layout: {
    width: 2,
    height: 2,
    total: 2,
    planes: 2,
    planeOffsets: [0, 1],
    xOffsets: [0, 1],
    yOffsets: [0, 2],
    charIncrement: 4,
  },
  xscale: 1,
  yscale: 1,
}, {
  count: 2,
  width: 2,
  height: 2,
  pixels: Uint8Array.of(0, 1, 2, 3, 3, 2, 1, 0),
}, {
  colors: new Uint32Array(0),
  transpen_mask: () => 0,
  black_pen: () => 0,
  pens: () => new Uint32Array(0),
}, true);
assert.equal(sourceGfx.elements(), 2);
assert.equal(sourceGfx.rowbytes(), 2);
assert.equal(sourceGfx.granularity(), 4);
assert.deepEqual([...sourceGfx.get_data(1)], [3, 2, 1, 0]);

assert.equal(generatedTileCategoryMatches(1, 0), false);
assert.equal(generatedTileCategoryMatches(1, 1), true);
assert.equal(
  generatedTileCategoryMatches(1, 0x200),
  true,
  'TILEMAP_DRAW_ALL_CATEGORIES must repaint category-one tiles in opaque passes',
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

// The board materialises declared C++ scalars as zero before constructing the
// video host.  Source-derived video_start values must replace that storage
// default (M72 uses 1/2 to choose its foreground/background gfx regions).
{
  const initializedState: Record<string, unknown> = { m_gfx_source: 0 };
  new GeneratedMameVideoPrimitives({
    ...machine,
    video: {
      gfx: [],
      tilemaps: [],
      initialState: { m_gfx_source: 2 },
    },
  }, {}, initializedState, {});
  assert.equal(
    initializedState.m_gfx_source,
    2,
    'compiled video initialization must override materialized zero storage',
  );
}

// Universal's Lady Bug hardware inverts each PROM output before its RGB
// resistor network. A zero PROM byte must therefore produce the bright color,
// while an all-one byte produces black.
{
  const paletteMachine: BoardIr = {
    ...machine,
    video: {
      gfx: [],
      tilemaps: [],
      initialState: {},
      palette: {
        region: 'proms',
        colorCount: 2,
        min: 0,
        max: 255,
        scaler: -1,
        channels: (['r', 'g', 'b'] as const).map(channel => ({
          channel,
          bits: [0, 1],
          inverted: [true, true],
          resistances: [470, 220],
          pulldown: 470,
          pullup: 0,
        })),
        lookupOffset: 0,
        lookupCount: 2,
        lookupMask: 0xff,
        banks: [{
          penOffset: 0,
          colorOr: 0,
          lookupOffset: 0,
          lookupCount: 2,
          direct: true,
        }],
        transparentIndirect: 0,
      },
    },
  };
  const paletteState: Record<string, unknown> = {};
  new GeneratedMameVideoPrimitives(
    paletteMachine,
    { proms: Uint8Array.of(0x00, 0xff) },
    paletteState,
    {},
  );
  const palette = paletteState.m_palette as { colors: Uint32Array };
  assert.equal(palette.colors[0], 0xffffffff);
  assert.equal(palette.colors[1], 0xff000000);
}

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
assert.equal(generatedScreen.frame_number(), 0, 'MAME counts a screen frame at vblank end, not its start');
generatedPrimitives.vblankEnd?.();
if (generatedScreen.frame_number() !== 1) {
  throw new Error('generated screen frame counter did not advance at vblank end');
}

const tileMachine: BoardIr = {
  ...machine,
  handlers: [
    ...machine.handlers!,
    {
      id: 'handler:tile_info',
      ownerClass: 'fixture_video_device',
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
      tileInfo: 'fixture_video_device.tile_info',
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

let deviceTileInfoCalls = 0;
const deviceTileState: Record<string, unknown> = {};
const deviceTilePrimitives = new GeneratedMameVideoPrimitives(
  tileMachine,
  {},
  deviceTileState,
  {
    referenceCalls: {
      'fixture_video_device.tile_info': (_tilemap, tileinfo, tileIndex) => {
        deviceTileInfoCalls++;
        (tileinfo as { set(...args: number[]): void }).set(0, Number(tileIndex) + 7, 3, 0);
      },
    },
  },
);
const deviceTilemap = deviceTileState.m_bg_tilemap as {
  tiles: { code: number; color: number }[];
  draw(screen: unknown, bitmap: unknown, clip: unknown, flags: number): void;
};
deviceTilemap.draw({}, {}, { min_x: 0, max_x: 7, min_y: 0, max_y: 7 }, 0);
assert.equal(deviceTileInfoCalls, 1);
assert.deepEqual(
  { code: deviceTilemap.tiles[0]?.code, color: deviceTilemap.tiles[0]?.color },
  { code: 7, color: 3 },
  'device-owned tile callbacks must read the device instance rather than driver state',
);

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

// Split palette RAM is two independent memory_array instances. Endianness is
// applied within each share; extmem remains the high half of the raw entry.
// GNG uses one byte in each half on an MC6809 bus.
{
  const splitBigEndianMachine: BoardIr = {
    ...machine,
    video: {
      gfx: [],
      tilemaps: [],
      initialState: {},
      ramPalette: {
        tag: 'palette',
        extShare: 'palette_ext',
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
  const primitives = new GeneratedMameVideoPrimitives(splitBigEndianMachine, {}, state, {});
  const palette = state.m_palette as { colors: Uint32Array };
  primitives.writePaletteRam(0, 0x70);
  primitives.writePaletteRam(0, 0xa3, true);
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

// MCR sprite priority. MAME draws sprite RAM from the end backwards, so the
// first sprite to reach a pixel keeps it, and a second invisible pass claims
// each sprite's "under tile" pen 8 to cut the sprites behind it away there.
{
  const priorityMachine: BoardIr = {
    ...machine,
    execution: {
      ...machine.execution,
      screen: { ...machine.execution.screen, width: 4, height: 4, xOffset: 0, yOffset: 0 },
    },
  };
  const priority = new GeneratedMameVideoPrimitives(priorityMachine, {}, {}, {}).screenPriority();
  // Pen 0 is the sprite background, pen 8 the under-tile mask, pen 1 visible.
  const spriteGfx = new GeneratedGfxElement({
    region: 'fixture',
    offset: 0,
    colorBase: 0,
    colorCount: 1,
    layout: {
      width: 2, height: 1, total: 1, planes: 4,
      planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4], yOffsets: [0],
      charIncrement: 8,
    },
    xscale: 1,
    yscale: 1,
  }, {
    count: 1, width: 2, height: 1,
    pixels: Uint8Array.of(1, 8),
  }, {
    colors: new Uint32Array(0),
    transpen_mask: () => 0,
    black_pen: () => 0,
    pens: () => new Uint32Array(0),
  }, true);
  const painted = new Map<string, number>();
  const bitmap = {
    fill: () => {},
    'pix=': (y: number, x: number, color: number) => { painted.set(`${x},${y}`, color); },
  };
  const clip = { min_x: 0, max_x: 3, min_y: 0, max_y: 3, contains: () => 1, intersect: () => {} };
  const draw = (color: number, sx: number) => {
    spriteGfx.prio_transmask(bitmap, clip as never, 0, color, 0, 0, sx, 0, priority, 0x00, 0x0101);
    spriteGfx.prio_transmask(bitmap, clip as never, 0, color, 0, 0, sx, 0, priority, 0x02, 0xfeff);
  };
  priority.fill(1);
  draw(1, 0);
  assert.equal(painted.get('0,0'), 16 + 1, 'the visible pen is painted');
  assert.equal(painted.has('1,0'), false, 'the under-tile pen is never painted');
  // A second sprite overlapping both pixels must lose to the first one at the
  // visible pixel and be cut away at the pen-8 mask.
  draw(2, 0);
  assert.equal(painted.get('0,0'), 16 + 1, 'a later sprite cannot repaint a claimed pixel');
  assert.equal(painted.has('1,0'), false, 'pen 8 masks the sprites drawn behind it');
  // Unclaimed pixels stay available.
  draw(3, 2);
  assert.equal(painted.get('2,0'), 3 * 16 + 1, 'an unclaimed pixel still takes the later sprite');
}

// dipalette.cpp's indexed shadow and highlight groups, after 2048 base colours.
{
  const shadows = new GeneratedPaletteShadows({ entries: 2048, shadows: true, highlights: true });
  const colors = new Uint32Array(2048);
  colors[5] = 0xff64c8ff; // r 255, g 200, b 100 (ABGR)

  // Preset 0 (and 2) is the shadow table, 1 (and 3) the highlight table, and a
  // pen past the base colours maps to itself.
  assert.equal(shadows.shadow_table()![5], 5 + 2048);
  assert.equal(shadows.shadow_table()![3000], 3000);
  shadows.set_shadow_mode(1);
  assert.equal(shadows.shadow_table()![5], 5 + 4096);
  shadows.set_shadow_mode(0);

  // PALETTE_DEFAULT_SHADOW_FACTOR 0.6f and its reciprocal, truncated in float as
  // adjust_palette_entry does: 255 * 0.6f is 153, 200 * (1 / 0.6f) clamps.
  assert.equal(shadows.resolve(colors, 5 + 2048), 0xff3c7899);
  assert.equal(shadows.resolve(colors, 5 + 4096), 0xffa6ffff);
  // A driver's own factor (TMNT's set_shadow_factor(0.75)).
  shadows.set_shadow_factor(0.75);
  assert.equal(shadows.resolve(colors, 5 + 2048), 0xff4b96bf);
  // palette_t keeps black, then white, after the last group.
  assert.equal(shadows.resolve(colors, 2048 * 3), 0xff000000);
  assert.equal(shadows.resolve(colors, 2048 * 3 + 1), 0xffffffff);

  // PIXEL_OP_REBASE_TRANSTABLE16: a source pen paints `color + pen`, and a
  // shadow pen sends what the destination holds through the shadow table.
  const palette = {
    colors,
    shadows,
    transpen_mask: () => 0,
    black_pen: () => 0,
    pens: () => colors,
  };
  const element = new GeneratedGfxElement(
    {
      region: '', offset: 0, colorBase: 0, colorCount: 128, xscale: 1, yscale: 1,
      layout: { width: 2, height: 1, total: 1, planes: 4, planeOffsets: [0, 1, 2, 3], xOffsets: [0, 4], yOffsets: [0], charIncrement: 8 },
    },
    { count: 1, width: 2, height: 1, pixels: Uint8Array.from([1, 15]) },
    palette,
    true,
  );
  const pixels = [7, 9];
  const bitmap = {
    pix: (_y: number, x = 0) => pixels[x]!,
    'pix=': (_y: number, x: number, value: number) => { pixels[x] = value; },
    fill: () => {},
  };
  const drawModes = new Uint8Array(16).fill(1);
  drawModes[0] = 0;
  drawModes[15] = 2;
  element.transtable(bitmap, { min_x: 0, max_x: 1, min_y: 0, max_y: 0 } as never, 0, 3, 0, 0, 0, 0, drawModes);
  assert.deepEqual(pixels, [3 * 16 + 1, 9 + 2048]);
}

console.log('generated-video.spec: 25 passed');
