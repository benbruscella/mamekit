// The part of MAME's natural keyboard that is data: `charinfo` in
// src/emu/natkeyboard.cpp, the characters MAME types another way when no key
// produces them -- lowercase as uppercase, an accented letter as its plain one,
// a fraction as digits. Read from source and kept per machine, filtered to the
// entries that machine's own keys can type, so a C64 carries its few dozen.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cString } from './input-bindings.ts';

const NATKEYBOARD = 'src/emu/natkeyboard.cpp';

/** Every `{ 0x0061, "A" }` row of MAME's charinfo table. */
export function mameCharacterAlternates(source: string): Map<string, string> {
  const table = /const\s+char_info\s+charinfo\s*\[\s*\]\s*=\s*\{([\s\S]*?)\n\};/.exec(source)?.[1];
  if (table === undefined) throw new Error(`${NATKEYBOARD}: charinfo table not found`);
  const alternates = new Map<string, string>();
  for (const row of table.matchAll(/\{\s*(0x[0-9a-fA-F]+|\d+)\s*,\s*"((?:[^"\\]|\\.)*)"\s*\}/g)) {
    alternates.set(String.fromCodePoint(Number(row[1])), cString(row[2]!));
  }
  return alternates;
}

/**
 * The alternates a machine needs: characters none of its keys type, each of
 * whose replacements its keys do. Undefined when the machine has no keys to
 * type with.
 */
export function naturalKeyboardAlternates(
  mameSrc: string,
  bindings: readonly unknown[],
): Record<string, string> | undefined {
  const typeable = new Set((bindings as { type?: unknown; chars?: unknown }[])
    .filter(binding => binding.type === 'IPT_KEYBOARD' && Array.isArray(binding.chars))
    .flatMap(binding => binding.chars as string[][])
    .flat()
    .filter(code => !/^\{SHIFT_\d\}$/.test(code)));
  if (!typeable.size) return undefined;
  const alternates = mameCharacterAlternates(readFileSync(join(mameSrc, NATKEYBOARD), 'utf8'));
  return Object.fromEntries([...alternates].filter(([ch, alternate]) =>
    !typeable.has(ch) && alternate.length > 0 && [...alternate].every(part => typeable.has(part))));
}
