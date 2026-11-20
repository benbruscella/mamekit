// GENERATED from src/emu/sound.cpp; do not edit.
// Carries no register model and no DSP: the chip runs as a generated device
// (sound_stream_update) and posts its samples here.
/**
 * One video frame of output, resampled from the chip's stream.
 *
 * The chip renders at its own clock and the host runs at whatever the audio
 * context chose, so samples are held across the ratio between them -- the
 * zero-order hold MAME's stream applies to the same device.
 */
export class GeneratedStreamFrameRenderer {
    queue = [];
    /** Each queued sample's left and right (the mono sample on a mono board). */
    leftQueue = [];
    rightQueue = [];
    phase = 0;
    held = 0;
    heldLeft = 0;
    heldRight = 0;
    /** The left and right of the frame render() returned last. */
    sides = [new Float32Array(0), new Float32Array(0)];
    carry = 0;
    rate;
    outputRate;
    refresh;
    constructor(rate, outputRate, refresh) {
        this.rate = rate;
        this.outputRate = outputRate;
        this.refresh = refresh;
    }
    push(sample, left = sample, right = left) {
        // A stall must not turn into an unbounded backlog: a queued sample is
        // permanent latency, not a dropped one.
        if (this.queue.length >= 8192)
            return;
        this.queue.push(sample);
        this.leftQueue.push(left);
        this.rightQueue.push(right);
    }
    /**
     * A board write: only a stream's samples (`stream.pcm`, `<tag>.pcm`)
     * are sound. The sink carries the board's other writes too -- Battlezone's
     * `m_discrete->write` to a netlist not lowered yet -- and pushed as
     * samples they were full-scale clicks.
     */
    write(write) {
        if (write.method === undefined || write.method.endsWith('.pcm'))
            this.push(write.data, write.left ?? write.data, write.right ?? write.left ?? write.data);
    }
    render() {
        this.carry += this.outputRate / this.refresh;
        const count = Math.floor(this.carry);
        this.carry -= count;
        const output = new Float32Array(count);
        const left = new Float32Array(count);
        const right = new Float32Array(count);
        const step = this.rate / this.outputRate;
        for (let index = 0; index < count; index++) {
            this.phase += step;
            while (this.phase >= 1) {
                this.phase -= 1;
                if (this.queue.length) {
                    this.held = this.queue.shift();
                    this.heldLeft = this.leftQueue.shift();
                    this.heldRight = this.rightQueue.shift();
                }
            }
            output[index] = this.held;
            left[index] = this.heldLeft;
            right[index] = this.heldRight;
        }
        this.sides = [left, right];
        return output;
    }
}
class GeneratedStreamProcessor extends AudioWorkletProcessor {
    renderer;
    /** Rendered frames, each its mono mix and its left and right. */
    frames = [];
    current;
    currentIndex = 0;
    lastSample = 0;
    lastLeft = 0;
    lastRight = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.renderer = new GeneratedStreamFrameRenderer(message.clock ?? sampleRate, sampleRate, message.refresh ?? 60);
            }
            else if (message.type === 'batch' && this.renderer) {
                for (const write of message.writes ?? [])
                    this.renderer.write(write);
                const mono = this.renderer.render();
                this.frames.push([mono, ...this.renderer.sides]);
                while (this.frames.length > 3)
                    this.frames.shift();
            }
        };
    }
    /** Steps one sample on; false when starved, which holds the last one rather than popping to zero. */
    nextSample() {
        while (!this.current || this.currentIndex >= this.current[0].length) {
            this.current = this.frames.shift();
            this.currentIndex = 0;
            if (!this.current)
                return false;
        }
        const at = this.currentIndex++;
        this.lastSample = this.current[0][at];
        this.lastLeft = this.current[1][at];
        this.lastRight = this.current[2][at];
        return true;
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        const output = channels?.[0];
        if (!output)
            return true;
        // Two channels play the left and the right; one, the mono mix.
        const right = channels[1];
        for (let index = 0; index < output.length; index++) {
            this.nextSample();
            if (right) {
                output[index] = this.lastLeft;
                right[index] = this.lastRight;
            }
            else {
                output[index] = this.lastSample;
            }
        }
        for (let channel = 2; channel < channels.length; channel++)
            channels[channel].set(output);
        return true;
    }
}
registerProcessor('stream', GeneratedStreamProcessor);
