// Namco WSG (Waveform Sound Generator) — 3-voice mono wavetable sound.
// Hand-transpiled from MAME src/devices/sound/namco.cpp / namco.h
// (namco_wsg_device = namco_audio_device<3, false>, register interface
// pacman_sound_w). Galaga instantiates this at MASTER_CLOCK/6/32 = 96000 Hz
// with the wave PROM in region "namco" (0x200 bytes; only the first 0x100
// bytes — 8 waveforms x 32 samples, low nibble of each byte — are the
// wavetable).
//
// Timing note: MAME doubles the 96 kHz chip clock to an internal 192 kHz
// stream with f_fracbits = 16. Running the stream at the chip clock itself
// with fracbits = 15 is bit-identical in pitch (tone Hz =
// freq * clock / (2^15 * 32) either way), so this core renders at
// sampleRate === clock with 15 fractional bits. The 20-bit frequency value
// of voice 0 then spans counter bits 0..19, of which bits 15..19 index the
// 32-sample waveform — the classic Pac-Man hardware layout.
/** Fractional accumulator bits when the stream runs at the chip clock. */
const FRAC_BITS = 15;
/** Samples per waveform (and waveform-position mask). */
const WAVE_MASK = 0x1f;
export class NamcoWSG {
    /** Native output rate == chip clock (96000 for Pac-Man / Galaga). */
    sampleRate;
    numVoices;
    /** namco.h: MIX_RES = 128 * MAX_VOICES — per-voice headroom so the sum never clips. */
    mixRes;
    /** Decoded wavetable: 8 waveforms x 32 samples, each (nibble - 8) in [-8, 7]. */
    wavetable;
    /** Shadow of the 0x20 sound registers (low nibbles), for the write-skip test. */
    regs;
    voices;
    /** namco.cpp device_start(): "start with sound enabled". */
    enabled;
    constructor(waveRom, clock, voices = 3) {
        this.sampleRate = clock;
        this.numVoices = voices;
        this.mixRes = 128 * voices;
        this.regs = new Uint8Array(0x20);
        this.enabled = true;
        // build_decoded_waveform equivalent: the device maps rom[0x00..0xff]
        // and waveform_r() returns (byte & 0x0f) - 8 (unpacked variant).
        this.wavetable = new Int8Array(0x100);
        for (let i = 0; i < 0x100; i++) {
            const byte = i < waveRom.length ? waveRom[i] : 0;
            this.wavetable[i] = (byte & 0x0f) - 8;
        }
        this.voices = [];
        for (let i = 0; i < voices; i++) {
            this.voices.push({ frequency: 0, counter: 0, volume: 0, waveformSelect: 0 });
        }
    }
    /** namco_audio_device::sound_enable_w — silences the mixer when false. */
    soundEnable(state) {
        this.enabled = state;
    }
    /**
     * pacman_sound_w register map (offset 0x00..0x1f, low nibble of data):
     *   0x05 / 0x0a / 0x0f : ch 0/1/2 waveform select (3 bits)
     *   0x10               : ch 0 frequency bits 0-3 (voice 0 only)
     *   0x11-0x14          : ch 0 frequency bits 4-19 (0x14 is always 0)
     *   0x15               : ch 0 volume (4 bits)
     *   0x16-0x19 / 0x1a   : ch 1 frequency bits 4-19 / volume
     *   0x1b-0x1e / 0x1f   : ch 2 frequency bits 4-19 / volume
     */
    write(offset, data) {
        offset &= 0x1f;
        data &= 0x0f;
        if (this.regs[offset] === data)
            return;
        this.regs[offset] = data;
        let ch;
        if (offset < 0x10)
            ch = Math.trunc((offset - 5) / 5); // C++ truncating division
        else if (offset === 0x10)
            ch = 0;
        else
            ch = Math.trunc((offset - 0x11) / 5);
        if (ch < 0 || ch >= this.numVoices)
            return;
        const voice = this.voices[ch];
        switch (offset - ch * 5) {
            case 0x05:
                voice.waveformSelect = data & 7;
                break;
            case 0x10:
            case 0x11:
            case 0x12:
            case 0x13:
            case 0x14: {
                // the frequency has 20 bits; only the first voice has the extra low 4 bits
                let freq = ch === 0 ? this.regs[0x10] : 0;
                freq += this.regs[ch * 5 + 0x11] << 4;
                freq += this.regs[ch * 5 + 0x12] << 8;
                freq += this.regs[ch * 5 + 0x13] << 12;
                freq += this.regs[ch * 5 + 0x14] << 16; // always 0
                voice.frequency = freq >>> 0;
                break;
            }
            case 0x15:
                voice.volume = data;
                break;
        }
    }
    /**
     * Mix all voices into `out` (mono, [-1, 1]) at the native rate.
     * Mirrors namco_audio_device::sound_stream_update / namco_update_one:
     * per voice, sample = wavetable[(select << 5) | ((counter >> fracbits) & 0x1f)],
     * contribution = sample * volume / MIX_RES; a muted voice's counter does
     * not advance (exactly as in the C++).
     */
    render(out) {
        out.fill(0);
        if (!this.enabled)
            return;
        const n = out.length;
        const scale = 1 / this.mixRes;
        const table = this.wavetable;
        for (const voice of this.voices) {
            const vol = voice.volume;
            if (vol === 0)
                continue; // "only update if we have non-zero volume"
            const base = voice.waveformSelect << 5;
            const freq = voice.frequency;
            const gain = vol * scale;
            let counter = voice.counter;
            for (let i = 0; i < n; i++) {
                out[i] += table[base | ((counter >>> FRAC_BITS) & WAVE_MASK)] * gain;
                counter = (counter + freq) >>> 0;
            }
            voice.counter = counter;
        }
    }
}
