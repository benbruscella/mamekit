// The plan a compiled NETLIST_SOUND runs: its nodes, rails, element stamps and
// solver groups, as src/mame/netlist-compiler.ts lowers them from MAME's
// netlist setup language, and its logic nets with the devices that drive and
// read them. Data only; hardware/speaker/netlist-solver.ts runs it.

export type GeneratedNetlistElementData =
  | { kind: 'r'; a: number; b: number; g: number }
  | { kind: 'streamR'; a: number; b: number; g: number; input: number }
  | { kind: 'c'; a: number; b: number; c: number }
  | { kind: 'd'; a: number; k: number; is: number; n: number }
  | { kind: 'q'; b: number; c: number; e: number; polarity: number; is: number; bf: number; nf: number; br: number; nr: number }
  /** VCCS; with `ro` a VCVS or CCVS; `gfac` overrides the gain factor (a CCCS's -1/RI). */
  | { kind: 'vccs'; ip: number; in: number; op: number; on: number; g: number; ri: number; ro?: number; gfac?: number }
  | { kind: 'switch'; a: number; b: number; ctl: number; vdd: number; vss: number; baseR: number }
  /**
   * A logic output into an analog net (nld_d_to_a_proxy): a `NETLIST_LOGIC_INPUT`
   * through `param`, or the logic net `net` it follows.
   */
  | { kind: 'logic'; output: number; vcc: number; gnd: number; param?: string; net?: number; state: number; rLow: number; rHigh: number; vLow: number; vHigh: number }
  | { kind: 'gate'; input: number; output: number; vdd: number; vss: number; state: number; ivl: number; ivh: number; rLow: number; rHigh: number; vLow: number; vHigh: number }
  /** A resistor a logic net switches between RON and ROFF (nld_sys_dsw1). */
  | { kind: 'dsw'; a: number; b: number; net: number; ron: number; roff: number }
  /** A constant current source from `a` to `b` (nld_CS). */
  | { kind: 'cs'; a: number; b: number; i: number }
  /** An R-2R DAC as its Thevenin source: VIN / 2^bits * value behind 1/g (nld_r2r_dac). */
  | { kind: 'dac'; a: number; b: number; g: number; vin: number; bits: number; value: number; param?: string };

/**
 * A device on the logic nets. Each runs as its MAME class's handlers do: on a
 * change of a logic input it reads, or after a solve moves an analog input,
 * pushing values onto nets after a delay (logic_output_t::push).
 */
export type GeneratedNetlistLogicData =
  /** TTL_INPUT / LOGIC_INPUT on a logic net; `param` when a driver writes it. */
  | { kind: 'source'; net: number; state: number; delay: number; param?: string }
  /** A TRUTH_TABLE: output bits and per-output delays for each input combination. */
  | { kind: 'table'; inputs: number[]; outputs: number[]; table: number[]; delays: number[] }
  /** nld_a_to_d_proxy: an analog node read against its family's thresholds of `vn`..`vp`. */
  | { kind: 'threshold'; node: number; vp: number; vn: number; ivl: number; ivh: number; net: number }
  /** A 74123-family one-shot: `rp`/`rn` switch its RC, `cv` is the capacitor node. */
  | {
      kind: 'monostable'; inputs: number[]; q: number; qq: number; rp: number; rn: number; cv: number; vcc: number;
      kp: number; trigger: number[]; clear: number[]; tAB: number; tC: number; tCv: number;
    }
  /** A 74LS629 VCO: half a period of the polynomial's frequency between toggles of `y`. */
  | { kind: 'vco'; fc: number; rng: number; enq: number; y: number; terms: { k: number; f: number; r: number }[]; scale: number }
  /** A CD4020-family ripple counter, counting falling edges of `ip`; -1 where a stage is not brought out. */
  | { kind: 'counter'; ip: number; reset: number; outputs: number[]; delays: number[]; resetDelay: number };

export interface GeneratedNetlistPlanData {
  nodes: number;
  rails: { node: number; volts: number }[];
  groups: number[][];
  elements: GeneratedNetlistElementData[];
  frontiers: { from: number; to: number }[];
  gmin: number;
  reltol: number;
  vntol: number;
  nrLoops: number;
  frequency?: number;
  /** `Solver.DYNAMIC_TS`: each group's next step from its nets' local truncation error. */
  dynamic?: { lte: number; minStep: number };
  inputs: { channel: number; kind: 'resistor' | 'volts'; element?: number; node?: number; mult: number; offset: number }[];
  logicInputs: string[];
  /** `NETLIST_INT_INPUT` parameters, in the order the board names them. */
  paramInputs?: string[];
  logicNets?: number;
  logic?: GeneratedNetlistLogicData[];
  output: { node: number; mult: number; offset: number };
}
