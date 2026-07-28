import assert from 'node:assert/strict';
import type { BoardIr } from './board.ts';
import { validateBoardIr } from './validate.ts';
import { BOARD_IR_SCHEMA_VERSION } from './version.ts';

let passed = 0;
const check = (name: string, run: () => void): void => { run(); passed++; void name; };

function board(overrides: Partial<BoardIr> = {}): BoardIr {
  return {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    game: 'fixture',
    family: 'fixture',
    driverFile: 'src/mame/fixture.cpp',
    callbacks: [],
    connections: [],
    devices: [{ id: 'device:maincpu', tag: 'maincpu', type: 'Z80' }],
    execution: {
      cpus: [{ tag: 'maincpu', clock: 1_000_000, region: 'maincpu' }],
      screen: { width: 256, height: 224, refresh: 60, vtotal: 256, vbstart: 240, rotate: 0 },
      frameEvents: [],
    },
    ...overrides,
  };
}

const paths = (ir: BoardIr): string[] => validateBoardIr(ir).map(d => d.path);
const messages = (ir: BoardIr): string => validateBoardIr(ir).map(d => d.message).join('\n');

check('a consistent board produces no diagnostics', () => {
  assert.deepEqual(validateBoardIr(board()), []);
});

check('duplicate device tags are rejected', () => {
  const ir = board({
    devices: [
      { id: 'a', tag: 'latch', type: 'LS259' },
      { id: 'b', tag: 'latch', type: 'LS259' },
      { id: 'device:maincpu', tag: 'maincpu', type: 'Z80' },
    ],
  });
  assert.match(messages(ir), /duplicate device tag "latch"/);
});

// The CPU list and the device list describe the same chips. When they disagree,
// interrupts get wired to a tag that does not exist anywhere else.
check('a CPU with no device entry is rejected', () => {
  const ir = board({ devices: [] });
  assert.match(messages(ir), /CPU "maincpu" has no matching device entry/);
});

check('a callback owned by nothing on the board is rejected', () => {
  const ir = board({
    callbacks: [{
      id: 'c0', ownerTag: 'ghost', signal: 'q_out_cb', operation: 'set',
      targetClass: 'fixture_state', targetMethod: 'irq_w',
    }],
  });
  assert.match(messages(ir), /callback owner "ghost" is not a declared device, CPU or timer/);
});

// A MAME timer_device is declared by the callback that schedules it, so it owns
// itself rather than appearing in the machine config's device list.
check('a timer owns itself', () => {
  const ir = board({
    callbacks: [{
      id: 'c0', ownerTag: 'irq_timer', signal: 'timer', operation: 'adjust',
      targetClass: 'fixture_state', targetMethod: 'tick',
    }],
  });
  assert.deepEqual(validateBoardIr(ir), []);
});

// The bug this whole boundary exists to catch: a connection MAME declared that
// reaches nothing must fail generation rather than be dropped at run time.
check('a callback that names no target is rejected', () => {
  const ir = board({
    callbacks: [{ id: 'c0', ownerTag: 'maincpu', signal: 'q_out_cb', operation: 'set' }],
  });
  assert.match(messages(ir), /names no target and is not declared unconnected/);
});

// MAME .set_nop() is a statement about the hardware, not a hole in generation.
check('an explicitly unconnected output is accepted', () => {
  const ir = board({
    callbacks: [{ id: 'c0', ownerTag: 'maincpu', signal: 'q_out_cb', operation: 'set_nop' }],
  });
  assert.deepEqual(validateBoardIr(ir), []);
});

check('a callback aimed at an undeclared device is rejected', () => {
  const ir = board({
    callbacks: [{
      id: 'c0', ownerTag: 'maincpu', signal: 'q_out_cb', operation: 'set',
      targetTag: 'ghost', targetMethod: 'write',
    }],
  });
  assert.match(messages(ir), /callback target "ghost" is not a declared device or CPU/);
});

// set_ioport repeats the port name in targetTag; targetPort is authoritative.
check('a port-directed callback does not constrain the device tags', () => {
  const ir = board({
    callbacks: [{
      id: 'c0', ownerTag: 'maincpu', signal: 'input_callback', operation: 'set_ioport',
      targetTag: 'IN0', targetPort: 'IN0',
    }],
  });
  assert.deepEqual(validateBoardIr(ir), []);
});

check('duplicate callback ids are rejected', () => {
  const shared = {
    ownerTag: 'maincpu', signal: 'q_out_cb', operation: 'set_nop' as const,
  };
  const ir = board({ callbacks: [{ id: 'c0', ...shared }, { id: 'c0', ...shared }] });
  assert.match(messages(ir), /duplicate callback id "c0"/);
});

check('a frame event naming an unknown callback is rejected', () => {
  const ir = board({
    execution: {
      ...board().execution,
      frameEvents: [{ callbackId: 'absent', ownerTag: 'screen', signal: 'vblank', line: 240, state: 1 }],
    },
  });
  assert.deepEqual(paths(ir), ['execution.frameEvents[0].callbackId']);
});

check('a range mapping an unconfigured bank is rejected', () => {
  const ir = board({
    execution: {
      ...board().execution,
      cpus: [{
        tag: 'maincpu', clock: 1, region: 'maincpu',
        ranges: [{ start: 0x4000, end: 0x5fff, kind: 'handler', read: 'bank.bank1' }],
      }],
    },
  });
  assert.match(messages(ir), /maps bank "bank1", which the board does not configure/);
});

check('a range outside the address space is rejected', () => {
  const ir = board({
    execution: {
      ...board().execution,
      cpus: [{
        tag: 'maincpu', clock: 1, region: 'maincpu', mask: 0x7fff,
        ranges: [{ start: 0, end: 0xffff, kind: 'rom' }],
      }],
    },
  });
  assert.match(messages(ir), /outside the 0x7fff address space/);
});

check('an ungenerated screen update handler is rejected', () => {
  const ir = board({
    execution: { ...board().execution, screenUpdate: { handler: 'fixture_state.screen_update' } },
  });
  assert.deepEqual(paths(ir), ['execution.screenUpdate.handler']);
});

check('a custom input port naming an ungenerated handler is rejected', () => {
  const ir = board({
    execution: {
      ...board().execution,
      customs: [{ port: 'IN0', mask: 0x30, member: 'absent_r' }],
    },
  });
  assert.match(messages(ir), /which was not generated/);
});

check('an audio route with no destination is rejected', () => {
  const ir = board({
    sound: {
      kind: 'ay8910', deviceTag: 'aysnd', deviceType: 'AY8910',
      writeMethods: [], enableMethods: [], controlOffset: 0,
      routes: [{ chip: 0, channel: 0, gain: 1, target: '' }],
    },
  });
  assert.deepEqual(paths(ir), ['sound.routes[0].target']);
});

console.log(`validate.spec: ${passed} passed, 0 failed`);
