/**
 * Running MAME for the oracle: the command line, the plan its Lua script
 * reads (oracle.lua), and the rules every reference run has to keep.
 *
 *   * Cold and private: a fresh -nvram_directory and -cfg_directory per run.
 *     MAME writes NVRAM back on exit, so a reused directory boots warm the
 *     second time (Metal Slug's BIOS then skipped its RAM test and looked 48
 *     frames "ahead").
 *   * Out of the way: -window -nomaximize under -video none, or MAME takes
 *     over a Mac's screen; nice 10, so it yields to whatever else is running.
 *   * The screen alone: -snapview native, or a machine with layout artwork
 *     (Spy Hunter's lamp row) snapshots the artwork too, 480x500 to our 480x480.
 *   * The same release as the source checkout, or every difference is noise
 *     (src/gen/listxml.ts refuses a mismatch, and so does this).
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listXmlOracle } from '../../src/gen/listxml.ts';
import { samplesDir as samplesRoot } from '../../src/paths.ts';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import type { IoPlan, OraclePlan, OursBoot, Timeline, TimelineEvent } from './plan.ts';

const here = dirname(fileURLToPath(import.meta.url));
export const projectRoot = resolve(here, '../..');
const luaScript = join(here, 'oracle.lua');

export interface Politeness {
  /** Run on the efficiency cores (macOS taskpolicy -b): ~6x slower, never in the way. */
  background: boolean;
  /** Give MAME a real window to watch instead of -video none. */
  watch: boolean;
}

/** The command prefix every process the oracle starts runs under. */
/**
 * Under `-video none` MAME still starts SDL's Cocoa video, which gives each
 * process a window on a Mac and takes the cursor from whoever is at it. SDL's
 * dummy driver never touches the window server, and MAME's results under it
 * are the same: dkong and marble compare `same` on every measure.
 */
export function mameEnvironment(politeness: Politeness): NodeJS.ProcessEnv {
  return politeness.watch ? { ...process.env } : { ...process.env, SDL_VIDEO_DRIVER: 'dummy' };
}

export function politeCommand(command: string, args: string[], politeness: Politeness): [string, string[]] {
  if (politeness.background && process.platform === 'darwin') {
    return ['/usr/sbin/taskpolicy', ['-b', command, ...args]];
  }
  return process.platform === 'win32' ? [command, args] : ['nice', ['-n', '10', command, ...args]];
}

/** The mamekit commit a run is made on; `dirty` when src, tools or bin have local changes. */
export function mamekitIdentity(): { commit: string; dirty: boolean } {
  const commit = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: projectRoot, encoding: 'utf8' }).stdout.trim();
  const dirty = spawnSync('git', ['status', '--porcelain', '--', 'src', 'tools', 'bin'], { cwd: projectRoot, encoding: 'utf8' })
    .stdout.trim().length > 0;
  return { commit, dirty };
}

/** The MAME binary to use, refused unless it is the checkout's release. */
export function resolveMame(mameSrc: string, explicit?: string): { binary: string; version: string } {
  const found = listXmlOracle(mameSrc, explicit);
  if (!found.binary || !found.version) throw new Error(found.reason ?? 'no usable MAME binary');
  return { binary: found.binary, version: found.version };
}

/**
 * Where MAME finds sample sets (Zaxxon's, Space Panic's): the library's own
 * folder, named on the command line as the rompath is, so a run does not
 * depend on one machine's mame.ini. Without a set MAME plays silence where
 * its samples belong.
 */
export const samplesDir = samplesRoot(projectRoot);

/** Where MAME finds a machine's sets and a title's software, for each category. */
export function romPaths(config: ShellConfig, category: string): string[] {
  const roms = join(projectRoot, '.data/roms');
  if (category === 'arcade') return [join(roms, 'arcade')];
  // A software list's sets sit in <dumps>/<list>/<name>.zip, which is where
  // MAME looks for list software on a rompath of <dumps>; firmware is in bios/.
  const dumps = config.software?.dumpsKey ?? `${category}/${config.game}`;
  const family = category === 'consoles' ? join(roms, category) : join(roms, dumps);
  return [family, join(roms, dumps), join(roms, dumps, 'bios')].filter((path, index, all) =>
    all.indexOf(path) === index && existsSync(path));
}

/**
 * MAME's command line for one run. `software` is the title as MAME's
 * `<list>:<name>` (`nes:smb1`, `c64_cass:crazycom`), which mounts it in the
 * slot its list's interface names without our knowing MAME's media switches.
 */
export function mameArguments(
  config: ShellConfig,
  category: string,
  boot: OursBoot,
  software: string | undefined,
  mameSrc: string,
  dir: string,
  politeness: Politeness,
): string[] {
  // Slot options come before the title: a list a card declares (the
  // Interface 2's spectrum_cart) does not exist until the card is fitted.
  return [
    config.game,
    ...Object.entries(boot.slotCards).flatMap(([slot, card]) => [`-${slot}`, card]),
    ...boot.emptySlots.flatMap(slot => [`-${slot}`, '']),
    ...(software ? [...boot.media ? [`-${boot.media}`] : [], software] : []),
    '-rompath', romPaths(config, category).join(';'),
    '-samplepath', samplesDir,
    '-hashpath', join(mameSrc, 'hash'),
    ...(politeness.watch ? ['-window'] : ['-window', '-nomaximize', '-video', 'none']),
    '-sound', 'none', '-nothrottle', '-skip_gameinfo', '-snapview', 'native',
    '-nvram_directory', join(dir, 'mame-nvram'),
    '-cfg_directory', join(dir, 'mame-cfg'),
    '-snapshot_directory', join(dir, 'mame-snap'),
    '-autoboot_script', luaScript,
  ];
}

function lua(value: unknown): string {
  if (value === null || value === undefined) return 'nil';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'string') return JSON.stringify(value);
  if (Array.isArray(value)) return `{${value.map(lua).join(',')}}`;
  return `{${Object.entries(value as Record<string, unknown>)
    .map(([key, item]) => `[${/^\d+$/.test(key) ? key : JSON.stringify(key)}]=${lua(item)}`).join(',')}}`;
}

/** MAME frames: every compared frame at every offset, and RAM frames shifted the same way. */
export function mameFrames(plan: OraclePlan, ramFramesOurs: number[]): { snapshots: number[]; ram: number[] } {
  const shift = (frames: number[]) => [...new Set(frames.flatMap(frame =>
    plan.offsets.map(offset => frame + offset)))].filter(frame => frame > 0).sort((a, b) => a - b);
  return { snapshots: shift(plan.frames), ram: shift(ramFramesOurs) };
}

/**
 * The timeline as oracle.lua applies it. A digital control set from Lua takes
 * effect at MAME's next ioport frame update, which is itself a frame notifier
 * that runs before the script's: pressed in notifier N, it is read from frame
 * N + 2 on. Ours, and MAME's own host input, take effect at the start of the
 * frame after the one it is given on, so a press or release goes to MAME one
 * notifier early; a PORT_TOGGLE switch's flip then shows a frame later on both
 * sides (KeyboardInput's `flips`). An analog value
 * is read straight from its override, with no frame update between, so it
 * keeps its frame (the recorder already put it on the frame before the one
 * that reads it), as do typed text, PLAY and resets.
 * Lua tables are 1-based: an event's input index moves up by one.
 */
export function luaEvents(timeline: Timeline): Record<number, TimelineEvent[]> {
  const events: Record<number, TimelineEvent[]> = {};
  for (const [frame, list] of Object.entries(timeline.events)) {
    for (const event of list) {
      const digital = event.kind === 'press' || event.kind === 'release';
      const at = digital ? Math.max(0, Number(frame) - 1) : Number(frame);
      (events[at] ??= []).push('input' in event ? { ...event, input: event.input + 1 } : event);
    }
  }
  return events;
}

export function writeLuaPlan(
  path: string,
  dir: string,
  timeline: Timeline,
  frames: { snapshots: number[]; ram: number[] },
  plan: OraclePlan,
): void {
  const io: IoPlan = plan.io ?? { taps: [], from: 0, to: -1 };
  const last = Math.max(1, ...frames.snapshots, ...frames.ram,
    ...(plan.io ? [plan.io.to] : []), ...plan.offsets.map(offset => plan.last + offset));
  writeFileSync(path, `return ${lua({
    out: dir,
    last,
    inputs: timeline.inputs,
    events: luaEvents(timeline),
    snapshots: Object.fromEntries(frames.snapshots.map(frame => [frame, true])),
    ram: plan.ram?.cpus ?? [],
    ram_frames: Object.fromEntries(frames.ram.map(frame => [frame, true])),
    io: io.taps,
    io_from: io.from,
    io_to: io.to,
  })}\n`);
}

/** Run MAME once; resolves with its exit status and the tail of what it printed. */
export function runMame(
  binary: string,
  args: string[],
  dir: string,
  politeness: Politeness,
  timeoutMs: number,
): Promise<{ status: number | null; output: string }> {
  for (const sub of ['mame-nvram', 'mame-cfg', 'mame-snap']) {
    rmSync(join(dir, sub), { recursive: true, force: true });
    mkdirSync(join(dir, sub), { recursive: true });
  }
  const [command, commandArgs] = politeCommand(binary, args, politeness);
  return new Promise(done => {
    const child = spawn(command, commandArgs, {
      cwd: dirname(binary),
      env: { ...mameEnvironment(politeness), MAMEKIT_ORACLE_PLAN: join(dir, 'mame-plan.lua') },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    const keep = (chunk: Buffer) => { output = (output + chunk.toString()).slice(-4000); };
    child.stdout.on('data', keep);
    child.stderr.on('data', keep);
    const timer = setTimeout(() => child.kill('SIGKILL'), timeoutMs);
    child.on('close', status => { clearTimeout(timer); done({ status, output }); });
  });
}
