import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileUnsupportedSets, processRomAudit } from './process-rom-audit.ts';

const root = mkdtempSync(join(tmpdir(), 'rom-audit-spec-'));
const input = join(root, '_new');
const output = join(root, 'c64');
const mame = join(root, 'mame');
const hash = (data: string | Uint8Array): string => createHash('sha1').update(data).digest('hex');
try {
  mkdirSync(join(input, 'nested'), { recursive: true });
  mkdirSync(join(mame, 'hash'), { recursive: true });
  for (const file of ['src/mame/commodore/c64.cpp', 'src/devices/bus/cbmiec/c1541.cpp']) {
    mkdirSync(join(mame, file, '..'), { recursive: true });
    writeFileSync(join(mame, file), '');
  }
  mkdirSync(output);
  const xml = '<softwarelist><software name="known"/><software name="broken" supported="no"/></softwarelist>';
  writeFileSync(join(mame, 'hash/c64_cart.xml'), xml);
  const entries = [['known.bin', 'known'], ['broken.bin', 'broken'], ['other.bin', '']] as const;
  const rows = entries.map(([file, name], index) => {
    const data = Buffer.from([index, 1, 2, 3]);
    writeFileSync(join(input, 'nested', file), data);
    return { path: `nested/${file}`, extension: '.bin', bytes: data.length, sha1: hash(data),
      softwareRomMatches: name ? [{ list: 'c64_cart', name }] : [], firmwareMatches: [] };
  });
  writeFileSync(join(input, 'bad.zip'), 'broken archive');
  writeFileSync(join(input, 'readme.txt'), 'preserve this');
  const auditPath = join(output, 'audit.json');
  const audit = { input, mameSource: mame, lists: { c64_cart: hash(xml) }, summary: {}, files: rows };
  writeFileSync(auditPath, JSON.stringify(audit));
  mkdirSync(join(output, 'c64_carts'));
  writeFileSync(join(output, 'c64_carts/broken.zip'), 'preserve verified set');
  writeFileSync(join(output, 'media-import.json'), JSON.stringify({ entries: [
    { list: 'c64_cart', name: 'broken', archive: 'c64_carts/broken.zip' },
  ] }));
  await processRomAudit({ auditPath });
  assert.equal(readFileSync(join(output, 'not-supported/mame-unsupported/sets/c64_carts/broken.zip'), 'utf8'), 'preserve verified set');
  assert.equal(JSON.parse(readFileSync(join(output, 'media-import.json'), 'utf8')).entries[0].archive,
    'not-supported/mame-unsupported/sets/c64_carts/broken.zip');
  assert.equal(fileUnsupportedSets(output), 0, 'already filed unsupported sets stay in place');
  assert.deepEqual(readdirSync(input), [], 'processed inputs leave the inbox, including nested folders');
  assert.deepEqual(readFileSync(join(output, 'c64_carts/originals/nested/known.bin')), Buffer.from([0, 1, 2, 3]));
  assert.ok(existsSync(join(output, 'not-supported/mame-unsupported/c64_carts/nested/broken.bin')));
  assert.ok(existsSync(join(output, 'not-supported/unmatched/c64_carts/nested/other.bin')));
  assert.equal(readFileSync(join(output, 'not-supported/format-issue/other/bad.zip'), 'utf8'), 'broken archive');
  assert.equal(readFileSync(join(output, 'source-files/readme.txt'), 'utf8'), 'preserve this');
  const journal = readFileSync(join(output, 'file-moves.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line));
  assert.equal(journal.filter(row => row.phase === 'moved').length, 5);
  // A stale source fingerprint is refused before any new input is moved.
  writeFileSync(join(input, 'new.bin'), 'new data');
  writeFileSync(join(mame, 'hash/c64_cart.xml'), xml + '\n');
  await assert.rejects(processRomAudit({ auditPath }), /MAME list changed/);
  assert.equal(readFileSync(join(input, 'new.bin'), 'utf8'), 'new data');
  writeFileSync(join(mame, 'hash/c64_cart.xml'), xml);
  writeFileSync(auditPath, JSON.stringify({ ...audit, files: [{ ...rows[0], path: 'new.bin' }] }));
  await assert.rejects(processRomAudit({ auditPath }), /differs from audit/);
  assert.ok(existsSync(join(input, 'new.bin')));
} finally {
  rmSync(root, { recursive: true, force: true });
}
console.log('process-rom-audit.spec: recursive filing, quarantine, preservation, journal and stale-input checks passed');
