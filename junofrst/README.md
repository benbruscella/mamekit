# Juno First

**Konami · 1983** — transpiled from the MAME driver `src/mame/konami/junofrst.cpp` by mamekit.

![marquee](/artwork/media/marquees/junofrst.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/junofrst.png) | ![cabinet](/artwork/media/cabinets/junofrst.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | KONAMI1 | 1.536 MHz | 16 |
| `audiocpu` | Z80 | 1.790 MHz | 8 |
| `mcu` | I8039 | 8.000 MHz | 1 |

- **Sound:** ay8910 × 1 @ 1.790 MHz
- **Screen:** 768×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `jfa_b9.bin` | 0xa000 | 0x2000 | `f5a7ab9d` |
| `maincpu` | `jfb_b10.bin` | 0xc000 | 0x2000 | `f20626e0` |
| `maincpu` | `jfc_a10.bin` | 0xe000 | 0x2000 | `1e7744a7` |
| `maincpu` | `jfc1_a4.bin` | 0x10000 | 0x2000 | `03ccbf1d` |
| `maincpu` | `jfc2_a5.bin` | 0x12000 | 0x2000 | `cb372372` |
| `maincpu` | `jfc3_a6.bin` | 0x14000 | 0x2000 | `879d194b` |
| `maincpu` | `jfc4_a7.bin` | 0x16000 | 0x2000 | `f28af80b` |
| `maincpu` | `jfc5_a8.bin` | 0x18000 | 0x2000 | `0539f328` |
| `maincpu` | `jfc6_a9.bin` | 0x1a000 | 0x2000 | `1da2ad6e` |
| `audiocpu` | `jfs1_j3.bin` | 0x0 | 0x1000 | `235a2893` |
| `mcu` | `jfs2_p4.bin` | 0x0 | 0x1000 | `d0fa5d5f` |
| `blitrom` | `jfs3_c7.bin` | 0x0 | 0x2000 | `aeacf6db` |
| `blitrom` | `jfs4_d7.bin` | 0x2000 | 0x2000 | `206d954c` |
| `blitrom` | `jfs5_e7.bin` | 0x4000 | 0x2000 | `1eb87a6e` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `SYSTEM` | 0x1 |
| 6 | coin2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x4 |
| 1 | start1 | `SYSTEM` | 0x8 |
| 2 | start2 | `SYSTEM` | 0x10 |
| Left | joystick left | `P1` | 0x1 |
| Right | joystick right | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Z | button2 | `P1` | 0x10 |
| Space / X | button1 | `P1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW1` | 0xf | 0xf |
| Coin B | `DSW1` | 0xf0 | 0xf0 |
| Lives | `DSW2` | 0x3 | 0x3 |
| Cabinet | `DSW2` | 0x4 | 0x0 |
| Unused | `DSW2` | 0x8 | 0x8 |
| Difficulty | `DSW2` | 0x70 | 0x70 |
| Demo Sounds | `DSW2` | 0x80 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/junofrst.cpp`
- **Written by:** Chris Hardy
- **License:** BSD-3-Clause
- **Development:** 165 commits by 29 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Olivier Galibert

## The story

Arcade Video game published 43 years ago:

Juno First (c) 1983 Konami.

Juno First a vertically-scrolling shoot-em-up viewed from a third-person perspective in which players must destroy waves of attacking aliens. Unlike other shooters of the time, the game's enemies don't line up in a gallery formation but instead move freely around the screen. Because of this, the player's ship can move both forwards and backwards (in addition to left and right).

As well as the attacking aliens a spherical 'space capsule' occasionally appears on-screen and if shot, it releases an enemy astronaut that can then be captured. This must be done within a set time, however, with the screen having  a red tint for the period in which rescue is possible. During the capture phase, every enemy the player shoots is worth an additional 200 points. 

As a last resort players also have the option to 'warp' to another random part of the play area. This is highly risky as it may place the player's ship in a position more dangerous than the one it left. Players are allowed three warps per level.

Starting formations vary from stage to stage and the aliens mutate into more dangerous forms the longer they survive. To complete a level all aliens must be destroyed.

### Technical
Game ID : GX310

Main CPU : Motorola M6809 (@ 1.5 Mhz)
Sound CPU : Zilog Z80 (@ 1.78975 Mhz), I8039 (@ 533.333 Khz)
Sound Chips : General Instrument AY8910 (@ 1.78975 Mhz), DAC, (3x) RC (@ 1.789772 Mhz)

Players : 2
Control : 8-way joystick
Buttons : 3

### Trivia
Juno First was released in July 1983 in Japan.

Tom Gibson holds the official record for this game with 78888980 points.

Released in North America as "Juno First [GV-122]"

### Tips and tricks
* Shooting the space capsule will cause a astronaut to appear. Touching this astronaut will engage a bonus mode. In this mode, the enemy ships will stop firing for 10 seconds and each enemy destroyed will earn the player bonus points.

* To take full advantage of the bonus mode, avoid shooting enemy ships for about the first 20 seconds of the wave until the asteroid appears and you activate bonus mode. This will allow you to kill more enemies while in bonus mode.

* Don't forget to use your warp button - it can get you out of some sticky situations. You have 3 warps per level, and warps do not carry over to the next level.

* An extra ship is awarded at every 100,000 points, but be aware that the score rolls over after 1,000,000 points.

### Ports
* COMPUTERS:
[EU] MSX (1983)
[JP] MSX (1984)
[EU] Commodore C64 (1984)
[US] PC MS-DOS (1984)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1245/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `junofrst`. Play it at [../app/g/junofrst/](../app/g/junofrst/) or [explore the knowledge graph](viewer.html).*
