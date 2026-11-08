import assert from 'node:assert/strict';
import { executeGeneratedHandler } from '../ir/execute.ts';
import { normalizeMameExecutionSource } from '../mame/cpu-compiler.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { gameboy } from './gameboy.game.ts';
import { assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(gameboy.target);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === gameboy.target.machine.className &&
  node.props.name === gameboy.target.machine.name);
assert.ok(machine);

// gb_palette reads palette_gb[], a file-scope table its handler carries. The
// board runs it at the palette's device_start; run the same handler against a
// palette device and read back MAME's four DMG shades, in the canvas order
// every packed colour here uses (0xAABBGGRR).
const video = compileMameVideo(graph, mameSourceRoot(), machine.id, gameboy.target.game);
assertPaletteCallback(video, { handler: 'gb_state.gb_palette', entries: 4 });
const handler = graph.nodes.find(node => node.id === 'handler:gb_state.gb_palette');
assert.ok(typeof handler?.props.sourceBody === 'string', 'gb_palette is a board handler');
const pens: number[] = [];
executeGeneratedHandler(compileMameHandler(normalizeMameExecutionSource(handler.props.sourceBody)), {}, {
  palette: { set_pen_color: (pen: number, color: number) => { pens[pen] = color >>> 0; return 0; } },
});
assert.deepEqual(
  pens.map(color => color.toString(16)),
  ['ff87fbff', 'ff4eaeb1', 'ff4e8084', 'ff4e4e4e'],
  'the DMG palette is ff fb 87 / b1 ae 4e / 84 80 4e / 4e 4e 4e',
);
console.log('gameboy.game.spec: MAME DMG palette lowers with its colour table passed');
