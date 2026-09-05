// mamekit CLI
//   mamekit <game>            full pipeline: graph -> generate -> build web app
//   mamekit graph <game>      knowledge graph only (graph.json + graph.cypher)
//   mamekit from-graph <game> rebuild from a graph snapshot (no MAME required)
// options:
//   --mame-src <path>   MAME source root (default: auto-detect / $MAME_SRC)
//   --out <dir>         output root (default: <mamekit>/out)
//   --targets <games>   comma-separated runtime closure targets

import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  defaultGeneratorJobs,
  retryableGeneratorSignal,
  retryableRuntimeCrash,
} from './gen/generator-workers.ts';
import {
  cacheIdentity,
  cachingDisabled,
  copyTree,
  disableCaching,
  entryTree,
  genCacheRoot,
  hashBytes,
  readEntry,
  verifyGenCache,
  writeEntry,
  type CacheIdentity,
} from './gen/gen-cache.ts';
import { buildGraph, gameSubgraph } from './kg/build.ts';
import { toCypher } from './kg/cypher.ts';
import { viewerHtml } from './kg/viewer.ts';
import {
  existingGameOutputDir,
  gameCategory,
  gameOutputDir,
  isGameCategory,
} from './gen/output-layout.ts';
import { artworkDir } from './paths.ts';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');

function usage(): never {
  console.error('usage: mamekit [graph|from-graph|init-game|dev-game|check-game|promote-game] <game>');
  console.error('       mamekit <game> --from-graph [graph.json]');
  console.error('       mamekit --all              generate every required target, then the app');
  console.error('                  [--jobs <n>]   parallel target generators (default: memory-aware, max 8)');
  console.error('                  [--no-cache]   ignore .cache/ and re-derive everything from MAME source');
  console.error('       mamekit --build-runtime [--build-app] [--targets <game,...>]');
  console.error('       mamekit --serve            serve the unified app + all generated games');
  console.error('                  [--no-build]   serve dist exactly as it is, without recompiling the app');
  process.exit(2);
}

const argv = process.argv.slice(2);
const positional: string[] = [];
const opts: Record<string, string> = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith('--')) {
    positional.push(a);
    continue;
  }
  const key = a.slice(2);
  const next = argv[i + 1];
  if (key === 'serve') {
    opts[key] = next && /^\d+$/.test(next) ? argv[++i] : 'true';
  } else if (key === 'from-graph') {
    opts[key] = next && next.endsWith('.json') ? argv[++i] : 'true';
  } else if (
    key === 'skip-app' || key === 'build-app' || key === 'build-runtime' ||
    key === 'all' || key === 'no-cache' || key === 'no-build'
  ) {
    opts[key] = 'true';
  } else {
    opts[key] = next && !next.startsWith('--') ? argv[++i] : '';
  }
}

const namedCommands = new Set([
  'graph', 'from-graph', 'init-game', 'dev-game', 'check-game', 'promote-game',
]);
const command = 'from-graph' in opts
  ? 'from-graph'
  : namedCommands.has(positional[0] ?? '') ? positional[0]! : 'run';
const game = namedCommands.has(positional[0] ?? '')
  ? positional[1]
  : positional[0];
const serveOnly = !game && ('serve' in opts || argv.includes('--serve'));
const buildAppOnly = !game && 'build-app' in opts;
const buildRuntimeOnly = !game && 'build-runtime' in opts;
const generateAll = !game && 'all' in opts;
if (!game && !serveOnly && !buildAppOnly && !buildRuntimeOnly && !generateAll) usage();

const isolatedCommand = command === 'init-game' || command === 'dev-game';
const outRoot = resolve(opts.out ?? (isolatedCommand && game
  ? join(projectRoot, '.cache/dev', game)
  : join(projectRoot, 'dist')));
const explicitMameSrc = opts['mame-src'] ?? process.env.MAME_SRC;
const sourceRequired = command === 'run' || command === 'graph' ||
  command === 'init-game' || command === 'dev-game' || generateAll;
const detectedMameSrc = serveOnly ? '' : detectMameSrc(sourceRequired);
const mameSrc = serveOnly
  ? ''
  : explicitMameSrc
    ? resolve(explicitMameSrc)
    : detectedMameSrc;

function detectMameSrc(required: boolean): string {
  // mamekit conventionally lives inside or next to a mame checkout
  const candidates = [
    resolve(projectRoot, '..'),         // mamekit inside the mame repo
    resolve(projectRoot, '../mame'),    // mamekit as a sibling of the mame repo
    process.cwd(),
  ];
  for (const candidate of candidates) {
    if (existsSync(join(candidate, 'src/mame'))) return candidate;
  }
  if (!required) return '';
  console.error('error: cannot find MAME source tree; pass --mame-src or set $MAME_SRC');
  process.exit(1);
}

function readDriverCache(): Record<string, string> {
  const cacheFile = join(outRoot, '.driver-cache.json');
  let cache: Record<string, string> = {};
  if (existsSync(cacheFile)) {
    try { cache = JSON.parse(readFileSync(cacheFile, 'utf8')); } catch { /* rebuild */ }
  }
  return cache;
}

/** Index every MAME driver in one filesystem pass so parallel children only read. */
function rebuildDriverCache(): Record<string, string> {
  const cache: Record<string, string> = {};
  // Rows may carry a leading index comment; console/system years may contain ?.
  const gameRe =
    /^\s*(?:\/\*[^*]*\*\/\s*)?(?:GAME[XL]?|CONS|SYST|COMP)\(\s*[\d?]{4},\s*([A-Za-z0-9_]+)\s*,/gm;
  const root = join(mameSrc, 'src/mame');
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop()!;
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) stack.push(full);
      else if (entry.endsWith('.cpp')) {
        const text = readFileSync(full, 'utf8');
        gameRe.lastIndex = 0;
        for (let match = gameRe.exec(text); match; match = gameRe.exec(text)) {
          cache[match[1]!] = full.slice(mameSrc.length + 1);
        }
      }
    }
  }
  mkdirSync(outRoot, { recursive: true });
  writeFileSync(join(outRoot, '.driver-cache.json'), JSON.stringify(cache, null, 2));
  return cache;
}

/** Locate the driver .cpp that defines GAME/CONS/SYST/COMP(..., <game>, ...) — cached. */
function findDriverFile(game: string): string {
  let cache = readDriverCache();
  if (cache[game] && existsSync(join(mameSrc, cache[game]))) return join(mameSrc, cache[game]);
  cache = rebuildDriverCache();
  if (cache[game] && existsSync(join(mameSrc, cache[game]))) return join(mameSrc, cache[game]);
  const root = join(mameSrc, 'src/mame');
  console.error(`error: no driver in ${root} defines game "${game}"`);
  process.exit(1);
}

/**
 * The gen:all cache pre-step. One identity — MAME HEAD + mamekit src hash —
 * is decided here for this process and every worker it spawns; each cache
 * entry is verified against it and drifted entries are pruned, so whatever
 * the build reuses afterwards is exactly current. Without a clean MAME git
 * revision there is nothing sound to verify against, so caching turns off.
 */
let cacheId: CacheIdentity | undefined;
function prepareGenCache(): void {
  if ('no-cache' in opts) {
    disableCaching();
    console.log('mamekit: cache disabled (--no-cache)');
    return;
  }
  cacheId = cacheIdentity(mameSrc);
  if (!cacheId) {
    disableCaching();
    console.log('mamekit: cache disabled — MAME checkout is dirty or has no git revision');
    return;
  }
  const { valid, pruned } = verifyGenCache(cacheId);
  console.log(
    `mamekit: cache verified — mame @ ${cacheId.mameRevision.slice(0, 12)}, ` +
    `src ${cacheId.srcHash.slice(0, 12)}: ${valid} entries valid` +
    (pruned ? `, ${pruned} drifted pruned` : ''),
  );
}

/** Driver index depends only on the MAME tree; reuse it across builds. */
function primeDriverIndex(): Record<string, string> {
  const entryDir = join(genCacheRoot(), 'driver-index', 'index');
  if (cacheId && readEntry(entryDir, cacheId)) {
    try {
      const index = JSON.parse(
        readFileSync(join(entryDir, 'index.json'), 'utf8'),
      ) as Record<string, string>;
      mkdirSync(outRoot, { recursive: true });
      writeFileSync(join(outRoot, '.driver-cache.json'), JSON.stringify(index, null, 2));
      return index;
    } catch { /* unreadable — rebuild below */ }
  }
  const index = rebuildDriverCache();
  if (cacheId) {
    writeEntry(entryDir, cacheId);
    writeFileSync(join(entryDir, 'index.json'), JSON.stringify(index));
  }
  return index;
}

function storeTargetCache(target: string): void {
  if (!cacheId) return;
  const outDir = existingGameOutputDir(outRoot, target);
  if (!outDir) return;
  const entryDir = join(genCacheRoot(), 'targets', target);
  copyTree(outDir, entryTree(entryDir));
  writeEntry(entryDir, cacheId, { game: target, category: basename(dirname(outDir)) });
}

async function generateTargetsInParallel(targets: readonly string[]): Promise<void> {
  // Prime the shared index before children start. Each target otherwise writes
  // independently under dist/games/<category>/<game>.
  const cache = primeDriverIndex();
  const absent = targets.filter(target => !cache[target]);
  if (absent.length) throw new Error(`MAME drivers not found: ${absent.join(', ')}`);

  // Verified cache entries restore in place of a generator run; the rest
  // regenerate and refresh their entries in the same pass.
  const pending: string[] = [];
  let restored = 0;
  for (const target of targets) {
    const entryDir = join(genCacheRoot(), 'targets', target);
    const entry = cacheId ? readEntry(entryDir, cacheId) : undefined;
    if (entry && existsSync(entryTree(entryDir))) {
      if (!isGameCategory(entry.category)) {
        throw new Error(`${target}: cached target has unknown category ${String(entry.category)}`);
      }
      copyTree(entryTree(entryDir), gameOutputDir(outRoot, entry.category, target));
      restored++;
    } else {
      pending.push(target);
    }
  }
  if (restored) console.log(`mamekit: restored ${restored}/${targets.length} targets from cache`);
  if (!pending.length) return;

  const requested = Number(opts.jobs ?? process.env.MAMEKIT_JOBS);
  const jobs = Number.isInteger(requested) && requested > 0
    ? Math.min(requested, pending.length)
    : defaultGeneratorJobs(pending.length);
  console.log(`mamekit: generating ${pending.length} targets with ${jobs} workers`);

  let next = 0;
  let failure: Error | undefined;
  const worker = async (): Promise<void> => {
    while (!failure) {
      const index = next++;
      const target = pending[index];
      if (!target) return;
      try {
        const output = await generateTargetProcess(target);
        console.log(`mamekit: generated ${target} (${index + 1}/${pending.length})`);
        if (output.trim()) console.log(output.trimEnd());
        storeTargetCache(target);
      } catch (error) {
        failure = error as Error;
      }
    }
  };
  await Promise.all(Array.from({ length: jobs }, () => worker()));
  if (failure) throw failure;
}

/**
 * Build (or restore) the hardware closure for exactly these targets. The
 * cache key is the byte content of every target graph plus the shared
 * identity, so any change in what the targets use re-derives the closure.
 */
async function emitClosureFromGraphs(targets: readonly string[], root = outRoot): Promise<void> {
  const graphs = targets.map(target => {
    const graphPath = join(
      existingGameOutputDir(root, target) ?? gameOutputDir(root, 'arcade', target),
      'graph.json',
    );
    if (!existsSync(graphPath)) {
      throw new Error(`cannot build runtime hardware closure: missing ${graphPath}`);
    }
    return { game: target, bytes: readFileSync(graphPath) };
  });
  console.log(`\nmamekit: resolving MAME hardware used by ${graphs.length} targets`);
  const entryDir = cacheId
    ? join(genCacheRoot(), 'closure', hashBytes(...graphs.map(graph => graph.bytes)).slice(0, 24))
    : undefined;
  let summary: { types: number; sourceResolved: number; unresolved: number };
  const cachedEntry = entryDir && cacheId ? readEntry(entryDir, cacheId) : undefined;
  if (entryDir && cachedEntry && existsSync(entryTree(entryDir))) {
    copyTree(entryTree(entryDir), join(root, 'runtime/generated'));
    summary = cachedEntry.summary as typeof summary;
    console.log('mamekit: hardware closure restored from cache');
  } else {
    const { buildHardwareClosure, emitHardwareClosure } = await import('./mame/hardware.ts');
    const closure = buildHardwareClosure(mameSrc, graphs.map(graph => ({
      game: graph.game,
      graph: JSON.parse(graph.bytes.toString('utf8')),
    })));
    await emitHardwareClosure(closure, root, defaultGeneratorJobs());
    summary = closure.summary;
    if (entryDir && cacheId) {
      copyTree(join(root, 'runtime/generated'), entryTree(entryDir));
      writeEntry(entryDir, cacheId, { summary, targets: [...targets] });
    }
  }
  const { refreshRuntimeReports } = await import('./gen/runtime-report.ts');
  const refreshedReports = refreshRuntimeReports(root);
  console.log(
    `generated hardware closure: ${summary.sourceResolved}/${summary.types} ` +
    `types source-resolved, ${summary.unresolved} unresolved; ` +
    `${refreshedReports} generation reports refreshed`,
  );
}

function generateTargetProcess(target: string, attempt = 1): Promise<string> {
  return new Promise((resolveProcess, rejectProcess) => {
    const child = spawn(process.execPath, [
      join(projectRoot, 'bin/mamekit.js'),
      target,
      '--skip-app',
      '--mame-src',
      mameSrc,
      '--out',
      outRoot,
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.once('error', rejectProcess);
    child.once('exit', (code, signal) => {
      if (code === 0) {
        resolveProcess(stdout);
        return;
      }
      const crashed = retryableGeneratorSignal(signal) || retryableRuntimeCrash(stderr);
      if (attempt === 1 && crashed) {
        console.warn(
          `mamekit: ${target} worker crashed with ` +
          `${signal ?? 'a Node internal assertion'}; retrying once`,
        );
        generateTargetProcess(target, attempt + 1).then(resolveProcess, rejectProcess);
        return;
      }
      rejectProcess(new Error(
        `${target}: generator exited ${code ?? `from signal ${signal}`}` +
        `${stderr.trim() ? `\n${stderr.trimEnd()}` : ''}`,
      ));
    });
  });
}

/**
 * Newest runtime-facing source file that postdates the compiled app shell, if
 * any. `--no-build` trades freshness for start-up time, so it reports what it
 * is serving stale rather than leaving that to be discovered in the browser.
 */
function staleAppSources(root: string): string {
  const builtAt = statSync(join(root, 'app/main.js')).mtimeMs;
  let newest = '';
  let newestAt = builtAt;
  const stack = ['src/runtime', 'src/ir', 'src/hardware'].map(dir => join(projectRoot, dir));
  while (stack.length) {
    const dir = stack.pop()!;
    if (!existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const info = statSync(full);
      if (info.isDirectory()) stack.push(full);
      else if (info.mtimeMs > newestAt) {
        newestAt = info.mtimeMs;
        newest = full.slice(projectRoot.length + 1);
      }
    }
  }
  return newest;
}

// ---------------------------------------------------------------------------

if (generateAll) {
  // One pass over every required target, then one hardware closure and app
  // build across exactly those targets. Most are discovered from acceptance
  // contracts; consoles may temporarily contribute synthetic-only targets.
  const { GENERATION_TARGETS, PUBLISHED_TARGETS } = await import('./gen/targets.ts');
  const { loadGenerationGameContracts } = await import('./games/contracts.ts');
  await loadGenerationGameContracts();
  // Quick cache pre-step: verify every entry against the current MAME
  // revision + mamekit source before anything is reused.
  prepareGenCache();
  // A complete build owns the output directory. Starting clean prevents
  // deleted or renamed generated modules surviving from an earlier build.
  rmSync(outRoot, { recursive: true, force: true });
  await generateTargetsInParallel(GENERATION_TARGETS);
  await emitClosureFromGraphs(GENERATION_TARGETS);
  const { buildApp } = await import('./gen/generate.ts');
  if (!await buildApp(outRoot, PUBLISHED_TARGETS)) process.exitCode = 1;
  else {
    const { gamesManifest } = await import('./serve.ts');
    const { writeBuildManifest } = await import('./gen/build-manifest.ts');
    writeBuildManifest(
      outRoot,
      GENERATION_TARGETS,
      mameSrc,
      String(process.hrtime.bigint()),
      PUBLISHED_TARGETS,
    );
    writeFileSync(join(outRoot, 'games.json'),
      await gamesManifest(outRoot, artworkDir(projectRoot)));
    console.log(`\nmamekit: distribution generated at ${outRoot}`);
  }
} else if (buildAppOnly || buildRuntimeOnly) {
  const { REQUIRED_TARGETS, PUBLISHED_TARGETS } = await import('./gen/targets.ts');
  const targets = opts.targets
    ? opts.targets.split(',').map(target => target.trim()).filter(Boolean)
    : [...REQUIRED_TARGETS];
  const unknownTargets = targets.filter(target => !REQUIRED_TARGETS.includes(target));
  if (!targets.length || unknownTargets.length) {
    throw new Error(
      `invalid runtime closure targets: ${unknownTargets.length ? unknownTargets.join(', ') : '(none)'}`,
    );
  }
  prepareGenCache();
  await emitClosureFromGraphs(targets);
  if (!buildAppOnly) process.exit(0);
  const { buildApp } = await import('./gen/generate.ts');
  const publishedTargets = targets.filter(target => PUBLISHED_TARGETS.includes(target));
  if (!await buildApp(outRoot, publishedTargets)) {
    process.exitCode = 1;
  } else {
    const { writeBuildManifest } = await import('./gen/build-manifest.ts');
    // gamesManifest validates the catalog against this manifest, so make the
    // updated closure self-describing before asking it to build games.json.
    writeBuildManifest(outRoot, targets, mameSrc, String(process.hrtime.bigint()), publishedTargets);
    const { gamesManifest } = await import('./serve.ts');
    writeFileSync(join(outRoot, 'games.json'),
      await gamesManifest(outRoot, artworkDir(projectRoot)));
  }
} else if (serveOnly) {
  if ('no-build' in opts) {
    // Serve whatever is already in dist. The app shell is compiled from src at
    // serve time by default, so skipping it means the browser can be running
    // older JS than the working tree; say so rather than let it look emulated.
    if (!existsSync(join(outRoot, 'app/main.js'))) {
      console.error(
        `error: no compiled app at ${join(outRoot, 'app')} — ` +
        'run `npm run gen:all` (or `npm run serve:build`) first',
      );
      process.exit(1);
    }
    const drift = staleAppSources(outRoot);
    console.log(
      drift
        ? `mamekit: serving ${outRoot} as-is — app is older than ${drift} ` +
          '(run `npm run serve:build` to recompile)'
        : `mamekit: serving ${outRoot} as-is (no app rebuild)`,
    );
  } else {
    const { buildApp } = await import('./gen/generate.ts');
    const { readBuildManifest } = await import('./gen/build-manifest.ts');
    const manifest = readBuildManifest(outRoot);
    if (!manifest) throw new Error('generate a build manifest before serving the app');
    if (!await buildApp(outRoot, manifest.publishedTargets)) process.exit(1);
  }
  const { serve } = await import('./serve.ts');
  const port = await serve(
    { '': outRoot }, // neither ROMs nor artwork are served from .data
    Number(opts.serve) || 8280,
  );
  console.log(`\nserving http://localhost:${port}/app/  (menu; games at /app/g/<game>/)`);
} else if (command === 'init-game') {
  await initializeGame(game!);
} else if (command === 'dev-game') {
  await developGame(game!);
} else if (command === 'check-game') {
  await checkGame(game!);
} else if (command === 'promote-game') {
  await promoteGameCommand(game!);
} else if (command === 'from-graph') {
  await pipelineFromGraph(game!);
} else {
  await pipeline(game!);
}

/**
 * `batched` marks a target generated as part of a full --all build: the catalog
 * and closure are written once at the end, so an intermediate manifest here
 * would describe a tree that is deliberately still incomplete.
 */
async function pipeline(
  game: string,
  root = outRoot,
  batched = false,
  forceSkipApp = false,
): Promise<void> {
console.log(`mamekit: searching MAME source at ${mameSrc}`);
const driverFile = findDriverFile(game);
console.log(`mamekit: driver for "${game}" -> ${driverFile.slice(mameSrc.length + 1)}`);

const graph = buildGraph(mameSrc, driverFile);
const sub = gameSubgraph(graph, game);
if (!sub.nodes.some(n => n.id === `game:${game}`)) {
  console.error(`error: game "${game}" not found in parsed graph (parser gap?)`);
  process.exit(1);
}

const category = gameCategory(sub.nodes.find(node => node.id === `game:${game}`)?.props.kind);
const outDir = gameOutputDir(root, category, game);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'graph.full.json'), JSON.stringify(graph, null, 2));
writeFileSync(join(outDir, 'graph.json'), JSON.stringify(sub, null, 2));
writeFileSync(join(outDir, 'graph.cypher'), toCypher(sub));
writeFileSync(join(outDir, 'viewer.html'), viewerHtml(sub, `${game} — knowledge graph`));
writeFileSync(join(outDir, 'viewer.full.html'), viewerHtml(graph, `${basename(driverFile)} driver — knowledge graph`));

const counts = new Map<string, number>();
for (const n of sub.nodes) counts.set(n.label, (counts.get(n.label) ?? 0) + 1);
console.log(`\nknowledge graph for "${game}": ${sub.nodes.length} nodes, ${sub.edges.length} edges`);
for (const [label, count] of [...counts.entries()].sort()) {
  console.log(`  ${label.padEnd(16)} ${count}`);
}
console.log(`\nwrote ${join(outDir, 'graph.json')} (+ graph.full.json, graph.cypher)`);

// quick human-readable digest of the essentials
const devices = sub.nodes.filter(n => n.label === 'Device');
if (devices.length) {
  console.log('\ndevices:');
  for (const d of devices) {
    const clock = typeof d.props.clock === 'number' ? ` @ ${(d.props.clock / 1e6).toFixed(3)} MHz` : '';
    console.log(`  ${String(d.props.type).padEnd(16)} "${d.props.tag}"${clock}`);
  }
}
const regions = sub.nodes.filter(n => n.label === 'RomRegion' && n.id.startsWith(`region:${game}/`));
if (regions.length) {
  console.log('\nrom regions:');
  for (const r of regions) {
    console.log(`  ${String(r.props.tag).padEnd(10)} 0x${Number(r.props.size).toString(16)}`);
  }
}

if (command === 'run' || command === 'init-game' || command === 'dev-game') {
  const { generate, buildApp } = await import('./gen/generate.ts');
  await generate(sub, { mameSrc, outDir, game, fullGraph: graph });
  // A batched --all build compiles one unified app after every target and the
  // shared hardware closure exist. Compiling here would rebuild the same app
  // once per target against an intentionally incomplete catalog.
  const skipApp = forceSkipApp || batched || 'skip-app' in opts;
  if (!skipApp) {
    // A target generation initially writes its report before the distribution
    // hardware manifest is consulted. Refresh reports from the existing
    // closure before building the catalog, otherwise a known-working target
    // is incorrectly grouped as blocked until the next full --all build.
    const { refreshRuntimeReports } = await import('./gen/runtime-report.ts');
    refreshRuntimeReports(root);
    if (!await buildApp(root)) process.exitCode = 1;
  }
  // static manifest so the built tree is servable as plain files (github
  // pages); the dev server's live /games.json route shadows it locally
  if (!batched && !skipApp) {
    const { gamesManifest } = await import('./serve.ts');
    writeFileSync(join(root, 'games.json'),
      await gamesManifest(root, artworkDir(projectRoot)));
  }
}

if ('serve' in opts || argv.includes('--serve')) {
  const { serve } = await import('./serve.ts');
  const port = await serve(
    { '': outRoot, artwork: artworkDir(projectRoot) }, // ROMs are never served
    Number(opts.serve) || 8280,
  );
  console.log(
    `\nserving http://localhost:${port}/app/  ` +
    `(game: /app/g/${game}/, viewer: /games/${category}/${game}/viewer.html)`,
  );
}
}

async function initializeGame(game: string): Promise<void> {
  let generationFailure: unknown;
  try {
    await pipeline(game, outRoot, false, true);
  } catch (error) {
    generationFailure = error;
  }
  const outputDir = existingGameOutputDir(outRoot, game);
  if (!outputDir) throw new Error(`${game}: generator did not create an output directory`);
  const graph = JSON.parse(readFileSync(join(outputDir, 'graph.json'), 'utf8'));
  const { readCapabilityGapReports, writeCapabilityGapReport } = await import('./gen/capability-gap.ts');
  writeCapabilityGapReport(
    outputDir,
    graph,
    readCapabilityGapReports(join(projectRoot, '.cache/dev')),
    generationFailure ? [String((generationFailure as Error).message)] : [],
  );
  // Early compiler failures (such as an unsupported CPU) have no shell config
  // to scaffold from. Preserve their diagnostic and dossier instead of hiding
  // the cause behind a missing-config filesystem error.
  const configPath = join(outputDir, 'config.json');
  if (!existsSync(configPath)) {
    console.error(`mamekit: generation blocked; capability dossier written to ${join(outputDir, 'CAPABILITY_GAP.md')}`);
    throw generationFailure ?? new Error(`${game}: generator did not create config.json`);
  }
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const { deriveCandidateContract, writeCandidateScaffold } = await import('./games/onboarding.ts');
  const written = writeCandidateScaffold(projectRoot, deriveCandidateContract(graph, config));
  console.log(`\nmamekit: candidate registered at ${written.modulePath}`);
  console.log(`mamekit: edit ${written.specPath} after play-testing the input scenario`);
  if (generationFailure) {
    console.log('mamekit: candidate scaffolded with unresolved generation work; see CAPABILITY_GAP.md');
  } else {
    await finishIsolatedBuild(game);
  }
}

async function developGame(game: string): Promise<void> {
  prepareGenCache();
  let generationFailure: unknown;
  try {
    await pipeline(game, outRoot, false, true);
  } catch (error) {
    generationFailure = error;
  }
  const outputDir = existingGameOutputDir(outRoot, game);
  if (!outputDir) throw new Error(`${game}: generator did not create an output directory`);
  const graph = JSON.parse(readFileSync(join(outputDir, 'graph.json'), 'utf8'));
  const { readCapabilityGapReports, writeCapabilityGapReport } = await import('./gen/capability-gap.ts');
  writeCapabilityGapReport(
    outputDir,
    graph,
    readCapabilityGapReports(join(projectRoot, '.cache/dev')),
    generationFailure ? [String((generationFailure as Error).message)] : [],
  );
  if (generationFailure) {
    console.error(`mamekit: generation blocked; capability dossier written to ${join(outputDir, 'CAPABILITY_GAP.md')}`);
    throw generationFailure;
  }
  await finishIsolatedBuild(game);
  // Hardware extraction refreshes the runtime report during the isolated
  // build. Reflect that result rather than the initial discovery-only gaps.
  const finalReport = writeCapabilityGapReport(
    outputDir, graph, readCapabilityGapReports(join(projectRoot, '.cache/dev')),
  );
  console.log(`mamekit: ${finalReport.generationGaps.length} capability gaps; see ${join(outputDir, 'CAPABILITY_GAP.md')}`);
}

async function finishIsolatedBuild(game: string): Promise<void> {
  await emitClosureFromGraphs([game], outRoot);
  const { buildApp } = await import('./gen/generate.ts');
  if (!await buildApp(outRoot, [game])) {
    process.exitCode = 1;
    return;
  }
  const { writeBuildManifest } = await import('./gen/build-manifest.ts');
  const { gamesManifest } = await import('./serve.ts');
  writeBuildManifest(outRoot, [game], mameSrc, String(process.hrtime.bigint()), [game]);
  writeFileSync(join(outRoot, 'games.json'), await gamesManifest(outRoot, artworkDir(projectRoot)));
  console.log(`\nmamekit: isolated build at ${outRoot}`);
}

async function checkGame(game: string): Promise<void> {
  const { gameRegistration } = await import('./games/discovery.ts');
  const registration = gameRegistration(game, join(projectRoot, 'src/games'));
  if (!registration) throw new Error(`${game}: no accepted, candidate, or disabled registration`);
  if (registration.lifecycle === 'disabled') {
    console.log(`${game}: registration is disabled; no readiness claim made`);
    return;
  }
  const { loadRegisteredGameContracts } = await import('./games/contracts.ts');
  const loaded = (await loadRegisteredGameContracts([registration.lifecycle]))
    .filter(item => item.target.game === game);
  if (!loaded.length) throw new Error(`${game}: contract did not load`);
  const outputDir = existingGameOutputDir(outRoot, game);
  if (!outputDir) {
    console.log(`${game}: ${registration.lifecycle} contract valid; no generated output at ${outRoot}`);
    return;
  }
  const reportPath = join(outputDir, 'runtime-report.json');
  if (!existsSync(reportPath)) throw new Error(`${game}: generated output has no runtime report`);
  const report = JSON.parse(readFileSync(reportPath, 'utf8')) as {
    playable?: boolean;
    generationGaps?: string[];
  };
  console.log(`${game}: ${registration.lifecycle} contract valid; runtime ${report.playable ? 'playable' : 'blocked'}`);
  if (report.generationGaps?.length) console.log(`  ${report.generationGaps.length} generation gaps`);
  if (registration.lifecycle === 'accepted' && !report.playable) process.exitCode = 1;
}

async function promoteGameCommand(game: string): Promise<void> {
  const { gameRegistration } = await import('./games/discovery.ts');
  const registration = gameRegistration(game, join(projectRoot, 'src/games'));
  if (registration?.lifecycle !== 'candidate') throw new Error(`${game}: no candidate registration exists`);
  const { loadRegisteredGameContracts } = await import('./games/contracts.ts');
  const loaded = (await loadRegisteredGameContracts(['candidate']))
    .filter(item => item.target.game === game);
  const { validateGameContract } = await import('./games/contract-validation.ts');
  for (const scenario of loaded) validateGameContract(scenario.contract, 'accepted');
  const outputDir = existingGameOutputDir(outRoot, game);
  const runtimePath = outputDir && join(outputDir, 'runtime-report.json');
  if (!runtimePath || !existsSync(runtimePath)) {
    throw new Error(`${game}: generate a runtime report before promotion`);
  }
  const runtime = JSON.parse(readFileSync(runtimePath, 'utf8')) as { playable?: boolean };
  if (!runtime.playable) throw new Error(`${game}: runtime report is not playable`);
  const audit = spawnSync(process.execPath, [join(projectRoot, 'tools/audit-game-package.ts'), game], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, MAMEKIT_OUT_ROOT: outRoot },
  });
  if (audit.status !== 0) throw new Error(`${game}: package audit failed; candidate was not promoted`);
  const { promoteCandidate } = await import('./games/onboarding.ts');
  promoteCandidate(projectRoot, game);
  console.log(`${game}: package audit passed and candidate promoted to accepted`);
}

async function pipelineFromGraph(game: string): Promise<void> {
  const graphPath = resolve(
    opts['from-graph'] && opts['from-graph'] !== 'true'
      ? opts['from-graph']
      : join(
          existingGameOutputDir(outRoot, game) ?? gameOutputDir(outRoot, 'arcade', game),
          'graph.json',
        ),
  );
  if (!existsSync(graphPath)) {
    console.error(`error: graph snapshot not found: ${graphPath}`);
    process.exit(1);
  }

  const loaded = JSON.parse(readFileSync(graphPath, 'utf8'));
  const sub = gameSubgraph(loaded, game);
  if (!sub.nodes.some(n => n.id === `game:${game}`)) {
    console.error(`error: graph snapshot does not contain game "${game}"`);
    process.exit(1);
  }

  const fullPath = join(dirname(graphPath), 'graph.full.json');
  const fullGraph = existsSync(fullPath)
    ? JSON.parse(readFileSync(fullPath, 'utf8'))
    : loaded;
  const category = gameCategory(sub.nodes.find(node => node.id === `game:${game}`)?.props.kind);
  const outDir = gameOutputDir(outRoot, category, game);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'graph.json'), JSON.stringify(sub, null, 2));
  writeFileSync(join(outDir, 'graph.cypher'), toCypher(sub));
  writeFileSync(join(outDir, 'viewer.html'), viewerHtml(sub, `${game} — knowledge graph`));

  console.log(`mamekit: rebuilding "${game}" from ${graphPath}`);
  console.log(`knowledge graph: ${sub.nodes.length} nodes, ${sub.edges.length} edges`);

  const { generate, buildApp } = await import('./gen/generate.ts');
  await generate(sub, { mameSrc, outDir, game, fullGraph });
  if (!('skip-app' in opts)) {
    const { refreshRuntimeReports } = await import('./gen/runtime-report.ts');
    refreshRuntimeReports(outRoot);
    if (!await buildApp(outRoot)) process.exitCode = 1;
  }
  const { gamesManifest } = await import('./serve.ts');
  writeFileSync(join(outRoot, 'games.json'),
    await gamesManifest(outRoot, artworkDir(projectRoot)));

  if ('serve' in opts) {
    const { serve } = await import('./serve.ts');
    const port = await serve(
      { '': outRoot, artwork: artworkDir(projectRoot) },
      Number(opts.serve) || 8280,
    );
    console.log(`\nserving http://localhost:${port}/app/`);
  }
}
