// GENERATED from src/devices/sound/sn76496.cpp:195; do not edit.
// Register protocol, divider, polarity and LFSR taps come from MAME.
const plan = {
    "schemaVersion": 1,
    "type": "SN76489A",
    "className": "sn76489a_device",
    "feedbackMask": 65536,
    "whiteNoiseTap1": 4,
    "whiteNoiseTap2": 8,
    "negate": false,
    "stereo": false,
    "clockDivider": 8,
    "ncrStyle": false,
    "segaStyle": false,
    "writeMethod": "write",
    "sourceFiles": [
        "src/devices/sound/sn76496.cpp",
        "src/devices/sound/sn76496.h"
    ],
    "source": {
        "file": "src/devices/sound/sn76496.cpp",
        "line": 195
    }
};
class GeneratedSn76489Core {
    registers = new Int32Array(8);
    volumes = new Float64Array(4);
    periods = new Int32Array(4);
    counts = new Int32Array(4);
    outputs = new Int32Array(4);
    volumeTable = new Float64Array(16);
    lastRegister = plan.segaStyle ? 3 : 0;
    rng = plan.feedbackMask;
    constructor() {
        let level = 0.25;
        for (let index = 0; index < 15; index++) {
            this.volumeTable[index] = level;
            level /= 1.258925412;
        }
        for (let channel = 0; channel < 4; channel++) {
            this.registers[channel * 2 + 1] = plan.segaStyle ? 15 : 0;
            this.volumes[channel] = this.volumeTable[this.registers[channel * 2 + 1]];
            this.periods[channel] = plan.segaStyle || channel === 3 ? 0 : 0x400;
        }
        this.outputs[3] = this.rng & 1;
    }
    write(data) {
        data &= 0xff;
        let register;
        if (data & 0x80) {
            register = (data & 0x70) >> 4;
            this.lastRegister = register;
            if (plan.ncrStyle && register === 6 &&
                ((data & 4) !== (this.registers[6] & 4)))
                this.rng = plan.feedbackMask;
            this.registers[register] =
                (this.registers[register] & 0x3f0) | (data & 0x0f);
        }
        else {
            register = this.lastRegister;
        }
        const channel = register >> 1;
        if (register === 0 || register === 2 || register === 4) {
            if (!(data & 0x80)) {
                this.registers[register] =
                    (this.registers[register] & 0x0f) | ((data & 0x3f) << 4);
            }
            this.periods[channel] = this.registers[register] || plan.segaStyle
                ? this.registers[register]
                : 0x400;
            if (register === 4 && (this.registers[6] & 3) === 3) {
                this.periods[3] = this.periods[2] << 1;
            }
        }
        else if (register === 1 || register === 3 || register === 5 || register === 7) {
            this.volumes[channel] = this.volumeTable[data & 0x0f];
            if (!(data & 0x80)) {
                this.registers[register] =
                    (this.registers[register] & 0x3f0) | (data & 0x0f);
            }
        }
        else if (register === 6) {
            if (!(data & 0x80)) {
                this.registers[register] =
                    (this.registers[register] & 0x3f0) | (data & 0x0f);
            }
            const noise = this.registers[6];
            this.periods[3] = (noise & 3) === 3
                ? this.periods[2] << 1
                : 1 << (5 + (noise & 3));
            if (!plan.ncrStyle)
                this.rng = plan.feedbackMask;
        }
    }
    step() {
        for (let channel = 0; channel < 3; channel++) {
            if (--this.counts[channel] <= 0) {
                this.outputs[channel] ^= 1;
                this.counts[channel] = this.periods[channel];
            }
        }
        if (--this.counts[3] <= 0) {
            const tap1 = (this.rng & plan.whiteNoiseTap1) !== 0;
            const tap2 = (this.rng & plan.whiteNoiseTap2) !==
                (plan.ncrStyle ? plan.whiteNoiseTap2 : 0);
            const feedback = tap1 !== (tap2 && Boolean(this.registers[6] & 4));
            this.rng >>>= 1;
            if (feedback)
                this.rng |= plan.feedbackMask;
            this.outputs[3] = this.rng & 1;
            this.counts[3] = this.periods[3];
        }
    }
    sample() {
        let output = 0;
        for (let channel = 0; channel < 4; channel++) {
            if (this.outputs[channel])
                output += this.volumes[channel];
        }
        return plan.negate ? -output : output;
    }
}
export class GeneratedSn76489Mixer {
    cores;
    phases;
    stepsPerSample;
    gains;
    constructor(clock, chips, outputRate, routes = []) {
        this.cores = Array.from({ length: chips }, () => new GeneratedSn76489Core());
        this.phases = new Float64Array(chips);
        this.stepsPerSample = clock / (2 * plan.clockDivider * outputRate);
        this.gains = Float64Array.from({ length: chips }, (_unused, chip) => Math.max(0, ...routes.filter(route => route.chip === chip).map(route => route.gain)) || 1);
    }
    write(chip, data) {
        this.cores[chip]?.write(data);
    }
    sample() {
        let mixed = 0;
        for (let chip = 0; chip < this.cores.length; chip++) {
            this.phases[chip] += this.stepsPerSample;
            while (this.phases[chip] >= 1) {
                this.cores[chip].step();
                this.phases[chip]--;
            }
            mixed += this.cores[chip].sample() * this.gains[chip];
        }
        return mixed / Math.max(1, this.cores.length);
    }
}
export class GeneratedSn76489FrameRenderer {
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
            this.mixer.write(write.offset, write.data);
        }
        while (sampleIndex < count)
            output[sampleIndex++] = this.mixer.sample();
        return output;
    }
}
class GeneratedSn76489Processor extends AudioWorkletProcessor {
    renderer;
    frames = [];
    current;
    currentIndex = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                const mixer = new GeneratedSn76489Mixer(message.clock ?? 2_000_000, message.chips ?? 1, sampleRate, message.routes);
                this.renderer = new GeneratedSn76489FrameRenderer(mixer, sampleRate, message.refresh ?? 60);
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
        for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
            channels[channel].set(output);
        }
        return true;
    }
}
registerProcessor('sn76489', GeneratedSn76489Processor);
