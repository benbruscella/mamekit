import type { VideoRenderer } from './types.ts';
import type { BoardIr, GeneratedFrameEvent, GeneratedScreen } from '../ir/board.ts';
import { AttoPeriod, Attotime, hzToAttoseconds, secondsToAttoseconds } from './attotime.ts';

export interface GeneratedFrameProcessor {
  tag: string;
  clock?: number;
  run(cycles: number): number;
  enabled?: () => boolean;
  /**
   * The cycles of a slice a disabled processor sat out. MAME suspends a
   * processor held in RESET or HALT with `eatcycles` set, and its timeslice
   * still adds every cycle of the slice to `m_totalcycles` and `m_localtime`:
   * its `total_cycles()`, and the machine time a write from it reads once it
   * runs again, keep pace with the machine.
   */
  eat?: (cycles: number) => void;
  /** MAME abort_timeslice: stop after the instruction in progress. */
  abort?: () => void;
  /**
   * MAME's suspension of an execute device this round: one that is 'eating'
   * is charged its slice without running, one 'waiting' is skipped. Either
   * runs after every active processor, as `rebuild_execute_list` moves it.
   */
  suspended?: () => 'eating' | 'waiting' | undefined;
  /**
   * The core is stopped waiting for an interrupt (the 65C816's WAI): its
   * execute_run burns whatever it is given and touches nothing until one of
   * its input lines changes. See runProcessors' stopped rounds.
   */
  stopped?: () => boolean;
}

/**
 * MAME's scheduling quantum where the machine configures none:
 * `machine().config().maximum_quantum(attotime::from_hz(60))` in
 * `device_scheduler::rebuild_execute_list` (emu/schedule.cpp). A configured
 * `set_maximum_quantum` can only be shorter.
 */
const DEFAULT_QUANTUM_SECONDS = 1 / 60;

/**
 * Attoseconds a device timer's expiry may stand off the time MAME has for it.
 * Device timers keep floating-point seconds, so a timer armed for a whole number
 * of a processor's cycles comes back a few attoseconds either side of that cycle
 * (a cycle is about 1e11): short of it, the processor would stop a cycle early.
 */
const TIMER_SLOP = 16;

/** MAME's screen timing: `m_frame_period`, and `m_scantime` as a period. */
export function screenPeriods(screen: GeneratedScreen): { frame: Attotime; line: AttoPeriod } {
  const frame = screen.frameAttoseconds !== undefined
    ? BigInt(screen.frameAttoseconds)
    : BigInt(hzToAttoseconds(screen.refresh));
  return {
    frame: new Attotime().setExact(frame),
    line: new AttoPeriod(Number(frame / BigInt(Math.max(1, screen.vtotal)))),
  };
}

export interface GeneratedFrameRunnerOptions {
  machine: BoardIr;
  processors: GeneratedFrameProcessor[];
  video?: VideoRenderer;
  eventPhase?: 'before-processors' | 'after-processors';
  onEvent?: (event: GeneratedFrameEvent) => void;
  /**
   * Run the `scheduler().synchronize()` work that has come due. MAME posts it
   * as a timer at the time of the call, so it runs once the round has
   * reached that time: `at` says where the round stands, its base (before a
   * round) or its target (every processor has run to it). Undefined inside a
   * perfect-quantum window, whose every instruction is a round.
   */
  onSynchronize?: (at?: 'base' | 'target') => void;
  /**
   * A round is starting: MAME's `apply_suspend_changes`, which puts into
   * force the suspensions and triggers asked for during the round before.
   */
  onRound?: () => void;
  /**
   * MAME's perfect interleave in seconds, which every round of a
   * `perfect_quantum` window lasts; undefined where it cannot be known, and
   * the window's processors then step an instruction at a time.
   */
  perfectInterleave?: () => number | undefined;
  /**
   * MAME `set_maximum_quantum` in seconds, where the board runs MAME's rounds
   * (see the board's roundQuantum); no round is longer. Without one a round
   * is at most MAME's default, a sixtieth of a second.
   */
  maximumQuantum?: number;
  /**
   * The board runs MAME's own rounds under its perfect quantum: every device
   * that executes is a processor in the round, so the rounds are modelled
   * whole. Otherwise (the C64's VIC-II and CIAs run on device time, caught up
   * at each access) the furthest-behind-first lockstep stands.
   */
  perfectRounds?: boolean;
  /**
   * Seconds from the round's base, which stands on line `baseLine`, to the
   * soonest timer, a device's or the driver's: MAME ends the round there.
   */
  nextTimerSeconds?: (baseLine: number) => number;
  /** Every processor has run the round to `line`: MAME executes its timers now. */
  onRoundEnd?: (line: number) => void;
  /** The frame has just been presented (see `awaitingPresent`). */
  onPresented?: () => void;
  /** Present the frame: `render` draws it, at the instant the board sets up. */
  aroundPresent?: (render: () => void) => void;

  onLine?: (
    line: number,
    phase: 'before-processors' | 'after-processors',
    framebuffer: Uint32Array,
  ) => void;
  /**
   * Where a frame starts. MAME's screen starts at the beginning of VBLANK
   * (`vbstart`) and its frames run from one VBLANK to the next, presented at
   * the end; `line0` runs a frame from its top and presents at `vbstart`.
   */
  origin?: 'line0' | 'vbstart';
}

/**
 * Execute the frame schedule lowered from MAME CPU clocks, screen timing, and
 * callback configuration. Device cores remain reusable runtime primitives;
 * the generated machine owns when they run and when source callbacks fire.
 */
export class GeneratedFrameRunner {
  private readonly machine: BoardIr;
  private readonly processors: {
    processor: GeneratedFrameProcessor;
    /** MAME `m_attoseconds_per_cycle`; changes only through setClock (set_unscaled_clock). */
    cycle: AttoPeriod;
    cyclesPerLine: number;
    /** MAME `m_localtime`: where the processor stands, past the round's end if it overran. */
    local: Attotime;
  }[];
  private readonly video?: VideoRenderer;
  private readonly eventPhase: 'before-processors' | 'after-processors';
  private readonly onEvent?: (event: GeneratedFrameEvent) => void;
  private readonly onLine?: GeneratedFrameRunnerOptions['onLine'];
  private readonly onSynchronize?: GeneratedFrameRunnerOptions['onSynchronize'];
  private readonly onRound?: () => void;
  private readonly perfectInterleave?: () => number | undefined;
  private readonly nextTimerSeconds?: (baseLine: number) => number;
  private readonly onRoundEnd?: (line: number) => void;
  /** The open window's round length in attoseconds, from perfectInterleave. */
  private windowQuantum?: number;
  private readonly onPresented?: () => void;
  private readonly aroundPresent?: (render: () => void) => void;

  /** MAME `m_frame_period` and `m_scantime`. */
  private readonly framePeriod: Attotime;
  /**
   * The raster `screen_device::configure` gave the screen, when it is not
   * set_raw's: its height, width and VBLANK start line (visarea bottom + 1).
   * A height of 0 is set_raw's own. MAME keeps `m_vblank_start_time` across
   * configure, so the beam keeps its time and only its labels move: the
   * SNES PPU turning overscan on makes the line its VBLANK tick fires at 240
   * where it was 225, still at the same instant. Saved, as MAME's screen
   * saves m_width, m_height and m_visarea.
   */
  readonly screenRaster = { height: 0, width: 0, vbstart: 0 };
  private readonly linePeriod: AttoPeriod;
  /**
   * When the frame in progress began: a whole number of frame periods from
   * time zero, until a device re-bases the screen (resetOrigin).
   */
  private readonly frameBase = new Attotime();
  /** The index, from the frame's origin line, of the line frame() is running. */
  private lineIndex = 0;
  /** resetOrigin moved the beam to this line index: frame() continues there. */
  private rebasedIndex: number | undefined;
  /** resetOrigin moved the line in progress: the round's end is taken again. */
  private rebasedLine = false;
  /** resetOrigin ended the frame past its last line: the next starts at this index. */
  private nextFrameStart = 0;
  /** MAME `m_basetime`: where the last round ended. */
  private readonly base = new Attotime();
  /** Where the lines being paid began, and where they end. */
  private readonly roundStart = new Attotime();
  private readonly roundEnd = new Attotime();
  /** The round in progress's target, which a processor left short pulls back. */
  private readonly target = new Attotime();
  private readonly scratch = new Attotime();
  /** The processor whose slice is executing, if any. */
  private running?: GeneratedFrameRunner['processors'][number];
  /** The processor last asked after by tag (secondsAhead). */
  private clockProcessor?: GeneratedFrameRunner['processors'][number];
  /** True while a perfect-quantum window runs processors one instruction at a time. */
  lockstepping = false;
  /** Work was synchronized during the running slice. */
  private synchronizeRequested = false;
  /** The round in progress: its first line and its length. */
  private roundFirstLine = 0;
  private roundLines = 1;
  /** Where in the lines being paid the running processor's slice began. */
  private runStartLines = 0;
  private readonly eventsByLine = new Map<number, GeneratedFrameEvent[]>();
  /**
   * MAME's periodic timers (`set_periodic_int`, the execute interface's
   * m_timedint_timer): armed at reset with `adjust(period, 0, period)`, so
   * each fires at a whole number of its periods from there, wherever the
   * beam is, and its expiry ends the round like any timer's. `next` is the
   * expiry it waits for.
   *
   * Fired at the start of the line after instead, Ghosts'n Goblins' rounds
   * ran from one frame event to the next where MAME's stop at each 240 Hz
   * expiry, and MAME's count of the cycles in a round (`timeslice`, a
   * shifted 32-bit divide) depends on the round's length: over 4,224 cycles
   * it gave the 6809 one more before the first VBLANK than MAME's four
   * shorter rounds do, and its RAM left MAME's by that cycle at frame 89.
   */
  private readonly periodicEvents: {
    event: GeneratedFrameEvent;
    period: Attotime;
    next: Attotime;
  }[] = [];
  /**
   * Lines at which the schedule must hand over to the next processor.
   *
   * MAME runs every processor to `min(basetime + quantum, next timer expiry)`
   * and only then executes timers, so what a processor does between two
   * scheduled events is atomic as far as the others are concerned. The board's
   * frame events are those timers, so the interval between them is the
   * quantum. Interleaving once per scanline instead splits work MAME keeps
   * whole: Gauntlet's sound board answers its power-on handshake with six
   * writes to one latch, and a 68010 let in among them banks a response the
   * main board never asked for and resets the sound board for good (#88).
   */
  private readonly boundaryLines: Set<number>;
  /** Every line is a boundary when the board schedules work on every line. */
  private readonly perLineSchedule: boolean;
  /**
   * MAME's scheduling quantum in attoseconds, the machine's own
   * `set_maximum_quantum` or the default: no MAME round is longer, so a round
   * of lines is several of them (see runProcessors).
   */
  private readonly machineQuantum: number;
  /**
   * MAME's perfect quantum, where the board names its processor: rounds of
   * that processor's minimum_quantum(), run as any other round (each
   * processor taking the whole cycles of its own that fit, schedule.cpp
   * timeslice) and ended at the soonest timer, rather than the
   * furthest-behind-first lockstep.
   */
  readonly perfectRounds: boolean;
  /** The processors in the order a round runs them (see roundOrder). */
  private readonly order: Int32Array;
  private readonly suspendable: boolean;
  /** Each processor's suspension this round (roundOrder). */
  private readonly held: Uint8Array;
  /** Whether roundOrder last left `order` out of its configured order. */
  private reordered = false;
  /** A `perfect_quantum` window is open: rounds are the perfect interleave. */
  private windowOpen = false;
  /**
   * MAME's quantum list past the perfect window: each `add_quantum(quantum,
   * duration)` a driver asked for, smallest requested first, running at
   * `max(requested, the perfect interleave)` until it expires. Irem's M72
   * boosts the interleave to 1.5 us for its first 25 seconds
   * (m72_state::synch_callback); at the machine's own quantum, the V30's
   * `REP STOSB` RAM test ran unbroken where MAME's restarts it every round
   * (cont_rep's CLK(2)), and the boot drew ahead by a frame.
   */
  private quantumBoosts: { requested: number; actual: number; expire: Attotime }[] = [];
  /** When the open window's quantum expires (add_quantum's `m_expire`). */
  private readonly windowExpire = new Attotime();
  /**
   * Whether a timer fired where the base stands: MAME is between two
   * `timeslice()` calls there, which is where an expired quantum is dropped.
   */
  private timerFired = true;
  /**
   * MAME `set_perfect_quantum`: the scheduler's quantum is the named
   * processor's minimum, so every processor interleaves instruction by
   * instruction for the life of the machine, not for a window. A C64 asks
   * for it on its 6510, and with a 1541 attached the two talk over a serial
   * bus whose bit windows are 20 microseconds -- a third of a scanline.
   */
  private readonly permanentLockstep: boolean;
  private frames = 0;
  /** Lines the beam has passed that the round in progress has not run yet. */
  private pendingLines = 0;
  private readonly origin: 'line0' | 'vbstart';
  /** No frame has run since the machine was built or reset. */
  private fromOrigin = true;
  /**
   * The beam is on the line it stood on at time zero. MAME arms its first
   * VBLANK and scanline timers against that position, and a timer due exactly
   * where the beam stands is due a frame later, so nothing fires there.
   */
  atOrigin = false;
  /**
   * The frame in progress will be presented when the beam next reaches
   * `vbstart` and has not been yet. MAME takes its snapshot at the start of
   * VBLANK before any device timer due at that same instant (its
   * `vblank_begin` timer was armed a frame earlier), so device time must not
   * reach that instant until the frame is presented.
   */
  awaitingPresent = false;
  /** The line whose events frame() dispatched before presenting (vblankEndIndex); -1 for none. */
  private dispatchedAhead = -1;

  constructor(options: GeneratedFrameRunnerOptions) {
    this.machine = options.machine;
    this.video = options.video;
    this.eventPhase = options.eventPhase ?? 'before-processors';
    this.onEvent = options.onEvent;
    this.onLine = options.onLine;
    this.onSynchronize = options.onSynchronize;
    this.onRound = options.onRound;
    this.perfectInterleave = options.perfectInterleave;
    this.nextTimerSeconds = options.nextTimerSeconds;
    this.onRoundEnd = options.onRoundEnd;
    this.onPresented = options.onPresented;
    this.aroundPresent = options.aroundPresent;
    this.origin = options.origin ?? 'line0';

    const clocks = new Map([
      ...options.machine.execution.cpus.map(cpu => [cpu.tag, cpu.cycleClock ?? cpu.clock] as const),
      ...(options.machine.execution.participants ?? []).map(participant =>
        [participant.tag, participant.cycleClock ?? participant.clock] as const),
    ]);
    const periods = screenPeriods(options.machine.execution.screen);
    this.framePeriod = periods.frame;
    this.linePeriod = periods.line;
    this.processors = options.processors.map(processor => {
      const clock = processor.clock ?? clocks.get(processor.tag);
      if (clock === undefined) {
        throw new Error(`generated frame plan has no execute-participant clock for "${processor.tag}"`);
      }
      const cycle = new AttoPeriod(hzToAttoseconds(clock));
      return { processor, cycle, cyclesPerLine: this.linePeriod.total / cycle.total, local: new Attotime() };
    });
    // MAME's perfect quantum is the named processor's minimum_quantum(): its
    // cycle times its execute_min_cycles(). A 5A22 rounds every master cycle,
    // and the S-SMP, whose cycle is ten of those, runs only once a whole one
    // of its own fits before the target -- which is when its port writes
    // become visible to the 5A22. The grid restarts at every timer expiry
    // (nextTimerSeconds). Run furthest-behind-first instead, the S-SMP ran
    // early and the 5A22 saw an answer microseconds before MAME does.
    const perfectTag = options.machine.execution.perfectQuantumTag;
    const perfectProcessor = perfectTag ? this.processors.find(entry => entry.processor.tag === perfectTag) : undefined;
    const perfectMinCycles = options.machine.execution.executeDevices?.find(device => device.tag === perfectTag)?.minCycles ?? 1;
    const perfectQuantumAttos = options.machine.execution.perfectQuantum === true && perfectProcessor
      ? perfectProcessor.cycle.total * perfectMinCycles
      : undefined;
    this.perfectRounds = options.perfectRounds === true && perfectQuantumAttos !== undefined && this.processors.length > 1;
    this.permanentLockstep = options.machine.execution.perfectQuantum === true &&
      this.processors.length > 1 && !this.perfectRounds;
    this.order = Int32Array.from(this.processors, (_, index) => index);
    this.suspendable = this.processors.some(entry => entry.processor.suspended);
    this.held = new Uint8Array(this.processors.length);
    for (const event of options.machine.execution.frameEvents) {
      if (event.frequency) {
        const period = new Attotime().setExact(event.periodAttoseconds !== undefined
          ? BigInt(event.periodAttoseconds)
          : BigInt(hzToAttoseconds(event.frequency)));
        this.periodicEvents.push({ event, period, next: new Attotime().set(period) });
        continue;
      }
      const lineEvents = this.eventsByLine.get(event.line) ?? [];
      lineEvents.push(event);
      this.eventsByLine.set(event.line, lineEvents);
    }
    // A scanline-updated screen renders on every line, so it keeps the
    // per-line schedule MAME's own timers would force anyway. A periodic
    // timer does not: it ends the rounds it expires in, and no others.
    this.perLineSchedule = options.machine.execution.perfectQuantum === true ||
      options.machine.execution.screen.updateMode === 'scanline' ||
      // A driver's own emu_timers end MAME timeslices wherever they expire,
      // and they are armed against raster positions; a round spanning lines
      // would measure each re-arm from a beam the device clock has run past.
      (options.machine.execution.genericTimers ?? []).some(timer => timer.driver);

    // A scanline TIMER fires on every increment, whether or not its callback
    // has work on that line, and MAME ends every timeslice there. The frame
    // events keep only the lines with work, so the timer's own cadence is
    // added back as boundaries: MCR's scantimer fires every line (a round of
    // 116 lines starved Rampage's sound board), Gauntlet's every 32.
    const scanlineTimerLines: number[] = [];
    const vtotal = options.machine.execution.screen.vtotal;
    for (const callback of options.machine.callbacks ?? []) {
      if (callback.signal !== 'configure_scanline') continue;
      const increment = Number(callback.scanlineIncrement ?? 0);
      const start = Number(callback.scanlineStart ?? 0);
      if (!(increment > 0)) continue;
      for (let line = ((start % increment) + increment) % increment; line < vtotal; line += increment) {
        scanlineTimerLines.push(line);
      }
    }
    const machineQuantum = options.maximumQuantum;
    const configuredQuantum = secondsToAttoseconds(machineQuantum !== undefined && machineQuantum > 0
      ? Math.min(machineQuantum, DEFAULT_QUANTUM_SECONDS)
      : DEFAULT_QUANTUM_SECONDS);
    // And no shorter than the perfect interleave (add_quantum's m_actual =
    // max(requested, m_quantum_minimum)): the second shortest minimum_quantum
    // of every device that executes. On the SNES that is the S-SMP's, two of
    // its cycles, so a round is ~976 ns, not one 5A22 master cycle.
    const interleave = this.perfectInterleave?.();
    const floor = interleave !== undefined && interleave > 0 ? secondsToAttoseconds(interleave) : 0;
    this.machineQuantum = perfectQuantumAttos !== undefined && this.perfectRounds
      ? Math.max(Math.min(configuredQuantum, perfectQuantumAttos), Math.min(configuredQuantum, floor))
      : configuredQuantum;
    // The lines MAME's own timers fall on, where the lines since the last one
    // are handed to the processors. A declared scanline TIMER's cadence
    // (Gauntlet's 32 lines keep its sound board's reply burst whole, MCR's
    // single line keeps Rampage's handshake alive), the frame events, and the
    // screen's three timers: VBLANK start, VBLANK end and scanline 0
    // (screen_device's m_vblank_begin_timer, m_vblank_end_timer and
    // m_scanline0_timer). Between two of them a round is as long as MAME's:
    // to the soonest timer, and no longer than the quantum (runProcessors).
    // Each fires at the start of its line (time_until_pos(line)), so a round
    // ends there and only there (runLine).
    this.boundaryLines = new Set([
      ...this.eventsByLine.keys(),
      ...scanlineTimerLines,
      options.machine.execution.screen.vbstart,
      (options.machine.execution.screen.vbend ?? 0) % Math.max(1, vtotal),
      0,
    ]);
  }

  /**
   * MAME `device_t::set_unscaled_clock` on a processor: from here on it runs
   * at the new rate. Missile Command halves its CPU for the lines its video
   * fetches steal, and puts it back at the top of the frame.
   */
  setClock(tag: string, cycleClock: number): void {
    for (const entry of this.processors) {
      if (entry.processor.tag !== tag) continue;
      entry.cycle = new AttoPeriod(hzToAttoseconds(cycleClock));
      entry.cyclesPerLine = this.linePeriod.total / entry.cycle.total;
    }
  }

  /**
   * MAME `scheduler::perfect_quantum(duration)`: interleave as finely as the
   * processors allow for this long.
   *
   * It is a quantum, not a run. The request does not run the other processor
   * *now*: the writer is mid-routine, and on Gauntlet the two instructions
   * after the command write are the ones that arm the buffer the answer
   * belongs in. In the window every processor executes one instruction at a
   * time in emulated-time order, which is what MAME's minimum quantum does.
   *
   * `now` is MAME's `time()` where the request was made, in total
   * attoseconds: the window expires `seconds` after it. And it outlasts its
   * expiry: `timeslice()` drops an expired quantum only on entry, which is
   * after a timer has fired, so the rounds stay short until the first timer
   * at or past the expiry (closeExpiredWindow). Gauntlet's main CPU reads the
   * sound CPU's reply 119 us after its command opened a 100 us window; no
   * timer fires in those 19 us, so MAME's sound CPU still polls the latch in
   * step with the read. Closed on time, the main CPU ran ahead in one long
   * round and the sound CPU saw its reply taken 16 us early (#296).
   */
  quantumWindow(seconds: number, now?: bigint): void {
    // add_quantum: `expire = time() + duration`. An open window of the same
    // quantum keeps the later of the two expiries.
    const expire = this.expireScratch;
    if (now === undefined) expire.set(this.running ? this.running.local : this.base);
    else expire.setExact(now);
    expire.add(secondsToAttoseconds(Math.max(seconds, 0)));
    if (!this.windowOpen) {
      const interleave = this.perfectInterleave?.();
      this.windowQuantum = interleave !== undefined && interleave > 0 ? secondsToAttoseconds(interleave) : undefined;
      this.windowOpen = true;
      this.windowExpire.set(expire);
    } else if (this.windowExpire.before(expire)) {
      this.windowExpire.set(expire);
    }
  }

  private readonly expireScratch = new Attotime();

  /**
   * MAME `scheduler::add_quantum(quantum, duration)` with a quantum of its
   * own (a zero one is perfect_quantum, quantumWindow): the rounds are no
   * longer than it until `duration` from now. One already open with the same
   * request keeps the later expiry, as MAME's list does.
   */
  addQuantum(quantumSeconds: number, seconds: number, now?: bigint): void {
    if (!(quantumSeconds > 0)) {
      this.quantumWindow(seconds, now);
      return;
    }
    const expire = new Attotime();
    if (now === undefined) expire.set(this.running ? this.running.local : this.base);
    else expire.setExact(now);
    const current = new Attotime().set(expire);
    expire.add(secondsToAttoseconds(Math.max(seconds, 0)));
    this.quantumBoosts = this.quantumBoosts.filter(boost => current.before(boost.expire));
    const requested = secondsToAttoseconds(quantumSeconds);
    const same = this.quantumBoosts.find(boost => boost.requested === requested);
    if (same) {
      if (same.expire.before(expire)) same.expire.set(expire);
      return;
    }
    const interleave = this.perfectInterleave?.();
    const floor = interleave !== undefined && interleave > 0 ? secondsToAttoseconds(interleave) : 0;
    this.quantumBoosts.push({ requested, actual: Math.max(requested, floor), expire });
    this.quantumBoosts.sort((left, right) => left.requested - right.requested);
  }

  /** The round length outside a perfect window: the machine's, or a shorter boost still open. */
  private get roundQuantum(): number {
    const boost = this.quantumBoosts[0];
    return boost && boost.actual < this.machineQuantum ? boost.actual : this.machineQuantum;
  }

  /**
   * MAME `scheduler().synchronize()` from inside a processor's slice: end the
   * slice after the instruction in progress. The processors after it in the
   * round run only up to where it stopped, the posted work runs, and the
   * round resumes -- so no processor observes the work before the time it
   * was posted. Answers whether a slice was running to end; outside one the
   * work is already due.
   */
  requestSynchronize(): boolean {
    if (!this.running) return false;
    this.synchronizeRequested = true;
    this.running.processor.abort?.();
    return true;
  }

  /**
   * The frame period in seconds. MAME's screen arms its VBLANK-start timer
   * every frame, so a timer armed further off than this is never the
   * soonest and never ends a timeslice (emu_timer::adjust).
   */
  get frameSeconds(): number {
    return this.framePeriod.seconds;
  }

  /** When the frame in progress began, at its origin line, in seconds of emulated time. */
  get frameStartSeconds(): number {
    return this.frameBase.seconds;
  }

  get frameCount(): number {
    return this.frames;
  }

  /**
   * How far behind the beam a processor stands at a line boundary, in
   * scanlines. A round spanning lines runs on its last line, so at each
   * earlier boundary the beam has moved on while the processor still stands
   * where the previous round left it: the lines of the round in progress it
   * has not run, less whatever its last slice ran past the end of the round
   * before. An NES OAM DMA steals 513 cycles inside one instruction, which
   * leaves the CPU four lines past where its round ended.
   */
  linesBehind(tag: string): number {
    const scheduled = this.processors.find(entry => entry.processor.tag === tag);
    if (!scheduled) return this.pendingLines;
    return this.pendingLines + this.base.since(scheduled.local) / this.linePeriod.total;
  }

  /**
   * How far a processor stands past the round's base, in seconds, or past
   * the round's target once every processor has run to it (onRoundEnd).
   * The board keeps time by its processors' cycle counts, so this is where
   * the round stands on that clock.
   */
  secondsAhead(tag: string, ofTarget = false): number {
    const scheduled = this.clockProcessor?.processor.tag === tag
      ? this.clockProcessor
      : this.clockProcessor = this.processors.find(entry => entry.processor.tag === tag);
    return scheduled ? scheduled.local.since(ofTarget ? this.target : this.base) / 1e18 : 0;
  }

  /**
   * The beam at the scheduler's base, where MAME's `machine().time()` stands
   * between timeslices: the line a frame event or the presentation falls on,
   * exactly, whatever fraction of a cycle the processors stopped short of it.
   */
  baseBeam(): number {
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    return (this.originLine + this.base.since(this.frameBase) / this.linePeriod.total) % vtotal;
  }

  /**
   * MAME `screen_device::reset_origin(beamy, beamx)`: re-base the screen's
   * timing so the beam stands at (beamy, beamx) at `now`. MAME moves
   * `m_vblank_start_time`, and with it every line after: the MC6845 calls it
   * each time its own frame counter wraps, which puts VBLANK on the CRTC's
   * phase. Wardner's CRTC wraps 45 lines into the screen's second frame, so
   * MAME's second VBLANK comes 2.85 ms early and every frame after keeps
   * that phase; Qix's comes 0.54 ms early.
   *
   * The frame in progress keeps its number and ends where VBLANK now falls.
   * If the beam now stands past the line frame() is on, frame() runs on from
   * the beam's line; a re-base onto VBLANK start itself ends the frame there,
   * as MAME calls vblank_begin at once.
   *
   * Timers armed before the call keep their expiries, as MAME's emu_timers
   * do; frame events on the lines a jump passes over do not fire this frame.
   *
   * Answers how far the start of the line the board stands on moved, in
   * seconds, whether frame() jumps, and the line the board then stands on
   * (the one before the beam's), or undefined if nothing moved.
   */
  resetOrigin(now: bigint, beamy: number, beamx: number): { lineStartShift: number; jumped: boolean; previousLine: number } | undefined {
    const screen = this.machine.execution.screen;
    const vtotal = Math.max(1, screen.vtotal);
    const htotal = Math.max(1, screen.htotal ?? screen.width);
    const line = ((Math.floor(beamy) % vtotal) + vtotal) % vtotal;
    const index = ((line - this.originLine) % vtotal + vtotal) % vtotal;
    const linePeriod = BigInt(this.linePeriod.total);
    const framePeriod = this.framePeriod.exact;
    // m_pixeltime = m_frame_period / (m_height * m_width)
    const pixel = framePeriod / BigInt(vtotal * htotal);
    const lineStart = now - BigInt(Math.max(0, Math.floor(beamx))) * pixel;
    const oldBase = this.frameBase.exact;
    // The frame `now` falls in, counted from the one in progress. The device
    // clock that fires the CRTC's timer runs up to a round ahead of the lines
    // this loop has reached, so Qix's wrap to line 0 comes in the next frame
    // while this one still runs: read as this frame's line 0, it sent the
    // loop back there every frame and the frame never ended.
    const since = now - oldBase;
    let frames = since / framePeriod;
    if (since < frames * framePeriod) frames -= 1n;
    // The frame in progress starts where the new grid puts it.
    const base = lineStart - BigInt(index) * linePeriod - frames * framePeriod;
    if (base === oldBase) return undefined;
    this.frameBase.setExact(base);
    // A line keeps its number; only when it falls moves. The loop has
    // dispatched lines up to the one it is on, which in a round spanning
    // lines can be ahead of the time the device fired at: it runs on from
    // there, the round ending where that line now ends. Only a beam that
    // has moved past it skips the lines between.
    const current = Math.min(this.lineIndex, vtotal - 1);
    const reached = index + Number(frames) * vtotal;
    const oldStart = oldBase + BigInt(current) * linePeriod;
    let newCurrent = current;
    if (reached > current) {
      newCurrent = reached - 1;
      if (reached >= vtotal) {
        // Past this frame's end: it ends here (a re-base onto vbstart itself
        // is VBLANK at once, as MAME calls vblank_begin), and the next frame
        // starts on the line the beam stands on.
        this.rebasedIndex = vtotal;
        this.nextFrameStart = Math.min(vtotal - 1, reached - vtotal);
      } else {
        this.rebasedIndex = reached;
      }
    } else {
      this.rebasedLine = true;
    }
    const newStart = base + BigInt(newCurrent) * linePeriod;
    return {
      lineStartShift: Number(newStart - oldStart) / 1e18,
      jumped: reached > current,
      previousLine: (this.originLine + newCurrent) % vtotal,
    };
  }

  /** How far a processor stands past the round's base, in its own cycles. */
  get cyclesAhead(): readonly number[] {
    return this.processors.map(entry => entry.local.since(this.base) / entry.cycle.total);
  }

  reset(): void {
    for (const processor of this.processors) processor.local.clear();
    this.frameBase.clear();
    this.base.clear();
    for (const event of this.periodicEvents) event.next.set(event.period);
    this.windowOpen = false;
    this.windowExpire.clear();
    this.quantumBoosts = [];
    this.timerFired = true;
    this.frames = 0;
    this.fromOrigin = true;
    this.awaitingPresent = false;
  }

  /**
   * MAME's soft reset (running_machine::soft_reset): every device resets and
   * emulated time carries on. The beam keeps its phase, so a device timer
   * that re-arms itself from its own expiry (the MC6845's line timer, which
   * a reset leaves running) still measures the same frame; each periodic
   * interrupt is armed a period from now (interface_post_reset). The frame
   * count starts again, as the frames a reset is followed by are counted.
   * Restarting the clock instead put Qix's CRTC 2.69 s off the beam after
   * its contract's reset, and its scanline latch read a line early.
   */
  softReset(): void {
    for (const scheduled of this.periodicEvents) scheduled.next.set(this.base).addTime(scheduled.period);
    this.timerFired = true;
    this.frames = 0;
    this.awaitingPresent = false;
  }

  /**
   * The line the beam stands on at time zero. A screen whose VBLANK starts at
   * its last line + 1 or beyond (the Spectrum's 311 of 0-310, Missile
   * Command's 256) wraps to line 0, where the frame already starts.
   */
  get originLine(): number {
    const screen = this.machine.execution.screen;
    return this.origin === 'vbstart' && screen.vbstart > 0 && screen.vbstart < screen.vtotal ? screen.vbstart : 0;
  }

  /** Save-state roots (machine-state.ts): the times and counters, never the schedule. */
  stateKeys(): readonly string[] {
    return ['processors', 'frameBase', 'base', 'periodicEvents', 'windowOpen', 'windowExpire', 'quantumBoosts', 'frames', 'fromOrigin', 'screenRaster'];
  }

  /**
   * Whether this frame is presented at the end of its last line, where the
   * beam next reaches `vbstart`: every frame-mode screen under MAME's origin,
   * since its frames run from VBLANK to VBLANK.
   */
  get presentsAtEnd(): boolean {
    return this.origin === 'vbstart' && this.machine.execution.screen.updateMode !== 'scanline' && this.originLine > 0;
  }

  /**
   * Where an UPDATE_AFTER_VBLANK screen's frames end: VBLANK end's index from
   * the origin. The schedule still runs from VBLANK to VBLANK (its base, its
   * timers), but frame() returns, and presents, when the beam reaches VBLANK
   * end, as MAME's frame_update runs from vblank_end. MAME arms its first
   * vblank_end from the first vblank_begin, a frame after time zero, so the
   * first frame is a whole schedule frame and VBLANK's lines after it: The
   * Simpsons' first frame is 304 lines, and every one after it 264.
   */
  private get vblankEndIndex(): number | undefined {
    const screen = this.machine.execution.screen;
    if (!screen.updateAfterVblank || !this.presentsAtEnd) return undefined;
    const vtotal = Math.max(1, screen.vtotal);
    const index = ((((screen.vbend ?? 0) - this.originLine) % vtotal) + vtotal) % vtotal;
    return index > 0 ? index : undefined;
  }

  frame(framebuffer: Uint32Array): void {
    const screen = this.machine.execution.screen;
    const vtotal = Math.max(1, screen.vtotal);
    const origin = this.originLine;
    let rendered = false;
    this.pendingLines = 0;
    this.awaitingPresent = this.presentsAtEnd;
    this.rebasedIndex = undefined;
    const endIndex = this.vblankEndIndex;
    const first = endIndex !== undefined && !this.fromOrigin ? endIndex : this.nextFrameStart;
    this.nextFrameStart = 0;
    // The first frame's VBLANK end is no presentation: it comes a frame on.
    if (endIndex !== undefined && this.fromOrigin) this.awaitingPresent = false;
    for (let start = first; ;) {
      for (this.lineIndex = start; this.lineIndex < vtotal; this.lineIndex++) {
        const index = this.lineIndex;
        const line = (origin + index) % vtotal;
        this.atOrigin = this.fromOrigin && index === 0 && this.origin === 'vbstart';
        if (this.runLine(line, framebuffer)) rendered = true;
        // The screen was re-based (resetOrigin): the beam now stands on
        // another line of this frame, which runs on from there.
        if (this.rebasedIndex !== undefined) {
          this.lineIndex = this.rebasedIndex - 1;
          this.rebasedIndex = undefined;
          this.pendingLines = 0;
        }
      }
      this.atOrigin = false;
      this.fromOrigin = false;
      // What the processors still owe for the frame's last lines is paid
      // before it ends: at vbstart, where MAME presents, or at the origin,
      // which is scanline 0's timer.
      if (this.pendingLines > 0) {
        this.runProcessors(this.pendingLines, (origin + vtotal - 1) % vtotal);
        this.pendingLines = 0;
      }
      if (this.rebasedIndex === undefined || this.rebasedIndex >= vtotal) break;
      start = this.rebasedIndex;
      this.rebasedIndex = undefined;
    }
    this.rebasedIndex = undefined;
    if (endIndex !== undefined) {
      // The schedule frame ends at VBLANK; this one runs on to VBLANK's end.
      this.frameBase.addTime(this.framePeriod);
      this.frames++;
      this.awaitingPresent = true;
      for (this.lineIndex = 0; this.lineIndex < endIndex; this.lineIndex++) {
        this.runLine((origin + this.lineIndex) % vtotal, framebuffer);
      }
      if (this.pendingLines > 0) {
        this.runProcessors(this.pendingLines, (origin + endIndex - 1) % vtotal);
        this.pendingLines = 0;
      }
      this.rebasedIndex = undefined;
      // vblank_end runs the screen's VBLANK callbacks before frame_update, so
      // the line's events come first, and the next frame does not repeat them.
      const line = (origin + endIndex) % vtotal;
      if (this.eventPhase === 'before-processors') {
        this.dispatchLine(line, framebuffer);
        this.dispatchedAhead = line;
      }
      this.present(framebuffer);
      this.presented();
      return;
    }
    if (this.presentsAtEnd) {
      this.present(framebuffer);
      rendered = true;
    }
    this.presented();
    this.frameBase.addTime(this.framePeriod);
    this.frames++;
    // A board whose vbstart sits outside the emulated line range never hit the
    // in-loop presentation above; keep the end-of-frame fallback for it.
    if (screen.updateMode !== 'scanline' && !rendered) this.video?.render(framebuffer);
  }

  private present(framebuffer: Uint32Array): void {
    const video = this.video;
    if (!video) return;
    if (this.aroundPresent) this.aroundPresent(() => video.render(framebuffer));
    else video.render(framebuffer);
  }

  private presented(): void {
    if (!this.awaitingPresent) return;
    this.awaitingPresent = false;
    this.onPresented?.();
  }

  /** One scanline of the schedule; answers whether it presented the frame. */
  private runLine(line: number, framebuffer: Uint32Array): boolean {
    const screen = this.machine.execution.screen;
    let rendered = false;
    this.onLine?.(line, 'before-processors', framebuffer);
    // A scheduled event ends the quantum, so what the processors owe from
    // the lines since the last one is paid before the event — and before the
    // frame this line may present — rather than after it.
    if (this.pendingLines > 0 && this.boundaryLines.has(line)) {
      this.runProcessors(this.pendingLines, line - 1);
      this.pendingLines = 0;
      // Re-based while paying them: this line is not where the beam is.
      if (this.rebasedIndex !== undefined) return false;
    }
    const dispatchedAhead = this.dispatchedAhead === line;
    this.dispatchedAhead = -1;
    if (this.eventPhase === 'before-processors' && !this.atOrigin && !dispatchedAhead) this.dispatchLine(line, framebuffer);
    // MAME's VIDEO_UPDATE_SCANLINE timer calls update_partial at the start
    // of the scanline, before CPUs execute the interval leading to the next
    // line. Drawing afterwards can combine sprite RAM from two states across
    // one frame; on a rotated screen that appears as vertical sprite tears.
    if (screen.updateMode === 'scanline') this.video?.renderLine?.(framebuffer, line);
    // MAME's screen device runs screen_update at the start of VBLANK, not at
    // the end of the frame. The remaining post-vbstart scanlines still run
    // their CPU slices afterwards, so a game that erases and redraws sprites
    // in its VBLANK handler is sampled between the two halves when the
    // presentation is deferred to the frame boundary (Berzerk's player).
    if (this.origin === 'line0' && screen.updateMode !== 'scanline' && line === screen.vbstart) {
      this.present(framebuffer);
      rendered = true;
      this.presented();
    }

    this.pendingLines++;
    // A boundary line's timer fired at its start, above; its end is no timer
    // of MAME's, so the round runs on through it. Ending one there as well
    // split Venture's round at line 279, and its main CPU saw a PIA edge the
    // sound CPU raised earlier in that round, which MAME's had run past (#275).
    const inQuantumWindow = this.windowOpen || this.quantumBoosts.length > 0;
    if (this.perLineSchedule || inQuantumWindow) {
      // The next line's start is a timer where MAME has one there: a boundary
      // line, or any line of a scanline-updated screen (screen_device's
      // m_scanline_timer fires on every one).
      const timerNext = screen.updateMode === 'scanline' ||
        this.boundaryLines.has((line + 1) % Math.max(1, screen.vtotal));
      this.runProcessors(this.pendingLines, line, timerNext);
      this.pendingLines = 0;
      if (this.rebasedIndex !== undefined) return rendered;
    }

    this.onLine?.(line, 'after-processors', framebuffer);
    if (this.eventPhase === 'after-processors' && !this.atOrigin) this.dispatchLine(line, framebuffer);
    return rendered;
  }


  /**
   * Run every enabled processor for `lines` scanlines' worth of cycles: one
   * MAME timeslice, bounded by the next scheduled event.
   *
   * This is `device_scheduler::timeslice()`, in its attoseconds. Lines fall at
   * `frame base + index * m_scantime`, and a frame's base is a whole number of
   * `m_frame_period`s: the two truncate differently, and that is what decides
   * which instruction a VBLANK lands before. MAME's Donkey Kong takes its NMI
   * one instruction earlier in frame 8, because VBLANK has fallen about 1e-6 of
   * a cycle before the cycle that would have started the next one.
   *
   * A processor that synchronizes stops short, and the round's target drops
   * to where it stopped for every processor after it -- MAME's
   * `if (exec->m_localtime < target) target = exec->m_localtime`. Processors
   * before it have already run to the full target and stay ahead, as they do
   * in MAME. The posted work then runs and the round continues from there.
   *
   * MAME's round is also no longer than the machine's quantum, and each
   * processor in it runs whole cycles: one left short of the target by a
   * fraction of a cycle ends the round there for the rest (`target =
   * max(m_localtime, m_basetime)`). Donkey Kong's 400 kHz sound CPU decides
   * this way where each of its 3 MHz Z80's rounds starts.
   */
  private runProcessors(lines: number, lastLine: number, endsAtTimer = true): void {
    const processors = this.processors;
    const base = this.base;
    const end = this.roundEnd;
    const target = this.target;
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    const endIndex = ((lastLine - this.originLine + vtotal) % vtotal) + 1;
    const lineEnd = () => {
      if (endIndex >= vtotal) end.set(this.frameBase).addTime(this.framePeriod);
      else end.setPeriodsFrom(this.frameBase, endIndex, this.linePeriod);
    };
    lineEnd();
    this.roundStart.set(base);
    this.roundFirstLine = lastLine - lines + 1;
    this.roundLines = lines;
    // Work posted outside any slice (a line callback, an event) is due now.
    this.onSynchronize?.('base');
    const periodic = this.periodicEvents.length > 0;
    for (;;) {
      // A device re-based the screen (resetOrigin). On the line these rounds
      // run, they run on to its end where it now falls; on another, the
      // lines being paid are no longer where the beam is, and the frame
      // carries on from the line it stands on.
      if (this.rebasedIndex !== undefined) break;
      if (this.rebasedLine) {
        this.rebasedLine = false;
        lineEnd();
      }
      if (!base.before(end)) break;
      // MAME's execute_timers at the head of a timeslice: a periodic timer
      // the base has reached fires before any processor runs.
      const untilPeriodic = periodic ? this.firePeriodic() : Infinity;
      this.onRound?.();
      if (this.permanentLockstep) {
        this.lockstep(periodic ? this.periodicEnd(end, untilPeriodic) : end);
        continue;
      }
      // A perfect_quantum window is rounds of the perfect interleave, run by
      // the same rules as any other round.
      this.closeExpiredWindow();
      const windowed = this.windowOpen;
      if (windowed && this.windowQuantum === undefined) {
        const windowEnd = this.windowEnd(end);
        this.lockstep(periodic ? this.periodicEnd(windowEnd, untilPeriodic) : windowEnd);
        continue;
      }
      target.set(end);
      this.lowerTarget(windowed ? this.windowQuantum! : this.roundQuantum);
      // The soonest periodic timer ends the round, to the attosecond: the
      // processors run the whole cycles that fit before it and no more.
      if (periodic) this.lowerTarget(untilPeriodic);
      // MAME's round ends at the soonest timer, so every processor stands
      // at its expiry when it fires.
      let slop = 0;
      let timerAttos: number | undefined;
      if (this.nextTimerSeconds) {
        const seconds = this.nextTimerSeconds(this.linesAt(base));
        // A timer standing on the base itself, give or take that slop, is one
        // the devices could not fire there: it is due at the instant the frame
        // is presented, and their time is held short of it for the snapshot.
        // It bounds nothing: Green Beret's K005849 arms its scanline timer for
        // that instant, and a bound of no attoseconds never ended the round.
        if (seconds > 0 && Number.isFinite(seconds)) {
          const attos = secondsToAttoseconds(seconds);
          if (attos > TIMER_SLOP) {
            timerAttos = attos;
            if (this.lowerTarget(attos)) slop = TIMER_SLOP;
          }
        }
      }
      // A perfect round whose leading processors are stopped (stoppedLead)
      // runs to the timer or the lines' end rather than one quantum, the
      // stopped ones last. Nothing they could do is lost: they read nothing
      // and burn every cycle, and the only things that wake one -- a timer,
      // or a line another processor drives, which synchronizes -- end the
      // round. Stopped first in MAME's order, each would already stand at the
      // end of the quantum such a cut falls in, so that is where it is run to
      // (stoppedTarget).
      let order = this.roundOrder();
      let stoppedFrom = order.length;
      const lead = this.perfectRounds && !windowed ? this.stoppedLead() : 0;
      if (lead > 0) {
        target.set(end);
        slop = timerAttos !== undefined && this.lowerTarget(timerAttos) ? TIMER_SLOP : 0;
        if (periodic && this.lowerTarget(untilPeriodic)) slop = 0;
        this.extendedFrom.set(base);
        this.extendedTo.set(target);
        const stopped = [...order].filter(index => index < lead);
        order = Int32Array.from([...[...order].filter(index => index >= lead), ...stopped]);
        stoppedFrom = order.length - stopped.length;
      } else if (this.perfectRounds && !windowed) {
        // Rounds nobody runs in pass at once, short of the timer and the end;
        // the round's target is then taken again from where the base stands.
        const skipped = this.skipIdleRounds(Math.min(end.since(base), timerAttos ?? Infinity, untilPeriodic));
        if (skipped > 0) {
          target.set(end);
          this.lowerTarget(this.roundQuantum);
          if (timerAttos !== undefined) this.lowerTarget(timerAttos - skipped);
          if (periodic) this.lowerTarget(untilPeriodic - skipped);
        }
      }
      let synchronized = false;
      for (let position = 0; position < order.length; position++) {
        const scheduled = processors[order[position]!]!;
        const local = scheduled.local;
        // A stopped processor's end: the round's, or past a cut, the end of
        // MAME's quantum the cut falls in.
        const runTo = position >= stoppedFrom ? this.stoppedTarget(target) : target;
        const cycles = scheduled.cycle.within(local, runTo, slop);
        // Less than a cycle to the target: MAME neither runs it nor moves on.
        if (cycles === 0) continue;
        if (scheduled.processor.enabled && !scheduled.processor.enabled()) {
          local.addPeriods(cycles, scheduled.cycle);
          scheduled.processor.eat?.(cycles);
          this.pullTarget(local, slop);
          continue;
        }
        this.running = scheduled;
        this.runStartLines = local.since(this.roundStart) / this.linePeriod.total;
        this.synchronizeRequested = false;
        // A window's slice is an instruction against a target of a cycle or
        // so, as a lockstep step is (see the board's lockstepping).
        this.lockstepping = windowed || this.perfectRounds;
        let executed: number;
        try {
          executed = scheduled.processor.run(cycles);
        } finally {
          this.lockstepping = false;
        }
        this.running = undefined;
        local.addPeriods(executed, scheduled.cycle);
        // A processor that synchronized ends the round where it stopped:
        // MAME's `target = max(m_localtime, m_basetime)`, its local time after
        // the run, not the time it posted the work. Venture's sound 6502
        // stops two cycles past its 6532 read; from the read, every round
        // after was 1.1 us short and its main CPU's PIA poll fell into the
        // next one (#275).
        if (this.synchronizeRequested) synchronized = true;
        // Whole cycles left it short of the target, whether or not it
        // synchronized (MAME skips a waiting device, which then stands
        // wherever it stopped). Wardner's TMS32010 released the main Z80 on
        // the last instruction its slice had room for, 0.12 us short of the
        // target; the round went on to the target, and the Z80, run after it,
        // ate a cycle MAME's never did.
        if (this.synchronizeRequested || scheduled.processor.suspended?.() !== 'waiting') this.pullTarget(local, slop);
        this.synchronizeRequested = false;
      }
      this.onSynchronize?.('target');
      this.onRoundEnd?.(this.linesAt(target));
      // Whether MAME's timeslice() returns here to run timers: a synchronize
      // is a timer due at once, and otherwise the round reached one.
      const ran = target.since(base);
      this.timerFired = synchronized ||
        (timerAttos !== undefined && ran >= timerAttos - TIMER_SLOP) ||
        (periodic && ran >= untilPeriodic) ||
        (endsAtTimer && !target.before(end));
      base.set(target);
    }
    // Every processor stands at the end of the lines being paid, give or take
    // the instruction that carried it past. Work one posted from that last
    // instruction is due a few cycles on; it runs here, not at the first
    // round of the next lines, so nothing is left posted between lines: a
    // line event, or a save state taken between frames, finds none.
    this.onSynchronize?.();
  }

  /**
   * Fire every periodic timer the base has reached, the earliest first, and
   * answer the attoseconds from the base to the soonest still to come. MAME
   * moves a periodic timer on by its period as it fires (`schedule_next_period`),
   * so its expiries stay whole periods from reset.
   */
  private firePeriodic(): number {
    const base = this.base;
    const events = this.periodicEvents;
    for (;;) {
      let due: GeneratedFrameRunner['periodicEvents'][number] | undefined;
      let soonest: Attotime | undefined;
      for (let index = 0; index < events.length; index++) {
        const scheduled = events[index]!;
        if (!soonest || scheduled.next.before(soonest)) soonest = scheduled.next;
        if (!base.before(scheduled.next) && (!due || scheduled.next.before(due.next))) due = scheduled;
      }
      if (!due) return soonest ? soonest.since(base) : Infinity;
      due.next.addTime(due.period);
      this.onEvent?.(due.event);
    }
  }

  /**
   * device_execute_interface::interface_post_reset for a processor's periodic
   * timers: `adjust(period, 0, period)`, so the next expiry is a period from
   * `now` (the scheduler's base when the board cannot say) and the rest
   * follow from it.
   */
  rearmPeriodic(ownerTag: string, now?: bigint): void {
    for (const scheduled of this.periodicEvents) {
      if (scheduled.event.ownerTag !== ownerTag) continue;
      if (now === undefined) scheduled.next.set(this.base);
      else scheduled.next.setExact(now);
      scheduled.next.addTime(scheduled.period);
    }
  }

  /** `end`, or the soonest periodic timer `attos` past the base if that comes first. */
  private periodicEnd(end: Attotime, attos: number): Attotime {
    if (!(attos < end.since(this.base))) return end;
    return this.periodicScratch.set(this.base).add(attos);
  }

  private readonly periodicScratch = new Attotime();

  /** Where a stopped round (runProcessors) began and the end it was given. */
  private readonly extendedFrom = new Attotime();
  private readonly extendedTo = new Attotime();
  private readonly stoppedScratch = new Attotime();

  /**
   * How many processors, from the first in configured order, are stopped
   * (GeneratedFrameProcessor.stopped) and run: a round they lead can be
   * extended. Every other processor comes after them in MAME's order, so a
   * line one of those drives reaches a stopped one at the end of the quantum
   * it falls in. None when no processor is left to run.
   */
  private stoppedLead(): number {
    const processors = this.processors;
    let lead = 0;
    while (lead < processors.length) {
      const processor = processors[lead]!.processor;
      if (!processor.stopped?.() || processor.suspended?.() || (processor.enabled && !processor.enabled())) break;
      lead++;
    }
    return lead;
  }

  /**
   * A stopped processor's end in a round extended for it: the round's own,
   * or, where the round was cut short (a synchronize, a timer armed inside
   * it), the end of the quantum the cut falls in, counted from the round's
   * start as MAME's rounds are.
   */
  private stoppedTarget(target: Attotime): Attotime {
    if (!target.before(this.extendedTo)) return target;
    const quantum = this.roundQuantum;
    const into = target.since(this.extendedFrom);
    const quanta = Math.max(1, Math.ceil(into / quantum));
    const boundary = this.stoppedScratch.set(this.extendedFrom).add(quanta * quantum);
    return boundary.before(this.extendedTo) ? boundary : this.extendedTo;
  }

  /** Bring the target down to `attos` past the base; answers whether it moved. */
  /**
   * Under a perfect quantum most rounds run nobody: the 5A22 is part way
   * through an instruction and the S-SMP not yet a whole cycle behind. MAME
   * steps its base through them a quantum at a time with no effect; they are
   * passed at once, to just short of the first round in which a processor has
   * a whole cycle of its own (and never past a timer, which bounds `end`).
   */
  private skipIdleRounds(room: number): number {
    const quantum = this.roundQuantum;
    let soonest = Infinity;
    for (const scheduled of this.processors) {
      if (scheduled.processor.suspended?.() === 'waiting') continue;
      const due = scheduled.local.since(this.base) + scheduled.cycle.total;
      if (due < soonest) soonest = due;
    }
    if (!(soonest > quantum) || !Number.isFinite(soonest)) return 0;
    const rounds = Math.min(Math.floor((soonest - 1) / quantum), Math.floor((room - 1) / quantum));
    if (!(rounds > 0)) return 0;
    this.base.add(rounds * quantum);
    return rounds * quantum;
  }

  private lowerTarget(attos: number): boolean {
    const candidate = this.scratch.set(this.base).add(attos);
    if (!candidate.before(this.target)) return false;
    this.target.set(candidate);
    return true;
  }

  /** MAME's `target = max(m_localtime, m_basetime)` for a processor left short. */
  private pullTarget(reached: Attotime, slop: number): void {
    if (this.target.since(reached) <= slop) return;
    this.target.set(reached.before(this.base) ? this.base : reached);
  }

  /** A time within the lines being paid, as the line it falls on. */
  private linesAt(time: Attotime): number {
    return this.roundFirstLine + time.since(this.roundStart) / this.linePeriod.total;
  }

  /** The end of the open perfect_quantum window, or `end` if that comes first. */
  private windowEnd(end: Attotime): Attotime {
    return this.windowExpire.before(end) ? this.windowExpire : end;
  }

  /**
   * MAME's `while (m_basetime >= m_quantum_list.first()->m_expire)` at the
   * head of timeslice(): an expired window closes once a timer has fired,
   * and not at a round that merely ran out its quantum.
   */
  private closeExpiredWindow(): void {
    if (this.windowOpen && this.timerFired && !this.base.before(this.windowExpire)) this.windowOpen = false;
    if (this.quantumBoosts.length && this.timerFired) {
      this.quantumBoosts = this.quantumBoosts.filter(boost => this.base.before(boost.expire));
    }
  }

  /**
   * The round's order: the processors as configured, with any suspended
   * device moved after the active ones (MAME `rebuild_execute_list`). Donkey
   * Kong's 8257 waits behind its sound CPU, and runs between the CPUs once
   * a request releases it.
   */
  private roundOrder(): Int32Array {
    const order = this.order;
    if (!this.suspendable) return order;
    // Asked once per processor a round, and the configured order kept while
    // none is suspended: Qix runs thousands of rounds a frame, its CPUs
    // almost never held, and asking twice each round cost it CI's floor.
    const processors = this.processors;
    const held = this.held;
    let any = false;
    for (let index = 0; index < processors.length; index++) {
      const suspended = processors[index]!.processor.suspended?.() !== undefined;
      held[index] = suspended ? 1 : 0;
      any ||= suspended;
    }
    if (!any && !this.reordered) return order;
    let next = 0;
    for (let index = 0; index < processors.length; index++) if (!held[index]) order[next++] = index;
    for (let index = 0; index < processors.length; index++) if (held[index]) order[next++] = index;
    this.reordered = any;
    return order;
  }

  /** The scheduler's base, MAME's `m_basetime`, in total attoseconds. */
  baseExact(): bigint {
    return this.base.exact;
  }

  /**
   * The running processor's local time `elapsedCycles` into its slice, in
   * total attoseconds, as MAME's `local_time()` has it; undefined outside a
   * slice.
   */
  runningLocalExact(elapsedCycles: number): bigint | undefined {
    const running = this.running;
    if (!running) return undefined;
    return running.local.exact + BigInt(Math.max(0, Math.trunc(elapsedCycles))) * BigInt(running.cycle.total);
  }

  /**
   * The beam as the running processor sees it, `elapsedCycles` into its
   * slice: MAME's screen_device::vpos() reads the executing CPU's own local
   * time. Undefined outside a slice. Without it a round of many lines showed
   * every read the round's last line, and a game polling for VBLANK
   * (Phoenix, Rampage) never saw the beam move.
   */
  runningBeam(elapsedCycles: number, oneLine = false): number | undefined {
    const running = this.running;
    // A one-line round is already resolved inside the line by the board's
    // instruction-time device clock, which boards such as the 2600 position
    // sprites by; only a round spanning lines needs the processor's position.
    // `oneLine` asks for it in a one-line round too, where nothing else has
    // it: a generated core reports its slice's timing only at its ends.
    if (!running || (this.roundLines <= 1 && !oneLine)) return undefined;
    return this.roundFirstLine + this.runStartLines + elapsedCycles / running.cyclesPerLine;
  }

  /**
   * The running processor's position, `elapsedCycles` into its slice, as
   * lines since the frame began at `originLine`; undefined outside a slice.
   * A round never spans the origin, so its first line places it in the frame
   * and the processor's progress through it is added unwrapped: a slice that
   * overruns the frame's last line comes out past `vtotal`, never back at 0.
   *
   * Unlike `runningBeam`, a one-line round counts too. Its slice starts where
   * the last one overran to (`runStartLines`), and progress through the line
   * measured as `elapsed / target` restarted at 0: Gyruss's i8039 DAC stepped
   * back a fifth of a line at every round seam (#194).
   */
  /**
   * Where the round's base stands, in lines from the frame's origin line,
   * while a processor runs: how far the scheduler has gone, and with it the
   * timers that have fired, whatever the running processor's own time.
   */
  runningBaseFrameLines(): number | undefined {
    if (!this.running) return undefined;
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    const first = ((this.roundFirstLine - this.originLine) % vtotal + vtotal) % vtotal;
    return first + this.base.since(this.roundStart) / this.linePeriod.total;
  }

  runningFrameLines(elapsedCycles: number): number | undefined {
    const running = this.running;
    if (!running) return undefined;
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    const first = ((this.roundFirstLine - this.originLine) % vtotal + vtotal) % vtotal;
    return first + this.runStartLines + elapsedCycles / running.cyclesPerLine;
  }

  /**
   * The `perfect_quantum` window: up to `until`, the window's end or the
   * round's, the processor furthest behind in emulated time executes one
   * instruction, then any work that instruction synchronized runs.
   */
  private lockstep(until: Attotime): void {
    const processors = this.processors;
    const base = this.base;
    const end = this.target.set(until);
    // Subtracting spent lines leaves floating-point residue: a window of 4e-16
    // lines advanced the round by nothing, forever. Under an attosecond it is over.
    if (!base.before(end)) {
      this.windowOpen = false;
      return;
    }
    for (;;) {
      // Every instruction in the window is a round of its own.
      this.onRound?.();
      let behind: GeneratedFrameRunner['processors'][number] | undefined;
      let owed = 0;
      const order = this.roundOrder();
      for (let position = 0; position < order.length; position++) {
        const scheduled = processors[order[position]!]!;
        const cycles = scheduled.cycle.within(scheduled.local, end);
        if (cycles === 0) continue;
        if (scheduled.processor.enabled && !scheduled.processor.enabled()) {
          scheduled.local.addPeriods(cycles, scheduled.cycle);
          scheduled.processor.eat?.(cycles);
          continue;
        }
        if (scheduled.processor.suspended?.() === 'waiting') continue;
        const debt = end.since(scheduled.local);
        if (!behind || debt > owed) {
          behind = scheduled;
          owed = debt;
        }
      }
      if (!behind) break;
      this.running = behind;
      this.runStartLines = behind.local.since(this.roundStart) / this.linePeriod.total;
      this.lockstepping = true;
      try {
        behind.local.addPeriods(behind.processor.run(1), behind.cycle);
      } finally {
        this.lockstepping = false;
      }
      this.running = undefined;
      this.synchronizeRequested = false;
      this.onSynchronize?.();
    }
    base.set(end);
    this.timerFired = true;
    if (this.windowOpen && !base.before(this.windowExpire)) this.windowOpen = false;
  }

  private dispatchLine(line: number, framebuffer: Uint32Array): void {
    for (const event of this.eventsByLine.get(line) ?? []) this.onEvent?.(event);
    // A screen whose vblank starts at its last line + 1 (the Spectrum's 311 of
    // 0-310) starts it on line 0 of the next frame, as MAME's raster wraps.
    const screen = this.machine.execution.screen;
    const vtotal = Math.max(1, screen.vtotal);
    if (line === screen.vbstart % vtotal) this.video?.vblank();
    // MAME's vblank_end timer is first armed from time zero, so a screen whose
    // vblank ends on line 0 counts its first frame a whole frame later.
    if (line === (screen.vbend ?? 0) % vtotal && (line > 0 || this.frameCount > 0)) this.video?.vblankEnd?.();
  }
}
