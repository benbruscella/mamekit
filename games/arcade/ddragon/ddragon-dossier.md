# Double Dragon (World set 1)

**Technos Japan (Taito license) · 1987** — transpiled from the MAME driver `src/mame/technos/ddragon.cpp` by mamekit.

![marquee](/artwork/media/marquees/ddragon.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/ddragon.webp) | ![cabinet](/artwork/media/cabinets/ddragon.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | HD6309E | 3.000 MHz | 18 |
| `sub` | HD63701Y0 | 6.000 MHz | 2 |
| `soundcpu` | MC6809 | 6.000 MHz | 6 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 256×240 @ 57.44 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `21j-1.26` | 0x8000 | 0x8000 | `ae714964` |
| `maincpu` | `21j-2-3.25` | 0x10000 | 0x8000 | `5779705e` |
| `maincpu` | `21a-3.24` | 0x18000 | 0x8000 | `dbf24897` |
| `maincpu` | `21j-4.23` | 0x20000 | 0x8000 | `6c9f46fa` |
| `sub` | `21jm-0.ic55` | 0x0 | 0x4000 | `f5232d03` |
| `soundcpu` | `21j-0-1` | 0x8000 | 0x8000 | `9efa95bb` |
| `chars` | `21j-5` | 0x0 | 0x8000 | `7a8b8db4` |
| `sprites` | `21j-a` | 0x0 | 0x10000 | `574face3` |
| `sprites` | `21j-b` | 0x10000 | 0x10000 | `40507a76` |
| `sprites` | `21j-c` | 0x20000 | 0x10000 | `bb0bc76f` |
| `sprites` | `21j-d` | 0x30000 | 0x10000 | `cb4f231b` |
| `sprites` | `21j-e` | 0x40000 | 0x10000 | `a0a0c261` |
| `sprites` | `21j-f` | 0x50000 | 0x10000 | `6ba152f6` |
| `sprites` | `21j-g` | 0x60000 | 0x10000 | `3220a0b6` |
| `sprites` | `21j-h` | 0x70000 | 0x10000 | `65c7517d` |
| `tiles` | `21j-8` | 0x0 | 0x10000 | `7c435887` |
| `tiles` | `21j-9` | 0x10000 | 0x10000 | `c6640aed` |
| `tiles` | `21j-i` | 0x20000 | 0x10000 | `5effb0a0` |
| `tiles` | `21j-j` | 0x30000 | 0x10000 | `5fb42e7c` |
| `adpcm1` | `21j-6` | 0x0 | 0x10000 | `34755de3` |
| `adpcm2` | `21j-7` | 0x0 | 0x10000 | `904de6f8` |
| `proms` | `21j-k-0.101` | 0x0 | 0x100 | `fdb130a9` |
| `proms` | `21j-l-0.16` | 0x100 | 0x200 | `46339529` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| Z | button2 | `P1` | 0x20 |
| 1 | start1 | `P1` | 0x40 |
| 2 | start2 | `P1` | 0x80 |
| 5 | coin1 | `P2` | 0x40 |
| 6 | coin2 | `P2` | 0x80 |
| 9 | service1 | `EXTRA` | 0x1 |
| C | button3 | `EXTRA` | 0x2 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW0` | 0x7 | 0x7 |
| Coin B | `DSW0` | 0x38 | 0x38 |
| Cabinet | `DSW0` | 0x40 | 0x40 |
| Flip Screen | `DSW0` | 0x80 | 0x80 |
| Difficulty | `DSW1` | 0x3 | 0x3 |
| Demo Sounds | `DSW1` | 0x4 | 0x4 |
| Unused | `DSW1` | 0x8 | 0x8 |
| Bonus Life | `DSW1` | 0x30 | 0x30 |
| Lives | `DSW1` | 0xc0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/technos/ddragon.cpp`
- **Written by:** Philip Bennett,Carlos A. Lozano, Rob Rosenbrock, Phil Stroffolino, Ernesto Corvi, David Haywood, R. Belmont
- **License:** BSD-3-Clause
- **Development:** 257 commits by 35 contributors, 2007–2025
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, AJR

## The story

Arcade Video game published 39 years ago:

Double Dragon (c) 1987 Taito Corp.

Export version for 'Outside Japan' releases by Taito, under license from Technos Japan. For more information about the game itself, please visit the original Technos Japan entry; "Double Dragon [Model TA-0021]".

### Ports
* CONSOLES:
[EU] Nintendo NES (1990) "Double Dragon [Model NES-WD]" 
[EU] Sega Master System (1988) "Double Dragon [Model 7012]"
[BR] Sega Master System (1988) by Tec Toy
[EU] Sega Mega Drive (1993)
[EU] Microsoft XBOX 360 [XBLA] (may.9, 2007) 
[BR] Zeebo (may.29, 2009): Remake with remade graphics.
[MX] Zeebo (nov.4, 2009): Remake with remade graphics.
[EU] [AU] Sony PlayStation 4 [PSN] (jul.14, 2015) "Arcade Archives - Double Dragon [Model CUSA-02667]" 
[AS] Sony PlayStation 4 [PSN] (may.21, 2015) "Arcade Archives - Double Dragon"

* HANDHELDS: 
[EU] Nintendo Game Boy (1990) "Double Dragon [Model DMG-DD-NOE]" 
[EU] Sega Game Gear (1993) "Double Dragon - The Revenge of Billy Lee [Model T-70038-50]"

* COMPUTERS:
[EU] Amstrad CPC (1988)
[EU] Commodore Amiga (1988)
[EU] Commodore C64 (1988)
[EU] Sinclair ZX Spectrum (1989)
[EU] Amstrad CPC (1989) by Virgin Mastertronic : 128 KB Disk version.
[EU] Amstrad CPC (1989) by Animagic : Spanish version.
[EU] Atari ST (1988)
[EU] MSX (1989)
[AU] Commodore Amiga (1989) "Amiga Champions" 
[EU] Commodore C64 (1990) "100% Dynamite"
[KO] MSX (1990) 
[EU] Sinclair ZX Spectrum (1990) "100% Dynamite"

* OTHERS:
[UK] LCD handheld game (1988) by Grandstand.
[US] LCD handheld game (1989) by Tiger Electronics.

### Contribute
Edit this entry: https://www.arcade-history.com/game/113455/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `ddragon`. Play it at [../../../app/g/ddragon/](../../../app/g/ddragon/) or [explore the knowledge graph](viewer.html).*
