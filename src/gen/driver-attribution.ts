// Who a machine's MAME driver is credited to, from the two sources that
// actually say so:
//
//   1. the driver header's `copyright-holders` line — MAME's own statement of
//      who wrote the file, and the only record that reaches back before the
//      release-notes era;
//   2. MAMEDEV's published release notes — the credits MAMEDEV themselves
//      published, per release (src/gen/release-notes.ts).
//
// Commit history is deliberately not one of them. See src/gen/driver-history.ts
// for why a `git log` tally cannot answer "who wrote this?", and note that
// Pac-Man is the standing example: its top committers are the people who
// refactored the whole tree, while its header credits Nicola Salmoria.
//
// Everything here is best effort. Release notes live in the gitignored asset
// tree (`.data/release-notes/`, fetched by tools/fetch-release-notes.ts), so a
// checkout that has never fetched them still generates — with header credit
// alone, and saying so.

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { releaseNotesDir } from '../paths.ts';
import {
  creditsFromIndex,
  type ReleaseNoteIndex,
} from './release-notes.ts';

export interface CreditedPerson {
  name: string;
  /** Named on the driver's `copyright-holders` line. */
  headerCredit: boolean;
  /** Credited by MAMEDEV with a working machine, not only with a change. */
  machineCredit: boolean;
  /** Release notes naming them against this driver. */
  notes: number;
  firstRelease?: string;
  lastRelease?: string;
}

export interface DriverAttribution {
  people: CreditedPerson[];
  /** Where the credit came from, carried with it wherever it is shown. */
  source: string;
  /** Release span the notes covered, absent when no notes were available. */
  releases?: { first: string; last: string; count: number };
}

export const HEADER_ONLY_SOURCE = 'MAME driver header (copyright-holders)';
export const FULL_SOURCE =
  'MAME driver header (copyright-holders) and MAMEDEV release notes';

/** `Nicola Salmoria,Stephane Humbert` / `hap, Sean Riddle and others`. */
export function headerNames(copyrightHolders: string): string[] {
  return copyrightHolders
    .split(/\s*,\s*|\s+and\s+/)
    .map(name => name.trim())
    .filter(name => Boolean(name) && !/^others?$/i.test(name));
}

let cached: ReleaseNoteIndex | null | undefined;

/** The digested release-note index, or null when it has never been fetched. */
export function releaseNoteIndex(projectRoot: string): ReleaseNoteIndex | null {
  if (cached !== undefined) return cached;
  const path = join(releaseNotesDir(projectRoot), 'index.json');
  if (!existsSync(path)) {
    cached = null;
    return cached;
  }
  try {
    cached = JSON.parse(readFileSync(path, 'utf8')) as ReleaseNoteIndex;
  } catch {
    // A truncated fetch must not fail generation; credit falls back to header.
    cached = null;
  }
  return cached;
}

/** Test seam: forget the memoized index. */
export function resetReleaseNoteIndex(): void {
  cached = undefined;
}

export interface AttributionInput {
  /** Driver path as we carry it: `src/mame/pacman/pacman.cpp`. */
  driverFile: string;
  /** Short name and full description, both of which the notes may name. */
  machineNames: readonly string[];
  copyrightHolders?: string;
}

export function attributeDriver(
  index: ReleaseNoteIndex | null,
  input: AttributionInput,
): DriverAttribution | undefined {
  const header = headerNames(input.copyrightHolders ?? '');
  const notes = index
    ? creditsFromIndex(
      index,
      input.driverFile.replace(/^src\/mame\//, ''),
      input.machineNames.filter(Boolean),
    )
    : [];
  if (!header.length && !notes.length) return undefined;

  const people = new Map<string, CreditedPerson>();
  for (const name of header) {
    people.set(name, { name, headerCredit: true, machineCredit: false, notes: 0 });
  }
  for (const credit of notes) {
    // Header names and note names are spelled by different people; match
    // case-insensitively but keep whichever spelling MAME's own header used.
    const existing = [...people.values()]
      .find(person => person.name.toLowerCase() === credit.name.toLowerCase());
    const person = existing ?? { name: credit.name, headerCredit: false, machineCredit: false, notes: 0 };
    person.machineCredit ||= credit.machineCredit;
    person.notes += credit.entries;
    person.firstRelease = credit.firstRelease;
    person.lastRelease = credit.lastRelease;
    people.set(person.name, person);
  }

  // Header credit first — it is the strongest claim available — then the people
  // MAMEDEV credited with a working machine, then by how often they appear.
  const ordered = [...people.values()].sort((a, b) =>
    Number(b.headerCredit) - Number(a.headerCredit)
    || Number(b.machineCredit) - Number(a.machineCredit)
    || b.notes - a.notes
    || a.name.localeCompare(b.name));

  return {
    people: ordered,
    source: index ? FULL_SOURCE : HEADER_ONLY_SOURCE,
    ...(index ? { releases: { ...index.span, count: index.releases } } : {}),
  };
}

/** Attribution for one driver, reading the release-note index from `.data`. */
export function loadDriverCredits(
  projectRoot: string,
  input: AttributionInput,
): DriverAttribution | undefined {
  return attributeDriver(releaseNoteIndex(projectRoot), input);
}
