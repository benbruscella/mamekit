import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from '../audio-probe.ts';
import { AY8910_WORKLET_ARTIFACT } from './definition.ts';

interface Mixer { write(offset: number, data: number, method?: string): void; sample(): number }

export async function createAy8910Probe(
  context: AudioProbeContext,
): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(
    join(context.outRoot, 'runtime/generated', AY8910_WORKLET_ARTIFACT.replace(/\.ts$/, '.js')),
  ).href) as {
    GeneratedAy8910Mixer: new (
      clock: number,
      chips: number,
      outputRate: number,
      routes?: unknown,
      auxiliaryDevices?: unknown,
      discreteMixer?: unknown,
      deviceTags?: string[],
    ) => Mixer;
    GeneratedAy8910FrameRenderer: new (
      mixer: Mixer, outputRate: number, refresh: number,
    ) => { render(writes: readonly ProbeSoundWrite[]): Float32Array };
  };
  assert.ok(module.GeneratedAy8910Mixer, 'generated AY8910 worklet exports no mixer');
  const mixer = new module.GeneratedAy8910Mixer(
    context.sound.clock ?? 1_789_772,
    context.sound.chips ?? 1,
    context.outputRate,
    context.sound.routes,
    context.sound.auxiliaryDevices,
    context.sound.discreteMixer,
    context.sound.deviceTags,
  );
  return new module.GeneratedAy8910FrameRenderer(mixer, context.outputRate, context.refresh);
}
