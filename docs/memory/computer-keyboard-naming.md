---
name: computer-keyboard-naming
description: "MAME lays a computer's keys over the PC by position (C64 F5 on PC F3); name unnamed keys by key_name (first PORT_CHAR), place on-screen keys by PORT_CODE; Boulder Dash starts with F1 then fire"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-20T06:30:52.774Z
---

2026-10-20 (#161, user report "keys seem wrong, can't start Boulder Dash").

- MAME's C64 binds by position: `PORT_CODE(KEYCODE_F3) PORT_CHAR(UCHAR_MAMEKEY(F5))` -- the C64's
  F1/F3/F5/F7 are on PC F1-F4, `+ -` on Minus/Equal, `@ *` on the brackets. That is faithful; our
  bug was naming unnamed keys after the PC key ("F3"). Labels now follow ioport_field::key_name
  (input-bindings.ts keyName); config-only change, BoardIR unchanged.
- The on-screen keyboard places keys by their bound PC code on the PC's four typing rows, which
  gives back the C64's own layout; keys on no typing key go on the machine's own row, function keys
  first in order.
- A computer's controls help never named the joystick (arrows + Space/X fire). Now
  "Joystick: Arrows, Space or X fire".
- Boulder Dash (bldrdash): F1 leaves the logo for "PRESS BUTTON TO PLAY", then fire, with the swap
  on (its usage note presets it; fire does nothing on port 2). Game knowledge MAME's note lacks.

See [[c64-autoboot-161]], [[port-condition-controls]].
