import type { VideoRenderer } from './types.ts';
import type { BoardIr, GeneratedFrameEvent } from '../ir/board.ts';

export interface GeneratedFrameProcessor {
  tag: string;
  clock?: number;
  run(cycles: number): number;
  enabled?: () => boolean;
  /** MAME abort_timeslice: stop after the instruction in progress. */
  abort?: () => void;
}

/**
 * The longest any processor may run ahead of the others where the board
 * declares no timer cadence of its own.
 *
 * What bounds a timeslice in MAME is the soonest timer, and that bounds a
 * round here too (`nextTimerSeconds`, plus a scanline TIMER's own period).
 * Not every timer this runtime hosts is visible to that query, so a board
 * with no declared cadence keeps the empirical bound the schedule used before
 * timers were modelled at all: Galaga's 54xx boot boom is knife-edge
 * sensitive to it, and a five-line round silences a boom that is already far
 * quieter than MAME's.
 */
const MAX_QUANTUM_SECONDS = 250e-6;




export interface GeneratedFrameRunnerOptions {
  machine: BoardIr;
  processors: GeneratedFrameProcessor[];
  video?: VideoRenderer;
  eventPhase?: 'before-processors' | 'after-processors';
  onEvent?: (event: GeneratedFrameEvent) => void;
  /** Run the `scheduler().synchronize()` work posted since the last call. */
  onSynchronize?: () => void;

  onLine?: (
    line: number,
    phase: 'before-processors' | 'after-processors',
    framebuffer: Uint32Array,
  ) => void;
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

  /** How far into the current round each processor has been credited. */
  private readonly credited: Float64Array;
  /** The processor whose slice is executing, if any. */
  private running?: GeneratedFrameRunner['processors'][number];
  /** Work was synchronized during the running slice. */
  private synchronizeRequested = false;
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
  private frames = 0;

  constructor(options: GeneratedFrameRunnerOptions) {
    this.machine = options.machine;
    this.video = options.video;
    this.eventPhase = options.eventPhase ?? 'after-processors';
    this.onEvent = options.onEvent;
    this.onLine = options.onLine;
    this.onSynchronize = options.onSynchronize;

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
    // not model. Either way `nextTimerSeconds` may still shorten the round.
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
    this.synchronizeRequested = true;
    this.running.processor.abort?.();
    return true;
  }

  get frameCount(): number {
    return this.frames;
  }

  get currentCarry(): readonly number[] {
    return this.processors.map(processor => processor.carry);
  }

  reset(): void {
    for (const processor of this.processors) processor.carry = 0;
    for (const event of this.periodicEvents) event.carry = 0;
    this.fineLines = 0;
    this.frames = 0;
  }

  /** Save-state roots (machine-state.ts): the carries and counters, never the schedule. */
  stateKeys(): readonly string[] {
    return ['processors', 'periodicEvents', 'fineLines', 'frames'];
  }

  frame(framebuffer: Uint32Array): void {
    const screen = this.machine.execution.screen;
    let rendered = false;
    let pendingLines = 0;
    for (let line = 0; line < screen.vtotal; line++) {
      this.onLine?.(line, 'before-processors', framebuffer);
      // A scheduled event ends the quantum, so what the processors owe from
      // the lines since the last one is paid before the event — and before the
      // frame this line may present — rather than after it.
      if (pendingLines > 0 && this.boundaryLines.has(line)) {
        this.runProcessors(pendingLines, line - 1);
        pendingLines = 0;
      }
      if (this.eventPhase === 'before-processors') this.dispatchLine(line, framebuffer);
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
      if (screen.updateMode !== 'scanline' && line === screen.vbstart) {
        this.video?.render(framebuffer);
        rendered = true;
      }

      pendingLines++;
      const inQuantumWindow = this.fineLines > 0;
      if (this.perLineSchedule || inQuantumWindow || this.boundaryLines.has(line) ||
        pendingLines >= this.maximumQuantumLines) {
        this.runProcessors(pendingLines, line);
        pendingLines = 0;
      }

      this.onLine?.(line, 'after-processors', framebuffer);
      if (this.eventPhase === 'after-processors') this.dispatchLine(line, framebuffer);
    }
    this.frames++;
    // A board whose vbstart sits outside the emulated line range never hit the
    // in-loop presentation above; keep the end-of-frame fallback for it.
    if (screen.updateMode !== 'scanline' && !rendered) this.video?.render(framebuffer);
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
        const target = Math.floor(scheduled.carry);
        if (target <= 0) continue;
        this.running = scheduled;
        this.runStartLines = credited[index]! * lines - scheduled.carry / scheduled.cyclesPerLine;
        this.synchronizeRequested = false;
        const executed = scheduled.processor.run(target);
        this.running = undefined;
        scheduled.carry -= executed;
        if (this.synchronizeRequested && executed < target) {
          const stoppedAt = credited[index]! - scheduled.carry / (scheduled.cyclesPerLine * lines);
          reached = Math.max(done, Math.min(reached, stoppedAt));
        }
        this.synchronizeRequested = false;
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
   * The `perfect_quantum` window: from `done` to the window's end (or the
   * round's), the processor furthest behind in emulated time executes one
   * instruction, then any work that instruction synchronized runs.
   */
  private lockstep(lines: number, done: number): number {
    const processors = this.processors;
    const credited = this.credited;
    const end = Math.min(1, done + this.fineLines / lines);
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
      behind.carry -= behind.processor.run(1);
      this.running = undefined;
      this.synchronizeRequested = false;
      this.onSynchronize?.();
    }
    this.fineLines = this.fineLines - (end - done) * lines;
    if (!(this.fineLines > 1e-9)) this.fineLines = 0;
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
    if (line === this.machine.execution.screen.vbstart) this.video?.vblank();
  }
}
