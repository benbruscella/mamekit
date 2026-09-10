import assert from 'node:assert/strict';
import { join } from 'node:path';
import { hiscoreTable, parseHiscoreDat } from './hiscore-dat.ts';

// The grammar, on a fragment shaped like the real file: comments, a cluster
// of headers sharing rows, a share row, a prefill byte, a delay, and a
// cluster the plugin would refuse.
const tables = parseHiscoreDat(`
; header comment
;@s:namco/galaga.cpp

galaga:
galaga84:  ; missing
@:maincpu,program,8a20,2d,00,18
@:maincpu,program,83ed,6,00,24

asteroidb2:
@:maincpu,program,001c,35,00,00
@delay=5

ertictac:
@:maincpu,:ram/share,bb1c,2e,46,ca,ff

nes,smb:
@:maincpu,program,07d7,06,00,00

odd:
@:maincpu,videoram,0000,10,00,00

broken:
@:maincpu,program,zz,10,00,00
`);
assert.deepEqual(tables.get('galaga'), {
  rows: [
    { cpu: 'maincpu', space: 'program', address: 0x8a20, length: 0x2d, first: 0x00, last: 0x18 },
    { cpu: 'maincpu', space: 'program', address: 0x83ed, length: 6, first: 0x00, last: 0x24 },
  ],
});
assert.equal(tables.get('galaga84'), tables.get('galaga'), 'consecutive headers share one cluster');
assert.deepEqual(tables.get('asteroidb2'), {
  delaySeconds: 5,
  rows: [{ cpu: 'maincpu', space: 'program', address: 0x1c, length: 0x35, first: 0, last: 0 }],
});
assert.deepEqual(tables.get('ertictac'), {
  rows: [{ cpu: 'maincpu', share: 'ram', address: 0xbb1c, length: 0x2e, first: 0x46, last: 0xca, fill: 0xff }],
});
assert.deepEqual(tables.get('nes,smb')?.rows.length, 1, 'software-list entries key as game,software');
assert.deepEqual(tables.get('odd')?.rows[0]?.space, 'videoram', 'whether a space exists is the board\'s call, not the parser\'s');
assert.equal(tables.get('broken'), undefined, 'a cluster with an unreadable row is dropped whole');
assert.equal(tables.get('ertictaca'), undefined);

// The real file, when a MAME checkout is beside the repository.
const mameSrc = process.env.MAME_SRC ?? join(import.meta.dirname, '../../../mame');
const pacman = hiscoreTable(mameSrc, 'pacman');
if (pacman) {
  assert.deepEqual(pacman.rows[0], { cpu: 'maincpu', space: 'program', address: 0x4e88, length: 4, first: 0, last: 0 });
  assert.ok(hiscoreTable(mameSrc, 'joust')?.rows.length, 'joust is in the file');
  assert.equal(hiscoreTable(mameSrc, 'no-such-machine'), undefined);
}
assert.equal(hiscoreTable('/nowhere', 'pacman'), undefined, 'a missing file is an empty table set');

console.log(`hiscore-dat.spec: grammar and ${pacman ? 'checkout' : 'fragment'} lookups passed`);
