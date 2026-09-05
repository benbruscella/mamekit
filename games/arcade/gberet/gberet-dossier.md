# Green Beret

**Konami · 1985** — transpiled from the MAME driver `src/mame/konami/gberet.cpp` by mamekit.

![marquee](/artwork/media/marquees/gberet.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/gberet.webp) | ![cabinet](/artwork/media/cabinets/gberet.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 15 |

- **Sound:** sn76489 × 1 @ 1.536 MHz
- **Screen:** 240×224 @ 60.61 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `577l03.10c` | 0x0 | 0x4000 | `ae29e4ff` |
| `maincpu` | `577l02.8c` | 0x4000 | 0x4000 | `240836a5` |
| `maincpu` | `577l01.7c` | 0x8000 | 0x4000 | `41fa3e1f` |
| `tiles` | `577l07.3f` | 0x0 | 0x4000 | `4da7bd1b` |
| `sprites` | `577l06.5e` | 0x0 | 0x4000 | `0f1cb0ca` |
| `sprites` | `577l05.4e` | 0x4000 | 0x4000 | `523a8b66` |
| `sprites` | `577l08.4f` | 0x8000 | 0x4000 | `883933a4` |
| `sprites` | `577l04.3e` | 0xc000 | 0x4000 | `ccecda4c` |
| `proms` | `577h09.2f` | 0x0 | 0x20 | `c15e7c80` |
| `proms` | `577h11.6f` | 0x20 | 0x100 | `2a1a992b` |
| `proms` | `577h10.5f` | 0x120 | 0x100 | `e9de1e53` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `P1` | 0x1 |
| Right | joystick right | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| Z | button2 | `P1` | 0x20 |
| 5 | coin1 | `SYSTEM` | 0x1 |
| 6 | coin2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x4 |
| 1 | start1 | `SYSTEM` | 0x8 |
| 2 | start2 | `SYSTEM` | 0x10 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSW1` | 0xf | 0xf |
| Coin B | `DSW1` | 0xf0 | 0xf0 |
| Lives | `DSW2` | 0x3 | 0x2 |
| Cabinet | `DSW2` | 0x4 | 0x0 |
| Bonus Life | `DSW2` | 0x18 | 0x8 |
| Difficulty | `DSW2` | 0x60 | 0x40 |
| Demo Sounds | `DSW2` | 0x80 | 0x0 |
| Flip Screen | `DSW3` | 0x1 | 0x1 |
| Upright Controls | `DSW3` | 0x2 | 0x2 |
| Unused | `DSW3` | 0x4 | 0x4 |
| Unused | `DSW3` | 0x8 | 0x8 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/konami/gberet.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 136 commits by 25 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, Michaël Banaan Ananas

## The story

Arcade Video game published 41 years ago:

Green Beret (c) 1985 Konami.

Green Beret is a sideways-scrolling action/platform game set during the Cold War, in which a US Special Forces Marine must infiltrate a Russian military base to save four POW's from being executed by firing squad. 

Initially, the soldier is armed with only a combat knife, but by killing the certain enemy troops, players can obtain either a three-shot flamethrower, a four-shot RPG, or a three-pack of hand grenades. 

The Marine can jump or lie down to avoid the enemy bullets, as well as climbing ladders to avoid enemies and projectiles, as well as the flashing land mines that litter the levels. While it's possible to remain still in one area to rack up points, if players take too long to proceed, the game will start sending out tougher enemies and eventually a stealth-like bomber will appear to take out the player. There is also an unseen time limit that will kill off players if they take too long to complete the stage. 

The game has four stages in total: a missile base, a harbour, an air Base and a Siberian POW Camp. At the end of each stage the Marine will face a group of enemies specific to that stage: Stage 1 ends with a truckload of running and jump-kicking soldiers, Stage 2 with a pack of fierce dogs and their handlers, Stage 3 with three Gyro-copters and Stage 4 with a number of multi-shot flamethrower operators. 

The game is completed once the captives have been rescued at the end of the fourth stage, after which the action starts over with an increased level of difficulty.

### Technical
Game ID : GX577

Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound Chips : SN76496 (@ 1.536 Mhz)

Players : 2
Control : 8-way joystick
Buttons : 2

### Trivia
Green Beret was released in October 1985.

Export releases:
This game is known in US as "Rush'n Attack".

### Tips and tricks
* Go wild using weapons!
The weapon-providing character appears frequently. You don't have to be thrifty.

* Watch out for ladders!
When a ladder is nearby, you will climb it up/down instead of jumping/crouching. Be careful.

* Watch the enemy carefully:
Enemies attacking from a distance always move in a particular way. Watch carefully!

* How to destroy mines?
Destroy mines with grenades.

* Use the knife rapidly:
If enemies come from both the left and right, rapidly use the knife and face both directions.

* Learn enemy appearance patterns:
There are certain difficult points in the game. Learn how enemies appear and come up with a way to overcome the situation.

### Ports
* CONSOLES:
[JP] Nintendo Famicom Disk (apr.10, 1987) "Green Beret [Model KDS-GRN]" 

* HANDHELDS: 
[JP] Nintendo GBA (may.2, 2002) "Konami Arcade Game Collection [Model AGB-AKCJ-JPN]" 
[EU] Nintendo GBA (june.21, 2002) "Konami Collector's Series - Arcade Classics [Model AGB-AKCP-EUR]" 
[JP] Nintendo DS (mar.15, 2007) "Konami Arcade Collection [Model NTR-A5KJ-JPN]" 
[EU] Nintendo DS (oct.26, 2007) "Konami Arcade Classics [Model NTR-ACXP-EUR]" 
[AU] Nintendo DS (oct.29, 2007) "Konami Arcade Classics" 

* COMPUTERS: 
[EU] BBC Micro (1985) 
[FR] Thomson TO7 (1986)
[FR] Thomson TO8 (1986) "Compilation - Coffret Cadeau"
[EU] Sinclair ZX Spectrum (1986)
[EU] Sinclair ZX Spectrum (1986) "Konami Coin-Op Hits"
[EU] MSX (1986) [Model KN329] 
[EU] Amstrad CPC (1986)
[EU] Commodore C64 (1986) 
 [FR]Thomson M05

* OTHERS:
[JP] Mobile Phones (2006) : Nintendo NES Version

### Series
1. Green Beret [Model GX577] (1985)
2. M.I.A. - Missing in Action [Model GX808] (1989)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1014/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `gberet`. Play it at [../../../app/g/gberet/](../../../app/g/gberet/) or [explore the knowledge graph](viewer.html).*
