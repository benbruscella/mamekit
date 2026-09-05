# Frogger

**Konami · 1981** — transpiled from the MAME driver `src/mame/galaxian/galaxian.cpp` by mamekit.

![marquee](/artwork/media/marquees/frogger.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/frogger.webp) | ![cabinet](/artwork/media/cabinets/frogger.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 3.072 MHz | 11 |
| `audiocpu` | Z80 | 1.790 MHz | 3 |

- **Sound:** ay8910 × 1 @ 1.790 MHz
- **Screen:** 256×224 @ 60.61 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `frogger.26` | 0x0 | 0x1000 | `597696d6` |
| `maincpu` | `frogger.27` | 0x1000 | 0x1000 | `b6e6fcc3` |
| `maincpu` | `frsm3.7` | 0x2000 | 0x1000 | `aca22ae0` |
| `audiocpu` | `frogger.608` | 0x0 | 0x800 | `e8ab0256` |
| `audiocpu` | `frogger.609` | 0x800 | 0x800 | `7380a48f` |
| `audiocpu` | `frogger.610` | 0x1000 | 0x800 | `31d7eb27` |
| `gfx1` | `frogger.607` | 0x0 | 0x800 | `05f7d883` |
| `gfx1` | `frogger.606` | 0x800 | 0x800 | `f524ee30` |
| `proms` | `pr-91.6l` | 0x0 | 0x20 | `413703bf` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 9 | service1 | `IN0` | 0x4 |
| Right | joystick right | `IN0` | 0x10 |
| Left | joystick left | `IN0` | 0x20 |
| 6 | coin2 | `IN0` | 0x40 |
| 5 | coin1 | `IN0` | 0x80 |
| 2 | start2 | `IN1` | 0x40 |
| 1 | start1 | `IN1` | 0x80 |
| Up | joystick up | `IN2` | 0x10 |
| Down | joystick down | `IN2` | 0x40 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `IN1` | 0x3 | 0x0 |
| Coinage | `IN2` | 0x6 | 0x0 |
| Cabinet | `IN2` | 0x8 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/galaxian/galaxian.cpp`
- **Written by:** Aaron Giles, Couriersud, Stephane Humbert, Robbbert
- **License:** BSD-3-Clause
- **Development:** 659 commits by 49 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Ivan Vangelista, Miodrag Milanovic, ClawGrip, David Haywood

## The story

Arcade Video game published 45 years ago:

Frogger (c) 1981 Konami Industry Company, Limited.

Frogger is a one or two-player game in which players must overcome a number of hazards to safely guide the green amphibian from the bottom of the screen to one of five home bases situated at the top of the screen.

The lower half of the screen consists of a bi-directional flow of traffic moving across five lanes. To navigate across the road safely, Frogger's hops must be timed to avoid the vehicles, which include buses, civilian traffic and racing cars, with different vehicle types moving at different speeds. As well as being able to hop vertically, Frogger can also move left and right, allowing him to move with the flow of traffic. 

The upper half of the screen consists of a fast-flowing river populated with logs, crocodiles and turtles. Frogger will drown if he has any contact with the water and these act as platforms onto which Frogger can hop. He must be careful to avoid contact with crocodiles' snapping jaws, however and some of the turtles will periodically dive below the water's surface, drowning Frogger. Frogger will also die if he is on a log, turtle or crocodile when it reaches the edge of the screen.

On the logs of the river section a female frog will occasionally appear and bonus points are awarded if Frogger successfully escorts her safely home. A fly also appears randomly in a home base and bonus points are awarded if Frogger enters the base when the fly is present. Conversely, a crocodile may also appear in a home base and a life is lost if Frogger enters the base while the crocodile is present.

A round is completed once five frogs have been guided safely home, after which the next round begins with an increased level of difficulty. This includes faster-moving vehicles on the road section and new, deadly hazards on the river section, including crocodiles, otters and snakes.

### Technical
Game ID : GX392

Main CPU : Zilog Z80 (@ 3.072 Mhz)
Sound CPU : Zilog Z80 (@ 1.78975 Mhz)
Sound Chips : General Instrument AY8910 (@ 1.78975 Mhz)

Players : 2
Control : 4-Way Joystick

### Trivia
Frogger was released by Konami in June 1981 in Japan; it became a runaway hit. 

1981 was a big year in video games. A lot of companies were putting some pretty popular games on the market and it created a very competitive atmosphere as to what company was putting out the most popular ones. In addition, 1981 continued on the trend of the 'cute' type games such as "Ms. Pac-Man", "Qix", and a host of Pac-Man clones. Konami was already becoming a force to be reckoned with in the video gaming world. With such hits as "Space War", "Scramble", and "Super Cobra", Konami was making its mark. 

The sound that can be heard when a coin is inserted into the machine was sampled by producer Richard X for the Sugababes' song, 'Freak Like Me' (and is the very first sound on the track). 

Frogger has numerous bugs, although many of these are not immediately apparent to the average player : 
1. Sections of the music will occasionally cut out, although the main melody will continue to play. 
2. On occasion, Frogger displays a somewhat haphazard approach to collision detection. One side effect of this is that the player can sometimes make a perfectly legal and safe jump and still lose a life. Another side effect of this is that the player can jump up onto the first row of turtles, and then immediately jump back. This will place the player 'off the grid', and it is now possible to jump right off the side of the screen, leading to a loss of life. 
3. There are several other odd jumps that can be made as well. Firstly, the player can 'hang off' the left side of a turtle, but attempting to do the same on the right side results in death. If the player jumps onto a home base with an alligator (and the 'gator vanishes after you jump, but before the player lands), Frogger will be killed, but he will ALSO make it home. Finally, left and right jumps on the top row of logs are sometimes much slower than usual - this is more likely to occur after previously eating a fly. 
4. Another in-game bug is that the lady frog will sometimes be invisible, but will flash red when the player jumps onto the spot where she is. 

Mark Robichek holds the official record for this game with 442,330 points. 

A Frogger unit appears in the 1999 movie 'Magnolia' and the sitcom 'Two and a Half Men'; Season 5, Episode 2 (People Who Love Peepholes). 

Frogger inspired a catchy hit song by Buckner and Garcia called 'Froggy's Lament' released on the 'Pac-Man Fever' album. 

The TV show, Seinfeld, has an episode named 'The Frogger'. George and Jerry are in Mario's Pizza which is closing down, and they find a Frogger game still there. They realize that the high score of 860,630 points has George's initials GLC [George Louis Costanza]. They reminisce about the night it happened : "I was unstoppable!... Just the right amount of grease on the joystick". George decides to buy the Frogger machine to immortalize his high score, but Jerry informs him that unplugging the game will erase all of the scores. Later, George tries in vain to call an electrician to help : "I need a guy that can rig a Frogger machine so that I can move it without losing power, 'cause I have the high score. H-hello?". Kramer suggests an electrician who can help. George says, "Kramer, listen to me. I'm never gonna have a child. If I lose this Frogger high score, that's it for me". George assembles a team and hatches a plan to salvage the game. But when he arrives, he finds the team playing the game, which has only three minutes of battery life left. They can't get it back in the closed pizzeria, but there is an open pharmacy across the street where it could be plugged in. George decides to push the machine across the highway, and an overhead shot of this feat looks much like the Frogger game itself, and the music from the game is played. At the end, George is unable to push the game onto the sidewalk and it gets destroyed by an oncoming truck. 

MB (Milton Bradley) released a board game based on this video game (same name) the same year, 'One Wrong Leap Will Get You Squished And Splattered' : in this version of the game, 2 players face off, each with their own army of frogs, logs, and automobiles. Each turn, a player spends his movement points either moving his frogs toward their goal (the other side of the board), or moving logs and cars in an attempt to block or squash the other player's frogs. Complete with 'bonus points' for landing on flies, this is actually a pretty faithful interpretation of the video-game, but far too simple to have any long-lasting interest. More of a curiosity for video game enthusiasts than anything. 

Frogger also spawned a cartoon series of the same name : Ruby-Spears Productions. Produced By Joe Ruby, Ken Spears. Originally aired September 17, 1983 as part of 'Saturday Supercade' on CBS. 

Michael Jackson used to own this game. It was sold at the official Michael Jackson Auction on April 24, 2009.

The main character appears on the 2012 animation movie "Wreck-It Ralph" from Walt Disney Animation Studios.

### Scoring
Forward Hop : 10 points (max points per home is 100)
Frog Safely Put in Home : 50 points
Completing a Level : 1,000 points
Bringing a Lady Frog to Your Home : 200 points
Eating a Fly : 200 points

You also get a time bonus of 10 x the remaining seconds added to your score.

### Tips and tricks
* When you start the game, your frog will start at the bottom of the screen. You will have 60 seconds to move your frog up 10 spaces and successfully put it in one of the homes. If you are successful, then you will try to put another frog in another home and so on until you fill up all five homes with frogs. When you do this, you progress to the next level. 

* Note the traffic flow of the two parts. The cars travel on the roadway while the logs, turtles, crocodiles, etc. travel on the water lanes in the following direction : 
a) Lanes #1, #3, and #5 go from right to left. 
b) Lanes #2 and #4 go from left to right. 

* First, you must cross the highway. You will become roadkill if a vehicle hits you or you hit a vehicle. Try to find 'lanes' in between the vehicles. You must plan for gaps to form in the first three lanes so you don't become trapped. The vehicles in the first three lanes move slowly enough that you can jump side to side with reasonable safety. 

* Lane #4 is the dangerous lane. Depending on how much time you are taking, the cars may pick up speed even though it shows slow on the chart. Keep this in mind when you are moving your frog. 

* At level 3, a snake will either be in the median or on the log in water lane #3. The snake is deadly to your frog and you cannot hop over it. 

* The turtles are pretty easy to navigate over in water lanes #1 and #4. Be wary of the diving turtles and only use them as a quick bypass to a more solid footing. If your frog is on a diving turtle when it dives, your frog will drown. 

* Again, time your jumps to coincide with the logs and turtles to ensure you will always have a solid footing to jump to. As the levels progress, you will have less things you can jump to. 

* You can jump on the backs of the crocodiles and otters. Just don't get near their mouths or they are apt to turn your frog into a meal. 

* You may see a purple lady frog hopping around on a log in water lane #2. Just cross over her to give her a piggyback ride to your home and get an extra 200 points. 

* Watch out for the snakes, they sometimes like to ride on the logs. If you see a snake on a log, jump back to solid footing. 

* Your frog cannot 'wrap-around' the screen so make sure you bail off before that footing disappears off the edge of the screen or your frog will come out the other side in a squished condition. 

* By that same token, if you have the time and necessary footing, you can hold out until the fly appears in your home before you settle your frog in. That's another 200 points. 

* Try to fill in the two end homes before going for the middle. The hardest home to get into is the left-hand one (home #1) since everything in water lane #5 goes from right to left. This means you may have to bounce back to water lane #4 so you can get a good shot at your home. 

* Speaking of getting your frogs into their homes, you must hit exact center or your frog will die. Also, keep in mind that crocodiles like to randomly appear in your home. Make sure that your home is clear before trying to settle your frog down into it. 

* Again, if you waste too much time, the things on the river will move quicker so you will have to adjust your strategy accordingly. 

* When the game is playing in attract mode, you can control the frog. When the frog reaches water lane #4, you can control the frog's movements until you move either up or down. 

* If you jump into your home at the same time the crocodile is leaving your home, you will be credited with making to your home but you will still lose a frog in the process. 

* You can dangle your frog from the left side of the turtles but not the right side. 

* Your side-to-side movements in water lane #5 may be slow and sluggish. 

* The lady frog will sometimes be invisible. In this case, the only time you know she's there is when you jump on her. She will then ride on your back to your home.

### Ports
* CONSOLES: 
[EU] Magnavox Odyssey 2 (1982) 
[BR] Magnavox Odyssey 2 (1984) 
[AU] Atari 2600 (1990) "2 Pak Special: Star Warrior & Frogger"
[EU] [JP] Microsoft XBOX 360 [XBLA] (jul.12, 2006) 

* HANDHELDS: 
[EU] Nintendo Game Boy Color (1997) "Frogger [Model DMG-AFRP-EUR]" 
[JP] Nintendo GBA (may.2, 2002) "Konami Arcade Game Collection [Model AGB-AKCJ-JPN]" 
[EU] Nintendo GBA (june.21, 2002) "Konami Collector's Series - Arcade Classics [Model AGB-AKCP-EUR]" 

* COMPUTERS: 
[EU] Sinclair ZX 81 (1981) by Sega 
[EU] BBC Micro (1982) by A&F Software 
[EU] BBC Micro (1983) "Froggy" by Superior Software 
[EU] Commodore C64 (1983) 
[EU] Sinclair ZX Spectrum (1983) by Rabbit Software 
[EU] Sinclair ZX Spectrum (1983) "Froggy" by DJL Software 
[JP] Tomy Tutor (1983)
[JP] MSX (dec.1983) "Frogger [Model RC704]" 
[EU] Acorn Electron (1984) "Hopper" 
[EU] Amstrad CPC (1985) "Froggy" by R&B Software 
[EU] Oric I (1983) "Hopper" by PSS (Personal Software Services)
[JP] Sharp X68000 (1991) 

* OTHERS: 
VFD handheld game (19??) by Computer Games Limited
[JP] VFD handheld game by Gakken

### Series
1. Frogger (1981)
2. Frogger II - Three Deep (1984, Colecovision)
3. Frogger [Unreleased Prototype] (1991, Sega Game Gear)
4. Frogger [3D remake] (1997, Sony PlayStation, PC CD-ROM)
5. Frogger 2 - Swampy's Revenge (2000, PC CD-ROM, Sony PlayStation, Sega Dreamcast)
6. Frogger's Adventures Temple of the Frog (2001, Nintendo Game Boy Advance)
7. Frogger's Adventures 2 - The Lost Wand (2002, Nintendo Game Boy Advance)
8. Frogger - The Great Quest (2002, PC CD-ROM, Sony PS2)
9. Frogger Beyond (2003, PC CD-ROM, Microsoft XBOX, Nintendo GameCube)
10. Frogger's Adventures: The Rescue (2003, PC CD-ROM, Nintendo GameCube, Sony PS2)
11. Frogger - Ancient Shadow (2005, Microsoft XBOX, Sony PlayStation 2, Nintendo GameCube)
12. Frogger Helmet Chaos (2005, Nintendo DS, Nintendo GameCube, Sony PS2)
13. My Frogger Toy Trials (2007, Nintendo DS)
14. Frogger - Hyper Arcade Edition (2012, PSN)

### Contribute
Edit this entry: https://www.arcade-history.com/game/879/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `galaxian`. Play it at [../../../app/g/frogger/](../../../app/g/frogger/) or [explore the knowledge graph](viewer.html).*
