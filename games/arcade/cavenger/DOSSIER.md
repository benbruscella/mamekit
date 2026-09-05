# Cosmic Avenger

**Universal · 1981** — transpiled from the MAME driver `src/mame/universal/ladybug.cpp` by mamekit.

![marquee](/artwork/media/marquees/cavenger.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/cavenger.webp) | ![cabinet](/artwork/media/cabinets/cavenger.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 4.000 MHz | 13 |

- **Sound:** sn76489 × 2 @ 4.000 MHz
- **Screen:** 240×192 @ 60.11 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `1.c4` | 0x0 | 0x1000 | `9e0cc781` |
| `maincpu` | `2.d4` | 0x1000 | 0x1000 | `5ce5b950` |
| `maincpu` | `3.e4` | 0x2000 | 0x1000 | `bc28218d` |
| `maincpu` | `4.h4` | 0x3000 | 0x1000 | `2b32e9f5` |
| `maincpu` | `5.j4` | 0x4000 | 0x1000 | `d117153e` |
| `maincpu` | `6.k4` | 0x5000 | 0x1000 | `c7d366cb` |
| `gfx1` | `9.f7` | 0x0 | 0x1000 | `63357785` |
| `gfx1` | `0.h7` | 0x1000 | 0x1000 | `52ad1133` |
| `gfx2` | `8.l7` | 0x0 | 0x1000 | `b022bf2d` |
| `proms` | `10-2.k1` | 0x0 | 0x20 | `42a24dd5` |
| `proms` | `10-1.f4` | 0x20 | 0x20 | `d736b8de` |
| `proms` | `10-3.c4` | 0x40 | 0x20 | `27fa3a50` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `IN0` | 0x1 |
| Down | joystick down | `IN0` | 0x2 |
| Right | joystick right | `IN0` | 0x4 |
| Up | joystick up | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| 1 | start1 | `IN0` | 0x20 |
| 2 | start2 | `IN0` | 0x40 |
| Z | button2 | `IN2` | 0x1 |
| 5 | coin1 | `COIN` | 0x1 |
| 6 | coin2 | `COIN` | 0x2 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Difficulty | `DSW0` | 0x3 | 0x3 |
| High Score Names | `DSW0` | 0x4 | 0x4 |
| Cabinet | `DSW0` | 0x8 | 0x0 |
| Initial High Score | `DSW0` | 0x30 | 0x0 |
| Lives | `DSW0` | 0xc0 | 0xc0 |
| Coin B | `DSW1` | 0xf | 0xf |
| Coin A | `DSW1` | 0xf0 | 0xf0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/universal/ladybug.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 162 commits by 25 contributors, 2007–2025
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 45 years ago:

Cosmic Avenger (c) 1981 Universal.

An early space shoot'em up game.

How to Play:
1. Your Avenger can be moved in 8 directions. The speed increases as it advances, while it decreases as it retreats.
2. Destroy the front enemy by pressing the Fire Button, and destroy the target below by pressing the Bomb Button.
3. The enemy UFO will assault you flying either from in front of you or from behind you.  You can locate it by using the radar.
4. A tough chase missile will pursue your Avenger persistently. Dodge it successfully, and you can cause the enemy to fight among themselves.
5. When you pass the enemy radar site, an ant-aircraft gun will fire at your according to the altitude of your Avenger.
6. When the screen advances further, the X station will appear. When you destroy it in good time, you can destroy all the targets appearing on the screen at once. You are then awarded a high score.
7. Your Avenger will be destroyed when it is affected by any explosion.
8. The 1st – 5th highest scores for the day can enter their names on the screen.

### Technical
Main CPU : Zilog Z80 (@ 4 Mhz)
Sound Chips : (2x) Texas Instruments SN76496 (@ 4 Mhz)

Screen orientation : Horizontal
Video resolution : 240 x 192 pixels
Screen refresh : 60.00 Hz
Palette colors : 32

Players : 2
Control : 8-way joystick
Buttons : 2

### Trivia
Released in July 1981.

This game is the first continuous X-axis (Left-Right) scrolling video game.

Wes Hupp holds the official record for this game with 117,290 points on November 17, 1982.

### Scoring
UFO : 100 points.
Chase Missile Station (loaded) : 80 points.
Chase Missile Station (empty) : 50 points.
Counter Missile Station (loaded) : 80 points.
Counter Missile Station (empty) : 50 points.
Station : 100 points.
Anti-Aircraft Gun : 50 points.
Tank (armed) : 130 points.
Tank (empty) : 100 points.
Submarine : 100 points.
Mine : 50 points.
Depth Bomb : 50 points.
X Station : 300 points.
Missile: 30 points.
Smart Bomb (Large Box with Flashing 'X') awards points for all enemies destroyed.

### Tips and tricks
* Alien UFO's can be destroyed by missiles or by contact with another UFO.

* Maximise your score on the tank stage by moving as slowly as possible. Tanks will appear as fast as you can fire. Remember to destroy any missiles fired by the tanks.

* Bomb diagonal missile launchers when they are below you, before they have a chance to launch.

* Vertical missiles are fired before you reach them. Slow down and allow them to fire, then destroy the launcher before it reloads.

* Destroy launchers situated on towers by firing missiles at them. This will clear the way for you well in advance.

* Watch the scanner for any UFO's coming from behind to see if they are coming in low or high. This will enable you to avoid them, but watch out for bullets.

* On the underwater stage destroy the mines so that alien subs are blown up in the subsequent explosion.

* You can move above enemy subs and bomb them safely as they only fire horizontally. Watch out for depth charges falling from above though.

o Don't miss the alien smart bombs as these clear a good few buildings in advance as well as awarding points.

### Ports
* CONSOLES:
Colecovision (1982)

### Series
Cosmic Series

1. Cosmic Monsters [Upright model] (1979)
2. Cosmic Monsters 2 (1979)
3. Cosmic Guerilla (1979)
4. Cosmic Alien (1980)
5. Devil Zone (1980)
6. Zero Hour (1980)
7. Space Panic (1980)
8. Cosmic Avenger (1981)

### Contribute
Edit this entry: https://www.arcade-history.com/game/506/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `ladybug`. Play it at [../../../app/g/cavenger/](../../../app/g/cavenger/) or [explore the knowledge graph](viewer.html).*
