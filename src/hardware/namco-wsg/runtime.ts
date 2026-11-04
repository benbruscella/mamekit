import { STREAM_AUDIO_RATE } from '../speaker/definition.ts';
import { createStreamMixer, streamDeviceSources } from '../speaker/runtime.ts';
import {
  deviceAliases,
  soundTags,
  type SoundRuntimeContext,
  type SoundRuntimeHooks,
} from '../sound-runtime.ts';

/** Wire shared WSG RAM, enable lines, and the streams mixed beside the voices. */
export function installNamcoWsgRuntime(
  context: SoundRuntimeContext,
): SoundRuntimeHooks | void {
  const registers = new Map<string, Uint8Array>();
  for (const tag of soundTags(context.sound)) {
    const bytes = new Uint8Array(context.sound.deviceType === 'POLEPOS_WSG' ? 0x40 : 0x20);
    registers.set(tag, bytes);
    for (const method of context.sound.writeMethods) {
      context.registry.write[`${tag}.${method}`] = (_address, offset, data) => {
        if (offset >= 0 && offset < bytes.length) bytes[offset] = data & 0xff;
        context.soundWrite(offset, data, context.fraction(), method);
      };
      for (const alias of deviceAliases(context.board, tag)) {
        context.calls[`${alias}.${method}`] = (offset, data) => {
          if (offset >= 0 && offset < bytes.length) bytes[offset] = data & 0xff;
          context.soundWrite(offset, data, context.fraction(), method);
          return 0;
        };
      }
    }
    if (context.sound.deviceType === 'POLEPOS_WSG') {
      context.registry.read[`${tag}.polepos_sound_r`] = (_address, offset) => bytes[offset] ?? 0xff;
      for (const alias of deviceAliases(context.board, tag)) {
        context.calls[`${alias}.polepos_sound_r`] = (offset = 0) => bytes[offset] ?? 0xff;
      }
    }
    for (const method of context.sound.enableMethods) {
      for (const alias of deviceAliases(context.board, tag)) {
        context.calls[`${alias}.${method}`] = (state = 0) => {
          context.soundWrite(-1, state, context.fraction(), method);
          return 0;
        };
      }
    }
  }
  for (const device of context.sound.auxiliaryDevices ?? []) {
    for (const method of device.writeMethods) {
      context.registry.write[`${device.deviceTag}.${method}`] = (_address, offset, data) => {
        context.soundWrite(offset, data, context.fraction(), method);
      };
      for (const alias of deviceAliases(context.board, device.deviceTag)) {
        context.calls[`${alias}.${method}`] = (...args: number[]) => {
          context.soundWrite(
            args.length >= 2 ? args.at(-2) ?? 0 : 0,
            args.at(-1) ?? 0,
            context.fraction(),
            method,
          );
          return 0;
        };
      }
    }
  }
  // A stream routed to the same speaker (the DISCRETE the 54xx drives on
  // Galaga, Xevious and Pole Position) renders on the main thread and is added
  // in the worklet beside the voices, at its route's gain over the WSG's own.
  const wsgGain = context.sound.routes?.[0]?.gain || 1;
  const streams = context.sound.streamDevices?.length
    ? createStreamMixer(context, streamDeviceSources(context.sound.streamDevices, wsgGain),
      (sample, frac) => context.soundWrite(STREAM_AUDIO_RATE, sample, frac, 'stream.pcm'))
    : undefined;
  return {
    state: { registers, ...(streams ? { streams: streams.state } : {}) },
    ...(streams ? { reset: streams.reset, tickCpu: streams.tickCpu } : {}),
  };
}
