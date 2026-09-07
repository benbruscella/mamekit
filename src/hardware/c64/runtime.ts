import type { SoundRuntimeContext, SoundRuntimeHooks } from '../sound-runtime.ts';
import { C64_AUDIO_RATE } from './definition.ts';

/** MAME sound_stream hosting. The generated SID owns every sample and register. */
export function installC64AudioRuntime(context: SoundRuntimeContext): SoundRuntimeHooks {
  if (!context.time || !context.bindDeviceCall) throw new Error('SID requires scheduler and stream services');
  const time = context.time;
  const tag = context.sound.deviceTag;
  const driver = context.board.execution.cpus[0]?.tag;
  const gain = context.sound.routes?.find(route => route.channel === 0 || route.channel === -1)?.gain ?? 1;
  let rendered = 0;
  let due = 0;
  const stream = {
    samples: () => due,
    put: (_channel: number, _index: number, value: number) =>
      context.soundWrite(0, Number(value) * gain, context.fraction(), `${tag}.pcm`),
  };
  const update = () => {
    const target = Math.floor(time() * C64_AUDIO_RATE);
    due = target - rendered;
    if (due <= 0) return 0;
    // Rendering is synchronous with emulation, so no wall-clock catch-up or
    // discarded chip time is needed. Bound each stream buffer's allocation.
    while (rendered < target) {
      due = Math.min(4096, target - rendered);
      context.callDevice(tag, 'sound_stream_update', stream);
      rendered += due;
    }
    return 0;
  };
  context.bindDeviceCall(tag, 'stream.update', update);
  return { reset: () => { rendered = 0; due = 0; }, tickCpu: cpu => { if (cpu === driver) update(); } };
}
