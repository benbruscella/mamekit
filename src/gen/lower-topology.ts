

import type { KGNode } from '../kg/types.ts';

import { gameClassConstants, resolveClassConstants } from './class-constants.ts';

import { generatedCpuAddressUnitBytes } from '../runtime/generated-board-shape.ts';

import { gameCategory, gameDataPath } from './output-layout.ts';

import type { GenerateOptions } from './generate.ts';

import { Graph } from '../kg/query.ts';

/**
 * A device's tag as MAME composes it. Inside a composite device's machine
 * config every tag is relative to that device unless it starts at the root:
 * the 1541 names its drive mechanism `uc4:0:525ssqd`, the connector's option
 * under the gate array, and MAME's tag for it is `iec8:c1541:uc4:0:525ssqd`.
 */
export function hostedDeviceTag(hostTag: string | undefined, rawTag: string): string {
  if (!hostTag || rawTag.startsWith(':') || rawTag.startsWith(`${hostTag}:`)) return rawTag;
  return `${hostTag}:${rawTag}`;
}
import { handlerOwnsSharedRam, sourceHandlerDataWidth, cpuProgramAddressShift, cpuInternalMapRanges } from './machine-source.ts';

export function lowerTopology(game: KGNode, g: Graph, machine: KGNode, opts: GenerateOptions, family: string) {
  // machine configs compose via helper calls (galaxian(config) -> galaxian_base(config));
  // walk the CALLS chain and collect devices from every config in it
  const devices: KGNode[] = [];
  /** set_addrmap patches in chain order (most-derived config first) */
  const mapPatches: { space: string; tag: string; mapId: string }[] = [];
  /** remove_addrmap operations in chain order (most-derived config first). */
  const mapRemovals: { space: string; tag: string }[] = [];
  const mapOperations: Array<
    { kind: 'set'; mapId: string; space: string; tag: string } |
    { kind: 'remove'; space: string; tag: string }
  > = [];
  /** SOFTWARE_LIST declarations (consoles/computers) in chain order */
  const softlistNodes: KGNode[] = [];
  /** Address-space handlers installed by machine_start in chain order. */
  const machineInstalledHandlers: Array<{
    space: string;
    kind: 'read' | 'write';
    start: number;
    end: number;
    mirror?: number;
    className: string;
    method: string;
    viewTag?: string;
    viewEntry?: number;
  }> = [];
  // Numeric members the game's state class fixes in its own constructor. A
  // machine config shared with a sibling game -- a2600 and a2600p share
  // everything but their crystal -- leaves those clocks as source expressions
  // for exactly this step.
  const classConstants = gameClassConstants(game);
  {
    // Devices follow MAME's own composition order. A derived machine
    // configuration calls its base before adding to it, so the base's devices
    // are declared first; visiting the derived configuration first put a sound
    // board ahead of the driver's own CPU. That is not cosmetic — the first
    // CPU is the one the frame schedule runs first each scanline, and Rampage
    // ended up running its Sounds Good 68000 ahead of the Z80 that drives it.
    const seenDevices = new Set<string>();
    // A composite device's own machine config is expanded after the whole
    // configuration chain, keeping its children behind the board's devices.
    const hostedConfigs: { id: string; hostTag: string }[] = [];
    const collectDevices = (id: string, hostTag?: string): void => {
      const visitKey = `${id}\0${hostTag ?? ''}`;
      if (seenDevices.has(visitKey)) return;
      seenDevices.add(visitKey);
      const own = g.out(id, 'HAS_DEVICE');
      const addDevice = (node: KGNode): void => {
        const rawTag = String(node.props.tag);
        // Devices installed by a composite device's machine config live in
        // that device's tag namespace in MAME, even when the graph reuses a
        // single Device node and therefore cannot reveal the collision by
        // counting declarations (for example Venture's two "pia" devices).
        const tag = hostedDeviceTag(hostTag, rawTag);
        const resolved = resolveClassConstants(node, classConstants);
        devices.push(tag === rawTag ? resolved : {
          ...resolved,
          props: { ...resolved.props, tag },
        });
        hostedConfigs.push(...g.out(node.id, 'CALLS').map(called => ({
          id: called.node.id,
          hostTag: tag,
        })));
      };
      // Replay the configuration's statements: each CALLS edge records how
      // many of this config's own devices came before it.
      const calls = [...g.out(id, 'CALLS')]
        .map(called => ({ called, order: Number(called.edge.props?.order ?? own.length) }))
        .sort((left, right) => left.order - right.order);
      let next = 0;
      for (const { called, order } of calls) {
        for (; next < Math.min(order, own.length); next++) addDevice(own[next]!.node);
        collectDevices(called.node.id, hostTag);
      }
      for (; next < own.length; next++) addDevice(own[next]!.node);
    };
    collectDevices(machine.id);
    while (hostedConfigs.length) {
      const hosted = hostedConfigs.shift()!;
      collectDevices(hosted.id, hosted.hostTag);
    }
  }
  {
    const seen = new Set<string>();
    const queue: { id: string; hostTag?: string }[] = [{ id: machine.id }];
    while (queue.length) {
      const { id, hostTag } = queue.shift()!;
      const visitKey = `${id}\0${hostTag ?? ''}`;
      if (seen.has(visitKey)) continue;
      seen.add(visitKey);
      for (const d of g.out(id, 'HAS_DEVICE')) {
        const rawTag = String(d.node.props.tag);
        const tag = hostedDeviceTag(hostTag, rawTag);
        // board-style devices carry a sub-machine (device_add_mconfig)
        queue.push(...g.out(d.node.id, 'CALLS').map(c => ({
          id: c.node.id,
          hostTag: tag,
        })));
      }
      for (const p of g.out(id, 'PATCHES_MAP')) {
        mapPatches.push({
          space: String(p.edge.props?.space),
          tag: String(p.edge.props?.deviceTag),
          mapId: p.node.id,
        });
        mapOperations.push(Object.assign({ kind: 'set' as const, mapId: p.node.id }, {
          space: String(p.edge.props?.space),
          tag: String(p.edge.props?.deviceTag),
        }));
      }
      const removedAddrMaps = g.node(id)?.props.removedAddrMaps;
      for (const encoded of Array.isArray(removedAddrMaps)
        ? removedAddrMaps.map(String)
        : []) {
        const separator = encoded.indexOf('=');
        if (separator > 0) {
          const removal = { tag: encoded.slice(0, separator), space: encoded.slice(separator + 1) };
          mapRemovals.push(removal);
          mapOperations.push(Object.assign({ kind: 'remove' as const }, removal));
        }
      }
      softlistNodes.push(...g.out(id, 'HAS_SOFTLIST').map(s => s.node));
      const installed = g.node(id)?.props.installedHandlers;
      if (Array.isArray(installed)) {
        machineInstalledHandlers.push(...installed.map(value => JSON.parse(String(value))));
      }
      queue.push(...g.out(id, 'CALLS').map(c => ({
        id: c.node.id,
        ...(hostTag ? { hostTag } : {}),
      })));
    }
  }
  const sourceKind = String(game.props.kind);
  const kind: 'console' | 'computer' | undefined = sourceKind === 'console' || sourceKind === 'system'
    ? 'console'
    : sourceKind === 'computer'
      ? 'computer'
      : undefined;
  const category = gameCategory(sourceKind);
  const dataPath = gameDataPath(category, opts.game);
  const byTag = new Map(devices.map(d => [String(d.props.tag), d]));

  // --- cpus + address maps ----------------------------------------------------
  // Every CPU carries its own program map (and io map when the driver has
  // one). Device type -> runtime core is a device-library mapping.
  const CPU_TYPES: Record<string, string> = { Z80: 'z80', Z8002: 'z8002', KONAMI: 'konami', KONAMI1: 'konami1', I8035: 'i8035', I8039: 'i8039', MB8884: 'mb8884', M58715: 'm58715', I8080: 'i8080', I8085A: 'i8085a', I8088: 'i8088', V30: 'v30', M6502: 'm6502', M6507: 'm6507', M6510: 'm6510', DECO_CPU7: 'deco_cpu7', DECO_C10707: 'deco_c10707', M6801U4: 'm6801u4', M6802: 'm6802', M6803: 'm6803', M6808: 'm6808', M68000: 'm68000', M68010: 'm68010', NSC8105: 'nsc8105', MC6809: 'mc6809', MC6809E: 'mc6809e', HD6309E: 'hd6309e', HD63701Y0: 'hd63701y0', RP2A03: 'rp2a03', RP2A03G: 'rp2a03', SEGA_315_5098: 'sega_315_5098', SEGA_315_5177: 'sega_315_5177', LR35902: 'lr35902', TMS320C10: 'tms320c10', TMS34010: 'tms34010' };
  // ROM windows installed by a CPU's own internal address map. They do not
  // appear in the driver's set_addrmap graph, but still map DEVICE_SELF ROM.
  const CPU_INTERNAL_ROM: Record<string, { start: number; end: number; romOffset: number }> = {
    HD63701Y0: { start: 0xc000, end: 0xffff, romOffset: 0 },
  };
  const cpuDevs = devices.filter(d => String(d.props.type) in CPU_TYPES);
  if (cpuDevs.length === 0) throw new Error('no supported CPU devices found in machine config');

  // address maps compose via helper calls too (galaxian_map = base + discrete);
  // flatten ranges depth-first in statement order
  const collectRanges = (mapId: string, seen = new Set<string>()): KGNode[] => {
    if (seen.has(mapId)) return [];
    seen.add(mapId);
    const own = g.out(mapId, 'HAS_RANGE').map(r => r.node);
    const called = g.out(mapId, 'INCLUDES_MAP').flatMap(m => collectRanges(m.node.id, seen));
    return [...called, ...own];
  };
  const inheritedGlobalMask = (
    mapId: string,
    seen = new Set<string>(),
  ): number | undefined => {
    if (seen.has(mapId)) return undefined;
    seen.add(mapId);
    const map = g.node(mapId);
    if (map?.props.globalMask !== undefined) return Number(map.props.globalMask);
    for (const included of g.out(mapId, 'INCLUDES_MAP')) {
      const mask = inheritedGlobalMask(included.node.id, seen);
      if (mask !== undefined) return mask;
    }
    return undefined;
  };

  const mapUnmapsHigh = (mapId: string, seen = new Set<string>()): boolean => {
    if (seen.has(mapId)) return false;
    seen.add(mapId);
    if (g.node(mapId)?.props.unmapHigh) return true;
    return g.out(mapId, 'INCLUDES_MAP').some(included => mapUnmapsHigh(included.node.id, seen));
  };

  const handlerKey = (
    h: { edge: { props?: Record<string, unknown> }; node: KGNode },
    ownerTag?: string,
  ) => {
    const rawTag = h.edge.props?.deviceTag;
    let tag = rawTag === undefined ? undefined : String(rawTag);
    if (tag && ownerTag?.includes(':') && !tag.includes(':')) {
      const namespace = ownerTag.slice(0, ownerTag.lastIndexOf(':'));
      const scoped = `${namespace}:${tag}`;
      if (byTag.has(scoped)) tag = scoped;
    }
    if (tag && !byTag.has(tag)) {
      const matches = [...byTag.keys()].filter(candidate => candidate.endsWith(`:${tag}`));
      if (matches.length === 1) tag = matches[0];
    }
    const owner = tag ?? String(h.node.props.ownerClass);
    return `${owner}.${h.node.props.method}`;
  };
  const rangeSpec = (r: KGNode, ownerTag?: string) => {
    const reads = g.out(r.id, 'READS');
    const writes = g.out(r.id, 'WRITES');
    const raw = String(r.props.raw ?? '');
    const spec: Record<string, unknown> = {
      start: Number(r.props.start),
      end: Number(r.props.end),
      kind: r.props.rom
        ? 'rom'
        : r.props.ram || r.props.readonly || r.props.writeonly
          ? 'ram'
          : 'handler',
    };
    if (r.props.mirror) spec.mirror = Number(r.props.mirror);
    const select = /\.select\s*\(\s*(0x[\da-f]+|\d+)\s*\)/i.exec(raw);
    if (select) spec.select = Number(select[1]);
    if (r.props.regionOffset !== undefined) spec.romOffset = Number(r.props.regionOffset);
    if (r.props.share) spec.share = String(r.props.share);
    if (r.props.umask !== undefined) spec.umask = Number(r.props.umask);
    if (r.props.viewTag) spec.viewTag = String(r.props.viewTag);
    if (r.props.viewEntry !== undefined) spec.viewEntry = Number(r.props.viewEntry);
    if (r.props.readonly || r.props.nopw) spec.readOnly = true;
    if (r.props.writeonly || r.props.nopr) spec.writeOnly = true;
    if (reads[0]) spec.read = handlerKey(reads[0], ownerTag);
    if (writes[0]) {
      spec.write = handlerKey(writes[0], ownerTag);
      const sourceBody = String(writes[0].node.props.sourceBody ?? '');
      if (handlerOwnsSharedRam(sourceBody, String(r.props.share ?? ''))) {
        spec.writeHandlerOwnsRam = true;
      }
    }
    const handlerWidth = sourceHandlerDataWidth([
      ...reads.map(handler => handler.node.props.sourceParameters),
      ...writes.map(handler => handler.node.props.sourceParameters),
    ]);
    if (handlerWidth !== undefined) spec.handlerWidth = handlerWidth;
    // .portr("IN0") -> read handler key "port.IN0" (boards register these from InputPorts)
    if (r.props.portRead) spec.read = `port.${r.props.portRead}`;
    if (r.props.portWrite) spec.write = `port.${r.props.portWrite}`;
    // .bankr(m_mainbank) -> "bank.mainbank" (the board owns bank switching)
    if (r.props.bankRead) spec.read = `bank.${r.props.bankRead}`;
    if (r.props.bankWrite) spec.write = `bank.${r.props.bankWrite}`;
    if (r.props.bankRead || r.props.bankWrite) {
      spec.bank = String(r.props.bankRead ?? r.props.bankWrite);
    }
    // MAME embeds the MOS6532's RAM and register maps with `.m(...)`. Preserve
    // those source-declared submaps as executable device handlers instead of
    // collapsing them to NOP ranges. Composite-device tags inherit their
    // owning CPU's namespace (soundbd:audiocpu -> soundbd:riot).
    //
    // Only when the submap did not resolve. Where it did, the range has already
    // been split into the device's own entries -- `map(0x1c,0x1f).w(timer_on_w)`
    // and the rest -- and each carries the handler and the offset origin MAME
    // gives it. Rewriting those back to the whole-window io_read/io_write left
    // every one of them dispatching on an offset measured from its own start,
    // so a write to 0x081c arrived as offset 0 and set port A instead of
    // arming the timer: Venture's sound CPU then never took its timer
    // interrupt and the board hung on PLAYER 1 GET READY.
    const riotSubmap = !spec.read && !spec.write
      ? /\.m\s*\(\s*(m_)?([\w:]+)\s*,\s*FUNC\s*\(\s*mos6532_device::(ram_map|io_map)\s*\)\s*\)/
        .exec(raw)
      : null;
    if (riotSubmap) {
      const localTag = riotSubmap[2]!;
      const namespace = ownerTag?.includes(':')
        ? ownerTag.slice(0, ownerTag.lastIndexOf(':'))
        : undefined;
      const scopedTag = namespace && byTag.has(`${namespace}:${localTag}`)
        ? `${namespace}:${localTag}`
        : localTag;
      const method = riotSubmap[3] === 'ram_map' ? 'ram' : 'io';
      spec.kind = 'handler';
      spec.read = `${scopedTag}.${method}_read`;
      spec.write = `${scopedTag}.${method}_write`;
    }
    // Williams first-generation boards embed the blitter's eight-byte
    // register decoder with `.m(m_blitter, FUNC(...::map))`.  Keep that
    // source-declared submap attached to the generated device; otherwise the
    // CPU sees CA00-CA07 as NOPs and every post-boot frame is blank because no
    // game blit can ever start.
    const williamsBlitterSubmap = !spec.read && !spec.write
      ? /\.m\s*\(\s*(m_)?([\w:]+)\s*,\s*FUNC\s*\(\s*williams_blitter_device::map\s*\)\s*\)/
        .exec(raw)
      : null;
    if (williamsBlitterSubmap) {
      const localTag = williamsBlitterSubmap[2]!;
      const namespace = ownerTag?.includes(':')
        ? ownerTag.slice(0, ownerTag.lastIndexOf(':'))
        : undefined;
      const scopedTag = namespace && byTag.has(`${namespace}:${localTag}`)
        ? `${namespace}:${localTag}`
        : localTag;
      spec.kind = 'handler';
      spec.write = `${scopedTag}.register_write`;
    }
    if (spec.kind === 'handler' && !spec.read && !spec.write) spec.kind = 'nop';
    return spec;
  };

  const cpuMaps = (dev: KGNode) => {
    // a set_addrmap patch from the game's config chain (most-derived first)
    // overrides the map set at device instantiation
    const mapRefs = g.out(dev.id, 'HAS_MAP');
    const forSpace = (space: string): KGNode | undefined => {
      const operation = mapOperations.find(candidate =>
        candidate.tag === String(dev.props.tag) && candidate.space === space);
      if (operation?.kind === 'set') return g.node(operation.mapId);
      if (operation?.kind === 'remove') return undefined;
      return mapRefs.find(m => (m.edge.props?.space ?? 'AS_PROGRAM') === space)?.node;
    };
    const programMap = forSpace('AS_PROGRAM');
    if (!programMap && dev.props.type !== 'M6801U4') {
      throw new Error(`no address map on ${dev.props.tag}`);
    }
    const rangeNodes = programMap ? collectRanges(programMap.id) : [];
    const driverRanges = programMap
      ? rangeNodes.map(range => rangeSpec(range, String(dev.props.tag)))
      : [{ start: 0xf000, end: 0xffff, kind: 'rom', romOffset: 0 }];
    const internalRom = CPU_INTERNAL_ROM[String(dev.props.type)];
    const ranges = [
      ...(internalRom && !driverRanges.some(range =>
        range.kind === 'rom' && Number(range.start) <= internalRom.start &&
        Number(range.end) >= internalRom.end)
        ? [...driverRanges, { ...internalRom, kind: 'rom' }]
        : driverRanges),
      // The core's own internal map, installed over the driver's: the
      // TMS34010's I/O registers at 0xc0000000.
      ...cpuInternalMapRanges(opts.mameSrc, String(dev.props.type), String(dev.props.tag)),
    ];
    const explicitRegions = [...new Set(
      rangeNodes
        .map(range => range.props.region)
        .filter((region): region is string => typeof region === 'string' && region.length > 0),
    )];
    // program-space global_mask (the Irem sound 6803 masks to 0x7fff so its
    // reset vector at $FFFE reads ROM $7FFE)
    const mask = programMap ? inheritedGlobalMask(programMap.id) : undefined;
    const opcodeMap = forSpace('AS_OPCODES');
    let opcode: Record<string, unknown> | undefined;
    if (opcodeMap) {
      const opcodeRanges = collectRanges(opcodeMap.id)
        .map(range => rangeSpec(range, String(dev.props.tag)));
      opcode = {
        ranges: opcodeRanges,
        region: opcodeRanges.find(range => range.share)?.share ?? String(dev.props.tag),
      };
      const opcodeMask = inheritedGlobalMask(opcodeMap.id);
      if (opcodeMask !== undefined) opcode.globalMask = opcodeMask;
    }
    const ioMap = forSpace('AS_IO');
    let io: Record<string, unknown> | undefined;
    if (ioMap) {
      io = {
        ranges: collectRanges(ioMap.id)
          .map(range => rangeSpec(range, String(dev.props.tag))),
      };
      const ioMask = inheritedGlobalMask(ioMap.id);
      if (ioMask !== undefined) io.globalMask = ioMask;
    }
    // A word-addressed core (MAME addrshift -1) writes every map range in
    // words while the generated bus is byte addressed, so one address unit
    // covers `unit` bytes. Scaling here keeps the ranges in the same units
    // the core's own accesses use.
    // A bit-addressed core (the TMS34010, addrshift +3) is the same rule the
    // other way: eight addresses to a byte, so its ranges shrink.
    const unit = generatedCpuAddressUnitBytes(cpuProgramAddressShift(opts.mameSrc, String(dev.props.type)));
    const scale = (value: number) => Math.floor(value * unit);
    const scaleRange = (range: Record<string, unknown>) => unit === 1 ? range : {
      ...range,
      start: scale(Number(range.start)),
      end: scale(Number(range.end) + 1) - 1,
      ...(range.mirror !== undefined ? { mirror: scale(Number(range.mirror)) } : {}),
      ...(range.select !== undefined ? { select: scale(Number(range.select)) } : {}),
    };
    return {
      ranges: ranges.map(scaleRange),
      ...(mask !== undefined ? { mask: unit === 1 ? mask : scale(mask + 1) - 1 } : {}),
      // `map.unmap_value_high()` in the program map or one it includes.
      ...(programMap && mapUnmapsHigh(programMap.id) ? { unmapHigh: true } : {}),
      ...(opcode ? { opcode } : {}),
      ...(io ? { io: { ...io, ranges: (io.ranges as Record<string, unknown>[]).map(scaleRange) } } : { io }),
      ...(explicitRegions.length === 1 ? { region: explicitRegions[0] } : {}),
    };
  };

  const cpus = cpuDevs.map(d => {
    const maps = cpuMaps(d);
    const installedHandlers = Array.isArray(game.props.installedHandlers)
      ? game.props.installedHandlers.map(value => JSON.parse(String(value)) as {
          space: string;
          kind: 'read' | 'write';
          start: number;
          end: number;
          mirror?: number;
          className: string;
          method: string;
          viewTag?: string;
          viewEntry?: number;
          cpu?: string;
        })
      : [];
    installedHandlers.push(...machineInstalledHandlers);
    // An install lands on the CPU whose space it names (build.ts resolves
    // it); machine_start installs are the main CPU's.
    const installsHere = installedHandlers.filter(handler =>
      (handler.cpu ?? 'maincpu') === String(d.props.tag));
    // In the same address units the map ranges were scaled to (a bit-addressed
    // TMS34010 install names bits).
    const installUnit = generatedCpuAddressUnitBytes(
      cpuProgramAddressShift(opts.mameSrc, String(d.props.type)),
    );
    const scaleInstall = (value: number, inclusiveEnd = false) => installUnit === 1
      ? value
      : inclusiveEnd ? Math.floor((value + 1) * installUnit) - 1 : Math.floor(value * installUnit);
    const programInstalls = installsHere.filter(handler => handler.space === 'AS_PROGRAM');
    const ioInstalls = installsHere.filter(handler => handler.space === 'AS_IO');
    const existingIoRanges = Array.isArray(maps.io?.ranges) ? maps.io.ranges : [];
    return {
      tag: String(d.props.tag),
      type: CPU_TYPES[String(d.props.type)],
      clock: Number(d.props.clock),
      region: maps.region ?? String(d.props.tag),
      ...maps,
      ...(programInstalls.length ? {
        ranges: [
          ...maps.ranges,
          ...programInstalls.map(handler => (handler.kind as string) === 'ram' ? {
            start: scaleInstall(handler.start),
            end: scaleInstall(handler.end, true),
            kind: 'ram' as const,
          } : {
            start: scaleInstall(handler.start),
            end: scaleInstall(handler.end, true),
            kind: 'handler' as const,
            ...(handler.mirror !== undefined ? { mirror: scaleInstall(handler.mirror) } : {}),
            // A view entry's install is an overlay, not a map entry: it decodes
            // only while its entry is selected, and falls back to the map
            // underneath once the board disables the view.
            ...(handler.viewTag !== undefined
              ? { viewTag: handler.viewTag, viewEntry: handler.viewEntry ?? 0 }
              : {}),
            [handler.kind]: `${handler.className}.${handler.method}`,
          }),
        ],
      } : {}),
      ...(ioInstalls.length ? {
        io: {
          ...(maps.io ?? {}),
          ranges: [
            ...existingIoRanges,
            ...ioInstalls.map(handler => ({
              start: handler.start,
              end: handler.end,
              kind: 'handler' as const,
              ...(handler.mirror !== undefined ? { mirror: handler.mirror } : {}),
              [handler.kind]: `${handler.className}.${handler.method}`,
            })),
          ],
        },
      } : {}),
    };
  });

  // `address_map_bank_device`: an address space with no processor of its own,
  // reached through the driver's `read8`/`write8` on it. Its map is lowered
  // with the same range rules as a CPU's, so RAM, ROM, ports and device
  // handlers inside it decode exactly as they would on a processor bus.
  const bankDevices = devices
    .filter(device => device.props.type === 'ADDRESS_MAP_BANK')
    .flatMap(device => {
      const map = g.out(device.id, 'HAS_MAP')
        .find(ref => (ref.edge.props?.space ?? 'AS_PROGRAM') === 'AS_PROGRAM')?.node;
      if (!map) return [];
      const tag = String(device.props.tag);
      const lines = (device.props.config as string[] | undefined) ?? [];
      const setting = (method: string): string[] | undefined => {
        const line = lines.find(candidate => candidate.includes(`->${method}(`) || candidate.includes(`.${method}(`));
        const match = line && new RegExp(`${method}\\s*\\(([^)]*)\\)`).exec(line);
        return match ? match[1]!.split(',').map(value => value.trim()) : undefined;
      };
      // Widths and strides are written as plain literals in every driver.
      const number = (value: string | undefined): number | undefined =>
        value !== undefined && /^(?:0x[\da-f]+|\d+)$/i.test(value) ? Number(value) : undefined;
      const options = setting('set_options');
      const dataWidth = number(options?.[1]) ?? number(setting('set_data_width')?.[0]) ?? 8;
      const addrWidth = number(options?.[2]) ?? number(setting('set_addr_width')?.[0]) ?? 32;
      const stride = number(setting('set_stride')?.[0]) ?? 0;
      const mask = inheritedGlobalMask(map.id);
      return [{
        tag,
        ...(device.props.member ? { member: String(device.props.member) } : {}),
        dataWidth,
        addrWidth,
        stride,
        // A processor's ROM comes from its own region, so rangeSpec leaves the
        // region to the CPU; a bank device has no region of its own and every
        // ROM window names one (`.rom().region("maincpu", 0x5000)`).
        ranges: collectRanges(map.id).map(range => ({
          ...rangeSpec(range, tag),
          ...(range.props.rom && typeof range.props.region === 'string'
            ? { region: range.props.region }
            : {}),
        })),
        ...(mask !== undefined ? { mask } : {}),
        ...(mapUnmapsHigh(map.id) ? { unmapHigh: true } : {}),
      }];
    });

  if (family === 'neogeo') {
    const main = cpus.find(cpu => cpu.tag === 'maincpu');
    if (main) {
      // set_slot_idx installs the fixed cartridge window and its initial 1 MiB
      // bank dynamically. Fixed arcade carts select slot zero at machine start;
      // expressing those source-owned installs as ranges lets the generated
      // bus execute the BIOS-to-cartridge handoff before dynamic bank changes.
      main.ranges = [
        {
          start: 0x000080,
          end: 0x0fffff,
          kind: 'rom' as const,
          region: 'cslot1:maincpu',
          romOffset: 0x80,
        },
        {
          start: 0x200000,
          end: 0x2fffff,
          kind: 'rom' as const,
          region: 'cslot1:maincpu',
          romOffset: 0x100000,
        },
        ...main.ranges,
        {
          start: 0x000000,
          end: 0x00007f,
          kind: 'rom' as const,
          region: 'mainbios',
          romOffset: 0,
        },
      ];
    }
  }

  // legacy alias: boards for single-map families read cpus[n].ranges; the
  // shared `ranges` field mirrors cpu[0] for the galaga family's shared map
  const ranges = cpus[0].ranges;
  const io = cpus[0].io;

  return { devices, byTag, cpus, kind, softlistNodes, category, cpuDevs, dataPath, bankDevices, ranges, io };
}
