# R-Type (World)

**Irem · 1987** — transpiled from the MAME driver `src/mame/irem/m72.cpp` by mamekit.

![marquee](/artwork/media/marquees/rtype.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/rtype.webp) | ![cabinet](/artwork/media/cabinets/rtype.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | V30 | 8.000 MHz | 9 |
| `soundcpu` | Z80 | 3.580 MHz | 1 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 384×256 @ 55.02 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `rt_r-h0-b.1b` | 0x1 | 0x10000 | `591c7754` |
| `maincpu` | `rt_r-l0-b.3b` | 0x0 | 0x10000 | `a1928df0` |
| `maincpu` | `rt_r-h1-b.1c` | 0x20001 | 0x10000 | `a9d71eca` |
| `maincpu` | `rt_r-l1-b.3c` | 0x20000 | 0x10000 | `0df3573d` |
| `sprites` | `rt_r-00.1h` | 0x0 | 0x10000 | `dad53bc0` |
| `sprites` | `rt_r-01.1j` | 0x10000 | 0x8000 | `5e441e7f` |
| `sprites` | `rt_r-10.1k` | 0x20000 | 0x10000 | `d6a66298` |
| `sprites` | `rt_r-11.1l` | 0x30000 | 0x8000 | `791df4f8` |
| `sprites` | `rt_r-20.3h` | 0x40000 | 0x10000 | `fc247c8a` |
| `sprites` | `rt_r-21.3j` | 0x50000 | 0x8000 | `ed793841` |
| `sprites` | `rt_r-30.3k` | 0x60000 | 0x10000 | `eb02a1cb` |
| `sprites` | `rt_r-31.3l` | 0x70000 | 0x8000 | `8558355d` |
| `tiles0` | `rt_b-a0.ic20` | 0x0 | 0x8000 | `4e212fb0` |
| `tiles0` | `rt_b-a1.ic22` | 0x8000 | 0x8000 | `8a65bdff` |
| `tiles0` | `rt_b-a2.ic20` | 0x10000 | 0x8000 | `5a4ae5b9` |
| `tiles0` | `rt_b-a3.ic23` | 0x18000 | 0x8000 | `73327606` |
| `tiles1` | `rt_b-b0.ic26` | 0x0 | 0x8000 | `a7b17491` |
| `tiles1` | `rt_b-b1.ic27` | 0x8000 | 0x8000 | `b9709686` |
| `tiles1` | `rt_b-b2.ic25` | 0x10000 | 0x8000 | `433b229a` |
| `tiles1` | `rt_b-b3.ic24` | 0x18000 | 0x8000 | `ad89b072` |
| `proms` | `m72_a-8l-.ic66` | 0x0 | 0x100 | `b460c438` |
| `proms` | `m72_a-9l-.ic75` | 0x100 | 0x100 | `a4f2c4bc` |
| `plds` | `m72_a-3d-.ic11` | 0x0 | 0x117 | `8a3732ff` |
| `plds` | `m72_a-4d-.ic19` | 0x200 | 0x117 | `56c29834` |
| `plds` | `m72_r-3a-.3a` | 0x400 | 0x117 | `055af779` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `IN0` | 0x1 |
| Left | joystick left | `IN0` | 0x2 |
| Down | joystick down | `IN0` | 0x4 |
| Up | joystick up | `IN0` | 0x8 |
| Z | force | `IN0` | 0x40 |
| Space / X | button1 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x1 |
| 2 | start2 | `IN1` | 0x2 |
| 5 | coin1 | `IN1` | 0x4 |
| 6 | coin2 | `IN1` | 0x8 |
| 9 | service1 | `IN1` | 0x10 |
| F2 | service | `IN1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `DSW` | 0x3 | 0x3 |
| Demo Sounds | `DSW` | 0x4 | 0x0 |
| Bonus Life | `DSW` | 0x8 | 0x8 |
| Coinage | `DSW` | 0xf0 | 0xf0 |
| Coin A | `DSW` | 0x30 | 0x30 |
| Coin B | `DSW` | 0xc0 | 0xc0 |
| Flip Screen | `DSW` | 0x100 | 0x100 |
| Cabinet | `DSW` | 0x200 | 0x0 |
| Coin Mode | `DSW` | 0x400 | 0x400 |
| Difficulty | `DSW` | 0x800 | 0x800 |
| Allow Continue | `DSW` | 0x1000 | 0x1000 |
| Stop Mode | `DSW` | 0x2000 | 0x2000 |
| Invulnerability | `DSW` | 0x4000 | 0x4000 |
| Service Mode | `DSW` | 0x8000 | 0x8000 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/irem/m72.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 358 commits by 38 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, Vas Crabb, AJR

## The story

Arcade Video game published 39 years ago:

R*Type (c) 1987 Irem Corp.

R*Type is a sideways-scrolling shoot-em-up in which the evil Bydo Empire rules the galaxy through fear and intimidation and it's up to the player - piloting their heavily-armed R-9 space ship - to battle through eight tough levels to the heart of the Bydo stronghold and defeat them.

The game's revolutionary weapons system is its real stroke of genius. The first of numerous innovations that R*Type bought to the genre is the beam weapon: when the fire button is held down, a 'power meter' starts to charge up; once the meter is full, releasing the fire button unleashes a very powerful plasma burst capable of inflicting much greater damage to enemy ships or even destroying numerous enemies simultaneously. The trade-off is that charging the weapon takes up valuable seconds, giving the Bydo ships time to attack.

The most significant addition to R-type's arsenal is the now-legendary 'Force Pod'. This takes the form of an invincible, detachable laser-firing pod that can be attached to either the front or rear of the player's ship, or can be detached completely, after which the pod sits some distance either ahead or behind the player's ship, tracking its movements and providing additional fire power. When attached to the R9 ship, the pod acts as a shield. This forms a crucial part of R*Type's gameplay and has to be fully utilised to navigate certain sections of the game, such as the huge mothership that comprises the game's 3rd stage.

R*Type's levels are designed to make full use of its unique weapons system, making for very linear and demanding gameplay in which losing or picking up the wrong weapon at the wrong time often leads to an instant death. Its intelligent, precise and demanding level design, gave the world its first truly 'strategic' shoot-em-up.

### Technical
Irem M-72 system hardware

Main CPU : V30 (@ 8 Mhz)
Sound CPU : Zilog Z80 (@ 3.579545 Mhz)
Sound Chips : Yamaha YM2151 (@ 3.579545 Mhz)

Players : 2
Control : 8-way joystick
Buttons : 2

### Trivia
R*Type was released in July 1987 in Japan. 

R*Type is one of the most famous of all scrolling shooters. Its impressive graphics, detailed animation, inventive features and simple yet surprisingly involved gameplay made it a huge success for Irem. 

The first boss, as well as some of the stages, seem inspired by the artistic works of H. R. Giger (of 'Aliens' fame). He makes a brief cameo in the TV sets in "Undercover Cops". 

Alfa Records released a limited-edition soundtrack cassette for this game (R*Type : Irem Game Music - 28XA-199) on January 25, 1988.

### Updates
At the title screen, the prototype version says 'Play and enjoy the game' instead of 'Blast off and strike the evil Bydo empire!', as it does in the final version.

### Tips and tricks
* Force Pod levels:
1) Level 1: Fires single bullet when separated.
2) Level 2: Fires twin shots when separated.
3) Level 3: Fires four shots up, down and forwards when separated.

* Weapons:
1) Speed Up: Alters your ship's speed.
2) Missile: Fires two rather nice homing missiles.
3) Bouncy: Blue lasers bounce around the screen. Very nice.
4) Curly-Wurly: Wide red laser beam, similar to the chocolate snack of that name.
5) Squirly: Yellow things that track along the floor and ceiling. Limited use.
6) Bit: Blob that acts as a shield. You can have two of these.

### Ports
* CONSOLES: 
[JP] NEC PC-Engine (mar.25, 1988) "R*Type I [Model HC63007]" : contains stages 1 to 4 
[JP] NEC PC-Engine (june.3, 1988) "R*Type II [Model HC63009]" : contains stages 5 to 8 
[JP] Sega Mark III (oct.1988) "R*Type [Model G-1364]" 
[EU] Nintendo Game Boy (1991) "R*Type [Model DMG-RE]" 
[JP] Nintendo Game Boy (mar.19, 1991) "R*Type [Model DMG-REA]"
[JP] NEC PC-Engine Super CD-ROM² (dec.20, 1991) "R*Type Complete CD [Model ICCD1001]" 
[JP] Sony PlayStation (feb.5, 1998) "R*Types [Model SLPS-01236]" 
[EU] Sony PlayStation (sept.1998) "R*Types [Model SLES-01355]" 
[EU] Nintendo Game Boy Color (jul.20, 1999) "R*Type DX [Model DMG-AWHP-EUR]" 
[JP] Nintendo Game Boy Color (nov.1999) "R*Type DX [Model DMG-ARUJ-JPN]" 
[JP] Sony PlayStation (oct.25, 2001) "R*Types I-II [R's Best] [Model SLPS-03310]" 
[JP] Nintendo Wii [Virtual Console] (dec.13, 2006) [Model PADJ] : R*Type I for PC-Engine 
[EU] Nintendo Wii [Virtual Console] (dec.29, 2006) [Model PADP] : TurboGrafx version 
[JP] Nintendo Wii [Virtual Console] (jan.23, 2007) : R*Type II for PC-Engine 
[AU] Nintendo Wii [Virtual Console] (jul.6, 2007) : TurboGrafx version 
[JP] Nintendo Wii [Virtual Console] (may.19, 2009) : Mark III version 
[EU] [AU] Nintendo Wii [Virtual Console] (sept.25, 2009) : Master System version 

* COMPUTERS:
[EU] Amstrad CPC (1988)
[EU] Commodore Amiga (1988)
[JP] MSX (dec.1988) "R*Type [Model IM-04]"
[JP] Sharp X68000 (june.9, 1989) "R*Type [Model IX68-01]"
[EU] Sinclair ZX Spectrum (1988) "R*Type [Model URK 630]"

### Series
1. R*Type (1987, Arcade)
2. R*Type II (1989, Arcade)
3. R*Type Leo (1992, Arcade)
4. R*Type III - The 3rd Lightning [Model SHVC-ER] (1994, Super Famicom)
5. R*Type Delta [Model SLPS-01688] (1999, PlayStation)
6. R*Type Final (2003, PS2)
7. R*Type Tactics (2007, PSP)

### Contribute
Edit this entry: https://www.arcade-history.com/game/2141/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `m72`. Play it at [../../../app/g/rtype/](../../../app/g/rtype/) or [explore the knowledge graph](viewer.html).*
