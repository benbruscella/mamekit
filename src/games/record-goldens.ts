import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { GameAcceptanceGolden } from './types.ts';
import { runGameAcceptance } from './acceptance-harness.ts';
import { loadRegisteredGameContracts } from './contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function replaceGolden(source: string, golden: GameAcceptanceGolden): string {
  const marker = '  golden: ';
  const markerAt = source.indexOf(marker);
  if (markerAt < 0) {
    const end = Math.max(source.lastIndexOf('\n});'), source.lastIndexOf('\n};'));
    if (end < 0) throw new Error('game contract has no object terminator');
    const rendered = renderGolden(golden).replace(/\n/g, '\n  ');
    return `${source.slice(0, end)}\n  golden: ${rendered},${source.slice(end)}`;
  }
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

/** Fraction of sound writes a re-record may move before it is called out. */
const AUDIO_WRITE_SWING = 0.05;

async function record(games: readonly string[], formatOnly = false): Promise<void> {
  const loaded = await loadRegisteredGameContracts(['accepted', 'candidate']);
  const contracts = loaded.map(entry => entry.contract);
  const selected = games.length
    ? contracts.filter(contract => games.includes(contract.game))
    : contracts;
  const missing = games.filter(game => !selected.some(contract => contract.game === game));
  if (missing.length) throw new Error(`unknown supported game(s): ${missing.join(', ')}`);

  const swings: { game: string; before: number; after: number }[] = [];
  for (const contract of selected) {
    const golden = formatOnly
      ? contract.golden
      : await runGameAcceptance(contract, projectRoot, { recording: true });
    if (!golden) throw new Error(`${contract.game}: no acceptance golden is recorded`);
    // A re-record is how a real regression gets blessed. Gyruss lost half its
    // sound writes to a scheduling change and Juno First a third, and both
    // were recorded straight over because the picture was untouched and no
    // hard assertion moved. The write count is the one number that noticed,
    // so a large swing has to be stated out loud rather than silently stored.
    const before = contract.golden?.audio;
    if (before?.writes) {
      const swing = (golden.audio.writes - before.writes) / before.writes;
      if (Math.abs(swing) >= AUDIO_WRITE_SWING) {
        swings.push({ game: contract.game, before: before.writes, after: golden.audio.writes });
        console.warn(
          `${contract.game}: WARNING sound writes ${before.writes} -> ` +
            `${golden.audio.writes} (${(swing * 100).toFixed(1)}%). A swing this ` +
            'large is a behaviour change, not drift — confirm it is intended ' +
            'before committing this golden.',
        );
      }
    }
    const sourcePath = loaded.find(entry => entry.contract.game === contract.game)!
      .registration.modulePath;
    const source = readFileSync(sourcePath, 'utf8');
    const updated = replaceGolden(source, golden);
    if (updated !== source) writeFileSync(sourcePath, updated);
    console.log(`${contract.game}: ${formatOnly ? 'formatted' : 'recorded'}`);
  }

  // The per-game warning above scrolls past in a fifty-target run, and it only
  // fires once: the second recording compares against the values the first one
  // already wrote, so a regression blessed today is invisible tomorrow. Repeat
  // it as a summary and fail the run, so a swing has to be looked at once
  // rather than merely printed. The goldens are still written, so the diff is
  // there to inspect; recording again is silent because nothing swings twice.
  if (swings.length) {
    console.error(`\n${swings.length} target(s) changed sound writes by ` +
      `${AUDIO_WRITE_SWING * 100}% or more:`);
    for (const swing of swings) {
      const percent = ((swing.after - swing.before) / swing.before) * 100;
      console.error(`  ${swing.game}: ${swing.before} -> ${swing.after} ` +
        `(${percent > 0 ? '+' : ''}${percent.toFixed(1)}%)`);
    }
    console.error(
      'Confirm each is intended before committing. Re-running the recorder ' +
        'will not warn again.',
    );
    process.exitCode = 1;
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
