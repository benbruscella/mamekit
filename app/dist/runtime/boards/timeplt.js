// Time Pilot board: Z80 main CPU + the shared Konami timeplt sound board
// (Z80 + two AY-3-8910s, src/mame/shared/timeplt_a.cpp, ported once in
// runtime/timeplt-audio.ts and shared with rocnrope/pooyan).
// Wiring facts come from the generated config; behavior is hand-transpiled
// from src/mame/konami/timeplt.cpp:
//  - mainlatch (LS259, timeplt.cpp:746-754):
//      Q0 nmi_enable_w (vblank NMI gate; disabling also clears the pending
//         line in MAME — our Z80 NMI is an edge pulse, so the gate is
//         checked at vblank time instead, same as the galaga-family boards)
//      Q1 flip screen (INVERTED: flip = !bit)
//      Q2 timeplt sh_irqtrigger_w (rising edge -> HOLD_LINE IM1 IRQ on the
//         sound Z80), Q3 timeplt mute_w, Q4 video_enable_w,
//      Q5/Q6 coin counters, Q7 PAY OUT (unused)
//  - the latch is written through a lambda at 0xc300-0xc30f
//    (timeplt.cpp:461: mainlatch->write_d0(offset >> 1, data) — PAIRS of
//    addresses per line: c300/01 = Q0, c302/03 = Q1, ...). The parser can't
//    see through lw8 lambdas, so the config emits that range as `nop`; the
//    board patches it back to a write handler before building the bus. The
//    IN0 READ at 0xc300 (mirror 0xc9f) is a separate range and unaffected.
//  - scanline_r (0xc000): the current video scan line (screen->vpos()) —
//    the game multiplexes the cloud sprites off it (timeplt.cpp:335-338)
//  - vblank (line 240 = screen.vbstart, visible 16..239) fires the main
//    Z80 NMI when Q0 is set (timeplt.cpp:394-398)
import { Z80 } from "../z80.js";
import { TimepltAudio } from "../timeplt-audio.js";
import { LS259 } from "../ls259.js";
import { Bus } from "../bus.js";
import { TimepltVideo } from "../video/timeplt.js";
import { portHandlers } from "../input.js";
export class TimepltBoard {
    video;
    fbWidth;
    fbHeight;
    main;
    audio;
    mainlatch = new LS259();
    nmiEnable = 0;
    videoEnable = 0;
    curLine = 0;
    cyclesPerLine; // fractional (tpsound: ~116.5)
    cycleCarry = [0, 0];
    vtotal;
    vbstart;
    frameCount = 0;
    shares;
    constructor(config, regions, inputs, sinks) {
        this.vtotal = config.screen.vtotal;
        this.vbstart = config.screen.vbstart;
        const [mainSpec, audioSpec] = config.cpus;
        // keep the exact fractional per-line budget and carry the remainder
        this.cyclesPerLine = [mainSpec, audioSpec].map(c => c.clock / config.screen.refresh / this.vtotal);
        this.mainlatch.onQ(0, s => { this.nmiEnable = s; });
        this.mainlatch.onQ(1, s => {
            // q_out_cb<1>().set(flip_screen_set).invert()
            this.video.setFlip(!s);
        });
        this.mainlatch.onQ(2, s => this.audio.shIrqTrigger(s));
        this.mainlatch.onQ(3, s => this.audio.mute(s));
        this.mainlatch.onQ(4, s => {
            this.videoEnable = s;
            this.video.setVideoEnable(!!s);
        });
        // Q5/Q6 coin counters: bookkeeping only; Q7 PAY OUT unused
        // --- handler registry ----------------------------------------------------
        const shares = {};
        this.shares = shares;
        const frac = () => this.curLine / this.vtotal;
        const registry = {
            read: {
                ...portHandlers(mainSpec.ranges ?? [], inputs),
                'timeplt_state.scanline_r': () => this.curLine & 0xff,
            },
            write: {
                'watchdog.reset_w': () => { },
                // the lw8 lambda at 0xc300-0xc30f: bit index = offset >> 1
                'timeplt.mainlatch_pairs_w': (_a, off, d) => this.mainlatch.writeD0(off >> 1, d),
                // bytes are stored by the bus into the shares; the renderer reads the
                // live shares each frame, so no dirty-marking is needed
                'timeplt_state.colorram_w': () => { },
                'timeplt_state.videoram_w': () => { },
            },
        };
        // patch the parser-opaque lambda range (see header) into the latch handler
        const mainRanges = (mainSpec.ranges ?? []).map(r => r.kind === 'nop' && r.start === 0xc300 && r.end === 0xc30f
            ? { ...r, kind: 'handler', write: 'timeplt.mainlatch_pairs_w' }
            : r);
        // --- CPUs + buses ---------------------------------------------------------
        // region key drift: the sound ROM region is the timeplt_audio subdevice's
        // ("timeplt_audio:tpsound" in config.roms) while the cpu spec carries the
        // bare tag ("tpsound") — accept either
        const resolveRegion = (name) => regions[name] ?? regions[Object.keys(regions).find(k => k.endsWith(`:${name}`)) ?? ''];
        const mainRom = resolveRegion(mainSpec.region);
        const audioRom = resolveRegion(audioSpec.region);
        if (!mainRom || !audioRom)
            throw new Error('missing rom region');
        // TimepltAudio installs the ay/soundlatch/filter handlers into the
        // registry and builds the sound CPU's own bus
        this.audio = new TimepltAudio(audioSpec, audioRom, registry, shares, sinks, frac);
        this.main = new Z80(new Bus(mainRanges, mainRom, registry, shares));
        // --- video ----------------------------------------------------------------
        this.video = new TimepltVideo({
            regions,
            videoram: shares['videoram'] ?? new Uint8Array(0x400),
            colorram: shares['colorram'] ?? new Uint8Array(0x400),
            spriteram0: shares['spriteram[0]'] ?? new Uint8Array(0x100),
            spriteram1: shares['spriteram[1]'] ?? new Uint8Array(0x100),
        });
        this.fbWidth = this.video.width;
        this.fbHeight = this.video.height;
        this.reset();
    }
    reset() {
        this.mainlatch.reset();
        // latch reset leaves Q1 = 0 -> flip = !0 = true and Q4 = 0 -> video off
        // (m_video_enable = 0 at video_start) until the game's init code writes
        // them, matching MAME
        this.video.setFlip(true);
        this.video.setVideoEnable(false);
        this.nmiEnable = 0;
        this.videoEnable = 0;
        this.cycleCarry = [0, 0];
        this.main.reset();
        this.audio.reset();
    }
    frame(fb) {
        const [mainPerLine, audioPerLine] = this.cyclesPerLine;
        const carry = this.cycleCarry;
        for (let line = 0; line < this.vtotal; line++) {
            this.curLine = line;
            if (line === this.vbstart) { // vblank start (visible 16..239 native)
                if (this.nmiEnable)
                    this.main.nmi(); // vblank_irq gated by Q0
                this.video.vblank();
            }
            // fractional cycle budgets: run whole cycles, carry the remainder
            // (and any overshoot — run() finishes the last instruction) forward
            carry[0] += mainPerLine;
            carry[0] -= this.main.run(Math.floor(carry[0]));
            carry[1] += audioPerLine;
            carry[1] -= this.audio.run(Math.floor(carry[1]));
        }
        this.frameCount++;
        this.video.render(fb);
    }
    snapshot() {
        return {
            frame: this.frameCount,
            cpus: [
                { tag: 'maincpu', pc: this.main.pc, sp: this.main.sp, a: this.main.a, halted: this.main.halted },
                { tag: 'tpsound', pc: this.audio.cpu.pc, sp: this.audio.cpu.sp, a: this.audio.cpu.a, halted: this.audio.cpu.halted },
            ],
            mainlatch: this.mainlatch.value,
            nmiEnable: this.nmiEnable,
            videoEnable: this.videoEnable,
            soundlatch: this.audio.soundlatch,
            muted: this.audio.muted,
        };
    }
}
