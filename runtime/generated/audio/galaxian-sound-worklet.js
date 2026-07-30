// GENERATED from src/mame/galaxian/galaxian_a.cpp:734; do not edit.
// Register routing, clock division, component values and LFSR topology are
// lowered from the selected MAME discrete sound device and netlist.
const plan = {
    "schemaVersion": 1,
    "type": "COUNTER_LFSR_DISCRETE",
    "deviceType": "GALAXIAN_SOUND",
    "className": "galaxian_sound_device",
    "workletName": "galaxian-sound",
    "processorName": "discrete",
    "methodBases": {
        "lfo_freq_w": 0,
        "pitch_w": 256,
        "sound_w": 512
    },
    "methodRoles": {
        "pitch": "pitch_w",
        "lfo": "lfo_freq_w",
        "controls": "sound_w"
    },
    "controls": {
        "background": [
            0,
            1,
            2
        ],
        "noise": 3,
        "fire": 5,
        "volume": [
            6,
            7
        ]
    },
    "clockDivider": 2,
    "lfsr": {
        "bits": 17,
        "reset": 0,
        "tap0": 4,
        "tap1": 16
    },
    "lfoResistors": [
        1000000,
        470000,
        220000,
        100000
    ],
    "backgroundLfo": {
        "bitVoltage": 4,
        "biasVoltage": 4.4,
        "biasResistance": 15000,
        "groundResistance": 330000,
        "currentResistance": 100000,
        "capacitance": 0.000001,
        "supplyVoltage": 5,
        "junctionVoltage": 0.7,
        "controlGain": 1.4255319148936172,
        "controlOffset": -1.0638297872340425,
        "controlMinimum": 0,
        "controlMaximum": 5
    },
    "background555": {
        "chargeResistors": [
            100000,
            100000,
            100000
        ],
        "dischargeResistors": [
            470000,
            330000,
            220000
        ],
        "capacitors": [
            1e-8,
            1e-8,
            1e-8
        ],
        "supplyVoltage": 5,
        "outputHighVoltage": 4.5,
        "mixerResistances": [
            10000,
            10000,
            10000
        ],
        "filterCapacitance": 1e-7
    },
    "backgroundResistors": [
        470000,
        330000,
        220000
    ],
    "backgroundCapacitors": [
        1e-8,
        1e-8,
        1e-8
    ],
    "toneResistors": [
        33000,
        22000,
        10000,
        15000
    ],
    "hitFilter": {
        "resistance": 172000,
        "capacitance": 0.0000022,
        "inputVoltage": 4,
        "diodeDrop": 0.7,
        "bandpass": {
            "inputResistance": 150000,
            "biasResistance": 22000,
            "feedbackResistance": 470000,
            "capacitance1": 1e-8,
            "capacitance2": 1e-8,
            "referenceVoltage": 2,
            "positiveVoltage": 5,
            "negativeVoltage": 0,
            "positiveRailOffset": 1.5
        },
        "mixGain": 0.5379746835443038
    },
    "fire": {
        "resistance": 100000,
        "capacitance": 0.000001
    },
    "sourceFiles": [
        "src/mame/galaxian/galaxian_a.cpp",
        "src/devices/sound/disc_flt.hxx",
        "src/devices/sound/discrete.h",
        "src/devices/sound/disc_dev.hxx",
        "src/devices/sound/disc_mth.hxx"
    ],
    "source": {
        "file": "src/mame/galaxian/galaxian_a.cpp",
        "line": 734
    }
};
const clamp = (value) => Math.max(-1, Math.min(1, value));
export class GeneratedDiscreteAudioCore {
    sampleRate;
    clock;
    pitch = 0xff;
    volume = 0;
    tonePhase = 0;
    lfoValue = 0;
    lfoCapacitor = 0;
    backgroundEnabled = [false, false, false];
    backgroundCapacitor = new Float64Array(3);
    backgroundHigh = [true, true, true];
    backgroundFilter = 0;
    hitEnabled = false;
    hitCapacitor = 0;
    hitInput1 = 0;
    hitInput2 = 0;
    hitOutput1 = 0;
    hitOutput2 = 0;
    hitA1;
    hitA2;
    hitB0;
    hitB2;
    noisePhase = 0;
    lfsr = plan.lfsr.reset;
    noise = -1;
    fire = false;
    fireEnvelope = 0;
    firePhase = 0;
    fireTime = 0;
    constructor(outputRate = 48_000, clock = 3_072_000) {
        this.sampleRate = outputRate;
        this.clock = clock;
        const filter = plan.hitFilter.bandpass;
        const totalResistance = 1 / (1 / filter.inputResistance +
            (filter.biasResistance > 0 ? 1 / filter.biasResistance : 0));
        const centerHz = 1 / (2 * Math.PI * Math.sqrt(totalResistance * filter.feedbackResistance *
            filter.capacitance1 * filter.capacitance2));
        const damping = (filter.capacitance1 + filter.capacitance2) / Math.sqrt(filter.feedbackResistance / totalResistance *
            filter.capacitance1 * filter.capacitance2);
        const twoOverT = 2 * outputRate;
        const warped = outputRate * 2 * Math.tan(Math.PI * centerHz / outputRate);
        const denominator = twoOverT ** 2 + damping * warped * twoOverT + warped ** 2;
        const gain = -filter.feedbackResistance / totalResistance *
            filter.capacitance2 / (filter.capacitance1 + filter.capacitance2);
        this.hitA1 = 2 * (-(twoOverT ** 2) + warped ** 2) / denominator;
        this.hitA2 = (twoOverT ** 2 - damping * warped * twoOverT + warped ** 2) /
            denominator;
        this.hitB0 = damping * warped * twoOverT / denominator * gain;
        this.hitB2 = -this.hitB0;
    }
    write(encodedOffset, data, methodName) {
        // Boards send the raw register offset plus the target method name; the
        // legacy numeric methodBases decoding remains for un-named writes only.
        let name = methodName;
        let offset = encodedOffset;
        if (name === undefined) {
            const method = Object.entries(plan.methodBases)
                .find(([, base]) => encodedOffset >= base && encodedOffset < base + 0x100);
            if (!method)
                return;
            name = method[0];
            offset = encodedOffset - method[1];
        }
        data &= 0xff;
        if (name === plan.methodRoles.pitch) {
            this.pitch = data;
            return;
        }
        if (name === plan.methodRoles.lfo) {
            this.lfoValue = (this.lfoValue & ~(1 << offset)) | ((data & 1) << offset);
            return;
        }
        if (name !== plan.methodRoles.controls)
            return;
        const bit = (data & 1) !== 0;
        const background = plan.controls.background.indexOf(offset);
        if (background >= 0) {
            this.backgroundEnabled[background] = bit;
            return;
        }
        if (offset === plan.controls.noise) {
            this.hitEnabled = bit;
            return;
        }
        if (offset === plan.controls.fire) {
            if (bit && !this.fire) {
                this.fireEnvelope = 1;
                this.fireTime = 0;
                this.firePhase = 0;
            }
            this.fire = bit;
            return;
        }
        const volume = plan.controls.volume.indexOf(offset);
        if (volume >= 0) {
            this.volume = (this.volume & ~(1 << volume)) | (Number(bit) << volume);
        }
    }
    render(output) {
        for (let index = 0; index < output.length; index++)
            output[index] = this.sample();
    }
    sample() {
        const dt = 1 / this.sampleRate;
        const soundClock = this.clock / plan.clockDivider;
        let mix = 0;
        if (this.pitch !== 0xff) {
            const counterRate = soundClock / Math.max(1, 256 - this.pitch);
            this.tonePhase = (this.tonePhase + counterRate * dt) % 16;
            const counter = Math.floor(this.tonePhase) & 15;
            const conductances = [
                (counter & 1) ? 1 / plan.toneResistors[0] : 0,
                (counter & 4) ? 1 / plan.toneResistors[1] : 0,
                (counter & 4) && (this.volume & 1) ? 1 / plan.toneResistors[2] : 0,
                (counter & 8) && (this.volume & 2) ? 1 / plan.toneResistors[3] : 0,
            ];
            const maximum = plan.toneResistors.reduce((sum, resistance) => sum + 1 / resistance, 0);
            mix += (conductances.reduce((sum, value) => sum + value, 0) / maximum - 0.25) * 0.7;
        }
        // Galaxian's four LFO bits feed a resistor DAC, a constant-current 555
        // sawtooth, and an op-amp before controlling the three background 555s.
        // Keeping those stages matters: treating the DAC conductance as a direct
        // triangle frequency makes the fleet sound modulate about 15x too fast.
        const lfo = plan.backgroundLfo;
        const dacConductance = plan.lfoResistors.reduce((sum, resistance) => sum + 1 / resistance, 1 / lfo.biasResistance + 1 / lfo.groundResistance);
        let dacCurrent = lfo.biasVoltage / lfo.biasResistance;
        plan.lfoResistors.forEach((resistance, bit) => {
            if (this.lfoValue & (1 << bit))
                dacCurrent += lfo.bitVoltage / resistance;
        });
        const dacVoltage = dacCurrent / dacConductance;
        const chargeCurrent = Math.max(0, (lfo.supplyVoltage - dacVoltage - lfo.junctionVoltage) /
            lfo.currentResistance);
        const lfoThreshold = lfo.supplyVoltage * 2 / 3;
        const lfoTrigger = lfo.supplyVoltage / 3;
        let lfoTime = dt;
        if (chargeCurrent > 0) {
            for (let transitions = 0; transitions < 4 && lfoTime > 0; transitions++) {
                const chargeTime = Math.max(0, lfoThreshold - this.lfoCapacitor) *
                    lfo.capacitance / chargeCurrent;
                if (chargeTime > lfoTime) {
                    this.lfoCapacitor += chargeCurrent * lfoTime / lfo.capacitance;
                    lfoTime = 0;
                }
                else {
                    // This constant-current 555 has no discharge resistor, so MAME's
                    // circuit model discharges it immediately to the trigger voltage.
                    this.lfoCapacitor = lfoTrigger;
                    lfoTime -= chargeTime;
                }
            }
        }
        else {
            this.lfoCapacitor *= Math.exp(-dt / (10_000_000 * lfo.capacitance));
        }
        const controlVoltage = Math.max(lfo.controlMinimum, Math.min(lfo.controlMaximum, this.lfoCapacitor * lfo.controlGain + lfo.controlOffset));
        let backgroundVoltage = 0;
        for (let voice = 0; voice < 3; voice++) {
            if (!this.backgroundEnabled[voice]) {
                this.backgroundCapacitor[voice] = 0;
                this.backgroundHigh[voice] = true;
                continue;
            }
            const circuit = plan.background555;
            const threshold = controlVoltage;
            const trigger = controlVoltage / 2;
            let capacitor = this.backgroundCapacitor[voice];
            let high = this.backgroundHigh[voice];
            if (capacitor >= threshold)
                high = false;
            else if (capacitor <= trigger)
                high = true;
            let remaining = dt;
            let transitionRemainder = 0;
            let changed = false;
            for (let transitions = 0; transitions < 8 && remaining > 0; transitions++) {
                if (high) {
                    const timeConstant = (circuit.chargeResistors[voice] + circuit.dischargeResistors[voice]) * circuit.capacitors[voice];
                    const transitionTime = timeConstant * Math.log((circuit.supplyVoltage - capacitor) /
                        (circuit.supplyVoltage - threshold));
                    if (!Number.isFinite(transitionTime) || transitionTime >= remaining) {
                        capacitor = circuit.supplyVoltage -
                            (circuit.supplyVoltage - capacitor) * Math.exp(-remaining / timeConstant);
                        remaining = 0;
                    }
                    else {
                        capacitor = threshold;
                        remaining -= Math.max(0, transitionTime);
                        transitionRemainder = remaining;
                        changed = true;
                        high = false;
                    }
                }
                else {
                    const timeConstant = circuit.dischargeResistors[voice] *
                        circuit.capacitors[voice];
                    const transitionTime = timeConstant * Math.log(capacitor / trigger);
                    if (!Number.isFinite(transitionTime) || transitionTime >= remaining) {
                        capacitor *= Math.exp(-remaining / timeConstant);
                        remaining = 0;
                    }
                    else {
                        capacitor = trigger;
                        remaining -= Math.max(0, transitionTime);
                        transitionRemainder = remaining;
                        changed = true;
                        high = true;
                    }
                }
            }
            this.backgroundCapacitor[voice] = capacitor;
            this.backgroundHigh[voice] = high;
            const highFraction = changed
                ? (high ? transitionRemainder / dt : 1 - transitionRemainder / dt)
                : Number(high);
            backgroundVoltage += highFraction / 3;
        }
        // The three equal mixer inputs share a source-derived output filter. The
        // browser's final high-pass stage then removes the remaining 555 DC bias.
        const mixerResistance = 1 / plan.background555.mixerResistances.reduce((sum, resistance) => sum + 1 / resistance, 0);
        const filterTime = mixerResistance * plan.background555.filterCapacitance;
        this.backgroundFilter += (backgroundVoltage - this.backgroundFilter) *
            (1 - Math.exp(-dt / filterTime));
        const enabledBackgrounds = this.backgroundEnabled.filter(Boolean).length;
        mix += (this.backgroundFilter - enabledBackgrounds / 6) * 0.45;
        this.noisePhase += 7_920 * dt;
        while (this.noisePhase >= 1) {
            this.noisePhase -= 1;
            const feedback = ((this.lfsr >> plan.lfsr.tap0) ^
                (this.lfsr >> plan.lfsr.tap1) ^ 1) & 1;
            this.lfsr = ((this.lfsr << 1) | feedback) & ((2 ** plan.lfsr.bits) - 1);
            this.noise = this.lfsr & 1 ? 1 : -1;
        }
        const hitTarget = this.hitEnabled
            ? Math.max(0, plan.hitFilter.inputVoltage - plan.hitFilter.diodeDrop)
            : 0;
        let hitDifference = hitTarget - this.hitCapacitor;
        let hitNode = 0;
        if (this.noise > 0) {
            if (hitDifference < 0) {
                hitDifference *= 1 - Math.exp(-dt / (plan.hitFilter.resistance * plan.hitFilter.capacitance));
            }
            this.hitCapacitor += hitDifference;
            hitNode = this.hitCapacitor;
        }
        else if (hitDifference > 0) {
            this.hitCapacitor = hitTarget;
        }
        const hitUnclipped = -this.hitA1 * this.hitOutput1 - this.hitA2 * this.hitOutput2 +
            this.hitB0 * hitNode + this.hitB2 * this.hitInput2;
        const hitVoltage = Math.max(plan.hitFilter.bandpass.negativeVoltage, Math.min(plan.hitFilter.bandpass.positiveVoltage -
            plan.hitFilter.bandpass.positiveRailOffset, hitUnclipped + plan.hitFilter.bandpass.referenceVoltage));
        const hitFiltered = hitVoltage - plan.hitFilter.bandpass.referenceVoltage;
        this.hitInput2 = this.hitInput1;
        this.hitInput1 = hitNode;
        this.hitOutput2 = this.hitOutput1;
        this.hitOutput1 = hitFiltered;
        const hitSupply = plan.hitFilter.bandpass.positiveVoltage -
            plan.hitFilter.bandpass.negativeVoltage;
        mix += hitFiltered / hitSupply * plan.hitFilter.mixGain;
        if (this.fireEnvelope > 0.0001) {
            const tau = plan.fire.resistance * plan.fire.capacitance;
            const frequency = 150 + 1_350 * Math.exp(-this.fireTime / Math.max(0.04, tau * 0.7)) +
                this.noise * 90;
            this.firePhase = (this.firePhase + frequency * dt) % 1;
            mix += (this.firePhase < 0.5 ? 1 : -1) * this.fireEnvelope * 0.28;
            this.fireEnvelope *= Math.exp(-dt / Math.max(0.08, tau * 2));
            this.fireTime += dt;
        }
        return clamp(mix * 0.9);
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
        let index = 0;
        for (const write of writes) {
            const at = Math.ceil(Math.max(0, Math.min(1, write.frac ?? 0)) * count);
            while (index < at)
                output[index++] = this.core.sample();
            this.core.write(write.offset, write.data, write.method);
        }
        while (index < count)
            output[index++] = this.core.sample();
        return output;
    }
}
class GeneratedDiscreteAudioProcessor extends AudioWorkletProcessor {
    core;
    renderer;
    frames = [];
    current;
    position = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.core = new GeneratedDiscreteAudioCore(sampleRate, message.clock ?? 3_072_000);
                this.renderer = new GeneratedDiscreteAudioFrameRenderer(this.core, sampleRate, message.refresh ?? 60.606);
            }
            else if (message.type === 'write') {
                this.core?.write(message.offset ?? 0, message.data ?? 0, message.method);
            }
            else if (message.type === 'batch' && this.renderer) {
                this.frames.push(this.renderer.render(message.writes ?? []));
                while (this.frames.length > 8)
                    this.frames.shift();
            }
        };
    }
    nextSample() {
        while (!this.current || this.position >= this.current.length) {
            this.current = this.frames.shift();
            this.position = 0;
            if (!this.current)
                return 0;
        }
        return this.current[this.position++];
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
registerProcessor(plan.processorName, GeneratedDiscreteAudioProcessor);
