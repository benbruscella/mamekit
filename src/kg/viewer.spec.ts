import assert from 'node:assert/strict';
import type { KnowledgeGraph } from './types.ts';
import { viewerHtml } from './viewer.ts';

const graph: KnowledgeGraph = {
  meta: {
    tool: 'mamekit',
    version: 'test',
    mameSrc: '',
    driverFile: 'src/mame/test.cpp',
    generatedAt: '',
    copyrightHolders: 'Example Author',
  },
  nodes: [{
    id: 'game:test',
    label: 'Game',
    props: { name: 'test', fullname: 'Test Machine' },
  }, {
    id: 'device:maincpu',
    label: 'Device',
    props: { tag: 'maincpu', type: 'Z80', clock: 3_000_000 },
  }, {
    id: 'region:test/maincpu',
    label: 'RomRegion',
    props: { tag: 'maincpu' },
  }],
  edges: [{
    from: 'game:test',
    to: 'device:maincpu',
    rel: 'USES_MACHINE',
  }],
};

const html = viewerHtml(graph, 'Test graph');
assert.match(html, /id="story" class="view active"/);
assert.match(html, /Machine story/);
assert.match(html, /Advanced graph/);
assert.match(html, /\.system\[data-system=cpu\]/);
assert.match(html, /subsystem/);
assert.match(html, /searchParams\.set\('node'/);
assert.match(html, /Example Author/);
assert.doesNotMatch(html, /node cloud/i);

console.log('viewer.spec: machine story, raw mode, provenance, and deep links passed');
