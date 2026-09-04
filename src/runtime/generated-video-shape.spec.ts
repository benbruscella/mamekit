import assert from 'node:assert/strict';
import type { BoardIr } from '../ir/board.ts';
import { generatedDirectScreenShape } from './generated-video-shape.ts';

const machine = {
  execution: { screenUpdate: { handler: 'video_state.screen_update' } },
  handlers: [{
    ownerClass: 'video_state',
    method: 'screen_update',
    body: `
      for (int offs = 0; offs < m_videoram.bytes(); offs++) {
        auto color = m_colorram[((offs >> 2) & 0x07e0) | (offs & 0x001f)];
        rgb_t pen = (data & 0x80) ? pens[color >> 4] : rgb_t::black();
        rgb_t pen = (data & 0x80) ? pens[color & 0x0f] : rgb_t::black();
      }
    `,
  }],
} as BoardIr;

assert.equal(generatedDirectScreenShape(machine), 'berzerk-color-bitmap');
assert.equal(generatedDirectScreenShape({
  execution: {},
  handlers: [],
} as unknown as BoardIr), undefined);

console.log('generated-video-shape.spec: source-shaped renderer selection passed');
