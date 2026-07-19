// AudioWorklet module hosting a BANK of YM2203 (OPN) chips off the main
// thread (Ghosts 'n Goblins drives two at 12 MHz / 8). Compiled output
// (dist/runtime/ym2203-worklet.js) is loaded via
// audioContext.audioWorklet.addModule(url); worklet module scopes support ES
// imports, so ym2203.js / ay8910.js are fetched relative to this module.
//
// Protocol (port.onmessage):
//   { type: 'init',  clock: number, chips?: number, waveRom?, voices? }
//     (waveRom/voices are part of the shared shell contract; the YM2203 has
//      no wavetable ROM and ignores them; chips defaults to 1)
//   { type: 'write', offset: number, data: number }
//     offset = chip*2 + port, port 0 = address, 1 = data — matching how the
//     board forwards gng's write-only map (0xe000/1 -> chip 0 offsets 0/1,
//     0xe002/3 -> chip 1 offsets 2/3).
//     offset 0xff is a RESET opcode (data ignored): all chips are rebuilt
//     from the last init parameters — registers cleared, envelopes released,
//     prescaler back to 6. The board (boards/gng.ts) sends this while the
//     sound CPU is held in reset.
//
// Each chip renders TWO native-rate mono streams — FM at chip.fmSampleRate
// (clock/72 by default, ~20.8 kHz for gng's 1.5 MHz: an UPsample to the
// context rate) and SSG at chip.ssgSampleRate (clock/16, ~93.75 kHz: a
// DOWNsample) — and both are run through the same box-filter resampler as
// ay8910-worklet.ts. Point-sampling caused audible aliasing there (chirpy
// high-pitched SFX); the box average is a cheap anti-alias low-pass, and for
// the sub-rate FM stream it degrades gracefully to a zero-order hold, which
// is exactly how the hardware repeats FM samples between clocks.
//
// Mixing applies MAME's gng route gains (verified in gng.cpp + ymfm_mame.h:
// device stream outputs 0-2 = SSG A/B/C at 0.40 each, output 3 = FM at
// 0.20), pre-converted to this core's output scales as YM2203_FM_GAIN /
// YM2203_SSG_GAIN (see ym2203.ts). Chips sum linearly like MAME's mono mix
// (two full-blast chips span exactly [-1, 1]); overall master volume is the
// shell's job.
import { YM2203, YM2203_FM_GAIN, YM2203_SSG_GAIN } from "./ym2203.js";
/** Native samples rendered per refill of the internal buffer. */
const CHUNK = 256;
/**
 * Box-filter decimating resampler over one native-rate render stream
 * (the same scheme as ay8910-worklet.ts, factored out because each YM2203
 * carries two streams at different native rates).
 */
class StreamResampler {
    /** native samples advanced per output sample */
    step;
    frac = 0;
    boxAvg = 0;
    nativeBuf = new Float32Array(CHUNK);
    nativePos = CHUNK; // next unread index; == length => refill
    render;
    constructor(nativeRate, render) {
        this.step = nativeRate / sampleRate;
        this.render = render;
    }
    /** track prescaler-driven native-rate changes without losing state */
    setNativeRate(nativeRate) {
        this.step = nativeRate / sampleRate;
    }
    nextNativeSample() {
        if (this.nativePos >= this.nativeBuf.length) {
            this.render(this.nativeBuf);
            this.nativePos = 0;
        }
        return this.nativeBuf[this.nativePos++];
    }
    /**
     * Next output-rate sample: average every native sample this output sample
     * spans; when the native rate is below the context rate (the FM stream)
     * this holds the last value between native ticks.
     */
    next() {
        this.frac += this.step;
        let acc = 0;
        let n = 0;
        while (this.frac >= 1) {
            this.frac -= 1;
            acc += this.nextNativeSample();
            n++;
        }
        if (n > 0)
            this.boxAvg = acc / n;
        return this.boxAvg;
    }
}
class Ym2203Processor extends AudioWorkletProcessor {
    chips = [];
    clock = 0;
    chipCount = 0;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const msg = event.data;
            switch (msg.type) {
                case 'init': {
                    this.clock = msg.clock;
                    this.chipCount = msg.chips && msg.chips > 0 ? msg.chips : 1;
                    this.buildChips();
                    break;
                }
                case 'write':
                    this.applyWrite(msg.offset, msg.data);
                    break;
                case 'batch':
                    for (const w of msg.writes)
                        this.applyWrite(w.offset, w.data);
                    break;
            }
        };
    }
    applyWrite(offset, data) {
        if (offset === 0xff) {
            // reset opcode: rebuild every chip from the init parameters
            this.buildChips();
            return;
        }
        const hosted = this.chips[offset >> 1];
        if (hosted) {
            hosted.chip.write(offset & 1, data);
            // prescaler writes (address 0x2d/0x2e/0x2f) change native rates
            hosted.fm.setNativeRate(hosted.chip.fmSampleRate);
            hosted.ssg.setNativeRate(hosted.chip.ssgSampleRate);
        }
    }
    buildChips() {
        this.chips = [];
        for (let i = 0; i < this.chipCount; i++) {
            const chip = new YM2203(this.clock);
            this.chips.push({
                chip,
                fm: new StreamResampler(chip.fmSampleRate, (out) => chip.renderFm(out)),
                ssg: new StreamResampler(chip.ssgSampleRate, (out) => chip.renderSsg(out)),
            });
        }
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        if (!channels || channels.length === 0)
            return true;
        const out = channels[0];
        if (this.chips.length === 0) {
            out.fill(0);
        }
        else {
            for (let i = 0; i < out.length; i++) {
                let acc = 0;
                for (const hosted of this.chips) {
                    acc += YM2203_FM_GAIN * hosted.fm.next() + YM2203_SSG_GAIN * hosted.ssg.next();
                }
                out[i] = acc;
            }
        }
        // duplicate mono into any additional output channels
        for (let c = 1; c < channels.length; c++)
            channels[c].set(out);
        return true;
    }
}
registerProcessor('ym2203', Ym2203Processor);
