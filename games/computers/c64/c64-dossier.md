# Commodore 64 (NTSC)

**Commodore Business Machines · 1982** — transpiled from the MAME driver `src/mame/commodore/c64.cpp` by mamekit.

![marquee](/artwork/media/marquees/c64.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/c64.webp) | ![cabinet](/artwork/media/cabinets/c64.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `u7` | M6510 | 1.023 MHz | 1 |

- **Sound:** sid @ 0.048 MHz
- **Screen:** 418×235 @ 59.83 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `basic` | `901226-01.u3` | 0x0 | 0x2000 | `f833d117` |
| `kernal` | `901227-03.u4` | 0x0 | 0x2000 | `dbe3e7c7` |
| `charom` | `901225-01.u5` | 0x0 | 0x1000 | `ec4272ee` |
| `u17` | `906114-01.u17` | 0x0 | 0xf5 | `54c89351` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Down | crsr \xe2\x86\x91 \xe2\x86\x93 | `ROW0` | 0x80 |
| F3 | f3 | `ROW0` | 0x40 |
| F2 | f2 | `ROW0` | 0x20 |
| F1 | f1 | `ROW0` | 0x10 |
| F4 | f4 | `ROW0` | 0x8 |
| Right | crsr \xe2\x86\x90 \xe2\x86\x92 | `ROW0` | 0x4 |
| Enter | return | `ROW0` | 0x2 |
| Backspace | inst del | `ROW0` | 0x1 |
| ShiftLeft | shift (left) | `ROW1` | 0x80 |
| E | e | `ROW1` | 0x40 |
| S | s | `ROW1` | 0x20 |
| Z | z | `ROW1` | 0x10 |
| 4 / Numpad4 | 4 | `ROW1` | 0x8 |
| A | a | `ROW1` | 0x4 |
| W | w | `ROW1` | 0x2 |
| 3 / Numpad3 | 3 | `ROW1` | 0x1 |
| X | x | `ROW2` | 0x80 |
| T | t | `ROW2` | 0x40 |
| F | f | `ROW2` | 0x20 |
| C | c | `ROW2` | 0x10 |
| 6 / Numpad6 | 6 | `ROW2` | 0x8 |
| D | d | `ROW2` | 0x4 |
| R | r | `ROW2` | 0x2 |
| 5 / Numpad5 | 5 | `ROW2` | 0x1 |
| V | v | `ROW3` | 0x80 |
| U | u | `ROW3` | 0x40 |
| H | h | `ROW3` | 0x20 |
| B | b | `ROW3` | 0x10 |
| 8 / Numpad8 | 8 | `ROW3` | 0x8 |
| G | g | `ROW3` | 0x4 |
| Y | y | `ROW3` | 0x2 |
| 7 / Numpad7 | 7 | `ROW3` | 0x1 |
| N | n | `ROW4` | 0x80 |
| O | o | `ROW4` | 0x40 |
| K | k | `ROW4` | 0x20 |
| M | m | `ROW4` | 0x10 |
| 0 / Numpad0 | 0 | `ROW4` | 0x8 |
| J | j | `ROW4` | 0x4 |
| I | i | `ROW4` | 0x2 |
| 9 / Numpad9 | 9 | `ROW4` | 0x1 |
| Comma | comma | `ROW5` | 0x80 |
| BracketLeft | bracketleft | `ROW5` | 0x40 |
| Semicolon | semicolon | `ROW5` | 0x20 |
| Period | period | `ROW5` | 0x10 |
| Equal | equal | `ROW5` | 0x8 |
| L | l | `ROW5` | 0x4 |
| P | p | `ROW5` | 0x2 |
| Minus | minus | `ROW5` | 0x1 |
| Slash | slash | `ROW6` | 0x80 |
| End | \xe2\x86\x91 \xcf\x80 | `ROW6` | 0x40 |
| Backslash | backslash | `ROW6` | 0x20 |
| ShiftRight | shift (right) | `ROW6` | 0x10 |
| Home | clr home | `ROW6` | 0x8 |
| Quote | quote | `ROW6` | 0x4 |
| BracketRight | bracketright | `ROW6` | 0x2 |
| PageDown | pagedown | `ROW6` | 0x1 |
| F9 | run stop | `ROW7` | 0x80 |
| Q | q | `ROW7` | 0x40 |
| AltLeft | cbm | `ROW7` | 0x20 |
| Space | space | `ROW7` | 0x10 |
| 2 / Numpad2 | 2 | `ROW7` | 0x8 |
| Pause | ctrl | `ROW7` | 0x4 |
| Backquote | \xe2\x86\x90 | `ROW7` | 0x2 |
| 1 / Numpad1 | 1 | `ROW7` | 0x1 |
| F10 | restore | `RESTORE` | 0x1 |
| CapsLock | shift lock | `LOCK` | 0x80 |
| Up | joystick up | `joy2:JOY` | 0x1 |
| Down | joystick down | `joy2:JOY` | 0x2 |
| Left | joystick left | `joy2:JOY` | 0x4 |
| Right | joystick right | `joy2:JOY` | 0x8 |
| Space / X | button1 | `joy2:JOY` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Swap joystick ports | `JOYSWAP` | 0x1 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/commodore/c64.cpp`
- **Written by:** Curt Coder
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Curt Coder (driver header); geecab (6 release notes); AmatCoder (2 release notes); Nathan Woods (2 release notes); Chris Swan (1 release note); Ivan Vangelista (1 release note); Steven Coomber (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 142 commits by 24 commit authors, 2012–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Computer published 44 years ago:

Commodore 64 (c) 1982 Commodore.

### Trivia
Designed similar to the VIC-20, the Commodore 64 (or C64 for short) featured a better video chip supporting sprites, as well as the famous sid6581 sound chip, two Atari-compatible joystick ports, and 64 kilobytes of RAM.

The Commodore 64 is, along with the Apple II and the Atari 8-Bit computers, one of the most famous home computers of it's era. During its production from 1982 to 1993, 17 to 22 millions, of these computer would sell, to put in perspective, that's more than all the Macintoshes in the world. It was one of the first to offer a high quality sound chip and graphic resolution with many colors and sprites. A great range of peripherals was developed for this computer and can use several of the VIC-20 peripherals. 

Commodore produced the first generation of C64s from August 1982 to May 1986, then it was discontinued and they introduced the "Commodore 64C".

### Updates
Several versions of the Commodore 64 were launched : The first one (C64-1) uses the VIC 20 case, it will be quickly replaced with the C64-2 which uses the famous brown case and by the C64-3 with small cosmetic changes in the keyboard. A special version called Educator 64 or PET64 or CBM 4064 was proposed for schools and uses the PET case.

### Contribute
Edit this entry: https://www.arcade-history.com/game/61704/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `c64`. Play it at [../../../app/g/c64/](../../../app/g/c64/) or [explore the knowledge graph](viewer.html).*
