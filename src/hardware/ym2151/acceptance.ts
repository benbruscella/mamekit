import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { AudioFrameRenderer, AudioProbeContext } from '../audio-probe.ts';
import { YM2151_WORKLET_ARTIFACT } from './definition.ts';

export async function createYm2151Probe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(join(
    context.outRoot, 'runtime/generated', YM2151_WORKLET_ARTIFACT.replace(/\.ts$/, '.js'),
  )).href) as {
    GeneratedYm2151Mixer: new (
      clock: number, chips: number, outputRate: number,
      sampleRom?: Uint8Array, auxiliaryDevices?: unknown,
    ) => unknown;
    GeneratedYm2151FrameRenderer: new (
      mixer: unknown, outputRate: number, refresh: number,
    ) => AudioFrameRenderer;
  };
  assert.ok(module.GeneratedYm2151Mixer, 'generated YM2151 worklet exports no mixer');
  return new module.GeneratedYm2151FrameRenderer(
    new module.GeneratedYm2151Mixer(
      context.sound.clock ?? 3_579_545,
      context.sound.chips ?? 1,
      context.outputRate,
      context.sound.sampleRegion ? context.regions[context.sound.sampleRegion] : undefined,
      context.sound.auxiliaryDevices,
    ),
    context.outputRate,
    context.refresh,
  );
}
