#!/usr/bin/env node
/**
 * mkt: every comparison of a generated machine with MAME, in one tool.
 *
 *   mkt run <target> [<title>]   one machine against MAME: pictures, --ram, --io, --audio
 *   mkt record [<target> ...]    record a baseline for every contract scenario
 *   mkt compare [<target> ...]   better / same / worse per measure against a baseline
 *   mkt show [<target> ...]      print a baseline (--markdown for an issue)
 *
 * Run it as `npm run mkt -- <command> ...` or `node tools/mkt.ts <command> ...`.
 * It is repository tooling, not part of the published package, so it has no
 * bin entry of its own. `mkt help <command>` prints a command's options. MAME_SRC and MAME_BIN come
 * from the repository's .env (see .env.example), or the environment.
 */

import '../src/local-env.ts';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const COMMANDS: Record<string, { module: string; summary: string }> = {
  run: { module: './mkt/run.ts', summary: 'one machine against MAME: pictures, --ram, --io, --audio, --input none|start|contract' },
  record: { module: './mkt/baseline-command.ts', summary: 'record a baseline for every contract scenario' },
  compare: { module: './mkt/baseline-command.ts', summary: 'better / same / worse per measure against a baseline' },
  show: { module: './mkt/baseline-command.ts', summary: 'print a baseline (--markdown for an issue)' },
};

const [command, ...rest] = process.argv.slice(2);

function usage(): never {
  console.error('usage: mkt <command> [options]\n');
  for (const [name, { summary }] of Object.entries(COMMANDS)) console.error(`  ${name.padEnd(9)} ${summary}`);
  console.error('\nmkt help <command> prints its options.');
  process.exit(2);
}

/** A command's doc comment, the text between the shebang and its imports. */
function help(name: string): never {
  const entry = COMMANDS[name];
  if (!entry) usage();
  const text = readFileSync(fileURLToPath(new URL(entry.module, import.meta.url)), 'utf8');
  const doc = /\/\*\*([\s\S]*?)\*\//.exec(text)?.[1] ?? '';
  console.log(doc.split('\n').map(line => line.replace(/^ \* ?/, '')).join('\n').trim());
  process.exit(0);
}

if (!command || command === '--help' || command === '-h') usage();
if (command === 'help') help(rest[0] ?? '');
const entry = COMMANDS[command];
if (!entry) usage();
// Each command reads its own arguments from process.argv, as a script would:
// the baseline commands take theirs after the command's own name.
const own = entry.module === './mkt/baseline-command.ts' ? [command, ...rest] : rest;
process.argv = [process.argv[0]!, fileURLToPath(new URL(entry.module, import.meta.url)), ...own];
await import(entry.module);
