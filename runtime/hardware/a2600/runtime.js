// Browser wiring for the Atari 2600's sound half.
//
// Nothing here models the chip. `tia_video_device` hands its audio register
// writes to a `required_device<tia_device>` finder, so the sound device is
// instantiated beside the CPU and MAME's own `tia_sound_w` runs on it as
// generated IR -- this file never sees a register. What it does is what
// `sound_stream` does in MAME: ask the device for the samples the elapsed CPU
// time is worth, and pass them to the sink.
/**
 * A stall must not become an unbounded catch-up burst. Fast-forward and a
 * paused tab both hand back far more elapsed time than a frame's worth.
 */
const MAX_SAMPLES_PER_TICK = 4096;
export function installA2600Runtime(context) {
    const tag = context.sound.deviceTag;
    // tia_device::device_start allocates its stream at clock(), so the chip
    // renders exactly one sample per clock and the worklet resamples.
    const rate = context.board.devices?.find(device => device.tag === tag)?.clock ?? 0;
    // The chip is not driven by a bus and does not stop when a CPU does, so it
    // is pumped from one processor only -- counting every CPU would run it at a
    // multiple of its rate.
    const driver = context.board.execution.cpus[0];
    let carry = 0;
    return {
        reset: () => {
            carry = 0;
        },
        tickCpu: (cpuTag, cycles) => {
            if (!driver || cpuTag !== driver.tag || rate <= 0)
                return;
            const elapsed = cycles / Math.max(1, driver.cycleClock ?? driver.clock);
            carry += elapsed * rate;
            let due = Math.floor(carry);
            carry -= due;
            if (due <= 0)
                return;
            if (due > MAX_SAMPLES_PER_TICK)
                due = MAX_SAMPLES_PER_TICK;
            if (context.callDevice(tag, 'sound_stream_update', due) === undefined)
                return;
            const frac = context.fraction();
            for (const sample of context.deviceStream(tag)) {
                context.soundWrite(0, sample, frac, `${tag}.pcm`);
            }
        },
    };
}
