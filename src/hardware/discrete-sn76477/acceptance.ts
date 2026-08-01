import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from '../audio-probe.ts';

interface DiscreteCore { write(offset: number, data: number): void; sample(): number }

/**
 * Both discrete topologies emit the same worklet shape, so one probe serves
 * them; the generated config names which artifact to load.
 */
export async function createDiscreteProbe(
  context: AudioProbeContext,
): Promise<AudioFrameRenderer> {
  assert.ok(context.sound.worklet, 'discrete audio config names no worklet artifact');
  const module = await import(pathToFileURL(join(
    context.outRoot,
    `runtime/generated/audio/${context.sound.worklet}-worklet.js`,
  )).href) as {
    GeneratedDiscreteAudioCore: new (
      outputRate: number, clock?: number, plan?: unknown,
    ) => DiscreteCore;
    GeneratedDiscreteAudioFrameRenderer: new (
      core: DiscreteCore, outputRate: number, refresh: number,
    ) => { render(writes: readonly ProbeSoundWrite[]): Float32Array };
  };
  const core = new module.GeneratedDiscreteAudioCore(
    context.outputRate,
    context.sound.clock,
    context.sound.discreteDac ?? context.sound.discreteEffects,
  );
  return new module.GeneratedDiscreteAudioFrameRenderer(
    core,
    context.outputRate,
    context.refresh,
  );
}
