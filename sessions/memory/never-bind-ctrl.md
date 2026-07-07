---
name: never-bind-ctrl
description: User directive — never bind Ctrl as a game button in mame2js
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7daada0d-2bc1-4df2-9a32-20e84fa4451c
---

Never bind Ctrl (ControlLeft/ControlRight) as fire or any game button in mame2js key bindings.

**Why:** on macOS, Ctrl+Arrow is the Mission Control/Spaces chord — the OS force-releases the held arrow and swallows new arrow presses while Ctrl is down, which made movement feel "sticky" while shooting. Diagnosed 2026-07-05 from the user's own console logs; the user then said "do not let ctrl be fire pls ever".

**How to apply:** generator KEYMAP uses Space/KeyX for IPT_BUTTON1, KeyZ for IPT_BUTTON2. Keep OS-chord keys (Ctrl, Cmd, Alt where risky) out of default bindings for any new input types.
