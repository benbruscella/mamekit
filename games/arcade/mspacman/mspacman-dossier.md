# Ms. Pac-Man

**Midway / General Computer Corporation · 1981** — transpiled from the MAME driver `src/mame/pacman/pacman.cpp` by mamekit.

![marquee](/artwork/media/marquees/mspacman.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/mspacman.webp) | ![cabinet](/artwork/media/cabinets/mspacman.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 25 |

- **Sound:** wsg @ 0.096 MHz
- **Screen:** 288×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `pacman.6e` | 0x0 | 0x1000 | `c1e6ab10` |
| `maincpu` | `pacman.6f` | 0x1000 | 0x1000 | `1a6fb2d4` |
| `maincpu` | `pacman.6h` | 0x2000 | 0x1000 | `bcdd1beb` |
| `maincpu` | `pacman.6j` | 0x3000 | 0x1000 | `817d94e3` |
| `maincpu` | `u5` | 0x8000 | 0x800 | `f45fbbcd` |
| `maincpu` | `u6` | 0x9000 | 0x1000 | `a90e7000` |
| `maincpu` | `u7` | 0xb000 | 0x1000 | `c82cd714` |
| `gfx1` | `5e` | 0x0 | 0x1000 | `5c281d01` |
| `gfx1` | `5f` | 0x1000 | 0x1000 | `615af909` |
| `proms` | `82s123.7f` | 0x0 | 0x20 | `2fc650bd` |
| `proms` | `82s126.4a` | 0x20 | 0x100 | `3eb3a8e4` |
| `namco` | `82s126.1m` | 0x0 | 0x100 | `a9cc86bf` |
| `namco` | `82s126.3m` | 0x100 | 0x100 | `77245b66` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Up | joystick up | `IN0` | 0x1 |
| Left | joystick left | `IN0` | 0x2 |
| Right | joystick right | `IN0` | 0x4 |
| Down | joystick down | `IN0` | 0x8 |
| F1 | rack test (cheat) | `IN0` | 0x10 |
| 5 | coin1 | `IN0` | 0x20 |
| 6 | coin2 | `IN0` | 0x40 |
| 9 | service1 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x20 |
| 2 | start2 | `IN1` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Rack Test (Cheat) | `IN0` | 0x10 | 0x10 |
| Service Mode | `IN1` | 0x10 | 0x10 |
| Cabinet | `IN1` | 0x80 | 0x80 |
| Coinage | `DSW1` | 0x3 | 0x1 |
| Lives | `DSW1` | 0xc | 0x8 |
| Bonus Life | `DSW1` | 0x30 | 0x0 |
| Difficulty | `DSW1` | 0x40 | 0x40 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/pacman/pacman.cpp`
- **Written by:** Nicola Salmoria,Stephane Humbert
- **License:** BSD-3-Clause
- **Development:** 437 commits by 52 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, Michaël Banaan Ananas, Vas Crabb

## The story

Arcade Video game published 44 years ago:

Ms. Pac-Man (c) 1982 Midway. 

In this, the first proper sequel to Namco's legendary pill eating maze game, players must once again run around a number of mazes, eating all of the pills that are scattered throughout. The ever-present ghosts (Blinky, Pinky, Inky and Sue) return to hamper the player's progress. The infamous 'Power Pills' are also present and correct, with four appearing in each maze. 

Namco introduced a number of changes and enhancements over the original game. The first difference is in the main character. For the first time in video-game history, the game's lead character was female. Ms. Pac-Man is almost identical to the original character with two main differences; she wears a bow in her 'hair', and is also wearing lipstick. 

Another change from the original is that the bonus fruit items are no longer static but now move randomly around the mazes. 

Ms Pac-Man features four different maze layouts, which alternate every two to four rounds : 

The first maze is only encountered in Rounds 1 and 2, and has 220 dots and 4 Power Pills. There are two sets of tunnels in this maze equidistant from the center of the maze. You must clear this maze two times before moving on to the next maze. 

The second maze is only encountered in Rounds 3, 4, and 5, and has 240 dots and 4 Power Pills. There are two sets of tunnels in this maze; one set in the lower half, and the other set at the very top. You must clear this maze three times before moving on to the next maze. 

The third maze is first encountered in Round 6 and has 238 dots and 4 Power Pills. Unlike all other mazes, there is only one set of tunnels in this maze, slightly above the center of the board. You must clear this maze four times before moving on to the next maze. 

The fourth and final unique maze is first encountered in Round 10 and has 234 dots and 4 Power Pills. There are two sets of tunnels in this maze, directly next to one another in the middle of the maze. The turns at the entrance to the tunnels change the usual immediate accessibility of the tunnels and should be taken in to account. You must clear this maze four times before moving on to the next maze. 

After Round 13, the game alternates every four rounds between the third and fourth mazes. 

Finally, the ghosts' movement patterns are also completely different from those of the original game. 

As in the original game, intermission scenes will be played after certain rounds. Ms. Pac-Man's intermissions tell the story of how Pac-Man and Ms. Pac-Man met, fell in love, and had a baby. Ms. Pac-Man's intermissions are also preceded by a sign and a title. 3 intermissions are present : 

1) Act I - They Meet : Pac-Man, the star of the original game, enters the screen being chased by Inky while Ms. Pac-Man enters from the other side being chased by Pinky. As the two of them are about to collide, they quickly move upwards, causing Inky and Pinky to collide. Pac-Man and Ms. Pac-Man face each other at the top of the screen, and a heart appears above them. This intermission is played after Round 2. 

2) Act II - The Chase : Pac-Man and Ms. Pac-Man are seen giving each other a playful chase. One chases the other in one direction, and they take turns alternating who chases who and in what direction. After three turns, they chase each other twice more at a faster speed. This intermission is played after Round 5. 

3) Act III - Junior : Pac-Man and Ms. Pac-Man anxiously await the arrival of a stork, who flies overhead with a bundle. As the stork is about to pass over them, he releases the bundle, which drops to the ground in front of Pac-Man and Ms. Pac-Man, and opens up to reveal a baby Pac. This intermission, which is played after Rounds 9, 13, and 17, would later serve as the introductory sequence to "Jr. Pac-Man". 

No intermission is present between rounds after the 18th one.

### Technical
[Upright model] 
[No. 595] 

The upright model came in the standard Namco/Midway cabinet. This is the same 'swoopy' cabinet that "Galaxian", "Galaga", and "Pac-Man" came in as well. These featured painted side-art of Ms. Pac-Man and the ghosts, along with some pink accent lines. The last 10, 000 or so Ms. Pac-Man machines to roll off the assembly line had sticker side-art instead, it was the same basic scene, but the colors were brighter, and there were a few minor differences in the layout of the graphics. The marquee showed an image of Ms. Pac-Man lounging on her own logo, with a ghost off to the side. The exact colors used on the marquee varied a bit over the production run (as did the paint codes used on the side). The control panel and monitor bezel had a single design that covered both of them, that of a blue background with a pink or maroon stripe going around it, with a few game instructions printed upon them. 

Main CPU : Zilog Z80 (@ 3.072 Mhz) 
Sound Chips : Namco 3-channel WSG (@ 96 Khz)  

Players : 2 
Control : 4-way joystick

### Trivia
Ms. Pac-Man was released on January 13, 1982 (Wednesday) in the USA, even if the copyright year is 1981.

Having won their enhancement kit lawsuit against Atari, General Computing went to Bally Midway and showed them an enhancement kit that they were working on for Pac-Man called Crazy Otto. Crazy Otto was a character similar to Pac-Man with the exception that he had legs. GCC was going to bluff Midway into letting them release their enhancement kit by telling them that they won their lawsuit against Atari, and that they just wanted Midway's blessing. Midway suggested that they create a sequel to the original Pac-Man instead of an enhancement kit, and GCC got to work on Ms. Pac-Man. Ms. Pac-Man had two prior names before settling on the one that everyone knows. 'Mrs. Pac-Man' was the original, but some of the women employees at Midway had a problem with that, so it was changed to 'Miss Pac-Man'. When someone pointed out the third intermission, where Pac and Ms. Pac welcome "Jr. Pac-Man" (or Baby Pac-Man) into the fold, they changed it to the final name of 'Ms. Pac-Man'. Midway released "Baby Pac-Man" as a pinball/video hybrid, and General Computing sued the company, claiming they had created the concept of a Pac Family. They won the suit and were awarded royalties from Pac Family merchandise. 

The logo for General Computer Corporation is present among the graphics, probably a leftover from the game's days as Crazy Otto.

In its initial run, 110,000 units were produced in the U.S. making it the best selling domestic arcade video game of all time. 

The game added a few improvements over the original : 
* Non-deterministic artificial intelligence for the ghosts, making it harder for enthusiasts to follow set patterns through levels. 
* A variety of different mazes used through the game. 
* Bonus items (such as cherries and pretzels) entered the maze and bounced through it, rather than appear in a set location as in the original, making the player go out of his way to attain it. 
* Brand new sound effects, including a new 'death' sound and opening theme. 

It was also one of the more successful of early arcade games in the female demographic, which has been attributed to 'Ms. Pac-Man' being a girl - although the Ms. Pac-Man sprite was little more than "Pac-Man" with eyelashes, a bow, lipstick and a dimple. 

After the 255th level, the maze (including dots) disappears. The game becomes unplayable, since there are no more dots to eat. 

Chris Ayra holds the record for this game on 'Regular' settings with 920,310 points on August 16, 1998. 

Victor Kunisada holds the record for this game on 'Speed-Up' settings with 922,810 points on June 16, 2001. 

Vancouver, Canada (Reuters) - Little 7-year old Al Nagac attained the Guinness World Record for Ms. Pac-Man v.2.97 with a score of 18,976,048. Al was exhausted and dehydrated and asked for several glasses of skim milk after shattering the longtime record of 11,056,736 set by Faith DeRivera, who was onhand to congratulate the victor with a kiss on the cheek. 

A Ms. Pac-Man unit appears in the 1983 movie 'WarGames', in the 1983 movie 'Joysticks', in the 1984 movie 'Tightrope' (the cab appears in the background of the bar scene), in the 1990 movie 'The Grifters', in the 1999 movie 'Man In The Moon' and in the 2002 movie 'Van Wilder'. 

Milton Bradley (MB) released a board game based on this video game in 1983. Up to 4 players can play. The maze is divided into four colored areas, representing each player; the object of the game is to clear all the dots in your colored area. Only one player at a time controls Ms. Pac-Man; the other players control the ghosts. Once a ghost catches Ms. Pac-Man, the player controlling that ghost takes over control of Ms. Pac-Man. 

Michael Jackson used to own this game (Midway upright). It was sold at the official Michael Jackson Auction on April 24th, 2009.

### Scoring
Dot : 10 points 
Power pill (energizer) : 50 points 
Ghosts : 200, 400, 800, 1,600 points 
Cherry : 100 points 
Strawberry : 200 points 
Peach : 500 points 
Pretzel : 700 points 
Apple : 1,000 points 
Pear : 2,000 points 
Banana : 5,000 points

### Tips and tricks
* The most dangerous section of the first maze is the long path at the very top. It is safest to clear it when the ghosts are blue, or at least 3 of them occupy the bottom half of the maze. 

* There are a couple of dangerous sections in the second maze. The pathways above and below the T section at the top of the maze can be particularly easy to get trapped in. It is easiest to clear these when all 4 ghosts are close on your tail, or after eating one of the top two power pellets. The two sections directly above the lower escape tunnels on either side should also be cleared with caution. 

* The most dangerous section of the 3rd maze is the center of the bottom, directly below where you begin. It is advisable to clear it out as early as possible before the ghosts can organize and trap you. The top section of the maze presents the ghosts with many pathways to reach you, so use caution. 

* The most dangerous sections of the 4th maze is the section that you begin in, and the section directly above the ghosts' den. The very top section of the maze should also be cleared with caution. 

* Secret Message : the message 'GENERAL COMPUTER CORPORATION Hello, Nakamura!' is buried at the end of the Ms. Pac-Man ROM image (Masaya Nakamura was head of Namco). 

* There's a fairly well-known glitch in the game - if you put a coin in when the Ms. Pac-Man marquee title first appears but before Blinky appears then the first board will be blue instead of pink and will remain blue until you either finish the board or lose a life, after which the board will return to its normal color.

### Staff
Co-Creator: Steve Golson

### Ports
* CONSOLES: 
[US] Atari 2600 (1982) "Ms. Pac-Man [Model CX2675]"
[US] Atari 5200 (1983) "Ms. Pac-Man [Model CX5243]"
[US] Atari 7800 (1984) "Ms. Pac-Man [Model CX7807]"
[US] Atari XEGS (198?)

Nintendo NES
[US] (1990) by Tengen 
[US] (nov.1993) "Ms. Pac-Man [Model NES-M9-USA]"

Sega Master System
[EU] (1991) "Ms. Pac-Man [Model 301030]"
[BR] (1991) by Tec Toy 

Sega Mega Drive / Genesis
[US] (1991) by Tengen
[EU] (1992) by Time Warner Interactive 

Nintendo SNES
[US] (sept.1996) "Ms. Pac-Man [Model SNS-AN8E-USA]"
[EU] (mar.27, 1997) "Ms. Pac-Man [Model SNSP-AN8P-EUR]"

Sony PlayStation
[JP] (june.21, 1996) "Namco Museum Vol.3 [Model SLPS-00390]"
[AU] (1997) "Namco Museum Vol.3 [Model SCES-00268]"
[US] (jan.31, 1997) "Namco Museum Vol.3 [Model SLUS-00398]"
[EU] (feb.1997) "Namco Museum Vol.3 [Model SCES-00268]"

Nintendo 64
[US] (oct.31, 1999) "Namco Museum 64 [Model NUS-NNME-USA]"

Sega Dreamcast
[US] (june.25, 2000) "Namco Museum [Model T-1403N]"

Sony PlayStation 2
[US] (dec.4, 2001) "Namco Museum [Model SLUS-20273]"
[US] (aug.30, 2005) "Namco Museum - 50th Anniversary [Model SLUS-21164]"
[JP] (jan.26, 2006) "Namco Museum Arcade Hits! [Model SLPS-25590]"
[EU] (mar.31, 2006) "Namco Museum - 50th Anniversary [Model SLES-53957]"

Nintendo GameCube
[US] (oct.9, 2002) "Namco Museum [Model DOL-GNME-USA]"
[US] (aug.30, 2005) "Namco Museum - 50th Anniversary [Model DOL-G5NE-USA]"
[EU] (may.5, 2006) "Namco Museum - 50th Anniversary [Model DOL-G5NP-EUR]"

Microsoft XBOX 
[US] (oct.9, 2002) "Namco Museum"
[US] (aug.30, 2005) "Namco Museum - 50th Anniversary [Model NMO-2201A-NM]"
[EU] (mar.24, 2006) "Namco Museum - 50th Anniversary"

Microsoft XBOX 360 [XBLA]
[US] [EU] [JP] (jan.10, 2007) 
[US] (nov.4, 2008) "Namco Museum - Virtual Arcade [Model 21022]"
[EU] (may.15, 2009) "Namco Museum - Virtual Arcade"
[AU] (june.3, 2009) "Namco Museum - Virtual Arcade"
[JP] (nov.5, 2009) "Namco Museum - Virtual Arcade [Model 2RD-00001]"
[KO] [EU] [AU] (feb.26, 2014) "Pac-Man Museum" as DLC.
[US] (feb.26, 2014) "Pac-Man Museum" as DLC.
[JP] (june.25, 2014) "Pac-Man Museum" as DLC.

Sony PlayStation 3 [PSN]
[US] (feb.25, 2014) "Pac-Man Museum [Model NPUB-31383]" as DLC.
[EU] [AU] (feb.26, 2014) "Pac-Man Museum [Model NPEB-01892]" as DLC.
[KO] (feb.26, 2014) "Pac-Man Museum" as DLC.
[JP] (june.25, 2014) "Pac-Man Museum" as DLC.

Microsoft XBOX One [XBOX Store]
[US] [EU] [AU] [JP] (apr.20, 2016) "Arcade Game Series - Ms. Pac-Man" 

Sony PlayStation 4 [PSN]
[US] (apr.20, 2016) "Arcade Game Series - Ms. Pac-Man [Model CUSA-03957]" 
[EU] [AU] (apr.20, 2016) "Arcade Game Series - Ms. Pac-Man [Model CUSA-03864]" 
[JP] (apr.20, 2016) "Arcade Game Series - Ms. Pac-Man [Model CUSA-03671]" 

* HANDHELDS: 
[US] Atari Lynx (1990) "Ms. Pac-Man [Model PA2057]" 

Nintendo Game Boy
[EU] (1993) "Ms. Pac-Man [Model DMG-N4]"
[US] (oct.1993) "Ms. Pac-Man [Model DMG-N4-USA]"

[US] Sega Game Gear (1995)

Nintendo Game Boy Color
[US] (1999) "Ms. Pac-Man - Special Color Edition [Model DMG-AQCE-USA]"
[EU] (1999) "Ms. Pac-Man - Special Colour Edition [Model DMG-AQCP-EUR]"

Nintendo Game Boy Advance 
[US] (june.10, 2001) "Namco Museum [Model AGB-ANME-USA]"
[JP] (dec.7, 2001) "Namco Museum [Model AGB-ANMJ-JPN]"
[EU] (dec.7, 2001) "Namco Museum [Model AGB-ANMP-EUR]"
[US] (aug.30, 2005) "Namco Museum - 50th Anniversary [Model AGB-B5NE-USA]"
[EU] (mar.31, 2006) "Namco Museum - 50th Anniversary [Model AGB-B5NP-EUR]"

Sony PSP
[JP] (feb.24, 2005) "Namco Museum [Model ULJS-00012]"
[US] (aug.23, 2005) "Namco Museum Battle Collection [Model ULUS-10035]"

* COMPUTERS: 
[US] Atari 800 (1982) "Ms. Pac-Man [Model RX8043]" 
[US] Apple II (1983) 
[EU] Commodore C64 (1983) 
[US] Commodore C64 (1983) "Ms. Pac-Man [Model RX8545]" 
[US] PC [Booter] (1983) 
[US] Commodore VIC-20 (1983) 
[US] Texas Instruments TI-99/4A (1983) 
Tandy Color Computer (1983) "Miss Gobbler" 
Tandy Color Computer (1984) "Ms. Maze" 
[EU] Sinclair ZX Spectrum (1984)

PC [MS Windows]
[JP] (june.9, 1998) "Namco History Vol.3"
[US] (jul.31, 1998) "Microsoft Revenge of Arcade"
[US] (2000) "Microsoft Return of Arcade Anniversary Edition"
[US] (oct.25, 2005) "Namco Museum - 50th Anniversary"
[AU] (mar.27, 2006) "Namco Museum - 50th Anniversary"
[EU] (may.19, 2006) "Namco Museum - 50th Anniversary"

Steam
[US] [EU] (feb.25, 2014) "Pac-Man Museum" : as DLC.
[US] (apr.19, 2016) "Arcade Game Series - Ms. Pac-Man [Model 403410]" 

* OTHERS: 
[US] VFD handheld game (1981) by Coleco 
[US] LCD handheld game (1992) by Micro Games of America 
[US] Arcade (1998) "Galaxy Games StarPak 2" 
[US] Arcade (2001) "Ms. Pac-Man/Galaga - Class of 1981" 
[US] Mobile Phones (june.13, 2003) 
[US] Ms. Pac-Man TV Game (2004) by Jakk's Pacific 
[US] Arcade (2005) "Pac-Man - 25th Anniversary Edition" 
[US] Ms. Pac-Man TV Game Wireless Version (2005) by Jakk's Pacific 
[US] Mobile Phone (jan.5, 2005) "Ms. Pac-Man for Prizes"
[US] Apple iPod (feb.27, 2007) "Ms. Pac-Man [Model 284736660]" 
[US] Apple iPhone (jul.9, 2008) 
[US] Blackberry (nov.23, 2009) "Ms. Pac-Man [Model 4532]" 
[US] Windows Mobile (mar.23, 2010) "Ms. Pac-Man by Namco" 
[US] Arcade (2010) "Pac-Man's Arcade Party": included in home cabaret and cocktail models only.
[US] Apple iPhone/iPad (feb.10, 2011) "Ms. Pac-Man for iPad [Model 404072981]" 
[US] Android Market (mar.18, 2011) by Namco
[US] Arcade (2018) "Pac-Man's Pixel Bash": only available if the machine is set to Free Play.

### Series
1. Pac-Man (1980, ARC)
2. Ms. Pac-Man (1981, ARC)
3. Super Pac-Man (1982, ARC) 
4. Pac-Man Plus (1982, ARC)
5. Jr. Pac-Man (1983, ARC)
6. Professor Pac-Man (1983, ARC)
7. Pac-Land (1984, ARC) 
8. Pac-Mania (1987, ARC) 
9. Pac-Attack (1993, SNES, Genesis; 1994, Game Boy, Game Gear)
10. Pac-Man 2 - The New Adventures [Model SNS-25-USA] (1994, SNES, Genesis)
11. Pac-In-Time [Model SNS-APTE-USA] (1994, SNES, PC) 
12. Pac-Man Arrangement (1996, ARC) : part of "Namco Classics Collection Vol.2"
13. Pac-Man VR (1996, ARC)
14. Pac-Man World [Model SLUS-00439] (1999, PS) 
15. Pac-Man - Adventures in Time (2000, PC)
16. Ms. Pac-Man - Maze Madness [Model SLUS-01018] (2000, PS) 
17. Ms. Pac-Man - Quest for the Golden Maze (2001, PC)
18. Pac-Man All-Stars (2002, PC)
19. Pac-Man Fever [Model SLUS-20197] (2002, PS)
20. Pac-Man World 2 [Model SLUS-20224] (2002, PS2, GC, XBOX) 
21. Pac-Man Vs. [Model DOL-PRJE-USA] (2003, GC)
22. Pac-Pix [Model NTR-APCE-USA] (2005, DS) 
23. Pac-Man Pinball Advance [Model AGB-BP8E-USA] (2005, GBA)
24. Pac-Man Arrangement (2005, PSP) : part of "Namco Museum Battle Collection [Model ULUS-10035]" 
25. Pac'n Roll [Model NTR-APNE-USA] (2005, DS) 
26. Pac-Man World 3 [Model SLUS-21219] (2005, PSP, PS2, GC, XBOX, PC, DS)
27. Pac-Man World Rally [Model SLUS-21328] (2006, GameCube, PS2, PSP, PC)
28. Pac-Man Championship Edition (2007, XBLA) 
29. Pac-Man Championship Edition DX (2010, XBLA, PSN) 
30. Pac-Man Party [Model RVL-SP7E-USA] (2010, Wii)
31. Pac-Man Battle Royale (2011, ARC) 
32. Pac-Man Tilt (2011, 3DS) : part of "Pac-Man & Galaga Dimensions [Model CTR-APGE-USA]"
33. Pac-Man Championship Edition DX+ (2013, XBLA, PSN, Steam)
34. Pac-Man Dash! (2013, Android/iOS)
35. Pac-Man and the Ghostly Adventures (2013, 3DS, XBOX 360, PS3, Wii U, PC)
36. Pac-Man and the Ghostly Adventures 2 (2014, 3DS, XBOX 360, PS3, Wii U, PC)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1698/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `pacman`. Play it at [../../../app/g/mspacman/](../../../app/g/mspacman/) or [explore the knowledge graph](viewer.html).*
