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
assert.deepEqual(runner.cyclesAhead, [0]);

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

// MAME scheduler().synchronize() from inside a slice. The posting processor
// stops after its instruction, the processors behind it run only up to where
// it stopped, the posted work runs, and the round resumes. Nobody observes the
// work before the time it was posted, and nobody loses cycles.
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
  let posted = false;
  let runner!: GeneratedFrameRunner;
  runner = new GeneratedFrameRunner({
    machine: twoCpu,
    onSynchronize: () => { if (posted) { order.push('sync'); posted = false; } },
    processors: ['maincpu', 'sound'].map(tag => ({
      tag,
      run: (budget: number) => {
        order.push(`${tag}:${budget}`);
        // The main CPU synchronizes a quarter of the way into its first slice.
        if (tag === 'maincpu' && ran.maincpu === 0) {
          posted = true;
          assert.equal(runner.requestSynchronize(), true, 'a running slice is ended');
          ran[tag]! += 500;
          return 500;
        }
        ran[tag]! += budget;
        return budget;
      },
    })),
  });
  assert.equal(runner.requestSynchronize(), false, 'outside a slice the work is already due');
  runner.frame(new Uint32Array(1));
  // 60 kHz across three lines at 10 Hz is 2000 cycles per processor per line.
  assert.deepEqual(
    order,
    ['maincpu:2000', 'sound:500', 'sync', 'maincpu:1500', 'sound:1500',
      'maincpu:2000', 'sound:2000', 'maincpu:2000', 'sound:2000'],
    'the other processor catches up to the synchronize, then the round resumes',
  );
  assert.equal(ran.maincpu, 6000, 'the posting processor keeps its own budget');
  assert.equal(ran.sound, 6000, 'a synchronize moves when a processor runs, never how much');
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

// A perfect_quantum window runs the processors in lockstep for as long as the
// source asks for, without running anyone from inside the caller's slice.
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
  // 63 us. This board reports no timer at all, so the schedule keeps the
  // empirical 250 us bound (UNTIMED_QUANTUM_SECONDS) rather than running to
  // the next event a whole frame away.
  assert.deepEqual(
    slices.slice(0, 2),
    [300, 300],
    'a board with no timers keeps the untimed bound',
  );
  assert.equal(
    slices.reduce((total, slice) => total + slice, 0),
    26_400,
    'the frame is worth the same cycles however it is divided',
  );
  slices.length = 0;
  runner.quantumWindow(0.0001);
  runner.frame(new Uint32Array(1));
  // 100 us is 1.584 lines: 158 single instructions, then the rest of line 1.
  assert.deepEqual(
    slices.slice(0, 158),
    new Array(158).fill(1),
    'the window runs one instruction at a time for as long as it lasts',
  );
  assert.ok(
    slices[158]! >= 41 && slices[158]! <= 42 && slices[159]! >= 300,
    `then the quantum reopens: ${slices.slice(158, 160)}`,
  );
  assert.equal(
    slices.reduce((total, slice) => total + slice, 0),
    26_400,
    'the window changes how the frame is divided, never what it is worth',
  );
}

// Every round starts with MAME's apply_suspend_changes, and inside a
// perfect_quantum window every instruction is a round.
{
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
  const order: string[] = [];
  const runner = new GeneratedFrameRunner({
    machine: idle,
    processors: [{ tag: 'maincpu', run: (budget: number) => { order.push(`run ${budget}`); return budget; } }],
    onRound: () => order.push('round'),
  });
  runner.frame(new Uint32Array(1));
  // 300 truncated cycles stop 39 attoseconds short of the lines, which ends
  // the round there, and the next is under a cycle long: nothing runs in it.
  assert.deepEqual(order.slice(0, 5), ['round', 'run 300', 'round', 'round', 'run 300'], 'a round starts each slice');
  order.length = 0;
  runner.quantumWindow(0.0001);
  runner.frame(new Uint32Array(1));
  assert.deepEqual(order.slice(0, 5), ['round', 'round', 'run 1', 'round', 'run 1'],
    'and each instruction of the window');
}

// MAME's round rules (schedule.cpp timeslice): no round is longer than the
// machine's quantum, each processor runs whole cycles and one left short ends
// the round there for the rest, a suspended device runs after the active
// ones, and a perfect_quantum window's rounds are the perfect interleave long.
{
  // A line is 1/6000 s: 100 cycles of `fast`, 10 of `slow`.
  const quantumMachine: BoardIr = {
    ...machine,
    callbacks: [],
    execution: {
      ...machine.execution,
      cpus: [
        { tag: 'fast', type: 'z80', clock: 600_000, region: 'fast' },
        { tag: 'slow', type: 'z80', clock: 60_000, region: 'slow' },
      ],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 100, vbstart: 99, rotate: 0 },
      frameEvents: [],
    },
  };
  const slices: string[] = [];
  let suspended: 'eating' | undefined;
  const processor = (tag: string) => ({
    tag,
    run: (budget: number) => { slices.push(`${tag} ${budget}`); return budget; },
    ...(tag === 'fast' ? { suspended: () => suspended } : {}),
  });
  const runner = new GeneratedFrameRunner({
    machine: quantumMachine,
    processors: [processor('fast'), processor('slow')],
    maximumQuantum: 1 / 24_000,
    perfectInterleave: () => 1 / 600_000,
  });
  runner.frame(new Uint32Array(1));
  assert.deepEqual(slices.slice(0, 4), ['fast 25', 'slow 2', 'fast 20', 'slow 2'],
    'a quarter-line quantum; slow\'s second whole cycle ends the first round at 0.2 lines');

  slices.length = 0;
  suspended = 'eating';
  runner.frame(new Uint32Array(1));
  assert.equal(slices[0]!.split(' ')[0], 'slow', 'a suspended device runs after the active ones');

  slices.length = 0;
  suspended = undefined;
  runner.quantumWindow(1 / 6000);
  runner.frame(new Uint32Array(1));
  assert.deepEqual(slices.slice(0, 3), ['fast 1', 'fast 1', 'fast 1'],
    'inside the window a round is the perfect interleave: one fast cycle');

  // A round also ends at the soonest device timer, and the board hears where
  // every processor stands once the round is run.
  slices.length = 0;
  const ends: number[] = [];
  const timerRunner = new GeneratedFrameRunner({
    machine: quantumMachine,
    processors: [processor('fast')],
    nextTimerSeconds: () => 0.15 / (quantumMachine.execution.screen.refresh * quantumMachine.execution.screen.vtotal),
    onRoundEnd: line => ends.push(line),
  });
  timerRunner.frame(new Uint32Array(1));
  assert.deepEqual(slices.slice(0, 3), ['fast 15', 'fast 15', 'fast 15'], 'a round ends at a timer 0.15 lines on');
  assert.ok(Math.abs(ends[1]! - ends[0]! - 0.15) < 1e-9, 'and the board is told the round\'s end line');
}

// A video/DMA device can be a first-class execute participant without being
// mislabeled as a CPU or supplying its clock through a handwritten adapter.
{
  let deviceCycles = 0;
  const participantMachine: BoardIr = {
    ...machine,
    execution: {
      ...machine.execution,
      participants: [
        { tag: 'maincpu', kind: 'cpu', clock: 600 },
        { tag: 'vic', kind: 'device', clock: 300, stallTargets: ['maincpu'], arbitration: 'source-callback' },
      ],
    },
  };
  new GeneratedFrameRunner({
    machine: participantMachine,
    processors: [{ tag: 'vic', run: budget => { deviceCycles += budget; return budget; } }],
  }).frame(new Uint32Array(1));
  assert.equal(deviceCycles, 30, 'non-CPU participant receives its source clock budget');
}

// MAME's screen starts at the beginning of VBLANK and its frames run from one
// VBLANK to the next, presented at the end: here lines 2, 0, 1 of 3, the
// picture taken when the beam comes back to line 2. Nothing fires on the
// origin line the first time: MAME arms its first VBLANK a frame out. A reset
// starts there again (#184).
{
  let cycles = 0;
  const lines: number[] = [];
  const events: string[] = [];
  const origins: boolean[] = [];
  const timeline: string[] = [];
  const runner = new GeneratedFrameRunner({
    machine,
    origin: 'vbstart',
    processors: [{ tag: 'maincpu', run: budget => { cycles += budget; timeline.push('cpu'); return budget; } }],
    video: { width: 1, height: 1, render: () => { timeline.push('render'); }, vblank: () => { timeline.push('vblank'); } },
    onLine: (line, phase) => {
      if (phase !== 'before-processors') return;
      lines.push(line);
      origins.push(runner.atOrigin);
    },
    onEvent: event => events.push(event.callbackId),
  });
  assert.equal(runner.originLine, 2);
  runner.frame(new Uint32Array(1));
  assert.deepEqual(lines, [2, 0, 1]);
  assert.deepEqual(origins, [true, false, false]);
  assert.equal(cycles, 60);
  assert.deepEqual(events, [], 'no VBLANK at the origin');
  assert.equal(timeline.at(-1), 'render', 'presented when the beam is back at vbstart');
  assert.equal(runner.frameCount, 1);
  lines.length = 0;
  timeline.length = 0;
  runner.frame(new Uint32Array(1));
  assert.deepEqual(lines, [2, 0, 1]);
  assert.deepEqual(events, ['callback:vblank']);
  assert.equal(timeline.filter(entry => entry === 'render').length, 1);
  assert.equal(timeline.indexOf('vblank') < timeline.indexOf('render'), true);
  runner.reset();
  origins.length = 0;
  runner.frame(new Uint32Array(1));
  assert.deepEqual(origins, [true, false, false]);
}

// The running processor's place in the frame is its own position, measured
// from the origin. 4-cycle instructions against 10-cycle lines overrun every
// round, and the next slice starts where that one stopped, so each instruction
// lands 0.4 lines after the last: across rounds of 10 lines, the one-line
// boundary rounds (lines 300 and 399) and the wrap from 399 to 0, never
// backwards. Stamped with the round's progress instead, Mat Mania's DAC writes
// bunched into a round's last line and jumped, and Gyruss's i8039 stepped back
// at every seam into a one-line round (#194).
{
  const fixture: BoardIr = {
    ...machine,
    callbacks: [],
    execution: {
      cpus: [{ tag: 'soundcpu', type: 'm6502', clock: 400_000, region: 'soundcpu' }],
      screen: { width: 1, height: 1, refresh: 100, vtotal: 400, vbstart: 300, rotate: 0 },
      frameEvents: [],
    },
  };
  const stamps: (number | undefined)[] = [];
  const budgets: number[] = [];
  const runner: GeneratedFrameRunner = new GeneratedFrameRunner({
    machine: fixture,
    origin: 'vbstart',
    processors: [{ tag: 'soundcpu', run: budget => {
      budgets.push(budget);
      let elapsed = 0;
      for (; elapsed < budget; elapsed += 4) stamps.push(runner.runningFrameLines(elapsed));
      return elapsed;
    } }],
  });
  runner.frame(new Uint32Array(1));
  assert.ok(budgets.some(budget => budget >= 96), 'rounds of 10 lines');
  assert.ok(budgets.some(budget => budget <= 10), 'one-line rounds');
  assert.equal(stamps.length, 1000);
  stamps.forEach((at, index) => {
    assert.ok(at !== undefined && Math.abs(at - index * 0.4) < 1e-9, `instruction ${index} at ${at}`);
  });
  assert.equal(runner.runningFrameLines(0), undefined, 'outside a slice');
}

// A line's events fire where the beam reaches it, before the processors run
// the line. MAME raises Donkey Kong's VBLANK NMI at the start of line 240,
// which under MAME's origin is where each frame begins; delivered after the
// line instead, every board's VBLANK came 192 cycles late (#214).
{
  const timeline: string[] = [];
  const runner = new GeneratedFrameRunner({
    machine,
    origin: 'vbstart',
    processors: [{ tag: 'maincpu', run: budget => {
      // Truncated cycles stand a few attoseconds either side of a line.
      timeline.push(`cpu ${Math.round(runner.runningFrameLines(0)! * 1e6) / 1e6}`);
      return budget;
    } }],
    onEvent: event => timeline.push(event.callbackId),
  });
  runner.frame(new Uint32Array(1));
  runner.frame(new Uint32Array(1));
  // Nothing fires on the origin line at time zero; a frame later VBLANK comes
  // first, at the frame's start.
  assert.deepEqual(timeline, [
    'cpu 0', 'cpu 1', 'cpu 2',
    'callback:vblank', 'cpu 0', 'cpu 1', 'cpu 2',
  ]);
}

console.log('generated-frame.spec: 21 passed');
