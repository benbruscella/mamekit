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
    cpus: [{ tag: 'maincpu', type: 'z80', clock: 3600, region: 'maincpu' }],
    screen: { width: 1, height: 1, refresh: 60, vtotal: 3, vbstart: 2, rotate: 0 },
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
// Lines 0 and 1 are one round: MAME's timers fall at the start of a line
// (scanline 0, VBLANK at 2), and none at line 1 (#275).
assert.deepEqual(timeline, ['cpu', 'render', 'cpu']);
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

// A periodic timer (`set_periodic_int`) fires every period from reset, on no
// line of its own, and ends the round it expires in: every processor has run
// the whole cycles that fit before the expiry, and none past it. At 150 Hz
// against a 60 Hz screen that is 2.5 a frame, at 24, 48, ... cycles of a
// 3,600 Hz processor.
const periodicMachine: BoardIr = {
  ...machine,
  execution: {
    ...machine.execution,
    frameEvents: [{
      callbackId: 'callback:periodic',
      ownerTag: 'maincpu',
      signal: 'set_periodic_int',
      line: 0,
      state: 1,
      frequency: 150,
      periodAttoseconds: String(10n ** 18n / 150n),
    }],
  },
};
let periodicCallbacks = 0;
let periodicCycles = 0;
const periodicAt: number[] = [];
const periodicRunner = new GeneratedFrameRunner({
  machine: periodicMachine,
  processors: [{ tag: 'maincpu', run: budget => { periodicCycles += budget; return budget; } }],
  onEvent: () => { periodicCallbacks++; periodicAt.push(periodicCycles); },
});
periodicRunner.frame(new Uint32Array(1));
assert.equal(periodicCallbacks, 2);
periodicRunner.frame(new Uint32Array(1));
assert.equal(periodicCallbacks, 5);
// A period is 24 cycles and 18 as (a cycle is truncated to 277,777,777,777,777
// as), so the processor has run 24 whole cycles by each expiry and no more.
assert.deepEqual(periodicAt, [24, 48, 72, 96, 120], 'each expiry ends a round, with the processor stood at it');
periodicRunner.reset();
periodicCycles = 0;
periodicAt.length = 0;
periodicRunner.frame(new Uint32Array(1));
assert.equal(periodicCallbacks, 7);
assert.deepEqual(periodicAt, [24, 48], 'a reset counts the periods again from zero');
// A processor let out of RESET arms its timer again a period from then
// (interface_post_reset), here from the end of the frame at 60 cycles.
periodicRunner.rearmPeriodic('maincpu');
periodicAt.length = 0;
periodicRunner.frame(new Uint32Array(1));
assert.deepEqual(periodicAt, [84, 108], 'a re-armed timer counts from where it was re-armed');
periodicRunner.rearmPeriodic('othercpu');
periodicAt.length = 0;
periodicRunner.frame(new Uint32Array(1));
assert.deepEqual(periodicAt, [132, 156, 180], 'and only its own processor\'s reset re-arms it');

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
// No timer falls inside the frame, only scanline 0's at its start: one round.
assert.deepEqual(offscreenTimeline, ['cpu', 'render']);

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
        { tag: 'maincpu', type: 'z80', clock: 360_000, region: 'maincpu' },
        { tag: 'sound', type: 'z80', clock: 360_000, region: 'sound' },
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
  // Lines 0 and 1 are one round (timers at scanline 0 and VBLANK, line 2).
  assert.deepEqual(
    order,
    ['maincpu:4000', 'sound:500', 'sync', 'maincpu:3500', 'sound:3500',
      'maincpu:2000', 'sound:2000'],
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
        { tag: 'maincpu', type: 'z80', clock: 360_000, region: 'maincpu' },
        { tag: 'sound', type: 'z80', clock: 360_000, region: 'sound' },
      ],
      screen: { width: 1, height: 1, refresh: 60, vtotal: 6, vbstart: 5, rotate: 0 },
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
  // lines 0, 2 and 4 and vbstart on 5, each a timer at the start of its line;
  // the frame closes at the next frame's line 0 (#275).
  assert.deepEqual(order, [
    'maincpu:2000', 'sound:2000',   // lines 0-1, up to line 2's timer
    'maincpu:2000', 'sound:2000',   // lines 2-3, up to line 4's
    'maincpu:1000', 'sound:1000',   // line 4, up to VBLANK at 5
    'maincpu:1000', 'sound:1000',   // line 5, up to the next frame's line 0
  ], 'processors hand over at scheduled events, not at every scanline');
  assert.equal(
    order.filter(entry => entry.startsWith('maincpu')).length,
    4,
    'four hand-overs across six lines, each at a timer',
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
  // 63 us. This board reports no timer of its own, so a round runs to the
  // screen's next one, as MAME's does: VBLANK end and scanline 0 (line 0),
  // VBLANK start (line 240) and the next frame's line 0. Each fires at the
  // start of its line, so a round ends there and not at the line's end.
  assert.deepEqual(
    slices,
    [24_000, 2400],
    'a board with no timers runs from one of the screen\'s timers to the next',
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

// add_quantum with a quantum of its own (Irem M72's 1.5 us for 25 s): rounds
// are no longer than it while it lasts, and the frame is worth the same.
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
  const slices: number[] = [];
  const runner = new GeneratedFrameRunner({
    machine: idle,
    processors: [{ tag: 'maincpu', run: (budget: number) => { slices.push(budget); return budget; } }],
  });
  runner.frame(new Uint32Array(1));
  slices.length = 0;
  // 10 cycles' worth (6.31 us) for longer than a frame.
  runner.addQuantum(10 / 1_584_000, 1);
  runner.frame(new Uint32Array(1));
  assert.ok(slices.length > 2000 && Math.max(...slices) <= 10, `rounds of at most the quantum: ${slices.length}, ${Math.max(...slices)}`);
  assert.equal(slices.reduce((total, slice) => total + slice, 0), 26_400, 'and the frame is worth the same');
  // The same request again keeps one entry; a zero quantum is perfect_quantum.
  runner.addQuantum(10 / 1_584_000, 2);
  slices.length = 0;
  runner.addQuantum(0, 0.0001);
  runner.frame(new Uint32Array(1));
  assert.deepEqual(slices.slice(0, 5), [1, 1, 1, 1, 1], 'a zero quantum opens the perfect window');
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
  // 24,000 truncated cycles stop a few attoseconds short of VBLANK, which
  // ends the round there, and the next is under a cycle long: nothing runs in it.
  assert.deepEqual(order.slice(0, 5), ['round', 'run 24000', 'round', 'round', 'run 2400'], 'a round starts each slice');
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

  // The window outlasts its expiry: MAME's timeslice() drops an expired
  // quantum only on entry, after a timer has fired. A quarter of a line is 25
  // fast cycles, and the next timer is the screen's VBLANK, at line 99.
  slices.length = 0;
  const windowRunner = new GeneratedFrameRunner({
    machine: quantumMachine,
    processors: [processor('fast'), processor('slow')],
    maximumQuantum: 1 / 24_000,
    perfectInterleave: () => 1 / 600_000,
  });
  windowRunner.quantumWindow(1 / 24_000);
  windowRunner.frame(new Uint32Array(1));
  const fastSlices = slices.filter(slice => slice.startsWith('fast'));
  assert.ok(fastSlices.slice(0, 9900).every(slice => slice === 'fast 1'),
    'an expired window stays open until a timer fires, here the start of line 99');
  assert.equal(fastSlices[9900], 'fast 25', 'and the machine\'s quantum returns after it');

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
        { tag: 'maincpu', kind: 'cpu', clock: 3600 },
        { tag: 'vic', kind: 'device', clock: 1800, stallTargets: ['maincpu'], arbitration: 'source-callback' },
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
// lands 0.4 lines after the last: across the seam at line 0 (the screen's
// timers there) and the wrap from 399 to 0, never backwards. Stamped with the round's progress instead, Mat Mania's DAC writes
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
  // From VBLANK (300) to line 0, then line 0 to the next VBLANK.
  assert.deepEqual(budgets, [1000, 3000], 'rounds run from one screen timer to the next');
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
  // first, at the frame's start. A frame is two rounds: VBLANK's line, up to
  // scanline 0's timer, then lines 0 and 1 up to the next VBLANK.
  assert.deepEqual(timeline, [
    'cpu 0', 'cpu 1',
    'callback:vblank', 'cpu 0', 'cpu 1',
  ]);
}

console.log('generated-frame.spec: 21 passed');

// A processor held in RESET or HALT sits its slices out, but MAME's timeslice
// still books them to it (eatcycles): every cycle it does not run is eaten,
// so its total_cycles keeps pace with the machine and a write it makes once
// released reads the machine's time. Rampage's sound 68000 sat out 0.9 s of
// boot and then stamped every DAC write 0.9 s behind the mixer.
{
  let held = true;
  let ran = 0;
  let eaten = 0;
  new GeneratedFrameRunner({
    machine,
    processors: [{
      tag: 'maincpu',
      enabled: () => !held,
      eat: budget => { eaten += budget; },
      run: budget => { ran += budget; held = false; return budget; },
    }],
    video: { width: 1, height: 1, render: () => {}, vblank: () => {} },
  }).frame(new Uint32Array(1));
  assert.equal(ran, 0, 'a held processor does not run');
  assert.equal(eaten, 60, 'a held processor eats every cycle of its slices');
}

// MAME's quantum where the machine configures none is a sixtieth of a second
// (device_scheduler::rebuild_execute_list), and nothing else bounds a round
// between two of the screen's timers (#255).
{
  const slow: BoardIr = {
    ...machine,
    callbacks: [],
    execution: {
      ...machine.execution,
      cpus: [{ tag: 'maincpu', type: 'z80', clock: 1_200_000, region: 'maincpu' }],
      // 30 Hz: VBLANK start to the frame's last line is 0.9 of 33 ms.
      screen: { width: 1, height: 1, refresh: 30, vtotal: 100, vbstart: 10, vbend: 9, rotate: 0 },
      frameEvents: [],
    },
  };
  const slices: number[] = [];
  const at: (string | undefined)[] = [];
  const runner = new GeneratedFrameRunner({
    machine: slow,
    processors: [{ tag: 'maincpu', run: (budget: number) => { slices.push(budget); return budget; } }],
    onSynchronize: where => { at.push(where); },
  });
  runner.frame(new Uint32Array(1));
  assert.equal(slices.reduce((total, slice) => total + slice, 0), 40_000, 'a 30 Hz frame of a 1.2 MHz processor');
  assert.ok(Math.max(...slices) <= 20_000, `no round is longer than a sixtieth of a second: ${slices}`);
  assert.ok(slices.includes(20_000), `and one with no timer in it is exactly that long: ${slices}`);
  assert.equal(at[0], 'base', 'work posted between rounds is due at the round\'s base');
  assert.ok(at.includes('target'), 'and work posted in a round once every processor has run to its target');
  assert.ok(Math.abs(runner.secondsAhead('maincpu')) < 1e-9, 'the processor stands on the round\'s base between frames');
}

// A timer standing on the round's base bounds nothing: it is due at the
// instant the frame is presented, where the devices' time is held, and a
// bound of no attoseconds would never end the round (Green Beret, #255).
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
  let total = 0;
  let asked = 0;
  const runner = new GeneratedFrameRunner({
    machine: idle,
    processors: [{ tag: 'maincpu', run: (budget: number) => { total += budget; return budget; } }],
    nextTimerSeconds: () => {
      if (++asked > 10_000) throw new Error('the round never ended');
      return 6.6e-19;
    },
  });
  runner.frame(new Uint32Array(1));
  assert.equal(total, 26_400, 'the frame runs whole past a timer the devices cannot fire yet');
}

// MAME's screen_device::reset_origin re-bases the screen: the MC6845 calls it
// each time its own frame counter wraps, and VBLANK moves onto the CRTC's
// phase. Here line 0 is declared to start where line 2 (VBLANK) does, at the
// head of the second frame: that frame runs on from line 0 and ends a line
// early, and every frame after keeps the new phase. A soft reset keeps the
// clock and the phase, and counts frames again.
{
  let cycles = 0;
  const lines: number[] = [];
  let frame = 0;
  const runner = new GeneratedFrameRunner({
    machine,
    origin: 'vbstart',
    processors: [{ tag: 'maincpu', run: budget => { cycles += budget; return budget; } }],
    video: { width: 1, height: 1, render: () => {}, vblank: () => {} },
    onLine: (line, phase) => {
      if (phase !== 'before-processors') return;
      lines.push(line);
      if (frame === 1 && line === 2) {
        const moved = runner.resetOrigin(runner.baseExact(), 0, 0);
        assert.equal(moved?.jumped, true, 'the beam stands past the line the loop is on');
      }
    },
  });
  runner.frame(new Uint32Array(1));
  frame = 1;
  runner.frame(new Uint32Array(1));
  assert.deepEqual(lines, [2, 0, 1, 2, 0, 1]);
  assert.equal(cycles, 100, 'the re-based frame ends a line early');
  frame = 2;
  runner.frame(new Uint32Array(1));
  assert.equal(cycles, 160, 'the next keeps the new phase, a whole frame long');
  assert.equal(runner.resetOrigin(runner.baseExact() + 5_555_555_555_555_555n, 0, 0), undefined,
    'a wrap on the new grid moves nothing');
  const base = runner.baseExact();
  runner.softReset();
  assert.equal(runner.frameCount, 0);
  assert.equal(runner.baseExact(), base, 'a soft reset keeps the clock');
  runner.frame(new Uint32Array(1));
  assert.equal(cycles, 220);
}

// MAME's VIDEO_UPDATE_AFTER_VBLANK: frame_update runs from vblank_end, so a
// frame runs from one VBLANK end to the next. The schedule keeps its VBLANK-
// to-VBLANK base; only where frame() returns moves. MAME arms its first
// vblank_end from the first vblank_begin, so the first frame is the whole
// schedule frame and VBLANK's lines after it (lines 3, 0, 1, 2, then 3, 0),
// and each after it a frame (1, 2, 3, 0). The VBLANK-end line's events run
// before the picture is taken, as vblank_end calls them before frame_update,
// and the next frame does not run them again.
{
  const afterMachine: BoardIr = {
    ...machine,
    callbacks: [...machine.callbacks, { id: 'callback:vblank-end', ownerTag: 'screen', signal: 'screen_vblank', operation: 'set' }],
    execution: {
      ...machine.execution,
      screen: { width: 1, height: 1, refresh: 60, vtotal: 4, vbstart: 3, vbend: 1, rotate: 0, updateAfterVblank: true },
      frameEvents: [
        { callbackId: 'callback:vblank', ownerTag: 'screen', signal: 'screen_vblank', line: 3, state: 1 },
        { callbackId: 'callback:vblank-end', ownerTag: 'screen', signal: 'screen_vblank', line: 1, state: 0 },
      ],
    },
  };
  let cycles = 0;
  const lines: number[] = [];
  const timeline: string[] = [];
  const runner = new GeneratedFrameRunner({
    machine: afterMachine,
    origin: 'vbstart',
    processors: [{ tag: 'maincpu', run: budget => { cycles += budget; return budget; } }],
    video: { width: 1, height: 1, render: () => { timeline.push('render'); }, vblank: () => {} },
    onLine: (line, phase) => { if (phase === 'before-processors') lines.push(line); },
    onEvent: event => timeline.push(event.callbackId),
  });
  runner.frame(new Uint32Array(1));
  assert.deepEqual(lines, [3, 0, 1, 2, 3, 0], 'the first frame ends at the second VBLANK end');
  assert.equal(cycles, 90, 'six lines of 15 cycles');
  assert.equal(timeline.at(-1), 'render');
  assert.equal(timeline.at(-2), 'callback:vblank-end', 'VBLANK end\'s events before the picture');
  lines.length = 0;
  timeline.length = 0;
  cycles = 0;
  runner.frame(new Uint32Array(1));
  assert.deepEqual(lines, [1, 2, 3, 0], 'a frame from VBLANK end to VBLANK end');
  assert.equal(cycles, 60);
  assert.deepEqual(timeline, ['callback:vblank', 'callback:vblank-end', 'render'], 'VBLANK end\'s events once, before the picture');
  assert.equal(runner.frameCount, 2);
}
