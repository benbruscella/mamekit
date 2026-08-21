// Where the app looks for presentation artwork: MAME bezel zips, flyers,
// marquees, cabinets and cartridge scans.
//
// These scans are ~700 MB. dist/ used to carry a copy of the lot, which is
// most of GitHub Pages' 1 GB budget spent on files that never change — so the
// deployed site ships none of them and the browser loads them straight from
// the same DreamObjects bucket the ROM mirror uses (ARTWORK_ROOT in
// .data/Makefile keeps artwork/ in sync with .data/artwork/).
//
// Paths are the .data/artwork layout exactly — "dkong.zip",
// "covers/dkong.png", "media/marquees/dkong.png", "carts/nes/smb3u.jpg" — so
// the bucket, the dev mount and the disk tree never disagree about where a
// scan lives.

/** Bucket prefix holding the artwork tree, matching ARTWORK_ROOT in .data/Makefile. */
export const ARTWORK_BUCKET_BASE = 'https://mamekit.s3.us-east-005.dream.io/artwork';

/** Per-segment encoding: cartridge scans carry spaces, brackets and parentheses. */
export function encodeArtworkPath(path: string): string {
  return path.split('/').map(encodeURIComponent).join('/');
}

/** The CDN URL for one artwork path — what an <img> loads. */
export function artworkUrl(path: string): string {
  return `${ARTWORK_BUCKET_BASE}/${encodeArtworkPath(path)}`;
}

/** The dev server's /artwork mount, relative to the /app/ page (src/dev.ts). */
export function localArtworkUrl(path: string): string {
  return `../artwork/${encodeArtworkPath(path)}`;
}

// The dev server mounts .data/artwork at /artwork, so a developer's local
// scans answer without a round trip — and without CORS, which the bucket
// grants to the deployed origin only. A static deploy has no such mount: the
// first local miss that the bucket then serves proves we are on one, and the
// mount is not tried again for the rest of the session.
let localMount = true;

/** Artwork bytes for one path, or null when neither source had it. */
export async function fetchArtworkBytes(path: string): Promise<Uint8Array | null> {
  if (localMount) {
    const local = await fetch(localArtworkUrl(path)).catch(() => null);
    if (local?.ok) return new Uint8Array(await local.arrayBuffer());
  }
  // CORS failure (localhost is not on the bucket's allowlist), offline or a
  // scan the bucket does not hold: a miss is never an error here — every
  // caller has a fallback that doesn't need artwork at all.
  const res = await fetch(artworkUrl(path)).catch(() => null);
  if (!res?.ok) return null;
  localMount = false;
  return new Uint8Array(await res.arrayBuffer());
}

/**
 * Artwork as a decoded image, preferring the byte path above over pointing an
 * <img> straight at the CDN. The extra step buys an untainted canvas: the
 * cover shelf samples flyer pixels to find the scanner matte, and a
 * cross-origin <img> makes that read throw.
 *
 * The bucket grants CORS to the deployed origin only, so the byte path is the
 * one thing here that a CORS rule can break. It must never take the covers
 * down with it: a miss falls back to a plain <img>, which needs no CORS at
 * all. That costs the matte crop, not the cover.
 */
export async function fetchArtworkImage(path: string): Promise<HTMLImageElement | null> {
  const bytes = await fetchArtworkBytes(path);
  if (!bytes) return decodeImage(artworkUrl(path));
  const url = URL.createObjectURL(new Blob([bytes.slice().buffer]));
  try {
    return await decodeImage(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function decodeImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = url;
  });
}
