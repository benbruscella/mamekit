import type { VideoRenderer } from './types.ts';
import type { BoardIr, GeneratedFrameEvent } from '../ir/board.ts';

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

/** Far below a cycle and far above the rounding of a line-fraction carry. */
const CARRY_ROUNDING = 1e-6;




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
    /** Changes only through setClock (MAME set_unscaled_clock). */
    cyclesPerLine: number;
    carry: number;
  }[];
  private readonly video?: VideoRenderer;
  private readonly eventPhase: 'before-processors' | 'after-processors';
  private readonly onEvent?: (event: GeneratedFrameEvent) => void;
  private readonly onLine?: GeneratedFrameRunnerOptions['onLine'];
  private readonly onSynchronize?: () => void;
  private readonly onRound?: () => void;
  private readonly onPresented?: () => void;
  private readonly aroundPresent?: (render: () => void) => void;

  /** How far into the current round each processor has been credited. */
  private readonly credited: Float64Array;
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
  /** Where in the round, in lines, the running processor's slice began. */
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
    this.processors = options.processors.map(processor => {
      const clock = processor.clock ?? clocks.get(processor.tag);
      if (clock === undefined) {
        throw new Error(`generated frame plan has no execute-participant clock for "${processor.tag}"`);
      }
      return { processor, cyclesPerLine: clock / denominator, carry: 0 };
    });
    this.permanentLockstep = options.machine.execution.perfectQuantum === true &&
      this.processors.length > 1;
    this.credited = new Float64Array(this.processors.length);
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
    const denominator =
      this.machine.execution.screen.refresh * this.machine.execution.screen.vtotal;
    for (const entry of this.processors) {
      if (entry.processor.tag === tag) entry.cyclesPerLine = cycleClock / denominator;
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
   * before (a negative carry). An NES OAM DMA steals 513 cycles inside one
   * instruction, which leaves the CPU four lines past where its round ended.
   */
  linesBehind(tag: string): number {
    const scheduled = this.processors.find(entry => entry.processor.tag === tag);
    if (!scheduled) return this.pendingLines;
    return this.pendingLines + scheduled.carry / scheduled.cyclesPerLine;
  }

  get currentCarry(): readonly number[] {
    return this.processors.map(processor => processor.carry);
  }

  reset(): void {
    for (const processor of this.processors) processor.carry = 0;
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

  /** Save-state roots (machine-state.ts): the carries and counters, never the schedule. */
  stateKeys(): readonly string[] {
    return ['processors', 'periodicEvents', 'fineLines', 'frames', 'fromOrigin'];
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
   * A processor that synchronizes stops short, and the round's target drops
   * to where it stopped for every processor after it -- MAME's
   * `if (exec->m_localtime < target) target = exec->m_localtime`. Processors
   * before it have already run to the full target and stay ahead, as they do
   * in MAME. The posted work then runs and the round continues from there.
   */
  private runProcessors(lines: number, lastLine: number): void {
    const processors = this.processors;
    const credited = this.credited;
    credited.fill(0);
    this.roundFirstLine = lastLine - lines + 1;
    this.roundLines = lines;
    // Work posted outside any slice (a line callback, an event) is due now.
    this.onSynchronize?.();
    let done = 0;
    while (done < 1) {
      this.onRound?.();
      if (this.permanentLockstep) {
        done = this.lockstep(lines, done, 1);
        continue;
      }
      if (this.fineLines > 0) {
        done = this.lockstep(lines, done);
        continue;
      }
      let reached = 1;
      for (let index = 0; index < processors.length; index++) {
        const scheduled = processors[index]!;
        if (scheduled.processor.enabled && !scheduled.processor.enabled()) {
          credited[index] = 1;
          continue;
        }
        if (credited[index]! < reached) {
          scheduled.carry += scheduled.cyclesPerLine * lines * (reached - credited[index]!);
          credited[index] = reached;
        }
        // The carry is cycles reached through line fractions, so a whole
        // number of cycles can arrive a rounding error short of itself: a
        // POKEY behind a CPU that synchronized was owed 14 cycles, ran 13,
        // and took the SKCTL write a clock early.
        const target = Math.floor(scheduled.carry + CARRY_ROUNDING);
        if (target <= 0) continue;
        this.running = scheduled;
        this.runStartLines = credited[index]! * lines - scheduled.carry / scheduled.cyclesPerLine;
        this.synchronizeRequested = false;
        this.synchronizedAt = undefined;
        const executed = scheduled.processor.run(target);
        this.running = undefined;
        scheduled.carry -= executed;
        // A core that stops between bus cycles ended the round where it
        // synchronized; finishing the instruction is its own overrun.
        const stopped = this.synchronizedAt !== undefined ? Math.min(executed, this.synchronizedAt) : executed;
        if (this.synchronizeRequested && stopped < target) {
          const stoppedAt = credited[index]! - (scheduled.carry + executed - stopped) / (scheduled.cyclesPerLine * lines);
          reached = Math.max(done, Math.min(reached, stoppedAt));
        }
        this.synchronizeRequested = false;
        this.synchronizedAt = undefined;
      }
      this.onSynchronize?.();
      done = reached;
    }
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
   * The `perfect_quantum` window: from `done` to the window's end (or the
   * round's), the processor furthest behind in emulated time executes one
   * instruction, then any work that instruction synchronized runs.
   */
  private lockstep(lines: number, done: number, until?: number): number {
    const processors = this.processors;
    const credited = this.credited;
    const end = until ?? Math.min(1, done + this.fineLines / lines);
    // Subtracting spent fractions leaves floating-point residue: a window of
    // 4e-16 lines advanced the round by nothing, forever. Anything shorter
    // than a billionth of a line is over.
    if (end - done < 1e-9) {
      this.fineLines = 0;
      return done;
    }
    for (let index = 0; index < processors.length; index++) {
      const scheduled = processors[index]!;
      if (credited[index]! < end) {
        if (!scheduled.processor.enabled || scheduled.processor.enabled()) {
          scheduled.carry += scheduled.cyclesPerLine * lines * (end - credited[index]!);
        }
        credited[index] = end;
      }
    }
    for (;;) {
      // Every instruction in the window is a round of its own.
      this.onRound?.();
      let behind: GeneratedFrameRunner['processors'][number] | undefined;
      let owed = 0;
      for (const scheduled of processors) {
        if (scheduled.carry < 1) continue;
        if (scheduled.processor.enabled && !scheduled.processor.enabled()) continue;
        const lineDebt = scheduled.carry / scheduled.cyclesPerLine;
        if (!behind || lineDebt > owed) {
          behind = scheduled;
          owed = lineDebt;
        }
      }
      if (!behind) break;
      this.running = behind;
      this.runStartLines = end * lines - behind.carry / behind.cyclesPerLine;
      this.lockstepping = true;
      try {
        behind.carry -= behind.processor.run(1);
      } finally {
        this.lockstepping = false;
      }
      this.running = undefined;
      this.synchronizeRequested = false;
      this.onSynchronize?.();
    }
    if (until === undefined) {
      this.fineLines = this.fineLines - (end - done) * lines;
      if (!(this.fineLines > 1e-9)) this.fineLines = 0;
    }
    return end;
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
