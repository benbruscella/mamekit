/**
 * Execute the frame schedule lowered from MAME CPU clocks, screen timing, and
 * callback configuration. Device cores remain reusable runtime primitives;
 * the generated machine owns when they run and when source callbacks fire.
 */
export class GeneratedFrameRunner {
    machine;
    processors;
    video;
    eventPhase;
    onEvent;
    onLine;
    eventsByLine = new Map();
    periodicEvents = [];
    frames = 0;
    constructor(options) {
        this.machine = options.machine;
        this.video = options.video;
        this.eventPhase = options.eventPhase ?? 'after-processors';
        this.onEvent = options.onEvent;
        this.onLine = options.onLine;
        const clocks = new Map(options.machine.execution.cpus.map(cpu => [cpu.tag, cpu.cycleClock ?? cpu.clock]));
        const denominator = options.machine.execution.screen.refresh * options.machine.execution.screen.vtotal;
        this.processors = options.processors.map(processor => {
            const clock = processor.clock ?? clocks.get(processor.tag);
            if (clock === undefined) {
                throw new Error(`generated frame plan has no CPU clock for "${processor.tag}"`);
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
    }
    get frameCount() {
        return this.frames;
    }
    get currentCarry() {
        return this.processors.map(processor => processor.carry);
    }
    reset() {
        for (const processor of this.processors)
            processor.carry = 0;
        for (const event of this.periodicEvents)
            event.carry = 0;
        this.frames = 0;
    }
    frame(framebuffer) {
        const screen = this.machine.execution.screen;
        for (let line = 0; line < screen.vtotal; line++) {
            this.onLine?.(line, 'before-processors', framebuffer);
            if (this.eventPhase === 'before-processors')
                this.dispatchLine(line);
            // MAME's VIDEO_UPDATE_SCANLINE timer calls update_partial at the start
            // of the scanline, before CPUs execute the interval leading to the next
            // line. Drawing afterwards can combine sprite RAM from two states across
            // one frame; on a rotated screen that appears as vertical sprite tears.
            if (screen.updateMode === 'scanline')
                this.video?.renderLine?.(framebuffer, line);
            for (const scheduled of this.processors) {
                if (scheduled.processor.enabled && !scheduled.processor.enabled())
                    continue;
                scheduled.carry += scheduled.cyclesPerLine;
                const target = Math.floor(scheduled.carry);
                if (target > 0)
                    scheduled.carry -= scheduled.processor.run(target);
            }
            this.onLine?.(line, 'after-processors', framebuffer);
            if (this.eventPhase === 'after-processors')
                this.dispatchLine(line);
        }
        this.frames++;
        if (screen.updateMode !== 'scanline')
            this.video?.render(framebuffer);
    }
    dispatchLine(line) {
        for (const event of this.eventsByLine.get(line) ?? [])
            this.onEvent?.(event);
        for (const scheduled of this.periodicEvents) {
            scheduled.carry += scheduled.eventsPerLine;
            while (scheduled.carry >= 1) {
                scheduled.carry -= 1;
                this.onEvent?.(scheduled.event);
            }
        }
        if (line === this.machine.execution.screen.vbstart)
            this.video?.vblank();
    }
}
