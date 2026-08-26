import assert from 'node:assert/strict';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import { GeneratedFrameRunner } from './generated-frame.ts';
import type { BoardIr } from '../ir/board.ts';

const machine: BoardIr = {
  schemaVersion: BOARD_IR_SCHEMA_VERSION,
  connections: [],
  game: 'fixture',
  family: 'fixture',
  driverFile: 'fixture.cpp',
  callbacks: [{
    id: 'callback:vblank',
    ownerTag: 'screen',
    signal: 'screen_vblank',
    operation: 'set',
  }],
  execution: {
    cpus: [{ tag: 'maincpu', type: 'z80', clock: 600, region: 'maincpu' }],
    screen: { width: 1, height: 1, refresh: 10, vtotal: 3, vbstart: 2, rotate: 0 },
    frameEvents: [{
      callbackId: 'callback:vblank',
      ownerTag: 'screen',
      signal: 'screen_vblank',
      line: 2,
      state: 1,
    }],
  },
};

let cycles = 0;
let renders = 0;
let vblanks = 0;
const lines: number[] = [];
const events: string[] = [];
const timeline: string[] = [];
const runner = new GeneratedFrameRunner({
  machine,
  processors: [{ tag: 'maincpu', run: budget => {
    cycles += budget;
    timeline.push('cpu');
    return budget;
  } }],
  video: {
    width: 1,
    height: 1,
    render: () => { renders++; timeline.push('render'); },
    vblank: () => { vblanks++; },
  },
  onLine: (line, phase) => {
    if (phase === 'before-processors') lines.push(line);
  },
  onEvent: event => events.push(event.callbackId),
});
runner.frame(new Uint32Array(1));

assert.equal(cycles, 60);
assert.deepEqual(lines, [0, 1, 2]);
assert.deepEqual(events, ['callback:vblank']);
assert.equal(vblanks, 1);
assert.equal(renders, 1);
// MAME presents a frame-mode screen at the start of VBLANK, so the scanlines
// from vbstart (2 here) to vtotal still run their CPU slices after the frame is
// drawn. Deferring the render to the frame boundary samples a game that erases
// and redraws sprites in its VBLANK handler halfway through the update.
assert.deepEqual(timeline, ['cpu', 'cpu', 'render', 'cpu']);
assert.equal(runner.frameCount, 1);

const scanlines: number[] = [];
const scanlineTimeline: string[] = [];
const scanlineMachine: BoardIr = {
  ...machine,
  execution: {
    ...machine.execution,
    screen: { ...machine.execution.screen, updateMode: 'scanline' },
  },
};
new GeneratedFrameRunner({
  machine: scanlineMachine,
  processors: [{ tag: 'maincpu', run: budget => {
    scanlineTimeline.push('cpu');
    return budget;
  } }],
  video: {
    width: 1,
    height: 1,
    render: () => { throw new Error('scanline mode rendered a full frame'); },
    renderLine: (_frame, line) => {
      scanlines.push(line);
      scanlineTimeline.push(`line:${line}`);
    },
    vblank: () => {},
  },
}).frame(new Uint32Array(1));
assert.deepEqual(scanlines, [0, 1, 2]);
assert.deepEqual(scanlineTimeline, ['line:0', 'cpu', 'line:1', 'cpu', 'line:2', 'cpu']);

runner.reset();
assert.equal(runner.frameCount, 0);
assert.deepEqual(runner.currentCarry, [0]);

const periodicMachine: BoardIr = {
  ...machine,
  execution: {
    ...machine.execution,
    frameEvents: [{
      callbackId: 'callback:periodic',
      ownerTag: 'sound',
      signal: 'vck_callback',
      line: 0,
      state: 1,
      frequency: 25,
    }],
  },
};
let periodicCallbacks = 0;
const periodicRunner = new GeneratedFrameRunner({
  machine: periodicMachine,
  processors: [{ tag: 'maincpu', run: budget => budget }],
  onEvent: () => { periodicCallbacks++; },
});
periodicRunner.frame(new Uint32Array(1));
assert.equal(periodicCallbacks, 2);
periodicRunner.frame(new Uint32Array(1));
assert.equal(periodicCallbacks, 5);
periodicRunner.reset();
periodicRunner.frame(new Uint32Array(1));
assert.equal(periodicCallbacks, 7);

// A board whose vbstart lies outside the emulated line range (asteroid ships
// vbstart 1183 with vtotal 300) never reaches the in-loop VBLANK presentation,
// so the end-of-frame fallback must still draw the frame exactly once.
const offscreenTimeline: string[] = [];
const offscreenRunner = new GeneratedFrameRunner({
  machine: {
    ...machine,
    callbacks: [],
    execution: {
      ...machine.execution,
      screen: { ...machine.execution.screen, vtotal: 3, vbstart: 99 },
      frameEvents: [],
    },
  },
  processors: [{ tag: 'maincpu', run: budget => {
    offscreenTimeline.push('cpu');
    return budget;
  } }],
  video: {
    width: 1,
    height: 1,
    render: () => { offscreenTimeline.push('render'); },
    vblank: () => { /* unused */ },
  },
});
offscreenRunner.frame(new Uint32Array(1));
assert.deepEqual(offscreenTimeline, ['cpu', 'cpu', 'cpu', 'render']);

// MAME scheduler::perfect_quantum. A CPU that publishes a value another
// processor must read before it is overwritten cannot wait for the next
// scanline boundary; MCR's Sounds Good command latch presents two nibbles
// inside one slice. The boost runs the others now and charges the cycles
// against their carry, so the total work per frame is unchanged.
{
  const twoCpu: BoardIr = {
    ...machine,
    callbacks: [],
    execution: {
      ...machine.execution,
      cpus: [
        { tag: 'maincpu', type: 'z80', clock: 60_000, region: 'maincpu' },
        { tag: 'sound', type: 'z80', clock: 60_000, region: 'sound' },
      ],
      frameEvents: [],
    },
  };
  const ran: Record<string, number> = { maincpu: 0, sound: 0 };
  const order: string[] = [];
  let boosted = false;
  let runner!: GeneratedFrameRunner;
  runner = new GeneratedFrameRunner({
    machine: twoCpu,
    processors: ['maincpu', 'sound'].map(tag => ({
      tag,
      run: (budget: number) => {
        ran[tag]! += budget;
        order.push(`${tag}:${budget}`);
        // The main CPU publishes something mid-slice, once.
        if (tag === 'maincpu' && !boosted) {
          boosted = true;
          runner.boost('maincpu', 0.005);
        }
        return budget;
      },
    })),
  });
  runner.frame(new Uint32Array(1));
  // 60 kHz across three lines at 10 Hz is 2000 cycles per processor per line;
  // the 1 ms boost is 60 of them.
  assert.deepEqual(
    order,
    ['maincpu:2000', 'sound:60', 'sound:1940', 'maincpu:2000', 'sound:2000',
      'maincpu:2000', 'sound:2000'],
    'the other processor runs at once and repays the borrowed cycles in its own slice',
  );
  assert.equal(ran.maincpu, 6000, 'the boosting processor keeps its own budget');
  assert.equal(ran.sound, 6000, 'a boost moves when a processor runs, never how much');
}

// The quantum is the interval between scheduled events, as MAME's is the
// interval between timers. A board with a scanline timer every two lines hands
// over on those lines and nowhere else, so what a processor does between them
// is atomic as far as the others are concerned — which is what stops a reader
// from seeing each write of a burst separately (gauntlet, issue #88).
{
  const scanTimer: BoardIr = {
    ...machine,
    callbacks: [{
      id: 'callback:scan',
      ownerTag: 'scantimer',
      signal: 'configure_scanline',
      operation: 'configure_scanline',
    }],
    execution: {
      ...machine.execution,
      cpus: [
        { tag: 'maincpu', type: 'z80', clock: 60_000, region: 'maincpu' },
        { tag: 'sound', type: 'z80', clock: 60_000, region: 'sound' },
      ],
      screen: { width: 1, height: 1, refresh: 10, vtotal: 6, vbstart: 5, rotate: 0 },
      frameEvents: [0, 2, 4].map(line => ({
        callbackId: 'callback:scan',
        ownerTag: 'scantimer',
        signal: 'configure_scanline',
        line,
        state: line,
      })),
    },
  };
  const order: string[] = [];
  const runner = new GeneratedFrameRunner({
    machine: scanTimer,
    processors: ['maincpu', 'sound'].map(tag => ({
      tag,
      run: (budget: number) => { order.push(`${tag}:${budget}`); return budget; },
    })),
  });
  runner.frame(new Uint32Array(1));
  // 60 kHz over six lines at 10 Hz is 1000 cycles per line. Events sit on
  // lines 0, 2 and 4, vbstart on 5, and the last line always closes the frame.
  assert.deepEqual(order, [
    'maincpu:1000', 'sound:1000',   // line 0: its own event line
    'maincpu:1000', 'sound:1000',   // line 2: backlog of line 1
    'maincpu:1000', 'sound:1000',   // line 2 itself
    'maincpu:1000', 'sound:1000',   // line 4: backlog of line 3
    'maincpu:1000', 'sound:1000',   // line 4 itself
    'maincpu:1000', 'sound:1000',   // line 5: vbstart and last line
  ], 'processors hand over at scheduled events, not at every scanline');
  assert.equal(
    order.filter(entry => entry.startsWith('maincpu')).length,
    6,
    'six hand-overs across six lines, all of them at a boundary',
  );
}

// A perfect_quantum window drops back to the per-line schedule for as long as
// the source asks for, without running anyone from inside the caller's slice.
{
  // Real screen timing, so the source's own microsecond window is meaningful:
  // 60 Hz over 264 lines is 63 us a line, and MAME's usual request is 100 us.
  const idle: BoardIr = {
    ...machine,
    callbacks: [],
    execution: {
      ...machine.execution,
      cpus: [{ tag: 'maincpu', type: 'z80', clock: 1_584_000, region: 'maincpu' }],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 264, vbstart: 240, rotate: 0 },
      frameEvents: [],
    },
  };
  const slices: number[] = [];
  const runner = new GeneratedFrameRunner({
    machine: idle,
    processors: [{ tag: 'maincpu', run: (budget: number) => { slices.push(budget); return budget; } }],
  });
  runner.frame(new Uint32Array(1));
  // 1,584,000 Hz over 264 lines at 60 Hz is 100 cycles a line, and a line is
  // 63 us, so the one-millisecond bound is 15 of them. This board schedules
  // nothing before vbstart, so that bound is what it runs on.
  assert.deepEqual(
    slices.slice(0, 4),
    [1500, 1500, 1500, 1500],
    'an unscheduled board still hands over at the millisecond bound',
  );
  assert.equal(
    slices.reduce((total, slice) => total + slice, 0),
    26_400,
    'the frame is worth the same cycles however it is divided',
  );
  slices.length = 0;
  runner.quantumWindow(0.0001);
  runner.frame(new Uint32Array(1));
  assert.deepEqual(
    slices.slice(0, 3),
    [100, 100, 1500],
    'the window interleaves per line for as long as it lasts, then reopens',
  );
}

console.log('generated-frame.spec: 17 passed');
