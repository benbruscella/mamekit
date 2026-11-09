// palette_device inherits the byte order of its bound share.

import assert from 'node:assert/strict';
import { paletteShareEndianness } from './video-compiler.ts';
import type { KnowledgeGraph } from '../kg/types.ts';

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

console.log('video-compiler.spec: palette share byte order follows the bus');
