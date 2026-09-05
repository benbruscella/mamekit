# Final Fight (World, set 1)

**Capcom · 1989** — transpiled from the MAME driver `src/mame/capcom/cps1.cpp` by mamekit.

![marquee](/artwork/media/marquees/ffight.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/ffight.webp) | ![cabinet](/artwork/media/cabinets/ffight.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M68000 | 10.000 MHz | 11 |
| `audiocpu` | Z80 | 3.580 MHz | 9 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 384×224 @ 59.64 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `ff_36.11f` | 0x0 | 0x20000 | `f9a5ce83` |
| `maincpu` | `ff_42.11h` | 0x1 | 0x20000 | `65f11215` |
| `maincpu` | `ff_37.12f` | 0x40000 | 0x20000 | `e1033784` |
| `maincpu` | `ffe_43.12h` | 0x40001 | 0x20000 | `995e968a` |
| `maincpu` | `ff-32m.8h` | 0x80000 | 0x80000 | `c747696e` |
| `gfx` | `ff-5m.7a` | 0x0 | 0x80000 | `9c284108` |
| `gfx` | `ff-7m.9a` | 0x2 | 0x80000 | `a7584dfb` |
| `gfx` | `ff-1m.3a` | 0x4 | 0x80000 | `0b605e44` |
| `gfx` | `ff-3m.5a` | 0x6 | 0x80000 | `52291cd2` |
| `audiocpu` | `ff_09.12b` | 0x0 | 0x8000 | `b8367eb5` |
| `oki` | `ff_18.11c` | 0x0 | 0x20000 | `375c66e7` |
| `oki` | `ff_19.12c` | 0x20000 | 0x20000 | `1ef137f9` |
| `aboardplds` | `buf1` | 0x0 | 0x117 | `eb122de7` |
| `aboardplds` | `ioa1` | 0x0 | 0x117 | `59c7ee3b` |
| `aboardplds` | `prg1` | 0x0 | 0x117 | `f1129744` |
| `aboardplds` | `rom1` | 0x0 | 0x117 | `41dc73b9` |
| `aboardplds` | `sou1` | 0x0 | 0x117 | `84f4b2fe` |
| `bboardplds` | `s224b.1a` | 0x0 | 0x117 | `cdc4413e` |
| `bboardplds` | `iob1.11e` | 0x0 | 0x117 | `3abc0700` |

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
| Space / X | button1 | `IN1` | 0x10 |
| Z | button2 | `IN1` | 0x20 |
| C | button3 | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN0` | 0x40 | 0x40 |
| Coin A | `DSWA` | 0x7 | 0x7 |
| Coin B | `DSWA` | 0x38 | 0x38 |
| 2 Coins to Start, 1 to Continue | `DSWA` | 0x40 | 0x40 |
| Unused | `DSWA` | 0x80 | 0x80 |
| Difficulty Level 1 | `DSWB` | 0x7 | 0x4 |
| Difficulty Level 2 | `DSWB` | 0x18 | 0x10 |
| Bonus Life | `DSWB` | 0x60 | 0x60 |
| Unused | `DSWB` | 0x80 | 0x80 |
| Lives | `DSWC` | 0x3 | 0x3 |
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

Arcade Video game published 36 years ago:

Final Fight (c) 1990 Capcom USA, Incorporated.

Export release. Game developed in Japan. For more information about the game itself, see the original Japanese release entry; "Final Fight [B-Board 88622B-3]".

### Technical
Runs on the "CP System" hardware.
B-Board ID: 89624B-3

### Trivia
The original Japanese version had a scene that shows Jessica in underwear on the TV in the abstract mode. This scene was removed in all Export versions.

The game can be unlocked after one of the cutscenes in "Final Fight - Streetwise" for the Sony PlayStation 2 and the Microsoft XBOX. Completing the game with one credit will unlock a special credits screen.

### Updates
First revision:
* No Build Date screen.

Second revision:
* Buid date screen added.
* Build date: 900112

Third revision:
* Build date: 900424

Fourth revision:
* Build date: 900613

### Ports
Here is a list of ports released outside Japan. To see Japanese ports, please see the original Japanese version entry, "Final Fight [B-Board 88622B-3]". 

* CONSOLES: 
[US] Nintendo SNES (sept.1991) "Final Fight [Model SNS-FT-USA]" 
[AU] Nintendo SNES (1992) "Final Fight [Model SNSP-FT-AUS]" 
[EU] Nintendo SNES (mar.20, 1992) "Final Fight Guy [Model SHVC-FY]" 
[EU] Nintendo SNES (dec.10, 1992) "Final Fight [Model SNSP-FT-EUR]" 
[EU] Sega Mega CD (1993) "Final Fight CD [Model 4410]" 
[US] Sega CD (1993) "Final Fight CD [Model 4410]" 
[US] Nintendo SNES (june.1994) "Final Fight Guy [Model SNS-FY-USA]" 
[US] Microsoft XBOX (sept.27, 2005) "Capcom Classics Collection" 
[US] Sony PS2 (sept.27, 2005) "Capcom Classics Collection [Model SLUS-21316]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 
[EU] [KO] [US] [AU] Microsoft XBOX 360 [XBLA] (apr.14, 2010) "Final Fight - Double Impact" 
[EU] [US] Sony PlayStation 3 [PSN] (apr.15, 2010) "Final Fight - Double Impact" 
[US] Microsoft XBOX 360 (mar.27, 2012) "Capcom Digital Collection" [XBLA version]
[AU] Microsoft XBOX 360 (mar.29, 2012) "Capcom Digital Collection" [XBLA version] 
[EU] Microsoft XBOX 360 (mar.30, 2012) "Capcom Digital Collection" [XBLA version] 

* HANDHELDS: 
[US] Nintendo GBA (sept.26, 2001) "Final Fight One [Model AGB-AFFE-USA]" 
[EU] Nintendo GBA (sept.28, 2001) "Final Fight One [Model AGB-AFFP-EUR]" 
[US] Sony PSP (mar.22, 2006) "Capcom Classics Collection Remixed [Model ULUS-10097]" 
[EU] Sony PSP (jul.21, 2006) "Capcom Classics Collection Remixed [Model ULES-00347]" 

* COMPUTERS: 
[US] Commodore C64 [EU] (1991) 
[EU] Amstrad CPC (1991) 
[EU] Commodore Amiga (1991) 
[EU] Atari ST (1991) 
[EU] Sinclair ZX Spectrum (1991) 

* OTHERS: 
[US] Apple iPhone/iPad (nov.4, 2010) "Capcom Arcade [Model 397347348]" 
[US] Apple iPhone/iPod (sept.15, 2011) "Final Fight [Model 459663198]"

### Contribute
Edit this entry: https://www.arcade-history.com/game/69746/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `cps1`. Play it at [../../../app/g/ffight/](../../../app/g/ffight/) or [explore the knowledge graph](viewer.html).*
