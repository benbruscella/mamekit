

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { lowerAudioRoutes, monoRoutes } from './emit-machine.ts';
import type { GeneratedAudioRoute } from '../ir/board.ts';

import { compileMameSpeakerFilter } from '../mame/audio-compiler.ts';

import { compileNesApu } from '../mame/nes-apu-compiler.ts';

import { GAMEBOY_APU_TYPE, GAMEBOY_OUTPUT_RATE } from '../hardware/gameboy/definition.ts';
import { C64_AUDIO_RATE } from '../hardware/c64/definition.ts';
import { STREAM_AUDIO_RATE, STREAM_SOUND_TYPES, streamRoutedDevices } from '../hardware/speaker/definition.ts';

import type { GenerateOptions } from './generate.ts';

import { Graph } from '../kg/query.ts';
import { configuredDeviceMember } from './machine-source.ts';

export function lowerSound(byTag: Map<string, KGNode>, devices: KGNode[], graph: KnowledgeGraph, opts: GenerateOptions, g: Graph, romset: KGNode, cpus: readonly { tag: string; clock: number }[]) {
  // --- clocks + sound -------------------------------------------------------------
  const clocks = {
    namco06: Number(byTag.get('06xx')?.props.clock ?? 48000),
    wsg: Number(byTag.get('namco')?.props.clock ?? 96000),
  };
  // A chip this machine renders as a compiled stream belongs to no worklet.
  const streamed = streamRoutedDevices(graph);
  const worklet = (device: KGNode) => !streamed.has(device.id);
  // sound device -> runtime SoundCore kind (device-library mapping, not game-specific)
  // The Atari TIA's sound half. It is the only chip on the board, so it owns
  // the worklet; the DSP runs beside the CPU as a generated device because the
  // video half reaches it through a device finder (see the a2600 capability).
  const tiaChip = devices.find(device => device.props.type === 'TIA');
  const sidDevice = devices.find(device => ['MOS6581', 'MOS8580'].includes(String(device.props.type)));
  const gameboyApu = devices.find(device => device.props.type === GAMEBOY_APU_TYPE);
  // A cassette alone is only heard beside a stream that owns the worklet.
  const speakerDevice = devices.find(device => device.props.type !== 'CASSETTE' &&
    (STREAM_SOUND_TYPES.includes(String(device.props.type)) || streamed.has(device.id)));
  // The RP2A03's APU is a device its own device_add_mconfig builds: a stream.
  const rp2a03 = devices.find(d => String(d.props.type).startsWith('RP2A03'));
  const sound = rp2a03
    ? { kind: 'stream', clock: STREAM_AUDIO_RATE, deviceTag: 'nesapu' }
    : sidDevice
          ? { kind: 'sid', clock: C64_AUDIO_RATE, deviceTag: String(sidDevice.props.tag) }
        : gameboyApu
          ? {
              kind: 'gameboy',
              // MAME allocates the APU's stream `SAMPLE_RATE_OUTPUT_ADAPTIVE`,
              // so the rate is the host's to choose. One constant chooses it
              // for the renderer and for the audio context alike.
              clock: GAMEBOY_OUTPUT_RATE,
              deviceTag: String(gameboyApu.props.tag),
              // No master gain: `add_route(n, "speaker", 0.50, n)` is applied
              // where the two outputs are mixed to one channel, so what
              // arrives here is already what MAME's speaker hears.
            }
        : tiaChip
          ? (() => {
              const routes = lowerAudioRoutes(
                graph,
                [{ id: tiaChip.id, tag: String(tiaChip.props.tag) }],
              );
              return {
                kind: 'tia',
                // `TIA(config, "tia", m_xtal/114)`: the chip renders one sample
                // per clock, so this is both its clock and its stream rate,
                // exactly as tia_device::device_start allocates it.
                clock: Number(tiaChip.props.clock),
                deviceTag: String(tiaChip.props.tag),
                ...(routes[0]?.gain !== undefined ? { outputGain: routes[0].gain } : {}),
              };
            })()
        : speakerDevice
          // The level-driven speaker and the cassette routed beside it, each
          // rendering its own stream at machine().sample_rate().
          ? { kind: 'stream', clock: STREAM_AUDIO_RATE, deviceTag: String(speakerDevice.props.tag) }
    : { kind: 'none' };
  const nesApu = rp2a03 ? compileNesApu(opts.mameSrc, String(rp2a03.props.type)) : undefined;

  // MAME keeps each speaker channel apart, and the browser plays one, their
  // mean: a route to one channel counts that share.
  const mixRoutes = (sound as { routes?: GeneratedAudioRoute[] }).routes;
  if (mixRoutes) Object.assign(sound, { routes: monoRoutes(graph, mixRoutes) });
  if (sound.kind !== 'none') {
    Object.assign(sound, {
      speakerFilter: compileMameSpeakerFilter(opts.mameSrc),
    });
  }
  return { clocks, sound, nesApu };
}
