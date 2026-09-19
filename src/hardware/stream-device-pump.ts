// Pumping a secondary sound device that runs on the main thread.
//
// A chip whose pin is polled by a CPU cannot live in the worklet (VLM5030's
// BSY is read back by Hyper Sports' sound CPU, just as TMS5220's /READY is by
// Gauntlet's), so the board instantiates it as a generated device and only its
// PCM crosses to the sink. This is the other half of what MAME's
// `sound_stream` does: ask the device for the samples elapsed time is worth,
// through the same `sound_stream &` surface its `sound_stream_update` reads,
// and forward them. No chip is modelled here.

import type { SoundRuntimeContext, SoundRuntimeHooks } from './sound-runtime.ts';

/**
 * A stall must not become an unbounded catch-up burst. Fast-forward and a
 * paused tab both hand back far more elapsed time than a frame's worth.
 */
const MAX_SAMPLES_PER_TICK = 4096;

/**
 * Secondary sound chips that run as generated devices beside the CPU because
 * a CPU reads one of their pins back: VLM5030's BSY feeds Hyper Sports' sound
 * CPU. Their bus writes belong to the device, not to the worklet.
 */
export const MAIN_THREAD_STREAM_DEVICES: readonly string[] = ['VLM5030'];

/**
 * Pump every auxiliary device of the given types that the board instantiated
 * and that renders through `sound_stream_update`. Each sample is written as
 * `<tag>.pcm` with the device's native rate in the offset, so the worklet can
 * resample without knowing the chip.
 */
export function pumpStreamDevices(
  context: SoundRuntimeContext,
  types: readonly string[],
): SoundRuntimeHooks | undefined {
  const pumped = (context.sound.auxiliaryDevices ?? [])
    .filter(device => types.includes(device.type))
    .map(device => ({ tag: device.deviceTag, carry: 0 }));
  if (!pumped.length) return undefined;
  // tickCpu fires once per processor, so exactly one drives the clock; and
  // not the one that owns the chip's bus, which a board may hold in reset.
  const driver = context.board.execution.cpus[0];
  return {
    state: { pumped },
    reset: () => {
      for (const device of pumped) device.carry = 0;
    },
    tickCpu: (cpuTag, cycles) => {
      if (!driver || cpuTag !== driver.tag) return;
      const elapsed = cycles / Math.max(1, driver.cycleClock ?? driver.clock);
      for (const device of pumped) {
        const rate = context.deviceStreamRate?.(device.tag) ?? 0;
        if (rate <= 0) continue;
        device.carry += elapsed * rate;
        let due = Math.floor(device.carry);
        device.carry -= due;
        if (due <= 0) continue;
        if (due > MAX_SAMPLES_PER_TICK) due = MAX_SAMPLES_PER_TICK;
        const samples = new Float64Array(due);
        // MAME's `sound_stream` output surface, one channel.
        const put = (index: number, value: number, max: number): number => {
          if (index >= 0 && index < due) samples[index] = max ? value / max : 0;
          return 0;
        };
        const stream = {
          samples: () => due,
          put_int: (_channel: number, index: number, value: number, max: number) =>
            put(Number(index), Number(value), Number(max)),
          put_int_clamp: (_channel: number, index: number, value: number, max: number) =>
            put(Number(index), Math.max(-Number(max), Math.min(Number(max) - 1, Number(value))), Number(max)),
          put: (_channel: number, index: number, value: number) => put(Number(index), Number(value), 1),
        };
        if (context.callDevice(device.tag, 'sound_stream_update', stream) === undefined) continue;
        const frac = context.fraction();
        for (const sample of samples) {
          context.soundWrite(rate, sample, frac, `${device.tag}.pcm`);
        }
      }
    },
  };
}
