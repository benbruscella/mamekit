import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface SegaZ80RomTransform {
  kind: 'sega-z80-decrypt';
  algorithm: 'segacrpt' | 'segacrp2';
  sourceRegion: string;
  targetRegion: string;
  start: number;
  end: number;
  convtable?: number[];
  xorTable?: number[];
  swapTable?: number[];
}

const OLD_SOURCE = 'src/devices/machine/segacrpt_device.cpp';
const NEW_SOURCE = 'src/devices/machine/segacrp2_device.cpp';

function functionBody(source: string, signature: RegExp): string | undefined {
  const match = signature.exec(source);
  if (!match) return undefined;
  const open = source.indexOf('{', match.index + match[0].length);
  if (open < 0) return undefined;
  let depth = 1;
  for (let index = open + 1; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) return source.slice(open + 1, index);
  }
  return undefined;
}

function numericArray(body: string, name: string): number[] | undefined {
  const declaration = new RegExp(
    `static\\s+const\\s+(?:u?int8_t|int)\\s+${name}\\s*\\[[^\\]]+\\](?:\\s*\\[[^\\]]+\\])?\\s*=\\s*\\{`,
  ).exec(body);
  if (!declaration) return undefined;
  const open = body.indexOf('{', declaration.index);
  let depth = 1;
  let close = -1;
  for (let index = open + 1; index < body.length; index++) {
    if (body[index] === '{') depth++;
    else if (body[index] === '}' && --depth === 0) { close = index; break; }
  }
  if (close < 0) return undefined;
  const initializer = body.slice(open + 1, close)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  return [...initializer.matchAll(/\b(?:0x[\da-f]+|\d+)\b/gi)]
    .map(match => Number(match[0]));
}

/**
 * Compile one of MAME's encrypted Sega Z80 devices into a ROM-load transform.
 * The key tables are read from the device implementation selected by the
 * machine config; the browser runtime only carries the generic decode loops.
 */
export function compileSegaZ80RomTransform(
  mameSrc: string,
  deviceType: string,
  sourceRegion: string,
  targetRegion: string,
): SegaZ80RomTransform | undefined {
  if (!/^SEGA_315_\d+$/.test(deviceType)) return undefined;
  const className = `${deviceType.toLowerCase()}_device`;
  for (const [algorithm, file] of [
    ['segacrpt', OLD_SOURCE],
    ['segacrp2', NEW_SOURCE],
  ] as const) {
    const source = readFileSync(join(mameSrc, file), 'utf8');
    const body = functionBody(
      source,
      new RegExp(`void\\s+${className}::decrypt\\s*\\(\\s*\\)`),
    );
    if (!body) continue;
    if (algorithm === 'segacrpt') {
      const convtable = numericArray(body, 'convtable');
      if (convtable?.length !== 128) {
        throw new Error(`${deviceType}: expected MAME's 32x4 conversion table`);
      }
      return {
        kind: 'sega-z80-decrypt', algorithm, sourceRegion, targetRegion,
        start: 0, end: 0x8000, convtable,
      };
    }
    const xorTable = numericArray(body, 'xor_table');
    const swapTable = numericArray(body, 'swap_table');
    if (xorTable?.length !== 128 || swapTable?.length !== 128) {
      throw new Error(`${deviceType}: expected MAME's 128-entry XOR/swap tables`);
    }
    return {
      kind: 'sega-z80-decrypt', algorithm, sourceRegion, targetRegion,
      start: 0, end: 0x8000, xorTable, swapTable,
    };
  }
  throw new Error(`${deviceType}: no MAME decrypt implementation found`);
}
