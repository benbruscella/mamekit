// Compare the machine facts we derive from MAME source against the facts MAME
// itself reports through `-listxml`.
//
// These are the facts nothing else checks: no acceptance golden looks at a
// year, a manufacturer, a ROM offset or a screen's blanking, so a misparse in
// any of them ships silently and stays wrong.
//
// The comparison only ever compares like with like, which takes care because
// the two descriptions are shaped differently:
//
//   * MAME's XML states one `size` per chip, covering ROM_LOAD plus every
//     ROM_CONTINUE that follows it. We keep the slices separately, so the
//     comparable quantity is the sum.
//   * Device clocks are u32 in MAME and print truncated; ours stay fractional.
//   * MAME's `chip type="cpu"` is every device with an execute interface —
//     VIC-IIs, CIAs, POKEYs, DMA controllers — not the board's CPU list, so
//     only clocks of tags both sides name are compared.
//   * BIOS alternatives appear in the XML as selectable `bios` ROMs. A board
//     loads one of them, never all.
//
// A difference that survives all that is a real disagreement — with one named
// exception, recorded as a divergence rather than a failure: see
// `scaledScreen`.

import type { ListXmlDisplay, ListXmlMachine, ListXmlRom } from './listxml.ts';

export interface DerivedRomLoad {
  file?: string;
  offset?: number;
  size?: number;
  crc?: string;
  alt?: { file?: string; crc?: string }[];
  continueSegments?: { size?: number }[];
  ignoredBytes?: number;
}

export interface DerivedMeta {
  game?: string;
  fullname?: string;
  title?: string;
  year?: string | number;
  manufacturer?: string;
  driverFile?: string;
}

export interface DerivedScreen {
  width?: number;
  height?: number;
  refresh?: number;
  rotate?: number;
  htotal?: number;
  vtotal?: number;
  vbstart?: number;
  vbend?: number;
}

export interface DerivedConfig {
  board?: {
    cpus?: { tag?: string; type?: string; clock?: number }[];
    screen?: DerivedScreen;
  };
  roms?: { region?: string; loads?: DerivedRomLoad[] }[];
}

export interface FactFindings {
  /** Real disagreements: one side is wrong. */
  failures: string[];
  /** Known, explained differences in what the two sides model. */
  divergences: string[];
}

/** MAME reports `pacman/pacman.cpp`; we carry the path from the repository root. */
export function normaliseDriverFile(driverFile: string): string {
  return driverFile.replace(/^src\/mame\//, '');
}

/** Our device tags carry MAME's relative-tag punctuation; the XML strips it. */
export function normaliseTag(tag: string): string {
  return tag.replace(/^[\^:]+/, '');
}

/** The screen MAME would call the machine's primary raster display. */
export function primaryDisplay(machine: ListXmlMachine): ListXmlDisplay | undefined {
  return machine.displays.find(display => display.type === 'raster') ?? machine.displays[0];
}

/**
 * Bytes MAME reads from one chip, which is what the XML states as its `size`:
 * the first slice, every ROM_CONTINUE after it, and any ROM_IGNORE the load
 * skips past. All three advance MAME's file cursor.
 */
export function loadedBytes(load: DerivedRomLoad): number {
  return (load.size ?? 0)
    + (load.continueSegments ?? []).reduce((total, slice) => total + (slice.size ?? 0), 0)
    + (load.ignoredBytes ?? 0);
}

/** Every name a board may satisfy this slot with, across sibling sets. */
export function loadNames(load: DerivedRomLoad): string[] {
  return [load.file, ...(load.alt ?? []).map(alt => alt.file)]
    .filter((name): name is string => Boolean(name));
}

// -listxml rounds refresh to six decimals; ours is the unrounded division.
const refreshMatches = (ours: number, theirs: number): boolean => Math.abs(ours - theirs) < 5e-6;

// MAME's device clock is u32, so the XML prints ours truncated.
const clockMatches = (ours: number, theirs: number): boolean => Math.trunc(ours) === theirs;

/**
 * MAME renders some boards at an integer horizontal scale — the Galaxian
 * family runs its screen at GALAXIAN_XSCALE = 3 so stars and bullets can sit
 * on sub-character positions — while our video pipeline is 1:1 with the
 * board's own pixels. It is a genuine difference in what is modelled, not a
 * misparse, so it is reported and published rather than hidden. The whole
 * horizontal axis must scale by the same integer for this to apply, which a
 * plain width error never does.
 */
export function scaledScreen(
  ours: DerivedScreen | undefined,
  display: ListXmlDisplay | undefined,
): number | undefined {
  if (!ours?.width || !ours.htotal || !display?.width || !display.htotal) return undefined;
  const scale = display.width / ours.width;
  if (!Number.isInteger(scale) || scale < 2 || scale > 8) return undefined;
  // Some boards already carry MAME's scaled htotal (Tutankham keeps 1152 with
  // a 256-pixel width), others carry the board's own. Either is consistent
  // with a scaled screen; a plain width error matches neither.
  return display.htotal === ours.htotal * scale || display.htotal === ours.htotal
    ? scale
    : undefined;
}

function compare(
  failures: string[],
  target: string,
  fact: string,
  ours: unknown,
  theirs: unknown,
): void {
  if (theirs === undefined || theirs === null || theirs === '') return;
  if (ours === undefined || ours === null || ours === '') {
    failures.push(`${target}: ${fact} is missing; MAME reports ${JSON.stringify(theirs)}`);
    return;
  }
  if (String(ours) !== String(theirs)) {
    failures.push(
      `${target}: ${fact} is ${JSON.stringify(ours)} but MAME reports ${JSON.stringify(theirs)}`,
    );
  }
}

function screenFindings(
  target: string,
  ours: DerivedScreen | undefined,
  display: ListXmlDisplay | undefined,
): FactFindings {
  const findings: FactFindings = { failures: [], divergences: [] };
  if (!display || !ours) return findings;
  const scale = scaledScreen(ours, display);
  if (scale) {
    findings.divergences.push(
      `${target}: MAME renders this screen ${scale}× wide (${display.width}×${display.height}, `
      + `htotal ${display.htotal}); our video models the board's own ${ours.width} pixels`,
    );
  } else {
    compare(findings.failures, target, 'screen width', ours.width, display.width);
    compare(findings.failures, target, 'screen htotal', ours.htotal, display.htotal);
  }
  compare(findings.failures, target, 'screen height', ours.height, display.height);
  compare(findings.failures, target, 'screen rotation', ours.rotate ?? 0, display.rotate ?? 0);
  compare(findings.failures, target, 'screen vtotal', ours.vtotal, display.vtotal);
  compare(findings.failures, target, 'screen vbstart', ours.vbstart, display.vbstart);
  compare(findings.failures, target, 'screen vbend', ours.vbend, display.vbend);
  if (display.refresh !== undefined && ours.refresh !== undefined
    && !refreshMatches(ours.refresh, display.refresh)) {
    findings.failures.push(
      `${target}: screen refresh is ${ours.refresh} but MAME reports ${display.refresh}`,
    );
  }
  return findings;
}

function cpuFailures(
  target: string,
  ours: NonNullable<DerivedConfig['board']>['cpus'],
  machine: ListXmlMachine,
): string[] {
  const theirs = new Map(machine.chips
    .filter(chip => chip.type === 'cpu' && chip.tag)
    .map(chip => [normaliseTag(chip.tag as string), chip]));
  const failures: string[] = [];
  for (const cpu of ours ?? []) {
    if (!cpu.tag) continue;
    const tag = normaliseTag(cpu.tag);
    const chip = theirs.get(tag);
    if (!chip || chip.clock === undefined || cpu.clock === undefined) continue;
    if (!clockMatches(cpu.clock, chip.clock)) {
      failures.push(
        `${target}: cpu ${tag} clock is ${cpu.clock} but MAME reports ${chip.clock}`,
      );
    }
  }
  return failures;
}

/** BIOS alternatives are selectable; a board loads one, never the whole list. */
const comparableRom = (rom: ListXmlRom): boolean =>
  Boolean(rom.crc) && Boolean(rom.region) && rom.bios === undefined;

function romFailures(
  target: string,
  ours: DerivedConfig['roms'],
  machine: ListXmlMachine,
): string[] {
  const failures: string[] = [];
  const theirs = new Map<string, ListXmlRom>();
  for (const rom of machine.roms) {
    if (comparableRom(rom)) theirs.set(`${rom.region}/${rom.name}`, rom);
  }
  const seen = new Set<string>();
  for (const region of ours ?? []) {
    for (const load of region.loads ?? []) {
      // A slot is satisfied by whichever sibling-set chip the visitor supplies.
      const keys = loadNames(load).map(name => `${region.region}/${name}`);
      const key = keys.find(candidate => theirs.has(candidate));
      if (!key) continue;
      const rom = theirs.get(key)!;
      for (const candidate of keys) seen.add(candidate);
      compare(failures, target, `rom ${key} crc`, load.crc?.toLowerCase(), rom.crc);
      compare(failures, target, `rom ${key} size`, loadedBytes(load), rom.size);
      compare(failures, target, `rom ${key} offset`, load.offset ?? 0, rom.offset ?? 0);
    }
  }
  for (const key of theirs.keys()) {
    if (!seen.has(key)) failures.push(`${target}: MAME loads ${key}, which the board never loads`);
  }
  return failures;
}

/**
 * Every disagreement between our derived facts and MAME's own answer for one
 * machine, split into real failures and explained divergences.
 */
export function machineFactFindings(
  target: string,
  meta: DerivedMeta,
  config: DerivedConfig,
  machine: ListXmlMachine,
): FactFindings {
  const failures: string[] = [];
  compare(failures, target, 'fullname', meta.fullname, machine.description);
  compare(failures, target, 'year', meta.year, machine.year);
  compare(failures, target, 'manufacturer', meta.manufacturer, machine.manufacturer);
  compare(
    failures,
    target,
    'driver file',
    meta.driverFile ? normaliseDriverFile(meta.driverFile) : undefined,
    machine.sourcefile,
  );
  const screen = screenFindings(target, config.board?.screen, primaryDisplay(machine));
  failures.push(...screen.failures);
  failures.push(...cpuFailures(target, config.board?.cpus, machine));
  failures.push(...romFailures(target, config.roms, machine));
  return { failures, divergences: screen.divergences };
}
