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
}
