class GeneratedHc55516Core {
    digit = false;
    clock = false;
    shift = 0;
    syllabic = 0x3f;
    integrator = 0;
    output = 0;
    signed10(value) {
        const masked = value & 0x3ff;
        return masked & 0x200 ? masked - 0x400 : masked;
    }
    write(method, data) {
        if (method.endsWith('.digit_w')) {
            this.digit = Boolean(data);
            return;
        }
        if (!method.endsWith('.clock_w'))
            return;
        const clock = Boolean(data);
        if (clock === this.clock)
            return;
        const bit = this.digit;
        const frozen = (this.integrator >= 0x180 && !bit) ||
            (this.integrator <= -0x180 && bit);
        let sum;
        if (clock) {
            this.shift = (this.shift << 1) | Number(bit);
            const coincident = (this.shift & 7) === 0 || (this.shift & 7) === 7;
            if (!frozen) {
                this.syllabic += ((~this.syllabic & 0xfc0) >>> 6) + (coincident ? 0 : 0xfc1);
                this.syllabic &= 0xfff;
            }
            sum = this.signed10(((~this.integrator) >> 4) + 1);
        }
        else {
            const step = Math.max(2, this.syllabic >>> 6);
            sum = this.shift & 1 ? this.signed10((~step) + 1) : this.signed10(step);
        }
        if (!frozen)
            this.integrator = this.signed10(this.integrator + sum);
        this.output = ((this.integrator << 6) |
            (((this.integrator & 0x3ff) ^ 0x200) >>> 4)) / 32768;
        this.clock = clock;
    }
    sample() { return this.output; }
}
export class GeneratedDacMixer {
    values;
    seen;
    wide;
    gains;
    cvsd = new GeneratedHc55516Core();
    cvsdGain;
    constructor(chips = 1, routes = [], auxiliary = []) {
        this.values = new Float64Array(chips);
        this.seen = new Uint8Array(chips);
        this.wide = new Uint8Array(chips);
        this.gains = Float64Array.from({ length: chips }, (_unused, chip) => Math.max(0, ...routes.filter(route => route.chip === chip).map(route => route.gain)) || 1);
        this.cvsdGain = Math.max(0, ...auxiliary
            .filter(device => device.type === 'HC55516')
            .map(device => device.gain));
    }
    write(chip, data, method) {
        if (method?.includes('cvsd.')) {
            this.cvsd.write(method, data);
            return;
        }
        if (chip < 0 || chip >= this.values.length)
            return;
        const byte = data & 0xff;
        if (byte > 1)
            this.wide[chip] = 1;
        this.seen[chip] = 1;
        this.values[chip] = this.wide[chip]
            ? (byte - 128) / 128
            : byte ? 1 : -1;
    }
    sample() {
        let mixed = 0;
        let gain = 0;
        for (let chip = 0; chip < this.values.length; chip++) {
            if (!this.seen[chip])
                continue;
            mixed += this.values[chip] * this.gains[chip];
            gain += this.gains[chip];
        }
        if (this.cvsdGain) {
            mixed += this.cvsd.sample() * this.cvsdGain;
            gain += this.cvsdGain;
        }
        return gain ? mixed / gain : 0;
    }
}
export class GeneratedDacFrameRenderer {
    sampleCarry = 0;
    mixer;
    outputRate;
    refresh;
    constructor(mixer, outputRate, refresh) {
        this.mixer = mixer;
        this.outputRate = outputRate;
        this.refresh = refresh;
    }
    render(writes) {
        this.sampleCarry += this.outputRate / this.refresh;
        const count = Math.floor(this.sampleCarry);
        this.sampleCarry -= count;
        const output = new Float32Array(count);
        let sampleIndex = 0;
        for (const write of writes) {
            const writeSample = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
            while (sampleIndex < writeSample)
                output[sampleIndex++] = this.mixer.sample();
            this.mixer.write(write.offset, write.data, write.method);
        }
        while (sampleIndex < count)
            output[sampleIndex++] = this.mixer.sample();
        return output;
    }
}
class GeneratedDacProcessor extends AudioWorkletProcessor {
    renderer;
    frames = [];
    current;
    currentIndex = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.renderer = new GeneratedDacFrameRenderer(new GeneratedDacMixer(message.chips ?? 1, message.routes, message.auxiliaryDevices), sampleRate, message.refresh ?? 60);
            }
            else if (message.type === 'batch' && this.renderer) {
                this.frames.push(this.renderer.render(message.writes ?? []));
                while (this.frames.length > 3)
                    this.frames.shift();
            }
        };
    }
    lastSample = 0;
    nextSample() {
        while (!this.current || this.currentIndex >= this.current.length) {
            this.current = this.frames.shift();
            this.currentIndex = 0;
            // Starved: hold the last sample. A 0-fill is a hard step on any
            // mix with a DC offset (e.g. tied-pin AY outputs) and pops loudly.
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
        for (let channel = 1; channel < (channels?.length ?? 0); channel++)
            channels[channel].set(output);
        return true;
    }
}
registerProcessor('dac', GeneratedDacProcessor);
