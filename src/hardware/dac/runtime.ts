import { deviceAliases, soundTags, type SoundRuntimeContext } from '../sound-runtime.ts';

export function installDacRuntime(context: SoundRuntimeContext): void {
  for (const [chip, tag] of soundTags(context.sound).entries()) {
    const write = (data: number): void => {
      context.soundWrite(chip, data, context.fraction());
    };
    for (const method of context.sound.writeMethods) {
      context.registry.write[`${tag}.${method}`] = (_address, _offset, data) => write(data);
    }
    for (const alias of deviceAliases(context.board, tag)) {
      for (const method of context.sound.writeMethods) context.calls[`${alias}.${method}`] = write;
    }
  }
  for (const auxiliary of context.sound.auxiliaryDevices ?? []) {
    const aliases = [
      auxiliary.deviceTag,
      `m_${auxiliary.deviceTag}`,
      ...(auxiliary.member ? [auxiliary.member] : []),
    ];
    for (const method of auxiliary.writeMethods) {
      const name = `${auxiliary.deviceTag}.${method}`;
      context.registry.write[name] = (_address, _offset, data) => {
        context.soundWrite(0, data, context.fraction(), name);
      };
      for (const alias of aliases) {
        context.calls[`${alias}.${method}`] = (...args: number[]) => {
          context.soundWrite(0, args.at(-1) ?? 0, context.fraction(), name);
          return 0;
        };
      }
    }
  }
}
