import assert from 'node:assert/strict';
import {
  codeLookupXor,
  compileAtariMotionObjects,
  computeLog,
  roundToPowerOfTwo,
  spriteParameter,
} from './atarimo-compiler.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';

// atarimo.cpp's own derivations, which decide the entry count and the size of
// the wrap masks. round_to_powerof2 rounds *up past* an exact power of two,
// which is what makes a 0x3ff link mask a 1024-entry list.
assert.equal(computeLog(8), 3);
assert.equal(computeLog(1), 0);
assert.equal(computeLog(0), -1);
assert.equal(computeLog(12), -1, 'a non-power-of-two has no log');
assert.equal(roundToPowerOfTwo(0x3ff), 1024);
assert.equal(roundToPowerOfTwo(0x1ff), 512);
assert.equal(roundToPowerOfTwo(0), 1);

// sprite_parameter::set: one word, the shift that lands the field at bit 0,
// and what is left of the mask afterwards.
assert.deepEqual(spriteParameter([0, 0xff80, 0, 0]), { word: 1, shift: 7, mask: 0x1ff });
assert.deepEqual(spriteParameter([0x7fff, 0, 0, 0]), { word: 0, shift: 0, mask: 0x7fff });
assert.deepEqual(spriteParameter([0, 0, 0, 0]), { word: 0, shift: 0, mask: 0 });
assert.throws(
  () => spriteParameter([1, 1, 0, 0]),
  /spans two entry words/,
  'a parameter that names two words is not a shape this lowers',
);

// The driver's video_start rewrites the device's identity code lookup; the
// only information in a whole-table constant XOR is the constant.
assert.equal(
  codeLookupXor(
    'std::vector<uint32_t> &codelookup = m_mob->code_lookup();\n' +
    'for (auto & elem : codelookup)\n\telem ^= 0x800;',
  ),
  0x800,
);
assert.equal(codeLookupXor('m_playfield_color_bank = 1;'), undefined);

const gauntlet = compileAtariMotionObjects(mameSrc, {
  tag: 'mob',
  configName: 'gauntlet_state::s_mob_config',
  driverFile: 'src/mame/atari/gauntlet.cpp',
  spriteShare: 'mob',
  slipShare: 'mob:slip',
  videoStartBody: 'std::vector<uint32_t> &codelookup = m_mob->code_lookup();\n' +
    'for (auto & elem : codelookup)\n\telem ^= 0x800;',
});
assert.ok(gauntlet, 'gauntlet declares an atari_motion_objects_config');
assert.deepEqual({
  gfxIndex: gauntlet.gfxIndex,
  bankCount: gauntlet.bankCount,
  linked: gauntlet.linked,
  split: gauntlet.split,
  reverse: gauntlet.reverse,
  swapXy: gauntlet.swapXy,
  slipHeight: gauntlet.slipHeight,
  slipShift: gauntlet.slipShift,
  slipOffset: gauntlet.slipOffset,
  paletteBase: gauntlet.paletteBase,
  transparentPen: gauntlet.transparentPen,
  codeXor: gauntlet.codeXor,
}, {
  gfxIndex: 0,
  bankCount: 1,
  linked: true,
  split: true,
  reverse: false,
  swapXy: false,
  slipHeight: 8,
  slipShift: 3,
  slipOffset: 1,
  paletteBase: 0x100,
  transparentPen: 0,
  codeXor: 0x800,
});
// device_start derives these from the masks, and the sprite pass wraps on them.
assert.deepEqual({
  entryCount: gauntlet.entryCount,
  entryBits: gauntlet.entryBits,
  bitmapWidth: gauntlet.bitmapWidth,
  bitmapHeight: gauntlet.bitmapHeight,
}, { entryCount: 1024, entryBits: 10, bitmapWidth: 512, bitmapHeight: 512 });
assert.deepEqual(gauntlet.link, { word: 3, shift: 0, mask: 0x3ff });
assert.deepEqual(gauntlet.xpos, { word: 1, shift: 7, mask: 0x1ff });
assert.deepEqual(gauntlet.ypos, { word: 2, shift: 7, mask: 0x1ff });
assert.deepEqual(gauntlet.width, { word: 2, shift: 3, mask: 7 });
assert.deepEqual(gauntlet.hflip, { word: 2, shift: 6, mask: 1 });
// Gauntlet has no vertical flip, priority, neighbour or absolute bit; those
// must lower to an all-zero parameter rather than shifting the field order.
for (const parameter of [gauntlet.vflip, gauntlet.priority, gauntlet.neighbor,
  gauntlet.absolute, gauntlet.special]) {
  assert.deepEqual(parameter, { word: 0, shift: 0, mask: 0 });
}

// A driver with no such aggregate lowers to no sprite pass at all, rather
// than to a plan full of zeroes that would draw the wrong thing.
assert.equal(
  compileAtariMotionObjects(mameSrc, {
    tag: 'mob',
    configName: 'gauntlet_state::not_a_config',
    driverFile: 'src/mame/atari/gauntlet.cpp',
    spriteShare: 'mob',
  }),
  undefined,
);

console.log('atarimo-compiler.spec: config aggregate, derived masks and code lookup passed');
