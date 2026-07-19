# Ghosts'n Goblins (World? set 1)

**Capcom · 1985** — transpiled from the MAME driver `src/mame/capcom/gng.cpp` by mamekit.

![marquee](/artwork/media/marquees/gng.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/gng.png) | ![cabinet](/artwork/media/cabinets/gng.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | MC6809 | 6.000 MHz | 19 |
| `audiocpu` | Z80 | 3.000 MHz | 5 |

- **Sound:** ym2203 × 2 @ 1.500 MHz
- **Screen:** 256×224 @ 59.64 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `mm_c_04` | 0x4000 | 0x4000 | `4f94130f` |
| `maincpu` | `mm_c_03` | 0x8000 | 0x8000 | `1def138a` |
| `maincpu` | `mm_c_05` | 0x10000 | 0x8000 | `ed28e86e` |
| `audiocpu` | `gg2.bin` | 0x0 | 0x8000 | `615f5b6f` |
| `chars` | `gg1.bin` | 0x0 | 0x4000 | `ecfccf07` |
| `tiles` | `gg11.bin` | 0x0 | 0x4000 | `ddd56fa9` |
| `tiles` | `gg10.bin` | 0x4000 | 0x4000 | `7302529d` |
| `tiles` | `gg9.bin` | 0x8000 | 0x4000 | `20035bda` |
| `tiles` | `gg8.bin` | 0xc000 | 0x4000 | `f12ba271` |
| `tiles` | `gg7.bin` | 0x10000 | 0x4000 | `e525207d` |
| `tiles` | `gg6.bin` | 0x14000 | 0x4000 | `2d77e9b2` |
| `sprites` | `gg17.bin` | 0x0 | 0x4000 | `93e50a8f` |
| `sprites` | `gg16.bin` | 0x4000 | 0x4000 | `06d7e5ca` |
| `sprites` | `gg15.bin` | 0x8000 | 0x4000 | `bc1fe02d` |
| `sprites` | `gg14.bin` | 0x10000 | 0x4000 | `6aaf12f9` |
| `sprites` | `gg13.bin` | 0x14000 | 0x4000 | `e80c3fca` |
| `sprites` | `gg12.bin` | 0x18000 | 0x4000 | `7780a925` |
| `proms` | `tbp24s10.14k` | 0x0 | 0x100 | `0eaf5158` |
| `proms` | `63s141.2e` | 0x100 | 0x100 | `4a1285a4` |
| `plds` | `gg-pal10l8.bin` | 0x0 | 0x2c | `87f1b7e0` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x20 |
| 5 | coin1 | `SYSTEM` | 0x40 |
| 6 | coin2 | `SYSTEM` | 0x80 |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Down | joystick down | `P1` | 0x4 |
| Up | joystick up | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| Z | button2 | `P1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coinage | `DSW1` | 0xf | 0xf |
| Coinage affects | `DSW1` | 0x10 | 0x10 |
| Demo Sounds | `DSW1` | 0x20 | 0x0 |
| Service Mode | `DSW1` | 0x40 | 0x40 |
| Flip Screen | `DSW1` | 0x80 | 0x80 |
| Lives | `DSW2` | 0x3 | 0x3 |
| Cabinet | `DSW2` | 0x4 | 0x0 |
| Bonus Life | `DSW2` | 0x18 | 0x18 |
| Difficulty | `DSW2` | 0x60 | 0x60 |
| Unused | `DSW2` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/capcom/gng.cpp`
- **Written by:** Pierpaolo Prazzoli
- **License:** BSD-3-Clause
- **Development:** 162 commits by 32 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, hap, Ivan Vangelista

## The story

Arcade Video game published 41 years ago:

Ghosts'n Goblins (c) 1985 Capcom.

Export release. Game developed in Japan. For more information about the game itself, please see the original Japanese version entry; "Makaimura".

### Trivia
Ghosts'n Goblins was released in September 1985 outside Japan.

These non-Japanese versions use a shield instead of a cross.

### Updates
A rare prototype version of the game exists with no title logo. It seems to be harder than the final version.

### Ports
Here is a list of all ports release outside Japan and North America.

To see Japanese ports, please see the original Japanese version entry; "Makaimura".

To see North American ports, please see the Taito America version entry.

* CONSOLES: 
[EU] Nintendo NES (mar.23, 1989) "Ghosts'n Goblins [Model NES-GG-EUR]" 
[EU] Sony PlayStation (sept.3, 1999) "Capcom Generations 2 - Chronicles of Arthur [Capcom Generations Disc 2] [Model SLES-11881]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 
Nintendo Wii [Virtual Console Arcade] [EU] (jan.7, 2011) 
Sony PlayStation 3 [PSN] [EU] (feb.20, 2013) "Capcom Arcade Cabinet" 
Microsoft XBOX 360 [XBLA] [EU] (feb.20, 2013) "Capcom Arcade Cabinet" 
Microsoft XBOX 360 [XBLA] [AU] (feb.21, 2013) "Capcom Arcade Cabinet" 

* HANDHELDS: 
Nintendo Game Boy Color [EU] (aug.24, 2001) "Ghosts'n Goblins [Model DMG-AG9P-EUR]" 
[EU] Sony PSP (nov.10, 2006) "Capcom Classics Collection Reloaded [Model ULES-00377]" 
[AU] Sony PSP (nov.16, 2006) "Capcom Classics Collection Reloaded" 

* COMPUTERS: 
Commodore C16 [EU] (1986) 
[EU] Commodore C64 (1986) 
[EU] Sinclair ZX Spectrum (1986) 
[EU] Amstrad CPC (1986) 
[EU] Commodore Amiga (1988) 
[EU] Amstrad CPC (1989) "12 Top Amstrad Hits" 
PC [MS-DOS] [EU] (1990) 
[EU] Atari ST (1990)

### Series
MAIN SERIES
1. Ghosts'n Goblins (1985, Arcade)
2. Ghouls'n Ghosts [B-Board 88620B-2] (1988, Arcade)
3. Super Ghouls'n Ghosts [Model SNS-CM-USA] (1991, SNES)
4. Makaimura Gaiden - The Demon Darkness (1993, Game Boy)
5. Arthur to Astaroth no Nazomakaimura (1996, PlayStation, Saturn)
6. Makaimura for WonderSwan (1999, WonderSwan)
7. Maximo - Ghosts to Glory (2001, PS2)
8. Choumakaimura R (2002, Game Boy Advance)
9. Maximo vs. Army of Zin (2003, PS2)
10. Ultimate Ghosts'n Goblins (2006, PSP)
11. Goku Makaimura Kai (2007, PSP) 
12. Ghosts'n Goblins - Gold Knights (2009, iOS)
13. Ghosts'n Goblins - Gold Knights II (2010, iOS)
14. Ghosts'n Goblins Resurrection (2021, Switch, PS4, PC, Xbox One)

SPIN-OFF
1. Gargoyle's Quest (1990, Game Boy)
2. Gargoyle's Quest II (1992, NES)
3. Demon's Crest (1994, SNES)

### Contribute
Edit this entry: https://www.arcade-history.com/game/950/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `gng`. Play it at [../app/g/gng/](../app/g/gng/) or [explore the knowledge graph](viewer.html).*
