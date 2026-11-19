// Acceptance probe for a chip that renders its own stream beside the processor.
//
// The Atari 2600's TIA and the Game Boy's APU are read back within the frame,
// so they render on the main thread and post finished samples to the shared
// stream worklet (src/mame/stream-worklet.ts). The probe drives that worklet's
// own frame renderer, initialised the way audio.ts initialises the worklet, so
// it hears exactly what the browser plays.

import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from './audio-probe.ts';

export async function createStreamWorkletProbe(
  context: AudioProbeContext,
  artifact: string,
): Promise<AudioFrameRenderer> {
  const module = await import(pathToFileURL(
    join(context.outRoot, 'runtime/generated', artifact.replace(/\.ts$/, '.js')),
  ).href) as {
    GeneratedStreamFrameRenderer?: new (
      rate: number,
      outputRate: number,
      refresh: number,
    ) => { write(write: ProbeSoundWrite): void; render(): Float32Array; sides?: [Float32Array, Float32Array] };
  };
  assert.ok(module.GeneratedStreamFrameRenderer, `${artifact} exports no stream frame renderer`);
  // audio.ts posts `clock: core.clock ?? core.sampleRate` as the stream's rate.
  const renderer = new module.GeneratedStreamFrameRenderer(
    context.sound.clock ?? context.outputRate,
    context.outputRate,
    context.refresh,
  );
  // A board is stereo once a mix sample has brought its left and right.
  let stereo = false;
  return {
    render(writes: readonly ProbeSoundWrite[]): Float32Array {
      for (const write of writes) {
        if (write.left !== undefined) stereo = true;
        renderer.write(write);
      }
      return renderer.render();
    },
    sides: () => (stereo && renderer.sides ? [renderer.sides[0], renderer.sides[1]] : undefined),
  };
}
