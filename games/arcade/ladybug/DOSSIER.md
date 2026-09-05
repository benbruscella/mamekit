# Lady Bug

**Universal · 1981** — transpiled from the MAME driver `src/mame/universal/ladybug.cpp` by mamekit.

![marquee](/artwork/media/marquees/ladybug.webp)

| Cover | Cabinet |
| --- | --- |
| ![flyer](/artwork/covers/ladybug.webp) | ![cabinet](/artwork/media/cabinets/ladybug.webp) |

## The machine

| CPU | Type | Clock | Mapped ranges |
| --- | --- | --- | --- |
| `maincpu` | Z80 | 4.000 MHz | 13 |

- **Sound:** sn76489 × 2 @ 4.000 MHz
- **Screen:** 240×192 @ 60.11 Hz · rotated 270°

### ROM chips

| Region | Chip | Offset | Size | CRC |
| --- | --- | --- | --- | --- |
| `maincpu` | `l1.c4` | 0x0 | 0x1000 | `d09e0adb` |
| `maincpu` | `l2.d4` | 0x1000 | 0x1000 | `88bc4a0a` |
| `maincpu` | `l3.e4` | 0x2000 | 0x1000 | `53e9efce` |
| `maincpu` | `l4.h4` | 0x3000 | 0x1000 | `ffc424d7` |
| `maincpu` | `l5.j4` | 0x4000 | 0x1000 | `ad6af809` |
| `maincpu` | `l6.k4` | 0x5000 | 0x1000 | `cf1acca4` |
| `gfx1` | `l9.f7` | 0x0 | 0x1000 | `77b1da1e` |
| `gfx1` | `l0.h7` | 0x1000 | 0x1000 | `aa82e00b` |
| `gfx2` | `l8.l7` | 0x0 | 0x1000 | `8b99910b` |
| `gfx2` | `l7.m7` | 0x1000 | 0x1000 | `86a5b448` |
| `proms` | `10-2.k1` | 0x0 | 0x20 | `df091e52` |
| `proms` | `10-1.f4` | 0x20 | 0x20 | `40640d8f` |
| `proms` | `10-3.c4` | 0x40 | 0x20 | `27fa3a50` |

## Controls

| Key | Function | Port | Bit |
| --- | --- | --- | --- |
| 1 | start1 | `IN0` | 0x20 |
| 2 | start2 | `IN0` | 0x40 |
| 5 | coin1 | `COIN` | 0x1 |
| 6 | coin2 | `COIN` | 0x2 |
| Left | joystick left | `CONTP1` | 0x1 |
| Down | joystick down | `CONTP1` | 0x2 |
| Right | joystick right | `CONTP1` | 0x4 |
| Up | joystick up | `CONTP1` | 0x8 |

## DIP switches (factory defaults)

| Setting | Port | Mask | Default |
| --- | --- | --- | --- |
| Difficulty | `DSW0` | 0x3 | 0x3 |
| High Score Names | `DSW0` | 0x4 | 0x4 |
| Rack Test (Cheat) | `DSW0` | 0x8 | 0x8 |
| Freeze | `DSW0` | 0x10 | 0x10 |
| Cabinet | `DSW0` | 0x20 | 0x0 |
| Free Play | `DSW0` | 0x40 | 0x40 |
| Lives | `DSW0` | 0x80 | 0x80 |
| Coin B | `DSW1` | 0xf | 0xf |
| Coin A | `DSW1` | 0xf0 | 0xf0 |

## The MAME driver — the people who reverse-engineered it

- **Driver source:** `src/mame/universal/ladybug.cpp`
- **Written by:** Nicola Salmoria
- **License:** BSD-3-Clause
- **Development:** 162 commits by 25 contributors, 2007–2025
- **Top contributors:** Aaron Giles, Miodrag Milanovic, Vas Crabb, Ivan Vangelista, hap

## The story

Arcade Video game published 45 years ago:

Lady Bug (c) 1981 Universal.

In Lady Bug you guide a lady bug through a Pac-Man style maze, eating dots, and avoiding enemy insects. You lose a life if you run into a skull or get eaten by an enemy insect. Collect letters to spell EXTRA for a bonus life (just like in Mr. Do!), and SPECIAL for an extra credit. The maze has rotating doors which are just enough to give the game a slightly different feel than the Pac-Man series.

### Technical
A proper Lady Bug arcade machine will be in a dedicated cabinet (specifically one of the ultra-curvy early Universal ones, "Mr. Do!", and many others used this same cabinet). Most games from Universal had no specific side art, just a painted 'Universal' logo, and a couple of colored stripes. This makes it possible to actually convert one Universal title into another one, without any loss in value. The joystick is mounted in the center of the control panel. Finally, this game uses a standard resolution monitor mounted vertically.

Main CPU : Zilog Z80 (@ 4 Mhz)
Sound Chips : (2x) Texas Instruments SN76496 (@ 4 Mhz)

Players : 2
Control : 4-way joystick

### Trivia
Lady Bug was released in October 1981 in Japan and in December 1981 in the USA.

This game contains unused graphics for a large dinosaur.

Alessandro Laini holds the official record for this game with 4,102,830 points.

A bootleg was made in 1983 by TAI DLI on the "Galaxian" hardware.

A bootleg of this game is known as "Cocinella".

### Scoring
Eating a flower : 10 points x score multiplier value.
Collecting a heart : 100 points x score multiplier value.
Collecting a yellow letter : 300 points x score multiplier value.
Collecting a red letter : 800 points x score multiplier value.
Bonus vegetable : 1,000 points for the cucumber on level one, increasing by 500 points per level, up to a maximum value of 9,500 for the horseradish on level 18 onwards.

### Tips and tricks
* Avoid running into skulls at all costs. They represent poison and are deadly to both you and the enemy insects. Not only that, but if you die by touching a skull yourself, all other skulls in the maze are replaced by flowers. If an enemy insect is poisoned by a skull, the skull disappears and the poisoned enemy insect is returned to its base in the center of the maze.

* Use the swing doors to block off the enemy insects' pursuit. Quickly flip a door as you pass it when an enemy insect is behind you and as long as the enemy insect is not too close, its route will be blocked and it will then have to find an alternative route to you. If the enemy insect is too close it will go through the door behind you and there may be no escape.

* Try to collect bonus vegetables when there are still skulls available on the maze. If, after you collect a bonus vegetable, an enemy bug is poisoned by a skull and returned to its base, when it leaves the base another vegetable will appear. This is the key to high scores on later levels when the vegetables are worth anything up to 9,500 points each.

* Get the score multiplier up to x5 as soon as possible. All points on the maze except bonus vegetables will then be multiplied by 5. You should get the hearts before getting ANY letters. The exception is when one of the letters is only 2 spaces above the enemy insects' base, and waiting for it to turn red may prove fatal. Alternatively you can try to collect a letter in this position when the enemy insects are frozen, when you have a few seconds to wait around for it to change.

* Collect all unneeded letters when they are red with the multiplier on x5 for 4,000 points each. For example if you already have the "X" for EXTRA collect it again when it is on red x5.

* Clear the flowers around the enemy insects' base at the start of each level from stage 5 onwards. This is especially important past stage 10 when the enemy insects' speed is much increased. You do not move any faster, and will need to have a good knowledge of the maze layout to avoid them.

* Use the swing doors to force the enemy insects to go where you want them to. Example: stay to the upper right of the enemy insects' base, and let them come to you. When they are close, move the door so they have to pass your position, and when they are past you move the door again, so that they have to go the long way round to get to you again. Wait until all four enemy insects are out and then you can get the bonus vegetable when the way is clear. Watch out though, as some breeds of enemy bugs are particularly stupid (or smart) and will not follow the route you want, but will lurk near you to try and trap you.

* Try to group all four enemy insects close together to increase your chances of getting the bonus vegetable.

* If you quickly flip the same revolving door several times in succession you will notice you move part way through it. You can now walk through this door without spinning it. Useful if you want to wait somewhere and make a getaway without moving the door.

### Ports
* CONSOLES: 
[US] Atari 2600: release cancelled
[US] Colecovision (1982) "Lady Bug [Model 2433]" 
[US] Mattel Intellivision (1983) "Lady Bug [Model 2483]" 

* COMPUTERS: 
[US] Tandy Color Computer (1982) "Doodle Bug"
[EU] BBC B (1983) "Bumble-Bee"

### Contribute
Edit this entry: https://www.arcade-history.com/game/1343/?o=2

*Story courtesy of Gaming History (arcade-history.com).*

---

*Generated by [mamekit](https://github.com/benbruscella/mamekit) from the knowledge graph of MAME driver `ladybug`. Play it at [../../../app/g/ladybug/](../../../app/g/ladybug/) or [explore the knowledge graph](viewer.html).*
