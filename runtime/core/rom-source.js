// Where the app looks for a romset or cartridge dump it does not already have.
//
// Keys mirror the local .data/roms layout exactly — "arcade/pacman.zip",
// "consoles/nes/10yard.zip" — so the bucket, the dev proxy and the disk tree
// never disagree about where a dump lives.
//
// Two sources are tried in order:
//   1. the public mirror bucket directly, which works only where the origin is
//      allowed — DreamObjects sends no CORS headers, so a browser fetch of it
//      is normally blocked;
//   2. the dev server's same-origin /romsearch/ proxy (src/serve.ts), which
//      covers localhost.
// A miss is not an error: every caller falls back to the visitor dropping their
// own legally obtained dump.
/** Bucket prefix holding the rom sets, matching BUCKET_ROOT in .data/Makefile. */
export const ROM_BUCKET_BASE = 'https://mamekit.s3.us-east-005.dream.io/roms';
/** Per-segment encoding: console dumps carry spaces, brackets and parentheses. */
export function encodeRomKey(key) {
    return key.split('/').map(encodeURIComponent).join('/');
}
/** The sources to try for one key, in order. */
export function romSourceUrls(key) {
    const encoded = encodeRomKey(key);
    return [`${ROM_BUCKET_BASE}/${encoded}`, `/romsearch/${encoded}`];
}
/** Fetch bytes for a bucket key, or null when no source had it. */
export async function fetchRomBytes(key) {
    for (const url of romSourceUrls(key)) {
        try {
            const res = await fetch(url);
            if (res.ok)
                return new Uint8Array(await res.arrayBuffer());
        }
        catch { /* CORS, offline or no proxy — try the next source */ }
    }
    return null;
}
/** Fetch and parse a JSON object for a bucket key, or null on any failure. */
export async function fetchRomJson(key) {
    for (const url of romSourceUrls(key)) {
        try {
            const res = await fetch(url);
            if (res.ok)
                return await res.json();
        }
        catch { /* CORS, offline, no proxy or malformed JSON */ }
    }
    return null;
}
/**
 * Reduce a cart index to the shelf's availability list. Two shapes are accepted
 * so the shelf does not care where its index came from:
 *
 * - the generated slim index (dist/<machine>/carts.json), already reduced to
 *   `{file, name?, tier}` — the fast, same-origin path;
 * - the raw audit manifest (_manifest.json in the bucket), whose rows carry
 *   `status` plus a `match` block and a `target` naming the moved zip.
 *
 * `target` wins over `file` because it is the path the audit moved the zip to,
 * and therefore the bucket key: verified carts sit at the set root under their
 * short name, everything else under new/.
 */
export function cartAvailability(index) {
    const carts = index?.carts;
    if (!Array.isArray(carts))
        return [];
    const out = [];
    for (const cart of carts) {
        if (cart === null || typeof cart !== 'object')
            continue;
        const file = cart.target ?? cart.file;
        if (typeof file !== 'string' || !file.toLowerCase().endsWith('.zip'))
            continue;
        const verified = cart.tier ? cart.tier === 'verified' : cart.status === 'verified';
        const name = cart.name ?? cart.match?.name;
        if (verified && name) {
            out.push({
                file,
                name,
                description: cart.match?.description,
                year: cart.match?.year,
                publisher: cart.match?.publisher,
                tier: 'verified',
            });
        }
        else {
            out.push({ file, tier: 'experimental' });
        }
    }
    return out;
}
