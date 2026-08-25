import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from '../audio-probe.ts';
import { SN76489_WORKLET_ARTIFACT } from './definition.ts';

export async function createSn76489Probe(
  context: AudioProbeContext,
): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(
    join(context.outRoot, 'runtime/generated', SN76489_WORKLET_ARTIFACT.replace(/\.ts$/, '.js')),
  ).href) as {
    GeneratedSn76489Mixer: new (
      clock: number,
      chips: number,
      outputRate: number,
      routes?: unknown,
      deviceTypes?: readonly (string | undefined)[],
      clocks?: readonly (number | undefined)[],
    ) => unknown;
    GeneratedSn76489FrameRenderer: new (
      mixer: unknown,
      outputRate: number,
      refresh: number,
    ) => AudioFrameRenderer;
  };
  assert.ok(module.GeneratedSn76489Mixer, 'generated SN76489 worklet exports no mixer');
  const mixer = new module.GeneratedSn76489Mixer(
    context.sound.clock ?? 2_000_000,
    context.sound.chips ?? 1,
    context.outputRate,
    context.sound.routes,
    context.sound.deviceTypes,
    context.sound.clocks,
  );
  return new module.GeneratedSn76489FrameRenderer(
    mixer,
    context.outputRate,
    context.refresh,
  ) as { render(writes: readonly ProbeSoundWrite[]): Float32Array };
}
