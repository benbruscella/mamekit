// GENERATED from src/devices/sound/ay8910.cpp:1058 and src/devices/sound/ay8910.h; do not edit.
// Register masks, resistor DAC curve, clock divider, envelope parameters and
// LFSR taps are extracted from MAME's AY implementation. RC behavior is
// sourced from flt_rc and route/filter controls arrive from generated machine IR.
const plan = {
    "schemaVersion": 1,
    "type": "AY8910",
    "className": "ay8910_device",
    "channels": 3,
    "registerCount": 16,
    "clockDivider": 8,
    "envelopeMask": 15,
    "envelopeStep": 2,
    "noiseTaps": [
        0,
        3
    ],
    "readMasks": [
        255,
        15,
        255,
        15,
        255,
        15,
        31,
        255,
        31,
        31,
        31,
        255,
        255,
        15,
        255,
        255
    ],
    "volumeTable": [
        -0.125,
        -0.12026177663616097,
        -0.11820400758277991,
        -0.11549443909450804,
        -0.11129970211696952,
        -0.10519286850718829,
        -0.09770806310558056,
        -0.07928820271191775,
        -0.06811478063806223,
        -0.030491504874337425,
        0.006626453377211516,
        0.05049148850685958,
        0.11017411587355805,
        0.1734976877367712,
        0.27081105112451004,
        0.375
    ],
    "filterTypes": {
        "lowpass3r": 0,
        "lowpass": 2,
        "highpass": 3,
        "ac": 4
    },
    "sourceFiles": [
        "src/devices/sound/ay8910.cpp",
        "src/devices/sound/ay8910.h",
        "src/devices/sound/flt_rc.cpp",
        "src/devices/sound/flt_rc.h"
    ],
    "source": {
        "file": "src/devices/sound/ay8910.cpp",
        "line": 1058
    }
};
const msmPlan = {
    "schemaVersion": 1,
    "type": "MSM5205",
    "className": "msm5205_device",
    "indexShift": [
        -1,
        -1,
        -1,
        -1,
        2,
        4,
        6,
        8
    ],
    "diffLookup": [
        2,
        6,
        10,
        14,
        18,
        22,
        26,
        30,
        -2,
        -6,
        -10,
        -14,
        -18,
        -22,
        -26,
        -30,
        2,
        6,
        10,
        14,
        19,
        23,
        27,
        31,
        -2,
        -6,
        -10,
        -14,
        -19,
        -23,
        -27,
        -31,
        2,
        7,
        11,
        16,
        21,
        26,
        30,
        35,
        -2,
        -7,
        -11,
        -16,
        -21,
        -26,
        -30,
        -35,
        2,
        7,
        13,
        18,
        23,
        28,
        34,
        39,
        -2,
        -7,
        -13,
        -18,
        -23,
        -28,
        -34,
        -39,
        2,
        8,
        14,
        20,
        25,
        31,
        37,
        43,
        -2,
        -8,
        -14,
        -20,
        -25,
        -31,
        -37,
        -43,
        3,
        9,
        15,
        21,
        28,
        34,
        40,
        46,
        -3,
        -9,
        -15,
        -21,
        -28,
        -34,
        -40,
        -46,
        3,
        10,
        17,
        24,
        31,
        38,
        45,
        52,
        -3,
        -10,
        -17,
        -24,
        -31,
        -38,
        -45,
        -52,
        3,
        11,
        19,
        27,
        34,
        42,
        50,
        58,
        -3,
        -11,
        -19,
        -27,
        -34,
        -42,
        -50,
        -58,
        4,
        12,
        21,
        29,
        38,
        46,
        55,
        63,
        -4,
        -12,
        -21,
        -29,
        -38,
        -46,
        -55,
        -63,
        4,
        13,
        23,
        32,
        41,
        50,
        60,
        69,
        -4,
        -13,
        -23,
        -32,
        -41,
        -50,
        -60,
        -69,
        5,
        15,
        25,
        35,
        46,
        56,
        66,
        76,
        -5,
        -15,
        -25,
        -35,
        -46,
        -56,
        -66,
        -76,
        5,
        16,
        28,
        39,
        50,
        61,
        73,
        84,
        -5,
        -16,
        -28,
        -39,
        -50,
        -61,
        -73,
        -84,
        6,
        18,
        31,
        43,
        56,
        68,
        81,
        93,
        -6,
        -18,
        -31,
        -43,
        -56,
        -68,
        -81,
        -93,
        6,
        20,
        34,
        48,
        61,
        75,
        89,
        103,
        -6,
        -20,
        -34,
        -48,
        -61,
        -75,
        -89,
        -103,
        7,
        22,
        37,
        52,
        67,
        82,
        97,
        112,
        -7,
        -22,
        -37,
        -52,
        -67,
        -82,
        -97,
        -112,
        8,
        24,
        41,
        57,
        74,
        90,
        107,
        123,
        -8,
        -24,
        -41,
        -57,
        -74,
        -90,
        -107,
        -123,
        9,
        27,
        45,
        63,
        82,
        100,
        118,
        136,
        -9,
        -27,
        -45,
        -63,
        -82,
        -100,
        -118,
        -136,
        10,
        30,
        50,
        70,
        90,
        110,
        130,
        150,
        -10,
        -30,
        -50,
        -70,
        -90,
        -110,
        -130,
        -150,
        11,
        33,
        55,
        77,
        99,
        121,
        143,
        165,
        -11,
        -33,
        -55,
        -77,
        -99,
        -121,
        -143,
        -165,
        12,
        36,
        60,
        84,
        109,
        133,
        157,
        181,
        -12,
        -36,
        -60,
        -84,
        -109,
        -133,
        -157,
        -181,
        13,
        40,
        66,
        93,
        120,
        147,
        173,
        200,
        -13,
        -40,
        -66,
        -93,
        -120,
        -147,
        -173,
        -200,
        14,
        44,
        73,
        103,
        132,
        162,
        191,
        221,
        -14,
        -44,
        -73,
        -103,
        -132,
        -162,
        -191,
        -221,
        16,
        48,
        81,
        113,
        146,
        178,
        211,
        243,
        -16,
        -48,
        -81,
        -113,
        -146,
        -178,
        -211,
        -243,
        17,
        53,
        89,
        125,
        160,
        196,
        232,
        268,
        -17,
        -53,
        -89,
        -125,
        -160,
        -196,
        -232,
        -268,
        19,
        58,
        98,
        137,
        176,
        215,
        255,
        294,
        -19,
        -58,
        -98,
        -137,
        -176,
        -215,
        -255,
        -294,
        21,
        64,
        108,
        151,
        194,
        237,
        281,
        324,
        -21,
        -64,
        -108,
        -151,
        -194,
        -237,
        -281,
        -324,
        23,
        71,
        118,
        166,
        213,
        261,
        308,
        356,
        -23,
        -71,
        -118,
        -166,
        -213,
        -261,
        -308,
        -356,
        26,
        78,
        130,
        182,
        235,
        287,
        339,
        391,
        -26,
        -78,
        -130,
        -182,
        -235,
        -287,
        -339,
        -391,
        28,
        86,
        143,
        201,
        258,
        316,
        373,
        431,
        -28,
        -86,
        -143,
        -201,
        -258,
        -316,
        -373,
        -431,
        31,
        94,
        158,
        221,
        284,
        347,
        411,
        474,
        -31,
        -94,
        -158,
        -221,
        -284,
        -347,
        -411,
        -474,
        34,
        104,
        174,
        244,
        313,
        383,
        453,
        523,
        -34,
        -104,
        -174,
        -244,
        -313,
        -383,
        -453,
        -523,
        38,
        115,
        191,
        268,
        345,
        422,
        498,
        575,
        -38,
        -115,
        -191,
        -268,
        -345,
        -422,
        -498,
        -575,
        42,
        126,
        210,
        294,
        379,
        463,
        547,
        631,
        -42,
        -126,
        -210,
        -294,
        -379,
        -463,
        -547,
        -631,
        46,
        139,
        231,
        324,
        417,
        510,
        602,
        695,
        -46,
        -139,
        -231,
        -324,
        -417,
        -510,
        -602,
        -695,
        51,
        153,
        255,
        357,
        459,
        561,
        663,
        765,
        -51,
        -153,
        -255,
        -357,
        -459,
        -561,
        -663,
        -765,
        56,
        168,
        280,
        392,
        505,
        617,
        729,
        841,
        -56,
        -168,
        -280,
        -392,
        -505,
        -617,
        -729,
        -841,
        61,
        185,
        308,
        432,
        555,
        679,
        802,
        926,
        -61,
        -185,
        -308,
        -432,
        -555,
        -679,
        -802,
        -926,
        68,
        204,
        340,
        476,
        612,
        748,
        884,
        1020,
        -68,
        -204,
        -340,
        -476,
        -612,
        -748,
        -884,
        -1020,
        74,
        224,
        373,
        523,
        672,
        822,
        971,
        1121,
        -74,
        -224,
        -373,
        -523,
        -672,
        -822,
        -971,
        -1121,
        82,
        246,
        411,
        575,
        740,
        904,
        1069,
        1233,
        -82,
        -246,
        -411,
        -575,
        -740,
        -904,
        -1069,
        -1233,
        90,
        271,
        452,
        633,
        814,
        995,
        1176,
        1357,
        -90,
        -271,
        -452,
        -633,
        -814,
        -995,
        -1176,
        -1357,
        99,
        298,
        497,
        696,
        895,
        1094,
        1293,
        1492,
        -99,
        -298,
        -497,
        -696,
        -895,
        -1094,
        -1293,
        -1492,
        109,
        328,
        547,
        766,
        985,
        1204,
        1423,
        1642,
        -109,
        -328,
        -547,
        -766,
        -985,
        -1204,
        -1423,
        -1642,
        120,
        361,
        601,
        842,
        1083,
        1324,
        1564,
        1805,
        -120,
        -361,
        -601,
        -842,
        -1083,
        -1324,
        -1564,
        -1805,
        132,
        397,
        662,
        927,
        1192,
        1457,
        1722,
        1987,
        -132,
        -397,
        -662,
        -927,
        -1192,
        -1457,
        -1722,
        -1987,
        145,
        437,
        728,
        1020,
        1311,
        1603,
        1894,
        2186,
        -145,
        -437,
        -728,
        -1020,
        -1311,
        -1603,
        -1894,
        -2186,
        160,
        480,
        801,
        1121,
        1442,
        1762,
        2083,
        2403,
        -160,
        -480,
        -801,
        -1121,
        -1442,
        -1762,
        -2083,
        -2403,
        176,
        529,
        881,
        1234,
        1587,
        1940,
        2292,
        2645,
        -176,
        -529,
        -881,
        -1234,
        -1587,
        -1940,
        -2292,
        -2645,
        194,
        582,
        970,
        1358,
        1746,
        2134,
        2522,
        2910,
        -194,
        -582,
        -970,
        -1358,
        -1746,
        -2134,
        -2522,
        -2910
    ],
    "modes": {
        "S96_3B": 0,
        "S48_3B": 1,
        "S64_3B": 2,
        "SEX_3B": 3,
        "S96_4B": 4,
        "S48_4B": 5,
        "S64_4B": 6,
        "SEX_4B": 7,
        "S160": 12,
        "S80": 13,
        "S40": 14,
        "S20": 15
    },
    "maximumStep": 48,
    "minimumSignal": -2048,
    "maximumSignal": 2047,
    "sampleScale": 0.000244140625,
    "dacBits": 10,
    "sourceFiles": [
        "src/devices/sound/msm5205.cpp",
        "src/devices/sound/msm5205.h"
    ],
    "source": {
        "file": "src/devices/sound/msm5205.cpp",
        "line": 370
    }
};
const FILTER_CONTROL_BASE = 256;
const FILTER_CONTROL_STRIDE = 5;
export class GeneratedAy8910Core {
    nativeRate;
    regs = new Uint8Array(plan.registerCount);
    tonePeriod = [1, 1, 1];
    toneCount = [0, 0, 0];
    toneOutput = [0, 0, 0];
    noiseCount = 0;
    noisePrescale = 0;
    rng = 1;
    envelopePeriod = 0;
    envelopeCount = 0;
    envelopePosition = plan.envelopeMask;
    envelopeAttack = 0;
    envelopeHold = 0;
    envelopeAlternate = 0;
    envelopeHolding = false;
    mixedSamples = [0, 0, 0];
    constructor(clock) {
        this.nativeRate = clock / plan.clockDivider;
    }
    write(reg, data) {
        reg &= plan.registerCount - 1;
        this.regs[reg] = data & 0xff;
        if (reg <= 5) {
            const channel = reg >> 1;
            this.tonePeriod[channel] = Math.max(1, this.regs[channel * 2] | ((this.regs[channel * 2 + 1] & 0x0f) << 8));
        }
        else if (reg === 11 || reg === 12) {
            this.envelopePeriod = this.regs[11] | (this.regs[12] << 8);
        }
        else if (reg === 13) {
            const shape = data & plan.envelopeMask;
            this.envelopeAttack = shape & 0x04 ? plan.envelopeMask : 0;
            if (!(shape & 0x08)) {
                this.envelopeHold = 1;
                this.envelopeAlternate = this.envelopeAttack;
            }
            else {
                this.envelopeHold = shape & 1;
                this.envelopeAlternate = shape & 2;
            }
            this.envelopePosition = plan.envelopeMask;
            this.envelopeHolding = false;
            this.envelopeCount = 0;
        }
    }
    read(reg) {
        reg &= plan.registerCount - 1;
        return this.regs[reg] & plan.readMasks[reg];
    }
    sampleChannels(output) {
        for (let channel = 0; channel < plan.channels; channel++) {
            if (++this.toneCount[channel] >= this.tonePeriod[channel]) {
                this.toneCount[channel] = 0;
                this.toneOutput[channel] ^= 1;
            }
        }
        const noisePeriod = Math.max(1, this.regs[6] & 0x1f);
        if (++this.noiseCount >= noisePeriod) {
            this.noiseCount = 0;
            this.noisePrescale ^= 1;
            if (!this.noisePrescale) {
                const input = ((this.rng >> plan.noiseTaps[0]) ^ (this.rng >> plan.noiseTaps[1])) & 1;
                this.rng = (this.rng >>> 1) | (input << 16);
            }
        }
        if (!this.envelopeHolding) {
            const period = Math.max(1, this.envelopePeriod * plan.envelopeStep);
            if (++this.envelopeCount >= period) {
                this.envelopeCount = 0;
                if (--this.envelopePosition < 0) {
                    if (this.envelopeHold) {
                        if (this.envelopeAlternate)
                            this.envelopeAttack ^= plan.envelopeMask;
                        this.envelopeHolding = true;
                        this.envelopePosition = 0;
                    }
                    else {
                        if (this.envelopeAlternate)
                            this.envelopeAttack ^= plan.envelopeMask;
                        this.envelopePosition &= plan.envelopeMask;
                    }
                }
            }
        }
        const envelope = this.envelopePosition ^ this.envelopeAttack;
        const enable = this.regs[7];
        for (let channel = 0; channel < plan.channels; channel++) {
            const toneGate = this.toneOutput[channel] | ((enable >> channel) & 1);
            const noiseGate = (this.rng & 1) | ((enable >> (channel + 3)) & 1);
            const volume = this.regs[8 + channel];
            const level = volume & 0x10 ? envelope : volume & 0x0f;
            const amplitude = plan.volumeTable[level] - plan.volumeTable[0];
            output[channel] = toneGate & noiseGate ? amplitude : -amplitude;
        }
    }
    sample() {
        this.sampleChannels(this.mixedSamples);
        return this.mixedSamples.reduce((sum, value) => sum + value, 0) / plan.channels;
    }
}
export class GeneratedMsm5205Core {
    data = 0;
    reset = false;
    bitwidth = 4;
    modeValue = 4;
    signal = 0;
    step = 0;
    constructor(initialMode) {
        if (!msmPlan)
            throw new Error('MSM5205 plan is not present in this generated worklet');
        const mode = initialMode
            ? msmPlan.modes[initialMode]
            : undefined;
        if (mode !== undefined)
            this.playmode(mode);
    }
    write(method, data) {
        if (method === 'data_w') {
            this.data = this.bitwidth === 4 ? data & 0x0f : (data & 0x07) << 1;
        }
        else if (method === 'reset_w') {
            this.reset = data !== 0;
        }
        else if (method === 'playmode_w') {
            this.playmode(data);
        }
        else if (method === 's1_w') {
            this.playmode((this.mode() & ~1) | (data ? 1 : 0));
        }
        else if (method === 's2_w') {
            this.playmode((this.mode() & ~2) | (data ? 2 : 0));
            // vck is the generated master-clock event. MAME wires a slave MSM5205
            // through msm5205_device::vclk_w; in the generated frame schedule that
            // callback arrives once per active clock edge, so both method names clock
            // the same ADPCM decoder state.
        }
        else if ((method === 'vck' || method === 'vclk_w') && data) {
            this.clock();
        }
    }
    sample() {
        if (!msmPlan)
            return 0;
        const mask = msmPlan.dacBits >= 12 ? 0 : (1 << (12 - msmPlan.dacBits)) - 1;
        return (this.signal & ~mask) * msmPlan.sampleScale;
    }
    mode() {
        return this.modeValue;
    }
    playmode(data) {
        this.modeValue = data & 7;
        this.bitwidth = data & 4 ? 4 : 3;
    }
    clock() {
        if (!msmPlan)
            return;
        if (this.reset) {
            this.signal = 0;
            this.step = 0;
            return;
        }
        const value = this.data & 15;
        this.signal = Math.max(msmPlan.minimumSignal, Math.min(msmPlan.maximumSignal, this.signal + msmPlan.diffLookup[this.step * 16 + value]));
        this.step = Math.max(0, Math.min(msmPlan.maximumStep, this.step + msmPlan.indexShift[value & 7]));
    }
}
export class GeneratedDac8Core {
    value = 0x80;
    write(method, data) {
        if (method === 'data_w')
            this.value = data & 0xff;
    }
    sample() {
        return (this.value - 0x80) / 0x80;
    }
}
export class GeneratedAy8910Mixer {
    cores;
    phases;
    channelSamples;
    nativeSamples;
    sampleSums;
    antialias1;
    antialias2;
    antialiasK;
    routes;
    filters;
    gainTotal;
    auxiliary;
    auxiliaryGainTotal;
    discreteMixer;
    discreteValues = new Map();
    discreteFilterMemory = new Map();
    outputRate;
    muted = false;
    constructor(clock, chips, outputRate, routes = [], auxiliaryDevices = [], discreteMixer) {
        this.outputRate = outputRate;
        const count = Math.max(1, chips);
        this.cores = Array.from({ length: count }, () => new GeneratedAy8910Core(clock));
        this.phases = this.cores.map(() => 0);
        this.channelSamples = this.cores.map(() => [0, 0, 0]);
        this.nativeSamples = this.cores.map(() => [0, 0, 0]);
        this.sampleSums = this.cores.map(() => [0, 0, 0]);
        this.antialias1 = this.cores.map(() => [0, 0, 0]);
        this.antialias2 = this.cores.map(() => [0, 0, 0]);
        this.antialiasK = this.cores.map(core => core.nativeRate > outputRate
            ? 1 - Math.exp(-2 * Math.PI * outputRate * 0.4 / core.nativeRate)
            : 1);
        this.routes = routes.length
            ? routes
            : this.cores.flatMap((_, chip) => Array.from({ length: plan.channels }, (_unused, channel) => ({
                chip,
                channel,
                gain: 1,
                target: 'mono',
            })));
        const filterCount = this.routes.reduce((maximum, route) => Math.max(maximum, (route.filter?.index ?? -1) + 1), 0);
        this.filters = Array.from({ length: filterCount }, () => ({
            type: plan.filterTypes.lowpass3r,
            r1: 1,
            r2: 1,
            r3: 1,
            c: 0,
            k: 1,
            memory: 0,
        }));
        this.gainTotal = this.routes.reduce((sum, route) => sum + route.gain, 0) || 1;
        this.auxiliary = auxiliaryDevices.flatMap(device => device.type === 'MSM5205' && msmPlan
            ? [{
                    deviceTag: device.deviceTag,
                    gain: device.gain,
                    core: new GeneratedMsm5205Core(device.initialMode),
                }]
            : device.type === 'DAC_8BIT_R2R'
                ? [{
                        deviceTag: device.deviceTag,
                        gain: device.gain,
                        core: new GeneratedDac8Core(),
                    }]
                : []);
        this.auxiliaryGainTotal = this.auxiliary.reduce((sum, device) => sum + device.gain, 0);
        this.discreteMixer = discreteMixer;
        for (const input of discreteMixer?.dataInputs ?? []) {
            this.discreteValues.set(input.node, 0);
        }
        for (const node of discreteMixer?.controlInputs ?? []) {
            this.discreteValues.set(node, 0);
        }
    }
    write(offset, data, method) {
        if (method === 'discrete') {
            this.discreteValues.set(offset, data);
            return;
        }
        const auxiliaryWrite = /^([^.]+)\.(\w+)$/.exec(method ?? '');
        if (auxiliaryWrite) {
            this.auxiliary.find(device => device.deviceTag === auxiliaryWrite[1])?.core.write(auxiliaryWrite[2], data);
            return;
        }
        if (offset < 0) {
            this.muted = data !== 0;
            return;
        }
        if (offset >= FILTER_CONTROL_BASE) {
            const control = offset - FILTER_CONTROL_BASE;
            const filter = this.filters[Math.floor(control / FILTER_CONTROL_STRIDE)];
            if (!filter)
                return;
            const parameter = control % FILTER_CONTROL_STRIDE;
            if (parameter === 0)
                filter.type = data;
            else if (parameter === 1)
                filter.r1 = data;
            else if (parameter === 2)
                filter.r2 = data;
            else if (parameter === 3)
                filter.r3 = data;
            else
                filter.c = data;
            this.recalculate(filter);
            return;
        }
        this.cores[offset >> 4]?.write(offset & 0x0f, data);
    }
    sample() {
        if (this.muted)
            return 0;
        for (let chip = 0; chip < this.cores.length; chip++) {
            const core = this.cores[chip];
            const native = this.nativeSamples[chip];
            const sums = this.sampleSums[chip];
            const lowpass1 = this.antialias1[chip];
            const lowpass2 = this.antialias2[chip];
            const k = this.antialiasK[chip];
            sums.fill(0);
            let nativeSamples = 0;
            this.phases[chip] += core.nativeRate / this.outputRate;
            while (this.phases[chip] >= 1) {
                this.phases[chip] -= 1;
                core.sampleChannels(native);
                for (let channel = 0; channel < plan.channels; channel++) {
                    lowpass1[channel] += (native[channel] - lowpass1[channel]) * k;
                    lowpass2[channel] += (lowpass1[channel] - lowpass2[channel]) * k;
                    sums[channel] += lowpass2[channel];
                }
                nativeSamples++;
            }
            if (nativeSamples) {
                for (let channel = 0; channel < plan.channels; channel++) {
                    this.channelSamples[chip][channel] = sums[channel] / nativeSamples;
                }
            }
        }
        if (this.discreteMixer)
            return this.sampleDiscreteMixer();
        let mixed = 0;
        for (const route of this.routes) {
            const samples = this.channelSamples[route.chip];
            let value = route.channel === -1
                ? (samples?.reduce((sum, sample) => sum + sample, 0) ?? 0) / plan.channels
                : samples?.[route.channel] ?? 0;
            if (route.filter)
                value = this.filter(value, this.filters[route.filter.index]);
            mixed += value * route.gain;
        }
        for (const device of this.auxiliary)
            mixed += device.core.sample() * device.gain;
        return Math.max(-1, Math.min(1, mixed / (this.gainTotal + this.auxiliaryGainTotal)));
    }
    sampleDiscreteMixer() {
        const mixer = this.discreteMixer;
        const values = new Map(this.discreteValues);
        for (const input of mixer.streamInputs) {
            const route = this.routes.find(candidate => candidate.targetInput === input.input);
            const samples = route ? this.channelSamples[route.chip] : undefined;
            const value = route?.channel === -1
                ? (samples?.reduce((sum, sample) => sum + sample, 0) ?? 0) / plan.channels
                : samples?.[route?.channel ?? -1] ?? 0;
            values.set(input.node, value * (route?.gain ?? 1) * input.gain + input.offset);
        }
        for (const input of mixer.dataInputs) {
            const raw = this.discreteValues.get(input.node) ?? 0;
            const maximum = Math.abs(input.gain) * 255 || 1;
            values.set(input.node, (raw * input.gain + input.offset) / maximum);
        }
        for (const filter of mixer.filters) {
            const control = values.get(filter.control) ?? 0;
            const capacitance = filter.capacitors.reduce((sum, value, index) => sum + ((control >> index) & 1 ? value : 0), 0);
            const input = values.get(filter.input) ?? 0;
            if (capacitance === 0) {
                values.set(filter.node, input);
                this.discreteFilterMemory.set(filter.node, input);
                continue;
            }
            const k = 1 - Math.exp(-1 / (filter.resistance * capacitance) / this.outputRate);
            const memory = this.discreteFilterMemory.get(filter.node) ?? input;
            const output = memory + (input - memory) * k;
            this.discreteFilterMemory.set(filter.node, output);
            values.set(filter.node, output);
        }
        for (const adder of mixer.adders) {
            values.set(adder.node, adder.inputs.reduce((sum, input) => sum + (values.get(input) ?? 0), 0));
        }
        for (const stage of mixer.mixers) {
            const conductance = stage.resistances.reduce((sum, resistance) => sum + 1 / resistance, 0);
            values.set(stage.node, stage.inputs.reduce((sum, input, index) => sum + (values.get(input) ?? 0) / stage.resistances[index], 0) / conductance);
        }
        const outputGain = mixer.outputs.reduce((sum, output) => sum + Math.abs(output.gain), 0) || 1;
        const output = mixer.outputs.reduce((sum, candidate) => sum + (values.get(candidate.node) ?? 0) * candidate.gain, 0) / outputGain;
        return Math.max(-1, Math.min(1, output));
    }
    recalculate(filter) {
        if (filter.c === 0) {
            filter.k = filter.type === plan.filterTypes.highpass || filter.type === plan.filterTypes.ac
                ? 0
                : 1;
            filter.memory = 0;
            return;
        }
        const resistance = filter.type === plan.filterTypes.lowpass3r
            ? filter.r1 * (filter.r2 + filter.r3) / (filter.r1 + filter.r2 + filter.r3)
            : filter.r1;
        filter.k = 1 - Math.exp(-1 / (resistance * filter.c) / this.outputRate);
    }
    filter(input, filter) {
        if (!filter)
            return input;
        if (filter.type === plan.filterTypes.highpass || filter.type === plan.filterTypes.ac) {
            const output = input - filter.memory;
            filter.memory += (input - filter.memory) * filter.k;
            return output;
        }
        filter.memory += (input - filter.memory) * filter.k;
        return filter.memory;
    }
}
/**
 * Renders one emulated video frame while applying AY writes at their MAME
 * raster position. Both the AudioWorklet and game acceptance tests use this
 * class, so browser scheduling is covered by the deterministic PCM golden.
 */
export class GeneratedAy8910FrameRenderer {
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
class GeneratedAy8910Processor extends AudioWorkletProcessor {
    mixer;
    renderer;
    frames = [];
    current;
    currentIndex = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.mixer = new GeneratedAy8910Mixer(message.clock ?? 1_789_772, message.chips ?? 1, sampleRate, message.routes, message.auxiliaryDevices, message.discreteMixer);
                this.renderer = new GeneratedAy8910FrameRenderer(this.mixer, sampleRate, message.refresh ?? 60);
            }
            else if (message.type === 'write') {
                this.mixer?.write(message.offset ?? 0, message.data ?? 0, message.method);
            }
            else if (message.type === 'batch') {
                if (this.renderer) {
                    this.frames.push(this.renderer.render(message.writes ?? []));
                    while (this.frames.length > 8)
                        this.frames.shift();
                }
            }
        };
    }
    nextSample() {
        while (!this.current || this.currentIndex >= this.current.length) {
            this.current = this.frames.shift();
            this.currentIndex = 0;
            if (!this.current)
                return 0;
        }
        return this.current[this.currentIndex++];
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        const output = channels?.[0];
        if (!output)
            return true;
        for (let index = 0; index < output.length; index++) {
            output[index] = this.nextSample();
        }
        for (let channel = 1; channel < (channels?.length ?? 0); channel++) {
            channels[channel].set(output);
        }
        return true;
    }
}
registerProcessor('ay8910', GeneratedAy8910Processor);
