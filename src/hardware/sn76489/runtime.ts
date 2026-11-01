import {
  deviceAliases,
  soundTags,
  type SoundRuntimeContext,
  type SoundRuntimeHooks,
} from '../sound-runtime.ts';
import { STREAM_AUDIO_RATE } from '../speaker/definition.ts';
import { createStreamMixer } from '../speaker/runtime.ts';
import { MAIN_THREAD_STREAM_DEVICES, pumpStreamDevices } from '../stream-device-pump.ts';

export function installSn76489Runtime(context: SoundRuntimeContext): SoundRuntimeHooks | void {
  for (const [chip, tag] of soundTags(context.sound).entries()) {
    const write = (data: number): void => {
      context.soundWrite(chip, data, context.fraction());
    };
    context.registry.write[`${tag}.write`] = (_address, _offset, data) => write(data);
    for (const alias of deviceAliases(context.board, tag)) {
      context.calls[`${alias}.write`] = write;
    }
  }

  // Routed secondary streams (DACs and speech devices) share the board's
  // sound sink even though the SN76489 remains its primary synthesizer.
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    // A speech chip on the main thread takes its own writes; it is pumped below.
    if (MAIN_THREAD_STREAM_DEVICES.includes(auxiliary.type)) continue;
    const aliases = [
      auxiliary.deviceTag,
      `m_${auxiliary.deviceTag}`,
      ...(auxiliary.member ? [auxiliary.member] : []),
    ];
    for (const method of auxiliary.writeMethods) {
      const name = `${auxiliary.deviceTag}.${method}`;
      context.registry.write[name] = (_address, offset, data) => {
        context.soundWrite(offset, data, context.fraction(), name);
      };
      for (const alias of aliases) {
        context.calls[`${alias}.${method}`] = (...args: number[]) => {
          context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
          return 0;
        };
      }
    }
  }
  // Devices beside the chips that render their own stream on the main thread
  // (Congo Bongo's samples): mixed there and handed to the worklet as one PCM
  // stream.
  const streams = context.sound.streamDevices?.length
    ? createStreamMixer(context, context.sound.streamDevices.map(device => ({ tag: device.deviceTag, gain: device.gain })),
      (sample, frac) => context.soundWrite(STREAM_AUDIO_RATE, sample, frac, 'stream.pcm'))
    : undefined;
  const pumped = pumpStreamDevices(context, MAIN_THREAD_STREAM_DEVICES);
  if (!streams) return pumped;
  return {
    state: { streams: streams.state, ...(pumped ? { pumped: pumped.state } : {}) },
    reset: () => { streams.reset?.(); pumped?.reset?.(); },
    tickCpu: (cpu, cycles) => { streams.tickCpu?.(cpu, cycles); pumped?.tickCpu?.(cpu, cycles); },
  };
}
