---
name: artwork-cdn-bucket
description: "DreamObjects bucket facts — S3 metadata-REPLACE wipes Content-Type, CORS allowlists production only, cover PNGs are 1-2MB"
metadata: 
  node_type: memory
  type: project
  originSessionId: 818d311f-59a7-4a27-b282-6ec6684cd1ef
  modified: 2026-08-21T05:45:55.335Z
---

The `mamekit` DreamObjects bucket (`https://mamekit.s3.us-east-005.dream.io`,
endpoint `https://s3.us-east-005.dream.io`) serves all artwork and ROMs. Creds
are named `DH_ACCESS_KEY_ID` / `DH_SECRET_KEY` / `DH_ENDPOINT` in `.data/.env`;
`.data/Makefile` owns every sync.

**A recursive `s3 cp --metadata-directive REPLACE` destroys Content-Type.** A
server-side copy does not sniff types the way a local upload does — every object
silently becomes `binary/octet-stream`. Repair means re-copying per extension
with an explicit `--content-type`. Set headers at *upload* time instead:
`.data/Makefile` now carries `IMMUTABLE` on `sync-artwork` and `sync-roms`
(2026-08-21). Always verify with `curl -D -` after any metadata operation.

**CORS now allowlists localhost too** (added 2026-08-21, GET/HEAD rule). The
endpoint **rejects a `*` after the hostname** -- `http://localhost:*` fails with
`InvalidRequest: allowedOrigin value has '*' after the hostname`, so every dev
port must be named literally. 8280 is the default for both `--serve` and the e2e
harness; 8281 and 8899 are also listed.

**`<img>` no-cors fallback + `immutable` poisons the browser cache for a year.**
A cover loaded through the fallback stores an *opaque* cache entry; a later
cors-mode `fetch()` for the same URL reuses it and throws `Failed to fetch`,
so that machine silently loses the matte crop and pays two requests per cover
until the entry expires. Proven: same URL `THREW`, `?cb=` and `{cache:'reload'}`
both returned 200. A fresh browser context is clean -- 47 covers, 1 request
each, 0 console errors. When testing CORS changes, always use a fresh context;
a long-lived profile will lie to you.

**Every displayed scan has a `.webp` sibling** (2026-08-21). `1942.png` is the
untouched archival scan, `1942.webp` is what the app loads -- extension alone
separates them, so one `%.webp: %.png` pattern rule covers covers/, marquees/
and cabinets/, and the pair sorts adjacent so a gap shows in a plain `ls`.
`make images` / `images-missing` / `images-clean`; `sync-artwork` depends on
`images` so an unprocessed scan can never reach the bucket. 148.4MB -> 10.7MB
(92.8%). Widths are ~2x display size (covers 600, marquees 1000, cabinets 600)
and the rule **never upscales** -- wardner is 222px and enlarging made it bigger
than its source. Bezel zips are excluded: they render full-screen, one at a
time, and their PNGs are named by each zip's `default.lay`.

The win is the codec, not the scale: a cover at 600px is 651KB as PNG (34% off)
but 68KB as WebP (93% off).

**The displayed images ship with the site, not from the bucket** (2026-08-21).
DreamObjects is an object store in one datacenter, not an edge CDN: ~870ms TTFB
against GitHub Pages' ~30ms, and it will not negotiate HTTP/2 even when asked,
so the browser caps at 6 connections. A 47-cover shelf queued 8 deep and
averaged 3321ms per cover -- 2748ms of it `blocked` waiting for a socket, only
134ms transferring. Shrinking files could not fix that; changing origin did.
`shipWebArtwork` in src/gen/generate.ts copies the 10.7MB of siblings into
dist/artwork, `artworkSources()` returns [same-origin sibling, bucket scan],
and measured 3321ms -> 18ms mean. Bucket keeps the archival scans, the 545MB of
bezel zips and the ROM mirror -- all fetched one at a time at game launch,
where 870ms is invisible. The 779MB that made shipping artwork impossible when
that call was first made is not what the app needs.

Lazy-painting the shelf was tried and **reverted**: it was a workaround for the
6-connection queue, and same-origin HTTP/2 makes it pointless complexity that
only buys pop-in.

`.data` is gitignored so CI has no artwork; `shipWebArtwork` no-ops there and
the runtime falls back to the bucket -- slower, never broken. Deploy runs
locally. See [[dist-rebuild-pitfalls]] for why `--serve --build-app` is the
wrong way to rebuild before measuring.

**dist is 277MB, ~95MB of which is `.ir.json` the browser never fetches**
(konami1.cpu.ir.json alone is 13.9MB), plus per-game graph.full.json/
viewer.full.html and a 19.8MB app/browse/index.json. Not a speed problem --
nothing requests them -- but it is build products published to a CDN.
