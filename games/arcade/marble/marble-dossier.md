# Marble Madness (set 1)

**Atari Games · 1984** — transpiled from the MAME driver `src/mame/atari/atarisy1.cpp` by mamekit.

![marquee](/artwork/media/marquees/marble.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/marble.webp) | ![cabinet](/artwork/media/cabinets/marble.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M68010 | 7.159 MHz | 23 |
| `audiocpu` | M6502 | 1.790 MHz | 8 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 336×240 @ 59.92 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `136032.205.l13` | 0x0 | 0x4000 | `88d0be26` |
| `maincpu` | `136032.206.l12` | 0x1 | 0x4000 | `3c79ef05` |
| `maincpu` | `136033.623` | 0x10000 | 0x4000 | `284ed2e9` |
| `maincpu` | `136033.624` | 0x10001 | 0x4000 | `d541b021` |
| `maincpu` | `136033.625` | 0x18000 | 0x4000 | `563755c7` |
| `maincpu` | `136033.626` | 0x18001 | 0x4000 | `860feeb3` |
| `maincpu` | `136033.627` | 0x20000 | 0x4000 | `d1dbd439` |
| `maincpu` | `136033.628` | 0x20001 | 0x4000 | `957d6801` |
| `maincpu` | `136033.229` | 0x28000 | 0x4000 | `c81d5c14` |
| `maincpu` | `136033.630` | 0x28001 | 0x4000 | `687a09f7` |
| `maincpu` | `136033.107` | 0x80000 | 0x4000 | `f3b8745b` |
| `maincpu` | `136033.108` | 0x80001 | 0x4000 | `e51eecaa` |
| `audiocpu` | `136033.421` | 0x8000 | 0x4000 | `78153dc3` |
| `audiocpu` | `136033.422` | 0xc000 | 0x4000 | `2e66300e` |
| `alpha` | `136032.104.f5` | 0x0 | 0x2000 | `7a29dc07` |
| `tiles` | `136033.137` | 0x0 | 0x4000 | `7a45f5c1` |
| `tiles` | `136033.138` | 0x4000 | 0x4000 | `7e954a88` |
| `tiles` | `136033.139` | 0x10000 | 0x4000 | `1eb1bb5f` |
| `tiles` | `136033.140` | 0x14000 | 0x4000 | `8a82467b` |
| `tiles` | `136033.141` | 0x20000 | 0x4000 | `52448965` |
| `tiles` | `136033.142` | 0x24000 | 0x4000 | `b4a70e4f` |
| `tiles` | `136033.143` | 0x30000 | 0x4000 | `7156e449` |
| `tiles` | `136033.144` | 0x34000 | 0x4000 | `4c3e4c79` |
| `tiles` | `136033.145` | 0x40000 | 0x4000 | `9062be7f` |
| `tiles` | `136033.146` | 0x44000 | 0x4000 | `14566dca` |
| `tiles` | `136033.149` | 0x84000 | 0x4000 | `b6658f06` |
| `tiles` | `136033.151` | 0x94000 | 0x4000 | `84ee1c80` |
| `tiles` | `136033.153` | 0xa4000 | 0x4000 | `daa02926` |
| `proms` | `136033.118` | 0x0 | 0x200 | `2101b0ed` |
| `proms` | `136033.119` | 0x200 | 0x200 | `19f6e767` |
| `motherbrd_proms` | `136032.101.e3` | 0x0 | 0x100 | `7e84972a` |
| `motherbrd_proms` | `136032.102.e5` | 0x0 | 0x100 | `ebf1e0ae` |
| `motherbrd_proms` | `136032.103.f7` | 0x0 | 0xeb | `92d6a0b4` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | trackball x left | `IN0` | 0xff |
| Right | trackball x right | `IN0` | 0xff |
| Up | trackball y up | `IN1` | 0xff |
| Down | trackball y down | `IN1` | 0xff |
| 1 | start1 | `F60000` | 0x1 |
| 2 | start2 | `F60000` | 0x2 |
| 5 | coin1 | `1820` | 0x1 |
| 6 | coin2 | `1820` | 0x2 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `F60000` | 0x40 | 0x40 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/atari/atarisy1.cpp`
- **Written by:** Aaron Giles
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Aaron Giles (driver header); SynaMax (3 release notes); David Haywood (2 release notes); hap (2 release notes); algestam (1 release note); anonymous (1 release note); AntoPISA (1 release note); Dutchman2000 (1 release note); Sonikos (1 release note); Tafoid (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 233 commits by 32 commit authors, 2007–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 42 years ago:

Marble Madness (c) 1984 Atari Games Corporation.

Marble Madness is an abstract maze game for one or two players. The game's goal is to guide a small glass marble over a three-dimensional maze and reach the finish line before the level's timer has expired. Any seconds that remain on the timer when the finish line is crossed are carried over to the next level. 

As well as having to negotiate the marble over treacherous walkways and ramps, numerous obstacles and unfriendly creatures will try to slow the marble's progress or knock it over the edge of a platform, wasting yet more precious seconds until a replacement marble appears. The two-player game has players competing to reach the goal first. 

Marble Madness features six different mazes. The race names are:
1. Practice
2. Beginner
3. Intermediate
4. Aerial
5. Silly
6. Ultimate

### Technical
Game ID : 136033

Runs on the "Atari System 1" hardware.

Players : 2
Control : trackball

### Trivia
Marble Madness was released in December 1984. 

Marble Madness was the first game to run on the new Atari System 1 hardware and was the perfect showcase for Atari to demonstrate the technical superiority of its new arcade architecture. It was also the first game to feature such impressive and cleanly rendered pseudo 3-D Graphics. The original design brief called for the trackball to be motorized and synchronize its spin with that of the marble, to simulate inertia.

Mark Cerny was only 17 years old when he joined Atari and designed Marble Madness. The game was designed as part of a contest Atari ran at the time, allowing outsiders to design a game. Mark was very well known for his game-playing skills and easily won the contest. He then taught himself how to program in assembly language before joining Atari, so he found it very easy to settle in at Atari.

3,270 units were produced. The original selling price was $1,795.

Marble Madness was the first game to feature true stereo sound; it was the first game to truly capitalize on what in-game music could offer the player, with each level having its own distinctive, and suspense building soundtrack. Marble Madness was also one of the few games of the time to have a definite goal, in that the game ends when all levels are completed.

Default highscore table (TROUBLEMAKERS) :
#1 C R 14,500
#2 UFO 14,000
#3 GJL 13,500
#4 SKP 13,000
#5 PCT 12,500
#6 PTR 12,000
#7 JDH 11,500
#8 DAT 11,000
#9 JFS 10,500
#10 DAR 10,000

Stan Szczepanski holds the official record for this game with 187,880 points.

A sequel to this classic game, entitled "Marble Madness 2 - Marble Man" was fully developed and a very small number of cabinets were built, but unfortunately the game was never released. Unlike the first game's superb trackball control, 'Marble Man' was controlled via a joystick.

### Scoring
Moving the marble : 10 points per unit
Taking a jump (Practice race only) : 3,000 to 6,000 points
Killing Black Steelie : 1,000 points
Going through a tunnel or tube : 2,000 or 4,000 points
Rolling over an enemy (Silly race only) : 500 points + 3 seconds of time
Finishing a race : race number x 1,000 points
Finishing a race : seconds remaining x 100 points
Finishing the game : 20,000 points + 1,000 points per second remaining
Finishing the game : -1,000 point penalty for every death during the game.

### Tips and tricks
* Hints:
1) Anticipate your next move and start the Trak-Ball rolling in that direction ahead of time.
2) Complete each raceway as fast as possible because extra seconds mean extra points, and the extra time from one raceway is carried over to the next raceway
3) Try to maneuver around the Black Steelie, or try to bump him off a cliff to get rid of him permanently.
4) Move quickly to avoid being swallowed by the green Marble Munchers.
5) Watch for patterns, and time your movements right to pass by difficult obstacles.
6) Some raceways have alternate paths, so explore a bit and you may find an easier way to reach the goal. Bonus points are given for paths which are more difficult.

* Cancel The Timer: Begin a game and then hold down either 1 or 2 player Start and press service switch' twice. The first press will glitch the screen display slightly - the second will remove it and give you 99 seconds to complete the level. This method adds 60 seconds to the clock, after which the normal countdown will begin. The clock will not appear to be counting down during the first 60 seconds, probably because the 99-second display was overflowed by the extra 60 seconds added. This method can be used multiple times per level for virtually infinite play time.

* When playing with 2 players, the winner of each level gets a bonus 5 seconds. If your opponent can make it as far as the silly race, that's an extra 25 seconds for the ultimate race, not to mention a possible extra 10 seconds with a wand. The opponent can also continue once (with the same time as the other player).

* This isn't really a trick, but some people don't realize it: On the practice race, don't move when you start, and after a few seconds, a ramp will appear that will slide away the ball.

### Staff
Designer & Graphics Programmer: Mark Cerny
Game Programmer: Bob Flanagan
Animator: Sam Comstock
Sound Design: Hal Canon, Brad Fuller
Hardware Design: Sam Ly (S Ly), Jed Margolin (J Margolin), Don Paauw (D Paauw), Doug Snyder (D Snyder)
System Support: Chris Downend (C Downend), Morgan Hoff (M Hoff), Jack Ritter (J Ritter)
Software Support: Mike Albaugh (M Albaugh), Mike Mahar (M Mahar), Rich Moore (R Moore)
Hardware Support: Juan Castillo (J Castillo), Erik Durfey (E Durfey), Patrick McCarthy (P McCarthy), Minh Nguyen (N Minh)

### Ports
* CONSOLES:
Atari 7800 : Unreleased prototype
[EU] [AU] Nintendo NES (1989) 
[US] Nintendo NES (mar.1989) "Marble Madness [Model NES-MV]" 
[EU] Sega Master System (1992) "Marble Madness [Model 27024]" 
[US] Sega Genesis (1993) 
[EU] Sega Mega Drive (1993) 
[JP] Sega Mega Drive (aug.13, 1993) "Marble Madness [Model T-48113]" 
[US] Sony PlayStation (dec.31, 1997) "Arcade's Greatest Hits - The Atari Collection 2 [Model SLUS-00449]" 
[EU] Sony PlayStation (june.1998) "Arcade's Greatest Hits - The Atari Collection 2 [Model SLES-00712]" 
[US] Sony PS2 (nov.18, 2003) "Midway Arcade Treasures [Model SLUS-20801]" 
[US] Microsoft XBOX (nov.24, 2003) "Midway Arcade Treasures" 
[US] Nintendo GameCube (dec.18, 2003) "Midway Arcade Treasures [Model DOL-GAKE-USA]" 
[EU] Microsoft XBOX (feb.6, 2004) "Midway Arcade Treasures" 
[EU] Sony PS2 (feb.6, 2004) "Midway Arcade Treasures [Model SLES-51927]" 
[US] Microsoft XBOX 360 (nov.6, 2012) "Midway Arcade Origins" 
[US] Sony PlayStation 3 (nov.6, 2012) "Midway Arcade Origins [Model BLUS-31083]"
[EU] Microsoft XBOX 360 (nov.15, 2012) "Midway Arcade Origins" 
[EU] Sony PlayStation 3 (nov.15, 2012) "Midway Arcade Origins [Model BLES-01768]"

* HANDHELDS: 
[US] Nintendo Game Boy (may.1991) "Marble Madness [Model DMG-MB-USA]" 
[US] Sega Game Gear (1992) "Marble Madness [Model T-48058]" 
[EU] Sega Game Gear (1992) "Marble Madness [Model T-48058-50]" 
[EU] Nintendo Game Boy (may.21, 1992) "Marble Madness [Model DMG-MB-NOE]" 
[US] Nintendo Game Boy Color (dec.1999) "Marble Madness [Model CGB-ANNE-USA]" 
[EU] Nintendo Game Boy Color (mar.13, 2000) "Marble Madness [Model CGB-ANNE-USA]" 
[US] Nintendo GBA (aug.16, 2005) "2 Games in One! Marble Madness + Klax [Model AGB-B68E-USA]" 
[EU] Nintendo GBA (sept.16, 2005) "2 Games in One! Marble Madness + Klax [Model AGB-B68P-EUR]" 
[US] Sony PSP (dec.13, 2005) "Midway Arcade Treasures Extended Play [Model ULUS-10059]" 
[EU] Sony PSP (feb.24, 2006) "Midway Arcade Treasures Extended Play [Model ULES-00180]" 

* COMPUTERS:
[US] Tandy Color Computer (1985) "Marble Maze" 
[US] Atari ST (1986)
[US] PC [Booter] (1986)
[US] [EU] Commodore C64 (1986)
[US] Apple II (1986)
[EU] Amstrad CPC (1986)
[US] [EU] Commodore Amiga (1986)
[EU] Sinclair ZX Spectrum (1987)
[US] PC [MS-DOS] (1987) 
[JP] Sharp X68000 (mar.15, 1991) 
[JP] FM Towns PC (1991) 
[JP] NEC PC-9801 (1991) "Marble Madness"
[US] PC [MS Windows, CD-ROM] (jan.1, 1999) "Arcade's Greatest Hits - The Atari Collection 2" 
[US] PC [MS Windows, CD-ROM] (aug.27, 2004) "Midway Arcade Treasures" 
[EU] PC [MS Windows, CD-ROM] (nov.23, 2004) "Midway Arcade Treasures" 

* OTHERS:
[US] LCD handheld game (1989) by Tiger Electronics.
[US] Mobile Phones (sept.2004) 
[US] BlackBerry (nov.12, 2009) [Model 4315] 
[US] Windows Mobile (feb.1, 2010) 
[US] Apple iPhone/iPod (apr.23, 2010) [Model 367932500]

### Series
1. Marble Madness (1984)
2. Marble Man - Marble Madness II (1991)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1559/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `atarisy1`. Play it at [../../../app/g/marble/](../../../app/g/marble/) or [explore the knowledge graph](viewer.html).*
