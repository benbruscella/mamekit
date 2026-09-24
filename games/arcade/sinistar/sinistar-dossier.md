# Sinistar (revision 3, upright)

**Williams · 1982** — transpiled from the MAME driver `src/mame/williams/williams.cpp` by mamekit.

![marquee](/artwork/media/marquees/sinistar.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/sinistar.webp) | ![cabinet](/artwork/media/cabinets/sinistar.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | MC6809E | 1.000 MHz | 15 |
| `soundcpu` | M6808 | 3.580 MHz | 4 |

- **Sound:** dac × 1 @ 3.580 MHz
- **Screen:** 292×240 @ 60.10 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `sinistar_rom_1-b_16-3004-53.1d` | 0x0 | 0x1000 | `f6f3a22c` |
| `maincpu` | `sinistar_rom_2-b_16-3004-54.1c` | 0x1000 | 0x1000 | `cab3185c` |
| `maincpu` | `sinistar_rom_3-b_16-3004-55.1a` | 0x2000 | 0x1000 | `1ce1b3cc` |
| `maincpu` | `sinistar_rom_4-b_16-3004-56.2d` | 0x3000 | 0x1000 | `6da632ba` |
| `maincpu` | `sinistar_rom_5-b_16-3004-57.2c` | 0x4000 | 0x1000 | `b662e8fc` |
| `maincpu` | `sinistar_rom_6-b_16-3004-58.2a` | 0x5000 | 0x1000 | `2306183d` |
| `maincpu` | `sinistar_rom_7-b_16-3004-59.3d` | 0x6000 | 0x1000 | `e5dd918e` |
| `maincpu` | `sinistar_rom_8-b_16-3004-60.3c` | 0x7000 | 0x1000 | `4785a787` |
| `maincpu` | `sinistar_rom_9-b_16-3004-61.3a` | 0x8000 | 0x1000 | `50cb63ad` |
| `maincpu` | `sinistar_rom_10-b_16-3004-62.4c` | 0xe000 | 0x1000 | `3d670417` |
| `maincpu` | `sinistar_rom_11-b_16-3004-63.4a` | 0xf000 | 0x1000 | `3162bc50` |
| `soundcpu` | `3004_speech_ic7_r1_16-3004-52.ic7` | 0xb000 | 0x1000 | `e1019568` |
| `soundcpu` | `3004_speech_ic5_r1_16-3004-50.ic5` | 0xc000 | 0x1000 | `cf3b5ffd` |
| `soundcpu` | `3004_speech_ic6_r1_16-3004-51.ic6` | 0xd000 | 0x1000 | `ff8d2645` |
| `soundcpu` | `3004_speech_ic4_r1_16-3004-49.ic4` | 0xe000 | 0x1000 | `4b56a626` |
| `soundcpu` | `video_sound_rom_9_std.808.ic12` | 0xf000 | 0x1000 | `b82f4ddb` |
| `proms` | `decoder_rom_4.3g` | 0x0 | 0x200 | `e6631c23` |
| `proms` | `decoder_rom_6.3c` | 0x200 | 0x200 | `83faf25e` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Space / X | button1 | `IN1` | 0x1 |
| Z | button2 | `IN1` | 0x2 |
| 1 | start1 | `IN1` | 0x10 |
| 2 | start2 | `IN1` | 0x20 |
| 9 | auto up / manual down | `IN2` | 0x1 |
| F2 | advance | `IN2` | 0x2 |
| F3 | high score reset | `IN2` | 0x8 |
| 5 | coin1 | `IN2` | 0x10 |
| 6 | coin2 | `IN2` | 0x20 |
| Left | ad stick x left | `49WAYX` | 0xff |
| Right | ad stick x right | `49WAYX` | 0xff |
| Up | ad stick y up | `49WAYY` | 0xff |
| Down | ad stick y down | `49WAYY` | 0xff |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/williams/williams.cpp`
- **Written by:** Aaron Giles
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Aaron Giles (driver header); ClawGrip (3 release notes); MajorHavocOnKLOV (2 release notes); Recreativas.org (2 release notes); Asociación Retroclub (1 release note); cam900 (1 release note); hap (1 release note); Ivan Vangelista (1 release note); Juan Romero (1 release note); M.A.S.H. (1 release note); O. Galibert (1 release note); SynaMax (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 291 commits by 42 commit authors, 2007–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 44 years ago:

Sinistar (c) 1982 Williams.

Your intergalactic crystal-mining mission takes you to the antipodes of the known universe. But your parametric DeepSpace scanner faithfully displays the sector of the galaxy you presently occupy (including an area fully three parsecs across, no less)! 

Keep the galaxy safe for all its sinizens! Fiendish Worker ships from the planet Sporg will attempt to fabricate a Sinistar from the remains of derelict planetoids in your very sector. You must not let them do this for two reasons : 
1) These planetoids contain the life-sustaining crystals that your civilization requires for its vital technologies. 
2) With the eminently unstable Sinistar in their possession, the Sprogites can lay waste to any civilization in your sector. You alone stand in their way. 

You must mine the sinisite crystals. Williams has equipped you with the latest heuristic electret cannon technology. All you need to do is aim at a planetoid and shoot. Now collect your motherlode! 

In fact, only with sinisite can you manufacture sinibombs to eradicate the Sinistar. But you must also rebuff the Workers and disintegrate their even more aggressive comrades-at-arms, the evil skelomorphic Warriors! Intelligent beings everywhere depend on your courage, your dedication, your reserve, your shrewd command of tactical invention! It's up to you, space cadet!

### Technical
[Upright model]

Main CPU : Motorola M6809 (@ 1 Mhz) 
Sound CPU : M6808 (@ 894.75 Khz) 
Sound Chips : DAC, HC55516 (@ 894.75 Khz) 

Players : 2 
Control : 8-way joystick 
Buttons : 2 
= > [1] FIRE, [2] SINIBOMB

### Trivia
Sinistar was released in January 1983 in the USA, even if the copyright year is 1982.

Also released as :
"Sinistar [Cockpit model]"
"Sinistar [DuraMold model]"

This game was originally going to be called "Juggernaut", then "Darkstar". The prototype version called Sinistar is a machine that was displayed at the November 1982 AMOA show in Las Vegas. The revision 2 was the most common version of the game. 

The game is jokingly referred to as 'Opie-Star' at Williams' offices, because Sinistar's 'Run, Coward!' taunt sounded like he's saying 'Ron Howard' (acclaimed actor and director best known for his roles as Opie Taylor on 'The Andy Griffith Show', and as Richie Cunningham on 'Happy Days'). 

Sinistar's phrases : 
'Beware I live' 
'I hunger' 
'I hunger coward' 
'Beware coward' 
'Run coward' 
'Run run run' 
'I am Sinistar' 

A Sinistar unit appears in the 1983 movie 'WarGames'. 

A Sinistar unit appears in the 1983 music video, 'Almost Over You' by Sheena Easton.

### Updates
REVISION 3:
* Latest revision.
* Some bugs fixed.

REVISION 2:
* Added 'Set Attract mode message' option in the game adjustments menu.
* The Survivors Today has the following initials (the initial are mostly those of the people who contributed programming, artwork, sound, playtesting or ideas (or a little of each)). Note : They keep the same order, but rotate position every time the machine is reset. :
N-F = Noah Falstein
KJF = Ken Fedesna
KAG = Ken Graham
FRG = ???
YAK = ???
JJK = John Kotlarik
KFL = Ken Lantz
PJM = Pam McMahon
DOC = ???
JLM = John Meissen
E-Z = Mike Metz
=M= = ???
TIM = Tim Murphy
JRN = John Newcommer
TOM = ???
PFZ = Bill Pfutzenreuter
RTP = ???
BFD = Dave Rzepka
MBS = ???
MRS = Mike Stroll
EJS = ???
STU = ???
WIT = Rich Witt
MOM = ???
FAC = ???
GOD = ???
KAY = ???
HEC = ???
SAM = Sam Dicker
KYD = ???

PROTOTYPE (AMOA):
* The Sinistar logo in the attract mode uses a Rocky-Horror-esque 'dripping blood' font.
* The letter 'T' shows up behind the 'dripping blood' logo, possibly part of the trademark?.
* The Sinistar death sequence sometimes occurs offscreen.
* There seem to be more crystals per planetoid than in the release revision.
* Missing the 'set attract mode message' option in the game adjustments screen.
* High score entry uses fire to advance to the next character, rather than the joystick.
* Warping to the next level can occur in any direction, not just upper-right.
* Sinistar's 'roar' occurs multiple times in rapid succession, cutting off each time he is hit by a sinibomb.
* When a player's ship is destroyed by the Sinistar, it explodes rather than spinning out first.
* After defeating Sinistar, his face outline doesn't appear in the center of the screen.
* You can set the extra ship points AND extra ship point factors to ZERO. As soon as you get a point, the game program gets caught in an infinite loop. You'll also hear an EXTENDED extra ship noise. You can break the loop by hitting advance and looking at ALL the extra ships you just received.
* Stuff (like the Sini-bombs, warriors and even the Sinistar himself (if it has a gender)) doesn't travel well from scanner to playfield and these objects can make quick second passes and sometimes even just skip the playfield all together.
* Survivors Today Has the following initials when tables are cleared : YYY XYS MAA AAA AAA AAA BDG MAA AAA AAA ABC EJS MAA AAA AAA RED HPG MAA AAA AAB CFL XYS MAA AAA AAB DGN DBG MAA AAA BCE.
* Scores start at 19,045 and are listed with the following algorithm (-265, -365, -265, repeat).

### Scoring
Planetoid: 5 points. 
Worker: 150 points. 
Crystal: 200 points. 
Warrior: 500 points. 
Sinistar Piece: 500 points. 
Destroying Sinistar: 15,000 points.

### Tips and tricks
* Programming Credits And Williams message:
1) Set lives to 1 (this is optional, it merely saves time).
2) Insert one credit.
3) Bump into a Planetoid (rock).
4) Push the fire button seven times.
5) Avoid Planetoids and Workers, don't fire at anything and get shot by a Warrior. If you set lives to 1, the game will now be over. If not, lose all lives in this manner until the game ends.
6) Enter initials.
7) Press the 2-Player button 3 times, then insert one coin and start a new 1-Player game.
8) Don't move or fire, just push the Sinibomb button once.

There are now two messages which can be displayed for the credits:
9) Insert three coins, then push the Sinibomb button again. The 'crossword' credits should now be displayed.

* For the Williams Electronics message :
10) Simply end the game by getting shot without hitting a Planetoid or firing, then push the 1-Player button to display the message. 

* 255 Lives Trick : This little trick is harder than the game itself, but worth it if you pull it off. On your last man, make sure a warrior fires at you just as Sinistar sucks you in. As the Sinistar sucks you in, you will lose your last man, but when the warrior's bullet hits you, you will have one less than zero ships.
Note: The warriors stop shooting as soon as you are 'caught' by Sinistar. The game was programmed this way, to prevent you from dying twice. Since you are trying to die twice, you have to let a warrior shoot at you, before you get sucked in, then hope that the shot hits you after you have been sucked in. This is very tricky.
Note 2: 8-bit processors can only handle values from 0-255, for a total of 256 values. Therefore, 'one less than zero ships' will roll around to 255.

### Staff
Project leader & co-designer : Noah Falstein (N-F)
Lead programmer : Sam Dicker (SAM)
Programmers : Robert J. Mical, Richard A. Witt (WIT)
Original design & storyline : John Newcomer (JRN)
Artwork / graphics : Jack E. Haeger
Sound effects by : Michael Metz (E-Z)
Hardware designers : Rich Grande, Greg Wepner
Mechanical : Leo Ludzia, Gary Berge
Tech. support by : John Meissen (JLM)

### Ports
* CONSOLES: 
[US] Atari 2600 (1984) : was a prototype only. It was never released. 
[US] Sega Genesis (1996) "Williams Arcade's Greatest Hits" 
[EU] Sega Mega Drive (1996) "Arcade's Greatest Hits [Model T-97126-50]" 
[US] Sega Saturn (1996) "Arcade's Greatest Hits [Model T-9703H]" 
[US] Sony PlayStation (apr.10, 1996) "Williams Arcade's Greatest Hits [Model SLUS-00201]" 
[EU] Sony PlayStation (sept.1, 1996) "Williams Arcade's Greatest Hits [Model SLES-00323]" 
[US] Nintendo SNES (oct.1996) "Williams Arcade's Greatest Hits [Model SNS-AW8E-USA]" 
[EU] Nintendo SNES (jan.8, 1997) "Williams Arcade's Greatest Hits [Model SNSP-AW8P-EUR]" 
[US] Sega Dreamcast (june.27, 2000) "Midway's Greatest Arcade Hits Vol. 1 [Model T-9713N]" 
[EU] Sega Dreamcast (jul.28, 2000) "Midway's Greatest Arcade Hits Vol. 1 [Model T-9710D-50]" 
[US] Nintendo 64 (nov.14, 2000) "Midway's Greatest Arcade Hits Vol. 1 [Model NUS-NAIE-USA]" 
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
[US] Nintendo GBA (nov.22, 2001) "Midway's Greatest Arcade Hits [Model AGB-AM3E-USA]" 
[EU] Nintendo GBA (nov.30, 2001) "Midway's Greatest Arcade Hits [Model AGB-AM3P-EUR]" 
[US] Sony PSP (dec.13, 2005) "Midway Arcade Treasures Extended Play [Model ULUS-10059]" 
[EU] Sony PSP (feb.24, 2006) "Midway Arcade Treasures Extended Play [Model ULES-00180]" 

* COMPUTERS: 
Tandy Color Computer 3 (1989) "Sinistaar" 
[US] PC [MS Windows 3.1/DOS, CD-ROM] (1995) "Williams Arcade Classics" 
[US] PC [MS Windows 95/DOS, CD-ROM] (1996) "Williams Arcade Classics" 
[US] PC [MS Windows, CD-ROM] (aug.27, 2004) "Midway Arcade Treasures" 
[EU] PC [MS Windows, CD-ROM] (nov.23, 2004) "Midway Arcade Treasures" 

* OTHERS: 
[US] Palm OS (aug.2001) "Midway Arcade Classic" 
[US] Tiger Game.com (1997) "Williams Arcade Classics [Model 71-722]"

### Contribute
Edit this entry: https://www.arcade-history.com/game/2447/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `williams`. Play it at [../../../app/g/sinistar/](../../../app/g/sinistar/) or [explore the knowledge graph](viewer.html).*
