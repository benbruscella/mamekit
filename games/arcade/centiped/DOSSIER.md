# Centipede (revision 4)

**Atari · 1980** — transpiled from the MAME driver `src/mame/atari/centiped.cpp` by mamekit.

![marquee](/artwork/media/marquees/centiped.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/centiped.webp) | ![cabinet](/artwork/media/cabinets/centiped.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | M6502 | 1.512 MHz | 18 |

- **Sound:** pokey × 1 @ 1.512 MHz
- **Screen:** 256×240 @ 60.00 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `136001-407.d1` | 0x2000 | 0x800 | `c4d995eb` |
| `maincpu` | `136001-408.e1` | 0x2800 | 0x800 | `bcdebe1b` |
| `maincpu` | `136001-409.fh1` | 0x3000 | 0x800 | `66d7b04a` |
| `maincpu` | `136001-410.j1` | 0x3800 | 0x800 | `33ce4640` |
| `gfx1` | `136001-211.f7` | 0x0 | 0x800 | `880acfb9` |
| `gfx1` | `136001-212.hj7` | 0x800 | 0x800 | `b1397029` |
| `proms` | `136001-213.p4` | 0x0 | 0x100 | `6fa3093a` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `IN1` | 0x1 |
| Space / X | button1 | `IN1` | 0x4 |
| 5 | coin1 | `IN1` | 0x20 |
| 6 | coin2 | `IN1` | 0x40 |
| 9 | service1 | `IN1` | 0x80 |
| Up | joystick up | `IN3` | 0x10 |
| Down | joystick down | `IN3` | 0x20 |
| Left | joystick left | `IN3` | 0x40 |
| Right | joystick right | `IN3` | 0x80 |
| Left | trackball x left | `TRACK0_X` | 0xff |
| Right | trackball x right | `TRACK0_X` | 0xff |
| Up | trackball y up | `TRACK0_Y` | 0xff |
| Down | trackball y down | `TRACK0_Y` | 0xff |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `IN0` | 0x20 | 0x20 |
| Language | `DSW1` | 0x3 | 0x0 |
| Lives | `DSW1` | 0xc | 0x4 |
| Bonus Life | `DSW1` | 0x30 | 0x10 |
| Difficulty | `DSW1` | 0x40 | 0x40 |
| Credit Minimum | `DSW1` | 0x80 | 0x0 |
| Coinage | `DSW2` | 0x3 | 0x2 |
| Game Time | `DSW2` | 0x1c | 0x0 |
| Bonus Coins | `DSW2` | 0xe0 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/atari/centiped.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 213 commits by 28 contributors, 2007–2024
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Ivan Vangelista, Vas Crabb, AJR

## The story

Arcade Video game published 45 years ago:

Centipede (c) 1981 Atari.

Centipede is a vertically oriented single screen shoot-em-up in which the aim is to use the 'Bug Blaster' to shoot the centipedes that snake down towards the bottom of the screen to amass as high a score as possible. 

The play-field is littered with randomly placed mushrooms and the rapidly descending Centipede changes direction when it runs into a mushroom. When a segment of the Centipede is shot, the segment is destroyed and a mushroom appears in its place, the Centipede then breaks into two smaller centipedes, each with its own head, and continues its descent. 

Players can move the Bug Blaster vertically as well as horizontally, although only for the lower fifth of the play-field. Mushrooms can also be shot for points and to clear blocked areas. Once a Centipede reaches the bottom of the screen, it starts snaking back up, but remains within the lower section of the play-field near the player's Bug Blaster.

Additionally, any Centipede that reaches the very bottom of the screen without being shot releases its tail section which then becomes a new head. Other new heads also enter the screen from the bottom corners of the play-field as time progresses.

Randomly moving Spiders also appear in the first wave. Spiders can destroy any mushrooms they move over, eliminating many mushroom targets for a player. If the Bug Blaster and a Spider collide, both are destroyed. the Spider either moves at a 45-degree angle or vertically up and down, never simply left or right like the centipede does.

A bombardment of Fleas appears from the second wave onward. As a Flea descends, it leaves a trail of new mushrooms behind it. Fleas appear when a certain number of mushrooms remains at the bottom of the screen. This number increases as the game progresses, meaning Fleas appear more often later on in the game. The Bug Blaster must hit a Flea twice to destroy it; the first shot simply speeds up its descent.

When a Centipede with fewer than eleven segments appears, a Scorpion enters from either side, moving at a relatively slow speed. As the player earns more points, the Scorpion's speed increases. As the Scorpion travels across the screen, it 'poisons' the mushrooms that it moves over and changes their colours. These mushrooms cause any Centipedes that would collide with them to head straight towards the bottom of the screen, rather than continue snaking left and right. The Bug Blaster can stop a poisoned Centipede by shooting its head.

If a player earns at least 60,000 points, two things happen to increase the challenge: the Fleas descend at a faster speed and the Spiders restrict their movement to a smaller area at the bottom of the screen.

### Technical
Game ID : 136001

Height: 71 in. (180.34 cm) 
Width: 26.75 in. (67.95 cm) 
Depth: 25.25 in. (64.14 cm) 

Main CPU : MOS Technology M6502 (@ 1.512 Mhz) 
Sound Chips : POKEY (@ 1.512 Mhz) 

Players : 2 
Control : trackball 
Buttons : 1 (FIRE)

### Trivia
The original Upright model of Centipede was released on June 6, 1981 (even though the copyright at the bottom of the screen in the game's attract mode says 1980), selling at an MSRP of $1995. Exactly 46,062 units were produced. It's Atari's second bestselling coin-op game.

It was an Atari coin-operated game that swiftly won a wide following in the arcades. Apart from its smooth game play, Centipede was praised for its refreshing approach to screen colors and for its whimsical mushroom world. 

Centipede was the first coin-op game to be designed by a woman - Dona Bailey. But Ed Logg did the majority of the work on Centipede; Dona only came up with the prototype idea, where the mushrooms were indestructible and it was more like "Space Invaders". Like "Pac-Man", this game has special appeal to women. 

* The Creation of Centipede : Centipede was written by veteran Atari designer Ed Logg, who has become something of a legend in the world of video games, and a young game programmer who was credited with bringing a gentler touch to the world of video games with the enchanted mushroom patch. 

Steve Calfee : 'Ed Logg is the world's greatest games designer. He's done the most, the best games. His line up starts with "Asteroids", which probably still is the biggest run we ever did. He's in [a long line of games]. He's kind of like Pete Rose; he has the most hits and he's also probably got the most strike outs. He just goes up to bat.' 

* Remembrances from the Video Game Masters : The mushroom patch with its tenacious, never-say-die centipedes, bouncing spiders, mushroom-laying fleas and transforming scorpions provided an imaginative leap for players, just as did the hoards of aliens in "Tempest", the outer space adventures of "Asteroids", the eerie battlefields of "Battlezone" and even the frightful scenarios of "Missile Command". Of these times, and the games that emerged from Atari, Rich Adam said : 'We were a young group of fun people who were sort of treading on untrodden territory. We were out exploring what technology could do to entertain adolescent minds, and we were adolescent minds.' 

In the early days of personal computers, before they became commonplace, and before sophisticated gaming programs were available for them, the arcades (and wherever else the coin-operated games were located) were the portals into these new fantasy worlds. And a river of quarters carried players into the electronic realms. Dan Pliskin described the coin-operated video game business as follows : "It was a wacky, extremely competitive business. I was there when coin-operated games were earning $8 billion in quarters a year. These games were out-grossing the record industry and the movie industry combined, in quarters! And when you looked at who was manufacturing these games, it was just a couple of Japanese companies and a few American companies.... There was incredible competition, all for kids' lunch and church money!" 

The quarters are still rolling in. Dan Pliskin continued : "People say that video games have already seen their heyday and business has definitely gone downhill. Maybe it has gone downhill. Maybe it's only $4 billion worth of quarters now. It's still one heck of an industry." 

* Popular from the Start : The prototype games were hand-built, wire-wrapped, one-of-a kinds that were created by the development team prior to ordering the circuit boards for the mass-produced versions. With just a single machine, people would come in at all hours of the night to play a new game. 

Dan Pliskin : 'One of the things that kind of allowed everybody at Atari to have kind of a loose and enjoyable relationship was that management was kind of loose, too. An example of that happened with one of Howard Delman's games. I can't remember which one it was, but we sent the one and only prototype wire-wrapped version of Howie's game off to the AMOA (Amusement and Music Operators Association) show with strict orders not to sell it.' 

Of course the game was sold anyway, and a new prototype had to be assembled back at the labs. Dan Pliskin continued : 'Several months later Howie gets a call from the person who bought this game. It had stopped collecting money and he wanted to know how to change the settings to make it play longer, or something, to see if it would earn more money. Howie had to tell the guy that if it ever collected any money at all, it was a miracle because it didn't have any coin routines at all. It had none, because we had wired it for free-play when we sent it to the AMOA show!' 

* The Great 25-Cent Escape : Especially in the early 1980s a great many newspaper and magazine articles were written about the meaning of and possible consequences of the wave of video games that seemed to allure so many kids, and adults, to the arcades. But at the heart of it might have been the promise of a quick escape into another world. 

Rich Adam : "I kind of figured out, maybe years after the fact, what I think the lure of video games is. It's because people have so little control over their lives. This is especially true with kids, but even adults often have little control over the day-to-day part of their lives. You have to go to work. You don't get to control that much of your life. But for a quarter you can control this very complex machine. You can command it. For a quarter that's quite a bargain, to be able to do that for five minutes... When you're good at a game it gives you an incredible sense of power over the whole environment.". 

Centipede was the 1st UL (Underwriter's Laboratories) approved game. 

Jim Schneider holds the official record for this game on 'Marathon' settings with 16,389,547 points on August 1, 1984. 

Donald Hayes holds the official record for this game on 'Tournament' settings with 7,111,111 points on November 5, 2000. 

Note 1 : The upright side artwork features a grasshopper, while it is not present during game-play. In test mode you can cycle through the different graphical objects used in the game (the player, a mushroom, a spider, a scorpion, a flea and a grasshopper). Grasshopper?! Yes, the game was to originally have had grasshoppers but they were taken out. You can still see them in the test however. 

Note 2 : 'Centipede' is also the name of a terrifying, man-eating monster of the size of a mountain. This Japanese legend say that the dragon king of that particular lake asked the famous hero Hidesato to kill it for him. The hero slew it by shooting an arrow, dipped in his own saliva, into the brain of the monster. The dragon king rewarded Hidesato by giving him a rice-bag; a bag of rice which could not be emptied and it fed his family for centuries. 

Centipede inspired a catchy hit song by Buckner and Garcia called 'Ode To A Centipede' released on the 'Pac-Man Fever' album. 

The default high score screen of "Cyberball 2072" features names of many Atari arcade games, including CENTIPED. 

A Centipede unit appears in the 1982 movie "Fast Times at Ridgemont High", in the 1983 movie "WarGames", in the 1983 movie "James Bond 007 - Never Say Never Again", in the 1983 movie "Joysticks", in the 1984 movie "Body Double", in the 1985 movie "Teen Wolf", in the 1986 movie "Running Scared", in the 1987 movie "Death Wish 4 - The Crackdown", in the 1995 movie "Species" and in the 1996 movie 'House Arrest'. 

In 1982, Atari released a set of twelve collector pins including : "Missile Command", "Battle Zone", "Tempest", "Asteroids Deluxe", "Space Duel", "Centipede", "Gravitar", "Dig Dug", "Kangaroo", "Xevious", "Millipede" and "Food Fight". 

MB (Milton Bradley) released a boardgame based on Atari's Centipede. 

A Reimagined version of the Centipede franchise, was launched for the Nintendo 3DS and Nintendo Wii under name of "Centipede Infestation".

### Scoring
Mushrooms & Poisoned Mushrooms : 1 point (Takes four hits to destroy) 
Centipede (Body) : 10 points 
Centipede (Head) : 100 points 
Flea : 200 points (Takes two hits. First hit speeds it up, second hit destroys it) 
Spider : 300, 600, 900 points (Points increase the closer the Spider is to the Bug Blaster when hit) 
Scorpion : 1,000 points 

When the mushroom patch is reset after a player loses a life, each partially destroyed/poisoned mushroom that is restored awards the player 5 bonus points.

### Tips and tricks
* When you start the game, you will be put in the middle at the bottom of the screen. You have an area five mushrooms high (about 20% of the playing area) to maneuver your Bug Blaster in. The game will start when the enemies enter the screen. Know your enemies! This is the single most important aspect of this game. If you don't know how each of the enemies behave, you won't last long. The enemies are : 

1) Centipede (Body and Head) : Goes back and forth across the screen. Will drop to the next level when it encounters a mushroom or the side of the game field. It will go all the way to the bottom when it hits a poisoned mushroom. 

2) Spider : These appear from the top left or right of the player area. They will either bounce across the player's area at 45-degree angles or bounce in at a 45-degree angle, bounce up and down a couple of times, go to the middle at a 45-degree angle, bounce up and down a couple of times, then finally go to the right side (at a 45-degree angle), bounce up and down, then exit the area. They destroy mushrooms they cross over. 

3) Flea : These appear in Wave 2. They will appear when you have cleared out most of the mushrooms in the player area.

4) Scorpion : These appear in Wave 3. They go across the screen and poison all the mushrooms in their path. 

* The Centipede will start out as a head and eleven body segments on Wave 1. Wave 2 will be a head with ten body segments and a head that enters from the opposite side. Wave 3 will be a head with nine body segments and two heads that enter from opposite sides. This progression keeps going until Wave 12 when all that enter the screen are heads. The progression then starts back up again in a never ending cycle. 

* You must eliminate the Wave 1 Centipede only once. Then, until you score reaches 40,000 points, you must destroy each subsequent Centipede wave twice--first as the Centipede moves slowly towards you, then as it moves fast. After your score reaches 40,000 points, each Centipede will only need to be destroyed once. 

* Shooting the Centipede can have two effects : 

1) If you shoot the head, that part turns into a mushroom and the next segment becomes the new head and the Centipede will travel in the opposite direction (since it hit the newly-created mushroom). 

2) If you shoot the middle of the body, then the segment hit will become a mushroom. The old Centipede will continue in the same direction. The new Centipede will develop a head at the next segment after the break and head off in the opposite direction. 

* A good strategy to ensure you destroy the Centipedes in one stroke and to keep the Fleas at bay is to create 'mushroom corridors'. Mushroom corridors are basically corridors between two rows of mushrooms where you can funnel the Centipede down and destroy it when it is moving head-first at your Bug Blaster. 

* A good defense against the Flea is to keep a certain amount of mushrooms on the screen. There is no hard set value but when the Fleas don't come down, you have enough. This number gets higher as your score increases. 

* Speaking of score, Fleas start traveling faster after 60,000 points. 

* Watch out for the Spiders. They enter at either the top or bottom corners. Your Bug Blaster may be in the way if this happens. In addition to collisions, the Spiders wipe out all mushrooms that are in its path. This can create problems when you are creating mushroom corridors. It can also cause the Fleas to appear since you won't have many mushrooms in the player area. 

* Spiders are unpredictable, so be careful. Sometimes they pounce using long, high leaps and sometimes it bounces in a series of short jumps. Aim your shots and plan your moves based on where the Spider is, and not where you think it is going.

* Remember that Spiders never turn back. Once one passes your Bug Blaster on its journey from one side of the mushroom patch to the next, you can ignore it. If the Spider emerges from the right side of the screen, it will work its way toward the left side of the screen, and vice versa. It may pause along its way to bounce straight up and down, but it will never reverse direction.

* Blast the Fleas! They are relatively easy to pick off, especially once you get good at moving your Bug Blaster smoothly across the bottom of the screen. Be careful, though! It takes two shots to kill a Flea and after the first hit the falling speed increases.

* Blast the Fleas as soon as you can. Stop them from laying mushrooms because you'll just have to blast them out of the way later. The more mushroom on the screen (especially in the player area), the more quickly the Centipedes work their way to the bottom. 

* If you don't like Fleas, always leave five mushrooms in your area (out of your line of fire). Fleas stop falling when there are five or more mushrooms in the player area. But be on the lookout for Spiders. They destroy mushrooms and if the count drops below five, the Fleas start falling again.

* Keep track of where the Scorpions move across the screen. As soon as the Centipede hits a poisoned mushroom, it will immediately head for the bottom of the screen. The only way to stop this headlong plunge is to shoot it in the head. In the later waves, it is not uncommon to have multiple Scorpions going across the screen. They also provide the most points in the game, but they are hard to get. Often rows of mushrooms protect them. 

* Play the cycles. As the waves progress and more Centipede segments are entering the mushroom patch as independent heads, put more effort into blasting the heads than into chasing Fleas and Spiders. If your area gets too crowded with Centipede heads, you'll have to move your Bug Blaster with exceptional speed and smoothness to stay alive.

* If you get unlucky and let the Centipede into your area, you need to destroy it before it gets to the bottom of the player area. Once it reaches the bottom, it will ascend (it will never leave the player area, though). If it does reach the bottom of the player area, another head will come out from the opposite side to start its back and forth march across the screen. This will continue until you destroy all the Centipede parts in the player area or until your Bug Blaster is destroyed.

* If your Bug Blaster gets destroyed, all partially shot up mushrooms are regenerated, all poisoned mushrooms are restored to normal, and you start at the beginning of the wave you got killed on. 

* Depending on machine set up, all enemies (except the Centipede and Flea) speed up at the 1,000 or 5,000 point mark. 

* Bottom Side Tunnels : To perform this trick, you must do the following... 

1) When the Centipede is one row over the player's area (fifth mushroom up), go to the opposite side that the Centipede is on. 

2) When the Centipede turns around, it will be in the player's area. It then will make it to the side you are on. Right when it hits the side of the screen and turns around, shoot it. This creates a mushroom and forces the Centipede to turn around and go down one level. 

3) Again, after the Centipede hits the wall, shoot it, create a mushroom, and force it down another level. 

4) Continue to do this until you have only the bottom part left. There are two ways to do this : 
a) If you get killed by the Centipede, this will also create a mushroom and you will have a vertical line of mushrooms along one of the side. 
b) If you are quick, you can pick off the Centipede and create this last mushroom. 

5) Repeat this for the other side. 

6) Regardless of how you create this 'Side Tunnel', you will now have a trapped Centipede since the only thing it can do is go up and down within the player's area. New heads that come out will also be trapped. 

7) Now you can pick off enemies at your leisure. The only enemy you need to make sure you take out is the Spider since it can wipe out part of your 'Side Tunnel'. 

8) Good players consider this 'cheating' since it basically lets the player have free reign over the game. 

* Central Tunnel : This trick works along the same line as the 'Bottom Side Tunnel' trick. The difference is that you create a tunnel down the center of the screen... 

1) When the Centipede starts its descent, hit it. This will cause it to reverse direction after hitting the new mushroom. 

2) After going one or two mushroom lengths, hit it. Again, this will cause it to reverse direction. 

3) Continue to do this until you have built a 'tunnel' that touches the player's area. 

4) Also make sure you build up mushrooms to the left and right of the tunnel to prevent the Fleas from coming down and depositing their random mushrooms. 

5) From this point on, when the Centipede approaches your tunnel, all it will take is one hit to force it to descend. In a sense, you are causing the same effect that a Scorpion causes, but on your terms. 

6) Since you are keeping the top left and right areas clear, it should take a longer time for the individual heads to make it to the player's area. 

7) It will take a few waves to build up your areas. Once built up, you should be the master of the game. 

8) As for the other tunnel, make sure you take care of the Spiders when they first enter so they don't do any damage to your 'Central Tunnel'. 

9) Also make sure that you keep your tunnel cleared out by destroying any stray mushrooms within it. 

* Fortress : If you are patient, you could build a mushroom fortress around your Bug Blaster. Then all you would do is shoot Spiders for the rest of the game.

### Staff
Designed & Programmed By : Dona Bailey (DCB), Ed Logg (ED )
Project leader: Chris Downend (CAD)
Technician : Dave Wiebenson (DEW)
Management : Erik Durfey (EJD), Don Wrightnour (DFW)
Support programmer : Dave Theurer (DFT), Greg Rivera (GJR)

### Ports
* CONSOLES: 
[US] Atari 2600 (1982) "Centipede [Model CX2676]"
[EU] Atari 2600 (1982) "Centipede [Model CX2676P]"
[JP] Atari 2600 (oct.1983) 
[US] Atari 5200 (1982) "Centipede [Model CX5215]"
Atari XEGS 
[US] Colecovision (1983) "Centipede [Model 70004]" 
[US] Mattel Intellivision (1983) "Centipede [Model 70254]"
[US] Atari 7800 (1987) "Centipede [Model CX7801]" 
[EU] Sega Master System (1992) "Arcade Smash Hits [Model MK-27032-50]" 
[US] Sega Genesis (1996) "Arcade Classics [Model MK-1715]" 
[EU] Sega Mega Drive (1996) "Arcade Classics [Model MK-1715-50]" 
[US] Sony PlayStation (dec.31, 1996) "Arcade's Greatest Hits - The Atari Collection 1 [Model SLUS-00339]" 
[EU] Sega Saturn (1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model T-25413H-50]" 
[US] Sega Saturn (june.30, 1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model T-9706H]" 
[EU] Sony PlayStation (dec.1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model SLES-00466]" 
[US] Nintendo SNES (aug.1997) "Arcade's Greatest Hits - The Atari Collection 1 [Model SNS-AW7E-USA]" 
[EU] Nintendo SNES (feb.26, 1998) "Arcade's Greatest Hits - The Atari Collection 1 [Model SNSP-AW7P-EUR]" 
[US] Sony PlayStation (2001) "Atari Anniversary Edition Redux [Model SLUS-01427]" 
[US] Sega Dreamcast (jul.2, 2001) "Atari Anniversary Edition [Model T-15130N]" 
[EU] Sony PlayStation (mar.1, 2002) "Atari Anniversary Edition Redux [Model SLES-03808]" 
[US] Microsoft XBOX (nov.16, 2004) "Atari Anthology [Model 26084]" 
[US] Sony PS2 (nov.22, 2004) "Atari Anthology [Model SLUS-21076]" 
[EU] Microsoft XBOX (nov.26, 2004) "Atari Anthology" 
[EU] Sony PS2 (feb.18, 2005) "Atari Anthology [Model SLES-53061]" 
[JP] Microsoft XBOX (aug.4, 2005) "Atari Anthology [Model B7X-00001]"
[US] [EU] Microsoft XBOX 360 [XBLA] (may.2, 2007) "Centipede / Millipede" 
[US] Sony PlayStation 4 (oct.18,2016) "Atari Flashback Classics Vol.1" 
[US] [EU] Microsoft XBOX One (nov.1,2016) "Atari Flashback Classics Vol.1" 

* HANDHELDS: 
[US] Atari Lynx : Prototype only
[EU] Nintendo Game Boy (1992) "Centipede [Model DMG-CZ-FRG]" 
[US] Nintendo Game Boy (dec.1992) "Centipede [Model DMG-CZ-USA]"  
[US] Nintendo Game Boy (aug.1995) "Arcade Classic No. 2 - Centipede & Millipede [Model DMG-ACPE-USA]"
[UK] Nintendo Game Boy (aug.1995) "Arcade Classic No. 2 - Centipede & Millipede [Model DMG-ACPP-UKV]"
[US] Sega Game Gear (1996) "Arcade Classics" 
[US] Nintendo Game Boy (1998) "Centipede [Model DMG-AC4E-USA]" 
[US] Nintendo Game Boy Color (1998) "Centipede [Model DMG-AC5E-USA]" 
[EU] Nintendo Game Boy Color (nov.30, 1998) "Centipede [Model DMG-AC5P-EUR]" 
[US] Nintendo GBA (mar.25, 2002) "Atari Anniversary Advance [Model AGB-AAVE-USA]" 
[EU] Nintendo GBA (feb.14, 2003) "Atari Anniversary Advance [Model AGB-AAVP-EUR]" 
[UK] Nintendo DS (mar.11, 2005) "Retro Atari Classics [Model NTR-ATAE-UKV]" 
[EU] Nintendo DS (mar.11, 2005) "Retro Atari Classics [Model NTR-ATAE-EUR]" 
[US] Nintendo DS (mar.16, 2005) "Retro Atari Classics [Model NTR-ATAE-USA]" 
[JP] Nintendo DS (june.30, 2005) "Atarimix Happy 10 Games [Model NTR-ATAJ-JPN]" 
[US] Nintendo GBA (aug.21, 2005) "3 Games in One! Breakout - Centipede - Warlords [Model AGB-B6ZE-USA]" 
[EU] Nintendo GBA (sept.9, 2005) "3 Games in One! Breakout - Centipede - Warlords [Model AGB-B6ZP]" 
[AU] Nintendo DS (nov.2007) "Retro Atari Classics [Model NTR-ATAE-AUS]" 
[US] Sony PSP (dec.19, 2007) "Atari Classics Evolved [Model ULUS-10325]" 
[AU] Sony PSP (mar.7, 2008) "Atari Classics Evolved" 
[US] Nintendo DS (nov.2, 2010) "Atari Greatest Hits Vol.1 [Model NTR-BR6E-USA]" 
[EU] Nintendo DS (feb.24, 2011) "Atari Greatest Hits Vol.1 [Model NTR-BR6P-EUR]" 

* COMPUTERS: 
[US] Atari 800 (1982) "Centipede [Model CXL4020]" 
[EU] BBC Micro (1982) 
[US] Tandy Color Computer (1982) "Katerpillar Attack" 
[US] Tandy Color Computer (1982) "Caterpillar" 
[US] Tandy Color Computer (1982) "Colorpede" 
[US] Tandy Color Computer (1983) "Megapede" 
[US] Tandy Color Computer (1983) "Color Caterpillar" 
[US] Apple II (1983) 
[US] PC [Booter] (1983) "Bug Blaster" : A part of the "Friendlyware PC Arcade" suite 
[US] PC [MS-DOS, 5.25"] (1983) "Centipede" 
[US] PC [MS-DOS] (1983) "Centipede" : Unlicensed version by R. J. Grafe 
[US] Commodore VIC-20 (1983) 
[EU] Commodore C64 (1983) 
[US] Commodore C64 (1983) "Centipede [Model RX8505]" 
[EU] Memotech MTX 512 (1983) "Kilopede" 
[EU] BBC B (1983) "Bug Blaster" by Alligata 
[US] TI99/4A (1983) "Centipede [Model RX8503]" 
[EU] Sinclair ZX-Spectrum (1983) Vectis Software 
[EU] Sinclair ZX-Spectrum (1983) "Spectipede" by R&R Software Ltd 
[EU] Sinclair ZX Spectrum (1983) "Centi-Bug" by Dk'tronics 
[EU] Amstrad CPC (1986) "Killapede" by Players 
[EU] Atari ST (1992) 
[US] PC [MS Windows 3.1x, 3.5"] (1993) "Microsoft Arcade" 
PC [MS-DOS] (1997) "ChampCentiped-em" by CHAMProgramming 
[EU] PC [MS Windows, CD-ROM] (1999) "Atari Arcade Hits 1" 
[US] PC [MS Windows, CD-ROM] (jul.13, 1999) "Atari Arcade Hits 1" 
[US] PC [MS Windows, CD-ROM] (jul.9, 2001) "Atari Anniversary Edition" 
[EU] PC [MS Windows, CD-ROM] (dec.14, 2001) "Atari Anniversary Edition" 
[US] PC [MS Windows, CD-ROM] (2003) "Centipede & Battlezone" 
[US] PC [MS Windows, CD-ROM] (nov.11, 2003) "Atari - 80 Classic Games in One! [Model 25069J]" 
[EU] PC [MS Windows, CD-ROM] (june.10, 2005) "Atari - 80 Classic Games in One! [Replay]" 
[US] Steam (mar.24,2016) "Atari Vault [Model 400020]" 

* OTHERS: 
[US] Tiger Game.Com (1999) [Model 71-755] 
Mobile phone [Motorola T720] (2002) 
[US] Mobile phone (june.13, 2003) by iFone Limited 
[US] Mobile Phones (jan.1, 2005) "Atari Legends Vol 1" 
[US] Nokia N-Gage (feb.2006) "Atari Masterpieces Vol. II" 
[EU] Nokia N-Gage (mar.30, 2006) "Atari Masterpieces Vol. II" 
[US] Mobile phones (2006) 
[US] Apple iPhone/iPod (dec.5, 2008) "Centipede [Model 298862196]" 
[US] Apple iPhone/iPod (jul.27, 2010) "Centipede 3GS [Model 382292863]" 
[US] Apple iPhone/iPod (feb.9, 2011) "Centipede Ultra [Model 416011864]" 
[US] Apple Store (2012) "Atari Greatest Hits" 
[US] Google Play (2012) "Atari Greatest Hits"

### Series
1. Centipede (1981) 
2. Millipede (1982) 
3. Centipede (1998, PC CD-ROM; 1999, PlayStation/Dreamcast; 2001, Apple Macintosh)
4. Centipede Infestation (2011, Wii/3DS) 
5. Centipede Origins (2012, App Store/Android)

### Contribute
Edit this entry: https://www.arcade-history.com/game/427/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `centiped`. Play it at [../../../app/g/centiped/](../../../app/g/centiped/) or [explore the knowledge graph](viewer.html).*
