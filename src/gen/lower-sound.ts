

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { lowerAudioRoutes, monoRoutes } from './emit-machine.ts';
import type { GeneratedAudioRoute } from '../ir/board.ts';

import { compileMameSpeakerFilter } from '../mame/audio-compiler.ts';

import { mixerChildren } from '../mame/mixer-children.ts';

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
  // Every sound chip is its MAME class compiled whole and played in the
  // stream mix, so a board has sound when any device renders a stream: a chip
  // of its own, one routed into a stream device, or one a device builds in its
  // own device_add_mconfig and mixes (the RP2A03's APU, `maincpu:nesapu`). A
  // cassette alone is only heard beside one.
  const streamed = streamRoutedDevices(graph);
  const mixed = devices.flatMap(device => mixerChildren(opts.mameSrc, String(device.props.type))
    .filter(child => STREAM_SOUND_TYPES.includes(child.type))
    .map(child => `${String(device.props.tag)}:${child.tag}`));
  const speakerDevice = devices.find(device => device.props.type !== 'CASSETTE' &&
    (STREAM_SOUND_TYPES.includes(String(device.props.type)) || streamed.has(device.id)));
  const sound = mixed.length || speakerDevice
    ? { kind: 'stream', clock: STREAM_AUDIO_RATE, deviceTag: mixed[0] ?? String(speakerDevice!.props.tag) }
    : { kind: 'none' };

  // MAME keeps each speaker channel apart, and the browser plays one, their
  // mean: a route to one channel counts that share.
  const mixRoutes = (sound as { routes?: GeneratedAudioRoute[] }).routes;
  if (mixRoutes) Object.assign(sound, { routes: monoRoutes(graph, mixRoutes) });
  if (sound.kind !== 'none') {
    Object.assign(sound, {
      speakerFilter: compileMameSpeakerFilter(opts.mameSrc),
    });
  }
  return { clocks, sound };
}
