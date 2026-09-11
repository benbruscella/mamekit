// Fetch MAMEDEV's published release notes into `.data/release-notes/`, which
// is where `src/gen/release-notes.ts` reads the credits it attributes drivers
// with.
//
// Fetching is a separate, explicit step and never part of generation:
// generation must stay offline and deterministic, so absent notes degrade to no
// credits rather than to a network call. The notes are MAMEDEV's own prose, so
// they live in the gitignored asset tree beside roms and artwork and are never
// committed — `make sync-release-notes` in .data/ mirrors them.
//
// Re-run this after every MAME update: a release whose notes were never fetched
// contributes no credits at all.
//
// Releases are discovered from MAMEDEV's own index (oldrel.html) rather than
// probed by number, so MESS's separate notes (0.148-0.161, which is where the
// console and computer driver credits of that era live) are picked up too.
//
// Releases before 0.100 are deliberately skipped. Their notes name files under
// a source layout that no longer exists (`src/drivers/pacman.c`), and mapping
// those onto today's paths across two decades of reorganisation is exactly the
// guesswork this project refuses to publish as attribution.
//
//   node tools/fetch-release-notes.ts                # every release >= 0.100
//   node tools/fetch-release-notes.ts --from 0.250
//   node tools/fetch-release-notes.ts --digest-only  # re-digest what is stored

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mameSourceVersion } from '../src/gen/listxml.ts';
import { releaseNotesDir } from '../src/paths.ts';
import {
  buildReleaseNoteIndex,
  parseReleaseNotes,
  type ReleaseNoteCredit,
} from '../src/gen/release-notes.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const notesRoot = releaseNotesDir(projectRoot);
const rawRoot = join(notesRoot, 'raw');

const flag = (name: string): string | undefined => {
  const index = process.argv.indexOf(name);
  return index > 0 ? process.argv[index + 1] : undefined;
};

const minor = (version: string): number => Number(version.replace(/^0\./, ''));
const label = (release: number): string => `0.${release}`;

/** The oldest release whose notes name a source layout still recognisable. */
const OLDEST_USABLE = 100;

/** `whatsnew_0289.txt` / `messnew_0161.txt` -> 289 / 161. Betas return undefined. */
export function releaseOfFile(name: string): number | undefined {
  const match = /^(?:whatsnew|messnew)_(\d+)\.txt$/.exec(name);
  if (!match) return undefined;
  // 4-digit forms are 0.100+; 3-digit forms are the pre-0.100 releases.
  return match[1].length === 4 ? Number(match[1]) : undefined;
}

async function noteFiles(): Promise<string[]> {
  const index = await fetch('https://www.mamedev.org/oldrel.html');
  if (!index.ok) throw new Error(`oldrel.html: HTTP ${index.status}`);
  const html = await index.text();
  const found = new Set<string>();
  for (const [, name] of html.matchAll(/(?:whatsnew|messnew)_[0-9a-z]+\.txt/g)) {
    found.add(name);
  }
  for (const match of html.matchAll(/(whatsnew|messnew)_[0-9a-z]+\.txt/g)) found.add(match[0]);
  return [...found].sort();
}

async function fetchFile(name: string): Promise<'cached' | 'fetched' | 'missing'> {
  const target = join(rawRoot, name);
  if (existsSync(target)) return 'cached';
  const response = await fetch(`https://www.mamedev.org/releases/${name}`);
  if (!response.ok) return 'missing';
  writeFileSync(target, await response.text());
  return 'fetched';
}

function digest(): { credits: number; releases: number; drivers: number } {
  const credits: ReleaseNoteCredit[] = [];
  const releases = readdirSync(rawRoot)
    .filter(name => releaseOfFile(name) !== undefined)
    .sort();
  for (const name of releases) {
    const release = releaseOfFile(name);
    if (release === undefined) continue;
    credits.push(...parseReleaseNotes(
      label(release),
      readFileSync(join(rawRoot, name), 'utf8'),
    ));
  }
  const provenance = {
    // Whoever reads these should know how little they are allowed to claim.
    source: 'https://www.mamedev.org/releases/',
    note: 'Credits as published by MAMEDEV in release notes. Not a complete '
      + 'record of authorship, and never derived from commit history.',
  };
  writeFileSync(join(notesRoot, 'credits.json'), JSON.stringify({
    ...provenance,
    releases: releases.length,
    credits,
  }));
  // What generation actually reads: same credits, keyed by driver path and by
  // machine name, without the prose.
  const index = buildReleaseNoteIndex(credits);
  writeFileSync(join(notesRoot, 'index.json'), JSON.stringify({ ...provenance, ...index }));
  return {
    credits: credits.length,
    releases: releases.length,
    drivers: Object.keys(index.byStem).length,
  };
}

async function main(): Promise<void> {
  mkdirSync(rawRoot, { recursive: true });
  if (!process.argv.includes('--digest-only')) {
    const source = mameSourceVersion(resolve(process.env.MAME_SRC ?? '../mame'));
    const newest = minor(flag('--to') ?? source ?? '0.289');
    const oldest = minor(flag('--from') ?? label(OLDEST_USABLE));
    // The checkout's own release is not on oldrel.html until it is superseded.
    const listed = await noteFiles();
    const wanted = [...new Set([...listed, `whatsnew_0${newest}.txt`])]
      .filter(name => {
        const release = releaseOfFile(name);
        return release !== undefined && release >= oldest && release <= newest;
      })
      .sort();
    let fetched = 0;
    let missing = 0;
    for (const name of wanted) {
      const outcome = await fetchFile(name);
      if (outcome === 'fetched') fetched++;
      if (outcome === 'missing') missing++;
    }
    console.log(`release notes: ${wanted.length} listed by MAMEDEV in range `
      + `${label(oldest)}-${label(newest)}, ${fetched} fetched, ${missing} unavailable `
      + `(${listed.length - wanted.length} outside the range, skipped)`);
  }
  const digested = digest();
  console.log(`release notes digested: ${digested.credits} credits from `
    + `${digested.releases} releases across ${digested.drivers} source files `
    + '-> .data/release-notes/{credits,index}.json');
}

await main();
