// MAME's own `-listxml` output, read as an oracle for the machine facts this
// compiler derives from source.
//
// Every browsable fact (year, manufacturer, driver file, screen geometry, CPU
// clocks, ROM loads) is produced twice: once here by MAME itself, and once by
// our source parse. Nothing else compares the two, so a misparse in a fact no
// acceptance golden looks at ships silently. This module supplies the second
// opinion; `fact-audit.ts` does the comparing.
//
// Two hard requirements come out of the way MAME is built:
//
//   * The binary must be the same release as the source checkout. A dump from
//     a different release describes a different MAME, and every difference it
//     reports is noise. `listXmlOracle` refuses rather than guesses.
//   * `build/generated/version.cpp` in a MAME checkout is a build artifact and
//     goes stale, so the source version is read from `makefile`, which is what
//     the build itself uses to write that header.
//
// Output is cached under `.cache/listxml/<build version>/`, the same
// revision-keyed shape `driver-history` uses: MAME-derived data is cached but
// never committed.

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cachingDisabled } from './gen-cache.ts';

export interface ListXmlRom {
  name: string;
  size: number;
  region?: string;
  offset?: number;
  crc?: string;
  merge?: string;
  status?: string;
  /** Set when the chip is one option of a selectable BIOS, not a fixed load. */
  bios?: string;
}

export interface ListXmlChip {
  type: 'cpu' | 'audio';
  tag?: string;
  name: string;
  clock?: number;
}

export interface ListXmlDisplay {
  tag?: string;
  type: string;
  rotate?: number;
  width?: number;
  height?: number;
  refresh?: number;
  htotal?: number;
  vtotal?: number;
  vbstart?: number;
  vbend?: number;
}

export interface ListXmlMachine {
  name: string;
  sourcefile?: string;
  cloneof?: string;
  romof?: string;
  isdevice: boolean;
  description?: string;
  year?: string;
  manufacturer?: string;
  roms: ListXmlRom[];
  chips: ListXmlChip[];
  displays: ListXmlDisplay[];
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/**
 * Shape version of the parsed entries below. Bump it when this module starts
 * reading a field it previously ignored: the MAME version alone cannot tell a
 * cached entry that predates the change from a current one.
 */
const PARSE_VERSION = 2;

export function defaultListXmlCacheRoot(): string {
  return join(projectRoot, '.cache/listxml');
}

function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&amp;/g, '&');
}

function attributes(fragment: string): Record<string, string> {
  const found: Record<string, string> = {};
  for (const [, key, value] of fragment.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)) {
    found[key] = decodeEntities(value);
  }
  return found;
}

const num = (value: string | undefined, radix = 10): number | undefined => {
  if (value === undefined) return undefined;
  const parsed = radix === 16 ? Number.parseInt(value, 16) : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const text = (body: string, tag: string): string | undefined => {
  const match = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(body);
  return match ? decodeEntities(match[1].trim()) : undefined;
};

const children = (body: string, tag: string): Record<string, string>[] =>
  [...body.matchAll(new RegExp(`<${tag}\\b([^>]*?)/?>`, 'g'))].map(match => attributes(match[1]));

/**
 * Every `<machine>` element in a `-listxml` dump, including the device
 * entries MAME emits alongside the machine you asked for.
 */
export function parseListXmlMachines(xml: string): ListXmlMachine[] {
  const machines: ListXmlMachine[] = [];
  for (const match of xml.matchAll(/<machine\b([^>]*)>([\s\S]*?)<\/machine>/g)) {
    const attrs = attributes(match[1]);
    const body = match[2];
    if (!attrs.name) continue;
    machines.push({
      name: attrs.name,
      ...(attrs.sourcefile ? { sourcefile: attrs.sourcefile } : {}),
      ...(attrs.cloneof ? { cloneof: attrs.cloneof } : {}),
      ...(attrs.romof ? { romof: attrs.romof } : {}),
      isdevice: attrs.isdevice === 'yes',
      ...(text(body, 'description') ? { description: text(body, 'description') } : {}),
      ...(text(body, 'year') ? { year: text(body, 'year') } : {}),
      ...(text(body, 'manufacturer') ? { manufacturer: text(body, 'manufacturer') } : {}),
      roms: children(body, 'rom').map(rom => ({
        name: rom.name,
        size: num(rom.size) ?? 0,
        ...(rom.region ? { region: rom.region } : {}),
        // Offsets are hex in the XML and decimal in our generated config.
        ...(num(rom.offset, 16) !== undefined ? { offset: num(rom.offset, 16) } : {}),
        ...(rom.crc ? { crc: rom.crc.toLowerCase() } : {}),
        ...(rom.merge ? { merge: rom.merge } : {}),
        ...(rom.bios ? { bios: rom.bios } : {}),
        ...(rom.status ? { status: rom.status } : {}),
      })),
      chips: children(body, 'chip')
        .filter(chip => chip.type === 'cpu' || chip.type === 'audio')
        .map(chip => ({
          type: chip.type as 'cpu' | 'audio',
          ...(chip.tag ? { tag: chip.tag } : {}),
          name: chip.name,
          ...(num(chip.clock) !== undefined ? { clock: num(chip.clock) } : {}),
        })),
      displays: children(body, 'display').map(display => ({
        ...(display.tag ? { tag: display.tag } : {}),
        type: display.type ?? 'unknown',
        ...(num(display.rotate) !== undefined ? { rotate: num(display.rotate) } : {}),
        ...(num(display.width) !== undefined ? { width: num(display.width) } : {}),
        ...(num(display.height) !== undefined ? { height: num(display.height) } : {}),
        ...(num(display.refresh) !== undefined ? { refresh: num(display.refresh) } : {}),
        ...(num(display.htotal) !== undefined ? { htotal: num(display.htotal) } : {}),
        ...(num(display.vtotal) !== undefined ? { vtotal: num(display.vtotal) } : {}),
        ...(num(display.vbstart) !== undefined ? { vbstart: num(display.vbstart) } : {}),
        ...(num(display.vbend) !== undefined ? { vbend: num(display.vbend) } : {}),
      })),
    });
  }
  return machines;
}

/** `0.289` from `0.289 (mame0289)`, as the binary reports itself. */
export function parseBinaryVersion(output: string): string | undefined {
  return /^(\d+\.\d+)/.exec(output.trim())?.[1];
}

/** `0.289` from the checkout's makefile, which is what the build stamps in. */
export function parseSourceVersion(makefile: string): string | undefined {
  return /BARE_BUILD_VERSION\s+"(\d+\.\d+)"/.exec(makefile)?.[1];
}

export function mameBinaryVersion(binary: string): string | undefined {
  const result = spawnSync(binary, ['-version'], { encoding: 'utf8', timeout: 30000 });
  return result.status === 0 ? parseBinaryVersion(result.stdout ?? '') : undefined;
}

export function mameSourceVersion(mameSrc: string): string | undefined {
  try {
    return parseSourceVersion(readFileSync(join(mameSrc, 'makefile'), 'utf8'));
  } catch {
    return undefined;
  }
}

/**
 * The binary to ask. `MAME_BIN` names it explicitly; otherwise a `mame` on
 * PATH is tried, which is frequently a package-manager build of some other
 * release — hence the version check in `listXmlOracle`, never a bare trust.
 */
export function resolveMameBinary(explicit?: string): string | undefined {
  const candidate = explicit ?? process.env.MAME_BIN;
  if (candidate) return existsSync(candidate) ? candidate : undefined;
  // Walked directly rather than shelling out to `command -v`: a shell here
  // means quoting a path we did not choose, and MAME_BIN paths have spaces.
  for (const dir of (process.env.PATH ?? '').split(delimiter)) {
    if (!dir) continue;
    const path = join(dir, 'mame');
    if (existsSync(path)) return path;
  }
  return undefined;
}

export interface ListXmlOracle {
  /** Undefined when the oracle is unusable; `reason` then says why. */
  binary?: string;
  version?: string;
  reason?: string;
}

/**
 * Resolve a usable `-listxml` source, or explain why there isn't one. A
 * version mismatch is a refusal, not a warning: comparing 0.288's answers
 * against a 0.289 parse produces differences that mean nothing.
 */
export function listXmlOracle(mameSrc: string, explicitBinary?: string): ListXmlOracle {
  const binary = resolveMameBinary(explicitBinary);
  if (!binary) {
    return { reason: 'no MAME binary found (set MAME_BIN to one matching the source checkout)' };
  }
  const version = mameBinaryVersion(binary);
  if (!version) return { reason: `${binary} did not report a version` };
  const source = mameSourceVersion(mameSrc);
  if (!source) return { reason: `no BARE_BUILD_VERSION in ${join(mameSrc, 'makefile')}` };
  if (version !== source) {
    return {
      reason: `MAME binary is ${version} but the source checkout is ${source}; `
        + 'point MAME_BIN at a binary of the same release',
    };
  }
  return { binary, version };
}

function cacheFile(cacheRoot: string, version: string, machine: string): string {
  return join(cacheRoot, version, `${machine.replace(/[^\w.-]/g, '_')}.json`);
}

/** Drop cache trees recorded against any MAME version other than `version`. */
function pruneOtherVersions(cacheRoot: string, version: string): void {
  if (!existsSync(cacheRoot)) return;
  for (const entry of readdirSync(cacheRoot)) {
    if (entry !== version) rmSync(join(cacheRoot, entry), { recursive: true, force: true });
  }
}

function runListXml(binary: string, machine: string): ListXmlMachine | undefined {
  const dump = spawnSync(binary, ['-listxml', machine], {
    encoding: 'utf8',
    timeout: 120000,
    maxBuffer: 256 * 1024 * 1024,
  });
  if (dump.status !== 0) return undefined;
  // A dump carries the requested machine plus every device it references.
  return parseListXmlMachines(dump.stdout ?? '')
    .find(candidate => candidate.name === machine && !candidate.isdevice);
}

/**
 * MAME's own description of one machine, cached against the binary's build
 * version. Undefined when MAME does not know the machine.
 */
export function cachedListXmlMachine(
  oracle: Required<Pick<ListXmlOracle, 'binary' | 'version'>>,
  machine: string,
  cacheRoot = defaultListXmlCacheRoot(),
): ListXmlMachine | undefined {
  if (cachingDisabled()) return runListXml(oracle.binary, machine);

  const file = cacheFile(cacheRoot, oracle.version, machine);
  if (existsSync(file)) {
    try {
      const cached = JSON.parse(readFileSync(file, 'utf8')) as {
        parseVersion?: number;
        machine: ListXmlMachine | null;
      };
      if (cached.parseVersion === PARSE_VERSION) return cached.machine ?? undefined;
    } catch { /* torn concurrent write or corrupt file — re-run below */ }
  }

  pruneOtherVersions(cacheRoot, oracle.version);
  const parsed = runListXml(oracle.binary, machine);
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify({
    mameVersion: oracle.version,
    parseVersion: PARSE_VERSION,
    machine: parsed ?? null,
  }, null, 2));
  renameSync(tmp, file);
  return parsed;
}
