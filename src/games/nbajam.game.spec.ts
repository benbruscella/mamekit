import assert from 'node:assert/strict';
import { nbajam } from "./nbajam.game.ts";
import { assertGameContract, gameSourceGraph } from "./test-support.ts";

assertGameContract(nbajam);
const graph = gameSourceGraph(nbajam);
// init_nbajam is `init_nbajam_common(0)`: the helper's `if (!te_protection)`
// selects the original layout, never the tournament edition's two windows.
const game = graph.nodes.find(node => node.label === 'Game' && node.props.name === 'nbajam');
const installs = ((game?.props.installedHandlers as string[] | undefined) ?? []).map(value => JSON.parse(value));
assert.deepEqual(installs.map(install => [install.kind, install.cpu, install.start, install.end, install.method]), [
  ['read', 'maincpu', 0x1b14020, 0x1b2503f, 'nbajam_prot_r'],
  ['write', 'maincpu', 0x1b14020, 0x1b2503f, 'nbajam_prot_w'],
  ['ram', 'adpcm:cpu', 0xfbaa, 0xfbd4, ''],
]);
// ...and points m_nbajam_prot_table at nbajam_prot_values, not the TE table.
const tables = ((game?.props.initTables as string[] | undefined) ?? []).map(value => JSON.parse(value));
assert.equal(tables.length, 1);
assert.equal(tables[0].name, 'm_nbajam_prot_table');
assert.equal(tables[0].initialValues.length, 128);
assert.equal(tables[0].initialValues[0], 0x21283b3b);

console.log('nbajam.game.spec: init helper branch, protection installs and table passed');
