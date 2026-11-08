import assert from 'node:assert/strict';
import { marble } from "./marble.game.ts";
import { gameSourceGraph } from "./test-support.ts";
import { lowerDriverMemberPointers } from '../mame/member-pointers.ts';

gameSourceGraph(marble);

// atarisy1's screen update masks a motion-object pixel with a class constant:
// `mo[x] & atari_motion_objects_device::PRIORITY_MASK`. That `&` is binary, not
// the address of a member; lowered as one it read `mo[x] "PRIORITY_MASK"` and
// the whole screen update failed to compile. A real member pointer still lowers.
assert.equal(
  lowerDriverMemberPointers(
    'if (mo[x] & atari_motion_objects_device::PRIORITY_MASK) f(&atarisy1_state::screen_update);',
    ['atari_motion_objects_device', 'atarisy1_state'],
  ),
  'if (mo[x] & atari_motion_objects_device::PRIORITY_MASK) f("screen_update");',
);
console.log('marble.game.spec: source machine graph and masked class constant passed');
