# Mortal Kombat (rev 5.0 T-Unit 03/19/93)

**Midway · 1992** — transpiled from the MAME driver `src/mame/williams/midtunit.cpp` by mamekit.

![marquee](/artwork/media/marquees/mk.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/mk.webp) | ![cabinet](/artwork/media/cabinets/mk.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | TMS34010 | 50.000 MHz | 21 |
| `adpcm:cpu` | MC6809E | 2.000 MHz | 11 |

- **Sound:** ym2151 × 1 @ 3.580 MHz
- **Screen:** 400×254 @ 54.71 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `adpcm:cpu` | `sl1_mortal_kombat_u3_sound_rom.u3` | 0x10000 | 0x40000 | `c615844c` |
| `adpcm:oki` | `sl1_mortal_kombat_u12_sound_rom.u12` | 0x0 | 0x40000 | `258bd7f9` |
| `adpcm:oki` | `sl1_mortal_kombat_u13_sound_rom.u13` | 0x80000 | 0x40000 | `7b7ec3b6` |
| `maincpu` | `l5_mortal_kombat_t-unit_uj12_game_rom.uj12` | 0x0 | 0x80000 | `f4990bf2` |
| `maincpu` | `l5_mortal_kombat_t-unit_ug12_game_rom.ug12` | 0x1 | 0x80000 | `b06aeac1` |
| `video` | `l1_mortal_kombat_t-unit_ug14_game_rom.ug14` | 0x0 | 0x80000 | `9e00834e` |
| `video` | `l1_mortal_kombat_t-unit_uj14_game_rom.uj14` | 0x1 | 0x80000 | `f4b0aaa7` |
| `video` | `l1_mortal_kombat_t-unit_ug19_game_rom.ug19` | 0x2 | 0x80000 | `2d8c7ba1` |
| `video` | `l1_mortal_kombat_t-unit_uj19_game_rom.uj19` | 0x3 | 0x80000 | `33b9b7a4` |
| `video` | `l1_mortal_kombat_t-unit_ug16_game_rom.ug16` | 0x200000 | 0x80000 | `52c9d1e5` |
| `video` | `l1_mortal_kombat_t-unit_uj16_game_rom.uj16` | 0x200001 | 0x80000 | `c94c58cf` |
| `video` | `l1_mortal_kombat_t-unit_ug20_game_rom.ug20` | 0x200002 | 0x80000 | `2f7e55d3` |
| `video` | `l1_mortal_kombat_t-unit_uj20_game_rom.uj20` | 0x200003 | 0x80000 | `eae96df0` |
| `video` | `l1_mortal_kombat_t-unit_ug17_game_rom.ug17` | 0x400000 | 0x80000 | `e34fe253` |
| `video` | `l1_mortal_kombat_t-unit_uj17_game_rom.uj17` | 0x400001 | 0x80000 | `a56e12f5` |
| `video` | `l1_mortal_kombat_t-unit_ug22_game_rom.ug22` | 0x400002 | 0x80000 | `b537bb4e` |
| `video` | `l1_mortal_kombat_t-unit_uj22_game_rom.uj22` | 0x400003 | 0x80000 | `5e12523b` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Down | joystick down | `IN0` | 0x2 |
| Left | joystick left | `IN0` | 0x4 |
| Right | joystick right | `IN0` | 0x8 |
| Space / X | p1 high punch | `IN0` | 0x10 |
| Z | p1 block | `IN0` | 0x20 |
| C | p1 high kick | `IN0` | 0x40 |
| 5 | coin1 | `IN1` | 0x1 |
| 6 | coin2 | `IN1` | 0x2 |
| 1 | start1 | `IN1` | 0x4 |
| 2 | start2 | `IN1` | 0x20 |
| 9 | service1 | `IN1` | 0x40 |
| A | p1 low punch | `IN1` | 0x1000 |
| S | p1 low kick | `IN1` | 0x2000 |
| D | p1 block 2 | `IN1` | 0x8000 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN1` | 0x10 | 0x10 |
| Test Switch | `DSW` | 0x1 | 0x1 |
| Counters | `DSW` | 0x2 | 0x0 |
| Coinage | `DSW` | 0x7c | 0x7c |
| Coinage Source | `DSW` | 0x80 | 0x0 |
| Skip Post Test | `DSW` | 0x100 | 0x0 |
| Unused | `DSW` | 0x200 | 0x200 |
| Unused | `DSW` | 0x400 | 0x400 |
| Comic Book Offer | `DSW` | 0x800 | 0x800 |
| Attract Sound | `DSW` | 0x1000 | 0x1000 |
| Low Blows | `DSW` | 0x2000 | 0x2000 |
| Blood | `DSW` | 0x4000 | 0x4000 |
| Violence | `DSW` | 0x8000 | 0x8000 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/williams/midtunit.cpp`
- **Written by:** Alex Pasadyn, Zsolt Vasvari, Ernesto Corvi, Aaron Giles
- **License:** BSD-3-Clause
- **Credited by MAMEDEV:** Aaron Giles (driver header); Alex Pasadyn (driver header); Ernesto Corvi (driver header); Zsolt Vasvari (driver header); hap (3 release notes); cuavas (2 release notes); cam900 (1 release note); Phil Bennett (1 release note)
- **Credit source:** MAME driver header (copyright-holders) and MAMEDEV release notes, release notes 0.100–0.289
- **Commit activity:** 131 commits by 30 commit authors, 2007–2026 (git log --follow over the driver file at MAME f34f02505e32; not a statement of authorship)

## The story

Arcade Video game published 34 years ago:

Mortal Kombat (c) 1992 Midway.

Mortal Kombat, first in the Mortal Kombat series, is a 1-on-1 fighting game featuring a cast of seven different characters. Mortal Kombat took ideas from Capcom's seminal Street Fighter II, such as the game's special moves and projectiles. It also introduced a cast of photo-realistic digitized fighters for players to fight either as or against. 

Mortal Kombat characters list:
JOHNNY CAGE
KANO
RAIDEN
LIU KANG
SCORPION
SUB-ZERO
SONYA BLADE

Battles are fought over the best of three rounds. At the end of a battle, a voice instructs the winner to 'Finish Him/Her!' and players have only a couple of seconds to try and execute their character's 'fatality', which sees the winner killing the loser in a spectacular and grisly fashion.

### Technical
Mortal Kombat arcade runs on the Midway Y Unit hardware.

Main CPU: TMS34010
Sound CPU: Motorola M6809
Sound Chips: Yamaha YM2151, DAC, OKI6295

Players: 2
Control: 8-way joystick
Buttons: 5
=> [1] High Punch, [2] Block, [3] High Kick
=> [4] Low Punch, [5] Low Kick

### Trivia
Mortal Kombat was released on October 8th, 1992 in the USA. It was renowned as the first fighting game to use digitized characters and blood (as opposed to the hand-animated, more cartoon-like graphics of competing games). Mortal Kombat was developed as a reaction to the popular Capcom game "Street Fighter II - The World Warrior", with simpler controls and digitized graphics. Some say the game's graphic violence was gratuitous, and was only included in order to generate a public outcry and controversy that would increase publicity for the game. 

Although highly controversial, the mix of realism and violence propelled Mortal Kombat to the height of popularity. An example of the game's innovations was the Fatality, a special finishing move executed against a dying opponent to create an even more gruesome death. For example, one character would grasp a defeated, wobbling opponent by the head, then rip the head and spine out of the opponent's body, which then crumpled to the ground in a pool of blood. Another aspect of gameplay that became a recurring element in games that followed was the so-called 'juggle', where a series of moves could be executed against an opponent who was kept in mid-air by the force of the attacks, and who hence had no defense against further attacks as long as the 'juggle' could be maintained. 

The original concept of Mortal Kombat was modeled after the Jean-Claude Van Damme movie 'Bloodsport', which is a cult classic martial arts film. The character of Johnny Cage is directly modeled after Frank Dux, Van Damme's character in the movie. Johnny Cage's film-star motif is an obvious link to this. Cage also wears the same costume (plus shoes) that Van Damme's character wore in the final battle of the movie. Cage's splits punch was originally seen in Bloodsport during the fight against the Sumo wrestler. Since Midway was unable to get Van Damme for this game, they kept the same kumite/martial arts movie concept and added the Kombat story. 

Mortal Kombat arcade was the first video game to have an official release date countdown in U.S./U.K. and Australia. This momentous day was known as 'Mortal Monday'. 

The code for this game includes the ASCII string 'NOOBSAIBOT' (originally in "Mortal Kombat II" rev. 3.1), suggesting that the character may have made his first appearance here, instead of Reptile (which took up less memory). 

The heads used in the background of the Courtyard and Pit stages are actually those of the programmers themselves! The statue of Buddha in the background of the Courtyard stage was actually a lawn ornament from a neighbor's yard. 

While fighting on the Pit stage, if you look closely at the glowing moon in the background, you will sometimes see a silhouette fly past it. These shadows will either be Peter Pan and the Darling children, a witch on a broomstick, a kite, a blimp, a rocket, a flying saucer, or Santa Claus in his reindeer-pulled sleigh. The shadows appear about every 6 games. 

Liu Kang is Midway's homage to Bruce Lee. 

Raiden really is the Japanese God of Thunder. His appearance in myth is quite different though : he has red skin and a demonic face, his feet have two claws on them, and he carries either a wheel or drums on his back. He also is thought to eat human navels so people are advised to lie on their stomachs during storms. 

Kano make an appearance on the 2012 animation movie 'Wreck-It Ralph' from Walt Disney Animation Studios.

In the Palace Gates stage, above the red door on the right side, you can see Pac-Man, a ghost and a power pellet carved on the stone. 

A hacked version also exists - every stage had a black/night sky and every time you got frozen by Sub-Zero, your fighter would rise up and stay there 'till you either got hit or the freezing effect went away. The same thing would happen if you were using Sub-Zero and froze your opponent. The machine would boot up just like a regular MK machine boots up, except another black screen with red letters and asterisks labeling it as "Mortal Kombat Black Ninja Edition" was displayed before the title screen. 

A Mortal Kombat unit appears in the 1995 movie 'The Doom Generation'. 

Midway released a limited-edition soundtrack album for this game (Mortal Kombat II: Music from the Arcade Game Soundtrack - 123770-C1) on December 1, 1993. 

Michael Jackson used to own this game. It was sold at the official Michael Jackson Auction on April 24, 2009.

The Premium Pack and Kollector's editions of "Mortal Kombat - Deception" for the Sony PlayStation 2 and Microsoft XBOX, respectively, both released on October 4, 2004 in North America, contain a bonus disc containing an arcade-perfect version of the original game.

### Updates
PROTO 4.0 (July 14, 1992): 
* Prototype version.
* You cannot play as the same character.
* Menu won't allow cursors to pass each other in 2-player selection.
* Sub-Zero has new corner infinite (ex. uppercut, freeze and repeat)
* Sub-Zero has faster recovery after slide and can go straight into sweep for most instances
* Sub-Zero can freeze opponent in air for 'Finish Him/Her' as he's falling from uppercut, and do fatality in air and body will fall to ground frozen
* Liu Kang can do Flying Kick when you do a HK first in air than F, F HK
* Raiden can now do Torpedo after doing a jumping kick for more combo possibilities 

PROTO 8.0 (July 21, 1992): 
* Prototype version.

PROTO 9.0 (July 28, 1992): 
* Prototype version.

REV. 1.0 (August 9, 1992): 
* First official release of Mortal Kombat.
* In a 2-player game, both players could not choose the same character.
* Liu Kang had Uppercut - Flying Kick Combo.

REV. 2.0 (August 9, 1992): 
* Both players could choose the same character.
* New Shang Tsung death animation added.
* Merchandise promo added.
* More blood added.

REV. 3.0 (August 31, 1992): 
* Computer intelligence increased.
* Reptile added.
* Comic book offer is a switch setting.

REV. 4.0 (September 28, 1992): 
* Reptile clues added (shadows on moon, see Tips and Tricks section).
* Sonya and Kano could fight Reptile.
* Block allowed during fatality.
* Goro's theme played during all Endurance rounds.

REV. 4.0 [T-Unit] (February 11, 1993): 
* Runs on the newer Midway T Unit hardware, the same hardware as Mortal Kombat II

REV. 5.0 [T-Unit] (March 19, 1993): 
* Bug fix release.

### Scoring
* Basic Move
High Punch: 500 points 
Low Punch: 500 points 
High Kick: 2,000 points 
Low Kick: 2,000 points 
Backhand: 2,000 points 
Throw: 5,000 points 
Knee: 5,000 points 
Jump Punch: 1,000 points 
Jump Kick: 2,000 points 
Uppercut: 2,000 points 
Crouch Kick: 500 points 
Sweep: 1,000 points 
Roundhouse: 2,000 points 

* Special Moves:
JOHNNY CAGE:
Green Ball: 2,000 points 
Shadow Kick: 5,000 points 
Split Punch: 5,000 points 

KANO
Headbutt: 2,000 points 
Knife Throw: 2,000 points 
Kano Ball: 5,000 points 

RAIDEN
Lightening: 2,000 points 
Teleport: 0 points 
Torpedo: 5,000 points 

LIU KANG
Fireball: 2,000 points 
Flying Kick: 2,000 points 

SCORPION
Spear: 2,000 points 
Teleport Punch: 2,000 points 

SUB-ZERO
Freeze: 0 points 
Slide: 1,000 points 

SONYA BLADE
Sonic Ring: 2,000 points 
Teleport Punch: 2,000 points 
Leg Scissors: 2,000 points 

* Bonus Points
Breaking Wood: 100,000 points 
Breaking Stone: 200,000 points 
Breaking Steel: 500,000 points 
Breaking Ruby: 1,000,000 points 
Breaking Diamond: 2,000,000 points 
Time: Time left multiplied by 1,000 
Fatality: 100,000 points 
Flawless Victory: 200,000 points 
Double Flawless: 500,000 points 
Defeat Reptile: 10,000,000 points

### Tips and tricks
* Secret EJB MENU:
Press P1_BLOCK (5 times), P2_BLOCK (10 times), P1_BLOCK (2 times), P2_BLOCK (1 times), P1_BLOCK (2 times), P2_BLOCK (3 times), then P1_BLOCK (4 times).

* Basic Move (% of damage):
High Punch (5.5%) : Basic HP
Low Punch (5.5%) : Basic LP
High Kick (14.8%) : Basic HK
Low Kick (14.8%) : Basic LK
Backhand (11.7%) : HP when close
Throw (24.2%) : LP when close
Knee (14.8%) : HK or LK when close
Jump Punch (11.7%) : HP or LP while in air
Jump Kick (14.8%) : HK or LK while in air
Uppercut (24.2%) : Hold down HP or LP
Crouch Kick (11.7%) : Hold down HK or LK
Sweep (11.7%) : Hold back LK
Roundhouse (19.5%) : Hold back HK

* Special Moves (% of damage):
JOHNNY CAGE :
Green Ball (14.8%) : B, F, LP
Shadow Kick (18%) : B, F, LK
Split Punch (21.1%) : BLK+LP

KANO :
Headbutt (11.7%) : HP when close
Knife Throw (14.8%) : Hold BLK (B, F) or B, F+BLK
Kano Ball (18%) : F-D-B-U (Full circle away from opponent starting forward)

RAIDEN :
Lightning (14.8%) : D, F, LP
Teleport (0%) : D, U
Torpedo (18%) : B, B, F

LIU KANG :
Fireball (14.8%) : F, F, HP
Flying Kick (18%) : F, F, HK

SCORPION :
Spear (4.6%) : B, B, LP
Teleport Punch (18%) : D, B, HP

SUB-ZERO :
Freeze (0%) : D, F, LP
Slide (7%) : LP+BLK+LK

SONYA BLADE :
Sonic Ring (14.8%) : B, B, LP
Teleport Punch (16.4%) : F, B, HP
Leg Scissors (24.2%) : LP+BLK+LK

* Mortal Kombat Fatalities:
To perform a Fatality, you must win the match, then do the proper joystick/button sequence when 'Finish Him!' appears...
JOHNNY CAGE Fatality: (close) Forward(x3), HP - Cage decapitates his opponent with an uppercut.
KANO Fatality: (close) Back, Down, Forward, LP - Kano rips out his opponent's heart.
SUB-ZERO Fatality: (close) Forward, Down, Forward, HP - Sub-Zero grabs his opponent by the neck and pulls their head off, taking their spine along with the head.
SONYA BLADE Fatality: (anywhere) Forward(x2), Back(x2), Block - Sonya blows an energy ball in the air. The ball hits her opponent and engulfs them in flames, turning the opponent into a skeleton.
RAIDEN Fatality: (close) Forward, Back(x3), HP - Raiden shoots lightning into his opponent's head, causing it to explode.
LIU KANG Fatality: (close) hold Block, 270 degrees (Forward, Down, Back, Up) - Liu Kang does a spinning kick and an uppercut.
SCORPION Fatality: (jump distance) hold Block, Up(x2), release Block - Scorpion removes his mask to reveal a skull. He then breathes fire on his opponent, turning him into a skeleton.

* Bonus Points:
Test your might appears after every 3rd win in a 1P game. In a 2P game, it appears after every 5th Battle.
Breaking Wood: Break the WOOD tapping the punch and kick buttons till the meter fills up then block.
Breaking Stone: Break the STONE after breakin the WOOD.
Breaking Steel: Break the STEEL after breakin the STONE.
Breaking Ruby: Break the RUBY after breakin the STEEL.
Breaking Diamond: Break the DIAMOND after breakin the RUBY.
Fatality: Perform the characters finishing move.
Flawless Victory: Beat your opponent without getting hit.
Double Flawless: Beat your opponent without getting hit 2 rounds in a row.

* Defeat Reptile (Rev 3.0+ only): The shadows indicate that Reptile is available as an opponent. To fight him, win with a double flawless and fatality, without using block in the entire match.

### Staff
Design and software: Ed Boon
Design and graphics: John Tobias
Music and sounds: Dan Forden
Background graphics: John Vogel
Executive producers: Neil Nicastro, Ken Fedesna
Senior hardware technician: Sheridan Oursler
Cabinet designer: Ray Czajka

* CAST:
Johnny Cage, Scorpion, Sub-Zero and Reptile: Daniel Pesina
Kano: Richard Divizio
Raiden: Carlos Pesina
Liu Kang and Shang Tsung: Ho Sung Pak
Sonya: Elizabeth Malecki
Goro character design by: John Tobias
Stop Motion Miniature by: Curt Chiarelli

### Ports
* CONSOLES:
Sega Master System
[EU] (1993) "Mortal Kombat [Model MK-29021-50]"
[BR] (1993) "Mortal Kombat [Model 028240]"

Sega Mega Drive / Genesis
[EU] (1993) "Mortal Kombat [Model T-81186-50]"
[US] (sept.13, 1993) "Mortal Kombat [Model T-81186]"
[BR] (1994) "Mortal Kombat [Model 047030]"
[JP] (may.27, 1994) "Mortal Kombat - Shinken Kourin Densetsu [Model T-81014]"

Nintendo SFC / SNES
[US] (sept.13, 1993) "Mortal Kombat [Model SNS-KX-USA]"
[EU] (oct.28, 1993) "Mortal Kombat [Model SNSP-KX-NOE]"
[JP] (dec.24, 1993) "Mortal Kombat - Shinken Kourin Densetsu [Model SHVC-KX]"

Sega Mega-CD
[EU] (1994) "Mortal Kombat [Model T-81025-50]"
[US] (may.26, 1994) "Mortal Kombat [Model T-81025]"
[JP] (june.3, 1994) "Mortal Kombat Kanzen-han [Model T-81014]"

Sony PS3 [PSN]
[US] (aug.31, 2011) "Mortal Kombat Arcade Kollection"
[AU] (aug.31, 2011) "Mortal Kombat Arcade Kollection"
[EU] (aug.31, 2011) "Mortal Kombat Arcade Kollection"

* HANDHELDS: 
Sega Game Gear
[EU] (1993) "Mortal Kombat [Model T-81198-50]"
[US] (sept.13, 1993) "Mortal Kombat [Model T-81198]"
[JP] (dec.17, 1993) "Mortal Kombat - Shinken Kourin Densetsu [Model T-81017]"

Nintendo Game Boy
[US] (sept.13, 1993) "Mortal Kombat [Model DMG-C9-USA]" 
[JP] (dec.24, 1993) "Mortal Kombat - Shinken Kourin Densetsu [Model DMG-C9A]"
[EU] (1994) "Mortal Kombat [Model DMG-C9-NOE-1]"
[EU] (1997) "Mortal Kombat & Mortal Kombat II [Model DMG-AK2P-EUR]"
[US] (nov.1997) "Mortal Kombat & Mortal Kombat II [Model DMG-AK2E-USA]"
[JP] (sept.10, 1998) "Mortal Kombat I & II [Model DMG-AK2J-JPN]"

Sony PSP
[US] (dec.13, 2005) "Midway Arcade Treasures Extended Play [Model ULUS-10059]"
[EU] (feb.24, 2006) "Midway Arcade Treasures Extended Play [Model ULES-00180]"

* COMPUTERS: 
[EU] Commodore Amiga (1994)

PC
[US] [MS-DOS, 3.5"] (may.25, 1994) 
[US] [MS-DOS, CD-ROM] (sept.10, 1998) "Mortal Kombat I & Mortal Kombat II"
[US] [MS Windows, CD-ROM] (feb.17, 2006) "Midway Arcade Treasures Deluxe Edition"
[EU] [MS Windows, CD-ROM] (mar.17, 2006) "Midway Arcade Treasures Deluxe Edition"
[US] [MS Windows, Steam] (feb.2, 2012) "Mortal Kombat Arcade Kollection"

* OTHERS: 
[US] Mortal Kombat TV Game (2004) by Jakk's Pacific 
[US] Mobile Phones (sept.2004)

### Series
1. Mortal Kombat (1992, Arcade) 
2. Mortal Kombat II (1993, Arcade) 
3. Mortal Kombat 3 (1995, Arcade) 
4. Ultimate Mortal Kombat 3 (1995, Arcade) 
5. Ultimate Mortal Kombat 3 [WaveNet Edition] (1995, Arcade) 
6. Mortal Kombat Trilogy [Model SLUS-00330] (1996, PS) 
7. SUB-ZERO - Mortal Kombat Mythologies [Model SLUS-00476] (1997, PS) 
8. Mortal Kombat 4 (1997, Arcade) 
9. Mortal Kombat - Special Forces [Model SLUS-00824] (2000, PS) 
10. Mortal Kombat Advance [Model AGB-AM5E-USA] (2001, GBA) 
11. Mortal Kombat - Deadly Alliance [Model SLUS-20423] (2002, PS2) 
12. Mortal Kombat - Tournament Edition [Model AGB-AW4E-USA] (2003, GBA) 
13. Mortal Kombat - Deception / Mystification (2004, PS2) 
14. Mortal Kombat - Shaolin Monks (2005, XBOX, PS2) 
15. Mortal Kombat - Armageddon (2006, XBOX, PS2) 
16. Mortal Kombat vs. DC Universe (2008, PS3, 360) 
17. Mortal Kombat (2011, PS3, 360)
18. Mortal Kombat X (2015, PS4, One)
19. Mortal Kombat 11 (2019, PS4, One, Switch)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1674/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `midtunit`. Play it at [../../../app/g/mk/](../../../app/g/mk/) or [explore the knowledge graph](viewer.html).*
