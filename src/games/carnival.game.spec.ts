import assert from 'node:assert/strict';
import { carnival } from './carnival.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';
import { sourceFileAggregates } from '../mame/static-aggregate.ts';

gameSourceGraph(carnival);

// VIC Dual's colour screen picks its pens from a file-scope table of rgb_t
// values. They lower to the packed words the interpreter makes of rgb_t --
// the host framebuffer's byte order, alpha then blue, green, red -- or every
// colour screen draws black (unlowered) or with red and blue exchanged.
const pens = sourceFileAggregates(mameSourceRoot(), 'src/mame/sega/vicdual_v.cpp').lower('pens_from_color_prom');
assert.deepEqual(pens, [
  0xff000000, // rgb_t::black()
  0xff00ff00, // rgb_t(0x00, 0xff, 0x00)
  0xffff0000, // rgb_t(0x00, 0x00, 0xff)
  0xffffff00, // rgb_t(0x00, 0xff, 0xff)
  0xff0000ff, // rgb_t(0xff, 0x00, 0x00)
  0xff00ffff, // rgb_t(0xff, 0xff, 0x00)
  0xffff00ff, // rgb_t(0xff, 0x00, 0xff)
  0xffffffff, // rgb_t::white()
]);
console.log('carnival.spec: source machine graph and colour pens passed');
