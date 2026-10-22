import { C64_AUDIO_RATE } from "./definition.js";
/** MAME sound_stream hosting. The generated SID owns every sample and register. */
export function installC64AudioRuntime(context) {
    if (!context.time || !context.bindDeviceCall)
        throw new Error('SID requires scheduler and stream services');
    const time = context.time;
    const tag = context.sound.deviceTag;
    const driver = context.board.execution.cpus[0]?.tag;
    const gain = context.sound.routes?.find(route => route.channel === 0 || route.channel === -1)?.gain ?? 1;
    const state = { rendered: 0, due: 0 };
    const stream = {
        samples: () => state.due,
        put: (_channel, _index, value) => context.soundWrite(0, Number(value) * gain, context.fraction(), `${tag}.pcm`),
    };
    const update = () => {
        const target = Math.floor(time() * C64_AUDIO_RATE);
        state.due = target - state.rendered;
        if (state.due <= 0)
            return 0;
        // Rendering is synchronous with emulation, so no wall-clock catch-up or
        // discarded chip time is needed. Bound each stream buffer's allocation.
        while (state.rendered < target) {
            state.due = Math.min(4096, target - state.rendered);
            context.callDevice(tag, 'sound_stream_update', stream);
            state.rendered += state.due;
        }
        return 0;
    };
    context.bindDeviceCall(tag, 'stream.update', update);
    return { state, reset: () => { state.rendered = 0; state.due = 0; }, tickCpu: cpu => { if (cpu === driver)
            update(); } };
}
