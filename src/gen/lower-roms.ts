

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseRomSets, type RomRegionDef } from '../kg/parse.ts';
import { mameDeviceRomSet, mameDeviceShortName } from '../mame/device-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';

import type { GenerateOptions } from './generate.ts';

import { Graph } from '../kg/query.ts';
import { chunkTriples } from './machine-source.ts';

export function lowerRoms(opts: GenerateOptions, g: Graph, romset: KGNode, devices: KGNode[], graph: KnowledgeGraph) {
  // --- roms ----------------------------------------------------------------------
  // Clone-family alternates: MAME renames/redumps program ROMs across
  // revisions (current "gng" wants mm_c_04; a classic set carries gg4.bin
  // with a different CRC — both are real Ghosts'n Goblins). Any sibling
  // set's chip occupying the same region/offset/size slot is an acceptable
  // alternative, derived entirely from the driver's other ROM_START blocks.
  const altSlots = new Map<string, { file: string; crc: string }[]>();
  const full = opts.fullGraph ? new Graph(opts.fullGraph) : undefined;
  const lineage = full ?? g;
  if (full) {
    const gameId = `game:${opts.game}`;
    const parentId = full.out(gameId, 'CLONE_OF')[0]?.node.id ?? gameId;
    const family = opts.fullGraph!.nodes.filter(n =>
      n.label === 'Game' && n.id !== gameId &&
      (n.id === parentId || full.out(n.id, 'CLONE_OF')[0]?.node.id === parentId));
    for (const sib of family) {
      const sibSet = full.out(sib.id, 'USES_ROMSET')[0]?.node;
      if (!sibSet) continue;
      for (const { node: region } of full.out(sibSet.id, 'HAS_REGION')) {
        for (const { node: rom } of full.out(region.id, 'LOADS')) {
          const key = `${region.props.tag}/${rom.props.offset}/${rom.props.size}`;
          (altSlots.get(key) ?? altSlots.set(key, []).get(key)!)
            .push({ file: String(rom.props.file), crc: String(rom.props.crc) });
        }
      }
    }
  }
  // A clone's canonical parent may live in another driver file and therefore
  // be represented only by the CLONE_OF edge in this driver's full graph
  // Cross-file clones still need their canonical parent's ROM-set metadata.
  const parentEdge = opts.fullGraph?.edges.find(edge =>
    edge.from === `game:${opts.game}` && edge.rel === 'CLONE_OF');
  const parentGame = parentEdge ? lineage.node(parentEdge.to) : undefined;
  const parentSetName = parentEdge?.to.replace(/^game:/, '');
  const parentRomSet = parentGame
    ? lineage.out(parentGame.id, 'USES_ROMSET')[0]?.node
    : undefined;
  const biosRomSet = parentGame && String(parentGame.props.flags ?? '').includes('MACHINE_IS_BIOS_ROOT')
    ? parentRomSet
    : undefined;
  const loadKey = (props: KGNode['props']): string =>
    `${props.file}/${props.crc}/${props.offset}/${props.size}`;
  /** The BIOS parent's own chips in the region with this tag, by identity. */
  const biosLoadKeys = (region: KGNode): Set<string> => {
    if (!biosRomSet) return new Set();
    const parentRegion = lineage.out(biosRomSet.id, 'HAS_REGION')
      .map(edge => edge.node)
      .find(candidate => candidate.props.tag === region.props.tag);
    if (!parentRegion) return new Set();
    return new Set(lineage.out(parentRegion.id, 'LOADS')
      .map(edge => loadKey(edge.node.props)));
  };
  const inheritedBiosSet = (region: KGNode): string | undefined => {
    if (!biosRomSet) return undefined;
    const keys = biosLoadKeys(region);
    const loads = g.out(region.id, 'LOADS').map(edge => edge.node);
    if (!loads.length || !loads.every(load => keys.has(loadKey(load.props)))) return undefined;
    return String(biosRomSet.props.name);
  };
  const cloneRomSet = !biosRomSet ? parentSetName : undefined;
  const roms = g.out(romset.id, 'HAS_REGION').map(({ node: region }) => {
    const assignedRomSet = inheritedBiosSet(region) ?? cloneRomSet;
    // A BIOS parent that owns only *part* of a region: Atari System 1 loads
    // the motherboard BIOS into the game's own `maincpu` alongside its code,
    // so the whole-region rule above never fires and `atarisy1.zip` was never
    // asked for. Attribute those chips one at a time instead.
    const biosKeys = assignedRomSet ? new Set<string>() : biosLoadKeys(region);
    return {
      region: String(region.props.tag),
      size: Number(region.props.size),
      ...(assignedRomSet ? { romSet: assignedRomSet } : {}),
      ...(String(region.props.flags).includes('ROMREGION_ERASEFF') ? { fill: 0xff } : {}),
      ...(String(region.props.flags).includes('ROMREGION_INVERT') ? { invert: true } : {}),
      ...(region.props.fills ? {
        fills: chunkTriples(region.props.fills as number[]).map(
          ([offset, size, value]) => ({ offset, size, value }),
        ),
      } : {}),
      loads: g.out(region.id, 'LOADS').map(({ node: rom }) => {
        const crc = String(rom.props.crc);
        const slot = `${region.props.tag}/${rom.props.offset}/${rom.props.size}`;
        const alts = (altSlots.get(slot) ?? [])
          .filter((a, i, arr) => a.crc !== crc && arr.findIndex(x => x.crc === a.crc) === i);
        return {
          file: String(rom.props.file),
          offset: Number(rom.props.offset),
          size: Number(rom.props.size),
          ...(biosKeys.has(loadKey(rom.props))
            ? { romSet: String(biosRomSet!.props.name) }
            : {}),
          crc,
          ...(alts.length ? { alt: alts } : {}),
          ...(rom.props.reloadOffsets
            ? { reloadOffsets: rom.props.reloadOffsets as number[] }
            : {}),
          ...(rom.props.groupSize ? { groupSize: Number(rom.props.groupSize) } : {}),
          ...(rom.props.skip ? { skip: Number(rom.props.skip) } : {}),
          ...(rom.props.reverse ? { reverse: true } : {}),
          ...(rom.props.nibbleShift !== undefined
            ? { nibbleShift: Number(rom.props.nibbleShift) as 0 | 4 }
            : {}),
          ...(rom.props.continueSegments ? {
            continueSegments: chunkTriples(rom.props.continueSegments as number[]).map(
              ([offset, size, fileOffset]) => ({ offset, size, fileOffset }),
            ),
          } : {}),
          ...(rom.props.ignoredBytes ? { ignoredBytes: Number(rom.props.ignoredBytes) } : {}),
          ...(rom.props.status ? { status: rom.props.status as 'nodump' | 'baddump' } : {}),
        };
      }),
    };
  });
  // BIOS-root parents contribute board ROM regions that cartridge sets do not
  // repeat (Neo Geo's main BIOS and initial Z80 BIOS window). Duplicate parent
  // regions are already recognized above and loaded from the BIOS zip; append
  // only parent-only regions that contain physical chips.
  if (biosRomSet) {
    const present = new Set(roms.map(region => region.region));
    for (const { node: region } of lineage.out(biosRomSet.id, 'HAS_REGION')) {
      const tag = String(region.props.tag);
      const loads = lineage.out(region.id, 'LOADS').map(({ node: rom }) => ({
        file: String(rom.props.file),
        offset: Number(rom.props.offset),
        size: Number(rom.props.size),
        crc: String(rom.props.crc),
        ...(rom.props.reloadOffsets ? { reloadOffsets: rom.props.reloadOffsets as number[] } : {}),
        ...(rom.props.groupSize ? { groupSize: Number(rom.props.groupSize) } : {}),
        ...(rom.props.skip ? { skip: Number(rom.props.skip) } : {}),
        ...(rom.props.reverse ? { reverse: true } : {}),
        ...(rom.props.continueSegments ? {
          continueSegments: chunkTriples(rom.props.continueSegments as number[]).map(
            ([offset, size, fileOffset]) => ({ offset, size, fileOffset }),
          ),
        } : {}),
        ...(rom.props.ignoredBytes ? { ignoredBytes: Number(rom.props.ignoredBytes) } : {}),
        ...(rom.props.status ? { status: rom.props.status as 'nodump' | 'baddump' } : {}),
      }));
      if (present.has(tag) || loads.length === 0) continue;
      roms.push({
        region: tag,
        size: Number(region.props.size),
        romSet: String(biosRomSet.props.name),
        ...(String(region.props.flags).includes('ROMREGION_ERASEFF') ? { fill: 0xff } : {}),
        ...(String(region.props.flags).includes('ROMREGION_INVERT') ? { invert: true } : {}),
        loads,
      });
      present.add(tag);
    }
  }
  if (full) {
    // A device hosted inside another source-defined device may own a dumped
    // ROM set (Namco's 51/52/53/54xx MCUs are one family, but this is not
    // specific to them). Discover those sets from the declaring host class
    // instead of naming one processor model here. Devices without
    // device_rom_region simply contribute nothing.
    for (const nested of devices) {
      const ownerConfigEdge = graph.edges.find(edge =>
        edge.rel === 'HAS_DEVICE' && edge.to === nested.id);
      const ownerConfig = ownerConfigEdge && g.node(ownerConfigEdge.from);
      const hostEdge = ownerConfigEdge && graph.edges.find(edge =>
        edge.rel === 'CALLS' && edge.to === ownerConfigEdge.from &&
        g.node(edge.from)?.label === 'Device');
      const host = hostEdge && g.node(hostEdge.from);
      if (!ownerConfig || !host) continue;
      const sourceFile = String(ownerConfig.props.sourceFile ?? '');
      // The host's own class first: a sub-machine is often declared once on a
      // base class while each variant names its own ROM (every 1541 composes
      // c1541_device_base's config; c1541_device's device_rom_region picks
      // the DOS).
      const className = [host.props.cls, ownerConfig.props.cls]
        .map(candidate => String(candidate ?? ''))
        .find(candidate => candidate && sourceFile && mameDeviceRomSet(opts.mameSrc, sourceFile, candidate)) ?? '';
      const romSetName = sourceFile && className
        ? mameDeviceRomSet(opts.mameSrc, sourceFile, className)
        : undefined;
      const deviceRomSet = romSetName && full.node(`romset:${romSetName}`);
      if (!deviceRomSet) {
        // Or the nested device's own class declares the set: the 68705P5's
        // bootstrap ROM is m68705p5_device::device_rom_region, in a CPU source
        // the driver's graph never reads. MAME needs it to run the part.
        const own = ownDeviceRomSet(opts.mameSrc, String(nested.props.type ?? ''));
        if (!own) continue;
        // Composed devices already carry their full tag (`mcu:mcu`).
        const nestedTag = String(nested.props.tag);
        const deviceTag = nestedTag.startsWith(`${host.props.tag}:`) ? nestedTag : `${host.props.tag}:${nestedTag}`;
        for (const region of own.regions) {
          const regionTag = `${deviceTag}:${region.tag}`;
          if (roms.some(candidate => candidate.region === regionTag)) continue;
          roms.push({
            region: regionTag,
            size: region.size,
            romSet: own.romSet,
            loads: region.loads.map(load => ({ file: load.file, offset: load.offset, size: load.size, crc: load.crc })),
          });
        }
        continue;
      }
      // MAME loads a device's ROMs from its own set, named by the device short
      // name in DEFINE_DEVICE_TYPE — namco54.zip, not the parent game's zip.
      const romSet = mameDeviceShortName(opts.mameSrc, sourceFile, className);
      for (const { node: region } of full.out(deviceRomSet.id, 'HAS_REGION')) {
        const regionTag = `${host.props.tag}:${region.props.tag}`;
        if (roms.some(candidate => candidate.region === regionTag)) continue;
        roms.push({
          region: regionTag,
          size: Number(region.props.size),
          ...(romSet ? { romSet } : {}),
          loads: full.out(region.id, 'LOADS').map(({ node: rom }) => ({
            file: String(rom.props.file),
            offset: Number(rom.props.offset),
            size: Number(rom.props.size),
            crc: String(rom.props.crc),
            ...(rom.props.status ? { status: rom.props.status as 'nodump' | 'baddump' } : {}),
          })),
        });
      }
    }
  }

  return { roms };
}

/**
 * The ROM set a device type declares for itself through device_rom_region, read
 * from its own source: the set's regions and the zip MAME loads them from (the
 * device's short name, `m68705p5.zip`).
 */
function ownDeviceRomSet(mameSrc: string, type: string): { romSet: string; regions: RomRegionDef[] } | undefined {
  const definition = type ? indexMameHardware(mameSrc).get(type) : undefined;
  if (!definition) return undefined;
  const name = mameDeviceRomSet(mameSrc, definition.sourceFile, definition.className);
  if (!name) return undefined;
  const set = parseRomSets(readFileSync(join(mameSrc, definition.sourceFile), 'utf8'))
    .find(candidate => candidate.name === name);
  if (!set?.regions.length) return undefined;
  return {
    romSet: mameDeviceShortName(mameSrc, definition.sourceFile, definition.className) ?? name,
    regions: set.regions,
  };
}

/**
 * The ROM sets a slot's cards build in through their own children, each
 * region tagged with the cards that need it.
 *
 * A cartridge board can carry a chip with firmware of its own: the VRC7's
 * `DS1001(config, m_vrc7snd, ...)` holds its instrument patches in
 * `ds1001.zip`. MAME loads that set only when a VRC7 cartridge is in the slot,
 * so the region is the machine's only for those cards (`cards`), and is
 * tagged as MAME tags it, `<slot>:<card>:<child>:<region>`.
 */
export function slotCardDeviceRoms(
  mameSrc: string,
  slotTag: string,
  options: readonly (readonly [option: string, type: string])[],
): { region: string; size: number; romSet: string; cards: string[]; loads: { file: string; offset: number; size: number; crc: string }[] }[] {
  const hardware = indexMameHardware(mameSrc);
  const regions: ReturnType<typeof slotCardDeviceRoms> = [];
  for (const [option, type] of options) {
    const card = hardware.get(type);
    if (!card) continue;
    const source = readFileSync(join(mameSrc, card.sourceFile), 'utf8');
    const config = new RegExp(`\\b${card.className}::device_add_mconfig\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`).exec(source)?.[1] ?? '';
    for (const child of config.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\(\s*config\s*,\s*(m_\w+)/g)) {
      const [, childType, member] = child;
      const own = ownDeviceRomSet(mameSrc, childType!);
      const tag = new RegExp(`\\b${member}\\s*\\(\\s*\\*this\\s*,\\s*"([^"]+)"`).exec(source)?.[1];
      if (!own || !tag) continue;
      for (const region of own.regions) {
        regions.push({
          region: `${slotTag}:${option}:${tag}:${region.tag}`,
          size: region.size,
          romSet: own.romSet,
          cards: [option],
          loads: region.loads.map(load => ({ file: load.file, offset: load.offset, size: load.size, crc: load.crc })),
        });
      }
    }
  }
  return regions;
}
