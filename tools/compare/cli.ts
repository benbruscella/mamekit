/**
 * The mamekit commands that set a generated machine beside MAME itself.
 * bin/mamekit.js hands them here; everything else goes to the compiler
 * (src/cli.ts), which imports nothing from tools/.
 *
 *   mamekit against <target> [<title>]   one machine against MAME: pictures, --ram, --io, --audio
 *   mamekit record [<target> ...]        record a baseline for every contract scenario
 *   mamekit compare [<target> ...]       better / same / worse per measure against a baseline
 *   mamekit show [<target> ...]          print a baseline (--markdown for an issue)
 *   mamekit diverge <target> [<title>]   the first bus access that differs from MAME, per processor
 *   mamekit sweep [<target> ...]         run the acceptance contracts and classify what moved
 *
 * `mamekit help <command>` prints a command's options. MAME_SRC and MAME_BIN
 * come from the repository's .env (see .env.example), or the environment.
 */

import '../../src/local-env.ts';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const COMPARISON_COMMANDS: Record<string, { module: string; summary: string }> = {
  against: { module: './against.ts', summary: 'one machine against MAME: pictures, --ram, --io, --audio, --input none|start|contract' },
  record: { module: './baseline-command.ts', summary: 'record a baseline for every contract scenario' },
  compare: { module: './baseline-command.ts', summary: 'better / same / worse per measure against a baseline' },
  show: { module: './baseline-command.ts', summary: 'print a baseline (--markdown for an issue)' },
  sweep: { module: './sweep.ts', summary: 'run the acceptance contracts and classify what moved in each (video, state, audio, stamps, failed)' },
  diverge: { module: './diverge.ts', summary: 'the first bus access that differs from MAME, per processor, ranges from the board\'s maps' },
};

/** A command's doc comment, printed for `mamekit help <command>`. */
export function commandHelp(name: string): string | undefined {
  const entry = COMPARISON_COMMANDS[name];
  if (!entry) return undefined;
  const text = readFileSync(fileURLToPath(new URL(entry.module, import.meta.url)), 'utf8');
  const doc = /\/\*\*([\s\S]*?)\*\//.exec(text)?.[1] ?? '';
  return doc.split('\n').map(line => line.replace(/^ \* ?/, '')).join('\n').trim();
}

/** Runs `mamekit <command> ...`; each command reads its own arguments from process.argv, as a script would. */
export async function runComparisonCommand(command: string, rest: string[]): Promise<void> {
  const entry = COMPARISON_COMMANDS[command];
  if (!entry) throw new Error(`no mamekit command ${command}`);
  // The baseline commands take theirs after the command's own name.
  const own = entry.module === './baseline-command.ts' ? [command, ...rest] : rest;
  process.argv = [process.argv[0]!, fileURLToPath(new URL(entry.module, import.meta.url)), ...own];
  await import(entry.module);
}
