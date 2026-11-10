---
name: computer-software-room
description: "C64 (#101) software shelves — one generated catalogue per SOFTWARE_LIST under software/<list>.json, the software room in src/runtime/software.ts, MAME filter semantics fix, and the three traps hit on 2026-09-06"
metadata: 
  node_type: memory
  type: project
  originSessionId: 7e6433c7-8feb-4b6e-860f-56eb6ad88897
  modified: 2026-09-06T04:42:04.345Z
---

Computers (kind `computer`) route to `runSoftwareRoom` (src/runtime/software.ts), not the console room. The generator (src/gen/software-shelves.ts, called from generate.ts) writes `software/<list>.json` per original SOFTWARE_LIST plus `software/<list>.available.json` reduced from the audit `_manifest.json` files under `.data/roms/computers/<game|family>/*/`. config.json carries `software: { dumpsKey, shelves[] }`; `mountable` comes from a device capability table (cassette ← PET_DATASSETTE_PORT / CASSETTE); carts, disks, quickload are display only until a transport is generated.

**Why:** the C64 declares six lists on several media; the console room is one-list, one-cartridge. Verified 2026-09-06: Nebulus fetched from the bucket, Play → firmware web search (`computers/c64/bios/c64.zip`, family fallback because c64p's roms carry no romSet) → tape mounted on the transport.

**How to apply:**
- `buildCatalog` now follows MAME `is_compatible`: untagged entries pass any filter. The old rule would have emptied every C64 shelf (c64_cass tags nothing, filter NTSC/PAL). Don't reintroduce "bare X keeps only tagged".
- Cartridge lists name chips ("u1", "ba1"), so `extensions` is `[]` for the cartridge kind; only media lists' rom names are image files.
- Preview machines have `supported:false, preview:true` in games.json; the room gates Play on `supported !== false || preview`.
- e2e `watchFaults` counts resource 404s (bezel, first firmware key) as errors; filter them in boot-path tests. See [[known-broken-targets]] for the candidate status of c64/c64p.
