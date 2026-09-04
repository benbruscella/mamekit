import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { generatedGameOutputs, type GameCategory } from './output-layout.ts';
import {
  machineDossierHtml,
  type DossierData,
} from './dossier.ts';

export const FACETS = [
  { key: 'author', label: 'Contributors', description: 'People who built and maintained the MAME drivers.' },
  { key: 'driver', label: 'Driver source', description: 'Games that share a MAME source file.' },
  { key: 'written-by', label: 'Written-by credit', description: 'Credits preserved in MAME driver headers.' },
  { key: 'cpu', label: 'CPU family', description: 'Machines grouped by processor architecture.' },
  { key: 'sound', label: 'Sound hardware', description: 'Machines grouped by their generated audio system.' },
  { key: 'screen', label: 'Screen format', description: 'Resolution, refresh rate, and orientation.' },
  { key: 'license', label: 'License', description: 'Driver source licenses.' },
  { key: 'manufacturer', label: 'Manufacturer', description: 'The companies named by each game set.' },
  { key: 'year', label: 'Year', description: 'A chronological route through the archive.' },
] as const;

export type FacetKey = (typeof FACETS)[number]['key'];

export interface AuthorContribution {
  name: string;
  commits?: number;
  firstCommit?: string;
  lastCommit?: string;
  topContributor: boolean;
  headerCredit: boolean;
}

export interface ArchiveGame {
  game: string;
  title: string;
  fullname: string;
  category: GameCategory;
  year?: string;
  manufacturer?: string;
  driverFile?: string;
  copyrightHolders?: string;
  license?: string;
  cpus: string[];
  sound?: string;
  screen?: string;
  authors: AuthorContribution[];
}

export interface FacetValue {
  value: string;
  slug: string;
  games: ArchiveGame[];
}

export interface ArchiveIndex {
  games: ArchiveGame[];
  facets: Record<FacetKey, FacetValue[]>;
}

interface MetaShape {
  game?: string;
  title?: string;
  fullname?: string;
  year?: string | number;
  manufacturer?: string;
  driverFile?: string;
  copyrightHolders?: string;
  license?: string;
  gitHistory?: {
    topAuthors?: string[];
    authorStats?: {
      name: string;
      commits: number;
      firstCommit: string;
      lastCommit: string;
    }[];
  };
}

interface ScreenShape {
  width?: number;
  height?: number;
  refresh?: number;
  rotate?: number;
}

interface SoundShape {
  kind?: string;
  chips?: number;
  clock?: number;
}

interface ConfigShape {
  board?: {
    cpus?: { type?: string }[];
    screen?: ScreenShape;
  };
  sound?: SoundShape;
}

const escapeHtml = (value: unknown): string => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

export function stableSlug(value: string): string {
  const slug = value.normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  return slug || 'unknown';
}

export function browseHref(facet: FacetKey, value: string): string {
  return `browse/${facet}/${stableSlug(value)}/`;
}

export function screenFacet(screen: ScreenShape | undefined): string | undefined {
  if (!screen || !Number.isFinite(screen.width) || !Number.isFinite(screen.height)) return undefined;
  const refresh = Number.isFinite(screen.refresh) ? ` @ ${Number(screen.refresh).toFixed(2)} Hz` : '';
  const rotate = screen.rotate ? ` · rotated ${screen.rotate}°` : '';
  return `${screen.width}×${screen.height}${refresh}${rotate}`;
}

export function soundFacet(sound: SoundShape | undefined): string | undefined {
  if (!sound?.kind) return undefined;
  const name = sound.kind === 'none' ? 'Discrete analog board' : sound.kind.toUpperCase();
  return `${name}${sound.chips ? ` × ${sound.chips}` : ''}`;
}

function contributions(meta: MetaShape): AuthorContribution[] {
  const top = new Set(meta.gitHistory?.topAuthors ?? []);
  const header = meta.copyrightHolders?.toLowerCase() ?? '';
  const stats = meta.gitHistory?.authorStats ?? [];
  const names = stats.length ? stats.map(author => author.name) : [...top];
  return [...new Set(names.filter(Boolean))].map(name => {
    const author = stats.find(candidate => candidate.name === name);
    return {
      name,
      ...(author ? {
        commits: author.commits,
        firstCommit: author.firstCommit,
        lastCommit: author.lastCommit,
      } : {}),
      topContributor: top.has(name),
      headerCredit: header.includes(name.toLowerCase()),
    };
  });
}

export function archiveGame(
  category: GameCategory,
  fallbackGame: string,
  meta: MetaShape,
  config: ConfigShape,
): ArchiveGame {
  return {
    game: meta.game ?? fallbackGame,
    title: meta.title ?? meta.fullname ?? fallbackGame,
    fullname: meta.fullname ?? meta.title ?? fallbackGame,
    category,
    ...(meta.year !== undefined ? { year: String(meta.year) } : {}),
    ...(meta.manufacturer ? { manufacturer: meta.manufacturer } : {}),
    ...(meta.driverFile ? { driverFile: meta.driverFile } : {}),
    ...(meta.copyrightHolders ? { copyrightHolders: meta.copyrightHolders } : {}),
    ...(meta.license ? { license: meta.license } : {}),
    cpus: [...new Set((config.board?.cpus ?? [])
      .map(cpu => String(cpu.type ?? '').toUpperCase())
      .filter(Boolean))],
    ...(soundFacet(config.sound) ? { sound: soundFacet(config.sound) } : {}),
    ...(screenFacet(config.board?.screen) ? { screen: screenFacet(config.board?.screen) } : {}),
    authors: contributions(meta),
  };
}

function valuesFor(game: ArchiveGame, facet: FacetKey): string[] {
  switch (facet) {
    case 'author': return game.authors.map(author => author.name);
    case 'driver': return game.driverFile ? [game.driverFile] : [];
    case 'written-by': return game.copyrightHolders ? [game.copyrightHolders] : [];
    case 'cpu': return game.cpus;
    case 'sound': return game.sound ? [game.sound] : [];
    case 'screen': return game.screen ? [game.screen] : [];
    case 'license': return game.license ? [game.license] : [];
    case 'manufacturer': return game.manufacturer ? [game.manufacturer] : [];
    case 'year': return game.year ? [game.year] : [];
  }
}

export function aggregateArchive(games: ArchiveGame[]): ArchiveIndex {
  const sortedGames = [...games].sort((a, b) =>
    (a.year ?? '').localeCompare(b.year ?? '') || a.fullname.localeCompare(b.fullname));
  const facets = {} as Record<FacetKey, FacetValue[]>;
  for (const facet of FACETS) {
    const grouped = new Map<string, ArchiveGame[]>();
    for (const game of sortedGames) {
      for (const value of valuesFor(game, facet.key)) {
        const group = grouped.get(value) ?? [];
        group.push(game);
        grouped.set(value, group);
      }
    }
    facets[facet.key] = [...grouped.entries()]
      .map(([value, members]) => ({ value, slug: stableSlug(value), games: members }))
      .sort((a, b) => facet.key === 'year'
        ? a.value.localeCompare(b.value)
        : a.value.localeCompare(b.value, 'en', { sensitivity: 'base' }));
  }
  return { games: sortedGames, facets };
}

export function readArchive(
  outRoot: string,
  includedTargets?: ReadonlySet<string>,
): ArchiveIndex {
  const games: ArchiveGame[] = [];
  for (const output of generatedGameOutputs(outRoot)) {
    if (includedTargets && !includedTargets.has(output.game)) continue;
    try {
      const meta = JSON.parse(readFileSync(join(output.dir, 'meta.json'), 'utf8')) as MetaShape;
      const config = JSON.parse(readFileSync(join(output.dir, 'config.json'), 'utf8')) as ConfigShape;
      games.push(archiveGame(output.category, output.game, meta, config));
    } catch {
      // A half-generated or legacy directory must not prevent other browse
      // routes from being emitted.
    }
  }
  return aggregateArchive(games);
}

const sharedStyle = `<style>
:root{--night:#080a17;--panel:#121732;--line:#2b3467;--gold:#f2c200;--ink:#eef0ff;--muted:#929bd0}
*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 70% 0,#20285a 0,var(--night) 40%);
color:var(--ink);font:15px/1.55 ui-sans-serif,system-ui,sans-serif}a{color:inherit}.wrap{max-width:1180px;margin:auto;padding:34px 24px 80px}
nav{display:flex;gap:20px;align-items:center;margin-bottom:48px;color:var(--muted)}nav a{text-decoration:none}nav strong{color:var(--gold);margin-right:auto}
.eyebrow{color:var(--gold);font-size:11px;letter-spacing:.18em;text-transform:uppercase;font-weight:800}h1{font-size:clamp(38px,7vw,72px);
line-height:1;margin:10px 0 16px}h2{font-size:22px}.dek{max-width:760px;color:var(--muted);font-size:18px}.grid{display:grid;
grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:38px}.card{display:block;text-decoration:none;background:rgba(18,23,50,.88);
border:1px solid var(--line);border-radius:16px;padding:22px;transition:.16s transform,.16s border-color}.card:hover{transform:translateY(-3px);border-color:var(--gold)}
.card strong{display:block;color:var(--gold);font-size:18px}.card span,.meta{color:var(--muted)}.count{font:800 28px ui-monospace,monospace;float:right;color:#6673b8}
.games{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin-top:28px}.game{display:flex;justify-content:space-between;gap:18px;
text-decoration:none;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:15px 17px}.game:hover{border-color:var(--gold)}
.group{margin:36px 0}.group h2{color:var(--gold);border-bottom:1px solid var(--line);padding-bottom:9px}.context{font-size:12px;color:var(--muted);margin-top:5px}
@media(max-width:760px){.grid,.games{grid-template-columns:1fr}nav{margin-bottom:30px}.wrap{padding-inline:18px}}
</style>`;

function page(title: string, nav: string, body: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>${escapeHtml(title)} — MAME History</title>${sharedStyle}</head><body><div class="wrap"><nav>${nav}</nav>${body}</div></body></html>`;
}

function gameCard(game: ArchiveGame, href: string, context = ''): string {
  return `<a class="game" href="${href}"><span><strong>${escapeHtml(game.fullname)}</strong>` +
    `${context ? `<div class="context">${escapeHtml(context)}</div>` : ''}</span>` +
    `<span class="meta">${escapeHtml([game.manufacturer, game.year].filter(Boolean).join(' · '))}</span></a>`;
}

function archiveIndexHtml(index: ArchiveIndex): string {
  const cards = FACETS.map(facet => {
    const values = index.facets[facet.key];
    return `<a class="card" href="./${facet.key}/"><span class="count">${values.length}</span>` +
      `<strong>${escapeHtml(facet.label)}</strong><span>${escapeHtml(facet.description)}</span></a>`;
  }).join('');
  return page(
    'Browse the archive',
    '<strong>MAME HISTORY</strong><a href="../">Game shelf</a>',
    `<div class="eyebrow">${index.games.length} generated machines · ${FACETS.length} ways in</div>` +
    '<h1>Browse the archive</h1><p class="dek">Follow a person, source file, circuit family, maker, or year. Every fact is a path to related machines.</p>' +
    `<div class="grid">${cards}</div>`,
  );
}

function facetIndexHtml(index: ArchiveIndex, facet: (typeof FACETS)[number]): string {
  const values = index.facets[facet.key];
  const cards = values.map(group =>
    `<a class="card" href="./${group.slug}/"><span class="count">${group.games.length}</span>` +
    `<strong>${escapeHtml(group.value)}</strong><span>${group.games.length === 1 ? '1 machine' : `${group.games.length} machines`}</span></a>`).join('');
  return page(
    facet.label,
    '<strong>MAME HISTORY</strong><a href="../">Browse the archive</a><a href="../../">Game shelf</a>',
    `<div class="eyebrow">Archive facet</div><h1>${escapeHtml(facet.label)}</h1>` +
    `<p class="dek">${escapeHtml(facet.description)}</p><div class="grid">${cards || '<p class="dek">No metadata is available for this facet yet.</p>'}</div>`,
  );
}

function authorPageHtml(group: FacetValue): string {
  const byDriver = new Map<string, ArchiveGame[]>();
  for (const game of group.games) {
    const key = game.driverFile ?? 'Driver source unavailable';
    byDriver.set(key, [...(byDriver.get(key) ?? []), game]);
  }
  const groups = [...byDriver.entries()].map(([driver, games]) => {
    const cards = games.map(game => {
      const author = game.authors.find(candidate => candidate.name === group.value);
      const context = [
        author?.commits ? `${author.commits} commit${author.commits === 1 ? '' : 's'}` : '',
        author?.firstCommit && author.lastCommit
          ? `${author.firstCommit.slice(0, 4)}–${author.lastCommit.slice(0, 4)}`
          : '',
        author?.topContributor ? 'top contributor' : '',
        author?.headerCredit ? 'driver-header credit' : '',
      ].filter(Boolean).join(' · ');
      return gameCard(game, `../../../g/${encodeURIComponent(game.game)}/`, context);
    }).join('');
    return `<section class="group"><h2>${escapeHtml(driver)}</h2><div class="games">${cards}</div></section>`;
  }).join('');
  return page(
    group.value,
    '<strong>MAME HISTORY</strong><a href="../">All contributors</a><a href="../../">Browse the archive</a><a href="../../../">Game shelf</a>',
    `<div class="eyebrow">MAME contributor</div><h1>${escapeHtml(group.value)}</h1>` +
    `<p class="dek">${group.games.length} generated ${group.games.length === 1 ? 'machine' : 'machines'}, grouped by driver source.</p>${groups}`,
  );
}

function facetValueHtml(
  facet: (typeof FACETS)[number],
  group: FacetValue,
): string {
  const cards = group.games.map(game =>
    gameCard(game, `../../../g/${encodeURIComponent(game.game)}/`)).join('');
  return page(
    group.value,
    `<strong>MAME HISTORY</strong><a href="../">All ${escapeHtml(facet.label.toLowerCase())}</a>` +
      '<a href="../../">Browse the archive</a><a href="../../../">Game shelf</a>',
    `<div class="eyebrow">${escapeHtml(facet.label)}</div><h1>${escapeHtml(group.value)}</h1>` +
    `<p class="dek">${group.games.length} generated ${group.games.length === 1 ? 'machine' : 'machines'} share this fact.</p>` +
    `<div class="games">${cards}</div>`,
  );
}

export interface EmittedArchive {
  games: number;
  facetValues: number;
  routes: number;
  dossiers: number;
}

export function emitArchiveRoutes(
  outRoot: string,
  appDir: string,
  includedTargets?: ReadonlySet<string>,
): EmittedArchive {
  const index = readArchive(outRoot, includedTargets);
  const browseDir = join(appDir, 'browse');
  mkdirSync(browseDir, { recursive: true });
  writeFileSync(join(browseDir, 'index.html'), archiveIndexHtml(index));
  writeFileSync(join(browseDir, 'index.json'), JSON.stringify(index, null, 2));
  let routes = 1;
  let facetValues = 0;
  for (const facet of FACETS) {
    const facetDir = join(browseDir, facet.key);
    mkdirSync(facetDir, { recursive: true });
    writeFileSync(join(facetDir, 'index.html'), facetIndexHtml(index, facet));
    routes++;
    for (const group of index.facets[facet.key]) {
      const valueDir = join(facetDir, group.slug);
      mkdirSync(valueDir, { recursive: true });
      writeFileSync(join(valueDir, 'index.html'),
        facet.key === 'author' ? authorPageHtml(group) : facetValueHtml(facet, group));
      facetValues++;
      routes++;
    }
  }

  let dossiers = 0;
  for (const output of generatedGameOutputs(outRoot)) {
    const dossierPath = join(output.dir, 'dossier.json');
    if (!existsSync(dossierPath)) continue;
    try {
      const dossier = JSON.parse(readFileSync(dossierPath, 'utf8')) as DossierData;
      const dossierDir = join(appDir, 'g', output.game, 'dossier');
      mkdirSync(dossierDir, { recursive: true });
      writeFileSync(join(dossierDir, 'index.html'),
        machineDossierHtml(dossier, { dataPath: `games/${output.category}/${output.game}` }));
      dossiers++;
      routes++;
    } catch {
      // Legacy/corrupt dossiers do not block the rest of the static archive.
    }
  }
  return { games: index.games.length, facetValues, routes, dossiers };
}
