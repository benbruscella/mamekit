// MAME cabinet artwork loading (browser-only). Artwork zips live in the
// user's gitignored artwork/ dir (same copyright treatment as roms/) and are
// served at /artwork/<game>.zip. Bezel PNGs carry a transparent window where
// the CRT sits — findWindow() locates it so the menu can composite covers
// and the shell can play the game inside the real cabinet art.

import { readZip } from './zip.ts';

export interface ArtWindow { x: number; y: number; w: number; h: number }
export interface Artwork { bmp: ImageBitmap; window: ArtWindow | null }

/**
 * Load a game's artwork PNG. `prefer` biases the pick: menu covers like
 * marquees; in-game surrounds need a bezel (and a transparent window).
 */
export async function loadArtwork(game: string, prefer: 'marquee' | 'bezel'): Promise<Artwork | null> {
  try {
    const res = await fetch(`/artwork/${encodeURIComponent(game)}.zip`);
    if (!res.ok) return null;
    const files = await readZip(new Uint8Array(await res.arrayBuffer()));
    const pngs = [...files.entries()].filter(([n]) => n.endsWith('.png'));
    if (!pngs.length) return null;
    const score = (n: string) => {
      const bezel = n.includes('bezel') ? (n.includes('upright') ? 3 : 2) : 0;
      const marquee = n.includes('marquee') ? 4 : 0;
      return prefer === 'marquee' ? Math.max(marquee, bezel) : (bezel ? bezel + 2 : marquee ? 1 : 0);
    };
    pngs.sort((a, b) => score(b[0]) - score(a[0]) || b[1].length - a[1].length);
    const bmp = await createImageBitmap(new Blob([pngs[0][1].slice().buffer], { type: 'image/png' }));
    return { bmp, window: findWindow(bmp) };
  } catch {
    return null;
  }
}

/** Bounding box of the transparent CRT cut-out, found by flood fill from the center. */
export function findWindow(bmp: ImageBitmap): ArtWindow | null {
  const scale = Math.min(1, 320 / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale)), h = Math.max(1, Math.round(bmp.height * scale));
  const probe = document.createElement('canvas');
  probe.width = w; probe.height = h;
  const pctx = probe.getContext('2d', { willReadFrequently: true })!;
  pctx.drawImage(bmp, 0, 0, w, h);
  const alpha = pctx.getImageData(0, 0, w, h).data;
  const clear = (x: number, y: number) => alpha[(y * w + x) * 4 + 3] < 16;
  const cx = w >> 1, cy = h >> 1;
  if (!clear(cx, cy)) return null; // center is painted — no window (marquee art etc.)
  const seen = new Uint8Array(w * h);
  const stack = [cy * w + cx];
  seen[stack[0]] = 1;
  let minX = cx, maxX = cx, minY = cy, maxY = cy;
  while (stack.length) {
    const p = stack.pop()!;
    const x = p % w, y = (p / w) | 0;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]] as const) {
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      const np = ny * w + nx;
      if (!seen[np] && clear(nx, ny)) { seen[np] = 1; stack.push(np); }
    }
  }
  return { x: minX / scale, y: minY / scale, w: (maxX - minX + 1) / scale, h: (maxY - minY + 1) / scale };
}
