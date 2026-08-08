import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { BERZERK_SOUND_WORKLET_ARTIFACT } from './definition.ts';
export async function createBerzerkSoundProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(join(
    context.outRoot, 'runtime/generated', BERZERK_SOUND_WORKLET_ARTIFACT.replace(/\.ts$/, '.js'),
  )).href) as {
    GeneratedBerzerkSoundCore: new (
      rate: number, speechRom?: Uint8Array, venture?: boolean,
    ) => unknown;
    GeneratedBerzerkSoundFrameRenderer: new (
      core: unknown, rate: number, refresh: number,
    ) => AudioFrameRenderer;
  };
  assert.ok(module.GeneratedBerzerkSoundCore);
  return new module.GeneratedBerzerkSoundFrameRenderer(
    new module.GeneratedBerzerkSoundCore(
      context.outputRate,
      context.regions[context.sound.sampleRegion ?? 'speech'],
      context.sound.deviceType === 'EXIDY_VENTURE',
    ),
    context.outputRate, context.refresh,
  );
}
