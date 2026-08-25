// Fetch the local, gitignored presentation package for one or more targets.
//
// Two archives cover it, and both are the sources docs/CONTRIBUTING.md names:
// the MAME artwork collection on archive.org supplies each board's bezel pack
// and default.lay, and the Arcade Database mirrors progetto-SNAPS flyers,
// cabinets and marquees under the same MAME short names.
//
// Usage: node tools/download-artwork.ts [game ...]
// With no argument it fetches whatever every discovered game contract is still
// missing, so the target list stays derived rather than hand-kept.

import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { discoverGameNames } from '../src/games/discovery.ts';

const root = resolve(import.meta.dirname, '..');
const artwork = join(root, '.data/artwork');
const mediaKinds = [
  { remote: 'flyers', local: 'covers' },
  { remote: 'cabinets', local: 'media/cabinets' },
  { remote: 'marquees', local: 'media/marquees' },
] as const;

/** Everything a complete local package holds for one target. */
function packageFiles(game: string): string[] {
  return [
    join(artwork, `${game}.zip`),
    ...mediaKinds.map(kind => join(artwork, kind.local, `${game}.png`)),
  ];
}

const requested = process.argv.slice(2).filter(argument => !argument.startsWith('-'));
const games = requested.length
  ? requested
  : discoverGameNames(join(root, 'src/games'))
    .filter(game => packageFiles(game).some(file => !existsSync(file)));
if (!games.length) {
  console.log('artwork: every discovered game already has a local package');
  process.exit(0);
}
const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const fallbackBezels: Record<string, {
  url: string;
  screen: { x: number; y: number; width: number; height: number };
}> = {
  simpsons: {
    url: 'https://raw.githubusercontent.com/thebezelproject/bezelproject-MAME/master/retroarch/overlay/ArcadeBezels/simpsons.png',
    screen: { x: 260, y: 20, width: 1400, height: 1039 },
  },
  tutankhm: {
    url: 'https://raw.githubusercontent.com/thebezelproject/bezelproject-MAME/master/retroarch/overlay/ArcadeBezels/tutankhm.png',
    screen: { x: 552, y: 4, width: 815, height: 1071 },
  },
  wardner: {
    url: 'https://raw.githubusercontent.com/thebezelproject/bezelproject-MAME/master/retroarch/overlay/ArcadeBezels/wardner.png',
    screen: { x: 259, y: 18, width: 1403, height: 1043 },
  },
};

function validPng(path: string): boolean {
  if (!existsSync(path)) return false;
  const bytes = readFileSync(path).subarray(0, pngSignature.length);
  return pngSignature.every((value, index) => bytes[index] === value);
}

async function download(url: string, target: string, validate?: (path: string) => boolean): Promise<void> {
  if (existsSync(target) && (!validate || validate(target))) return;
  const response = await fetch(url, { headers: { 'user-agent': 'MAMEKIT artwork preservation downloader' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const temporary = `${target}.part`;
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(temporary, new Uint8Array(await response.arrayBuffer()));
  if (validate && !validate(temporary)) throw new Error(`invalid downloaded asset ${url}`);
  renameSync(temporary, target);
}

async function buildFallbackBezel(game: string, target: string): Promise<void> {
  if (existsSync(target)) return;
  const fallback = fallbackBezels[game];
  if (!fallback) throw new Error('not present in official MAME artwork archive');
  const temporary = mkdtempSync(join(tmpdir(), `mamekit-${game}-artwork-`));
  try {
    const image = join(temporary, 'bezel.png');
    await download(fallback.url, image, validPng);
    const { x, y, width, height } = fallback.screen;
    writeFileSync(join(temporary, 'default.lay'), `<?xml version="1.0"?>
<mamelayout version="2">
  <element name="bezel"><image file="bezel.png" /></element>
  <view name="Bezel">
    <screen index="0"><bounds x="${x}" y="${y}" width="${width}" height="${height}" /></screen>
    <element ref="bezel"><bounds x="0" y="0" width="1920" height="1080" /></element>
  </view>
</mamelayout>
`);
    mkdirSync(dirname(target), { recursive: true });
    const zip = spawnSync('zip', ['-q', '-j', target, join(temporary, 'default.lay'), image]);
    if (zip.error) throw zip.error;
    if (zip.status !== 0) throw new Error(`zip exited ${zip.status}`);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

function repairKnownLayoutTypos(): void {
  const target = join(artwork, 'spyhunt.zip');
  if (!existsSync(target)) return;
  const extracted = spawnSync('unzip', ['-p', target, 'default.lay'], { encoding: 'utf8' });
  if (extracted.status !== 0) throw new Error('cannot inspect spyhunt default.lay');
  const corrected = extracted.stdout.replace('file="lego_missiles"', 'file="lego_missiles.png"');
  if (corrected === extracted.stdout) return;
  const temporary = mkdtempSync(join(tmpdir(), 'mamekit-spyhunt-layout-'));
  try {
    const layout = join(temporary, 'default.lay');
    writeFileSync(layout, corrected);
    const zip = spawnSync('zip', ['-q', '-j', target, layout]);
    if (zip.error) throw zip.error;
    if (zip.status !== 0) throw new Error(`zip exited ${zip.status}`);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

async function pool<T>(values: readonly T[], work: (value: T) => Promise<void>, concurrency = 8): Promise<string[]> {
  const failures: string[] = [];
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < values.length) {
      const value = values[next++]!;
      try {
        await work(value);
      } catch (error) {
        failures.push(`${String(value)}: ${(error as Error).message}`);
      }
    }
  }));
  return failures;
}

const metadataResponse = await fetch('https://archive.org/metadata/artwork_202505');
if (!metadataResponse.ok) throw new Error(`artwork metadata: HTTP ${metadataResponse.status}`);
const metadata = await metadataResponse.json() as { files: { name: string }[] };
const archiveNames = new Set(metadata.files.map(file => file.name));

const bezelFailures = await pool(games, async game => {
  const name = `${game}.zip`;
  if (!archiveNames.has(name)) {
    await buildFallbackBezel(game, join(artwork, name));
    return;
  }
  await download(
    `https://archive.org/download/artwork_202505/${encodeURIComponent(name)}`,
    join(artwork, name),
  );
}, 6);
repairKnownLayoutTypos();

const mediaFailures = await pool(
  games.flatMap(game => mediaKinds.map(kind => ({ game, ...kind }))),
  async ({ game, remote, local }) => download(
    `https://adb.arcadeitalia.net/media/mame.current/${remote}/${game}.png`,
    join(artwork, local, `${game}.png`),
    validPng,
  ),
  10,
);

console.log(
  `artwork: ${games.length - bezelFailures.length}/${games.length} bezel packs, ` +
  `${games.length * mediaKinds.length - mediaFailures.length}/` +
  `${games.length * mediaKinds.length} media images ` +
  `(${games.join(', ')})`,
);
for (const failure of [...bezelFailures, ...mediaFailures]) console.log(`missing: ${failure}`);
