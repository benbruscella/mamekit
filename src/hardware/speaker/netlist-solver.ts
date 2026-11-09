// MAME's netlist solver as the stream mix runs it: one sparse LU per group,
// each group on its own clock as MAME's matrix solvers are, backward Euler,
// and Newton-Raphson only for the groups a diode or BJT is in. It runs a
// compiled plan (src/ir/netlist-plan.ts) and models no circuit of its own.

import type { GeneratedNetlistElementData, GeneratedNetlistPlanData } from '../../ir/netlist-plan.ts';

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
    case 'r': case 'streamR': case 'c': case 'switch': return [element.a, element.b];
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

  constructor(plan: GeneratedNetlistPlanData, rate: number) {
    this.rate = rate;
    this.maxStep = 1 / (plan.frequency ?? 48000);
    this.inputs = plan.inputs;
    this.output = plan.output;
    this.gmin = plan.gmin;
    this.reltol = plan.reltol;
    this.vntol = plan.vntol;
    this.nrLoops = plan.nrLoops;
    this.v = new Float64Array(plan.nodes);
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
          const gfac = element.ro !== undefined ? 1 / element.ro : 1;
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
          break;
        }
        case 'gate':
          this.gates.push({ input: element.input, vdd: element.vdd, vss: element.vss, ivl: element.ivl, ivh: element.ivh, drive: drive(element, state, element.vdd, element.vss) });
          break;
      }
    }
  }

  /** A `NETLIST_LOGIC_INPUT`'s value (`m_filter_ctl[n]->write(bit)`), from `at` seconds. */
  writeLogic(index: number, value: number, at = this.now): void {
    const entry = this.logics[index];
    const state = value ? 1 : 0;
    if (!entry || entry.state === state) return;
    this.advance(at);
    this.changeState(entry.group, at, () => { entry.state = state; });
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

  /** Each group's time-stepped solves due by `at`, earliest first (the solver queue). */
  private advance(at: number): void {
    const groups = this.groups;
    for (;;) {
      let due = -1;
      for (let index = 0; index < groups.length; index++) {
        if (groups[index]!.next <= at + NETLIST_QUANTUM && (due < 0 || groups[index]!.next < groups[due]!.next)) due = index;
      }
      if (due < 0) return;
      // Rescheduled before solving: a switch the solve flips may bring its own
      // group back sooner (change_state).
      const state = groups[due]!;
      const time = state.next;
      state.next = time + this.maxStep;
      this.solve(due, time);
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

  /** matrix_solver_t::solve at `at`: one backward Euler step since the group's last. */
  private solve(group: number, at: number): void {
    const state = this.groups[group]!;
    const h = at - state.lastStep;
    if (h < NETLIST_QUANTUM) return;
    state.lastStep = at;
    const v = this.v;
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
