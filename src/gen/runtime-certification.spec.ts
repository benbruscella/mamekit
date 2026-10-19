import assert from 'node:assert/strict';
import {
  isRuntimeCertified,
  RUNTIME_CERTIFICATIONS,
} from './runtime-certification.ts';

assert.deepEqual(Object.keys(RUNTIME_CERTIFICATIONS).sort(), [
  'c64',
  'c64p',
  'gauntlet',
  'marble',
  'mario',
  'mk',
  'mslug',
  'nbajam',
  'polepos',
  'qbert',
  'shinobi',
  'sinistar',
  'wardner',
]);

assert.equal(isRuntimeCertified('gauntlet', ['alpha:TILEMAP'], ['alpha.write16'], true), true);
assert.equal(
  isRuntimeCertified('gauntlet', ['alpha:TILEMAP', 'mcu:NEW_DEVICE'], [], true),
  false,
  'a certification must not hide a new hardware gap',
);
assert.equal(isRuntimeCertified('arkanoid', [], [], true), false);
// The PAL C64's contracts never mount a quickload, the one medium not yet
// generated; a gap beyond it is still a gap.
assert.equal(isRuntimeCertified('c64p', ['quickload:QUICKLOAD'], [], true), true);
assert.equal(isRuntimeCertified('c64p', ['quickload:QUICKLOAD', 'exp:C64_EXPANSION_SLOT'], [], true), false);
assert.equal(
  isRuntimeCertified('trackfld', ['vlm:VLM5030'], ['vlm.data_w'], true),
  false,
  'VLM5030 is generated now, so the speech gap it once excused must not be accepted',
);
// Galaga and Venture no longer keep a certification, so their old gaps fail closed.
assert.equal(isRuntimeCertified('galaga', ['mcu:MB8843'], [], true), false);
assert.equal(isRuntimeCertified('venture', [], [
  'soundbd:pia.read',
  'soundbd:pia.write',
  'soundbd:riot.io_read',
  'soundbd:riot.io_write',
  'soundbd:riot.ram_read',
  'soundbd:riot.ram_write',
], true), false);

console.log('runtime-certification.spec: 7 passed, 0 failed');
