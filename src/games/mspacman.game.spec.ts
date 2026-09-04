import assert from 'node:assert/strict';
import { compileDriverInitProgram } from '../mame/driver-init-compiler.ts';
import { mspacman } from './mspacman.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(mspacman);

// The daughterboard answers reads at eight fixed windows and swaps the whole
// program bank as a side effect. MAME writes those handlers as one template
// specialized on the window's base address, in whichever radix reads best.
const decoders = graph.nodes
  .filter(node => node.label === 'Handler' && /_decode_r_/.test(String(node.props.method)))
  .map(node => node.props);
assert.equal(decoders.length, 8);
assert.ok(
  decoders.every(handler => typeof handler.sourceBody === 'string'),
  'every specialization must resolve to its template definition in MAME source',
);
assert.deepEqual(
  [...new Set(decoders.map(handler => (handler.sourceConstants as string[])?.[0]))].sort(),
  ['Delta=16368', 'Delta=16376', 'Delta=32768', 'Delta=38896',
    'Delta=56', 'Delta=5632', 'Delta=8480', 'Delta=944'],
  'the template argument must reach the handler as its bound constant',
);

// Ms. Pac-Man powers on showing the decrypted half of its ROM, not the Pac-Man
// code the low bank still holds.
const bank = graph.nodes.find(node => node.label === 'MemoryBank' && node.props.tag === 'bank1');
assert.ok(bank);
assert.equal(bank.props.entries, 2);
assert.equal(bank.props.initialEntry, 1);

// That decrypted half does not exist in the dump: init_mspacman builds it.
const init = compileDriverInitProgram(
  mameSourceRoot(),
  mspacman.driver,
  mspacman.machine.className,
  'init_mspacman',
);
assert.ok(init, 'init_mspacman must lower to an executable init program');
assert.deepEqual(init.helpers.map(helper => helper.method), ['mspacman_install_patches']);

console.log('mspacman.spec: templated bank decoders and executed driver init passed');
