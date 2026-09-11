// MAMEDEV's own release notes, read as the authoritative record of who is
// credited for a driver.
//
// The obvious alternative, `git log --follow` over the driver file, cannot
// support the claim: it does not track code moved between files, it weights a
// typo fix like a rewrite, it credits the committer when a change is landed on
// someone else's behalf, and author names are never spelled consistently. The
// release notes are curated per release by the people doing the crediting, so
// a name in brackets is the credit MAMEDEV itself published.
//
// Machine names, not paths, are the primary key. MAME's source layout has been
// reorganised repeatedly — `src/drivers/pacman.c`, `src/mame/drivers/pacman.cpp`,
// `pacman/pacman.cpp` are all the same driver — so a path is matched by its stem
// as well as in full, while a machine's description and short name have been
// stable for decades. That is also the honest answer to the objection that
// commit history cannot follow code being moved: this never has to.
//
// Three line shapes carry credit (0.289 examples):
//
//   - 03342: [Graphics] (gaelco/gaelco2.cpp) radikalb: Some graphics are
//     misaligned. (Jos van Mourik)
//   - 14692: philips/minitel_2_rpic.cpp: Added sound output for DTMF tones and
//     beeps. [Fabio D'Urso]
//   Busch Microtronic 2090 [hap, Jason T. Jacques, Decle, Michael A. Wessel]
//
// The first two name a source path; the third names a machine, which is why
// the fact oracle matters twice — `-listxml` is what maps a machine
// description back to the driver file it lives in.
//
// Software-list credits are kept apart from machine credits and never attributed
// to a driver. MAME's software lists contain dozens of home ports sharing an
// arcade machine's name — matching "Pac-Man" by name alone pulls dump credits
// for Atari and C64 conversions onto pacman.cpp, which is precisely the kind of
// confident wrongness this module exists to avoid.
//
// Anything this parser cannot read confidently is skipped. Under-crediting is
// recoverable; inventing attribution is not.

export type ReleaseNoteKind =
  | 'bug-fix'
  | 'source-change'
  | 'machine'
  | 'software';

export interface ReleaseNoteCredit {
  /** Release the note was published in, e.g. `0.289`. */
  release: string;
  kind: ReleaseNoteKind;
  /** Names exactly as MAMEDEV published them. */
  names: string[];
  /** Source paths the entry names, relative to `src/` as the notes write them. */
  paths: string[];
  /** Machine descriptions or short names the entry names. */
  machines: string[];
  summary: string;
}

// Headings that list machines with their credits, across every era of the
// notes: "New working systems", MESS's "New System Drivers Supported:",
// "Machines promoted to working", "New working software list items".
const SECTION_WITH_MACHINES =
  /systems?|machines?|drivers?|clones?|software|promoted|sets|games?/i;

/** A path as the notes write them: `pacman/pacman.cpp`, `bus/a2bus/agat_fdc.cpp`. */
const looksLikePath = (token: string): boolean =>
  /^[\w./+-]+\.(?:cpp|c|h|hxx|ipp|xml|lua|py)$/.test(token);

/**
 * Source roots that never hold a driver. A driver path has been written
 * `pacman.c`, `src/drivers/pacman.c`, `drivers/pacman.cpp` and finally
 * `pacman/pacman.cpp` over the years, so stem matching has to stay open to all
 * of them — but MAME also has `sound/gb.cpp` beside the driver `nintendo/gb.cpp`,
 * and merging a sound chip's credits into a driver's would be exactly the kind
 * of confident wrongness this module exists to avoid.
 */
const DEVICE_ROOTS = new Set([
  'cpu', 'sound', 'video', 'machine', 'bus', 'devices', 'emu', 'osd', 'lib',
  'tools', 'ui', 'formats', 'frontend', 'imagedev', 'netlist', 'hash', 'plugins',
]);

/** `src/drivers/pacman.c` and `pacman/pacman.cpp` share the stem `pacman`. */
export function pathStem(path: string): string {
  return (path.split('/').pop() ?? path).replace(/\.[^.]+$/, '').toLowerCase();
}

/**
 * Whether a path the notes name could be a driver file at all. Software lists
 * are the second trap after device sources: `nes.xml` and `neogeo.xml` share a
 * stem with `nes.cpp` and `neogeo.cpp`, so without this every software-list
 * dump credit lands on the driver — one prolific contributor arrived with 108
 * of them attached to the NES.
 */
export function couldBeDriverPath(path: string): boolean {
  if (!/\.(?:cpp|c|h|hxx|ipp)$/.test(path)) return false;
  const segments = path.replace(/^src\//, '').split('/');
  return segments.length === 1 || !DEVICE_ROOTS.has(segments[0]);
}

const splitNames = (credit: string): string[] => credit
  .split(/,\s*/)
  .map(name => name.trim())
  .filter(name => Boolean(name) && name.length < 80);

/** Source paths named by one entry body, including `a.cpp: …; b.cpp: …` pairs. */
function pathsIn(body: string): string[] {
  const paths: string[] = [];
  for (const segment of body.split(';')) {
    const head = segment.split(':')[0]?.trim();
    if (!head) continue;
    for (const token of head.split(/,\s*/)) {
      if (looksLikePath(token)) paths.push(token);
    }
  }
  return paths;
}

/**
 * One logical entry per element. Notes from the 0.1xx era fold a single entry
 * across several indented lines, putting its credit — the only part that
 * matters — on a continuation line.
 */
export function joinWrappedLines(text: string): string[] {
  const joined: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const continuation = /^\s+\S/.test(raw) && joined.length > 0 && joined[joined.length - 1].trim();
    if (continuation && !/^\s*[*-]\s/.test(raw)) {
      joined[joined.length - 1] = `${joined[joined.length - 1].trimEnd()} ${raw.trim()}`;
      // A folded line leaves a gap so heading detection still lines up.
      joined.push('');
      continue;
    }
    joined.push(raw);
  }
  return joined;
}

/** MAME short names as the notes list them: `radikalb, surfplnt40, surfplnt:`. */
export function machineShortNames(head: string): string[] {
  return head
    .split(/,\s*|\s+and\s+/)
    .map(token => token.trim())
    .filter(token => /^[a-z][a-z0-9_]{1,19}$/.test(token) && token !== 'clones');
}

export function parseReleaseNotes(release: string, text: string): ReleaseNoteCredit[] {
  const credits: ReleaseNoteCredit[] = [];
  const lines = joinWrappedLines(text);
  let section = '';
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index].trim();
    if (!line) continue;
    // A heading is any line underlined with dashes.
    if (/^-{3,}$/.test(lines[index + 1]?.trim() ?? '')) {
      section = line;
      continue;
    }
    if (/^-{3,}$/.test(line)) continue;

    const numbered = /^-\s+(\d+):\s*(.*)$/.exec(line);
    if (numbered) {
      const body = numbered[2];
      // MAME Testers entries lead with bracketed categories and credit in
      // parentheses; pull requests credit in brackets at the end.
      const categorised = /^(\[[^\]]+\]\s*)+/.exec(body);
      if (categorised) {
        const credit = /\(([^()]+)\)\s*$/.exec(body);
        if (!credit) continue;
        const rest = body.slice(categorised[0].length).trim();
        const path = /^\(([^()]+)\)/.exec(rest);
        const afterPath = rest.replace(/^\([^()]*\)\s*/, '');
        credits.push({
          release,
          kind: 'bug-fix',
          names: splitNames(credit[1]),
          paths: path && looksLikePath(path[1]) ? [path[1]] : [],
          // `sms, smspal: Failed on "SMS VDP Test"` — the sets it was fixed in.
          machines: machineShortNames(afterPath.split(':')[0] ?? ''),
          summary: afterPath.replace(/\s*\([^()]*\)\s*$/, '').trim(),
        });
        continue;
      }
      const credit = /\[([^\]]+)\]\s*$/.exec(body);
      if (!credit) continue;
      const summary = body.slice(0, credit.index).trim();
      credits.push({
        release,
        kind: 'source-change',
        names: splitNames(credit[1]),
        paths: pathsIn(summary),
        machines: [],
        summary,
      });
      continue;
    }

    // `Busch Microtronic 2090 [hap, Decle]` under a machine-list heading, or
    // MESS's `-Bambino Basketball - Dribble Away [hap, Sean Riddle]`.
    if (!SECTION_WITH_MACHINES.test(section)) continue;
    const credit = /\[([^\]]+)\]\s*$/.exec(line);
    if (!credit || credit.index === 0) continue;
    const named = line.slice(0, credit.index).trim()
      .replace(/^-(?=\S)/, '')
      .replace(/[:,]$/, '');
    if (!named) continue;
    // `tvdear: Illust-Cassette No. 1` — a software list prefix, then titles.
    const withoutList = /^[\w.+-]+:\s+(.*)$/.exec(named);
    const titles = (withoutList ? withoutList[1] : named)
      .split(/,\s*(?=[^,]*$)/)
      .map(title => title.trim())
      .filter(Boolean);
    credits.push({
      release,
      kind: /software|cassette|cart|floppy|disk/i.test(section) ? 'software' : 'machine',
      names: splitNames(credit[1]),
      paths: [],
      machines: titles.length ? titles : [named],
      summary: section,
    });
  }
  return credits;
}

export interface DriverCredit {
  name: string;
  /** Release notes naming this person against this driver. */
  entries: number;
  firstRelease: string;
  lastRelease: string;
  /** True when MAMEDEV credited them with making a machine work, not a change. */
  machineCredit: boolean;
}

const releaseOrder = (release: string): number => Number(release.replace(/^0\./, '')) || 0;

/**
 * Everyone MAMEDEV's release notes credit against one driver file, plus the
 * machines that driver provides. Ordered by how MAMEDEV credited them: people
 * credited with a working machine first, then by number of notes.
 */
export function driverCredits(
  credits: readonly ReleaseNoteCredit[],
  driverPath: string,
  machineNames: readonly string[] = [],
): DriverCredit[] {
  const wanted = new Set(machineNames.map(name => name.toLowerCase()));
  const found = new Map<string, DriverCredit>();
  const stem = pathStem(driverPath);
  for (const credit of credits) {
    const matchesPath = credit.paths.some(path =>
      path === driverPath || (couldBeDriverPath(path) && pathStem(path) === stem));
    const namesMachine = credit.kind !== 'software'
      && credit.machines.some(machine => wanted.has(machine.toLowerCase()));
    if (!matchesPath && !namesMachine) continue;
    // Only a machine list credits someone with making the machine work; a bug
    // fix naming the same set is a fix, and says so.
    const matchesMachine = namesMachine && credit.kind === 'machine';
    for (const name of credit.names) {
      const existing = found.get(name);
      if (!existing) {
        found.set(name, {
          name,
          entries: 1,
          firstRelease: credit.release,
          lastRelease: credit.release,
          machineCredit: matchesMachine,
        });
        continue;
      }
      existing.entries++;
      existing.machineCredit ||= matchesMachine;
      if (releaseOrder(credit.release) < releaseOrder(existing.firstRelease)) {
        existing.firstRelease = credit.release;
      }
      if (releaseOrder(credit.release) > releaseOrder(existing.lastRelease)) {
        existing.lastRelease = credit.release;
      }
    }
  }
  return [...found.values()].sort((a, b) =>
    Number(b.machineCredit) - Number(a.machineCredit)
    || b.entries - a.entries
    || a.name.localeCompare(b.name));
}

// --- the index generation reads ------------------------------------------
//
// The digested credits are ~12 MB, which every target worker would otherwise
// parse to answer one question about one driver. The index keeps only what
// attribution needs, keyed the two ways a driver is named in the notes.

export interface IndexedCredit {
  names: string[];
  release: string;
  kind: ReleaseNoteKind;
}

export interface ReleaseNoteIndex {
  releases: number;
  /** Oldest and newest release the notes cover, for saying so on the page. */
  span: { first: string; last: string };
  /** Keyed by driver-file stem, so every historical path spelling resolves. */
  byStem: Record<string, IndexedCredit[]>;
  byMachine: Record<string, IndexedCredit[]>;
}

export function buildReleaseNoteIndex(credits: readonly ReleaseNoteCredit[]): ReleaseNoteIndex {
  const byStem: Record<string, IndexedCredit[]> = {};
  const byMachine: Record<string, IndexedCredit[]> = {};
  const releases = new Set<string>();
  for (const credit of credits) {
    if (!credit.names.length) continue;
    releases.add(credit.release);
    const compact: IndexedCredit = {
      names: credit.names,
      release: credit.release,
      kind: credit.kind,
    };
    for (const stem of new Set(credit.paths.filter(couldBeDriverPath).map(pathStem))) {
      (byStem[stem] ??= []).push(compact);
    }
    // Only machine credits are keyed by name; a software item that shares a
    // machine's title is a different thing entirely.
    if (credit.kind !== 'software') {
      for (const machine of new Set(credit.machines.map(name => name.toLowerCase()))) {
        (byMachine[machine] ??= []).push(compact);
      }
    }
  }
  const ordered = [...releases].sort((a, b) => releaseOrder(a) - releaseOrder(b));
  return {
    releases: releases.size,
    span: { first: ordered[0] ?? '', last: ordered[ordered.length - 1] ?? '' },
    byStem,
    byMachine,
  };
}

/**
 * Everyone MAMEDEV credited against one driver, from the index. Same ordering
 * as `driverCredits`: a credit for making a machine work outranks a change.
 */
export function creditsFromIndex(
  index: ReleaseNoteIndex,
  driverPath: string,
  machineNames: readonly string[] = [],
): DriverCredit[] {
  const entries: ReleaseNoteCredit[] = [];
  const seen = new Set<IndexedCredit>();
  for (const credit of index.byStem[pathStem(driverPath)] ?? []) {
    seen.add(credit);
    entries.push({ ...credit, paths: [driverPath], machines: [], summary: '' });
  }
  for (const machine of new Set(machineNames.map(name => name.toLowerCase()))) {
    for (const credit of index.byMachine[machine] ?? []) {
      // One note can name both the driver and the machine; it is one credit.
      if (seen.has(credit)) continue;
      seen.add(credit);
      entries.push({ ...credit, paths: [], machines: [machine], summary: '' });
    }
  }
  return driverCredits(entries, driverPath, machineNames);
}
