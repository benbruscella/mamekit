import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { GameAcceptanceGolden } from './types.ts';
import { runGameAcceptance } from './acceptance-harness.ts';
import { loadRegisteredGameContracts } from './contracts.ts';
import ts from 'typescript';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function replaceGolden(
  source: string,
  golden: GameAcceptanceGolden,
  scenarioId?: string,
): string {
  const file = ts.createSourceFile('contract.ts', source, ts.ScriptTarget.Latest, true);
  const object = (value: ts.Expression): ts.ObjectLiteralExpression | undefined => {
    if (ts.isObjectLiteralExpression(value)) return value;
    if (ts.isSatisfiesExpression(value) || ts.isAsExpression(value) || ts.isParenthesizedExpression(value)) {
      return object(value.expression);
    }
    if (ts.isCallExpression(value) && value.arguments[0]) return object(value.arguments[0]);
    return undefined;
  };
  const property = (value: ts.ObjectLiteralExpression, name: string) => value.properties.find(
    (entry): entry is ts.PropertyAssignment => ts.isPropertyAssignment(entry) &&
      (ts.isIdentifier(entry.name) || ts.isStringLiteral(entry.name)) && entry.name.text === name,
  );
  const contracts = file.statements.flatMap(statement => ts.isVariableStatement(statement)
    ? statement.declarationList.declarations.flatMap(declaration => {
      const value = declaration.initializer && object(declaration.initializer);
      return value && (property(value, 'game') || property(value, 'scenarios')) ? [value] : [];
    }) : []);
  if (contracts.length !== 1) throw new Error('expected one literal game contract');
  let target = contracts[0]!;
  const scenarios = property(target, 'scenarios');
  if (scenarios) {
    if (!ts.isArrayLiteralExpression(scenarios.initializer)) {
      throw new Error('recording requires a literal scenarios array');
    }
    const entries = scenarios.initializer.elements.map(element => object(element));
    if (entries.some(entry => !entry)) throw new Error('recording requires literal scenario objects');
    const selected = scenarioId ? entries.filter(entry => {
      const id = property(entry!, 'id')?.initializer;
      return id && ts.isStringLiteral(id) && id.text === scenarioId;
    }) : entries;
    if (selected.length !== 1) throw new Error('select exactly one scenario by id before recording');
    target = selected[0]!;
  } else if (scenarioId) {
    const id = property(target, 'scenarioId')?.initializer;
    if (!id || !ts.isStringLiteral(id) || id.text !== scenarioId) {
      throw new Error(`contract has no scenario "${scenarioId}"`);
    }
  }
  const existing = property(target, 'golden');
  const lineStart = source.lastIndexOf('\n', target.getStart(file)) + 1;
  const indent = /^\s*/.exec(source.slice(lineStart, target.getStart(file)))![0] + '  ';
  const rendered = renderGolden(golden).replace(/\n/g, `\n${indent}`);
  if (existing) {
    return source.slice(0, existing.initializer.getStart(file)) + rendered + source.slice(existing.initializer.end);
  }
  const position = target.properties.at(-1)?.end ?? target.getStart(file) + 1;
  // Insert after the last property rather than the closing brace: this also
  // handles satisfies/type assertions and preserves trailing comments.
  return source.slice(0, position) + `${target.properties.length ? ',' : ''}\n${indent}golden: ${rendered}` +
    source.slice(position);
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
    ? contracts.filter(contract => games.includes(contract.game) || games.includes(contractKey(contract)))
    : contracts;
  const missing = games.filter(game => !selected.some(contract => contract.game === game || contractKey(contract) === game));
  if (missing.length) throw new Error(`unknown supported game(s): ${missing.join(', ')}`);

  const swings: { game: string; before: number; after: number }[] = [];
  for (const contract of selected) {
    const registration = loaded.find(entry => entry.contract === contract)!.registration;
    const golden = formatOnly
      ? contract.golden
      : await runGameAcceptance(contract, projectRoot, {
          recording: true,
          registerCandidate: registration.lifecycle === 'candidate',
        });
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
    const sourcePath = registration.modulePath;
    const source = readFileSync(sourcePath, 'utf8');
    const updated = replaceGolden(source, golden, contract.scenarioId);
    if (updated !== source) writeFileSync(sourcePath, updated);
    console.log(`${contractKey(contract)}: ${formatOnly ? 'formatted' : 'recorded'}`);
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

function contractKey(contract: { game: string; scenarioId?: string }): string {
  return contract.scenarioId ? `${contract.game}:${contract.scenarioId}` : contract.game;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const formatOnly = args.includes('--format-only');
  await record(args.filter(arg => arg !== '--format-only'), formatOnly);
}
