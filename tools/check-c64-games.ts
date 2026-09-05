// Verify a local selection against its pinned software list, then attempt the
// generated C64 board's power-on prerequisite. No ROMs are written to the build.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { crc32, readZip } from '../src/runtime/zip.ts';
import { romsDir } from '../src/paths.ts';

interface Selection {
  softwareListSource: string;
  softwareListSha1: string;
  bios: string;
  games: Array<{
    title: string; list: string; software: string; release: string;
    archive: string; mameSupported: string; note: string;
    parts: Array<{ name: string; roms: Array<{ filename: string; bytes: number; crc32: string; sha1: string }> }>;
  }>;
}
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const selectionPath = resolve(process.argv[2] ?? join(romsDir(projectRoot), '_processed/c64/testing/selected-games.json'));
const build = resolve(process.argv[3] ?? '.cache/dev/c64');
const output = resolve(process.env.MAMEKIT_C64_OUTPUT ?? dirname(selectionPath));
mkdirSync(output, { recursive: true });
const machineName = process.env.MAMEKIT_C64_MACHINE ?? 'c64';
const frameCount = Number(process.env.MAMEKIT_C64_FRAMES ?? 180);
if (!Number.isInteger(frameCount) || frameCount < 1) throw new Error('MAMEKIT_C64_FRAMES must be a positive integer');
const selection = JSON.parse(readFileSync(selectionPath, 'utf8')) as Selection;
const sha1 = (bytes: Uint8Array): string => createHash('sha1').update(bytes).digest('hex');
if (sha1(readFileSync(selection.softwareListSource)) !== selection.softwareListSha1) {
  throw new Error('MAME software list changed; refresh the selection before testing');
}
const games = [];
for (const game of selection.games) {
  const errors: string[] = [];
  let checkedRoms = 0;
  try {
    const files = await readZip(readFileSync(game.archive));
    for (const part of game.parts) for (const rom of part.roms) {
      const bytes = files.get(rom.filename.toLowerCase());
      if (!bytes) { errors.push(`missing ${rom.filename}`); continue; }
      if (bytes.length !== rom.bytes || sha1(bytes) !== rom.sha1 || crc32(bytes).toString(16).padStart(8, '0') !== rom.crc32) {
        errors.push(`MAME checksum/size mismatch: ${rom.filename}`);
      } else checkedRoms++;
    }
    if (!checkedRoms) errors.push('no verified media');
  } catch (error) { errors.push(String(error)); }
  games.push({ ...game, mediaCheck: errors.length ? 'failed' : 'passed', checkedRoms, errors,
    gameplay: 'not-tested' });
}

// All selected software shares the same machine. Exercise its actual generated
// constructor once; a construction failure blocks every game before mounting.
const powerOn: {
  status: string; phase: string; error?: string; biosCheck?: unknown; checkpoints?: unknown[];
  media?: { software: string; frames: number; position: number; screen: string; runFrame?: number };
} = {
  status: 'blocked', phase: 'load-generated-artifacts',
};
try {
  const config = JSON.parse(readFileSync(join(build, `games/computers/${machineName}/config.json`), 'utf8'));
  const load = (path: string) => import(pathToFileURL(join(build, path)).href);
  const { checkRomSet, assembleRegions } = await load('runtime/core/shell.js');
  const files = await readZip(readFileSync(selection.bios));
  powerOn.phase = 'bios-validation';
  const critical = new Set(config.roms.map((region: { region: string }) => region.region));
  const checked = checkRomSet(config.roms, files, critical);
  powerOn.biosCheck = checked;
  if (checked.missingCritical.length || checked.missingOther.length || checked.crcMismatch.length) {
    throw new Error('BIOS does not satisfy the generated machine ROM requirements');
  }
  const regions = assembleRegions(config.roms, files, () => {}, critical);
  const registry = await load('app/registry.js');
  registry.registerGeneratedMachines();
  const { createBoard } = await load('runtime/core/generated-board.js');
  const { KeyboardInput } = await load('runtime/core/input.js');
  powerOn.phase = 'board-construction';
  const keyboard = new KeyboardInput(config.bindings, config.dipDefaults, config.ports);
  const events = new EventTarget();
  keyboard.attach(events);
  const board = createBoard({ ...config.board, game: machineName }, regions,
    keyboard, { soundWrite() {} });
  powerOn.phase = 'board-reset';
  board.reset();
  const frame = new Uint32Array(board.fbWidth * board.fbHeight);
  powerOn.checkpoints = [];
  powerOn.checkpoints.push(board.snapshot());
  powerOn.phase = 'frame-execution';
  for (let number = 1; number <= frameCount; number++) {
    board.frame(frame);
    if (number === 1 || number % 60 === 0 || number === frameCount) {
      powerOn.checkpoints.push({ ...board.snapshot(), framebufferSha1: sha1(new Uint8Array(frame.buffer)), colors: new Set(frame).size });
      console.log(`C64 power-on frame ${number}/${frameCount}: ${JSON.stringify(board.snapshot().cpus)}; colors=${new Set(frame).size}`);
    }
  }
  writeFileSync(join(output, 'power-on-frame.rgba'), new Uint8Array(frame.buffer));
  writeFileSync(join(output, 'frame-size.json'), JSON.stringify({ width: board.fbWidth, height: board.fbHeight }));
  powerOn.status = 'frames-executed';
  // Construction alone is never a boot or gameplay pass. Media mounting and
  // game-specific input/checkpoint coverage must be added before acceptance.
  powerOn.phase = 'power-on-only';
  const software = process.env.MAMEKIT_C64_LOAD;
  if (software) {
    const selected = games.find(game => game.software === software && game.mediaCheck === 'passed');
    if (!selected) throw new Error(`no verified selected software ${software}`);
    const media = board.media?.()[0];
    if (!media) throw new Error('generated machine has no cassette transport');
    if (process.env.MAMEKIT_C64_DEBUG) {
      const cia = board.devices.get('u1');
      const vic = board.devices.get('u19');
      console.log('C64 VIC registers', Array.from(vic.members.m_reg), 'colours', vic.members.m_colors,
        'colour RAM', board.state.m_color_ram?.slice?.(0, 8));
      console.log('C64 CIA1', Object.fromEntries(['m_icount', 'm_irq', 'm_icr', 'm_imr', 'm_cra', 'm_crb',
        'm_ta', 'm_ta_latch', 'm_count_a0', 'm_count_a1', 'm_count_a2', 'm_pra', 'm_pa', 'm_prb', 'm_pb', 'm_ddra', 'm_ddrb']
        .map(name => [name, cia.get(name)])));
      const ram = board.bindings.calls['m_ram.pointer']() as Uint8Array;
      console.log('C64 keyboard RAM', Array.from(ram.slice(0x90, 0xcc)), keyboard.dump());
    }
    const files = await readZip(readFileSync(selected.archive));
    const tape = files.get(selected.parts[0]!.roms[0]!.filename.toLowerCase());
    if (!tape) throw new Error('selected tape image missing');
    powerOn.phase = 'tape-mount';
    media.mount('tap', tape);
    console.log(`C64 ${software}: verified tape mounted`);
    const key = (code: string, down: boolean) => events.dispatchEvent(Object.assign(
      new Event(down ? 'keydown' : 'keyup', { cancelable: true }), { code, repeat: false }));
    for (const code of ['KeyL', 'KeyO', 'KeyA', 'KeyD', 'Enter']) {
      key(code, true); for (let n = 0; n < 4; n++) board.frame(frame);
      if (process.env.MAMEKIT_C64_DEBUG) console.log('C64 key', code, keyboard.dump(),
        'scan', board.bindings.calls['m_cia1.pb_r']?.(), board.bindings.calls['cia1_pb_r']?.());
      key(code, false); for (let n = 0; n < 4; n++) board.frame(frame);
    }
    writeFileSync(join(output, 'load-command-frame.rgba'), new Uint8Array(frame.buffer));
    const ram = board.bindings.calls['m_ram.pointer']() as Uint8Array;
    const screenText = Array.from(ram.slice(0x400, 0x7e8), value =>
      String.fromCharCode((value & 0x7f) < 32 ? (value & 0x7f) + 64 : value & 0x7f)).join('');
    console.log(`C64 ${software}: screen after LOAD: ${screenText.trim()}`);
    media.play();
    const cassetteState = () => {
      const port = board.devices.get('tape');
      const cassette = port.findDevice('cassette');
      return { transport: Object.fromEntries(['m_state', 'm_speed', 'm_direction', 'm_position', 'm_position_time']
        .map(name => [name, cassette.get(name)])), image: cassette.members.m_cassette?.get_info?.(),
        length: cassette.invoke('get_length'), motor: port.slotChild.get('m_motor'), cpuPort: board.cpus.get('u7').get('m_port') };
    };
    if (process.env.MAMEKIT_C64_DEBUG) console.log('C64 Play', cassetteState());
    powerOn.phase = 'tape-loading';
    const mediaFrames = Number(process.env.MAMEKIT_C64_MEDIA_FRAMES ?? 600);
    if (!Number.isSafeInteger(mediaFrames) || mediaFrames <= 0) throw new Error('invalid media frame count');
    let runFrame: number | undefined;
    const actions = JSON.parse(process.env.MAMEKIT_C64_ACTIONS ?? '[]') as Array<{
      atFrame: number; code: string; heldFrames: number;
    }>;
    for (const action of actions) {
      if (!Number.isSafeInteger(action.atFrame) || action.atFrame < 1 ||
          !Number.isSafeInteger(action.heldFrames) || action.heldFrames < 1 ||
          typeof action.code !== 'string' || action.code.startsWith('Control')) throw new Error('invalid game input action');
    }
    for (let n = 1; n <= mediaFrames; n++) {
      for (const action of actions) {
        if (n === action.atFrame) { key(action.code, true); console.log('C64 game input', n, action.code, 'down'); }
        if (n === action.atFrame + action.heldFrames) { key(action.code, false); console.log('C64 game input', n, action.code, 'up'); }
      }
      board.frame(frame);
      if (n % 300 === 0 || n === mediaFrames) {
        console.log(`C64 ${software}: load frame ${n}/${mediaFrames}; tape=${media.position().toFixed(3)}s; CPU=${JSON.stringify(board.snapshot().cpus)}`);
        if (process.env.MAMEKIT_C64_DEBUG) console.log('C64 tape', cassetteState());
        writeFileSync(join(output, 'tape-load-frame.rgba'), new Uint8Array(frame.buffer));
        writeFileSync(join(output, `load-${n}.rgba`), new Uint8Array(frame.buffer));
        writeFileSync(join(output, 'tape-load-ram.bin'), ram);
        writeFileSync(join(output, `load-${n}.ram`), ram);
        const text = Array.from(ram.slice(0x400, 0x7e8), value =>
          String.fromCharCode((value & 0x7f) < 32 ? (value & 0x7f) + 64 : value & 0x7f)).join('').trim();
        console.log('C64 load screen', text);
        powerOn.media = { software, frames: n, position: media.position(), screen: text, runFrame };
        if (runFrame === undefined && /LOADING\s+READY\./.test(text)) {
          console.log('C64 load completed; typing RUN');
          for (const code of ['KeyR', 'KeyU', 'KeyN', 'Enter']) {
            key(code, true); for (let held = 0; held < 4; held++) board.frame(frame);
            key(code, false); for (let released = 0; released < 4; released++) board.frame(frame);
          }
          runFrame = n;
        }
      }
    }
  }
} catch (error) { powerOn.error = error instanceof Error ? error.stack : String(error); }
for (const game of games) {
  game.gameplay = game.mediaCheck === 'failed' ? 'blocked-by-media' : powerOn.status === 'blocked'
    ? 'blocked-by-machine' : 'not-tested';
}
const report = { generatedAt: new Date().toISOString(), build, selectionPath, powerOn, games };
const resultPath = join(output, 'test-results.json');
writeFileSync(resultPath, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
// This diagnostic remains a failing acceptance prerequisite until game loading
// and gameplay are actually exercised, even when all ROM checks pass.
process.exitCode = 1;
