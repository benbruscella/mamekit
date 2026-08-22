# Tutankham

**Konami · 1982** — transpiled from the MAME driver `src/mame/konami/tutankhm.cpp` by mamekit.

![marquee](/artwork/media/marquees/tutankhm.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/tutankhm.webp) | ![cabinet](/artwork/media/cabinets/tutankhm.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | MC6809E | 1.536 MHz | 16 |
| `timeplt_audio:tpsound` | Z80 | 1.790 MHz | 7 |

- **Sound:** ay8910 × 2 @ 1.790 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `m1.1h` | 0xa000 | 0x1000 | `da18679f` |
| `maincpu` | `m2.2h` | 0xb000 | 0x1000 | `a0f02c85` |
| `maincpu` | `3j.3h` | 0xc000 | 0x1000 | `ea03a1ab` |
| `maincpu` | `m4.4h` | 0xd000 | 0x1000 | `bd06fad0` |
| `maincpu` | `m5.5h` | 0xe000 | 0x1000 | `bf9fd9b0` |
| `maincpu` | `j6.6h` | 0xf000 | 0x1000 | `fe079c5b` |
| `maincpu` | `c1.1i` | 0x10000 | 0x1000 | `7eb59b21` |
| `maincpu` | `c2.2i` | 0x11000 | 0x1000 | `6615eff3` |
| `maincpu` | `c3.3i` | 0x12000 | 0x1000 | `a10d4444` |
| `maincpu` | `c4.4i` | 0x13000 | 0x1000 | `58cd143c` |
| `maincpu` | `c5.5i` | 0x14000 | 0x1000 | `d7e7ae95` |
| `maincpu` | `c6.6i` | 0x15000 | 0x1000 | `91f62b82` |
| `maincpu` | `c7.7i` | 0x16000 | 0x1000 | `afd0a81f` |
| `maincpu` | `c8.8i` | 0x17000 | 0x1000 | `dabb609b` |
| `maincpu` | `c9.9i` | 0x18000 | 0x1000 | `8ea9c6a6` |
| `timeplt_audio:tpsound` | `s1.7a` | 0x0 | 0x1000 | `b52d01fa` |
| `timeplt_audio:tpsound` | `s2.8a` | 0x1000 | 0x1000 | `9db5c0ce` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| 1 | start1 | `IN0` | 0x8 |
| 2 | start2 | `IN0` | 0x10 |
| Left | joystick left | `IN1` | 0x1 |
| Right | joystick right | `IN1` | 0x2 |
| Up | joystick up | `IN1` | 0x4 |
| Down | joystick down | `IN1` | 0x8 |
| J | joystickright left | `IN1` | 0x10 |
| L | joystickright right | `IN1` | 0x20 |
| Z | p1 flash bomb | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `DSW2` | 0x3 | 0x3 |
| Cabinet | `DSW2` | 0x4 | 0x0 |
| Bonus Life | `DSW2` | 0x8 | 0x8 |
| Difficulty | `DSW2` | 0x30 | 0x20 |
| Flash Bomb | `DSW2` | 0x40 | 0x40 |
| Demo Sounds | `DSW2` | 0x80 | 0x0 |
| Coin A | `DSW1` | 0xf | 0xf |
| Coin B | `DSW1` | 0xf0 | 0xf0 |
| Starfield selection | `STARS` | 0x1 | 0x1 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/tutankhm.cpp`
- **Written by:** Mirko Buffoni
- **License:** BSD-3-Clause
- **Development:** 125 commits by 25 contributors, 2007–2025
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, AJR, Ivan Vangelista

## The story

Arcade Video game published 44 years ago:

Tutankham (c) 1982 Konami.

Inside King Tut's tomb are treasures beyond your wildest dreams. They can be yours... if you dare to take them. Supernatural creatures roam the mazes of the tomb guarding the treasures at all costs. Your only defenses against them are your laser gun... and your wits. Blast away, snatch the loot, escape through secret passageway before it's too late! And when you see a key, take that, too. It will unlock the door to the next chamber and the next adventure. Enter King Tut's tomb and see what awaits you... if you dare.

### Technical
Game ID : GX350

Main CPU : Motorola M6809 (@ 1.5 Mhz)
Sound CPU : Zilog Z80 (@ ~1.79 Mhz)
Sound Chips : (2x) General Instrument AY8910 (@ ~1.79 Mhz), (6x) RC (@ ~1.79 Mhz)

Players : 2
Control : 4-way joystick
Buttons : 3

### Trivia
Tutankham was released in June 1982 in Japan.

The game was originally to be called 'Tutankhamon'. However, when programmers decided to change the monitor position from horizontal to vertical, they had to cut the -ON suffix from 'Tutankhamon' to make the title fit the screen width.

Licensed to Stern for manufacture and distribution in USA as "Tutankham".

### Scoring
Killing a Snake : 20 points.
Killing a Monster : 40 points.
Killing a Bat : 60 points.
Collecting a Ring : Mystery Score (From 500 points).
Collecting a Lantern : Mystery Score (Up to 4,000 points).
Collecting a key : 500 points.
Opening a door : 1,000 points.

Bonus points are awarded at the end of each level for the time remaining.

### Tips and tricks
* Flash bombs can only be used once per level, and remember you only have 3 available for the whole game. Use them sparingly, preferably only in a life-threatening situation.

* You can sit in a safe place close to a monster generator and simply pick the monsters off as they appear. Most monsters follow a set pattern of movement so it is quite easy to predict which way they will turn and wait in a place where it is easy to kill them as they appear in front or behind you. Remember to watch the timer though!

* The lanterns and rings are quite often a deadly diversion as they are sometimes placed in dead end vertical passages. Assess the risks carefully before collecting them.

* Be careful when entering vertical tunnels as you cannot shoot monsters on the other side until they are level with you in a horizontal direction.

* A carefully timed shot can kill a monster in a vertical tunnel, but only when fired exactly when the monster moves into the square in which you are stood.

### Staff
Programmed by : H. Tanigaki

### Ports
* CONSOLES:
Casio PV-1000 [JP] 

* HANDHELDS: 
[JP] Nintendo DS (mar.15, 2007) "Konami Arcade Collection [Model NTR-A5KJ-JPN]" 
[EU] Nintendo DS (oct.26, 2007) "Konami Arcade Classics [Model NTR-ACXP-EUR]" 
[AU] Nintendo DS (oct.29, 2007) "Konami Arcade Classics" 

* COMPUTERS:
[EU] Sinclair ZX Spectrum (1984)

* OTHERS:
LCD handheld game by Konami.
VFD handheld game (1983) by Bandai.

### Contribute
Edit this entry: https://www.arcade-history.com/game/2998/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `tutankhm`. Play it at [../../../app/g/tutankhm/](../../../app/g/tutankhm/) or [explore the knowledge graph](viewer.html).*
