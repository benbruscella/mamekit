import assert from 'node:assert/strict';
import { compileDeviceRomProgram } from '../mame/driver-init-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { upndown } from './upndown.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

// This is a source-extraction regression while the System 1 sound handshake
// is still being completed; it intentionally does not claim an acceptance
// golden for a machine whose two PSGs remain muted.
const graph = gameSourceGraph(upndown);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === upndown.machine.className &&
  node.props.name === upndown.machine.name);
assert.ok(machine);
assert.match((machine.props.devicePatches as string[]).join('\n'), /SEGA_315_5098/);
const cpu = graph.nodes.find(node => node.label === 'Device' && node.props.type === 'SEGA_315_5098');
assert.ok(cpu);
const decrypt = compileDeviceRomProgram(
  mameSourceRoot(), indexMameHardware(mameSourceRoot()).get('SEGA_315_5098')!,
  (cpu.props.config as string[]).map(String), { tag: 'maincpu', opcodeRegion: 'decrypted_opcodes', opcodeSize: 0x8000 },
);
assert.equal(decrypt?.method, 'device_reset');
assert.deepEqual(decrypt?.helpers.map(helper => helper.method).sort(), ['decode', 'decrypt']);
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'SN76489A'));

console.log('upndown.spec: encrypted Sega Z80, opcode map and dual SN76489 passed');
