// Runtime sound installers, by the sound kind the generator emits.
//
// Ships to the browser, so it imports only each package's runtime.ts — never
// its extract.ts, which belongs to the compiler.

import { installA2600Runtime } from './a2600/runtime.ts';
import { installC64AudioRuntime } from './c64/runtime.ts';
import { installGameboyRuntime } from './gameboy/runtime.ts';
import { installStreamAudioRuntime } from './speaker/runtime.ts';
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
  tia: installA2600Runtime,
  gameboy: installGameboyRuntime,
  sid: installC64AudioRuntime,
  stream: installStreamAudioRuntime,
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
    // A driver callback may reach the same sound device without a bus map.
    // Bind every source spelling emitted for the device member as well as
    // the map key.
    for (const alias of deviceAliases(context.board, context.sound.deviceTag)) {
      context.calls[`${alias}.${method}`] = (...args: number[]) => {
        const offset = args.length >= 2 ? Number(args.at(-2)) || 0 : 0;
        context.soundWrite(offset, args.at(-1) ?? 0, context.fraction(), method);
        return 0;
      };
    }
  }
  return undefined;
}

export type { SoundRuntimeContext } from './sound-runtime.ts';
