#!/usr/bin/env node
/**
 * Capture the same clean power-on run from MAMEKit and a real MAME binary,
 * then compare their audio.
 *
 *   MAME_BIN=/path/to/mame node tools/compare-game-audio.ts commando \
 *     [--mame /path/to/mame] [--seconds 30] [--out .files/audio/commando]
 *   MAME_BIN=... node tools/compare-game-audio.ts nes --cartridge justbred --start
 *   MAME_BIN=... node tools/compare-game-audio.ts nes --scenario smb1
 *
 * `--scenario <id>` boots that contract scenario (default: the machine's
 * first), candidates included. A console is compared on one of its
 * software-list cartridges, the scenario's own unless `--cartridge` names
 * another, mounted the way its contract mounts one, and MAME is given the
 * same one. A scenario that boots other list software (a tape, a disk) is
 * refused: MAME is given no list software here. There is no input on either
 * side -- or, with
 * `--start`, the oracle's Start schedule on both (Start held six frames every
 * 300 from frame 299), for a title that plays nothing until it is started.
 * `--press 299:Enter,450:KeyZ` presses the keys given, each held six frames
 * from its frame, on both sides: Lagrange Point plays its VRC7 music only once
 * its intro has been started and stepped through.
 *
 * MAME runs the way tools/mame-oracle.ts runs it: refused unless it is the
 * source checkout's release, booted cold from fresh nvram and cfg
 * directories (MAME writes NVRAM back on exit, so a reused one boots warm),
 * windowed so it cannot take over the screen, and at low priority.
 *
 * The numbers printed are also written to compare.json in the output
 * directory, with what was run: the mamekit commit, MAME's release, Node and
 * both commands.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runGameAcceptance } from '../src/games/acceptance-harness.ts';
import { loadGenerationGameContracts } from '../src/games/contracts.ts';
import { mamekitIdentity, politeCommand, resolveMame, romPaths, samplesDir } from './oracle/mame-side.ts';
import { startSchedule } from './oracle/plan.ts';
import { gameOutputDir } from '../src/gen/output-layout.ts';
import type { ShellConfig } from '../src/runtime/shell.ts';
import { bindingsForCards } from '../src/runtime/input.ts';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [game, ...args] = process.argv.slice(2);
if (!game) usage();

const option = (name: string): string | undefined => {
  const index = args.indexOf(name);
  return index < 0 ? undefined : args[index + 1];
};
const mameFound = resolveMame(resolve(process.env.MAME_SRC ?? join(projectRoot, '../mame')), option('--mame'));
const mame = mameFound.binary;
const seconds = Number(option('--seconds') ?? 30);
if (!Number.isFinite(seconds) || seconds <= 0) usage('--seconds must be positive');
const scenario = option('--scenario');
const machineContract = (await loadGenerationGameContracts()).find(candidate => candidate.game === game &&
  (scenario ? candidate.scenarioId === scenario : !option('--cartridge') || candidate.cartridge));
if (!machineContract) throw new Error(`unknown supported game${scenario ? ' or scenario' : ''}: ${game}${scenario ? ` ${scenario}` : ''}`);
if (machineContract.software && !option('--cartridge')) {
  usage(`${game}${scenario ? ` ${scenario}` : ''} boots ${machineContract.software.list}:${machineContract.software.name}, ` +
    'and MAME is given no list software here');
}
// The contract's own cartridge unless another is named, so MAME gets the one ours boots.
const cartridge = option('--cartridge') ?? machineContract.cartridge;
const start = args.includes('--start');
const presses = (option('--press') ?? '').split(',').filter(Boolean).map(press => {
  const [frame, code] = press.split(':');
  if (!code || !Number.isInteger(Number(frame))) usage(`--press wants frame:key, not ${press}`);
  return { atFrame: Number(frame), code };
});
const name = cartridge ? `${game}-${cartridge}` : game;
const outDir = resolve(projectRoot, option('--out') ?? `.files/audio/${name}`);
mkdirSync(outDir, { recursive: true });

const frames = Math.ceil(seconds * 60);
// A console's cartridge is named as MAME names list software, `<list>:<name>`.
const config = JSON.parse(readFileSync(join(gameOutputDir(join(projectRoot, 'dist'), machineContract.category, game),
  'config.json'), 'utf8')) as ShellConfig;
const pressActions = presses.map(press => ({ ...press, heldFrames: 6, releasedFrames: 0 }));
const actions = [...(start ? startSchedule(config.bindings, frames) : []), ...pressActions]
  .sort((left, right) => left.atFrame - right.atFrame);
const contract = cartridge || start || presses.length
  ? {
      ...machineContract, ...(cartridge ? { cartridge, software: undefined } : {}), checkpoints: [], golden: undefined,
      actions,
    }
  : machineContract;

const mamekitWav = join(outDir, `${name}-mamekit.wav`);
const mamekitWrites = join(outDir, `${name}-mamekit-writes.json`);
const mameWav = join(outDir, `${name}-mame.wav`);

await runGameAcceptance(contract, projectRoot, {
  captureAudio: mamekitWav,
  captureAudioWrites: mamekitWrites,
  captureActions: start || presses.length > 0,
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
// Every press, as the field it sets: by port and mask, as the oracle finds one.
const pressFields = presses.map(press => {
  // A control of a card fitted only for some titles (the Power Pad) is not live.
  const binding = bindingsForCards(config.bindings, undefined).find(candidate => candidate.keys.includes(press.code));
  if (!binding) usage(`no control is bound to ${press.code}`);
  return { frame: press.atFrame, tag: binding.port, mask: binding.mask };
});
if (start || presses.length) {
  if (start && !startBinding) usage('the machine has no Start key to press');
  writeFileSync(startScript, `local start = ${start ? `{ tag = ${JSON.stringify(startBinding!.port)}, mask = ${startBinding!.mask} }` : 'nil'}
local presses = { ${pressFields.map(press => `{ frame = ${press.frame}, tag = ${JSON.stringify(press.tag)}, mask = ${press.mask} }`).join(', ')} }
local frame = 0
local fields = {}
local function find(tag, mask)
  local key = tag .. "/" .. mask
  if fields[key] then return fields[key] end
  for candidate, port in pairs(manager.machine.ioport.ports) do
    if candidate == ":" .. tag or (candidate:sub(1, #tag:match("^([^:]+)") + 2) == ":" .. tag:match("^([^:]+)") .. ":"
        and candidate:sub(-(#tag:match("([^:]+)$") + 1)) == ":" .. tag:match("([^:]+)$")) then
      for _, candidateField in pairs(port.fields) do
        if candidateField.mask == mask and (candidateField.enabled or not fields[key]) then fields[key] = candidateField end
      end
    end
  end
  return fields[key]
end
startNotifier = emu.add_machine_frame_notifier(function()
  frame = frame + 1
  local held = {}
  if start then
    local field = find(start.tag, start.mask)
    if field then held[field] = frame >= 299 and (frame - 299) % 300 < 6 end
  end
  for _, press in ipairs(presses) do
    local field = find(press.tag, press.mask)
    if field then held[field] = held[field] or (frame >= press.frame and frame < press.frame + 6) end
  end
  for field, down in pairs(held) do
    if down then field:set_value(1) else field:clear_value() end
  end
end)
`);
}
const [command, commandArgs] = politeCommand(resolve(mame), [
  game,
  ...title,
  // A computer's firmware is in its dumps' bios/, not its category's root.
  '-rompath', romPaths(config, contract.category).join(';'),
  '-samplepath', samplesDir,
  '-window', '-nomaximize',
  '-video', 'none',
  '-sound', 'none',
  '-wavwrite', mameWav,
  '-seconds_to_run', String(seconds),
  '-nothrottle',
  '-skip_gameinfo',
  '-nvram_directory', join(mameState, 'nvram'),
  '-cfg_directory', join(mameState, 'cfg'),
  ...(start || presses.length ? ['-autoboot_script', startScript] : []),
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
// What was run beside the numbers, so a later comparison knows what it is set against.
const comparePath = join(outDir, 'compare.json');
const shownMame = commandArgs.map(arg => arg.startsWith(mameState) ? relative(projectRoot, arg) : arg);
writeFileSync(comparePath, `${JSON.stringify({
  game,
  ...(machineContract.scenarioId ? { scenario: machineContract.scenarioId } : {}),
  ...(cartridge ? { cartridge } : {}),
  input: start || presses.length ? { start, presses } : 'none',
  checkedAt: new Date().toISOString(),
  mame: mameFound.version,
  mamekit: mamekitIdentity(),
  node: process.version,
  command: ['node', relative(projectRoot, fileURLToPath(import.meta.url)), ...process.argv.slice(2)],
  mameCommand: [command, ...shownMame],
  ...JSON.parse(readFileSync(comparePath, 'utf8')) as object,
}, null, 2)}\n`);
console.log(`\nMAMEKit: ${mamekitWav}`);
console.log(`MAME:    ${mameWav}`);

function usage(error?: string): never {
  if (error) console.error(`error: ${error}`);
  console.error(
    'usage: node tools/compare-game-audio.ts <game> [--scenario <id>] [--cartridge <name>] [--start] [--press frame:key,...] [--mute <mame device tag>] ' +
    '[--mame <path/to/mame>, else MAME_BIN] [--seconds 30] [--out .files/audio/<game>]',
  );
  process.exit(1);
}
