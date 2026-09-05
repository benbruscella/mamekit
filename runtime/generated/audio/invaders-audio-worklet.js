// GENERATED from src/mame/midw8080/mw8080bw_a.cpp:3279; do not edit.
// Port wiring, voice topology, component values, LFSR, mixer resistances and
// routes come from MAME. Norton op-amp stages are lowered to stable browser
// component models rather than copied into a hand-written game runtime.
const plan = {
    "schemaVersion": 1,
    "type": "DISCRETE_SN76477",
    "deviceType": "INVADERS_AUDIO",
    "className": "invaders_audio_device",
    "workletName": "invaders-audio",
    "processorName": "discrete",
    "sampleRate": 48000,
    "ports": [
        {
            "method": "p1_w",
            "offset": 0
        },
        {
            "method": "p2_w",
            "offset": 1
        }
    ],
    "amplifier": {
        "port": 0,
        "mask": 32
    },
    "snControl": {
        "port": 0,
        "mask": 1
    },
    "sn76477": {
        "vcoCapacitance": 1e-7,
        "vcoResistance": 8200,
        "slfCapacitance": 0.000001,
        "slfResistance": 120000,
        "routeGain": 0.5
    },
    "lfsr": {
        "clock": 7515,
        "bits": 17,
        "reset": 131071,
        "tap0": 4,
        "tap1": 16,
        "outputBit": 12
    },
    "voices": [
        {
            "outputNode": "INVADERS_SAUCER_HIT_SND",
            "model": "warble",
            "control": {
                "port": 1,
                "mask": 16
            },
            "mixerResistance": 200000,
            "resistors": [
                100000,
                1000000,
                1000000,
                470000,
                100000,
                120000,
                1000000,
                1000000,
                470000,
                680000,
                1000000,
                1000000,
                680000,
                680000,
                2700000,
                680000
            ],
            "capacitors": [
                0.000001,
                1e-7,
                4.7e-10
            ],
            "sourceMacro": "INVADERS_SAUCER_HIT"
        },
        {
            "outputNode": "INVADERS_FLEET_SND",
            "model": "parallel-555",
            "control": {
                "port": 1,
                "mask": 15
            },
            "mixerResistance": 10200,
            "resistors": [
                75000,
                20000,
                20000,
                68000,
                82000,
                100000
            ],
            "capacitors": [
                1e-7,
                0.0000047,
                0.000009999999999999999
            ],
            "parallelResistors": [
                40000,
                68000,
                82000,
                100000
            ],
            "sourceMacro": "INVADERS_FLEET"
        },
        {
            "outputNode": "INVADERS_BONUS_MISSLE_BASE_SND",
            "model": "gated-555",
            "control": {
                "port": 0,
                "mask": 16
            },
            "mixerResistance": 150000,
            "resistors": [
                100000,
                47000
            ],
            "capacitors": [
                0.000001
            ],
            "toneHz": 480,
            "sourceMacro": "INVADERS_BONUS_MISSLE_BASE"
        },
        {
            "outputNode": "INVADERS_INVADER_HIT_SND",
            "model": "swept-square",
            "control": {
                "port": 0,
                "mask": 8
            },
            "mixerResistance": 200000,
            "resistors": [
                4700000,
                100000,
                1000000,
                1000000,
                2200000,
                10000,
                1000000,
                1000000,
                10000,
                100000,
                120000,
                1000000,
                1000000,
                470000,
                680000,
                1000000,
                1000000,
                470000,
                680000,
                2700000,
                680000
            ],
            "capacitors": [
                1e-7,
                4.7e-10,
                4.6999999999999995e-7,
                1e-7,
                3.3e-10
            ],
            "triggerCapacitance": 1e-7,
            "sourceMacro": "INVADERS_INVADER_HIT"
        },
        {
            "outputNode": "INVADERS_EXPLOSION_SND",
            "model": "filtered-noise",
            "control": {
                "port": 0,
                "mask": 4
            },
            "mixerResistance": 14400,
            "resistors": [
                5600,
                5600,
                6800,
                4700000,
                100000,
                1000000,
                1000000,
                2200000,
                2700000,
                680000,
                680000,
                10000,
                680000
            ],
            "capacitors": [
                1e-7,
                1e-7,
                0.0000022,
                4.7e-10,
                0.000001
            ],
            "triggerCapacitance": 0.0000022,
            "sourceMacro": "INVADERS_EXPLOSION"
        },
        {
            "outputNode": "INVADERS_MISSILE_SND",
            "model": "swept-square",
            "control": {
                "port": 0,
                "mask": 2
            },
            "mixerResistance": 150000,
            "resistors": [
                1000000,
                330000,
                330000,
                1000000,
                330000,
                4700000,
                100000,
                1000000,
                1000000,
                2200000,
                10000,
                1500000,
                1000000,
                330000,
                1500000,
                1000000,
                560000,
                2200000,
                1000000,
                4700000,
                3300000,
                2200000,
                560000,
                470000,
                2700000,
                560000,
                2700000,
                560000,
                560000,
                1000,
                560000
            ],
            "capacitors": [
                1e-7,
                0.000001,
                2.1999999999999998e-7,
                4.7e-10,
                2.1999999999999998e-7,
                3.3e-10,
                1e-7
            ],
            "triggerCapacitance": 0.000001,
            "sourceMacro": "INVADERS_MISSILE"
        }
    ],
    "outputGain": 2500,
    "discreteRouteGain": 0.5,
    "sourceFiles": [
        "src/mame/midw8080/mw8080bw_a.cpp"
    ],
    "source": {
        "file": "src/mame/midw8080/mw8080bw_a.cpp",
        "line": 3279
    }
};
const clamp = (value) => Math.max(-1, Math.min(1, value));
export class GeneratedDiscreteAudioCore {
    sampleRate;
    ports = new Uint8Array(plan.ports.length);
    states = plan.voices.map(() => ({
        env: 0, phase: 0, phase2: 0, time: 0,
        filter1: 0, filter2: 0, frequency: 0, center: 1200,
    }));
    minimumMixerResistance = Math.min(...plan.voices.map(voice => voice.mixerResistance));
    lfsr = plan.lfsr.reset;
    noise = -1;
    noisePhase = 0;
    snPhase = 0;
    snSlfPhase = 0;
    snEnv = 0;
    ampGain = 1;
    constructor(outputRate = plan.sampleRate) {
        this.sampleRate = outputRate;
    }
    write(offset, data, methodName) {
        // Boards route writes by method name; plan.ports carries the lowered
        // method -> port table, so no offset-numbering convention is shared.
        if (methodName !== undefined) {
            const port = plan.ports.find(entry => entry.method === methodName);
            if (!port)
                return;
            offset = port.offset;
        }
        if (offset < 0 || offset >= this.ports.length)
            return;
        const previous = this.ports[offset] ?? 0;
        this.ports[offset] = data & 0xff;
        plan.voices.forEach((voice, index) => {
            if (voice.control.port !== offset)
                return;
            const wasActive = (previous & voice.control.mask) !== 0;
            const active = (data & voice.control.mask) !== 0;
            const state = this.states[index];
            if (!state)
                return;
            if (active && !wasActive) {
                if (voice.model === 'swept-square' || voice.model === 'filtered-noise') {
                    state.env = 1;
                    state.time = 0;
                }
                if (voice.model === 'warble') {
                    state.center = 1200;
                    state.phase2 = 0;
                }
            }
            if (voice.model === 'parallel-555') {
                const bits = data & voice.control.mask;
                let conductance = 0;
                (voice.parallelResistors ?? []).forEach((resistance, bit) => {
                    if (bits & (1 << bit))
                        conductance += 1 / resistance;
                });
                const r2 = voice.resistors[0] ?? 75_000;
                const c = voice.capacitors[0] ?? 0.1e-6;
                state.frequency = conductance ? 1.44 / ((1 / conductance + 2 * r2) * c) : 0;
            }
        });
    }
    render(output) {
        for (let index = 0; index < output.length; index++)
            output[index] = this.sample();
    }
    sample() {
        const dt = 1 / this.sampleRate;
        this.noisePhase += plan.lfsr.clock * dt;
        while (this.noisePhase >= 1) {
            this.noisePhase -= 1;
            const feedback = ((this.lfsr >> plan.lfsr.tap0) ^ (this.lfsr >> plan.lfsr.tap1)) & 1;
            this.lfsr = ((this.lfsr << 1) | feedback) & ((2 ** plan.lfsr.bits) - 1);
            this.noise = (this.lfsr >> plan.lfsr.outputBit) & 1 ? 1 : -1;
        }
        const snOn = (this.ports[plan.snControl.port] & plan.snControl.mask) !== 0;
        this.snEnv += (Number(snOn) - this.snEnv) * 0.003;
        let mix = 0;
        if (this.snEnv > 1e-5) {
            const slfHz = 0.64 /
                (plan.sn76477.slfResistance * plan.sn76477.slfCapacitance);
            const vcoTop = 0.64 /
                (plan.sn76477.vcoResistance * plan.sn76477.vcoCapacitance) * 1.4;
            this.snSlfPhase = (this.snSlfPhase + slfHz * dt) % 1;
            const triangle = this.snSlfPhase < 0.5
                ? this.snSlfPhase * 2
                : 2 - this.snSlfPhase * 2;
            const frequency = vcoTop * (0.32 + 0.68 * triangle);
            this.snPhase = (this.snPhase + frequency * dt) % 1;
            mix += (this.snPhase < 0.5 ? 1 : -1) * this.snEnv *
                plan.sn76477.routeGain * 0.64;
        }
        plan.voices.forEach((voice, voiceIndex) => {
            const state = this.states[voiceIndex];
            const active = (this.ports[voice.control.port] & voice.control.mask) !== 0;
            const gain = Math.sqrt(this.minimumMixerResistance / voice.mixerResistance) *
                plan.discreteRouteGain * 0.9;
            let value = 0;
            if (voice.model === 'parallel-555') {
                state.env = active
                    ? state.env + (1 - state.env) * this.lowpassK(160)
                    : state.env * this.decayK(0.035);
                state.phase = (state.phase + state.frequency * dt) % 1;
                const raw = (state.phase < 0.5 ? 1 : -1) * state.env;
                const c1 = voice.capacitors[1] ?? 4.7e-6;
                const c2 = voice.capacitors[2] ?? 10e-6;
                state.filter1 += (raw - state.filter1) * this.rcK(100, c1);
                state.filter2 += (state.filter1 - state.filter2) * this.rcK(200, c2);
                value = state.filter2;
            }
            else if (voice.model === 'gated-555') {
                if (active) {
                    const r1 = voice.resistors[0] ?? 100_000;
                    const r2 = voice.resistors[1] ?? 47_000;
                    const c = voice.capacitors[0] ?? 1e-6;
                    const gateHz = 1.44 / ((r1 + 2 * r2) * c);
                    const duty = (r1 + r2) / (r1 + 2 * r2);
                    state.phase = (state.phase + gateHz * dt) % 1;
                    state.phase2 = (state.phase2 + (voice.toneHz ?? 480) * dt) % 1;
                    if (state.phase < duty)
                        value = state.phase2 < 0.5 ? 1 : -1;
                }
            }
            else if (voice.model === 'filtered-noise') {
                const cap = voice.triggerCapacitance ?? 1e-6;
                state.env *= this.decayK(0.06 + cap * 110_000);
                const c1 = voice.capacitors[0] ?? 0.1e-6;
                const c2 = voice.capacitors[1] ?? 0.1e-6;
                const r1 = voice.resistors[0] ?? 5_600;
                const r2 = (voice.resistors[1] ?? 5_600) + (voice.resistors[2] ?? 6_800);
                state.filter1 += (this.noise * state.env - state.filter1) * this.rcK(r1, c1);
                state.filter2 += (state.filter1 - state.filter2) * this.rcK(r2, c2);
                value = state.filter2;
            }
            else if (voice.model === 'swept-square') {
                const cap = voice.triggerCapacitance ?? 0.5e-6;
                const scale = Math.sqrt(Math.max(0.1, cap / 0.1e-6));
                const endHz = 180 + 45 * scale;
                const rangeHz = 900 + 300 * scale;
                const sweepTau = 0.045 + 0.025 * scale;
                state.env *= this.decayK(0.07 + cap * 55_000);
                const frequency = (endHz + rangeHz * Math.exp(-state.time / sweepTau)) *
                    (1 + 0.22 * this.noise);
                state.phase = (state.phase + frequency * dt) % 1;
                value = (state.phase < 0.5 ? 1 : -1) * state.env;
                state.time += dt;
            }
            else if (voice.model === 'warble') {
                state.env = active
                    ? state.env + (1 - state.env) * 0.005
                    : state.env * this.decayK(0.03);
                state.center = 500 + (state.center - 500) * this.decayK(0.5);
                state.phase2 = (state.phase2 + 6 * dt) % 1;
                const triangle = state.phase2 < 0.5
                    ? state.phase2 * 2
                    : 2 - state.phase2 * 2;
                state.phase = (state.phase + state.center * (0.6 + 0.4 * triangle) * dt) % 1;
                value = (state.phase < 0.5 ? 1 : -1) * state.env;
            }
            mix += value * gain;
        });
        const ampOn = (this.ports[plan.amplifier.port] & plan.amplifier.mask) !== 0;
        this.ampGain += (Number(ampOn) - this.ampGain) * this.lowpassK(80);
        return clamp(mix * this.ampGain);
    }
    decayK(seconds) {
        return Math.exp(-1 / (Math.max(seconds, 1e-6) * this.sampleRate));
    }
    lowpassK(hz) {
        return 1 - Math.exp(-2 * Math.PI * hz / this.sampleRate);
    }
    rcK(resistance, capacitance) {
        return 1 - Math.exp(-1 / (resistance * capacitance * this.sampleRate));
    }
}
export class GeneratedDiscreteAudioFrameRenderer {
    carry = 0;
    core;
    outputRate;
    refresh;
    constructor(core, outputRate, refresh) {
        this.core = core;
        this.outputRate = outputRate;
        this.refresh = refresh;
    }
    render(writes) {
        this.carry += this.outputRate / this.refresh;
        const count = Math.floor(this.carry);
        this.carry -= count;
        const output = new Float32Array(count);
        let sampleIndex = 0;
        for (const write of writes) {
            const writeSample = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
            while (sampleIndex < writeSample)
                output[sampleIndex++] = this.core.sample();
            this.core.write(write.offset, write.data, write.method);
        }
        while (sampleIndex < count)
            output[sampleIndex++] = this.core.sample();
        return output;
    }
}
class GeneratedDiscreteAudioProcessor extends AudioWorkletProcessor {
    core;
    renderer;
    frames = [];
    current;
    index = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.core = new GeneratedDiscreteAudioCore(sampleRate);
                this.renderer = new GeneratedDiscreteAudioFrameRenderer(this.core, sampleRate, message.refresh ?? 60);
            }
            else if (message.type === 'write') {
                this.core?.write(message.offset ?? 0, message.data ?? 0, message.method);
            }
            else if (message.type === 'batch' && this.renderer) {
                this.frames.push(this.renderer.render(message.writes ?? []));
                while (this.frames.length > 3)
                    this.frames.shift();
            }
        };
    }
    lastSample = 0;
    next() {
        while (!this.current || this.index >= this.current.length) {
            this.current = this.frames.shift();
            this.index = 0;
            // Starved: hold the last sample. A 0-fill is a hard step on any
            // mix with a DC offset (e.g. tied-pin AY outputs) and pops loudly.
            if (!this.current)
                return this.lastSample;
        }
        return (this.lastSample = this.current[this.index++]);
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        const output = channels?.[0];
        if (!output)
            return true;
        for (let index = 0; index < output.length; index++)
            output[index] = this.next();
        for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
            channels[channel].set(output);
        }
        return true;
    }
}
registerProcessor(plan.processorName, GeneratedDiscreteAudioProcessor);
