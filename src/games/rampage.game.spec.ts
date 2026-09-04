import assert from 'node:assert/strict';
import { rampage } from './rampage.game.ts';
import { gameSourceGraph } from './test-support.ts';

const graph = gameSourceGraph(rampage);
for (const method of ['read_alt', 'write_alt']) {
  assert.ok(
    graph.nodes.some(node =>
      node.label === 'Handler' &&
      node.props.ownerClass === 'pia6821_device' &&
      node.props.method === method),
    `Rampage must retain the sound-board PIA ${method} handler`,
  );
}
console.log('rampage.spec: source machine graph and sound-board PIA passed');
