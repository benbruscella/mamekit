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
/** MAME's relative-axis direction suffixes, and which pointer axis each reads. */
const AXES = [['_LEFT', '_RIGHT', 'x'], ['_UP', '_DOWN', 'y']];
export class PointerInput {
    axes = { x: [], y: [] };
    input;
    target = null;
    listeners = [];
    captured = false;
    debug = false;
    constructor(input, bindings) {
        this.input = input;
        for (const [negativeSuffix, positiveSuffix, axis] of AXES) {
            for (const positive of bindings) {
                if (positive.relativeDelta === undefined || !positive.type?.endsWith(positiveSuffix))
                    continue;
                const stem = positive.type.slice(0, -positiveSuffix.length);
                const negative = bindings.find(candidate => candidate.type === stem + negativeSuffix && candidate.port === positive.port &&
                    candidate.mask === positive.mask && (candidate.player ?? 1) === (positive.player ?? 1));
                if (!negative || (positive.player ?? 1) !== 1)
                    continue;
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
    get active() { return this.axes.x.length + this.axes.y.length > 0; }
    /** The bindings pointer movement reaches, for the legend. */
    bindings() {
        return [...this.axes.x, ...this.axes.y].map(axis => axis.positive);
    }
    /** Called when the pointer is captured by or released from the screen. */
    onChange(listener) { this.listeners.push(listener); }
    get isCaptured() { return this.captured; }
    /** Accumulate pointer travel in pixels. */
    move(dx, dy) {
        for (const axis of this.axes.x)
            axis.pending += dx;
        for (const axis of this.axes.y)
            axis.pending += dy;
    }
    /**
     * Deliver the frame's travel as whole port units, keeping the fraction for
     * the next frame. Called once per emulated frame from the run loop.
     */
    advance() {
        for (const axis of [...this.axes.x, ...this.axes.y]) {
            if (!axis.pending)
                continue;
            const scaled = axis.pending * axis.sensitivity / 100;
            const whole = Math.trunc(scaled);
            if (!whole)
                continue;
            axis.pending -= whole * 100 / axis.sensitivity;
            if (Math.abs(axis.pending) < 1e-9)
                axis.pending = 0;
            this.input.nudge(axis.positive, whole * axis.sign);
            if (this.debug) {
                console.log(`[pointer] ${axis.positive.label} ${whole * axis.sign > 0 ? '+' : ''}${whole * axis.sign} | ${this.input.dump()}`);
            }
        }
    }
    /**
     * Listen on the screen. As in MAME, every mouse movement while the page
     * has focus turns the dial -- a spinner's cursor wanders wherever it
     * likes, and where it is means nothing. A click on the cabinet captures
     * the pointer so the cursor stops wandering at all; Escape (the browser's
     * own exit) hands it back.
     */
    attach(screen, doc = document) {
        if (!this.active)
            return;
        this.target = screen;
        (screen.parentElement ?? screen).addEventListener('click', () => {
            if (doc.pointerLockElement === screen)
                return;
            // Raw counts, please: the OS's pointer acceleration turns a fast roll
            // of a trackball into a lurch. Older browsers reject the option, and
            // then the plain lock is still better than none.
            const lock = screen;
            const attempt = lock.requestPointerLock?.({ unadjustedMovement: true });
            if (attempt && typeof attempt.catch === 'function') {
                attempt.catch(() => lock.requestPointerLock?.());
            }
        });
        doc.addEventListener('pointerlockchange', () => this.setCaptured(doc.pointerLockElement === screen));
        doc.addEventListener('mousemove', event => {
            const mouse = event;
            if (this.captured || doc.hasFocus())
                this.move(mouse.movementX, mouse.movementY);
        });
    }
    setCaptured(captured) {
        if (captured === this.captured)
            return;
        this.captured = captured;
        if (this.debug)
            console.log(`[pointer] ${captured ? 'captured' : 'released'}`);
        for (const listener of this.listeners)
            listener(captured);
    }
}
