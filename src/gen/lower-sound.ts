

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { lowerAudioRoutes, lowerAuxiliaryAudioDevices, lowerBiquadFilterChain, lowerDacChips } from './emit-machine.ts';

import { ayChipOutput, compileDiscreteDacAttenuator, compileDiscreteDacReferenceLevels, compileDiscreteEffects, compileDiscreteMixer, compileMameSpeakerFilter, compileNamco54Discrete, compilePoleposDiscrete } from '../mame/audio-compiler.ts';

import { compileNesApu } from '../mame/nes-apu-compiler.ts';

import { GAMEBOY_APU_TYPE, GAMEBOY_OUTPUT_RATE } from '../hardware/gameboy/definition.ts';
import { C64_AUDIO_RATE } from '../hardware/c64/definition.ts';
import { STREAM_AUDIO_RATE, STREAM_SOUND_TYPES } from '../hardware/speaker/definition.ts';

import type { GenerateOptions } from './generate.ts';

import { Graph } from '../kg/query.ts';
import { configuredDeviceMember } from './machine-source.ts';
import { lowerNetlistSound } from './lower-netlist.ts';

export function lowerSound(byTag: Map<string, KGNode>, devices: KGNode[], graph: KnowledgeGraph, opts: GenerateOptions, g: Graph, romset: KGNode, cpus: readonly { tag: string; clock: number }[]) {
  // --- clocks + sound -------------------------------------------------------------
  const clocks = {
    namco06: Number(byTag.get('06xx')?.props.clock ?? 48000),
    wsg: Number(byTag.get('namco')?.props.clock ?? 96000),
  };
  // sound device -> runtime SoundCore kind (device-library mapping, not game-specific)
  const ayChips = devices.filter(d =>
    ['AY8910', 'AY8912', 'YM2149'].includes(String(d.props.type)));
  const ayRoutes = lowerAudioRoutes(
    graph,
    ayChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
  );
  // Each chip's flags and pin loads pick the table it streams.
  const ayChipOutputs = ayChips.map(chip => ayChipOutput(
    opts.mameSrc,
    Array.isArray(chip.props.config) ? chip.props.config.map(String) : [],
  ));
  let auxiliaryAudioDevices = lowerAuxiliaryAudioDevices(
    graph,
    devices.map(device => ({
      id: device.id,
      tag: String(device.props.tag),
      type: String(device.props.type),
      ...(configuredDeviceMember(device.props)
        ? { member: configuredDeviceMember(device.props) }
        : {}),
      ...(typeof device.props.clock === 'number' ? { clock: device.props.clock } : {}),
    })),
  );
  auxiliaryAudioDevices = auxiliaryAudioDevices.map(device => {
    const referenceTag = device.referenceControl?.deviceTag;
    if (!referenceTag) return device;
    const referenceDevice = devices.find(candidate => candidate.props.tag === referenceTag);
    const config = Array.isArray(referenceDevice?.props.config)
      ? referenceDevice.props.config.map(String).join('\n')
      : '';
    const netlist = /\bDISCRETE\s*\([^,]+,[^,]+,\s*(\w+)\s*\)/.exec(config)?.[1];
    const referenceLevels = netlist
      ? compileDiscreteDacReferenceLevels(opts.mameSrc, String(graph.meta.driverFile), netlist)
      : undefined;
    return referenceLevels ? { ...device, referenceLevels } : device;
  });
  const ymChips = devices.filter(d =>
    d.props.type === 'YM2203' || d.props.type === 'YM2610');
  const ym2610SampleRegion = g.out(romset.id, 'HAS_REGION')
    .map(({ node: region }) => String(region.props.tag))
    .find(region => region.endsWith(':ymsnd:adpcma'));
  const opmChips = devices.filter(d => d.props.type === 'YM2151');
  // OPL parts hosted by the same generated FM worklet. YM3812 is a YM3526
  // plus OPL2's waveform select, and Wardner's only sound chip is one.
  const oplChips = devices.filter(d =>
    d.props.type === 'YM3526' || d.props.type === 'YM3812');
  const snChips = devices.filter(d =>
    ['SN76496', 'SN76489', 'SN76489A', 'SN76494', 'SN94624', 'NCR8496', 'PSSJ3',
      'GAMEGEAR', 'SEGAPSG'].includes(String(d.props.type)));
  const dacChips = devices.filter(d =>
    ['DAC_1BIT', 'DAC_4BIT_R2R', 'DAC_8BIT_R2R', 'MC1408', 'AD7533',
      'NETLIST_INT_INPUT']
      .includes(String(d.props.type)));
  const berzerkSound = devices.find(d =>
    d.props.type === 'EXIDY' || d.props.type === 'EXIDY_VENTURE');
  // The Atari TIA's sound half. It is the only chip on the board, so it owns
  // the worklet; the DSP runs beside the CPU as a generated device because the
  // video half reaches it through a device finder (see the a2600 capability).
  const tiaChip = devices.find(device => device.props.type === 'TIA');
  const sidDevice = devices.find(device => ['MOS6581', 'MOS8580'].includes(String(device.props.type)));
  const gameboyApu = devices.find(device => device.props.type === GAMEBOY_APU_TYPE);
  // A cassette alone is only heard beside a stream that owns the worklet.
  const speakerDevice = devices.find(device => device.props.type !== 'CASSETTE' &&
    STREAM_SOUND_TYPES.includes(String(device.props.type)));
  const discreteDevice = devices.some(device => device.props.type === 'DISCRETE')
    ? devices.find(device => {
        const type = String(device.props.type);
        return type.endsWith('_AUDIO') || type.endsWith('_SOUND');
      })
    : undefined;
  const sound = devices.some(d => String(d.props.type).startsWith('RP2A03'))
    // the NES APU lives on the CPU die — the RP2A03 is its own sound device
    ? { kind: 'nes', clock: cpus[0].clock }
    : devices.some(d => ['NAMCO_WSG', 'POLEPOS_WSG', 'NAMCO'].includes(String(d.props.type)))
    ? {
        kind: 'wsg',
        clock: Number(byTag.get('namco')?.props.clock ?? 96000),
        waveRegion: 'namco',
        ...(devices.some(device => device.props.type === 'POLEPOS_SOUND')
          ? { sampleRegion: 'engine', worklet: 'polepos-wsg' }
          : {}),
        ...(auxiliaryAudioDevices.length ? { auxiliaryDevices: auxiliaryAudioDevices } : {}),
      }
    : opmChips.length
      ? {
          kind: 'ym2151',
          clock: Number(opmChips[0]!.props.clock),
          chips: opmChips.length,
          // set_output_gain names a chip by tag (Gauntlet's mixer_w).
          deviceTags: opmChips.map(device => String(device.props.tag)),
          ...(lowerAudioRoutes(
            graph,
            opmChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
          ).length ? {
              routes: lowerAudioRoutes(
                graph,
                opmChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
              ),
            } : {}),
          ...(auxiliaryAudioDevices.length
            ? { auxiliaryDevices: auxiliaryAudioDevices }
            : {}),
          ...(auxiliaryAudioDevices.some(device => device.type === 'OKIM6295')
            ? { sampleRegion: auxiliaryAudioDevices.find(device =>
                device.type === 'OKIM6295')!.deviceTag }
            : {}),
        }
    : ymChips.length || oplChips.length
      ? (() => {
          const ymRoutes = lowerAudioRoutes(
            graph,
            ymChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
          );
          return {
            kind: 'ym2203',
            clock: Number((ymChips[0] ?? oplChips[0]).props.clock),
            chips: ymChips.length,
            ...(ymChips.length ? { deviceType: String(ymChips[0]!.props.type) } : {}),
            ...(ymChips.some(chip => chip.props.type === 'YM2610') && ym2610SampleRegion
              ? { sampleRegion: ym2610SampleRegion }
              : {}),
            ...(ymRoutes.length ? { routes: ymRoutes } : {}),
            ...(auxiliaryAudioDevices.length
              ? { auxiliaryDevices: auxiliaryAudioDevices }
              : {}),
          };
        })()
      : ayChips.length
        ? {
            kind: 'ay8910',
            clock: Number(ayChips[0].props.clock),
            chips: ayChips.length,
            deviceTags: ayChips.map(chip => String(chip.props.tag)),
            chipOutputs: ayChipOutputs,
            ...(ayRoutes.length ? { routes: ayRoutes } : {}),
            ...(auxiliaryAudioDevices.length
              ? { auxiliaryDevices: auxiliaryAudioDevices }
              : {}),
          }
        : snChips.length
          ? (() => {
              const snRoutes = lowerAudioRoutes(
                graph,
                snChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
              );
              return {
                kind: 'sn76489',
                clock: Number(snChips[0].props.clock),
                chips: snChips.length,
                // Per chip, because a board fits family variants and clocks
                // independently: Congo Bongo's second SN76489A runs at a
                // quarter of the first's.
                deviceTypes: snChips.map(chip => String(chip.props.type)),
                clocks: snChips.map(chip => Number(chip.props.clock)),
                ...(snRoutes.length ? { routes: snRoutes } : {}),
                ...(auxiliaryAudioDevices.length
                  ? { auxiliaryDevices: auxiliaryAudioDevices }
                  : {}),
              };
            })()
          : dacChips.length && !(devices.some(device => device.props.type === 'SAMPLES') && dacChips.every(device =>
              device.props.type === 'DAC_1BIT'))
            ? {
                kind: 'dac',
                clock: cpus.find(cpu => /sound|audio/.test(cpu.tag))?.clock ?? cpus[0].clock,
                chips: dacChips.length,
                // Resolution and coding are per-chip MAME facts; the worklet
                // resolves them from its lowered DAC_GENERATOR table.
                deviceTypes: dacChips.map(device => String(device.props.type)),
                dacs: lowerDacChips(opts.mameSrc, dacChips.map(device => ({
                  tag: String(device.props.tag),
                  type: String(device.props.type),
                  config: Array.isArray(device.props.config)
                    ? device.props.config.map(String)
                    : [],
                }))),
                // MAME's op-amp stages between the DAC and the board output.
                ...(lowerBiquadFilterChain(graph, dacChips.map(device => ({
                  id: device.id, tag: String(device.props.tag),
                }))).length
                  ? {
                      filterChain: lowerBiquadFilterChain(graph, dacChips.map(device => ({
                        id: device.id, tag: String(device.props.tag),
                      }))),
                    }
                  : {}),
                routes: lowerAudioRoutes(
                  graph,
                  dacChips.map(device => ({ id: device.id, tag: String(device.props.tag) })),
                ),
                ...(auxiliaryAudioDevices.length
                  ? { auxiliaryDevices: auxiliaryAudioDevices }
                  : {}),
              }
        : berzerkSound
          ? {
              kind: berzerkSound.props.type === 'EXIDY_VENTURE' ? 'exidy' : 'berzerk',
              deviceType: String(berzerkSound.props.type),
              clock: Number(berzerkSound.props.clock) ||
                cpus.find(cpu => /sound|audio/.test(cpu.tag))?.clock ||
                cpus[0].clock,
              worklet: 'berzerk-sound',
              ...(devices.some(device => device.props.type === 'S14001A')
                ? { sampleRegion: 'speech' }
                : {}),
            }
        : discreteDevice
          ? {
              kind: 'discrete',
              clock: cpus[0].clock,
              worklet: String(discreteDevice.props.type).toLowerCase().replace(/_/g, '-'),
            }
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
  const nesApu = sound.kind === 'nes' ? compileNesApu(opts.mameSrc) : undefined;
  // A mix that goes through one gain carries MAME's route here, for the shell to
  // apply after the worklet: a WSG's, or the APU's route out of the RP2A03.
  const singleRoute = (types: readonly string[]): number | undefined => lowerAudioRoutes(
    graph,
    devices
      .filter(device => types.some(type => String(device.props.type).startsWith(type)))
      .map(device => ({ id: device.id, tag: String(device.props.tag) })),
  )[0]?.gain;
  const outputGain = sound.kind === 'wsg'
    ? singleRoute(['NAMCO', 'POLEPOS_WSG'])
    : sound.kind === 'nes'
      ? singleRoute(['RP2A03'])
      : undefined;
  if (outputGain !== undefined) Object.assign(sound, { outputGain });

  const discreteNetlist = devices
    .filter(device => device.props.type === 'DISCRETE')
    .flatMap(device => Array.isArray(device.props.config) ? device.props.config : [])
    .map(String)
    .map(value => /\bDISCRETE\s*\([^,]+,[^,]+,\s*(\w+)\s*\)/.exec(value)?.[1])
    .find((value): value is string => Boolean(value));
  if (sound.kind === 'none' && discreteNetlist) {
    const sourceFiles = [
      String(graph.meta.driverFile),
      ...graph.nodes
        .filter(node => node.label === 'SourceFile')
        .map(node => String(node.props.path)),
    ];
    const discreteDac = compileDiscreteDacAttenuator(
      opts.mameSrc,
      sourceFiles,
      discreteNetlist,
    );
    if (discreteDac) {
      Object.assign(sound, {
        kind: 'discrete',
        clock: cpus[0].clock,
        worklet: '../../hardware/discrete-dac/discrete-dac',
        discreteDac,
      });
    } else {
      const discreteEffects = compileDiscreteEffects(
        opts.mameSrc,
        sourceFiles,
        discreteNetlist,
      );
      if (discreteEffects) {
        Object.assign(sound, {
          kind: 'discrete',
          clock: cpus[0].clock,
          worklet: '../../hardware/discrete-effects/discrete-effects',
          discreteEffects,
        });
      }
    }
  }
  if (sound.kind === 'wsg' && discreteNetlist) {
    const poleposWsg = devices.some(device => device.props.type === 'POLEPOS_WSG');
    Object.assign(sound, {
      auxiliary: (poleposWsg ? compilePoleposDiscrete : compileNamco54Discrete)(
        opts.mameSrc,
        String(graph.meta.driverFile),
        discreteNetlist,
      ),
    });
  }
  if (sound.kind === 'ay8910' && discreteNetlist) {
    const discreteMixer = compileDiscreteMixer(
      opts.mameSrc,
      [
        String(graph.meta.driverFile),
        ...graph.nodes
          .filter(node => node.label === 'SourceFile')
          .map(node => String(node.props.path)),
      ],
      discreteNetlist,
    );
    if (discreteMixer) Object.assign(sound, { discreteMixer });
  }
  // MAME keeps a stereo target's channels apart, and the browser plays one
  // channel, their average: a route to one of the two counts half. The YM2151
  // does this in its worklet.
  const stereoTargets = new Set(devices
    .filter(device => device.props.type === 'SPEAKER' &&
      (Array.isArray(device.props.config) ? device.props.config.join('\n') : '').match(/SPEAKER\s*\(\s*config\s*,[^,]+,\s*[2-9]/))
    .map(device => String(device.props.tag)));
  const mixRoutes = (sound as { routes?: { target: string; targetInput?: number; gain: number }[] }).routes;
  if (sound.kind !== 'ym2151' && mixRoutes) {
    Object.assign(sound, {
      routes: mixRoutes.map(route => route.targetInput !== undefined && stereoTargets.has(route.target)
        ? { ...route, gain: route.gain / 2 }
        : route),
    });
  }
  if (sound.kind === 'ay8910') {
    const netlistDevice = devices.find(device => device.props.type === 'NETLIST_SOUND');
    const routeGain = netlistDevice
      ? lowerAudioRoutes(graph, [{ id: netlistDevice.id, tag: String(netlistDevice.props.tag) }])[0]?.gain ?? 1
      : 1;
    const netlist = lowerNetlistSound(graph, devices, opts.mameSrc, routeGain);
    if (netlist.error) throw new Error(`${opts.game ?? graph.meta.driverFile}: ${netlist.error}`);
    if (netlist.plan) Object.assign(sound, { netlist: netlist.plan });
  }
  if (sound.kind !== 'none') {
    Object.assign(sound, {
      speakerFilter: compileMameSpeakerFilter(opts.mameSrc),
    });
  }
  return { clocks, sound, nesApu };
}
