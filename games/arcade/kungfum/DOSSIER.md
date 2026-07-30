# Kung-Fu Master (World)

**Irem · 1984** — transpiled from the MAME driver `src/mame/irem/m62.cpp` by mamekit.

![marquee](/artwork/media/marquees/kungfum.png)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/kungfum.png) | ![cabinet](/artwork/media/cabinets/kungfum.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 6 |
| `iremsound` | M6803 | 3.580 MHz | 3 |

- **Sound:** ay8910 × 2 @ 0.895 MHz
- **Screen:** 256×256 @ 56.34 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `a-4e-c.bin` | 0x0 | 0x4000 | `b6e2d083` |
| `maincpu` | `a-4d-c.bin` | 0x4000 | 0x4000 | `7532918e` |
| `irem_audio:iremsound` | `a-3e-.bin` | 0xa000 | 0x2000 | `58e87ab0` |
| `irem_audio:iremsound` | `a-3f-.bin` | 0xc000 | 0x2000 | `c81e31ea` |
| `irem_audio:iremsound` | `a-3h-.bin` | 0xe000 | 0x2000 | `d99fb995` |
| `gfx1` | `g-4c-a.bin` | 0x0 | 0x2000 | `6b2cc9c8` |
| `gfx1` | `g-4d-a.bin` | 0x2000 | 0x2000 | `c648f558` |
| `gfx1` | `g-4e-a.bin` | 0x4000 | 0x2000 | `fbe9276e` |
| `gfx2` | `b-4k-.bin` | 0x0 | 0x2000 | `16fb5150` |
| `gfx2` | `b-4f-.bin` | 0x2000 | 0x2000 | `67745a33` |
| `gfx2` | `b-4l-.bin` | 0x4000 | 0x2000 | `bd1c2261` |
| `gfx2` | `b-4h-.bin` | 0x6000 | 0x2000 | `8ac5ed3a` |
| `gfx2` | `b-3n-.bin` | 0x8000 | 0x2000 | `28a213aa` |
| `gfx2` | `b-4n-.bin` | 0xa000 | 0x2000 | `d5228df3` |
| `gfx2` | `b-4m-.bin` | 0xc000 | 0x2000 | `b16de4f2` |
| `gfx2` | `b-3m-.bin` | 0xe000 | 0x2000 | `eba0d66b` |
| `gfx2` | `b-4c-.bin` | 0x10000 | 0x2000 | `01298885` |
| `gfx2` | `b-4e-.bin` | 0x12000 | 0x2000 | `c77b87d4` |
| `gfx2` | `b-4d-.bin` | 0x14000 | 0x2000 | `6a70615f` |
| `gfx2` | `b-4a-.bin` | 0x16000 | 0x2000 | `6189d626` |
| `spr_height_prom` | `b-5f-.bin` | 0x0 | 0x20 | `7a601c3d` |
| `spr_color_proms` | `b-1m-.bin` | 0x0 | 0x100 | `76c05a9c` |
| `spr_color_proms` | `b-1n-.bin` | 0x100 | 0x100 | `23f06b99` |
| `spr_color_proms` | `b-1l-.bin` | 0x200 | 0x100 | `35e45021` |
| `chr_color_proms` | `g-1j-.bin` | 0x0 | 0x100 | `668e6bca` |
| `chr_color_proms` | `g-1f-.bin` | 0x100 | 0x100 | `964b6495` |
| `chr_color_proms` | `g-1h-.bin` | 0x200 | 0x100 | `550563e1` |
| `timing` | `b-6f-.bin` | 0x0 | 0x100 | `82c20d12` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x4 |
| 5 | coin1 | `SYSTEM` | 0x8 |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Down | joystick down | `P1` | 0x4 |
| Up | joystick up | `P1` | 0x8 |
| Z | button2 | `P1` | 0x20 |
| Space / X | button1 | `P1` | 0x80 |
| 6 | coin2 | `P2` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Flip Screen | `DSW2` | 0x1 | 0x1 |
| Cabinet | `DSW2` | 0x2 | 0x0 |
| Coin Mode | `DSW2` | 0x4 | 0x4 |
| Invulnerability (Cheat) | `DSW2` | 0x40 | 0x40 |
| Service Mode | `DSW2` | 0x80 | 0x80 |
| Slow Motion Mode (Cheat) | `DSW2` | 0x8 | 0x8 |
| Freeze (Cheat) | `DSW2` | 0x10 | 0x10 |
| Level Selection Mode (Cheat) | `DSW2` | 0x20 | 0x20 |
| Difficulty | `DSW1` | 0x1 | 0x1 |
| Energy Loss | `DSW1` | 0x2 | 0x2 |
| Lives | `DSW1` | 0xc | 0xc |
| Coinage | `DSW1` | 0xf0 | 0xf0 |
| Coin A | `DSW1` | 0x30 | 0x30 |
| Coin B | `DSW1` | 0xc0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/irem/m62.cpp`
- **Written by:** smf, David Haywood
- **License:** BSD-3-Clause
- **Development:** 124 commits by 25 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Olivier Galibert, Ivan Vangelista

## The story

Arcade Video game published 42 years ago:

Kung-Fu Master (c) 1984 Data East USA, Inc.

Export release. For more complete information on the game itself, please see the original Japanese version entry; "Spartan X".

### Trivia
Kung-Fu Master was released in December 1984 outside Japan. Originally known in Japan as as "Spartan X". 

Licensed to Data East for US manufacture and distribution. Kung-Fu Master was the first game that Irem licensed to Data East and was also the first of two genre-defining fighting games released by Data East that year; the other being 'Karate Champ', the world's first one-on-one fighting game.

Differences between Spartan X and Kung-Fu Master:
* During the demo screen the word Kung-Fu (in 'A KUNG-FU MASTER, THOMAS....') is spelled 'KANFU' in Spartan X.
* Spartan X has an additional copyright notice that is not in Kung-Fu Master : '(C)1984 Paragon Films Ltd., Towa Promotion'.

A bootleg of this game was released by O.K. corp. in 1985. 

Mike Sullivan holds the official record for this game with 1,349,040 points.

### Ports
* CONSOLES: 
[AS] Nintendo Famicom (1984) "Kung Fu" 
[US] Atari 2600 (may.12, 1987) "Kung-Fu Master [Model AG-039]" by Activision
[US] Nintendo NES (oct.1985) "Kung Fu [Model NES-SX-USA]" 
[EU] Nintendo NES (apr.15, 1987) "Kung Fu [Model NES-SX-NOE]" 
[US] Atari 7800 (1989) "Kung-Fu Master [Model AM-039-04]" by Absolute Entertainment

* HANDHELDS: 
[EU] Nintendo Game Boy (1991) "Kung Fu Master [Model DMG-SX-NOE]" 
[US] Nintendo Game Boy (feb.1991) "Kung Fu Master [Model DMG-SX]" 

* COMPUTERS: 
[US] Apple II (1985) "Kung Fu Master" 
[US] Commodore C64 [EU] (1985) "Kung Fu Master" 
[EU] Sinclair ZX Spectrum (1986) "Kung-Fu Master" by U.S. Gold 
[EU] Amstrad CPC (1987) "Kung-Fu Master"
PC [MS Windows, Online] [EU] (dec.9, 2011) "IREM Arcade Hits" by DotEmu 
Apple MacIntosh [Online] [US] (aug.21, 2011) "Irem Arcade Hits" by DotEmu 
PC [Desura] [US] (nov.2, 2013) "IREM Arcade Hits" by Plug In Digital

### Series
1. Kung-Fu Master (1984, Arcade)
2. Vigilante (1988, Arcade)
3. Spartan X 2 (1991, Famicom)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1331/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `m62`. Play it at [../../../app/g/kungfum/](../../../app/g/kungfum/) or [explore the knowledge graph](viewer.html).*
