# 1942 (Revision B)

**Capcom · 1984** — transpiled from the MAME driver `src/mame/capcom/1942.cpp` by mamekit.

![marquee](/artwork/media/marquees/1942.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/1942.webp) | ![cabinet](/artwork/media/cabinets/1942.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.000 MHz | 17 |
| `audiocpu` | Z80 | 3.000 MHz | 6 |

- **Sound:** ay8910 × 2 @ 1.500 MHz
- **Screen:** 256×224 @ 59.64 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `srb-03.m3` | 0x0 | 0x4000 | `d9dafcc3` |
| `maincpu` | `srb-04.m4` | 0x4000 | 0x4000 | `da0cf924` |
| `maincpu` | `srb-05.m5` | 0x10000 | 0x4000 | `d102911c` |
| `maincpu` | `srb-06.m6` | 0x14000 | 0x2000 | `466f8248` |
| `maincpu` | `srb-07.m7` | 0x18000 | 0x4000 | `0d31038c` |
| `audiocpu` | `sr-01.c11` | 0x0 | 0x4000 | `bd87f06b` |
| `gfx1` | `sr-02.f2` | 0x0 | 0x2000 | `6ebca191` |
| `gfx2` | `sr-08.a1` | 0x0 | 0x2000 | `3884d9eb` |
| `gfx2` | `sr-09.a2` | 0x2000 | 0x2000 | `999cf6e0` |
| `gfx2` | `sr-10.a3` | 0x4000 | 0x2000 | `8edb273a` |
| `gfx2` | `sr-11.a4` | 0x6000 | 0x2000 | `3a2726c3` |
| `gfx2` | `sr-12.a5` | 0x8000 | 0x2000 | `1bd3d8bb` |
| `gfx2` | `sr-13.a6` | 0xa000 | 0x2000 | `658f02c4` |
| `gfx3` | `sr-14.l1` | 0x0 | 0x4000 | `2528bec6` |
| `gfx3` | `sr-15.l2` | 0x4000 | 0x4000 | `f89287aa` |
| `gfx3` | `sr-16.n1` | 0x8000 | 0x4000 | `024418f8` |
| `gfx3` | `sr-17.n2` | 0xc000 | 0x4000 | `e2c7e489` |
| `palproms` | `sb-5.e8` | 0x0 | 0x100 | `93ab8153` |
| `palproms` | `sb-6.e9` | 0x100 | 0x100 | `8ab44f7d` |
| `palproms` | `sb-7.e10` | 0x200 | 0x100 | `f4ade9a4` |
| `charprom` | `sb-0.f1` | 0x0 | 0x100 | `6047d91b` |
| `tileprom` | `sb-4.d6` | 0x0 | 0x100 | `4858968d` |
| `sprprom` | `sb-8.k3` | 0x0 | 0x100 | `f6fad943` |
| `irqprom` | `sb-1.k6` | 0x0 | 0x100 | `712ac508` |
| `proms` | `sb-2.d1` | 0x0 | 0x100 | `8bb8b3df` |
| `proms` | `sb-3.d2` | 0x100 | 0x100 | `3b0c99af` |
| `proms` | `sb-9.m11` | 0x200 | 0x100 | `4921635c` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `SYSTEM` | 0x1 |
| 2 | start2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x10 |
| 6 | coin2 | `SYSTEM` | 0x40 |
| 5 | coin1 | `SYSTEM` | 0x80 |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Down | joystick down | `P1` | 0x4 |
| Up | joystick up | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| Z | button2 | `P1` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `DSWA` | 0x7 | 0x7 |
| Cabinet | `DSWA` | 0x8 | 0x0 |
| Bonus Life | `DSWA` | 0x30 | 0x30 |
| Lives | `DSWA` | 0xc0 | 0xc0 |
| Coin B | `DSWB` | 0x7 | 0x7 |
| Service Mode | `DSWB` | 0x8 | 0x8 |
| Flip Screen | `DSWB` | 0x10 | 0x10 |
| Difficulty | `DSWB` | 0x60 | 0x60 |
| Screen Stop | `DSWB` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/capcom/1942.cpp`
- **Written by:** Paul Leaman, Couriersud
- **License:** BSD-3-Clause
- **Development:** 174 commits by 29 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 42 years ago:

1942 (c) 1984 Capcom.

1942 is a vertically-scrolling shoot-em-up set in the Pacific theatre during World War II, in which the goal is to reach Tokyo and destroy the entire Japanese air fleet. 

The player pilots a plane dubbed the 'Super Ace' and has to shoot down waves of enemy planes while avoiding incoming enemy fire. The 'Super Ace' can perform a limited number of rolls or 'loop-the-loops' to evade enemy planes and shots. Just two lives are given to the player.

During the game, waves of red enemy planes periodically appear. If the player manages to destroy a red wave, a power-up, in the form of a 'POW' symbol, will be dropped and can be picked up. The power-up will award either increased fire-power (doubling the player's guns from two to four), a smart bomb that destroys all on-screen enemy planes the instant it's collected, two wingmen planes that flank the Super Ace and increase fire power, or simply extra points.

At the end of each stage the 'Super Ace' lands on an aircraft carrier and bonus points are awarded based on player performance. 1942 differs from other games in that its levels are numbered in reverse order, so the game begins at stage 32 and ends at stage 1.

### Technical
Main CPU: Zilog Z80 (@ 4 Mhz)
Sound CPU: Zilog Z80 (@ 3 Mhz)
Sound Chips: (2x) General Instrument AY8910 (@ 1.5 Mhz)

Players: 2
Control: 8-way joystick.
Buttons: 2

### Trivia
1942 was released on November 30,1984 in Japan. 1942 wasn't a Yoshiki Okamoto title, but designed by his former-classmate who joined Capcom a few years afterwards.

The plane is a lockheed P-38 Lightning, the same type which was flown by Richard Bong in the Second World War. He was America's top ace, credited with shooting down 40 Japanese planes.

It was the first Capcom title to spawn a successful series of sequels, with six titles in the 19XX line released from 1984 to 2000.

Stage names:
Stages 32–29: Midway
Stages 28–25: Marshall
Stages 24–21: Attu
Stages 20–17: Rabaul
Stages 16–13: Leyte
Stages 12–09: Saipan
Stages 08–05: Iwojima
Stages 04–01: Okinawa

After the last boss plane on stage 02 is destroyed the screen displays: 
CONGRATULATION
YOU ARE THE BEST OF PLAYER !
FIGHT LAST ONE STAGE

Stage 01 is displayed as LAST STAGE.

After the last stage is complete the screen displays : 
WE GIVE UP!
SPECIAL BONUS
10000000 PTS
GAME OVER
PRESENTED BY CAPCOM
PS. HOPE OUR NEXT GAME.
(c) CAPCOM

Default High-score table ('Top 5 ranking score!!') :
TOP 40000 (c) CAPCOM 0
2ND 35000 ALL 0
3RD 30000 RIGHT 0
4TH 25000 RESERVED 0
5TH 20000 EXEDEXES 0

In the default high-score table, some previous Capcom Games appear. Since the Demo Mode only shows the top five, you need to play the game and to make a score of approximately 10,000 points (To enter in the top ten).
The number 5 (20,000 points) appears as 'EXEDEXES'.
Number 6 is 'VULGUS' (9,999 points).
Number 7 is 'SONSON' (8,888 points).
Number 8 is 'HIGEMARU' (7,777 points).
Number 9 is again 'EXEDEXES' (6,666 points).

The game ROM contains an unused Bomb sprite and an unused Star bonus items sprite.

Martin Bedard of Saint-Lazare, Quebec, Canada holds the record for this game with 13,360,960 points on November 19, 2006.

Soundtrack album releases :
Capcom Game Music (28XA-94) (August 25, 1986) [Alfa Record]
Capcom Game Music [Reprint] (SCDC-00193) (June 19, 2002) [Scitron Discs]
Legend of Game Music~Premium Box (SCDC-00410~7) (March 24, 2005) [Scitron Discs]

### Updates
In the two oldest versions of the game, there's a bug in the scoring system for earning bonus lives. This bug was fixed in Revision B.

### Scoring
Small planes are 30, 50, 70, 100, 150, or 200 points each.

The small red planes that fly formations of five or ten are 100 points each. Shooting all the planes in the five-plane formation awards 500 bonus points. Shooting all the planes in the ten-plane formation awards 1,000 bonus points. In both cases, when the last plane of a formation is destroyed, a power-up marker appears and is worth 1,000 points when picked up.

Occasionally a small airplane comes slowly out of the lower left or lower right hand side of the screen and flies towards the top. When hit, it turns into a special figure which awards 5,000 points when picked up.

Medium size planes are 1,000 or 1,500 points each.

Large bomber planes start at 2,000 points each. The score for each consecutive bomber destroyed without the player dying is 500 points more than the previous one, up to a maximum of 9,000 points. When the player’s ship is destroyed, the score for the bombers is reset back to 2,000 points.

There are four boss planes. They appear at the end of stages 26, 18, 10, and 02:
The stage 26 boss plane is worth 20,000 points.
The stage 18 boss plane is worth 30,000 points.
The stage 10 boss plane is worth 40,000 points.
The stage 02 boss plane is worth 50,000 points.

For all enemy planes that require more than one hit to kill, each hit on them gives 100 points.

At the end of each stage a bonus is awarded for shooting down percentage and for unused loops :
100% = Special bonus 50,000 points (in older revisions, the game displays 10,000 points bonus but 50,000 points are actually awarded).
95-99% = 20,000 points
90-94% = 10,000 points
85-89% = 5,000 points
80-84% = 4,000 points
70-79% = 3,000 points
60-69% = 2,000 points
50-59% = 1,000 points
Under 50% = 0 points
Unused loops are 1,000 points each.

Finishing the final stage awards 10,000,000 points.

### Tips and tricks
* On Stages 27, 20, 15, 08, and 04, a V-formation of red planes will come straight down from the top. If all five of the planes are destroyed, a Black/Red POW appears, giving the player an extra airplane when picked up.

* On stages with the wingman power-ups, use them to kill off the large bombers easily by crashing a wingman into them. You will get a second chance to get them back later on.

* On the stages with the boss planes, save all your loops; shoot at it quickly, loop down to avoid the shots, shoot at it again and THEN loop. You should be able to kill it this way.

* Most of the time it is easier to keep only one wingman rather than both; that way it's easier to maneuver around enemies. If you miss the red airplanes that give you the wingman powerup, kill off your plane (assuming you have some remaining) and the game will place you back before them.

* An interesting bug:
If you win an extra plane from points when killing a boss plane, no extra planes will be awarded on the basis of points. Extra planes can still be obtained by getting the Black/Red POW, but no point-based bonuses will be awarded for the rest of the game.

* The end of stage bonus for 100% shooting down is actually 50,000 points, even though the game displays a 'special' bonus of only 10,000 points.

When the player loses all of his ships, the game offers to continue for another credit. If this option is chosen, the game continues where it left off but the score is reset to zero.

* There are six kinds of powerups:
Quad fire, destroy all enemies on screen, two wingmen, make enemies stop shooting temporarily, extra loop, and extra life. Note that the destroy all enemies powerup does not destroy the small slow plane that has the 5,000 bonus item pickup.

Quad fire power-ups are found on Stages 32, 28, 24, 20, 16, 12, 08, and 04.
Destroy all enemies power-ups are found on Stages 31, 21, 19, 18, 11, 07, 03, and 01.
Wingman power-ups are found on Stages 30, 26, 22, 18, 14, 10, 06, and 02.
Extra life power-ups are found on Stages 27, 20, 15, 08, and 04.
Stop shooting power-ups are found on Stages 27 and 15. 
Extra loop power-ups are found on Stages 23, 18, 17, 13, 09, and 05.

* % and point up Stages are 29, 25, 21, 17, 13, 09, 05, 01. During these stages none of the enemies fire on the player except the large bomber planes.

* If the player earns enough bonus planes so that ten ships or more are in the reserve, the ten remaining ships indicators are replaced by the Greek letter Sigma (?).

### Staff
Designed by: Yasushi Okawara
Programmed by: Tamio Nakazato
Backgrounds by: Kuramo-san
Music by: Ayako Mori
Hardware designed by: Hiroshi Maki

### Ports
* CONSOLES: 
[JP] Nintendo Famicom (dec.11, 1985) "1942 [Model CAP-19]" 
[US] Nintendo NES (nov.1986) "1942 [Model NES-NF-USA]" 
[JP] Sega Saturn (aug.27, 1998) "Capcom Generation Dai 1 Shou Gekkitsui Oh no Jidai [Model T-1232G]" 
[JP] Sony PlayStation (aug.27, 1998) "Capcom Generation Dai 1 Shou Gekkitsui Oh no Jidai [Model SLPS-01535]" 
[EU] Sony PlayStation (sept.3, 1999) "Capcom Generations 1 - Wings of Destiny [Capcom Generations Disc 1] [Model SLES-01881]" 
[US] Microsoft XBOX (sept.27, 2005) "Capcom Classics Collection" 
[US] Sony PS2 (sept.27, 2005) "Capcom Classics Collection [Model SLUS-21316]" 
[EU] Microsoft XBOX (nov.18, 2005) "Capcom Classics Collection" 
[EU] Sony PS2 (nov.18, 2005) "Capcom Classics Collection [Model SLES-53661]" 
[JP] Sony PS2 (mar.2, 2006) "Capcom Classics Collection [Model SLPM-66317]" 
[JP] Nintendo Wii [Virtual Console Arcade] (dec.21, 2010) 
[AU] [EU] Nintendo Wii [Virtual Console Arcade] (jan.21, 2011) 
[US] Nintendo Wii [Virtual Console Arcade] (jan.24, 2011) 
[JP] Sony PlayStation 3 [PSN] (feb.19, 2013) "Capcom Arcade Cabinet [Model NPJB-00210]" 
[EU] Sony PlayStation 3 [PSN] (feb.20, 2013) "Capcom Arcade Cabinet" 
[JP] Microsoft XBOX 360 [XBLA] (feb.20, 2013) "Capcom Arcade Cabinet" 
[EU] Microsoft XBOX 360 [XBLA] (feb.20, 2013) "Capcom Arcade Cabinet" 
[AU] Microsoft XBOX 360 [XBLA] (feb.21, 2013) "Capcom Arcade Cabinet" 
[US] Sony PlayStation 3 [PSN] (apr.16, 2013) "Capcom Arcade Cabinet: Game Pack 5 [DLC]" 
[US] Microsoft XBOX 360 [XBLA] (apr.17, 2013) "Capcom Arcade Cabinet: Game Pack 5 [DLC]" 
[US] Sony PlayStation 3 [PSN] (may.21, 2013) "Capcom Arcade Cabinet: All-In-One Pack [DLC]" 
[US] Microsoft XBOX 360 [XBLA] (may.22, 2013) "Capcom Arcade Cabinet: All-In-One Pack [DLC]" 

* HANDHELDS: 
[US] Nintendo Game Boy Color (may.2000) "1942 [Model CGB-AQ4E-USA]" 
[EU] Nintendo Game Boy Color (aug.24, 2001) "1942 [Model CGB-AQ4E-EUR]" 
[JP] Sony PSP (sept.7, 2006) "Capcom Classics Collection [Model ULJM-05104]" 
[US] Sony PSP (oct.24, 2006) "Capcom Classics Collection Reloaded [Model ULUS-10134]" 
[EU] Sony PSP (nov.10, 2006) "Capcom Classics Collection Reloaded [Model ULES-00377]" 
[AU] Sony PSP (nov.16, 2006) "Capcom Classics Collection Reloaded" 

* COMPUTERS: 
[EU] Sinclair ZX Spectrum (1986) 
[US] [EU] Commodore C64 (1986) 
[JP] MSX (1986) 
[JP] MSX2 (1986) 
[EU] Amstrad CPC [Disk] (1986) by Elite 
[EU] Amstrad CPC [Tape] (1986) by Encore [MCM]
[EU] Amstrad CPC [Tape] (1986) by Elite 
[EU] Sinclair ZX Spectrum (1987) : Budget Edition 
[EU] Sinclair ZX Spectrum (1987) by Encore [Elite]
[EU] Sinclair ZX Spectrum (1987) by Encore [MCM]
[JP] FM-7 (may.1987) 
[EU] Amstrad CPC (1987) "6-Pak" 
[EU] Amstrad CPC (1988) "Frank Bruno's Big Box" 
[EU] Amstrad CPC (1989) "12 Top Amstrad Hits" 
[EU] Amstrad CPC (1990) "Top 17" 
[US] PC [CD-ROM] (2003) "Capcom Arcade Hits Volume 2" 
[US] PC [CD-ROM] (dec.21, 2004) "Capcom Coin-Op Collection Volume 1"

* OTHERS: 
[US] Apple iPhone/iPad (nov.4, 2010) "Capcom Arcade [Model 397347348]"

### Series
1. 1942 (1984) 
2. 1943 - Midway Kaisen (1987) 
3. 1943 Kai - Midway Kaisen (1988) 
4. 1941 - Counter Attack [B-Board 89625B-1] (1990) 
5. 19XX - The War Against Destiny [Green Board] (1995) 
6. 1944 - The Loop Master [Green Board] (2000)
7. 1942 - Joint Strike (2008, PSN/XBLA)

### Contribute
Edit this entry: https://www.arcade-history.com/game/6/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `1942`. Play it at [../../../app/g/1942/](../../../app/g/1942/) or [explore the knowledge graph](viewer.html).*
