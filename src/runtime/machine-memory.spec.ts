import assert from 'node:assert/strict';
import { createMachineMemory } from './machine-memory.ts';
import type { MemoryRecord } from './memorystore.ts';
import type { Board, HiscoreTable, MachineState } from './types.ts';

// A board with one NVRAM share and one CPU whose program space is a flat
// 64 KB of RAM: everything the keeper touches, nothing it must not know.
function fakeBoard(): Board & { ram: Uint8Array; nvram: Uint8Array } {
  const ram = new Uint8Array(0x10000);
  const nvram = new Uint8Array(0x100);
  return {
    ram, nvram,
    fbWidth: 1, fbHeight: 1,
    frame() {}, reset() {},
    snapshot: () => ({ frame: 0, cpus: [] }),
    save: () => ({ format: 1, game: 'fake', frame: 0, regions: {}, shares: {}, roots: {} }) as MachineState,
    load() {},
    persistentMemory: () => [{ kind: 'share', tag: 'nvram', bytes: nvram }],
    memory: row => row.share === 'work' ? undefined
      : row.cpu === 'maincpu' && row.space === 'program'
        ? { read: address => ram[address] ?? 0, write: (address, value) => { ram[address] = value; } }
        : undefined,
  };
}

const table: HiscoreTable = {
  rows: [
    { cpu: 'maincpu', space: 'program', address: 0x4e88, length: 4, first: 0x00, last: 0x00 },
    { cpu: 'maincpu', space: 'program', address: 0x43ed, length: 2, first: 0x40, last: 0x40, fill: 0xee },
  ],
};
const REFRESH = 60;

// --- cold boot: nothing stored, the game initialises, a score is earned ------
{
  const board = fakeBoard();
  const writes: MemoryRecord[] = [];
  const memory = createMachineMemory({ board, game: 'fake', refresh: REFRESH, table, write: record => writes.push(record) });
  assert.equal(memory.hiscoreRows, 2);
  assert.deepEqual([...board.ram.subarray(0x43ed, 0x43ef)], [0xee, 0xee], 'a fill byte is written at reset, before the game runs');
  assert.deepEqual(memory.restore(null), { nvram: [], hiscorePending: false });

  memory.tick();
  assert.equal(memory.hiscoreArmed(), false, 'sentinels are not in place yet');
  board.ram.set([0x00, 0x00, 0x00, 0x00], 0x4e88); // the game clears its table...
  board.ram.set([0x40, 0x40], 0x43ed);             // ...and its sentinels
  memory.tick();
  assert.equal(memory.hiscoreArmed(), true);
  assert.equal(writes.length, 0, 'the game\'s own defaults are never worth writing');

  board.ram.set([0x00, 0x50, 0x12, 0x00], 0x4e88); // a score
  memory.tick();
  assert.equal(writes.length, 1, 'the first change is written at once, as the plugin\'s last_write_time = -10 allows');
  assert.deepEqual(writes[0]!.hiscore!.map(row => [...row]), [[0x00, 0x50, 0x12, 0x00], [0x40, 0x40]]);
  assert.deepEqual(Object.keys(writes[0]!.shares), ['nvram']);

  board.ram[0x4e8a] = 0x34; // a second score, straight after
  for (let frame = 0; frame < 3 * REFRESH; frame++) memory.tick();
  assert.equal(writes.length, 1, 'the plugin\'s 5 s grace spaces consecutive writes');
  for (let frame = 0; frame < 3 * REFRESH; frame++) memory.tick();
  assert.equal(writes.length, 2, 'written once the grace passed');
  assert.equal(writes[1]!.hiscore![0]![2], 0x34);

  for (let frame = 0; frame < 6 * REFRESH; frame++) memory.tick();
  assert.equal(writes.length, 2, 'an unchanged table is not rewritten');

  // NVRAM: polled once a second, written when it moved.
  board.nvram[3] = 0x77;
  memory.tick();
  assert.equal(writes.length, 2, 'not on the very frame');
  for (let frame = 0; frame < REFRESH; frame++) memory.tick();
  assert.equal(writes.length, 3);
  assert.equal(writes[2]!.shares.nvram![3], 0x77);
  assert.notEqual(writes[2]!.shares.nvram, board.nvram, 'a copy, not the live buffer');

  // flush: the pagehide path writes a changed table without waiting.
  board.ram[0x4e89] = 0x99;
  memory.flush();
  assert.equal(writes.length, 4);
  assert.equal(writes[3]!.hiscore![0]![1], 0x99);
  memory.flush();
  assert.equal(writes.length, 4, 'nothing changed since');

  // reset: the table is re-armed and the fill re-applied; the game's fresh
  // defaults do not overwrite the image already kept.
  memory.reset();
  assert.equal(memory.hiscoreArmed(), false);
  assert.deepEqual([...board.ram.subarray(0x43ed, 0x43ef)], [0xee, 0xee]);
  board.ram.set([0, 0, 0, 0], 0x4e88);
  board.ram.set([0x40, 0x40], 0x43ed);
  memory.tick();
  assert.equal(memory.hiscoreArmed(), true);
  assert.deepEqual([...board.ram.subarray(0x4e88, 0x4e8c)], [0x00, 0x99, 0x34, 0x00], 'the kept image goes back in after a reset, as the plugin does');

  memory.disable();
  board.nvram[0] = 1;
  for (let frame = 0; frame < 2 * REFRESH; frame++) memory.tick();
  memory.flush();
  assert.equal(writes.length, 4, 'disabled: nothing is written');
}

// --- warm boot: a stored record goes in before the first frame -------------
{
  const board = fakeBoard();
  const writes: MemoryRecord[] = [];
  const memory = createMachineMemory({ board, game: 'fake', refresh: REFRESH, table, write: record => writes.push(record) });
  const stored: MemoryRecord = {
    game: 'fake',
    shares: { nvram: Uint8Array.from({ length: 0x100 }, (_, index) => index & 0xff) },
    regions: {},
    hiscore: [Uint8Array.of(0x00, 0x50, 0x12, 0x00), Uint8Array.of(0x40, 0x40)],
    updatedAt: 1,
  };
  assert.deepEqual(memory.restore(stored), { nvram: ['nvram'], hiscorePending: true });
  assert.equal(board.nvram[0xff], 0xff, 'NVRAM is in the machine before its first frame');
  memory.tick();
  assert.equal(memory.hiscoreArmed(), false);
  assert.equal(board.ram[0x4e89], 0, 'not written until the game has initialised its table');
  board.ram.set([0x40, 0x40], 0x43ed);
  memory.tick();
  assert.equal(memory.hiscoreArmed(), true);
  assert.deepEqual([...board.ram.subarray(0x4e88, 0x4e8c)], [0x00, 0x50, 0x12, 0x00], 'the stored table is in the game');
  for (let frame = 0; frame < 10 * REFRESH; frame++) memory.tick();
  assert.equal(writes.length, 0, 'restoring is not a change');
  const written = board.nvram.slice();
  board.nvram[0] = 0xaa;
  memory.flush();
  assert.equal(writes.length, 1);
  assert.deepEqual(writes[0]!.hiscore!.map(row => [...row]), stored.hiscore!.map(row => [...row]), 'an NVRAM write carries the current table too');
  assert.notDeepEqual([...writes[0]!.shares.nvram!], [...written]);
}

// --- what does not fit is left alone, with a warning ---------------------------
{
  const board = fakeBoard();
  const warnings: string[] = [];
  const memory = createMachineMemory({ board, game: 'fake', refresh: REFRESH, table, write: () => {}, warn: message => warnings.push(message) });
  const summary = memory.restore({
    game: 'fake',
    shares: { nvram: new Uint8Array(0x80) },
    regions: {},
    hiscore: [Uint8Array.of(1, 2, 3)],
    updatedAt: 1,
  });
  assert.deepEqual(summary, { nvram: [], hiscorePending: false });
  assert.equal(warnings.length, 2);
  assert.match(warnings[0]!, /128 bytes, the machine's is 256/);
  assert.match(warnings[1]!, /do not fit/);
}

// --- a row the board cannot reach disables the table, not the machine ----------
{
  const board = fakeBoard();
  const warnings: string[] = [];
  const memory = createMachineMemory({
    board, game: 'fake', refresh: REFRESH, write: () => {}, warn: message => warnings.push(message),
    table: { rows: [table.rows[0]!, { cpu: 'maincpu', share: 'work', address: 0, length: 4, first: 0, last: 0 }] },
  });
  assert.equal(memory.hiscoreRows, 0);
  assert.match(warnings[0]!, /share work/);
  assert.deepEqual(memory.nvram.map(memory => memory.tag), ['nvram'], 'NVRAM is unaffected');
}

// --- delay: the plugin's @delay= holds the first check ----------------------
{
  const board = fakeBoard();
  const memory = createMachineMemory({ board, game: 'fake', refresh: REFRESH, write: () => {}, table: { ...table, delaySeconds: 2 } });
  board.ram.set([0x40, 0x40], 0x43ed);
  for (let frame = 0; frame < 2 * REFRESH - 1; frame++) memory.tick();
  assert.equal(memory.hiscoreArmed(), false, 'not before the delay');
  memory.tick();
  assert.equal(memory.hiscoreArmed(), true);
}

console.log('machine-memory.spec: cold boot, warm boot, grace, reset, fit checks and delay passed');
