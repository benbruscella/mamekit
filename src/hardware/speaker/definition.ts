import type { PortDeclaration } from '../ports.ts';
import { SOUND_DEVICE_MAME_TYPES } from '../sound-device/definition.ts';

export const SPEAKER_ID = 'speaker';

/** MAME's level-driven speaker (`spkrdev.cpp`): the Spectrum's beeper. */
export const SPEAKER_MAME_TYPES = ['SPEAKER_SOUND'] as const;

export const SPEAKER_PORTS: readonly PortDeclaration[] = [
  { name: 'level', kind: 'registers', note: 'level_w from a driver port write' },
  { name: 'audio', kind: 'audio-out' },
];

/**
 * The rate a stream allocated at `machine().sample_rate()` renders at. MAME's
 * default; the device runtime answers the same value to the device itself.
 */
export const STREAM_AUDIO_RATE = 48000;

/**
 * Devices that render their own `sound_stream_update` beside the processor,
 * mixed on the main thread by their routed gains (sound kind `stream`): the
 * speaker, a cassette routed to the speakers so a load is heard, a POKEY, which
 * the CPU reads back, a samples device, whose `playing` a driver reads back,
 * a DISCRETE board, whose nodes a driver reads back too, and the chips mixed
 * with one on the same speaker (an SN76477, a TMS36xx, Phoenix's own board).
 */
export const STREAM_SOUND_TYPES: readonly string[] = [
  'SPEAKER_SOUND', 'CASSETTE', 'POKEY', 'SAMPLES', 'DISCRETE', 'SN76477', 'TMS36XX', 'PHOENIX_SOUND',
  // Compiled by the device capability, which also builds their bus ports: a
  // speech chip whose BSY a sound CPU polls, the uPD7759 whose BUSY the TMNT
  // sound CPU polls, and Konami's two PCM chips.
  'VLM5030', 'UPD7759', 'K007232', 'K053260',
  // The RP2A03's own APU (nes_apu.cpp), compiled by the NES capability, and
  // the consoles' sound chips, each compiled by its console's capability:
  // the TIA's sound half, the C64's SID and the Game Boy's APU.
  'NES_APU', 'TIA', 'MOS6581', 'MOS8580', 'DMG_APU',
  ...SOUND_DEVICE_MAME_TYPES,
];

/**
 * A stream device's mix gains from its routes to the speakers, already folded
 * to mono. A route of ALL_OUTPUTS (channel -1) sums every output at its gain,
 * as MAME's speaker does; routes that name outputs apart give each output its
 * own gain, relative to the first route's, which stays the stream's own.
 */
export function streamRouteGains(
  routes: readonly { channel: number; gain: number }[],
): { gain: number; outputGains?: number[] } {
  // Each route reaches its own speaker channel, and the mix is their sum.
  if (!routes.some(route => route.channel >= 0)) return { gain: routes.reduce((sum, route) => sum + route.gain, 0) };
  const gain = routes[0]!.gain;
  const outputGains: number[] = [];
  for (const route of routes) if (route.channel >= 0) outputGains[route.channel] = (outputGains[route.channel] ?? 0) + route.gain;
  return { gain, outputGains: Array.from(outputGains, output => gain ? (output ?? 0) / gain : 0) };
}

/**
 * The devices of one machine that render as compiled streams although another
 * capability plays their type in a worklet elsewhere, by graph node id: a chip
 * routed into a stream device (Burger Time's AYs into its DISCRETE), and one a
 * stream device routes into (Elevator Action's DAC, whose range its DISCRETE
 * sets). MAME mixes those sample by sample, which a worklet on another thread
 * cannot; the rule follows routes until nothing more joins, so a filter
 * between the two brings its own feeder along. A route names a tag in its own
 * machine config, so it is resolved beside the device that makes it. A
 * speaker is the mix itself, never a stream.
 */
export function streamRoutedDevices(graph: {
  nodes: readonly { id: string; label: string; props: Record<string, unknown> }[];
  edges: readonly { from: string; to: string; rel: string }[];
}): Set<string> {
  const devices = graph.nodes.filter(node => node.label === 'Device');
  const scope = (id: string) => id.slice(0, id.lastIndexOf('/') + 1);
  const byScopedTag = new Map(devices.map(node => [scope(node.id) + String(node.props.tag), node]));
  const byId = new Map(graph.nodes.map(node => [node.id, node]));
  const routes = graph.edges.filter(edge => edge.rel === 'HAS_AUDIO_ROUTE').flatMap(edge => {
    const from = byId.get(edge.from);
    const to = from && byScopedTag.get(scope(from.id) + String(byId.get(edge.to)?.props.target));
    return from?.label === 'Device' && to ? [{ from: from.id, to: to.id }] : [];
  });
  const streams = new Set(devices.filter(node => STREAM_SOUND_TYPES.includes(String(node.props.type)))
    .map(node => node.id));
  const rendered = new Set<string>();
  const speaker = (id: string) => byId.get(id)?.props.type === 'SPEAKER';
  for (let grew = true; grew;) {
    grew = false;
    for (const { from, to } of routes) {
      const joins = streams.has(to) && !streams.has(from) ? from
        : streams.has(from) && !streams.has(to) && !speaker(to) ? to
        : undefined;
      if (joins === undefined) continue;
      streams.add(joins);
      rendered.add(joins);
      grew = true;
    }
  }
  return rendered;
}

/** The shared stream worklet, which only plays what the mix posts. */
export const STREAM_AUDIO_WORKLET_ARTIFACT = 'audio/stream-worklet.ts';
