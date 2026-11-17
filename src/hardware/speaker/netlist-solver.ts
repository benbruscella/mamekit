// MAME's netlist solver as the stream mix runs it: one sparse LU per group,
// each group on its own clock as MAME's matrix solvers are, backward Euler,
// and Newton-Raphson only for the groups a diode or BJT is in. Logic nets run
// on MAME's event queue: a push lands after its delay unless a later push to
// the same net replaces it, and a delivered change runs the handlers of the
// devices that read the net. It runs a compiled plan (src/ir/netlist-plan.ts)
// and models no circuit of its own.

import type { GeneratedNetlistElementData, GeneratedNetlistLogicData, GeneratedNetlistPlanData } from '../../ir/netlist-plan.ts';

const NETLIST_T0_VT = 300 * 1.38064852e-23 / 1.6021765314e-19;
const NETLIST_DIODE_MIN_CUTOFF = -5;
const NETLIST_DIODE_MAXDIFF = 1e100;

/** generic_diode<BIPOLAR> with USE_TEXTBOOK_DIODE. */
class GeneratedNetlistDiode {
  vd = 0.7;
  id = 0;
  g = 1e-9;
  private readonly is: number;
  private readonly logIs: number;
  private readonly gmin: number;
  private readonly vt: number;
  private readonly vtInv: number;
  private readonly vmin: number;
  private readonly vcrit: number;

  constructor(is: number, n: number, gmin: number) {
    this.is = is;
    this.logIs = Math.log(is);
    this.gmin = gmin;
    this.vt = n * NETLIST_T0_VT;
    this.vtInv = 1 / this.vt;
    this.vmin = NETLIST_DIODE_MIN_CUTOFF * this.vt;
    this.vcrit = this.vt * Math.log(this.vt / is / Math.SQRT2);
  }

  /** Save-state roots (machine-state.ts): the operating point; the rest is the model. */
  stateKeys(): readonly string[] { return ['vd', 'id', 'g']; }

  update(nVd: number): void {
    if (nVd > this.vcrit) {
      const old = Math.max(0, this.vd);
      const d = Math.min(NETLIST_DIODE_MAXDIFF, nVd - old);
      const a = Math.abs(d) * this.vtInv;
      this.vd = old + Math.sign(d) * Math.log1p(a) * this.vt;
    } else {
      this.vd = Math.max(-NETLIST_DIODE_MAXDIFF, nVd);
    }
    if (this.vd < this.vmin) {
      this.g = this.gmin;
      this.id = -this.is;
    } else {
      const ise = Math.exp(this.logIs + this.vd * this.vtInv);
      this.id = ise - this.is;
      this.g = ise * this.vtInv + this.gmin;
    }
  }
}

/** matrix_solver_params_t's MIN_TS_TS: a changed input is solved this long after it lands. */
const NETLIST_MIN_TS_TS = 1e-9;
/** Below a netlist_time quantum a group is already up to date (matrix_solver_t::solve). */
const NETLIST_QUANTUM = 1e-15;

/** One group's matrix, its elimination fixed once from its sparsity. */
class GeneratedNetlistGroup {
  readonly size: number;
  /** The node at each row, so voltages can be read back. */
  readonly nodes: Int32Array;
  readonly local: Map<number, number>;
  readonly a: Float64Array;
  readonly base: Float64Array;
  readonly rhs: Float64Array;
  readonly x: Float64Array;
  // For column k: the rows below it to eliminate and the columns right of it.
  private readonly lowerStart: Int32Array;
  private readonly lower: Int32Array;
  private readonly upperStart: Int32Array;
  private readonly upper: Int32Array;

  /** Save-state roots: the stamped matrix and its last solve; the elimination order is fixed. */
  stateKeys(): readonly string[] { return ['a', 'base', 'rhs', 'x']; }

  constructor(nodes: readonly number[], pairs: readonly (readonly [number, number])[]) {
    const size = nodes.length;
    this.size = size;
    const index = new Map(nodes.map((node, position) => [node, position]));
    // Minimum-degree order keeps the fill small; the pivots stay on the
    // diagonal, as MAME's GCR solver keeps them.
    const adjacency = nodes.map(() => new Set<number>());
    for (const [row, column] of pairs) {
      const r = index.get(row);
      const c = index.get(column);
      if (r === undefined || c === undefined || r === c) continue;
      adjacency[r]!.add(c);
      adjacency[c]!.add(r);
    }
    const order: number[] = [];
    const left = new Set(nodes.map((_, position) => position));
    while (left.size) {
      let best = -1;
      let bestDegree = Infinity;
      for (const position of left) {
        if (adjacency[position]!.size < bestDegree) {
          bestDegree = adjacency[position]!.size;
          best = position;
        }
      }
      left.delete(best);
      order.push(best);
      const neighbours = [...adjacency[best]!];
      for (const n of neighbours) {
        adjacency[n]!.delete(best);
        for (const m of neighbours) if (m !== n) adjacency[n]!.add(m);
      }
    }
    const rowOf = new Map(order.map((position, row) => [position, row]));
    this.nodes = Int32Array.from(order.map(position => nodes[position]!));
    this.local = new Map(order.map((position, row) => [nodes[position]!, row]));
    this.a = new Float64Array(size * size);
    this.base = new Float64Array(size * size);
    this.rhs = new Float64Array(size);
    this.x = new Float64Array(size);
    // Symbolic elimination in the chosen order.
    const present = new Uint8Array(size * size);
    for (let row = 0; row < size; row++) present[row * size + row] = 1;
    for (const [row, column] of pairs) {
      const r = rowOf.get(index.get(row) ?? -1);
      const c = rowOf.get(index.get(column) ?? -1);
      if (r === undefined || c === undefined) continue;
      present[r * size + c] = 1;
      // Structurally symmetric: op-amp couplings fill on the way back.
      present[c * size + r] = 1;
    }
    const lower: number[] = [];
    const upper: number[] = [];
    const lowerStart = [0];
    const upperStart = [0];
    for (let k = 0; k < size; k++) {
      for (let row = k + 1; row < size; row++) {
        if (!present[row * size + k]) continue;
        lower.push(row);
        for (let column = k + 1; column < size; column++) {
          if (present[k * size + column]) present[row * size + column] = 1;
        }
      }
      for (let column = k + 1; column < size; column++) {
        if (present[k * size + column]) upper.push(column);
      }
      lowerStart.push(lower.length);
      upperStart.push(upper.length);
    }
    this.lower = Int32Array.from(lower);
    this.upper = Int32Array.from(upper);
    this.lowerStart = Int32Array.from(lowerStart);
    this.upperStart = Int32Array.from(upperStart);
  }

  /** LU in place, then the two substitutions, into x. */
  solve(): void {
    const { size, a, rhs, x, lower, upper, lowerStart, upperStart } = this;
    for (let k = 0; k < size; k++) {
      const pivotRow = k * size;
      const pivot = a[pivotRow + k]!;
      const us = upperStart[k]!;
      const ue = upperStart[k + 1]!;
      const rhsK = rhs[k]!;
      for (let l = lowerStart[k]!, end = lowerStart[k + 1]!; l < end; l++) {
        const row = lower[l]!;
        const rowStart = row * size;
        const factor = a[rowStart + k]! / pivot;
        if (factor === 0) continue;
        for (let u = us; u < ue; u++) {
          const column = upper[u]!;
          a[rowStart + column]! -= factor * a[pivotRow + column]!;
        }
        rhs[row]! -= factor * rhsK;
      }
    }
    for (let k = size - 1; k >= 0; k--) {
      const pivotRow = k * size;
      let sum = rhs[k]!;
      for (let u = upperStart[k]!, end = upperStart[k + 1]!; u < end; u++) {
        const column = upper[u]!;
        sum -= a[pivotRow + column]! * x[column]!;
      }
      x[k] = sum / a[pivotRow + k]!;
    }
  }
}

function netlistElementPins(element: GeneratedNetlistElementData): number[] {
  switch (element.kind) {
    case 'r': case 'streamR': case 'c': case 'switch': case 'dsw': case 'cs': case 'dac': return [element.a, element.b];
    case 'd': return [element.a, element.k];
    case 'q': return [element.e, element.c, element.b];
    case 'vccs': return [element.ip, element.in, element.op, element.on];
    case 'logic': case 'gate': return [element.output];
  }
}

/** A two-terminal element's places in its group's matrix; -1 for a rail's side. */
interface GeneratedNetlistTwoTerminal {
  a: number;
  b: number;
  la: number;
  lb: number;
  aa: number;
  ab: number;
  ba: number;
  bb: number;
}

interface GeneratedNetlistCapacitor extends GeneratedNetlistTwoTerminal { c: number; g: number; h: number; ieq: number }
interface GeneratedNetlistStreamR extends GeneratedNetlistTwoTerminal { input: number }
interface GeneratedNetlistDiodeStamp extends GeneratedNetlistTwoTerminal { diode: GeneratedNetlistDiode }
interface GeneratedNetlistBjtStamp {
  nodes: number[];
  rows: number[];
  /** Row by column into the matrix, -1 where the column or the row is a rail. */
  cells: number[];
  polarity: number;
  be: GeneratedNetlistDiode;
  bc: GeneratedNetlistDiode;
  alphaF: number;
  alphaR: number;
}
/** nld_d_to_a_proxy's RN and RP, from a logic output to its two supplies. */
interface GeneratedNetlistDrive {
  rn: GeneratedNetlistTwoTerminal;
  rp: GeneratedNetlistTwoTerminal;
  rLow: number;
  rHigh: number;
  vLow: number;
  vHigh: number;
  state: number;
  group: number;
}
interface GeneratedNetlistSwitch extends GeneratedNetlistTwoTerminal {
  ctl: number;
  vdd: number;
  vss: number;
  baseR: number;
  closed: boolean;
  group: number;
}
interface GeneratedNetlistGate { input: number; vdd: number; vss: number; ivl: number; ivh: number; drive: GeneratedNetlistDrive }
/** nld_sys_dsw1: the resistor a logic net switches. */
interface GeneratedNetlistDsw extends GeneratedNetlistTwoTerminal { ron: number; roff: number; state: number; group: number }
interface GeneratedNetlistCurrent extends GeneratedNetlistTwoTerminal { i: number }
interface GeneratedNetlistDac extends GeneratedNetlistTwoTerminal { g: number; vin: number; bits: number; value: number; group: number }

/**
 * What a delivered logic change runs: a logic device's handler (by index and
 * handler), a d_to_a proxy, or a SYS_DSW. `edge` is MAME's terminal state: 3
 * for any change, 1 for low to high, 2 for high to low.
 */
type GeneratedNetlistListener =
  | { kind: 'device'; device: number; handler: number; edge: number }
  | { kind: 'drive'; drive: GeneratedNetlistDrive }
  | { kind: 'dsw'; dsw: GeneratedNetlistDsw };

/** A logic device's state: its handlers' state_vars. */
interface GeneratedNetlistLogicState {
  /** monostable m_last_trig, m_state; vco m_enableq, m_out, m_inc; counter m_cnt, IP active. */
  a: number;
  b: number;
  c: number;
  /** The analog inputs as last delivered (analog_output_t::push compares). */
  seen: Float64Array;
}

/** netlist_time::quantum(): config's INTERNAL_RES is 10^10 a second. */
const NETLIST_TIME_QUANTUM = 1e-10;
/** fp_constants<double>: the LTE estimate's clamps. */
const NETLIST_TIMESTEP_MAXDIFF = 1e100;
const NETLIST_TIMESTEP_MINDIV = 1e-60;

interface GeneratedNetlistGroupState {
  matrix: GeneratedNetlistGroup;
  /** Everything that holds its value from step to step. */
  railTerms: { row: number; node: number; coef: number }[];
  capacitors: GeneratedNetlistCapacitor[];
  streams: GeneratedNetlistStreamR[];
  switches: GeneratedNetlistSwitch[];
  drives: GeneratedNetlistDrive[];
  diodes: GeneratedNetlistDiodeStamp[];
  bjts: GeneratedNetlistBjtStamp[];
  frontiers: { from: number; to: number }[];
  dsws: GeneratedNetlistDsw[];
  currents: GeneratedNetlistCurrent[];
  dacs: GeneratedNetlistDac[];
  /** Logic devices reading a node of this group, run after it solves. */
  watchers: number[];
  /** Dynamic time stepping: the voltages before the solve, and each net's last step and change. */
  lastV?: Float64Array;
  hPrev?: Float64Array;
  ddPrev?: Float64Array;
  /** When it last solved and when it next solves unless something changes first. */
  lastStep: number;
  next: number;
}

export class GeneratedNetlistSolver {
  private readonly v: Float64Array;
  private readonly groups: GeneratedNetlistGroupState[];
  private readonly switches: GeneratedNetlistSwitch[] = [];
  private readonly gates: GeneratedNetlistGate[] = [];
  /** In the plan's `logicInputs` order, which is how a write names one. */
  private readonly logics: (GeneratedNetlistDrive | undefined)[] = [];
  private readonly inputG: Float64Array;
  private readonly inputs: GeneratedNetlistPlanData['inputs'];
  private readonly output: GeneratedNetlistPlanData['output'];
  private readonly gmin: number;
  private readonly reltol: number;
  private readonly vntol: number;
  private readonly nrLoops: number;
  private readonly maxStep: number;
  private readonly rate: number;
  /** Each input's groups: the ones `change_state` solves when it moves. */
  private readonly inputGroups: number[][];
  private readonly inputValues: Float64Array;
  /** Seconds: the time the last read was taken at. */
  private now = 0;
  private readonly dynamic?: { lte: number; minStep: number };
  /** `NETLIST_INT_INPUT`s, in the plan's `paramInputs` order. */
  private readonly params: (GeneratedNetlistDac | undefined)[] = [];
  /** The logic nets: each one's value, the value pushed to it, and its listeners. */
  private readonly logic: readonly GeneratedNetlistLogicData[];
  private readonly logicStates: GeneratedNetlistLogicState[];
  private readonly curQ: Uint8Array;
  private readonly newQ: Uint8Array;
  private readonly listeners: GeneratedNetlistListener[][];
  /** The queue: one pending change a net, `version` telling a replaced one apart. */
  private readonly version: Uint32Array;
  private heapTime = new Float64Array(64);
  private heapNet = new Int32Array(64);
  private heapVersion = new Uint32Array(64);
  private heapSeq = new Float64Array(64);
  private heapSize = 0;
  private seq = 0;
  /** Logic sources a driver writes, in the plan's `logicInputs` order. */
  private readonly sources: (number | undefined)[] = [];
  /** Whether netlist_state_t::reset's startup pass has run. */
  private started = false;
  /** The time handlers run at: an event's, or a solve's. */
  private time = 0;

  /**
   * Save-state roots (machine-state.ts): node voltages, the inputs as they
   * last landed, each group's clock, matrix, capacitors, switches, drives and
   * diodes, and the logic nets with their queue and each device's state.
   * Without them the netlist was opaque to a save, and a rewound board played
   * on from whatever voltages the netlist had reached instead.
   */
  /** The queue's arrays grow as it fills, so a save may carry them at another length. */
  stateResizable(): readonly string[] {
    return ['heapTime', 'heapNet', 'heapVersion', 'heapSeq'];
  }

  stateKeys(): readonly string[] {
    return [
      'v', 'inputG', 'inputValues', 'now', 'groups', 'switches', 'gates', 'logics', 'params',
      'logicStates', 'curQ', 'newQ', 'version', 'heapTime', 'heapNet', 'heapVersion', 'heapSeq', 'heapSize', 'seq',
      'started', 'time',
    ];
  }

  constructor(plan: GeneratedNetlistPlanData, rate: number) {
    this.rate = rate;
    this.maxStep = 1 / (plan.frequency ?? 48000);
    this.inputs = plan.inputs;
    this.output = plan.output;
    this.gmin = plan.gmin;
    this.reltol = plan.reltol;
    this.vntol = plan.vntol;
    this.nrLoops = plan.nrLoops;
    if (plan.dynamic) this.dynamic = plan.dynamic;
    this.v = new Float64Array(plan.nodes);
    const logicNets = plan.logicNets ?? 0;
    this.logic = plan.logic ?? [];
    this.curQ = new Uint8Array(logicNets);
    this.newQ = new Uint8Array(logicNets);
    this.version = new Uint32Array(logicNets);
    this.listeners = Array.from({ length: logicNets }, () => []);
    this.logicStates = this.logic.map(() => ({ a: 0, b: 0, c: 0, seen: new Float64Array(2).fill(NaN) }));
    const rail = new Uint8Array(plan.nodes);
    for (const entry of plan.rails) {
      this.v[entry.node] = entry.volts;
      rail[entry.node] = 1;
    }
    this.inputG = new Float64Array(plan.inputs.length);
    this.inputValues = new Float64Array(plan.inputs.length).fill(NaN);
    const groupOf = new Map<number, number>();
    plan.groups.forEach((group, index) => group.forEach(node => groupOf.set(node, index)));
    // The matrix's shape first: every element's pins couple to one another.
    const pairs: [number, number][][] = plan.groups.map(() => []);
    for (const element of plan.elements) {
      const pins = netlistElementPins(element);
      const home = pins.map(pin => groupOf.get(pin)).find(group => group !== undefined);
      if (home === undefined) continue;
      for (const row of pins) for (const column of pins) pairs[home]!.push([row, column]);
    }
    this.groups = plan.groups.map((nodes, index) => ({
      matrix: new GeneratedNetlistGroup(nodes, pairs[index]!),
      railTerms: [],
      capacitors: [],
      streams: [],
      switches: [],
      drives: [],
      diodes: [],
      bjts: [],
      frontiers: plan.frontiers.filter(frontier => nodes.includes(frontier.from)),
      dsws: [],
      currents: [],
      dacs: [],
      watchers: [],
      ...(plan.dynamic ? {
        lastV: new Float64Array(nodes.length),
        // nld_matrix_solver_ext: "we need a non zero value here"
        hPrev: new Float64Array(nodes.length).fill(1e-6),
        ddPrev: new Float64Array(nodes.length),
      } : {}),
      lastStep: 0,
      next: this.maxStep,
    }));
    const homes = plan.elements.map(element =>
      netlistElementPins(element).map(pin => groupOf.get(pin)).find(group => group !== undefined));
    this.inputGroups = plan.inputs.map(input => {
      if (input.kind === 'resistor') return homes[input.element!] === undefined ? [] : [homes[input.element!]!];
      const touched = new Set<number>();
      plan.elements.forEach((element, index) => {
        if (homes[index] !== undefined && netlistElementPins(element).includes(input.node!)) touched.add(homes[index]!);
      });
      return [...touched];
    });
    const place = (state: GeneratedNetlistGroupState, a: number, b: number): GeneratedNetlistTwoTerminal => {
      const { local, size } = state.matrix;
      const la = rail[a] ? -1 : local.get(a) ?? -1;
      const lb = rail[b] ? -1 : local.get(b) ?? -1;
      return {
        a, b, la, lb,
        aa: la >= 0 ? la * size + la : -1,
        ab: la >= 0 && lb >= 0 ? la * size + lb : -1,
        ba: la >= 0 && lb >= 0 ? lb * size + la : -1,
        bb: lb >= 0 ? lb * size + lb : -1,
      };
    };
    const constant = (state: GeneratedNetlistGroupState, row: number, column: number, value: number): void => {
      if (rail[row]) return;
      const { local, size, base } = state.matrix;
      const r = local.get(row)!;
      if (rail[column]) state.railTerms.push({ row: r, node: column, coef: -value });
      else base[r * size + local.get(column)!]! += value;
    };
    const resistor = (state: GeneratedNetlistGroupState, a: number, b: number, g: number): void => {
      constant(state, a, a, g);
      constant(state, a, b, -g);
      constant(state, b, b, g);
      constant(state, b, a, -g);
    };
    const drive = (element: { output: number; rLow: number; rHigh: number; vLow: number; vHigh: number; state: number }, state: GeneratedNetlistGroupState, vcc: number, gnd: number): GeneratedNetlistDrive => {
      const made = {
        rn: place(state, element.output, gnd),
        rp: place(state, vcc, element.output),
        rLow: element.rLow, rHigh: element.rHigh, vLow: element.vLow, vHigh: element.vHigh,
        state: element.state,
        group: this.groups.indexOf(state),
      };
      state.drives.push(made);
      return made;
    };
    for (const [index, element] of plan.elements.entries()) {
      const home = homes[index];
      if (home === undefined) {
        continue;
      }
      const state = this.groups[home]!;
      switch (element.kind) {
        case 'r': resistor(state, element.a, element.b, element.g); break;
        case 'streamR': state.streams.push({ ...place(state, element.a, element.b), input: element.input }); break;
        // generic_capacitor_const: G = C / h + gmin, stamped each solve because
        // h is the time since the group last solved.
        case 'c':
          state.capacitors.push({ ...place(state, element.a, element.b), c: element.c, g: 0, h: 0, ieq: 0 });
          break;
        case 'vccs': {
          // nld_VCCS and nld_VCVS::reset: 1/RI across the input, the output
          // current m_G * gfac from the input's difference, and 1/RO on a VCVS.
          const gfac = element.gfac ?? (element.ro !== undefined ? 1 / element.ro : 1);
          const mult = element.g * gfac;
          resistor(state, element.ip, element.in, 1 / element.ri);
          constant(state, element.op, element.ip, -mult);
          constant(state, element.op, element.in, mult);
          constant(state, element.on, element.ip, mult);
          constant(state, element.on, element.in, -mult);
          if (element.ro !== undefined) resistor(state, element.op, element.on, gfac);
          break;
        }
        case 'switch': {
          const made = { ...place(state, element.a, element.b), ctl: element.ctl, vdd: element.vdd, vss: element.vss, baseR: element.baseR, closed: false, group: home };
          state.switches.push(made);
          this.switches.push(made);
          break;
        }
        case 'd':
          state.diodes.push({ ...place(state, element.a, element.k), diode: new GeneratedNetlistDiode(element.is, element.n, plan.gmin) });
          break;
        case 'q': {
          const alphaF = element.bf / (1 + element.bf);
          const alphaR = element.br / (1 + element.br);
          const nodes = [element.e, element.c, element.b];
          const { local, size } = state.matrix;
          state.bjts.push({
            nodes,
            rows: nodes.map(node => rail[node] ? -1 : local.get(node)!),
            cells: nodes.flatMap(row => nodes.map(column =>
              rail[row] || rail[column] ? -1 : local.get(row)! * size + local.get(column)!)),
            polarity: element.polarity,
            be: new GeneratedNetlistDiode(element.is / alphaF, element.nf, plan.gmin),
            bc: new GeneratedNetlistDiode(element.is / alphaR, element.nr, plan.gmin),
            alphaF,
            alphaR,
          });
          break;
        }
        case 'logic': {
          const made = drive(element, state, element.vcc, element.gnd);
          if (element.param !== undefined) this.logics[plan.logicInputs.indexOf(element.param)] = made;
          if (element.net !== undefined) this.listeners[element.net]!.push({ kind: 'drive', drive: made });
          break;
        }
        case 'dsw': {
          // nld_sys_dsw1::reset: off.
          const made = { ...place(state, element.a, element.b), ron: element.ron, roff: element.roff, state: 0, group: home };
          state.dsws.push(made);
          this.listeners[element.net]!.push({ kind: 'dsw', dsw: made });
          break;
        }
        case 'cs': state.currents.push({ ...place(state, element.a, element.b), i: element.i }); break;
        case 'dac': {
          const made = { ...place(state, element.a, element.b), g: element.g, vin: element.vin, bits: element.bits, value: element.value, group: home };
          state.dacs.push(made);
          if (element.param !== undefined) this.params[(plan.paramInputs ?? []).indexOf(element.param)] = made;
          break;
        }
        case 'gate':
          this.gates.push({ input: element.input, vdd: element.vdd, vss: element.vss, ivl: element.ivl, ivh: element.ivh, drive: drive(element, state, element.vdd, element.vss) });
          break;
      }
    }
    // Each logic device listens to the nets it reads, and to the groups its
    // analog inputs are solved in.
    const watch = (device: number, node: number): void => {
      const group = groupOf.get(node);
      if (group !== undefined && !this.groups[group]!.watchers.includes(device)) this.groups[group]!.watchers.push(device);
    };
    this.logic.forEach((device, index) => {
      const listen = (net: number, handler: number, edge = 3): void => { this.listeners[net]!.push({ kind: 'device', device: index, handler, edge }); };
      switch (device.kind) {
        case 'source':
          if (device.param !== undefined) this.sources[plan.logicInputs.indexOf(device.param)] = index;
          break;
        case 'table': for (const net of device.inputs) listen(net, 0); break;
        case 'threshold': watch(index, device.node); break;
        case 'monostable':
          for (const net of device.inputs) listen(net, 0);
          watch(index, device.cv);
          break;
        case 'vco':
          listen(device.enq, 0);
          listen(device.y, 1);
          watch(index, device.fc);
          watch(index, device.rng);
          break;
        case 'counter':
          // IP is active high-to-low only (activate_hl); RESET on either edge.
          listen(device.ip, 0, 2);
          listen(device.reset, 1);
          break;
      }
    });
  }

  /** A `NETLIST_LOGIC_INPUT`'s value (`m_filter_ctl[n]->write(bit)`), from `at` seconds. */
  writeLogic(index: number, value: number, at = this.now): void {
    const state = value ? 1 : 0;
    const source = this.sources[index];
    if (source !== undefined) {
      // nld_logic_input::update_param: its output pushes the new value.
      const device = this.logic[source] as Extract<GeneratedNetlistLogicData, { kind: 'source' }>;
      this.advance(at);
      this.time = at;
      this.push(device.net, state, device.delay);
      return;
    }
    const entry = this.logics[index];
    if (!entry || entry.state === state) return;
    this.advance(at);
    this.changeState(entry.group, at, () => { entry.state = state; });
  }

  /** A `NETLIST_INT_INPUT`'s value (`m_audio_dac->write(data)`), from `at` seconds. */
  writeParam(index: number, value: number, at = this.now): void {
    const dac = this.params[index];
    if (!dac || dac.value === value) return;
    this.advance(at);
    // nld_r2r_dac::update_param: change_state with the new source voltage.
    this.changeState(dac.group, at, () => { dac.value = value; });
  }

  /**
   * A stream input's sample landing at `at` seconds, as a NETLIST_STREAM_INPUT
   * sets its parameter at each of the source's own sample times: MAME feeds
   * the netlist at the source's rate (SAMPLE_RATE_INPUT_ADAPTIVE), not at 48 kHz.
   */
  set(channel: number, sample: number, at: number): void {
    const { inputs, inputValues } = this;
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index]!;
      if (input.channel !== channel) continue;
      const value = sample * input.mult + input.offset;
      if (value === inputValues[index]) continue;
      inputValues[index] = value;
      this.advance(at);
      const apply = input.kind === 'resistor'
        ? () => { this.inputG[index] = 1 / Math.max(value, this.gmin); }
        : () => { this.v[input.node!] = value; };
      const groups = this.inputGroups[index]!;
      if (!groups.length) apply();
      for (let g = 0; g < groups.length; g++) this.changeState(groups[g]!, at, g === 0 ? apply : () => {});
    }
  }

  /** The output as it stands at `at` seconds: every solve due by then, then the node. */
  read(at: number): number {
    this.advance(at);
    this.now = at;
    return this.v[this.output.node]! * this.output.mult + this.output.offset;
  }

  /** One sample at the constructor's rate, every stream landing at its start. */
  step(streams: ArrayLike<number>): number {
    for (let index = 0; index < this.inputs.length; index++) {
      const channel = this.inputs[index]!.channel;
      this.set(channel, streams[channel]!, this.now);
    }
    return this.read(this.now + 1 / this.rate);
  }

  /**
   * Each group's time-stepped solves and each logic change due by `at`,
   * earliest first: MAME keeps both on one queue.
   */
  private advance(at: number): void {
    if (!this.started) this.startup();
    const groups = this.groups;
    const limit = at + NETLIST_QUANTUM;
    for (;;) {
      let due = -1;
      for (let index = 0; index < groups.length; index++) {
        if (groups[index]!.next <= limit && (due < 0 || groups[index]!.next < groups[due]!.next)) due = index;
      }
      const event = this.heapSize ? this.heapTime[0]! : Infinity;
      if (event <= limit && (due < 0 || event <= groups[due]!.next)) {
        this.deliver();
        continue;
      }
      if (due < 0) return;
      // Rescheduled before solving: a switch the solve flips may bring its own
      // group back sooner (change_state).
      const state = groups[due]!;
      const time = state.next;
      const planned = time + this.maxStep;
      state.next = planned;
      const step = this.solve(due, time);
      // With DYNAMIC_TS the step is what the solve's error estimate allows,
      // and a group with no capacitor waits for a change (time_step_device_count).
      if (this.dynamic && state.next === planned) state.next = state.capacitors.length ? time + step : Infinity;
    }
  }

  /**
   * matrix_solver_t::change_state: bring the group up to `at` on the old
   * value, apply the change, and solve again MIN_TS_TS later.
   */
  private changeState(group: number, at: number, apply: () => void): void {
    const state = this.groups[group]!;
    this.solve(group, at);
    apply();
    state.next = at + NETLIST_MIN_TS_TS;
  }

  /** netlist_state_t::reset: inputs push their values, then every handler runs once. */
  private startup(): void {
    this.started = true;
    this.time = 0;
    for (const device of this.logic) if (device.kind === 'source') this.push(device.net, device.state, device.delay);
    this.logic.forEach((device, index) => {
      switch (device.kind) {
        case 'source': break;
        case 'table': this.handle(index, 0); break;
        case 'threshold': this.watched(index, true); break;
        case 'monostable': this.handle(index, 0); this.watched(index, true); break;
        case 'vco': this.watched(index, true); this.handle(index, 1); break;
        case 'counter': this.handle(index, 0); this.handle(index, 1); break;
      }
    });
  }

  /** net_t::set_Q_and_push: a new value replaces whatever the net had pending. */
  private push(net: number, value: number, delay: number): void {
    if (value === this.newQ[net]) return;
    this.newQ[net] = value;
    const version = ++this.version[net]!;
    this.heapPush(this.time + delay, net, version);
  }

  /** net_t::update_devs: the earliest pending change lands and its listeners run. */
  private deliver(): void {
    const time = this.heapTime[0]!;
    const net = this.heapNet[0]!;
    const version = this.heapVersion[0]!;
    this.heapPop();
    if (version !== this.version[net]) return;
    const value = this.newQ[net]!;
    if (value === this.curQ[net]) return;
    this.curQ[net] = value;
    this.time = time;
    const mask = value ? 1 : 2;
    const listeners = this.listeners[net]!;
    for (let index = 0; index < listeners.length; index++) {
      const listener = listeners[index]!;
      if (listener.kind === 'device') {
        if (listener.edge & mask) this.handle(listener.device, listener.handler);
      } else if (listener.kind === 'drive') {
        // nld_d_to_a_proxy's input handler.
        const drive = listener.drive;
        if (drive.state !== value) this.changeState(drive.group, time, () => { drive.state = value; });
      } else {
        // nld_sys_dsw1's input handler.
        const dsw = listener.dsw;
        if (dsw.state !== value) this.changeState(dsw.group, time, () => { dsw.state = value; });
      }
    }
  }

  /** A logic device's handler for a change of a logic input (0: its main input set, 1: its second). */
  private handle(index: number, handler: number): void {
    const device = this.logic[index]!;
    const state = this.logicStates[index]!;
    const q = this.curQ;
    switch (device.kind) {
      case 'table': {
        let bits = 0;
        for (let i = 0; i < device.inputs.length; i++) bits |= q[device.inputs[i]!]! << i;
        const out = device.table[bits]!;
        const count = device.outputs.length;
        for (let o = 0; o < count; o++) this.push(device.outputs[o]!, (out >> o) & 1, device.delays[bits * count + o]!);
        break;
      }
      case 'monostable': {
        // nld_74123_base::ab_clear; a = m_last_trig, b = m_state.
        let bits = 0;
        for (let i = 0; i < device.inputs.length; i++) bits |= q[device.inputs[i]!]! << i;
        const trig = device.trigger[bits]!;
        if (!device.clear[bits]) {
          this.push(device.q, 0, device.tC);
          this.push(device.qq, 1, device.tC);
          this.push(device.rp, 1, device.tC);
          this.push(device.rn, 0, device.tC);
          state.b = 2;
        } else if (!state.a && trig) {
          this.push(device.q, 1, device.tAB);
          this.push(device.qq, 0, device.tAB);
          this.push(device.rn, 1, device.tAB);
          this.push(device.rp, 0, device.tAB);
          state.b = 1;
        }
        state.a = trig;
        break;
      }
      case 'vco': {
        // a = m_enableq, b = m_out, c = m_inc.
        if (handler === 1) {
          // SN74LS629clk::fb
          if (!state.a) {
            state.b ^= 1;
            this.push(device.y, state.b, state.c);
          } else {
            this.push(device.y, 1, state.c);
          }
        } else {
          this.vcoInputs(index);
        }
        break;
      }
      case 'counter': {
        // a = m_cnt, b = IP inactive while RESET holds.
        if (handler === 0) {
          if (state.b) break;
          state.a++;
          for (let bit = 0; bit < device.outputs.length; bit++) {
            if (device.outputs[bit]! >= 0) this.push(device.outputs[bit]!, (state.a >> bit) & 1, device.delays[bit]!);
          }
        } else if (q[device.reset]) {
          state.a = 0;
          state.b = 1;
          for (const net of device.outputs) if (net >= 0) this.push(net, 0, device.resetDelay);
        } else {
          state.b = 0;
        }
        break;
      }
      default: break;
    }
  }

  /** nld_SN74LS629's inputs handler: a new half period, then the enable. */
  private vcoInputs(index: number): void {
    const device = this.logic[index] as Extract<GeneratedNetlistLogicData, { kind: 'vco' }>;
    const state = this.logicStates[index]!;
    const vFreq = this.v[device.fc]!;
    const vRng = this.v[device.rng]!;
    let freq = 0;
    for (const term of device.terms) freq += term.k * vFreq ** term.f * vRng ** term.r;
    freq *= device.scale;
    // netlist_time::from_fp rounds to the quantum.
    state.c = Math.round(0.5 / freq / NETLIST_TIME_QUANTUM) * NETLIST_TIME_QUANTUM;
    const enq = this.curQ[device.enq]!;
    if ((!state.a && enq) || (state.a && !enq)) {
      state.a = enq;
      state.b ^= 1;
      this.push(device.y, state.b, 1e-9);
    }
  }

  /**
   * A device's analog inputs after its group solved: analog_output_t::push
   * runs the handler only when a value moved (`force` at startup).
   */
  private watched(index: number, force = false): void {
    const device = this.logic[index]!;
    const state = this.logicStates[index]!;
    const v = this.v;
    switch (device.kind) {
      case 'threshold': {
        const value = v[device.node]!;
        if (!force && value === state.seen[0]) return;
        state.seen[0] = value;
        // nld_a_to_d_proxy::input against the family's thresholds.
        const vn = v[device.vn]!;
        const span = v[device.vp]! - vn;
        if (value > vn + span * device.ivh) this.push(device.net, 1, NETLIST_TIME_QUANTUM);
        else if (value < vn + span * device.ivl) this.push(device.net, 0, NETLIST_TIME_QUANTUM);
        return;
      }
      case 'monostable': {
        const value = v[device.cv]!;
        if (!force && value === state.seen[0]) return;
        state.seen[0] = value;
        // nld_74123_base::cv
        const vcc = v[device.vcc]!;
        if (state.b === 1 && value < device.kp * vcc) {
          this.push(device.rn, 0, device.tCv);
          state.b = 2;
        }
        if (state.b === 2 && value > (1 - device.kp) * vcc) {
          this.push(device.rp, 0, device.tCv);
          this.push(device.q, 0, device.tCv);
          this.push(device.qq, 1, device.tCv);
          state.b = 0;
        }
        return;
      }
      case 'vco': {
        const fc = v[device.fc]!;
        const rng = v[device.rng]!;
        if (!force && fc === state.seen[0] && rng === state.seen[1]) return;
        state.seen[0] = fc;
        state.seen[1] = rng;
        this.vcoInputs(index);
        return;
      }
      default: return;
    }
  }

  private heapPush(time: number, net: number, version: number): void {
    if (this.heapSize === this.heapTime.length) {
      const grow = <T extends Float64Array | Int32Array | Uint32Array>(array: T): T => {
        const next = new (array.constructor as new (length: number) => T)(array.length * 2);
        next.set(array);
        return next;
      };
      this.heapTime = grow(this.heapTime);
      this.heapNet = grow(this.heapNet);
      this.heapVersion = grow(this.heapVersion);
      this.heapSeq = grow(this.heapSeq);
    }
    const seq = this.seq++;
    let at = this.heapSize++;
    const { heapTime, heapNet, heapVersion, heapSeq } = this;
    while (at > 0) {
      const up = (at - 1) >> 1;
      if (heapTime[up]! < time || (heapTime[up] === time && heapSeq[up]! < seq)) break;
      heapTime[at] = heapTime[up]!;
      heapNet[at] = heapNet[up]!;
      heapVersion[at] = heapVersion[up]!;
      heapSeq[at] = heapSeq[up]!;
      at = up;
    }
    heapTime[at] = time;
    heapNet[at] = net;
    heapVersion[at] = version;
    heapSeq[at] = seq;
  }

  private heapPop(): void {
    const { heapTime, heapNet, heapVersion, heapSeq } = this;
    const last = --this.heapSize;
    if (last <= 0) return;
    const time = heapTime[last]!;
    const seq = heapSeq[last]!;
    const net = heapNet[last]!;
    const version = heapVersion[last]!;
    let at = 0;
    for (;;) {
      let child = 2 * at + 1;
      if (child >= last) break;
      if (child + 1 < last && (heapTime[child + 1]! < heapTime[child]! ||
          (heapTime[child + 1] === heapTime[child] && heapSeq[child + 1]! < heapSeq[child]!))) child++;
      if (time < heapTime[child]! || (time === heapTime[child] && seq < heapSeq[child]!)) break;
      heapTime[at] = heapTime[child]!;
      heapNet[at] = heapNet[child]!;
      heapVersion[at] = heapVersion[child]!;
      heapSeq[at] = heapSeq[child]!;
      at = child;
    }
    heapTime[at] = time;
    heapNet[at] = net;
    heapVersion[at] = version;
    heapSeq[at] = seq;
  }

  /** matrix_solver_t::solve at `at`: one backward Euler step since the group's last. */
  private solve(group: number, at: number): number {
    const state = this.groups[group]!;
    const h = at - state.lastStep;
    if (h < NETLIST_QUANTUM) return this.dynamic ? this.dynamic.minStep : this.maxStep;
    state.lastStep = at;
    const v = this.v;
    // backup(): the voltages the step's error estimate differences against.
    if (state.lastV) for (let row = 0; row < state.matrix.size; row++) state.lastV[row] = v[state.matrix.nodes[row]!]!;
    const { gmin, reltol, vntol, nrLoops } = this;
    const matrix = state.matrix;
    const nonlinear = state.diodes.length > 0 || state.bjts.length > 0;
    const loops = nonlinear ? nrLoops : 1;
    const { nodes, x, size } = matrix;
    const capacitors = state.capacitors;
    for (let c = 0; c < capacitors.length; c++) {
      const capacitor = capacitors[c]!;
      if (capacitor.h !== h) {
        capacitor.h = h;
        capacitor.g = capacitor.c / h + gmin;
      }
      capacitor.ieq = capacitor.g * (v[capacitor.a]! - v[capacitor.b]!);
    }
    for (let loop = 0; loop < loops; loop++) {
      this.fill(state);
      if (nonlinear) this.stampNonlinear(state);
      matrix.solve();
      let moved = false;
      for (let row = 0; row < size; row++) {
        const node = nodes[row]!;
        const vnew = x[row]!;
        const vold = v[node]!;
        if (!moved && Math.abs(vnew - vold) > vntol + reltol * Math.max(Math.abs(vnew), Math.abs(vold))) moved = true;
        v[node] = vnew;
      }
      if (!moved) break;
    }
    const frontiers = state.frontiers;
    for (let f = 0; f < frontiers.length; f++) v[frontiers[f]!.to] = v[frontiers[f]!.from]!;
    // Controls read the nets as they now stand: nld_4066's handler, and each
    // gate's a_to_d proxy with its family's thresholds. A change is the
    // switched group's own change_state, at this time.
    for (let index = 0; index < this.switches.length; index++) {
      const s = this.switches[index]!;
      const supply = v[s.vdd]! - v[s.vss]!;
      const control = v[s.ctl]! - v[s.vss]!;
      const closed = control < 0.45 * supply ? false : control > 0.55 * supply ? true : s.closed;
      if (closed !== s.closed) this.changeState(s.group, at, () => { s.closed = closed; });
    }
    for (let index = 0; index < this.gates.length; index++) {
      const gate = this.gates[index]!;
      const supply = v[gate.vdd]! - v[gate.vss]!;
      const input = v[gate.input]! - v[gate.vss]!;
      const drive = gate.drive;
      const next = input > supply * gate.ivh ? 0 : input < supply * gate.ivl ? 1 : drive.state;
      if (next !== drive.state) this.changeState(drive.group, at, () => { drive.state = next; });
    }
    // The logic devices reading this group's nets (matrix_solver_t::update_inputs).
    const watchers = state.watchers;
    if (watchers.length) {
      const time = this.time;
      this.time = at;
      for (let index = 0; index < watchers.length; index++) this.watched(watchers[index]!);
      this.time = time;
    }
    return this.dynamic && state.capacitors.length ? this.nextStep(state, h) : this.maxStep;
  }

  /** matrix_solver_ext_t::compute_next_time_step: the step each net's second difference allows. */
  private nextStep(state: GeneratedNetlistGroupState, h: number): number {
    const { lte, minStep } = this.dynamic!;
    const { nodes, size } = state.matrix;
    const lastV = state.lastV!;
    const hPrev = state.hPrev!;
    const ddPrev = state.ddPrev!;
    const v = this.v;
    let best = this.maxStep * this.maxStep;
    for (let row = 0; row < size; row++) {
      const dd = Math.max(-NETLIST_TIMESTEP_MAXDIFF, Math.min(NETLIST_TIMESTEP_MAXDIFF, v[nodes[row]!]! - lastV[row]!));
      const dd2 = (dd / h - ddPrev[row]! / hPrev[row]!) / (h + hPrev[row]!);
      hPrev[row] = h;
      ddPrev[row] = dd;
      if (Math.abs(dd2) > NETLIST_TIMESTEP_MINDIV) best = Math.min(best, lte / Math.abs(0.5 * dd2));
    }
    return Math.max(Math.sqrt(best), minStep, NETLIST_TIME_QUANTUM * 2);
  }

  // set_G_V_I(g, 0, i), the rail's side of g moving to the right.
  private stamp(a: Float64Array, rhs: Float64Array, t: GeneratedNetlistTwoTerminal, g: number, i: number): void {
    const v = this.v;
    if (t.la >= 0) {
      a[t.aa]! += g;
      if (t.lb >= 0) a[t.ab]! -= g;
      else rhs[t.la]! += g * v[t.b]!;
      rhs[t.la]! -= i;
    }
    if (t.lb >= 0) {
      a[t.bb]! += g;
      if (t.la >= 0) a[t.ba]! -= g;
      else rhs[t.lb]! += g * v[t.a]!;
      rhs[t.lb]! += i;
    }
  }

  private fill(state: GeneratedNetlistGroupState): void {
    const { matrix, railTerms, capacitors, streams, switches, drives } = state;
    const a = matrix.a;
    const rhs = matrix.rhs;
    const v = this.v;
    a.set(matrix.base);
    rhs.fill(0);
    for (let index = 0; index < railTerms.length; index++) {
      const term = railTerms[index]!;
      rhs[term.row]! += term.coef * v[term.node]!;
    }
    // time_step fixed each capacitor's G and Ieq for this step.
    for (let index = 0; index < capacitors.length; index++) {
      const c = capacitors[index]!;
      this.stamp(a, rhs, c, c.g, -c.ieq);
    }
    for (let index = 0; index < streams.length; index++) {
      const stream = streams[index]!;
      this.stamp(a, rhs, stream, this.inputG[stream.input]!, 0);
    }
    for (let index = 0; index < switches.length; index++) {
      const s = switches[index]!;
      const g = s.closed ? (v[s.vdd]! - v[s.vss]!) / (s.baseR * 5) : this.gmin;
      this.stamp(a, rhs, s, g, 0);
    }
    for (let index = 0; index < state.dsws.length; index++) {
      const dsw = state.dsws[index]!;
      // R_base::set_R
      this.stamp(a, rhs, dsw, 1 / Math.max(dsw.state ? dsw.ron : dsw.roff, this.gmin), 0);
    }
    for (let index = 0; index < state.currents.length; index++) {
      const source = state.currents[index]!;
      // set_mat(0, 0, -I, 0, 0, I)
      this.stamp(a, rhs, source, 0, source.i);
    }
    for (let index = 0; index < state.dacs.length; index++) {
      const dac = state.dacs[index]!;
      // set_G_V_I(1/R, VIN / 2^N * VAL, 0)
      const volts = dac.vin / 2 ** dac.bits * dac.value;
      this.stamp(a, rhs, dac, dac.g, -dac.g * volts);
    }
    for (let index = 0; index < drives.length; index++) {
      const d = drives[index]!;
      // set_G_V_I(G, V, 0) on RN and RP: whichever is off is G_OFF.
      const gn = d.state ? this.gmin : 1 / d.rLow;
      const gp = d.state ? 1 / d.rHigh : this.gmin;
      this.stamp(a, rhs, d.rn, gn, d.state ? 0 : -gn * d.vLow);
      this.stamp(a, rhs, d.rp, gp, d.state ? -gp * d.vHigh : 0);
    }
  }

  private stampNonlinear(state: GeneratedNetlistGroupState): void {
    const a = state.matrix.a;
    const rhs = state.matrix.rhs;
    const v = this.v;
    const { diodes, bjts } = state;
    for (let index = 0; index < diodes.length; index++) {
      const d = diodes[index]!;
      d.diode.update(v[d.a]! - v[d.b]!);
      // set_mat(G, -G, -I, -G, G, I) with I = Id - Vd G
      this.stamp(a, rhs, d, d.diode.g, d.diode.id - d.diode.vd * d.diode.g);
    }
    for (let index = 0; index < bjts.length; index++) {
      // nld_QBJT_EB::update_terminals ("Circuit Design", page 174)
      const q = bjts[index]!;
      const { nodes, rows, cells, polarity, be, bc } = q;
      const ve = v[nodes[0]!]!;
      const vc = v[nodes[1]!]!;
      const vb = v[nodes[2]!]!;
      be.update((vb - ve) * polarity);
      bc.update((vb - vc) * polarity);
      const gee = be.g;
      const gcc = bc.g;
      const gec = q.alphaR * gcc;
      const gce = q.alphaF * gee;
      const ie = (-be.id + q.alphaR * bc.id + gee * be.vd - gec * bc.vd) * polarity;
      const ic = (q.alphaF * be.id - bc.id - gce * be.vd + gcc * bc.vd) * polarity;
      const m0 = gee; const m1 = -gec; const m2 = gec - gee;
      const m3 = -gce; const m4 = gcc; const m5 = gce - gcc;
      const m6 = gce - gee; const m7 = gec - gcc; const m8 = gcc + gee - gce - gec;
      const r0 = -ie; const r1 = -ic; const r2 = ie + ic;
      for (let row = 0; row < 3; row++) {
        const local = rows[row]!;
        if (local < 0) continue;
        let sum = row === 0 ? r0 : row === 1 ? r1 : r2;
        for (let column = 0; column < 3; column++) {
          const place = row * 3 + column;
          const value = place === 0 ? m0 : place === 1 ? m1 : place === 2 ? m2 : place === 3 ? m3 : place === 4 ? m4 : place === 5 ? m5 : place === 6 ? m6 : place === 7 ? m7 : m8;
          const cell = cells[place]!;
          if (cell >= 0) a[cell]! += value;
          else sum -= value * v[nodes[column]!]!;
        }
        rhs[local]! += sum;
      }
    }
  }
}
