import assert from 'node:assert/strict';
import { executeGeneratedHandler } from '../ir/execute.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { gameboy } from './gameboy.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(gameboy.target);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === gameboy.target.machine.className &&
  node.props.name === gameboy.target.machine.name);
assert.ok(machine);

// gb_palette reads palette_gb[], a file-scope table. The program has to carry
// it: run it against nothing but the palette device and read back MAME's four
// DMG shades, in the canvas order every packed colour here uses (0xAABBGGRR).
const video = compileMameVideo(graph, mameSourceRoot(), machine.id, gameboy.target.game);
const program = video?.plan.paletteProgram;
assert.ok(program, 'gb_palette must lower to a palette program');
const pens: number[] = [];
const setPen = (pen: number, color: number) => { pens[pen] = color >>> 0; return 0; };
executeGeneratedHandler(program.program, {
  constants: program.constants ?? {},
  members: {},
  calls: { [`${program.deviceParameter}.set_pen_color`]: setPen, set_pen_color: setPen },
});
assert.deepEqual(
  pens.map(color => color.toString(16)),
  ['ff87fbff', 'ff4eaeb1', 'ff4e8084', 'ff4e4e4e'],
  'the DMG palette is ff fb 87 / b1 ae 4e / 84 80 4e / 4e 4e 4e',
);
console.log('gameboy.game.spec: MAME DMG palette lowers with its colour table passed');
