/**
 * ROM-free behavioral surface for every generated machine.
 *
 * This does not replace real-ROM acceptance. It makes structural changes that
 * commonly alter behavior reviewable in ordinary CI: callbacks, frame events,
 * handlers, devices, address maps, palette plans and executable programs all
 * contribute to the digest. Source locations are excluded so harmless line
 * movement in pinned MAME does not ask for a new baseline.
 */

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { generatedGameOutputs } from './output-layout.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const SEMANTIC_BASELINE_PATH = join(projectRoot, 'src/games/semantic-baseline.json');

export interface MachineSemanticFingerprint {
  sha256: string;
  callbacks: number;
  frameEvents: number;
  devices: number;
  handlers: number;
  maps: number;
  palette: string;
}

export interface SemanticBaseline {
  schemaVersion: 1;
  targets: Record<string, MachineSemanticFingerprint>;
}

function behavioralValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(behavioralValue);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => key !== 'source')
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, behavioralValue(child)]),
  );
}

export function semanticFingerprint(board: Record<string, unknown>): MachineSemanticFingerprint {
  const stable = JSON.stringify(behavioralValue(board));
  const callbacks = Array.isArray(board.callbacks) ? board.callbacks.length : 0;
  const devices = Array.isArray(board.devices) ? board.devices.length : 0;
  const handlers = Array.isArray(board.handlers) ? board.handlers.length : 0;
  const maps = Array.isArray(board.maps) ? board.maps.length : 0;
  const execution = board.execution as Record<string, unknown> | undefined;
  const frameEvents = Array.isArray(execution?.frameEvents) ? execution.frameEvents.length : 0;
  const video = board.video as Record<string, unknown> | undefined;
  const ram = video?.ramPalette as Record<string, unknown> | undefined;
  const prom = video?.palette as Record<string, unknown> | undefined;
  const palette = ram
    ? [
        'ram', ram.tag, ram.extShare ?? '-', ram.endianness ?? 'native',
        ram.entries, ram.bytesPerEntry,
      ].join(':')
    : prom ? `prom:${String(prom.region ?? 'source')}` : 'none';
  return {
    sha256: createHash('sha256').update(stable).digest('hex'),
    callbacks,
    frameEvents,
    devices,
    handlers,
    maps,
    palette,
  };
}

export function generatedSemanticBaseline(outRoot: string): SemanticBaseline {
  const targets: Record<string, MachineSemanticFingerprint> = {};
  for (const target of generatedGameOutputs(outRoot)) {
    const boardPath = join(target.dir, 'generated/board.json');
    if (!existsSync(boardPath)) continue;
    const board = JSON.parse(readFileSync(boardPath, 'utf8')) as Record<string, unknown>;
    targets[target.game] = semanticFingerprint(board);
  }
  return { schemaVersion: 1, targets };
}

export function compareSemanticBaselines(
  expected: SemanticBaseline,
  actual: SemanticBaseline,
): string[] {
  const failures: string[] = [];
  const names = new Set([...Object.keys(expected.targets), ...Object.keys(actual.targets)]);
  for (const name of [...names].sort()) {
    const before = expected.targets[name];
    const after = actual.targets[name];
    if (!before) { failures.push(`${name}: missing from semantic baseline`); continue; }
    if (!after) { failures.push(`${name}: generated board is missing`); continue; }
    if (before.sha256 === after.sha256) continue;
    const changed = (Object.keys(after) as (keyof MachineSemanticFingerprint)[])
      .filter(key => before[key] !== after[key])
      .map(key => `${key} ${String(before[key])} -> ${String(after[key])}`)
      .join(', ');
    failures.push(`${name}: generated semantics changed (${changed})`);
  }
  return failures;
}

function readBaseline(path: string): SemanticBaseline {
  return JSON.parse(readFileSync(path, 'utf8')) as SemanticBaseline;
}

async function main(): Promise<void> {
  const outRoot = resolve(process.env.MAMEKIT_OUT_ROOT ?? join(projectRoot, 'dist'));
  const actual = generatedSemanticBaseline(outRoot);
  if (process.argv.includes('--record')) {
    writeFileSync(SEMANTIC_BASELINE_PATH, `${JSON.stringify(actual, null, 2)}\n`);
    console.log(`recorded generated semantic baseline for ${Object.keys(actual.targets).length} targets`);
    return;
  }
  if (!existsSync(SEMANTIC_BASELINE_PATH)) {
    throw new Error(`semantic baseline is missing: ${SEMANTIC_BASELINE_PATH}`);
  }
  const failures = compareSemanticBaselines(readBaseline(SEMANTIC_BASELINE_PATH), actual);
  if (failures.length) {
    throw new Error(
      `generated semantic baseline changed:\n  ${failures.join('\n  ')}\n` +
      'review the machine-facing diff, run its real-ROM/browser contracts, then record explicitly',
    );
  }
  console.log(`generated semantic baseline passed: ${Object.keys(actual.targets).length} targets`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
