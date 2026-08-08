import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { SAMPLES_WORKLET_ARTIFACT } from './definition.ts';

export async function createSamplesProbe(
  context: AudioProbeContext,
): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(join(
    context.outRoot,
    'runtime/generated',
    SAMPLES_WORKLET_ARTIFACT.replace(/\.ts$/, '.js'),
  )).href) as {
    GeneratedSamplesCore: new (outputRate: number) => unknown;
    GeneratedSamplesFrameRenderer: new (
      core: unknown,
      outputRate: number,
      refresh: number,
    ) => AudioFrameRenderer;
  };
  assert.ok(module.GeneratedSamplesCore, 'generated samples worklet exports no core');
  return new module.GeneratedSamplesFrameRenderer(
    new module.GeneratedSamplesCore(context.outputRate),
    context.outputRate,
    context.refresh,
  );
}
