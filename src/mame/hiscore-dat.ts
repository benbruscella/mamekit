// MAME's hiscore.dat, read from the checkout's own plugin directory.
//
// `plugins/hiscore/hiscore.dat` names, per machine, the bytes a game keeps
// its high-score table in. The plugin (`plugins/hiscore/init.lua`) waits
// until the first and last sentinel bytes appear, copies a saved image in,
// and writes the bytes back out when they change. MAMEKIT compiles the same
// data into the target's config so the shell can run the same logic against
// the generated board; see runtime/hiscore.ts for the execution side.
//
// The file's grammar, followed exactly as the Lua reads it:
//   ;comment                          stripped to end of line
//   <game>:  |  <game>,<software>:    a cluster header; consecutive headers
//                                     share the rows that follow
//   @<cpu>,<space>,<addr>,<len>,<first>,<last>[,<fill>]   one row, all hex
//   @delay=<seconds>                  wait before the first sentinel check
// A cluster ends at the next header line after at least one row.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** One run of bytes the game keeps scores in, as the plugin addresses it. */
export interface HiscoreRow {
  /** MAME device tag of the CPU whose space holds the bytes, without its leading colon. */
  cpu: string;
  /** the address space (`program`, `data`), absent when `share` names a board share instead */
  space?: string;
  /** a board share (`ram`, `videoram`), the `<name>/share` form */
  share?: string;
  address: number;
  length: number;
  /** the byte expected at `address` once the game has initialised its table */
  first: number;
  /** the byte expected at `address + length - 1` */
  last: number;
  /** written over the whole run at reset, before the game touches it */
  fill?: number;
}

export interface HiscoreTable {
  /** emulated seconds to wait before the first sentinel check (`@delay=`) */
  delaySeconds?: number;
  rows: HiscoreRow[];
}

/** Relative path of the plugin's data file inside a MAME checkout. */
export const HISCORE_DAT_PATH = 'plugins/hiscore/hiscore.dat';

/**
 * Parse a whole hiscore.dat into its clusters, keyed the way the plugin
 * matches them: `game` for a machine, `game,software` for a software-list
 * item. A cluster whose rows the plugin could not evaluate (an unknown space
 * form) is dropped whole, as the plugin's pcall around parse_table does.
 */
export function parseHiscoreDat(text: string): Map<string, HiscoreTable> {
  const tables = new Map<string, HiscoreTable>();
  let headers: string[] = [];
  let rows: HiscoreRow[] = [];
  let delaySeconds: number | undefined;
  let broken = false;
  const flush = (): void => {
    if (headers.length && rows.length && !broken) {
      const table: HiscoreTable = { rows, ...(delaySeconds !== undefined ? { delaySeconds } : {}) };
      for (const header of headers) tables.set(header, table);
    }
    headers = [];
    rows = [];
    delaySeconds = undefined;
    broken = false;
  };
  for (const raw of text.split('\n')) {
    const line = raw.replace(/[ \t\r]*;.*$/, '').replace(/\r$/, '');
    if (line.startsWith('@')) {
      const delay = /^@delay=([.\d]+)/.exec(line);
      if (delay) { delaySeconds = Number(delay[1]); continue; }
      const row = parseRow(line);
      if (row) rows.push(row);
      else broken = true;
      continue;
    }
    const header = /^([a-z0-9_,]+):/.exec(line);
    if (header) {
      if (rows.length) flush();
      headers.push(header[1]!);
    }
  }
  flush();
  return tables;
}

function parseRow(line: string): HiscoreRow | undefined {
  const match = /^@([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),?([0-9a-fA-F]{0,2})\s*$/.exec(line);
  if (!match) return undefined;
  const [, cpuTag, spaceTag, address, length, first, last, fill] = match;
  const cpu = cpuTag!.replace(/^:/, '');
  const hex = (value: string): number => Number.parseInt(value, 16);
  const numbers = [address, length, first, last].map(value => hex(value!));
  if (numbers.some(Number.isNaN) || numbers[1]! <= 0) return undefined;
  const [name, kind] = spaceTag!.split('/');
  const memory = kind === 'share'
    ? { share: name!.replace(/^:/, '') }
    : kind === undefined ? { space: name! } : undefined;
  if (!memory) return undefined;
  return {
    cpu,
    ...memory,
    address: numbers[0]!,
    length: numbers[1]!,
    first: numbers[2]!,
    last: numbers[3]!,
    ...(fill ? { fill: hex(fill) } : {}),
  };
}

const cache = new Map<string, Map<string, HiscoreTable>>();

/**
 * The table for one machine (or `game,software`) from the MAME checkout at
 * `mameSrc`, or undefined when the file or the entry is absent. The file is
 * parsed once per process.
 */
export function hiscoreTable(mameSrc: string, key: string): HiscoreTable | undefined {
  const file = join(mameSrc, HISCORE_DAT_PATH);
  let tables = cache.get(file);
  if (!tables) {
    tables = existsSync(file) ? parseHiscoreDat(readFileSync(file, 'utf8')) : new Map();
    cache.set(file, tables);
  }
  return tables.get(key);
}
