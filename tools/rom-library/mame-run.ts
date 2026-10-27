// The device sets MAME's own run of a supported arcade machine loads.
//
// A board we generate can leave a device's firmware out (our Q*bert never
// loads the Votrax's sc01a.bin), but MAME refuses to start the machine
// without it, and the oracle (tools/mame-oracle.ts) runs MAME from these same
// shelves. So tidying keeps what MAME's run needs as well as what ours does.
// MAME states it in -listxml: every `device_ref` whose device entry carries
// dumped ROMs (src/gen/listxml.ts `deviceSets`).
//
// The answer needs a MAME binary of the checkout's release (MAME_BIN), or a
// cache any earlier run with one warmed (.cache/listxml/<version>/); a machine
// neither can answer for is reported as unknown, never guessed.

import {
  cachedListXmlMachine, listXmlOracle, mameSourceVersion, storedListXmlMachine,
} from '../../src/gen/listxml.ts';
import type { Systems } from './systems.ts';

export interface MameRunSets {
  /** device set -> the supported machines whose MAME run loads it */
  sets: Map<string, string[]>;
  /** arcade machines with no answer: no binary and no current cache entry */
  unknown: string[];
  /** why no binary was asked, when none was */
  reason?: string;
}

export function mameRunSets(systems: Systems, mameSrc: string, binary?: string): MameRunSets {
  const oracle = listXmlOracle(mameSrc, binary);
  const version = oracle.version ?? mameSourceVersion(mameSrc);
  const sets = new Map<string, string[]>();
  const unknown: string[] = [];
  for (const system of systems.systems) {
    if (system.category !== 'arcade') continue;
    for (const { game } of system.machines) {
      const answer = oracle.binary && oracle.version
        ? { machine: cachedListXmlMachine({ binary: oracle.binary, version: oracle.version }, game) }
        : version ? storedListXmlMachine(version, game) : undefined;
      if (!answer) { unknown.push(game); continue; }
      for (const set of answer.machine?.deviceSets ?? []) sets.set(set, [...(sets.get(set) ?? []), game]);
    }
  }
  return { sets, unknown, ...(oracle.binary ? {} : { reason: oracle.reason }) };
}
