---
name: c64-quickload-161
description: "#161 C64 quickload: device_image_interface hosted on IrDevice, quickload picked by image_type_name, delegate tuples, OKI clock trap in constructor config, MAME -quik oracle (Broken Limits pixel-exact at 1687)"
metadata:
  node_type: memory
  type: project
  originSessionId: 9100b616-ae4c-4f75-9420-253954e54149
  modified: 2026-10-19T08:53:36.133Z
---

2026-10-19, branch 161-fix-commodore-64-part-2 (uncommitted on top of "wip 1").

- **Shape**: QUICKLOAD is a generated device (snapquik.cpp). `quickload_c64` -> `general_cbm_loadsnap`
  (+ `cbm_quick_sethiaddress` passed as a function pointer) are board handlers; the KG follows free
  functions passed as values. Config `set_extensions("p00,prg,t64")`/`set_delay(3)` comes from the
  constructor overload the add statement selects (`constructorConfigCalls` in kg/build.ts).
- **Host file ABI**: IrDevice answers `length/fread/fseek/ftell/is_filetype/basename/check_for_file/
  osd_printf_error` for image devices with no format tables (`readsOwnFile`). That also covers every
  console cart slot and the C64 expansion port, and it is inert there: nothing they run calls those
  names, and the board passes `exists: () => 1` in options.calls, which the `??=` never overrides.
- **Which image device is a quickload**: MAME's own `image_type_name()` ("quickload"). A cartridge port
  is an image device too (`device_rom_image_interface` -> `device_image_interface`), and listing it as
  a quickload was the first bug.
- **Traps**:
  - Board->device delegates returned `toNumber(pair)` = NaN, so a refused file read as success;
    `executeGeneratedMachineDelegate` keeps arrays.
  - `OKIM6295(config, tag, clock, PIN7_HIGH)` also matches constructor-config reading; only drop
    `clockExpr` when a setter consumed the third argument (`clockConsumed`), or the OKI loses its clock.
  - memcpy/fread into `&scalar` now composes LE bytes, but only for numeric/boolean targets: the GB
    slot reads a GBX trailer struct into a caller's undeclared local the same way.
  - The interpreter's unqualified-call path coerces string args to numbers (callArgument); emitted
    code and object-method calls don't. Not fixed (every board); the quickload never takes that path.
- **MAME oracle**: `-quik <file> -autoboot_script` posting `RUN{ENTER}` on frame 152. In memory on
  frame 151 both sides; Broken Limits intro pixel-exact at 1687. After SPACE, MAME's natkeyboard takes
  39 frames to register vs our 18, so compare our N with MAME's N+23 (114 px of star/sprite phase).
  The demo is silent in MAME through 52 s too (golden rms 0.5 = SID DC only).
- **Shelves** now list every format the transport reads, list formats first (floppy gained g41/g71),
  so a bare `.prg` drop lands on the quickload shelf. Boot policy for a slot-less transport is keyed by
  its loader (`general_cbm_loadsnap` -> `RUN{ENTER}`); TitleStart's `ready` waits for `pending()`.

See [[c64-acceptance-161]], [[c64-autoboot-161]], [[dist-rebuild-breaks-sweeps]].
