# Mr. Do!

**Universal · 1982** — transpiled from the MAME driver `src/mame/universal/mrdo.cpp` by mamekit.

![marquee](/artwork/media/marquees/mrdo.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/mrdo.webp) | ![cabinet](/artwork/media/cabinets/mrdo.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 4.100 MHz | 15 |

- **Sound:** sn76489 × 2 @ 4.100 MHz
- **Screen:** 240×192 @ 59.94 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `a4-01.bin` | 0x0 | 0x2000 | `03dcfba2` |
| `maincpu` | `c4-02.bin` | 0x2000 | 0x2000 | `0ecdd39c` |
| `maincpu` | `e4-03.bin` | 0x4000 | 0x2000 | `358f5dc2` |
| `maincpu` | `f4-04.bin` | 0x6000 | 0x2000 | `f4190cfc` |
| `gfx1` | `s8-09.bin` | 0x0 | 0x1000 | `aa80c5b6` |
| `gfx1` | `u8-10.bin` | 0x1000 | 0x1000 | `d20ec85b` |
| `gfx2` | `r8-08.bin` | 0x0 | 0x1000 | `dbdc9ffa` |
| `gfx2` | `n8-07.bin` | 0x1000 | 0x1000 | `4b9973db` |
| `gfx3` | `h5-05.bin` | 0x0 | 0x1000 | `e1218cc5` |
| `gfx3` | `k5-06.bin` | 0x1000 | 0x1000 | `b1f68b04` |
| `proms` | `u02--2.bin` | 0x0 | 0x20 | `238a65d7` |
| `proms` | `t02--3.bin` | 0x20 | 0x20 | `ae263dc0` |
| `proms` | `f10--1.bin` | 0x40 | 0x20 | `16ee4ca2` |
| `proms` | `j10--4.bin` | 0x60 | 0x20 | `ff7fe284` |
| `pal16r6` | `u001_pal16r6cn.j2` | 0x0 | 0x104 | `84dbe498` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Left | joystick left | `P1` | 0x1 |
| Down | joystick down | `P1` | 0x2 |
| Right | joystick right | `P1` | 0x4 |
| Up | joystick up | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| 1 | start1 | `P1` | 0x20 |
| 2 | start2 | `P1` | 0x40 |
| 5 | coin1 | `P2` | 0x40 |
| 6 | coin2 | `P2` | 0x80 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Difficulty | `DSW1` | 0x3 | 0x3 |
| Rack Test (Cheat) | `DSW1` | 0x4 | 0x4 |
| Special | `DSW1` | 0x8 | 0x8 |
| Extra | `DSW1` | 0x10 | 0x10 |
| Cabinet | `DSW1` | 0x20 | 0x0 |
| Lives | `DSW1` | 0xc0 | 0xc0 |
| Coin B | `DSW2` | 0xf | 0xf |
| Coin A | `DSW2` | 0xf0 | 0xf0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/universal/mrdo.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 103 commits by 22 contributors, 2007–2025
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Olivier Galibert, hap

## The story

Arcade Video game published 43 years ago:

Mr. Do! (c) 1983 Universal.

Mr. Do! is a colourful and addictive maze game in which the player takes on the role of the eponymous Mr. Do, a circus clown, who must clear each level of either cherries or monsters. The game's single screen levels are made up of tunnels surrounded by a colourful, soil-like substance. This soil can be dug through to create new tunnels, allowing Mr. Do to escape his enemies and to reach the many cherries that litter the levels. A number of apples are also scattered around each level, and Mr. Do can push them along tunnels (to block and/or kill monsters) or can tunnel beneath them to drop them onto the heads of any pursuing enemies. Mr. Do himself can also be killed by a falling apple.

Mr. Do is armed with a 'Powerball' that can be fired down a tunnel, it will then bounce around the tunnels until it either returns to Mr. Do, or comes into contact with, and kills, one of the level's monsters. The Powerball regenerates immediately the first time you use it, but takes longer each time it is used to return to your hands. As each level progresses, the monsters themselves start to dig tunnels of their own in their pursuit of Mr. Do. Monsters can also push the apples.

Each screen has a doorway through which the monsters enter the level. Once all of the monsters have appeared, the doorway will turn into a 'prize', (ice cream, biscuits, etc.). If Mr. Do collects the prize, the 'Alphamonster' and his three 'Muncher' henchmen will appear. The Alphamonster may be in the EXTRA box at the top of the screen or be moving around the screen. The Alphamonster and the Munchers cannot be easily crushed under apples because they tend to eat them. They can be killed individually with the Powerball or by killing the Alphamonster itself, at which point any remaining Munchers will turn into apples.

After every three levels, there is a brief intermission in which a tune is played and a large, animated Mr. Do appears, together with some of the game's monsters. The time to complete each level and the preferred method (monsters, cherries, Alphamonsters, or Diamond) is shown. The paths in the first level resemble a 'D', after this each level's tunnels resemble a digit, ('2', '3', '4' etc.) up to '0' for level 10.

A level can be completed any one of several different ways : either by collecting all of the on-screen cherries; by killing all of the monsters, by completing the EXTRA box, or by collecting the diamond. The latter appears only very occasionally ('Special' awards an extra credit).

### Technical
Prom Stickers : D1-D10

Main CPU : Zilog Z80
Sound Chips : (2x) Texas Instruments SN76496

Players : 2
Control : 4-way joystick
Buttons : 1

### Trivia
Mr. Do! was released in September 1982 in Japan and in December 1982 in the USA. It was also licensed to Taito.

Mr. Do! was inspired by "Dig Dug" and was the first in a series of four Mr. Do! games. Mr. Do! was one of video-gaming's biggest arcade successes. Unfortunately for Universal, none of their other games could match it in commercial terms. 

It is the game responsible for launching the kit game craze in the U.S. video game industry.

David Breckon holds the official record for this game with 26,030,050 points.

A bootleg of this game is known as "Mr. Lo!", and another is called "Mr. Du!".

There are several well-known hacks of Mr Do! which are as follows :
* Mr. DigDo! - graphics changed to make them look more like those of Namco's "Dig Dug".
* Mr. Jong - Changes the clown into an old Chinese man, the monsters into clowns and the apples into mahjong blocks.
* Yankee Do! - Changes the graphics to make them more American patriotic.

### Updates
On the Prototype version (which is a Japanese hack) :
* You are a 'Yukidaruma' (a snowman) with green arms instead of the famous clown.
* You dig with a rake in your hands.
* There is a mean expression when you push an apple.
* The screen does not turn red when you grab cookies, cake, etc...

### Scoring
Eating a cherry : 50 points.
Eating a series of 8 cherries in a row : 500 points bonus.
Killing a monster with your snowball : 500 points.
Killing one monster with one apple : 1,000 points.
Killing two monsters with one apple : 2,000 points.
Killing three monsters with one apple : 4,000 points.
Killing four monsters with one apple : 6,000 points.
Killing five or more monsters with one apple : 8,000 points.
Collecting special (free credit) diamond : 8,000 points.
Collecting bonus treat from empty monster home: 1,000 points on level one, increasing incremently up to a maximum of 8,000 points on level 22 onwards.

### Tips and tricks
* 255 Lives Tricks : It's possible to win 255 lives on the first screen, but only if an apple appears in the top two rows of the playfield.
1) Begin by digging a tunnel directly from the bottom of the screen to just below the apple, but leave enough dirt under it that it doesn't fall.
2) Next, kill all of the enemies but one, then lose all of your extra lives. As soon as you're on your last life, go right under the apple and wait.
3) Eventually, the remaining enemy will come after you. Allow the apple to drop, but, in the interval before you're squashed, kill the enemy with the powerball. If all has gone well, you'll be carried to the bottom of the screen, the music will go haywire for a moment, and you'll be awarded 255 extra lives.
4) Note that you should always lose a life before spelling 'EXTRA', or you'll roll back to zero lives, so, to be safe, immediately kill yourself at the start of level two.
5) IMPORTANT : This trick will only work with the Taito version of Mr. Do!.

* Here's A Neat Trick : You can divide the screen into a grid. The cherries, apples, and tunnel corners are all centered on a grid element. If you are being chased by the normal badguys (not ghosts) you can dig and stop between grid elements. The badguy will think it needs to turn into a digger to get you. While he's changing forms, you can escape.

* An Alphamonster will appear every time your score reaches a multiple of 5,000.

### Ports
* CONSOLES:
Colecovision [US] (1983) "Mr. Do! [Model 2622]"
[US] Atari 2600 (1983) "Mr. Do! [Model 2656]"
[JP] Nintendo Super Famicom (june.23, 1995) "Mr. Do! [Model SHVC-AUNJ-JPN]" 
[US] Nintendo SNES (dec.1996) "Mr. Do! [Model SNS-AUNE-USA]" 
[EU] Nintendo SNES (mar.27, 1997) "Mr. Do! [Model SNSP-AUNP-EUR]" 
Nintendo Wii [Virtual Console Arcade] [JP] (apr.27, 2010) 

* HANDHELDS: 
[EU] Nintendo Game Boy (1992) "Mr. Do! [Model DMG-M4-NOE]" 
[US] Nintendo Game Boy (nov.1992) "Mr. Do! [Model DMG-M4-USA]" 

* COMPUTERS:
BBC B [EU] "Mr.EE!" 
[EU] Acorn Electron "Mr Wiz" by Superior Software 
[JP] MSX (1984) "Mr. Do [Model 48C99-1004]" 
Tandy Color Computer [US] (1984) "Mr. Dig" 
[EU] Amstrad CPC (1984) "Fruity Frank" 
MSX [EU] (1985) "Fruity Frank" 
[US] Commodore C64 [EU] (1985) 
[JP] Sharp X68000 (june.1994) "Mr. Do! and Mr. Do! vs. the Unicorns" 
[US] Apple II (1985) 
[US] Atari 800 (1984)
Tomy Tutor [EU] 
NEC PC-98 [JP] (1996)
Fujitsu FM-7 [JP] 

* OTHERS:
LCD handheld game [US] (1983) by Tomy : Their most impressive feature is a multi-colored backlit LCD, which is very impressive looking (and it is backlit by a full-length fluorescent light).
LCD handheld game [DE] (1983) "Mr. Go!" by Tomy

### Series
1. Mr. Do! (1982)
2. Mr. Do's Castle (1983)
3. Mr. Do's Wild Ride (1984)
4. Do! Run Run (1984)
5. Neo Mr. Do! (1996)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1684/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `mrdo`. Play it at [../../../app/g/mrdo/](../../../app/g/mrdo/) or [explore the knowledge graph](viewer.html).*
