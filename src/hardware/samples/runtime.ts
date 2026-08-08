import { deviceAliases, type SoundRuntimeContext } from '../sound-runtime.ts';

/** Bind MAME samples_device calls made from source-compiled driver handlers. */
export function installSamplesRuntime(context: SoundRuntimeContext): { reset(): void } {
  const looping = new Set<number>();
  const tag = context.sound.deviceTag;
  const aliases = deviceAliases(context.board, tag);
  const bind = (method: string, fn: (...args: number[]) => number): void => {
    context.registry.write[`${tag}.${method}`] = (_address, offset, data) => {
      fn(offset, data);
    };
    for (const alias of aliases) context.calls[`${alias}.${method}`] = fn;
  };
  bind('start', (channel, sample, loop = 0) => {
    if (loop) looping.add(channel); else looping.delete(channel);
    context.soundWrite(
      channel & 0xff,
      (sample & 0x7f) | (loop ? 0x80 : 0),
      context.fraction(),
      'start',
    );
    return 0;
  });
  bind('stop', channel => {
    looping.delete(channel);
    context.soundWrite(channel & 0xff, 0, context.fraction(), 'stop');
    return 0;
  });
  bind('set_volume', (channel, volume) => {
    context.soundWrite(
      channel & 0xff,
      Math.max(0, Math.min(255, Math.round(Number(volume) * 255))),
      context.fraction(),
      'set_volume',
    );
    return 0;
  });
  for (const alias of aliases) {
    context.calls[`${alias}.playing`] = channel => looping.has(channel) ? 1 : 0;
  }
  return { reset: () => looping.clear() };
}
