// Runtime sound installers, by the sound kind the generator emits.
//
// Ships to the browser, so it imports only each package's runtime.ts — never
// its extract.ts, which belongs to the compiler.

import { installAy8910Runtime } from './ay8910/runtime.ts';
import { installYm2203Runtime } from './ym2203/runtime.ts';
import { installNesRuntime } from './nes/runtime.ts';
import { installSn76489Runtime } from './sn76489/runtime.ts';
import { installDacRuntime } from './dac/runtime.ts';
import { installNamcoWsgRuntime } from './namco-wsg/runtime.ts';
import { installSamplesRuntime } from './samples/runtime.ts';
import { installYm2151Runtime } from './ym2151/runtime.ts';
import { installBerzerkSoundRuntime } from './berzerk-sound/runtime.ts';
import { installA2600Runtime } from './a2600/runtime.ts';
import { installGameboyRuntime } from './gameboy/runtime.ts';
import {
  deviceAliases,
  type SoundRuntimeContext,
  type SoundRuntimeHooks,
  type SoundRuntimeInstaller,
} from './sound-runtime.ts';

/**
 * Families whose registers need explicit wiring. Anything else routes writes
 * to the sink by method name, which is what the generated worklets expect.
 */
const INSTALLERS: Readonly<Record<string, SoundRuntimeInstaller>> = {
  wsg: installNamcoWsgRuntime,
  ay8910: installAy8910Runtime,
  ym2203: installYm2203Runtime,
  nes: installNesRuntime,
  sn76489: installSn76489Runtime,
  dac: installDacRuntime,
  samples: installSamplesRuntime,
  ym2151: installYm2151Runtime,
  berzerk: installBerzerkSoundRuntime,
  exidy: installBerzerkSoundRuntime,
  tia: installA2600Runtime,
  gameboy: installGameboyRuntime,
};

export function installSoundRuntime(context: SoundRuntimeContext): SoundRuntimeHooks | undefined {
  const installer = INSTALLERS[context.sound.kind];
  if (installer) {
    return installer(context) ?? undefined;
  }
  // Worklets route by method name, so no offset convention exists between the
  // two sides; the raw register offset and the name are both forwarded.
  for (const method of context.sound.writeMethods) {
    context.registry.write[`${context.sound.deviceTag}.${method}`] =
      (_address, offset, data) => {
        context.soundWrite(offset, data, context.fraction(), method);
      };
    // A driver callback may reach the same sound device without a bus map,
    // e.g. Qix's PIA handlers call m_discrete->write(node, data). Bind every
    // source spelling emitted for the device member as well as the map key.
    for (const alias of deviceAliases(context.board, context.sound.deviceTag)) {
      context.calls[`${alias}.${method}`] = (...args: number[]) => {
        const data = args.at(-1) ?? 0;
        const rawOffset: unknown = args.length >= 2 ? args.at(-2) ?? 0 : 0;
        const reference = rawOffset && typeof rawOffset === 'object' &&
          'reference' in rawOffset
          ? String((rawOffset as { reference: unknown }).reference)
          : undefined;
        const offset = reference
          ? context.sound.writeOffsets?.[reference] ?? 0
          : Number(rawOffset) || 0;
        context.soundWrite(offset, data, context.fraction(), method);
        return 0;
      };
    }
  }
  return undefined;
}

export type { SoundRuntimeContext } from './sound-runtime.ts';
