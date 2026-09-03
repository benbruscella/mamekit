import assert from 'node:assert/strict';
import { generatedDeviceMethodsSource } from '../../mame/device-codegen.ts';
import { indexMameHardware } from '../../mame/hardware.ts';
import { compileK053246 } from './extract.ts';

const mameSource = process.env.MAME_SRC ?? '../mame';
// K053246 is MAME's board-construction alias for the K053247 device type.
const definition = indexMameHardware(mameSource).get('K053247');
assert.ok(definition, 'MAME hardware index should resolve the K053247 device');

const device = compileK053246(mameSource, definition);
const publicDraws = device.methods.filter(method =>
  method.name === 'k053247_sprites_draw'
);
assert.equal(
  publicDraws.length,
  1,
  'the indexed sprite entry point must not be hidden by the unused RGB32 overload',
);
assert.ok(
  !device.methods.some(method =>
    method.name === 'zdrawgfxzoom32GP' && method.parameters.includes('bitmap_rgb32')
  ),
  'the unused RGB32 renderer must not make its shared method name overloaded',
);

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

console.log('device extract spec: K053246 indexed sprite renderer remains directly executable');
