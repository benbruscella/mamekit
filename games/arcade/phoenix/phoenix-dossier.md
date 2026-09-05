# Phoenix (Amstar, set 1)

**Amstar · 1980** — transpiled from the MAME driver `src/mame/phoenix/phoenix.cpp` by mamekit.

![marquee](/artwork/media/marquees/phoenix.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/phoenix.webp) | ![cabinet](/artwork/media/cabinets/phoenix.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | I8085A | 5.500 MHz | 8 |

- **Sound:** discrete @ 5.500 MHz
- **Screen:** 256×208 @ 61.04 Hz · rotated 90°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `ic45` | 0x0 | 0x800 | `9f68086b` |
| `maincpu` | `ic46` | 0x800 | 0x800 | `273a4a82` |
| `maincpu` | `ic47` | 0x1000 | 0x800 | `3d4284b9` |
| `maincpu` | `ic48` | 0x1800 | 0x800 | `cb5d9915` |
| `maincpu` | `h5-ic49.5a` | 0x2000 | 0x800 | `a105e4e7` |
| `maincpu` | `h6-ic50.6a` | 0x2800 | 0x800 | `ac5e9ec1` |
| `maincpu` | `h7-ic51.7a` | 0x3000 | 0x800 | `2eab35b4` |
| `maincpu` | `h8-ic52.8a` | 0x3800 | 0x800 | `aff8e9c5` |
| `bgtiles` | `ic23.3d` | 0x0 | 0x800 | `3c7e623f` |
| `bgtiles` | `ic24.4d` | 0x800 | 0x800 | `59916d3b` |
| `fgtiles` | `b1-ic39.3b` | 0x0 | 0x800 | `53413e8f` |
| `fgtiles` | `b2-ic40.4b` | 0x800 | 0x800 | `0be2ba91` |
| `proms` | `mmi6301.ic40` | 0x0 | 0x100 | `79350b25` |
| `proms` | `mmi6301.ic41` | 0x100 | 0x100 | `e176b768` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 5 | coin1 | `IN0` | 0x1 |
| 1 | start1 | `IN0` | 0x2 |
| 2 | start2 | `IN0` | 0x4 |
| Space / X | button1 | `CTRL` | 0x1 |
| Right | joystick right | `CTRL` | 0x2 |
| Left | joystick left | `CTRL` | 0x4 |
| Z | button2 | `CTRL` | 0x8 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Lives | `DSW0` | 0x3 | 0x0 |
| Bonus Life | `DSW0` | 0xc | 0x0 |
| Coinage | `DSW0` | 0x10 | 0x0 |
| Unknown | `DSW0` | 0x20 | 0x20 |
| Unknown | `DSW0` | 0x40 | 0x40 |
| Cabinet | `CAB` | 0x1 | 0x0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/phoenix/phoenix.cpp`
- **Written by:** Richard Davies
- **License:** BSD-3-Clause
- **Development:** 192 commits by 33 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Ivan Vangelista, Vas Crabb, David Haywood

## The story

Arcade Video game published 46 years ago:

Phoenix (c) 1980 Amstar.

Phoenix is a classic vertical shoot-em-up in the mould of Taito's "Space Invaders" and Namco's "Galaxian", but takes the concept further with the introduction of progressive stages of play (instead of simply repeating a single playfield over and over with an increasing difficulty level). 

The player pilots a lone ship that can only move left and right along the botton of the playfield and fire upwards. The ship can also utilize a temporary 'Force Field' to protect it from missiles and birds. Any birds that that collide with the Force Field are destroyed. The Force Field only lasts for two seconds, but then cannot be used again for another five seconds. 

There are five attack waves to each round of play. 

The first wave begins with a formation of sixteen birds attacking the player's ship. They drop missiles and dive at the ship in an effort to destroy it. 

The second wave is a variation of the first, only with a different enemy attack pattern. 

The third wave begins with pattern of eight eggs that hatch into blue Phoenix birds that then attack the player's ship. These birds can be destroyed by rocket fire from the ship. If the rocket hits the bird on center, the bird is destroyed. If the rocket hits the bird to the left or right of center, only that wing of the bird is destroyed. The wing will regenerate itself if the bird is not quickly destroyed. 

The fourth wave is similar to the third, only with two banks of eggs instead of one. 

The fifth and final wave is the attack of the Space fortress mothership; a huge mothership piloted by a purple-coloured Alien Queen who sends down waves of small birds to attack the player's ship, as well as launching missiles from the mothership itself. The Alien Queen is protected by a barrier that must be shot several times before both the Queen and the mothership are destroyed.

Once the mothership has been destroyed, the game starts over with an increased level of difficulty.

The additional gameplay elements seem to be at the expense of hardware performance. Despite having more basic graphics than "Galaxian", Phoenix's ships move in a very mechanical fashion compared to the smooth, nicely animated movements of Namco's classic.

### Technical
Most Phoenix games will be in a standard Centuri woodgrain cabinet, but several other cabinets exist, due to this game being sold by multiple companies at the same time. These use sticker sideart (which covers the upper half of the machine), and glass marquees. The control panel is made up entirely of buttons, no joysticks are present (on the upright and 'maxi' cabs, that is; the cocktail cab has a 2-way joystick and 2 buttons). The monitor in this machine is mounted vertically, and the monitor bezel is relatively unadorned. Phoenix uses a unique wiring harness, which isn't know to be compatible with any other games.

Main CPU : 8085A
Sound Chips : TMS36XX, Discrete circuitry

Players : 2

Cocktail cab : 
Control : 2-way Joystick
Buttons : 2
=> [1] Fire, [2] Force Field

Upright and 'Maxi' cabs : 
Buttons : 4 (LEFT, RIGHT, FIRE, FORCE FIELD)
(The upright and 'maxi' cabs have no joystick)

### Trivia
Titlescreen's copyright notice :
PHOENIX COPYRIGHT 1980
AMSTAR ELECTRONICS CORP.
PHOENIX AZ. U.S.A.

Phoenix was released in December 1980.

Phoenix was the first multi-level space shooter and also the first shooter to include bosses. Despite its hardware issues, Phoenix's many gameplay innovations ensured that it now is rightly regarded as a classic and, along with Taito's "Space Invaders" and Namco's "Pac-Man" shares the dubious honour of being one of the most cloned games of the 1980s; with numerous console and home computer 'tributes' appearing.

The song that is played at the start of the game is 'Romance de Amor', also known as 'Spanish Romance', whose true author is currently unknown.

The song that is played when you start over after the mothership is destroyed is Ludwig van Beethoven's 'Für Elise'.

Mark Gotfraind holds the official record for this game with 987,620 points.

Licensed releases:
"Phoenix [Maxi model]" (Centuri, Inc.)
"Phoenix [Upright model]" (Centuri, Inc.)
"Phoenix [Japanese Cocktail Table]" (Taito Corp.)

Known Bootlegs/Hacks :
Phoenix (Irecsa G.G.I Corp.)
Phoenix (T.P.N.)
Griffon (Videotron)
Falcon (BGV)
Vautour (Jeutel)
Condor (Sidam)
Batman Part 2

### Scoring
Scoring is a little complicated in this game due to the fact it depends on hits made and how close the Phoenix's are to your fighter.

Phoenix fighters : 20, 40, or 80 points; 200 points if flying as a bird.
Phoenix birds : 50 or 100 points/egg, 100 - 800 points/bird (depends on how many wings shot off and distance from fighter).
Mothership : 1,000 - 9,000 points (may depend on how close the mothership is to you fighter when you kill the Alien Queen; may also depend on the amount of damage to the mothership, speed of destruction, as well as the number of spaceships destroyed). Usually, first 9 spaceships would increase by a thousand, then will be followed by nine 9000 point spaceships, then back to the first nine set, etc...

### Tips and tricks
* When you start the game, your fighter will be in the middle at the bottom of the screen. You will see a formation of enemy fighters at the top of the screen. This is the beginning of Wave 1. A quick note about the Force Field: it lasts a couple of seconds and takes about five seconds to regenerate again.

WAVES 1 AND 2 :
1) You will usually be attacked by multiple fighters at any one time. The movements of these fighters is pretty random.
2) In addition to dropping bombs on your fighter, Phoenix fighters also tend to try to ram your fighter.
3) After you clear out a few fighters, they will reassemble at the top of the screen. They will then move in synch with each other as they creep to the bottom of the screen.
4) Sometimes a Phoenix fighter will hover right above your ship. If you're quick, you can get off a quick shot and move away before a bomb can be dropped on you.
5) If multiple Phoenix fighters are at your level, use the Force Field to clear a path through them.

WAVE 3 AND 4 :
1) The Phoenixes in Wave 3 enter the screen in a zig-zag pattern while the Phoenixes in Wave 4 arrive in a cross-over pattern of four Phoenixes per side.
2) Once they get large, they start to do erratic zig-zag patterns across the screen. At the same time, they are dropping bombs toward your fighter. Your goal is to shoot off their wings. If you do this, it forces them to go straight down until the wing regenerates. They will still be dropping bombs, but at least they will be going straight down.
3) If at all possible, try to hit the Phoenixes when they are close to your ship. Doing this gets you more points.
4) In addition, try to shoot off both wings before destroying a Phoenix for more points.

WAVE 5 :
1) Your goal on this wave is to cut through the mothership's hull and shield and take out the Alien Queen inside.
2) Start firing as rapidly as you can to quickly cut through the hull. It will take quite a few shots to get to the shield.
3) The shield rotates so you will have to hit it a lot of times in order to get a wide enough hole in it to hit the Alien Queen.
4) As all of this is going on, the mothership is continually descending upon your ship. In addition, the escorts are constantly harassing you.
5) A good strategy is that once you have cut a path through the hull and shield, wait for the mothership to be almost on top of your ship. When you take out the alien, you will get a lot more points.
6) Destroying the escorts does not end this wave. Once you complete Wave 5, the cycle begins anew.

* During the game three birds will attack all in a line. Let those birds fly all the way to the bottom and start to fly back up. As they are flying up, shoot all three in a row real quick (2 or 3 seconds) and you will elevate your score to 204,000 regardless of what your current score is - The best way to get this bonus for shooting the three birds in a line is on the second stage of level 2. The blue and pink birds in an oval shape. Just wait, not firing at the bottom of the screen. A single bird will come down, fanny around and then fly back up, then four birds will fly down together in a line. When they start to fly back up - blast three of them for the bonus. It works best here because of the rapid fire allowed on this and every other 2nd stage. In addition, accomplishing the trick a second time again puts your score at 204,000, even if your score was higher.

### Ports
* CONSOLES:
Emerson Arcadia [EU] (1982) "Space Vultures [Model 1014]" 
ZX-Spectrum [EU] (1983) "Pheenix" by Megadodo Software 
BBC B [EU] (1983) "Eagle Empire" by Alligata 
[EU] Microsoft XBOX (oct.14, 2005) "Taito Legends" 
[EU] Sony PS2 (oct.14, 2005) "Taito Legends [Model SLES-53438]" 
[KO] Sony PS2 (jul.18, 2006) "Taito Legends [Model SLKA-15056]" 

* HANDHELDS: 
[EU] Sony PSP (oct.6, 2006) "Taito Legends Power-Up [Model ULES-00473]" 
[AU] Sony PSP (nov.9, 2006) "Taito Legends Power-Up [Model ULES-00473]" 

* COMPUTERS: 
[EU] Commodore C64 (1984) "Eagle Empire" 
[EU] PC [MS Windows, CD-ROM] (oct.14, 2005) "Taito Legends"

### Series
1. Phoenix (1980)
2. Pleiads (1981)

### Contribute
Edit this entry: https://www.arcade-history.com/game/1961/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `phoenix`. Play it at [../../../app/g/phoenix/](../../../app/g/phoenix/) or [explore the knowledge graph](viewer.html).*
