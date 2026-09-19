// A device translation unit, preprocessed before it is compiled.
//
// Most devices compile from their files as written. A few only make sense after
// the C preprocessor has run: Midway's T-Unit video picks its pixel extractor
// with `#if defined(LSB_FIRST)`, defines its scanline and shift-register
// callbacks through TMS34010 header macros, and builds its blitter tables by
// expanding INIT_TEMPLATED_DMA_DRAW_GROUP into hundreds of member-function
// pointers. This runs the directives once over the entry file (following only
// the includes the caller allows) and hands the device compiler that text in
// place of the files it inlined.

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { evalExpr, parseEnumConstants } from '../kg/parse.ts';
import { CPreprocessor } from './c-preprocessor.ts';
import { lowerMemberPointerCalls, lowerMemberPointerValues } from './member-pointers.ts';

export interface PreprocessedDeviceOptions {
  /** The .cpp the device is defined in, relative to the MAME checkout. */
  entry: string;
  /** Included files the preprocessor may follow, relative to the checkout. */
  allow: (file: string) => boolean;
  /** Classes whose `&cls::method` pointers are lowered to method names. */
  classes: readonly string[];
}

/** A `transformSource` hook for compileMameDevice. */
export function preprocessedDeviceTransform(
  mameSrc: string,
  options: PreprocessedDeviceOptions,
): (file: string, source: string) => string {
  const included = new Set<string>();
  const preprocessor = new CPreprocessor({
    read: (path, from) => {
      const candidates = [
        join(dirname(from), path),
        join(mameSrc, 'src/devices', path),
        join(mameSrc, 'src/mame', path),
      ];
      for (const full of candidates) {
        const file = relative(mameSrc, full);
        if (!existsSync(full) || !options.allow(file)) continue;
        included.add(file);
        return { path: full, source: readFileSync(full, 'utf8') };
      }
      return undefined;
    },
  });
  const entry = join(mameSrc, options.entry);
  const expanded = preprocessor.run(entry, readFileSync(entry, 'utf8'));
  const constants = parseEnumConstants(expanded, {});
  const instances = new Set<string>();
  const owners = options.classes.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  for (const match of expanded.matchAll(new RegExp(`&\\s*((?:${owners})\\s*::\\s*\\w+\\s*<[^<>]*>)`, 'g'))) {
    instances.add(match[1]!.replace(/\s+/g, ' '));
  }
  const text = lowerMemberPointerValues(
    lowerMemberPointerCalls(expanded),
    options.classes,
    argument => evalExpr(argument, constants),
  ) +
    // The device compiler finds template instances by the spellings that name
    // them; the pointers above no longer do, so name them once more here in a
    // helper nothing calls, and which is therefore never compiled.
    (instances.size
      ? `\nstatic void mamekit_template_instances() {\n${[...instances].map(name => `\t${name};`).join('\n')}\n}\n`
      : '');
  return (file, source) => {
    if (file === options.entry) return text;
    // Inlined into the entry file: reading it again would declare it twice.
    if (included.has(file)) return '';
    return source;
  };
}
