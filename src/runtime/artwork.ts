// MAME cabinet artwork loading (browser-only). Artwork zips live in the
// user's gitignored .data/artwork/ dir (same treatment as .data/roms/) and are
// mirrored to the artwork bucket the deployed site loads them from
// (artwork-source.ts). Bezel PNGs carry a transparent window where the CRT
// sits — findWindow() locates it so the menu can composite covers and the
// shell can play the game inside the real cabinet art.

import { fetchArtworkBytes } from './artwork-source.ts';
import { readZip } from './zip.ts';

export interface ArtWindow { x: number; y: number; w: number; h: number }
export interface ArtTint {
  x: number;
  y: number;
  w: number;
  h: number;
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
/** bmp is pre-rotated per the lay's <orientation> (canvas when rotated) */
export interface Artwork {
  bmp: ImageBitmap | HTMLCanvasElement;
  window: ArtWindow | null;
  tints: ArtTint[];
}

interface LayoutView {
  name: string;
  bounds?: ArtWindow;
  screen: ArtWindow;
  art: ArtWindow;
  file: string;
  rotate: number;
  tints: ArtTint[];
}

/**
 * Load a game's artwork. The zip's MAME `default.lay` layout is the source
 * of truth when present (which PNG is the bezel + the exact screen bounds,
 * same data MAME renders from); the filename heuristic + alpha flood fill
 * are only the fallback for lay-less zips.
 */
export async function loadArtwork(game: string, prefer: 'marquee' | 'bezel'): Promise<Artwork | null> {
  try {
    const bytes = await fetchArtworkBytes(`${game}.zip`);
    if (!bytes) return null;
    const files = await readZip(bytes);

    const fromLay = await layArtwork(files);
    if (fromLay) return fromLay;

    const pngs = [...files.entries()].filter(([n]) => n.endsWith('.png'));
    if (!pngs.length) return null;
    const score = (n: string) => {
      const bezel = n.includes('bezel') ? (n.includes('upright') ? 3 : 2) : 0;
      const marquee = n.includes('marquee') ? 4 : 0;
      return prefer === 'marquee' ? Math.max(marquee, bezel) : (bezel ? bezel + 2 : marquee ? 1 : 0);
    };
    pngs.sort((a, b) => score(b[0]) - score(a[0]) || b[1].length - a[1].length);
    const bmp = await createImageBitmap(new Blob([pngs[0][1].slice().buffer], { type: 'image/png' }));
    return { bmp, window: findWindow(bmp), tints: [] };
  } catch {
    return null;
  }
}

/** Parse MAME default.lay: pick the bezel view, resolve its art PNG + screen bounds. */
async function layArtwork(files: Map<string, Uint8Array>): Promise<Artwork | null> {
  const layBytes = files.get('default.lay');
  if (!layBytes) return null;
  const view = parseArtworkLayout(new TextDecoder().decode(layBytes));
  if (!view) return null;

  const findFile = (name: string) => files.get(name) ?? files.get(name.toLowerCase());
  const png = findFile(view.file);
  if (!png) return null;
  let bmp: ImageBitmap | HTMLCanvasElement = await createImageBitmap(new Blob([png.slice().buffer], { type: 'image/png' }));
  // honor <orientation rotate="180"> (gyruss ships its bezel upside down):
  // view coords assume the rotated image, so rotate the pixels to match
  if (view.rotate === 180) {
    const c = document.createElement('canvas');
    c.width = bmp.width; c.height = bmp.height;
    const cx = c.getContext('2d')!;
    cx.translate(c.width, c.height);
    cx.rotate(Math.PI);
    cx.drawImage(bmp, 0, 0);
    bmp = c;
  }
  const artScaleX = bmp.width / view.art.w;
  const artScaleY = bmp.height / view.art.h;
  if (view.bounds) {
    const c = document.createElement('canvas');
    c.width = Math.round(view.bounds.w * artScaleX);
    c.height = Math.round(view.bounds.h * artScaleY);
    const cx = c.getContext('2d')!;
    cx.drawImage(
      bmp,
      (view.art.x - view.bounds.x) * artScaleX,
      (view.art.y - view.bounds.y) * artScaleY,
    );
    bmp = c;
  }
  // screen bounds are in view coordinates; map into bitmap pixels
  const sx = artScaleX, sy = artScaleY;
  const origin = view.bounds ?? view.art;
  return {
    bmp,
    window: {
      x: (view.screen.x - origin.x) * sx,
      y: (view.screen.y - origin.y) * sy,
      w: view.screen.w * sx,
      h: view.screen.h * sy,
    },
    tints: view.tints,
  };
}

/**
 * Resolve the cabinet view from a MAME layout. Both the original
 * `<bezel element="…">` syntax and current collection/element syntax occur in
 * artwork packs, so this deliberately supports both.
 */
export function parseArtworkLayout(source: string): LayoutView | null {
  const lay = source.replace(/<!--[\s\S]*?-->/g, '');
  const elementBodies = new Map<string, string>();
  const images = new Map<string, string>();
  for (const match of lay.matchAll(
    /<element\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/element>/g,
  )) {
    elementBodies.set(match[1], match[2]);
    const file = /<image\s+[^>]*file="([^"]+)"/.exec(match[2])?.[1];
    if (file) images.set(match[1], file);
  }

  const views: LayoutView[] = [];
  for (const match of lay.matchAll(/<view\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/view>/g)) {
    const name = match[1];
    const body = match[2];
    const bounds = layoutBounds(/^\s*<bounds\b[^>]*(?:\/>|>[\s\S]*?<\/bounds>)/.exec(body)?.[0]) ?? undefined;
    const screenTag = /<screen\b[^>]*>[\s\S]*?<\/screen>/.exec(body)?.[0];
    const screen = layoutBounds(screenTag);
    if (!screen?.w || !screen.h) continue;

    let artTag: string | undefined;
    let artElement: string | undefined;
    for (const kind of ['bezel', 'backdrop'] as const) {
      const legacy = [...body.matchAll(new RegExp(
        `<${kind}\\s+[^>]*element="([^"]+)"[^>]*>[\\s\\S]*?<\\/${kind}>`,
        'g',
      ))].sort((left, right) => {
        const score = (candidate: RegExpMatchArray): number => {
          const element = candidate[1] ?? '';
          const file = images.get(element) ?? '';
          return /bezel/i.test(element) || /bezel/i.test(file) ? 1 : 0;
        };
        return score(right) - score(left);
      })[0];
      if (legacy) {
        artTag = legacy[0];
        artElement = legacy[1];
        break;
      }
    }
    if (!artTag) {
      const bezelCollection = /<collection\s+name="Bezel"[^>]*>([\s\S]*?)<\/collection>/i
        .exec(body)?.[1];
      const placed = placedLayoutElements(bezelCollection ?? body)
        .find(candidate => images.has(candidate.ref) &&
          (/bezel/i.test(candidate.ref) || Boolean(bezelCollection)));
      if (placed) {
        artTag = placed.tag;
        artElement = placed.ref;
      }
    }
    const art = layoutBounds(artTag);
    const file = artElement ? images.get(artElement) : undefined;
    if (!art?.w || !art.h || !file) continue;

    const overlayCollection = /<collection\s+name="Overlay"[^>]*>([\s\S]*?)<\/collection>/i
      .exec(body)?.[1];
    const overlayPlacement = overlayCollection
      ? placedLayoutElements(overlayCollection).find(candidate =>
        /\bblend="multiply"/.test(candidate.tag))
      : undefined;
    const tints = overlayPlacement
      ? layoutTints(
        elementBodies.get(overlayPlacement.ref) ?? '',
        layoutBounds(overlayPlacement.tag),
        screen,
      )
      : [];
    const rotate = Number(
      /<orientation\s+[^>]*rotate="(\d+)"/.exec(artTag ?? '')?.[1] ?? 0,
    );
    views.push({ name, ...(bounds ? { bounds } : {}), screen, art, file, rotate, tints });
  }
  const viewScore = (view: LayoutView): number =>
    /bezel/i.test(view.name) ? 2 : /upright/i.test(view.name) ? 1 : 0;
  views.sort((a, b) => viewScore(b) - viewScore(a));
  return views[0] ?? null;
}

function placedLayoutElements(source: string): { ref: string; tag: string }[] {
  return [...source.matchAll(
    /<element\s+[^>]*ref="([^"]+)"[^>]*>[\s\S]*?<\/element>/g,
  )].map(match => ({ ref: match[1], tag: match[0] }));
}

function layoutBounds(source: string | undefined): ArtWindow | null {
  const raw = /<bounds\s+([^>]*?)(?:\/>|>)/.exec(source ?? '')?.[1];
  if (!raw) return null;
  const attrs: Record<string, number> = {};
  for (const match of raw.matchAll(/(\w+)="(-?[\d.]+)"/g)) {
    attrs[match[1]] = Number(match[2]);
  }
  const x = attrs.x ?? attrs.left ?? 0;
  const y = attrs.y ?? attrs.top ?? 0;
  const w = attrs.width ?? (
    Number.isFinite(attrs.right) ? attrs.right - x : Number.NaN
  );
  const h = attrs.height ?? (
    Number.isFinite(attrs.bottom) ? attrs.bottom - y : Number.NaN
  );
  return { x, y, w, h };
}

function layoutTints(
  elementBody: string,
  placement: ArtWindow | null,
  screen: ArtWindow,
): ArtTint[] {
  if (!placement?.w || !placement.h) return [];
  const rects = [...elementBody.matchAll(/<rect\b[^>]*>([\s\S]*?)<\/rect>/g)]
    .map(match => {
      const bounds = layoutBounds(match[0]);
      const colorTag = /<color\s+([^>]*?)(?:\/>|>)/.exec(match[1])?.[1] ?? '';
      const color: Record<string, number> = {};
      for (const component of colorTag.matchAll(/(\w+)="([\d.]+)"/g)) {
        color[component[1]] = Number(component[2]);
      }
      return bounds?.w && bounds.h ? { bounds, color } : null;
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
  if (!rects.length) return [];
  const left = Math.min(...rects.map(rect => rect.bounds.x));
  const top = Math.min(...rects.map(rect => rect.bounds.y));
  const right = Math.max(...rects.map(rect => rect.bounds.x + rect.bounds.w));
  const bottom = Math.max(...rects.map(rect => rect.bounds.y + rect.bounds.h));
  const width = right - left;
  const height = bottom - top;
  if (!(width > 0 && height > 0)) return [];
  return rects.map(({ bounds, color }) => {
    const viewX = placement.x + (bounds.x - left) / width * placement.w;
    const viewY = placement.y + (bounds.y - top) / height * placement.h;
    return {
      x: (viewX - screen.x) / screen.w,
      y: (viewY - screen.y) / screen.h,
      w: bounds.w / width * placement.w / screen.w,
      h: bounds.h / height * placement.h / screen.h,
      red: color.red ?? 1,
      green: color.green ?? 1,
      blue: color.blue ?? 1,
      alpha: color.alpha ?? 1,
    };
  }).filter(tint =>
    tint.alpha > 0 &&
    (tint.red !== 1 || tint.green !== 1 || tint.blue !== 1 || tint.alpha !== 1));
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
