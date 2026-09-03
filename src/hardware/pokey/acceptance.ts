import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { POKEY_WORKLET_ARTIFACT } from './definition.ts';

export async function createPokeyProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(join(
    context.outRoot,
    'runtime/generated',
    POKEY_WORKLET_ARTIFACT.replace(/\.ts$/, '.js'),
  )).href) as {
    GeneratedPokeyCore: new (clock: number, outputRate: number) => unknown;
    GeneratedPokeyFrameRenderer: new (
      core: unknown, outputRate: number, refresh: number,
    ) => AudioFrameRenderer;
  };
  assert.ok(module.GeneratedPokeyCore, 'generated POKEY worklet exports no core');
  return new module.GeneratedPokeyFrameRenderer(
    new module.GeneratedPokeyCore(context.sound.clock ?? 1_500_000, context.outputRate),
    context.outputRate,
    context.refresh,
  );
}
