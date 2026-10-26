import deviceData from './tms5220c.device.ir.json' with { type: 'json' };
// GENERATED from src/devices/sound/tms5220.cpp:540; do not edit.
// Energy, pitch, reflection-coefficient, chirp and interpolation tables come
// from MAME's tms5220_coeff in src/devices/sound/tms5110r.hxx.
const plan = {
    "schemaVersion": 1,
    "type": "TMS5220C",
    "className": "tms5220c_device",
    "coefficients": "tms5220_coeff",
    "numK": 10,
    "energyBits": 4,
    "pitchBits": 6,
    "kBits": [
        5,
        5,
        4,
        4,
        4,
        4,
        4,
        3,
        3,
        3
    ],
    "energyTable": [
        0,
        1,
        2,
        3,
        4,
        6,
        8,
        11,
        16,
        23,
        33,
        47,
        63,
        85,
        114,
        0
    ],
    "pitchTable": [
        0,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        44,
        46,
        48,
        50,
        52,
        53,
        56,
        58,
        60,
        62,
        65,
        68,
        70,
        72,
        76,
        78,
        80,
        84,
        86,
        91,
        94,
        98,
        101,
        105,
        109,
        114,
        118,
        122,
        127,
        132,
        137,
        142,
        148,
        153,
        159
    ],
    "kTable": [
        [
            -501,
            -498,
            -497,
            -495,
            -493,
            -491,
            -488,
            -482,
            -478,
            -474,
            -469,
            -464,
            -459,
            -452,
            -445,
            -437,
            -412,
            -380,
            -339,
            -288,
            -227,
            -158,
            -81,
            -1,
            80,
            157,
            226,
            287,
            337,
            379,
            411,
            436
        ],
        [
            -328,
            -303,
            -274,
            -244,
            -211,
            -175,
            -138,
            -99,
            -59,
            -18,
            24,
            64,
            105,
            143,
            180,
            215,
            248,
            278,
            306,
            331,
            354,
            374,
            392,
            408,
            422,
            435,
            445,
            455,
            463,
            470,
            476,
            506
        ],
        [
            -441,
            -387,
            -333,
            -279,
            -225,
            -171,
            -117,
            -63,
            -9,
            45,
            98,
            152,
            206,
            260,
            314,
            368
        ],
        [
            -328,
            -273,
            -217,
            -161,
            -106,
            -50,
            5,
            61,
            116,
            172,
            228,
            283,
            339,
            394,
            450,
            506
        ],
        [
            -328,
            -282,
            -235,
            -189,
            -142,
            -96,
            -50,
            -3,
            43,
            90,
            136,
            182,
            229,
            275,
            322,
            368
        ],
        [
            -256,
            -212,
            -168,
            -123,
            -79,
            -35,
            10,
            54,
            98,
            143,
            187,
            232,
            276,
            320,
            365,
            409
        ],
        [
            -308,
            -260,
            -212,
            -164,
            -117,
            -69,
            -21,
            27,
            75,
            122,
            170,
            218,
            266,
            314,
            361,
            409
        ],
        [
            -256,
            -161,
            -66,
            29,
            124,
            219,
            314,
            409
        ],
        [
            -256,
            -176,
            -96,
            -15,
            65,
            146,
            226,
            307
        ],
        [
            -205,
            -132,
            -59,
            14,
            87,
            160,
            234,
            307
        ]
    ],
    "chirpTable": [
        0,
        3,
        15,
        40,
        76,
        108,
        113,
        80,
        37,
        38,
        76,
        68,
        26,
        50,
        59,
        19,
        55,
        26,
        37,
        31,
        29,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    "interpCoeff": [
        0,
        3,
        3,
        3,
        2,
        2,
        1,
        1
    ],
    "reloadTable": [
        0,
        2,
        4,
        6
    ],
    "fifoSize": 16,
    "clockDivider": 80,
    "hasRateControl": true,
    "readyClocks": 16,
    "subcycleReload": 1,
    "fastStart": true,
    "forceDigital": false,
    "sourceFiles": [
        "src/devices/sound/tms5220.cpp",
        "src/devices/sound/tms5110r.hxx",
        "src/devices/sound/tms5220.h"
    ],
    "source": {
        "file": "src/devices/sound/tms5220.cpp",
        "line": 540
    }
};
const ENERGY = Int32Array.from(plan.energyTable);
const PITCH = Int32Array.from(plan.pitchTable);
const KTABLE = plan.kTable.map(row => Int32Array.from(row));
const CHIRP = Int8Array.from(plan.chirpTable.map(value => (value << 24) >> 24));
const INTERP = Int32Array.from(plan.interpCoeff);
const RELOAD = Int32Array.from(plan.reloadTable);
const NO_COMMAND = 2;
export class GeneratedTms5220Core {
    fifo = new Uint8Array(plan.fifoSize);
    fifoHead = 0;
    fifoTail = 0;
    fifoCount = 0;
    fifoBitsTaken = 0;
    spen = false;
    talk = false;
    talkd = false;
    ddis = false;
    previousTalkStatus = false;
    bufferLow = true;
    bufferEmpty = true;
    zpar = false;
    uvZpar = false;
    olde = true;
    oldp = true;
    inhibit = true;
    newFrameEnergyIdx = 0;
    newFramePitchIdx = 0;
    newFrameKIdx = new Int32Array(plan.numK);
    currentEnergy = 0;
    currentPitch = 0;
    previousEnergy = 0;
    currentK = new Int32Array(plan.numK);
    u = new Int32Array(plan.numK + 1);
    x = new Int32Array(plan.numK);
    rng = 0x1fff;
    excitation = 0;
    ip = RELOAD[0];
    pc = 0;
    subcycle = 0;
    pitchCount = 0;
    pitchZero = false;
    commandRegister = NO_COMMAND;
    cVariantRate = 0;
    rsWs = 0x03;
    trueTiming = false;
    ioReady = true;
    dataLatched = false;
    writeLatch = 0;
    readLatch = 0xff;
    rdbFlag = false;
    /** Device clocks remaining before /READY returns, or 0 when idle. */
    readyCountdown = 0;
    clockCarry = 0;
    /** Native output rate, clock / 80. */
    sampleRate;
    constructor(clock) {
        this.sampleRate = clock / plan.clockDivider;
        this.reset();
    }
    /** MAME set_unscaled_clock; gauntlet's speech-squeak line retunes the chip. */
    setClock(clock) {
        if (clock > 0)
            this.sampleRate = clock / plan.clockDivider;
    }
    reset() {
        this.fifo.fill(0);
        this.fifoHead = this.fifoTail = this.fifoCount = this.fifoBitsTaken = 0;
        this.spen = this.ddis = this.talk = this.talkd = this.previousTalkStatus = false;
        this.bufferEmpty = this.bufferLow = true;
        this.commandRegister = NO_COMMAND;
        this.dataLatched = false;
        this.rdbFlag = false;
        this.newFrameEnergyIdx = this.currentEnergy = this.previousEnergy = 0;
        this.newFramePitchIdx = this.currentPitch = 0;
        this.zpar = this.uvZpar = false;
        this.newFrameKIdx.fill(0);
        this.currentK.fill(0);
        this.inhibit = true;
        this.subcycle = this.cVariantRate = this.pitchCount = this.pc = 0;
        this.olde = this.oldp = true;
        this.ip = RELOAD[this.cVariantRate & 3];
        this.rng = 0x1fff;
        this.u.fill(0);
        this.x.fill(0);
        this.ioReady = true;
        this.readyCountdown = 0;
    }
    talkStatus() {
        return this.spen || this.talkd;
    }
    newFrameStop() {
        return this.newFrameEnergyIdx === 0x0f;
    }
    newFrameSilence() {
        return this.newFrameEnergyIdx === 0;
    }
    newFrameUnvoiced() {
        return this.newFramePitchIdx === 0;
    }
    /** MAME's semi-hack idle frame: the state a fresh SPEN starts from. */
    loadIdleFrame() {
        this.newFrameEnergyIdx = 0;
        this.newFramePitchIdx = 0;
        for (let index = 0; index < 4; index++)
            this.newFrameKIdx[index] = 0;
        for (let index = 4; index < 7; index++)
            this.newFrameKIdx[index] = 0xf;
        for (let index = 7; index < plan.numK; index++)
            this.newFrameKIdx[index] = 0x7;
    }
    updateFifoStatus() {
        if (this.fifoCount <= 8)
            this.bufferLow = true;
        else
            this.bufferLow = false;
        if (this.fifoCount === 0) {
            this.bufferEmpty = true;
            // /BE clears TALK through TCON, but only while speaking from the FIFO.
            if (this.ddis)
                this.talk = this.spen = false;
        }
        else {
            this.bufferEmpty = false;
        }
        if (this.previousTalkStatus && !this.talkStatus()) {
            this.ddis = false;
            this.previousTalkStatus = false;
            if (this.commandRegister !== NO_COMMAND) {
                this.processCommand(this.commandRegister);
                if (!this.dataLatched)
                    this.ioReady = true;
            }
        }
        this.previousTalkStatus = this.talkStatus();
    }
    readBits(count) {
        let value = 0;
        if (this.ddis) {
            while (count-- > 0) {
                value = (value << 1) | ((this.fifo[this.fifoHead] >> this.fifoBitsTaken) & 1);
                this.fifoBitsTaken++;
                if (this.fifoBitsTaken >= 8) {
                    this.fifoCount--;
                    this.fifo[this.fifoHead] = 0;
                    this.fifoHead = (this.fifoHead + 1) % plan.fifoSize;
                    this.fifoBitsTaken = 0;
                    this.updateFifoStatus();
                }
            }
            return value;
        }
        // No VSM ROM attached: MAME floats the bus high, which eventually decodes
        // as a stop frame and halts speech rather than speaking noise.
        return (1 << count) - 1;
    }
    parseFrame() {
        this.uvZpar = this.zpar = false;
        if (plan.hasRateControl && (this.cVariantRate & 0x04)) {
            this.ip = RELOAD[this.readBits(2)];
        }
        else {
            this.ip = RELOAD[this.cVariantRate & 3];
        }
        this.updateFifoStatus();
        if (this.ddis && this.bufferEmpty)
            return;
        this.newFrameEnergyIdx = this.readBits(plan.energyBits);
        this.updateFifoStatus();
        if (this.ddis && this.bufferEmpty)
            return;
        if (this.newFrameEnergyIdx === 0 || this.newFrameEnergyIdx === 15)
            return;
        const repeat = this.readBits(1);
        this.newFramePitchIdx = this.readBits(plan.pitchBits);
        this.uvZpar = this.newFrameUnvoiced();
        this.updateFifoStatus();
        if (this.ddis && this.bufferEmpty)
            return;
        if (repeat)
            return;
        for (let index = 0; index < 4; index++) {
            this.newFrameKIdx[index] = this.readBits(plan.kBits[index]);
            this.updateFifoStatus();
            if (this.ddis && this.bufferEmpty)
                return;
        }
        // A zero pitch index is an unvoiced frame: only K1-K4 are transmitted.
        if (this.newFramePitchIdx === 0)
            return;
        for (let index = 4; index < plan.numK; index++) {
            this.newFrameKIdx[index] = this.readBits(plan.kBits[index]);
            this.updateFifoStatus();
            if (this.ddis && this.bufferEmpty)
                return;
        }
    }
    matrixMultiply(a, b) {
        while (a > 511)
            a -= 1024;
        while (a < -512)
            a += 1024;
        while (b > 16383)
            b -= 32768;
        while (b < -16384)
            b += 32768;
        return (a * b) >> 9;
    }
    latticeFilter() {
        const k = this.currentK;
        const u = this.u;
        const x = this.x;
        u[plan.numK] = this.matrixMultiply(this.previousEnergy, this.excitation << 6);
        for (let index = plan.numK - 1; index >= 0; index--) {
            u[index] = u[index + 1] - this.matrixMultiply(k[index], x[index]);
        }
        for (let index = plan.numK - 1; index >= 1; index--) {
            x[index] = x[index - 1] + this.matrixMultiply(k[index - 1], u[index - 1]);
        }
        x[0] = u[0];
        this.previousEnergy = this.currentEnergy;
        return u[0];
    }
    /** MAME clip_analog: 14 bits down to the 10-bit SPK pin, range extended. */
    clipAnalog(sample) {
        let clipped = sample;
        if (clipped > 2047)
            clipped = 2047;
        else if (clipped < -2048)
            clipped = -2048;
        clipped &= ~0xf;
        return (clipped << 4) | ((clipped & 0x7f0) >> 3) | ((clipped & 0x400) >> 10);
    }
    /** One native sample, MAME's process(), for a single buffer entry. */
    step() {
        if (!this.talkd) {
            this.advanceCounters(false);
            // The idle chip drives -1 on every sample, per the data sheet.
            return -1;
        }
        if (this.ip === 0 && this.pc === 12 && this.subcycle === 1) {
            this.ip = RELOAD[this.cVariantRate & 3];
            this.parseFrame();
            if (this.newFrameStop()) {
                this.talk = this.spen = false;
                this.updateFifoStatus();
            }
            // Interpolation is inhibited across a voicing or silence transition.
            this.inhibit = (!this.oldp && this.newFrameUnvoiced()) ||
                (this.oldp && !this.newFrameUnvoiced()) ||
                (this.olde && !this.newFrameSilence()) ||
                (this.oldp && this.newFrameSilence());
        }
        else {
            const inhibited = this.inhibit && this.ip !== 0 ? 1 : 0;
            if (this.subcycle === 2) {
                const shift = INTERP[this.ip];
                if (this.pc === 0) {
                    if (this.ip === 0)
                        this.pitchZero = false;
                    const target = ENERGY[this.newFrameEnergyIdx];
                    this.currentEnergy = (this.currentEnergy +
                        (((target - this.currentEnergy) * (1 - inhibited)) >> shift)) *
                        (this.zpar ? 0 : 1);
                }
                else if (this.pc === 1) {
                    const target = PITCH[this.newFramePitchIdx];
                    this.currentPitch = (this.currentPitch +
                        (((target - this.currentPitch) * (1 - inhibited)) >> shift)) *
                        (this.zpar ? 0 : 1);
                }
                else if (this.pc >= 2 && this.pc <= 11) {
                    const index = this.pc - 2;
                    const target = KTABLE[index][this.newFrameKIdx[index]];
                    const zero = index < 4 ? this.zpar : this.uvZpar;
                    this.currentK[index] = (this.currentK[index] +
                        (((target - this.currentK[index]) * (1 - inhibited)) >> shift)) *
                        (zero ? 0 : 1);
                }
            }
        }
        if (this.oldp) {
            // Unvoiced: plus or minus half the chirp table's peak, chosen by the LFSR.
            this.excitation = (this.rng & 1) ? ~0x3f : 0x40;
        }
        else {
            this.excitation = this.pitchCount >= 51 ? CHIRP[51] : CHIRP[this.pitchCount];
        }
        // The LFSR advances once per T cycle, twenty times a sample.
        for (let tick = 0; tick < 20; tick++) {
            const bitout = ((this.rng >> 12) & 1) ^ ((this.rng >> 3) & 1) ^
                ((this.rng >> 2) & 1) ^ ((this.rng >> 0) & 1);
            this.rng = ((this.rng << 1) | bitout) & 0xffff;
        }
        let sample = this.latticeFilter();
        while (sample > 16383)
            sample -= 32768;
        while (sample < -16384)
            sample += 32768;
        const output = plan.forceDigital
            ? ((sample & ~0xf) << 1) | ((sample & 0x3e00) >> 9)
            : this.clipAnalog(sample);
        this.advanceCounters(true);
        return output;
    }
    advanceCounters(speaking) {
        this.subcycle++;
        if (this.subcycle === 2 && this.pc === 12) {
            if (speaking && this.ip === 7 && this.inhibit)
                this.pitchZero = true;
            if (this.ip === 7) {
                if (speaking) {
                    this.olde = this.newFrameSilence();
                    this.oldp = this.newFrameUnvoiced();
                }
                this.talkd = this.talk;
                this.updateFifoStatus();
                if (!this.talk && this.spen)
                    this.talk = true;
            }
            this.subcycle = plan.subcycleReload;
            this.pc = 0;
            this.ip = (this.ip + 1) & 0x7;
        }
        else if (this.subcycle === 3) {
            this.subcycle = plan.subcycleReload;
            this.pc++;
        }
        if (speaking) {
            this.pitchCount++;
            if (this.pitchCount >= this.currentPitch || this.pitchZero)
                this.pitchCount = 0;
            this.pitchCount &= 0x1ff;
        }
    }
    dataWrite(data) {
        const wasBufferLow = this.bufferLow;
        if (this.ddis) {
            if (this.fifoCount < plan.fifoSize) {
                this.fifo[this.fifoTail] = data & 0xff;
                this.fifoTail = (this.fifoTail + 1) % plan.fifoSize;
                this.fifoCount++;
                this.updateFifoStatus();
                // SPEN rises on the falling edge of /BL, once the FIFO passes half full.
                if (!this.spen && wasBufferLow && !this.bufferLow) {
                    this.zpar = true;
                    this.uvZpar = true;
                    this.olde = true;
                    this.oldp = true;
                    this.spen = true;
                    if (plan.fastStart)
                        this.talk = true;
                    this.loadIdleFrame();
                }
            }
            this.dataLatched = false;
        }
        else {
            this.processCommand(data & 0xff);
        }
        if (!this.dataLatched)
            this.ioReady = true;
    }
    processCommand(command) {
        this.commandRegister = command;
        switch (command & 0x70) {
            case 0x00:
            case 0x20:
                if (plan.hasRateControl)
                    this.cVariantRate = command & 0x0f;
                this.commandRegister = NO_COMMAND;
                break;
            case 0x50: // speak from VSM, which this engine has no ROM for
            case 0x60: // speak external
                if ((command & 0x70) === 0x60) {
                    this.fifo.fill(0);
                    this.fifoHead = this.fifoTail = this.fifoCount = this.fifoBitsTaken = 0;
                    this.ddis = true;
                    this.rdbFlag = false;
                }
                else {
                    this.spen = true;
                    if (plan.fastStart)
                        this.talk = true;
                    this.ddis = false;
                }
                this.zpar = true;
                this.uvZpar = true;
                this.olde = true;
                this.oldp = true;
                this.loadIdleFrame();
                this.commandRegister = NO_COMMAND;
                break;
            case 0x70:
                this.reset();
                this.commandRegister = NO_COMMAND;
                break;
            default:
                // Read byte, read and branch and load address all address the VSM.
                this.commandRegister = NO_COMMAND;
                break;
        }
        this.updateFifoStatus();
    }
    /** Data bus write; latched until /WS is strobed when the board drives it. */
    dataW(data) {
        this.writeLatch = data & 0xff;
        this.dataLatched = true;
        if (!this.trueTiming)
            this.dataWrite(this.writeLatch);
    }
    /** /WS pin. A high-to-low edge schedules the /READY cycle. */
    wsqW(state) {
        this.trueTiming = true;
        const next = (this.rsWs & 0x02) | (state & 1);
        if (next === this.rsWs)
            return;
        this.rsWs = next;
        if (next === 0) {
            if (plan.hasRateControl)
                this.reset();
            return;
        }
        if (next === 3) {
            this.readLatch = 0xff;
            return;
        }
        if (!(state & 1)) {
            this.ioReady = false;
            this.readyCountdown = plan.readyClocks;
        }
    }
    /** /RS pin. */
    rsqW(state) {
        this.trueTiming = true;
        const next = ((state & 1) << 1) | (this.rsWs & 0x01);
        if (next === this.rsWs)
            return;
        this.rsWs = next;
        if (next === 0) {
            if (plan.hasRateControl)
                this.reset();
            return;
        }
        if (next === 3) {
            this.readLatch = 0xff;
            return;
        }
        if (!(state & 1)) {
            this.ioReady = false;
            this.readyCountdown = plan.readyClocks;
        }
    }
    readyRead() {
        if (!this.trueTiming) {
            return (this.fifoCount < plan.fifoSize || !this.ddis) && this.ioReady;
        }
        return this.ioReady;
    }
    /** The /READY pin, active low, as the port bit reads it. */
    readyqR() {
        return this.readyRead() ? 0 : 1;
    }
    statusR() {
        return (this.talkStatus() ? 0x80 : 0) |
            (this.bufferLow ? 0x40 : 0) |
            (this.bufferEmpty ? 0x20 : 0);
    }
    /**
     * Advance the /READY countdown. Called with the device clocks that elapsed
     * while the CPU ran, which is what MAME's io_ready timer measures.
     */
    advanceClocks(clocks) {
        if (this.readyCountdown <= 0)
            return;
        this.readyCountdown -= clocks;
        if (this.readyCountdown > 0)
            return;
        this.readyCountdown = 0;
        if (this.rsWs === 0x02) {
            // A full FIFO cannot take the byte yet; retry a cycle later, as MAME does.
            if (this.fifoCount >= plan.fifoSize && this.ddis) {
                this.readyCountdown = plan.readyClocks;
                return;
            }
            if (this.commandRegister === NO_COMMAND) {
                this.dataLatched = false;
                this.dataWrite(this.writeLatch);
            }
        }
        else {
            this.ioReady = true;
        }
    }
    /**
     * Generate the samples covering the given seconds of emulated time, advancing the
     * /READY countdown in step so a write lands at the right point in the frame.
     */
    render(seconds, into) {
        this.clockCarry += seconds * this.sampleRate;
        let count = Math.floor(this.clockCarry);
        this.clockCarry -= count;
        if (count > 4096)
            count = 4096;
        for (let index = 0; index < count; index++) {
            this.advanceClocks(plan.clockDivider);
            into(this.step() / 32768);
        }
    }
}
// One engine per device instance, keyed by the instance's own member table.
const cores = new WeakMap();
// Samples the engine has produced but the audio sink has not collected.
const pending = new WeakMap();
function coreFor(context) {
    let core = cores.get(context.members);
    if (!core) {
        core = new GeneratedTms5220Core(640000);
        cores.set(context.members, core);
        pending.set(context.members, []);
    }
    return core;
}
const definition = deviceData;
const methods = {
    data_w: (context, data) => {
        coreFor(context).dataW(Number(data) & 0xff);
        return 0;
    },
    wsq_w: (context, state) => {
        coreFor(context).wsqW(Number(state) & 1);
        return 0;
    },
    rsq_w: (context, state) => {
        coreFor(context).rsqW(Number(state) & 1);
        return 0;
    },
    readyq_r: context => coreFor(context).readyqR(),
    intq_r: () => 0,
    status_r: context => coreFor(context).statusR(),
    set_unscaled_clock: (context, clock) => {
        coreFor(context).setClock(Number(clock));
        return 0;
    },
    // The chip's current output rate. gauntlet's speech-squeak line retunes the
    // clock while it talks, so the pump has to ask rather than cache it.
    sample_rate: context => Math.round(coreFor(context).sampleRate),
    // One native sample, scaled to the signed 16-bit range the sink mixes in.
    sound_stream_update: context => {
        const core = coreFor(context);
        core.advanceClocks(80);
        return core.step();
    },
};
definition.compiledMethods = methods;
export const device = definition;
export default device;
