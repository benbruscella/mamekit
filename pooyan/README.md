# Pooyan

**Konami · 1982** — transpiled from the MAME driver `src/mame/konami/pooyan.cpp` by mamekit.

![marquee](/artwork/media/marquees/pooyan.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/pooyan.png) | ![cabinet](/artwork/media/cabinets/pooyan.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 14 |
| `tpsound` | Z80 | 1.790 MHz | 7 |

- **Sound:** ay8910 × 2 @ 1.790 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `1.4a` | 0x0 | 0x2000 | `bb319c63` |
| `maincpu` | `2.5a` | 0x2000 | 0x2000 | `a1463d98` |
| `maincpu` | `3.6a` | 0x4000 | 0x2000 | `fe1a9e08` |
| `maincpu` | `4.7a` | 0x6000 | 0x2000 | `9e0f9bcc` |
| `timeplt_audio:tpsound` | `xx.7a` | 0x0 | 0x1000 | `fbe2b368` |
| `timeplt_audio:tpsound` | `xx.8a` | 0x1000 | 0x1000 | `e1795b3d` |
| `tiles` | `8.10g` | 0x0 | 0x1000 | `931b29eb` |
| `tiles` | `7.9g` | 0x1000 | 0x1000 | `bbe6d6e4` |
| `sprites` | `6.9a` | 0x0 | 0x1000 | `b2d8c121` |
| `sprites` | `5.8a` | 0x1000 | 0x1000 | `1097c2b6` |
| `proms` | `pooyan.pr1` | 0x0 | 0x20 | `a06a6d0e` |
| `proms` | `pooyan.pr3` | 0x20 | 0x100 | `8cd4cd60` |
| `proms` | `pooyan.pr2` | 0x120 | 0x100 | `82748c0b` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| 9 | service1 | `IN0` | 0x4 |
| 1 | start1 | `IN0` | 0x8 |
| 2 | start2 | `IN0` | 0x10 |
| Up | joystick up | `IN1` | 0x4 |
| Down | joystick down | `IN1` | 0x8 |
| Space / X | button1 | `IN1` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW0` | 0xf | 0xf |
| Coin B | `DSW0` | 0xf0 | 0xf0 |
| Lives | `DSW1` | 0x3 | 0x3 |
| Cabinet | `DSW1` | 0x4 | 0x0 |
| Bonus Life | `DSW1` | 0x8 | 0x8 |
| Difficulty | `DSW1` | 0x70 | 0x70 |
| Demo Sounds | `DSW1` | 0x80 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/pooyan.cpp`
- **Written by:** Allard van der Bas
- **License:** BSD-3-Clause
- **Development:** 109 commits by 20 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, AJR

## The story

Arcade Video game published 44 years ago:

Pooyan (c) 1982 Konami Industry Company, Limited.

The player takes on the role of a bow-and-arrow welding pig who must protect her piglets from the pack of hungry wolves ballooning up or down the cliff face. The pig is suspended in a winch-controlled cage and must move vertically up and down, shooting the balloons and sending the wolves plummeting to the ground. Any wolves she misses will, having safely reached the ground, climb a ladder to try and bite her. Also, if any of the wolves reach the ground, more piglets will be captured by them. Mother Pig must try to kill as many wolves as possible without letting them reach the ground.

On the second level, the wolves use balloons to float upwards to the top of a high cliff. If enough of them reach the cliff, they will push a huge boulder down onto Mother Pig's cage. After this level has been completed, the piglets who have been captured are rescued and the game starts over with increased difficulty.

There is also a bonus round where Mother Pig will attempt to eliminate as many wolves on ascending balloons as possible by throwing as few slabs of meat as possible for a maximum bonus score.

### Technical
Game ID : GX320

Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound CPU : Zilog Z80 (@ 1.789772 Mhz)
Sound Chips : (2x) General Instrument AY8910 (@ 1.789772 Mhz), (6x) RC (@ 1.789772 Mhz)

Players : 2
Control : 2-way joystick (vertical)
Buttons : 1 (FIRE)

### Trivia
Pooyan was released in October 1982 in Japan.

The title is Japanese for 'little pigs'. It is also very rarely used as an adjective meaning 'extremely stupid'. For example, 'Intentionally puncturing your spacesuit is pooyan'. 

The intro tune is a rendition of "The Other Day I Met a Bear" which is a traditional American camp song. The music was composed in 1919 by Carey Morgan and Lee David.

The Round 1 in-game tune is a rendition of 'Humoresque (Op. 101, No. 7 in G flat major)' by Antonin Dvorak. 

Mark Kinter holds the official record for this game with 1609250 points. 

A bootleg of this game is known as "Pootan". 

A Pooyan unit appears in the 1983 movie 'Joysticks'.

### Tips and tricks
* Learn how a meat piece falls : unlike arrows, meat pieces fly not straight but in an arc.

* Throw meat pieces at enemy formations : When arrows are not enough to take out a formation, use meat pieces to wipe them all out. Knowing how a meat piece falls will work in your advantage.

* When to use meat pieces ? : At the end of a level appears a wolf with a balloon hard to pop. Keep the meat piece until the very end and use it against that particular wolf.

* Do not underestimate the power of the balloon : As the game proceeds, there will be balloons with no wolves holding onto them. While it will not count as a miss even if you don't take out these balloons, they bounce off meat pieces. be careful!

* Shoot down rocks with arrows : Rocks thrown by wolves can be reflected with the roof of MAM's gondola and by shooting arrows. Stay calm even if you see a bunch of rocks coming at you.

### Staff
Director: Tokuro Fujiwara

### Ports
* CONSOLES: 
[JP] Nintendo Famicom (sept.20, 1985) "Pooyan [Model HFC-PO]"
Casio PV-1000
[JP] Sony PlayStation (may.13, 1999) "Konami 80's Arcade Gallery [Model SLPM-86228]" 
[JP] Sony PS2 (may.25, 2006) "Pooyan [Oretachi Geasen Zoku] [Model SLPM-62731]" 

* HANDHELDS: 
[JP] Nintendo DS (mar.15, 2007) "Konami Arcade Collection [Model NTR-A5KJ-JPN]" 
[EU] Nintendo DS (oct.26, 2007) "Konami Arcade Classics [Model NTR-ACXP-EUR]" 
[AU] Nintendo DS (oct.29, 2007) "Konami Arcade Classics" 

* COMPUTERS: 
[EU] Commodore C64 (1983) 
[JP] MSX (1985) "Konami no Pooyan" 
Sord M5 [JP] (1983) 
Amstrad CPC [UK] (1986) "Jungle Jane" 
Amstrad CPC [FR] (1986) "Croc' Madam'" 

* OTHERS: 
[JP] LCD handheld game (19??) by Gakken. 
[EU] [AU] [KO] Arcade (nov.1998) "Konami 80's AC Special" 
[JP] Arcade (nov.1998) "Konami 80's Arcade Gallery"

### Contribute
Edit this entry: https://www.arcade-history.com/game/2011/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `pooyan`. Play it at [../app/g/pooyan/](../app/g/pooyan/) or [explore the knowledge graph](viewer.html).*
