// Contract for acceptance audio probes.
//
// The harness used to switch on sound kind and construct each family's mixer
// and frame renderer inline, which meant a new sound family had to be added
// there as well as everywhere else. A capability package now supplies its own
// renderer; the harness keeps what is generic — collecting frames, hashing
// them, and comparing against the golden.
/**
 * Resample a device-native frame stream to the probe/browser output rate.
 * Some MAME sound devices synthesize above 48 kHz (Namco WSG uses 192 kHz);
 * concatenating those native frames into a 48 kHz WAV stretches time and
 * invalidates every onset/frequency comparison.
 */
export class StreamingFrameResampler {
    source;
    step;
    samplesPerFrame;
    chunks = [];
    outputCarry = 0;
    sourcePosition = 0;
    fraction = 0;
    sample0 = 0;
    sample1 = 0;
    constructor(source, sourceRate, outputRate, refresh) {
        this.source = source;
        this.step = sourceRate / outputRate;
        this.samplesPerFrame = outputRate / refresh;
    }
    render(writes) {
        this.chunks.push(this.source.render(writes));
        this.outputCarry += this.samplesPerFrame;
        const count = Math.floor(this.outputCarry);
        this.outputCarry -= count;
        const output = new Float32Array(count);
        for (let index = 0; index < output.length; index++) {
            this.fraction += this.step;
            while (this.fraction >= 1) {
                this.fraction -= 1;
                this.sample0 = this.sample1;
                this.sample1 = this.nextSourceSample();
            }
            output[index] = this.sample0 + (this.sample1 - this.sample0) * this.fraction;
        }
        return output;
    }
    nextSourceSample() {
        while (this.chunks.length && this.sourcePosition >= this.chunks[0].length) {
            this.chunks.shift();
            this.sourcePosition = 0;
        }
        if (!this.chunks.length)
            return 0;
        return this.chunks[0][this.sourcePosition++];
    }
}
