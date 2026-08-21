#!/usr/bin/env bash
# Publish dist/ to the gh-pages branch as a single history-free commit.
#
#   npm run deploy
#
# ROMs are never published here: visitors load their own zip through the in-app
# drop zone, validated against the chip manifest.
#
# Artwork is split. The 779 MB of archival scans and bezel zips stays on the
# bucket, published by `make sync-artwork` in .data/ — a copy inside dist/ was
# most of GitHub Pages' 1 GB budget spent on files that never change. But the
# 10.7 MB of `.webp` siblings the app actually displays now ships with the
# site, because the bucket is an object store in one datacenter rather than an
# edge CDN: ~870 ms per object against Pages' ~30 ms, and no HTTP/2, so a
# 47-cover shelf queued eight deep behind six connections and took seconds.
# buildApp writes dist/artwork; see shipWebArtwork in src/gen/generate.ts.
set -euo pipefail
cd "$(dirname "$0")/.."

npm run gen:all

# A stale dist/ from before the bucket move still holds the full scans, and a
# deploy must never carry those however dist/ got its contents. Only the .webp
# siblings buildApp just wrote are allowed through, so this prunes by what a
# file *is* rather than trusting the tree to be clean.
if [[ -d dist/artwork ]]; then
  find dist/artwork -type f ! -name '*.webp' -delete
  find dist/artwork -type d -empty -delete
fi
printf 'web artwork shipped: %s images, %s\n' \
  "$(find dist/artwork -name '*.webp' 2>/dev/null | wc -l | tr -d ' ')" \
  "$(du -sh dist/artwork 2>/dev/null | cut -f1 || echo 0)"

touch dist/.nojekyll

# custom domain: Pages needs a CNAME file at the branch root, and our
# force-push would wipe the one GitHub writes — so we own it here
# (override with PAGES_DOMAIN=other.domain, or PAGES_DOMAIN= to disable)
PAGES_DOMAIN="${PAGES_DOMAIN-mamehistory.com}"
if [[ -n "$PAGES_DOMAIN" ]]; then
  printf '%s\n' "$PAGES_DOMAIN" > dist/CNAME
fi

URL="$(git remote get-url origin)"
trap 'rm -rf dist/.git' EXIT
rm -rf dist/.git
git -C dist init -q -b gh-pages
git -C dist add -A
git -C dist commit -qm "deploy"
git -C dist push -f "$URL" gh-pages
echo "pushed gh-pages — waiting for the Pages build (healthy ≈ 45 s)..."

# --- watchdog: a deploy isn't done until Pages says "built" ------------------
# Builds occasionally wedge in "building" (seen 90+ min) — one re-kick via the
# builds API unsticks them. Errored or still-stuck builds fail this script
# loudly instead of leaving the site silently stale.
kicked=0
for i in $(seq 1 30); do
  sleep 10
  status="$(gh api repos/benbruscella/mamekit/pages/builds/latest -q .status 2>/dev/null || echo unknown)"
  case "$status" in
    built) break ;;
    errored)
      echo "DEPLOY FAILED: Pages build errored:" >&2
      gh api repos/benbruscella/mamekit/pages/builds/latest -q .error.message >&2
      exit 1 ;;
    building|queued|unknown)
      if [ "$i" -ge 18 ] && [ "$kicked" -eq 0 ]; then
        echo "build stuck ($status after $((i*10))s) — requesting a fresh build"
        gh api repos/benbruscella/mamekit/pages/builds -X POST > /dev/null 2>&1 || true
        kicked=1
      fi ;;
  esac
done
if [ "${status:-}" != "built" ]; then
  echo "DEPLOY FAILED: Pages build still '$status' after 5 min — check https://github.com/benbruscella/mamekit/deployments" >&2
  exit 1
fi

# smoke-probe the live site (cache-busted) before declaring victory
want="$(node -e 'console.log(JSON.parse(require("fs").readFileSync("dist/games.json","utf8")).length)')"
got="$(curl -s "https://mamehistory.com/games.json?v=$RANDOM" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>console.log(JSON.parse(d).length))' 2>/dev/null || echo 0)"
if [ "$got" != "$want" ]; then
  echo "DEPLOY WARNING: live games.json has $got games, expected $want (CDN may lag ~10 min)" >&2
fi
echo "deployed & verified — $got games live at https://mamehistory.com"
