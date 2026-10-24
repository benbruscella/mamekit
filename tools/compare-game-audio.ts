#!/usr/bin/env node
/**
 * Capture the same clean power-on run from MAMEKit and a real MAME binary,
 * then compare their audio.
 *
 *   MAME_BIN=/path/to/mame node tools/compare-game-audio.ts commando \
 *     [--mame /path/to/mame] [--seconds 30] [--out .files/audio/commando]
 *   MAME_BIN=... node tools/compare-game-audio.ts nes --cartridge justbred --start
 *
 * A console is compared on one of its software-list cartridges, mounted the
 * way its contract mounts one, with no input on either side -- or, with
 * `--start`, the oracle's Start schedule on both (Start held six frames every
 * 300 from frame 299), for a title that plays nothing until it is started.
 *
 * MAME runs the way tools/mame-oracle.ts runs it: refused unless it is the
 * source checkout's release, booted cold from fresh nvram and cfg
 * directories (MAME writes NVRAM back on exit, so a reused one boots warm),
 * windowed so it cannot take over the screen, and at low priority.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runGameAcceptance } from '../src/games/acceptance-harness.ts';
import { loadGameContracts } from '../src/games/contracts.ts';
import { politeCommand, resolveMame, romPaths } from './oracle/mame-side.ts';
import { startSchedule } from './oracle/plan.ts';
import { gameOutputDir } from '../src/gen/output-layout.ts';
import type { ShellConfig } from '../src/runtime/shell.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [game, ...args] = process.argv.slice(2);
if (!game) usage();

const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const mame = resolveMame(resolve(process.env.MAME_SRC ?? join(projectRoot, '../mame')), option('--mame')).binary;
const seconds = Number(option('--seconds') ?? 30);
if (!Number.isFinite(seconds) || seconds <= 0) usage('--seconds must be positive');
const cartridge = option('--cartridge');
const start = args.includes('--start');
const name = cartridge ? `${game}-${cartridge}` : game;
const outDir = resolve(projectRoot, option('--out') ?? `.files/audio/${name}`);
mkdirSync(outDir, { recursive: true });

const machineContract = (await loadGameContracts())
  .find(candidate => candidate.game === game && (!cartridge || candidate.cartridge));
if (!machineContract) throw new Error(`unknown supported game: ${game}`);
const frames = Math.ceil(seconds * 60);
// A console's cartridge is named as MAME names list software, `<list>:<name>`.
const config = JSON.parse(readFileSync(join(gameOutputDir(join(projectRoot, 'dist'), machineContract.category, game),
  'config.json'), 'utf8')) as ShellConfig;
const contract = cartridge
  ? { ...machineContract, cartridge, actions: start ? startSchedule(config.bindings, frames) : [], checkpoints: [], golden: undefined }
  : machineContract;

const mamekitWav = join(outDir, `${name}-mamekit.wav`);
const mamekitWrites = join(outDir, `${name}-mamekit-writes.json`);
const mameWav = join(outDir, `${name}-mame.wav`);

await runGameAcceptance(contract, projectRoot, {
  captureAudio: mamekitWav,
  captureAudioWrites: mamekitWrites,
  captureActions: start,
  frames,
});

const cartridgeList = (): string => (JSON.parse(readFileSync(join(gameOutputDir(join(projectRoot, 'dist'),
  contract.category, game), config.cart?.catalogUrl ?? 'softlist.json'), 'utf8')) as { list: string }).list;
const title = cartridge ? ['-cart', `${cartridgeList()}:${cartridge}`, '-hashpath', join(resolve(process.env.MAME_SRC ?? join(projectRoot, '../mame')), 'hash')] : [];

const mameState = join(outDir, 'mame-state');
rmSync(mameState, { recursive: true, force: true });
// `--mute <tag>` silences one of MAME's sound devices through the cfg mixer,
// which no Lua call reaches, so one chip can be heard on its own.
const muted = args.flatMap((value, index) => args[index - 1] === '--mute' ? [value] : []);
if (muted.length) {
  mkdirSync(join(mameState, 'cfg'), { recursive: true });
  writeFileSync(join(mameState, 'cfg', `${game}.cfg`), `<?xml version="1.0"?>
<mameconfig version="10">
  <system name="${game}">
    <mixer>
${muted.map(tag => `      <device_volume device="${tag}" gain="0" />`).join('\n')}
    </mixer>
  </system>
</mameconfig>
`);
}
// The same schedule for MAME: the Start field, found by port and mask as the
// oracle finds it, held from the notifier's frame 299 for six frames every 300.
const startBinding = config.bindings.find(binding => /^IPT_START1?$/.test(binding.type ?? '') && binding.keys.length);
const startScript = join(outDir, 'start.lua');
if (start) {
  if (!startBinding) usage('the machine has no Start key to press');
  writeFileSync(startScript, `local tag, mask = ${JSON.stringify(startBinding.port)}, ${startBinding.mask}
local frame, field = 0, nil
local function find()
  for candidate, port in pairs(manager.machine.ioport.ports) do
    if candidate == ":" .. tag or (candidate:sub(1, #tag:match("^([^:]+)") + 2) == ":" .. tag:match("^([^:]+)") .. ":"
        and candidate:sub(-(#tag:match("([^:]+)$") + 1)) == ":" .. tag:match("([^:]+)$")) then
      for _, candidateField in pairs(port.fields) do
        if candidateField.mask == mask and (candidateField.enabled or not field) then field = candidateField end
      end
    end
  end
end
startNotifier = emu.add_machine_frame_notifier(function()
  frame = frame + 1
  if not field then find() end
  if field then
    if frame >= 299 and (frame - 299) % 300 < 6 then field:set_value(1) else field:clear_value() end
  end
end)
`);
}
const [command, commandArgs] = politeCommand(resolve(mame), [
  game,
  ...title,
  '-rompath', (cartridge ? romPaths(config, contract.category) : [join(projectRoot, '.data/roms', contract.category)]).join(';'),
  '-window', '-nomaximize',
  '-video', 'none',
  '-sound', 'none',
  '-wavwrite', mameWav,
  '-seconds_to_run', String(seconds),
  '-nothrottle',
  '-skip_gameinfo',
  '-nvram_directory', join(mameState, 'nvram'),
  '-cfg_directory', join(mameState, 'cfg'),
  ...(start ? ['-autoboot_script', startScript] : []),
], { background: false, watch: false });
const mameResult = spawnSync(command, commandArgs, {
  cwd: dirname(resolve(mame)),
  // Homebrew's SDL build still probes the window server with -video none.
  // The dummy backends make wavwrite usable from CI/headless agent sessions.
  env: {
    ...process.env,
    SDL_VIDEODRIVER: process.env.SDL_VIDEODRIVER ?? 'dummy',
    SDL_AUDIODRIVER: process.env.SDL_AUDIODRIVER ?? 'dummy',
  },
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
  maxBuffer: 16 * 1024 * 1024,
});
if (mameResult.status !== 0) {
  throw new Error(
    `MAME capture failed (status=${mameResult.status}, signal=${mameResult.signal}, ` +
    `error=${mameResult.error?.message ?? 'none'}):\n` +
    `${mameResult.stdout}${mameResult.stderr}`,
  );
}

const compare = spawnSync(process.execPath, [
  join(projectRoot, 'tools/compare-audio.mjs'),
  mamekitWav,
  mameWav,
  outDir,
], {
  cwd: projectRoot,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
});
process.stdout.write(compare.stdout);
process.stderr.write(compare.stderr);
if (compare.status !== 0) process.exit(compare.status ?? 1);
console.log(`\nMAMEKit: ${mamekitWav}`);
console.log(`MAME:    ${mameWav}`);

function usage(error?: string): never {
  if (error) console.error(`error: ${error}`);
  console.error(
    'usage: node tools/compare-game-audio.ts <game> [--cartridge <name> [--start]] [--mute <mame device tag>] ' +
    '[--mame <path/to/mame>, else MAME_BIN] [--seconds 30] [--out .files/audio/<game>]',
  );
  process.exit(1);
}
