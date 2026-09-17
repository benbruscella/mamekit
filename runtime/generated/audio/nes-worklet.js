// GENERATED from src/devices/cpu/m6502/rp2a03.cpp, src/devices/sound/nes_apu.cpp, src/devices/sound/nes_apu.h, src/devices/sound/nes_defs.h; do not edit.
// The register map and DSP tables are audited in nes-apu.audio.ir.json.
import { NesApu } from '../../hardware/nes/apu.js';
const CHUNK = 1024;
class Resampler {
    step;
    fraction = 0;
    last = 0;
    source = new Float32Array(CHUNK);
    position = CHUNK;
    render;
    constructor(nativeRate, render) {
        this.step = nativeRate / sampleRate;
        this.render = render;
    }
    next() {
        this.fraction += this.step;
        let sum = 0;
        let count = 0;
        while (this.fraction >= 1) {
            this.fraction--;
            if (this.position >= this.source.length) {
                this.render(this.source);
                this.position = 0;
            }
            sum += this.source[this.position++];
            count++;
        }
        if (count)
            this.last = sum / count;
        return this.last;
    }
}
class NesProcessor extends AudioWorkletProcessor {
    clock = 0;
    apu;
    resampler;
    constructor() {
        super();
        this.port.onmessage = (event) => {
            const message = event.data;
            if (message.type === 'init') {
                this.clock = message.clock;
                this.build();
            }
            else if (message.type === 'write') {
                this.apu?.write(message.offset, message.data);
            }
            else if (message.type === 'batch') {
                for (const write of message.writes)
                    this.apu?.write(write.offset, write.data);
            }
            else if (message.type === 'data') {
                this.apu?.data(message.id, message.bytes);
            }
            else {
                this.build();
            }
        };
    }
    build() {
        this.apu = new NesApu(this.clock);
        this.resampler = new Resampler(this.apu.sampleRate, out => this.apu.render(out));
    }
    process(_inputs, outputs) {
        const channels = outputs[0];
        if (!channels?.[0])
            return true;
        const output = channels[0];
        if (!this.resampler)
            output.fill(0);
        else
            for (let index = 0; index < output.length; index++)
                output[index] = this.resampler.next();
        for (let channel = 1; channel < channels.length; channel++)
            channels[channel].set(output);
        return true;
    }
}
registerProcessor('nes', NesProcessor);
