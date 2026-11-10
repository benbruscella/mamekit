---
name: slot-card-reset-and-reload
description: "PR #164 review fixes: a slot's card resets after the slot (device_t::reset), ROM_RELOAD kept for cart areas, and saves/resume record which image each transport held (tape samples are not state)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T23:41:42.700Z
---

2026-10-20, PR #164 review (three P2s, all real).

- **Slot card reset:** IrDevice.reset() reset `children` but never `slotChild`; MAME's device_t::reset
  does device_reset then every subdevice, the slot card included. Now `this.slotChild?.reset()` after
  the device's own reset. Reaches exactly c64/c64p/a2600/coleco/gameboy/nes (derive with the slot
  device types in dist/runtime/generated/devices/*.device.ir.json); all 15 of their scenarios kept
  their goldens.
- **ROM_RELOAD:** romload seeks the file back to 0 and reads `size` bytes at the reload offset.
  softlist.ts keeps `reloads` on the chip before it (cart areas only); softwarePart applies them.
  Only pthelp uses it in c64_cart/vic10; now pixel-exact vs MAME at frame 300.
- **Transport media with saves:** cassette samples are host media (closure store, walker skips it),
  so SaveRecord.media records each transport's image name and resume/deck loads put it back before
  board.load (and restore the old one if the load rolls back). PanelBay.image = TransportImage.
  Follow-up reviews: images are recorded as {name, crc} (batman and batmano share a
  Batman_Side_1.tap with different bytes); every image is checked before any transport moves
  (transport-media.ts missingMedia, all-or-nothing), and a load that throws after the switch puts
  back the old images *and* a board.save() snapshot taken before the switch -- remounting by name
  alone left a playing tape stopped at zero. Refused load says "That save needs the X it was made
  with"; resume starts fresh.

See [[c64-cartridges-161]], [[save-state-walker]].
