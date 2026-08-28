import assert from 'node:assert/strict';
import { cartSvg, runConsole, shellForInterface, useCartShell, wrapCartTitle } from './console.ts';

assert.deepEqual(wrapCartTitle('Juno First'), ['Juno First']);
assert.deepEqual(wrapCartTitle('The Legend of Zelda', 10), ['The Legend', 'of Zelda']);
assert.deepEqual(wrapCartTitle('Supercalifragilistic', 8), ['Superca…']);
assert.equal(wrapCartTitle('A title whose second line cannot possibly fit', 12).length, 2);
assert.equal(typeof runConsole, 'function');

// The shelf draws the console's own cartridge, chosen from the software list's
// cartridge interface rather than from a hand-kept console list.
assert.notEqual(shellForInterface('a2600_cart'), shellForInterface('nes_cart'));
assert.equal(shellForInterface('coleco_cart'), shellForInterface('nes_cart'));
assert.equal(shellForInterface(undefined), shellForInterface('nes_cart'));

// Whichever shell is active, a tile keeps the parts the room drives by
// selector: the label rect the photo overlay resizes, and its frame.
for (const cartInterface of ['nes_cart', 'a2600_cart']) {
  useCartShell(cartInterface);
  const svg = cartSvg({ title: 'River Raid', sub: 'Activision · 1982', state: 'experimental', artKey: 'riveraid', code: 'riveraid.zip' });
  assert.ok(svg.includes('data-label-bg'), `${cartInterface}: the label is addressable`);
  assert.ok(svg.includes('data-label-frame'), `${cartInterface}: the frame is addressable`);
  assert.ok(svg.includes('viewBox="0 0 200 250"'), `${cartInterface}: one tile geometry`);
  assert.ok(svg.includes('River Raid'), `${cartInterface}: the title is drawn`);
}

// The two shells are genuinely different plastic, not a recolour of one shape.
useCartShell('nes_cart');
const nesShell = cartSvg({ title: 'X', sub: '', state: 'lit' });
useCartShell('a2600_cart');
const vcsShell = cartSvg({ title: 'X', sub: '', state: 'lit' });
assert.notEqual(nesShell, vcsShell);
assert.ok(nesShell.includes('#9a9a94'), 'the NES cart is grey plastic');
assert.ok(vcsShell.includes('#3a3a3d'), 'the 2600 cart is black plastic');
useCartShell(undefined);

console.log('console.spec: cartridge title layout and shell contract passed');
