// GENERATED from src/devices/sound/sn76496.cpp:190, src/devices/sound/sn76496.cpp:195; do not edit.
// Register protocol, divider, polarity and LFSR taps come from MAME.
const plans = [
    {
        "schemaVersion": 1,
        "type": "SN76489",
        "className": "sn76489_device",
        "feedbackMask": 16384,
        "whiteNoiseTap1": 1,
        "whiteNoiseTap2": 2,
        "negate": true,
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
            "line": 190
        }
    },
    {
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
    }
];
const planByType = new Map(plans.map(entry => [entry.type, entry]));
/** The chip's own MAME type selects its variant; an unnamed chip keeps SN76489. */
function generatedSn76489Plan(type) {
    return (type ? planByType.get(type) : undefined) ?? plans[0];
}
// samples_device selects external WAVs in MAME. The generated runtime cannot
// redistribute those packs, so it uses the same deterministic, role-based
// fallback as the standalone SAMPLES capability. Crucially, these commands
// remain a separate stream: feeding them to chip zero as SN register bytes
// corrupts both PSG state and the acceptance signal.
class GeneratedSn76489SamplesCore {
    voices = Array.from({ length: 16 }, () => ({
        active: false, loop: false, sample: 0, phase: 0, age: 0, volume: 1, noise: 1,
    }));
    random = 0x5a17c9e3;
    outputRate;
    constructor(outputRate) {
        this.outputRate = outputRate;
    }
    write(offset, data, method) {
        const voice = this.voices[offset & 15];
        if (method === 'stop') {
            voice.active = false;
            return;
        }
        if (method === 'set_volume') {
            voice.volume = (data & 0xff) / 255;
            return;
        }
        if (method !== 'start')
            return;
        voice.sample = data & 0x7f;
        voice.loop = Boolean(data & 0x80);
        voice.active = true;
        voice.phase = 0;
        voice.age = 0;
    }
    sampleValue() {
        const durations = [1.4, 0.75, 1.2, 2.0, 0.42, 0.95, 0.18, 0.16, 0.55, 0.8, 9, 9];
        let mixed = 0;
        for (const voice of this.voices) {
            if (!voice.active)
                continue;
            const duration = durations[voice.sample] ?? 0.35;
            const elapsed = voice.age / this.outputRate;
            if (!voice.loop && elapsed >= duration) {
                voice.active = false;
                continue;
            }
            const envelope = voice.loop ? 1 : Math.max(0, 1 - elapsed / duration);
            mixed += this.signal(voice, elapsed) * envelope * voice.volume * 0.22;
            voice.age++;
        }
        return Math.max(-1, Math.min(1, mixed));
    }
    signal(voice, elapsed) {
        const id = voice.sample;
        let frequency = 90;
        let noiseMix = 0;
        if (id === 0)
            frequency = 720 - Math.min(500, elapsed * 360);
        else if (id === 1) {
            frequency = 180 + elapsed * 460;
            noiseMix = 0.35;
        }
        else if (id === 2)
            frequency = 1050 + Math.sin(elapsed * 31) * 190;
        else if (id === 3)
            frequency = 58 + Math.sin(elapsed * 7) * 8;
        else if (id === 4 || id === 5) {
            frequency = id === 4 ? 72 : 48;
            noiseMix = 0.9;
        }
        else if (id === 6) {
            frequency = 135;
            noiseMix = 0.75;
        }
        else if (id === 7)
            frequency = 620 - elapsed * 900;
        else if (id === 8)
            frequency = 880;
        else if (id === 9)
            frequency = Math.floor(elapsed * 7) & 1 ? 430 : 650;
        else if (id === 10) {
            frequency = 46 + Math.sin(elapsed * 2.3) * 5;
            noiseMix = 0.18;
        }
        else if (id === 11) {
            frequency = 32;
            noiseMix = 0.72;
        }
        else
            frequency = 110 + id * 37;
        voice.phase = (voice.phase + Math.max(1, frequency) / this.outputRate) % 1;
        let tone = id === 2 || id === 8 || id === 9
            ? (voice.phase < 0.5 ? 1 : -1)
            : Math.sin(voice.phase * Math.PI * 2);
        if (noiseMix) {
            this.random ^= this.random << 13;
            this.random ^= this.random >>> 17;
            this.random ^= this.random << 5;
            voice.noise += (((this.random & 1) ? 1 : -1) - voice.noise) * 0.16;
            tone = tone * (1 - noiseMix) + voice.noise * noiseMix;
        }
        return tone;
    }
}
class GeneratedSn76489Core {
    registers = new Int32Array(8);
    volumes = new Float64Array(4);
    periods = new Int32Array(4);
    counts = new Int32Array(4);
    outputs = new Int32Array(4);
    volumeTable = new Float64Array(16);
    plan;
    lastRegister;
    rng;
    constructor(plan = plans[0]) {
        this.plan = plan;
        this.lastRegister = plan.segaStyle ? 3 : 0;
        this.rng = plan.feedbackMask;
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
            if (this.plan.ncrStyle && register === 6 &&
                ((data & 4) !== (this.registers[6] & 4)))
                this.rng = this.plan.feedbackMask;
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
            this.periods[channel] = this.registers[register] || this.plan.segaStyle
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
            if (!this.plan.ncrStyle)
                this.rng = this.plan.feedbackMask;
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
            const tap1 = (this.rng & this.plan.whiteNoiseTap1) !== 0;
            const tap2 = (this.rng & this.plan.whiteNoiseTap2) !==
                (this.plan.ncrStyle ? this.plan.whiteNoiseTap2 : 0);
            const feedback = tap1 !== (tap2 && Boolean(this.registers[6] & 4));
            this.rng >>>= 1;
            if (feedback)
                this.rng |= this.plan.feedbackMask;
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
        return this.plan.negate ? -output : output;
    }
}
export class GeneratedSn76489Mixer {
    cores;
    phases;
    stepsPerSample;
    gains;
    samples;
    /**
     * deviceTypes and clocks are per chip: a machine config may fit two
     * different family members, or the same one at two clocks (Congo Bongo runs
     * its second SN76489A at a quarter of the first's).
     */
    constructor(clock, chips, outputRate, routes = [], deviceTypes = [], clocks = [], auxiliaryDevices = []) {
        const chipPlan = (chip) => generatedSn76489Plan(deviceTypes[chip]);
        this.cores = Array.from({ length: chips }, (_unused, chip) => new GeneratedSn76489Core(chipPlan(chip)));
        this.phases = new Float64Array(chips);
        this.stepsPerSample = Float64Array.from({ length: chips }, (_unused, chip) => (clocks[chip] ?? clock) / (2 * chipPlan(chip).clockDivider * outputRate));
        this.gains = Float64Array.from({ length: chips }, (_unused, chip) => Math.max(0, ...routes.filter(route => route.chip === chip).map(route => route.gain)) || 1);
        this.samples = auxiliaryDevices
            .filter(device => device.type === 'SAMPLES')
            .map(device => ({
            deviceTag: device.deviceTag,
            gain: device.gain,
            core: new GeneratedSn76489SamplesCore(outputRate),
        }));
    }
    write(chip, data, method) {
        if (method !== undefined) {
            const separator = method.lastIndexOf('.');
            const deviceTag = separator < 0 ? '' : method.slice(0, separator);
            const deviceMethod = separator < 0 ? method : method.slice(separator + 1);
            const samples = this.samples.find(device => device.deviceTag === deviceTag);
            samples?.core.write(chip, data, deviceMethod);
            return;
        }
        this.cores[chip]?.write(data);
    }
    sample() {
        let mixed = 0;
        for (let chip = 0; chip < this.cores.length; chip++) {
            this.phases[chip] += this.stepsPerSample[chip];
            while (this.phases[chip] >= 1) {
                this.cores[chip].step();
                this.phases[chip]--;
            }
            mixed += this.cores[chip].sample() * this.gains[chip];
        }
        mixed /= Math.max(1, this.cores.length);
        for (const device of this.samples) {
            mixed += device.core.sampleValue() * device.gain;
        }
        return Math.max(-1, Math.min(1, mixed));
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
            this.mixer.write(write.offset, write.data, write.method);
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
                const mixer = new GeneratedSn76489Mixer(message.clock ?? 2_000_000, message.chips ?? 1, sampleRate, message.routes, message.deviceTypes, message.clocks, message.auxiliaryDevices);
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
