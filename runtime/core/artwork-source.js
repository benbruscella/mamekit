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
export function encodeArtworkPath(path) {
    return path.split('/').map(encodeURIComponent).join('/');
}
/** The bucket URL for one artwork path — archival scans and bezel zips. */
export function artworkUrl(path) {
    return `${ARTWORK_BUCKET_BASE}/${encodeArtworkPath(path)}`;
}
/**
 * The site's own URL for a `.webp` sibling, shipped into dist/artwork by the
 * build (`shipWebArtwork` in src/gen/generate.ts).
 *
 * Root-relative, because dist's root is the site root on Pages and under
 * `--serve` alike — so localhost and the deployed site read the same bytes
 * from the same place, which a `.data` mount never managed.
 */
export function webArtworkUrl(path) {
    return `/artwork/${encodeArtworkPath(path)}`;
}
/**
 * The two paths to one artwork image, best first.
 *
 * Every displayed scan is far larger than the space it is drawn into — covers
 * average 1279 KB and land in a 300x400 canvas, marquees 545 KB in a 140px
 * strip, cabinets 550 KB in a 120px thumbnail — and the menu asks for all of
 * them at once from a bucket that will not negotiate HTTP/2, so the browser
 * runs ~6 connections against a ~1.8s TTFB. `make images` builds a `.webp`
 * sibling beside each scan (148.4 MB -> 10.7 MB across the three trees), and
 * that sibling is what every caller should load.
 *
 * The scan stays the fallback rather than the source: one added without a
 * sibling still renders, just slowly, and `make images-missing` names it.
 */
export function artworkPaths(path) {
    return [path.replace(/\.png$/, '.webp'), path];
}
/** Both URLs for one image, best first: the site's sibling, then the bucket scan. */
export function artworkSources(path) {
    const [web, archival] = artworkPaths(path);
    return [webArtworkUrl(web), artworkUrl(archival)];
}
/**
 * One image, decoded, preferring the sibling the site ships.
 *
 * Same origin buys more than latency: no CORS, and an untainted canvas without
 * the fetch -> Blob -> re-decode the bucket path needs, so the cover shelf can
 * sample flyer pixels straight from a plain <img>. Only the bucket fallback
 * still pays for that round trip.
 */
export async function loadArtworkImage(path) {
    const [web] = artworkSources(path);
    return (await decodeImage(web)) ?? (await fetchArtworkImage(artworkPaths(path)[1]));
}
// The bucket is the only source, on localhost and on the deployed site alike.
// A local .data mount used to be probed first, which cost every scan a wasted
// same-origin round trip: the "stop probing" flag only cleared after a bucket
// response, and a shelf requests all its covers at once, so every one of them
// had already issued its 404 before the first reply landed. The menu opened on
// 40+ failed requests and as many console errors, and a developer's scans
// silently diverged from what visitors actually see.
/** Artwork bytes for one path, or null when the bucket did not have it. */
export async function fetchArtworkBytes(path) {
    // CORS failure (an origin outside the bucket's allowlist), offline or a scan
    // the bucket does not hold: a miss is never an error here — every caller has
    // a fallback that doesn't need artwork at all.
    const res = await fetch(artworkUrl(path)).catch(() => null);
    if (!res?.ok)
        return null;
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
export async function fetchArtworkImage(path) {
    const bytes = await fetchArtworkBytes(path);
    if (!bytes)
        return decodeImage(artworkUrl(path));
    const url = URL.createObjectURL(new Blob([bytes.slice().buffer]));
    try {
        return await decodeImage(url);
    }
    finally {
        URL.revokeObjectURL(url);
    }
}
function decodeImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = url;
    });
}
