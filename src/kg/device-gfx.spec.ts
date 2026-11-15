import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MameAstIndex, parseMameAst } from '../mame/ast.ts';
import {
  configMethodCalls, configuredGfxInfo, constructorGfxInfo, deviceGfxSource, evaluateSetInfo, ownsGfxInterface,
} from './device-gfx.ts';
import { parseEnumConstants, parseGfxDecodes, parseGfxLayouts, stripComments } from './parse.ts';

const mameSrc = process.env.MAME_SRC ?? join(import.meta.dirname, '../../../mame');

function device(base: string) {
  const units = ['.h', '.cpp'].map(extension => ({
    file: `${base}${extension}`,
    source: readFileSync(join(mameSrc, `${base}${extension}`), 'utf8'),
  }));
  const text = units.map(unit => stripComments(unit.source)).join('\n');
  return {
    source: deviceGfxSource(new MameAstIndex(parseMameAst(units))),
    constants: parseEnumConstants(text),
    text,
  };
}

/** The table a device ends with after these configuration statements, as `Class::name`. */
function selected(base: string, className: string, statements: string[]): string {
  const { source, constants } = device(base);
  const result = configuredGfxInfo(
    source, className, statements, constants, constructorGfxInfo(source, className, constants),
  );
  if (!result) return 'none';
  return result.kind === 'table' ? `${result.table.scope}::${result.table.name}` : `unresolved: ${result.reason}`;
}

// --- K051960: the constructor's default, then MAME's own switch ---------------
const k051960 = 'src/mame/konami/k051960';
assert.ok(ownsGfxInterface(device(k051960).source.ast, 'k051960_device'));
assert.equal(selected(k051960, 'k051960_device', ['K051960(config, m_k051960, 24_MHz_XTAL);']), 'k051960_device::gfxinfo');
for (const [order, table] of [
  ['K051960_PLANEORDER_BASE', 'gfxinfo'],
  ['K051960_PLANEORDER_MIA', 'gfxinfo_reverse'],
  // The order the hand-written tables never knew.
  ['K051960_PLANEORDER_GRADIUS3', 'gfxinfo_gradius3'],
] as const) {
  assert.equal(
    selected(k051960, 'k051960_device', [
      'K051960(config, m_k051960, 24_MHz_XTAL);',
      'm_k051960->set_palette(m_palette);',
      `m_k051960->set_plane_order(${order});`,
    ]),
    `k051960_device::${table}`,
  );
}
// MAME's `default: fatalerror(...)` and an argument no constant fixes are
// reported, never answered with a table.
assert.match(selected(k051960, 'k051960_device', ['m_k051960->set_plane_order(7);']), /^unresolved: .*fatal error/);
assert.match(selected(k051960, 'k051960_device', ['m_k051960->set_plane_order(m_order);']), /^unresolved: .*switch \(order\)/);
// The last setter wins, as the calls run in order.
assert.equal(
  selected(k051960, 'k051960_device', [
    'm_k051960->set_plane_order(K051960_PLANEORDER_MIA);',
    'm_k051960->set_plane_order(K051960_PLANEORDER_BASE);',
  ]),
  'k051960_device::gfxinfo',
);

// --- K052109: an inline header setter with a conditional operand --------------
const k052109 = 'src/mame/konami/k052109';
assert.equal(selected(k052109, 'k052109_device', ['K052109(config, m_k052109, 24_MHz_XTAL);']), 'k052109_device::gfxinfo');
assert.equal(selected(k052109, 'k052109_device', ['m_k052109->set_char_ram(true);']), 'k052109_device::gfxinfo_ram');
assert.equal(selected(k052109, 'k052109_device', ['m_k052109->set_char_ram(false);']), 'k052109_device::gfxinfo');

// --- K051316: a framework device, a setter chained on the add statement ------
const k051316 = 'src/devices/video/k051316';
for (const [bpp, table] of [['4', 'gfxinfo'], ['7', 'gfxinfo7'], ['8', 'gfxinfo8'], ['-4', 'gfxinfo4_ram']] as const) {
  assert.equal(
    selected(k051316, 'k051316_device', [`K051316(config, m_k051316, 0).set_bpp(${bpp});`]),
    `k051316_device::${table}`,
  );
}
assert.match(selected(k051316, 'k051316_device', ['m_k051316->set_bpp(5);']), /^unresolved/);

// --- A constructor that passes no table decodes nothing until one is set ------
assert.equal(selected('src/mame/taito/tc0100scn', 'tc0100scn_device', []), 'tc0100scn_base_device::null');

// --- The tables and layouts those names resolve to ---------------------------
{
  const { text } = device(k051960);
  const tables = parseGfxDecodes(text);
  assert.deepEqual(tables.map(table => table.name), [
    'k051960_device::gfxinfo', 'k051960_device::gfxinfo_reverse', 'k051960_device::gfxinfo_gradius3',
  ]);
  assert.deepEqual(tables[1]!.entries, [{
    region: 'DEVICE_SELF', offset: 0, layout: 'spritelayout_reverse', colorBase: 0, colorCount: 1,
    device: true, xscale: 1, yscale: 1,
  }]);
  const layouts = new Map(parseGfxLayouts(text).map(layout => [layout.name, layout]));
  assert.deepEqual(layouts.get('k051960_device::spritelayout')?.planeOffsets, [0, 8, 16, 24]);
  assert.deepEqual(layouts.get('k051960_device::spritelayout_reverse'), {
    name: 'k051960_device::spritelayout_reverse',
    width: 16, height: 16, total: 'RGN_FRAC(1,1)', planes: 4,
    planeOffsets: [24, 16, 8, 0],
    xOffsets: [0, 1, 2, 3, 4, 5, 6, 7, 256, 257, 258, 259, 260, 261, 262, 263],
    yOffsets: [0, 32, 64, 96, 128, 160, 192, 224, 512, 544, 576, 608, 640, 672, 704, 736],
    charIncrement: 1024,
  });
  assert.deepEqual(layouts.get('k051960_device::spritelayout_gradius3')?.planeOffsets, [0, 1, 2, 3]);
}
{
  const { text } = device(k052109);
  const ram = parseGfxDecodes(text).find(table => table.name === 'k052109_device::gfxinfo_ram');
  assert.deepEqual(ram?.entries.map(entry => [entry.region, entry.layout, entry.ram, entry.device]), [
    ['DEVICE_SELF', 'charlayout_ram', true, true],
  ]);
  const layout = parseGfxLayouts(text).find(candidate => candidate.name === 'k052109_device::charlayout');
  assert.deepEqual(layout?.planeOffsets, [24, 16, 8, 0]);
  assert.deepEqual(layout?.yOffsets, [0, 32, 64, 96, 128, 160, 192, 224]);
  assert.equal(layout?.charIncrement, 256);
}
// An entry macro that is not lowered is named, so its table is never used short.
assert.deepEqual(parseGfxDecodes(`
GFXDECODE_MEMBER( x_device::gfxinfo )
  GFXDECODE_DEVICE_REVERSEBITS(DEVICE_SELF, 0, layout, 0, 1)
GFXDECODE_END
`)[0]?.unsupported, ['GFXDECODE_DEVICE_REVERSEBITS']);

// --- The control flow itself -------------------------------------------------
const method = (parameters: string, body: string) => ({ className: 'x_device', name: 'set_mode', parameters, body });
const run = (parameters: string, body: string, args: string[], constants: Record<string, number> = {}) => {
  const result = evaluateSetInfo(method(parameters, body), args, constants);
  return !result ? 'none' : result.kind === 'table' ? result.table.name : 'unresolved';
};
const branches = `
  // set_info(gfx_comment) is not code
  if (mode == MODE_A) { set_info(gfx_a); return; }
  else if (mode == MODE_B)
    set_info(gfx_b);
  else
    set_info(wide ? gfx_wide : nullptr);
  m_mode = mode;
`;
const modes = { MODE_A: 0, MODE_B: 1 };
assert.equal(run('int mode, bool wide = false', branches, ['MODE_A'], modes), 'gfx_a');
assert.equal(run('int mode, bool wide = false', branches, ['MODE_B'], modes), 'gfx_b');
assert.equal(run('int mode, bool wide = false', branches, ['2', 'true'], modes), 'gfx_wide');
assert.equal(run('int mode, bool wide = false', branches, ['2'], modes), null);
assert.equal(run('int mode, bool wide = false', branches, ['m_mode'], modes), 'unresolved');
// Fallthrough and shared labels, as C++ runs them.
const fall = `switch (mode) { case 0: case 1: set_info(gfx_low); case 2: set_info(gfx_two); break; case 3: set_info(gfx_three); break; }`;
assert.equal(run('int mode', fall, ['1']), 'gfx_two');
assert.equal(run('int mode', fall, ['3']), 'gfx_three');
assert.equal(run('int mode', fall, ['9']), 'none');
// A setter that never touches the table selects none, whatever it branches on.
assert.equal(run('int mode', 'if (m_started) m_mode = mode;', ['1']), 'none');

assert.deepEqual(configMethodCalls('K051316(config, m_k051316, 0).set_bpp(8).set_wrap(1, f(2));'), [
  { method: 'set_bpp', args: ['8'] },
  { method: 'set_wrap', args: ['1', 'f(2)'] },
]);
assert.deepEqual(configMethodCalls('m_k051960->set_sprite_callback(FUNC(tmnt_state::tmnt_sprite_callback));'), [
  { method: 'set_sprite_callback', args: ['FUNC(tmnt_state::tmnt_sprite_callback)'] },
]);

console.log('device-gfx.spec: device-owned gfx tables are selected by MAME source');
