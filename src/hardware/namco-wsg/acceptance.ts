import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from '../audio-probe.ts';
import { StreamingFrameResampler } from '../audio-probe.ts';
import { NAMCO_WSG_WORKLET_ARTIFACT } from './definition.ts';

interface WsgCore { readonly sampleRate: number }

export async function createNamcoWsgProbe(
  context: AudioProbeContext,
): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(
    join(
      context.outRoot,
      'runtime/generated',
      (context.sound.worklet
        ? `audio/${context.sound.worklet}-worklet.ts`
        : NAMCO_WSG_WORKLET_ARTIFACT).replace(/\.ts$/, '.js'),
    ),
  ).href) as {
    GeneratedNamcoWsgCore: new (
      waveRom: Uint8Array, clock: number, auxiliary?: unknown, sampleRom?: Uint8Array,
    ) => WsgCore;
    GeneratedNamcoWsgFrameRenderer: new (
      core: WsgCore, refresh: number,
    ) => { render(writes: readonly ProbeSoundWrite[]): Float32Array };
  };
  // The wavetable is the first 0x100 bytes of the "namco" PROM region.
  const waveRom = context.regions[context.sound.waveRegion ?? 'namco'];
  assert.ok(waveRom, 'WSG wave ROM is missing from the assembled regions');
  const core = new module.GeneratedNamcoWsgCore(
    waveRom,
    context.sound.clock ?? 96_000,
    context.sound.auxiliary,
    context.sound.sampleRegion ? context.regions[context.sound.sampleRegion] : undefined,
  );
  const native = new module.GeneratedNamcoWsgFrameRenderer(core, context.refresh);
  return core.sampleRate === context.outputRate
    ? native
    : new StreamingFrameResampler(
      native,
      core.sampleRate,
      context.outputRate,
      context.refresh,
    );
}
