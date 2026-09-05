// Emitted board-handler JavaScript must mean exactly what the interpreter
// means. The interpreter is the semantic reference; codegen is an optimisation
// that has to prove it agrees, so every case here runs one lowered program both
// ways and compares the observable result and the state left behind.

import assert from 'node:assert/strict';
import { executeGeneratedMachineProgram, type GeneratedHandlerBindings } from '../ir/execute.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import type { BoardIr, GeneratedHandler } from '../ir/board.ts';
import { generatedBoardHandlersSource } from './emit-handler-codegen.ts';

function board(handlers: GeneratedHandler[], shares: string[] = []): BoardIr {
  return {
    schemaVersion: 4,
    game: 'test',
    family: 'test',
    driverFile: 'src/mame/test/test.cpp',
    callbacks: [],
    connections: [],
    execution: {
      cpus: [{
        tag: 'maincpu',
        type: 'Z80',
        clock: 4_000_000,
        ranges: shares.map((share, index) => ({
          start: index * 0x100,
          end: index * 0x100 + 0xff,
          kind: 'ram' as const,
          share,
        })),
      }],
      screen: { width: 8, height: 8, vtotal: 8, refresh: 60 },
      frameEvents: [],
    },
    handlers,
  } as unknown as BoardIr;
}

function handler(
  method: string,
  parameters: string,
  body: string,
  ownerClass = 'test_state',
): GeneratedHandler {
  const program = compileMameHandler(body);
  assert.deepEqual(program.diagnostics, [], `${method}: ${program.diagnostics.join('; ')}`);
  return {
    id: `handler:${method}`,
    ownerClass,
    method,
    parameters,
    program,
    source: { file: 'src/mame/test/test.cpp', line: 1 },
  };
}

/** Run one handler through the interpreter and through emitted code. */
function bothWays(
  machine: BoardIr,
  target: GeneratedHandler,
  makeBindings: () => GeneratedHandlerBindings,
  args: Record<string, unknown> = {},
): { interpreted: unknown; compiled: unknown; states: [unknown, unknown] } {
  const emitted = generatedBoardHandlersSource(machine);
  assert.ok(
    emitted.handlers.includes(`${target.ownerClass}.${target.method}`),
    `${target.method} was not selected for codegen (got ${emitted.handlers.join(', ') || 'none'})`,
  );

  const interpretedBindings = makeBindings();
  const interpreted = executeGeneratedMachineProgram(
    { ...machine, compiledHandlers: undefined },
    target,
    interpretedBindings,
    args,
  ).value;

  const compiledHandlers = (0, eval)(`(${emitted.source})`) as BoardIr['compiledHandlers'];
  const compiledBindings = makeBindings();
  const compiled = executeGeneratedMachineProgram(
    { ...machine, compiledHandlers },
    target,
    compiledBindings,
    args,
  ).value;

  return {
    interpreted,
    compiled,
    states: [interpretedBindings.members, compiledBindings.members],
  };
}

// A nested loop over shared memory: the shape that makes a renderer expensive,
// and the reason this emitter exists at all.
{
  const fill = handler(
    'fill_rows',
    'int rows',
    `for (int y = 0; y < rows; y++)
       for (int x = 0; x < 8; x++)
         m_videoram[y * 8 + x] = (y * 8 + x) & 0xff;`,
  );
  const machine = board([fill], ['videoram']);
  const makeBindings = (): GeneratedHandlerBindings => ({
    members: { m_videoram: new Uint8Array(64) },
    calls: {},
  });
  const { states } = bothWays(machine, fill, makeBindings, { rows: 8 });
  const [interpreted, compiled] = states as [
    { m_videoram: Uint8Array },
    { m_videoram: Uint8Array },
  ];
  assert.deepEqual([...compiled.m_videoram], [...interpreted.m_videoram]);
  assert.equal(compiled.m_videoram[63], 63);
}

// MAME's own macros must expand to the same values the interpreter computes,
// including BIT's field form and the fixed-width narrowings.
{
  const bits = handler(
    'pack_bits',
    'int seed',
    `for (int i = 0; i < 16; i++)
     {
       uint8_t v = (uint8_t)(seed + i);
       for (int j = 0; j < 4; j++)
         m_out[i * 4 + j] = BIT(v, j * 2, 2);
     }`,
  );
  const machine = board([bits], ['out']);
  const makeBindings = (): GeneratedHandlerBindings => ({
    members: { m_out: new Uint8Array(64) },
    calls: {},
  });
  const { states } = bothWays(machine, bits, makeBindings, { seed: 0x5a });
  const [interpreted, compiled] = states as [
    { m_out: Uint8Array },
    { m_out: Uint8Array },
  ];
  assert.deepEqual([...compiled.m_out], [...interpreted.m_out]);
}

// A switch inside the loop, and a host call the emitter cannot resolve
// statically: both sides must reach the same board binding the same number of
// times, because a renderer's calls are its observable behaviour.
{
  const drawn: number[] = [];
  const draw = handler(
    'draw',
    'int count',
    `for (int i = 0; i < count; i++)
     {
       int mode = i & 3;
       int value = 0;
       switch (mode)
       {
       case 0:
         value = 1;
         break;
       case 1:
         value = 2;
         break;
       default:
         value = 3;
         break;
       }
       for (int j = 0; j < 2; j++)
         plot(i, value + j);
     }`,
  );
  const machine = board([draw]);
  const makeBindings = (): GeneratedHandlerBindings => ({
    members: {},
    calls: { plot: (index: number, value: number) => { drawn.push(index, value); return 0; } },
  });
  const before = drawn.length;
  bothWays(machine, draw, makeBindings, { count: 9 });
  const half = (drawn.length - before) / 2;
  assert.ok(half > 0, 'the handler made no calls');
  assert.deepEqual(
    drawn.slice(before + half),
    drawn.slice(before, before + half),
    'emitted code called the board differently from the interpreter',
  );
}

// MAME reads every framework value through a call — `pixmap.width()` — while
// the runtime models some of those surfaces as data and others as methods.
// Both execution paths must let the value decide, or a renderer's mask comes
// out as -1 and it samples past the end of every source row (Zaxxon's
// background). This is also the case that used to keep such a handler
// interpreted, so it doubles as proof that it is now selected.
{
  const sample = handler(
    'sample_rows',
    'int rows, bitmap_ind16 &source',
    `int xmask = source.width() - 1;
     int ymask = source.height() - 1;
     for (int y = 0; y < rows; y++)
       for (int x = 0; x < 8; x++)
         m_videoram[y * 8 + x] = ((y + 6) & ymask) * 4 + ((x + 6) & xmask);`,
  );
  const machine = board([sample], ['videoram']);
  const makeBindings = (): GeneratedHandlerBindings => ({
    members: { m_videoram: new Uint8Array(64) },
    calls: {},
  });
  // `width` is a plain field and `height` a method: one object, both spellings.
  const source = { width: 4, height: (): number => 4 };
  const { states } = bothWays(machine, sample, makeBindings, { rows: 8, source });
  const [interpreted, compiled] = states as [
    { m_videoram: Uint8Array },
    { m_videoram: Uint8Array },
  ];
  assert.deepEqual([...compiled.m_videoram], [...interpreted.m_videoram]);
  // (0 + 6) & 3 == 2 on both axes, so a live mask reaches 2 * 4 + 2.
  assert.equal(compiled.m_videoram[0], 10);
}

// Selection is a property of the IR. A flat handler stays on the interpreter
// however hot it might be, so nothing gains emitted code by accident.
{
  const flat = handler('latch_w', 'uint8_t data', 'm_latch = data;');
  const emitted = generatedBoardHandlersSource(board([flat]));
  assert.deepEqual(emitted.handlers, []);
  assert.equal(emitted.source, '{}');
}


// An uncomposed chip must not redirect its register writes into a same-named
// board handler. On C64 that corrupted zero-page pointers during music playback.
{
  const update = handler('update', '', `
    for (int y = 0; y < 2; y++)
      for (int x = 0; x < 2; x++) m_sound->write(x, 0x5a);
  `);
  const write = handler('write', 'int offset, int data', 'm_wrong_write = data;');
  const machine = board([update, write]);
  machine.devices = [{ id: 'device:sound', tag: 'sound', type: 'TEST_SOUND', member: 'm_sound' }];
  const result = bothWays(machine, update, () => ({ members: {} }));
  assert.deepEqual(result.states, [{}, {}],
    'interpreted and compiled hardware calls must preserve the receiver when its core is absent');
}

console.log('emit-handler-codegen.spec: emitted board handlers match the interpreter');
