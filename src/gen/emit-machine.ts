import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { KGNode, KnowledgeGraph } from '../kg/types.ts';
import type {
  BoardIr,
  BoardSourceRef,
  GeneratedAddressMap,
  GeneratedAudioRoute,
  GeneratedCallback,
  GeneratedDevice,
  GeneratedExecutionPlan,
  GeneratedExpression,
  GeneratedHandler,
  GeneratedHandlerOperation,
  GeneratedVideoPlan,
} from '../ir/board.ts';
import { generatedBoardHandlersSource } from './emit-handler-codegen.ts';

/** MAME device input clocks converted to the instruction-cycle scheduler rate. */
export function generatedCpuCycleClock(type: string | undefined, clock: number): number {
  if (type === 'i8085a') return clock / 2;
  if (
    type === 'konami' || type === 'mc6809' || type === 'm6801u4' || type === 'm6802' ||
    type === 'm6803' || type === 'm6808' || type === 'nsc8105' ||
    // The whole m6800/m6801/hd6301 line divides its input clock by 4
    // (m6800.h/m6801.h execute_cycles_to_clocks); only the external-E-clock
    // variants (m6803e, mc6809e-style) run 1:1 and stay off this list.
    type === 'hd63701y0'
  ) return clock / 4;
  // MCS-48 divides by 15 (mcs48.h execute_cycles_to_clocks); m58715 is a
  // plain mcs48_cpu_device, only i8021/i8022 use the /30 variant.
  if (
    type === 'i8035' || type === 'i8039' || type === 'mb8884' || type === 'm58715'
  ) return clock / 15;
  return clock;
}
import type {
  GeneratedAuxiliaryAudioDevice,
  GeneratedDiscreteDacPlan,
  GeneratedDiscreteEffectsPlan,
  GeneratedNesApuPlan,
} from '../ir/audio-protocol.ts';
import { BoardIrError } from '../ir/decode.ts';
import { lowerConnections } from '../ir/lower-connections.ts';
import { validateBoardIr } from '../ir/validate.ts';
import { BOARD_IR_SCHEMA_VERSION } from '../ir/version.ts';
import type { BoardConfig } from '../runtime/types.ts';
import { compileMameHandler } from '../mame/handler-ir.ts';
import { normalizeMameExecutionSource } from '../mame/cpu-compiler.ts';

export function lowerGeneratedMachine(
  graph: KnowledgeGraph,
  game: string,
  family: string,
  board: BoardConfig,
  compiledVideo?: { plan: GeneratedVideoPlan; handlers: GeneratedHandler[] },
  nesApu?: GeneratedNesApuPlan,
  discretePlan?: GeneratedDiscreteDacPlan | GeneratedDiscreteEffectsPlan,
): BoardIr {
  const byId = new Map(graph.nodes.map(node => [node.id, node]));
  // A full source graph can contain sibling machine configurations that the
  // selected game never calls. Walk only the selected config closure, carrying
  // the host device tag through nested device_add_mconfig calls so internal
  // tags retain MAME's `host:child` namespace.
  const rootMachineId = graph.edges.find(edge =>
    edge.from === `game:${game}` && edge.rel === 'USES_MACHINE')?.to;
  if (!rootMachineId) throw new Error(`${game}: selected machine config is missing`);
  const reachableDevices: Array<{ node: KGNode; tag: string; hostTag?: string }> = [];
  const emittedTags = new Map<string, string>();
  const queue: Array<{ id: string; hostTag?: string }> = [{ id: rootMachineId }];
  const visitedConfigs = new Set<string>();
  const visitedDevices = new Set<string>();
  while (queue.length) {
    const current = queue.shift()!;
    const visitKey = `${current.id}\0${current.hostTag ?? ''}`;
    if (visitedConfigs.has(visitKey)) continue;
    visitedConfigs.add(visitKey);
    for (const edge of graph.edges.filter(candidate =>
      candidate.from === current.id && candidate.rel === 'HAS_DEVICE')) {
      const node = byId.get(edge.to);
      if (!node) continue;
      const rawTag = String(node.props.tag);
      const tag = current.hostTag && !rawTag.includes(':')
        ? `${current.hostTag}:${rawTag}`
        : rawTag;
      const deviceKey = `${node.id}\0${tag}`;
      if (!visitedDevices.has(deviceKey)) {
        visitedDevices.add(deviceKey);
        reachableDevices.push({ node, tag, ...(current.hostTag ? { hostTag: current.hostTag } : {}) });
        emittedTags.set(node.id, tag);
      }
      for (const call of graph.edges.filter(candidate =>
        candidate.from === node.id && candidate.rel === 'CALLS')) {
        queue.push({ id: call.to, hostTag: tag });
      }
    }
    for (const call of graph.edges.filter(candidate =>
      candidate.from === current.id && candidate.rel === 'CALLS')) {
      queue.push({ id: call.to, ...(current.hostTag ? { hostTag: current.hostTag } : {}) });
    }
  }
  const emittedDeviceTag = (deviceId: string, rawTag: string): string =>
    emittedTags.get(deviceId) ?? rawTag;
  const reachableConfigIds = new Set(
    [...visitedConfigs].map(key => key.slice(0, key.indexOf('\0'))),
  );
  const reachableConfigHosts = new Map<string, Set<string>>();
  for (const key of visitedConfigs) {
    const separator = key.indexOf('\0');
    const id = key.slice(0, separator);
    const host = key.slice(separator + 1);
    if (host) (reachableConfigHosts.get(id) ??
      reachableConfigHosts.set(id, new Set()).get(id)!).add(host);
  }
  const resolveReachableTag = (rawTag: string): string => {
    const tags = [...new Set(emittedTags.values())];
    if (tags.includes(rawTag)) return rawTag;
    const matches = tags.filter(tag => tag.endsWith(`:${rawTag}`));
    return matches.length === 1 ? matches[0]! : rawTag;
  };
  const reachableHandlerKey = (
    edge: KnowledgeGraph['edges'][number],
    handler: KnowledgeGraph['nodes'][number] | undefined,
  ): string => {
    const key = handlerKey(edge, handler);
    if (!edge.props?.deviceTag || !handler) return key;
    return `${resolveReachableTag(String(edge.props.deviceTag))}.${String(handler.props.method)}`;
  };
  const callbacks: GeneratedCallback[] = graph.nodes
    .filter(node => node.label === 'Callback')
    .filter(node => graph.edges.some(edge =>
      edge.rel === 'HAS_CALLBACK' &&
      edge.to === node.id &&
      (emittedTags.has(edge.from) || reachableConfigIds.has(edge.from))))
    .map(node => {
      const props = node.props;
      const ownerDevice = graph.edges.find(edge =>
        edge.rel === 'HAS_CALLBACK' && edge.to === node.id);
      const rawOwnerTag = String(props.ownerTag);
      const configHosts = ownerDevice
        ? [...(reachableConfigHosts.get(ownerDevice.from) ?? [])]
        : [];
      const configScopedOwner = configHosts.length === 1 && !rawOwnerTag.includes(':')
        ? `${configHosts[0]}:${rawOwnerTag}`
        : undefined;
      const callback: GeneratedCallback = {
        id: node.id,
        ownerTag: ownerDevice && emittedTags.has(ownerDevice.from)
          ? emittedDeviceTag(ownerDevice.from, rawOwnerTag)
          : configScopedOwner && [...emittedTags.values()].includes(configScopedOwner)
            ? configScopedOwner
            : resolveReachableTag(rawOwnerTag),
        signal: String(props.signal),
        operation: String(props.operation),
      };
      if (props.slot !== undefined && Number.isFinite(Number(props.slot))) {
        callback.slot = Number(props.slot);
      }
      if (props.targetTag) {
        const targetDevice = graph.edges.find(edge =>
          edge.from === node.id && edge.rel === 'TARGETS_DEVICE' && emittedTags.has(edge.to));
        callback.targetTag = targetDevice
          ? emittedTags.get(targetDevice.to)!
          : resolveReachableTag(String(props.targetTag));
      }
      if (props.targetClass) callback.targetClass = String(props.targetClass);
      if (props.targetMethod) callback.targetMethod = String(props.targetMethod);
      if (props.targetPort) callback.targetPort = String(props.targetPort);
      if (props.inputLine) callback.inputLine = String(props.inputLine);
      const lineDelivery = /\b(HOLD|ASSERT|PULSE)_LINE\b/.exec(String(props.raw ?? ''))?.[1];
      if (lineDelivery) callback.delivery = lineDelivery.toLowerCase() as 'hold' | 'assert' | 'pulse';
      if (props.periodHz !== undefined) callback.periodHz = Number(props.periodHz);
      if (props.periodExpr) callback.periodExpr = String(props.periodExpr);
      if (Array.isArray(props.scanlines)) callback.scanlines = props.scanlines.map(Number);
      if (props.scanlineStart !== undefined) callback.scanlineStart = Number(props.scanlineStart);
      if (props.scanlineIncrement !== undefined) {
        callback.scanlineIncrement = Number(props.scanlineIncrement);
      }
      if (callback.signal === 'configure_scanline') {
        const handlerEdge = graph.edges.find(edge =>
          edge.from === node.id && edge.rel === 'CALLS_HANDLER');
        const handler = handlerEdge && graph.nodes.find(candidate => candidate.id === handlerEdge.to);
        const body = String(handler?.props.sourceBody ?? '');
        const gate = /\b(?:const\s+)?(?:u?int8_t|u8)\s+(\w+)\s*=\s*(m_\w+)\s*\[\s*\w+\s*&\s*(0x[\da-f]+|\d+)\s*\]/i.exec(body);
        if (gate) {
          const guarded = [...body.matchAll(new RegExp(
            `\\bif\\s*\\(\\s*${gate[1]}\\s*&`,
            'g',
          ))].length;
          const lineWrites = [...body.matchAll(/\bset_input_line(?:_and_vector)?\s*\(/g)].length;
          if (guarded > 0 && guarded === lineWrites) {
            callback.promGate = { member: gate[2]!, mask: Number(gate[3]) };
          }
        }
      }
      if (Array.isArray(props.transforms)) callback.transforms = props.transforms.map(String);
      if (props.sourceFile && props.sourceLine) {
        callback.source = {
          file: String(props.sourceFile),
          line: Number(props.sourceLine),
          ...(props.sourceColumn ? { column: Number(props.sourceColumn) } : {}),
        };
      }
      return callback;
    });
  const sourceRef = (props: Record<string, unknown>): BoardSourceRef | undefined =>
    props.sourceFile && props.sourceLine
      ? {
          file: String(props.sourceFile),
          line: Number(props.sourceLine),
          ...(props.sourceColumn ? { column: Number(props.sourceColumn) } : {}),
        }
      : undefined;
  const devices: GeneratedDevice[] = reachableDevices
    .map(({ node, tag, hostTag }) => ({
      id: node.id,
      tag,
      type: String(node.props.type),
      ...(hostTag ? { hostTag } : {}),
      ...(deviceMember(node.props) ? { member: deviceMember(node.props) } : {}),
      ...(typeof node.props.clock === 'number' ? { clock: node.props.clock } : {}),
      ...(deviceCallbackHz(node.props) ? { callbackHz: deviceCallbackHz(node.props) } : {}),
      ...(deviceConfiguration(node.props).length
        ? { configuration: deviceConfiguration(node.props) }
        : {}),
      ...(typeof node.props.slotOptions === 'string'
        ? { slotOptions: node.props.slotOptions }
        : {}),
      ...(typeof node.props.slotDefault === 'string'
        ? { slotDefault: node.props.slotDefault }
        : {}),
      ...(sourceRef(node.props) ? { source: sourceRef(node.props) } : {}),
    }));
  const handlers: GeneratedHandler[] = graph.nodes
    .filter(node => node.label === 'Handler')
    .map(node => {
      const hasSourceBody = typeof node.props.sourceBody === 'string';
      const constants = Object.fromEntries(
        (Array.isArray(node.props.sourceConstants) ? node.props.sourceConstants : [])
          .map(entry => /^([^=]+)=(-?(?:\d+(?:\.\d+)?|Infinity))$/.exec(String(entry)))
          .filter((match): match is RegExpExecArray => Boolean(match))
          .map(match => [match[1], Number(match[2])]),
      );
      return {
        id: node.id,
        ownerClass: String(node.props.ownerClass),
        method: String(node.props.method),
        ...(node.props.sourceParameters ? { parameters: String(node.props.sourceParameters) } : {}),
        ...(hasSourceBody ? { body: String(node.props.sourceBody) } : {}),
        ...(Object.keys(constants).length ? { constants } : {}),
        ...(hasSourceBody ? {
          program: compileMameHandler(normalizeMameExecutionSource(String(node.props.sourceBody))),
        } : {}),
        ...(sourceRef(node.props) ? { source: sourceRef(node.props) } : {}),
      };
    });
  for (const handler of compiledVideo?.handlers ?? []) {
    const existing = handlers.find(candidate =>
      candidate.ownerClass === handler.ownerClass && candidate.method === handler.method);
    if (existing) Object.assign(existing, handler);
    else handlers.push(handler);
  }
  const maps: GeneratedAddressMap[] = graph.nodes
    .filter(node => node.label === 'AddressMap')
    .map(node => ({
      id: node.id,
      className: String(node.props.cls),
      name: String(node.props.name),
      ranges: graph.edges
        .filter(edge => edge.from === node.id && edge.rel === 'HAS_RANGE')
        .map(edge => byId.get(edge.to))
        .filter(range => range?.label === 'AddressRange')
        .map(range => {
          const read = graph.edges.find(edge => edge.from === range!.id && edge.rel === 'READS');
          const write = graph.edges.find(edge => edge.from === range!.id && edge.rel === 'WRITES');
          return {
            id: range!.id,
            start: Number(range!.props.start),
            end: Number(range!.props.end),
            raw: String(range!.props.raw),
            ...(read ? { read: reachableHandlerKey(read, byId.get(read.to)) } : {}),
            ...(write ? { write: reachableHandlerKey(write, byId.get(write.to)) } : {}),
            props: range!.props,
            ...(sourceRef(range!.props) ? { source: sourceRef(range!.props) } : {}),
          };
        }),
      ...(sourceRef(node.props) ? { source: sourceRef(node.props) } : {}),
    }));
  const deviceByTag = new Map(devices.map(device => [device.tag, device]));
  const videoOutputDevice = devices.find(device => device.type === 'SCREEN')
    ?? devices.find(device => device.type === 'VECTOR');
  const screenCallback = callbacks.find(callback => callback.signal === 'set_screen_update');
  const screenHandler = screenCallback?.targetClass && screenCallback.targetMethod
    ? handlers.find(handler =>
        handler.ownerClass === screenCallback.targetClass &&
        handler.method === screenCallback.targetMethod)
    : undefined;
  const inputMembers = new Map<string, string[]>();
  for (const node of graph.nodes.filter(candidate => candidate.label === 'Handler')) {
    for (const encoded of Array.isArray(node.props.inputMembers)
      ? node.props.inputMembers.map(String)
      : []) {
      const separator = encoded.indexOf('=');
      if (separator < 1) continue;
      inputMembers.set(
        encoded.slice(0, separator),
        encoded.slice(separator + 1).split(',').filter(Boolean)
          .map(tag => resolveInputPortTag(graph, tag)),
      );
    }
  }
  const selectedMachineId = graph.edges.find(edge =>
    edge.from === `game:${game}` && edge.rel === 'USES_MACHINE')?.to;
  const selectedMachine = selectedMachineId
    ? byId.get(selectedMachineId)
    : undefined;
  const resetHandlers = Array.isArray(selectedMachine?.props.resetHandlers)
    ? selectedMachine.props.resetHandlers.map(String)
    : [];
  const startHandlers = Array.isArray(selectedMachine?.props.startHandlers)
    ? selectedMachine.props.startHandlers.map(String)
    : [];
  const shareBindings = lowerShareBindings(graph);
  const execution: GeneratedExecutionPlan = {
    cpus: board.cpus.map(cpu => {
      const interruptVectorWriters = inferInterruptVectorWriters(
        cpu.tag,
        cpu.io?.ranges ?? [],
        callbacks,
        handlers,
      );
      const interruptMixer = deviceByTag.get(cpu.tag)?.configuration?.find(
        configuration => configuration.method === 'set_interrupt_mixer',
      )?.args[0];
      const cpuDeviceId = deviceByTag.get(cpu.tag)?.id;
      const cpuSpaceMapId = graph.edges.find(edge =>
        edge.from === cpuDeviceId &&
        edge.rel === 'HAS_MAP' &&
        String(edge.props?.space ?? '').includes('AS_CPU_SPACE'),
      )?.to;
      const interruptAcknowledge = maps.find(map => map.id === cpuSpaceMapId)
        ?.ranges.find(range => range.read)?.read;
      return {
        ...cpu,
        ...(nesApu && cpu.type?.toLowerCase() === 'rp2a03'
          ? { ranges: mergeInternalRanges(cpu.ranges ?? [], nesApu) }
          : {}),
        ...(cpu.mask === undefined && ['m68000', 'm68010'].includes(cpu.type?.toLowerCase() ?? '')
          ? { mask: 0xffffff }
          : {}),
        ...(cpu.mask === undefined && ['i8088', 'v30'].includes(cpu.type?.toLowerCase() ?? '')
          ? { mask: 0xfffff }
          : {}),
        cycleClock: generatedCpuCycleClock(cpu.type, cpu.clock),
        ...(interruptMixer !== undefined
          ? { interruptMixer: Boolean(interruptMixer) }
          : {}),
        ...(interruptAcknowledge ? { interruptAcknowledge } : {}),
        ...(interruptVectorWriters.length ? { interruptVectorWriters } : {}),
        ...(deviceByTag.get(cpu.tag)?.source ? { source: deviceByTag.get(cpu.tag)!.source } : {}),
      };
    }),
    ...(board.initialShares?.length ? { initialShares: board.initialShares } : {}),
    ...(shareBindings.length ? { shareBindings } : {}),
    ...(startHandlers.length ? { startHandlers } : {}),
    ...(resetHandlers.length ? { resetHandlers } : {}),
    ...(graph.nodes.some(node => node.label === 'MemoryBank') ? {
      banks: lowerMemoryBanks(graph, sourceRef),
    } : {}),
    screen: {
      ...board.screen,
      // Neo Geo's LSPC sprite-line timer requests one partial update per
      // scanline, and both sprite/fixed renderers intentionally draw only the
      // clip's first line. Timer-allocated callbacks are not frame events yet,
      // so schedule that same one-line cadence directly; a frame-end partial
      // call would render only the first visible line.
      ...(family === 'neogeo' ? { updateMode: 'scanline' as const } : {}),
      // The device that carries the picture: SCREEN for a raster or LCD
      // panel, VECTOR for a beam display.
      ...(videoOutputDevice?.source ? { source: videoOutputDevice.source } : {}),
    },
    ...(board.customs?.length ? { customs: board.customs } : {}),
    ...(inputMembers.size ? {
      inputMembers: [...inputMembers].map(([member, tags]) => ({ member, tags })),
    } : {}),
    ...(board.inputLatches?.length ? { inputLatches: board.inputLatches } : {}),
    frameEvents: lowerFrameEvents(
      callbacks,
      devices,
      handlers,
      board.screen.refresh,
      board.screen.vtotal,
      board.screen.vbstart,
      board.screen.vbend ?? 0,
    ),
    ...(screenCallback?.targetClass && screenCallback.targetMethod ? {
      screenUpdate: {
        handler: `${screenCallback.targetClass}.${screenCallback.targetMethod}`,
        ...((screenHandler?.source ?? screenCallback.source)
          ? { source: screenHandler?.source ?? screenCallback.source }
          : {}),
      },
    } : {}),
  };
  const soundDevice = devices.find(device =>
    device.type === 'NAMCO_WSG' || device.type === 'POLEPOS_WSG');
  const nesCpu = nesApu && devices.find(device =>
    device.type === 'RP2A03' || device.type === 'RP2A03G');
  const ayDevices = devices.filter(device =>
    ['AY8910', 'AY8912', 'YM2149'].includes(device.type));
  const ymDevices = devices.filter(device =>
    device.type === 'YM2203' || device.type === 'YM2610');
  const opmDevices = devices.filter(device => device.type === 'YM2151');
  const oplDevices = devices.filter(device => device.type === 'YM3526');
  const snDevices = devices.filter(device =>
    ['SN76496', 'SN76489', 'SN76489A', 'SN76494', 'SN94624', 'NCR8496', 'PSSJ3',
      'GAMEGEAR', 'SEGAPSG'].includes(device.type));
  const dacDevices = devices.filter(device =>
    ['DAC_1BIT', 'DAC_4BIT_R2R', 'DAC_8BIT_R2R', 'MC1408', 'AD7533',
      'NETLIST_INT_INPUT'].includes(device.type));
  const sampleDevices = devices.filter(device => device.type === 'SAMPLES');
  const berzerkSound = devices.find(device =>
    device.type === 'EXIDY' || device.type === 'EXIDY_VENTURE');
  const discreteDevice = devices.find(device => device.type === 'DISCRETE');
  const mappedWriteKeys = maps.flatMap(map => map.ranges)
    .map(range => range.write)
    .filter((key): key is string => Boolean(key));
  const generatedSoundboard = ayDevices.length
    ? undefined
    : devices.find(device =>
        (device.type.endsWith('_AUDIO') || device.type.endsWith('_SOUND')) &&
        mappedWriteKeys.some(key => key.startsWith(`${device.tag}.`)));
  const audioRoutes = lowerAudioRoutes(graph, ayDevices);
  const filterRank = inferredMemberIndexRank(handlers, 'm_filter');
  const auxiliaryDevices = lowerAuxiliaryAudioDevices(graph, devices);
  const sound = nesCpu
    ? {
        kind: 'nes',
        deviceTag: 'nesapu',
        deviceType: nesApu.type,
        writeMethods: [nesApu.writeMethod],
        enableMethods: [],
        controlOffset: -1,
        nesApu,
      }
    : soundDevice
    ? {
        kind: 'wsg',
        deviceTag: soundDevice.tag,
        deviceType: soundDevice.type,
        writeMethods: [...new Set(maps.flatMap(map => map.ranges)
          .map(range => range.write)
          .filter((key): key is string => Boolean(key?.startsWith(`${soundDevice.tag}.`)))
          .map(key => key.slice(soundDevice.tag.length + 1)))],
        enableMethods: [...new Set(callbacks
          .filter(callback => callback.targetTag === soundDevice.tag && callback.targetMethod)
          .map(callback => callback.targetMethod!))],
        controlOffset: -1,
        ...(auxiliaryDevices.length ? { auxiliaryDevices } : {}),
      }
    : opmDevices.length
      ? {
          kind: 'ym2151',
          deviceTag: opmDevices[0]!.tag,
          deviceTags: opmDevices.map(device => device.tag),
          deviceType: 'YM2151',
          writeMethods: ['write'],
          enableMethods: [],
          controlOffset: -1,
          ...(lowerAudioRoutes(graph, opmDevices).length
            ? { routes: lowerAudioRoutes(graph, opmDevices) }
            : {}),
          ...(auxiliaryDevices.length ? { auxiliaryDevices } : {}),
        }
    : ymDevices.length || oplDevices.length
      ? {
          kind: 'ym2203',
          deviceTag: (ymDevices[0] ?? oplDevices[0])!.tag,
          deviceTags: ymDevices.map(device => device.tag),
          deviceType: ymDevices.length ? ymDevices[0]!.type : 'YM3526',
          // ym2203_device maps a two-byte address/data port pair.
          writeMethods: ymDevices.length ? ['write'] : [],
          enableMethods: [],
          controlOffset: -1,
          ...(lowerAudioRoutes(graph, ymDevices).length
            ? { routes: lowerAudioRoutes(graph, ymDevices) }
            : {}),
          ...(auxiliaryDevices.length ? { auxiliaryDevices } : {}),
        }
    : ayDevices.length
      ? {
          kind: 'ay8910',
          deviceTag: ayDevices[0]!.tag,
          deviceTags: ayDevices.map(device => device.tag),
          deviceType: 'AY8910',
          writeMethods: ['address_w', 'data_w'],
          enableMethods: [],
          controlOffset: -1,
          ...(audioRoutes.length ? { routes: audioRoutes } : {}),
          ...(audioRoutes.some(route => route.filter) && filterRank ? {
            filterLayout: filterRank === 1 ? 'flat' as const : 'matrix' as const,
          } : {}),
          ...(auxiliaryDevices.length ? { auxiliaryDevices } : {}),
        }
    : snDevices.length
      ? {
          kind: 'sn76489',
          deviceTag: snDevices[0]!.tag,
          deviceTags: snDevices.map(device => device.tag),
          deviceType: snDevices[0]!.type,
          writeMethods: ['write'],
          enableMethods: [],
          controlOffset: -1,
          ...(lowerAudioRoutes(graph, snDevices).length
            ? { routes: lowerAudioRoutes(graph, snDevices) }
            : {}),
          ...(auxiliaryDevices.length ? { auxiliaryDevices } : {}),
        }
    : dacDevices.length && !(sampleDevices.length && dacDevices.every(device =>
        device.type === 'DAC_1BIT'))
      ? {
          kind: 'dac',
          deviceTag: dacDevices[0]!.tag,
          deviceTags: dacDevices.map(device => device.tag),
          deviceType: dacDevices[0]!.type,
          writeMethods: ['data_w', 'write'],
          enableMethods: [],
          controlOffset: -1,
          ...(lowerAudioRoutes(graph, dacDevices).length
            ? { routes: lowerAudioRoutes(graph, dacDevices) }
            : {}),
          ...(auxiliaryDevices.length ? { auxiliaryDevices } : {}),
        }
    : berzerkSound
      ? {
          kind: berzerkSound.type === 'EXIDY_VENTURE' ? 'exidy' : 'berzerk',
          deviceTag: berzerkSound.tag,
          deviceType: berzerkSound.type,
          writeMethods: berzerkSound.type === 'EXIDY_VENTURE'
            ? ['sh8253_w', 'sh6840_w', 'sfxctrl_w']
            : ['sh6840_w', 'sfxctrl_w'],
          enableMethods: [],
          controlOffset: -1,
        }
    : sampleDevices.length
      ? {
          kind: 'samples',
          deviceTag: sampleDevices[0]!.tag,
          deviceTags: sampleDevices.map(device => device.tag),
          deviceType: 'SAMPLES',
          writeMethods: ['start', 'stop', 'set_volume'],
          enableMethods: [],
          controlOffset: -1,
        }
    : generatedSoundboard
      ? (() => {
          const writeMethods = [...new Set(maps.flatMap(map => map.ranges)
            .map(range => range.write)
            .filter((key): key is string => Boolean(key?.startsWith(`${generatedSoundboard.tag}.`)))
            .map(key => key.slice(generatedSoundboard.tag.length + 1)))].sort();
          return {
            kind: generatedSoundboard.type.toLowerCase().replace(/_(?:audio|sound)$/, ''),
            deviceTag: generatedSoundboard.tag,
            deviceType: generatedSoundboard.type,
            writeMethods,
            enableMethods: [],
            controlOffset: -1,
          };
        })()
      : discreteDevice
        ? {
            kind: 'discrete',
            deviceTag: discreteDevice.tag,
            deviceType: discreteDevice.type,
            writeMethods: ['write'],
            enableMethods: [],
            controlOffset: -1,
            ...(discretePlan?.inputNodes ? { writeOffsets: discretePlan.inputNodes } : {}),
          }
        : undefined;
  // set_screen_update selects the renderer entry point; it is consumed by
  // GeneratedVideoRenderer and is not a devcb signal dispatched at runtime.
  const effectCallbacks = callbacks.filter(callback => callback.signal !== 'set_screen_update');
  const lowered = lowerConnections(effectCallbacks, {
    cpuTags: new Set(execution.cpus.map(cpu => cpu.tag)),
    deviceTags: new Set(devices.map(device => device.tag)),
    handlerKeys: new Set(handlers.map(handler => `${handler.ownerClass}.${handler.method}`)),
    ...(sound
      ? {
          soundTag: sound.deviceTag,
          soundWriteMethods: new Set(sound.writeMethods),
          soundEnableMethods: new Set(sound.enableMethods),
          soundControlOffset: sound.controlOffset,
          auxiliaryAudio: new Map(
            ('auxiliaryDevices' in sound ? sound.auxiliaryDevices ?? [] : []).map(
              (device: GeneratedAuxiliaryAudioDevice) =>
                [device.deviceTag, new Set(device.writeMethods)] as const,
            ),
          ),
        }
      : {}),
  });
  if (lowered.unresolved.length) {
    throw new BoardIrError(game, lowered.unresolved.map(({ callback, reason }) => ({
      path: `callbacks[${callbacks.indexOf(callback)}]`,
      message:
        `${callback.ownerTag}.${callback.signal} cannot be lowered to a board effect: ${reason}. ` +
        'A recognised connection that reaches nothing must fail generation.',
      ...(callback.source ? { source: callback.source } : {}),
    })));
  }
  return {
    schemaVersion: BOARD_IR_SCHEMA_VERSION,
    game,
    family,
    driverFile: graph.meta.driverFile,
    callbacks,
    connections: lowered.connections,
    execution,
    devices,
    handlers,
    maps,
    ...(compiledVideo ? { video: compiledVideo.plan } : {}),
    ...(sound ? { sound } : {}),
  };
}

/** Resolve a composite device's local port tag against the generated machine. */
export function resolveInputPortTag(graph: KnowledgeGraph, rawTag: string): string {
  const tags = graph.nodes
    .filter(node => node.label === 'Port')
    .map(node => String(node.props.tag ?? node.props.name ?? ''))
    .filter(Boolean);
  if (tags.includes(rawTag)) return rawTag;
  const matches = [...new Set(tags.filter(tag => tag.endsWith(`:${rawTag}`)))];
  return matches.length === 1 ? matches[0]! : rawTag;
}

/**
 * Recover non-conventional required_shared_ptr names from the source handler
 * attached to a shared address range. Most shares use m_<tag>; boards such as
 * Spy Hunter deliberately bind m_spyhunt_alpharam to "spyhunt_alpha".
 */
export function lowerShareBindings(
  graph: KnowledgeGraph,
): NonNullable<GeneratedExecutionPlan['shareBindings']> {
  const byId = new Map(graph.nodes.map(node => [node.id, node]));
  const bindings = new Map<string, string>();
  const wordShares = new Set<string>();
  for (const range of graph.nodes.filter(node =>
    node.label === 'AddressRange' && typeof node.props.share === 'string')) {
    const share = String(range.props.share);
    for (const edge of graph.edges.filter(candidate =>
      candidate.from === range.id && ['READS', 'WRITES'].includes(candidate.rel))) {
      const handler = byId.get(edge.to);
      const body = String(handler?.props.sourceBody ?? '');
      if (
        body.includes('COMBINE_DATA') ||
        /\b(?:u16|uint16_t)\s+(?:data|mem_mask)\b/.test(
          String(handler?.props.sourceParameters ?? ''),
        )
      ) {
        wordShares.add(share);
      }
      const combinedMembers = [
        ...body.matchAll(/\bCOMBINE_DATA\s*\(\s*&\s*(m_\w+)\s*\[/g),
      ].map(match => match[1]!);
      const writtenMembers = new Set(combinedMembers.length
        ? combinedMembers
        : [...body.matchAll(/\b(m_\w+)\s*\[[^\]]+\]\s*(?:[|&^+\-]?=)/g)]
          .map(match => match[1]!));
      if (!writtenMembers.size) {
        const referenced = [...new Set(
          [...body.matchAll(/\b(m_\w+)\s*\[/g)].map(match => match[1]!),
        )];
        if (referenced.length === 1) writtenMembers.add(referenced[0]!);
      }
      for (const member of writtenMembers) {
        bindings.set(`${share}\0${member}`, share);
      }
    }
  }
  return [...bindings].map(([key, share]) => ({
    share,
    member: key.slice(key.indexOf('\0') + 1),
    ...(wordShares.has(share) ? { bits: 16 as const } : {}),
  }));
}

export function inferredMemberIndexRank(
  handlers: GeneratedHandler[],
  member: string,
): number {
  let maximum = 0;
  const visit = (value: unknown): void => {
    if (!value || typeof value !== 'object') return;
    const node = value as Record<string, unknown>;
    if (node.kind === 'index') {
      let rank = 0;
      let object: unknown = node;
      while (
        object &&
        typeof object === 'object' &&
        (object as Record<string, unknown>).kind === 'index'
      ) {
        rank++;
        object = (object as Record<string, unknown>).object;
      }
      if (
        object &&
        typeof object === 'object' &&
        (object as Record<string, unknown>).kind === 'identifier' &&
        (object as Record<string, unknown>).name === member
      ) {
        maximum = Math.max(maximum, rank);
      }
    }
    for (const child of Object.values(node)) visit(child);
  };
  for (const handler of handlers) visit(handler.program);
  return maximum;
}

/**
 * Collapse a bank's configure calls into one entry-indexed window list. MAME
 * banks may be configured by more than one call, so the entry table is the
 * faithful shape rather than a single base/stride pair.
 */
function lowerMemoryBanks(
  graph: KnowledgeGraph,
  sourceRef: (props: Record<string, unknown>) => BoardSourceRef | undefined,
): NonNullable<BoardIr['execution']['banks']> {
  const windows = graph.nodes.filter(node => node.label === 'MemoryBank');
  const byTag = new Map<string, typeof windows>();
  for (const node of windows) {
    const tag = String(node.props.tag);
    byTag.set(tag, [...(byTag.get(tag) ?? []), node]);
  }
  return [...byTag].map(([tag, nodes]) => {
    const entryOffsets: (number | null)[] = [];
    const entryMembers: (string | null)[] = [];
    const entryRegions: (string | null)[] = [];
    for (const node of nodes) {
      const startEntry = Number(node.props.startEntry);
      const entries = Number(node.props.entries);
      const offset = Number(node.props.offset);
      const stride = Number(node.props.stride);
      for (let index = 0; index < entries; index++) {
        entryOffsets[startEntry + index] = offset + index * stride;
        entryRegions[startEntry + index] = node.props.region
          ? String(node.props.region)
          : null;
        if (node.props.entryMember) {
          entryMembers[startEntry + index] = String(node.props.entryMember);
        }
      }
    }
    for (let index = 0; index < entryOffsets.length; index++) {
      entryOffsets[index] ??= null;
      entryMembers[index] ??= null;
      entryRegions[index] ??= null;
    }
    const first = nodes[0]!;
    return {
      tag,
      member: String(first.props.member),
      ...(first.props.region ? { region: String(first.props.region) } : {}),
      ...(new Set(entryRegions.filter(Boolean)).size > 1
        ? { entryRegions }
        : {}),
      ...(entryMembers.some(Boolean) ? { entryMembers } : {}),
      entryOffsets,
      ...(first.props.dynamicShift !== undefined
        ? { dynamicShift: Number(first.props.dynamicShift) }
        : {}),
      ...(sourceRef(first.props) ? { source: sourceRef(first.props)! } : {}),
    };
  });
}

export function lowerAudioRoutes(
  graph: KnowledgeGraph,
  devices: { id: string; tag: string }[],
): GeneratedAudioRoute[] {
  const byId = new Map(graph.nodes.map(node => [node.id, node]));
  const filters = new Map<string, number>();
  const routes: GeneratedAudioRoute[] = [];
  devices.forEach((device, chip) => {
    const sourceDevice = byId.get(device.id);
    const config = Array.isArray(sourceDevice?.props.config)
      ? sourceDevice.props.config.map(String).join('\n')
      : '';
    const singleOutput = config.includes('AY8910_SINGLE_OUTPUT');
    for (const edge of graph.edges.filter(candidate =>
      candidate.from === device.id && candidate.rel === 'HAS_AUDIO_ROUTE')) {
      const node = byId.get(edge.to);
      if (!node) continue;
      const gain = Number(node.props.gain);
      const target = String(node.props.target);
      const targetInput = Number(node.props.input);
      const rawOutput = String(node.props.output);
      const outputChannels = rawOutput === 'ALL_OUTPUTS'
        ? sourceDevice?.props.type === 'YM2203' || sourceDevice?.props.type === 'YM2610'
          ? [0, 1, 2, 3]
          : singleOutput
            ? [-1]
            : [0, 1, 2]
        : [singleOutput && Number(rawOutput) === 0 ? -1 : Number(rawOutput)];
      if (!Number.isFinite(gain)) continue;
      const match = /^filter\.(\d+)\.(\d+)$/.exec(target);
      let filter: GeneratedAudioRoute['filter'];
      if (match) {
        let index = filters.get(target);
        if (index === undefined) {
          index = filters.size;
          filters.set(target, index);
        }
        filter = {
          index,
          bank: Number(match[1]),
          channel: Number(match[2]),
        };
      }
      for (const channel of outputChannels) {
        if (!Number.isInteger(channel) || channel < -1) continue;
        routes.push({
          chip,
          channel,
          gain,
          target,
          ...(Number.isInteger(targetInput) ? { targetInput } : {}),
          ...(filter ? { filter } : {}),
        });
      }
    }
  });
  return routes;
}

const AUXILIARY_AUDIO_METHODS: Record<string, string[]> = {
  DAC_4BIT_R2R: ['data_w', 'write'],
  DAC_8BIT_R2R: ['data_w', 'write'],
  MSM5205: ['data_w', 'reset_w', 'playmode_w', 's1_w', 's2_w', 'vclk_w'],
  VLM5030: ['data_w', 'st', 'rst'],
  YM3526: ['write'],
  HC55516: ['digit_w', 'clock_w'],
  POLEPOS_SOUND: ['polepos_engine_sound_lsb_w', 'polepos_engine_sound_msb_w', 'clson_w'],
  OKIM6295: ['write', 'set_pin7'],
};

/**
 * Lower routed secondary sound devices independently of the game using them.
 * The method surface belongs to the generated hardware compiler capability;
 * tags, clocks, modes and routes remain facts from the machine graph.
 */
export function lowerAuxiliaryAudioDevices(
  graph: KnowledgeGraph,
  devices: {
    id: string;
    tag: string;
    type: string;
    member?: string;
    clock?: number;
  }[],
): GeneratedAuxiliaryAudioDevice[] {
  const byId = new Map(graph.nodes.map(node => [node.id, node]));
  return devices.flatMap(device => {
    const writeMethods = AUXILIARY_AUDIO_METHODS[device.type];
    const clock = Number.isFinite(device.clock)
      ? device.clock!
      : ['DAC_4BIT_R2R', 'DAC_8BIT_R2R', 'HC55516'].includes(device.type)
        ? 0
        : undefined;
    if (!writeMethods || clock === undefined) return [];
    const routeEdge = graph.edges.find(edge =>
      edge.from === device.id && edge.rel === 'HAS_AUDIO_ROUTE');
    const route = routeEdge ? byId.get(routeEdge.to) : undefined;
    if (!route) return [];
    const gain = Number(route.props.gain);
    if (!Number.isFinite(gain)) return [];
    const sourceDevice = byId.get(device.id);
    const config = Array.isArray(sourceDevice?.props.config)
      ? sourceDevice.props.config.map(String).join('\n')
      : '';
    const initialMode =
      /set_prescaler_selector\([^)]*::(\w+)\)/.exec(config)?.[1] ??
      (device.type === 'OKIM6295'
        ? /okim6295_device::(PIN7_(?:HIGH|LOW))/.exec(config)?.[1]
        : undefined);
    const targetInput = Number(route.props.input);
    const referenceDevice = devices.find(candidate => {
      if (candidate.type !== 'DISCRETE') return false;
      return graph.edges.some(edge => {
        if (edge.from !== candidate.id || edge.rel !== 'HAS_AUDIO_ROUTE') return false;
        const referenceRoute = byId.get(edge.to);
        return referenceRoute?.props.target === device.tag;
      });
    });
    return [{
      type: device.type,
      deviceTag: device.tag,
      ...(device.member ? { member: device.member } : {}),
      clock,
      ...(initialMode ? { initialMode } : {}),
      gain,
      target: String(route.props.target),
      ...(Number.isInteger(targetInput) ? { targetInput } : {}),
      writeMethods,
      ...(referenceDevice ? {
        referenceControl: {
          deviceTag: referenceDevice.tag,
          ...(referenceDevice.member ? { member: referenceDevice.member } : {}),
        },
      } : {}),
    }];
  });
}

function deviceMember(props: Record<string, unknown>): string | undefined {
  const config = Array.isArray(props.config) ? props.config.map(String).join('\n') : '';
  return /\(\s*config\s*,\s*(m_\w+(?:\[\d+\])?)/.exec(config)?.[1];
}

function deviceConfiguration(
  props: Record<string, unknown>,
): { method: string; args: number[] }[] {
  const encoded = Array.isArray(props.configCalls)
    ? props.configCalls.map(String)
    : [];
  const member = deviceMember(props);
  if (member && Array.isArray(props.config)) {
    const escaped = member.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const line of props.config.map(String)) {
      const match = new RegExp(`^${escaped}->(\\w+)\\((.*)\\)$`).exec(line.trim());
      if (match) encoded.push(`${match[1]}(${match[2]})`);
    }
  }
  return encoded.flatMap(value => {
    const match = /^(\w+)\((.*)\)$/.exec(value);
    if (!match) return [];
    const rawArgs = match[2]!.trim();
    const args = rawArgs ? rawArgs.split(',').map(argument => {
      const raw = argument.trim();
      if (raw === 'true') return 1;
      if (raw === 'false') return 0;
      return Number(raw);
    }) : [];
    return args.every(Number.isFinite) ? [{ method: match[1]!, args }] : [];
  }).filter((entry, index, all) => all.findIndex(candidate =>
    candidate.method === entry.method &&
    candidate.args.length === entry.args.length &&
    candidate.args.every((value, arg) => value === entry.args[arg])) === index);
}

function inferInterruptVectorWriters(
  cpuTag: string,
  ioRanges: BoardConfig['cpus'][number]['ranges'],
  callbacks: GeneratedCallback[],
  handlers: GeneratedHandler[],
): string[] {
  const acknowledge = callbacks.find(callback =>
    callback.ownerTag === cpuTag &&
    callback.signal === 'set_irq_acknowledge_callback' &&
    callback.targetClass &&
    callback.targetMethod);
  if (!acknowledge) return [];

  const reader = handlers.find(handler =>
    handler.ownerClass === acknowledge.targetClass &&
    handler.method === acknowledge.targetMethod);
  const members = returnedIdentifiers(reader?.program?.operations ?? []);
  if (!members.size) return [];

  const mappedWriters = new Set(
    (ioRanges ?? []).flatMap(range => range.write ? [range.write] : []),
  );
  return handlers.flatMap(writer => {
    const key = `${writer.ownerClass}.${writer.method}`;
    return writer.ownerClass === reader?.ownerClass &&
      mappedWriters.has(key) &&
      assignsAnyIdentifier(writer.program?.operations ?? [], members)
      ? [key]
      : [];
  });
}

function returnedIdentifiers(
  operations: GeneratedHandlerOperation[],
): Set<string> {
  const result = new Set<string>();
  visitOperations(operations, operation => {
    if (operation.op !== 'return' || !operation.value) return;
    const identifier = directIdentifier(operation.value);
    if (identifier) result.add(identifier);
  });
  return result;
}

function assignsAnyIdentifier(
  operations: GeneratedHandlerOperation[],
  names: Set<string>,
): boolean {
  let matched = false;
  visitOperations(operations, operation => {
    if (
      operation.op === 'assign' &&
      operation.target.kind === 'identifier' &&
      names.has(operation.target.name)
    ) {
      matched = true;
    }
  });
  return matched;
}

function directIdentifier(expression: GeneratedExpression): string | undefined {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'cast') return directIdentifier(expression.operand);
  return undefined;
}

function visitOperations(
  operations: GeneratedHandlerOperation[],
  visit: (operation: GeneratedHandlerOperation) => void,
): void {
  for (const operation of operations) {
    visit(operation);
    if (operation.op === 'if') {
      visitOperations(operation.then, visit);
      visitOperations(operation.else ?? [], visit);
    } else if (operation.op === 'for') {
      visitOperations(operation.initialize, visit);
      visitOperations(operation.iterate, visit);
      visitOperations(operation.body, visit);
    } else if (operation.op === 'while' || operation.op === 'do-while') {
      visitOperations(operation.body, visit);
    } else if (operation.op === 'switch') {
      for (const entry of operation.cases) visitOperations(entry.body, visit);
    }
  }
}

function lowerFrameEvents(
  callbacks: GeneratedCallback[],
  devices: GeneratedDevice[],
  handlers: GeneratedHandler[],
  refreshHz: number,
  vtotal: number,
  vbstart: number,
  vbend: number,
): GeneratedExecutionPlan['frameEvents'] {
  const events: GeneratedExecutionPlan['frameEvents'] = [];
  for (const callback of callbacks) {
    if (
      callback.signal === 'configure_scanline' &&
      callback.scanlineStart !== undefined &&
      callback.scanlineIncrement !== undefined &&
      callback.scanlineIncrement > 0
    ) {
      const target = callback.targetClass && callback.targetMethod
        ? handlers.find(handler =>
            handler.ownerClass === callback.targetClass &&
            handler.method === callback.targetMethod)
        : undefined;
      const sparseLines = callback.scanlines ??
        (target?.program ? generatedScanlineTriggers(target.program.operations) : undefined);
      for (
        let line = callback.scanlineStart;
        line < vtotal;
        line += callback.scanlineIncrement
      ) {
        if (sparseLines && !sparseLines.includes(line)) continue;
        events.push({
          callbackId: callback.id,
          ownerTag: callback.ownerTag,
          signal: callback.signal,
          line,
          // TIMER_DEVICE_CALLBACK_MEMBER receives the configured scanline as
          // its param. Callback effects carry one numeric value, so state is
          // the source parameter rather than a boolean for this signal.
          state: line,
          ...(callback.source ? { source: callback.source } : {}),
        });
      }
      continue;
    }
    // vck_legacy_callback shares vck_callback's timing: the MSM5205 clocks
    // itself at clock/prescaler and fires the driver's per-sample feeder.
    if (callback.signal === 'vck_callback' || callback.signal === 'vck_legacy_callback') {
      const frequency = devices.find(device => device.tag === callback.ownerTag)?.callbackHz;
      if (frequency) {
        events.push({
          callbackId: callback.id,
          ownerTag: callback.ownerTag,
          signal: callback.signal,
          line: 0,
          state: 1,
          frequency,
          ...(callback.source ? { source: callback.source } : {}),
        });
      }
      continue;
    }
    if (callback.signal === 'screen_vblank' || callback.signal === 'set_vblank_int') {
      events.push({
        callbackId: callback.id,
        ownerTag: callback.ownerTag,
        signal: callback.signal,
        line: vbstart,
        state: 1,
        ...(callback.source ? { source: callback.source } : {}),
      });
      // MAME screen_vblank delegates see both edges; the falling edge lands
      // at vblank end (handlers like galaga's starfield config run on !state).
      if (
        callback.signal === 'screen_vblank' &&
        !(callback.operation === 'set_inputline' && callback.delivery)
      ) {
        events.push({
          callbackId: callback.id,
          ownerTag: callback.ownerTag,
          signal: callback.signal,
          line: vbend,
          state: 0,
          ...(callback.source ? { source: callback.source } : {}),
        });
      }
      continue;
    }
    if (callback.signal !== 'set_periodic_int' || !callback.periodHz) continue;
    const eventsPerFrame = callback.periodHz / refreshHz;
    const count = Math.round(eventsPerFrame);
    if (count <= 0 || Math.abs(eventsPerFrame - count) > 0.1) {
      // Free-running oscillators are not generally integer multiples of the
      // video refresh. Preserve their frequency and let the frame runner's
      // fractional carry place each edge on the correct scanline instead of
      // silently dropping the interrupt (Taito SJ: 36.621 Hz vs 59.186 Hz).
      events.push({
        callbackId: callback.id,
        ownerTag: callback.ownerTag,
        signal: callback.signal,
        line: 0,
        state: 1,
        frequency: callback.periodHz,
        ...(callback.source ? { source: callback.source } : {}),
      });
      continue;
    }
    for (let index = 0; index < count; index++) {
      events.push({
        callbackId: callback.id,
        ownerTag: callback.ownerTag,
        signal: callback.signal,
        line: Math.floor(index * vtotal / count),
        state: 1,
        ...(callback.source ? { source: callback.source } : {}),
      });
    }
  }
  for (const callback of callbacks.filter(candidate =>
    candidate.signal === 'timer' && candidate.scanlines?.length)) {
    for (const line of callback.scanlines ?? []) {
      events.push({
        callbackId: callback.id,
        ownerTag: callback.ownerTag,
        signal: callback.signal,
        line,
        state: 1,
        ...(callback.source ? { source: callback.source } : {}),
      });
    }
  }
  return events.sort((a, b) => a.line - b.line || a.callbackId.localeCompare(b.callbackId));
}

/**
 * Prove that a scanline callback has no work outside a finite set of literal
 * lines. Every non-declaration top-level operation must be an if whose
 * condition constrains the scanline alias on all OR branches. If the proof is
 * incomplete we return undefined and retain the source timer's full cadence.
 */
export function generatedScanlineTriggers(
  operations: GeneratedHandlerOperation[],
): number[] | undefined {
  const alias = operations.find(operation =>
    operation.op === 'declare' &&
    operation.value?.kind === 'identifier' &&
    ['param', 'scanline'].includes(operation.value.name));
  const name = alias?.op === 'declare' ? alias.name : 'scanline';
  const triggers = new Set<number>();
  for (const operation of operations) {
    if (operation.op === 'declare') continue;
    if (operation.op !== 'if') return undefined;
    const values = scanlineConditionValues(operation.condition, name);
    if (!values?.size) return undefined;
    values.forEach(value => triggers.add(value));
  }
  return triggers.size ? [...triggers].sort((left, right) => left - right) : undefined;
}

function scanlineConditionValues(
  expression: GeneratedExpression,
  name: string,
): Set<number> | undefined {
  if (expression.kind !== 'binary') return undefined;
  if (expression.operator === '==') {
    if (expression.left.kind === 'identifier' && expression.left.name === name &&
        expression.right.kind === 'number') return new Set([expression.right.value]);
    if (expression.right.kind === 'identifier' && expression.right.name === name &&
        expression.left.kind === 'number') return new Set([expression.left.value]);
    return undefined;
  }
  const left = scanlineConditionValues(expression.left, name);
  const right = scanlineConditionValues(expression.right, name);
  if (expression.operator === '&&') {
    if (!left) return right;
    if (!right) return left;
    const intersection = new Set([...left].filter(value => right.has(value)));
    return intersection.size ? intersection : undefined;
  }
  if (expression.operator === '||' && left && right) {
    return new Set([...left, ...right]);
  }
  return undefined;
}

function deviceCallbackHz(props: Record<string, unknown>): number | undefined {
  if (props.type !== 'MSM5205' || typeof props.clock !== 'number') return undefined;
  const config = Array.isArray(props.config) ? props.config.map(String).join('\n') : '';
  const divisor = /set_prescaler_selector\([^)]*::S(\d+)_/.exec(config)?.[1];
  return divisor ? props.clock / Number(divisor) : undefined;
}

export function generatedBoardSource(machine: BoardIr): string {
  const runtimeImport = '../../../../runtime/core';
  const irImport = '../../../../runtime/ir';
  const compiled = generatedBoardHandlersSource(machine, true);
  // Behaviour, so it is emitted as source here rather than into board.json,
  // and attached after decoding rather than being part of the decoded shape.
  const attachment = compiled.handlers.length
    ? `
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = ${compiled.source} as Record<string, GeneratedCompiledHandler>;
`
    : '';
  const compiledImport = compiled.handlers.length
    ? `import type { GeneratedCompiledHandler } from '${irImport}/board.js';\n`
    : '';
  return `// GENERATED executable machine composition from ${machine.driverFile}; do not edit.
import { decodeBoardIr } from '${irImport}/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '${runtimeImport}/types.js';
${compiledImport}import { createGeneratedBoard } from '${runtimeImport}/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, '${machine.game}');
${attachment}export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
`;
}

function handlerKey(
  edge: KnowledgeGraph['edges'][number],
  handler: KnowledgeGraph['nodes'][number] | undefined,
): string {
  if (!handler) return edge.to.replace(/^handler:/, '');
  const owner = edge.props?.deviceTag ?? handler.props.ownerClass;
  return `${owner}.${handler.props.method}`;
}

export function emitGeneratedMachine(
  graph: KnowledgeGraph,
  game: string,
  family: string,
  outDir: string,
  board: BoardConfig,
  compiledVideo?: { plan: GeneratedVideoPlan; handlers: GeneratedHandler[] },
  nesApu?: GeneratedNesApuPlan,
  discretePlan?: GeneratedDiscreteDacPlan | GeneratedDiscreteEffectsPlan,
): BoardIr {
  const machine = lowerGeneratedMachine(
    graph,
    game,
    family,
    board,
    compiledVideo,
    nesApu,
    discretePlan,
  );
  const generatedDir = join(outDir, 'generated');
  rmSync(generatedDir, { recursive: true, force: true });
  mkdirSync(generatedDir, { recursive: true });
  // Validate before emitting: a board that cannot be wired must fail while the
  // compiler still knows which MAME line to blame.
  const diagnostics = validateBoardIr(machine);
  if (diagnostics.length) throw new BoardIrError(game, diagnostics);
  writeFileSync(join(generatedDir, 'board.ts'), generatedBoardSource(machine));
  writeFileSync(join(generatedDir, 'board.json'), JSON.stringify(machine, null, 2));
  writeFileSync(
    join(generatedDir, 'provenance.json'),
    JSON.stringify(collectProvenance(machine), null, 2),
  );
  return machine;
}

function mergeInternalRanges(
  ranges: NonNullable<BoardConfig['cpus'][number]['ranges']>,
  plan: GeneratedNesApuPlan,
): NonNullable<BoardConfig['cpus'][number]['ranges']> {
  const merged = ranges.map(range => ({ ...range }));
  for (const internal of plan.internalMap.ranges) {
    const existing = merged.find(range =>
      range.start === internal.start && range.end === internal.end);
    if (existing) {
      if (internal.read) existing.read = internal.read;
      if (internal.write) existing.write = internal.write;
      existing.kind = 'handler';
      continue;
    }
    merged.push({
      start: internal.start,
      end: internal.end,
      kind: 'handler',
      ...(internal.read ? { read: internal.read } : {}),
      ...(internal.write ? { write: internal.write } : {}),
    });
  }
  return merged.sort((left, right) => left.start - right.start || left.end - right.end);
}

function collectProvenance(machine: BoardIr): {
  generatedFrom: string;
  entries: { path: string; file: string; line: number; column?: number }[];
} {
  const entries: { path: string; file: string; line: number; column?: number }[] = [];
  const visit = (value: unknown, path: string): void => {
    if (!value || typeof value !== 'object') return;
    if (
      'file' in value &&
      'line' in value &&
      typeof value.file === 'string' &&
      typeof value.line === 'number'
    ) {
      entries.push({
        path,
        file: value.file,
        line: value.line,
        ...(('column' in value && typeof value.column === 'number')
          ? { column: value.column }
          : {}),
      });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}/${index}`));
      return;
    }
    for (const [key, item] of Object.entries(value)) visit(item, `${path}/${key}`);
  };
  visit(machine, '');
  return { generatedFrom: machine.driverFile, entries };
}
