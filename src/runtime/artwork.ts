// MAME cabinet artwork loading (browser-only). Bezel PNGs carry a transparent
// window where the CRT sits, so the shell can play a game inside the real
// cabinet art.
//
// There is exactly one way in: the `.webp` + geometry sidecar the build ships
// under /artwork/bezels (src/gen/bezel-artwork.ts, which calls the layout
// parser below — so build and browser cannot disagree about which PNG is the
// bezel). Two small same-origin requests, and if either is missing the game
// simply plays without a bezel.
//
// Deliberately no fallback to the archival pack on the bucket. There used to
// be one, and it is what let a broken deploy go unnoticed: the publish step
// stripped every sidecar, all 63 games quietly resumed pulling 7-8 MB packs
// off an object store with no CDN in front of it, and the only symptom was
// that the site felt slow. A missing bezel is a visible, cheap failure; a
// silent multi-megabyte download is neither. Ship the sidecar or show no
// bezel — scripts/deploy-pages.sh fails the deploy rather than publish a
// half-shipped pair.

import { webArtworkUrl } from './artwork-source.ts';

/**
 * Long-edge cap the build re-encodes a shipped bezel to, in pixels.
 *
 * It lives here rather than in the emitter because the view chooser needs it
 * too: a scan narrower than this is upscaled to fill the frame, so given two
 * otherwise equal cabinet views it is the one to avoid. src/gen/bezel-artwork.ts
 * imports it, so the number the build encodes at and the number the chooser
 * ranks by cannot drift apart.
 */
export const SHIPPED_BEZEL_WIDTH = 1600;

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

/**
 * One resolved cabinet view from a MAME `default.lay`.
 *
 * `file` names the art PNG inside the zip; every other field is geometry in
 * the lay's own view coordinates, which composeBezel() maps onto whatever
 * pixel size that art actually decodes to. Nothing here is tied to the zip,
 * so the build can resolve a view once and ship it as JSON beside a re-encoded
 * `.webp` — see BezelSidecar and src/gen/bezel-artwork.ts.
 */
export interface LayoutView {
  name: string;
  bounds?: ArtWindow;
  screen: ArtWindow;
  art: ArtWindow;
  file: string;
  /**
   * MAME `<image alphafile="...">`: a second member whose luminance is the
   * art's alpha channel. The window a bezel is drawn around lives here, not in
   * `file`, on every pack that uses it — the build composites the two and
   * ships one image, so nothing downstream needs it.
   */
  alphaFile?: string;
  rotate: number;
  tints: ArtTint[];
}

/**
 * What the build ships beside a bezel `.webp`: the lay view that produced it,
 * minus the `file` that named a zip member the site no longer serves.
 */
export type BezelSidecar = Omit<LayoutView, 'file' | 'alphaFile'>;

/**
 * A game's cabinet bezel, or null when the site ships none for it.
 *
 * Null is the whole error path: the caller draws no bezel and the game runs
 * regardless. Nothing here reaches for the archival pack — see the note at the
 * top of this file for why that fallback was removed rather than fixed.
 */
export async function loadArtwork(game: string): Promise<Artwork | null> {
  const shipped = await loadShippedBezel(game);
  if (!shipped) {
    console.warn(`no bezel shipped for ${game} (/artwork/bezels/${game}.webp + .json)`);
  }
  return shipped;
}

/**
 * The bezel the site ships for a game, or null when it ships none.
 *
 * The archival packs were the wrong shape to serve: digdug's is 7.4 MB holding
 * sixteen PNGs, of which `default.lay` names exactly one, and a zip has to
 * arrive whole before that one can be read — so the play page spent 4.1 s
 * pulling 7.4 MB off the bucket to use 1.7 MB of it. deriveBezelArtwork
 * resolves the view at build time and emits just that PNG as a capped `.webp`
 * beside its geometry, same-origin, which is what this reads.
 *
 * The sidecar is fetched first and gates the image: it is the small request
 * and it carries the screen window, without which the art cannot be placed —
 * so there is nothing to do with a `.webp` whose sidecar is missing.
 */
async function loadShippedBezel(game: string): Promise<Artwork | null> {
  try {
    const res = await fetch(webArtworkUrl(`bezels/${game}.json`));
    if (!res.ok) return null;
    const view = await res.json() as BezelSidecar;
    const art = await fetch(webArtworkUrl(`bezels/${game}.webp`));
    if (!art.ok) return null;
    return composeBezel(await createImageBitmap(await art.blob()), view);
  } catch {
    // Offline, or a pack whose lay never resolved at build time (pooyan ships
    // no default.lay at all). Cosmetic either way — never worth an exception
    // escaping into the caller's game-launch path.
    return null;
  }
}

/**
 * Map a lay view onto decoded art: rotate, crop to the view's bounds, and
 * express the screen window in that image's own pixels.
 *
 * Every step is a ratio of `view.art`, never an absolute pixel count, so this
 * is indifferent to what the art was decoded from — a 4000px PNG pulled out of
 * the zip or the 1600px `.webp` the build re-encodes from it land on the same
 * window, which is what lets the two paths share the arithmetic instead of
 * keeping two copies of it in step.
 */
export function composeBezel(
  source: ImageBitmap | HTMLCanvasElement,
  view: LayoutView | BezelSidecar,
): Artwork {
  let bmp: ImageBitmap | HTMLCanvasElement = source;
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
  const alphaImages = new Map<string, string>();
  for (const match of lay.matchAll(
    /<element\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/element>/g,
  )) {
    elementBodies.set(match[1], match[2]);
    // `[^>]*` greedily backtracks into `alphafile="`, whose tail is `file="`,
    // so a greedy match picks the mask and ships it as the bezel: Gauntlet's
    // was a flat grey frame. The word boundary is what keeps them apart.
    const file = /<image\s[^>]*?\bfile="([^"]+)"/.exec(match[2])?.[1];
    if (file) images.set(match[1], file);
    const alpha = /<image\s[^>]*?\balphafile="([^"]+)"/.exec(match[2])?.[1];
    if (alpha) alphaImages.set(match[1], alpha);
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
    const alphaFile = artElement ? alphaImages.get(artElement) : undefined;
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
    views.push({
      name,
      ...(bounds ? { bounds } : {}),
      screen,
      art,
      file,
      ...(alphaFile ? { alphaFile } : {}),
      rotate,
      tints,
    });
  }
  // A cabinet bezel is the art the screen sits *inside*. That is geometry, not
  // naming: a pack's views are named for whoever scanned them, so Green Beret's
  // two real bezels are "XBLA_Artwork" and "Krakerman_Artwork" while the view
  // that wins on document order is "Inst_Card_UK" -- an instruction card that
  // sits below the screen. Shipping that as the bezel put a wide strip of
  // rules text where the cabinet should be. Arkanoid shipped its instruction
  // card for the same reason.
  const frames = (view: LayoutView): boolean =>
    view.art.x <= view.screen.x &&
    view.art.y <= view.screen.y &&
    view.art.x + view.art.w >= view.screen.x + view.screen.w &&
    view.art.y + view.art.h >= view.screen.y + view.screen.h;
  // Not every pack has one -- Gunsmoke ships only a marquee that sits above the
  // screen -- so this ranks rather than filters, and such a pack keeps the view
  // it always had.
  const nameScore = (view: LayoutView): number =>
    /bezel/i.test(view.name) ? 2 : /upright/i.test(view.name) ? 1 : 0;
  // Last resort only, and deliberately a threshold rather than "prefer the
  // bigger scan": several packs carry the same cabinet scanned twice at
  // different regions, and ranking those by area swaps one good bezel for
  // another to no purpose. What does matter is a scan too small to ship --
  // Green Beret's two bezels are 852x480 and 3840x2160, and the build caps at
  // SHIPPED_BEZEL_WIDTH, so the first is upscaled and soft where the second is
  // not. Anything at or above the cap ranks alike and document order decides.
  const sharp = (view: LayoutView): boolean => view.art.w >= SHIPPED_BEZEL_WIDTH;
  views.sort((a, b) =>
    Number(frames(b)) - Number(frames(a)) ||
    nameScore(b) - nameScore(a) ||
    Number(sharp(b)) - Number(sharp(a)));
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

