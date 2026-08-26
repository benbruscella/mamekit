// Atari motion objects.
//
// `atari_motion_objects_device` is a whole sprite engine parameterised by one
// `atari_motion_objects_config` aggregate the driver declares: which gfx set,
// how the four words of an entry are laid out in sprite RAM, and which bits of
// which word carry the link, code, colour, position, size and flips. The
// device code is generic; the driver's struct is the hardware description.
//
// Lowering the struct is what makes the sprite pass source-derived. The field
// order comes from the struct declaration in `atarimo.h`, the values from the
// driver's initializer, and each mask/word/shift triple is derived exactly as
// `sprite_parameter::set` derives it at device_start.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { BoardSourceRef, GeneratedMotionObjectsPlan } from '../ir/board.ts';
import {
  braceBody,
  initializerItems,
  initializerNumbers,
  stripCppComments,
} from './initializer.ts';

const ATARIMO_HEADER = 'src/mame/atari/atarimo.h';

/** `MAX_PER_BANK` in atarimo.h: the visit limit a config of 0 means. */
const MAX_PER_BANK_FALLBACK = 'MAX_PER_BANK';

interface ConfigField {
  name: string;
  kind: 'scalar' | 'entry' | 'dual_entry';
}

/** `atari_motion_objects_config`'s fields, in declaration order. */
function configFields(header: string): ConfigField[] {
  const declaration = /struct\s+atari_motion_objects_config\s*\{/.exec(header);
  if (!declaration) {
    throw new Error(`${ATARIMO_HEADER}: struct atari_motion_objects_config is missing`);
  }
  const body = braceBody(header, declaration.index + declaration[0].length - 1, ATARIMO_HEADER);
  const fields: ConfigField[] = [];
  for (const statement of body.split(';')) {
    // The nested entry/dual_entry declarations come first and are types, not
    // fields; they are the only members declared inside a nested struct body.
    const match = /^\s*(uint8_t|uint16_t|bool|entry|dual_entry)\s+(m_\w+)\s*$/.exec(statement);
    if (!match) continue;
    fields.push({
      name: match[2]!,
      kind: match[1] === 'entry' ? 'entry' : match[1] === 'dual_entry' ? 'dual_entry' : 'scalar',
    });
  }
  if (!fields.length) {
    throw new Error(`${ATARIMO_HEADER}: struct atari_motion_objects_config has no fields`);
  }
  return fields;
}

/** MAME `atari_motion_objects_device::compute_log`. */
export function computeLog(value: number): number {
  if (value === 0) return -1;
  let log = 0;
  let remaining = value;
  while (!(remaining & 1)) { log++; remaining >>= 1; }
  return remaining === 1 ? log : -1;
}

/** MAME `atari_motion_objects_device::round_to_powerof2`. */
export function roundToPowerOfTwo(value: number): number {
  if (value === 0) return 1;
  let log = 0;
  let remaining = value;
  while ((remaining >>= 1) !== 0) log++;
  return 1 << (log + 1);
}

/**
 * MAME `sprite_parameter::set`: which of the four entry words carries this
 * field, how far it is shifted, and what remains of the mask after the shift.
 */
export function spriteParameter(words: readonly number[]): GeneratedSpriteParameter {
  let word = -1;
  for (let index = 0; index < 4; index++) {
    if (!words[index]) continue;
    if (word >= 0) {
      throw new Error('atari motion objects: a sprite parameter spans two entry words');
    }
    word = index;
  }
  if (word < 0) return { word: 0, shift: 0, mask: 0 };
  let shift = 0;
  let remaining = words[word]!;
  while (!(remaining & 1)) { shift++; remaining >>>= 1; }
  return { word, shift, mask: remaining };
}

export type GeneratedSpriteParameter = GeneratedMotionObjectsPlan['link'];

/** Parameter fields in the order the plan carries them, by config field name. */
const PARAMETERS = {
  link: 'm_link_entry',
  code: 'm_code_entry',
  color: 'm_color_entry',
  xpos: 'm_xpos_entry',
  ypos: 'm_ypos_entry',
  width: 'm_width_entry',
  height: 'm_height_entry',
  hflip: 'm_hflip_entry',
  vflip: 'm_vflip_entry',
  priority: 'm_priority_entry',
  neighbor: 'm_neighbor_entry',
  absolute: 'm_absolute_entry',
  special: 'm_special_entry',
} as const;

export interface AtariMotionObjectsInput {
  /** Device tag, which is also the sprite RAM share tag. */
  tag: string;
  /** Qualified name of the config aggregate, e.g. `gauntlet_state::s_mob_config`. */
  configName: string;
  /** Driver source declaring the aggregate. */
  driverFile: string;
  /** Sprite RAM share and the SLIP RAM share, when the map declares one. */
  spriteShare: string;
  slipShare?: string;
  /** Driver `video_start` body, which may rewrite the code lookup table. */
  videoStartBody?: string;
  source?: BoardSourceRef;
}

/**
 * Lower one driver's motion-object configuration into an executable plan.
 *
 * Returns undefined when the driver's aggregate cannot be found or uses a
 * shape this compiler does not model, so the video plan records no sprite
 * pass instead of claiming one that would draw the wrong thing.
 */
export function compileAtariMotionObjects(
  mameSrc: string,
  input: AtariMotionObjectsInput,
): GeneratedMotionObjectsPlan | undefined {
  const header = stripCppComments(readFileSync(join(mameSrc, ATARIMO_HEADER), 'utf8'));
  const driver = stripCppComments(readFileSync(join(mameSrc, input.driverFile), 'utf8'));
  const escaped = input.configName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const declaration = new RegExp(
    `atari_motion_objects_config\\s+${escaped}\\s*=\\s*\\{`,
  ).exec(driver);
  if (!declaration) return undefined;
  const body = braceBody(
    driver,
    declaration.index + declaration[0].length - 1,
    input.driverFile,
  );
  const items = initializerItems(body);
  const fields = configFields(header);
  const scalars: Record<string, number> = {};
  const entries: Record<string, number[]> = {};
  for (const [index, field] of fields.entries()) {
    const item = items[index];
    if (item === undefined) {
      throw new Error(`${input.driverFile}: ${input.configName} has no ${field.name}`);
    }
    if (field.kind === 'scalar') {
      scalars[field.name] = initializerNumbers(item, input.driverFile)[0] ?? 0;
      continue;
    }
    // Both entry and dual_entry are written as one brace group; a dual_entry
    // whose upper half is omitted leaves those words zero, and only the lower
    // four words carry a parameter this compiler can lower.
    const words = initializerNumbers(item, input.driverFile);
    if (field.kind === 'dual_entry' && words.length > 4 && words.slice(4).some(Boolean)) {
      return undefined;
    }
    entries[field.name] = [0, 1, 2, 3].map(word => words[word] ?? 0);
  }

  const parameters = Object.fromEntries(
    Object.entries(PARAMETERS).map(([name, field]) => [
      name,
      spriteParameter(entries[field] ?? [0, 0, 0, 0]),
    ]),
  ) as Record<keyof typeof PARAMETERS, GeneratedSpriteParameter>;

  const maxPerLine = scalars.m_maxperline ||
    Number(new RegExp(`${MAX_PER_BANK_FALLBACK}\\s*=\\s*(\\d+)`).exec(header)?.[1] ?? 256);
  const slipHeight = scalars.m_slipheight ?? 0;
  const slipShift = slipHeight ? computeLog(slipHeight) : 0;
  if (slipShift < 0) return undefined;
  const entryCount = roundToPowerOfTwo(parameters.link.mask);

  return {
    tag: input.tag,
    gfxIndex: scalars.m_gfxindex ?? 0,
    bankCount: scalars.m_bankcount || 1,
    linked: Boolean(scalars.m_linked),
    split: Boolean(scalars.m_split),
    reverse: Boolean(scalars.m_reverse),
    swapXy: Boolean(scalars.m_swapxy),
    nextNeighbor: Boolean(scalars.m_nextneighbor),
    slipHeight,
    slipShift,
    slipOffset: scalars.m_slipoffset ?? 0,
    maxPerLine,
    paletteBase: scalars.m_palettebase ?? 0,
    transparentPen: scalars.m_transpen ?? 0,
    specialValue: scalars.m_specialvalue ?? 0,
    entryCount,
    entryBits: Math.max(0, computeLog(entryCount)),
    bitmapWidth: roundToPowerOfTwo(parameters.xpos.mask),
    bitmapHeight: roundToPowerOfTwo(parameters.ypos.mask),
    spriteShare: input.spriteShare,
    ...(input.slipShare ? { slipShare: input.slipShare } : {}),
    ...(codeLookupXor(input.videoStartBody) !== undefined
      ? { codeXor: codeLookupXor(input.videoStartBody)! }
      : {}),
    ...parameters,
    ...(input.source ? { source: input.source } : {}),
  };
}

/**
 * MAME drivers adjust the device's identity code lookup in `video_start`:
 *
 *   std::vector<uint32_t> &codelookup = m_mob->code_lookup();
 *   for (auto & elem : codelookup)
 *     elem ^= 0x800;
 *
 * The table is otherwise the identity, so a whole-table constant XOR is the
 * only part of it that carries information.
 */
export function codeLookupXor(videoStartBody?: string): number | undefined {
  if (!videoStartBody) return undefined;
  const body = stripCppComments(videoStartBody);
  const lookup = /(\w+)\s*=\s*m_\w+->code_lookup\s*\(\s*\)/.exec(body);
  if (!lookup) return undefined;
  const loop = new RegExp(
    `for\\s*\\(\\s*auto\\s*&\\s*(\\w+)\\s*:\\s*${lookup[1]}\\s*\\)\\s*([^;]*);`,
  ).exec(body);
  if (!loop) return undefined;
  const operation = new RegExp(`^\\s*${loop[1]}\\s*\\^=\\s*(0x[0-9a-fA-F]+|\\d+)\\s*$`)
    .exec(loop[2]!);
  if (!operation) return undefined;
  return Number(operation[1]);
}
