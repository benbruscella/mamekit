import assert from 'node:assert/strict';
import {
  isRuntimeCertified,
  RUNTIME_CERTIFICATIONS,
} from './runtime-certification.ts';

assert.deepEqual(Object.keys(RUNTIME_CERTIFICATIONS).sort(), [
  'carnival',
  'digdug',
  'galaga',
  'gauntlet',
  'mario',
  'mslug',
  'outrun',
  'polepos',
  'pooyan',
  'qbert',
  'rocnrope',
  'simpsons',
  'sinistar',
  'spyhunt',
  'timeplt',
  'tmnt',
  'trackfld',
  'tutankhm',
  'venture',
  'wardner',
]);

assert.equal(isRuntimeCertified('galaga', ['mcu:MB8843'], [], true), true);
assert.equal(
  isRuntimeCertified('galaga', ['mcu:MB8843', 'new:UNKNOWN_DEVICE'], [], true),
  false,
  'a certification must not hide a new hardware gap',
);
assert.equal(isRuntimeCertified('arkanoid', [], [], true), false);
assert.equal(
  isRuntimeCertified('trackfld', ['vlm:VLM5030'], ['vlm.data_w'], true),
  true,
);
assert.equal(isRuntimeCertified('venture', [], [
  'soundbd:pia.read',
  'soundbd:pia.write',
  'soundbd:riot.io_read',
  'soundbd:riot.io_write',
  'soundbd:riot.ram_read',
  'soundbd:riot.ram_write',
], true), true);

console.log('runtime-certification.spec: 6 passed, 0 failed');
