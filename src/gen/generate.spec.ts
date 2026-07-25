import assert from 'node:assert/strict';
import { handlerOwnsSharedRam } from './generate.ts';

assert.equal(
  handlerOwnsSharedRam(
    'm_screen->update_partial(m_screen->vpos());\nm_spriteram[offset] = data;',
    'spriteram',
  ),
  true,
);
assert.equal(
  handlerOwnsSharedRam(
    'm_videoram[offset] = data;\nm_tilemap->mark_tile_dirty(offset);',
    'videoram',
  ),
  true,
);
assert.equal(handlerOwnsSharedRam('palette.write8(offset, data);', 'palette'), false);
assert.equal(handlerOwnsSharedRam('m_spriteram[offset] = data;', ''), false);

console.log('generate.spec: shared RAM write ownership passed');
