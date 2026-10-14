import assert from 'node:assert/strict';
import type { BoardIr } from './board.ts';
import { boardConfigFromIr, type BoardConfig } from './host-config.ts';
import { BOARD_IR_SCHEMA_VERSION } from './version.ts';
const cpu = { tag: 'maincpu', region: 'maincpu', type: 'Z80', clock: 4_000_000, ranges: [] };
const screen = { width: 256, height: 224, refresh: 60, vtotal: 264, vbstart: 224, rotate: 0 };
const machine: BoardIr = { schemaVersion: BOARD_IR_SCHEMA_VERSION, game: 'fixture', family: 'fixture',
  driverFile: 'fixture.cpp', callbacks: [], connections: [], execution: { cpus: [cpu], screen, frameEvents: [] } };
const host: BoardConfig = { family: 'stale', cpus: [{ ...cpu, clock: 1 }], ranges: [],
  screen: { ...screen, width: 1 }, clocks: { namco06: 0, wsg: 0 }, cart: { mapper: 4 } };
const view = boardConfigFromIr(machine, host);
assert.equal(view.cpus, machine.execution.cpus);
assert.equal(view.screen, machine.execution.screen);
assert.equal(view.cpus[0]!.clock, 4_000_000);
assert.equal(view.cart, host.cart);
assert.equal(host.screen.width, 1, 'the persisted host configuration is not mutated');
console.log('host-config.spec: composition uses canonical machine facts and retains mounting options');
