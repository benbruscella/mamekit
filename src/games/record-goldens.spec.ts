import assert from 'node:assert/strict';
import { replaceGolden } from './record-goldens.ts';

const source = `export const demo = {
  game: 'demo',
  golden: { stale: true },
  tail: 'preserved',
};
`;

const updated = replaceGolden(source, {
  regions: { maincpu: 'deadbeef', 'device:rom': 'feedface' },
  checkpoints: { 60: { video: '11111111', state: '22222222' } },
  audio: {
    writes: 3,
    nonzeroWrites: 2,
    writeHash: '33333333',
    pcmHash: '44444444',
    rms: 0.25,
  },
});

assert.match(updated, /regions: \{/);
assert.match(updated, /'device:rom': 'feedface'/);
assert.match(updated, /60: \{/);
assert.doesNotMatch(updated, /stale/);
assert.match(updated, /tail: 'preserved'/);

console.log('record-goldens.spec: ok');
