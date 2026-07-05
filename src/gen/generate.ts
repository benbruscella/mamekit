// Phase 2: knowledge-graph subgraph -> generated browser app.
// Emits out/<game>/app/{index.html, src/config.ts, src/main.ts, runtime copy,
// tsconfig.json} and compiles it with tsc. Everything game-specific comes from
// the graph; everything behavioral comes from the shared runtime.

import { mkdirSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import type { KnowledgeGraph, KGNode } from '../kg/types.ts';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '../..');

export interface GenerateOptions {
  mameSrc: string;
  outDir: string;
  game: string;
}

// keyboard bindings per MAME input type (player 1 / non-cocktail only)
const KEYMAP: Record<string, string[]> = {
  IPT_JOYSTICK_LEFT: ['ArrowLeft'],
  IPT_JOYSTICK_RIGHT: ['ArrowRight'],
  IPT_JOYSTICK_UP: ['ArrowUp'],
  IPT_JOYSTICK_DOWN: ['ArrowDown'],
  IPT_BUTTON1: ['ControlLeft', 'Space'],
  IPT_BUTTON2: ['AltLeft'],
  IPT_START1: ['Digit1'],
  IPT_START2: ['Digit2'],
  IPT_COIN1: ['Digit5'],
  IPT_COIN2: ['Digit6'],
  IPT_SERVICE1: ['Digit9'],
};

class Graph {
  private byId: Map<string, KGNode>;
  private g: KnowledgeGraph;
  constructor(g: KnowledgeGraph) {
    this.g = g;
    this.byId = new Map(g.nodes.map(n => [n.id, n]));
  }
  node(id: string): KGNode | undefined { return this.byId.get(id); }
  out(id: string, rel?: string) {
    return this.g.edges
      .filter(e => e.from === id && (!rel || e.rel === rel))
      .map(e => ({ edge: e, node: this.byId.get(e.to)! }))
      .filter(x => x.node);
  }
  byLabel(label: string): KGNode[] { return this.g.nodes.filter(n => n.label === label); }
}

export async function generate(graph: KnowledgeGraph, opts: GenerateOptions): Promise<void> {
  const g = new Graph(graph);
  const game = g.node(`game:${opts.game}`);
  if (!game) throw new Error(`game:${opts.game} missing from graph`);

  const machine = g.out(game.id, 'USES_MACHINE')[0]?.node;
  const romset = g.out(game.id, 'USES_ROMSET')[0]?.node;
  const inputs = g.out(game.id, 'USES_INPUTS')[0]?.node;
  if (!machine || !romset || !inputs) {
    throw new Error(`graph incomplete for ${opts.game}: machine=${!!machine} romset=${!!romset} inputs=${!!inputs}`);
  }

  const devices = g.out(machine.id, 'HAS_DEVICE').map(d => d.node);
  const byTag = new Map(devices.map(d => [String(d.props.tag), d]));

  // --- cpus + address map ----------------------------------------------------
  const cpuDevs = devices.filter(d => d.props.type === 'Z80');
  if (cpuDevs.length === 0) throw new Error('no Z80 devices found in machine config');
  const cpus = cpuDevs.map(d => ({
    tag: String(d.props.tag),
    clock: Number(d.props.clock),
    region: String(d.props.tag), // galaga family: rom region tag == cpu tag
  }));

  const mapRef = g.out(`device:${machine.props.name}/${cpus[0].tag}`, 'HAS_MAP')[0];
  if (!mapRef) throw new Error(`no address map on ${cpus[0].tag}`);
  const ranges = g.out(mapRef.node.id, 'HAS_RANGE').map(({ node: r }) => {
    const reads = g.out(r.id, 'READS');
    const writes = g.out(r.id, 'WRITES');
    const handlerKey = (h: (typeof reads)[number]) => {
      const tag = h.edge.props?.deviceTag;
      const owner = tag ?? String(h.node.props.ownerClass);
      return `${owner}.${h.node.props.method}`;
    };
    const spec: Record<string, unknown> = {
      start: Number(r.props.start),
      end: Number(r.props.end),
      kind: r.props.rom ? 'rom' : r.props.ram || r.props.writeonly ? 'ram' : 'handler',
    };
    if (r.props.mirror) spec.mirror = Number(r.props.mirror);
    if (r.props.share) spec.share = String(r.props.share);
    if (reads[0]) spec.read = handlerKey(reads[0]);
    if (writes[0]) spec.write = handlerKey(writes[0]);
    if (spec.kind === 'handler' && !spec.read && !spec.write) spec.kind = 'nop';
    return spec;
  });

  // --- screen ------------------------------------------------------------------
  const screenDev = devices.find(d => d.props.type === 'SCREEN');
  const raw = screenDev?.props.screenRaw as number[] | undefined;
  if (!raw) throw new Error('screen raw params missing');
  const [pixclock, htotal, hbend, hbstart, vtotal, vbend, vbstart] = raw;
  const monitor = String(game.props.monitor);
  const screen = {
    width: hbstart - hbend,
    height: vbstart - vbend,
    refresh: pixclock / (htotal * vtotal),
    vtotal,
    vbstart,
    rotate: monitor === 'ROT90' ? 90 : monitor === 'ROT270' ? 270 : monitor === 'ROT180' ? 180 : 0,
  };

  // --- clocks -------------------------------------------------------------------
  const clocks = {
    namco06: Number(byTag.get('06xx')?.props.clock ?? 48000),
    wsg: Number(byTag.get('namco')?.props.clock ?? 96000),
  };

  // --- roms ----------------------------------------------------------------------
  const roms = g.out(romset.id, 'HAS_REGION').map(({ node: region }) => ({
    region: String(region.props.tag),
    size: Number(region.props.size),
    loads: g.out(region.id, 'LOADS').map(({ node: rom }) => ({
      file: String(rom.props.file),
      offset: Number(rom.props.offset),
      size: Number(rom.props.size),
      crc: String(rom.props.crc),
      ...(rom.props.reloadOffsets ? { reloadOffsets: rom.props.reloadOffsets as number[] } : {}),
    })),
  }));

  // --- inputs -----------------------------------------------------------------------
  const ports = g.out(inputs.id, 'HAS_PORT').map(p => p.node);
  const portTags = ports.map(p => String(p.props.tag));
  const bindings: unknown[] = [];
  const dipDefaults: unknown[] = [];
  for (const port of ports) {
    const tag = String(port.props.tag);
    for (const { node: f } of g.out(port.id, 'HAS_FIELD')) {
      const kind = f.props.kind;
      if (kind === 'dip') {
        dipDefaults.push({
          port: tag,
          mask: Number(f.props.mask),
          value: Number(f.props.defaultValue ?? f.props.mask), // unused dips default to off (active low)
          name: String(f.props.name ?? ''),
        });
      } else if (kind === 'service') {
        dipDefaults.push({ port: tag, mask: Number(f.props.mask), value: Number(f.props.mask), name: 'Service Mode' });
      } else if (kind === 'bit') {
        const type = String(f.props.type ?? '');
        const mods = (f.props.modifiers as string[] | undefined) ?? [];
        if (mods.includes('PORT_COCKTAIL')) continue; // player-2 cocktail path: unbound
        const keys = KEYMAP[type];
        if (keys) bindings.push({ port: tag, mask: Number(f.props.mask), keys, label: type });
      }
    }
  }

  // --- emit ---------------------------------------------------------------------------
  const appDir = join(opts.outDir, 'app');
  const srcDir = join(appDir, 'src');
  mkdirSync(srcDir, { recursive: true });

  cpSync(join(projectRoot, 'src/runtime'), join(srcDir, 'runtime'), { recursive: true });

  const title = `${game.props.fullname} (${game.props.company}, ${game.props.year})`;
  const config = {
    game: opts.game,
    title,
    board: { cpus, ranges, screen, clocks },
    roms,
    bindings,
    dipDefaults,
    ports: portTags,
    romUrl: `/roms/${opts.game}.zip`,
    workletUrl: './dist/runtime/wsg-worklet.js',
  };

  writeFileSync(join(srcDir, 'config.ts'), `// GENERATED by mame2js from ${graph.meta.driverFile} — do not edit.
import type { ShellConfig } from './runtime/shell.ts';

export const CONFIG: ShellConfig = ${JSON.stringify(config, null, 2)} as unknown as ShellConfig;
`);

  writeFileSync(join(srcDir, 'main.ts'), `// GENERATED by mame2js — do not edit.
import { runShell } from './runtime/shell.ts';
import { CONFIG } from './config.ts';

runShell(CONFIG).catch(err => {
  console.error(err);
  document.body.insertAdjacentHTML('beforeend',
    '<pre style="color:#f66;padding:12px">' + String(err?.stack ?? err) + '</pre>');
});
`);

  writeFileSync(join(appDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler',
      lib: ['ES2022', 'DOM', 'DOM.Iterable'], strict: true,
      allowImportingTsExtensions: true, rewriteRelativeImportExtensions: true,
      erasableSyntaxOnly: true, verbatimModuleSyntax: true, skipLibCheck: true,
      outDir: 'dist', rootDir: 'src',
    },
    include: ['src'],
    exclude: ['src/**/*.spec.ts'],
  }, null, 2));

  writeFileSync(join(appDir, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><text y='13' font-size='13'>👾</text></svg>">
</head>
<body>
<script type="module" src="./dist/main.js"></script>
<noscript>mame2js needs JavaScript.</noscript>
</body>
</html>
`);

  console.log(`\ngenerated ${appDir}`);
  console.log('compiling app with tsc...');
  const tsc = spawnSync(process.execPath, [join(projectRoot, 'node_modules/typescript/bin/tsc'), '-p', appDir], {
    stdio: 'inherit',
  });
  if (tsc.status !== 0) {
    console.error('tsc failed — app emitted but not compiled');
    process.exitCode = 1;
    return;
  }
  console.log(`app ready: ${join(appDir, 'index.html')}`);
  if (!existsSync(join(projectRoot, 'roms', `${opts.game}.zip`))) {
    console.log(`note: put ${opts.game}.zip in ${join(projectRoot, 'roms')}/ to auto-load ROMs (or drop the zip onto the page)`);
  }
}
