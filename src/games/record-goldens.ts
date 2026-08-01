import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { GameAcceptanceGolden } from './types.ts';
import { runGameAcceptance } from './acceptance-harness.ts';
import { loadGameContracts } from './contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function replaceGolden(source: string, golden: GameAcceptanceGolden): string {
  const marker = '  golden: ';
  const markerAt = source.indexOf(marker);
  if (markerAt < 0) throw new Error('game contract has no golden property');
  const start = source.indexOf('{', markerAt + marker.length);
  if (start < 0) throw new Error('game contract has a malformed golden property');
  const end = objectEnd(source, start);
  const rendered = renderGolden(golden).replace(/\n/g, '\n  ');
  return `${source.slice(0, start)}${rendered}${source.slice(end + 1)}`;
}

function renderGolden(golden: GameAcceptanceGolden): string {
  const lines = ['{', '  regions: {'];
  for (const [name, value] of Object.entries(golden.regions)) {
    lines.push(`    ${property(name)}: '${value}',`);
  }
  lines.push('  },', '  checkpoints: {');
  for (const [frame, value] of Object.entries(golden.checkpoints)) {
    lines.push(
      `    ${property(frame)}: { video: '${value.video}', state: '${value.state}' },`,
    );
  }
  lines.push(
    '  },',
    '  audio: {',
    `    writes: ${golden.audio.writes},`,
    `    nonzeroWrites: ${golden.audio.nonzeroWrites},`,
    `    writeHash: '${golden.audio.writeHash}',`,
    `    pcmHash: '${golden.audio.pcmHash}',`,
    `    rms: ${golden.audio.rms},`,
    '  },',
    '}',
  );
  return lines.join('\n');
}

function property(name: string): string {
  return /^(?:0|[1-9]\d*|[A-Za-z_$][\w$]*)$/.test(name)
    ? name
    : `'${name}'`;
}

async function record(games: readonly string[], formatOnly = false): Promise<void> {
  const contracts = await loadGameContracts();
  const selected = games.length
    ? contracts.filter(contract => games.includes(contract.game))
    : contracts;
  const missing = games.filter(game => !selected.some(contract => contract.game === game));
  if (missing.length) throw new Error(`unknown supported game(s): ${missing.join(', ')}`);

  for (const contract of selected) {
    const golden = formatOnly
      ? contract.golden
      : await runGameAcceptance(contract, projectRoot, { recording: true });
    if (!golden) throw new Error(`${contract.game}: no acceptance golden is recorded`);
    const sourcePath = join(projectRoot, 'src/games', `${contract.game}.ts`);
    const source = readFileSync(sourcePath, 'utf8');
    const updated = replaceGolden(source, golden);
    if (updated !== source) writeFileSync(sourcePath, updated);
    console.log(`${contract.game}: ${formatOnly ? 'formatted' : 'recorded'}`);
  }
}

function objectEnd(source: string, start: number): number {
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < source.length; index++) {
    const char = source[index]!;
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === '{') depth++;
    else if (char === '}' && --depth === 0) return index;
  }
  throw new Error('unterminated object');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const formatOnly = args.includes('--format-only');
  await record(args.filter(arg => arg !== '--format-only'), formatOnly);
}
