import assert from 'node:assert/strict';
import { generatedDeviceMethodsSource } from '../mame/device-codegen.ts';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import {
  clearGeneratedDevices,
  createDevice,
  registerGeneratedDevice,
  type GeneratedDeviceDefinition,
  type GeneratedDeviceMethodMap,
} from '../runtime/generated-device.ts';
import { galaga } from './galaga.game.ts';
import { assertGameContract, assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(galaga);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(galaga);
const game = graph.nodes.find(node =>
  node.label === 'Game' && node.props.name === galaga.game);
assert.deepEqual(game?.props.romTransforms, [JSON.stringify({
  kind: 'conditional-byte-swap',
  region: 'gfx1',
  indexMask: 0x0808,
  indexValue: 0x0800,
  displacement: 8,
})]);
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
const interpreted = createDevice('STARFIELD_05XX');
const emitted = generatedDeviceMethodsSource(starfield);
assert.deepEqual(emitted.methods.sort(), ['draw_starfield', 'get_next_lfsr_state']);
// Evaluating emitted source is test-only. Production imports this as static JS
// from the generated device module and never uses runtime code generation.
const compiledMethods = Function(`return ${emitted.source}`)() as GeneratedDeviceMethodMap;
registerGeneratedDevice({
  ...starfield,
  compiledMethods,
} as unknown as GeneratedDeviceDefinition);
const compiled = createDevice('STARFIELD_05XX');
for (const device of [interpreted, compiled]) {
  device.call('enable_starfield', 1);
  device.call('set_scroll_speed', 6, 0);
  device.call('set_active_starfield_sets', 1, 2);
  device.call('set_starfield_config', 16, 0, 272);
}
const cliprect = {
  min_x: 0, max_x: 287, min_y: 0, max_y: 223,
  contains: (x: number, y: number) => x >= 0 && x <= 287 && y >= 0 && y <= 223,
};
const draw = (device: ReturnType<typeof createDevice>): {
  elapsed: number;
  pixels: [number, number, number][];
} => {
  const pixels: [number, number, number][] = [];
  const bitmap = {
    'pix=': (y: number, x: number, pen: number) => pixels.push([y, x, pen]),
    fill: () => {},
  };
  const started = performance.now();
  (device as unknown as { call(name: string, ...args: unknown[]): number })
    .call('draw_starfield', bitmap, cliprect, 0);
  return { elapsed: performance.now() - started, pixels };
};
const interpretedDraw = draw(interpreted);
const compiledDraw = draw(compiled);
assert.deepEqual(compiledDraw.pixels, interpretedDraw.pixels);
for (const member of starfield.members) {
  assert.equal(compiled.get(member.name), interpreted.get(member.name), member.name);
}
assert.ok(
  compiledDraw.elapsed * 5 < interpretedDraw.elapsed,
  `compiled starfield must be at least 5x faster ` +
    `(${interpretedDraw.elapsed.toFixed(1)}ms vs ${compiledDraw.elapsed.toFixed(1)}ms)`,
);
const pens = new Map<number, number>();
for (const [, , pen] of compiledDraw.pixels) pens.set(pen, (pens.get(pen) ?? 0) + 1);
assert.ok(pens.size >= 30, `05xx must draw stars (got ${pens.size} distinct pens)`);
assert.ok([...pens.keys()].every(pen => pen >= 512 && pen < 512 + 64),
  '05xx star pens live at STARS_COLOR_BASE');

// The 06xx and 54xx lower through the generic device compiler.
for (const type of ['NAMCO_06XX', 'NAMCO_54XX'] as const) {
  const compiled = compileMameDevice(mameSrc, definitions.get(type)!);
  assert.equal(compiled.summary.diagnostics, 0, `${type} must compile clean`);
}

// The palette is galaga_palette as written, its star colours included: those
// come from the colour index through a resistor network of their own
// (resnet.cpp's compute_resistor_weights), set as indirect colours 32-95.
const video = compileMameVideo(graph, mameSrc, machine.id);
assertPaletteCallback(video, { handler: 'galaga_state.galaga_palette', entries: 580, indirectEntries: 96 });
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('galaga.spec: source-derived MCU fleet, starfield and palette passed');
