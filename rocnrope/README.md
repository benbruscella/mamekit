# Roc'n Rope

**Konami · 1983** — transpiled from the MAME driver `src/mame/konami/rocnrope.cpp` by mamekit.

![marquee](/artwork/media/marquees/rocnrope.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/rocnrope.png) | ![cabinet](/artwork/media/cabinets/rocnrope.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | KONAMI1 | 1.536 MHz | 19 |
| `tpsound` | Z80 | 1.790 MHz | 7 |

- **Sound:** ay8910 × 2 @ 1.790 MHz
- **Screen:** 256×224 @ 60.00 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `rr1.1h` | 0x6000 | 0x2000 | `83093134` |
| `maincpu` | `rr2.2h` | 0x8000 | 0x2000 | `75af8697` |
| `maincpu` | `rr3.3h` | 0xa000 | 0x2000 | `b21372b1` |
| `maincpu` | `rr4.4h` | 0xc000 | 0x2000 | `7acb2a05` |
| `maincpu` | `rnr_h5.vid` | 0xe000 | 0x2000 | `150a6264` |
| `timeplt_audio:tpsound` | `rnr_7a.snd` | 0x0 | 0x1000 | `75d2c4e2` |
| `timeplt_audio:tpsound` | `rnr_8a.snd` | 0x1000 | 0x1000 | `ca4325ae` |
| `sprites` | `rnr_a11.vid` | 0x0 | 0x2000 | `afdaba5e` |
| `sprites` | `rnr_a12.vid` | 0x2000 | 0x2000 | `054cafeb` |
| `sprites` | `rnr_a9.vid` | 0x4000 | 0x2000 | `9d2166b2` |
| `sprites` | `rnr_a10.vid` | 0x6000 | 0x2000 | `aff6e22f` |
| `tiles` | `rnr_h12.vid` | 0x0 | 0x2000 | `e2114539` |
| `tiles` | `rnr_h11.vid` | 0x2000 | 0x2000 | `169a8f3f` |
| `proms` | `a17_prom.bin` | 0x0 | 0x20 | `22ad2c3e` |
| `proms` | `b16_prom.bin` | 0x20 | 0x100 | `750a9677` |
| `proms` | `rocnrope.pr3` | 0x120 | 0x100 | `b5c75a27` |
| `pal_cpuvidbd` | `h100.6g` | 0x0 | 0x1 | `` |

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
| Z | button2 | `P1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW1` | 0xf | 0xf |
| Coin B | `DSW1` | 0xf0 | 0xf0 |
| Lives | `DSW2` | 0x3 | 0x3 |
| Cabinet | `DSW2` | 0x4 | 0x0 |
| Difficulty | `DSW2` | 0x78 | 0x58 |
| Demo Sounds | `DSW2` | 0x80 | 0x0 |
| First Bonus | `DSW3` | 0x7 | 0x6 |
| Repeated Bonus | `DSW3` | 0x38 | 0x10 |
| Grant Repeated Bonus | `DSW3` | 0x40 | 0x0 |
| Unused | `DSW3` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/rocnrope.cpp`
- **Written by:** Chris Hardy
- **License:** BSD-3-Clause
- **Development:** 116 commits by 22 contributors, 2007–2024
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Olivier Galibert

## The story

Arcade Video game published 43 years ago:

Roc'n Rope (c) 1983 Konami.

Roc'n Rope is an incredibly difficult yet playable platform game featuring four different levels. The player takes on the role of a an archaeologist whose mission is to return the missing tail feathers to the golden Phoenix. The archaeologist is armed with a harpoon gun and uses it to fire a rope into a platform above, in order to climb up the rope and progress up the level. This is vaguely similar to the superb 'telescopic arm' feature that appeared in Capcom's superb "Bionic Commando".

All levels are patrolled by enemies in the form of dinosaurs and cavemen and all are deadly to the touch. Some cavemen will pull on the harpoon rope while the archaeologist is climbing it. This will result in the player falling from the rope and losing a life. The archaeologist is armed with a light ray that will kill the enemies.

A breakdown of the game's four levels :

* The first level is possibly the most difficult in the game. Players begin at the bottom left of the screen and must work their way up to the Roc, who is sitting at the upper right of the screen. There are many layers of ledges coming out from the sides of the screen. While the middle of the screen is open to the sky (except for a few floating platforms). To reach the top, players must use the harpoon gun to climb diagonally back and forth until they reach the top (ensuring that the Phoenix feathers have been collected on the way).

* The second level is set underground. There are a lot of dinosaurs on this screen and far fewer platforms than on the first level. Many of the platforms stretch completely across the screen, so there aren't many pitfalls to be wary of. Once again, players must get the archaeologist to the top of the screen to complete the level.

* The third level is set outdoors. A 'ferris wheel' style rotating platform sits in the center of the screen, but this can be avoided if players don't wish to use it. The easiest route to the top is on the right-hand side of the level.

* The fourth and final level is shaped a little like a mountain. The player's main concern here is a large waterfall in the center of the screen. Players must time their harpoon climb just right to avoid being killed by the deadly waters. Once this level is finished, the game starts over with an increased level of difficulty.

### Technical
Roc'n Rope was only available in an upright configuration. This upright was in a wood-grained cabinet that was similar in construction to the "Frogger" cabinet. The sideart was a large sticker showing an adventurer posing with a harpoon gun and a bird. The marquee shows this same adventurer firing his harpoon gun across a chasm at an unsuspecting dinosaur, while a cartoon caveman looks on suspiciously. The monitor bezel was unadorned, although most machines had a little instruction card underneath the glass. The control panel was a solid green and featured a single joystick mounted centrally, with two buttons to either side, which allowed for the game to be played with either hand.

Game ID : GX364

Main CPU : Motorola M6809 (@ 1.6 Mhz)
Sound CPU : Zilog Z80 (@ 1.789772 Mhz)
Sound Chips : (2x) General Instrument AY8910 (@ 1.789772 Mhz), (6x) RC (@ 1.789772 Mhz)

Players : 2
Control : 4-way joystick
Buttons : 2

### Trivia
Roc'n Rope was released in March 1983.

### Tips and tricks
* Learn the angle at which you throw the rope : The rope is thrown at a very shallow angle. The rope ends up hown long distances. Learning this angle is the first step to mastering this game.

* Be careful of heights : If you fall a distance longer than the height of you character, that couns as a miss. Be careful when you fall.

* Use the rope to beat enemies : If you cut the rope when the enemy is hanging from it, you can beat the enemy. Attacking with the rope is extremely fun.

* Keep an eye on enemy movements : Right before the enemy moves up or down or hangs from the rope, the enemy always moves n a certain way. Learn the enemy's behavior and take action quickly.

* Make good use of the power food : Not only do you become invincible when you obtain the power food, but you also speed up! While taking out enemies is a good idea, you may want to consider traveling the level instead.

### Staff
Director: Tokuro Fujiwara
Programmed by: H. Fujinaka

### Ports
* CONSOLES:
[US] Atari 2600 (1984) "Roc'n Rope [Model 2667]" 
Colecovision [US] (1984) "Roc 'n Rope [Model 2668]" 
[JP] Sony PlayStation (may.13, 1999) "Konami 80's Arcade Gallery [Model SLPM-86228]" 
[US] Sony PlayStation (nov.30, 1999) "Konami Arcade Classics [Model SLUS-00945]" 

* HANDHELDS: 
[JP] Nintendo DS (mar.15, 2007) "Konami Arcade Collection [Model NTR-A5KJ-JPN]" 
[US] Nintendo DS (mar.27, 2007) "Konami Classic Series - Arcade Hits [Model NTR-ACXE-USA]" 
[EU] Nintendo DS (oct.26, 2007) "Konami Arcade Classics [Model NTR-ACXP-EUR]" 
[AU] Nintendo DS (oct.29, 2007) "Konami Arcade Classics" 

* OTHERS: 
Arcade [US] [EU] [AU] [KO] (nov.1998) "Konami 80's AC Special" 
Arcade [JP] (nov.1998) "Konami 80's Arcade Gallery"

### Contribute
Edit this entry: https://www.arcade-history.com/game/2244/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `rocnrope`. Play it at [../app/g/rocnrope/](../app/g/rocnrope/) or [explore the knowledge graph](viewer.html).*
