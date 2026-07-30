// Runtime sound installers, by the sound kind the generator emits.
//
// Ships to the browser, so it imports only each package's runtime.ts — never
// its extract.ts, which belongs to the compiler.

import { installAy8910Runtime } from './ay8910/runtime.ts';
import { installYm2203Runtime } from './ym2203/runtime.ts';
import { installNesRuntime } from './nes/runtime.ts';
import {
  type SoundRuntimeContext,
  type SoundRuntimeHooks,
  type SoundRuntimeInstaller,
} from './sound-runtime.ts';

/**
 * Families whose registers need explicit wiring. Anything else routes writes
 * to the sink by method name, which is what the generated worklets expect.
 */
const INSTALLERS: Readonly<Record<string, SoundRuntimeInstaller>> = {
  ay8910: installAy8910Runtime,
  ym2203: installYm2203Runtime,
  nes: installNesRuntime,
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
  }
  return undefined;
}

export type { SoundRuntimeContext } from './sound-runtime.ts';
