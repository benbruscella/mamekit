import {
  deviceAliases,
  soundTags,
  type SoundRuntimeContext,
} from '../sound-runtime.ts';

export function installSn76489Runtime(context: SoundRuntimeContext): void {
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
        if (auxiliary.type === 'SAMPLES' && method === 'start') {
          context.calls[`${alias}.${method}`] = (channel = 0, sample = 0, loop = 0) => {
            context.soundWrite(
              channel & 0xff,
              (sample & 0x7f) | (loop ? 0x80 : 0),
              context.fraction(),
              name,
            );
            return 0;
          };
        } else if (auxiliary.type === 'SAMPLES' && method === 'stop') {
          context.calls[`${alias}.${method}`] = (channel = 0) => {
            context.soundWrite(channel & 0xff, 0, context.fraction(), name);
            return 0;
          };
        } else if (auxiliary.type === 'SAMPLES' && method === 'set_volume') {
          context.calls[`${alias}.${method}`] = (channel = 0, volume = 0) => {
            context.soundWrite(
              channel & 0xff,
              Math.max(0, Math.min(255, Math.round(Number(volume) * 255))),
              context.fraction(),
              name,
            );
            return 0;
          };
        } else {
          context.calls[`${alias}.${method}`] = (...args: number[]) => {
            context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
            return 0;
          };
        }
      }
    }
  }
}
