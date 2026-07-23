import assert from 'node:assert/strict';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileNamco51Protocol } from '../mame/namco51-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
  type GeneratedDeviceDefinition,
} from '../runtime/generated-device.ts';
import { galaga } from './galaga.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(galaga);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(galaga);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === galaga.machine.className &&
  node.props.name === galaga.machine.name);
assert.ok(machine);

// Three Z80s plus the Namco custom fleet, all extracted from the driver.
const deviceNodes = graph.nodes.filter(node => node.label === 'Device');
const types = new Set(deviceNodes.map(node => String(node.props.type)));
for (const required of ['Z80', 'NAMCO_06XX', 'NAMCO_51XX', 'NAMCO_54XX', 'STARFIELD_05XX', 'NAMCO_WSG', 'LS259']) {
  assert.ok(types.has(required), `galaga graph must extract ${required}`);
}

// The 05xx starfield config chain call is lowered with resolved constants.
const starfieldNode = deviceNodes.find(node => node.props.type === 'STARFIELD_05XX');
assert.ok(starfieldNode);
assert.deepEqual(starfieldNode.props.configCalls, ['set_starfield_config(16,0,272)']);

// The starfield device lowers completely through the generic device compiler
// and draws pens at STARS_COLOR_BASE+ through an indexed bitmap.
const definitions = indexMameHardware(mameSrc);
const starfield = compileMameDevice(mameSrc, definitions.get('STARFIELD_05XX')!);
assert.equal(starfield.summary.diagnostics, 0);
assert.equal(starfield.summary.methods, 8);
assert.equal(starfield.constants.LFSR_SEED, 0x7fff);
clearGeneratedDevices();
registerGeneratedDevice(starfield as unknown as GeneratedDeviceDefinition);
const device = createDevice('STARFIELD_05XX');
device.call('enable_starfield', 1);
device.call('set_scroll_speed', 6, 0);
device.call('set_active_starfield_sets', 1, 2);
device.call('set_starfield_config', 16, 0, 272);
const pens = new Map<number, number>();
const bitmap = {
  'pix=': (_y: number, _x: number, pen: number) => pens.set(pen, (pens.get(pen) ?? 0) + 1),
  fill: () => {},
};
const cliprect = {
  min_x: 0, max_x: 287, min_y: 0, max_y: 223,
  contains: (x: number, y: number) => x >= 0 && x <= 287 && y >= 0 && y <= 223,
};
(device as unknown as { call(name: string, ...args: unknown[]): number })
  .call('draw_starfield', bitmap, cliprect, 0);
assert.ok(pens.size >= 30, `05xx must draw stars (got ${pens.size} distinct pens)`);
assert.ok([...pens.keys()].every(pen => pen >= 512 && pen < 512 + 64),
  '05xx star pens live at STARS_COLOR_BASE');

// The 51xx protocol device lowers from the historical MAME source.
const namco51 = compileNamco51Protocol();
assert.equal(namco51.summary.diagnostics, 0);
assert.ok(namco51.methods.some(method => method.name === 'switches'));

// The 06xx and 54xx lower through the generic device compiler.
for (const type of ['NAMCO_06XX', 'NAMCO_54XX'] as const) {
  const compiled = compileMameDevice(mameSrc, definitions.get(type)!);
  assert.equal(compiled.summary.diagnostics, 0, `${type} must compile clean`);
}

// The star palette lowers as a computed indirect-color group plus an
// identity pen bank — never as a PROM lookup.
const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'galaga MAME video source must lower to executable video IR');
assert.deepEqual(video.plan.palette?.computedColors, [{
  base: 32,
  count: 64,
  min: 0,
  max: 255,
  scaler: -1,
  channels: [
    { channel: 'r', bits: [0, 1], resistances: [470, 220], pulldown: 1000, pullup: 0 },
    { channel: 'g', bits: [2, 3], resistances: [470, 220], pulldown: 1000, pullup: 0 },
    { channel: 'b', bits: [4, 5], resistances: [470, 220], pulldown: 0, pullup: 0 },
  ],
}]);
const starBank = video.plan.palette?.banks.find(bank => bank.penOffset === 512);
assert.deepEqual(starBank, {
  penOffset: 512,
  colorOr: 32,
  lookupOffset: 0,
  lookupCount: 64,
  direct: true,
});
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('galaga.spec: source-derived MCU fleet, starfield and palette passed');
