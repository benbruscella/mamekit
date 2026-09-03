// A palette callback publishes more than a color network.
//
// MAME's PROM regions routinely hold a second table past the RGB entries, and
// the driver reaches it through a member the callback points into the region.
// The palette itself lowers declaratively, so that assignment is the only
// record of where the table lives; missing it leaves every tile that reads the
// member colored from unbound state.

import assert from 'node:assert/strict';
import { MameAstIndex, parseMameAst } from './ast.ts';
import { paletteShareEndianness, sourceAssignedRegionPointers } from './video-compiler.ts';
import type { GeneratedPromPalettePlan } from '../ir/board.ts';
import type { KnowledgeGraph } from '../kg/types.ts';

const file = 'src/mame/test/test_v.cpp';

function pointers(body: string, constants: Record<string, number> = {}): {
  bindings: Record<string, string>;
  offsets: Record<string, number>;
} {
  const source = `void test_state::test_palette(palette_device &palette)\n{\n${body}\n}\n`;
  const ast = new MameAstIndex(parseMameAst([{ file, source }]));
  const palette = {
    region: 'proms',
    source: { file, line: 1 },
  } as unknown as GeneratedPromPalettePlan;
  return sourceAssignedRegionPointers(ast, palette, constants);
}

// palette_device inherits the byte order of its bound share. A low-byte-lane
// palette on a 68000 still stores each two-byte raw entry most-significant
// byte first; interpreting it as host-little-endian makes every color dark.
{
  const graph = {
    nodes: [
      { id: 'cpu', label: 'Device', props: { type: 'M68000' } },
      { id: 'map', label: 'AddressMap', props: {} },
      { id: 'range', label: 'AddressRange', props: { share: 'palette' } },
    ],
    edges: [
      { from: 'cpu', to: 'map', rel: 'HAS_MAP' },
      { from: 'map', to: 'range', rel: 'HAS_RANGE' },
    ],
  } as unknown as KnowledgeGraph;
  assert.equal(paletteShareEndianness(graph, 'palette'), 'big');
  graph.nodes[0]!.props.type = 'Z80';
  assert.equal(paletteShareEndianness(graph, 'palette'), 'little');
}

// Zaxxon's spelling: an east-const pointer-to-const, and the second table
// reached by taking the address of an element.
{
  const { bindings, offsets } = pointers(
    `\tuint8_t const *const color_prom = memregion("proms")->base();\n` +
    `\tm_color_codes = &color_prom[256];`,
  );
  assert.deepEqual(bindings, { m_color_codes: 'proms' });
  assert.deepEqual(offsets, { m_color_codes: 256 });
}

// The same fact written as a displacement, with the offset behind a constant.
{
  const { bindings, offsets } = pointers(
    `\tconst uint8_t *color_prom = memregion("colors")->base();\n` +
    `\tm_lookup = color_prom + PROM_SPLIT;`,
    { PROM_SPLIT: 0x20 },
  );
  assert.deepEqual(bindings, { m_lookup: 'colors' });
  assert.deepEqual(offsets, { m_lookup: 0x20 });
}

// The advancing form still works, and accumulates across several steps.
{
  const { bindings, offsets } = pointers(
    `\tuint8_t *color_prom = memregion("proms")->base();\n` +
    `\tcolor_prom += 32;\n` +
    `\tm_first = color_prom;\n` +
    `\tcolor_prom += 16;\n` +
    `\tm_second = color_prom;`,
  );
  assert.deepEqual(bindings, { m_first: 'proms', m_second: 'proms' });
  assert.deepEqual(offsets, { m_first: 32, m_second: 48 });
}

// A callback that never points a member into its region contributes nothing.
{
  const { bindings, offsets } = pointers(
    `\tuint8_t const *const color_prom = memregion("proms")->base();\n` +
    `\tpalette.set_pen_color(0, rgb_t(color_prom[0], 0, 0));`,
  );
  assert.deepEqual(bindings, {});
  assert.deepEqual(offsets, {});
}

console.log('video-compiler.spec: palette region pointers lower from every MAME spelling');
