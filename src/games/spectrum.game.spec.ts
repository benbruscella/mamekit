import assert from 'node:assert/strict';
import { spectrum } from "./spectrum.game.ts";
import { gameSourceGraph, mameSourceRoot } from "./test-support.ts";
import { sourceFileAggregates } from "../mame/static-aggregate.ts";

gameSourceGraph(spectrum.target);

// spectrum_palette hands the palette a file-scope `constexpr rgb_t
// spectrum_pens[16]`, each element a braced `{ r, g, b }`. The element type
// makes each one rgb_t(r, g, b): a packed word in the host framebuffer's byte
// order (alpha, blue, green, red), as vicdual's spelled-out rgb_t(...) lowers.
// As rows of three numbers every pen became colour 0 and no Spectrum drew.
const pens = sourceFileAggregates(mameSourceRoot(), 'src/mame/sinclair/spectrum_v.cpp').lower('spectrum_pens');
assert.deepEqual(pens, [
  0xff000000, 0xffbf0000, 0xff0000bf, 0xffbf00bf, 0xff00bf00, 0xffbfbf00, 0xff00bfbf, 0xffbfbfbf,
  0xff000000, 0xffff0000, 0xff0000ff, 0xffff00ff, 0xff00ff00, 0xffffff00, 0xff00ffff, 0xffffffff,
]);
console.log('spectrum.game.spec: source machine graph and pen table passed');
