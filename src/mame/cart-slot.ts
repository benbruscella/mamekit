import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { indexMameHardware } from './hardware.ts';

/**
 * What a cartridge slot device says about itself in MAME's source.
 *
 * Every console's slot is a `device_image_interface` and a
 * `device_slot_interface`, and states the same four facts the same way:
 *
 * - `image_interface()` names the software-list interface it accepts;
 * - `file_extensions()` names the loose files it accepts;
 * - `get_default_card_software` ends in `software_get_default_slot(<option>)`,
 *   the board a software-list entry gets when it names no `slot` feature;
 * - a `region_alloc` names the region the cartridge's ROM is loaded into.
 *
 * They are read here by device type, so a new cartridge console is described
 * by its own slot device and nothing is typed in per machine.
 */
export interface CartSlotFacts {
  /** The slot's device type, `VCS_CART_SLOT`. */
  type: string;
  /** `image_interface()`: "a2600_cart". */
  interface: string;
  /** `file_extensions()`, dotted: [".bin", ".a26"]. */
  extensions?: string[];
  /** The option `get_default_card_software` falls through to. */
  defaultOption?: string;
  /** The region the cartridge ROM is allocated as, relative to the root. */
  romRegion?: string;
}

interface SlotSource {
  className: string;
  directory: string;
  header: string;
  implementation: string;
}

function slotSource(mameSrc: string, type: string): SlotSource | undefined {
  const definition = indexMameHardware(mameSrc).get(type);
  if (!definition) return undefined;
  const read = (file: string): string => {
    const path = join(mameSrc, file);
    return existsSync(path) ? readFileSync(path, 'utf8') : '';
  };
  return {
    className: definition.className,
    directory: join(mameSrc, dirname(definition.sourceFile)),
    header: read(definition.sourceFile.replace(/\.cpp$/, '.h')),
    implementation: read(definition.sourceFile),
  };
}

/** The one-line `const char *name() ... { return "..."; }` override of a slot. */
function stringOverride(source: SlotSource, name: string): string | undefined {
  const pattern = new RegExp(`\\b${name}\\s*\\(\\s*\\)[^{;]*\\{\\s*return\\s*"([^"]*)"\\s*;`);
  return pattern.exec(source.header)?.[1] ?? pattern.exec(source.implementation)?.[1];
}

/** The text between the brace at `open` and its match. */
function braced(text: string, open: number): string {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    if (text[index] === '{') depth++;
    else if (text[index] === '}' && --depth === 0) return text.slice(open + 1, index);
  }
  return text.slice(open + 1);
}

/** The first argument of the call whose opening parenthesis is at `open`. */
function firstArgument(text: string, open: number): string {
  let depth = 0;
  for (let index = open; index < text.length; index++) {
    const char = text[index];
    if (char === '(') depth++;
    else if (char === ')' && --depth === 0) return text.slice(open + 1, index);
    else if (char === ',' && depth === 1) return text.slice(open + 1, index);
  }
  return text.slice(open + 1);
}

/** `slotoptions::GB_STD` -> "rom", from the definition beside the slot. */
function namedString(source: SlotSource, expression: string): string | undefined {
  const name = expression.split('::').at(-1)!.trim();
  if (!/^\w+$/.test(name)) return undefined;
  const definition = new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"\\s*;`);
  const own = definition.exec(source.implementation)?.[1] ?? definition.exec(source.header)?.[1];
  if (own !== undefined) return own;
  if (!existsSync(source.directory)) return undefined;
  for (const file of readdirSync(source.directory).sort()) {
    if (!/\.(?:cpp|h)$/.test(file)) continue;
    const found = definition.exec(readFileSync(join(source.directory, file), 'utf8'))?.[1];
    if (found !== undefined) return found;
  }
  return undefined;
}

function defaultOption(source: SlotSource): string | undefined {
  const signature = new RegExp(
    `\\b${source.className}\\s*::\\s*get_default_card_software\\s*\\([^)]*\\)[^{;]*\\{`,
  ).exec(source.implementation);
  if (!signature) return undefined;
  const body = braced(source.implementation, signature.index + signature[0].length - 1);
  const fallback = [...body.matchAll(/\bsoftware_get_default_slot\s*\(\s*([^()]+?)\s*\)/g)].at(-1)?.[1];
  if (!fallback) return undefined;
  const literal = /^"([^"]*)"$/.exec(fallback)?.[1];
  return literal ?? namedString(source, fallback);
}

/**
 * A `region_alloc` name as a root-relative tag, or undefined when the source
 * expression is not one this reads.
 *
 * MAME writes the name three ways: an absolute literal (`":coleco_cart:rom"`),
 * the slot's own `subtag("rom")`, and the slot's tag passed down to the card
 * and extended (`std::string(tag).append(":cart:rom")`). A card reaching up
 * from itself -- `device().subtag("^cart:prg_rom")` -- lands on the slot too.
 */
function regionTag(expression: string, slotTag: string): string | undefined {
  const text = expression.trim();
  const literal = /^"([^"]*)"$/.exec(text)?.[1];
  if (literal !== undefined) return literal.startsWith(':') ? literal.slice(1) : undefined;
  const appended = /^std::string\s*\(\s*tag\s*(?:\(\s*\))?\s*\)\s*\.\s*append\s*\(\s*"([^"]*)"\s*\)$/.exec(text)?.[1];
  if (appended !== undefined) return `${slotTag}${appended}`;
  const own = /^subtag\s*\(\s*"([^"^]*)"\s*\)$/.exec(text)?.[1];
  if (own !== undefined) return `${slotTag}:${own}`;
  const fromCard = /^device\s*\(\s*\)\s*\.\s*subtag\s*\(\s*"\^([^"^]*)"\s*\)$/.exec(text)?.[1];
  if (fromCard !== undefined) return `${slotTag}:${fromCard}`;
  return undefined;
}

function romRegion(source: SlotSource, slotTag: string): string | undefined {
  const regions = new Set<string>();
  for (const call of source.implementation.matchAll(/\bregion_alloc\s*\(/g)) {
    const name = regionTag(
      firstArgument(source.implementation, call.index + call[0].length - 1), slotTag);
    // The cartridge's one flat ROM. A slot that splits its cartridge into
    // several regions (the NES's PRG, CHR and misc) has none, and mounts its
    // own boards instead.
    if (name?.split(':').at(-1) === 'rom') regions.add(name);
  }
  return regions.size === 1 ? [...regions][0] : undefined;
}

/**
 * The facts of the cartridge slot device `type`, mounted at `slotTag`, or
 * undefined when that device is not a software-list image device at all.
 */
export function cartSlotFacts(
  mameSrc: string,
  type: string,
  slotTag: string,
): CartSlotFacts | undefined {
  const source = slotSource(mameSrc, type);
  if (!source) return undefined;
  const imageInterface = stringOverride(source, 'image_interface');
  if (!imageInterface) return undefined;
  const extensions = stringOverride(source, 'file_extensions')
    ?.split(',').map(extension => `.${extension.trim()}`);
  const option = defaultOption(source);
  const region = romRegion(source, slotTag.replace(/^:/, ''));
  return {
    type,
    interface: imageInterface,
    ...(extensions?.length ? { extensions } : {}),
    ...(option ? { defaultOption: option } : {}),
    ...(region ? { romRegion: region } : {}),
  };
}

/**
 * The cartridge slot among a machine's devices: the one whose
 * `image_interface()` is the software list's own part interface, or the first
 * image device when the list is not at hand to say.
 */
export function machineCartSlot(
  mameSrc: string,
  devices: readonly { type: string; tag: string }[],
  listInterface?: string,
): CartSlotFacts | undefined {
  let first: CartSlotFacts | undefined;
  for (const device of devices) {
    const facts = cartSlotFacts(mameSrc, device.type, device.tag);
    if (!facts) continue;
    if (!listInterface || facts.interface === listInterface) return facts;
    first ??= facts;
  }
  return listInterface ? undefined : first;
}
