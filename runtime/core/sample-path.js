// MAME's -samplepath, over bytes the host already holds.
//
// `samples_device::load_samples` is compiled from MAME and opens each sample
// the way it does there: an `emu_file` on the sample path, `<set>/<name>.flac`
// and then `<set>/<name>.wav`. A set reaches the browser as the player's own
// zip, so the path is a table of the sets the host found, and nothing here
// knows what a sample is. A set that is not there fails its opens, and the
// device leaves those samples empty, as MAME does.
//
// `flac_decoder` is MAME's wrapper over libFLAC (lib/util/flac.cpp), which is
// no MAME source to compile, so the format is answered here. The device takes
// only mono 16-bit (`read_flac_sample`), and that is all this decodes.
import { copyGeneratedBytes } from "../ir/execute.js";
/** Member names as the path looks them up: a zip may file them in a folder. */
export function samplePathMembers(files) {
    const members = {};
    for (const [name, bytes] of files)
        members[name.split('/').pop().toLowerCase()] = bytes;
    return members;
}
/** MAME `emu_file`, opened on the sample path. */
export class IrEmuFile {
    bytes = new Uint8Array(0);
    position = 0;
    name = '';
    path;
    constructor(path) {
        this.path = path;
    }
    /** `<set>/<member>`; the answer is an error condition, so 0 is success. */
    open(name) {
        const [set, member] = String(name).split('/');
        const bytes = this.path[set]?.[member?.toLowerCase() ?? ''];
        if (!bytes)
            return 1;
        this.bytes = bytes;
        this.position = 0;
        this.name = String(name);
        return 0;
    }
    filename() {
        return this.name;
    }
    read(buffer, length) {
        const count = Math.max(0, Math.min(Number(length) >>> 0, this.bytes.length - this.position));
        copyGeneratedBytes(buffer, this.bytes.subarray(this.position, this.position + count), count);
        this.position += count;
        return count;
    }
    seek(offset, whence) {
        const origin = Number(whence) === 1 ? this.position : Number(whence) === 2 ? this.bytes.length : 0;
        this.position = Math.max(0, origin + Number(offset));
        return 0;
    }
    /** What `flac_decoder` is handed: the file's bytes, whole. */
    contents() {
        return this.bytes;
    }
}
/** A big-endian bit reader over one FLAC stream. */
class FlacBits {
    bytes;
    bit = 0;
    constructor(bytes, byte) {
        this.bytes = bytes;
        this.bit = byte * 8;
    }
    get byte() {
        return this.bit >>> 3;
    }
    get exhausted() {
        return this.byte >= this.bytes.length;
    }
    read(count) {
        let value = 0;
        for (let index = 0; index < count; index++) {
            value = value * 2 + ((this.bytes[this.bit >>> 3] ?? 0) >>> (7 - (this.bit & 7)) & 1);
            this.bit++;
        }
        return value;
    }
    signed(count) {
        const value = this.read(count);
        return count && value >= 2 ** (count - 1) ? value - 2 ** count : value;
    }
    unary() {
        let zeros = 0;
        while (!this.exhausted && !this.read(1))
            zeros++;
        return zeros;
    }
    align() {
        this.bit = (this.bit + 7) & ~7;
    }
    /** The UTF-8-style coded frame or sample number each frame header carries. */
    skipCodedNumber() {
        const first = this.read(8);
        let extra = 0;
        for (let mask = 0x80; first & mask; mask >>>= 1)
            extra++;
        if (extra > 1)
            this.read((extra - 1) * 8);
    }
}
/** The fixed predictors of the FLAC format, orders 0 to 4. */
const FLAC_FIXED = [[], [1], [2, -1], [3, -3, 1], [4, -6, 4, -1]];
/** MAME `flac_decoder` over an open file: the calls `read_flac_sample` makes. */
export class IrFlacDecoder {
    bytes;
    first = 0;
    rate = 0;
    channelCount = 0;
    bits = 0;
    total = 0;
    constructor(file) {
        this.bytes = file.contents();
        if (String.fromCharCode(...this.bytes.subarray(0, 4)) !== 'fLaC')
            return;
        let at = 4;
        for (;;) {
            const header = this.bytes[at] ?? 0x80;
            const length = (this.bytes[at + 1] << 16) | (this.bytes[at + 2] << 8) | this.bytes[at + 3];
            if ((header & 0x7f) === 0) {
                const info = new FlacBits(this.bytes, at + 4);
                info.read(16 + 16 + 24 + 24);
                this.rate = info.read(20);
                this.channelCount = info.read(3) + 1;
                this.bits = info.read(5) + 1;
                this.total = info.read(36);
            }
            at += 4 + (length || 0);
            if (header & 0x80 || at >= this.bytes.length)
                break;
        }
        this.first = at;
    }
    sample_rate() { return this.rate; }
    channels() { return this.channelCount; }
    bits_per_sample() { return this.bits; }
    total_samples() { return this.total; }
    finish() { return 0; }
    /** Fill the device's sample buffer; false if the stream does not parse. */
    decode_interleaved(buffer, samples) {
        const count = Number(samples);
        const decoded = new Int16Array(count);
        const reader = new FlacBits(this.bytes, this.first);
        let filled = 0;
        while (filled < count && !reader.exhausted) {
            const block = this.frame(reader);
            if (!block)
                return 0;
            for (let index = 0; index < block.length && filled < count; index++)
                decoded[filled++] = block[index];
        }
        if (filled !== count)
            return 0;
        copyGeneratedBytes(buffer, new Uint8Array(decoded.buffer), count * 2);
        return 1;
    }
    frame(reader) {
        if (reader.read(14) !== 0x3ffe)
            return undefined;
        reader.read(2);
        const blockCode = reader.read(4);
        const rateCode = reader.read(4);
        // Mono is channel assignment 0; the device refused anything else already.
        if (reader.read(4) !== 0)
            return undefined;
        reader.read(4);
        reader.skipCodedNumber();
        const size = blockCode === 1 ? 192
            : blockCode >= 2 && blockCode <= 5 ? 576 * 2 ** (blockCode - 2)
                : blockCode === 6 ? reader.read(8) + 1
                    : blockCode === 7 ? reader.read(16) + 1
                        : blockCode >= 8 ? 256 * 2 ** (blockCode - 8)
                            : 0;
        if (!size)
            return undefined;
        if (rateCode === 12)
            reader.read(8);
        else if (rateCode === 13 || rateCode === 14)
            reader.read(16);
        reader.read(8);
        const block = this.subframe(reader, size);
        reader.align();
        reader.read(16);
        return block;
    }
    subframe(reader, size) {
        if (reader.read(1))
            return undefined;
        const type = reader.read(6);
        let shift = 0;
        if (reader.read(1))
            shift = reader.unary() + 1;
        const bits = this.bits - shift;
        const output = new Int32Array(size);
        if (type === 0) {
            output.fill(reader.signed(bits));
        }
        else if (type === 1) {
            for (let index = 0; index < size; index++)
                output[index] = reader.signed(bits);
        }
        else if (type >= 8 && type <= 12) {
            const order = type - 8;
            for (let index = 0; index < order; index++)
                output[index] = reader.signed(bits);
            this.predicted(reader, output, order, FLAC_FIXED[order], 0);
        }
        else if (type >= 32) {
            const order = type - 31;
            for (let index = 0; index < order; index++)
                output[index] = reader.signed(bits);
            const precision = reader.read(4) + 1;
            const coefficientShift = reader.signed(5);
            const coefficients = Array.from({ length: order }, () => reader.signed(precision));
            this.predicted(reader, output, order, coefficients, coefficientShift);
        }
        else {
            return undefined;
        }
        if (shift)
            for (let index = 0; index < size; index++)
                output[index] = output[index] * 2 ** shift;
        return output;
    }
    predicted(reader, output, order, coefficients, shift) {
        this.residual(reader, output, order);
        for (let index = order; index < output.length; index++) {
            let sum = 0;
            for (let term = 0; term < order; term++)
                sum += coefficients[term] * output[index - term - 1];
            // Past 32 bits with a 15-bit coefficient, so no `>>`.
            output[index] += Math.floor(sum / 2 ** shift);
        }
    }
    /** Rice-coded partitions, left in `output` after the warm-up samples. */
    residual(reader, output, order) {
        const method = reader.read(2);
        const parameterBits = method === 1 ? 5 : 4;
        const escape = method === 1 ? 31 : 15;
        const partitionOrder = reader.read(4);
        const partitions = 2 ** partitionOrder;
        let at = order;
        for (let partition = 0; partition < partitions; partition++) {
            const count = (output.length >>> partitionOrder) - (partition === 0 ? order : 0);
            const parameter = reader.read(parameterBits);
            if (parameter === escape) {
                const width = reader.read(5);
                for (let index = 0; index < count; index++)
                    output[at++] = reader.signed(width);
                continue;
            }
            for (let index = 0; index < count; index++) {
                const coded = reader.unary() * 2 ** parameter + reader.read(parameter);
                output[at++] = coded % 2 ? -(coded + 1) / 2 : coded / 2;
            }
        }
    }
}
/** MAME `util::string_format`, for the `%s` and integer forms device code builds paths with. */
export function mameStringFormat(format, ...args) {
    let next = 0;
    return String(format).replace(/%[-0-9]*[sdux%]/g, conversion => {
        if (conversion === '%%')
            return '%';
        const value = args[next++];
        if (conversion.endsWith('x'))
            return Number(value).toString(16);
        if (!conversion.endsWith('s'))
            return String(Number(value));
        // `&names()[0][1]`: a char pointer into a string is the rest of it.
        const pointer = value;
        return pointer?.generatedPointer && typeof pointer.source === 'string' ? pointer.source.slice(pointer.offset) : String(value);
    });
}
