import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mameCacheKey, mameCaptures, setFiles, type MameCacheInputs } from './mame-cache.ts';

const scratch = mkdtempSync(join(tmpdir(), 'mamekit-mame-cache-'));
try {
  // --- the key: what MAME is given, never where this run writes ------------
  const inputs = (dir: string, overrides: Partial<MameCacheInputs> = {}): MameCacheInputs => ({
    version: '0.289', target: 'dkong', dir,
    args: ['dkong', '-rompath', '/roms/arcade', '-nvram_directory', `${dir}/mame-nvram`, '-wavwrite', `${dir}/mame.wav`],
    plan: `return {out="${dir}",last=1800,events={}}`,
    script: '-- oracle.lua', sets: ['/roms/arcade/dkong.zip 1234 1700000000000'],
    ...overrides,
  });
  const key = mameCacheKey(inputs('/work/dkong-machine-1'));
  assert.equal(key, mameCacheKey(inputs('/work/dkong-machine-2')), 'two runs of one plan share a key whatever their work directory');
  assert.notEqual(key, mameCacheKey(inputs('/work/a', { plan: 'return {out="/work/a",last=1800,events={[299]={{kind="set",input=1,value=3}}}}' })),
    'an analog value our side recorded is part of what MAME is given');
  assert.notEqual(key, mameCacheKey(inputs('/work/a', { version: '0.290' })));
  assert.notEqual(key, mameCacheKey(inputs('/work/a', { script: '-- oracle.lua\nlocal plan = 1' })), 'a change to the script\'s code');
  assert.equal(key, mameCacheKey(inputs('/work/a', { script: '-- oracle.lua, reworded\n-- another comment' })),
    'a reworded comment is the same run');
  assert.notEqual(key, mameCacheKey(inputs('/work/a', { sets: ['/roms/arcade/dkong.zip 1234 1700000099999'] })), 'a replaced set re-runs MAME');
  assert.notEqual(key, mameCacheKey(inputs('/work/a', { args: ['dkong', '-rompath', '/roms/arcade'] })), 'audio or not is part of the run');

  // --- the sets a run can read ---------------------------------------------
  const arcade = join(scratch, 'arcade');
  const bios = join(scratch, 'nes', 'bios');
  mkdirSync(arcade, { recursive: true });
  mkdirSync(join(scratch, 'nes', 'nes'), { recursive: true });
  mkdirSync(bios, { recursive: true });
  for (const name of ['mslug.zip', 'neogeo.zip', 'pacman.zip']) writeFileSync(join(arcade, name), name);
  writeFileSync(join(bios, 'firmware.bin'), 'x');
  writeFileSync(join(scratch, 'nes', 'nes', 'smb1.zip'), 'smb1');
  const mslug = setFiles([arcade], ['mslug', 'neogeo', undefined as unknown as string]);
  assert.deepEqual(mslug.map(line => line.split(' ')[0]), [join(arcade, 'mslug.zip'), join(arcade, 'neogeo.zip')],
    'the machine and its parent, never another machine\'s set');
  utimesSync(join(arcade, 'neogeo.zip'), new Date(), new Date(Date.now() + 5000));
  assert.notDeepEqual(setFiles([arcade], ['mslug', 'neogeo']), mslug, 'a touched parent set is a different input');
  const nes = setFiles([join(scratch, 'nes'), bios], ['nes'], 'nes:smb1');
  assert.ok(nes.some(line => line.startsWith(join(scratch, 'nes', 'nes', 'smb1.zip'))), 'the software title');
  assert.ok(nes.some(line => line.startsWith(join(bios, 'firmware.bin'))), 'every file of a bios path');

  // --- what is kept of a run -------------------------------------------------
  const work = join(scratch, 'work');
  mkdirSync(join(work, 'mame-nvram'), { recursive: true });
  for (const name of ['mame-300.rgb', 'mame-size.txt', 'mame-done.txt', 'mame.wav', 'mame-plan.lua', 'ours-300.rgba', 'plan.json']) {
    writeFileSync(join(work, name), name);
  }
  assert.deepEqual(mameCaptures(work).sort(), ['mame-300.rgb', 'mame-done.txt', 'mame-size.txt', 'mame.wav'],
    'MAME\'s captures, not its plan, its private directories or our side\'s files');
} finally {
  rmSync(scratch, { recursive: true, force: true });
}

console.log('compare mame-cache.spec: ok');
