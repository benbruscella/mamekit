// AudioWorklet module hosting the Space Invaders sound-board HLE off the
// main thread. Compiled output (dist/runtime/invaders-worklet.js) is loaded
// via audioContext.audioWorklet.addModule(url); worklet module scopes support
// ES imports, so invaders-sound.js is fetched relative to this module's URL.
//
// Protocol (port.onmessage):
//   { type: 'init',  clock: number, waveRom?: Uint8Array, voices?: number }
//     (waveRom/voices are part of the shared shell contract; this core has
//      no wavetable ROM and ignores them — clock too, the board is RC-timed)
//   { type: 'write', offset: number, data: number }
//
// The core renders at its fixed native rate (48 kHz) and is linearly
// resampled here to the AudioContext rate (the worklet-global `sampleRate`).
import { InvadersSound } from "./invaders-sound.js";
/** Native samples rendered per refill of the internal buffer. */
const CHUNK = 256;
class InvadersProcessor extends AudioWorkletProcessor {
    core = null;
    /** native samples advanced per output sample (e.g. 48000 / 48000 = 1). */
    step = 1;
    // Linear-interpolation resampler state: output sits `frac` (0..1) of the
    // way between native samples s0 and s1.
    frac = 0;
    s0 = 0;
    s1 = 0;
    // Internal native-rate render buffer.
    nativeBuf = new Float32Array(CHUNK);
    nativePos = CHUNK; // next unread index; == length => refill
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const msg = event.data;
            switch (msg.type) {
                case 'init': {
                    this.core = new InvadersSound(msg.clock);
                    this.step = this.core.sampleRate / sampleRate;
                    this.frac = 0;
                    this.s0 = 0;
                    this.s1 = 0;
                    this.nativePos = this.nativeBuf.length;
                    break;
                }
                case 'write':
                    this.core?.write(msg.offset, msg.data);
                    break;
                case 'batch':
                    for (const w of msg.writes)
                        this.core?.write(w.offset, w.data);
                    break;
            }
        };
    }
    nextNativeSample() {
        if (this.nativePos >= this.nativeBuf.length) {
            // core is non-null whenever this is reached (checked in process())
            this.core.render(this.nativeBuf);
            this.nativePos = 0;
        }
        return this.nativeBuf[this.nativePos++];
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        if (!channels || channels.length === 0)
            return true;
        const out = channels[0];
        if (!this.core) {
            out.fill(0);
        }
        else {
            for (let i = 0; i < out.length; i++) {
                this.frac += this.step;
                while (this.frac >= 1) {
                    this.frac -= 1;
                    this.s0 = this.s1;
                    this.s1 = this.nextNativeSample();
                }
                out[i] = this.s0 + (this.s1 - this.s0) * this.frac;
            }
        }
        // duplicate mono into any additional output channels
        for (let c = 1; c < channels.length; c++)
            channels[c].set(out);
        return true;
    }
}
registerProcessor('invaders', InvadersProcessor);
