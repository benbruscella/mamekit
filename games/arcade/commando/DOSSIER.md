# Commando (World)

**Capcom · 1985** — transpiled from the MAME driver `src/mame/capcom/commando.cpp` by mamekit.

![marquee](/artwork/media/marquees/commando.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/commando.webp) | ![cabinet](/artwork/media/cabinets/commando.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.000 MHz | 18 |
| `audiocpu` | Z80 | 3.000 MHz | 5 |

- **Sound:** ym2203 × 2 @ 1.500 MHz
- **Screen:** 256×224 @ 59.64 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `cm04.9m` | 0x0 | 0x8000 | `8438b694` |
| `maincpu` | `cm03.8m` | 0x8000 | 0x4000 | `35486542` |
| `audiocpu` | `cm02.9f` | 0x0 | 0x4000 | `f9cc4a74` |
| `chars` | `vt01.5d` | 0x0 | 0x4000 | `505726e0` |
| `tiles` | `vt11.5a` | 0x0 | 0x4000 | `7b2e1b48` |
| `tiles` | `vt12.6a` | 0x4000 | 0x4000 | `81b417d3` |
| `tiles` | `vt13.7a` | 0x8000 | 0x4000 | `5612dbd2` |
| `tiles` | `vt14.8a` | 0xc000 | 0x4000 | `2b2dee36` |
| `tiles` | `vt15.9a` | 0x10000 | 0x4000 | `de70babf` |
| `tiles` | `vt16.10a` | 0x14000 | 0x4000 | `14178237` |
| `sprites` | `vt05.7e` | 0x0 | 0x4000 | `79f16e3d` |
| `sprites` | `vt06.8e` | 0x4000 | 0x4000 | `26fee521` |
| `sprites` | `vt07.9e` | 0x8000 | 0x4000 | `ca88bdfd` |
| `sprites` | `vt08.7h` | 0xc000 | 0x4000 | `2019c883` |
| `sprites` | `vt09.8h` | 0x10000 | 0x4000 | `98703982` |
| `sprites` | `vt10.9h` | 0x14000 | 0x4000 | `f069d2f8` |
| `irqprom` | `vtb5.6l` | 0x0 | 0x100 | `712ac508` |
| `proms` | `vtb1.1d` | 0x0 | 0x100 | `3aba15a1` |
| `proms` | `vtb2.2d` | 0x100 | 0x100 | `88865754` |
| `proms` | `vtb3.3d` | 0x200 | 0x100 | `4c14c3f6` |
| `proms` | `vtb4.1h` | 0x300 | 0x100 | `b388c246` |
| `proms` | `vtb6.6e` | 0x400 | 0x100 | `0eaf5158` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 6 | coin2 | `SYSTEM` | 0x40 |
| 5 | coin1 | `SYSTEM` | 0x80 |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Down | joystick down | `P1` | 0x4 |
| Up | joystick up | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| Z | button2 | `P1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Starting Area | `DSW1` | 0x3 | 0x3 |
| Lives | `DSW1` | 0xc | 0xc |
| Coin B | `DSW1` | 0x30 | 0x30 |
| Coin A | `DSW1` | 0xc0 | 0xc0 |
| Bonus Life | `DSW2` | 0x7 | 0x7 |
| Demo Sounds | `DSW2` | 0x8 | 0x8 |
| Difficulty | `DSW2` | 0x10 | 0x10 |
| Flip Screen | `DSW2` | 0x20 | 0x0 |
| Cabinet | `DSW2` | 0xc0 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/capcom/commando.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 142 commits by 26 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Olivier Galibert

## The story

Arcade Video game published 41 years ago:

Commando (c) 1985 Data East USA, Inc.

North American release. Game developed in Japan. See the original for more information; "Senjou no Ookami".

### Trivia
Commando was released by Data East USA, under license by Capcom, in July 1985 in the USA. It was the first (and and only) game that Capcom licensed to Data East USA. 

Tim Balderramos holds the official record for this game with 10051200 points on July 5, 1986.

### Ports
Here is a list of ports released outside Japan. To see Japanese ports, please see the original Japanese version entry, "Senjou no Ookami".

* CONSOLES: 
[US] Nintendo NES (nov.1986) "Commando [Model NES-CO-USA]" 
[US] Mattel Intellivision (1987) "Commando [Model 9000]" 
[US] Atari 2600 (1988) "Commando [Model AK-043]" 
[US] Atari 7800 (1990) "Commando [Model CX7838]" 
[EU] Sony PlayStation (sept.3, 1999) "Capcom Generations 4 - Blazing Guns [Capcom Generations Disc 4] [Model SLES-31881]" 
[US] Microsoft XBOX (sept.27, 2005) "Capcom Classics Collection" 
[US] Sony PS2 (sept.27, 2005) "Capcom Classics Collection [Model SLUS-21316]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 
[US] Nintendo Wii [Virtual Console Arcade] (dec.6, 2010) "Wolf of the Battlefield: COMMANDO" 
[EU] [AU] Nintendo Wii [Virtual Console Arcade]  (dec.17, 2010) "Wolf of the Battlefield: COMMANDO" 
[EU] Sony PlayStation 3 [PSN] (feb.20, 2013) "Capcom Arcade Cabinet"
[EU] Microsoft XBOX 360 [XBLA] (feb.20, 2013) "Capcom Arcade Cabinet"
[AU] Microsoft XBOX 360 [XBLA] (feb.21, 2013) "Capcom Arcade Cabinet"
[US] Sony PlayStation 3 [PSN] (apr.2, 2013) "Capcom Arcade Cabinet: Game Pack 4 [DLC]"
[US] Microsoft XBOX 360 [XBLA] (apr.3, 2013) "Capcom Arcade Cabinet: Game Pack 4 [DLC]"
[US] Sony PlayStation 3 [PSN] (may.21, 2013) "Capcom Arcade Cabinet: All-In-One Pack [DLC]"
[US] Microsoft XBOX 360 [XBLA] (may.22, 2013) "Capcom Arcade Cabinet: All-In-One Pack [DLC]"

* HANDHELDS: 
[US] Sony PSP (oct.24, 2006) "Capcom Classics Collection Reloaded [Model ULUS-10134]"
[EU] Sony PSP (nov.10, 2006) "Capcom Classics Collection Reloaded [Model ULES-00377]"
[AU] Sony PSP (nov.16, 2006) "Capcom Classics Collection Reloaded"

* COMPUTERS: 
[US] [EU] Commodore C64 (1985)
[EU] BBC Micro (1985)
[EU] Amstrad CPC (1985)
[EU] Amstrad CPC (1986, "Budget Edition")
[US] PC [Booter] (1986)
[EU] Sinclair ZX Spectrum (1986)
[US] Commodore 16 (1986)
[EU] Commodore Plus/4 (1986)
[US] Apple II (1987)
[US] Commodore Amiga (1989)
[EU] Atari ST (1989)
[US] PC [MS Windows, CD-ROM] (2003) "Capcom Arcade Hits 3"
[US] PC [MS-Windows, CD-ROM] (dec.21, 2004) "Capcom Coin-Op Collection Volume 1"

* OTHERS: 
[US] Mobile Phones (sept.1, 2004)
[US] Apple iPhone/iPad (nov.4, 2010) "Capcom Arcade [Model 397347348]"
[US] Apple iPhone/iPod (jan.13, 2011) "Commando [Model 414168660]"

### Series
1. Commando (1985) 
2. Mercs [CP-S No. 09] (1990) 
3. Wolf of the Battlefield - Commando 3 (2007, XBLA, PSN)

### Contribute
Edit this entry: https://www.arcade-history.com/game/490/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `commando`. Play it at [../../../app/g/commando/](../../../app/g/commando/) or [explore the knowledge graph](viewer.html).*
