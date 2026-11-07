import assert from 'node:assert/strict';
import { generatedDeviceMethodsSource } from '../../mame/device-codegen.ts';
import { indexMameHardware } from '../../mame/hardware.ts';
import { compileMameDevice } from '../../mame/device-compiler.ts';

const mameSource = process.env.MAME_SRC ?? '../mame';
// K053246 is MAME's board-construction alias for the K053247 device type.
const definition = indexMameHardware(mameSource).get('K053247');
assert.ok(definition, 'MAME hardware index should resolve the K053247 device');

// Compiled as any other device (#237): no fork edits its source.
const device = compileMameDevice(mameSource, definition, 'K053246');
const names = device.methods.map(method => method.name);
// The bitmap-class overloads each keep their own body, and the plain name
// picks one by the bitmap's bpp().
assert.equal(names.filter(name => name === 'k053247_sprites_draw').length, 1);
assert.ok(names.includes('k053247_sprites_draw__bitmap_ind16__rectangle'));
assert.ok(names.includes('k053247_sprites_draw__bitmap_rgb32__rectangle'));
assert.equal(names.filter(name => name === 'zdrawgfxzoom32GP').length, 1);
// The template's pixel size is the bitmap's, and the sprite ROM is decoded by
// konami_helper.cpp's own konami_decode_gfx, which joins the device.
const common = JSON.stringify(device.methods.find(method => method.name === 'k053247_sprites_draw_common')?.program);
assert.ok(common.includes('"bpp"') && !common.includes('auto::pixel_t'));
assert.ok(names.includes('konami_decode_gfx'), 'konami_decode_gfx must compile with the device');
assert.ok(device.structs?.gfx_layout, 'digfx.h gfx_layout must give the static layout its fields');

const emitted = generatedDeviceMethodsSource(device);
assert.ok(
  emitted.methods.includes('k053247_sprites_draw'),
  'the K053246 public sprite renderer must have a direct executable implementation',
);
assert.deepEqual(
  {
    none: device.constants.DRAWMODE_NONE,
    source: device.constants.DRAWMODE_SOURCE,
    shadow: device.constants.DRAWMODE_SHADOW,
  },
  { none: 0, source: 1, shadow: 2 },
  'draw-mode constants from the renderer source ABI must be available to generated code',
);

console.log('device extract spec: K053246 compiles whole, its overloads dispatched by bitmap');

const k051960Definition = indexMameHardware(mameSource).get('K051960');
assert.ok(k051960Definition, 'MAME hardware index should resolve the K051960 device');
// Compiled as any other device: drawgfx.h's draw modes are the core's enum,
// which every device sees through emu.h (#203).
const k051960 = compileMameDevice(mameSource, k051960Definition, 'K051960');
const k051960Emitted = generatedDeviceMethodsSource(k051960);
assert.ok(
  k051960Emitted.methods.includes('k051960_sprites_draw'),
  'the K051960 sprite renderer must have a direct executable implementation',
);
assert.equal(k051960.constants.DRAWMODE_SHADOW_PRI, 3);
