#!/usr/bin/env node
/**
 * Every compiled netlist against MAME's own netlist engine.
 *
 *   node tools/netlist-reference.ts [<netlist> ...] [--mame-src dir] [--dist dir]
 *                                   [--seconds N] [--limit dB]
 *
 * Builds nltool from the MAME checkout's src/lib/netlist (once per checkout
 * revision, under .cache/nltool), then, for each NETLIST_SOUND a generated
 * machine in dist carries, drives MAME's netlist and ours with the same events
 * and compares what each puts on its output node:
 *
 *   * each resistor input gets an AY-like stream at a chip's own rate, noise,
 *     a square and silence in turn, between an on and an off resistance;
 *   * each voltage input gets an MSM5205-like staircase at 8 kHz;
 *   * each logic input toggles every quarter second.
 *
 * Ours runs as the worklet runs it (GeneratedNetlistSolver.set at each event's
 * time, read at 48 kHz), so this checks the scheduling the browser uses, not a
 * test-only path. A netlist fails when its level or any third-octave band from
 * 50 Hz to 16 kHz that carries MAME's sound is further off than --limit dB.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { cpus } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { GeneratedNetlistPlan } from '../src/mame/netlist-compiler.ts';
import { GeneratedNetlistSolver } from '../src/hardware/speaker/netlist-solver.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const named = args.filter((arg, index) => !arg.startsWith('--') && !args[index - 1]?.startsWith('--'));
const mameSrc = resolve(option('--mame-src') ?? process.env.MAME_SRC ?? join(projectRoot, '../mame'));
const dist = resolve(option('--dist') ?? join(projectRoot, 'dist'));
const seconds = Number(option('--seconds') ?? 2);
const limit = Number(option('--limit') ?? 1.5);
const rate = 48_000;
/** An AY8910 at 3.579545 MHz / 4, sampling at clock / 8: the shelf's fastest resistor stream. */
const nativeRate = 3_579_545 / 4 / 8;

function buildNltool(): string {
  const revision = execFileSync('git', ['-C', mameSrc, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
  const root = join(projectRoot, '.cache/nltool', revision);
  const build = join(root, 'src/lib/netlist/build');
  const binary = join(build, 'nltool');
  if (existsSync(binary)) return binary;
  rmSync(root, { recursive: true, force: true });
  mkdirSync(join(root, 'src/lib'), { recursive: true });
  cpSync(join(mameSrc, 'src/lib/netlist'), join(root, 'src/lib/netlist'), { recursive: true });
  console.log(`building nltool from ${mameSrc} (${revision})`);
  for (const target of ['maketree', 'nltool']) {
    const made = spawnSync('make', [`-j${cpus().length}`, 'PYTHON=python3', target], { cwd: build, encoding: 'utf8' });
    if (made.status !== 0) throw new Error(`nltool ${target} failed:\n${(made.stderr || made.stdout).slice(-2000)}`);
  }
  return binary;
}

/** Every distinct compiled netlist dist ships, by name. */
function shippedNetlists(): Map<string, { plan: GeneratedNetlistPlan; machines: string[] }> {
  const found = new Map<string, { plan: GeneratedNetlistPlan; machines: string[] }>();
  const games = join(dist, 'games');
  for (const system of existsSync(games) ? readdirSync(games) : []) {
    for (const machine of readdirSync(join(games, system))) {
      const file = join(games, system, machine, 'config.json');
      if (!existsSync(file)) continue;
      const plan = (JSON.parse(readFileSync(file, 'utf8')) as { sound?: { netlist?: GeneratedNetlistPlan } }).sound?.netlist;
      if (!plan) continue;
      const key = `${plan.source.netlist}:${plan.inputs.map(input => input.param).join(',')}`;
      const entry = found.get(key) ?? { plan, machines: [] };
      entry.machines.push(machine);
      found.set(key, entry);
    }
  }
  return found;
}

interface NetlistEvent { at: number; kind: 'stream' | 'logic'; channel: number; sample: number }

/** The same events for both sides, in time order; a deterministic generator so runs repeat. */
function stimulus(plan: GeneratedNetlistPlan): NetlistEvent[] {
  let seed = 0x2345_6789;
  const random = (): number => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 0x1_0000_0000;
  };
  const events: NetlistEvent[] = [];
  const channels = [...new Set(plan.inputs.map(input => input.channel))];
  for (const [order, channel] of channels.entries()) {
    const input = plan.inputs.find(candidate => candidate.channel === channel)!;
    if (input.kind === 'resistor') {
      // ay8910's build_mosfet_resistor_table spans roughly a few kilohms on to
      // hundreds of megohms off; the stream carries resistances / mult.
      const on = (2_000 + 18_000 * random()) / input.mult;
      const off = 5e8 / input.mult;
      const segment = Math.floor(nativeRate * seconds / 4);
      const period = 4 + order * 3;
      let last = NaN;
      for (let index = 0; index < nativeRate * seconds; index++) {
        const part = Math.floor(index / segment) % 4;
        const value = part === 0 ? (random() < 0.5 ? on : off)
          : part === 1 ? (Math.floor(index / period) % 2 ? on : off)
            : part === 2 ? off
              : (random() < 0.5 ? on * 3 : off);
        if (value !== last) events.push({ at: index / nativeRate, kind: 'stream', channel, sample: value });
        last = value;
      }
    } else {
      for (let index = 0; index < 8_000 * seconds; index++) {
        events.push({ at: index / 8_000, kind: 'stream', channel, sample: random() - 0.5 });
      }
    }
  }
  plan.logicInputs.forEach((_, index) => {
    for (let at = 0.1 + index * 0.03, value = 1; at < seconds; at += 0.25, value ^= 1) {
      events.push({ at, kind: 'logic', channel: index, sample: value });
    }
  });
  return events.sort((a, b) => a.at - b.at);
}

function runMame(nltool: string, plan: GeneratedNetlistPlan, events: NetlistEvent[], dir: string): Float64Array {
  const lines = events.flatMap(event => {
    if (event.kind === 'logic') return [`${event.at.toFixed(12)},${plan.logicInputs[event.channel]},${event.sample}`];
    return plan.inputs.filter(input => input.channel === event.channel)
      .map(input => `${event.at.toFixed(12)},${input.param},${event.sample * input.mult + input.offset}`);
  });
  writeFileSync(join(dir, 'input.csv'), `${lines.join('\n')}\n`);
  const ran = spawnSync(nltool, [
    '-c', 'run', '-q', '-n', plan.source.netlist, '-t', String(seconds), '-i', 'input.csv', '-l', plan.output.name,
    join(mameSrc, plan.source.file),
  ], { cwd: dir, encoding: 'utf8' });
  if (ran.status !== 0) throw new Error(`nltool failed on ${plan.source.netlist}:\n${(ran.stderr || ran.stdout).slice(-2000)}`);
  // Each line is a time and the node's value from then on; read it at each output sample's time.
  const log = readFileSync(join(dir, `log_${plan.output.name}.log`), 'utf8').trim().split('\n')
    .map(line => line.trim().split(/\s+/).map(Number) as [number, number]);
  const out = new Float64Array(Math.floor(seconds * rate));
  let at = 0;
  for (let index = 0; index < out.length; index++) {
    const time = (index + 1) / rate;
    while (at + 1 < log.length && log[at + 1]![0] <= time) at++;
    out[index] = log[at]![1] * plan.output.mult + plan.output.offset;
  }
  return out;
}

function runOurs(plan: GeneratedNetlistPlan, events: NetlistEvent[]): Float64Array {
  const solver = new GeneratedNetlistSolver(plan, rate);
  const out = new Float64Array(Math.floor(seconds * rate));
  let next = 0;
  for (let index = 0; index < out.length; index++) {
    const time = (index + 1) / rate;
    for (; next < events.length && events[next]!.at <= time; next++) {
      const event = events[next]!;
      if (event.kind === 'logic') solver.writeLogic(event.channel, event.sample, event.at);
      else solver.set(event.channel, event.sample, event.at);
    }
    out[index] = solver.read(time);
  }
  return out;
}

/** Third-octave band energies from 50 Hz up, Hann-windowed 4096-point frames. */
function bands(signal: Float64Array): { lo: number; energy: number }[] {
  const size = 4096;
  const mean = signal.reduce((sum, value) => sum + value, 0) / signal.length;
  const power = new Float64Array(size / 2 + 1);
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  for (let start = 0; start + size <= signal.length; start += size / 2) {
    for (let index = 0; index < size; index++) {
      re[index] = (signal[start + index]! - mean) * (0.5 - 0.5 * Math.cos(2 * Math.PI * index / size));
      im[index] = 0;
    }
    for (let i = 1, j = 0; i < size; i++) {
      let bit = size >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { [re[i], re[j]] = [re[j]!, re[i]!]; [im[i], im[j]] = [im[j]!, im[i]!]; }
    }
    for (let length = 2; length <= size; length <<= 1) {
      const angle = -2 * Math.PI / length;
      for (let i = 0; i < size; i += length) {
        for (let k = 0; k < length / 2; k++) {
          const wr = Math.cos(angle * k), wi = Math.sin(angle * k);
          const a = i + k, b = a + length / 2;
          const tr = re[b]! * wr - im[b]! * wi, ti = re[b]! * wi + im[b]! * wr;
          re[b] = re[a]! - tr; im[b] = im[a]! - ti; re[a] = re[a]! + tr; im[a] = im[a]! + ti;
        }
      }
    }
    for (let bin = 0; bin <= size / 2; bin++) power[bin] = power[bin]! + re[bin]! ** 2 + im[bin]! ** 2;
  }
  const result: { lo: number; energy: number }[] = [];
  for (let lo = 50; lo * 2 ** (1 / 3) <= 16_000; lo *= 2 ** (1 / 3)) {
    let energy = 0;
    for (let bin = 0; bin <= size / 2; bin++) {
      const hz = bin * rate / size;
      if (hz >= lo && hz < lo * 2 ** (1 / 3)) energy += power[bin]!;
    }
    result.push({ lo, energy });
  }
  return result;
}

const rms = (signal: Float64Array): number => {
  const mean = signal.reduce((sum, value) => sum + value, 0) / signal.length;
  return Math.sqrt(signal.reduce((sum, value) => sum + (value - mean) ** 2, 0) / signal.length);
};

const nltool = buildNltool();
const netlists = shippedNetlists();
if (!netlists.size) throw new Error(`no compiled netlist in ${dist}: generate first`);
let failed = 0;
for (const { plan, machines } of netlists.values()) {
  if (named.length && !named.includes(plan.source.netlist) && !machines.some(machine => named.includes(machine))) continue;
  const dir = join(projectRoot, '.cache/netlist-reference', `${plan.source.netlist}-${machines[0]}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const events = stimulus(plan);
  const skip = Math.floor(rate / 4);
  const mame = runMame(nltool, plan, events, dir).subarray(skip);
  const ours = runOurs(plan, events).subarray(skip);
  const level = 20 * Math.log10(rms(ours) / rms(mame));
  const theirs = bands(mame);
  const mine = bands(ours);
  const loudest = Math.max(...theirs.map(band => band.energy));
  const rows = theirs.map((band, index) => ({
    lo: band.lo,
    db: 10 * Math.log10(mine[index]!.energy / band.energy),
    // A band 60 dB under MAME's loudest carries nothing to judge.
    judged: band.energy > loudest * 1e-6,
  }));
  const worst = rows.filter(row => row.judged).reduce((most, row) => Math.abs(row.db) > Math.abs(most.db) ? row : most, rows[0]!);
  const ok = Math.abs(level) <= 0.5 && rows.every(row => !row.judged || Math.abs(row.db) <= limit);
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${plan.source.netlist} (${machines.join(', ')}): level ${level >= 0 ? '+' : ''}${level.toFixed(2)} dB, ` +
    `worst band ${Math.round(worst.lo)} Hz ${worst.db >= 0 ? '+' : ''}${worst.db.toFixed(2)} dB`);
  console.log(`  ${rows.filter((_, index) => index % 3 === 0).map(row => `${Math.round(row.lo)}:${row.judged ? row.db.toFixed(1) : '-'}`).join(' ')}`);
}
if (failed) {
  console.error(`${failed} netlist(s) further than ${limit} dB from MAME's`);
  process.exitCode = 1;
}
