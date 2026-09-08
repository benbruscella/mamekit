// Mouse, spinner and trackball -> the generated relative fields.
//
// A spinner or an arcade trackball reaches the browser as a USB mouse, so
// the third input source is pointer movement. It drives only the controls
// MAME calls relative -- dials and trackballs, generated as a LEFT/RIGHT or
// UP/DOWN pair of pulse halves -- and it moves them the way ioport.cpp does
// for a relative device: every pixel of travel is PORT_SENSITIVITY/100 port
// units, accumulated across frames so nothing is lost to rounding. The
// keyboard's per-frame ramp and the pad's held direction stay as they are;
// this only adds distance.

import type { FieldBinding, KeyboardInput } from './input.ts';

/** One relative axis: the half that decrements and the half that increments. */
interface Axis {
  positive: FieldBinding;
  /** the sign a positive pixel delta carries into the port (PORT_REVERSE flips it) */
  sign: number;
  /** MAME's sensitivity, percent */
  sensitivity: number;
  /** pixels travelled since the last frame, fractional carry included */
  pending: number;
}

/** MAME's relative-axis direction suffixes, and which pointer axis each reads. */
const AXES: [string, string, 'x' | 'y'][] = [['_LEFT', '_RIGHT', 'x'], ['_UP', '_DOWN', 'y']];

export class PointerInput {
  private axes: { x: Axis[]; y: Axis[] } = { x: [], y: [] };
  private input: KeyboardInput;
  private target: Element | null = null;
  private listeners: ((captured: boolean) => void)[] = [];
  private captured = false;
  debug = false;

  constructor(input: KeyboardInput, bindings: FieldBinding[]) {
    this.input = input;
    for (const [negativeSuffix, positiveSuffix, axis] of AXES) {
      for (const positive of bindings) {
        if (positive.relativeDelta === undefined || !positive.type?.endsWith(positiveSuffix)) continue;
        const stem = positive.type.slice(0, -positiveSuffix.length);
        const negative = bindings.find(candidate =>
          candidate.type === stem + negativeSuffix && candidate.port === positive.port &&
          candidate.mask === positive.mask && (candidate.player ?? 1) === (positive.player ?? 1));
        if (!negative || (positive.player ?? 1) !== 1) continue;
        this.axes[axis].push({
          positive,
          sign: Math.sign(positive.relativeDelta) || 1,
          sensitivity: positive.sensitivity ?? 100,
          pending: 0,
        });
      }
    }
  }

  /** Whether this machine has any control a pointer can drive. */
  get active(): boolean { return this.axes.x.length + this.axes.y.length > 0; }

  /** The bindings pointer movement reaches, for the legend. */
  bindings(): FieldBinding[] {
    return [...this.axes.x, ...this.axes.y].map(axis => axis.positive);
  }

  /** Called when the pointer is captured by or released from the screen. */
  onChange(listener: (captured: boolean) => void): void { this.listeners.push(listener); }

  get isCaptured(): boolean { return this.captured; }

  /**
   * Accumulate pointer travel in pixels. Only movement while captured, or
   * over the screen itself, counts; a mouse crossing the page is not a spin.
   */
  move(dx: number, dy: number): void {
    for (const axis of this.axes.x) axis.pending += dx;
    for (const axis of this.axes.y) axis.pending += dy;
  }

  /**
   * Deliver the frame's travel as whole port units, keeping the fraction for
   * the next frame. Called once per emulated frame from the run loop.
   */
  advance(): void {
    for (const axis of [...this.axes.x, ...this.axes.y]) {
      if (!axis.pending) continue;
      const scaled = axis.pending * axis.sensitivity / 100;
      const whole = Math.trunc(scaled);
      if (!whole) continue;
      axis.pending -= whole * 100 / axis.sensitivity;
      if (Math.abs(axis.pending) < 1e-9) axis.pending = 0;
      this.input.nudge(axis.positive, whole * axis.sign);
      if (this.debug) {
        console.log(`[pointer] ${axis.positive.label} ${whole * axis.sign > 0 ? '+' : ''}${whole * axis.sign} | ${this.input.dump()}`);
      }
    }
  }

  /**
   * Listen on the screen. A click captures the pointer so a spinner can turn
   * forever without the cursor leaving; Escape (the browser's own exit) hands
   * it back. Movement over the screen counts even without capture, which is
   * what a trackpad user gets without a click.
   */
  attach(screen: Element, doc: Document = document): void {
    if (!this.active) return;
    this.target = screen;
    screen.addEventListener('click', () => {
      if (doc.pointerLockElement !== screen) (screen as HTMLElement).requestPointerLock?.();
    });
    doc.addEventListener('pointerlockchange', () => this.setCaptured(doc.pointerLockElement === screen));
    doc.addEventListener('mousemove', event => {
      const mouse = event as MouseEvent;
      if (this.captured || mouse.target === this.target) this.move(mouse.movementX, mouse.movementY);
    });
  }

  private setCaptured(captured: boolean): void {
    if (captured === this.captured) return;
    this.captured = captured;
    if (this.debug) console.log(`[pointer] ${captured ? 'captured' : 'released'}`);
    for (const listener of this.listeners) listener(captured);
  }
}
