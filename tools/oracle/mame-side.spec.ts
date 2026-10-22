import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ShellConfig } from '../../src/runtime/shell.ts';
import { mameArguments, politeCommand, writeLuaPlan } from './mame-side.ts';
import { inputTimeline, type OraclePlan, type OursBoot, type TimelineEvent } from './plan.ts';

const config = { game: 'spectrum', software: { dumpsKey: 'computers/spectrum', shelves: [] } } as unknown as ShellConfig;
const boot: OursBoot = {
  width: 352, height: 296, rotate: 0,
  slotCards: { exp: 'intf2' },
  emptySlots: ['tape'],
  software: 'spectrum_cart:jetpac',
  media: 'cart',
  timeline: { inputs: [], events: {} },
};
const polite = { background: false, watch: false };
const args = mameArguments(config, 'computers', boot, boot.software, '/mame', '/work', polite);

// The machine, then its slot options, then the title: MAME looks the title up
// in the lists of the cards it has been given, so a card's own list
// (spectrum_cart) does not exist yet if the title comes first.
assert.deepEqual(args.slice(0, 7), ['spectrum', '-exp', 'intf2', '-tape', '', '-cart', 'spectrum_cart:jetpac']);
// A bare <list>:<name> leaves a quickload unloaded; the medium is named when known.
const quik = mameArguments(config, 'computers', { ...boot, slotCards: {}, emptySlots: [], software: 'c64_quik:brklmts', media: 'quik' },
  'c64_quik:brklmts', '/mame', '/work', polite);
assert.deepEqual(quik.slice(0, 3), ['spectrum', '-quik', 'c64_quik:brklmts']);
const machineOnly = mameArguments(config, 'arcade', { ...boot, slotCards: {}, emptySlots: [] }, undefined, '/mame', '/work', polite);
assert.equal(machineOnly[1], '-rompath');

// Cold and private every run, out of the way, and MAME's own hash files.
const value = (list: string[], flag: string) => list[list.indexOf(flag) + 1];
assert.equal(value(args, '-nvram_directory'), '/work/mame-nvram');
assert.equal(value(args, '-cfg_directory'), '/work/mame-cfg');
assert.equal(value(args, '-hashpath'), '/mame/hash');
for (const flag of ['-window', '-nomaximize', '-skip_gameinfo', '-nothrottle']) assert.ok(args.includes(flag), flag);
assert.equal(value(args, '-video'), 'none');
assert.equal(value(args, '-sound'), 'none');
assert.ok(value(args, '-autoboot_script')!.endsWith('/tools/oracle/oracle.lua'));
// --watch shows MAME's picture in an ordinary window.
const watched = mameArguments(config, 'arcade', boot, undefined, '/mame', '/work', { background: false, watch: true });
assert.ok(watched.includes('-window') && !watched.includes('-video') && !watched.includes('-nomaximize'));

// Every process the oracle starts yields: nice 10, or the efficiency cores on a Mac.
if (process.platform !== 'win32') {
  assert.deepEqual(politeCommand('mame', ['pacman'], polite), ['nice', ['-n', '10', 'mame', 'pacman']]);
}
if (process.platform === 'darwin') {
  assert.deepEqual(politeCommand('mame', ['pacman'], { background: true, watch: false }), ['/usr/sbin/taskpolicy', ['-b', 'mame', 'pacman']]);
}

// The Lua plan and the script that reads it agree. There is no Lua here or in
// CI, so this holds the two sides to one vocabulary: every field the script
// reads is written, every field written is read, and every event kind the
// timeline can produce is one the script applies.
const dir = mkdtempSync(join(tmpdir(), 'oracle-lua-'));
try {
  const plan = { frames: [600], offsets: [0], last: 600, io: { taps: [{ tag: 'maincpu', lo: 0x2000, hi: 0x7fff, read: true, write: false }], from: 3, to: 9 } } as unknown as OraclePlan;
  const timeline = inputTimeline([
    { atFrame: 10, code: 'Enter', heldFrames: 2, releasedFrames: 0 },
    { atFrame: 20, aim: [1, 2] },
    { atFrame: 30, text: 'RUN{ENTER}' },
    { atFrame: 40, reset: true },
  ], [
    { port: 'ctrl1:JOYPAD', mask: 8, keys: ['Enter'], label: 'Start', type: 'IPT_START' },
    { port: 'ctrl2:GUN_X', mask: 0xff, keys: [], label: 'X', lightgun: { axis: 'x', min: 0, max: 255 } },
    { port: 'ctrl2:GUN_Y', mask: 0xff, keys: [], label: 'Y', lightgun: { axis: 'y', min: 0, max: 239 } },
  ], { frame: 151, text: 'LOAD{ENTER}', play: true });
  writeLuaPlan(join(dir, 'plan.lua'), dir, timeline, { snapshots: [599, 600], ram: [1, 2] }, plan);
  const written = readFileSync(join(dir, 'plan.lua'), 'utf8');
  assert.ok(written.startsWith('return {'));
  assert.match(written, /\["snapshots"\]=\{\[599\]=true,\[600\]=true\}/);
  // Lua tables count from one: the first input is input 1.
  assert.match(written, /\["10"\]=\{\{\["kind"\]="press",\["input"\]=1\}\}|\[10\]=\{\{\["kind"\]="press",\["input"\]=1\}\}/);
  assert.match(written, /\["last"\]=600/);

  const script = readFileSync(join(dirname(), 'oracle.lua'), 'utf8');
  const read = new Set([...script.matchAll(/\bplan\.(\w+)/g)].map(match => match[1]!));
  const topLevel = new Set([...written.matchAll(/(?:^return \{|,)\["(\w+)"\]=/g)].map(match => match[1]!)
    .filter(key => ['out', 'last', 'inputs', 'events', 'snapshots', 'ram', 'ram_frames', 'io', 'io_from', 'io_to'].includes(key)));
  assert.deepEqual([...read].sort(), [...topLevel].sort(), 'oracle.lua reads exactly the fields writeLuaPlan writes');
  const handled = new Set([...script.matchAll(/event\.kind == "(\w+)"/g)].map(match => match[1]!));
  const kinds = new Set(Object.values(timeline.events).flat().map((event: TimelineEvent) => event.kind));
  for (const kind of ['press', 'release', 'set', 'text', 'reset', 'boot']) assert.ok(kinds.has(kind as never), `fixture covers ${kind}`);
  assert.deepEqual([...kinds].filter(kind => !handled.has(kind)), [], 'every timeline event kind is applied in MAME');
  // The pitfalls stay fixed: taps and notifiers in globals, the stop notifier
  // MAME 0.288 kept, pictures from the snapshot rather than the swapped bitmap.
  assert.match(script, /oracle\.taps\[#oracle\.taps \+ 1\] = space:install_read_tap/);
  assert.match(script, /oracle\.frame_notifier = emu\.add_machine_frame_notifier/);
  assert.match(script, /emu\.add_machine_stop_notifier/);
  assert.match(script, /video:snapshot_pixels\(\)/);
  // Code only: the comments name these pitfalls on purpose.
  const code = script.replace(/--.*$/gm, '');
  assert.doesNotMatch(code, /screen:pixels|register_stop|^local\s+\w+\s*=\s*emu\.add_/m);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

function dirname(): string {
  return fileURLToPath(new URL('.', import.meta.url));
}

console.log('oracle mame-side.spec: ok');
