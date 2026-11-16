#!/usr/bin/env node
// mamekit CLI entry. Node >= 23.6 runs the TypeScript source directly
// (native type stripping), so there is no build step for the CLI itself.
//
// The commands that compare a generated machine with MAME (against, record,
// compare, show, diverge, sweep, help) live in tools/compare; everything else is the
// compiler, src/cli.ts, which imports nothing from tools/.
const COMPARISON = new Set(['against', 'record', 'compare', 'show', 'diverge', 'sweep']);
const [command, ...rest] = process.argv.slice(2);
if (COMPARISON.has(command) || command === 'help') {
  const { runComparisonCommand, commandHelp, COMPARISON_COMMANDS } = await import(new URL('../tools/compare/cli.ts', import.meta.url));
  if (command === 'help') {
    const help = commandHelp(rest[0] ?? '');
    if (help) console.log(help);
    else {
      console.log('mamekit help <command>, for one of:');
      for (const [name, { summary }] of Object.entries(COMPARISON_COMMANDS)) console.log(`  ${name.padEnd(9)} ${summary}`);
    }
  } else {
    await runComparisonCommand(command, rest);
  }
} else {
  await import(new URL('../src/cli.ts', import.meta.url));
}
