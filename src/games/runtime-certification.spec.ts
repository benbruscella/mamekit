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
  'sinistar',
  'spyhunt',
  'timeplt',
  'tutankhm',
]);

assert.equal(isRuntimeCertified('galaga', ['mcu:MB8843'], [], true), true);
assert.equal(
  isRuntimeCertified('galaga', ['mcu:MB8843', 'new:UNKNOWN_DEVICE'], [], true),
  false,
  'a certification must not hide a new hardware gap',
);
assert.equal(isRuntimeCertified('arkanoid', [], [], true), false);
assert.equal(isRuntimeCertified('venture', [], [], true), false);

console.log('runtime-certification.spec: 5 passed, 0 failed');
