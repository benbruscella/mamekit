# Runtime capability migrations

Issue #119 audited the remaining title/family switches in the shared runtime.
They are now selected from generated source shape and concrete MAME hardware
types; the runtime never chooses behavior from `game` or `family`.

| Previous selector | Capability source | Owning area |
|---|---|---|
| Gauntlet | `ATARI_MOTION_OBJECTS`, generated lifecycle handlers and palette plan | Atari motion objects / audio closure |
| Mario Bros. | `M58715` and generated latch/address-map paths | MCS-48 and audio composition |
| Defender | extracted `bank_select_w`, bank region and memory-view plan | memory banks/views |
| OutRun | `SEGAIC16_ROAD` plus mapper ranges | Sega mapper/road devices |
| Elevator Action | `TAITO_SJ_SECURITY_MCU` and composed M68705 | Taito security MCU |
| System 16A/B | `SEGA_SYS16A_SPRITES` / `SEGA_SYS16B_SPRITES` | Sega video/I/O devices |
| Neo Geo | `NEOGEO_SPRITE_OPTIMZIED` | Neo Geo video/system devices |

`architecture.spec.ts` rejects the reintroduction of game/family conditionals
for these shared files. A new exception must instead become extracted IR or a
capability selected by a source-declared device/handler shape.
