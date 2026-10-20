// Cover scans for the C64 software shelves, from TOSEC's Cover.zip (#159).
//
// The computer room draws each title as a medium -- a tape, a disk, a
// cartridge -- and shows a real cover in its place when one exists under
// .data/artwork/carts/<list>/<name>.webp, the same index the console shelf
// reads its cartridge photography from (src/gen/cart-art.ts). Cover.zip is
// 8,342 scans named by title (`Cover/B/Bounty_Bob_Strikes_Back.jpg`, with
// `_[Back]` and `_[Inlay]` siblings), so a title finds its front by name:
// both sides are normalised to a comparable key -- case, punctuation, a
// trailing or leading "The", parenthesised variants and bracketed scan kinds
// dropped -- and only a front scan is taken.
//
// The wanted set is DERIVED, never listed here: every title on the shelves
// the generated computers declare (dist/games/computers/<machine>/software),
// the PAL and NTSC machines together, keyed by the list short name the shelf
// keys art off.
//
//   node tools/c64-covers.ts                 report what would land, write nothing
//   node tools/c64-covers.ts --apply         write the covers that are missing
//   node tools/c64-covers.ts --zip <path> --machines c64,c64p --height 240
//
// What lands is the reduced `<name>.webp` and nothing else: a tile is drawn
// about 120 CSS px tall, so 240px is already generous, and these ship inside
// dist (WEB_ARTWORK_TREES in src/gen/generate.ts) where every megabyte is the
// deployed site's. The 250 KB sources stay in Cover.zip. Nothing is ever
// overwritten or deleted; an existing file wins.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const option = (name: string, fallback: string): string => {
  const index = argv.indexOf(`--${name}`);
  return index >= 0 && argv[index + 1] ? argv[index + 1]! : fallback;
};
const apply = argv.includes('--apply');
const zip = resolve(projectRoot, option('zip', '.files/Cover.zip'));
const machines = option('machines', 'c64,c64p').split(',').filter(Boolean);
const height = Number(option('height', '240'));
const artRoot = join(projectRoot, '.data/artwork/carts');

/** A title as both sides spell it, reduced to what they share. */
export function coverKey(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/_/g, ' ')
    .trim()
    .replace(/,?\s+the$/i, '')
    .replace(/^the\s+/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

/** A software-list description's title: the part before its region and version notes. */
export function shelfTitle(description: string): string {
  return description.replace(/\s*\(.*$/, '').replace(/\s*\[.*$/, '');
}

interface Wanted { list: string; name: string; description: string; publisher: string }

/**
 * Whether a scan's own parenthesised notes contradict the title. Cover.zip
 * names a re-release by its label -- `Avenger_(Kixx).jpg` is Gremlin's game
 * on Kixx, not Commodore's VIC-10 cartridge of the same name -- so a note
 * that is not a version mark has to appear in the title's publisher.
 */
export function scanContradicts(scan: string, publisher: string): boolean {
  // TOSEC spells names in ASCII (`Br0derbund`), and a note mixes a label with
  // marks of version and medium (`Spinnaker-Cartridge`, `MAX_v2`).
  const fold = (text: string): string => text.normalize('NFKD').toLowerCase()
    .replace(/ø/g, 'o').replace(/0/g, 'o').replace(/[^a-z0-9]+/g, '');
  const owner = fold(publisher);
  const words = [...scan.split('/').pop()!.matchAll(/\(([^)]*)\)/g)]
    .flatMap(note => note[1]!.split(/[\s_\-,&]+/))
    .filter(word => word && !/^(?:v\d.*|\d+|alt\d*|rev\d*|max|cartridge|cart|disk|disks|tape|side\w*|part\w*|budget|release|rerelease)$/i.test(word));
  return words.length > 0 && !words.some(word => fold(word).length > 2 && owner.includes(fold(word)));
}

function wantedTitles(): Wanted[] {
  const seen = new Set<string>();
  const wanted: Wanted[] = [];
  for (const machine of machines) {
    const dir = join(projectRoot, 'dist/games/computers', machine);
    const configPath = join(dir, 'config.json');
    if (!existsSync(configPath)) continue;
    const config = JSON.parse(readFileSync(configPath, 'utf8')) as { software?: { shelves: { list: string; catalogUrl: string }[] } };
    for (const shelf of config.software?.shelves ?? []) {
      const catalog = JSON.parse(readFileSync(join(dir, shelf.catalogUrl), 'utf8')) as { entries: { name: string; description: string; publisher?: string }[] };
      for (const entry of catalog.entries) {
        const key = `${shelf.list}/${entry.name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        wanted.push({ list: shelf.list, name: entry.name, description: entry.description, publisher: entry.publisher ?? '' });
      }
    }
  }
  return wanted;
}

function frontScans(): Map<string, string> {
  const listing = execFileSync('unzip', ['-Z1', zip], { maxBuffer: 64 * 1024 * 1024 }).toString().split('\n');
  const fronts = new Map<string, string>();
  for (const path of listing.filter(name => /\.(jpe?g|png|gif)$/i.test(name)).sort()) {
    const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    if (/\[[^\]]*\]/.test(base)) continue;
    const key = coverKey(base);
    // The plainest spelling wins: `Title.jpg` over `Title_(v2).jpg`.
    const held = fronts.get(key);
    if (!key || (held && !/\(/.test(held.split('/').pop()!))) continue;
    fronts.set(key, path);
  }
  return fronts;
}

function main(): void {
  if (!existsSync(zip)) throw new Error(`no cover archive at ${zip}`);
  const wanted = wantedTitles();
  if (!wanted.length) throw new Error(`no generated shelves for ${machines.join(', ')}: run gen first`);
  const fronts = frontScans();
  const planned: { want: Wanted; scan: string; dest: string }[] = [];
  const present: Wanted[] = [];
  const unmatched: Wanted[] = [];
  const review: { want: Wanted; scan: string }[] = [];
  for (const want of wanted) {
    const dest = join(artRoot, want.list, `${want.name}.webp`);
    if (existsSync(dest)) { present.push(want); continue; }
    const scan = fronts.get(coverKey(shelfTitle(want.description)));
    if (!scan) unmatched.push(want);
    else if (scanContradicts(scan, want.publisher)) review.push({ want, scan });
    else planned.push({ want, scan, dest });
  }
  const byList = new Map<string, { titles: number; covers: number }>();
  for (const want of wanted) {
    const count = byList.get(want.list) ?? { titles: 0, covers: 0 };
    count.titles++;
    if (planned.some(item => item.want === want) || present.includes(want)) count.covers++;
    byList.set(want.list, count);
  }
  console.log(`${fronts.size} front scans in ${zip}`);
  for (const [list, count] of byList) console.log(`  ${list.padEnd(14)} ${count.covers} of ${count.titles} titles have a cover`);
  console.log(`${present.length} already in ${artRoot}, ${planned.length} to write, ${review.length} held for review, ${unmatched.length} without a match`);
  for (const item of review.slice(0, 8)) console.log(`  review ${item.want.list}/${item.want.name} (${item.want.publisher}) ~ ${item.scan}`);
  if (!apply) {
    for (const item of planned.slice(0, 12)) console.log(`  would write ${item.want.list}/${item.want.name}.webp <- ${item.scan}`);
    console.log('dry run: nothing written (--apply writes them)');
    return;
  }
  const scratch = mkdtempSync(join(tmpdir(), 'mamekit-covers-'));
  let bytes = 0;
  try {
    for (const [index, item] of planned.entries()) {
      const source = join(scratch, `scan-${index}`);
      writeFileSync(source, execFileSync('unzip', ['-p', zip, item.scan], { maxBuffer: 64 * 1024 * 1024 }));
      mkdirSync(join(artRoot, item.want.list), { recursive: true });
      execFileSync('cwebp', ['-q', '80', '-resize', '0', String(height), '-quiet', source, '-o', item.dest], { stdio: 'pipe' });
      bytes += statSync(item.dest).size;
      rmSync(source, { force: true });
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
  const report = join(artRoot, '_reports');
  mkdirSync(report, { recursive: true });
  const reportPath = join(report, `c64-covers-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  writeFileSync(reportPath, JSON.stringify({
    zip, written: planned.map(item => ({ list: item.want.list, name: item.want.name, scan: item.scan })),
    review: review.map(item => ({ list: item.want.list, name: item.want.name, publisher: item.want.publisher, scan: item.scan })),
    unmatched: unmatched.map(want => ({ list: want.list, name: want.name, description: want.description })),
  }, null, 2));
  console.log(`wrote ${planned.length} covers (${(bytes / 1e6).toFixed(1)} MB); report ${reportPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
