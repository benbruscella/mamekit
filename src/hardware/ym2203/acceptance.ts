// Acceptance probe for the generated YM2203 worklet.
//
// Node-side: it imports the emitted artifact from dist, so it validates the
// thing that ships rather than a source-side reimplementation.

import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from '../audio-probe.ts';
import { YM2203_WORKLET_ARTIFACT } from './definition.ts';

interface Mixer { write(offset: number, data: number, method?: string): void; sample(): number }

export async function createYm2203Probe(
  context: AudioProbeContext,
): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(
    join(context.outRoot, 'runtime/generated', YM2203_WORKLET_ARTIFACT.replace(/\.ts$/, '.js')),
  ).href) as {
    GeneratedYm2203Mixer: new (
      clock: number,
      chips: number,
      outputRate: number,
      routes?: unknown,
      auxiliaryDevices?: unknown,
    ) => Mixer;
    GeneratedYm2203FrameRenderer: new (
      mixer: Mixer, outputRate: number, refresh: number,
    ) => { render(writes: readonly ProbeSoundWrite[]): Float32Array };
  };
  assert.ok(module.GeneratedYm2203Mixer, 'generated YM2203 worklet exports no mixer');
  const mixer = new module.GeneratedYm2203Mixer(
    context.sound.clock ?? 1_500_000,
    context.sound.chips ?? 1,
    context.outputRate,
    context.sound.routes,
    context.sound.auxiliaryDevices,
  );
  return new module.GeneratedYm2203FrameRenderer(mixer, context.outputRate, context.refresh);
}
