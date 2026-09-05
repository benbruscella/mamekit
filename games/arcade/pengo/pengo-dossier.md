# Pengo (World, not encrypted, rev A)

**Sega · 1982** — transpiled from the MAME driver `src/mame/pacman/pengo.cpp` by mamekit.

![marquee](/artwork/media/marquees/pengo.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/pengo.webp) | ![cabinet](/artwork/media/cabinets/pengo.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 13 |

- **Sound:** wsg @ 0.096 MHz
- **Screen:** 288×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `epr-5128.ic8` | 0x0 | 0x1000 | `3dfeb20e` |
| `maincpu` | `epr-5129.ic7` | 0x1000 | 0x1000 | `1db341bd` |
| `maincpu` | `epr-5130.ic15` | 0x2000 | 0x1000 | `7c2842d5` |
| `maincpu` | `epr-5131a.ic14` | 0x3000 | 0x1000 | `6e3c1f2f` |
| `maincpu` | `epr-5132.ic21` | 0x4000 | 0x1000 | `95f354ff` |
| `maincpu` | `epr-5133.ic20` | 0x5000 | 0x1000 | `0fdb04b8` |
| `maincpu` | `epr-5134.ic32` | 0x6000 | 0x1000 | `e5920728` |
| `maincpu` | `epr-5135a.ic31` | 0x7000 | 0x1000 | `13de47ed` |
| `gfx1` | `epr-1640.ic92` | 0x0 | 0x1000 | `d7eec6cd` |
| `gfx1` | `epr-1695.ic105` | 0x1000 | 0x1000 | `5bfd26e9` |
| `proms` | `pr1633.ic78` | 0x0 | 0x20 | `3a5844ec` |
| `proms` | `pr1634.ic88` | 0x20 | 0x400 | `766b139b` |
| `namco` | `pr1635.ic51` | 0x0 | 0x100 | `c29dea27` |
| `namco` | `pr1636.ic70` | 0x100 | 0x100 | `77245b66` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Down | joystick down | `IN0` | 0x2 |
| Left | joystick left | `IN0` | 0x4 |
| Right | joystick right | `IN0` | 0x8 |
| 5 | coin1 | `IN0` | 0x10 |
| 6 | coin2 | `IN0` | 0x20 |
| Space / X | button1 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x20 |
| 2 | start2 | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN1` | 0x10 | 0x10 |
| Bonus Life | `DSW1` | 0x1 | 0x0 |
| Demo Sounds | `DSW1` | 0x2 | 0x0 |
| Cabinet | `DSW1` | 0x4 | 0x0 |
| Lives | `DSW1` | 0x18 | 0x10 |
| Rack Test (Cheat) | `DSW1` | 0x20 | 0x20 |
| Difficulty | `DSW1` | 0xc0 | 0x80 |
| Coin A | `DSW2` | 0xf | 0xc |
| Coin B | `DSW2` | 0xf0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/pacman/pengo.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 151 commits by 25 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Ivan Vangelista, Vas Crabb, David Haywood

## The story

Arcade Video game published 44 years ago:

Pengo (c) 1982 Sega.

Pengo is an action game set in an overhead maze constructed of ice blocks. The player controls Pengo, a red penguin that lives in the Antarctic and fights the blob-like Sno-Bees. The objective of the game is for Pengo to survive a series of rounds by eliminating all Sno-Bees, while amassing bonuses by bringing together the three diamonds dispersed in the maze.

The Maze itself is an interactive environment. Each section of wall is a block of ice that can be pushed onto the Sno-bees to destroy them. Pressing the button while pushing the joystick will cause Pengo to push the ice block in the direction he is facing. The block will slide until it hits either a wall or another ice block, crushing any Sno-Bees in its path. Crushing more than one Sno-Bee at once will increase the number of points awarded.

As the player crushes the Sno-Bees, new ones hatch from eggs located within ice blocks. Each time a new one hatches, blocks containing eggs that have still not hatched yet are briefly identified by flashing the color of that round's Sno-Bees. A certain number of eggs will hatch immediately at the start of each round - this is also the maximum number of active Sno-Bees at any one time in the round. Eggs can be eliminated by crushing the ice blocks that contain them. If Pengo pushes a side wall at the edge of the screen, the water vibrates, any adjacent Sno-Bees will be briefly stunned and are eliminated if Pengo walks over them in this state. 

The Sno-bees themselves will destroy the ice blocks as they move around each level, so speed is of the essence. Some of the blocks are 'Diamond blocks' which cannot be destroyed but can be re-used by Pengo. 

After 60 seconds elapse in a round without a player or enemy death, the game enters into sudden death mode; the music tempo and movement of the Sno-Bees accelerates. If a single Sno-Bee remains in the round, a jingle plays and the Sno-Bee accelerates in an attempt to reach a corner, where it safely fades away.

There are a total of 16 rounds in the game. After round 16 is cleared, the game loops back to round 1.

### Technical
Game ID: 834-0386

Main CPU: Zilog Z80 (@ 3.02 Mhz)
Sound Chips: Namco 3-channel WSG (@ 96 Khz)

Players: 2
Control: 4-way joystick
Buttons: 1 (PUSH)

Pengo is known to have two different marquees. One marquee depicts Pengo standing next to the game's logo, with one leg up on an ice block, and one hand pushing against the O in the logo; the Sega logo appears in small print directly underneath the O. The other marquee depicts Pengo pushing an ice block, with the Sega logo appearing on the lower right corner of the marquee in a larger print.

### Trivia
Pengo was released in September 1982 in Japan, in October 1982 in North America, and in December 1982 in Europe.

Pengo makes a cameo appearance in "Up'n Down". If a player manages to pass the first 4 rounds in under a minute each, he will appear in the water of round 5 riding a surfboard.

The color for the Sno-Bees is different in each round and follows an eight-round pattern: green, red, yellow, pink, orange, yellow, light blue, yellow.

Demonstration gameplay in the attract mode always plays Round 5, with the orange Sno-Bees.

The song that is played during the brief intermissions that appear after every even-numbered round is cleared is "Ode to Joy" from the fourth movement of Beethoven's Ninth Symphony.

Rodney Day holds the official record for this game with 1110370 points.

A bootleg of this game is known as "Penta".

### Updates
In Japanese versions:
- The maze is visibly drawn at the start of each round.
- The default top 5 high scores are all 20,000, and the default names are AAA, KKK, III, RRR, and AAA. 
- The in-game theme music is an 8-bit interpretation of the 1969 Gershon Kingsly composition known as "Popcorn", made most famous in 1972 by the instrumental band Hot Butter.
- The total number of enemies in each round is as follows: 6 in rounds 1 and 2, 8 in rounds 3-7, 10 in rounds 8-11, and 12 in rounds 12-16.

In export versions:
- The maze is loaded instantly at the start of each round
- The default top 5 high scores are all 0, and the default names are MMM, MMM, III, ZZZ, and UUU.
- Snappy original music is used as the in-game theme instead of the "Popcorn" song.
- The total number of enemies in each round is as follows: 6 in round 1, 8 in rounds 2-5, 9 in rounds 6 and 7, 10 in rounds 8 and 9, 11 in rounds 10 and 11, and 12 in rounds 12-16.

In all Japanese versions except the non-encrypted one, rounds are referred to in-game as "Acts".

Later versions correct a Test Menu Bug that is present in version Japan, 315-5010 type, Rev C.

In Export versions except version World, 315-5007 type, rev A (formerly set 4 in mame):
- The curtain speed is fastest.
- The demo mode is different.
- Delay before player can move at the start of a stage changed from 64 frames to 16 frames.
- Delay before the next level loads after an intermission changed from 64 frames to 16 frames.
- Delay before the sky rapidly changes colors in the intro changed from 64 frames to 48 frames.

Version World, 315-5007 type rev A introduced a number of changes to make the game flow faster than in other sets:
- Number of frames before the level completion time is shown changed from 32 to 8.
- Number of frames after a time bonus is calculated changed from 128 to 64.
- Number of frames before the screen wipes after the player has died changed from 128 to a single frame.

### Scoring
Smashing an ice block : 30 points. 
Smashing an ice block with a Sno-Bee inside : 500 points. 
Walking over a stunned Snow-Bee : 100 points. 
Killing a Snow-Bee with an ice block : 400 points. 
Killing two Snow-Bees at once with one ice block : 1600 points. 
Killing three Snow-Bees at once with one ice block : 3200 points. 
Killing four Snow-Bees at once with one ice block : 6400 points. 
Lining up the three diamond blocks with one or zero of them touching a wall : 10000 points.
Lining up the three diamond blocks with two or more touching a wall : 5000 points.
Completing screen in under 20 seconds : 5000 bonus points. 
Completing screen in 20-29 seconds : 2000 bonus points. 
Completing screen in 30-39 seconds : 1000 bonus points. 
Completing screen in 40-49 seconds : 500 bonus points. 
Completing screen in 50-59 seconds : 10 bonus points. 
Completing screen in 60 seconds and over : no bonus points.

### Tips and tricks
* The last remaining Sno-Bee on the screen will try to escape. If you do not kill it before it reaches one of the corners it will disappear.

* The indicator at the top of the screen tells you how many Sno-Bee eggs are still unhatched and hidden in ice blocks.

* A certain number of Sno-Bee eggs will hatch immediately at the start of each round. This is also the maximum number of active Sno-Bees you can have at any one time during the round. In rounds 1-4, this number is three; in rounds 5-16, it is four.

* Every time a Sno-Bee egg hatches, some ice blocks will flash, revealing the locations of Sno-Bee eggs that have not hatched yet. You can destroy the ice block to eliminate that Sno-Bee egg before it even hatches.

* When you kill the last Sno-Bee you have a couple of seconds to crush up to four ice blocks for an extra 30 points each.

* Concentrate your efforts on lining up the diamond blocks. The 10000 points are the biggest single score in the game, and stunning all the Sno-Bees is also a valuable side effect. You can then kill them easily by pushing ice blocks onto them rather than running over them (400 points as opposed to 100).

* Lining up the three diamond have another side effect: the remaining ice blocks with a Sno-Bee inside will be flash to the end of screen.

* Try to kill more than one Sno-Bee at a time, as two or more together are worth more points than killing them individually.

* Easter Egg:
In the attract mode, push the two joys to up, press the two action buttons and one button of start game, and it will show the credits of the game. After a few seconds, the game will reset. The wait can be stopped pushing the 1P Start button.

### Staff
Developed by Coreland Technology.

Directed by: Nobuo Kodera
Programed by: Akira Nakakuma
Designed by: Shinji Egi
Involved in the project: Tsutomu Iwane

### Ports
* CONSOLES:
[US] Atari 5200 (1983) "Pengo [Model CX5236]"
[US] Atari 2600 (1984) "Pengo [Model CX2690]"
Atari XEGS
[JP] Sega Game Gear (oct.6, 1990) [Model G-3202] 
[EU] Sega Game Gear (1991) 
[JP] Sega Mega Drive (dec.22, 1995) "Pepenga Pengo [Model G-4133]"
[JP] Sega Saturn (feb.28, 1997) "Sega Memorial Selection Vol.1 [Model GS-9135]"
[JP] Nintendo Wii [Virtual Console] (aug.4, 2009) : Mega Drive version.

* COMPUTERS:
[US] Atari 800 (1983)
[EU] BBC Micro (1983) 
[US] Commodore C64 [EU] (1983)
[EU] Commodore C64 (1983)
[US] Commodore C64 (1983) "Petch"
[EU] Commodore C64 (1983) "Petch"
[US] Tandy Color Computer (1983) "Pengon"
[EU] Amstrad CPC (1986) "Troglo"
Atari 800 "Pengon"
Commodore 64 "Pengon"
Dragon 32 "Pengon"
Vic-20 "Pengon" : Unreleased, the only mention online is that the developer says he made it.
[JP] PC [MS Windows 98] (1998) "Memorial Selection [Model HCJ-0147]"

* OTHERS:
[US] LCD handheld game (1982) by Bandai.
[US] VFD portable game (1983) by Bandai.
[US] Blackberry (aug.28, 2009) "Pengo Mobile [Model 3107]"
[US] Mobile phones (2003) 
[US] Apple iPhone/iPod (feb.2, 2011) [Model 416880921]

### Series
1. Pengo (1982)
2. Ge-sen Love Plus Pengo! (2012)
3. Finger Pengo (2011, iPhone/iPod)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1944/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `pengo`. Play it at [../../../app/g/pengo/](../../../app/g/pengo/) or [explore the knowledge graph](viewer.html).*
