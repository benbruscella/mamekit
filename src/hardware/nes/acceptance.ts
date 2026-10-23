// Acceptance probe for the NES: the RP2A03's APU register writes, played
// through the same APU and resampler the generated NES worklet runs, one video
// frame at a time. DMC sample data reaches the worklet over its own message,
// which no acceptance sink carries, so a DMC channel plays silence here.
//
// A cartridge's own chip (MMC5, VRC6, Namco 163) arrives as `stream.pcm`
// writes, each one sample at the rate in its offset, and is added to the APU
// as the worklet adds it. Handed to the APU as a register write instead, no
// golden and no capture held any cartridge sound.

import assert from 'node:assert/strict';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  AudioFrameRenderer,
  AudioProbeContext,
  ProbeSoundWrite,
} from '../audio-probe.ts';
import { NES_APU_WORKLET_ARTIFACT } from './definition.ts';

export async function createNesProbe(context: AudioProbeContext): Promise<AudioFrameRenderer> {
  const runtime = join(context.outRoot, 'runtime');
  const { NesApu } = await import(pathToFileURL(join(runtime, 'hardware/nes/apu.js')).href) as {
    NesApu?: new (clock: number) => {
      readonly sampleRate: number;
      write(offset: number, data: number): void;
      render(out: Float32Array): void;
    };
  };
  const { Resampler } = await import(pathToFileURL(join(
    runtime, 'generated', NES_APU_WORKLET_ARTIFACT.replace(/\.ts$/, '.js'),
  )).href) as {
    Resampler?: new (nativeRate: number, render: (out: Float32Array) => void) => { next(): number };
  };
  assert.ok(NesApu, 'the NES runtime exports no APU');
  assert.ok(Resampler, `${NES_APU_WORKLET_ARTIFACT} exports no resampler`);
  assert.ok(context.sound.clock, 'the NES sound plan has no CPU clock');
  // The worklet is initialised with the sound plan's clock (audio.ts).
  const apu = new NesApu(context.sound.clock);
  const resampler = new Resampler(apu.sampleRate, out => apu.render(out));
  let carry = 0;
  const stream = { queue: [] as number[], rate: 0, phase: 0, held: 0 };
  const streamSample = (): number => {
    if (stream.rate <= 0) return 0;
    stream.phase += stream.rate / context.outputRate;
    while (stream.phase >= 1) {
      stream.phase -= 1;
      if (stream.queue.length) stream.held = stream.queue.shift()!;
    }
    return stream.held;
  };
  return {
    render(writes: readonly ProbeSoundWrite[]): Float32Array {
      for (const write of writes) {
        if (write.method === 'stream.pcm') {
          stream.rate = write.offset;
          stream.queue.push(write.data);
        } else {
          apu.write(write.offset, write.data);
        }
      }
      carry += context.outputRate / context.refresh;
      const output = new Float32Array(Math.floor(carry));
      carry -= output.length;
      for (let index = 0; index < output.length; index++) output[index] = resampler.next() + streamSample();
      return output;
    },
  };
}
