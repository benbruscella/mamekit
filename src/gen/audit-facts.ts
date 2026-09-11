// `npm run audit:facts` — diff every generated machine's facts against MAME's
// own `-listxml` answer for the same machine.
//
// This audit needs a MAME *binary* of the same release as the source checkout,
// which CI does not have, so an unavailable oracle is a clean skip rather than
// a failure. `--require` turns a skip into an error for the one place that
// must not silently pass: a release check on a machine that has the binary.

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  machineFactFindings,
  type DerivedConfig,
  type DerivedMeta,
} from './fact-audit.ts';
import { cachedListXmlMachine, listXmlOracle } from './listxml.ts';
import { generatedGameOutputs } from './output-layout.ts';

export interface FactAudit {
  checked: number;
  unknown: string[];
  failures: string[];
  /** Explained differences in what each side models; reported, never fatal. */
  divergences: string[];
}

export function auditFacts(
  outRoot: string,
  oracle: { binary: string; version: string },
): FactAudit {
  const failures: string[] = [];
  const divergences: string[] = [];
  const unknown: string[] = [];
  let checked = 0;
  for (const output of generatedGameOutputs(outRoot)) {
    const metaPath = join(output.dir, 'meta.json');
    const configPath = join(output.dir, 'config.json');
    if (!existsSync(metaPath) || !existsSync(configPath)) continue;
    let meta: DerivedMeta;
    let config: DerivedConfig;
    try {
      meta = JSON.parse(readFileSync(metaPath, 'utf8')) as DerivedMeta;
      config = JSON.parse(readFileSync(configPath, 'utf8')) as DerivedConfig;
    } catch {
      failures.push(`${output.game}: generated metadata is unreadable`);
      continue;
    }
    const machine = cachedListXmlMachine(oracle, meta.game ?? output.game);
    if (!machine) {
      // A machine MAME does not know is not a fact disagreement: candidate
      // targets and console shelves can name shapes outside -listxml.
      unknown.push(output.game);
      continue;
    }
    checked++;
    const findings = machineFactFindings(output.game, meta, config, machine);
    failures.push(...findings.failures);
    divergences.push(...findings.divergences);
  }
  return { checked, unknown, failures, divergences };
}

function main(): void {
  const args = process.argv.slice(2);
  const required = args.includes('--require');
  const outRoot = args.find(arg => !arg.startsWith('--')) ?? 'dist';
  const mameSrc = resolve(process.env.MAME_SRC ?? '../mame');

  const oracle = listXmlOracle(mameSrc);
  if (!oracle.binary || !oracle.version) {
    const message = `fact audit skipped: ${oracle.reason}`;
    if (required) {
      console.error(message);
      process.exitCode = 1;
      return;
    }
    console.log(message);
    return;
  }

  const audit = auditFacts(outRoot, { binary: oracle.binary, version: oracle.version });
  const scope = `${audit.checked} machines against MAME ${oracle.version}`;
  // Divergences print either way: a known difference stays visible, and the
  // promise is that they are published rather than quietly tolerated.
  for (const divergence of audit.divergences) console.log(`~ ${divergence}`);
  if (audit.failures.length) {
    console.error(`fact audit failed (${audit.failures.length} disagreements, ${scope})`);
    for (const failure of audit.failures) console.error(`- ${failure}`);
    process.exitCode = 1;
    return;
  }
  const skipped = audit.unknown.length ? `; ${audit.unknown.length} not known to MAME` : '';
  const known = audit.divergences.length ? `; ${audit.divergences.length} known divergences` : '';
  console.log(`fact audit passed: ${scope}${skipped}${known}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
