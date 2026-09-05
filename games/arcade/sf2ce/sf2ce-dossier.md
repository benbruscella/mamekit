# Street Fighter II': Champion Edition (World 920513)

**Capcom · 1992** — transpiled from the MAME driver `src/mame/capcom/cps1.cpp` by mamekit.

![marquee](/artwork/media/marquees/sf2ce.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/sf2ce.webp) | ![cabinet](/artwork/media/cabinets/sf2ce.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M68000 | 12.000 MHz | 11 |
| `audiocpu` | Z80 | 3.580 MHz | 9 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 384×224 @ 59.64 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `s92e_23b.8f` | 0x0 | 0x80000 | `0aaa1a3a` |
| `maincpu` | `s92_22b.7f` | 0x80000 | 0x80000 | `2bbe15ed` |
| `maincpu` | `s92_21a.6f` | 0x100000 | 0x80000 | `925a7877` |
| `gfx` | `s92-1m.3a` | 0x0 | 0x80000 | `03b0d852` |
| `gfx` | `s92-3m.5a` | 0x2 | 0x80000 | `840289ec` |
| `gfx` | `s92-2m.4a` | 0x4 | 0x80000 | `cdb5f027` |
| `gfx` | `s92-4m.6a` | 0x6 | 0x80000 | `e2799472` |
| `gfx` | `s92-5m.7a` | 0x200000 | 0x80000 | `ba8a2761` |
| `gfx` | `s92-7m.9a` | 0x200002 | 0x80000 | `e584bfb5` |
| `gfx` | `s92-6m.8a` | 0x200004 | 0x80000 | `21e3f87d` |
| `gfx` | `s92-8m.10a` | 0x200006 | 0x80000 | `befc47df` |
| `gfx` | `s92-10m.3c` | 0x400000 | 0x80000 | `960687d5` |
| `gfx` | `s92-12m.5c` | 0x400002 | 0x80000 | `978ecd18` |
| `gfx` | `s92-11m.4c` | 0x400004 | 0x80000 | `d6ec9a0a` |
| `gfx` | `s92-13m.6c` | 0x400006 | 0x80000 | `ed2c67f6` |
| `audiocpu` | `s92_09.11a` | 0x0 | 0x8000 | `08f6b60e` |
| `oki` | `s92_18.11c` | 0x0 | 0x20000 | `7f162009` |
| `oki` | `s92_19.12c` | 0x20000 | 0x20000 | `beade53f` |
| `aboardplds` | `buf1` | 0x0 | 0x117 | `eb122de7` |
| `aboardplds` | `ioa1` | 0x0 | 0x117 | `59c7ee3b` |
| `aboardplds` | `prg1` | 0x0 | 0x117 | `f1129744` |
| `aboardplds` | `rom1` | 0x0 | 0x117 | `41dc73b9` |
| `aboardplds` | `sou1` | 0x0 | 0x117 | `84f4b2fe` |
| `bboardplds` | `s9263b.1a` | 0x0 | 0x117 | `0a7ecfe0` |
| `bboardplds` | `iob1.12d` | 0x0 | 0x117 | `3abc0700` |
| `bboardplds` | `bprg1.11d` | 0x0 | 0x117 | `31793da7` |
| `cboardplds` | `ioc1.ic7` | 0x0 | 0x104 | `a399772d` |
| `cboardplds` | `c632.ic1` | 0x0 | 0x117 | `0fbd9270` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| 1 | start1 | `IN0` | 0x10 |
| 2 | start2 | `IN0` | 0x20 |
| Right | joystick right | `IN1` | 0x1 |
| Left | joystick left | `IN1` | 0x2 |
| Down | joystick down | `IN1` | 0x4 |
| Up | joystick up | `IN1` | 0x8 |
| A / Space | p1 jab punch | `IN1` | 0x10 |
| S | p1 strong punch | `IN1` | 0x20 |
| D | p1 fierce punch | `IN1` | 0x40 |
| Z | p1 short kick | `IN2` | 0x1 |
| X | p1 forward kick | `IN2` | 0x2 |
| C | p1 roundhouse kick | `IN2` | 0x4 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN0` | 0x40 | 0x40 |
| Coin A | `DSWA` | 0x7 | 0x7 |
| Coin B | `DSWA` | 0x38 | 0x38 |
| 2 Coins to Start, 1 to Continue | `DSWA` | 0x40 | 0x40 |
| Unused | `DSWA` | 0x80 | 0x80 |
| Difficulty | `DSWB` | 0x7 | 0x4 |
| Unused | `DSWB` | 0x8 | 0x8 |
| Unused | `DSWB` | 0x10 | 0x10 |
| Unused | `DSWB` | 0x20 | 0x20 |
| Unused | `DSWB` | 0x40 | 0x40 |
| Unused | `DSWB` | 0x80 | 0x80 |
| Unused | `DSWC` | 0x1 | 0x1 |
| Unused | `DSWC` | 0x2 | 0x2 |
| Free Play | `DSWC` | 0x4 | 0x4 |
| Freeze | `DSWC` | 0x8 | 0x8 |
| Flip Screen | `DSWC` | 0x10 | 0x10 |
| Demo Sounds | `DSWC` | 0x20 | 0x0 |
| Allow Continue | `DSWC` | 0x40 | 0x0 |
| Game Mode | `DSWC` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/capcom/cps1.cpp`
- **Written by:** Paul Leaman
- **License:** BSD-3-Clause
- **Development:** 594 commits by 51 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, Vas Crabb, Brian Troha

## The story

Arcade Video game published 34 years ago:

Street Fighter II' - Champion Edition (c) 1992 Capcom Company, Limited.

Export release. Game developed in Japan. For more information about the game itself, please see the original Japanese release entry; "Street Fighter II' - Champion Edition [B-Board 91634B-2]".

### Technical
Capcom Play System hardware (CP-S) 
B-Board #: 91635B-2

### Ports
Here is a list of ports released outside Japan. To see Japanese ports, please see the original Japanese version entry; "Street Fighter II' - Champion Edition [B-Board 91634B-2]".

* CONSOLES: 
[AU] Nintendo SNES (1993) "Street Fighter II Turbo - Hyper Fighting" 
[AU] Sega Mega Drive (1993) "Street Fighter II' - Special Champion Edition [Sega Gold Collection]" 
[BR] Sega Mega Drive (1993) "Street Fighter II' - Special Champion Edition [Model 047020]" by Tec Toy 
[EU] Nintendo SNES (aug.1993) "Street Fighter II Turbo - Hyper Fighting [Model SNSP-TI-EUR]" 
[US] Nintendo SNES (aug.1993) "Street Fighter II Turbo - Hyper Fighting [Model SNS-TI-USA]" 
[US] Sega Genesis (sept.27, 1993) "Street Fighter II' - Special Champion Edition [Model T-12016]" 
[EU] Sega Mega Drive (oct.1993) "Street Fighter II' - Special Champion Edition [Model 670-4179]" 
[BR] Sega Master System (1997) "Street Fighter II [Model 030.010]" by Tec Toy 
[EU] Sony PlayStation (1998) "Street Fighter Collection 2 [Model SLES-01721]" 
[US] Sony PlayStation (oct.31, 1998) "Street Fighter Collection 2 [Model SLUS-00746]" 
[US] Microsoft XBOX (sept.27, 2005) "Capcom Classics Collection" 
[US] Sony PS2 (sept.27, 2005) "Capcom Classics Collection [Model SLUS-21316]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 

* HANDHELDS: 
[US] Sony PSP (oct.24, 2006) "Capcom Classics Collection Reloaded [Model ULUS-10134]" 
[EU] Sony PSP (nov.10, 2006) "Capcom Classics Collection Reloaded [Model ULES-00377]" 
[AU] Sony PSP (nov.16, 2006) "Capcom Classics Collection Reloaded" 

* COMPUTERS: 
[US] PC [MS Windows, CD-ROM] (2003) "Capcom Arcade Hits Volume 1" 

* OTHERS: 
[US] Mobile Phones (2008) 
[US] Apple iPhone/iPad (nov.4, 2010) "Capcom Arcade [Model 397347348]" 
[US] Apple iPhone/iPod (sept.15, 2011) "Street Fighter II Collection [Model 459660048]"

### Contribute
Edit this entry: https://www.arcade-history.com/game/69767/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `cps1`. Play it at [../../../app/g/sf2ce/](../../../app/g/sf2ce/) or [explore the knowledge graph](viewer.html).*
