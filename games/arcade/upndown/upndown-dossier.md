# Up'n Down (315-5030)

**Sega · 1983** — transpiled from the MAME driver `src/mame/sega/system1.cpp` by mamekit.

![marquee](/artwork/media/marquees/upndown.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/upndown.webp) | ![cabinet](/artwork/media/cabinets/upndown.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | SEGA_315_5098 | 4.000 MHz | 10 |
| `soundcpu` | Z80 | 2.500 MHz | 5 |

- **Sound:** sn76489 × 2 @ 2.500 MHz
- **Screen:** 512×224 @ 60.10 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `epr5516a.129` | 0x0 | 0x2000 | `038c82da` |
| `maincpu` | `epr5517a.130` | 0x2000 | 0x2000 | `6930e1de` |
| `maincpu` | `epr-5518.131` | 0x4000 | 0x2000 | `2a370c99` |
| `maincpu` | `epr-5519.132` | 0x6000 | 0x2000 | `9d664a58` |
| `maincpu` | `epr-5520.133` | 0x8000 | 0x2000 | `208dfbdf` |
| `maincpu` | `epr-5521.134` | 0xa000 | 0x2000 | `e7b8d87a` |
| `soundcpu` | `epr-5535.3` | 0x0 | 0x2000 | `cf4e4c45` |
| `tiles` | `epr-5527.82` | 0x0 | 0x2000 | `b2d616f1` |
| `tiles` | `epr-5526.65` | 0x2000 | 0x2000 | `8a8b33c2` |
| `tiles` | `epr-5525.81` | 0x4000 | 0x2000 | `e749c5ef` |
| `tiles` | `epr-5524.64` | 0x6000 | 0x2000 | `8b886952` |
| `tiles` | `epr-5523.80` | 0x8000 | 0x2000 | `dede35d9` |
| `tiles` | `epr-5522.63` | 0xa000 | 0x2000 | `5e6d9dff` |
| `sprites` | `epr-5514.86` | 0x0 | 0x4000 | `fcc0a88b` |
| `sprites` | `epr-5515.93` | 0x4000 | 0x4000 | `60908838` |
| `lookup_proms` | `pr-5317.106` | 0x0 | 0x100 | `648350b8` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Space / X | button1 | `P1` | 0x4 |
| Down | joystick down | `P1` | 0x10 |
| Up | joystick up | `P1` | 0x20 |
| Right | joystick right | `P1` | 0x40 |
| Left | joystick left | `P1` | 0x80 |
| 5 | coin1 | `SYSTEM` | 0x1 |
| 6 | coin2 | `SYSTEM` | 0x2 |
| 9 | service1 | `SYSTEM` | 0x8 |
| 1 | start1 | `SYSTEM` | 0x10 |
| 2 | start2 | `SYSTEM` | 0x20 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Service Mode | `SYSTEM` | 0x4 | 0x4 |
| Coin A | `SWA` | 0xf | 0xf |
| Coin B | `SWA` | 0xf0 | 0xf0 |
| Cabinet | `SWB` | 0x1 | 0x0 |
| Lives | `SWB` | 0x6 | 0x6 |
| Bonus Life | `SWB` | 0x38 | 0x38 |
| Difficulty | `SWB` | 0xc0 | 0xc0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/sega/system1.cpp`
- **Written by:** Jarek Parchanski, Nicola Salmoria, Mirko Buffoni
- **License:** BSD-3-Clause
- **Development:** 361 commits by 43 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Ivan Vangelista, hap, Michaël Banaan Ananas

## The story

Arcade Video game published 43 years ago:

Up'n Down (c) 1983 Sega.

Up'n Down is an abstract racing game viewed in a forced third-person perspective. 

The goal of the game is to collect coloured flags, while avoiding the enemy vehicles and obstacles that litter each course. The flags needed are displayed at the top of the screen and are coloured as follows: Light green, blue, red, olive, dark green, magenta, yellow and black. If the flags are collected quickly enough, bonus points are awarded. Collected flags remain visible on the track but are changed to white in colour.

In addition to the enemy vehicles, other hazards to be negotiated include potholes, broken bridges, steep hills and sharp corners. The player's vehicle can jump over both obstacles and vehicles, and if players land their vehicle on an enemy vehicle, the enemy is destroyed. Jumping at the wrong time, however, can send the player's vehicle into the path of an enemy, or off the track completely, resulting in the loss of a life. Players can also control the speed of their vehicle and even move in reverse.

Each round is progressively more difficult than the last, with more obstacles and enemy vehicles littering the courses.

### Technical
Runs on the Sega "System 1" hardware.

Players: 2
Control: 4-way joystick
Buttons: 1 (JUMP)

### Trivia
Released during September 1983. By this time, Sega was starting to make a name for itself in the arcade industry. With solid hits such as "Star Trek", "Zaxxon", and "Pengo" under its belt, Sega started to venture into other areas. Sega had partnered up with Gremlin to create "Head-On" and "Head-On 2" arcade games. Later on, Sega released "Turbo". Using the same three-quarter perspective that was used in "Zaxxon", Sega created another racing game with a twist. Up'n Down came out during a time when the arcade market was basically saturated with space shooters.

Export releases:
[US] "Up'n Down [No. 0A64]"
[US] "Up'n Down [No. 0A74]"

### Scoring
Jumping on a truck : 1000 points
Jumping on a race care : 2000 points

You also get bonus points depending on how quickly you finished the course. The times and points are :
0 - 19 seconds : 20000 points
20 - 29 seconds : 10000 points
30 - 39 seconds : 5000 points
40 - 49 seconds : 3000 points
50 - 59 seconds : 1000 points
60 seconds and above : 0 points

### Tips and tricks
* You will start the game with your car on the track. There may be other vehicles also on the track. You goal is to collect all the colored flags in the least amount of time. You must first learn how the joystick works. Putting more pressure on it in one direction causes your vehicle to accelerate. Letting off the pressure causes your vehicle to eventually stop. This will become critical to know as you move into the later rounds.

* When you jump, make sure you have somewhere to jump to. The jump itself takes up about the distance of the length of your car. If there isn't enough room to land, your car will crash. This also happens if you jump off the road anywhere. If you want to jump on another car, then start preparing for it early :
1)  Make sure the road ahead is somewhat straight. Sometimes you can jump off a right diagonal road onto a left diagonal road and hit the car that way.
2) Another way is when you are one car length behind your intended victim, and the road is straight, then go ahead and jump on them.

* Sometimes you may have to jump over a car to avoid being hit. Again, make sure you have enough road to land on. It is very easy to try to quickly jump a car only to find yourself wrapped up in the pine trees alongside the road.

* Of course, the object of the game is to collect flags. If, for some reason, you cannot get a flag, there are a couple of ways to remedy this situation.
1) If it is safe (only works on the lower rounds), you can backtrack to where the flag is. You cannot, though, go past the bottom edge of the screen.
2) If you go through three screens, the course will ''wrap'' around and you can get the flag on the return. The only disadvantage to this is that it is time consuming.

* Do not make blind jumps. If you can't see where you are jumping to, go up a little further to see your destination. If you don't, you may end up jumping into something such as a destroyed bridge, abrupt road ending, or the road curves and you jump off the road.

* Make sure you know where the hills are. If your car doesn't have enough speed, it will only go halfway up the hill before it rolls back down again. While it is rolling, you lose control over it.  This can be dangerous when other cars are coming up behind you.

* In the later rounds, other cars will be coming at you both from the front and rear. Some of them travel faster then others sometimes creating a situation where you will be in between two cars traveling opposite directions and heading straight for your car. Again, make sure you know how to accelerate and decelerate.

* Whenever you jump from one road to another, your car will automatically face toward the top of the screen in the direction of the road. You don't have to wait to move again. This can be especially handy when trying to avoid other cars or trying to get flags.

* I'll state the obvious of not getting a flag if there is too much congestion around it. Since the timer is not displayed, you probably don't know how much time you have taken to get the flags. Just go around the course and try again. Better to save a car then sacrifice it for points then realize you took too long and don't get any bonus.

* Keep on the lookout for what cars do what. Such as trucks usually follow along the road at a leisurely pace while race cars can go fast or slow and with or against the flow of traffic.

* As you progress in each round, the course becomes harder because more hazards are added to it.

* "Pengo" : Pengo makes a guest appearance in this game if you manage to pass the first four rounds in under a minute each. The penguin will appear in the water of round five riding a surf-board.

### Staff
Staff : Yoji Ishii (ICI), T.N, SHO, R.T, H.N, TAK, H.K, STO, KIP
Security by : Masatoshi Mizunaga (MI.)

### Ports
* CONSOLES:
Atari 2600 (1983) "Up'n Down [Model 009-01]"
Colecovision (1984) "Up'n Down [Model 009-21]"
Atari XEGS
[JP] Sega Saturn (Feb. 28, 1997) "Sega Memorial Selection Vol.1 [Model GS-9135]"

* COMPUTERS:
Atari 800 (1984) "Up'n Down [Model 009-18]"
Apple II (1984)
Commodore C64 (1985) "Up'n Down [Model 009-05]"
ZX Spectrum: Planned and advertised but never released.

### Contribute
Edit this entry: https://www.arcade-history.com/game/3033/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `system1`. Play it at [../../../app/g/upndown/](../../../app/g/upndown/) or [explore the knowledge graph](viewer.html).*
