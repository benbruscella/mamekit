/**
 * MAME's netlist language, compiled.
 *
 * A `NETLIST_START` body is a list of calls to netlist setup macros (nl_setup.h),
 * so it is read as MAME's own parser reads it: devices, connections, aliases,
 * parameters and models registered against a namespace, then elaborated into
 * nets. What comes out is a flat list of elements over numbered nodes, each with
 * the conductance stamps of its MAME device (analog/nlid_twoterm.h, nld_bjt.cpp,
 * nld_opamps.cpp, nlid_fourterm.cpp, nlid_proxy.cpp, nld_4066.cpp), for the generic
 * solver in netlist-solver.ts to run.
 *
 * A device outside that set stops the compile: an unlowered netlist stays
 * visibly unlowered instead of playing an approximation.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr, resolveLiteralConditionals, stripComments } from '../kg/parse.ts';
import { splitMameArgs } from './ast.ts';

export type NetlistElement =
  | { kind: 'r'; a: number; b: number; g: number }
  /** A resistor whose R a stream drives (`NETLIST_STREAM_INPUT(.., "R_AY.R")`). */
  | { kind: 'streamR'; a: number; b: number; g: number; input: number }
  | { kind: 'c'; a: number; b: number; c: number }
  | { kind: 'd'; a: number; k: number; is: number; n: number }
  | {
      kind: 'q'; b: number; c: number; e: number; polarity: number;
      is: number; bf: number; nf: number; br: number; nr: number;
    }
  /** VCCS, or with `ro` a VCVS (nlid_fourterm.cpp). */
  | { kind: 'vccs'; ip: number; in: number; op: number; on: number; g: number; ri: number; ro?: number }
  /** A CD4066 gate: `ctl` above the switch point closes it. */
  | {
      kind: 'switch'; a: number; b: number; ctl: number; vdd: number; vss: number;
      baseR: number;
    }
  /** A one-input TRUTH_TABLE inverter; its family sets the thresholds. */
  | {
      kind: 'gate'; input: number; output: number; vdd: number; vss: number; state: number;
      ivl: number; ivh: number; rLow: number; rHigh: number; vLow: number; vHigh: number;
    }
  /** A logic output into analog nets, as nld_d_to_a_proxy drives one. */
  | {
      kind: 'logic'; output: number; vcc: number; gnd: number; param?: string; state: number;
      rLow: number; rHigh: number; vLow: number; vHigh: number;
    };

export interface GeneratedNetlistPlan {
  schemaVersion: number;
  name: string;
  nodes: number;
  /** Nodes tied to a voltage: a fixed value, or a stream or frontier that drives it. */
  rails: { node: number; volts: number }[];
  /** Solved independently, in dependency order, as MAME's solver groups are. */
  groups: number[][];
  elements: NetlistElement[];
  /** A frontier's output rail, copied from its input after that group solves. */
  frontiers: { from: number; to: number }[];
  gmin: number;
  reltol: number;
  vntol: number;
  nrLoops: number;
  inputs: { channel: number; kind: 'resistor' | 'volts'; element?: number; node?: number; mult: number; offset: number }[];
  /** The `.IN` parameters driver writes reach, in the order they name them. */
  logicInputs: string[];
  output: { node: number; mult: number; offset: number };
  source: { file: string; netlist: string };
}

export interface NetlistConfig {
  /** `set_source`'s netlist. */
  source: string;
  streamInputs: { channel: number; param: string; mult: number; offset: number }[];
  output: { node: string; mult: number; offset: number };
  logicInputs: { tag: string; param: string; value: number }[];
}

interface Device { type: string; name: string; args: string[] }

const LIBRARY_DIR = 'src/lib/netlist/macro';
const GMIN = 1e-9;
const G_OFF = 1e-9;
const NP_IS = 1e-15;
const VT_T0 = 300 * 1.38064852e-23 / 1.6021765314e-19; // nlconst::np_VT(1, T0)

class Setup {
  readonly devices = new Map<string, Device>();
  readonly aliases = new Map<string, string>();
  readonly connections: [string, string][] = [];
  readonly params = new Map<string, string>();
  readonly models = new Map<string, string>();
  readonly unsupported = new Set<string>();
  private namespaces: string[] = [];
  private frontierCount = 0;

  private readonly bodies: Map<string, string>;
  private readonly number: (text: string) => number;

  constructor(bodies: Map<string, string>, number: (text: string) => number) {
    this.bodies = bodies;
    this.number = number;
  }

  fqn(name: string): string {
    return this.namespaces.length ? `${this.namespaces.join('.')}.${name}` : name;
  }

  include(name: string): void {
    const body = this.bodies.get(name);
    if (body === undefined) throw new Error(`netlist: no NETLIST_START(${name})`);
    this.run(body);
  }

  private run(body: string): void {
    const call = /\b([A-Za-z_][A-Za-z_0-9]*)\s*\(/g;
    let match: RegExpExecArray | null;
    while ((match = call.exec(body))) {
      const open = match.index + match[0].length - 1;
      let depth = 0;
      let index = open;
      let quoted = false;
      for (; index < body.length; index++) {
        const char = body[index]!;
        if (char === '"') quoted = !quoted;
        if (quoted) continue;
        if (char === '(') depth++;
        else if (char === ')' && --depth === 0) break;
      }
      this.statement(match[1]!, splitMameArgs(body.slice(open + 1, index)).map(arg => arg.trim()));
      call.lastIndex = index + 1;
    }
  }

  private statement(name: string, args: string[]): void {
    switch (name) {
      case 'LOCAL_SOURCE': case 'EXTERNAL_SOURCE': case 'HINT': case 'NETLIST_EXTERNAL': return;
      case 'INCLUDE': this.include(args[0]!); return;
      case 'SUBMODEL':
        this.namespaces.push(args[1]!);
        this.include(args[0]!);
        this.namespaces.pop();
        return;
      case 'NET_C':
        for (const other of args.slice(1)) this.connections.push([this.fqn(args[0]!), this.fqn(other)]);
        return;
      case 'ALIAS': this.aliases.set(this.fqn(args[0]!), this.fqn(args[1]!)); return;
      case 'DIPPINS': {
        for (let pin = 0; pin < args.length / 2; pin++) {
          this.aliases.set(this.fqn(String(pin + 1)), this.fqn(args[pin * 2]!));
          this.aliases.set(this.fqn(String(args.length - pin)), this.fqn(args[pin * 2 + 1]!));
        }
        return;
      }
      case 'PARAM': this.params.set(this.fqn(args[0]!), args[1]!); return;
      case 'DEFPARAM': if (!this.params.has(this.fqn(args[0]!))) this.params.set(this.fqn(args[0]!), args[1]!); return;
      case 'NET_MODEL': {
        const text = args[0]!.replace(/^"|"$/g, '');
        const space = text.search(/[\s(]/);
        this.models.set(text.slice(0, space).toUpperCase(), text.slice(space).trim());
        return;
      }
      case 'OPTIMIZE_FRONTIER': this.frontier(args[0]!, args[1]!, args[2]!); return;
      case 'SOLVER': this.devices.set(this.fqn(args[0]!), { type: 'SOLVER', name: this.fqn(args[0]!), args: args.slice(1) }); return;
      case 'NET_REGISTER_DEV': this.device(args[0]!, args[1]!, args.slice(2)); return;
      default:
        // A library macro (`LM358_DIP(XU2)`) is a submodel by another spelling;
        // anything else names a device.
        if (this.bodies.has(name)) {
          this.namespaces.push(args[0]!);
          this.include(name);
          this.namespaces.pop();
        } else {
          this.device(name, args[0]!, args.slice(1));
        }
    }
  }

  private device(type: string, name: string, args: string[]): void {
    this.devices.set(this.fqn(name), { type, name: this.fqn(name), args });
  }

  // nlparse_t::register_frontier
  private frontier(attach: string, rIn: string, rOut: string): void {
    const name = `frontier_${this.frontierCount++}`;
    this.devices.set(name, { type: 'FRONTIER_DEV', name, args: [rIn, rOut] });
    const fqn = this.fqn(attach);
    let found = false;
    for (const link of this.connections) {
      if (link[0] === fqn) { link[0] = `${name}.I`; found = true; }
      else if (link[1] === fqn) { link[1] = `${name}.I`; found = true; }
    }
    if (!found) throw new Error(`netlist: frontier ${attach} has no connection`);
    this.connections.push([fqn, `${name}.Q`]);
  }

  /** models_t::model_parse: the named model over its base, last word wins. */
  model(text: string): Map<string, string> {
    const trimmed = text.replace(/^"|"$/g, '').trim();
    const open = trimmed.indexOf('(');
    const key = (open < 0 ? trimmed : trimmed.slice(0, open)).trim().toUpperCase();
    const out = new Map<string, string>();
    const expand = (name: string): void => {
      if (name === '_' || !name) return;
      const entry = this.models.get(name);
      if (entry === undefined) throw new Error(`netlist: no model ${name}`);
      apply(entry);
    };
    const apply = (entry: string): void => {
      const paren = entry.indexOf('(');
      expand(entry.slice(0, paren).trim().toUpperCase());
      for (const pair of entry.slice(paren + 1, entry.lastIndexOf(')')).trim().split(/\s+/)) {
        const equals = pair.indexOf('=');
        if (equals > 0) out.set(pair.slice(0, equals).toUpperCase(), pair.slice(equals + 1));
      }
    };
    if (open >= 0) apply(trimmed);
    else expand(key);
    return out;
  }

  value(model: Map<string, string>, key: string): number {
    const text = model.get(key);
    if (text === undefined) throw new Error(`netlist: model has no ${key}`);
    const factors: Record<string, number> = { M: 1e6, k: 1e3, K: 1e3, m: 1e-3, u: 1e-6, n: 1e-9, p: 1e-12, f: 1e-15, a: 1e-18 };
    const factor = factors[text.at(-1)!];
    return (factor ? Number(text.slice(0, -1)) * factor : Number(text));
  }

  param(fqn: string, fallback: string): number {
    return this.number(this.params.get(fqn) ?? fallback);
  }
}

/** A compound `#if (1 || NAME)` becomes the literal the conditional pass reads. */
function literalConditions(source: string): string {
  const defined: Record<string, number> = {};
  return source.split('\n').map(line => {
    const define = /^\s*#\s*define\s+(\w+)\s+\(?\s*(\d+)\s*\)?\s*$/.exec(line);
    if (define) defined[define[1]!] = Number(define[2]);
    const compound = /^(\s*#\s*if\s+)(.*(?:\|\||&&).*)$/.exec(line);
    if (!compound) return line;
    const value = evalExpr(compound[2]!, defined);
    return value === null ? line : `${compound[1]}${value ? 1 : 0}`;
  }).join('\n');
}

interface GateTable { invert: boolean; family: string }

/** Every `NETLIST_START` of a source, by name. */
function netlistBodies(source: string, into: Map<string, string>, gates: Map<string, GateTable>): void {
  const clean = resolveLiteralConditionals(literalConditions(stripComments(source)));
  for (const table of clean.matchAll(/TRUTH_TABLE\s*\(\s*(\w+)\s*,\s*1\s*,\s*1\s*,[^)]*\)\s*\{([\s\S]*?)\n\}/g)) {
    const lines = [...table[2]!.matchAll(/TT_LINE\s*\(\s*"\s*(\d)\s*\|\s*(\d)\s*\|/g)];
    const family = /TT_FAMILY\s*\(\s*"([^"]+)"/.exec(table[2]!)?.[1];
    if (lines.length === 2 && family) {
      gates.set(table[1]!, { invert: lines.every(line => line[1] !== line[2]), family });
    }
  }
  const start = /NETLIST_START\s*\(\s*(\w+)\s*\)\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = start.exec(clean))) {
    let depth = 1;
    let index = start.lastIndex;
    for (; index < clean.length && depth; index++) {
      if (clean[index] === '{') depth++;
      else if (clean[index] === '}') depth--;
    }
    into.set(match[1]!, clean.slice(start.lastIndex, index - 1));
  }
}

export function netlistNumber(text: string): number {
  const units: Record<string, number> = { RES_R: 1, RES_K: 1e3, RES_M: 1e6, CAP_U: 1e-6, CAP_N: 1e-9, CAP_P: 1e-12, CAP_F: 1e-15, IND_U: 1e-6, IND_N: 1e-9, IND_P: 1e-12 };
  const unit = /^(\w+)\(\s*([^()]+)\s*\)$/.exec(text.trim());
  if (unit && units[unit[1]!] !== undefined) return Number(unit[2]) * units[unit[1]!]!;
  const value = Number(text);
  if (!Number.isFinite(value)) throw new Error(`netlist: value "${text}"`);
  return value;
}

export function compileNetlist(mameSrc: string, netlistFile: string, config: NetlistConfig): GeneratedNetlistPlan {
  const bodies = new Map<string, string>();
  const gates = new Map<string, GateTable>();
  const libraryDir = join(mameSrc, LIBRARY_DIR);
  for (const file of readdirSync(libraryDir).filter(name => name.endsWith('.cpp'))) {
    netlistBodies(readFileSync(join(libraryDir, file), 'utf8'), bodies, gates);
  }
  netlistBodies(readFileSync(join(mameSrc, netlistFile), 'utf8'), bodies, gates);
  if (!bodies.has(config.source)) throw new Error(`netlist: ${netlistFile} has no ${config.source}`);
  const setup = new Setup(bodies, netlistNumber);
  // The library's models are registered before any netlist (net_lib's base).
  for (const [name, body] of bodies) {
    if (/\bNET_MODEL\b/.test(body) && /_lib$|^(?:diode|bjt|family)_models$|^(?:ttl74xx|cd4xxx|opamp|otheric)/.test(name)) {
      for (const model of body.matchAll(/NET_MODEL\s*\(\s*"([^"]+)"\s*\)/g)) {
        const space = model[1]!.search(/[\s(]/);
        setup.models.set(model[1]!.slice(0, space).toUpperCase(), model[1]!.slice(space).trim());
      }
    }
  }
  setup.devices.set('GND', { type: 'GNDA', name: 'GND', args: [] });
  setup.include(config.source);
  return elaborate(setup, netlistFile, config, gates);
}

function elaborate(setup: Setup, file: string, config: NetlistConfig, gates: Map<string, GateTable>): GeneratedNetlistPlan {
  const resolve = (name: string): string => {
    let current = name;
    for (let hops = 0; setup.aliases.has(current); hops++) {
      if (hops > 64) throw new Error(`netlist: alias loop at ${name}`);
      current = setup.aliases.get(current)!;
    }
    return current;
  };
  // Union-find over terminal names.
  const parent = new Map<string, string>();
  const find = (name: string): string => {
    let root = name;
    if (!parent.has(root)) parent.set(root, root);
    while (parent.get(root) !== root) root = parent.get(root)!;
    let walk = name;
    while (parent.get(walk) !== root) {
      const next = parent.get(walk)!;
      parent.set(walk, root);
      walk = next;
    }
    return root;
  };
  // A device named without a pin answers with its output (setup_t::find_terminal).
  const terminal = (name: string): string => {
    const target = resolve(name);
    const device = setup.devices.get(target);
    if (!device) return target;
    if (device.type === 'GNDA') return 'GND.Q';
    return resolve(`${target}.Q`);
  };
  const union = (a: string, b: string): void => { parent.set(find(terminal(a)), find(terminal(b))); };

  // Opamps expand as nld_opamp's constructor does; their rails are computed
  // from the supply they are wired to, so wire and read those first.
  for (const [a, b] of setup.connections) union(a, b);

  const rails = new Map<string, number>();
  rails.set(find('GND.Q'), 0);
  for (const device of setup.devices.values()) {
    if (device.type === 'ANALOG_INPUT') {
      rails.set(find(`${device.name}.Q`), setup.param(`${device.name}.IN`, device.args[0] ?? '0'));
    }
  }
  const railOf = (name: string): number | undefined => rails.get(find(terminal(name)));

  const nodeIds = new Map<string, number>();
  const node = (name: string): number => {
    const root = find(terminal(name));
    let id = nodeIds.get(root);
    if (id === undefined) { id = nodeIds.size; nodeIds.set(root, id); }
    return id;
  };
  const fixedRails: { node: number; volts: number }[] = [];
  const extraRail = (name: string, volts: number): number => {
    const id = node(name);
    fixedRails.push({ node: id, volts });
    return id;
  };

  const elements: NetlistElement[] = [];
  const frontiers: { from: number; to: number }[] = [];
  const elementByParam = new Map<string, number>();
  const logicParams = new Set(config.logicInputs.map(input => input.param));
  const unsupported: string[] = [];

  const family = (text: string): { vLow: number; vHigh: number; rLow: number; rHigh: number } => {
    const model = setup.model(text);
    return {
      vLow: setup.value(model, 'OVL'), vHigh: setup.value(model, 'OVH'),
      rLow: setup.value(model, 'ORL'), rHigh: setup.value(model, 'ORH'),
    };
  };

  for (const device of setup.devices.values()) {
    const name = device.name;
    switch (device.type) {
      case 'SOLVER': case 'GNDA': case 'ANALOG_INPUT': case 'PARAMETER': break;
      case 'RES': {
        elementByParam.set(`${name}.R`, elements.length);
        elements.push({ kind: 'r', a: node(`${name}.1`), b: node(`${name}.2`), g: 1 / Math.max(setup.param(`${name}.R`, device.args[0] ?? '1e9'), GMIN) });
        break;
      }
      case 'CAP':
        elements.push({ kind: 'c', a: node(`${name}.1`), b: node(`${name}.2`), c: setup.param(`${name}.C`, device.args[0] ?? '1e-6') });
        break;
      case 'POT': {
        // nld_POT: DIAL defaults to mid travel, linear unless DIALLOG.
        const r = setup.param(`${name}.R`, device.args[0] ?? '10000');
        let dial = setup.param(`${name}.DIAL`, '0.5');
        if (setup.param(`${name}.DIALLOG`, '0')) dial = (Math.exp(dial) - 1) / (Math.E - 1);
        if (setup.param(`${name}.REVERSE`, '0')) dial = 1 - dial;
        elements.push({ kind: 'r', a: node(`${name}.1`), b: node(`${name}.2`), g: 1 / Math.max(r * dial, GMIN) });
        elements.push({ kind: 'r', a: node(`${name}.2`), b: node(`${name}.3`), g: 1 / Math.max(r * (1 - dial), GMIN) });
        break;
      }
      case 'DIODE': {
        const model = setup.model(device.args[0] ?? 'D');
        elements.push({ kind: 'd', a: node(`${name}.A`), k: node(`${name}.K`), is: setup.value(model, 'IS'), n: setup.value(model, 'N') });
        break;
      }
      case 'QBJT_EB': {
        const text = (device.args[0] ?? '').replace(/^"|"$/g, '');
        const model = setup.model(text);
        const base = /^(NPN|PNP)/i.exec(setup.models.get(text.toUpperCase()) ?? text)?.[1]?.toUpperCase();
        elements.push({
          kind: 'q', b: node(`${name}.B`), c: node(`${name}.C`), e: node(`${name}.E`),
          polarity: base === 'PNP' ? -1 : 1,
          is: setup.value(model, 'IS'), bf: setup.value(model, 'BF'), nf: setup.value(model, 'NF'),
          br: setup.value(model, 'BR'), nr: setup.value(model, 'NR'),
        });
        break;
      }
      case 'OPAMP': {
        const model = setup.model(device.args[0] ?? 'LM324');
        const type = setup.value(model, 'TYPE');
        if (type !== 3) { unsupported.push(`${name}: opamp TYPE ${type}`); break; }
        const vcc = railOf(`${name}.VCC`);
        const gnd = railOf(`${name}.GND`);
        if (vcc === undefined || gnd === undefined) { unsupported.push(`${name}: opamp supply not a rail`); break; }
        // nld_opamp::supply and update_param
        const dab = setup.value(model, 'DAB');
        const slew = setup.value(model, 'SLEW');
        const fpf = setup.value(model, 'FPF');
        const ugf = setup.value(model, 'UGF');
        const cVd = VT_T0 * Math.log(dab / NP_IS + 1);
        const vref = extraRail(`${name}.VREF`, (vcc + gnd) / 2);
        const vh = extraRail(`${name}.VH`, vcc - setup.value(model, 'VLH') - cVd);
        const vl = extraRail(`${name}.VL`, gnd + setup.value(model, 'VLL') + cVd);
        const cp = dab / slew;
        const rp = 0.5 / Math.PI / cp / fpf;
        const internal = node(`${name}.RP1.1`);
        const out = node(`${name}.OUT`);
        elements.push({ kind: 'vccs', ip: node(`${name}.PLUS`), in: node(`${name}.MINUS`), op: internal, on: vref, g: ugf / fpf / rp, ri: setup.value(model, 'RI') });
        elements.push({ kind: 'r', a: internal, b: vref, g: 1 / rp });
        elements.push({ kind: 'c', a: internal, b: vref, c: cp });
        elements.push({ kind: 'vccs', ip: internal, in: vref, op: out, on: vref, g: 1, ri: 1e9, ro: setup.value(model, 'RO') });
        elements.push({ kind: 'd', a: internal, k: vh, is: 1e-15, n: 1 });
        elements.push({ kind: 'd', a: vl, k: internal, is: 1e-15, n: 1 });
        break;
      }
      case 'CD4066_GATE':
        elements.push({
          kind: 'switch', a: node(`${name}.R.1`), b: node(`${name}.R.2`), ctl: node(`${name}.CTL`),
          vdd: node(`${name}.VDD`), vss: node(`${name}.VSS`), baseR: setup.param(`${name}.BASER`, '270'),
        });
        break;
      case 'FRONTIER_DEV': {
        const input = node(`${name}.I`);
        const output = extraRail(`${name}._Q`, 0);
        frontiers.push({ from: input, to: output });
        elements.push({ kind: 'r', a: input, b: node('GND'), g: 1 / netlistNumber(device.args[0]!) });
        elements.push({ kind: 'r', a: output, b: node(`${name}.Q`), g: 1 / netlistNumber(device.args[1]!) });
        break;
      }
      case 'TTL_INPUT': case 'LOGIC_INPUT': {
        const fam = family(device.type === 'TTL_INPUT' ? '74XX' : device.args[1] ?? '74XX');
        const value = setup.param(`${name}.IN`, device.args[0] ?? '0');
        const out = node(`${name}.Q`);
        // Nothing analog on it: nothing to drive.
        elements.push({
          kind: 'logic', output: out, vcc: node(`${name}.VCC`), gnd: node(`${name}.GND`),
          ...(logicParams.has(`${name}.IN`) ? { param: `${name}.IN` } : {}),
          state: value ? 1 : 0, ...fam,
        });
        break;
      }
      default: {
        const gate = gates.get(device.type);
        if (!gate?.invert) { unsupported.push(`${name}: ${device.type}`); break; }
        const model = setup.model(gate.family);
        elements.push({
          kind: 'gate', input: node(`${name}.A`), output: node(`${name}.Q`), vdd: node(`${name}.VDD`), vss: node(`${name}.VSS`),
          state: 1, ivl: setup.value(model, 'IVL'), ivh: setup.value(model, 'IVH'),
          ...family(gate.family),
        });
      }
    }
  }
  if (unsupported.length) throw new Error(`netlist ${config.source}: unsupported ${unsupported.join(', ')}`);

  const inputs: GeneratedNetlistPlan['inputs'] = [];
  for (const input of config.streamInputs) {
    const element = elementByParam.get(input.param);
    if (element !== undefined) {
      const resistor = elements[element]!;
      if (resistor.kind !== 'r') throw new Error('netlist: stream R on non-resistor');
      elements[element] = { kind: 'streamR', a: resistor.a, b: resistor.b, g: resistor.g, input: inputs.length };
      inputs.push({ channel: input.channel, kind: 'resistor', element, mult: input.mult, offset: input.offset });
    } else if (input.param.endsWith('.IN')) {
      inputs.push({ channel: input.channel, kind: 'volts', node: node(input.param.slice(0, -3)), mult: input.mult, offset: input.offset });
    } else {
      throw new Error(`netlist: stream input to ${input.param}`);
    }
  }

  const outputNode = node(config.output.node);
  const railNodes = new Map<number, number>();
  for (const [root, volts] of rails) {
    let id = nodeIds.get(root);
    if (id === undefined) { id = nodeIds.size; nodeIds.set(root, id); }
    railNodes.set(id, volts);
  }
  for (const rail of fixedRails) railNodes.set(rail.node, rail.volts);

  const groups = solverGroups(nodeIds.size, railNodes, elements, frontiers);
  return {
    schemaVersion: 1,
    name: config.source,
    nodes: nodeIds.size,
    rails: [...railNodes].map(([id, volts]) => ({ node: id, volts })),
    groups,
    elements,
    frontiers,
    gmin: GMIN,
    reltol: setup.param('Solver.RELTOL', '1e-3'),
    vntol: setup.param('Solver.VNTOL', '1e-7'),
    nrLoops: setup.param('Solver.NR_LOOPS', '250'),
    inputs,
    logicInputs: config.logicInputs.map(input => input.param),
    output: { node: outputNode, mult: config.output.mult, offset: config.output.offset },
    source: { file, netlist: config.source },
  };
}

/** Nets join a group through any element; a rail joins nothing. Frontier sources run first. */
function solverGroups(
  nodes: number,
  rails: Map<number, number>,
  elements: readonly NetlistElement[],
  frontiers: readonly { from: number; to: number }[],
): number[][] {
  const parent = Array.from({ length: nodes }, (_, index) => index);
  const find = (index: number): number => {
    while (parent[index] !== index) {
      parent[index] = parent[parent[index]!]!;
      index = parent[index]!;
    }
    return index;
  };
  const join = (list: number[]): void => {
    const live = list.filter(id => !rails.has(id));
    for (const id of live.slice(1)) parent[find(id)] = find(live[0]!);
  };
  for (const element of elements) {
    switch (element.kind) {
      case 'r': case 'streamR': case 'c': join([element.a, element.b]); break;
      case 'd': join([element.a, element.k]); break;
      case 'q': join([element.b, element.c, element.e]); break;
      case 'vccs': join([element.ip, element.in, element.op, element.on]); break;
      case 'switch': join([element.a, element.b]); break;
      case 'gate': case 'logic': break;
    }
  }
  const members = new Map<number, number[]>();
  for (let id = 0; id < nodes; id++) {
    if (rails.has(id)) continue;
    const root = find(id);
    members.set(root, [...(members.get(root) ?? []), id]);
  }
  const groups = [...members.values()];
  // A group reads a frontier's rail, so it follows the group that feeds it.
  const groupOf = new Map<number, number>();
  groups.forEach((group, index) => group.forEach(id => groupOf.set(id, index)));
  const after = groups.map(() => new Set<number>());
  const touches = groups.map(() => new Set<number>());
  for (const element of elements) {
    const pins = element.kind === 'r' || element.kind === 'streamR' || element.kind === 'c' || element.kind === 'switch'
      ? [element.a, element.b]
      : element.kind === 'd' ? [element.a, element.k]
      : element.kind === 'q' ? [element.b, element.c, element.e]
      : element.kind === 'vccs' ? [element.ip, element.in, element.op, element.on]
      : [];
    const home = pins.map(pin => groupOf.get(pin)).find(group => group !== undefined);
    if (home !== undefined) for (const pin of pins) if (rails.has(pin)) touches[home]!.add(pin);
  }
  for (const frontier of frontiers) {
    const source = groupOf.get(frontier.from);
    if (source === undefined) continue;
    touches.forEach((pins, index) => { if (index !== source && pins.has(frontier.to)) after[index]!.add(source); });
  }
  const order: number[] = [];
  const seen = new Set<number>();
  const visit = (index: number): void => {
    if (seen.has(index)) return;
    seen.add(index);
    for (const dependency of after[index]!) visit(dependency);
    order.push(index);
  };
  groups.forEach((_, index) => visit(index));
  return order.map(index => groups[index]!);
}
