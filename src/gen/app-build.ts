import { mkdirSync, writeFileSync, cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { cacheIdentityFromEnv, cachingDisabled, copyTree, entryTree, genCacheRoot, hashTree, readEntry, writeEntry } from './gen-cache.ts';
import { deriveBezelArtwork, copyBezelArtwork } from './bezel-artwork.ts';
import { GAME_CATEGORIES, gameOutputDir } from './output-layout.ts';
import { emitArchiveRoutes } from './archive.ts';
import { emitHomePage } from './home.ts';
import { readBuildManifest } from './build-manifest.ts';
import { stageGeneratedBoards } from './app-targets.ts';
import { inputKeys, sixButtonKeys } from './input-bindings.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const WEB_ARTWORK_TREES = ['covers', 'media/marquees', 'media/cabinets', 'media/consoles', 'media/computers', 'carts/nes'];

async function shipWebArtwork(outRoot: string): Promise<void> {
  const source = join(projectRoot, '.data/artwork');
  const target = join(outRoot, 'artwork');
  rmSync(target, { recursive: true, force: true });
  if (!existsSync(source)) return;
  let shipped = 0;
  let bytes = 0;
  for (const tree of WEB_ARTWORK_TREES) {
    const from = join(source, tree);
    if (!existsSync(from)) continue;
    for (const name of readdirSync(from)) {
      if (!name.endsWith('.webp')) continue;
      const dest = join(target, tree, name);
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(join(from, name), dest);
      shipped++;
      bytes += statSync(dest).size;
    }
  }
  const bezels = await deriveBezelArtwork(source);
  if (bezels?.shipped) {
    copyBezelArtwork(source, target);
    shipped += bezels.shipped;
    bytes += bezels.bytes;
    const saved = bezels.sourceBytes
      ? ` (re-encoded ${(bezels.sourceBytes / 1048576).toFixed(1)} MB of PNG -> ` +
        `${(bezels.bytes / 1048576).toFixed(1)} MB)`
      : '';
    console.log(
      `bezels: ${bezels.shipped} resolved${bezels.unresolved ? `, ${bezels.unresolved} without a usable lay` : ''}${saved}`,
    );
  }
  if (shipped) {
    console.log(`web artwork: ${shipped} images (${(bytes / 1048576).toFixed(1)} MB) -> dist/artwork`);
  }
}

export async function buildApp(
  outRoot: string,
  includedTargets?: readonly string[],
): Promise<boolean> {
  const included = includedTargets ? new Set(includedTargets) : undefined;
  const appDir = join(outRoot, 'app');
  const runtimeCoreDir = join(outRoot, 'runtime/core');
  const buildDir = join(outRoot, '.build');
  const srcDir = join(buildDir, 'src');
  // Recreate every compiled tree so renamed modules cannot survive a rebuild.
  rmSync(appDir, { recursive: true, force: true });
  rmSync(runtimeCoreDir, { recursive: true, force: true });
  rmSync(buildDir, { recursive: true, force: true });
  mkdirSync(appDir, { recursive: true });
  mkdirSync(join(srcDir, 'app'), { recursive: true });

  cpSync(join(projectRoot, 'src/runtime'), join(srcDir, 'runtime/core'), {
    recursive: true,
    filter: source => !source.endsWith('.spec.ts'),
  });
  // The neutral IR ships alongside the runtime as dist/runtime/ir. Staging it
  // one level above runtime/core keeps every `../ir/...` import resolving to
  // the same place it does in src, so no path rewriting is needed.
  cpSync(join(projectRoot, 'src/ir'), join(srcDir, 'runtime/ir'), {
    recursive: true,
    filter: source => !source.endsWith('.spec.ts'),
  });
  // Capability packages ship only their runtime-facing files. extract.ts pulls
  // in the compiler and acceptance.ts drives dist from Node; neither belongs in
  // the browser bundle, and excluding them here is what keeps that true.
  cpSync(join(projectRoot, 'src/hardware'), join(srcDir, 'runtime/hardware'), {
    recursive: true,
    filter: source => !['.spec.ts', '/extract.ts', '/acceptance.ts', '/registry.ts',
      '/acceptance-registry.ts'].some(name => source.endsWith(name)),
  });
  const hardwareImports: string[] = [];
  const cpuBindings: string[] = [];
  const deviceBindings: string[] = [];
  const hardwareManifestPath = join(outRoot, 'runtime/generated/hardware-manifest.json');
  if (existsSync(hardwareManifestPath)) {
    // The generated hardware tree is hundreds of MB; copyTree clones on APFS.
    copyTree(join(outRoot, 'runtime/generated'), join(srcDir, 'runtime/generated'));
    const manifest = JSON.parse(readFileSync(hardwareManifestPath, 'utf8')) as {
      hardware?: {
        type: string;
        executable?: boolean;
        executableKind?: 'cpu' | 'device' | 'audio' | 'composition';
        executableArtifact?: string;
      }[];
    };
    for (const hardware of manifest.hardware ?? []) {
      if (!hardware.executable) continue;
      const slug = hardware.type.toLowerCase();
      if (!['cpu', 'device'].includes(hardware.executableKind ?? '')) continue;
      const binding = hardware.executableKind === 'device'
        ? `device_${deviceBindings.length}`
        : `cpu_${cpuBindings.length}`;
      hardwareImports.push(
        `import ${binding} from '../runtime/generated/devices/${slug}.ts';`,
      );
      if (hardware.executableKind === 'device') deviceBindings.push(binding);
      else cpuBindings.push(binding);
    }
  }
  const generatedEntries = stageGeneratedBoards(outRoot, srcDir, included);
  const generatedImports = generatedEntries.map(({ binding, dataPath }) =>
    `import ${binding} from '../${dataPath}/generated/board.ts';`);
  writeFileSync(join(srcDir, 'app/registry.ts'), `// GENERATED by mamekit — do not edit.
import { registerGeneratedMachine } from '../runtime/core/generated-machine.ts';
import { registerGeneratedBoard } from '../runtime/core/generated-board.ts';
import { registerGeneratedCpu } from '../runtime/core/generated-cpu.ts';
import { registerGeneratedDevice } from '../runtime/core/generated-device.ts';
${hardwareImports.join('\n')}
${generatedImports.join('\n')}

const games = [
${generatedEntries.map(entry =>
    `  { dataPath: '${entry.dataPath}', board: ${entry.binding} },`).join('\n')}
];

export function registerGeneratedMachines(): void {
  for (const cpu of [${cpuBindings.join(', ')}]) registerGeneratedCpu(cpu);
  for (const device of [${deviceBindings.join(', ')}]) registerGeneratedDevice(device);
  for (const { board } of games) {
    registerGeneratedMachine(board.machine);
    registerGeneratedBoard(board.machine.game, board.createBoard);
  }
}

export function generatedGamePath(game: string): string | undefined {
  return games.find(entry => entry.board.machine.game === game)?.dataPath;
}
`);

  writeFileSync(join(srcDir, 'app/main.ts'), `// GENERATED by mamekit — do not edit.
// Unified app: no ?g= -> boot menu; ?g=<game> -> load that game's generated
// config (pure knowledge-graph data) and run it.
import { runShell, type ShellConfig } from '../runtime/core/shell.ts';
import { runConsole } from '../runtime/core/console.ts';
import { runSoftwareRoom } from '../runtime/core/software.ts';
import { runMenu } from '../runtime/core/menu.ts';
import { generatedGamePath, registerGeneratedMachines } from './registry.ts';

registerGeneratedMachines();

// force https on real domains: AudioWorklet (all sound) needs a secure
// context, and github's own enforcement only kicks in after cert issuance
if (location.protocol === 'http:' && !/^(localhost|127\\.|192\\.168\\.|10\\.)/.test(location.hostname)) {
  location.replace(location.href.replace(/^http:/, 'https:'));
}

// game comes from the pretty route /app/g/<game>/ or the legacy ?g= param
const game = decodeURIComponent(/\\/g\\/([^/]+)\\/?$/.exec(location.pathname)?.[1] ?? '')
  || new URLSearchParams(location.search).get('g');
const fail = (err: unknown) => {
  console.error(err);
  document.body.insertAdjacentHTML('beforeend',
    '<pre style="color:#f66;padding:12px">' + String((err as Error)?.stack ?? err) + '</pre>');
};
if (game) {
  const dataPath = generatedGamePath(game);
  if (!dataPath) fail(new Error(\`no generated board for "\${game}"\`));
  else fetch(\`../\${dataPath}/config.json\`)
    .then(r => { if (!r.ok) throw new Error(\`no generated config for "\${game}" — run: mamekit \${game}\`); return r.json(); })
    .then(cfg => (cfg as ShellConfig).kind === 'console'
      ? runConsole(cfg as ShellConfig)   // console room: cart shelf, drop zone, per-cart boot
      : (cfg as ShellConfig).kind === 'computer'
        ? runSoftwareRoom(cfg as ShellConfig) // software room: one shelf per software list
        : runShell(cfg as ShellConfig))
    .catch(fail);
} else {
  runMenu().catch(fail);
}
`);

  writeFileSync(join(buildDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'], strict: true,
      resolveJsonModule: true,
      allowImportingTsExtensions: true, rewriteRelativeImportExtensions: true,
      erasableSyntaxOnly: true, verbatimModuleSyntax: true, skipLibCheck: true,
      outDir: 'out', rootDir: 'src',
    },
    include: ['src'],
  }, null, 2));

  // per-build stamp on the module URL: browsers cache module scripts hard,
  // and pages' CDN adds 10 min — the query flips both on every deploy
  const stamp = Date.now().toString(36);
  writeFileSync(join(appDir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MAME History</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>👾</text></svg>">
</head>
<body>
<script type="module" src="./main.js?v=${stamp}"></script>
<noscript>mamekit needs JavaScript.</noscript>
</body>
</html>
`);

  // pretty per-game routes: /app/g/<game>/ as REAL directories (static hosts
  // have no rewrites). <base href="../../"> makes every relative URL resolve
  // exactly as it does on /app/, so the one compiled bundle serves all routes.
  for (const category of GAME_CATEGORIES) {
    const categoryDir = join(outRoot, 'games', category);
    if (!existsSync(categoryDir)) continue;
    for (const entry of readdirSync(categoryDir)) {
      if (included && !included.has(entry)) continue;
      const gameDir = gameOutputDir(outRoot, category, entry);
      if (!existsSync(join(gameDir, 'meta.json'))) continue;
      let title = entry;
      try { title = JSON.parse(readFileSync(join(gameDir, 'meta.json'), 'utf8')).title ?? entry; } catch { /* keep slug */ }
      const dir = join(appDir, 'g', entry);
      mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<base href="../../">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>👾</text></svg>">
</head>
<body>
<script type="module" src="./main.js?v=${stamp}"></script>
<noscript>mamekit needs JavaScript.</noscript>
</body>
</html>
`);
    }
  }

  // The staged tree is tsc's complete input, so its content hash keys the
  // compiled output; the shared identity tag keeps entries answerable to the
  // MAME revision + compiler source they were built from.
  const compiledDir = join(buildDir, 'out');
  const tscCacheId = cachingDisabled() ? undefined : cacheIdentityFromEnv();
  const tscEntryDir = tscCacheId
    ? join(genCacheRoot(), 'app-tsc', hashTree(buildDir).slice(0, 24))
    : undefined;
  if (
    tscEntryDir && tscCacheId &&
    readEntry(tscEntryDir, tscCacheId) && existsSync(entryTree(tscEntryDir))
  ) {
    copyTree(entryTree(tscEntryDir), compiledDir);
    console.log('unified app: compiled output restored from cache');
  } else {
    console.log('compiling unified app with tsc...');
    // One program type-checks every generated device and CPU. The T-Unit
    // video device alone is 4 MB (MAME instantiates all 256 dma_draw
    // template variants), which took tsc past Node's default heap.
    const tsc = spawnSync(process.execPath, [
      '--max-old-space-size=8192',
      join(projectRoot, 'node_modules/typescript/bin/tsc'),
      '-p',
      join(buildDir, 'tsconfig.json'),
    ], {
      stdio: 'inherit',
    });
    if (tsc.status !== 0) {
      console.error('tsc failed — app emitted but not compiled');
      rmSync(buildDir, { recursive: true, force: true });
      rmSync(appDir, { recursive: true, force: true });
      rmSync(runtimeCoreDir, { recursive: true, force: true });
      return false;
    }
    if (tscEntryDir && tscCacheId) {
      copyTree(compiledDir, entryTree(tscEntryDir));
      writeEntry(tscEntryDir, tscCacheId);
    }
  }
  for (const group of ['app', 'runtime', 'games']) {
    const compiledGroup = join(compiledDir, group);
    if (!existsSync(compiledGroup)) continue;
    cpSync(compiledGroup, join(outRoot, group), { recursive: true });
  }
  // tsc only emits JSON modules that are imported by executable code. The
  // closure manifest, hardware graph/report and device IR are build products
  // consumed by audits and the catalog, so restore the complete staged
  // generated tree after overlaying its compiled JavaScript modules.
  const stagedGenerated = join(srcDir, 'runtime/generated');
  if (existsSync(stagedGenerated)) {
    cpSync(stagedGenerated, join(outRoot, 'runtime/generated'), {
      recursive: true,
      // Incremental hardware generation replaces the TypeScript/IR first.
      // Any JavaScript beside it belongs to the previous compilation and must
      // not overwrite the modules tsc just emitted into the output tree.
      filter: source => !source.endsWith('.js') && !source.endsWith('.js.map'),
    });
  }
  const archive = emitArchiveRoutes(outRoot, appDir, included);
  await shipWebArtwork(outRoot);
  // The front door at / (relative links, so it works under a Pages base
  // path): what this is, how it is built, and what plays it. It reads the
  // shipped flyers, so it is written after the artwork lands.
  const home = emitHomePage(outRoot, {
    keyFor: type => inputKeys('', type),
    fighterKeyFor: sixButtonKeys,
    mameRevision: readBuildManifest(outRoot)?.mameRevision,
    included,
  });
  console.log(`home page: ${home.machines} machines, ${home.covers} flyers -> ${join(outRoot, 'index.html')}`);
  rmSync(buildDir, { recursive: true, force: true });
  console.log(
    `archive ready: ${archive.games} games, ${archive.facetValues} facet pages, ` +
    `${archive.dossiers} dossiers`,
  );
  console.log(`app ready: ${join(appDir, 'index.html')}`);
  return true;
}

