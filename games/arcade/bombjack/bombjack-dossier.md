# Bomb Jack

**Tehkan · 1984** — transpiled from the MAME driver `src/mame/tecmo/bombjack.cpp` by mamekit.

![marquee](/artwork/media/marquees/bombjack.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/bombjack.webp) | ![cabinet](/artwork/media/cabinets/bombjack.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 4.000 MHz | 19 |
| `audiocpu` | Z80 | 3.000 MHz | 3 |

- **Sound:** ay8910 × 3 @ 1.500 MHz
- **Screen:** 256×224 @ 59.19 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `09_j01b.bin` | 0x0 | 0x2000 | `c668dc30` |
| `maincpu` | `10_l01b.bin` | 0x2000 | 0x2000 | `52a1e5fb` |
| `maincpu` | `11_m01b.bin` | 0x4000 | 0x2000 | `b68a062a` |
| `maincpu` | `12_n01b.bin` | 0x6000 | 0x2000 | `1d3ecee5` |
| `maincpu` | `13.1r` | 0xc000 | 0x2000 | `70e0244d` |
| `audiocpu` | `01_h03t.3h` | 0x0 | 0x2000 | `8407917d` |
| `fgtiles` | `03_e08t.bin` | 0x0 | 0x1000 | `9f0470d5` |
| `fgtiles` | `04_h08t.bin` | 0x1000 | 0x1000 | `81ec12e6` |
| `fgtiles` | `05_k08t.bin` | 0x2000 | 0x1000 | `e87ec8b1` |
| `bgtiles` | `06_l08t.bin` | 0x0 | 0x2000 | `51eebd89` |
| `bgtiles` | `07_n08t.bin` | 0x2000 | 0x2000 | `9dd98e9d` |
| `bgtiles` | `08_r08t.bin` | 0x4000 | 0x2000 | `3155ee7d` |
| `sprites` | `16_m07b.bin` | 0x0 | 0x2000 | `94694097` |
| `sprites` | `15_l07b.bin` | 0x2000 | 0x2000 | `013f58f2` |
| `sprites` | `14_j07b.bin` | 0x4000 | 0x2000 | `101c858d` |
| `bgmaps` | `02_p04t.bin` | 0x0 | 0x1000 | `398d4a02` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `P1` | 0x1 |
| Left | joystick left | `P1` | 0x2 |
| Up | joystick up | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x8 |
| Space / X | button1 | `P1` | 0x10 |
| 5 | coin1 | `SYSTEM` | 0x1 |
| 6 | coin2 | `SYSTEM` | 0x2 |
| 1 | start1 | `SYSTEM` | 0x4 |
| 2 | start2 | `SYSTEM` | 0x8 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin A | `SW1` | 0x3 | 0x0 |
| Coin B | `SW1` | 0xc | 0x0 |
| Lives | `SW1` | 0x30 | 0x0 |
| Cabinet | `SW1` | 0x40 | 0x40 |
| Demo Sounds | `SW1` | 0x80 | 0x80 |
| Bonus Life (Unused) | `SW2` | 0x7 | 0x0 |
| Bird Speed | `SW2` | 0x18 | 0x10 |
| Enemies Number & Speed | `SW2` | 0x60 | 0x40 |
| Special Coin | `SW2` | 0x80 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/tecmo/bombjack.cpp`
- **Written by:** Mirko Buffoni
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Mirko Buffoni (driver header); jackson2k2 (1 release note); Phil Bennett (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 120 commits by 26 commit authors, 2007–2024 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 42 years ago:

Bomb Jack (c) 1984 Tehkan.

Bomb Jack is a fast-moving platform game in which the aim is to collect all of the bombs on each level before progressing to the next. A variety of constantly spawning mechanical enemies patrol the platforms and airspace so the longer a player takes to collect all of the bombs, the more difficult progress becomes. 

Extra point bonuses are awarded for collecting bombs with their fuses lit. Only one bomb at any time has a lit fuse, and collecting twenty or more of these lit bombs on any given level will earn the player points bonus (see TIPS AND TRICKS for details). Jack is pursued around each level by the spawning enemies and when he gets killed, he drops down to the nearest platform, always landing on his head. 

A 'Powerball' appears at semi-regular intervals and moves diagonally around the screen. If the player manages to grab this, all of the level's monsters are frozen for several seconds and can then be killed by having Jack fly into them (similar to the 'Powerpill' feature in "Pac-Man"). Collecting the Bonus 'B' symbols will increase the amount of points awarded for collecting bombs with their fuses lit. Picking up an 'Extra' symbol awards the player with an additional life, while catching the 'Special' symbol will give the player an extra credit. 

Each of Bomb Jack's levels feature one of five different background pictures, some of which represent famous historical landmarks. They are: the Sphinx in Egypt, the Acropolis in Greece, Castle Neuschwanstein in Bavaria, skyscrapers and a cityscape by night. While the backgrounds themselves are repeated as the game progresses, the platform layouts for each level are completely different. At least until level 18, after which the levels are repeated. 

The basic play mechanic of collecting objects to clear a level, as well as the powerball feature, is hugely reminiscent of Namco's seminal "Pac-Man".

### Technical
Main CPU : Zilog Z80 (@ 4 Mhz)
Sound CPU : Zilog Z80 (@ 3.072 Mhz)
Sound Chips : (3x) General Instrument AY8910 (@ 1.5 Mhz)

Control : 8-way joystick
Buttons : 1 (JUMP)

### Trivia
Bomb Jack was released in March 1984 in Japan and in October 1984 in the USA.

The original idea for Bomb Jack was conceived by Michitaka Tsuruta, lead designer for Guzzler and Solomon's Key, under the supervision of Kazutoshi Ueda, the genius behind Mr. Do, Lady Bug and other Universal coin-ops.

Curiously enough, the infamous Sphinx in the opening round was not rendered by the graphic designer of the game, but by Tsukasa Masuko, the sound designer. Tsuruta-san recalls how roles in Japanese development teams were quite interchangeable, in those early years.

Round 1 music is the ending song from the Japanese animated cartoon series 'Spoon Oba-san', sung by the ultra-popular Mari Ijima (Lynn Minmay's voice in Macross). The anime was aired in 1983... at that time, Bomb Jack development was just starting : something more than a coincidence, then.
Round 2 features the music of 'Lady Madonna', by The Beatles. Tsuruta-san,  recalls that rights were paid for the licensed music at the time; still, later ports (PS2 and Xbox) come with a replaced soundtrack (mostly the Vs. Mighty Bomb Jack score).

"Bomb Jack II" has nothing really to do with Tekhan or Tecmo : it was developed by British Elite Systems for European home computers only, in an attempt to follow the huge success of the Bomb Jack coin-op conversion. They basically bought the license for the name, and then proceeded to create a mediocre maze game.

Giauco Bondavalli holds the official record for this game with 20,010,960 points on November 3, 1984.

Alfa Records released a limited-edition soundtrack album for this game (Tecmo Game Music - 28XA-95) on 25/09/1986.

### Updates
The older version (set 2) says 'YOU ARE LUCY' instead of 'YOU ARE LUCKY'.

### Scoring
Jumping, hitting a wall or falling from a platform : 10 points x bonus multiplier value.
Normal bomb : 100 points x bonus multiplier value.
Firebomb : 200 points x bonus multiplier value.

(P) Power : 100 when blue, 200 when red, 300 when purple, 500 when green, 800 when cyan, 1,200 when yellow and 2,000 points when grey x bonus multiplier value.

(B) Bonus Multiplier: 1,000 points x bonus multiplier value.
(E) Extra Life : 1,000 points x bonus multiplier value plus an extra life.
(S) Special : 1,000 points x bonus multiplier value plus a free credit.

Killing monsters while (P) is active : 100, 200, 300, 500, 800, 1,200 and 2,000 points. These are all multiplied by the current bonus multiplier value.

End of level bonus :
23 firebombs defused : 50,000 points.
22 firebombs : 30,000 points.
21 firebombs : 20,000 points.
20 firebombs : 10,000 points.

### Tips and tricks
* A little information about the appearance of the powerball : the rule is very simple and you just have to look at the colour at the left and right of the multiplicator number, its size grows as you collect bombs.

1) Take a 'lit bomb' and you get 1 point ahead for the next Powerball. Take a non-lit bomb and you'll get 0.5 point for the next Powerball. When you achieve 10 points, the powerball appears. Your powerball points don't grow if either the powerball is there or if the 'power music' is playing, so avoid collecting bombs when it's not necessary.

2) The powerball can have different score values when taking it. When it appears, jump or hit a wall and its colour will change. The colours and score values are blue (100 points), red (200 points), purple (300 points), green (500 points), turquoize (800 points), yellow (1000 points) and grey (2000 points).

3) The 'B' bonus coin adds 1 to the multiplicator value and appears each 5,000 points, but only if you 'pass' these 5,000 points when not taking a 'B' coin. For example, your multiplicator is 2x, your score is 9,000 and you take a 'B' coin; giving you 1,000x2 = 2,000 points which makes a total of 11,000 points. A 'B' coin should then appear because you have passed the 10,000 points, but doesn't because you took a 'B' coin to achieve this score so you'll have to wait for 15,000 points to get a new 'B' coin. The multiplicator limit is X5.

* An important piece of information to remember is that you can pick up the bombs in a certain order to earn maximum points. If you pick up most of the bombs while their fuses are lit, you get the following bonuses :
20 - 10,000 pts.
21 - 20,000 pts.
22 - 30,000 pts.
23 - 50,000 pts.
So of course, you'll want to try to get 23 each time (This is of course, VERY difficult!). The P (Power) coin appears after every ninth bomb is collected. The points value of the P coin ranges from 100 (Blue) to 2,000 (Silver). Since the color changes each time BJ jumps, you can control the bonus level by making small jumps until the coin turns silver.

* The B (Bonus) coin appears every 5,000 points, and advances the bonus multiplier by 1. There is a maximum of 5 B coins per level.

* Picking up the S (Special) coin awards one free credit. It will also take you to the next level automatically.

* You can control where the mechanical bird appears by holding the joystick in the opposite direction. Example : Hold the joystick to the Right as soon as the round starts and the mechanical bird appears on the left of the screen. If the stick is held diagonally, the bird appears in the opposite corner.

* When you start a level, and directly go to left or right, bird(s) will appear on the other side : it's useful to put them where you want in order to make this level easier, levels 7, 8 & 9 are good examples for that.

### Staff
Director : Michitaka Tsuruta
Programmer : Michishito Ishizuka
Music & Sound Design : Tsukasa Masuko
Graphic & Character Design : Rie Ishizuka (aka Rie Yatomi)
Producer : Kazutoshi Ueda

### Ports
* CONSOLES:
[JP] Sega SG-1000 (1985) "Bomb Jack [Model C-61]" 
[CN] Sega SG-1000 (198?) "Chaoren"
[EU] Nintendo Game Boy (1992)
Nintendo Game Boy Advance (2002) "Bomb Jack World" [Prototype]
[JP] Sony PS2 (nov.25, 2004) "Tecmo Hit Parade [Model SLPS-20401]" 
[US] Microsoft XBOX (sept.14, 2005) "Tecmo Classic Arcade" 
[EU] Microsoft XBOX (oct.21, 2005) "Tecmo Classic Arcade" 
[JP] Microsoft XBOX (oct.27, 2005) "Tecmo Classic Arcade [Model C6E-0001]" 
[JP] Sony PS4 [PSN] (june.19, 2014) "Arcade Archives - Bomb Jack [Model CUSA-00651]" 
Sony PlayStation 4 [PSN] [US] (aug.18, 2015) "Arcade Archives - Bomb Jack [Model CUSA-00975]" 

* COMPUTERS:
[JP] NEC PC8801 (1985)
[US] Commodore 16 (1986)
[EU] Commodore 16 (1986)
[US] Commodore C64 [EU] (1986)
[EU] Sinclair ZX Spectrum (1986)
[EU] Amstrad CPC (1986)
[EU] Atari ST (1986)
[EU] Commodore Amiga (1988)
[EU] Amstrad CPC (1989) "12 Top Amstrad Hits" 
[JP] PC Windows 95 (1997)

* OTHERS:
[US] Mobile Phone [Nokia 3410] (2002)

### Series
1. Bomb Jack (1984, Arcade)
2. Bomb Jack II (1986, C64)
3. Mighty Bomb Jack [Model TCF-MB] (1986, Famicom)
4. Bomb Jack Twin (1993, Arcade)

### Contribute
Edit this entry: https://www.arcade-history.com/game/306/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `bombjack`. Play it at [../../../app/g/bombjack/](../../../app/g/bombjack/) or [explore the knowledge graph](viewer.html).*
