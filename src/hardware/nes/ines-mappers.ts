import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The iNES mapper number of each NES cartridge slot option, from MAME's own
 * two tables: `mmc_list` in nes_ines.hxx (mapper -> PCB id, 358 rows) and
 * `pcb_list` in nes_pcb.hxx (slot option -> PCB id). Several mappers can name
 * one PCB; the lowest is the one a header rebuilt from chips carries.
 *
 * Compile time only. Which board a dump actually runs on is never decided
 * from this: a catalogued cartridge runs on its entry's `slot`, and a file on
 * whatever the slot's own get_default_card_ines picks.
 */
export function inesMapperBySlot(mameSource: string): Map<string, number> {
  const directory = join(mameSource, 'src/devices/bus/nes');
  const ines = readFileSync(join(directory, 'nes_ines.hxx'), 'utf8');
  const pcbs = readFileSync(join(directory, 'nes_pcb.hxx'), 'utf8');
  const table = /static\s+const\s+nes_mmc\s+mmc_list\s*\[\s*\]\s*=\s*\{([\s\S]*?)\n\};/.exec(ines)?.[1];
  if (!table) throw new Error('MAME nes_ines.hxx no longer declares mmc_list');
  const mapperByPcb = new Map<string, number>();
  for (const line of table.split('\n')) {
    const row = /^\s*\{\s*(\d+)\s*,\s*(\w+)\s*\}/.exec(line.replace(/\/\/.*$/, ''));
    if (!row) continue;
    const mapper = Number(row[1]);
    if (!mapperByPcb.has(row[2]!) || mapper < mapperByPcb.get(row[2]!)!) mapperByPcb.set(row[2]!, mapper);
  }
  const bySlot = new Map<string, number>();
  for (const match of pcbs.matchAll(/\{\s*"([^"]+)"\s*,\s*(\w+)\s*\}/g)) {
    const mapper = mapperByPcb.get(match[2]!);
    if (mapper !== undefined) bySlot.set(match[1]!, mapper);
  }
  if (!bySlot.has('nrom')) throw new Error('MAME iNES tables do not resolve mapper 0');
  return bySlot;
}

/** The option -> device type pairs of MAME's `nes_cart` slot option list. */
export function nesCartOptions(mameSource: string): [string, string][] {
  const carts = readFileSync(join(mameSource, 'src/devices/bus/nes/nes_carts.cpp'), 'utf8');
  const body = functionBody(carts, 'void nes_cart(device_slot_interface &device)');
  const options = [...body.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)]
    .map(match => [match[1]!, match[2]!] as [string, string]);
  if (!options.length) throw new Error('MAME nes_cart declares no cartridge options');
  return options;
}

function functionBody(source: string, signature: string): string {
  const at = source.indexOf(signature);
  if (at < 0) throw new Error(`MAME source is missing ${signature}`);
  const open = source.indexOf('{', at + signature.length);
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === '{') depth++;
    else if (source[index] === '}' && --depth === 0) return source.slice(open + 1, index);
  }
  throw new Error(`MAME source has an unterminated ${signature}`);
}
