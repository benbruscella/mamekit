// Resistor-network color mixing — port of the parts of src/emu/video/resnet.cpp
// that the Namco palette functions need (compute_resistor_weights /
// combine_weights). Shared by video/galaga.ts and video/digdug.ts.
//
// Supports pulldown (and a pullup arg that the Namco drivers always pass 0);
// the autoscale scaler is used when the caller passes a negative scaler.
/** Port of compute_resistor_weights() (resnet.cpp:55-227), autoscale when scaler < 0. */
export function computeResistorWeights(minval, maxval, scaler, nets) {
    const w = [];
    for (const net of nets) {
        const r = net.resistances;
        const count = r.length;
        const ww = new Array(count);
        for (let n = 0; n < count; n++) {
            let R0 = net.pulldown === 0 ? 1.0 / 1e12 : 1.0 / net.pulldown;
            let R1 = net.pullup === 0 ? 1.0 / 1e12 : 1.0 / net.pullup;
            for (let j = 0; j < count; j++) {
                if (j === n) {
                    if (r[j] !== 0)
                        R1 += 1.0 / r[j];
                }
                else if (r[j] !== 0) {
                    R0 += 1.0 / r[j];
                }
            }
            R0 = 1.0 / R0;
            R1 = 1.0 / R1;
            const vout = (maxval - minval) * (R0 / (R1 + R0)) + minval;
            ww[n] = Math.min(Math.max(vout, minval), maxval);
        }
        w.push(ww);
    }
    let scale;
    if (scaler < 0.0) {
        let max = 0.0;
        for (const ww of w) {
            let sum = 0.0;
            for (const v of ww)
                sum += v;
            if (sum > max)
                max = sum;
        }
        scale = maxval / max;
    }
    else {
        scale = scaler;
    }
    return w.map((ww) => ww.map((v) => v * scale));
}
/** Port of combine_weights() (resnet.h:181): int(sum(tab[i]*w[i]) + 0.5). */
export function combineWeights(tab, ...bits) {
    let sum = 0.0;
    for (let i = 0; i < bits.length; i++)
        sum += tab[i] * bits[i];
    return Math.floor(sum + 0.5);
}
/** Pack 8-bit R,G,B into 0xAABBGGRR (little-endian RGBA for canvas ImageData). */
export function packRGB(r, g, b) {
    return (0xff000000 | (b << 16) | (g << 8) | r) >>> 0;
}
