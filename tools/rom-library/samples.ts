// MAME's sample sets: the recordings a samples device plays where a board's
// sound was never synthesised (Zaxxon's, Space Panic's, Q*bert's knocker).
//
// A set is .data/samples/<set>.zip holding <name>.wav (or .flac), the layout
// MAME's -samplepath reads. Which sets a supported machine needs, and which
// names each must hold, comes from its generated config.json (`samples`, the
// lowered set_samples_names array), so nothing here names a machine. MAME
// publishes no CRCs for samples: a zip is identified by the names it covers.

import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { zipMemberNames } from './archives.ts';
import type { Systems } from './systems.ts';

/** One set, with every name the supported machines filing to it load. */
export interface SampleNeed {
  set: string;
  names: string[];
  machines: string[];
}

export function sampleNeeds(systems: Systems): SampleNeed[] {
  const bySet = new Map<string, SampleNeed>();
  for (const system of systems.systems) {
    for (const machine of system.machines) {
      for (const device of machine.config?.samples ?? []) {
        const need = bySet.get(device.set) ?? { set: device.set, names: [], machines: [] };
        for (const name of device.names) if (!need.names.includes(name)) need.names.push(name);
        if (!need.machines.includes(machine.game)) need.machines.push(machine.game);
        bySet.set(device.set, need);
      }
    }
  }
  return [...bySet.values()].sort((a, b) => a.set.localeCompare(b.set));
}

const SAMPLE_FILE = /\.(wav|flac)$/i;

/**
 * The sample names a zip holds, keyed the way MAME looks them up (lower case,
 * no extension), each to its member and whether it sits at the zip's root,
 * the only place MAME looks.
 */
export function zipSamples(bytes: Uint8Array): Map<string, { member: string; root: boolean }> {
  const out = new Map<string, { member: string; root: boolean }>();
  for (const member of zipMemberNames(bytes)) {
    if (!SAMPLE_FILE.test(member)) continue;
    const name = basename(member).replace(SAMPLE_FILE, '').toLowerCase();
    const root = !member.includes('/');
    const known = out.get(name);
    if (!known || (root && !known.root)) out.set(name, { member, root });
  }
  return out;
}

export function missingSamples(held: ReadonlyMap<string, unknown>, need: SampleNeed): string[] {
  return need.names.filter(name => !held.has(name.toLowerCase()));
}

export interface SampleShelfCheck {
  need: SampleNeed;
  /** absent when no <set>.zip is filed */
  path?: string;
  missing: string[];
  /** set when the zip is there but cannot be read */
  problem?: string;
}

/** How the filed <set>.zip answers one need. */
export function checkSampleSet(samplesDir: string, need: SampleNeed): SampleShelfCheck {
  const path = join(samplesDir, `${need.set}.zip`);
  if (!existsSync(path)) return { need, missing: need.names };
  try {
    return { need, path, missing: missingSamples(rootOnly(zipSamples(readFileSync(path))), need) };
  } catch (error) {
    return { need, path, missing: need.names, problem: error instanceof Error ? error.message : String(error) };
  }
}

/** Only the samples MAME would find: the ones at the zip's root. */
export function rootOnly<T extends { root: boolean }>(held: Map<string, T>): Map<string, T> {
  return new Map([...held].filter(([, sample]) => sample.root));
}

export type SampleVerdict =
  | { kind: 'complete'; need: SampleNeed }
  | { kind: 'incomplete'; need: SampleNeed; missing: string[] }
  | { kind: 'ambiguous'; needs: SampleNeed[] }
  | { kind: 'unidentified' };

/**
 * Which needed set a dropped zip is. Complete means it covers every name the
 * set's machines load; extra files (a readme, a clone's samples) are fine. A
 * zip that covers two sets is the one its own file name says, or neither. A
 * zip that covers none is incomplete for the set it overlaps most (or is
 * named after), and unidentified when it shares nothing with any.
 */
export function identifySampleZip(held: ReadonlyMap<string, unknown>, stem: string, needs: SampleNeed[]): SampleVerdict {
  const named = stem.toLowerCase();
  const complete = needs.filter(need => !missingSamples(held, need).length);
  if (complete.length === 1) return { kind: 'complete', need: complete[0]! };
  if (complete.length > 1) {
    const byName = complete.find(need => need.set.toLowerCase() === named);
    return byName ? { kind: 'complete', need: byName } : { kind: 'ambiguous', needs: complete };
  }
  const overlap = (need: SampleNeed) => need.names.length - missingSamples(held, need).length;
  const ranked = needs
    .filter(need => overlap(need) > 0 || need.set.toLowerCase() === named)
    .sort((a, b) => Number(b.set.toLowerCase() === named) - Number(a.set.toLowerCase() === named) || overlap(b) - overlap(a));
  const best = ranked[0];
  return best ? { kind: 'incomplete', need: best, missing: missingSamples(held, best) } : { kind: 'unidentified' };
}
