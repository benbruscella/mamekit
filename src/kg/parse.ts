// Domain parsers for the MAME macro DSLs. These are deliberately NOT a C++ AST:
// the machine description lives in highly regular declarative macros
// (ROM_START, address_map, INPUT_PORTS_START, gfx_layout, machine_config,
// GAME) that targeted parsers extract with full fidelity.

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

/** Strip // and /* *​/ comments while preserving string literals. */
export function stripComments(src: string): string {
  let out = '';
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"') {
      const end = findStringEnd(src, i);
      out += src.slice(i, end + 1);
      i = end + 1;
    } else if (c === '/' && src[i + 1] === '/') {
      while (i < src.length && src[i] !== '\n') i++;
    } else if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++;
      i += 2;
      out += ' ';
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

function findStringEnd(src: string, start: number): number {
  for (let i = start + 1; i < src.length; i++) {
    if (src[i] === '\\') i++;
    else if (src[i] === '"') return i;
  }
  return src.length - 1;
}

/** Split on top-level commas (ignoring commas inside (), {}, "" ). */
export function splitArgs(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"') {
      const end = findStringEnd(s, i);
      cur += s.slice(i, end + 1);
      i = end;
    } else if (c === '(' || c === '{' || c === '[') {
      depth++;
      cur += c;
    } else if (c === ')' || c === '}' || c === ']') {
      depth--;
      cur += c;
    } else if (c === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

/** Find the matching close paren for the open paren at src[open]. */
function matchParen(src: string, open: number): number {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === '"') i = findStringEnd(src, i);
    else if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Extract the body of `void cls::name(argtype &x) { ... }`. */
function extractFunctionBody(src: string, headerRe: RegExp): { cls: string; name: string; body: string }[] {
  const results: { cls: string; name: string; body: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = headerRe.exec(src)) !== null) {
    const braceStart = src.indexOf('{', m.index + m[0].length - 1);
    if (braceStart < 0) continue;
    let depth = 0;
    let end = -1;
    for (let i = braceStart; i < src.length; i++) {
      const c = src[i];
      if (c === '"') i = findStringEnd(src, i);
      else if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end < 0) continue;
    results.push({ cls: m[1], name: m[2], body: src.slice(braceStart + 1, end) });
  }
  return results;
}

/**
 * Evaluate a MAME clock/size arithmetic expression to a number.
 * Handles: hex/dec literals, digit separators (18'432'000), XTAL(n),
 * named constants supplied by the caller, arithmetic and bitwise operators,
 * and parens.
 * Returns null if the expression contains anything else.
 */
export function evalExpr(expr: string, consts: Record<string, number> = {}): number | null {
  let s = expr.replace(/'/g, '');
  // frequency user-defined literals: 18.432_MHz_XTAL, 32.768_kHz_XTAL, 100_Hz_XTAL
  s = s.replace(/([0-9]+(?:\.[0-9]+)?)_MHz_XTAL/g, (_, n) => String(Math.round(Number(n) * 1e6)));
  s = s.replace(/([0-9]+(?:\.[0-9]+)?)_kHz_XTAL/g, (_, n) => String(Math.round(Number(n) * 1e3)));
  s = s.replace(/([0-9]+(?:\.[0-9]+)?)_Hz_XTAL/g, (_, n) => String(Math.round(Number(n))));
  s = s.replace(/XTAL\s*\(\s*([0-9]+)\s*\)/g, '$1');
  for (const [name, val] of Object.entries(consts)) {
    s = s.replace(new RegExp(`\\b${name}\\b`, 'g'), String(val));
  }
  if (!/^[\s0-9a-fA-FxX+\-*/().<>&|^]*$/.test(s)) return null;
  // recursive-descent evaluation, no eval()
  let pos = 0;
  const peek = () => { while (pos < s.length && /\s/.test(s[pos])) pos++; return s[pos]; };
  function parsePrimary(): number | null {
    const c = peek();
    if (c === '(') {
      pos++;
      const v = parseBitOr();
      if (peek() !== ')') return null;
      pos++;
      return v;
    }
    if (c === '-') { pos++; const v = parsePrimary(); return v === null ? null : -v; }
    const m = /^(0[xX][0-9a-fA-F]+|[0-9]+(?:\.[0-9]+)?)/.exec(s.slice(pos));
    if (!m) return null;
    pos += m[0].length;
    return Number(m[0]);
  }
  function parseMulDiv(): number | null {
    let v = parsePrimary();
    if (v === null) return null;
    for (;;) {
      const c = peek();
      if (c === '*' || c === '/') {
        pos++;
        const r = parsePrimary();
        if (r === null) return null;
        v = c === '*' ? v * r : v / r;
      } else return v;
    }
  }
  function parseAddSub(): number | null {
    let v = parseMulDiv();
    if (v === null) return null;
    for (;;) {
      const c = peek();
      if (c === '+' || c === '-') {
        pos++;
        const r = parseMulDiv();
        if (r === null) return null;
        v = c === '+' ? v + r : v - r;
      } else return v;
    }
  }
  function parseShift(): number | null {
    let v = parseAddSub();
    if (v === null) return null;
    for (;;) {
      peek();
      const operator = s.slice(pos, pos + 2);
      if (operator !== '<<' && operator !== '>>') return v;
      pos += 2;
      const r = parseAddSub();
      if (r === null) return null;
      v = operator === '<<' ? v << r : v >> r;
    }
  }
  function parseBitAnd(): number | null {
    let v = parseShift();
    if (v === null) return null;
    while (peek() === '&' && s[pos + 1] !== '&') {
      pos++;
      const r = parseShift();
      if (r === null) return null;
      v = (v & r) >>> 0;
    }
    return v;
  }
  function parseXor(): number | null {
    let v = parseBitAnd();
    if (v === null) return null;
    while (peek() === '^') {
      pos++;
      const r = parseBitAnd();
      if (r === null) return null;
      v = (v ^ r) >>> 0;
    }
    return v;
  }
  function parseBitOr(): number | null {
    let v = parseXor();
    if (v === null) return null;
    while (peek() === '|' && s[pos + 1] !== '|') {
      pos++;
      const r = parseXor();
      if (r === null) return null;
      v = (v | r) >>> 0;
    }
    return v;
  }
  const v = parseBitOr();
  peek();
  return pos >= s.length && v !== null && Number.isFinite(v) ? v : null;
}

/**
 * Collect numeric constants: `#define NAME (expr)` plus the modern
 * `static constexpr XTAL NAME(expr);` / `static constexpr int NAME = expr;`
 * forms (the galaxian driver uses the latter exclusively).
 * `seed` supplies constants from other files (device headers define clocks
 * like NTSC_APU_CLOCK in terms of their own XTALs); later files win.
 */
/**
 * Resolve unscoped C/C++ enum entries used by driver/device headers.
 * A seed supplies values from included headers and earlier extraction passes.
 */
export function parseEnumConstants(
  src: string,
  seed: Record<string, number> = {},
): Record<string, number> {
  const resolved = { ...seed };
  for (const match of stripComments(src).matchAll(
    /\benum(?:\s+class)?(?:\s+\w+)?(?:\s*:\s*[^{]+)?\s*\{([\s\S]*?)\}\s*;/g,
  )) {
    let next = 0;
    let validNext = true;
    for (const rawEntry of splitArgs(match[1]!)) {
      const parsed = /^(\w+)(?:\s*=\s*([\s\S]+))?$/.exec(rawEntry.trim());
      if (!parsed) continue;
      if (parsed[2]) {
        const value = evalExpr(parsed[2], resolved);
        if (value === null) {
          validNext = false;
          continue;
        }
        next = value;
        validNext = true;
      }
      if (!validNext) continue;
      resolved[parsed[1]!] = next++;
    }
  }
  return resolved;
}

export function parseDefines(src: string, seed: Record<string, number> = {}): Record<string, number> {
  const out: Record<string, number> = { ...seed };
  const re = /^#define\s+(\w+)\s+(.+)$|(?:static\s+)?constexpr\s+(?:XTAL|int|unsigned|double|u?int\d+_t)\s+(\w+)\s*(?:\(([^;]*)\)|=\s*([^;]*))\s*;/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const name = m[1] ?? m[3];
    const expr = (m[2] ?? m[4] ?? m[5] ?? '').trim();
    if (!name || !expr) continue;
    const v = evalExpr(expr, out);
    if (v !== null) out[name] = v;
  }
  return out;
}

// ---------------------------------------------------------------------------
// GAME( year, name, parent, machine, input, class, init, monitor, company, fullname, flags )
// CONS/SYST/COMP( year, name, parent, compat, machine, input, class, init, company, fullname, flags )
//   — the SYST family has a COMPAT field where GAME has none, and no MONITOR
//     (orientation is hardcoded ROT0 in gamedrv.h).
// ---------------------------------------------------------------------------

export type GameKind = 'arcade' | 'console' | 'system' | 'computer';

export interface GameDef {
  year: string; name: string; parent: string; machine: string; input: string;
  cls: string; init: string; monitor: string; company: string; fullname: string; flags: string;
  kind: GameKind;
  /** software-compatibility group short-name (CONS/SYST/COMP arg 4); '0' when absent */
  compat: string;
}

const GAME_MACRO_KINDS: Record<string, GameKind> = {
  GAME: 'arcade', GAMEX: 'arcade', GAMEL: 'arcade',
  CONS: 'console', SYST: 'system', COMP: 'computer',
};

export function parseGames(src: string): GameDef[] {
  const out: GameDef[] = [];
  const re = /^\s*(GAME[XL]?|CONS|SYST|COMP)\s*\(/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const kind = GAME_MACRO_KINDS[m[1]];
    const open = src.indexOf('(', m.index);
    const close = matchParen(src, open);
    if (close < 0) continue;
    const args = splitArgs(src.slice(open + 1, close)).map(unquote);
    if (args.length < 10) continue;
    if (kind === 'arcade') {
      out.push({
        year: args[0], name: args[1], parent: args[2], machine: args[3], input: args[4],
        cls: args[5], init: args[6], monitor: args[7], company: args[8], fullname: args[9],
        flags: args.slice(10).join(', '),
        kind, compat: '0',
      });
    } else {
      out.push({
        year: args[0], name: args[1], parent: args[2], compat: args[3],
        machine: args[4], input: args[5], cls: args[6], init: args[7],
        monitor: 'ROT0', company: args[8], fullname: args[9],
        flags: args.slice(10).join(', '),
        kind,
      });
    }
  }
  return out;
}

function unquote(s: string): string {
  const t = s.trim();
  if (t.startsWith('"') && t.endsWith('"')) return t.slice(1, -1);
  return t;
}

// ---------------------------------------------------------------------------
// ROM_START(name) ... ROM_END
// ---------------------------------------------------------------------------

export interface RomLoad {
  file: string; offset: number; size: number; crc: string; sha1: string; reloadOffsets: number[];
  /**
   * Additional destination slices read from later in the same physical ROM.
   * MAME advances the file cursor through ROM_CONTINUE and ROM_IGNORE; Zig
   * Zag uses that to put the first half of each chip in gfx1 and the second
   * half in gfx2.
   */
  continueSegments: { offset: number; size: number; fileOffset: number }[];
  /**
   * MAME's own dump status for this chip. `nodump` means no copy of the part
   * exists anywhere (rocnrope's h100.6g PAL: "Schematics obfuscated"), so no
   * ROM set can supply it and MAME leaves the region erased. `baddump` means
   * the bytes are known-imperfect but usable. Without this, an undumped chip
   * is indistinguishable from a ROM set that is simply incomplete.
   */
  status?: 'nodump' | 'baddump';
  /** Bytes copied per group before skipping destination lanes (ROMX_LOAD). */
  groupSize?: number;
  /** Destination bytes skipped after each copied group. */
  skip?: number;
  /** Reverse byte order inside each group (ROM_LOAD16_WORD_SWAP). */
  reverse?: boolean;
  /** Merge each source byte's low nibble into this destination bit position. */
  nibbleShift?: 0 | 4;
}
export interface RomRegionDef {
  tag: string; size: number; flags: string; loads: RomLoad[];
  fills: { offset: number; size: number; value: number }[];
}
export interface RomSetDef { name: string; regions: RomRegionDef[]; }

function maskDisabledIfZero(source: string): string {
  const stack: { parent: boolean; condition: boolean }[] = [];
  let active = true;
  return source.split(/(\n)/).map(part => {
    if (part === '\n') return part;
    const directive = /^\s*#\s*(if|else|endif)\b\s*(.*)$/.exec(part);
    if (directive?.[1] === 'if') {
      const condition = directive[2]!.trim() !== '0';
      stack.push({ parent: active, condition });
      active = active && condition;
    } else if (directive?.[1] === 'else') {
      const frame = stack.at(-1);
      if (frame) active = frame.parent && !frame.condition;
    } else if (directive?.[1] === 'endif') {
      active = stack.pop()?.parent ?? true;
    }
    return active && !directive ? part : ' '.repeat(part.length);
  }).join('');
}

/** Expand source-local helper macros that emit ROM_REGION/ROM_LOAD statements. */
function expandRomMacros(source: string, initial: string): string {
  const macros = new Map<string, { parameters?: string[]; body: string }>();
  const definitions = /^[ \t]*#define\s+(\w+)(?:\(([^)]*)\))?[ \t]+((?:[^\n]*\\\r?\n)*[^\n]*)/gm;
  for (const match of source.matchAll(definitions)) {
    const body = match[3]!.replace(/\\\r?\n/g, '\n').trim();
    if (!/\bROM_[A-Z0-9_]+\b/.test(body)) continue;
    macros.set(match[1]!, {
      ...(match[2] !== undefined
        ? { parameters: match[2].split(',').map(parameter => parameter.trim()) }
        : {}),
      body,
    });
  }
  let expanded = initial;
  for (let pass = 0; pass < 12; pass++) {
    const before = expanded;
    for (const [name, macro] of macros) {
      if (!macro.parameters) {
        expanded = expanded.replace(new RegExp(`\\b${name}\\b`, 'g'), macro.body);
        continue;
      }
      const pattern = new RegExp(`\\b${name}\\s*\\(`, 'g');
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(expanded)) !== null) {
        const open = expanded.indexOf('(', match.index + name.length);
        const close = matchParen(expanded, open);
        if (close < 0) break;
        const args = splitArgs(expanded.slice(open + 1, close));
        let body = macro.body;
        macro.parameters.forEach((parameter, index) => {
          body = body.replace(new RegExp(`\\b${parameter}\\b`, 'g'), args[index] ?? '');
        });
        expanded = expanded.slice(0, match.index) + body + expanded.slice(close + 1);
        pattern.lastIndex = match.index + body.length;
      }
    }
    if (expanded === before) break;
  }
  return expanded;
}

export function parseRomSets(
  src: string,
  consts: Record<string, number> = parseDefines(src),
): RomSetDef[] {
  const out: RomSetDef[] = [];
  const re = /ROM_START\(\s*(\w+)\s*\)([\s\S]*?)ROM_END/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const set: RomSetDef = { name: m[1], regions: [] };
    const body = maskDisabledIfZero(expandRomMacros(src, m[2]));
    const stmtRe = /(ROM_REGION(?:16_BE|16_LE|32_BE|32_LE|64_BE|64_LE)?|ROM_LOAD(?:16_BYTE|16_WORD(?:_SWAP)?|32_BYTE|32_WORD(?:_SWAP)?|64_BYTE|64_WORD(?:_SWAP)?|_NIB_(?:LOW|HIGH))?|ROMX_LOAD|ROM_RELOAD|ROM_CONTINUE|ROM_IGNORE|ROM_FILL)\s*\(/g;
    let sm: RegExpExecArray | null;
    let region: RomRegionDef | null = null;
    let lastLoad: RomLoad | null = null;
    let fileOffset = 0;
    while ((sm = stmtRe.exec(body)) !== null) {
      const open = body.indexOf('(', sm.index + sm[1].length - 1);
      const close = matchParen(body, open);
      if (close < 0) continue;
      const args = splitArgs(body.slice(open + 1, close));
      const statement = sm[1]!;
      if (statement.startsWith('ROM_REGION')) {
          region = {
            size: evalExpr(args[0], consts) ?? 0,
            tag: unquote(args[1]),
            flags: args[2] ?? '',
            loads: [],
            fills: [],
          };
          set.regions.push(region);
          lastLoad = null;
          fileOffset = 0;
      } else if (statement.startsWith('ROM_LOAD') || statement === 'ROMX_LOAD') {
          if (!region) break;
          const flags = statement === 'ROMX_LOAD'
            ? args.slice(3).join(' | ')
            : args[3] ?? '';
          // ROM_SYSTEM_BIOS index zero is MAME's default unless a machine
          // declares another default. Loading every selectable BIOS in source
          // order would overwrite the real default with the final alternative.
          const bios = /ROM_BIOS\(\s*([^)]+)\s*\)/.exec(flags);
          if (bios && (evalExpr(bios[1]!, consts) ?? 0) !== 0) {
            lastLoad = null;
            fileOffset = 0;
            continue;
          }
          const crc = /CRC\(([0-9a-fA-F]+)\)/.exec(flags);
          const sha1 = /SHA1\(([0-9a-fA-F]+)\)/.exec(flags);
          lastLoad = {
            file: unquote(args[0]),
            offset: evalExpr(args[1], consts) ?? 0,
            size: evalExpr(args[2], consts) ?? 0,
            crc: crc ? crc[1] : '',
            sha1: sha1 ? sha1[1] : '',
            reloadOffsets: [],
            continueSegments: [],
            ...(/\bNO_DUMP\b/.test(flags)
              ? { status: 'nodump' as const }
              : /\bBAD_DUMP\b/.test(flags)
                ? { status: 'baddump' as const }
                : {}),
          };
          const loadFlags = statement === 'ROMX_LOAD' ? flags : statement;
          const groupSize = /(?:GROUPWORD|(?:16|32|64)_WORD)/.test(loadFlags) ? 2 : 1;
          const skip = statement.includes('16_BYTE') ? 1
            : statement.includes('32_BYTE') ? 3
              : statement.includes('32_WORD') ? 2
                : statement.includes('64_BYTE') ? 7
                  : statement.includes('64_WORD') ? 6
                    : Number(/ROM_SKIP\(\s*(\d+)\s*\)/.exec(loadFlags)?.[1] ?? 0);
          const reverse = /WORD_SWAP|ROM_REVERSE/.test(loadFlags);
          if (groupSize !== 1) lastLoad.groupSize = groupSize;
          if (skip) lastLoad.skip = skip;
          if (reverse) lastLoad.reverse = true;
          if (statement.endsWith('_NIB_LOW')) lastLoad.nibbleShift = 0;
          if (statement.endsWith('_NIB_HIGH')) lastLoad.nibbleShift = 4;
          region.loads.push(lastLoad);
          fileOffset = lastLoad.size;
      } else if (statement === 'ROM_RELOAD') {
          if (lastLoad) lastLoad.reloadOffsets.push(evalExpr(args[0], consts) ?? 0);
      } else if (statement === 'ROM_CONTINUE') {
          if (!lastLoad) break;
          const size = evalExpr(args[1], consts) ?? 0;
          lastLoad.continueSegments.push({
            offset: evalExpr(args[0], consts) ?? 0,
            size,
            fileOffset,
          });
          fileOffset += size;
      } else if (statement === 'ROM_IGNORE') {
          fileOffset += evalExpr(args[0], consts) ?? 0;
      } else if (statement === 'ROM_FILL') {
          if (!region) break;
          region.fills.push({
            offset: evalExpr(args[0], consts) ?? 0,
            size: evalExpr(args[1], consts) ?? 0,
            value: evalExpr(args[2], consts) ?? 0,
          });
      }
    }
    out.push(set);
  }
  return out;
}

// ---------------------------------------------------------------------------
// address maps: void cls::name(address_map &map) { map(a,b).ram().w(FUNC(x))...; }
// ---------------------------------------------------------------------------

export interface HandlerRef {
  /** driver-state method, or device method */
  method: string;
  /** device class (e.g. namco_06xx_device) when the handler lives on a device */
  deviceClass?: string;
  /** device reference: member (m_foo) or "tag" it was attached to in the map */
  deviceRef?: string;
  /** MAME inline map lambda (lw8/lr8) lowered as a generated handler. */
  inlineParameters?: string;
  inlineBody?: string;
}

export interface AddressRangeDef {
  start: number; end: number; mirror?: number;
  rom?: boolean; ram?: boolean; readonly?: boolean; writeonly?: boolean;
  nopw?: boolean; nopr?: boolean;
  read?: HandlerRef; write?: HandlerRef;
  /** input-port tag from .portr("IN0") / .portw(...) */
  portRead?: string; portWrite?: string;
  /** memory-bank name from .bankr(m_foo) / .bankr("foo") (m_ prefix stripped) */
  bankRead?: string; bankWrite?: string;
  /** Explicit ROM region and byte offset from .region("tag", offset). */
  region?: string; regionOffset?: number;
  share?: string;
  /**
   * `.umask16(0xff00)` and friends: the data lines this range's handler is
   * actually wired to. A narrower-than-bus device only answers on those lanes,
   * and MAME shifts the byte down to the handler's own width.
   */
  umask?: number;
  /** Entry-qualified memory_view mapping, e.g. m_rom_view[0](...). */
  viewTag?: string;
  viewEntry?: number;
  raw: string;
}

export interface AddressMapDef {
  cls: string; name: string; ranges: AddressRangeDef[];
  /** helper maps composed in via `other_map(map);` calls, in statement order */
  calls: string[];
  globalMask?: number;
  unmapHigh?: boolean;
}

export function parseAddressMaps(src: string): AddressMapDef[] {
  const fns = extractFunctionBody(
    src,
    /void\s+(\w+)::(\w+)\(address_map\s*&\s*map(?:\s*,[^)]*)?\)/g,
  );
  return fns.map(({ cls, name, body }) => {
    const ranges: AddressRangeDef[] = [];
    const calls: string[] = [];
    let globalMask: number | undefined;
    let unmapHigh: boolean | undefined;
    for (const stmt of splitStatements(body)) {
      const s = stmt.trim();
      // composition: galaxian_map(address_map &map) { galaxian_map_base(map); ... }
      const call = /^(?:(\w+)::)?(\w+)\(\s*map(?:\s*,[\s\S]*)?\)$/.exec(s);
      if (call) {
        calls.push(call[1] ? `${call[1]}::${call[2]}` : call[2]!);
        continue;
      }
      const mapProp = /^map\.(\w+)\s*\(([^)]*)\)$/.exec(s);
      if (mapProp) {
        if (mapProp[1] === 'global_mask') globalMask = evalExpr(mapProp[2]) ?? undefined;
        if (mapProp[1] === 'unmap_value_high') unmapHigh = true;
        continue;
      }
      const viewCall = /^(m_\w+)\s*\[\s*(\d+)\s*\]\s*\(/.exec(s);
      if (!s.startsWith('map(') && !viewCall) continue;
      const open = s.indexOf('(');
      const close = matchParen(s, open);
      const [startS, endS] = splitArgs(s.slice(open + 1, close));
      const range: AddressRangeDef = {
        start: evalExpr(startS) ?? 0,
        end: evalExpr(endS) ?? 0,
        raw: s,
      };
      if (viewCall) {
        range.viewTag = viewCall[1];
        range.viewEntry = Number(viewCall[2]);
      }
      for (const { method, args } of parseChain(s.slice(close + 1))) {
        switch (method) {
          case 'rom': range.rom = true; break;
          case 'ram': range.ram = true; break;
          case 'readonly': range.readonly = true; break;
          case 'writeonly': range.writeonly = true; break;
          case 'nopw': range.nopw = true; break;
          case 'nopr': range.nopr = true; break;
          case 'mirror': range.mirror = evalExpr(args[0]) ?? undefined; break;
          case 'umask16': case 'umask32': case 'umask64':
            range.umask = evalExpr(args[0]) ?? undefined;
            break;
          // member-ref shares (.share(m_fgvideoram)) normalize to the tag MAME
          // derives from the member name (strip m_)
          case 'share': range.share = unquote(args[0]).replace(/^m_/, ''); break;
          case 'portr': range.portRead = unquote(args[0]); break;
          case 'portw': range.portWrite = unquote(args[0]); break;
          case 'bankr': range.bankRead = unquote(args[0]).replace(/^m_/, ''); break;
          case 'bankw': range.bankWrite = unquote(args[0]).replace(/^m_/, ''); break;
          case 'bankrw': {
            const bank = unquote(args[0]).replace(/^m_/, '');
            range.bankRead = bank;
            range.bankWrite = bank;
            break;
          }
          case 'region':
            range.region = unquote(args[0]);
            range.regionOffset = evalExpr(args[1] ?? '0') ?? 0;
            break;
          case 'r': range.read = parseHandlerArgs(args); break;
          case 'w': range.write = parseHandlerArgs(args); break;
          case 'lr8': range.read = parseInlineHandler(args, name, range, 'lr8'); break;
          case 'lw8': range.write = parseInlineHandler(args, name, range, 'lw8'); break;
          case 'rw': {
            // rw(readFunc, writeFunc) or rw(dev, readFunc, writeFunc)
            if (args.length === 2) {
              range.read = parseHandlerArgs([args[0]]);
              range.write = parseHandlerArgs([args[1]]);
            } else {
              range.read = parseHandlerArgs([args[0], args[1]]);
              range.write = parseHandlerArgs([args[0], args[2]]);
            }
            break;
          }
          default: break;
        }
      }
      ranges.push(range);
    }
    return { cls, name, ranges, calls, globalMask, unmapHigh };
  });
}

function parseInlineHandler(
  args: string[],
  mapName: string,
  range: AddressRangeDef,
  kind: 'lr8' | 'lw8',
): HandlerRef | undefined {
  const source = args.join(',').trim().replace(/^NAME\s*\(/, '').replace(/\)\s*$/, '');
  const match = /\[[^\]]*\]\s*\(([^)]*)\)\s*\{([\s\S]*)\}\s*$/.exec(source);
  if (!match) return undefined;
  return {
    method: `__inline_${mapName}_${range.start.toString(16)}_${kind}`,
    inlineParameters: match[1].trim(),
    inlineBody: match[2].trim(),
  };
}

function splitStatements(body: string): string[] {
  const stmts: string[] = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '"') {
      const end = findStringEnd(body, i);
      cur += body.slice(i, end + 1);
      i = end;
    } else if (c === '(') { depth++; cur += c; }
    else if (c === ')') { depth--; cur += c; }
    else if (c === ';' && depth === 0) { stmts.push(cur.trim()); cur = ''; }
    else if (
      c === '\n' &&
      depth === 0 &&
      /^\s*MCFG_[A-Z0-9_]+\s*\([\s\S]*\)\s*$/.test(cur)
    ) {
      stmts.push(cur.trim());
      cur = '';
    }
    else cur += c;
  }
  if (cur.trim()) stmts.push(cur.trim());
  return stmts;
}

/** Parse a `.m1(args).m2(args)...` chain. */
function parseChain(s: string): { method: string; args: string[] }[] {
  const out: { method: string; args: string[] }[] = [];
  let i = 0;
  while (i < s.length) {
    const m = /^\s*\.\s*(\w+)\s*\(/.exec(s.slice(i));
    if (!m) break;
    const open = i + m[0].length - 1;
    const close = matchParen(s, open);
    if (close < 0) break;
    const inner = s.slice(open + 1, close);
    out.push({ method: m[1], args: inner.trim() ? splitArgs(inner) : [] });
    i = close + 1;
  }
  return out;
}

/** args like [FUNC(cls::meth)] or [m_dev, FUNC(dev_class::meth)] or ["tag", FUNC(...)];
 *  templated members (FUNC(m52_state::bgxpos_w<0>)) become method "bgxpos_w_0" */
function parseHandlerArgs(args: string[]): HandlerRef | undefined {
  const funcArg = args.find(a => a.includes('FUNC('));
  if (!funcArg) return undefined;
  const fm = /FUNC\(\s*(?:(\w+)::)?(\w+(?:<[^>]+>)?)\s*\)/.exec(funcArg);
  if (!fm) return undefined;
  const ref: HandlerRef = { method: normalizeTemplatedMethod(fm[2]) };
  if (fm[1]) ref.deviceClass = fm[1];
  const devArg = args.find(a => !a.includes('FUNC('));
  if (devArg) ref.deviceRef = unquote(devArg.trim());
  return ref;
}

function normalizeTemplatedMethod(method: string): string {
  return method.replace(/<([^>]+)>/, (_match, argument: string) =>
    `_${argument.replace(/[^A-Za-z0-9_]+/g, '_')}`);
}

// ---------------------------------------------------------------------------
// machine_config functions
// ---------------------------------------------------------------------------

export interface DeviceDef {
  /** device macro type: Z80, LS259, NAMCO_51XX, SCREEN, PALETTE, ... */
  type: string;
  /** resolved tag ("maincpu", "misclatch", ...) */
  tag: string;
  clock: number | null;
  clockExpr?: string;
  /** AS_PROGRAM etc -> address map function name */
  addrMaps: Record<string, string>;
  /** screen raw params if this is a screen with set_raw */
  screenRaw?: { pixclock: number; htotal: number; hbend: number; hbstart: number; vtotal: number; vbend: number; vbstart: number };
  /** screen params from the set_refresh_hz/set_size/set_visarea style (consoles: nes.cpp) */
  screenRefreshHz?: number;
  screenSize?: { w: number; h: number };
  screenVisarea?: { x0: number; x1: number; y0: number; y1: number };
  /** VIDEO_UPDATE_* flags passed to screen_device::set_video_attributes. */
  screenVideoAttributes?: string[];
  /** Sound output routes declared with add_route(output, target, gain). */
  audioRoutes?: {
    output: string;
    target: string;
    gain: number;
    input?: number;
    raw: string;
  }[];
  /** slot devices: NES_CONTROL_PORT(config, m_ctrl1, nes_control_port1_devices, "joypad") */
  slotOptions?: string;
  slotDefault?: string;
  /** every raw config statement that mentioned this device (for the generator + human) */
  config: string[];
  /** GFXDECODE(config, ..., gfx_name) reference */
  gfxDecodeName?: string;
  /** name of local C++ variable that aliases this device inside the config fn */
  localVar?: string;
}

export interface SoftwareListDef {
  /** config tag, e.g. "cart_list" */
  tag: string;
  /** hash/<name>.xml list name from set_original/set_compatible */
  name: string;
  status: 'original' | 'compatible';
  /** set_filter argument, e.g. "!EXP" */
  filter?: string;
}

export interface MachineConfigDef {
  cls: string; name: string;
  devices: DeviceDef[];
  /** SOFTWARE_LIST(config, ...) declarations (consoles/computers) */
  softwareLists: SoftwareListDef[];
  /** calls to other config helpers on the same class, e.g. galagab() calls galaga() */
  calls: string[];
  /**
   * How many of this config's own devices were declared before each call in
   * `calls`. MAME composes a machine in statement order — Rampage's mono_sg
   * calls its base first and then adds a sound board, while Qix's qix_base
   * creates its main CPU first and calls qix_video last — and the order
   * decides which CPU the frame schedule treats as the primary one.
   */
  callOrders: number[];
  /**
   * statements addressing a device instantiated in a CALLED config
   * (invaders(config) calls mw8080bw_root(config) then does
   * m_maincpu->set_addrmap(AS_IO, ...)) — resolved to the owning device at
   * graph-build time
   */
  patches: { tag: string; addrMaps: Record<string, string>; raw: string }[];
  /** remove_addrmap calls applied to devices inherited from a called config. */
  removedAddrMaps: { tag: string; space: string; raw: string }[];
  /** Devices explicitly removed from a called/base machine configuration. */
  removedDevices: { tag: string; raw: string }[];
  /**
   * Configuration applied to a device instantiated by a called base config.
   * Kept separate from address-map and gfx-decode patches because these
   * setters change the effective device itself (clock, screen timing and
   * callbacks).
   */
  devicePatches: {
    tag: string;
    config: string[];
    /** Device macro passed config.replace(), e.g. SEGA_315_5098. */
    replacementType?: string;
    clock?: number;
    screenRaw?: DeviceDef['screenRaw'];
  }[];
  /** set_info(...) changes to a GFXDECODE device instantiated by a called config. */
  gfxDecodePatches: { tag: string; name: string; raw: string }[];
  raw: string;
}

export interface MemoryBankDef {
  member: string;
  tag: string;
  startEntry: number;
  entries: number;
  region?: string;
  /** Array/member storage allocated by the driver rather than a ROM region. */
  entryMember?: string;
  offset: number;
  stride: number;
  /** Entry selects base + ((entry << shift) & region-derived mask). */
  dynamicShift?: number;
  raw: string;
}

export interface InstalledHandlerDef {
  space: string;
  kind: 'read' | 'write';
  start: number;
  end: number;
  mirror?: number;
  className: string;
  method: string;
}

/**
 * Address-space handlers installed by a selected driver-init method.
 *
 * These are executable map overrides, not ordinary calls: MAME installs them
 * after machine construction, so generation appends them after the static map
 * and lets the bus's normal last-range-wins semantics apply.
 */
export function parseInstalledHandlers(
  body: string,
  consts: Record<string, number>,
): InstalledHandlerDef[] {
  const installed: InstalledHandlerDef[] = [];
  const spaces = new Map<string, string>();
  for (const declaration of body.matchAll(
    /\baddress_space\s*&\s*(\w+)\s*\([^;]*?(?:->|\.)\s*space\s*\(\s*(AS_\w+)\s*\)\s*\)\s*;/g,
  )) spaces.set(declaration[1]!, declaration[2]!);
  const pattern = /\b(space\s*\(\s*(AS_\w+)\s*\)|(\w+))\s*\.\s*install_(read|write)_handler\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(body)) !== null) {
    const open = body.indexOf('(', match.index + match[0]!.lastIndexOf('install_'));
    const close = matchParen(body, open);
    if (close < 0) continue;
    const args = splitArgs(body.slice(open + 1, close));
    const callback = /FUNC\s*\(\s*(\w+)::(\w+)\s*\)/.exec(body.slice(open + 1, close));
    const space = match[2] ?? spaces.get(match[3]!);
    if (!space || !callback || args.length < 3) continue;
    const start = evalExpr(args[0]!, consts);
    const end = evalExpr(args[1]!, consts);
    if (start === null || end === null) continue;
    // The long install overload is (start, end, mask, mirror, select,
    // delegate). Preserve the mirror so dynamically installed board I/O is
    // decoded over the same address window as MAME.
    const mirror = args.length >= 6 ? evalExpr(args[3]!, consts) : null;
    installed.push({
      space,
      kind: match[4]! as 'read' | 'write',
      start,
      end,
      ...(mirror !== null && mirror !== 0 ? { mirror } : {}),
      className: callback[1]!,
      method: callback[2]!,
    });
    pattern.lastIndex = close + 1;
  }
  return installed;
}

/**
 * Parse MAME memory_bank configuration from a machine_start body.
 *
 * A bank may be configured by several calls: `configure_entries` fills a run of
 * equally spaced entries, and `configure_entry` places one entry anywhere. Each
 * call becomes its own definition so a bank whose entries are not one
 * arithmetic run (Ghosts'n Goblins puts entry 4 outside the banked run) stays
 * source-accurate.
 */
export function parseMemoryBanks(
  body: string,
  memberTags: Record<string, string>,
  consts: Record<string, number>,
): MemoryBankDef[] {
  const banks: MemoryBankDef[] = [];
  const regionAliases = pointerRegionAliases(body);
  const call =
    /(?:\b(m_\w+(?:\s*\[\s*\d+\s*\])?)|membank\(\s*"([^"]+)"\s*\))\s*->\s*configure_(entries|entry)\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = call.exec(body)) !== null) {
    const open = body.indexOf('(', match.index + match[0]!.lastIndexOf('configure_'));
    const close = matchParen(body, open);
    if (close < 0) continue;
    const plural = match[3] === 'entries';
    const args = splitArgs(body.slice(open + 1, close));
    if (args.length !== (plural ? 4 : 2)) continue;
    let source = regionPointer(
      args[plural ? 2 : 1]!,
      regionAliases,
      memberTags,
      consts,
    );
    // Neo Geo's audio main bank deliberately spans two ROM regions: entry 0
    // is the SM1 audio BIOS when present, entry 1 is the cartridge M1 ROM.
    // A conditional pointer expression otherwise resolves through its `ROM`
    // fallback and silently starts the Z80 on the wrong firmware.
    if (/m_region_audiobios[^?]*\?[^:]*m_region_audiobios\s*->\s*base\s*\(\s*\)/
      .test(args[plural ? 2 : 1]!)) {
      source = { region: 'audiobios', offset: 0 };
    }
    const owned = /^(m_\w+(?:\s*\[\s*(\d+)\s*\])?)(?:\.get\(\))?$/.exec(
      args[plural ? 2 : 1]!.trim(),
    );
    const startEntry = evalExpr(args[0]!, consts);
    const entries = plural ? evalExpr(args[1]!, consts) : 1;
    const stride = plural ? evalExpr(args[3]!, consts) : 0;
    if ((!source && !owned) || startEntry === null || entries === null || stride === null) continue;
    const member = match[1]?.replace(/\s+/g, '') ?? match[2]!;
    banks.push({
      member,
      tag: match[2] ?? memberTags[member] ?? member.replace(/^m_/, ''),
      startEntry,
      entries,
      ...(source ? { region: source.region, offset: source.offset } : {
        entryMember: owned![1]!.replace(/\s+/g, ''),
        offset: Number(owned![2] ?? 0),
      }),
      stride,
      raw: body.slice(match.index, close + 1).trim(),
    });
    call.lastIndex = close + 1;
  }
  if (/m_bank_audio_cart\s*\[\s*region\s*\]\s*->\s*configure_entry\s*\(\s*bank\s*,\s*&ROM\s*\[\s*bank_address\s*\]\s*\)/.test(body)) {
    for (const [tag, shift] of [
      ['audio_f000', 11], ['audio_e000', 12], ['audio_c000', 13], ['audio_8000', 14],
    ] as const) {
      banks.push({
        member: tag,
        tag,
        startEntry: 0,
        entries: 256,
        region: regionAliases.ROM ?? 'cslot1:audiocpu',
        offset: 0x10000,
        stride: 0,
        dynamicShift: shift,
        raw: 'm_bank_audio_cart[region]->configure_entry(bank, &ROM[bank_address])',
      });
    }
  }
  return banks;
}

/** Local pointers aliasing a region base: `uint8_t *rombase = memregion(...)`. */
function pointerRegionAliases(body: string): Record<string, string> {
  const aliases: Record<string, string> = {};
  const re =
    /\b(?:const\s+)?(?:uint8_t|u8|char)\s*\*\s*(\w+)\s*=\s*memregion\(\s*"([^"]+)"\s*\)\s*->\s*base\(\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(body)) !== null) aliases[match[1]!] = match[2]!;
  const audio = /\b(?:uint8_t|u8)\s*\*\s*(\w+)\s*=\s*[^;]*\bget_audio_base\s*\(\s*\)[^;]*;/.exec(body);
  if (audio) aliases[audio[1]!] = 'cslot1:audiocpu';
  const program = /\b(?:uint8_t|u8)\s*\*\s*(\w+)\s*=\s*[^;]*\bget_rom_base\s*\(\s*\)[^;]*;/.exec(body);
  if (program) aliases[program[1]!] = 'cslot1:maincpu';
  return aliases;
}

/**
 * Resolve a bank base expression to a region and byte offset. MAME writes these
 * as `memregion("r")->base() + n`, `&alias[n]` or `alias + n`.
 */
function regionPointer(
  expression: string,
  aliases: Record<string, string>,
  memberTags: Record<string, string>,
  consts: Record<string, number>,
): { region: string; offset: number } | undefined {
  const text = expression.trim();
  const conditionalAlias = /:\s*(\w+)\s*\)?$/.exec(text);
  if (conditionalAlias && aliases[conditionalAlias[1]!]) {
    return { region: aliases[conditionalAlias[1]!]!, offset: 0 };
  }
  const direct = /^memregion\(\s*"([^"]+)"\s*\)\s*->\s*base\(\)\s*(?:\+\s*(.+))?$/.exec(text);
  if (direct) {
    const offset = evalExpr(direct[2] ?? '0', consts);
    return offset === null ? undefined : { region: direct[1]!, offset };
  }
  const member = /^(m_\w+)\s*->\s*base\(\)\s*(?:\+\s*(.+))?$/.exec(text);
  if (member && memberTags[member[1]!]) {
    const offset = evalExpr(member[2] ?? '0', consts);
    return offset === null
      ? undefined
      : { region: memberTags[member[1]!]!.replace(/^:/, ''), offset };
  }
  const indexed = /^&\s*(\w+)\s*\[\s*(.+?)\s*\]$/.exec(text);
  if (indexed && aliases[indexed[1]!]) {
    const offset = evalExpr(indexed[2]!, consts);
    return offset === null ? undefined : { region: aliases[indexed[1]!]!, offset };
  }
  const added = /^(\w+)\s*(?:\+\s*(.+))?$/.exec(text);
  if (added && aliases[added[1]!]) {
    const offset = evalExpr(added[2] ?? '0', consts);
    return offset === null ? undefined : { region: aliases[added[1]!]!, offset };
  }
  return undefined;
}

/**
 * Parse `m_foo(*this, "tag")` from state-class constructor initializer lists.
 *
 * MAME's array finders take a printf format and a starting index instead —
 * `m_ym(*this, "ym%u", 1)` names the devices `ym1` and `ym2`. Those elements are
 * referenced as `m_ym[0]`/`m_ym[1]` in the machine config while the address map
 * uses the formatted tags, so both spellings are recorded here.
 */
export function parseMemberTags(src: string): Record<string, string> {
  const out: Record<string, string> = {};
  const counts = arrayFinderCounts(src);
  const re = /m_(\w+)\(\*this,\s*"([^"]+)"(?:\s*,\s*('?[\w']+'?)\s*)?\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const member = `m_${m[1]}`;
    const format = m[2];
    const start = m[3];
    out[member] = format;
    if (start === undefined || !/%[-0-9.]*[a-z]/i.test(format)) continue;
    const count = counts[member];
    if (!count) continue;
    for (let index = 0; index < count; index++) {
      out[`${member}[${index}]`] = formatFinderTag(format, start, index);
    }
  }
  return out;
}

/**
 * Element count of each finder-array declaration. Device arrays use
 * `<Type, N>`, while memory-bank arrays use `<N>`.
 */
function arrayFinderCounts(src: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const re = /\b(?:required|optional)_\w*array\s*<([^<>]*)>\s+(m_\w+)\s*;/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const args = splitArgs(m[1]!);
    const count = Number(args.at(-1)?.replace(/[uUlL]+$/g, ''));
    if (Number.isFinite(count)) counts[m[2]!] = count;
  }
  return counts;
}

/** MAME formats array-finder tags with string_format(format, start + index). */
function formatFinderTag(format: string, start: string, index: number): string {
  const character = /^'(.)'$/.exec(start);
  return format.replace(/%[-0-9.]*([a-z])/i, (_match, conversion: string) => {
    if (conversion === 'c' || character) {
      const base = character
        ? character[1].charCodeAt(0)
        : Number(start.replace(/[uUlL]+$/g, ''));
      return String.fromCharCode(base + index);
    }
    return String(Number(start.replace(/[uUlL]+$/g, '')) + index);
  });
}

const DEVICE_MACRO_RE = /^(?:[\w]+\s+)?(?:&?\s*(\w+)\s*\(\s*)?([A-Z][A-Z0-9_]{1,})\s*\(\s*config\s*,\s*([^,)]+)\s*(?:,\s*([^;]+?))?\)\s*\)?/;

export function parseMachineConfigs(
  src: string,
  memberTags: Record<string, string>,
  consts: Record<string, number>,
): MachineConfigDef[] {
  const fns = extractFunctionBody(src, /void\s+(\w+)::(\w+)\(machine_config\s*&\s*config\)/g);
  return fns.map(({ cls, name, body }) => {
    const cfg: MachineConfigDef = {
      cls,
      name,
      devices: [],
      softwareLists: [],
      calls: [],
      callOrders: [],
      patches: [],
      removedAddrMaps: [],
      removedDevices: [],
      devicePatches: [],
      gfxDecodePatches: [],
      raw: body.trim(),
    };
    const byRef = new Map<string, DeviceDef>(); // m_member, "tag", or localVar -> device
    const resolveTag = (ref: string): string => {
      const r = ref.trim();
      // A leading ':' is MAME's absolute-tag syntax, not part of the device
      // name or its ROM region (TRACKFLD_AUDIO exposes ":audiocpu").
      if (r.startsWith('"')) return unquote(r).replace(/^:/, '');
      return (memberTags[r] ?? r.replace(/^m_/, '')).replace(/^:/, '');
    };

    const statements = splitStatements(body);
    // MAME occasionally instantiates a finder array in a small counted loop
    // instead of spelling out each device (Mario's four sound latches). Expand
    // those declarations into the same source forms handled below.
    for (const loop of body.matchAll(
      /for\s*\(\s*int\s+(\w+)\s*=\s*0\s*;\s*\1\s*<\s*(\d+)\s*;\s*\1\+\+\s*\)\s*([A-Z][A-Z0-9_]{1,})\s*\(\s*config\s*,\s*(m_\w+)\s*\[\s*\1\s*\]\s*\)\s*;/g,
    )) {
      const count = Number(loop[2]);
      for (let index = 0; index < count; index++) {
        statements.push(`${loop[3]}(config, ${loop[4]}[${index}])`);
      }
    }
    for (const stmt of statements) {
      const s = stmt.trim();
      if (!s) continue;

      // Derived configurations remove inherited devices by tag.  This must be
      // composed before executable hardware is selected; retaining the base
      // device changes nullable-finder branches in driver handlers (System 1
      // selects its PIO rather than the removed 8255, for example).
      const deviceRemoval = /^config\.device_remove\(\s*"([^"]+)"\s*\)$/.exec(s);
      if (deviceRemoval) {
        cfg.removedDevices.push({
          tag: deviceRemoval[1]!.replace(/^:/, ''),
          raw: s,
        });
        continue;
      }

      // A derived machine config can replace a device instantiated by its
      // base config.  MAME spells this as a normal device macro whose first
      // argument is config.replace(), often wrapped in a local reference:
      //   segacrpt_z80_device &z80(SEGA_315_5098(
      //     config.replace(), m_maincpu, MASTER_CLOCK / 5));
      // It is not a second device; preserve the effective type/clock as an
      // inherited-device patch and let the per-game graph apply it.
      const replacement = /(?:\b\w+(?:_device)?\s*&\s*(\w+)\s*\(\s*)?\b([A-Z][A-Z0-9_]{1,})\s*\(\s*config\.replace\(\)\s*,\s*([^,]+)\s*,\s*([\s\S]+?)\)\s*\)?$/.exec(s);
      if (replacement) {
        const [, localVar, replacementType, refRaw, clockRaw] = replacement;
        const tag = resolveTag(refRaw);
        const clock = evalExpr(clockRaw, consts);
        const patch = {
          tag,
          config: [s],
          replacementType,
          ...(clock !== null ? { clock } : {}),
        };
        cfg.devicePatches.push(patch);
        // The local is only used for follow-up setters. They remain useful
        // provenance on this same patch even though no new Device is emitted.
        if (localVar) {
          byRef.set(localVar, {
            type: replacementType,
            tag,
            clock,
            ...(clock === null ? { clockExpr: clockRaw.trim() } : {}),
            addrMaps: {},
            config: patch.config,
            localVar,
          });
        }
        continue;
      }

      // helper/base call: galaga(config) or tpp1_state::config(config).
      const call = /^(?:(\w+)::)?(\w+)\(\s*config\s*\)$/.exec(s);
      if (call) {
        cfg.callOrders.push(cfg.devices.length);
        cfg.calls.push(call[1] ? `${call[1]}::${call[2]}` : call[2]!);
        continue;
      }

      // device instantiation, possibly wrapped: type_device &var(TYPE(config, ref[, clock]));
      const dm = DEVICE_MACRO_RE.exec(s);
      if (dm && dm[2] !== 'FUNC' && dm[2] !== 'AS_PROGRAM') {
        const [, localVar, type] = dm;
        // re-derive the args with balanced parens: the regex's lazy capture
        // truncates clocks like XTAL(3'579'545) at the inner ')'
        const open = s.indexOf('(', s.indexOf(type) + type.length - 1);
        const close = matchParen(s, open);
        const args = splitArgs(s.slice(open + 1, close)); // [config, ref, ...rest]
        // SOFTWARE_LIST(config, "cart_list").set_original("nes").set_filter("!EXP")
        // is a catalog declaration, not a device
        if (type === 'SOFTWARE_LIST') {
          const list: SoftwareListDef = { tag: unquote(args[1] ?? ''), name: '', status: 'original' };
          for (const { method, args: chainArgs } of parseChain(s.slice(close + 1))) {
            if (method === 'set_original') { list.name = unquote(chainArgs[0] ?? ''); list.status = 'original'; }
            else if (method === 'set_compatible') { list.name = unquote(chainArgs[0] ?? ''); list.status = 'compatible'; }
            else if (method === 'set_filter') list.filter = unquote(chainArgs[0] ?? '');
          }
          if (list.name) cfg.softwareLists.push(list);
          continue;
        }
        const refRaw = args[1] ?? dm[3];
        // Device macros may carry constructor configuration after the clock
        // (OKIM6295(..., clock, PIN7_HIGH)).  Only the third argument is the
        // clock expression; folding later arguments into it leaves otherwise
        // evaluable clocks unresolved.
        const clockRaw = args.length > 2 ? args[2] : undefined;
        const ref = refRaw.trim();
        const dev: DeviceDef = {
          type,
          tag: resolveTag(ref),
          clock: clockRaw ? evalExpr(clockRaw, consts) : null,
          addrMaps: {},
          config: [s],
        };
        if (clockRaw && dev.clock === null) dev.clockExpr = clockRaw.trim();
        if (localVar) { dev.localVar = localVar; byRef.set(localVar, dev); }
        byRef.set(ref, dev);
        byRef.set(dev.tag, dev);
        if (ref.startsWith('"')) byRef.set(unquote(ref), dev);
        // GFXDECODE(config, m_gfxdecode, m_palette, gfx_galaga)
        if (type === 'GFXDECODE' && args.length > 2) {
          dev.gfxDecodeName = args[args.length - 1]?.trim();
        }
        // Slot device with an options table + quoted default.  Most option
        // tables use a *_devices name (NES), but MAME also uses board-specific
        // names such as neogeo_arc_edge.  Verify the third argument against an
        // actual device_slot_interface function instead of relying on naming.
        //
        //   NES_CONTROL_PORT(..., nes_control_port1_devices, "joypad")
        //   NEOGEO_CTRL_EDGE_CONNECTOR(..., neogeo_arc_edge, "joy", false)
        const slotOptions = args[2]?.trim() ?? '';
        const hasSlotOptions = slotOptions.length > 0 && new RegExp(
          `\\b(?:void\\s+)?${slotOptions}\\s*\\(\\s*device_slot_interface\\s*&`,
        ).test(src);
        if (
          args.length >= 4
          && (
            /_devices$/.test(slotOptions)
            || hasSlotOptions
            || /(?:_PORT|_CONNECTOR)$/.test(type)
          )
          && args[3].trim().startsWith('"')
        ) {
          dev.slotOptions = slotOptions;
          dev.slotDefault = unquote(args[3]);
          dev.clock = null;
          delete dev.clockExpr;
        }
        for (const chain of parseChain(s.slice(close + 1))) {
          if (chain.method !== 'add_route') continue;
          const [output = '', target = '', gain = '', input = ''] = chain.args;
          const parsedGain = evalExpr(gain, consts);
          const parsedInput = input ? evalExpr(input, consts) : null;
          if (target.trim().startsWith('"') && parsedGain !== null) {
            (dev.audioRoutes ??= []).push({
              output: output.trim(),
              target: unquote(target),
              gain: parsedGain,
              ...(parsedInput !== null ? { input: parsedInput } : {}),
              raw: s,
            });
          }
        }
        cfg.devices.push(dev);
        continue;
      }

      // member/local/tag method calls: m_x->..., var.set_raw(...), subdevice
      // Device-array elements are referenced with a subscript, as in
      // m_ym[0]->add_route(...); the byRef lookup below rejects non-devices.
      const subdeviceCall =
        /^subdevice<[^>]+>\(\s*"([^"]+)"\s*\)\s*->\s*(\w+)(<\d+>)?\s*\(/.exec(s);
      const mc = subdeviceCall
        ? [subdeviceCall[0], `"${subdeviceCall[1]}"`, subdeviceCall[2], subdeviceCall[3]]
        : /^([\w."<>[\]]+?)\s*(?:->|\.)\s*(\w+)(<\d+>)?\s*\(/.exec(s);
      if (mc) {
        const [, refRaw, method] = mc;
        const dev = byRef.get(refRaw) ?? byRef.get(resolveTag(refRaw));
        if (method === 'remove_addrmap') {
          const open = s.indexOf('(', s.indexOf(method));
          const close = matchParen(s, open);
          const [space = ''] = splitArgs(s.slice(open + 1, close));
          if (space.trim()) {
            if (dev) delete dev.addrMaps[space.trim()];
            cfg.removedAddrMaps.push({
              tag: resolveTag(refRaw),
              space: space.trim(),
              raw: s,
            });
          }
          continue;
        }
        if (!dev && method === 'set_addrmap' && refRaw.startsWith('m_')) {
          // device lives in a CALLED config — record as a patch by tag
          const open = s.indexOf('(', s.indexOf(method));
          const close = matchParen(s, open);
          const [space, mapRef] = splitArgs(s.slice(open + 1, close));
          const mm = /&\s*\w+::(\w+)/.exec(mapRef ?? '');
          if (mm) cfg.patches.push({ tag: resolveTag(refRaw), addrMaps: { [space.trim()]: mm[1] }, raw: s });
          continue;
        }
        if (!dev && method === 'set_info' && refRaw.startsWith('m_')) {
          const open = s.indexOf('(', s.indexOf(method));
          const close = matchParen(s, open);
          const [decodeName] = splitArgs(s.slice(open + 1, close));
          if (/^\w+$/.test(decodeName?.trim() ?? '')) {
            cfg.gfxDecodePatches.push({
              tag: resolveTag(refRaw),
              name: decodeName!.trim(),
              raw: s,
            });
          }
          continue;
        }
        if (!dev && (refRaw.startsWith('m_') || refRaw.startsWith('"'))) {
          const tag = resolveTag(refRaw);
          let patch = cfg.devicePatches.find(candidate => candidate.tag === tag);
          if (!patch) {
            patch = { tag, config: [] };
            cfg.devicePatches.push(patch);
          }
          patch.config.push(s);
          const open = s.indexOf('(', s.indexOf(method));
          const close = matchParen(s, open);
          const args = splitArgs(s.slice(open + 1, close));
          if (method === 'set_clock') {
            const clock = evalExpr(args[0] ?? '', consts);
            if (clock !== null) patch.clock = clock;
          } else if (method === 'set_raw') {
            const values = args.map(value => evalExpr(value, consts));
            if (values.length >= 7 && values.every(value => value !== null)) {
              patch.screenRaw = {
                pixclock: values[0]!,
                htotal: values[1]!,
                hbend: values[2]!,
                hbstart: values[3]!,
                vtotal: values[4]!,
                vbend: values[5]!,
                vbstart: values[6]!,
              };
            }
          }
          continue;
        }
        if (dev) {
          dev.config.push(s);
          if (method === 'set_addrmap') {
            const open = s.indexOf('(', s.indexOf(method));
            const close = matchParen(s, open);
            const [space, mapRef] = splitArgs(s.slice(open + 1, close));
            const mm = /&\s*\w+::(\w+)/.exec(mapRef ?? '');
            if (mm) dev.addrMaps[space.trim()] = mm[1];
          } else if (method === 'add_route') {
            const open = s.indexOf('(', s.indexOf(method));
            const close = matchParen(s, open);
            const [output = '', target = '', gain = '', input = ''] =
              splitArgs(s.slice(open + 1, close));
            const parsedGain = evalExpr(gain, consts);
            const parsedInput = input ? evalExpr(input, consts) : null;
            if (target.trim().startsWith('"') && parsedGain !== null) {
              (dev.audioRoutes ??= []).push({
                output: output.trim(),
                target: unquote(target),
                gain: parsedGain,
                ...(parsedInput !== null ? { input: parsedInput } : {}),
                raw: s,
              });
            }
          } else if (method === 'set_raw') {
            const open = s.indexOf('(', s.indexOf(method));
            const close = matchParen(s, open);
            const a = splitArgs(s.slice(open + 1, close)).map(x => evalExpr(x, consts) ?? 0);
            if (a.length >= 7) {
              dev.screenRaw = { pixclock: a[0], htotal: a[1], hbend: a[2], hbstart: a[3], vtotal: a[4], vbend: a[5], vbstart: a[6] };
            }
          } else if (method === 'set_video_attributes') {
            const open = s.indexOf('(', s.indexOf(method));
            const close = matchParen(s, open);
            dev.screenVideoAttributes = splitArgs(s.slice(open + 1, close))
              .flatMap(value => value.split('|'))
              .map(value => value.trim())
              .filter(Boolean);
          } else if (method === 'set_refresh_hz' || method === 'set_size' || method === 'set_visarea') {
            // the console screen style (nes.cpp): no set_raw, three setters instead
            const open = s.indexOf('(', s.indexOf(method));
            const close = matchParen(s, open);
            const a = splitArgs(s.slice(open + 1, close)).map(x => evalExpr(x, consts));
            if (method === 'set_refresh_hz' && a[0] !== null) dev.screenRefreshHz = a[0];
            else if (method === 'set_size' && a.length >= 2 && a[0] !== null && a[1] !== null) {
              dev.screenSize = { w: a[0], h: a[1] };
            } else if (method === 'set_visarea' && a.length >= 4 && a.every(v => v !== null)) {
              dev.screenVisarea = { x0: a[0]!, x1: a[1]!, y0: a[2]!, y1: a[3]! };
            }
          }
          continue;
        }
      }

      // anything else that mentions a known device ref: attach as raw config
      let attached = false;
      for (const [ref, dev] of byRef) {
        if (ref && s.includes(ref)) { dev.config.push(s); attached = true; break; }
      }
      if (!attached && cfg.devices.length) {
        // keep orphan statements on the config itself via a pseudo entry later if needed
      }
    }
    return cfg;
  });
}

// ---------------------------------------------------------------------------
// input ports
// ---------------------------------------------------------------------------

export interface PortFieldDef {
  kind: 'bit' | 'dip' | 'service';
  mask: number;
  activeLow?: boolean;
  type?: string;             // IPT_JOYSTICK_LEFT, ...
  modifiers?: string[];      // PORT_2WAY, PORT_COCKTAIL, ...
  name?: string;             // dip switch name
  defaultValue?: number;     // dip default
  location?: string;
  settings?: { value: number; name: string; condition?: string }[];
}
export interface PortDef { tag: string; modify?: boolean; fields: PortFieldDef[]; }
export interface InputPortsDef { name: string; includes?: string[]; ports: PortDef[]; }

/**
 * Collect #define text macros used inside INPUT_PORTS blocks:
 * - port macros (multi-line bodies of PORT_* tokens, optionally with
 *   parameters — mw8080bw's INVADERS_CONTROL_PORT_PLAYER(player))
 * - string constants (#define INVADERS_P1_CONTROL_PORT_TAG ("CONTP1"))
 */
export interface TextMacros {
  ports: Record<string, { params: string[]; body: string }>;
  strings: Record<string, string>;
}

export function parseTextMacros(src: string): TextMacros {
  const out: TextMacros = { ports: {}, strings: {} };
  const re = /^[ \t]*#define\s+(\w+)(\(([^)]*)\))?[ \t]*((?:[^\n]*\\\r?\n)*[^\n]*)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    const params = m[3] ? m[3].split(',').map(p => p.trim()).filter(Boolean) : [];
    const body = m[4].replace(/\\\r?\n/g, '\n').trim();
    const str = /^\(?\s*("(?:[^"\\]|\\.)*")\s*\)?$/.exec(body);
    if (str) out.strings[name] = str[1].slice(1, -1);
    else if (/PORT_[A-Z]/.test(body)) out.ports[name] = { params, body };
  }
  return out;
}

/** Expand port macros (with positional params) inside an INPUT_PORTS body. */
function expandPortMacros(body: string, macros: TextMacros): string {
  for (let pass = 0; pass < 5; pass++) {
    let changed = false;
    for (const [name, mac] of Object.entries(macros.ports)) {
      // args may nest one paren level: KONAMI_COINAGE_LOC(DEF_STR( 1C_1C ), ...)
      const re = new RegExp(`\\b${name}\\b(?:\\s*\\(((?:[^()]|\\([^()]*\\))*)\\))?`, 'g');
      body = body.replace(re, (whole, argsRaw: string | undefined) => {
        if (mac.params.length && argsRaw === undefined) return whole; // param macro without args: leave
        changed = true;
        let expansion = mac.body;
        if (mac.params.length) {
          const args = splitArgs(argsRaw ?? '');
          mac.params.forEach((p, i) => {
            expansion = expansion.replace(new RegExp(`\\b${p}\\b`, 'g'), args[i] ?? '');
          });
        }
        // cpp token pasting: IPT_JOYSTICK_##direction1 -> IPT_JOYSTICK_LEFT
        // (konamipt.h KONAMI8_* — junofrst lost its LEFT/RIGHT to this once)
        return expansion.replace(/\s*##\s*/g, '');
      });
    }
    if (!changed) break;
  }
  return body;
}

export function parseInputPorts(src: string, macros: TextMacros = { ports: {}, strings: {} }): InputPortsDef[] {
  const out: InputPortsDef[] = [];
  const resolveStr = (s: string): string => {
    const t = unquote(s.trim().replace(/^\(/, '').replace(/\)$/, '').trim());
    return macros.strings[t] ?? unquote(t);
  };
  const re = /INPUT_PORTS_START\(\s*(\w+)\s*\)([\s\S]*?)INPUT_PORTS_END/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const def: InputPortsDef = { name: m[1], ports: [] };
    const body = expandPortMacros(m[2], macros);
    let port: PortDef | null = null;
    let dip: PortFieldDef | null = null;
    const tokRe = /(PORT_START|PORT_MODIFY|PORT_INCLUDE|PORT_BIT|PORT_DIPNAME|PORT_DIPSETTING|PORT_SERVICE_NO_TOGGLE|PORT_SERVICE_DIPLOC|PORT_SERVICE|PORT_DIPLOCATION|PORT_DIPUNUSED_DIPLOC|PORT_CONDITION|PORT_CONFNAME|PORT_CONFSETTING)\s*\(/g;
    let tm: RegExpExecArray | null;
    while ((tm = tokRe.exec(body)) !== null) {
      const open = body.indexOf('(', tm.index + tm[1].length - 1);
      const close = matchParen(body, open);
      if (close < 0) continue;
      const args = splitArgs(body.slice(open + 1, close));
      const trailing = body.slice(close + 1, body.indexOf('\n', close) === -1 ? body.length : body.indexOf('\n', close));
      switch (tm[1]) {
        case 'PORT_INCLUDE':
          (def.includes ??= []).push(args[0].trim());
          break;
        case 'PORT_START': port = { tag: resolveStr(args[0]), fields: [] }; def.ports.push(port); dip = null; break;
        case 'PORT_MODIFY': port = { tag: resolveStr(args[0]), modify: true, fields: [] }; def.ports.push(port); dip = null; break;
        case 'PORT_BIT': {
          if (!port) break;
          // A modifier's argument can nest — Defender's turn-around button is
          // PORT_NAME(DEF_STR( Reverse )) — and `\([^)]*\)` stops at the inner
          // close, yielding `PORT_NAME(DEF_STR( Reverse )`. Every downstream
          // PORT_NAME match then fails and the input falls back to its raw
          // IPT_ constant, so the button reads "IPT_BUTTON5" and, worse, is
          // indistinguishable from one MAME never named. Balance instead, and
          // skip hits swallowed by an earlier modifier's arguments.
          const mods: string[] = [];
          let consumed = 0;
          for (const hit of trailing.matchAll(/PORT_\w+/g)) {
            const start = hit.index ?? 0;
            if (start < consumed) continue;
            const after = start + hit[0].length;
            const end = trailing[after] === '(' ? matchParen(trailing, after) : -1;
            mods.push(end < 0 ? hit[0] : trailing.slice(start, end + 1));
            consumed = end < 0 ? after : end + 1;
          }
          port.fields.push({
            kind: 'bit',
            mask: evalExpr(args[0]) ?? 0,
            activeLow: args[1].includes('LOW'),
            type: args[2].trim(),
            modifiers: mods.length ? mods : undefined,
          });
          dip = null;
          break;
        }
        case 'PORT_SERVICE_DIPLOC': // service dip with a DIPLOC arg — same semantics
        case 'PORT_SERVICE_NO_TOGGLE':
        case 'PORT_SERVICE': {
          if (!port) break;
          const mask = evalExpr(args[0]) ?? 0;
          // PORT_SERVICE_DIPLOC supplies an explicit numeric inactive
          // default. PORT_SERVICE instead supplies IP_ACTIVE_LOW/HIGH.
          const polarity = args[1]?.trim() ?? '';
          const activeToken = /^IP_ACTIVE_(LOW|HIGH)$/.exec(polarity);
          const activeLow = activeToken
            ? activeToken[1] === 'LOW'
            : ((evalExpr(polarity) ?? 0) & mask) !== 0;
          const defaultValue = activeToken
            ? (activeLow ? mask : 0)
            : evalExpr(polarity) ?? 0;
          port.fields.push({
            kind: 'service',
            mask,
            defaultValue,
            activeLow,
          });
          dip = null;
          break;
        }
        case 'PORT_CONFNAME': // configuration switches are dip-identical in semantics
        case 'PORT_DIPNAME': {
          if (!port) break;
          dip = {
            kind: 'dip',
            mask: evalExpr(args[0]) ?? 0,
            defaultValue: evalExpr(args[1]) ?? 0,
            name: defStr(args[2]),
            settings: [],
          };
          port.fields.push(dip);
          break;
        }
        case 'PORT_DIPUNUSED_DIPLOC': {
          if (!port) break;
          port.fields.push({ kind: 'dip', mask: evalExpr(args[0]) ?? 0, name: 'Unused', settings: [] });
          dip = null;
          break;
        }
        case 'PORT_CONFSETTING':
        case 'PORT_DIPSETTING': {
          if (!dip?.settings) break;
          const cond = /PORT_CONDITION\(([^)]*)\)/.exec(trailing);
          dip.settings.push({
            value: evalExpr(args[0]) ?? 0,
            name: defStr(args[1]),
            condition: cond ? cond[1] : undefined,
          });
          break;
        }
        case 'PORT_DIPLOCATION': {
          if (dip) dip.location = unquote(args[0]);
          break;
        }
        default: break;
      }
    }
    out.push(def);
  }
  return out;
}

function defStr(s: string): string {
  const m = /DEF_STR\(\s*(\w+)\s*\)/.exec(s);
  if (m) return m[1].replace(/_/g, ' ');
  return unquote(s);
}

// ---------------------------------------------------------------------------
// gfx layouts + GFXDECODE
// ---------------------------------------------------------------------------

export interface GfxLayoutDef {
  name: string;
  width: number; height: number;
  /** number of elements, or symbolic "RGN_FRAC(a,b)" */
  total: number | string;
  planes: number;
  /** offsets in bits; symbolic strings preserved where RGN_FRAC appears */
  planeOffsets: (number | string)[];
  xOffsets: (number | string)[];
  yOffsets: (number | string)[];
  charIncrement: number;
}

export function parseGfxLayouts(src: string): GfxLayoutDef[] {
  const out: GfxLayoutDef[] = [];
  const extendedOffsets = new Map<string, (number | string)[]>();
  const offsetArrayRe =
    /static\s+const\s+(?:u?int32_t|uint32_t)\s+(\w+)\s*\[[^\]]+\]\s*=\s*\{([\s\S]*?)\};/g;
  for (const array of src.matchAll(offsetArrayRe)) {
    extendedOffsets.set(array[1]!, parseOffsetList(`{${array[2]}}`));
  }
  const re = /(?:static\s+)?const\s+gfx_layout\s+(\w+)\s*=\s*\{([\s\S]*?)\};/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const fields = splitArgs(m[2]);
    if (fields.length < 8) continue;
    const xOffsets = parseOffsetList(fields[5]);
    const yOffsets = parseOffsetList(fields[6]);
    const extendedX = xOffsets.length === 1 && xOffsets[0] === 'EXTENDED_XOFFS'
      ? extendedOffsets.get(fields[8]?.trim())
      : undefined;
    const extendedY = yOffsets.length === 1 && yOffsets[0] === 'EXTENDED_YOFFS'
      ? extendedOffsets.get(fields[9]?.trim())
      : undefined;
    out.push({
      name: m[1],
      width: evalExpr(fields[0]) ?? 0,
      height: evalExpr(fields[1]) ?? 0,
      total: evalExpr(fields[2]) ?? fields[2].trim(),
      planes: evalExpr(fields[3]) ?? 0,
      planeOffsets: parseOffsetList(fields[4]),
      xOffsets: extendedX ?? xOffsets,
      yOffsets: extendedY ?? yOffsets,
      charIncrement: evalExpr(fields[7]) ?? 0,
    });
  }
  return out;
}

/** Parse `{ a, b, STEP4(x,y), ... }` into a flat offset list, expanding STEPn. */
function parseOffsetList(s: string): (number | string)[] {
  const inner = s.trim().replace(/^\{/, '').replace(/\}$/, '');
  const out: (number | string)[] = [];
  for (const part of splitArgs(inner)) {
    const step = /^STEP(\d+)\s*\(([\s\S]*)\)$/.exec(part.trim());
    if (step) {
      const n = Number(step[1]);
      const args = splitArgs(step[2]!);
      const start = evalExpr(args[0] ?? '');
      const inc = evalExpr(args[1] ?? '');
      if (start !== null && inc !== null) {
        for (let i = 0; i < n; i++) out.push(start + i * inc);
        continue;
      }
      if (args[0]?.trim().startsWith('RGN_FRAC(') && inc !== null) {
        const base = args[0].trim();
        for (let i = 0; i < n; i++) {
          const offset = i * inc;
          out.push(offset ? `${base}${offset > 0 ? '+' : ''}${offset}` : base);
        }
        continue;
      }
    }
    const v = evalExpr(part);
    out.push(v !== null ? v : part.trim());
  }
  return out;
}

export interface GfxDecodeEntryDef {
  region: string; offset: number; layout: string; colorBase: number; colorCount: number;
  /** The graphics source is a live address-map share rather than ROM. */
  ram?: boolean;
  /** GFXDECODE_SCALE render scale (galaxian renders 3x wide); 1 for plain entries */
  xscale: number; yscale: number;
}
export interface GfxDecodeDef { name: string; entries: GfxDecodeEntryDef[]; }

export function parseGfxDecodes(src: string, consts: Record<string, number> = {}): GfxDecodeDef[] {
  const out: GfxDecodeDef[] = [];
  const re = /GFXDECODE_START\(\s*(\w+)\s*\)([\s\S]*?)GFXDECODE_END/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const entries: GfxDecodeEntryDef[] = [];
    const em = m[2].matchAll(/GFXDECODE_(ENTRY|SCALE|RAM)\(\s*([^)]*)\)/g);
    for (const e of em) {
      const args = splitArgs(e[2]);
      entries.push({
        region: unquote(args[0]),
        offset: evalExpr(args[1], consts) ?? 0,
        layout: args[2].trim(),
        colorBase: evalExpr(args[3], consts) ?? 0,
        colorCount: evalExpr(args[4], consts) ?? 0,
        ...(e[1] === 'RAM' ? { ram: true } : {}),
        xscale: e[1] === 'SCALE' ? (evalExpr(args[5], consts) ?? 1) : 1,
        yscale: e[1] === 'SCALE' ? (evalExpr(args[6], consts) ?? 1) : 1,
      });
    }
    out.push({ name: m[1], entries });
  }
  return out;
}

// ---------------------------------------------------------------------------
// includes
// ---------------------------------------------------------------------------

export function parseIncludes(src: string): string[] {
  return [...src.matchAll(/^#include\s+"([^"]+)"/gm)].map(m => m[1]);
}

/** DECLARE_DEVICE_TYPE(IREM_M52_SOUNDC_AUDIO, m52_soundc_audio_device) -> macro name to class. */
export function parseDeviceTypeDecls(src: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of src.matchAll(/DECLARE_DEVICE_TYPE\(\s*(\w+)\s*,\s*(\w+)\s*\)/g)) out[m[1]] = m[2];
  return out;
}

/**
 * Constructor default clocks from device headers:
 * `timeplt_audio_device(const machine_config &mconfig, const char *tag,
 *  device_t *owner, uint32_t clock = 14'318'181);` -> class name to Hz.
 * A device instantiated without a clock (TIMEPLT_AUDIO(config, "tag")) runs
 * at this default, and its sub-devices' DERIVED_CLOCKs hang off it.
 */
export function parseDeviceDefaultClocks(src: string): Record<string, number> {
  const out: Record<string, number> = {};
  const re = /(\w+_device)\s*\([^()]*device_t\s*\*\s*\w+\s*,\s*u?int32_t\s+clock\s*=\s*(?:XTAL\()?([\d']+)\)?/g;
  for (const m of src.matchAll(re)) out[m[1]] = Number(m[2].replace(/'/g, ''));
  return out;
}

export interface RomPatchDef { region: string; offset: number; value: number }
export type RomTransformDef =
  | {
      kind: 'conditional-byte-swap';
      region: string;
      indexMask: number;
      indexValue: number;
      displacement: number;
    }
  | {
      /** Apply MAME's bitswap<8>(byte, b7, ..., b0) over one region interval. */
      kind: 'byte-bitswap';
      region: string;
      start: number;
      end: number;
      bits: number[];
    }
  | {
      /**
       * Driver-init opcode/data split: initialize a target region from the
       * source, then substitute bytes in [start,end) through this table.
       */
      kind: 'byte-substitution';
      sourceRegion: string;
      targetRegion: string;
      start: number;
      end: number;
      table: number[];
    };

/**
 * ROM patches from driver init functions:
 * `void rocnrope_state::init_rocnrope() { memregion("maincpu")->base()[0x703d] = 0x98 ^ 0x22; }`
 * -> init function name to its byte patches.
 */
export function parseInitPatches(src: string, consts: Record<string, number> = {}): Record<string, RomPatchDef[]> {
  const out: Record<string, RomPatchDef[]> = {};
  for (const { name, body } of extractFunctionBody(src, /void\s+(\w+)::(init_\w+)\(\)/g)) {
    const patches: RomPatchDef[] = [];
    for (const m of body.matchAll(/memregion\("(\w+)"\)->base\(\)\[([^\]]+)\]\s*=\s*([^;]+);/g)) {
      const offset = evalExpr(m[2], consts);
      const value = evalExpr(m[3], consts);
      if (offset !== null && value !== null) patches.push({ region: m[1], offset, value: value & 0xff });
    }
    if (patches.length) out[name] = patches;
  }
  return out;
}

/**
 * Declarative ROM transforms from driver init functions.
 *
 * Galaga stores its second character bank in a hardware-oriented byte order.
 * MAME's init_galaga walks the gfx region and swaps `rom[i]` with `rom[i+n]`
 * for indices selected by a mask. Preserve that source operation as data so
 * every runtime applies it before graphics decoding.
 */
export function parseInitRomTransforms(
  src: string,
  consts: Record<string, number> = {},
): Record<string, RomTransformDef[]> {
  const out: Record<string, RomTransformDef[]> = {};
  const functions = extractFunctionBody(src, /void\s+(\w+)::(\w+)\(\s*\)/g);
  const functionsByOwner = new Map(
    functions.map(fn => [`${fn.cls}::${fn.name}`, fn]),
  );
  const expandBodies = (
    cls: string,
    body: string,
    visited = new Set<string>(),
  ): string[] => {
    const expanded = [body];
    for (const call of body.matchAll(/\b(\w+)\s*\(\s*\)\s*;/g)) {
      const key = `${cls}::${call[1]}`;
      if (visited.has(key)) continue;
      const dependency = functionsByOwner.get(key);
      if (!dependency) continue;
      visited.add(key);
      expanded.push(...expandBodies(cls, dependency.body, visited));
    }
    return expanded;
  };
  for (const { cls, name, body: initBody } of functions.filter(fn =>
    fn.name.startsWith('init_'))) {
    const transforms: RomTransformDef[] = [];
    for (const body of expandBodies(cls, initBody)) {
      const aliases = new Map<string, string>();
      for (const match of body.matchAll(
        /\b(?:uint8_t|u8)\s*\*\s*(\w+)\s*=\s*memregion\(\s*"([^"]+)"\s*\)\s*->\s*base\(\s*\)\s*;/g,
      )) {
        aliases.set(match[1], match[2]);
      }
      for (const [alias, region] of aliases) {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const byteBitswap = new RegExp(
        String.raw`for\s*\(\s*(?:\w+\s+)?(\w+)\s*=\s*([^;]+)\s*;` +
        String.raw`\s*\1\s*<\s*([^;]+)\s*;\s*(?:\1\+\+|\+\+\1)\s*\)` +
        String.raw`\s*\{?\s*${escaped}\s*\[\s*\1\s*\]\s*=\s*bitswap\s*<\s*8\s*>\s*` +
        String.raw`\(\s*${escaped}\s*\[\s*\1\s*\]\s*,\s*([^)]+)\)\s*;`,
        'g',
      );
      for (const match of body.matchAll(byteBitswap)) {
        const start = evalExpr(match[2], consts);
        const end = evalExpr(match[3], consts);
        const bits = match[4]!.split(',').map(bit => evalExpr(bit, consts));
        if (
          start === null || end === null || start < 0 || end < start ||
          bits.length !== 8 || bits.some(bit => bit === null || bit < 0 || bit > 7) ||
          new Set(bits).size !== 8
        ) continue;
        transforms.push({
          kind: 'byte-bitswap',
          region,
          start,
          end,
          bits: bits.map(bit => bit!),
        });
      }
      const swap = new RegExp(
        String.raw`if\s*\(\s*\(\s*(\w+)\s*&\s*([^)]+?)\s*\)\s*==\s*([^)]+?)\s*\)` +
        String.raw`\s*\{[\s\S]*?\b\w+\s*=\s*${escaped}\s*\[\s*\1\s*\]\s*;` +
        String.raw`\s*${escaped}\s*\[\s*\1\s*\]\s*=\s*${escaped}\s*\[\s*\1\s*\+\s*([^\]]+?)\s*\]\s*;` +
        String.raw`\s*${escaped}\s*\[\s*\1\s*\+\s*\4\s*\]\s*=\s*\w+\s*;`,
        'g',
      );
      for (const match of body.matchAll(swap)) {
        const indexMask = evalExpr(match[2], consts);
        const indexValue = evalExpr(match[3], consts);
        const displacement = evalExpr(match[4], consts);
        if (indexMask === null || indexValue === null || displacement === null) continue;
        transforms.push({
          kind: 'conditional-byte-swap',
          region,
          indexMask,
          indexValue,
          displacement,
        });
      }

      // Commando-family encrypted opcodes use a separate AS_OPCODES share.
      // Lower the source expression to a complete byte table rather than
      // carrying C++ syntax into the runtime.
      const loop = new RegExp(
        String.raw`for\s*\(\s*int\s+(\w+)\s*=\s*([^;]+)\s*;\s*\1\s*<\s*([^;]+)\s*;` +
        String.raw`\s*(?:\1\+\+|\+\+\1)\s*\)\s*\{([\s\S]*?)\}`,
      ).exec(body);
      if (!loop) continue;
      const [indexName, startExpression, endExpression, loopBody] =
        [loop[1]!, loop[2]!, loop[3]!, loop[4]!];
      const escapedIndex = indexName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const sourceByte = new RegExp(
        String.raw`\b(?:uint8_t|u8)\s+(\w+)\s*=\s*${escapedAlias}\s*\[\s*${escapedIndex}\s*\]\s*;`,
      ).exec(loopBody);
      if (!sourceByte) continue;
      const sourceName = sourceByte[1]!;
      const escapedSource = sourceName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const assignment = new RegExp(
        String.raw`\b(m_\w+)\s*\[\s*${escapedIndex}\s*\]\s*=\s*([^;]+)\s*;`,
      ).exec(loopBody);
      if (!assignment) continue;
      const start = evalExpr(startExpression, consts);
      const end = evalExpr(endExpression, consts);
      if (start === null || end === null || start < 0 || end < start) continue;
      const table = Array.from({ length: 256 }, (_unused, value) =>
        evalExpr(
          assignment[2]!.replace(new RegExp(`\\b${escapedSource}\\b`, 'g'), String(value)),
          consts,
        ));
      if (table.some(value => value === null)) continue;
        transforms.push({
          kind: 'byte-substitution',
          sourceRegion: region,
          targetRegion: assignment[1]!.replace(/^m_/, ''),
          start,
          end,
          table: table.map(value => value! & 0xff),
        });
      }
    }
    if (transforms.length) out[name] = transforms;
  }
  return out;
}
