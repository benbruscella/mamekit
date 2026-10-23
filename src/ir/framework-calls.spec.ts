import assert from 'node:assert/strict';
import { isDeclaredFrameworkNoOp, isVideoPlanCall } from './framework-calls.ts';

// A whole debugger registration chain is one declared call, by its root.
assert.equal(isDeclaredFrameworkNoOp('state_add().callimport().callexport().formatstr().noshow'), true);
assert.equal(isDeclaredFrameworkNoOp('save_item'), true);
// Methods are matched on the last element, whatever the object.
assert.equal(isDeclaredFrameworkNoOp('m_k052109_cb.resolve'), true);
assert.equal(isDeclaredFrameworkNoOp('machine().bookkeeping().coin_counter_w'), true);
assert.equal(isVideoPlanCall('m_fg_tilemap.set_transparent_pen'), true);
// An accessor only hands out an object; the call on it is what counts.
assert.equal(isDeclaredFrameworkNoOp('machine().bookkeeping'), true);
assert.equal(isDeclaredFrameworkNoOp('tilemap_get_info_delegate'), true);
assert.equal(isDeclaredFrameworkNoOp('machine().tilemap().create'), true);

// Calls MAME makes for their effect stay gaps, however framework-shaped:
// a coin lockout refuses coins, a mute silences the machine, and a partial
// update draws the lines so far.
assert.equal(isDeclaredFrameworkNoOp('machine().bookkeeping().coin_lockout_w'), false);
assert.equal(isDeclaredFrameworkNoOp('machine().sound().system_mute'), false);
assert.equal(isDeclaredFrameworkNoOp('screen().update_partial'), false);
// The plan's tilemap layers carry set_scrolldx/set_scrolldy themselves
// (video-compiler.ts tilemapScrollDelta).
assert.equal(isVideoPlanCall('m_bg_tilemap.set_scrolldx'), true);
// A tilemap method the compiler does not read stays a gap.
assert.equal(isVideoPlanCall('m_tilemap[1].set_blitter'), false);

console.log('framework-calls.spec: declared no-ops stay narrow');
