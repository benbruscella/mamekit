import assert from 'node:assert/strict';
import { compileNetlist } from './netlist-compiler.ts';
import { GeneratedNetlistSolver } from '../hardware/speaker/netlist-solver.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';

const base = { gmin: 1e-9, reltol: 1e-3, vntol: 1e-7, nrLoops: 250, frontiers: [], inputs: [], logicInputs: [] };
const close = (actual: number, expected: number, within: number, what: string): void =>
  assert.ok(Math.abs(actual - expected) <= within, `${what}: ${actual}, expected ${expected}`);

// A divider: 5 V through two equal resistors reads half.
{
  const solver = new GeneratedNetlistSolver({
    ...base,
    nodes: 3,
    rails: [{ node: 0, volts: 5 }, { node: 1, volts: 0 }],
    groups: [[2]],
    elements: [{ kind: 'r', a: 0, b: 2, g: 1e-3 }, { kind: 'r', a: 2, b: 1, g: 1e-3 }],
    output: { node: 2, mult: 1, offset: 0 },
  }, 48000);
  close(solver.step([]), 2.5, 1e-9, 'divider');
}

// An RC charging by backward Euler, as generic_capacitor_const steps it: its G
// holds the gmin too, which only shows far below this capacitor's C/h.
{
  const rate = 48000;
  const r = 1000;
  const c = 1e-6;
  const solver = new GeneratedNetlistSolver({
    ...base,
    nodes: 3,
    rails: [{ node: 0, volts: 5 }, { node: 1, volts: 0 }],
    groups: [[2]],
    elements: [{ kind: 'r', a: 0, b: 2, g: 1 / r }, { kind: 'c', a: 2, b: 1, c }],
    output: { node: 2, mult: 1, offset: 0 },
  }, rate);
  const stepsTo = 20;
  let last = 0;
  for (let step = 0; step < stepsTo; step++) last = solver.step([]);
  const keep = (c * rate) / (c * rate + 1 / r);
  close(last, 5 * (1 - keep ** stepsTo), 1e-3, 'RC step');
}

// A diode into a resistor sits at its forward drop: Newton has to converge.
{
  const solver = new GeneratedNetlistSolver({
    ...base,
    nodes: 3,
    rails: [{ node: 0, volts: 5 }, { node: 1, volts: 0 }],
    groups: [[2]],
    elements: [{ kind: 'r', a: 0, b: 2, g: 1e-3 }, { kind: 'd', a: 2, k: 1, is: 1e-15, n: 1 }],
    output: { node: 2, mult: 1, offset: 0 },
  }, 48000);
  let last = 0;
  for (let step = 0; step < 4; step++) last = solver.step([]);
  // Id = (5 - Vd) / 1k, Vd = VT ln(Id / Is).
  close(last, 0.0258520 * Math.log((5 - last) / 1000 / 1e-15), 1e-3, 'diode drop');
  assert.ok(last > 0.6 && last < 0.8, `diode drop ${last}`);
}

// A resistor a stream drives moves the divider as the stream does.
{
  const solver = new GeneratedNetlistSolver({
    ...base,
    nodes: 3,
    rails: [{ node: 0, volts: 5 }, { node: 1, volts: 0 }],
    groups: [[2]],
    elements: [{ kind: 'streamR', a: 0, b: 2, g: 1e-3, input: 0 }, { kind: 'r', a: 2, b: 1, g: 1e-3 }],
    inputs: [{ channel: 3, kind: 'resistor', element: 0, mult: 1, offset: 0 }],
    output: { node: 2, mult: 1, offset: 0 },
  }, 48000);
  close(solver.step([0, 0, 0, 1000]), 2.5, 1e-9, 'stream resistor, equal');
  close(solver.step([0, 0, 0, 4000]), 1, 1e-9, 'stream resistor, larger');
}

// Every netlist the shelf's boards use compiles from MAME's source, and the
// rails cut them into small groups, which is what keeps them real time.
const inputs = (names: readonly string[]) => names.map((param, channel) => ({ channel, param, mult: 1, offset: 0 }));
const konami = compileNetlist(mameSrc, 'src/mame/galaxian/nl_konami.cpp', {
  source: 'konami1x',
  streamInputs: inputs(['R_AY3D_A.R', 'R_AY3D_B.R', 'R_AY3D_C.R']),
  output: { node: 'OUT', mult: 20, offset: 0 },
  logicInputs: [0, 1, 2, 3, 4, 5].map(line => ({ tag: `konami:ctl${line}`, param: `CTL${line}.IN`, value: 0 })),
});
assert.deepEqual(konami.logicInputs, ['CTL0.IN', 'CTL1.IN', 'CTL2.IN', 'CTL3.IN', 'CTL4.IN', 'CTL5.IN']);
assert.equal(konami.elements.filter(element => element.kind === 'switch').length, 6);
assert.equal(konami.elements.filter(element => element.kind === 'streamR').length, 3);
const largest = (plan: { groups: number[][] }): number => Math.max(...plan.groups.map(group => group.length));
assert.ok(largest(konami) < 20, `konami1x's largest group has ${largest(konami)} nodes`);

// The driver's filter lines reach the circuit: closing the 0.22uF cap on one
// channel takes the top off a tone, in that channel only.
const span = (logic: number[]): number => {
  const solver = new GeneratedNetlistSolver(konami, 48000);
  for (const line of logic) solver.writeLogic(line, 1);
  let low = Infinity;
  let high = -Infinity;
  for (let sample = 0; sample < 12000; sample++) {
    const value = solver.step([sample % 8 < 4 ? 8000 : 80000, 1e6, 1e6]);
    if (sample > 6000) {
      low = Math.min(low, value);
      high = Math.max(high, value);
    }
  }
  return high - low;
};
const open = span([]);
const filtered = span([0]);
assert.ok(filtered < open / 2, `the filter should cut a 6 kHz tone: ${filtered} against ${open}`);
assert.ok(Math.abs(span([2]) - open) < open / 20, 'another channel\'s filter hardly touches this tone');

const kidniki = compileNetlist(mameSrc, 'src/mame/irem/nl_kidniki.cpp', {
  source: 'kidniki',
  streamInputs: inputs(['R_AY45M_A.R', 'R_AY45M_B.R', 'R_AY45M_C.R', 'R_AY45L_A.R', 'R_AY45L_B.R', 'R_AY45L_C.R']),
  output: { node: 'R26.1', mult: 30000 * 10 / 32768, offset: 0 },
  logicInputs: [],
});
assert.equal(kidniki.frontiers.length, 7, 'OPTIMIZE_FRONTIER splits the matrix where MAME splits it');
assert.equal(kidniki.elements.filter(element => element.kind === 'q').length, 7);
assert.equal(kidniki.elements.filter(element => element.kind === 'gate').length, 6);

for (const [file, source, node, names] of [
  ['src/mame/capcom/nl_1942.cpp', '1942', 'R1.1', ['R_AY1_1.R']],
  ['src/mame/nintendo/nl_popeye.cpp', 'popeye', 'ROUT.1', ['R_AY1_1.R']],
] as const) {
  const plan = compileNetlist(mameSrc, file, { source, streamInputs: inputs(names), output: { node, mult: 1, offset: 0 }, logicInputs: [] });
  assert.ok(plan.elements.length > 0, source);
}

// Logic nets run on MAME's event queue: an inverter between a logic input
// and an RC delivers its change after the truth table's delay, and a push
// replaced before it lands never lands (net_t::push_to_queue).
{
  const plan = {
    ...base,
    nodes: 3,
    rails: [{ node: 0, volts: 5 }, { node: 1, volts: 0 }],
    groups: [[2]],
    elements: [
      { kind: 'logic' as const, output: 2, vcc: 0, gnd: 1, net: 1, state: 0, rLow: 1, rHigh: 130, vLow: 0.1, vHigh: 1 },
      { kind: 'r' as const, a: 2, b: 1, g: 1e-3 },
    ],
    logicInputs: ['IN.IN'],
    logicNets: 2,
    logic: [
      { kind: 'source' as const, net: 0, state: 1, delay: 1e-9, param: 'IN.IN' },
      { kind: 'table' as const, inputs: [0], outputs: [1], table: [1, 0], delays: [22e-9, 15e-9] },
    ],
    output: { node: 2, mult: 1, offset: 0 },
  };
  const solver = new GeneratedNetlistSolver(plan, 48000);
  close(solver.read(1e-3), 0.1 * 1000 / 1001, 1e-6, 'input high: the inverter drives low, OVL behind ORL');
  solver.writeLogic(0, 0, 1e-3);
  assert.ok(solver.read(1e-3 + 10e-9) < 1, 'not before the truth table\'s 22 ns');
  assert.ok(solver.read(1e-3 + 40e-9) > 3, `low input: the inverter drives high after 22 ns (${solver.read(1e-3 + 40e-9)})`);
  solver.writeLogic(0, 1, 2e-3);
  solver.writeLogic(0, 0, 2e-3 + 0.5e-9);
  assert.ok(solver.read(3e-3) > 3, 'a push replaced before it lands never lands');
}

// Mario's netlist compiles from MAME's source: its TTL is truth tables from
// the macro library, its one-shots, VCOs and counter MAME's own classes, its
// LM3900s a CCCS and a CCVS, and its DAC an R-2R ladder the driver writes.
const mario = compileNetlist(mameSrc, 'src/mame/nintendo/nl_mario.cpp', {
  source: 'mario',
  streamInputs: [],
  output: { node: 'ROUT.1', mult: 1, offset: 0 },
  logicInputs: ['SOUND0', 'SOUND1', 'SOUND7'].map(name => ({ tag: name, param: `${name}.IN`, value: 0 })),
  paramInputs: [{ tag: 'snd_nl:dac', param: 'DAC.VAL' }],
});
const kinds = (list: readonly { kind: string }[]) => list.reduce<Record<string, number>>((count, { kind }) => ({ ...count, [kind]: (count[kind] ?? 0) + 1 }), {});
assert.deepEqual(kinds(mario.logic ?? []), { source: 5, threshold: 1, monostable: 3, table: 10, vco: 6, counter: 1 });
assert.equal(kinds(mario.elements).logic, 7, 'every TTL output into an analog net has its d_to_a proxy');
assert.equal(kinds(mario.elements).dsw, 6, 'each 74123 switches its RC through two SYS_DSWs');
assert.deepEqual(mario.paramInputs, ['DAC.VAL']);
assert.deepEqual(mario.dynamic, { lte: 5e-2, minStep: 1e-6 }, 'Solver.DYNAMIC_TS with its DYNAMIC_LTE');
assert.equal(largest(mario), 18, 'the DAC and its LM3900s are the 18-net matrix nltool reports');

// A walk write (SOUND1 low, then high) fires its one-shot: the VCO pair plays
// for its pulse, then the netlist falls quiet again.
{
  const solver = new GeneratedNetlistSolver(mario, 48000);
  const level = (from: number, to: number): number => {
    let sum = 0; let squares = 0; let count = 0;
    for (let at = from; at < to; at += 1 / 48000) { const value = solver.read(at); sum += value; squares += value * value; count++; }
    return Math.sqrt(squares / count - (sum / count) ** 2);
  };
  assert.ok(level(0.45, 0.5) < 1e-3, 'quiet once the power-on pulse has decayed');
  solver.writeLogic(1, 0, 0.5);
  solver.writeLogic(1, 1, 0.5001);
  assert.ok(level(0.5001, 0.55) > 0.05, 'the walk sound plays');
  assert.ok(level(0.9, 0.95) < 1e-3, 'and stops');
}

// A device the compiler does not have still stops the compile: the board stays
// visibly unlowered rather than playing an approximation (an NE555 here).
assert.throws(
  () => compileNetlist(mameSrc, 'src/mame/misc/nl_gi6809.cpp', {
    source: 'gi6809',
    streamInputs: [],
    output: { node: 'ROUT.1', mult: 1, offset: 0 },
    logicInputs: [],
  }),
  /unsupported .*NE555/,
);

console.log('netlist-compiler.spec: stamps, logic nets, filter lines, the shelf\'s netlists and the refusal hold');
