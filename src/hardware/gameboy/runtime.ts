// Browser wiring for the Game Boy's sound half.
//
// Nothing here models the chip. MAME's `gameboy_sound_device` is instantiated
// beside the CPU and its registers are in the LR35902's own map, so every
// write already reaches the generated device and its frame sequencer already
// runs off the device timer. What is missing is the other half of what
// `sound_stream` does in MAME: ask the chip for the samples the elapsed CPU
// time is worth, and hand them to the sink.

import type { SoundRuntimeContext, SoundRuntimeHooks } from '../sound-runtime.ts';

/**
 * `stream_alloc(0, 2, SAMPLE_RATE_OUTPUT_ADAPTIVE)`: MAME lets the sound
 * system pick, so the rate is ours to choose. `sound_stream_update` only
 * reads the channel state -- it advances nothing -- so this sets output
 * resolution and nothing about the chip's timing.
 */
const OUTPUT_RATE = 48000;

/**
 * A stall must not become an unbounded catch-up burst. Fast-forward and a
 * paused tab both hand back far more elapsed time than a frame's worth.
 */
const MAX_SAMPLES_PER_TICK = 4096;

export function installGameboyRuntime(context: SoundRuntimeContext): SoundRuntimeHooks {
  const tag = context.sound.deviceTag;
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
      if (!driver || cpuTag !== driver.tag) return;
      const elapsed = cycles / Math.max(1, driver.cycleClock ?? driver.clock);
      carry += elapsed * OUTPUT_RATE;
      let due = Math.floor(carry);
      carry -= due;
      if (due <= 0) return;
      if (due > MAX_SAMPLES_PER_TICK) due = MAX_SAMPLES_PER_TICK;
      // MAME's own `sound_stream &` surface, which is all the generated
      // renderer asks of it: how many samples to produce, and where each
      // channel's value goes. `put_int` normalises against the full-scale
      // maximum the source passes, exactly as the stream does.
      const left: number[] = [];
      const right: number[] = [];
      const stream = {
        samples: () => due,
        put_int: (channel: number, index: number, value: number, max: number) => {
          const scaled = max ? Number(value) / Number(max) : 0;
          (Number(channel) === 0 ? left : right)[Number(index)] = scaled;
          return 0;
        },
      };
      if (context.callDevice(tag, 'sound_stream_update', stream) === undefined) return;
      const frac = context.fraction();
      for (let index = 0; index < due; index++) {
        // One sink channel: the two outputs are summed the way a mono speaker
        // hears the console's own left and right mix.
        const sample = ((left[index] ?? 0) + (right[index] ?? 0)) / 2;
        context.soundWrite(0, sample, frac, `${tag}.pcm`);
      }
    },
  };
}
