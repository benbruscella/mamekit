/**
 * The constants of MAME's netlist device classes, read from their source.
 *
 * A netlist's logic devices (nld_74123.cpp, nld_74ls629.cpp, nld_4020.cpp, a
 * TRUTH_TABLE in the macro library) are C++ classes and setup macros. Their
 * behaviour is one of a few generic element kinds the netlist solver runs (a
 * monostable, a VCO, a ripple counter, a truth table); what makes a TTL_74123
 * a 74123 and not a CD4538, or a 74LS629 run at its frequency, is data in the
 * source: a `desc_` struct's timing, K and trigger function, a VCO's fitted
 * polynomial, a counter's per-stage delays. This reads that data, so nothing
 * here is a transcribed number.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr, stripComments } from '../kg/parse.ts';

const DEVICE_DIRS = ['src/lib/netlist/devices', 'src/lib/netlist/analog', 'src/lib/netlist/solver'];

/** Every `NETLIB_DEVICE_IMPL*`'s netlist name, with its C++ name and parameter list. */
export interface NetlistDeviceImpl { name: string; impl: string; params: string; file: string }

export function netlistDeviceImpls(mameSrc: string): Map<string, NetlistDeviceImpl> {
  const found = new Map<string, NetlistDeviceImpl>();
  for (const dir of DEVICE_DIRS) {
    for (const file of readdirSync(join(mameSrc, dir)).filter(entry => entry.endsWith('.cpp'))) {
      const text = stripComments(readFileSync(join(mameSrc, dir, file), 'utf8'));
      const impl = /NETLIB_DEVICE_IMPL(?:_NS|_ALIAS)?\s*\(([^)]*)\)/g;
      for (const match of text.matchAll(impl)) {
        const args = match[1]!.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(arg => arg.trim());
        const quoted = args.filter(arg => arg.startsWith('"'));
        if (quoted.length < 2) continue;
        const name = quoted[0]!.replace(/"/g, '');
        // _NS(ns, impl, ...), _ALIAS(alias, impl, ...), plain (impl, ...)
        const impl = /_ALIAS|_NS/.test(match[0]) ? args[1]! : args[0]!;
        found.set(name, { name, impl, params: quoted[1]!.replace(/"/g, ''), file: `${dir}/${file}` });
      }
    }
  }
  return found;
}

const magic = (text: string): number => {
  const trimmed = text.trim();
  if (/^nlconst::one\(\)$/.test(trimmed)) return 1;
  if (/^nlconst::zero\(\)$/.test(trimmed)) return 0;
  if (/^nlconst::half\(\)$/.test(trimmed)) return 0.5;
  const inner = /^nlconst::magic\s*\(\s*([^()]+)\s*\)$/.exec(trimmed)?.[1] ?? trimmed;
  const value = Number(inner);
  if (!Number.isFinite(value)) throw new Error(`netlist source: not a constant: ${text}`);
  return value;
};

/** A struct's body, by name, balanced. */
function structBody(text: string, name: string): { body: string; base?: string } | undefined {
  const start = new RegExp(`struct\\s+${name}\\b\\s*(?::\\s*public\\s+(\\w+))?\\s*\\{`).exec(text);
  if (!start) return undefined;
  let depth = 1;
  let index = start.index + start[0].length;
  for (; index < text.length && depth; index++) {
    if (text[index] === '{') depth++;
    else if (text[index] === '}') depth--;
  }
  return { body: text.slice(start.index + start[0].length, index - 1), ...(start[1] ? { base: start[1] } : {}) };
}

/** A one-shot (`74123_base<D>`): its desc's constants and trigger table. */
export interface NetlistMonostableDesc {
  /** CLRQ, A, B (74123); A1, A2, B (74121). */
  inputs: string[];
  vcc: string;
  gnd: string;
  /** 1 / (1 + exp(K)): the charge thresholds' fraction of VCC. */
  kp: number;
  ri: number;
  /** Seconds: trigger to Q, and clear to Q. */
  tAB: number;
  tC: number;
  /** Seconds: the cv handler's pushes once a threshold is crossed. */
  tCv: number;
  /** For each input combination (bit i is input i): `trigfunc`, then `clear`. */
  trigger: number[];
  clear: number[];
}

export function readMonostable(mameSrc: string, impl: NetlistDeviceImpl): NetlistMonostableDesc {
  const text = stripComments(readFileSync(join(mameSrc, impl.file), 'utf8'));
  const using = new RegExp(`using\\s+NETLIB_NAME\\s*\\(\\s*${impl.impl}\\s*\\)\\s*=\\s*NETLIB_NAME\\s*\\(\\s*74123_base\\s*\\)\\s*<\\s*(\\w+)\\s*>`).exec(text);
  if (!using) throw new Error(`netlist: ${impl.name} is not a 74123_base`);
  // A member is found in the desc or the first base that declares it.
  const chain: string[] = [];
  for (let name: string | undefined = using[1]; name && name !== 'desc_base';) {
    const struct = structBody(text, name);
    if (!struct) throw new Error(`netlist: no ${name} in ${impl.file}`);
    chain.push(struct.body);
    name = struct.base;
  }
  const member = (pattern: RegExp, what: string): RegExpExecArray => {
    for (const body of chain) {
      const found = pattern.exec(body);
      if (found) return found;
    }
    throw new Error(`netlist: ${impl.name} has no ${what}`);
  };
  const time = (name: string): number =>
    Number(member(new RegExp(`using\\s+${name}\\s*=\\s*time_ns\\s*<\\s*(\\d+)\\s*>`), name)[1]) * 1e-9;
  const constant = (name: string): number =>
    magic(member(new RegExp(`\\b${name}\\s*\\(\\s*\\)\\s*\\{\\s*return\\s+([^;]+);`), name)[1]!);
  const names = member(/names\s*\(\s*\)\s*\{\s*return\s*\{([^}]*)\}/, 'names')[1]!
    .split(',').map(entry => entry.trim().replace(/"/g, ''));
  const terminal = (name: string): string =>
    member(new RegExp(`${name}\\s*\\(\\s*\\)\\s*\\{\\s*return\\s*"(\\w+)"`), name)[1]!;
  // Each `return` spelled with in[i](), evaluated for every input combination.
  const table = (name: string): number[] => {
    const body = member(new RegExp(`\\b${name}\\s*\\([^)]*\\)\\s*(?:noexcept\\s*)?\\{\\s*return\\s+([^;]+);`), name)[1]!;
    return Array.from({ length: 1 << names.length }, (_, bits) => {
      const expr = body.replace(/in\s*\[\s*(\d+)\s*\]\s*\(\s*\)/g, (_, index: string) => String((bits >> Number(index)) & 1));
      const value = evalExpr(expr, {});
      if (value === null) throw new Error(`netlist: ${impl.name} ${name}: ${body}`);
      return value & 1;
    });
  };
  const k = constant('K');
  const cv = /NETLIB_HANDLERI\s*\(\s*cv\s*\)([\s\S]*?)NETLIB_RESETI/.exec(text)?.[1] ?? '';
  const cvDelays = new Set([...cv.matchAll(/NLTIME_FROM_NS\s*\(\s*(\d+)\s*\)/g)].map(match => Number(match[1])));
  if (cvDelays.size !== 1) throw new Error(`netlist: ${impl.name}: cv handler delays ${[...cvDelays].join(', ')}`);
  return {
    tCv: [...cvDelays][0]! * 1e-9,
    inputs: names,
    vcc: terminal('vcc'),
    gnd: terminal('gnd'),
    kp: 1 / (1 + Math.exp(k)),
    ri: constant('RI'),
    tAB: time('t_AB_to_Q'),
    tC: time('t_C_to_Q'),
    trigger: table('trigfunc'),
    clear: table('clear'),
  };
}

/** A 74LS629 VCO: its fitted frequency polynomial and input resistors. */
export interface NetlistVcoDesc {
  /** freq = sum of k * v_freq^f * v_rng^r, then scaled by `capScale` / CAP. */
  terms: { k: number; f: number; r: number }[];
  capScale: number;
  /** The FC and RNG input resistors (`set_R` in reset). */
  rInput: number;
}

export function readVco(mameSrc: string, impl: NetlistDeviceImpl): NetlistVcoDesc {
  const text = stripComments(readFileSync(join(mameSrc, impl.file), 'utf8'));
  const constants = new Map<string, number>();
  for (const match of text.matchAll(/const\s+nl_fptype\s+(k\d+)\s*=\s*(nlconst::magic\s*\([^)]*\))\s*;/g)) {
    constants.set(match[1]!, magic(match[2]!));
  }
  const power = (factor: string): { f: number; r: number } => {
    const name = factor.trim();
    if (name === 'v_freq') return { f: 1, r: 0 };
    if (name === 'v_rng') return { f: 0, r: 1 };
    const raised = /^v_freq_(\d+)$/.exec(name);
    if (raised) return { f: Number(raised[1]), r: 0 };
    throw new Error(`netlist: ${impl.name}: factor ${name}`);
  };
  const terms: NetlistVcoDesc['terms'] = [];
  const first = /nl_fptype\s+freq\s*=\s*(k\d+)\s*;/.exec(text);
  if (!first) throw new Error(`netlist: ${impl.name}: no frequency polynomial`);
  terms.push({ k: constants.get(first[1]!)!, f: 0, r: 0 });
  for (const match of text.matchAll(/freq\s*\+=\s*(k\d+)((?:\s*\*\s*\w+)+)\s*;/g)) {
    const factors = match[2]!.split('*').map(part => part.trim()).filter(Boolean).map(power);
    terms.push({ k: constants.get(match[1]!)!, f: factors.reduce((sum, p) => sum + p.f, 0), r: factors.reduce((sum, p) => sum + p.r, 0) });
  }
  const scale = /freq\s*\*=\s*(nlconst::magic\s*\([^)]*\))\s*\/\s*m_CAP\s*\(\s*\)/.exec(text);
  const resistors = [...text.matchAll(/m_R_(?:FC|RNG)\s*\(\s*\)\s*\.\s*set_R\s*\(\s*(nlconst::magic\s*\([^)]*\))\s*\)/g)].map(match => magic(match[1]!));
  if (!scale || resistors.length !== 2 || resistors[0] !== resistors[1]) throw new Error(`netlist: ${impl.name}: scale or inputs`);
  return { terms, capScale: magic(scale[1]!), rInput: resistors[0]! };
}

/** A ripple counter (`CD4020_sub<TotalBits, LiveBitmask>`). */
export interface NetlistCounterDesc {
  /** The logic family its constructor names (`NETLIB_CONSTRUCTOR_MODEL`). */
  family: string;
  bits: number;
  live: number;
  /** Seconds from the clock edge to each stage's output. */
  delays: number[];
  resetDelay: number;
}

export function readCounter(mameSrc: string, impl: NetlistDeviceImpl): NetlistCounterDesc {
  const text = stripComments(readFileSync(join(mameSrc, impl.file), 'utf8'));
  const using = new RegExp(`using\\s+NETLIB_NAME\\s*\\(\\s*${impl.impl}\\s*\\)\\s*=\\s*nld_CD4020_sub\\s*<\\s*(\\d+)\\s*,\\s*(0x[0-9a-fA-F]+|\\d+)\\s*>`).exec(text);
  if (!using) throw new Error(`netlist: ${impl.name} is not a CD4020_sub`);
  const table = /out_delayQn\s*=\s*\{([^}]*)\}/.exec(text);
  const reset = /reset_time\s*=\s*netlist_time::from_nsec\s*\(\s*(\d+)\s*\)/.exec(text);
  if (!table || !reset) throw new Error(`netlist: ${impl.name}: delays`);
  const delays = [...table[1]!.matchAll(/NLTIME_FROM_NS\s*\(\s*(\d+)\s*\)/g)].map(match => Number(match[1]) * 1e-9);
  const family = /NETLIB_CONSTRUCTOR_MODEL\s*\(\s*\w+\s*,\s*"(\w+)"\s*\)/.exec(text)?.[1] ?? '74XX';
  return { family, bits: Number(using[1]), live: Number(using[2]), delays, resetDelay: Number(reset[1]) * 1e-9 };
}

/** One `TRUTH_TABLE` of the macro library, expanded to every input combination. */
export interface NetlistTruthTable {
  name: string;
  inputs: string[];
  outputs: string[];
  params: string;
  family: string;
  /** Output bits for each input combination (bit i is input i). */
  table: number[];
  /** Seconds, per combination then per output. */
  delays: number[];
}

export function parseTruthTable(name: string, inputCount: number, outputCount: number, params: string, body: string): NetlistTruthTable | undefined {
  const head = /TT_HEAD\s*\(\s*"([^"]*)"\s*\)/.exec(body)?.[1];
  const family = /TT_FAMILY\s*\(\s*"([^"]+)"/.exec(body)?.[1] ?? '74XX';
  if (!head) return undefined;
  const [left, right] = head.split('|');
  const inputs = left!.split(',').map(part => part.trim()).filter(Boolean);
  const outputs = right!.split(',').map(part => part.trim()).filter(Boolean);
  if (inputs.length !== inputCount || outputs.length !== outputCount) return undefined;
  const size = 1 << inputCount;
  const table = new Array<number>(size).fill(-1);
  const delays = new Array<number>(size * outputCount).fill(0);
  for (const line of body.matchAll(/TT_LINE\s*\(\s*"([^"]*)"\s*\)/g)) {
    const [ins, outs, times] = line[1]!.split('|').map(part => part.trim());
    const pattern = ins!.split(',').map(part => part.trim());
    const values = outs!.split(',').map(part => Number(part.trim()));
    const timing = (times ?? '').split(',').map(part => Number(part.trim()) * 1e-9);
    for (let bits = 0; bits < size; bits++) {
      if (!pattern.every((want, index) => want === 'X' || Number(want) === ((bits >> index) & 1))) continue;
      table[bits] = values.reduce((word, value, index) => word | ((value & 1) << index), 0);
      for (let output = 0; output < outputCount; output++) {
        delays[bits * outputCount + output] = timing[output] ?? timing[0] ?? 0;
      }
    }
  }
  if (table.some(entry => entry < 0)) return undefined;
  return { name, inputs, outputs, params, family, table, delays };
}

/** nld_system's pieces a lowering needs: a logic input's push delay, a SYS_DSW's off resistance. */
export interface NetlistSystemDesc { logicInputDelay: number; dswOff: number }

export function readSystem(mameSrc: string): NetlistSystemDesc {
  const text = stripComments(readFileSync(join(mameSrc, 'src/lib/netlist/devices/nlid_system.h'), 'utf8'));
  const delay = /m_Q\.push\s*\(\s*m_IN\s*\(\s*\)\s*&\s*1\s*,\s*netlist_time::from_nsec\s*\(\s*(\d+)\s*\)\s*\)/.exec(text);
  const dsw = /NETLIB_CONSTRUCTOR\s*\(\s*sys_dsw1\s*\)[\s\S]*?m_ROFF\s*\(\s*\*this\s*,\s*"ROFF"\s*,\s*(nlconst::magic\s*\([^)]*\))\s*\)/.exec(text);
  if (!delay || !dsw) throw new Error('netlist: nlid_system.h: logic input delay or SYS_DSW ROFF');
  return { logicInputDelay: Number(delay[1]) * 1e-9, dswOff: magic(dsw[1]!) };
}
