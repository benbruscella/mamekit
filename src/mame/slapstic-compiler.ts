// Atari slapstic lowering.
//
// `src/mame/atari/slapstic.cpp` models the chip as a polymorphic state
// machine: ten `state` subclasses, each holding `std::function`-shaped
// `test` predicates built in its constructor from one `slapstic_data`
// table, reached through `m_state->test(offset)` from two lambdas installed
// as an address-space tap. The device compiler lowers methods, not class
// hierarchies, so `device_start` is the one method in the file it cannot
// parse — and without it the bank never moves off entry 0 and every game
// behind a slapstic runs whichever code happens to sit in the first bank.
//
// The chip data is parsed out of MAME source here: the `slapstic_data`
// struct declaration in the header gives the field order, the per-chip
// initializers give the mask/value pairs, and `slapstic_table[]` gives the
// chip numbering. Only the state machine itself is re-expressed, as one
// flat `test()` over source-named states and source-derived predicates,
// which is the same treatment the other awkward devices in
// `src/hardware/device/extract.ts` already get.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  braceBody,
  initializerItems,
  initializerNumbers,
  objectMacros,
  stripCppComments,
} from './initializer.ts';

/** One `mask_value` entry from a chip's `slapstic_data` initializer. */
export interface SlapsticMaskValue {
  mask: number;
  value: number;
}

export interface SlapsticChip {
  chipnum: number;
  bankstart: number;
  bank: number[];
  altshift: number;
  masks: Record<string, SlapsticMaskValue>;
}

export interface SlapsticTables {
  /** Chip numbers in `slapstic_table[]` order, `undefined` where nullptr. */
  order: (number | undefined)[];
  chips: SlapsticChip[];
  /** `mask_value` field names in source declaration order. */
  maskFields: string[];
  /** `#define UNKNOWN` from the same file. */
  unknown: number;
}

const SLAPSTIC_SOURCE = 'src/mame/atari/slapstic.cpp';
const SLAPSTIC_HEADER = 'src/mame/atari/slapstic.h';

/** Field order of `struct slapstic_data`, read from the MAME header. */
function slapsticDataFields(header: string): { name: string; kind: string }[] {
  const declaration = /struct\s+slapstic_data\s*\{/.exec(header);
  if (!declaration) throw new Error(`${SLAPSTIC_HEADER}: struct slapstic_data is missing`);
  const body = braceBody(header, declaration.index + declaration[0].length - 1, SLAPSTIC_HEADER);
  const fields: { name: string; kind: string }[] = [];
  for (const line of body.split(';')) {
    const match = /^\s*(u8|u16|int|mask_value)\s+(\w+)\s*(\[\s*(\d+)\s*\])?\s*$/.exec(line);
    if (!match) continue;
    fields.push({
      name: match[2]!,
      kind: match[1] === 'mask_value'
        ? 'mask_value'
        : match[4] ? `array${match[4]}` : 'scalar',
    });
  }
  if (!fields.length) throw new Error(`${SLAPSTIC_HEADER}: struct slapstic_data has no fields`);
  return fields;
}

/** Parse every `slapstic_data` table and the chip-number table from MAME. */
export function parseSlapsticTables(mameSrc: string): SlapsticTables {
  const source = stripCppComments(readFileSync(join(mameSrc, SLAPSTIC_SOURCE), 'utf8'));
  const header = stripCppComments(readFileSync(join(mameSrc, SLAPSTIC_HEADER), 'utf8'));
  const macros = objectMacros(readFileSync(join(mameSrc, SLAPSTIC_SOURCE), 'utf8'));
  const unknown = Number(macros.get('UNKNOWN') ?? '0xffff');
  const expand = (text: string): string => {
    let expanded = text;
    for (const [name, body] of macros) {
      if (name === 'UNKNOWN') continue;
      expanded = expanded.split(name).join(body);
    }
    return expanded.split('UNKNOWN').join(String(unknown));
  };

  const fields = slapsticDataFields(header);
  const maskFields = fields.filter(field => field.kind === 'mask_value').map(field => field.name);

  const chips: SlapsticChip[] = [];
  const pattern = /slapstic_data\s+atari_slapstic_device::slapstic(\d+)\s*=\s*\{/g;
  for (const match of source.matchAll(pattern)) {
    const chipnum = Number(match[1]);
    const body = expand(braceBody(source, match.index + match[0].length - 1, SLAPSTIC_SOURCE));
    const items = initializerItems(body);
    const chip: SlapsticChip = {
      chipnum,
      bankstart: 0,
      bank: [],
      altshift: 0,
      masks: {},
    };
    let cursor = 0;
    for (const field of fields) {
      const item = items[cursor++];
      if (item === undefined) {
        throw new Error(
          `${SLAPSTIC_SOURCE}: slapstic${chipnum} has no value for "${field.name}"`,
        );
      }
      if (field.kind === 'mask_value') {
        const pair = initializerNumbers(item, SLAPSTIC_SOURCE);
        if (pair.length !== 2) {
          throw new Error(
            `${SLAPSTIC_SOURCE}: slapstic${chipnum}.${field.name} is not a mask/value pair`,
          );
        }
        chip.masks[field.name] = { mask: pair[0]!, value: pair[1]! };
      } else if (field.kind.startsWith('array')) {
        const values = initializerNumbers(item, SLAPSTIC_SOURCE);
        const expected = Number(field.kind.slice('array'.length));
        if (values.length !== expected) {
          throw new Error(
            `${SLAPSTIC_SOURCE}: slapstic${chipnum}.${field.name} has ${values.length} entries`,
          );
        }
        if (field.name === 'bank') chip.bank = values;
      } else {
        const value = initializerNumbers(item, SLAPSTIC_SOURCE);
        if (field.name === 'bankstart') chip.bankstart = value[0]!;
        if (field.name === 'altshift') chip.altshift = value[0]!;
      }
    }
    chips.push(chip);
  }
  if (!chips.length) throw new Error(`${SLAPSTIC_SOURCE}: no slapstic_data tables were parsed`);

  const tableMatch = /slapstic_table\[\]\s*=\s*\{/.exec(source);
  if (!tableMatch) throw new Error(`${SLAPSTIC_SOURCE}: slapstic_table[] is missing`);
  const order = braceBody(source, tableMatch.index + tableMatch[0].length - 1, SLAPSTIC_SOURCE)
    .split(',')
    .map(entry => entry.trim())
    .filter(Boolean)
    .map(entry => /^&slapstic(\d+)$/.exec(entry))
    .map(entry => entry ? Number(entry[1]) : undefined);

  return { order, chips, maskFields, unknown };
}

/**
 * Predicate slots the flat state machine evaluates.
 *
 * MAME builds one `test` functor per state object; each entry here is the
 * same functor, named for the state class and member it came from.
 */
const TEST_SLOTS = [
  'T_RESET',      // checker::test_reset(), every state's escape hatch
  'T_INSIDE',     // checker::test_inside(), alt_valid_101_102::m_inside
  'T_BANK0', 'T_BANK1', 'T_BANK2', 'T_BANK3', // active::m_bank[]
  'T_ACT_ALT',    // active::m_alt
  'T_ACT_BIT',    // active_101_102/active_103_110::m_bit
  'T_ACT_ADD',    // active_111_118::m_add
  'T_AV_VALID',   // alt_valid::m_valid
  'T_AV_ADD',     // alt_valid_111_118::m_add
  'T_AS_SELECT',  // alt_select::m_select
  'T_AC_COMMIT',  // alt_commit::m_commit
  'T_BL_LOAD',    // bit_load::m_load
  'T_BSO_C0', 'T_BSO_S0', 'T_BSO_C1', 'T_BSO_S1', // bit_set(odd)
  'T_BSE_C0', 'T_BSE_S0', 'T_BSE_C1', 'T_BSE_S1', // bit_set(even)
  'T_BS_COMMIT',  // bit_set::m_commit
  'T_AL_LOAD',    // add_load::m_load
  'T_AD_ADD1', 'T_AD_ADD2', 'T_AD_END',           // add_set
] as const;

/** MAME's own `slapstic_table[]` numbering starts at chip 101. */
const FIRST_CHIP = 101;

/** Chip data laid out as flat arrays the generated device can index. */
export interface SlapsticDeviceTables {
  chipCount: number;
  maskCount: number;
  bankstart: number[];
  bank: number[];
  altshift: number[];
  mask: number[];
  value: number[];
  /** Uppercased `mask_value` field name to its column index. */
  fieldConstants: Record<string, number>;
}

export function slapsticDeviceTables(tables: SlapsticTables): SlapsticDeviceTables {
  const chipCount = tables.order.length;
  const maskCount = tables.maskFields.length;
  const byNumber = new Map(tables.chips.map(chip => [chip.chipnum, chip]));
  const bankstart: number[] = [];
  const bank: number[] = [];
  const altshift: number[] = [];
  const mask: number[] = [];
  const value: number[] = [];
  for (let index = 0; index < chipCount; index++) {
    // slapstic_table[] holds a nullptr where a chip number was never seen.
    const chip = byNumber.get(tables.order[index] ?? -1);
    bankstart.push(chip?.bankstart ?? 0);
    for (let entry = 0; entry < 4; entry++) bank.push(chip?.bank[entry] ?? 0);
    altshift.push(chip?.altshift ?? 0);
    for (const field of tables.maskFields) {
      mask.push(chip?.masks[field]?.mask ?? tables.unknown);
      value.push(chip?.masks[field]?.value ?? tables.unknown);
    }
  }
  return {
    chipCount,
    maskCount,
    bankstart,
    bank,
    altshift,
    mask,
    value,
    fieldConstants: Object.fromEntries(
      tables.maskFields.map((field, index) => [`MV_${field.toUpperCase()}`, index]),
    ),
  };
}

/** `checker::test_*` and the per-state constructors, as one lowerable method. */
export function slapsticComputeTestsBody(): string {
  return `
    int chip = m_chipnum - SLAPSTIC_FIRST_CHIP;
    m_range_mask = (~((m_end - m_start) | m_mirror)) & SLAPSTIC_ADDRESS_MASK;
    m_range_value = m_start;
    m_shift = m_data_width == 16 ? 1 : 0;
    int lines = m_chipnum == 101 ? 13 : 14;
    m_input_mask = ((1 << lines) - 1) << m_shift;
    m_has_bit = m_chipnum <= 110 ? 1 : 0;
    m_has_add = m_chipnum >= 111 ? 1 : 0;
    m_alt_valid_outside = m_chipnum <= 102 ? 1 : 0;
    m_alt_shift = m_shift + m_tbl_altshift[chip];
    m_t_m[T_RESET] = m_range_mask | m_input_mask;
    m_t_v[T_RESET] = m_range_value;
    m_t_m[T_INSIDE] = m_range_mask;
    m_t_v[T_INSIDE] = m_range_value;
    for (int i = 0; i < 4; i++) {
      m_t_m[T_BANK0 + i] = m_range_mask | m_input_mask;
      m_t_v[T_BANK0 + i] = m_range_value | (m_tbl_bank[chip * 4 + i] << m_shift);
    }
    if (m_alt_valid_outside) {
      set_test_in(T_ACT_ALT, MV_ALT1);
      set_test_any(T_AV_VALID, MV_ALT2);
    } else {
      set_test_any(T_ACT_ALT, MV_ALT1);
      set_test_in(T_AV_VALID, MV_ALT2);
    }
    if (m_chipnum <= 110) {
      set_test_in(T_AS_SELECT, MV_ALT3);
    } else {
      set_test_any(T_AS_SELECT, MV_ALT3);
    }
    set_test_in(T_ACT_BIT, MV_BIT1);
    set_test_in(T_ACT_ADD, MV_ADD1);
    set_test_in(T_AV_ADD, MV_ADD1);
    set_test_in(T_AC_COMMIT, MV_ALT4);
    set_test_in(T_BL_LOAD, MV_BIT2);
    set_test_in(T_BSO_C0, MV_BIT3C0);
    set_test_in(T_BSO_S0, MV_BIT3S0);
    set_test_in(T_BSO_C1, MV_BIT3C1);
    set_test_in(T_BSO_S1, MV_BIT3S1);
    set_test_in(T_BSE_C0, MV_BIT3S1);
    set_test_in(T_BSE_S0, MV_BIT3C1);
    set_test_in(T_BSE_C1, MV_BIT3S0);
    set_test_in(T_BSE_S1, MV_BIT3C0);
    set_test_in(T_BS_COMMIT, MV_BIT4);
    set_test_in(T_AL_LOAD, MV_ADD2);
    set_test_in(T_AD_ADD1, MV_ADDPLUS1);
    set_test_in(T_AD_ADD2, MV_ADDPLUS2);
    set_test_in(T_AD_END, MV_ADD3);
  `;
}

/**
 * `m_state->test(addr)` flattened over MAME's state enum.
 *
 * Each branch is one `state::test` override from slapstic.cpp, in the same
 * order, with the same predicate order inside it. The two chip-family
 * differences that are structural rather than tabular — bitwise banking only
 * exists on 101-110, additive banking only on 111-118 — are the `m_has_bit`
 * and `m_has_add` guards, which stand in for MAME building only the state
 * objects that chip range has.
 */
export function slapsticTestBody(): string {
  return `
    if (m_state == S_IDLE) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
    } else if (m_state == S_ACTIVE) {
      if (tmatch(T_BANK0, addr)) { change_bank(0); m_state = S_IDLE; }
      else if (tmatch(T_BANK1, addr)) { change_bank(1); m_state = S_IDLE; }
      else if (tmatch(T_BANK2, addr)) { change_bank(2); m_state = S_IDLE; }
      else if (tmatch(T_BANK3, addr)) { change_bank(3); m_state = S_IDLE; }
      else if (tmatch(T_ACT_ALT, addr)) m_state = S_ALT_VALID;
      else if (m_has_bit && tmatch(T_ACT_BIT, addr)) m_state = S_BIT_LOAD;
      else if (m_has_add && tmatch(T_ACT_ADD, addr)) m_state = S_ADD_LOAD;
    } else if (m_state == S_ALT_VALID) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (m_alt_valid_outside && tmatch(T_INSIDE, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_AV_VALID, addr)) m_state = S_ALT_SELECT;
      else if (m_has_add && tmatch(T_AV_ADD, addr)) m_state = S_ADD_LOAD;
      else m_state = S_ACTIVE;
    } else if (m_state == S_ALT_SELECT) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_AS_SELECT, addr)) {
        m_loaded_bank = (addr >> m_alt_shift) & 3;
        m_state = S_ALT_COMMIT;
      }
      else m_state = S_ACTIVE;
    } else if (m_state == S_ALT_COMMIT) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_AC_COMMIT, addr)) { commit_bank(); m_state = S_IDLE; }
    } else if (m_state == S_BIT_LOAD) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_BL_LOAD, addr)) {
        m_loaded_bank = m_current_bank;
        m_state = S_BIT_SET_ODD;
      }
    } else if (m_state == S_BIT_SET_ODD) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_BSO_C0, addr)) { m_loaded_bank = m_loaded_bank & ~1; m_state = S_BIT_SET_EVEN; }
      else if (tmatch(T_BSO_S0, addr)) { m_loaded_bank = m_loaded_bank | 1; m_state = S_BIT_SET_EVEN; }
      else if (tmatch(T_BSO_C1, addr)) { m_loaded_bank = m_loaded_bank & ~2; m_state = S_BIT_SET_EVEN; }
      else if (tmatch(T_BSO_S1, addr)) { m_loaded_bank = m_loaded_bank | 2; m_state = S_BIT_SET_EVEN; }
      else if (tmatch(T_BS_COMMIT, addr)) { commit_bank(); m_state = S_IDLE; }
    } else if (m_state == S_BIT_SET_EVEN) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_BSE_C0, addr)) { m_loaded_bank = m_loaded_bank & ~1; m_state = S_BIT_SET_ODD; }
      else if (tmatch(T_BSE_S0, addr)) { m_loaded_bank = m_loaded_bank | 1; m_state = S_BIT_SET_ODD; }
      else if (tmatch(T_BSE_C1, addr)) { m_loaded_bank = m_loaded_bank & ~2; m_state = S_BIT_SET_ODD; }
      else if (tmatch(T_BSE_S1, addr)) { m_loaded_bank = m_loaded_bank | 2; m_state = S_BIT_SET_ODD; }
      else if (tmatch(T_BS_COMMIT, addr)) { commit_bank(); m_state = S_IDLE; }
    } else if (m_state == S_ADD_LOAD) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_AL_LOAD, addr)) {
        m_loaded_bank = m_current_bank;
        m_state = S_ADD_SET;
      }
      else m_state = S_ACTIVE;
    } else if (m_state == S_ADD_SET) {
      if (tmatch(T_RESET, addr)) m_state = S_ACTIVE;
      else if (tmatch(T_AD_ADD1, addr)) m_loaded_bank = (m_loaded_bank + 1) & 3;
      else if (tmatch(T_AD_ADD2, addr)) m_loaded_bank = (m_loaded_bank + 2) & 3;
      else if (tmatch(T_AD_END, addr)) m_state = S_ALT_COMMIT;
    }
  `;
}

export interface SlapsticLowering {
  tables: SlapsticDeviceTables;
  /** Extra device constants naming the predicate slots and table columns. */
  constants: Record<string, number>;
  /** Members holding the parsed chip tables and the computed predicates. */
  members: { name: string; valueType: string; values?: number[]; initial?: number }[];
  /** Method bodies to install, keyed by generated method name. */
  methods: { name: string; parameters: string; body: string }[];
}

/**
 * Everything the device capability needs to turn the parsed tables into a
 * runnable SLAPSTIC: constants, members and method bodies.
 */
export function lowerSlapstic(mameSrc: string): SlapsticLowering {
  const parsed = parseSlapsticTables(mameSrc);
  const tables = slapsticDeviceTables(parsed);
  const constants: Record<string, number> = {
    SLAPSTIC_FIRST_CHIP: FIRST_CHIP,
    SLAPSTIC_MV_COUNT: tables.maskCount,
    // Every generated bus masks the address before the tap sees it, so the
    // complement of MAME's 32-bit offs_t range mask is kept inside the same
    // width instead of relying on C++ unsigned wraparound.
    SLAPSTIC_ADDRESS_MASK: 0xffffff,
    ...tables.fieldConstants,
    ...Object.fromEntries(TEST_SLOTS.map((slot, index) => [slot, index])),
  };
  const members: SlapsticLowering['members'] = [
    { name: 'm_data_width', valueType: 'int', initial: 16 },
    { name: 'm_alt_shift', valueType: 'int', initial: 0 },
    { name: 'm_has_bit', valueType: 'int', initial: 0 },
    { name: 'm_has_add', valueType: 'int', initial: 0 },
    { name: 'm_alt_valid_outside', valueType: 'int', initial: 0 },
    { name: 'm_t_m', valueType: 'offs_t', values: TEST_SLOTS.map(() => 0) },
    { name: 'm_t_v', valueType: 'offs_t', values: TEST_SLOTS.map(() => 0) },
    { name: 'm_tbl_bankstart', valueType: 'u8', values: tables.bankstart },
    { name: 'm_tbl_bank', valueType: 'u16', values: tables.bank },
    { name: 'm_tbl_altshift', valueType: 'int', values: tables.altshift },
    { name: 'm_tbl_mask', valueType: 'u16', values: tables.mask },
    { name: 'm_tbl_value', valueType: 'u16', values: tables.value },
  ];
  const methods: SlapsticLowering['methods'] = [
    {
      name: 'tmatch',
      parameters: 'int slot, offs_t addr',
      body: 'return (addr & m_t_m[slot]) == m_t_v[slot];',
    },
    {
      name: 'set_test_in',
      parameters: 'int slot, int field',
      body: `
        int at = (m_chipnum - SLAPSTIC_FIRST_CHIP) * SLAPSTIC_MV_COUNT + field;
        m_t_m[slot] = m_range_mask | (m_tbl_mask[at] << m_shift);
        m_t_v[slot] = m_range_value | (m_tbl_value[at] << m_shift);
      `,
    },
    {
      name: 'set_test_any',
      parameters: 'int slot, int field',
      body: `
        int at = (m_chipnum - SLAPSTIC_FIRST_CHIP) * SLAPSTIC_MV_COUNT + field;
        m_t_m[slot] = m_tbl_mask[at] << m_shift;
        m_t_v[slot] = m_tbl_value[at] << m_shift;
      `,
    },
    { name: 'compute_tests', parameters: '', body: slapsticComputeTestsBody() },
    {
      // MAME configures the watched window with set_range() in the machine
      // config and derives the data width from the space it is given. The
      // board hands both over once its CPU buses exist, then the chip powers
      // on exactly as device_reset does.
      name: 'configure_range',
      parameters: 'offs_t start, offs_t end, offs_t mirror, int data_width',
      body: `
        m_start = start;
        m_end = end;
        m_mirror = mirror;
        m_data_width = data_width;
        compute_tests();
        device_reset();
      `,
    },
    { name: 'test', parameters: 'offs_t addr', body: slapsticTestBody() },
  ];
  return { tables, constants, members, methods };
}
