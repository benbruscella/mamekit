#!/usr/bin/env node
/**
 * How far is a board's emulated state from real MAME's?
 *
 *   MAME_BIN=/path/to/mame node tools/mame-ram-oracle.ts gauntlet marble \
 *     [--frames 300,600,900] [--window 8] [--dist dir] [--out file.json] [--keep]
 *
 * Runs each arcade target cold and with no input in MAME and in the generated
 * distribution, dumps every processor's RAM at the same frame numbers, and
 * counts differing bytes per processor after aligning the two runs in time
 * (the frame on which each side presents can differ by a few). Attract mode is
 * deterministic from boot on both sides, so a board that emulates correctly
 * converges on a small residue -- stack scratch and phase-dependent counters --
 * while a genuine divergence grows.
 *
 * This is a measuring stick, not a golden: compare the numbers for the same
 * target before and after a runtime change. A board that moves further from
 * MAME has regressed whatever its recorded hashes say. A handshake change shows
 * on the sound processor long before it reaches the main one.
 *
 * Caveats: a board parked on a static cold-CMOS screen (Robotron) reads 0
 * whatever the emulation does; `--keep` lists the differing addresses.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const flags = new Set(['--keep']);
const games = args.filter((arg, index) =>
  !arg.startsWith('--') && !(args[index - 1]?.startsWith('--') && !flags.has(args[index - 1]!)));
const frames = (option('--frames') ?? '300,600,900').split(',').map(Number);
const window = Number(option('--window') ?? 8);
const mame = option('--mame') ?? process.env.MAME_BIN;
const outFile = option('--out');
const distRoot = resolve(projectRoot, option('--dist') ?? 'dist');
/** Keep the dumps and list the differing addresses. */
const keep = args.includes('--keep');
if (!mame || !games.length) {
  console.error('usage: MAME_BIN=... node tools/mame-ram-oracle.ts <game...> [--frames a,b,c] [--out file]');
  process.exit(2);
}

interface Range { start: number; end: number }
interface Processor { tag: string; ranges: Range[] }

function wantedFrames(): Set<number> {
  const want = new Set<number>();
  for (const frame of frames) for (let offset = -window; offset <= window; offset++) want.add(frame + offset);
  return want;
}

/** Each processor's RAM ranges, as the generated board maps them. */
function loadTarget(game: string): Processor[] {
  const config = JSON.parse(readFileSync(join(distRoot, 'games/arcade', game, 'config.json'), 'utf8'));
  return (config.board.cpus as { tag: string; ranges?: (Range & { kind: string })[] }[]).map(cpu => {
    const seen = new Set<string>();
    const ranges = (cpu.ranges ?? [])
      .filter(range => range.kind === 'ram' && range.end - range.start < 0x40000)
      .filter(range => {
        const key = `${range.start}-${range.end}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(({ start, end }) => ({ start, end }))
      .sort((left, right) => left.start - right.start);
    return { tag: cpu.tag, ranges };
  }).filter(processor => processor.ranges.length);
}

const dumpName = (side: 'mame' | 'ours', processor: number, frame: number) =>
  `${side}-${processor}-${frame}.bin`;

function mameDumps(game: string, processors: Processor[], dir: string): void {
  const want = wantedFrames();
  const lua = join(dir, 'dump.lua');
  writeFileSync(lua, `
count = 0
want = {${[...want].map(frame => `[${frame}]=true`).join(',')}}
last = ${Math.max(...want)}
targets = {${processors.map((processor, index) => `{${index}, ":${processor.tag}", {${processor.ranges.map(range => `{${range.start},${range.end}}`).join(',')}}}`).join(',')}}
sub = emu.add_machine_frame_notifier(function()
  count = count + 1
  if want[count] then
    for _, t in ipairs(targets) do
      local device = manager.machine.devices[t[2]]
      if device then
        local space = device.spaces["program"]
        local out = io.open("${dir}/mame-" .. t[1] .. "-" .. count .. ".bin", "wb")
        for _, r in ipairs(t[3]) do
          local bytes = {}
          for a = r[1], r[2] do bytes[#bytes + 1] = string.char(space:read_u8(a)) end
          out:write(table.concat(bytes))
        end
        out:close()
      end
    end
  end
  if count >= last then manager.machine:exit() end
end)
`);
  const result = spawnSync(mame!, [
    game, '-video', 'none', '-sound', 'none', '-nothrottle',
    // Cold and private: a reused nvram boots warm, and concurrent runs must
    // not share MAME's cfg directory.
    '-autoboot_script', lua, '-nvram_directory', join(dir, 'nvram'),
    '-cfg_directory', join(dir, 'cfg'),
    '-rompath', join(projectRoot, '.data/roms/arcade'),
  ], { cwd: dirname(mame!), encoding: 'utf8', timeout: 600_000 });
  if (result.status !== 0) {
    throw new Error(`${game}: MAME exited ${result.status}: ${(result.stderr ?? '').slice(-400)}`);
  }
}

/** Our side, through the acceptance harness's own ROM and board assembly. */
async function ourDumps(game: string, processors: Processor[], dir: string): Promise<void> {
  const { runGameAcceptance } = await import('../src/games/acceptance-harness.ts');
  const { loadGenerationGameContracts } = await import('../src/games/contracts.ts');
  const contract = (await loadGenerationGameContracts()).find(candidate => candidate.game === game);
  if (!contract) throw new Error(`unknown supported game: ${game}`);
  const want = wantedFrames();
  await runGameAcceptance(contract, projectRoot, {
    outRoot: distRoot,
    // A diagnostic capture records from frame zero with no input actions.
    captureAudio: join(dir, 'ours.pcm'),
    frames: Math.max(...want),
    inspectFrame: frame => {
      if (!want.has(frame.number)) return;
      processors.forEach((processor, index) => {
        const bus = frame.buses.get(processor.tag);
        if (!bus) return;
        const chunks = processor.ranges.map(range => {
          const bytes = new Uint8Array(range.end - range.start + 1);
          for (let address = range.start; address <= range.end; address++) {
            bytes[address - range.start] = Number(bus.read(address)) & 0xff;
          }
          return bytes;
        });
        writeFileSync(join(dir, dumpName('ours', index, frame.number)), Buffer.concat(chunks));
      });
    },
  });
}

function read(dir: string, name: string): Buffer | undefined {
  try { return readFileSync(join(dir, name)); } catch { return undefined; }
}

function distance(dir: string, processor: number, frame: number): { bytes: number; offset: number } | undefined {
  const reference = read(dir, dumpName('mame', processor, frame));
  if (!reference) return undefined;
  let best = { bytes: Number.POSITIVE_INFINITY, offset: 0 };
  for (let offset = -window; offset <= window; offset++) {
    const ours = read(dir, dumpName('ours', processor, frame + offset));
    if (!ours) continue;
    let bytes = 0;
    for (let index = 0; index < reference.length; index++) if (reference[index] !== ours[index]) bytes++;
    if (bytes < best.bytes) best = { bytes, offset };
  }
  return Number.isFinite(best.bytes) ? best : undefined;
}

function differingAddresses(dir: string, processor: Processor, index: number, frame: number, offset: number): string[] {
  const reference = read(dir, dumpName('mame', index, frame));
  const ours = read(dir, dumpName('ours', index, frame + offset));
  if (!reference || !ours) return [];
  const found: string[] = [];
  let position = 0;
  for (const range of processor.ranges) {
    for (let address = range.start; address <= range.end; address++, position++) {
      if (reference[position] !== ours[position]) {
        found.push(`${address.toString(16)}:${reference[position]!.toString(16)}/${ours[position]!.toString(16)}`);
      }
    }
  }
  return found;
}

// Our side runs in a child process per target: a native crash in one board
// (see acceptance-run-flake) must cost that target a retry, not the sweep.
const child = option('--child-dir');
if (child) {
  await ourDumps(games[0]!, loadTarget(games[0]!), child);
  process.exit(0);
}

const report: Record<string, unknown> = {};
for (const game of games) {
  const dir = mkdtempSync(join(tmpdir(), `ram-oracle-${game}-`));
  try {
    const processors = loadTarget(game);
    mameDumps(game, processors, dir);
    let ours;
    for (let attempt = 0; attempt < 2; attempt++) {
      ours = spawnSync(process.execPath, [
        fileURLToPath(import.meta.url), game, '--child-dir', dir, '--dist', distRoot,
        '--frames', frames.join(','), '--window', String(window), '--mame', mame!,
      ], { encoding: 'utf8', timeout: 1_800_000, maxBuffer: 64 << 20 });
      if (ours.status === 0 || ours.signal === null && ours.status !== null && ours.status < 128) break;
    }
    if (ours!.status !== 0) {
      throw new Error(`ours exited ${ours!.status ?? ours!.signal}: ${(ours!.stderr ?? '').trim().split('\n').slice(-3).join(' | ')}`);
    }
    const perProcessor = processors.map((processor, index) => ({
      tag: processor.tag,
      ramBytes: processor.ranges.reduce((sum, range) => sum + range.end - range.start + 1, 0),
      results: Object.fromEntries(frames.map(frame => [frame, distance(dir, index, frame)])),
    }));
    // `ramBytes`/`results` stay the main processor's, as the first sweeps recorded.
    report[game] = { ...perProcessor[0], processors: perProcessor };
    for (const [index, processor] of perProcessor.entries()) {
      const label = index === 0 ? game.padEnd(10) : ` ${processor.tag}`.padEnd(10);
      console.log(`${label} ${String(processor.ramBytes).padStart(7)} bytes  ` + frames.map(frame => {
        const result = processor.results[frame];
        return result
          ? `@${frame}: ${result.bytes} (${result.offset >= 0 ? '+' : ''}${result.offset})`
          : `@${frame}: -`;
      }).join('  '));
      if (keep) {
        for (const frame of frames) {
          const result = processor.results[frame];
          if (!result) continue;
          const differing = differingAddresses(dir, processors[index]!, index, frame, result.offset);
          console.log(`   @${frame} mame/ours: ${differing.slice(0, 48).join(' ')}`);
        }
      }
    }
    if (keep) console.log(`${game}: dumps kept in ${dir}`);
  } catch (error) {
    report[game] = { error: String((error as Error).message ?? error) };
    console.log(`${game.padEnd(10)} ERROR ${(error as Error).message?.slice(0, 200)}`);
  } finally {
    if (!keep) rmSync(dir, { recursive: true, force: true });
  }
}
if (outFile) {
  mkdirSync(dirname(resolve(outFile)), { recursive: true });
  writeFileSync(resolve(outFile), `${JSON.stringify(report, null, 2)}\n`);
}
