// GENERATED from src/devices/sound/tiasound.cpp, src/devices/sound/tiaintf.cpp; do not edit.
// Carries no register model and no DSP: the chip runs as a generated device
// (device_start, tia_sound_w, sound_stream_update, poly_init) and posts its samples here.
/**
 * One video frame of output, resampled from the chip's stream.
 *
 * The chip renders at its own clock and the host runs at whatever the audio
 * context chose, so samples are held across the ratio between them -- the
 * zero-order hold MAME's stream applies to the same device.
 */
export class GeneratedStreamFrameRenderer {
    queue = [];
    phase = 0;
    held = 0;
    carry = 0;
    rate;
    outputRate;
    refresh;
    constructor(rate, outputRate, refresh) {
        this.rate = rate;
        this.outputRate = outputRate;
        this.refresh = refresh;
    }
    push(sample) {
        // A stall must not turn into an unbounded backlog: a queued sample is
        // permanent latency, not a dropped one.
        if (this.queue.length < 8192)
            this.queue.push(sample);
    }
    render() {
        this.carry += this.outputRate / this.refresh;
        const count = Math.floor(this.carry);
        this.carry -= count;
        const output = new Float32Array(count);
        const step = this.rate / this.outputRate;
        for (let index = 0; index < count; index++) {
            this.phase += step;
            while (this.phase >= 1) {
                this.phase -= 1;
                if (this.queue.length)
                    this.held = this.queue.shift();
            }
            output[index] = this.held;
        }
        return output;
    }
}
class GeneratedStreamProcessor extends AudioWorkletProcessor {
    renderer;
    frames = [];
    current;
    currentIndex = 0;
    lastSample = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.renderer = new GeneratedStreamFrameRenderer(message.clock ?? sampleRate, sampleRate, message.refresh ?? 60);
            }
            else if (message.type === 'batch' && this.renderer) {
                for (const write of message.writes ?? [])
                    this.renderer.push(write.data);
                this.frames.push(this.renderer.render());
                while (this.frames.length > 3)
                    this.frames.shift();
            }
        };
    }
    nextSample() {
        while (!this.current || this.currentIndex >= this.current.length) {
            this.current = this.frames.shift();
            this.currentIndex = 0;
            // Starved: hold, rather than step to zero and pop.
            if (!this.current)
                return this.lastSample;
        }
        return (this.lastSample = this.current[this.currentIndex++]);
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        const output = channels?.[0];
        if (!output)
            return true;
        for (let index = 0; index < output.length; index++)
            output[index] = this.nextSample();
        for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
            channels[channel].set(output);
        }
        return true;
    }
}
registerProcessor('tia', GeneratedStreamProcessor);
