import type { VideoRenderer } from './types.ts';
import type { BoardIr, GeneratedFrameEvent } from '../ir/board.ts';

export interface GeneratedFrameProcessor {
  tag: string;
  clock?: number;
  run(cycles: number): number;
  enabled?: () => boolean;
}

/**
 * The longest any processor may run ahead of the others.
 *
 * MAME's own maximum quantum is a whole frame, but its real one is bounded by
 * every device timer it has, and the timers this runtime models tick once per
 * scanline. Claiming a whole frame of atomicity on a board that schedules
 * nothing is therefore claiming more than the model supports: Phoenix and
 * Rampage both stop drawing when their processors run a couple of hundred
 * lines at a stretch.
 *
 * The bound is squeezed from both sides, and the window is narrower than it
 * looks. Too coarse and a fast processor runs thousands of cycles while the
 * one it is handshaking with waits: at one millisecond Gyruss lost half of
 * its sound writes and Juno First a third, both boards where an 8 MHz i8039
 * feeds a DAC under a slower CPU's direction. Too fine and a driver's own
 * `perfect_quantum` request stops meaning anything -- Gauntlet asks for 100
 * us, so at a 100 us bound the boost can no longer shorten the interval and
 * the sound handshake it exists to protect breaks again.
 *
 * 250 us sits between them: fine enough that no board's handshake starves,
 * coarse enough that a 100 us boost still tightens the schedule. It restores
 * every regressed board to within 0.4% of its pre-quantum write count while
 * leaving Gauntlet's intact.
 *
 * This is an empirical bound, not a derived one. The derived version is to
 * lower the device timers MAME clamps its own timeslice against, which would
 * make the cap redundant for boards that schedule real work.
 */
const MAX_QUANTUM_SECONDS = 0.00025;

export interface GeneratedFrameRunnerOptions {
  machine: BoardIr;
  processors: GeneratedFrameProcessor[];
  video?: VideoRenderer;
  eventPhase?: 'before-processors' | 'after-processors';
  onEvent?: (event: GeneratedFrameEvent) => void;
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
    cyclesPerLine: number;
    carry: number;
  }[];
  private readonly video?: VideoRenderer;
  private readonly eventPhase: 'before-processors' | 'after-processors';
  private readonly onEvent?: (event: GeneratedFrameEvent) => void;
  private readonly onLine?: GeneratedFrameRunnerOptions['onLine'];
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
  /** Lines left in a `perfect_quantum` window, during which every line breaks. */
  private fineLines = 0;
  private frames = 0;

  constructor(options: GeneratedFrameRunnerOptions) {
    this.machine = options.machine;
    this.video = options.video;
    this.eventPhase = options.eventPhase ?? 'after-processors';
    this.onEvent = options.onEvent;
    this.onLine = options.onLine;
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
      options.machine.execution.screen.updateMode === 'scanline';
    this.maximumQuantumLines = Math.max(1, Math.floor(MAX_QUANTUM_SECONDS * denominator));
    this.boundaryLines = new Set([
      ...this.eventsByLine.keys(),
      options.machine.execution.screen.vbstart,
      options.machine.execution.screen.vtotal - 1,
    ]);
  }

  /**
   * MAME `scheduler::perfect_quantum(duration)` as a quantum, not as a run.
   *
   * The request means "interleave as finely as possible for this long", which
   * is what a driver appends to a latch callback so the far side is given real
   * time promptly. It must not run the other processor *now*: the writer is
   * mid-routine, and on Gauntlet the two instructions after the command write
   * are the ones that arm the buffer the answer belongs in.
   */
  quantumWindow(seconds: number): void {
    const denominator =
      this.machine.execution.screen.refresh * this.machine.execution.screen.vtotal;
    const lines = Math.ceil(Math.min(Math.max(seconds, 0), MAX_QUANTUM_SECONDS) * denominator);
    this.fineLines = Math.max(this.fineLines, lines);
  }

  get frameCount(): number {
    return this.frames;
  }

  get currentCarry(): readonly number[] {
    return this.processors.map(processor => processor.carry);
  }

  /**
   * MAME `scheduler::perfect_quantum` — run every processor except the one
   * that asked, right now.
   *
   * The frame schedule interleaves processors once per scanline, which is
   * coarse enough that a CPU can publish and overwrite a value inside a single
   * slice: MCR's Sounds Good command latch presents two nibbles 45us apart,
   * and the sound board only ever saw the second one. MAME's answer is to
   * interleave finely for a short window, and the interval it asks for is the
   * one honoured here. Cycles are charged against each processor's carry, so
   * the boost changes when a processor runs, never how much.
   */
  boost(activeTag: string, seconds: number): void {
    const window = Math.min(Math.max(seconds, 0), MAX_QUANTUM_SECONDS);
    if (window === 0) return;
    const denominator =
      this.machine.execution.screen.refresh * this.machine.execution.screen.vtotal;
    for (const scheduled of this.processors) {
      if (scheduled.processor.tag === activeTag) continue;
      if (scheduled.processor.enabled && !scheduled.processor.enabled()) continue;
      const cycles = Math.floor(window * scheduled.cyclesPerLine * denominator);
      if (cycles > 0) scheduled.carry -= scheduled.processor.run(cycles);
    }
  }

  reset(): void {
    for (const processor of this.processors) processor.carry = 0;
    for (const event of this.periodicEvents) event.carry = 0;
    this.frames = 0;
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
        this.runProcessors(pendingLines);
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
      if (inQuantumWindow) this.fineLines--;
      if (this.perLineSchedule || inQuantumWindow || this.boundaryLines.has(line) ||
        pendingLines >= this.maximumQuantumLines) {
        this.runProcessors(pendingLines);
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

  /** Run every enabled processor for `lines` scanlines' worth of cycles. */
  private runProcessors(lines: number): void {
    for (const scheduled of this.processors) {
      if (scheduled.processor.enabled && !scheduled.processor.enabled()) continue;
      scheduled.carry += scheduled.cyclesPerLine * lines;
      const target = Math.floor(scheduled.carry);
      if (target > 0) scheduled.carry -= scheduled.processor.run(target);
    }
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
