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
import { generatedInclude } from './mame-build.ts';
import { CPreprocessor } from './c-preprocessor.ts';
import { lowerMemberPointerCalls, lowerMemberPointerValues } from './member-pointers.ts';

export interface PreprocessedDeviceOptions {
  /** The .cpp the device is defined in, relative to the MAME checkout. */
  entry: string;
  /** Included files the preprocessor may follow, relative to the checkout. */
  allow: (file: string) => boolean;
  /** Classes whose `&cls::method` pointers are lowered to method names. */
  classes: readonly string[];
  /**
   * Headers, relative to the checkout, whose enums the template arguments of
   * those pointers name but which the preprocessor is not allowed to inline
   * (`addr_mode::IM` is declared inside the 6805's class in m6805.h).
   */
  enumHeaders?: readonly string[];
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
      // What MAME's build generates into GEN_DIR rather than the tree holds:
      // the 6809's execute_one is `switch(pop_state()) { #include
      // "cpu/m6809/m6809.hxx" }`, written by m6809make.py (mame-build.ts).
      const generated = generatedInclude(mameSrc, path);
      if (generated) return { path: generated, source: readFileSync(generated, 'utf8') };
      // A .hxx or .ipp is code or data the including file is incomplete
      // without; dropped, the 6809 compiled with no instructions and no
      // diagnostic. Headers outside the device's family are host services.
      if (/\.(?:hxx|ipp)$/.test(path)) {
        throw new Error(`${relative(mameSrc, from)}: #include "${path}" resolves nowhere`);
      }
      return undefined;
    },
  });
  const entry = join(mameSrc, options.entry);
  // A macro may paste a qualified name with space around its `::`:
  // discrete.h defines every node method as
  // `DISCRETE_CLASS_NAME(_class) :: _func`, which the source readers would
  // not take for a definition. The spacing means nothing to C++.
  const expanded = preprocessor.run(entry, readFileSync(entry, 'utf8'))
    .replace(/\b(\w+)[ \t]+::[ \t]*(?=[A-Za-z_~])|\b(\w+)::[ \t]+(?=[A-Za-z_~])/g, (_all, left?: string, right?: string) => `${left ?? right}::`);
  const enumSource = [...(options.enumHeaders ?? []).map(header => readFileSync(join(mameSrc, header), 'utf8')), expanded].join('\n');
  const constants = parseEnumConstants(enumSource, {});
  // A scoped enumerator is spelled with its enum's name (`addr_mode::DI`), and
  // numbered within its own enum: the 6805's `addr_mode::IX1` is 4 whatever
  // the disassembler's `md::IX1` in 6805dasm.h is, though the two share a name.
  for (const scoped of enumSource.matchAll(/\benum\s+class\s+(\w+)[^{;]*\{([^}]*)\}/g)) {
    const own = parseEnumConstants(`enum { ${scoped[2]!} };`, constants);
    for (const member of scoped[2]!.split(',')) {
      const name = /^\s*(\w+)/.exec(member)?.[1];
      if (name && own[name] !== undefined) constants[`${scoped[1]}::${name}`] = own[name]!;
    }
  }
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
