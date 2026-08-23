// Why is a board slow?
//
// A sampling profiler only ever answers "the IR interpreter", which is true of
// every board and actionable for none. This attributes interpreted operations
// to the source handler that caused them, and prints each handler's loop depth
// beside its cost — loop depth is what decides whether the work is a fixed
// per-frame cost or multiplies with sprites, scanlines and pixels.
//
//   node tools/profile-game.ts <game> [more games...]
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { irProfile } from '../src/ir/execute.ts';
import { runGameAcceptance } from '../src/games/acceptance-harness.ts';
import { loadGameContracts } from '../src/games/contracts.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

interface Operation { op?: string; body?: Operation[]; then?: Operation[]; else?: Operation[] }

/** Deepest loop nesting in a handler: 1 is a sprite pass, 3 multiplies. */
function loopDepth(operations: Operation[] = [], depth = 0): number {
  let deepest = depth;
  for (const operation of operations) {
    if (operation.op === 'for' || operation.op === 'while' || operation.op === 'do-while') {
      deepest = Math.max(deepest, loopDepth(operation.body, depth + 1));
    } else if (operation.op === 'if') {
      deepest = Math.max(deepest, loopDepth(operation.then, depth), loopDepth(operation.else, depth));
    }
  }
  return deepest;
}

async function profile(game: string): Promise<void> {
  const contract = (await loadGameContracts()).find(candidate => candidate.game === game);
  if (!contract) throw new Error(`unknown game: ${game}`);

  const board = JSON.parse(readFileSync(
    resolve(projectRoot, `dist/games/${contract.category}/${game}/generated/board.json`),
    'utf8',
  )) as { handlers?: { ownerClass: string; method: string; program?: { operations?: Operation[] } }[] };
  const depths = new Map<string, number>();
  for (const handler of board.handlers ?? []) {
    depths.set(`${handler.ownerClass}.${handler.method}`, loopDepth(handler.program?.operations));
  }

  irProfile.enabled = true;
  process.env.MAMEKIT_PROFILE_IR = '1';
  irProfile.ops.clear();
  irProfile.calls.clear();
  const started = Date.now();
  try { await runGameAcceptance(contract, projectRoot); } catch { /* a failing contract still profiles */ }
  const seconds = (Date.now() - started) / 1000;
  irProfile.enabled = false;

  const total = [...irProfile.ops.values()].reduce((sum, value) => sum + value, 0);
  const frames = contract.frames;
  console.log(`\n${game}: ${frames} frames in ${seconds.toFixed(1)}s ` +
    `(${(frames / seconds).toFixed(1)} fps), ${(total / 1e6).toFixed(1)}M interpreted ops`);
  if (!total) { console.log('  no interpreted handler work — this board is not interpreter-bound'); return; }
  console.log('  share   ops/frame  calls/frame  loops  handler');
  for (const [key, ops] of [...irProfile.ops].sort((left, right) => right[1] - left[1]).slice(0, 8)) {
    const depth = depths.get(key) ?? 0;
    console.log(
      `  ${(ops / total * 100).toFixed(1).padStart(5)}%  ${Math.round(ops / frames).toString().padStart(9)}  ` +
      `${(( irProfile.calls.get(key) ?? 0) / frames).toFixed(1).padStart(11)}  ` +
      `${String(depth).padStart(5)}  ${key}`,
    );
  }
}

for (const game of process.argv.slice(2)) await profile(game);
