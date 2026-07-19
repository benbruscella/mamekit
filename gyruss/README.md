# Gyruss

**Konami · 1983** — transpiled from the MAME driver `src/mame/konami/gyruss.cpp` by mamekit.

![marquee](/artwork/media/marquees/gyruss.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/gyruss.png) | ![cabinet](/artwork/media/cabinets/gyruss.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 12 |
| `sub` | KONAMI1 | 1.536 MHz | 7 |
| `audiocpu` | Z80 | 3.580 MHz | 3 |
| `audio2` | I8039 | 8.000 MHz | 1 |

- **Sound:** ay8910 × 5 @ 1.790 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `gyrussk.1` | 0x0 | 0x2000 | `c673b43d` |
| `maincpu` | `gyrussk.2` | 0x2000 | 0x2000 | `a4ec03e4` |
| `maincpu` | `gyrussk.3` | 0x4000 | 0x2000 | `27454a98` |
| `maincpu` | `gyrussk.4` | 0x6000 | 0x2000 | `7f28f9e4` |
| `sub` | `gyrussk.9` | 0xe000 | 0x2000 | `822bf27e` |
| `audiocpu` | `gyrussk.1a` | 0x0 | 0x2000 | `f4ae1c17` |
| `audiocpu` | `gyrussk.2a` | 0x2000 | 0x2000 | `ba498115` |
| `audio2` | `gyrussk.3a` | 0x0 | 0x1000 | `3f9b5dea` |
| `sprites` | `gyrussk.6` | 0x0 | 0x2000 | `c949db10` |
| `sprites` | `gyrussk.5` | 0x2000 | 0x2000 | `4f22411a` |
| `sprites` | `gyrussk.8` | 0x4000 | 0x2000 | `47cd1fbc` |
| `sprites` | `gyrussk.7` | 0x6000 | 0x2000 | `8e8d388c` |
| `tiles` | `gyrussk.4` | 0x0 | 0x2000 | `27d8329b` |
| `proms` | `gyrussk.pr3` | 0x0 | 0x20 | `98782db3` |
| `proms` | `gyrussk.pr1` | 0x20 | 0x100 | `7ed057de` |
| `proms` | `gyrussk.pr2` | 0x120 | 0x100 | `de823a81` |

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
| Space / X | button1 | `P1` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW1` | 0xf | 0xf |
| Coin B | `DSW1` | 0xf0 | 0xf0 |
| Lives | `DSW2` | 0x3 | 0x3 |
| Cabinet | `DSW2` | 0x4 | 0x0 |
| Bonus Life | `DSW2` | 0x8 | 0x8 |
| Difficulty | `DSW2` | 0x70 | 0x30 |
| Demo Sounds | `DSW2` | 0x80 | 0x0 |
| Demo Music | `DSW3` | 0x1 | 0x0 |
| Unused | `DSW3` | 0xfe | 0xfe |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/gyruss.cpp`
- **Written by:** Nicola Salmoria, Couriersud
- **License:** BSD-3-Clause
- **Development:** 152 commits by 28 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Olivier Galibert

## The story

Arcade Video game published 43 years ago:

Gyruss (c) 1983 Konami Industry Company, Limited.

Gyruss is a single-player shoot-em-up in which the purpose is to fly through the solar system, destroying waves of alien attackers, before finally reaching Earth. Planets that must be passed before Earth is reached are Neptune, Uranus, Saturn, Jupiter, and Mars. 

It only takes two warps to reach Neptune, but all of the others, including Earth, take three warps to get to. Each time the player reaches a planet, they will be faced with a 'Chance Stage', a bonus stage in which players try to destroy as many aliens as possible to accrue points. After reaching Earth, there is a Chance Stage, followed by a very fast '3 Warps to Neptune' stage. After this, the levels and the background music start over. 

Gyruss' superb gameplay, in which the player ship rotates around the edges of the screen and fires 'inwards', is heavily influenced by Atari's 1981 classic, "Tempest". While the design of the alien ships themselves is similar to those of Namco's also-legendary "Galaga" series.

### Technical
Game ID : GX347

Main CPU : Zilog Z80 (@ 3.072 Mhz), M6809 (@ 2 Mhz)
Sound CPU : Zilog Z80 (@ 3.579545 Mhz), I8039 (@ 533.333 Khz)
Sound Chips : (5x) AY8910 (@ 1.789772 Mhz), DAC, (6x) RC (@ 1.789772 Mhz)

Players : 2 (Alternating)
Control : 8-Way Joystick
Buttons : 1
=> Fire

### Trivia
Gyruss was released in March 1983 in Japan.

After working on the successful "Time Pilot", Gyruss' designer, Yoshiki Okamoto, went on to create Gyruss, which, although a success in its own right, was released at a time when the arcade craze was starting to die down. This may explain why the game didn't shift the units it really deserved. After its release, Okamoto asked for a raise, or he would quit. He was duly fired when he turned up for work the following day. 

One of the most memorable features of this game is its soundtrack, which consists of an extremely catchy synthesized rendition of Bach's 'Tocatta and Fugue in D Minor'. 

Anthony Fodrizio holds the official record for this game with 41,090,450 points. 

A set of developer credits are hidden in the ROM, beginning at 1E9A in memory.

A bootleg of this game is known as "Venus". 

Alfa Records released a limited-edition soundtrack album for this game (Konami Game Music Vol.1 - 28XA-85) on June 25, 1986.

A Gyruss unit appears in the music video for "Kid Candy" by the grunge rock group Seaweed.

### Scoring
Shooting a ship : 50, 100 or 150 points. 
Destroying a whole formation of enemy ships before the next wave attacks : 1,000, 1,500, 2,000, 2,500 points. 
Bonus for clearing a sector (having not destroyed a whole formation) : 1,000 points. 
Shooting the three glowing spheres : 1,000, 1,500, 2,000 points. 
Bonus for shooting each ship on the Chance Stage : 100 points. 
Bonus for shooting all 40 ships on the Chance Stage : 10,000 points.

### Tips and tricks
* You can get double fire if you shoot the sun-like enemy that appears in front of you surrounded by two blue pod-like enemies - try to make this a priority.

* To make getting double fire easier, try to stay at the bottom of the screen until the 'pod and sun' formation appears as it will appear right in front of wherever your ship is after all enemies have entered and they start attacking. 
1) There must be at least three enemies left in the level for the 'pod and sun' formation to show. If you lose a life and three enemies are left, the 'pod and sun' will show up one more time, but if you lose a life after that, they will not show any more until the next level. After you get double fire, the sun enemy will be replaced on later levels with another pod. Destroy all three for some bonus points.
2) If you have only one enemy left and cannot seem to destroy it, just leave it alone and eventually it will just leave and the level will end.

* Each level begins with four formations entering. If you destroy enough of these, a fifth formation will enter. As you pass each planet, more formations will enter towards the top of the screen. Learn to control your ship at the top as it will come in real handy on those Mars and Earth warps.

* When formations enter from the edge of the screen, they will not hit you if you are right where they enter. You can use this to your advantage to take out the formation with little or no trouble - just watch out for asteroids.

* Asteroids will always appear in your path - they cannot be destroyed and must be avoided.

* The 'bee-like' creatures with the force field will always appear from the center and move outward. The force field will destroy your ship if you touch it. Destroy one of the creatures to disable their force field.

* Learn the formations of the enemy attack waves during the normal stages, to enable you to collect the bonuses for destroying whole waves of attacking ships.

* Learn the formations of the enemy attack waves during the chance stages, to enable you to collect the bonuses for destroying whole waves of attackers and the 10,000 for destroying all 40 ships.

* The three glowing spheres always appear aligned with where you are located on screen. Remember to avoid any bullets when they appear.

* You can fire bullets ahead of enemy ships and then move aside to destroy them and avoid their shots.

### Staff
Programmer: Toshio Arima
Designer: Yoshiki Okamoto
Character: Hideki Ooyami
Sound: Masahiro Inoue

### Ports
* CONSOLES: 
[EU] Nintendo NES (1988) 
Nintendo Famicom Disk [JP] (nov.18, 1988) "Gyruss [Model KDS-GRS]" 
[JP] Sony PlayStation (may.13, 1999) "Konami 80's Arcade Gallery [Model SLPM-86228]" 
Microsoft XBOX 360 [XBLA] [JP] [EU] (apr.18, 2007) 

* HANDHELDS: 
[JP] Nintendo GBA (may.2, 2002) "Konami Arcade Game Collection [Model AGB-AKCJ-JPN]" 
[EU] Nintendo GBA (june.21, 2002) "Konami Collector's Series - Arcade Classics [Model AGB-AKCP-EUR]" 

* COMPUTERS: 
[EU] Commodore C64 (1984) 

* OTHERS: 
Arcade [EU] [AU] [KO] (nov.1998) "Konami 80's AC Special" 
Arcade [JP] (nov.1998) "Konami 80's Arcade Gallery" 
Mobile Phones [JP] (2004)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1063/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `gyruss`. Play it at [../app/g/gyruss/](../app/g/gyruss/) or [explore the knowledge graph](viewer.html).*
