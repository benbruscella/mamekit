
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

import { indexMameHardware } from '../mame/hardware.ts';
import { parseAddressMaps, stripComments } from '../kg/parse.ts';

import { MameAstIndex, parseMameAst } from '../mame/ast.ts';

export function chunkTriples(values: number[]): [number, number, number][] {
  const triples: [number, number, number][] = [];
  for (let index = 0; index + 2 < values.length; index += 3) {
    triples.push([values[index]!, values[index + 1]!, values[index + 2]!]);
  }
  return triples;
}

/**
 * Lower the common NVRAM custom-handler shape used by arcade boards: clear a
 * share, then copy a source-declared byte table into its beginning. This is
 * power-on state, not a ROM patch; omitting it can leave bookkeeping/coinage
 * data invalid even though the game reaches attract mode.
 */
export function sourceNvramInitializers(
  devices: readonly KGNode[],
  mameSrc: string,
): { share: string; bytes?: number[]; fill?: number }[] {
  const result: { share: string; bytes?: number[]; fill?: number }[] = [];
  for (const device of devices.filter(node => node.props.type === 'NVRAM')) {
    const config = Array.isArray(device.props.config)
      ? device.props.config.map(String).join('\n')
      : String(device.props.config ?? '');
    // nvram_device applies this value before attempting to load a persisted
    // image. A generated board without persistence still needs the same cold
    // boot contents; several drivers use all-ones as an erased-memory marker.
    if (/\bNVRAM\s*\([^\n;]*\bDEFAULT_ALL_1\b/.test(config)) {
      result.push({ share: String(device.props.tag), fill: 0xff });
      continue;
    }
    const callback = /set_custom_handler\s*\(\s*FUNC\s*\(\s*(\w+)::(\w+)\s*\)\s*\)/
      .exec(config);
    const sourceFile = String(device.props.sourceFile ?? '');
    if (!callback || !sourceFile || !existsSync(join(mameSrc, sourceFile))) continue;
    const source = readFileSync(join(mameSrc, sourceFile), 'utf8');
    const ast = new MameAstIndex(parseMameAst([{ file: sourceFile, source }]));
    const fn = ast.findFunctionInHierarchy(callback[1]!, callback[2]!);
    if (!fn) continue;
    const table = /static\s+const\s+(?:u?int8_t|u8)\s+(\w+)\s*\[\s*(\d+)\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/
      .exec(fn.body);
    if (!table) continue;
    const name = table[1]!;
    if (
      !new RegExp(`memset\\s*\\(\\s*data\\s*,\\s*(?:0x00|0)\\s*,\\s*size\\s*\\)`).test(fn.body) ||
      !new RegExp(`memcpy\\s*\\(\\s*data\\s*,\\s*${name}\\s*,\\s*sizeof\\s*\\(\\s*${name}\\s*\\)\\s*\\)`).test(fn.body)
    ) continue;
    const bytes = [...table[3]!.matchAll(/\b(?:0x[\da-f]+|\d+)\b/gi)]
      .map(match => Number(match[0]));
    if (bytes.length !== Number(table[2]) || bytes.some(value => value > 0xff)) continue;
    result.push({ share: String(device.props.tag), bytes });
  }
  return result;
}

export function handlerOwnsSharedRam(sourceBody: string, share: string): boolean {
  if (!share) return false;
  const member = `m_${share.replace(/[^A-Za-z0-9_]/g, '_')}`;
  return new RegExp(`\\b${member}\\s*\\[[^\\]]+\\]\\s*[-+*/&|^]?=`).test(sourceBody);
}

/**
 * MAME permits an 8-bit device delegate to span both lanes of a 16-bit map.
 * Its `u8 data` declaration is the source fact that distinguishes that byte-
 * addressed device from a native word handler when no explicit umask exists.
 */
export function sourceHandlerDataWidth(
  parameters: readonly unknown[],
): 8 | undefined {
  return parameters.some(value =>
    /(?:^|,)\s*(?:u8|s8|uint8_t|int8_t)\s+data\b/.test(String(value ?? '')))
    ? 8
    : undefined;
}

export function configuredDeviceMember(props: Record<string, unknown>): string | undefined {
  const config = Array.isArray(props.config) ? props.config.map(String).join('\n') : '';
  return /\(\s*config\s*,\s*(m_\w+(?:\[\d+\])?)/.exec(config)?.[1];
}

export function cpuProgramAddressShift(mameSrc: string, type: string): number {
  const sourceFile = indexMameHardware(mameSrc).get(type)?.sourceFile;
  const path = sourceFile ? join(mameSrc, sourceFile) : '';
  if (!path || !existsSync(path)) return 0;
  const config = /m_program_config\s*\(\s*"program"\s*,\s*ENDIANNESS_\w+\s*,\s*[^,]+,\s*[^,]+,\s*(-?\d+)/
    .exec(readFileSync(path, 'utf8'));
  return config ? Number(config[1]) : 0;
}

/**
 * A screen updated by a device -- `set_screen_update("maincpu",
 * FUNC(tms34010_device::tms340x0_ind16))` -- is partially updated when that
 * device's own source drives `update_partial`, as the TMS34010's scanline
 * timer does on every visible line.
 */
export function screenOwnerUpdatesPartially(mameSrc: string, graph: KnowledgeGraph): boolean {
  const callback = graph.nodes.find(node =>
    node.label === 'Callback' && node.props.signal === 'set_screen_update');
  const targetClass = String(callback?.props.targetClass ?? '');
  if (!targetClass) return false;
  const definition = [...indexMameHardware(mameSrc).values()]
    .find(candidate => candidate.className === targetClass);
  const path = definition ? join(mameSrc, definition.sourceFile) : '';
  return Boolean(path) && existsSync(path) && readFileSync(path, 'utf8').includes('update_partial(');
}

/**
 * A CPU's internal address map -- the `address_map_constructor(FUNC(cls::map),
 * this)` its constructor hands to `m_program_config` -- as handler ranges owned
 * by the CPU (`maincpu.io_register_r`), in the map's own address units.
 */
export function cpuInternalMapRanges(mameSrc: string, type: string, tag: string): Record<string, unknown>[] {
  const sourceFile = indexMameHardware(mameSrc).get(type)?.sourceFile;
  const path = sourceFile ? join(mameSrc, sourceFile) : '';
  if (!path || !existsSync(path)) return [];
  const source = stripComments(readFileSync(path, 'utf8'));
  const typePattern = new RegExp(`\\(\\s*mconfig\\s*,\\s*${type}\\s*,[^;{]*?address_map_constructor\\(\\s*FUNC\\(\\s*(\\w+)::(\\w+)\\s*\\)`);
  const constructor = typePattern.exec(source);
  if (!constructor) return [];
  const map = parseAddressMaps(source).find(candidate =>
    candidate.cls === constructor[1] && candidate.name === constructor[2]);
  return (map?.ranges ?? []).filter(range => range.read || range.write).map(range => ({
    start: range.start,
    end: range.end,
    kind: 'handler',
    ...(range.read ? { read: `${tag}.${range.read.method}` } : {}),
    ...(range.write ? { write: `${tag}.${range.write.method}` } : {}),
  }));
}
