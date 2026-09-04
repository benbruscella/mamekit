// Which machines could a change reach?
//
// After a runtime or compiler change the honest question is not "did the
// goldens move" but "which machines share the mechanism I touched". Answering
// it by sweeping all of them costs minutes and still needs a human to sort
// intended shifts from regressions. The generated artifacts already know: each
// board.json names the devices, callbacks, handlers and CPUs its machine
// actually composes, so the set can be derived instead of guessed.
//
// This is a diagnostic over dist/, not a gate. It narrows what to test; it
// never decides whether a difference is acceptable.
//
//   node tools/blast-radius.ts --device NAMCO_53XX
//   node tools/blast-radius.ts --signal k_port_callback
//   node tools/blast-radius.ts --multi-slot
//   node tools/blast-radius.ts --read-transform
//   node tools/blast-radius.ts                      # infer from PR base..HEAD
//   node tools/blast-radius.ts --base origin/main   # choose the comparison base
//
// It prints the machines and the command that exercises exactly them.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverGameNames } from '../src/games/discovery.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(projectRoot, 'dist');
const acceptedGames = new Set(discoverGameNames());

interface BoardConnection {
  effect?: { kind?: string; tag?: string; method?: string };
  transforms?: unknown[];
}
interface BoardCallback {
  ownerTag?: string;
  signal?: string;
  slot?: number | null;
}
interface BoardDocument {
  devices?: { tag?: string; type?: string }[];
  connections?: BoardConnection[];
  callbacks?: BoardCallback[];
  handlers?: unknown;
  execution?: { cpus?: { tag?: string; type?: string }[] };
  sound?: { kind?: string };
}

export interface MachineBoard {
  game: string;
  category: string;
  board: BoardDocument;
  ranges: { read?: string; write?: string }[];
  soundKind: string;
}

/** Every generated machine, with the artifacts that describe what it composes. */
export function loadMachines(root = distRoot): MachineBoard[] {
  const games = join(root, 'games');
  if (!existsSync(games)) {
    throw new Error(`no generated distribution at ${root} — run: npm run gen:all`);
  }
  const machines: MachineBoard[] = [];
  for (const category of readdirSync(games)) {
    const categoryDir = join(games, category);
    for (const game of readdirSync(categoryDir)) {
      const boardFile = join(categoryDir, game, 'generated/board.json');
      const configFile = join(categoryDir, game, 'config.json');
      if (!existsSync(boardFile) || !existsSync(configFile)) continue;
      const config = JSON.parse(readFileSync(configFile, 'utf8')) as {
        board?: { ranges?: { read?: string; write?: string }[] };
        sound?: { kind?: string };
      };
      machines.push({
        game,
        category,
        board: JSON.parse(readFileSync(boardFile, 'utf8')) as BoardDocument,
        ranges: config.board?.ranges ?? [],
        soundKind: config.sound?.kind ?? 'none',
      });
    }
  }
  return machines.sort((left, right) => left.game.localeCompare(right.game));
}

/**
 * MAME names device accessors by direction: a read ends in _r (q7_r, K_r,
 * R_r_0) or is spelled read. Kept identical to isSourceReadAccessor in
 * src/runtime/generated-effects.ts — if the two drift, this tool under-reports
 * exactly the machines the runtime rule reaches.
 */
const READ_ACCESSOR = /(?:^|_)r(?:_\d+)?$|^read(?:_|$)/;

export type Query =
  | { kind: 'device'; value: string }
  | { kind: 'signal'; value: string }
  | { kind: 'handler'; value: string }
  | { kind: 'cpu'; value: string }
  | { kind: 'sound'; value: string }
  | { kind: 'tag'; value: string }
  | { kind: 'game'; value: string }
  | { kind: 'multi-slot' }
  | { kind: 'read-transform' };

/** Machines matching one mechanism query, each with why it matched. */
export function match(machines: MachineBoard[], query: Query): Map<string, string[]> {
  const hits = new Map<string, string[]>();
  const add = (game: string, why: string) => {
    const list = hits.get(game);
    if (list) { if (!list.includes(why)) list.push(why); } else hits.set(game, [why]);
  };
  for (const machine of machines) {
    const { board } = machine;
    switch (query.kind) {
      case 'device':
        for (const device of board.devices ?? []) {
          if (device.type?.toUpperCase() === query.value.toUpperCase()) {
            add(machine.game, `${device.type} at "${device.tag}"`);
          }
        }
        break;
      case 'game':
        if (machine.game === query.value) add(machine.game, 'named directly');
        break;
      case 'tag':
        for (const device of board.devices ?? []) {
          if (device.tag?.includes(query.value)) add(machine.game, `${device.type} at "${device.tag}"`);
        }
        break;
      case 'cpu':
        for (const cpu of board.execution?.cpus ?? []) {
          if (cpu.type?.toLowerCase() === query.value.toLowerCase()) {
            add(machine.game, `${cpu.type} as "${cpu.tag}"`);
          }
        }
        break;
      case 'sound':
        if (machine.soundKind === query.value) add(machine.game, `sound "${machine.soundKind}"`);
        break;
      case 'signal':
        for (const callback of board.callbacks ?? []) {
          if (callback.signal === query.value) {
            add(machine.game, `${callback.ownerTag}.${callback.signal}`);
          }
        }
        break;
      case 'handler':
        for (const range of machine.ranges) {
          for (const key of [range.read, range.write]) {
            if (key?.includes(query.value)) add(machine.game, key);
          }
        }
        break;
      case 'multi-slot': {
        const counts = new Map<string, number>();
        for (const callback of board.callbacks ?? []) {
          const key = `${callback.ownerTag}.${callback.signal}[${callback.slot ?? 0}]`;
          counts.set(key, (counts.get(key) ?? 0) + 1);
        }
        for (const [key, count] of counts) if (count > 1) add(machine.game, `${key} x${count}`);
        break;
      }
      case 'read-transform':
        for (const connection of board.connections ?? []) {
          const effect = connection.effect ?? {};
          if (
            effect.kind === 'device-method' &&
            READ_ACCESSOR.test(effect.method ?? '') &&
            (connection.transforms?.length ?? 0) > 0
          ) add(machine.game, `${effect.tag}.${effect.method} (transformed read)`);
        }
        break;
    }
  }
  return hits;
}

/**
 * Best-effort mechanism guesses for changed source files. Generic runtime
 * modules genuinely reach every machine, and saying so is more useful than a
 * narrow answer that is wrong.
 */
export function queriesForFiles(files: readonly string[]): { queries: Query[]; everything: string[] } {
  const queries: Query[] = [];
  const everything: string[] = [];
  for (const file of files) {
    const name = file.split('/').at(-1)?.replace(/\.(spec\.)?ts$/, '') ?? '';
    const namco = /^namco(\d\d)-compiler$/.exec(name);
    if (namco) { queries.push({ kind: 'tag', value: `${namco[1]}xx` }); continue; }
    const hardware = /^src\/hardware\/([^/]+)\//.exec(file);
    if (hardware) { queries.push({ kind: 'sound', value: hardware[1]! }); continue; }
    if (file.startsWith('src/runtime/') || file.startsWith('src/ir/')) {
      everything.push(file);
      continue;
    }
    const game = /^src\/games\/([a-z0-9]+)\.(spec\.)?ts$/.exec(file);
    if (game) { queries.push({ kind: 'game', value: game[1]! }); continue; }
  }
  return { queries, everything };
}

function gitOutput(args: string[]): string | undefined {
  try {
    return execFileSync('git', args, {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return undefined;
  }
}

/** Committed PR changes plus any current working-tree edits. */
export function changedFiles(baseRef?: string): string[] {
  const requested = baseRef ?? process.env.MAMEKIT_BASE_SHA ?? process.env.MAMEKIT_BASE_REF;
  const candidate = requested ?? (gitOutput(['rev-parse', '--verify', 'origin/main'])
    ? 'origin/main'
    : 'HEAD^');
  const base = gitOutput(['merge-base', candidate, 'HEAD']) ?? candidate;
  const committed = gitOutput(['diff', '--name-only', `${base}...HEAD`]) ?? '';
  const working = gitOutput(['diff', '--name-only', 'HEAD']) ?? '';
  return [...new Set(`${committed}\n${working}`.split('\n').map(line => line.trim()).filter(Boolean))]
    .sort();
}

function report(machines: MachineBoard[], queries: Query[]): void {
  const all = new Map<string, string[]>();
  for (const query of queries) {
    const label = 'value' in query ? `${query.kind} ${query.value}` : query.kind;
    const hits = match(machines, query);
    console.log(`\n${label}: ${hits.size} machine${hits.size === 1 ? '' : 's'}`);
    for (const [game, why] of [...hits].sort()) {
      console.log(`  ${game.padEnd(10)} ${why.join(', ')}`);
      const list = all.get(game);
      if (list) list.push(...why); else all.set(game, [...why]);
    }
  }
  const games = [...all.keys()].sort();
  const accepted = games.filter(game => acceptedGames.has(game));
  console.log(`\n${games.length} machine${games.length === 1 ? '' : 's'} to check:`);
  if (accepted.length) {
    console.log(`  MAMEKIT_ACCEPTANCE_GAMES=${accepted.join(',')} npm run test:games:matrix`);
    console.log(`  MAMEKIT_E2E_GAMES=${accepted.join(',')} npm run test:e2e`);
  } else {
    console.log('  (no accepted real-ROM scenarios; run the target media/browser contract)');
  }
}

function reportAll(machines: MachineBoard[], reason: string): void {
  const games = machines.map(machine => machine.game);
  const accepted = games.filter(game => acceptedGames.has(game));
  console.log(`\n${reason}: ${games.length} machines`);
  console.log(`  ${games.join(', ')}`);
  console.log(`\n${games.length} machines to check:`);
  console.log(`  MAMEKIT_ACCEPTANCE_GAMES=${accepted.join(',')} npm run test:games:matrix`);
  console.log(`  MAMEKIT_E2E_GAMES=${accepted.join(',')} npm run test:e2e`);
  if (accepted.length !== games.length) {
    console.log(`  plus ${games.length - accepted.length} non-arcade machine media/browser contract(s)`);
  }
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').at(-1) ?? '')) {
  const argv = process.argv.slice(2);
  const machines = loadMachines();
  const queries: Query[] = [];
  let baseRef: string | undefined;
  for (let index = 0; index < argv.length; index++) {
    const flag = argv[index];
    if (flag === '--base') {
      baseRef = argv[++index];
      if (!baseRef) throw new Error('--base needs a git ref');
    } else if (flag === '--multi-slot') queries.push({ kind: 'multi-slot' });
    else if (flag === '--read-transform') queries.push({ kind: 'read-transform' });
    else if (flag?.startsWith('--')) {
      const kind = flag.slice(2) as Query['kind'];
      const value = argv[++index];
      if (!value) throw new Error(`--${kind} needs a value`);
      queries.push({ kind, value } as Query);
    }
  }
  if (queries.length) {
    report(machines, queries);
  } else {
    const files = changedFiles(baseRef);
    console.log(`changed files: ${files.length ? files.join(', ') : '(none)'}`);
    const { queries: inferred, everything } = queriesForFiles(files);
    if (everything.length) {
      reportAll(machines, `generic runtime/IR changed (${everything.join(', ')})`);
    }
    if (inferred.length && !everything.length) report(machines, inferred);
    else if (!everything.length) console.log('\nNo machine-facing change detected.');
  }
}
