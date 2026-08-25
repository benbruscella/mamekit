import assert from 'node:assert/strict';
import { consoleDeckSvg } from './console-art.ts';

/** Every `url(#x)` a document uses, and every `id="x"` it defines. */
function ids(svg: string): { defined: Set<string>; used: Set<string> } {
  return {
    defined: new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])),
    used: new Set([...svg.matchAll(/url\(#([^)]+)\)/g)].map(m => m[1])),
  };
}

/** Every rect in the drawing, as numbers. */
function rects(svg: string): { x: number; y: number; w: number; h: number }[] {
  return [...svg.matchAll(/<rect[^>]*\sx="(-?[\d.]+)"[^>]*\sy="(-?[\d.]+)"[^>]*\swidth="([\d.]+)"[^>]*\sheight="([\d.]+)"/g)]
    .map(m => ({ x: +m[1], y: +m[2], w: +m[3], h: +m[4] }));
}

// --- the box it was asked for ---------------------------------------------------------

const menu = consoleDeckSvg(300, 400, { caption: '▸ ENTER TO INSERT CARTS', idPrefix: 'menu', top: 136 });
assert.match(menu, /^<svg viewBox="0 0 300 400"/);
assert.match(menu, /role="img"/);
assert.ok(menu.trimEnd().endsWith('</svg>'));

// --- gradient ids are namespaced -------------------------------------------------------
// Two decks on one page is the case this exists for: ids are document-global, so
// an unprefixed gradient would have the second deck painting with the first
// one's fill. Both must also actually resolve — a typo'd url(#…) renders black.

const hero = consoleDeckSvg(230, 132, { idPrefix: 'hero' });
for (const svg of [menu, hero]) {
  const { defined, used } = ids(svg);
  for (const ref of used) {
    assert.ok(defined.has(ref), `url(#${ref}) has no matching id in the same document`);
  }
}
const menuIds = ids(menu).defined;
const heroIds = ids(hero).defined;
for (const id of menuIds) assert.ok(!heroIds.has(id), `id "${id}" is shared by two decks on one page`);
assert.ok([...menuIds].every(id => id.startsWith('menu-')));
assert.ok([...heroIds].every(id => id.startsWith('hero-')));

// --- nothing escapes the box -----------------------------------------------------------
// The top surface is drawn ABOVE the front face, so a deck placed too near the
// top of its box would hang its lid outside the viewBox and be clipped.

for (const [svg, W, H] of [[menu, 300, 400], [hero, 230, 132]] as const) {
  for (const r of rects(svg)) {
    assert.ok(r.x >= 0 && r.x + r.w <= W, `rect spans ${r.x}..${r.x + r.w}, outside 0..${W}`);
    assert.ok(r.y >= 0 && r.y + r.h <= H, `rect spans ${r.y}..${r.y + r.h}, outside 0..${H}`);
  }
}

// --- the caption is the caller's, and optional -----------------------------------------

assert.ok(menu.includes('▸ ENTER TO INSERT CARTS'));
assert.equal(menu.split('▸ ENTER TO INSERT CARTS').length - 1, 1, 'caption drawn once');
assert.ok(!hero.includes('ENTER TO INSERT'), 'the room hero asks for no caption and gets none');

// --- the wordmark is the neutral one ---------------------------------------------------
// The drawing is deliberately free of trademarked marks; if that ever changes it
// should be a decision, not a drift.

assert.ok(hero.includes('CONTROL DECK'));
assert.ok(!/nintendo/i.test(hero));

// --- proportions hold at any size ------------------------------------------------------
// The deck is one shape scaled, not a layout that reflows: at twice the width
// every feature doubles, which is what keeps it readable at 120px and at 300.

const small = consoleDeckSvg(200, 200, { idPrefix: 'a' });
const big = consoleDeckSvg(400, 400, { idPrefix: 'a' });
const smallRects = rects(small);
const bigRects = rects(big);
assert.equal(smallRects.length, bigRects.length);
for (const [i, r] of smallRects.entries()) {
  assert.ok(Math.abs(bigRects[i].w - r.w * 2) < 0.2, `rect ${i} width did not scale with the box`);
  assert.ok(Math.abs(bigRects[i].x - r.x * 2) < 0.2, `rect ${i} x did not scale with the box`);
}

// --- deterministic ---------------------------------------------------------------------
// Nothing here may depend on time or randomness: the drawing is inlined into
// generated pages, so an unstable string would churn every build.

assert.equal(consoleDeckSvg(300, 400, { idPrefix: 'menu', top: 136, caption: 'x' }),
  consoleDeckSvg(300, 400, { idPrefix: 'menu', top: 136, caption: 'x' }));

console.log('console-art.spec: front-loader deck scales, namespaces its ids and stays inside its box');
