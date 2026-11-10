---
name: struct-field-widths
description: "C struct fields were stored untyped, so a uint8_t counter reached -1 instead of wrapping to 0xff — the one bug behind Pitfall II's DPC being 30% wrong"
metadata:
  node_type: memory
  type: reference
---

`structDeclarations` in `device-compiler.ts` captured only `{ name, length }`
for each field of a C struct and **threw the type away**. The runtime stored
plain JS numbers, so a `uint8_t` field decremented past zero became `-1`
instead of `0xff`.

MAME carries on exactly that wrap:

```cpp
m_df[data_fetcher].low -= 1;
if (m_df[data_fetcher].low == 0xff)   // never true for us
    m_df[data_fetcher].high -= 1;
```

The high byte therefore never decremented, the DPC's display-data pointer
`(low | (high << 8))` walked off its 2K window, and Pitfall II drew flat
background over rows 103..196 — **11,740 of 39,248 pixels (30%) wrong**, an
identical count on every frame, which is the signature of a *structural* fault
rather than a timing one.

Fixed 2026-08-31: fields now carry `bits`/`signed` derived from the declared
type (same rules as ordinary members), and `structMember` defines each scalar
field with a get/set pair that wraps on write. Enforcing it at the property
means interpreted, emitted and host-poked writes all wrap identically -- there
is no second path to forget. Result: **0 differing pixels vs MAME.**

**Also needed for the same board, each its own silent gap:** see
[[device-children-and-delegates]] for `device_add_mconfig` children, callable
memory-handler delegates, and nested timers. And **children must be added to
the code emitter too** (`generatedDeviceAssignments` recurses into
`slot.options`; it needed the same for `children`) -- left interpreted, the
DPC's ~94,000 reads/second cost Pitfall II a third of its frame rate, 49.8 fps
vs 65.0.

**How to apply:** a constant differing-pixel count across unrelated frames means
state, not timing. And when a struct-backed device misbehaves, check the field
widths before anything else — the model is only as good as the type it kept.
