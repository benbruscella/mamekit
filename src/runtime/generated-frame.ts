import type { VideoRenderer } from './types.ts';
import type { BoardIr, GeneratedFrameEvent, GeneratedScreen } from '../ir/board.ts';
import { AttoPeriod, Attotime, hzToAttoseconds, secondsToAttoseconds } from './attotime.ts';

export interface GeneratedFrameProcessor {
  tag: string;
  clock?: number;
  run(cycles: number): number;
  enabled?: () => boolean;
  /** MAME abort_timeslice: stop after the instruction in progress. */
  abort?: () => void;
  /**
   * Cycles into the running slice where the processor stands, for a core
   * MAME suspends between the bus cycles of an instruction (the 6502). A
   * synchronize there ends MAME's round at that cycle, not at the end of the
   * instruction: a POKEY read is followed by the next opcode's prefetch, and
   * the POKEY catches up only to the read.
   */
  position?: () => number;
  /**
   * MAME's suspension of an execute device this round: one that is 'eating'
   * is charged its slice without running, one 'waiting' is skipped. Either
   * runs after every active processor, as `rebuild_execute_list` moves it.
   */
  suspended?: () => 'eating' | 'waiting' | undefined;
}

/**
 * The longest any processor may run ahead of the others where the board
 * declares no timer cadence of its own.
 *
 * What bounds a timeslice in MAME is the soonest timer. Here a scanline
 * TIMER's own period bounds a round; device timers do not, because ending
 * rounds at every one of them desynchronised the MCUs Xevious and TMNT host on
 * device time. A board with no declared cadence keeps the empirical bound the
 * schedule used before timers were modelled at all: Galaga's 54xx boot boom
 * is knife-edge sensitive to it, and a five-line round silences a boom that
 * is already far quieter than MAME's.
 */
const MAX_QUANTUM_SECONDS = 250e-6;

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
  /** Run the `scheduler().synchronize()` work posted since the last call. */
  onSynchronize?: () => void;
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
   * (see the board's roundQuantum); no round is longer.
   */
  maximumQuantum?: number;
  /**
   * Seconds from the round's base, which stands on line `baseLine`, to the
   * soonest device timer: MAME ends the round there.
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
  private readonly onSynchronize?: () => void;
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
  private readonly linePeriod: AttoPeriod;
  /** When the frame in progress began: a whole number of frame periods. */
  private readonly frameBase = new Attotime();
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
  /** True while a perfect-quantum window runs processors one instruction at a time. */
  lockstepping = false;
  /** Work was synchronized during the running slice. */
  private synchronizeRequested = false;
  /** Where the running processor stood when it synchronized (`position`). */
  private synchronizedAt?: number;
  /** The round in progress: its first line and its length. */
  private roundFirstLine = 0;
  private roundLines = 1;
  /** Where in the lines being paid the running processor's slice began. */
  private runStartLines = 0;
  private readonly eventsByLine = new Map<number, GeneratedFrameEvent[]>();
  private readonly periodicEvents: {
    event: GeneratedFrameEvent;
    eventsPerLine: number;
    carry: number;
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
  /** Scanlines a processor may run in one slice, from MAX_QUANTUM_SECONDS. */
  private readonly maximumQuantumLines: number;
  /**
   * The machine's own `set_maximum_quantum`, in attoseconds: no MAME round is
   * longer, so a round of lines is several of them (see runProcessors).
   */
  private readonly machineQuantum?: number;
  /** The processors in the order a round runs them (see roundOrder). */
  private readonly order: Int32Array;
  private readonly suspendable: boolean;
  /** A scanline TIMER's own period in lines; it is what MAME ends slices on. */
  private readonly scanlineTimerLinesApart: number;
  /**
   * Scanlines (fractional) left in a `perfect_quantum` window, during which
   * the processors run in lockstep.
   */
  private fineLines = 0;
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
    const denominator =
      options.machine.execution.screen.refresh * options.machine.execution.screen.vtotal;
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
    this.permanentLockstep = options.machine.execution.perfectQuantum === true &&
      this.processors.length > 1;
    this.order = Int32Array.from(this.processors, (_, index) => index);
    this.suspendable = this.processors.some(entry => entry.processor.suspended);
    for (const event of options.machine.execution.frameEvents) {
      if (event.frequency) {
        this.periodicEvents.push({
          event,
          eventsPerLine: event.frequency / denominator,
          carry: 0,
        });
        continue;
      }
      const lineEvents = this.eventsByLine.get(event.line) ?? [];
      lineEvents.push(event);
      this.eventsByLine.set(event.line, lineEvents);
    }
    // A periodic event has no fixed line and may fire several times within
    // one, and a scanline-updated screen renders on every line, so both keep
    // the per-line schedule MAME's own timers would force anyway.
    this.perLineSchedule = this.periodicEvents.length > 0 ||
      options.machine.execution.perfectQuantum === true ||
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
    let scanlineIncrementLines = Infinity;
    const vtotal = options.machine.execution.screen.vtotal;
    for (const callback of options.machine.callbacks ?? []) {
      if (callback.signal !== 'configure_scanline') continue;
      const increment = Number(callback.scanlineIncrement ?? 0);
      const start = Number(callback.scanlineStart ?? 0);
      if (!(increment > 0)) continue;
      scanlineIncrementLines = Math.min(scanlineIncrementLines, increment);
      for (let line = ((start % increment) + increment) % increment; line < vtotal; line += increment) {
        scanlineTimerLines.push(line);
      }
    }
    this.scanlineTimerLinesApart = scanlineIncrementLines;
    // A declared scanline TIMER is the board's own cadence and MAME ends every
    // timeslice on it: Gauntlet's 32 lines keep its sound board's reply burst
    // whole, MCR's single line keeps Rampage's handshake alive. With none
    // declared the empirical bound stands in for the timers this runtime does
    // not model.
    this.maximumQuantumLines = Number.isFinite(scanlineIncrementLines)
      ? scanlineIncrementLines
      : Math.max(1, Math.floor(MAX_QUANTUM_SECONDS * denominator));
    const machineQuantum = options.maximumQuantum;
    if (machineQuantum !== undefined && machineQuantum > 0) this.machineQuantum = secondsToAttoseconds(machineQuantum);
    this.boundaryLines = new Set([
      ...this.eventsByLine.keys(),
      ...scanlineTimerLines,
      options.machine.execution.screen.vbstart,
      options.machine.execution.screen.vtotal - 1,
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
   */
  quantumWindow(seconds: number): void {
    const denominator =
      this.machine.execution.screen.refresh * this.machine.execution.screen.vtotal;
    if (!(this.fineLines > 0)) {
      const interleave = this.perfectInterleave?.();
      this.windowQuantum = interleave !== undefined && interleave > 0 ? secondsToAttoseconds(interleave) : undefined;
    }
    this.fineLines = Math.max(this.fineLines, Math.max(seconds, 0) * denominator);
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
    // The first synchronize in the slice is where it ended.
    if (!this.synchronizeRequested) this.synchronizedAt = this.running.processor.position?.();
    this.synchronizeRequested = true;
    this.running.processor.abort?.();
    return true;
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

  /** How far a processor stands past the round's base, in its own cycles. */
  get cyclesAhead(): readonly number[] {
    return this.processors.map(entry => entry.local.since(this.base) / entry.cycle.total);
  }

  reset(): void {
    for (const processor of this.processors) processor.local.clear();
    this.frameBase.clear();
    this.base.clear();
    for (const event of this.periodicEvents) event.carry = 0;
    this.fineLines = 0;
    this.frames = 0;
    this.fromOrigin = true;
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
    return ['processors', 'frameBase', 'base', 'periodicEvents', 'fineLines', 'frames', 'fromOrigin'];
  }

  /**
   * Whether this frame is presented at the end of its last line, where the
   * beam next reaches `vbstart`: every frame-mode screen under MAME's origin,
   * since its frames run from VBLANK to VBLANK.
   */
  get presentsAtEnd(): boolean {
    return this.origin === 'vbstart' && this.machine.execution.screen.updateMode !== 'scanline' && this.originLine > 0;
  }

  frame(framebuffer: Uint32Array): void {
    const screen = this.machine.execution.screen;
    const vtotal = Math.max(1, screen.vtotal);
    const origin = this.originLine;
    let rendered = false;
    this.pendingLines = 0;
    this.awaitingPresent = this.presentsAtEnd;
    for (let index = 0; index < vtotal; index++) {
      const line = (origin + index) % vtotal;
      this.atOrigin = this.fromOrigin && index === 0 && this.origin === 'vbstart';
      if (this.runLine(line, framebuffer)) rendered = true;
    }
    this.atOrigin = false;
    this.fromOrigin = false;
    if (this.presentsAtEnd) {
      // The beam reaches vbstart again: what the processors still owe is
      // paid, and the frame is presented, as MAME presents at VBLANK.
      if (this.pendingLines > 0) {
        this.runProcessors(this.pendingLines, (origin + vtotal - 1) % vtotal);
        this.pendingLines = 0;
      }
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
    }
    if (this.eventPhase === 'before-processors' && !this.atOrigin) this.dispatchLine(line, framebuffer);
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
    const inQuantumWindow = this.fineLines > 0;
    if (this.perLineSchedule || inQuantumWindow || this.boundaryLines.has(line) ||
      this.pendingLines >= this.maximumQuantumLines) {
      this.runProcessors(this.pendingLines, line);
      this.pendingLines = 0;
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
  private runProcessors(lines: number, lastLine: number): void {
    const processors = this.processors;
    const base = this.base;
    const end = this.roundEnd;
    const target = this.target;
    const vtotal = Math.max(1, this.machine.execution.screen.vtotal);
    const endIndex = ((lastLine - this.originLine + vtotal) % vtotal) + 1;
    if (endIndex >= vtotal) end.set(this.frameBase).addTime(this.framePeriod);
    else end.setPeriodsFrom(this.frameBase, endIndex, this.linePeriod);
    this.roundStart.set(base);
    this.roundFirstLine = lastLine - lines + 1;
    this.roundLines = lines;
    // Work posted outside any slice (a line callback, an event) is due now.
    this.onSynchronize?.();
    while (base.before(end)) {
      this.onRound?.();
      if (this.permanentLockstep) {
        this.lockstep(end);
        continue;
      }
      // A perfect_quantum window is rounds of the perfect interleave, run by
      // the same rules as any other round.
      const windowed = this.fineLines > 0;
      if (windowed && this.windowQuantum === undefined) {
        this.lockstep(this.windowEnd(end));
        continue;
      }
      target.set(end);
      const quantum = windowed ? this.windowQuantum : this.machineQuantum;
      if (quantum !== undefined) this.lowerTarget(quantum);
      // MAME's round ends at the soonest timer, so every processor stands
      // at its expiry when it fires.
      let slop = 0;
      if (this.nextTimerSeconds) {
        const seconds = this.nextTimerSeconds(this.linesAt(base));
        if (seconds > 0 && Number.isFinite(seconds) && this.lowerTarget(secondsToAttoseconds(seconds))) slop = TIMER_SLOP;
      }
      const order = this.roundOrder();
      for (let position = 0; position < order.length; position++) {
        const scheduled = processors[order[position]!]!;
        const local = scheduled.local;
        const cycles = scheduled.cycle.within(local, target, slop);
        // Less than a cycle to the target: MAME neither runs it nor moves on.
        if (cycles === 0) continue;
        if (scheduled.processor.enabled && !scheduled.processor.enabled()) {
          local.addPeriods(cycles, scheduled.cycle);
          this.pullTarget(local, slop);
          continue;
        }
        this.running = scheduled;
        this.runStartLines = local.since(this.roundStart) / this.linePeriod.total;
        this.synchronizeRequested = false;
        this.synchronizedAt = undefined;
        // A window's slice is an instruction against a target of a cycle or
        // so, as a lockstep step is (see the board's lockstepping).
        this.lockstepping = windowed;
        let executed: number;
        try {
          executed = scheduled.processor.run(cycles);
        } finally {
          this.lockstepping = false;
        }
        this.running = undefined;
        // A core that stops between bus cycles ended the round where it
        // synchronized; finishing the instruction is its own overrun.
        const stopped = this.synchronizedAt !== undefined ? Math.min(executed, this.synchronizedAt) : executed;
        if (this.synchronizeRequested && stopped < cycles) {
          this.pullTarget(this.scratch.setPeriodsFrom(local, stopped, scheduled.cycle), slop);
        }
        local.addPeriods(executed, scheduled.cycle);
        // Whole cycles left it short of the target (MAME skips a waiting
        // device, which then stands wherever it stopped).
        if (!this.synchronizeRequested && scheduled.processor.suspended?.() !== 'waiting') this.pullTarget(local, slop);
        this.synchronizeRequested = false;
        this.synchronizedAt = undefined;
      }
      this.onSynchronize?.();
      this.onRoundEnd?.(this.linesAt(target));
      if (windowed) {
        this.fineLines -= target.since(base) / this.linePeriod.total;
        if (!(this.fineLines > 1e-9)) this.fineLines = 0;
      }
      base.set(target);
    }
  }

  /** Bring the target down to `attos` past the base; answers whether it moved. */
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
    const window = this.scratch.set(this.base).add(Math.floor(this.fineLines * this.linePeriod.total));
    return window.before(end) ? window : end;
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
    const processors = this.processors;
    let next = 0;
    for (let index = 0; index < processors.length; index++) {
      if (!processors[index]!.processor.suspended?.()) order[next++] = index;
    }
    for (let index = 0; index < processors.length; index++) {
      if (processors[index]!.processor.suspended?.()) order[next++] = index;
    }
    return order;
  }

  /**
   * The beam as the running processor sees it, `elapsedCycles` into its
   * slice: MAME's screen_device::vpos() reads the executing CPU's own local
   * time. Undefined outside a slice. Without it a round of many lines showed
   * every read the round's last line, and a game polling for VBLANK
   * (Phoenix, Rampage) never saw the beam move.
   */
  runningBeam(elapsedCycles: number): number | undefined {
    const running = this.running;
    // A one-line round is already resolved inside the line by the board's
    // instruction-time device clock, which boards such as the 2600 position
    // sprites by; only a round spanning lines needs the processor's position.
    if (!running || this.roundLines <= 1) return undefined;
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
      this.fineLines = 0;
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
    if (this.fineLines > 0 && !this.permanentLockstep) {
      this.fineLines -= end.since(base) / this.linePeriod.total;
      if (!(this.fineLines > 1e-9)) this.fineLines = 0;
    }
    base.set(end);
  }

  private dispatchLine(line: number, framebuffer: Uint32Array): void {
    for (const event of this.eventsByLine.get(line) ?? []) this.onEvent?.(event);
    for (const scheduled of this.periodicEvents) {
      scheduled.carry += scheduled.eventsPerLine;
      while (scheduled.carry >= 1) {
        scheduled.carry -= 1;
        this.onEvent?.(scheduled.event);
      }
    }
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
