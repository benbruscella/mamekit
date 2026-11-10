---
name: tosec-shelf-provenance
description: "#158 policy: TOSEC names may reach dist for the user's own C64 dumps, but every shelf entry must show a MAME vs TOSEC source badge"
metadata:
  node_type: memory
  type: project
  originSessionId: 0e62fc03-cad2-4b0d-9ac5-cbf4665514f0
  modified: 2026-10-16T07:04:28.653Z
---

2026-10-16, issue #158: the user decided TOSEC-identified dump names (plus title/year/publisher parsed from the TOSEC filename) may ship in `dist` shelf entries. This extends #157's "catalogue = MAME's software lists only" rule. The condition: every shelf entry shows a source badge, shipped as a site asset, that distinguishes MAME software-list entries from TOSEC DAT entries. Unidentified dumps show their filename with no badge.

**Why:** MAME's C64 lists hold only ~1,700 entries, while the user's TOSEC library is far larger. Provenance must stay visible so a visitor never mistakes a TOSEC name for MAME's catalogue.

**How to apply:**
- MAME stays the authority when both lists match: try MAME first, then TOSEC.
- The TOSEC DAT files themselves stay in `.data/dats/tosec/` and never ship.
- Scope is C64 only. GameBase64 metadata is explicitly out of scope.
- Cover art (TOSEC `Cover.zip`) is its own issue, #159. It starts only once #158's games are sorted and loading, and its design is still open (the user wants to think it through).
- Carts match on CRT chip payloads; D64s match at both sizes.

See [[computer-software-room]] and [[cart-shelf-naming]].
