// dac_mapper_unsigned in src/devices/sound/dac.cpp.
function dacUnsigned(input, bits) {
    const scale = 1 / (bits > 1 ? 2 ** bits : 1);
    return (input & (2 ** bits - 1)) * scale;
}
/**
 * dac_device_base's precomputed m_value_map, plus the output range it is
 * scaled into: -1..1 for every DAC except a one-bit one, which is 0..1.
 */
function dacValueMap(generator) {
    const { bits, mapper, gain } = generator;
    const rangeMin = bits === 1 ? 0 : -1;
    const rangeMax = 1;
    const map = new Float64Array(2 ** bits);
    for (let code = 0; code < map.length; code++) {
        const mapped = mapper === 'signed'
            ? dacUnsigned(code ^ (1 << (bits - 1)), bits)
            : mapper === 'ones_complement'
                ? (code & (1 << (bits - 1))
                    ? 0.5 - 0.5 * dacUnsigned(~code, bits - 1)
                    : 0.5 + 0.5 * dacUnsigned(code, bits - 1))
                : dacUnsigned(code, bits);
        map[code] = rangeMin + mapped * gain * (rangeMax - rangeMin);
    }
    return map;
}
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
    maps;
    gains;
    cvsd = new GeneratedHc55516Core();
    cvsdGain;
    constructor(chips = 1, routes = [], auxiliary = [], dacs = []) {
        this.values = new Float64Array(chips);
        this.seen = new Uint8Array(chips);
        // One value map per chip, because a board may mix DAC resolutions. A chip
        // the machine could not state a resolution for cannot be rendered at all:
        // guessing its width silently wraps every code that overflows the guess.
        this.maps = Array.from({ length: chips }, (_unused, chip) => {
            const generator = dacs[chip] ?? dacs[0];
            if (!generator)
                throw new Error(`no lowered DAC definition for chip ${chip}`);
            return dacValueMap(generator);
        });
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
        // dac_device_base::set_value masks the code to the chip's own resolution.
        const map = this.maps[chip];
        this.seen[chip] = 1;
        this.values[chip] = map[data & (map.length - 1)];
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
/**
 * filter_biquad_device, running at the rate its host renders.
 *
 * MAME derives the digital coefficients in recalc() from the cutoff, Q and
 * gain the machine configuration produced, against the stream's sample rate.
 * Both are reproduced here so a lowered op-amp stage sounds the same offline
 * in the acceptance probe as it does in the browser.
 */
class GeneratedBiquadFilter {
    b0 = 1;
    b1 = 0;
    b2 = 0;
    a1 = 0;
    a2 = 0;
    w0 = 0;
    w1 = 0;
    w2 = 0;
    constructor(stage, sampleRate) {
        const { type, frequency, q, gain } = stage;
        if (frequency >= sampleRate / 2) {
            // Above Nyquist a lowpass simply passes the signal, as MAME does.
            this.b0 = 1;
        }
        else if (type === 'lowpass1p') {
            const pole = Math.exp(-2 * Math.PI * (frequency / sampleRate));
            this.b0 = 1 - pole;
            this.a1 = -pole;
        }
        else {
            const k = Math.tan(Math.PI * frequency / sampleRate);
            const kSquared = k * k;
            const kOverQ = k / q;
            const normal = 1 / (1 + kOverQ + kSquared);
            this.b0 = kSquared * normal;
            this.b1 = 2 * this.b0;
            this.b2 = this.b0;
            this.a1 = 2 * (kSquared - 1) * normal;
            this.a2 = (1 - kOverQ + kSquared) * normal;
        }
        this.b0 *= gain;
        this.b1 *= gain;
        this.b2 *= gain;
    }
    step(input) {
        this.w2 = this.w1;
        this.w1 = this.w0;
        this.w0 = (-this.a1 * this.w1) + (-this.a2 * this.w2) + input;
        return (this.b0 * this.w0) + (this.b1 * this.w1) + (this.b2 * this.w2);
    }
}
export class GeneratedDacFrameRenderer {
    sampleCarry = 0;
    mixer;
    outputRate;
    refresh;
    filters;
    constructor(mixer, outputRate, refresh, filterChain = []) {
        this.mixer = mixer;
        this.outputRate = outputRate;
        this.refresh = refresh;
        this.filters = filterChain.map(stage => new GeneratedBiquadFilter(stage, outputRate));
    }
    filtered() {
        let sample = this.mixer.sample();
        for (const filter of this.filters)
            sample = filter.step(sample);
        return sample;
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
                output[sampleIndex++] = this.filtered();
            this.mixer.write(write.offset, write.data, write.method);
        }
        while (sampleIndex < count)
            output[sampleIndex++] = this.filtered();
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
                this.renderer = new GeneratedDacFrameRenderer(new GeneratedDacMixer(message.chips ?? 1, message.routes, message.auxiliaryDevices, message.dacs), sampleRate, message.refresh ?? 60, message.filterChain);
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
