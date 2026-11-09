// The plan a compiled NETLIST_SOUND runs: its nodes, rails, element stamps and
// solver groups, as src/mame/netlist-compiler.ts lowers them from MAME's
// netlist setup language. Data only; hardware/speaker/netlist-solver.ts runs it.

export type GeneratedNetlistElementData =
  | { kind: 'r'; a: number; b: number; g: number }
  | { kind: 'streamR'; a: number; b: number; g: number; input: number }
  | { kind: 'c'; a: number; b: number; c: number }
  | { kind: 'd'; a: number; k: number; is: number; n: number }
  | { kind: 'q'; b: number; c: number; e: number; polarity: number; is: number; bf: number; nf: number; br: number; nr: number }
  | { kind: 'vccs'; ip: number; in: number; op: number; on: number; g: number; ri: number; ro?: number }
  | { kind: 'switch'; a: number; b: number; ctl: number; vdd: number; vss: number; baseR: number }
  | { kind: 'logic'; output: number; vcc: number; gnd: number; param?: string; state: number; rLow: number; rHigh: number; vLow: number; vHigh: number }
  | { kind: 'gate'; input: number; output: number; vdd: number; vss: number; state: number; ivl: number; ivh: number; rLow: number; rHigh: number; vLow: number; vHigh: number };

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
  inputs: { channel: number; kind: 'resistor' | 'volts'; element?: number; node?: number; mult: number; offset: number }[];
  logicInputs: string[];
  output: { node: number; mult: number; offset: number };
}
