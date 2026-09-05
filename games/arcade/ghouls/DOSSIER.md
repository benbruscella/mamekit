# Ghouls'n Ghosts (World)

**Capcom · 1988** — transpiled from the MAME driver `src/mame/capcom/cps1.cpp` by mamekit.

![marquee](/artwork/media/marquees/ghouls.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/ghouls.webp) | ![cabinet](/artwork/media/cabinets/ghouls.webp) |

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
| `maincpu` | `dme_29.10h` | 0x0 | 0x20000 | `166a58a2` |
| `maincpu` | `dme_30.10j` | 0x1 | 0x20000 | `7ac8407a` |
| `maincpu` | `dme_27.9h` | 0x40000 | 0x20000 | `f734b2be` |
| `maincpu` | `dme_28.9j` | 0x40001 | 0x20000 | `03d3e714` |
| `maincpu` | `dm-17.7j` | 0x80000 | 0x80000 | `3ea1b0f2` |
| `gfx` | `dm-05.3a` | 0x0 | 0x80000 | `0ba9c0b0` |
| `gfx` | `dm-07.3f` | 0x2 | 0x80000 | `5d760ab9` |
| `gfx` | `dm-06.3c` | 0x4 | 0x80000 | `4ba90b59` |
| `gfx` | `dm-08.3g` | 0x6 | 0x80000 | `4bdee9de` |
| `gfx` | `09.4a` | 0x200000 | 0x10000 | `ae24bb19` |
| `gfx` | `18.7a` | 0x200001 | 0x10000 | `d34e271a` |
| `gfx` | `13.4e` | 0x200002 | 0x10000 | `3f70dd37` |
| `gfx` | `22.7e` | 0x200003 | 0x10000 | `7e69e2e6` |
| `gfx` | `11.4c` | 0x200004 | 0x10000 | `37c9b6c6` |
| `gfx` | `20.7c` | 0x200005 | 0x10000 | `2f1345b4` |
| `gfx` | `15.4g` | 0x200006 | 0x10000 | `3c2a212a` |
| `gfx` | `24.7g` | 0x200007 | 0x10000 | `889aac05` |
| `gfx` | `10.4b` | 0x280000 | 0x10000 | `bcc0f28c` |
| `gfx` | `19.7b` | 0x280001 | 0x10000 | `2a40166a` |
| `gfx` | `14.4f` | 0x280002 | 0x10000 | `20f85c03` |
| `gfx` | `23.7f` | 0x280003 | 0x10000 | `8426144b` |
| `gfx` | `12.4d` | 0x280004 | 0x10000 | `da088d61` |
| `gfx` | `21.7d` | 0x280005 | 0x10000 | `17e11df0` |
| `gfx` | `16.4h` | 0x280006 | 0x10000 | `f187ba1c` |
| `gfx` | `25.7h` | 0x280007 | 0x10000 | `29f79c78` |
| `audiocpu` | `26.10a` | 0x0 | 0x8000 | `3692f6e5` |
| `aboardplds` | `buf1` | 0x0 | 0x117 | `eb122de7` |
| `aboardplds` | `ioa1` | 0x0 | 0x117 | `59c7ee3b` |
| `aboardplds` | `prg1` | 0x0 | 0x117 | `f1129744` |
| `aboardplds` | `rom1` | 0x0 | 0x117 | `41dc73b9` |
| `aboardplds` | `sou1` | 0x0 | 0x117 | `84f4b2fe` |
| `bboardplds` | `dm620.2a` | 0x0 | 0x117 | `f6e5f727` |
| `bboardplds` | `lwio.8i` | 0x0 | 0x117 | `ad52b90c` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| 1 | start1 | `IN0` | 0x10 |
| 2 | start2 | `IN0` | 0x20 |
| Space / X | button1 | `IN1` | 0x10 |
| Z | button2 | `IN1` | 0x20 |
| Right | joystick right | `IN1` | 0x1 |
| Left | joystick left | `IN1` | 0x2 |
| Down | joystick down | `IN1` | 0x4 |
| Up | joystick up | `IN1` | 0x8 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN0` | 0x40 | 0x40 |
| Lives | `DSWC` | 0x3 | 0x3 |
| Unused | `DSWC` | 0x4 | 0x4 |
| Unused | `DSWC` | 0x8 | 0x8 |
| Flip Screen | `DSWC` | 0x10 | 0x10 |
| Demo Sounds | `DSWC` | 0x20 | 0x20 |
| Allow Continue | `DSWC` | 0x40 | 0x40 |
| Game Mode | `DSWC` | 0x80 | 0x80 |
| Difficulty | `DSWB` | 0x7 | 0x5 |
| Unused | `DSWB` | 0x8 | 0x8 |
| Bonus Life | `DSWB` | 0x30 | 0x30 |
| Unused | `DSWB` | 0x40 | 0x40 |
| Unused | `DSWB` | 0x80 | 0x80 |
| Coin A | `DSWA` | 0x7 | 0x7 |
| Coin B | `DSWA` | 0x38 | 0x38 |
| Cabinet | `DSWA` | 0xc0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/capcom/cps1.cpp`
- **Written by:** Paul Leaman
- **License:** BSD-3-Clause
- **Development:** 594 commits by 51 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, Vas Crabb, Brian Troha

## The story

Arcade Video game published 38 years ago:

Ghouls'n Ghosts (c) 1988 Capcom.

Export release. Game developed in Japan. For more information about the game itself, please see the original Japanese release entry; "Daimakaimura [B-Board 88622B-2]".

### Technical
Runs on the "CP System" hardware
B-Board ID 88620B-2
B-Board PALs: DM620
CPS-B #: CPS-B-01 DL-0411-10001

There is no C-Board on these Export versions, contrary to the original Japanese release.

### Trivia
Ghouls'n Ghosts was released in December 1988 in arcades outside of Japan. It is known in Japan as "Daimakaimura".

### Tips and tricks
Debug features (US VERSION ONLY, it doesn't work on the original Japanese version) : 
How to activate the debug features.
1) Set "Game Mode" Dip Switch to "Game".
2) Set both "Coin A" and "Coin B" Dip Switches to 1C_1C.
3) Reset the game.
4) Insert a coin.
5) Set "Game Mode" Dip Switch to "Test".
6) Set the debug Dip Switches to what you want.
7) Start a 1 player game.

Some debug features :
- "Armor on New Life" is effective at the beginning of a new life. Note that even when you start without armor, you need to be hit twice.
- "Starting Weapon" is effective only when you start a new game or when you continue play.
- "Starting Level" is effective only when you start a new game (you must NOT continue play !).
- "Slow Motion" and "Invulnerability" can be changed at any time.

### Ports
Here is a list of all ports excluding Japanese ones. To see Japanese ports, please see the original Japanese version entry; "Daimakaimura [B-Board 88622B-2]".

* CONSOLES: 
[US] Sega Genesis (1989) 
Sega Mega Drive [BR] (1990) by Tec Toy 
Sega Mega Drive [KO] (1990) "Daemagyecheon [Model GM-5008-JM]" 
Sega Master System [US] [EU] (1990) "Ghouls'n Ghosts [Model 7055]" 
Sega Master System [BR] (1990) by Tec Toy 
[EU] Sega Mega Drive (nov.30, 1990) 
[EU] Sony PlayStation (sept.3, 1999) "Capcom Generations 2 - Chronicles of Arthur [Capcom Generations Disc 2] [Model SLES-11881]" 
[US] Microsoft XBOX (sept.27, 2005) "Capcom Classics Collection" 
[US] Sony PS2 (sept.27, 2005) "Capcom Classics Collection [Model SLUS-21316]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 

* HANDHELDS: 
[US] Sony PSP (oct.24, 2006) "Capcom Classics Collection Reloaded [Model ULUS-10134]" 
[EU] Sony PSP (nov.10, 2006) "Capcom Classics Collection Reloaded [Model ULES-00377]" 
[AU] Sony PSP (nov.16, 2006) "Capcom Classics Collection Reloaded" 

* COMPUTERS: 
[EU] Sinclair ZX Spectrum (1989) 
[US] Commodore C64 [EU] (1989) 
[EU] Atari ST (1989) 
[EU] Amstrad CPC (1989) 
Commodore Amiga [US] (1989) "Ghouls 'n' Ghosts"
Commodore Amiga [US] (1991) "Ghouls 'n' Ghosts & Venus the Flytrap [Chart Attack]"
Commodore Amiga [US] (199?) "Ghouls 'n' Ghosts [Platinum]"
[EU] Amstrad CPC (1990) "Coin-Op Hits II"
[EU] Amstrad CPC (1991) "Capcom Collection" 
[EU] Atari ST (1991) "Capcom Collection" 
[EU] Commodore C64 (1991) "Capcom Collection" 
[EU] Commodore Amiga (1991) "Capcom Collection" 
[EU] Sinclair ZX Spectrum (1991) "Capcom Collection" 

* OTHERS:  
Street Fighter II' Special Champion Edition Plug 'n Play TV Game [US] (2004) by Radica Games : Genesis version included as a bonus.
Apple iPhone/iPod [US] (nov.4, 2010) "Capcom Arcade [Model 397347348]"

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
Edit this entry: https://www.arcade-history.com/game/951/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `cps1`. Play it at [../../../app/g/ghouls/](../../../app/g/ghouls/) or [explore the knowledge graph](viewer.html).*
