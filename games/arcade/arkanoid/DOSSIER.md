# Arkanoid (World, older)

**Taito · 1986** — transpiled from the MAME driver `src/mame/taito/arkanoid.cpp` by mamekit.

![marquee](/artwork/media/marquees/arkanoid.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/arkanoid.webp) | ![cabinet](/artwork/media/cabinets/arkanoid.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 6.000 MHz | 13 |

- **Sound:** ay8910 × 1 @ 3.000 MHz
- **Screen:** 256×224 @ 59.19 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `a75__01-1.ic17` | 0x0 | 0x8000 | `5bcda3b0` |
| `maincpu` | `a75__11.ic16` | 0x8000 | 0x8000 | `eafd7191` |
| `mcu:mcu` | `a75__06.ic14` | 0x0 | 0x800 | `0be83647` |
| `gfx1` | `a75__03.ic64` | 0x0 | 0x8000 | `038b74ba` |
| `gfx1` | `a75__04.ic63` | 0x8000 | 0x8000 | `71fae199` |
| `gfx1` | `a75__05.ic62` | 0x10000 | 0x8000 | `c76374e2` |
| `proms` | `a75-07.ic24` | 0x0 | 0x200 | `0af8b289` |
| `proms` | `a75-08.ic23` | 0x200 | 0x200 | `abb002fb` |
| `proms` | `a75-09.ic22` | 0x400 | 0x200 | `a7c6c277` |
| `alt_mcus` | `arkanoid_mcu.ic14` | 0x0 | 0x800 | `4e44b50a` |
| `alt_mcus` | `a75-06__bootleg_68705.ic14` | 0x800 | 0x800 | `515d77b6` |
| `alt_mcus` | `arkanoid1_68705p3.ic14` | 0x1000 | 0x800 | `1b68e2d8` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x4 |
| 5 | coin1 | `SYSTEM` | 0x10 |
| 6 | coin2 | `SYSTEM` | 0x20 |
| Space / X | button1 | `BUTTONS` | 0x1 |
| Left | dial left | `P1` | 0xff |
| Right | dial right | `P1` | 0xff |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Allow Continue | `DSW` | 0x1 | 0x0 |
| Flip Screen | `DSW` | 0x2 | 0x2 |
| Service Mode | `DSW` | 0x4 | 0x4 |
| Difficulty | `DSW` | 0x8 | 0x8 |
| Bonus Life | `DSW` | 0x10 | 0x10 |
| Lives | `DSW` | 0x20 | 0x20 |
| Coinage | `DSW` | 0xc0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/taito/arkanoid.cpp`
- **Written by:** Brad Oliver,Stephane Humbert
- **License:** BSD-3-Clause
- **Development:** 255 commits by 36 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Lord-Nightmare, Vas Crabb, Ivan Vangelista

## The story

Arcade Video game published 40 years ago:

Arkanoid (c) 1986 Taito Corp.

After a sudden alien assault, the Arkanoid spaceship has been destroyed and the only survivor, the small 'Vaus' space vessel, has been mysteriously trapped in another dimension by an unknown enemy. The player is charged with helping the 'Vaus' overcome the security systems, as well as the many enemies that guard them, before finally finding and destroying 'DOH', the alien responsible for the attack.

Arkanoid is an update of the early ball and paddle video games - and specifically of Atari's 1978 classic, "Super Breakout" - in which the player takes control of a paddle at the bottom of the screen and must use it to deflect a ball into rows of bricks at the top of the screen, thus destroying them and, eventually, clearing the screen to progress to the next level. 

As well as impressive and colourful graphics, Arkanoid introduced a number of new elements to the classic bat 'n' ball gameplay. Certain bricks, when destroyed, would release a power-up - in the form of a falling capsule. the player had to catch the capsule to retrieve the power-up. Among the many enhancements the power-ups provided were an increased 'bat' size, multiple balls, 'sticky' ball (which would stick to the bat and could be released when the player chose) and even a laser, which allowed the player to shoot the bricks.

### Technical
Prom Stickers : A75

Main CPU : Zilog Z80 (@ 6 Mhz), Motorola M68705 (@ 500 Khz)
Sound Chips : General Instrument AY8910 (@ 1.5 Mhz)

Players: 2 (alternative)
Control: Spinner
Buttons: 1
=> Fire - Used to launch the energy ball at the start of each new round and each new life, to relaunch the energy ball after it is caught by the vaus when the C (Catch) pill is in effect, and to fire lasers when the L (Laser) pill is in effect.

### Trivia
Arkanoid was released in July 1986 in Japan.

Arkanoid has remained a popular game and is commonly cloned by aspiring game developers in freeware and shareware titles. Many companies have also regularly cloned the game in arcades.

Arkanoid's popularity led to it being featured in "Rainbow Islands - The Story of Bubble Bobble 2", which has a whole level (four stages in all) dedicated to the game, including DOH as the level boss.

Nick Mollison holds the official record for this game on extremely hard settings with 1,156,930 points on September 7, 2008. 
Zack Hample holds the official record for this game on normal settings with 1,658,110 points on March 13, 2000.

An Arkanoid unit appears on the sitcom 'Married... With Children'; Season 6, Episode 4 (Cheese, Cues and Blood).

Official releases:
Taito's Arkanoid
Taito America's Arkanoid
Taito's Tournament Arkanoid

Bootleg/Hack releases:
Tayto's Arkanoid
Game Corporation's Arkanoid
Game Corporation's Block
Beta's Arkanoid
Two-Bits Score's Arkanoid Plus
SPA Co.'s Block II
Paddle 2

### Updates
The Japanese version supports cocktail mode whereas the others don't.

### Scoring
Points are scored for destroying bricks and killings aliens.

Bricks:
White brick: 50 points.
Orange brick: 60 points.
Cyan brick: 70 points.
Green brick: 90 points.
Red brick: 100 points.
Blue brick: 110 points.
Violet brick: 120 points.
Yellow brick: 50 points.
Silver brick: Worth 50X the stage number you are on.

### Tips and tricks
* Pill descriptions:
S - Slow: slows down the energy ball.
L - Laser: enables the Vaus to fire laser beams.
C - Catch: catches the energy ball and shoots it when you want it.
B - Break: allow player to move to next playfield.
E - Expand: expands the Vaus.
P - Player: gains an additional Vaus.
D - Disrupt: splits the energy ball into three particles.

* Bricks:
White brick: One shot to destroy.
Orange brick: One shot to destroy.
Cyan brick: One shot to destroy.
Green brick: One shot to destroy.
Red brick: One shot to destroy.
Blue brick: One shot to destroy.
Violet brick: One shot to destroy.
Yellow brick: One shot to destroy.
Silver brick: The number of hits it takes to destroy them increases by one every eight stages.
Gold brick: Cannot be destroyed.

* Power-up Rarity:
The power pills are completely random except that the extra life and warp pills are twice as unlikely to occur. Only one extra life pill is possible per Vaus. If the pill randomizer selects a duplicate pill based on the last pill dropped, a multi-ball pill is substituted. Thus, the multi-ball pill is the only one you can get twice in a row. The randomizer uses player score as the seed, so it is possible to control which pill is dispensed by purposely breaking pill dispensing blocks with specific scores displayed.

* Ball Speed:
On each level, the ball will not speed up completely until it hits the back wall, so:
1) Try to remove bricks from the bottom up, or punch a hole through thicker areas of bricks rather than go straight through (e.g. take out the left side of level 2 rather than the single block at the right as you will catch far more pills).
2) If you have collected a lot of S pills and the ball has been in play for a bit of time, be prepared for a sudden speedup.
3) Also, the D token speeds up the balls and is pretty useless on most levels (the one with the enclosed diamond is the only good example).

* Multiple Balls:
As only one pill can fall at a time, multiple balls can reduce your potential score quite drastically. Every pill is worth 1,000 points. For the first few levels, get every pill you can, but do not use the special powers. You will get a lot of extra ships and should get a gray P or two - thereby starting early with six or seven ships.

* DOH:
In the final level, where you face DOH himself, you should get 15 hits (1,000 points per hit) on DOH/per man until you defeat DOH with the 16th hit on your last man to end the game.

### Staff
Game designed by: Akira Fujita (AKR)
Programmed by: Yasumasa Sasabe (SSB)
Director of hardware & co-programme : Toshiyuki Sanada (SND)
Assistant programmer: Toru T. (TOR)
Graphic designer: Onijust H. (ONJ)
Sound composer: Hisayoshi Ogura
Sound effects: Tadashi Kimijima
Pattern designer: Akira Iwai (A. Iwai)
Software analyzer: Hidegons
Mechanical Engineer: H. Yamaguchi
Publicity Supervisor: Varis. I

### Ports
* CONSOLES: 
[JP] Nintendo BS "BS Arkanoid" : Might be a prototype
[JP] Nintendo Famicom (dec.26, 1986) "Arkanoid [Model TFC-AN-5400]" 

* COMPUTERS:
[JP] NEC PC-8801 by Cary Lab 
[JP] NEC PC-9801 (1986) "Arkanoid"
[EU] Atari ST (1986)
[EU] PC [MS-DOS] (1986) 
[JP] MSX (1987) 
[EU] MSX (1988) by Hit Squad
[EU] BBC B (1987) by Imagine 
[EU] Thomson TO7 (1987) 
[EU] Commodore C64 (1987) 
[EU] Sinclair ZX Spectrum (1987) 
[EU] Atari 800 (1987) 
[EU] Amstrad CPC (1987) by Imagine 
[EU] Amstrad CPC (1988) by Ocean 
[EU] Amstrad CPC (1988) "Les Défis de Taito" 
[EU] Amstrad CPC (1988) "Taito Coin-Op Hits" 
[EU] Thomson M05 
[EU] Thomson TO8
[EU] BK11M
[EU] Acorn Archimedes

### Series
1. Arkanoid (1986, Arcade) 
2. Arkanoid - Revenge of DOH (1987, Arcade) 
3. Arkanoid - Doh It Again [Model SHVC-A6] (1997, Super Famicom) 
4. Arkanoid Returns (1997, Arcade) 
5. Arkanoid DS (2007, Nintendo DS)

### Contribute
Edit this entry: https://www.arcade-history.com/game/106/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `arkanoid`. Play it at [../../../app/g/arkanoid/](../../../app/g/arkanoid/) or [explore the knowledge graph](viewer.html).*
