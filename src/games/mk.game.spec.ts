import assert from 'node:assert/strict';
import { mk } from "./mk.game.ts";
import { assertGameContract, gameSourceGraph } from "./test-support.ts";

assertGameContract(mk);
const graph = gameSourceGraph(mk);
const devices = graph.nodes.filter(node => node.label === 'Device').map(node => String(node.props.type));
for (const type of ['TMS34010', 'MIDTUNIT_VIDEO', 'WILLIAMS_ADPCM_SOUND', 'MC6809E', 'YM2151', 'OKIM6295', 'AD7524']) {
  assert.ok(devices.includes(type), `${type} is part of the T-Unit ADPCM board`);
}
// The driver reaches the sound board through `required_device<williams_adpcm_sound_device>`;
// both calls it makes must lower, keyed by that finder spelling.
for (const method of ['write', 'reset_write']) {
  assert.ok(graph.edges.some(edge => edge.rel === 'CALLS_HANDLER' &&
    edge.to === `handler:williams_adpcm_sound_device.${method}` &&
    edge.props?.finder === `m_adpcm_sound.${method}`), `m_adpcm_sound->${method}`);
}
// init_mktunit: protection on the main CPU (bit addresses) and hidden RAM on
// the sound board's own CPU.
const game = graph.nodes.find(node => node.label === 'Game' && node.props.name === 'mk');
const installs = ((game?.props.installedHandlers as string[] | undefined) ?? []).map(value => JSON.parse(value));
assert.deepEqual(installs.map(install => [install.kind, install.cpu, install.start, install.end]), [
  ['read', 'maincpu', 0x1b00000, 0x1b6ffff],
  ['write', 'maincpu', 0x1b00000, 0x1b6ffff],
  ['ram', 'adpcm:cpu', 0xfb9c, 0xfbc6],
]);

console.log('mk.game.spec: T-Unit devices, typed sound-board finder and init installs passed');
