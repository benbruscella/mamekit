# Venture (version 5 set 1)

**Exidy · 1981** — transpiled from the MAME driver `src/mame/exidy/exidy.cpp` by mamekit.

![marquee](/artwork/media/marquees/venture.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/venture.webp) | ![cabinet](/artwork/media/cabinets/venture.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `soundbd:audiocpu` | M6502 | 0.895 MHz | 8 |
| `maincpu` | M6502 | 0.706 MHz | 16 |

- **Sound:** exidy @ 0.895 MHz
- **Screen:** 256×256 @ 60.00 Hz

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `13a-cpu` | 0x8000 | 0x1000 | `f4e4d991` |
| `maincpu` | `12a-cpu` | 0x9000 | 0x1000 | `c6d8cb04` |
| `maincpu` | `11a-cpu` | 0xa000 | 0x1000 | `3bdb01f4` |
| `maincpu` | `10a-cpu` | 0xb000 | 0x1000 | `0da769e9` |
| `maincpu` | `9a-cpu` | 0xc000 | 0x1000 | `0ae05855` |
| `maincpu` | `8a-cpu` | 0xd000 | 0x1000 | `4ae59676` |
| `maincpu` | `7a-cpu` | 0xe000 | 0x1000 | `48d66220` |
| `maincpu` | `6a-cpu` | 0xf000 | 0x1000 | `7b78cf49` |
| `soundbd:audiocpu` | `vea_3a-3.3a` | 0x5800 | 0x800 | `4ea1c3d9` |
| `soundbd:audiocpu` | `vea_4a-3.4a` | 0x6000 | 0x800 | `5154c39e` |
| `soundbd:audiocpu` | `vea_5a-3.5a` | 0x6800 | 0x800 | `1e1e3916` |
| `soundbd:audiocpu` | `vea_6a-3.6a` | 0x7000 | 0x800 | `80f3357a` |
| `soundbd:audiocpu` | `vea_7a-3.7a` | 0x7800 | 0x800 | `466addc7` |
| `gfx1` | `vel_11d-2.11d` | 0x0 | 0x800 | `ea6fd981` |
| `proms` | `hrl14h-1.h14` | 0x0 | 0x20 | `f76b4fcf` |
| `proms` | `vel5c-1.c5` | 0x20 | 0x100 | `43b35bb7` |
| `proms` | `hrl6d-1.d6` | 0x120 | 0x20 | `e26f9053` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 6 | coin2 | `DSW` | 0x1 |
| 1 | start1 | `IN0` | 0x1 |
| 2 | start2 | `IN0` | 0x2 |
| Right | joystick right | `IN0` | 0x4 |
| Left | joystick left | `IN0` | 0x8 |
| Space / X | button1 | `IN0` | 0x10 |
| Up | joystick up | `IN0` | 0x20 |
| Down | joystick down | `IN0` | 0x40 |
| 5 | coin1 | `IN0` | 0x80 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Bonus Life | `DSW` | 0x6 | 0x0 |
| Coinage | `DSW` | 0x98 | 0x90 |
| Lives | `DSW` | 0x60 | 0x20 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/exidy/exidy.cpp`
- **Written by:** Aaron Giles
- **License:** BSD-3-Clause
- **Development:** 197 commits by 29 contributors, 2007–2026
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Ivan Vangelista, Vas Crabb, Scott Stone

## The story

Arcade Video game published 45 years ago:

Venture (c) 1981 Exidy.

Venture is a 1- or 2-player "Gauntlet" style game (although Venture pre-dates the Atari legend by 4 years) set in a multi-level dungeon. The player, armed with a bow and arrow fights through enemy infested levels in the quest to collect treasure.

Each dungeon is represented as a floor plan, populated with a number of "Space Invader" like monsters. Numerous rooms and their corresponding doors are clearly marked; these rooms are the treasure rooms and each one must be cleared. When the player enters a room, the viewpoint zooms in on the action and the room takes up the whole screen. Each room has a treasure or weapon guarded by one or more creatures. Players must try to retrieve the treasure while avoiding (or killing) creatures and obstacles. Only in the rooms themselves can players use their bow and arrow.

When the treasure is successfully taken out of the chamber, bonus points are awarded. The screen image then returns to the original, zoomed-out floor plan and the player moves on to the next room of their choice. Once a room has been cleared of its item, the player no longer has access to that room. The player must collect all of the treasures on the current level before descending to another dungeon.

### Technical
Main CPU : MOS Technology M6502 (@ 705.562 Khz)
Sound CPU : MOS Technology M6502 (@ 894.886 Khz)
Sound Chips : Custom (@ 894.886 Khz)

Player : 2
Control : 8-way joystick
Buttons : 1 (Fire)

### Trivia
Venture was released in June 1981.

Venture came in a white dedicated cabinet and featured sideart of Winky battling green monsters (looks like snakes).

### Tips and tricks
A) If you wont to change aim without moving, learn just to tap the joystick, not to jam it.

B) When pursued by hall monsters outside the dungeons, don't waste time by shooting them. Reverse direction, switch from side to side, and do whatever else you must to escape.

C) Do your best not to shoot a monster where its corpse might block your path to or from the treasure. If you do, you have no choice but to wait until it has completely disintegrated; under no circumstances should you shoot it again.

D) Because you want to get out of each dungeon quickly, you should waste no time in picking up the treasure. It can and should be done in one fluid motion. The Instant you touch the loot, you should start thinking about getting out.

E) When a hall monster appears outside a dungeon, leave. Even if it is outside the room's only exit, remember that it won't be there when you get outside-although another might.

Once the half monster has actually entered the dungeon, the best policy is to flee in the opposite direction. If there is no exit there or a corpse is blocking it, it is still possible in the first three levels for a skilful Winky to escape around the hall monster. It's a risk but do it if you have to.

F) When leaving a dungeon, look out. You don't want to run straight into a waiting hall monster. The more time you've spent in the level so far, the more you should worry.

G) The question of whether to shoot dungeon monsters when you don't absolutely have to depends on two factors : speed and accuracy. If you think you can kill several in a short time,do it. Keep in mind the bonus at the end of each level, since that determines your final score. Unless you are very fast, there is no point in risking the decrease of your score by a seventh or a sixth for a few hundred points.

H) Since you Start in the same place on the level each time, it makes sense to clear the dungeons nearest you first. If you can make a circuit of the level without being killed,the strategy will save time. If you are killed and have to start over,you will have to take the same long route you avoided before.

I) In The Wall Room, don't bother shooting your way through the red walls. It's a risk that earns you no points and takes more time than simply slipping around them. Since this dungeon Is the easiest, it should probably be saved for last, when you need to finish quickly.

J) In The Serpent Room, send arrows down on the two lower snakes before you enter their territory. Their length will make them easy targets from that angle.

If pressed for time enter and exit the dungeon through the door in the right wail, avoiding a confrontation with the third snake.

K) The Goblin and Skeleton Rooms should be handled according to your inclination. You can easily evade the monsters, but the points you could gain with a few parting shots should be considered.

L) Save The Two-Headed Room for the end of Level Two, since it is a very quick job once you have the secret. When you don't have time to shoot the crabs and then to wait for them to disintegrate from your path, split-second timing alone will get you out safely. The instant you touch the treasure,jam the joystick to the upper left. Each time, you will barely make it past the crabs and out the left head of the room.

A more lucrative and time-consuming method is to stay at the bottom with your treasure and wait for the crabs to drift down from the heads into the body in search of you, as they invariably do. If you shoot well, you can kill them and still leave a clear path out. If a hall monster appears before you finish though, say goodbye to Winky.

M) As soon as you enter The Troll Room, move about an inch to the left of the entrance, staying as low as possible : aim to the upper right. As soon as the walls vanish, one goblin will come thundering down since he doesn't sense that you're aiming at him. Diagonal shots are your best chance against any of the monsters,but the trolls are particularly tricky.

Shoot as soon as he leaves cover, then move up and get the treasure. The remaining troll will not be had to evade If you are fast.

Whenever you do aim vertically or horizontally,the trolls will not give you a chance to hit them, holding you in stalemate until the hall monster shows up. What you must do (if you don't want to shoot diagonally) is aim in some other direction until your target has committed himself to attack. Then quickly shift your aim and fire before he has a chance to dodge.

N) You must kill almost everything in The Dragon Room; there is no room to maneuver around the dragons while they are all alive and moving. Even if you are a skilful archer, you must take special care to shoot so that you still have a clear path to and from the treasure. If you have to wait for the dragons to disintegrate before you can reach it, you might as well forget about it. 

O) The red denizens of The Spider Room win always stay near the treasure in the center; they shift around it to follow you. Shoot one for best results : it takes almost no time and you can easily snatch the treasure from only two defenders.

The instant you do, look out for the two yellow spiders. They will close in on you rapidly,and your only chance is to duck under one and escape while you still have time. Once you reach the door, a couple of arrows shot at your pursuers won't hurt.

P) With each new level, be prepared for greater and greater challenges. Try to view each dungeon creatively to find the best strategy.

VENTURE is one game in which it is not only important but vital to watch more experienced players, observing the game's many unusual problems and the different ways of handling them. Good luck!

### Staff
Designed & programmed by : Howell Ivy

### Ports
* CONSOLES:
Colecovision [US] (1982) "Venture [Model 2417]"
[US] Atari 2600 (1982) "Venture [Model 2457]"
Mattel Intellivision [US] (1982) "Venture [Model 2477]" 
[US] Atari 2600 (1987) "Venture [Model CX26145]"

* COMPUTERS:
Tandy Color Computer [US] (1982) "Venturer"

### Contribute
Edit this entry: https://www.arcade-history.com/game/3060/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `exidy`. Play it at [../../../app/g/venture/](../../../app/g/venture/) or [explore the knowledge graph](viewer.html).*
