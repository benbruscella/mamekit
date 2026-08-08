import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { AudioFrameRenderer, AudioProbeContext, ProbeSoundWrite } from '../audio-probe.ts';
import { DAC_WORKLET_ARTIFACT } from './definition.ts';

export async function createDacProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(join(
    context.outRoot,
    'runtime/generated',
    DAC_WORKLET_ARTIFACT.replace(/\.ts$/, '.js'),
  )).href) as {
    GeneratedDacMixer: new (chips?: number, routes?: unknown, auxiliary?: unknown) => unknown;
    GeneratedDacFrameRenderer: new (
      mixer: unknown, outputRate: number, refresh: number,
    ) => AudioFrameRenderer;
  };
  assert.ok(module.GeneratedDacMixer, 'generated DAC worklet exports no mixer');
  return new module.GeneratedDacFrameRenderer(
    new module.GeneratedDacMixer(
      context.sound.chips ?? 1,
      context.sound.routes,
      context.sound.auxiliaryDevices,
    ),
    context.outputRate,
    context.refresh,
  ) as { render(writes: readonly ProbeSoundWrite[]): Float32Array };
}
