# Bank Panic

**Sanritsu / Sega · 1984** — transpiled from the MAME driver `src/mame/sanritsu/bankp.cpp` by mamekit.

![marquee](/artwork/media/marquees/bankp.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/bankp.webp) | ![cabinet](/artwork/media/cabinets/bankp.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 2.578 MHz | 6 |

- **Sound:** sn76489 × 3 @ 2.578 MHz
- **Screen:** 224×224 @ 61.03 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `epr-6175.7e` | 0x0 | 0x4000 | `044552b8` |
| `maincpu` | `epr-6174.7f` | 0x4000 | 0x4000 | `d29b1598` |
| `maincpu` | `epr-6173.7h` | 0x8000 | 0x4000 | `b8405d38` |
| `maincpu` | `epr-6176.7d` | 0xc000 | 0x2000 | `c98ac200` |
| `fgtiles` | `epr-6165.5l` | 0x0 | 0x2000 | `aef34a93` |
| `fgtiles` | `epr-6166.5k` | 0x2000 | 0x2000 | `ca13cb11` |
| `bgtiles` | `epr-6172.5b` | 0x0 | 0x2000 | `c4c4878b` |
| `bgtiles` | `epr-6171.5d` | 0x2000 | 0x2000 | `a18165a1` |
| `bgtiles` | `epr-6170.5e` | 0x4000 | 0x2000 | `b58aa8fa` |
| `bgtiles` | `epr-6169.5f` | 0x6000 | 0x2000 | `1aa37fce` |
| `bgtiles` | `epr-6168.5h` | 0x8000 | 0x2000 | `05f3a867` |
| `bgtiles` | `epr-6167.5i` | 0xa000 | 0x2000 | `3fa337e1` |
| `proms` | `pr-6177.8a` | 0x0 | 0x20 | `eb70c5ae` |
| `proms` | `pr-6178.6f` | 0x20 | 0x100 | `0acca001` |
| `proms` | `pr-6179.5a` | 0x120 | 0x100 | `e53bafdb` |
| `user1` | `315-5074.2c.bin` | 0x0 | 0x25b | `2e57bbba` |
| `user1` | `315-5073.pal16l4` | 0x25b | 0x1 | `` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| Right | joystick right | `IN0` | 0x2 |
| Left | joystick left | `IN0` | 0x8 |
| Z | button1 | `IN0` | 0x10 |
| 5 | coin1 | `IN0` | 0x20 |
| 9 | service1 | `IN0` | 0x40 |
| X | button2 | `IN0` | 0x80 |
| 1 | start1 | `IN1` | 0x20 |
| 2 | start2 | `IN1` | 0x40 |
| C | button3 | `IN2` | 0x1 |
| 6 | coin2 | `IN2` | 0x4 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Coin Switch 1 | `DSW1` | 0x3 | 0x0 |
| Coin Switch 2 | `DSW1` | 0x4 | 0x0 |
| Lives | `DSW1` | 0x8 | 0x0 |
| Bonus Life | `DSW1` | 0x10 | 0x0 |
| Difficulty | `DSW1` | 0x20 | 0x0 |
| Demo Sounds | `DSW1` | 0x40 | 0x40 |
| Cabinet | `DSW1` | 0x80 | 0x80 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/sanritsu/bankp.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 94 commits by 24 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, hap, Olivier Galibert

## The story

Arcade Video game published 42 years ago:

Bank Panic (c) 1984 Sega.

A reaction-based shoot-em-up in which the player takes on the role of a gun-slinging Deputy, who has been charged with protecting the town bank from outlaws. 

Each stage contains twelve numbered doors, with three doors visible on-screen at any one time. The player must scroll the screen left or right to bring other doors into view. At regular intervals, one or more doors will open to reveal either a bank customer or an outlaw. The customers must be allowed to deposit their money unharmed while the outlaws must be shot before they have a chance to shoot the deputy. Some of the outlaws must be shot twice before they are killed. If the player kills an innocent citizen, a player life is lost. 

Doors will only open when they are on-screen and a level is only completed once cash has been deposited safely into the bank via each of the twelve doors. Each level has a tight time limit, so it's important to ensure that the player reaches the doors that are about to be opened as quickly as possible. Imminent visitors are indicated by a bar graph situated above each door, with a moving red marker showing the approach of either a customer or robber. 

In addition to the outlaws, players must also be wary of time bombs that occasionally appear on one of the doors; this is indicated by both a timer and an icon above the door with the bomb. The bomb must be reached and its fuse shot before the timer runs out. As well as the outlaws and customers, a small, bow-legged cowboy occasionally appears holding gifts above his head, these can be shot for bonus points. Occasionally, an open door will reveal a town citizen bound by ropes. The player must shoot the ropes with a single shot to free the citizen. 

Bonus points are awarded for the completion of a level, with the amount determined by remaining level time and the number of moneybags deposited. Players can choose to start the game on either level one, three or six, with the harder levels earning higher bonus points for stage completion.

### Technical
Cabinet dimensions : 69,5inch. high x 27inch. wide x 32,25inch. deep.

Main CPU : Zilog Z80 (@ 3.86712 Mhz)
Sound Chips : (3x) Texas Instruments SN76496 (@ 3.86712 Mhz)

Players : 2
Control : 2-way joystick
Buttons : 3
=> [A] Left fire, [B] Center fire, [C] Right fire

### Trivia
Bank Panic was released on September 28, 1984.

Sanritsu is the actual developer of this game, and Sega produced and distributed it. In fact, if you look through the graphical data, you can see Sanritsu's logo amongst the different tiles and sprites.

The character's names are John, Sam (with a robber behind him), Hope (tied up with rope), Mary and Ann (with a robber behind her). Your character is simply referred to as the Hero.

Alessandro Giuriato and Gary Hatt share the official record for this game with 9,999,999 points on March 5, 1985 and May 27, 1987, respectively.

### Scoring
Killing a gunman :
Before he draws his gun : 100 or 200 points.
With the timer on 0.00 : 5,000 points for red shirt gunman (may also earn EXTRA letter).
With the timer on 0.00 : 3,000 points for green shirt gunman.
With the timer on 0.00 : 2,000 points for brown shirt gunman.
With the timer on 0.01-0.10 : 1,000 points.
With the timer on 0.11-0.15 : 800 points.
With the timer on 0.16-0.20 : 700 points.
With the timer on 0.21-0.25 : 600 points.
With the timer on 0.26-0.33 : 300 points.

Shooting the bomb : 100 points.

Deposits :
First bag of money : 200 points.
Second bag of money through the same door : 400 points.
Third bag of money through the same door : 600 points.
Fourth or more bag of money through the same door : 1,000 points.
A money bag deposited at a door with a cashier present: 1000 points bonus.
Regaining a stolen money bag : 1000 points.

Shooting the rope on a customer who is tied up: 3 bags of money worth 1,000 points each (3,000 points total).

Shooting the hats: 100 points for the first one, 200 points for the second, 300 points for the third, etc...
Shooting the bag of money after all the hats : 1,000 points bonus.
There are only three and four hats on rounds 1 and 2 respectively.

Sometimes after a woman is help up and the gunman is killed, a 500 points bonus is awarded (woman peeks in the door before it closes, winks and a red heart is shown).

Sometimes after a man is help up and the gunman is killed, a 200 points bonus is awarded (man peeks in the door before it closes, smiles and waves).

If EXTRA is spelled, the player earns an extra life plus 20,000 bonus points, and the game advances to the next level.

End of level bonuses :
Money bags 1-12 : 50 points each
Money bags 13-24 : 100 points each
Money bags 25-36 : 150 points each
Money bags 37-48 : 200 points each

Fair average bonus :
0:00 awards 10,000 points.
0:01 awards 9,000 points.
0:02 awards 8,000 points.
0:03 awards 7,000 points.
0:04 awards 6,000 points.
0:05 awards 5,000 points.
0:06 awards 4,000 points.
0:07 awards 3,000 points.
0:08 awards 2,000 points.
0:09 awards 1,000 points.
0:10 and above awards no points (game displays 'non points').

Timer bonus : 100 points per click of time remaining.

Starting on Level 3 : 20,000 points bonus for clearing level 3.
Starting on Level 6 : 60,000 points bonus for clearing level 6.

Robber Bosses must be shot twice to be killed - you get two scores based on the time of each hit.

### Tips and tricks
* Try to always allow a gunman to draw, as you only score 100 points if he doesn't. If two or more gunmen appear take one out straight away, as it is a lot more difficult to kill more than one when they draw.

* You don't have to shoot the little guy with the hat an exact number of times, just once for each hat or more. So fire as many times as you can and you will get the bonus points.

* You should try to defuse bombs as soon as possible.

* Doors cannot be opened while you are moving, so move directly to the door you require without stopping.

* Watch the indicators above the door numbers to see which doors will be opening soon. If there are two next to each other, try to get only one of them on screen so you do not have to possibly contend with more than one gunman simultaneously.

* Sometimes after depositing money, the departing customer has a wanted poster with a number on it on their back.  This indicates that the next customer at this door number will be a robber.

### Staff
Developed by Sanritsu.

### Ports
* CONSOLES:
[JP] Sega SG-1000 (1985)
Sega Master System (1987)

* COMPUTERS:
Sinclair ZX Spectrum (1985, "West Bank")
Amstrad CPC (1986, "West Bank")
Commodore C64 (1986, "West Bank")
MSX

### Contribute
Edit this entry: https://www.arcade-history.com/game/182/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `bankp`. Play it at [../../../app/g/bankp/](../../../app/g/bankp/) or [explore the knowledge graph](viewer.html).*
