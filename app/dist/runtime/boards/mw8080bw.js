// Midway 8080 B&W board (Space Invaders): single Intel 8080, everything
// interesting lives in the io space — inputs on IN ports, the MB14241
// shifter, the (discrete) soundboard on OUT ports. Wiring facts come from
// the generated config; behavior is hand-transpiled from
// src/mame/midw8080/mw8080bw.cpp.
//
// Interrupts (mw8080bw.cpp:147, 217-240): the video counter fires RST
// vectors 0xc7 | (64V << 4) | (!64V << 3) — 0xcf (RST 1) when the counter
// hits 0x80 (screen line 96) and 0xd7 (RST 2) at vblank start (counter
// 0xe0 = line 224). The counter starts at 0x20 on the first visible line.
import { I8080 } from "../i8080.js";
import { Bus } from "../bus.js";
import { MB14241 } from "../mb14241.js";
import { Mw8080bwVideo } from "../video/mw8080bw.js";
import { portHandlers } from "../input.js";
const VCOUNTER_START = 0x20;
const INT_TRIGGER_1 = 0x80; // -> RST 1 (0xcf)
const INT_TRIGGER_2 = 0xe0; // -> RST 2 (0xd7), vblank start
export class Mw8080bwBoard {
    video;
    fbWidth;
    fbHeight;
    main;
    shifter = new MB14241();
    cyclesPerLine;
    vtotal;
    frameCount = 0;
    irqHeld = false;
    shares;
    constructor(config, regions, inputs, sinks) {
        this.vtotal = config.screen.vtotal;
        const cpu = config.cpus[0];
        this.cyclesPerLine = Math.round(cpu.clock / config.screen.refresh / this.vtotal);
        const shares = {};
        this.shares = shares;
        // PORT_CUSTOM_MEMBER implementations (mw8080bw.cpp invaders_state):
        // the upright control panel port feeds the same bits of IN0/IN1/IN2,
        // and two dip banks are remapped from fake SW ports. Which member sits
        // on which port/mask comes from the generated config (config.customs).
        const members = {
            invaders_in0_control_r: () => inputs.read('CONTP1'),
            invaders_in1_control_r: () => inputs.read('CONTP1'),
            invaders_in2_control_r: () => inputs.read('CONTP1'), // cocktail P2 unsupported (upright)
            invaders_sw6_sw7_r: () => inputs.read('SW6SW7'),
            invaders_sw5_r: () => inputs.read('SW5'),
        };
        const shiftOf = (mask) => { let s = 0; while (s < 8 && !((mask >> s) & 1))
            s++; return s; };
        const customPort = (tag) => {
            let v = inputs.read(tag);
            for (const c of config.customs ?? []) {
                if (c.port !== tag)
                    continue;
                const member = members[c.member];
                if (!member)
                    continue;
                v = (v & ~c.mask) | ((member() << shiftOf(c.mask)) & c.mask);
            }
            return v;
        };
        const ports = portHandlers(cpu.io?.ranges ?? [], inputs);
        for (const key of Object.keys(ports)) {
            const tag = key.slice('port.'.length);
            if ((config.customs ?? []).some(c => c.port === tag))
                ports[key] = () => customPort(tag);
        }
        const registry = {
            read: {
                ...ports,
                'mb14241.shift_result_r': () => this.shifter.shiftResultR(),
            },
            write: {
                'mb14241.shift_count_w': (_a, _o, d) => this.shifter.shiftCountW(d),
                'mb14241.shift_data_w': (_a, _o, d) => this.shifter.shiftDataW(d),
                'watchdog.reset_w': () => { },
                // discrete soundboard ports: forwarded for a future SFX HLE
                'soundboard.p1_w': (_a, _o, d) => sinks.soundWrite(0x51, d),
                'soundboard.p2_w': (_a, _o, d) => sinks.soundWrite(0x52, d),
                'soundboard.p3_w': (_a, _o, d) => sinks.soundWrite(0x53, d),
                'soundboard.p4_w': (_a, _o, d) => sinks.soundWrite(0x54, d),
            },
        };
        const rom = regions[cpu.region];
        if (!rom)
            throw new Error(`missing rom region ${cpu.region}`);
        const bus = new Bus(cpu.ranges ?? config.ranges, rom, registry, shares);
        const io = new Bus(cpu.io?.ranges ?? [], new Uint8Array(0), registry, shares);
        const ioMask = cpu.io?.globalMask ?? 0xff;
        bus.in = port => io.read(port & ioMask);
        bus.out = (port, data) => io.write(port & ioMask, data);
        this.main = new I8080(bus);
        this.fbWidth = config.screen.width;
        this.fbHeight = config.screen.height;
        this.video = new Mw8080bwVideo({
            mainRam: shares['main_ram'] ?? new Uint8Array(0x2000),
        });
        this.reset();
    }
    reset() {
        this.main.reset();
        this.irqHeld = false;
        this.frameCount = 0;
    }
    /** deliver an RST vector; line held until the CPU accepts (INTE drops) */
    trigger(vector) {
        this.main.setIrqLine(true, vector);
        this.irqHeld = true;
    }
    runMain(target) {
        let total = 0;
        while (total < target && this.irqHeld) {
            const inteBefore = this.main.inte;
            total += this.main.step();
            if (this.irqHeld && inteBefore && !this.main.inte) {
                this.main.setIrqLine(false); // accepted (INTA disables interrupts)
                this.irqHeld = false;
            }
        }
        if (total < target)
            total += this.main.run(target - total);
        return total;
    }
    frame(fb) {
        const vbstart = 224; // visible lines carry vcounter 0x20..0xff exactly
        for (let line = 0; line < this.vtotal; line++) {
            // RST 1 mid-screen (vcounter 0x80 -> line 96), RST 2 at vblank start
            if (line === INT_TRIGGER_1 - VCOUNTER_START)
                this.trigger(0xcf);
            if (line === vbstart)
                this.trigger(0xd7);
            this.runMain(this.cyclesPerLine);
        }
        this.frameCount++;
        this.video.render(fb);
    }
    snapshot() {
        return {
            frame: this.frameCount,
            cpus: [{ tag: 'maincpu', pc: this.main.pc, sp: this.main.sp, a: this.main.a, halted: this.main.halted }],
        };
    }
}
