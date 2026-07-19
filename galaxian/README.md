# Galaxian (Namco set 1)

**Namco · 1979** — transpiled from the MAME driver `src/mame/galaxian/galaxian.cpp` by mamekit.

![marquee](/artwork/media/marquees/galaxian.png)

| Flyer | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/galaxian.png) | ![cabinet](/artwork/media/cabinets/galaxian.png) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 18 |

- **Sound:** galaxian @ 3.072 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `galmidw.u` | 0x0 | 0x800 | `745e2d61` |
| `maincpu` | `galmidw.v` | 0x800 | 0x800 | `9c999a40` |
| `maincpu` | `galmidw.w` | 0x1000 | 0x800 | `b5894925` |
| `maincpu` | `galmidw.y` | 0x1800 | 0x800 | `6b3ca10b` |
| `maincpu` | `7l` | 0x2000 | 0x800 | `1b933207` |
| `gfx1` | `1h.bin` | 0x0 | 0x800 | `39fb43a4` |
| `gfx1` | `1k.bin` | 0x800 | 0x800 | `7e3f56a2` |
| `proms` | `6l.bpr` | 0x0 | 0x20 | `c3ac9467` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 6 | coin2 | `IN0` | 0x2 |
| Left | joystick left | `IN0` | 0x4 |
| Right | joystick right | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| 9 | service1 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x1 |
| 2 | start2 | `IN1` | 0x2 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Cabinet | `IN0` | 0x20 | 0x0 |
| Service Mode | `IN0` | 0x40 | 0x0 |
| Coinage | `IN1` | 0xc0 | 0x0 |
| Bonus Life | `IN2` | 0x3 | 0x0 |
| Lives | `IN2` | 0x4 | 0x4 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/galaxian/galaxian.cpp`
- **Written by:** Aaron Giles, Couriersud, Stephane Humbert, Robbbert
- **License:** BSD-3-Clause
- **Development:** 659 commits by 49 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, ClawGrip, David Haywood

## The story

Arcade Video game published 47 years ago:

Galaxian (c) 1979 Namco.

Galaxian is a legendary single-screen shoot-em-up that took everything that made Taito's ground-breaking "Space Invaders" so good, and improved upon it on every level. Each screen starts with a wave of multi-colored aliens moving left and right at the top of the screen; the aliens quickly break ranks and start dive-bombing the Galaxip (player's ship) - either in single units or in groups of 3 - dropping multiple missiles as they descend. All of the aliens need to be destroyed before the player can progress to the next wave.

### Cast of characters
Galaxip: This is the name of the ship which you control at the bottom of the screen. 

Galaxian: These attacking aliens come in three varieties: blue, purple, and red. They begin in formation at the top of the screen and will occasionally swoop down to attack you before returning to their position in the formation. 

Flagship: At least two of these appear at the top of the formation at the start of each stage. They will swoop down to attack with one or two red Galaxians if any are nearby. If a flagship is one of the last enemies left of the screen, it will run away and appear as a third Flagship at the start of the next stage.

### Technical
This was the first title to use the now familiar 'Namco Cabinet', which was used for Galaxian, "Galaga", "Pac-Man", "Ms. Pac-Man". Several other titles used nearly identical cabinets as well. These machines are white, with painted sideart of a green dragonfly alien (done up in blue, green. and black). The marquee is rather large and displays a blue and green 'Galaxian' logo (which is painted on a sheet of glass, they don't make them like that anymore). The control panel and monitor bezel are not highly decorated, but do feature some game instructions. Finally this machine uses neon green t-molding (edge trim), it is difficult to find replacement trim in that same exact shade.

The earliest Galaxian machines used a 25-inch G02 monitor, but later machines shipped with the standard 19-inch Electrohome G07 monitor. Any normal standard resolution arcade monitor should work as a replacement. "Pac-Man" PCBs will work in Galaxian machines, but require a 4-way joystick, instead of the 2-way model that Galaxian normally has. The sound pinout is also different, so one would need to rewire the connector to hear any Pac-Man sounds. You can also plug a Galaxian PCB into a Pac-Man. Again, the sound would need to be wired up at the connector and you'd have to push UP on the joystick to fire.

Main CPU: Zilog Z80 (@ 3.072 Mhz)
Sound Chips: Tone generator and discrete circuits

Players: 2
Control: 2-way Joystick 
Buttons: 1 (FIRE) 

Alternate Japanese cabinet versions):
Buttons: 3 (LEFT, RIGHT, FIRE)

### Trivia
Galaxian was released on October 31, 1979 in Japan.

While it is often cited as "the first video game to be released with 100 percent of its graphics displayed in true R.G.B. color," this is inaccurate. It did have multi-color objects, that combined with animation was significant, but Taito had done this earlier with Super Speed Race - which Midway licensed and launched a month before they produced Galaxian. Home consoles already supported full color graphics prior to Galaxian's release (See the 1978 release of Superman on the Atari 2600 as an example of a multi-color object; Or the 1979 release of Basketball on the Atari 400/800) as did various other arcade games that used full color. These may have not been as detailed as Galaxian but were still important: Gotcha Color by Atari (1973) had an RGB color circuit; There was Wimbeldon by Nutting Associates (1973); Car Polo, Star Fire and Fire One! by Exidy (1977~79; Fire One came out a month before Galaxian did in the States), Sea Wolf II by Midway (1978), and a few others.

Something can also be said for the iconic sounds that came from Galaxian, which players could use to identify the game before they even saw it.

Space battles of all kinds played a major role during the golden age of video games. With the introduction of Galaxian, players were transported to the most colorful and challenging space battle yet, giving patterns to the attacking aliens that made for a more dynamic and memorable challenge than Space Invaders.

* A place in video game history:
"Galaxian captivated the minds of quite a few arcade enthusiasts," said Chris Lindsey, director of the National Video Game and Coin-Op Museum in St. Louis. "It was a relatively early entry in the golden age of video games, and it capitalized on the enthusiasm created by the earlier video game classic, "Space Invaders", while providing a more colorful, enjoyable, and demanding gaming experience.
Galaxian had smarter bad guys than "Space Invaders", and it demanded that the player really pay attention to what was going on. And there were no shields, like many games have today. You really had to stay on the ball. Galaxian also had great sound and used elements that have since become standard -- such as flags and other symbols to mark the player's progression through different levels of game play.".

* The great 25-cent escape:
"Galaxian definitely gets an enthusiastic response," Lindsey said. "In fact, I deliberately position the game near the entrance of the museum. Often it's the first game people go to." Lindsey often sees parents trying to convey to their child the excitement of these great games. "It is funny for me when I see a father trying to explain a game to his kid. Junior really just wants to get on the game and figure it out, and Dad wants to do a demo. Dad starts instructing Junior while Junior is sort of looking around, wondering how he can get away. But Dad continues, busily explaining the nuances of the game, which he knows Junior can't get on the first play. This all shows the enthusiasm that a certain generation still has for these terrific games."
With or without a parent's help, Lindsey sees a younger generation embracing the classic arcade games. "Kids by themselves will actually do quite well on these games," Lindsey said. "I'm somewhat surprised when I see how good kids are at picking up games. I sort of think that because I'm older, I should be able to play better, and that's not always the case with video games. That's a lesson an entire generation has had to learn.".

* Namco notes:
Galaxian was one of Namco's first video games, and engineers throughout the company were gathered into a special team. As the game neared completion, the engineers suspected they had created a good game because other Namco employees were extremely "excited and crazy about the game." Once Galaxian was released, they knew they had a winner because, as one Namco engineer reported, "People [at the arcades] piled their coins onto the game cabinets to keep playing, and those who were waiting were very irritated because their turn never came. There were huge lines of people around each machine.".

The Galaxian Flagship became a trademark of Namco as it makes cameo appearances in other Namco classics:
* "Pac-Man" (1980) and "Pac-Man Plus" (1982): The flagship makes an appearance as the bonus fruit in rounds 9 and 10, and is worth 2,000 points if Pac-Man eats it. 
* "Galaga" (1981): The flagship makes an appearance as one of the "transform" ships. It splits into 2, then 3 clones of itself. They are worth 160 points each, and killing all 3 scores a bonus of 3,000 points. 
* "Dig Dug" (1982): The flagship makes an appearance as the bonus vegetable in rounds 16 and 17, and is worth 7,000 points if Dig Dug picks it up. 
* "Super Pac-Man" (1982): All regular edible items on rounds 15, 31, 47, and 63 are flagships, and they are worth 150 points each. Starting from their second appearance, Round 31, they are 160 points instead. 
* "Pac & Pal" (1983): The flagship makes an appearance as one of the "special items" that make Pac-Man turn blue when eaten, and allows him to stun the ghosts for a short while by shooting a Galaga-style tractor beam. It is worth 1,000 points if Pac-Man eats it or intercepts it from Miru. 
* "Pac-Land" (1984): The ghosts in airplanes sometimes drop flagships and they are worth 7,650 points (765 being Namco's goroawase number in Japanese) if eaten. 
* "Super Xevious" (1984): The flagship makes an appearance in a silver form and as an enemy, and sometimes several of them attack at once. They are worth 300 points each. 
* "Quester" (1987): In Round 5, the bricks form a Galaxian Flagship.
* "Pac-Mania" (1987): The flagship makes a 3-D appearance as a special item and in two forms as well, the other one being the silver form from "Super Xevious". The regular one and the silver one are worth 7,650 points if eaten.
* "Pistol Daimyo no Bouken" (1990) : The flagship makes an appearance as an enemy along with the other Galaxian characters, and they attempt to hit Pistol Daimyo with their fire. 
* "Tinkle Pit" (1994): The flagship also makes an appearance with the other Galaxian characters, but this time they appear as bonus items. It is worth 800 points if collected. 
* "Tekken" (1994 - Arcade, 1995 - PlayStation) and "Tekken 2" (1995 - Arcade, 1996 - PlayStation) : Winning at least seven rounds in Arcade Vs. mode will reveal the Galaxian flagship on the lower left (or right) hand corner of the screen. In order for this to work, "Number of Wins Shown By" must be set to Fruit. 
* "Namco Classic Collection Vol.1" (1995): The flagship makes an appearance in "Galaga Arrangement" as a Challenging Stage enemy in Space-Plant Zone (Stage 20) and normally in Space-Flower Zone (Stage 26). If killed normally, they are worth 150 points. If killed in Challenging Stage, they are worth 300 points.
* "Namco Classic Collection Vol.2" (1996): The flagship appears in both "Pac-Man Arrangement" and "Dig Dug Arrangement". In "Pac-Man Arrangement", it makes its appearance in World 4-1 and 4-2 and is worth 5,000 points if Pac-Man eats it. In "Dig Dug Arrangement", it appears in Stages 17 and 18 and is worth 7,000 points if Dig Dug picks it up.
* "Pac-Man World" (1999): The flagship appears again in a Pac-Man game. This time, the item must be collected in order to access the mazes.
* "Pac-Man World 2" (2002) and "Pac-Man World 3 (2005): The flagship teleports Pac-Man to mazes. The point value will be the same as the points earned in the maze (if completed), plus 2000.
* "Namco Museum Battle Collection" (2005): The arrangement versions of "Pac-Man" and "Dig Dug", later called "Pac-Man Remix" and "Dig Dug Remix" in the iOS version, feature the flagship. "Pac-Man Remix" features both the flagship, worth 3,200 points, and the red drone, worth 2,800 points, as fruit items, while on "Dig Dug Remix", the flagship is a vegetable item and is worth 7,000 points. 
"Dig Dug - Digging Strike" (2005): Just like the first "Dig Dug", the flagship appears as a vegetable on stage 13, except it's worth 6,000 points.
"Pac-Man Championship Edition" (2007) and "Pac-Man Championship Edition DX" (2010) : The flagship reappears, but is this time joined by the Galaga Boss, Queen Gaplus, and two drones, one each from "Galaga" and Galaxian.

Gary Whelan holds the official record for this game with 1,114,550 points, achieved August 24, 2006 at Dukinfield in the UK.

The game can be played while the main game loads in the Sony PlayStation's port of "Ridge Racer".

A Namco Galaxian until appears in April Wine's concert video 'Live in London (1981)'.

### Updates
The only code difference between the original Namco version and the licensed Midway version is that the 'Bonus Galaxip' text is printed on a different line.

In Namco Set 2: 
* Lives dip switch can be set to 3 or 5 lives. The default is 3 lives.
* Extra life dip switch can be set to 4,000 (meaning a bonus Galaxip at 4,000 points), 5,000 points, 7,000 points, or None (meaning no bonus Galaxip at any time). The default is 4,000.

In Midway Set 2: 
* Extra life dip switch can be set to None, 3,000, 4,000, or 5,000. The default is None.

In the bootleg version: 
* Extra life dip switch can be set to None, 20,000, 40,000, or 80,000. The default is None.

### Scoring
Blue Galaxian: 30 points in formation, 60 points in flight.
Purple Galaxian: 40 points in formation, 80 points in flight.
Red Galaxian: 50 points in formation, 100 points in flight.
Flagship: 60 points in formation, 150 points in flight.
Flagship: 200 points in flight with one escort.
Flagship: 300 points in flight with two escorts, Flagship killed before both escorts.
Flagship: 800 points in flight with two escorts, Flagship killed after both escorts.

* The maximum possible score shown is 999,990. Scores higher than this roll back to zero, but the high score will show the last score achieved before the rollover, which can vary from 999,990 to 999,200.

### Tips and tricks
* The action starts immediately as soon as you start your game. The Galaxians will be set up in formation and your Galaxip will be placed in the middle of the bottom of the screen. The action starts immediately. You can only have one shot in the air at any time so plan your shots accordingly. The game starts off slowly with only 2 or 3 Galaxians attacking your Galaxip at one time. They will drop 3 to 4 laser shots. As the waves progress, more Galaxians will come after your Galaxip until you will usually have 10-15 at any one time swooping down on it.

Each wave starts out with the Galaxians in formation, in the following quantities (in order from top to bottom):
Flagships: 2 (plus any that have escaped from battle in the previous wave, up to a maximum of 4 altogether).
Red Galaxians (Escorts): 6 (in 1 row, directly below the flagships).
Purple Galaxians: 8 (in 1 row, directly below the red Galaxians).
Blue Galaxians: 30 (in 3 rows of 10, directly below the purple Galaxians).

Flagships and red Galaxians are special enemies : they create convoys. Flagships have other special properties (see below). Purple and blue Galaxians are regular enemies.

* The Galaxip can fire only shot on the screen at a time. It is possible to kill 2 enemies with one shot if they are flying extremely close to each other.

* Missiles shot at the formation which miss by going between columns or near an outer edge of a column, will cause the formation to pause its left-right movement for a very short moment. This will usually, but not always, prevent missed shots near the columns from hitting the enemies in the upper rows of the formation which might otherwise be hit by moving into the shot as it flies by.

* Enemies peel away from the formation and attack the Galaxip. Enemies fire at the Galaxip during their attack, but they can’t fire after they pass an invisible horizontal line just above the Galaxip.

* Enemies always begin attack runs from the edges of the formation, never from the middle. This also applies to Flagships but it is not readily observable unless there are 3 or 4 Flagships present.

* A 'swarm' is triggered by either of 2 criterion:
1. The total number of enemies in formation is 3 or less.
2. The total number of blue and purple Galaxians in formation is zero. This can occur when there are many Flagships and red Galaxians still present in formation.

* When the 'swarm' starts, enemies that begin an attack do not return to formation : they keep attacking. Once started, a 'swarm' can only be ended by killing all of the enemies and/or letting them escape, or by the Galaxip getting hit. 

* Before the 'swarm' starts, enemies that attack, which are not killed, return to the formation. Since these enemies were on the edge of the formation and able to attack once, they are very likely to attack again soon.

* When not in 'swarm', a maximum of 4 regular enemies can attack at any one time.

* Flagships and convoys can attack at any time as long as another convoy attack is not already commencing; only one convoy attack can happen at a time.

* A Flagship will always create a convoy with the maximum number of red escorts available to it, unless the 'swarm' has started.

* The Flagships 'capture' up to 3 red escorts while they are in formation :  Whenever there is a Flagship in formation directly above an escort or above it to one side, that escort is captured and cannot attack on its own. This capture effect ends when a 'swarm' begins.

* The Flagships can escape from the battle only if all three red escorts under their place in the formation have been killed. Flagships that escape will appear on the next attack wave, up to a maximum of 4 Flagships at the start of any wave.

* When an attacking Flagship is killed, all enemies stop firing for a short period of time. If this kill occurs before the 'swarm', there will also be no new attacks from the formation during this period. These benefits never occur for killing a Flagship that is in formation.

* The flags which count the rounds show a maximum of round 48; rounds 48 and up are shown as round 48. However if round 256 is achieved, the flags start to roll over, but with some graphical glitches; the flags that were showing round 48 begin to get overwritten, one at a time. This results in the big 10-flags being cut in half by the regular flags which start to appear, until all 4 of the 10-flags are replaced by small ones. 16 single flags show during rounds 256+8 and 256+9 (rounds 264 and 265). The glitch ends at round 256+10 (266), which shows a single 10 flag.

* After wave 1, it is possible to kill any one enemy, even a Flagship, in a brand new formation by shooting at just the right time and place before the formation teleports in at the start of a new round.

* The Galaxians that come down in a smooth pattern are the easiest to kill plus their shots are easy to avoid. The hard ones to kill (usually the purple Galaxians) are the ones where the Galaxian 'bounces' from side-to-side dropping shots since those shots cover a very large area.

* The corners can be a death trap. When the Galaxians come down firing, their shots do not come straight down but they angle toward the direction that the Galaxian is traveling. In addition, the Galaxians have a tendency to 'charge' into the corners. You get the points if a Galaxian rams your Galaxip but you also lose your Galaxip in the process.

* The Flagships are the big points in the game. Try to avoid shooting the red Galaxians since they act as escorts for the Flagship. Wait until a Flagship comes down with two escorts. If you can't get aligned to take all three out quickly, let them pass. If you do get a good angle on them, you will have to fire quickly to pick off the two escorts first, then the Flagship. If you hit the Flagship first, you get significantly less points.

* Do not stop moving. If you do, you will be caught in a crossfire. The Galaxians tend to leave small areas of safety open between their shots. Also, make sure you are constantly hitting their formation to reduce their numbers (again, don't kill off the red ones).

* As you progress into the higher waves, the Galaxians tend to move quicker, fly more erratic patterns, and 'gang up' on your Galaxip. Plan accordingly for this.

### Ports
NOTE: For ports released in North America, please see the Midway Upright model entry.

* CONSOLES: 
[JP] Epoch Cassette Vision (aug.10, 1981)
[JP] Atari 2600 (1983)
[JP] Nintendo Famicom (sept.7, 1984) "Galaxian [Model NGX-4500]" 
[JP] Nintendo Famicom Disk (jul.20, 1990) "Galaxian [Model NDS-GXN]"  
[JP] Sony PlayStation (june.21, 1996) "Namco Museum Vol.3 [Model SLPS-00390]" 
[AU] Sony PlayStation (1997) "Namco Museum Vol.3 [Model SCES-00268]" 
[EU] Sony PlayStation (feb.1997) "Namco Museum Vol.3 [Model SCES-00268]" 
[JP] Sony PS2 (jan.26, 2006) "Namco Museum Arcade Hits! [Model SLPS-25590]" 
[EU] Microsoft XBOX (mar.24, 2006) "Namco Museum - 50th Anniversary" 
[EU] Sony PS2 (mar.31, 2006) "Namco Museum - 50th Anniversary [Model SLES-53957]" 
[EU] Nintendo GameCube (may.5, 2006) "Namco Museum - 50th Anniversary [Model DOL-G5NP-EUR]" 
[JP] Nintendo Wii (dec.6, 2007) "Minna de Asobou! Namco Carnival [Model RVL-RNWJ-JPN]" 
[EU] Nintendo Wii (apr.18, 2008) "Namco Museum Remix [Model RVL-RN2P]" 
[KO] Nintendo Wii (apr.26, 2008) "Namco Museum Remix [Model RVL-RNWK-KOR]" 
[AU] Nintendo Wii (may.1, 2008) "Namco Museum Remix [Model RVL-RN2P]" 
[EU] Microsoft XBOX 360 (may.15, 2009) "Namco Museum - Virtual Arcade" 
[AU] Microsoft XBOX 360 (june.3, 2009) "Namco Museum - Virtual Arcade" 
[JP] Nintendo Wii [Virtual Console Arcade] (sept.29, 2009) 
[JP] Microsoft XBOX 360 (nov.5, 2009) "Namco Museum - Virtual Arcade [Model 2RD-00001]" 

* HANDHELDS: 
[UK] Nintendo Game Boy (1995) "Arcade Classic No. 3 - Galaga & Galaxian [Model DMG-AGCP-UKV]" 
[EU] Nintendo Game Boy (1995) "Arcade Classic No. 3 - Galaga & Galaxian [Model DMG-AGCP-NOE]" 
[JP] Nintendo Game Boy (1995) "Galaga & Galaxian [Model DMG-AGCJ-JPN]" 
[JP] Nintendo Game Boy (nov.29, 1996) "Namco Gallery Vol.2 [Model DMG-AN2J-JPN]" 
[JP] Nintendo GBA (dec.7, 2001) "Namco Museum [Model AGB-ANMJ-JPN]" 
[EU] Nintendo GBA (dec.7, 2001) "Namco Museum [Model AGB-ANMP-EUR]" 
[JP] Sony PSP (feb.24, 2005) "Namco Museum [Model ULJS-00012]" 
[KO] Sony PSP (may.2, 2005) "Namco Museum [Model UCKS-45005]" : as 'Old Galaga' and marks the only ever official connection between the Galaxian and Galaga series
[EU] Sony PSP (dec.9, 2005) "Namco Museum Battle Collection [Model UCES-00116]" 
[JP] Nintendo DS (oct.11, 2007) "Namco Museum DS [Model NTR-YNMJ-JPN]" 
[EU] Nintendo DS (feb.29, 2008) "Namco Museum DS [Model NTR-YNMP-EUR]" 

* COMPUTERS: 
[EU] Exidy Sorcerer 
[JP] Apple II (1980) by Star Craft Tokyo.
[JP] Apple II (1981) "Alien Typhoon" by Star Craft.
[EU] BBC B (1982) "Arcadians" by Acornsoft 
[EU] Acorn Electron (1982) "Arcadians" by Acornsoft. 
[EU] Sinclair ZX81 (1982) "ZX Galaxians" by Artic 
[EU] Sinclair ZX Spectrum (1982) by Artic.
[EU] Commodore C64 (1983) "Galaxions" by Solar Software.
[EU] Commodore C64 (1983) 
[EU] Sinclair ZX Spectrum (1983) by Atarisoft.
[UK] Sinclair ZX Spectrum (1983) "Galactians" by DK'Tronics.
[JP] MSX (1984)
[EU] MSX (1984) by Bug-Byte.
[JP] Fujitsu FM-7 (1985) 
[JP] Sharp X1 (1984) by Dempa.
[JP] NEC PC-88
[EU] Atari ST (1993) "Galaxian" : PD / Shareware by Sinister Developments 
[EU] PC [MS-DOS] (1996) "Galaxi" : PD / Shareware by Kurt W. Dekker 
[EU] Commodore Amiga (1998) "Galaxians v1.3" : PD / Shareware by Kev Gallagher
[JP] PC [MS Windows, CD-ROM] (dec.24, 1998) "Namco History Volume 4" 
[AU] PC [MS Windows, CD-ROM] (mar.27, 2006) "Namco Museum - 50th Anniversary" 
[EU] PC [MS Windows, CD-ROM] (may.19, 2006) "Namco Museum - 50th Anniversary" 

* OTHERS: 
VFD tabletop game (1980) by Bandai 
VFD tabletop game (19??) "Moon Alien" : alternate name by Bandai.
[JP] VFD tabletop game (19??) "Beam Galaxian" by Bandai.
VFD handheld game (1981) "Galaxian 2" by Entex : Also by Futuretronics and so named because it can be a two-player game. 
[JP] VFD handheld game (1981) "Astro Galaxy" by Entex. 
VFD handheld game (1981) "Astro Invader" by Entex : Hales release.
LCD Keychains handheld game (1997) by Bandai.

### Series
1. Galaxian (1979)
2. Galaga (1981)
3. Gaplus (1984) : also known in the USA as "Galaga 3"
4. Galaga '88 (1987)
5. Galaxian 3 Theatre 6 - Project Dragoon (1990)
6. Galaxian 3 Theatre 6 J2 - Attack Of The Zolgear (1994)
7. Galaga Arrangement (1995) : part of "Namco Classics Collection Vol.1"
8. Galaga - Destination Earth (2000, GBA, PC CD-ROM and PlayStation)
9. Galaga Arrangement (2005, PSP) : part of "Namco Museum Battle Collection" 
10. Galaga Remix (2007, Wii) : part of "Namco Museum Remix" 
11. Galaga Legions (2008, XBLA)
12. Galaga Legions DX (2010, PSN, XBLA)
13. Galaga 3D Impact (2011, Nintendo 3DS) : part of "Pac-Man & Galaga Dimensions"

### Contribute
Edit this entry: https://www.arcade-history.com/game/901/?o=2

*Story courtesy of [Gaming History](https://www.arcade-history.com/) (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `galaxian`. Play it at [../app/g/galaxian/](../app/g/galaxian/) or [explore the knowledge graph](viewer.html).*
